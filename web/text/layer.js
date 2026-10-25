// T-LAYER — the one reconciler (the structure record §3.2; FP-12: one
// reconciler, two targets, the plane's text layer and the reading scene's
// panes, which borrow this mount). Layer 2. Engine-bound. State (FP-10): the
// mounted set (`mounted`) — each record's layout scale, revision, what it was
// made from, the fold it was set in, the parts of it standing, its marks and
// whether it takes the pointer — the corners beside the articles and the
// labels held over them, which corners and cut labels a reader's act opened
// whole, each document's fold and its lines as the platform set them, the
// passage being read while its document is set again (`hold`), what each
// reading scene's pane's article was made from (`panes`), whether a press
// stands on the layer, the platform's selection as it stood over an article
// taken down (`kept`), the page's selection while it is owed its range
// (`owed`), the span the platform's selection was last placed over, the
// measure the layer's style holds, the widths its measure took (`widths`),
// the view revision, and the mount log and frame counts the gate reads.
// One article a box (FP-22): a document's versions share its box, and the
// one standing there is the version the box shows (the reader `shown`,
// N-GO's `shownIn`) — every other version's article taken down, and none
// mounted in a box another version's article still stands in under a press.
// Where a box takes another version — a version move, a newer version's
// arrival — the line being read keeps its place and its size on screen
// (`holdAcross`): the version taken, mounted fresh, re-anchors the camera on
// the position its mover names, or, at an arrival, on the passage at the
// visible view's centre — its bytes where the version's image places them,
// else its position (P-LAY's `holdOf`, P-CAM's `reanchor`).
// No document at reading size is ever drawn as bars (FP-12): every document
// in view whose text has arrived stands as text in the frame its em reaches
// P-LOD's readable threshold (LOD_TXT_LO, an em of 8 px), whatever else that
// frame mounts. Below it a document mounts from the mount threshold
// (MOUNT_EM, 6.5, so bars become text while they are still too small to read
// and no character positions disagree — S1 Q7) and keeps its claim down to
// UNMOUNT_EM, 5.5, and the limit (MOUNTS_PER_FRAME) is spent on those: at
// most that many documents newly mounted in a frame, the readable mounts
// counted first, then those holding the page's selection or the walk's
// focus and the document just navigated to, whatever their size, then the
// largest em first, equal ems in the model's order (`chosen`, `limitOrder`)
// — never by length, which would bar short notes first. The limit holds a
// mount back for the frames after; it never takes one down, and nothing is
// taken down to make room. A document stands by line, never whole (`fill`):
// the lines of its fold whose boxes meet the view, padded 40 px, column by
// column, stand as parts — each a run of one column's lines cut from the
// article at the points its lines open at as the platform set them
// (`cutOf`) — so what stands is bounded by the screen however many documents
// are in view. A line entering the view stands in a part of its own, and a
// part none of whose lines is in view goes; no standing part is rebuilt to
// take a line. The head, a record, a withheld face, a reference, an item not
// rendered and a scene-offer stand whole, cut only where the fold's columns
// cut them; a typed line is cut at any of its lines. The lines that hold
// the selection or the focus stay for as long as they hold them, out of view
// and below 5.5 as well (`heldParts`): those the platform's selection meets
// — a press's, even collapsed, the drag being made — the one the platform's
// focus stands in, and those of the page's span, its first and last lines
// standing wherever the view is so its range can be placed (`placeAgain`);
// an article left with such lines alone stands outside the mount band
// (`isMounted` false). What assistive technology receives is the document
// itself, never what stands: the articles are hidden from it, the ARIA
// mirror's items being made from the model (S1 Q7). An article goes stale
// where its run, its revision, the view revision or its fold changed
// (`wentStale`), and is rebuilt in its place; the walk's focused document is
// the one residue document of its cell that mounts. While a press stands on
// the layer (`press`) no standing article is rebuilt or loses the pointer and
// no range is placed over the drag: the platform's drag-selection is
// anchored in the article's own nodes, which a rebuild would take away;
// documents and lines still mount as the view asks, and the first frame
// after the press does what was held.
// An article is laid out once at P-LAY's LAY_FS (16 px) and its unitless
// LINE_H, so each element's line box is its own size's, each column exactly
// the measure in force's count of the reading face's average advance (P-CAM's
// `measure`, MEASURE_CPL wherever the view holds it, at P-LAY's CHAR_W; the
// style's `--measure`, which this module sets on its layer — `setMeasure` —
// and `--char-w`), and placed by transform from the same camera arithmetic
// (S1). The measure (`widthOf`): words set in each voice's face (P-REG's
// FACE) at LAY_FS as the platform's canvas sets them, a client figure in a
// cell as wide as its face's widest (P-LABEL's `runWidth`) — what T-ARTICLE
// fits a withheld run's face, a cut label and a byline's slots by (the view's
// `measure`), and what a held label's line is set by (P-LABEL's
// `heldContents`, `runHTML`); where the platform gives no canvas, every character one advance
// of the reading face. A face that arrives after the articles were set is a
// re-set (`refaced`): the widths, the lines the platform set and the folds
// made of them dropped, so every standing article goes stale and is set again
// in its place, the passage being read held (FP-8). A resize that moves the measure folds
// every document again at it, and the article being read is set again in
// its place, the passage held; a zoom never moves it. The fold (`foldOf`;
// FP-12, FP-8): every document is set at one line length and one line height
// in P-LAY's equal columns inside its room, broken at the lines as rendered,
// after the reader's font and spacing settings apply: an article is laid out
// once in one column (`measureLines`), each row's element read for its top
// and its height, each line of a text block where it begins and how far it
// reaches, read from the characters the platform set on it (`setIn`) — the
// face is proportional, so no count of characters places a line — kept by
// the article without its marks, its counts and its
// byline's facts, which set no line (`layoutKey`; A-254; FP-34), and those
// lines broken into columns by P-LAY's keep rules; a mounted article's parts
// are cut from that one column, kept out of the page (its template), each
// placed at its first line's top in its column, a block a cut falls in split
// at the point its line opens with, chrome included, each part keeping its
// block's keys and the tail naming the character it starts at
// (`data-char`), so every reader of a block here — the selection's mapping,
// the marks, the rects — reads it across the parts of it that stand. Its
// size is the step P-LAY's fold takes for the plan carrying the most link
// chrome any reveal can set in it (LK's `utmost`) and for the lines as set,
// the larger: no reveal moves its type size and nothing runs past its room.
// Every reader of a document's size above the model reads it here. A
// document is at reading scale where its own em — that size at the scale —
// stands at the readable threshold or above (`atReadingScale`): the one test
// the mount, the corner, the pointer and the paging here read, and APP-INPUT,
// L-LINE and N-WALK with them — never the camera's band, which reads a
// depth-0 document's standard size. Every size read here raises P-CAM's
// zoom-in bound to read it (`reach`; E18 (a)), so the camera never stops
// short of the reading scale of the text this module sets. The
// canvas's bars below the mount are the same fold's lines, measured where
// the document's text has been set in view (`measureInView`: a frame's
// budget of MEASURE_BUDGET_MS, nearest the view's centre first, no document
// below BARS_EM), so mid scale greeks the columns the mount sets and no word
// moves at the hand-off; the loop runs `frame` before P-RENDER draws, so the
// canvas draws or yields each line by the lines standing this frame
// (`standing`), and outlines an arrival's runs on the fold's own lines where
// no part of them stands (`foldBoxes`; FP-21). When a document is set again
// while it is read — its article rebuilt in another fold, or taken down for
// a feed row and mounted again — the passage at the visible view's centre
// keeps its place and its size on screen (`hold`, `keepPlace`): the
// passage's own bytes, carried by their identity through the image the
// article was made from into the text set again, so an edit above the view
// moves no word the reader reads (FP-8, FP-23), its position where that
// image places none of them, and by position where the text comes before its
// image, the bytes kept for the re-set the image's arrival makes (`still`).
// A view the reader leaves and comes back to by the trail is placed again
// the same way (foundations §2.2): what a view reads — the passage at its
// visible centre in the document at its own reading scale there, by its
// position, its byte's identity and its place in the fold (`readAt`) —
// N-TRAIL keeps beside the view, and a return lands at the view that keeps
// that passage at its place and its size on screen in the fold its document
// stands in then, its lines set as the platform sets them first (`keptAt`).
// The paging key continues at the next column's top at reading scale
// (`pageTarget`). A document's region is its outline's bounds widened
// leftward by the strip its corner stands in (`regionOf`); whether it meets
// the visible view (`inView`), the view's window over it (`windowIn`) and
// whether a position's line stands in a view (`lineInView`) are read here by
// N-WALK, L-LINE and N-GO.
// The marks and symbols are placed from LK's `shown` and `symbols`, a
// stretch several links mark in the one mark LK's `mergedMark` gives; a
// withheld run's owner and C-67's clause beneath it from what the model
// holds of its origin (`originOwner`, `clauseOf`), the article made again
// as the origin's edition claims and the reads of them arrive, fail and go
// (M-REC's revision); the selection from O-SELECTION and the focus from
// N-WALK are handed to T-ARTICLE as values at mount, and each frame marks a
// standing article's blocks for them in place by T-ARTICLE's one rule
// (`blockMarks`), so a change of the selection or the focus rebuilds no
// article and the platform's selection stands as the person left it
// (foundations §2.1; D5 §2); its symbols are marked heavier, in place, where
// every link one stands for is lit at an arrival (LK's `lit`, T-ARTICLE's
// `symbolLit`; FP-30), so an arrival sets no line (`markLit`). The byline
// (FP-34): each article's byline is made from its owner's facts as the model
// holds them (M-REC's `accountKey`, the view's `keyOf`), never this device's
// key, and its lines are kept by the article with its slots read, their
// boxes empty (`layoutKey`), so the facts' arrival — which makes every
// document its owner owns again (M-REC's revision) — sets no line; a cut
// label opens whole on its act, marked in place (`openLabel`, `markLabel`).
// A span wholly inside a withheld run stands at the run's own boxes — its
// gap's, one for each part of it standing — never at an offset inside the
// gap (`spanRects`; FP-30, FP-21). The lit block is the focus ring's
// reading-scale form (the focus record's D3; D5 §4 rule 2): one mark, under
// the ring's one rule — lit while the plane holds the focus and a key moved
// it (N-FOCUS's `ringShown`), out after a pointer's landing — the canvas
// circling no document whose text stands.
// The corner (foundations §3.1; ux-T2; D5 K-57; FP-26): each mounted
// document at reading scale carries its own beside its article, never inside
// it, as an element of the corner layer this module keeps: on the document's
// left (the beams and the blocks' counts take the right, the column's edge),
// at the interface's size, beside the column nearest the view's centre
// (`besideOf`) — beside a row's first column in the strip P-PROJ's
// `clearLeftOf` keeps free of every other document's box, beside a later one
// in the gutter and the edge of the column before it, below the signs that
// edge holds (`cornerTop`); whole where its room holds it whole and the
// view's fit holds a column beside it whole, else compact, its usual states
// glyphs, its numbers and its exceptions in their words (T-ARTICLE's
// `cornerHTML`), a glyph's act opening it whole where it stands
// (`openCorner`); where that room holds not even the compact corner, or the
// signs leave it none, by its row's first column, its own document's free
// room — held to the top of its column's visible part below the one line,
// else just below the line, and never past its outline's bottom beside a
// row's first column, nor past its row's foot beside another, placed by
// translate alone from the same camera arithmetic: P-LABEL's one hold
// (`holdTop`), P-REG's HOLD gap below the line, so it stands level with a
// label held there. A reading view frames the column it reads with the
// corner and the edge beside it, at the landing's em (`frameOf`; P-CAM's
// `landingPx`) — a document read whole, its first column where the visible
// view holds it, else its head at the top of the visible view (FP-29). The element outlives its
// article's remounts and its items are rewritten only where they change, so
// a focus on it survives them; the focused document's corner is the plane's
// next Tab stop, named by its own words, and every other is out of the order
// and hidden from assistive technology; while the reading scene stands over
// the plane the corner layer is inert (`cover`, through N-FOCUS, the focus's
// owner — FP-20), the scene's panes carrying their own (D5 §4 rule 5); a
// corner that leaves while it holds the focus hands it to the walk (D5 §4
// rule 4). The held label (FP-26): a document whose article stands in the
// mount band has no label on the canvas, its head naming it; once its
// outline's first row rises above the hold, and while the one line does not
// name it (the reader `named`), its label stands held below the line as an
// element of the corner layer over its text — the canvas's words for its
// box, read here (`docLabel`), so the two never part: its first line from
// the line's start, the box's lead (`leadRuns`, by T-ARTICLE's first-line
// rule), and its address at the line's end, past its region's prefix where
// that region is named in view (the reader `region`), else whole, its
// address in the identifier's face and the document's words in the reading
// face's, each stretch measured and set in its own (`runHTML`), on one line
// across its outline's visible part, on its box's ground, pushed up under the
// line by its outline's foot, beside its corner and never over it
// (`besideCorner`), drawn and never announced, taking the pointer where its
// article does (`placeHeld`).
// The press rule's text half (foundations §2.4): an article takes the
// pointer at reading scale alone — its em at the readable threshold and
// above, the `legible` class the style gives its columns' pointer
// (`markLegible`) — so below it a press on mounted text falls to the canvas
// as one on its bars does, and a press between its columns falls to the
// canvas at any scale: the press is keyed on legibility, never on whether
// text is mounted; the class moves on a standing article only while no
// press stands, so a drag begun on legible text keeps the article it is
// anchored in through a zoom below the threshold. A drag selects text and
// never pans, and this module holds whether a press stands (APP-INPUT
// reports its start and its end). A press the canvas took at reading scale
// before the text under it stood is APP-INPUT's to hold: once the frame has
// set that text, the platform's selection is collapsed at the press
// (`caretAt`) and the drag's other end carried to the pointer (`extendTo`),
// as the platform does on text it is pressed on.
// The selection is a byte span (R11; foundations §3.1) and the platform's
// selection is its one mark (§2.1): this module carries the platform's range
// to the span it covers (`spanIn`, `spanOfSelection`) — each block's own
// text nodes walked, part by part, the chrome inside a block skipped, a
// character boundary carried to its byte position by T-SPAN through the
// blocks the article was made from, never the model's newest, which a
// delivery under a press may have replaced — and the span back to a range
// over the parts that stand (`rangeIn`), a position no standing part holds
// naming no point (`pointOfPos`). That range is placed over the mounted
// article when the page makes the selection (`placeSelection`), its anchor
// at the span's start — owed until the frame stands the span's first and
// last lines, where no part held them — and again after a remount (the
// reveal, a lens, a delivery), since a remount rebuilds the element and the
// platform's range dies with the old one: read as the old article is taken
// down, the selection goes back with its anchor at the end it stood at, so
// the platform's own keys (D5 K-71) go on extending it from there; the
// platform carries no "no direction yet" for a selection a pointer made, so
// put back it extends from its anchor, as one a key extended does. The
// platform holds one selection, and no remount takes it from the person: a
// selection standing outside the layer — a drag in a reading scene's pane,
// over an overlay's text — is theirs, whenever they made it, and the page's
// goes back only where the platform's is collapsed, absent or in the layer,
// so the copy is of what the person chose (`placeAgain`).
// The reading scene's panes borrow the mount (`sceneArticle`; FP-12; the
// structure record §3.4 (vii)): each pane's article is made here,
// T-ARTICLE's scene-mode variant laid out by the pane's own style — one
// column at the plane's measure — from a record and the view it draws
// (`sceneView`), which the scene keeps so a pane is set again from them with
// no read (SC; FP-23), and what it was made from is kept beside it as a
// mounted article's is (`madeOf`) — its document's blocks, runs and image as
// the model held them, which the model replaces whole and never edits in
// place, so they stay the article's own while it stands. Every position in
// an article is mapped through them (`rangeIn`): the scene finds a passage
// in a pane so, and the platform's selection there is read and put back over
// the same bytes (`selectionIn`, `selectIn`). The copy of any selection in
// an article — a mounted one, or a pane's (foundations §2.4, §2.5) —
// replaces the clipboard and carries the passage's board and address beside
// the plain text and never in it, in a flavor only a skep client reads
// (`onCopy`; FP-24): the plain text is the span's items in the text's order,
// as the article was made from them (T-ARTICLE's `copyText`), no label of
// the page among them — a range that starts in an article's head starts at
// its first block, and a range that touches an item covers it whole
// (`posOfPoint`), as it is drawn. The gate's hooks read the mounted set and
// the mount log (`mountedSet`, `mounts`); APP records each frame's counts
// (`frameStats`).
// Rules: FP-1, FP-2, FP-8, FP-10, FP-12, FP-20, FP-21, FP-22, FP-23, FP-24,
// FP-26, FP-29, FP-30, FP-34.

import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as FOCUS from '../nav/focus.js';
import { cam, sx, sy, wx, wy, viewport, visibleView, markDirty, reach, reanchor, reanchored, measure, fit, landingPx } from '../plane/camera.js';
import { MOUNT_EM, UNMOUNT_EM, MOUNTS_PER_FRAME, LOD_TXT_LO } from '../plane/lod.js';
import { docBox, intersects, clearLeftOf } from '../plane/projection.js';
import { layoutOf, fold, estimate, slot, boundsOf, padded, outlineRects, firstRow, placeOf as placeIn, posAt as posIn, pageTarget as pageIn, windowIn as foldWindow, holdOf, isSpace, columnOfLine, columnAt, MEASURE_CPL, LAY_FS, LINE_H, EDGE, GUTTER, CHAR_W } from '../plane/layout.js';
import { CORNER, HOLD, COL, ADDRESS, cornerWidth } from '../plane/register.js';
import { holdTop, heldContents, apartTexts, across, lineHeight, face, inFace, plain, runsOf, figuresOf, figureCell, runWidth } from '../plane/labels.js';
import { articleHTML, articlePlan, cornerHTML, blockMarks, symbolLit, editionClause, copyText, firstLineOf } from './article.js';
import { farSays } from '../beams/held.js';
import { homeOf, documentOf, memberOf } from '../model/address.js';
import { posOfChar, charOfPos, sameSpan, CHROME } from './span.js';
import { esc } from '../util.js';
import { t, facedHTML, CLIENT_CLOSE } from '../strings.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('../model/frames.js').Run} Run */
/** @typedef {import('./article.js').ArticleView} ArticleView */
/** @typedef {import('./span.js').Span} Span */
/** @typedef {import('../plane/layout.js').Fold} Fold */
/** @typedef {import('../plane/layout.js').Line} Line */
/** @typedef {import('../plane/layout.js').Row} Row */
/** @typedef {{x: number, y: number, w: number, h: number}} Rect */

/**
 * @typedef {Object} Made — what an article was made from: its document, and the blocks, runs and image the model held of it as the article was made. The model replaces a document's blocks, runs and image whole and never edits them in place, so these stay the article's own while it stands, whatever the model has delivered since: every position in the article is mapped through them (`rangeIn`), a copy takes its bytes from them (`onCopy`), and a reader's place in it is carried by its bytes' identity into the text it is set again as (`readingNow`; SC's pane set again — FP-23)
 * @property {string} addr the document — for a reading scene's pane, the address its acts name (`sceneArticle`)
 * @property {Block[]} blocks
 * @property {Run[]} runs
 * @property {import('../model/records.js').ImageRun[]} image its V→I image: the permanent address of every position it covers
 */

/**
 * @typedef {Object} BlockPart — a block's element in a part of a mounted article: the block whole, or the stretch of it the part holds
 * @property {HTMLElement} el
 * @property {Block} b
 */

/** @typedef {{pos: number, char: number, top: number, left: number}} BlockTop a block part's offset in the one 16 px layout, by its block and the character it starts at (the gate's span registration) */

/**
 * @typedef {Object} Part — a run of lines of one column of a mounted article's fold standing as text: its box (`.col`), placed at its first line's top
 * @property {number} column its column, an index into the fold's columns
 * @property {number} first its first line, an index into the fold's lines
 * @property {number} end one past its last line
 * @property {HTMLElement | null} el its box; null where the platform does not set the article (the node tests)
 * @property {BlockPart[]} blocks the block parts it holds, each with the block it shows
 * @property {BlockTop[]} tops each of them where it stood as the part was set
 */

/**
 * @typedef {Object} Unit — a row element of an article and the lines it sets: the head, a block, a scene-offer
 * @property {number} first its first line, an index into the fold's lines
 * @property {number} end one past its last line
 * @property {Line['kind']} kind its lines' kind
 * @property {number | null} pos the block it is, by its first position; null for the head and a scene-offer
 * @property {number} k a scene-offer's index among the article's scene-offers; 0 for any other unit
 * @property {boolean} text a typed line, which a part may cut at any of its lines; any other unit is cut where the fold's columns cut it alone
 */

/**
 * @typedef {Object} Cut — the point a line opens at in its unit's element, as the platform set it (`lineStart`), carried to any copy of the article
 * @property {number[]} path the child indexes from the unit's element down to the point's node
 * @property {number} offset the point's offset in that node
 * @property {boolean[]} before for each element between the unit's element and the point, outermost first, whether any text stands in it before the point: a part ending at the cut leaves out the first that holds none, and a part starting at the cut takes a run's opening where none does
 * @property {number} char the unit's own characters before the point, its chrome apart: the character a part starting there starts at
 */

/**
 * @typedef {Object} Mounted
 * @property {HTMLElement} el
 * @property {Doc} d
 * @property {number} lay the layout scale: layout px per world unit
 * @property {number} runFrom
 * @property {number} runTo
 * @property {number} rev the document's revision at mount
 * @property {Made} made what the article was made from
 * @property {number} grev the view revision at mount
 * @property {Fold} fold the fold it was set in: its size, its columns and the lines they hold
 * @property {number} fs the document's em in world units: its fold's
 * @property {{whole: string, compact: string}} corner the corner's items at mount, whole and compact (T-ARTICLE's `cornerHTML`); empty where it has none
 * @property {HTMLElement | null} template the article's one column, kept out of the page: what its parts are cut from; null where the platform does not set the article
 * @property {Unit[]} units its fold's lines by the row elements that set them
 * @property {Map<number, Cut | null>} cuts the points its lines open at, by line, as far as they were read; null where a line opens at no point found
 * @property {Part[]} parts what stands of it, in its lines' order
 * @property {Set<number>} lines the lines its parts hold
 * @property {boolean} banded it stands in the mount band: its em stood at 6.5 and above as it mounted, and has stood at 5.5 and above since, where its place lets it mount — its lines in view stand; else it stands for the lines that hold the selection or the focus alone
 * @property {number} scale the scale its transform was set at (`place`): 1 before it is placed
 * @property {BlockTop[]} blockTops where each block part standing stood as its part was set (the gate's span registration)
 * @property {BlockPart[]} marked each block part standing with the block it shows: the elements the selection's and the focus's marks stand on
 * @property {string} markedFor the selection and the focus its blocks are marked for (`marksKey`); '' where a part set since awaits its marks
 * @property {string | null} litFor the links lit its symbols are marked heavier for (`markLit`); null where a part set since awaits its marks
 * @property {boolean | null} labelFor whether its byline's cut label is marked open (`markLabel`); null where a part set since awaits its mark
 * @property {boolean} legible it takes the pointer: its em stood at P-LOD's readable threshold or above at the last frame no press stood through (`markLegible`)
 */

/**
 * @typedef {Object} Corner — a document's corner on the plane: its element beside the article, kept across the article's remounts
 * @property {HTMLElement} el
 * @property {string} html the items it shows
 * @property {boolean} compact it stands compact (FP-26)
 * @property {number} column the column it stands beside, an index into the fold's columns
 * @property {number} cap the widest it may stand (px): the room beside the column's text, gaps taken; Infinity where its form's width fits there
 * @property {number} w its width as laid out (px)
 * @property {number} h its height as laid out (px)
 * @property {number} x its left edge as last placed, on screen (px): its document's held label stands clear of it
 * @property {number} y its top as last placed, on screen (px)
 * @property {boolean} stale its items or its cap changed since it was measured
 * @property {boolean} mine it is the focused document's: the Tab stop
 * @property {number} blockedAt the column beside which the signs in the edge before it left it no room down to its row's foot, where it stands by its row's first column while the view's centre stays over that column; -1 where none
 */

/**
 * @typedef {Object} Beside — the column a corner stands beside and the room left of that column's text (`besideOf`)
 * @property {number} column an index into the fold's columns
 * @property {number} room the room for the corner left of the column's text, its gaps taken (px)
 * @property {boolean} first the column is the first of its row: the room the strip left of the document's box gives it, which no other document's box reaches into (P-PROJ's `clearLeftOf`)
 */

/** @typedef {'whole' | 'compact'} CornerForm */

/**
 * @typedef {Object} HeldLabel — a mounted document's label held below the one line (`placeHeld`): its element in the corner layer, kept across frames
 * @property {HTMLElement} el
 * @property {string} html its parts, each where its line sets it
 * @property {string} place where it stands, how wide and tall, and its ground, as last written
 */

/**
 * @typedef {Object} Folded — a document's fold as `foldOf` last set it
 * @property {string} key the revisions it was read at: the document's, its run's, the model's, the view's
 * @property {string} plan what it was folded from: the extent, the positions held, the plans as JSON, the lines measured
 * @property {Fold} fold
 * @property {boolean} set its lines are the platform's: the article as its plan stands now was set (`measureLines`)
 */

/**
 * @typedef {Object} Measured — a document's lines as the platform set them (`measureLines`)
 * @property {string} key the article they were set from and the measure its column was set at (`layoutKey`): one article at one measure sets one layout, whatever selection or focus marks it and whatever counts its edges hold
 * @property {Line[]} lines
 * @property {number} n its serial: a fold made from other lines is made again
 */

/**
 * @typedef {Object} Hold — the passage being read as its box's article was taken down to be set again (see the head): the one at the visible view's centre, or the line a version move names
 * @property {string} addr the document whose article, mounted fresh, takes it: the same document set again, or the version its box takes
 * @property {Fold} fold the fold it stood in
 * @property {{x: number, y: number}} p where it stood, in world units relative to the room
 * @property {{from: number, to: number} | null} pair the position of `fold` whose line it stood on and the position of `addr`'s that takes that line (a version move); null where its bytes' identity names it (`ids`), else the same position (P-LAY's `holdOf`)
 * @property {number | null} pos the position whose line it stood on: the one that line opens at (P-LAY's `posAt`), or, carried from a re-set by position, the one whose line that re-set placed (`still`) — the one `ids` is read from
 * @property {ISpan[]} ids the byte `pos` names, by identity, read through the image the article was made from (M-REC's `identityIn`): where the text set again holds it now is the line that takes the passage's (FP-8, FP-23) — none where that image did not cover it
 * @property {{x: number, y: number, scale: number} | null} left the camera as a re-set whose text came before its image left it, by position: `ids` kept for the re-set the image's arrival makes, while the camera stands there (`still`); null where it is no such hold
 */
/**
 * @typedef {Object} Reading — the passage a view reads (`readAt`), by value — positions, a byte's identity and a place, no fold and no words: what N-TRAIL keeps beside an entry's view, so a return lands on that passage wherever its document was set since (`keptAt`)
 * @property {string} addr the document: the version its box showed
 * @property {number} pos the position the line under the view's visible centre opens at (P-LAY's `posAt`)
 * @property {ISpan[]} ids that position's byte by identity, through the document's held image (M-REC's `identityOf`); none where the image did not cover it
 * @property {{x: number, y: number}} p the visible centre, in world units relative to the room
 * @property {{x: number, y: number}} line where the fold set that position's line, in world units relative to the room (P-LAY's `placeOf`)
 * @property {number} fs the fold's em, in world units
 */
/** @typedef {import('../model/records.js').ISpan} ISpan */

/**
 * @typedef {Object} Readers — what the layer reads of other owners' state, handed in once by the app (FP-10: through the owners' exports)
 * @property {() => (Span | null)} selection the selection (O-SELECTION's span)
 * @property {() => ({addr: string, pos: number} | null)} focus the focused block (N-WALK's)
 * @property {() => number} top the one line's bottom edge on screen (L-LINE's): the corners and the held labels hold below it, and the visible view stands below it
 * @property {() => void} handOff the focus's next home where a corner that held it leaves: the walk's current item (D5 §4 rule 4)
 * @property {() => (string | null)} navigated the place just navigated to: the trail's current entry's (N-TRAIL's), first in the limit's order where it is a document
 * @property {(addr: string) => string} shown the version a document's box shows (N-GO's `shownIn`): the one version whose article stands there
 * @property {() => (string | null)} named the document the one line names, by its box (L-LINE's `named`): the one whose label is never held over its text; null where it names none
 * @property {(account: string) => boolean} region is an account named in view: the one line names it, or the canvas's last frame set its label (P-RENDER's `regionNamed`) — a held label's address drops its prefix there alone (P-LABEL's region rule)
 */

/** the corner's distance from the text column, and from the edge of the room it stands in (px): P-REG's */
const CORNER_GAP = CORNER.gap;
/** the time a frame gives the setting of documents in view that stand unmounted, so their bars are their lines as set (ms) */
const MEASURE_BUDGET_MS = 6;
/** the em, in px, the canvas draws a document's bars from (P-RENDER's): below it no bar stands, and no line is set for one */
const BARS_EM = 3;

/** @type {Map<string, Mounted>} */
const mounted = new Map();
/** @type {WeakMap<HTMLElement, Made>} what each reading scene's pane's article was made from, by its element (`sceneArticle`), for as long as the element lives */
const panes = new WeakMap();
/** @type {Map<string, Corner>} the corners on the plane, by document */
const corners = new Map();
/** @type {Set<string>} the documents whose corner a reader's act opened whole (`openCorner`), until it is closed or leaves */
const openWhole = new Set();
/** @type {Set<string>} the documents whose byline's cut label a reader's act opened whole (`openLabel`), until the act again closes it */
const openLabels = new Set();
/** @type {Map<string, HeldLabel>} the labels held over mounted articles, by document */
const helds = new Map();
/** the measure the layer's style holds (`setMeasure`): what the columns of the articles it lays out are set at; 0 before it holds one */
let styled = 0;
/** @type {Map<string, Folded>} each document's fold, by document — a cache of `foldOf`, a function of the model and of the lines set */
const folds = new Map();
/** @type {Map<string, Measured>} each document's lines as the platform set them, by document */
const measured = new Map();
let serial = 0;
/** @type {Array<{addr: string, ms: number, blocks: number, emPx: number, columns: number, lines: number, measureMs: number, partMs: number}>} the mount costs (a forced layout inside the measurement — S1): the setting of its lines where they were not set, and the cutting of the parts it first stands in, among them */
const mountLog = [];
/** the mount log, for the gate's figures */
export const mounts = () => mountLog.slice();
/** the documents the last frame mounted afresh — a rebuild apart — the ones standing in the mount band, and the lines standing of every article */
const last = { mounted: 0, standing: 0, lines: 0 };
/** what the last frame stood, for the frame buffer the gate reads: its new mounts, the articles standing in the mount band, the lines standing */
export const frameStats = () => ({ ...last });
/** @type {HTMLElement | null} */
let layer = null;
/** @type {HTMLElement | null} */
let cornerLayer = null;
/** does the platform set the articles here — their lines measured and their parts cut from them; else (the node tests) the lines P-LAY predicts, the article's HTML standing whole and its parts the runs of lines alone */
let engine = false;
/** the view revision: the reveal and the lenses, which change the links an article draws — a bump remounts; the selection and the walk's focus never bump it, their blocks marked in place (`markBlocks`) */
let grev = 0;
/** does a press stand on the layer: the button went down on an article and the press has not ended */
let pressed = false;
/** @type {{span: Span, backward: boolean} | null} the platform's selection as it stood over an article as the article was taken down — its bytes, and whether it ran backward — until the frame puts the page's selection back (`placeAgain`): the end its anchor goes back at, where it covered the same bytes, and never whether it goes back */
let kept = null;
/** @type {Span | null} the page's selection while no range stands over it: its first or last line stood in no part as the page made it, and the frame stands them (`placeAgain`) */
let owed = null;
/** @type {Hold | null} */
let hold = null;
/** the box an address stands in: its document's, which every version of it shares */
const boxOf = (/** @type {string} */ addr) => documentOf(addr) || addr;
/** the readers until the app hands its owners' in: no selection and no focus, the line at the viewport's top, nowhere navigated, every box showing its plain address, no document and no account named */
const noReaders = () => /** @type {Readers} */ ({ selection: () => null, focus: () => null, top: () => 0, handOff: () => {}, navigated: () => null, shown: boxOf, named: () => null, region: () => false });
/** @type {Readers} */
let read = noReaders();
/** is a version the one its box shows (see the head)? */
const isShown = (/** @type {string} */ addr) => read.shown(addr) === addr;

/**
 * @param {HTMLElement} el the text layer's element
 * @param {HTMLElement | null} cornersEl the corner layer's
 * @param {{measure?: boolean}} [opts] `measure` the platform sets the articles: their lines measured as rendered and their parts cut from them (the page; the node tests run without)
 */
export function attach(el, cornersEl, opts = {}) { layer = el; cornerLayer = cornersEl; engine = !!opts.measure; styled = 0; }
/**
 * The plane covered and uncovered (D5 §4 rule 5): while chrome stands over
 * the plane — the reading scene, whose panes carry their own corners — the
 * corner layer is `inert`, so neither Tab nor assistive technology reaches
 * the focused document's corner under it.
 * @param {boolean} on chrome covers the plane (true) or has left it (false)
 */
export function cover(on) { if (cornerLayer) FOCUS.cover(cornerLayer, on); }
/** the owners hand their readers in once; a reader left out reads as the default does (`noReaders`) */
export function readers(/** @type {Partial<Readers>} */ r) { read = { ...noReaders(), ...r }; }
/** the block the `lit` mark stands on (D3): the walk's focused block while the ring is drawn — the plane holds the focus and a key moved it — else none; never in a scene's pane */
const litFocus = (scene = false) => (!scene && FOCUS.ringShown() ? read.focus() : null);
/** bump the view revision: every mounted article is rebuilt on the next frame */
export function bump() { grev++; }
export const revision = () => grev;
/**
 * The press rule's text half (§2.4): a press on an article stands from its
 * button going down to its end — the button's release, the platform's
 * cancel, a context menu — and while it stands `frame` rebuilds no standing
 * article, places no range and leaves each standing article taking the
 * pointer or not as it stood (`markLegible`), the parts the drag meets held,
 * so the drag keeps the nodes it is anchored in (R11's one continuous
 * gesture). APP-INPUT reports both. A press's end marks the frame dirty, so
 * the next frame does what was held; ending none changes nothing.
 * @param {boolean} on the press starts (true) or ends (false)
 */
export function press(on) { if (pressed && !on) markDirty(); pressed = on; }
/** does a press stand on the layer? */
export const pressing = () => pressed;
/** the articles standing — in the mount band, or for the lines that hold the selection or the focus alone — read-only */
export const mountedSet = () => mounted;
/** does a document's article stand in the mount band (see the head): its lines in view standing as text */
export const isMounted = (/** @type {string} */ addr) => { const rec = mounted.get(addr); return !!rec && rec.banded; };
/**
 * The lines of a document standing as text, and the fold they stand in —
 * P-RENDER draws a bar for no line that stands, and yields the whole document
 * where its article stands in another fold (a stale one a press holds); null
 * where no article of it stands.
 * @param {string} addr
 * @returns {{fold: Fold, lines: Set<number>} | null}
 */
export function standing(addr) { const rec = mounted.get(addr); return rec ? { fold: rec.fold, lines: rec.lines } : null; }
/** does a line of a document's fold stand as text (the frame buffer's count of bars drawn over text, and of lines yielded to none) */
export const lineStands = (/** @type {string} */ addr, /** @type {number} */ i) => { const rec = mounted.get(addr); return !!rec && rec.lines.has(i); };
/**
 * What stands of a document's article: its parts, each a column and a run of
 * its fold's lines, in their lines' order; null where none stands.
 * @param {string} addr
 * @returns {Array<{column: number, first: number, end: number}> | null}
 */
export function mountedLines(addr) { const rec = mounted.get(addr); return rec ? rec.parts.map((p) => ({ column: p.column, first: p.first, end: p.end })) : null; }

/** @type {CanvasRenderingContext2D | null | undefined} the context words are measured by as the platform sets them, made at its first use; null where the platform gives none (the node tests) */
let measurer;
/** @type {Map<string, number>} the widths measured, by face, weight, size and words, and each size's figure cell — dropped as a face arrives (`refaced`) */
const widths = new Map();

/** the measuring context (`measurer`) */
function measuring() {
  if (measurer === undefined) {
    const c = typeof document !== 'undefined' && typeof document.createElement === 'function' ? document.createElement('canvas') : null;
    measurer = c && typeof c.getContext === 'function' ? c.getContext('2d') : null;
  }
  return measurer;
}

/** the client's widest figure at a size and weight, in px: the cell each of its figures stands in, on the canvas and in a held label (P-LABEL's `figureCell`) */
function cellAt(/** @type {CanvasRenderingContext2D} */ c, /** @type {number} */ px, /** @type {string} */ weight) {
  const key = `cell|${weight}|${px}`;
  let w = widths.get(key);
  if (w === undefined) { w = figureCell(c, px, weight); widths.set(key, w); }
  return w;
}

/**
 * A run's width set at a size and weight in a face, in px, as the platform
 * sets it (P-LABEL's `Measure`): the canvas's measure in the face's stack
 * (P-REG's FACE), the client's figures each in a cell as wide as its widest
 * (P-LABEL's `runWidth`); where the page has no canvas, every character one
 * advance of the reading face (P-LAY's `CHAR_W`), as the plan counts it.
 * @param {string} text
 * @param {number} px
 * @param {string} weight
 * @param {import('../plane/register.js').Face} f
 * @returns {number}
 */
function measureRun(text, px, weight, f) {
  const c = measuring();
  if (!c) return [...text].length * CHAR_W * px;
  const key = `${f}|${weight}|${px}|${text}`;
  let w = widths.get(key);
  if (w === undefined) {
    if (widths.size >= 20000) widths.clear();
    w = runWidth(c, { text, face: f }, px, weight);
    widths.set(key, w);
  }
  return w;
}

/**
 * A string's width set in a face at 1 em, in em, as the platform sets it
 * (T-ARTICLE's `Measure`): the article's every fit reads it.
 * @param {string} text
 * @param {import('../plane/register.js').Face} f
 */
export const widthOf = (text, f) => measureRun(text, LAY_FS, 'normal', f) / LAY_FS;

/** a held label's run as markup, in its face as the canvas sets it: the client's figures each centred in its cell (`cellAt`), so its width is the one measured; an address in the title's ink, never greyed (P-LABEL's head) */
function runHTML(/** @type {import('../plane/labels.js').Run} */ r, /** @type {number} */ px, /** @type {string} */ weight) {
  const c = measuring();
  const body = r.face === 'client' && c ? figuresOf(r.text).map((x) => (x.figures ? [...x.text].map((d) => `<span style="display:inline-block;width:${cellAt(c, px, weight)}px;text-align:center">${d}</span>`).join('') : esc(x.text))).join('') : esc(r.text);
  return `<span style="font:${face(px, weight, r.face)}${r.face === 'ident' ? `;color:${COL.title}` : ''}">${body}</span>`;
}

/**
 * Every face arrived since the articles were set, a re-set (FP-8, FP-12;
 * APP's, as a face loads late): the widths measured, the lines the platform
 * set and the folds made of them dropped, so every standing article goes
 * stale and is set again in its place, the passage being read held (`frame`).
 */
export function refaced() { widths.clear(); measured.clear(); folds.clear(); markDirty(); }

/** the article's view state, from the owners' readers and LK: a byline's facts the model's for its owner's account (M-REC's `accountKey`), never this device's key; every fit it judges measured as the platform sets the words (`widthOf`) */
export function viewFor(/** @type {Doc} */ d, scene = false) {
  const h = REC.health();
  /** @type {Map<string, 'edition' | 'draft' | 'unknown'>} */
  const originKinds = new Map();
  for (const o of d.origins) { const od = REC.doc(o.doc); const p = REC.place(o.doc); originKinds.set(o.doc, p ? p.kind : od.meta ? (od.meta.published ? 'edition' : 'draft') : od.kind); }
  /** @type {ArticleView} */
  const v = {
    selected: read.selection(), focus: litFocus(scene),
    marks: LK.shown(d.addr), mergedMark: LK.mergedMark, symbols: LK.symbols(d.addr), says: farSays, countAt: (b) => LK.countAt(d.addr, b),
    wholeLinks: LK.wholeLinks(d.addr).length,
    reader: REC.reader(),
    localTrust: !!(h && h.auth && h.auth.local_trust),
    notebook: true,
    scene, originKinds,
    originOwner, clauseOf, keyOf: REC.accountKey,
    members: REC.has(boxOf(d.addr)) ? REC.doc(boxOf(d.addr)).members : null,
    cpl: scene ? MEASURE_CPL : measure(),
    measure: widthOf,
  };
  return v;
}

// ---- the fold ---------------------------------------------------------------------------------------------------

/**
 * The fold a document is set in on the plane (see the head): P-LAY's fold of
 * its article's lines — as the platform set them where they have been set
 * (`measureLines`), else as P-LAY predicts them — at the step that holds both
 * those lines and the plan carrying the most link chrome any reveal can set
 * in it (LK's `utmost`), the positions it does not hold estimated — those
 * between its held blocks in columns of their own, those after them after its
 * last line; P-LAY's estimate where its text has not arrived, its first
 * column slot where its extent is unread. Folded again only where the plans,
 * the extent, the positions held or the lines set changed, however often the
 * model moves. Every size it answers is one the camera's zoom-in bound
 * reaches (P-CAM's `reach`, E18 (a)) before any reader places a view on it —
 * a landing, the mount, the pointer's legibility — so no document is set
 * smaller than the camera can read it. The rise draws nothing: the camera's
 * clamp alone reads the bound.
 * @param {Doc} d
 * @returns {Fold}
 */
export function foldOf(d) {
  const f = folded(d);
  reach(f.fs);
  return f;
}

/** does an em of `fs` world units stand at P-LOD's readable threshold or above at a scale (see the head) */
const readsAt = (/** @type {number} */ fs, scale = cam.scale) => fs * scale >= LOD_TXT_LO;

/**
 * Is a document at reading scale (see the head): its own em — its fold's
 * size at the scale — at P-LOD's readable
 * threshold or above. The press rule, the one line and the walk's grain read
 * it here, so a click places, the line names a position and the walk takes a
 * span in the same documents.
 * @param {string} addr
 * @param {number} [scale] the scale it is read at: the camera's where none is given — a landing's or a flight's destination where the view is bound elsewhere
 * @returns {boolean}
 */
export function atReadingScale(addr, scale = cam.scale) { return readsAt(foldOf(REC.doc(addr)).fs, scale); }

/**
 * The fold `foldOf` answers (see there).
 * @param {Doc} d
 * @returns {Fold}
 */
function folded(d) {
  const room = docBox(d.addr), cpl = measure();
  if (d.from < 0) {
    const key = d.extent != null ? `est:${d.extent}:${cpl}` : `slot:${cpl}`;
    const f = folds.get(d.addr);
    if (f && f.key === key) return f.fold;
    const out = d.extent != null ? estimate(d.extent, room, cpl) : slot(room, cpl);
    folds.set(d.addr, { key, plan: key, fold: out, set: false });
    return out;
  }
  const key = `${d.rev}:${d.from}:${d.to}:${REC.rev()}:${grev}:${cpl}`;
  const f = folds.get(d.addr);
  if (f && f.key === key) return f.fold;
  const v = viewFor(d), owner = REC.ownerAccount(d);
  const now = articlePlan(d, v, owner);
  const m = measured.get(d.addr), set = m && m.key === layoutKey(d, v, owner, cpl) ? m : null;
  const u = LK.utmost(d.addr);
  const rows = articlePlan(d, { ...v, marks: u.shown, symbols: u.shown }, owner);
  const after = Math.max(0, (d.extent || 0) + 1 - d.to);
  const plan = `${cpl}|${d.extent}|${d.from}|${d.to}|${JSON.stringify(rows)}|${JSON.stringify(now)}|${set ? set.n : 0}`;
  if (f && f.plan === plan) { folds.set(d.addr, { key, plan, fold: f.fold, set: !!set }); return f.fold; }
  const opts = { after, heldTo: d.to, cpl };
  const most = fold(gapped(d, layoutOf(rows, cpl).lines), room, opts);
  const out = fold(gapped(d, set ? set.lines : layoutOf(now, cpl).lines), room, { ...opts, step: most.step });
  folds.set(d.addr, { key, plan, fold: out, set: !!set });
  return out;
}

/** no count at a block: what the lines' key reads every block's as */
const noCount = () => ({ n: 0, social: false });
/** no byline facts held: what the lines' key reads every byline as — its slots read, their boxes empty */
const unread = () => undefined;

/**
 * What a document's lines as the platform set them are kept by
 * (`Measured`): its article with no block marked for the selection or the
 * focus, no count in its edges and its byline's slots read, their boxes
 * empty — none of them sets a line, so a count's arrival leaves the lines as
 * they were set (A-254), and so does a byline's facts' (FP-34) — at the
 * measure its column was set at.
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} owner
 * @param {number} cpl
 */
const layoutKey = (d, v, owner, cpl) => `${cpl}|${articleHTML(d, { ...v, selected: null, focus: null, countAt: noCount, keyOf: unread }, owner)}`;

/**
 * The lines of an article with each block that follows positions the
 * document does not hold marked so (P-LAY's `Line.gap`): its first line breaks
 * a column, and those positions are estimated in columns of their own.
 * @param {Doc} d
 * @param {Line[]} lines
 * @returns {Line[]}
 */
function gapped(d, lines) {
  /** @type {Map<number, number>} the positions before each block the document does not hold, by the block's first position */
  const gaps = new Map();
  let end = 1;
  for (const b of d.blocks) { if (b.pos > end) gaps.set(b.pos, b.pos - end); end = Math.max(end, b.pos + b.width); }
  if (!gaps.size) return lines;
  return lines.map((l) => (l.pos != null && l.nth === 0 && gaps.has(l.pos) ? { ...l, gap: gaps.get(l.pos) } : l));
}

/**
 * A document's article as the plane sets its lines: T-ARTICLE's HTML with no
 * block marked for the selection or the focus, which set no line — the key the
 * lines the platform set are kept by (`Measured`), and the one column a mounted
 * article's parts are cut from, each part's blocks marked in place after
 * (`markBlocks`).
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} owner
 */
const articleOf = (d, v, owner) => articleHTML(d, { ...v, selected: null, focus: null }, owner);

/** what an article made from a document now is made from: the document's blocks, runs and image as the model holds them */
const madeFrom = (/** @type {Doc} */ d) => ({ addr: d.addr, blocks: d.blocks, runs: d.runs, image: d.image });

/** a document's outline's bounds, in world units (where the plane draws it): its fold's padded columns' */
export function shapeOf(/** @type {string} */ addr) {
  const box = docBox(addr), b = boundsOf(foldOf(REC.doc(addr)));
  return { x: box.x + b.x, y: box.y + b.y, w: b.w, h: b.h };
}

/**
 * A document's region, in world units (see the head): its outline's bounds
 * (`shapeOf`), which hold its label, its badge
 * and its blocks' counts, widened leftward by the strip its corner stands in
 * (P-PROJ's `clearLeftOf`), which no other document's box reaches into — so
 * the regions of two documents in their own cells never overlap.
 * @param {string} addr
 * @returns {Rect}
 */
export function regionOf(addr) {
  const s = shapeOf(addr), w = clearLeftOf(addr);
  return { x: s.x - w, y: s.y, w: s.w + w, h: s.h };
}

/** the visible view in world units: the viewport below the one line, unpadded — with the camera where it stands, or at a view it is bound for */
function seenWorld(/** @type {{x: number, y: number, scale: number} | null} */ at = null) {
  const s = visibleView(read.top());
  if (!at) return { x0: wx(s.x), y0: wy(s.y), x1: wx(s.x + s.w), y1: wy(s.y + s.h) };
  const { VW, VH } = viewport(), x = (/** @type {number} */ px) => (px - VW / 2) / at.scale + at.x, y = (/** @type {number} */ py) => (py - VH / 2) / at.scale + at.y;
  return { x0: x(s.x), y0: y(s.y), x1: x(s.x + s.w), y1: y(s.y + s.h) };
}

/** the visible view's centre in world units — the viewport's below the one line — with the camera at a view (`readAt`) */
function centreAt(/** @type {{x: number, y: number, scale: number}} */ at) {
  const v = seenWorld(at);
  return { x: (v.x0 + v.x1) / 2, y: (v.y0 + v.y1) / 2 };
}

/**
 * Does a document stand in the visible view (see the head): its region meeting
 * the viewport below the one line, unpadded — any of its text or box, or the
 * strip its corner stands in.
 * @param {string} addr
 */
export function inView(addr) { return intersects(regionOf(addr), seenWorld()); }

/**
 * The visible view's window over a document (P-LAY's `windowIn`): the
 * positions its fold's lines in view open at, the first and the last, and
 * whether the view has run past its start or its end; null where no line in
 * view names a position.
 * @param {string} addr
 * @returns {import('../plane/layout.js').Window | null}
 */
export function windowIn(addr) {
  const box = docBox(addr), v = seenWorld();
  return foldWindow(foldOf(REC.doc(addr)), { x0: v.x0 - box.x, y0: v.y0 - box.y, x1: v.x1 - box.x, y1: v.y1 - box.y });
}

/** a document's outline's bounds, in world units (`shapeOf`) */
const shapeIn = (/** @type {Doc} */ d) => shapeOf(d.addr);
/** the outline's bounds of a fold of a document's, in world units */
const shapeAt = (/** @type {string} */ addr, /** @type {Fold} */ f) => { const box = docBox(addr), b = boundsOf(f); return { x: box.x + b.x, y: box.y + b.y, w: b.w, h: b.h }; };

/**
 * The middle of the line holding a position, in world units: centred across
 * its column (P-LAY's `placeOf`); the first column's centre where no position
 * is named — what a reading view frames (`frameOf`) and Back's test of a
 * line in view reads (`lineInView`).
 * @param {string} addr
 * @param {number | null} pos
 * @returns {{x: number, y: number}}
 */
export function centreOf(addr, pos) {
  const f = foldOf(REC.doc(addr)), box = docBox(addr);
  if (pos == null) { const c = f.columns[0]; return { x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2 }; }
  const p = placeIn(f, pos);
  return { x: box.x + p.x + p.w / 2, y: box.y + p.y + p.h / 2 };
}

/**
 * Where a reading view of a document at a position centres so that it frames
 * the column (FP-26): the line holding the
 * position (`centreOf`) — the first column's middle where none is named —
 * moved across so the column's text, the corner beside it on its left in the
 * form its room and the view's fit hold at that size (`roomBeside`,
 * `formFor`; none where the corner stands by its row's first column instead)
 * and its edge on its right stand centred together; where none is named and
 * the visible view below the one line holds less than the first column's
 * depth, moved down so the column's outline tops the visible view and the
 * document's head stands in it, never under the line (FP-29). N-GO's landing
 * and N-WALK's flight to a span read it; the measure in force is one the view
 * holds them at, at the landing's em (P-LAY's `fitFor`, P-CAM's `landingPx`).
 * @param {string} addr
 * @param {number | null} pos
 * @param {number} [fsPx] the em the view reads the document at, in px: the landing's where none is given
 * @returns {{x: number, y: number}}
 */
export function frameOf(addr, pos, fsPx = landingPx()) {
  const f = foldOf(REC.doc(addr)), c = centreOf(addr, pos), scale = fsPx / f.fs;
  const at = roomBeside(f, clearLeftOf(addr), pos == null ? 0 : Math.max(0, placeIn(f, pos).column), scale);
  const corner = at.first || at.room >= cornerWidth(true) ? cornerWidth(formFor(at.room, false, fit().compact) === 'compact') + CORNER_GAP : 0;
  const x = c.x + (EDGE * fsPx - corner) / 2 / scale, seen = visibleView(read.top()), first = f.columns[0];
  if (pos != null || first.h * scale <= seen.h) return { x, y: c.y };
  const { VH } = viewport();
  return { x, y: docBox(addr).y + first.y - (GUTTER / 2) * f.fs + (VH / 2 - seen.y) / scale };
}

/**
 * Does the line holding a position stand in the visible view with the camera
 * at a view — its centre (`centreOf`) inside the viewport below the one line
 * there: N-GO's Back, which returns the focus to where the step it crossed
 * began only where the view it lands at shows it.
 * @param {string} addr
 * @param {number} pos
 * @param {{x: number, y: number, scale: number}} view
 * @returns {boolean}
 */
export function lineInView(addr, pos, view) {
  const c = centreOf(addr, pos), v = seenWorld(view);
  return c.x >= v.x0 && c.x <= v.x1 && c.y >= v.y0 && c.y <= v.y1;
}

/**
 * The position under a world point of a document's fold (P-LAY's `posAt`):
 * N-WALK's re-take at reading scale; null where the column under it holds
 * no line naming one.
 * @param {string} addr
 * @param {number} x
 * @param {number} y
 */
export function posAt(addr, x, y) { const box = docBox(addr); return posIn(foldOf(REC.doc(addr)), x - box.x, y - box.y); }

/** does a world rect hold a point? */
const holds = (/** @type {Rect} */ r, /** @type {{x: number, y: number}} */ p) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;

/** the visible view's centre, in world units: the viewport's below the one line */
function viewCentre() { const s = visibleView(read.top()); return { x: wx(s.x + s.w / 2), y: wy(s.y + s.h / 2) }; }

/**
 * The document whose outline holds a world point: a mounted one first, else
 * one whose text the model holds and whose box shows it; null where none
 * does.
 * @param {{x: number, y: number}} p
 * @returns {Doc | null}
 */
function docAt(p) {
  for (const rec of mounted.values()) if (holds(shapeAt(rec.d.addr, rec.fold), p)) return rec.d;
  for (const d of REC.docs()) if (d.from >= 0 && !d.system && isShown(d.addr) && holds(docBox(d.addr), p) && holds(shapeIn(d), p)) return d;
  return null;
}

/**
 * Where the paging key continues at reading scale (FP-12; P-LAY's
 * `pageTarget`): the document under the visible view's centre at its readable
 * em or above, the view over a column whose foot it shows (PageDown) or whose
 * top it shows (PageUp) — the view that brings the next column's top, or the
 * previous one's, half a gutter below the one line, centred across it, at
 * the scale it stands at; null where the paging pages as it does elsewhere.
 * @param {1 | -1} dir 1 PageDown, -1 PageUp
 * @returns {{x: number, y: number, scale: number} | null}
 */
export function pageTarget(dir) {
  const { VH } = viewport();
  const seen = visibleView(read.top());
  const d = docAt(viewCentre());
  if (!d) return null;
  const f = foldOf(d), box = docBox(d.addr);
  if (!readsAt(f.fs)) return null;
  const to = pageIn(f, { x0: wx(seen.x) - box.x, y0: wy(seen.y) - box.y, x1: wx(seen.x + seen.w) - box.x, y1: wy(seen.y + seen.h) - box.y }, dir);
  if (!to) return null;
  return { x: box.x + to.x, y: box.y + to.top + (VH / 2 - seen.y) / cam.scale, scale: cam.scale };
}

// ---- setting an article -----------------------------------------------------------------------------------------

/** the article's element and the one column its flow is first laid out in, its HTML in it */
function articleEl(/** @type {Doc} */ d, /** @type {string} */ html) {
  const el = document.createElement('article');
  el.className = 'dtext';
  el.dataset.addr = d.addr;
  el.style.fontSize = LAY_FS + 'px';
  el.style.lineHeight = String(LINE_H);
  el.setAttribute('aria-hidden', 'true'); // the ARIA mirror is the one accessible rendering (S1 Q7)
  const col = document.createElement('div');
  col.className = 'col';
  col.innerHTML = html;
  el.appendChild(col);
  return { el, col };
}

/** the typed lines' elements a column breaks inside, as P-LAY's 'lines' keep does: no empty document's line */
const PARAGRAPH = 'p.sp:not(.empty)';
/** a text block's elements: the typed lines, the empty document's line */
const TEXT_BLOCK = 'p.sp';

/**
 * An article's lines as the platform set them in one column at the measure
 * (see the head): each row's element — the head, each block, each
 * scene-offer — read for its top and its height. A text block's lines are
 * the ones it sets: as many as its height holds at its own pitch, each read
 * where it begins and where its ink begins and ends (`setIn`), the room left
 * below them a line of no ink; any other unit's are the lines the plan sets
 * in it (P-LAY's `layoutOf`), standing where the element stands — those that
 * fit, where it is set shorter, and where it is set taller the room left a
 * line of no ink. A line of no ink names no position, a typed line's first
 * line apart, which names its block's first. Every line keeps where a column
 * may break before it, a typed line broken two lines in from either end.
 * @param {HTMLElement} col the column, laid out
 * @param {Row[]} rows the plan its article was made from
 * @param {Block[]} blocks the blocks it was made from
 * @param {number} cpl the measure its column was set at
 * @returns {Line[]}
 */
function measureLines(col, rows, blocks, cpl) {
  const P = layoutOf(rows, cpl).lines;
  const box = col.getBoundingClientRect(), top0 = box.top;
  /** @type {Array<{el: HTMLElement, lines: Line[]}>} each row element and the lines the plan sets in it */
  const groups = [];
  let i = 0;
  const hd = /** @type {HTMLElement | null} */ (col.querySelector(':scope > .hd'));
  if (hd) { const g = []; while (i < P.length && P[i].kind === 'head') g.push(P[i++]); groups.push({ el: hd, lines: g }); }
  const run = col.querySelector(':scope > .run');
  for (const child of run ? [...run.children] : []) {
    const el = /** @type {HTMLElement} */ (child), g = [];
    if (el.classList.contains('offer')) { if (i < P.length && P[i].kind === 'chrome') g.push(P[i++]); while (i < P.length && P[i].kind === 'chrome' && P[i].nth > 0) g.push(P[i++]); }
    else { const pos = Number(el.dataset.pos); while (i < P.length && P[i].pos === pos && P[i].kind !== 'chrome' && P[i].kind !== 'head') g.push(P[i++]); }
    groups.push({ el, lines: g });
  }
  if (i < P.length && groups.length) groups[groups.length - 1].lines.push(...P.slice(i));
  /** @type {Line[]} */
  const out = [];
  const half = 0.5 / LAY_FS;
  for (const g of groups) {
    const r = g.el.getBoundingClientRect(), top = (r.top - top0) / LAY_FS, h = r.height / LAY_FS;
    const L = g.lines;
    if (!L.length) continue;
    const p0 = L[0].top;
    if (!g.el.matches(TEXT_BLOCK)) {
      // the plan's lines, standing at the element's top — those that fit it; a unit set taller keeps the room left as a line of no ink
      for (const l of L) if (l === L[0] || l.top - p0 + l.h <= h + half) out.push({ ...l, top: top + (l.top - p0) });
      const end = out[out.length - 1], deep = end.top + end.h - top;
      if (h - deep > half) out.push({ ...end, top: top + deep, h: h - deep, w: 0, ink: 0, nth: end.nth + 1, brk: false, at: null });
      continue;
    }
    // the lines the element sets: as many as its height holds at its own pitch, each where it begins, the room left below them a line of no ink
    const pitch = parseFloat(getComputedStyle(g.el).lineHeight) / LAY_FS || L[0].h;
    const m = Math.max(1, Math.floor(h / pitch + 1e-3)), extra = h - m * pitch;
    const inner = g.el.matches(PARAGRAPH), b = blocks.find((x) => x.pos === L[0].pos);
    const set = b ? setIn(g.el, b, m, r.top, pitch * LAY_FS, box.left) : null;
    for (let k = 0; k < m; k++) {
      const brk = k === 0 ? L[0].brk : inner && k >= 2 && m - k >= 2;
      out.push({ ...L[0], top: top + k * pitch, h: pitch, w: set ? set[k].w : cpl, ink: set ? set[k].ink : 0, nth: k, brk, at: set ? set[k].at : L[0].at });
    }
    if (extra > half) out.push({ ...L[0], top: top + m * pitch, h: extra, w: 0, ink: 0, nth: m, brk: false, at: null });
  }
  return out;
}

/**
 * Where each of the `m` lines a text block's element sets begins, and where
 * its ink begins and ends (`measureLines`): its first line at the block's
 * first position, its indentation with it, and each later one at the first of
 * the block's own characters, spaces and chrome apart, whose box's middle
 * lies below the line's top, carried to its byte position (T-SPAN's
 * `posOfChar`); its ink from the left edge of the first of them on the line
 * to the right edge of the last before the next line's first, from the
 * column's left, in characters of the body's face. A line holding none of the
 * block's own characters stands no ink, and names no position but where it is
 * the first. The block's characters are gathered once, and each line's first
 * found by halving.
 * @param {HTMLElement} el the block's element, laid out whole
 * @param {Block} b the block it shows
 * @param {number} m the lines it sets
 * @param {number} top its top, in client px
 * @param {number} pitch its line box, in client px
 * @param {number} left the column's left edge, in client px
 * @returns {Array<{at: number | null, w: number, ink: number}>}
 */
function setIn(el, b, m, top, pitch, left) {
  /** @type {Array<{node: Text, offset: number, len: number, char: number}>} */
  const atoms = [];
  let n = 0;
  for (const tn of textNodes(el)) {
    const s = tn.data;
    for (let i = 0; i < s.length;) { const len = /** @type {number} */ (s.codePointAt(i)) > 0xffff ? 2 : 1; if (!spaceAt(s, i)) atoms.push({ node: tn, offset: i, len, char: n + i }); i += len; }
    n += s.length;
  }
  const range = document.createRange();
  const rect = (/** @type {typeof atoms[number]} */ a) => { range.setStart(a.node, a.offset); range.setEnd(a.node, a.offset + a.len); return range.getBoundingClientRect(); };
  /** @type {number[]} each line's first character, an index into the atoms; their count where the line holds none */
  const firsts = [];
  let lo = 0;
  for (let k = 0; k < m; k++) {
    const y = top + k * pitch;
    let hi = atoms.length;
    while (lo < hi) { const mid = (lo + hi) >> 1, q = rect(atoms[mid]); if (q.top + q.height / 2 > y) hi = mid; else lo = mid + 1; }
    firsts.push(lo);
  }
  const em = (/** @type {number} */ x) => (x - left) / LAY_FS / CHAR_W;
  return firsts.map((a, k) => {
    const z = k + 1 < m ? firsts[k + 1] : atoms.length;
    if (a >= z) return { at: k === 0 ? b.pos : null, w: 0, ink: 0 };
    return { at: k === 0 ? b.pos : posOfChar(b, atoms[a].char), w: em(rect(atoms[z - 1]).right), ink: em(rect(atoms[a]).left) };
  });
}
/** is a character white space (P-LAY's `isSpace`), which opens no wrapped line and holds no ink */
const spaceAt = (/** @type {string} */ s, /** @type {number} */ i) => isSpace(/** @type {number} */ (s.codePointAt(i)));

/**
 * The point a line of a block opens at: the first character inside the
 * block's element, chrome included and spaces apart, whose box's middle lies
 * below `y` — a line opened by a symbol, a hairline's label or C-33's mark
 * opening before that chrome; null where no character lies below it.
 * @param {HTMLElement} el the block's element
 * @param {number} y the line's top, in client px
 * @returns {{node: Node, offset: number} | null}
 */
function lineStart(el, y) {
  /** @type {Array<{node: Text, offset: number, len: number}>} */
  const atoms = [];
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) {
    const s = /** @type {Text} */ (n).data;
    for (let i = 0; i < s.length;) { const len = /** @type {number} */ (s.codePointAt(i)) > 0xffff ? 2 : 1; if (!spaceAt(s, i)) atoms.push({ node: /** @type {Text} */ (n), offset: i, len }); i += len; }
  }
  const r = document.createRange();
  const mid = (/** @type {{node: Text, offset: number, len: number}} */ a) => { r.setStart(a.node, a.offset); r.setEnd(a.node, a.offset + a.len); const q = r.getBoundingClientRect(); return q.top + q.height / 2; };
  let lo = 0, hi = atoms.length;
  while (lo < hi) { const m = (lo + hi) >> 1; if (mid(atoms[m]) > y) hi = m; else lo = m + 1; }
  if (lo >= atoms.length) return null;
  const a = atoms[lo];
  const chrome = a.node.parentElement ? /** @type {HTMLElement | null} */ (a.node.parentElement.closest('.sym, .hairline, .pubmark')) : null;
  if (chrome && el.contains(chrome) && chrome !== el && a.offset === 0 && document.createTreeWalker(chrome, NodeFilter.SHOW_TEXT).nextNode() === a.node && chrome.parentNode) {
    return { node: chrome.parentNode, offset: [...chrome.parentNode.childNodes].indexOf(chrome) };
  }
  return { node: a.node, offset: a.offset };
}

/** the elements strictly inside `el` that hold a point, outermost first */
function pathTo(/** @type {Node} */ node, /** @type {HTMLElement} */ el) {
  /** @type {HTMLElement[]} */
  const out = [];
  for (let p = node.nodeType === Node.ELEMENT_NODE ? /** @type {HTMLElement} */ (node) : node.parentElement; p && p !== el; p = p.parentElement) out.unshift(p);
  return out;
}

/** the count of a block part's own characters: its text nodes', the chrome apart */
const ownLength = (/** @type {HTMLElement} */ el) => textNodes(el).reduce((n, tn) => n + tn.length, 0);

// ---- what stands: units, cuts, parts ----------------------------------------------------------------------------

/**
 * A fold's lines by the row elements that set them (`Unit`): the head's lines
 * one unit, each block's another, each scene-offer one of its own; a
 * typed line a unit a part may cut at any of its lines.
 * @param {Line[]} lines
 * @param {Block[]} blocks the blocks the article was made from
 * @returns {Unit[]}
 */
function unitsOf(lines, blocks) {
  const kinds = new Map(blocks.map((b) => [b.pos, b.kind]));
  /** @type {Unit[]} */
  const out = [];
  let offers = 0;
  lines.forEach((l, i) => {
    const prev = out[out.length - 1];
    if (prev && prev.kind === l.kind && prev.pos === l.pos && !(l.kind === 'chrome' && l.nth === 0)) { prev.end = i + 1; return; }
    out.push({ first: i, end: i + 1, kind: l.kind, pos: l.pos, k: l.kind === 'chrome' ? offers++ : 0, text: l.kind === 'text' && l.pos != null && kinds.get(l.pos) === 'para' });
  });
  return out;
}

/** the unit holding a line (the units in their lines' order, the line one of theirs) */
function unitAt(/** @type {Unit[]} */ units, /** @type {number} */ i) {
  let lo = 0, hi = units.length - 1;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (units[m].first <= i) lo = m; else hi = m - 1; }
  return units[lo];
}

/** a unit's element in an article's one column: the head, a block by its first position, the k-th scene-offer; null where the column holds none */
function unitEl(/** @type {HTMLElement} */ col, /** @type {Unit} */ u) {
  if (u.kind === 'head') return /** @type {HTMLElement | null} */ (col.querySelector(':scope > .hd'));
  const run = col.querySelector(':scope > .run');
  if (!run) return null;
  if (u.kind === 'chrome') return /** @type {HTMLElement | null} */ (run.querySelectorAll(':scope > .offer')[u.k] || null);
  return /** @type {HTMLElement | null} */ (run.querySelector(`:scope > [data-pos="${u.pos}"]`));
}

/**
 * The point line `i` of a unit opens at (`Cut`): read from the unit's element
 * laid out alone, out of sight, at the article's size and measure — a block
 * breaks its lines as it does in the article, for nothing outside it moves
 * them — at the first character, chrome included and spaces apart, below the
 * line's top (`lineStart`); kept for the article's life. Null where the line
 * opens at no point found.
 * @param {Mounted} rec
 * @param {Unit} u
 * @param {number} i
 * @returns {Cut | null}
 */
function cutOf(rec, u, i) {
  if (rec.cuts.has(i)) return rec.cuts.get(i) ?? null;
  /** @type {Cut | null} */
  let cut = null;
  const el = rec.template && layer ? unitEl(rec.template, u) : null;
  if (el && layer) {
    const { el: art, col } = articleEl(rec.d, '');
    art.style.visibility = 'hidden';
    const copy = /** @type {HTMLElement} */ (el.cloneNode(true));
    if (u.kind === 'head') col.appendChild(copy);
    else { const run = document.createElement('div'); run.className = 'run'; run.appendChild(copy); col.appendChild(run); }
    layer.appendChild(art);
    try {
      const lines = rec.fold.lines;
      const at = lineStart(copy, copy.getBoundingClientRect().top + (lines[i].top - lines[u.first].top) * LAY_FS);
      if (at) cut = portable(copy, at);
    } finally { art.remove(); }
  }
  rec.cuts.set(i, cut);
  return cut;
}

/**
 * A point in a unit's element carried to any copy of the article (`Cut`): its
 * path, which text stands before it in each element it lies in, and the
 * unit's own characters before it.
 * @param {HTMLElement} unit
 * @param {{node: Node, offset: number}} at
 * @returns {Cut}
 */
function portable(unit, at) {
  /** @type {number[]} */
  const path = [];
  for (let n = at.node; n !== unit && n.parentNode; n = n.parentNode) path.unshift([...n.parentNode.childNodes].indexOf(/** @type {ChildNode} */ (n)));
  const before = pathTo(at.node, unit).map((e) => { const r = document.createRange(); r.setStart(e, 0); r.setEnd(at.node, at.offset); return r.toString() !== ''; });
  let char = 0;
  for (const tn of textNodes(unit)) {
    const r = document.createRange(); r.selectNodeContents(tn);
    const c = r.comparePoint(at.node, at.offset);
    if (c < 0) break;
    if (c === 0) { char += at.node === tn ? at.offset : 0; break; }
    char += tn.length;
  }
  return { path, offset: at.offset, before, char };
}

/** a cut's point in a copy of its unit's element */
function pointIn(/** @type {HTMLElement} */ el, /** @type {Cut} */ cut) {
  /** @type {Node} */
  let n = el;
  for (const k of cut.path) n = n.childNodes[k];
  return { node: n, offset: cut.offset };
}

/** can the article be cut where line `i` opens: past its last line, at a unit's first line, or at the point it opens at — always where the platform does not set the article */
function cutsAt(/** @type {Mounted} */ rec, /** @type {number} */ i) {
  if (!engine || i <= 0 || i >= rec.fold.lines.length) return true;
  const u = unitAt(rec.units, i);
  return u.first === i || !!cutOf(rec, u, i);
}

/**
 * A run of a column's lines widened to whole units where it would cut a unit
 * a part may not cut there — anything but a typed line, where the
 * fold's column does not cut it — within its column.
 * @param {Mounted} rec
 * @param {{column: number, first: number, end: number}} r
 */
function whole(rec, r) {
  const c = rec.fold.columns[r.column], top = c.first, bottom = c.first + c.n;
  let { first, end } = r;
  const u = unitAt(rec.units, first), w = unitAt(rec.units, end - 1);
  if (u && !u.text && first > Math.max(u.first, top)) first = Math.max(u.first, top);
  if (w && !w.text && end < Math.min(w.end, bottom)) end = Math.min(w.end, bottom);
  return { column: r.column, first, end };
}

/**
 * The lines of an article in view (see the head): in each column, those whose
 * boxes meet the world the frame mounts in, widened to whole units where a
 * unit may not be cut; none where the article stands outside the mount band.
 * @param {Mounted} rec
 * @param {{x0: number, y0: number, x1: number, y1: number}} v
 * @returns {Array<{column: number, first: number, end: number}>}
 */
function windowOf(rec, v) {
  if (!rec.banded || !rec.units.length) return [];
  const f = rec.fold, box = docBox(rec.d.addr);
  /** @type {Array<{column: number, first: number, end: number}>} */
  const out = [];
  f.columns.forEach((c, ci) => {
    if (c.estimated || !c.n || box.x + c.x > v.x1 || box.x + c.x + c.w < v.x0) return;
    const top = (/** @type {number} */ i) => box.y + c.y + (f.lines[i].top - c.top) * f.fs;
    const end = c.first + c.n;
    // the first line reaching down to the world's top, then the first past it standing below the world's bottom
    let lo = c.first, hi = end;
    while (lo < hi) { const m = (lo + hi) >> 1; if (top(m) + f.lines[m].h * f.fs < v.y0) lo = m + 1; else hi = m; }
    const first = lo;
    hi = end;
    while (lo < hi) { const m = (lo + hi) >> 1; if (top(m) <= v.y1) lo = m + 1; else hi = m; }
    if (lo > first) out.push(whole(rec, { column: ci, first, end: lo }));
  });
  return out;
}

/** the lines of a fold holding a span's first and last positions; null where the span is another document's, or the fold holds no line for either */
function spanLines(/** @type {Mounted} */ rec, /** @type {Span | null} */ span) {
  if (!span || span.addr !== rec.d.addr) return null;
  const a = placeIn(rec.fold, span.pos).line, b = placeIn(rec.fold, span.pos + Math.max(1, span.width) - 1).line;
  return a == null || b == null ? null : [a, Math.max(a, b)];
}

/** the runs of lines that stand for the page's selection wherever the view is: its first line and its last, so its range can be placed */
function endsOf(/** @type {Mounted} */ rec, /** @type {Span | null} */ span) {
  const ls = spanLines(rec, span);
  if (!ls || !rec.units.length) return [];
  return [...new Set(ls)].flatMap((i) => { const ci = columnOfLine(rec.fold, i); return ci < 0 ? [] : [whole(rec, { column: ci, first: i, end: i + 1 })]; });
}

/**
 * The parts of an article that hold the selection or the focus, which stay
 * whatever the view (see the head): those the platform's selection meets — a
 * press's even collapsed, the drag being made — the one the platform's focus
 * stands in, and those holding a line of the page's span.
 * @param {Mounted} rec
 * @param {Span | null} span the page's selection
 * @returns {Set<Part>}
 */
function heldParts(rec, span) {
  /** @type {Set<Part>} */
  const out = new Set();
  if (!rec.parts.length) return out;
  const s = typeof window !== 'undefined' && window.getSelection ? window.getSelection() : null;
  if (s && s.rangeCount && (pressed || !s.isCollapsed)) { const r = s.getRangeAt(0); for (const p of rec.parts) if (p.el && r.intersectsNode(p.el)) out.add(p); }
  const a = typeof document !== 'undefined' ? document.activeElement : null;
  if (a) for (const p of rec.parts) if (p.el && p.el.contains(a)) out.add(p);
  const ls = spanLines(rec, span);
  if (ls) for (const p of rec.parts) if (p.first <= ls[1] && ls[0] < p.end) out.add(p);
  return out;
}

/**
 * The runs of a run of lines no part holds, each with edges the article can be
 * cut at (`cutsAt`) — an edge whose line opens at no point found moved out to
 * its unit's edge, no further than the parts beside it.
 * @param {Mounted} rec
 * @param {{column: number, first: number, end: number}} w
 * @returns {Array<{column: number, first: number, end: number}>}
 */
function gapsIn(rec, w) {
  const c = rec.fold.columns[w.column];
  const mine = rec.parts.filter((p) => p.column === w.column);
  /** @type {Array<{column: number, first: number, end: number}>} */
  const out = [];
  /** a gap between the parts beside it, its edges where the article can be cut */
  const gap = (/** @type {number} */ first, /** @type {number} */ end) => {
    const floor = mine.reduce((m, p) => (p.end <= first ? Math.max(m, p.end) : m), c.first);
    const ceil = mine.reduce((m, p) => (p.first >= end ? Math.min(m, p.first) : m), c.first + c.n);
    if (!cutsAt(rec, first)) first = Math.max(floor, unitAt(rec.units, first).first);
    if (!cutsAt(rec, end)) end = Math.min(ceil, unitAt(rec.units, end - 1).end);
    out.push({ column: w.column, first, end });
  };
  let at = w.first;
  for (const p of mine) {
    if (p.end <= at || p.first >= w.end) continue;
    if (p.first > at) gap(at, p.first);
    at = Math.max(at, p.end);
  }
  if (at < w.end) gap(at, w.end);
  return out;
}

/**
 * A part's box: an article's lines [first, end) of a column, cut from its
 * template at the points they open at (`cutOf`) — a unit cut at its start
 * naming the character it starts at (`data-char`) and giving up a run's
 * opening where text stands before the cut in the run's stretch, a unit cut at
 * its end leaving out the first element no text of which stands before the
 * cut, so a run's opening stands with its chrome — placed at its first line's
 * top in its column; null where the template holds no such unit or a cut
 * fails.
 * @param {Mounted} rec
 * @param {{column: number, first: number, end: number}} g
 * @returns {HTMLElement | null}
 */
function partEl(rec, g) {
  const t = rec.template, f = rec.fold, c = f.columns[g.column];
  if (!t) return null;
  const u = unitAt(rec.units, g.first), w = unitAt(rec.units, g.end - 1);
  const ue = unitEl(t, u), we = unitEl(t, w);
  const head = g.first > u.first ? cutOf(rec, u, g.first) : null, tail = g.end < w.end ? cutOf(rec, w, g.end) : null;
  if (!ue || !we || (g.first > u.first && !head) || (g.end < w.end && !tail)) return null;
  const r = document.createRange();
  if (head) { const at = pointIn(ue, head); r.setStart(at.node, at.offset); } else r.setStartBefore(ue);
  if (tail) { const at = pointIn(we, tail); r.setEnd(at.node, at.offset); } else r.setEndAfter(we);
  /** @type {DocumentFragment | HTMLElement} */
  let frag = r.cloneContents();
  // a run of lines inside one unit: the copy holds what lies inside the elements the range lies in, which wrap it again up to the run
  const run0 = t.querySelector(':scope > .run');
  for (let e = elementOf(r.commonAncestorContainer); e && e !== run0 && e !== t; e = e.parentElement) {
    const wrap = /** @type {HTMLElement} */ (e.cloneNode(false));
    wrap.appendChild(frag);
    frag = wrap;
  }
  const box = document.createElement('div');
  box.className = 'col';
  box.dataset.column = String(g.column); box.dataset.first = String(g.first); box.dataset.end = String(g.end);
  const lead = frag.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? /** @type {DocumentFragment} */ (frag).firstElementChild : /** @type {HTMLElement} */ (frag);
  if (lead && lead.classList.contains('hd')) box.appendChild(frag);
  else { const run = document.createElement('div'); run.className = 'run'; run.appendChild(frag); box.appendChild(run); }
  const run = box.querySelector(':scope > .run');
  if (head && run && run.firstElementChild) opened(/** @type {HTMLElement} */ (run.firstElementChild), head, u.text);
  if (tail && run && run.lastElementChild) closed(/** @type {HTMLElement} */ (run.lastElementChild), tail);
  box.style.left = c.x * rec.lay + 'px';
  box.style.top = (c.y + (f.lines[g.first].top - c.top) * f.fs) * rec.lay + 'px';
  return box;
}

/** a unit a part takes from a cut on: the character it starts at, and a run's opening given up in each element where text stands before the cut */
function opened(/** @type {HTMLElement} */ el, /** @type {Cut} */ cut, /** @type {boolean} */ text) {
  if (text) el.dataset.char = String(cut.char);
  /** @type {Node | null} */
  let n = el;
  for (const had of cut.before) {
    n = n ? n.firstChild : null;
    if (!n || n.nodeType !== Node.ELEMENT_NODE) return;
    if (had) /** @type {HTMLElement} */ (n).classList.remove('opens');
  }
}

/** a unit a part takes up to a cut: the first element no text of which stands before the cut left out */
function closed(/** @type {HTMLElement} */ el, /** @type {Cut} */ cut) {
  /** @type {Node} */
  let n = el;
  for (const had of cut.before) {
    const next = n.lastChild;
    if (!next || next.nodeType !== Node.ELEMENT_NODE) return;
    if (!had) { /** @type {HTMLElement} */ (next).remove(); return; }
    n = next;
  }
}

/**
 * A run of lines stood as a part of an article: its box cut and placed in
 * the article among the other parts in their lines' order, its block parts
 * named. Where the platform does not set the article, the run alone. Null
 * where its box could not be cut.
 * @param {Mounted} rec
 * @param {{column: number, first: number, end: number}} g
 * @returns {Part | null}
 */
function addPart(rec, g) {
  /** @type {Part} */
  const p = { column: g.column, first: g.first, end: g.end, el: null, blocks: [], tops: [] };
  if (engine) {
    const el = partEl(rec, g);
    if (!el) return null;
    p.el = el;
    const next = rec.parts.find((q) => q.first > p.first && q.el);
    rec.el.insertBefore(el, next && next.el ? next.el : null);
    const byPos = new Map(rec.made.blocks.map((b) => [b.pos, b]));
    p.blocks = /** @type {HTMLElement[]} */ ([...el.querySelectorAll('.run > .sp')]).flatMap((e) => { const b = byPos.get(Number(e.dataset.pos)); return b ? [{ el: e, b }] : []; });
  }
  const at = rec.parts.findIndex((q) => q.first > p.first);
  rec.parts.splice(at < 0 ? rec.parts.length : at, 0, p);
  return p;
}

/** a part taken down */
function dropPart(/** @type {Mounted} */ rec, /** @type {Part} */ p) {
  if (p.el) p.el.remove();
  rec.parts.splice(rec.parts.indexOf(p), 1);
}

/**
 * Where each block part of the parts just set stands in the one 16 px layout,
 * fractional (offsetTop rounds), read in one layout for them all: the gate
 * holds every later frame to it, scaled — a reflow would move a line, a
 * transform never does.
 * @param {Mounted} rec
 * @param {Part[]} parts
 */
function measureParts(rec, parts) {
  if (!engine) return;
  const art = rec.el.getBoundingClientRect();
  for (const p of parts) p.tops = p.blocks.map(({ el }) => { const r = el.getBoundingClientRect(); return { pos: Number(el.dataset.pos), char: Number(el.dataset.char || 0), top: (r.top - art.top) / rec.scale, left: (r.left - art.left) / rec.scale }; });
}

/**
 * Set what stands of an article this frame (see the head): each part none of
 * whose lines is in view taken down, but those holding the selection or the
 * focus (`heldParts`); then each run of the lines in view, and of the page's
 * selection's first and last lines, that no part holds stood as parts of
 * their own (`gapsIn`, `addPart`). The article's lines, block parts and their
 * places are named again where anything changed, and its blocks marked again.
 * @param {Mounted} rec
 * @param {{x0: number, y0: number, x1: number, y1: number}} v the world the frame mounts in
 * @param {Span | null} span the page's selection
 * @returns {Part[]} the parts set
 */
function fill(rec, v, span) {
  const win = windowOf(rec, v);
  const held = heldParts(rec, span);
  let changed = false;
  for (const p of [...rec.parts]) {
    if (held.has(p) || win.some((w) => w.column === p.column && w.first < p.end && p.first < w.end)) continue;
    dropPart(rec, p);
    changed = true;
  }
  /** @type {Part[]} */
  const added = [];
  for (const w of [...win, ...endsOf(rec, span)]) for (const g of gapsIn(rec, w)) { const p = addPart(rec, g); if (p) added.push(p); }
  if (added.length) { measureParts(rec, added); changed = true; }
  if (changed) {
    rec.lines = new Set(rec.parts.flatMap((p) => Array.from({ length: p.end - p.first }, (_, k) => p.first + k)));
    rec.marked = rec.parts.flatMap((p) => p.blocks);
    rec.blockTops = rec.parts.flatMap((p) => p.tops);
    rec.markedFor = '';
    rec.litFor = null;
    rec.labelFor = null;
  }
  return added;
}

/**
 * Mount a document's article over its room (see the head): its lines as the
 * platform sets them — laid out once at LAY_FS in one column out of sight
 * (`setLines`), unless they were set already for the plan it stands at — that
 * one column kept out of the page as the template its parts are cut from, its
 * box as large as the room so it stands on it, and the parts it first stands
 * in (`fill`). Where the platform does not set the article, its HTML stands
 * whole in one column.
 * @param {Doc} d
 * @param {{x0: number, y0: number, x1: number, y1: number}} v the world the frame mounts in
 * @param {Span | null} span the page's selection
 * @param {boolean} banded it mounts in the mount band; else for the lines of the selection alone
 * @returns {Mounted | null}
 */
function mount(d, v, span, banded) {
  if (!layer || mounted.has(d.addr) || d.from < 0) return null;
  const t0 = performance.now();
  const made = madeFrom(d);
  const view = viewFor(d), owner = REC.ownerAccount(d), html = articleOf(d, view, owner);
  let measureMs = 0;
  /** @type {HTMLElement | null} */
  let template = null;
  if (engine) {
    const m = measured.get(d.addr);
    const key = layoutKey(d, view, owner, measure());
    if (m && m.key === key) { template = document.createElement('div'); template.className = 'col'; template.innerHTML = html; }
    else { const t1 = performance.now(); template = setLines(d, articlePlan(d, view, owner), html, made.blocks, key); measureMs = performance.now() - t1; }
  }
  const f = foldOf(d);
  const lay = LAY_FS / f.fs, box = docBox(d.addr);
  const { el, col } = articleEl(d, engine ? '' : html);
  if (engine) col.remove();
  else { col.style.left = f.columns[0].x * lay + 'px'; col.style.top = f.columns[0].y * lay + 'px'; }
  el.style.width = box.w * lay + 'px';
  el.style.height = box.h * lay + 'px';
  layer.appendChild(el);
  /** @type {Mounted} */
  const rec = {
    el, d, lay, runFrom: d.from, runTo: d.to, rev: d.rev, made, grev, fold: f, fs: f.fs, corner: { whole: cornerHTML(d, view), compact: cornerHTML(d, view, true) },
    template, units: unitsOf(f.lines, made.blocks), cuts: new Map(), parts: [], lines: new Set(), banded, scale: 1, blockTops: [], marked: [], markedFor: '', litFor: null, labelFor: null, legible: false,
  };
  mounted.set(d.addr, rec);
  const t2 = performance.now();
  fill(rec, v, span);
  const partMs = performance.now() - t2;
  place(rec);
  mountLog.push({ addr: d.addr, ms: performance.now() - t0, blocks: made.blocks.length, emPx: f.fs * cam.scale, columns: f.columns.length, lines: rec.lines.size, measureMs, partMs });
  if (mountLog.length > 500) mountLog.shift();
  return rec;
}

/**
 * Set a document's article as the platform sets it: laid out once in one
 * column out of sight, at the measure in force the layer's style holds
 * (`setMeasure`), its lines read (`measureLines`) and kept for the article
 * they were set from (`articleOf`) at that measure, then taken out of the
 * page — its column answered, out of the page, the template a mounted
 * article's parts are cut from.
 * @param {Doc} d
 * @param {Row[]} rows its plan
 * @param {string} html the article, as `articleOf` makes it
 * @param {Block[]} blocks the blocks it was made from
 * @param {string} key what its lines are kept by (`layoutKey`)
 * @returns {HTMLElement}
 */
function setLines(d, rows, html, blocks, key) {
  const { el, col } = articleEl(d, html);
  el.style.visibility = 'hidden';
  /** @type {HTMLElement} */ (layer).appendChild(el);
  try { measured.set(d.addr, { key, lines: measureLines(col, rows, blocks, measure()), n: ++serial }); folds.delete(d.addr); }
  finally { el.remove(); }
  return col;
}

/**
 * Set a document's lines as the platform sets them, its article laid out once
 * in one column out of sight and taken down (`setLines`), so its fold — and
 * the bars the canvas draws for it — are its lines as rendered before it
 * mounts.
 * @param {Doc} d
 */
function measureAside(d) {
  if (!layer) return;
  const v = viewFor(d), owner = REC.ownerAccount(d);
  setLines(d, articlePlan(d, v, owner), articleOf(d, v, owner), d.blocks, layoutKey(d, v, owner, measure()));
}

/**
 * The owner account of an origin document, by the one owner rule
 * (M-REC's `ownerAccount`): the owner a withheld run's placeholder names
 * (T-ARTICLE's `placeholderOf`) — on the plane, in a pane, and in the ARIA
 * mirror's item at the run.
 * @param {string} addr the origin document
 */
export function originOwner(addr) { return REC.ownerAccount(REC.doc(addr)); }

/**
 * C-67's clause beneath a withheld run of an origin (PUB-5.124), by
 * T-ARTICLE's one rule (`editionClause`) over what the model holds of the
 * origin's edition claims: the active view's lookup (M-REC's
 * `editionClaimsOf`) — the claims listed, or that it was refused as withheld
 * or failed — each listed claim's link as read, and its home's publication
 * state and owner — the owner by the one owner rule (M-REC's `ownerAccount`), as the
 * origin's (`originOwner`), so the pointer follows the claim whose home the
 * origin's owner owns first — and whether a read of either failed, unanswered
 * since (M-REC's `readFailed`). The plane's placeholder, a pane's, the ARIA
 * mirror's item at the run, the run's face whole and the document's own
 * withheld face all read it (T-ARTICLE's `placeholderOf`, O-FACES), so none
 * of them part (R94; FP-33).
 * @param {string} origin
 * @returns {import('./article.js').Clause | null}
 */
export function clauseOf(origin) {
  const listed = REC.editionClaimsOf(origin);
  const claims = Array.isArray(listed) ? listed.map((claim) => {
    const home = homeOf(claim) || claim, h = REC.has(home) ? REC.doc(home) : null, link = REC.link(claim) || null;
    const published = h && h.meta ? h.meta.published : h && h.refused ? false : null;
    return { claim, link, home, published, claimant: h ? REC.ownerAccount(h) : '', failed: (!link && REC.readFailed(claim)) || (published === null && REC.readFailed(home)) };
  }) : listed ?? null;
  return editionClause(origin, originOwner(origin), claims);
}

/**
 * A document a read answered `withheld`, as the plane names it — B1-S2's
 * withheld box: existence and owner, never bytes — in the corner's own words,
 * "withheld · ⟨owner⟩" (foundations §3.1; FP-29), its owner by the
 * one owner rule (M-REC's `ownerAccount`). The document's state in the ARIA
 * mirror's item and the one line's name (`stateWords`) and the face a refused
 * read of it conjures (O-FACES's `withheld`) read it, and its first line names
 * it in the same words, bracketed (T-ARTICLE's `firstLineOf`) — the box's
 * label, a trail entry's words — so what a sighted reader sees and what a
 * screen reader hears never part (R94).
 * @param {Doc} d
 */
export function withheldBox(d) { return t('F.corner.withheld', { owner: REC.ownerAccount(d) }); }

/** a box's address as its label sets it where its region is named in view: the address of the version it shows past its region's prefix, led by the separator after the prefix — ".0.9", a pinned version's ".0.9.2", as the address display spells a field past a prefix (F-9; foundations §3.1) */
export const shortAddr = (/** @type {Doc} */ d) => (d.account ? d.addr.slice(d.account.length) : d.addr);
/** a draft, by the index's kind or by its metadata where read */
export const isDraft = (/** @type {Doc} */ d) => d.kind === 'draft' || (d.meta ? !d.meta.published : false);

/**
 * A box's first line (T-ARTICLE's `firstLineOf`), read from what the model
 * holds of the version it shows — its own text from its first position, else
 * the index's first line at its bare address — its withheld box's words and a
 * record's bracketed, the owner a withheld box names by the one owner rule
 * (M-REC's `ownerAccount`), as stretches in their faces.
 * @param {Doc} d the version a box shows
 * @returns {import('./article.js').Faced[]}
 */
export const firstOf = (d) => firstLineOf(d, { label: memberOf(d.addr) == null ? d.label : null, reader: REC.reader(), owner: REC.ownerAccount(d) });

/**
 * A link's far document's first line by the same rule (T-ARTICLE's
 * `firstLineOf`; LK's reader `first`): what the model holds of it, if
 * anything, and the index's first line at the address the link names.
 * @param {Doc | null} d its record as the model holds it; null where it holds none
 * @param {string | null} label the index's first line at its address, or null
 * @returns {import('./article.js').Faced[]}
 */
export const firstOfFar = (d, label) => firstLineOf(d, { label, reader: REC.reader(), owner: d ? REC.ownerAccount(d) : '' });

/**
 * A box's lead, the words its label sets before its address (see the head):
 * its first line (`firstOf`) with a draft's mark after it, the client's (a
 * DRAFT convention, F-9), as stretches in their faces; none where no first
 * line is known. Its label on the plane, the one line after its field and a
 * trail entry's words all read it.
 * @param {Doc} d the version a box shows
 * @returns {import('./article.js').Faced[]}
 */
export function leadRuns(d) {
  const first = firstOf(d);
  return first.length && d.refused !== 'withheld' && isDraft(d) ? [...first, { text: ' · ' + t('F.label.draft'), face: 'client' }] : first;
}
/** a box's lead as words (`leadRuns`) */
export const firstLine = (/** @type {Doc} */ d) => leadRuns(d).map((r) => r.text).join('');
/** a box's lead as a label on the plane sets it (`leadRuns`), each stretch in its face (P-LABEL's `inFace`) */
export const labelLine = (/** @type {Doc} */ d) => leadRuns(d).map((r) => (r.face === 'client' ? r.text : inFace(r.face, r.text))).join('');
/** a box's lead as markup (`leadRuns`; ST's `facedHTML`), wherever the page's chrome shows it: the document's words in the reading face (`.reading`), an address the identifier's (`.id`) */
export const firstLineHTML = (/** @type {Doc} */ d) => facedHTML(leadRuns(d));

/**
 * A box's lead as a label's part sets it (`leadRuns`): at `px` in the
 * reading face's words, in the ink of the text it stands for, cut on a word,
 * the bracket its client's words close with kept after a cut's ellipsis
 * (P-LABEL's `cutWords`); null where no first line is known.
 * @param {Doc} d the version a box shows
 * @param {number} px
 * @returns {import('../plane/labels.js').Part | null}
 */
export function leadPart(d, px) {
  const runs = leadRuns(d), last = runs[runs.length - 1];
  if (!last) return null;
  return { text: labelLine(d), px, ink: COL.text, fit: 'cut', close: last.face === 'client' && last.text === CLIENT_CLOSE ? CLIENT_CLOSE : '' };
}

/**
 * A document's state in the ARIA mirror's words (the walk's item, the one
 * line's accessible name; R94): withheld, its withheld box's words; nothing
 * the board will say of it, a far end's words for that; a draft; published;
 * none where nothing has told it yet — its kind the index's place's for its
 * box, else its own record's, else its metadata's.
 * @param {Doc} d the version a box shows
 * @returns {string}
 */
export function stateWords(d) {
  const p = REC.place(boxOf(d.addr));
  const kind = p ? p.kind : d.kind !== 'unknown' ? d.kind : d.meta ? (d.meta.published ? 'edition' : 'draft') : null;
  return d.refused === 'withheld' ? withheldBox(d) : d.refused === 'unregistered' ? t('L.far.unregistered') : kind === 'draft' ? t('L.mirror.draft') : kind === 'edition' ? t('F.published') : '';
}

/**
 * @typedef {Object} DocLabel — a document's label on the plane (`docLabel`): its contents line and its parts beneath it
 * @property {import('../plane/labels.js').Part | null} lead its first line (`leadPart`); null where none is known
 * @property {import('../plane/labels.js').Part} address the address of the version its box shows, its fields past its region's prefix, whole where the region is not named in view (`Part.whole`)
 * @property {import('../plane/labels.js').Part[]} parts its links' badge; none at a withheld box
 * @property {string | null} region its account, whose label in view carries the prefix
 */

/**
 * A document's label on the plane — P-RENDER's contents line on its box, and
 * its held form over its mounted article (see the head) — read here, so the
 * two never part: its lead at its em (`leadPart`); the address of the
 * version its box shows at P-REG's ADDRESS size and weight in the
 * identifier's face, past its region's prefix (`shortAddr`) where its region
 * is named in view, else whole; and its links' badge at that size, none at a
 * withheld box, whose links no read brings.
 * @param {Doc} d the version its box shows
 * @param {number} fsPx its em on screen, in px
 * @returns {DocLabel}
 */
export function docLabel(d, fsPx) {
  const c = LK.countDoc(boxOf(d.addr));
  /** @type {import('../plane/labels.js').Part[]} */
  const parts = d.refused !== 'withheld' && (c.n || c.arriving) ? [{ text: c.arriving ? `${c.n ? c.n + ' · ' : ''}${t('L.arriving')}` : c.n === 1 ? t('F.label.links.1') : t('F.label.links', { n: c.n }), px: ADDRESS.px, ink: COL.greek, fit: 'wrap' }] : [];
  return { lead: leadPart(d, fsPx), address: { text: shortAddr(d), whole: d.addr, px: ADDRESS.px, ink: COL.title, weight: ADDRESS.weight, fit: 'one', face: 'ident' }, parts, region: d.account };
}

/** take a mounted article down; where the platform's selection stands in it, it is kept (`kept`) for the frame that puts it back */
function unmount(/** @type {string} */ addr) {
  const rec = mounted.get(addr); if (!rec) return;
  const held = selectionIn(rec.el);
  if (held) kept = held;
  rec.el.remove(); mounted.delete(addr);
}

/**
 * The platform's selection where it stands in an article — a mounted one, or
 * a reading scene's pane's: the span it covers, through the blocks the
 * article was made from (`spanIn`), and whether it runs backward, its focus
 * point before its anchor; null where none stands in the article, or it is
 * collapsed. A mounted article taken down keeps it for the frame that puts
 * it back (`kept`); a pane set again puts it back over the same bytes (SC;
 * FP-23).
 * @param {HTMLElement} el the article's element
 * @returns {{span: Span, backward: boolean} | null}
 */
export function selectionIn(el) {
  const s = typeof window !== 'undefined' && window.getSelection ? window.getSelection() : null, made = madeOf(el);
  if (!made || !s || s.rangeCount === 0 || s.isCollapsed || !s.anchorNode || !s.focusNode) return null;
  const range = s.getRangeAt(0);
  if (!el.contains(range.commonAncestorContainer)) return null;
  const span = spanIn(el, made, range);
  if (!span) return null;
  const anchor = document.createRange(); anchor.setStart(s.anchorNode, s.anchorOffset);
  return { span, backward: anchor.comparePoint(s.focusNode, s.focusOffset) < 0 };
}

/**
 * The platform's selection placed over a span of an article — a mounted one,
 * or a reading scene's pane's (`rangeIn`) — its anchor at the span's end
 * where it runs backward, else at its start: a range added whole would set
 * its anchor at its start; `setBaseAndExtent` sets it at either end, so the
 * platform's own keys (D5 K-71) go on extending it from there. False where no
 * part of the article standing holds the span.
 * @param {HTMLElement} el the article's element
 * @param {Span} span
 * @param {boolean} backward
 * @returns {boolean}
 */
export function selectIn(el, span, backward) {
  const r = rangeIn(el, span), s = typeof window !== 'undefined' && window.getSelection ? window.getSelection() : null;
  if (!r || !s) return false;
  if (backward) s.setBaseAndExtent(r.endContainer, r.endOffset, r.startContainer, r.startOffset);
  else s.setBaseAndExtent(r.startContainer, r.startOffset, r.endContainer, r.endOffset);
  return true;
}

/** what a mounted article's blocks are marked for: the selection and the walk's focus where they stand in its document */
const marksKey = (/** @type {string} */ addr, /** @type {Span | null} */ s, /** @type {{addr: string, pos: number} | null} */ f) =>
  `${s && s.addr === addr ? `${s.pos}+${s.width}` : ''}|${f && f.addr === addr ? f.pos : ''}`;

/**
 * Mark a standing article's blocks for the selection and the walk's focus by
 * T-ARTICLE's rule (`blockMarks`) where either changed in its document since
 * they were last marked: a class set or taken off where it differs, on each
 * part of a block, nothing rebuilt, so the platform's selection in the
 * article stands.
 * @param {Mounted} rec
 * @param {Span | null} selected
 * @param {{addr: string, pos: number} | null} focus
 */
function markBlocks(rec, selected, focus) {
  const key = marksKey(rec.d.addr, selected, focus);
  if (key === rec.markedFor) return;
  rec.markedFor = key;
  for (const { el, b } of rec.marked) {
    const m = blockMarks(rec.d.addr, b, selected, focus);
    el.classList.toggle('sel', m.sel);
    el.classList.toggle('lit', m.lit);
  }
}

/**
 * Mark a standing article's symbols heavier where every link one stands for
 * is lit at an arrival, by T-ARTICLE's rule (`symbolLit`), where the links lit
 * changed since they were last marked or a part was set since: a class set
 * or taken off where it differs, nothing rebuilt, so no line is set again
 * (FP-12) — a text symbol stands for its one link, a withheld run's for every
 * end drawn at the run (see the head).
 * @param {Mounted} rec
 * @param {readonly string[]} lit the links lit (LK's `lit`)
 */
function markLit(rec, lit) {
  const key = lit.join(' ');
  if (key === rec.litFor) return;
  rec.litFor = key;
  for (const el of /** @type {HTMLElement[]} */ ([...rec.el.querySelectorAll('.sym[data-link], .sym[data-links]')])) {
    const links = el.dataset.link ? [el.dataset.link] : (el.dataset.links || '').split(' ').filter(Boolean);
    el.classList.toggle('heavier', symbolLit(links, lit));
  }
}

/**
 * A byline's cut label opened whole on its act (FP-34), or closed again by
 * the act again: the document's article marks its
 * cut label `open` in place (`markLabel`), and the style sets the whole label
 * over what is beside it, its box unmoved. APP-INPUT takes the act at the
 * label on the plane; in a reading scene's pane nothing acts (SC), its title
 * and its accessible name carrying the label whole.
 * @param {string} addr
 */
export function openLabel(addr) {
  if (openLabels.has(addr)) openLabels.delete(addr); else openLabels.add(addr);
  markDirty();
}
/** is a document's byline's cut label opened whole (`openLabel`)? */
export const labelOpened = (/** @type {string} */ addr) => openLabels.has(addr);

/**
 * Mark a standing article's cut label open where its act opened it, and
 * closed where it did not (`openLabel`), where that changed since it was last
 * marked or a part was set since: a class set or taken off, nothing rebuilt,
 * so no line is set again (FP-12).
 * @param {Mounted} rec
 */
function markLabel(rec) {
  const on = openLabels.has(rec.d.addr);
  if (on === rec.labelFor) return;
  rec.labelFor = on;
  for (const el of /** @type {HTMLElement[]} */ ([...rec.el.querySelectorAll('.slot.cut')])) el.classList.toggle('open', on);
}

/**
 * Give a standing article the pointer at reading scale alone (foundations
 * §2.4): the `legible` class, which the style alone reads — its columns take
 * the pointer, the room between them never — set where its em stands at
 * P-LOD's readable threshold or above and taken off below it, touched only
 * where that changes. An article without it lets a press through to the
 * canvas, which takes it as it takes one on the bars the article replaced: a
 * click is the place's, a drag selects nothing.
 * @param {Mounted} rec
 */
function markLegible(rec) {
  const on = readsAt(rec.fs);
  if (on === rec.legible) return;
  rec.legible = on;
  rec.el.classList.toggle('legible', on);
}

/** position a mounted article over its room — transform only, never reflow */
function place(/** @type {Mounted} */ rec) {
  const box = docBox(rec.d.addr);
  const s = cam.scale / rec.lay;
  rec.el.style.transform = `translate(${sx(box.x)}px, ${sy(box.y)}px) scale(${s})`;
  rec.scale = s;
}

/**
 * Has a mounted article gone stale: its document's run, its revision, the
 * view revision or its fold moved since it was mounted?
 * @param {Mounted} rec
 */
const wentStale = (rec) => rec.d.from !== rec.runFrom || rec.d.to !== rec.runTo || rec.rev !== rec.d.rev || rec.grev !== grev || rec.fold !== foldOf(rec.d);

/**
 * The documents that mount afresh this frame (see the head): of those in view
 * whose text has arrived and that no article stands for — the system's apart,
 * a version only where its box shows it and no other version's article
 * stands in its box, a residue document only where it is the walk's focused
 * one — every one at
 * P-LOD's readable em (8) and above, whatever the limit; then, of those at
 * S1's mount threshold (6.5) and above, as many as MOUNTS_PER_FRAME leaves
 * after the frame's mounts so far and these, in THE LIMIT'S ORDER: those
 * holding the page's selection, the walk's focused document and the document
 * just navigated to first, whatever their size (D6: the ring "at the place"
 * presumes a place one can read; its corner is the plane's next Tab stop, D5
 * K-57), then the largest em first, equal ems in the model's order — never by
 * length (`limitOrder`).
 * @param {{x0: number, y0: number, x1: number, y1: number}} v the world the frame mounts in: the view, padded
 * @param {(addr: string) => boolean} focused whether a document is the walk's focused one
 * @param {Span | null} span the page's selection
 * @param {number} spent the documents the frame has mounted afresh already
 * @returns {Doc[]} the readable ones, then the rest in the limit's order
 */
function chosen(v, focused, span, spent) {
  const now = read.navigated();
  /** @type {Doc[]} */
  const readable = [];
  /** @type {Array<{d: Doc, em: number, first: boolean}>} */
  const rest = [];
  /** the boxes an article stands in: under a press, another version's may still */
  const taken = new Set([...mounted.keys()].map(boxOf));
  for (const d of REC.docs()) {
    if (d.from < 0 || d.system || mounted.has(d.addr) || !isShown(d.addr) || taken.has(boxOf(d.addr))) continue;
    const box = docBox(d.addr);
    if (!intersects(box, v) || !intersects(shapeIn(d), v)) continue;
    const mine = focused(d.addr);
    if (box.residue && !mine) continue;
    const fs = foldOf(d).fs, em = fs * cam.scale;
    if (readsAt(fs)) readable.push(d);
    else if (em >= MOUNT_EM) rest.push({ d, em, first: mine || (!!span && span.addr === d.addr) || d.addr === now });
  }
  return [...readable, ...limitOrder(rest).slice(0, Math.max(0, MOUNTS_PER_FRAME - spent - readable.length)).map((w) => w.d)];
}

/**
 * The limit's order (see the head): the documents below the readable em that
 * may mount, those holding the page's selection or the walk's focus and the
 * document just navigated to first (`first`), then the largest em first,
 * equal in both in the order given — the model's (the sort is stable). Never
 * by length, which would bar short notes first.
 * @template {{em: number, first: boolean}} C
 * @param {C[]} cands in the model's order
 * @returns {C[]}
 */
export function limitOrder(cands) { return [...cands].sort((a, b) => Number(b.first) - Number(a.first) || b.em - a.em); }

/** does an article stand in the mount band this frame: its em at 6.5 and above, or at 5.5 and above where it stood in the band (S1's hysteresis), its place letting it mount — a residue document only where it is the walk's focused one */
const inBand = (/** @type {Mounted} */ rec, /** @type {(addr: string) => boolean} */ focused) =>
  rec.fs * cam.scale >= (rec.banded ? UNMOUNT_EM : MOUNT_EM) && !(docBox(rec.d.addr).residue && !focused(rec.d.addr));

/** the world the frame mounts in: the view, 40 px about it */
function viewNow() {
  const pad = 40;
  const VW = (layer && layer.clientWidth) || window.innerWidth, VH = (layer && layer.clientHeight) || window.innerHeight;
  return { x0: (-pad - VW / 2) / cam.scale + cam.x, y0: (-pad - VH / 2) / cam.scale + cam.y, x1: (VW + pad - VW / 2) / cam.scale + cam.x, y1: (VH + pad - VH / 2) / cam.scale + cam.y };
}

/**
 * The passage being read: the mounted article at its readable em or above
 * whose outline holds the visible view's centre, where in its room that
 * centre stands, the position the line there opens at and that position's
 * byte by identity through the image the article was made from — what the
 * text set again holds of it is where the passage stands then (`keepPlace`);
 * null where none does.
 * @returns {Hold | null}
 */
function readingNow() {
  const c = viewCentre();
  for (const rec of mounted.values()) {
    if (!readsAt(rec.fs) || !holds(shapeAt(rec.d.addr, rec.fold), c)) continue;
    const box = docBox(rec.d.addr), p = { x: c.x - box.x, y: c.y - box.y }, pos = posIn(rec.fold, p.x, p.y);
    return { addr: rec.d.addr, fold: rec.fold, p, pair: null, pos, ids: pos != null ? REC.identityIn(rec.made.image, pos, 1) : [], left: null };
  }
  return null;
}

/** the camera as it stands: where a re-set by position left it (`Hold.left`) */
const camNow = () => ({ x: cam.x, y: cam.y, scale: cam.scale });
/** does the camera stand where a re-set left it — no pan, no zoom, no flight since? */
const leftThere = (/** @type {{x: number, y: number, scale: number} | null} */ at) => !!at && at.x === cam.x && at.y === cam.y && at.scale === cam.scale;

/**
 * The hold a re-set of a document takes (see the head): where the camera
 * stands as a re-set of the same document whose text came before its image
 * left it (`Hold.left`), the passage that re-set placed by position — the
 * position whose line it placed, in the fold standing now, and the bytes it
 * kept — so the re-set the image's arrival makes stands those bytes' line
 * where that line stood, wherever the view's centre falls about it, an empty
 * line typed below it among them; else the passage being read now.
 * @param {Hold | null} h the hold standing
 * @param {Hold} reading
 * @returns {Hold}
 */
function still(h, reading) {
  return h && h.left && h.addr === reading.addr && h.ids.length && leftThere(h.left) ? { ...reading, pos: h.pos, ids: h.ids } : reading;
}

/**
 * Where the text set again holds the byte a hold names by identity (`ids`):
 * the position its line opened at in the fold it stood in, and the one where
 * the image the article stands again from places that byte now; null where
 * the hold names none, or that image places none of it — the image not read
 * yet, or the text without the byte.
 * @param {Hold} h
 * @param {Mounted} rec the article standing again
 * @returns {{from: number, to: number} | null}
 */
function carried(h, rec) {
  if (h.pos == null || !h.ids.length) return null;
  const now = REC.placedIn(rec.made.image, h.ids);
  return now.length ? { from: h.pos, to: now[0].pos } : null;
}

/**
 * The passage held as its document's article was taken down, set again: the
 * camera re-anchored so it keeps its place and its size on screen (P-LAY's
 * `holdOf`, P-CAM's `reanchor`), a flight bound into the document with it —
 * the passage's own bytes, where the text set again places them (`carried`;
 * FP-8: an edit above the view moves no word the reader reads), else its
 * position.
 * @param {Hold} h
 * @param {Mounted} rec the article standing again
 * @returns {boolean} whether the camera moved
 */
function keepPlace(h, rec) {
  const at = holdOf(h.fold, rec.fold, h.p, h.pair || carried(h, rec));
  if (!at) return false;
  const box = docBox(rec.d.addr);
  const a = { x: box.x + h.p.x, y: box.y + h.p.y }, b = { x: box.x + at.to.x, y: box.y + at.to.y };
  if (Math.abs(a.x - b.x) < 1e-9 && Math.abs(a.y - b.y) < 1e-9 && Math.abs(at.k - 1) < 1e-12) return false;
  reanchor(a, b, at.k, box);
  markDirty();
  return true;
}

/**
 * A box taking another version (see the head; N-GO's version move, a newer
 * version's arrival): the line being read in `from`'s article held for
 * `to`'s, which, mounted fresh, re-anchors the camera on it (`keepPlace`) —
 * the line holding `at.from` taken by the one holding `at.to`, else the
 * passage at the visible view's centre by its position; where `to` is
 * `from` itself, its article standing, the camera re-anchored at once. No
 * hold where `from`'s article does not stand, nor where no passage is read
 * in it.
 * @param {string} from the version the box shows as it moves
 * @param {string} to the version it takes
 * @param {{from: number, to: number} | null} [at] the position of `from` whose line is kept, and the position of `to` that takes it
 */
export function holdAcross(from, to, at = null) {
  const rec = mounted.get(from);
  if (!rec) { if (hold && boxOf(hold.addr) === boxOf(from)) hold = null; return; }
  /** @type {Hold | null} */
  let h = null;
  if (at) { const p = placeIn(rec.fold, at.from); h = { addr: to, fold: rec.fold, p: { x: p.x, y: p.y }, pair: at, pos: at.from, ids: [], left: null }; }
  else { const r = readingNow(); h = r && r.addr === from ? { ...r, addr: to } : null; }
  if (from !== to) { hold = h; return; }
  hold = null;
  if (h) keepPlace(h, rec);
}

/**
 * What a view reads (see the head): `readingNow`'s rule taken at
 * a view the camera may stand away from — a departure's, bound for a
 * flight's destination — against the fold each document stands in now, never
 * a mounted article: the document whose outline holds the view's visible
 * centre at its own reading scale there, a version only where its box shows
 * it and only where the page holds its text; the position the line under that
 * centre opens at (P-LAY's `posAt`), that position's byte by identity through
 * the document's held image, and where the fold sets that line and the
 * centre. Null where the view reads no document so.
 * @param {{x: number, y: number, scale: number}} view
 * @returns {Reading | null}
 */
export function readAt(view) {
  const c = centreAt(view);
  for (const d of REC.docs()) {
    if (d.from < 0 || d.system || !isShown(d.addr) || !holds(docBox(d.addr), c) || !holds(shapeIn(d), c)) continue;
    const f = foldOf(d);
    if (!readsAt(f.fs, view.scale)) continue;
    const box = docBox(d.addr), p = { x: c.x - box.x, y: c.y - box.y }, pos = posIn(f, p.x, p.y);
    if (pos == null) continue;
    const line = placeIn(f, pos);
    return { addr: d.addr, pos, ids: REC.identityOf(d.addr, pos, 1), p, line: { x: line.x, y: line.y }, fs: f.fs };
  }
  return null;
}

/**
 * The view that keeps what a view read where it stood (see the head): the
 * view moved so the passage it
 * read keeps its place and its size on screen in the fold its document stands
 * in now — `keepPlace`'s arithmetic (P-LAY's `holdOf`, P-CAM's `reanchored`) —
 * in the version its box shows now, by the passage's byte where that text's
 * held image places it, else by its position; that fold's lines set as the
 * platform sets them first where they are not set at the measure in force
 * (`measureAside`), so the view is placed on the lines the reader will meet.
 * The view itself where the passage stands where it stood. Null where the
 * page holds none of that document's text: a read must bring it first.
 * @param {{x: number, y: number, scale: number}} view
 * @param {Reading} r what it read
 * @returns {{x: number, y: number, scale: number} | null}
 */
export function keptAt(view, r) {
  const addr = read.shown(r.addr), d = REC.has(addr) ? REC.doc(addr) : null;
  if (!d || d.from < 0) return null;
  if (engine && layer) { foldOf(d); if (!(folds.get(addr) || { set: true }).set) { setMeasure(); measureAside(d); } }
  const f = foldOf(d), at = r.ids.length ? REC.placedIdentity(addr, r.ids) : [];
  const now = placeIn(f, at.length ? at[0].pos : r.pos), s = f.fs / r.fs;
  if (now.x === r.line.x && now.y === r.line.y && s === 1) return view;
  const box = docBox(addr);
  const a = { x: box.x + r.p.x, y: box.y + r.p.y }, b = { x: box.x + now.x + (r.p.x - r.line.x) * s, y: box.y + now.y + (r.p.y - r.line.y) * s };
  return reanchored(view, a, b, r.fs / f.fs);
}

/**
 * The per-frame policy, run before the canvas draws, so P-RENDER yields to
 * exactly the lines standing this frame and draws the bars of exactly the
 * others (see the head). Each article's em is read against the mount band;
 * one whose box shows another version now is taken down, the box's move's
 * hold standing for the version it shows (`holdAcross`); one that went stale
 * is taken down and set again in its place, where it
 * still stands in view in the band or holds the page's selection — the
 * passage being read, where its article is taken down to be set again, held
 * until it stands again and the camera re-anchored on it then (`keepPlace`);
 * the documents in view at the readable em mount, every one, and below it
 * those the limit leaves room for, in its order (`chosen`), the documents in
 * view chosen again where the camera was re-anchored. Then what stands of
 * every article is set (`fill`): the lines in view stand and the rest go, but
 * those holding the selection or the focus, and an article left with no line
 * standing outside the band, or out of view, is taken down. Everything is
 * placed, each standing article's blocks marked for the selection and the
 * walk's focus in place (`markBlocks`), each given the pointer at reading
 * scale alone (`markLegible`), and each article's corner placed beside it,
 * then its label held below the one line where its top has risen under it
 * (`placeHeld`); where the article holding the selection was mounted this frame, or the
 * selection is owed its range, the platform's range is put back over the
 * span, its anchor at the end it stood at, unless the person holds a selection
 * outside the layer (`placeAgain`); then the lines of the documents in view
 * whose bars the canvas draws and whose article stands unmounted are set,
 * within the frame's budget and nearest the view's centre first
 * (`measureAside`). While a press stands (`press`) no standing article is set
 * again or given or denied the pointer, so the drag keeps the nodes it is
 * anchored in, through a zoom past the readable threshold too, and no range
 * is placed over it; documents and lines mount as the view asks — an article
 * mounted under it given the pointer as its scale asks — and the parts the
 * drag meets stand. The first frame after the press sets again what went
 * stale, gives or takes the pointer where the scale now asks, and places the
 * range the release took over the article set again.
 * @param {(addr: string) => boolean} [focused] whether a document is the walk's focused one: the one residue document of its cell that mounts, the first in the limit's order, and the one whose corner is a Tab stop (D5 K-57)
 */
export function frame(focused = () => false) {
  if (!layer) return;
  if (engine) setMeasure();
  let v = viewNow();
  const reading = readingNow();
  const span = read.selection();
  for (const rec of mounted.values()) rec.banded = inBand(rec, focused);
  /** @type {string[]} the articles mounted this frame, a rebuild among them */
  const fresh = [];
  let spent = 0;
  if (!pressed) {
    // a box that shows another version now: its article taken down, the hold the box's move set standing for the version it shows
    for (const addr of [...mounted.keys()]) if (!isShown(addr)) unmount(addr);
    for (const [addr, rec] of [...mounted]) {
      if (!wentStale(rec)) continue;
      if (reading && reading.addr === addr) hold = still(hold, reading);
      const banded = rec.banded;
      unmount(addr);
      const d = REC.doc(addr);
      if ((banded && intersects(shapeIn(d), v)) || (!!span && span.addr === addr)) { if (mount(d, v, span, banded)) fresh.push(addr); }
    }
  }
  for (const d of chosen(v, focused, span, spent)) if (mount(d, v, span, true)) { fresh.push(d.addr); spent++; }
  if (hold) {
    const rec = mounted.get(hold.addr);
    if (rec && fresh.includes(hold.addr) && !hold.left) {
      const h = hold; hold = null;
      if (keepPlace(h, rec)) { v = viewNow(); for (const d of chosen(v, focused, span, spent)) if (mount(d, v, span, true)) { fresh.push(d.addr); spent++; } }
      // its text came before its image: the passage placed by position for now, its bytes kept for the re-set the image's arrival makes (`still`)
      if (!h.pair && h.ids.length && !rec.made.image.length) hold = { ...h, left: camNow() };
    } else if (!intersects(docBox(hold.addr), v) || (hold.left && !leftThere(hold.left))) hold = null;
  }
  for (const [addr, rec] of [...mounted]) {
    fill(rec, v, span);
    if (!rec.parts.length && !(rec.banded && intersects(shapeAt(addr, rec.fold), v))) unmount(addr);
  }
  for (const rec of mounted.values()) place(rec);
  const focus = litFocus(), lit = LK.lit();
  for (const rec of mounted.values()) { markBlocks(rec, span, focus); markLit(rec, lit); markLabel(rec); if (!pressed || fresh.includes(rec.d.addr)) markLegible(rec); }
  placeCorners(focused);
  placeHeld();
  if (span && !pressed && (fresh.includes(span.addr) || (owed && sameSpan(owed, span)))) placeAgain(span);
  if (owed && !sameSpan(owed, span)) owed = null;
  if (engine && !pressed) measureInView(v);
  last.mounted = spent;
  last.standing = 0; last.lines = 0;
  for (const rec of mounted.values()) { if (rec.banded) last.standing++; last.lines += rec.lines.size; }
}

/**
 * The layer's style set to the measure in force (P-CAM's `measure`; see the
 * head) where it holds another, before anything is laid out in the frame: the
 * columns of the articles it mounts, the lines it sets aside and the parts it
 * cuts all take it, and every article set at another — its fold made again at
 * the new one — goes stale and is set again in its place, the passage being
 * read held (`frame`).
 */
function setMeasure() {
  const cpl = measure();
  if (!layer || cpl === styled) return;
  layer.style.setProperty('--measure', String(cpl));
  styled = cpl;
}

/**
 * The lines of the documents in view whose bars the canvas draws and whose
 * article stands unmounted — each the version its box shows — set as the
 * platform sets them, within the frame's budget, nearest the view's centre
 * first (see `frame`).
 * @param {{x0: number, y0: number, x1: number, y1: number}} v the world in view, padded
 */
function measureInView(v) {
  const t0 = performance.now(), cx = cam.x, cy = cam.y;
  const want = REC.docs().filter((d) => d.from >= 0 && !d.system && isShown(d.addr) && !mounted.has(d.addr) && !docBox(d.addr).residue && intersects(docBox(d.addr), v)
    && foldOf(d).fs * cam.scale >= BARS_EM && !(folds.get(d.addr) || { set: true }).set);
  want.sort((a, b) => { const p = docBox(a.addr), q = docBox(b.addr); return Math.hypot(p.x + p.w / 2 - cx, p.y + p.h / 2 - cy) - Math.hypot(q.x + q.w / 2 - cx, q.y + q.h / 2 - cy); });
  for (const d of want) {
    if (performance.now() - t0 > MEASURE_BUDGET_MS) { markDirty(); break; }
    measureAside(d); markDirty();
  }
}

/**
 * The column a document's corner stands beside, and the room left of that
 * column's text (see the head; FP-26): the column the visible
 * view's centre stands over, else the nearest (P-LAY's `columnAt`); the room
 * left of its text — for the first column of a row the strip left of the
 * document's box, which no other document's box reaches into (P-PROJ's
 * `clearLeftOf`), with the half gutter; for any other the gutter and the edge
 * of the column before it — its two gaps taken. Where that room holds not even
 * the compact corner, or the signs in that edge left the corner no room
 * there (`blocked`), the room by the first column of its row (FP-26).
 * @param {Fold} f
 * @param {number} strip the strip left of the document's box, in world units (P-PROJ's `clearLeftOf`)
 * @param {{x: number, y: number}} at the visible view's centre, in world units relative to the room
 * @param {number} scale the camera's scale
 * @param {number} [blocked] the column the signs before it left the corner no room beside; -1 where none
 * @returns {Beside}
 */
export function besideOf(f, strip, at, scale, blocked = -1) {
  const ci = columnAt(f, at.x, at.y), mine = roomBeside(f, strip, ci, scale);
  return mine.first || (ci !== blocked && mine.room >= cornerWidth(true)) ? mine : roomBeside(f, strip, ci - (ci % f.across), scale);
}

/**
 * The room left of a column's text for its document's corner (`besideOf`),
 * its two gaps taken: the strip and the half gutter beside a row's first
 * column, the gutter and the edge of the column before it beside any other.
 * @param {Fold} f
 * @param {number} strip the strip left of the document's box, in world units
 * @param {number} i the column
 * @param {number} scale
 * @returns {Beside}
 */
export function roomBeside(f, strip, i, scale) {
  const c = f.columns[i], first = i % f.across === 0, left = first ? -strip : f.columns[i - 1].x + f.columns[i - 1].w;
  return { column: i, room: Math.max(0, Math.floor((c.x - left) * scale - 2 * CORNER_GAP)), first };
}

/**
 * The form a corner stands in (FP-26): whole where its room
 * holds it whole and the view holds a column at the reading size beside it
 * whole (P-LAY's fit, `narrow` where it does not), or where a reader's act
 * opened it whole (`openCorner`); else compact.
 * @param {number} room the room beside its column (`besideOf`), in px
 * @param {boolean} open
 * @param {boolean} [narrow] the view's fit holds a column beside the compact corner alone
 * @returns {CornerForm}
 */
export const formFor = (room, open, narrow = false) => (open || (!narrow && room >= cornerWidth(false)) ? 'whole' : 'compact');

/**
 * A corner's top on screen (see the head): held to the top of its column's
 * visible part below the one line — its row's top, else just below the line,
 * level with a label held there (P-LABEL's `holdTop`, the one hold) — and
 * never so low that it runs past `bottom`, unless it is taller than the
 * room below its row's top; then moved below each sign it would meet of those
 * the edge before its column holds (foundations §3.1). Null where that move
 * leaves it running
 * past `bottom`: beside that column it has no room.
 * @param {{x: number, w: number, h: number}} c the corner's left edge and its size, on screen
 * @param {number} rowTop its column's top on screen
 * @param {number} top the height it holds below: the one line's bottom and P-REG's HOLD gap
 * @param {number} bottom the foot it never runs past
 * @param {Rect[]} signs the signs in the edge before its column, on screen; none beside a row's first column
 * @returns {number | null}
 */
export function cornerTop(c, rowTop, top, bottom, signs) {
  let y = holdTop(rowTop, top, bottom, c.h), moved = false;
  for (const s of [...signs].sort((a, b) => a.y - b.y)) {
    if (s.x < c.x + c.w && c.x < s.x + s.w && s.y < y + c.h && y < s.y + s.h) { y = s.y + s.h + CORNER_GAP; moved = true; }
  }
  return moved && y + c.h > bottom + 0.5 ? null : y;
}

/** the signs a column's edge holds where its parts stand, on screen: the others' counts and the withheld runs' marks */
function signsIn(/** @type {Mounted} */ rec, /** @type {number} */ ci) {
  return /** @type {HTMLElement[]} */ ([...rec.el.querySelectorAll(`.col[data-column="${ci}"] .edge`)]).map((e) => { const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
}

/**
 * The corners' pass, after the articles are placed: each mounted document at
 * reading scale whose corner has items carries it, the rest are removed. The
 * writes come first (an element, its form and items where they changed, a cap
 * that binds), the reads together after them (one layout for every corner
 * that changed, none in a frame where none did, and the signs in the edges the
 * corners stand beside), then the places: beside the column nearest the
 * view's centre (`besideOf`) — whole or compact by the room there and the
 * view's fit (`formFor`), the room its cap only where not even its form fits — its right
 * edge a gap short of that column's text, its top held to that column's
 * visible top below the one line, never past the outline's bottom beside a
 * row's first column, nor past its row's foot beside another, and below the
 * signs the edge before it holds (`cornerTop`); where they leave it no room,
 * the next frame stands it by its row's first column.
 * @param {(addr: string) => boolean} focused
 */
function placeCorners(focused) {
  if (!cornerLayer) return;
  /** @type {Array<{c: Corner, rec: Mounted, at: Beside}>} */
  const shown = [];
  const centre = viewCentre();
  for (const rec of mounted.values()) {
    if (!rec.corner.whole || !readsAt(rec.fs)) continue;
    const addr = rec.d.addr, box = docBox(addr), open = openWhole.has(addr);
    const c = corners.get(addr) || makeCorner(cornerLayer, addr), p = { x: centre.x - box.x, y: centre.y - box.y };
    // a column the signs before it left no room beside is tried again once the view's centre has left it
    if (c.blockedAt !== columnAt(rec.fold, p.x, p.y)) c.blockedAt = -1;
    const at = besideOf(rec.fold, clearLeftOf(addr), p, cam.scale, c.blockedAt);
    const form = formFor(at.room, open, fit().compact), html = rec.corner[form];
    if (c.html !== html) { c.el.innerHTML = html; c.html = html; c.stale = true; }
    if ((form === 'compact') !== c.compact) { c.compact = form === 'compact'; c.el.classList.toggle('compact', c.compact); c.stale = true; }
    // the room caps the corner only where not even its form's width fits there, a corner opened whole never
    const cap = open || at.room >= cornerWidth(c.compact) ? Infinity : at.room;
    if (cap !== c.cap) { c.el.style.maxWidth = cap === Infinity ? '' : cap + 'px'; c.cap = cap; c.stale = true; }
    c.column = at.column;
    shown.push({ c, rec, at });
  }
  const here = new Set(shown.map((s) => s.rec.d.addr));
  let lost = false;
  for (const addr of [...corners.keys()]) if (!here.has(addr)) lost = dropCorner(addr) || lost;
  if (shown.length) {
    for (const { c } of shown) if (c.stale) { c.w = c.el.offsetWidth; c.h = c.el.offsetHeight; c.stale = false; }
    const signs = shown.map(({ rec, at }) => (at.first ? [] : signsIn(rec, at.column - 1)));
    const top = read.top() + HOLD.gap;
    shown.forEach(({ c, rec, at }, k) => {
      const f = rec.fold, box = docBox(rec.d.addr), col = f.columns[at.column];
      const foot = at.first ? boundsOf(f) : padded(f, f.columns[at.column - (at.column % f.across)]);
      const x = sx(box.x + col.x) - CORNER_GAP - c.w, rowTop = sy(box.y + col.y);
      const y = cornerTop({ x, w: c.w, h: c.h }, rowTop, top, sy(box.y + foot.y + foot.h), signs[k]);
      // beside that column the signs before it leave it no room: the next frame stands it by its row's first column
      if (y === null) { c.blockedAt = at.column; markDirty(); }
      c.x = Math.round(x); c.y = Math.round(y ?? rowTop);
      c.el.style.transform = `translate(${c.x}px, ${c.y}px)`;
      const mine = focused(rec.d.addr);
      if (mine === c.mine) return;
      if (!mine) lost = c.el.contains(document.activeElement) || lost;
      c.mine = mine;
      if (mine) { c.el.tabIndex = 0; c.el.removeAttribute('aria-hidden'); }
      else { c.el.removeAttribute('tabindex'); c.el.setAttribute('aria-hidden', 'true'); }
    });
  }
  if (lost) read.handOff();
}

/**
 * The stretches of a held label's line its document's corner leaves it (see
 * the head; FP-26): where the
 * corner's box meets the line, the stretch left of the corner, ending a gap
 * short of it, then the stretch right of it, beginning a gap past it — each
 * that has width; else the line whole.
 * @param {{x: number, w: number}} line the line's room across, on screen
 * @param {{y: number, h: number}} band the line's top and its height
 * @param {Rect | null} corner the corner's box on screen; null where none stands
 * @returns {Array<{x: number, w: number}>} in the order a label tries them
 */
export function besideCorner(line, band, corner) {
  if (!corner || corner.y >= band.y + band.h || corner.y + corner.h <= band.y || corner.x >= line.x + line.w || corner.x + corner.w <= line.x) return [line];
  const end = line.x + line.w, from = corner.x + corner.w + CORNER_GAP;
  return [{ x: line.x, w: corner.x - CORNER_GAP - line.x }, { x: from, w: end - from }].filter((s) => s.w > 0);
}

/**
 * The held label's pass (see the head), after the corners: each document
 * whose article stands in the mount band — where the canvas sets no label of
 * it — whose outline's first row has risen above the hold below the one line
 * and which the line does not name carries its label held there: the canvas's
 * words for its box (`docLabel`), its address past its region's prefix where
 * that region is named in view (the reader `region`), else whole, each run in
 * its face as the canvas sets it (`runHTML`), an address in the title's ink,
 * on one line across its outline's visible part at that height (P-LABEL's
 * `holdTop`, `across`, `heldContents`) — its first line from the line's
 * start, its address at the line's end — its box's edge pushing it up under
 * the line, on its box's ground, over the text it covers; where its corner's
 * box meets that line, in the stretch left of the corner, else the stretch
 * right of it (`besideCorner`), none where neither holds its address. The
 * first lines the frame's held labels cut that read alike are cut again to
 * show where they differ (P-LABEL's `apartTexts`). It takes the pointer where
 * its article does (`legible`), so a press on it reaches none of the lines it
 * covers, and below that a press on it falls to the canvas, as one on the box
 * does. Its element is rewritten only where what it shows changed; the rest
 * are removed.
 */
function placeHeld() {
  if (!cornerLayer) return;
  const seen = visibleView(read.top()), top = seen.y + HOLD.gap, named = read.named(), scale = cam.scale;
  /** @type {Array<{rec: Mounted, line: import('../plane/labels.js').HeldPart[], room: {x: number, w: number}, y: number, lh: number}>} each label held, where its line stands */
  const placed = [];
  for (const rec of mounted.values()) {
    const addr = rec.d.addr;
    if (!rec.banded || boxOf(addr) === named) continue;
    const f = rec.fold, box = docBox(addr), row = firstRow(f), g = (GUTTER / 2) * f.fs, at = sy(box.y + row.y + g);
    if (at >= top) continue;
    const rects = outlineRects(f).map((r) => ({ x: sx(box.x + r.x), y: sy(box.y + r.y), w: r.w * scale, h: r.h * scale }));
    const label = docLabel(rec.d, f.fs * scale), pad = g * scale;
    const address = label.region && !read.region(label.region) && label.address.whole ? { ...label.address, text: label.address.whole } : label.address;
    // one line box of its first line's size, known or not, or of its largest part: the address stands where it stood whatever arrives beside it
    const lh = Math.max(lineHeight(f.fs * scale), ...[label.lead, address, ...label.parts].map((p) => (p ? lineHeight(p.px) : 0))), foot = Math.max(...rects.map((r) => r.y + r.h)) - pad;
    const y = Math.round(holdTop(at, top, foot, lh)), a = across(rects, y, lh, pad);
    if (!a || y + lh <= seen.y + 0.5) continue;
    const x0 = Math.max(a.x, seen.x), c = corners.get(addr);
    let line = null, room = { x: 0, w: 0 };
    for (const s of besideCorner({ x: x0, w: Math.min(a.x + a.w, seen.x + seen.w) - x0 }, { y, h: lh }, c ? { x: c.x, y: c.y, w: c.w, h: c.h } : null)) {
      // on whole px, never past the stretch's right end
      const x = Math.round(s.x), w = Math.floor(s.x + s.w) - x;
      line = heldContents({ lead: label.lead, address }, label.parts, w, measureRun);
      if (line) { room = { x, w }; break; }
    }
    if (line) placed.push({ rec, line, room, y, lh });
  }
  apartHeld(placed.flatMap((p) => p.line));
  /** @type {Set<string>} */
  const here = new Set();
  for (const { rec, line, room, y, lh } of placed) {
    const addr = rec.d.addr;
    here.add(addr);
    const h = helds.get(addr) || makeHeld(/** @type {HTMLElement} */ (cornerLayer), addr);
    const html = line.map((m) => `<span style="left:${m.x}px;line-height:${lh}px;color:${m.part.ink}">${m.runs.map((r) => runHTML(r, m.px, m.weight)).join('')}</span>`).join('');
    if (h.html !== html) { h.el.innerHTML = html; h.html = html; }
    const ground = rec.d.refused === 'withheld' ? COL.withheld : COL.doc, place = `${room.x}|${y}|${room.w}|${lh}|${ground}`;
    if (h.place !== place) { Object.assign(h.el.style, { transform: `translate(${room.x}px, ${y}px)`, width: room.w + 'px', height: lh + 'px', background: ground }); h.place = place; }
    h.el.classList.toggle('legible', rec.legible);
  }
  for (const [addr, h] of [...helds]) if (!here.has(addr)) { h.el.remove(); helds.delete(addr); }
}

/**
 * The first lines the held labels cut that read alike, cut again to show
 * where they differ (P-LABEL's `apartTexts`), each in the width it was set
 * at: its words and its runs set again in place.
 * @param {import('../plane/labels.js').HeldPart[]} parts every held label's parts this frame
 */
function apartHeld(parts) {
  const full = (/** @type {import('../plane/labels.js').HeldPart} */ m) => m.part.text.trim().replace(/\s+/g, ' ');
  const cut = parts.filter((m) => m.part.fit === 'cut' && m.text !== plain(full(m)));
  if (cut.length < 2) return;
  const wide = (/** @type {import('../plane/labels.js').HeldPart} */ m, /** @type {string} */ s) => runsOf(s, m.part.face || 'client').reduce((w, r) => w + measureRun(r.text, m.px, m.weight, r.face), 0);
  const now = apartTexts(cut.map((m) => ({ shown: m.text, full: full(m), close: m.part.close || '', fits: (s) => wide(m, s) <= m.w + 1e-6 })));
  cut.forEach((m, i) => { if (now[i] !== m.text) { m.text = plain(now[i]); m.runs = runsOf(now[i], m.part.face || 'client'); m.w = wide(m, now[i]); } });
}

/**
 * A document's held label's element in the corner layer (see the head): no
 * corner — nothing reads it as one — out of the Tab order and hidden from
 * assistive technology, for a hold is drawn, never announced.
 * @param {HTMLElement} into the corner layer
 * @param {string} addr
 * @returns {HeldLabel}
 */
function makeHeld(into, addr) {
  const el = document.createElement('div');
  el.className = 'held';
  el.dataset.held = addr;
  el.setAttribute('aria-hidden', 'true');
  into.appendChild(el);
  /** @type {HeldLabel} */
  const h = { el, html: '', place: '' };
  helds.set(addr, h);
  return h;
}

/** a document's label held over its mounted article as the last frame placed it — its words and its rect on screen — or null where none stands (the gate's) */
export function heldOf(/** @type {string} */ addr) {
  const h = helds.get(addr); if (!h) return null;
  const r = h.el.getBoundingClientRect();
  return { text: [...h.el.children].map((s) => s.textContent || ''), rect: { x: r.left, y: r.top, w: r.width, h: r.height }, legible: h.el.classList.contains('legible') };
}

/**
 * A compact sign opened whole on its act (FP-26): a document's corner
 * standing compact made whole where it
 * stands, over what is beside it, until the act again — at the corner opened,
 * its version statement apart — closes it, or the corner leaves (APP-INPUT
 * takes the act at the corner's glyph, and at the corner opened).
 * @param {string} addr
 */
export function openCorner(addr) {
  if (openWhole.has(addr)) openWhole.delete(addr); else openWhole.add(addr);
  markDirty();
}

/**
 * A document's corner element in the corner layer: a group named by its own
 * words (no string of the page's: it labels itself), out of the Tab order
 * and hidden from assistive technology until it is the focused document's.
 * @param {HTMLElement} into the corner layer
 * @param {string} addr
 * @returns {Corner}
 */
function makeCorner(into, addr) {
  const el = document.createElement('div');
  el.className = 'corner';
  el.dataset.corner = addr;
  el.id = 'corner-' + addr;
  el.setAttribute('role', 'group');
  el.setAttribute('aria-labelledby', el.id);
  el.setAttribute('aria-hidden', 'true');
  into.appendChild(el);
  /** @type {Corner} */
  const c = { el, html: '', compact: false, column: 0, cap: Infinity, w: 0, h: 0, x: 0, y: 0, stale: true, mine: false, blockedAt: -1 };
  corners.set(addr, c);
  return c;
}

/** remove a document's corner, and its opening whole with it; true where it held the focus */
function dropCorner(/** @type {string} */ addr) {
  const c = corners.get(addr); if (!c) return false;
  const held = c.el.contains(document.activeElement);
  c.el.remove(); corners.delete(addr); openWhole.delete(addr);
  return held;
}

/**
 * The client rects of a span in a mounted article: without a width, those
 * of the block keyed by its first position — its box, one for each part of
 * it standing (the edge a beam leaves from, the arrival at a document named
 * whole); with one, those of the bytes named, line by line, where the parts
 * holding its first and last positions stand (S1 Q1: the line a beam leaves
 * at, the arrival mark's outline, an overlay at the selection) — and where
 * the span lies wholly inside a withheld run, whose gap holds no bytes to
 * name, the run's own boxes, one for each part of its gap standing, never a
 * line at an offset inside the gap (see the head).
 * @param {string} addr
 * @param {number} pos the block's first position, or the span's
 * @param {number | null} [width] the span's positions
 * @returns {Array<{x: number, y: number, w: number, h: number}> | null}
 */
export function spanRects(addr, pos, width = null) {
  const rec = mounted.get(addr); if (!rec) return null;
  const run = width != null ? rec.made.blocks.find((b) => b.kind === 'withheld' && b.pos <= pos && pos + width <= b.pos + b.width) : null;
  if (width != null && !run) {
    const r = rangeOf({ addr, pos, width });
    const rs = r ? [...r.getClientRects()].map((q) => ({ x: q.left, y: q.top, w: q.width, h: q.height })) : [];
    return rs.length ? rs : null;
  }
  const parts = run ? `.withheld[data-pos="${run.pos}"]` : `.sp[data-pos="${pos}"]`;
  const rs = [...rec.el.querySelectorAll(parts)].flatMap((sp) => [...sp.getClientRects()].map((r) => ({ x: r.left, y: r.top, w: r.width, h: r.height })));
  return rs.length ? rs : null;
}

/**
 * The client rects of the signs its column's edge holds beside a block of a
 * mounted article — its others' count, a withheld run's mark (FP-26) — where
 * the part holding the block's first line stands:
 * what a beam or a tail leaving the block's line starts past (BM's
 * `leaveAt`); none where none stands.
 * @param {string} addr
 * @param {number} pos the block's first position
 * @returns {Array<{x: number, y: number, w: number, h: number}>}
 */
export function signRects(addr, pos) {
  const rec = mounted.get(addr); if (!rec) return [];
  return [...rec.el.querySelectorAll(`[data-pos="${pos}"] > .edge`)].map((e) => { const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
}

/**
 * The client rects of the bytes of a span its mounted article's standing
 * parts hold, line by line: `spanRects` over the stretch of it the parts
 * standing hold (`standingStretch`), so a span whose first or last line
 * stands in no part — out of view, a column away — is outlined on its own
 * glyphs where its lines stand (P-RENDER's arrival mark, its other lines
 * outlined on their fold's boxes, `foldBoxes`, and the light a one-step move
 * along the trail draws with its marks); null where no part standing holds
 * any of it.
 * @param {string} addr
 * @param {number} pos
 * @param {number} width
 * @returns {Array<{x: number, y: number, w: number, h: number}> | null}
 */
export function standingRects(addr, pos, width) {
  const rec = mounted.get(addr), made = rec && madeOf(rec.el); if (!rec || !made) return null;
  const parts = blockEls(rec.el).map((e) => ({ pos: Number(e.dataset.pos), char: charBase(e), length: ownLength(e) }));
  const s = standingStretch(made.blocks, parts, { addr, pos, width });
  return s ? spanRects(addr, s.pos, s.width) : null;
}

/**
 * The stretch of a span an article's standing parts hold: from the first
 * position of it a part standing holds to the last — a typed line's part
 * holding the positions of its own characters, any other block's part the
 * whole block; null where no part standing holds any of it.
 * @param {Block[]} blocks the blocks the article was made from
 * @param {Array<{pos: number, char: number, length: number}>} parts the parts standing: each by its block's first position, the character it starts at and its own characters
 * @param {Span} span
 * @returns {Span | null}
 */
export function standingStretch(blocks, parts, span) {
  const end = span.pos + span.width;
  let lo = Infinity, hi = -Infinity;
  for (const p of parts) {
    const b = blocks.find((x) => x.pos === p.pos); if (!b) continue;
    const from = b.kind === 'para' ? posOfChar(b, p.char) : b.pos, to = b.kind === 'para' ? posOfChar(b, p.char + p.length) : b.pos + b.width;
    if (from < end && span.pos < to) { lo = Math.min(lo, Math.max(from, span.pos)); hi = Math.max(hi, Math.min(to, end)); }
  }
  return lo < hi ? { addr: span.addr, pos: lo, width: hi - lo } : null;
}

// ---- the platform's selection ↔ a span ------------------------------------------

/** the elements of an article's blocks in position order, a withheld run's face among them, a block split across columns by each of its parts */
function blockEls(/** @type {HTMLElement} */ el) { return /** @type {HTMLElement[]} */ ([...el.querySelectorAll('.run > .sp, .run > .withheld')]); }

/** the text nodes that carry a block's own characters, in order — the chrome inside it skipped */
function textNodes(/** @type {HTMLElement} */ el) {
  /** @type {Text[]} */
  const out = [];
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) { const p = n.parentElement; if (p && p.closest(CHROME)) continue; out.push(/** @type {Text} */ (n)); }
  return out;
}

/** the element a node is or sits in */
const elementOf = (/** @type {Node} */ n) => (n.nodeType === Node.ELEMENT_NODE ? /** @type {Element} */ (n) : n.parentElement);

/** the character a block part starts at, in its block's text: 0 for the block's first */
const charBase = (/** @type {HTMLElement} */ el) => Number(el.dataset.char || 0);

/** the parts of a block in an article, in order */
function partsOf(/** @type {HTMLElement} */ art, /** @type {number} */ pos) {
  return blockEls(art).filter((e) => Number(e.dataset.pos) === pos);
}

/**
 * The byte position a boundary point of a range names in a block part: the
 * character boundary the point falls at among the part's own text nodes,
 * counted from the character the part starts at, carried to its byte
 * position; a point outside the part names the part's edge on the side asked
 * — its first character's position, or past its last: the block's end where
 * the part holds the block's last character, whatever parts of it stand — and
 * a block that is not text (a withheld run, a record, a reference, hex) names
 * the block's edge.
 * @param {Block} b
 * @param {HTMLElement} el the part
 * @param {Node} node
 * @param {number} offset
 * @param {'start' | 'end'} side
 */
function posOfPoint(b, el, node, offset, side) {
  const base = charBase(el);
  if (b.kind !== 'para') return side === 'start' ? b.pos : b.pos + b.width;
  if (!el.contains(node)) {
    if (side === 'start') return base ? posOfChar(b, base) : b.pos;
    const end = base + ownLength(el);
    return end >= b.text.length ? b.pos + b.width : posOfChar(b, end);
  }
  let count = base;
  for (const tn of textNodes(el)) {
    const r = document.createRange(); r.selectNodeContents(tn);
    const c = r.comparePoint(node, offset);
    if (c < 0) return posOfChar(b, count);
    if (c === 0) return posOfChar(b, count + (node === tn ? offset : 0));
    count += tn.length;
  }
  return posOfChar(b, count);
}

/**
 * What an article was made from (`Made`): a mounted article's, or a reading
 * scene's pane's (`sceneArticle`); null where the element is neither.
 * @param {HTMLElement} el the article's element
 * @returns {Made | null}
 */
export function madeOf(el) {
  const rec = mounted.get(el.dataset.addr || '');
  return rec && rec.el === el ? rec.made : panes.get(el) || null;
}

/** the article a range starts in, else the one it ends in; null where it lies in none */
function articleOfRange(/** @type {Range} */ range) {
  const at = (/** @type {Node} */ n) => { const e = elementOf(n); return e ? /** @type {HTMLElement | null} */ (e.closest('article.dtext')) : null; };
  return at(range.startContainer) || at(range.endContainer);
}

/**
 * The span a platform range covers in an article: the first and last of the
 * block parts of the blocks the article was made from that the range
 * touches, each end carried to its byte position — an end outside its part
 * names that part's edge, so a range that starts in the article's head
 * starts at its first block; null where the range is collapsed or touches no
 * block.
 * @param {HTMLElement} el the article's element
 * @param {Made} made what the article was made from
 * @param {Range} range
 * @returns {Span | null}
 */
function spanIn(el, made, range) {
  if (range.collapsed) return null;
  const hit = blockEls(el)
    .map((e) => ({ el: e, b: made.blocks.find((x) => x.pos === Number(e.dataset.pos)) || null }))
    .filter((x) => x.b && range.intersectsNode(x.el));
  if (!hit.length) return null;
  const first = hit[0], last = hit[hit.length - 1];
  const p0 = posOfPoint(/** @type {Block} */ (first.b), first.el, range.startContainer, range.startOffset, 'start');
  const p1 = posOfPoint(/** @type {Block} */ (last.b), last.el, range.endContainer, range.endOffset, 'end');
  return p1 > p0 ? { addr: made.addr, pos: p0, width: p1 - p0 } : null;
}

/**
 * The span a platform range covers in a mounted article (`spanIn`): the
 * article the range starts in, else ends in; null where that is no mounted
 * article — a reading scene's pane's among them, whose selection is never the
 * page's — or the range covers no span of it.
 * @param {Range} range
 * @returns {Span | null}
 */
export function spanOfRange(range) {
  const art = articleOfRange(range);
  const rec = art ? mounted.get(art.dataset.addr || '') : undefined;
  return art && rec && rec.el === art ? spanIn(art, rec.made, range) : null;
}

/** the platform's selection as a span of a mounted article, or null where none stands there */
export function spanOfSelection() {
  const s = window.getSelection();
  if (!s || s.rangeCount === 0 || s.isCollapsed) return null;
  return spanOfRange(s.getRangeAt(0));
}

/**
 * The boundary point of a block at a byte position, in the part that holds
 * it: the text node and offset of the character boundary there — at a
 * part's first character on the start side, past the part before's last on
 * the end side; a block that is not text answers its edges. Null where no
 * part of the block standing holds the position: a line out of view.
 * @param {Block} b
 * @param {HTMLElement[]} parts the block's parts standing, in order
 * @param {number} pos
 * @param {'start' | 'end'} side
 * @returns {{node: Node, offset: number} | null}
 */
function pointOfPos(b, parts, pos, side) {
  if (b.kind !== 'para') { const el = side === 'start' ? parts[0] : parts[parts.length - 1]; return side === 'start' ? { node: el, offset: 0 } : { node: el, offset: el.childNodes.length }; }
  const ci = charOfPos(b, pos);
  let el = parts[0];
  for (const p of parts) if (side === 'start' ? charBase(p) <= ci : charBase(p) < ci) el = p;
  if (ci < charBase(el) || ci > charBase(el) + ownLength(el)) return null;
  let at = ci - charBase(el);
  const nodes = textNodes(el);
  for (const tn of nodes) { if (at < tn.length || (side === 'end' && at === tn.length)) return { node: tn, offset: at }; at -= tn.length; }
  const last = nodes[nodes.length - 1];
  return last ? { node: last, offset: last.length } : { node: el, offset: side === 'start' ? 0 : el.childNodes.length };
}

/**
 * The platform range over a span of a mounted article, or null where the
 * article is not mounted or the span lies in none of the blocks it was made
 * from.
 * @param {Span} span
 * @returns {Range | null}
 */
export function rangeOf(span) {
  const rec = mounted.get(span.addr);
  return rec ? rangeIn(rec.el, span) : null;
}

/**
 * The platform range over a span in an article — a mounted one, or a
 * reading scene's pane's, which borrows this mapping as it borrows the
 * article — its ends carried from byte positions to character boundaries of
 * the blocks the article was made from (`madeOf`), never the model's newest,
 * in the part of each block that holds them, the chrome skipped; null where
 * the element is no such article, the span is another document's, it lies in
 * none of those blocks, or no part standing holds its first or its last
 * position.
 * @param {HTMLElement} el the article's element
 * @param {Span} span
 * @returns {Range | null}
 */
export function rangeIn(el, span) {
  const made = madeOf(el);
  if (!made || made.addr !== span.addr) return null;
  const end = span.pos + span.width;
  const blocks = made.blocks;
  const b0 = blocks.find((b) => span.pos >= b.pos && span.pos < b.pos + b.width) || blocks.find((b) => b.pos >= span.pos) || null;
  const b1 = [...blocks].reverse().find((b) => end > b.pos && end <= b.pos + b.width) || [...blocks].reverse().find((b) => b.pos + b.width <= end) || null;
  const e0 = b0 ? partsOf(el, b0.pos) : [], e1 = b1 ? partsOf(el, b1.pos) : [];
  if (!b0 || !b1 || !e0.length || !e1.length || b1.pos < b0.pos) return null;
  const s = pointOfPos(b0, e0, span.pos, 'start'), t = pointOfPos(b1, e1, end, 'end');
  if (!s || !t) return null;
  const r = document.createRange(); r.setStart(s.node, s.offset); r.setEnd(t.node, t.offset);
  return r.collapsed ? null : r;
}

/** @type {Span | null} the span the platform's selection was last placed over, as its range reads back */
let placed = null;

/** does a platform range lie in the plane's text layer, where the page's selection is drawn? */
const inLayer = (/** @type {Range} */ r) => !!layer && layer.contains(r.commonAncestorContainer);

/**
 * Place the platform's selection over a span as the page selects it — a
 * click, Enter, K-8, an act's own. Selecting is the person's act, so it
 * takes the platform's one selection wherever that stood: one that already
 * covers the span is left as it stands, as the person made it; any other —
 * in the layer, in a reading scene's pane, over an overlay's text — is
 * replaced by the span, its anchor at its start, where the span's article
 * stands — where its first or last line stands in no part, the span is owed
 * its range, which the frame places once it stands them (`placeAgain`). Null
 * clears a selection that lies in the layer and never touches one outside
 * it, as the remount's put-back never does. Either way the selection kept
 * from an article taken down (`kept`) is dropped: the page's selection is
 * this one now.
 * @param {Span | null} span
 */
export function placeSelection(span) {
  kept = null;
  owed = null;
  const s = window.getSelection(); if (!s) return;
  const standing = s.rangeCount ? s.getRangeAt(0) : null;
  if (!span) { placed = null; if (standing && inLayer(standing)) s.removeAllRanges(); return; }
  const have = standing && !standing.collapsed ? spanOfRange(standing) : null;
  if (have && sameSpan(have, span)) { placed = have; return; }
  const r = rangeOf(span);
  if (!r) { if (mounted.has(span.addr)) owed = span; return; }
  s.removeAllRanges(); s.addRange(r);
  placed = spanOfRange(r);
}

/**
 * Put the platform's selection back over a span after the article holding
 * it was rebuilt, as the person left it: its anchor at the end it stood at
 * as the old article was taken down (`kept`), where that selection covered
 * this span; else at the span's start (`selectIn`). It goes
 * back only where the platform's selection is collapsed, absent or in the
 * layer: one standing outside the layer — a drag in a reading scene's pane,
 * over an overlay's text, made before the take-down or after it — is the
 * person's, and stands as they made it, so the copy is of it (`onCopy`). A
 * caret, wherever it stands, holds nothing they chose. `kept` decides the
 * anchor's end alone: taking an article down leaves a selection that stood
 * in it collapsed in the layer, where the put-back takes it. The span owed its
 * range (`placeSelection`) goes on so; it stays owed while its first or last
 * line stands in no part, and stops being owed once the person holds a
 * selection of their own outside the layer.
 * @param {Span} span
 */
function placeAgain(span) {
  const backward = !!kept && kept.backward && sameSpan(kept.span, span);
  kept = null;
  const s = window.getSelection();
  if (!s || (s.rangeCount && !s.isCollapsed && !inLayer(s.getRangeAt(0)))) { owed = null; return; }
  const rec = mounted.get(span.addr);
  if (!rec || !selectIn(rec.el, span, backward)) { owed = rec ? span : null; return; }
  owed = null;
  placed = s.rangeCount ? spanOfRange(s.getRangeAt(0)) : null;
}

/**
 * The span the platform's selection was last placed over, as that range
 * reads back — a block placed whole reads back as its text, its separator
 * not among the characters — so the input tells a selection the page made
 * from one the person made and never takes the page's own back as a new
 * one; null where none stands.
 */
export const placedSpan = () => placed;

/** the rect of a symbol element for a link in a mounted article */
export function symbolRect(/** @type {string} */ addr, /** @type {string} */ linkAddr) {
  const rec = mounted.get(addr); if (!rec) return null;
  const el = rec.el.querySelector(`.sym[data-link="${linkAddr}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.height };
}

/**
 * The view a reading scene's pane's article draws (T-ARTICLE's scene-mode
 * variant): the links LK shows at its document now, their counts, its
 * corner's state — what the scene keeps beside the pane as it sets it, so the
 * pane's marks and lines stay the ones its text was set with, and it is set
 * again from them with no read (SC; FP-23).
 * @param {Doc} d
 * @returns {ArticleView}
 */
export const sceneView = (d) => viewFor(d, true);

/**
 * A document's article for a reading scene's pane — the scene borrows the
 * mount (FP-12's second target; the structure record §3.4 (vii)): T-ARTICLE's
 * scene-mode variant, laid out by the pane's own style in one column at the
 * plane's measure and never transformed, and never hidden from assistive
 * technology as the plane's articles are, a pane's text being what it reads
 * there; what it was made from is kept beside it (`madeOf`) for as long as the
 * element lives. The scene places the element in its pane; this is the one
 * place it is made — from a record and the view it draws, the model's now or
 * what the scene kept of them as it last set the pane, and named by the
 * addresses the scene gives it: the one its acts name and its positions are
 * mapped against — at an edition read at its bare address, the member its
 * text is (SC; FP-23) — and the one its head shows.
 * @param {Doc} d the record its text is made from
 * @param {{view?: ArticleView, names?: string, shows?: string}} [as] `view` the view it draws — the record's now (`sceneView`) where none is given; `names` the address it is made as (`Made.addr`), which a copy from it names and its spans are measured against — the record's where none is given; `shows` the address its head names — `names` where none is given
 * @returns {HTMLElement}
 */
export function sceneArticle(d, as = {}) {
  const names = as.names ?? d.addr, shows = as.shows ?? names;
  const el = document.createElement('article');
  el.className = 'dtext scene';
  el.dataset.addr = names;
  el.innerHTML = articleHTML(shows === d.addr ? d : { ...d, addr: shows }, as.view ?? viewFor(d, true), REC.ownerAccount(d));
  panes.set(el, { ...madeFrom(d), addr: names });
  return el;
}

/**
 * A document's article as P-LAY's plan — the rows its lines are predicted
 * from — from the same view its article is mounted with.
 * @param {Doc} d
 * @returns {import('../plane/layout.js').Row[]}
 */
export function planOf(d) { return articlePlan(d, viewFor(d), REC.ownerAccount(d)); }

/**
 * A pane's corner items (ux-T2: each pane its own), from the view the pane's
 * article is made from — the record's now where none is given (`sceneView`);
 * the scene holds their element, on the pane's outer side, and hands in the
 * version it names, the chain's count and the corner's act (SC).
 * @param {Doc} d
 * @param {ArticleView} [view]
 * @returns {string}
 */
export function sceneCorner(d, view = viewFor(d, true)) { return cornerHTML(d, view); }

/** a document's corner on the plane, or null where it carries none now (the gate's containment check reads it) */
export function cornerOf(/** @type {string} */ addr) { const c = corners.get(addr); return c ? c.el : null; }
/** a document's corner as the last frame placed it: the column it stands beside, whether it stands compact, and whether a reader's act opened it whole (`openCorner`); null where none stands */
export function cornerAt(/** @type {string} */ addr) { const c = corners.get(addr); return c ? { column: c.column, compact: c.compact, opened: openWhole.has(addr) } : null; }

/** the text of a mounted article (the gate's rendered case): its standing parts' blocks, in their lines' order */
export function mountedText(/** @type {string} */ addr) {
  const rec = mounted.get(addr); if (!rec) return null;
  const runs = [...rec.el.querySelectorAll('.run')];
  return runs.length ? runs.map((r) => r.textContent).join('') : rec.el.textContent;
}

/** every document whose article stands in the mount band (`isMounted`) */
export const mountedAddrs = () => [...mounted.values()].filter((rec) => rec.banded).map((rec) => rec.d.addr);

/**
 * Does a world point stand in one of a document's columns — where its text
 * stands, or will once it arrives (APP-INPUT holds a press there at reading
 * scale until the text under it stands)?
 * @param {string} addr
 * @param {number} x
 * @param {number} y
 */
export function holdsText(addr, x, y) {
  const f = foldOf(REC.doc(addr)), box = docBox(addr);
  return f.columns.some((c) => x >= box.x + c.x && x <= box.x + c.x + c.w && y >= box.y + c.y && y <= box.y + c.y + c.h);
}

/**
 * The screen boxes of the lines of a document's fold holding a span, each the
 * width of its column, with the line it is (an index into the fold's lines,
 * as `lineStands` reads them) and its column — in the fold its article stands
 * in where one stands, else the one `foldOf` sets, whatever its scale: what
 * P-RENDER outlines an arrival's run on where no part of it stands as text
 * (FP-21), and what `lineBoxes` reads; none where the document's text has
 * not arrived.
 * @param {string} addr
 * @param {number} pos
 * @param {number} width
 * @returns {Array<{line: number, column: number, rect: Rect}>}
 */
export function foldBoxes(addr, pos, width) {
  const rec = mounted.get(addr), d = REC.doc(addr);
  if (!rec && d.from < 0) return [];
  const f = rec ? rec.fold : foldOf(d), blocks = rec ? rec.made.blocks : d.blocks, box = docBox(addr), end = pos + Math.max(1, width);
  /** @type {Array<{line: number, column: number, rect: Rect}>} */
  const out = [];
  f.columns.forEach((c, ci) => {
    for (let i = c.first; i < c.first + c.n; i++) {
      const l = f.lines[i];
      if (l.at == null) continue;
      // the positions a line holds: from its first own character to the next line's of its block, else to its block's end
      let next = Infinity;
      for (let k = i + 1; k < f.lines.length && f.lines[k].pos === l.pos; k++) { const a = f.lines[k].at; if (a != null && a > l.at) { next = a; break; } }
      const b = next === Infinity ? blocks.find((x) => x.pos === l.pos) : null;
      const to = next === Infinity ? (b ? b.pos + b.width : l.at + 1) : next;
      if (l.at < end && pos < to) out.push({ line: i, column: ci, rect: { x: sx(box.x + c.x), y: sy(box.y + c.y + (l.top - c.top) * f.fs), w: c.w * cam.scale, h: l.h * f.fs * cam.scale } });
    }
  });
  return out;
}

/**
 * The screen boxes of the lines of a document's fold holding a span, each the
 * width of its column — where the document's article stands in the mount
 * band (`foldBoxes`): BM's beams leave a line that stands in no part where its
 * fold sets it; null where no such article stands.
 * @param {string} addr
 * @param {number} pos
 * @param {number} width
 * @returns {Rect[] | null}
 */
export function lineBoxes(addr, pos, width) {
  const rec = mounted.get(addr); if (!rec || !rec.banded) return null;
  return foldBoxes(addr, pos, width).map((b) => b.rect);
}

/** the boundary point of the text of the plane's layer under a screen point, as the platform finds it; null where none stands there */
function caretPoint(/** @type {number} */ x, /** @type {number} */ y) {
  const d = /** @type {any} */ (document);
  /** @type {{node: Node, offset: number} | null} */
  let p = null;
  if (typeof d.caretPositionFromPoint === 'function') { const c = d.caretPositionFromPoint(x, y); if (c) p = { node: c.offsetNode, offset: c.offset }; }
  else if (typeof d.caretRangeFromPoint === 'function') { const r = d.caretRangeFromPoint(x, y); if (r) p = { node: r.startContainer, offset: r.startOffset }; }
  return p && layer && layer.contains(p.node) ? p : null;
}

/**
 * A press the canvas took at reading scale, once the text under it stands
 * (APP-INPUT; see the head): the platform's selection collapsed at the point
 * under it, the drag's anchor, as a press on the text sets it; false where no
 * text of the layer stands there.
 * @param {number} x
 * @param {number} y
 */
export function caretAt(x, y) {
  const p = caretPoint(x, y), s = window.getSelection();
  if (!p || !s) return false;
  s.collapse(p.node, p.offset);
  return true;
}

/** the drag's other end carried to the text under a screen point, from the anchor `caretAt` set; nothing where no text of the layer stands there */
export function extendTo(/** @type {number} */ x, /** @type {number} */ y) {
  const p = caretPoint(x, y), s = window.getSelection();
  if (p && s && s.rangeCount) s.extend(p.node, p.offset);
}

/** unmount everything and take the corners and the held labels down (a board change); a corner that held the focus hands it to the walk */
export function clear() {
  for (const a of [...mounted.keys()]) unmount(a);
  hold = null;
  owed = null;
  let lost = false;
  for (const a of [...corners.keys()]) lost = dropCorner(a) || lost;
  for (const h of helds.values()) h.el.remove();
  helds.clear();
  openWhole.clear();
  openLabels.clear();
  if (lost) read.handOff();
}

/**
 * The copy event's addition (foundations §2.4; FP-24): the copy of any
 * selection in an article — a mounted one, or a reading scene's pane's, where
 * a drag selects as it does on the plane (§2.5) — replaces the clipboard, the
 * platform's own
 * copy prevented, and carries the passage's board and address beside the
 * plain text and never in it, in a flavor only a skep client reads, as
 * `{board, addr, pos, width}`: the span the platform's selection covers in
 * the article it starts in, else ends in (`spanIn`), through the blocks that
 * article was made from, written whether or not the span holds text. The
 * plain text is the span's items in the text's order as the article was made
 * from them (T-ARTICLE's `copyText`) — the bytes the person selected,
 * whatever the model has delivered since, each item that holds no text a
 * stand-in in square brackets in its place, so a span of a record alone is
 * never an empty clipboard — and a paste anywhere else carries the passage
 * alone and no label of the page (the head's, a hairline's, a mark's, a
 * symbol's, a count's, an item's rendering). A selection in no article
 * leaves the event to the platform.
 * @param {{clipboardData: {setData(format: string, data: string): void} | null, preventDefault(): void}} e the clipboard event (the gate's door hands a stub)
 * @param {string} board the board's origin
 * @returns {Span | null} the span copied
 */
export function onCopy(e, board) {
  const s = window.getSelection();
  if (!s || s.rangeCount === 0 || s.isCollapsed || !e.clipboardData) return null;
  const range = s.getRangeAt(0), art = articleOfRange(range), made = art ? madeOf(art) : null;
  const span = art && made ? spanIn(art, made, range) : null;
  if (!span || !made) return null;
  e.clipboardData.setData('text/plain', copyText(made, span, originOwner));
  e.clipboardData.setData('application/x-skep-passage', JSON.stringify({ board, addr: span.addr, pos: span.pos, width: span.width }));
  e.preventDefault();
  return span;
}
