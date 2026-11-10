# Patterns and rules for the frontend

A starting point, written 2026-10-10 from the decisions taken that
day and from what the spikes settled into. Each rule has a number so a
lane's brief can cite it and a check can hold a lane to it. A rule
that turns out wrong is changed here, with the reason in the commit, not
worked around.

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
- **FP-9 Input never draws.** A handler changes view state, asks
  the model to fetch, or hands `web/write/` an edit, and marks the
  frame dirty. That is all it does.
- **FP-10 One owner per piece of state.** Each concern's state lives
  in one module and is read through that module's exported functions.
  No module keeps a copy of another's state. No module touches
  another's DOM.
- **FP-11 Dependencies run one way.** The bridge, then the model,
  then the write layer (`web/write/`), then, beside each other, the
  plane, text, beams, navigation, the overlays, the one line and the
  scene, then the one module that wires them and starts the loop. The
  write layer imports the bridge, the model and `util.js` alone, and
  draws nothing. Only it sends a write through the port: the
  publication, merge and history families, `upload`, `restore`,
  `resolve`, and any `op` frame outside the read operations. A module never imports one above
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
  changes. No observers, no binding. A rebuild spares a composer's
  field until the composer closes.

## The fit

- **FP-26 Fit changes how a sign is drawn, never whether it stands.**
  Text is read at reading size. To fit a view or a pane, margins
  compact first, then the measure narrows in characters; the face
  never shrinks, and zoom never changes the measure. Every sign of
  what the reader sees — an address, a state, a board, a version, a
  count — keeps a legible size beside what it describes. Short of
  room it compacts there, else moves into its own document's free
  room, else the coarser scale's label carries it; it never stands on
  another document's ground or on ink. A place's name that would rise
  under the one line with its place is held below the line inside the
  place's visible part, unless the line names the place; held, it
  stands on its place's own ground over that place's first lines, on
  no other ink, its address whole or no name at all. Compact means: a
  usual state becomes a glyph, a name becomes its address fields and
  is never cut mid-word, and a number or an exception keeps its words.
  A compact sign opens whole on its act, and the mirror reads every
  sign whole. A document drawn smaller than its neighbours is framed
  and says so.

- **FP-37 The strip under the top line follows one rule; draw order
  never decides what shows there.** Upward stubs — the plane's, the
  beams' and their labels — keep the border on one row, and while a
  name holds, its place's ground runs up to the line with the stubs
  drawn on it; held names stand below that row, no triangle or stub
  label touches them, and only a beam's line may pass beneath. Every
  place's name heads its visible part: a name holds once it would pass
  under the stub row or its parent's held row, unless the line names
  it; held rows stack outermost first and never overlap, each its
  place's ground across that place's width; the first row shows its
  whole address, and its board where the line names another, each row
  beneath only its own fields, so read together the rows give every
  address whole. A document's corner stands on its name's row, at the
  column being read. No act leaves its target — a focus, a caret, a
  selection or a landing — under the strip.
- **FP-31 A sign is a mark that says where, or words that say what.**
  A mark stays in the text at the text's scale, takes no width, moves no
  word and never leaves its characters. Words never stand in a line or
  on ink: they stand at the column's edge level with their line, or in
  its corner, on the screen-sized layer, placed each frame by the
  transform that places their line, neighbours stacking downward joined
  to their line; they keep their share of the text's size and never fall
  below the smallest readable text size, their room reserved beside the
  column at the text's own size. While the text is readable no sign is
  hidden or dropped to make room, and no zoom lays text out again. A
  narrowing view gives up empty space first, then each sign's full form
  for its compact one, and only then the measure, which has no floor in
  characters.

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

## The board

- **FP-35 Only a board the page holds is drawn or named.** No surface
  draws, names, walks to or flies to a board the page holds no record
  of, nor any place on it. Where it holds none, why is one entry
  (`web/overlays/faces.js`), with the act that works where one does,
  and the one line, the mirror and every answer read that entry alone.
  An act that needs a board the reader lacks answers where it is taken
  and names what still works; none is silent.

## The session

- **FP-28 The page gets its session back, and only the person signs
  out.** One routine opens the page's session (`web/model/pump.js`),
  at boot and wherever the session is lost without the person's act,
  as the port tells it. Each loss gets one attempt, made once its
  board answers; a loss told while it is out joins it, and an answer
  after it settles is dropped. While it is out, what was read stands
  and every read waits, then goes again under what it left, so no
  surface meets a lost session's refusal. Got back as the same
  principal, nothing on screen changes; refused, the page stands at
  the class and in the state the same refusal at boot leaves it.
  "Signed out" names the person's own sign-out alone, on every
  surface.

FP-28 names this rule alone; a citation of FP-28 for a surface that
ends only by the reader's act means FP-36.

## The cover

- **FP-29 A change of the page's class keeps every place and covers
  its material.** View state holds addresses, positions and layout;
  what a surface shows of a document it reads from the model, or from
  the read it was last set from, never from a copy that outlives that
  read. At a change of the page's class every document the view stands
  on — in view, or named by the view's state — is read again at the
  new class. One the reader can no longer read is covered: its place,
  its address and its trail entry stand; it is drawn, walked and named
  as the withheld box a guest meets, its sign-in offered in the one
  line's words for the ending; nothing the class it left measured of
  it — a length, a position, a window, an arrival, a notice, a card —
  survives. The change is said once, its ending and what it covered,
  as the reads it asked answer.

FP-29 names this rule alone; a citation of FP-29 for the strip under
the top line means FP-37.

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
  stands over is inert) — and one reading each of whether a key made
  an act (`byKey`) and of a field the reader types in (`isField`). No
  `.focus()` call stands outside it. A rebuild keeps the focus: a
  control redrawn from state puts the focus back on the element
  bearing the same key, never on the body. A control that closes
  returns the focus to the element that opened it where that still
  takes it, else to the walk's element; never lost, never to the top.
  A field the reader types in keeps the caret through every move the
  page makes: a landing, a key made at one, a place left or a notice
  shown takes neither its focus nor its text, nor ends the chrome it
  stands in, and once a landing has passed over it, that chrome's
  close gives the focus to the surface a key replayed at the landing
  opened, else to the walk's element. A replacement is not a
  dismissal: an overlay that takes another's place keeps the chain's
  one opener, takes the focus on its first act where the replaced one
  held it, and a face never takes it. The ring and the one status
  region are the owner's to write.

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

## What stands

- **FP-36 A surface ends only by the reader's act.** A card, a list, a
  selection, a reading scene or a field being typed in ends when the
  reader closes it, replaces it, or leaves its place, and by nothing
  else: a read that lands or fails, a version move and a replayed key
  stand beside it, never closing or covering it and never taking its
  caret; a failure's face stacks below the card it concerns, and Esc
  closes the face first. Each surface is named by what it is about —
  a link, a span's bytes, a document, the version shown — so it leaves
  and returns with its place, the scene with its panes' versions, and
  the landing rule re-checks it whenever the text under it changes:
  where all of its subject stands it moves there; where part or none
  does it stays, says so, and offers the version that holds it. What
  is shown away from the focus, or changed under it without the
  reader's act, is spoken in the status region. A walk's moment ends
  only as the shell ends it: what ends any other surface folds it,
  never closes it, and one raised where a surface of the reader's
  stands covers none of it.

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
  opening, at Esc after anything nearer, at the person's edit of the
  bytes it stands in, or at a change of the page's class (FP-23); a
  pan, a zoom, a selection or a step keeps it, and a return restores
  outlines and labels as left. Stepping the pieces follows find's concept, in passage order,
  wrapping, with the focus on the piece. Where the board will not read
  the runs' bytes, no run is numbered: each is labelled one of its
  count, the line says only part and why, and stepping follows the
  document's order. The item the focus lands on
  takes the crossing and the label as its description, the one
  announcement; no light sets `aria-current`. Every surface that knows
  the state before departure — a drawn link's far end, a versions row
  — says it by the same rule, the short form heading the long.

## The link's marks

- **FP-30 Every mark of a link says one fact, the same way everywhere,
  and only where the page knows it.** Lit means the reader crossed this
  link to get here; a piece's number is its place in the passage; the
  maker is who made the link, named in words on every label and mirror
  item, "yours" or the maker as the card names them, a bundle naming its
  one maker or how many it holds; an end's colour is the colour of the
  link's symbol at that end's document, at every scale, neutral only
  where an end's links differ. A follow that fails lights nothing, and
  its label carries the far end's state from the read it made. Each end
  is drawn in one place by one rule — on the part of it the reader can
  read, else at the start of the withheld run it lies in — and every
  surface that counts, marks or lists the end reads that place. Where
  the page cannot tell a fact, it says so, and why. No fact is carried
  by colour alone.

## The faces

- **FP-33 A fact about a document reads the same on every face that
  states the document.** Each face that states a document carries a fact
  the page reads of it in the same words, in the same place, taken only
  from the read that answers that fact. A blank place means the read
  found nothing; where the read failed, the face says the fact was not
  read; where the board refuses the read as withheld from the reader, no
  face states the fact. The read is made with the reads that draw the
  face, so a face an act shows stands with the fact from its first
  frame, and the fact never moves the text around it.

## The slot

- **FP-34 A slot shows its value, that it is being read, or why it
  cannot — never its template's placeholder.** A slot is never dropped
  for want of its value and never holds another value. While its value
  is read it stands as an empty box of its own width, and filling it
  moves nothing beside it. Where the value cannot be had, the slot says
  why in that cause's own words, never one word for every cause, and
  neighbouring slots one cause empties say it once; where the slot does
  not apply, its state's own words stand in its place.

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

## The session

- **FP-32 A session's ending is one entry, read by every surface.** Each
  way a session ends is one entry in the strings table: a head the line
  shows uncut at any width, and the whole form the head opens, which
  together say what ended the session as far as the board's records
  show and name the act, if any, that brings the reading back. The line,
  the sign-in face, every covered place and the status message read
  only that entry; "signed out" is the reader's own sign-out alone. A
  board that stops answering names no cause and gets one attempt once
  it answers, what was read standing uncovered until then, a refused
  attempt worded once by the refusal. In each view the covered place
  nearest the focus carries the ending's words, the whole form first
  and the head after; every other covered place carries a mark keyed to
  those words that opens them there; in a covered pane the words stand
  level with the passage held beside it. The act appears only where it
  works, is the same act the line offers, and the line keeps its own.

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

## The text shown

- **FP-38 A draft has one text, the text shown.** In a draft holding
  words the board does not hold, every surface stands on the text
  shown and holds its place by its bytes' identity: the text, the
  caret and the selection; link marks, symbols, beams and counts; the
  strip; the hint; the walk and the mirror; find; landings and
  returns; trail entries; standing cards and lists; each scene pane.
  The board is asked only about bytes it holds, by a name it resolves
  to those bytes; the page answers for its own unminted words itself.
  An act that sends a name for characters takes effect only once the
  board holds them. Nothing drawn, reached, said or answered changes
  at a commit or an ack, and nothing is keyed on the model's base.

## Decisions in force

Design decisions taken on issues and built, one line each, newest
last. Each stands until a later decision says it changes it.

- **#15**: a document folds inside its cell, 60–66 characters a line in equal 36-line columns left to right then by row, one size until they fill the cell, then stepped smaller → FP-12, FP-8
- **#122**: every document at reading size stands as text, the cap a limit on a frame's new mounts and never a ceiling, and a press at reading size always acts on the text → FP-12
- **#132**: a link whose far end has no drawn document stays in the set, named in words at its near end and drawn as a short tail with no bearing triangle, one passage's tails merging with a count
- **#136**: every jump takes its trail entry when made, and Back, Forward and the trail keys act at once on the trail as it stands, a read that ends after the reader has left moving nothing
- **#140**: reading scale is each document's own em, one test shared by the press rule, the line and the walk, and a document below it is one collapsed stop that Enter expands with a teleport, named by the line alone with no position
- **#141**: after a camera move the focus goes to the document under the view's centre, else stays with the held focus while any of it is in view, else to the innermost account or board region holding the centre, the ring clamped to the view
- **#143**: a link's card draws as lineage only the claims of the owner of the link each calls superseded, naming any other claimant beside its claim, and holds every other claim behind one unnumbered line listing them as assertions naming each claimant and what it is to the links
- **#152**: each trail entry records the step that left it by permanent addresses, and a one-step move lights that step where it lands — Back where it began, Forward what it marked on arrival — a longer jump nothing, a notice's link relighting only on Forward onto its entry (changes #136)
- **#153**: a carried or followed passage lands in one of four states read by one rule, a line beside the landing saying how much is held → FP-21
- **#154**: a document's versions share one box showing one of them, a version move lands in place — the none state at the nearest passage the versions share (changes #153) — and only an act aimed at the box changes its version → FP-22
- **#160**: each reading scene's pane follows the feed by its document's kind, set again in one step and offering no reload → FP-23
- **#161**: a copy stands in for every item its span covers that has no text, in the words the mirror announces, and a selection that touches an item covers it whole → FP-24
- **#137**: a jump's camera leaves at the act and its read runs beside the flight, the camera going on to the passage the read places unless the reader took it over, keys pressed in the air made at its landing in order, and the jump saying it is reading where its camera went (changes #136) → FP-25
- **#151**: each column's gutter widens into an edge holding that column's counts and withheld marks level with their blocks' first lines, the corner and a landing's frame following the column nearest the view's centre, and the view's width at the reading size alone setting the measure (changes #15) → FP-26
- **#158**: a landing lands at piece 1, every run of its passage outlined wherever its document is drawn and labelled at the text's edge, Mod+G and Mod+Shift+G stepping among the runs at reading scale and adding nothing to Back, and the line reading the current run's label where there are several (changes #153) → FP-21
- **#166**: each end of a beam, and of a reading scene's line between its panes, takes the colour the link's symbol takes at the document that end touches, ends that differ changing colour once midway between the two documents, a link drawn from both ends one beam counted once, and neutral marking only a bundle whose links differ at that end
- **#169**: a held label stands at the top-left of its box's or region's visible part, one unwrapped line of its type with its link badge, its words dropped before its address, just below the held label of the region holding it and level with the corner, the box's top edge and history strip staying where the box begins → FP-26
- **#171**: a card ends when the camera leaves its place and never when a read lands, a landing never closes a field the reader is typing in or a refused write still waiting on the reader's answer, and an address box with nothing typed in it takes the new address → FP-25, FP-20
- **#175**: a session a restart lost is asked for again by the boot's own `session(board)`, the page's own `close(session)` is the one end to read "signed out", past a second still out the line reads "reconnecting as ⟨account⟩ after a restart", got back it says nothing, and refused it shows the guest state boot shows for that refusal led by "could not reconnect as ⟨account⟩ after a restart" → FP-28
- **#177**: at a session's ending the documents in view and on the trail are read again, and one the reader can no longer read stands in place as a guest's withheld box, its face offering sign-in in the one line's words for that ending, the walk, the panes and the trail standing on it, cards on covered material closing, and one status message saying the ending and what is covered → FP-29, FP-21
- **#179**: a `withheld` refusal describes the document the board names in `site.addr` by the first case that holds — the text on screen showing the change where the session ended, a follow's destination landed at like any jump, a link address inside it keeping C-39's words, else its own withheld words at the act, whole the first time a session shows them and compact after — each face the act's answer, reached by keyboard while it stands → FP-25, FP-26
- **#182**: a folded moment is one segment of the one line naming its walk, its step and that it waits on the reader, never cut short of room and the shell told nothing, its act unfolding the moment as it was left over the view its walk showed it over, only its own cancel sending `cancel(id)`, and a statement never folding → FP-36, FP-20
- **#184**: the versions list keeps every member its probe read and says at its open end whether the board ended the chain there — the head's row marked latest only where the board answered that no member follows, else one line saying how far it read and that it is not known to be complete, with "try again" going on from there — and while it is not known to be complete nothing built from it claims a total or a latest
- **#186**: a withheld origin's edition claims decide one clause beneath the arm of every face naming that origin — a withheld run's and the document's own (changes #179), never a link address inside it — the pointer as a working link, the quoting form, or nothing where no claim is admitted, a failed read of them worded "edition claims not read" → FP-33
- **#202**: the ends drawn at a withheld run stand as one symbol beside its notice at every stage, a count after it where they are two or more and others' ends counted in its column's edge, the symbol opening the one card or listing the several, and Back across a follow made there outlining the whole run, lighting its symbol and standing on the run's item → FP-30, FP-21
- **#208**: a byline's device label and fingerprint are the sole device-flagged entry of its owner's genesis enrollment, read once per account on its board, the reader's own byline carrying no fingerprint, and the one line's device label is the key this device opened the session with, its key store read before the session → FP-34
- **#212**: a feed row naming no document and no link marks its board, and once the run is in one refresh gives everything held there what a row naming it gets — each held edition's chain counted first and one that advanced pinned to the member it shows, the rest dropped, what is shown read again and set in one step — the board's label saying so while the shell's index reports changes it could not place → FP-23
- **#215**: where `boards()` found no board the address display reads "go to an address" alone, an empty list stands `F.unclaimed` in the guest line's place saying beginning a notebook isn't built yet, and a refused one says the boards on this machine could not be read, with "try again" where a retry may tell → FP-35
- **#16**: a document's words are set in a shipped Charter at a line height of 1.45, the client's in the system face with tabular figures where figures stack or change and at the run's size inside a run, addresses and fingerprints in a shipped Atkinson Hyperlegible Mono; an arrival at reading scale stands at 1.0625 of the root size, smaller only where the narrowest measure leaves its column no room, and both scene panes take one size, that size where their room holds it; every width counts the reading face's average advance as rendered, a glyphless position one advance each; and the first layout waits for the faces, a face arriving later a re-set → FP-8, FP-12, FP-26
- **#17**: a document is set as its bytes until a structural link carries its structure — each typed line one block opening on a one-em indent, every space keeping its place, a blank line one empty line box and no other room between blocks — and no surface draws, or drops the characters of, a heading, emphasis, a list or a table the bytes alone suggest → FP-12
- **#22**: the anatomy card says the day its link was made, after its owner, and each versions row the day its member was published under "published" said once at the list's head — each the day the board's own record gives the commit that made it, as day, month in words and year, never a relative age or a log position, and "not recorded" where the board holds no reading → FP-34
- **#23**: a document's label is one contents line — its own first line, a pinned version's its own, set where those words stand when its text mounts and cut on a word, the client's words in its place bracketed, and its address at one small size at the row's end, past its region's prefix only while that region is named in view and whole first wherever it is not — and the one line follows each exact field with its label, the label giving way first → FP-26, FP-22
- **#42**: a continuation's mark is two targets — its newest member's label going to that member, and the rest of the mark, its count saying what it counts, opening its members' list newest first at the mark, each row a LEAP — the whole mark the list's where it is too small for two, the walk stopping once at the mark before its members and ringing a member on the mark with its name and place, and a re-take over the mark keeping a focus on one of its members, else taking the mark and never the member under the centre (changes #141) → FP-20
- **#50**: a reading scene is a step on the trail — its opening pushes one entry at the act, its own close is Back onto the entry it opened over with the step it was opened from lit, leaving its entry records it by its panes' versions and bytes and the focus's stop so a return reopens it as left, and the one line says a close until the next act → FP-25, FP-36, FP-23, FP-20
- **#59**: "read side by side" at a link whose far end names a document whole opens that document at its start — the version the end names, else the latest — beside the near passage, levelled with nothing of it and shown without waiting on `compare`, whose answer only adds bands; the link's line meets the far pane's facing edge, drawn whole in the end's colour; the far pane is named as the link's end and is the current location; the near passage's band's clipped end is a stop stepping through the passages holding its material, with a count where they are several; and the card describes the end by the document's label → FP-30, FP-20
- **#331**: scenes merge only pairs touching in both documents; each band is drawn at its extent on each pane's facing edge, two bands sharing a line dividing it at its middle, and where two runs consecutive in both documents meet on both sides their shared edge is a stroke in the gutter's half beside each document holding characters between them, strokes at one place one stroke with their count, its act and the mirror naming each difference's characters on each side → FP-26
- **#339**: a stop only the panes' `compare` draws that the reader left from is recorded by its kind and what it stood for, stands at the return where its material stands and takes the focus, its count and bearing being read until that `compare` answers, which fills it in under the kept focus or leaves it standing in FP-21's words where part, none or nothing is told, an act on it waiting for the answer and the answer moving nothing once the reader has moved on → FP-20, FP-21, FP-25, FP-27, FP-34
- **#285**: a feed row naming a document the view shows keeps what the page shows of it until the reads it makes again set it in one step, rows meanwhile queueing one more read, a withheld answer setting the withheld face and a passage gone from the text set again landing in place in the none state → FP-23, FP-21
- **#272**: a withheld run's first read shows its gap, then its face with its clause once every read the clause waits on answers, and a link write drops only the edition claims it writes, retracts or supersedes, a face standing keeping its clause until their reads again set it in one step → FP-33, FP-34, FP-23
- **#274**: a covered document's face sets C-67's clause, read at the class the page reads at now, beneath the ending's words, the two shown together once every read the clause waits on answers, and a change of the page's class keeps what was read as published until its reads at the new class set it in one step, covering at once each draft the view stands on and each run from a draft and taking links homed in drafts out of view, a cover lifting where its read returns its material → FP-29, FP-33, FP-23
- **#264**: leaving a place keeps in its trail entry the selection by its bytes and the card or list standing by what it is about, with the control the focus stood on, and a return reopens them as left — their counts and claims read again, a span's subject placed again by its bytes, a stroke's list with its scene → FP-36, FP-25, FP-20, FP-29
- **#265**: a face a read brings once it answers ends no card still reading and stands under the card, list or moment the reader opened meanwhile, placed below its box, closed first by Esc or an empty click and left standing alone once that surface closes, leaving the place taking both down → FP-36
- **#266**: a version move closes no card, list, selection or moment, however early opened, taking down only the faces of the landing it leaves and standing its reading face below the reader's card, and as it lands — as a newer version's arrival pins a box on its member too — each surface on the version left is placed by its bytes in the version shown and moves there, moves onto what stands with the line said, or stays with the dead end's face below it offering the version that holds it → FP-36, FP-22
- **#267**: a key replayed at a landing opens its surface without the caret of a field the reader is typing in, the field and its text standing, and Esc in that field then gives that surface the focus (changes #171) → FP-20, FP-36
- **#297**: Back, Forward and a trail jump find the words their entry kept — the line the live hold keeps still and the view around it, by their bytes — in the text they reach by the landing rule and land in its states, adding nothing where all of them stand in one piece and, where none do, landing at the nearest passage the two texts share, else the head, with the none face, a kept arrival's outlines and labels read again from that text (changes #153, #158) → FP-21, FP-25
- **#298**: Back, Forward and a trail jump pin each box their entry names on the version it kept there, an entry left at an edition's bare address keeping the member its text was once a newer version arrives, as the box the reader stands at does, and a trail list row names that version → FP-22, FP-23, FP-25
- **#326**: a session got back for one lost reads `changes(session, since)` from the last position the page took on its board, every row the feed brings meanwhile waiting, and takes each row as a live one, once and in position order, before any read waiting on the session goes out, a catch-up that cannot be done marking the board → FP-28, FP-23
- **#350**: a change of the page's class leaves every draft it drops a box owed its read at the new class, whatever the view stood on — covered at once where the change ends the session, else waiting to be read — read at once where the view stands on it and else once the view comes nearer than far, a drop meanwhile keeping it owed (changes #274) → FP-29, FP-23
- **#345**: a document whose read again has been out a second says once, where its name is — beside its address in the one line while the line names it, else as its corner's last item on a line of its own — and in its mirror item, "as last read ⟨when⟩" for a draft's text and else "links as last read ⟨when⟩", ⟨when⟩ the hour and minute the page's clock stamped the read that set what stands (its day first where not today), a failed read's words after it, said once as it appears and once as it lifts in the frame its read sets it, a pane set again and a kept part at its own sign taking the same clause → FP-23, FP-33, FP-36, FP-37
- **#367**: the event stream's drop holds every row until its reopen's catch-up reads `changes` from the last position the page took, the board saying "as last read ⟨when⟩" once its lag has lasted a second and its corners naming neither the latest version nor the chain's count meanwhile, a document still being read a second after the catch-up's rows taking the clause from the board, and ⟨when⟩ everywhere the page's clock at the row or drop that left the copy behind (changes #345) → FP-23, FP-28
- **#368**: below its reading scale a kept document's label carries its clause after its address, at the address's size and never after its first line, which gives way first, and at far scale the account's label carries "⟨n⟩ as last read" (changes #23, #345) → FP-26, FP-23
- **#369**: the status region names a kept place as the mirror does — a document by its first line's first six words then its address, the board by its mirror item's name — and says "⟨name⟩ as last read ⟨when⟩" as its clause appears, "⟨name⟩ current, unchanged" or "current, changed" as its reads set it, and "still as last read" with the failure's words where a read fails, in one message per cause naming the place nearest the focus and counting the rest by outcome (changes #345) → FP-36, FP-23
- **#380**: a reading scene's pane makes its byline as it is set, from its owner's facts as the page holds them then, owner facts the page takes anew are told to the scene as a drop naming the documents that owner holds, and a pane's facts read that a drop of the byline causes overtook is asked again up to DROP_ATTEMPTS → FP-23, FP-33, FP-34
- **#411**: text the person may edit is a draft whose address's account is the session's account, at the reading scale, decided by the address alone, never by the owner store — one test binding the plane's keys, the pointer's click, the swallow's line and a scene's panes
- **#222**: Mod+F, and Mod+G or Mod+Shift+G where nothing else steps, open the page's own find at the edge of the document the focus is in — off any document a line naming where words are found — which reads the rest of the version shown once, searches every part as it arrives and never a page's sign, moves the camera to each match outlined alone as an arrival under one trail entry its steps share, says "so far" until every part is in, names the document and version a miss searched and the withheld text it could not, says why where a part could not be read, and on Esc leaves the match selected with the focus on it and the camera still → FP-6, FP-20, FP-21, FP-25
- **#224**: a link's far end the board will say nothing of stands in one state with a short and a whole form — "no document here yet" only in exactly the account the reader acts as under an index complete from the board's first position, its whole form saying nothing has been made there and whether the account's next new document goes there, else "no document known here" followed by the fifth cell's words — the short form naming it on its tail, a merged tail sharing it, its rows, its card and its mirror item, and the whole form, its short form first, its follow's face and its mirror item's description → FP-21, FP-26
- **#227**: a follow of a link whose far end names no document never leaves and so takes no trail entry, its face standing at the act's site, the link's own bytes, until Esc or the next act → FP-25
- **#228**: a failed jump's entry stands where its camera went, with its face and its walk, and every return to it asks its read again, showing the failure's face only where the answer meets it again → FP-25
- **#236**: below its own reading scale the document the one line names stands with its address and its position strip, the strip marking neither a position nor the view's window → FP-26
- **#237**: leaving an entry records the walk's element by its bytes where the view left shows it, and a return stands the walk on it where the view the return lands at shows it — on what stands of it where its own place is gone — else on the element under that view's centre by #141's order, the dead end's face saying so where none of the element stands → FP-25, FP-21
- **#239**: a document's state is said once, at its corner, its article's head stating none in any state — at the bare address, at a pin, before its first version, where a read refused it and in a reading scene's pane — the corner naming the version its box shows and the count of its chain, counted again as a newer version arrives, and the ARIA mirror's item voicing the corner's state whole → FP-12, FP-22, FP-23
- **#241**: a box's history strip marks the version its box shows in the one line's window mark, the head keeping a shape of its own where the board ended the chain there, and the mirror's item says "version ⟨k⟩ of ⟨n⟩" → FP-26, FP-22
- **#242**: a drawn link's far end says on its stub and its symbol the start of the line its card and its mirror item say whole, and a versions row whose member holds all of the passage in several runs says it in the arrival's words (changes #153) → FP-21
- **#244**: a copy from the plane's box names the version the box shows by its version address — at a published document's plain address the head its corner names, marked as read there — and a reading scene's pane writes the same entry → FP-27
- **#436**: a document's corner stands beside its column while the measure beside it keeps forty characters at the reading size, set by the view's width alone, and below that at its document's head across the column being read, in a band its fold reserves above its first row — that row naming the document with its kept clause after the address, then the corner's items in their order and compact forms, those that never yield wrapped whole onto further rows and the rest folded into "⟨n⟩ more", the first row held below the one line as the document scrolls, no caret or selection an act moves left under it — a refit framing the passage being read sideways as a landing does, a focus landing in the corner panning it into view, and the kept word and Mod+S's answer said in the status region, the reading scene's part landing with #217 (changes #345) → FP-26, FP-31, FP-8, FP-20, FP-36, FP-37
- **#310**: the one line never clips — its acts first and whole, a guest's sign-in among them, then past its labels the position standing as its strip alone, the session and board segments in their compact forms, further rows broken only between parts, and an address wider than a row folding the levels between its board and its deepest into one mark that opens the address box at them, each part measured at its reserved width, the layout set again only as the window changes or at the reader's act, and a statement arriving with no room opening beneath the line until the next act → FP-26, FP-20
- **#445**: the acting-as segment's fields give way whole in a fixed order — the principal number, a board only read's origin and venue, the device label — then the fields that stay shorten together, the account to "as ⟨account⟩", the venue to its word, the key's presence to a drawn key glyph its whole form shows too and a board only read to its class word, exceptions keeping their words, the shortened segment one act opening its whole form, the own notebook's segment naming no origin, the narrowest breaking it between fields and a field between its words, and the layout set again as one of its fields changes state (changes #310) → FP-26, FP-20, FP-32
- **#442**: each formatting form has one name in the strings table, read wherever a form is named — `3.23.4` "flag", a type the table lacks the name its card gives it, the last slot keeping its name at every width — forms named together in the strip's order with a comma alone, "not" before each one off and each other hand's forms after the document's own as a group led by the hand, semicolons between groups, and every form's take-off and every form the editor makes its act in one pattern each around the set's label, the Format menu's strikethrough, subscript and superscript items acting as their chords and named where a line names a chord → FP-34, FP-26
- **#217**: a reading scene fits both panes once, from the narrower, at the reading size and never a smaller face — both corners beside their columns, whole or compact, while the measure beside the compact corner keeps forty characters, else both at their documents' heads at one depth with their first rows held at the panes' tops — a refit carrying each pane's first line in view, and the panes' stacking below forty waiting on design → FP-12, FP-26
- **#462**: a list of the forms the sets draw names the heading form once, "headings", whatever levels its blocks take, after the paragraph where the strip's heading group stands — any form whose type carries a parameter one item there, named by the form and never by its values — while one block's heading keeps "heading ⟨n⟩", a no-break space before its number → FP-34, FP-26
- **#463**: strikethrough, subscript and superscript have no chord, so a line that would name one's chord names its act by the form's one name in the line's usual shape, a chord bound later taking that name's place, and the strip shows nothing where their chord would stand; every Format menu — the menu bar's and the context menu's, native or the page's — titles each form by that name with its first letter capitalised, directly in Format in the strip's order, from titles the page hands the shell, which writes none of its own (changes #442) → FP-34, FP-16
- **#468**: a one-line hint's compact form is its notice's first clause — whole at its first press in a session and its clause at every later one, save a notice pinned or marked whole — standing beside the focus without taking it, drawn again with a fade-in and said at every refused press, an auto-repeat one press, and opened whole by a click or by Tab then Enter → FP-26, FP-31, FP-20
- **#471**: a key acts on the selection the screen draws alone — a slot chord with no selection standing acts on the walk's focused span without selecting it, that span held by the card or the list the chord opens and gone with it, and Mod+Enter at a caret follows only a selection drawn in the caret's own text, else answering with the caret's follow line → FP-10, FP-36
- **#512**: the slot acts, their counts, the "which" rows and the provenance card answer about a span of the text shown only by its base's positions, a run at a time and as of that base's read, the page answering for bytes it made — one answer over the selection where its runs agree, each run named by its first words where they differ, the card standing at the selection; a derived article draws links on its board runs alone; over a span wholly of new words follow and read side by side stand inert and focusable saying so, and elsewhere read side by side opens the draft's pane as shown, level at the shown position → FP-30, FP-36, FP-21
- **#520, #524, #526** (`ux/questions/2026-11-09-unsent-typing-which-text.decision.md`): in a draft holding words the board does not hold, every part of the page follows the text shown and holds its place by its bytes' identity — a byte the page made by the page's own until its ack names the address the board minted — the board asked only about bytes it holds, by a name it resolves to those same bytes, and the page answering for its own words itself, at once. An act that sends a name for characters takes effect only once the board holds them — at the open burst's ack, and under a hold not at all — and nothing the person meets is keyed on the model's base (changes #512, #515) → FP-38, FP-21, FP-23, FP-30, FP-36
- **#287, #288**: a withheld run's gap holds its ground, its ends' symbol and its origin's key alone, and each origin states itself once per document in view — each reading scene's pane its own — compactly in a column's edge beside its first run in view, held there by that run's identity until it leaves and inside the outline, the whole wording a card on any run's act and one mirror description per origin (changes #151) → FP-31, FP-26, FP-33, FP-36
- **#304**: a transcluded run is one origin's stretch unbroken in the text, one run across the typed lines its own newlines break, its ground on every line, a hairline of no width at its two ends and none of its words in a line, its origin stated by #288's rule in a column's edge — headed by its key, the run's one gesture to its source, with C-33's words where a draft's run stands in a published document, those words its origin's one mirror description → FP-31, FP-26, FP-38
- **#434**: a typed word is its target document's from the keystroke, held once per document in `web/write/` — its own layer between the model and the drawing modules, drawing nothing, importing the bridge and the model alone and alone sending writes, a handler handing it an edit — a draft the person may edit typed in place in its own article, Tab typing a tab, and each composer an overlay naming its target at its head, standing beside the words and never over them, its field spared by a redraw until it closes → FP-38, FP-10, FP-11, FP-9, FP-13, FP-36, FP-20
- **#432**: a copy's clipboard entry names every position it holds in the order the text shows them — a byte the board minted by its address as the page's mints read at the copy, an unminted one by the page's own name tagged with an id drawn at page load, a stretch its article's image does not place a gap of its width and reason — parts merging only where adjacent in the text shown, the plain text unchanged, anything else writing a passage's identity out of the page naming it so and anything reading one keeping a part it cannot resolve as words in their place → FP-27, FP-38
- **#496**: keys follow the person's last pointer act — a click or a drag on anything of another document than the caret's keeps the caret where it stood and stands the walk on what was acted on, else on that document's stop nearest the point, one on the caret's own draft but its text and its corner leaving a live caret live with the walk on its span, an empty click taking one step of Esc's order down to the caret kept with its span holding the walk and the ring drawn, a selection put in another document keeping the caret first, and a key swallowed outside the draft last written in the page's session ending its line with "— you were last writing in ⟨label⟩", the label the act back to its kept caret (changes #471, #468) → FP-36, FP-20

## What these rule out

A framework scheduler beside the frame loop. Data binding on the
plane. A module with its own copy of state. A build step between the
source and the page. A page that fetches, or that holds a secret.
