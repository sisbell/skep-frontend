// T-ARTICLE — a document's article as HTML and as P-LAY's plan from its
// record and the view state handed in (the structure record §3.2). Layer 2.
// Pure: a function of values (FP-8); no DOM, no state.
// The article: the head — the address, the state line, the byline (never a
// name alone, R44) and the presence line with its ⟡ where links touch; then
// the blocks with their marks. The faces (P-REG's FACE): the document's own
// characters are the reading face's, and every word the article sets of its
// own the client's — the head, a hairline's label, C-33's mark, a symbol, a
// sign in the edge, a record's rendering, a withheld run's face, an item not
// rendered, the scene-offer — save an address or a fingerprint, in the
// identifier's face wherever it stands, inside a sentence as well (`.id`;
// ST's `tHTML`); inside a run the client's words take the run's size. Where
// a fit is judged — what a gap holds, how many lines a sign takes in the
// edge, where a label is cut — the words are measured in their faces as the
// view measures them (`measure`), never counted. The byline (`bylineOf`;
// foundations §2.1; FP-34): its owner's address, then its slots, each a box
// of its own width whatever it shows — the device label's, LABEL_CH figures
// of the client's face, and on a byline not the reader's own the fingerprint
// cue's, the cue's own width in the identifier's — filled from the owner's
// facts as the page holds them (the view's `keyOf`): the device-flagged
// genesis entry's label, cut to its box on a word's end (`cutTo`) and whole
// on its act, in its title and in its accessible name, and its fingerprint's
// cue; an empty box while they are read; else the cause's words, said once
// where one cause empties both slots; each slot named by its role and what it
// shows; the plan's line the same whatever they show, so nothing beside them
// moves. A block's
// marks: the selection (a byte span: every block it touches is marked, the
// platform's highlight showing the bytes themselves) and the focus (a
// block), each by `blockMarks`, the one rule T-LAYER marks a standing
// article by; the owner's and the person's links in place, each stretch in
// the one mark its links merge into (the view's `mergedMark`); each
// transcluded run's sameness boundary with the origin's label (the hairline,
// whole at the first run of that origin, compact after) and C-33's mark on a
// draft-origin run in a published document, set once per run in a block, at
// its first stretch, however marks and symbols cut it (foundations §2.1);
// the others' count in its column's edge, level with the block's first line
// and never inside the text, so it sets no line (`edgeStyle`; A-254;
// FP-26); and the symbols the reveal asked for, each at its span
// (foundations §2.1; B1-S4): right after the last word its span touches, in
// the last typed line its drawn stretches touch (`standOf`). Every link is
// marked, and its symbol set, at the stretches LK says its end is drawn on
// (the view's `marks`, `symbols`), never at the position its slot stores,
// each mark and symbol carrying the ends it draws by their links and their
// keys, so a click opens the card of the end clicked (APP-INPUT). The ends
// drawn at a withheld run merge into one symbol at the start of its gap's
// first line, before the notice's words, at every stage of the reveal — the
// gap has no text to mark — in the one mark their links merge into, a count
// after its ⟡ where it stands for two or more (`runSymHTML`), no stretch of
// the gap marked, so the gap still reads as empty (FP-30); the others' links
// drawn there are counted in its column's edge, below the face's compact
// mark where that stands there. A symbol is lit — drawn heavier while an
// arrival stands — where every link it stands for is lit (`symbolLit`),
// marked in place by T-LAYER and never made into the article (FP-30); it is
// titled with its type and with what its far end's text holds of its
// passage where that is not all of it in one piece (the view's `says`;
// foundations §2.3; FP-21).
// The withheld run is a gap occupying its positions, as tall as its bars,
// each position one advance (F2.1-i), naming the owner of its run's origin,
// whoever owns the document windowing it (R56; B1-S7) — its face in it where
// the gap holds it as measured, else compact in its column's edge, so no face
// reflows the text (`gapHolds`; foundations §2.1; FP-26). An item this client
// cannot show is a gap of its positions too, its words in it where the gap
// holds them, else in its column's edge (`unshownHTML`; FP-26). The face: the
// entitlement arm for that owner and
// this reader (`entitlementArm`; PUB-5.121, PUB-5.97) and C-67's clause
// beneath, decided over the origin's whole admitted-claim set
// (`editionClause`; PUB-5.124, RES-164): the pointer where an admitted
// claim's edition holds bytes the reader can reach, naming the one claim it
// follows (PUB-3.107; RES-152) — on the plane a control whose act is a LEAP
// to that claim's home, the edition (B1-S7 → S6; APP-INPUT), in a reading
// scene's pane a line, as every mark there is (SC) — the quoting sibling
// where every admitted claim quotes the draft, the unread place where a read
// they are decided from failed (FP-33), and nothing — the arm's own copy
// alone — where none is admitted, where the board refused their lookup as
// withheld from the reader, or where they are not yet read. The placeholder
// is one record (`placeholderOf`), which the ARIA mirror's item at the run
// (N-WALK) and the run's face whole (O-FACES's `withheldRun`) read too, so
// the run a sighted reader sees and the one a screen reader hears never part
// (R94). A record atom renders as the record it is (`recordOf`; D13). The
// scene-mode variant (the view's `scene`), a reading scene's pane's article:
// no scene-offer, and its symbols and presence ⟡ marks alone, never the
// controls the plane's are (`control`).
// The corner's items (`cornerHTML`; foundations §3.1): an edition's state
// with "version ⟨k⟩ of ⟨n⟩" and R20's teaching — at a pinned version its
// own number of the count its box's document holds (FP-22) — a draft's kept
// state and its chip (C-28; ux-T2), the whole-document link count, and in a
// reading scene's pane its act reading another version there and the line
// saying the version it reads lacks the passage that act carried (FP-23),
// whole or compact (FP-26). They stand outside the article: the article's
// box clips whatever stands past its measure, so the corner's element is its
// holder's, T-LAYER's beside the article on the plane and each pane's own in
// the scene.
// The plan (`articlePlan`): the same article as P-LAY's rows — the head's
// lines, each block's text at its size with the inline pieces it carries
// (the hairline's label, C-33's mark, the symbols), a record's words and
// keys, the line a reference or an empty document takes, the gap of a
// withheld run and of an item not rendered, its width, the scene-offers, and none of the signs a
// column's edge holds, which set no line — each row carrying where a column
// may break at it and each piece whether its characters are the document's
// own, so P-LAY folds the lines into the columns of the document's room and
// names the position each line starts at (FP-12), and lays them out as the
// bars the canvas draws below reading scale, so the hand-off swaps bars for
// text and no line moves (FP-8; law 8; S1 Q7). The HTML and the plan are
// made from one walk of the document (`walk`), so the two can never decide a
// block differently; every size and room the plan carries is P-LAY's shared
// measurement, which the CSS reads too. A typed line is set as its bytes are
// typed, in the body's type (FP-12): every character in its place, its white
// space kept, none dropped, and nothing the bytes alone suggest — a heading,
// emphasis, a list, a table — drawn as structure; it opens on an indent where
// it opens a typed line (`Part.opens`), the empty lines typed after it stand
// as whole line boxes below it (`Part.blank`), and no other room stands
// between blocks, so a column keeps its grid of lines.
// The item rule (`itemOf`; FP-24): every block that holds no text is an
// item of one kind — a record the record rule renders, a reference, a
// withheld run, or an item this client cannot show (hex, an atom of any
// other value) — named in the strings table's words (`itemWords`), the one
// entry the ARIA mirror announces at the item (N-WALK) and a copy's stand-in
// names it by. The copy's plain text (`copyText`; FP-24) is made here from
// what an article was made from: a span's items in the text's order, each
// stretch of text its own characters and each item a stand-in in square
// brackets in its place — a withheld run's owner and length, an unshown
// item's length, a record's own plain contents (`recordContents`) — never
// what the plane renders for whoever is looking, so a paste never joins text
// across an item.
// Figures: the device label's slot is LABEL_CH (24) figures of the client's
// face wide, the fingerprint cue's the cue's own CUE_CH characters of the
// identifier's.
// Rules: FP-1, FP-2, FP-8, FP-10, FP-12, FP-21, FP-22, FP-23, FP-24, FP-26,
// FP-30, FP-33, FP-34.

import { esc, fingerprintCue, sliceBytes, byteLength, keyFingerprint } from '../util.js';
import { t, tHTML, plural } from '../strings.js';
import { textOf, recordValue } from '../model/records.js';
import { memberOf, documentOf, homeOf, isUnder, cmpAddr, commonsType } from '../model/address.js';
import { touches, posOfChar, charOfPos } from './span.js';
import { MEASURE, BORDER, MEASURE_CPL, EDGE, EDGE_GAP, LINE_H, CHAR_W, borderEm, breakBetween, isSpace, gapOf, layoutOf, heightOf, wrap } from '../plane/layout.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('../model/records.js').Stretch} Stretch */
/** @typedef {import('../model/records.js').Origin} Origin */
/** @typedef {import('../model/records.js').Reader} Reader */
/** @typedef {import('../model/records.js').AccountFacts} AccountFacts */
/** @typedef {import('../model/records.js').RecordValue} RecordValue */
/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../plane/register.js').Mark} Mark */
/** @typedef {import('./span.js').Span} Span */
/** @typedef {import('../plane/layout.js').Row} Row */
/** @typedef {import('../plane/layout.js').Piece} Piece */
/** @typedef {import('../plane/layout.js').Keep} Keep */
/** @typedef {import('../plane/register.js').Face} Face */
/** @typedef {(text: string, face: Face) => number} Measure a string's width set in a face at 1 em, in em (T-LAYER's `widthOf`) */
/** @typedef {{text: string, face: Face}} Faced a stretch of words in one face */

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
 * @property {(doc: string) => string} originOwner the owner account of an origin document, by the one rule the byline's owner is found by (M-REC's `ownerAccount`): the owner a withheld run's placeholder names (R56)
 * @property {(doc: string) => (Clause | null)} clauseOf C-67's clause beneath a withheld run of an origin document, decided over what the page holds of the origin's edition claims (T-LAYER's `clauseOf`, by `editionClause`); null where nothing renders in its place
 * @property {(account: string) => (AccountFacts | undefined)} keyOf an account's byline facts as the page holds them (M-REC's `accountKey`): its device key, or why its byline names none; undefined while they are read
 * @property {number | null} [members] the chain's member count as its box's document holds it (M-PUMP's probe records it there, every version sharing the count): what the corner's version statement reads at a version, its own record holding none; absent, the document's own
 * @property {number | null} [read] a reading scene's pane's corner act, the one its Enter takes: the version it reads in the pane's place (SC; FP-23) — the newer one arrived, or the one the act left; absent or null, none
 * @property {number | null} [lacks] the version a pane's corner says holds none of the passage its act carried (SC; FP-23); absent or null, none
 * @property {number} [cpl] the measure the article's column is set at, in characters of its face (P-CAM's measure in force on the plane, the full measure in a pane): what a withheld run's gap holds is read at it (`gapHolds`); absent, the full measure
 * @property {Measure} measure a string's width in a face as the platform sets it (T-LAYER's `widthOf`): every fit the article judges — what a gap holds, a sign's lines in the edge, a label's cut, a slot's box — reads it
 */

/**
 * @typedef {Object} Head — the head's lines
 * @property {string} addr
 * @property {string} state the state line
 * @property {string} stateHTML the state line as markup, an address in it the identifier's
 * @property {Byline} byline the byline
 * @property {string} presence the presence line, '' where no link touches
 */

/**
 * @typedef {Object} Slot — one slot of a byline (FP-34): a box of its own width, what it shows in it, and its accessible
 * name
 * @property {'label' | 'fingerprint'} role the device label's slot, or the fingerprint cue's
 * @property {number} em its box's width, in em of the byline's size: LABEL_CH figures of the client's face, or the cue's own width in the identifier's
 * @property {'value' | 'pending' | 'cause'} state it shows its value; it is read, an empty box; it says why it can show none
 * @property {string} shows the words its box shows: its value — a label cut to its box — or the cause's; none while it is read, or where a slot beside it says its cause (`Byline.once`)
 * @property {string} whole its value whole where `shows` cuts it, else `shows` — the cause's words where it says why
 * @property {string} cause the string id of the cause's words; '' where it shows its value or is read
 * @property {string} told what its accessible name says it shows, after its role (`L.slot.named`): its value whole, the cause's words, or that it is being read
 */

/**
 * @typedef {Object} Byline — the head's byline (`bylineOf`)
 * @property {string} owner the owner's address
 * @property {Slot[]} slots the device label's slot, then — on a byline not the reader's own — the fingerprint cue's
 * @property {boolean} once one cause empties both slots: it is said once, in the first
 * @property {number} em its slots' box: each slot's and the separators between them, in em of the byline's size, whatever they show
 */

/** the device label's slot, in figures of the client's face (FP-34): a label the box does not hold is cut to it */
export const LABEL_CH = 24;
/** the fingerprint cue's slot, in characters of the identifier's face: the cue's own (`fingerprintCue`), every one of them one width */
export const CUE_CH = fingerprintCue('0'.repeat(64)).length;
/** the separator between a byline's owner and its slots, and between its slots */
const BY_SEP = ' · ';
/** the class an address stands in, in the identifier's face (P-REG's FACE) */
const ID = 'id';

/** each cause's words in the strings table (FP-34) */
const CAUSE_WORDS = /** @type {const} */ ({
  unsigned: 'F.slot.unsigned', 'by-reference': 'L.slot.by-reference', 'not-recorded': 'F.slot.not-recorded',
  withheld: 'F.corner.withheld', unreachable: 'F.daemon.unreachable', unread: 'L.slot.unread',
});

/**
 * A label cut to a slot's box (FP-26, FP-34), by its width as set: the label
 * whole where the box holds it; else the longest run of it the box holds with
 * an ellipsis after it, ending at a word's end — before a space, or after a
 * hyphen, an underscore or a period; where its first word alone overruns the
 * box, as many of its characters as the box holds with the ellipsis.
 * @param {string} label
 * @param {number} room the box's width, in em
 * @param {(s: string) => number} wide a string's width as it is set, in em
 * @returns {string}
 */
export function cutTo(label, room, wide) {
  if (wide(label) <= room + 1e-9) return label;
  const chars = [...label];
  const at = (/** @type {number} */ n) => chars.slice(0, n).join('').trimEnd() + '…';
  /** the longest of `ends` whose start with the ellipsis the box holds; 0 where none */
  const longest = (/** @type {number[]} */ ends) => { let best = 0; for (const n of ends) if (wide(at(n)) <= room + 1e-9) best = Math.max(best, n); return best; };
  const words = [];
  for (let i = 1; i < chars.length; i++) if (chars[i] === ' ' || '-_.'.includes(chars[i - 1])) words.push(i);
  return at(longest(words) || longest(chars.map((_, i) => i + 1)) || 1);
}

/**
 * The byline (see the head; FP-34): the owner's address and its slots — the device label's, and the fingerprint cue's
 * where the byline is not the reader's own (foundations §2.1) — each read from the
 * owner's facts as the view holds them (`keyOf`): its value — the label cut to its box (`cutTo`), `L.slot.unlabelled`
 * where the genesis entry carries none, the fingerprint's cue (`fingerprintCue`); an empty box while they are read; else the
 * cause's words (`CAUSE_WORDS`), a withheld read naming its owner, said once where it empties both slots. Each slot's
 * accessible name gives its role and what it shows — that it is being read, while it is (`told`). Each box's width is
 * measured in its face (the view's `measure`): LABEL_CH figures of the client's for the label, the cue's own in the
 * identifier's.
 * @param {string} owner
 * @param {ArticleView} v
 * @returns {Byline}
 */
export function bylineOf(owner, v) {
  const facts = owner ? v.keyOf(owner) : undefined;
  const labelEm = LABEL_CH * v.measure('0', 'client'), cueEm = v.measure(fingerprintCue('0'.repeat(64)), 'ident');
  /** @returns {Slot} */
  const slot = (/** @type {'label' | 'fingerprint'} */ role) => {
    const em = role === 'label' ? labelEm : cueEm;
    if (facts === undefined) return { role, em, state: 'pending', shows: '', whole: '', cause: '', told: t('L.slot.reading') };
    if ('cause' in facts) {
      const id = CAUSE_WORDS[facts.cause], words = t(id, { owner: facts.owner || owner });
      return { role, em, state: 'cause', shows: words, whole: words, cause: id, told: words };
    }
    if (role === 'fingerprint') { const cue = fingerprintCue(facts.fingerprint); return { role, em, state: 'value', shows: cue, whole: cue, cause: '', told: cue }; }
    if (facts.label === null) { const words = t('L.slot.unlabelled'); return { role, em, state: 'cause', shows: words, whole: words, cause: 'L.slot.unlabelled', told: words }; }
    return { role, em, state: 'value', shows: cutTo(facts.label, em, (x) => v.measure(x, 'client')), whole: facts.label, cause: '', told: facts.label };
  };
  const own = !!v.reader.account && v.reader.account === owner;
  const slots = own ? [slot('label')] : [slot('label'), slot('fingerprint')];
  const once = slots.length === 2 && facts !== undefined && 'cause' in facts;
  if (once) slots[1] = { ...slots[1], shows: '' };
  const em = slots.reduce((n, x) => n + x.em, 0) + v.measure(BY_SEP, 'client') * (slots.length - 1);
  return { owner, slots, once, em };
}

/**
 * A byline as HTML (`bylineOf`): its owner, in the identifier's face, then its slots in a box of their own width, each a
 * box of its own — a pending one empty, a cut label carrying its whole, which its act shows over what is beside it (on
 * the plane: T-LAYER's `openLabel`), and its title, the cue in the identifier's face — each named by its role and what
 * it shows; the separator between them unseen where one cause empties both.
 * @param {Byline} by
 */
function bylineHTML(by) {
  const slots = by.slots.map((s) => {
    const cut = s.state === 'value' && s.shows !== s.whole;
    const cls = ['slot', s.state === 'pending' ? 'pending' : '', cut ? 'cut' : '', s.role === 'fingerprint' && s.state === 'value' ? ID : ''].filter(Boolean).join(' ');
    const attrs = `data-slot="${s.role}"${s.cause ? ` data-string="${s.cause}"` : ''}${cut ? ` data-cut="1" title="${esc(s.whole)}"` : ''} role="img" aria-label="${esc(t('L.slot.named', { role: t(s.role === 'label' ? 'L.slot.device-label' : 'L.slot.fingerprint'), shows: s.told }))}" style="width:${s.em}em"`;
    return `<span class="${cls}" ${attrs}>${esc(s.shows)}${cut ? `<span class="whole">${esc(s.whole)}</span>` : ''}</span>`;
  }).join(`<span class="slot-sep">${esc(BY_SEP)}</span>`);
  return `<span class="by"><span class="${ID}">${esc(by.owner)}</span>${esc(BY_SEP)}<span class="slots${by.once ? ' once' : ''}" style="width:${by.em}em">${slots}</span></span>`;
}

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
/** a run's hairline label as markup (`labelOf`): its origin's address in the identifier's face */
const labelHTML = (/** @type {Origin} */ o, /** @type {Opening} */ at) => esc(t('L.origin-mark')) + (at.whole ? ` <span class="${ID}">${esc(o.doc)}</span>` : '');

/**
 * A string's words as runs of one face each (P-REG's FACE): the value of
 * each token `faces` names in that face, the rest the client's.
 * @param {string} id
 * @param {Record<string, string | number>} values
 * @param {Record<string, Face>} faces
 * @returns {Faced[]}
 */
function facedIn(id, values, faces) {
  const text = t(id);
  /** @type {Faced[]} */
  const out = [];
  let at = 0;
  for (const m of text.matchAll(/⟨([^⟩]+)⟩/g)) {
    const i = /** @type {number} */ (m.index);
    if (i > at) out.push({ text: text.slice(at, i), face: 'client' });
    out.push({ text: m[1] in values ? String(values[m[1]]) : m[0], face: faces[m[1]] || 'client' });
    at = i + m[0].length;
  }
  if (at < text.length) out.push({ text: text.slice(at), face: 'client' });
  return out;
}

/** a string's words as markup (ST's `tHTML`), each token `faces` sets in the identifier's face in its class */
const htmlIn = (/** @type {string} */ id, /** @type {Record<string, string | number>} */ values, /** @type {Record<string, Face>} */ faces) =>
  tHTML(id, values, Object.fromEntries(Object.entries(faces).filter(([, f]) => f === 'ident').map(([k]) => [k, ID])));

/**
 * The lines words take across a width (FP-26): wrapped at their spaces, each
 * word as wide as its runs set in their faces (`measure`), a box before them
 * — a symbol — taking `lead` of the first line, a line free to break after
 * it; never fewer lines than the platform sets them on, which breaks at a
 * space at the least.
 * @param {Faced[]} runs
 * @param {number} width the room across, in em of the words' size
 * @param {Measure} measure
 * @param {number} [lead] the box before the words, in em of their size
 * @returns {number}
 */
function linesAt(runs, width, measure, lead = 0) {
  /** @type {Faced[][]} */
  const words = [];
  let word = /** @type {Faced[]} */ ([]);
  for (const r of runs) for (const bit of r.text.split(/(\s+)/)) {
    if (!bit) continue;
    if (/^\s+$/.test(bit)) { if (word.length) words.push(word); word = []; } else word.push({ text: bit, face: r.face });
  }
  if (word.length) words.push(word);
  const space = measure(' ', 'client');
  let lines = 0, used = 0;
  const place = (/** @type {number} */ w, /** @type {number} */ gap) => {
    if (!lines) { lines = 1; used = w; } else if (used + gap + w <= width + 1e-9) used += gap + w; else { lines++; used = w; }
  };
  if (lead > 0) place(lead, 0);
  words.forEach((w, i) => place(w.reduce((n, x) => n + measure(x.text, x.face), 0), lead > 0 && i === 0 ? 0 : space));
  return lines;
}

/**
 * A sign's place in its column's edge (P-LAY's EDGE; FP-26): beside the
 * first line of the block it belongs to, EDGE_GAP past the text and as wide
 * as the rest of the edge, its first line as tall as the block's first line
 * so it stands level with it — never inside the text, so it sets no line
 * (A-254). Its sizes are in its own em, the count's of the block's,
 * read from P-LAY's body em; the style sets it on the text's side the edge
 * stands on (the plane's right; a reading scene's pane's inner side). A sign
 * stacked below another beside the same block — a withheld run's count below
 * its face's compact mark — stands the lines that sign takes below the
 * block's first line (`edgeLines`).
 * @param {number} k the size of the block it stands beside, in the body's em
 * @param {number} [below] the edge's lines above it, of the signs before it beside the block
 * @returns {string} its inline style
 */
function edgeStyle(k, below = 0) {
  const s = MEASURE.count * k;
  return `--edge-in:${EDGE_GAP / s}em;--edge-w:${(EDGE - EDGE_GAP) / s}em;line-height:${(k * LINE_H) / s}` + (below ? `;top:${(below * k * LINE_H) / s}em` : '');
}

/**
 * The lines a sign's words take in its column's edge, at the size of the
 * block it stands beside (`edgeStyle`), wrapped across the edge's width as
 * measured in their faces (`linesAt`).
 * @param {Faced[]} runs
 * @param {number} k the size of the block it stands beside, in the body's em
 * @param {Measure} measure
 */
const edgeLines = (runs, k, measure) => linesAt(runs, (EDGE - EDGE_GAP) / (MEASURE.count * k), measure);

/**
 * The others' count in a block's column's edge: "+⟨n⟩ others", or the social
 * types' one unnumbered mark where none is counted; nothing where neither
 * stands.
 * @param {{n: number, social: boolean}} c
 * @param {number} k the block's size, in the body's em
 * @param {number} [below] the edge's lines above it (`edgeStyle`)
 */
const countHTML = (c, k, below = 0) => (c.n > 0 ? `<span class="others edge" data-count="${c.n}" style="${edgeStyle(k, below)}">${esc(t('F.others-count', { n: c.n }))}</span>`
  : c.social ? `<span class="others edge social" data-count="0" style="${edgeStyle(k, below)}">◦</span>` : '');

/** the stretches of a drawn link's end that meet a block */
const runsIn = (/** @type {Shown} */ m, /** @type {{pos: number, width: number}} */ b) => m.runs.filter((r) => touches(b, r));

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
 * Is a link's symbol lit — drawn heavier while an arrival stands (foundations
 * §2.1; FP-30) — the links it stands for
 * merged as P44 merges one site's marks: heavier only where every one of them
 * is among the links lit (LK's `lit`; its `mergedMark`'s weight). The one rule
 * T-LAYER marks a standing article's symbols by in place, as `blockMarks` its
 * blocks, so an arrival rebuilds no article and sets no line (FP-12): the
 * article is made, and its lines measured, with no symbol lit.
 * @param {string[]} links the links the symbol stands for
 * @param {readonly string[]} lit the links lit at an arrival
 * @returns {boolean}
 */
export const symbolLit = (links, lit) => links.length > 0 && links.every((l) => lit.includes(l));

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
 * @property {'withheld' | 'record' | 'ref' | 'unshown' | 'para'} kind a withheld run; a record the record rule renders; a reference; an item this client cannot show (`itemOf`); a typed line
 * @property {boolean} opens a typed line's: it opens a typed line — it holds a character and begins the document or follows a newline — and so stands on the indent; false where it continues the line an item or positions not held began, and on every other block
 * @property {number} blank a typed line's: the empty lines typed after it, each a body line box below it (`blankOf`); 0 on every other block
 * @property {Seg[]} segs a typed line's stretches, the symbols standing in it among them
 * @property {Shown[]} ends a withheld run's: the ends drawn at it (LK's `Shown.run`), in the order LK drew them, which the one symbol at the start of its gap stands for
 * @property {{n: number, social: boolean}} count the others' count at a typed line or a withheld run
 * @property {Rec | null} rec a record atom's record
 */

/**
 * @typedef {Object} Walk — the article as one walk of the document decided it: both renderings are made from this
 * @property {Head} head
 * @property {Part[] | null} parts the blocks; null where a read refused the document (the head alone stands)
 * @property {boolean} empty the document holds no position
 * @property {string[]} offers the documents this one windows (the scene-offers), none in the scene
 */

/** the newlines a typed line's block holds after its characters: its width past their bytes, each newline one byte (M-REC's `deriveBlocks`) */
const newlinesOf = (/** @type {Block} */ b) => b.width - byteLength(b.text);

/**
 * The empty lines typed after a typed line's block (`Part.blank`): the
 * newlines it holds after its characters but the one that ends its own line;
 * where it holds none — the newlines before a run's first typed line — every
 * newline it holds but the one that ends the line of an item standing right
 * before it.
 * @param {Block} b
 * @param {Block | undefined} prev the block before it, in the document's order
 * @returns {number}
 */
function blankOf(b, prev) {
  const n = newlinesOf(b);
  if (b.text) return Math.max(0, n - 1);
  return Math.max(0, n - (prev && prev.kind !== 'para' && prev.pos + prev.width === b.pos ? 1 : 0));
}

/**
 * Does a typed line's block open a typed line (`Part.opens`): it holds a
 * character and begins the document, or stands right after a block whose
 * newline ends the line before it — never after an item or positions not
 * held, whose line it continues.
 * @param {Block} b
 * @param {Block | undefined} prev the block before it, in the document's order
 * @returns {boolean}
 */
function opensLine(b, prev) {
  if (!b.text) return false;
  if (b.pos === 1) return true;
  return !!prev && prev.kind === 'para' && prev.pos + prev.width === b.pos && newlinesOf(prev) > 0;
}

/**
 * The record rule: a record atom that names its type renders as the record
 * it is (D13), its value read by M-REC's `recordValue` — the genesis record to
 * its account's owner and to a reader;
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
 * The record rule's HTML (`recordOf`), the other owner its genesis record
 * names in the identifier's face.
 * @param {Block} b
 * @param {Doc} d
 * @param {ArticleView} v
 */
export function recordHTML(b, d, v) {
  const r = recordOf(b, d, v.reader);
  if (r.type === 'skep-enroll') {
    const words = v.reader.account && d.account === v.reader.account ? esc(r.words) : htmlIn('F.home-record.other', { owner: d.account || '' }, { owner: 'ident' });
    return `<span class="rec" data-rec="skep-enroll"><span class="rec-words">${words}</span><span class="derived">${esc(r.keys)}</span></span>`;
  }
  if (r.type === 'skep-head') return `<span class="rec" data-rec="skep-head"><span class="k">skep-head</span> position ${esc(r.position)} · chain ${esc(r.chain)}…</span>`;
  return `<span class="rec">${esc(r.words)}</span>`;
}

/**
 * @typedef {'record' | 'reference' | 'withheld' | 'unshown'} ItemKind — the kind of a block that holds no text (the item
 * rule, `itemOf`): a record the record rule renders, a link position's reference, a withheld run, or an item this client
 * cannot show
 */

/** each item kind's words in the strings table: the one entry the ARIA mirror announces at the item and a copy's stand-in names it by (FP-24) */
const ITEM_WORDS = /** @type {const} */ ({ record: 'L.item.record', reference: 'L.item.reference', withheld: 'L.item.withheld', unshown: 'L.item.unshown' });

/**
 * The item rule (FP-24): the kind of a block
 * that holds no text — a record, an atom whose value the record rule renders
 * as one (`recordOf`); a reference, a link position's item; a withheld run;
 * else an item this client cannot show, hex or an atom of any other value —
 * and null for a typed line, whose text is the document's own. The ARIA
 * mirror's item at the block (N-WALK) and a copy's stand-in in its place
 * (`copyText`) both read it, so what is announced and what is pasted never
 * part; its record is the one the plane renders as a record (M-REC's
 * `recordValue`).
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
 * kind (FP-24): each key of a genesis record `skep-enroll`, in the record's
 * own order — its label where it has one, then its fingerprint (AUTH-1.8,
 * util's `keyFingerprint`) where its alg and value derive one; nothing for any
 * other record, and never what the plane renders for whoever is looking,
 * which is not on the board.
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
 * on a read the board does not serve; the no-grant arm is a build's without
 * a grant primitive, which this board has.
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
 * @property {string} claimant that claimant, whose address its words name
 */

/**
 * @typedef {Object} Unread — C-67's place where a read the clause is decided from failed (FP-33), so nothing is followed: a blank there would read as no claim
 * @property {'L.clause.unread'} id its string
 * @property {string} text its words
 */

/** @typedef {Pointer | Quoting | Unread} Clause — C-67's clause as it renders: its string id and its words, and, where it is the pointer, the claim it follows */

/**
 * @typedef {Object} ClaimSeen — one edition claim the lookup on an origin listed, as the page holds its two reads of it (PUB-7.50)
 * @property {string} claim the claim's address — a link
 * @property {{type: string | null, from: EndRef[]} | null} link the link as `read_link` answered it — its type as the page reads every link's, the type slot's first address — or null where unread
 * @property {string} home the document the claim resides in, from its address (M-ADDR's `homeOf`)
 * @property {boolean | null} published whether the home is published (`doc_metadata`): false where a read of it was refused `withheld` or `doc_not_registered`, null where none answered yet
 * @property {string} claimant the home's owner, by the one owner rule (M-REC's `ownerAccount`): who claims
 * @property {boolean} failed a read its admission waits on failed — its link's, or its home's metadata — refused for a reason that says nothing of what it reads, or not answered, and unanswered since (M-REC's `readFailed`)
 */

/**
 * @typedef {ClaimSeen[] | 'withheld' | 'unread' | null} ClaimsSeen — what the page holds of the edition-claim lookup on an origin (M-REC's `Lookup`): the claims listed, each as its reads hold it; 'withheld' where the board refused the lookup as a read withheld from the reader; 'unread' where it failed any other way; null where it has not answered
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
 * C-67's clause beneath a withheld run of `origin` (PUB-5.124; FP-33), its
 * answers decided over the origin's whole admitted-claim set, never per
 * claim (RES-164): the pointer where any admitted claim passes the
 * resolution test — its FROM holds a span, and none of its spans lies in the
 * origin (the span's document, `homeOf`: the board's `document_of`
 * arithmetic), so its edition holds bytes the reader can reach — following
 * the passing claim PUB-3.107's origin-keyed order picks (RES-152): a
 * passing claim whose home the origin's owner owns first, the
 * lowest-addressed among several (PUB-4.7), else the lowest-addressed
 * passing claim, a delegate's edition being bytes this reader can reach as
 * they stand; the quoting sibling where every admitted claim quotes — a FROM
 * holding a span of the origin, or none — naming the lowest-addressed
 * claimant; and the empty place, null, where none is admitted (RES-85), the
 * arm's own copy then standing alone. The board refusing the lookup as a
 * read withheld from the reader leaves the empty place too; the lookup
 * failing any other way, or a listed claim's admission waiting on a read
 * that failed (`ClaimSeen.failed`) where no admitted claim known passes and
 * none waits on a read still to answer, leaves the unread place (`unread`),
 * for a blank there would read as no claim. Undecided — the lookup not
 * answered, or a listed claim waiting on a read not yet made — the clause is
 * the empty place, unless an admitted claim already known passes, the
 * pointer then following the pick among the claims known (the article is
 * made again as the rest are read): no reader is pointed at an edition, told
 * nothing published carries the bytes, or told the claims were not read, on
 * reads the page has not made. Addresses are ordered as tumblers (`cmpAddr`),
 * never as strings.
 * @param {string} origin the withheld run's origin document
 * @param {string} owner the origin's owner (T-LAYER's `originOwner`)
 * @param {ClaimsSeen} claims what the page holds of the lookup on the origin
 * @returns {Clause | null}
 */
export function editionClause(origin, owner, claims) {
  if (claims === 'unread') return unread();
  if (!Array.isArray(claims)) return null;
  /** @type {ClaimSeen[]} the admitted claims whose edition holds bytes the reader can reach */
  const passing = [];
  /** @type {string[]} the claimants of the admitted claims that quote */
  const quoting = [];
  let waiting = false, failed = false;
  for (const c of claims) {
    const a = admitted(c, owner);
    if (a === null) { if (c.failed) failed = true; else waiting = true; continue; }
    if (!a || !c.link) continue;
    if (c.link.from.length && !c.link.from.some((e) => homeOf(e.start) === origin)) passing.push(c);
    else quoting.push(c.claimant);
  }
  const own = passing.filter((c) => c.claimant === owner);
  const [pick] = (own.length ? own : passing).sort((x, y) => cmpAddr(x.claim, y.claim));
  if (pick) return { id: 'C-67.pointer', text: t('C-67.pointer'), claim: pick.claim, home: pick.home };
  if (waiting) return null;
  if (failed) return unread();
  if (!quoting.length) return null;
  const claimant = quoting.sort(cmpAddr)[0];
  return { id: 'C-67.quoting', text: t('C-67.quoting', { claimant }), claimant };
}

/** C-67's unread place, in its words (`Unread`) */
const unread = () => /** @type {Unread} */ ({ id: 'L.clause.unread', text: t('L.clause.unread') });

/**
 * @typedef {Object} Placeholder — what R56's placeholder at a withheld run shows a reader: existence and owner, never bytes (B1-S7)
 * @property {string} owner the owner of the run's origin, whoever owns the document windowing the run
 * @property {string} head B1-S7's head: that owner, the run's width and its origin
 * @property {Record<string, string | number>} vals the values B1-S7's head is filled with, by token: what its words and its markup are made of (`headHTML`, `headRuns`)
 * @property {{id: string, text: string}} arm the entitlement arm for that owner and this reader (`entitlementArm`)
 * @property {Clause | null} clause C-67's clause beneath the arm (`editionClause`), the pointer naming the claim it follows; null where nothing renders in its place
 */

/** the faces of B1-S7's head's tokens: the owner, the account and the origin addresses */
const HEAD_FACES = /** @type {Record<string, Face>} */ ({ owner: 'ident', account: 'ident', origin: 'ident' });
/** a placeholder's head as markup: its addresses in the identifier's face */
const headHTML = (/** @type {Placeholder} */ p) => htmlIn('B1.withheld-run', p.vals, HEAD_FACES);
/** a placeholder's head as runs in their faces, as it is measured */
const headRuns = (/** @type {Placeholder} */ p) => facedIn('B1.withheld-run', p.vals, HEAD_FACES);
/** an arm's words as runs in their faces, as it is measured: the owner R56's arm names in the identifier's */
const armRuns = (/** @type {Placeholder} */ p) => facedIn(p.arm.id, { owner: p.owner }, { owner: 'ident' });
/** an arm's words as markup: the owner R56's arm names in the identifier's face */
const armHTML = (/** @type {Placeholder} */ p) => htmlIn(p.arm.id, { owner: p.owner }, { owner: 'ident' });
/** a clause's words as runs in their faces: the claimant QUOTING names in the identifier's */
const clauseRuns = (/** @type {Clause} */ c) => (c.id === 'C-67.quoting' ? facedIn(c.id, { claimant: c.claimant }, { claimant: 'ident' }) : [{ text: c.text, face: /** @type {Face} */ ('client') }]);

/**
 * The R56 placeholder at a withheld run, as one record: existence and owner,
 * never bytes — the owner its origin's (`originOwner`), whoever owns the
 * document windowing the run, since R56's copy derives per origin and
 * B1-S7's ⟨owner⟩ is always derivable (A-289); the head naming that owner,
 * the entitlement arm (`entitlementArm`) the one for it, then C-67's clause
 * as the origin's edition claims decide it (`clauseOf`), or nothing in its
 * place (R56). The plane's and a pane's placeholder
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
  const vals = { owner, account: owner, width: b.width, origin: b.origin || '' };
  return {
    owner,
    head: t('B1.withheld-run', vals),
    vals,
    arm: entitlementArm(reader, owner),
    clause: b.origin ? clauseOf(b.origin) : null,
  };
}

/**
 * @typedef {'face' | 'head' | 'owner' | 'mark'} GapHolds what a withheld run's gap holds (`gapHolds`): its face whole; its head; the owner of its origin; the origin's mark
 */

/**
 * What a withheld run's gap holds at a measure (foundations §2.1; FP-26), so
 * the gap keeps encoding the width and no face reflows the text: the run's
 * face whole — its head, the arm and the clause beneath it, each at the run's
 * size, the room above the arm and the clause — where the gap's full lines
 * (P-LAY's `gapOf`) hold it, its words wrapped across the measure as they are
 * set in their faces (`linesAt`); else its head where they hold that; else
 * its origin's owner, where a line of the gap holds the address; else the
 * origin's mark — each measured with the symbol the ends drawn at the run
 * merge into standing first in its first line (`runSymbol`; FP-30), so a
 * symbol there steps the notice to a smaller form and is never dropped.
 * Whatever it holds, the gap stands on the run's bars, and where its face is
 * not in it the face stands compact in the column's edge
 * (`withheldBlockHTML`).
 * @param {Placeholder} p
 * @param {number} width the run's positions
 * @param {number} cpl the measure
 * @param {Measure} measure the words' widths in their faces (the view's)
 * @param {number} [ends] the ends drawn at the run, which its one symbol stands for; none, no symbol
 * @returns {GapHolds}
 */
export function gapHolds(p, width, cpl, measure, ends = 0) {
  const gap = gapOf(width, cpl), full = gap.filter((w) => w >= cpl).length, room = cpl * CHAR_W;
  const lead = ends ? boxWidth(runSymbol(1, ends)) * CHAR_W : 0, head = linesAt(headRuns(p), room, measure, lead);
  const below = (/** @type {Faced[]} */ words) => MEASURE.faceGap + linesAt(words, room, measure) * LINE_H;
  const deep = head * LINE_H + below(armRuns(p)) + (p.clause ? below(clauseRuns(p.clause)) : 0);
  if (deep <= full * LINE_H + 1e-9) return 'face';
  if (head <= full) return 'head';
  if (lead + measure(p.owner, 'ident') <= (full ? cpl : gap[0]) * CHAR_W + 1e-9) return 'owner';
  return 'mark';
}

/**
 * The gap occupying a withheld run (`placeholderOf`; F2.1-i): as tall as its
 * bars, its ground drawn over the run's own lines — the last its remainder
 * (`--wh-last`) — holding what `gapHolds` says it holds: its face whole, its
 * head, arm and, where one renders, clause (`clauseHTML`); else its head, its
 * origin's owner or the origin's mark, the face compact in the column's edge
 * level with the run's first line — the owner with a mark that opens it
 * whole (foundations §2.1), its act the run's face whole on the plane
 * (APP-INPUT; O-FACES's `withheldRun`), a line in a reading scene's pane,
 * where nothing is acted on (SC). Every address it names is set in the
 * identifier's face. The ends drawn at the run (`Part.ends`;
 * FP-30) stand as the one symbol they merge into, first in the gap's first
 * line, before whatever it holds (`runSymHTML`), and the others' links drawn
 * there are counted in the column's edge, below the face's compact mark where
 * that stands there, as many of the edge's lines down as the mark's words
 * take, measured (`countHTML`, `edgeLines`). The owner it names is carried
 * (`data-owner`) for C-39's face at the run, which names the same.
 * @param {Block} b the withheld run
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {{ends: Shown[], count: {n: number, social: boolean}}} [at] the ends drawn at the run, and the others' count there
 */
export function withheldBlockHTML(b, d, v, at = { ends: [], count: { n: 0, social: false } }) {
  const p = placeholderOf(b, v.reader, v.originOwner, v.clauseOf);
  const cpl = v.cpl ?? MEASURE_CPL, gap = gapOf(b.width, cpl), holds = gapHolds(p, b.width, cpl, v.measure, at.ends.length);
  const [one, ...more] = at.ends;
  const sym = one ? runSymHTML([one, ...more], v) : '';
  const inside = holds === 'face' ? `<span class="wh-head">${sym}${headHTML(p)}</span><span class="arm">${armHTML(p)}</span>${clauseHTML(p.clause, v.scene)}`
    : holds === 'head' ? `<span class="wh-head">${sym}${headHTML(p)}</span>`
    : holds === 'owner' ? `<span class="wh-owner">${sym}<span class="${ID}">${esc(p.owner)}</span></span>`
    : `<span class="wh-origin">${sym}${esc(t('L.origin-mark'))}</span>`;
  const marked = /** @type {Record<string, Face>} */ ({ owner: 'ident' });
  const mark = holds === 'face' ? '' : `<span class="wh-mark edge" data-mark="withheld"${control(v.scene)} style="${edgeStyle(1)}">${htmlIn('L.withheld.mark', { owner: p.owner }, marked)}</span>`;
  const count = countHTML(at.count, 1, mark ? edgeLines(facedIn('L.withheld.mark', { owner: p.owner }, marked), 1, v.measure) : 0);
  return `<span class="withheld" data-pos="${b.pos}" data-width="${b.width}" data-withheld="1" data-origin="${esc(b.origin || '')}" data-owner="${esc(p.owner)}" data-holds="${holds}" style="height:${gap.length * LINE_H}em;--wh-last:${gap[gap.length - 1]}">` +
    `${mark}${count}${inside}</span>`;
}

/**
 * The gap occupying an item this client cannot show (`itemOf`'s 'unshown';
 * FP-26): as tall as its bars — each of its positions one advance, the last
 * of its lines its remainder (`--wh-last`) — its words, "not rendered" with
 * its width, in it where its full lines hold them as measured (`linesAt`),
 * else in its column's edge level with its first line; it carries the
 * block's marks (`blockMarks`), as every block does.
 * @param {Block} b
 * @param {ArticleView} v
 * @param {string} cls the block's classes
 * @param {string} at the block's attributes
 */
function unshownHTML(b, v, cls, at) {
  const cpl = v.cpl ?? MEASURE_CPL, gap = gapOf(b.width, cpl), full = gap.filter((w) => w >= cpl).length;
  const words = t('F.not-rendered', { width: b.width });
  const inside = full > 0 && linesAt([{ text: words, face: 'client' }], cpl * CHAR_W, v.measure) <= full;
  const said = inside ? `<span class="unshown">${esc(words)}</span>` : `<span class="unshown edge" style="${edgeStyle(1)}">${esc(words)}</span>`;
  return `<span class="${cls} gap" ${at} style="height:${gap.length * LINE_H}em;--wh-last:${gap[gap.length - 1]}">${said}</span>`;
}

/**
 * C-67's clause beneath a withheld run's arm, where one renders. On the plane
 * the pointer is a control (`control`) carrying the claim it follows and that
 * claim's home (`data-claim`, `data-home`): its act is the LEAP to the home,
 * the edition, that APP-INPUT makes (B1-S7 → S6). In a reading scene's pane,
 * where nothing acts on a mark (SC), it is a line; the QUOTING sibling, its
 * claimant in the identifier's face, and the unread place are lines
 * everywhere, for they follow nothing.
 * @param {Clause | null} c
 * @param {boolean} scene the scene-mode variant
 */
function clauseHTML(c, scene) {
  if (!c) return '';
  const follows = c.id === 'C-67.pointer' && !scene ? ` data-claim="${esc(c.claim)}" data-home="${esc(c.home)}"${control(scene)}` : '';
  const words = c.id === 'C-67.quoting' ? htmlIn(c.id, { claimant: c.claimant }, { claimant: 'ident' }) : esc(c.text);
  return `<span class="clause"${follows}>${words}</span>`;
}

/**
 * The corner's items in foundations' one order (§3.1): an edition's state
 * with "version ⟨k⟩ of ⟨n⟩" and R20's teaching, keyed by venue — at a pinned
 * version its own number of the count its box's document holds (`members`),
 * so the corner names the version its box shows and offers the versions list
 * there too (FP-22); in a reading scene's pane, where the version its pane
 * reads lacks the passage its act carried, a line saying so (`lacks`), and
 * its act reading another version in the pane's place (`read`; FP-23); a
 * draft's chip (C-28); the whole-document link count (rule (i)). Compact
 * (FP-26): an edition's state its version marker — unlit at the bare
 * address, lit at a pinned version (foundations §3.1) — and a draft's chip a
 * glyph, each named by its whole words, which assistive technology reads and
 * its act opens whole;
 * "version ⟨k⟩ of ⟨n⟩", the whole-document count and a withheld document's
 * state keep their words, its owner in the identifier's face. The holder makes the element they stand in
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
  if (d.refused === 'withheld') parts.push(`<span class="st">${htmlIn('F.corner.withheld', { owner: d.account || '' }, { owner: 'ident' })}</span>`);
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
 * Where a link's symbol stands in a typed line's text: right after the last
 * word its span touches — the first point at or after the span's last
 * character that is not a space where P-LAY may break its line
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
 * @param {string} text the typed line's text
 * @param {number} c0 the span's first character in it
 * @param {number} c1 one past the span's last character in it
 * @param {(i: number) => (Chrome | null)} chromeAt the chrome of the run whose first stretch in the typed line starts at character `i`
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
 * @param {Array<{s: Shown, r: Stretch}>} standing the symbols standing in this block, each with the stretch it stands after: its last drawn stretch a typed line holds, which ends in this one
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
  const stands = standing.map(({ s, r }) => {
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
 * The head's lines: the address, the state line — an address it names in
 * the identifier's face — the byline (`bylineOf`), and the presence line
 * where links touch.
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} owner
 * @returns {Head}
 */
function headOf(d, v, owner) {
  const published = d.meta ? d.meta.published : d.kind === 'edition';
  /** @type {[string, Record<string, string>, Record<string, Face>]} the state line's string, its values and its tokens' faces */
  const [id, vals, faces] = d.refused === 'withheld' ? ['F.corner.withheld', { owner }, { owner: 'ident' }]
    : d.refused === 'unregistered' ? ['B1.doc_not_registered', { address: d.addr }, { address: 'ident' }]
    : [published ? 'B1.state-line' : 'F.label.draft', {}, {}];
  const touching = v.marks.length;
  const presence = touching ? (touching === 1 ? t('B1.presence.1') : t('B1.presence', { n: touching })) : '';
  return { addr: d.addr, state: t(id, vals), stateHTML: htmlIn(id, vals, faces), byline: bylineOf(owner, v), presence };
}

/**
 * The one walk of a document both renderings are made from: the head, then
 * each block decided once — withheld, with the ends drawn at it and its
 * others' count, a record, a reference, an item not rendered, or a typed
 * line, whether it opens a typed line (`opensLine`), the empty lines typed
 * after it (`blankOf`), its stretches with the symbols standing at them and
 * its others' count — then the empty document's line and the scene-offers. A
 * symbol stands in the last typed line its drawn stretches touch — the one
 * the last of them a typed line holds ends in — once however many it
 * crosses; an end LK draws at a withheld run (`Shown.run`) stands in that
 * run's gap at every stage, the gap having no text to mark (FP-30).
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
  // the symbols standing in each typed line, by its first position: the typed line the last of each one's drawn stretches a typed line holds ends in
  /** @type {Map<number, Array<{s: Shown, r: Stretch}>>} */
  const standing = new Map();
  for (const s of v.symbols) {
    if (s.run) continue;
    for (let i = s.runs.length - 1; i >= 0; i--) {
      const r = s.runs[i];
      let last = null;
      for (const b of d.blocks) if (b.kind === 'para' && touches(b, r)) last = b;
      if (!last) continue;
      standing.set(last.pos, [...(standing.get(last.pos) || []), { s, r }]);
      break;
    }
  }
  const none = { n: 0, social: false };
  /** @type {Part[]} */
  const parts = d.blocks.map((b, i) => {
    /** @type {Part} */
    const p = { b, kind: 'para', opens: false, blank: 0, segs: [], ends: [], count: none, rec: null };
    if (b.kind === 'withheld') { p.kind = 'withheld'; p.ends = v.marks.filter((s) => !!s.run && s.run.pos === b.pos); p.count = v.countAt(b); }
    else if (b.kind === 'ref') p.kind = 'ref';
    else if (itemOf(b) === 'unshown') p.kind = 'unshown';
    else if (b.kind === 'atom') { p.kind = 'record'; p.rec = recordOf(b, d, v.reader); }
    else {
      p.opens = opensLine(b, d.blocks[i - 1]);
      p.blank = blankOf(b, d.blocks[i - 1]);
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
 * said before anyone follows it (foundations §2.3; FP-21); carrying its
 * link and its end's key (LK's `endKey`): the end whose card a click on it
 * opens (APP-INPUT).
 * @param {Shown} s
 * @param {ArticleView} v
 */
function symHTML(s, v) {
  return `<span class="sym ${s.linker === 'others' ? 'other' : ''} ${s.mark.value < 1 ? 'visited' : ''}" data-link="${esc(s.link.addr)}" data-end="${esc(s.key)}" style="--mark-hue:${s.mark.hue};--mark-value:${s.mark.value}"${control(v.scene)} title="${esc(titleOf(s, v))}">⟡</span>`;
}

/** a symbol's title for one end it stands for: its link's type, then what its far end's text holds of its passage where the view says anything of it (see `symHTML`) */
const titleOf = (/** @type {Shown} */ s, /** @type {ArticleView} */ v) => { const says = v.says(s); return (s.link.type || '') + (says ? ' · ' + says : ''); };

/**
 * The one symbol the ends drawn at a withheld run merge into (FP-30; P44),
 * first in its gap's
 * first line, beside the notice: in the one mark their links merge into (the
 * view's `mergedMark`) — dashed where every one is another's, lighter where
 * every one was followed — its ⟡ followed by how many it stands for where
 * they are two or more, a bare numeral, as a merged tail's count is; titled
 * with each end's own title; carrying every end by its link and its key
 * (LK's `endKey`), in the order LK drew them, so a click opens the card of
 * its one end or lists its several (APP-INPUT; O-ANATOMY). Its width, in
 * characters, the style reads from `--sym-chars`.
 * @param {[Shown, ...Shown[]]} ends
 * @param {ArticleView} v
 */
function runSymHTML(ends, v) {
  const [first, ...rest] = ends;
  const m = v.mergedMark([first.mark, ...rest.map((s) => s.mark)]), n = ends.length > 1 ? String(ends.length) : '';
  return `<span class="sym at-run ${m.linker === 'others' ? 'other' : ''} ${m.value < 1 ? 'visited' : ''}" data-links="${ends.map((s) => esc(s.link.addr)).join(' ')}" data-ends="${ends.map((s) => esc(s.key)).join(' ')}" style="--mark-hue:${m.hue};--mark-value:${m.value};--sym-chars:${1 + n.length}"${control(v.scene)} title="${esc(ends.map((s) => titleOf(s, v)).join('; '))}">⟡${n}</span>`;
}

/**
 * A document's characters as markup, every one kept: escaped, a carriage
 * return written as its character reference, which the parser keeps as the
 * character typed where it would read the character itself as a line's end.
 * @param {string} text
 */
const typedHTML = (text) => esc(text).replace(/\r/g, '&#13;');

/**
 * A stretch of a typed line's text as HTML: its links marked by their depth
 * in the one mark they merge into — its hue, its value, `visited` where it is
 * drawn lighter — carrying the ends marking it, their links and their keys
 * (LK's `endKey`) in one order, the first the end whose card a click on it
 * opens (APP-INPUT); its run's ground and, where it opens its run, the run's
 * boundary, hairline and C-33's mark — the hairline naming the run's origin,
 * in the identifier's face, and carrying the run's own positions in this document, the passage its
 * gesture to the source carries (foundations §2.1, §2.3) — then
 * the symbols standing at it — the text's own characters untouched (`typedHTML`).
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
    const chrome = !at ? '' : `<span class="hairline ${at.whole ? 'whole' : 'compact'}" data-src="${esc(o)}" data-pos="${s.origin.pos}" data-width="${s.origin.width}" title="${esc(o)}">${labelHTML(s.origin, at)}</span>` +
      (at.c33 ? `<span class="pubmark" data-mark="C-33">${esc(t('C-33'))}</span>` : '');
    return `<span class="${cls.join(' ')}" ${attrs.join(' ')}>${chrome}${s.chromeSyms.map((x) => symHTML(x, v)).join('')}${typedHTML(s.text)}</span>${syms}`;
  }
  return (cls.length > 1 ? `<span class="${cls.join(' ')}" ${attrs.join(' ')}>${typedHTML(s.text)}</span>` : typedHTML(s.text)) + syms;
}

/**
 * The article: the head and the blocks (each a span the walk and the mirror
 * key by its first position, and a click on the plane selects whole) — a
 * typed line a `p` in the body's type, on the indent where it opens a typed
 * line (`indent`), the empty lines typed after it its room below it
 * (`--blank`, in body line boxes); its corner stands beside it
 * (`cornerHTML`).
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} ownerAccount the owner by `effective_owner`, or the document's account
 * @returns {string}
 */
export function articleHTML(d, v, ownerAccount) {
  const w = walk(d, v, ownerAccount);
  const hd = w.head;
  let h = `<div class="hd"><span class="addr ${ID}">${esc(hd.addr)}</span><span class="st">${hd.stateHTML}</span>${bylineHTML(hd.byline)}`;
  if (hd.presence) h += `<span class="pres"><span class="sym reveal" data-reveal="${esc(d.addr)}"${control(v.scene)}>⟡</span> ${esc(hd.presence)}</span>`;
  h += `</div>`;
  if (!w.parts) return h;
  let run = '';
  for (const p of w.parts) {
    const b = p.b;
    if (p.kind === 'withheld') { run += withheldBlockHTML(b, d, v, { ends: p.ends, count: p.count }); continue; }
    const mark = blockMarks(d.addr, b, v.selected, v.focus);
    const cls = ['sp', 'blk-' + b.kind];
    if (p.opens) cls.push('indent');
    if (mark.sel) cls.push('sel');
    if (mark.lit) cls.push('lit');
    const at = `data-addr="${esc(d.addr)}" data-pos="${b.pos}" data-width="${b.width}"`;
    if (p.kind === 'record') { run += `<span class="${cls.join(' ')}" ${at}>${recordHTML(b, d, v)}</span>`; continue; }
    if (p.kind === 'ref') { run += `<span class="${cls.join(' ')} ref" ${at}>⟡</span>`; continue; }
    if (p.kind === 'unshown') { run += unshownHTML(b, v, cls.join(' '), at); continue; }
    run += `<p class="${cls.join(' ')}" ${at}${p.blank ? ` style="--blank:${p.blank}"` : ''}>${countHTML(p.count, 1)}${p.segs.map((s) => segHTML(s, v)).join('')}</p>`;
  }
  if (w.empty) run += `<p class="sp empty" data-addr="${esc(d.addr)}" data-pos="1" data-width="0">${esc(t('B1.empty_subspace'))}</p>`;
  for (const o of w.offers) run += `<span class="offer" data-scene="${esc(d.addr)}|${esc(o)}" role="button" tabindex="-1">${htmlIn('B1.scene-offer', { D: o }, { D: 'ident' })}</span>`;
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
 * The symbol the ends drawn at a withheld run merge into (`runSymHTML`): an
 * inline-block at a symbol's size, its ⟡ and, where it stands for two or
 * more, their count, its border and padding either side, the room after it —
 * it stands first in its line.
 * @param {number} k the size of the line it stands in, in the body's em
 * @param {number} n the ends it stands for
 * @returns {Piece}
 */
const runSymbol = (k, n) => {
  const s = MEASURE.sym * k, edge = borderEm(BORDER.box) + MEASURE.symPad * s;
  return { text: '⟡' + (n > 1 ? String(n) : ''), size: s, lead: edge, trail: edge + MEASURE.symGap * s, box: true, own: false };
};
/** an inline-block's width in characters of the body's face, as P-LAY's `wrap` sets it */
const boxWidth = (/** @type {Piece} */ p) => (p.lead + p.trail) / CHAR_W + [...p.text].length * p.size;
/**
 * A byline's pieces (`bylineHTML`): its owner and the separator, then its slots' box, one inline-block as wide as every
 * slot and separator in it — no characters, for it sets its width alone — so its line is the same whatever the slots show,
 * read or not (FP-34).
 * @param {Byline} by
 * @param {number} k the head's size, in the body's em
 * @returns {Piece[]}
 */
const bylinePieces = (by, k) => [piece(by.owner + BY_SEP, k), { text: '', size: k, lead: by.em * k, trail: 0, box: true, own: false }];
/**
 * A row of the plan.
 * @param {Row['kind']} kind
 * @param {number | null} pos the block it opens
 * @param {number} size the size its box is set at, in the body's em
 * @param {Piece[]} pieces
 * @param {{after?: number, before?: number, width?: number, keep?: Keep, pre?: boolean, indent?: number}} [o] its margins in the body's em, a withheld run's width, where a column may break at it (P-LAY's `Keep`; none inside it where none is said), whether it is a typed line, its white space kept, and its first line's indent in the body's em
 * @returns {Row}
 */
const row = (kind, pos, size, pieces, o = {}) => ({ kind, pos, size, pieces, before: o.before ?? 0, after: o.after ?? 0, width: o.width ?? 0, keep: o.keep ?? 'whole', pre: o.pre ?? false, indent: o.indent ?? 0 });

/**
 * A typed line's inline pieces at its size, as `segHTML` sets them: each
 * stretch of its text — the one that opens a run led by the run's sameness
 * boundary, its hairline's label and C-33's mark where it carries one, and
 * the symbols standing after them — then the symbols standing after it.
 * @param {Part} p
 * @param {number} k the typed line's size, in the body's em
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
 * The article as P-LAY's plan: the head's lines, each block's rows at the
 * body's size — a typed line kept as typed, on the indent where it opens a
 * typed line, the empty lines typed after it whole body line boxes below it,
 * and no other room between blocks — the empty document's line, the
 * scene-offers — from the same walk the HTML is made from; each row's keep,
 * where a column may break at it (FP-12): a typed line between its lines, the
 * head, a record, a withheld run, a reference, an item not rendered and the
 * chrome whole.
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} ownerAccount the owner by `effective_owner`, or the document's account
 * @returns {Row[]}
 */
export function articlePlan(d, v, ownerAccount) {
  const w = walk(d, v, ownerAccount);
  const H = MEASURE.head;
  const joined = /** @type {const} */ ({ keep: 'joined' });
  /** @type {Row[]} */
  const rows = [row('head', null, 1, [piece(w.head.addr, 1)]), row('head', null, H, [piece(w.head.state, H)], joined), row('head', null, H, bylinePieces(w.head.byline, H), joined)];
  if (w.head.presence) rows.push(row('head', null, H, [symbol(H), piece(' ' + w.head.presence, H)], joined));
  if (!w.parts) return rows;
  for (const p of w.parts) {
    const b = p.b;
    if (p.kind === 'withheld' || p.kind === 'unshown') rows.push(row('gap', b.pos, 1, [], { width: b.width }));
    else if (p.kind === 'record' && p.rec) {
      if (p.rec.keys) rows.push(row('text', b.pos, 1, [piece(p.rec.words, 1)]), row('text', null, 1, [piece(p.rec.keys, 1)], joined));
      else rows.push(row('text', b.pos, 1, [piece(p.rec.words, 1)]));
    } else if (p.kind === 'ref') rows.push(row('text', b.pos, 1, [piece('⟡', 1)]));
    else rows.push(row('text', b.pos, 1, paraPieces(p, 1), { after: p.blank * LINE_H, keep: 'lines', pre: true, indent: p.opens ? MEASURE.indent : 0 }));
  }
  if (w.empty) rows.push(row('text', 1, 1, [piece(t('B1.empty_subspace'), 1)]));
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

/** a gap's stand-in, in square brackets (FP-24): its kind, then a withheld run's owner and length, an unshown item's length, a record's own plain contents */
function standIn(/** @type {Gap} */ g) {
  const kind = itemWords(g.kind);
  if (g.kind === 'withheld') return t('L.copy.item.owned', { kind, owner: g.owner, length: itemLength(g.width) });
  if (g.kind === 'unshown') return t('L.copy.item.sized', { kind, length: itemLength(g.width) });
  return g.contents.length ? t('L.copy.item.contents', { kind, contents: g.contents.join(' · ') }) : t('L.copy.item', { kind });
}

/**
 * The copy's plain text (FP-24): a span's items
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
