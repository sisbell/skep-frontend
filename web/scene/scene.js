// SC — the reading scene (the structure record §3.2; B1-S9; foundations
// §2.5; law 12). Layer 2. ENGINE-BOUND. State (FP-10): the pair, the two
// ends it sets level, whether the far end names pane B's document whole, the
// bands' extents, the lines' ends, the strokes and the passages shared with
// the near one as measured in the panes, the last measure's figures, the
// stroke whose list stands, the stop's next passage, the passage its act last
// went to and whether its appearance was said, a stop the reader returned to
// with what its answer told and an act waiting on it, the panes' scrolls,
// each pane's text — the record it was made from, the version it reads and
// the address it names, the links and far ends and its owner's byline facts
// it was set with — and its corner — opened whole or not, its head's rows —
// the fit both panes are set at and the band their heads reserve, the
// settings reading and the acts and checks waiting on them, the element it
// was opened
// from, and its own end and the faces a returned stop shows, the app's to
// hand in; view state, never written (FP-7).
// Two documents at reading scale side by side over the plane, each pane
// scrolling on its own (R3); the places unmoved, nothing written; the dialog
// named as it attaches by ST's `L.scene-label`. It sets the two ends level
// (§2.5): the passage the opener holds — a link's span, a selection, the
// versions list's held passage, provenance's span, a landing's passage —
// where pane A's text as the scene reads it places the bytes the opener
// names it by, else at the positions it names (`placedHeld`), at its first
// stretch of shared identity, and its counterpart in the other document, or
// the far end a link names (`levels`); each pane's matched line brought to
// one height, LEVEL_AT px below the panes' tops or higher where one stands
// above it, and each article given a pane's height of room below its end so
// a passage near the end can be brought there too (`level`); the re-level
// act (K-62) restores that. Where the far end of the link it is opened from
// names pane B's document whole (`Held.wholeB`), nothing of that document is
// set level with the near passage: pane B opens at its start, where its
// follow lands, the near passage set as for any link, and the re-level
// returns both there (FP-30).
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
// and shared identity as bands from `compare`'s pairs, each run of pairs
// adjoining in both documents one band (`merged`), its runs exact, so no
// band spans a difference and runs in another order cross. Each line leaves
// its pane at its passage's first line; each band is drawn at its extent on
// each pane's facing edge (FP-26; `banded`, `drawBand`): from the top of the
// box its run's first byte stands in to the bottom of its last byte's
// (`boxesIn`) — a character's line box, a blank line's, an item's own — two
// bands consecutive on a side meeting where the bytes between them there
// take no whole line, at the middle of a line they share or at the edge
// between their lines, and leaving an unbanded stretch where they take one;
// runs holding one identity twice share nothing. Every end is measured
// through T-LAYER's byte-span mapping over the pane's article and the blocks
// it was made from when the scene is set level, a pane is set again or the
// panes change size (`measure`), and moved with each pane's scroll (`draw`);
// an end that has left its pane is clipped at the pane's edge with the
// stub's triangle, in that end's hue, a band's held inside the pane's
// visible height.
// Where two runs consecutive in both documents meet on both sides, the
// difference between them has no drawn height: their shared edge is a
// stroke, drawn in the gutter's half beside each pane holding bytes between
// them (`drawStroke`), strokes at one place one stroke with their count
// (`banded`). Each stroke in view is a native button in the gutter
// (`#scenestrokes`; `placeStrokes`), its count shown where it stands for two
// changes or more, named by each change's characters on each side, read
// from the text its panes were set with by T-ARTICLE's item rule
// (`copyText`), white space kept and an item by its stand-in; its act — a
// click, Enter or Space — shows those words whole in a list at it (O-HOST's;
// `showChanges`), which a setting of the panes draws again from the stroke
// standing at the same bytes, or, where none stands, leaves standing and
// saying so (FP-36), and which the scene's own end dismisses. A stroke is
// keyed by the permanent address of the byte before its first change
// (`strokeKey`), so its button, its list and the stop the scene's record
// names follow it across a setting.
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
// a pane reached where the row named its document's box, or where M-PUMP
// names its document as windowing an origin whose clause may be decided
// anew, and none offers a reload. Its byline is made as it is set, with its
// owner's facts as the model holds them then (FP-34): read before it is set,
// a read a drop of the byline causes overtook begun again, DROP_ATTEMPTS
// reads in all (`readFacts`), and read where it is set without them (`swap`);
// owner facts M-PUMP takes anew reach each pane on a document the owner holds
// (M-PUMP's `bylineTaken`) once no setting reads, so a setting out lands as
// asked, and read it again in its place where its byline was made with other
// facts (`dropped`) — the plane and the pane stating one byline. A draft —
// any text no publication fixes — is read again whole and
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
// other change of its class (M-PUMP's `classChanged`): each is set again from
// what the change left of its record — a text read as published standing,
// its runs from drafts withheld runs and the links homed in drafts gone with
// their ties, the reader's place and the selection carried into it; any
// other taken down to its cover — no band standing; then each is read again
// at the class the page reads at then,
// a document withheld from a guest standing as its head alone; a pane on a
// covered draft stays open (FP-29), its head its cover, its corner saying it
// is withheld,
// the bands of shared identity gone with its text, and every line homed in
// the readable pane whose far end lies in it ending at the cover
// (`farEndIn`, `coverIn`), clipped and stubbed as any end whose line has
// left its pane. A pane being set again by the board's events stands kept as
// it shows until a setting of it lands (`Pane.kept`), from the row or drop
// that left it behind, and says so once it has stood a second, or while
// M-PUMP holds its record so as it reads it again (M-PUMP's `kept`): its
// corner's last item the clause a box's corner carries, by the one rule
// (T-LAYER's `keptWords`), the refusal that left its reads unset after it,
// lifting in the step that sets the pane; while the board lags (M-PUMP's
// `boardKept`), each corner naming neither the latest version nor the
// chain's count, written again as the lag begins and ends (`markKept`); a
// withheld origin's held claims' clause in its statement, as the plane's; and
// each pane standing kept told to the one line, which speaks for it
// (`keptPanes`; FP-36): its name as the mirror finds it, its clause past its
// second, the stamp it stands from and whether it holds the focus — with how
// the setting the board's events asked set it, changed or unchanged
// (`paneLift`), none where an act of the reader's set it, nor where a change
// of the page's class set it from what the change left.
// Every setting is one step (`setPanes`; FP-23): the reads first — the text
// whole, the two texts' `compare`, where each far end crossing between them
// stands (`readPane`, `readBetween`) — then, where the scene still stands
// and no later setting was asked of the pane, with nothing awaited: the new
// article made and swapped in, the reader's place, the selection and the
// ends set level carried by their bytes' identity through the images the two
// articles were made from, the ties measured anew and drawn. While a pane is
// being set again its own keys, the re-level and the corner's act wait for
// it (`whenSet`); ending the scene never waits, so a board that does not
// answer holds no scene open. A setting the board's events asked is made
// from its reads' answers alone: where its whole read met a refusal that
// says nothing of the document — its text's among them — the pane keeps what
// it shows, kept, saying why; where the board did not answer one of its
// reads, it sets nothing and is asked again once M-PUMP's pause ends
// (`afterPause`), where the scene stands and no later setting was asked of
// the pane, the pane's keys, the re-level and the corner's act acting on what
// it shows meanwhile.
// It opens through O-HOST's `opening` on its reads, both documents whole and
// their `compare` (`open`): an act that ends the opening while they read
// leaves their answer opening nothing, and no `compare` is asked after it;
// as it shows, the act that asked for it ends the chrome of the place it
// leaves (`Showing`'s `leaving`), and it answers whether it showed and the
// refusal its reads met where it did not (`Opening`). Where the far end names
// pane B's document whole, the opening waits on no `compare`: the scene shows
// on the two texts and where the far ends crossing between them stand, the
// `compare` asked as it shows, and its answer, where the scene stands and
// neither pane was set again meanwhile, adds the bands, says a refusal in
// the bar and the status region and answers a stop the reader returned to —
// moving no pane and no focus, and holding no act of the panes' (`addBands`).
// The scene is a step on
// the trail, which N-GO keeps (`toScene`, `closeScene`): its own end —
// zoom-out, Esc, ←, the bar's × — is a Back from its entry, the bar's handed
// in by the app (`attach`), and `close` ends it as a navigation act's
// departure does, leaving the plane as it was: the scene never moves the
// camera. As the reader leaves its entry, N-GO records the scene as they
// left it (`asLeft`): each pane's version; where the reader stood in it, its
// selection and the end set level in it, each by its bytes' identity
// through the image its article was made from, never a scroll offset; and
// the stop the platform's focus stood on (`stopOf`) — the stop at a band's
// clipped end and a stroke's button, which only the panes' `compare` draws,
// by its kind and what it stood for, named as FP-27 names a copy (`Named`):
// the board and the document read, the bytes by identity, and the member
// and its positions where the text is published, never a draft's — the
// stop's passage of pane B and the one its act last went to (`sharedStop`),
// a stroke's runs' facing bytes and each change's bytes on each side
// (`strokeStop`) — with where it stood; and a stroke's list standing, by its
// stroke's key, with whether the focus stood in it (`Listed`; FP-36). A
// cursor move back onto the entry reopens it so (`reopen`): each pane's
// record read again — an edition read at its bare address whose chain went
// past the member its text was, pinned to that member (FP-23) — the two ends
// set level, each pane whose text holds its place's bytes brought back to
// them, any other left where the re-level set it, its selection put back on
// the same bytes, the focus on the stop it stood on and the pair named in
// the status region; the stroke's list shown again over the stroke bearing
// its key once the strokes are measured, its rows read from the panes' texts
// then, the focus on its first row where it stood in the list — the gone
// line said where no stroke bears the key (`relisted`).
// A stop only the panes' `compare` draws, the reader left from, stands with
// the landing as the scene reopens and takes the focus, other keys acting
// from it (`returning`; FP-20): drawn, never hidden, where what it stood for
// stands in the panes' texts — the stop at pane B's facing edge level with
// its passage's first line, a stroke's button where its runs' facing bytes
// meet in each pane — held inside the panes' visible heights, else where it
// stood (`placeReturned`); named for its kind and what it stood for, its
// count — what only that read gives, with the stub's triangle, its bearing,
// which no band stands to draw — an empty box of its own width, being read
// (`nameReturned`; FP-34). The `compare` answering it (`answer`), what it
// stood for is read against the runs by BM-HELD's one rule (`sharedHeld`,
// `strokeHeld`; FP-21) and the stop drawn again in its place under the kept
// focus: all of it holding, the stop the one standing for it, its count
// filled, said politely; part, all of it in pieces, none, or nothing told —
// the board refusing, not answering, or a pane holding no text — it stays,
// saying so in FP-21's words, in its name and at its site through O-FACES
// (`showSaid`), "try again" offered where a retry may tell (`again`). An act
// made on it while it is read waits for the answer, said at the stop by
// O-FACES' reaching face, whose dismissal — Esc, Back — abandons it (`wait`;
// FP-25); answered, it is made where what it stood for holds, at the part
// held where only part does (`madeAct`), and dropped where none does,
// nothing told, or the reader moved on first — the focus left the stop, or
// they acted in the scene (`movedOn`, `actedIn`) — so the answer moves
// nothing. It stands so until it is answered and the reader has moved on,
// then under the scene's own rules (`draw`). A scene that read its `compare`
// before showing answers its stroke as it shows, the stop's name saying the
// answer where the focus lands.
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
// Each pane is a named region (SC9), named as the ARIA mirror names a
// document's item: by its corner's first item — its document's kind, else a
// refused document's own words (`paneLead`) — then its own document's
// address, the head of the article it holds (`namePane`) — pane B, where the
// far end names its document whole, by those and ST's `L.scene.whole-end`
// after them, `aria-current="location"` on it, the end being the document and
// no passage of it — its kind said once in the status region where its
// corner's slot fills while the focus stands in the pane (`sayKind`; FP-36);
// and ↓ and ↑ in it move by
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
// status region (FP-36), and hidden while every one is in view. Its act
// (`toShared`) scrolls pane B alone, the passage's first line level with the
// near passage's where that line is in view, else LEVEL_AT px below the
// pane's top, the passage gone to kept by its bytes' identity; a stop that
// leaves while it holds the focus hands it to pane B, and the re-level starts
// it at the first again, none gone to. The strokes in view, top to
// bottom, then the stop, are the scene's stops after pane A's corner and
// before pane B; a stroke that leaves view while it holds the focus hands it
// to pane B; and their keys are a button's own, as the bar's acts' are. A pane
// opens on a record read whole from the board, or on a record the page
// DERIVES (M-DERIVE; B3-S2, B3-S7) — the held version, a past state, a
// merge's list — handed to `open` in an address's place: nothing is read for
// it, its article is made from the record as given, its corner and its place
// are kept as a read pane's, and the entry a leaving records keeps the record
// itself (`Version.derived`), so a return reopens it reading nothing. A
// derived pane is read only: no `compare` is asked against it and no
// `project` into it — the links shown at it and the far ends crossing into it
// stand where their bytes stand in its own image, and none on bytes the page
// made (`placedInto`; LK's `shown`) — no row of the board's sets it again (its
// text is the page's, not the board's), its corner offers no version and its
// kept slot
// stands empty; a change of the page's class sets it again from the model's
// record of its document, as every pane (FP-29). A pane of a draft carries
// the draft's kept word in its corner (T-ARTICLE's draft arm; B3-S2), the
// statement open or closed as T-LAYER holds it (`openStatement`), its items
// written again as the word or the statement moves (`markKept`), and Enter
// at the corner opens the statement (D5 K-57, K-74) where the draft has a
// kept state. The panes
// borrow T-LAYER's mount (FP-12; the structure record §3.4 (vii)):
// `sceneArticle` makes each pane's article from the record and the view the
// scene keeps, `madeOf` and `rangeIn` map a position through the blocks it
// was made from, `selectionIn` and `selectIn` read and set the selection,
// and T-LAYER's copy event serves the panes (FP-24), each article made with
// where its pane's words are read (`whereIn`), so a copy from a pane names
// its words as one from the plane's box names the same words (FP-27); the
// scene keeps no DOM text of its own. Each pane carries its own document's
// corner (ux-T2; T-LAYER's `sceneCorner` and `sceneHead` make its items), its
// first slot its document's kind by the one test (T-LAYER's `kindOf`; FP-33):
// the pane's one Tab stop after the pane itself in either form, a group named by
// its own words (D5 K-57), and its Enter, or a click on the act, takes its
// act — a press on the act leaving the selection standing in the pane, the
// passage the act carries. The scene fits both panes once (`fitOf`; FP-12,
// FP-26), by P-LAY's fit (`fitFor`) of the narrower pane's content box at the
// reading size (P-CAM's), no margin past the column's edge — the pane's
// padding holds that room — and never shrinks their face: each pane's text is
// one column, the style's `--measure` advances of its face, both panes at the
// fit's measure and em — MEASURE_CPL with both corners whole beside their
// columns wherever a pane holds it so; else both compact, their usual states
// glyphs, the measure kept while it holds, then narrowed in characters while
// it keeps HEAD_CPL beside them; below that both corners stand at their
// documents' heads and their room goes back to the measure, the room beside
// the column's edge alone, the panes side by side however narrow it grows.
// Beside its column a corner stands on the pane's outer side — pane A's
// left, pane B's right — held to the top of the pane's scroll, so the bands
// and lines leave the inner edges clear of it (foundations §3.1). At its
// document's head (the plane's head form; T-LAYER's `sceneHead`) it stands
// above its text across the column and its edge, its rows at the reading
// line's pitch, both heads reserving the more of the two corners' rows, so
// both texts begin at one depth (`setBand`) — its first row held at the
// pane's top as the pane scrolls, its later rows scrolling with the text
// under it (`placeHeads`) — and no line the re-level, ↓ or ↑, the stop's act
// or a carried place brings to the pane's top stands under what that row and
// a form opened beneath it cover (`clearOf`). A compact corner opens whole on
// its act — a click on a glyph or on a head's count, or Enter at the corner
// where it offers no act of its own — over what stands beside it, moving
// nothing, and closes on the same act at the corner opened (`openWhole`;
// FP-26). Each column stands against the pane's
// inner edge, its column's edge between them — its counts there, and the
// statements of the origins its runs of other documents' material are of,
// withheld and transcluded alike, each once per origin in the pane by the
// plane's one rule, held inside its text as the pane scrolls
// (`placeStatements`; FP-31) — the bands leaving the pane beyond them
// (foundations §3.1; FP-26): a window wider than the measure needs widens the outer
// margins, never the line. The panes are read, not acted on (B1-S9): nothing
// in a pane's article is a control (T-ARTICLE's scene-mode variant), and the
// keys a pane takes move that pane alone (`key`). The bar names each pane by
// the address it shows, in the identifier's face (P-REG's FACE), so no head's
// row names it. The scene's acts are its bar's
// buttons — re-level (K-62, its chord drawn for the platform, rule 19) and
// the dismissal, the scene's own end — each pressed by a click anywhere on
// it, by Enter or by Space, a pane's corner's act, and a stroke's.
// A change of the panes' size, or a face that arrives once they are set
// (`refaced`), fits them again (`refit`): where the measure, the corners'
// form or the em moves, both panes are set again in one step at it, their
// texts kept, the reader's place — its first line in view — the selection
// and the ends set level carried by their bytes (FP-8, FP-23); else the fit
// is set on them again in place, their text kept where it stands on screen as
// the heads' band moves; and the ties are measured again. An in-document find
// opened in the scene
// reads the pane holding the focus, by the rule the scene's keys read it by
// (`paneRead`; N-FIND).
// Figures: the ends level LEVEL_AT px below the panes' tops; every run a
// band; a band's ground sameness's texture and its edges BAND_EDGE_W px of
// its boundary, a line 1.6 px at the link's value; a stroke STROKE_W px in
// sameness's boundary; strokes at one place where their heights lie within
// PLACE_TOL px on both sides; a stub's triangle 8 by 4 px, 6 px inside the
// pane's edge; a whole document's edge EDGE_W px wide, in the gap against
// the pane, at its mark's value; the stop 16 px tall over the stub's
// triangle, its count before it; a stroke's button 26 px tall, centred on
// the middle of the halves drawn, its count in its top 11 px, clear of the
// stroke; a returned stop's passage named by its first 48 characters at
// most, cut on a word.
// Rules: FP-1, FP-2, FP-7, FP-10, FP-12, FP-13, FP-20, FP-21, FP-22, FP-23,
// FP-24, FP-25, FP-26, FP-27, FP-29, FP-30, FP-31, FP-33, FP-34, FP-36.

import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as F from '../model/frames.js';
import * as LAYER from '../text/layer.js';
import * as LK from '../links/links.js';
import * as HOST from '../overlays/host.js';
import * as WALK from '../nav/walk.js';
import * as FOCUS from '../nav/focus.js';
import { drawChord } from '../nav/keys.js';
import { copyText, keptHTML, placeholderOf, edgeSignsFor, edgeStatementHTML, edgeKeyHTML, edgeCountHTML, originRunsOf, textIn, sourceStatementHTML, cornerLead, kindWord } from '../text/article.js';
import { inkOf, strokeOf, strokeIn, cutAt, pointOn } from '../beams/beams.js';
import { piecesOf, heldOf, saidOf, unknownOf, lineOf, floatingOf } from '../beams/held.js';
import { SAMENESS, HOLD, LABEL_MIN_PX, cornerWidth } from '../plane/register.js';
import { LINE_H, MEASURE, MEASURE_CPL, CHAR_W, EDGE, EDGE_GAP, fitFor } from '../plane/layout.js';
import { holdStack, LINE_BOX } from '../plane/labels.js';
import { markDirty, READING_PX } from '../plane/camera.js';
import { documentOf, homeOf, memberOf, versionAddress, isTrunkMember } from '../model/address.js';
import { t, tHTML } from '../strings.js';
import { esc, byteOffsets } from '../util.js';

/** @typedef {import('../model/frames.js').ComparePair} ComparePair */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Stretch} Stretch */
/** @typedef {import('../model/records.js').Declined} Declined */
/** @typedef {import('../model/records.js').ISpan} ISpan */
/** @typedef {import('../model/records.js').AccountFacts} AccountFacts */
/** @typedef {import('../model/pump.js').Dropped} Dropped */
/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../beams/beams.js').Ink} Ink */
/** @typedef {import('../plane/register.js').Mark} Mark */
/** @typedef {import('../text/article.js').ArticleView} ArticleView */
/** @typedef {import('../text/layer.js').Where} Where */
/** @typedef {import('../text/layer.js').Named} Named */
/** @typedef {import('../bridge/shapes').FeedUpdate} FeedUpdate */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */
/** @typedef {import('../beams/held.js').Met} Met */
/** @typedef {import('../beams/held.js').Said} Said */
/** @typedef {import('../overlays/host.js').Anchor} Anchor */

/**
 * @typedef {Object} Level — the two ends the scene sets level, a position in each pane's document; null where that pane stands at its top
 * @property {number | null} a
 * @property {number | null} b
 */

/**
 * @typedef {Object} Held — what an opener holds as it opens the scene
 * @property {number | null} [posA] the first position of the passage held in the first document, as the opener read it
 * @property {number | null} [widthA] its positions; absent or null, the position alone
 * @property {ISpan[]} [ids] the passage held by its bytes' identity, for an opener that holds it past the read it was measured on (N-GO's landing): the scene places them in pane A's text as it reads it, in the place of `posA` and `widthA` wherever that text holds any of them (`placedHeld`)
 * @property {number | null} [posB] the position in the second document the opener names — where a link's far end stands in its text now (LK's `farPos`) — where it names one
 * @property {boolean} [wholeB] the far end of the link the scene is opened from names the second document whole: nothing of it is set level with the passage held, and pane B opens at its start (see the head)
 */

/**
 * @typedef {Object} End — one end of a link's line between the panes: its passage, and where the passage's first line stands in its pane's scrolled content
 * @property {number} pos the passage's first position
 * @property {number} width its positions
 * @property {number} y the first line's middle, px below the pane's content top — at a cover, its head's address's (`coverIn`); at a whole document, 0, the end standing at no line
 * @property {boolean} [cover] it ends at its pane's cover (`Passage`)
 * @property {boolean} [whole] it is its pane's document whole (`Passage`)
 */

/**
 * @typedef {Object} Box — the stretch of its pane's facing edge a byte of the pane's text stands in, px below the pane's content top (`boxesIn`): a character's line box, a blank line's, an item's own; at a newline ending a line, that line's bottom, none tall
 * @property {number} top
 * @property {number} bottom
 */

/**
 * @typedef {Object} Measured — a run of shared identity as its panes set it: the boxes its first and last bytes stand in on each side (`boxesIn`)
 * @property {ComparePair} run
 * @property {{first: Box, last: Box}} a
 * @property {{first: Box, last: Box}} b
 */

/**
 * @typedef {Object} BandEnd — one end of a band: its run in its pane's document, and the stretch of the pane's facing edge it covers, px below the pane's content top (`banded`)
 * @property {number} pos the run's first position
 * @property {number} width its positions
 * @property {number} top
 * @property {number} bottom
 */

/** @typedef {{a: BandEnd, b: BandEnd}} Band a run of shared identity drawn at its extent on each pane's facing edge (`banded`) */

/**
 * @typedef {Object} Change — one difference a stroke stands for: the positions between two runs consecutive in both documents on each side, `from` equal to `to` where that side holds none
 * @property {{from: number, to: number}} a
 * @property {{from: number, to: number}} b
 */

/**
 * @typedef {Object} Stroke — where two runs consecutive in both documents meet on both sides (`banded`): the heights of their shared edge, px below each pane's content top, the gutter's halves it is drawn in, and the changes it stands for in the documents' order — several where strokes met at one place
 * @property {number} a its height on pane A's facing edge
 * @property {number} b its height on pane B's
 * @property {boolean} halfA pane A holds bytes between the runs: it is drawn in the gutter's half beside pane A
 * @property {boolean} halfB pane B holds bytes between them
 * @property {Change[]} changes
 * @property {string} [key] its key (`strokeKey`), set as the scene measures it
 */

/**
 * @typedef {Object} Shared — a passage of pane B's document holding the material of the passage held in pane A (`counterparts`), as measured in pane B
 * @property {number} pos its first position in pane B's document
 * @property {number} width its positions
 * @property {number} top its first line's top, px below pane B's content top
 * @property {number} y that line's middle
 */

/**
 * @typedef {Object} Tie — a link's line between the panes, its ends measured
 * @property {string} link the link's address
 * @property {End} a its end in pane A
 * @property {End} b its end in pane B
 * @property {{a: Ink, b: Ink}} ink each end's (`Line`)
 * @property {{a: Mark, b: Mark}} marks each end's mark (`Line`)
 * @property {number} value the link's own
 */

/** @typedef {{pos: number, width: number, x: number, top: number, bottom: number, above: boolean, below: boolean, clipped: boolean}} BandDrawn a band's end as the last draw drew it, on screen: its extent held inside its pane's visible height, and whether it passes the visible top (`above`) or bottom (`below`) */
/** @typedef {{pos: number, width: number, x: number, y: number, clipped: boolean, cover: boolean, whole: boolean}} LineDrawn a line's end as the last draw drew it, on screen */

/** @typedef {{kind: 'band', link: null, a: BandDrawn, b: BandDrawn} | {kind: 'link', link: string, a: LineDrawn, b: LineDrawn}} Drawn a band or a line as the last draw drew it, its ends on screen */

/**
 * @typedef {Object} StrokeDrawn — a stroke as the last draw drew it, on screen
 * @property {string} key its key (`strokeKey`)
 * @property {{x: number, y: number}} a its end at pane A's facing edge
 * @property {{x: number, y: number}} b its end at pane B's
 * @property {boolean} halfA
 * @property {boolean} halfB
 * @property {Change[]} changes
 * @property {{x: number, y: number}} at the point its button stands centred on: the middle of the halves drawn
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

/** @typedef {{pos: number, width: number, cover?: boolean, whole?: boolean}} Passage one end of a line between the panes, as a passage of its pane's document: its first position and its positions; `cover` where it ends at its pane's cover, its head, which holds no position; `whole` where it is its pane's document whole, standing at no position of it */

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
 * @property {Doc} d the record it was set from, as the model held it: kept whole, its arrays the model's own, which the model replaces and never edits (M-REC), so the pane is set again from it with no read; or the record the page derived (M-DERIVE, `Doc.derived`), which no read of the board's sets again
 * @property {ArticleView} view the view its article draws, as read when it was set: the links its marks and its lines are drawn from
 * @property {string} corner its corner's items as last written (`writeCorner`, `cornerItems`): written again where they would read other
 * @property {Map<string, Stretch[] | Declined>} placed where the far ends of the links crossing into it stood in its text as it was set, by `⟨link⟩ ⟨slot⟩`
 * @property {Place | null} place the reader's place as a change of the page's class took the pane down to its cover, kept for the read at the new class that sets it again
 * @property {HTMLElement | null} el the article it shows
 * @property {number} serial the settings asked of it: one sets it only where no later one was asked meanwhile
 * @property {number} sets the settings made of it: a `compare` read against its text before one is read again
 * @property {{since: number, at: number, met: Refusal | null} | null} kept a setting the board's events asked of it, out (`update`): when it began, by the platform's clock, the page's clock at the row or drop that left the pane behind (M-PUMP's `Dropped.at`), and the refusal that left its last reads unset — the board not answering among them, whereupon the setting is asked again once M-PUMP's pause ends — the pane standing as it shows; null where none is out
 * @property {{since: number, outcome: import('../model/records.js').Outcome} | null} lift how the last setting the board's events asked set it: whether it changed what the pane shows (M-REC's `shownBy`), and the stamp it stood kept from (`kept.at`); null where none has set it
 * @property {string | null} signs what the edition claims held as they are read again said as its withheld origins' statements were last placed (T-LAYER's `keptRunsKey`; `placeStatements`); null where its article was set since
 * @property {AccountFacts | undefined} facts the owner's byline facts its article's byline was made with (`ownerFacts`), undefined where they were not read: what owner facts taken anew are checked against (`dropped`)
 * @property {boolean} open the reader's act opened its corner whole where it stands compact or at its document's head (`openWhole`; FP-26), until the act again closes it
 * @property {number} rows its corner's rows at its document's head as last written (`cornerForm`); 0 beside its column
 * @property {import('../text/article.js').Kind} heard its corner's kind slot as the scene last read it (`markKept`): what the slot filling under the focus is told against
 */

/**
 * @typedef {Object} PaneFit — how the scene sets both panes, decided once for both from the narrower (`fitOf`; FP-12, FP-26)
 * @property {number} cpl the measure each pane's column is set at, in characters of its face
 * @property {'whole' | 'compact' | 'head'} corner where both corners stand and in which form: beside their columns, whole or compact, or at their documents' heads
 * @property {number} px the em both articles are set at: the reading size, smaller only where even a column of one character is wider than the pane beside its edge
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
 * @property {Band[]} bands every run of shared identity at its extent, as measured
 * @property {Tie[]} lines the links' lines between the panes, as measured
 * @property {Stroke[]} strokes where runs consecutive in both documents meet on both sides, as measured, in the documents' order
 * @property {{key: string, caption: string, rows: string[]} | null} listing the stroke whose list stands (`showChanges`): its key, and its caption and its rows' markup as last drawn; null where none stands
 * @property {Listed | null} relist the stroke's list a reopening owes (`Left.list`), shown once the panes' `compare` has measured the strokes (`relisted`); null where none is owed
 * @property {Shared[]} shared where the scene is whole, the passages of pane B holding the near passage's material, in pane B's order, as measured; none elsewhere
 * @property {number} next the shared passage the stop's next act goes to first, an index into `shared`
 * @property {number | null} at the shared passage the stop stands for as the last draw placed it, an index into `shared`; null where it stands hidden
 * @property {boolean} told the stop's appearance was said in the status region
 * @property {ISpan[] | null} stepped the passage of pane B the stop's act last went to (`toShared`), by identity through the image pane B's article was made from; null where it went to none since the scene was set level
 * @property {Returned | null} returned the stop drawn only by the panes' `compare` the reader left from, standing with the landing until its answer is taken and the reader has moved on (see the head); null where none stands
 * @property {PaneFit} fit the measure, the corners' form and the em the panes are set at
 * @property {number} band the rows both heads reserve above their text — the more of the two corners' (`Pane.rows`) — as last set (`setBand`); 0 where the corners stand beside their columns
 * @property {string} size the panes' sizes the ties were measured at
 * @property {number} updating the settings reading
 * @property {Array<() => void>} waiting the acts made while one reads, and the checks owner facts taken anew ask of the panes, in the order made (`whenSet`)
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

/** @typedef {Pick<Pane, 'doc' | 'src' | 'names' | 'shows' | 'kind' | 'k' | 'n' | 'read'> & {derived?: Doc | null}} Version a pane's text as the reader left it (`Left`): the record it was made from and the addresses it names and shows, as the pane holds them; `derived` the record itself where the page derived it (M-DERIVE), which a reopening shows again reading nothing — absent or null for a record read from the board */

/**
 * @typedef {Object} Spot — where the reader stood in a pane as they left it (`Left`), each by its bytes' identity
 * @property {Place | null} place the passage first in view and how far below the pane's visible top its line stood; null where the pane held no line in view
 * @property {{ids: ISpan[], backward: boolean} | null} sel the platform's selection in the pane, and whether it ran backward; null where none stood there
 * @property {{pos: number, ids: ISpan[]} | null} level the end set level in the pane; null where the pane stood at its top
 * @property {number | null} lacks what the pane's corner said the version it read lacks (`Pane.lacks`)
 */

/**
 * @typedef {Object} SharedStop — the stop at a band's clipped end, as the reader left it (`stopOf`)
 * @property {'shared'} kind
 * @property {Named} at the passage of pane B it stood for
 * @property {Named | null} stepped the passage of pane B its act last went to (`Scene.stepped`); null where it went to none
 * @property {{x: number, y: number}} place where it stood: its right edge and its middle, px from the scene's box
 */

/**
 * @typedef {Object} StrokeStop — a stroke's button, as the reader left it (`stopOf`)
 * @property {'stroke'} kind
 * @property {string} key its key (`strokeKey`), which its button bears
 * @property {ISpan[]} before the last byte of the run before its first change, by identity — the same in both panes
 * @property {ISpan[]} after the first byte of the run after its last change, by identity
 * @property {Array<{a: Named, b: Named}>} changes each change it stood for, in the documents' order: the bytes between its two runs in each pane, none on a side holding no byte there
 * @property {{x: number, y: number}} place where it stood: its middle, px from the scene's box
 */

/** @typedef {SharedStop | StrokeStop} Material a stop drawn only by the panes' `compare` as the reader left it: what it stood for, by its kind */

/** @typedef {'a' | 'b' | 'a:corner' | 'b:corner' | 'relevel' | 'x' | Material} Stop a stop of the scene's the platform's focus stands on: a pane, a pane's corner, one of the bar's acts, or a stop the panes' `compare` draws — the stop at a band's clipped end, a stroke's button — by what it stood for */

/**
 * @typedef {Object} Answered — what the panes' `compare` told of what a returned stop stood for (`answerOf`)
 * @property {'all' | 'pieces' | 'part' | 'none' | 'unknown'} holds what the panes' texts hold of it, by BM-HELD's states; `unknown` where no answer told
 * @property {Said | null} said the line's words for pieces, part and couldn't tell (BM-HELD's `saidOf`, `unknownOf`); null for all and none
 * @property {number | null} at the stop at a band's clipped end: the passage of pane B holding what it stood for — all of it, else the first holding any — an index into the shared passages measured; null where none does, or none is measured
 * @property {number} count the stop at a band's clipped end: the passages of pane B holding the near passage's material; a stroke: the changes it stands for now
 * @property {Change[]} changes a stroke: the changes standing where it stood, those holding what it stood for; none for the stop at a band's clipped end
 */

/**
 * @typedef {Object} Returned — a stop drawn only by the panes' `compare` the reader left from, standing with the landing as the scene reopens (see the head)
 * @property {Material} stop what it stood for, as the reader left it
 * @property {HTMLElement} el its element: the stop, or a stroke's button
 * @property {Answered | null} answer what the panes' `compare` told of it; null while it is read
 * @property {boolean} landed the platform's focus has stood on it since the return
 * @property {boolean} moved the reader moved on: the focus left it, or they acted in the scene (`movedOn`)
 * @property {{byKey: boolean} | null} waiting an act made on it while it was read, waiting for the answer; null where none waits
 * @property {string | null} face the overlay it shows at its site — its act's reaching face, or the line's — by id; null where none
 */

/**
 * @typedef {Object} Faces — the faces a returned stop shows at its site (O-FACES', the app's to hand in: O-FACES imports this module)
 * @property {(addr: string, anchor: Anchor, abandon: () => void) => void} reaching an act on it waiting for the answer, which the face's dismissal abandons (FP-25)
 * @property {(far: string, anchor: Anchor, told: boolean) => void} floating the texts hold none of what it stood for, in the dead end's words; `told` its name says them where the focus lands
 * @property {(said: Said, anchor: Anchor, again: (() => void) | null, told: boolean) => void} held the line's words (FP-21), "try again" where a retry may tell; `told` as `floating`'s
 */

/** @typedef {{key: string, focus: boolean}} Listed a stroke's list standing as the reader left the scene (`Left.list`): the stroke's key (`strokeKey`), and whether the platform's focus stood in the list */

/**
 * @typedef {Object} Left — the scene as the reader left it (`asLeft`; see the head): what its trail entry records, by value, and what reopens it (`reopen`)
 * @property {{a: Version, b: Version}} panes each pane's text
 * @property {{a: Spot, b: Spot} | null} spots where the reader stood in each pane; null where none is kept — a change of the page's class drops them (N-TRAIL's)
 * @property {Stop | null} stop the stop the platform's focus stood on — one the panes' `compare` draws by what it stood for, which a change of the page's class keeps (N-TRAIL's); null where it stood outside the scene, or on such a stop whose bytes its pane's image did not name
 * @property {Listed | null} [list] the stroke's list standing; null, or absent, where none stood
 */

/** how far below the panes' tops the two ends are set level (px), where both can stand there */
const LEVEL_AT = 40;
/** @type {Ink} a band's ink, its edges' and its strokes': sameness's boundary, never a linker's hue (P-REG) */
const BAND_INK = { hue: SAMENESS.boundary, dash: [] };
/** a band's edges' stroke (px) */
const BAND_EDGE_W = 1;
/** a stroke's width (px): heavier than a band's edge, so it reads apart from the edge it lies on */
const STROKE_W = 3;
/** how near two strokes' heights lie on both sides for them to stand at one place (px) */
const PLACE_TOL = 0.5;
/** the keys a pane takes, moving it alone (K-60) */
const MOVES = ['PageDown', 'PageUp', '↓', '↑', 'Home', 'End'];
const SIDES = /** @type {const} */ (['a', 'b']);
/** a whole document's edge's stroke (px) */
const EDGE_W = 3;
/** the id of the bar's hidden words that pane B's name ends with where the far end names its document whole (`namePane`) */
const WHOLE_ID = 'sceneB-whole';

/** @type {Scene | null} */
let scene = null;
/** @type {{root: HTMLElement, bar: HTMLElement, paneA: HTMLElement, paneB: HTMLElement, canvas: HTMLCanvasElement, stop: HTMLButtonElement, strokes: HTMLElement} | null} */
let els = null;
/** @type {Drawn[]} what the last draw drew */
let drawnTies = [];
/** @type {Edge[]} the facing edges the last draw drew */
let drawnEdges = [];
/** @type {StrokeDrawn[]} the strokes the last draw drew, in view */
let drawnStrokes = [];
/** @type {{runs: number, bands: number, strokes: number, ms: number}} the last measure's figures: the runs it read, the bands and strokes it made of them, and the time it took by the platform's clock (FP-18) */
let lastMeasure = { runs: 0, bands: 0, strokes: 0, ms: 0 };
/** the scene's own end — a Back from its entry, the app's to hand in (`attach`); until it does, the scene ended where it stands */
let ending = (/** @type {boolean} */ _byKey) => close();
/** @type {Faces | null} the faces a returned stop shows at its site, the app's to hand in (`attach`); none until it does */
let faces = null;
/** @type {Record<'a' | 'b', Map<string, string>>} the run each origin's statement stands beside in each pane, by origin: the run's identity, kept while a line of that run is in view (`placeStatements`) */
const stood = { a: new Map(), b: new Map() };
/** the room between two signs stacked in a pane's column's edge, px: the plane's (T-LAYER's) */
const SIGN_GAP = 2;
/** the order signs standing for one run stack in: its origin's statement, its key, its others' count */
const SIGN_ORDER = Object.freeze({ statement: 0, key: 1, count: 2 });

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

/** the id of the bar's hidden words a pane's name leads with: its corner's first item (`namePane`, `paneLead`) */
const leadId = (/** @type {'a' | 'b'} */ side) => (side === 'a' ? 'sceneA' : 'sceneB') + '-kind';

/**
 * A pane named as a region the way the ARIA mirror names a document's item:
 * by the bar's hidden words for its corner's first item — its document's kind,
 * else a refused document's own words (`paneLead`) — then its own document's
 * address, the head of the article it holds (SC9; the focus record's D5); and,
 * where it is the whole document a link's far end names, by the bar's hidden
 * words saying so after them (`WHOLE_ID`), `aria-current="location"` on it;
 * neither on any other pane, whatever the scene it stood in before.
 * @param {HTMLElement} pane
 * @param {string} id the id the head's address takes, for the reference
 * @param {string} lead the id of the bar's hidden words for its corner's first item (`leadId`)
 * @param {boolean} [whole] the pane is the whole document a link's far end names
 */
function namePane(pane, id, lead, whole = false) {
  pane.setAttribute('role', 'region');
  const addr = /** @type {HTMLElement | null} */ (pane.querySelector('.hd .addr'));
  if (addr) { addr.id = id; pane.setAttribute('aria-labelledby', [lead, id, ...(whole ? [WHOLE_ID] : [])].join(' ')); }
  if (whole) pane.setAttribute('aria-current', 'location'); else pane.removeAttribute('aria-current');
}

/** both panes named (`namePane`), pane B as the whole document where the scene's far end names it so */
function namePanes(/** @type {NonNullable<typeof els>} */ E, /** @type {Scene} */ S) {
  namePane(E.paneA, 'sceneA-name', leadId('a'));
  namePane(E.paneB, 'sceneB-name', leadId('b'), S.whole);
}

/**
 * Attach the scene's elements, and the act its own end runs (see the head):
 * the bar's ×, told whether a key pressed it by the focus owner's one
 * reading (FP-20); the stop's act (`toShared`); a stroke's (`showChanges`);
 * each, on a stop the reader returned to, that stop's (`returnedAct`).
 * @param {{root: HTMLElement, bar: HTMLElement, paneA: HTMLElement, paneB: HTMLElement, canvas: HTMLCanvasElement, stop: HTMLButtonElement, strokes: HTMLElement}} e `strokes` the gutter's layer the strokes' buttons stand in
 * @param {{end?: (byKey: boolean) => void, faces?: Faces}} [acts] `end` the scene's own end: N-GO's `closeScene`, as Esc, zoom-out and ← take it; `faces` the faces a returned stop shows at its site (O-FACES')
 */
export function attach(e, acts = {}) {
  els = e;
  if (acts.end) ending = acts.end;
  if (acts.faces) faces = acts.faces;
  e.root.setAttribute('aria-label', t('L.scene-label'));
  e.stop.addEventListener('click', (ev) => stopAct(FOCUS.byKey(ev)));
  e.strokes.addEventListener('click', (ev) => {
    const b = /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (ev.target).closest('[data-stroke]'));
    if (b && b.dataset.stroke) strokeAct(b.dataset.stroke, FOCUS.byKey(ev));
  });
  /** the event's target, where it stands in a pane's corner: on the corner's act, on what opens it whole — a glyph, a head's count — or on the corner opened whole; null elsewhere */
  const onCorner = (/** @type {Event} */ ev) => {
    const tg = /** @type {HTMLElement | null} */ (ev.target), side = ev.currentTarget === e.paneB ? 'b' : 'a';
    if (!tg || !tg.closest || !tg.closest('.corner')) return null;
    return tg.closest('[data-read]') ? 'act' : tg.closest('.glyph, [data-more]') || (scene && scene[side].open) ? 'whole' : null;
  };
  for (const p of [e.paneA, e.paneB]) {
    p.addEventListener('scroll', () => draw());
    // a press on a pane's corner's act, or on what opens the corner whole, leaves the platform's selection where it stands —
    // the passage the act carries — as a press on text would not; a click on the act takes it, as the corner's Enter does,
    // and one on a glyph or a head's count opens the corner whole, one on the corner opened closing it (FP-26)
    p.addEventListener('mousedown', (ev) => { if (onCorner(ev)) ev.preventDefault(); });
    p.addEventListener('click', (ev) => {
      const on = onCorner(ev), side = p === e.paneB ? 'b' : 'a';
      if (on === 'act') act(side); else if (on === 'whole') openWhole(side);
    });
  }
  // a click on an act is its button's wherever on the button it lands — the re-level's chord mark among them
  e.bar.addEventListener('click', (ev) => { const tg = /** @type {HTMLElement} */ (ev.target); if (tg.closest('[data-x]')) ending(FOCUS.byKey(ev)); else if (tg.closest('[data-relevel]')) relevel(); });
}
export const isOpen = () => scene !== null;
/** the addresses the two panes' acts name and their positions are measured against (`Pane.names`) */
export const pair = () => (scene ? { a: scene.a.names, b: scene.b.names } : null);
/** the scene's runs of shared identity and the two ends it sets level, read-only (the gate reads them) */
export const pairs = () => (scene ? { pairs: scene.pairs.map((p) => ({ ...p })), level: { ...scene.level } } : null);
/** the last measure's figures (the gate records them; FP-18): the runs it read, the bands and strokes it made of them, and its time in ms */
export const measured = () => ({ ...lastMeasure });
/** the bands and lines the last draw drew, their ends on screen (the gate holds each band to its run's lines and each line to its passage's line) */
export const ties = () => drawnTies.map((d) => /** @type {Drawn} */ ({ ...d, a: { ...d.a }, b: { ...d.b } }));
/** the facing edges the last draw drew for the whole-document ends meeting them, on screen (the gate holds each to its pane's visible height) */
export const edges = () => drawnEdges.map((e) => ({ ...e, links: [...e.links] }));
/**
 * The strokes the last draw drew, in view, on screen (the gate reads them):
 * each its key, its two ends, its halves, its changes, the point its button
 * stands centred on, and its button's id, name, count and rect.
 */
export function strokes() {
  const E = els;
  return drawnStrokes.map((s) => {
    const btn = E ? buttonOf(E, s.key) : null, r = btn ? btn.getBoundingClientRect() : null;
    return {
      key: s.key, a: { ...s.a }, b: { ...s.b }, halfA: s.halfA, halfB: s.halfB, at: { ...s.at }, changes: s.changes.map((c) => ({ a: { ...c.a }, b: { ...c.b } })),
      id: btn ? btn.id : null, name: btn ? btn.getAttribute('aria-label') : null, count: btn ? btn.textContent || '' : '', rect: r ? { x: r.left, y: r.top, w: r.width, h: r.height } : null,
    };
  });
}
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
 * A pane as an in-document find reads it (N-FIND), read-only: the one on
 * `side`, else the one holding the platform's focus — pane B where the focus
 * stands in it, else pane A, as the scene's keys read it (`key`) — with the
 * address its positions are measured against (`Pane.names`), the record its
 * text was made from, the first position in its view and its box on screen.
 * Null where no scene stands.
 * @param {'a' | 'b' | null} [side]
 * @returns {{side: 'a' | 'b', names: string, d: Doc, first: number | null, rect: {x: number, y: number, w: number, h: number} | null} | null}
 */
export function paneRead(side = null) {
  const S = scene, E = els;
  if (!S || !E) return null;
  const at = typeof document !== 'undefined' ? /** @type {HTMLElement | null} */ (document.activeElement) : null;
  const s = side || (at && E.paneB.contains(at) ? 'b' : 'a'), pane = paneEl(E, s), P = S[s];
  const r = typeof pane.getBoundingClientRect === 'function' ? pane.getBoundingClientRect() : null;
  return { side: s, names: P.names, d: P.d, first: firstInView(pane), rect: r ? { x: r.left, y: r.top, w: r.width, h: r.height } : null };
}
/**
 * Each pane as it stands, read-only (the gate reads it): the address it was
 * opened on, the record its text was made from, the address its acts name and
 * the one it shows, its kind, its version and the chain's count, its corner's
 * act and what its corner says it lacks, whether its record is one the page
 * derived, and the blocks its article was made from.
 */
export function panes() {
  const S = scene;
  if (!S) return null;
  const of = (/** @type {Pane} */ P) => ({ doc: P.doc, src: P.src, names: P.names, shows: P.shows, kind: P.kind, k: P.k, n: P.n, read: P.read, lacks: P.lacks, derived: !!P.d.derived, blocks: P.d.blocks.map((b) => ({ pos: b.pos, width: b.width, kind: b.kind, text: b.text })) });
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

/**
 * Where two runs consecutive on one side meet there (see the head): the
 * middle of a line the last byte of the one and the first byte of the other
 * share; else, where no whole line stands between those bytes' boxes, the
 * edge between them; null where one does — the unbanded stretch a
 * difference taking a whole line leaves.
 * @param {Box} last the box of the earlier run's last byte
 * @param {Box} first the box of the later run's first byte
 * @param {number} lb its pane's line box, px
 * @returns {number | null}
 */
function meetAt(last, first, lb) {
  const top = Math.max(last.top, first.top), bottom = Math.min(last.bottom, first.bottom);
  if (bottom - top > lb / 2) return (top + bottom) / 2;
  return first.top - last.bottom < lb / 2 ? (last.bottom + first.top) / 2 : null;
}

/**
 * The bands and the strokes between the panes, from the runs as their panes
 * set them (see the head): each run a band from the top of its first byte's
 * box to the bottom of its last byte's on each side; two runs consecutive on
 * a side, holding no byte of each other there, meeting where `meetAt` places
 * them — each band's edge there at that height — and runs holding one
 * identity twice sharing nothing. Where two runs consecutive in both
 * documents meet on both sides, a stroke at the two heights they meet at,
 * drawn in the gutter's half beside each side holding bytes between them;
 * strokes whose heights lie within PLACE_TOL px of each other on both sides
 * one stroke, its changes in the documents' order and its halves joined.
 * Runs adjoining on both sides — which `merged` has joined — stand no
 * stroke, nothing lying between them.
 * @param {Measured[]} runs
 * @param {{a: number, b: number}} lineBox each pane's line box, px
 * @returns {{bands: Band[], strokes: Stroke[]}} `bands` in the order the runs are named
 */
export function banded(runs, lineBox) {
  const ext = runs.map((m) => ({ a: { top: m.a.first.top, bottom: m.a.last.bottom }, b: { top: m.b.first.top, bottom: m.b.last.bottom } }));
  /** @type {{a: Map<number, number>, b: Map<number, number>}} the height each run meets the run after it at, on each side, by its index */
  const meets = { a: new Map(), b: new Map() };
  /** @type {{a: number[], b: number[]}} each side's order of the runs, by index */
  const order = { a: [], b: [] };
  for (const side of SIDES) {
    const here = (/** @type {number} */ i) => (side === 'a' ? runs[i].run.u1 : runs[i].run.u2);
    const there = (/** @type {number} */ i) => (side === 'a' ? runs[i].run.u2 : runs[i].run.u1);
    const ord = order[side] = runs.map((_, i) => i).sort((i, j) => here(i) - here(j) || there(i) - there(j));
    for (let k = 0; k + 1 < ord.length; k++) {
      const i = ord[k], j = ord[k + 1];
      if (here(j) < here(i) + runs[i].run.width) continue;
      const y = meetAt(runs[i][side].last, runs[j][side].first, lineBox[side]);
      if (y == null) continue;
      meets[side].set(i, y);
      ext[i][side].bottom = y;
      ext[j][side].top = y;
    }
  }
  /** @type {Map<number, number | undefined>} each run's successor in pane B's order */
  const nextB = new Map(order.b.map((i, k) => [i, order.b[k + 1]]));
  /** @type {Stroke[]} */
  const strokes = [];
  for (let k = 0; k + 1 < order.a.length; k++) {
    const i = order.a[k], j = order.a[k + 1], ya = meets.a.get(i), yb = meets.b.get(i);
    if (nextB.get(i) !== j || ya === undefined || yb === undefined) continue;
    const r = runs[i].run, s = runs[j].run;
    /** @type {Change} */
    const change = { a: { from: r.u1 + r.width, to: s.u1 }, b: { from: r.u2 + r.width, to: s.u2 } };
    const halfA = change.a.to > change.a.from, halfB = change.b.to > change.b.from;
    if (!halfA && !halfB) continue;
    const same = strokes.find((x) => Math.abs(x.a - ya) <= PLACE_TOL && Math.abs(x.b - yb) <= PLACE_TOL);
    if (same) { same.halfA = same.halfA || halfA; same.halfB = same.halfB || halfB; same.changes.push(change); }
    else strokes.push({ a: ya, b: yb, halfA, halfB, changes: [change] });
  }
  const bands = runs.map((m, i) => {
    const e = ext[i];
    return {
      a: { pos: m.run.u1, width: m.run.width, top: e.a.top, bottom: Math.max(e.a.top, e.a.bottom) },
      b: { pos: m.run.u2, width: m.run.width, top: e.b.top, bottom: Math.max(e.b.top, e.b.bottom) },
    };
  });
  return { bands, strokes };
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
 * cover, at the cover, its head (FP-29); where it names
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
 * Where the far ends of the links crossing into a pane stand in its text now:
 * as the model holds `project`'s answers, or, in a derived record — whose
 * positions are not the board's, and which no `project` is asked of — where
 * its bytes stand through the image it was made with. What the pane keeps as
 * it is set, its lines read from it and never the model's now (`measure`).
 * @param {Pick<Pane, 'src' | 'd'>} P the pane
 * @param {Shown[]} shown the links shown at either pane
 * @returns {Map<string, Stretch[] | Declined>}
 */
function placedInto(P, shown) {
  /** @type {Map<string, Stretch[] | Declined>} */
  const out = new Map();
  for (const s of shown) {
    if (!s.far || !oneBox(s.far, P.src) || !s.farEnd || s.farWhole) continue;
    const id = P.d.derived ? REC.identityOfEnd(s.farEnd) : null;
    const held = P.d.derived ? (id ? REC.placedIn(P.d.image, [id]) : undefined) : REC.projection(s.link.addr, s.farSlot, P.src);
    if (held !== undefined) out.set(s.link.addr + ' ' + s.farSlot, held);
  }
  return out;
}

/**
 * An owner's byline facts read for a pane (M-PUMP's `readAccount`; FP-34): a
 * read a drop of the byline causes overtook, which took nothing, begun again,
 * DROP_ATTEMPTS reads in all and none once `stands` reads false — past them
 * the pane is set with what the model holds, as a whole read past its passes
 * is.
 * @param {string} owner
 * @param {() => boolean} [stands] the opening the read is made for still stands
 * @returns {Promise<void>} settled once what was read is taken, or the reads are spent
 */
async function readFacts(owner, stands = () => true) {
  for (let reads = 1; !(await PUMP.readAccount(owner)); reads++) if (reads >= PUMP.DROP_ATTEMPTS || !stands()) return;
}

/**
 * A pane's record read before it is set (see the head): whole (M-PUMP's
 * `wholeOf`), its owner's byline facts (`readFacts`; FP-34), so the byline the
 * pane is set with shows them, or why it can show none, never an empty box a
 * pane set from its kept view would show again; and the chain's
 * count where the board ended the chain there —
 * held, or, at an edition at its bare address, read to its end (`probeChain`):
 * the member its text is, which its acts name. A count the board did not end
 * the chain at is no count: the head is not known there. `d` null where the
 * whole read met a refusal the record does not hold as the board's word on
 * the document — the board not answering its extent or its text among them —
 * which leaves a pane as it shows; `whole` false where the record stands as
 * the board's word on the document — withheld from the reader, or nothing it
 * will say of the address, of its extent or of its text — the pane then
 * standing as that refusal (a pane read again at a change of class, or
 * reopened; a scene opens on two texts read whole alone); `refused` the
 * refusal the whole read met, none where it met none; `unheard` the first of
 * its reads the board did not answer — the whole read, the chain's probe, the
 * owner's byline facts — none where it answered every one.
 * @param {string} src
 * @param {() => boolean} [stands] the opening the read is made for still stands: a probe asks no more once it ends
 * @returns {Promise<{d: Doc | null, n: number | null, whole: boolean, refused: Refusal | null, unheard: Refusal | null}>}
 */
async function readPane(src, stands = () => true) {
  const w = await PUMP.wholeOf(src);
  /** @type {Refusal | null} */
  let unheard = w.refused && PUMP.unanswered(w.refused) ? w.refused : null;
  if ((!w.doc || w.refused) && !REC.doc(src).refused) return { d: null, n: null, whole: false, refused: w.refused, unheard };
  const owner = REC.ownerAccount(REC.doc(src));
  await readFacts(owner, stands);
  if (!unheard && owner && PUMP.factsUnheard(owner)) unheard = PUMP.NOT_ANSWERED;
  const box = REC.has(boxOf(src)) ? REC.doc(boxOf(src)) : null;
  let n = box && box.ended ? box.members : null;
  if (w.doc && kindAt(src, w.doc) === 'bare' && n == null && stands()) {
    const p = await PUMP.probeChain(src, stands);
    n = p && p.ended ? p.n : null;
    if (!unheard && p && p.met && PUMP.unanswered(p.met)) unheard = p.met;
  }
  const d = REC.doc(src);
  return { d, n, whole: !d.refused, refused: w.refused, unheard };
}

/** @typedef {string | Doc} Source what a pane is opened on (`open`): a document's address, read whole from the board (`readPane`), or a record the page derived (M-DERIVE, `Doc.derived`), shown as given */

/** the address a pane's source names: the record's own where the source is a derived record */
const addrOf = (/** @type {Source} */ x) => (typeof x === 'string' ? x : x.addr);

/**
 * A pane's source read, or taken as given (see the head): an address's
 * record read whole (`readPane`); a derived record itself, whole, no read
 * made for it and no chain counted.
 * @param {Source} x
 * @param {() => boolean} [stands]
 * @returns {ReturnType<typeof readPane>}
 */
async function sourceOf(x, stands = () => true) {
  if (typeof x === 'string') return readPane(x, stands);
  return { d: x, n: null, whole: !x.refused, refused: null, unheard: null };
}

/**
 * @typedef {Object} Compared — the two texts' `compare` (`compareBetween`), with the reads made beside it (`readBetween`)
 * @property {ComparePair[]} pairs the runs of shared identity between them (`merged`); none where it told nothing
 * @property {boolean} told it answered
 * @property {Met | null} refused the refusal it met, by its kind and its name, which the bar says; null where it answered or was not asked
 * @property {Met | null} why where it told nothing, the refusal that kept it from telling — its own, or the one a pane's text was refused for, which asks none; null where it told, or where a pane's text could not be read and no refusal was met
 * @property {Refusal | null} unheard the first of the reads the board did not answer — the `compare`, a far end's projection (`placeBetween`) — whose silence teaches nothing; null where it answered every one
 */

/** a record's refusal as a met refusal is read (BM-HELD's `whyOf`): `withheld`, or `doc_not_registered` for a document the board says nothing of; null where none was met */
const metOf = (/** @type {Doc} */ d) => (d.refused ? { kind: 'refused', name: d.refused === 'unregistered' ? 'doc_not_registered' : d.refused } : null);

/**
 * The two texts' `compare` whole (see the head): the runs of shared identity;
 * none, and no `compare` asked, where either holds no text, which tells
 * nothing for the refusal its text met, or is a derived record, no text of the
 * board's; the refusal it met, its `unheard` too where the board did not
 * answer.
 * @param {Pick<Text, 'src' | 'd'>} A
 * @param {Pick<Text, 'src' | 'd'>} B
 * @returns {Promise<Compared>}
 */
async function compareBetween(A, B) {
  const holds = (/** @type {Doc} */ d) => !d.refused && d.extent != null && !d.derived;
  const whole = (/** @type {Pick<Text, 'src' | 'd'>} */ x) => [{ doc: x.src, spans: [{ ordinal: 1, positions: Math.max(1, x.d.extent || 1) }] }];
  if (!holds(A.d) || !holds(B.d)) return { pairs: [], told: false, refused: null, why: metOf(!holds(A.d) ? A.d : B.d), unheard: null };
  const cmp = await PUMP.read(F.compare(whole(A), whole(B)));
  if ('refused' in cmp) { const r = { kind: cmp.refused.kind, name: cmp.refused.name }; return { pairs: [], told: false, refused: r, why: r, unheard: PUMP.unanswered(cmp.refused) ? cmp.refused : null }; }
  return { pairs: merged(F.decodeCompare(cmp.answer)), told: true, refused: null, why: null, unheard: null };
}

/**
 * Where each far end crossing between the panes stands, read (`unplaced`,
 * M-PUMP's `projectEnd`): the first of those reads the board did not answer;
 * null where it answered every one.
 * @param {Text} A
 * @param {Text} B
 * @returns {Promise<Refusal | null>}
 */
async function placeBetween(A, B) {
  const outs = await Promise.all(unplaced(A, B).map((p) => PUMP.projectEnd(p.link, p.slot, p.far)));
  for (const o of outs) if ('refused' in o && PUMP.unanswered(o.refused)) return o.refused;
  return null;
}

/**
 * The reads between the panes, made before they are set (see the head): the
 * two texts' `compare` (`compareBetween`) and where each far end crossing
 * between them stands (`placeBetween`), side by side, the first of them the
 * board did not answer the reads' `unheard`; the `compare` left out, no runs
 * and no refusal, where the far end names pane B's document whole and the
 * scene opens on these reads (`open`, `reopen`).
 * @param {Text} A
 * @param {Text} B
 * @param {boolean} [compare] the `compare` is read with them
 * @returns {Promise<Compared>}
 */
async function readBetween(A, B, compare = true) {
  /** @type {Compared} */
  const none = { pairs: [], told: false, refused: null, why: null, unheard: null };
  // a derived record is no text of the board's: nothing to compare it against, and no `project` to ask of it (see the head)
  if (A.d.derived || B.d.derived) return none;
  const [cmp, placed] = await Promise.all([compare ? compareBetween(A, B) : Promise.resolve(none), placeBetween(A, B)]);
  return { ...cmp, unheard: cmp.unheard || placed };
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
    d: { ...r.d }, view: LAYER.sceneView(r.d), corner: '', placed: new Map(), place: null, el: null, serial: 0, sets: 0, kept: null, lift: null, signs: null, facts: undefined,
    open: false, rows: 0, heard: LAYER.kindOf(r.d),
  };
}

/**
 * What a pane's corner is made from now (see the head): its record, named as
 * the address it shows, and its view with the corner's state the scene holds
 * — the chain's count as the pane knows it, neither the latest nor the count
 * while the board lags (`lags`), the act it offers and what it says the
 * version it reads lacks, a draft's kept word as the model holds it with its
 * statement where T-LAYER holds it open (B3-S2) — a derived record's slot
 * empty — and its document's kind by the one test (T-LAYER's `kindOf`).
 * @param {Pane} P
 * @returns {{d: Doc, view: ArticleView}}
 */
function paneCorner(P) {
  const d = P.shows === P.d.addr ? P.d : { ...P.d, addr: P.shows };
  return { d, view: { ...P.view, members: P.n, read: P.read, lacks: P.lacks, lags: lags(), kept: P.d.derived ? null : WRITE.keptOf(P.names), keptOpen: !P.d.derived && LAYER.statementOpen(P.names), kind: LAYER.kindOf(P.d) } };
}

/** a pane's corner's first item in words (T-ARTICLE's `cornerLead`): its document's kind, else a refused document's own words — what its region's name leads with (`namePane`) */
const paneLead = (/** @type {Pane} */ P) => { const c = paneCorner(P); return cornerLead(c.d, c.view); };

/**
 * A pane's corner's items in the form the scene's fit stands them in (see
 * the head; FP-26), and its rows at its document's head: T-LAYER's, made from
 * what the pane holds (`paneCorner`) — its kind first, naming the version it
 * shows — and its kept clause where it stands kept (`paneKept`): beside its
 * column, whole, or compact — every item whole where the reader's act opened
 * it (`Pane.open`) — the clause its last item (`sceneCorner`); at its
 * document's head, the clause first on its first row and a form the act
 * opened beneath its rows (`sceneHead`).
 * @param {Pane} P
 * @param {PaneFit} F
 * @returns {{html: string, rows: number}}
 */
function cornerForm(P, F) {
  const { d, view } = paneCorner(P);
  if (F.corner === 'head') return LAYER.sceneHead(d, view, { px: F.px, kept: paneKept(P), open: P.open });
  return { html: LAYER.sceneCorner(d, view, F.corner === 'compact' && !P.open) + keptHTML(paneKept(P)), rows: 0 };
}

/** does the board lag past a second (M-PUMP's `boardKept`): every pane's corner names neither the latest version nor the chain's count, and is written again as the lag begins and ends (`markKept`) */
const lags = () => PUMP.boardKept() !== null;

/**
 * What a pane stands kept by past its second (see the head; FP-23): the
 * setting the board's events asked of it, out KEPT_MS (`Pane.kept`), at the
 * page's clock at the row or drop that left the pane behind; else M-PUMP's
 * hold of the record its text was made from, as it reads it again past a
 * second (M-PUMP's `kept`); null where neither stands.
 * @param {Pane} P
 * @returns {{met: Refusal | null, since: number} | null}
 */
function paneHeld(P) {
  if (P.d.derived) return null;
  return P.kept && performance.now() - P.kept.since >= PUMP.KEPT_MS ? { met: P.kept.met, since: P.kept.at } : PUMP.kept(P.src);
}

/**
 * A pane's kept clause (see the head; FP-23): the rule a box's is said by
 * (T-LAYER's `keptWords`), over the record the pane was set from, while it
 * stands kept past its second (`paneHeld`); none else.
 * @param {Pane} P
 */
function paneKept(P) { return LAYER.keptWords(P.d, P.d, paneHeld(P)); }

/**
 * Each pane's corner marked in place (see the head): its items written again
 * where they would read other than as last written (`cornerForm`) — its kind
 * told, its kept clause changed (`paneKept`), a draft's kept word or its
 * statement moved — or the board's lag began or ended since (`lags`), the
 * element kept so a focus on it stays, the bar's words its name leads with
 * written again with them (`nameBar`), its kind said once where its slot
 * fills under the focus (`sayKind`), the heads' band set again where their
 * rows changed (`setBand`), and its origins' statements placed again where
 * what the edition claims held say changed since they were placed, or its
 * article was set since (T-LAYER's `keptRunsKey`; `placeStatements`). The
 * app's loop runs it on each dirty frame while the scene stands; the one line
 * speaks for the panes (`keptPanes`).
 */
export function markKept() {
  const S = scene, E = els;
  if (!S || !E) return;
  const signs = LAYER.keptRunsKey(), lagging = String(lags());
  for (const side of SIDES) {
    const P = S[side], items = cornerForm(P, S.fit);
    const c = /** @type {HTMLElement | null} */ (paneEl(E, side).querySelector(':scope > .corner'));
    if (c && (items.html !== P.corner || c.dataset.lags !== lagging)) { writeCorner(E, P, items); nameBar(E, P); }
    sayKind(E, P);
  }
  if (SIDES.some((side) => S[side].el && S[side].signs !== signs)) placeStatements(E, S);
  rebanded(E, S);
}

/**
 * @typedef {Object} PaneKept — a pane standing kept, as the one line speaks for it (see the head; FP-36)
 * @property {string} addr the address it names (`Pane.shows`)
 * @property {string} name its name as the mirror finds it (T-LAYER's `placeName`)
 * @property {import('../text/layer.js').KeptClause | null} clause its clause past its second (`paneKept`); null while the setting asked of it is within its second
 * @property {number} since the page's clock at the row or drop that left it behind: its clause's stamp, else its setting's
 * @property {boolean} focus the pane holds the platform's focus
 */

/**
 * The panes standing kept (see the head): each whose clause stands past its
 * second (`paneKept`), or whose setting the board's events asked is within it
 * (`Pane.kept`); none while no scene stands.
 * @returns {PaneKept[]}
 */
export function keptPanes() {
  const S = scene, E = els;
  if (!S || !E) return [];
  const at = typeof document !== 'undefined' ? document.activeElement : null;
  return SIDES.flatMap((side) => {
    const P = S[side], held = paneHeld(P), clause = held ? LAYER.keptWords(P.d, P.d, held) : null;
    const soon = !clause && !!P.kept && performance.now() - P.kept.since < PUMP.KEPT_MS;
    if (!clause && !soon) return [];
    const since = held && clause ? held.since : /** @type {NonNullable<Pane['kept']>} */ (P.kept).at;
    return [{ addr: P.shows, name: LAYER.placeName(P.d, P.shows), clause, since, focus: !!at && paneEl(E, side).contains(at) }];
  });
}

/**
 * How the last setting the board's events asked set the pane naming an
 * address (`Pane.lift`): changed or unchanged, with the stamp it stood kept
 * from; null where no pane of a standing scene names it, or none was set so.
 * @param {string} addr
 * @returns {{since: number, outcome: import('../model/records.js').Outcome} | null}
 */
export function paneLift(addr) {
  const S = scene;
  const P = S ? SIDES.map((side) => S[side]).find((x) => x.shows === addr) : null;
  return P ? P.lift : null;
}
/** a pane's corner's id: the group is named by its own words */
const cornerId = (/** @type {'a' | 'b'} */ side) => (side === 'a' ? 'sceneA' : 'sceneB') + '-corner';
/** a pane's corner's element, beside its article */
const cornerEl = (/** @type {NonNullable<typeof els>} */ E, /** @type {'a' | 'b'} */ side) => /** @type {HTMLElement | null} */ (paneEl(E, side).querySelector(':scope > .corner'));

/** the classes a pane's corner takes in the fit's form (see the head): compact where it stands compact — open where the reader's act opened it whole there, over what stands beside it in its compact room — head at its document's head */
const formClass = (/** @type {PaneFit} */ F, /** @type {Pane} */ P) => (F.corner === 'head' ? ' head' : F.corner === 'compact' ? (P.open ? ' compact open' : ' compact') : '');

/**
 * A pane's corner's markup (see the head): its one Tab stop, a group named by
 * its own words, as the plane's corner is (D5 K-57), in the fit's form
 * (`formClass`), marked with whether the board lagged as it was made
 * (`data-lags`); the items it holds and its rows kept on the pane as last
 * written (`Pane.corner`, `Pane.rows`).
 * @param {Pane} P
 * @param {PaneFit} F
 */
function cornerMarkup(P, F) {
  const made = cornerForm(P, F);
  P.corner = made.html; P.rows = made.rows;
  return `<div class="corner${formClass(F, P)}" data-corner="${esc(P.shows)}" data-lags="${lags()}" id="${cornerId(P.side)}" role="group" aria-labelledby="${cornerId(P.side)}" tabindex="0">${P.corner}</div>`;
}

/** the key a control in a pane's corner bears, which a rewrite of its items puts a focus back on (N-FOCUS's `keep`): a head's count of the items it folds; none for the corner's element itself, which a rewrite never replaces */
const cornerControl = (/** @type {Element} */ el) => (/** @type {HTMLElement} */ (el).dataset?.more ? 'more' : null);

/**
 * A pane's corner shaped for the fit's form (see the head): its class
 * (`formClass`) and, at its document's head, its width across the pane's
 * column — its text and its edge — and its first row's height, the reading
 * line's pitch; neither beside its column.
 * @param {HTMLElement} c
 * @param {PaneFit} F
 * @param {Pane} P
 */
function shapeCorner(c, F, P) {
  const head = F.corner === 'head';
  c.className = 'corner' + formClass(F, P);
  c.style.width = head ? (F.cpl * CHAR_W + EDGE) * F.px + 'px' : '';
  c.style.height = head ? LINE_H * F.px + 'px' : '';
}

/**
 * A pane's corner written again, in place, in the scene's fit (see the head):
 * the element kept, so a focus standing on it stays, one on the count it
 * holds put back on the count standing in its place (FP-20); shaped for the
 * form (`shapeCorner`); the items as given, else made now (`cornerForm`), and
 * its rows kept on the pane. The band the heads reserve is set apart
 * (`setBand`).
 * @param {NonNullable<typeof els>} E
 * @param {Pane} P
 * @param {{html: string, rows: number} | null} [items]
 */
function writeCorner(E, P, items = null) {
  const S = scene, c = cornerEl(E, P.side);
  if (!S || !c) return;
  const made = items || cornerForm(P, S.fit);
  c.dataset.corner = P.shows;
  c.dataset.lags = String(lags());
  shapeCorner(c, S.fit, P);
  FOCUS.keep(c, cornerControl, () => { c.innerHTML = made.html; });
  P.corner = made.html; P.rows = made.rows;
}

/** the bar's name for a pane, written again: the address it shows, and the hidden words its region's name leads with (`paneLead`) */
function nameBar(/** @type {NonNullable<typeof els>} */ E, /** @type {Pane} */ P) {
  const b = E.bar.querySelector(`[data-name="${P.side}"]`), lead = E.bar.querySelector('#' + leadId(P.side)), words = paneLead(P);
  if (b) b.textContent = P.shows;
  if (lead && lead.textContent !== words) lead.textContent = words;
}

/**
 * A pane's kind, said once in the status region where its corner's slot
 * fills while the platform's focus stands in the pane (see the head; FP-36):
 * the slot's words as it says them once no longer being read (T-LAYER's
 * `kindOf`; T-ARTICLE's `kindWord`). Each call reads the slot again
 * (`Pane.heard`).
 * @param {NonNullable<typeof els>} E
 * @param {Pane} P
 */
function sayKind(E, P) {
  const k = LAYER.kindOf(P.d), was = P.heard;
  P.heard = k;
  const at = typeof document !== 'undefined' ? document.activeElement : null;
  if (was === 'reading' && k !== 'reading' && !!at && paneEl(E, P.side).contains(at)) FOCUS.say(kindWord(k).text);
}

/** the byline facts the model holds now of the owner of the record a pane is set from (M-REC's `accountKey`, `ownerAccount`): what its article's byline is made with */
const ownerFacts = (/** @type {Pane} */ P) => REC.accountKey(REC.ownerAccount(P.d));

/**
 * A pane's article made from what the pane is set with — T-LAYER's mount
 * (`sceneArticle`), where its words are read handed in (`whereIn`; FP-27) —
 * and put in its place: the one it shows replaced, else
 * placed — pane A's after its corner, pane B's before it, so each corner
 * stands on its pane's outer side — its origins' statements to be
 * placed (`markKept`), and the owner's byline facts its byline was made with kept
 * beside it (`Pane.facts`); where they are not read, a read of them made
 * (`readFacts`; FP-34), whose take sets the pane again (`dropped`).
 * @param {NonNullable<typeof els>} E
 * @param {Pane} P
 */
function swap(E, P) {
  const el = LAYER.sceneArticle(P.d, { names: P.names, shows: P.shows, view: P.view, where: whereIn(P) }), pane = paneEl(E, P.side);
  if (P.el && pane.contains(P.el)) P.el.replaceWith(el);
  else if (P.side === 'a') pane.append(el); else pane.prepend(el);
  P.el = el; P.signs = null;
  P.facts = ownerFacts(P);
  const owner = REC.ownerAccount(P.d);
  if (P.facts === undefined && owner) void readFacts(owner);
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
 * answers (`addBands`). A pane given a derived record in an address's place
 * (`Source`) reads nothing: the record is shown as given (see the head).
 * @param {Source} a
 * @param {Source} b
 * @param {Held} [held]
 * @param {Showing} [as]
 * @returns {Promise<Opening>} once the scene shows, or nothing will
 */
export async function open(a, b, held = {}, as = {}) {
  /** @type {Opening} */
  const out = { shown: false, refused: null };
  if (!els) return out;
  await HOST.opening(async (stands) => {
    const [ra, rb] = await Promise.all([sourceOf(a, stands), sourceOf(b, stands)]);
    const da = ra.d, db = rb.d;
    if (!da || !db || !ra.whole || !rb.whole) { if (stands()) out.refused = (!da || !ra.whole ? ra.refused : null) || rb.refused; return null; }
    if (!stands()) return null;
    const between = await readBetween(textOf(a, da), textOf(b, db), !held.wholeB);
    return { pa: paneAt('a', addrOf(a), { d: da, n: ra.n }), pb: paneAt('b', addrOf(b), { d: db, n: rb.n }), between };
  }, ({ pa, pb, between }) => {
    const E = els;
    if (!E) return;
    if (as.leaving) as.leaving();
    // where the focus stands as the scene shows — the chrome it leaves ended, which hands back a focus an overlay held; a
    // scene shown over one standing keeps that one's (the controller's one memory)
    const from = document.activeElement;
    const S = sceneOf(pa, pb, between.pairs, held);
    stand(E, S, between.refused ? between.refused.name : null);
    relevel();
    FOCUS.open('scene', { el: E.root, from, byKey: true, first: E.paneB });
    out.shown = true;
    markDirty();
    if (S.whole) void addBands(S);
  });
  return out;
}

/** one side of the reads between the panes as a scene opens (`Text`): the links shown at the record its text is made from, a derived record's where its image places them (LK's `shown`) */
const textOf = (/** @type {Source} */ x, /** @type {Doc} */ d) => ({ src: addrOf(x), d, shown: LK.shown(addrOf(x), d) });

/**
 * A scene on two panes as it opens (`open`, `reopen`): the ends `levels`
 * sets from the runs and the passage held as pane A's text holds it
 * (`placedHeld`), whether the far end names pane B's document whole, the
 * near passage's positions, and the stop at its first passage, none measured
 * yet; the full measure, the corners whole, until it stands (`stand`).
 * @param {Pane} pa
 * @param {Pane} pb
 * @param {ComparePair[]} pairs
 * @param {Held} held
 * @returns {Scene}
 */
function sceneOf(pa, pb, pairs, held) {
  const h = placedHeld(pa, held);
  return {
    a: pa, b: pb, pairs, level: levels(pairs, h), whole: !!h.wholeB, widthA: Math.max(1, h.widthA ?? 1),
    bands: [], lines: [], strokes: [], listing: null, relist: null, shared: [], next: 0, at: null, told: false, stepped: null, returned: null,
    fit: { cpl: MEASURE_CPL, corner: 'whole', px: READING_PX }, band: 0, size: '', updating: 0, waiting: [],
  };
}

/**
 * The passage an opener holds as the text pane A is set with holds it (see
 * the head): where the opener names its bytes (`Held.ids`), from the first
 * stretch that text's image places them in to the end of the last (M-REC's
 * `placedIn`); at the positions the opener names where it names none, or the
 * image places none of them.
 * @param {Pane} P pane A
 * @param {Held} held
 * @returns {Held}
 */
function placedHeld(P, held) {
  const at = held.ids && held.ids.length ? REC.placedIn(P.d.image, held.ids) : [];
  if (!at.length) return held;
  const first = at[0], last = at[at.length - 1];
  return { ...held, posA: first.pos, widthA: last.pos + last.width - first.pos };
}

/**
 * The bands a whole-document opening shows without (see the head): the two
 * texts' `compare`, asked as the scene shows; its answer, where the scene
 * still stands and neither pane was set again meanwhile — a setting reads its
 * own — taken: the runs of shared identity measured and drawn, the passages
 * the stop reaches with them, a refusal said (`sayFace`), a stop the
 * reader returned to answered (`answer`), and a stroke's list a reopening
 * owes shown (`relisted`); no pane scrolled, no focus moved by it save onto
 * that list where it was left holding the focus, and no act of the panes'
 * held waiting on it — only one made on that stop, which waits for this
 * answer.
 * @param {Scene} S
 * @returns {Promise<void>}
 */
async function addBands(S) {
  const sets = [S.a.sets, S.b.sets];
  const got = await compareBetween(S.a, S.b);
  const E = els;
  if (scene !== S || !E || S.a.sets !== sets[0] || S.b.sets !== sets[1]) return;
  S.pairs = got.pairs;
  if (got.refused) sayFace(E, got.refused.name);
  measure();
  answer(S, got);
  draw();
  relisted(S);
}

/** the bar's words for the refusal the panes' `compare` met, by its name */
const faceWords = (/** @type {string} */ face) => t(face === 'too_many_pairs' ? 'B1.too_many_pairs' : face === 'too_many_blocks' ? 'B1.too_many_blocks' : 'L.refused', { name: face });

/**
 * A refusal the `compare` met after the scene showed (`addBands`), said where
 * the bar says one, before its acts — which stand as they are, so a focus on
 * one stays — and in the status region, for it changed away from the focus
 * without the reader's act (FP-36).
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
 * the refusal the panes' `compare` met — and the hidden words each pane's name
 * leads with (`paneLead`), and, where pane B is the whole document a link's
 * far end names, the hidden words pane B's name ends with (`namePane`); both
 * panes fitted once (`fitOf`), each pane's article
 * T-LAYER's mount at the fit's measure, its corner in the fit's form on the
 * pane's outer side — pane A's before the article, pane B's after — or at its
 * document's head, and the fit set on the panes (`applyFit`).
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {string | null} face the refusal the `compare` met, by its name
 */
function stand(E, S, face) {
  scene = S;
  S.a.placed = placedInto(S.a, [...S.b.view.marks, ...S.a.view.marks]);
  S.b.placed = placedInto(S.b, [...S.a.view.marks, ...S.b.view.marks]);
  coverPlane(true);
  E.root.classList.add('on');
  S.fit = fitOf(E);
  for (const side of SIDES) S[side].view = { ...S[side].view, cpl: S.fit.cpl };
  E.strokes.innerHTML = '';
  if (face) E.bar.dataset.face = face; else delete E.bar.dataset.face;
  E.bar.innerHTML = `<b class="id" data-name="a">${esc(S.a.shows)}</b> │ <b class="id" data-name="b">${esc(S.b.shows)}</b> <span class="dim">${esc(t('F.scene.sameness'))} · ${esc(t('F.scene.link'))}</span>` +
    (face ? ` <span class="face-text">${esc(faceWords(face))}</span>` : '') +
    SIDES.map((side) => `<span id="${leadId(side)}" hidden>${esc(paneLead(S[side]))}</span>`).join('') +
    (S.whole ? `<span id="${WHOLE_ID}" data-string="L.scene.whole-end" hidden>${esc(t('L.scene.whole-end'))}</span>` : '') +
    ` <button data-relevel="1">${esc(t('F.scene.relevel'))} <kbd>${esc(drawChord('Mod+R'))}</kbd></button><button class="x" data-x="1">× ${esc(t('F.scene.dismiss'))}</button>`;
  for (const side of SIDES) {
    const P = S[side], pane = paneEl(E, side);
    pane.innerHTML = cornerMarkup(P, S.fit);
    swap(E, P);
    pane.setAttribute('tabindex', '0');
  }
  namePanes(E, S);
  applyFit(E, S);
}

/**
 * The scene reopened as the reader left it (see the head), once its reads
 * answer where no act was made on the chrome meanwhile (O-HOST's opening):
 * each pane's text read again (`paneAgain`) and the reads between the panes;
 * as it shows, the act's `leaving` first; the ends set level where their
 * bytes stand now, else where the panes' `compare` sets the passage held;
 * each pane brought back to its place and its selection (`placeAgain`); the
 * focus on the stop it stood on — one the panes' `compare` draws standing
 * with the landing (`returning`), answered as that read answers (`answer`) —
 * else in the far end's pane, and the pair named in the status region. A
 * pane the board refused the text of for what
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
    const between = await readBetween({ src: pa.src, d: pa.d, shown: LK.shown(pa.src, pa.d) }, { src: pb.src, d: pb.d, shown: LK.shown(pb.src, pb.d) }, !o.held.wholeB);
    return { pa, pb, between };
  }, ({ pa, pb, between }) => {
    const E = els;
    if (!E) return;
    if (as.leaving) as.leaving();
    const from = document.activeElement, spots = was.spots;
    for (const P of [pa, pb]) P.lacks = spots && P.src === was.panes[P.side].src ? spots[P.side].lacks : null;
    const S = sceneOf(pa, pb, between.pairs, o.held);
    stand(E, S, between.refused ? between.refused.name : null);
    if (spots) {
      for (const side of SIDES) {
        const lv = spots[side].level, at = lv ? REC.placedIn(S[side].d.image, lv.ids) : [];
        S.level[side] = !lv ? null : at.length ? at[0].pos : S.level[side];
      }
    }
    // a stop the panes' `compare` draws stands with the landing, the stop at a band's clipped end in a scene that shows one
    const left = was.stop && typeof was.stop === 'object' ? was.stop : null;
    if (left && (S.whole || left.kind === 'stroke')) S.returned = returning(E, S, left);
    level();
    if (spots) placeAgain(E, S, spots);
    // the far end's pane the scene's first control, which a region closing over it falls back to; the stop it stood on the focus's
    FOCUS.open('scene', { el: E.root, from, byKey: true, first: E.paneB });
    const stood = stopIn(E, was.stop);
    if (stood && stood !== E.paneB) FOCUS.land(stood, {});
    if (S.returned) S.returned.landed = document.activeElement === S.returned.el;
    FOCUS.say(`${t('L.scene-label')} · ${S.a.shows} │ ${S.b.shows}`);
    // a scene that read its `compare` before showing answers the stop at once: its name says it where the focus lands
    if (!S.whole) answer(S, between, true);
    // the stroke's list as the reader left it, over its stroke once the panes' `compare` has measured the strokes
    S.relist = was.list || null;
    if (!S.whole) relisted(S);
    out.shown = true;
    markDirty();
    if (S.whole) void addBands(S);
  });
  return out;
}

/**
 * The stroke's list a reopening owes (see the head; FP-36), shown over the
 * stroke bearing its key once the panes' `compare` has measured the strokes:
 * its changes read from the panes' texts now, the stroke's button its opener,
 * and the focus on its first row where the focus stood in it as the reader
 * left it and stands in the scene still; where no stroke bears the key, the
 * gone line said through the status region. Nothing where none is owed, or
 * an overlay stands.
 * @param {Scene} S
 */
function relisted(S) {
  const l = S.relist, E = els;
  S.relist = null;
  if (!l || !E || HOST.hasCurrent()) return;
  const s = S.strokes.find((x) => x.key === l.key);
  if (!s) { FOCUS.say(t('L.scene.stroke.gone')); return; }
  const btn = buttonOf(E, l.key), at = document.activeElement, take = l.focus && !!at && E.root.contains(at);
  if (btn && take) FOCUS.land(btn, {});
  showChanges(S, l.key, countOf(s), rowsOf(S, s), btn, take);
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
  // a derived record the entry kept is shown again as it stood, nothing read for it (see the head)
  if (v.derived) return { pane: { ...paneAt(side, v.src, { d: v.derived, n: null }), doc: v.doc }, refused: null };
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
 * place's line, where its text holds that byte — at its position in a
 * derived record the entry kept, whose text is the one left — at the height
 * it stood below the pane's visible top, a line that stood in view kept below
 * what a held head covers (`clearOf`) — any other pane left where the
 * re-level set it — and its selection put back on the same bytes; then the
 * ties drawn at the panes' scrolls.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {{a: Spot, b: Spot}} spots
 */
function placeAgain(E, S, spots) {
  for (const side of SIDES) {
    const P = S[side], pane = paneEl(E, side), s = spots[side], image = P.d.image;
    const at = s.place ? REC.placedIn(image, s.place.ids) : [];
    const pos = at.length ? at[0].pos : s.place && P.d.derived ? s.place.pos : null;
    if (s.place && pos != null) { const line = lineAt(pane, P.names, pos); if (line) pane.scrollTop = line.top - (s.place.at >= 0 ? Math.max(s.place.at, clearOf(pane)) : s.place.at); }
    const sel = s.sel ? REC.placedIn(image, s.sel.ids) : [], z = sel[sel.length - 1];
    if (s.sel && z && P.el) LAYER.selectIn(P.el, { addr: P.names, pos: sel[0].pos, width: z.pos + z.width - sel[0].pos }, s.sel.backward);
  }
  draw();
}

/**
 * The scene as the reader leaves it (see the head), by value: each pane's
 * text; where they stood in it, its selection and the end set level in it,
 * each by its bytes' identity through the image its article was made from;
 * the stop the platform's focus stands on (`stopOf`) — a stop the panes'
 * `compare` draws by what it stood for; and the stroke's list standing, by
 * its stroke's key, with whether the focus stood in it — or the one a
 * reopening still owes. What N-GO records in the scene's trail entry as the
 * reader leaves it; null where the scene does not stand.
 * @returns {Left | null}
 */
export function asLeft() {
  const S = scene, E = els;
  if (!S || !E) return null;
  /** @type {(P: Pane) => Version} */
  const version = (P) => ({ doc: P.doc, src: P.src, names: P.names, shows: P.shows, kind: P.kind, k: P.k, n: P.n, read: P.read, derived: P.d.derived ? P.d : null });
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
  const host = HOST.element(), at = document.activeElement;
  const list = S.listing && HOST.currentIs('stroke:' + S.listing.key) ? { key: S.listing.key, focus: !!host && !!at && host.contains(at) } : S.relist;
  return { panes: { a: version(S.a), b: version(S.b) }, spots: { a: spot(S.a), b: spot(S.b) }, stop: stopOf(E, S), list };
}

/**
 * The scene's stop the platform's focus stands on: a pane, a pane's corner,
 * one of the bar's acts; the stop at a band's clipped end and a stroke's
 * button by what they stand for (`sharedStop`, `strokeStop`); a stop the
 * reader returned to by what it stood for as they left it. Null where it
 * stands outside the scene, or on a stop whose bytes the image its pane's
 * article was made from does not name.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @returns {Stop | null}
 */
function stopOf(E, S) {
  const at = typeof document !== 'undefined' ? document.activeElement : null;
  if (!at) return null;
  for (const side of SIDES) {
    const pane = paneEl(E, side), corner = pane.querySelector(':scope > .corner');
    if (corner && corner.contains(at)) return /** @type {Stop} */ (side + ':corner');
    if (pane.contains(at)) return side;
  }
  if (S.returned && at === S.returned.el) return S.returned.stop;
  if (at === E.stop) return sharedStop(E, S);
  const stroke = E.strokes.contains(at) ? /** @type {HTMLElement} */ (at).dataset.stroke : undefined;
  if (stroke) return strokeStop(E, S, stroke);
  return at === E.bar.querySelector('[data-relevel]') ? 'relevel' : at === E.bar.querySelector('[data-x]') ? 'x' : null;
}

/** the element a stop names (`Stop`) as the scene stands now — a stop the panes' `compare` draws, the one standing returned (`returning`); null where it names none */
function stopIn(/** @type {NonNullable<typeof els>} */ E, /** @type {Stop | null} */ stop) {
  if (stop === 'a' || stop === 'b') return paneEl(E, stop);
  if (stop === 'a:corner' || stop === 'b:corner') return paneEl(E, stop === 'a:corner' ? 'a' : 'b').querySelector(':scope > .corner');
  if (stop && typeof stop === 'object') return scene && scene.returned ? scene.returned.el : null;
  return stop === 'relevel' ? E.bar.querySelector('[data-relevel]') : stop === 'x' ? E.bar.querySelector('[data-x]') : null;
}

/** the image a pane's article was made from (T-LAYER's `madeOf`): every position of the text it shows by identity; none where it holds no article */
const imageOf = (/** @type {Pane} */ P) => { const made = P.el ? LAYER.madeOf(P.el) : null; return made ? made.image : []; };
/** a stretch of a pane's text by identity, through the image its article was made from (M-REC's `identityIn`) */
const idsIn = (/** @type {Pane} */ P, /** @type {number} */ pos, /** @type {number} */ width) => REC.identityIn(imageOf(P), pos, width);
/** bytes named by identity, counted */
const bytesIn = (/** @type {ISpan[]} */ ids) => ids.reduce((n, s) => n + s.width, 0);

/**
 * Where a pane's words are read, as FP-27 names a copy of them (T-LAYER's
 * `Where`): the address the pane shows; the member its text is, where that
 * text is a published member — a version, or an edition at its bare address
 * whose member is known — never a draft's; and whether it is read at the
 * plain address. Its article is made with it (`swap`), so a copy from the
 * pane (T-LAYER's `namedIn`) and a stop it records (`named`) name alike where
 * a passage was read.
 * @param {Pane} P
 * @returns {Where}
 */
const whereIn = (P) => ({ doc: P.shows, member: P.kind !== 'draft' && memberOf(P.names) != null ? P.names : null, plain: P.kind === 'bare' });

/**
 * A passage of a pane's text named as FP-27 names a copy (`Named`; see the
 * head): where the pane's words are read (`whereIn`), on the board; the
 * passage's positions in the member named, where it stands in one stretch of
 * it; its bytes by identity. A draft's positions are never named.
 * @param {Pane} P
 * @param {ISpan[]} ids
 * @returns {Named}
 */
function named(P, ids) {
  const where = whereIn(P);
  const at = where.member ? REC.placedIn(imageOf(P), ids) : [];
  const one = at.length === 1 && at[0].width === bytesIn(ids) ? at[0] : null;
  const b = REC.board();
  return { board: b ? b.origin : '', ...where, pos: one ? one.pos : null, width: one ? one.width : null, ids };
}

/** where an element of the scene stands, px from the scene's box: its right edge — the stop's, against pane B's facing edge — else its middle across, and its middle down */
function placeIn(/** @type {NonNullable<typeof els>} */ E, /** @type {HTMLElement} */ el, /** @type {'edge' | 'middle'} */ how) {
  const r = el.getBoundingClientRect(), root = E.root.getBoundingClientRect();
  const x0 = root.left + E.root.clientLeft, y0 = root.top + E.root.clientTop;
  return { x: (how === 'edge' ? r.right : r.left + r.width / 2) - x0, y: r.top + r.height / 2 - y0 };
}

/**
 * The stop at a band's clipped end as the reader leaves it (`SharedStop`):
 * the passage of pane B it stands for, the passage its act last went to,
 * each named (`named`), and where it stands. Null where it stands for none,
 * or the image pane B's article was made from does not name its bytes.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @returns {SharedStop | null}
 */
function sharedStop(E, S) {
  const p = S.at != null ? S.shared[S.at] : null, ids = p ? idsIn(S.b, p.pos, p.width) : [];
  if (!p || !ids.length) return null;
  return { kind: 'shared', at: named(S.b, ids), stepped: S.stepped ? named(S.b, S.stepped) : null, place: placeIn(E, E.stop, 'edge') };
}

/**
 * A stroke's button as the reader leaves it (`StrokeStop`): its key, the
 * runs' facing bytes by identity, each change's bytes in each pane named
 * (`named`), and where it stands. Null where no stroke bears the key, or the
 * image pane A's article was made from does not name the facing bytes — its
 * key then the changes' positions, which a draft's never are.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {string} key
 * @returns {StrokeStop | null}
 */
function strokeStop(E, S, key) {
  const s = S.strokes.find((x) => x.key === key), btn = buttonOf(E, key);
  if (!s || !btn) return null;
  const first = s.changes[0], last = s.changes[s.changes.length - 1];
  const before = idsIn(S.a, first.a.from - 1, 1), after = idsIn(S.a, last.a.to, 1);
  if (!before.length || !after.length) return null;
  const changes = s.changes.map((c) => ({ a: named(S.a, idsIn(S.a, c.a.from, c.a.to - c.a.from)), b: named(S.b, idsIn(S.b, c.b.from, c.b.to - c.b.from)) }));
  return { kind: 'stroke', key, before, after, changes, place: placeIn(E, btn, 'middle') };
}

/** the box a returned stop's count stands as while the panes' `compare` is read (FP-34): empty, its own width */
const READING = '<span class="n reading" aria-hidden="true"></span>';

/**
 * A stop the reader left from that the panes' `compare` draws, standing with
 * the landing as the scene reopens (see the head; FP-20, FP-34): its element
 * — the stop, or a stroke's button bearing its key — shown, never hidden,
 * named for its kind and what it stood for (`nameReturned`), its count being
 * read, and placed where what it stood for stands (`placeReturned`), until
 * the read answers (`answer`).
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {Material} stop
 * @returns {Returned}
 */
function returning(E, S, stop) {
  /** @type {HTMLElement} */
  let el = E.stop;
  if (stop.kind === 'stroke') {
    const btn = buttonOf(E, stop.key);
    if (btn) el = btn;
    else {
      el = document.createElement('button');
      el.setAttribute('type', 'button');
      el.id = 'scenestroke-' + stop.key;
      el.dataset.stroke = stop.key;
      E.strokes.appendChild(el);
    }
  }
  /** @type {Returned} */
  const R = { stop, el, answer: null, landed: false, moved: false, waiting: null, face: null };
  el.hidden = false;
  nameReturned(E, S, R);
  placeReturned(E, S, R);
  return R;
}

/** a passage's opening words where a pane's text holds it, read by T-ARTICLE's item rule (`copyText`) and cut on a word; null where the text holds none of it */
function wordsAt(/** @type {Pane} */ P, /** @type {ISpan[]} */ ids) {
  const made = P.el ? LAYER.madeOf(P.el) : null, at = made ? REC.placedIn(made.image, ids)[0] : undefined;
  if (!made || !at) return null;
  const text = copyText(made, { addr: made.addr, pos: at.pos, width: Math.min(at.width, 160) }, LAYER.originOwner).replace(/\s+/g, ' ').trim();
  if (text.length <= 48) return text;
  const cut = text.slice(0, 48), space = cut.lastIndexOf(' ');
  return (space > 16 ? cut.slice(0, space) : cut) + '…';
}

/** a returned stroke's changes in words (`changeWords`), each side's characters where the pane's text holds its bytes, a side holding none "nothing"; null where a pane's text holds no longer the bytes of a side that held some */
function changesAt(/** @type {Scene} */ S, /** @type {StrokeStop} */ stop) {
  const [A, B] = sidesOf(S);
  /** where a change's side stands in its pane's text: none, where it held no byte */
  const side = (/** @type {Pane} */ P, /** @type {Named} */ n) => {
    if (!n.ids.length) return { from: 0, to: 0 };
    const at = REC.placedIn(imageOf(P), n.ids);
    return at.length === 1 && at[0].width === bytesIn(n.ids) ? { from: at[0].pos, to: at[0].pos + at[0].width } : null;
  };
  const changes = stop.changes.map((c) => ({ a: side(S.a, c.a), b: side(S.b, c.b) }));
  if (changes.some((c) => !c.a || !c.b)) return null;
  return changes.map((c) => changeWords(/** @type {Change} */ (c), A, B, LAYER.originOwner)).join(' · ');
}

/** what the answer said of a returned stop in FP-21's words: the dead end's where the text holds none of it, else the line's */
const saidWords = (/** @type {Scene} */ S, /** @type {Answered} */ a) => (a.holds === 'none' ? floatingOf(S.b.shows) : a.said ? lineOf(a.said) : '');

/**
 * A returned stop's name and count drawn from what it stood for and what the
 * answer told (see the head; FP-34): while it is read, its kind's words and
 * what it stood for — the stop at a band's clipped end the passage's opening
 * words where pane B's text holds it, a stroke its changes in words where the
 * panes' texts hold them — its count an empty box of its own width; all of it
 * holding, the name and the count of the stop it is then; else its kind's
 * words and the answer's (FP-21), no count.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {Returned} R
 */
function nameReturned(E, S, R) {
  const a = R.answer, D = S.b.shows, stop = R.stop;
  /** @type {[string, Record<string, string | number>]} its name's string, and the values its tokens take */
  let name;
  if (stop.kind === 'shared') {
    const text = a ? null : wordsAt(S.b, stop.at.ids);
    name = !a ? (text ? ['L.scene.shared.returned', { D, text }] : ['L.scene.shared.returned.away', { D }])
      : a.holds === 'all' ? [a.count > 1 ? 'L.scene.shared' : 'L.scene.shared.1', { D, n: a.count }]
        : ['L.scene.stop.said', { stop: t('L.scene.shared.1', { D }), said: saidWords(S, a) }];
    R.el.setAttribute('aria-label', t(name[0], name[1]));
    if (!a) R.el.innerHTML = READING;
    else R.el.textContent = a.holds !== 'none' && a.holds !== 'unknown' && a.count > 1 ? String(a.count) : '';
    return;
  }
  const changes = a ? null : changesAt(S, stop), [A, B] = sidesOf(S), s = a && a.holds === 'all' ? strokeFor(S, R) : null;
  name = !a ? (changes != null ? ['L.scene.stroke.returned', { changes }] : ['L.scene.stroke.returned.away', {}])
    : s ? ['L.scene.stroke.name', strokeWords(s, A, B, LAYER.originOwner)]
      : ['L.scene.stop.said', { stop: t('L.scene.stroke.kind'), said: saidWords(S, a) }];
  R.el.setAttribute('aria-label', t(name[0], name[1]));
  R.el.innerHTML = !a ? READING : s && s.changes.length > 1 ? `<span class="n">${s.changes.length}</span>` : '';
}

/**
 * Where a returned stop stands (see the head): where what it stood for stands
 * in the panes' texts now, held inside the panes' visible heights — the stop
 * at a band's clipped end against pane B's facing edge, level with its
 * passage's first line (`sharedAt`); a stroke's button at the middle of the
 * halves its change takes, where its runs' facing bytes meet in each pane
 * (`strokeAt`) — else where it stood as the reader left it.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {Returned} R
 */
function placeReturned(E, S, R) {
  const root = E.root.getBoundingClientRect(), x0 = root.left + E.root.clientLeft, y0 = root.top + E.root.clientTop;
  const p = R.stop.kind === 'shared' ? sharedAt(E, S, R.stop) : strokeAt(E, S, R.stop);
  const at = p ? { x: p.x - x0, y: p.y - y0 } : R.stop.place;
  R.el.style.left = at.x + 'px';
  R.el.style.top = at.y + 'px';
  if (R.stop.kind === 'shared') R.el.style.transform = 'translate(-100%, -50%)';
  R.el.hidden = false;
}

/** where the passage a returned stop at a band's clipped end stood for stands, on screen: pane B's facing edge, level with its first line, held inside the pane's visible height; null where pane B's text holds none of it */
function sharedAt(/** @type {NonNullable<typeof els>} */ E, /** @type {Scene} */ S, /** @type {SharedStop} */ stop) {
  const pane = E.paneB, at = REC.placedIn(imageOf(S.b), stop.at.ids)[0];
  const line = at ? lineIn(pane, S.b.names, at.pos, at.width) : null;
  if (!line) return null;
  const r = pane.getBoundingClientRect(), top = r.top + pane.clientTop, half = E.stop.getBoundingClientRect().height / 2 || 8;
  return { x: r.left, y: Math.max(top + half, Math.min(top + pane.clientHeight - half, top - pane.scrollTop + line.y)) };
}

/** where a returned stroke's runs meet, on screen: the middle of the halves its change takes, between the heights its runs' facing bytes meet at in each pane (`meetAt`), held inside the panes' visible heights; null where a pane's text holds no longer both facing bytes */
function strokeAt(/** @type {NonNullable<typeof els>} */ E, /** @type {Scene} */ S, /** @type {StrokeStop} */ stop) {
  /** the height a pane's runs meet at, px below its content top */
  const meet = (/** @type {Pane} */ P, /** @type {HTMLElement} */ pane) => {
    const boxes = boxesIn(pane, P.names), image = imageOf(P);
    const b = REC.placedIn(image, stop.before)[0], f = REC.placedIn(image, stop.after)[0];
    const last = boxes && b ? boxes.at(b.pos) : null, first = boxes && f ? boxes.at(f.pos) : null;
    return boxes && last && first ? meetAt(last, first, boxes.lb) ?? (last.bottom + first.top) / 2 : null;
  };
  const ya = meet(S.a, E.paneA), yb = meet(S.b, E.paneB);
  if (ya == null || yb == null) return null;
  /** a height in a pane, on screen, held inside its visible height */
  const held = (/** @type {HTMLElement} */ pane, /** @type {number} */ y) => {
    const top = pane.getBoundingClientRect().top + pane.clientTop;
    return Math.max(top, Math.min(top + pane.clientHeight, top - pane.scrollTop + y));
  };
  const a = { x: E.paneA.getBoundingClientRect().right, y: held(E.paneA, ya) }, b = { x: E.paneB.getBoundingClientRect().left, y: held(E.paneB, yb) };
  const halfA = stop.changes.some((c) => c.a.ids.length > 0), halfB = stop.changes.some((c) => c.b.ids.length > 0);
  return pointOn(strokeOf(a, b), halfA && halfB ? GAP_MIDDLE : halfA ? GAP_MIDDLE / 2 : (1 + GAP_MIDDLE) / 2);
}

/**
 * What the passages of pane B holding the near passage's material hold of a
 * passage a returned stop stood for (see the head; FP-21): the near
 * passage's counterparts in pane B (`counterparts`), in pane B's order, each
 * one's bytes by identity through pane B's image, read by BM-HELD's one rule
 * (`piecesOf`, `heldOf`); and the first of them in pane B's order holding all
 * of it, else any of it.
 * @param {ComparePair[]} pairs `compare`'s pairs, `u1` in pane A's text
 * @param {{pos: number, width: number}} near the near passage, in pane A's text
 * @param {import('../model/records.js').ImageRun[]} image the image pane B's article was made from
 * @param {ISpan[]} passage what the stop stood for, by identity
 * @returns {{held: import('../beams/held.js').Held, at: number | null, count: number}} `at` that counterpart's first position in pane B's text, null where none holds any; `count` the counterparts
 */
export function sharedHeld(pairs, near, image, passage) {
  const cs = counterparts(pairs, near.pos, near.width).sort((p, q) => p.b - q.b);
  const runs = cs.map((c) => REC.identityIn(image, c.b, c.width)), width = bytesIn(passage);
  const { pieces, places } = piecesOf(passage, runs), held = heldOf(pieces, width, places);
  const whole = runs.findIndex((r) => heldOf(piecesOf(passage, [r]).pieces, width).holds === 'all');
  const any = whole >= 0 ? whole : runs.findIndex((r) => piecesOf(passage, [r]).pieces.length > 0);
  return { held, at: any >= 0 ? cs[any].b : null, count: cs.length };
}

/**
 * The changes two texts' runs of shared identity stand between (see the
 * head): each two runs consecutive in both documents, neither holding a byte
 * of the other, with bytes between them on either side — a stroke where their
 * panes set them on one line, an unbanded stretch where not — in the first
 * document's order.
 * @param {ComparePair[]} pairs `compare`'s pairs, `u1` in the first document
 * @returns {Change[]}
 */
export function junctionsOf(pairs) {
  const runs = merged(pairs), byB = [...runs].sort((x, y) => x.u2 - y.u2 || x.u1 - y.u1);
  /** @type {Map<ComparePair, ComparePair | undefined>} each run's successor in the second document's order */
  const nextB = new Map(byB.map((r, k) => [r, byB[k + 1]]));
  /** @type {Change[]} */
  const out = [];
  for (let k = 0; k + 1 < runs.length; k++) {
    const r = runs[k], s = runs[k + 1];
    if (nextB.get(r) !== s || s.u1 < r.u1 + r.width || s.u2 < r.u2 + r.width) continue;
    const c = { a: { from: r.u1 + r.width, to: s.u1 }, b: { from: r.u2 + r.width, to: s.u2 } };
    if (c.a.to > c.a.from || c.b.to > c.b.from) out.push(c);
  }
  return out;
}

/** do two namings of bytes by identity name the same bytes: the same permanent addresses in the same order, however their runs are cut */
export function sameBytes(/** @type {ISpan[]} */ x, /** @type {ISpan[]} */ y) {
  /** runs of one I-space whose addresses follow on joined */
  const joined = (/** @type {ISpan[]} */ ids) => ids.reduce((/** @type {ISpan[]} */ out, s) => {
    const last = out[out.length - 1];
    if (last && last.prefix === s.prefix && last.ordinal + last.width === s.ordinal) last.width += s.width; else out.push({ ...s });
    return out;
  }, []);
  const a = joined(x), b = joined(y);
  return a.length === b.length && a.every((s, i) => s.prefix === b[i].prefix && s.ordinal === b[i].ordinal && s.width === b[i].width);
}

/**
 * What two texts hold of the change a returned stroke stood for (see the
 * head; FP-21): every change it stood for standing between runs consecutive in
 * both documents (`junctionsOf`) with the same bytes on each side, the first
 * after the same facing byte and the last before the same, all of it; one of
 * them standing so, or a change standing after its first facing byte or
 * before its last, part of it; else none. The changes standing where it stood
 * with it.
 * @param {ComparePair[]} pairs `compare`'s pairs, `u1` in pane A's text
 * @param {{a: import('../model/records.js').ImageRun[], b: import('../model/records.js').ImageRun[]}} images the images the panes' articles were made from
 * @param {StrokeStop} stop
 * @returns {{holds: 'all' | 'part' | 'none', changes: Change[]}}
 */
export function strokeHeld(pairs, images, stop) {
  const now = junctionsOf(pairs).map((c) => ({
    c, before: REC.identityIn(images.a, c.a.from - 1, 1), after: REC.identityIn(images.a, c.a.to, 1),
    a: REC.identityIn(images.a, c.a.from, c.a.to - c.a.from), b: REC.identityIn(images.b, c.b.from, c.b.to - c.b.from),
  }));
  /** does a change standing now hold a change the stroke stood for, its bytes on each side the same */
  const exact = (/** @type {typeof now[number]} */ j, /** @type {StrokeStop['changes'][number]} */ c) => sameBytes(j.a, c.a.ids) && sameBytes(j.b, c.b.ids);
  const found = stop.changes.map((c) => now.find((j) => exact(j, c)) || null);
  const first = found[0], last = found[found.length - 1];
  if (found.every(Boolean) && first && last && sameBytes(first.before, stop.before) && sameBytes(last.after, stop.after)) return { holds: 'all', changes: found.map((j) => /** @type {typeof now[number]} */ (j).c) };
  const touched = now.filter((j) => found.includes(j) || sameBytes(j.before, stop.before) || sameBytes(j.after, stop.after)
    || stop.changes.some((c) => (c.a.ids.length > 0 && sameBytes(j.a, c.a.ids)) || (c.b.ids.length > 0 && sameBytes(j.b, c.b.ids))));
  return touched.length ? { holds: 'part', changes: touched.map((j) => j.c) } : { holds: 'none', changes: [] };
}

/** does a pane's text show withheld text, under which the rest of a passage may stand (BM-HELD's `saidOf`) */
const withheldIn = (/** @type {Pane} */ P) => P.d.blocks.some((b) => b.kind === 'withheld');

/**
 * What the panes' `compare` told of what a returned stop stood for (see the
 * head; FP-21): where it told nothing, couldn't tell, by the refusal that kept
 * it from telling — the same where the stop named no bytes; else, the stop at
 * a band's clipped end, what pane B's passages holding the near passage's
 * material hold of its passage (`sharedHeld`) and the one standing for it
 * among those measured; a stroke, what the texts hold of its change
 * (`strokeHeld`). The line's words for pieces, part and couldn't tell — the
 * text pane B shows its "where".
 * @param {Scene} S
 * @param {Material} stop
 * @param {Compared} cmp
 * @returns {Answered}
 */
function answerOf(S, stop, cmp) {
  const D = S.b.shows;
  const unknown = (/** @type {Met | null} */ r) => /** @type {Answered} */ ({ holds: 'unknown', said: unknownOf(r, 'stop', D), at: null, count: 0, changes: [] });
  if (!cmp.told) return unknown(cmp.why);
  if (stop.kind === 'shared') {
    if (!stop.at.ids.length || S.level.a == null) return unknown(null);
    const h = sharedHeld(S.pairs, { pos: S.level.a, width: S.widthA }, imageOf(S.b), stop.at.ids), holds = h.held.holds;
    const at = h.at == null ? -1 : S.shared.findIndex((p) => p.pos === h.at);
    return { holds, said: holds === 'all' || holds === 'none' ? null : saidOf(h.held, 'stop', D, withheldIn(S.b)), at: at >= 0 ? at : null, count: h.count, changes: [] };
  }
  const h = strokeHeld(S.pairs, { a: imageOf(S.a), b: imageOf(S.b) }, stop);
  return { holds: h.holds, said: h.holds === 'part' ? saidOf({ holds: 'part' }, 'stop', D, withheldIn(S.b)) : null, at: null, count: h.changes.length, changes: h.changes };
}

/** the stroke a returned stroke's button stands for once answered: the one measured bearing its key, else the changes the answer found standing where it stood; null where none stands */
function strokeFor(/** @type {Scene} */ S, /** @type {Returned} */ R) {
  if (R.stop.kind !== 'stroke') return null;
  const key = R.stop.key, s = S.strokes.find((x) => x.key === key);
  if (s) return s;
  const changes = R.answer ? R.answer.changes : [];
  return changes.length ? { a: 0, b: 0, halfA: changes.some((c) => c.a.to > c.a.from), halfB: changes.some((c) => c.b.to > c.b.from), changes, key } : null;
}

/** the shared passage after the one a returned stop's act last went to, where the stop's next act goes first; the stop's own where it went to none */
function nextAfter(/** @type {Scene} */ S, /** @type {SharedStop} */ stop) {
  const p = stop.stepped ? REC.placedIn(imageOf(S.b), stop.stepped.ids)[0] : undefined;
  const i = p ? S.shared.findIndex((q) => q.pos <= p.pos && p.pos < q.pos + q.width) : -1;
  return i >= 0 ? (i + 1) % S.shared.length : S.next;
}

/** has the reader moved on from a returned stop (see the head): the focus left it once it had stood on it, or they acted in the scene — once, for good */
function movedOn(/** @type {Returned} */ R) {
  if (!R.moved && R.landed && typeof document !== 'undefined' && document.activeElement !== R.el) R.moved = true;
  return R.moved;
}

/** the reader acted in the scene: a stop they returned to is moved on from (`movedOn`) */
function actedIn(/** @type {Scene | null} */ S) { if (S && S.returned) S.returned.moved = true; }

/**
 * The panes' `compare` answering a stop the reader returned to (see the head;
 * FP-20, FP-21, FP-25): what it stood for read against the runs (`answerOf`)
 * and the stop drawn again in its place — the same element, the focus kept —
 * named by what it told (`nameReturned`). All of it holding: the stop the one
 * standing for the passage holding it, its count filled, the change said
 * politely. Part of it, none, or nothing told: the stop staying, saying so in
 * FP-21's words — at its site where the reader still stands on it and no
 * overlay of theirs stands (`showSaid`), else politely. An act made on it
 * while it was read (`wait`) made now where what it stood for holds, at the
 * part held where only part does; dropped where none does, nothing told, or
 * the reader moved on first, so the answer moves nothing (FP-25). Nothing
 * where no stop stands returned, or it is answered.
 * @param {Scene} S
 * @param {Compared} cmp
 * @param {boolean} [told] the answer stands as the scene shows: the stop's name says it where the focus lands, and the status region does not say it again
 */
function answer(S, cmp, told = false) {
  const R = S.returned, E = els;
  if (!R || R.answer || !E) return;
  const moved = movedOn(R), waiting = R.waiting;
  R.waiting = null;
  const a = R.answer = answerOf(S, R.stop, cmp);
  if (R.stop.kind === 'shared' && (a.holds === 'all' || a.holds === 'pieces' || a.holds === 'part')) { S.at = a.at; S.next = nextAfter(S, R.stop); }
  nameReturned(E, S, R);
  if (R.face && R.face.startsWith('reaching:') && HOST.currentIs(R.face)) HOST.complete(R.face);
  R.face = null;
  const acts = !!waiting && !moved && a.holds !== 'none' && a.holds !== 'unknown';
  if (acts && waiting) madeAct(S, R, waiting.byKey);
  if (a.holds === 'all') {
    S.told = true;
    if (!told) FOCUS.say(R.el.getAttribute('aria-label') || '');
    if (acts && S.returned === R) S.returned = null;
  } else if (!(acts && R.stop.kind === 'stroke')) showSaid(S, R, moved, told);
  markDirty();
}

/**
 * What the answer said of a returned stop, in FP-21's words (see the head):
 * a face at its site — the dead end's where the texts hold none of it, else
 * the line's, "try again" where a retry may tell (`again`) — where the reader
 * still stands on it and no overlay of theirs stands; else said politely.
 * @param {Scene} S
 * @param {Returned} R
 * @param {boolean} moved the reader moved on from it
 * @param {boolean} told its name says it where the focus lands: the face says it nowhere else, and nothing is said of it again
 */
function showSaid(S, R, moved, told) {
  const a = R.answer;
  if (!a || a.holds === 'all') return;
  const ours = !HOST.hasCurrent() || (R.face != null && HOST.currentIs(R.face));
  if (!moved && ours && faces) {
    if (a.holds === 'none') { faces.floating(S.b.shows, { el: R.el }, told); R.face = 'face:floating'; }
    else if (a.said) { const said = a.said; faces.held(said, { el: R.el }, said.again ? () => again(S, R) : null, told); R.face = 'face:held'; }
    return;
  }
  if (!told) FOCUS.say(saidWords(S, a));
}

/** "try again" at a returned stop no answer told of (see the head): the stop being read again, its face taken down, and the panes' `compare` asked again (`addBands`) */
function again(/** @type {Scene} */ S, /** @type {Returned} */ R) {
  const E = els;
  if (scene !== S || S.returned !== R || !E) return;
  R.answer = null;
  if (R.face && HOST.currentIs(R.face)) HOST.complete(R.face);
  R.face = null;
  nameReturned(E, S, R);
  markDirty();
  void addBands(S);
}

/**
 * An act made on a returned stop while the panes' `compare` is read (see the
 * head; FP-25): it waits for the answer (`answer`), said where it was made by
 * O-FACES' reaching face, whose dismissal — Esc's, or the scene's end —
 * abandons it. A second act while one waits adds nothing.
 * @param {Scene} S
 * @param {Returned} R
 * @param {boolean} byKey a key made the act
 */
function wait(S, R, byKey) {
  if (R.waiting) return;
  R.waiting = { byKey };
  if (!faces) return;
  faces.reaching(S.b.shows, { el: R.el }, () => { if (scene === S && S.returned === R) R.waiting = null; });
  R.face = 'reaching:' + S.b.shows;
}

/** a returned stop's own act, made where what it stood for holds (see the head): the stop at a band's clipped end goes to the passage holding it (`toShared`); a stroke's button shows the changes standing where it stood (`showChanges`) */
function madeAct(/** @type {Scene} */ S, /** @type {Returned} */ R, /** @type {boolean} */ byKey) {
  if (R.stop.kind === 'shared') { toShared(); return; }
  const s = strokeFor(S, R);
  if (s) showChanges(S, R.stop.key, countOf(s), rowsOf(S, s), R.el, byKey);
}

/**
 * The act on a returned stop (see the head), pressed — a click, Enter or
 * Space: while it is read, it waits (`wait`); answered, made where what it
 * stood for holds (`madeAct`), the stop then, where all of it held, the one
 * it stands for, under the scene's own rules; where none holds or nothing
 * told, its words shown again at its site, so no press is silent.
 * @param {Scene} S
 * @param {Returned} R
 * @param {boolean} byKey a key made the act
 */
function returnedAct(S, R, byKey) {
  const a = R.answer;
  if (!a) { wait(S, R, byKey); return; }
  if (a.holds === 'none' || a.holds === 'unknown') { showSaid(S, R, false, false); return; }
  madeAct(S, R, byKey);
  if (a.holds === 'all' && S.returned === R) S.returned = null;
}

/** the stop at a band's clipped end pressed (FP-20): a returned one's act (`returnedAct`), else its own (`toShared`), an act in the scene moving the reader on from a stroke they returned to */
function stopAct(/** @type {boolean} */ byKey) {
  const S = scene, R = S ? S.returned : null;
  if (S && R && els && R.el === els.stop) { returnedAct(S, R, byKey); return; }
  actedIn(S);
  toShared();
}

/**
 * The stop the reader returned to as it stands (the gate reads it): its kind
 * and key, its element's id, whether it is shown, its name, the count it
 * shows and whether that count is being read, its rect on screen, what the
 * answer told — its state, the passage holding it, the count and its words —
 * whether an act on it waits for the answer, whether the reader moved on, and
 * the overlay it shows at its site; null where none stands.
 */
export function returned() {
  const S = scene, R = S ? S.returned : null;
  if (!S || !R) return null;
  const r = R.el.getBoundingClientRect(), a = R.answer;
  return {
    kind: R.stop.kind, key: R.stop.kind === 'stroke' ? R.stop.key : null, id: R.el.id, shown: !R.el.hidden && R.el.isConnected,
    name: R.el.getAttribute('aria-label'), count: R.el.textContent || '', reading: !!R.el.querySelector('.reading'),
    rect: { x: r.left, y: r.top, w: r.width, h: r.height },
    answer: a ? { holds: a.holds, at: a.at, count: a.count, words: a.holds === 'all' ? null : saidWords(S, a) } : null,
    waiting: !!R.waiting, moved: R.moved, face: R.face,
  };
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

/**
 * The first position of a pane's text whose line stands in view (see the
 * head): in the first span in view (`firstInView`), the first of its
 * positions whose line's top stands at the pane's visible top or below it,
 * that top taken below what a held head covers (`clearOf`) — else its last,
 * whose line the top cuts — what a refit carries, its lines being broken
 * anew; the span's own first where it is no paragraph.
 * @param {Pane} P
 * @param {HTMLElement} pane
 * @returns {number | null}
 */
function firstLineIn(P, pane) {
  const first = firstInView(pane), made = P.el ? LAYER.madeOf(P.el) : null;
  const b = first != null && made ? made.blocks.find((x) => x.pos === first) : null;
  if (!b || b.kind !== 'para' || b.width < 2) return first;
  const top = pane.scrollTop + clearOf(pane) - 0.5;
  /** the top of the line a position stands on, in px of the pane's content: its own line, else the last before it that sets a glyph */
  const lineTop = (/** @type {number} */ p) => { const l = lineAt(pane, P.names, p); return l ? l.top : -Infinity; };
  let lo = b.pos, hi = b.pos + b.width - 1;
  if (lineTop(hi) < top) return hi;
  while (lo < hi) { const m = (lo + hi) >> 1; if (lineTop(m) >= top) hi = m; else lo = m + 1; }
  return lo;
}

/** the first position of the first block of a pane's article whose box meets the pane's visible content below what a held head covers (`clearOf`) — the first span in view; null where none does */
function firstInView(/** @type {HTMLElement} */ pane) {
  const art = articleIn(pane);
  if (!art) return null;
  const r = pane.getBoundingClientRect(), top = r.top + pane.clientTop + clearOf(pane), bottom = r.top + pane.clientTop + pane.clientHeight;
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
 * The panes' fit, decided once for both (see the head; FP-12, FP-26): P-LAY's
 * fit (`fitFor`) of the narrower pane's content box at the reading size
 * (P-CAM's), each corner beside its column whole or compact with the pane's
 * gap between them, and no margin past the column's edge — the pane's padding
 * holds that room; the full measure at the reading size, the corners whole,
 * where the platform lays out no pane.
 * @param {NonNullable<typeof els>} E
 * @returns {PaneFit}
 */
function fitOf(E) {
  /** a pane's content box and the gap its corner keeps from its text, px; null where the platform lays it out nowhere */
  const room = (/** @type {HTMLElement} */ pane) => {
    if (typeof getComputedStyle !== 'function' || !(pane.clientWidth > 0)) return null;
    const cs = getComputedStyle(pane);
    return { w: pane.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), gap: parseFloat(cs.columnGap) || 0 };
  };
  const rooms = [room(E.paneA), room(E.paneB)].filter((r) => r != null);
  if (!rooms.length) return { cpl: MEASURE_CPL, corner: 'whole', px: READING_PX };
  const r = rooms.reduce((x, y) => (y.w < x.w ? y : x));
  const F = fitFor(r.w, READING_PX, { whole: cornerWidth(false), compact: cornerWidth(true), gap: r.gap }, 0);
  return { cpl: F.cpl, corner: F.head ? 'head' : F.compact ? 'compact' : 'whole', px: F.px };
}

/**
 * The scene's fit set on the panes (see the head): the measure on the scene,
 * which each article's column reads (the style's `--measure`), both articles
 * at the fit's em, each pane standing its corner beside its column or, at its
 * document's head, above its text, each corner shaped for the form
 * (`shapeCorner`), and the band its heads reserve (`setBand`) — `keep` the
 * text standing where it is on screen as the band moves. Nothing where the
 * platform lays out no pane.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {boolean} [keep]
 */
function applyFit(E, S, keep = false) {
  if (typeof getComputedStyle !== 'function') return;
  const F = S.fit;
  E.root.style.setProperty('--measure', String(F.cpl));
  for (const side of SIDES) {
    const pane = paneEl(E, side), art = articleIn(pane), c = cornerEl(E, side);
    pane.classList.toggle('head', F.corner === 'head');
    if (art) art.el.style.fontSize = F.px + 'px';
    if (c) shapeCorner(c, F, S[side]);
  }
  setBand(E, S, keep);
}

/**
 * The band the panes' heads reserve above their text set (see the head;
 * FP-26): at their documents' heads, the more of the two corners' rows (`Pane.rows`)
 * at the reading line's pitch, so both texts begin at one depth — each
 * corner's first row its own box, the rest of the band below it — and none
 * beside their columns; where it moved and `keep` asks, each pane scrolled by
 * as much, so its text stands where it stood on screen (FP-8).
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {boolean} keep
 * @returns {boolean} the band moved
 */
function setBand(E, S, keep) {
  const pitch = LINE_H * S.fit.px, band = S.fit.corner === 'head' ? Math.max(S.a.rows, S.b.rows, 1) : 0, was = S.band;
  S.band = band;
  for (const side of SIDES) {
    const c = cornerEl(E, side);
    if (c) c.style.marginBottom = band > 1 ? (band - 1) * pitch + 'px' : '';
    if (keep && band !== was && was > 0 && band > 0) paneEl(E, side).scrollTop += (band - was) * pitch;
  }
  return band !== was;
}

/** the heads' band set again where the corners' rows changed since it was set (`setBand`), each pane's text kept where it stands on screen, and the ties measured again and drawn */
function rebanded(/** @type {NonNullable<typeof els>} */ E, /** @type {Scene} */ S) {
  if (S.fit.corner === 'head' && setBand(E, S, true)) { measure(); draw(); }
}

/**
 * The panes fitted again as their size or a face changed (see the head): the
 * fit read again (`fitOf`); where its measure, its corners' form or its em
 * moved, both panes set again in one step at it (`setPanes`) — their texts
 * and what they were set with kept, the reader's place, the selection and the
 * ends set level carried by their bytes, the ties measured anew — else the fit
 * set on the panes again in place (`applyFit`), their text kept where it
 * stands, the room below each article and the ties measured anew.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @returns {boolean} the panes were set again — and drawn
 */
function refit(E, S) {
  const F = fitOf(E), was = S.fit;
  if (F.cpl === was.cpl && F.corner === was.corner && F.px === was.px) {
    applyFit(E, S, true);
    roomBelow(E);
    measure();
    return false;
  }
  S.fit = F;
  setPanes(S, SIDES.map((side) => {
    const P = S[side];
    return { side, same: true, next: { d: P.d, view: P.view, kind: P.kind, src: P.src, names: P.names, shows: P.shows, k: P.k, n: P.n, read: P.read, lacks: P.lacks, hold: null } };
  }), null);
  return true;
}

/**
 * The heads' later rows and the forms opened beneath them placed at the
 * panes' scrolls (see the head; FP-26): each corner's first row held at its
 * pane's top by the style, its later rows where the band sets them, scrolling
 * with the text and hidden once they have passed wholly under the first, a
 * form opened beneath them below the last of its rows, or below the first as
 * they pass under it.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 */
function placeHeads(E, S) {
  if (S.fit.corner !== 'head') return;
  const pitch = LINE_H * S.fit.px;
  for (const side of SIDES) {
    const c = cornerEl(E, side), art = articleIn(paneEl(E, side));
    if (!c || !art) continue;
    // how far the pane's scroll has carried the held row below where the band sets it
    const shift = c.getBoundingClientRect().top - (art.el.getBoundingClientRect().top - S.band * pitch);
    for (const r of /** @type {NodeListOf<HTMLElement>} */ (c.querySelectorAll(':scope > .hrow'))) {
      const k = Number(r.dataset.row), y = k * pitch - shift;
      if (!k) continue;
      r.style.top = Math.max(0, y) + 'px';
      r.style.visibility = y < 0 ? 'hidden' : '';
    }
    const o = /** @type {HTMLElement | null} */ (c.querySelector(':scope > .opened'));
    if (o) o.style.top = Math.max(pitch, S[side].rows * pitch - shift) + 'px';
  }
}

/**
 * Each pane's origins stated in its column's edge (see the head; FP-31): the
 * signs T-ARTICLE's one rule stands for the runs of other documents'
 * material in its article (`originRunsOf`) a line of which meets the pane's
 * visible height below what its head covers (`edgeSignsFor`) — each origin's
 * statement (the scene-mode variant: lines) beside the run it stood beside
 * while that run is in view, else beside the origin's first run in view, held
 * by the run's identity through the image the article was made from (FP-38):
 * a withheld origin's (`edgeStatementHTML`), a transcluded origin's
 * (`sourceStatementHTML`), its C-33's words read as it is placed (T-LAYER's
 * `carriesC33`, `originKind`); a key no gap holds; a withheld
 * run's others' count, as the pane was set with it — each in the column's
 * edge on the pane's inner side, beside its run's first line in view — a
 * transcluded run's the first line in view a character of it stands on, read
 * from the platform's rects over its stretch in each typed line in turn
 * (`textLineIn`) — at a share of the pane's em never below P-REG's
 * LABEL_MIN_PX, the edge's width wide, the pane's signs stacked by the one
 * hold (P-LABEL's `holdStack`) — at their lines, else below what the head
 * covers, off the signs the article sets in that edge, held inside the
 * article's text. They stand in the pane's content, so they scroll with it,
 * and are placed again as it scrolls (`draw`) and as the claims' kept clause
 * moves (`markKept`); written only where their words or size changed; read in
 * the pane's own reading order after its text, for a pane's text is read
 * where it stands. Nothing where the platform lays out no pane.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 */
function placeStatements(E, S) {
  const kept = LAYER.keptRunsKey();
  for (const side of SIDES) {
    const P = S[side], pane = paneEl(E, side), art = articleIn(pane);
    P.signs = kept;
    /** @type {Map<string, HTMLElement>} */
    const standing = new Map([...pane.querySelectorAll(':scope > .edge-sign')].map((e) => [/** @type {HTMLElement} */ (e).dataset.key || '', /** @type {HTMLElement} */ (e)]));
    if (!art || typeof pane.getBoundingClientRect !== 'function') { for (const e of standing.values()) e.remove(); stood[side].clear(); continue; }
    const pr = pane.getBoundingClientRect(), origin = pr.top + pane.clientTop, vis = { top: origin + clearOf(pane), bottom: origin + pane.clientHeight };
    const px = S.fit.px, lh = LINE_H * px;
    /** @type {Map<import('../text/article.js').RunInView, {rect: DOMRect, y: number}>} each run a line of which meets the pane's visible height, and its first line in view */
    const at = new Map();
    /** @type {Map<import('../text/article.js').RunInView, Block>} each withheld run's block, which its statement is made from */
    const gaps = new Map();
    for (const run of originRunsOf({ blocks: art.made.blocks, origins: P.d.origins })) {
      const [first] = REC.identityIn(art.made.image, run.pos, 1), id = first ? `${run.origin} ${first.prefix}.${first.ordinal}` : `${run.origin} @${run.pos}`;
      if (!run.withheld) {
        const line = textLineIn(art, run, vis, lh);
        if (line) at.set({ run, id, holds: 'edge', count: { n: 0, social: false } }, line);
        continue;
      }
      const e = /** @type {HTMLElement | null} */ (art.el.querySelector(`.run > .withheld[data-pos="${run.pos}"]`));
      const b = art.made.blocks.find((x) => x.pos === run.pos), holds = /** @type {import('../text/article.js').GapHolds | undefined} */ (e ? e.dataset.holds : undefined);
      if (!e || !b || !holds || holds === 'reading') continue;
      const r = e.getBoundingClientRect();
      if (r.bottom <= vis.top || r.top >= vis.bottom) continue;
      const seen = { run, id, holds, count: P.view.countAt(b) };
      at.set(seen, { rect: r, y: r.top >= vis.top ? r.top : r.top + Math.floor((vis.top - r.top) / lh) * lh });
      gaps.set(seen, b);
    }
    const chosen = edgeSignsFor([...at.keys()], stood[side]);
    stood[side] = chosen.beside;
    const size = Math.max(MEASURE.count * px, LABEL_MIN_PX), width = (EDGE - EDGE_GAP) * px;
    /** @type {Array<{el: HTMLElement, kind: 'statement' | 'key' | 'count', pos: number, rect: DOMRect, y: number}>} */
    const placing = [];
    for (const sign of chosen.signs) {
      const x = /** @type {{rect: DOMRect, y: number}} */ (at.get(sign.run)), run = sign.run.run, o = run.origin, b = gaps.get(sign.run);
      const html = sign.kind === 'statement'
        ? (b ? edgeStatementHTML(placeholderOf(b, REC.reader(), LAYER.originOwner, LAYER.clauseOf), LAYER.claimsKeptIn(o), true) : sourceStatementHTML(o, LAYER.carriesC33(P.d, LAYER.originKind(o)), true))
        : sign.kind === 'key' ? edgeKeyHTML(run, true) : edgeCountHTML(sign.run.count);
      if (!html) continue;
      const key = sign.kind === 'statement' ? `${o} statement` : `${run.pos} ${sign.kind}`;
      let el = standing.get(key);
      standing.delete(key);
      if (!el) {
        el = /** @type {HTMLElement} */ (document.createElement('div'));
        el.className = 'edge-sign';
        Object.assign(el.dataset, { key, sign: sign.kind, origin: o });
        pane.appendChild(el);
      }
      if (el.innerHTML !== html) el.innerHTML = html;
      Object.assign(el.style, { fontSize: size + 'px', lineHeight: Math.max(lh, size * LINE_BOX) + 'px', width: width + 'px' });
      el.dataset.pos = String(run.pos);
      placing.push({ el, kind: sign.kind, pos: run.pos, rect: x.rect, y: x.y });
    }
    for (const e of standing.values()) e.remove();
    if (!placing.length) continue;
    placing.sort((p, q) => p.y - q.y || p.pos - q.pos || SIGN_ORDER[p.kind] - SIGN_ORDER[q.kind]);
    const heights = placing.map((p) => p.el.offsetHeight);
    const rows = /** @type {HTMLElement[]} */ ([...art.el.querySelectorAll('.run > *')]), first = rows[0], last = rows[rows.length - 1];
    const fixed = /** @type {HTMLElement[]} */ ([...art.el.querySelectorAll('.edge')]).map((e) => { const q = e.getBoundingClientRect(); return { y: q.top, h: q.height }; });
    const ys = holdStack(placing.map((p, k) => ({ y: p.y, h: heights[k] })), first ? first.getBoundingClientRect().top : origin, vis.top + HOLD.gap, last ? last.getBoundingClientRect().bottom : vis.bottom, SIGN_GAP, fixed);
    const left = pr.left + pane.clientLeft - pane.scrollLeft;
    placing.forEach((p, k) => {
      const x = side === 'a' ? p.rect.right + EDGE_GAP * px : p.rect.left - EDGE_GAP * px - width;
      p.el.style.transform = `translate(${Math.round(x - left)}px, ${Math.round(ys[k] - origin + pane.scrollTop)}px)`;
    });
  }
}

/**
 * The first line of a transcluded run in a pane's visible height (see
 * `placeStatements`): over the stretch of each typed line of it in turn
 * (T-ARTICLE's `textIn`), the first of the platform's rects whose line meets
 * the visible height — its line's top in client px, set on its typed line's
 * own grid of lines, which no drift down a long text moves — with that typed
 * line's box, whose sides are the column's; null where none meets it.
 * @param {{el: HTMLElement, made: import('../text/layer.js').Made}} art the pane's article and what it was made from
 * @param {{pos: number, width: number}} run
 * @param {{top: number, bottom: number}} vis the pane's visible height, client px
 * @param {number} lh a body line box, px
 * @returns {{rect: DOMRect, y: number} | null}
 */
function textLineIn(art, run, vis, lh) {
  for (const b of art.made.blocks) {
    if (b.kind !== 'para' || b.pos + b.width <= run.pos || b.pos >= run.pos + run.width) continue;
    const at = textIn([b], run), el = /** @type {HTMLElement | null} */ (art.el.querySelector(`.run > [data-pos="${b.pos}"]`));
    const range = at && el ? LAYER.rangeIn(art.el, { addr: art.made.addr, pos: at.from, width: at.to - at.from }) : null;
    if (!range || !el) continue;
    const box = el.getBoundingClientRect();
    if (box.bottom <= vis.top) continue;
    if (box.top >= vis.bottom) return null;
    for (const q of range.getClientRects()) {
      if (!q.width && !q.height) continue;
      const y = box.top + Math.floor((q.top - box.top) / lh + 1e-3) * lh;
      if (y >= vis.bottom) return null;
      if (y + lh > vis.top) return { rect: box, y };
    }
  }
  return null;
}

/**
 * How far below a pane's visible top its head covers it, held there (see the
 * head; FP-26): to the foot of its first row — held where the pane's padding
 * leaves it — and of a form opened beneath it, px, as the pane stands — what
 * no act that brings a line to the pane's top leaves that line under; 0 where
 * its corner stands beside its column.
 * @param {HTMLElement} pane
 * @returns {number}
 */
function clearOf(pane) {
  const c = /** @type {HTMLElement | null} */ (pane.querySelector(':scope > .corner.head'));
  if (!c) return 0;
  const o = /** @type {HTMLElement | null} */ (c.querySelector(':scope > .opened'));
  return c.getBoundingClientRect().bottom - (pane.getBoundingClientRect().top + pane.clientTop) + (o ? o.offsetHeight : 0);
}

/** a face arrived once the panes were set (APP's, as a face loads late): the next frame refits the panes and measures their ties again (`draw`, `refit`) */
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
 * Where a pane's cover stands (FP-29): its article's head — a covered
 * document's article holding no more, its corner saying it is withheld
 * (T-ARTICLE's `cornerHTML`) — level with its address, the place that
 * stands: the line every far end crossing into the pane ends at, in px below
 * the pane's content top, so it scrolls with the pane's text; null where the
 * pane holds no article.
 * @param {HTMLElement} pane
 * @returns {{top: number, y: number} | null} the address's top, and its middle
 */
export function coverIn(pane) {
  const art = articleIn(pane);
  const addr = art ? /** @type {HTMLElement | null} */ (art.el.querySelector('.hd .addr')) : null;
  const r = addr ? addr.getBoundingClientRect() : null;
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

/** the index of the block holding a position, of blocks in position order; −1 where none holds it */
function indexIn(/** @type {Block[]} */ blocks, /** @type {number} */ pos) {
  let lo = 0, hi = blocks.length - 1;
  while (lo <= hi) {
    const m = (lo + hi) >> 1, b = blocks[m];
    if (pos < b.pos) hi = m - 1; else if (pos >= b.pos + b.width) lo = m + 1; else return m;
  }
  return -1;
}

/** the pitch of a block's lines as laid out, px: its box's height over the lines it holds — the line box the engine sets, which the computed line height only approaches */
const pitchOf = (/** @type {number} */ h, /** @type {number} */ lb) => h / Math.max(1, Math.round(h / lb));

/**
 * A reader of the boxes a pane's bytes stand in (`Box`; see the head),
 * through the blocks its article was made from and the elements standing for
 * them: a character's line box — the line of its block's box its glyph's
 * middle stands in, through T-LAYER's byte-span mapping, each line the
 * block's pitch tall; a newline after its block's characters, past the one
 * ending their line, the blank line box it makes below them — each newline
 * of a block holding no character one, save the one ending an item's line
 * right before it; a newline ending a line, that line's bottom, none tall; an
 * item's own box. Null where the pane holds no article; `at` null for a byte
 * the article's blocks hold none of, or a character that sets no glyph.
 * @param {HTMLElement} pane
 * @param {string} names the address the pane's article is made as (`Pane.names`)
 * @returns {{at: (pos: number) => Box | null, lb: number} | null} `lb` the article's line box as laid out, px
 */
function boxesIn(pane, names) {
  const art = articleIn(pane);
  if (!art) return null;
  const cs = getComputedStyle(art.el), computed = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * LINE_H;
  const origin = pane.getBoundingClientRect().top + pane.clientTop - pane.scrollTop, blocks = art.made.blocks;
  /** @type {Map<number, HTMLElement>} each block's element, by its first position */
  const parts = new Map();
  for (const e of /** @type {NodeListOf<HTMLElement>} */ (art.el.querySelectorAll('.run > .sp, .run > .withheld'))) parts.set(Number(e.dataset.pos), e);
  /** the article's line box as laid out: the pitch of its first block of characters, else the computed line height */
  let lb = computed;
  for (const b of blocks) {
    const el = b.kind === 'para' && b.text ? parts.get(b.pos) : undefined, h = el ? el.getBoundingClientRect().height : 0;
    if (h > 0) { lb = pitchOf(h, computed); break; }
  }
  /** @type {(pos: number) => Box | null} */
  const at = (pos) => {
    const i = indexIn(blocks, pos), b = i < 0 ? null : blocks[i], el = b ? parts.get(b.pos) : undefined;
    if (!b || !el) return null;
    const q = el.getBoundingClientRect(), top = q.top - origin, bottom = q.bottom - origin;
    if (b.kind !== 'para') return { top, bottom };
    const offs = byteOffsets(b.text), off = pos - b.pos, n = offs[offs.length - 1], pitch = bottom > top ? pitchOf(bottom - top, computed) : lb;
    if (off < n) {
      let lo = 0, hi = offs.length - 2;
      while (lo < hi) { const m = (lo + hi + 1) >> 1; if (offs[m] <= off) lo = m; else hi = m - 1; }
      const range = LAYER.rangeIn(art.el, { addr: names, pos: b.pos + offs[lo], width: offs[lo + 1] - offs[lo] });
      const r = range ? [...range.getClientRects()].find((x) => x.height > 0) : null;
      if (!r) return null;
      const line = Math.max(0, Math.floor((r.top + r.height / 2 - origin - top) / pitch));
      return { top: top + line * pitch, bottom: top + (line + 1) * pitch };
    }
    const k = off - n;
    if (b.text) return k === 0 ? { top: bottom, bottom } : { top: bottom + (k - 1) * pitch, bottom: bottom + k * pitch };
    const prev = i > 0 ? blocks[i - 1] : null, ends = prev && prev.kind !== 'para' && prev.pos + prev.width === b.pos ? 1 : 0;
    return k < ends ? { top, bottom: top } : { top: top + (k - ends) * lb, bottom: top + (k - ends + 1) * lb };
  };
  return { at, lb };
}

/**
 * A stroke's key (see the head): the permanent address of the byte before
 * its first change — the last of the run it follows, the same on both sides —
 * through the image pane A's article was made from; where that image does
 * not cover it, the change's positions on each side.
 * @param {Stroke} s
 * @param {import('../model/records.js').ImageRun[]} image pane A's article's
 * @returns {string}
 */
function strokeKey(s, image) {
  const c = s.changes[0], at = REC.identityIn(image, c.a.from - 1, 1)[0];
  return at ? `${at.prefix}.${at.ordinal}` : `${c.a.from}-${c.b.from}`;
}

/**
 * Measure the ties: each run of shared identity as a band at its extent and
 * the strokes where runs consecutive in both documents meet on both sides
 * (`banded`, each run's first and last bytes' boxes read by `boxesIn`), each
 * stroke keyed (`strokeKey`), a run a byte of which none of its pane's
 * blocks holds left out; and each link between the two documents once per
 * pair of its ends (`linesBetween`), its ends at their passages' first lines
 * in the panes' content, or at a pane's cover, a line an end of which lies
 * in none of its pane's blocks left out — every one from what the panes were
 * set with, never the model's now. Where the scene is whole, the passages
 * the stop reaches with them: the near passage's `counterparts` in pane B, in
 * pane B's order, each at its first line there, the stop's next passage the
 * first again where it names one no more.
 */
function measure() {
  const S = scene, E = els;
  if (!S || !E) return;
  const t0 = performance.now();
  const ra = boxesIn(E.paneA, S.a.names), rb = boxesIn(E.paneB, S.b.names);
  /** @type {Measured[]} */
  const runs = [];
  if (ra && rb) {
    for (const p of S.pairs) {
      const fa = ra.at(p.u1), la = ra.at(p.u1 + p.width - 1), fb = rb.at(p.u2), lb = rb.at(p.u2 + p.width - 1);
      if (fa && la && fb && lb) runs.push({ run: p, a: { first: fa, last: la }, b: { first: fb, last: lb } });
    }
  }
  const drawn = banded(runs, { a: ra ? ra.lb : 0, b: rb ? rb.lb : 0 });
  const made = S.a.el ? LAYER.madeOf(S.a.el) : null, image = made ? made.image : [];
  /** @type {Map<string, number>} the strokes keyed so far, by key: a key met again takes the count after it */
  const seen = new Map();
  for (const s of drawn.strokes) {
    const key = strokeKey(s, image), n = seen.get(key) || 0;
    seen.set(key, n + 1);
    s.key = n ? `${key}~${n}` : key;
  }
  S.bands = drawn.bands;
  S.strokes = drawn.strokes;
  lastMeasure = { runs: S.pairs.length, bands: drawn.bands.length, strokes: drawn.strokes.length, ms: performance.now() - t0 };
  /** @type {Tie[]} */
  const lines = [];
  // the link lines between the panes — the set LK gave at each pane's document as it was set (the seam)
  for (const l of linesBetween(linksOf(S.a), linksOf(S.b))) {
    const la = endIn(E.paneA, S.a.names, l.a), lb = endIn(E.paneB, S.b.names, l.b);
    if (la && lb) lines.push({ link: l.link, a: { ...l.a, y: la.y }, b: { ...l.b, y: lb.y }, ink: l.ink, marks: l.marks, value: l.value });
  }
  S.lines = lines;
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
 * on; a stroke's list standing checked again (`recheckList`). Every article
 * is made at the scene's fit, its corner in the fit's form, and the fit set on
 * the panes (`applyFit`) before anything is carried, a place's line that
 * stood in view carried below what a held head covers (`clearOf`). A pane
 * taken down to its cover at a change of the page's class carries nothing
 * into the text it takes: its reader's place is kept for the read at the new
 * class that sets it again. A pane set again at a new fit alone (`refit`)
 * keeps its text, its lines broken anew: its place is its first line in view
 * (`firstLineIn`), no `compare` read against it is outdated by it, and a
 * place kept for such a read stays kept.
 * @param {Scene} S
 * @param {Array<{side: 'a' | 'b', next: Next, down?: boolean, same?: boolean}>} sets `down` the pane taken down to its cover at a change of the page's class; `same` the pane set again at a new fit, its text the one it shows
 * @param {ComparePair[] | null} pairs the runs of shared identity between the panes now; null where they stand as they were
 */
function setPanes(S, sets, pairs) {
  const E = els;
  if (!E) return;
  const set = new Set(sets.map((x) => x.side));
  const carried = sets.map(({ side, next, down, same }) => {
    const P = S[side], made = P.el ? LAYER.madeOf(P.el) : null, image = made ? made.image : [], pane = paneEl(E, side);
    const here = placeAt(P, next.hold ? next.hold.from : same ? firstLineIn(P, pane) : firstInView(pane));
    if (down) { P.place = P.place || here; return { side, next, same, place: null, sel: null, level: null }; }
    const place = same ? here : P.place || here;
    if (!same) P.place = null;
    const sel = P.el ? LAYER.selectionIn(P.el) : null, lv = S.level[side];
    return {
      side, next, same, place,
      sel: sel ? { ids: REC.identityIn(image, sel.span.pos, sel.span.width), backward: sel.backward } : null,
      level: lv != null ? { pos: lv, ids: REC.identityIn(image, lv, 1) } : null,
    };
  });
  for (const { side, next, same } of carried) {
    const P = S[side], view = { ...(next.view ?? LAYER.sceneView(next.d)), cpl: S.fit.cpl };
    Object.assign(P, { d: { ...next.d }, view, kind: next.kind, src: next.src, names: next.names, shows: next.shows, k: next.k, n: next.n, read: next.read, lacks: next.lacks });
    if (!same) P.sets++;
    swap(E, P);
    writeCorner(E, P);
    nameBar(E, P);
  }
  namePanes(E, S);
  applyFit(E, S);
  roomBelow(E);
  for (const { side, next, place, sel, level } of carried) {
    const P = S[side], pane = paneEl(E, side), image = P.d.image;
    /** where a carried byte stands in the text taken: by its identity, the corner's act's passage at the position it names, else where it stood */
    const there = (/** @type {{pos: number, ids: ISpan[]}} */ x) => {
      if (next.hold && x.pos === next.hold.from) return next.hold.to;
      const at = REC.placedIn(image, x.ids);
      return at.length ? at[0].pos : x.pos;
    };
    // a line that stood in view stays in view, below what a held head covers
    if (place) { const line = lineAt(pane, P.names, there(place)); if (line) pane.scrollTop = line.top - (place.at >= 0 ? Math.max(place.at, clearOf(pane)) : place.at); }
    if (sel && P.el) {
      const at = REC.placedIn(image, sel.ids), z = at[at.length - 1];
      if (z) LAYER.selectIn(P.el, { addr: P.names, pos: at[0].pos, width: z.pos + z.width - at[0].pos }, sel.backward);
    }
    if (level) S.level[side] = there(level);
  }
  if (pairs) S.pairs = pairs;
  for (const side of SIDES) {
    const P = S[side], Q = S[otherSide(side)];
    const now = placedInto(P, [...Q.view.marks, ...P.view.marks]);
    P.placed = set.has(side) ? now : new Map([...P.placed, ...now]);
  }
  measure();
  draw();
  recheckList(S);
}

/**
 * An act on the panes made while one is being set again waits for it, as
 * does a pane's check against owner facts taken anew (`dropped`; see the
 * head; FP-23): run now where no setting reads, else once the last lands, in
 * the order they were made. Ending the scene never waits.
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
 * they are — and a stop the reader returned to answered by that `compare`
 * (`answer`). A newer member found where a row naming it was not seen pins an
 * edition at its bare address instead (`pin`). A setting the board's events
 * asked (`Pane.kept`) is made from its reads' answers alone: where its whole
 * read met a refusal that says nothing of the document, the pane keeps what
 * it shows, kept, saying why; where the board did not answer one of its reads
 * — its text, its chain, its owner's byline facts, the `compare`, a far end's
 * projection — it sets nothing and is asked again once M-PUMP's pause ends
 * (`afterPause`), where the scene still stands and no later setting was asked
 * of the pane, holding none of the panes' acts meanwhile. A version the
 * corner's act could not read whole leaves the pane as it shows.
 * @param {'a' | 'b'} side
 * @param {{src?: string, carry?: {pos: number, width: number} | null, read?: number | null, at?: number}} [how] `src` the version the corner's act reads — the pane's own record where none is given; `carry` the passage it carries; `read` the version the corner offers after it, the one it left; `at` the page's clock at the row or drop that left the pane behind, which a setting the board's events ask stands kept from (`Pane.kept`) — absent, the moment it is asked
 * @returns {Promise<void>}
 */
async function update(side, how = {}) {
  const S = scene;
  if (!S) return;
  const P = S[side], Q = S[otherSide(side)], serial = ++P.serial;
  // a derived record is the page's, not the board's: no read sets it again (see the head)
  if (P.d.derived) return;
  const stale = () => scene !== S || P.serial !== serial;
  // the board's events ask it: the pane stands kept as it shows until a setting of it lands, saying so once it has stood a second
  if (!how.src && !P.kept) { P.kept = { since: performance.now(), at: how.at ?? Date.now(), met: null }; setTimeout(markDirty, PUMP.KEPT_MS); }
  /** the setting the board's events asked left unset by the refusal its reads met: the pane kept as it shows, saying why, and asked again once M-PUMP's pause ends where the board did not answer */
  const unset = (/** @type {Refusal | null} */ met) => {
    if (!P.kept || !met) return;
    P.kept.met = met;
    markDirty();
    if (PUMP.unanswered(met)) void PUMP.afterPause().then(() => { if (!stale()) void update(side); });
  };
  S.updating++;
  try {
    const src = how.src ?? P.src;
    const r = await readPane(src), d = r.d;
    if (stale()) return;
    // a setting the board's events asked is made from its reads' answers alone
    if (!how.src && (!d || r.unheard)) { unset(r.unheard || r.refused); return; }
    // a version the corner's act could not read whole leaves the pane as it shows
    if (!d || (how.src && !r.whole)) return;
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
      const mine = { src, d, shown: LK.shown(src, d) }, theirs = { src: Q.src, d: Q.d, shown: Q.view.marks };
      const between = await readBetween(side === 'a' ? mine : theirs, side === 'a' ? theirs : mine);
      if (stale()) return;
      if (Q.sets !== seen) continue;
      if (!how.src && between.unheard) { unset(between.unheard); return; }
      const read = how.read !== undefined ? how.read : P.read;
      // set from its reads: kept no more, from the step that sets it — a setting the board's events asked saying whether it changed what the pane shows
      if (!how.src && P.kept) P.lift = { since: P.kept.at, outcome: REC.shownBy(P.d) === REC.shownBy(d) ? 'unchanged' : 'changed' };
      P.kept = null;
      setPanes(S, [{ side, next: { d, kind, src, names, shows: kind === 'bare' ? src : names, k, n, read, lacks, hold } }], between.pairs);
      answer(S, between);
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
 * @param {number} [at] the page's clock at the row or drop that named the newer member (`update`)
 */
function pin(S, side, k, m, at) {
  const P = S[side], names = versionAddress(boxOf(P.src), k), n = Math.max(m, P.n ?? 0);
  setPanes(S, [{ side, next: { d: P.d, view: P.view, kind: 'pinned', src: names, names, shows: names, k, n, read: n, lacks: null, hold: null } }], null);
  FOCUS.say(t('F.arrival.pane', { k }));
  void update(side, { at });
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
  rebanded(E, S);
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
 * pane set again at once from what the change left of its record (M-REC's
 * `dropClass`), no band standing — one whose text was read as published
 * standing on that text, its runs from drafts covered, the reader's place
 * and the selection carried into it; one the change dropped or covered taken
 * down to its cover — and read again at the class the page reads at then; a
 * refresh reaching every pane (`refreshed`); a row naming a newer member
 * pinning an edition at its bare address at once, or counting a version's
 * chain again; any other row reaching a pane's text, and a clause decided
 * anew at an origin its text windows, reading it again in its place; owner
 * facts taken anew (M-PUMP's `bylineTaken`) reaching each pane on a document
 * the owner holds once no setting reads (`whenSet`) — so a setting out, a
 * corner's act's among them, lands as asked, with them — and reading it again
 * in its place where its byline was made with other facts (`Pane.facts`),
 * nothing else of it touched.
 * @param {Dropped} x
 */
export function dropped(x) {
  const S = scene;
  if (!S) return;
  if (!x.addrs) {
    setPanes(S, SIDES.map((side) => {
      const P = S[side], d = REC.doc(P.src);
      return { side, down: d.from < 0 || !!d.refused, next: { d, kind: P.kind, src: P.src, names: P.names, shows: P.shows, k: P.k, n: P.n, read: P.read, lacks: P.lacks, hold: null } };
    }), []);
    for (const side of SIDES) void update(side, { at: x.at });
    return;
  }
  if (x.chains) { for (const side of SIDES) refreshed(S, side, x.chains, x.at); return; }
  if (x.byline) {
    for (const side of SIDES) {
      if (!x.addrs.some((a) => oneBox(a, S[side].src))) continue;
      whenSet(() => {
        const P = S[side], E = els;
        if (scene !== S || REC.sameFacts(P.facts, ownerFacts(P))) return;
        // a derived pane's byline made again from the facts now, its text as it stands; a read pane's set again from its reads
        if (P.d.derived) { if (E) swap(E, P); } else void update(side, { at: x.at });
      });
    }
    return;
  }
  for (const side of SIDES) {
    const P = S[side];
    if (P.d.derived || !x.addrs.some((a) => oneBox(a, P.src))) continue;
    const m = newest(x.row, P.src);
    if (P.kind === 'bare' && m != null && m > (P.k ?? 0)) { const k = P.k ?? m - 1; if (k >= 1) pin(S, side, k, m, x.at); else void update(side, { at: x.at }); continue; }
    if (P.kind === 'pinned') { if (m != null) count(S, side, m); if (x.addrs.includes(P.src)) void update(side, { at: x.at }); continue; }
    void update(side, { at: x.at });
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
 * @param {number} at the page's clock at the drop or the row that left the board behind (M-PUMP's `Dropped.at`)
 */
function refreshed(S, side, chains, at) {
  const P = S[side], c = chains.get(boxOf(P.src));
  if (P.d.derived) return;
  if (P.kind === 'bare') {
    if (P.k == null) return;
    if (c && P.k >= 1 && c.n > P.k) { pin(S, side, P.k, c.n, at); return; }
  }
  if (P.kind === 'pinned' && c) count(S, side, c.n);
  void update(side, { at });
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
  actedIn(scene);
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
  actedIn(scene);
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

/**
 * A pane's compact corner opened whole where it stands, on its act — a click
 * on a glyph or on a head's count, or Enter at the corner where it offers no
 * act of its own (`key`) — and closed again by the same act at the corner
 * opened (FP-26): beside its column, its items whole over what stands beside
 * it, its room the compact one, so nothing beside it moves (the style's); at
 * its document's head, every item whole beneath its rows. An act in the scene
 * (`actedIn`).
 * @param {'a' | 'b'} side
 */
function openWhole(side) {
  const S = scene, E = els;
  if (!S || !E) return;
  actedIn(S);
  S[side].open = !S[side].open;
  writeCorner(E, S[side]);
  draw();
}

/** set the two ends level — each pane's matched line at one height, the bands' and lines' ends measured anew — once no pane is being set again (`whenSet`); an act in the scene (`actedIn`) */
export function relevel() { actedIn(scene); whenSet(level); }

/** the two ends set level now (`relevel`), the stop's next act going to its first passage again, none gone to */
function level() {
  const S = scene, E = els;
  if (!S || !E) return;
  S.next = 0;
  S.stepped = null;
  roomBelow(E);
  const la = S.level.a != null ? lineIn(E.paneA, S.a.names, S.level.a, restIn(S.a.d.blocks, S.level.a)) : null;
  const lb = S.level.b != null ? lineIn(E.paneB, S.b.names, S.level.b, restIn(S.b.d.blocks, S.level.b)) : null;
  // a pane scrolls a line up its pane, never below where it stands unscrolled: the two meet at LEVEL_AT, or higher where one
  // stands above it, and never under what a held head covers
  const at = Math.max(Math.min(LEVEL_AT, la ? la.top : Infinity, lb ? lb.top : Infinity), clearOf(E.paneA), clearOf(E.paneB));
  E.paneA.scrollTop = la ? la.top - at : 0;
  E.paneB.scrollTop = lb ? lb.top - at : 0;
  measure();
  draw();
}

/**
 * Draw the bands, the strokes and the lines on the scene's canvas at the
 * panes' scrolls now — the panes fitted again first where their size changed
 * since the ties were measured (`refit`): each band at its extent
 * (`drawBand`), held inside each
 * pane's visible height; each stroke whose two heights stand in their panes'
 * visible heights (`drawStroke`); each line's end where its passage's line
 * stands — a whole document's at its pane's facing edge, level with the
 * line's other end — then each facing edge whole-document ends meet
 * (`wholeEdges`, `drawEdge`); the strokes' buttons and the stop placed
 * (`placeStrokes`, `placeStop`) — a stop the reader returned to standing
 * until it is answered and they have moved on from it, then under the
 * scene's own rules — the heads' later rows placed at the panes' scrolls
 * (`placeHeads`), and each pane's withheld origins stated in its column's edge
 * (`placeStatements`).
 */
export function draw() {
  const S = scene, E = els;
  if (!S || !E) return;
  if (S.returned && S.returned.answer && movedOn(S.returned)) S.returned = null;
  if (sizeOf(E) !== S.size && refit(E, S)) return;
  const cv = E.canvas, ctx = cv.getContext('2d'); if (!ctx) return;
  const c = cv.getBoundingClientRect();
  const DPR = Math.min(2, (typeof window !== 'undefined' && window.devicePixelRatio) || 1);
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
  /** a band's end on the canvas: its extent held inside its pane's visible height, and whether it passes the visible top or bottom */
  const span = (/** @type {ReturnType<typeof frame>} */ f, /** @type {BandEnd} */ e) => {
    const top = f.origin + e.top, bottom = f.origin + e.bottom, hold = (/** @type {number} */ y) => Math.max(f.top, Math.min(f.bottom, y));
    return { top: hold(top), bottom: hold(bottom), above: top < f.top, below: bottom > f.bottom };
  };
  const fa = frame(E.paneA), fb = frame(E.paneB), x0 = fa.x1, x1 = fb.x0;
  /** @type {Drawn[]} */
  const out = [];
  /** a band's end on screen */
  const bandOnScreen = (/** @type {ReturnType<typeof span>} */ e, /** @type {number} */ x, /** @type {BandEnd} */ end) => ({ pos: end.pos, width: end.width, x: x + c.left, top: e.top + c.top, bottom: e.bottom + c.top, above: e.above, below: e.below, clipped: e.above || e.below });
  ctx.globalAlpha = 1;
  for (const band of S.bands) {
    const ea = span(fa, band.a), eb = span(fb, band.b);
    drawBand(ctx, { x: x0, ...ea }, { x: x1, ...eb });
    out.push({ kind: 'band', link: null, a: bandOnScreen(ea, x0, band.a), b: bandOnScreen(eb, x1, band.b) });
  }
  /** @type {StrokeDrawn[]} */
  const struck = [];
  for (const s of S.strokes) {
    const a = { x: x0, y: fa.origin + s.a }, b = { x: x1, y: fb.origin + s.b };
    if (!s.key || a.y < fa.top || a.y > fa.bottom || b.y < fb.top || b.y > fb.bottom) continue;
    drawStroke(ctx, a, b, s);
    const p = pointOn(strokeOf(a, b), s.halfA && s.halfB ? GAP_MIDDLE : s.halfA ? GAP_MIDDLE / 2 : (1 + GAP_MIDDLE) / 2);
    struck.push({ key: s.key, a: { x: a.x + c.left, y: a.y + c.top }, b: { x: b.x + c.left, y: b.y + c.top }, halfA: s.halfA, halfB: s.halfB, changes: s.changes, at: { x: p.x + c.left, y: p.y + c.top } });
  }
  for (const tie of S.lines) {
    const ta = tie.a.whole ? null : at(fa, tie.a), tb = tie.b.whole ? null : at(fb, tie.b);
    const ea = ta || meet(fa, tb), eb = tb || meet(fb, ta);
    ctx.globalAlpha = tie.value; ctx.lineWidth = 1.6;
    drawTie(ctx, { x: x0, ...ea }, { x: x1, ...eb }, tie.ink);
    out.push({
      kind: 'link', link: tie.link,
      a: { pos: tie.a.pos, width: tie.a.width, x: x0 + c.left, y: ea.y + c.top, clipped: ea.clipped, cover: !!tie.a.cover, whole: !!tie.a.whole },
      b: { pos: tie.b.pos, width: tie.b.width, x: x1 + c.left, y: eb.y + c.top, clipped: eb.clipped, cover: !!tie.b.cover, whole: !!tie.b.whole },
    });
  }
  /** @type {Edge[]} */
  const edged = [];
  for (const e of wholeEdges(S.lines)) {
    const f = e.side === 'a' ? fa : fb, x = e.side === 'a' ? x0 + EDGE_W / 2 : x1 - EDGE_W / 2, ink = inkOf(e.mark);
    ctx.globalAlpha = e.mark.value; ctx.lineWidth = EDGE_W;
    drawEdge(ctx, x, f.top, f.bottom, ink);
    edged.push({ side: e.side, links: e.links, x: x + c.left, top: f.top + c.top, bottom: f.bottom + c.top, hue: ink.hue, dashed: ink.dash.length > 0 });
  }
  ctx.globalAlpha = 1;
  drawnTies = out;
  drawnEdges = edged;
  drawnStrokes = struck;
  placeStrokes(E, S);
  placeStop(E, S);
  placeHeads(E, S);
  placeStatements(E, S);
}

/**
 * Draw one band between the panes (`draw`; see the head): its ground — the
 * region between BM's curve joining its two ends' tops and the one joining
 * their bottoms — in sameness's texture, and those two curves its edges in
 * sameness's boundary, BAND_EDGE_W px, one where it stands no taller than a
 * line at either end (P-REG); where an end passes its pane's visible top or
 * bottom, the stub's triangle at that edge, on that side, pointing the way it
 * passes.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x: number, top: number, bottom: number, above: boolean, below: boolean}} a its end at pane A's inner edge, on the canvas, held inside the pane's visible height
 * @param {{x: number, top: number, bottom: number, above: boolean, below: boolean}} b its end at pane B's
 */
export function drawBand(ctx, a, b) {
  const top = strokeOf({ x: a.x, y: a.top }, { x: b.x, y: b.top }), bottom = strokeOf({ x: a.x, y: a.bottom }, { x: b.x, y: b.bottom });
  ctx.beginPath();
  ctx.moveTo(top[0].x, top[0].y);
  ctx.bezierCurveTo(top[1].x, top[1].y, top[2].x, top[2].y, top[3].x, top[3].y);
  ctx.lineTo(bottom[3].x, bottom[3].y);
  ctx.bezierCurveTo(bottom[2].x, bottom[2].y, bottom[1].x, bottom[1].y, bottom[0].x, bottom[0].y);
  ctx.closePath();
  ctx.fillStyle = SAMENESS.texture;
  ctx.fill();
  ctx.lineWidth = BAND_EDGE_W;
  strokeIn(ctx, top, BAND_INK, BAND_INK, null);
  if (a.bottom !== a.top || b.bottom !== b.top) strokeIn(ctx, bottom, BAND_INK, BAND_INK, null);
  for (const [e, x] of /** @type {Array<[typeof a, number]>} */ ([[a, a.x + 6], [b, b.x - 6]])) {
    if (e.above) stub(ctx, x, e.top, -1, BAND_INK.hue);
    if (e.below) stub(ctx, x, e.bottom, 1, BAND_INK.hue);
  }
}

/**
 * Draw one stroke between the panes (`draw`; see the head): the bands'
 * shared edge — BM's curve joining its two heights — cut at the gutter's
 * middle, each half beside a pane holding bytes between the runs drawn in
 * sameness's boundary, STROKE_W px, and a half beside a pane holding none
 * not at all.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x: number, y: number}} a its end at pane A's inner edge, on the canvas
 * @param {{x: number, y: number}} b its end at pane B's
 * @param {{halfA: boolean, halfB: boolean}} halves
 */
export function drawStroke(ctx, a, b, halves) {
  const [left, right] = cutAt(strokeOf(a, b), GAP_MIDDLE);
  ctx.lineWidth = STROKE_W;
  if (halves.halfA) strokeIn(ctx, left, BAND_INK, BAND_INK, null);
  if (halves.halfB) strokeIn(ctx, right, BAND_INK, BAND_INK, null);
}

/** a stroke's button standing in the gutter, by the stroke's key; null where none stands */
const buttonOf = (/** @type {NonNullable<typeof els>} */ E, /** @type {string} */ key) => /** @type {HTMLElement | null} */ ([...E.strokes.children].find((b) => /** @type {HTMLElement} */ (b).dataset.stroke === key) || null);

/** @typedef {{shows: string, made: import('../text/article.js').Copied | null}} Side a pane as a change's words read it: the address it shows, and what its article was made from (T-LAYER's `madeOf`) */

/** each pane as a change's words read it (`Side`): the text it was set with */
const sidesOf = (/** @type {Scene} */ S) => SIDES.map((side) => ({ shows: S[side].shows, made: S[side].el ? LAYER.madeOf(S[side].el) : null }));

/**
 * A change's words (see the head): what each pane holds there — each pane
 * named by the address it shows, its characters, read from what its article
 * was made from by T-ARTICLE's item rule (`copyText`) — white space kept, an
 * item by its stand-in — quoted (`L.scene.change.text`), or, where it holds
 * no bytes there, nothing (`L.scene.change.none`). As markup where `html`,
 * the characters set in their own class (`chars`), every address in the
 * rest in the identifier's face.
 * @param {Change} c
 * @param {Side} A pane A
 * @param {Side} B pane B
 * @param {(doc: string) => string} ownerOf the owner account of a document, by the one owner rule (T-LAYER's `originOwner`)
 * @param {boolean} [html]
 * @returns {string}
 */
export function changeWords(c, A, B, ownerOf, html = false) {
  /** the characters a side holds over a change's positions there; none where it holds no bytes */
  const chars = (/** @type {Side} */ P, /** @type {{from: number, to: number}} */ r) => (P.made && r.to > r.from ? copyText(P.made, { addr: P.made.addr, pos: r.from, width: r.to - r.from }, ownerOf) : '');
  const ta = chars(A, c.a), tb = chars(B, c.b);
  const vals = { a: A.shows, one: ta ? t('L.scene.change.text', { text: ta }) : t('L.scene.change.none'), b: B.shows, other: tb ? t('L.scene.change.text', { text: tb }) : t('L.scene.change.none') };
  if (!html) return t('L.scene.change', vals);
  /** @type {Record<string, string>} */
  const wrap = {};
  if (ta) wrap.one = 'chars';
  if (tb) wrap.other = 'chars';
  return tHTML('L.scene.change', vals, wrap);
}

/** what a stroke stands for, counted (see the head) */
const countOf = (/** @type {Stroke} */ s) => t(s.changes.length > 1 ? 'L.scene.stroke' : 'L.scene.stroke.1', { n: s.changes.length });

/**
 * A stroke's name's words (see the head; `L.scene.stroke.name`): what it
 * stands for counted, then each change in words (`changeWords`), in the
 * documents' order.
 * @param {Stroke} s
 * @param {Side} A pane A
 * @param {Side} B pane B
 * @param {(doc: string) => string} ownerOf
 * @returns {{count: string, changes: string}}
 */
export const strokeWords = (s, A, B, ownerOf) => ({ count: countOf(s), changes: s.changes.map((c) => changeWords(c, A, B, ownerOf)).join(' · ') });

/**
 * The strokes' buttons placed at the panes' scrolls now (see the head): one
 * native button for each stroke the last draw drew, in the gutter centred on
 * its point, keyed by the stroke, named by what it stands for, its count
 * shown where it stands for two changes or more; each made as its stroke
 * comes into view and taken down as it leaves, the rest moved in place so a
 * focus standing on one stays, and those in view in the order they stand,
 * top to bottom, which is the documents' order. One taken down while it held
 * the focus hands it to pane B (FP-20). A returned stroke's button stands
 * whatever the draw drew, named as its answer tells until all of it holds
 * (`nameReturned`), placed at its stroke where the draw drew it, else where
 * what it stood for stands (`placeReturned`).
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 */
function placeStrokes(E, S) {
  const box = E.strokes, held = typeof document !== 'undefined' ? document.activeElement : null;
  const R = S.returned && S.returned.stop.kind === 'stroke' ? S.returned : null;
  const want = new Set(drawnStrokes.map((d) => d.key));
  for (const b of /** @type {HTMLElement[]} */ ([...box.children])) {
    if (want.has(b.dataset.stroke || '') || (R && b === R.el)) continue;
    b.remove();
    if (b === held) FOCUS.land(E.paneB, {});
  }
  const root = E.root.getBoundingClientRect(), [A, B] = sidesOf(S);
  /** @type {Element | null} the button standing after the last placed, before which one coming into view is set */
  let next = box.firstElementChild, placed = false;
  for (const d of drawnStrokes) {
    const s = S.strokes.find((x) => x.key === d.key);
    if (!s) continue;
    let btn = buttonOf(E, d.key);
    if (btn) next = btn.nextElementSibling;
    else {
      btn = document.createElement('button');
      btn.setAttribute('type', 'button');
      btn.id = 'scenestroke-' + d.key;
      btn.dataset.stroke = d.key;
      box.insertBefore(btn, next);
    }
    const mine = !!R && btn === R.el;
    placed = placed || mine;
    if (!mine || (R && R.answer && R.answer.holds === 'all')) {
      const words = strokeWords(s, A, B, LAYER.originOwner);
      if (btn.getAttribute('aria-label') !== t('L.scene.stroke.name', words)) btn.setAttribute('aria-label', t('L.scene.stroke.name', words));
      const n = s.changes.length > 1 ? String(s.changes.length) : '';
      if (btn.textContent !== n) btn.innerHTML = n ? `<span class="n">${esc(n)}</span>` : '';
    }
    btn.style.left = d.at.x - root.left - E.root.clientLeft + 'px';
    btn.style.top = d.at.y - root.top - E.root.clientTop + 'px';
  }
  if (R && !placed) placeReturned(E, S, R);
}

/**
 * A stroke's act (see the head), its button pressed: its changes shown
 * whole in a list at the button (`showChanges`), taking the focus where a
 * key pressed it; a returned stroke's, its own (`returnedAct`) — any other an
 * act in the scene, moving the reader on from a stop they returned to.
 * @param {string} key the stroke's
 * @param {boolean} byKey
 */
function strokeAct(key, byKey) {
  const S = scene, R = S ? S.returned : null;
  if (S && R && R.stop.kind === 'stroke' && R.stop.key === key) { returnedAct(S, R, byKey); return; }
  actedIn(S);
  const E = els, s = S ? S.strokes.find((x) => x.key === key) : undefined, btn = E ? buttonOf(E, key) : null;
  if (!S || !s || !btn) return;
  showChanges(S, key, countOf(s), rowsOf(S, s), btn, byKey);
}

/** a stroke's list's rows (see the head): each change in words as markup (`changeWords`), read from the text the panes were set with */
function rowsOf(/** @type {Scene} */ S, /** @type {Stroke} */ s) {
  const [A, B] = sidesOf(S);
  return s.changes.map((c) => changeWords(c, A, B, LAYER.originOwner, true));
}

/**
 * A stroke's list, shown at its button or drawn again in its place (see the
 * head; O-HOST's): its caption what it stands for counted, a row for each
 * change in words, the rows the focus steps through, and, where `gone`, the
 * line saying the stroke is drawn no more; where the button has left the
 * page, at the point it stood beneath. Taking the focus on its first row
 * where a key opened it; its end lets the scene forget it.
 * @param {Scene} S
 * @param {string} key the stroke's
 * @param {string} caption
 * @param {string[]} rows each row's markup
 * @param {HTMLElement | null} btn the stroke's button; null where it stands no more
 * @param {boolean} byKey
 * @param {{redraw?: boolean, gone?: boolean}} [how] `redraw` the list standing drawn again in its place, by no act; `gone` no stroke stands at its bytes now
 */
function showChanges(S, key, caption, rows, btn, byKey, how = {}) {
  const id = 'stroke:' + key, r = btn ? btn.getBoundingClientRect() : null;
  const anchor = btn && r ? { el: btn, screen: { x: r.left, y: r.bottom + 4 } } : how.redraw && HOST.currentIs(id) ? (/** @type {import('../overlays/host.js').Overlay} */ (HOST.current())).anchor : null;
  const html = `<span class="label">${esc(caption)}</span><ul class="rows changes">${rows.map((row) => `<li tabindex="0">${row}</li>`).join('')}</ul>` +
    (how.gone ? `<span class="note" data-string="L.scene.stroke.gone">${esc(t('L.scene.stroke.gone'))}</span>` : '');
  S.listing = { key, caption, rows };
  /** @type {import('../overlays/host.js').Overlay} */
  const o = { kind: 'list', id, anchor, html, takeFocus: byKey, onDismiss: () => { if (S.listing && S.listing.key === key) S.listing = null; } };
  if (how.redraw) { if (!HOST.redraw(o)) S.listing = null; } else HOST.show(o);
}

/**
 * A stroke's list standing, checked again once the panes are set again (see
 * the head; FP-36): drawn again from the stroke now standing at the same
 * bytes — its key — or, where none stands, as it was, saying so.
 * @param {Scene} S
 */
function recheckList(S) {
  const l = S.listing, E = els;
  if (!l || !E) return;
  if (!HOST.currentIs('stroke:' + l.key)) { S.listing = null; return; }
  const s = S.strokes.find((x) => x.key === l.key);
  if (s) showChanges(S, l.key, countOf(s), rowsOf(S, s), buttonOf(E, l.key), false, { redraw: true });
  else showChanges(S, l.key, l.caption, l.rows, buttonOf(E, l.key), false, { redraw: true, gone: true });
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
 * appearance in the scene said in the status region (FP-36); hidden where
 * every one stands in view, the focus it held handed to pane B (FP-20). A
 * returned stop stands where what it stood for stands (`placeReturned`),
 * named as its answer tells, never hidden.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 */
function placeStop(E, S) {
  if (S.returned && S.returned.stop.kind === 'shared') { placeReturned(E, S, S.returned); return; }
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
 * that line stands in pane A's view, else LEVEL_AT px below the pane's top —
 * never under what pane B's held head covers (`clearOf`); the next act going
 * to the passage after it, round again, the passage gone to kept by its
 * bytes' identity. Nothing else moves.
 */
function toShared() {
  const S = scene, E = els;
  const p = S && S.at != null ? S.shared[S.at] : null;
  if (!S || !E || !p || S.at == null) return;
  const la = S.level.a != null ? lineIn(E.paneA, S.a.names, S.level.a, S.widthA) : null;
  const seen = la ? la.y - E.paneA.scrollTop : -1;
  E.paneB.scrollTop = p.top - Math.max(la && seen >= 0 && seen <= E.paneA.clientHeight ? la.top - E.paneA.scrollTop : LEVEL_AT, clearOf(E.paneB));
  S.next = (S.at + 1) % S.shared.length;
  S.stepped = idsIn(S.b, p.pos, p.width);
  draw();
}

/** where along a line's stroke its ends' inks meet, and where a stroke between bands is cut into its halves: the half of its parameter, where BM's curve between the panes' inner edges stands at the middle of the gap (`strokeOf`) */
const GAP_MIDDLE = 0.5;

/**
 * Draw one link's line between the panes (`draw`), its width and alpha set on
 * the context: BM's curve from its end at pane A's inner edge to its end at pane
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
 * plane as it was, and no trail move of its own; a stroke's list standing
 * dismissed first, its focus handed back to the stroke, and the face a stop
 * the reader returned to shows at its site — an act waiting on its answer
 * abandoned with it; a pane being set
 * again sets nothing once it ends, and an act waiting on it is dropped. The
 * plane is put back in the page's order before the focus returns, for the
 * element the scene was opened from — the walk's item, a corner — takes no
 * focus while the scene covers it; the focus's owner takes a focus the scene
 * held off it and returns it.
 */
export function close() {
  if (!scene || !els) return;
  if (scene.listing && HOST.currentIs('stroke:' + scene.listing.key)) HOST.dismiss();
  if (scene.returned && scene.returned.face && HOST.currentIs(scene.returned.face)) HOST.dismiss();
  scene = null;
  drawnTies = [];
  drawnEdges = [];
  drawnStrokes = [];
  for (const side of SIDES) stood[side].clear();
  coverPlane(false);
  els.root.classList.remove('on'); els.paneA.innerHTML = ''; els.paneB.innerHTML = ''; els.strokes.innerHTML = ''; delete els.bar.dataset.face;
  for (const p of [els.paneA, els.paneB]) p.classList.toggle('head', false);
  els.stop.hidden = true;
  els.stop.textContent = '';
  FOCUS.close('scene');
  markDirty();
}

/**
 * The scroll that brings the block next below (dir 1) or above (dir −1) the
 * pane's visible top to it, in px of the pane's content — the first block
 * whose top lies past that top by more than a pixel, the pane's visible top
 * taken below what a held head covers (`clearOf`), so the block stands clear
 * of it; the pane's end past the last block, its top before the first. Null
 * where the pane holds no article.
 * @param {HTMLElement} pane
 * @param {1 | -1} dir
 * @returns {number | null}
 */
function blockTop(pane, dir) {
  const art = articleIn(pane); if (!art) return null;
  const origin = pane.getBoundingClientRect().top + pane.clientTop - pane.scrollTop, clear = clearOf(pane);
  const tops = [...art.el.querySelectorAll('.run > .sp, .run > .withheld')].map((e) => e.getBoundingClientRect().top - origin);
  const at = pane.scrollTop + clear;
  const next = dir > 0 ? tops.find((y) => y > at + 1) : tops.slice().reverse().find((y) => y < at - 1);
  if (next == null) return dir > 0 ? pane.scrollHeight : 0;
  return Math.max(0, Math.round(next - clear));
}

/** a pane's own key now (K-60): ↓/↑ by block — the next block's top brought to the pane's top, below what a held head covers — PageDown/PageUp by most of the pane, Home/End to its ends */
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
 * corner's act (D5 K-57, as the plane's corner): on a head's count, the
 * corner opened whole (`openWhole`); else a draft's kept word's statement
 * opened or closed where the draft has a kept state (T-LAYER's
 * `openStatement`; K-74), else the version its corner offers read in its
 * place (`act`), else, where it stands compact or at its document's head, the
 * corner opened whole, or closed again (FP-26); each move and the read wait
 * for a pane being set again (`whenSet`), the key taken meanwhile. False for
 * any other key, and for Enter at a whole corner that offers no act.
 * @param {string} k the chord (N-KEYS's `chordOf`)
 * @returns {boolean} the scene took the key
 */
export function key(k) {
  const S = scene, E = els;
  if (!S || !E) return false;
  const at = typeof document !== 'undefined' ? /** @type {HTMLElement | null} */ (document.activeElement) : null;
  const pane = at && E.paneB.contains(at) ? E.paneB : E.paneA, side = pane === E.paneB ? 'b' : 'a';
  if (k === 'Enter') {
    const corner = at && at.closest ? at.closest('.corner') : null, P = S[side];
    if (!at || !corner || !pane.contains(corner)) return false;
    if (at.closest('[data-more]')) { openWhole(side); return true; }
    if (!P.d.derived && WRITE.keptOf(P.names)) { LAYER.openStatement(P.names); writeCorner(E, P); rebanded(E, S); return true; }
    if (P.read != null) { act(side); return true; }
    if (S.fit.corner === 'whole' && !P.open) return false;
    openWhole(side);
    return true;
  }
  if (!MOVES.includes(k)) return false;
  actedIn(S);
  if (!S.updating) return move(pane, k);
  S.waiting.push(() => move(pane, k));
  return true;
}
