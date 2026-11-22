// SC — the reading scene (the structure record §3.2; B1-S9; foundations
// §2.5; law 12). Layer 2. ENGINE-BOUND. State (FP-10): the pair, the two
// ends it sets level, whether the far end names pane B's document whole, the
// bands' extents, the lines' ends, the strokes and the passages shared with
// the near one as measured in the panes, the last measure's figures, the
// stroke whose list stands, the stop's next passage, the passage its act last
// went to and whether its appearance was said, a stop the reader returned to
// with what its answer told and an act waiting on it, the panes' scrolls,
// the margin's marks each editor pane stands and the first held mark in each
// pane's view (`drawnMarks`, `heldAt`),
// each pane's span focus, the selection kept aside for a setting of it and
// the passage its last step carried, each pane's text — the record it was made from, the version it reads and
// the address it names, the links and far ends and its owner's byline facts
// it was set with — and its corner — opened whole or not, its head's rows —
// the fit both panes are set at, side by side or stacked, and the band their
// heads reserve, the settings reading and the acts and checks waiting on
// them, the element it was opened from and the link it was opened from, the
// tie the pointer stands on where the panes stack and the tie the last draw
// drew whole there, and its own end and the faces a returned stop shows, the
// app's to hand in; view state, never written (FP-7).
// Two documents at reading scale over the plane, side by side or, where side
// by side keeps fewer than HEAD_CPL characters a line, stacked (below), each
// pane scrolling on its own (R3); the places unmoved, the scene itself writing
// nothing — an editor pane's typing is its caret's (below); the dialog
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
// Where the panes stack (`PaneFit.stacked`; FP-12): pane A stands above pane
// B, both their facing edges on the right — the side a document's counts sit
// on the plane — so the two edges form one column between the panes and the
// scene's edge. Each tie is drawn at each of its ends as side by side draws
// it at that pane's edge, an em of its body leaving the edge and cut there:
// a band's end a bar — its ground and its edges at its extent, clipped with
// the stub's triangle — the two bars of one run joined by a hairline along
// the column at their cut (`drawBars`); a line's end its em at its passage's
// first line in that end's ink, clipped with the stub's triangle where that
// line has left the pane (`drawEnd`); a stroke's ends its em in each half
// side by side draws (`drawStrokeEnds`); a whole document's edge against its
// pane in the column. No body crosses between the panes save one, drawn whole
// along the column's outer side (`drawCrossing`): the tie the pointer stands
// on in the column (`hoverAt`), else the one holding the focus — a stroke's
// button's stroke, the band holding the passage the stop stands for, a
// returned stop's — else the line of the link the scene was opened from
// (`Held.link`), else none (`crossingOf`); a line in pane A's end's ink to
// the path's middle and pane B's after it, a band its ground along the path,
// a stroke its halves on the path's halves (FP-30). A stroke's one act, its
// button, stands on its half at pane A's edge, at that half's middle,
// whichever pane holds its changed bytes; the stop and a returned stop stand
// against pane B's facing edge in the column, their count after the
// triangle. "Level" stacked is the same distance below each pane's top: a
// whole document's end stands as far below its pane's top as the line's other
// end stands below its own, and the re-level and the stop's act, which bring
// each pane's line to a height below that pane's own top, set level so
// stacked as side by side. The wheel moves the pane under the pointer, and
// clipped and crowded ends stand per end and per spot, in both forms alike.
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
// facts (`dropped`) — the plane and the pane stating one byline. A pane's
// kind is read by the one test (T-LAYER's `isDraft`; FP-39), as the plane
// reads the same document's (`kindAt`). A draft — any text no publication
// fixes, and any whose kind that test cannot tell — is read again whole and
// set in its place, the first span in view holding still and the pane's
// selection following its words (below). An edition read at its bare address
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
// pane's place: the selection, else the passage the pane's last step carried
// where its text holds it (`Pane.landed`), else the first span in view,
// carried into it by `compare` and kept on its line (`carryInto`,
// `carriedTo`) — the pane's landing from then on — the corner
// saying so where the version lacks it, and the version left one act away —
// the pane's own state, never a box's: N-GO's pins are never touched
// (FP-22). The page's own death reaches every pane at once, as does every
// other change of its class (M-PUMP's `classChanged`): each is set again from
// what the change left of its record — a text read as published standing,
// its runs from drafts withheld runs and the links homed in drafts gone with
// their ties, the reader's place carried into it and the selection following
// its words; any other taken down to its cover, its reader's place and its
// selection kept by their bytes for its read at the new class, the selection
// standing none meanwhile — no band standing; then each is read again
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
// article made and swapped in, the reader's place and the ends set level
// carried by their bytes' identity through the images the two articles were
// made from, the selection following its words (below), the ties measured
// anew and drawn. While a pane is
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
// The bar says a refusal of the `compare`, at the opening or after it, as a
// read's: its own words where it asks for the texts compared in parts, else
// the one read cause O-FACES words every refused read by (`barWords`).
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
// and its positions where the pane's corner names that member (`whereIn`),
// never a draft's — the stop's passage of pane B and the one its act last
// went to (`sharedStop`), a stroke's runs' facing bytes and each change's
// bytes on each side (`strokeStop`) — with where it stood; and a stroke's
// list standing, by its stroke's key, with whether the focus stood in it
// (`Listed`; FP-36). A cursor move back onto the entry reopens it so
// (`reopen`): each pane's record read again — an edition read at its bare
// address whose chain went past the member its text was, pinned to that
// member (FP-23) — the two ends set level, each pane whose text holds its
// place's bytes brought back to them, any other left where the re-level set
// it, its selection put back on the same bytes, the focus on the stop it
// stood on and the pair named in the status region; the stroke's list shown
// again over the stroke bearing its key once the strokes are measured, its
// rows read from the panes' texts then, the focus on its first row where it
// stood in the list — the gone line said where no stroke bears the key
// (`relisted`).
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
// refused document's own words, in the bar's hidden words (`paneLead`); a
// past state's or the held version's title, at every fit, by its line's own
// element (`titled`, `titleId`), whose words are its line as it stood when
// the state the pane shows was set, heard, a device's label in it kept as
// written, held while that state stands whatever its line draws since
// (`Pane.titleWords`; FP-26) — then, where a past state stands in the place
// of the one its act asked, the words saying why by their own element, heard,
// so the name follows them as each answer changes them (`whyId`) — then its
// own document's address, the head of
// the article it holds (`namePane`) — pane B, where the far end names its
// document whole, by those and ST's `L.scene.whole-end` after them,
// `aria-current="location"` on it, the end being the document and no passage
// of it; a past state's pane described by its line's clauses after its title
// that stand, in the order its corner draws them — that it is how the draft
// stands now, that it is not its minute's last, that the state its act asked
// is read again — and described anew wherever they change (`pastClauses`),
// never named by them — its kind said once in the status region where its corner's slot
// fills while the focus stands in the pane, a titled corner, which stands no
// slot, saying none (`sayKind`; FP-36).
// Each pane holds a span focus of its own (`Pane.focus`), the platform's
// focus in one pane at a time (FP-20), walked by T-SPAN's grain over the
// pane's own record — a past state's and the held version's apart from the
// plane's: where no caret is live in it, ↓ and ↑ move it by span, a blank
// line none — a span focus the pane's own scroll left out of view taken again
// at the span in view first, as the plane's walk is after a camera move — its
// top brought to the pane's visible top and the span said in the status
// region as the mirror names one (`walkPane`, `showSpan`, `saySpan`; K-60); PageDown and
// PageUp move the pane by most of its height, Home and End to its first and
// its last span (`move`); the focus come into a pane's text — Tab, a click,
// the way back's act — stands it on the span in view, the kept caret's span
// where that stands in view (`entered`, `spanInView`; K-61); it is drawn lit
// by T-ARTICLE's rule (T-LAYER's `markPaneFocus`).
// A pane holding the current text of a draft of the person's own is its
// draft's editor (`editor`; FP-38), whatever the camera's scale on the
// plane; a past state and the held version of the draft, which name its
// address too, are none. M-PUMP keeps its draft as the view's while it stands
// (`editorPanes`, handed to it as its `editing` reader, the app's), so a row
// or a refresh reads the draft again in place and drops nothing of it from
// under the pane. T-LAYER serves its caret there — the editor panes
// handed to it as they stand (`editorPanes`; its `panes` reader) — placed by
// a click at the character clicked, a drag's release at its moving end, the
// selection standing (`textAct`), or Enter at its span focus (`enterSpan`;
// K-70); its mark set in the pane's article and brought into view by the
// pane's scroll (`intoPane`), the camera standing; every caret key the
// plane's (N-KEYS'), the paging keys moving it with the pane (`pageCaret`);
// a live caret's span the pane's span focus (`followCaret`). Each frame that
// moved the text the page shows of the draft — the person's typing, or the
// record under it — sets the pane again from it (`followShown`), whether or
// not a setting of it reads, a setting landing on that text as it stands
// then (`update`); the other pane, its scroll and the caret unmoved. Where
// both panes are editors each keeps its draft's caret, one live at a time. Opened over a caret, the
// scene keeps it (N-GO's): where its draft is an editor pane's it stands
// kept there, hollow, the pane's span focus on its span (`stand`). A key the
// scene swallows is answered by the line of the pane it is pressed at, the
// pane's corner among it, by the pane's own test, never the address its
// corner names (`siteOf`, `paneHolding`; N-KEYS' `paneSays`); the way back
// the line's ending offers moves the focus into the editor pane holding the
// kept caret, onto its span (`toCaret`). An editor pane carries the
// margin's marks beside the words its draft holds that the board has not
// kept (B3-S2; FP-31, FP-38), as T-LAYER reads them beside the pane's
// article's lines (`paneMargin`), by the plane's one rule: each in the room
// between its column's text and its edge's signs on the pane's facing side
// at the pane's em, in the pane's content so its scroll carries them, a
// bar's top clipped below what its held head covers; and the word "held"
// once per pane, at the top of the first held mark in its view, a sign of
// that edge (`placeMargin`, `placeStatements`) — drawn and never announced.
// The marks are placed each frame before a face reads the pane's lines, and
// again as the scene draws. A face the person's act at the
// caret raises — O-DELETION's: a removal's mark and its face, a paste's
// face — stands at the line of the editor pane holding its draft that its
// site stands on, the site placed by its bytes in the image the pane's
// article was made from, leaving the line past the signs its column's edge
// holds and the margin's marks level with it, inside the room the pane gives
// a face: its visible box below what its held head covers, clear of its
// corner beside its column and of its corner's foot (`editorLine`); a pane's
// scroll marks the frame, so the face is placed again as the pane moves
// (FP-9). The scene's close
// re-takes an editor pane's caret and the span its view was anchored at — the
// first span in view, of two editors the one whose caret was last held — into
// the entry it lands on (`editorAnchor`; N-GO's; B3-S1).
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
// merge's list — handed to `open` in an address's place, or derived as the
// scene opens (below): nothing is read for it, its article is made from the
// record as given, its corner and its place are kept as a read pane's, and the
// entry a leaving records keeps the record itself (`Version.derived`), so a
// return reopens it reading nothing — save a past state's, whose entry keeps
// the state its act asked and never the record shown, so a return reads it
// again (below). A
// derived pane is read only: no `compare` is asked against it and no
// `project` into it — the runs the two texts share are read off the images
// their records hold by the bytes' identity (`sharedBetween`; M-REC's
// `sharedRuns`) and banded as `compare`'s runs are, side by side and stacked
// alike; the links shown at it and the far ends crossing into it
// stand where their bytes stand in its own image, and none on bytes the page
// made (`placedInto`; LK's `shown`) — no row of the board's sets it again (its
// text is the page's, not the board's), its corner offers no version and its
// kept slot stands empty, save the held version's and a past state's (below);
// the text the page shows of a draft, derived by its own edits alone, is the
// draft's current text, its corner the draft's (`current`); a change of the
// page's class sets it again from the model's record of its document, as
// every pane (FP-29). Opened as a draft's history (`Held.past`; B3-S7; N-GO's
// `history`) on the draft's address, pane B is a state of the draft derived
// at a position (M-DERIVE's `recordAt`): the state the act asked
// (`PastHeld.asked`) — a past one read from the board's history at the
// position its commit was made at, refused there as reclaimed, at the last
// position it stood, before the draft's next commit (M-PAST's
// `stoodUntilAt`), or the
// committed one the board names below it, unless asked there already or the
// refusal's floor lies past it (`askState`; M-PUMP's `stateAt`); the newest
// row's the draft as the board holds it now, read as the plane's acts read a
// document and never from the board's history (M-PUMP's `stateNow`) — and
// where the past one is refused, the newest kept state in its place
// (`pastState`): the act's own read shown as the scene opens
// (`Showing.past`), and read again as it reopens, over the rows its entry
// keeps and those of the draft written since (`pastSince`), for its entry
// keeps the state asked and never the record shown nor why (`pastSource`,
// `asLeft`). Its corner is titled by what it
// is at every fit, in the kind's place (`titled`) — "as it stood ⟨time⟩ ·
// ⟨hand⟩", a key of the reader's own named by its device label alone
// (`handFields`) — with the chip after it, and where it shows another state
// than its act asked a line saying why (`pastLine`, `pastWhyOf`), the
// latest refusal the asked state's reads met worded as a read's, each taken
// as every one is (`metBy`): reclaimed, in O-FACES' words (`Faces.words`),
// naming the board and the date it keeps states back to, the day
// of the feed's row at the floor the refusal names (`floorOf`; M-PUMP's
// `rowAt`), "a time not recorded" where the board lost that row's time; where
// it names no floor or no row there is read, the time the state shown stood,
// "a time not recorded" where its row holds none; that its history is busy,
// whatever the refusal, while the scene
// reissues the asked state (`reissue`) — a whole read at a time, the first RETRY_MS after
// the last answer, each pause twice the one before, PAST_RETRY_MAX_MS at the
// most (`reissueGap`), and only while its answer is one the board classes as
// retry (BM-HELD's `busy`) — until it lands, the scene closes or reopens, or
// another state is asked; any other, that it could not be read as it stood
// at the asked row's time and why, the one read cause O-FACES words every
// refused read by (`Faces.cause`; `unreadOf`) — the state asked again
// by nothing but a press of "read it again" beneath the line, drawn as that
// line first stands and standing until pane B shows the state asked, never
// beside the reader's not being let read the draft, inert with its reason
// while the scene reissues or the board is not answering (`againOf`), each
// press asking the state as a return asks it and saying its answer in the
// status region, changed or not (`readAgain`; FP-41); and where the state
// lands pane B set again to it in one step (`setPanes`; FP-23), the line and
// the act gone. A state is one commit of the draft (M-PAST's `stepFrom`):
// pane B's corner carries its two one-state steps, "‹ earlier" and "later ›",
// at the ends of its first row — at its document's head the title's, the
// title laid out between them; beside its column above it — one line of acts
// of their own, outside the pane's name (T-ARTICLE's `stepsHTML`), each one
// commit back or forward from where a step counts — the state last asked
// while its read is out, where the person is going, else the state shown
// (`stepBase`) — and a row's act its row's last state (`rowAct`); the keys
// Alt+↓ and Alt+↑ anywhere in the scene with no caret holding the focus, and
// the list's ↓, ↑ and Enter (N-KEYS'; D5 K-102). Each inert at the end it
// cannot pass, its reason said at every press (FP-41; `stepsOf`): "‹ earlier"
// at the floor's line, its words; at the draft's first state, once the rows
// read reach the draft's first position; at the oldest row read where they end
// at the feed's floor instead, the floor's words for it; "later ›" at the
// newest kept state, "this is how the draft stands now", or that it is the
// newest kept state and what was written since is not yet kept, where the
// draft held such words as its history opened. Every state asked — a step's,
// a row's, "read it again"'s — goes through one entry (`askPast`): asked
// anew, any reissue of the state asked before it ends with the line that
// answered it; one read at a time, of the latest state asked, a press while
// one is out moving the request alone — a held key's repeats reading nothing
// of their own — the read that answers meanwhile landed with no rest, then
// the latest read; the newest kept state read plainly (`readPast`); a state
// beneath the floor's line never read. Each lands in place with no flight,
// pane B set again in one step, the passage the step carries — pane B's
// selection, else the passage its last step carried (`Pane.landed`) — kept
// on its line where the state holds it, else what stood at its place kept
// on screen by its bytes (`landPast`; FP-23), its row's day opened and the
// row brought into view in the list where it stands in its column
// (`showRow`), the landing said once where it rests, what pane B's
// selection's following says after it in that message; a
// refusal at the floor stands the floor's line, pane B, its line, its name and
// its description as they stood, the state last asked the one shown again,
// and its words said once (`refusedAtFloor`); any other refusal taken as every
// one is. Once a state rests — nothing later asked while its text was read —
// the links that stood on its words are read at its position and pane B set
// again in place with them (`restLinks`), the newest kept state's the model's
// record's (`newestLinks`): until they are, its corner says "links — arriving"
// at a rest, "links not read" where it landed while the steps ran, and that
// reading them failed past the bound, its count places hollow (LK's
// `countAt`). Between the title and the chip
// stand its line's clauses, each derived from the rows and the reads as they
// stand (`pastLine`), held with the title at its document's head and none ever
// folded (T-ARTICLE's `stateItems`): the links' word, after the state's hand;
// where a newer row of the list shares the
// shown row's recorded minute, "one of ⟨n⟩ changes that minute, not the
// last", in the place of the words saying the state is how the draft stands
// now, its count an empty slot of its width until the rows read pass that
// minute or reach their bottom (M-PAST's `notLastOf`; `readOlder`); and while
// the state last asked is read — its read out for an ask, or the scene
// reissuing it (`reads`) — "reading ⟨time⟩", that state's
// time in the title's form, carrying the one running mark, its own element
// busy and never the pane (T-ARTICLE's `PastLine.reading`). The line is said
// once in the status region as it first stands — while the scene reissues,
// with the in-flight clause after it — again only where a later answer
// changes those words, and a landing once, in the words pane B's title names
// its state by (`sayLine`, `landPast`; FP-36) — the bar naming the state
// shown with when it stood, "as it stood ⟨time⟩" (C-363), which the one line
// names too (`pastAsOf`); beside it
// stands the list of the draft's past states (`standList`; FP-36): side by
// side, in a column of its own at pane B's outer side, from the panes' top to
// the scene's foot, as wide as its head needs (`listPx`), while the panes
// beside it keep HEAD_CPL characters a line (`PaneFit.outer`), else after
// pane B's text — the rows M-PAST makes of the
// draft's feed rows, newest first, by day, the days open on opening those
// M-PAST's `openOnOpening` names for the room the list is given, a day's head
// folding or opening it on the reader's act alone (`foldDay`), each row its
// time of day in a slot as wide as the widest and what it did beside it,
// each row an act (`rowHTML`), the row of the
// state shown marked, or its folded day's head; the asked row saying
// "reading" after its words while its state is read, and "not
// read" there while the line says its read stopped, or its folded day's head
// (`askedOf`); where a read was refused at the board's floor — the act's, a
// step's, a row's — the floor's line, placed by the floor the refusal names,
// else directly above the row asked, and rising only (`cutOf`, `placeCut`): a
// hairline across the column labelled with the floor's words, beneath the row
// whose state stood at the floor, or its folded day's head, every row below it
// standing in its place, focusable, opening nothing and saying why at every
// press (`floorWords`, `listHTML`, `rowAct`) — no date or log position, the
// search index's floor never placing it; the list one stop of the scene's
// ring, ↓ and ↑ along its acts (`standStops`, `listKey`), the focused row held
// still as the list is written again (`writeList`); above them, where the draft
// held words the board had not kept, "now — not yet kept". Rows arriving
// after it stands — those below the history read's reach, read as it stands
// down to the feed's first position, or the first one its files hold, and read
// again once the board answers while the not-last clause's count waits on them
// (`readOlder`), and a feed row naming the draft — open no day, the first row
// or day standing in view held where it stands; pane B's corner and its
// description follow the line the rows now decide (`pastLine`) together, in
// one step (FP-33), so a row above the state shown takes from both the words
// saying it is how the draft stands now, and a newer row of its minute gives
// both the not-last clause, said once in the status region, politely, as it
// first stands; nothing else is said there (`arriveRows`). Pane A, the
// draft's current text, stays its
// editor: its corner keeps the draft's kept word and its
// second act, which there moves the focus into the history pane (`focusPast`;
// N-GO's), and opens the draft's history from any other scene's pane
// (`historyAct`). In a stacked scene an editor pane's corner keeps its kept
// line and any face at its head and stands the rest at its foot, after its
// text (`footed`, `placeFoot`; foundations §2.5).
// Opened as the moved scene
// (`Held.heldB`; D6 BM-14) on the draft's address, pane B is the held version
// (`Pane.heldVersion`), derived as the scene opens (`heldSource`): once the
// draft's flight has landed, its text at the base its held lines name, read
// from the board's history (M-PUMP's `stateAt`), with those lines applied in
// their order (M-DERIVE's `applyHeld`) — the text the page shows of the draft
// where it holds no line by then, the lines name more than one base, one does
// not apply, or that history is reclaimed or busy; opened on a record, pane B
// is that record. Its corner is titled by what it is at every fit, in the
// place of the kind, the kept word and the chip (`titled`; T-ARTICLE's
// `held`; B3-S2), and at a selection in its text while the
// focus stands in it the acts that send — and a printable key — give the one
// reason that selection keys (`heldVersionReason`): that its words are not in
// the current text, where any byte of it pane A's image does not place, else
// that they are in the current text too; set from a record not derived, it
// is the held version no more. A pane of a draft carries
// the draft's kept word in its corner (T-ARTICLE's draft arm; B3-S2), the
// statement open or closed as T-LAYER holds it (`openStatement`), its items
// written again as the word or the statement moves (`markKept`), and the
// kept word's act opens the statement (D5 K-57, K-74; `keptAct`) where the
// draft has a kept state. The panes
// borrow T-LAYER's mount (FP-12; the structure record §3.4 (vii)):
// `sceneArticle` makes each pane's article from the record and the view the
// scene keeps, `madeOf` and `rangeIn` map a position through the blocks it
// was made from, and T-LAYER's copy event serves the panes (FP-24). Each
// pane is a site of its own whose selection is O-SELECTION's (FP-10): read
// there by its side wherever the scene reads it — the focused pane's the
// platform's live one, read first — set there by the scene's own acts
// (`setPane`, `clear`), placed in its article alone and drawn inactive there
// while the other pane's is the live one (its `drawPanes`, run as the scene
// draws, the boxes it draws where the platform draws no custom highlight
// being the scene's: `placeSelBoxes`), the focus come into a pane — its
// text, its corner, its list of past states (`focusedPane`) — making its
// selection the live one (its `focusIn`; Q4), handed each setting of its
// pane to follow its words into the text the pane takes — moved where they
// stand in one piece, else ended, what that says said in the setting's one
// message (its `followPane`; Q2; `setPanes`) — and ended as the scene stands
// anew or closes (its `endPanes`); each pane keeps the passage its last step
// carried, its landing (`Pane.landed`) — the passage held as the scene opens,
// then what its corner's version read and a past state's step carried — so a
// step with no selection standing carries that; the selection the act that opens a scene
// was made over is set, by its bytes, as the selection of the first pane —
// pane A, else pane B — whose text places all of them in one stretch, once
// both panes stand level (`carrySel`; `Held.sel`; Q1); each article made with
// where its pane's words are read (`whereIn`), so a copy from a pane names
// its words as one from the plane's box names the same words (FP-27); the
// scene keeps no DOM text of its own. Each pane carries its own document's
// corner (ux-T2; T-LAYER's `sceneCorner` and `sceneHead` make its items), its
// first slot its document's kind by the one test (T-LAYER's `kindOf`; FP-33),
// save a past state's or the held version's, which its title leads in either
// form, beside its column or at its head (`titled`; FP-26, FP-39):
// named by its own words (D5 K-57), its stops the pane's next after the pane
// itself in either form — a line of its acts holding one stop, or the corner
// itself where it holds none (T-LAYER's `setStops`) — and an act's click,
// the pointer's or the one the platform makes from its Enter or Space, takes
// it — a press on the act leaving the pane's selection standing, the
// passage the act carries. The scene fits both panes once (`fitOf`,
// `paneFit`; FP-12, FP-26) from its own width, never the panes' as they
// stand, so the form a fit sets never moves the next fit: by P-LAY's fit
// (`fitFor`) of a pane's content box side by side — half the scene's width
// less half SIDE_GAP, less the pane's padding — at the reading size
// (P-CAM's), no margin past the column's edge — the pane's padding holds that
// room — and never shrinks their face: each pane's text is one column, the
// style's `--measure` advances of its face, both panes at the fit's measure
// and em — MEASURE_CPL with both corners whole beside their columns wherever
// a pane holds it so; else both compact, their usual states glyphs, the
// measure kept while it holds, then narrowed in characters while it keeps
// HEAD_CPL beside them; below that both corners stand at their documents'
// heads and their room goes back to the measure, the room beside the
// column's edge alone, while that keeps HEAD_CPL characters; below that the
// panes stack, and both are fitted by the same rule to a pane's content box
// stacked — the scene's width less the column. The threshold is read in the
// face's advance as rendered (P-LAY's `CHAR_W`), so the face and page zoom
// move it. A draft's history stands the list's column at pane B's outer side
// (`PaneFit.outer`): side by side both corners stand at their documents'
// heads at every width, and the column's room comes out of both panes'
// content boxes, half from each, never from SIDE_GAP, while each keeps
// HEAD_CPL characters a line beside its column's edge; below that the column
// stands after pane B's text and the panes are fitted without it, their
// corners at their heads still; the panes stack where any scene's do. Beside
// its column a corner stands on the pane's outer side — pane
// A's left, pane B's right, side by side; both left, stacked — held to the
// top of the pane's scroll, so the bands and lines leave the facing edges
// clear of it (foundations §3.1). A past state's corner and the held
// version's are titled in every form (`titled`; T-ARTICLE's `cornerTitle`):
// its line first, in the kind's place, no kind's slot standing, broken at its
// joiners first and then between its words as T-LAYER breaks it, never folded
// — beside its column on the lines the corner's width takes, a substitution's
// words after it, the rest of its corner after them, a past state's clauses
// among them wrapped between their words, whole and compact. At its
// document's head (the plane's head form; T-LAYER's `sceneHead`) it stands
// above its text across the column and its edge, its rows at the reading
// line's pitch, both heads reserving the more of the two corners' rows, so
// both texts begin at one depth (`setBand`) — its rows held at the pane's top
// as the pane scrolls, through the last that stands what the pane must not
// lose: which state it shows, a face, its title (T-LAYER's `HeadLayout.held`),
// the corner's own box (`Pane.heldRows`). A title there stands on rows of its
// own — as many as its lines take at the fit, and never fewer while the fit
// stands (`Pane.titleRows`) — a substitution's words held with it, a past
// state's clauses held on the rows after it, the rest of its corner on the
// rows after them. Its later rows
// scroll with the text, under the held rows and out at the pane's top, clipped
// there and never hidden, so each keeps its Tab stops, a focus coming to one
// scrolling the pane the least that brings it below them (`placeHeads`,
// `headInView`) — and no line the re-level, ↓ or ↑, the stop's act or a
// carried place brings to the pane's top stands under what those rows and a
// form opened beneath them cover (`clearOf`). A corner's acts are buttons the
// platform activates — Enter at its press, Space at its release — each act its
// click's, a pointer's or the platform's (`attach`): the read offered, the
// kept word opening its statement (`keptAct`), a glyph or a head's count
// opening a compact corner whole over what stands beside it, moving nothing,
// and the same act, the words a glyph opened among them, closing it again
// (`openWhole`; FP-26); its stops are T-LAYER's (`setStops`), following the
// focus along a line of acts (D5 K-57; FP-20). Each column stands against the pane's
// facing edge, its column's edge between them — its counts there, and the
// statements of the origins its runs of other documents' material are of,
// withheld and transcluded alike, each once per origin in the pane by the
// plane's one rule, held inside its text as the pane scrolls
// (`placeStatements`; FP-31), an editor pane's margin's marks between that
// edge and its column's text and the word "held" among its signs (above) —
// the bands leaving the pane beyond them
// (foundations §3.1; FP-26): a window wider than the measure needs widens the outer
// margins, never the line. Nothing in a pane's article is a control
// (T-ARTICLE's scene-mode variant; B1-S9): the keys a pane takes where no
// caret is live move its span focus and that pane alone (`key`), and only an
// editor pane takes a caret (above). The bar names each pane by
// the address it shows, in the identifier's face (P-REG's FACE), so no head's
// row names it. The scene's acts are its bar's
// buttons — re-level (K-62, its chord drawn for the platform, rule 19) and
// the dismissal, the scene's own end — each named by its words alone and
// exposing its key (`aria-keyshortcuts`; patterns K1, K3), pressed by a
// click anywhere on it, by Enter or by Space, a pane's corner's act, and a
// stroke's. Every name, description and message the scene sets or says is
// rendered for the ear by S22's table (ST's `heard`): a returned stop's name
// read back off its button said as it stands (ST's `asHeard`), a pane's
// documents' words kept as written, and the pair the status region names
// parted by a pause.
// A change of the panes' size, or a face that arrives once they are set
// (`refaced`), fits them again (`refit`): where the measure, the corners'
// form, the em or the panes' form moves, both panes are set again in one step at it, their
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
// triangle, its count before it side by side and after it stacked; a
// stroke's button 26 px tall, centred on the middle of the halves drawn —
// stacked, on its half at pane A's edge, half an em out — its count in its
// top 11 px, clear of the stroke; a returned stop's passage named by its
// first 48 characters at most, cut on a word. Side by side the panes stand
// SIDE_GAP px apart, the list's column, where one stands, as wide as its
// head's stop and both step acts set on one line a space apart at the list's
// size, rounded up, with LIST_PAD px of padding on each side, a rule
// LIST_RULE px wide at its inner edge and the platform's scrollbar
// (`listPx`); stacked, the column is COLUMN_EM of the reading size's
// em wide (`columnPx`), each end an em of the panes' from the edge — half the
// column at most — a band's two bars joined by a hairline HAIRLINE_W px wide
// at their cut, and the one tie drawn whole along the column half an em
// inside its outer side, a band's body there a strip a quarter of an em
// wide; the pointer stands on an end within HIT_PX of its line. A margin's
// mark stands P-REG's MARGIN in the pane's em: `inset` past the column's
// text, a bar `width` across, a zero-length form a `point` square, the
// bracket's `stroke`, each 2 px across at the least and the stroke 1 px. A
// past state the board was busy on is asked again M-PUMP's RETRY_MS after its
// last answer, each pause twice the one before, PAST_RETRY_MAX_MS at the most
// (both unmeasured).
// Rules: FP-1, FP-2, FP-7, FP-10, FP-12, FP-13, FP-20, FP-21, FP-22, FP-23,
// FP-24, FP-25, FP-26, FP-27, FP-29, FP-30, FP-31, FP-33, FP-34, FP-36,
// FP-38, FP-39, FP-40, FP-41.

import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as F from '../model/frames.js';
import * as LAYER from '../text/layer.js';
import * as LK from '../links/links.js';
import * as HOST from '../overlays/host.js';
import * as SEL from '../overlays/selection.js';
import * as WALK from '../nav/walk.js';
import * as FOCUS from '../nav/focus.js';
import { drawChord, keyShortcut } from '../nav/keys.js';
import { copyText, keptHTML, placeholderOf, edgeSignsFor, edgeStatementHTML, edgeKeyHTML, edgeCountHTML, originRunsOf, textIn, sourceStatementHTML, cornerLeadRuns, cornerTitle, titleRuns, kindWord, statedChain, notLastWords, inFlightWords, pastClauses } from '../text/article.js';
import { inkOf, strokeOf, strokeIn, cutAt, pointOn, pastSigns } from '../beams/beams.js';
import { piecesOf, heldOf, saidOf, unknownOf, lineOf, floatingLineOf, busy, whereOf, nameIn } from '../beams/held.js';
import { SAMENESS, HOLD, LABEL_MIN_PX, MARGIN, cornerWidth } from '../plane/register.js';
import { LINE_H, MEASURE, MEASURE_CPL, HEAD_CPL, CHAR_W, EDGE, EDGE_GAP, fitFor } from '../plane/layout.js';
import { holdStack, LINE_BOX } from '../plane/labels.js';
import { markDirty, READING_PX } from '../plane/camera.js';
import { documentOf, homeOf, memberOf, versionAddress, isTrunkMember } from '../model/address.js';
import { applyHeld, recordAt, withLinks } from '../model/derive.js';
import { elementIn, isElement } from '../text/span.js';
import * as PAST from '../model/past.js';
import { t, tHTML, tRuns, plural, joinRuns, runsText, asRuns, facedHTML, heard, asHeard, sentence, sentences, asSentence, fields, stoodAt, FIELD } from '../strings.js';
import { esc, byteOffsets, numeral, dayOf, timeOf, fingerprintCue } from '../util.js';

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
/** @typedef {import('../beams/beams.js').Rect} Rect */
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
 * @property {boolean} [heldB] the scene is the moved scene (D6 BM-14): the second pane is the held version (`Pane.heldVersion`; see the head) — derived as the scene opens where the second document is named by its address (`heldSource`), else the derived record handed in
 * @property {string | null} [link] the address of the link the scene is opened from, where it is opened from one: the tie drawn whole between the stacked panes where none holds the pointer or the focus (`crossingOf`)
 * @property {PastHeld | null} [past] the scene is a draft's history (B3-S7; N-GO's `history`), opened on the draft's address: pane B the state these name (`pastSource`), beside it the list of the draft's past states made from these rows (`PastList`)
 * @property {ISpan[]} [sel] the selection the act was made over, by its bytes (N-GO's `toScene`; Q1): the scene opens holding it in the first pane — pane A, else pane B — whose text places all of them in one stretch (`carrySel`), none where neither does
 */

/**
 * @typedef {Object} PastHeld — what a draft's history opens with (`Held.past`; N-GO's `history`): the state its act asked, never the state shown nor why, so a return reads it again (see the head)
 * @property {string} draft the draft
 * @property {FeedUpdate[]} entries its feed rows read, in position order
 * @property {number} from the position its read reached down to: rows below it are read as the scene stands (`readOlder`); 0 where every row is read
 * @property {boolean} bottom its read reached the feed's first position, or the first one the feed's files hold (M-PUMP's `HistoryRead.floor`): no row below `from` is to be read
 * @property {number | null} head the position its read reached up to (M-PUMP's `HistoryRead.head`): a return reads the rows written past it (`pastSince`); null where none is known
 * @property {number} asked the commit whose state the act asked — the last of the row below the top row, else of the top row — or, where its entry was left after a step or a row's act, the one asked last (`Left.asked`)
 * @property {boolean} unkept the draft held words the board had not kept as the act was taken: the list's top line says so
 * @property {{pages: number, read: number, readMs: number}} figures the history read's pages and rows and its time (FP-18)
 */

/**
 * @typedef {Object} PastGot — the state a draft's history shows in pane B, as its reads found it (`pastState`)
 * @property {Doc} record the state's record, derived at the position read (M-DERIVE's `recordAt`), its metadata the model's
 * @property {import('../model/pump.js').State} state the state as the board answered it: its text, its image and the position read
 * @property {number} shown the commit whose state it is: the commit asked, else the newest row's last in its place
 * @property {Refusal | null} met the latest refusal the asked state's reads met, where the newest kept state stands in its place; null where it is the state asked
 * @property {string | null} floor the date the board keeps states back to, where `met` is a reclaimed refusal naming its floor and the feed's row there was read (`floorOf`); null otherwise
 * @property {string | null} [floorTime] that row's time of day, as its row in the list names it (`floorOf`); absent or null where `floor` is
 * @property {number} ms the reads' time by the platform's clock (FP-18)
 * @property {PastHeld} [held] what the history stands on as the state was read, where a return read the rows written past its entry's head (`pastSince`); absent where it stands on its opener's
 */

/**
 * @typedef {Object} PastList — the list of the draft's past states standing beside pane B (see the head; B3-S7): the scene's own view state (FP-7)
 * @property {string} draft
 * @property {FeedUpdate[]} entries every row read, each once
 * @property {import('../model/past.js').Row[]} rows newest first (M-PAST's `rowsOf`)
 * @property {import('../model/past.js').Day[]} days (M-PAST's `daysOf`)
 * @property {Set<string>} open the days that stand open: those M-PAST's `openOnOpening` opens as the list first stands, then as the reader folds and opens them
 * @property {boolean} opened the days open on opening are set: the list has stood once
 * @property {number} at the commit whose state pane B shows: its row the one marked shown (M-PAST's `rowHolding`)
 * @property {number} asked the commit whose state was asked last — by the act (`PastHeld.asked`), a step, a row's act, "read it again" (`askPast`) — the one pane B shows where none other is asked
 * @property {number | null} out the commit whose state's read is out for an ask (`askPast`): one read at a time; null where none is
 * @property {boolean} fell pane B shows the newest kept state in the place of the state the act or a return asked, which its reads refused (`pastState`): a reclaimed answer of the scene's reissue then words the line (`reissue`); false once pane B shows a state as asked, or another is asked
 * @property {Cut | null} cut where the list's floor line stands (`placeFloor`): rising only; null where no read was refused at the floor
 * @property {'unread' | 'arriving' | 'read' | 'failed'} links the links that stood on the state pane B shows (`restLinks`): not read, where it landed while a later state was asked; their read out at a rest; read; failed past the bound
 * @property {Refusal | null} met the latest refusal the asked state's reads met, where pane B shows another state in its place: why it does (`pastWhyOf`); null where it shows the one asked
 * @property {string | null} floor the date the board keeps states back to, where `met` is a reclaimed refusal naming its floor and the feed's row there was read (`floorOf`): the line's words then the floor's; null otherwise
 * @property {boolean} running the scene reissues the asked state (`reissue`): pane B's corner carries the in-flight clause, the running mark after it (`pastLine`), and the asked row says "reading"
 * @property {boolean} again "read it again" is drawn beneath pane B's line (`againOf`): set where the line first stands saying the asked state could not be read and is not read again (`metBy`), and held until pane B shows the asked state (`landPast`)
 * @property {number | null} head the position the rows were first read up to (`PastHeld.head`): the act's, a return's past it (`pastSince`)
 * @property {boolean} unkept the list's top line says the draft holds words not yet kept
 * @property {string | null} said the line's words as the status region last said them (`sayLine`); null where it said none
 * @property {number} from the position the rows read reach down to, every row above it read; 0 where every row is read
 * @property {boolean} bottom the rows read reach the feed's first position, or the first one the feed's files hold: no row below `from` is to be read (`readOlder`)
 * @property {boolean} reading rows below `from` are being read
 * @property {PastHeld['figures'] & {stateMs: number, at: number, older: {pages: number, read: number, ms: number} | null}} figures the reads' figures — the state read's time and the position it read at, set again where a reissue lands, and the read of the older rows once it lands (FP-18)
 * @property {string} html the list's markup as last written
 */

/**
 * @typedef {Object} Cut — where the list's floor line stands (`PastList.cut`; M-PAST's `floorLine`)
 * @property {number} at the floor: the position a refusal named as the oldest the board rebuilds, else the first commit of the row above a state refused where it last stood
 * @property {string | null} date the day of the feed's row at a floor a refusal named, where that row was read (`floorOf`); null otherwise
 * @property {string | null} time that row's time of day; null where `date` is
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

/** @typedef {{kind: 'band', link: null, tie: string, a: BandDrawn, b: BandDrawn} | {kind: 'link', link: string, tie: string, a: LineDrawn, b: LineDrawn}} Drawn a band or a line as the last draw drew it, its ends on screen, `tie` its key (`tieKey`) */

/**
 * @typedef {Object} StrokeDrawn — a stroke as the last draw drew it, on screen
 * @property {string} key its key (`strokeKey`)
 * @property {{x: number, y: number}} a its end at pane A's facing edge
 * @property {{x: number, y: number}} b its end at pane B's
 * @property {boolean} halfA
 * @property {boolean} halfB
 * @property {Change[]} changes
 * @property {{x: number, y: number}} at the point its button stands centred on: the middle of the halves drawn — stacked, the middle of its half at pane A's edge
 */

/**
 * @typedef {Object} Crossing — the one tie the last draw drew whole between the stacked panes (`crossingOf`; see the head)
 * @property {string} tie its key (`tieKey`)
 * @property {'band' | 'link' | 'stroke'} kind
 * @property {string | null} link the link's address, where it is a line
 * @property {'pointer' | 'focus' | 'opened'} why the pointer stands on it, it holds the focus, or it is the link the scene was opened from
 * @property {Array<{x: number, y: number}>} path where it was drawn, on screen: from its end at pane A's facing edge out to the column's outer side, along it, and into its end at pane B's — a band's through its ends' middles
 */

/** @typedef {{tie: string, order: number, x0: number, x1: number, top: number, bottom: number}} Hit an end the last draw drew in the column where the panes stack, on screen, by its tie's key (`tieKey`): what the pointer stands on there (`hoverAt`), a line's first, then a stroke's, then a band's (`order`) */

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
 * @typedef {Object} MarkDrawn — a margin's mark the last margin pass stood in an editor pane (`placeMargin`), on screen
 * @property {HTMLElement} el its element, in the pane's content
 * @property {'a' | 'b'} side the pane
 * @property {string} addr its draft: the address the pane's acts name
 * @property {import('../text/layer.js').PaneMarginSegment} seg its kind, its lines among the article's, its form and the first position it stands beside (T-LAYER's `paneMargin`)
 * @property {Rect} placed where the pass placed it
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
 * @property {'draft' | 'bare' | 'pinned'} kind how a row reaching it keeps it fresh (see the head): a draft — text no publication fixes, or whose kind the one test cannot tell (`kindAt`) — read again in place; an edition at its bare address, which a newer member's arrival pins; a version, which only counts the chain again
 * @property {number | null} k the member its text is, where an edition or a version with its chain known; null where none is known
 * @property {number | null} n the chain's members as the pane knows them: probed as it opens, raised by a row naming a newer member
 * @property {number | null} read the version its corner's act reads in its place: the newest arrived, or the one the act left; null where it offers none
 * @property {number | null} lacks the version it reads, where that version holds none of the passage its corner's act carried; null where none
 * @property {Doc} d the record it was set from, as the model held it: kept whole, its arrays the model's own, which the model replaces and never edits (M-REC), so the pane is set again from it with no read; or the record the page derived (M-DERIVE, `Doc.derived`), which no read of the board's sets again
 * @property {ArticleView} view the view its article draws, as read when it was set: the links its marks and its lines are drawn from
 * @property {string} corner its corner's items as last written (`writeCorner`, `cornerItems`): written again where they would read other
 * @property {Map<string, Stretch[] | Declined>} placed where the far ends of the links crossing into it stood in its text as it was set, by `⟨link⟩ ⟨slot⟩`
 * @property {Place | null} place the reader's place as a change of the page's class took the pane down to its cover, kept for the read at the new class that sets it again
 * @property {import('../overlays/selection.js').Was | null} aside its selection by its bytes as a change of the page's class took the pane down to its cover, or a setting met its text still being read — standing none meanwhile — kept for the setting that follows it there (O-SELECTION's `followPane`); null where none is kept
 * @property {ISpan[] | null} landed the passage its last step carried, by its bytes' identity — set as the scene opens from the passage held, by its corner's version read and by a past state's step: what the next step carries where no selection stands in it (`readIn`, `landPast`); null where none was carried
 * @property {HTMLElement | null} el the article it shows
 * @property {number} serial the settings asked of it: one sets it only where no later one was asked meanwhile
 * @property {number} sets the settings made of it: a `compare` read against its text before one is read again
 * @property {{since: number, at: number, met: Refusal | null} | null} kept a setting the board's events asked of it, out (`update`): when it began, by the platform's clock, the page's clock at the row or drop that left the pane behind (M-PUMP's `Dropped.at`), and the refusal that left its last reads unset — the board not answering among them, whereupon the setting is asked again once M-PUMP's pause ends — the pane standing as it shows; null where none is out
 * @property {{since: number, outcome: import('../model/records.js').Outcome} | null} lift how the last setting the board's events asked set it: whether it changed what the pane shows (M-REC's `shownBy`), and the stamp it stood kept from (`kept.at`); null where none has set it
 * @property {string | null} signs what the edition claims held as they are read again said as its withheld origins' statements were last placed (T-LAYER's `keptRunsKey`; `placeStatements`); null where its article was set since
 * @property {AccountFacts | undefined} facts the owner's byline facts its article's byline was made with (`ownerFacts`), undefined where they were not read: what owner facts taken anew are checked against (`dropped`)
 * @property {boolean} open the reader's act opened its corner whole where it stands compact or at its document's head (`openWhole`; FP-26), until the act again closes it
 * @property {number} rows its corner's rows at its document's head as last written (`cornerForm`); 0 beside its column
 * @property {number} heldRows its corner's rows held at the pane's top at its document's head as last written (T-LAYER's `HeadLayout.held`): its title's (`titleRows`) and those of the items held after it; 0 beside its column, and as the pane is set again at another fit or from another record
 * @property {number} titleRows the rows its corner's title took at its document's head as last written (T-LAYER's `sceneHead`): the floor its title is laid out on at the next writing, so a change of its line within the fit removes none of them — the clauses held after it standing and leaving on rows of their own (`titled`); 0 beside its column, where its corner carries no title, and as the pane is set again at another fit or from another record
 * @property {import('../text/article.js').Kind} heard its corner's kind slot as the scene last read it (`markKept`): what the slot filling under the focus is told against
 * @property {import('../strings.js').Run[] | null} titleWords the words its title's line's own element names its region by, as stretches in their faces (`namePane`, `cornerForm`; T-ARTICLE's `titleHTML`): its title's line (T-ARTICLE's `titleRuns`) when the state it shows was set — as the scene stands and as it is set from another record (`nameTitle`) — held while that state stands, whatever its title draws since (FP-26); null where its corner carries no title
 * @property {boolean} heldVersion it shows the moved scene's held version (`Held.heldB`; D6 BM-14): the derived record it was opened on, which its corner names so and at a selection in which the acts that send give their reason (`heldVersionReason`); false on every other pane, and once the pane is set from a record not derived
 * @property {number | null} focus its span focus (D5 K-60, K-61): the first position of the span of its text it stands on, which ↓ and ↑ move, Tab into the pane lands, a click stands on, a live caret's span holds and its keys act at (`walkPane`, `entered`, `textAct`, `followCaret`); null where it stands on none
 */

/**
 * @typedef {Object} PaneFit — how the scene sets both panes, decided once for both from the scene's width (`fitOf`, `paneFit`; FP-12, FP-26)
 * @property {number} cpl the measure each pane's column is set at, in characters of its face
 * @property {'whole' | 'compact' | 'head'} corner where both corners stand and in which form: beside their columns, whole or compact, or at their documents' heads
 * @property {number} px the em both articles are set at: the reading size, smaller only where even a column of one character is wider than the pane beside its edge
 * @property {boolean} stacked the panes stand stacked, pane A above pane B, their facing edges one column on the right (see the head): side by side, a pane would keep fewer than HEAD_CPL characters a line with its corner at its document's head
 * @property {number} outer the width of the column standing at pane B's outer side, px — a draft's history's list (`listPx`), which both panes give room to equally; 0 where none stands: none asked for, the panes stacked, or the list standing after pane B's text
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
 * @property {PaneFit} fit the measure, the corners' form, the em, the panes' form and the column at pane B's outer side they are set at
 * @property {string | null} link the address of the link the scene was opened from (`Held.link`): the tie drawn whole between the stacked panes where none holds the pointer or the focus; null where it was opened from none
 * @property {string | null} hover the tie the pointer stands on in the column where the panes stack, by its key (`tieKey`; `hoverAt`); null where it stands on none
 * @property {number} band the rows both heads reserve above their text — the more of the two corners' (`Pane.rows`) — as last set (`setBand`); 0 where the corners stand beside their columns
 * @property {string} size the panes' sizes the ties were measured at
 * @property {number} updating the settings reading
 * @property {Array<() => void>} waiting the acts made while one reads, and the checks owner facts taken anew ask of the panes, in the order made (`whenSet`)
 * @property {PastList | null} past the list of the draft's past states, where the scene is a draft's history (`Held.past`); null on every other scene
 */

/**
 * @typedef {Object} Opening — what an opening of the scene came to (`open`, `reopen`)
 * @property {boolean} shown the scene shows
 * @property {Refusal | null} refused where it does not, the refusal a read it needed met; null where none did — an act made on the chrome while it read ended it
 */

/**
 * @typedef {Object} Showing — what the act that opens the scene hands it (`open`, `reopen`)
 * @property {() => void} [leaving] run as the scene shows, before anything of it is set: the chrome of the place it leaves ended (N-GO's)
 * @property {PastGot | null} [past] a draft's history: the state its act read for pane B (`pastState`), shown with no read made again; absent or null, read as the scene opens
 */

/** @typedef {Pick<Pane, 'doc' | 'src' | 'names' | 'shows' | 'kind' | 'k' | 'n' | 'read'> & {derived?: Doc | null}} Version a pane's text as the reader left it (`Left`): the record it was made from and the addresses it names and shows, as the pane holds them; `derived` the record itself where the page derived it (M-DERIVE), which a reopening shows again reading nothing — absent or null for a record read from the board, and for a past state's, which a reopening reads again from the state its entry keeps asked (`Held.past`) */

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
 * @property {{x: number, y: number}} place where it stood: its edge against pane B's facing edge — its right side by side, its left stacked — and its middle, px from the scene's box
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
 * @typedef {Object} Faces — the faces a returned stop shows at its site, and the words a refused read is said in (O-FACES', the app's to hand in: O-FACES imports this module)
 * @property {(addr: string, anchor: Anchor, abandon: () => void) => void} reaching an act on it waiting for the answer, which the face's dismissal abandons (FP-25)
 * @property {(far: string, anchor: Anchor, told: boolean) => void} floating the texts hold none of what it stood for, in the dead end's words; `told` its name says them where the focus lands
 * @property {(said: Said, anchor: Anchor, again: (() => void) | null, told: boolean) => void} held the line's words (FP-21), "try again" where a retry may tell; `told` as `floating`'s
 * @property {(r: Refusal, ctx: {time?: string, date?: string}) => {id: string, text: string}} words a refused read's words by its name (O-FACES' `wordsFor`, a read's): a past state's line where its asked state was refused as reclaimed (`pastWhyOf`); `time` the time the state shown stood; `date` the date the board keeps states back to (`PastList.floor`)
 * @property {(r: Refusal | Met, addr: string) => {id: string, text: string, runs: import('../strings.js').Run[]}} cause the one read cause (O-FACES' `readCause`), `addr` the document read: the cause a past state's line gives after its words (`unreadOf`), and the bar's words where the panes' `compare` was refused (`barWords`)
 */

/** @typedef {{key: string, focus: boolean}} Listed a stroke's list standing as the reader left the scene (`Left.list`): the stroke's key (`strokeKey`), and whether the platform's focus stood in the list */

/**
 * @typedef {Object} Left — the scene as the reader left it (`asLeft`; see the head): what its trail entry records, by value, and what reopens it (`reopen`)
 * @property {{a: Version, b: Version}} panes each pane's text
 * @property {{a: Spot, b: Spot} | null} spots where the reader stood in each pane; null where none is kept — a change of the page's class drops them (N-TRAIL's)
 * @property {Stop | null} stop the stop the platform's focus stood on — one the panes' `compare` draws by what it stood for, which a change of the page's class keeps (N-TRAIL's); null where it stood outside the scene, or on such a stop whose bytes its pane's image did not name
 * @property {Listed | null} [list] the stroke's list standing; null, or absent, where none stood
 * @property {number} [asked] at a draft's history, the commit whose state was asked last (`PastList.asked`), which a return asks again; absent at every other scene
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
/** the room between the two panes standing side by side, px: the gap the ties cross, which the style reads as `--scene-gap` */
export const SIDE_GAP = 140;
/** the column the stacked panes' facing edges form, in the reading size's em (`columnPx`) */
export const COLUMN_EM = 2;
/** the room the list's column keeps on each side of its words, px, which the style reads as `--scene-list-pad` (`listPx`) */
export const LIST_PAD = 10;
/** the rule at the list's column's inner edge, against pane B, px wide, which the style reads as `--scene-list-rule` (`listPx`) */
export const LIST_RULE = 1;
/** the hairline joining a band's two bars along the column where the panes stack, px */
const HAIRLINE_W = 1;
/** how near a line's or a stroke's end in the column the pointer stands on it, px (`hoverAt`) */
const HIT_PX = 4;

/** the column the stacked panes' facing edges form, px: COLUMN_EM of the reading size (P-CAM's), which the style reads as `--scene-column` */
export const columnPx = () => COLUMN_EM * READING_PX;

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
/** @type {Crossing | null} the one tie the last draw drew whole between the stacked panes; null where it drew none */
let drawnCrossing = null;
/** @type {Hit[]} the ends the last draw drew in the column where the panes stack, which the pointer stands on (`hoverAt`); none side by side */
let drawnHits = [];
/** @type {{runs: number, bands: number, strokes: number, ms: number}} the last measure's figures: the runs it read, the bands and strokes it made of them, and the time it took by the platform's clock (FP-18) */
let lastMeasure = { runs: 0, bands: 0, strokes: 0, ms: 0 };
/** the scene's own end — a Back from its entry, the app's to hand in (`attach`); until it does, the scene ended where it stands */
let ending = (/** @type {boolean} */ _byKey) => close();
/** @type {Faces | null} the faces a returned stop shows at its site and the words a refusal is said in, the app's to hand in (`attach`); none until it does */
let faces = null;
/** the pause before the scene's next reissue of a past state the board was busy on (`reissue`), by its handle; 0 where none waits — the scene's close and the next scene standing let it go unrun */
let reissuing = 0;
/** a draft's history opened from a pane's corner — its kept line's second act (N-GO's `history`), the pane named and the act's element, which a refusal's line stands beside — the app's to hand in (`attach`); nothing until it does */
let history = (/** @type {string} */ _addr, /** @type {boolean} */ _byKey, /** @type {'a' | 'b'} */ _side, /** @type {Element | null} */ _at) => {};
/** the reader's next act, a click on a pane's text being one — what stands on the one line and a hint taken down (L-LINE's `act`, O-HINT's `act`), the app's to hand in (`attach`); nothing until it does */
let acted = () => {};
/** @type {Record<'a' | 'b', Map<string, string>>} the run each origin's statement stands beside in each pane, by origin: the run's identity, kept while a line of that run is in view (`placeStatements`) */
const stood = { a: new Map(), b: new Map() };
/** the room between two signs stacked in a pane's column's edge, px: the plane's (T-LAYER's) */
const SIGN_GAP = 2;
/** the order signs stack in at one line: each run's its origin's statement, its key, its others' count; the held mark's word after them all */
const SIGN_ORDER = Object.freeze({ statement: 0, key: 1, count: 2, held: 3 });
/** @type {MarkDrawn[]} the margin's marks the last margin pass stood in the editor panes (`placeMargin`) */
let drawnMarks = [];
/** @type {Record<'a' | 'b', {y: number, pos: number} | null>} the first held mark in each pane's view as the last margin pass placed it — its top on screen and the first position it stands beside — where the word "held" stands in that pane (`placeStatements`); null where none stands */
const heldAt = { a: null, b: null };
/** @type {WeakMap<HTMLElement, string>} each margin mark's place, size and stroke as last written (`placeMargin`): an element is written again only where they changed */
const markStyles = new WeakMap();
/** @type {WeakMap<HTMLElement, string>} what each pane's article's boxes of a selection the platform does not hold were last drawn from (`placeSelBoxes`): drawn anew only where it reads other */
const boxedFor = new WeakMap();

/** the box an address stands in: its document's, which every version of it shares */
const boxOf = (/** @type {string} */ addr) => documentOf(addr) || addr;
/** do two addresses name one box — a document and its versions share their document's (P-PROJ's `docBox`)? */
const oneBox = (/** @type {string} */ a, /** @type {string} */ b) => boxOf(a) === boxOf(b);
/** a pane's element by its side */
const paneEl = (/** @type {NonNullable<typeof els>} */ E, /** @type {'a' | 'b'} */ side) => (side === 'a' ? E.paneA : E.paneB);
/** the other side */
const otherSide = (/** @type {'a' | 'b'} */ side) => (side === 'a' ? 'b' : 'a');
/** is a record a published edition's, by the one test its kind is read by (T-LAYER's `isDraft`; FP-39) — not where that test cannot tell? */
const published = (/** @type {Doc} */ d) => LAYER.isDraft(d) === false;
/** how a row keeps a pane on a record fresh (see the head): a version, at a member's address; an edition at its bare address (`published`); else a draft, a record whose kind the one test cannot tell among them */
const kindAt = (/** @type {string} */ addr, /** @type {Doc} */ d) => (memberOf(addr) != null ? 'pinned' : published(d) ? 'bare' : 'draft');

/** the plane the scene stands over out of the page's order while it stands (true), and back as it ends (false) — each region by its owner (D5 §4 rule 5) */
function coverPlane(/** @type {boolean} */ on) { WALK.cover(on); LAYER.cover(on); }

/** the id of the bar's hidden words a pane's name leads with where its corner carries no title: its corner's first item (`namePane`, `paneLead`) */
const leadId = (/** @type {'a' | 'b'} */ side) => (side === 'a' ? 'sceneA' : 'sceneB') + '-kind';

/** the id a titled pane's title's line's own element takes, which its name leads with (`namePane`, `titled`; T-ARTICLE's `titleHTML`) */
const titleId = (/** @type {'a' | 'b'} */ side) => (side === 'a' ? 'sceneA' : 'sceneB') + '-title';

/** the id a past state's substitution's words' own element takes, which its pane's name refers to after its title (`namePane`, `cornerForm`; T-ARTICLE's `titleHTML`) */
const whyId = (/** @type {'a' | 'b'} */ side) => (side === 'a' ? 'sceneA' : 'sceneB') + '-why';

/** does a pane show a past state in the place of the one its act asked (see the head; `PastWhy.substituted`): its line's words name its region after its title (`namePane`) */
const substituted = (/** @type {Pane} */ P) => { if (!scene || !scene.past || !pastShown(P)) return false; const w = pastWhyOf(scene.past); return !!w && w.substituted; };

/**
 * A pane named as a region the way the ARIA mirror names a document's item
 * (SC9; the focus record's D5): by its corner's first item — a past state's
 * or the held version's title by its line's own element, at every fit
 * (`titled`, `titleId`; FP-26), else the bar's hidden words for its
 * document's kind or a refused document's own words (`leadId`, `paneLead`) —
 * then, where a past state stands in the place of the one its act asked, its
 * line's words by their own element, so the name follows them as they change
 * (`substituted`, `whyId`) — then its own document's address, the head of
 * the article it holds; and,
 * where it is the whole document a link's far end names, by the bar's hidden
 * words saying so after them (`WHOLE_ID`), `aria-current="location"` on it;
 * a past state's pane described by its line's clauses after its title in the
 * order its corner draws them — that it is how the draft stands now, that it
 * is not its minute's last, that the state its act asked is read again — as
 * fields, rendered for the ear (T-ARTICLE's `pastClauses`; ST's `heard`);
 * none of these on any other pane, whatever the scene it stood in before.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {Pane} P
 */
function namePane(E, S, P) {
  const pane = paneEl(E, P.side), whole = P.side === 'b' && S.whole, id = (P.side === 'a' ? 'sceneA' : 'sceneB') + '-name', clauses = pastSaid(P);
  pane.setAttribute('role', 'region');
  const addr = /** @type {HTMLElement | null} */ (pane.querySelector('.hd .addr'));
  if (addr) { addr.id = id; pane.setAttribute('aria-labelledby', [titled(P) ? titleId(P.side) : leadId(P.side), ...(substituted(P) ? [whyId(P.side)] : []), id, ...(whole ? [WHOLE_ID] : [])].join(' ')); }
  if (whole) pane.setAttribute('aria-current', 'location'); else pane.removeAttribute('aria-current');
  if (clauses.length) pane.setAttribute('aria-description', heard(fields(...clauses))); else pane.removeAttribute('aria-description');
}

/** both panes named (`namePane`), pane B as the whole document where the scene's far end names it so */
function namePanes(/** @type {NonNullable<typeof els>} */ E, /** @type {Scene} */ S) {
  for (const side of SIDES) namePane(E, S, S[side]);
}

/**
 * Attach the scene's elements, and the act its own end runs (see the head):
 * the bar's ×, told whether a key pressed it by the focus owner's one
 * reading (FP-20); the stop's act (`toShared`); a stroke's (`showChanges`);
 * each, on a stop the reader returned to, that stop's (`returnedAct`). The
 * pointer moving over the scene and leaving it keeps the tie it stands on
 * in the column (`hoverAt`), and the focus entering or leaving a stroke's
 * button or the stop marks the frame, so the next draw chooses the tie drawn
 * whole between the stacked panes anew (`crossingOf`; FP-9). A pane's scroll
 * draws the ties at once and marks the frame, so what stands over the panes
 * — a face at an editor pane's line (`editorLine`) — is placed again.
 * @param {{root: HTMLElement, bar: HTMLElement, paneA: HTMLElement, paneB: HTMLElement, canvas: HTMLCanvasElement, stop: HTMLButtonElement, strokes: HTMLElement}} e `strokes` the gutter's layer the strokes' buttons stand in
 * @param {{end?: (byKey: boolean) => void, faces?: Faces, history?: (addr: string, byKey: boolean, side: 'a' | 'b', at: Element | null) => void, acted?: () => void}} [acts] `end` the scene's own end: N-GO's `closeScene`, as Esc, zoom-out and ← take it; `faces` the faces a returned stop shows at its site and the words a refused read is said in (O-FACES'); `history` a draft's history opened from a pane's corner (N-GO's `history`), the pane named and the act's element; `acted` the reader's next act, which a click on a pane's text is (L-LINE's and O-HINT's `act`)
 */
export function attach(e, acts = {}) {
  els = e;
  if (acts.end) ending = acts.end;
  if (acts.faces) faces = acts.faces;
  if (acts.history) history = acts.history;
  if (acts.acted) acted = acts.acted;
  e.root.setAttribute('aria-label', heard(t('L.scene-label')));
  setRoom(e);
  e.stop.addEventListener('click', (ev) => stopAct(FOCUS.byKey(ev)));
  e.strokes.addEventListener('click', (ev) => {
    const b = /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (ev.target).closest('[data-stroke]'));
    if (b && b.dataset.stroke) strokeAct(b.dataset.stroke, FOCUS.byKey(ev));
  });
  e.root.addEventListener('pointermove', (ev) => hoverAt(ev));
  e.root.addEventListener('pointerleave', () => hoverAt(null));
  for (const x of [e.strokes, e.stop]) for (const type of ['focusin', 'focusout']) x.addEventListener(type, () => { if (scene && scene.fit.stacked) markDirty(); });
  /** the event's target, where it stands in a pane's corner: on the read it offers (`act`), on a draft's kept word (`kept`), on its kept line's second act (`history`), on a past state's "read it again" (`again`), on one of its steps (`earlier`, `later`), on what opens it whole or compacts it again — a glyph, a head's count, the words a glyph opened — or anywhere on the corner opened whole (`whole`); null elsewhere */
  const onCorner = (/** @type {Event} */ ev) => {
    const tg = /** @type {HTMLElement | null} */ (ev.target), side = ev.currentTarget === e.paneB ? 'b' : 'a';
    if (!tg || !tg.closest || !tg.closest('.corner')) return null;
    if (tg.closest('[data-read]')) return 'act';
    if (tg.closest('.kept-word[data-kept]')) return 'kept';
    if (tg.closest('[data-history]')) return 'history';
    if (tg.closest('[data-again]')) return 'again';
    const st = /** @type {HTMLElement | null} */ (tg.closest('[data-step]'));
    if (st) return st.dataset.step === 'later' ? 'later' : 'earlier';
    return tg.closest('.glyph, [data-more], [data-whole]') || (scene && scene[side].open) ? 'whole' : null;
  };
  /** the stops of the line of a pane's corner's acts an element stands in, stood on `at` (T-LAYER's `setStops`) */
  const rove = (/** @type {EventTarget | null} */ target, /** @type {EventTarget | null} */ at) => {
    const c = target && typeof (/** @type {HTMLElement} */ (target)).closest === 'function' ? /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (target).closest('.corner')) : null;
    if (scene && c) LAYER.setStops(c, true, scene.fit.corner === 'head', /** @type {Element | null} */ (at));
  };
  for (const p of [e.paneA, e.paneB]) {
    p.addEventListener('scroll', () => { draw(); markDirty(); });
    // a press on a pane's corner's act, or on what opens the corner whole, leaves the platform's selection where it stands —
    // the passage the act carries — as a press on text would not; a click on an act takes it — a pointer's, or the one the
    // platform makes from Enter or Space at the act — the kept word opening its statement or closing it, a past state's
    // "read it again" asking its state again, a glyph or a head's count opening the corner whole, and one on the corner
    // opened closing it (FP-26)
    p.addEventListener('mousedown', (ev) => { if (onCorner(ev)) ev.preventDefault(); });
    // a click on a corner's act takes it; one on the pane's text, or a drag's release there, is the pointer's act on the text (`textAct`)
    p.addEventListener('click', (ev) => {
      const on = onCorner(ev), side = p === e.paneB ? 'b' : 'a';
      if (on === 'act') act(side); else if (on === 'kept') keptAct(side); else if (on === 'history') historyAct(side, FOCUS.byKey(ev), /** @type {HTMLElement} */ (ev.target).closest('[data-history]')); else if (on === 'again') void readAgain(side);
      else if (on === 'earlier' || on === 'later') { if (side === 'b') void step(on === 'later' ? 1 : -1); } else if (on === 'whole') openWhole(side);
      else if (onText(ev.target)) textAct(e, side);
    });
    // a corner's stop follows the focus along its line of acts, and stands on its first act again as the focus leaves it; a
    // head's row that scrolls is brought below the held rows as the focus comes to stand in it (`headInView`); the focus come
    // into the pane's text from outside it stands its span focus on the span in view (`entered`); the focus anywhere in the
    // pane makes its selection the platform's live one (O-SELECTION's `focusIn`; Q4)
    p.addEventListener('focusin', (ev) => {
      rove(ev.target, ev.target);
      const side = p === e.paneB ? 'b' : 'a';
      headInView(e, side, ev.target);
      if (textHolds(e, side, /** @type {Element | null} */ (ev.target)) && !textHolds(e, side, /** @type {Element | null} */ (ev.relatedTarget))) entered(e, side);
      if (scene) SEL.focusIn(side);
      markDirty();
    });
    p.addEventListener('focusout', (ev) => { rove(ev.target, ev.relatedTarget); markDirty(); });
  }
  // a click on an act is its button's wherever on the button it lands — the re-level's chord mark among them
  e.bar.addEventListener('click', (ev) => { const tg = /** @type {HTMLElement} */ (ev.target); if (tg.closest('[data-x]')) ending(FOCUS.byKey(ev)); else if (tg.closest('[data-relevel]')) relevel(); });
}
export const isOpen = () => scene !== null;
/** the addresses the two panes' acts name and their positions are measured against (`Pane.names`) */
export const pair = () => (scene ? { a: scene.a.names, b: scene.b.names } : null);
/** the scene's runs of shared identity, the two ends it sets level and the link it was opened from, read-only (the gate reads them) */
export const pairs = () => (scene ? { pairs: scene.pairs.map((p) => ({ ...p })), level: { ...scene.level }, link: scene.link } : null);
/** the last measure's figures (the gate records them; FP-18): the runs it read, the bands and strokes it made of them, and its time in ms */
export const measured = () => ({ ...lastMeasure });
/** the bands and lines the last draw drew, their ends on screen (the gate holds each band to its run's lines and each line to its passage's line) */
export const ties = () => drawnTies.map((d) => /** @type {Drawn} */ ({ ...d, a: { ...d.a }, b: { ...d.b } }));
/** the facing edges the last draw drew for the whole-document ends meeting them, on screen (the gate holds each to its pane's visible height) */
export const edges = () => drawnEdges.map((e) => ({ ...e, links: [...e.links] }));
/** the one tie the last draw drew whole between the stacked panes, on screen (the gate reads it): its key, its kind, its link where it is a line, why it is the one, and its path; null where it drew none */
export const crossing = () => (drawnCrossing ? { ...drawnCrossing, path: drawnCrossing.path.map((p) => ({ ...p })) } : null);
/** the fit the panes stand at (the gate reads it): the measure, the corners' form, the em and whether the panes stack; null where the scene does not stand */
export const fitted = () => (scene ? { ...scene.fit } : null);
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

/** @typedef {'B3.held-version.not-current' | 'B3.held-version.in-current'} HeldReason the one reason the acts that send give at a selection in the moved scene's held version, by its string (`heldVersionReasonOf`) */

/**
 * Which reason the acts that send — and a printable key — give at a
 * selection in the moved scene's held version (D6 BM-14; B3-S2): the first
 * where the selection holds any byte the current text does not hold — the
 * person's held new words always among them, which no image of the board's
 * names — else the second. A byte of the selection the current text holds is
 * one the current text's image places in the held version's text at its
 * position (M-REC's `placedIn`, a byte the page made counted under both its
 * names).
 * @param {import('../model/records.js').ImageRun[]} current the image the current text's article was made from
 * @param {import('../model/records.js').ImageRun[]} held the image the held version's article was made from
 * @param {{pos: number, width: number}} span the selection, in the held version's positions
 * @returns {HeldReason}
 */
export function heldVersionReasonOf(current, held, span) {
  const end = span.pos + Math.max(1, span.width);
  let at = span.pos;
  for (const s of REC.placedIn(held, current.map((r) => ({ prefix: r.prefix, ordinal: r.ordinal, width: r.width })))) {
    if (s.pos > at) break;
    at = Math.max(at, s.pos + s.width);
    if (at >= end) break;
  }
  return at >= end ? 'B3.held-version.in-current' : 'B3.held-version.not-current';
}

/**
 * The reason the acts that send — and a printable key — give at the
 * selection standing in the moved scene's held version (see the head; D6
 * BM-14): where pane B shows the held version (`Pane.heldVersion`), the
 * platform's focus stands in it and pane B holds a selection (O-SELECTION's),
 * the reason that selection keys (`heldVersionReasonOf`) over the images the
 * two panes' articles were made from; null anywhere else.
 * @returns {HeldReason | null}
 */
export function heldVersionReason() {
  const S = scene, E = els;
  if (!S || !E || !S.b.heldVersion || !S.a.el || !S.b.el) return null;
  const at = typeof document !== 'undefined' ? document.activeElement : null;
  if (!at || !E.paneB.contains(at)) return null;
  const sel = SEL.selected('b'), a = LAYER.madeOf(S.a.el), b = LAYER.madeOf(S.b.el);
  return sel && a && b ? heldVersionReasonOf(a.image, b.image, sel) : null;
}

/**
 * Each pane as it stands, read-only (the gate reads it): the address it was
 * opened on, the record its text was made from, the address its acts name and
 * the one it shows, its kind, its version and the chain's count, its corner's
 * act and what its corner says it lacks, whether its record is one the page
 * derived, whether it shows the moved scene's held version, its corner's rows
 * held at its top at its document's head and those its title took there
 * (`Pane.heldRows`, `Pane.titleRows`), the passage its last step carried by
 * its bytes (`Pane.landed`), whether a selection is kept aside for a setting
 * of it (`Pane.aside`), and the blocks its article was made from.
 */
export function panes() {
  const S = scene;
  if (!S) return null;
  const of = (/** @type {Pane} */ P) => ({ doc: P.doc, src: P.src, names: P.names, shows: P.shows, kind: P.kind, k: P.k, n: P.n, read: P.read, lacks: P.lacks, derived: !!P.d.derived, held: P.heldVersion, heldRows: P.heldRows, titleRows: P.titleRows, editor: editor(P), focus: P.focus, landed: P.landed ? P.landed.map((x) => ({ ...x })) : null, aside: !!P.aside, blocks: P.d.blocks.map((b) => ({ pos: b.pos, width: b.width, kind: b.kind, text: b.text })) });
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
 * The moved scene's held version of a draft, derived as the scene opens on
 * the draft's address (see the head; B3-S2; D6 BM-14): once the draft's
 * flight has landed (W-WRITE's `landed`), so a burst the act committed is
 * among its lines, the draft's text at the base its held lines name, read from
 * the board's history (M-PUMP's `stateAt`), with those lines applied in their
 * order (M-DERIVE's `applyHeld`) — the bytes each inserts named by the page's
 * ordinals for that line (W-WRITE's `heldNames`) — its metadata the model's.
 * The text the page shows of the draft (T-LAYER's `paneSource`) where it holds
 * no line by then, its lines name more than one base, one of them does not
 * apply, or the history at the base is reclaimed or its reconstructions stay
 * busy — none where that text is no derived record; the refusal the read met
 * otherwise, as a pane's read refused answers.
 * @param {string} addr the draft
 * @param {() => boolean} stands
 * @returns {ReturnType<typeof readPane>}
 */
async function heldSource(addr, stands) {
  await WRITE.landed(addr);
  /** @type {Awaited<ReturnType<typeof readPane>>} */
  const none = { d: null, n: null, whole: false, refused: null, unheard: null };
  const shown = async () => { const x = LAYER.paneSource(addr); return typeof x === 'string' ? none : sourceOf(x); };
  if (!stands()) return none;
  const rows = [...WRITE.heldOf(addr)].sort((x, y) => x.held - y.held);
  if (!rows.length || rows.some((r) => r.base !== rows[0].base)) return shown();
  const s = await PUMP.stateAt(addr, rows[0].base);
  if ('refused' in s) {
    if (s.refused.name === 'history_reclaimed' || s.refused.name === 'history_busy') return shown();
    return { ...none, refused: s.refused, unheard: PUMP.unanswered(s.refused) ? s.refused : null };
  }
  const meta = REC.has(addr) ? REC.doc(addr).meta : null;
  const out = applyHeld({ ...recordAt(addr, s.runs, s.at, { image: s.image }), meta }, rows, (x) => (REC.has(x) ? REC.doc(x) : null), WRITE.heldNames(addr));
  return out.stopped ? shown() : { d: out.doc, n: null, whole: true, refused: null, unheard: null };
}

/**
 * A commit's state read for a draft's history (see the head; wire.md §Reading
 * history): at the commit's position; refused there as reclaimed, at the last
 * position it stood, before the draft's next commit (M-PAST's
 * `stoodUntilAt`) — the committed one the board names below it where that
 * lies inside a commit — save where that is the position asked already, or
 * the refusal's floor, the oldest position the board still answers, lies past
 * it, the reclaimed refusal then standing. The state, or the latest refusal
 * met.
 * @param {string} addr the draft
 * @param {readonly import('../model/past.js').Row[]} rows its rows, newest first (M-PAST's `rowsOf`)
 * @param {number} pos the commit whose state is read
 * @param {number | null} head the position the rows were read up to
 * @param {number} [attempts] how many whole reads at most while the board's reconstructions are busy (M-PUMP's `stateAt`)
 * @returns {Promise<import('../model/pump.js').State | {refused: Refusal}>}
 */
async function askState(addr, rows, pos, head, attempts) {
  const first = await PUMP.stateAt(addr, pos, { attempts });
  if (!('refused' in first) || first.refused.name !== 'history_reclaimed') return first;
  const floor = /** @type {{body?: {floor?: unknown}}} */ (first.refused).body?.floor;
  // no position at or below `done` is asked again: the one asked already, and every one below the floor the refusal names
  const done = typeof floor === 'number' ? Math.max(pos, floor - 1) : pos;
  const at = PAST.stoodUntilAt(rows, pos, head);
  if (at <= done) return first;
  const again = await PUMP.stateAt(addr, at, { attempts, above: done });
  // `at` inside a commit whose committed position below it the board names at or below `done`: the reclaimed refusal stands
  return 'refused' in again && again.refused.name === 'not_a_position' ? first : again;
}

/**
 * The state a draft's history shows in pane B (see the head): the asked
 * commit's (`askState`) — a row's last, where a row is handed in — the newest
 * row's last the draft as the board holds it now (M-PUMP's `stateNow`), never
 * read as of a position of the board's history, its links the model's record's
 * where they are read (`newestLinked`);
 * where the asked state is refused, the newest kept state in its place, the
 * asked one's refusal kept as why (`PastGot.met`) with the date its floor
 * names and that row's time, where it names one (`floorOf`); the refusal met
 * where the state to show could not be read. Each derived at the position
 * read (M-DERIVE's `recordAt`).
 * @param {string} addr the draft
 * @param {readonly import('../model/past.js').Row[]} rows its rows, newest first (M-PAST's `rowsOf`)
 * @param {import('../model/past.js').Row | number} asked the row whose last state the act asks, or the commit a return asks
 * @param {number | null} head the position the rows were read up to (M-PUMP's `HistoryRead.head`)
 * @returns {Promise<PastGot | {refused: Refusal}>}
 */
export async function pastState(addr, rows, asked, head) {
  const at = typeof asked === 'number' ? asked : asked.last, t0 = performance.now(), top = rows[0];
  /** @type {(s: import('../model/pump.js').State, shown: number, met: Refusal | null, floor: {date: string, time: string} | null) => PastGot} */
  const got = (s, shown, met, floor) => {
    const record = { ...recordAt(addr, s.runs, s.at, { image: s.image }), meta: REC.has(addr) ? REC.doc(addr).meta : null };
    return { record: !top || shown === top.last ? newestLinked(addr, record) : record, state: s, shown, met, floor: floor ? floor.date : null, floorTime: floor ? floor.time : null, ms: performance.now() - t0 };
  };
  if (!top || at === top.last) { const s = await PUMP.stateNow(addr); return 'refused' in s ? s : got(s, top ? top.last : at, null, null); }
  const first = await askState(addr, rows, at, head);
  if (!('refused' in first)) return got(first, at, null, null);
  const [s, floor] = await Promise.all([PUMP.stateNow(addr), floorOf(first.refused)]);
  return 'refused' in s ? s : got(s, top.last, first.refused, floor);
}

/**
 * The newest kept state's record with the links the model's record of the
 * draft holds, where it holds them read — the draft as the board holds it now,
 * read as the plane reads it and never through the board's history, so its
 * links are the plane's (M-DERIVE's `withLinks`); as given where they are not
 * read yet, its links' word standing until they are (`newestLinks`).
 * @param {string} addr
 * @param {Doc} record
 * @returns {Doc}
 */
function newestLinked(addr, record) {
  const d = REC.has(addr) ? REC.doc(addr) : null;
  return d && d.linksRead ? withLinks(record, [...d.links]) : record;
}

/**
 * The date a reclaimed refusal's floor names (see the head; FP-34): the day
 * the feed's row at that position was written (M-PUMP's `rowAt`), "a time not
 * recorded" where the board lost that row's time, with that row's time of day
 * as a row of the list names it; null where the refusal is no reclaimed one
 * or names no floor, or no row at the floor could be read — the read refused,
 * or the first row read standing past it.
 * @param {Refusal} r
 * @returns {Promise<{date: string, time: string} | null>}
 */
async function floorOf(r) {
  const floor = floorNamed(r);
  if (floor == null) return null;
  const out = await PUMP.rowAt(floor);
  if ('refused' in out || !out.row) return null;
  return out.row.time == null ? { date: t('L.history.floor.untimed'), time: t('L.history.floor.untimed') } : { date: dayOf(out.row.time), time: timeOf(out.row.time) };
}

/** the floor a reclaimed refusal names, the oldest position the board still rebuilds (wire.md §Reading history); null where it is no reclaimed one or names none */
const floorNamed = (/** @type {Refusal} */ r) => { const f = r.name === 'history_reclaimed' ? /** @type {{body?: {floor?: unknown}}} */ (r).body?.floor : null; return typeof f === 'number' ? f : null; };

/**
 * What a draft's history stands on as it reopens (see the head): the rows
 * its entry keeps, with those of the draft written past the position they
 * were read up to read now (M-PUMP's `historyOf` above it), each once, and
 * that read's head, so the newest kept state stands under its own row; the
 * entry's alone where no head is known, the read was refused, or it read no
 * row.
 * @param {PastHeld} h
 * @param {() => boolean} stands
 * @returns {Promise<PastHeld>}
 */
async function pastSince(h, stands) {
  if (h.head == null || !stands()) return h;
  const got = await PUMP.historyOf(h.draft, { above: h.head });
  if (got.refused || !got.rows.length) return h;
  const held = new Set(h.entries.map((u) => u.position));
  return { ...h, entries: [...h.entries, ...got.rows.filter((u) => !held.has(u.position))].sort((x, y) => x.position - y.position), head: got.head ?? h.head };
}

/**
 * Pane B of a draft's history as the scene opens or reopens on the draft's
 * address (see the head): the state its act read, where the act hands it in
 * (`Showing.past`), else the one read now (`pastState`) over the rows its
 * entry keeps and those written since (`pastSince`, `PastGot.held`); the
 * refusal met where no state could be read, as a pane's read refused answers
 * — the state found beside the record (`past`).
 * @param {PastHeld} h
 * @param {PastGot | null} got the act's own read
 * @param {() => boolean} stands
 * @returns {Promise<Awaited<ReturnType<typeof readPane>> & {past: PastGot | null}>}
 */
async function pastSource(h, got, stands) {
  const none = { d: null, n: null, whole: false, refused: null, unheard: null, past: null };
  const on = got ? h : await pastSince(h, stands);
  const rows = PAST.rowsOf(on.entries), asked = PAST.rowHolding(rows, on.asked) ? on.asked : null;
  const out = got ?? (asked != null && stands() ? await pastState(on.draft, rows, asked, on.head) : null);
  if (!out) return none;
  if ('refused' in out) return { ...none, refused: out.refused, unheard: PUMP.unanswered(out.refused) ? out.refused : null };
  return { d: out.record, n: null, whole: true, refused: null, unheard: null, past: on === h ? out : { ...out, held: on } };
}

/**
 * @typedef {Object} Compared — the two texts' `compare` (`compareBetween`), with the reads made beside it (`readBetween`)
 * @property {ComparePair[]} pairs the runs of shared identity between them (`merged`); none where it told nothing
 * @property {boolean} told it answered
 * @property {Refusal | null} refused the refusal it met, whole, which the bar says (`barWords`); null where it answered or was not asked
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
  if ('refused' in cmp) return { pairs: [], told: false, refused: cmp.refused, why: { kind: cmp.refused.kind, name: cmp.refused.name }, unheard: PUMP.unanswered(cmp.refused) ? cmp.refused : null };
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
 * The runs of shared identity between two texts one of which the page
 * derived (see the head): read off the images the two
 * records hold by the bytes' identity (M-REC's `sharedRuns`), never asked of
 * the board, each run of runs adjoining in both texts one (`merged`).
 * @param {Pick<Text, 'src' | 'd'>} A
 * @param {Pick<Text, 'src' | 'd'>} B
 * @returns {ComparePair[]}
 */
export function sharedBetween(A, B) {
  return merged(REC.sharedRuns(A.d.image, B.d.image).map((p) => ({ d1: A.src, d2: B.src, ...p })));
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
  // a derived record is no text of the board's: no `compare` and no `project` asked of it — the runs the two texts share are
  // read off their images by identity (see the head)
  if (A.d.derived || B.d.derived) return { ...none, pairs: sharedBetween(A, B), told: true };
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
    d: { ...r.d }, view: LAYER.sceneView(r.d), corner: '', placed: new Map(), place: null, aside: null, landed: null, el: null, serial: 0, sets: 0, kept: null, lift: null, signs: null, facts: undefined,
    open: false, rows: 0, heldRows: 0, titleRows: 0, heard: LAYER.kindOf(r.d), titleWords: null, heldVersion: false, focus: null,
  };
}

/**
 * Does a pane hold a draft's current text (see the head): a record read from
 * the board, or the text the page shows of the draft — derived by the page's
 * own edits alone, at no position of the board's history and with no held
 * line applied (T-LAYER's `paneSource`) — whose corner keeps the draft's kept
 * word and its acts; a past state and the held version do not.
 * @param {Pane} P
 */
const current = (P) => !P.d.derived || (P.d.derived.at == null && !P.d.derived.rows.length && !P.heldVersion);

/**
 * Is a pane its draft's editor (see the head): it holds the current text
 * (`current`) of a draft of the person's own (T-LAYER's `ownDraft`), whatever
 * the camera's scale — never a past state or the held version, which name the
 * draft's address too, nor an edition or another's document.
 * @param {Pane} P
 */
const editor = (P) => current(P) && P.kind === 'draft' && LAYER.ownDraft(P.names);

/** do two records hold one text as the page took it: the same runs, image and blocks, each given new arrays where a record is set again or derived anew (M-REC's `setAgain`, T-LAYER's `shownOf`) */
const sameText = (/** @type {Pick<Doc, 'runs' | 'image' | 'blocks'>} */ x, /** @type {Pick<Doc, 'runs' | 'image' | 'blocks'>} */ y) => x.runs === y.runs && x.image === y.image && x.blocks === y.blocks;

/**
 * What a pane's corner is made from now (see the head): its record, named as
 * the address it shows, and its view with the corner's state the scene holds
 * — the chain's count as the pane knows it, neither the latest nor the count
 * while the board lags (`lags`), the act it offers and what it says the
 * version it reads lacks, a draft's kept word as the model holds it with its
 * statement where T-LAYER holds it open (B3-S2) and the kept line's second
 * act (T-LAYER's `historyAct`), at a pane holding the
 * draft's current text alone (`current`) — another derived record's slot
 * empty, the held version's line in its place and the chip's
 * (`Pane.heldVersion`; D6 BM-14), a past state's line naming when it stood and
 * whose hand made it (`pastLine`; B3-S7), either one the corner's title at
 * every fit (T-ARTICLE's `cornerTitle`; FP-26) — and its document's kind by
 * the one test (T-LAYER's `kindOf`).
 * @param {Pane} P
 * @returns {{d: Doc, view: ArticleView}}
 */
function paneCorner(P) {
  const d = P.shows === P.d.addr ? P.d : { ...P.d, addr: P.shows }, now = current(P);
  const past = scene && scene.past && pastShown(P) ? pastLine(scene.past) : null;
  return { d, view: { ...P.view, members: P.n, read: P.read, lacks: P.lacks, lags: lags(), kept: now ? WRITE.keptOf(P.names) : null, history: now ? LAYER.historyAct(P.names) : null, keptOpen: now && LAYER.statementOpen(P.names), held: P.heldVersion, past, kind: LAYER.kindOf(P.d) } };
}

/** does a pane show a past state of a draft (see the head; `Held.past`): pane B of a draft's history, on a record derived at a position of the board's history */
const pastShown = (/** @type {Pane} */ P) => !!scene && !!scene.past && P.side === 'b' && !!P.d.derived && P.d.derived.at != null;

/** the clauses a pane's past state's line carries after its title, in the order its corner draws them (T-ARTICLE's `pastClauses`; B3-S7; `pastLine`): what its region is described by (`namePane`) — a substitution's words name it instead; none where none stands, or it shows no past state */
const pastSaid = (/** @type {Pane} */ P) => (scene && scene.past && pastShown(P) ? pastClauses(pastLine(scene.past)) : []);

/** does a pane's corner carry a title (see the head; T-ARTICLE's `cornerTitle`): a past state's or the held version's, at every fit */
const titled = (/** @type {Pane} */ P) => !!cornerTitle(paneCorner(P).view);

/**
 * A pane's title's name set as the state it shows is set (see the head;
 * FP-26): its title's line as stretches in their faces (T-ARTICLE's
 * `cornerTitle`, `titleRuns`), a device's label in it the person's own words;
 * null where its corner carries no title (`Pane.titleWords`). Made as the
 * scene stands and as a pane is set from another record, and kept through a
 * setting at another fit and every rewrite of its corner.
 * @param {Pane} P
 */
function nameTitle(P) {
  const title = cornerTitle(paneCorner(P).view);
  P.titleWords = title ? titleRuns(title) : null;
}

/** a pane's corner's first item as stretches in their faces where it carries no title (T-ARTICLE's `cornerLeadRuns`): its document's kind, else a refused document's own words — the bar's hidden words its region's name leads with (`namePane`), rendered for the ear (ST's `heard`); none at a titled pane, whose name its title's own element leads (`titled`) */
const paneLead = (/** @type {Pane} */ P) => { if (titled(P)) return []; const c = paneCorner(P); return cornerLeadRuns(c.d, c.view); };

/** the items an editor pane's head holds in a stacked scene (foundations §2.5): its kept line and a face standing beneath it; the rest stand at its foot */
const HEAD_ITEMS = (/** @type {string} */ cls) => cls === 'kept' || cls === 'face';

/**
 * Does a pane's corner stand split, its head and its foot (see the head;
 * foundations §2.5): an editor pane — the current text
 * of a draft the person may edit, its corner offering its history
 * (`current`, T-LAYER's `historyAct`) — in a stacked scene, its corner at its
 * document's head.
 * @param {Pane} P
 * @param {PaneFit} F
 */
const footed = (P, F) => F.stacked && F.corner === 'head' && current(P) && !!LAYER.historyAct(P.names);

/**
 * A pane's corner's items in the form the scene's fit stands them in (see
 * the head; FP-26), and its rows at its document's head: T-LAYER's, made from
 * what the pane holds (`paneCorner`) — its kind first, naming the version it
 * shows, else its title, its line's own element carrying `titleId` and the
 * words the pane holds for its name (`Pane.titleWords`), a substitution's
 * words' own element `whyId` (`namePane`) — and its kept clause
 * where it stands kept (`paneKept`): beside its column, whole, or compact —
 * every item whole where the reader's act opened it (`Pane.open`), the glyph
 * it opened in its words as the act that compacts it again (T-ARTICLE's
 * `ArticleView.opened`) — the clause its last item (`sceneCorner`); at its
 * document's head, the clause first on its first row and a form the act
 * opened beneath its rows (`sceneHead`) — a title on rows never fewer than its
 * title took as last written (`Pane.titleRows`) — save an editor pane in a
 * stacked scene (`footed`), whose head holds its kept line and any face alone
 * (`HEAD_ITEMS`) and whose foot, after its text, the rest of its corner,
 * compact, its kept clause last (`foot`); with the rows of its head held at
 * the pane's top (`held`) and those its title took (`title`), none beside its
 * column.
 * @param {Pane} P
 * @param {PaneFit} F
 * @returns {CornerMade}
 */
function cornerForm(P, F) {
  const { d, view } = paneCorner(P), title = cornerTitle(view);
  const named = title ? { id: titleId(P.side), words: P.titleWords ?? titleRuns(title), why: whyId(P.side) } : null;
  if (F.corner === 'head' && footed(P, F)) {
    const head = LAYER.sceneHead(d, view, { px: F.px, kept: null, open: P.open, keep: HEAD_ITEMS });
    return { ...head, foot: LAYER.sceneCorner(d, view, true, { keep: (cls) => !HEAD_ITEMS(cls) }) + keptHTML(paneKept(P)) };
  }
  if (F.corner === 'head') return { ...LAYER.sceneHead(d, view, { px: F.px, kept: paneKept(P), open: P.open, floor: title ? P.titleRows : 0, title: named }), foot: null };
  const compact = F.corner === 'compact';
  return { html: LAYER.sceneCorner(d, { ...view, opened: compact && P.open }, compact && !P.open, { title: named }) + keptHTML(paneKept(P)), rows: 0, held: 0, title: 0, foot: null };
}

/**
 * @typedef {Object} CornerMade — a pane's corner's items as made in the fit's form (`cornerForm`)
 * @property {string} html its items' markup
 * @property {number} rows its rows at its document's head; 0 beside its column
 * @property {number} held its rows held at the pane's top there (`Pane.heldRows`); 0 beside its column
 * @property {number} title the rows its title took there (`Pane.titleRows`); 0 beside its column, and where it carries no title
 * @property {string | null} foot an editor pane's foot's items in a stacked scene (`footed`); null where it stands none
 */

/**
 * An editor pane's corner's foot stood after its text, or taken down (see the
 * head; foundations §2.5): its element made the first
 * time — named by its own words, a group of its lines of acts, as a corner is
 * (T-LAYER's `setStops`) — its items written in place, a focus on one of its
 * acts put back on the act standing in its place (FP-20); none where the
 * pane's corner stands whole at its head or beside its column.
 * @param {NonNullable<typeof els>} E
 * @param {Pane} P
 * @param {string | null} html its items, or null where it stands none
 */
function placeFoot(E, P, html) {
  const pane = paneEl(E, P.side);
  let f = /** @type {HTMLElement | null} */ (pane.querySelector(':scope > .corner.foot'));
  if (html == null) { if (f) f.remove(); return; }
  if (!f) {
    f = document.createElement('div');
    f.className = 'corner foot';
    f.id = cornerId(P.side) + '-foot';
    f.setAttribute('role', 'group');
    f.setAttribute('aria-labelledby', f.id);
    pane.append(f);
  }
  const el = f;
  el.dataset.corner = P.shows;
  if (scene) el.style.width = (scene.fit.cpl * CHAR_W + EDGE) * scene.fit.px + 'px';
  FOCUS.keep(el, LAYER.cornerAct, () => { el.innerHTML = html; LAYER.setStops(el, true, false, null); });
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
  if (P.d.derived && !editor(P)) return null;
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
 * A pane's corner marked in place (see the head): its items written again
 * where they would read other than as last written (`cornerForm`) — its kind
 * told, its kept clause changed (`paneKept`), a draft's kept word or its
 * statement moved, a past state's line moved (`pastLine`) — or the board's
 * lag began or ended since (`lags`), the element kept so a focus on it stays
 * (`writeCorner`), the bar's words its name leads with written again with
 * them (`nameBar`); nothing where its items read as last written, so a focus
 * on one of its acts stays on the element it stands on.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {Pane} P
 */
function markCorner(E, S, P) {
  const items = cornerForm(P, S.fit), c = cornerEl(E, P.side);
  if (c && (items.html + (items.foot ?? '') !== P.corner || c.dataset.lags !== String(lags()))) { writeCorner(E, P, items); nameBar(E, P); }
}

/**
 * Each pane's corner marked in place (see the head; `markCorner`), its kind
 * said once where its slot fills under the focus (`sayKind`), the heads' band
 * set again where their rows changed (`setBand`), and its origins' statements
 * placed again where what the edition claims held say changed since they were
 * placed, or its article was set since (T-LAYER's `keptRunsKey`;
 * `placeStatements`). The app's loop runs it on each dirty frame while the
 * scene stands; the one line speaks for the panes (`keptPanes`).
 */
export function markKept() {
  const S = scene, E = els;
  if (!S || !E) return;
  const signs = LAYER.keptRunsKey();
  const at = typeof document !== 'undefined' ? document.activeElement : null, own = LAYER.caret(), live = own && own.live ? LAYER.caretPane() : null;
  for (const side of SIDES) {
    const P = S[side];
    markCorner(E, S, P);
    sayKind(E, P);
    // the span focus marked as the plane marks the walk's span, while the pane's text holds the platform's focus and no live caret stands in it, the caret then the mark (D5 §4 rule 2)
    if (P.el) LAYER.markPaneFocus(P.el, P.focus != null && textHolds(E, side, at) && !(live && live.article === P.el) ? P.focus : null);
  }
  if (SIDES.some((side) => S[side].el && S[side].signs !== signs)) placeStatements(E, S);
  rebanded(E, S);
  if (S.past) newestLinks(S);
}

/**
 * @typedef {Object} PaneKept — a pane standing kept, as the one line speaks for it (see the head; FP-36)
 * @property {string} addr the address it names (`Pane.shows`)
 * @property {string} name its name as the mirror finds it (T-LAYER's `placeName`)
 * @property {import('../strings.js').Run[]} named that name as stretches in their faces (T-LAYER's `placeRuns`), its document's words kept as written in what is said
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
    const named = LAYER.placeRuns(P.d, P.shows);
    return [{ addr: P.shows, name: runsText(named), named, clause, since, focus: !!at && paneEl(E, side).contains(at) }];
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
 * A pane's corner's markup (see the head): named by its own words, as the
 * plane's corner is (D5 K-57), in the fit's form (`formClass`), marked with
 * whether the board lagged as it was made (`data-lags`) — its element a
 * group and its one Tab stop, until its stops are stood on its acts
 * (T-LAYER's `setStops`); the items it holds, its rows, its rows held at the
 * pane's top and those its title took kept on the pane as last written
 * (`Pane.corner`, `Pane.rows`, `Pane.heldRows`, `Pane.titleRows`) — an editor
 * pane's foot's among them, which its foot holds and never its head
 * (`placeFoot`).
 * @param {Pane} P
 * @param {PaneFit} F
 */
function cornerMarkup(P, F) {
  const made = cornerForm(P, F);
  P.corner = made.html + (made.foot ?? ''); P.rows = made.rows; P.heldRows = made.held; P.titleRows = made.title;
  return `<div class="corner${formClass(F, P)}" data-corner="${esc(P.shows)}" data-lags="${lags()}" id="${cornerId(P.side)}" role="group" aria-labelledby="${cornerId(P.side)}" tabindex="0">${made.html}</div>`;
}

/**
 * A pane's corner shaped for the fit's form (see the head): its class
 * (`formClass`) and, at its document's head, its width across the pane's
 * column — its text and its edge — and the height of its rows held at the
 * pane's top (`Pane.heldRows`), at the reading line's pitch; neither beside
 * its column.
 * @param {HTMLElement} c
 * @param {PaneFit} F
 * @param {Pane} P
 */
function shapeCorner(c, F, P) {
  const head = F.corner === 'head';
  c.className = 'corner' + formClass(F, P);
  c.style.width = head ? (F.cpl * CHAR_W + EDGE) * F.px + 'px' : '';
  c.style.height = head ? Math.max(1, P.heldRows) * LINE_H * F.px + 'px' : '';
}

/**
 * A pane's corner written again, in place, in the scene's fit (see the head):
 * the element kept, its stops stood on the items written (T-LAYER's
 * `setStops`), a focus standing on one of its acts put back on the act
 * standing in its place, else on its first stop (FP-20; T-LAYER's
 * `cornerAct`); shaped for the form (`shapeCorner`); the items as given, else
 * made now (`cornerForm`), its foot stood or taken down with them
 * (`placeFoot`), and its rows, its rows held at the pane's top and those its
 * title took kept on the pane before it is shaped. The band the heads reserve
 * is set apart (`setBand`).
 * @param {NonNullable<typeof els>} E
 * @param {Pane} P
 * @param {CornerMade | null} [items]
 */
function writeCorner(E, P, items = null) {
  const S = scene, c = cornerEl(E, P.side);
  if (!S || !c) return;
  const made = items || cornerForm(P, S.fit);
  P.corner = made.html + (made.foot ?? ''); P.rows = made.rows; P.heldRows = made.held; P.titleRows = made.title;
  c.dataset.corner = P.shows;
  c.dataset.lags = String(lags());
  shapeCorner(c, S.fit, P);
  FOCUS.keep(c, LAYER.cornerAct, () => { c.innerHTML = made.html; LAYER.setStops(c, true, S.fit.corner === 'head', null); });
  placeFoot(E, P, made.foot);
  placeHeads(E, S);
}

/** the bar's name for a pane, written again: the address it shows — a past state's with when it stood after it, "as it stood ⟨time⟩" (`pastAsOf`; C-363) — and the hidden words its region's name leads with where its corner carries no title (`paneLead`), rendered for the ear (ST's `heard`), none at a titled pane, whose title's own element its name leads with (`namePane`) */
function nameBar(/** @type {NonNullable<typeof els>} */ E, /** @type {Pane} */ P) {
  const b = E.bar.querySelector(`[data-name="${P.side}"]`), lead = E.bar.querySelector('#' + leadId(P.side)), words = heard(paneLead(P));
  const asOf = P.side === 'b' ? E.bar.querySelector('[data-string="B3.history.as-of"]') : null, at = asOf ? pastAsOf() : null;
  if (b) b.textContent = P.shows;
  if (asOf && at && asOf.textContent !== at.text) asOf.textContent = at.text;
  if (lead && lead.textContent !== words) lead.textContent = words;
}

/**
 * A pane's kind, said once in the status region where its corner's slot
 * fills while the platform's focus stands in the pane (see the head; FP-36):
 * the slot's words as it says them once no longer being read (T-LAYER's
 * `kindOf`; T-ARTICLE's `kindWord`). Each call reads the slot again
 * (`Pane.heard`); nothing is said for a titled corner, which stands no kind's
 * slot at any fit (`titled`).
 * @param {NonNullable<typeof els>} E
 * @param {Pane} P
 */
function sayKind(E, P) {
  const k = LAYER.kindOf(P.d), was = P.heard;
  P.heard = k;
  const at = typeof document !== 'undefined' ? document.activeElement : null;
  if (was === 'reading' && k !== 'reading' && !!at && paneEl(E, P.side).contains(at) && !titled(P)) FOCUS.say(kindWord(k).text);
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
 * Opened as the moved scene on the draft's address (`Held.heldB`), the second
 * pane is the held version derived as it opens (`heldSource`); as a draft's
 * history on its address (`Held.past`), the past state its act read
 * (`Showing.past`), else one read as it opens (`pastSource`) — its line said
 * and the asked state reissued where the board was busy on it (`pastStood`).
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
    const [ra, rb] = await Promise.all([sourceOf(a, stands), held.heldB && typeof b === 'string' ? heldSource(b, stands) : held.past && typeof b === 'string' ? pastSource(held.past, as.past ?? null, stands) : sourceOf(b, stands)]);
    const da = ra.d, db = rb.d;
    if (!da || !db || !ra.whole || !rb.whole) { if (stands()) out.refused = (!da || !ra.whole ? ra.refused : null) || rb.refused; return null; }
    if (!stands()) return null;
    const between = await readBetween(textOf(a, da), textOf(b, db), !held.wholeB);
    return { pa: paneAt('a', addrOf(a), { d: da, n: ra.n }), pb: paneAt('b', addrOf(b), { d: db, n: rb.n }), between, past: pastOfRead(rb) };
  }, ({ pa, pb, between, past }) => {
    const E = els;
    if (!E) return;
    if (as.leaving) as.leaving();
    // where the focus stands as the scene shows — the chrome it leaves ended, which hands back a focus an overlay held; a
    // scene shown over one standing keeps that one's (the controller's one memory)
    const from = document.activeElement;
    const S = sceneOf(pa, pb, between.pairs, held, past);
    stand(E, S, between.refused);
    relevel();
    carrySel(S, held.sel ?? null);
    FOCUS.open('scene', { el: E.root, from, byKey: true, first: E.paneB });
    if (S.past) pastStood(S, null);
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
 * near passage's positions, the stop at its first passage and the link it is
 * opened from (`Held.link`), none measured yet; the full measure side by side,
 * the corners whole, until it stands (`stand`). Pane B
 * is the held version where the opener asks the moved scene and its record is
 * one the page derived (`Held.heldB`); at a draft's history, the past state
 * found (`pastSource`), the list beside it (`pastListOf`).
 * @param {Pane} pa
 * @param {Pane} pb
 * @param {ComparePair[]} pairs
 * @param {Held} held
 * @param {PastGot | null} [got] the past state pane B shows, where the scene is a draft's history
 * @returns {Scene}
 */
function sceneOf(pa, pb, pairs, held, got = null) {
  const h = placedHeld(pa, held), level = levels(pairs, h);
  pb.heldVersion = !!held.heldB && !!pb.d.derived;
  // each pane's first landing (`Pane.landed`): pane A's the passage held, by the bytes the opener names where its text holds them; pane B's the end set level there
  const own = (/** @type {ISpan[]} */ x) => (x.length ? x : null);
  pa.landed = own(held.ids && REC.placedIn(pa.d.image, held.ids).length ? held.ids : h.posA != null ? REC.identityIn(pa.d.image, h.posA, Math.max(1, h.widthA ?? 1)) : level.a != null ? REC.identityIn(pa.d.image, level.a, 1) : []);
  pb.landed = own(level.b != null ? REC.identityIn(pb.d.image, level.b, 1) : []);
  return {
    a: pa, b: pb, pairs, level, whole: !!h.wholeB, widthA: Math.max(1, h.widthA ?? 1),
    bands: [], lines: [], strokes: [], listing: null, relist: null, shared: [], next: 0, at: null, told: false, stepped: null, returned: null,
    fit: { cpl: MEASURE_CPL, corner: 'whole', px: READING_PX, stacked: false, outer: 0 }, link: held.link ?? null, hover: null, band: 0, size: '', updating: 0, waiting: [],
    past: held.past && got ? pastListOf(held.past, got) : null,
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
 * The selection an opening carries set in the scene as it stands (see the
 * head; `Held.sel`; Q1), once both panes stand and are set level: as the
 * selection of the first pane — pane A, the upper one where they stack, else
 * pane B — whose text places every one of its bytes in one stretch (M-REC's
 * `placedIn`, through the image the pane's article was made from), set by the
 * scene (O-SELECTION's `setPane`) — the live one where that pane is the
 * focused site, drawn inactive until the focus comes to it where it is not;
 * nothing where neither pane holds all of it in one stretch, or none is
 * carried.
 * @param {Scene} S
 * @param {ISpan[] | null} ids
 */
function carrySel(S, ids) {
  const want = ids ? ids.reduce((n, i) => n + i.width, 0) : 0;
  if (!ids || !want) return;
  for (const side of SIDES) {
    const P = S[side], made = P.el ? LAYER.madeOf(P.el) : null, at = REC.placedIn(made ? made.image : imageOf(P), ids);
    if (at.length !== 1 || at[0].width !== want) continue;
    SEL.setPane(side, { addr: P.names, pos: at[0].pos, width: at[0].width });
    return;
  }
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
  if (got.refused) sayFace(E, S, got.refused);
  measure();
  answer(S, got);
  draw();
  relisted(S);
}

/**
 * The bar's words for the refusal the panes' `compare` met, as stretches in
 * their faces: its own where it asks for the texts compared in parts — too
 * much shared, too many blocks — else, the `compare` a read of both panes'
 * texts, the one read cause, a withheld one naming the document the board
 * names, else pane B's (`Faces.cause`), a code in it in the identifier's
 * face; none where the faces are not handed in.
 * @param {Scene} S
 * @param {Refusal} r
 * @returns {import('../strings.js').Run[]}
 */
function barWords(S, r) {
  if (r.name === 'too_many_pairs') return asRuns(t('B1.too_many_pairs'));
  if (r.name === 'too_many_blocks') return asRuns(t('B1.too_many_blocks'));
  return faces ? faces.cause(r, S.b.src).runs : [];
}

/**
 * A refusal the `compare` met after the scene showed (`addBands`), said where
 * the bar says one, before its acts — which stand as they are, so a focus on
 * one stays — and in the status region, for it changed away from the focus
 * without the reader's act (FP-36).
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {Refusal} r the refusal
 */
function sayFace(E, S, r) {
  const words = barWords(S, r), acts = E.bar.querySelector('[data-relevel]');
  E.bar.dataset.face = r.name;
  if (!words.length) return;
  if (acts) acts.insertAdjacentHTML('beforebegin', `<span class="face-text">${facedHTML(words)}</span> `);
  FOCUS.say(words);
}

/**
 * The scene stood over the plane (`open`, `reopen`): the selections of the
 * panes of a scene standing before it ended (O-SELECTION's `endPanes`); the
 * reissue a scene standing before it waited to make let go unrun
 * (`stopReissue`); the plane
 * under it out of the page's order; each titled pane's name set for the state it shows
 * (`nameTitle`); the bar naming each pane by the address it shows, and the
 * refusal the panes' `compare` met — and the hidden words each untitled
 * pane's name leads with (`paneLead`), and, where pane B is the whole
 * document a link's far end names, the hidden words pane B's name ends with
 * (`namePane`); both
 * panes fitted once (`fitOf`), each pane's article
 * T-LAYER's mount at the fit's measure, its corner in the fit's form on the
 * pane's outer side — pane A's before the article, pane B's after — or at its
 * document's head, and the fit set on the panes (`applyFit`); at a draft's
 * history, the list of its past states stood beside pane B (`standList`); no
 * margin's mark standing until the next margin pass places them
 * (`placeMargin`).
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {Refusal | null} met the refusal the `compare` met, whose words the bar says (`barWords`)
 */
function stand(E, S, met) {
  SEL.endPanes();
  scene = S;
  stopReissue();
  drawnMarks = []; heldAt.a = null; heldAt.b = null;
  S.a.placed = placedInto(S.a, [...S.b.view.marks, ...S.a.view.marks]);
  S.b.placed = placedInto(S.b, [...S.a.view.marks, ...S.b.view.marks]);
  coverPlane(true);
  E.root.classList.add('on');
  S.fit = fitOf(E, S);
  for (const side of SIDES) { S[side].view = { ...S[side].view, cpl: S.fit.cpl }; nameTitle(S[side]); }
  E.strokes.innerHTML = '';
  if (met) E.bar.dataset.face = met.name; else delete E.bar.dataset.face;
  const asOf = S.past ? pastAsOf() : null, words = met ? barWords(S, met) : [];
  E.bar.innerHTML = `<b class="id" data-name="a">${esc(S.a.shows)}</b> │ <b class="id" data-name="b">${esc(S.b.shows)}</b>${asOf ? ` <span class="as-of" data-string="${asOf.id}">${esc(asOf.text)}</span>` : ''} <span class="dim">${esc(t('F.scene.sameness'))} · ${esc(t('F.scene.link'))}</span>` +
    (words.length ? ` <span class="face-text">${facedHTML(words)}</span>` : '') +
    SIDES.map((side) => `<span id="${leadId(side)}" hidden>${esc(heard(paneLead(S[side])))}</span>`).join('') +
    (S.whole ? `<span id="${WHOLE_ID}" data-string="L.scene.whole-end" hidden>${esc(heard(t('L.scene.whole-end')))}</span>` : '') +
    ` <button data-relevel="1" aria-label="${esc(heard(t('F.scene.relevel')))}" aria-keyshortcuts="${esc(keyShortcut('Mod+R'))}">${esc(t('F.scene.relevel'))} <kbd>${esc(drawChord('Mod+R'))}</kbd></button>` +
    `<button class="x" data-x="1" aria-label="${esc(heard(t('F.scene.dismiss')))}" aria-keyshortcuts="${esc(keyShortcut('Esc'))}">× ${esc(t('F.scene.dismiss'))}</button>`;
  for (const side of SIDES) {
    const P = S[side], pane = paneEl(E, side);
    pane.innerHTML = cornerMarkup(P, S.fit);
    const c = cornerEl(E, side);
    if (c) LAYER.setStops(c, true, S.fit.corner === 'head');
    swap(E, P);
    placeFoot(E, P, cornerForm(P, S.fit).foot);
    pane.setAttribute('tabindex', '0');
    // an editor pane's span focus on the span its draft's caret stands in, kept there as the scene opens (B3-S1's scene rule)
    const k = editor(P) ? LAYER.caretSpan(P.names) : null;
    if (k && k.block != null) P.focus = k.block;
  }
  namePanes(E, S);
  applyFit(E, S);
  standList(E, S);
}

/**
 * The scene reopened as the reader left it (see the head), once its reads
 * answer where no act was made on the chrome meanwhile (O-HOST's opening):
 * each pane's text read again (`paneAgain`) — a draft's history's pane B
 * read from the state its entry keeps asked (`pastAgain`) — and the reads
 * between the panes;
 * as it shows, the act's `leaving` first; the ends set level where their
 * bytes stand now, else where the panes' `compare` sets the passage held;
 * each pane brought back to its place and its selection (`placeAgain`); the
 * focus on the stop it stood on — one the panes' `compare` draws standing
 * with the landing (`returning`), answered as that read answers (`answer`) —
 * else in the far end's pane, and the pair named in the status region, with
 * a past state's line where one stands (`pastStood`). A
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
  // a draft's history asks again the state asked last as the reader left it — a step's, a row's act's — else its act's
  const held = o.held.past && was.asked != null ? { ...o.held, past: { ...o.held.past, asked: was.asked } } : o.held;
  await HOST.opening(async (stands) => {
    const asked = held.past ?? null;
    const [ra, rb] = await Promise.all([paneAgain('a', was.panes.a, stands), asked ? pastAgain(was.panes.b, asked, stands) : paneAgain('b', was.panes.b, stands)]);
    const pa = ra.pane, pb = rb.pane;
    if (!pa || !pb) { if (stands()) out.refused = ra.refused || rb.refused; return null; }
    if (!stands()) return null;
    const between = await readBetween({ src: pa.src, d: pa.d, shown: LK.shown(pa.src, pa.d) }, { src: pb.src, d: pb.d, shown: LK.shown(pb.src, pb.d) }, !o.held.wholeB);
    return { pa, pb, between, past: pastOfRead(rb) };
  }, ({ pa, pb, between, past }) => {
    const E = els;
    if (!E) return;
    if (as.leaving) as.leaving();
    const from = document.activeElement, spots = was.spots;
    for (const P of [pa, pb]) P.lacks = spots && P.src === was.panes[P.side].src ? spots[P.side].lacks : null;
    const S = sceneOf(pa, pb, between.pairs, held, past);
    stand(E, S, between.refused);
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
    if (stood && stood !== E.paneB) FOCUS.land(stood);
    if (S.returned) S.returned.landed = document.activeElement === S.returned.el;
    const pair = `${t('L.scene-label')} · ${S.a.shows} │ ${S.b.shows}`;
    if (S.past) pastStood(S, pair); else FOCUS.say(pair);
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
  if (btn && take) FOCUS.land(btn);
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

/** the past state a pane's read found, where it read a draft's history's pane B (`pastSource`, `pastAgain`); null for every other read */
const pastOfRead = (/** @type {object} */ r) => ('past' in r ? /** @type {PastGot | null} */ (r.past) : null);

/**
 * A draft's history's pane B as the reader left it, read again (`reopen`;
 * see the head): the state its entry keeps asked, read now (`pastSource`) —
 * the state asked, else the newest kept one in its place — never the record
 * it showed. No pane where no state could be read, with the refusal met.
 * @param {Version} v pane B as the reader left it
 * @param {PastHeld} h what the history opened with
 * @param {() => boolean} stands
 * @returns {Promise<{pane: Pane | null, refused: Refusal | null, past: PastGot | null}>}
 */
async function pastAgain(v, h, stands) {
  const r = await pastSource(h, null, stands);
  if (!r.d || !r.past) return { pane: null, refused: r.refused, past: null };
  return { pane: { ...paneAt('b', v.src, { d: r.d, n: null }), doc: v.doc }, refused: null, past: r.past };
}

/**
 * Each pane brought back to where the reader stood in it (`reopen`): its
 * place's line, where its text holds that byte — at its position in a
 * derived record the entry kept, whose text is the one left — at the height
 * it stood below the pane's visible top, a line that stood in view kept below
 * what a held head covers (`clearOf`) — any other pane left where the
 * re-level set it — and its selection set again on the same bytes
 * (O-SELECTION's `setPane`), the live one once the focus lands in its pane;
 * then the ties drawn at the panes' scrolls.
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
    if (s.sel && z && P.el) SEL.setPane(side, { addr: P.names, pos: sel[0].pos, width: z.pos + z.width - sel[0].pos }, s.sel.backward);
  }
  draw();
}

/**
 * The scene as the reader leaves it (see the head), by value: each pane's
 * text — a past state's by none of its record, its entry keeping the state its
 * act asked (`Held.past`), and the state asked last, a step's or a row's act's
 * among them (`Left.asked`), which a return asks again; where they stood in it, its selection and the end set level in it,
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
  const version = (P) => ({ doc: P.doc, src: P.src, names: P.names, shows: P.shows, kind: P.kind, k: P.k, n: P.n, read: P.read, derived: P.d.derived && !(S.past && P.side === 'b') ? P.d : null });
  /** @type {(P: Pane) => Spot} */
  const spot = (P) => {
    const made = P.el ? LAYER.madeOf(P.el) : null, image = made ? made.image : [], sel = P.el ? SEL.selected(P.side) : null, lv = S.level[P.side];
    return {
      place: P.place || placeAt(P, firstInView(paneEl(E, P.side))),
      sel: sel ? { ids: REC.identityIn(image, sel.pos, sel.width), backward: SEL.backward(P.side) } : null,
      level: lv != null ? { pos: lv, ids: REC.identityIn(image, lv, 1) } : null,
      lacks: P.lacks,
    };
  };
  const host = HOST.element(), at = document.activeElement;
  const list = S.listing && HOST.currentIs('stroke:' + S.listing.key) ? { key: S.listing.key, focus: !!host && !!at && host.contains(at) } : S.relist;
  return { panes: { a: version(S.a), b: version(S.b) }, spots: { a: spot(S.a), b: spot(S.b) }, stop: stopOf(E, S), list, ...(S.past ? { asked: S.past.asked } : {}) };
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
  if (stop === 'a:corner' || stop === 'b:corner') { const c = cornerEl(E, stop === 'a:corner' ? 'a' : 'b'); return c ? LAYER.cornerStop(c) : null; }
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
 * `Where`): the address the pane shows; the member its text is, where its
 * corner names that member — a version's own, or the head of the chain an
 * edition at its bare address states (T-ARTICLE's `statedChain`), as a box's
 * copy names the head its corner states — never a draft's; and whether it is
 * read at the plain address. Its article is made with it (`swap`), so a copy
 * from the pane (T-LAYER's `namedIn`) and a stop it records (`named`) name
 * alike where a passage was read, and as the plane's box names the same words.
 * @param {Pane} P
 * @returns {Where}
 */
const whereIn = (P) => {
  const stated = P.kind === 'pinned' || (P.kind === 'bare' && statedChain(P.d, P.n) != null);
  return { doc: P.shows, member: stated && memberOf(P.names) != null ? P.names : null, plain: P.kind === 'bare' };
};

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

/** where an element of the scene stands, px from the scene's box: its edge against pane B's facing edge — the stop's, its right side by side and its left stacked — else its middle across, and its middle down */
function placeIn(/** @type {NonNullable<typeof els>} */ E, /** @type {HTMLElement} */ el, /** @type {'edge' | 'middle'} */ how) {
  const r = el.getBoundingClientRect(), root = E.root.getBoundingClientRect(), stacked = !!scene && scene.fit.stacked;
  const x0 = root.left + E.root.clientLeft, y0 = root.top + E.root.clientTop;
  return { x: (how === 'edge' ? (stacked ? r.left : r.right) : r.left + r.width / 2) - x0, y: r.top + r.height / 2 - y0 };
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

/**
 * A passage's opening words where a pane's text holds it, read by T-ARTICLE's
 * item rule (`copyText`) and cut on a word, as stretches: its words the
 * reading face's, the cut's ellipsis the client's; null where the text holds
 * none of it.
 * @param {Pane} P
 * @param {ISpan[]} ids
 * @returns {import('../strings.js').Run[] | null}
 */
function wordsAt(P, ids) {
  const made = P.el ? LAYER.madeOf(P.el) : null, at = made ? REC.placedIn(made.image, ids)[0] : undefined;
  if (!made || !at) return null;
  const text = copyText(made, { addr: made.addr, pos: at.pos, width: Math.min(at.width, 160) }, LAYER.originOwner).replace(/\s+/g, ' ').trim();
  /** @type {import('../strings.js').Run[]} */
  const words = [{ text, face: 'reading' }];
  if (text.length <= 48) return words;
  const cut = text.slice(0, 48), space = cut.lastIndexOf(' ');
  return [{ text: space > 16 ? cut.slice(0, space) : cut, face: 'reading' }, { text: '…', face: 'client' }];
}

/** a returned stroke's changes in words, as stretches (`changeRuns`), each side's characters where the pane's text holds its bytes, a side holding none "nothing"; null where a pane's text holds no longer the bytes of a side that held some */
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
  return joinRuns(' · ', changes.map((c) => changeRuns(/** @type {Change} */ (c), A, B, LAYER.originOwner)));
}

/** what the answer said of a returned stop in FP-21's words, as sentences: the dead end's where the text holds none of it, else the line's (BM-HELD's `floatingLineOf`, `lineOf`) */
const saidWords = (/** @type {Scene} */ S, /** @type {Answered} */ a) => (a.holds === 'none' ? floatingLineOf(S.b.shows) : a.said ? lineOf(a.said) : '');

/**
 * A returned stop's name and count drawn from what it stood for and what the
 * answer told (see the head; FP-34): while it is read, its kind's words and
 * what it stood for — the stop at a band's clipped end the passage's opening
 * words where pane B's text holds it, a stroke its changes in words where the
 * panes' texts hold them — its count an empty box of its own width; all of it
 * holding, the name and the count of the stop it is then; else its kind's
 * words and the answer's, each a sentence (ST's `sentence`, `sentences`;
 * FP-21), no count. The name is rendered for the ear (ST's `heard`), the
 * document's words in it kept as written.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {Returned} R
 */
function nameReturned(E, S, R) {
  const a = R.answer, D = S.b.shows, stop = R.stop;
  if (stop.kind === 'shared') {
    const text = a ? null : wordsAt(S.b, stop.at.ids);
    /** @type {[string, Record<string, string | number | import('../strings.js').Run[]>]} its name's string, and the values its tokens take, where one string names it */
    const name = !a ? (text ? ['L.scene.shared.returned', { D, text }] : ['L.scene.shared.returned.away', { D }]) : [a.count > 1 ? 'L.scene.shared' : 'L.scene.shared.1', { D, n: numeral(a.count) }];
    if (a && a.holds !== 'all') R.el.setAttribute('aria-label', heard(sentences(sentence('L.scene.shared.1', { D }), saidWords(S, a))));
    else R.el.setAttribute('aria-label', heard(tRuns(...name)));
    if (!a) R.el.innerHTML = READING;
    else R.el.textContent = a.holds !== 'none' && a.holds !== 'unknown' && a.count > 1 ? numeral(a.count) : '';
    return;
  }
  const changes = a ? null : changesAt(S, stop), [A, B] = sidesOf(S), s = a && a.holds === 'all' ? strokeFor(S, R) : null;
  const name = s ? strokeRuns(s, A, B, LAYER.originOwner) : changes != null ? tRuns('L.scene.stroke.returned', { changes }) : tRuns('L.scene.stroke.returned.away');
  if (a && !s) R.el.setAttribute('aria-label', heard(sentences(sentence('L.scene.stroke.kind'), saidWords(S, a))));
  else R.el.setAttribute('aria-label', heard(name));
  R.el.innerHTML = !a ? READING : s && s.changes.length > 1 ? `<span class="n">${numeral(s.changes.length)}</span>` : '';
}

/**
 * Where a returned stop stands (see the head): where what it stood for stands
 * in the panes' texts now, held inside the panes' visible heights — the stop
 * at a band's clipped end against pane B's facing edge, level with its
 * passage's first line (`sharedAt`); a stroke's button at the middle of the
 * halves its change takes, where its runs' facing bytes meet in each pane —
 * stacked, on its half at pane A's edge (`strokeAt`) — else where it stood as
 * the reader left it.
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
  if (R.stop.kind === 'shared') R.el.style.transform = S.fit.stacked ? 'translate(0, -50%)' : 'translate(-100%, -50%)';
  R.el.hidden = false;
}

/** where the passage a returned stop at a band's clipped end stood for stands, on screen: pane B's facing edge — its left side by side, its right stacked — level with its first line, held inside the pane's visible height; null where pane B's text holds none of it */
function sharedAt(/** @type {NonNullable<typeof els>} */ E, /** @type {Scene} */ S, /** @type {SharedStop} */ stop) {
  const pane = E.paneB, at = REC.placedIn(imageOf(S.b), stop.at.ids)[0];
  const line = at ? lineIn(pane, S.b.names, at.pos, at.width) : null;
  if (!line) return null;
  const r = pane.getBoundingClientRect(), top = r.top + pane.clientTop, half = E.stop.getBoundingClientRect().height / 2 || 8;
  return { x: S.fit.stacked ? r.right : r.left, y: Math.max(top + half, Math.min(top + pane.clientHeight - half, top - pane.scrollTop + line.y)) };
}

/** where a returned stroke's runs meet, on screen: the middle of the halves its change takes, between the heights its runs' facing bytes meet at in each pane (`meetAt`) — stacked, the middle of its half at pane A's edge, half an em out (`emOf`) — held inside the panes' visible heights; null where a pane's text holds no longer both facing bytes */
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
  const a = { x: E.paneA.getBoundingClientRect().right, y: held(E.paneA, ya) };
  if (S.fit.stacked) return { x: a.x + emOf(E, S) / 2, y: a.y };
  const b = { x: E.paneB.getBoundingClientRect().left, y: held(E.paneB, yb) };
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
    if (!told) FOCUS.say(asHeard(R.el.getAttribute('aria-label') || ''));
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

/** a corner no pane holds beside its column: P-LAY's fit given it stands the corner at its document's head (`paneFit`) */
const AT_HEAD = Object.freeze({ whole: Infinity, compact: Infinity, gap: 0 });

/**
 * The panes' fit from the scene's width (see the head; FP-12, FP-26): side
 * by side, P-LAY's fit (`fitFor`) of a pane's content box there — half of
 * `w` less half SIDE_GAP, less the room the pane keeps beside its content —
 * at the reading size, each corner beside its column whole or compact with
 * its gap between them, and no margin past the column's edge; where that fit
 * stands both corners at their documents' heads and keeps fewer than
 * HEAD_CPL characters a line, stacked, the same fit of a pane's content box
 * there — `w` less the column, less that room. Where a column asks to stand
 * at pane B's outer side (`room.outer`), side by side both corners stand at
 * their documents' heads (`AT_HEAD`): the column standing, its width taken
 * from both panes' content boxes, half from each, while each keeps HEAD_CPL
 * characters a line so; else the column after pane B's text and the panes
 * fitted without it; the panes stacked by the same test either way. Pure: the
 * scene's widths alone, never the panes' as they stand, so the form one fit
 * sets never moves the next.
 * @param {number} w the scene's inner width, px
 * @param {{pad: number, gap: number, column: number, outer: number}} room `pad` the room a pane keeps beside its content — its padding on both sides and its scrollbar — `gap` the gap its corner keeps from its text, `column` the column's width (`columnPx`), `outer` the width of the column asking to stand at pane B's outer side (`listPx`), 0 where none asks, px
 * @param {number} readPx the reading size, px
 * @returns {PaneFit}
 */
export function paneFit(w, room, readPx) {
  const corners = { whole: cornerWidth(false), compact: cornerWidth(true), gap: room.gap }, heads = room.outer > 0 ? AT_HEAD : corners;
  /** P-LAY's fit of a pane's content box `cw` px wide beside corners `size` wide, in the form `stacked` names, the column at pane B's outer side `outer` px wide */
  const at = (/** @type {number} */ cw, /** @type {import('../plane/layout.js').CornerSize} */ size, /** @type {boolean} */ stacked, /** @type {number} */ outer) => {
    const F = fitFor(cw, readPx, size, 0);
    return { cpl: F.cpl, corner: /** @type {PaneFit['corner']} */ (F.head ? 'head' : F.compact ? 'compact' : 'whole'), px: F.px, stacked, outer };
  };
  if (room.outer > 0) {
    const listed = at((w - SIDE_GAP - room.outer) / 2 - room.pad, AT_HEAD, false, room.outer);
    if (listed.cpl >= HEAD_CPL) return listed;
  }
  const beside = at((w - SIDE_GAP) / 2 - room.pad, heads, false, 0);
  return beside.corner === 'head' && beside.cpl < HEAD_CPL ? at(w - room.column - room.pad, corners, true, 0) : beside;
}

/**
 * The panes' fit, decided once for both (see the head; FP-12, FP-26):
 * `paneFit` of the scene's inner width, the room pane A keeps beside its
 * content — its padding and its scrollbar, which pane B keeps alike — the gap
 * its corner keeps from its text, the column (`columnPx`) and, at a draft's
 * history, the list's column beside that scrollbar (`listPx`), at the reading
 * size (P-CAM's); where the platform lays out no scene, the full measure side
 * by side at the reading size, the corners whole — at a draft's history, at
 * their documents' heads beside the list's column.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @returns {PaneFit}
 */
function fitOf(E, S) {
  const pane = E.paneA, listed = !!S.past;
  if (typeof getComputedStyle !== 'function' || !(E.root.clientWidth > 0) || !(pane.clientWidth > 0)) return { cpl: MEASURE_CPL, corner: listed ? 'head' : 'whole', px: READING_PX, stacked: false, outer: listed ? listPx(0) : 0 };
  const cs = getComputedStyle(pane), bar = Math.max(0, (pane.offsetWidth || pane.clientWidth) - pane.clientWidth);
  return paneFit(E.root.clientWidth, { pad: parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + bar, gap: parseFloat(cs.columnGap) || 0, column: columnPx(), outer: listed ? listPx(bar) : 0 }, READING_PX);
}

/**
 * The room the style lays the panes out by set on the scene: SIDE_GAP side
 * by side (`--scene-gap`), the column stacked (`columnPx`, `--scene-column`),
 * and the list's column at pane B's outer side `outer` px wide, none where it
 * is 0 (`--scene-list`), with its padding and its rule (`--scene-list-pad`,
 * `--scene-list-rule`). Nothing where the platform lays out nothing.
 * @param {NonNullable<typeof els>} E
 * @param {number} [outer]
 */
function setRoom(E, outer = 0) {
  if (typeof getComputedStyle !== 'function') return;
  const s = E.root.style;
  s.setProperty('--scene-gap', SIDE_GAP + 'px');
  s.setProperty('--scene-column', columnPx() + 'px');
  s.setProperty('--scene-list', outer + 'px');
  s.setProperty('--scene-list-pad', LIST_PAD + 'px');
  s.setProperty('--scene-list-rule', LIST_RULE + 'px');
}

/**
 * The scene's fit set on the panes (see the head): the measure on the scene,
 * which each article's column reads (the style's `--measure`), the room the
 * style lays the panes out by — the list's column at pane B's outer side among
 * it (`setRoom`) — and their form — stacked or side by
 * side, the scene's `stacked` class — both articles at the fit's em, each
 * pane standing its corner beside its column or, at its document's head,
 * above its text, each corner shaped for the form (`shapeCorner`), and the
 * band its heads reserve (`setBand`) — `keep` the text standing where it is
 * on screen as the band moves. Nothing where the platform lays out no pane.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {boolean} [keep]
 */
function applyFit(E, S, keep = false) {
  if (typeof getComputedStyle !== 'function') return;
  const F = S.fit;
  E.root.style.setProperty('--measure', String(F.cpl));
  setRoom(E, F.outer);
  E.root.classList.toggle('stacked', F.stacked);
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
 * corner's rows held at the pane's top its own box (`Pane.heldRows`), the
 * rest of the band below it — and none beside their columns; where it moved
 * and `keep` asks, each pane scrolled by as much, so its text stands where it
 * stood on screen (FP-8).
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {boolean} keep
 * @returns {boolean} the band moved
 */
function setBand(E, S, keep) {
  const pitch = LINE_H * S.fit.px, band = S.fit.corner === 'head' ? Math.max(S.a.rows, S.b.rows, 1) : 0, was = S.band;
  S.band = band;
  for (const side of SIDES) {
    const c = cornerEl(E, side), below = band - Math.max(1, S[side].heldRows);
    if (c) c.style.marginBottom = band > 0 && below > 0 ? below * pitch + 'px' : '';
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
 * fit read again (`fitOf`); where its measure, its corners' form, its em, the
 * panes' form or the column at pane B's outer side moved, both panes set
 * again in one step at it (`setPanes`)
 * — their texts and what they were set with kept, the reader's place, the
 * selection and the ends set level carried by their bytes, the ties measured
 * anew — else the fit set on the panes again in place (`applyFit`), their
 * text kept where it stands, the room below each article and the ties
 * measured anew.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @returns {boolean} the panes were set again — and drawn
 */
function refit(E, S) {
  const F = fitOf(E, S), was = S.fit;
  if (F.cpl === was.cpl && F.corner === was.corner && F.px === was.px && F.stacked === was.stacked && F.outer === was.outer) {
    applyFit(E, S, true);
    standList(E, S);
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
 * The heads' rows that scroll and the forms opened beneath them placed at the
 * panes' scrolls (see the head; FP-26): each corner's rows held at its pane's
 * top held there by the style with the corner's own box (`Pane.heldRows`),
 * every later row where the band sets it, scrolling with the text — under the
 * held rows, then out of the pane at its top, clipped there and never hidden,
 * so it keeps its Tab stops and its place in the accessibility tree — a form
 * opened beneath them below the last of its rows, or below the held rows as
 * they pass under them.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 */
function placeHeads(E, S) {
  if (S.fit.corner !== 'head') return;
  const pitch = LINE_H * S.fit.px;
  for (const side of SIDES) {
    const c = cornerEl(E, side), held = Math.max(1, S[side].heldRows), shift = headShift(E, S, side);
    if (!c || shift == null) continue;
    for (const r of /** @type {NodeListOf<HTMLElement>} */ (c.querySelectorAll(':scope > .hrow'))) {
      const k = Number(r.dataset.row);
      if (k >= held) r.style.top = k * pitch - shift + 'px';
    }
    const o = /** @type {HTMLElement | null} */ (c.querySelector(':scope > .opened'));
    if (o) o.style.top = Math.max(held * pitch, S[side].rows * pitch - shift) + 'px';
  }
}

/**
 * How far a pane's scroll has carried its corner's held rows below where the
 * band sets them at its document's head, px (see the head): what its rows
 * that scroll stand that far above their own places by (`placeHeads`); null
 * where no corner and no article stand there to read it from.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {'a' | 'b'} side
 * @returns {number | null}
 */
function headShift(E, S, side) {
  const c = cornerEl(E, side), art = articleIn(paneEl(E, side));
  return c && art ? c.getBoundingClientRect().top - (art.el.getBoundingClientRect().top - S.band * LINE_H * S.fit.px) : null;
}

/**
 * A head's row that scrolls brought below the rows held at its pane's top
 * where the focus comes to stand in it (see the head; FP-20, FP-26): the pane
 * scrolled up the least that stands the row there, and its rows placed again
 * at once (`placeHeads`), so the platform finds what took the focus in view;
 * nothing for a held row, a form opened beneath them — which stands below
 * them — or anything outside a head.
 * @param {NonNullable<typeof els>} E
 * @param {'a' | 'b'} side
 * @param {EventTarget | null} target what took the focus
 */
function headInView(E, side, target) {
  const S = scene, el = /** @type {HTMLElement | null} */ (target);
  if (!S || S.fit.corner !== 'head' || !el || typeof el.closest !== 'function') return;
  const r = /** @type {HTMLElement | null} */ (el.closest('.hrow')), c = cornerEl(E, side), shift = headShift(E, S, side);
  if (!r || !c || !c.contains(r) || shift == null) return;
  const k = Number(r.dataset.row), held = Math.max(1, S[side].heldRows), over = shift - (k - held) * LINE_H * S.fit.px;
  if (!(k >= held) || over <= 0) return;
  paneEl(E, side).scrollTop -= over;
  placeHeads(E, S);
}

/**
 * The margin's marks placed in the editor panes (see the head; B3-S2;
 * P-REG's `MARGIN`; FP-31, FP-37): in each pane that is its draft's editor
 * (`editor`), the marks T-LAYER reads beside its article's lines
 * (`paneMargin`) — each in the room between its column's text and its edge's
 * signs on the pane's facing side, MARGIN.inset past the text at the pane's
 * em, a bar along its lines from the top of the first to the foot of the
 * last, a zero-length form a square on its line's middle, the refused
 * bracket's stroke on its three sides away from the text — in the pane's
 * content, so its scroll carries them; a bar's top clipped below what the
 * pane's held head covers (`clearOf`), and a bar left none tall there, a
 * zero-length form under it and a mark below the pane's visible bottom
 * hidden; the first held mark in each pane's view kept for the word "held"
 * (`heldAt`, `placeStatements`). An element is written only where its place,
 * its size or its stroke changed; the marks of a pane that is no editor, or
 * whose draft holds none, removed. Nothing where the platform lays out no
 * pane. The loop runs it before O-DELETION reads a pane's lines, and the
 * scene's draw again before the edge's signs are placed.
 */
export function placeMargin() {
  const S = scene, E = els;
  drawnMarks = [];
  if (!S || !E) return;
  for (const side of SIDES) paneMarks(E, S, side);
}

/**
 * One pane's margin's marks placed (`placeMargin`).
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {'a' | 'b'} side
 */
function paneMarks(E, S, side) {
  const P = S[side], pane = paneEl(E, side);
  heldAt[side] = null;
  /** @type {Map<string, HTMLElement>} */
  const standing = new Map([...pane.querySelectorAll(':scope > .margin-mark')].map((e) => [/** @type {HTMLElement} */ (e).dataset.key || '', /** @type {HTMLElement} */ (e)]));
  const art = P.el && editor(P) && typeof pane.getBoundingClientRect === 'function' && pane.clientHeight > 0 ? articleIn(pane) : null;
  const segs = art ? LAYER.paneMargin(art.el) : [];
  if (art && segs.length) {
    const pr = pane.getBoundingClientRect(), origin = pr.top + pane.clientTop, top = origin + clearOf(pane), bottom = origin + pane.clientHeight;
    const left = pr.left + pane.clientLeft - pane.scrollLeft, at = art.el.getBoundingClientRect().top;
    const body = /** @type {HTMLElement | null} */ (art.el.querySelector(':scope > .run')), col = (body || art.el).getBoundingClientRect();
    const em = S.fit.px, inset = MARGIN.inset * em, w = Math.max(2, MARGIN.width * em), sq = Math.max(2, MARGIN.point * em), stroke = Math.max(1, MARGIN.stroke * em);
    // the pane's facing edge: pane A's right side by side, both panes' right stacked, pane B's left side by side
    const right = side === 'a' || S.fit.stacked, xOf = (/** @type {number} */ width) => Math.round(right ? col.right + inset : col.left - inset - width);
    const border = right ? `${stroke}px ${stroke}px ${stroke}px 0` : `${stroke}px 0 ${stroke}px ${stroke}px`;
    for (const seg of segs) {
      const y0 = at + seg.top, y1 = at + seg.foot, from = Math.max(y0, top);
      /** @type {Rect} */
      const r = seg.point ? { x: xOf(sq), y: Math.round((y0 + y1 - sq) / 2), w: Math.round(sq), h: Math.round(sq) } : { x: xOf(w), y: Math.round(from), w: Math.round(w), h: Math.round(y1 - from) };
      const hidden = r.h < 1 || r.y < top - 0.5 || r.y >= bottom;
      const key = `${seg.kind} ${seg.first} ${seg.point ? 'point' : 'bar'}`;
      let el = standing.get(key);
      standing.delete(key);
      if (!el) {
        el = /** @type {HTMLElement} */ (document.createElement('div'));
        el.className = 'margin-mark';
        Object.assign(el.dataset, { key, kind: seg.kind, form: seg.point ? 'point' : 'bar' });
        el.setAttribute('aria-hidden', 'true');
        pane.appendChild(el);
      }
      const tx = Math.round(r.x - left), ty = Math.round(r.y - origin + pane.scrollTop), edge = seg.kind === 'refused' ? border : '';
      const style = hidden ? 'hidden' : `${tx}|${ty}|${r.w}|${r.h}|${edge}`;
      if (markStyles.get(el) !== style) {
        if (hidden) el.style.display = 'none';
        else Object.assign(el.style, { display: '', transform: `translate(${tx}px, ${ty}px)`, width: r.w + 'px', height: r.h + 'px', borderWidth: edge });
        markStyles.set(el, style);
      }
      if (hidden) continue;
      drawnMarks.push({ el, side, addr: P.names, seg, placed: r });
      if (seg.kind === 'held' && !heldAt[side]) heldAt[side] = { y: r.y, pos: seg.pos };
    }
  }
  for (const e of standing.values()) e.remove();
}

/**
 * The margin's marks standing in the editor panes as the last margin pass
 * placed them (the gate's; `placeMargin`): each its kind, its draft, the pane
 * it stands in, its column — the pane's one — its lines [first, end) among
 * the article's, its form — a bar, or the zero-length form at a point — the
 * first position it stands beside, where the pass placed it and its rect on
 * screen as the platform lays it out; none where no scene stands.
 * @returns {Array<{kind: 'held' | 'refused', addr: string, side: 'a' | 'b', column: number, first: number, end: number, point: boolean, pos: number, placed: Rect, rect: Rect}>}
 */
export function marksStanding() {
  return drawnMarks.map((m) => {
    const r = m.el.getBoundingClientRect();
    return { kind: m.seg.kind, addr: m.addr, side: m.side, column: m.seg.column, first: m.seg.first, end: m.seg.end, point: m.seg.point, pos: m.seg.pos, placed: { ...m.placed }, rect: { x: r.left, y: r.top, w: r.width, h: r.height } };
  });
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
 * run's others' count, as the pane was set with it; and the word "held" at
 * the top of the first held mark in the pane's view (`placeMargin`; B3-S2),
 * after the other signs at its line — each in the column's
 * edge on the pane's facing side — its inner side by side, its right
 * stacked — beside its run's first line in view — a
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
 * where it stands — the word "held" apart, drawn and never announced as the
 * margin's marks are. Nothing where the platform lays out no pane.
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
    /** @type {Array<{el: HTMLElement, kind: 'statement' | 'key' | 'count' | 'held', pos: number, rect: DOMRect, y: number}>} */
    const placing = [];
    /** a sign's element standing under `key`, else made in the pane's content — the held mark's word hidden from assistive technology, drawn and never announced — written where its words changed and set at the edge's size */
    const signEl = (/** @type {string} */ key, /** @type {'statement' | 'key' | 'count' | 'held'} */ kind, /** @type {string} */ origin, /** @type {string} */ html, /** @type {number} */ pos) => {
      let el = standing.get(key);
      standing.delete(key);
      if (!el) {
        el = /** @type {HTMLElement} */ (document.createElement('div'));
        el.className = 'edge-sign';
        Object.assign(el.dataset, { key, sign: kind, origin });
        if (kind === 'held') el.setAttribute('aria-hidden', 'true');
        pane.appendChild(el);
      }
      if (el.innerHTML !== html) el.innerHTML = html;
      Object.assign(el.style, { fontSize: size + 'px', lineHeight: Math.max(lh, size * LINE_BOX) + 'px', width: width + 'px' });
      el.dataset.pos = String(pos);
      return el;
    };
    for (const sign of chosen.signs) {
      const x = /** @type {{rect: DOMRect, y: number}} */ (at.get(sign.run)), run = sign.run.run, o = run.origin, b = gaps.get(sign.run);
      const html = sign.kind === 'statement'
        ? (b ? edgeStatementHTML(placeholderOf(b, REC.reader(), LAYER.originOwner, LAYER.clauseOf), LAYER.claimsKeptIn(o), true) : sourceStatementHTML(o, LAYER.carriesC33(P.d, LAYER.originKind(o)), true))
        : sign.kind === 'key' ? edgeKeyHTML(run, true) : edgeCountHTML(sign.run.count);
      if (!html) continue;
      const el = signEl(sign.kind === 'statement' ? `${o} statement` : `${run.pos} ${sign.kind}`, sign.kind, o, html, run.pos);
      placing.push({ el, kind: sign.kind, pos: run.pos, rect: x.rect, y: x.y });
    }
    // the word "held" once in the pane, at the top of the first held mark in its view (`placeMargin`; B3-S2)
    const h = heldAt[side], body = /** @type {HTMLElement | null} */ (art.el.querySelector(':scope > .run'));
    if (h && body) placing.push({ el: signEl('held', 'held', '', `<span class="held-word" data-string="B3.held">${esc(t('B3.held'))}</span>`, h.pos), kind: 'held', pos: h.pos, rect: body.getBoundingClientRect(), y: h.y });
    for (const e of standing.values()) e.remove();
    if (!placing.length) continue;
    placing.sort((p, q) => p.y - q.y || Number(p.kind === 'held') - Number(q.kind === 'held') || p.pos - q.pos || SIGN_ORDER[p.kind] - SIGN_ORDER[q.kind]);
    const heights = placing.map((p) => p.el.offsetHeight);
    const rows = /** @type {HTMLElement[]} */ ([...art.el.querySelectorAll('.run > *')]), first = rows[0], last = rows[rows.length - 1];
    const fixed = /** @type {HTMLElement[]} */ ([...art.el.querySelectorAll('.edge')]).map((e) => { const q = e.getBoundingClientRect(); return { y: q.top, h: q.height }; });
    const ys = holdStack(placing.map((p, k) => ({ y: p.y, h: heights[k] })), first ? first.getBoundingClientRect().top : origin, vis.top + HOLD.gap, last ? last.getBoundingClientRect().bottom : vis.bottom, SIGN_GAP, fixed);
    const left = pr.left + pane.clientLeft - pane.scrollLeft, right = side === 'a' || S.fit.stacked;
    placing.forEach((p, k) => {
      const x = right ? p.rect.right + EDGE_GAP * px : p.rect.left - EDGE_GAP * px - width;
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
 * head; FP-26): to the foot of its rows held at its top (`Pane.heldRows`), the
 * corner's own box — held where the pane's padding leaves it — and of a form
 * opened beneath them, px, as the pane stands — what no act that brings a
 * line to the pane's top leaves that line under; 0 where its corner stands
 * beside its column.
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
 * nothing awaited in it: each one's reader's place, its selection
 * (O-SELECTION's) — else the one kept aside for it (`Pane.aside`) — and the
 * end set level in it read from the article it shows; its new
 * article made and swapped in, its corner and the bar naming what it shows
 * now; then each one's place and its end set level carried to
 * where their bytes stand in the text it takes — by identity through the
 * images the two articles were made from, else by position, a corner's act's
 * passage by the position that act names — and its selection following its
 * words there by FP-21's rule (O-SELECTION's `followPane`): moved where they
 * stand in one piece, else ended; kept aside by its bytes, standing none,
 * where that text is still being read — the runs of shared identity
 * between the panes taken, the far ends crossing into each kept, and the ties
 * measured anew and drawn, so no tie is drawn over text it was not measured
 * on; a stroke's list standing checked again (`recheckList`); and what the
 * selections' following says said once in the status region, save where the
 * caller says it with words of its own (`own`). Every article
 * is made at the scene's fit, its corner in the fit's form, and the fit set on
 * the panes (`applyFit`) before anything is carried, a place's line that
 * stood in view carried below what a held head covers (`clearOf`). A pane
 * taken down to its cover at a change of the page's class carries nothing
 * into the text it takes: its reader's place and its selection are kept for
 * the read at the new class that sets it again, the selection standing none
 * meanwhile and nothing said. A pane set again at a new fit alone (`refit`)
 * keeps its text, its lines broken anew: its place is its first line in view
 * (`firstLineIn`), no `compare` read against it is outdated by it, and a
 * place or a selection kept for such a read stays kept, as does its title's name. A pane set
 * from a record not derived is the held version no more (`Pane.heldVersion`);
 * one set from another record takes its title's name for the state it shows
 * now (`nameTitle`). Each pane set counts its corner's rows held at its top
 * anew (`Pane.heldRows`).
 * @param {Scene} S
 * @param {Array<{side: 'a' | 'b', next: Next, down?: boolean, same?: boolean}>} sets `down` the pane taken down to its cover at a change of the page's class; `same` the pane set again at a new fit, its text the one it shows
 * @param {ComparePair[] | null} pairs the runs of shared identity between the panes now; null where they stand as they were
 * @param {{named: boolean} | null} [own] the caller says what the selections' following says, with words of its own — `named` where those name the pane before it, as a step's landing does by its title (O-SELECTION's `Into.named`)
 * @returns {string | null} what the selections' following says, the panes' in order, each its sentences; none where no selection moved or ended
 */
function setPanes(S, sets, pairs, own = null) {
  const E = els;
  if (!E) return null;
  const set = new Set(sets.map((x) => x.side));
  const carried = sets.map(({ side, next, down, same }) => {
    const P = S[side], made = P.el ? LAYER.madeOf(P.el) : null, image = made ? made.image : [], pane = paneEl(E, side);
    const here = placeAt(P, next.hold ? next.hold.from : same ? firstLineIn(P, pane) : firstInView(pane));
    const live = made ? SEL.selected(side) : null;
    /** @type {import('../overlays/selection.js').Was | null} the selection as it stands, by its bytes in the text it stands in; else the one kept aside, save at a new fit alone */
    const sel = live && made ? { span: live, ids: REC.identityIn(image, live.pos, live.width), backward: SEL.backward(side), text: made } : same ? null : P.aside;
    if (down) { P.place = P.place || here; P.aside = sel; P.focus = null; SEL.clear(side); return { side, next, same, place: null, sel: null, level: null, focus: null }; }
    const place = same ? here : P.place || here;
    if (!same) P.place = null;
    const lv = S.level[side];
    return {
      side, next, same, place, sel,
      level: lv != null ? { pos: lv, ids: REC.identityIn(image, lv, 1) } : null,
      focus: P.focus != null ? { pos: P.focus, ids: REC.identityIn(image, P.focus, 1) } : null,
    };
  });
  for (const { side, next, same } of carried) {
    const P = S[side], view = { ...(next.view ?? LAYER.sceneView(next.d)), cpl: S.fit.cpl };
    // set at another fit, or from another record: its held rows counted anew there; from another record, its title's name too
    Object.assign(P, { d: { ...next.d }, view, kind: next.kind, src: next.src, names: next.names, shows: next.shows, k: next.k, n: next.n, read: next.read, lacks: next.lacks, heldVersion: P.heldVersion && !!next.d.derived, heldRows: 0, titleRows: 0 });
    if (!same) { P.sets++; nameTitle(P); }
    swap(E, P);
    writeCorner(E, P);
    nameBar(E, P);
  }
  namePanes(E, S);
  applyFit(E, S);
  standList(E, S);
  roomBelow(E);
  /** @type {string[]} what each pane's selection's following says, in the panes' order */
  const said = [];
  for (const { side, next, place, sel, level, focus } of carried) {
    const P = S[side], pane = paneEl(E, side), image = P.d.image;
    /** where a carried byte stands in the text taken: by its identity, the corner's act's passage at the position it names, else where it stood */
    const there = (/** @type {{pos: number, ids: ISpan[]}} */ x) => {
      if (next.hold && x.pos === next.hold.from) return next.hold.to;
      const at = REC.placedIn(image, x.ids);
      return at.length ? at[0].pos : x.pos;
    };
    // a line that stood in view stays in view, below what a held head covers
    if (place) { const line = lineAt(pane, P.names, there(place)); if (line) pane.scrollTop = line.top - (place.at >= 0 ? Math.max(place.at, clearOf(pane)) : place.at); }
    // the selection follows its words into the text taken: moved, ended, or kept aside while that text is read
    if (sel && P.el) { const f = SEL.followPane(side, sel, !!own && own.named); P.aside = f.waits ? sel : null; if (f.said) said.push(f.said); }
    if (level) S.level[side] = there(level);
    // the span focus on the span holding its byte in the text taken, else where it stood (T-SPAN's `elementIn`)
    if (focus) { const b = elementIn(P.d.blocks, there(focus)); P.focus = b ? b.pos : null; }
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
  const words = said.length ? sentences(...said) : null;
  if (words && !own) FOCUS.say(words);
  return words;
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
 * (`answer`). An editor pane is set from the text the page shows of its draft
 * (T-LAYER's `shownOf`), taken as each pass of the reads between the panes
 * begins, a pass where that text moved while they were out read again over
 * it (FP-38), so the setting lands on the words standing as it lands. A newer
 * member found where a row naming it was not seen pins an
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
  // a derived record is the page's, not the board's: no read sets it again (see the head) — save an editor pane's, the text the
  // page shows of its draft, whose record the read sets again under it
  if (P.d.derived && !editor(P)) return;
  const stale = () => scene !== S || P.serial !== serial;
  /** the passage the corner's act carries, by its bytes in the text the pane shows: the pane's landing once the version it reads is set (`Pane.landed`) */
  const carried = how.carry ? idsIn(P, how.carry.pos, how.carry.width) : [];
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
      // an editor pane is set from the text the page shows of its draft over the record read, taken again at each pass: the person's own words in it (FP-38)
      const own = !how.src && editor(P) ? LAYER.shownOf(src) : null, text = own || d, took = { runs: text.runs, image: text.image, blocks: text.blocks };
      const mine = { src, d: text, shown: LK.shown(src, text) }, theirs = { src: Q.src, d: Q.d, shown: Q.view.marks };
      const between = await readBetween(side === 'a' ? mine : theirs, side === 'a' ? theirs : mine);
      if (stale()) return;
      if (Q.sets !== seen) continue;
      // the text an editor pane shows moved while the reads were out — typed in, or its record set again under it: read between again over it as it stands
      if (own && !sameText(LAYER.shownOf(src), took)) continue;
      if (!how.src && between.unheard) { unset(between.unheard); return; }
      const read = how.read !== undefined ? how.read : P.read;
      // set from its reads: kept no more, from the step that sets it — a setting the board's events asked saying whether it changed what the pane shows
      if (!how.src && P.kept) P.lift = { since: P.kept.at, outcome: REC.shownBy(P.d) === REC.shownBy(text) ? 'unchanged' : 'changed' };
      P.kept = null;
      setPanes(S, [{ side, next: { d: text, kind, src, names, shows: kind === 'bare' ? src : names, k, n, read, lacks, hold } }], between.pairs);
      if (carried.length) P.landed = carried;
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
 * carried into it and its selection following its words (`setPanes`); one
 * the change dropped or covered taken down to its cover, its reader's place
 * and its selection kept by their bytes for that read — and read again at
 * the class the page reads at then; a
 * refresh reaching every pane (`refreshed`); a row naming a newer member
 * pinning an edition at its bare address at once, or counting a version's
 * chain again; any other row reaching a pane's text, and a clause decided
 * anew at an origin its text windows, reading it again in its place; owner
 * facts taken anew (M-PUMP's `bylineTaken`) reaching each pane on a document
 * the owner holds once no setting reads (`whenSet`) — so a setting out, a
 * corner's act's among them, lands as asked, with them — and reading it again
 * in its place where its byline was made with other facts (`Pane.facts`),
 * nothing else of it touched; and a row naming the draft whose history the
 * scene stands on arriving at its list (`arriveRows`), the rows below read on
 * where its not-last clause stands with its count not yet told (`owes`,
 * `readOlder`).
 * @param {Dropped} x
 */
export function dropped(x) {
  const S = scene;
  if (!S) return;
  if (S.past && x.row && Array.isArray(x.row.docs) && x.row.docs.includes(S.past.draft)) {
    arriveRows(S, [x.row]);
    if (owes(S.past)) void readOlder(S);
  }
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
 * the pane's place — the passage held carried into it (`readIn`) — and the
 * version left offered back.
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
 * the pane, else the passage its last step carried where its text holds any
 * of it (`landedIn`), else the first span in view — carried into it, its line
 * kept, and the pane's landing from then on (`Pane.landed`); the selection
 * following its words there (`setPanes`), the corner saying so where the
 * version lacks the passage, and the version left offered back; never a
 * box's version (FP-22). Nothing where the pane shows no version of an
 * edition, or the version named.
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
    const first = firstInView(paneEl(E, side));
    const at = passage || (P.el ? SEL.selected(side) : null) || landedIn(P) || (first != null ? { pos: first, width: 1 } : null);
    void update(side, { src: versionAddress(boxOf(P.src), k), carry: at ? { pos: at.pos, width: at.width } : null, read: P.k });
  });
}

/**
 * The passage a pane's last step carried where the text it shows holds any
 * of it now (`Pane.landed`): from the first stretch the image its article was
 * made from places those bytes in to the end of the last; null where it holds
 * none, or none was carried.
 * @param {Pane} P
 * @returns {{pos: number, width: number} | null}
 */
function landedIn(P) {
  const at = P.landed && P.landed.length ? REC.placedIn(imageOf(P), P.landed) : [], z = at[at.length - 1];
  return z ? { pos: at[0].pos, width: z.pos + z.width - at[0].pos } : null;
}

/**
 * A pane's compact corner opened whole where it stands, on its act — a click
 * on a glyph or on a head's count, the platform's from Enter or Space at them
 * among them — and closed again by the same act at the corner opened, the
 * words a glyph opened among them (FP-26): beside its column, its items whole
 * over what stands beside it, its room the compact one, so nothing beside it
 * moves (the style's); at its document's head, every item whole beneath its
 * rows. An act in the scene (`actedIn`).
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

/**
 * A draft's kept word's act in a pane's corner (D5 K-57, K-74; B3-S2): its
 * statement opened, or closed again (T-LAYER's `openStatement`), the corner
 * written again in place and the heads' band with it; nothing where the pane
 * holds no draft's current text (`current`) or the draft has no kept state. An
 * act in the scene (`actedIn`).
 * @param {'a' | 'b'} side
 */
function keptAct(side) {
  const S = scene, E = els;
  if (!S || !E) return;
  const P = S[side];
  if (!current(P) || !WRITE.keptOf(P.names)) return;
  actedIn(S);
  LAYER.openStatement(P.names);
  writeCorner(E, P);
  rebanded(E, S);
}

/**
 * A draft's kept line's second act in a pane's corner, "show its history"
 * (B3-S7): the history of the draft the pane holds opened
 * as the app hands it in (`attach`; N-GO's `history`), the pane named, whose
 * selection the history's panes level at — which, in the draft's
 * own history scene, moves the focus into the history pane (`focusPast`), and
 * where the act stands inert says its reason (FP-41); where its read was
 * refused, the line saying why stands beside the act's element. Nothing where
 * the pane holds no draft's current text (`current`). An act in the scene
 * (`actedIn`).
 * @param {'a' | 'b'} side
 * @param {boolean} byKey
 * @param {Element | null} at the act's element
 */
function historyAct(side, byKey, at) {
  const S = scene;
  if (!S || !current(S[side])) return;
  actedIn(S);
  history(S[side].names, byKey, side, at);
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
 * since the ties were measured (`refit`): each band at its extent, held
 * inside each pane's visible height; each stroke whose two heights stand in
 * their panes' visible heights; each line's end where its passage's line
 * stands — a whole document's at its pane's facing edge, as far below its
 * pane's visible top as the line's other end stands below its own
 * (`levelWith`) — side by side each between the panes' facing edges
 * (`drawBand`, `drawStroke`, `drawTie`); stacked each at each of its ends
 * (`drawBars`, `drawStrokeEnds`, `drawEnd`), the one tie the pointer, the
 * focus or the scene's opening chooses drawn whole along the column
 * (`crossingOf`, `drawCrossing`) and the ends the pointer stands on kept
 * (`drawnHits`); then each facing edge whole-document ends meet
 * (`wholeEdges`, `drawEdge`); the strokes' buttons and the stop placed
 * (`placeStrokes`, `placeStop`) — a stop the reader returned to standing
 * until it is answered and they have moved on from it, then under the
 * scene's own rules — the heads' later rows placed at the panes' scrolls
 * (`placeHeads`), each editor pane's margin's marks (`placeMargin`), each
 * pane's origins stated in its column's edge with the word at its first held
 * mark (`placeStatements`), and the list of a draft's past states placed
 * (`placeList`); then the panes' selections set right with the focus and
 * drawn (O-SELECTION's `drawPanes`), as boxes where the platform draws no
 * custom highlight (`placeSelBoxes`).
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
  /** a pane on the canvas: its sides, its visible content's top and bottom, its content's top */
  const frame = (/** @type {HTMLElement} */ pane) => {
    const r = pane.getBoundingClientRect(), top = r.top + pane.clientTop - c.top;
    return { x0: r.left - c.left, x1: r.right - c.left, top, bottom: top + pane.clientHeight, origin: top - pane.scrollTop };
  };
  /** an end on the canvas: at its line, or at the pane's edge where its line has left the pane */
  const at = (/** @type {ReturnType<typeof frame>} */ f, /** @type {End} */ e) => {
    const y = f.origin + e.y;
    return { y: Math.max(f.top, Math.min(f.bottom, y)), clipped: y < f.top || y > f.bottom, above: y < f.top };
  };
  /** a band's end on the canvas: its extent held inside its pane's visible height, and whether it passes the visible top or bottom */
  const span = (/** @type {ReturnType<typeof frame>} */ f, /** @type {BandEnd} */ e) => {
    const top = f.origin + e.top, bottom = f.origin + e.bottom, hold = (/** @type {number} */ y) => Math.max(f.top, Math.min(f.bottom, y));
    return { top: hold(top), bottom: hold(bottom), above: top < f.top, below: bottom > f.bottom };
  };
  const fa = frame(E.paneA), fb = frame(E.paneB), stacked = S.fit.stacked;
  // each pane's facing edge — side by side pane A's right and pane B's left, stacked both panes' right — how far an end
  // leaves it stacked, and where along the column the one tie drawn whole runs
  const x0 = fa.x1, x1 = stacked ? fb.x1 : fb.x0, em = stacked ? endEm(S.fit.px, c.width - fa.x1) : 0, xc = c.width - em / 2;
  /** an end the pointer stands on in the column (`Hit`): `top` to `bottom` on the canvas, an em out from the edge at `x`, on screen */
  const hit = (/** @type {string} */ tie, /** @type {number} */ order, /** @type {number} */ x, /** @type {number} */ top, /** @type {number} */ bottom) => ({ tie, order, x0: x + c.left, x1: x + em + c.left, top: top + c.top, bottom: bottom + c.top });
  /** a point on the canvas, on screen */
  const onScreen = (/** @type {{x: number, y: number}} */ p) => ({ x: p.x + c.left, y: p.y + c.top });
  // every band, every stroke in view and every line, on the canvas
  const bands = S.bands.map((band) => ({ band, tie: bandKey(band), ea: span(fa, band.a), eb: span(fb, band.b) }));
  const strokes = S.strokes.flatMap((s) => {
    const a = { x: x0, y: fa.origin + s.a }, b = { x: x1, y: fb.origin + s.b };
    return s.key && a.y >= fa.top && a.y <= fa.bottom && b.y >= fb.top && b.y <= fb.bottom ? [{ s, key: s.key, tie: 'stroke ' + s.key, a, b }] : [];
  });
  const lines = S.lines.map((tie) => {
    const ta = tie.a.whole ? null : at(fa, tie.a), tb = tie.b.whole ? null : at(fb, tie.b);
    return { tie, key: lineKey(tie), ea: ta || levelWith(fa, tb, fb), eb: tb || levelWith(fb, ta, fa) };
  });
  const crossing = stacked ? crossingOf([...bands, ...strokes.map((x) => ({ tie: x.tie })), ...lines.map((x) => ({ tie: x.key, link: x.tie.link }))], { hover: S.hover, focus: focusTie(E, S), link: S.link }) : null;
  /** @type {Drawn[]} */
  const out = [];
  /** @type {StrokeDrawn[]} */
  const struck = [];
  /** @type {Hit[]} */
  const hits = [];
  /** a band's end on screen */
  const bandOnScreen = (/** @type {ReturnType<typeof span>} */ e, /** @type {number} */ x, /** @type {BandEnd} */ end) => ({ pos: end.pos, width: end.width, x: x + c.left, top: e.top + c.top, bottom: e.bottom + c.top, above: e.above, below: e.below, clipped: e.above || e.below });
  ctx.globalAlpha = 1;
  for (const { band, tie, ea, eb } of bands) {
    if (stacked) drawBars(ctx, { x: x0, ...ea }, { x: x1, ...eb }, em); else drawBand(ctx, { x: x0, ...ea }, { x: x1, ...eb });
    out.push({ kind: 'band', link: null, tie, a: bandOnScreen(ea, x0, band.a), b: bandOnScreen(eb, x1, band.b) });
    if (stacked) hits.push(hit(tie, 2, x0, ea.top, ea.bottom), hit(tie, 2, x1, eb.top, eb.bottom));
  }
  for (const { s, key, tie, a, b } of strokes) {
    /** @type {{x: number, y: number}} */
    let p;
    if (stacked) {
      drawStrokeEnds(ctx, a, b, s, em);
      p = { x: x0 + em / 2, y: a.y };
      hits.push(hit(tie, 1, x0, a.y - HIT_PX, a.y + HIT_PX), hit(tie, 1, x1, b.y - HIT_PX, b.y + HIT_PX));
    } else {
      drawStroke(ctx, a, b, s);
      p = pointOn(strokeOf(a, b), s.halfA && s.halfB ? GAP_MIDDLE : s.halfA ? GAP_MIDDLE / 2 : (1 + GAP_MIDDLE) / 2);
    }
    struck.push({ key, a: onScreen(a), b: onScreen(b), halfA: s.halfA, halfB: s.halfB, changes: s.changes, at: onScreen(p) });
  }
  for (const { tie, key, ea, eb } of lines) {
    ctx.globalAlpha = tie.value; ctx.lineWidth = 1.6;
    if (!stacked) drawTie(ctx, { x: x0, ...ea }, { x: x1, ...eb }, tie.ink);
    else { drawEnd(ctx, { x: x0, ...ea }, tie.ink.a, em); drawEnd(ctx, { x: x1, ...eb }, tie.ink.b, em); }
    if (stacked) hits.push(hit(key, 0, x0, ea.y - HIT_PX, ea.y + HIT_PX), hit(key, 0, x1, eb.y - HIT_PX, eb.y + HIT_PX));
    out.push({
      kind: 'link', link: tie.link, tie: key,
      a: { pos: tie.a.pos, width: tie.a.width, x: x0 + c.left, y: ea.y + c.top, clipped: ea.clipped, cover: !!tie.a.cover, whole: !!tie.a.whole },
      b: { pos: tie.b.pos, width: tie.b.width, x: x1 + c.left, y: eb.y + c.top, clipped: eb.clipped, cover: !!tie.b.cover, whole: !!tie.b.whole },
    });
  }
  /** @type {Edge[]} */
  const edged = [];
  for (const e of wholeEdges(S.lines)) {
    const f = e.side === 'a' ? fa : fb, x = e.side === 'a' ? x0 + EDGE_W / 2 : stacked ? x1 + EDGE_W / 2 : x1 - EDGE_W / 2, ink = inkOf(e.mark);
    ctx.globalAlpha = e.mark.value; ctx.lineWidth = EDGE_W;
    drawEdge(ctx, x, f.top, f.bottom, ink);
    edged.push({ side: e.side, links: e.links, x: x + c.left, top: f.top + c.top, bottom: f.bottom + c.top, hue: ink.hue, dashed: ink.dash.length > 0 });
  }
  /** @type {Crossing | null} */
  let drawn = null;
  if (crossing) {
    const b = bands.find((x) => x.tie === crossing.tie), s = strokes.find((x) => x.tie === crossing.tie), l = lines.find((x) => x.key === crossing.tie);
    // its body runs on from its ends' cut, an em out from each facing edge, each end drawn as every end is; the path it
    // stands on runs from the edges themselves
    /** the path from `x` past pane A's edge at `ya` out to the column's outer side, along it, and into `x` past pane B's at `yb` */
    const path = (/** @type {number} */ ya, /** @type {number} */ yb, x = 0) => crossingPath({ x: x0 + x, y: ya }, { x: x1 + x, y: yb }, xc);
    ctx.globalAlpha = 1;
    if (b) {
      drawCrossing(ctx, { kind: 'band', a: { x: x0 + em, top: b.ea.top, bottom: b.ea.bottom }, b: { x: x1 + em, top: b.eb.top, bottom: b.eb.bottom }, x: xc, w: em / 4 });
      drawn = { tie: b.tie, kind: 'band', link: null, why: crossing.why, path: path((b.ea.top + b.ea.bottom) / 2, (b.eb.top + b.eb.bottom) / 2).map(onScreen) };
    } else if (s) {
      drawCrossing(ctx, { kind: 'stroke', path: path(s.a.y, s.b.y, em), halves: s.s });
      drawn = { tie: s.tie, kind: 'stroke', link: null, why: crossing.why, path: path(s.a.y, s.b.y).map(onScreen) };
    } else if (l) {
      ctx.globalAlpha = l.tie.value; ctx.lineWidth = 1.6;
      drawCrossing(ctx, { kind: 'link', path: path(l.ea.y, l.eb.y, em), ink: l.tie.ink });
      drawn = { tie: l.key, kind: 'link', link: l.tie.link, why: crossing.why, path: path(l.ea.y, l.eb.y).map(onScreen) };
    }
  }
  ctx.globalAlpha = 1;
  drawnTies = out;
  drawnEdges = edged;
  drawnStrokes = struck;
  drawnCrossing = drawn;
  drawnHits = hits;
  placeStrokes(E, S);
  placeStop(E, S);
  placeHeads(E, S);
  placeMargin();
  placeStatements(E, S);
  placeList(E, S);
  SEL.drawPanes();
  placeSelBoxes(E, S);
}

/**
 * Each pane's selection the platform does not hold drawn as boxes behind its
 * text, where the platform draws no custom highlight (O-SELECTION's
 * `drawsHighlights`, `selections`; Q3): a box a line of the ranges its own
 * characters stand in, the chrome left out (T-LAYER's `textRangesIn`), in the
 * pane's content so its scroll carries them, as a margin's mark is placed
 * (`paneMarks`), in the inactive selection's look the style gives
 * `.sel-box`; none where the platform draws the highlight, or the pane holds
 * no selection it does not hold. Drawn anew only where the article, the
 * selection, the pane's width or where the article stands in the pane's
 * content changed since (`boxedFor`), a scroll moving none. Drawn and never
 * announced.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 */
function placeSelBoxes(E, S) {
  const drawn = SEL.drawsHighlights() ? [] : SEL.selections().filter((x) => x.inactive && x.site !== 'plane');
  for (const side of SIDES) {
    const P = S[side], pane = paneEl(E, side), x = drawn.find((y) => y.site === side);
    if (!P.el || typeof pane.getBoundingClientRect !== 'function') continue;
    // the pane's content's origin on screen, and where the article stands in that content
    const pr = pane.getBoundingClientRect(), left = pr.left + pane.clientLeft - pane.scrollLeft, top = pr.top + pane.clientTop - pane.scrollTop, ar = P.el.getBoundingClientRect();
    const key = x ? `${x.pos}+${x.width} ${pane.clientWidth} ${Math.round(ar.left - left)},${Math.round(ar.top - top)}` : '';
    if (boxedFor.get(P.el) === key) continue;
    boxedFor.set(P.el, key);
    for (const e of typeof pane.querySelectorAll === 'function' ? [...pane.querySelectorAll(':scope > .sel-box')] : []) e.remove();
    if (!x) continue;
    for (const r of LAYER.textRangesIn(P.el, x)) {
      for (const q of [...r.getClientRects()]) {
        if (q.width <= 0 || q.height <= 0) continue;
        const box = /** @type {HTMLElement} */ (document.createElement('div'));
        box.className = 'sel-box';
        box.setAttribute('aria-hidden', 'true');
        Object.assign(box.style, { transform: `translate(${Math.round(q.left - left)}px, ${Math.round(q.top - top)}px)`, width: Math.round(q.width) + 'px', height: Math.round(q.height) + 'px' });
        // before the pane's own children, so the list of past states after pane B's text stays its last
        pane.prepend(box);
      }
    }
  }
}

/** a band's key (`tieKey`): its runs' first positions in each pane */
const bandKey = (/** @type {Band} */ b) => `band ${b.a.pos} ${b.b.pos}`;
/** a line's key (`tieKey`): its link and its ends' first positions — one link drawn once for each pair of its ends */
const lineKey = (/** @type {Tie} */ l) => `link ${l.link} ${l.a.pos} ${l.b.pos}`;

/** how far a tie's end leaves its pane's facing edge where the panes stack, px (see the head): an em of the panes' — `px` — and half the column `col` at most */
const endEm = (/** @type {number} */ px, /** @type {number} */ col) => Math.max(0, Math.min(px, col / 2));

/** how far a tie's end leaves its pane's facing edge where the panes stack, as the scene stands (`endEm`): the column the room between pane A's facing edge and the canvas's right */
function emOf(/** @type {NonNullable<typeof els>} */ E, /** @type {Scene} */ S) {
  return endEm(S.fit.px, E.canvas.getBoundingClientRect().right - E.paneA.getBoundingClientRect().right);
}

/**
 * A whole document's end on the canvas (see the head): as far below its
 * pane's visible top as the line's other end stands below its own — the
 * other end's own height side by side, where the panes' tops are one — held
 * inside its pane's visible height; at its visible top where the other end is
 * a whole document too.
 * @param {{top: number, bottom: number}} f its pane, on the canvas
 * @param {{y: number} | null} o the line's other end, on the canvas; null where it is a whole document
 * @param {{top: number}} fo the other end's pane, on the canvas
 * @returns {{y: number, clipped: boolean, above: boolean}}
 */
export function levelWith(f, o, fo) {
  return { y: Math.max(f.top, Math.min(f.bottom, o ? f.top + (o.y - fo.top) : f.top)), clipped: false, above: false };
}

/**
 * The one tie drawn whole between the stacked panes (see the head): of the
 * ties drawn, the one the pointer stands on, else the one holding the focus,
 * else the first line of the link the scene was opened from; null where none
 * of them is drawn.
 * @param {Array<{tie: string, link?: string | null}>} drawn the ties drawn, each by its key (`tieKey`) and its link where it is a line
 * @param {{hover: string | null, focus: string | null, link: string | null}} at the tie the pointer stands on, the one holding the focus, by their keys, and the link the scene was opened from
 * @returns {{tie: string, why: 'pointer' | 'focus' | 'opened'} | null}
 */
export function crossingOf(drawn, at) {
  const keys = new Set(drawn.map((d) => d.tie));
  if (at.hover != null && keys.has(at.hover)) return { tie: at.hover, why: 'pointer' };
  if (at.focus != null && keys.has(at.focus)) return { tie: at.focus, why: 'focus' };
  const opened = at.link != null ? drawn.find((d) => d.link === at.link) : undefined;
  return opened ? { tie: opened.tie, why: 'opened' } : null;
}

/**
 * The tie holding the platform's focus (see the head), by its key
 * (`tieKey`): a stroke's button's stroke, a returned stroke's; the band whose
 * run in pane B holds the passage the stop stands for — a returned stop's,
 * where pane B's text places it now; null where the focus stands on none.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @returns {string | null}
 */
function focusTie(E, S) {
  const at = typeof document !== 'undefined' ? /** @type {HTMLElement | null} */ (document.activeElement) : null, R = S.returned;
  if (!at) return null;
  /** the band whose run in pane B holds a position */
  const bandAt = (/** @type {number} */ pos) => { const b = S.bands.find((x) => x.b.pos <= pos && pos < x.b.pos + x.b.width); return b ? bandKey(b) : null; };
  if (R && at === R.el) {
    if (R.stop.kind === 'stroke') return 'stroke ' + R.stop.key;
    const p = REC.placedIn(imageOf(S.b), R.stop.at.ids)[0];
    return p ? bandAt(p.pos) : null;
  }
  if (at === E.stop) return S.at != null ? bandAt(S.shared[S.at].pos) : null;
  return E.strokes.contains(at) && at.dataset && at.dataset.stroke ? 'stroke ' + at.dataset.stroke : null;
}

/**
 * The tie whose end the last draw drew in the column under a point on screen
 * (`Hit`): a line's before a stroke's before a band's; null where none
 * stands there.
 * @param {Hit[]} hits
 * @param {number} x
 * @param {number} y
 * @returns {string | null}
 */
export function hitIn(hits, x, y) {
  /** @type {Hit | null} */
  let best = null;
  for (const h of hits) if (x >= h.x0 && x <= h.x1 && y >= h.top && y <= h.bottom && (!best || h.order < best.order)) best = h;
  return best ? best.tie : null;
}

/**
 * The tie the pointer stands on where the panes stack, kept as the scene's
 * view state (`Scene.hover`; FP-7): a stroke's button's stroke, else the end
 * the last draw drew in the column under it (`hitIn`) — the frame marked
 * where it moved, so the next draw draws that tie whole (FP-9); none where
 * the pointer leaves the scene or the panes stand side by side.
 * @param {PointerEvent | null} ev
 */
function hoverAt(ev) {
  const S = scene;
  if (!S) return;
  const tg = ev ? /** @type {HTMLElement | null} */ (ev.target) : null;
  const b = tg && typeof tg.closest === 'function' ? /** @type {HTMLElement | null} */ (tg.closest('#scenestrokes [data-stroke]')) : null;
  const key = !ev || !S.fit.stacked ? null : b && b.dataset.stroke ? 'stroke ' + b.dataset.stroke : hitIn(drawnHits, ev.clientX, ev.clientY);
  if (key === S.hover) return;
  S.hover = key;
  markDirty();
}

/**
 * The path the one tie drawn whole between the stacked panes runs along (see
 * the head): from its end at pane A's facing edge out to the column's outer
 * side at `x`, along it, and into its end at pane B's facing edge.
 * @param {{x: number, y: number}} a its end at pane A's facing edge
 * @param {{x: number, y: number}} b its end at pane B's
 * @param {number} x where along the column it runs
 * @returns {Array<{x: number, y: number}>}
 */
export function crossingPath(a, b, x) {
  return [{ x: a.x, y: a.y }, { x, y: a.y }, { x, y: b.y }, { x: b.x, y: b.y }];
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

/**
 * Draw one band where the panes stack (`draw`; see the head): at each pane's
 * facing edge a bar — its ground an em wide from the edge, from its extent's
 * top to its bottom, in sameness's texture, and those its edges, cut an em
 * out, BAND_EDGE_W px in sameness's boundary, one where it stands no taller
 * than a line; where it passes its pane's visible top or bottom the stub's
 * triangle at that edge, in the column, pointing the way it passes — and the
 * two bars joined by a hairline along the column at their cut, HAIRLINE_W px
 * in sameness's boundary, from the upper bar's bottom to the lower bar's top.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x: number, top: number, bottom: number, above: boolean, below: boolean}} a its end at pane A's facing edge, on the canvas, held inside the pane's visible height
 * @param {{x: number, top: number, bottom: number, above: boolean, below: boolean}} b its end at pane B's, below pane A's
 * @param {number} em how far each bar leaves its edge (`endEm`)
 */
export function drawBars(ctx, a, b, em) {
  for (const e of [a, b]) {
    ctx.beginPath();
    ctx.moveTo(e.x, e.top); ctx.lineTo(e.x + em, e.top); ctx.lineTo(e.x + em, e.bottom); ctx.lineTo(e.x, e.bottom);
    ctx.closePath();
    ctx.fillStyle = SAMENESS.texture;
    ctx.fill();
    ctx.lineWidth = BAND_EDGE_W;
    strokeIn(ctx, strokeOf({ x: e.x, y: e.top }, { x: e.x + em, y: e.top }), BAND_INK, BAND_INK, null);
    if (e.bottom !== e.top) strokeIn(ctx, strokeOf({ x: e.x, y: e.bottom }, { x: e.x + em, y: e.bottom }), BAND_INK, BAND_INK, null);
    if (e.above) stub(ctx, e.x + 6, e.top, -1, BAND_INK.hue);
    if (e.below) stub(ctx, e.x + 6, e.bottom, 1, BAND_INK.hue);
  }
  ctx.lineWidth = HAIRLINE_W;
  strokeIn(ctx, strokeOf({ x: a.x + em, y: a.bottom }, { x: b.x + em, y: b.top }), BAND_INK, BAND_INK, null);
}

/**
 * Draw one end of a link's line where the panes stack (`draw`; see the
 * head), its width and alpha set on the context: an em of the line leaving
 * its pane's facing edge at its passage's first line, in that end's ink, cut
 * there; where its line has left the pane, at the pane's edge with the stub's
 * triangle in that end's hue.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x: number, y: number, clipped: boolean, above: boolean}} e the end at its pane's facing edge, on the canvas
 * @param {Ink} ink that end's
 * @param {number} em how far it leaves the edge (`endEm`)
 */
export function drawEnd(ctx, e, ink, em) {
  strokeIn(ctx, strokeOf({ x: e.x, y: e.y }, { x: e.x + em, y: e.y }), ink, ink, null);
  if (e.clipped) stub(ctx, e.x + 6, e.y, e.above ? -1 : 1, ink.hue);
}

/**
 * Draw one stroke's ends where the panes stack (`draw`; see the head): an em
 * of the bands' shared edge leaving each pane's facing edge at its height, in
 * each half side by side draws — beside each pane holding bytes between the
 * runs — STROKE_W px in sameness's boundary, and none beside a pane holding
 * none.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x: number, y: number}} a its end at pane A's facing edge, on the canvas
 * @param {{x: number, y: number}} b its end at pane B's
 * @param {{halfA: boolean, halfB: boolean}} halves
 * @param {number} em how far each leaves its edge (`endEm`)
 */
export function drawStrokeEnds(ctx, a, b, halves, em) {
  ctx.lineWidth = STROKE_W;
  if (halves.halfA) strokeIn(ctx, strokeOf(a, { x: a.x + em, y: a.y }), BAND_INK, BAND_INK, null);
  if (halves.halfB) strokeIn(ctx, strokeOf(b, { x: b.x + em, y: b.y }), BAND_INK, BAND_INK, null);
}

/** @typedef {{kind: 'link', path: Array<{x: number, y: number}>, ink: {a: Ink, b: Ink}} | {kind: 'stroke', path: Array<{x: number, y: number}>, halves: {halfA: boolean, halfB: boolean}} | {kind: 'band', a: {x: number, top: number, bottom: number}, b: {x: number, top: number, bottom: number}, x: number, w: number}} Whole the one tie drawn whole between the stacked panes, as `drawCrossing` draws it: a line or a stroke along its path (`crossingPath`), a band from its bars' cut (`a.x`, `b.x`) at their extents to a strip `w` wide along the column at `x` */

/**
 * Draw the one tie drawn whole between the stacked panes (`draw`; see the
 * head): a line along its path in pane A's end's ink to the path's middle and
 * pane B's after it, each stretch drawn from the middle, so they meet there
 * with no dot or break and a dashed one begins in ink where the other ends
 * (FP-30), its width and alpha set on the context; a stroke along its path,
 * STROKE_W px in sameness's boundary, the half to the middle where pane A
 * holds bytes between the runs and the half after it where pane B does; a
 * band its ground from each bar's cut at that bar's extent out to a strip
 * along the column, in sameness's texture, and its two sides its edges,
 * BAND_EDGE_W px in sameness's boundary.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Whole} w
 */
export function drawCrossing(ctx, w) {
  if (w.kind === 'band') {
    const { a, b } = w, x0 = w.x - w.w / 2, x1 = w.x + w.w / 2;
    const outer = [{ x: a.x, y: a.top }, { x: x1, y: a.top }, { x: x1, y: b.bottom }, { x: b.x, y: b.bottom }];
    const inner = [{ x: b.x, y: b.top }, { x: x0, y: b.top }, { x: x0, y: a.bottom }, { x: a.x, y: a.bottom }];
    ctx.beginPath();
    ctx.moveTo(outer[0].x, outer[0].y);
    for (const p of [...outer.slice(1), ...inner]) ctx.lineTo(p.x, p.y);
    ctx.closePath();
    ctx.fillStyle = SAMENESS.texture;
    ctx.fill();
    ctx.lineWidth = BAND_EDGE_W;
    for (const side of [outer, inner]) polyIn(ctx, side, BAND_INK);
    return;
  }
  const [before, after] = halvesOf(w.path);
  if (w.kind === 'link') { polyIn(ctx, before, w.ink.a); polyIn(ctx, after, w.ink.b); return; }
  ctx.lineWidth = STROKE_W;
  if (w.halves.halfA) polyIn(ctx, before, BAND_INK);
  if (w.halves.halfB) polyIn(ctx, after, BAND_INK);
}

/**
 * A path cut at the middle of its length into the stretch before and the
 * stretch after (`drawCrossing`), each running from the cut — the one before
 * back to the path's start — so each is stroked from the one point.
 * @param {Array<{x: number, y: number}>} path two points or more
 * @returns {[Array<{x: number, y: number}>, Array<{x: number, y: number}>]}
 */
export function halvesOf(path) {
  const lengths = path.slice(1).map((q, i) => Math.hypot(q.x - path[i].x, q.y - path[i].y));
  let left = lengths.reduce((n, l) => n + l, 0) / 2, i = 0;
  while (i < lengths.length - 1 && left > lengths[i]) { left -= lengths[i]; i++; }
  const p = path[i], q = path[i + 1], t = lengths[i] ? Math.min(1, left / lengths[i]) : 0;
  const m = { x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t };
  return [[m, ...path.slice(0, i + 1).reverse()], [m, ...path.slice(i + 1)]];
}

/** stroke a path of straight stretches in one ink, butt-capped, its dash begun at its start; its width and alpha the caller's */
function polyIn(/** @type {CanvasRenderingContext2D} */ ctx, /** @type {Array<{x: number, y: number}>} */ pts, /** @type {Ink} */ ink) {
  ctx.lineCap = 'butt'; ctx.strokeStyle = ink.hue; ctx.setLineDash(ink.dash);
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  for (const p of pts.slice(1)) ctx.lineTo(p.x, p.y);
  ctx.stroke();
  ctx.setLineDash([]);
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

/**
 * A change's words as stretches in their faces (`changeWords`): each pane's
 * characters there the reading face's, kept as written in what is spoken
 * (ST's `heard`), the rest the client's.
 * @param {Change} c
 * @param {Side} A pane A
 * @param {Side} B pane B
 * @param {(doc: string) => string} ownerOf
 * @returns {import('../strings.js').Run[]}
 */
export function changeRuns(c, A, B, ownerOf) {
  const chars = (/** @type {Side} */ P, /** @type {{from: number, to: number}} */ r) => (P.made && r.to > r.from ? copyText(P.made, { addr: P.made.addr, pos: r.from, width: r.to - r.from }, ownerOf) : '');
  const side = (/** @type {string} */ text) => (text ? tRuns('L.scene.change.text', { text }, { text: 'reading' }) : t('L.scene.change.none'));
  return tRuns('L.scene.change', { a: A.shows, one: side(chars(A, c.a)), b: B.shows, other: side(chars(B, c.b)) });
}

/** what a stroke stands for, counted (see the head) */
const countOf = (/** @type {Stroke} */ s) => plural(s.changes.length, 'L.scene.stroke.1', 'L.scene.stroke');

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
 * A stroke's name as stretches in their faces (`strokeWords`; `changeRuns`):
 * what it stands for counted, then each change, the characters kept as
 * written in what is spoken.
 * @param {Stroke} s
 * @param {Side} A pane A
 * @param {Side} B pane B
 * @param {(doc: string) => string} ownerOf
 * @returns {import('../strings.js').Run[]}
 */
export const strokeRuns = (s, A, B, ownerOf) => tRuns('L.scene.stroke.name', { count: countOf(s), changes: joinRuns(' · ', s.changes.map((c) => changeRuns(c, A, B, ownerOf))) });

/**
 * The strokes' buttons placed at the panes' scrolls now (see the head): one
 * native button for each stroke the last draw drew, centred on its point — in
 * the gutter side by side, on its half at pane A's edge stacked — keyed by
 * the stroke, named by what it stands for, its count
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
    if (b === held) FOCUS.land(E.paneB);
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
      const name = strokeRuns(s, A, B, LAYER.originOwner);
      if (btn.getAttribute('aria-label') !== heard(name)) btn.setAttribute('aria-label', heard(name));
      const n = s.changes.length > 1 ? numeral(s.changes.length) : '';
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
 * stands it, against pane B's facing edge — in the gap side by side, in the
 * column stacked — at the pane's visible top or bottom on the passage's
 * bearing, over the stub's triangle, its count shown where the shared
 * passages are two or more and its name ST's words; its first appearance in
 * the scene said in the status region (FP-36); hidden where every one stands
 * in view, the focus it held handed to pane B (FP-20). A returned stop stands
 * where what it stood for stands (`placeReturned`), named as its answer
 * tells, never hidden.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 */
function placeStop(E, S) {
  if (S.returned && S.returned.stop.kind === 'shared') { placeReturned(E, S, S.returned); return; }
  const pane = E.paneB, stop = E.stop, held = typeof document !== 'undefined' && document.activeElement === stop;
  const to = stopFor(S.shared, S.next, { top: pane.scrollTop, h: pane.clientHeight });
  S.at = to ? to.i : null;
  if (!to) {
    if (!stop.hidden) { stop.hidden = true; if (held) FOCUS.land(pane); }
    return;
  }
  const n = S.shared.length, id = n > 1 ? 'L.scene.shared' : 'L.scene.shared.1', vals = { D: S.b.shows, n: numeral(n) };
  const root = E.root.getBoundingClientRect(), r = pane.getBoundingClientRect(), top = r.top + pane.clientTop, stacked = S.fit.stacked;
  stop.setAttribute('aria-label', heard(t(id, vals)));
  stop.textContent = n > 1 ? numeral(n) : '';
  stop.style.left = (stacked ? r.right : r.left) - root.left - E.root.clientLeft + 'px';
  stop.style.top = (to.above ? top : top + pane.clientHeight) - root.top - E.root.clientTop + 'px';
  stop.style.transform = `translate(${stacked ? '0' : '-100%'}, ${to.above ? '0' : '-100%'})`;
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

// ---- the list of a draft's past states (B3-S7 THE LIST) ---------------------------------------------------------------

/** @type {HTMLElement | null} the list's element (`#scenepast`), made as a draft's history first stands; null until then */
let pastEl = null;
/** a row's height where the platform lays out no list (px): the room the column gives is counted in rows of it */
const ROW_PX = 18;
/** the acts the list's head holds on its one line, by their strings, in its order: its stop and its two steps (B3-S7 THE LIST; D5 K-102) */
const LIST_HEAD = Object.freeze(['B3.history.stop', 'B3.history.earlier-change', 'B3.history.next-change']);

/**
 * The width of the list's column at pane B's outer side (see the head), px:
 * as wide as its head needs to hold its stop and both step acts on one line
 * — their words a space apart in the list's type, the corner's (T-LAYER's
 * `cornerPx`), rounded up — with LIST_PAD on each side of them, its rule
 * (LIST_RULE) and a scrollbar `bar` px wide.
 * @param {number} bar the platform's scrollbar's width, px: 0 where it lays its scrollbars over what scrolls
 * @returns {number}
 */
export function listPx(bar) {
  return Math.ceil(LAYER.cornerPx(LIST_HEAD.map((id) => t(id)).join(' '))) + 2 * LIST_PAD + LIST_RULE + bar;
}

/**
 * The fields a hand is named by in the list and at a past state's corner,
 * each a stretch in its face (B3-S7 WHO; the past states survey's R6): the
 * writing key's device label as the page holds it (M-REC's `labelOf`) — the
 * person's own words — and its fingerprint's cue, the identifier's; a key of
 * the reader's own (M-REC's `ownKeys`) by its label alone, as their byline
 * names them (T-ARTICLE's `bylineOf`; FP-34); the cue alone where no label is
 * held; "unsigned" for a
 * keyless hand and for the board's own; "not recorded" where the board lost
 * the testimony; "signed" for a signed row, which names no key and is never
 * named lost — each the client's.
 * @param {import('../model/past.js').Hand} h
 * @returns {import('../strings.js').Run[]}
 */
export function handFields(h) {
  if (h.kind === 'key') {
    const fp = h.fingerprint || '', label = REC.labelOf(fp), cue = /** @type {import('../strings.js').Run} */ ({ text: fingerprintCue(fp), face: 'ident' });
    if (!label) return [cue];
    const named = /** @type {import('../strings.js').Run} */ ({ text: label, face: 'reading' });
    return REC.ownKeys().has(fp) ? [named] : [named, cue];
  }
  return [{ text: t(h.kind === 'lost' ? 'F.slot.not-recorded' : h.kind === 'signed' ? 'L.history.hand.signed' : 'F.slot.unsigned'), face: 'client' }];
}

/** the words a hand is named by (`handFields`): its fields, parted by the field joiner (ST's `fields`) */
export const handWords = (/** @type {import('../model/past.js').Hand} */ h) => fields(...handFields(h).map((r) => r.text));

/** each kind of change's words in the strings table (B3-S7 WHAT; M-PAST's `kindOf`): the op lost, "not recorded" */
const KIND_IDS = /** @type {Record<import('../model/past.js').Kind, string>} */ ({
  typed: 'B3.history.kind.typed', removed: 'B3.history.kind.removed', quoted: 'B3.history.kind.quoted', pasted: 'B3.history.kind.pasted',
  rearranged: 'L.history.kind.rearranged', linked: 'L.history.kind.linked', unlinked: 'L.history.kind.unlinked', started: 'L.history.kind.started',
  edits: 'B3.history.kind.edits', unknown: 'F.slot.not-recorded',
});

/**
 * What a row did, in its words (B3-S7 WHAT): a landmark named for what it made
 * — "version ⟨k⟩ of ⟨E⟩", "merged ⟨alternative⟩ with version ⟨k⟩", "the merge
 * undone", the withdrawal's words — else the kind its commits share.
 * @param {import('../model/past.js').Row} row
 * @returns {{id: string, text: string}}
 */
export function whatOf(row) {
  const m = row.landmark;
  if (m && m.kind === 'version') { const v = PAST.versionOf(m); if (v) return { id: 'B3.history.row.version', text: t('B3.history.row.version', { k: v.k, E: v.of }) }; }
  if (m && m.kind === 'merged') return { id: 'B3.history.row.merged', text: t('B3.history.row.merged', { alternative: m.sides[0] ?? '', k: (m.head && memberOf(m.head)) ?? '' }) };
  if (m && m.kind === 'merge-undone') return { id: 'B3.history.row.merge-undone', text: t('B3.history.row.merge-undone') };
  if (m && m.kind === 'withdrawn') return { id: 'B3.history.row.withdrawn', text: t('B3.history.row.withdrawn') };
  return { id: KIND_IDS[row.kind], text: t(KIND_IDS[row.kind]) };
}

/**
 * A row of the list as markup (B3-S7): a native button whose act reads its
 * row's last state into pane B (`rowAct`; D5 K-102), out of the Tab order as
 * made, the list standing its one stop (`standStops`) — its time of day, the
 * date its day's head names (U's `timeOf`, the reader's own zone), in its
 * slot, and what it did in a box of its own, parted by the field joiner,
 * which keeps its spaces in the row the style lays out; where the board lost
 * both its time and its op, "not recorded" said once for the two (FP-34); the
 * row standing for the state pane B shows marked so, its bar the style's; the
 * asked row saying how its state's read stands after its words, parted by the
 * field joiner (`AskedMark`; `askedHTML`); a row beneath the floor's line
 * opening nothing, standing in its place, focusable, marked inert and
 * described by the floor's words (`floorWords`; FP-41).
 * @param {import('../model/past.js').Row} row
 * @param {boolean} shown
 * @param {AskedMark | null} [mark] the asked row's mark (`askedOf`); null on every other row
 * @param {{id: string, text: string} | null} [below] the floor's words, where the row stands beneath its line; null on every other row
 */
function rowHTML(row, shown, mark = null, below = null) {
  const what = whatOf(row), lost = row.time == null && row.kind === 'unknown' && !row.landmark;
  const time = `<span class="pl-time">${esc(row.time == null ? t('F.slot.not-recorded') : timeOf(row.time))}</span>`;
  const words = lost ? time : `${time}<span class="pl-join">${esc(FIELD)}</span><span class="pl-what" data-string="${esc(what.id)}">${esc(what.text)}</span>`;
  const inert = below ? ` aria-disabled="true" data-inert="${esc(below.id)}" aria-description="${esc(heard(below.text))}"` : '';
  return `<button type="button" class="pl-row${mark ? ' ' + mark : ''}${below ? ' below' : ''}" data-row="${row.last}"${shown ? ' data-shown="1" aria-current="true"' : ''}${inert} tabindex="-1">${words}${mark ? askedHTML(mark) : ''}</button>`;
}

/** @typedef {'reading' | 'unread'} AskedMark how the asked state's read stands, as the list marks its row (`askedOf`): read again by the scene, or refused and not read again */

/** each asked mark's words and their class (B3-S7): "reading" while the scene reads the state again, "not read" where the line says its read stopped */
const ASKED_MARKS = /** @type {Record<AskedMark, {id: string, cls: string}>} */ ({ reading: { id: 'B3.history.reading', cls: 'pl-reading' }, unread: { id: 'L.history.not-read', cls: 'pl-unread' } });

/** a row's or a folded day's head's mark of the asked state's read (`askedOf`), after the field joiner */
const askedHTML = (/** @type {AskedMark} */ m) => `<span class="pl-join">${esc(FIELD)}</span><span class="${ASKED_MARKS[m].cls}" data-string="${ASKED_MARKS[m].id}">${esc(t(ASKED_MARKS[m].id))}</span>`;

/**
 * How the asked state's read stands, as the list marks the asked row (see
 * the head): "reading" while its read is out (`PastList.out`) or the scene
 * reads it again (`PastList.running`); "not read" where pane B's line says
 * its read stopped (`stopped`); none where pane B shows it, or where it was
 * refused as reclaimed, which the floor's line says.
 * @param {PastList} L
 * @returns {AskedMark | null}
 */
const askedOf = (L) => (reads(L) ? 'reading' : stopped(L) ? 'unread' : null);

/** is the state last asked being read (see the head): its read out for an ask (`askPast`), or the scene reading it again (`reissue`) — a read in flight, faced at the place */
const reads = (/** @type {PastList} */ L) => L.out != null || L.running;

/**
 * The list as markup (see the head; B3-S7; FP-34), line
 * by line as M-PAST stands it (`entriesOf`): where the draft holds words the
 * board has not kept, the top line saying so; each day's head — its date, or
 * "time not recorded" over rows with none — an act folding or opening the day
 * (`data-day`), saying whether it stands open, save a day of landmarks alone,
 * which never folds and is no act; a folded day's head marked folded and
 * naming the day's hands once each where they differ from the row above them,
 * and nothing else of it; each hand leading its run of rows; each row. The
 * state pane B shows is marked by its row, or by its folded day's head; the
 * asked row says how its state's read stands — "reading" while it is read,
 * "not read" where its read stopped (`askedOf`, `rowHTML`) — or its folded
 * day's head does; and where a read was refused at the board's floor, the
 * floor's line, a hairline across the column labelled with the floor's words
 * (`floorWords`), beneath the row whose state stood at the floor, or its
 * folded day's head (M-PAST's `floorLine`), each row below it standing in
 * its place, opening nothing (`rowHTML`).
 * @param {PastList} L
 * @returns {string}
 */
export function listHTML(L) {
  const marked = askedOf(L), shown = PAST.dayHolding(L.days, L.at), asking = marked ? PAST.dayHolding(L.days, L.asked) : null;
  const line = L.cut ? PAST.floorLine(L.rows, L.cut.at) : null, words = line ? floorWords(L) : null;
  const cutRow = line ? PAST.rowHolding(L.rows, line.cut) : null, cutDay = line ? PAST.dayHolding(L.days, line.cut) : null;
  const floor = words ? `<div class="pl-floor" data-string="${esc(words.id)}">${esc(words.text)}</div>` : '';
  let html = L.unkept ? `<div class="pl-now" data-string="L.history.unkept">${esc(t('L.history.unkept'))}</div>` : '';
  let open = false;
  for (const e of PAST.entriesOf(L.days, L.open)) {
    if (e.kind === 'day') {
      if (open) html += '</div>';
      const date = e.day.time == null ? t('L.history.time-unrecorded') : dayOf(e.day.time), mark = e.folded && shown === e.day ? ' data-shown="1"' : '';
      const named = e.folded && e.hands.length ? `<span class="pl-hands">${esc(e.hands.map(handWords).join(', '))}</span>` : '';
      const fold = e.folded ? `<span class="pl-fold" aria-hidden="true" data-string="L.history.folded">${esc(t('L.history.folded'))}</span>` : '';
      // a folded day stands for its rows that are no landmark: the asked row's mark and the floor mark at its head
      const hides = (/** @type {number} */ pos) => e.folded && !e.day.rows.some((r) => r.landmark && r.positions.includes(pos));
      const read = marked && asking === e.day && hides(L.asked) ? askedHTML(marked) : '';
      const head = e.day.landmarks ? `<div class="pl-head"${mark}><span class="pl-date">${esc(date)}</span>${read}</div>`
        : `<button type="button" class="pl-head" data-day="${esc(e.day.key)}" aria-expanded="${!e.folded}"${mark}>${fold}<span class="pl-date">${esc(date)}</span>${read}${named}</button>`;
      html += `<div class="pl-day" data-key="${esc(e.day.key)}">${head}${line && cutDay === e.day && hides(line.cut) ? floor : ''}`;
      open = true;
    } else if (e.kind === 'who') html += `<div class="pl-who">${esc(handWords(e.hand))}</div>`;
    else html += rowHTML(e.row, e.row.positions.includes(L.at), e.row.positions.includes(L.asked) ? marked : null, PAST.isBelow(line, e.row) ? words : null) + (e.row === cutRow ? floor : '');
  }
  return html + (open ? '</div>' : '');
}

/**
 * A past state's corner line (see the head; B3-S7): when the state pane B
 * shows stood — the time its row's last commit was made, as a sentence names
 * a time (ST's `stoodAt`), "not recorded" where the board lost it — whose hand
 * made it, its fields in their faces (`handFields`), the line saying why the
 * pane shows it where one stands (`pastWhyOf`), whether it is not its
 * minute's last and how many changes that minute holds as the rows read tell
 * (M-PAST's `notLastOf`), and, while the state last asked is read (`reads`),
 * when that state stood, in the title's form — "a time not recorded" where
 * its row holds none; why the links that stood on its words are not shown
 * where they are not (`PastList.links`); and its two one-state steps, each
 * inert at the end it cannot pass with its reason (`stepsOf`). Derived, never
 * kept.
 * @param {PastList} L
 * @returns {import('../text/article.js').PastLine}
 */
function pastLine(L) {
  const row = PAST.rowHolding(L.rows, L.at), asked = reads(L) ? PAST.rowHolding(L.rows, L.asked) : null;
  return {
    time: row && row.time != null ? stoodAt(row.time) : t('F.slot.not-recorded'), hand: row ? handFields(row.hand) : [{ text: t('F.slot.not-recorded'), face: 'client' }], why: pastWhyOf(L),
    notLast: PAST.notLastOf(L.rows, L.at, L.bottom),
    reading: reads(L) ? (asked && asked.time != null ? stoodAt(asked.time) : t('L.history.floor.untimed')) : null,
    links: L.links === 'read' ? null : L.links,
    steps: stepsOf(L),
  };
}

/**
 * The commit a one-state step counts from (see the head; B3-S7, P46, P73):
 * the state last asked while its read is out — where the person is going —
 * else the state pane B shows (FP-25, FP-23).
 * @param {PastList} L
 */
const stepBase = (L) => (reads(L) ? L.asked : L.at);

/**
 * Pane B's one-state steps as they stand (see the head; B3-S7; D5 K-102;
 * FP-41): "‹ earlier" inert at the floor's line, its reason the floor's words
 * (`floorWords`); at the oldest commit read where the rows read reach the
 * draft's first position, "this is the draft's first state"; where they end
 * at the feed's floor instead, below the first position its files hold, the
 * floor's words for that oldest state (`feedFloorWords`) — never the draft's
 * first state, which no row read tells; live where rows below are still to be
 * read, a press reading them first (`step`). "later ›" inert at the newest
 * kept state: "this is how the draft stands now", or, where the draft held
 * words the board had not kept as the history opened, that it is the newest
 * kept state and what was written since is not yet kept. Each counted from
 * where a step counts from (`stepBase`).
 * @param {PastList} L
 * @returns {{earlier: import('../text/article.js').StepAct, later: import('../text/article.js').StepAct}}
 */
function stepsOf(L) {
  const from = stepBase(L), line = L.cut ? PAST.floorLine(L.rows, L.cut.at) : null;
  /** @type {{id: string, text: string} | null} */
  let earlier = null;
  if (line && from <= line.cut) earlier = floorWords(L);
  else if (PAST.stepFrom(L.rows, from, -1) == null && L.bottom) earlier = L.from <= 0 ? { id: 'B3.history.first', text: sentence('B3.history.first') } : feedFloorWords(L);
  const later = PAST.stepFrom(L.rows, from, 1) == null ? (L.unkept ? { id: 'L.history.newest-kept', text: sentence('L.history.newest-kept') } : { id: 'B3.history.now', text: sentence('B3.history.now') }) : null;
  return { earlier: { inert: earlier && { id: earlier.id, text: asSentence(earlier) } }, later: { inert: later } };
}

/**
 * The floor's words (see the head; B3-S7; FP-34): where the floor's line
 * falls directly beneath the top row — no state before the newest readable —
 * and the feed's row at the floor a refusal named was read, that no earlier
 * state is readable on the board, which keeps states back to that row's day
 * (`L.history.floor`); everywhere else that the board keeps the draft's
 * history back to a time, earlier states not readable — that row's time of
 * day where it was read, else the time of the row whose state stood at the
 * floor, the row above the line, "a time not recorded" where that row holds
 * none (`B3.history.reclaimed`); none where no line stands.
 * @param {PastList} L
 * @returns {{id: string, text: string} | null}
 */
function floorWords(L) {
  const line = L.cut ? PAST.floorLine(L.rows, L.cut.at) : null;
  if (!L.cut || !line) return null;
  const row = PAST.rowHolding(L.rows, line.cut);
  if (row && row === L.rows[0] && L.cut.date != null) return { id: 'L.history.floor', text: t('L.history.floor', { board: boardName(), date: L.cut.date }) };
  const time = L.cut.time ?? (row && row.time != null ? timeOf(row.time) : t('L.history.floor.untimed'));
  return { id: 'B3.history.reclaimed', text: t('B3.history.reclaimed', { board: boardName(), time }) };
}

/**
 * The floor's words where the rows read end at the feed's floor, the first
 * position its files hold (see the head; M-PUMP's `HistoryRead.floor`): that
 * the board keeps the draft's history back to the time of the oldest row
 * read, earlier states not readable (`B3.history.reclaimed`) — never "this is
 * the draft's first state", which no row read tells.
 * @param {PastList} L
 * @returns {{id: string, text: string}}
 */
function feedFloorWords(L) {
  const oldest = L.rows[L.rows.length - 1];
  return { id: 'B3.history.reclaimed', text: t('B3.history.reclaimed', { board: boardName(), time: oldest && oldest.time != null ? timeOf(oldest.time) : t('L.history.floor.untimed') }) };
}

/**
 * Why pane B shows the state it shows (see the head; T-ARTICLE's `PastWhy`):
 * where it shows another than its act asked, a substitution, by the latest
 * refusal the asked state's reads met — while the scene reads that state
 * again (`PastList.running`), that its history is busy; reclaimed, in
 * O-FACES' words (`Faces.words`), naming the board and the date its floor
 * names (`PastList.floor`), else the time the state shown stood, "a time not
 * recorded" where its row holds none; any other, that the state asked could
 * not be read and why (`unreadOf`) — each with "read it again" beneath it
 * where it stands (`againOf`); else, where it shows the state asked, that
 * state the newest row's and the draft holding no words the board has not
 * kept, the words saying it is how the draft stands now; else none. Derived,
 * never kept: a row arriving above the state shown takes the last away.
 * @param {PastList} L
 * @returns {import('../text/article.js').PastWhy | null}
 */
function pastWhyOf(L) {
  if (L.met) {
    const a = againOf(L), again = a ? { again: a } : {};
    if (L.running) return { id: 'B3.history.busy', text: t('B3.history.busy'), substituted: true, ...again };
    if (L.met.name === 'history_reclaimed') {
      if (!faces) return null;
      const row = PAST.rowHolding(L.rows, L.at), w = faces.words(L.met, { time: row && row.time != null ? timeOf(row.time) : t('L.history.floor.untimed'), ...(L.floor != null ? { date: L.floor } : {}) });
      return { id: w.id, text: w.text, substituted: true, ...again };
    }
    const u = unreadOf(L);
    return u && { ...u, substituted: true, ...again };
  }
  const top = L.rows[0];
  return !L.unkept && !!top && L.at === top.last && L.asked === top.last ? { id: 'B3.history.now', text: t('B3.history.now'), substituted: false } : null;
}

/** the board as the status region names it (the ARIA mirror's board item), its ⟨board⟩ in a past state's line and its act's reason; '' where none is held */
const boardName = () => { const b = REC.board(); return b ? t('L.mirror.board.name', { node: '1', origin: b.origin }) : ''; };

/** does a refusal of the asked state's read say the reader may not read it — `withheld`, a session's ending among them, which reaches a read as its class changes (M-PUMP's `atClass`): "read it again" never stands beside it (`againOf`) */
const withholds = (/** @type {Refusal} */ r) => r.name === 'withheld';

/**
 * Does pane B's line say the asked state's read stopped (see the head;
 * `unreadOf`): refused by any refusal but reclaimed, and not read again by
 * the scene.
 * @param {PastList} L
 */
const stopped = (L) => !!L.met && !L.running && L.met.name !== 'history_reclaimed';

/**
 * The asked state's latest refusal taken by the list (see the head): why
 * pane B shows another state in its place (`PastList.met`), the date its
 * floor names (`PastList.floor`), whether the scene reads it again — while
 * the board classes it as retry (BM-HELD's `busy`) — and "read it again"
 * drawn where the line first stands saying the read stopped, beside any cause
 * but the reader's not being let read the draft (`PastList.again`, `withholds`);
 * once drawn it stands until pane B shows the asked state (`landPast`). Every
 * refusal the list takes is taken so.
 * @param {PastList} L
 * @param {Refusal} met
 * @param {string | null} floor
 */
function metBy(L, met, floor) {
  L.met = met; L.floor = floor; L.running = busy(met);
  if (stopped(L) && !withholds(met)) L.again = true;
}

/**
 * The line saying the asked state's read stopped (see the head;
 * `PastList.met`): "could not read it as it stood ⟨time⟩ — ⟨cause⟩", ⟨time⟩
 * the asked row's as a sentence names a time (ST's `stoodAt`), "at a time not
 * recorded" where its row holds none; the cause the one read cause of the
 * refusal met, the draft the document read (`Faces.cause`) — a refusal's code
 * in it set in the identifier's face. Each stretch in its face; none where the
 * faces are not handed in.
 * @param {PastList} L
 * @returns {{id: string, text: string, runs: import('../strings.js').Run[]} | null}
 */
function unreadOf(L) {
  if (!faces) return null;
  const r = /** @type {Refusal} */ (L.met), row = PAST.rowHolding(L.rows, L.asked);
  const time = row && row.time != null ? stoodAt(row.time) : t('L.time.at', { time: t('L.history.floor.untimed') });
  const runs = tRuns('L.history.unread', { time, cause: faces.cause(r, L.draft).runs });
  return { id: 'L.history.unread', text: runsText(runs), runs };
}

/**
 * "read it again" beneath pane B's line (see the head; T-ARTICLE's
 * `AgainAct`): where it was drawn (`PastList.again`) and the line's cause is
 * not the reader's not being let read the draft (`withholds`); inert, its
 * reason said at every press (FP-41), while the scene reads the asked state
 * again itself (`PastList.running`) — that the board's history is busy and
 * the scene is trying again — or while the board is not answering, by the
 * shell's own verdict (M-REC's `daemon`), in the words the kept line's second
 * act stands inert by (T-LAYER's `historyAct`); null else.
 * @param {PastList} L
 * @returns {import('../text/article.js').AgainAct | null}
 */
function againOf(L) {
  if (!L.again || !L.met || withholds(L.met)) return null;
  if (L.running) return { inert: { id: 'B3.history.busy', text: sentence('B3.history.busy') } };
  if (REC.daemon() === 'unreachable') return { inert: { id: 'L.history.unanswered', text: sentence('L.history.unanswered', { board: boardName() }) } };
  return { inert: null };
}

/** the draft whose history the scene stands on (`Held.past`); null where it stands on none (N-GO's `history`) */
export const pastOf = () => (scene && scene.past ? scene.past.draft : null);

/** the focus put in the history pane, pane B: the current text's own "show its history" in its own history scene */
export function focusPast() { const E = els; if (E && scene && scene.past) FOCUS.land(E.paneB); }

/**
 * The one line's second address while a draft's history stands (B3-S7;
 * C-363): "as it stood ⟨time⟩", the state pane B shows; null where none
 * stands.
 * @returns {{id: string, text: string} | null}
 */
export function pastAsOf() {
  const L = scene && scene.past;
  if (!L) return null;
  return { id: 'B3.history.as-of', text: t('B3.history.as-of', { time: pastLine(L).time }) };
}

/**
 * The list a draft's history opens with (`Held.past`), over the rows the
 * state shown was read over, where a return read more (`PastGot.held`): its
 * rows (M-PAST's `rowsOf`) and days (`daysOf`), no day open until it first
 * stands (`standList`); the state pane B shows as its reads found it
 * (`PastGot`), the refusal they met taken as every one is (`metBy`) —
 * running where the board classes it as retry, which the scene reissues as it
 * stands (`pastStood`).
 * @param {PastHeld} h
 * @param {PastGot} got
 * @returns {PastList}
 */
function pastListOf(h, got) {
  const on = got.held ?? h, rows = PAST.rowsOf(on.entries);
  /** @type {PastList} */
  const L = {
    draft: on.draft, entries: [...on.entries], rows, days: PAST.daysOf(rows), open: new Set(), opened: false, at: got.shown, asked: on.asked, out: null, fell: false, cut: null,
    links: got.record.linksRead ? 'read' : 'arriving', met: null, floor: null, running: false, again: false,
    head: on.head, unkept: on.unkept, said: null, from: on.from, bottom: on.bottom, reading: false, figures: { ...on.figures, stateMs: got.ms, at: got.state.at, older: null }, html: '',
  };
  if (got.met) {
    metBy(L, got.met, got.floor);
    L.fell = true;
    if (got.met.name === 'history_reclaimed') placeCut(L, cutOf(L, got.met, on.asked, got.floor, got.floorTime ?? null));
  }
  return L;
}

/**
 * Where a refusal at the board's floor stands the list's floor line (see the
 * head; B3-S7): the state asked refused where it last stood too, or never
 * asked there for the floor lying past it, directly above the row asked at
 * the least — that row and every older one below it, the top row standing
 * above it whatever it holds — and at the floor the refusal names where that
 * lies higher; with the day and the time of the feed's row at a floor named,
 * where that row was read (`floorOf`).
 * @param {PastList} L
 * @param {Refusal} r a reclaimed refusal
 * @param {number} asked the commit whose state was refused
 * @param {string | null} date the day of the feed's row at the floor named, where read
 * @param {string | null} time its time of day, where read
 * @returns {Cut}
 */
function cutOf(L, r, asked, date, time) {
  const named = floorNamed(r), row = PAST.rowHolding(L.rows, asked), i = row ? L.rows.indexOf(row) : -1;
  const above = i > 0 ? L.rows[i - 1].first : row ? row.last : asked;
  return named != null ? { at: Math.max(named, above), date, time } : { at: above, date: null, time: null };
}

/** the list's floor line moved to a cut where it rises — a later refusal never lowers it (see the head; B3-S7; M-PAST's `risen`): whether it moved */
function placeCut(/** @type {PastList} */ L, /** @type {Cut} */ cut) {
  const at = PAST.risen(L.cut ? L.cut.at : null, cut.at);
  if (L.cut && at === L.cut.at) return false;
  L.cut = at === cut.at ? cut : { ...cut, at };
  return true;
}

/** the longest pause between two reissues of a past state the board was busy on, ms (`reissueGap`; unmeasured) */
export const PAST_RETRY_MAX_MS = 2000;

/**
 * The pause before a reissue of a past state the board was busy on (see the
 * head), ms: M-PUMP's RETRY_MS before the first, each twice the one before,
 * PAST_RETRY_MAX_MS at the most.
 * @param {number} k the reissues made before it
 * @returns {number}
 */
export const reissueGap = (k) => Math.min(PUMP.RETRY_MS * 2 ** k, PAST_RETRY_MAX_MS);

/** the pause before a reissue let go unrun (`reissuing`): no reissue outlives the scene it was made for */
function stopReissue() { if (reissuing) { clearTimeout(reissuing); reissuing = 0; } }

/**
 * A draft's history standing (`open`, `reopen`; see the head): its line said
 * in the status region — after `lead`, where the scene reopened says its pair,
 * in one message (`sayLine`) — the asked state reissued where the board
 * was busy on it (`reissue`), and the links that stood on the state shown read,
 * a rest (`restLinks`).
 * @param {Scene} S
 * @param {string | null} lead words said before the line; none where null
 */
function pastStood(S, lead) {
  sayLine(S, lead);
  void reissue(S);
  void restLinks(S);
}

/**
 * A past state's line as the status region says it (see the head): a
 * substitution's words, each stretch in its face — while the scene reissues
 * the state its act asked, with the in-flight clause after them, as fields
 * (`pastLine`); null where pane B shows the state asked.
 * @param {PastList} L
 * @returns {import('../strings.js').Run[] | null}
 */
function lineWords(L) {
  const p = pastLine(L);
  return p.why && p.why.substituted ? joinRuns(FIELD, [p.why.runs ?? p.why.text, p.reading != null ? inFlightWords(p.reading) : '']) : null;
}

/**
 * A past state's line said in the status region (see the head; FP-36): its
 * words (`lineWords`) once as they first stand, and again only where a later
 * answer changed them (`PastList.said`), after `lead` in one message where it
 * is given; `lead` alone where nothing is to be said of the line.
 * @param {Scene} S
 * @param {string | null} [lead]
 */
function sayLine(S, lead = null) {
  const L = S.past, words = L ? lineWords(L) : null;
  const line = L && words && runsText(words) !== L.said ? words : null;
  if (L && line) L.said = runsText(line);
  if (line || lead) FOCUS.say(lead && line ? joinRuns(FIELD, [lead, line]) : /** @type {import('../strings.js').Words} */ (lead || line));
}

/**
 * The asked state reissued while the board classes its last answer as retry
 * (see the head; BM-HELD's `busy`): a whole read at a time of the commit
 * asked (`readPast`), after
 * a pause that doubles to PAST_RETRY_MAX_MS (`reissueGap`), until it lands —
 * pane B set again to it in one step (`landPast`) — or a refusal of another
 * class ends it, the line stating that answer alone, a reclaimed one with
 * the date its floor names once that is read (`floorOf`), each taken as every
 * refusal is (`metBy`), a reclaimed one standing the floor's line too
 * (`placeCut`) — save where the state asked was a step's or a row's, which
 * pane B never stood in the place of: that answer stands the floor's line
 * alone, pane B and its line as they stood (`refusedAtFloor`); each answer's
 * words written in its place (`lineMoved`). It ends with nothing more where
 * the scene closed or reopened, or another state was asked, meanwhile.
 * @param {Scene} S
 * @returns {Promise<void>}
 */
async function reissue(S) {
  const L = S.past;
  if (!L || !busy(L.met)) return;
  const asked = L.asked;
  const stands = () => scene === S && S.past === L && L.asked === asked;
  if (!PAST.rowHolding(L.rows, asked)) { L.running = false; lineMoved(S); return; }
  for (let k = 0; stands() && busy(L.met); k++) {
    await new Promise((r) => { reissuing = Number(setTimeout(r, reissueGap(k))); });
    reissuing = 0;
    if (!stands()) return;
    const t0 = performance.now(), got = await readPast(L, asked, 1);
    if (!stands()) return;
    if ('refused' in got) {
      const floor = busy(got.refused) ? null : await floorOf(got.refused);
      if (!stands()) return;
      if (got.refused.name === 'history_reclaimed' && !L.fell) { await refusedAtFloor(S, got.refused, asked, floor, false); return; }
      if (got.refused.name === 'history_reclaimed') placeCut(L, cutOf(L, got.refused, asked, floor && floor.date, floor && floor.time));
      metBy(L, got.refused, floor && floor.date); lineMoved(S); continue;
    }
    landPast(S, stateGot(L, got, asked, t0));
  }
}

/**
 * A commit's state read for pane B (see the head): the newest kept state —
 * the top row's last commit — read plainly, as the plane reads the draft and
 * never through the board's history (M-PUMP's `stateNow`); any other read at
 * its position, refused as reclaimed asked again where it last stood
 * (`askState`).
 * @param {PastList} L
 * @param {number} at the commit
 * @param {number} [attempts] how many whole reads at most while the board's reconstructions are busy (M-PUMP's `stateAt`)
 * @returns {Promise<import('../model/pump.js').State | {refused: Refusal}>}
 */
const readPast = (L, at, attempts) => (L.rows[0] && at === L.rows[0].last ? PUMP.stateNow(L.draft) : askState(L.draft, L.rows, at, L.head, attempts));

/**
 * A state of the draft asked for pane B (see the head; B3-S7; D5 K-102; FP-23,
 * FP-41) — a step's, a row's act's, "read it again"'s: the one entry each is
 * asked, coalesced and landed by. The commit asked becomes the state last
 * asked (`PastList.asked`): asked anew, any reissue of the state asked before
 * it ends, with the line that answered that state. Where its read is out, the
 * request moves alone — a held key's repeats reading nothing of their own —
 * and that read, as it answers, is landed where it stands with no rest, then
 * the state asked meanwhile read: one read at a time, of the latest state
 * asked. A state beneath the floor's line is never read: refused there at
 * once (`refusedAtFloor`) — save at "read it again", which asks it as a
 * return does. The state shown asked again with no read out reads
 * nothing and says nothing, save at "read it again". While the read is out
 * the asked row says "reading" and pane B's corner the in-flight clause,
 * pane B keeping the state it shows (`reads`; `lineMoved`). The state lands
 * in place, with no flight, pane B set again in one step (`landPast`), a rest
 * where nothing later was asked meanwhile. A refusal: at the floor, its line
 * placed and pane B as it stood (`refusedAtFloor`) — save where pane B stands
 * in the place of the state the act asked, whose line the reclaimed answer
 * becomes as the scene's reissue's does (`PastList.fell`); else taken as every
 * refusal is (`metBy`), the line written in its place (`lineMoved`) and the
 * scene reissuing a retry-class answer (`reissue`) — "read it again"'s
 * answer said in the status region whether or not it changed the line.
 * Nothing is taken where the scene closed or reopened meanwhile. An act in the
 * scene (`actedIn`).
 * @param {Scene} S
 * @param {number} at the commit asked
 * @param {{again?: boolean}} [how] `again` the press of "read it again", whose answer is said whatever it is
 * @returns {Promise<void>}
 */
async function askPast(S, at, how = {}) {
  const L = S.past;
  if (!L) return;
  actedIn(S);
  if (at !== L.asked) {
    // a state asked anew: the reissue of the one asked before it, and the line that answered it, end
    L.asked = at; L.fell = false; L.met = null; L.floor = null; L.running = false; L.again = false;
    stopReissue();
  } else if (L.out == null && !how.again && L.asked === L.at && !L.running) return;
  const stands = () => scene === S && S.past === L;
  if (L.out != null) { lineMoved(S); return; }
  while (stands()) {
    const want = L.asked, line = L.cut ? PAST.floorLine(L.rows, L.cut.at) : null;
    if (line && want < line.cut && !how.again) { await refusedAtFloor(S, null, want, null, true); return; }
    const t0 = performance.now();
    L.out = want;
    lineMoved(S);
    /** @type {Awaited<ReturnType<typeof readPast>>} */
    let got;
    try { got = await readPast(L, want); } finally { if (stands() && L.out === want) L.out = null; }
    if (!stands()) return;
    if (L.asked !== want) {
      // passed while its read was out: landed where it stands, no rest; a refusal at the floor stands the line still
      if (!('refused' in got)) landPast(S, stateGot(L, got, want, t0), false);
      else if (got.refused.name === 'history_reclaimed') { const f = await floorOf(got.refused); if (!stands()) return; if (placeCut(L, cutOf(L, got.refused, want, f && f.date, f && f.time))) lineMoved(S); }
      continue;
    }
    if (!('refused' in got)) { landPast(S, stateGot(L, got, want, t0)); return; }
    const floor = busy(got.refused) ? null : await floorOf(got.refused);
    if (!stands() || L.asked !== want) continue;
    if (got.refused.name === 'history_reclaimed' && !L.fell) { await refusedAtFloor(S, got.refused, want, floor, true); return; }
    // pane B standing in the place of the act's state: a reclaimed answer its line, and the floor's line placed
    if (got.refused.name === 'history_reclaimed') placeCut(L, cutOf(L, got.refused, want, floor && floor.date, floor && floor.time));
    metBy(L, got.refused, floor && floor.date);
    const words = how.again ? lineWords(L) : null;
    if (words) L.said = runsText(words);
    lineMoved(S);
    if (words) FOCUS.say(words, false, true);
    if (L.running) void reissue(S);
    return;
  }
}

/**
 * A state asked for pane B refused at the board's floor (see the head; B3-S7;
 * FP-41): the floor's line placed where the refusal stands it, rising only
 * (`cutOf`, `placeCut`) — a state already beneath it refused with no read —
 * pane B, its corner's line, its name and its description as they stood,
 * nothing standing in for the state; the state last asked the one pane B
 * shows again, so the next step counts from it; the list and the corner
 * written again, and the floor's words said once in the status region,
 * again where it holds them (`said`).
 * @param {Scene} S
 * @param {Refusal | null} r the reclaimed refusal; null where the state stands beneath the line already
 * @param {number} asked the commit refused
 * @param {{date: string, time: string} | null} floor the feed's row at the floor the refusal names, where read (`floorOf`)
 * @param {boolean} said the floor's words are said
 * @returns {Promise<void>}
 */
async function refusedAtFloor(S, r, asked, floor, said) {
  const L = S.past;
  if (!L) return;
  if (r) placeCut(L, cutOf(L, r, asked, floor && floor.date, floor && floor.time));
  L.asked = L.at; L.out = null; L.running = false;
  if (!L.fell) { L.met = null; L.floor = null; L.again = false; }
  lineMoved(S);
  const words = floorWords(L);
  if (said && words) FOCUS.say(asSentence(words), false, true);
}

/**
 * A one-state step of pane B (see the head; B3-S7; D5 K-102; FP-41): the
 * commit before (`dir` -1, "‹ earlier") or after (`dir` 1, "later ›") the one
 * a step counts from (`stepBase`) asked (`askPast`); past the oldest commit
 * read while rows below are still to be read, those read first and the step
 * taken over them; inert at the end it cannot pass, its reason said at every
 * press, again where the status region holds those words (`stepsOf`). An act
 * in the scene (`actedIn`).
 * @param {-1 | 1} dir
 * @returns {Promise<boolean>} the scene stands on a draft's history
 */
export async function step(dir) {
  const S = scene, L = S && S.past;
  if (!S || !L) return false;
  actedIn(S);
  const way = dir < 0 ? 'earlier' : 'later', inert = stepsOf(L)[way].inert;
  if (inert) { FOCUS.say(inert.text, false, true); return true; }
  let to = PAST.stepFrom(L.rows, stepBase(L), dir);
  if (to == null && dir < 0 && !L.bottom) {
    // rows below the read's reach read first, the step taken over them
    for (let k = 0; k < 500 && L.reading; k++) await new Promise((res) => setTimeout(res, 20));
    if (scene !== S || S.past !== L) return true;
    await readOlder(S);
    if (scene !== S || S.past !== L) return true;
    to = PAST.stepFrom(L.rows, stepBase(L), dir);
    if (to == null) { const now = stepsOf(L)[way].inert; if (now) FOCUS.say(now.text, false, true); lineMoved(S); return true; }
  }
  if (to != null) void askPast(S, to);
  return true;
}

/**
 * A row's act (see the head; B3-S7; D5 K-56, K-102): its last state asked for
 * pane B (`askPast`) — a press while a read is out moving the request; a row
 * beneath the floor's line opening nothing, its reason, the floor's words,
 * said at every press (FP-41). An act in the scene (`actedIn`).
 * @param {number} last the row's last commit (`Row.last`)
 */
export function rowAct(last) {
  const S = scene, L = S && S.past;
  if (!S || !L) return;
  const row = L.rows.find((r) => r.last === last);
  if (!row) return;
  const line = L.cut ? PAST.floorLine(L.rows, L.cut.at) : null;
  if (PAST.isBelow(line, row)) { actedIn(S); const w = floorWords(L); if (w) FOCUS.say(asSentence(w), false, true); return; }
  void askPast(S, row.last);
}

/** does the platform's focus stand in the list of a draft's past states (`listKey`) */
export const inList = () => { const at = typeof document !== 'undefined' ? document.activeElement : null; return !!pastEl && !!scene && !!scene.past && !!at && pastEl.contains(at); };

/**
 * The list's ↓ and ↑ (see the head; D5 K-102, K-56): the focus moved to the
 * list's next or previous stop in its order — a day's head and a row alike —
 * where it stands in the list; false where it stands outside the list, or
 * the scene is no draft's history.
 * @param {-1 | 1} dir 1 down the list, -1 up it
 * @returns {boolean}
 */
export function listKey(dir) {
  const el = pastEl, at = typeof document !== 'undefined' ? document.activeElement : null;
  if (!el || !at || !inList()) return false;
  const stops = /** @type {HTMLElement[]} */ ([...el.querySelectorAll('button')]), k = stops.indexOf(/** @type {HTMLElement} */ (at));
  const to = stops[k + dir];
  if (to) FOCUS.land(to);
  return true;
}

/**
 * The links that stood on the state pane B shows, read once it rests there
 * (see the head; B3-S7; D5 K-102): one `find_links_v` at the position its
 * text was read at (M-PUMP's `linksAt`), its corner saying they arrive
 * meanwhile; answered, pane B set again in place on its record with them
 * (M-DERIVE's `withLinks`; `setPanes`), its title's name kept — the corner's
 * clause and the region's description gone, the counts the answer's; past the
 * bound, its corner saying they are not shown because reading them failed,
 * its count places hollow still. Nothing taken where pane B was set from
 * another record, or the scene closed or reopened, meanwhile. The newest kept
 * state's links are the model's, never read here (`newestLinks`).
 * @param {Scene} S
 * @returns {Promise<void>}
 */
async function restLinks(S) {
  const L = S.past, d = S.b.d;
  if (!L || d.linksRead || (L.rows[0] && L.at === L.rows[0].last)) return;
  L.links = 'arriving';
  const out = await PUMP.linksAt(L.draft, d.readAt ?? 0, d.extent ?? 0);
  if (scene !== S || S.past !== L || S.b.d !== d) return;
  if ('refused' in out) { L.links = 'failed'; lineMoved(S); return; }
  L.links = 'read';
  const P = S.b;
  setPanes(S, [{ side: 'b', next: { d: withLinks(d, out.links), kind: P.kind, src: P.src, names: P.names, shows: P.shows, k: P.k, n: P.n, read: P.read, lacks: P.lacks, hold: null }, same: true }], null);
  lineMoved(S);
}

/**
 * The newest kept state's links, the model's record's, taken once it holds
 * them read (see the head; `newestLinked`): pane B set again in place with
 * them, its clause gone. The app's loop asks it on each dirty frame while the
 * scene stands (`markKept`); nothing where pane B shows another state or its
 * links stand read.
 * @param {Scene} S
 */
function newestLinks(S) {
  const L = S.past, d = S.b.d;
  if (!L || L.links !== 'arriving' || !L.rows[0] || L.at !== L.rows[0].last || d.linksRead || !REC.has(L.draft) || !REC.doc(L.draft).linksRead) return;
  L.links = 'read';
  const P = S.b;
  setPanes(S, [{ side: 'b', next: { d: newestLinked(L.draft, d), kind: P.kind, src: P.src, names: P.names, shows: P.shows, k: P.k, n: P.n, read: P.read, lacks: P.lacks, hold: null }, same: true }], null);
  lineMoved(S);
}

/**
 * The asked state as the list's reads found it, for pane B (`PastGot`): its
 * record derived at the position read (M-DERIVE's `recordAt`), its metadata
 * the model's — the newest kept state's with the model's links where they are
 * read (`newestLinked`) — standing for the commit whose state it is.
 * @param {PastList} L
 * @param {import('../model/pump.js').State} got
 * @param {number} shown the commit asked
 * @param {number} t0 when its reads began, by the platform's clock
 * @returns {PastGot}
 */
const stateGot = (L, got, shown, t0) => {
  const record = { ...recordAt(L.draft, got.runs, got.at, { image: got.image }), meta: REC.has(L.draft) ? REC.doc(L.draft).meta : null };
  return { record: L.rows[0] && shown === L.rows[0].last ? newestLinked(L.draft, record) : record, state: got, shown, met: null, floor: null, ms: performance.now() - t0 };
};

/**
 * The line moved where pane B shows it (see the head): pane B's corner
 * written again (`writeCorner`), the heads' band set again where its rows
 * changed (`rebanded`), its region described anew (`namePane`), the list
 * written again — the asked row's "reading", the floor mark — the rows in
 * view held where they stand (`writeList`), and the line said where its words
 * changed (`sayLine`).
 * @param {Scene} S
 */
function lineMoved(S) {
  const E = els;
  if (!E || scene !== S) return;
  writeCorner(E, S.b);
  rebanded(E, S);
  namePane(E, S, S.b);
  writeList(E, S, true);
  sayLine(S);
}

/**
 * A state landed in pane B (`askPast`, `reissue`; see the head): in place, with
 * no flight — pane B set again to it in one step (`setPanes`; FP-23), the
 * passage the step carries — pane B's selection, else the passage its last
 * step carried (`Pane.landed`) — kept on its line where the state holds its
 * bytes and the pane's landing from then on, else what stood at its place
 * kept on screen by its bytes' identity where the state holds it, pane B's
 * selection following its words, the runs it shares with pane A read off the two records' images
 * (`sharedBetween`) — the list marking its row, its day opened and its row
 * brought into view in the list where it stands in its column, no other day
 * opened (`showRow`), the line,
 * the in-flight clause and "read it again" gone; at a rest — nothing later
 * asked while it was read — the landing said once in the status region in
 * the words pane B's title names its state by (T-ARTICLE's `cornerTitle`,
 * `titleRuns`), what the selection's following says after it in the same
 * message, and the links that stood on it read (`restLinks`); else its
 * links not read, the selection's following alone said.
 * @param {Scene} S
 * @param {PastGot} got
 * @param {boolean} [rest] it rests there: nothing later was asked while it was read
 */
function landPast(S, got, rest = true) {
  const L = S.past, P = S.b;
  if (!L || !els) return;
  const live = P.el ? SEL.selected('b') : null, carried = live ? idsIn(P, live.pos, live.width) : P.landed ?? [];
  const from = carried.length ? REC.placedIn(imageOf(P), carried) : [], to = carried.length ? REC.placedIn(got.record.image, carried) : [];
  L.at = got.shown; L.met = got.met; L.floor = got.floor; L.running = false; L.again = false; L.fell = !!got.met;
  L.links = got.record.linksRead ? 'read' : rest ? 'arriving' : 'unread';
  L.figures = { ...L.figures, stateMs: got.ms, at: got.state.at };
  const day = PAST.dayHolding(L.days, L.at);
  if (day) L.open.add(day.key);
  const hold = from.length && to.length ? { from: from[0].pos, to: to[0].pos } : null;
  const said = setPanes(S, [{ side: 'b', next: { d: got.record, kind: P.kind, src: P.src, names: P.names, shows: P.shows, k: P.k, n: P.n, read: P.read, lacks: P.lacks, hold } }], sharedBetween(S.a, { src: P.src, d: got.record }), { named: rest });
  if (carried.length) P.landed = carried;
  showRow(S);
  const title = rest ? cornerTitle(paneCorner(S.b).view) : null;
  if (title || said) FOCUS.say(joinRuns(FIELD, [title ? titleRuns(title) : '', said ?? '']));
  if (rest) void restLinks(S);
}

/**
 * The row of the state pane B shows brought into view in the list, the least
 * scroll that stands it there, below the day's head held at its top — the
 * focus where it stands (see the head; FP-36) — where the list stands in its
 * own column; after pane B's text, where pane B's own scroll holds it, nothing
 * scrolls, so pane B keeps on screen what stood at its place (`landPast`),
 * the row's day opened. Nothing where the platform lays out no list.
 * @param {Scene} S
 */
function showRow(S) {
  const el = pastEl;
  if (!el || !S.past || !listBeside(S.fit)) return;
  const row = /** @type {HTMLElement | null} */ (el.querySelector('[data-shown]'));
  if (row && typeof row.scrollIntoView === 'function') row.scrollIntoView({ block: 'nearest' });
}

/**
 * A press of "read it again" beneath pane B's line (see the head; B3-S7;
 * FP-41): where it stands inert, its reason said at every press, again where
 * the status region holds those words already; else the asked state asked
 * again through the one entry every state is asked by (`askPast`), its whole
 * reads while the board's reconstructions are busy among them — one read at a
 * time, a press while one is out answered by that read's answer — and its
 * answer said in the status region whether or not it changes the line. Nothing
 * is asked where pane B shows no past state or no act stands beneath its line.
 * An act in the scene (`actedIn`).
 * @param {'a' | 'b'} side
 * @returns {Promise<void>}
 */
async function readAgain(side) {
  const S = scene, L = S && S.past;
  if (!S || !L || side !== 'b' || !pastShown(S.b)) return;
  actedIn(S);
  const a = againOf(L);
  if (!a) return;
  if (a.inert) { FOCUS.say(a.inert.text, false, true); return; }
  if (L.out != null || !PAST.rowHolding(L.rows, L.asked)) return;
  await askPast(S, L.asked, { again: true });
}

/** does the list stand in its own column at pane B's outer side (`PaneFit.outer`; see the head) — else after pane B's text */
const listBeside = (/** @type {PaneFit} */ F) => F.outer > 0;

/**
 * The list stood in the scene (see the head): its element made the first
 * time, an act on a day's head folding or opening that day (`foldDay`); in
 * its column at pane B's outer side where the fit stands one (`listBeside`)
 * — after pane B in the page's order, the style standing it there — else
 * pane B's last item, after its text; its rows' time slot as wide as the
 * widest time of day in its type (T-LAYER's `cornerPx`; `--pl-time`); written
 * (`writeList`) and, the first time it stands, the days open on opening set
 * from the rows the room it is given holds (M-PAST's `openOnOpening`); the
 * rows below the read's reach then read (`readOlder`). Nothing where the
 * scene is no draft's history.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 */
function standList(E, S) {
  const L = S.past;
  if (!L) return;
  if (!pastEl) {
    const el = document.createElement('div');
    el.id = 'scenepast';
    el.addEventListener('click', (ev) => {
      const tg = /** @type {HTMLElement} */ (ev.target), h = /** @type {HTMLElement | null} */ (tg.closest('button[data-day]')), r = /** @type {HTMLElement | null} */ (tg.closest('button.pl-row'));
      if (h && h.dataset.day) foldDay(h.dataset.day); else if (r && r.dataset.row) rowAct(Number(r.dataset.row));
    });
    // the list one stop of the scene's ring: its stop the act the focus stands on (`standStops`); the focus in it pane B's,
    // whose selection is then the platform's live one (O-SELECTION's `focusIn`; Q4)
    el.addEventListener('focusin', (ev) => { standStops(el, /** @type {Element | null} */ (ev.target)); if (scene) SEL.focusIn('b'); });
    pastEl = el;
  }
  const el = pastEl, beside = listBeside(S.fit);
  el.className = 'pastlist ' + (beside ? 'beside' : 'after');
  el.style.setProperty('--pl-time', LAYER.cornerPx(timeOf(0)) + 'px');
  // moved only where it stands elsewhere, so a setting of a pane leaves its rows where they are scrolled
  if (beside) { if (E.paneB.nextElementSibling !== el) E.paneB.after(el); } else if (el.parentElement !== E.paneB || E.paneB.lastElementChild !== el) E.paneB.append(el);
  E.paneB.classList.toggle('past-after', !beside);
  placeList(E, S);
  if (!L.opened) {
    const rowPx = typeof getComputedStyle === 'function' ? parseFloat(getComputedStyle(el).lineHeight) || ROW_PX : ROW_PX;
    const room = Math.max(1, Math.floor((beside ? el.clientHeight : E.paneB.clientHeight) / rowPx) - 1);
    L.open = PAST.openOnOpening(L.days, L.at, room);
    L.opened = true;
  }
  writeList(E, S, false);
  void readOlder(S);
}

/**
 * The list written again from its state (see the head), where its markup
 * reads other than as last written: the rows in view held still — the first
 * row or head standing in view kept at the height it stood, so rows that
 * arrive above it move it nowhere (`keep`).
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 * @param {boolean} keep the rows in view are held where they stand
 */
function writeList(E, S, keep) {
  const L = S.past, el = pastEl;
  if (!L || !el) return;
  const html = listHTML(L);
  if (html === L.html) return;
  const box = listBeside(S.fit) ? el : E.paneB;
  /** the first row or head standing in view, by its key, and its top on screen */
  const at = typeof document !== 'undefined' ? document.activeElement : null;
  // the focused row or head held still where the focus stands in the list, else the first standing in view
  const held = keep ? (at && at !== el && el.contains(at) && typeof at.getBoundingClientRect === 'function' ? keyOfStop(/** @type {HTMLElement} */ (at)) : inViewIn(el, box)) : null;
  FOCUS.keep(el, (x) => { const d = /** @type {HTMLElement} */ (x).dataset; return d && d.day ? 'day:' + d.day : d && d.row ? 'row:' + d.row : null; }, () => { el.innerHTML = html; });
  L.html = html;
  standStops(el, typeof document !== 'undefined' ? document.activeElement : null);
  if (!held) return;
  const now = /** @type {HTMLElement | null} */ (el.querySelector(held.sel));
  if (now) box.scrollTop += now.getBoundingClientRect().top - held.top;
}

/** a row or a day's head of the list by its selector, and its top on screen: what a writing holds still where the focus stands on it; null for any other element */
function keyOfStop(/** @type {HTMLElement} */ x) {
  const d = x.dataset;
  const sel = x.classList.contains('pl-row') && d.row ? `.pl-row[data-row="${d.row}"]` : x.classList.contains('pl-head') && d.day ? `.pl-head[data-day="${d.day}"]` : null;
  return sel ? { sel, top: x.getBoundingClientRect().top } : null;
}

/**
 * The list one stop of the scene's ring (see the head; D5 K-61, K-102): its
 * acts — the days' heads and the rows — out of the Tab order but one, the act
 * the focus stands on, else the row of the state shown, else its folded day's
 * head, else the first; the list's ↓ and ↑ move along them (`listKey`).
 * Nothing where the platform lays out no list.
 * @param {HTMLElement} el the list's element
 * @param {Element | null} at the element the focus stands on
 */
function standStops(el, at) {
  if (typeof el.querySelectorAll !== 'function') return;
  const acts = /** @type {HTMLElement[]} */ ([...el.querySelectorAll('button')]);
  if (!acts.length) return;
  const stop = acts.find((b) => b === at) || acts.find((b) => b.hasAttribute('data-shown')) || acts[0];
  for (const b of acts) b.tabIndex = b === stop ? 0 : -1;
}

/** the first row or day's head of the list standing in view in the box that scrolls it: its selector and its top on screen; null where none */
function inViewIn(/** @type {HTMLElement} */ el, /** @type {HTMLElement} */ box) {
  if (typeof box.getBoundingClientRect !== 'function') return null;
  const top = box.getBoundingClientRect().top;
  for (const x of /** @type {HTMLElement[]} */ ([...el.querySelectorAll('.pl-row, .pl-day')])) {
    const q = x.getBoundingClientRect();
    if (q.bottom > top) return { sel: x.classList.contains('pl-row') ? `.pl-row[data-row="${x.dataset.row}"]` : `.pl-day[data-key="${x.dataset.key}"]`, top: q.top };
  }
  return null;
}

/**
 * The list placed as the fit stands it (see the head): in its column, where
 * the style stands it, its days' heads held at its own top as its rows
 * scroll; after pane B's text, its days' heads held below what pane B's held
 * head covers (`clearOf`). Nothing where the platform lays out no list.
 * @param {NonNullable<typeof els>} E
 * @param {Scene} S
 */
function placeList(E, S) {
  const el = pastEl;
  if (!el || !S.past || typeof el.getBoundingClientRect !== 'function') return;
  if (listBeside(S.fit)) el.style.removeProperty('--past-held'); else el.style.setProperty('--past-held', clearOf(E.paneB) + 'px');
}

/**
 * A day folded or opened by the reader's act at its head — a click, the
 * platform's from Enter or Space at it (FP-36): the list written
 * again, the focus kept on the head. Only the reader's act folds or opens a
 * day; a day of landmarks alone never folds. An act in the scene (`actedIn`).
 * @param {string} key the day's key (M-PAST's `Day.key`)
 */
export function foldDay(key) {
  const S = scene, E = els, L = S && S.past;
  if (!S || !E || !L) return;
  const day = L.days.find((d) => d.key === key);
  if (!day || day.landmarks) return;
  actedIn(S);
  if (L.open.has(key)) L.open.delete(key); else L.open.add(key);
  writeList(E, S, false);
}

/**
 * Rows of the draft's history arrived at the list after it stood — the rows
 * below the read's reach (`readOlder`), a feed row naming the draft
 * (`dropped`) — taken in (M-PAST's `arrive`): each position once, the rows and
 * days made again, the days open as the reader left them — a day the rows name
 * anew standing folded; none, where an older read reached the bottom with no
 * row. Then, where the scene stands, pane B follows the line the rows decide
 * now (`pastLine`) in one step — its corner marked where its items moved
 * (`markCorner`), the heads' band set again where its rows changed
 * (`rebanded`), its region described anew (`namePane`) — so its corner and
 * its description never say different lines (FP-33): a row above the state
 * shown takes from both the words saying it is how the draft stands now, a
 * newer row of its minute gives both the clause saying it is not its minute's
 * last, and the rows read passing that minute or reaching their bottom fill
 * that clause's count in both. The list is then written again, the first row
 * or day standing in view held where it stands (`writeList`). Arriving rows
 * open no day (FP-36); the not-last clause standing where it did not is said
 * once in the status region, politely, and nothing else is.
 * @param {Scene} S
 * @param {readonly FeedUpdate[]} came
 */
function arriveRows(S, came) {
  const L = S.past, E = els;
  if (!L) return;
  const was = PAST.notLastOf(L.rows, L.at, L.bottom);
  if (came.length) {
    const got = PAST.arrive(L.entries, came, L.open);
    L.entries = got.entries; L.rows = got.rows; L.days = got.days; L.open = got.open;
  }
  if (!E || scene !== S) return;
  markCorner(E, S, S.b);
  rebanded(E, S);
  namePane(E, S, S.b);
  writeList(E, S, true);
  const now = PAST.notLastOf(L.rows, L.at, L.bottom);
  if (now && !was) FOCUS.say(notLastWords(now.n));
}

/** does pane B's not-last clause stand with its count not yet told (M-PAST's `notLastOf`): the rows below are owed it (`readOlder`) */
const owes = (/** @type {PastList} */ L) => { const n = PAST.notLastOf(L.rows, L.at, L.bottom); return !!n && n.n == null; };

/**
 * The draft's rows below the history read's reach, read as the list stands
 * (M-PUMP's `historyOf` from `PastList.from` down): those of the windows read
 * whole arriving at the list (`arriveRows`), whether or not any came, the
 * positions they cover taken as read — the bottom reached where the read
 * reached the feed's first position, or the first one its files hold — and
 * the read's pages, rows and time kept with the list's figures (FP-18). A read
 * the board did not answer is asked again once M-PUMP's pause ends, while
 * pane B's not-last clause waits on it for its count (M-PAST's `notLastOf`);
 * any other refusal ends the reads there. One read at a time; none where the
 * rows read reach their bottom, and none taken once the scene no longer
 * stands on the list.
 * @param {Scene} S
 * @returns {Promise<void>}
 */
async function readOlder(S) {
  const L = S.past;
  if (!L || L.reading || L.bottom || L.from <= 0) return;
  L.reading = true;
  const t0 = performance.now(), got = await PUMP.historyOf(L.draft, { below: L.from });
  L.reading = false;
  if (scene !== S || S.past !== L) return;
  L.figures.older = { pages: got.pages, read: got.read, ms: performance.now() - t0 };
  L.from = Math.min(L.from, got.from);
  L.bottom = !got.refused && (got.from <= 0 || got.floor);
  arriveRows(S, got.rows);
  if (!got.refused || !PUMP.unanswered(got.refused) || !owes(L)) return;
  await PUMP.afterPause();
  if (scene === S && S.past === L && owes(L)) void readOlder(S);
}

/**
 * The list of a draft's past states as it stands (the gate reads it): its
 * draft, the state shown and the state asked, its top line, the line saying
 * why pane B shows its state with "read it again" beneath it where it stands
 * (`pastWhyOf`), whether a read of the state asked is out (`PastList.out`) —
 * `asking` too — the refusal that line answers by
 * its name and the date its floor names where that was read
 * (`PastList.floor`), whether the scene reissues the asked state, the clause saying
 * the state shown is not its minute's last with its count (M-PAST's
 * `notLastOf`) and the time the in-flight clause names (`pastLine`), the
 * links' word (`PastList.links`), each one-state step's reason where it
 * stands inert (`stepsOf`), the floor's line — where it stands, the commit
 * steps stop at, the newest row beneath it and its words (`floorWords`) — its days
 * — each its key, its date, whether it is folded, the hands a folded head
 * names and its rows, each its positions, its time, its hand, its kind and its
 * landmark — the reads' figures, whether rows below are still read and
 * whether the rows read reach their bottom; null where the scene is no
 * draft's history.
 */
export function past() {
  const L = scene && scene.past;
  if (!L) return null;
  const line = pastLine(L), steps = stepsOf(L), cut = L.cut ? PAST.floorLine(L.rows, L.cut.at) : null;
  return {
    draft: L.draft, at: L.at, asked: L.asked, unkept: L.unkept, why: pastWhyOf(L), asking: L.out != null, out: L.out, met: L.met ? L.met.name : null, floor: L.floor, running: L.running, notLast: line.notLast, inFlight: line.reading,
    links: L.links, steps: { earlier: steps.earlier.inert ? steps.earlier.inert.id : null, later: steps.later.inert ? steps.later.inert.id : null },
    cut: L.cut && cut ? { at: L.cut.at, cut: cut.cut, below: cut.below, words: floorWords(L) } : null,
    from: L.from, bottom: L.bottom, reading: L.reading, figures: { ...L.figures },
    days: L.days.map((d) => ({ key: d.key, date: d.time == null ? null : dayOf(d.time), folded: PAST.isFolded(d, L.open), landmarks: d.landmarks,
      rows: d.rows.map((r) => ({ first: r.first, last: r.last, positions: [...r.positions], time: r.time, hand: { ...r.hand }, kind: r.kind, landmark: r.landmark ? { ...r.landmark } : null, words: whatOf(r).text })) })),
    entries: L.entries.length,
  };
}

/**
 * End the scene where it stands, as a navigation act's departure ends it —
 * its own end, a Back from its entry, among them (§2.5; see the head): the
 * plane as it was, and no trail move of its own; a stroke's list standing
 * dismissed first, its focus handed back to the stroke, and the face a stop
 * the reader returned to shows at its site — an act waiting on its answer
 * abandoned with it; a pane being set
 * again sets nothing once it ends, an act waiting on it is dropped, a past
 * state's reissue is made no more (`stopReissue`), and each pane's selection
 * ends with what the page drew of it (O-SELECTION's `endPanes`). The
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
  SEL.endPanes();
  stopReissue();
  drawnTies = [];
  drawnEdges = [];
  drawnStrokes = [];
  drawnCrossing = null;
  drawnHits = [];
  drawnMarks = [];
  for (const side of SIDES) { stood[side].clear(); heldAt[side] = null; }
  coverPlane(false);
  if (pastEl) { pastEl.remove(); els.paneB.classList.toggle('past-after', false); }
  setRoom(els);
  els.root.classList.remove('on'); els.root.classList.remove('stacked'); els.paneA.innerHTML = ''; els.paneB.innerHTML = ''; els.strokes.innerHTML = ''; delete els.bar.dataset.face;
  for (const p of [els.paneA, els.paneB]) p.classList.toggle('head', false);
  els.stop.hidden = true;
  els.stop.textContent = '';
  FOCUS.close('scene');
  markDirty();
}

// ---- the editor pane, and each pane's span focus (see the head) -------------------------------------------------------------

/** the elements of the walk a pane's text holds, in its order (T-SPAN's `isElement`) */
const elementsIn = (/** @type {Pane} */ P) => P.d.blocks.filter(isElement);

/** a span's parts standing in a pane's article, by the span's first position */
const partsAt = (/** @type {HTMLElement} */ art, /** @type {number} */ pos) => /** @type {HTMLElement[]} */ ([...art.querySelectorAll('.run > .sp, .run > .withheld')]).filter((x) => Number(x.dataset.pos) === pos);

/** does an element stand on a pane's text, its article's, and not in its corner or the list beside it: where a click is the pointer's act on the text (`textAct`) */
const onText = (/** @type {EventTarget | null} */ t) => {
  const el = /** @type {HTMLElement | null} */ (t);
  return !!el && typeof el.closest === 'function' && !!el.closest('article.dtext') && !el.closest('.corner, #scenepast');
};

/**
 * Does the platform's focus stand in a pane's text (see the head): on the
 * pane itself, or on an element in it but its corner and the list beside it —
 * where a key is the pane's own, and its span focus or its caret takes it.
 * @param {NonNullable<typeof els>} E
 * @param {'a' | 'b'} side
 * @param {Element | null} at
 * @returns {boolean}
 */
function textHolds(E, side, at) {
  const pane = paneEl(E, side);
  if (!at || (at !== pane && !pane.contains(at))) return false;
  return at === pane || !(typeof at.closest === 'function' && at.closest('.corner, #scenepast'));
}

/**
 * The pane whose text holds the platform's focus (`textHolds`): where a key
 * pressed in the scene acts (N-KEYS'); null at a pane's corner, at the scene's
 * acts, outside the scene, and where no scene stands.
 * @returns {'a' | 'b' | null}
 */
export function textPane() {
  const E = els;
  if (!scene || !E) return null;
  const at = typeof document !== 'undefined' ? document.activeElement : null;
  return SIDES.find((side) => textHolds(E, side, at)) ?? null;
}

/** the pane an element stands in, its corner among it — where a key at a pane's corner is answered by that pane's line (N-KEYS'); null outside the panes */
export function paneHolding(/** @type {Element | null} */ el) {
  const E = els;
  return E && scene && el ? SIDES.find((side) => paneEl(E, side).contains(el)) ?? null : null;
}

/**
 * The editor panes as they stand (see the head): each pane holding the
 * current text of a draft of the person's own (`editor`), with its article,
 * its draft, its span focus, whether its text holds the platform's focus and
 * how its scroll brings a stretch of the screen inside it (`intoPane`) — what
 * T-LAYER draws the caret's mark in and brings it into view by (its `panes`
 * reader), and whose drafts M-PUMP keeps as the view's (its `editing`
 * reader); none where no scene stands.
 * @returns {import('../text/layer.js').EditorPane[]}
 */
export function editorPanes() {
  const S = scene, E = els;
  if (!S || !E) return [];
  const at = typeof document !== 'undefined' ? document.activeElement : null;
  return SIDES.flatMap((side) => {
    const P = S[side];
    return P.el && editor(P) ? [{ article: P.el, addr: P.names, focus: P.focus, focused: textHolds(E, side, at), into: (/** @type {{top: number, bottom: number}} */ r) => intoPane(E, side, r) }] : [];
  });
}

/**
 * A pane's scroll moved the least that brings a stretch of the screen inside
 * its visible height, below what its held head covers (`clearOf`): the
 * caret's mark as the frame sets it, a span its focus moved to (FP-37); the
 * other pane and the camera unmoved (R3).
 * @param {NonNullable<typeof els>} E
 * @param {'a' | 'b'} side
 * @param {{top: number, bottom: number}} r on screen
 */
function intoPane(E, side, r) {
  const pane = paneEl(E, side);
  if (typeof pane.getBoundingClientRect !== 'function') return;
  const q = pane.getBoundingClientRect(), top = q.top + pane.clientTop + clearOf(pane), bottom = q.top + pane.clientTop + pane.clientHeight;
  const dy = r.bottom > bottom ? Math.min(r.bottom - bottom, r.top - top) : r.top < top ? r.top - top : 0;
  if (dy) pane.scrollTop += dy;
}

/**
 * @typedef {Object} EditorLine — the line of an editor pane's text a face raised at its draft, or a removal's mark, stands at, on screen (`editorLine`)
 * @property {'a' | 'b'} side the pane
 * @property {Rect} line the box of the glyph at the face's site, else of the last before it that sets one
 * @property {{x: number, y: number}} from where a face beside the line leaves it: past its block's right edge and any sign the column's edge holds or margin's mark that stands level with it (BM's `pastSigns`), level with the line's middle
 * @property {Rect} room the box a face stands inside: the pane's visible box below what its held head covers (`clearOf`), clear of its corner beside its column, and of its corner's foot on the side of the foot the line stands
 */

/**
 * The line of the editor pane holding a draft a site of the draft's text
 * stands on, where a face raised there, or a removal's mark, stands (see the
 * head; O-DELETION's; FP-31, FP-38): of the editor panes holding the draft,
 * the one whose text holds the platform's focus, else the first, as
 * T-LAYER's caret takes one;
 * the site placed by its bytes in the image the pane's article was made from
 * — after the byte that stood before it, else before the one after it, the
 * text's first position where it names neither — and held inside the text;
 * the box of the glyph there, else of the last before it that sets one,
 * sixteen positions back at most, as `lineAt` reads a line. Null where no
 * editor pane holds the draft, its article places neither byte, no glyph
 * sets the line, or the line's middle stands outside the room a face stands
 * in.
 * @param {string} addr the draft
 * @param {{before: ISpan[], after: ISpan[]}} site the bytes either side of it, by identity
 * @returns {EditorLine | null}
 */
export function editorLine(addr, site) {
  const S = scene, E = els;
  if (!S || !E) return null;
  const at = typeof document !== 'undefined' ? document.activeElement : null, holding = SIDES.filter((s) => !!S[s].el && editor(S[s]) && S[s].names === addr);
  const side = holding.find((s) => textHolds(E, s, at)) ?? holding[0];
  if (!side) return null;
  const P = S[side], art = /** @type {HTMLElement} */ (P.el), made = LAYER.madeOf(art), pane = paneEl(E, side);
  if (!made || typeof pane.getBoundingClientRect !== 'function' || typeof art.getBoundingClientRect !== 'function') return null;
  const before = site.before.length ? REC.placedIn(made.image, site.before) : [], after = before.length || !site.after.length ? [] : REC.placedIn(made.image, site.after);
  const last = before[before.length - 1];
  const pos = last ? last.pos + last.width : after.length ? after[0].pos : !site.before.length && !site.after.length && P.d.from >= 0 ? P.d.from : null;
  if (pos == null) return null;
  const inText = P.d.from >= 0 ? Math.max(P.d.from, Math.min(pos, P.d.to - 1)) : pos;
  /** @type {{rect: DOMRect, pos: number} | null} the glyph the line is read from, and its position */
  let glyph = null;
  for (let k = inText; !glyph && k >= Math.max(1, inText - 16); k--) {
    const range = LAYER.rangeIn(art, { addr: P.names, pos: k, width: 1 }), r = range ? [...range.getClientRects()].find((q) => q.width > 0 && q.height > 0) : null;
    if (r) glyph = { rect: r, pos: k };
  }
  const g = glyph, b = g ? made.blocks.find((x) => x.pos <= g.pos && g.pos < x.pos + x.width) : null;
  const blockEl = g && b ? /** @type {HTMLElement | null} */ (art.querySelector(`.run > [data-pos="${b.pos}"]`)) : null;
  if (!g || !blockEl) return null;
  const rectOf = (/** @type {Element} */ x) => { const q = x.getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height }; };
  const line = { x: g.rect.left, y: g.rect.top, w: g.rect.width, h: g.rect.height }, mid = line.y + line.h / 2;
  // the room: the pane's visible box below its held head, less the column of its corner beside its text on whichever side it
  // stands, and cut at its corner's foot on the side of the foot the line stands
  const q = pane.getBoundingClientRect(), top0 = q.top + pane.clientTop;
  let left = q.left + pane.clientLeft, right = left + pane.clientWidth, top = top0 + clearOf(pane), bottom = top0 + pane.clientHeight;
  const c = pane.querySelector(':scope > .corner:not(.head):not(.foot)'), foot = pane.querySelector(':scope > .corner.foot');
  if (c) { const k = c.getBoundingClientRect(), a = art.getBoundingClientRect(); if (k.left + k.right > a.left + a.right) right = Math.min(right, k.left); else left = Math.max(left, k.right); }
  if (foot) { const f = foot.getBoundingClientRect(); if (mid < f.top) bottom = Math.min(bottom, f.top); else top = Math.max(top, f.bottom); }
  if (mid < top || mid > bottom) return null;
  const signs = [...blockEl.querySelectorAll(':scope > .edge'), ...pane.querySelectorAll(':scope > .edge-sign, :scope > .margin-mark')].map(rectOf);
  return { side, line, from: { x: pastSigns({ line, block: rectOf(blockEl), signs }), y: mid }, room: { x: left, y: top, w: Math.max(0, right - left), h: bottom - top } };
}

/** does a line of a pane's span stand inside its visible height, below what its held head covers; true where the platform lays out no article, the span then taken as in view */
function spanShown(/** @type {NonNullable<typeof els>} */ E, /** @type {Pane} */ P, /** @type {number} */ pos) {
  const pane = paneEl(E, P.side), art = articleIn(pane);
  if (!art || typeof pane.getBoundingClientRect !== 'function') return true;
  const q = pane.getBoundingClientRect(), top = q.top + pane.clientTop + clearOf(pane), bottom = q.top + pane.clientTop + pane.clientHeight;
  return partsAt(art.el, pos).some((x) => { const r = x.getBoundingClientRect(); return r.height > 0 && r.bottom > top && r.top < bottom; });
}

/**
 * The span in view of a pane (D5 K-61; B3-S1's kept caret): in an editor
 * pane the span its draft's caret stands in where a line of it stands in view
 * — the kept caret's span holding the focus as on the plane — else the first
 * span in view (`firstInView`), by T-SPAN's rule, else its text's first
 * element; null where its text holds none.
 * @param {NonNullable<typeof els>} E
 * @param {Pane} P
 * @returns {Block | null}
 */
function spanInView(E, P) {
  const all = elementsIn(P), k = editor(P) ? LAYER.caretSpan(P.names) : null;
  const held = k && k.block != null ? all.find((b) => b.pos === k.block) : null;
  if (held && spanShown(E, P, held.pos)) return held;
  const first = firstInView(paneEl(E, P.side)), b = first != null ? elementIn(P.d.blocks, first) : null;
  return b || all[0] || null;
}

/**
 * The focus come into a pane's text from outside it — Tab, Shift+Tab, a
 * click, the way back's act (D5 K-61): its span focus on the span in view
 * (`spanInView`) where it stands on none, or on one out of view.
 * @param {NonNullable<typeof els>} E
 * @param {'a' | 'b'} side
 */
function entered(E, side) {
  const S = scene;
  if (!S) return;
  const P = S[side];
  if (P.focus != null && spanShown(E, P, P.focus)) return;
  const b = spanInView(E, P);
  P.focus = b ? b.pos : null;
}

/**
 * A pane's span focus brought into view (FP-37): its span's top brought to
 * the pane's visible top below what a held head covers — a walk key's move,
 * as the plane's walk flies to its element — or, where `least` asks, the
 * pane's scroll moved the least that brings its first line in view
 * (`intoPane`). Nothing where the platform lays out no article.
 * @param {NonNullable<typeof els>} E
 * @param {Pane} P
 * @param {boolean} least
 */
function showSpan(E, P, least) {
  const pane = paneEl(E, P.side), art = articleIn(pane), at = P.focus;
  if (!art || at == null || typeof pane.getBoundingClientRect !== 'function') return;
  const part = partsAt(art.el, at)[0];
  if (!part) return;
  const r = part.getBoundingClientRect();
  if (least) { intoPane(E, P.side, { top: r.top, bottom: Math.min(r.bottom, r.top + LINE_H * READING_PX) }); return; }
  const origin = pane.getBoundingClientRect().top + pane.clientTop - pane.scrollTop;
  pane.scrollTop = Math.max(0, Math.round(r.top - origin - clearOf(pane)));
}

/**
 * A span of a pane's text said in the status region as the ARIA mirror names
 * a document's span (N-WALK's; ST's `L.mirror.span`, `L.mirror.span.bare`,
 * `L.mirror.item`), from the pane's own text, which a past state and the held
 * version hold apart from the plane's: where it stands, what it reads, and
 * its place among the pane's spans — rendered for the ear (ST's `heard`), the
 * document's words kept as written.
 * @param {Pane} P
 * @param {Block} b
 * @param {Block[]} all the pane's elements, in order
 */
function saySpan(P, b, all) {
  const own = b.kind === 'para' ? sentence('L.mirror.span', { p: b.pos, extent: P.d.extent != null ? numeral(P.d.extent) : '?', document: P.shows, same: '', text: b.text }) : sentence('L.mirror.span.bare', { p: b.pos, document: P.shows });
  FOCUS.say(heard(sentences(own, t('L.mirror.item', { i: numeral(all.indexOf(b) + 1), n: numeral(all.length) }))));
}

/**
 * A pane's span focus moved by span (D5 K-60): ↓ to the next element of the
 * walk its text holds (T-SPAN's `isElement`), ↑ to the one before — a span
 * focus standing on none, or on one the pane's own scroll left out of view,
 * taken again at the span in view first (`spanInView`), as the plane's walk is
 * taken again after a camera move, and the key moving on from it — the span's
 * top brought to the pane's visible top (`showSpan`), that pane alone moving
 * (R3), the span said as the mirror names one (`saySpan`); the focus standing
 * where its text holds no element that way.
 * @param {NonNullable<typeof els>} E
 * @param {Pane} P
 * @param {1 | -1} dir
 */
function walkPane(E, P, dir) {
  const all = elementsIn(P);
  if (P.focus == null || !spanShown(E, P, P.focus)) { const b = spanInView(E, P); P.focus = b ? b.pos : null; }
  const i = P.focus != null ? all.findIndex((b) => b.pos === P.focus) : -1, to = i < 0 ? null : all[i + dir];
  if (!to) return;
  P.focus = to.pos;
  showSpan(E, P, false);
  saySpan(P, to, all);
}

/**
 * A pane's own key, where no live caret stands in it (D5 K-60): ↓ and ↑ by
 * span (`walkPane`); PageDown and PageUp by most of the pane, its span focus
 * then on the span in view where it stood out of view, as the plane's walk is
 * taken again after a paging key; Home and End to the pane's ends, its span
 * focus on its first and its last span. The scene's ties drawn at the scroll.
 * @param {NonNullable<typeof els>} E
 * @param {Pane} P
 * @param {string} k
 * @returns {boolean}
 */
function move(E, P, k) {
  const pane = paneEl(E, P.side), step = pane.clientHeight * 0.8, all = elementsIn(P);
  if (k === '↓' || k === '↑') walkPane(E, P, k === '↓' ? 1 : -1);
  else if (k === 'PageDown' || k === 'PageUp') {
    pane.scrollTop += k === 'PageDown' ? step : -step;
    if (P.focus == null || !spanShown(E, P, P.focus)) { const b = spanInView(E, P); P.focus = b ? b.pos : null; }
  } else if (k === 'Home') { pane.scrollTop = 0; if (all.length) P.focus = all[0].pos; }
  else if (k === 'End') { pane.scrollTop = pane.scrollHeight; if (all.length) P.focus = all[all.length - 1].pos; }
  else return false;
  draw(); markDirty(); return true;
}

/**
 * The scene's own keys at a pane's text (D5 K-60): the pane's moves
 * (`move`) at the pane whose text holds the focus — or the one named — each
 * waiting for a pane being set again (`whenSet`), the key taken meanwhile.
 * False for any other key, at a pane's corner, whose keys are a corner's
 * (N-KEYS' `cornerKey`), and where no pane's text holds the focus.
 * @param {string} k the chord (N-KEYS's `chordOf`)
 * @param {'a' | 'b' | null} [side] the pane: the one whose text holds the focus where none is named (`textPane`)
 * @returns {boolean} the scene took the key
 */
export function key(k, side = textPane()) {
  const S = scene, E = els;
  if (!S || !E || !side || !MOVES.includes(k)) return false;
  actedIn(S);
  const P = S[side];
  if (!S.updating) return move(E, P, k);
  S.waiting.push(() => move(E, P, k));
  return true;
}

/**
 * Each editor pane set again from the text the page shows of its draft where
 * that text moved since the pane was set (see the head; FP-38) — the person's
 * typing, or the record under it set again — in one step with nothing read
 * (`setPanes`): its place, its span focus and the end set level in it
 * carried by their bytes' identity, its selection following its words, said
 * where it moved or ended (O-SELECTION's `followPane`), the runs the two texts share read
 * off their images by identity (`sharedBetween`), so words not yet kept carry
 * no band, the other pane unmoved; a live caret standing in it then holding
 * its span focus (`followCaret`). So too while a setting reads, which lands
 * on the text shown as it stands then (`update`); nothing where no scene
 * stands. The app runs it on each dirty frame before T-LAYER's, so the
 * caret's mark is set in the text the caret stands in.
 */
export function followShown() {
  const S = scene;
  if (!S || !els) return;
  for (const side of SIDES) {
    const P = S[side];
    if (!P.el || !editor(P)) continue;
    const d = LAYER.shownOf(P.names);
    if (d.from < 0 || sameText(d, P.d)) continue;
    const Q = S[otherSide(side)], mine = { src: P.names, d }, theirs = { src: Q.src, d: Q.d };
    setPanes(S, [{ side, next: { d, view: LAYER.sceneView(d), kind: 'draft', src: P.names, names: P.names, shows: P.shows, k: null, n: null, read: P.read, lacks: P.lacks, hold: null } }], side === 'a' ? sharedBetween(mine, theirs) : sharedBetween(theirs, mine));
    const c = LAYER.caret(), at = c && c.live && c.addr === P.names ? LAYER.caretSpan(P.names) : null;
    if (at && at.block != null) P.focus = at.block;
  }
}

/**
 * The span focus of the editor pane the page's own caret stands in, on the
 * span the caret stands in (T-LAYER's `caretSpan`), as the plane's walk follows
 * a live caret (B3-S13; N-WALK's `followCaret`): a key at the caret, a click
 * placing it, a return to it. Nothing where no editor pane holds the caret.
 */
export function followCaret() {
  const S = scene, pane = LAYER.caretPane();
  if (!S || !pane) return;
  const side = SIDES.find((s) => S[s].el === pane.article), at = LAYER.caretSpan(pane.addr);
  if (side && at && at.block != null) S[side].focus = at.block;
  markDirty();
}

/**
 * A click on a pane's text, or a drag's release there (FP-40; D5 K-70), the
 * reader's next act (`acted`, the app's): in an editor pane the caret placed
 * live at the character clicked (T-LAYER's `caretFromPlatform`,
 * `placeCaret`) — after a drag, or a double- or triple-click, at the moving
 * end of the pane's selection as the click leaves it — the platform's with
 * extent there, a click leaving none ending it (O-SELECTION's `clickedIn`) —
 * the selection standing (`keep`) — its span focus following it
 * (`followCaret`); in any other pane a live caret kept where it stood
 * (T-LAYER's `leaveCaret`), its view and the pane's selection standing on
 * what was clicked, and the pane's span focus on the span clicked, so the
 * next key starts there.
 * @param {NonNullable<typeof els>} E
 * @param {'a' | 'b'} side
 */
function textAct(E, side) {
  const S = scene;
  if (!S) return;
  acted();
  const P = S[side];
  if (!P.el) return;
  const sel = SEL.clickedIn(side);
  const at = sel ? { addr: sel.addr, pos: SEL.backward(side) ? sel.pos : sel.pos + sel.width } : LAYER.caretFromPlatform();
  if (!at || at.addr !== P.names) return;
  if (editor(P)) { if (LAYER.placeCaret(P.names, at.pos, !!sel)) followCaret(); return; }
  const c = LAYER.caret();
  if (c && c.live) LAYER.leaveCaret('pointer', false);
  const b = elementIn(P.d.blocks, at.pos);
  if (b) P.focus = b.pos;
  if (typeof document !== 'undefined' && !textHolds(E, side, document.activeElement)) FOCUS.land(paneEl(E, side));
  markDirty();
}

/**
 * Enter at an editor pane's span focus (D5 K-70): the caret placed live at
 * the span's start, or the draft's kept caret standing in that span returned
 * where it stood (T-LAYER's `caretToSpan`), the span focus following it. False
 * where the pane is no editor, or stands on no span.
 * @param {'a' | 'b'} side
 * @returns {boolean}
 */
export function enterSpan(side) {
  const S = scene, P = S ? S[side] : null;
  if (!P || !editor(P) || P.focus == null || !LAYER.caretToSpan(P.names, P.focus)) return false;
  followCaret();
  return true;
}

/**
 * A paging key at the live caret of an editor pane (D5 K-60, K-71): the pane
 * paged by most of its height, as K-60 pages it, and the caret moved to the
 * line then standing where its mark stood (T-LAYER's `caretToPoint`), its span
 * focus with it (`followCaret`). False where no live caret stands in an
 * editor pane.
 * @param {1 | -1} dir
 * @returns {boolean}
 */
export function pageCaret(dir) {
  const S = scene, E = els, pane = LAYER.caretPane(), c = LAYER.caret();
  if (!S || !E || !pane || !c || !c.live) return false;
  const side = SIDES.find((s) => S[s].el === pane.article);
  if (!side) return false;
  const el = paneEl(E, side), mark = /** @type {HTMLElement | null} */ (pane.article.querySelector('.caret-mark'));
  const r = mark && typeof mark.getBoundingClientRect === 'function' ? mark.getBoundingClientRect() : null;
  el.scrollTop += dir * el.clientHeight * 0.8;
  if (r && r.height > 0) LAYER.caretToPoint(r.left + 1, r.top + r.height / 2);
  followCaret();
  draw();
  return true;
}

/**
 * Shift with an arrow, Home or End at the live caret of an editor pane (D5
 * K-71): the caret moved a step that way (T-LAYER's `caretMove`) and the
 * pane's selection (O-SELECTION's) made to run from its anchor — the other
 * end of the pane's selection where it ends at the caret, else the caret — to
 * the caret, its acts row with it, the caret's span the focus; where the step brings the caret back
 * to its anchor, none standing there (O-SELECTION's `clear`). False where no
 * live caret stands in an editor pane, or it cannot move that way.
 * @param {import('../text/layer.js').CaretStep} dir
 * @returns {boolean}
 */
export function extendFromCaret(dir) {
  const S = scene, pane = LAYER.caretPane(), c = LAYER.caret();
  const side = S && pane ? SIDES.find((x) => S[x].el === pane.article) : null;
  if (!pane || !side || !c || !c.live) return false;
  const s = SEL.selected(side), span = s && s.addr === c.addr ? s : null;
  const anchor = !span ? c.pos : span.pos === c.pos ? span.pos + span.width : span.pos + span.width === c.pos ? span.pos : c.pos;
  if (!LAYER.caretMove(dir, anchor)) return false;
  const to = /** @type {import('../text/layer.js').Caret} */ (LAYER.caret()).pos;
  if (to === anchor) SEL.clear(side);
  else SEL.setPane(side, { addr: c.addr, pos: Math.min(anchor, to), width: Math.abs(to - anchor) }, to < anchor, true);
  followCaret();
  return true;
}

/**
 * Select-all in a pane (D5 K-93; B3-S8): its text whole the pane's selection,
 * its acts row with it (O-SELECTION's `setPane`) — at an editor pane's live caret the caret live
 * at its end, the run of typing open there ended (T-LAYER's `placeCaret`); at
 * a past state's, read only, no caret (B3-S8). False where its text holds
 * none.
 * @param {'a' | 'b'} side
 * @returns {boolean}
 */
export function selectAll(side) {
  const S = scene, P = S ? S[side] : null;
  if (!P || !P.el || P.d.from < 0) return false;
  const end = Math.max(P.d.to, (P.d.extent ?? 0) + 1);
  if (end <= 1) return false;
  const c = LAYER.caret();
  if (editor(P) && c && c.live && c.addr === P.names) LAYER.placeCaret(P.names, end, true);
  SEL.setPane(side, { addr: P.names, pos: 1, width: end - 1 }, false, true);
  return true;
}

/**
 * The pane's selection ended (D5 K-77; §4 rule 7; O-SELECTION's `clear`):
 * Esc's first step there — the platform's selection collapsed where it
 * stands, and at the live caret of an editor pane the caret standing live
 * where it stands (T-LAYER's `placeCaret`). False where none stands there.
 * @param {'a' | 'b'} side
 * @returns {boolean}
 */
export function unselect(side) {
  const S = scene, P = S ? S[side] : null;
  if (!P || !P.el || !SEL.selected(side)) return false;
  const c = LAYER.caret(), pane = LAYER.caretPane();
  SEL.clear(side);
  if (c && c.live && pane && pane.article === P.el) LAYER.placeCaret(c.addr, c.pos);
  return true;
}

/**
 * The way back to a draft's kept caret within the scene (the ending's act;
 * FP-40): the platform's focus in the
 * editor pane holding the draft, its span focus on the span the caret stands
 * in, brought into view (`showSpan`), so the next printable key there returns
 * the caret and types (N-KEYS'). False where no editor pane holds the draft,
 * or the draft holds no caret.
 * @param {string} addr the draft
 * @returns {boolean}
 */
export function toCaret(addr) {
  const S = scene, E = els;
  if (!S || !E) return false;
  const side = SIDES.find((s) => editor(S[s]) && S[s].names === addr), at = side ? LAYER.caretSpan(addr) : null;
  if (!side || !at || at.block == null) return false;
  const P = S[side];
  P.focus = at.block;
  showSpan(E, P, true);
  FOCUS.land(paneEl(E, side));
  markDirty();
  return true;
}

/**
 * @typedef {Object} PaneSite — a pane as a key at its text or its corner is answered (N-KEYS'): what text it holds — its draft's editor (`editor`), a past state of a draft (`past`), the moved scene's held version or another record the page derived with held lines applied (`held`), else a text it reads (`read`) — the address its acts name and the one it shows, its record, its span focus and its element, where a line a key raises stands beside
 * @property {'a' | 'b'} side
 * @property {'editor' | 'past' | 'held' | 'read'} kind
 * @property {string} names
 * @property {string} shows
 * @property {Doc} d
 * @property {number | null} focus
 * @property {HTMLElement} el
 * @property {HTMLElement | null} article the article it shows, T-LAYER's mount (`sceneArticle`): where its selection is read, placed and drawn (O-SELECTION's) and an overlay at it stands (O-HOST's); null where none stands yet
 * @property {Shown[]} marks the links its article draws, as it was set (`Pane.view`): what a slot of the selection's acts at it reads (O-SELECTION's)
 * @property {() => string} where the words naming the text it shows, made as they are asked for (`whereShown`): what a selection followed there is said in (O-SELECTION's)
 */

/**
 * A pane as a key at it is answered (`PaneSite`); null where no scene stands.
 * @param {'a' | 'b'} side
 * @returns {PaneSite | null}
 */
export function siteOf(side) {
  const S = scene, E = els;
  if (!S || !E) return null;
  const P = S[side], d = P.d.derived;
  const kind = editor(P) ? 'editor' : d && d.at != null ? 'past' : P.heldVersion || (d && d.rows.length) ? 'held' : 'read';
  return { side, kind, names: P.names, shows: P.shows, d: P.d, focus: P.focus, el: paneEl(E, side), article: P.el, marks: P.view.marks, where: () => whereShown(P, kind) };
}

/**
 * The words naming the text a pane shows, as a line names a text (see the
 * head; BM-HELD's `whereOf`): a past state its draft's text as it stood, when
 * its row says it stood — "at a time not recorded" where it holds none; the
 * held version what the person typed while its draft was held; any other its
 * address's — a member's version, a bare address's current text.
 * @param {Pane} P
 * @param {PaneSite['kind']} kind
 * @returns {string}
 */
function whereShown(P, kind) {
  if (kind === 'held') return t('L.held.typed', { D: nameIn(P.names) });
  if (kind !== 'past') return whereOf(P.names);
  const L = scene && scene.past && P.side === 'b' ? scene.past : null, row = L ? PAST.rowHolding(L.rows, L.at) : null;
  return t('L.held.past', { D: nameIn(P.names), time: row && row.time != null ? stoodAt(row.time) : t('L.time.at', { time: t('L.history.floor.untimed') }) });
}

/**
 * The pane whose text, corner or list of past states holds the platform's
 * focus (see the head; Q4) — the list counted pane B's wherever it stands:
 * the pane whose selection is the platform's live one (O-SELECTION's
 * `focusedSite`); null at the scene's acts, outside the scene, and where no
 * scene stands.
 * @returns {'a' | 'b' | null}
 */
export function focusedPane() {
  const E = els, at = typeof document !== 'undefined' ? document.activeElement : null;
  if (!scene || !E || !at) return null;
  return paneHolding(at) ?? (pastEl && pastEl.contains(at) ? 'b' : null);
}

/**
 * The reason a key at a held version gives (see the head; D6 BM-14; B3-S2):
 * at a selection standing in its text, the one that selection keys
 * (`heldVersionReasonOf`); with none, the one the span its span focus stands
 * on keys — else the span in view — against the current text in the other
 * pane, the nearest rule the design gives a key at such a span; null where
 * the pane holds no held version beside a current text.
 * @param {'a' | 'b'} side
 * @returns {HeldReason | null}
 */
export function heldReasonAt(side) {
  const S = scene, E = els;
  if (!S || !E) return null;
  const P = S[side], Q = S[otherSide(side)];
  if (!P.el || !Q.el || !current(Q) || current(P) || (P.d.derived && P.d.derived.at != null)) return null;
  const a = LAYER.madeOf(Q.el), b = LAYER.madeOf(P.el), sel = SEL.selected(side);
  if (!a || !b) return null;
  if (sel) return heldVersionReasonOf(a.image, b.image, sel);
  const at = P.focus != null ? P.d.blocks.find((x) => x.pos === P.focus) : spanInView(E, P);
  return at ? heldVersionReasonOf(a.image, b.image, { pos: at.pos, width: at.width }) : null;
}

/**
 * The kept word of the corner of the editor pane holding a draft (`editor`):
 * where a face the undo chord answers there stands (N-KEYS'; O-FACES'
 * `unkept`); null where no editor pane holds the draft, or its corner holds
 * no kept word.
 * @param {string} addr
 * @returns {HTMLElement | null}
 */
export function keptWordOf(addr) {
  const S = scene, E = els, side = S && E ? SIDES.find((s) => editor(S[s]) && S[s].names === addr) : null;
  return S && E && side ? /** @type {HTMLElement | null} */ (paneEl(E, side).querySelector('.corner .kept-word')) : null;
}

/**
 * What the scene's close re-takes into the entry it lands on (see the head;
 * B3-S1's scene rule; D5 K-63), read before it closes: of the editor panes,
 * the one whose caret the person last held — the page's own caret's draft,
 * else the one whose text holds the focus, else the first — its draft, that
 * draft's caret by its place (T-LAYER's `caretPlaceIn`), and the span its view
 * was anchored at, the first in view (§3.2's anchor), by position in the text
 * shown and by its byte's identity; null where no editor pane holds a draft
 * with a caret, or no scene stands.
 * @returns {{addr: string, caret: import('../text/layer.js').CaretPlace, pos: number, ids: ISpan[]} | null}
 */
export function editorAnchor() {
  const S = scene, E = els;
  if (!S || !E) return null;
  const own = LAYER.caret(), at = typeof document !== 'undefined' ? document.activeElement : null, list = SIDES.filter((s) => !!S[s].el && editor(S[s]));
  const side = list.find((s) => !!own && S[s].names === own.addr) ?? list.find((s) => textHolds(E, s, at)) ?? list[0];
  const P = side ? S[side] : null, caret = P ? LAYER.caretPlaceIn(P.names) : null;
  if (!P || !caret) return null;
  const first = firstInView(paneEl(E, P.side)), b = first != null ? elementIn(P.d.blocks, first) : null, pos = b ? b.pos : caret.pos;
  return { addr: P.names, caret, pos, ids: REC.identityIn(imageOf(P), pos, 1) };
}
