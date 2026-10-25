// SC — the reading scene (the structure record §3.2; B1-S9; foundations
// §2.5; law 12). Layer 2. ENGINE-BOUND. State (FP-10): the pair, the two
// ends it sets level, whether the far end names pane B's document whole, the
// bands' and lines' ends and the passages shared with the near one as
// measured in the panes, the stop's next passage and whether its appearance
// was said, the panes' scrolls, each pane's text — the record it was made
// from, the version it reads and the address it names, the links and far
// ends it was set with — the settings reading and the acts waiting on them,
// the element it was opened from, and its own end, the app's to hand in;
// view state, never written (FP-7).
// Two documents at reading scale side by side over the plane, each pane
// scrolling on its own (R3); the places unmoved, nothing written; the dialog
// named as it attaches by ST's `L.scene-label`. It sets the two ends level
// (§2.5): the passage the opener holds — a link's span, a selection, the
// versions list's held passage, provenance's span — at its first stretch of
// shared identity, and its counterpart in the other document, or the far end
// a link names (`levels`); each pane's matched line brought to one height,
// LEVEL_AT px below the panes' tops or higher where one stands above it,
// and each article given a pane's height of room below its end so a passage
// near the end can be brought there too (`level`); the re-level act (K-62)
// restores that. Where the far end of the link it is opened from names pane
// B's document whole (`Held.wholeB`), nothing of that document is set level
// with the near passage: pane B opens at its start, where its follow lands,
// the near passage set as for any link, and the re-level returns both there
// (FP-30).
// Between the panes links are drawn as lines from the set LK gave at either
// pane's document as the pane was set (§2.5; `linesBetween`), each link once
// per pair of its ends (P44), each end where the link's bytes stood in its
// pane's text as the pane was set — the near end at the stretch LK placed it
// in, the far end where `project` answered its passage sits in the pane's
// own text, whichever version of the far document's box the pane holds and
// whatever version the plane's box shows (`farEndIn`; FP-22), whose reads
// each setting of a pane asks for the links that cross between the panes
// (`unplaced`), a far end that floats at its pane's head, where its follow
// lands, and never at the position the link stores — each end in the mark
// its pane's document gives the link, the one the link's symbol takes in
// that pane (FP-30), inked as BM inks a beam's ends, and where the two
// differ the line changing colour once, at the middle of the gap
// (`drawTie`), so opening the scene never recolours the link it opened on —
// and shared identity as bands from `compare`'s pairs, each run of
// contiguous pairs one band (`merged`). Each tie leaves its pane at its
// passage's first line — measured through T-LAYER's byte-span mapping over
// the pane's article and the blocks it was made from when the scene is set
// level, a pane is set again or the panes change size (`measure`), and moved
// with each pane's scroll (`draw`) — and one whose end has left its pane is
// clipped at the pane's edge with the stub's triangle, in that end's hue.
// A far end naming its pane's document whole, in either pane, is that whole
// document (FP-30): it stands at no line, its line meeting the pane's facing
// edge level with the line's other end, held inside the pane's visible
// height, and that edge drawn whole, from the pane's visible top to its
// bottom, in the end's ink — in the one mark the ends meeting it merge into
// where several do (`wholeEdges`, `drawEdge`; LK's `mergedMark`).
// Every tie is measured from what its panes were set with, never the
// model's now: a read that drops a pane's document moves no tie off its text.
// A pane is kept fresh by its kind (FP-23): each feed row M-PUMP takes
// reaches the panes after it drops what it named (`dropped`, its `onDrop`),
// a pane reached where the row named its document's box, and none offers a
// reload. A draft — any text no publication fixes — is read again whole and
// set in its place, the first span in view holding still and the platform's
// selection put back on the same words. An edition read at its bare address
// keeps the version it opened on: its acts name the member its text is
// (`D.k`, the chain probed as it opens), and a row naming a newer member —
// by the documents it names or the home of the link it deposited
// (`newest`), whatever its op — pins it at once to `D.k`, or to the member
// before the one named where its chain was not known as it opened: its head,
// the bar and its corner naming the member, never the latest, the arrival
// said once, politely, in the status region (N-FOCUS's `say`), the corner
// offering the newest (`pin`) — then `D.k` is read whole and the pane set
// again, its marks and lines with it; where no member held its text before,
// it is read again in place. A pane on a version only counts the chain again
// (`count`), save where a row names its own address, which reads it again.
// A refresh (M-PUMP's, after rows naming nothing) reaches every pane once
// the model's documents are set again (`refreshed`): an edition at its bare
// address whose chain the refresh counted past the member its text is
// pinned at once from what it kept, one whose member is not known left as it
// shows, and every other pane read again in its place, a version's count
// taken first. The corner's act (`act`) reads the version it offers in that
// pane's place: the selection, else the first span in view, carried into it
// by `compare` and kept on its line (`carryInto`, `carriedTo`), the corner
// saying so where the version lacks it, and the version left one act away —
// the pane's own state, never a box's: N-GO's pins are never touched
// (FP-22). The page's own death reaches every pane at once, as does every
// other change of its class (M-PUMP's `classChanged`): each is taken down to
// what the drop left of its record — nothing of the session's text or links,
// the ties with them — and read again at the class the page reads at then,
// a document withheld from a guest standing as its head alone; a pane on a
// covered draft stays open (FP-29), its head's withheld statement its cover,
// the bands of shared identity gone with its text, and every line homed in
// the readable pane whose far end lies in it ending at the cover
// (`farEndIn`, `coverIn`), clipped and stubbed as any end whose line has
// left its pane.
// Every setting is one step (`setPanes`; FP-23): the reads first — the text
// whole, the two texts' `compare`, where each far end crossing between them
// stands (`readPane`, `readBetween`) — then, where the scene still stands
// and no later setting was asked of the pane, with nothing awaited: the new
// article made and swapped in, the reader's place, the selection and the
// ends set level carried by their bytes' identity through the images the two
// articles were made from, the ties measured anew and drawn. While a pane is
// being set again its own keys, the re-level and the corner's act wait for
// it (`whenSet`); ending the scene never waits, so a board that does not
// answer holds no scene open, and a pane whose read the board did not answer
// keeps what it shows.
// It opens through O-HOST's `opening` on its reads, both documents whole and
// their `compare` (`open`): an act that ends the opening while they read
// leaves their answer opening nothing, and no `compare` is asked after it;
// as it shows, the act that asked for it ends the chrome of the place it
// leaves (`Showing`'s `leaving`), and it answers whether it showed and the
// refusal its reads met where it did not (`Opening`). Where the far end names
// pane B's document whole, the opening waits on no `compare`: the scene shows
// on the two texts and where the far ends crossing between them stand, the
// `compare` asked as it shows, and its answer, where the scene stands and
// neither pane was set again meanwhile, adds the bands and says a refusal in
// the bar and the status region — moving no pane and no focus, and holding
// no act (`addBands`). The scene is a step on
// the trail, which N-GO keeps (`toScene`, `closeScene`): its own end —
// zoom-out, Esc, ←, the bar's × — is a Back from its entry, the bar's handed
// in by the app (`attach`), and `close` ends it as a navigation act's
// departure does, leaving the plane as it was: the scene never moves the
// camera. As the reader leaves its entry, N-GO records the scene as they
// left it (`asLeft`): each pane's version; where the reader stood in it, its
// selection and the end set level in it, each by its bytes' identity
// through the image its article was made from, never a scroll offset; and
// the stop the platform's focus stood on. A cursor move back onto the entry
// reopens it so (`reopen`): each pane's record read again — an edition read
// at its bare address whose chain went past the member its text was, pinned
// to that member (FP-23) — the two ends set level, each pane whose text
// holds its place's bytes brought back to them, any other left where the
// re-level set it, its selection put back on the same bytes, the focus on
// the stop it stood on and the pair named in the status region.
// The focus (D5 §4 rules 5 and 8; K-61, K-63; the focus record's rule 17;
// FP-20): shown, the scene puts the focus in the far end's pane — reopened,
// on the stop it stood on — and takes the plane it stands over out of the
// page's order and the accessibility tree, each region by its owner
// (`coverPlane`: N-WALK's and T-LAYER's `cover`); the one line is never
// covered, and the LEAP box stands over the scene. Whatever ends it puts the
// plane back first — the element the scene was opened from takes no focus
// while covered — and hands the focus back through N-FOCUS's `close`; the
// opener is read as the scene shows, after the chrome it leaves is ended
// (`from`).
// Each pane is a named region (SC9), named by its own document's address,
// the head of the article it holds (`namePane`) — pane B, where the far end
// names its document whole, by that address and ST's `L.scene.whole-end`
// after it, `aria-current="location"` on it, the end being the document and
// no passage of it — and ↓ and ↑ in it move by
// block — the next block's top brought to the pane's top (K-60) — PageDown
// and PageUp by most of a pane, Home and End to its ends (`move`).
// Where the far end names pane B's document whole and the `compare` finds the
// near passage there, the passages of pane B holding its material
// (`counterparts`), in pane B's order, are reached by the stop (`#scenestop`;
// FP-20): a native button at pane B's facing edge, over the stub's triangle
// where the band to the next of them out of view is clipped, on its bearing —
// the first in pane B's order, then the one after the last it went to, round
// again (`stopFor`) — its count shown where they are two or more, named by
// ST's `L.scene.shared` words, its appearance said once, politely, in the
// status region (FP-28), and hidden while every one is in view. Its act
// (`toShared`) scrolls pane B alone, the passage's first line level with the
// near passage's where that line is in view, else LEVEL_AT px below the
// pane's top; a stop that leaves while it holds the focus hands it to pane B,
// and the re-level starts it at the first again. It is one of the scene's
// stops after pane A's corner and before pane B, and its keys are a button's
// own, as the bar's acts' are. The panes
// borrow T-LAYER's mount (FP-12; the structure record §3.4 (vii)):
// `sceneArticle` makes each pane's article from the record and the view the
// scene keeps, `madeOf` and `rangeIn` map a position through the blocks it
// was made from, `selectionIn` and `selectIn` read and set the selection,
// and T-LAYER's copy event serves the panes (FP-24); the scene keeps no DOM
// text of its own. Each pane carries its own document's corner (ux-T2;
// T-LAYER's `sceneCorner` makes its items) on its outer side — pane A's left,
// pane B's right — held to the top of the pane's scroll, so the bands and
// lines leave the inner edges clear of it (foundations §3.1); the corner is
// the pane's one Tab stop after the pane itself, a group named by its own
// words (D5 K-57), and its Enter, or a click on the act, takes its act — a
// press on the act leaving the selection standing in the pane, the passage
// the act carries. Each pane's text is one column at the plane's measure
// (FP-12): the style's `--measure` advances of its face, both panes at one
// size — the reading size (P-CAM's), smaller only where a pane's column is
// wider than its room beside its corner, then at the size the narrower room
// holds (`fitMeasure`) — so the panes break the lines the plane breaks;
// against the pane's inner edge with its corner beside it, its column's edge
// between it and that inner edge — its counts and its withheld runs' marks
// there, the bands leaving the pane beyond them (foundations §3.1; FP-26): a
// window wider than the measure needs widens the outer margins, never the
// line. The panes are read, not acted on (B1-S9): nothing in a pane's
// article is a control (T-ARTICLE's scene-mode variant), and the keys a pane
// takes move that pane alone (`key`). The bar names each pane by the address
// it shows, in the identifier's face (P-REG's FACE). The scene's acts are its bar's
// buttons — re-level (K-62, its chord drawn for the platform, rule 19) and
// the dismissal, the scene's own end — each pressed by a click anywhere on
// it, by Enter or by Space, and a pane's corner's act.
// A face that arrives once the panes are set refits them and measures their
// ties again (`refaced`).
// Figures: the ends level LEVEL_AT px below the panes' tops; MAX_BANDS bands drawn at
// most; a band 6 px wide at 0.7 alpha, a line 1.6 px at the link's value; a
// stub's triangle 8 by 4 px, 6 px inside the pane's edge; a whole document's
// edge EDGE_W px wide, in the gap against the pane, at its mark's value; the
// stop 16 px tall over the stub's triangle, its count before it.
// Rules: FP-1, FP-2, FP-7, FP-10, FP-12, FP-13, FP-20, FP-22, FP-23, FP-24,
// FP-28, FP-29, FP-30, FP-34.

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
import { markDirty, READING_PX } from '../plane/camera.js';
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
/** @typedef {import('../plane/register.js').Mark} Mark */
/** @typedef {import('../text/article.js').ArticleView} ArticleView */
/** @typedef {import('../bridge/shapes').FeedUpdate} FeedUpdate */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */

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
 * @property {boolean} [wholeB] the far end of the link the scene is opened from names the second document whole: nothing of it is set level with the passage held, and pane B opens at its start (see the head)
 */

/**
 * @typedef {Object} End — one end of a band or a line: its passage, and where the passage's first line stands in its pane's scrolled content
 * @property {number} pos the passage's first position
 * @property {number} width its positions
 * @property {number} y the first line's middle, px below the pane's content top — at a cover, its head's withheld statement's; at a whole document, 0, the end standing at no line
 * @property {boolean} [cover] it ends at its pane's cover (`Passage`)
 * @property {boolean} [whole] it is its pane's document whole (`Passage`)
 */

/**
 * @typedef {Object} Shared — a passage of pane B's document holding the material of the passage held in pane A (`counterparts`), as measured in pane B
 * @property {number} pos its first position in pane B's document
 * @property {number} width its positions
 * @property {number} top its first line's top, px below pane B's content top
 * @property {number} y that line's middle
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
 * @property {{pos: number, width: number, x: number, y: number, clipped: boolean, cover: boolean, whole: boolean}} a
 * @property {{pos: number, width: number, x: number, y: number, clipped: boolean, cover: boolean, whole: boolean}} b
 */

/**
 * @typedef {Object} Edge — a pane's facing edge as the last draw drew it, the whole-document ends meeting it, on screen
 * @property {'a' | 'b'} side the pane
 * @property {string[]} links the links whose ends it is
 * @property {number} x where it is drawn, the middle of its stroke
 * @property {number} top the pane's visible top, where it begins
 * @property {number} bottom the pane's visible bottom, where it ends
 * @property {string} hue its ink's hue: the mark its links merge into
 * @property {boolean} dashed its ink is dashed — every one of its links another's there
 */

/**
 * @typedef {Object} PaneLinks — what a pane gives the lines between the panes: what it was set with, never the model's now
 * @property {string} addr the record its text was made from
 * @property {Shown[]} shown the links LK showed at that record as the pane was set (`LK.shown`)
 * @property {Block[]} blocks the blocks its article was made from, where a far end that floats stands
 * @property {Map<string, Stretch[] | Declined>} [placed] where the far ends of the links crossing into it stood in its text as the pane was set (`project`'s answers), by `⟨link⟩ ⟨slot⟩`
 * @property {boolean} [cover] it shows a cover: its record a read answered `withheld` as it was set — a covered draft's pane its head alone (FP-29) — where every far end crossing into it ends
 */

/** @typedef {{pos: number, width: number, cover?: boolean, whole?: boolean}} Passage one end of a line between the panes, as a passage of its pane's document: its first position and its positions; `cover` where it ends at its pane's cover, its head's withheld statement, which holds no position; `whole` where it is its pane's document whole, standing at no position of it */

/**
 * @typedef {Object} Line — a link's line between the panes, its ends as passages, before they are measured
 * @property {string} link the link's address
 * @property {Passage} a its end in pane A's document
 * @property {Passage} b its end in pane B's document
 * @property {{a: Ink, b: Ink}} ink each end's: the mark its pane's document gives the link, as a stroke takes it (BM's `inkOf`)
 * @property {{a: Mark, b: Mark}} marks each end's mark, its pane's document's (`LK.markOf`): what a whole document's edge merges (`wholeEdges`)
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
 * @property {boolean} whole the far end of the link it was opened from names pane B's document whole (`Held.wholeB`)
 * @property {number} widthA the positions of the passage held in pane A, from `level.a`: the near passage, whose material the stop finds in pane B
 * @property {Array<Tie & {ink: {a: Ink, b: Ink}, value: number, marks?: {a: Mark, b: Mark}}>} ties
 * @property {Shared[]} shared where the scene is whole, the passages of pane B holding the near passage's material, in pane B's order, as measured; none elsewhere
 * @property {number} next the shared passage the stop's next act goes to first, an index into `shared`
 * @property {number | null} at the shared passage the stop stands for as the last draw placed it, an index into `shared`; null where it stands hidden
 * @property {boolean} told the stop's appearance was said in the status region
 * @property {string} size the panes' sizes the ties were measured at
 * @property {number} updating the settings reading
 * @property {Array<() => void>} waiting the acts made while one reads, in the order made (`whenSet`)
 */

/**
 * @typedef {Object} Opening — what an opening of the scene came to (`open`, `reopen`)
 * @property {boolean} shown the scene shows
 * @property {Refusal | null} refused where it does not, the refusal a read it needed met; null where none did — an act made on the chrome while it read ended it
 */

/**
 * @typedef {Object} Showing — what the act that opens the scene hands it (`open`, `reopen`)
 * @property {() => void} [leaving] run as the scene shows, before anything of it is set: the chrome of the place it leaves ended (N-GO's)
 */

/** @typedef {Pick<Pane, 'doc' | 'src' | 'names' | 'shows' | 'kind' | 'k' | 'n' | 'read'>} Version a pane's text as the reader left it (`Left`): the record it was made from and the addresses it names and shows, as the pane holds them */

/**
 * @typedef {Object} Spot — where the reader stood in a pane as they left it (`Left`), each by its bytes' identity
 * @property {Place | null} place the passage first in view and how far below the pane's visible top its line stood; null where the pane held no line in view
 * @property {{ids: ISpan[], backward: boolean} | null} sel the platform's selection in the pane, and whether it ran backward; null where none stood there
 * @property {{pos: number, ids: ISpan[]} | null} level the end set level in the pane; null where the pane stood at its top
 * @property {number | null} lacks what the pane's corner said the version it read lacks (`Pane.lacks`)
 */

/** @typedef {'a' | 'b' | 'a:corner' | 'b:corner' | 'relevel' | 'x'} Stop a stop of the scene's the platform's focus stands on: a pane, a pane's corner, or one of the bar's acts */

/**
 * @typedef {Object} Left — the scene as the reader left it (`asLeft`; see the head): what its trail entry records, by value, and what reopens it (`reopen`)
 * @property {{a: Version, b: Version}} panes each pane's text
 * @property {{a: Spot, b: Spot} | null} spots where the reader stood in each pane; null where none is kept — a change of the page's class drops them (N-TRAIL's)
 * @property {Stop | null} stop the stop the platform's focus stood on; null where it stood outside the scene
 */

/** how far below the panes' tops the two ends are set level (px), where both can stand there */
const LEVEL_AT = 40;
/** the bands drawn at most */
const MAX_BANDS = 400;
/** @type {Ink} a band's ink at both its ends: sameness's boundary, never a linker's hue (P-REG) */
const BAND_INK = { hue: SAMENESS.boundary, dash: [] };
/** the keys a pane takes, moving it alone (K-60) */
const MOVES = ['PageDown', 'PageUp', '↓', '↑', 'Home', 'End'];
const SIDES = /** @type {const} */ (['a', 'b']);
/** a whole document's edge's stroke (px) */
const EDGE_W = 3;
/** the id of the bar's hidden words that pane B's name ends with where the far end names its document whole (`namePane`) */
const WHOLE_ID = 'sceneB-whole';

/** @type {Scene | null} */
let scene = null;
/** @type {{root: HTMLElement, bar: HTMLElement, paneA: HTMLElement, paneB: HTMLElement, canvas: HTMLCanvasElement, stop: HTMLButtonElement} | null} */
let els = null;
/** @type {Drawn[]} what the last draw drew */
let drawnTies = [];
/** @type {Edge[]} the facing edges the last draw drew */
let drawnEdges = [];
/** the scene's own end — a Back from its entry, the app's to hand in (`attach`); until it does, the scene ended where it stands */
let ending = (/** @type {boolean} */ _byKey) => close();

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
 * article it holds (SC9; the focus record's D5) — and, where it is the whole
 * document a link's far end names, by that address and the bar's hidden
 * words saying so after it (`WHOLE_ID`), `aria-current="location"` on it;
 * neither on any other pane, whatever the scene it stood in before.
 * @param {HTMLElement} pane
 * @param {string} id the id the head's address takes, for the reference
 * @param {boolean} [whole] the pane is the whole document a link's far end names
 */
function namePane(pane, id, whole = false) {
  pane.setAttribute('role', 'region');
  const addr = /** @type {HTMLElement | null} */ (pane.querySelector('.hd .addr'));
  if (addr) { addr.id = id; pane.setAttribute('aria-labelledby', whole ? `${id} ${WHOLE_ID}` : id); }
  if (whole) pane.setAttribute('aria-current', 'location'); else pane.removeAttribute('aria-current');
}

/** both panes named (`namePane`), pane B as the whole document where the scene's far end names it so */
function namePanes(/** @type {NonNullable<typeof els>} */ E, /** @type {Scene} */ S) {
  namePane(E.paneA, 'sceneA-name');
  namePane(E.paneB, 'sceneB-name', S.whole);
}

/**
 * Attach the scene's elements, and the act its own end runs (see the head):
 * the bar's ×, told whether a key pressed it by the focus owner's one
 * reading (FP-20); the stop's act (`toShared`).
 * @param {{root: HTMLElement, bar: HTMLElement, paneA: HTMLElement, paneB: HTMLElement, canvas: HTMLCanvasElement, stop: HTMLButtonElement}} e
 * @param {{end?: (byKey: boolean) => void}} [acts] `end` the scene's own end: N-GO's `closeScene`, as Esc, zoom-out and ← take it
 */
export function attach(e, acts = {}) {
  els = e;
  if (acts.end) ending = acts.end;
  e.root.setAttribute('aria-label', t('L.scene-label'));
  e.stop.addEventListener('click', () => toShared());
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
  e.bar.addEventListener('click', (ev) => { const tg = /** @type {HTMLElement} */ (ev.target); if (tg.closest('[data-x]')) ending(FOCUS.byKey(ev)); else if (tg.closest('[data-relevel]')) relevel(); });
}
export const isOpen = () => scene !== null;
/** the addresses the two panes' acts name and their positions are measured against (`Pane.names`) */
export const pair = () => (scene ? { a: scene.a.names, b: scene.b.names } : null);
/** the scene's runs of shared identity and the two ends it sets level, read-only (the gate reads them) */
export const pairs = () => (scene ? { pairs: scene.pairs.map((p) => ({ ...p })), level: { ...scene.level } } : null);
/** the bands and lines the last draw drew, their ends on screen (the gate holds each to its passage's line) */
export const ties = () => drawnTies.map((d) => ({ ...d, a: { ...d.a }, b: { ...d.b } }));
/** the facing edges the last draw drew for the whole-document ends meeting them, on screen (the gate holds each to its pane's visible height) */
export const edges = () => drawnEdges.map((e) => ({ ...e, links: [...e.links] }));
/**
 * The stop as the last draw placed it (the gate reads it): whether it stands,
 * the shared passages it reaches, the one it stands for and the one its next
 * act goes to first, its name and the count it shows, and its rect on screen;
 * null where the scene does not stand.
 */
export function stop() {
  const S = scene, E = els;
  if (!S || !E) return null;
  const r = E.stop.getBoundingClientRect(), at = S.at != null ? S.shared[S.at] : null;
  return {
    shown: !E.stop.hidden, shared: S.shared.map((p) => ({ pos: p.pos, width: p.width })), at: at ? { pos: at.pos, width: at.width } : null, next: S.next,
    name: E.stop.getAttribute('aria-label'), count: E.stop.textContent || '', rect: { x: r.left, y: r.top, w: r.width, h: r.height },
  };
}
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
 * documents — one pair, in the first document's order (§2.5).
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
 * at a landing as, every one marked there (N-GO; foundations §2.3; P43).
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
 * second holds none of (FP-22): of the stretches of shared identity
 * (`merged`), the last
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
 * The two ends the scene sets level (§2.5): where the far end of the link the
 * scene is opened from names the second document whole (`wholeB`), the held
 * position and the second at its top, whatever the two share (FP-30); where
 * the opener names a position in the second document — a link's far
 * end — the held position and that one; else the passage held set level with
 * its `counterpart`, the second at its top where the held passage shares
 * none; with nothing held, the first pair's two ends.
 * @param {ComparePair[]} runs `compare`'s pairs, `u1` in the first document
 * @param {Held} [held]
 * @returns {Level}
 */
export function levels(runs, held = {}) {
  const posA = held.posA ?? null;
  if (held.wholeB) return { a: posA, b: null };
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
 * (`farAt`; FP-22), whatever version of the box the plane shows; where it
 * floats — the pane's text holding none of it, where its follow lands at the
 * head — the pane's first block to the block's end; at a pane that shows a
 * cover, at the cover, its head's withheld statement (FP-29); where it names
 * the document whole, the whole document, at no position of it (FP-30); null
 * where nothing places it, its projection not read or refused.
 * @param {Shown} s the link as LK showed it at the other pane's document
 * @param {PaneLinks} pane the pane its far end is sought in
 * @returns {{key: string} & Passage | null}
 */
function farEndIn(s, pane) {
  if (!s.farEnd) return null;
  const key = LK.endKey(s.farEnd), blocks = pane.blocks;
  if (pane.cover) return { key, pos: 0, width: 0, cover: true };
  if (s.farWhole) return { key, pos: 0, width: 0, whole: true };
  const held = pane.placed ? pane.placed.get(s.link.addr + ' ' + s.farSlot) : undefined;
  const runs = Array.isArray(held) ? held : (s.farAt || s.far) === pane.addr ? s.farRuns : null;
  if (runs && !runs.length) { const pos = (blocks[0] || { pos: 1 }).pos; return { key, pos, width: restIn(blocks, pos) }; }
  const r = runs && runs[0];
  return r ? { key, pos: r.pos, width: r.width } : null;
}

/** an end of a line as a passage alone (`Passage`): its first position, its positions, and whether it ends at its pane's cover or is its pane's document whole */
const passage = (/** @type {Passage} */ e) => (e.cover ? { pos: e.pos, width: e.width, cover: true } : e.whole ? { pos: e.pos, width: e.width, whole: true } : { pos: e.pos, width: e.width });

/**
 * The links drawn as lines between the panes (§2.5): every end LK showed at
 * either pane's document as it was set whose far end names the other's box —
 * that document, or another version sharing its box (`oneBox`) — each
 * resolved to its end in pane A and its end in pane B — the near end at the
 * first stretch LK placed it in, the far end where `farEndIn` places it, at
 * the cover where its pane shows one, the whole document where it names it
 * so, none where nothing does — and each
 * link once per pair of ends, in the order met, pane A's ends first. A link
 * both panes show
 * is met from each; a document in both panes meets a link inside it from each
 * end in each pane, and draws it once for each way its two ends stand across
 * the panes. Ends are told apart by their pane and the span the link stores
 * for them (LK's `endKey`), never by their document alone, which would fold
 * those two ways into one line and leave the pair the scene sets level
 * without the line that confirms it, and never by where they stand now, which
 * the two panes read from two answers.
 * Each end of a line is drawn in the mark its pane's document gives the link
 * — the one the link's symbol takes in that pane (`LK.markOf` at that
 * document; FP-30): its hue there, dashed only for another's, as BM inks a
 * beam's ends (`inkOf`), whichever pane meets it, so opening the scene never
 * recolours the link it opened on — the mark itself kept beside its ink, for
 * a whole document's edge merges its ends' marks (`wholeEdges`); its value
 * the link's own (P44).
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
      met.set(key, { link: s.link.addr, a: passage(a), b: passage(b), ink: { a: inkOf(atA), b: inkOf(atB) }, marks: { a: atA, b: atB }, value: atA.value });
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
 * `wholeOf`), its owner's byline facts (M-PUMP's `readAccount`; FP-34), so the
 * byline the pane is set with shows them, or why it can show none, never an
 * empty box a pane set from its kept view would show again; and the chain's
 * count where the board ended the chain there —
 * held, or, at an edition at its bare address, read to its end (`probeChain`):
 * the member its text is, which its acts name. A count the board did not end
 * the chain at is no count: the head is not known there. `d` null where the
 * board did not answer, which leaves a pane as it shows; `whole` false where
 * the board refused the text for what it says of the document — withheld
 * from the reader, or nothing it will say of the address — the record then
 * standing as that refusal (a pane read again at the death, or reopened; a
 * scene opens on two texts read whole alone); `refused` the refusal the
 * whole read met, none where it met none.
 * @param {string} src
 * @param {() => boolean} [stands] the opening the read is made for still stands: a probe asks no more once it ends
 * @returns {Promise<{d: Doc | null, n: number | null, whole: boolean, refused: Refusal | null}>}
 */
async function readPane(src, stands = () => true) {
  const w = await PUMP.wholeOf(src);
  if (!w.doc && !REC.doc(src).refused) return { d: null, n: null, whole: false, refused: w.refused };
  await PUMP.readAccount(REC.ownerAccount(REC.doc(src)));
  const box = REC.has(boxOf(src)) ? REC.doc(boxOf(src)) : null;
  let n = box && box.ended ? box.members : null;
  if (w.doc && kindAt(src, w.doc) === 'bare' && n == null && stands()) { const p = await PUMP.probeChain(src, stands); n = p && p.ended ? p.n : null; }
  return { d: REC.doc(src), n, whole: !!w.doc, refused: w.refused };
}

/** @typedef {{pairs: ComparePair[], refused: string | null}} Compared the runs of shared identity between the panes (`merged`), and the refusal their `compare` met by its name, which the bar says */

/**
 * The two texts' `compare` whole (see the head): the runs of shared identity,
 * none where either holds no text, and the refusal it met by its name.
 * @param {Pick<Text, 'src' | 'd'>} A
 * @param {Pick<Text, 'src' | 'd'>} B
 * @returns {Promise<Compared>}
 */
async function compareBetween(A, B) {
  const holds = (/** @type {Doc} */ d) => !d.refused && d.extent != null;
  const whole = (/** @type {Pick<Text, 'src' | 'd'>} */ x) => [{ doc: x.src, spans: [{ ordinal: 1, positions: Math.max(1, x.d.extent || 1) }] }];
  if (!holds(A.d) || !holds(B.d)) return { pairs: [], refused: null };
  const cmp = await PUMP.read(F.compare(whole(A), whole(B)));
  if ('refused' in cmp) return { pairs: [], refused: cmp.refused.name };
  return { pairs: merged(F.decodeCompare(cmp.answer)), refused: null };
}

/** where each far end crossing between the panes stands, read (`unplaced`, M-PUMP's `projectEnd`) */
const placeBetween = (/** @type {Text} */ A, /** @type {Text} */ B) => Promise.all(unplaced(A, B).map((p) => PUMP.projectEnd(p.link, p.slot, p.far)));

/**
 * The reads between the panes, made before they are set (see the head): the
 * two texts' `compare` (`compareBetween`) and where each far end crossing
 * between them stands (`placeBetween`), side by side; the `compare` left out,
 * no runs and no refusal, where the far end names pane B's document whole and
 * the scene opens on these reads (`open`, `reopen`).
 * @param {Text} A
 * @param {Text} B
 * @param {boolean} [compare] the `compare` is read with them
 * @returns {Promise<Compared>}
 */
async function readBetween(A, B, compare = true) {
  const [cmp] = await Promise.all([compare ? compareBetween(A, B) : Promise.resolve({ pairs: [], refused: null }), placeBetween(A, B)]);
  return cmp;
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
 * Open the scene on two documents (see the head), once its reads answer
 * where no act was made on the chrome meanwhile (O-HOST's opening) — both
 * documents whole, the chain of each edition read at its bare address, their
 * `compare`, and where the far end of each link crossing between them stands
 * now (`readBetween`) — the passage held set level with its counterpart
 * (`levels`); as it shows, the act's `leaving` first, then the focus in the
 * far end's pane, the plane under the scene out of the page's order. Where
 * the far end names the second document whole (`Held.wholeB`), no `compare`
 * is waited on: it is asked as the scene shows, and adds the bands as it
 * answers (`addBands`).
 * @param {string} a
 * @param {string} b
 * @param {Held} [held]
 * @param {Showing} [as]
 * @returns {Promise<Opening>} once the scene shows, or nothing will
 */
export async function open(a, b, held = {}, as = {}) {
  /** @type {Opening} */
  const out = { shown: false, refused: null };
  if (!els) return out;
  await HOST.opening(async (stands) => {
    const [ra, rb] = await Promise.all([readPane(a, stands), readPane(b, stands)]);
    const da = ra.d, db = rb.d;
    if (!da || !db || !ra.whole || !rb.whole) { if (stands()) out.refused = (!da || !ra.whole ? ra.refused : null) || rb.refused; return null; }
    if (!stands()) return null;
    const between = await readBetween({ src: a, d: da, shown: LK.shown(a) }, { src: b, d: db, shown: LK.shown(b) }, !held.wholeB);
    return { pa: paneAt('a', a, { d: da, n: ra.n }), pb: paneAt('b', b, { d: db, n: rb.n }), between };
  }, ({ pa, pb, between }) => {
    const E = els;
    if (!E) return;
    if (as.leaving) as.leaving();
    // where the focus stands as the scene shows — the chrome it leaves ended, which hands back a focus an overlay held; a
    // scene shown over one standing keeps that one's (the controller's one memory)
    const from = document.activeElement;
    const S = sceneOf(pa, pb, between.pairs, held);
    stand(E, S, between.refused);
    relevel();
    FOCUS.open('scene', { el: E.root, from, byKey: true, first: E.paneB });
    out.shown = true;
    markDirty();
    if (S.whole) void addBands(S);
  });
  return out;
}

/**
 * A scene on two panes as it opens (`open`, `reopen`): the ends `levels`
 * sets from the runs and the passage held, whether the far end names pane B's
 * document whole, the near passage's positions, and the stop at its first
 * passage, none measured yet.
 * @param {Pane} pa
 * @param {Pane} pb
 * @param {ComparePair[]} pairs
 * @param {Held} held
 * @returns {Scene}
 */
const sceneOf = (pa, pb, pairs, held) => ({
  a: pa, b: pb, pairs, level: levels(pairs, held), whole: !!held.wholeB, widthA: Math.max(1, held.widthA ?? 1),
  ties: [], shared: [], next: 0, at: null, told: false, size: '', updating: 0, waiting: [],
});

/**
 * The bands a whole-document opening shows without (see the head): the two
 * texts' `compare`, asked as the scene shows; its answer, where the scene
 * still stands and neither pane was set again meanwhile — a setting reads its
 * own — taken: the runs of shared identity measured and drawn, the passages
 * the stop reaches with them, and a refusal said (`sayFace`); no pane
 * scrolled, no focus moved, and no act held waiting on it.
 * @param {Scene} S
 * @returns {Promise<void>}
 */
async function addBands(S) {
  const sets = [S.a.sets, S.b.sets];
  const got = await compareBetween(S.a, S.b);
  const E = els;
  if (scene !== S || !E || S.a.sets !== sets[0] || S.b.sets !== sets[1]) return;
  S.pairs = got.pairs;
  if (got.refused) sayFace(E, got.refused);
  measure();
  draw();
}

/** the bar's words for the refusal the panes' `compare` met, by its name */
const faceWords = (/** @type {string} */ face) => t(face === 'too_many_pairs' ? 'B1.too_many_pairs' : face === 'too_many_blocks' ? 'B1.too_many_blocks' : 'L.refused', { name: face });

/**
 * A refusal the `compare` met after the scene showed (`addBands`), said where
 * the bar says one, before its acts — which stand as they are, so a focus on
 * one stays — and in the status region, for it changed away from the focus
 * without the reader's act (FP-28).
 * @param {NonNullable<typeof els>} E
 * @param {string} face the refusal, by its name
 */
function sayFace(E, face) {
  const words = faceWords(face), acts = E.bar.querySelector('[data-relevel]');
  E.bar.dataset.face = face;
  if (acts) acts.insertAdjacentHTML('beforebegin', `<span class="face-text">${esc(words)}</span> `);
  FOCUS.say(words);
}

/**
 * The scene stood over the plane (`open`, `reopen`): the plane under it out
 * of the page's order; the bar naming each pane by the address it shows, and
 * the refusal the panes' `compare` met — and, where pane B is the whole
 * document a link's far end names, the hidden words pane B's name ends with
 * (`namePane`); each pane's article T-LAYER's mount, its corner on the pane's
 * outer side — pane A's before the article, pane B's after — and the panes
 * fitted to the measure.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {string | null} face the refusal the `compare` met, by its name
 */
function stand(E, S, face) {
  scene = S;
  S.a.placed = placedInto(S.a.src, [...S.b.view.marks, ...S.a.view.marks]);
  S.b.placed = placedInto(S.b.src, [...S.a.view.marks, ...S.b.view.marks]);
  coverPlane(true);
  E.root.classList.add('on');
  if (face) E.bar.dataset.face = face; else delete E.bar.dataset.face;
  E.bar.innerHTML = `<b class="id" data-name="a">${esc(S.a.shows)}</b> │ <b class="id" data-name="b">${esc(S.b.shows)}</b> <span class="dim">${esc(t('F.scene.sameness'))} · ${esc(t('F.scene.link'))}</span>` +
    (face ? ` <span class="face-text">${esc(faceWords(face))}</span>` : '') +
    (S.whole ? `<span id="${WHOLE_ID}" data-string="L.scene.whole-end" hidden>${esc(t('L.scene.whole-end'))}</span>` : '') +
    ` <button data-relevel="1">${esc(t('F.scene.relevel'))} <kbd>${esc(drawChord('Mod+R'))}</kbd></button><button class="x" data-x="1">× ${esc(t('F.scene.dismiss'))}</button>`;
  for (const side of SIDES) {
    const P = S[side], pane = paneEl(E, side);
    pane.innerHTML = cornerMarkup(P);
    swap(E, P, LAYER.sceneArticle(P.d, { names: P.names, shows: P.shows, view: P.view }));
    pane.setAttribute('tabindex', '0');
  }
  namePanes(E, S);
  fitMeasure(E);
}

/**
 * The scene reopened as the reader left it (see the head), once its reads
 * answer where no act was made on the chrome meanwhile (O-HOST's opening):
 * each pane's text read again (`paneAgain`) and the reads between the panes;
 * as it shows, the act's `leaving` first; the ends set level where their
 * bytes stand now, else where the panes' `compare` sets the passage held;
 * each pane brought back to its place and its selection (`placeAgain`); the
 * focus on the stop it stood on, else in the far end's pane, and the pair
 * named in the status region. A pane the board refused the text of for what
 * it says of the document stands as that refusal, its head alone — a cover
 * (FP-29). Where the far end names pane B's document whole, it waits on no
 * `compare`, as an opening does (`addBands`). Opened anew where the reader
 * never left it.
 * @param {import('../nav/trail.js').Opened} o the scene's trail entry's own: the pair it opened on, the passage held, the scene as the reader left it
 * @param {Showing} [as]
 * @returns {Promise<Opening>} once the scene shows, or nothing will
 */
export async function reopen(o, as = {}) {
  const was = o.left;
  if (!was) return open(o.a, o.b, o.held, as);
  /** @type {Opening} */
  const out = { shown: false, refused: null };
  if (!els) return out;
  await HOST.opening(async (stands) => {
    const [ra, rb] = await Promise.all([paneAgain('a', was.panes.a, stands), paneAgain('b', was.panes.b, stands)]);
    const pa = ra.pane, pb = rb.pane;
    if (!pa || !pb) { if (stands()) out.refused = ra.refused || rb.refused; return null; }
    if (!stands()) return null;
    const between = await readBetween({ src: pa.src, d: pa.d, shown: LK.shown(pa.src) }, { src: pb.src, d: pb.d, shown: LK.shown(pb.src) }, !o.held.wholeB);
    return { pa, pb, between };
  }, ({ pa, pb, between }) => {
    const E = els;
    if (!E) return;
    if (as.leaving) as.leaving();
    const from = document.activeElement, spots = was.spots;
    for (const P of [pa, pb]) P.lacks = spots && P.src === was.panes[P.side].src ? spots[P.side].lacks : null;
    const S = sceneOf(pa, pb, between.pairs, o.held);
    stand(E, S, between.refused);
    if (spots) {
      for (const side of SIDES) {
        const lv = spots[side].level, at = lv ? REC.placedIn(S[side].d.image, lv.ids) : [];
        S.level[side] = !lv ? null : at.length ? at[0].pos : S.level[side];
      }
    }
    level();
    if (spots) placeAgain(E, S, spots);
    FOCUS.open('scene', { el: E.root, from, byKey: true, first: stopIn(E, was.stop) || E.paneB });
    FOCUS.say(`${t('L.scene-label')} · ${S.a.shows} │ ${S.b.shows}`);
    out.shown = true;
    markDirty();
    if (S.whole) void addBands(S);
  });
  return out;
}

/**
 * A pane as the reader left it, read again (`reopen`): its record whole
 * (`readPane`), the version it read and its corner's act as it left them; an
 * edition read at its bare address whose chain the read finds past the
 * member its text was, that member read whole in its place, the pane pinned
 * to it and its corner offering the newest (FP-23). No pane where the board
 * did not answer, with the refusal met.
 * @param {'a' | 'b'} side
 * @param {Version} v
 * @param {() => boolean} stands
 * @returns {Promise<{pane: Pane | null, refused: Refusal | null}>}
 */
async function paneAgain(side, v, stands) {
  const r = await readPane(v.src, stands), d = r.d;
  if (!d) return { pane: null, refused: r.refused };
  if (v.kind === 'bare' && v.k != null && r.n != null && r.n > v.k) {
    const src = versionAddress(boxOf(v.src), v.k), m = await readPane(src, stands), md = m.d;
    if (!md) return { pane: null, refused: m.refused };
    return { pane: { ...paneAt(side, src, { d: md, n: r.n }), doc: v.doc, read: r.n }, refused: null };
  }
  const P = paneAt(side, v.src, { d, n: r.n });
  return { pane: { ...P, doc: v.doc, read: v.read, n: P.kind === 'draft' ? null : Math.max(P.n ?? 0, v.n ?? 0, P.k ?? 0) || null }, refused: null };
}

/**
 * Each pane brought back to where the reader stood in it (`reopen`): its
 * place's line, where its text holds that byte, at the height it stood below
 * the pane's visible top — any other pane left where the re-level set it —
 * and its selection put back on the same bytes; then the ties drawn at the
 * panes' scrolls.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {{a: Spot, b: Spot}} spots
 */
function placeAgain(E, S, spots) {
  for (const side of SIDES) {
    const P = S[side], pane = paneEl(E, side), s = spots[side], image = P.d.image;
    const at = s.place ? REC.placedIn(image, s.place.ids) : [];
    if (s.place && at.length) { const line = lineAt(pane, P.names, at[0].pos); if (line) pane.scrollTop = line.top - s.place.at; }
    const sel = s.sel ? REC.placedIn(image, s.sel.ids) : [], z = sel[sel.length - 1];
    if (s.sel && z && P.el) LAYER.selectIn(P.el, { addr: P.names, pos: sel[0].pos, width: z.pos + z.width - sel[0].pos }, s.sel.backward);
  }
  draw();
}

/**
 * The scene as the reader leaves it (see the head), by value: each pane's
 * text; where they stood in it, its selection and the end set level in it,
 * each by its bytes' identity through the image its article was made from;
 * and the stop the platform's focus stands on. What N-GO records in the
 * scene's trail entry as the reader leaves it; null where the scene does not
 * stand.
 * @returns {Left | null}
 */
export function asLeft() {
  const S = scene, E = els;
  if (!S || !E) return null;
  /** @type {(P: Pane) => Version} */
  const version = (P) => ({ doc: P.doc, src: P.src, names: P.names, shows: P.shows, kind: P.kind, k: P.k, n: P.n, read: P.read });
  /** @type {(P: Pane) => Spot} */
  const spot = (P) => {
    const made = P.el ? LAYER.madeOf(P.el) : null, image = made ? made.image : [], sel = P.el ? LAYER.selectionIn(P.el) : null, lv = S.level[P.side];
    return {
      place: P.place || placeAt(P, firstInView(paneEl(E, P.side))),
      sel: sel ? { ids: REC.identityIn(image, sel.span.pos, sel.span.width), backward: sel.backward } : null,
      level: lv != null ? { pos: lv, ids: REC.identityIn(image, lv, 1) } : null,
      lacks: P.lacks,
    };
  };
  return { panes: { a: version(S.a), b: version(S.b) }, spots: { a: spot(S.a), b: spot(S.b) }, stop: stopOf(E) };
}

/** the scene's stop the platform's focus stands on (`Stop`); null where it stands outside the scene */
function stopOf(/** @type {NonNullable<typeof els>} */ E) {
  const at = typeof document !== 'undefined' ? document.activeElement : null;
  if (!at) return null;
  for (const side of SIDES) {
    const pane = paneEl(E, side), corner = pane.querySelector(':scope > .corner');
    if (corner && corner.contains(at)) return /** @type {Stop} */ (side + ':corner');
    if (pane.contains(at)) return side;
  }
  return at === E.bar.querySelector('[data-relevel]') ? 'relevel' : at === E.bar.querySelector('[data-x]') ? 'x' : null;
}

/** the element a stop names (`Stop`) as the scene stands now; null where it names none */
function stopIn(/** @type {NonNullable<typeof els>} */ E, /** @type {Stop | null} */ stop) {
  if (stop === 'a' || stop === 'b') return paneEl(E, stop);
  if (stop === 'a:corner' || stop === 'b:corner') return paneEl(E, stop === 'a:corner' ? 'a' : 'b').querySelector(':scope > .corner');
  return stop === 'relevel' ? E.bar.querySelector('[data-relevel]') : stop === 'x' ? E.bar.querySelector('[data-x]') : null;
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
 * The panes' text at the plane's measure, both at one size (see the head):
 * each article, the style's `--measure` advances of its face and its column's
 * edge wide — every width of it in its own em — set at the reading size
 * (P-CAM's), or where a pane's content beside its corner and the gap holds
 * less, at the size whose column the narrower room holds.
 * @param {NonNullable<typeof els>} E
 */
function fitMeasure(E) {
  /** @type {Array<{art: HTMLElement, room: number}>} */
  const set = [];
  for (const pane of [E.paneA, E.paneB]) {
    const art = /** @type {HTMLElement | null} */ (pane.querySelector(':scope > article.dtext'));
    if (!art) continue;
    const corner = pane.querySelector(':scope > .corner'), cs = getComputedStyle(pane);
    set.push({ art, room: pane.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - (corner ? corner.getBoundingClientRect().width + (parseFloat(cs.columnGap) || 0) : 0) });
  }
  for (const x of set) x.art.style.fontSize = READING_PX + 'px';
  // an article's width grows with its size alone, so the size a room holds it at is read off its width at the reading size
  const fs = set.reduce((k, x) => { const w = x.art.getBoundingClientRect().width; return x.room > 0 && w > x.room ? Math.min(k, READING_PX * (x.room / w)) : k; }, READING_PX);
  for (const x of set) x.art.style.fontSize = fs + 'px';
}

/** a face arrived once the panes were set (APP's, as a face loads late): the next frame refits the panes and measures their ties again (`draw`) */
export function refaced() { if (scene) { scene.size = ''; markDirty(); } }

/** each pane's article given a pane's height of room below its end, so any of its lines can be scrolled to the pane's top */
function roomBelow(/** @type {NonNullable<typeof els>} */ E) {
  for (const pane of [E.paneA, E.paneB]) { const art = articleIn(pane); if (art) art.el.style.paddingBottom = pane.clientHeight + 'px'; }
}

/** the panes' sizes, the measure the ties' ends were taken at */
const sizeOf = (/** @type {NonNullable<typeof els>} */ E) => `${E.paneA.clientWidth}x${E.paneA.clientHeight}|${E.paneB.clientWidth}x${E.paneB.clientHeight}`;

/** what a pane gives the lines between the panes: what it was set with (`PaneLinks`), a cover where its record was refused `withheld` */
const linksOf = (/** @type {Pane} */ P) => ({ addr: P.src, shown: P.view.marks, blocks: P.d.blocks, placed: P.placed, cover: P.d.refused === 'withheld' });

/**
 * Where a pane's cover stands (FP-29): its article's head's withheld
 * statement — "withheld · ⟨owner⟩" — the line every far end crossing into
 * the pane ends at, in px below the pane's content top; null where the pane
 * holds no article.
 * @param {HTMLElement} pane
 * @returns {{top: number, y: number} | null} the statement's top, and its middle
 */
function coverIn(pane) {
  const art = articleIn(pane);
  const st = art ? /** @type {HTMLElement | null} */ (art.el.querySelector('.hd .st')) : null;
  const r = st ? st.getBoundingClientRect() : null;
  if (!r || !r.height) return null;
  const origin = pane.getBoundingClientRect().top + pane.clientTop - pane.scrollTop;
  return { top: r.top - origin, y: r.top + r.height / 2 - origin };
}

/**
 * Where an end of a line stands in its pane: at its passage's first line
 * (`lineIn`), else at the pane's cover (`coverIn`); a whole document at no
 * line, its height the line's other end's as drawn (`draw`).
 */
const endIn = (/** @type {HTMLElement} */ pane, /** @type {string} */ names, /** @type {Passage} */ e) => (e.whole ? { top: 0, y: 0 } : e.cover ? coverIn(pane) : lineIn(pane, names, e.pos, e.width));

/**
 * Measure the ties: each run of shared identity, and each link between the
 * two documents once per pair of its ends (`linesBetween`), its ends at
 * their passages' first lines in the panes' content, or at a pane's cover —
 * every one from what the panes were set with, never the model's now; a tie
 * an end of which lies in none of its pane's blocks is left out. Where the
 * scene is whole, the passages the stop reaches with them: the near passage's
 * `counterparts` in pane B, in pane B's order, each at its first line there,
 * the stop's next passage the first again where it names one no more.
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
    const la = endIn(E.paneA, S.a.names, l.a), lb = endIn(E.paneB, S.b.names, l.b);
    if (la && lb) out.push({ kind: 'link', link: l.link, a: { ...l.a, y: la.y }, b: { ...l.b, y: lb.y }, ink: l.ink, marks: l.marks, value: l.value });
  }
  S.ties = out;
  const near = S.level.a;
  S.shared = !S.whole || near == null ? [] : counterparts(S.pairs, near, S.widthA).sort((p, q) => p.b - q.b).flatMap((c) => {
    const line = lineIn(E.paneB, S.b.names, c.b, c.width);
    return line ? [{ pos: c.b, width: c.width, top: line.top, y: line.y }] : [];
  });
  if (S.next >= S.shared.length) S.next = 0;
  S.size = sizeOf(E);
}

/**
 * Panes set again in one step (see the head) — every read made before it,
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
  }
  namePanes(E, S);
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
 * the head; FP-23): run now where no setting reads, else once the last
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
    const r = await readPane(src), d = r.d;
    // a version the corner's act could not read whole leaves the pane as it shows
    if (stale() || !d || (how.src && !r.whole)) return;
    if (P.kind === 'bare' && !how.src && P.k != null && r.n != null && r.n > P.k) { pin(S, side, P.k, r.n); return; }
    const kind = how.src ? 'pinned' : P.kind === 'pinned' ? 'pinned' : kindAt(src, d);
    const k = kind === 'pinned' ? memberOf(src) : kind === 'bare' ? r.n : null;
    const names = kind === 'bare' && r.n ? versionAddress(src, r.n) : src;
    const n = kind === 'draft' ? null : Math.max(r.n ?? 0, P.n ?? 0, k ?? 0) || null;
    /** @type {{from: number, to: number} | null} */
    let hold = null;
    /** @type {number | null} what the corner says the version it reads lacks: the act's, else as it said */
    let lacks = how.src ? null : P.lacks;
    if (how.carry) {
      const into = await carryInto(P, how.carry, d);
      if (stale()) return;
      hold = { from: into.from, to: into.to };
      lacks = into.none ? k : null;
    }
    for (;;) {
      const seen = Q.sets;
      const mine = { src, d, shown: LK.shown(src) }, theirs = { src: Q.src, d: Q.d, shown: Q.view.marks };
      const between = await readBetween(side === 'a' ? mine : theirs, side === 'a' ? theirs : mine);
      if (stale()) return;
      if (Q.sets !== seen) continue;
      const read = how.read !== undefined ? how.read : P.read;
      setPanes(S, [{ side, next: { d, kind, src, names, shows: kind === 'bare' ? src : names, k, n, read, lacks, hold } }], between.pairs);
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
 * head; foundations §3.2; FP-23): the pane pinned at once to the member its
 * text is
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
 * A newer member named at a pane on a version (see the head; FP-23): its
 * corner's count, and its act, where it offers the newest, naming the
 * newest; nothing of its text.
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
 * a refresh reaching every pane (`refreshed`); a row naming a newer member
 * pinning an edition at its bare address at once, or counting a version's
 * chain again; any other row reaching a pane's text reading it again in its
 * place.
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
  if (x.chains) { for (const side of SIDES) refreshed(S, side, x.chains); return; }
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
 * A refresh reaching a pane (see the head; M-PUMP's `refresh`, told once the
 * model's shown documents are set again): an edition at its bare address
 * whose member is not known left as it shows, for a read of its bare address
 * may answer a newer member; one whose chain the refresh counted past the
 * member its text is pinned at once from what it kept (`pin`), which reads
 * that member itself; a version counting the chain the refresh counted
 * (`count`); then each other pane read again in its place (`update`), whose
 * own reads pin a bare address's pane where its chain advanced.
 * @param {Scene} S
 * @param {'a' | 'b'} side
 * @param {Map<string, {n: number}>} chains the chains the refresh counted, by trunk
 */
function refreshed(S, side, chains) {
  const P = S[side], c = chains.get(boxOf(P.src));
  if (P.kind === 'bare') {
    if (P.k == null) return;
    if (c && P.k >= 1 && c.n > P.k) { pin(S, side, P.k, c.n); return; }
  }
  if (P.kind === 'pinned' && c) count(S, side, c.n);
  void update(side);
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

/** the two ends set level now (`relevel`), the stop's next act going to its first passage again */
function level() {
  const S = scene, E = els;
  if (!S || !E) return;
  S.next = 0;
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

/**
 * Draw the bands and the lines on the scene's canvas, each end where its
 * passage's line stands at the panes' scrolls now — a whole document's at its
 * pane's facing edge, level with the line's other end — then each facing edge
 * whole-document ends meet (`wholeEdges`, `drawEdge`), and the stop placed
 * (`placeStop`).
 */
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
  /** a whole document's end on the canvas: level with the line's other end, held inside its pane's visible height */
  const meet = (/** @type {ReturnType<typeof frame>} */ f, /** @type {{y: number} | null} */ o) => ({ y: Math.max(f.top, Math.min(f.bottom, o ? o.y : f.top)), clipped: false, above: false });
  const fa = frame(E.paneA), fb = frame(E.paneB), x0 = fa.x1, x1 = fb.x0;
  /** @type {Drawn[]} */
  const out = [];
  for (const tie of S.ties) {
    const ta = tie.a.whole ? null : at(fa, tie.a), tb = tie.b.whole ? null : at(fb, tie.b);
    const ea = ta || meet(fa, tb), eb = tb || meet(fb, ta);
    ctx.globalAlpha = tie.value; ctx.lineWidth = tie.kind === 'band' ? 6 : 1.6;
    drawTie(ctx, { x: x0, ...ea }, { x: x1, ...eb }, tie.ink);
    out.push({
      kind: tie.kind, link: tie.link,
      a: { pos: tie.a.pos, width: tie.a.width, x: x0 + c.left, y: ea.y + c.top, clipped: ea.clipped, cover: !!tie.a.cover, whole: !!tie.a.whole },
      b: { pos: tie.b.pos, width: tie.b.width, x: x1 + c.left, y: eb.y + c.top, clipped: eb.clipped, cover: !!tie.b.cover, whole: !!tie.b.whole },
    });
  }
  /** @type {Edge[]} */
  const edged = [];
  for (const e of wholeEdges(S.ties)) {
    const f = e.side === 'a' ? fa : fb, x = e.side === 'a' ? x0 + EDGE_W / 2 : x1 - EDGE_W / 2, ink = inkOf(e.mark);
    ctx.globalAlpha = e.mark.value; ctx.lineWidth = EDGE_W;
    drawEdge(ctx, x, f.top, f.bottom, ink);
    edged.push({ side: e.side, links: e.links, x: x + c.left, top: f.top + c.top, bottom: f.bottom + c.top, hue: ink.hue, dashed: ink.dash.length > 0 });
  }
  ctx.globalAlpha = 1;
  drawnTies = out;
  drawnEdges = edged;
  placeStop(E, S);
}

/**
 * The facing edges whole-document ends meet (see the head): each pane a
 * line's whole end stands in, in the panes' order, with the links those ends
 * are of and the one mark their marks there merge into (LK's `mergedMark`).
 * @param {Array<{link: string | null, a: {whole?: boolean}, b: {whole?: boolean}, marks?: {a: Mark, b: Mark}}>} ties
 * @returns {Array<{side: 'a' | 'b', links: string[], mark: Mark}>}
 */
export function wholeEdges(ties) {
  /** @type {Array<{side: 'a' | 'b', links: string[], mark: Mark}>} */
  const out = [];
  for (const side of SIDES) {
    /** @type {Array<{link: string, mark: Mark}>} */
    const ends = [];
    for (const x of ties) if (x[side].whole && x.marks && x.link) ends.push({ link: x.link, mark: x.marks[side] });
    const [first, ...rest] = ends;
    if (first) out.push({ side, links: ends.map((e) => e.link), mark: LK.mergedMark([first.mark, ...rest.map((e) => e.mark)]) });
  }
  return out;
}

/**
 * Draw a whole document's facing edge (`draw`), its width and alpha set on
 * the context: one stroke at `x` from the pane's visible top to its visible
 * bottom in its ink, butt-capped so it ends where the pane's view does.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} top
 * @param {number} bottom
 * @param {Ink} ink
 */
export function drawEdge(ctx, x, top, bottom, ink) {
  ctx.lineCap = 'butt'; ctx.strokeStyle = ink.hue; ctx.setLineDash(ink.dash);
  ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, bottom); ctx.stroke();
  ctx.setLineDash([]);
}

/**
 * Where the stop stands (see the head): the first of the shared passages,
 * from the one the next act goes to first and round again, whose first line
 * stands out of pane B's visible content, and whether it stands above it;
 * null where every one stands in view.
 * @param {Array<{y: number}>} shared the shared passages' first lines' middles, px below pane B's content top, in pane B's order
 * @param {number} next the passage the next act goes to first, an index into `shared`
 * @param {{top: number, h: number}} view pane B's scroll and its visible content's height, px
 * @returns {{i: number, above: boolean} | null}
 */
export function stopFor(shared, next, view) {
  for (let k = 0; k < shared.length; k++) {
    const i = (next + k) % shared.length, y = shared[i].y;
    if (y < view.top || y > view.top + view.h) return { i, above: y < view.top };
  }
  return null;
}

/**
 * The stop placed at the panes' scrolls now (see the head): where `stopFor`
 * stands it, at pane B's facing edge, at the pane's visible top or bottom on
 * the passage's bearing, over the stub's triangle, its count shown where the
 * shared passages are two or more and its name ST's words; its first
 * appearance in the scene said in the status region (FP-28); hidden where
 * every one stands in view, the focus it held handed to pane B (FP-20).
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 */
function placeStop(E, S) {
  const pane = E.paneB, stop = E.stop, held = typeof document !== 'undefined' && document.activeElement === stop;
  const to = stopFor(S.shared, S.next, { top: pane.scrollTop, h: pane.clientHeight });
  S.at = to ? to.i : null;
  if (!to) {
    if (!stop.hidden) { stop.hidden = true; if (held) FOCUS.land(pane, {}); }
    return;
  }
  const n = S.shared.length, id = n > 1 ? 'L.scene.shared' : 'L.scene.shared.1', vals = { D: S.b.shows, n };
  const root = E.root.getBoundingClientRect(), r = pane.getBoundingClientRect(), top = r.top + pane.clientTop;
  stop.setAttribute('aria-label', t(id, vals));
  stop.textContent = n > 1 ? String(n) : '';
  stop.style.left = r.left - root.left - E.root.clientLeft + 'px';
  stop.style.top = (to.above ? top : top + pane.clientHeight) - root.top - E.root.clientTop + 'px';
  stop.style.transform = to.above ? 'translate(-100%, 0)' : 'translate(-100%, -100%)';
  stop.hidden = false;
  if (!S.told) { S.told = true; FOCUS.say(t(id, vals)); }
}

/**
 * The stop's act (see the head): pane B scrolled so the shared passage the
 * stop stands for has its first line level with the near passage's, where
 * that line stands in pane A's view, else LEVEL_AT px below the pane's top;
 * the next act going to the passage after it, round again. Nothing else
 * moves.
 */
function toShared() {
  const S = scene, E = els;
  const p = S && S.at != null ? S.shared[S.at] : null;
  if (!S || !E || !p || S.at == null) return;
  const la = S.level.a != null ? lineIn(E.paneA, S.a.names, S.level.a, S.widthA) : null;
  const seen = la ? la.y - E.paneA.scrollTop : -1;
  E.paneB.scrollTop = p.top - (la && seen >= 0 && seen <= E.paneA.clientHeight ? la.top - E.paneA.scrollTop : LEVEL_AT);
  S.next = (S.at + 1) % S.shared.length;
  draw();
}

/** where along a tie's stroke its ends' inks meet: the half of its parameter, where BM's curve between the panes' inner edges stands at the middle of the gap (`strokeOf`) */
const GAP_MIDDLE = 0.5;

/**
 * Draw one tie between the panes (`draw`), its width and alpha set on the
 * context: BM's curve from its end at pane A's inner edge to its end at pane
 * B's, each end in its own pane's ink, a line whose two differ changing
 * colour once at the middle of the gap, one stroke with no dot or break at
 * the change (FP-30; BM's `strokeIn`); an end whose line has left its pane
 * clipped at the pane's edge with the stub's triangle, in its own end's hue.
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
 * End the scene where it stands, as a navigation act's departure ends it —
 * its own end, a Back from its entry, among them (§2.5; see the head): the
 * plane as it was, and no trail move of its own; a pane being set again sets
 * nothing once it ends, and an act waiting on it is dropped. The plane is put
 * back in the page's order before the focus returns, for the element the
 * scene was opened from — the walk's item, a corner — takes no focus while
 * the scene covers it; the focus's owner takes a focus the scene held off it
 * and returns it.
 */
export function close() {
  if (!scene || !els) return;
  scene = null;
  drawnTies = [];
  drawnEdges = [];
  coverPlane(false);
  els.root.classList.remove('on'); els.paneA.innerHTML = ''; els.paneB.innerHTML = ''; delete els.bar.dataset.face;
  els.stop.hidden = true;
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
