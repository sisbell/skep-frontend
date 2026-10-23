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
  selection, the trail, the hover. It is never written to any record
  or sent over the bridge. The spike proved the camera writes nothing;
  the gate keeps proving it.
- **FP-8 Render is a function of model and view state.** On a dirty
  frame the text layer is placed first, so what is mounted is decided
  before anything is drawn; where the document being read is set
  again on that frame, its columns broken anew, the camera is
  re-anchored on the passage being read before anything is placed,
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
  however many there are. Below reading zoom a stated limit holds the
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

## What these rule out

A framework scheduler beside the frame loop. Data binding on the
plane. A module with its own copy of state. A build step between the
source and the page. A page that fetches, or that holds a secret.
