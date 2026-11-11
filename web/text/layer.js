// T-LAYER — the one reconciler (the structure record §3.2; FP-12: one
// reconciler, two targets, the plane's text layer and the reading scene's
// panes, which borrow this mount). Layer 2. Engine-bound. State (FP-10): the
// mounted set (`mounted`) — each record's layout scale, revision, what it was
// made from and where its words were read, the fold it was set in, the parts
// of it standing, its marks and whether it takes the pointer — the corners
// beside the articles and the labels held over them, the signs standing in
// the columns' edges and the run each origin's statement stands beside
// (`signed`, `anchors`), which corners and cut
// labels a reader's act opened whole, each document's fold and its lines as
// the platform set them, the passage being read while its document is set
// again (`hold`), what each reading scene's pane's article was made from and
// where its words were read (`panes`), whether a press
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
// mirror's items being made from the text shown (S1 Q7). An article goes stale
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
// fits a withheld run's key, a cut label and a byline's slots by (the view's
// `measure`), and what a held label's line is set by (P-LABEL's
// `heldContents`, `runHTML`); where the platform gives no canvas, every character one advance
// of the reading face. A face that arrives after the articles were set is a
// re-set (`refaced`): the widths, the lines the platform set and the folds
// made of them dropped, so every standing article goes stale and is set again
// in its place, the passage being read held (FP-8). A resize that moves the measure folds
// every document again at it, and the article being read is set again in
// its place, the passage held; a zoom never moves it. Set again under another
// fit than the passage was read under — the measure, where the corner stands
// and in which form, the advance (`fitKey`) — the view's centre is framed
// across the passage's column as a landing frames it (`frameAcross`), its line
// kept at its height and its size (`keepPlace`), and a return by the trail
// lands so too (`keptAt`). The passage being read is the one at the centre of
// the visible view as the reader last saw it — below the one line's bottom as
// the layer last framed it (`framedTop`) — and kept at its height from that
// centre as the line stands then, the line having taken or given up rows
// meanwhile. The fold (`foldOf`;
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
// depth-0 document's standard size. The nearest scale at which that test
// fails, just short of the reading scale, is read here too
// (`scaleBelowReading`). Every size read here raises P-CAM's zoom-in bound to
// read it (`reach`; E18 (a)), so the camera never stops short of the reading
// scale of the text this module sets. The canvas's bars below the mount are
// the same fold's lines, measured where the document's text has been set in
// view (`measureInView`: a frame's
// budget of MEASURE_BUDGET_MS, nearest the view's centre first, no document
// below BARS_EM) or a view is placed on it (`renderedFold`), so mid scale
// greeks the columns the mount sets and no word moves at the hand-off; the
// loop runs `frame` before P-RENDER draws, so the canvas draws or yields
// each line by the lines standing this frame
// (`standing`), and outlines an arrival's runs on the fold's own lines where
// no part of them stands (`foldBoxes`; FP-21). When a document is set again
// while it is read — its article rebuilt in another fold, set again from the
// reads a feed row naming it made, standing as it was until they land
// (FP-23), or mounted again after a drop — the passage at the visible view's centre
// keeps its place and its size on screen (`hold`, `keepPlace`): the line's
// own bytes, carried by their identity through the image the article was
// made from into the text set again, so an edit above the view moves no word
// the reader reads (FP-8, FP-23), its position where that image places none
// of them — where the image covers the text set again whole, the passage
// gone from it, which the reader is told (`vanished`; FP-21) — and by
// position where the text comes before its image, the bytes kept for the
// re-set the image's arrival makes (`still`).
// A view the reader leaves and comes back to by the trail is placed again
// the same way (foundations §2.2): what a view reads — the line at its
// visible centre in the document at its own reading scale there, the words
// the live hold keeps still, and the view around it, each by its positions
// and its bytes' identity, the line's place in the fold, and the position its
// text was read at (`readAt`) — N-TRAIL keeps beside the view; a return
// finds those words in the text it
// reaches (N-GO's) and lands at the view that sets the line it names there in
// the place and at the size on screen of the line read, in the fold its
// document stands in then, its lines set as the platform sets them first
// (`keptAt`, `renderedFold`).
// The paging key continues at the next column's top at reading scale
// (`pageTarget`). A document's region is its outline's bounds widened
// leftward by the strip its corner stands in (`regionOf`); whether it meets
// the visible view (`inView`) — as any world rect does (`meetsView`) — the
// view's window over it (`windowIn`) and whether a position's line stands in
// a view (`lineInView`) are read here by N-WALK, L-LINE and N-GO.
// The marks and symbols are placed from LK's `shown` and `symbols`, a
// stretch several links mark in the one mark LK's `mergedMark` gives; a
// withheld run's owner and C-67's clause beneath it from what the model
// holds of its origin (`originOwner`, `clauseOf`), the article made again
// as the origin's edition claims and the reads of them arrive, fail and go
// (M-REC's revision); each frame marks a standing article's blocks in place
// by T-ARTICLE's one rule (`blockMarks`) for the selection from O-SELECTION
// and the walk's focus from N-WALK, each a span of the text shown, so
// a change of the selection or the focus rebuilds no article and the
// platform's selection stands as the person left it (foundations §2.1; D5
// §2); its symbols are marked heavier, in place, where every link one stands
// for is lit at an arrival (LK's `lit`, T-ARTICLE's `symbolLit`; FP-30), so
// an arrival sets no line (`markLit`). The byline
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
// the ring's one rule — lit while the plane holds the focus and the walk
// stands where an act of the person's put it (N-FOCUS's `ringShown`) — the
// canvas circling no document whose text stands.
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
// label held there; an in-document find standing at its place, its items
// stack beneath the find's box (the reader `atop`), which reads where the
// corner stands (`cornerPlace`). Where the view's fit leaves the measure
// beside it short of forty characters (P-LAY's `Fit.head`; FP-31), the
// corner stands at its document's head instead: its fold reserves a band of
// its rows above the first row of columns (`headBand`, P-LAY's `Fold.band`),
// read at the reading size and the view's width alone, never the camera; it
// stands across the column nearest the view's centre — its text and its edge
// — on the document's own ground, its rows at the reading line's pitch: the
// document's name on its first row, unless the one line names it, the kept
// clause after its address, then the corner's items in their one order and
// compact forms, each in its slot with its act, those that never yield wrapped
// whole onto the rows after, those that yield folded into "⟨n⟩ more", whose
// act opens them whole beneath (`headLayout`, `headOf`); its first row held
// below the one line as the document scrolls, the rest passing under it
// (`placeHead`), and no held label set over that document's text, its first
// row naming it. A change of its rows' count changes the band, the fold with
// it, and the article set again in its place re-anchors the camera on the
// passage being read (FP-8). No act leaves the caret under the one line or
// what a head covers (`headClear`, `placeCaretMark`), nor the end of the
// page's selection a press, K-8 or the platform's own keys moved under what a
// head covers (`keepClear`; FP-37). A standing
// corner's kept word is said once in the status region where it changes
// (`sayKept`; FP-36). Its first slot states the document's kind, read by
// the one test (`isDraft`; FP-33) — its metadata's word, else the kind the
// model knows of its record, else its box's listing — being read until one
// answers and not read where its metadata's read failed (`kindOf`; FP-34),
// its items made again as the kind is told (`cornerKey`). Its version
// statement counts its box's
// chain only where the board ended the chain there (`chainOf`), every
// version of the box sharing the count, its items made again as the chain
// is counted again (`cornerKey`; FP-22, FP-23); where a newer version's
// arrival pinned its box it offers to read the newest member named (the
// reader `newer`; D5 K-57), an act of its own, its items made again as the
// offer comes and goes; the ARIA mirror's item
// voices its state whole, its first item leading (`mirrorLead`, `mirrorState`).
// A reading view frames the column
// it reads with the corner and the edge beside it, at the landing's em
// (`frameOf`; P-CAM's `landingPx`) — a document read whole, its first column
// where the visible view holds it, else its head at the top of the visible
// view (FP-37) — on
// the document's lines as rendered, set first where its fold does not stand
// on them at the measure in force (`renderedFold`; FP-12, FP-25), so a
// camera bound there lands on the line its mounted text sets — the frame read
// again as the camera flies, so a document set again meanwhile moves where it
// lands. A
// kept document — one M-PUMP holds as it stands past a second while it reads
// it again (M-PUMP's `kept`; FP-23) — says so once, wherever its name is, in
// one clause (`keptIn` by `keptWords`, which the one line and the ARIA mirror
// read too; FP-33): a draft holding its text "as last read", else "links as
// last read", at the page's clock at the row or drop that left it behind
// (M-PUMP's `Kept.since`), a failed read's words after it. Save where the
// one line names the document, which carries it beside the address instead,
// the corner carries it as its last item, a line of its own its placing
// leaves apart, so its arrival moves no item; its label carries it after its
// address, at the address's size (`docLabel`) — the canvas's below
// its reading scale, and the held form over its article where no corner
// stands (`placeHeld`); and the account's label at far scale counts its
// documents standing so (`keptCountIn`). The status region names a document
// as the mirror's item finds it (`placeName`, `boxName`): its label as the
// item says it (`mirrorLabel`), NAME_WORDS of its words at the most, then
// the address it names. The origin's edition claims standing held so carry
// their clause in the origin's statement in the edge (`claimsKeptIn`;
// `placeSigns`; FP-31). The board lagging past a second (M-PUMP's
// `boardKept`) says so in one clause too (`boardKeptIn`), which the one
// line, the board's statements and its mirror item read; meanwhile every
// corner names neither the latest version nor the chain's count (T-ARTICLE's
// `cornerHTML`, `ArticleView.lags`), each corner's items made again as the
// lag begins and ends (`placeCorners`). The element outlives its
// article's remounts and its items are rewritten only where they change, so
// a focus on it survives them, and one on its act is put back on the act
// standing in their place (N-FOCUS's `keep`, by `cornerAct`). Its acts are
// native buttons the platform activates (T-ARTICLE's), and the focused
// document's corner alone stands in the Tab order, after the plane's stop
// (`setStops`): each line of its acts a toolbar whose stop is its first act,
// the stop following the focus along it and standing on its first act again
// as the focus leaves it (`rove`), the corner's element no stop; a corner
// holding no act its element's one stop, a group named by its own words;
// every other corner out of the order and hidden from assistive technology.
// While the reading scene stands over
// the plane the corner layer is inert (`cover`, through N-FOCUS, the focus's
// owner — FP-20), the scene's panes carrying their own (D5 §4 rule 5); a
// corner that leaves while it holds the focus hands it to the walk (D5 §4
// rule 4). The held label (FP-26): a document whose article stands in the
// mount band has no label on the canvas, its head naming it; once its
// outline's first row rises above the hold, and while the one line does not
// name it (the reader `named`), its label stands held below the line as an
// element of the corner layer over its text — the canvas's words for its
// box, read here (`docLabel`), so the two never part: its first line from
// the line's start, the box's lead (`firstOf`, by T-ARTICLE's first-line
// rule), which names the document and carries no kind, and its address at
// the line's end, past its region's prefix where
// that region is named in view (the reader `region`), else whole — a space
// short of its kept clause there where no corner carries the clause — its
// address in the identifier's face and the document's words in the reading
// face's, each stretch measured and set in its own (`runHTML`), on one line
// across its outline's visible part, on its box's ground, pushed up under the
// line by its outline's foot, beside its corner and never over it
// (`besideCorner`), drawn and never announced, taking the pointer where its
// article does (`placeHeld`, its line where `heldBand` sets it).
// The edges' signs (FP-31; foundations §2.1): a withheld run's gap holds its
// ground, its ends' symbol and its key alone, a transcluded run's typed lines
// its ground and its two hairlines alone (T-ARTICLE's), and every word of
// another document's material stands once per origin in view, on the corner
// layer, placed each frame (`placeSigns`): in each mounted document at reading
// scale, each origin — a withheld one whose clause is decided, as the article
// was made with it, or one whose run the reader reads (`originRunsAt`) — a
// line of whose runs meets the visible view states itself once, compact
// (T-ARTICLE's `edgeStatementHTML`, `sourceStatementHTML`, C-33's words there
// read as the frame stands, the run's document's kind and its origin's each
// by the one test — `carriesC33`), beside the run it stood beside
// last frame while a line of that run is in view, else beside its first run
// in view in reading order, the run held by its identity, its origin and its
// first byte's permanent address (`RunAt.id`; FP-38); each run in view adds a
// key no gap holds where the statement stands beside another run, and a
// withheld run its others' count. Each sign stands in the edge of the
// column holding its run's first line in view, the edge's width wide, at a
// share of the text's size never below P-REG's LABEL_MIN_PX; a column's edge's
// signs stack by the one hold (P-LABEL's `holdStack`) — each at its line, else
// below the hold, a label held over its document or what its head covers in
// that column, off the signs the article sets in that edge — held inside the
// column's padded foot, running past it only where the edge holds no room for
// the stack, so none is hidden. A corner beside the column after them stands
// below them (`cornerTop`), and a beam leaving their run starts past them
// (`signRects`). Drawn and never announced: the mirror carries their words
// (N-WALK). The statement's mark, a key and the pointer are the pointer's
// acts (APP-INPUT): the whole wording's card (O-FACES's `withheldRun`), the
// LEAP to the claim's home, and a transcluded run's key the gesture to its
// source carrying the run (foundations §2.3).
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
// so the copy is of what the person chose (`placeAgain`). Nor does a range
// take a caret: while a field the reader types in holds the focus no range is
// placed, the page's span owed until a frame finds the field let it go
// (FP-20; N-FOCUS's `isField`). Whether the platform holds a selection with
// extent anywhere in the page — an article's, a pane's, an overlay's text —
// is read here (`platformSelects`): what a copy takes, and what a press ends
// (FP-24).
// The reading scene's panes borrow the mount (`sceneArticle`; FP-12; the
// structure record §3.4 (vii)): each pane's article is made here,
// T-ARTICLE's scene-mode variant laid out by the pane's own style — one
// column at the measure the scene fits both panes to (SC) — from a record and
// the view it draws at that measure (`sceneView`), which the scene keeps so a
// pane is set again from them with no read (SC; FP-23); its corner's items
// are made here too, beside its column whole or compact (`sceneCorner`), or
// at its document's head in the plane's head form (`sceneHead`; FP-26); and
// what it was made from is kept beside it as a
// mounted article's is (`madeOf`) — its document's blocks, runs and image as
// the model held them, which the model replaces whole and never edits in
// place, so they stay the article's own while it stands. Every position in
// an article is mapped through them (`rangeIn`): the scene finds a passage
// in a pane so, and the platform's selection there is read and put back over
// the same bytes (`selectionIn`, `selectIn`). The copy of any selection in
// an article — a mounted one, or a pane's (foundations §2.4, §2.5) —
// replaces the clipboard (`onCopy`; FP-24): the plain text is the span's
// items in the text's order, as the article was made from them (T-ARTICLE's
// `copyText`), no label of the page among them — a range that starts in an
// article's head starts at its first block, and a range that touches an item
// covers it whole (`posOfPoint`), as it is drawn — and beside it, never in
// it, in a flavor only a skep client reads, skep's own entry names the
// passage (`namedIn`; FP-27): every position it holds by identity, part by
// part, through the image the article was made from as the model names its
// bytes at the copy (M-REC's `identityParts`) — a byte the page made by the
// address the board minted it at, else by the page's own name and its load,
// a stretch that image does not place a gap of its width — the board and
// the document its words were read in,
// and, where its text is a published member, that member by its version
// address with the span's positions in it, marked where the words were read
// at the plain address — never a draft's positions. Where the words were
// read is kept beside what each article was made from, set as it is made
// (`Where`): for a mounted article, the version its box shows, and at a
// published document's plain address the head its corner names
// (`shownWhere`); for a pane, what the scene hands in (`sceneArticle`) — so
// the same words copied from a box and from a pane are named alike.
// The text shown of a draft the person has typed in is the record M-DERIVE
// derives from the model's — its delivered runs with the page-local edits
// W-WRITE holds applied (`shownDoc`; K-72) — mounted, folded and measured in
// the model's record's place and set again as the edits move, the model's
// own record standing as the board served it. It is the one text every part
// of the page follows there: every position the fold places or answers, the
// walk's, the selection's, the caret's and an arrival's is one of it, computed to draw
// and to reach, and what holds a place across the person's edits holds it by
// the identity of its bytes, read through that text's image (`shownIdentity`,
// `placedShown`, `firstStanding`) — a byte the board holds by its permanent
// address, a byte the page made by the page's own until the board mints it
// (M-REC's `pageIds`). The carrier's views: its blocks (`blockAt`,
// `blockByPos`, `grainAt`); a span split by what the page knows of its bytes
// (`shownRuns`) — what the model's text holds, at its position there, the one
// position the board is asked by, and what the page made, minted or not
// (`madeHere`, `unminted`); a stretch the board placed by its own positions
// found in it (`fromBoard`); the page's own record of what its edits removed
// and where (`removals`, `removedOf`), which a put-back places again by
// identity as one step (`putBack`); and what a hold keeps from the board, read
// from the held lines alone (`holding`, `heldIn`). A link's end stands in that
// text where its bytes stand, on a byte the page made once the board has
// minted it and never before (LK's `shown`); what a view reads is read of
// that text (`readAt`). The
// caret (D5 K-70, K-72, K-76, K-77; D6 BM-4, BM-52, BM-54, BM-70, BM-75): the
// page's own, one at a time, in text the person may edit — a draft under the
// session's account, by its address alone, at reading scale (`editable`) — a
// position of the text shown, placed by Enter at a focused span at the span's
// start (`caretToSpan`), by a click at the character clicked
// (`caretFromPlatform`, `placeCaret`), by a drag, a double- or triple-click
// or a Shift+click at the moving end of the selection it makes wholly in the
// draft (`movingPart`; APP-INPUT's), by Shift with ← or → at a span holding
// none at the edge the step extends from (O-SELECTION's `extendFromSpan`) —
// each of these last the selection standing — moved by the arrows a
// character or a line or by ← and → a word, by Home and End to the start or
// the end of its line as the fold sets the line (`caretMove`) — with Shift, a step
// O-SELECTION extends a selection from it by (`extendFromCaret`; K-71) — and
// typed at: a printable key, Enter
// and Tab put their characters in, Backspace and Delete take a character out
// (`caretType`, `caretErase`), or, where a selection whole in the text shown
// stands in the caret's text, its bytes are replaced by the key's text, none
// for Backspace and Delete (`caretReplace`) — each an edit handed to W-WRITE
// and shown through the derived record, nothing composed and nothing sent
// (FP-14). Leaving the text — Esc to the walk at
// the caret's span, a move of the walk, a zoom past its reading scale, a
// pointer's act on another document or a selection put there (D5 M-2, K-77;
// N-KEYS', N-WALK's, APP-INPUT's, O-SELECTION's) — keeps the caret at its
// position (`leaveCaret`), which Enter, a printable key or Shift with ← or → at its
// span returns (`returnCaret`; N-KEYS') — its span the one the walk stands
// on at its position, by T-SPAN's rule: in white space alone the span before
// it, or the first where none stands before it (`caretSpan`, `caretInSpan`;
// D5 §4 rule 20), a block of the text shown, the one a slot chord acts on
// (O-SELECTION's); whether a line of its span
// stands in the visible view read here for N-WALK's hold on it
// (`spanInView`); its line stands while it holds the caret (`heldParts`), the
// platform's selection is collapsed at it as the page sets it — save by a
// step that extends a selection, or the return such a step is made from,
// whose range the page places (`placeSelection`), save where it is placed at
// the moving end of the selection a pointer's gesture or a step made, which
// stands, and save as a pointer's act on another document or a selection put
// there keeps it, which owe it nothing; a Shift+click in the draft extends
// from the anchor the platform's selection is collapsed at as the press
// begins (`collapseAt`; APP-INPUT's) — and its mark —
// the page's own, of no width, hollow where kept — is set at its character
// boundary in the standing part each frame (`placeCaretMark`) and is no byte
// of the document. A draft's kept word opens its statement in its corner on
// its act (`openStatement`; K-57, K-74; FP-26), the corner's items made
// again as the state, the statement or the board's lag moves
// (`placeCorners`). The gate's hooks read the mounted set and
// the mount log (`mountedSet`, `mounts`); APP records each frame's counts
// (`frameStats`).
// Rules: FP-1, FP-2, FP-8, FP-10, FP-12, FP-14, FP-20, FP-21, FP-22, FP-23,
// FP-24, FP-25, FP-26, FP-27, FP-29, FP-30, FP-31, FP-33, FP-34, FP-36,
// FP-37, FP-38, FP-39, FP-40.

import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as WRITE from '../write/write.js';
import * as LK from '../links/links.js';
import * as FOCUS from '../nav/focus.js';
import { cam, sx, sy, wx, wy, viewport, visibleView, markDirty, reach, reanchor, reanchored, measure, fit, landingPx, panBy, panInto, flying } from '../plane/camera.js';
import { MOUNT_EM, UNMOUNT_EM, MOUNTS_PER_FRAME, LOD_TXT_LO } from '../plane/lod.js';
import { docBox, intersects, clearLeftOf } from '../plane/projection.js';
import { layoutOf, fold, estimate, slot, boundsOf, padded, outlineRects, firstRow, inFirstRow, placeOf as placeIn, posAt as posIn, pageTarget as pageIn, windowIn as foldWindow, holdOf, isSpace, columnOfLine, columnAt, MEASURE, MEASURE_CPL, LAY_FS, LINE_H, EDGE, EDGE_GAP, GUTTER, CHAR_W } from '../plane/layout.js';
import { CORNER, HOLD, COL, ADDRESS, LABEL_MIN_PX, cornerWidth } from '../plane/register.js';
import { holdTop, holdStack, heldContents, apartTexts, across, lineHeight, face, inFace, plain, runsOf, figuresOf, figureCell, runWidth, cutWords, LINE_BOX } from '../plane/labels.js';
import { articleHTML, articlePlan, cornerHTML, cornerItems, cornerLead, cornerWords, kindWord, keptHTML, statementHTML, keptWord, keptStatement, blockMarks, symbolLit, editionClause, copyText, firstLineOf, statedChain, placeholderOf, gapHolds, edgeStatementHTML, edgeSignsFor, edgeKeyHTML, edgeCountHTML, originRunsOf, textIn, sourceStatementHTML } from './article.js';
import { farShort, whyOf } from '../beams/held.js';
import { applyEdits, sourceRuns, fromBase, boundaries, wordStop } from '../model/derive.js';
import { homeOf, documentOf, memberOf, versionAddress, accountOf } from '../model/address.js';
import { posOfChar, charOfPos, sameSpan, elementIn, CHROME } from './span.js';
import { esc, byteLength } from '../util.js';
import { t, facedHTML, lastRead, CLIENT_CLOSE } from '../strings.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('../model/frames.js').Run} Run */
/** @typedef {import('./article.js').ArticleView} ArticleView */
/** @typedef {import('./article.js').RunInView} RunInView */
/** @typedef {import('./article.js').OriginRun} OriginRun */
/** @typedef {import('./span.js').Span} Span */
/** @typedef {import('../plane/layout.js').Fold} Fold */
/** @typedef {import('../plane/layout.js').Line} Line */
/** @typedef {import('../plane/layout.js').Row} Row */
/** @typedef {{x: number, y: number, w: number, h: number}} Rect */

/**
 * @typedef {Object} Made — what an article was made from: its document, and the blocks, runs and image the model held of it as the article was made. The model replaces a document's blocks, runs and image whole and never edits them in place, so these stay the article's own while it stands, whatever the model has delivered since: every position in the article is mapped through them (`rangeIn`), a copy takes its bytes from them and names them by identity through its image (`onCopy`, `namedIn`), and a reader's place in it is carried by its bytes' identity into the text it is set again as (`readingNow`; SC's pane set again — FP-23)
 * @property {string} addr the document — for a reading scene's pane, the address its acts name (`sceneArticle`)
 * @property {Block[]} blocks
 * @property {Run[]} runs
 * @property {import('../model/records.js').ImageRun[]} image its V→I image: the permanent address of every position it covers
 */

/**
 * @typedef {Object} Where — where an article's words were read, as FP-27 names a copy of them (`namedIn`): kept beside what it was made from, set as it is made, so a copy names the text the reader saw however the model has moved since
 * @property {string} doc the document read: the version its box shows on the plane (`shownWhere`), the address a reading scene's pane's head names
 * @property {string | null} member the member its text is, by its version address: the version shown, else — at a published document's plain address — the head its corner names (`shownWhere`); null for a draft, and where no member is known
 * @property {boolean} plain its words were read at a published document's plain address
 */

/**
 * @typedef {Object} Copied — a passage as skep's clipboard entry names a copy of it (`namedIn`; FP-27): where its words were read (`Where`), on its board, every position it holds by identity, part by part, and, where a member is named, its positions in that member — never a draft's, which move
 * @property {string} board the board's origin
 * @property {string} doc the document read (`Where.doc`)
 * @property {string | null} member the member its text is (`Where.member`)
 * @property {boolean} plain read at a published document's plain address (`Where.plain`)
 * @property {number | null} pos its first position in `member`; null where no member is named
 * @property {number | null} width its positions there; null with `pos`
 * @property {IdentityPart[]} ids every position it holds, in the text's order, through the image its article was made from (M-REC's `identityParts`): the board's bytes by their permanent addresses, the page's unminted ones by its own name and its load, each stretch that image does not place a gap — their widths the passage's
 */

/** @typedef {Omit<Copied, 'ids'> & {ids: ISpan[]}} Named a passage named in the frame a copy of it is (`Copied`; SC's stops, as the reader leaves them), its positions in the member null also where no one stretch of the member holds it, and its bytes by identity whole, read back through an image (M-REC's `placedIn`) — none where the passage holds no byte, or the image it was read through does not cover it */

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
 * @property {boolean[]} before for each element between the unit's element and the point, outermost first, whether any text stands in it before the point: a part ending at the cut leaves out the first that holds none and gives up a run's closing in each that holds some, and a part starting at the cut takes a run's opening where none does
 * @property {number} char the unit's own characters before the point, its chrome apart: the character a part starting there starts at
 */

/**
 * @typedef {Object} Caret — the page's own caret (see the head)
 * @property {string} addr the draft
 * @property {number} pos its position in the text shown: the boundary before the byte at `pos`, the text's end one past its last
 * @property {boolean} live the keys reach it; false where Esc left the text to the walk, the caret kept at its position (BM-52)
 */

/**
 * @typedef {Object} Mounted
 * @property {HTMLElement} el
 * @property {Doc} d the record the article was made from: the model's, or the record derived from it where the page shows a draft's typed text (`shownDoc`)
 * @property {number} lay the layout scale: layout px per world unit
 * @property {number} runFrom the model's record's window at mount
 * @property {number} runTo
 * @property {number} rev the model's record's revision at mount
 * @property {number} editRev how many times the draft's page-local edits had changed at mount (W-WRITE's `editRev`)
 * @property {Made} made what the article was made from
 * @property {Where} where where its words were read, as its box showed them as it mounted (`shownWhere`): a chain counted or metadata read since moves the record's revision, and the article mounted again names what they told
 * @property {number} grev the view revision at mount
 * @property {Fold} fold the fold it was set in: its size, its columns and the lines they hold
 * @property {number} fs the document's em in world units: its fold's
 * @property {{whole: string, compact: string, opened: string, key: string, items: import('./article.js').CornerItem[], openedItems: import('./article.js').CornerItem[], words: string[]}} corner the corner's items, whole, compact and opened whole on its act (T-ARTICLE's `cornerHTML`), compact one by one with their widths as a head's rows set them, closed and opened, and whole as their words alone, one by one (`cornerItems`; `cornerOfView`), as made at mount and again as what they are made from moved — the board's lag, its box's chain counted again, the draft's kept state, its statement open or closed (`cornerKey`); empty where it has none
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
 * @property {string} fit the fit it was mounted under (`fitKey`): the passage read in it is read under that fit (`readingNow`)
 * @property {RunAt[]} runs its runs of other documents' material, as the article was made with them (`originRunsAt`): what the edges' signs stand for (`placeSigns`)
 */

/**
 * @typedef {Object} RunAt — a run of another document's material in a mounted article as its column's edge reads it (`originRunsAt`), decided as the article was made
 * @property {OriginRun} run the run, in the text the article was made from: a withheld run, or a transcluded run the reader reads
 * @property {Block | null} b a withheld run's block, in that text; null for a transcluded run
 * @property {string} id its identity: its origin and the permanent address of its first byte, through the image the article was made from; its origin and its position where that image covers none of it (FP-38)
 * @property {import('./article.js').GapHolds} holds what its gap holds (T-ARTICLE's `gapHolds`): 'reading' while a withheld run's clause was not decided, 'edge' where its key stands in the edge — a transcluded run's always
 * @property {number} first its first line, an index into the fold's lines: a transcluded run's the one its first character stands on
 * @property {number} end one past its last line: a transcluded run's past the one its last character stands on
 */

/**
 * @typedef {Object} EdgeSign — a sign standing in a column's edge on the corner layer (`placeSigns`): its element, kept across frames
 * @property {HTMLElement} el
 * @property {'statement' | 'key' | 'count'} kind an origin's statement; a run's key, no gap holding it; a withheld run's others' count
 * @property {string} addr the document whose article it stands beside
 * @property {number} pos the run it stands for, by its first position
 * @property {string} origin the run's origin
 * @property {string} html its words, as last written
 * @property {string} style its size, its width and its place across, as last written
 * @property {number} column the column whose edge it stands in
 * @property {number} x its left edge, on screen (px)
 * @property {number} y its top, as last placed on screen (px)
 * @property {number} w its width (px)
 * @property {number} h its height as laid out (px)
 * @property {boolean} stale its words or its size changed since it was measured
 * @property {boolean} live the frame placing the signs stands it
 */

/**
 * @typedef {Object} Corner — a document's corner on the plane: its element beside the article, kept across the article's remounts
 * @property {HTMLElement} el
 * @property {string} html the items it shows
 * @property {boolean} compact it stands compact (FP-26)
 * @property {number} column the column it stands beside, an index into the fold's columns
 * @property {number} cap the widest it may stand (px): the room beside the column's text, gaps taken; Infinity where its form's width fits there
 * @property {number} w its width as laid out (px)
 * @property {number} h its items' height as laid out (px), a kept clause below them apart (`keptHTML`): what it is placed by, so the clause's arrival moves none of them
 * @property {number} x its left edge as last placed, on screen (px): its document's held label stands clear of it
 * @property {number} y its top as last placed, on screen (px)
 * @property {number} top the top its room gives it, on screen (px): `y`, save where a surface standing at its place pushes its items down (`Readers.atop`)
 * @property {boolean} stale its items or its cap changed since it was measured
 * @property {boolean} mine it is the focused document's: the Tab stop
 * @property {number} blockedAt the column beside which the signs in the edge before it left it no room down to its row's foot, where it stands by its row's first column while the view's centre stays over that column; -1 where none
 * @property {boolean} head it stands at its document's head (`placeHead`): its first row held, its rows across the column being read
 * @property {number} bottom the bottom of what it covers on screen as last placed (px): its first row's, or a form opened beneath it — what no act leaves a target under (`headClear`)
 * @property {string | null} word the kept word its kept slot showed as last placed: a word that changes is spoken (FP-36); null where none stood
 */

/**
 * @typedef {Object} HeadSlot — an item of a head's rows as `headLayout` sets it
 * @property {number} k the item's index among the corner's items; -1 for the kept clause, -2 for the count of those folded
 * @property {number} row the row it stands on
 * @property {number} x its left edge, px from the head's left
 * @property {number} w its width, px
 * @property {number} rows the rows it takes: more than one where its words wrap wider than the head
 */

/**
 * @typedef {Object} HeadLayout — a corner at its document's head (`headLayout`): its rows and what stands on each
 * @property {number} rows its rows
 * @property {HeadSlot[]} slots its items and the kept clause, each where it stands
 * @property {number} name the room its first row leaves the document's name, px from the head's left: the name stands in [0, name)
 * @property {number} folded the items folded into the count, "⟨n⟩ more"
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
 * @typedef {Object} Hold — the passage being read as its box's article was taken down to be set again (see the head): the line at the visible view's centre, or the line a version move names
 * @property {string} addr the document whose article, mounted fresh, takes it: the same document set again, or the version its box takes
 * @property {Fold} fold the fold it stood in
 * @property {{x: number, y: number}} p where it stood, in world units relative to the room
 * @property {{from: number, to: number} | null} pair the position of `fold` whose line it stood on and the position of `addr`'s that takes that line (a version move); null where its bytes' identity names it (`ids`), else the same position (P-LAY's `holdOf`)
 * @property {number | null} pos the position whose line it stood on: the one that line opens at (P-LAY's `posAt`), or, carried from a re-set by position, the one whose line that re-set placed (`still`) — the one `ids` is read from
 * @property {ISpan[]} ids the bytes of the line `pos` opens, by identity, read through the image the article was made from (M-REC's `identityIn`): where the text set again holds the first of them now is the line that takes the passage's (FP-8, FP-23) — none where that image did not cover it
 * @property {{x: number, y: number, scale: number} | null} left the camera as a re-set whose text came before its image left it, by position: `ids` kept for the re-set the image's arrival makes, while the camera stands there (`still`); null where it is no such hold
 * @property {string} fit the fit it was read under (`fitKey`): an article set again under another frames the passage sideways (`keepPlace`)
 * @property {number} top the one line's bottom it was read under, px: set again under another, the passage keeps its height from the visible view's centre (`keepPlace`)
 */
/**
 * @typedef {Object} Reading — what a view reads (`readAt`), by value — positions, bytes by identity and a place, no fold and no words: what N-TRAIL keeps beside an entry's view, so a return finds those words wherever its document was set since (N-GO's) and lands at the view that keeps the line it finds them at where the line read stood (`keptAt`)
 * @property {string} addr the document: the version its box showed
 * @property {number | null} at the position its text was read at (M-REC's `Doc.readAt`): at a bare address, what tells the member that text was from a newer one published after it (N-TRAIL's `arrivedAt`, `countedAt`); null where no delivery said
 * @property {number} pos the position the line under the view's visible centre opens at (P-LAY's `posAt`), in the text the page showed of it (`shownOf`): the fold's
 * @property {number} width that line's positions (`lineOf`): the words the live hold keeps still
 * @property {ISpan[]} ids that line's bytes by identity, in its order, through the image of the text shown (M-REC's `identityIn`); none where that image did not cover them: words the page made hold no identity
 * @property {ImageRun[]} around the view around them: the runs of that image cut to the positions the view showed of the document (P-LAY's `windowIn`), each at its position then — what a text holding none of the words is placed nearest by (N-GO's); none where the image covered none of them
 * @property {{x: number, y: number}} p the visible centre, in world units relative to the room
 * @property {{x: number, y: number}} line where the fold set that position's line, in world units relative to the room (P-LAY's `placeOf`)
 * @property {number} fs the fold's em, in world units
 * @property {string} fit the fit it was read under (`fitKey`): a return under another frames the line sideways (`keptAt`)
 * @property {number} top the one line's bottom it was read under, px: a return under another keeps the line at its height from the visible view's centre (`keptAt`)
 */
/** @typedef {import('../model/records.js').ISpan} ISpan */
/** @typedef {import('../model/records.js').IdentityPart} IdentityPart */
/** @typedef {import('../model/records.js').ImageRun} ImageRun */

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
 * @property {(addr: string, pos: number, ids: ISpan[]) => void} vanished told where the text a document is set again as holds none of the passage being read (`keepPlace`): the document, the position whose line keeps the passage's place, and the passage by identity (N-GO's `vanished`; FP-21)
 * @property {(addr: string) => number} atop how far a surface standing at a document's corner's place pushes the corner's items down, in px, by the document's box: an in-document find's box (N-FIND's `atop`); 0 where none stands
 * @property {(addr: string) => (number | null)} newer the newer version a document's corner on the plane offers to read in its place, where a newer version's arrival pinned its box on the version it stands for (N-GO's `newerAt`); null where it offers none
 */

/** the corner's distance from the text column, and from the edge of the room it stands in (px): P-REG's */
const CORNER_GAP = CORNER.gap;
/** the room between the slots of a head's rows, and before its first row's items (px): the corner's padding, P-REG's */
const HEAD_GAP = CORNER.pad;
/** the line box the corner's words take at the interface's size (px): the style's line height for them */
const CORNER_LINE = CORNER.px * 1.4;
/** the time a frame gives the setting of documents in view that stand unmounted, so their bars are their lines as set (ms) */
const MEASURE_BUDGET_MS = 6;
/** the em, in px, the canvas draws a document's bars from (P-RENDER's): below it no bar stands, and no line is set for one */
const BARS_EM = 3;

/** @type {Map<string, Mounted>} */
const mounted = new Map();
/** @type {WeakMap<HTMLElement, {made: Made, where: Where}>} what each reading scene's pane's article was made from and where its words were read, by its element (`sceneArticle`), for as long as the element lives */
const panes = new WeakMap();
/** @type {Map<string, Corner>} the corners on the plane, by document */
const corners = new Map();
/** @type {Map<string, EdgeSign>} the signs standing in the columns' edges (`placeSigns`), by key: a statement's `⟨document⟩ ⟨origin⟩`, a run's sign's `⟨document⟩ ⟨position⟩ ⟨kind⟩` */
const signed = new Map();
/** @type {Map<string, Map<string, string>>} the run each origin's statement stands beside, by document and then by origin: the run's identity (`RunAt.id`), kept while a line of that run is in view (`placeSigns`; T-ARTICLE's `edgeSignsFor`) */
const anchors = new Map();
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
/** the one line's bottom as the layer last framed it, px: the visible view the reader last saw, the passage being read taken at its centre (`seenTop`); NaN before the first frame */
let framedTop = NaN;
/** @type {Caret | null} the page's own caret (see the head); null where none stands */
let caret_ = null;
/**
 * @typedef {'collapse' | 'keep'} CaretOwed what the frame owes a caret placed or moved since it last set the caret's
 * mark: the mark brought into view, and the platform's selection collapsed at it (`collapse`), or kept as it stands
 * — the page placed it over the selection a move at the caret extends, or a pointer's gesture made it (`keep`)
 */
/** @type {CaretOwed | null} what the frame owes the caret once its part stands (`placeCaretMark`); null where nothing is owed */
let caretOwed = null;
/** @type {Set<string>} the drafts whose kept word's statement stands open in their corner (`openStatement`) */
const openStatements = new Set();
/** @type {Map<string, {key: string, doc: Doc, removed: Array<ISpan[] | null>}>} the record derived from each draft's delivered runs and its page-local edits, with what each edit removed, by document, as last made (`shownDoc`) */
const shownCache = new Map();
/** the box an address stands in: its document's, which every version of it shares */
const boxOf = (/** @type {string} */ addr) => documentOf(addr) || addr;
/** the readers until the app hands its owners' in: no selection and no focus, the line at the viewport's top, nowhere navigated, every box showing its plain address, no document and no account named, no corner offering a newer version */
const noReaders = () => /** @type {Readers} */ ({ selection: () => null, focus: () => null, top: () => 0, handOff: () => {}, navigated: () => null, shown: boxOf, named: () => null, region: () => false, vanished: () => {}, atop: () => 0, newer: () => null });
/** @type {Readers} */
let read = noReaders();
/** is a version the one its box shows (see the head)? */
const isShown = (/** @type {string} */ addr) => read.shown(addr) === addr;

/**
 * @param {HTMLElement} el the text layer's element
 * @param {HTMLElement | null} cornersEl the corner layer's
 * @param {{measure?: boolean}} [opts] `measure` the platform sets the articles: their lines measured as rendered and their parts cut from them (the page; the node tests run without)
 */
export function attach(el, cornersEl, opts = {}) {
  layer = el; cornerLayer = cornersEl; engine = !!opts.measure; styled = 0;
  // the stop of a corner's line of acts follows the focus in it, and stands on its first act again as the focus leaves it (`setStops`)
  if (cornersEl && typeof cornersEl.addEventListener === 'function') {
    cornersEl.addEventListener('focusin', (ev) => rove(ev.target, ev.target));
    cornersEl.addEventListener('focusout', (ev) => rove(ev.target, ev.relatedTarget));
  }
}

/** a corner's stops stood again as the focus moves in or out of it (`setStops`): `at` the element the focus goes to */
function rove(/** @type {EventTarget | null} */ target, /** @type {EventTarget | null} */ at) {
  const t = /** @type {HTMLElement | null} */ (target), el = t && typeof t.closest === 'function' ? /** @type {HTMLElement | null} */ (t.closest('[data-corner]')) : null;
  const c = el ? corners.get(el.dataset.corner || '') : undefined;
  if (el && c && c.el === el) setStops(el, c.mine, c.head, /** @type {Element | null} */ (at));
}
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
/** the block the `lit` mark stands on (D3): the walk's focused block while the ring is drawn — the plane holds the focus and the walk stands where an act put it (N-FOCUS's `ringShown`) — else none; never in a scene's pane */
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

/**
 * The record the page shows of a document (see the head): the model's, or,
 * where the draft holds page-local edits, the record M-DERIVE derives from its
 * delivered runs with them applied (`applyEdits`), every byte the page made
 * named as the model names it (M-REC's `pageIds`) — made again where the
 * model's record, the edits or what the board minted of them moved, the same
 * object while none has, so what was made from it is read against one record.
 * A record already derived answers itself.
 * @param {Doc} d
 * @returns {Doc}
 */
function shownDoc(d) {
  if (d.derived) return d;
  const c = derivedOf(d);
  return c ? c.doc : d;
}

/** the record derived from a draft's delivered runs and its page-local edits with what each edit removed (`shownDoc`, `removedBy`), as last made; null where the draft holds no edit */
function derivedOf(/** @type {Doc} */ d) {
  const edits = WRITE.edits(d.addr);
  if (!edits.length) { shownCache.delete(d.addr); return null; }
  const key = `${d.rev}:${d.from}:${d.to}:${WRITE.editRev(d.addr)}`, c = shownCache.get(d.addr);
  if (c && c.key === key) return c;
  const out = applyEdits(d, edits, (page, width) => REC.pageIds(d.addr, page, width));
  const made = { key, doc: out.doc, removed: out.removed };
  shownCache.set(d.addr, made);
  return made;
}

/** what each of a draft's page-local edits removed from its text, by the edit's index, as bytes by identity (M-DERIVE's `applyEdits`); none where it holds no edit */
const removedBy = (/** @type {Doc} */ d) => { const c = d.derived ? null : derivedOf(d); return c ? c.removed : []; };

/** the record the page shows of a document by its address (`shownDoc`): the gate's and the tests' reading of a draft's typed text */
export const shownOf = (/** @type {string} */ addr) => shownDoc(REC.doc(addr));

/**
 * A stretch of the text the page shows of a document by identity (M-REC's
 * `identityIn`, through that text's image): what a span of it is held by —
 * left by and returned to, carried through the person's edits — a byte the
 * page made named by the page's own identity until the board mints it. None
 * where that image does not cover the stretch — the delivered text's image
 * not read yet — or the model holds no record of the document.
 * @param {string} addr
 * @param {number} pos a position of the text shown (`shownOf`)
 * @param {number} width its positions
 * @returns {ISpan[]}
 */
export const shownIdentity = (addr, pos, width) => (REC.has(addr) ? REC.identityIn(shownOf(addr).image, pos, width) : []);

/**
 * Where bytes named by identity stand in the text the page shows of a
 * document (M-REC's `placedIn`, through that text's image); none where that
 * text places none of them, or the model holds no record of the document.
 * @param {string} addr
 * @param {ISpan[]} ids
 * @returns {Array<{pos: number, width: number}>} positions of the text shown (`shownOf`)
 */
export const placedShown = (addr, ids) => (REC.has(addr) ? REC.placedIn(shownOf(addr).image, ids) : []);

/**
 * What a reading scene opens a document's pane on where the act names a span
 * of the text shown (SC's `Source`): the record the page shows, new words
 * included, where it derives one (`shownDoc`), since the span's positions are
 * that text's; else the document's address, read from the board.
 * @param {string} addr
 * @returns {string | Doc}
 */
export function paneSource(addr) {
  const d = REC.has(addr) ? shownOf(addr) : null;
  return d && d.derived ? d : addr;
}

/**
 * The first words of a stretch of the text the page shows of a document
 * (`shownOf`), NAME_WORDS at the most, cut on a word as `placeName` cuts a
 * document's name: what a run of a span is named by where the runs answer
 * differently (O-PROV's); '' where the stretch holds no words.
 * @param {string} addr
 * @param {number} pos a position of the text shown
 * @param {number} width its positions
 * @returns {string}
 */
export function firstWords(addr, pos, width) {
  const words = REC.textOf(shownOf(addr).runs, pos, pos + width).trim().replace(/\s+/g, ' ');
  const fits = (/** @type {string} */ s) => wordsIn(s) <= NAME_WORDS;
  return !words || fits(words) ? words : cutWords(words, fits) || '';
}

/** the block of the text the page shows of a document (`shownOf`) holding a position of it; null where it holds none there, or the model no record of the document */
export const blockAt = (/** @type {string} */ addr, /** @type {number} */ pos) => (REC.has(addr) ? REC.blockIn(shownOf(addr).blocks, pos) : null);

/** the block of the text the page shows of a document (`shownOf`) whose first position is `pos`; null where none opens there */
export const blockByPos = (/** @type {string} */ addr, /** @type {number} */ pos) => (REC.has(addr) ? shownOf(addr).blocks.find((b) => b.pos === pos) || null : null);

/**
 * @typedef {Object} ShownRun — one stretch of a span of the text shown, by what the page knows of its bytes (`shownRuns`)
 * @property {number} pos its first position in the text shown
 * @property {number} width its positions
 * @property {number | null} base its first position in the model's text — the text as the board served it, which the board is asked by, as of that text's read — where that text holds its bytes; null where the page made them
 * @property {boolean} made the page made its bytes — typed here, or pasted as new bytes — and holds its record of making them
 * @property {import('../model/records.js').Minted | null} minted where the page made its bytes and the board has minted them, the permanent address of its first byte and the commit that minted it; null for every other stretch
 */

/**
 * A span of the text the page shows of a document split into runs by what
 * the page knows of its bytes (see the head; M-DERIVE's `sourceRuns`): each
 * stretch the model's text holds, at its position there; each stretch the
 * page made, minted or not (M-REC's `mintedOf`). Neighbours are one run where
 * they continue each other in the model's text, or in the board's addresses,
 * or are both the page's and unminted; the one reading of a span the board is
 * asked about.
 * @param {string} addr
 * @param {number} pos the span's first position in the text shown
 * @param {number} width its positions
 * @returns {ShownRun[]}
 */
export function shownRuns(addr, pos, width) {
  /** @type {ShownRun[]} */
  const out = [];
  if (!REC.has(addr)) return width > 0 ? [{ pos, width, base: pos, made: false, minted: null }] : out;
  const minted = REC.mintedOf(addr);
  for (const r of sourceRuns(shownOf(addr), pos, width)) {
    // a stretch the page made is cut where the board minted its bytes, each cut named apart
    /** @type {ShownRun[]} */
    const parts = [];
    if (r.page == null) parts.push({ pos: r.pos, width: r.width, base: r.base, made: false, minted: null });
    else {
      let at = r.page;
      const end = r.page + r.width, part = (/** @type {number} */ lo, /** @type {number} */ hi, /** @type {import('../model/records.js').Minted | null} */ m) => parts.push({ pos: r.pos + (lo - /** @type {number} */ (r.page)), width: hi - lo, base: null, made: true, minted: m });
      for (const m of minted) {
        const lo = Math.max(at, m.page), hi = Math.min(end, m.page + m.width);
        if (lo >= hi) continue;
        if (lo > at) part(at, lo, null);
        part(lo, hi, { ...m, page: lo, width: hi - lo, ordinal: m.ordinal + (lo - m.page) });
        at = hi;
      }
      if (at < end) part(at, end, null);
    }
    for (const x of parts) {
      const last = out[out.length - 1];
      const on = !!last && last.pos + last.width === x.pos && last.made === x.made && (x.made
        ? (!last.minted && !x.minted) || (!!last.minted && !!x.minted && last.minted.prefix === x.minted.prefix && last.minted.ordinal + last.width === x.minted.ordinal && last.minted.at === x.minted.at)
        : last.base != null && x.base === last.base + last.width);
      if (last && on) last.width += x.width; else out.push(x);
    }
  }
  return out;
}

/** is every byte of a span of the text shown one the page made and holds its record of making (`shownRuns`), minted or not — the NEW WORDS the page answers for itself? False for a span of no width */
export const madeHere = (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number} */ width) => { const runs = shownRuns(addr, pos, width); return runs.length > 0 && runs.every((r) => r.made); };

/** does a span of the text shown hold a byte the page made that the board has not minted (`shownRuns`)? */
export const unminted = (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number} */ width) => shownRuns(addr, pos, width).some((r) => r.made && !r.minted);

/** does a draft hold a line the board has not kept — D6's machine's own record of its held lines (W-WRITE's `heldOf`), the one reading of any sign that words are not on the board */
export const holding = (/** @type {string} */ addr) => WRITE.heldOf(addr).length > 0;

/**
 * Does a stretch of the text shown hold what a hold keeps from the board
 * (see the head; B3-S2): while the draft holds a line the board has not kept
 * (`holding`), a byte the page made that the board has not minted, or the
 * place of a held removal — a held line whose frame removes, found by the
 * bytes it names on either side of what it took (M-FRAMES's `HeldAnchors`).
 * False where no hold stands.
 * @param {string} addr
 * @param {number} pos the stretch's first position in the text shown
 * @param {number} width its positions
 * @returns {boolean}
 */
export function heldIn(addr, pos, width) {
  if (!holding(addr) || !REC.has(addr)) return false;
  if (unminted(addr, pos, width)) return true;
  const image = shownOf(addr).image, end = pos + width;
  /** where the byte a held line names stands in the text shown, by its permanent address; -1 where the text places it nowhere */
  const at = (/** @type {string | null} */ i) => { const cut = i ? i.lastIndexOf('.') : -1; const [s] = i && cut > 0 ? REC.placedIn(image, [{ prefix: i.slice(0, cut), ordinal: Number(i.slice(cut + 1)), width: 1 }]) : []; return s ? s.pos : -1; };
  return WRITE.heldOf(addr).some((row) => {
    if (row.frame.op !== 'delete' || !row.anchors) return false;
    const before = at(row.anchors.before), after = at(row.anchors.after);
    return (before >= pos && before < end) || (after >= pos && after < end);
  });
}

/**
 * Where a stretch the board placed by its own positions — a link's far end,
 * a passage it found — stands in the text the page shows of a document. In a
 * draft holding the person's page-local edits: where the stretch's bytes are
 * named, where that text's image places them (`placedShown`), so words the
 * board minted since the model's text was read stand where they are shown;
 * else every stretch of it, read as one of the model's text, the edits left
 * standing (M-DERIVE's `fromBase`). In any other text, the stretch itself.
 * @param {string} addr
 * @param {{pos: number, width: number}} run the stretch, by the board's positions
 * @param {ISpan[]} [ids] its bytes by identity, where they are named
 * @returns {Array<{pos: number, width: number}>} its stretches in the text shown (`shownOf`)
 */
export function fromBoard(addr, run, ids = []) {
  const d = REC.has(addr) ? shownOf(addr) : null;
  if (!d || !d.derived) return [{ pos: run.pos, width: run.width }];
  const placed = ids.length ? REC.placedIn(d.image, ids) : [];
  return placed.length ? placed : fromBase(d, run.pos, Math.max(1, run.width));
}

/**
 * Where the first of some bytes still standing stands in the text the page
 * shows of a document (see the head; M-REC's `firstPlacedIn`): the bytes
 * taken in their own order, the position of the first that text's image
 * places; null where it places none of them.
 * @param {string} addr
 * @param {ISpan[]} ids the bytes, by identity, in their own order
 * @returns {number | null} a position of the text shown (`shownOf`)
 */
export const firstStanding = (addr, ids) => (REC.has(addr) ? REC.firstPlacedIn(shownOf(addr).image, ids) : null);

/**
 * @typedef {Object} Removal — a stretch of bytes one of the page's own edits removed from a draft and no edit since put back (`removals`)
 * @property {number} of the edit that removed them, an index into the draft's edits (W-WRITE's `edits`)
 * @property {number} from the first of the bytes it removed that the stretch holds, counted from 0
 * @property {number} width how many
 * @property {number} at where they stood, as a position of the text shown now: the removal point
 * @property {ISpan[]} ids the bytes, by identity
 */

/**
 * The page's own record of the bytes its edits removed from a draft and have
 * not put back (see the head; W-WRITE's `edits`): each stretch, by the edit that
 * removed it, its bytes by identity, and the removal point as the edits since
 * moved it. What a return reads to say the person removed a passage, and what
 * a put-back places again (`putBack`).
 * @param {string} addr
 * @returns {Removal[]}
 */
export function removals(addr) {
  if (!REC.has(addr)) return [];
  const edits = WRITE.edits(addr), took = removedBy(REC.doc(addr));
  /** @type {Removal[]} */
  const out = [];
  for (const [i, e] of edits.entries()) {
    // the edits since moved each removal point: before the edit it stands, inside what it removed at its place, after it by what it changed
    const grew = e.back ? e.back.width : byteLength(e.text);
    for (const r of out) r.at = r.at >= e.pos + e.width ? r.at + grew - e.width : r.at > e.pos ? e.pos : r.at;
    if (e.back) { const b = e.back; for (const r of [...out]) if (r.of === b.of) out.splice(out.indexOf(r), 1, ...lessBack(r, b.from, b.from + b.width)); }
    const ids = took[i];
    if (ids && e.width > 0) out.push({ of: i, from: 0, width: e.width, at: e.pos, ids });
  }
  return out.sort((a, b) => a.at - b.at || a.of - b.of || a.from - b.from);
}

/** a removal less the stretch of its bytes [lo, hi) an edit put back: what of it is still removed, before and after that stretch */
function lessBack(/** @type {Removal} */ r, /** @type {number} */ lo, /** @type {number} */ hi) {
  /** @type {Removal[]} */
  const out = [];
  const end = r.from + r.width, part = (/** @type {number} */ a, /** @type {number} */ b) => { if (b > a) out.push({ ...r, from: a, width: b - a, ids: cutIds(r.ids, a - r.from, b - a) }); };
  part(r.from, Math.min(end, lo)); part(Math.max(r.from, hi), end);
  return out;
}

/** bytes named by identity cut to `width` of them from the `from`-th, in their order */
function cutIds(/** @type {ISpan[]} */ ids, /** @type {number} */ from, /** @type {number} */ width) {
  /** @type {ISpan[]} */
  const out = [];
  let at = 0;
  for (const x of ids) {
    const lo = Math.max(from, at), hi = Math.min(from + width, at + x.width);
    if (lo < hi) out.push({ prefix: x.prefix, ordinal: x.ordinal + (lo - at), width: hi - lo });
    at += x.width;
  }
  return out;
}

/** the bytes two sets of identity share, as the first names them: each run of `ids` cut to what `of` names too */
function shared(/** @type {ISpan[]} */ ids, /** @type {ISpan[]} */ of) {
  /** @type {ISpan[]} */
  const out = [];
  for (const a of ids) for (const b of of) {
    if (a.prefix !== b.prefix) continue;
    const lo = Math.max(a.ordinal, b.ordinal), hi = Math.min(a.ordinal + a.width, b.ordinal + b.width);
    if (lo < hi) out.push({ prefix: a.prefix, ordinal: lo, width: hi - lo });
  }
  return out;
}

/** how many bytes a set of identity names */
const widthOfIds = (/** @type {ISpan[]} */ ids) => ids.reduce((n, x) => n + x.width, 0);

/**
 * What the page's own record holds of the removal of some bytes from a draft
 * (see the head; `removals`): the stretches of its removals that took any of
 * them, in the text's order, and whether they took every one the text shown
 * no longer holds — the page then knows the whole cause of what is missing,
 * and a put-back restores it (`putBack`).
 * @param {string} addr
 * @param {ISpan[]} ids the bytes, by identity
 * @returns {{took: Removal[], all: boolean, at: number | null}} `took` each removal's stretch among them; `all` every byte of them the text shown lacks was taken by one; `at` the first removal point, null where the page removed none of them
 */
export function removedOf(addr, ids) {
  /** @type {Removal[]} */
  const took = [];
  for (const r of removals(addr)) {
    // the stretch of the removal that holds any of the bytes: from its first such byte to its last
    let lo = Infinity, hi = -Infinity, at = 0;
    for (const x of r.ids) { for (const y of shared([x], ids)) { lo = Math.min(lo, at + y.ordinal - x.ordinal); hi = Math.max(hi, at + y.ordinal - x.ordinal + y.width); } at += x.width; }
    if (hi > lo) took.push({ ...r, from: r.from + lo, width: hi - lo, ids: shared(cutIds(r.ids, lo, hi - lo), ids) });
  }
  const standing = REC.has(addr) ? REC.placedIn(shownOf(addr).image, ids).reduce((n, s) => n + s.width, 0) : 0;
  const missing = widthOfIds(ids) - standing, taken = took.reduce((n, r) => n + widthOfIds(r.ids), 0);
  return { took, all: took.length > 0 && missing > 0 && taken >= missing, at: took.length ? took[0].at : null };
}

/**
 * Bytes the page's own edits removed from a draft put back in the text shown
 * (see the head; B3-S7's "put back in the current text"): each stretch of
 * them placed again at its own removal point by its identity (M-REC's
 * `Edit.back`), the last in the text first so no placing moves another's
 * point, all of them one step (W-WRITE's `addEdits`). Nothing is composed or
 * sent (FP-14). Nothing where the page's record holds no removal of them.
 * @param {string} addr
 * @param {ISpan[]} ids the bytes, by identity
 * @returns {Array<{pos: number, width: number}>} where they stand in the text shown once put back, in its order
 */
export function putBack(addr, ids) {
  const { took } = removedOf(addr, ids);
  if (!took.length) return [];
  WRITE.addEdits(addr, [...took].reverse().map((r) => ({ pos: r.at, width: 0, text: '', back: { of: r.of, from: r.from, width: r.width } })));
  // the caret holds its place by the byte it stands before: words put back at or before it move it on with that byte
  if (caret_ && caret_.addr === addr) { let pos = caret_.pos; for (const r of [...took].reverse()) if (pos >= r.at) pos += r.width; if (pos !== caret_.pos) caret_ = { ...caret_, pos }; }
  markDirty();
  return REC.placedIn(shownOf(addr).image, ids);
}

/**
 * The article's view state, from the owners' readers and LK: a byline's
 * facts the model's for its owner's account (M-REC's `accountKey`), never
 * this device's key; every fit it judges measured as the platform sets the
 * words (`widthOf`); on the plane, the newer version its corner offers to
 * read (the reader `newer`), a reading scene's pane handing its own in. The
 * links are placed by their bytes in the record handed in (LK's `shown`,
 * `symbols`, `countAt`), so a derived record draws them on the bytes its image
 * holds — a byte the page made among them once the board has minted it — and
 * none on a byte it has not. The walk's focus and the selection are spans of
 * the text shown (N-WALK's, O-SELECTION's).
 */
export function viewFor(/** @type {Doc} */ d, scene = false) {
  /** @type {ArticleView} */
  const v = {
    selected: read.selection(), focus: litFocus(scene),
    marks: LK.shown(d.addr, d), mergedMark: LK.mergedMark, symbols: LK.symbols(d.addr, d), says: farShort, countAt: (b) => LK.countAt(d.addr, b, d),
    wholeLinks: LK.wholeLinks(d.addr).length,
    reader: REC.reader(),
    ...cornerFacts(d),
    read: scene ? null : read.newer(d.addr),
    scene,
    clauseOf, keyOf: REC.accountKey,
    keptOpen: openStatements.has(d.addr),
    cpl: scene ? MEASURE_CPL : measure(),
    measure: widthOf,
  };
  return v;
}

/**
 * An origin document's kind as the page reads it, by the one test (`isDraft`;
 * FP-39): a draft, an edition, or unknown where nothing has told it. The one
 * reading the plane's and a pane's statements of a transcluded origin and the
 * ARIA mirror's description of it take, each as it stands (FP-33). No record
 * of the origin is made to answer.
 * @param {string} origin
 * @returns {'edition' | 'draft' | 'unknown'}
 */
export function originKind(origin) {
  const draft = isDraft(origin);
  return draft === true ? 'draft' : draft === false ? 'edition' : 'unknown';
}

/**
 * Does a transcluded run the reader reads carry C-33's words (foundations
 * §2.1): a draft's run in a published document, the document's kind read by
 * the one test as its corner reads it (`isDraft`; FP-39). The one rule its
 * origin's statement on the plane and in a reading scene's pane (`placeSigns`;
 * SC) and the ARIA mirror's description of its origin (N-WALK) are made by.
 * @param {Doc} d the record of the document the run stands in, as the face stating it holds it: the version a box shows, a pane's own
 * @param {'edition' | 'draft' | 'unknown'} kind its origin's kind (`originKind`)
 * @returns {boolean}
 */
export const carriesC33 = (d, kind) => kind === 'draft' && isDraft(d) === false;

/**
 * The chain's count a box's corner names (T-ARTICLE's `ArticleView.members`):
 * its box's document's, where the board ended the chain there (M-REC's
 * `Doc.ended`) — every version of the box sharing it; null where the model
 * holds no count, or one not known to be the whole chain, so no corner
 * claims a total the board did not give.
 * @param {string} addr a document, or any version of it
 * @returns {number | null}
 */
export function chainOf(addr) {
  const box = REC.has(boxOf(addr)) ? REC.doc(boxOf(addr)) : null;
  return box && box.ended ? box.members : null;
}

/**
 * What a document's corner states its state from (T-ARTICLE's `CornerFacts`):
 * its box's chain (`chainOf`), the board's lag (`lags`), the venue, the local
 * trust flag, a draft's kept state, the one owner rule and its kind by the
 * one test (`kindOf`) — the corner's view's own (`viewFor`), read without the
 * links the rest of the view reads.
 * @param {Doc} d
 * @returns {import('./article.js').CornerFacts}
 */
function cornerFacts(d) {
  const h = REC.health();
  return { members: chainOf(d.addr), lags: lags(), notebook: true, localTrust: !!(h && h.auth && h.auth.local_trust), kept: WRITE.keptOf(d.addr), originOwner, kind: kindOf(d) };
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
 * column slot where its extent is unread — each beneath its head's band
 * where its corner stands at its head (`headBand`). Folded again only where
 * the plans, the extent, the positions held, the lines set or the head's
 * rows changed, however often the model moves. Every size it answers is one the camera's zoom-in bound
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
 * The nearest scale at which a document is below its reading scale (see the
 * head): its own em a millionth under P-LOD's readable threshold, so
 * `atReadingScale` answers false there with room to spare for the camera's
 * arithmetic.
 * @param {string} addr
 * @returns {number}
 */
export function scaleBelowReading(addr) { return (LOD_TXT_LO / foldOf(REC.doc(addr)).fs) * (1 - 1e-6); }

/**
 * The fold `foldOf` answers (see there).
 * @param {Doc} d
 * @returns {Fold}
 */
function folded(d) {
  d = shownDoc(d);
  const room = docBox(d.addr), cpl = measure(), head = headKey(d);
  if (d.from < 0) {
    const key = `${d.extent != null ? `est:${d.extent}` : 'slot'}:${cpl}${head ? `:${head}:${REC.rev()}:${WRITE.rev()}` : ''}`;
    const f = folds.get(d.addr);
    if (f && f.key === key) return f.fold;
    const band = head ? headBand(d, viewFor(d)) : 0, plan = `${d.extent}|${cpl}|${band}`;
    if (f && f.plan === plan) { folds.set(d.addr, { key, plan, fold: f.fold, set: false }); return f.fold; }
    const out = d.extent != null ? estimate(d.extent, room, cpl, band) : slot(room, cpl, band);
    folds.set(d.addr, { key, plan, fold: out, set: false });
    return out;
  }
  const key = `${d.rev}:${d.from}:${d.to}:${REC.rev()}:${WRITE.rev()}:${grev}:${cpl}:${head}`;
  const f = folds.get(d.addr);
  if (f && f.key === key) return f.fold;
  const v = viewFor(d), owner = REC.ownerAccount(d);
  const now = articlePlan(d, v, owner);
  const m = measured.get(d.addr), set = m && m.key === layoutKey(d, v, owner, cpl) ? m : null;
  const u = LK.utmost(d.addr, d);
  const rows = articlePlan(d, { ...v, marks: u.shown, symbols: u.shown }, owner);
  const after = Math.max(0, (d.extent || 0) + 1 - d.to);
  const band = headBand(d, v);
  const plan = `${cpl}|${d.extent}|${d.from}|${d.to}|${JSON.stringify(rows)}|${JSON.stringify(now)}|${set ? set.n : 0}|${band}`;
  if (f && f.plan === plan) { folds.set(d.addr, { key, plan, fold: f.fold, set: !!set }); return f.fold; }
  const opts = { after, heldTo: d.to, cpl, band };
  const most = fold(gapped(d, layoutOf(rows, cpl).lines), room, opts);
  const out = fold(gapped(d, set ? set.lines : layoutOf(now, cpl).lines), room, { ...opts, step: most.step });
  folds.set(d.addr, { key, plan, fold: out, set: !!set });
  return out;
}

/**
 * What a document's head's rows are read from beside the model (see the head;
 * `headBand`): the fit's measure and reading size, the board's lag, the newer
 * version its corner offers, its kept clause — '' where its corner stands
 * beside its column, so no other fit reads any of them.
 * @param {Doc} d
 * @returns {string}
 */
function headKey(d) {
  const F = fit();
  if (!F.head) return '';
  const k = keptIn(d.addr);
  return JSON.stringify([F.cpl, F.px, CHAR_W, lags(), read.newer(d.addr), k ? k.text : null]);
}

/** a corner's words' width at the interface's size, in px (`measureRun`) */
const cornerPx = (/** @type {string} */ text) => measureRun(text, CORNER.px, 'normal', 'client');

/** the lines a corner's words take wrapped at their spaces at a width, at the interface's size */
function linesAt(/** @type {string} */ words, /** @type {number} */ width) {
  const space = cornerPx(' ');
  let n = 1, x = 0;
  for (const w of words.split(' ')) {
    const ww = cornerPx(w);
    if (x > 0 && x + space + ww > width + 1e-6) { n++; x = ww; } else x += (x > 0 ? space : 0) + ww;
  }
  return n;
}

/** the width of the count the items a head's rows cannot hold fold into, "⟨n⟩ more" (`headLayout`) */
const moreWidth = (/** @type {number} */ n) => cornerPx(t('L.corner.more', { n }));

/** a kept clause's width where it follows its document's address on a head's first row: at the address's size, its words whole (`docLabel`) */
const clauseWidth = (/** @type {{text: string}} */ k) => measureRun(k.text, ADDRESS.px, 'normal', 'client');

/** the least room a document's name keeps on its head's first row: its address whole at its one size, so whether its region is named moves no row (`docLabel`) */
const nameWidth = (/** @type {Doc} */ d) => measureRun(d.addr, ADDRESS.px, ADDRESS.weight, 'ident');

/** a corner's items as a head's rows read them (`headLayout`): each one's width at the interface's size, its words, and whether it yields */
const headItems = (/** @type {import('./article.js').CornerItem[]} */ items) => items.map((i) => ({ w: i.em * CORNER.px, yields: i.yields, words: i.words }));

/**
 * The depth a document's head takes above its first row, in the body's em
 * (`Fold.band`; see the head): its rows at the reading size and the view's
 * fit (`headLayout`) — the head across its column's text and edge, its rows
 * at the reading line's pitch — the name's room and the kept clause counted
 * whether or not the one line names it, so the depth never moves with the
 * camera; none where its corner stands beside its column. Every corner
 * carries an item — its kind's slot, else a refused document's own words.
 * @param {Doc} d
 * @param {ArticleView} v its view (`viewFor`)
 * @returns {number}
 */
function headBand(d, v) {
  const F = fit();
  if (!F.head) return 0;
  const items = cornerItems(d, v, true, false);
  const k = keptIn(d.addr), pitch = LINE_H * F.px;
  const L = headLayout(headItems(items), nameWidth(d), k ? { w: clauseWidth(k), words: k.text } : null, (F.cpl * CHAR_W + EDGE) * F.px, pitch);
  return L.rows * LINE_H;
}

/**
 * A corner's rows at its document's head (see the head; FP-26): on its first
 * row the document's name — the least it keeps, its address (`name`) — then
 * the kept clause, then the corner's items in their one order while they fit,
 * all after the name standing at the row's end and the name's room before
 * them (`HeadLayout.name`); an item that never yields and does not fit beside
 * those before it wrapped whole onto the next row — kept on its own row where
 * nothing stands before it, as on a first row a name of no room leaves empty —
 * its words wrapped where it is wider than the head, taking the rows they need
 * at `pitch` (`linesAt`); an item that yields and does not fit beside those
 * before it folded into the count, "⟨n⟩ more", which takes the next slot
 * after the last placed.
 * @param {Array<{w: number, yields: boolean, words: string}>} items the corner's items, compact, at the interface's size (`headItems`)
 * @param {number} name the least room the name keeps, px (`nameWidth`)
 * @param {{w: number, words: string} | null} clause the kept clause (`clauseWidth`); null where none stands
 * @param {number} width the head's width, px
 * @param {number} pitch its rows' pitch, px
 * @returns {HeadLayout}
 */
export function headLayout(items, name, clause, width, pitch) {
  /** @type {HeadSlot[]} */
  const slots = [];
  let row = 0, x = name, folded = 0;
  const at = () => (x > 0 ? x + HEAD_GAP : 0);
  /** a slot placed on the row standing at `x`, else whole on the next, its words wrapped where it is wider than the head */
  const place = (/** @type {number} */ k, /** @type {number} */ w, /** @type {string} */ words, /** @type {boolean} */ yields) => {
    if (at() + w <= width + 1e-6) { slots.push({ k, row, x: at(), w, rows: 1 }); x = at() + w; return; }
    if (yields) { folded++; return; }
    if (x > 0) row += 1;
    if (w <= width + 1e-6) { slots.push({ k, row, x: 0, w, rows: 1 }); x = w; return; }
    const rows = Math.max(1, Math.ceil(linesAt(words, width) * CORNER_LINE / pitch - 1e-9));
    slots.push({ k, row, x: 0, w: width, rows });
    row += rows - 1; x = width;
  };
  if (clause) place(-1, clause.w, clause.words, false);
  items.forEach((it, k) => place(k, it.w, it.words, it.yields));
  if (folded) place(-2, moreWidth(folded), t('L.corner.more', { n: folded }), false);
  // the first row's slots stand at its end, the name's room before them
  const end0 = Math.max(name, ...slots.filter((s) => s.row === 0).map((s) => s.x + s.w)), shift = Math.max(0, width - end0);
  for (const s of slots) if (s.row === 0) s.x += shift;
  return { rows: row + 1, slots, name: name + shift, folded };
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

/**
 * Where the words of a version a box shows are read (`Where`; FP-27): the
 * version itself; the member its text is — a version's own address, else, at
 * a published document's plain address (the one test's, `isDraft`; FP-39), the
 * head of the chain its corner states (T-ARTICLE's `statedChain`, over its
 * box's count, `chainOf`), so a copy names the member the corner names
 * (FP-22); and whether it is that plain address. A draft names no member, nor
 * a plain address nothing has told published.
 * @param {Doc} d the model's record of the version a box shows
 * @returns {Where}
 */
function shownWhere(d) {
  if (memberOf(d.addr) != null) return { doc: d.addr, member: d.addr, plain: false };
  const published = !d.refused && isDraft(d) === false, n = published ? statedChain(d, chainOf(d.addr)) : null;
  return { doc: d.addr, member: n != null ? versionAddress(d.addr, n) : null, plain: published };
}

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

/** the visible view in world units: the viewport below the one line, unpadded — with the camera where it stands, or at a view it is bound for — below the line's bottom as it stands, or another */
function seenWorld(/** @type {{x: number, y: number, scale: number} | null} */ at = null, top = read.top()) {
  const s = visibleView(top);
  if (!at) return { x0: wx(s.x), y0: wy(s.y), x1: wx(s.x + s.w), y1: wy(s.y + s.h) };
  const { VW, VH } = viewport(), x = (/** @type {number} */ px) => (px - VW / 2) / at.scale + at.x, y = (/** @type {number} */ py) => (py - VH / 2) / at.scale + at.y;
  return { x0: x(s.x), y0: y(s.y), x1: x(s.x + s.w), y1: y(s.y + s.h) };
}

/** the visible view's centre in world units — the viewport's below the one line, as it stands or below another bottom of it — with the camera at a view (`readAt`) */
function centreAt(/** @type {{x: number, y: number, scale: number}} */ at, top = read.top()) {
  const v = seenWorld(at, top);
  return { x: (v.x0 + v.x1) / 2, y: (v.y0 + v.y1) / 2 };
}

/**
 * Does a document stand in the visible view (see the head): its region meeting
 * the viewport below the one line, unpadded — any of its text or box, or the
 * strip its corner stands in (`meetsView`).
 * @param {string} addr
 * @param {{x: number, y: number, scale: number} | null} [view] the view it is read at: the camera's where none is given — a departure's, bound for a flight's destination, where the view is bound elsewhere
 */
export function inView(addr, view = null) { return meetsView(regionOf(addr), view); }

/**
 * Does a world rect meet the visible view (see the head): the viewport below
 * the one line, unpadded — a document's region (`inView`), or an account's or
 * a mark's cell the walk stood on (N-GO's).
 * @param {Rect} r
 * @param {{x: number, y: number, scale: number} | null} [view] the view it is read at: the camera's where none is given
 */
export function meetsView(r, view = null) { return intersects(r, seenWorld(view)); }

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
 * The middle of the line holding a position of the text shown (`shownOf`), in
 * world units: centred across its column (P-LAY's `placeOf`); the first
 * column's centre where no position is named — what a reading view frames
 * (`frameOf`) and Back's test of a line in view reads (`lineInView`).
 * @param {string} addr
 * @param {number | null} pos a position of the text shown
 * @returns {{x: number, y: number}}
 */
export function centreOf(addr, pos) {
  const f = foldOf(REC.doc(addr)), box = docBox(addr);
  if (pos == null) { const c = f.columns[0]; return { x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2 }; }
  const p = placeIn(f, pos);
  return { x: box.x + p.x + p.w / 2, y: box.y + p.y + p.h / 2 };
}

/**
 * Where a reading view of a document at a position of the text shown
 * (`shownOf`) centres so that it frames the column (FP-26), and the em of the
 * fold it frames: the line holding the
 * position (`centreOf`) — the first column's middle where none is named — in
 * the document's lines as rendered, set first where they are not
 * (`renderedFold`), moved across so the column's text, the corner beside it
 * on its left in the form its room and the view's fit hold at that size and
 * its edge on its right stand centred together (`frameAcross`); where none is
 * named, the first column — the head's band above it, where the corner stands
 * at the document's head — centred where the visible view below the one line
 * holds it, else moved down so the column's outline tops the visible view and
 * the document's head stands in it, never under the line (FP-37). N-GO's
 * landing and N-WALK's flight to a span read it, the view's
 * scale from its em (P-CAM's `viewAt`), so the place and the size are one
 * fold's, and read it again each frame as the camera flies there (P-CAM's
 * `Aim`), so it lands on the fold its document is set in then; the measure in
 * force is one the view holds them at, at the landing's em (P-LAY's `fitFor`,
 * P-CAM's `landingPx`).
 * @param {string} addr
 * @param {number | null} pos a position of the text shown
 * @param {number} [fsPx] the em the view reads the document at, in px: the landing's where none is given
 * @returns {{x: number, y: number, fs: number}} the view's centre, and the document's em in the fold it frames, in world units
 */
export function frameOf(addr, pos, fsPx = landingPx()) {
  const f = renderedFold(REC.doc(addr)), c = centreOf(addr, pos), scale = fsPx / f.fs, box = docBox(addr);
  const x = box.x + frameAcross(addr, f, pos == null ? 0 : Math.max(0, placeIn(f, pos).column), fsPx), seen = visibleView(read.top());
  const first = f.columns[0];
  if (pos != null) return { x, y: c.y, fs: f.fs };
  if ((first.h + f.band) * scale <= seen.h) return { x, y: box.y + first.y + (first.h - f.band) / 2, fs: f.fs };
  const { VH } = viewport();
  return { x, y: box.y + padded(f, first).y + (VH / 2 - seen.y) / scale, fs: f.fs };
}

/**
 * Where a reading view of a fold's column centres across, in world units
 * relative to its room (FP-26): the column's text, the corner beside it on its
 * left in the form its room and the view's fit hold at `fsPx` (`roomBeside`,
 * `formFor`; none where the corner stands by its row's first column, or at
 * its document's head) and its edge on its right, centred together.
 * `frameOf` reads it, and a passage held through a change of the fit
 * (`keepPlace`, `keptAt`).
 * @param {string} addr
 * @param {Fold} f
 * @param {number} column an index into its columns
 * @param {number} fsPx the em the view reads it at, in px
 * @returns {number}
 */
function frameAcross(addr, f, column, fsPx) {
  const c = f.columns[column], scale = fsPx / f.fs, at = roomBeside(f, clearLeftOf(addr), column, scale);
  const corner = fit().head ? 0 : at.first || at.room >= cornerWidth(true) ? cornerWidth(formFor(at.room, false, fit().compact) === 'compact') + CORNER_GAP : 0;
  return c.x + c.w / 2 + (EDGE * fsPx - corner) / 2 / scale;
}

/** the fit a passage is read under (P-CAM's `fit`, P-LAY's advance): an article set again under another frames its passage sideways (`keepPlace`, `keptAt`) */
const fitKey = () => { const F = fit(); return `${F.cpl}|${F.compact}|${F.head}|${F.px}|${CHAR_W}`; };

/**
 * Does the line holding a position stand in the visible view with the camera
 * at a view — its centre (`centreOf`) inside the viewport below the one line
 * there: N-GO's Back, which returns the focus to where the step it crossed
 * began only where the view it lands at shows it.
 * @param {string} addr
 * @param {number} pos a position of the text shown (`shownOf`)
 * @param {{x: number, y: number, scale: number}} view
 * @returns {boolean}
 */
export function lineInView(addr, pos, view) {
  const c = centreOf(addr, pos), v = seenWorld(view);
  return c.x >= v.x0 && c.x <= v.x1 && c.y >= v.y0 && c.y <= v.y1;
}

/**
 * Does a line of a span of a document's text stand in the visible view: the
 * middle of a line of its fold holding a position of the span inside the
 * viewport below the one line, as `lineInView` reads one line
 * (`foldBoxes`). N-WALK's hold on the kept caret's span reads it.
 * @param {string} addr
 * @param {number} pos the span's first position in the text shown
 * @param {number} width
 * @returns {boolean}
 */
export function spanInView(addr, pos, width) {
  const s = visibleView(read.top());
  return foldBoxes(addr, pos, width).some(({ rect: r }) => {
    const x = r.x + r.w / 2, y = r.y + r.h / 2;
    return x >= s.x && x <= s.x + s.w && y >= s.y && y <= s.y + s.h;
  });
}

/**
 * The position under a world point of a document's fold (P-LAY's `posAt`): a
 * position of the text shown (`shownOf`), which N-WALK's re-take and → read;
 * null where the column under it holds no line naming one.
 * @param {string} addr
 * @param {number} x
 * @param {number} y
 */
export function posAt(addr, x, y) { const box = docBox(addr); return posIn(foldOf(REC.doc(addr)), x - box.x, y - box.y); }

/** does a world rect hold a point? */
const holds = (/** @type {Rect} */ r, /** @type {{x: number, y: number}} */ p) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;

/** the visible view's centre, in world units: the viewport's below the one line — as it stands, or as it stood below another bottom of the line's */
function viewCentre(top = read.top()) { const s = visibleView(top); return { x: wx(s.x + s.w / 2), y: wy(s.y + s.h / 2) }; }

/** the one line's bottom as the reader last saw it (see the head): as the layer last framed it, else as it stands */
const seenTop = () => (Number.isFinite(framedTop) ? framedTop : read.top());

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
 * the scale it stands at — where the corner stands at the document's head, a
 * first-row column's band with it, and a later column's text just below the
 * head's first row held under the line (`placeHead`), so no line opens under
 * it; null where the paging pages as it does elsewhere.
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
  const top = f.band > 0 && !to.first ? f.columns[to.column].y - HOLD.gap / cam.scale - LINE_H * f.fs : to.top;
  return { x: box.x + to.x, y: box.y + top + (VH / 2 - seen.y) / cam.scale, scale: cam.scale };
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
 * below `y` — a line opened by a symbol opening before that symbol; null
 * where no character lies below it.
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
  const chrome = a.node.parentElement ? /** @type {HTMLElement | null} */ (a.node.parentElement.closest('.sym')) : null;
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
  for (const sp of [span, caretSpanIn(rec)]) {
    const ls = spanLines(rec, sp);
    if (ls) for (const p of rec.parts) if (p.first <= ls[1] && ls[0] < p.end) out.add(p);
  }
  return out;
}

/** the caret as a span of one position of a mounted article's text, where the caret stands in it — the text's last position at its end — so its line is held and stood as the selection's are; null where it stands elsewhere, or the article holds no text */
function caretSpanIn(/** @type {Mounted} */ rec) {
  if (!caret_ || caret_.addr !== rec.d.addr || rec.d.from < 0) return null;
  return { addr: caret_.addr, pos: Math.max(rec.d.from, Math.min(caret_.pos, rec.d.to - 1)), width: 1 };
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

/** a unit a part takes up to a cut: the first element no text of which stands before the cut left out, and a run's closing given up in each element the cut falls inside, which goes on past it */
function closed(/** @type {HTMLElement} */ el, /** @type {Cut} */ cut) {
  /** @type {Node} */
  let n = el;
  for (const had of cut.before) {
    const next = n.lastChild;
    if (!next || next.nodeType !== Node.ELEMENT_NODE) return;
    if (!had) { /** @type {HTMLElement} */ (next).remove(); return; }
    /** @type {HTMLElement} */ (next).classList.remove('closes');
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
  for (const w of [...win, ...endsOf(rec, span), ...endsOf(rec, caretSpanIn(rec))]) for (const g of gapsIn(rec, w)) { const p = addPart(rec, g); if (p) added.push(p); }
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
 * A mounted article's runs of other documents' material as its column's edge
 * reads them (see the head; `RunAt`; T-ARTICLE's `originRunsOf`): each its
 * identity through the image the article was made from and the lines of its
 * fold that set it — a withheld run's its block's, with what its gap holds,
 * decided over the view it was made with as its gap was (T-ARTICLE's
 * `gapHolds`); a transcluded run's from the line its first character stands
 * on to the one its last does (T-ARTICLE's `textIn`), the run's own positions
 * where no typed line holds a character of it, its key in the edge. None for
 * a run its fold holds no line for.
 * @param {Doc} d the record the article was made from
 * @param {Made} made what the article was made from
 * @param {ArticleView} view the view it was made with
 * @param {Unit[]} units its fold's lines by the row elements that set them
 * @param {Fold} f its fold
 * @returns {RunAt[]}
 */
function originRunsAt(d, made, view, units, f) {
  const cpl = view.cpl ?? MEASURE_CPL;
  return originRunsOf(d).flatMap(/** @returns {RunAt[]} */ (run) => {
    const [byte] = REC.identityIn(made.image, run.pos, 1), id = byte ? `${run.origin} ${byte.prefix}.${byte.ordinal}` : `${run.origin} @${run.pos}`;
    if (run.withheld) {
      const b = made.blocks.find((x) => x.pos === run.pos), u = units.find((x) => x.pos === run.pos);
      if (!b || !u) return [];
      const p = placeholderOf(b, view.reader, view.originOwner, view.clauseOf);
      const ends = view.marks.filter((s) => !!s.run && s.run.pos === b.pos).length;
      return [{ run, b, id, holds: gapHolds(p, b.width, cpl, view.measure, ends), first: u.first, end: u.end }];
    }
    const at = textIn(made.blocks, run) || { from: run.pos, to: run.pos + run.width };
    const first = placeIn(f, at.from).line, last = placeIn(f, at.to - 1).line;
    return first == null || last == null ? [] : [{ run, b: null, id, holds: 'edge', first, end: last + 1 }];
  });
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
  const base = d;
  d = shownDoc(d);
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
  const units = unitsOf(f.lines, made.blocks);
  /** @type {Mounted} */
  const rec = {
    el, d, lay, runFrom: base.from, runTo: base.to, rev: base.rev, editRev: WRITE.editRev(d.addr), made, where: shownWhere(base), grev, fold: f, fs: f.fs, corner: cornerOfView(d, view),
    template, units, cuts: new Map(), parts: [], lines: new Set(), banded, scale: 1, blockTops: [], marked: [], markedFor: '', litFor: null, labelFor: null, legible: false, fit: fitKey(),
    runs: originRunsAt(d, made, view, units, f),
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
  d = shownDoc(d);
  const v = viewFor(d), owner = REC.ownerAccount(d);
  setLines(d, articlePlan(d, v, owner), articleOf(d, v, owner), d.blocks, layoutKey(d, v, owner, measure()));
}

/**
 * A document's fold on its lines as rendered (see the head): its lines set as
 * the platform sets them first where its fold does not stand on them at the
 * measure in force — the layer's style set to that measure (`setMeasure`),
 * its article laid out aside (`measureAside`) — so a view placed on it now is
 * placed on the lines its article mounts in (`frameOf`, `keptAt`). The fold
 * as it stands where the platform does not set the articles, or the page
 * holds none of the document's text.
 * @param {Doc} d
 * @returns {Fold}
 */
function renderedFold(d) {
  const f = foldOf(d);
  if (!engine || !layer || d.from < 0 || (folds.get(d.addr) || { set: true }).set) return f;
  setMeasure();
  measureAside(d);
  return foldOf(d);
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
 * since (M-REC's `readFailed`) — undecided (T-ARTICLE's `CLAUSE_READING`) while the
 * lookup or a read a listed claim's admission waits on is out. The origin's
 * statement in the edge on the plane and in a pane, the ARIA mirror's
 * description of the origin, the run's card and the document's own withheld
 * face all read it (T-ARTICLE's `placeholderOf`, O-FACES), so none of them
 * part (R94; FP-33).
 * @param {string} origin
 * @returns {import('./article.js').Decided}
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
 * one owner rule (M-REC's `ownerAccount`). The face a refused read of it
 * conjures (O-FACES's `withheld`) reads it; its corner states the same words,
 * which the ARIA mirror's item leads with (`mirrorLead`); and its
 * first line names it in the same words, bracketed (T-ARTICLE's
 * `firstLineOf`) — the box's label, a trail entry's words — so what a
 * sighted reader sees and what a screen reader hears never part (R94).
 * @param {Doc} d
 */
export function withheldBox(d) { return t('F.corner.withheld', { owner: REC.ownerAccount(d) }); }

/** a box's address as its label sets it where its region is named in view: the address of the version it shows past its region's prefix, led by the separator after the prefix — ".0.9", a pinned version's ".0.9.2", as the address display spells a field past a prefix (F-9; foundations §3.1) */
export const shortAddr = (/** @type {Doc} */ d) => (d.account ? d.addr.slice(d.account.length) : d.addr);
/**
 * Is a document a draft — the one test its kind is read by (FP-39, FP-33),
 * which decides its corner's first slot (`kindOf`), its box's edge below its
 * reading scale (P-RENDER's), whether its text is one the person may edit
 * (`editable`), where a copy says its words were read (`shownWhere`), C-33's
 * words at a transcluded run (`carriesC33`, `originKind`) and C-45 at a key
 * typed in it (N-KEYS'): its metadata's word, where a read answered it; else
 * the kind the model knows of its own record — its index row's, or its
 * metadata's at its box; else its box's listing in the index; null where none
 * of them answers. Asked by an address, it reads the record the model holds
 * of that address and makes none.
 * @param {Doc | string} of the record a face states — the version a box shows, a pane's own — or a document's address
 * @returns {boolean | null}
 */
export function isDraft(of) {
  const addr = typeof of === 'string' ? of : of.addr;
  const d = typeof of !== 'string' ? of : REC.has(of) ? REC.doc(of) : null;
  if (d && d.meta) return !d.meta.published;
  if (d && d.kind !== 'unknown') return d.kind === 'draft';
  const p = REC.place(boxOf(addr));
  return p ? p.kind === 'draft' : null;
}

/**
 * A document's kind as its corner's first slot states it (T-ARTICLE's `Kind`;
 * FP-34): a draft or published, by the one test (`isDraft`); not read, where
 * its metadata's read failed and nothing else tells it (M-REC's
 * `readFailed`); else being read.
 * @param {Doc} d
 * @returns {import('./article.js').Kind}
 */
export function kindOf(d) {
  const draft = isDraft(d);
  return draft === true ? 'draft' : draft === false ? 'published' : REC.readFailed(d.addr) ? 'unread' : 'reading';
}

/** a document's kind in its corner's first slot's words (`kindOf`; T-ARTICLE's `kindWord`): what a landing into the document says first (N-GO's `described`) */
export const kindSaid = (/** @type {Doc} */ d) => kindWord(kindOf(d)).text;

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

/** the quote around a document's own words where the mirror's item and a place's name say them (`mirrorLabel`) */
const QUOTE = /** @type {import('./article.js').Faced} */ ({ text: '"', face: 'client' });

/**
 * A version's label as the ARIA mirror's item says it (see the head): its
 * first line (`firstOf`), the document's own words quoted, the client's words
 * in their place bracketed; none at a withheld box, whose state says its
 * words (`mirrorState`).
 * @param {Doc} d the version a box shows, or a pane's record
 * @returns {import('./article.js').Faced[]}
 */
export function mirrorLabel(d) {
  const first = d.refused === 'withheld' ? [] : firstOf(d);
  return first.length && first.every((r) => r.face === 'reading') ? [QUOTE, ...first, QUOTE] : first;
}

/** the words of its first line a document's name keeps at the most (`placeName`) */
export const NAME_WORDS = 6;

/** how many words of a stretch a cut counts: those holding a letter or a figure, as P-LABEL's `cutWords` counts them */
const wordsIn = (/** @type {string} */ s) => s.split(' ').filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

/**
 * The name the status region gives a document (see the head): its label as
 * the mirror says it (`mirrorLabel`), NAME_WORDS of its words at the most —
 * cut on a word, the quote or the bracket it closes with kept after the cut's
 * ellipsis (P-LABEL's `cutWords`) — then the address it names; the address
 * alone where no first line is known.
 * @param {Doc} d the record its first line is read from: the version a box shows, a pane's own
 * @param {string} addr the address it names
 * @returns {string}
 */
export function placeName(d, addr) {
  const label = mirrorLabel(d), last = label[label.length - 1];
  const words = label.map((r) => r.text).join('').trim().replace(/\s+/g, ' ');
  if (!words) return addr;
  const close = last.face === 'client' && (last.text === QUOTE.text || last.text === CLIENT_CLOSE) ? last.text : '';
  const fits = (/** @type {string} */ s) => wordsIn(s) <= NAME_WORDS;
  const kept = fits(words) ? words : cutWords(words, fits, close);
  return kept ? `${kept} ${addr}` : addr;
}

/**
 * A box as the status region names it (`placeName`): by the version it
 * shows (the reader `shown`), the address that version's.
 * @param {string} addr the box, or the version it shows
 * @returns {{addr: string, name: string}} the address it names, and its name
 */
export function boxName(addr) {
  const shows = read.shown(boxOf(addr));
  return { addr: shows, name: placeName(REC.doc(shows), shows) };
}

/**
 * A link's far document's first line by the same rule (T-ARTICLE's
 * `firstLineOf`; LK's reader `first`): what the model holds of it, if
 * anything, and the index's first line at the address the link names.
 * @param {Doc | null} d its record as the model holds it; null where it holds none
 * @param {string | null} label the index's first line at its address, or null
 * @returns {import('./article.js').Faced[]}
 */
export const firstOfFar = (d, label) => firstLineOf(d, { label, reader: REC.reader(), owner: d ? REC.ownerAccount(d) : '' });

/** a box's lead, the words its label sets before its address, as words: its first line (`firstOf`), which names the document and carries no kind — its label on the plane, the one line after its field and a trail entry's words all read it */
export const firstLine = (/** @type {Doc} */ d) => firstOf(d).map((r) => r.text).join('');
/** a box's lead as a label on the plane sets it (`firstOf`), each stretch in its face (P-LABEL's `inFace`) */
export const labelLine = (/** @type {Doc} */ d) => firstOf(d).map((r) => (r.face === 'client' ? r.text : inFace(r.face, r.text))).join('');
/** a box's lead as markup (`firstOf`; ST's `facedHTML`), wherever the page's chrome shows it: the document's words in the reading face (`.reading`), an address the identifier's (`.id`) */
export const firstLineHTML = (/** @type {Doc} */ d) => facedHTML(firstOf(d));

/**
 * A box's lead as a label's part sets it (`firstOf`): at `px` in the
 * reading face's words, in the ink of the text it stands for, cut on a word,
 * the bracket its client's words close with kept after a cut's ellipsis
 * (P-LABEL's `cutWords`); null where no first line is known.
 * @param {Doc} d the version a box shows
 * @param {number} px
 * @returns {import('../plane/labels.js').Part | null}
 */
export function leadPart(d, px) {
  const runs = firstOf(d), last = runs[runs.length - 1];
  if (!last) return null;
  return { text: labelLine(d), px, ink: COL.text, fit: 'cut', close: last.face === 'client' && last.text === CLIENT_CLOSE ? CLIENT_CLOSE : '' };
}

/**
 * What the ARIA mirror's item leads with (R94): its corner's first item in
 * words, at any scale (T-ARTICLE's `cornerLead`, over `cornerFacts`) — its
 * kind, "being read" while no read has told it — or, for a document a read
 * refused, its own words: its withheld box's (`withheldBox`), or the words
 * for one the board says nothing of.
 * @param {Doc} d the version a box shows
 * @returns {string}
 */
export function mirrorLead(d) { return cornerLead(d, cornerFacts(d)); }

/**
 * A document's state as the ARIA mirror's item voices it after its first
 * line (R94): where a read answered its metadata, its corner's state after its
 * first item, whole, as its corner states it at any scale (T-ARTICLE's
 * `cornerWords`) — the version its box shows and the count of its chain among
 * it (FP-22); none where no read has answered its metadata, which claims
 * nothing a read has not told (FP-33), nor for a document a read refused,
 * whose own words lead its item (`mirrorLead`).
 * @param {Doc} d the version a box shows
 * @returns {string}
 */
export function mirrorState(d) { return d.refused || !d.meta ? '' : cornerWords(d, cornerFacts(d)); }

/**
 * @typedef {Object} KeptClause — what a kept document, or a kept part of one, says beside its sign (FP-23, FP-33): its string's id and its words
 * @property {'L.kept.text' | 'L.kept.links'} id
 * @property {string} text
 * @property {string} reason the failed read's words its text ends with (BM-HELD's `whyOf`); '' where no read failed
 * @property {number} since the stamp its ⟨when⟩ says (M-PUMP's `Kept.since`): the page's clock at the row or drop that left behind what stands
 */

/**
 * The clause a kept document carries while it stands held past a second as
 * it is read again (see the head; FP-23, FP-33): a draft holding its text
 * "as last read"; else, where its links are read, "links as last read" — an
 * edition's words never change, so its text takes none — each at the page's
 * clock at the row or drop that left it behind, the failed read's words
 * after it, keyed on the refusal that left it standing (BM-HELD's `whyOf`),
 * with no act, for its reads go again of themselves (FP-23). None where it is
 * not kept, a read refused it, or it holds neither.
 * @param {Doc} d the record whose text the surface shows: the version a box shows, a pane's
 * @param {Doc} links the record whose links it draws: the box's document (FP-22), a pane's own
 * @param {{met: import('../bridge/shapes').Refusal | null, since: number} | null} kept why its reads left it standing and the stamp it stands from (M-PUMP's `kept`); null where it is not kept
 * @param {number} [now] the page's clock
 * @returns {KeptClause | null}
 */
export function keptWords(d, links, kept, now = Date.now()) {
  if (!kept || d.refused) return null;
  if (isDraft(d) === true && d.from >= 0) return keptClause('L.kept.text', kept.since, kept.met, now);
  return links.linksRead ? keptClause('L.kept.links', kept.since, kept.met, now) : null;
}

/**
 * A kept clause's words (`keptWords`, `claimsKeptIn`, `boardKeptIn`): ⟨when⟩
 * its stamp as the page names it (ST's `lastRead`), the failed read's words
 * after it.
 * @param {KeptClause['id']} id
 * @param {number} at the page's clock at the row or drop that left behind what stands (M-PUMP's `Kept.since`)
 * @param {import('../bridge/shapes').Refusal | null} met
 * @param {number} now
 * @returns {KeptClause}
 */
function keptClause(id, at, met, now) {
  const clause = t(id, { when: lastRead(at, now) }), reason = met ? t(whyOf(met)) : '';
  return { id, text: reason ? t('L.kept.failed', { clause, reason }) : clause, reason, since: at };
}

/**
 * A box's kept clause (`keptWords`) wherever the page names the box — the
 * one line, its corner, its label, its mirror item, so they never part: the version it
 * shows (the reader `shown`), its links its document's (FP-22); kept while
 * M-PUMP reads it again past a second (`kept`) — a draft by its own record,
 * an edition by its box's document, whose links alone can change.
 * @param {string} addr the box, or the version it shows
 * @returns {KeptClause | null}
 */
export function keptIn(addr) {
  const box = boxOf(addr), shows = read.shown(box), d = REC.doc(shows);
  return keptWords(d, REC.doc(box), PUMP.kept(isDraft(d) === true ? shows : box));
}

/**
 * The clause a withheld run's sign carries while the edition claims on its
 * origin stand held past a second as they are read again (see the head;
 * FP-23, FP-33): "links as last read" at the page's clock at the row that
 * left them behind, the failed read's words after it (`keptClause`); none
 * where they are not kept, or none are held.
 * @param {string} origin
 * @returns {KeptClause | null}
 */
export function claimsKeptIn(origin) {
  const k = PUMP.claimsKept(origin);
  return k && REC.editionClaimsOf(origin) !== undefined ? keptClause('L.kept.links', k.since, k.met, Date.now()) : null;
}

/**
 * The clause the board carries while it lags past a second (see the head;
 * M-PUMP's `boardKept`; FP-23): "as last read" at the page's clock at the
 * stream's drop or the row that left the page's copy behind, the failed
 * read's words after it (`keptClause`); none where it does not lag, or no
 * board is held (FP-35).
 * @returns {KeptClause | null}
 */
export function boardKeptIn() {
  const k = REC.board() ? PUMP.boardKept() : null;
  return k ? keptClause('L.kept.text', k.since, k.met, Date.now()) : null;
}

/** does the board lag past a second (M-PUMP's `boardKept`): every corner names neither the latest version nor the chain's count (`ArticleView.lags`) */
const lags = () => PUMP.boardKept() !== null;

/** what a document's corner's items are made from beside its record and the links (`Mounted.corner`): its kind (`kindOf`) — which an index row or a failed read tells with no move of its record — the board's lag, its box's chain (`chainOf`), the newer version it offers to read (the reader `newer`), the draft's kept state and whether its statement stands open — the items made again where it moved */
const cornerKey = (/** @type {string} */ addr) => JSON.stringify([kindOf(REC.doc(addr)), lags(), chainOf(addr), read.newer(addr), WRITE.keptOf(addr), openStatements.has(addr)]);
/**
 * A document's corner's items made over its view (`Mounted.corner`), keyed by what they were made from (`cornerKey`):
 * whole, compact, and opened whole on its act where its room holds its compact form alone; compact one by one for a
 * head's rows, closed and opened; and their words alone, whole, for the form a head opens beneath its rows
 * (`ArticleView.opened`, `ArticleView.acts`).
 */
function cornerOfView(/** @type {Doc} */ d, /** @type {ArticleView} */ view) {
  const opened = { ...view, opened: true };
  return {
    whole: cornerHTML(d, view), compact: cornerHTML(d, view, true), opened: cornerHTML(d, opened), key: cornerKey(d.addr),
    items: cornerItems(d, view, true, false), openedItems: cornerItems(d, opened, true, false), words: cornerItems(d, { ...view, acts: false }).map((i) => i.html),
  };
}

/**
 * How many of an account's documents stand kept (`keptIn`; see the head):
 * the boxes whose clause M-PUMP's `kept` answers for, each once — what the
 * account's label carries at far scale, where no document's label stands
 * (P-RENDER's clusters; FP-23).
 * @param {string} account
 * @returns {number}
 */
export function keptCountIn(account) {
  return [...new Set(PUMP.keptAll().docs.map(boxOf))].filter((box) => accountOf(box) === account && keptIn(box)).length;
}

/**
 * @typedef {Object} DocLabel — a document's label on the plane (`docLabel`): its contents line and its parts beneath it
 * @property {import('../plane/labels.js').Part | null} lead its first line (`leadPart`); null where none is known
 * @property {import('../plane/labels.js').Part} address the address of the version its box shows, its fields past its region's prefix, whole where the region is not named in view (`Part.whole`)
 * @property {import('../plane/labels.js').Part | null} kept its kept clause (`keptIn`), after its address; null where it is not kept, or the one line names it, which carries the clause beside its address instead
 * @property {import('../plane/labels.js').Part[]} parts its links' badge; none at a withheld box
 * @property {string | null} region its account, whose label in view carries the prefix
 */

/**
 * A document's label on the plane — P-RENDER's contents line on its box, and
 * its held form over its mounted article (see the head) — read here, so the
 * two never part: its lead at its em (`leadPart`); the address of the
 * version its box shows at P-REG's ADDRESS size and weight in the
 * identifier's face, past its region's prefix (`shortAddr`) where its region
 * is named in view, else whole; its kept clause after the address at that
 * size, in the title's ink, wrapped at its spaces and never cut (`keptIn`),
 * none where the one line names it (the reader `named`); and its links' badge
 * at that size, none at a withheld box, whose links no read brings.
 * @param {Doc} d the version its box shows
 * @param {number} fsPx its em on screen, in px
 * @returns {DocLabel}
 */
export function docLabel(d, fsPx) {
  const box = boxOf(d.addr), c = LK.countDoc(box), k = box === read.named() ? null : keptIn(d.addr);
  /** @type {import('../plane/labels.js').Part[]} */
  const parts = d.refused !== 'withheld' && (c.n || c.arriving) ? [{ text: c.arriving ? `${c.n ? c.n + ' · ' : ''}${t('L.arriving')}` : c.n === 1 ? t('F.label.links.1') : t('F.label.links', { n: c.n }), px: ADDRESS.px, ink: COL.greek, fit: 'wrap' }] : [];
  return {
    lead: leadPart(d, fsPx), address: { text: shortAddr(d), whole: d.addr, px: ADDRESS.px, ink: COL.title, weight: ADDRESS.weight, fit: 'one', face: 'ident' },
    kept: k ? { text: k.text, px: ADDRESS.px, ink: COL.title, fit: 'wrap' } : null, parts, region: d.account,
  };
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
  return { span, backward: runsBackward(s) };
}

/** does a platform selection run backward, its focus point before its anchor? False where either point is missing */
function runsBackward(/** @type {Selection} */ s) {
  if (!s.anchorNode || !s.focusNode) return false;
  const anchor = document.createRange(); anchor.setStart(s.anchorNode, s.anchorOffset);
  return anchor.comparePoint(s.focusNode, s.focusOffset) < 0;
}

/**
 * Does the platform's selection run backward, its focus point before its
 * anchor (`runsBackward`), so the end a drag or the platform's own keys
 * moved is its start? False where none stands, or it is collapsed.
 */
export function selectionBackward() {
  const s = typeof window !== 'undefined' && window.getSelection ? window.getSelection() : null;
  return !!s && s.rangeCount > 0 && !s.isCollapsed && runsBackward(s);
}

/**
 * Does the platform hold a selection with extent anywhere in the page (see
 * the head) — over an article's text, a reading scene's pane's, an overlay's —
 * rather than none or a caret alone?
 */
export function platformSelects() {
  const s = typeof window !== 'undefined' && window.getSelection ? window.getSelection() : null;
  return !!s && s.rangeCount > 0 && !s.isCollapsed;
}

/**
 * The part of the platform's selection its moving end stands in — the end a
 * drag, a Shift+click or the platform's own keys moved, its focus point
 * (APP-INPUT's, O-SELECTION's; FP-40): the span the selection covers in the
 * mounted article that point lies in (`spanIn`), whether it runs backward —
 * the moving end that span's start, else its end — and whether the selection
 * lies wholly in that article. Null where none stands, it is collapsed, or
 * its focus point lies in no mounted article.
 * @returns {{span: Span, backward: boolean, whole: boolean} | null}
 */
export function movingPart() {
  const s = typeof window !== 'undefined' && window.getSelection ? window.getSelection() : null;
  if (!s || !s.rangeCount || s.isCollapsed || !s.focusNode) return null;
  const e = elementOf(s.focusNode), art = e ? /** @type {HTMLElement | null} */ (e.closest('article.dtext')) : null;
  const rec = art ? mounted.get(art.dataset.addr || '') : undefined;
  if (!art || !rec || rec.el !== art) return null;
  const range = s.getRangeAt(0), span = spanIn(art, rec.made, range);
  return span ? { span, backward: runsBackward(s), whole: art.contains(range.commonAncestorContainer) } : null;
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
 * @param {Span | null} selected a span of the text shown (O-SELECTION's)
 * @param {{addr: string, pos: number} | null} focus the walk's focused block, by its first position in the text shown (N-WALK's)
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
 * What the edition claims held as they are read again say now, every
 * origin's (`claimsKeptIn`), as one key: a reading scene's panes place their
 * statements again where it changed (SC); '' where none are kept.
 * @returns {string}
 */
export function keptRunsKey() {
  return PUMP.keptAll().origins.map((o) => { const k = claimsKeptIn(o); return k ? o + ' ' + k.text : ''; }).join('\n');
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
 * draft's page-local edits, the view revision or its fold moved since it was
 * mounted? Read against the model's record, which the article's own may be a
 * record derived from (`shownDoc`).
 * @param {Mounted} rec
 */
const wentStale = (rec) => {
  const m = REC.doc(rec.d.addr);
  return m.from !== rec.runFrom || m.to !== rec.runTo || m.rev !== rec.rev || rec.grev !== grev || rec.editRev !== WRITE.editRev(m.addr) || rec.fold !== foldOf(m);
};

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
 * whose outline holds the centre of the visible view as the reader last saw
 * it (`seenTop`), where in its room that
 * centre stands, the position the line there opens at and that line's bytes
 * by identity through the image the article was made from (`lineOf`) — what
 * the text set again holds of them is where the passage stands then
 * (`keepPlace`) — read under the fit the article was mounted under
 * (`Mounted.fit`) and the line's bottom it was seen below; null where none does.
 * @returns {Hold | null}
 */
function readingNow() {
  const top = seenTop(), c = viewCentre(top);
  for (const rec of mounted.values()) {
    if (!readsAt(rec.fs) || !holds(shapeAt(rec.d.addr, rec.fold), c)) continue;
    const box = docBox(rec.d.addr), p = { x: c.x - box.x, y: c.y - box.y }, pos = posIn(rec.fold, p.x, p.y);
    const line = pos != null ? lineOf(rec.fold, rec.made.blocks, pos) : null;
    return { addr: rec.d.addr, fold: rec.fold, p, pair: null, pos, ids: line ? REC.identityIn(rec.made.image, line.pos, line.width) : [], left: null, fit: rec.fit, top };
  }
  return null;
}

/**
 * The positions of a fold's line that opens at a position: from that
 * position to the one the next line of its block opens at, else to its
 * block's end — the passage a view reads (`readingNow`, `readAt`); the one
 * position where the fold sets no line there.
 * @param {Fold} f
 * @param {Block[]} blocks the blocks its article was made from
 * @param {number} pos
 * @returns {{pos: number, width: number}}
 */
function lineOf(f, blocks, pos) {
  const i = placeIn(f, pos).line;
  if (i == null) return { pos, width: 1 };
  const l = f.lines[i];
  for (let k = i + 1; k < f.lines.length && f.lines[k].pos === l.pos; k++) { const a = f.lines[k].at; if (a != null && a > pos) return { pos, width: a - pos }; }
  const b = blocks.find((x) => x.pos === l.pos);
  return { pos, width: b ? Math.max(1, b.pos + b.width - pos) : 1 };
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
 * Where the text set again holds the bytes a hold names by identity (`ids`):
 * the position its line opened at in the fold it stood in, and the one where
 * the image the article stands again from places the first of them it holds
 * now; null where the hold names none, or that image places none of them —
 * the image not read yet, or the text without the passage.
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
 * `holdOf`, P-CAM's `reanchor`) — the start of a flight aimed into the
 * document with it, its destination read again from its aim and never moved —
 * the passage's own bytes, where the text set again places them (`carried`;
 * FP-8: an edit above the view moves no word the reader reads), else its
 * position. Where the text set again holds none of those bytes and its image
 * covers it whole, the passage is gone from it: its line kept by position,
 * the reader told (`vanished`; FP-21's landing rule). Set again under another
 * fit than it was read under (`Hold.fit`) — a resize, the reader's own size, a
 * face arriving — the view's centre is framed across the column the passage
 * stands in now as a landing frames it (`frameAcross`), at the em the
 * re-anchor keeps, its line kept at its height. Below another bottom of the
 * one line than it was read under (`Hold.top`), its height is kept from the
 * visible view's centre as it stands now.
 * @param {Hold} h
 * @param {Mounted} rec the article standing again
 * @returns {boolean} whether the camera moved
 */
function keepPlace(h, rec) {
  const by = h.pair || carried(h, rec);
  if (!by && h.pos != null && h.ids.length && REC.imageCovers(rec.d)) read.vanished(rec.d.addr, h.pos, h.ids);
  const at = holdOf(h.fold, rec.fold, h.p, by);
  if (!at) return false;
  const box = docBox(rec.d.addr);
  const a = { x: box.x + h.p.x, y: box.y + h.p.y + (read.top() - h.top) / (2 * cam.scale) };
  const across = h.fit === fitKey() ? at.to.x : frameAcross(rec.d.addr, rec.fold, Math.max(0, placeIn(rec.fold, by ? by.to : at.pos).column), rec.fold.fs * cam.scale * at.k) + (a.x - cam.x) / at.k;
  const b = { x: box.x + across, y: box.y + at.to.y };
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
  if (at) { const p = placeIn(rec.fold, at.from); h = { addr: to, fold: rec.fold, p: { x: p.x, y: p.y }, pair: at, pos: at.from, ids: [], left: null, fit: rec.fit, top: seenTop() }; }
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
 * it and only where the page holds its text, with the position that text was
 * read at; the position the line under that centre opens at (P-LAY's `posAt`)
 * and that line's positions (`lineOf`), its bytes by identity through the
 * image of the text the page shows of it (`shownDoc`), that image's runs the
 * view shows (`aroundOf`), and where the fold sets that line and the centre.
 * Null where the view reads no document so.
 * @param {{x: number, y: number, scale: number}} view
 * @returns {Reading | null}
 */
export function readAt(view) {
  const top = seenTop(), c = centreAt(view, top);
  for (const d of REC.docs()) {
    if (d.from < 0 || d.system || !isShown(d.addr) || !holds(docBox(d.addr), c) || !holds(shapeIn(d), c)) continue;
    const f = foldOf(d);
    if (!readsAt(f.fs, view.scale)) continue;
    const box = docBox(d.addr), p = { x: c.x - box.x, y: c.y - box.y }, pos = posIn(f, p.x, p.y);
    if (pos == null) continue;
    const text = shownDoc(d), at = placeIn(f, pos), width = lineOf(f, text.blocks, pos).width;
    return { addr: d.addr, at: d.readAt, pos, width, ids: REC.identityIn(text.image, pos, width), around: aroundOf(text, f, view), p, line: { x: at.x, y: at.y }, fs: f.fs, fit: fitKey(), top };
  }
  return null;
}

/**
 * The image runs a view shows of a document (`Reading.around`): cut to its
 * window's positions (P-LAY's `windowIn`), from the position the first line
 * in the visible view opens at to the end of the last, each at its position;
 * none where no line in view names a position.
 * @param {Doc} d the record of the text the fold sets (`shownDoc`)
 * @param {Fold} f the fold it stands in
 * @param {{x: number, y: number, scale: number}} view
 * @returns {ImageRun[]}
 */
function aroundOf(d, f, view) {
  const box = docBox(d.addr), v = seenWorld(view);
  const w = foldWindow(f, { x0: v.x0 - box.x, y0: v.y0 - box.y, x1: v.x1 - box.x, y1: v.y1 - box.y });
  if (!w) return [];
  const last = lineOf(f, d.blocks, w.to), end = last.pos + last.width;
  return d.image.flatMap((r) => {
    const lo = Math.max(r.pos, w.from), hi = Math.min(r.pos + r.width, end);
    return lo < hi ? [{ pos: lo, width: hi - lo, prefix: r.prefix, ordinal: r.ordinal + (lo - r.pos) }] : [];
  });
}

/**
 * The view that keeps what a view read where it stood (see the head): the
 * view moved so the line holding `to`, in the fold its document stands in now
 * — the version its box shows now — takes the place and the size on screen of
 * the line the view read: `keepPlace`'s arithmetic (P-LAY's `holdOf`, P-CAM's
 * `reanchored`); that fold's lines set as the platform sets them first where
 * they are not set at the measure in force (`renderedFold`), so the view is
 * placed on the lines the reader will meet. The view itself where that line
 * stands where the line read stood. Read under another fit than the one in
 * force (`Reading.fit`), the view's centre framed across the column that line
 * stands in as a landing frames it (`frameAcross`), at the em kept, the line
 * at its height; below another bottom of the one line than it was read under
 * (`Reading.top`), its height kept from the visible view's centre as it
 * stands now. Null where the page holds none of that document's text: a
 * read must bring it first.
 * @param {{x: number, y: number, scale: number}} view
 * @param {Reading} r what it read
 * @param {number} to the position of the text the page shows of the version its box shows now (`shownOf`) whose line takes the line read's place: where N-GO finds the words read there, else the passage it lands at in their place
 * @returns {{x: number, y: number, scale: number} | null}
 */
export function keptAt(view, r, to) {
  const addr = read.shown(r.addr), d = REC.has(addr) ? REC.doc(addr) : null;
  if (!d || d.from < 0) return null;
  const f = renderedFold(d), now = placeIn(f, to), s = f.fs / r.fs, k = r.fs / f.fs, framed = r.fit !== fitKey(), lower = read.top() - r.top;
  if (!framed && now.x === r.line.x && now.y === r.line.y && s === 1 && lower === 0) return view;
  const box = docBox(addr);
  const a = { x: box.x + r.p.x, y: box.y + r.p.y + lower / (2 * view.scale) };
  const across = framed ? frameAcross(addr, f, Math.max(0, now.column), f.fs * view.scale * k) + (a.x - view.x) / k : now.x + (r.p.x - r.line.x) * s;
  return reanchored(view, a, { x: box.x + across, y: box.y + now.y + (r.p.y - r.line.y) * s }, k);
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
 * range the release took over the article set again. The one line's bottom
 * it framed below is kept (`framedTop`).
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
  // a live caret the walk's focus has left for another document's span is left to the walk, kept where it stood (K-77; D5 §4 rule 8)
  if (caret_ && caret_.live) { const f = read.focus(); if (f && f.addr !== caret_.addr) caret_ = { ...caret_, live: false }; }
  placeCaretMark();
  if (clearing && !pressed) keepClear();
  if (engine && !pressed) measureInView(v);
  last.mounted = spent;
  last.standing = 0; last.lines = 0;
  for (const rec of mounted.values()) { if (rec.banded) last.standing++; last.lines += rec.lines.size; }
  framedTop = read.top();
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
 * reading scale whose corner has items carries it — its items made again
 * where what they are made from moved since they were made (`cornerKey`):
 * the board's lag begun or ended (`lags`), its box's chain counted again as
 * a newer version arrives (`chainOf`; FP-23), the newer version it offers
 * (the reader `newer`), a draft's kept state, its kept word said once in the
 * status region where it changes (`sayKept`; FP-36) — and a kept document's
 * clause its last item where the one line does not name it (`keptIn`,
 * `keptHTML`), the corner placed by its items' height alone — the rest are
 * removed. Where its fold reserves its head's band (`Fold.band`), it stands
 * at its document's head instead (`headOf`, `placeHead`). The
 * writes come first (an element, its form and items where they changed — a
 * focus on its act put back on the act in their place — a cap
 * that binds), the reads together after them (one layout for every corner
 * that changed, none in a frame where none did, and the signs in the edges the
 * corners stand beside), then the places: beside the column nearest the
 * view's centre (`besideOf`) — whole or compact by the room there and the
 * view's fit (`formFor`), the room its cap only where not even its form fits — its right
 * edge a gap short of that column's text, its top held to that column's
 * visible top below the one line, never past the outline's bottom beside a
 * row's first column, nor past its row's foot beside another, and below the
 * signs the edge before it holds (`cornerTop`); where they leave it no room,
 * the next frame stands it by its row's first column. Opened whole on its act
 * where its room holds only its compact form, it stands in its opened form
 * (`ArticleView.opened`). In either form its element keeps its one place in
 * the reading order, its Tab stops the focused document's alone (`setStops`).
 * @param {(addr: string) => boolean} focused
 */
function placeCorners(focused) {
  if (!cornerLayer) return;
  /** @type {Array<{c: Corner, rec: Mounted, at: Beside}>} */
  const shown = [];
  /** @type {Array<{c: Corner, rec: Mounted, head: Head}>} */
  const heads = [];
  const centre = viewCentre();
  for (const rec of mounted.values()) {
    // the board's lag begun or ended, its box's chain counted again, a newer version offered or no longer, a draft's kept state set, its statement opened or closed: the corner's items made again over the view as it stands
    if (rec.corner.key !== cornerKey(rec.d.addr)) rec.corner = cornerOfView(rec.d, viewFor(rec.d));
    if (!rec.corner.whole || !readsAt(rec.fs)) continue;
    const addr = rec.d.addr, box = docBox(addr), open = openWhole.has(addr);
    const c = corners.get(addr) || makeCorner(cornerLayer, addr), p = { x: centre.x - box.x, y: centre.y - box.y };
    sayKept(c, addr);
    if (rec.fold.band > 0) {
      if (!c.head) { c.head = true; c.compact = true; c.html = ''; c.cap = Infinity; c.el.style.maxWidth = ''; c.el.classList.remove('compact'); c.el.classList.add('head'); }
      heads.push({ c, rec, head: headOf(c, rec, columnAt(rec.fold, p.x, p.y), open) });
      continue;
    }
    if (c.head) { c.head = false; c.compact = false; c.html = ''; c.stale = true; c.el.classList.remove('head'); Object.assign(c.el.style, { width: '', height: '' }); }
    // a column the signs before it left no room beside is tried again once the view's centre has left it
    if (c.blockedAt !== columnAt(rec.fold, p.x, p.y)) c.blockedAt = -1;
    const at = besideOf(rec.fold, clearLeftOf(addr), p, cam.scale, c.blockedAt);
    // a kept document's clause its last item, where the one line does not name it (`keptIn`); opened whole where its room holds
    // its compact form alone, its opened form
    const form = formFor(at.room, open, fit().compact), opened = open && formFor(at.room, false, fit().compact) === 'compact';
    const html = (opened ? rec.corner.opened : rec.corner[form]) + keptHTML(boxOf(addr) === read.named() ? null : keptIn(addr));
    // its items rewritten, its stops stood again, a focus on its act put back on the act standing in their place, else on its first stop (FP-20)
    if (c.html !== html) { FOCUS.keep(c.el, cornerAct, () => { c.el.innerHTML = html; setStops(c.el, c.mine, false); }); c.html = html; c.stale = true; }
    if ((form === 'compact') !== c.compact) { c.compact = form === 'compact'; c.el.classList.toggle('compact', c.compact); c.stale = true; }
    // the room caps the corner only where not even its form's width fits there, a corner opened whole never
    const cap = open || at.room >= cornerWidth(c.compact) ? Infinity : at.room;
    if (cap !== c.cap) { c.el.style.maxWidth = cap === Infinity ? '' : cap + 'px'; c.cap = cap; c.stale = true; }
    c.column = at.column;
    shown.push({ c, rec, at });
  }
  const here = new Set([...shown, ...heads].map((s) => s.rec.d.addr));
  let lost = false;
  for (const addr of [...corners.keys()]) if (!here.has(addr)) lost = dropCorner(addr) || lost;
  // the heads' forms opened beneath them, read together, then each head placed: the edges' signs stand below what a head covers
  const formed = heads.map(({ c }) => { const o = /** @type {HTMLElement | null} */ (c.el.querySelector(':scope > .opened')); return o ? o.offsetHeight : 0; });
  heads.forEach(({ c, rec, head }, k) => placeHead(c, rec, head, formed[k]));
  // the edges' signs, which a corner beside the column after them stands below
  placeSigns();
  if (shown.length) {
    for (const { c } of shown) if (c.stale) { const k = /** @type {HTMLElement | null} */ (c.el.querySelector('.kept')); c.w = c.el.offsetWidth; c.h = c.el.offsetHeight - (k ? k.offsetHeight : 0); c.stale = false; }
    const signs = shown.map(({ rec, at }) => (at.first ? [] : [...signsIn(rec, at.column - 1), ...signsAt(rec.d.addr, at.column - 1)]));
    const top = read.top() + HOLD.gap;
    shown.forEach(({ c, rec, at }, k) => {
      const f = rec.fold, box = docBox(rec.d.addr), col = f.columns[at.column];
      const foot = at.first ? boundsOf(f) : padded(f, f.columns[at.column - (at.column % f.across)]);
      const x = sx(box.x + col.x) - CORNER_GAP - c.w, rowTop = sy(box.y + col.y);
      const y = cornerTop({ x, w: c.w, h: c.h }, rowTop, top, sy(box.y + foot.y + foot.h), signs[k]);
      // beside that column the signs before it leave it no room: the next frame stands it by its row's first column
      if (y === null) { c.blockedAt = at.column; markDirty(); }
      // a surface standing at its place — a find's box — stacks its items beneath it
      c.x = Math.round(x); c.top = Math.round(y ?? rowTop); c.y = c.top + Math.round(read.atop(boxOf(rec.d.addr)));
      c.bottom = c.y + c.h;
      c.el.style.transform = `translate(${c.x}px, ${c.y}px)`;
    });
  }
  for (const { c, rec } of [...shown, ...heads]) {
    const mine = focused(rec.d.addr);
    if (mine === c.mine) continue;
    if (!mine) lost = c.el.contains(document.activeElement) || lost;
    c.mine = mine;
    if (mine) c.el.removeAttribute('aria-hidden'); else c.el.setAttribute('aria-hidden', 'true');
    setStops(c.el, mine, c.head);
  }
  if (lost) read.handOff();
}

/** the room between two signs stacked in one column's edge, px */
const SIGN_GAP = 2;
/** the order signs standing for one run stack in: its origin's statement, its key, its others' count */
const SIGN_ORDER = Object.freeze({ statement: 0, key: 1, count: 2 });

/**
 * The edges' signs placed for the frame (see the head; FP-31): in each
 * mounted document at reading scale, the signs T-ARTICLE's one rule stands for
 * its runs of other documents' material a line of which meets the visible
 * view (`edgeSignsFor`) — each origin's statement beside the run it stood
 * beside last frame while that run is in view, else beside the origin's first
 * run in view, held by the run's identity (`RunAt.id`): a withheld origin's
 * (`edgeStatementHTML`), a transcluded origin's (`sourceStatementHTML`), its
 * C-33's words read as the frame stands (`carriesC33`, over `originKind`); a
 * key no gap holds; a withheld run's others' count (LK's
 * `countAt`) — each in the edge of the column holding its run's first line in
 * view, at a share of the text's size never below P-REG's LABEL_MIN_PX, the
 * edge's width wide; the signs of one column's edge stacked by the one hold
 * (P-LABEL's `holdStack`) — at their lines, below the hold, below a label
 * held over the document or what its head covers in that column, off the
 * signs the article sets in that edge, inside the column's padded foot.
 * Elements are written only where their words or size changed, their heights
 * read together, then placed by translate alone.
 */
function placeSigns() {
  if (!cornerLayer) return;
  const seen = visibleView(read.top()), hold = seen.y + HOLD.gap, scale = cam.scale;
  /** @type {Array<{key: string, kind: EdgeSign['kind'], rec: Mounted, run: RunAt, column: number, line: number, html: string}>} the signs the frame stands */
  const want = [];
  /** @type {Map<string, Map<string, string>>} the run each statement stands beside this frame, by document */
  const beside = new Map();
  for (const rec of mounted.values()) {
    if (!rec.banded || !readsAt(rec.fs) || !rec.runs.length) continue;
    const f = rec.fold, box = docBox(rec.d.addr), addr = rec.d.addr;
    /** the first of a run's lines whose box meets the visible view: its column and its top on screen; null where none does */
    const firstIn = (/** @type {RunAt} */ r) => {
      for (let i = r.first; i < r.end; i++) {
        const ci = columnOfLine(f, i);
        if (ci < 0) continue;
        const c = f.columns[ci], l = f.lines[i], y = sy(box.y + c.y + (l.top - c.top) * f.fs), x0 = sx(box.x + c.x);
        if (y < seen.y + seen.h && y + l.h * f.fs * scale > seen.y && x0 < seen.x + seen.w && x0 + c.w * scale > seen.x) return { column: ci, y };
      }
      return null;
    };
    /** @type {Map<RunInView, {r: RunAt, column: number, y: number}>} */
    const at = new Map();
    for (const r of rec.runs) {
      const first = r.holds === 'reading' ? null : firstIn(r);
      if (first) at.set({ run: r.run, id: r.id, holds: r.holds, count: r.b ? LK.countAt(addr, r.b, rec.d) : noCount() }, { r, ...first });
    }
    const chosen = edgeSignsFor([...at.keys()], anchors.get(addr) || new Map());
    beside.set(addr, chosen.beside);
    for (const sign of chosen.signs) {
      const x = /** @type {{r: RunAt, column: number, y: number}} */ (at.get(sign.run)), run = x.r.run, origin = run.origin;
      const html = sign.kind === 'statement'
        ? (x.r.b ? edgeStatementHTML(placeholderOf(x.r.b, REC.reader(), originOwner, clauseOf), claimsKeptIn(origin), false) : sourceStatementHTML(origin, carriesC33(rec.d, originKind(origin)), false))
        : sign.kind === 'key' ? edgeKeyHTML(run, false) : edgeCountHTML(sign.run.count);
      if (html) want.push({ key: sign.kind === 'statement' ? `${addr} ${origin}` : `${addr} ${run.pos} ${sign.kind}`, kind: sign.kind, rec, run: x.r, column: x.column, line: x.y, html });
    }
  }
  anchors.clear();
  for (const [k, v] of beside) anchors.set(k, v);
  /** @type {Map<string, Array<{s: EdgeSign, w: typeof want[number]}>>} the signs standing, by the column's edge they stand in */
  const edges = new Map();
  for (const w of want) {
    const f = w.rec.fold, box = docBox(w.rec.d.addr), c = f.columns[w.column], em = f.fs * scale;
    const px = Math.max(MEASURE.count * em, LABEL_MIN_PX), lh = Math.max(LINE_H * em, px * LINE_BOX), width = (EDGE - EDGE_GAP) * em;
    const s = signed.get(w.key) || makeSign(/** @type {HTMLElement} */ (cornerLayer), w.key, w.kind), style = `${px}|${lh}|${width}`;
    if (s.html !== w.html) { s.el.innerHTML = w.html; s.html = w.html; s.stale = true; }
    if (s.style !== style) { Object.assign(s.el.style, { fontSize: px + 'px', lineHeight: lh + 'px', width: width + 'px' }); s.style = style; s.stale = true; }
    Object.assign(s.el.dataset, { addr: w.rec.d.addr, pos: String(w.run.run.pos), width: String(w.run.run.width), origin: w.run.run.origin });
    Object.assign(s, { addr: w.rec.d.addr, pos: w.run.run.pos, origin: w.run.run.origin, column: w.column, x: Math.round(sx(box.x + c.x + c.w) + EDGE_GAP * em), w: width, live: true });
    const k = `${w.rec.d.addr} ${w.column}`;
    (edges.get(k) || edges.set(k, []).get(k) || []).push({ s, w });
  }
  for (const [key, s] of [...signed]) { if (!s.live) { s.el.remove(); signed.delete(key); } else s.live = false; }
  // their heights read together, then each edge's stack placed
  for (const s of signed.values()) if (s.stale) { s.h = s.el.offsetHeight; s.stale = false; }
  for (const group of edges.values()) {
    const rec = group[0].w.rec, f = rec.fold, box = docBox(rec.d.addr), ci = group[0].s.column, c = f.columns[ci], q = padded(f, c);
    group.sort((a, b) => a.w.line - b.w.line || a.w.run.run.pos - b.w.run.run.pos || SIGN_ORDER[a.s.kind] - SIGN_ORDER[b.s.kind]);
    const band = heldBand(rec, seen, hold), head = corners.get(rec.d.addr);
    const top = Math.max(hold, band ? band.y + band.lh : -Infinity, head && head.head && head.column === ci ? head.bottom : -Infinity);
    const ys = holdStack(group.map((x) => ({ y: x.w.line, h: x.s.h })), sy(box.y + c.y), top, sy(box.y + q.y + q.h), SIGN_GAP, signsIn(rec, ci));
    group.forEach((x, k) => { x.s.y = Math.round(ys[k]); x.s.el.style.transform = `translate(${x.s.x}px, ${x.s.y}px)`; });
  }
}

/**
 * A sign's element in the corner layer (`placeSigns`): drawn and never
 * announced — the ARIA mirror carries its words (N-WALK) — out of the Tab
 * order, its controls reached by the pointer.
 * @param {HTMLElement} into the corner layer
 * @param {string} key
 * @param {EdgeSign['kind']} kind
 * @returns {EdgeSign}
 */
function makeSign(into, key, kind) {
  const el = document.createElement('div');
  el.className = 'edge-sign';
  el.dataset.sign = kind;
  el.setAttribute('aria-hidden', 'true');
  into.appendChild(el);
  /** @type {EdgeSign} */
  const s = { el, kind, addr: '', pos: 0, origin: '', html: '', style: '', column: 0, x: 0, y: 0, w: 0, h: 0, stale: true, live: false };
  signed.set(key, s);
  return s;
}

/** the signs placed in a document's column's edge, on screen: what a corner beside the column after it stands below (`placeCorners`) */
const signsAt = (/** @type {string} */ addr, /** @type {number} */ ci) => [...signed.values()].filter((s) => s.addr === addr && s.column === ci).map((s) => ({ x: s.x, y: s.y, w: s.w, h: s.h }));

/**
 * The signs standing in the columns' edges as the last frame placed them (the
 * gate's): each its kind, its document, its run and its origin, the column
 * whose edge it stands in, its words, where the frame placed it, and its rect
 * on screen as the platform lays it out.
 * @returns {Array<{kind: EdgeSign['kind'], addr: string, pos: number, origin: string, column: number, text: string, placed: Rect, rect: Rect}>}
 */
export function signsStanding() {
  return [...signed.values()].map((s) => {
    const r = s.el.getBoundingClientRect();
    return { kind: s.kind, addr: s.addr, pos: s.pos, origin: s.origin, column: s.column, text: s.el.textContent || '', placed: { x: s.x, y: s.y, w: s.w, h: s.h }, rect: { x: r.left, y: r.top, w: r.width, h: r.height } };
  });
}

/**
 * @typedef {Object} Head — a corner at its document's head as this frame sets it (`headOf`), placed after the reads (`placeHead`)
 * @property {number} column the column it stands across, an index into the fold's columns
 * @property {boolean} first that column stands in the fold's first row, the head's band above it
 * @property {number} pitch its rows' pitch on screen, px: the reading line's at the scale
 * @property {number} rows its rows
 */

/**
 * A corner at its document's head written for the frame (see the head;
 * FP-26): its rows across the column nearest the view's centre — its text and
 * its edge — at the reading line's pitch at the scale (`headLayout`, at the
 * width it stands at): on its first row the document's name, unless the one
 * line names it, its first line cut to the name's room, its badge where it
 * fits and its address at that room's end, each in its face as the held label
 * sets it (`heldContents`, `runHTML`), the kept clause after the address,
 * whole, where the line does not carry it beside its own address, then the
 * corner's items in their one order and compact forms, each in its slot with
 * its act, the count of those folded, "⟨n⟩ more", its act opening them whole
 * (`moreHTML`); the rest of its items on the rows after, whole, each row
 * holding an act a line of acts of its own (`hrowHTML`); and beneath its rows
 * the forms its acts opened — every item whole on the count's or a glyph's
 * act (`openCorner`), its words alone where its rows hold its act
 * (`openedHTML`), a kept word's statement on its act or Mod+S's
 * (`openStatement`). Each row stands on the document's own ground, the name
 * drawn and never announced. Its markup is written again only where it
 * changed, its stops stood again (`setStops`), a focus on its act put back on
 * the act standing in its place, else on its first stop (FP-20).
 * @param {Corner} c
 * @param {Mounted} rec
 * @param {number} column the column nearest the view's centre
 * @param {boolean} open its items opened whole (`openCorner`)
 * @returns {Head}
 */
function headOf(c, rec, column, open) {
  const f = rec.fold, d = rec.d, addr = d.addr, col = f.columns[column], scale = cam.scale;
  const pitch = LINE_H * f.fs * scale, width = (col.w + EDGE * f.fs) * scale, named = boxOf(addr) === read.named();
  const k = keptIn(addr), items = open ? rec.corner.openedItems : rec.corner.items;
  const L = headLayout(headItems(items), nameWidth(d), k ? { w: clauseWidth(k), words: k.text } : null, width, pitch);
  const ground = d.refused === 'withheld' ? COL.withheld : COL.doc;
  /** @type {string[]} each row's markup, by row */
  const rows = Array.from({ length: L.rows }, () => '');
  if (!named) {
    const label = docLabel(d, f.fs * scale);
    const address = label.region && !read.region(label.region) && label.address.whole ? { ...label.address, text: label.address.whole } : label.address;
    const line = heldContents({ lead: label.lead, address, kept: null }, label.parts, L.name, measureRun);
    if (line) rows[0] += `<span class="name" aria-hidden="true">${line.map((m) => `<span style="left:${m.x}px;line-height:${pitch}px;color:${m.part.ink}">${m.runs.map((r) => runHTML(r, m.px, m.weight)).join('')}</span>`).join('')}</span>`;
  }
  for (const s of L.slots) {
    const html = s.k === -1 ? (named ? '' : `<span class="kept" data-string="${esc(/** @type {KeptClause} */ (k).id)}" style="font-size:${ADDRESS.px}px">${esc(/** @type {KeptClause} */ (k).text)}</span>`)
      : s.k === -2 ? moreHTML(L.folded, open)
        : items[s.k].html;
    rows[s.row] += `<span class="hslot${s.rows > 1 ? ' wraps' : ''}" style="left:${s.x}px;width:${s.w}px;height:${s.rows * pitch}px;line-height:${s.rows > 1 ? '' : pitch + 'px'}">${html}</span>`;
  }
  const kept = WRITE.keptOf(addr), formHTML = open ? openedHTML(rec.corner.words, items, L) : kept && openStatements.has(addr) ? statementHTML(kept) : '';
  const html = rows.map((r, i) => (r ? hrowHTML(i, `height:${pitch}px;background:${ground}`, r) : '')).join('')
    + (formHTML ? openedFormHTML(`width:${width}px;background:${ground}`, formHTML) : '');
  if (c.html !== html) { FOCUS.keep(c.el, cornerAct, () => { c.el.innerHTML = html; setStops(c.el, c.mine, true); }); c.html = html; }
  c.el.style.width = width + 'px'; c.el.style.height = pitch + 'px';
  c.column = column; c.w = width; c.h = pitch;
  return { column, first: inFirstRow(f, col), pitch, rows: L.rows };
}

/**
 * A corner at its document's head placed for the frame (see the head;
 * FP-26, FP-37): across its column, its first row at its band's top above a
 * first-row column — in the gutter above a later one — held below the one
 * line once that top rises past the hold, never past its column's foot (the
 * one hold, P-LABEL's `holdTop`), its later rows where its band sets them and
 * hidden as they pass under it, or above a later row's column, where no band
 * holds them; the forms opened beneath it below its rows, or below its held
 * row as its band rises. Pushed down by a surface standing at its place, as
 * a corner beside its column is (`Readers.atop`). What it covers on screen,
 * its first row and a form opened beneath it, is what no act leaves a target
 * under (`headClear`).
 * @param {Corner} c
 * @param {Mounted} rec
 * @param {Head} head
 * @param {number} formH the height of the forms opened beneath it, px; 0 where none stands
 */
function placeHead(c, rec, head, formH) {
  const f = rec.fold, box = docBox(rec.d.addr), col = f.columns[head.column], P = head.pitch;
  const at = head.first ? sy(box.y + col.y - f.band) : sy(box.y + col.y) - P;
  const top = holdTop(at, read.top() + HOLD.gap, sy(box.y + col.y + col.h), P);
  c.x = Math.round(sx(box.x + col.x)); c.top = Math.round(top); c.y = c.top + Math.round(read.atop(boxOf(rec.d.addr)));
  c.el.style.transform = `translate(${c.x}px, ${c.y}px)`;
  for (const r of /** @type {HTMLElement[]} */ ([...c.el.querySelectorAll(':scope > .hrow')])) {
    const k = Number(r.dataset.row), y = k === 0 ? 0 : head.first ? Math.round(at - c.top + k * P) : -1;
    r.style.top = Math.max(0, y) + 'px';
    r.style.visibility = y < 0 ? 'hidden' : '';
  }
  const below = Math.max(P, head.first ? Math.round(at - c.top + head.rows * P) : P);
  const o = /** @type {HTMLElement | null} */ (c.el.querySelector(':scope > .opened'));
  if (o) o.style.top = below + 'px';
  c.bottom = c.y + (o ? below + formH : P);
}

/**
 * Where a corner standing at its document's head leaves the view clear of it
 * (see the head; FP-37): the bottom of its first row, or of a form opened
 * beneath it, on screen — what an act that places a target brings it below
 * (`placeCaretMark`); null where the document's corner stands beside its
 * column, or none stands.
 * @param {string} addr
 * @returns {number | null}
 */
export function headClear(addr) { const c = corners.get(addr); return c && c.head ? c.bottom : null; }

/**
 * A standing corner's kept word said once in the status region where it
 * changed since the corner last stood (FP-36): its new word, where one stands;
 * nothing for the first frame it stands, nor for a state cleared.
 * @param {Corner} c
 * @param {string} addr
 */
function sayKept(c, addr) {
  const k = WRITE.keptOf(addr), word = k ? k.word : null;
  if (word === c.word) return;
  c.word = word;
  if (k && c.html) FOCUS.say(keptWord(k).text);
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
 * it — whose outline's first row has risen above the hold below the one line,
 * which the line does not name and whose corner stands at no head, which
 * names it on its first row (`headOf`), carries its label held there: the canvas's
 * words for its box (`docLabel`), its address past its region's prefix where
 * that region is named in view (the reader `region`), else whole, each run in
 * its face as the canvas sets it (`runHTML`), an address in the title's ink,
 * on one line across its outline's visible part at that height (P-LABEL's
 * `holdTop`, `across`, `heldContents`) — its first line from the line's
 * start, its address at the line's end, a kept document's clause after it
 * where no corner carries the clause — its box's edge pushing it up under
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
  const seen = visibleView(read.top()), top = seen.y + HOLD.gap;
  /** @type {Array<{rec: Mounted, line: import('../plane/labels.js').HeldPart[], room: {x: number, w: number}, y: number, lh: number}>} each label held, where its line stands */
  const placed = [];
  for (const rec of mounted.values()) {
    const band = heldBand(rec, seen, top), c = corners.get(rec.d.addr);
    if (!band) continue;
    let line = null, room = { x: 0, w: 0 };
    for (const s of besideCorner({ x: band.x0, w: band.x1 - band.x0 }, { y: band.y, h: band.lh }, c ? { x: c.x, y: c.y, w: c.w, h: c.h } : null)) {
      // on whole px, never past the stretch's right end
      const x = Math.round(s.x), w = Math.floor(s.x + s.w) - x;
      line = heldContents({ lead: band.label.lead, address: band.address, kept: band.kept }, band.label.parts, w, measureRun);
      if (line) { room = { x, w }; break; }
    }
    if (line) placed.push({ rec, line, room, y: band.y, lh: band.lh });
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
 * @typedef {Object} HeldBand — where a mounted document's label stands held below the one line this frame (`heldBand`)
 * @property {DocLabel} label the canvas's words for its box (`docLabel`)
 * @property {import('../plane/labels.js').Part} address its address, past its region's prefix where that region is named in view, else whole
 * @property {import('../plane/labels.js').Part | null} kept its kept clause after its address, where no corner carries it
 * @property {number} x0 where its line's room across its outline's visible part begins, on screen (px)
 * @property {number} x1 where it ends
 * @property {number} y its line's top, on screen (px)
 * @property {number} lh its line's height (px)
 */

/**
 * Where a mounted document's label stands held below the one line this frame
 * (see the head): at its outline's first row risen above the hold, one line
 * box of its largest part, pushed up under the line by its outline's foot
 * (P-LABEL's `holdTop`), across its outline's visible part at that height
 * (`across`); null where none is held — its article outside the mount band,
 * the one line or a corner at its head naming it, its first row below the
 * hold, or no room across its outline there. Its held label is set on it
 * (`placeHeld`), and the edges' signs stand below it (`placeSigns`).
 * @param {Mounted} rec
 * @param {Rect} seen the visible view
 * @param {number} top the hold: the one line's bottom and P-REG's HOLD gap
 * @returns {HeldBand | null}
 */
function heldBand(rec, seen, top) {
  const addr = rec.d.addr, c = corners.get(addr), scale = cam.scale;
  // a corner standing at its document's head carries the document's name on its first row
  if (!rec.banded || boxOf(addr) === read.named() || (c && c.head)) return null;
  const f = rec.fold, box = docBox(addr), row = firstRow(f), g = (GUTTER / 2) * f.fs, at = sy(box.y + row.y + g);
  if (at >= top) return null;
  const rects = outlineRects(f).map((r) => ({ x: sx(box.x + r.x), y: sy(box.y + r.y), w: r.w * scale, h: r.h * scale }));
  const label = docLabel(rec.d, f.fs * scale), pad = g * scale;
  const address = label.region && !read.region(label.region) && label.address.whole ? { ...label.address, text: label.address.whole } : label.address;
  // a kept document's clause after its address where no corner carries it
  const kept = c ? null : label.kept;
  // one line box of its first line's size, known or not, or of its largest part: the address stands where it stood whatever first line arrives beside it
  const lh = Math.max(lineHeight(f.fs * scale), ...[label.lead, address, kept, ...label.parts].map((p) => (p ? lineHeight(p.px) : 0))), foot = Math.max(...rects.map((r) => r.y + r.h)) - pad;
  const y = Math.round(holdTop(at, top, foot, lh)), a = across(rects, y, lh, pad);
  if (!a || y + lh <= seen.y + 0.5) return null;
  return { label, address, kept, x0: Math.max(a.x, seen.x), x1: Math.min(a.x + a.w, seen.x + seen.w), y, lh };
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
 * standing compact made whole where it stands, over what is beside it, until
 * the act again — the words its opened form compacts it again by, a click on
 * the corner opened, its other acts apart — closes it, or the corner leaves
 * (APP-INPUT takes the act at the corner's glyph, at a head's count of the
 * items it folds, and at the corner opened).
 * @param {string} addr
 */
export function openCorner(addr) {
  if (openWhole.has(addr)) openWhole.delete(addr); else openWhole.add(addr);
  markDirty();
}

/**
 * A document's corner element in the corner layer: named by its own words
 * (no string of the page's: it labels itself), a group or a line of acts as
 * its stops stand (`setStops`), out of the Tab order and hidden from
 * assistive technology until it is the focused document's.
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
  const c = { el, html: '', compact: false, column: 0, cap: Infinity, w: 0, h: 0, x: 0, y: 0, top: 0, stale: true, mine: false, blockedAt: -1, head: false, bottom: 0, word: null };
  corners.set(addr, c);
  return c;
}

/**
 * The key a corner's act bears (see the head), which a rewrite of its items
 * puts a focus back on (N-FOCUS's `keep`): the offered read's, a head's count
 * of the items it folds, the kept word's, the act that opens the corner whole
 * or compacts it again, the version statement's; none for the corner's
 * element itself, which a rewrite never replaces. A reading scene's pane keys
 * its corner's acts by it too.
 * @param {Element} el
 * @returns {string | null}
 */
export function cornerAct(el) {
  const e = /** @type {HTMLElement} */ (el), d = e.dataset || /** @type {DOMStringMap} */ ({});
  if (d.read) return 'read';
  if (d.more) return 'more';
  if (d.kept) return 'kept';
  if (d.whole != null) return 'whole';
  return e.classList && typeof e.classList.contains === 'function' && e.classList.contains('version') ? 'version' : null;
}

/** an element's descendants a selector names, in the page's order; none where the element finds none */
const allIn = (/** @type {Element} */ el, /** @type {string} */ sel) => (typeof el.querySelectorAll === 'function' ? /** @type {HTMLElement[]} */ ([...el.querySelectorAll(sel)]) : []);

/** the element the platform's focus stands on; null where the page holds none */
const focusedNow = () => (typeof document !== 'undefined' ? document.activeElement : null);

/**
 * A corner's Tab stops stood (see the head; D5 K-57; FP-20), on the plane and
 * in a reading scene's pane, whose holder stands them on its own corner: where
 * it holds acts, each line of them a toolbar — the corner beside its column,
 * each row of a corner at its document's head and the form it opens beneath
 * them (`hrowHTML`, `openedHTML`) — whose one stop is the act the focus stands
 * on in it, else its first act, every other act out of the order, and the
 * corner's element no stop; where it holds none, its element its one stop, a
 * group named by its own words; and no stop at all where it is not in the
 * order.
 * @param {HTMLElement} el the corner's element
 * @param {boolean} mine it is in the Tab order: the focused document's, a pane's
 * @param {boolean} head it stands at its document's head
 * @param {Element | null} [at] the element the focus stands on or goes to: the stop of the line it stands in
 */
export function setStops(el, mine, head, at = focusedNow()) {
  const acts = allIn(el, 'button');
  if (!acts.length) {
    el.setAttribute('role', 'group');
    if (mine) el.tabIndex = 0; else el.removeAttribute('tabindex');
    return;
  }
  el.removeAttribute('tabindex');
  el.setAttribute('role', head ? 'group' : 'toolbar');
  for (const bar of head ? allIn(el, ':scope > [role="toolbar"]') : [el]) {
    const own = allIn(bar, 'button'), stop = own.find((b) => b === at) || own[0];
    for (const b of own) b.tabIndex = mine && b === stop ? 0 : -1;
  }
}

/**
 * The element a corner's first Tab stop stands on (`setStops`): its first
 * line's stop, else its element — where a return to the corner lands (SC's).
 * @param {HTMLElement} el the corner's element
 * @returns {HTMLElement}
 */
export const cornerStop = (el) => allIn(el, 'button').find((b) => b.getAttribute('tabindex') === '0') || el;

/** a head's count of the items its rows fold, "⟨n⟩ more" (`headLayout`): the act that opens them whole beneath its rows, saying whether they stand opened (D5 K-57; FP-26) */
const moreHTML = (/** @type {number} */ n, /** @type {boolean} */ open) => `<button type="button" class="more" data-more="${n}" aria-expanded="${open}" tabindex="-1">${esc(t('L.corner.more', { n }))}</button>`;

/** a head's row as markup: a row holding an act a line of acts of its own (`setStops`) */
const hrowHTML = (/** @type {number} */ i, /** @type {string} */ style, /** @type {string} */ inner) => `<div class="hrow" data-row="${i}"${inner.includes('<button') ? ' role="toolbar"' : ''} style="${style}">${inner}</div>`;

/**
 * The form a head opens beneath its rows, every item whole (`openCorner`):
 * each item its rows hold an act of in its words alone, each its rows fold
 * its act, so no act stands twice.
 * @param {string[]} words the items whole, their words alone (`ArticleView.acts`)
 * @param {import('./article.js').CornerItem[]} items the items as its rows set them
 * @param {HeadLayout} L where its rows set them
 */
function openedHTML(words, items, L) {
  const placed = new Set(L.slots.map((s) => s.k));
  return words.map((w, k) => (placed.has(k) ? w : items[k].html)).join('');
}

/** the form a head opens beneath its rows as markup, a line of acts where it holds one (`setStops`) */
const openedFormHTML = (/** @type {string} */ style, /** @type {string} */ inner) => `<div class="opened"${inner.includes('<button') ? ' role="toolbar"' : ''} style="${style}">${inner}</div>`;

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
 * @param {number} pos the block's first position, or the span's, in the text shown (`shownOf`)
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
 * mounted article (FP-26) — a typed line's others' count where the part
 * holding the block's first line stands, and the signs standing for a
 * withheld run on the corner layer, its origin's statement among them, as the
 * last frame placed them (`placeSigns`): what a beam or a tail leaving the
 * block's line starts past (BM's `leaveAt`); none where none stands.
 * @param {string} addr
 * @param {number} pos the block's first position
 * @returns {Array<{x: number, y: number, w: number, h: number}>}
 */
export function signRects(addr, pos) {
  const rec = mounted.get(addr); if (!rec) return [];
  const own = [...rec.el.querySelectorAll(`[data-pos="${pos}"] > .edge`)].map((e) => { const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  return [...own, ...[...signed.values()].filter((s) => s.addr === addr && s.pos === pos).map((s) => ({ x: s.x, y: s.y, w: s.w, h: s.h }))];
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
 * @param {number} pos a position of the text shown (`shownOf`)
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

/** the elements of an article's blocks in position order, a withheld run's gap among them, a block split across columns by each of its parts */
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
 * What an article was made from and where its words were read: a mounted
 * article's, or a reading scene's pane's (`sceneArticle`); null where the
 * element is neither.
 * @param {HTMLElement} el the article's element
 * @returns {{made: Made, where: Where} | null}
 */
function articleAt(el) {
  const rec = mounted.get(el.dataset.addr || '');
  return rec && rec.el === el ? rec : panes.get(el) || null;
}

/**
 * What an article was made from (`Made`): a mounted article's, or a reading
 * scene's pane's (`sceneArticle`); null where the element is neither.
 * @param {HTMLElement} el the article's element
 * @returns {Made | null}
 */
export function madeOf(el) {
  const a = articleAt(el);
  return a ? a.made : null;
}

/**
 * A span of an article named as skep's clipboard entry names a copy
 * (`Copied`; FP-27): where the article's words were read (`Where`) — a
 * mounted article's as its box showed them as it mounted, a pane's as the
 * scene handed them in (`sceneArticle`) — on the board; every position of the
 * span by identity, part by part, through the image the article was made
 * from, as the model names its bytes at the call (M-REC's `identityParts`;
 * FP-38) — a byte the page made by the address the board minted it at, though
 * the article was made before the ack, else by the page's own name and its
 * load, and a stretch that image does not place a gap of its width; and its
 * positions where a member is named, the article's text being that member's.
 * Null where the element is no such article, or the span is another
 * document's.
 * @param {HTMLElement} el the article's element
 * @param {Span} span a span of its text
 * @param {string} board the board's origin
 * @returns {Copied | null}
 */
export function namedIn(el, span, board) {
  const a = articleAt(el);
  if (!a || span.addr !== a.made.addr) return null;
  const { doc, member, plain } = a.where;
  return { board, doc, member, plain, pos: member ? span.pos : null, width: member ? span.width : null, ids: REC.identityParts(a.made.image, span.pos, span.width) };
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

/** @typedef {'start' | 'end' | 'focus'} SelectionEnd an end of the page's selection an act moved: its first line, its last, or the platform's focus point */

/** @type {{span: Span, end: SelectionEnd} | null} the page's selection whose moved end the next frame keeps clear of its document's head (`keepClear`); null where none is owed */
let clearing = null;

/**
 * The page's selection kept clear of its document's head (see the head;
 * FP-37): where the line the end the act that made it moved stands on, as its
 * article's fold sets it, has its top above the bottom of what the head
 * covers (`headClear`), the camera moved down by the least pan that brings it
 * below, no flight running; read once, and owed no more. Nothing where the
 * selection's document stands with no head.
 */
function keepClear() {
  const g = /** @type {NonNullable<typeof clearing>} */ (clearing), clear = headClear(g.span.addr), rec = mounted.get(g.span.addr);
  if (clear == null || !rec) { clearing = null; return; }
  if (flying()) return;
  clearing = null;
  const pos = endPos(g);
  if (pos == null) return;
  const top = sy(docBox(rec.d.addr).y + placeIn(rec.fold, pos).y);
  if (top < clear - 0.5) { panBy(0, clear - top); markDirty(); }
}

/**
 * The position the end of the page's selection an act moved stands at
 * (`keepClear`): its first byte, its last, or the one the platform's focus
 * point names where that point lies in the layer (`posAtNode`); null where
 * no such point stands to read.
 * @param {{span: Span, end: SelectionEnd}} g
 * @returns {number | null}
 */
function endPos(g) {
  if (g.end === 'start') return g.span.pos;
  if (g.end === 'end') return g.span.pos + Math.max(1, g.span.width) - 1;
  const s = typeof window !== 'undefined' && window.getSelection ? window.getSelection() : null;
  if (!s || !s.rangeCount || s.isCollapsed || !s.focusNode || !inLayer(s.getRangeAt(0))) return null;
  const at = posAtNode(s.focusNode, s.focusOffset);
  return at && at.addr === g.span.addr ? at.pos : null;
}

/** does a platform range lie in the plane's text layer, where the page's selection is drawn? */
const inLayer = (/** @type {Range} */ r) => !!layer && layer.contains(r.commonAncestorContainer);
/** does a field the reader types in hold the focus (N-FOCUS's `isField`)? A range placed then would take its caret (FP-20) */
const typing = () => typeof document !== 'undefined' && FOCUS.isField(document.activeElement);

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
 * this one now. While a field the reader types in holds the focus the span
 * is owed its range and nothing is placed, the caret being the reader's
 * (`typing`; FP-20). Where the act that made it moved one of its ends, the
 * next frame keeps that end clear of its document's head (`keepClear`).
 * @param {Span | null} span
 * @param {SelectionEnd | null} [moved] the end of the span the act moved — K-8's extended end, or the platform's focus point after a press or the platform's own keys; null where the act moved none it could leave under the head
 */
export function placeSelection(span, moved = null) {
  kept = null;
  owed = null;
  clearing = span && moved ? { span, end: moved } : null;
  const s = window.getSelection(); if (!s) return;
  const standing = s.rangeCount ? s.getRangeAt(0) : null;
  if (!span) { placed = null; if (standing && inLayer(standing)) s.removeAllRanges(); return; }
  if (typing()) { owed = span; return; }
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
 * caret in the page's text, wherever it stands, holds nothing they chose;
 * the caret of a field the reader types in is theirs, and while one holds
 * the focus the span stays owed, `kept` with it (`typing`; FP-20). `kept`
 * decides the anchor's end alone: taking an article down leaves a selection
 * that stood in it collapsed in the layer, where the put-back takes it. The
 * span owed its
 * range (`placeSelection`) goes on so; it stays owed while its first or last
 * line stands in no part, and stops being owed once the person holds a
 * selection of their own outside the layer.
 * @param {Span} span
 */
function placeAgain(span) {
  if (typing()) { owed = span; return; }
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
 * A move of the platform's focus the page makes over a selection the platform
 * holds in the text layer (N-WALK's, as the walk's element takes the focus):
 * the selection's two points read as they stand, the move made, and the
 * selection put back over the same points, its anchor at the same end, where
 * the move left it collapsed or took it away — as an engine that clears a
 * selection outside a field when the focus moves does — and its points still
 * stand in the page; left as the move left it everywhere else.
 * @param {() => void} move
 */
export function keepingSelection(move) {
  const s = typeof window !== 'undefined' && window.getSelection ? window.getSelection() : null;
  const was = s && s.rangeCount && !s.isCollapsed && s.anchorNode && s.focusNode && inLayer(s.getRangeAt(0))
    ? { an: s.anchorNode, ao: s.anchorOffset, fn: s.focusNode, fo: s.focusOffset } : null;
  move();
  if (!was || !s || (s.rangeCount && !s.isCollapsed) || !was.an.isConnected || !was.fn.isConnected) return;
  s.setBaseAndExtent(was.an, was.ao, was.fn, was.fo);
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
 * corner's state, at the pane's measure — what the scene keeps beside the
 * pane as it sets it, so the pane's marks and lines stay the ones its text was
 * set with, and it is set again from them with no read (SC; FP-23).
 * @param {Doc} d
 * @param {number} [cpl] the pane's measure, in characters of its face: the full measure where none is given
 * @returns {ArticleView}
 */
export const sceneView = (d, cpl = MEASURE_CPL) => ({ ...viewFor(d, true), cpl });

/**
 * A document's article for a reading scene's pane — the scene borrows the
 * mount (FP-12's second target; the structure record §3.4 (vii)): T-ARTICLE's
 * scene-mode variant, laid out by the pane's own style in one column at the
 * measure the scene fits the pane to and never transformed, and never hidden
 * from assistive technology as the plane's articles are, a pane's text being
 * what it reads there; what it was made from, and where its words were read,
 * are kept beside it (`madeOf`, `namedIn`) for as long as the element lives.
 * The scene places the element in its pane; this is the one place it is
 * made — from a record and the view it draws, the model's now or what the
 * scene kept of them as it last set the pane, and named by the addresses the
 * scene gives it: the one its acts name and its positions are mapped
 * against — at an edition read at its bare address, the member its text is
 * (SC; FP-23) — and the one its head shows; a copy from it names its words
 * where the scene says they were read (FP-27).
 * @param {Doc} d the record its text is made from
 * @param {{view?: ArticleView, names?: string, shows?: string, where?: Where}} [as] `view` the view it draws — the record's now (`sceneView`) where none is given; `names` the address it is made as (`Made.addr`), which its spans are measured against — the record's where none is given; `shows` the address its head names — `names` where none is given; `where` where its words were read, which a copy from it names — as a box showing the record names them (`shownWhere`) where none is given
 * @returns {HTMLElement}
 */
export function sceneArticle(d, as = {}) {
  const names = as.names ?? d.addr, shows = as.shows ?? names;
  const el = document.createElement('article');
  el.className = 'dtext scene';
  el.dataset.addr = names;
  el.innerHTML = articleHTML(shows === d.addr ? d : { ...d, addr: shows }, as.view ?? viewFor(d, true), REC.ownerAccount(d));
  panes.set(el, { made: { ...madeFrom(d), addr: names }, where: as.where ?? shownWhere(d) });
  return el;
}

/**
 * A document's article as P-LAY's plan — the rows its lines are predicted
 * from — from the same view its article is mounted with, over the record the
 * page shows of it (`shownDoc`).
 * @param {Doc} d
 * @returns {import('../plane/layout.js').Row[]}
 */
export function planOf(d) { d = shownDoc(d); return articlePlan(d, viewFor(d), REC.ownerAccount(d)); }

/**
 * A pane's corner items beside its column (ux-T2: each pane its own), whole
 * or compact (FP-26), from the view the pane's article is made from — the
 * record's now where none is given (`sceneView`); the scene holds their
 * element, on the pane's outer side, and hands in the version it names, the
 * chain's count and the corner's act (SC).
 * @param {Doc} d
 * @param {ArticleView} [view]
 * @param {boolean} [compact] the compact form: its usual states glyphs named by their words
 * @returns {string}
 */
export function sceneCorner(d, view = viewFor(d, true), compact = false) { return cornerHTML(d, view, compact); }

/**
 * A pane's corner at its document's head (FP-26; the plane's head form,
 * `headOf`): its rows across the pane's column — its text and its edge, at
 * the pane's measure and em — at the reading line's pitch (`headLayout`): the
 * pane's kept clause first, then the corner's items in their one order and
 * compact forms, each in its slot, those that never yield wrapped whole onto
 * the rows after, the offered read folded into "⟨n⟩ more" where its row
 * cannot hold it (`moreHTML`), each row holding an act a line of acts of its
 * own (`hrowHTML`); beneath its rows the form a reader's act opened — every
 * item whole on a glyph's or the count's act, its words alone where its rows
 * hold its act (`openedHTML`), a draft's kept statement on its kept word's
 * (K-74). No row names the document: the scene's bar names each pane's.
 * Its rows stand where its band sets them, each row and the form beneath
 * absolutely placed (the scene moves them as its pane scrolls); every corner
 * carries an item, its kind's slot first, so it stands one row at the least.
 * The scene stands its stops (`setStops`).
 * @param {Doc} d
 * @param {ArticleView} view the pane's view, at its measure (`sceneView`), with the corner's state the scene hands in
 * @param {{px: number, kept: KeptClause | null, open: boolean}} as `px` the em the pane's text is set at; `kept` the pane's kept clause; `open` its items opened whole by the reader's act
 * @returns {{html: string, rows: number}}
 */
export function sceneHead(d, view, as) {
  const items = cornerItems(d, { ...view, opened: as.open }, true, false), clause = as.kept;
  const pitch = LINE_H * as.px, width = ((view.cpl ?? MEASURE_CPL) * CHAR_W + EDGE) * as.px;
  const L = headLayout(headItems(items), 0, clause ? { w: cornerPx(clause.text), words: clause.text } : null, width, pitch);
  /** @type {string[]} each row's markup, by row */
  const rows = Array.from({ length: L.rows }, () => '');
  for (const s of L.slots) {
    const html = s.k === -1 ? keptHTML(clause)
      : s.k === -2 ? moreHTML(L.folded, as.open)
        : items[s.k].html;
    rows[s.row] += `<span class="hslot${s.rows > 1 ? ' wraps' : ''}" style="left:${s.x}px;width:${s.w}px;height:${s.rows * pitch}px;line-height:${s.rows > 1 ? '' : pitch + 'px'}">${html}</span>`;
  }
  const form = as.open ? openedHTML(cornerItems(d, { ...view, acts: false }).map((i) => i.html), items, L) : view.kept && view.keptOpen ? statementHTML(view.kept) : '';
  const html = rows.map((r, i) => hrowHTML(i, `top:${i * pitch}px;height:${pitch}px`, r)).join('')
    + (form ? openedFormHTML(`top:${L.rows * pitch}px;width:${width}px`, form) : '');
  return { html, rows: L.rows };
}

/** a document's corner on the plane, or null where it carries none now (the gate's containment check reads it) */
export function cornerOf(/** @type {string} */ addr) { const c = corners.get(addr); return c ? c.el : null; }
/** a document's corner as the last frame placed it: the column it stands beside — or across, at its document's head — whether it stands compact, whether a reader's act opened it whole (`openCorner`), and whether it stands at its document's head; null where none stands */
export function cornerAt(/** @type {string} */ addr) { const c = corners.get(addr); return c ? { column: c.column, compact: c.compact, opened: openWhole.has(addr), head: c.head } : null; }
/** where a document's corner stands on the plane as last placed, by the version its box shows: its right edge and the top its room gives it, on screen (px) — where an in-document find's box stands, the corner's items beneath it (N-FIND; `Readers.atop`); null where no corner stands */
export function cornerPlace(/** @type {string} */ addr) { const c = corners.get(read.shown(boxOf(addr))); return c ? { right: c.x + c.w, top: c.top } : null; }

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
 * @param {number} pos a position of the text shown (`shownOf`)
 * @param {number} width
 * @returns {Array<{line: number, column: number, rect: Rect}>}
 */
export function foldBoxes(addr, pos, width) {
  const rec = mounted.get(addr), d = REC.doc(addr);
  if (!rec && d.from < 0) return [];
  const f = rec ? rec.fold : foldOf(d), blocks = rec ? rec.made.blocks : shownDoc(d).blocks, box = docBox(addr), end = pos + Math.max(1, width);
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
 * @param {number} pos a position of the text shown (`shownOf`)
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
 * The platform's selection collapsed at the boundary point of the layer's
 * text under a screen point, as a press on that text collapses it (see the
 * head): the anchor a drag from there extends from (`extendTo`); false where
 * no text of the layer stands there, the selection left as it stood.
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

/**
 * The platform's selection collapsed at a position of a mounted article's
 * text (`pointAt`): the anchor a Shift+click in a draft the person may edit
 * extends from, set as the press begins (APP-INPUT's; K-70). False where no
 * article of the document stands, or no part standing holds the position.
 * @param {string} addr
 * @param {number} pos a position of the text shown (`shownOf`)
 * @returns {boolean}
 */
export function collapseAt(addr, pos) {
  const rec = mounted.get(addr), s = typeof window !== 'undefined' && window.getSelection ? window.getSelection() : null;
  const at = rec && s ? pointAt(rec, pos) : null;
  if (!at || !s) return false;
  s.collapse(at.node, at.offset);
  return true;
}

// ---- the caret (see the head) -----------------------------------------------------

/**
 * Is a document's text one the person may edit (D5 K-70): a draft under the
 * session's account — read from its address alone, never from an owner store
 * — whose text the page holds, at reading scale. The one test the caret's
 * placing, its keys and the swallow's draft form read.
 * @param {string} addr
 * @param {number} [scale] the scale it is read at: the camera's where none is given
 */
export function editable(addr, scale = cam.scale) {
  const s = REC.session();
  if (!s || !s.account || accountOf(addr) !== s.account || !REC.has(addr)) return false;
  const d = REC.doc(addr);
  return isDraft(d) === true && d.from >= 0 && !d.refused && atReadingScale(addr, scale);
}

/** the caret as it stands, by value; null where none stands */
export const caret = () => (caret_ ? { ...caret_ } : null);
/** what the next frame owes the caret (`placeCaretMark`): its mark in view and the platform's selection collapsed there, or kept as the page placed it; null where nothing is owed — read by the tests, the frame alone consuming it */
export const caretOwes = () => caretOwed;

/**
 * The caret set: placed, moved or kept — the frame brings its mark into view
 * once its part stands and collapses the platform's selection there, save
 * where `owed` keeps that selection, or owes it nothing (null).
 * @param {Caret | null} c
 * @param {CaretOwed | null} [owed]
 */
function setCaret(c, owed = 'collapse') { caret_ = c; caretOwed = c ? owed : null; markDirty(); }

/** a position of a draft's shown text clamped to the text it holds: its first position to one past its last; 1 where it holds none */
function clampPos(/** @type {Doc} */ d, /** @type {number} */ pos) { return d.from < 0 ? 1 : Math.max(d.from, Math.min(pos, d.to)); }

/**
 * The caret placed at a position of a draft's shown text (K-70), live: one
 * caret stands at a time, so a caret in another document goes. The frame
 * collapses the platform's selection at it, save where it is placed at the
 * moving end of a selection that stands (`keep`): a pointer's gesture's, or
 * the one a step extends from it (FP-40). Nothing where the text is none the
 * person may edit.
 * @param {string} addr
 * @param {number} pos a position of the text shown (`shownOf`)
 * @param {boolean} [keep] the platform's selection stands, the caret at its moving end: the frame keeps it as it stands
 * @returns {Caret | null} the caret as placed
 */
export function placeCaret(addr, pos, keep = false) {
  if (!editable(addr)) return null;
  setCaret({ addr, pos: clampPos(shownOf(addr), pos), live: true }, keep ? 'keep' : 'collapse');
  return caret();
}

/**
 * Enter at a focused span of a draft the person may edit (K-70; BM-52): the
 * caret placed at the span's start, or, where a kept caret stands in that
 * span, the one the walk stands on at the caret (`sameBlock`), returned where
 * it stood. Null where the text is none the person may edit.
 * @param {string} addr
 * @param {number} pos the span's first position in the text shown (N-WALK's)
 * @returns {Caret | null}
 */
export function caretToSpan(addr, pos) {
  if (!editable(addr)) return null;
  if (caret_ && caret_.addr === addr && !caret_.live && sameBlock(addr, caret_.pos, pos)) return returnCaret();
  return placeCaret(addr, pos);
}

/**
 * The span of the text the page shows of a document the walk stands on at a
 * position of it (N-WALK's grain): the element T-SPAN's rule stands the
 * position on (`elementIn`; D5 §4 rule 20) — in white space alone the span
 * before it, or the first where none stands before it — over that text's
 * blocks, a position at or past its end read at its last; null where it holds
 * no block there, or none is an element.
 * @param {string} addr
 * @param {number} pos a position of the text shown
 * @returns {Block | null}
 */
export function grainAt(addr, pos) {
  if (!REC.has(addr)) return null;
  const d = shownOf(addr);
  return elementIn(d.blocks, d.from >= 0 ? Math.min(pos, Math.max(d.from, d.to - 1)) : pos);
}

/**
 * Does a position of a draft's shown text stand in the span of that text
 * whose first position is `blockPos` — the span the walk stands on there
 * (`grainAt`) — the kept caret's span (BM-52)?
 * @param {string} addr
 * @param {number} pos a position of the text shown
 * @param {number} blockPos
 */
export function sameBlock(addr, pos, blockPos) {
  const b = grainAt(addr, pos);
  return !!b && b.pos === blockPos;
}

/** does a caret — live or kept — stand in the span of a draft's text whose first position is `blockPos`, the span the walk stands on at it (`sameBlock`; BM-52)? */
export const caretInSpan = (/** @type {string} */ addr, /** @type {number} */ blockPos) => !!caret_ && caret_.addr === addr && sameBlock(addr, caret_.pos, blockPos);

/**
 * The span the caret stands in, in the text shown (N-WALK's grain): the
 * caret's position, at the text's end its last, and the first position of
 * the block of the text shown the walk stands on there (`grainAt`) — the
 * block the caret is in, which `caretInSpan` answers true for; null where no
 * caret stands.
 * @returns {{addr: string, pos: number, block: number | null} | null}
 */
export function caretSpan() {
  if (!caret_) return null;
  const d = shownOf(caret_.addr), pos = d.from >= 0 ? Math.min(caret_.pos, Math.max(d.from, d.to - 1)) : caret_.pos, b = grainAt(caret_.addr, pos);
  return { addr: caret_.addr, pos, block: b ? b.pos : null };
}

/**
 * The text left (K-77; BM-4; D5 M-2): the caret kept where it stood, the keys
 * no longer reaching it. Esc, a move of the walk and a zoom past its reading
 * scale leave the frame owing it its mark brought into view and the
 * platform's selection collapsed there (`placeCaretMark`); a pointer's act on
 * another document, or a selection put there (APP-INPUT's, O-SELECTION's),
 * leaves it owing nothing, the view and the platform's selection standing on
 * what the act was made on (FP-37).
 * @param {boolean} [owing] the frame owes the kept caret its mark in view and the selection collapsed at it; false where the act's target lies elsewhere
 * @returns {{addr: string, pos: number, block: number | null} | null} the span it stands in, for the walk; null where no live caret stood
 */
export function leaveCaret(owing = true) {
  if (!caret_ || !caret_.live) return null;
  setCaret({ ...caret_, live: false }, owing ? 'collapse' : null);
  return caretSpan();
}

/**
 * A kept caret returned where it stood (K-70, K-77; BM-52): the keys reach it
 * again. A return a selection is extended from (`extending`; O-SELECTION's
 * `extendFromCaret`) keeps the platform's selection as it stands, so a step
 * the caret cannot make leaves the selection drawn; any other collapses it at
 * the caret. Null where no caret stands.
 * @param {boolean} [extending] a selection is extended from the caret returned
 * @returns {Caret | null} the caret as returned
 */
export function returnCaret(extending = false) {
  if (!caret_) return null;
  setCaret({ ...caret_, live: true }, extending ? 'keep' : 'collapse');
  return caret();
}

/** the caret dropped: none stands */
export function dropCaret() { if (caret_) setCaret(null); }

/**
 * Text typed at a live caret (K-72, K-76; BM-1, BM-54): one page-local edit
 * added to the draft — the text at the caret's position, nothing removed —
 * and the caret moved past it. False where no live caret stands.
 * @param {string} text
 */
export function caretType(text) {
  if (!caret_ || !caret_.live || !text) return false;
  WRITE.addEdit(caret_.addr, { pos: caret_.pos, width: 0, text });
  setCaret({ ...caret_, pos: caret_.pos + byteLength(text) });
  return true;
}

/**
 * A selection of the caret's draft replaced by the text a key puts in at the
 * caret (K-70, K-72, K-76; BM-70, BM-75): one edit removing its bytes and
 * placing the text — none for Backspace and Delete — the caret after it.
 * False where no live caret stands, the span is another document's, or it is
 * not whole in the text shown (`shownOf`): M-DERIVE applies no edit past one
 * outside that text (`applyEdits`).
 * @param {Span} span the selection, in the text shown
 * @param {string} text the key's text: its character, a new line, a tab; '' for Backspace and Delete
 */
export function caretReplace(span, text) {
  if (!caret_ || !caret_.live || span.addr !== caret_.addr) return false;
  const d = shownOf(caret_.addr);
  if (d.from < 0 || span.width < 1 || span.pos < d.from || span.pos + span.width > d.to) return false;
  WRITE.addEdit(caret_.addr, { pos: span.pos, width: span.width, text });
  setCaret({ ...caret_, pos: span.pos + byteLength(text) });
  return true;
}

/**
 * Backspace (dir −1) or Delete (dir 1) at a live caret (K-72): the character
 * before or after it taken out of the text shown — an item whole — as one
 * page-local edit, the caret at the removal. False where none stands there.
 * @param {-1 | 1} dir
 */
export function caretErase(dir) {
  if (!caret_ || !caret_.live) return false;
  const d = shownOf(caret_.addr), b = boundaries(d.runs, caret_.pos);
  const from = dir < 0 ? b.before : caret_.pos, to = dir < 0 ? caret_.pos : b.after;
  if (from == null || to == null || to <= from) return false;
  WRITE.addEdit(caret_.addr, { pos: from, width: to - from, text: '' });
  setCaret({ ...caret_, pos: from });
  return true;
}

/** @typedef {'left' | 'right' | 'wordLeft' | 'wordRight'} ArrowStep the step ← or → makes where the page makes it (K-70, K-71, K-77): a character or a word that way */

/** @typedef {ArrowStep | 'up' | 'down' | 'home' | 'end'} CaretStep a step of the caret (K-71; `caretMove`): a character or a word either way, a line up or down, its line's start or its end */

/**
 * The caret moved (K-71): ← and → a character — an item whole — or a word
 * (M-DERIVE's `wordStop`); ↑ and ↓ a line: where the platform stands the
 * text, the character boundary under the caret's mark a line above or below
 * (`caretPoint`); else the same offset into the typed line before or after
 * the caret's. Home and End to the start or the end of its line as the fold
 * sets it (`caretLineEnd`). A move that extends a selection (`anchor`;
 * O-SELECTION's `extendFromCaret`) keeps the platform's selection the page
 * places over it, a word step stopping at that anchor rather than crossing
 * it; any other collapses it at the caret. False where no live caret stands,
 * or the text holds nothing that way.
 * @param {CaretStep} dir
 * @param {number | null} [anchor] the anchor of the selection the move extends from the caret; null for a move that extends none
 */
export function caretMove(dir, anchor = null) {
  if (!caret_ || !caret_.live) return false;
  const d = shownOf(caret_.addr);
  /** @type {number | null} */
  let to = null;
  if (dir === 'left' || dir === 'right') { const b = boundaries(d.runs, caret_.pos); to = dir === 'left' ? b.before : b.after; }
  else if (dir === 'wordLeft' || dir === 'wordRight') to = wordStop(d.runs, caret_.pos, dir === 'wordLeft' ? -1 : 1, anchor);
  else if (dir === 'home' || dir === 'end') to = caretLineEnd(d, dir);
  else to = caretLineStep(d, dir === 'up' ? -1 : 1);
  if (to == null || to === caret_.pos) return false;
  setCaret({ ...caret_, pos: clampPos(d, to) }, anchor != null ? 'keep' : 'collapse');
  return true;
}

/**
 * The start or the end of the line holding the caret (`caretMove`), as the
 * fold the text shown stands in sets it — its lines set as the platform sets
 * them first where they are not (`renderedFold`): the line holding its
 * position (P-LAY's `placeOf`), save where a later line of its block opens
 * at that position with no white space before it — a break after a hyphen,
 * or inside a word — the caret then standing at the end of the line before
 * it. Home the position the line opens at (P-LAY's `Line.at`); End, where a
 * later line of its block opens, the line's last character's end, the white
 * space the wrap broke at left after it, else the end of its block's text,
 * the newline left after it — an item's line its item whole. Null where the
 * caret stands in no line the fold holds.
 * @param {Doc} d the text shown
 * @param {'home' | 'end'} dir
 * @returns {number | null}
 */
function caretLineEnd(d, dir) {
  const c = /** @type {Caret} */ (caret_), f = renderedFold(REC.doc(c.addr));
  let i = placeIn(f, c.pos).line;
  const holding = i == null ? null : f.lines[i], b = holding ? d.blocks.find((x) => x.pos === holding.pos) : null;
  if (i == null || !holding || !b || holding.at == null) return null;
  if (b.kind !== 'para') return dir === 'home' ? holding.at : b.pos + b.width;
  const ci = charOfPos(b, c.pos);
  if (holding.at === c.pos && holding.nth > 0 && ci > 0 && !isSpace(/** @type {number} */ (b.text.codePointAt(ci - 1)))) {
    for (let k = i - 1; k >= 0 && f.lines[k].pos === b.pos; k--) if (f.lines[k].at != null) { i = k; break; }
  }
  const opens = /** @type {number} */ (f.lines[i].at);
  if (dir === 'home') return opens;
  /** @type {number | null} the position the next line of its block opens at */
  let next = null;
  for (let k = i + 1; k < f.lines.length && f.lines[k].pos === b.pos; k++) { const a = f.lines[k].at; if (a != null && a > opens) { next = a; break; } }
  if (next == null) return b.pos + byteLength(b.text);
  const from = charOfPos(b, opens);
  let to = charOfPos(b, next);
  while (to > from && isSpace(/** @type {number} */ (b.text.codePointAt(to - 1)))) to--;
  return posOfChar(b, to);
}

/**
 * The position a line above or below the caret (`caretMove`): the boundary
 * the platform finds under the caret's mark moved by a line box, where the
 * mark stands; else the same byte offset into the typed line before or after
 * the caret's, clamped to that line's characters; null where no line lies that
 * way.
 * @param {Doc} d the text shown
 * @param {1 | -1} dir
 * @returns {number | null}
 */
function caretLineStep(d, dir) {
  const c = /** @type {Caret} */ (caret_);
  if (engine && layer) {
    const mark = /** @type {HTMLElement | null} */ (layer.querySelector('.caret-mark'));
    const r = mark ? mark.getBoundingClientRect() : null;
    if (r && r.height > 0) {
      const p = caretPoint(r.left + 1, dir < 0 ? r.top - r.height / 2 : r.bottom + r.height / 2);
      const at = p ? posAtNode(p.node, p.offset) : null;
      if (at && at.addr === c.addr) return at.pos;
    }
  }
  const blocks = d.blocks.filter((b) => b.kind === 'para');
  const i = blocks.findIndex((b) => c.pos >= b.pos && c.pos < b.pos + b.width);
  const here = i >= 0 ? i : c.pos >= d.to ? blocks.length - 1 : -1;
  const next = blocks[here + dir];
  if (here < 0 || !next) return null;
  const off = c.pos - blocks[here].pos;
  return Math.min(next.pos + off, next.pos + byteLength(next.text));
}

/**
 * The position of a point of the platform's — a node and an offset in a
 * standing part of a mounted article — in the text the article was made from
 * (`posOfPoint`): the one a click names (K-70). Null where the point lies in
 * no block part of a mounted article.
 * @param {Node} node
 * @param {number} offset
 * @returns {{addr: string, pos: number} | null}
 */
function posAtNode(node, offset) {
  const el = elementOf(node), part = el ? /** @type {HTMLElement | null} */ (el.closest('.run > .sp')) : null;
  const art = part ? /** @type {HTMLElement | null} */ (part.closest('article.dtext')) : null, made = art ? madeOf(art) : null;
  if (!part || !made) return null;
  const b = made.blocks.find((x) => x.pos === Number(part.dataset.pos));
  return b ? { addr: made.addr, pos: posOfPoint(b, part, node, offset, 'start') } : null;
}

/**
 * The position the platform's selection names in a mounted article where it
 * stands collapsed there — a click's own collapse at the character clicked,
 * or the press rule's (`caretAt`) — in the text the article was made from;
 * null where it stands elsewhere, or is no point.
 * @returns {{addr: string, pos: number} | null}
 */
export function caretFromPlatform() {
  const s = typeof window !== 'undefined' && window.getSelection ? window.getSelection() : null;
  if (!s || !s.rangeCount || !s.isCollapsed || !s.anchorNode) return null;
  return posAtNode(s.anchorNode, s.anchorOffset);
}

/**
 * The point of the standing part of a mounted article at a position of the
 * text it was made from: the block holding it, the one before where it is
 * the text's end, and the character boundary there (`pointOfPos`); null
 * where no part standing holds it.
 * @param {Mounted} rec
 * @param {number} pos
 * @returns {{node: Node, offset: number} | null}
 */
function pointAt(rec, pos) {
  const blocks = rec.made.blocks;
  const b = blocks.find((x) => pos >= x.pos && pos < x.pos + x.width) || (pos >= rec.d.to ? blocks[blocks.length - 1] : null);
  if (!b) return null;
  const parts = partsOf(rec.el, b.pos);
  return parts.length ? pointOfPos(b, parts, Math.min(pos, b.pos + b.width), b.kind === 'para' && pos >= b.pos + b.width ? 'end' : 'start') : null;
}

/** the caret's mark: the page's own, of no width, hollow where the caret is kept — no byte of the document, no text node of its own */
const CARET_MARK = 'caret-mark';

/**
 * The caret's mark set in the standing part at its character boundary (see
 * the head), each frame: every mark standing taken down, the text nodes
 * about it joined again, and one set where the caret stands in a mounted
 * article whose part holds its position — hollow where the caret is kept;
 * and, where the page placed or moved the caret since (`caretOwed`), once,
 * save under a press or while a field holds the caret of its own: the
 * platform's selection collapsed there, save where the move extended a
 * selection the page placed, which stands — the camera then moved by the
 * least pan that brings the mark inside the visible view, below the one line
 * and below what a corner standing at its document's head covers
 * (`headClear`), so no act leaves the caret under them (FP-37), no flight
 * running. Nothing where the platform does not set the articles.
 */
function placeCaretMark() {
  if (!engine || !layer) return;
  for (const m of /** @type {HTMLElement[]} */ ([...layer.querySelectorAll('.' + CARET_MARK)])) { const p = m.parentNode; m.remove(); if (p) p.normalize(); }
  const c = caret_, rec = c ? mounted.get(c.addr) : undefined;
  if (!c || !rec) return;
  const at = pointAt(rec, c.pos);
  if (!at) return;
  const mark = document.createElement('span');
  mark.className = CARET_MARK + (c.live ? '' : ' kept');
  mark.setAttribute('aria-hidden', 'true');
  const r = document.createRange(); r.setStart(at.node, at.offset); r.collapse(true); r.insertNode(mark);
  if (caretOwed && !pressed && !typing()) {
    const s = window.getSelection();
    if (caretOwed === 'collapse' && s) s.collapse(mark.parentNode, [...(/** @type {Node} */ (mark.parentNode)).childNodes].indexOf(mark));
    caretOwed = null;
    const q = mark.getBoundingClientRect(), clear = Math.max(read.top(), headClear(c.addr) ?? 0), { VW, VH } = viewport();
    if (q.height > 0 && !flying()) { const moved = panInto({ x: q.left, y: q.top, w: 1, h: q.height }, { x: 0, y: clear, w: VW, h: VH - clear }); if (moved.dx || moved.dy) markDirty(); }
  }
}

/**
 * A draft's kept word's statement opened in its corner on the word's act, or
 * closed again on the act (K-57, K-74; FP-26): `on` sets it, left out
 * toggles; the corner's items are made again from it (`placeCorners`), and a
 * pane's corner reads it too (SC). Nothing where the draft's kept state is
 * not set: there is no statement to open.
 * @param {string} addr
 * @param {boolean} [on]
 * @returns {boolean} whether the statement stands open now
 */
export function openStatement(addr, on = !openStatements.has(addr)) {
  if (!WRITE.keptOf(addr)) on = false;
  if (on) openStatements.add(addr); else openStatements.delete(addr);
  markDirty();
  return on;
}
/** does a draft's kept word's statement stand open in its corner (`openStatement`)? */
export const statementOpen = (/** @type {string} */ addr) => openStatements.has(addr);

/** unmount everything and take the corners, the held labels, the edges' signs, the caret and the open statements down (a board change), the line's bottom it framed below and the runs the statements stood beside forgotten; a corner that held the focus hands it to the walk */
export function clear() {
  for (const a of [...mounted.keys()]) unmount(a);
  hold = null; framedTop = NaN;
  owed = null;
  clearing = null;
  caret_ = null; caretOwed = null;
  openStatements.clear();
  shownCache.clear();
  let lost = false;
  for (const a of [...corners.keys()]) lost = dropCorner(a) || lost;
  for (const h of helds.values()) h.el.remove();
  helds.clear();
  for (const x of signed.values()) x.el.remove();
  signed.clear();
  anchors.clear();
  openWhole.clear();
  openLabels.clear();
  if (lost) read.handOff();
}

/**
 * The copy event's addition (foundations §2.4; FP-24, FP-27): the copy of any
 * selection in an article — a mounted one, or a reading scene's pane's, where
 * a drag selects as it does on the plane (§2.5) — replaces the clipboard, the
 * platform's own copy prevented, and beside the plain text and never in it,
 * in a flavor only a skep client reads, names the passage as FP-27 names a
 * copy (`namedIn`): the span the platform's selection covers in the article
 * it starts in, else ends in (`spanIn`), through the blocks that article was
 * made from, every position it holds by identity, part by part, where its
 * words were read and, where a member is named, its positions in that member
 * — never a draft's — written whether or not the span holds text. The plain
 * text is the span's items in the text's order as the article was made from
 * them (T-ARTICLE's `copyText`) — the bytes the person selected, whatever the
 * model has delivered since, each item that holds no text a stand-in in
 * square brackets in its place, so a span of a record alone is never an
 * empty clipboard — and a paste anywhere else carries the passage alone and
 * no label of the page (the head's, a hairline's, a mark's, a symbol's, a
 * count's, an item's rendering). A selection in no article leaves the event
 * to the platform.
 * @param {{clipboardData: {setData(format: string, data: string): void} | null, preventDefault(): void}} e the clipboard event (the gate's door hands a stub)
 * @param {string} board the board's origin
 * @returns {Span | null} the span copied
 */
export function onCopy(e, board) {
  const s = window.getSelection();
  if (!s || s.rangeCount === 0 || s.isCollapsed || !e.clipboardData) return null;
  const range = s.getRangeAt(0), art = articleOfRange(range), made = art ? madeOf(art) : null;
  const span = art && made ? spanIn(art, made, range) : null;
  const named = art && span ? namedIn(art, span, board) : null;
  if (!span || !made || !named) return null;
  e.clipboardData.setData('text/plain', copyText(made, span, originOwner));
  e.clipboardData.setData('application/x-skep-passage', JSON.stringify(named));
  e.preventDefault();
  return span;
}
