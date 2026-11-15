// M-PASSAGE — skep's own clipboard entry (FP-27; B3-S5; the paste survey's C1,
// C2, C3): its one definition, which the copy writes (T-LAYER's `entryIn`) and
// a paste reads (T-LAYER's `caretPaste`), and the plan a paste is made by.
// Layer 1 (the model), pure: no state, no DOM; it reads M-REC's exports
// alone. The entry (`Entry`, `TYPE`) is a passage's naming (`Naming`) — where
// its words were read, on which board, and every position it holds by
// identity, part by part (M-REC's `IdentityPart`) — with the entry's own
// version (`VERSION`) and each part's byte length in the copy's plain text,
// its line endings set as a paste sets them (`Entry.lengths`, `linesSet`), or
// none where the parts do not cut that text (`entryOf`). An entry is input
// from outside the page and is trusted for nothing (`readEntry`): one longer
// than ENTRY_MAX characters is not read, and one with any member missing,
// unknown or malformed is no entry; an entry of the first version, written
// before the lengths were, reads as one with no lengths. The plan (`planOf`)
// tells a paste's arm, in the survey's C1 order after the site, which the
// caller has read: an entry of this board's origin is the same material —
// (i), and (iv) after a cut, one case — where its parts cut the plain text;
// any other, and none, the plain text as new bytes (ii). Within (i), part by
// part: bytes the board holds by identity; the page's own name of bytes it
// made, under this load (M-REC's `PAGE_LOAD`), by the addresses the board
// minted them at where it has (M-REC's `pageIds`), else as new bytes (P51),
// as is a name under another load; a gap as new bytes; each new stretch's
// words its stretch of the plain text. The plain text is cut by the entry's
// lengths, else, where it carries none, by its parts' widths — and only where
// they sum to its byte length; an entry naming this board whose parts do not
// cut it is plain text, marked as words skep traced (`Plan.traced`), as is
// one whose stretch of a page name the board minted is not that name's
// width. The comparison of each stretch's words with what its bytes hold is
// the caller's (C3).
// Rules: FP-1, FP-2, FP-6, FP-24, FP-27, FP-38.

import { PAGE_LOAD, pageIds, isPage, draftOfPage } from './records.js';
import { isAddress, kindOf, fieldsOf, documentOf, memberOf } from './address.js';
import { byteLength } from '../util.js';

/** @typedef {import('./records.js').ISpan} ISpan */
/** @typedef {import('./records.js').IdentityPart} IdentityPart */

/** the entry's clipboard type: skep's own, which only a skep client reads (FP-27) */
export const TYPE = 'application/x-skep-passage';
/** the entry's version as the page writes it: the first had no version member and no lengths */
export const VERSION = 2;
/** the most characters an entry is read at: the 8 MiB a frame's request body is capped at (skep `docs/wire.md` §Transport) — no paste the board would take is named by more */
export const ENTRY_MAX = 8 * 1024 * 1024;

/**
 * @typedef {Object} Naming — a passage named as FP-27 names a copy of it: where its words were read, on its board, every position it holds by identity, part by part, and, where a member is named, its positions in that member — never a draft's, which move
 * @property {string} board the board's origin
 * @property {string} doc the document read
 * @property {string | null} member the member its text is, by its version address; null for a draft, and where no member is known
 * @property {boolean} plain its words were read at a published document's plain address
 * @property {number | null} pos its first position in `member`; null where no member is named
 * @property {number | null} width its positions there; null with `pos`
 * @property {IdentityPart[]} ids every position it holds, in the text's order (M-REC's `identityParts`): the board's bytes by their permanent addresses, the page's unminted ones by its own name and its load, each stretch its image does not place a gap — their widths the passage's
 */

/**
 * @typedef {Naming & {version: number, lengths: number[] | null}} Entry — skep's clipboard entry (see the head): a passage's naming, the entry's version, and each part's byte length in the plain text beside it, its line endings set (`linesSet`), in the parts' order — null where the parts do not cut that text
 */

/**
 * @typedef {Object} Piece — one stretch a paste places, in the text's order (`planOf`)
 * @property {ISpan | null} id the bytes by the board's identity, placed as themselves; null for new words, which the page makes
 * @property {string} text its stretch of the plain text, its line endings set: the words a stretch the board holds must read as, and the words a new stretch is made of
 */

/**
 * @typedef {{arm: 'plain', traced: boolean, doc: string | null} | {arm: 'same', doc: string, pieces: Piece[]}} Plan — how a paste is made (see the head): the plain text as new bytes (ii) — `traced` where an entry of this board named a stretch the board holds and the plain text did not match it, which is said, `doc` then the document the entry read it in, else null — or the same material (i), each stretch in order, `doc` the document the entry read it in
 */

/**
 * A paste's plain text with its line endings set as a typed Enter's: each CR
 * LF and each CR alone a line feed (B3-S5; the paste's first step). The one
 * rule a paste's text and an entry's lengths are read by.
 * @param {string} text
 * @returns {string}
 */
export const linesSet = (text) => text.replace(/\r\n?/g, '\n');

/**
 * The entry a copy writes (see the head): the passage's naming, the entry's
 * version, and its parts' byte lengths in the plain text.
 * @param {Naming} named
 * @param {number[] | null} lengths each part's byte length in the plain text, its line endings set; null where the parts do not cut it
 * @returns {Entry}
 */
export const entryOf = (named, lengths) => ({ ...named, version: VERSION, lengths: lengths ? [...lengths] : null });

/** the members an entry may carry, every one checked (`readEntry`) */
const MEMBERS = new Set(['board', 'doc', 'member', 'plain', 'pos', 'width', 'ids', 'version', 'lengths']);
/** the members an entry of the first version carries, every one required */
const FIRST = ['board', 'doc', 'member', 'plain', 'pos', 'width', 'ids'];
/** a page's load as M-REC draws it: sixteen bytes in lowercase hex */
const LOAD = /^[0-9a-f]{32}$/;

/** is a value a whole number of at least `least`, as JSON carries one */
const whole = (/** @type {unknown} */ v, least = 1) => typeof v === 'number' && Number.isSafeInteger(v) && v >= least;
/** is a value an object of exactly the members named, and no other */
const exactly = (/** @type {unknown} */ v, /** @type {string[]} */ keys) => !!v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === keys.length && keys.every((k) => Object.prototype.hasOwnProperty.call(v, k));
/** is an address a document's, a version member's among them */
const isDocument = (/** @type {unknown} */ v) => typeof v === 'string' && isAddress(v) && kindOf(v) === 'document';
/** is a prefix a document's content I-space — a permanent address of its content subspace without its last field (M-REC's `ImageRun.prefix`) */
const isContentSpace = (/** @type {string} */ p) => isAddress(p) && !!documentOf(p) && (() => { const f = fieldsOf(p); return f.length === 4 && f[3].length === 1 && f[3][0] === 1; })();

/**
 * One part of an entry read (`readEntry`): a gap, bytes the board holds, or
 * the page's own name of bytes it made under a load — each its members
 * exactly; null where it is none of them.
 * @param {unknown} p
 * @returns {IdentityPart | null}
 */
function partOf(p) {
  const x = /** @type {Record<string, unknown>} */ (p);
  if (exactly(p, ['gap', 'width'])) return x.gap === 'unread' && whole(x.width) ? { gap: 'unread', width: /** @type {number} */ (x.width) } : null;
  const id = typeof x?.prefix === 'string' && whole(x.ordinal) && whole(x.width) ? { prefix: x.prefix, ordinal: /** @type {number} */ (x.ordinal), width: /** @type {number} */ (x.width) } : null;
  if (!id) return null;
  if (exactly(p, ['prefix', 'ordinal', 'width'])) return isContentSpace(id.prefix) ? id : null;
  if (exactly(p, ['prefix', 'ordinal', 'width', 'load'])) return isPage(id.prefix) && isDocument(draftOfPage(id.prefix)) && typeof x.load === 'string' && LOAD.test(x.load) ? { ...id, load: x.load } : null;
  return null;
}

/**
 * An entry read from the clipboard's own type (see the head): its every
 * member checked — the board's origin a word, the document a document's
 * address, the member a version of it or none, whether read at the plain
 * address, the member's positions present together with a member and
 * spanning the parts' widths, one part at least, each as `partOf` reads it,
 * the version this page's or none, and the lengths a whole number for each
 * part, or none, with that version alone — and no member else. Null where
 * there is no text, it is past ENTRY_MAX, it is not JSON, or any member is
 * missing, unknown or malformed: no entry.
 * @param {unknown} text the clipboard's own type, as the paste event carried it
 * @returns {Entry | null}
 */
export function readEntry(text) {
  if (typeof text !== 'string' || !text || text.length > ENTRY_MAX) return null;
  /** @type {unknown} */
  let raw;
  try { raw = JSON.parse(text); } catch { return null; }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const e = /** @type {Record<string, unknown>} */ (raw), keys = Object.keys(e);
  if (keys.some((k) => !MEMBERS.has(k)) || FIRST.some((k) => !(k in e))) return null;
  const second = 'version' in e;
  if (second !== 'lengths' in e || (second && e.version !== VERSION)) return null;
  if (typeof e.board !== 'string' || !e.board || !isDocument(e.doc) || typeof e.plain !== 'boolean') return null;
  const doc = /** @type {string} */ (e.doc);
  if (e.member !== null && !(isDocument(e.member) && memberOf(/** @type {string} */ (e.member)) != null && documentOf(/** @type {string} */ (e.member)) === documentOf(doc))) return null;
  if (!Array.isArray(e.ids) || !e.ids.length) return null;
  const ids = e.ids.map(partOf);
  if (ids.some((p) => !p)) return null;
  const parts = /** @type {IdentityPart[]} */ (ids), span = parts.reduce((n, p) => n + p.width, 0);
  const placed = e.member === null ? e.pos === null && e.width === null : whole(e.pos) && e.width === span;
  if (!placed) return null;
  /** @type {number[] | null} */
  let lengths = null;
  if (second && e.lengths !== null) {
    if (!Array.isArray(e.lengths) || e.lengths.length !== parts.length || !e.lengths.every((n) => whole(n, 0))) return null;
    lengths = /** @type {number[]} */ ([...e.lengths]);
  }
  return { board: e.board, doc, member: /** @type {string | null} */ (e.member), plain: e.plain, pos: /** @type {number | null} */ (e.pos), width: /** @type {number | null} */ (e.width), ids: parts, version: VERSION, lengths };
}

/**
 * A text cut into stretches of the byte lengths given, in order (see the
 * head): null where the lengths do not sum to its byte length, or a cut falls
 * inside a character.
 * @param {string} text
 * @param {readonly number[]} lengths
 * @returns {string[] | null}
 */
export function cutBytes(text, lengths) {
  /** @type {Map<number, number>} each character boundary's place in the string, by its byte, counted as U's `byteLength` counts */
  const at = new Map([[0, 0]]);
  let bytes = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (c < 0x80) bytes += 1; else if (c < 0x800) bytes += 2; else if (c >= 0xd800 && c <= 0xdbff) { bytes += 4; i++; } else bytes += 3;
    at.set(bytes, Math.min(i + 1, text.length));
  }
  if (lengths.reduce((n, w) => n + w, 0) !== bytes) return null;
  /** @type {string[]} */
  const out = [];
  let b = 0;
  for (const w of lengths) {
    const from = at.get(b), to = at.get(b + w);
    if (from == null || to == null) return null;
    out.push(text.slice(from, to));
    b += w;
  }
  return out;
}

/**
 * A paste's plan (see the head; the paste survey's C1, C2): the entry read
 * (`readEntry`) and told by its board, its parts cut into the plain text,
 * each part told by its kind. The plain text where there is no entry, it is
 * malformed or names another board's origin, or its parts do not cut the
 * plain text; the same material otherwise, unless no stretch of it is bytes
 * the board holds.
 * @param {unknown} entry the clipboard's own type, as the paste event carried it
 * @param {string} plain the clipboard's plain text, as the event carried it
 * @param {string | null} origin this board's origin; null where the page holds no board
 * @returns {Plan}
 */
export function planOf(entry, plain, origin) {
  const e = readEntry(entry);
  if (!e || origin == null || e.board !== origin) return { arm: 'plain', traced: false, doc: null };
  const text = linesSet(plain);
  /** the parts' stretches of the board's identity, as each would be placed: a page name under this load by the addresses minted for it */
  const resolved = e.ids.map((p) => ('gap' in p ? [] : 'load' in p ? (p.load === PAGE_LOAD ? pageIds(draftOfPage(p.prefix), p.ordinal, p.width).filter((x) => !isPage(x.prefix)) : []) : [p]));
  const traced = resolved.some((r) => r.length > 0), plainText = /** @type {Plan} */ ({ arm: 'plain', traced, doc: traced ? e.doc : null });
  const cut = cutBytes(text, e.lengths ?? e.ids.map((p) => p.width));
  if (!cut) return plainText;
  /** @type {Piece[]} */
  const pieces = [];
  const fresh = (/** @type {string} */ words) => { if (!words) return; const last = pieces[pieces.length - 1]; if (last && !last.id) last.text += words; else pieces.push({ id: null, text: words }); };
  for (const [i, p] of e.ids.entries()) {
    if ('gap' in p) { fresh(cut[i]); continue; }
    if (!('load' in p)) { pieces.push({ id: { prefix: p.prefix, ordinal: p.ordinal, width: p.width }, text: cut[i] }); continue; }
    if (p.load !== PAGE_LOAD || !resolved[i].length) { fresh(cut[i]); continue; }
    // the page's own words, minted in part or whole: each stretch by the name it has now, its words a byte a position
    if (byteLength(cut[i]) !== p.width) return plainText;
    let off = 0;
    for (const x of pageIds(draftOfPage(p.prefix), p.ordinal, p.width)) {
      const words = sliceAt(cut[i], off, x.width);
      if (words == null) return plainText;
      if (isPage(x.prefix)) fresh(words); else pieces.push({ id: x, text: words });
      off += x.width;
    }
  }
  return pieces.some((x) => x.id) ? { arm: 'same', doc: e.doc, pieces } : { arm: 'plain', traced: false, doc: null };
}

/** `width` bytes of a text from its `from`-th, counted from 0; null where a cut falls inside a character */
function sliceAt(/** @type {string} */ text, /** @type {number} */ from, /** @type {number} */ width) {
  const head = cutBytes(text, [from, width, byteLength(text) - from - width]);
  return head ? head[1] : null;
}
