# Patterns and rules for the frontend

A starting point, written 2026-10-10 from the decisions taken that
day and from what the spikes settled into. Each rule has a number so a
lane's brief can cite it and a check can hold a lane to it. A rule
that turns out wrong is changed here, with the reason, not worked
around.

The repository is laid out the way a Tauri app is: the page's files in
one folder, the Rust shell beside them in its own, and the test
harness beside both. The exact folders are the structure record's to
fix; nothing here depends on their names.

## The stack, as decided

- **FP-1 Plain JavaScript.** The page is written in JavaScript the
  browser loads as written. Nothing is compiled or bundled. The
  shipped file is the file in the repository.
- **FP-2 Types from the first line.** Every value's shape is written
  down in JSDoc comments, declared once, and the TypeScript checker
  runs over the page in the gate with nothing emitted. A lane that
  adds a value writes its shape. Deferring types is not an option.
  Moving to TypeScript proper stays open; it is taken only when a
  bundler or framework arrives for another reason, or when the
  comments get in the way across many modules, and the lane that
  meets either says so in its report.
- **FP-3 No framework.** The plane is a drawing loop, which no
  framework helps. The controls around it are small enough to write
  by hand.
- **FP-4 Browser modules.** The page is a folder of modules the
  browser imports directly. No file reaches into another by slicing
  its source or by a global. The one global the page tolerates is the
  bridge the shell injects.
- **FP-5 The harness is not the product.** The Python scripts that
  start a daemon, drive the page in headless Chrome, and assert on
  what they see live in their own folder and are imported by nothing
  in the page or the shell. A user installs none of Python, Node or
  Chrome.

## One state, one render, events in one direction

- **FP-6 The model holds what the viewport asked for and nothing
  more.** Documents, spans, links, versions, the feed's updates and
  the search's hits, as the bridge delivered them. The model knows
  nothing of pixels, zoom or selection. It never reads the whole
  board.
- **FP-7 View state is pure view.** The camera, the zoom band, the
  selection, the trail, the hover, the version each box shows, the
  version each reading scene's pane reads. It is
  never written to any record or sent over the bridge. The spike proved the camera writes nothing;
  the gate keeps proving it.
- **FP-8 Render is a function of model and view state.** On a dirty
  frame the text layer is placed first, so what is mounted is decided
  before anything is drawn; where the document being read is set
  again on that frame, its columns broken anew, or its box takes
  another of its versions (FP-22), the camera is re-anchored on the
  passage being read — in the version taken, its counterpart there,
  else the nearest passage the two share — before anything is placed,
  so the passage keeps its place and size on screen; then the canvas
  is repainted whole, drawing each line of a document as a bar or
  yielding it to its text by that frame's standing lines; then the
  beams are redrawn. Nothing drawn on the canvas is updated in place.
  The screen cannot drift from the state because it is rebuilt from
  the state.
- **FP-9 Input never draws.** A handler changes view state, or asks
  the model to fetch, and marks the frame dirty. That is all it does.
- **FP-10 One owner per piece of state.** Each concern's state lives
  in one module and is read through that module's exported functions.
  No module keeps a copy of another's state. No module touches
  another's DOM.
- **FP-11 Dependencies run one way.** The bridge, then the model,
  then, beside each other, the plane, text, beams, navigation, the
  overlays, the one line and the scene, then the one module that
  wires them and starts the loop. A module never imports one above
  it. Within one layer a module reads another only through its
  exported functions (FP-10). The model's view-driven needs, which
  spans and which documents to ask for, are computed from the plane's
  pure camera arithmetic, which sits beside the model and holds no
  state of its own, not above it.

## The two places the page keeps DOM by hand

- **FP-12 The text layer has one reconciler.** Real text elements are
  mounted by visible line, by a stated policy, laid out once and moved
  by transform. No document at reading zoom is ever bars: every
  document in view there stands as text in the frame it gets there,
  however many there are. Each box stands as the one version it shows
  (FP-22): another version's article is taken down as the box takes
  it, save while a press is anchored in it. Below reading zoom a
  stated limit holds the frame's new mounts, never what stands, and
  nothing is taken down to make room. A line goes when it leaves the
  view or its document falls below the unmount threshold, but a line
  holding the selection, a caret or the focus stays for as long as it
  holds it. An article is laid out once, in one column at the measure,
  its lines read as the engine set them, and nothing is laid out again
  until the document is set again. The reconciler lays a document's
  text out hidden before its first mount, so the fold breaks its
  columns where the rendered lines break and the bars below the mount
  stand where the text will. This is the one reconciler the page
  keeps, in one module, kept small. It has two targets, the plane's
  text layer and the reading scene's panes, each pane one column
  whose measure narrows in characters to fit and never shrinks its
  face; below forty characters a pane, the panes stack. The scene
  borrows the mount; it never keeps DOM text of its own.
- **FP-13 Each control redraws itself from state.** The LEAP box and
  its rows, the mirror, the trail, the one line, the status line, the
  live region and the cards are ordinary DOM. Each is a function that
  rebuilds its own element from state when that part of the state
  changes. No observers, no binding.

## The fit

- **FP-26 Fit changes how a sign is drawn, never whether it stands.**
  Text is read at reading size. To fit a view or a pane, margins
  compact first, then the measure narrows in characters; the face
  never shrinks, and zoom never changes the measure. Every sign of
  what the reader sees — an address, a state, a board, a version, a
  count — keeps a legible size beside what it describes. Short of
  room it compacts there, else moves into its own document's free
  room, else the coarser scale's label carries it; it never stands on
  another document's ground or on ink. Compact means: a usual state
  becomes a glyph, a name becomes its address fields and is never cut
  mid-word, and a number or an exception keeps its words. A compact
  sign opens whole on its act, and the mirror reads every sign whole.
  A document drawn smaller than its neighbours is framed and says so.

## The bridge

- **FP-14 The page never dials a board.** Every read, every write,
  the feed and the ceremonies' public moments cross one interface to
  the shell, which dials for the page. The page holds no session
  token and no key. FP-15 names the one exception, for development
  alone.
- **FP-15 One port, two adapters.** The page talks to one interface:
  the op call, the board and session calls, and the events coming
  back. Behind it sit two implementations that are never mixed: the
  shell's bridge in the installed app, and, for development and the
  gate, a bridge client that reaches the dev provider over loopback
  HTTP and carries that one run's secret and nothing else. The dev
  provider is the shell's core run as a process beside the page; it
  opens the sessions and dials the daemon, and the page still holds
  no session token and no key. A module above the port cannot tell
  which adapter is beneath it.
- **FP-16 The shapes come from the shell's core.** Every value that
  crosses the bridge has its shape defined once, in Rust, in the
  shell's core, where the wire's own types are the source. The page's
  declarations are generated from that definition and fetched from
  the dev provider, committed as fetched and never hand-edited, and
  the gate fails on a drift. The page never invents a wire shape.

## The gate

- **FP-17 Every claim is a test that fails without its fix.** Text,
  layout, wire traffic and frame cost are asserted by the harness in
  headless Chrome. A test that still passes with its fix removed is
  not a test.
- **FP-18 Figures are measured, never assumed.** A frame budget, a
  mount cost, a byte count: the harness measures it on this machine
  and the report says which machine. What was not measured is said to
  be unmeasured.
- **FP-19 The shipping engine is looked at by a person.** The gate
  runs Chrome. The installed app runs the system's WebKit on a Mac.
  Before a lane closes, the owner opens the page in Safari and looks.
  The gate does not pretend to have done that.

## The focus

- **FP-20 The focus has one owner.** The page has one focus, the
  platform's, and one module owns every move of it: the controller
  (`web/nav/focus.js`), with five entries every control calls and none
  bypasses — `land` (an act moved the focus to an element: a landing's
  item, a walk key's, an arrow's next control), `open` and `close` (a
  region took the focus and gave it back), `keep` (a control redrawn
  from state while it holds the focus), `cover` (a region chrome
  stands over is inert) — and one reading of whether a key made an
  act (`byKey`). No `.focus()` call stands outside it. A rebuild keeps
  the focus: a control redrawn from state puts the focus back on the
  element bearing the same key, never on the body. A control that
  closes returns the focus to the element that opened it where that
  still takes it, else to the walk's element; never lost, never to
  the top. A replacement is not a dismissal: an overlay that takes
  another's place keeps the chain's one opener, takes the focus on its
  first act where the replaced one held it, and a face never takes it.
  The ring and the one status region are the owner's to write.

## The jump

- **FP-25 A jump moves the reader when made; the read only fills the
  place in. Everything follows the camera.** A jump flies at once
  wherever the plane can place its destination and no failure is
  known, and takes its trail entry at the act (`web/nav/go.js`,
  `web/nav/trail.js`). Leaving a place ends its chrome and keeps that
  chrome and the view in the place's entry; the focus goes to the
  landing. Input acts where the camera is: a wheel, pinch or drag
  takes over, the landing then only marks its passage and held keys
  are dropped; every other key acts from the landing. "Reading",
  "reaching" and a failure show where the camera is — at the act's
  site only until the camera leaves, in the one line when out of view,
  and always spoken in the status region. Where only a read can place
  the destination, the camera waits, input acts on what is on screen,
  and Esc or Back abandons the jump. A jump that ends without the
  camera leaving gives its entry back. No act is cancelled by a pan or
  zoom, and nothing flies the reader back unbidden.

## The landing

- **FP-21 An outline alone means all of it, here, in one piece.** An
  arrival is one state: the passage a landing carried or followed,
  read from the text it landed in by one rule (`web/beams/held.js`),
  outlined on every run it holds, plus at most one lit link — the one
  crossed to get there, lit at the reader's end, the same at an
  arrival, a Back and a Forward. The landing is never silent about the
  rest: all of it in one piece, the outline alone; in several runs,
  each run labelled — runs of different material are pieces, numbered
  in the passage's own order, a repeat says "again" and the first of
  them "again later", the current one adds "all of" or "only part of
  the passage" and, if reordered, "in another order"; none of it, the
  dead end's face; couldn't tell, where no answer told — a read the
  board refuses for its size asked again in parts first — the landing
  unmarked, its line saying it could not tell and why, keyed on the
  refusal and never its token. "Part" names an amount only; nothing
  counts "places". The state ends only at another landing, at find
  opening, or at Esc after anything nearer; a pan, a zoom, a selection
  or a step keeps it, and a return restores outlines and labels as
  left. Stepping the pieces follows find's concept, in passage order,
  wrapping, with the focus on the piece. The item the focus lands on
  takes the crossing and the label as its description, the one
  announcement; no light sets `aria-current`. Every surface that knows
  the state before departure — a drawn link's far end, a versions row
  — says it by the same rule, the short form heading the long.

## The box

- **FP-22 A box shows one version.** Every version of a document
  shares the document's box, and the box shows one of them: the
  version pinned there, else the plain address, the trunk head. One
  module owns which (`web/nav/go.js`), and every surface reads it
  there: the text layer mounts that version alone, the canvas draws
  its fold, its bars and its label, the walk and the mirror stand on
  it, the one line and the corner name it, a far end is placed in the
  version its far box shows, and the model reads that version's text,
  the box's document read only for what the box draws of the document
  itself — its extent, its metadata, its links, its chain. Only an act
  aimed at the box changes its version — a version move, or an arrival
  by an address — and a version move lands in place: the camera does
  not fly, the text is replaced, and the passage held keeps its line
  on screen (FP-8). A pan, a zoom or a newer version's arrival changes
  no box's version.

## Freshness

- **FP-23 A document is kept fresh by its kind.** Every surface that
  shows a document — its box on the plane, a reading scene's pane —
  follows the feed by the document's kind, and none offers a reload.
  The model takes each row and drops what it names, so the view asks
  it again, and only then tells the readers that keep text apart from
  the model what it dropped, so each reads fresh what it shows. A
  draft is read again and set in its place, the words being read held
  still, carried by their bytes' identity, never their positions: on
  the plane the passage at the view's centre, in a pane its first span
  in view and the selection. An edition read at its bare address keeps
  the version it was read on: a newer version's arrival pins it to the
  member its text is (FP-22 on the plane), its corner and its address
  naming that member, never the latest, and its acts naming it too. A
  pane says the arrival once, politely, and its corner offers the
  newest in its place. A pinned version only counts its chain again. A
  link row resets the marks, counts and lines of the text it reaches,
  as a draft's update does. A pane is set again in one step: every
  read comes first; then its text, the reader's place, the selection
  and the scene's ties are set together, with nothing awaited, so no
  tie is drawn over text it was not measured on, and an act on the
  panes, save a copy, waits for the setting to land. A pane's version is the scene's
  own view state, never a box's, and any scene restored is restored
  with it. The page's own death takes what the dead session read down
  at once from the plane, the ARIA mirror and every pane, then reads
  it again as a guest. A draft is never set again while it is being
  typed in, and a row from the window's own act is that act's
  feedback, not news.

## The copy

- **FP-24 A copy holds every item its span covers, each in its place.**
  Every copy of a selection holding a position in an article — on the plane or
  in a reading scene's pane — replaces the clipboard: the platform's own
  copy is prevented, never refused, and its plain text is never empty.
  The plain text follows the span's items in the text's order: text
  copies as its text; every other item copies as a stand-in in square
  brackets, in its place, naming its kind in the strings table's words
  — the words the ARIA mirror announces at the item, read from one item
  rule (`web/text/article.js`): a record, a reference, a withheld run
  with its owner and length, an item this client cannot show with its
  length. A record's renderer may add the record's own plain contents
  — the key record its keys' labels and fingerprints — and no item's
  rendering on the plane, written for whoever is looking, is ever
  copied. Text is never joined across an item, and items one after
  another of one kind and owner share one stand-in. skep's own
  clipboard entry is written for every such span, text or none. A selection
  that touches an item covers it whole and is drawn so, so what looks
  selected is what is copied.

- **FP-27 A copy carries what the reader saw, named so it can never
  drift.** Beside a copy's plain text, skep's own clipboard entry names
  the material by identity — its bytes' runs, read along with each
  text shown — and names where the words were read, by board and
  document. For a published document it adds the member shown by its
  version address, the positions in that member, and a mark when the
  words were read at the plain address. A draft's positions are never
  named, because they move. Copy reads the selection wherever it was
  made — the plane, a pane, the walk or the mirror — at any moment,
  waiting on no setting, so timing never changes what one act copies.
  The page's own signs in an article (a head, an empty document's
  line, a scene-offer, any label) take no selection, in the mirror
  too, and are never copied. Outside a field, a copy that holds no
  position prevents the platform's copy, leaves the clipboard
  unchanged, and says so at the focus and, politely, in the status
  region.

## Decisions in force

Design decisions taken on issues and built, one line each, newest
last. Each stands until a later decision says it changes it.

- **#15** (built `f068303`): a document folds inside its cell, 60–66 characters a line in equal 36-line columns left to right then by row, one size until they fill the cell, then stepped smaller → FP-12, FP-8
- **#122** (built `f95f05b`): every document at reading size stands as text, the cap a limit on a frame's new mounts and never a ceiling, and a press at reading size always acts on the text → FP-12
- **#132** (built `b8ea0a8`): a link whose far end has no drawn document stays in the set, named in words at its near end and drawn as a short tail with no bearing triangle; one passage's tails merge with a count
- **#136** (built `e6192db`): every jump takes its trail entry when made, and Back, Forward and the trail keys act at once on the trail as it stands; a read that ends after the reader has left moves nothing, and a reading jump says so where it was made
- **#140** (built `6f5745e`): reading scale is each document's own em, one test shared by the press rule, the line and the walk; a document below it is one collapsed stop that Enter expands with a teleport, named by the line alone with no position
- **#141** (built `1316b01`): after a camera move the focus goes to the document under the view's centre, else stays with the held focus while any of it is in view, else to the innermost account or board region holding the centre; the ring is clamped to the view
- **#143** (built `24ff9d5`): a link's card draws as lineage only the claims of the owner of the link each calls superseded, naming any other claimant beside its claim; every other claim waits behind one unnumbered line that lists them in place as assertions naming each claimant and what it is to the links
- **#152** (built `035735f`): each trail entry records the step that left it by permanent addresses, and a one-step move lights that step where it lands — Back where it began, Forward what it marked on arrival — a longer jump nothing; changes #136: a notice's link relights only on Forward onto its entry
- **#153** (built `0c0acd6`): a carried or followed passage lands in one of four states read by one rule, a line beside the landing saying how much is held → FP-21
- **#154** (built `66ca03a`): a document's versions share one box showing one of them, a version move lands in place and only an act aimed at the box changes its version; changes #153: on a version move the none state lands at the nearest passage the versions share → FP-22
- **#160** (built `8d5f13c`): each reading scene's pane follows the feed by its document's kind, set again in one step and offering no reload → FP-23
- **#161** (built `ad883d5`): a copy stands in for every item its span covers that has no text, in the words the mirror announces, and a selection that touches an item covers it whole → FP-24
- **#137** (built with this line): a jump's camera leaves at the act and its read runs beside the flight, the camera going on to the passage the read places unless the reader took it over; keys other than navigation acts pressed while a jump is in the air are made at its landing in order, and dropped where it never lands; a wheel series under way at the act is dropped; a board already marked unreachable gets no flight; changes #136: a jump says it is reading where its camera went → FP-25
- **#151** (built with this line): each column's gutter widens into its edge, which holds that column's counts and withheld marks level with their blocks' first lines; the corner follows the column nearest the view's centre; a landing frames that column with its corner and its edge; the view's width at the reading size alone sets the measure; changes #15: the gutter → FP-26
- **#158** (built with this line): a landing lands at piece 1; every run of its passage is outlined in view or not, wherever its document is drawn, and labelled at the text's edge level with its first line, labels that would stack merged ("pieces 1–4 of 9"); Mod+G and Mod+Shift+G, the line's "next piece · previous piece" showing its chords, and a press on an outlined run below reading scale step among the runs at reading scale, adding nothing to Back; the position strip outlines each run; changes #153: with several runs the line is the current run's label → FP-21

## Changes

Each rule changed here, with its reason and where the reason was
found.

- 2026-10-11 · FP-6 · the structure record · the LEAP box's search answers are model state the old list did not name
- 2026-10-11 · FP-11 · the structure record · the layer list lacked the overlays, the one line and the scene, and the old sentence could be read as forbidding the model's read of the plane's camera arithmetic
- 2026-10-11 · FP-12 · the structure record · the reading scene's panes are a second place the page shows real text, so the one reconciler has two targets and the scene borrows the mount
- 2026-10-11 · FP-13 · the structure record · the list of controls was short by the LEAP box's rows, the mirror, the one line and the cards
- 2026-10-11 · FP-14 · the structure record · the rule said the page never touches the network, which the development adapter FP-15 names made false; it now says the page never dials a board and holds no token and no key
- 2026-10-11 · FP-15 · the dev-provider rulings · the development adapter was a direct fetch to a local daemon; the rulings made it a bridge client to the shell's core over loopback, so the page reaches a daemon in no build
- 2026-10-11 · FP-16 · the structure record · the shapes were said to be defined on the Rust side, which the wire's frame answers could not satisfy; they are generated from the shell's core and fetched from the dev provider
- 2026-10-19 · FP-8 · #6 · the canvas drew against the frame before's mounted set, so bars and text showed together or neither on the crossing frame; the text layer is now placed first
- 2026-10-20 · FP-20 · the focus and keyboard record · five modules each moved the platform's focus their own way and each fix repaired one module; FP-10 already forbade a state with five writers, so the focus now has one owner
- 2026-10-22 · FP-12 · #15 · fixed-depth columns hold their rows only where they break at the lines the engine set, which only a layout can read, so the reconciler that lays an article out reads them
- 2026-10-22 · FP-8 · #15 · folded, a re-set moves every line after the change, across the columns as well as down them, so the camera is re-anchored on the passage being read before anything is placed
- 2026-10-22 · FP-12 · #122 · a ceiling of eight articles left every readable document past it as bars a click could not reach, so every readable document stands, the limit holds only new mounts below reading zoom, and a line holding the selection or the focus stays lest its unmount take the platform's with it
- 2026-10-22 · FP-8 · #122 · with a document standing by visible line, the frame's mounted set no longer says which of its lines are text, so the canvas draws or yields by line. Drawing by document would draw bars under text, or leave lines empty, wherever only part of a document stands.
- 2026-10-23 · FP-21 · #153 · four sites each read what a landing's text held of a passage their own way, so an outline meant all of it at one and any of it at the next; one rule now reads it and names the four states
- 2026-10-23 · FP-22 · #154 · every surface took a version member as a document of its own, so a member read beside its edition was mounted over its box and each surface answered which text stands here its own way; one owner now says which version a box shows
- 2026-10-23 · FP-7 · #154 · the version a box shows is kept for the session and written nowhere, so it is view state
- 2026-10-23 · FP-8 · #154 · a version's text breaks its lines elsewhere, so the passage held left its line on the frame the box took the version; the camera is now re-anchored on it
- 2026-10-23 · FP-12 · #154 · with every held version a candidate for the mount, two articles stood in one box; a box now stands as the version it shows
- 2026-10-23 · FP-23 · #160 · no feed row reached a pane, and the plane and the scene each answered what a change to a document does here their own way; one rule now answers by the document's kind
- 2026-10-23 · FP-7 · #160 · the version a pane reads is the scene's own, never a box's pin, so it is view state beside the version each box shows
- 2026-10-23 · FP-24 · #161 · the copy, the mirror and the selection each answered what stands for an item without text their own way, emptying the clipboard or joining text across a run; one item rule now names it for all three
- 2026-10-23 · FP-25 · #137 #171 #227 #228 #237 · while a jump read, the trail, input, cards, walk and failures each answered "where is the reader" by a different clock
- 2026-10-23 · FP-26 · #151 #217 #220 #225 #230 #236 #241 · a fit test that failed dropped the sign without a word: labels, tail boards, the kept document's name, the shown version
- 2026-10-23 · FP-12 · #217 · panes shrank their face to hold 66 characters and undid the reader's own zoom
- 2026-10-23 · FP-21 · #158 #226 #238 #242 · the marks ended at the next act while #158 kept them, Back's light and the arrival's light meant different things, and stubs counted "places"
- 2026-10-23 · FP-27 · #243 #244 #246 · the clipboard entry cited words by positions that move or by an address that floats, and a selection on a sign copied the page's furniture as the datum
- 2026-10-23 · FP-23 · #243 · a pane's copy waited on its setting, so timing changed what one act copied
- 2026-10-23 · FP-24 · #246 · a sign's selection had no span to stand in for; the rule now holds wherever a position is selected

## What these rule out

A framework scheduler beside the frame loop. Data binding on the
plane. A module with its own copy of state. A build step between the
source and the page. A page that fetches, or that holds a secret.
