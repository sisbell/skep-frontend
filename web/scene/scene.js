// SC — THE READING SCENE (the structure record §3.2 "SC"; B1-S9; foundations
// §2.5; law 12: chrome). Layer 2. ENGINE-BOUND. State: VIEW — the pair, the
// two ends it sets level, the bands' and lines' ends as measured in the panes,
// the panes' scrolls, each pane's text — the record it was made from, the
// version it reads and the address it names, the links and far ends it was
// set with — and the element it was opened from (the one owner).
// Two documents at reading scale side by side over the plane, each pane
// scrolling on its own (R3); the places unmoved, nothing written; the dialog
// named as it attaches by ST's `L.scene-label`. It sets the two ends LEVEL,
// "so position carries the match and the beam confirms it" (§2.5): the
// passage the opener holds — a link's span, a selection, the
// versions list's held passage, provenance's span — at its first stretch of
// shared identity, and its counterpart in the other document, or the far end
// a link names (`levels`); each pane's matched line brought to one height, and
// each article given a pane's height of room below its end so a passage near
// the end can be brought there too; a re-level act (K-62) restores that.
// Between the panes LINKS are drawn as LINES from the set LK gave at either
// pane's document as the pane was set (the seam at the link-beam source;
// §2.5: "a link's line drawn where either pane's default composition draws
// that link"), each link once per pair of its ends (`linesBetween`; P44:
// "never a stack, never accumulated tint"), each end where the link's bytes
// stood in its pane's text as the pane was set — the near end at the stretch
// LK placed it in, the far end where `project` answered its passage sits in
// the pane's own text, whichever version of the far document's box the pane
// holds and whatever version the plane's box shows (issue #154's design
// decision: the box shows one version; `farEndIn`), whose reads each setting
// of a pane asks for the links that cross between the panes, a far
// end that floats at its pane's head, where its follow lands, and never at
// the position the link stores — each END in the mark its pane's document
// gives the link, the one the link's symbol takes in that pane (issue #166's
// design decision: "Lines between the side-by-side view's panes follow the
// same rule, changing at the middle of the gap"), inked as BM inks a beam's
// ends — its linker's hue there, dashed only for another's — and where the two
// differ the line changing colour once, at the middle of the gap (`drawTie`),
// so opening the scene never recolours the link it opened on — and
// SHARED IDENTITY as BANDS from `compare`'s pairs, each run
// of contiguous pairs one band (`merged`; no link); each leaves its pane at
// its passage's first line — measured, through T-LAYER's byte-span mapping
// over the pane's article and the blocks it was made from, when the scene is
// set level, a pane is set again or the panes change size, and moved with
// each pane's scroll — and one whose end has left its pane is clipped at the
// pane's edge with the stub's triangle, in that end's hue. Every tie is
// measured from what its panes were set with, never the model's now: a read
// that drops a pane's document moves no tie off its text (`measure`).
// A PANE IS KEPT FRESH BY ITS KIND (FP-23; issue #160's design decision: "each
// pane behaves as its document does on the plane, by kind"): each feed row
// M-PUMP takes reaches the panes after it drops what it named (`dropped`, its
// `onDrop`), a pane reached where the row named its document's box, and none
// offers a reload. A DRAFT — any text no publication fixes — is read again
// whole and set in its place, the first span in view holding still and the
// platform's selection put back on the same words. An EDITION READ AT ITS
// BARE ADDRESS keeps the version it opened on: its acts name the member its
// text is (`D.k`, the chain probed as it opens), and a row naming a newer
// member pins it at once — its head, the bar and its corner naming `D.k`,
// "version ⟨k⟩ of ⟨n⟩", never "the latest", the arrival said once, politely,
// in the status region (N-FOCUS's `say`), the corner offering the newest
// (`pin`) — then `D.k` is read whole and the pane set again, its marks and
// lines with it; where no member held its text before (k = 0) there is no
// version to keep, and it is read again in place as the plane's box is (N-GO's
// `arrived`). A pane on a VERSION only counts the chain again: its "of ⟨n⟩"
// (`count`). A row whose op the journal could not name is taken as any it
// could be: a newer member named pins, else the pane is read again. A link
// row reaching a pane's text reads it again, its marks, counts and lines with
// it, formatting setting its type again as a draft's update does. THE
// CORNER'S ACT (`act`; "read version 4") reads the version it offers in that
// pane's place: the selection, else the first span in view, carried into it
// by `compare` and kept on its line, the corner saying so where the version
// lacks it (F.floating.member), and the version left one act away — the
// pane's own state, never a box's: N-GO's pins are never touched (FP-22).
// THE PAGE'S OWN DEATH reaches every pane at once, as does every other change
// of its class — a session a restart lost and the acquire did not get back
// among them (M-PUMP's `classChanged`): each is taken down to what the drop
// left of its record — nothing of the session's text or links, the ties with
// them — and read again at the class the page reads at then, a document
// withheld from a guest standing as its head alone (records.js's
// `dropClass`: "no frame after it draws … what the class could read and the
// next cannot"). EVERY SETTING IS ONE STEP (`setPanes`; "no tie is ever drawn
// over text it was not measured on"): the reads first — the text whole, the
// two texts' `compare`, where each far end crossing between them stands — then,
// where the scene still stands and no later setting was asked of the pane,
// with nothing awaited: the new article made and swapped in, the reader's
// place, the selection and the ends set level carried by their bytes'
// identity through the images the two articles were made from, the ties
// measured anew and drawn. While a pane is being set again its own keys, the
// re-level and the corner's act wait for it (`whenSet`); ending the scene
// never waits, so a board that does not answer holds no scene open, and a
// pane whose read the board did not answer keeps what it shows.
// It opens on its reads, both documents whole and their
// `compare` (O-HOST's `opening`, the rule the cards share): an act made on
// the chrome while they read — a navigation act, Esc, an empty click, the
// LEAP box opened, the next card asked or shown — ends the opening, and
// their answer opens nothing, the plane left in the page's order and the
// focus where it stands, and no `compare` asked after it. Whatever ends it —
// zoom-out, Esc, ←, the bar's ×, or a navigation act (a teleport, Back,
// Forward, a trail jump), which ends it first, "a teleport dismissing the
// scene first" (§2.5) — leaves the plane as it was and the trail as it found
// it (`close`): the scene never moves the camera, so an entry pushed for the
// plane as it was would hold the view of the entry it departs, a Back from it
// moving nothing, and its push would drop the entries ahead of the cursor.
// §2.5 pairs that push with the scene recorded as the departure — its pair
// and both panes' positions — so Back restores it; N-TRAIL's entry holds an
// address and a view and no scene, and whether Back restores a scene is the
// design's open question — once it does, the decision binds it to keep each
// pane's version. THE FOCUS (D5 §4 rules 5 and 8; K-61, K-63; the
// focus record's rule 17; FP-20): opened, the scene puts the focus in the far
// end's pane and takes the plane it stands over out of the page's order and
// the accessibility tree, each region by its owner (N-WALK's tree, T-LAYER's
// corners: `cover`), so the one ring runs the line → pane, its corner, pane,
// its corner, the bar's acts → the standing overlay → the line, in the place
// of the plane's stop and its corner, and reaches nothing the scene covers;
// the one line is never covered, and the LEAP box stands over the scene.
// Whatever ends it puts the plane back first and hands the focus back through
// N-FOCUS, the focus's owner, which takes a focus the scene held off it and
// returns one standing on nothing to the element the scene was opened from —
// read as it opens, once the overlay it dismisses has returned the focus that
// overlay held, and kept by the controller's one memory where a scene opens
// over a standing one — or to the walk's element where that no longer takes
// it; a navigation act's landing then carries it on (rule 8), and a focus the
// person moved out of the scene stays where it is. EACH PANE IS A NAMED
// REGION (SC9): named by its own document's address, the head of the article
// it holds, and ↓ and ↑ in it move by BLOCK — the next block's top brought to
// the pane's top (K-60; D1's first stage) — PageDown and PageUp by most of a
// pane, Home and End to its ends. The panes BORROW the one reconciler's mount
// (FP-12; the structure record §3.4 (vii): `T-LAYER.sceneArticle` makes each
// pane's article from the record and the view the scene keeps and keeps what
// it was made from, `T-LAYER.rangeIn` finds a passage in it through those
// blocks, and a drag in it selects as it does on the plane — an item that
// holds no text taken whole and drawn so — its copy carrying the passage's
// board and the address the pane's acts name beside the plain text, the
// span's items in order with a stand-in in each item's place, as T-LAYER's
// copy event does for any article — §2.4, §2.5; FP-24; the scene keeps no DOM
// text of its own). Each pane carries
// its own document's corner (ux-T2: "each pane its own"; `T-LAYER.sceneCorner`
// makes its items) on its OUTER side — pane A's left, pane B's right — held
// to the top of the pane's scroll, so the bands and lines leave the inner
// edges clear of it (foundations §3.1); the corner is the pane's one Tab stop
// after the pane itself, a group named by its own words, which say what the
// pane shows (D5 K-57, as the plane's corner), and its Enter, or a click on
// the act, takes its act — a press on the act leaving the selection standing
// in the pane, the passage the act carries.
// Each pane's text is ONE COLUMN AT THE
// PLANE'S MEASURE (issue #15: "side-by-side panes stay one column each, at
// the same line length"): P-LAY's MEASURE_CPL characters of its own face (the
// style's `--measure`), at the largest size up to PANE_FS at which that
// column fits beside the pane's corner (`fitMeasure`, as the scene opens, as
// a pane is set again and as its panes change size), so the panes break the
// lines the plane breaks; against the pane's inner edge with its corner beside
// it, its column's edge between it and that inner edge — its counts and its
// withheld runs' marks there, the bands leaving the pane beyond them
// (foundations §3.1; issue #151's design decision): a window wider than the
// measure needs widens the outer margins, never the line, and the text keeps
// its place beside the bands at every width.
// THE PANES ARE READ, NOT ACTED ON (B1-S9: "read both…; scroll each"): nothing
// in a pane's article takes a pointer — its blocks, hairlines, symbols and
// presence ⟡ and its corner's version statement carry none of the plane's
// click cues and are no controls (T-ARTICLE's scene-mode variant) — and the
// keys a pane takes move that pane alone (`key`), N-KEYS handing none to what
// the scene covers. The scene's ACTS are its bar's buttons — re-level (K-62,
// its chord drawn for the platform, rule 19) and the dismissal — each pressed
// by a click anywhere on it, by Enter or by Space, and a pane's corner's act
// (see above). A roving stop inside a pane and what a click
// or a key at a mark would act on — a beam followed into the other pane
// (B1-S9), each pane's own selection (§2.5, PROPOSED; #94) — are D1's second
// stage, after each pane has its selection. Companionate scrolling over the
// bands is UNTESTED (S27) and not built. Carries: the wireframe's §19 whole
// (its beams over `compare`'s pairs instead of the hand data's windows).
// Rules: FP-1, FP-2, FP-10, FP-12, FP-13, FP-20, FP-22, FP-23, FP-24.

import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as F from '../model/frames.js';
import * as LAYER from '../text/layer.js';
import * as LK from '../links/links.js';
import * as HOST from '../overlays/host.js';
import * as WALK from '../nav/walk.js';
import * as FOCUS from '../nav/focus.js';
import { drawChord } from '../nav/keys.js';
import { inkOf, strokeOf, strokeIn } from '../beams/beams.js';
import { SAMENESS } from '../plane/register.js';
import { markDirty } from '../plane/camera.js';
import { documentOf, homeOf, memberOf, versionAddress, isTrunkMember } from '../model/address.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {import('../model/frames.js').ComparePair} ComparePair */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Stretch} Stretch */
/** @typedef {import('../model/records.js').Declined} Declined */
/** @typedef {import('../model/records.js').ISpan} ISpan */
/** @typedef {import('../model/pump.js').Dropped} Dropped */
/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../beams/beams.js').Ink} Ink */
/** @typedef {import('../text/article.js').ArticleView} ArticleView */
/** @typedef {import('../bridge/shapes').FeedUpdate} FeedUpdate */

/**
 * @typedef {Object} Level — the two ends the scene sets level, a position in each pane's document; null where that pane stands at its top
 * @property {number | null} a
 * @property {number | null} b
 */

/**
 * @typedef {Object} Held — what an opener holds as it opens the scene
 * @property {number | null} [posA] the first position of the passage held in the first document
 * @property {number | null} [widthA] its positions; absent or null, the position alone
 * @property {number | null} [posB] the position in the second document the opener names — where a link's far end stands in its text now (LK's `farPos`) — where it names one
 */

/**
 * @typedef {Object} End — one end of a band or a line: its passage, and where the passage's first line stands in its pane's scrolled content
 * @property {number} pos the passage's first position
 * @property {number} width its positions
 * @property {number} y the first line's middle, px below the pane's content top
 */

/**
 * @typedef {Object} Tie — a band or a line between the panes, its ends measured
 * @property {'band' | 'link'} kind a run of shared identity, or a link drawn at one pane's document whose far end lies in the other's
 * @property {string | null} link the link's address, for a line
 * @property {End} a its end in pane A
 * @property {End} b its end in pane B
 */

/**
 * @typedef {Object} Drawn — a tie as the last draw drew it, its ends on screen
 * @property {'band' | 'link'} kind
 * @property {string | null} link
 * @property {{pos: number, width: number, x: number, y: number, clipped: boolean}} a
 * @property {{pos: number, width: number, x: number, y: number, clipped: boolean}} b
 */

/**
 * @typedef {Object} PaneLinks — what a pane gives the lines between the panes: what it was set with, never the model's now
 * @property {string} addr the record its text was made from
 * @property {Shown[]} shown the links LK showed at that record as the pane was set (`LK.shown`)
 * @property {Block[]} blocks the blocks its article was made from, where a far end naming the document whole stands
 * @property {Map<string, Stretch[] | Declined>} [placed] where the far ends of the links crossing into it stood in its text as the pane was set (`project`'s answers), by `⟨link⟩ ⟨slot⟩`
 */

/**
 * @typedef {Object} Line — a link's line between the panes, its ends as passages, before they are measured
 * @property {string} link the link's address
 * @property {{pos: number, width: number}} a its end in pane A's document
 * @property {{pos: number, width: number}} b its end in pane B's document
 * @property {{a: Ink, b: Ink}} ink each end's: the mark its pane's document gives the link, as a stroke takes it (BM's `inkOf`)
 * @property {number} value the link's own, alike at both its ends
 */

/**
 * @typedef {Object} Place — where a reader stands in a pane, carried across the step that sets it again: a passage's position, its byte by identity, and how far below the pane's visible top its line stood
 * @property {number} pos
 * @property {ISpan[]} ids the byte at `pos`, through the image the pane's article was made from (M-REC's `identityIn`); none where that image did not cover it
 * @property {number} at its line's top below the pane's visible content top, px
 */

/**
 * @typedef {Object} Pane — one of the scene's two panes as it stands: SC's own state, never a box's version (FP-22, FP-23)
 * @property {'a' | 'b'} side
 * @property {string} doc the address the scene opened the pane on
 * @property {string} src the record its text was made from: `doc`, or the member a newer version's arrival pinned it to, or its corner's act read
 * @property {string} names the address its acts name and its positions are measured against (T-LAYER's `Made.addr`): `src`, save at an edition read at its bare address with its chain known — the member its text is
 * @property {string} shows the address its head and the bar name: `names`, save at an edition at its bare address, which names its bare address until a newer version's arrival pins it
 * @property {'draft' | 'bare' | 'pinned'} kind how a row reaching it keeps it fresh (see the head): a draft — text no publication fixes — read again in place; an edition at its bare address, which a newer member's arrival pins; a version, which only counts the chain again
 * @property {number | null} k the member its text is, where an edition or a version with its chain known; null where none is known
 * @property {number | null} n the chain's members as the pane knows them: probed as it opens, raised by a row naming a newer member
 * @property {number | null} read the version its corner's act reads in its place: the newest arrived, or the one the act left; null where it offers none
 * @property {number | null} lacks the version it reads, where that version holds none of the passage its corner's act carried; null where none
 * @property {Doc} d the record it was set from, as the model held it: kept whole, its arrays the model's own, which the model replaces and never edits (M-REC), so the pane is set again from it with no read
 * @property {ArticleView} view the view its article draws, as read when it was set: the links its marks and its lines are drawn from
 * @property {Map<string, Stretch[] | Declined>} placed where the far ends of the links crossing into it stood in its text as it was set, by `⟨link⟩ ⟨slot⟩`
 * @property {Place | null} place the reader's place as the death took it down, kept for the read at the guest's class that sets it again
 * @property {HTMLElement | null} el the article it shows
 * @property {number} serial the settings asked of it: one sets it only where no later one was asked meanwhile
 * @property {number} sets the settings made of it: a `compare` read against its text before one is read again
 */

/**
 * @typedef {Object} Next — what a pane takes as the scene sets it again, every read made before the step
 * @property {Doc} d the record its text is made from
 * @property {ArticleView} [view] the view it draws: the record's now (`T-LAYER.sceneView`) where none is given
 * @property {'draft' | 'bare' | 'pinned'} kind
 * @property {string} src
 * @property {string} names
 * @property {string} shows
 * @property {number | null} k
 * @property {number | null} n
 * @property {number | null} read
 * @property {number | null} lacks
 * @property {{from: number, to: number} | null} hold the corner's act's passage: the position in the text left whose line the reader's place stands on, and the position in the text taken that takes that line; null where the place is carried by its bytes' identity
 */

/**
 * @typedef {Object} Scene
 * @property {Pane} a
 * @property {Pane} b
 * @property {ComparePair[]} pairs
 * @property {Level} level
 * @property {Array<Tie & {ink: {a: Ink, b: Ink}, value: number}>} ties
 * @property {string} size the panes' sizes the ties were measured at
 * @property {number} updating the settings reading
 * @property {Array<() => void>} waiting the acts made while one reads, in the order made (`whenSet`)
 */

/** how far below the panes' tops the two ends are set level (px), where both can stand there */
const LEVEL_AT = 40;
/** the size a pane's text is set at where its pane holds the measure at it (px); a narrower pane sets it smaller */
const PANE_FS = 14;
/** the bands drawn at most */
const MAX_BANDS = 400;
/** @type {Ink} a band's ink at both its ends: sameness's boundary, never a linker's hue (P-REG) */
const BAND_INK = { hue: SAMENESS.boundary, dash: [] };
/** the keys a pane takes, moving it alone (K-60) */
const MOVES = ['PageDown', 'PageUp', '↓', '↑', 'Home', 'End'];
const SIDES = /** @type {const} */ (['a', 'b']);

/** @type {Scene | null} */
let scene = null;
/** @type {{root: HTMLElement, bar: HTMLElement, paneA: HTMLElement, paneB: HTMLElement, canvas: HTMLCanvasElement} | null} */
let els = null;
/** @type {Drawn[]} what the last draw drew */
let drawnTies = [];

/** the box an address stands in: its document's, which every version of it shares */
const boxOf = (/** @type {string} */ addr) => documentOf(addr) || addr;
/** do two addresses name one box — a document and its versions share their document's (P-PROJ's `docBox`)? */
const oneBox = (/** @type {string} */ a, /** @type {string} */ b) => boxOf(a) === boxOf(b);
/** a pane's element by its side */
const paneEl = (/** @type {NonNullable<typeof els>} */ E, /** @type {'a' | 'b'} */ side) => (side === 'a' ? E.paneA : E.paneB);
/** the other side */
const otherSide = (/** @type {'a' | 'b'} */ side) => (side === 'a' ? 'b' : 'a');
/** is a record a published edition's, as its metadata says? */
const published = (/** @type {Doc} */ d) => !!d.meta && d.meta.published;
/** how a row keeps a pane on a record fresh (see the head): a version, at a member's address; an edition at its bare address; else a draft */
const kindAt = (/** @type {string} */ addr, /** @type {Doc} */ d) => (memberOf(addr) != null ? 'pinned' : published(d) ? 'bare' : 'draft');

/** the plane the scene stands over out of the page's order while it stands (true), and back as it ends (false) — each region by its owner (D5 §4 rule 5) */
function coverPlane(/** @type {boolean} */ on) { WALK.cover(on); LAYER.cover(on); }

/**
 * A pane named as a region by its own document's address — the head of the
 * article it holds (SC9; the focus record's D5: a caption of its own).
 * @param {HTMLElement} pane
 * @param {string} id the id the head's address takes, for the reference
 */
function namePane(pane, id) {
  pane.setAttribute('role', 'region');
  const addr = /** @type {HTMLElement | null} */ (pane.querySelector('.hd .addr'));
  if (addr) { addr.id = id; pane.setAttribute('aria-labelledby', id); }
}

/** @param {{root: HTMLElement, bar: HTMLElement, paneA: HTMLElement, paneB: HTMLElement, canvas: HTMLCanvasElement}} e */
export function attach(e) {
  els = e;
  e.root.setAttribute('aria-label', t('L.scene-label'));
  /** is an event's target a pane's corner's act? */
  const onAct = (/** @type {Event} */ ev) => { const tg = /** @type {HTMLElement | null} */ (ev.target); return !!tg && !!tg.closest && !!tg.closest('.corner [data-read]'); };
  for (const p of [e.paneA, e.paneB]) {
    p.addEventListener('scroll', () => draw());
    // a press on a pane's corner's act leaves the platform's selection where it stands — the passage the act carries — as
    // a press on text would not; a click on it takes the act, as the corner's Enter does
    p.addEventListener('mousedown', (ev) => { if (onAct(ev)) ev.preventDefault(); });
    p.addEventListener('click', (ev) => { if (onAct(ev)) act(p === e.paneB ? 'b' : 'a'); });
  }
  // a click on an act is its button's wherever on the button it lands — the re-level's chord mark among them
  e.bar.addEventListener('click', (ev) => { const tg = /** @type {HTMLElement} */ (ev.target); if (tg.closest('[data-x]')) close(); else if (tg.closest('[data-relevel]')) relevel(); });
}
export const isOpen = () => scene !== null;
/** the addresses the two panes' acts name and their positions are measured against (`Pane.names`) */
export const pair = () => (scene ? { a: scene.a.names, b: scene.b.names } : null);
/** the scene's runs of shared identity and the two ends it sets level, read-only (the gate reads them) */
export const pairs = () => (scene ? { pairs: scene.pairs.map((p) => ({ ...p })), level: { ...scene.level } } : null);
/** the bands and lines the last draw drew, their ends on screen (the gate holds each to its passage's line) */
export const ties = () => drawnTies.map((d) => ({ ...d, a: { ...d.a }, b: { ...d.b } }));
/** is a pane being set again: an act on the panes waits for it (see the head) */
export const updating = () => !!scene && scene.updating > 0;
/**
 * Each pane as it stands, read-only (the gate reads it): the address it was
 * opened on, the record its text was made from, the address its acts name and
 * the one it shows, its kind, its version and the chain's count, its corner's
 * act and what its corner says it lacks, and the blocks its article was made
 * from.
 */
export function panes() {
  const S = scene;
  if (!S) return null;
  const of = (/** @type {Pane} */ P) => ({ doc: P.doc, src: P.src, names: P.names, shows: P.shows, kind: P.kind, k: P.k, n: P.n, read: P.read, lacks: P.lacks, blocks: P.d.blocks.map((b) => ({ pos: b.pos, width: b.width, kind: b.kind, text: b.text })) });
  return { a: of(S.a), b: of(S.b) };
}

/**
 * `compare`'s pairs with each run of contiguous pairs — adjoining in both
 * documents — one pair, in the first document's order (§2.5: one band per
 * shared run).
 * @param {ComparePair[]} raw
 * @returns {ComparePair[]}
 */
export function merged(raw) {
  /** @type {ComparePair[]} */
  const out = [];
  for (const p of [...raw].sort((x, y) => x.u1 - y.u1 || x.u2 - y.u2)) {
    const last = out[out.length - 1];
    if (last && last.d1 === p.d1 && last.d2 === p.d2 && last.u1 + last.width === p.u1 && last.u2 + last.width === p.u2) last.width += p.width;
    else out.push({ ...p });
  }
  return out;
}

/**
 * A passage of the first document's counterparts in the second: every
 * stretch of shared identity inside it — a run of contiguous pairs one
 * stretch (`merged`) — clipped to the passage, in the first document's
 * order, each its first position in each document and its positions; none
 * where the passage shares nothing. What a carried passage is re-projected
 * at a landing as, every one marked there (N-GO; foundations §2.3: "what of
 * it the landing's text holds marked there"; P43).
 * @param {ComparePair[]} pairs `compare`'s pairs, `u1` in the first document
 * @param {number} pos the passage's first position
 * @param {number} width its positions
 * @returns {Array<{a: number, b: number, width: number}>}
 */
export function counterparts(pairs, pos, width) {
  const end = pos + Math.max(1, width);
  return merged(pairs).filter((q) => q.u1 < end && pos < q.u1 + q.width).map((p) => {
    const a = Math.max(pos, p.u1);
    return { a, b: p.u2 + (a - p.u1), width: Math.min(end, p.u1 + p.width) - a };
  });
}

/**
 * A passage of the first document's counterpart in the second: the first of
 * its `counterparts`, the passage's first stretch of shared identity; null
 * where the passage shares none. The one rule the scene sets the two ends
 * level by (`levels`), a carried passage's landing stands at (N-GO) and a
 * pane's corner's act keeps its passage's line at (`carryInto`).
 * @param {ComparePair[]} pairs `compare`'s pairs, `u1` in the first document
 * @param {number} pos the passage's first position
 * @param {number} width its positions
 * @returns {{a: number, b: number, width: number} | null}
 */
export function counterpart(pairs, pos, width) {
  return counterparts(pairs, pos, width)[0] || null;
}

/**
 * The position two documents share nearest a passage of the first that the
 * second holds none of (issue #154's design decision: "If the new version
 * lacks the passage, the nearest passage the two versions share keeps the
 * line instead"): of the stretches of shared identity (`merged`), the last
 * position of one ending before the passage's first position, or the first
 * position of one beginning after it, whichever lies nearer that first
 * position — the one before where both lie as near — with its counterpart in
 * the second; null where the two share nothing. What N-GO's version move
 * keeps the passage's line at where the version it moves to holds none of it,
 * and a pane's corner's act too (`carryInto`).
 * @param {ComparePair[]} pairs `compare`'s pairs, `u1` in the first document
 * @param {number} pos the passage's first position
 * @returns {{a: number, b: number} | null}
 */
export function nearest(pairs, pos) {
  /** @type {{a: number, b: number, d: number} | null} */
  let best = null;
  for (const q of merged(pairs)) {
    const before = q.u1 + q.width <= pos;
    const a = before ? q.u1 + q.width - 1 : q.u1, d = Math.abs(pos - a);
    if (!best || d < best.d || (d === best.d && before)) best = { a, b: q.u2 + (a - q.u1), d };
  }
  return best && { a: best.a, b: best.b };
}

/**
 * The two ends the scene sets level (§2.5: "position carries the match"):
 * where the opener names a position in the second document — a link's far
 * end — the held position and that one; else the passage held set level with
 * its `counterpart`, the second at its top where the held passage shares
 * none; with nothing held, the first pair's two ends.
 * @param {ComparePair[]} runs `compare`'s pairs, `u1` in the first document
 * @param {Held} [held]
 * @returns {Level}
 */
export function levels(runs, held = {}) {
  const posA = held.posA ?? null;
  if (held.posB != null) return { a: posA, b: held.posB };
  if (posA == null) { const first = [...runs].sort((x, y) => x.u1 - y.u1)[0]; return first ? { a: first.u1, b: first.u2 } : { a: null, b: null }; }
  const c = counterpart(runs, posA, held.widthA ?? 1);
  return c ? { a: c.a, b: c.b } : { a: posA, b: null };
}

/** the positions from a position to the end of the block holding it, of the blocks named; one where none holds it */
function restIn(/** @type {Block[]} */ blocks, /** @type {number} */ pos) {
  const b = REC.blockIn(blocks, pos);
  return b ? b.pos + b.width - pos : 1;
}

/**
 * A link's far end in the pane whose document stands in the box its far end
 * names, and the key it is told apart by (LK's `endKey`): the first stretch
 * `project` placed its passage in in the pane's own text as the pane was set
 * (`placed`) — else LK's `farRuns` where LK placed it in that document
 * (`farAt`), whatever version of the box the plane shows (issue #154's design
 * decision); where it names the document whole, or floats — the pane's text
 * holding none of it, where its follow lands at the head — the pane's first
 * block to the block's end; null where nothing places it, its projection not
 * read or refused.
 * @param {Shown} s the link as LK showed it at the other pane's document
 * @param {PaneLinks} pane the pane its far end is sought in
 * @returns {{key: string, pos: number, width: number} | null}
 */
function farEndIn(s, pane) {
  if (!s.farEnd) return null;
  const key = LK.endKey(s.farEnd), blocks = pane.blocks;
  const held = s.farWhole || !pane.placed ? undefined : pane.placed.get(s.link.addr + ' ' + s.farSlot);
  const runs = Array.isArray(held) ? held : (s.farAt || s.far) === pane.addr ? s.farRuns : null;
  if (s.farWhole || (runs && !runs.length)) { const pos = (blocks[0] || { pos: 1 }).pos; return { key, pos, width: restIn(blocks, pos) }; }
  const r = runs && runs[0];
  return r ? { key, pos: r.pos, width: r.width } : null;
}

/**
 * The links drawn as lines between the panes (§2.5: "a link's line drawn
 * where either pane's default composition draws that link"): every end LK
 * showed at either pane's document as it was set whose far end names the
 * other's box — that document, or another version sharing its box
 * (`oneBox`) — each resolved to its end in pane A and its end in pane B — the
 * near end at the first stretch LK placed it in, the far end where
 * `farEndIn` places it, none where nothing does — and each link ONCE per
 * pair of ends, in the order met, pane A's ends first. A link both panes show
 * is met from each; a document in both panes meets a link inside it from each
 * end in each pane, and draws it once for each way its two ends stand across
 * the panes. Ends are told apart by their pane and the span the link stores
 * for them (LK's `endKey`), never by their document alone, which would fold
 * those two ways into one line and leave the pair the scene sets level
 * without the line that confirms it, and never by where they stand now, which
 * the two panes read from two answers.
 * Each END of a line is drawn in the mark its pane's document gives the link
 * — the one the link's symbol takes in that pane (`LK.markOf` at that
 * document; issue #166's design decision: "Lines between the side-by-side
 * view's panes follow the same rule"): its hue there, dashed only for
 * another's, as BM inks a beam's ends (`inkOf`), whichever pane meets it, so
 * opening the scene never recolours the link it opened on; its value the
 * link's own (P44: "never a stack, never accumulated tint").
 * @param {PaneLinks} A pane A's
 * @param {PaneLinks} B pane B's
 * @returns {Line[]}
 */
export function linesBetween(A, B) {
  /** @type {Map<string, Line>} each line as first met, by its link and its two ends */
  const met = new Map();
  for (const [near, far, nearIsA] of /** @type {Array<[PaneLinks, PaneLinks, boolean]>} */ ([[A, B, true], [B, A, false]])) {
    for (const s of near.shown) {
      if (!s.far || !oneBox(s.far, far.addr)) continue;
      const here = { key: LK.endKey(s.nearEnd), pos: s.pos, width: s.width }, there = farEndIn(s, far);
      if (!there) continue;
      const [a, b] = nearIsA ? [here, there] : [there, here];
      const key = `${s.link.addr} ${a.key} ${b.key}`;
      if (met.has(key)) continue;
      const atA = LK.markOf(s.link, A.addr), atB = LK.markOf(s.link, B.addr);
      met.set(key, { link: s.link.addr, a: { pos: a.pos, width: a.width }, b: { pos: b.pos, width: b.width }, ink: { a: inkOf(atA), b: inkOf(atB) }, value: atA.value });
    }
  }
  return [...met.values()];
}

/**
 * @typedef {Object} Text — one side of the reads between the panes: the record a pane's text is made from, and the links shown at it
 * @property {string} src
 * @property {Doc} d
 * @property {Shown[]} shown
 */

/**
 * The far ends the panes' lines need placed: each link shown at one side
 * whose far end is a passage of the other's box, once per link and slot,
 * where no projection of it into the other's record is held — the reads each
 * setting of the panes asks with its `compare`, so its lines stand where the
 * passages stand in the pane's own text (`farEndIn`).
 * @param {Text} A
 * @param {Text} B
 * @returns {Array<{link: string, slot: 1 | 2, far: string}>}
 */
function unplaced(A, B) {
  /** @type {Map<string, {link: string, slot: 1 | 2, far: string}>} */
  const out = new Map();
  for (const [near, far] of [[A, B], [B, A]]) {
    for (const s of near.shown) {
      if (!s.far || !oneBox(s.far, far.src) || !s.farEnd || s.farWhole || REC.projection(s.link.addr, s.farSlot, far.src) !== undefined) continue;
      out.set(s.link.addr + ' ' + s.farSlot, { link: s.link.addr, slot: s.farSlot, far: far.src });
    }
  }
  return [...out.values()];
}

/**
 * Where the far ends of the links crossing into a pane stand in its text now,
 * as the model holds `project`'s answers: what the pane keeps as it is set,
 * its lines read from it and never the model's now (`measure`).
 * @param {string} src the record the pane's text is made from
 * @param {Shown[]} shown the links shown at either pane
 * @returns {Map<string, Stretch[] | Declined>}
 */
function placedInto(src, shown) {
  /** @type {Map<string, Stretch[] | Declined>} */
  const out = new Map();
  for (const s of shown) {
    if (!s.far || !oneBox(s.far, src) || !s.farEnd || s.farWhole) continue;
    const held = REC.projection(s.link.addr, s.farSlot, src);
    if (held !== undefined) out.set(s.link.addr + ' ' + s.farSlot, held);
  }
  return out;
}

/**
 * A pane's record read before it is set (see the head): whole (M-PUMP's
 * `wholeOf`), and, at an edition at its bare address, its chain's members
 * where the page holds no count (`probeChain`) — the member its text is,
 * which its acts name. Null where the board did not answer, which leaves a
 * pane as it shows; `whole` false where the board refused the text for what
 * it says of the document — withheld from the reader, or nothing it will say
 * of the address — the record then standing as that refusal (a pane read
 * again at the death; a scene opens on two texts read whole alone).
 * @param {string} src
 * @param {() => boolean} [stands] the opening the read is made for still stands: a probe asks no more once it ends
 * @returns {Promise<{d: Doc, n: number | null, whole: boolean} | null>}
 */
async function readPane(src, stands = () => true) {
  const w = await PUMP.wholeOf(src);
  if (!w.doc && !REC.doc(src).refused) return null;
  let n = REC.has(boxOf(src)) ? REC.doc(boxOf(src)).members : null;
  if (w.doc && kindAt(src, w.doc) === 'bare' && n == null && stands()) { const p = await PUMP.probeChain(src, stands); n = p && p.known ? p.n : null; }
  return { d: REC.doc(src), n, whole: !!w.doc };
}

/**
 * The reads between the panes, made before they are set (see the head): the
 * two texts' `compare` whole — none where either holds no text — and where
 * each far end crossing between them stands (`unplaced`, M-PUMP's
 * `projectEnd`). The runs of shared identity (`merged`), and the refusal the
 * `compare` met by its name, which the bar says.
 * @param {Text} A
 * @param {Text} B
 * @returns {Promise<{pairs: ComparePair[], refused: string | null}>}
 */
async function readBetween(A, B) {
  const holds = (/** @type {Doc} */ d) => !d.refused && d.extent != null;
  const whole = (/** @type {Text} */ x) => [{ doc: x.src, spans: [{ ordinal: 1, positions: Math.max(1, x.d.extent || 1) }] }];
  const [cmp] = await Promise.all([
    holds(A.d) && holds(B.d) ? PUMP.read(F.compare(whole(A), whole(B))) : Promise.resolve(null),
    ...unplaced(A, B).map((p) => PUMP.projectEnd(p.link, p.slot, p.far)),
  ]);
  if (!cmp) return { pairs: [], refused: null };
  if ('refused' in cmp) return { pairs: [], refused: cmp.refused.name };
  return { pairs: merged(F.decodeCompare(cmp.answer)), refused: null };
}

/**
 * A pane as the scene opens it on a record read (see the head): its kind, the
 * member its text is and the chain's count where an edition, the address its
 * acts name and the one it shows, and what it is set with — the record, the
 * view its article draws.
 * @param {'a' | 'b'} side
 * @param {string} src
 * @param {{d: Doc, n: number | null}} r
 * @returns {Pane}
 */
function paneAt(side, src, r) {
  const kind = kindAt(src, r.d);
  const k = kind === 'pinned' ? memberOf(src) : kind === 'bare' ? r.n : null;
  const names = kind === 'bare' && r.n ? versionAddress(src, r.n) : src;
  return {
    side, doc: src, src, names, shows: kind === 'bare' ? src : names, kind, k, n: kind === 'draft' ? null : r.n, read: null, lacks: null,
    d: { ...r.d }, view: LAYER.sceneView(r.d), placed: new Map(), place: null, el: null, serial: 0, sets: 0,
  };
}

/** a pane's corner's items: T-ARTICLE's (`sceneCorner`), naming the version it shows, the chain's count as the pane knows it, the act it offers and what it says the version it reads lacks */
const cornerItems = (/** @type {Pane} */ P) => LAYER.sceneCorner(P.shows === P.d.addr ? P.d : { ...P.d, addr: P.shows }, { ...P.view, members: P.n, read: P.read, lacks: P.lacks });
/** a pane's corner's id: the group is named by its own words */
const cornerId = (/** @type {'a' | 'b'} */ side) => (side === 'a' ? 'sceneA' : 'sceneB') + '-corner';
/** a pane's corner's markup (see the head): its one Tab stop, a group named by its own words, as the plane's corner is (D5 K-57) */
const cornerMarkup = (/** @type {Pane} */ P) => `<div class="corner" data-corner="${esc(P.shows)}" id="${cornerId(P.side)}" role="group" aria-labelledby="${cornerId(P.side)}" tabindex="0">${cornerItems(P)}</div>`;

/** a pane's corner written again, in place: the element kept, so the focus standing on it stays */
function writeCorner(/** @type {NonNullable<typeof els>} */ E, /** @type {Pane} */ P) {
  const c = /** @type {HTMLElement | null} */ (paneEl(E, P.side).querySelector(':scope > .corner'));
  if (!c) return;
  c.dataset.corner = P.shows;
  c.innerHTML = cornerItems(P);
}

/** the bar's name for a pane, written again: the address it shows */
function nameBar(/** @type {NonNullable<typeof els>} */ E, /** @type {Pane} */ P) {
  const b = E.bar.querySelector(`[data-name="${P.side}"]`);
  if (b) b.textContent = P.shows;
}

/** a pane's article put in its place: the one it shows replaced, else placed — pane A's after its corner, pane B's before it, so each corner stands on its pane's outer side */
function swap(/** @type {NonNullable<typeof els>} */ E, /** @type {Pane} */ P, /** @type {HTMLElement} */ el) {
  const pane = paneEl(E, P.side);
  if (P.el && pane.contains(P.el)) P.el.replaceWith(el);
  else if (P.side === 'a') pane.append(el); else pane.prepend(el);
  P.el = el;
}

/**
 * Open the scene on two documents, once its reads answer where no act was
 * made on the chrome meanwhile (O-HOST's opening) — both documents whole,
 * the chain of each edition read at its bare address, their `compare`, and
 * where the far end of each link crossing between them stands now
 * (`readBetween`) — the passage held set level with its counterpart
 * (`levels`); the focus in the far end's pane, the plane under the scene out
 * of the page's order (see the head).
 * @param {string} a
 * @param {string} b
 * @param {Held} [held]
 * @returns {Promise<void>} settled once the scene opens, or nothing will
 */
export async function open(a, b, held = {}) {
  if (!els) return;
  HOST.dismiss();
  // where the act found the focus — read after the dismissal, which hands back a focus the overlay held, and before the
  // reads, in which the person may move it; a scene opened over one standing keeps that one's (the controller's one memory)
  const from = document.activeElement;
  await HOST.opening(async (stands) => {
    const [ra, rb] = await Promise.all([readPane(a, stands), readPane(b, stands)]);
    if (!ra || !rb || !ra.whole || !rb.whole || !stands()) return null;
    const between = await readBetween({ src: a, d: ra.d, shown: LK.shown(a) }, { src: b, d: rb.d, shown: LK.shown(b) });
    return { ra, rb, between };
  }, ({ ra, rb, between }) => {
    const E = els;
    if (!E) return;
    if (between.refused) E.bar.dataset.face = between.refused; else delete E.bar.dataset.face;
    /** @type {Scene} */
    const S = { a: paneAt('a', a, ra), b: paneAt('b', b, rb), pairs: between.pairs, level: levels(between.pairs, held), ties: [], size: '', updating: 0, waiting: [] };
    scene = S;
    S.a.placed = placedInto(a, [...S.b.view.marks, ...S.a.view.marks]);
    S.b.placed = placedInto(b, [...S.a.view.marks, ...S.b.view.marks]);
    coverPlane(true);
    E.root.classList.add('on');
    const face = E.bar.dataset.face;
    E.bar.innerHTML = `<b data-name="a">${esc(S.a.shows)}</b> │ <b data-name="b">${esc(S.b.shows)}</b> <span class="dim">${esc(t('F.scene.sameness'))} · ${esc(t('F.scene.link'))}</span>` +
      (face ? ` <span class="face-text">${esc(t(face === 'too_many_pairs' ? 'B1.too_many_pairs' : face === 'too_many_blocks' ? 'B1.too_many_blocks' : 'L.refused', { name: face }))}</span>` : '') +
      ` <button data-relevel="1">${esc(t('F.scene.relevel'))} <kbd>${esc(drawChord('Mod+R'))}</kbd></button><button class="x" data-x="1">× ${esc(t('F.scene.dismiss'))}</button>`;
    // each pane's article T-LAYER's mount, its corner on the pane's outer side: pane A's before the article, pane B's after
    for (const side of SIDES) {
      const P = S[side], pane = paneEl(E, side);
      pane.innerHTML = cornerMarkup(P);
      swap(E, P, LAYER.sceneArticle(P.d, { names: P.names, shows: P.shows, view: P.view }));
      namePane(pane, side === 'a' ? 'sceneA-name' : 'sceneB-name');
      pane.setAttribute('tabindex', '0');
    }
    fitMeasure(E);
    relevel();
    FOCUS.open('scene', { el: E.root, from, byKey: true, first: E.paneB });
    markDirty();
  });
}

/**
 * The article a pane holds, with what it was made from (T-LAYER's `madeOf`):
 * the blocks every position in the pane is mapped through, the article's
 * own, whatever the model has delivered since; null where the pane holds
 * none.
 * @param {HTMLElement} pane
 * @returns {{el: HTMLElement, made: import('../text/layer.js').Made} | null}
 */
function articleIn(pane) {
  const el = /** @type {HTMLElement | null} */ (pane.querySelector('article.dtext'));
  const made = el ? LAYER.madeOf(el) : null;
  return el && made ? { el, made } : null;
}

/**
 * Where a passage's first line stands in a pane, in px below the pane's
 * content top: the first client rect of the platform range over the passage
 * (T-LAYER's mapping, through the blocks the pane's article was made from,
 * the article's chrome skipped); null where the passage lies in none of them.
 * @param {HTMLElement} pane
 * @param {string} addr the address the pane's article is made as (`Pane.names`)
 * @param {number} pos
 * @param {number} width
 * @returns {{top: number, y: number} | null} the line's top, and its middle
 */
function lineIn(pane, addr, pos, width) {
  const art = articleIn(pane);
  const range = art ? LAYER.rangeIn(art.el, { addr, pos, width: Math.max(1, width) }) : null;
  const r = range ? [...range.getClientRects()].find((q) => q.width > 0 && q.height > 0) : null;
  if (!r) return null;
  const origin = pane.getBoundingClientRect().top + pane.clientTop - pane.scrollTop;
  return { top: r.top - origin, y: r.top + r.height / 2 - origin };
}

/**
 * The line a position stands on in a pane (`lineIn`): its own, else, where it
 * sets no glyph of its own — a block's separator, which the position the two
 * versions share nearest a passage often is (`nearest`) — the line of the last
 * character before it, sixteen positions back at most; null where none of
 * them sets one.
 * @param {HTMLElement} pane
 * @param {string} addr the address the pane's article is made as (`Pane.names`)
 * @param {number} pos
 */
function lineAt(pane, addr, pos) {
  for (let k = pos; k >= Math.max(1, pos - 16); k--) { const line = lineIn(pane, addr, k, 1); if (line) return line; }
  return null;
}

/** the first position of the first block of a pane's article whose box meets the pane's visible content — the first span in view; null where none does */
function firstInView(/** @type {HTMLElement} */ pane) {
  const art = articleIn(pane);
  if (!art) return null;
  const r = pane.getBoundingClientRect(), top = r.top + pane.clientTop, bottom = top + pane.clientHeight;
  for (const e of /** @type {NodeListOf<HTMLElement>} */ (art.el.querySelectorAll('.run > .sp, .run > .withheld'))) {
    const q = e.getBoundingClientRect();
    if (q.height > 0 && q.bottom > top && q.top < bottom) return Number(e.dataset.pos);
  }
  return null;
}

/**
 * A reader's place in a pane at a position (`Place`): its byte by identity
 * through the image the pane's article was made from, and how far below the
 * pane's visible top its line stands; null where the pane holds no line for
 * it.
 * @param {Pane} P
 * @param {number | null} pos
 * @returns {Place | null}
 */
function placeAt(P, pos) {
  const E = els;
  if (!E || pos == null || !P.el) return null;
  const pane = paneEl(E, P.side), line = lineAt(pane, P.names, pos), made = LAYER.madeOf(P.el);
  return line && made ? { pos, ids: REC.identityIn(made.image, pos, 1), at: line.top - pane.scrollTop } : null;
}

/**
 * Each pane's text at the plane's measure (see the head): its article, the
 * style's `--measure` characters of its face wide, set at PANE_FS, or where
 * its pane's content beside the corner and the gap holds less, at the size
 * whose column that room holds.
 * @param {NonNullable<typeof els>} E
 */
function fitMeasure(E) {
  for (const pane of [E.paneA, E.paneB]) {
    const art = /** @type {HTMLElement | null} */ (pane.querySelector(':scope > article.dtext'));
    if (!art) continue;
    const corner = pane.querySelector(':scope > .corner'), cs = getComputedStyle(pane);
    const room = pane.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - (corner ? corner.getBoundingClientRect().width + (parseFloat(cs.columnGap) || 0) : 0);
    art.style.fontSize = PANE_FS + 'px';
    for (let i = 0, w = art.getBoundingClientRect().width; i < 3 && room > 0 && w > room; i++, w = art.getBoundingClientRect().width) art.style.fontSize = parseFloat(art.style.fontSize) * (room / w) + 'px';
  }
}

/** each pane's article given a pane's height of room below its end, so any of its lines can be scrolled to the pane's top */
function roomBelow(/** @type {NonNullable<typeof els>} */ E) {
  for (const pane of [E.paneA, E.paneB]) { const art = articleIn(pane); if (art) art.el.style.paddingBottom = pane.clientHeight + 'px'; }
}

/** the panes' sizes, the measure the ties' ends were taken at */
const sizeOf = (/** @type {NonNullable<typeof els>} */ E) => `${E.paneA.clientWidth}x${E.paneA.clientHeight}|${E.paneB.clientWidth}x${E.paneB.clientHeight}`;

/** what a pane gives the lines between the panes: what it was set with (`PaneLinks`) */
const linksOf = (/** @type {Pane} */ P) => ({ addr: P.src, shown: P.view.marks, blocks: P.d.blocks, placed: P.placed });

/**
 * Measure the ties: each run of shared identity, and each link between the
 * two documents once per pair of its ends (`linesBetween`), its ends at
 * their passages' first lines in the panes' content — every one from what the
 * panes were set with, never the model's now; a tie an end of which lies in
 * none of its pane's blocks is left out.
 */
function measure() {
  const S = scene, E = els;
  if (!S || !E) return;
  /** @type {Scene['ties']} */
  const out = [];
  for (const p of S.pairs.slice(0, MAX_BANDS)) {
    const la = lineIn(E.paneA, S.a.names, p.u1, p.width), lb = lineIn(E.paneB, S.b.names, p.u2, p.width);
    if (la && lb) out.push({ kind: 'band', link: null, a: { pos: p.u1, width: p.width, y: la.y }, b: { pos: p.u2, width: p.width, y: lb.y }, ink: { a: BAND_INK, b: BAND_INK }, value: 0.7 });
  }
  // the link lines between the panes — the set LK gave at each pane's document as it was set (the seam)
  for (const l of linesBetween(linksOf(S.a), linksOf(S.b))) {
    const la = lineIn(E.paneA, S.a.names, l.a.pos, l.a.width), lb = lineIn(E.paneB, S.b.names, l.b.pos, l.b.width);
    if (la && lb) out.push({ kind: 'link', link: l.link, a: { ...l.a, y: la.y }, b: { ...l.b, y: lb.y }, ink: l.ink, value: l.value });
  }
  S.ties = out;
  S.size = sizeOf(E);
}

/**
 * Panes set again in ONE STEP (see the head) — every read made before it,
 * nothing awaited in it: each one's reader's place, the platform's selection
 * there and the end set level in it read from the article it shows; its new
 * article made and swapped in, its corner and the bar naming what it shows
 * now; then each one's place, its selection and its end set level carried to
 * where their bytes stand in the text it takes — by identity through the
 * images the two articles were made from, else by position, a corner's act's
 * passage by the position that act names — the runs of shared identity
 * between the panes taken, the far ends crossing into each kept, and the ties
 * measured anew and drawn, so no tie is drawn over text it was not measured
 * on. A pane taken down at the death carries nothing into the text it takes:
 * its reader's place is kept for the read at the guest's class that sets it
 * again.
 * @param {Scene} S
 * @param {Array<{side: 'a' | 'b', next: Next}>} sets
 * @param {ComparePair[] | null} pairs the runs of shared identity between the panes now; null where they stand as they were
 * @param {{down?: boolean}} [opts] `down` the panes are taken down at the death
 */
function setPanes(S, sets, pairs, opts = {}) {
  const E = els;
  if (!E) return;
  const set = new Set(sets.map((x) => x.side));
  const carried = sets.map(({ side, next }) => {
    const P = S[side], made = P.el ? LAYER.madeOf(P.el) : null, image = made ? made.image : [];
    const here = placeAt(P, next.hold ? next.hold.from : firstInView(paneEl(E, side)));
    if (opts.down) { P.place = P.place || here; return { side, next, place: null, sel: null, level: null }; }
    const place = P.place || here;
    P.place = null;
    const sel = P.el ? LAYER.selectionIn(P.el) : null, lv = S.level[side];
    return {
      side, next, place,
      sel: sel ? { ids: REC.identityIn(image, sel.span.pos, sel.span.width), backward: sel.backward } : null,
      level: lv != null ? { pos: lv, ids: REC.identityIn(image, lv, 1) } : null,
    };
  });
  for (const { side, next } of carried) {
    const P = S[side], view = next.view ?? LAYER.sceneView(next.d);
    Object.assign(P, { d: { ...next.d }, view, kind: next.kind, src: next.src, names: next.names, shows: next.shows, k: next.k, n: next.n, read: next.read, lacks: next.lacks });
    P.sets++;
    swap(E, P, LAYER.sceneArticle(P.d, { names: P.names, shows: P.shows, view }));
    writeCorner(E, P);
    nameBar(E, P);
    namePane(paneEl(E, side), side === 'a' ? 'sceneA-name' : 'sceneB-name');
  }
  fitMeasure(E);
  roomBelow(E);
  for (const { side, next, place, sel, level } of carried) {
    const P = S[side], pane = paneEl(E, side), image = P.d.image;
    /** where a carried byte stands in the text taken: by its identity, the corner's act's passage at the position it names, else where it stood */
    const there = (/** @type {{pos: number, ids: ISpan[]}} */ x) => {
      if (next.hold && x.pos === next.hold.from) return next.hold.to;
      const at = REC.placedIn(image, x.ids);
      return at.length ? at[0].pos : x.pos;
    };
    if (place) { const line = lineAt(pane, P.names, there(place)); if (line) pane.scrollTop = line.top - place.at; }
    if (sel && P.el) {
      const at = REC.placedIn(image, sel.ids), z = at[at.length - 1];
      if (z) LAYER.selectIn(P.el, { addr: P.names, pos: at[0].pos, width: z.pos + z.width - at[0].pos }, sel.backward);
    }
    if (level) S.level[side] = there(level);
  }
  if (pairs) S.pairs = pairs;
  for (const side of SIDES) {
    const P = S[side], Q = S[otherSide(side)];
    const now = placedInto(P.src, [...Q.view.marks, ...P.view.marks]);
    P.placed = set.has(side) ? now : new Map([...P.placed, ...now]);
  }
  measure();
  draw();
}

/**
 * An act on the panes made while one is being set again waits for it (see
 * the head; issue #160's design decision: "An act taken mid-update waits for
 * the update to finish"): run now where no setting reads, else once the last
 * lands, in the order the acts were made. Ending the scene never waits.
 * @param {() => void} fn
 */
function whenSet(fn) {
  const S = scene;
  if (S && S.updating) S.waiting.push(fn); else fn();
}

/**
 * A pane set again from what its reads bring (see the head): its record read
 * whole — the one it shows, or the version its corner's act reads — and, at
 * an edition at its bare address, its chain; the passage the corner's act
 * carries placed in the version it reads (`carryInto`); then the reads between
 * the panes; then, where the scene still stands and no later setting was
 * asked of the pane, the one step (`setPanes`) — its `compare` read again
 * where the other pane was set meanwhile, so the bands stand on both texts as
 * they are. A newer member found where a row naming it was not seen pins an
 * edition at its bare address instead (`pin`). Where the board did not
 * answer, the pane keeps what it shows.
 * @param {'a' | 'b'} side
 * @param {{src?: string, carry?: {pos: number, width: number} | null, read?: number | null}} [how] `src` the version the corner's act reads — the pane's own record where none is given; `carry` the passage it carries; `read` the version the corner offers after it, the one it left
 * @returns {Promise<void>}
 */
async function update(side, how = {}) {
  const S = scene;
  if (!S) return;
  const P = S[side], Q = S[otherSide(side)], serial = ++P.serial;
  const stale = () => scene !== S || P.serial !== serial;
  S.updating++;
  try {
    const src = how.src ?? P.src;
    const r = await readPane(src);
    // a version the corner's act could not read whole leaves the pane as it shows
    if (stale() || !r || (how.src && !r.whole)) return;
    if (P.kind === 'bare' && !how.src && P.k != null && r.n != null && r.n > P.k) { pin(S, side, P.k, r.n); return; }
    const kind = how.src ? 'pinned' : P.kind === 'pinned' ? 'pinned' : kindAt(src, r.d);
    const k = kind === 'pinned' ? memberOf(src) : kind === 'bare' ? r.n : null;
    const names = kind === 'bare' && r.n ? versionAddress(src, r.n) : src;
    const n = kind === 'draft' ? null : Math.max(r.n ?? 0, P.n ?? 0, k ?? 0) || null;
    /** @type {{from: number, to: number} | null} */
    let hold = null;
    /** @type {number | null} what the corner says the version it reads lacks: the act's, else as it said */
    let lacks = how.src ? null : P.lacks;
    if (how.carry) {
      const into = await carryInto(P, how.carry, r.d);
      if (stale()) return;
      hold = { from: into.from, to: into.to };
      lacks = into.none ? k : null;
    }
    for (;;) {
      const seen = Q.sets;
      const mine = { src, d: r.d, shown: LK.shown(src) }, theirs = { src: Q.src, d: Q.d, shown: Q.view.marks };
      const between = await readBetween(side === 'a' ? mine : theirs, side === 'a' ? theirs : mine);
      if (stale()) return;
      if (Q.sets !== seen) continue;
      const read = how.read !== undefined ? how.read : P.read;
      setPanes(S, [{ side, next: { d: r.d, kind, src, names, shows: kind === 'bare' ? src : names, k, n, read, lacks, hold } }], between.pairs);
      return;
    }
  } finally {
    S.updating--;
    // the acts waiting, in the order made — each one waiting again on a setting the one before it asked
    while (!S.updating && scene === S && S.waiting.length) /** @type {() => void} */ (S.waiting.shift())();
  }
}

/**
 * Where a passage the corner's act carries stands in the version it reads
 * (see the head; as N-GO's version move places one): `compare` of the text
 * the pane shows against that version whole, in parts where the board refuses
 * it for its size (M-PUMP's `compareParts`) — the passage's first stretch of
 * shared identity and its counterpart (`counterpart`), else the position the
 * two share nearest it (`nearest`), else the version's head, the version then
 * said to lack it.
 * @param {Pane} P
 * @param {{pos: number, width: number}} c
 * @param {Doc} d the version read
 * @returns {Promise<{from: number, to: number, none: boolean}>} `from` the position in the text shown whose line the reader's place stands on; `to` the one in the version that takes it
 */
async function carryInto(P, c, d) {
  const e = P.d.extent;
  const out = e && d.extent ? await PUMP.compareParts({ doc: P.names, pos: 1, width: e }, { doc: d.addr, pos: 1, width: d.extent }) : null;
  return carriedTo(out && 'pairs' in out ? out.pairs : [], c, (d.blocks[0] || { pos: 1 }).pos);
}

/**
 * Where a passage of the text a pane shows stands in another version of it,
 * from `compare`'s pairs of the two (see the head; as N-GO's version move
 * places one): its first stretch of shared identity and its counterpart
 * (`counterpart`) keep its line; where the version holds none of it, the
 * counterpart of the position the two share nearest it (`nearest`) takes the
 * line the passage stood on, else the version's head does, the version then
 * said to lack the passage.
 * @param {ComparePair[]} pairs `compare`'s pairs, `u1` in the text the pane shows
 * @param {{pos: number, width: number}} c the passage
 * @param {number} head the version's first block's first position
 * @returns {{from: number, to: number, none: boolean}} `from` the position in the text shown whose line the reader's place stands on; `to` the one in the version that takes it; `none` the version holds none of the passage
 */
export function carriedTo(pairs, c, head) {
  const cp = counterpart(pairs, c.pos, c.width);
  if (cp) return { from: cp.a, to: cp.b, none: false };
  const near = nearest(pairs, c.pos);
  return { from: c.pos, to: near ? near.b : head, none: true };
}

/**
 * A newer member's arrival at an edition read at its bare address (see the
 * head; foundations §3.2's "the board moves": "a published document read at
 * its bare address keeps the member being read … the address display then
 * pinned to the member being read … so the chrome never says 'the latest'
 * over text that is not"): the pane pinned at once to the member its text is
 * — its head, its corner and the bar naming `D.k`, "version ⟨k⟩ of ⟨n⟩", its
 * corner offering to read the newest — set from what it kept, with no read;
 * the arrival said once, politely; then `D.k` read whole and the pane set
 * again from it, its marks and lines with it.
 * @param {Scene} S
 * @param {'a' | 'b'} side
 * @param {number} k the member its text is
 * @param {number} m the newest member known
 */
function pin(S, side, k, m) {
  const P = S[side], names = versionAddress(boxOf(P.src), k), n = Math.max(m, P.n ?? 0);
  setPanes(S, [{ side, next: { d: P.d, view: P.view, kind: 'pinned', src: names, names, shows: names, k, n, read: n, lacks: null, hold: null } }], null);
  FOCUS.say(t('F.arrival.pane', { k }));
  void update(side);
}

/**
 * A newer member named at a pane on a version (see the head: "A pane on a
 * pinned version only updates its 'of n'"): its corner's count, and its act,
 * where it offers the newest, naming the newest; nothing of its text.
 * @param {Scene} S
 * @param {'a' | 'b'} side
 * @param {number} m
 */
function count(S, side, m) {
  const P = S[side], E = els;
  if (!E || (P.n != null && m <= P.n)) return;
  if (P.read != null && P.k != null && P.read > P.k) P.read = m;
  P.n = m;
  writeCorner(E, P);
}

/**
 * The newest member of a pane's box a row names — a version it published, or
 * one the link it deposited is homed in, which a bare row names by its link
 * alone; null where it names none.
 * @param {FeedUpdate | null} row
 * @param {string} src
 * @returns {number | null}
 */
function newest(row, src) {
  if (!row) return null;
  const home = typeof row.link === 'string' ? homeOf(row.link) : null;
  let m = null;
  for (const named of [...(Array.isArray(row.docs) ? row.docs : []), ...(home ? [home] : [])]) {
    const k = isTrunkMember(named) && oneBox(named, src) ? memberOf(named) : null;
    if (k != null && (m == null || k > m)) m = k;
  }
  return m;
}

/**
 * What one of the board's events dropped, told by M-PUMP after the drop
 * (its `onDrop`; see the head): each pane the drop reached kept fresh by its
 * kind — at the page's own death, or any other change of its class, every
 * pane taken down at once and read again at the class the page reads at then;
 * a row naming a newer member pinning an edition at its
 * bare address at once, or counting a version's chain again; any other row
 * reaching a pane's text reading it again in its place.
 * @param {Dropped} x
 */
export function dropped(x) {
  const S = scene;
  if (!S) return;
  if (!x.addrs) {
    setPanes(S, SIDES.map((side) => { const P = S[side]; return { side, next: { d: REC.doc(P.src), kind: P.kind, src: P.src, names: P.names, shows: P.shows, k: P.k, n: P.n, read: P.read, lacks: P.lacks, hold: null } }; }), [], { down: true });
    for (const side of SIDES) void update(side);
    return;
  }
  for (const side of SIDES) {
    const P = S[side];
    if (!x.addrs.some((a) => oneBox(a, P.src))) continue;
    const m = newest(x.row, P.src);
    if (P.kind === 'bare' && m != null && m > (P.k ?? 0)) { const k = P.k ?? m - 1; if (k >= 1) pin(S, side, k, m); else void update(side); continue; }
    if (P.kind === 'pinned') { if (m != null) count(S, side, m); if (x.addrs.includes(P.src)) void update(side); continue; }
    void update(side);
  }
}

/**
 * A pane's corner's act (see the head), as its Enter and a click on it take
 * it, waiting for a setting reading (`whenSet`): the version it offers read in
 * the pane's place — the passage held carried into it: the selection standing
 * in the pane, else the first span in view — and the version left offered
 * back.
 * @param {'a' | 'b'} side
 * @param {{pos: number, width: number} | null} [passage] the passage held, in the text the pane shows; read from the pane where none is given
 */
export function act(side, passage = null) {
  whenSet(() => { const S = scene; if (S && S[side].read != null) readIn(side, S[side].read, passage); });
}

/**
 * A version of a pane's document read in the pane's place, as its corner's
 * act reads the one it offers (`act`; the gate's door names one), waiting for
 * a setting reading (`whenSet`): the passage held — the selection standing in
 * the pane, else the first span in view — carried into it, its line kept, the
 * corner saying so where the version lacks it, and the version left offered
 * back; never a box's version (FP-22). Nothing where the pane shows no
 * version of an edition, or the version named.
 * @param {'a' | 'b'} side
 * @param {number} k the version
 * @param {{pos: number, width: number} | null} [passage] the passage held, in the text the pane shows; read from the pane where none is given
 */
export function readIn(side, k, passage = null) {
  whenSet(() => {
    const S = scene, E = els;
    if (!S || !E) return;
    const P = S[side];
    if (P.kind === 'draft' || P.k == null || k === P.k) return;
    const sel = passage || !P.el ? null : LAYER.selectionIn(P.el);
    const pos = passage ? passage.pos : sel ? sel.span.pos : firstInView(paneEl(E, side));
    const width = passage ? passage.width : sel ? sel.span.width : 1;
    void update(side, { src: versionAddress(boxOf(P.src), k), carry: pos != null ? { pos, width } : null, read: P.k });
  });
}

/** set the two ends level — each pane's matched line at one height, the bands' and lines' ends measured anew — once no pane is being set again (`whenSet`) */
export function relevel() { whenSet(level); }

/** the two ends set level now (`relevel`) */
function level() {
  const S = scene, E = els;
  if (!S || !E) return;
  roomBelow(E);
  const la = S.level.a != null ? lineIn(E.paneA, S.a.names, S.level.a, restIn(S.a.d.blocks, S.level.a)) : null;
  const lb = S.level.b != null ? lineIn(E.paneB, S.b.names, S.level.b, restIn(S.b.d.blocks, S.level.b)) : null;
  // a pane scrolls a line up its pane, never below where it stands unscrolled: the two meet at LEVEL_AT, or higher where one stands above it
  const at = Math.min(LEVEL_AT, la ? la.top : Infinity, lb ? lb.top : Infinity);
  E.paneA.scrollTop = la ? la.top - at : 0;
  E.paneB.scrollTop = lb ? lb.top - at : 0;
  measure();
  draw();
}

/** draw the bands and the lines on the scene's canvas, each end where its passage's line stands at the panes' scrolls now */
export function draw() {
  const S = scene, E = els;
  if (!S || !E) return;
  if (sizeOf(E) !== S.size) { fitMeasure(E); roomBelow(E); measure(); }
  const cv = E.canvas, ctx = cv.getContext('2d'); if (!ctx) return;
  const c = cv.getBoundingClientRect();
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.round(c.width * DPR); cv.height = Math.round(c.height * DPR);
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.clearRect(0, 0, c.width, c.height);
  /** a pane on the canvas: its inner edges, its visible content's top and bottom, its content's top */
  const frame = (/** @type {HTMLElement} */ pane) => {
    const r = pane.getBoundingClientRect(), top = r.top + pane.clientTop - c.top;
    return { x0: r.left - c.left, x1: r.right - c.left, top, bottom: top + pane.clientHeight, origin: top - pane.scrollTop };
  };
  /** an end on the canvas: at its line, or at the pane's edge where its line has left the pane */
  const at = (/** @type {ReturnType<typeof frame>} */ f, /** @type {End} */ e) => {
    const y = f.origin + e.y;
    return { y: Math.max(f.top, Math.min(f.bottom, y)), clipped: y < f.top || y > f.bottom, above: y < f.top };
  };
  const fa = frame(E.paneA), fb = frame(E.paneB);
  /** @type {Drawn[]} */
  const out = [];
  for (const tie of S.ties) {
    const ea = at(fa, tie.a), eb = at(fb, tie.b);
    const x0 = fa.x1, x1 = fb.x0;
    ctx.globalAlpha = tie.value; ctx.lineWidth = tie.kind === 'band' ? 6 : 1.6;
    drawTie(ctx, { x: x0, ...ea }, { x: x1, ...eb }, tie.ink);
    out.push({ kind: tie.kind, link: tie.link, a: { pos: tie.a.pos, width: tie.a.width, x: x0 + c.left, y: ea.y + c.top, clipped: ea.clipped }, b: { pos: tie.b.pos, width: tie.b.width, x: x1 + c.left, y: eb.y + c.top, clipped: eb.clipped } });
  }
  ctx.globalAlpha = 1;
  drawnTies = out;
}

/** where along a tie's stroke its ends' inks meet: the half of its parameter, where BM's curve between the panes' inner edges stands at the middle of the gap (`strokeOf`) */
const GAP_MIDDLE = 0.5;

/**
 * Draw one tie between the panes (`draw`), its width and alpha set on the
 * context: BM's curve from its end at pane A's inner edge to its end at pane
 * B's, each end in its own pane's ink, a line whose two differ changing
 * colour once at the middle of the gap, one stroke with no dot or break at
 * the change (issue #166's design decision: "changing at the middle of the
 * gap"; BM's `strokeIn`); an end whose line has left its pane clipped at the
 * pane's edge with the stub's triangle, in its own end's hue.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x: number, y: number, clipped: boolean, above: boolean}} a its end at pane A's inner edge, on the canvas
 * @param {{x: number, y: number, clipped: boolean, above: boolean}} b its end at pane B's
 * @param {{a: Ink, b: Ink}} ink
 */
export function drawTie(ctx, a, b, ink) {
  strokeIn(ctx, strokeOf(a, b), ink.a, ink.b, GAP_MIDDLE);
  if (a.clipped) stub(ctx, a.x + 6, a.y, a.above ? -1 : 1, ink.a.hue);
  if (b.clipped) stub(ctx, b.x - 6, b.y, b.above ? -1 : 1, ink.b.hue);
}

function stub(/** @type {CanvasRenderingContext2D} */ ctx, /** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ dir, /** @type {string} */ hue) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(dir < 0 ? -Math.PI / 2 : Math.PI / 2);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-8, -4); ctx.lineTo(-8, 4); ctx.closePath(); ctx.fillStyle = hue; ctx.fill(); ctx.restore();
}

/**
 * End the scene, whatever ends it — Esc, zoom-out, ←, the bar's ×, or a
 * navigation act, which ends it first (§2.5): the plane as it was, and the
 * trail untouched, a navigation act's own push or cursor move the one trail
 * move it makes (see the head); a pane being set again sets nothing once it
 * ends, and an act waiting on it is dropped. The plane is put back in the
 * page's order before the focus returns, for the element the scene was opened
 * from — the walk's item, a corner — takes no focus while the scene covers
 * it; the focus's owner takes a focus the scene held off it and returns it.
 */
export function close() {
  if (!scene || !els) return;
  scene = null;
  drawnTies = [];
  coverPlane(false);
  els.root.classList.remove('on'); els.paneA.innerHTML = ''; els.paneB.innerHTML = ''; delete els.bar.dataset.face;
  FOCUS.close('scene');
  markDirty();
}

/**
 * The top of the block next below (dir 1) or above (dir −1) a pane's scroll,
 * in px of the pane's content — the first block whose top lies past the
 * scroll by more than a pixel; the pane's end past the last block, its top
 * before the first. Null where the pane holds no article.
 * @param {HTMLElement} pane
 * @param {1 | -1} dir
 * @returns {number | null}
 */
function blockTop(pane, dir) {
  const art = articleIn(pane); if (!art) return null;
  const origin = pane.getBoundingClientRect().top + pane.clientTop - pane.scrollTop;
  const tops = [...art.el.querySelectorAll('.run > .sp, .run > .withheld')].map((e) => e.getBoundingClientRect().top - origin);
  const at = pane.scrollTop;
  const next = dir > 0 ? tops.find((y) => y > at + 1) : tops.slice().reverse().find((y) => y < at - 1);
  if (next == null) return dir > 0 ? pane.scrollHeight : 0;
  return Math.max(0, Math.round(next));
}

/** a pane's own key now (K-60): ↓/↑ by block — the next block's top brought to the pane's top — PageDown/PageUp by most of the pane, Home/End to its ends */
function move(/** @type {HTMLElement} */ pane, /** @type {string} */ k) {
  const step = pane.clientHeight * 0.8;
  if (k === 'PageDown') pane.scrollTop += step; else if (k === 'PageUp') pane.scrollTop -= step;
  else if (k === '↓' || k === '↑') { const top = blockTop(pane, k === '↓' ? 1 : -1); if (top == null) return false; pane.scrollTop = top; }
  else if (k === 'Home') pane.scrollTop = 0; else if (k === 'End') pane.scrollTop = pane.scrollHeight;
  else return false;
  draw(); return true;
}

/**
 * The scene's own keys: a pane's (K-60) move the pane the focus stands in —
 * pane A where it stands in neither — and Enter at a pane's corner takes the
 * corner's act (`act`; D5 K-57, as the plane's corner); each waits for a pane
 * being set again (`whenSet`), the key taken meanwhile. False for any other
 * key, and for Enter at a corner that offers no act.
 * @param {string} k the chord (N-KEYS's `chordOf`)
 * @returns {boolean} the scene took the key
 */
export function key(k) {
  const S = scene, E = els;
  if (!S || !E) return false;
  const at = typeof document !== 'undefined' ? /** @type {HTMLElement | null} */ (document.activeElement) : null;
  const pane = at && E.paneB.contains(at) ? E.paneB : E.paneA, side = pane === E.paneB ? 'b' : 'a';
  if (k === 'Enter') {
    const onCorner = !!at && !!at.classList && at.classList.contains('corner') && pane.contains(at);
    if (!onCorner || S[side].read == null) return false;
    act(side);
    return true;
  }
  if (!MOVES.includes(k)) return false;
  if (!S.updating) return move(pane, k);
  S.waiting.push(() => move(pane, k));
  return true;
}
