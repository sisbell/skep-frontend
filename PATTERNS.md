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
  beams are redrawn.
  Nothing drawn on the canvas is updated in place. The screen cannot
  drift from the state because it is rebuilt from the state.
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
  it, save while a press is anchored in it. Below reading zoom a stated limit holds the
  frame's new mounts, never what stands, and nothing is taken down to
  make room. A line goes when it leaves the view or its document falls
  below the unmount threshold, but a line holding the selection, a
  caret or the focus stays for as long as it holds it. An article is laid
  out once, in one column at the measure, and its lines are read as
  the engine set them; its parts — each a run of one column's lines
  in view — are cut from that column at those lines, a line entering
  the view standing in a part of its own, and nothing is laid out
  again until the document is set again. The same reconciler lays a
  document's text out hidden, once, before its first mount, so the
  fold breaks its columns where the rendered lines break and the bars
  below the mount stand where the text will. This is the one reconciler the page
  keeps, in one module, kept small. It has two targets, the plane's
  text layer and the reading scene's panes, each pane one column at
  the plane's measure. The scene borrows the mount; it never keeps
  DOM text of its own.
- **FP-13 Each control redraws itself from state.** The LEAP box and
  its rows, the mirror, the trail, the one line, the status line, the
  live region and the cards are ordinary DOM. Each is a function that
  rebuilds its own element from state when that part of the state
  changes. No observers, no binding.

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

## The landing

- **FP-21 An outline alone means all of it, here, in one piece.** A
  landing that carried or followed a passage reads what the text it
  landed in holds of it by one rule (`web/beams/held.js`), and lands in
  one of four states, never silent about the rest: all of it in one
  piece, the outline alone; part of it, or all of it in pieces, the
  outline kept and one line beside it at the text's edge saying so;
  none of it, the dead end's face; couldn't tell, where no answer told
  — a read the board refuses for its size asked again in parts first —
  the landing unmarked, its line saying it could not tell and why,
  keyed on the refusal and never its token. The line is no overlay: it
  stands while a card opens at the landing and leaves with the outline
  at the next act. The item the focus lands on takes the line as its
  description, so the mirror says every state. Every surface that knows
  the state before departure — a drawn link's far end, a versions row —
  says it by the same rule.

## The box

- **FP-22 A box shows one version.** Every version of a document
  shares the document's box, and the box shows one of them: the
  version pinned there, else the plain address, the trunk head. One
  module owns which (`web/nav/go.js`, `shownIn`), and every surface
  reads it there: the text layer mounts that version alone, the canvas
  draws its fold, its bars and its label, the walk and the mirror stand
  on it, the one line and the corner name it, a far end is placed in
  the version its far box shows, and the model reads that version's
  text, the box's document read only for what the box draws of the
  document itself — its extent, its metadata, its links, its chain.
  Only an act aimed at the box changes its version — a version move,
  or an arrival by an address — and a version move lands in place: the
  camera does not fly, the text is replaced, and the passage held keeps
  its line on screen (FP-8). A pan, a zoom or a newer version's arrival
  changes no box's version.

## Freshness

- **FP-23 A document is kept fresh by its kind.** Every surface that
  shows a document — its box on the plane, a reading scene's pane —
  follows the feed by the document's kind, and none offers a reload.
  M-PUMP takes each row and drops what it names, so the view asks it
  again, and only then tells the readers that keep text apart from the
  model what it dropped (`onDrop`), so each reads fresh what it shows.
  A draft is read again and set in its place, the words being read held
  still, carried by their bytes' identity, never their positions: on the
  plane the passage at the view's centre, in a pane its first span in
  view and the selection. An edition read at its bare address keeps the
  version it was read on: a newer version's arrival pins it to the
  member its text is (FP-22 on the plane), its corner and its address
  naming that member, never the latest, and its acts naming it too. A
  pane says the arrival once, politely, and its corner offers the newest
  in its place. A pinned version only counts its chain again. A link row
  resets the marks, counts and lines of the text it reaches, as a
  draft's update does. A pane is set again in one step: every read comes
  first; then its text, the reader's place, the selection and the
  scene's ties are set together, with nothing awaited, so no tie is
  drawn over text it was not measured on, and an act on the panes waits
  for the setting to land. A pane's version is the scene's own view
  state, never a box's, and any scene restored is restored with it. The
  page's own death takes what the dead session read down at once from
  the plane, the ARIA mirror and every pane, then reads it again as a
  guest. Two clauses bind the editor's lane, for the page types nothing
  and composes no write (S-35 (a)): a draft is never set again while it
  is being typed in, and a row from the window's own act is that act's
  feedback, not news.

## The copy

- **FP-24 A copy holds every item its span covers, each in its place.**
  Every copy of a non-empty selection in an article — on the plane or
  in a reading scene's pane — replaces the clipboard: the platform's own
  copy is prevented, never refused, and its plain text is never empty.
  The plain text follows the span's items in the text's order: text
  copies as its text; every other item copies as a stand-in in square
  brackets, in its place, naming its kind in the strings table's words
  — the words the ARIA mirror announces at the item, read from one item
  rule (`web/text/article.js`, `itemOf`): a record, a reference, a
  withheld run with its owner and length, an item this client cannot
  show with its length. A record's renderer may add the record's own
  plain contents — the key record its keys' labels and fingerprints —
  and no item's rendering on the plane, written for whoever is looking,
  is ever copied. Text is never joined across an item, and items one
  after another of one kind and owner share one stand-in. skep's own
  clipboard entry is written for every span, text or none. A selection
  that touches an item covers it whole and is drawn so, so what looks
  selected is what is copied.

## Decisions in force

Design decisions taken on issues and built, one line each, newest
last. A decision binds the surfaces it names until a later decision
says it changes it; a run that builds a `## Design decision` comment
adds its line here, and a decision that answers a question across
surfaces also becomes a numbered rule above, with a Changes entry.

- **#15** (built `f068303`): a document folds inside its cell — 60–66
  characters a line, equal columns of 36 lines laid left to right then
  by row, one standard size until the columns fill the cell, then
  stepped smaller; mid scale greeks the same columns.
- **#122** (built `f95f05b`): no document at reading size is ever drawn
  as bars; the text layer mounts by visible line, the cap is a limit on
  new mounts per frame and never a ceiling, and a press at reading size
  always acts on the text.
- **#132** (built `b8ea0a8`): a link whose far end has no drawn document
  stays in the set, named in words at its near end, and is drawn as a
  short tail with no bearing triangle; tails from one passage merge with
  a count.
- **#136** (built `e6192db`): every jump takes its trail entry when it
  is made; Back, Forward and the trail keys act at once on the trail as
  it stands; a read that ends after the reader has left moves nothing;
  a reading jump says so where it was made.
- **#140** (built `6f5745e`): reading scale is each document's own em,
  one shared test for the press rule, the line and the walk; a document
  below it is one collapsed stop that Enter expands with a teleport;
  the line names such a document alone, with no position.
- **#141** (built `1316b01`): after a camera move the focus goes to the
  document under the view's centre, else stays with the held focus while
  any of it is in view, else goes to the innermost account or board
  region holding the centre; the ring is clamped to the view.
- **#143** (built `24ff9d5`): a link's card draws as its lineage
  only the claims made by the owner of the link each declares superseded
  — the account of the claim's home is `old`'s account, on both sides —
  a claimant the owner row does not name following its claim; every
  other claim stands behind one line after the rows, with no number,
  whose act lists them in its place as assertions naming their claimant
  ("you" for the reader) and what it is to the links.
- **#152** (built `035735f`): each trail entry records the step
  that left it — the link followed, or the passage carried by the
  permanent addresses of its bytes, never its positions — and every
  one-step move (Back, Forward, a jump to the adjacent entry) lights
  that step at the end it lands on, with the arrival's marks and
  lifetime: Back where it began, the focus returned to it where the view
  shows it at reading scale and the mirror marking it
  `aria-current="location"`; Forward what it marked on arrival; a jump
  across two entries or more nothing. The passage is placed in its text
  again at every read, whatever part it still holds lit, nothing and no
  face where it holds none. Back relights no arrival; this changes
  #136's mark on a return to a notice's entry, which lights the link the
  notice came from only where the move crosses that follow — Forward
  onto it — and never on Back or a longer jump.
- **#153** (built `0c0acd6`): a carried or followed passage lands
  in one of four states, read by one rule — all of it in one piece, the
  outline alone; part, or all in pieces, the outline kept and a line at
  the text's edge beside the landing ("only part of what you selected is
  in version 3 — in 2 places", "the text you were reading" where nothing
  was selected; never "missing", "removed", "deleted" or "compare"; the
  rest may be under withheld text it shows), offering the scene with
  where it came from where that holds it whole and, at a published
  landing, the latest version holding it whole; none, unchanged;
  couldn't tell — a size refusal (`too_many_blocks`, `too_many_pairs`,
  `image_too_large`) split into smaller reads first, any other refusal
  landing unmarked with a line saying why, keyed on its code, and "try
  again" where that helps. The line leaves with the outline; no edge
  marks, no refusing or asking first. The focus lands on the first held
  piece or the landing point, the line its description; a drawn link's
  far end and the versions list say the state before departure. This
  changes a follow whose projection the board refuses by a name that
  says nothing of the far document: it lands at that document's head
  with the line, where it was faced at the link's bytes.
- **#154** (built `66ca03a`): a document's versions share its one
  box, which shows one of them — the plain address the trunk head, a
  version's address pinned there — named by the one line's address,
  its marker lit at a pinned version, by the corner, and at mid by the
  box's label; a version move never flies: the camera stays, the box's
  text is replaced, and the passage held — the selection, else the
  first passage in view — matched by `compare` keeps its line on
  screen, what the version holds of it marked; where the version holds
  none of it, the nearest passage the two share keeps the line (the
  version's head where they share none) and the box says the passage
  is not in this version; beams, link marks and per-passage counts
  follow the version shown, lenses, link sets and the mid and far
  counts stay; each move takes a trail entry and Back restores the
  version left at its view; only an act aimed at the box changes its
  version — a version move, or an arrival by an address: a link, a
  typed address, Back or Forward — never a pan, a zoom or a newer
  version's arrival, which pins a box read at its plain address on the
  member being read; the choice lives for the session and is never
  written. This changes #153's none state for a version move: it lands
  at the nearest passage the two versions share, where a carry lands at
  the document's head.
- **#160** (built `8d5f13c`): each feed row naming a document,
  with its `op`, reaches the reading scene's panes showing it, and each
  pane behaves as its document does on the plane, by kind, offering no
  reload. A draft updates in place, the first span in view and the
  selection held on the same words. An edition opened at its bare
  address keeps the version it opened on, its acts naming it; a newer
  version's arrival pins its corner and address to the version shown
  ("version 3 of 4", never "the latest"), says so once, politely, and
  its corner's "read version 4" reads that version in the pane's place.
  The selection, else the first span in view, keeps its line there, and
  the pane says so where that version lacks it. Version 3 stays one act
  away. A pinned pane only updates its "of n". Link rows change marks,
  counts and lines, and formatting re-sets type as a draft update does.
  A pane whose text changes is rebuilt with the scene's ties in one
  step, and an act made mid-update waits for it. Each pane's corner is
  a Tab stop whose accessible name says what the pane shows. Three
  clauses bind what the page does not do yet: a draft is never updated
  while it is being typed in, and rows from this window's own acts are
  those acts' feedback, not news (the page types and writes nothing);
  a scene restored by Back keeps each pane's version (Back restores no
  scene yet).
- **#161** (built with this line): every copy of a non-empty selection,
  on the plane and in a reading scene's pane, replaces the clipboard,
  its preventDefault kept: its plain text is never empty, never
  refused, never the browser's own. It follows the span's items in
  order: text as its text, every other item as a stand-in in square
  brackets in its place, naming its kind in the strings table's words,
  the kind the accessibility tree announces for it — a record, a
  reference, a picture, a withheld run with its owner and length, an
  item this client cannot show with its length; a record type's
  renderer may add the record's own plain contents, the key record its
  key labels and their fingerprints. No item's on-screen rendering is
  copied. A mixed span marks every gap the same way, text never joined
  across one, and adjacent gaps of one kind and owner share one
  stand-in. skep's own clipboard entry is written whether or not the
  span has text. A selection that touches an item covers it whole and
  is drawn so. The page reads no picture cell yet, so a picture is,
  for this client, an item it cannot show, announced and copied so.

## Changes

Each rule changed here, with its reason and where the reason was
found.

- 2026-10-11, from the structure record (`_designs/CLIENT/2026-10-10-frontend-structure.md`
  §3.4, §3.5) and the dev-provider rulings (P-1 to P-12) and the
  structure rulings (S-16, S-24) of the same day:
  - FP-6 gained the search's hits. The LEAP box's search answers are
    model state the old list did not name (§3.4 (v)).
  - FP-11's layer list gained the overlays, the one line and the
    scene, which the structure places beside the plane, text, beams
    and navigation (§3.4 (i)); and it now says how the model's
    view-driven needs are computed, because the model reads the
    plane's camera arithmetic and the old sentence could be read as
    forbidding that (§3.4 (ii)).
  - FP-12 no longer says "the one place". The reading scene's panes
    are a second place the page shows real text, so the rule now
    names one reconciler with two targets, and the scene borrows the
    mount (§3.4 (vii)); the first lane builds the shared mount.
  - FP-13's list of controls was short by the LEAP box's rows, the
    mirror, the one line and the cards (§3.5).
  - FP-14 said "never touches the network", which was false of the
    development adapter FP-15 already named as the exception; the
    two rules read together were consistent and FP-14 alone was not
    (§3.5). The rule now says what it meant: the page never dials a
    board, and holds no session token and no key.
  - FP-15's development adapter was "direct fetch to a local daemon".
    The dev provider rulings replaced that with a process outside
    the page, the shell's core over loopback, so the adapter is a
    bridge client, and the page reaches a daemon in no build (P-1 to
    P-12).
  - FP-16 said the shapes are "defined on the Rust side", which the
    wire's frame answers could not satisfy on their own (§3.5, §5.2);
    the ruling S-16 (a) settled it by generating the page's
    declarations from the shell's core, whose types follow the wire,
    and serving them from the dev provider.
- 2026-10-19, from issue #6 (zooming in showed a document's bars
  under its newly mounted text, and zooming out left an empty box):
  FP-8 now names the dirty frame's order. The canvas used to draw
  against the mounted set of the frame before. On the frame that
  crossed the mount threshold it drew bars the text then covered, or
  yielded to text that was then taken down, and it kept that picture
  while the camera rested. With the text layer placed first, the
  canvas reads the same frame's set.
- 2026-10-20, from the focus and keyboard record
  (`_designs/CLIENT/2026-10-20-focus-and-keyboard.md` §2, §5) and the
  owner's rulings on it: FP-20 added. The page kept two ideas of where
  the focus was — the walk's position, drawn as a ring on the canvas
  and read by every chord, and the platform's focus, the element the
  keyboard and a screen reader actually hold — and five modules each
  moved the platform's focus on their own, differently: the mirror
  carried it across its rebuild while the one line and the overlay
  host dropped it to the body; the host remembered an opener only when
  it took the focus, the LEAP box and the scene always; "a key made
  it" was read four ways; the first control an overlay focused was its
  dismiss. Each fix repaired one module against one issue, and the
  next review found the same question unanswered in the next module.
  FP-10 already forbade a piece of state with five writers; FP-20 says
  so of the focus and names the owner, so the stream of one-module
  focus fixes ends.
- 2026-10-22, from issue #15 (what happens when a document is longer
  than its cell) and the design decision on it — the document folded
  inside its cell into equal columns of fixed depth at one line
  length, broken at the lines as actually rendered, the passage being
  read kept in place when it is set again:
  - FP-12 now says how an article is laid out: once, in one column at
    the measure, its lines read as the engine set them, then parted at
    those lines into its fold's columns; and that the reconciler lays a
    document's text out hidden before its first mount. The page used
    to set the article's face from the document's length, its line
    length with it, and to clip the article at its box wherever the
    lines it planned and the lines the engine set parted. Columns of
    a fixed depth hold their rows only where they break at the lines
    the engine set, which only a layout can read, so the reconciler
    that lays the text out is the one that reads them. The panes are
    one column each at the plane's measure, which the rule now says.
  - FP-8 now says that where the document being read is set again,
    the camera is re-anchored on the passage being read before
    anything is placed. Folded, a re-set that moves one line moves
    every line after it, across the columns as well as down them, and
    a step to a smaller size moves them all; the camera stood where it
    was, so the passage being read could leave the screen, or change
    size, between two frames, and nothing brought it back.
- 2026-10-22, from issue #122 (readable documents past the text cap
  showed bars and ignored clicks) and the design decision on it — no
  document at reading size is ever drawn as bars, every readable
  document mounted, by visible line, the cap made a limit on a frame's
  new mounts, the lines holding the caret, a selection or the focus
  kept:
  - FP-12 no longer names a cap. A ceiling of eight articles left
    every readable document past the eighth as bars a click could not
    reach, at the size the others were text. Every readable document in
    view now stands, so the rule bounds the cost by the screen instead:
    a document stands by visible line, cut from the one column its lines
    were read in, and the limit holds only the new mounts below reading
    zoom. The rule now says which lines stay, because a line holding
    the selection or the focus that the view took down would take the
    platform's selection or focus with it.
  - FP-8 now says the canvas draws or yields by line. With a document
    standing by line, the frame's mounted set no longer says which of
    its lines are text; drawing by document would draw bars under text,
    or leave lines empty, wherever only part of a document stands.
- 2026-10-23, from issue #153 (a carried passage the landing held only
  part of was outlined and said nothing of the rest; one whose read the
  board declined landed unmarked and silent) and the design decision on
  it — four states read by one rule, a line beside the landing for part,
  pieces and couldn't tell, size refusals split into smaller reads, the
  line the description of the item the focus lands on, the state said
  before departure where a read knows it: FP-21 added. The page read
  what a landing's text held of a passage at four sites, each its own
  way — the carry by its counterparts, a follow by whatever runs its
  projection named, the versions list by the sum of its pairs' widths,
  which read a half held twice as whole, and a drawn far end by whether
  it floated at all — and an outline meant all of it at one site and any
  of it at the next. The rule names the one reading and what an outline
  alone promises, so the next surface that lands a passage, or speaks of
  one before departure, says the same four things.
- 2026-10-23, from issue #154 (moving between versions of one document
  flew to the version's own landing, and a member's text, once read,
  was mounted over its document's box) and the design decision on it —
  one box a document showing one version, named by the line and the
  corner, version moves made in place with the passage held keeping its
  line, and only acts aimed at the box changing its version:
  - FP-22 added. The page held no idea of which version a box showed:
    every surface took a version member as a document of its own, so a
    member read beside its edition, or by a LEAP, was mounted over the
    edition's box (issue #12's boundary note, which the gate held as an
    expected failure), the versions list's read act flew to the
    member's own landing, and the text layer, the canvas, the walk, the
    line, the corner, the links and the reads each answered "which text
    stands here" their own way. The rule names the one owner and what
    each surface reads from it, so the next surface that draws a box
    draws the version shown.
  - FP-7 now names the version each box shows as view state: the
    decision keeps the choice for the session and writes it nowhere.
  - FP-8 now names a box taking another of its versions among the
    re-sets that re-anchor the camera. A version's text breaks its lines
    elsewhere, so the passage held left its line on the frame the box
    took the version, and the decision keeps it there.
  - FP-12 now says each box stands as the version it shows: with every
    held version a candidate for the mount, two articles stood in one
    box.
- 2026-10-23, from issue #160 (a reading scene's panes said nothing
  when their document changed, and kept what the model no longer held)
  and its design decision. Every row now reaches the panes showing its
  document, each pane follows the feed by its kind, and each pane is set
  again in one step:
  - FP-23 added. No feed row reached a pane, so an edition opened at its
    bare address went on saying "the latest version" after a newer one
    arrived. The page's death left a pane's text standing after the page
    fell to guest class, and the ARIA mirror's items quoting it, until the
    walk next moved. Ties were measured from the live model but
    mapped through the pane's old text, and a copy from a pane named the
    bare address, not the version it showed. On the plane, a draft set
    again kept the reading position, not the words. The plane and the
    scene each answered "what does a change to this document do here"
    their own way. The rule names one answer by the document's kind, so
    the next surface that shows a document follows the feed the same way.
  - FP-7 now names the version each reading scene's pane reads as view
    state, beside the version each box shows: the scene keeps it as its
    own and never writes a box's pin.
- 2026-10-23, from issue #161 (copying a span that holds no text — a
  record, a reference, a withheld run — emptied the clipboard) and its
  design decision: FP-24 added. The copy's plain text was the span's
  content bytes alone, and the platform's copy was prevented, so a span
  of a record alone left the clipboard empty and whatever it held
  before gone, and a span across a withheld run glued the text before
  the run to the text after it, separated passages pasted as adjacent.
  The ARIA mirror announced no kind for a record, a reference or an
  item not shown, and read a record's raw value aloud, so the copy had
  no announced kind to agree with; and a selection across a withheld
  run's face was never drawn over it, though its span and its copy
  carried the run. Each answered "what stands for an item that holds no
  text" its own way. The rule names one item rule that the mirror and
  the copy both read, so the next surface that shows or copies an item
  names it the same way.

## What these rule out

A framework scheduler beside the frame loop. Data binding on the
plane. A module with its own copy of state. A build step between the
source and the page. A page that fetches, or that holds a secret.
