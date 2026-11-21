"""EDITOR — the editor's states (B3-S1 … S13, the rows of the editor's
frontend prep survey's state table) driven against the harness's own
provider on 8744 and shot at the desktop width and at NARROW_PX.

The owner's prelude runs two providers over the test board, the gate's own:
the one on 8742, which every case reads and none arms or writes through,
and the harness's on 8744, which this case alone arms and fires through the
dev provider's script seam (`Context.arm`, `Context.fire`), by the harness's
own requests, and alone writes through. The page is opened on it
(`Context.open_editor_page`: `port=8744` and that provider's secret), its
session signed as the test board's principal. Its first page boots without
D6's machine, as every page the gate opens does: what it types in the
seeded draft stays page-local. Its last page asks for the machine
(`machine=1`) and writes — only to a draft the case mints for itself there
(`MINE`): its typing is composed, sent and kept by the real board, and its
held, refused, handed-over, moved, halted, full and second-window rows are
driven by arming that provider's `op`, `held` and `resolve` answers and
firing its events, each word checked against `strings.js` (`machine_rows`).
The words the board has not kept carry the margin's marks where the design
draws them (B3-S2; the editor design's J5, the layout page's round-2 close
D8), read from the gate's `margin` hook: a line merely held carries none
(`held-in-session`); a refused run, a hand-over and a change the held
store's bound refused carry the refused mark beside their words; a moved
document's carry the held bar; and after the machine's rows the page is
opened again over an armed `held(session)` list, the line it names applied
over the draft's text with the held bar from its first line to its last and
"held" once in the edge beside it, lifted as a `held` event lands the line
(`held-bars`, `reopen_rows`). A reading scene's pane that is the draft's
editor carries the same marks beside the same words, in the pane (skep-frontend
#680), read from the same hook by the pane each stands in: a line merely held
there unmarked, a refused run's bracket on the pane's facing side — carried by
the pane's scroll, its top held at what the pane's held head covers and gone
under it, a face leaving its line past it, and in pane B side by side open
toward the text on its left — (`pane-refused`), and a moved line's held bar
with "held" once in the pane's edge at its top, lifted as the line is
discarded (`pane-held-bars`).
Starting a document, select-all and the launch are driven there first (`start_rows`; B3-S1 THE START and THE LAUNCH,
B3-S8): the LEAP box's creation row at its foot over a first line nothing matches (`start-row`); Tab and Enter there
minting a draft and sending the line as its first burst, both kept by the test board, the one line saying the mint
(`mint-row`); Mod+A at the caret in that draft selecting it whole (`select-all`); and the page opened again landing at
the draft the case last wrote in, the run that write placed outlined, the caret live at its end and the one line saying
why (`launch`) — the launch's reads a figure.
The paste and the cut at the caret are driven there after them (`paste_rows`; B3-S5 (ii), (iv)), each event made
through the gate's doors — the app's own listeners run over a clipboard the door makes, the system's never read or
written: plain text pasted at the live caret, kept by the board as one `insert`, taken out and put back by Mod+Z and
Mod+Shift+Z with the caret where each leaves it (`paste-plain`); a kept word cut — the door's clipboard's two flavors,
the `delete` its commit sends and S4's mark at the removal — put back by Mod+Z, and its own clipboard pasted, the same
word placed again by its identity and taken out alone by Mod+Z (`cut`); and a paste at the kept caret's span returning
the caret and placing its text (`paste-kept-caret`). The same words pasted by identity follow them (`same_rows`; B3-S5
(i), (iv)): a word of the first edition copied by the copy door and pasted as one `reinstate` of its bytes, and words
of VERSIONED the page holds no record of read by `retrieve_i` first (`paste-same`); a cut's own clipboard pasted, a
`delete` then a `reinstate` of the same run (`paste-after-cut`); a word placed again in its own draft and its undo
taking out the copy alone (`paste-own-draft`); words another page's load typed placed as new bytes (`paste-unminted`);
a copy's plain text changed at the same lengths placed as new bytes, the paste's face saying so (`paste-forged`); each
source refusal armed at the paste's `reinstate`, nothing placed, the caret where the paste was made, the face in its
words (`source-faces`); and the
`reinstate` held, "not yet kept" (`paste-held`). The paste at a published target follows (`published_rows`; B3-S5, the
paste survey's P8): a word of the own draft copied by the copy door, then at the first edition's span Mod+V's keydown,
made as a script makes one, left standing, and the paste door answered by C-45 naming the document, C-241's statement
naming the own draft beneath it and the staging act standing inert, its press saying its reason — nothing placed and
nothing sent, the test board's position unmoved (`published-target`).
A draft's history follows them on the same page (`past_rows`; B3-S7, skep-frontend #661, #662, #585, #617): the kept
line's second act, "show its history", at one place whichever kept word stands, every word of the corner inside the box it
stands in, reached by Tab, → and Enter (`corner-act`; issue #694); two lines typed a minute apart and kept, then the act —
the scene on the draft beside its state before its
newest change, that state the test board's text at the position the row below the top row ends at, the history read a
figure — then `changes` armed once the page is quiet with the draft's own rows and three of the harness's, the list's days
and rows in the strings table's words, the past pane's corner, the bands, side by side and stacked, the current pane's
corner split at the narrow width (`read`), then stacked between those widths with the past pane's corner beside its column,
led by its title, the pane's name the AX tree computes the same at all three (issue #687), and the current pane's corner
beside its column too, its kept line's act on a row of its own, every word of it inside its content box (issue #694);
`changes` armed with the
draft's newest row alone, the act opening on that row's state, pane B's corner saying it is how the draft stands now on one
line inside its slot, that line the pane's description (`now`); `changes` armed with a row of the draft's in another minute
than its newest change alone, the act opening on that row's state as how the draft stands now, then the newest change handed
in as the feed hands a row, the line gone from pane B's corner and its description in the call that hands it in, before any
frame (`now-moved`; skep-frontend #697); `changes` armed with the draft's rows up to the line before its newest change and a
signed hand's row in that line's minute above them, pane B's corner saying after its title that its state is not its
minute's last, its count in its box, on a held row, and pane B described so (`not-last`); `op` armed to refuse the state
before the newest change as `scan_busy`, pane B's corner read in the frame the in-flight clause first stands — "reading
⟨time⟩", the one running mark on its own busy element, the line saying the history is busy, pane B named by its title, the
line and its address and described by the clause — and again as the state asked lands, the clause gone (`in-flight`;
skep-frontend #696, #702); `op` armed to refuse that state as `internal_panic`, the line saying it could not be read as it
stood and that the board refused the read, the refusal's name set as code, "read it again" beneath it, the asked row "not
read", pane B named by the line too — then the act pressed, the test board reading the state (`unread`; skep-frontend
#702); and a held line,
the act opening on the newest kept state under "now — not yet kept" (`unkept`) — every word of both panes' corners inside
the box it stands in at each (issue #678).
The editor pane follows them (`pane_rows`; skep-frontend #556, B3-S1's scene rule, B3-S13): a reading scene's pane holding
the case's own draft typed in, its keys answered by its own lines, the way back to the kept caret, and the close re-taking
the caret (`pane-typed`, `pane-lines`, `pane-way-back`, `pane-close`); and a paste made in a pane faced where it was made
(B3-S5; the paste survey's P6): the source refused `withheld` at a word of pane A, the caret and the pane standing where
the paste was made, the face over the scene inside the pane, carried by its scroll and letting a wheel through to it
(`pane-source-face`); a forged copy pasted in pane B of a scene
opened from the first edition, the face standing there whatever the walk under the scene stands on, gone once the focus
goes into the edition's pane (`pane-forged-face`); and a removal of kept text made at a caret in a pane faced there (B3-S4;
skep-frontend #674): its mark in pane A level with the caret's line over the scene, pressed with the pointer opening its
face whole in the pane, the focus and the live caret standing there, a wheel over it moving no camera, the pane's scroll
carrying it and Mod+Z taking it down; a mark in pane B clear of its corner; and a removal made on the plane standing in
pane A as the scene opens over its draft (`pane-removal`). The margin's marks follow in the pane (B3-S2; skep-frontend
#680): a refused run typed at a word of pane A (`pane-refused`), and a line held moved there (`pane-held-bars`).
The whole document's entry is a figure (`whole_entry`): the seeded staging draft selected whole and copied through the
copy door, on the first page.
Undo, redo and the deletion face are driven there too (`undo_rows`): Mod+Z on
an empty stack, its line and the constant sentence (`undo-lines`); a removal
of kept words, the deletion face at its commit (`deletion-face`); the undo
and redo of a removal and of a run of typing as `delete` and `reinstate` on
the test board; and, armed, an undone run's held line dropped, a drop owed
where the landing cannot be read, an undo declined `withheld`, and an undo at
a refused run answered at its face.

STATES is the table: each row a screen, a state, how the page is brought to
it — a hook, keys, an arm of a call's next answer, an event fired by hand —
and the walk step B3 names for its screen. A row the page draws at HEAD is
driven and CHECKED — the words a person meets are `strings.js`'s entries for
the state and stand inside the window, a document's text at the reading
size, an arm consumed where one was made — at the desktop width and again at
the narrow one, and shot at each as
`shots/B3-<Sn>/<state>-<walk>-<step>-w<width>.png`. A row whose surface is
not built stays in the table marked not drawn, naming the module or unit it
waits on, and is never shot. A check that fails leaves its row red with the
detail, unshot; one marked at a width with the page issue it waits on counts
expected there while it fails, the row reading expected red with its detail
and shot as the issue's evidence (`shoot`). The seam keeps one armed answer
per call until it is served, and the provider outlives the run: each arm is
checked consumed before the next state, and any arm left standing is served
at the end (`Context.clear_arms`). The dotted route's intake (#327) is
proved on the page's own port: a canned `publication.open` answer reaches
the page as armed, and a `publication` event fired by hand reaches its
subscriber. At each of the three kept words the own draft's corner's every
word stands inside the box it is set in — beside its column at the desktop
width, its kind's slot, its kept word's box and the corner's content box,
at the page's spacing and again at the reader's (WCAG 2.2 SC 1.4.12), and at
its head at the narrow one, each slot of its rows too — 1 px either way, the
worst excess a figure (`fit_part`; issues #678, #694); and its kept line's
second act stands at one place in the corner whichever of the three words
stands, half a px either way (issue #694). At the narrow width, where the own draft's corner
stands at its head, the live caret moved up under the head's held row brings
the camera down alone, the caret's mark at the row's bottom
(`caret_under_head`; issue #436). A person's click in another paragraph of the own draft places the
caret there and stands the walk on that paragraph's span, Mod+K at the caret
drawing the acts card there and selecting nothing (`click_follows`; B3-S13;
issue #471). A drag across two words of the own draft leaves the caret live
at its release, the selection standing, and a key then puts its character in
the words' place, one edit (`drag_typed`, B3-S1's `drag-typed` row); every
other pointer route to a selection there — a drag backward, a double-click on
a word with the page's frames running between its presses, a Shift+click
from the live caret, from the kept caret and from
nothing — leaves the caret live at the selection's moving end, Esc ending the
selection before it keeps the caret (`drag_routes`; FP-40; D5 K-70, K-72,
K-77). Shift with the arrows at a live caret moves it and runs the
selection from where it stood to it, the platform's selection the page's
(`shift_extends`; D5 K-71); a printable key or Backspace there then replaces
that selection, and an arrow without Shift ends it, the caret at its start
for ← (`shift_replaces`; D5 K-72; D6 BM-75). End and Home at a live caret in
a wrapped paragraph move it to its line's end and its start, the camera and
the walk standing, and a LEAP to another paragraph of the draft leaves it
kept, its mark hollow, a printable key there answered by the draft's own
line (`home_end_leap`; D5 K-71, M-13, M-2). With the caret kept by Esc
after typing, the wheel turned a few lines over the plane, the caret's
paragraph still in view and another element under the view's centre, leaves
the walk on the kept caret's span, and a printable key there types at the
kept caret (`kept_span_held`; B3-S1; D5 §4 rule 3). Shift+→ and Shift+← at
the kept caret's span return it and extend a selection from it a character,
the platform's selection the page's, and at the draft's first position, K-8's
selection standing, Shift+← returns the caret and the platform's selection
stands over K-8's span, never collapsed at the caret (`kept_span_extends`; D5
K-70, K-77). With `ab` typed at a paragraph's start and the caret kept, ↓
walks to a later span, and the block the platform draws lit is that span
where the text shown holds it, past `ab` (`lit_after_typing`; D3; D5
§4 rule 2). With a line typed above a paragraph — text the board does not
hold — the walk, the find and Back each land on the typed words, at both
widths (`typed_lands`; the unsent-typing decision). Tab from the plane's stop
on the own draft takes the focus to its corner's stop — its first act where
it holds acts, else the corner — where a printable key raises the line
naming the way back to the draft's text beside that stop, at both widths,
and Shift+Tab then returns the focus to the plane's stop, where the
next key is answered by the draft's own line (`corner_key`, `corner_back`;
B3-S13; D5 K-72; D6 BM-52).

The own draft is the seeded board's windowed draft of principal 1 (`OWN`,
1340 bytes). The seed's staging draft (`STAGING`) holds every edition's
bytes — 6.27 MB at the owner's seed — which a LEAP reads the first part of
and a scene pane cannot show, so it is not the one driven: it is landed at
once, for the whole document's entry.

The case's own write check runs over the harness's provider's log, where
`wire.py` (which reads the gate's) sees nothing of this: every dial a route
the read path dials too (`wire.READ_PATHS`), every call a reading row
(`wire.READ_ROWS`), or a `publication.*`, `merge.*` or `resolve` call logged
`canned`, and every `op` frame the pages sent that is no read (`READ_OPS`)
the mint of the case's own draft or a write naming that draft — no write
frame names a seeded document. The test board's `/health.log_position`
before and after is a figure. The signed page on the gate's provider is
opened again at the end, for the cases' order and the driver's close
count."""
import copy
import json
import math
import re
import time
from collections import Counter

from . import DOC, VERSIONED, Result, WINDOW, corner_fit, drawn_keys, heard, named_as, trunk_of
from .layout import EDGE_EM, HEAD_CH, READING_PX, SIDE_GAP_PX
from .wire import READ_PATHS, READ_ROWS, read_ops

# the own draft: the seed's windowed draft W of principal 1 (`WINDOW[2]`), text the person may edit (issue #411)
OWN = WINDOW[2]
# the seed's staging draft D of principal 1: 6.27 MB at the owner's seed, every edition's bytes inserted into it in turn
STAGING = '1.0.1.0.2'
# the two widths every drawn state is shot at (the survey's "a desktop and a narrow width"): the driver's desktop size, and
# the editor's narrow width, the NARROW frame of B3's layout page
WIDE = (1440, 900)
NARROW_PX = 390
NARROW = (NARROW_PX, 900)
# each kept word's string (T-ARTICLE's KEPT_WORDS)
KEPT_IDS = {'kept': 'B3.kept', 'not yet kept': 'B3.not-yet-kept', 'not kept': 'B3.not-kept'}
# the seam's own route, which the provider logs as no call of the page's
SEAM = 'script'

# THE TABLE. `how` says what reaches the state; `claim` what a person meets, which the check holds the page to; `drawn`
# whether the page draws the state at HEAD, with `why` naming the module or unit a state not drawn waits on
STATES = [
    # B3-S1 — a new document of the person's own: the kept state at the corner, the kept caret (W-08 steps 2–3)
    dict(screen='B3-S1', state='kept', walk='W-08', step=2, drawn=True,
         how="`write.setKept(own, {word: 'kept'})` — D6's machine's word, set by the gate's hook",
         claim='the corner shows "kept" (B3.kept) — beside its column alone on its row, the kept line\'s second act "show its history" (B3.past-states) starting the row beneath it, every word of the corner inside its content box at the page\'s spacing and the reader\'s; at its head in its fixed-width slot, the act after it — the act at one place in the corner whichever of the three words stands'),
    dict(screen='B3-S1', state='save-answered', walk='W-08', step=2, drawn=True,
         how='Mod+S at the corner while the word is kept (K-74)',
         claim='the statement opens whole on its own line, a sentence: "Nothing to save — everything here is kept." (B3.save.kept)'),
    dict(screen='B3-S1', state='caret-placed', walk='W-08', step=2, drawn=True,
         how="Enter at the walk's focused span of the own draft (K-70)",
         claim="the page's own caret stands live at the span's start, its mark in the text"),
    dict(screen='B3-S1', state='caret-typed', walk='W-08', step=2, drawn=True,
         how='printable keys at the live caret (K-72): one page-local edit, the text shown through the derived record',
         claim='the typed characters stand at the caret, the caret moved past them, nothing sent'),
    dict(screen='B3-S1', state='caret-kept', walk='W-08', step=3, drawn=True,
         how='Esc at the live caret (K-77; D6 BM-4, BM-52)',
         claim="the text is left to the walk at the caret's span, the caret kept there and its mark hollow"),
    dict(screen='B3-S1', state='drag-typed', walk='W-08', step=2, drawn=True,
         how='a drag across two words of the own draft, then a printable key (FP-40; K-70, K-72)',
         claim="the key's character stands in the dragged words' place — one edit — the caret live after it, its mark shown"),
    dict(screen='B3-S1', state='start-row', walk='W-08', step=2, drawn=True,
         how="Mod+L, then a first line typed into the LEAP box that no address or first line on the board matches (K-30, K-33)",
         claim="the box's answer carries at its foot, beneath the no-match line (F.leap.none), the act \"Start a new document with this as its first line\" (B3.start-document), inside the window, the box holding the focus; one Tab from the input stands on the act, ahead of every row's \"open beside\""),
    dict(screen='B3-S1', state='mint-row', walk='W-08', step=2, drawn=True,
         how="Tab, then Enter at the creation row, the machine handed in (`machine=1`): the mint and the typed line's first burst on the test board (A-1, A-63)",
         claim="one `create_new_document` into the acting account, born private, then the typed line as one `insert` in the draft it minted, each acked; the camera at the new draft at its reading scale, the trail's newest entry, the caret live at the end of the first line and the corner reading \"kept\" (B3.kept); the one line says the mint until the next act — the minted address, who can read it in its corner's chip's words (B3.mint.private; L.mint.private.flag-on where local trust is on) and, at the session's first mint, that a document stays (B3.mint.stays) — whole inside the window, beneath the line's rows where they leave it no room"),
    dict(screen='B3-S1', state='launch', walk='W-08', step=7, drawn=True,
         how="the machine's page opened again after the case's own write — a second paragraph typed at the caret of the draft it minted (D6 BM-53)",
         claim="the page lands at the draft the case last wrote in, at its reading scale, as the trail's one entry: the run the write placed outlined as an arrival, the caret live at its end, and the one line saying why, \"you last wrote in ⟨label⟩\" (B3.last-wrote), the label the draft's first line, whole inside the window"),
    # B3-S2 — the kept state and the held text (W-08 step 7 and its failure arms)
    dict(screen='B3-S2', state='not-yet-kept', walk='W-08', step=7, drawn=True,
         how="`write.setKept(own, {word: 'not yet kept'})` (D6 BM-8)",
         claim='the corner shows "not yet kept" (B3.not-yet-kept), its kept line as at "kept", every word inside its box and the act where it stands at "kept"'),
    dict(screen='B3-S2', state='not-kept', walk='W-08', step=7, drawn=True,
         how="`write.setKept(own, {word: 'not kept', reason})`, the reason the refused run's own-bug words (D6 BM-10)",
         claim='the corner shows "not kept" (B3.not-kept), its kept line as at "kept", every word inside its box and the act where it stands at "kept"; Mod+S would answer with the reason'),
    dict(screen='B3-S1', state='kept-on-board', walk='W-08', step=2, drawn=True,
         how="the machine handed in (`machine=1`): keys typed at a caret in the case's own minted draft, committed at their punctuation (D6 BM-1, BM-2, BM-6)",
         claim='the typed words reach the test board as one composed `insert`, acked, and the corner reads "kept" (B3.kept); the read that follows holds them and the page\'s edits are gone, the text shown the same'),
    dict(screen='B3-S2', state='held-in-session', walk='W-08', step=7, drawn=True,
         how="arm `op` to answer `held` and `held` to list the line; type; fire `daemon` unreachable (D6 BM-8, BM-78)",
         claim='the corner reads "not yet kept" (B3.not-yet-kept), its reason on the word\'s own act, a sentence — "Not yet kept — held on this device and sent when your notebook answers." (B3.kept.held) — the daemon segment in its held form (B3.daemon.held.notebook), the held words standing in the text with no margin mark beside them: a line merely held is unmarked (J5)'),
    dict(screen='B3-S2', state='held-bars', walk='W-08', step=7, drawn=True,
         how="arm `held` to list an insert line of the case's own draft, then open the machine's page again: the line applied at the open (D6 BM-29); fire `held` naming it landed (BM-25)",
         claim='the held words stand before the draft\'s first line with one held bar beside them from their first line to their last and "held" (B3.held) once in the edge at its top; the `held` event landing the line lifts the bar and the word'),
    dict(screen='B3-S2', state='refused-run', walk='W-08', step=7, drawn=True,
         how='a `held` answer and a `held` row carrying `refusal: out_of_bounds` (D6 BM-10)',
         claim='the corner reads "not kept"; the run\'s words carry the refused mark at their column\'s edge; the corner\'s act opens the face under the head "not kept" (B3.not-kept): the own-bug words, then "send again" (inert), "copy these words out", "discard this change", the discard\'s statement in two lines below the acts (B3.refused.discard)'),
    dict(screen='B3-S2', state='hand-over', walk='W-08', step=7, drawn=True,
         how='a `held` row carrying the shell\'s `answers_lost`; `resolve` armed `landing_unread` (D6 BM-26, BM-27)',
         claim='the run\'s words carry the refused mark; the face names the board and the time elapsed (B3.answers_lost), its discard\'s statement its own (B3.answers_lost.discard); the read unanswered, "did not answer — nothing was discarded" (B3.answers_lost.unanswered) and the face stands'),
    dict(screen='B3-S2', state='moved-face', walk='W-08', step=7, drawn=True,
         how='a `held` row held moved with `arrangement_moved` and its hands (D6 BM-13, BM-16, BM-17, BM-18)',
         claim='the corner reads "not yet kept" and carries the face beneath it, before the chip, no overlay showing it, the corner reaching into no other document\'s box and clipped by nothing, every word of it inside the box it stands in — beside its column the face\'s acts inside its content box at the page\'s spacing and the reader\'s, an act\'s words wrapped between them and never cut — compact where the corner stands at its head, "changed while this text was held — not placed · by desk" (B3.moved.compact) standing inside its row, named and described as a screen reader hears them, the device\'s label as written (style S22), whole on its act — the face saying the document changed (B3.moved) and naming the hand in its slot (B3.hand.device), each a sentence, with "see the held text", "send again" inert (B3.moved.send-again.inert) and the discard, its statement ending on its exit (B3.moved.discard); the kept word\'s act opens its statement; the held words carry the held bar while the face asks about them (D8)'),
    dict(screen='B3-S2', state='moved-scene', walk='W-08', step=7, drawn=True,
         how='`scene.openHeld(own, [an insert row])`: the current text beside the held version re-derived (D6 BM-14; #411)',
         claim="a scene stands with the own draft in pane A and the derived record in pane B, derived, no compare asked; both panes' "
               "text at the reading size, no word cut at a pane's edge; the bar's re-level and dismiss acts in view"),
    dict(screen='B3-S2', state='stopped', walk='W-08', step=7, drawn=True,
         how="fire `daemon` {board, state: 'stopped'} (D6 BM-9)",
         claim="the one line's daemon segment in its own-board stopped form (F.daemon.notebook.stopped)"),
    dict(screen='B3-S2', state='writes-halted', walk='W-08', step=7, drawn=True,
         how="arm `health` with `writes.halted` true before the page's boot (D6 BM-9)",
         claim="the one line's daemon segment in its halted form (F.daemon.notebook.halted)"),
    dict(screen='B3-S2', state='keyless', walk='W-08', step=7, drawn=False,
         how='the provider run with `--session bare` (D6 BM-58)', claim='',
         why="no seam reaches it: the harness's provider runs `--session signed`"),
    dict(screen='B3-S2', state='death-retired', walk='W-08', step=7, drawn=True,
         how="fire `session-died` {session, reason: {arm: 'retired', …}} (D6 BM-24)",
         claim="the line's death arm, C-137's words with sign in, each in view, and the own draft covered as a guest meets it"),
    dict(screen='B3-S2', state='halted-store', walk='W-08', step=7, drawn=True,
         how='arm `held` with the refusal `store_halted`, its `why` damaged; fire `held` (D6 BM-30)',
         claim='the one line reads the halt\'s damaged form, what becomes of the words it holds and its cause, each a sentence (B3.store_halted.damaged, .unsent, .damaged.cause), with "show the file" (B3.show-file); a key at the caret adds no edit and is answered by the halt\'s caret line (B3.store_halted.caret)'),
    dict(screen='B3-S2', state='second-window', walk='W-08', step=7, drawn=True,
         how="fire `another-window` {board, another_window: true} (D6 BM-60)",
         claim='the one line reads "this window reads only and keeps nothing you type — …" (B3.another_window) with "copy this address" (B3.copy-address); a key at the caret adds no edit and is answered by that line'),
    dict(screen='B3-S2', state='held-full', walk='W-08', step=7, drawn=True,
         how='arm `op` with the refusal `held_full`; type; then fire `held` kept as the store drains (D6 BM-19, BM-20)',
         claim='the one line reads the bound\'s line (B3.held_full.line); the refused change carries the refused mark and waits under the head "not kept" with its statement (B3.held_full.refused), "send again" inert; a key at the caret is answered by the bound\'s caret line (B3.held_full.caret); as the store drains the page sends the waiting change itself'),
    # B3-S3 … B3-S13
    dict(screen='B3-S3', state='undo-lines', walk='W-08', step=5, drawn=True,
         how="Mod+Z in the case's own draft before anything is typed in it — an empty stack (K-75; D6 BM-42) — then the hint's own act",
         claim='the hint beside the focus reads "Nothing to undo in this draft this session — its past states hold what came before." (B3.undo.empty), whole at its first press in the session and ending on the constant sentence, "A link you made public stays until you retract it at its card." (B3.undo.constant), inside the window below the one line and said in the status region; a later press shows its first clause alone, and its act opens it whole again; nothing is sent'),
    dict(screen='B3-S4', state='deletion-face', walk='W-08', step=8, drawn=True,
         how="Backspace over kept words at the caret in the case's own draft; the burst's commit composes the `delete` (D6 BM-51)",
         claim='the deletion face stands whole at the removal point, in the margin beside its line or over the lines beneath it — "still here — for as long as this board retains it; …" (C-49), then "you alone can still reach what you remove" (B3.deletion.private) — its mark named "removed here" (B3.removed-here), inside the window, taking no focus and no key: the caret stands live where it stood; the `delete` reaches the test board and is acked'),
    # B3-S5 — the paste and the cut at the caret (W-08 step 4); what the same material, the published target, the quote and the
    # carrier wait on
    dict(screen='B3-S5', state='paste-plain', walk='W-08', step=4, drawn=True,
         how="the paste door at the live caret in the case's own draft, the machine handed in: a paste event over a clipboard of the door's holding plain text, its line ending a CR LF (D5 K-93)",
         claim='the text stands at the caret as typed text does, each CR LF a line feed, the caret live after it; it reaches the test board as one `insert`, acked, and the corner reads "kept" (B3.kept); it is one step of the undo stack, no run of typing'),
    dict(screen='B3-S5', state='cut', walk='W-08', step=4, drawn=True,
         how="Shift+→ from the caret over a kept word of the case's own draft, then the cut door: a cut event over a clipboard of the door's (D5 K-93; D6 BM-51)",
         claim="the door's clipboard holds two flavors — the word as plain text, and skep's own entry naming the board, the draft and the word's bytes by identity, never its positions; the word leaves the text at once, the selection ended and the caret live at the removal, one step that is no run of typing and no mark at the act; the burst's commit sends one `delete`, acked, the corner reading \"kept\" (B3.kept); and the removal's mark stands at the removal point inside the window, named \"removed here\" (B3.removed-here)"),
    dict(screen='B3-S5', state='paste-kept-caret', walk='W-08', step=4, drawn=True,
         how="Esc at the live caret in the case's own draft — the caret kept, the walk on its span — then the paste door there (D5 K-93; D6 BM-52)",
         claim='the kept caret is returned live and the text placed at it, the caret after it and its mark solid; one `insert` reaches the test board, acked, and the corner reads "kept" (B3.kept)'),
    dict(screen='B3-S5', state='paste-same', walk='W-08', step=4, drawn=True,
         how="a passage of the first edition (DOC) copied by the copy door, then the paste door at the live caret in the case's own draft, the machine handed in; then the paste door over an entry and a plain text the harness builds of bytes of VERSIONED, whose record the page lets go first, read through the page's port (the paste survey's W5)",
         claim='one `reinstate` whose runs each name as `origin` the document that minted the copied bytes, acked; the words stand at the caret by their identity, the caret live after them, and the corner reads "kept" (B3.kept); the test board\'s image of the draft names those bytes there, the text shown carries them as a run of that origin, and its origin stands stated in the column\'s edge; a source the page holds no record of is read by `retrieve_i` of those very spans before its `reinstate`, the same words placed'),
    dict(screen='B3-S5', state='paste-after-cut', walk='W-08', step=4, drawn=True,
         how="Shift+→ over a kept word of the case's own draft, the cut door, then the paste door with the cut's own clipboard at the line's end (B3-S5 (iv))",
         claim='the cut sends one `delete`, the paste one `reinstate` of the same run, each acked: the word moved, the test board\'s line the text shown, the corner "kept" (B3.kept)'),
    dict(screen='B3-S5', state='paste-own-draft', walk='W-08', step=4, drawn=True,
         how="a word of the case's own draft copied by the copy door and pasted at its line's end (the paste survey's O3, W2)",
         claim='one `reinstate` of the draft\'s own bytes: the word stands twice, drawn as the reading path draws it, no mark; Mod+Z takes out the copy alone — one `delete` of it, the word it was copied from standing — and Mod+Shift+Z puts the copy back by a `reinstate`, the caret after it'),
    dict(screen='B3-S5', state='paste-unminted', walk='W-08', step=4, drawn=True,
         how="the paste door over an entry naming the page's own name of words under another page's load — a copy of words that load typed and the board never minted (P51) — beside their plain text",
         claim='the plain text placed as new bytes: one `insert` of it, acked; no `reinstate`, nothing said, the corner "kept" (B3.kept)'),
    dict(screen='B3-S5', state='paste-forged', walk='W-08', step=4, drawn=True,
         how="a word of the case's own draft copied by the copy door, its plain text changed at the same byte lengths, then the paste door (the paste survey's C3, O6)",
         claim='the plain text placed as new bytes — one `insert` of the changed words, acked, never a `reinstate` — and the paste\'s face standing where it was made, in the margin beside its line or over the lines beneath it, inside the window: "These words are not the passage in ⟨source⟩ that came with them on the clipboard — placed as new words, not the same material." (L.paste.differs)'),
    dict(screen='B3-S5', state='source-faces', walk='W-08', step=4, drawn=True,
         how="`op` armed on 8744 with each source refusal in turn — `withheld` (its site the origin), `source_not_registered`, `dangling_source`, `bad_run`, `too_many_runs`, `empty_result` — while the page is quiet, then the paste door over a copy of the draft's own words (the paste survey's W3)",
         claim="each arm taken by the paste's `reinstate`, nothing placed and nothing else dialed — the text as it stood, the caret live where the paste was made and never after the words it was copied from — and the paste's face standing where it was made in that refusal's words: the source withheld naming its origin (B3.paste.withheld), the board saying nothing of it (B3.source_not_registered), else a fault of this client's (L.paste.fault); shot at the withheld face, inside the window"),
    dict(screen='B3-S5', state='paste-held', walk='W-08', step=4, drawn=True,
         how="`op` armed to answer `held` at a paste's `reinstate` and `held` to list that line, then the paste door (the paste survey's W4)",
         claim='the paste\'s one `reinstate` answered `held`: the corner reads "not yet kept" (B3.not-yet-kept), the pasted words standing, no face and no island; the line\'s drop takes them out and the corner reads "kept" again'),
    dict(screen='B3-S5', state='published-target', walk='W-04', step=5, drawn=True,
         how="a passage of the own draft (OWN) copied by the copy door, the page's selection cleared after it; at the walk's span of the first edition (DOC), the paste door with plain text and no entry, then Mod+V's keydown made as a script makes one, then the paste door with the copy's clipboard, the machine handed in (D5 K-72, K-93; the paste survey's P8)",
         claim="Mod+V's keydown there is neither prevented nor answered, nothing placed; the paste event places nothing and sends nothing, the edition's text as it stood and the test board's position unmoved — C-45 at the focus naming the document, whole (C-45), beneath it the statement naming the own draft as the status region names its box (B3.quote.published-target, C-241), and beneath them the staging act \"write the next version in a draft\" (B3.write-next) standing inert, described by its reason (L.write-next.inert), inside the window below the one line, at the text's edge where the room there holds it and else over the lines beneath its site, said in the status region; the door with no entry answered by C-45 and its act alone; the act's press shows its reason beside it and says it"),
    dict(screen='B3-S5', state='cross-board', walk='W-08', step=4, drawn=False,
         how="the paste door over an entry naming another board's origin", claim='',
         why="the owner's O4 ruling: a paste from another board is allowed, only not built — no second board exists, so another board's entry pastes as plain text (arm ii); the cross-board face, B3-S5's arm (v) and C-268, is a design revisit owed once a second board exists"),
    dict(screen='B3-S5', state='quote-pick', walk='W-08', step=4, drawn=False,
         how="Mod+Shift+C at a selection: the destination pick", claim='', why="the quote's slice: the pick overlay is unbuilt"),
    dict(screen='B3-S5', state='quote-inert', walk='W-08', step=4, drawn=False,
         how="the quote's slot at another board's place", claim='', why="the quote's slice: the slot stands inert everywhere with the lane's reason"),
    dict(screen='B3-S5', state='origin-face', walk='W-08', step=4, drawn=False,
         how="a quoted run whose words a shot re-minted: the counterpart-first line", claim='', why='S11: no shot re-mints a run, and the records read is unbuilt'),
    dict(screen='B3-S5', state='paste-digest', walk='W-08', step=4, drawn=False,
         how="a paste whose HTML carrier's digest no longer matches its plain text", claim='', why="B8's carrier: nothing writes the HTML carrier a digest would be read from"),
    dict(screen='B3-S6', state='picker', walk='W-08', step=4, drawn=False,
         how='the type picker over two held passages', claim='', why="the picker module; a pane's selection (#29, #94)"),
    dict(screen='B3-S7', state='corner-act', walk='W-08', step=8, drawn=True,
         how="the case's own draft at its corner, its kept word set to each of its three words by the gate's hook; then Tab from the plane's stop, → and Enter (D5 K-57; skep-frontend #585)",
         claim='the kept line carries its second act, "show its history" (B3.past-states), standing at one place whichever word stands — beside its column on a row of its own beneath the kept word, at its head after it — every word of the corner inside the box it stands in; Tab stands on the kept word, → on the act, and Enter there opens the draft\'s history'),
    dict(screen='B3-S7', state='read', walk='W-08', step=8, drawn=True,
         how="two lines typed into the case's own draft a minute apart, kept by the test board, then the act clicked; then `changes` armed with the draft's own rows and synthetic ones — a signed row, a publication, a row of lost testimony — and the act clicked again, one day's head clicked folded (skep-frontend #661, #662, #617)",
         claim='the scene stands on the draft beside its state before its newest change — the text the board held at the position the row below the top row ends at — pane B named "as it stood ⟨time⟩ · ⟨hand⟩" (B3.history.row) with the chip, the bar and the one line naming it "as it stood ⟨time⟩" (B3.history.as-of), the shared runs banded; beside it the list, newest first, each day\'s head its date or "time not recorded" (L.history.time-unrecorded), a folded day\'s head naming its hands, each row its time of day and what it did in the strings table\'s words, the shown row marked, no word of it drawn across two lines and every timed row\'s time in one slot; side by side both corners at their documents\' heads, both texts at one depth, and the list in a column of its own at pane B\'s outer side, from the panes\' top to the scene\'s foot, as wide as its head needs to hold its stop and both step acts on one line, the two panes one width either side of the whole gutter, each keeping forty characters a line or more; one px either side of the window at which beside the list the panes keep forty characters, the list in its column, then after pane B\'s text, the panes side by side; stacked at the narrow width the list after pane B\'s text and the current pane\'s kept line at its head, the rest of its corner at its foot (skep-frontend #668)'),
    dict(screen='B3-S7', state='reclaimed', walk='W-08', step=8, drawn=True,
         how="once the page is quiet, `op` armed to refuse the read of the state before the newest change as `history_reclaimed`, naming no floor, then the act clicked; then the same arm naming as its floor the top row's first position, and the act clicked again — the shot (skep-frontend #688, #700)",
         claim='naming no floor, the state asked is asked again at the last position it stood, the position before the draft\'s next change — the committed one the board names below it where that lies inside a commit — and never again at the position refused; where it stood at a position of its own past that one, read there and shown as asked, no line; where it stood at its row\'s position alone, the newest kept state — the draft as the board holds it, no state read at or past the newest change — stands in its place under the line naming the board and the time that state stood (B3.history.reclaimed), the list\'s floor mark below its row saying the same; naming its floor, the state is asked no more, the feed\'s row at the floor read as one row of `changes`, and the newest kept state stands in its place under the line saying no earlier state is readable on the board, which keeps states back to that row\'s date (L.history.floor), the floor mark below its row saying the same — no token left in pane B\'s corner either way'),
    dict(screen='B3-S7', state='now', walk='W-08', step=8, drawn=True,
         how="`changes` armed, once the page is quiet, with the draft's newest row alone, then the act clicked (skep-frontend #661, #678)",
         claim='the history opens on its one row\'s state, the current text, pane B\'s corner saying so beneath its title — "this is how the draft stands now" (B3.history.now) — on one line inside its slot; every word of both panes\' corners inside the box it stands in'),
    dict(screen='B3-S7', state='now-moved', walk='W-08', step=8, drawn=True,
         how="`changes` armed, once the page is quiet, with the draft's newest row in another minute than its newest change alone, the act clicked; then the newest change handed in as the feed hands a row (the gate's `model.feed`) (skep-frontend #697)",
         claim='the history opens on that row\'s state, pane B\'s corner and its description saying it is how the draft stands now (B3.history.now); the newer row arriving above it takes those words from the corner and from the description together, in the step that takes the row in — the list holding the row above the state shown, that state still shown and marked, pane B\'s text and its first span in view as they stood, no day opened; every word of both panes\' corners inside the box it stands in'),
    dict(screen='B3-S7', state='not-last', walk='W-08', step=8, drawn=True,
         how="`changes` armed, once the page is quiet, with the draft's own rows up to the line typed before its newest change and, above them, a signed hand's row in that line's minute, then the act clicked (skep-frontend #696)",
         claim='the history opens on the earlier line\'s state, pane B\'s corner saying after its title that it is not its minute\'s last — "one of ⟨n⟩ changes that minute, not the last" (B3.history.not-last), its count the rows of that minute in its box — on a row held at the pane\'s top at its document\'s head, before the chip, nothing folded and no words saying it is how the draft stands now; pane B named by its title then its address and described by the clause, as the AX tree computes them; every word of both panes\' corners inside the box it stands in'),
    dict(screen='B3-S7', state='in-flight', walk='W-08', step=8, drawn=True,
         how="once the page is quiet, `op` armed to refuse the read of the state before the newest change as `scan_busy`, then the act clicked, pane B's corner read in the frame the clause first stands (skep-frontend #696, #702)",
         claim='while the scene reissues the state asked, the newest kept state standing in its place, pane B\'s corner carries "reading ⟨time⟩" (B3.history.in-flight), the asked row\'s time, after its title and before the chip, on a row held at the pane\'s top at its document\'s head, the one running mark on its own busy element and none on the line saying why, which says the history is busy (B3.history.busy) and never the link scan\'s words; pane B named by its title, then that line, then its address, described by the clause, and never busy itself; once the state asked lands the clause, the busy element and the description are gone; every word of both panes\' corners inside the box it stands in'),
    dict(screen='B3-S7', state='unread', walk='W-08', step=8, drawn=True,
         how="once the page is quiet, `op` armed to refuse the read of the state before the newest change as `internal_panic`, then the act clicked; after the shots, the corner's \"read it again\" clicked, the arm spent (skep-frontend #702)",
         claim='the state asked refused and not read again, the newest kept state stands in its place under the line saying it could not be read as it stood at that state\'s time and that the board refused the read, the refusal\'s name after it set as code (L.history.unread, L.history.unread.refused) — no word of a write — on rows held at the pane\'s top; beneath it "read it again" (L.history.read-again), live, in a slot of its own width; the asked row "not read" (L.history.not-read); pane B named by its title, the line, then its address as the AX tree computes them, with no description; the state asked once and never again by the scene; every word of both panes\' corners inside the box it stands in; the act\'s press asks the state again, which the test board reads: pane B on the state asked, the line, the act and "not read" gone'),
    dict(screen='B3-S7', state='unkept', walk='W-08', step=8, drawn=True,
         how="a line of the case's own draft held (`op` armed to answer `held`), then the act clicked (skep-frontend #661)",
         claim='the history opens on the newest kept state, the held words standing in the current pane alone, the list\'s top line "now — not yet kept" (L.history.unkept)'),
    # B3-S1's scene rule (skep-frontend #556): a reading scene's pane holding the person's own draft is its editor
    dict(screen='B3-S1', state='pane-typed', walk='W-08', step=3, drawn=True,
         how="`window.__skep.scene.open(mine, DOC)`, a click on a word of pane A's text, then keys typed there; Mod+Z; a line held there (`op` armed `held`) (D5 K-70, K-72, K-75)",
         claim="the caret live at the character clicked, its mark in pane A alone; the typed words standing in the pane's text as typed and kept by the test board, sent as the plane's typing is — one `insert` frame of the same shape, through the page's own port to the harness's provider; the pane's corner's kept word moving as the draft's state moves, \"not yet kept\" while the line is held; Mod+Z taking the run back out of the pane's text; stacked, the pane's held head its kept line alone, the rest of its corner at its foot (D2); every word of the pane's corner inside the box it stands in — side by side beside its column, its kept line's act on a row of its own, inside its content box at the page's spacing and the reader's"),
    dict(screen='B3-S13', state='pane-lines', walk='W-08', step=4, drawn=True,
         how="the draft's history opened over its kept caret, then a printable key in the past pane, at a span of the current pane its caret is not in, Space there, at each pane's corner; and beside the first edition, a key in its pane (the decision's third block; D5 K-9, K-72)",
         claim="each key answered by its pane's own line, never K-9's: the past state's C-337 (B3.history.read-only) ending with where the person was last writing; the current pane's \"Enter places a caret here\" (B3.caret.enter); Space's own K-9 line (F.swallow.space); the current pane's corner the way back to its text (B3.caret.back); the past pane's corner its pane's C-337; an edition of the person's own C-45 — nothing typed"),
    dict(screen='B3-S13', state='pane-way-back', walk='W-08', step=4, drawn=True,
         how="a printable key in the history's past pane, then the act of its line's ending — the label (the decision's fourth block)",
         claim="the focus moved into the current pane onto the span its kept caret stands in, and the next printable key returning the caret and typing there, the past pane unmoved"),
    dict(screen='B3-S1', state='pane-close', walk='W-08', step=7, drawn=True,
         how="beside the first edition, pane A scrolled far down its text and a word there clicked and typed at, then Esc and Esc (D5 K-77, K-63; B3-S1's scene rule)",
         claim="the first Esc leaving the text — the caret kept, the scene standing — the second closing the scene, a Back onto the draft's entry: the plane landing at the span pane A's view was anchored at, never at the view the entry stored as the scene opened, the caret kept there with its span holding the walk, so a key typed then types at it"),
    dict(screen='B3-S5', state='pane-source-face', walk='W-08', step=4, drawn=True,
         how="a word of the case's own draft copied by the copy door; the scene beside the first edition (`scene.open(mine, DOC)`), a word of pane A's text clicked, `op` armed `withheld` at the paste's `reinstate` while the page is quiet, then the paste door (the paste survey's P6, W3)",
         claim="the arm taken by the paste's `reinstate`, nothing placed and the text as it stood, the caret live where the paste was made — never after the words it was copied from, so the pane stands where it stood — and the paste's face standing where the paste was made, in pane A, in the source's refusal's words (B3.paste.withheld) — inside the pane's visible box below its held head and clear of its corner, its layer over the scene; a wheel over it scrolls the pane and never moves the plane; the pane's scroll carries it with its line"),
    dict(screen='B3-S5', state='pane-forged-face', walk='W-08', step=4, drawn=True,
         how="a word of the case's own draft copied by the copy door, its plain text changed at the same byte lengths; a LEAP to the first edition, the scene opened from there with the draft in pane B (`scene.open(DOC, mine)`), a word of pane B's text clicked, then the paste door (the paste survey's C3, P6)",
         claim="one `insert` of the changed words, acked, and the paste's face standing where the paste was made, in pane B, though the walk under the scene stands on the first edition: \"These words are not the passage in ⟨source⟩ that came with them on the clipboard — placed as new words, not the same material.\" (L.paste.differs), the source named as the draft was named when the paste was made — inside the pane's visible box below its held head and clear of its corner; the focus moved into pane A, the face gone"),
    dict(screen='B3-S4', state='pane-removal', walk='W-08', step=8, drawn=True,
         how="the scene beside the first edition (`scene.open(mine, DOC)`), a word of pane A's text clicked, then Backspace there over a kept character — the burst's commit composes the `delete` (D6 BM-51); the mark pressed with the pointer; then, from the first edition's entry, the same at a word of pane B; and a removal made on the plane before the scene opens over the draft (skep-frontend #674)",
         claim="the removal's mark stands in pane A level with the line the caret stands on, inside the pane's visible box below its held head and clear of its corner, over the scene — the element a pointer meets there — named \"removed here\" (B3.removed-here); a press on it opens its face whole beneath or beside its line inside the pane, \"still here — for as long as this board retains it; …\" (C-49) then \"you alone can still reach what you remove\" (B3.deletion.private), the pointer passing through the face, said in the status region, the platform's focus and the live caret standing in the pane; a wheel over the mark moves no camera; the pane's scroll carries it with its line; Mod+Z in the pane takes it down; a mark in pane B stands clear of pane B's corner; and a removal made on the plane stands in pane A over the scene as the scene opens over its draft"),
    dict(screen='B3-S2', state='pane-refused', walk='W-08', step=7, drawn=True,
         how="the scene beside the first edition (`scene.open(mine, DOC)`), a word of pane A's text brought below its head and clicked; a line held there (`op` armed `held`) and dropped; then a refused run typed there — a `held` answer and a `held` row carrying `refusal: out_of_bounds` (D6 BM-10; skep-frontend #680); and, from the first edition's entry, the same in pane B",
         claim="a line merely held marks nothing in the pane (J5); the refused run's words carry the refused mark in pane A beside their lines, from the top of the first to the foot of the last, past the column's text on the pane's facing side, a bracket open toward the text, inside the pane's visible box below its held head — none in pane B — carried by the pane's scroll, its top held at what the pane's held head covers and gone once its lines pass under it, and a face raised at the words leaving their line past it; in pane B side by side the bracket stands left of the text, open toward it"),
    dict(screen='B3-S2', state='pane-held-bars', walk='W-08', step=7, drawn=True,
         how="the scene beside the first edition, a word of pane A's text clicked, then a line typed there held moved with `arrangement_moved` and its hands (D6 BM-13; the layout page's round-2 close D8; skep-frontend #680); then the line discarded",
         claim='the held words carry one held bar in pane A from their first line to their last, past the column\'s text on the pane\'s facing side, and "held" (B3.held) once in the pane\'s edge at its top, hidden from assistive technology; the bar\'s top held at what the pane\'s held head covers and gone, with the word, once its lines pass under it; the line discarded, the bar and the word lifted'),
    dict(screen='B3-S8', state='select-all', walk='—', step=0, drawn=True,
         how="Mod+A at the live caret in the draft the case minted (K-93)",
         claim="the whole document is one selection, the caret live at its end, the selection's acts' row standing at it inside the window; the platform's copy then takes the document whole as plain text"),
    dict(screen='B3-S9', state='composer', walk='W-08', step=1, drawn=False,
         how="Mod+N's composer; \"kept in ⟨captures⟩\" (D6 BM-68)", claim='', why='the composer module (S9 #97) and the keys (U7)'),
    dict(screen='B3-S10', state='base-standing', walk='W-08', step=4, drawn=False,
         how="arm `publication.open` with `standing: 'behind'`", claim='',
         why="the corner's standing line and publish slot (S10 #106; skep #864)"),
    dict(screen='B3-S11', state='panels', walk='W-10', step=1, drawn=False,
         how='arm `publication.open` and `publication.count`; fire `publication`', claim='',
         why='the panel module (S11 #109) — the dotted route and the event are proved on the port below, the panel not drawn'),
    dict(screen='B3-S11', state='merge-scene', walk='W-10', step=3, drawn=False,
         how='arm `merge.compose` with a `MergeReport`', claim='',
         why="the merge scene's drawing (S11 #116): the gap marks and the pane on M"),
    dict(screen='B3-S12', state='card-acts', walk='W-08', step=6, drawn=False,
         how='retract and edit at the anatomy card (K-98)', claim='', why="the owner's acts on the card (S12 #122) and the composer (U3)"),
    dict(screen='B3-S13', state='swallow-draft', walk='W-08', step=4, drawn=True,
         how="a printable key at a span of the own draft with no caret (K-72; D6 BM-52)",
         claim='the hint beside the focused line reads the draft\'s own line, the key that places a caret drawn for this platform (B3.caret.enter), inside the window below the one line'),
    dict(screen='B3-S13', state='corner-way-back', walk='W-08', step=4, drawn=True,
         how="Tab from the walk's span of the own draft to its corner, then a printable key at the corner (K-72; D6 BM-52)",
         claim='the hint beside the own draft\'s corner reads the way back to its text, its chord drawn for this platform (B3.caret.back), inside the window below the one line and said in the status region, no caret placed and nothing typed'),
    dict(screen='B3-S13', state='row-inert', walk='W-08', step=4, drawn=True,
         how="a selection in the draft while a line of it is held (D6 BM-62)",
         claim='the slots that send — annotate, quote, "link to…" — stand inert with the row rule\'s one reason where a resend follows (B3.row.held.resend), while "who wrote this?" stays live'),
]

# the own draft's corner, by the element T-LAYER names it in
CORNER = '#corners [data-corner="%s"]' % OWN
# a PublicationPanel as the shell answers `publication.open` at the mint form, every member data (B-PORT's declarations):
# the canned answer for the dotted route's intake, served to the page exactly as armed
PANEL = {'rows': [], 'formatting': {'marks': [], 'cut': 0, 'removals': []}, 'read_with': {}, 'count': {'l': 0, 'n': 0, 'r': 0, 'e': 0, 'claim': False, 'read_with': [], 'supersede': []},
         'price': {'lists': [0, 0, 0, 0, 0], 'body': 0, 'values': 0, 'reads': 0, 'bytes': 0, 'over': []}, 'windows': [], 'inherited': [], 'left_behind': []}


def t(ctx, sid, values=None):
    """one of the page's strings (`strings.js`), its tokens filled"""
    return ctx.js('(async () => (await import("./strings.js")).t(%s, %s))()' % (json.dumps(sid), json.dumps(values or {})))


def wait_for(ctx, expr, max_s=10):
    """poll the page until `expr` holds, at most `max_s` seconds; whether it held"""
    t0 = time.time()
    while time.time() - t0 < max_s:
        if ctx.js(expr):
            return True
        time.sleep(0.1)
    return False


def shown(ctx, selector):
    """every element a selector matches that a person sees: inside its clip and the viewport (the page's `visible`)"""
    return [v for v in ctx.js('window.__skep.visible(%s)' % json.dumps(selector)) if v['inClip'] and v['inView']]


def fit_part(ctx, figures, state, w, *selectors):
    """a check's part holding every word of the corners the selectors match inside the box it stands in, 1 px either way
    (`corner_fit`; issues #678, #694; FP-26, FP-31, FP-34): some slot, box or content box read, and none run past or broken —
    a corner beside its column read against its content box at the page's spacing and the reader's — the worst excess past
    an edge a figure, by state and width (FP-18)"""
    fit = corner_fit(ctx, *selectors)
    figures.setdefault('corner_fit', {})['%s at %d px' % (state, w)] = {'worst_px': fit.get('worst'), 'read': len(fit.get('read') or []), 'corners': fit.get('corners')}
    return bool(fit.get('read')) and fit.get('over') == [], fit


def corner_kept(ctx):
    """the own draft's corner's kept line as a person meets it: the word in its slot, its string, whether the slot stands
    empty, and the statement where it is open — with the corner's form"""
    return ctx.js('''((sel) => { const c = document.querySelector(sel); if (!c) return null;
      const w = c.querySelector('.kept-word'), st = c.querySelector('.kept-statement');
      return {word: w ? w.textContent : null, id: w ? (w.dataset.string || null) : null, pending: !!w && w.classList.contains('pending'),
              statement: st ? st.textContent : null, statement_id: st ? (st.dataset.string || null) : null, corner: window.__skep.corner(%s)}; })(%s)''' % (json.dumps(OWN), json.dumps(CORNER)))


def line_segment(ctx, sid):
    """the one line's segment carrying a string, as a person meets it: its text, or None where none stands"""
    return ctx.js('(() => { const e = document.querySelector(%s); return e ? e.textContent : null; })()' % json.dumps('#line [data-string="%s"]' % sid))


def hint(ctx):
    """the hint a refused press raised beside the focus (O-HINT's), as a person meets it: its string, the words its button
    shows and what it was set by, or None where none stands; its box on screen, and whether that box stands whole inside
    the window below the one line; and whether the one line holds a transient segment"""
    return ctx.js('''(() => { const h = window.__skep.hint(), q = document.getElementById("hint").getBoundingClientRect(), top = document.getElementById("line").getBoundingClientRect().bottom;
      return {hint: h && {id: h.id, words: h.words, by: h.placed && h.placed.by}, box: h && {x: q.left, y: q.top, w: q.width, h: q.height},
              seen: !!h && q.width > 0 && q.height > 0 && q.left >= -0.5 && q.right <= window.innerWidth + 0.5 && q.top >= top - 0.5 && q.bottom <= window.innerHeight + 0.5,
              line: !!document.querySelector("#line .seg.transient")}; })()''')


def hint_whole(ctx, sid, whole=True, values=None):
    """a hint's notice whole, or its compact form (`strings.js`'s `hintSentences`), each a sentence, its tokens filled"""
    return ctx.js('(async () => { const h = (await import("./strings.js")).hintSentences(%s, %s); return %s ? h.whole : h.clause; })()' % (json.dumps(sid), json.dumps(values or {}), 'true' if whole else 'false'))


def sentence(ctx, sid, values=None):
    """one of the page's strings as a sentence (`strings.js`'s `sentence`): its tokens filled, its capital set, its period after"""
    return ctx.js('(async () => (await import("./strings.js")).sentence(%s, %s))()' % (json.dumps(sid), json.dumps(values or {})))


def live(ctx):
    """what the status region says"""
    return ctx.js('(document.getElementById("live") || {}).textContent || ""')


def page_calls(ctx):
    """the open page's own calls: each name and, for an `op`, its frame's op"""
    return ctx.js('window.__skep.bridge.calls().map((c) => ({name: c.name, op: c.op || null}))')


def fold(s):
    return re.sub(r'\s+', ' ', s or '').strip()


# each reading scene pane as a person reads it: its article's em beside the reading size, and how far its content runs past
# the pane's width
PANE_TEXT = '''(() => ["sceneA", "sceneB"].map((id) => { const p = document.getElementById(id), a = p && p.querySelector(":scope > article.dtext");
  return {pane: id, px: a ? parseFloat(getComputedStyle(a).fontSize) : null, reading: window.__skep.boot.type.readingPx, over: p ? p.scrollWidth - p.clientWidth : null}; }))()'''

# the caret's mark as the platform lays it out: its top and its height, on screen; null where none stands
CARET_MARK = '(() => { const m = document.querySelector("#domlayer .caret-mark"); if (!m) return null; const q = m.getBoundingClientRect(); return {top: q.top, h: q.height}; })()'


def caret_under_head(ctx, doc):
    """THE CARET UNDER A HEAD'S HELD ROW (issue #436's design decision: "No caret, focus, selection or landing stands
    under that row"): in a window NARROW_PX wide, the live caret standing in a draft whose corner stands at its head,
    the camera moved alone so the caret's mark stands 2 px below what the head covers (`headClear`), then ↑ (K-71) —
    the caret moved up, under the row, and the camera moved down alone by the least pan, the mark at the row's bottom;
    what the head covered, the mark, the caret and the camera before and after, and whether all of it held"""
    was = ctx.resize(*NARROW)
    try:
        ctx.settle(10); ctx.frames(3)
        clear, mark = None, None
        for _ in range(4):
            ctx.frames(2)
            clear, mark = ctx.js('window.__skep.headClear(%s)' % json.dumps(doc)), ctx.js(CARET_MARK)
            if clear is None or mark is None:
                return {'ok': False, 'clear': clear, 'mark': mark}
            delta = clear + 2 - mark['top']
            if abs(delta) < 0.5:
                break
            cam = ctx.camera()
            ctx.set_view(cam['x'], cam['y'] - delta / cam['scale'], cam['scale'])
        before, cam0, c0 = ctx.js(CARET_MARK), ctx.camera(), ctx.js('window.__skep.caret()')
        ctx.drv.key('ArrowUp')
        ctx.frames(3)
        ctx.frames(2)
        after, cam1, c1, clear1 = ctx.js(CARET_MARK), ctx.camera(), ctx.js('window.__skep.caret()'), ctx.js('window.__skep.headClear(%s)' % json.dumps(doc))
        down = (cam0['y'] - cam1['y']) * cam1['scale']
        ok = (bool(c0 and c1) and c1['live'] and c1['pos'] < c0['pos'] and bool(after) and clear1 is not None and abs(after['top'] - clear1) <= 1
              and down > 1 and abs(cam1['x'] - cam0['x']) < 1e-9 and abs(cam1['scale'] - cam0['scale']) < 1e-12)
        return {'ok': ok, 'clear': [clear, clear1], 'mark': [before, after], 'caret': [c0, c1], 'down_px': down}
    finally:
        ctx.resize(*was); ctx.frames(3)


def click_follows(ctx, doc, target, other):
    """THE WALK AT A CARET A CLICK PLACES (B3-S13: "the walk's focus at the caret's span"; D5 K-70): the walk landed on
    `target`, the view moved alone to `other` — another paragraph of the draft, no re-take made — a person's click on
    that paragraph's first character as the platform hit-tests it, then Mod+K at the caret (K-100); the walk before the
    click, the point and what lies under it, the caret, the walk's element, the selection after the chord and the card it
    drew, and whether all of it held: the caret live in `other`, the walk on its span, the acts card at that span —
    its label naming `other`'s position, never `target`'s — and nothing selected (issue #471's design decision: "A key
    acts on the selection the screen draws"). The card, the selection and the caret are let go after."""
    if not other:
        return {'ok': False, 'why': 'the draft holds no paragraph but the one the walk lands on'}
    ctx.leap(doc, target['pos'])
    ctx.view_at(doc, other['pos'])
    before = ctx.js('window.__skep.view.focus()')
    lead = len(other['text']) - len(other['text'].lstrip())
    at = ctx.js('''((addr, pos, block) => { const rs = window.__skep.spanRects(addr, pos, 1); if (!rs) return null;
      const q = rs[0], x = q.x + q.w / 2, y = q.y + q.h / 2, hit = document.elementFromPoint(x, y), sp = hit && hit.closest('.sp');
      return {x, y, hits: !!sp && sp.dataset.addr === addr && Number(sp.dataset.pos) === block}; })(%s, %d, %d)'''
                % (json.dumps(doc), other['pos'] + len(other['text'][:lead].encode('utf8')), other['pos']))
    if not at:
        return {'ok': False, 'why': "no character of the paragraph stands in view", 'focus_before': before}
    try:
        ctx.drv.mouse(at['x'], at['y']); ctx.frames(2)
        caret, focus = ctx.js('window.__skep.caret()'), ctx.js('window.__skep.view.focus()')
        ctx.drv.key('k', mods=('Meta',)); ctx.frames(2)
        sel = ctx.js('window.__skep.selection()')
        card = ctx.js('(() => { const l = document.querySelector("#overlay .selection-card .label"); return {id: window.__skep.overlay().id, label: l ? l.textContent : null}; })()')
        where = ctx.js('(async () => (await import("./strings.js")).t("F.position", {p: %d}))()' % other['pos'])
    finally:
        ctx.js('(async () => { const S = await import("./overlays/selection.js"), H = await import("./overlays/host.js"), L = await import("./text/layer.js"); H.dismiss(); S.clear(); L.dropCaret(); })()')
        ctx.frames(2)
    ok = (bool(before) and before['kind'] == 'block' and before['pos'] == target['pos'] and at['hits']
          and bool(caret) and caret['live'] and caret['addr'] == doc and other['pos'] <= caret['pos'] < other['pos'] + other['width']
          and bool(focus) and focus['kind'] == 'block' and focus['addr'] == doc and focus['pos'] == other['pos']
          and sel is None and card == {'id': 'selection', 'label': '%s · %s' % (doc, where)})
    return {'ok': ok, 'focus_before': before and {'kind': before['kind'], 'pos': before['pos']}, 'at': at, 'caret': caret,
            'focus': focus and {'kind': focus['kind'], 'addr': focus['addr'], 'pos': focus['pos']}, 'selection': sel, 'card': card,
            'other': {'pos': other['pos'], 'width': other['width']}}


# the caret, the page's selection, the platform's own, the caret's mark on screen, the camera and the walk's element
AT_CARET = '''(() => { const S = window.__skep, m = document.querySelector("#domlayer .caret-mark"), q = m ? m.getBoundingClientRect() : null, f = S.view.focus();
  return {caret: S.caret(), sel: S.selection(), platform: S.platformSelection(), mark: q ? {top: q.top, h: q.height} : null, cam: S.view.camera(),
          focus: f ? {kind: f.kind, addr: f.addr, pos: f.pos} : null}; })()'''


def shift_extends(ctx, doc, para):
    """SHIFT WITH THE ARROWS AT A LIVE CARET (D5 K-71, §1.6): the walk landed on `para`, the live caret placed two
    characters into its text at `c0`, then Shift+↓, Shift+→, Shift+↑ and Shift+← twice, the last running the selection
    back from `c0` — after each press the caret, the page's selection, the platform's own, the caret's mark and the
    camera, and whether all of it held: Shift+↓ moves the caret down by a line box or more, on screen with the camera's
    move taken out; after every press the page's selection runs from `c0` to the caret, none standing where the two
    meet, and the platform's selection is the page's — not collapsed, over the same span — wherever one stands; nothing
    is typed. The selection and the caret are let go after."""
    ctx.leap(doc, para['pos'])
    lead = len(para['text']) - len(para['text'].lstrip())
    want0 = para['pos'] + len(para['text'][:lead + 2].encode('utf8'))
    steps = []
    try:
        placed = ctx.js('(async () => (await import("./text/layer.js")).placeCaret(%s, %d))()' % (json.dumps(doc), want0))
        ctx.frames(3)
        before = ctx.js(AT_CARET)
        for key in ('ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowLeft'):
            ctx.drv.key(key, mods=('Shift',)); ctx.frames(3)
            steps.append(dict(ctx.js(AT_CARET), key='Shift+' + key))
        edits = ctx.js('window.__skep.write.edits(%s)' % json.dumps(doc))
    finally:
        ctx.js('(async () => { const S = await import("./overlays/selection.js"), L = await import("./text/layer.js"); S.clear(); L.dropCaret(); })()')
        ctx.frames(2)
    c0 = placed and placed['pos']

    def runs_from_anchor(s):
        """the page's selection runs from `c0` to the caret, none where they meet; the platform's is the page's"""
        c = s['caret']
        if not c or not c['live'] or c['addr'] != doc:
            return False
        want = None if c['pos'] == c0 else {'addr': doc, 'pos': min(c0, c['pos']), 'width': abs(c['pos'] - c0)}
        p = s['platform']
        return s['sel'] == want and (p['collapsed'] if want is None else (not p['collapsed'] and p['span'] == want))
    down = steps[0] if steps else None
    # the mark's move on screen with the camera's move taken out: how far down the text it went, in px at the scale
    moved = (down['mark']['top'] - before['mark']['top'] + (down['cam']['y'] - before['cam']['y']) * down['cam']['scale']
             if down and before and down['mark'] and before['mark'] else None)
    ok = (bool(placed) and placed['live'] and bool(before) and before['sel'] is None and before['platform']['collapsed']
          and bool(down) and bool(down['caret']) and down['caret']['pos'] > c0 and moved is not None and moved > 0.5 * before['mark']['h']
          and len(steps) == 5 and all(runs_from_anchor(s) for s in steps) and edits == [])
    return {'ok': ok, 'c0': c0, 'para': {'pos': para['pos'], 'width': para['width']}, 'moved_px': moved, 'line_px': before and before['mark'] and before['mark']['h'],
            'before': before and {k: before[k] for k in ('caret', 'sel', 'platform')},
            'steps': [{k: s[k] for k in ('key', 'caret', 'sel', 'platform', 'focus')} for s in steps], 'edits': edits}


# after a key at the caret: the caret, the page's selection, the platform's own, the overlay standing, a draft's page-local
# edits and the text the page shows of it
AFTER_KEY = '''((doc) => { const S = window.__skep;
  return {caret: S.caret(), sel: S.selection(), platform: S.platformSelection(), overlay: S.overlay().id, edits: S.write.edits(doc),
          text: (S.mounted(doc) || {}).text || ""}; })(%s)'''


def shift_replaces(ctx, doc, para):
    """A KEY AT A LIVE CARET WITH A SELECTION DRAWN IN ITS TEXT (D5 K-71, K-72; D6 BM-70, BM-75): the walk landed on
    `para`, the live caret placed two characters into its text at `c0`, then Shift+→ three times and `q`, Shift+→ twice
    and Backspace, Shift+→ twice and ← — the selection each run of Shift+→ made, and after each of `q`, Backspace and ←
    the caret, the page's selection, the platform's own, the overlay standing, the page-local edits and the text the page
    shows of the draft, and whether all of it held: `q` replaces the three characters selected, the caret after it,
    Backspace takes the two selected out, ← puts the caret at the selection's start and types nothing; after each no
    selection stands — the page's none, the platform's collapsed — and no card. The selection, the caret and the edits are
    let go after, and the draft read again."""
    text = para['text']
    lead = len(text) - len(text.lstrip())
    nb = lambda s: len(s.encode('utf8'))
    c0 = para['pos'] + nb(text[:lead + 2])
    w3, w2, w4 = nb(text[lead + 2:lead + 5]), nb(text[lead + 5:lead + 7]), nb(text[lead + 7:lead + 9])
    ctx.leap(doc, para['pos'])
    steps = []
    try:
        placed = ctx.js('(async () => (await import("./text/layer.js")).placeCaret(%s, %d))()' % (json.dumps(doc), c0))
        ctx.frames(3)
        for n, key in ((3, 'q'), (2, 'Backspace'), (2, 'ArrowLeft')):
            for _ in range(n):
                ctx.drv.key('ArrowRight', mods=('Shift',)); ctx.frames(2)
            selected = ctx.js('window.__skep.selection()')
            ctx.drv.key(key); ctx.frames(3)
            steps.append(dict(ctx.js(AFTER_KEY % json.dumps(doc)), key=key, selected=selected))
    finally:
        ctx.js('(async () => { const S = await import("./overlays/selection.js"), H = await import("./overlays/host.js"), L = await import("./text/layer.js"), W = await import("./write/write.js"); H.dismiss(); S.clear(); L.dropCaret(); W.clearEdits(%s); L.bump(); })()' % json.dumps(doc))
        ctx.js('window.__skep.model.invalidate(%s)' % json.dumps(doc)); ctx.settle(); ctx.frames(2)
    typed = {'pos': c0, 'width': w3, 'text': 'q'}
    erased = {'pos': c0 + 1, 'width': w2, 'text': ''}
    # each step: the selection Shift+→ made, the caret after the key, the edits after it, a stretch of the text it shows
    want = [({'addr': doc, 'pos': c0, 'width': w3}, c0 + 1, [typed], text[:lead + 2] + 'q' + text[lead + 5:lead + 15]),
            ({'addr': doc, 'pos': c0 + 1, 'width': w2}, c0 + 1, [typed, erased], text[:lead + 2] + 'q' + text[lead + 7:lead + 17]),
            ({'addr': doc, 'pos': c0 + 1, 'width': w4}, c0 + 1, [typed, erased], text[:lead + 2] + 'q' + text[lead + 7:lead + 17])]

    def held(s, w):
        selected, pos, edits, stretch = w
        c = s['caret']
        return (s['selected'] == selected and bool(c) and c['live'] and c['addr'] == doc and c['pos'] == pos and s['sel'] is None
                and s['platform']['collapsed'] and s['overlay'] is None and [{k: e[k] for k in ('pos', 'width', 'text')} for e in s['edits']] == edits
                and fold(stretch) in fold(s['text']))
    ok = bool(placed) and placed['live'] and placed['pos'] == c0 and len(steps) == 3 and all(held(s, w) for s, w in zip(steps, want))
    return {'ok': ok, 'c0': c0, 'para': {'pos': para['pos'], 'width': para['width']},
            'steps': [dict({k: s[k] for k in ('key', 'selected', 'caret', 'sel', 'platform', 'overlay', 'edits')}, held=held(s, w),
                           shows=fold(w[3]) in fold(s['text'])) for s, w in zip(steps, want)]}


# the caret, its mark as the platform lays it out — whether hollow, its box on screen — the camera, whether it flies, and
# the walk's element
AT_MARK = '''(() => { const S = window.__skep, m = document.querySelector("#domlayer .caret-mark"), q = m ? m.getBoundingClientRect() : null, f = S.view.focus();
  return {caret: S.caret(), mark: q ? {kept: m.classList.contains("kept"), top: q.top, left: q.left, h: q.height} : null, cam: S.view.camera(),
          flying: S.view.flying(), focus: f ? {kind: f.kind, addr: f.addr, pos: f.pos} : null}; })()'''


def home_end_leap(ctx, doc, para, other):
    """HOME AND END AT A LIVE CARET, AND A LEAP AWAY FROM IT (D5 K-71, M-13, M-2): the walk landed on `para`, the longest
    paragraph of the draft, which the measure wraps, the live caret placed two characters into its first line at `c0`,
    then End and Home — after each the caret, its mark, the camera and the walk's element — then a LEAP to `other`,
    another paragraph of the draft, and `x` there; and whether all of it held: End puts the caret at its first line's
    end, before any white space the wrap broke at, its mark on the line box it stood on, against the right edge of the
    line's last character, the next line's first character on a line box below; Home, made at that end, puts it at the
    paragraph's first position,
    against its first character's left edge; neither moves the camera or the walk off `para`'s span; the LEAP leaves the
    caret kept where Home put it, its mark hollow, the walk on `other`'s span, and `x` there is answered by the draft's
    own line, nothing typed. The hint, the caret and any edit are let go after, and the draft read again."""
    if not other:
        return {'ok': False, 'why': 'the draft holds no paragraph but the one the caret is placed in'}
    text = para['text']
    nb = lambda s: len(s.encode('utf8'))
    # each character's first position, and the text's end
    at = [para['pos'] + nb(text[:i]) for i in range(len(text) + 1)]
    lead = len(text) - len(text.lstrip())
    c0 = at[lead + 2]
    rect = lambda i: (ctx.js('window.__skep.spanRects(%s, %d, %d)' % (json.dumps(doc), at[i], at[i + 1] - at[i])) or [None])[0]
    ctx.leap(doc, para['pos'])
    try:
        placed = ctx.js('(async () => (await import("./text/layer.js")).placeCaret(%s, %d))()' % (json.dumps(doc), c0))
        ctx.frames(3)
        before = ctx.js(AT_MARK)
        ctx.drv.key('End'); ctx.frames(3)
        end = ctx.js(AT_MARK)
        c1 = end['caret']['pos'] if end['caret'] else None
        i1 = at.index(c1) if c1 in at else None
        nxt = next((j for j in range(i1, len(text)) if not text[j].isspace()), None) if i1 is not None else None
        last, first = (rect(i1 - 1) if i1 else None), (rect(nxt) if nxt is not None else None)
        ctx.drv.key('Home'); ctx.frames(3)
        home = ctx.js(AT_MARK)
        start = rect(0)
        ctx.leap(doc, other['pos'])
        away = ctx.js(AT_MARK)
        ctx.drv.key('x'); ctx.frames(2)
        answered, edits = hint(ctx), ctx.js('window.__skep.write.edits(%s)' % json.dumps(doc))
        kept = ctx.js('window.__skep.caret()')
    finally:
        ctx.js('(async () => { const S = await import("./overlays/selection.js"), H = await import("./overlays/host.js"), N = await import("./overlays/hint.js"), L = await import("./text/layer.js"), W = await import("./write/write.js"); H.dismiss(); N.act(); S.clear(); L.dropCaret(); W.clearEdits(%s); L.bump(); })()' % json.dumps(doc))
        ctx.js('window.__skep.model.invalidate(%s)' % json.dumps(doc)); ctx.settle(); ctx.frames(2)
    middle = lambda m: m['top'] + m['h'] / 2
    on = lambda m, q: bool(m) and bool(q) and q['y'] - 0.5 <= middle(m) <= q['y'] + q['h'] + 0.5
    still = lambda s: (not s['flying'] and s['cam'] == before['cam'] and s['focus'] == {'kind': 'block', 'addr': doc, 'pos': para['pos']})
    wraps = bool(end['caret']) and c1 is not None and c0 < c1 < at[len(text.rstrip())]
    ok = (bool(placed) and placed['live'] and bool(before['mark']) and not before['mark']['kept']
          and wraps and end['caret']['live'] and bool(end['mark']) and abs(end['mark']['top'] - before['mark']['top']) <= 1 and still(end)
          and on(end['mark'], last) and abs(end['mark']['left'] - (last['x'] + last['w'])) <= 1.5
          and bool(first) and first['y'] + first['h'] / 2 > end['mark']['top'] + end['mark']['h']
          and bool(home['caret']) and home['caret']['live'] and home['caret']['pos'] == para['pos'] and bool(home['mark']) and still(home)
          and on(home['mark'], start) and abs(home['mark']['left'] - start['x']) <= 1.5
          and away['caret'] == {'addr': doc, 'pos': para['pos'], 'live': False} and bool(away['mark']) and away['mark']['kept']
          and away['focus'] == {'kind': 'block', 'addr': doc, 'pos': other['pos']}
          and (answered['hint'] or {}).get('id') == 'B3.caret.enter' and edits == [] and kept == away['caret'])
    return {'ok': ok, 'c0': c0, 'para': {'pos': para['pos'], 'width': para['width'], 'chars': len(text)}, 'other': other['pos'], 'wraps': wraps,
            'before': before, 'end': dict(end, last_char=last, next_line=first), 'home': dict(home, first_char=start),
            'away': away, 'answered': answered['hint'], 'edits': edits}


# the wheel's turns of 40 px `kept_span_held` makes: a few lines, the caret's paragraph still in view
WHEEL_TURNS = 3
# the element of the walk under the view's centre, as the re-take finds it where nothing keeps the walk (N-WALK's `elementUnder`)
UNDER = '''(async () => { const W = await import("./nav/walk.js"), C = await import("./plane/camera.js"), u = W.elementUnder(C.view());
  return {kind: u.kind, addr: u.addr, pos: u.pos}; })()'''


def clear_point(ctx):
    """a point over the plane clear of the one line, the box, the overlay, the scene and the mirror: the wheel's target there
    pans the camera; None where the probe finds none"""
    return ctx.js('''(() => { const p = window.__skep.view.viewport();
      for (const [fx, fy] of [[0.75, 0.6], [0.85, 0.75], [0.6, 0.85], [0.9, 0.4], [0.4, 0.6]]) {
        const x = Math.round(p.VW * fx), y = Math.round(p.VH * fy), e = document.elementFromPoint(x, y);
        if (e && !e.closest('#line, #leap, #overlay, #scene, #mirror')) return {x, y};
      }
      return null; })()''')


def kept_span_held(ctx, doc, para):
    """THE KEPT CARET'S SPAN HOLDS THE WALK (B3-S1; D5 §4 rule 3): the walk landed on `para`, Enter placing the caret at its
    start, `ab` typed and Esc pressed — the caret kept, the walk on its span — then the wheel turned over the plane by
    WHEEL_TURNS turns of 40 px, and the re-take let run after the wheel's rest; then `x`; and whether all of it held: the
    element under the view's centre is another than `para`'s span (N-WALK's `elementUnder`), a line of `para` still
    stands below the one line, the re-take leaves the walk on `para`'s span, and `x` there returns the kept caret and
    types at it, after `ab`. The hint, the caret and the edits are let go after, and the draft read again."""
    ctx.leap(doc, para['pos'])
    try:
        ctx.drv.key('Enter'); ctx.frames(2)
        for ch in 'ab':
            ctx.drv.key(ch)
        ctx.frames(2)
        ctx.drv.key('Escape'); ctx.frames(2)
        left = ctx.js(AT_MARK)
        at = clear_point(ctx)
        for _ in range(WHEEL_TURNS if at is not None else 0):
            ctx.drv.wheel(at['x'], at['y'], dy=40)
        under = ctx.js(UNDER)
        ctx.js('new Promise((res) => setTimeout(res, 400))')  # the re-take waits 220 ms on the wheel's rest
        ctx.settle(); ctx.frames(2)
        held = ctx.js(AT_MARK)
        # a line of the paragraph, its typed `ab` with it, below the one line's bottom and above the window's foot
        seen = ctx.js('''((doc, pos, width) => { const line = document.getElementById("line"), top = line ? line.getBoundingClientRect().bottom : 0;
          return (window.__skep.spanRects(doc, pos, width) || []).some((q) => q.y + q.h / 2 >= top && q.y + q.h / 2 <= window.innerHeight); })(%s, %d, %d)''' % (json.dumps(doc), para['pos'], para['width'] + 2))
        ctx.drv.key('x'); ctx.frames(2)
        typed, edits = ctx.js('window.__skep.caret()'), ctx.js('window.__skep.write.edits(%s)' % json.dumps(doc))
    finally:
        ctx.js('(async () => { const S = await import("./overlays/selection.js"), H = await import("./overlays/host.js"), N = await import("./overlays/hint.js"), L = await import("./text/layer.js"), W = await import("./write/write.js"); H.dismiss(); N.act(); S.clear(); L.dropCaret(); W.clearEdits(%s); L.bump(); })()' % json.dumps(doc))
        ctx.js('window.__skep.model.invalidate(%s)' % json.dumps(doc)); ctx.settle(); ctx.frames(2)
    span = {'kind': 'block', 'addr': doc, 'pos': para['pos']}
    ok = (left['caret'] == {'addr': doc, 'pos': para['pos'] + 2, 'live': False} and left['focus'] == span
          and at is not None and under != span and seen and held['focus'] == span
          and typed == {'addr': doc, 'pos': para['pos'] + 3, 'live': True} and ''.join(e['text'] for e in edits) == 'abx')
    return {'ok': ok, 'para': {'pos': para['pos'], 'width': para['width']}, 'point': at, 'turns': WHEEL_TURNS, 'left': left, 'under': under,
            'para_in_view': seen, 'held': held, 'typed': typed, 'edits': edits}


def kept_span_extends(ctx, doc, para):
    """SHIFT WITH ← OR → AT THE KEPT CARET'S SPAN (D5 K-70, K-77; B3-S1): the walk landed on `para`, the live caret placed
    two characters into its text at `c0` and kept by Esc, the walk on its span; then Shift+→, Esc twice — the selection
    and its card closed, the caret kept a character on — and Shift+←; then the walk landed at the draft's first position
    `start`, the caret placed there and kept by Esc, K-8's Shift+↓ selecting the span the walk stands on whole, and
    Shift+←. After each press the caret, the page's selection, the platform's own and the walk's element, and whether all
    of it held: Shift+→ returns the caret live a character past `c0` and Shift+← back at `c0`, each selecting the
    character between from the caret, the platform's selection the page's, the walk on `para`'s span; at `start`, where
    the caret cannot move that way, Shift+← returns it live and K-8's selection stands, the platform's selection still
    over it as K-8 left it, never collapsed at the caret; nothing is typed. The selection, the card and the caret are let
    go after."""
    text = para['text']
    lead = len(text) - len(text.lstrip())
    nb = lambda s: len(s.encode('utf8'))
    c0 = para['pos'] + nb(text[:lead + 2])
    c1 = c0 + nb(text[lead + 2])
    place = lambda pos: ctx.js('(async () => (await import("./text/layer.js")).placeCaret(%s, %d))()' % (json.dumps(doc), pos))

    def press(key, shift=False, n=1):
        for _ in range(n):
            ctx.drv.key(key, mods=('Shift',) if shift else ()); ctx.frames(3)
    steps = {}
    try:
        ctx.leap(doc, para['pos'])
        placed = place(c0)
        ctx.frames(2)
        press('Escape')
        steps['kept'] = ctx.js(AT_CARET)
        press('ArrowRight', shift=True)
        steps['right'] = ctx.js(AT_CARET)
        press('Escape', n=2)
        steps['kept_on'] = ctx.js(AT_CARET)
        press('ArrowLeft', shift=True)
        steps['left'] = ctx.js(AT_CARET)
        press('Escape', n=2)
        start = ctx.js('window.__skep.model.doc(%s).from' % json.dumps(doc))
        ctx.leap(doc, start)
        place(start)
        ctx.frames(2)
        press('Escape')
        press('ArrowDown', shift=True)
        steps['whole'] = ctx.js(AT_CARET)
        press('ArrowLeft', shift=True)
        steps['stuck'] = ctx.js(AT_CARET)
        edits = ctx.js('window.__skep.write.edits(%s)' % json.dumps(doc))
    finally:
        ctx.js('(async () => { const S = await import("./overlays/selection.js"), H = await import("./overlays/host.js"), L = await import("./text/layer.js"); H.dismiss(); S.clear(); L.dropCaret(); })()')
        ctx.frames(2)
    span = {'kind': 'block', 'addr': doc, 'pos': para['pos']}
    one = {'addr': doc, 'pos': c0, 'width': c1 - c0}
    caret = lambda s, pos, live: s['caret'] == {'addr': doc, 'pos': pos, 'live': live}
    drawn = lambda s, sel: s['sel'] == sel and not s['platform']['collapsed'] and s['platform']['span'] == sel
    whole, stuck = steps['whole'], steps['stuck']
    ok = (bool(placed) and placed['live'] and placed['pos'] == c0
          and caret(steps['kept'], c0, False) and steps['kept']['sel'] is None and steps['kept']['focus'] == span
          and caret(steps['right'], c1, True) and drawn(steps['right'], one) and steps['right']['focus'] == span
          and caret(steps['kept_on'], c1, False) and steps['kept_on']['sel'] is None
          and caret(steps['left'], c0, True) and drawn(steps['left'], one) and steps['left']['focus'] == span
          and caret(whole, start, False) and bool(whole['sel']) and not whole['platform']['collapsed']
          and caret(stuck, start, True) and stuck['sel'] == whole['sel'] and stuck['platform'] == whole['platform']
          and edits == [])
    return {'ok': ok, 'c0': c0, 'c1': c1, 'start': start, 'para': {'pos': para['pos'], 'width': para['width']},
            'steps': {k: {f: s[f] for f in ('caret', 'sel', 'platform', 'focus')} for k, s in steps.items()}, 'edits': edits}


def word_points(ctx, doc, para):
    """the points a gesture over a paragraph of `doc` presses at, on its first line as it stands in view: each of its first
    three words of three letters or more — its first and last positions, and the points mid-line at the left edge of its
    first character, the middle of its middle one and the right edge of its last; None where the paragraph's first line
    holds no three such words shown below the one line"""
    text, nb = para['text'], (lambda s: len(s.encode('utf8')))
    rect = lambda pos: (ctx.js('window.__skep.spanRects(%s, %d, 1)' % (json.dumps(doc), pos)) or [None])[0]
    out = []
    for m in re.finditer(r'[A-Za-z]{3,}', text):
        p0, p1 = para['pos'] + nb(text[:m.start()]), para['pos'] + nb(text[:m.end()])
        a, mid, b = rect(p0), rect(p0 + (p1 - p0) // 2), rect(p1 - 1)
        if not (a and mid and b):
            return None
        y = a['y'] + a['h'] / 2
        out.append({'word': m.group(0), 'pos': p0, 'end': p1, 'start_at': (a['x'] + 0.5, y), 'mid_at': (mid['x'] + mid['w'] / 2, y), 'end_at': (b['x'] + b['w'] - 0.5, y), 'top': a['y']})
        if len(out) == 3:
            break
    top = ctx.js('document.getElementById("line").getBoundingClientRect().bottom')
    return out if len(out) == 3 and all(abs(w['top'] - out[0]['top']) <= 1 and w['top'] >= top + 2 for w in out) else None


def drag_typed(ctx, doc, para):
    """A DRAG ACROSS WORDS OF THE OWN DRAFT, THEN A KEY (FP-40; D5 K-70, K-72): the walk landed on `para`, a drag from its first
    word's first character to its second word's last, then `q`; the words the drag selected, the caret, the page's and the
    platform's selections through the frames after the drag, then the edits and the caret after the key; and whether it held:
    the caret live at the release, the selection the words and the platform's own, standing; `q` one edit in the words'
    place, the caret after it, nothing selected. What it leaves stands for the state's shots: `let_go` takes it down"""
    ctx.leap(doc, para['pos'])
    w = word_points(ctx, doc, para)
    if not w:
        return {'ok': False, 'why': 'no three words of the paragraph shown on one line below the one line'}
    ctx.drv.drag(*w[0]['start_at'], *w[1]['end_at']); ctx.frames(3)
    after = ctx.js(AT_CARET)
    sel = after['sel']
    ctx.drv.key('q'); ctx.frames(2)
    typed = ctx.js(AFTER_KEY % json.dumps(doc))
    edits = [{k: e[k] for k in ('pos', 'width', 'text')} for e in typed['edits']]
    ok = (bool(sel) and sel['addr'] == doc and abs(sel['pos'] - w[0]['pos']) <= 1 and abs(sel['pos'] + sel['width'] - w[1]['end']) <= 1
          and after['caret'] == {'addr': doc, 'pos': sel['pos'] + sel['width'], 'live': True} and not after['platform']['collapsed'] and after['platform']['span'] == sel
          and edits == [{'pos': sel['pos'], 'width': sel['width'], 'text': 'q'}] and typed['caret'] == {'addr': doc, 'pos': sel['pos'] + 1, 'live': True} and typed['sel'] is None)
    tb = para['text'].encode('utf8')
    shows = (tb[:sel['pos'] - para['pos']] + b'q' + tb[sel['pos'] - para['pos'] + sel['width']:]).decode('utf8', 'ignore')[:40] if sel else None
    return {'ok': ok, 'words': [x['word'] for x in w[:2]], 'sel': sel, 'after_drag': {k: after[k] for k in ('caret', 'platform', 'focus')},
            'after_key': {k: typed[k] for k in ('caret', 'sel')}, 'edits': edits, 'shows': shows}


def let_go(ctx, doc):
    """every caret, selection, card and edit a gesture's check left taken down, and the draft read again"""
    ctx.js('(async () => { const S = await import("./overlays/selection.js"), H = await import("./overlays/host.js"), N = await import("./overlays/hint.js"), L = await import("./text/layer.js"), W = await import("./write/write.js"); H.dismiss(); N.act(); S.clear(); L.dropCaret(); W.clearEdits(%s); L.bump(); const s = window.getSelection(); if (s) s.removeAllRanges(); })()' % json.dumps(doc))
    ctx.js('window.__skep.model.invalidate(%s)' % json.dumps(doc)); ctx.settle(); ctx.frames(2)


def drag_routes(ctx, doc, para):
    """EVERY POINTER ROUTE TO A SELECTION IN THE OWN DRAFT LEAVES THE CARET AT ITS MOVING END (FP-40; D5 K-70, K-72, K-77): in
    `para`, landed at, its first three words on one line (`word_points`), each gesture made as a person makes it — a drag
    backward from the second word's end to the first's start; Esc, then Esc again; a double-click on the third word, the
    page's frames running between its presses as they run between a person's, then `q`; a click at the first word's
    start, then a Shift+click at the second's end; Esc twice, then a Shift+click at the
    third's end; and, nothing standing, a Shift+click at the second's start — after each the caret, the page's selection and
    the platform's own; and whether all of it held: the backward drag's caret live at the selection's start, the platform's
    selection running backward; Esc ending the selection with the caret live, the second keeping it; the double-click's
    word selected — never its paragraph — the caret live at its end, the platform's selection the word, and `q` replacing
    the word alone; each Shift+click extending from the live caret, then from the kept caret, to the point clicked, the
    caret live there; and with nothing standing a Shift+click a click, the caret at its point and nothing selected. Every
    caret, edit and selection is let go after each (`let_go`), the paragraph landed at again and its words found again
    where the draft read again sets them."""
    def fresh():
        let_go(ctx, doc)
        ctx.leap(doc, para['pos'])
        return word_points(ctx, doc, para)
    w = fresh()
    if not w:
        return {'ok': False, 'why': 'no three words of the paragraph shown on one line below the one line'}
    steps, ok = {}, True
    live = lambda c, pos: c == {'addr': doc, 'pos': pos, 'live': True}
    try:
        ctx.drv.drag(*w[1]['end_at'], *w[0]['start_at']); ctx.frames(3)
        s = steps['backward'] = ctx.js(AT_CARET)
        ok &= bool(s['sel']) and live(s['caret'], s['sel']['pos']) and s['platform']['backward'] is True and s['platform']['span'] == s['sel']
        ctx.drv.key('Escape'); ctx.frames(2)
        s = steps['esc'] = ctx.js(AT_CARET)
        ok &= s['sel'] is None and live(s['caret'], (steps['backward']['sel'] or {}).get('pos'))
        ctx.drv.key('Escape'); ctx.frames(2)
        s = steps['esc_again'] = ctx.js(AT_CARET)
        ok &= bool(s['caret']) and not s['caret']['live']
        w = fresh() or w
        word = {'addr': doc, 'pos': w[2]['pos'], 'width': w[2]['end'] - w[2]['pos']}
        ctx.drv.click(*w[2]['mid_at'], count=2, between=lambda: ctx.frames(2)); ctx.frames(3)
        s = steps['double'] = ctx.js(AT_CARET)
        ok &= s['sel'] == word and live(s['caret'], w[2]['end']) and not s['platform']['collapsed'] and s['platform']['span'] == word
        ctx.drv.key('q'); ctx.frames(2)
        typed = ctx.js(AFTER_KEY % json.dumps(doc))
        steps['double_typed'] = [{k: e[k] for k in ('pos', 'width', 'text')} for e in typed['edits']]
        ok &= steps['double_typed'] == [{'pos': word['pos'], 'width': word['width'], 'text': 'q'}]
        w = fresh() or w
        ctx.drv.click(*w[0]['start_at']); ctx.frames(2)
        c0 = (ctx.js('window.__skep.caret()') or {}).get('pos')
        ctx.drv.click(*w[1]['end_at'], mods=('Shift',)); ctx.frames(3)
        s = steps['shift_live'] = dict(ctx.js(AT_CARET), c0=c0)
        ok &= c0 is not None and bool(s['sel']) and s['sel']['pos'] == c0 and live(s['caret'], s['sel']['pos'] + s['sel']['width']) and s['platform']['span'] == s['sel']
        ctx.drv.key('Escape'); ctx.drv.key('Escape'); ctx.frames(2)
        k0 = ctx.js('window.__skep.caret()')
        ctx.drv.click(*w[2]['end_at'], mods=('Shift',)); ctx.frames(3)
        s = steps['shift_kept'] = dict(ctx.js(AT_CARET), kept=k0)
        ok &= bool(k0) and not k0['live'] and bool(s['sel']) and s['sel']['pos'] == k0['pos'] and live(s['caret'], s['sel']['pos'] + s['sel']['width'])
        w = fresh() or w
        ctx.drv.click(*w[1]['start_at'], mods=('Shift',)); ctx.frames(3)
        s = steps['shift_nothing'] = ctx.js(AT_CARET)
        ok &= s['sel'] is None and live(s['caret'], w[1]['pos']) and s['platform']['collapsed']
    finally:
        let_go(ctx, doc)
    trim = lambda s: {k: s[k] for k in ('caret', 'sel', 'platform', 'kept', 'c0') if k in s} if isinstance(s, dict) else s
    return {'ok': bool(ok), 'words': [{k: x[k] for k in ('word', 'pos', 'end')} for x in w], 'steps': {k: trim(v) for k, v in steps.items()}}


# the walk's element, by its kind, its address and its position
WALKED ='(() => { const f = window.__skep.view.focus(); return f ? {kind: f.kind, addr: f.addr, pos: f.pos} : null; })()'
# the own draft's block parts the platform draws lit — the ring's reading-scale form — each by the first position it names
LIT = '''((doc) => [...document.querySelectorAll("#domlayer article.dtext")].filter((a) => a.dataset.addr === doc)
  .flatMap((a) => [...a.querySelectorAll(".sp.lit")].map((e) => Number(e.dataset.pos))))(%s)'''


def lit_after_typing(ctx, doc, para):
    """THE LIT BLOCK PAST TEXT TYPED ABOVE IT (the focus record's D3; D5 §4 rule 2; K-72): the walk landed on `para`,
    Enter placing the caret at its start, `ab` typed and Esc pressed — the caret kept, the walk on its span — then ↓,
    the walk's key, pressed until the walk stands on a later span of the draft; the walk's element, the ring's rule, the
    first positions the own draft's lit block parts name as the platform draws them, and the edits; and whether all of
    it held: the walk on that later span by its position in the text shown — past `ab` — the ring drawn, and every lit
    block part that same block, at least one standing. The caret, the selection and the edits are let go after, and the
    draft read again."""
    ctx.leap(doc, para['pos'])
    walked, lit, ring, edits = None, [], None, []
    try:
        ctx.drv.key('Enter'); ctx.frames(2)
        for ch in 'ab':
            ctx.drv.key(ch)
        ctx.frames(2)
        ctx.drv.key('Escape'); ctx.frames(2)
        for _ in range(6):
            ctx.drv.key('ArrowDown'); ctx.settle(); ctx.frames(2)
            walked = ctx.js(WALKED)
            if walked and walked['kind'] == 'block' and walked['addr'] == doc and walked['pos'] > para['pos']:
                break
        ctx.frames(2)
        lit, ring = ctx.js(LIT % json.dumps(doc)), ctx.js('window.__skep.focus().ring')
        edits = ctx.js('window.__skep.write.edits(%s)' % json.dumps(doc))
    finally:
        ctx.js('(async () => { const S = await import("./overlays/selection.js"), H = await import("./overlays/host.js"), L = await import("./text/layer.js"), W = await import("./write/write.js"); H.dismiss(); S.clear(); L.dropCaret(); W.clearEdits(%s); L.bump(); })()' % json.dumps(doc))
        ctx.js('window.__skep.model.invalidate(%s)' % json.dumps(doc)); ctx.settle(); ctx.frames(2)
    later = bool(walked) and walked['kind'] == 'block' and walked['addr'] == doc and walked['pos'] > para['pos']
    want = walked['pos'] if later else None
    ok = later and ring is True and ''.join(e['text'] for e in edits) == 'ab' and len(lit) > 0 and all(p == want for p in lit)
    return {'ok': ok, 'para': {'pos': para['pos'], 'width': para['width']}, 'walked': walked, 'ring': ring, 'lit': lit, 'want': want, 'edits': edits}


# the line `typed_lands` types above a paragraph: words no document of the seed holds
TYPED_LINE = 'Quorvex typed here.'


def typed_lands(ctx, doc, para, away):
    """A TYPED DRAFT's WALK, FIND AND BACK LAND ON THE TYPED WORDS (the unsent-typing decision §1 (a), §2; foundations
    §2.7): the walk landed on `para`, Enter placing the caret at its start, TYPED_LINE and a blank line typed — a line of
    its own in the text shown, which the board does not hold — and Esc pressed. THE WALK: ↑ from the paragraph below
    stands on the typed line, a stop of its own, its mirror item reading the typed words. FIND: Mod+F and the typed
    line's first word find it there, outlined, and Esc leaves it selected. BACK: a LEAP to `away` and Mod+[ return to
    the typed line, the walk on it and a line of it in the window. Nothing is sent: the edits are the page's own. The
    caret, the selection, the find, the arrival and the edits are let go after, and the draft read again."""
    ctx.leap(doc, para['pos'])
    n = len(TYPED_LINE.encode('utf8'))
    out = {'ok': False, 'para': {'pos': para['pos'], 'width': para['width']}}
    try:
        ctx.drv.key('Enter'); ctx.frames(2)
        for ch in TYPED_LINE:
            ctx.drv.key(' ' if ch == ' ' else ch)
        ctx.drv.key('Enter'); ctx.drv.key('Enter'); ctx.frames(2)
        ctx.drv.key('Escape'); ctx.settle(); ctx.frames(2)
        blocks = ctx.js('(async () => (await import("./text/layer.js")).shownOf(%s).blocks.map((b) => ({pos: b.pos, width: b.width, text: b.text})))()' % json.dumps(doc))
        line = next((b for b in blocks if b['text'] == TYPED_LINE), None)
        below = next((b for b in blocks if line and b['pos'] == line['pos'] + line['width']), None)
        out.update(line=line, below=below and {'pos': below['pos']}, edits=ctx.js('window.__skep.write.edits(%s).length' % json.dumps(doc)))
        if not line or not below:
            return out
        # THE WALK: from the paragraph below, ↑ lands on the typed line; its mirror item reads the typed words
        ctx.leap(doc, below['pos'])
        ctx.drv.key('ArrowUp'); ctx.settle(); ctx.frames(2)
        walked = ctx.js(WALKED)
        item = ctx.js('window.__skep.mirror.item(window.__skep.mirror.index())') or ''
        out.update(walked=walked, mirror=item[:120])
        walk_ok = bool(walked) and walked['kind'] == 'block' and walked['addr'] == doc and walked['pos'] == line['pos'] and TYPED_LINE in item
        # FIND: the typed line's first word is found in the text shown, at the typed line, and outlined there
        ctx.drv.key('f', mods=('Meta',)); ctx.settle(); ctx.frames(2)
        ctx.drv.ime(TYPED_LINE.split(' ')[0]); ctx.settle(); ctx.frames(3)
        found = ctx.js('window.__skep.find.stands()') or {}
        matches = found.get('matches') or []
        outline = (ctx.js('window.__skep.arrivalAnchors()') or {}).get('outline')
        ctx.esc(); ctx.settle(); ctx.frames(2)
        sel = ctx.js('(async () => (await import("./overlays/selection.js")).selected())()')
        out.update(matches=matches, outline=bool(outline), selected=sel)
        word = len(TYPED_LINE.split(' ')[0].encode('utf8'))
        find_ok = matches == [{'pos': line['pos'], 'width': word}] and bool(outline) and sel == {'addr': doc, 'pos': line['pos'], 'width': word}
        ctx.js('(async () => (await import("./overlays/selection.js")).clear())()')
        # BACK: away and back again, the return landing on the typed line
        ctx.leap(doc, line['pos'])
        ctx.leap(away, None)
        ctx.drv.key('[', mods=('Meta',)); ctx.settle(); ctx.frames(3)
        back = ctx.js(WALKED)
        rects = ctx.js('window.__skep.spanRects(%s, %d, %d)' % (json.dumps(doc), line['pos'], n)) or []
        vp = ctx.js('window.__skep.view.viewport()')
        seen = [q for q in rects if q['x'] >= 0 and q['y'] >= 0 and q['x'] + q['w'] <= vp['VW'] and q['y'] + q['h'] <= vp['VH']]
        out.update(back=back, line_rects=rects[:2], viewport=vp)
        back_ok = bool(back) and back['kind'] == 'block' and back['addr'] == doc and back['pos'] == line['pos'] and len(seen) > 0
        out.update(ok=walk_ok and find_ok and back_ok, walk_ok=walk_ok, find_ok=find_ok, back_ok=back_ok)
    finally:
        ctx.js('(async () => { const S = await import("./overlays/selection.js"), H = await import("./overlays/host.js"), L = await import("./text/layer.js"), W = await import("./write/write.js"), G = await import("./nav/go.js"), N = await import("./nav/find.js"); if (N.isOpen()) await N.close(false); H.dismiss(); S.clear(); G.endArrival(); L.dropCaret(); W.clearEdits(%s); L.bump(); })()' % json.dumps(doc))
        ctx.js('window.__skep.model.invalidate(%s)' % json.dumps(doc)); ctx.settle(); ctx.frames(2)
    return out


# where the platform's focus stands: the corner it stands in — on an act of it, or on the corner itself — the element's id,
# the mirror's current item's index and whether the element is that item, and the walk's element
FOCUS_AT = '''(() => { const e = document.activeElement, c = e && e.closest ? e.closest("#corners [data-corner]") : null, f = window.__skep.view.focus();
  return {corner: c ? c.dataset.corner : null, id: e ? e.id || null : null, idx: window.__skep.mirror.index(), sel: e ? e.getAttribute("aria-selected") : null,
          walk: f ? {kind: f.kind, addr: f.addr, pos: f.pos} : null}; })()'''


def corner_key(ctx, doc):
    """A PRINTABLE KEY AT THE OWN DRAFT's CORNER (B3-S13; D5 K-72; D6 BM-52): the hint taken down, the platform's focus
    put on the mirror's current item — the plane's one stop, the walk on a span of `doc` — then Tab, which lands on
    `doc`'s corner's stop (K-57) — its first act where it holds acts, else the corner — then `x` there; where Tab put the
    focus and that stop's box, the hint as a person meets it and the box it was set beside, what the status region said,
    the caret, `doc`'s edits and the `op` frames sent after the key, and whether it held: the focus in `doc`'s corner, the
    hint B3.caret.back set beside the stop the focus stood on inside the window below the one line, no transient in the one
    line, its words said, no caret placed and nothing typed"""
    ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
    ctx.js('document.getElementById("walk-" + window.__skep.mirror.index()).focus({preventScroll: true})'); ctx.frames(1)
    ctx.drv.key('Tab'); ctx.settle(); ctx.frames(2)
    at = ctx.js(FOCUS_AT)
    box = ctx.js('(() => { const e = document.activeElement; if (!e) return null; const q = e.getBoundingClientRect(); return {x: q.left, y: q.top, w: q.width, h: q.height}; })()')
    n = len(page_calls(ctx))
    ctx.drv.key('x'); ctx.frames(2)
    got, said, want = hint(ctx), live(ctx), hint_whole(ctx, 'B3.caret.back', values=drawn_keys(ctx, 'B3.caret.back'))
    anchor = ctx.js('(() => { const h = window.__skep.hint(); return h && h.placed ? h.placed.anchor : null; })()')
    caret, edits = ctx.js('window.__skep.caret()'), ctx.js('window.__skep.write.edits(%s).length' % json.dumps(doc))
    beside = bool(anchor and box) and all(abs(anchor[k] - box[k]) <= 1 for k in ('x', 'y', 'w', 'h'))
    ok = (at['corner'] == doc and got['hint'] == {'id': 'B3.caret.back', 'words': want, 'by': 'beside'} and got['seen'] and beside and not got['line']
          and said == heard(ctx, want) and caret is None and edits == 0)
    return {'ok': ok, 'focus': at, 'hint': got, 'want': want, 'anchor': anchor, 'stop': box, 'status_region': said, 'caret': caret, 'edits': edits,
            'ops_after': [c['op'] for c in page_calls(ctx)[n:] if c['name'] == 'op']}


def corner_back(ctx, doc):
    """THE WAY BACK THE CORNER's LINE NAMES (B3-S13: B3.caret.back, its chord Shift+Tab): `doc`'s corner reached and a key
    pressed there as `corner_key` does, then Shift+Tab, then `x`; the corner's state, where Shift+Tab put the focus, the
    hint and whether it held: the corner's state held, the focus back on the mirror's current item with the walk on a span
    of `doc`, and `x` there answered at the text's edge by the draft's own line naming the key that places a caret, drawn
    for this platform (B3.caret.enter), no caret placed and nothing typed"""
    first = corner_key(ctx, doc)
    ctx.drv.key('Tab', mods=('Shift',)); ctx.settle(); ctx.frames(2)
    at = ctx.js(FOCUS_AT)
    ctx.drv.key('x'); ctx.frames(2)
    got, want = hint(ctx), hint_whole(ctx, 'B3.caret.enter', values=drawn_keys(ctx, 'B3.caret.enter'))
    caret, edits = ctx.js('window.__skep.caret()'), ctx.js('window.__skep.write.edits(%s).length' % json.dumps(doc))
    walk = at['walk'] or {}
    ok = (first['ok'] and at['id'] == 'walk-%d' % at['idx'] and at['sel'] == 'true' and walk.get('kind') == 'block' and walk.get('addr') == doc
          and got['hint'] == {'id': 'B3.caret.enter', 'words': want, 'by': 'edge'} and got['seen'] and caret is None and edits == 0)
    return {'ok': ok, 'corner': {k: first[k] for k in ('ok', 'focus', 'hint')}, 'focus': at, 'hint': got, 'want': want, 'caret': caret, 'edits': edits}


# what the case's own draft holds as it is minted, written through the page's port: two paragraphs, so a selection has a span to stand on
SEED_TEXT = 'The editor case writes here.\n\nA second paragraph stands below it.\n'
# the ordinals the armed `held` answers name their lines by: far above any the test board's store holds
ARMED_K = 9000

# the overlay standing, as its markup says it (O-FACES' face of unkept words): its name, its head, its words by their strings, a
# moved document's hands, its acts in order — each its string and the reason it is inert by — and the discard's statement: its
# string, its parts, whether its last is the exit, and whether it stands directly below the acts
FACE_SHOWN = '''(() => { const o = document.getElementById("overlay"), S = window.__skep.overlay();
  if (!o || !S || !S.kind) return null;
  const st = o.querySelector(".said .statement"), acts = o.querySelector(".acts");
  return {id: S.id || null, head: (o.querySelector(".face-head") || {dataset: {}}).dataset.string || null,
          lines: [...o.querySelectorAll(".face-text")].map((e) => ({id: e.dataset.string, text: e.textContent})),
          hands: [...o.querySelectorAll(".hands .hand")].map((e) => ({id: e.dataset.string, text: e.textContent})),
          acts: [...o.querySelectorAll(".acts button")].map((b) => ({run: b.dataset.run, id: b.dataset.string, text: b.textContent, inert: b.dataset.inert || null})),
          said: st ? {id: st.dataset.string, text: st.textContent, parts: st.querySelectorAll(".part").length, exit: !!st.querySelector(".part.exit:last-child"),
                      below: !!acts && acts.nextElementSibling === st.parentElement} : null}; })()'''


# the face standing at a draft's corner, as its markup says it (T-ARTICLE's face of a moved document): whether it stands
# beneath the kept word and before the chip; its compact form — its string, its words, the words that describe it, whether
# it opens the corner whole, whether it says the corner stands opened, and whether it stands inside the box it is set in —
# a head's slot, or the corner — as the platform lays it out; and its whole form — its words and its hands by their
# strings, its acts in order, each its key, its string, its text and the reason it is inert by, and the discard's
# statement: its string, its parts, whether its last is the exit, and whether it stands directly below the acts; null where
# no corner stands
CORNER_FACE = '''((sel) => { const c = document.querySelector(sel);
  if (!c) return null;
  const k = c.querySelector(".face.compact"), f = c.querySelector(".face:not(.compact)"), w = c.querySelector(".kept-word"), ch = c.querySelector(".chip"), x = k || f;
  const after = (a, b) => !!a && !!b && !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
  const inside = (e) => { const a = e.getBoundingClientRect(), b = e.parentElement.getBoundingClientRect(); return a.top >= b.top - 1 && a.bottom <= b.bottom + 1 && a.right <= b.right + 1; };
  const st = f && f.querySelector(".said .statement"), acts = f && f.querySelector(".face-acts");
  return {order: after(w, x) && after(x, ch),
          compact: k ? {id: k.dataset.string || null, text: k.textContent, name: k.getAttribute("aria-label"), whole: k.getAttribute("aria-description"), opens: k.hasAttribute("data-whole"), expanded: k.getAttribute("aria-expanded"), fits: inside(k)} : null,
          whole: f ? {lines: [...f.querySelectorAll(".face-text")].map((e) => ({id: e.dataset.string, text: e.textContent})),
                      hands: [...f.querySelectorAll(".hands .hand")].map((e) => ({id: e.dataset.string, text: e.textContent})),
                      acts: [...f.querySelectorAll(".face-acts button")].map((b) => ({run: b.dataset.face, id: b.dataset.string, text: b.textContent, inert: b.dataset.inert || null})),
                      said: st ? {id: st.dataset.string, text: st.textContent, parts: st.querySelectorAll(".part").length, exit: !!st.querySelector(".part.exit:last-child"),
                                  below: !!acts && acts.nextElementSibling === st.parentElement} : null} : null}; })(%s)'''


def write_state(ctx, addr):
    """what D6's machine holds of a draft, as the gate's hook reads it (`write.state`)"""
    return ctx.js('window.__skep.write.state(%s)' % json.dumps(addr))


# the margin's marks on the plane beside some words of a document's text shown, as the last frame placed them (the gate's
# `margin`, its marks standing in no pane): every mark standing for the document there, the words' glyph boxes' top, foot and
# right edge, and the marks of a kind standing beside them — spanning their lines from the top of the first to the foot of the
# last, at the right of their column's text — with the word "held" standing in the document's edges
MARGIN_BESIDE = '''((doc, pos, width, kind) => {
  const words = (window.__skep.spanRects(doc, pos, width) || []).filter((q) => q.w > 0 && q.h > 0), marks = window.__skep.margin().filter((m) => m.addr === doc && m.side == null);
  const top = Math.min(...words.map((q) => q.y)), foot = Math.max(...words.map((q) => q.y + q.h)), right = Math.max(...words.map((q) => q.x + q.w));
  const by = marks.filter((m) => m.kind === kind && !m.point && m.placed.y <= top + 1 && m.placed.y + m.placed.h >= foot - 1 && m.placed.x >= right - 1);
  return {words: words.length, top, foot, right, marks: marks.map((m) => ({kind: m.kind, point: m.point, column: m.column, first: m.first, end: m.end, placed: m.placed})), beside: by.length,
          held: window.__skep.edgeSigns().filter((s) => s.kind === "held" && s.addr === doc).map((s) => ({text: s.text, column: s.column, placed: s.placed}))};
})(%s, %d, %d, %s)'''


def margin_beside(ctx, doc, pos, width, kind):
    """the margin's marks of a document and those of `kind` standing beside the words at [pos, pos + width) of its text shown
    (`MARGIN_BESIDE`)"""
    return ctx.js(MARGIN_BESIDE % (json.dumps(doc), pos, width, json.dumps(kind)))


def port_op(ctx, sid, frame):
    """one `op` through the open page's own port, under its session: the harness's act, made by no module of the page"""
    return ctx.js('(async () => { const P = await import("./bridge/port.js"); return await P.op({session: %s, frame: %s}); })()' % (json.dumps(sid), json.dumps(frame)))


def last_write(ctx, ops_allowed):
    """the open page's last `op` call whose frame is no read: its op, the document it names and its answer; None where it
    sent none"""
    out = None
    for c in ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "op").map((c) => ({frame: c.frame, answer: c.answer}))') or []:
        try:
            f = json.loads(c['frame'])
        except (TypeError, ValueError):
            continue
        if isinstance(f, dict) and f.get('op') and f.get('op') not in ops_allowed and 'frame' not in f:
            out = {'op': f['op'], 'doc': f.get('doc'), 'values': f.get('values'), 'answer': c.get('answer')}
    return out


LEAP_BOX = """(() => { const q = document.getElementById("leapq"), foot = document.getElementById("leapfoot"), act = foot.querySelector("[data-start]"), note = document.getElementById("leapnote"),
  hits = document.getElementById("leaphits"), box = document.getElementById("leap"), line = document.getElementById("line").getBoundingClientRect();
  const at = (e) => { const b = e.getBoundingClientRect(); return {top: b.top, bottom: b.bottom, left: b.left, right: b.right, w: b.width, h: b.height}; };
  const a = document.activeElement, order = [...box.querySelectorAll("input, button")].map((e) => e.id || e.dataset.beside || e.tagName);
  return {open: box.classList.contains("on"), value: q.value, act: act && {text: act.textContent, id: act.dataset.string, box: at(act)}, note: {text: note.textContent, ids: [...note.querySelectorAll("[data-string]")].map((e) => e.dataset.string), box: at(note)},
          rows: hits.children.length, hits: at(hits), box: at(box), line_bottom: line.bottom, focus: a ? (a.id || a.tagName) : null, order, win: [window.innerWidth, window.innerHeight]}; })()"""

LINE_TRANSIENT = """(() => { const seg = document.querySelector("#line .seg.transient"), line = document.getElementById("line"); if (!seg) return null;
  const b = seg.getBoundingClientRect(), rows = [...line.querySelectorAll(".row")].map((x) => x.getBoundingClientRect());
  return {text: seg.textContent, id: seg.dataset.string, beneath: !!seg.closest(".beneath"), alone: !seg.closest(".row") || seg.closest(".row").children.length === 1, box: {top: b.top, bottom: b.bottom, left: b.left, right: b.right},
          rows_bottom: rows.length ? Math.max(...rows.filter((x, i) => !seg.closest(".row") || line.querySelectorAll(".row")[i] !== seg.closest(".row")).map((x) => x.bottom), 0) : 0, line_bottom: line.getBoundingClientRect().bottom, reading: [...seg.querySelectorAll(".reading")].map((e) => e.textContent),
          act: !!seg.querySelector("button"), win: [window.innerWidth, window.innerHeight]}; })()"""


def transient_seen(seg, narrow=False):
    """is the one line's transient segment whole inside the window and, where it stands beneath the line's rows or on a row
    of its own, clear of every other row (the layout page's round-2 close, §6: the beneath block clears the line's full
    wrapped height); at the narrow width it stands so, never squeezed among the first row's parts"""
    if not seg:
        return False
    b, (w, h) = seg['box'], seg['win']
    inside = b['left'] >= -0.5 and b['right'] <= w + 0.5 and b['top'] >= -0.5 and b['bottom'] <= seg['line_bottom'] + 0.5 and b['bottom'] <= h + 0.5 and b['bottom'] > b['top']
    apart = seg['beneath'] or seg['alone']
    return inside and (not apart or b['top'] >= seg['rows_bottom'] - 0.5) and (apart or not narrow)


def start_rows(ctx, r, rows, shoot, red, sent, ops_allowed, figures, leave_page):
    """STARTING A DOCUMENT, SELECT-ALL AND THE LAUNCH (B3-S1 THE START and THE LAUNCH, B3-S8; D5 K-33, K-93; D6 BM-53), on the
    harness's provider with the machine (`machine=1`), writing only to drafts the creation row mints here. `start-row`: the
    LEAP box over a first line nothing matches, the creation row at its foot, one Tab from the input. `mint-row`: Tab and
    Enter mint a draft and send the line as its first burst, both kept by the test board; the one line says the mint, whole
    at this first mint and without the staying clause at a second. `select-all`: Mod+A at the caret in that draft selects
    it whole. `launch`: the page opened again lands at the draft the case last wrote in, the run that write placed
    outlined, the caret live at its end, the one line saying why. The figures: the launch's reads, their pages, rows and
    milliseconds. `leave_page` keeps what a page sent before it is left, for the case's write check."""
    states = ('start-row', 'mint-row', 'select-all', 'launch')
    boot = ctx.open_editor_page('all', machine=True)
    session = ctx.js('window.__skep.model.session()')
    if not (boot and boot.get('machine') and session and session.get('writes')):
        for st in states:
            red(st, "the machine's page did not open")
        return
    account = session['account']
    stamp = time.strftime('%H%M%S')
    line1, line2, para = 'Slice one starts a document at %s' % stamp, 'A second document, started at %s' % stamp, 'Its second paragraph is the write the launch lands at.'

    def box():
        return ctx.js(LEAP_BOX)

    def open_box(text):
        """the LEAP box opened by its chord and `text` typed into it, key by key"""
        ctx.js('window.__skep.leap.close()')
        ctx.drv.key('l', mods=('Meta',)); ctx.frames(2)
        for ch in text:
            ctx.drv.key(ch)
        ctx.frames(2)

    def mints():
        """each `create_new_document` the open page sent, with the address its answer minted"""
        out = []
        for c in ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "op" && c.op === "create_new_document").map((c) => ({frame: c.frame, answer: c.answer}))') or []:
            try:
                f, a = json.loads(c['frame']), json.loads(c['answer'] or 'null')
            except (TypeError, ValueError):
                continue
            out.append({'frame': {k: v for k, v in f.items() if k != 'id'}, 'addr': ((a or {}).get('result') or {}).get('addr'), 'resp': ((a or {}).get('result') or {}).get('resp')})
        return out

    def first_line(addr):
        return (ctx.js('(async () => { const L = await import("./text/layer.js"), R = await import("./model/records.js"), d = L.shownOf(%s); return d.from < 0 ? "" : R.textOf(d.runs, d.from, d.to); })()' % json.dumps(addr)) or '').split('\n')[0]

    def board_text(addr):
        """the draft's text as the model holds it of the board, with no edit of the page's applied"""
        return ctx.js('(() => { const d = window.__skep.model.doc(%s); return d && d.from >= 0 ? window.__skep.model.text(%s, d.from, d.to) : null; })()' % (json.dumps(addr), json.dumps(addr)))

    def kept(addr, max_s=15):
        return wait_for(ctx, '(() => { const s = window.__skep.write.state(%s); return !!s.kept && s.kept.word === "kept" && !s.inFlight && window.__skep.write.edits(%s).length === 0; })()' % (json.dumps(addr), json.dumps(addr)), max_s)

    def caret():
        return ctx.js('(async () => (await import("./text/layer.js")).caret())()')

    # ---- B3-S1 `start-row`: the box, its no-match line and the creation row at its foot -------------------------------
    want_row, want_none = t(ctx, 'B3.start-document'), t(ctx, 'F.leap.none')

    def start_check(w):
        open_box(line1)
        b = box()
        ctx.drv.key('Tab'); ctx.frames(2)
        tabbed = ctx.js('document.activeElement ? document.activeElement.id : null')
        ctx.drv.key('Tab', mods=('Shift',)); ctx.frames(2)
        back = ctx.js('document.activeElement ? document.activeElement.id : null')
        ctx.drv.key('End'); ctx.frames(2)  # the caret at the typed line's end again: Shift+Tab into a field selects its text
        a = (b.get('act') or {})
        ab, win = a.get('box') or {}, b['win']
        at_foot = bool(ab) and ab['top'] >= b['note']['box']['bottom'] - 0.5 and ab['top'] >= b['hits']['bottom'] - 0.5 and ab['bottom'] <= b['box']['bottom'] + 0.5
        inside = bool(ab) and ab['left'] >= -0.5 and ab['right'] <= win[0] + 0.5 and ab['top'] >= b['line_bottom'] - 0.5 and ab['bottom'] <= win[1] + 0.5 and ab['w'] > 0
        ok = (b['open'] and b['value'] == line1 and a.get('text') == want_row and a.get('id') == 'B3.start-document' and b['rows'] == 0 and want_none in b['note']['text'] and 'F.leap.none' in b['note']['ids']
              and at_foot and inside and b['focus'] == 'leapq' and b['order'][:2] == ['leapq', 'leap-start'] and tabbed == 'leap-start' and back == 'leapq')
        return ok, {'box': b, 'want': [want_row, want_none], 'tabbed': tabbed, 'back': back, 'at_foot': at_foot, 'inside': inside}
    shoot('start-row', start_check)
    writes0 = len(mints())
    r.check(writes0 == 0, 'the creation row standing, its Tab and Shift+Tab mint nothing: no `create_new_document` sent', mints())

    # ---- B3-S1 `mint-row`: Tab, Enter — the mint and its first burst on the test board; the one line's segment ----------
    open_box(line1)
    ctx.drv.key('Tab'); ctx.frames(1)
    ctx.drv.key('Enter')
    minted = wait_for(ctx, 'window.__skep.bridge.calls().some((c) => c.name === "op" && c.op === "create_new_document" && /ack_addr/.test(c.answer || ""))', 15)
    made = mints()
    mine = made[-1]['addr'] if minted and made else None
    r.check(bool(mine) and made[-1]['frame'] == {'op': 'create_new_document', 'account': account, 'published': False} and made[-1]['resp'] == 'ack_addr',
            "Enter on the creation row sends one `create_new_document` into the acting account, born private, and the test board answers the draft it minted", made)
    if not mine:
        for st in ('mint-row', 'select-all', 'launch'):
            red(st, {'minted': made})
        return
    sent['minted'].append(mine)
    figures['started'] = [mine]
    is_kept = kept(mine)
    ctx.settle(15); ctx.frames(3)
    w0 = last_write(ctx, ops_allowed)
    n1 = len(line1.encode('utf8'))
    # the creation copy in the words the corner's chip says it in: the person alone, or with this machine where local trust is on
    private = 'L.mint.private.flag-on' if ((ctx.js('window.__skep.model.health()') or {}).get('auth') or {}).get('local_trust') else 'B3.mint.private'
    want_first = ctx.js('(async () => { const S = await import("./strings.js"); return S.fields(%s, S.t(%s), S.t("B3.mint.stays")); })()' % (json.dumps(mine), json.dumps(private)))
    want_later = lambda addr: ctx.js('(async () => { const S = await import("./strings.js"); return S.fields(%s, S.t(%s)); })()' % (json.dumps(addr), json.dumps(private)))
    corner = '#corners [data-corner="%s"]' % mine

    def mint_check(w):
        seg, c, trail = ctx.js(LINE_TRANSIENT), caret(), ctx.js('window.__skep.trail().entries.map((e) => e.addr)')
        word = ctx.js('((sel) => { const x = document.querySelector(sel + " .kept-word"); return x ? {word: x.textContent, id: x.dataset.string || null} : null; })(%s)' % json.dumps(corner))
        mounted, reading = mine in (ctx.js('window.__skep.mountedAddrs()') or []), ctx.js('(async () => (await import("./text/layer.js")).atReadingScale(%s))()' % json.dumps(mine))
        ok = (is_kept and bool(w0) and w0['op'] == 'insert' and w0['doc'] == mine and w0['values'] == [line1] and 'ack' in (w0.get('answer') or '')
              and first_line(mine) == line1 and board_text(mine) == line1 and c == {'addr': mine, 'pos': n1 + 1, 'live': True} and bool(trail) and trail[-1] == mine and mounted and reading
              and word == {'word': 'kept', 'id': 'B3.kept'} and bool(seg) and seg['text'] == want_first and seg['id'] == 'B3.mint' and transient_seen(seg, w == NARROW_PX))
        return ok, {'kept': is_kept, 'write': w0 and {k: w0[k] for k in ('op', 'doc', 'values')}, 'first_line': first_line(mine), 'board': board_text(mine), 'caret': c, 'trail': trail[-3:] if trail else trail,
                    'mounted': mounted, 'reading': reading, 'corner': word, 'segment': seg, 'want': want_first}
    shoot('mint-row', mint_check)

    # a second mint in the session: the creation copy alone, the staying clause said once (P41)
    open_box(line2)
    ctx.drv.key('Tab'); ctx.frames(1)
    ctx.drv.key('Enter')
    again = wait_for(ctx, 'window.__skep.bridge.calls().filter((c) => c.name === "op" && c.op === "create_new_document" && /ack_addr/.test(c.answer || "")).length >= 2', 15)
    made = mints()
    second = made[-1]['addr'] if again and len(made) >= 2 else None
    if second:
        sent['minted'].append(second)
        figures['started'].append(second)
        kept2 = kept(second)
        ctx.settle(15); ctx.frames(3)
        seg = ctx.js(LINE_TRANSIENT)
        r.check(kept2 and bool(seg) and seg['text'] == want_later(second) and seg['id'] == 'B3.mint' and first_line(second) == line2,
                'a second mint in the session says its address and the creation copy alone: that a document stays is said whole at the first mint only (P41)', {'kept': kept2, 'segment': seg, 'want': want_later(second)})
    else:
        r.check(False, 'a second document is started from the box in the same session', made)

    # ---- the case's own write, in the first draft: a second paragraph typed at the caret, kept by the board ----------------
    ctx.leap(mine, 1)
    ctx.js('window.__skep.model.loadWhole(%s)' % json.dumps(mine)); ctx.settle(); ctx.frames(2)
    ctx.js('(async () => (await import("./text/layer.js")).placeCaret(%s, %d))()' % (json.dumps(mine), n1 + 1)); ctx.frames(2)
    for key in ('Enter', 'Enter'):
        ctx.drv.key(key)
    for ch in para:
        ctx.drv.key(ch)
    ctx.frames(2)
    wrote = kept(mine)
    ctx.settle(15); ctx.frames(3)
    whole = line1 + '\n\n' + para
    n = len(whole.encode('utf8'))
    r.check(wrote and board_text(mine) == whole and caret() == {'addr': mine, 'pos': n + 1, 'live': True},
            "the case's own write: a second paragraph typed at the caret of the draft it minted, kept by the test board, the caret live at its end", {'kept': wrote, 'board': board_text(mine), 'caret': caret()})

    # ---- B3-S8 `select-all`: Mod+A at the live caret selects the document whole ------------------------------------------
    def select_check(w):
        ctx.js('(async () => (await import("./overlays/selection.js")).clear())()')
        ctx.js('(async () => (await import("./text/layer.js")).placeCaret(%s, %d))()' % (json.dumps(mine), n1 + 1)); ctx.frames(2)
        ctx.drv.key('a', mods=('Meta',)); ctx.frames(3)
        sel, c = ctx.js('window.__skep.selection()'), caret()
        acts = shown(ctx, '#overlay button')
        copy = ctx.js('window.__skep.copy()') or {}
        data = copy.get('data') or {}
        ok = (sel == {'addr': mine, 'pos': 1, 'width': n} and c == {'addr': mine, 'pos': n + 1, 'live': True} and len(acts) >= 3
              and copy.get('span') == sel and data.get('text/plain') == whole and bool(data.get('application/x-skep-passage')))
        return ok, {'selected': sel, 'caret': c, 'acts': len(acts), 'copy_span': copy.get('span'), 'plain': (data.get('text/plain') or '')[:120], 'flavor': bool(data.get('application/x-skep-passage'))}
    shoot('select-all', select_check, recentre=lambda: ctx.leap(mine, 1))
    ctx.js('(async () => (await import("./overlays/selection.js")).clear())()'); ctx.esc(); ctx.frames(2)

    # ---- B3-S1 `launch`: the page opened again lands where the case last wrote --------------------------------------------
    want_line = t(ctx, 'B3.last-wrote', {'label': line1})
    p0 = len((line1).encode('utf8')) + 1  # the run the last burst placed: the two line breaks and the paragraph
    reads = []

    def launch_check(w):
        leave_page()
        ctx.open_editor_page('all', machine=True)
        landed = wait_for(ctx, '(async () => !!(await import("./nav/go.js")).launched())()', 15)
        ctx.settle(15); ctx.frames(3)
        la = ctx.js('(async () => (await import("./nav/go.js")).launched())()')
        seg, c, trail = ctx.js(LINE_TRANSIENT), caret(), ctx.js('window.__skep.trail().entries.map((e) => e.addr)')
        mark = ctx.js('(async () => { const m = (await import("./nav/go.js")).arrivalMark(); return m && {addr: m.addr, runs: m.runs}; })()')
        mounted, reading = mine in (ctx.js('window.__skep.mountedAddrs()') or []), ctx.js('(async () => (await import("./text/layer.js")).atReadingScale(%s))()' % json.dumps(mine))
        calls = ctx.js('window.__skep.bridge.calls().filter((x) => x.name === "changes" || (x.name === "op" && /^\\{"at":/.test(x.frame || ""))).map((x) => ({name: x.name, op: x.op || null, ms: Math.round(x.ms), bytes: x.bytesOut, entries: x.name === "changes" ? (JSON.parse(x.answer || "{}").result || {entries: []}).entries.length : null}))')
        reads.append({'width': w, 'calls': calls})
        ok = (landed and bool(la) and la['how'] == 'wrote' and la['addr'] == mine and la['caret'] == n + 1 and c == {'addr': mine, 'pos': n + 1, 'live': True} and trail == [mine]
              and bool(mark) and mark['addr'] == mine and mark['runs'] == [{'pos': p0, 'width': n + 1 - p0}] and mounted and reading
              and bool(seg) and seg['text'] == want_line and seg['id'] == 'B3.last-wrote' and seg['reading'] == [line1] and not seg['act'] and transient_seen(seg, w == NARROW_PX))
        return ok, {'launched': la, 'caret': c, 'trail': trail, 'arrival': mark, 'mounted': mounted, 'reading': reading, 'segment': seg, 'want': want_line, 'reads': calls}
    shoot('launch', launch_check)
    figures['launch_reads'] = reads


def machine_rows(ctx, r, rows, shoot, red, sent, ops_allowed, figures):
    """THE MACHINE's ROWS (D6 BM-1 … BM-30, BM-58 … BM-62): the page opened on the harness's provider WITH the machine
    (`machine=1`); a draft minted for this run on the test board through the page's port, two paragraphs written into
    it, and the caret placed in it; typing kept by the real board (`kept-on-board`); then each state the board has not
    kept the words in, reached by arming the provider's `op`, `held` and `resolve` answers and firing its events, each
    checked against `strings.js` and shot at both widths, and each put back to "kept" before the next. An arm of `op`
    is made only while the page is settled, so the next `op` is the burst's own frame; that it was is read from the
    page's own record of the call."""
    boot = ctx.open_editor_page('all', machine=True)
    session, board = ctx.js('window.__skep.model.session()'), ctx.js('window.__skep.model.board()')
    r.check(bool(boot) and boot.get('machine') is True and bool(session) and session.get('writes') is True,
            "the page opened on the harness's provider with `machine=1` boots with D6's machine handed in, under a session that writes", {'machine': boot and boot.get('machine'), 'writes': session and session.get('writes')})
    if not session or not board or not (boot and boot.get('machine')):
        for state in ('undo-lines', 'kept-on-board', 'held-in-session', 'row-inert', 'refused-run', 'hand-over', 'moved-face', 'halted-store', 'second-window', 'held-full', 'deletion-face', 'held-bars', 'paste-plain', 'cut', 'paste-kept-caret',
                      'paste-same', 'paste-after-cut', 'paste-own-draft', 'paste-unminted', 'paste-forged', 'source-faces', 'paste-held', 'published-target', 'corner-act', 'read', 'reclaimed', 'now-moved', 'not-last', 'in-flight', 'unread', 'unkept',
                      'pane-typed', 'pane-lines', 'pane-way-back', 'pane-close', 'pane-source-face', 'pane-forged-face', 'pane-removal', 'pane-refused', 'pane-held-bars'):
            red(state, 'the machine\'s page did not open')
        return
    sid, account, board_id = session['session'], session['account'], board['board']
    board_name = ctx.js('(async () => (await import("./strings.js")).t("L.mirror.board.name", {node: "1", origin: window.__skep.model.board().origin}))()')
    # the case's own draft: minted through the page's port, then its two paragraphs written into it
    minted = port_op(ctx, sid, {'op': 'create_new_document', 'account': account})
    mine = ((minted or {}).get('result') or {}).get('addr')
    r.check(bool(mine), "the case mints a draft of its own on the test board, through the page's port", minted)
    if not mine:
        return
    sent['minted'].append(mine)
    figures['minted'] = mine
    # the mint's own feed row lists the draft in the page's index before anything is written into it or flown to
    listed = wait_for(ctx, 'window.__skep.model.places().some((p) => p.doc === %s)' % json.dumps(mine), 10)
    seeded = port_op(ctx, sid, {'op': 'insert', 'doc': mine, 'at': {'ordinal': '1', 'subspace': '1'}, 'values': [SEED_TEXT], 'as_of': minted['result'].get('at')})
    r.check(listed and 'result' in (seeded or {}), "the page's index lists it as the feed brings its mint, and its two paragraphs are written into it, through the page's port", {'listed': listed, 'seeded': seeded})
    time.sleep(1.0)
    ctx.settle(15)
    corner = '#corners [data-corner="%s"]' % mine
    state = lambda: write_state(ctx, mine)
    # each width frames the draft as a landing does, its corner in view: beside its column, or at its head where the window is narrow
    recentre = lambda: ctx.leap(mine, 1)

    def quiet():
        """the page with no read out: what the next `op` is, is the next burst's frame"""
        ctx.settle(15); ctx.frames(3); ctx.settle(15)

    def caret_end(text):
        """the caret placed live at the end of the draft's first line, which reads `text`"""
        pos = len(text.encode('utf8')) + 1
        ctx.js('(async () => (await import("./text/layer.js")).placeCaret(%s, %d))()' % (json.dumps(mine), pos)); ctx.frames(2)
        return pos

    def press(text):
        for ch in text:
            ctx.drv.key(ch)
        ctx.frames(2)

    def corner_word():
        return ctx.js('((sel) => { const w = document.querySelector(sel + " .kept-word"); return w ? {word: w.textContent, id: w.dataset.string || null} : null; })(%s)' % json.dumps(corner))

    def first_line():
        return (ctx.js('(async () => { const L = await import("./text/layer.js"), R = await import("./model/records.js"), d = L.shownOf(%s); return d.from < 0 ? "" : R.textOf(d.runs, d.from, d.to); })()' % json.dumps(mine)) or '').split('\n')[0]

    def show_face():
        ctx.js('window.__skep.write.showFace(%s)' % json.dumps(mine)); ctx.frames(2)
        return ctx.js(FACE_SHOWN)

    def corner_face():
        return ctx.js(CORNER_FACE % json.dumps(corner)) or {}

    def open_corner(on):
        """the draft's corner opened whole on the reader's act, or closed again, where it stands otherwise (T-LAYER's `openCorner`)"""
        ctx.js('(async () => { const L = await import("./text/layer.js"), c = L.cornerAt(%s); if (c && c.opened !== %s) L.openCorner(%s); })()' % (json.dumps(mine), 'true' if on else 'false', json.dumps(mine)))
        ctx.frames(3)

    def face_act(run):
        """the act `run` of the face standing at the draft's corner clicked, the corner opened whole first where its face
        stands compact: whether the act stood there to click"""
        if not corner_face().get('whole'):
            open_corner(True)
        return ctx.js('((sel) => { const b = document.querySelector(sel); if (b) b.click(); return !!b; })(%s)' % json.dumps(corner + ' .face:not(.compact) [data-face="%s"]' % run))

    def refused_mark(words):
        """the refused mark beside `words`, typed at the end of the draft's first line (B3-S2 THE REFUSED RUN): one refused mark
        standing beside them, no other mark and no word "held"; as a check's part, (ok, detail)"""
        m = margin_beside(ctx, mine, len(line1.encode('utf8')) + 1, len(words.encode('utf8')), 'refused')
        return (m['words'] > 0 and m['beside'] == 1 and [x['kind'] for x in m['marks']] == ['refused'] and m['held'] == [], m)

    def held_row(k, cause, **more):
        return dict({'held': k, 'doc': mine, 'base': 0, 'frame': {'op': 'insert', 'doc': mine, 'at': {'ordinal': '1', 'subspace': '1'}, 'values': ['held'], 'as_of': 0, 'id': 'armed.%d' % k},
                     'cause': cause, 'sent': False, 'time': k}, **more)

    counter = {'k': ARMED_K}

    def hold_typed(text, cause, lines=None, **more):
        """`text` typed at the caret with the page's next `op` armed to answer `held` under `cause` and its next
        `held(session)` armed to list that line (`more` on its row, or `lines` whole): the burst the keys make is held
        by the shell as far as the page can tell. Answers the line's ordinal, and whether the armed `op` answered the
        burst's own frame"""
        quiet()
        counter['k'] += 1
        k = counter['k']
        seq = ctx.editor_seq()
        ctx.arm('op', answer={'resp': 'held', 'held': k, 'cause': cause})
        ctx.arm('held', answer=lines(k) if lines else [held_row(k, cause, **more)])
        press(text)
        took = wait_for(ctx, '(window.__skep.write.state(%s).held || []).some((x) => x.held === %d)' % (json.dumps(mine), k), 10)
        w = last_write(ctx, ops_allowed)
        ok = took and bool(w) and w['op'] == 'insert' and w['doc'] == mine and '"held"' in (w.get('answer') or '') and ctx.consumed('op', seq) and ctx.consumed('held', seq)
        return k, ok, {'took': took, 'last_write': w and {k2: w[k2] for k2 in ('op', 'doc', 'values')}}

    def drop_all(k, answer=None):
        """the held line dropped as the person's discard drops it, `resolve` armed to answer `answer` and the lines read
        after it armed to list none: the page's words of it leave, and the draft reads "kept" again"""
        ctx.arm('resolve', answer=answer if answer is not None else {})
        ctx.arm('held', answer=[])
        out = ctx.js('(async () => (await import("./write/machine.js")).drop(%s, %d))()' % (json.dumps(mine), k))
        ctx.js('(async () => (await import("./overlays/host.js")).dismiss())()')
        back = wait_for(ctx, 'window.__skep.write.state(%s).kept && window.__skep.write.state(%s).kept.word === "kept"' % (json.dumps(mine), json.dumps(mine)), 10)
        quiet()
        return out, back

    # ---- B3-S1: typing kept by the real board ---------------------------------------------------------------------------
    ctx.leap(mine, 1)
    ctx.js('window.__skep.model.loadWhole(%s)' % json.dumps(mine)); ctx.settle(); ctx.frames(2)
    quiet()
    line0 = first_line()
    stands = wait_for(ctx, '(window.__skep.mountedAddrs() || []).includes(%s) && !!document.querySelector(%s)' % (json.dumps(mine), json.dumps(corner)), 10)
    r.check(stands and line0 == SEED_TEXT.split('\n')[0], "the case's own draft stands at reading scale, its article mounted and its corner beside it, its first line as written",
            {'stands': stands, 'line': line0, 'focus': ctx.js('window.__skep.view.focus()')})
    if not stands:
        for st in ('undo-lines', 'kept-on-board', 'held-in-session', 'row-inert', 'refused-run', 'hand-over', 'moved-face', 'halted-store', 'second-window', 'held-full', 'deletion-face', 'held-bars', 'paste-plain', 'cut', 'paste-kept-caret',
                      'paste-same', 'paste-after-cut', 'paste-own-draft', 'paste-unminted', 'paste-forged', 'source-faces', 'paste-held', 'published-target', 'corner-act', 'read', 'reclaimed', 'now-moved', 'not-last', 'in-flight', 'unread', 'unkept',
                      'pane-typed', 'pane-lines', 'pane-way-back', 'pane-close', 'pane-source-face', 'pane-forged-face', 'pane-removal', 'pane-refused', 'pane-held-bars'):
            red(st, 'the case\'s own draft did not mount')
        return
    # ---- B3-S3: Mod+Z on an empty stack, before anything is typed in the draft (K-75; BM-42) ----------------------------------
    caret_end(line0)
    writes0 = len(ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "op" || c.name === "resolve")'))
    empty, empty_clause, constant = hint_whole(ctx, 'B3.undo.empty'), hint_whole(ctx, 'B3.undo.empty', False), sentence(ctx, 'B3.undo.constant')

    def empty_check(w):
        ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()'); ctx.frames(1)
        ctx.drv.key('z', mods=('Meta',)); ctx.frames(3)
        first, said = dict(hint(ctx), full=ctx.js('window.__skep.hint()')), live(ctx)
        f = first['full'] or {}
        if w == WIDE[0]:
            ok = f.get('id') == 'B3.undo.empty' and f.get('open') and f.get('words') == empty and f.get('ending') == constant and said == heard(ctx, empty + ' ' + constant) and first['seen']
        else:
            # a later press in the session: its first clause alone; its own act opens it whole again
            ok = f.get('id') == 'B3.undo.empty' and not f.get('open') and f.get('words') == empty_clause and f.get('ending') is None and said == heard(ctx, empty_clause) and first['seen']
            ctx.js('document.querySelector("#hint button[data-hint]").click()'); ctx.frames(3)
            f = ctx.js('window.__skep.hint()') or {}
            ok = ok and f.get('open') and f.get('words') == empty and f.get('ending') == constant and hint(ctx)['seen']
        drawn = ctx.js('(() => { const e = document.querySelector("#hint .ending"); return e ? {id: e.dataset.string, text: e.textContent} : null; })()')
        writes = len(ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "op" || c.name === "resolve")'))
        ok = ok and drawn == {'id': 'B3.undo.constant', 'text': constant} and writes == writes0 and first_line() == line0 and state()['islands'] == [] and ctx.js('window.__skep.write.stacks(%s)' % json.dumps(mine)) == {'undo': [], 'redo': []}
        return ok, {'first': first, 'said': said, 'opened': f, 'ending': drawn, 'want': [empty, empty_clause, constant], 'writes': [writes0, writes]}
    shoot('undo-lines', empty_check, recentre)
    ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
    caret_end(line0)
    press(' Kept.')
    landed = wait_for(ctx, '(() => { const s = window.__skep.write.state(%s); return !!s.kept && s.kept.word === "kept" && window.__skep.write.edits(%s).length === 0; })()' % (json.dumps(mine), json.dumps(mine)), 15)
    quiet()
    w0 = last_write(ctx, ops_allowed)
    on_board = port_op(ctx, sid, {'op': 'retrieve_v', 'specs': [{'doc': mine, 'span': {'start': '1.1', 'width': '0.%d' % (len(line0.encode('utf8')) + 6)}}]})
    board_text = ''.join(i.get('content', '') for i in (((on_board or {}).get('result') or {}).get('items') or []))

    def kept_check(w):
        got, st = corner_word(), state()
        ok = (landed and bool(w0) and w0['op'] == 'insert' and w0['doc'] == mine and w0.get('values') == [' Kept.'] and '"ack_addr"' in (w0.get('answer') or '')
              and board_text == line0 + ' Kept.' and first_line() == line0 + ' Kept.' and bool(got) and got['id'] == 'B3.kept' and got['word'] == t(ctx, 'B3.kept')
              and st['held'] == [] and st['islands'] == [] and isinstance(st['typed'], int) and len(shown(ctx, corner + ' .kept-word')) == 1)
        return ok, {'landed': landed, 'write': w0 and {k: w0[k] for k in ('op', 'doc', 'values')}, 'board': board_text, 'shown': first_line(), 'corner': got, 'state': st}
    shoot('kept-on-board', kept_check, recentre)
    line1 = first_line()

    # ---- B3-S2: a line held while the notebook is not answering (BM-8, BM-78); the row's sending slots inert (BM-62) -------------
    caret_end(line1)
    k, armed, how = hold_typed(' Held.', 'unreachable')
    r.check(armed, "the armed `op` answered the burst's own frame `held`, and the armed `held(session)` listed its line", how)
    ctx.fire('daemon', {'board': board_id, 'state': 'unreachable'})
    wait_for(ctx, 'window.__skep.model.daemon() === "unreachable"')

    def held_check(w):
        ctx.js('(async () => (await import("./text/layer.js")).openStatement(%s, true, "word"))()' % json.dumps(mine)); ctx.frames(2)
        got, st = corner_word(), state()
        said = ctx.js('((sel) => { const e = document.querySelector(sel + " .kept-statement"); return e ? {id: e.dataset.string, text: e.textContent} : null; })(%s)' % json.dumps(corner))
        seg = line_segment(ctx, 'B3.daemon.held.notebook')
        ok = (bool(got) and got['id'] == 'B3.not-yet-kept' and got['word'] == t(ctx, 'B3.not-yet-kept') and st['kept']['cause']['token'] == 'unreachable'
              and [x['held'] for x in st['held']] == [k] and said == {'id': 'B3.kept.held', 'text': sentence(ctx, 'B3.kept.held')} and seg == t(ctx, 'B3.daemon.held.notebook')
              and first_line() == line1 + ' Held.' and len(shown(ctx, corner + ' .kept-word')) == 1)
        m = margin_beside(ctx, mine, len(line1.encode('utf8')) + 1, len(' Held.'), 'held')
        return {'the corner and the line': (ok, {'corner': got, 'kept': st['kept'], 'held': st['held'], 'statement': said, 'segment': seg, 'shown': first_line()}),
                'no margin mark (J5)': (m['words'] > 0 and m['marks'] == [] and m['held'] == [], m)}
    shoot('held-in-session', held_check, recentre)
    ctx.js('(async () => (await import("./text/layer.js")).openStatement(%s, false))()' % json.dumps(mine))
    label = ctx.js('(async () => (await import("./text/layer.js")).boxName(%s).name)()' % json.dumps(mine))

    def inert_check(w):
        ctx.js('window.__skep.select(%s, 1, 6)' % json.dumps(mine)); ctx.frames(2)
        slots = ctx.js('Object.fromEntries(["annotate", "quote", "linkto", "wrote"].map((s) => { const b = document.querySelector("#overlay [data-run=\\"" + s + "\\"]"); return [s, b ? {inert: b.classList.contains("inert"), why: b.getAttribute("title")} : null]; }))')
        want = t(ctx, 'B3.row.held.resend', {'label': label})
        ok = all(slots.get(s) == {'inert': True, 'why': want} for s in ('annotate', 'quote', 'linkto')) and bool(slots.get('wrote')) and slots['wrote']['inert'] is False
        return ok, {'slots': slots, 'want': want}
    shoot('row-inert', inert_check, recentre)
    ctx.js('window.__skep.esc()'); ctx.js('window.__skep.esc()'); ctx.frames(2)
    ctx.fire('daemon', {'board': board_id, 'state': 'running'})
    wait_for(ctx, 'window.__skep.model.daemon() === "running"')
    out, back = drop_all(k)
    r.check(bool(out) and out.get('dropped') and back and first_line() == line1, 'the held line discarded: one `resolve(drop)`, its words gone from the text shown, the corner "kept" again', {'out': out, 'back': back, 'shown': first_line()})

    # ---- B3-S2: the refused run (BM-10) ---------------------------------------------------------------------------------------
    refusal = lambda name, **site: {'kind': 'refused', 'name': name, 'status': 200, 'code': name, 'detail': None, 'op': 'insert', 'site': site, 'body': None}
    caret_end(line1)
    k, armed, how = hold_typed(' Refused.', 'out_of_bounds', sent=True, refusal=refusal('out_of_bounds'))
    r.check(armed, 'the refused run is armed: the `held` answer and its row carrying the board\'s `out_of_bounds`', how)

    def refused_check(w):
        f, got, st = show_face(), corner_word(), state()
        ok = (bool(got) and got['id'] == 'B3.not-kept' and bool(f) and f['head'] == 'B3.not-kept' and [x['id'] for x in f['lines']] == ['B3.own-bug'] and f['lines'][0]['text'] == t(ctx, 'B3.own-bug')
              and [(a['run'], a['id'], a['inert']) for a in f['acts']] == [('send', 'B3.send-again', 'B3.own-bug.send-again'), ('copy', 'B3.copy-words-out', None), ('discard', 'B3.discard', None)]
              and [a['text'] for a in f['acts']] == [t(ctx, 'B3.send-again'), t(ctx, 'B3.copy-words-out'), t(ctx, 'B3.discard')]
              and f['said'] == {'id': 'B3.refused.discard', 'text': t(ctx, 'B3.refused.discard'), 'parts': 2, 'exit': False, 'below': True} and st['kept']['cause']['token'] == 'out_of_bounds'
              and len(shown(ctx, '#overlay .said .statement')) == 1)
        return {'the corner and the face': (ok, {'corner': got, 'face': f, 'kept': st['kept']}), 'the refused mark': refused_mark(' Refused.')}
    shoot('refused-run', refused_check, recentre)
    ctx.js('window.__skep.select(%s, 1, 6)' % json.dumps(mine)); ctx.frames(2)
    why = ctx.js('(document.querySelector("#overlay [data-run=annotate]") || {getAttribute: () => null}).getAttribute("title")')
    r.check(why == t(ctx, 'B3.row.held.resolve', {'label': label}), 'while a refused run stands the sending slots give the reason keyed on the person\'s act: "resolve them where they are marked, then take this" (B3.row.held.resolve)', why)
    ctx.js('window.__skep.esc()'); ctx.js('window.__skep.esc()'); ctx.frames(2)
    out, back = drop_all(k)
    r.check(bool(out) and out.get('dropped') and back and first_line() == line1, 'the refused run discarded: its words leave the text shown', {'out': out, 'shown': first_line()})

    # ---- B3-S2: the shell's hand-over (BM-26, BM-27) ----------------------------------------------------------------------------
    lost = {'kind': 'shell', 'name': 'answers_lost', 'last': 'unreachable', 'elapsed_ms': 125000}
    caret_end(line1)
    k, armed, how = hold_typed(' Lost.', 'answers_lost', sent=True, refusal=lost)
    r.check(armed, 'the hand-over is armed: the row carrying the shell\'s `answers_lost`', how)
    # the time elapsed in the strings table's own words, never the browser's language's (style S20): 125 s is 2 minutes
    minutes = t(ctx, 'L.duration.minutes', {'n': 2})

    def handed_check(w):
        f = show_face()
        ok = (bool(f) and f['head'] == 'B3.not-kept' and [x['id'] for x in f['lines']] == ['B3.answers_lost'] and f['lines'][0]['text'] == t(ctx, 'B3.answers_lost', {'board': board_name, 'time': minutes})
              and [(a['run'], a['inert']) for a in f['acts']] == [('send', None), ('copy', None), ('discard', None)]
              and f['said'] == {'id': 'B3.answers_lost.discard', 'text': t(ctx, 'B3.answers_lost.discard', {'board': board_name}), 'parts': 2, 'exit': False, 'below': True})
        return {'the face': (ok, {'face': f, 'want_line': t(ctx, 'B3.answers_lost', {'board': board_name, 'time': minutes})}), 'the refused mark': refused_mark(' Lost.')}
    shoot('hand-over', handed_check, recentre)
    show_face()
    ctx.arm('resolve', refusal={'kind': 'shell', 'name': 'landing_unread', 'held': k, 'why': 'unanswered'})
    ctx.arm('held', answer=[held_row(k, 'answers_lost', sent=True, refusal=lost)])
    ctx.js('document.querySelector("#overlay [data-run=discard]").click()')
    said = wait_for(ctx, '!!document.querySelector(%s)' % json.dumps('#line [data-string="B3.answers_lost.unanswered"]'), 10)
    stands = ctx.js(FACE_SHOWN)
    r.check(said and line_segment(ctx, 'B3.answers_lost.unanswered') == t(ctx, 'B3.answers_lost.unanswered', {'board': board_name}) and bool(stands) and (stands.get('id') or '').startswith('face:unkept:handed') and first_line() == line1 + ' Lost.',
            'the hand-over\'s discard, the read for its landing unanswered: the one line says "⟨board⟩ did not answer — nothing was discarded", and the face, its act and the words stand',
            {'said': said, 'line': line_segment(ctx, 'B3.answers_lost.unanswered'), 'face': stands and stands.get('id'), 'shown': first_line()})
    out, back = drop_all(k)
    r.check(bool(out) and out.get('dropped') and back and first_line() == line1, 'the hand-over discarded, the read finding no landing: its words leave', {'out': out, 'shown': first_line()})

    # ---- B3-S2: the moved document (BM-13, BM-16, BM-17, BM-18) -----------------------------------------------------------------
    hands = [{'key': 'other', 'fingerprint': 'aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899', 'label': 'desk'}]
    caret_end(line1)
    k, armed, how = hold_typed(' Moved.', 'moved', sent=True, refusal=refusal('arrangement_moved', as_of=1, current=2), sendable=False, hands=hands)
    r.check(armed, 'the moved document is armed: the row held `moved` with the board\'s `arrangement_moved` and its hands', how)

    def moved_check(w):
        got, st, at = corner_word(), state(), corner_face()
        # every word of the corner inside the box it stands in — beside its column the face's acts among them, each wrapped
        # between its words where its line is narrower than its label (issue #694)
        fit = fit_part(ctx, figures, 'moved-face', w, corner)
        # the corner, taller by the face, reaches into no other document's box and nothing clips it (the gate's `overlapCheck`)
        ov = ctx.js('window.__skep.overlapCheck()') or {}
        room = {'into': [x for x in ov.get('corners_into', []) if x['addr'] == mine], 'clipped': [x for x in ov.get('corners_clipped', []) if x['addr'] == mine]}
        overlay = show_face()
        compact = at.get('compact')
        line, hand, short = sentence(ctx, 'B3.moved'), sentence(ctx, 'B3.hand.device', {'device label': 'desk'}), t(ctx, 'B3.moved.compact', {'hand': 'desk'})
        # the compact act's name and its description as a screen reader hears them (style S22): the face's own dash and middle
        # dot pauses, the device's label the person's own words kept as written (T-ARTICLE's `faceRuns`)
        with_label = lambda words, before: (lambda by, end: [{'text': before + by, 'face': 'client'}, {'text': 'desk', 'face': 'reading'}, {'text': end, 'face': 'client'}])(*words.split('desk', 1))
        named, whole = heard(ctx, with_label(short, '')), heard(ctx, with_label(hand, line + ' '))
        compact_ok = (w == WIDE[0] and compact is None) or (bool(compact) and compact['id'] == 'B3.moved.compact' and compact['text'] == short and compact['name'] == named
                                                             and compact['opens'] and compact['expanded'] == 'false' and compact['whole'] == whole and compact['fits'] is True)
        if compact and not at.get('whole'):
            open_corner(True)
        f = corner_face().get('whole')
        ok = (bool(got) and got['id'] == 'B3.not-yet-kept' and st['kept']['cause']['token'] == 'moved' and at.get('order') is True and overlay is None and compact_ok and bool(f)
              and [x['id'] for x in f['lines']] == ['B3.moved'] and f['lines'][0]['text'] == line and f['hands'] == [{'id': 'B3.hand.device', 'text': hand}]
              and [(a['run'], a['id'], a['inert']) for a in f['acts']] == [('held', 'B3.moved.see-held', None), ('send', 'B3.send-again', 'B3.moved.send-again.inert'), ('discard', 'B3.discard', None)]
              and f['said'] == {'id': 'B3.moved.discard', 'text': t(ctx, 'B3.moved.discard'), 'parts': 3, 'exit': True, 'below': True})
        open_corner(False)
        # the kept word's act opens its statement, the face standing at the corner and no overlay shown (D5 K-57)
        ctx.js('((sel) => { const w = document.querySelector(sel + " .kept-word"); if (w) w.click(); })(%s)' % json.dumps(corner)); ctx.frames(3)
        said = ctx.js('((sel) => { const e = document.querySelector(sel + " .kept-statement"); return e ? e.dataset.string : null; })(%s)' % json.dumps(corner))
        word_ok = said == 'B3.save.before' and ctx.js(FACE_SHOWN) is None
        ctx.js('(async () => (await import("./text/layer.js")).openStatement(%s, false))()' % json.dumps(mine)); ctx.frames(2)
        m = margin_beside(ctx, mine, len(line1.encode('utf8')) + 1, len(' Moved.'), 'held')
        return {'the corner and the face': (ok, {'corner': got, 'kept': st['kept'], 'shown': at, 'face': f, 'overlay': overlay, 'heard': {'name': named, 'whole': whole}}),
                'the corner in its own room': (not room['into'] and not room['clipped'], room),
                "the corner's words in their boxes": fit,
                'the kept word\'s act (K-57)': (word_ok, {'statement': said}),
                'the held bar (D8)': (m['words'] > 0 and m['beside'] == 1 and [x['kind'] for x in m['marks']] == ['held'] and len(m['held']) == 1 and m['held'][0]['text'] == t(ctx, 'B3.held'), m)}
    shoot('moved-face', moved_check, recentre)
    # the first key after the verdict (BM-18): typed, held behind, and followed by the verdict's line
    quiet()
    seq = ctx.editor_seq()
    ctx.arm('op', answer={'resp': 'held', 'held': k + 500, 'cause': 'behind'})
    moved_row = held_row(k, 'moved', sent=True, refusal=refusal('arrangement_moved', as_of=1, current=2), sendable=False, hands=hands)
    ctx.arm('held', answer=[moved_row, held_row(k + 500, 'moved')])
    caret_end(line1 + ' Moved.')
    ctx.drv.key('x'); ctx.frames(2)
    told = hint(ctx)
    press('.')
    behind = wait_for(ctx, 'window.__skep.write.state(%s).held.length === 2' % json.dumps(mine), 10)
    r.check(bool(told['hint']) and told['hint']['id'] == 'B3.moved.first-key' and told['hint']['words'] == hint_whole(ctx, 'B3.moved.first-key') and behind and ctx.consumed('op', seq),
            'the first key typed after the moved verdict is typed, held behind the moved line, and followed at the focus by "this document changed while your text was held — what you type now is held with it and placed by hand" (B3.moved.first-key)',
            {'hint': told['hint'], 'behind': behind})
    ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
    ctx.arm('resolve', answer={'may_have_landed': [k]})
    ctx.arm('held', answer=[])
    clicked = face_act('discard')
    warned = wait_for(ctx, '!!document.querySelector(%s)' % json.dumps('#line [data-string="B3.discarded.may-have-landed"]'), 10)
    wait_for(ctx, 'window.__skep.write.state(%s).kept.word === "kept"' % json.dumps(mine), 10)
    ctx.frames(2)
    gone = corner_face()
    r.check(clicked and warned and line_segment(ctx, 'B3.discarded.may-have-landed') == t(ctx, 'B3.discarded.may-have-landed') and state()['held'] == [] and first_line() == line1
            and gone.get('compact') is None and gone.get('whole') is None,
            'the moved document\'s discard at its corner\'s face, from its first moved line, takes every later line with it — the held words gone from the text shown, the face gone from the corner — and, the answer naming a line that may have landed, the one line says "discarded here — it may already be on the board"',
            {'clicked': clicked, 'warned': warned, 'line': line_segment(ctx, 'B3.discarded.may-have-landed'), 'held': state()['held'], 'shown': first_line(), 'corner': gone})
    open_corner(False)
    ctx.drv.key('Escape'); ctx.frames(2)
    quiet()

    # ---- B3-S2: the halted store (BM-30) ---------------------------------------------------------------------------------------
    edits0 = ctx.js('window.__skep.write.edits(%s).length' % json.dumps(mine))
    ctx.arm('held', refusal={'kind': 'shell', 'name': 'store_halted', 'why': 'damaged'})
    ctx.fire('held', {'board': board_id, 'session': sid, 'doc': mine, 'held': 0, 'state': 'kept'})
    halted = wait_for(ctx, '(window.__skep.write.state(%s).unwritable || {}).why === "store_halted"' % json.dumps(mine), 10)
    caret_end(line1)

    def halted_check(w):
        want = '%s %s %s' % (sentence(ctx, 'B3.store_halted.damaged'), sentence(ctx, 'B3.store_halted.unsent'), sentence(ctx, 'B3.store_halted.damaged.cause'))
        seg = line_segment(ctx, 'B3.store_halted.damaged')
        act = ctx.js('(() => { const b = document.querySelector("#line [data-act=showfile]"); return b ? b.textContent : null; })()')
        ctx.drv.key('q'); ctx.frames(2)
        told = hint(ctx)
        n = ctx.js('window.__skep.write.edits(%s).length' % json.dumps(mine))
        ok = (halted and seg == want and act == t(ctx, 'B3.show-file') and len(shown(ctx, '#line [data-act=showfile]')) == 1 and n == edits0
              and bool(told['hint']) and told['hint']['id'] == 'B3.store_halted.caret' and first_line() == line1)
        return ok, {'halted': halted, 'segment': seg, 'want': want, 'act': act, 'hint': told['hint'], 'edits': n}
    shoot('halted-store', halted_check, recentre)
    ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
    ctx.arm('held', answer=[])
    ctx.fire('held', {'board': board_id, 'session': sid, 'doc': mine, 'held': 0, 'state': 'kept'})
    lifted = wait_for(ctx, 'window.__skep.write.state(%s).unwritable === null' % json.dumps(mine), 10)
    r.check(lifted, 'the held lines read again, answered: the halt\'s reason lifts', state().get('unwritable'))

    # ---- B3-S2: a second window (BM-60) -----------------------------------------------------------------------------------------
    ctx.fire('another-window', {'board': board_id, 'another_window': True})
    second = wait_for(ctx, '(window.__skep.write.state(%s).unwritable || {}).why === "another_window"' % json.dumps(mine), 10)
    caret_end(line1)

    def window_check(w):
        seg = line_segment(ctx, 'B3.another_window')
        act = ctx.js('(() => { const b = document.querySelector("#line [data-act=copyaddr]"); return b ? b.textContent : null; })()')
        ctx.drv.key('q'); ctx.frames(2)
        told = hint(ctx)
        n = ctx.js('window.__skep.write.edits(%s).length' % json.dumps(mine))
        ok = (second and seg == t(ctx, 'B3.another_window') and act == t(ctx, 'B3.copy-address') and n == edits0 and bool(told['hint']) and told['hint']['id'] == 'B3.another_window' and first_line() == line1)
        return ok, {'second': second, 'segment': seg, 'act': act, 'hint': told['hint'], 'edits': n}
    shoot('second-window', window_check, recentre)
    ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
    ctx.fire('another-window', {'board': board_id, 'another_window': False})
    r.check(wait_for(ctx, 'window.__skep.write.state(%s).unwritable === null' % json.dumps(mine), 10), 'the event\'s other edge lifts the second window\'s reason', state().get('unwritable'))

    # ---- B3-S2: the held store's bound (BM-19, BM-20) ---------------------------------------------------------------------------
    quiet()
    caret_end(line1)
    seq = ctx.editor_seq()
    ctx.arm('op', refusal='held_full')
    press(' Full.')
    full = wait_for(ctx, '(window.__skep.write.state(%s).unwritable || {}).why === "held_full"' % json.dumps(mine), 10)
    r.check(full and ctx.consumed('op', seq), 'the armed `op` refused the burst\'s own frame `held_full`', {'full': full, 'state': state()})

    def full_check(w):
        f, st = show_face(), state()
        seg = line_segment(ctx, 'B3.held_full.line')
        ctx.js('(async () => (await import("./overlays/host.js")).dismiss())()'); ctx.frames(1)
        ctx.drv.key('q'); ctx.frames(2)
        told = hint(ctx)
        ok = (full and seg == t(ctx, 'B3.held_full.line', {'board': board_name}) and bool(f) and f['head'] == 'B3.not-kept' and [x['id'] for x in f['lines']] == ['B3.held_full.refused']
              and [(a['run'], a['inert']) for a in f['acts']] == [('send', 'B3.held_full.refused'), ('copy', None), ('discard', None)] and st['kept']['cause']['token'] == 'held_full'
              and [i['name'] for i in st['islands']] == ['held_full'] and bool(told['hint']) and told['hint']['id'] == 'B3.held_full.caret' and first_line() == line1 + ' Full.')
        return {'the line, the face and the caret': (ok, {'segment': seg, 'face': f, 'kept': st['kept'], 'islands': st['islands'], 'hint': told['hint'], 'shown': first_line()}),
                'the refused mark': refused_mark(' Full.')}
    shoot('held-full', full_check, recentre)
    ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
    # the store drains: a `held` event saying a line kept, the lines read again; the page sends the waiting change itself
    quiet()
    ctx.arm('held', answer=[])
    ctx.fire('held', {'board': board_id, 'session': sid, 'doc': mine, 'held': 0, 'state': 'kept'})
    drained = wait_for(ctx, '(() => { const s = window.__skep.write.state(%s); return s.unwritable === null && s.islands.length === 0 && !!s.kept && s.kept.word === "kept" && window.__skep.write.edits(%s).length === 0; })()' % (json.dumps(mine), json.dumps(mine)), 15)
    quiet()
    w1 = last_write(ctx, ops_allowed)
    r.check(drained and bool(w1) and w1['op'] == 'insert' and w1['doc'] == mine and w1.get('values') == [' Full.'] and '"ack_addr"' in (w1.get('answer') or '') and first_line() == line1 + ' Full.',
            'as the store drains the page sends the waiting change itself, in its turn: its insert reaches the test board and is acked, the island and the bound\'s reason lift, and the corner reads "kept"',
            {'drained': drained, 'write': w1 and {k2: w1[k2] for k2 in ('op', 'doc', 'values')}, 'state': state(), 'shown': first_line()})
    ctx.drv.key('Escape'); ctx.frames(2)
    held = dict(mine=mine, sid=sid, board_id=board_id, corner=corner, state=state, recentre=recentre, quiet=quiet, caret_end=caret_end, press=press,
                corner_word=corner_word, first_line=first_line, hold_typed=hold_typed, held_row=held_row, drop_all=drop_all, refusal=refusal, figures=figures)
    undo_rows(ctx, r, shoot, red, ops_allowed, held)
    paste_rows(ctx, r, shoot, red, ops_allowed, held)
    same_rows(ctx, r, shoot, red, ops_allowed, held)
    published_rows(ctx, r, shoot, red, ops_allowed, held)
    past_rows(ctx, r, shoot, red, ops_allowed, held)
    pane_rows(ctx, r, shoot, red, ops_allowed, held)


# the words the reopen row's armed line types before the case's own draft's first line: a paragraph of their own
REOPENED = 'Held on this device before the page opened again, these words wait for the board to keep them.\n\n'


def reopen_rows(ctx, r, shoot, red, mine):
    """THE HELD BARS AT REOPEN (B3-S2 AT REOPEN; D6 BM-29, BM-25): `held(session)` armed to list one insert line of the
    case's own draft `mine` that no window of this run sent, and the machine's page opened again over it — the line applied
    before the draft's first line, one held bar beside its words from their first line to their last and "held" once in
    the edge at the bar's top, at both widths (`held-bars`); then `held` armed to list none and a `held` event fired naming
    the line landed, the bar and the word lifted. Nothing is written: the line is the arm's, its landing the event's."""
    k = ARMED_K + 900
    row = {'held': k, 'doc': mine, 'base': 0, 'frame': {'op': 'insert', 'doc': mine, 'at': {'ordinal': '1', 'subspace': '1'}, 'values': [REOPENED], 'as_of': 0, 'id': 'armed.%d' % k},
           'cause': 'unreachable', 'sent': False, 'time': k}
    seq = ctx.editor_seq()
    ctx.arm('held', answer=[row])
    ctx.open_editor_page('all', machine=True)
    session, board = ctx.js('window.__skep.model.session()'), ctx.js('window.__skep.model.board()')
    applied = wait_for(ctx, '(window.__skep.write.state(%s).reopened || []).some((l) => l.held === %d && l.at === null)' % (json.dumps(mine), k), 15)
    r.check(bool(session) and bool(board) and applied and ctx.consumed('held', seq),
            "the machine's page opened again over the armed `held(session)` list: the line it names held and applied over the case's own draft (D6 BM-29)",
            {'applied': applied, 'consumed': ctx.consumed('held', seq), 'state': write_state(ctx, mine)})
    if not (session and board and applied):
        red('held-bars', 'the page opened again did not apply the armed line')
        return
    recentre = lambda: ctx.leap(mine, 1)
    recentre()
    ctx.js('window.__skep.model.loadWhole(%s)' % json.dumps(mine)); ctx.settle(); ctx.frames(2)
    n = len(REOPENED.rstrip('\n').encode('utf8'))

    def bar_check(w):
        got = margin_beside(ctx, mine, 1, n, 'held')
        text = ctx.js('(async () => { const L = await import("./text/layer.js"), R = await import("./model/records.js"), d = L.shownOf(%s); return d.from < 0 ? "" : R.textOf(d.runs, d.from, d.from + %d); })()' % (json.dumps(mine), n))
        bars = [x for x in got['marks'] if x['kind'] == 'held' and not x['point']]
        word = got['held'][0] if len(got['held']) == 1 else None
        ok = (text == REOPENED[:n] and got['words'] > 0 and got['beside'] == 1 and len(got['marks']) == 1 and len(bars) == 1
              and bool(word) and word['text'] == t(ctx, 'B3.held') and word['column'] == bars[0]['column'] and abs(word['placed']['y'] - bars[0]['placed']['y']) <= 1)
        return ok, dict(got, text=text)
    shoot('held-bars', bar_check, recentre)
    seq = ctx.editor_seq()
    ctx.arm('held', answer=[])
    ctx.fire('held', {'board': board['board'], 'session': session['session'], 'doc': mine, 'held': 0, 'state': 'kept', 'landed': [{'held': k, 'burst': 'armed.%d' % k, 'at': None, 'addr': None}]})
    landed = wait_for(ctx, '(window.__skep.write.state(%s).reopened || []).some((l) => l.held === %d && l.at !== null)' % (json.dumps(mine), k), 10)
    ctx.settle(); ctx.frames(3)
    after = margin_beside(ctx, mine, 1, n, 'held')
    r.check(landed and ctx.consumed('held', seq) and after['marks'] == [] and after['held'] == [],
            'B3-S2 · held-bars: the `held` event naming the line landed lifts its held bar and the word "held" (D6 BM-25), its words standing until a read sets the text',
            {'landed': landed, 'consumed': ctx.consumed('held', seq), 'after': after, 'state': write_state(ctx, mine)})


def undo_rows(ctx, r, shoot, red, ops_allowed, m):
    """UNDO, REDO AND THE DELETION FACE (D6 BM-31 … BM-34, BM-45, BM-51, BM-81, BM-11), on the machine's page, the case's
    own draft holding kept words. Against the test board: Backspace over kept words commits a `delete`, and the deletion
    face stands whole at the removal point (`deletion-face`, shot at both widths); Mod+Z puts the words back by a
    `reinstate`, the mark gone; Mod+Shift+Z removes them again, its mark compact, the mark's act opening the face; a run of
    typing kept, undone, is a `delete` on the board and a compact mark, and its redo a `reinstate`, never an insert. By
    arming the harness's provider: an undone run whose line the shell holds is dropped by one `resolve(drop)`; a line
    marked `sent` whose landing cannot be read leaves the drop owed — the text taken back, the corner "not yet kept" — and
    is dropped at the line's next `held` event; an undo's `reinstate` refused `withheld` is declined in the one line; and
    an undo at a refused run shows its face and drops nothing. Each word is checked against `strings.js`."""
    mine, sid, board_id, corner = m['mine'], m['sid'], m['board_id'], m['corner']
    state, recentre, quiet, caret_end, press = m['state'], m['recentre'], m['quiet'], m['caret_end'], m['press']
    corner_word, first_line, hold_typed, held_row, drop_all, refusal = m['corner_word'], m['first_line'], m['hold_typed'], m['held_row'], m['drop_all'], m['refusal']
    removed = lambda: ctx.js('window.__skep.removed()') or []
    stacks = lambda: ctx.js('window.__skep.write.stacks(%s)' % json.dumps(mine))
    def said_of(sid_, words):
        """what an undo or a redo says of a run, rendered for the ear, the person's words kept as written (N-KEYS' `undoSaid`)"""
        head, _, tail = t(ctx, sid_).partition('⟨first words⟩')
        return heard(ctx, [{'text': head, 'face': 'client'}, {'text': words, 'face': 'reading'}, {'text': tail, 'face': 'client'}])

    def board_line():
        """the draft's first line as the test board holds it, read through the page's port"""
        got = port_op(ctx, sid, {'op': 'retrieve_v', 'specs': [{'doc': mine, 'span': {'start': '1.1', 'width': '0.400'}}]})
        return ''.join(i.get('content', '') for i in (((got or {}).get('result') or {}).get('items') or [])).split('\n')[0]

    def kept(max_s=15):
        """the draft kept on the board again: the corner "kept", every edit read back"""
        ok = wait_for(ctx, '(() => { const s = window.__skep.write.state(%s); return !!s.kept && s.kept.word === "kept" && !s.inFlight && window.__skep.write.edits(%s).filter((e) => e.at == null).length === 0; })()' % (json.dumps(mine), json.dumps(mine)), max_s)
        quiet()
        return ok

    def chord(shift=False):
        ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
        ctx.drv.key('z', mods=('Meta', 'Shift') if shift else ('Meta',)); ctx.frames(3)

    # ---- B3-S4: the deletion face at a removal of kept text (BM-51) ----------------------------------------------------------
    quiet()
    line = first_line()
    gone = line.split(' ')[-1]
    kept_line = line[:-(len(gone) + 1)]
    caret_end(line)
    faces0 = removed()
    for _ in range(len(gone) + 1):
        ctx.drv.key('Backspace')
    ctx.frames(2)
    at_keys = removed()
    faced = wait_for(ctx, '(window.__skep.removed() || []).length === 1', 10)
    landed = kept()
    w = last_write(ctx, ops_allowed)
    r.check(faces0 == [] and at_keys == [] and faced and landed and bool(w) and w['op'] == 'delete' and w['doc'] == mine and '"ack"' in (w.get('answer') or '') and first_line() == kept_line and board_line() == kept_line,
            'Backspace over kept words: no face at the keys — the removal still inside its open burst — and one as the burst\'s commit composes its `delete`, which reaches the test board and is acked, the board\'s text and the text shown the same',
            {'before': faces0, 'at_keys': at_keys, 'faced': faced, 'landed': landed, 'write': w and {k: w[k] for k in ('op', 'doc')}, 'shown': first_line(), 'board': board_line(), 'want': kept_line})

    def face_check(wd):
        got, caret, top = removed(), ctx.js('window.__skep.caret()'), ctx.js('document.getElementById("line").getBoundingClientRect().bottom')
        f = got[0] if got else {}
        parts = ctx.js('[...document.querySelectorAll("#removed .face .part")].map((e) => ({id: e.dataset.string, text: e.textContent}))')
        mark = ctx.js('(() => { const b = document.querySelector("#removed button.mark"); return b ? {title: b.getAttribute("title"), name: b.getAttribute("aria-label"), expanded: b.getAttribute("aria-expanded"), focused: document.activeElement === b} : null; })()')
        box = f.get('face') or {}
        inside = bool(box) and box['x'] >= -0.5 and box['x'] + box['w'] <= wd + 0.5 and box['y'] >= top - 0.5 and box['y'] + box['h'] <= 900 + 0.5
        ok = (len(got) == 1 and f.get('addr') == mine and f.get('whole') is True and f.get('words') == ' ' + gone and f.get('by') in ('beside', 'beneath') and inside
              and parts == [{'id': 'C-49', 'text': t(ctx, 'C-49')}, {'id': 'B3.deletion.private', 'text': t(ctx, 'B3.deletion.private')}]
              and mark == {'title': t(ctx, 'B3.removed-here'), 'name': t(ctx, 'B3.removed-here'), 'expanded': 'true', 'focused': False}
              and len(shown(ctx, '#removed .face')) == 1 and len(shown(ctx, '#removed button.mark')) == 1
              and not ctx.js('document.getElementById("removed").contains(document.activeElement)') and bool(caret) and caret.get('addr') == mine and first_line() == kept_line)
        return ok, {'removed': got, 'parts': parts, 'mark': mark, 'inside': inside, 'caret': caret, 'shown': first_line()}
    shoot('deletion-face', face_check, recentre)

    # ---- B3-S3: the undo of that removal, by `reinstate`; its redo; and the mark with them (BM-32, BM-33) --------------------------
    chord()
    back = kept()
    w = last_write(ctx, ops_allowed)
    r.check(back and first_line() == line and board_line() == line and bool(w) and w['op'] == 'reinstate' and w['doc'] == mine and '"ack"' in (w.get('answer') or '') and removed() == []
            and stacks()['redo'] and len(stacks()['redo']) == 1 and corner_word() == {'word': t(ctx, 'B3.kept'), 'id': 'B3.kept'},
            'Mod+Z puts the removed words back: the text shown and the test board\'s the same again, by one `reinstate` acked — never an insert — the removal\'s mark gone with it, the step on the redo stack, the corner "kept"',
            {'kept': back, 'shown': first_line(), 'board': board_line(), 'write': w and {k: w[k] for k in ('op', 'doc')}, 'removed': removed(), 'stacks': stacks()})
    chord(shift=True)
    again = kept()
    w = last_write(ctx, ops_allowed)
    marks = removed()
    r.check(again and first_line() == kept_line and board_line() == kept_line and bool(w) and w['op'] == 'delete' and len(marks) == 1 and marks[0]['whole'] is False and marks[0]['face'] is None,
            'Mod+Shift+Z removes them again — one `delete` acked — and this removal\'s face is a compact mark: the draft\'s first removal in the session is past',
            {'kept': again, 'shown': first_line(), 'board': board_line(), 'write': w and {k: w[k] for k in ('op', 'doc')}, 'removed': marks})
    ctx.js('document.querySelector("#removed button.mark").click()'); ctx.frames(3)
    opened = removed()
    r.check(len(opened) == 1 and opened[0]['whole'] is True and [p['id'] for p in opened[0]['parts']] == ['C-49', 'B3.deletion.private'] and live(ctx) == heard(ctx, '%s %s' % (t(ctx, 'C-49'), t(ctx, 'B3.deletion.private'))),
            'the compact mark\'s act opens the face whole, its words said in the status region, rendered for the ear (style S22)', {'removed': opened, 'live': live(ctx)})
    chord()
    back = kept()
    r.check(back and first_line() == line and board_line() == line and removed() == [], 'Mod+Z again: the words back on the page and on the board, no mark standing', {'shown': first_line(), 'board': board_line(), 'removed': removed()})

    # ---- B3-S3: a run of typing, kept, undone and redone against the test board (BM-34, BM-33) -----------------------------------
    caret_end(line)
    press(' Undone.')
    typed = kept()
    r.check(typed and first_line() == line + ' Undone.' and stacks()['undo'][-1]['kind'] == 'typing', 'a run of typing kept by the test board (what the next checks stand on)', {'shown': first_line(), 'stacks': stacks()})
    chord()
    told, taken = live(ctx), kept()
    w = last_write(ctx, ops_allowed)
    marks = removed()
    r.check(taken and told.startswith(said_of('B3.undo.said.taken-out', 'Undone.')) and first_line() == line and board_line() == line and bool(w) and w['op'] == 'delete' and '"ack"' in (w.get('answer') or '')
            and len(marks) == 1 and marks[0]['words'] == ' Undone.' and marks[0]['whole'] is False and ctx.js('window.__skep.caret()') == {'addr': mine, 'pos': len(line.encode('utf8')) + 1, 'live': True},
            'Mod+Z takes the run back whole: the status region says "taken out — “Undone.”", the caret stands live where the run began, one `delete` of the placed words reaches the test board, and the removal — words a dial carried — is a compact mark decided at the press',
            {'said': told, 'shown': first_line(), 'board': board_line(), 'write': w and {k: w[k] for k in ('op', 'doc')}, 'removed': marks, 'caret': ctx.js('window.__skep.caret()')})
    chord(shift=True)
    told, redone = live(ctx), kept()
    w = last_write(ctx, ops_allowed)
    r.check(redone and told.startswith(said_of('B3.undo.said.put-back', 'Undone.')) and first_line() == line + ' Undone.' and board_line() == line + ' Undone.' and bool(w) and w['op'] == 'reinstate' and removed() == [],
            'Mod+Shift+Z puts the run back: "put back — “Undone.”" said, the words on the board again by a `reinstate` of their own bytes — never an insert of new ones — the mark gone',
            {'said': told, 'shown': first_line(), 'board': board_line(), 'write': w and {k: w[k] for k in ('op', 'doc', 'values')}, 'removed': removed()})
    chord()
    r.check(kept() and first_line() == line and board_line() == line, 'and Mod+Z takes it back out again, the board following', {'shown': first_line(), 'board': board_line()})
    ctx.js('(async () => { (await import("./overlays/host.js")).dismiss(); })()')

    # ---- B3-S3: the no-caret line, naming where the person was last writing (BM-42) ----------------------------------------------
    ctx.drv.key('Escape'); ctx.frames(2)
    scale = ctx.camera()
    ctx.view_doc_em(mine, 2)
    label = ctx.js('(async () => (await import("./text/layer.js")).boxName(%s).name)()' % json.dumps(mine))
    named_runs = ctx.js('(async () => { const S = await import("./strings.js"), L = await import("./text/layer.js"); return S.sentenceRuns("B3.undo.last-writing", {label: L.boxName(%s).runs}); })()' % json.dumps(mine))
    ctx.js('(async () => { (await import("./overlays/hint.js"))._reset(); })()')
    ctx.drv.key('z', mods=('Meta',)); ctx.frames(3)
    h = ctx.js('window.__skep.hint()') or {}
    none, writing, constant = hint_whole(ctx, 'B3.undo.none'), sentence(ctx, 'B3.undo.last-writing', {'label': label}), sentence(ctx, 'B3.undo.constant')
    spoken = heard(ctx, [{'text': none + ' ', 'face': 'client'}, *named_runs, {'text': ' ' + constant, 'face': 'client'}])
    r.check(h.get('id') == 'B3.undo.none' and h.get('words') == none and fold(h.get('writing')) == fold(writing) and h.get('ending') == constant and fold(live(ctx)) == fold(spoken) and first_line() == line,
            'with the draft below its reading scale Mod+Z changes nothing and says so, each a sentence: "Undo works in the text of a draft you are writing — there is nothing here to undo.", "You were last writing in ⟨label⟩.", then the constant sentence',
            {'hint': h, 'live': live(ctx), 'want': [none, writing, constant], 'heard': spoken})
    ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
    ctx.set_view(scale['x'], scale['y'], scale['scale'])
    recentre()

    # ---- B3-S3: an undone run whose line the shell holds: one `resolve(drop)` (BM-81) ---------------------------------------------
    caret_end(line)
    k, armed, how = hold_typed(' Held.', 'unreachable')
    r.check(armed, "the held run is armed: the burst's own frame answered `held`, its line listed, never dialed", how)
    seq = ctx.editor_seq()
    ctx.arm('resolve', answer={})
    ctx.arm('held', answer=[])
    marks0, writes0 = len(removed()), last_write(ctx, ops_allowed)
    resolves0 = ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "resolve").length')
    chord()
    dropped = wait_for(ctx, '(() => { const s = window.__skep.write.state(%s); return s.held.length === 0 && !!s.kept && s.kept.word === "kept"; })()' % json.dumps(mine), 10)
    quiet()
    resolves = ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "resolve").length') - resolves0
    r.check(dropped and resolves == 1 and first_line() == line and ctx.consumed('resolve', seq) and ctx.consumed('held', seq) and last_write(ctx, ops_allowed) == writes0 and len(removed()) == marks0,
            'Mod+Z at a run whose line the shell holds takes it back on the page at once and sends ONE `resolve(drop)`, then reads the held lines again: the corner "kept", no inverse composed, and no deletion face — no dial of that line left this device',
            {'dropped': dropped, 'resolves': resolves, 'shown': first_line(), 'state': state(), 'removed': removed()})

    # ---- B3-S3: a held line marked `sent` while the board is not answering — `landing_unread`: the drop owed (BM-81) ---------------
    caret_end(line)
    k, armed, how = hold_typed(' Unread.', 'unreachable', sent=True)
    r.check(armed, 'the `sent` held line is armed', how)
    seq = ctx.editor_seq()
    ctx.arm('resolve', refusal={'kind': 'shell', 'name': 'landing_unread', 'held': k, 'why': 'unanswered'})
    ctx.arm('held', answer=[held_row(k, 'unreachable', sent=True)])
    chord()
    refused_drop = wait_for(ctx, '%s' % ('window.__skep.bridge.calls().filter((c) => c.name === "resolve").length > 0'), 10) and ctx.consumed('resolve', seq)
    ctx.frames(3); quiet()
    st, got = state(), corner_word()
    r.check(refused_drop and first_line() == line and [x['held'] for x in st['held']] == [k] and st['held'][0]['refusal'] is None and bool(got) and got['id'] == 'B3.not-yet-kept' and st['kept']['cause']['token'] == 'unreachable'
            and ctx.js('window.__skep.overlay().id') is None,
            'the drop refused `landing_unread`: the run stays taken back on the page, the line stands held and the drop owed, the corner keeps "not yet kept" by the line\'s cause, and no face is drawn',
            {'refused': refused_drop, 'shown': first_line(), 'state': st, 'corner': got, 'overlay': ctx.js('window.__skep.overlay().id')})
    # the line's next `held` event: the shell's list holds the line still as the event's read is answered, and the drop then takes it
    seq = ctx.editor_seq()
    ctx.arm('resolve', answer={})
    ctx.arm('held', answer=[held_row(k, 'unreachable', sent=True)])
    ctx.fire('held', {'board': board_id, 'session': sid, 'doc': mine, 'held': 1, 'state': 'holding', 'cause': 'unreachable'})
    settled = wait_for(ctx, '(() => { const s = window.__skep.write.state(%s); return s.held.length === 0 && !!s.kept && s.kept.word === "kept"; })()' % json.dumps(mine), 10)
    quiet()
    r.check(settled and ctx.consumed('resolve', seq) and ctx.consumed('held', seq) and first_line() == line and board_line() == line,
            "the line's next `held` event asks the drop again; dropped, the corner reads \"kept\" and the text stands as the person left it, the board's the same", {'settled': settled, 'state': state(), 'shown': first_line(), 'board': board_line()})

    # ---- B3-S3: an undo's `reinstate` refused `withheld`: declined, said in the one line (BM-11, BM-12) -----------------------------
    line = first_line()
    last = line.split(' ')[-1]
    short = line[:-(len(last) + 1)]
    caret_end(line)
    for _ in range(len(last) + 1):
        ctx.drv.key('Backspace')
    cut = kept()
    r.check(cut and first_line() == short and board_line() == short, 'a removal of kept words, kept (what the next check stands on)', {'shown': first_line(), 'board': board_line()})
    seq = ctx.editor_seq()
    ctx.arm('op', refusal={'kind': 'refused', 'name': 'withheld', 'status': 200, 'code': 'withheld', 'detail': None, 'op': 'reinstate', 'site': {'addr': mine}, 'body': None})
    chord()
    said = wait_for(ctx, '!!document.querySelector(%s)' % json.dumps('#line [data-string="B3.undo.withheld"]'), 10)
    quiet()
    want = '%s %s' % (sentence(ctx, 'B3.undo.withheld', {'origin': mine}), sentence(ctx, 'B3.undo.again', {'undo chord': '⌘Z'}))
    st = state()
    r.check(said and fold(line_segment(ctx, 'B3.undo.withheld')) == fold(want) and ctx.consumed('op', seq) and first_line() == short and st['islands'] == [] and st['held'] == [] and st['kept']['word'] == 'kept'
            and stacks()['redo'] == [] and ctx.js('window.__skep.overlay().id') is None,
            'an undo\'s `reinstate` the board refuses `withheld` is declined: the one line says "The source of this passage is withheld from you now — ⟨origin⟩; …", then "⌘Z again undoes what you did before it.", a sentence of its own; the words are gone from the text again, no refused run stands, the corner reads "kept", and the step is off the stack',
            {'said': said, 'line': line_segment(ctx, 'B3.undo.withheld'), 'want': want, 'shown': first_line(), 'state': st, 'stacks': stacks()})
    ctx.drv.key('Escape'); ctx.frames(2)

    # ---- B3-S3: an undo at a refused run is answered at its face (BM-45) -----------------------------------------------------------
    line = first_line()
    caret_end(line)
    k, armed, how = hold_typed(' Refused.', 'out_of_bounds', sent=True, refusal=refusal('out_of_bounds'))
    r.check(armed, 'the refused run is armed', how)
    calls0 = ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "resolve" || c.name === "op").length')
    chord()
    f = ctx.js(FACE_SHOWN)
    r.check(bool(f) and (f.get('id') or '') == 'face:unkept:own-bug:%s' % mine and [a['run'] for a in f['acts']] == ['send', 'copy', 'discard'] and first_line() == line + ' Refused.' and [x['held'] for x in state()['held']] == [k]
            and ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "resolve" || c.name === "op").length') == calls0
            and not ctx.js('document.getElementById("overlay").contains(document.activeElement)'),
            'Mod+Z at a refused run composes nothing and drops nothing: the press is answered at the run\'s face — its acts shown, none taken, the focus where it stood — the words standing',
            {'face': f, 'shown': first_line(), 'held': state()['held']})
    out, back = drop_all(k)
    r.check(bool(out) and out.get('dropped') and back and first_line() == line, 'discarded at its face, the run\'s words leave', {'out': out, 'shown': first_line()})
    ctx.drv.key('Escape'); ctx.frames(2)


# what the copy door's clipboard takes of the selection standing: its span, the bytes of its plain text and of skep's own
# entry, and that entry's parts by kind — bytes the board holds, bytes the page made, stretches its image does not place
COPY_SIZES = '''(() => { const c = window.__skep.copy(), d = c.data || {}, e = d["application/x-skep-passage"] || "", p = d["text/plain"] || "", n = (s) => new TextEncoder().encode(s).length;
  const ids = e ? JSON.parse(e).ids : [];
  return {span: c.span, flavors: Object.keys(d).sort(), plain_bytes: n(p), entry_bytes: n(e),
          parts: {board: ids.filter((x) => !x.gap && !x.load).length, page: ids.filter((x) => x.load).length, gap: ids.filter((x) => x.gap).length}}; })()'''


def whole_entry(ctx, r):
    """THE WHOLE DOCUMENT's ENTRY (the paste survey's U4; FP-18): the seeded staging draft — longer than the page holds at
    once — landed at, a caret placed at its first position and Mod+A pressed, then the copy door three frames on: what its
    clipboard takes of the document selected whole, in bytes. The door copies the platform's own selection, which the page
    places over the lines that stand, so the reading is that moment's and is recorded with what explains it (`at_copy`):
    the positions the page holds of the draft then, and the span the platform's selection covers — none while its range
    is still owed. Beside it, for the positions the page held as it landed, the entry T-LAYER names for a copy of them
    (`namedIn`), no selection made. Reads alone: the caret and the selection are page state, and both are let go after.
    Its figures, the seconds the landing took among them."""
    t0 = time.time()
    ctx.leap(STAGING, 1)
    out = {'doc': STAGING, 'leap_s': round(time.time() - t0, 1)}
    try:
        d = ctx.js('(() => { const d = window.__skep.model.doc(%s); return {extent: d.extent, from: d.from, to: d.to}; })()' % json.dumps(STAGING))
        out.update(extent=d['extent'], held=[d['from'], d['to']])
        # the positions the page holds as it lands, named as a copy of them is: read before the selection, which reads on past them
        out['held_part'] = ctx.js('''(async (addr, from, to) => { const L = await import("./text/layer.js"), rec = L.mountedSet().get(addr), b = window.__skep.model.board();
          const named = rec && from >= 0 ? L.namedIn(rec.el, {addr, pos: from, width: to - from}, b ? b.origin : "") : null;
          return named && {width: to - from, entry_bytes: new TextEncoder().encode(JSON.stringify(named)).length,
                           parts: {board: named.ids.filter((x) => !x.gap && !x.load).length, page: named.ids.filter((x) => x.load).length, gap: named.ids.filter((x) => x.gap).length}}; })(%s, %d, %d)''' % (json.dumps(STAGING), d['from'], d['to']))
        ctx.js('(async () => (await import("./text/layer.js")).placeCaret(%s, %d))()' % (json.dumps(STAGING), max(1, d['from']))); ctx.frames(2)
        ctx.drv.key('a', mods=('Meta',)); ctx.frames(3)
        sel = ctx.js('window.__skep.selection()')
        at_copy = ctx.js('(() => { const d = window.__skep.model.doc(%s), p = window.__skep.platformSelection(); return {held: [d.from, d.to], platform: p.collapsed ? null : p.span}; })()' % json.dumps(STAGING))
        t1 = time.time()
        out.update(selected=sel, at_copy=at_copy, door=ctx.js(COPY_SIZES), door_ms=round((time.time() - t1) * 1000))
        r.check(sel == {'addr': STAGING, 'pos': 1, 'width': d['extent']} and isinstance((out['door'] or {}).get('entry_bytes'), int),
                "Mod+A at a caret in the seeded staging draft selects it whole, positions 1 to its extent, and the copy door answers what its clipboard took of it (what the whole document's entry is measured on)",
                {'selected': sel, 'extent': d['extent'], 'door': out['door']})
    finally:
        ctx.js('(async () => { const s = window.getSelection(); if (s) s.removeAllRanges(); const S = await import("./overlays/selection.js"), H = await import("./overlays/host.js"), L = await import("./text/layer.js"); H.dismiss(); S.clear(); L.dropCaret(); })()')
        ctx.frames(2)
    return out


def paste_rows(ctx, r, shoot, red, ops_allowed, m):
    """THE PASTE AND THE CUT AT THE CARET (B3-S5 (ii), (iv); D5 K-93; D6 BM-31, BM-34, BM-51, BM-52), on the machine's page, in
    the case's own draft. Each event reaches the page through the gate's doors — the app's own listeners run over a
    clipboard the door makes, an event with no keydown — so the system's clipboard is never read or written.
    `paste-plain`: the paste door at the live caret places plain text, its CR LF a line feed, the caret after it, sent to
    the test board as one `insert`; Mod+Z takes it out by one `delete`, the caret where the paste began, and Mod+Shift+Z
    puts it back by a `reinstate`, the caret after it. `cut`: Shift+→ over a kept word, then the cut door — the door's
    clipboard takes the word as plain text and as skep's own entry, the word leaves the text at once, and the burst's
    commit sends one `delete` whose removal carries S4's mark; Mod+Z puts it back, the caret where the cut began; and the
    cut's own clipboard pasted places the same word again by its identity, a `reinstate`, taken out alone by Mod+Z.
    `paste-kept-caret`: Esc keeps the caret,
    and the paste door at its span returns it live and places the text at it. Each word is checked against `strings.js`."""
    mine, sid = m['mine'], m['sid']
    recentre, quiet, caret_end, corner_word, first_line = m['recentre'], m['quiet'], m['caret_end'], m['corner_word'], m['first_line']
    caret = lambda: ctx.js('window.__skep.caret()')
    selection = lambda: ctx.js('window.__skep.selection()')
    removed = lambda: ctx.js('window.__skep.removed()') or []
    stacks = lambda: ctx.js('window.__skep.write.stacks(%s)' % json.dumps(mine))
    paste = lambda data: ctx.js('window.__skep.paste(%s)' % json.dumps(data))
    place = lambda pos: (ctx.js('(async () => (await import("./text/layer.js")).placeCaret(%s, %d))()' % (json.dumps(mine), pos)), ctx.frames(2))
    nb = lambda s: len(s.encode('utf8'))
    kept_word = {'word': t(ctx, 'B3.kept'), 'id': 'B3.kept'}

    def stretch(pos, width):
        """a stretch of the text the page shows of the draft"""
        return ctx.js('(async () => { const L = await import("./text/layer.js"), R = await import("./model/records.js"), d = L.shownOf(%s); return R.textOf(d.runs, %d, %d); })()' % (json.dumps(mine), pos, pos + width))

    def board(width):
        """the draft's first `width` bytes as the test board holds them, read through the page's port"""
        got = port_op(ctx, sid, {'op': 'retrieve_v', 'specs': [{'doc': mine, 'span': {'start': '1.1', 'width': '0.%d' % width}}]})
        return ''.join(i.get('content', '') for i in (((got or {}).get('result') or {}).get('items') or []))

    def kept(max_s=15):
        """the draft kept on the board again: the corner "kept", every edit read back"""
        ok = wait_for(ctx, '(() => { const s = window.__skep.write.state(%s); return !!s.kept && s.kept.word === "kept" && !s.inFlight && window.__skep.write.edits(%s).filter((e) => e.at == null).length === 0; })()' % (json.dumps(mine), json.dumps(mine)), max_s)
        quiet()
        return ok

    def chord(shift=False):
        ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
        ctx.drv.key('z', mods=('Meta', 'Shift') if shift else ('Meta',)); ctx.frames(3)

    def live_at(pos):
        """each width frames the draft as a landing does — which keeps the caret — then the caret stands live where the act left it"""
        recentre()
        place(pos)

    # ---- B3-S5 `paste-plain`: plain text pasted at the live caret, kept by the board; its undo and its redo -------------------------
    quiet()
    line = first_line()
    pos = caret_end(line)
    text = ' Pasted here.\r\nA line pasted after it.'
    want = text.replace('\r\n', '\n')
    n = nb(want)
    took = paste({'text/plain': text})
    at_act = caret()
    landed = kept()
    w0 = last_write(ctx, ops_allowed)
    on_board = board(nb(line) + n)
    step = (stacks()['undo'] or [{}])[-1]

    def plain_check(wd):
        c, got, h = caret(), corner_word(), ctx.js('window.__skep.hint()')
        ok = (took == {'prevented': True} and at_act == {'addr': mine, 'pos': pos + n, 'live': True} and landed
              and bool(w0) and w0['op'] == 'insert' and w0['doc'] == mine and w0.get('values') == [want] and '"ack_addr"' in (w0.get('answer') or '')
              and on_board == line + want and stretch(pos, n) == want and first_line() == line + ' Pasted here.' and step.get('kind') == 'paste' and step.get('open') is False
              and got == kept_word and c == at_act and h is None and len(shown(ctx, '#domlayer .caret-mark')) == 1)
        return ok, {'door': took, 'caret_at_act': at_act, 'kept': landed, 'write': w0 and {k: w0[k] for k in ('op', 'doc', 'values')}, 'board': on_board, 'shown': stretch(pos, n),
                    'step': step, 'corner': got, 'caret': c, 'hint': h}
    shoot('paste-plain', plain_check, lambda: live_at(pos + n))
    chord()
    undone = kept()
    w = last_write(ctx, ops_allowed)
    r.check(undone and first_line() == line and board(nb(line)) == line and bool(w) and w['op'] == 'delete' and '"ack"' in (w.get('answer') or '') and caret() == {'addr': mine, 'pos': pos, 'live': True}
            and (stacks()['redo'] or [{}])[-1].get('kind') == 'paste',
            'Mod+Z takes the paste out whole — one step: the text shown and the test board\'s without it again, by one `delete` acked — and leaves the caret live where the paste began',
            {'kept': undone, 'shown': first_line(), 'board': board(nb(line)), 'write': w and {k: w[k] for k in ('op', 'doc')}, 'caret': caret(), 'stacks': stacks()})
    chord(shift=True)
    redone = kept()
    w = last_write(ctx, ops_allowed)
    r.check(redone and board(nb(line) + n) == line + want and stretch(pos, n) == want and bool(w) and w['op'] == 'reinstate' and caret() == {'addr': mine, 'pos': pos + n, 'live': True},
            'Mod+Shift+Z puts the paste back by a `reinstate` of the bytes its insert minted — never an insert of new ones — and leaves the caret live after the placed text',
            {'kept': redone, 'board': board(nb(line) + n), 'write': w and {k: w[k] for k in ('op', 'doc')}, 'caret': caret()})
    ctx.js('(async () => { (await import("./overlays/host.js")).dismiss(); })()')

    # ---- B3-S5 `cut`: a kept word cut — the door's clipboard, the `delete`, S4's mark; its undo; its own clipboard pasted --------------
    line = first_line()
    words = line.split(' ')
    gone = words[1] + ' '
    start, width = nb(words[0] + ' ') + 1, nb(gone)
    cut_line = words[0] + ' ' + ' '.join(words[2:])
    ids = ctx.js('window.__skep.model.identity(%s, %d, %d)' % (json.dumps(mine), start, width))
    origin = (ctx.js('window.__skep.model.board()') or {}).get('origin')
    recentre()
    place(start)
    for _ in gone:
        ctx.drv.key('ArrowRight', mods=('Shift',)); ctx.frames(1)
    ctx.frames(2)
    selected, began, marks0 = selection(), caret(), removed()
    out = ctx.js('window.__skep.cut()') or {}
    ctx.frames(2)
    act = {'caret': caret(), 'selection': selection(), 'shown': first_line(), 'marks': len(removed()), 'step': (stacks()['undo'] or [{}])[-1]}
    faced = wait_for(ctx, '(window.__skep.removed() || []).length === %d' % (len(marks0) + 1), 10)
    landed = kept()
    w1 = last_write(ctx, ops_allowed)
    data = out.get('data') or {}
    flavor = json.loads(data['application/x-skep-passage']) if data.get('application/x-skep-passage') else None
    r.check(selected == {'addr': mine, 'pos': start, 'width': width} and began == {'addr': mine, 'pos': start + width, 'live': True} and bool(ids) and sum(x['width'] for x in ids) == width,
            'Shift+→ from the caret runs a selection over a kept word of the draft and the space after it, the caret live at its end (what the cut stands on)', {'selected': selected, 'caret': began, 'ids': ids})

    def cut_check(wd):
        marks, top = removed(), ctx.js('document.getElementById("line").getBoundingClientRect().bottom')
        mark = next((x for x in marks if x.get('addr') == mine and x.get('words') == gone), None)
        box = (mark or {}).get('mark') or {}
        named = ctx.js('[...document.querySelectorAll("#removed button.mark")].map((b) => b.getAttribute("aria-label"))')
        inside = bool(box) and box['x'] >= -0.5 and box['x'] + box['w'] <= wd + 0.5 and box['y'] >= top - 0.5 and box['y'] + box['h'] <= 900 + 0.5
        clip_ok = (out.get('prevented') is True and sorted(data) == ['application/x-skep-passage', 'text/plain'] and data['text/plain'] == gone
                   and bool(flavor) and flavor.get('board') == origin and flavor.get('doc') == mine and flavor.get('pos') is None and flavor.get('ids') == ids)
        act_ok = (act['caret'] == {'addr': mine, 'pos': start, 'live': True} and act['selection'] is None and act['shown'] == cut_line and act['marks'] == len(marks0)
                  and act['step'].get('kind') == 'cut' and act['step'].get('took') == [gone])
        sent_ok = (faced and landed and bool(w1) and w1['op'] == 'delete' and w1['doc'] == mine and '"ack"' in (w1.get('answer') or '') and first_line() == cut_line and board(nb(cut_line)) == cut_line
                   and corner_word() == kept_word)
        face_ok = bool(mark) and len(marks) == len(marks0) + 1 and inside and bool(named) and all(x == t(ctx, 'B3.removed-here') for x in named) and len(shown(ctx, '#removed button.mark')) >= 1
        return {'the clipboard': (clip_ok, {'door': {'prevented': out.get('prevented')}, 'flavors': sorted(data), 'plain': data.get('text/plain'), 'entry': flavor, 'want_ids': ids, 'origin': origin}),
                'the act': (act_ok, act),
                'the `delete`': (sent_ok, {'faced': faced, 'kept': landed, 'write': w1 and {k: w1[k] for k in ('op', 'doc')}, 'shown': first_line(), 'board': board(nb(cut_line)), 'corner': corner_word()}),
                "S4's mark": (face_ok, {'marks': marks, 'named': named, 'inside': inside})}
    shoot('cut', cut_check, lambda: live_at(start))
    chord()
    back = kept()
    w = last_write(ctx, ops_allowed)
    r.check(back and first_line() == line and board(nb(line)) == line and bool(w) and w['op'] == 'reinstate' and '"ack"' in (w.get('answer') or '') and caret() == {'addr': mine, 'pos': start + width, 'live': True}
            and len(removed()) == len(marks0),
            'Mod+Z puts the cut word back by one `reinstate` of its own bytes, its mark gone, and leaves the caret live where the cut began — the selection\'s end',
            {'kept': back, 'shown': first_line(), 'board': board(nb(line)), 'write': w and {k: w[k] for k in ('op', 'doc')}, 'caret': caret(), 'marks': len(removed())})
    # the cut's own clipboard pasted at the line's end: skep's own entry read, the same word placed again by its identity
    end = caret_end(line)
    again = paste(data)
    placed = kept()
    w = last_write(ctx, ops_allowed)
    r.check(again == {'prevented': True} and placed and bool(w) and w['op'] == 'reinstate' and w['doc'] == mine and '"ack"' in (w.get('answer') or '') and first_line() == line + gone
            and board(nb(line + gone)) == line + gone and caret() == {'addr': mine, 'pos': end + width, 'live': True},
            'the cut\'s own clipboard pasted — its plain text and skep\'s own entry — places the same word by its identity, one `reinstate` acked: the word put back by Mod+Z stands twice, the caret after the copy (B3-S5 (iv))',
            {'door': again, 'kept': placed, 'write': w and {k: w[k] for k in ('op', 'doc')}, 'shown': first_line(), 'caret': caret()})
    chord()
    r.check(kept() and first_line() == line and board(nb(line)) == line, 'and Mod+Z takes that copy out again, never the word it was copied from, the board following (the paste survey\'s W2)', {'shown': first_line(), 'board': board(nb(line))})
    ctx.js('(async () => { (await import("./overlays/host.js")).dismiss(); })()')

    # ---- B3-S5 `paste-kept-caret`: the paste at a kept caret returns it and acts there (K-93; BM-52) ---------------------------------
    line = first_line()
    end = caret_end(line)
    ctx.drv.key('Escape'); ctx.frames(2)
    was = {'caret': caret(), 'focus': ctx.js('(() => { const f = window.__skep.view.focus(); return f && {kind: f.kind, addr: f.addr}; })()')}
    late = ' Returned.'
    took2 = paste({'text/plain': late})
    at_act2 = caret()
    landed2 = kept()
    w2 = last_write(ctx, ops_allowed)

    def kept_caret_check(wd):
        c, got = caret(), corner_word()
        ok = (was['caret'] == {'addr': mine, 'pos': end, 'live': False} and was['focus'] == {'kind': 'block', 'addr': mine} and took2 == {'prevented': True}
              and at_act2 == {'addr': mine, 'pos': end + nb(late), 'live': True} and landed2 and bool(w2) and w2['op'] == 'insert' and w2['doc'] == mine and w2.get('values') == [late]
              and '"ack_addr"' in (w2.get('answer') or '') and first_line() == line + late and board(nb(line + late)) == line + late and got == kept_word and c == at_act2
              and len(shown(ctx, '#domlayer .caret-mark')) == 1 and not ctx.js('!!document.querySelector("#domlayer .caret-mark.kept")'))
        return ok, {'kept_before': was, 'door': took2, 'caret_at_act': at_act2, 'kept': landed2, 'write': w2 and {k: w2[k] for k in ('op', 'doc', 'values')}, 'shown': first_line(), 'corner': got, 'caret': c}
    shoot('paste-kept-caret', kept_caret_check, lambda: live_at(end + nb(late)))
    ctx.drv.key('Escape'); ctx.frames(2)


# a copy's entry and a paste's parts by identity, as the page names them (M-PASSAGE's `Entry`): a part `{prefix, ordinal, width}`
# names the bytes from `prefix.ordinal`, the document that minted them its trunk
def part_start(part):
    return '%s.%d' % (part['prefix'], part['ordinal'])


def same_rows(ctx, r, shoot, red, ops_allowed, m):
    """THE SAME WORDS PASTED BY IDENTITY (B3-S5 (i), (iv); the paste survey's P3 … P6, W1 … W5), on the machine's page, in the
    case's own draft. Each event reaches the page through the gate's doors, and each copy is made by the copy door, the
    system's clipboard never read or written. `paste-same`: a word of the first edition copied and pasted at the draft's
    caret — one `reinstate` of its bytes, each run's `origin` the document that minted them, acked, the board's image
    naming them there, the text shown carrying them as a run of that origin stated in the column's edge — then words of
    VERSIONED, whose record the page lets go first, the harness reading them through the page's port and building their
    entry: the page reads them by `retrieve_i` before its `reinstate`. `paste-after-cut`: a word cut, then its own clipboard
    pasted: a `delete`, then a `reinstate` of the same run. `paste-own-draft`: a word copied and pasted in its own
    draft, standing twice; Mod+Z takes out the copy alone, Mod+Shift+Z puts it back there. `paste-unminted`: an entry
    naming words another page's load typed and no board minted — new bytes, an `insert`. `paste-forged`: a copy whose
    plain text is changed at the same lengths — new bytes, an `insert`, and the paste's face saying so. `source-faces`:
    `op` armed with each source refusal in turn at the paste's `reinstate` — nothing placed, the caret where the paste was
    made, the face in that refusal's words. `paste-held`: `op` armed `held` at the paste's `reinstate` — "not yet kept",
    nothing else changed. Each word is checked against `strings.js`."""
    mine, sid = m['mine'], m['sid']
    recentre, quiet, caret_end, corner_word, first_line, held_row, drop_all = m['recentre'], m['quiet'], m['caret_end'], m['corner_word'], m['first_line'], m['held_row'], m['drop_all']
    states = ('paste-same', 'paste-after-cut', 'paste-own-draft', 'paste-unminted', 'paste-forged', 'source-faces', 'paste-held')
    caret = lambda: ctx.js('window.__skep.caret()')
    paste = lambda data: ctx.js('window.__skep.paste(%s)' % json.dumps(data))
    place = lambda pos: (ctx.js('(async () => (await import("./text/layer.js")).placeCaret(%s, %d))()' % (json.dumps(mine), pos)), ctx.frames(2))
    nb = lambda x: len(x.encode('utf8'))
    kept_word = {'word': t(ctx, 'B3.kept'), 'id': 'B3.kept'}
    origin = (ctx.js('window.__skep.model.board()') or {}).get('origin')
    face = lambda: ctx.js('window.__skep.pasteFace()') or {}

    def kept(max_s=15):
        """the draft kept on the board again: the corner "kept", every edit read back"""
        ok = wait_for(ctx, '(() => { const s = window.__skep.write.state(%s); return !!s.kept && s.kept.word === "kept" && !s.inFlight && window.__skep.write.edits(%s).filter((e) => e.at == null && !e.based).length === 0; })()' % (json.dumps(mine), json.dumps(mine)), max_s)
        quiet()
        return ok

    def board_line():
        """the draft's first line as the test board holds it, read through the page's port"""
        got = port_op(ctx, sid, {'op': 'retrieve_v', 'specs': [{'doc': mine, 'span': {'start': '1.1', 'width': '0.400'}}]})
        return ''.join(i.get('content', '') for i in (((got or {}).get('result') or {}).get('items') or [])).split('\n')[0]

    def n_ops():
        return ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "op").length')

    def ops_from(n, reads=False):
        """the page's `op` frames from its n-th on, parsed, each with its answer; reads among them where asked"""
        out = []
        for c in (ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "op").map((c) => ({frame: c.frame, answer: c.answer}))') or [])[n:]:
            try:
                f = json.loads(c['frame'])
            except (TypeError, ValueError):
                continue
            if isinstance(f, dict) and f.get('op') and 'frame' not in f and (reads or f['op'] not in ops_allowed):
                out.append(dict(f, answer=c.get('answer') or ''))
        return out

    def chord(shift=False):
        ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
        ctx.drv.key('z', mods=('Meta', 'Shift') if shift else ('Meta',)); ctx.frames(3)

    def copy_words(start, width):
        """`width` bytes of the draft's text from `start` selected from the caret by Shift+→, as a person selects them, and
        copied by the copy door: its clipboard's flavors and the entry parsed; the selection then ended and the caret placed
        again"""
        place(start)
        for _ in range(width):
            ctx.drv.key('ArrowRight', mods=('Shift',)); ctx.frames(1)
        ctx.frames(2)
        out = ctx.js('window.__skep.copy()') or {}
        data = out.get('data') or {}
        ctx.js('(async () => (await import("./overlays/selection.js")).clear())()')
        place(start)
        return data, json.loads(data['application/x-skep-passage']) if data.get('application/x-skep-passage') else None

    def face_off():
        """the walk taken to another document and back: a paste's face standing leaves with its place"""
        ctx.leap(DOC, 1); ctx.frames(2)
        recentre(); ctx.frames(2)

    def face_drawn(wd, want):
        """the paste's face standing in `want`'s words and drawn inside the window, beside its line or over the lines beneath"""
        f, top = face(), ctx.js('document.getElementById("line").getBoundingClientRect().bottom')
        st, dr = f.get('standing') or {}, f.get('drawn') or {}
        box = dr.get('face') or {}
        inside = bool(box) and box['x'] >= -0.5 and box['x'] + box['w'] <= wd + 0.5 and box['y'] >= top - 0.5 and box['y'] + box['h'] <= 900 + 0.5
        shown_text = ctx.js('(() => { const e = document.querySelector("#removed .pasted .part"); return e ? {id: e.dataset.string, text: e.textContent} : null; })()')
        ok = st.get('addr') == mine and (st.get('id'), st.get('text')) == want and dr.get('by') in ('beside', 'beneath') and inside and shown_text == {'id': want[0], 'text': want[1]}
        return ok, {'face': f, 'shown': shown_text, 'inside': inside, 'want': want}

    quiet()
    line = first_line()
    if not line:
        for st in states:
            red(st, 'the draft holds no first line to paste beside')
        return

    # ---- `paste-same`: a word of the first edition, copied and pasted by identity --------------------------------------------
    ctx.leap(DOC, 1); ctx.settle(15); ctx.frames(3)
    d = ctx.js('window.__skep.model.doc(%s)' % json.dumps(DOC)) or {}
    para = next((b for b in d.get('blocks') or [] if b['kind'] == 'para' and re.search(r'[A-Za-z]{4,}', b['text'])), None)
    hit = re.search(r'[A-Za-z]{4,}', para['text']) if para else None
    src_data, src_entry = {}, None
    if hit:
        start, width = para['pos'] + nb(para['text'][:hit.start()]), nb(hit.group(0))
        ctx.js('(async () => { const L = await import("./text/layer.js"); L.placeSelection({addr: %s, pos: %d, width: %d}); })()' % (json.dumps(DOC), start, width)); ctx.frames(2)
        src_data = (ctx.js('window.__skep.copy()') or {}).get('data') or {}
        src_entry = json.loads(src_data['application/x-skep-passage']) if src_data.get('application/x-skep-passage') else None
        ctx.js('(async () => { const s = window.getSelection(); if (s) s.removeAllRanges(); (await import("./overlays/selection.js")).clear(); })()')
    word = src_data.get('text/plain') or ''
    recentre(); ctx.frames(2)
    end = caret_end(line)
    n0 = n_ops()
    took = paste(src_data) if src_entry else None
    at_act = caret()
    landed = kept()
    sent = ops_from(n0)
    parts = (src_entry or {}).get('ids') or []
    want_runs = [{'i_start': part_start(x), 'origin': trunk_of(x['prefix']), 'width': str(x['width'])} for x in parts]
    srcs = sorted({trunk_of(x['prefix']) for x in parts})
    img = port_op(ctx, sid, {'op': 'image', 'd': mine, 'region': [{'start': '1.%d' % end, 'width': '0.%d' % max(1, nb(word))}]})
    board_ids = [{'i_start': x.get('i_start'), 'width': x.get('width')} for x in (((img or {}).get('result') or {}).get('runs') or [])]

    def same_check(wd):
        c, got = caret(), corner_word()
        origins = ctx.js('(async () => (await import("./text/layer.js")).shownOf(%s).origins)()' % json.dumps(mine)) or []
        signs = [x for x in (ctx.js('window.__skep.edgeSigns()') or []) if x.get('addr') == mine and x.get('origin') in srcs]
        ok = (bool(src_entry) and bool(word) and took == {'prevented': True} and at_act == {'addr': mine, 'pos': end + nb(word), 'live': True} and landed
              and [x['op'] for x in sent] == ['reinstate'] and sent[0].get('doc') == mine and sent[0].get('runs') == want_runs and '"ack"' in sent[0]['answer']
              and first_line() == line + word and got == kept_word and c == at_act)
        return {'the `reinstate`': (ok, {'door': took, 'word': word, 'entry': src_entry, 'sent': sent, 'want_runs': want_runs, 'caret_at_act': at_act, 'caret': c, 'corner': got, 'shown': first_line()}),
                "the board's image": (board_ids == [{'i_start': part_start(x), 'width': str(x['width'])} for x in parts], {'board': board_ids, 'parts': parts}),
                'the run of its origin': (any(o.get('pos') == end and o.get('width') == nb(word) and o.get('doc') in srcs for o in origins) and len(signs) >= 1, {'origins': origins, 'signs': signs, 'srcs': srcs})}
    shoot('paste-same', same_check, lambda: (recentre(), place(end + nb(word))))
    line = first_line()

    # the source the page holds no record of: VERSIONED's first words, read through the page's port, its record let go first
    ctx.js('window.__skep.model.invalidate(%s)' % json.dumps(VERSIONED)); ctx.frames(2)
    got = port_op(ctx, sid, {'op': 'retrieve_v', 'specs': [{'doc': VERSIONED, 'span': {'start': '1.1', 'width': '0.48'}}]})
    items = ((got or {}).get('result') or {}).get('items') or []
    vtext = items[0].get('content', '') if items and isinstance(items[0], dict) else ''
    vhit = re.search(r'[A-Za-z]{4,}', vtext)
    far_entry, far_text, far_parts = None, '', []
    if vhit:
        vpos, far_text = nb(vtext[:vhit.start()]) + 1, vhit.group(0)
        vimg = port_op(ctx, sid, {'op': 'image', 'd': VERSIONED, 'region': [{'start': '1.%d' % vpos, 'width': '0.%d' % nb(far_text)}]})
        for x in ((vimg or {}).get('result') or {}).get('runs') or []:
            cut = x['i_start'].rfind('.')
            far_parts.append({'prefix': x['i_start'][:cut], 'ordinal': int(x['i_start'][cut + 1:]), 'width': int(x['width'])})
        if far_parts and sum(x['width'] for x in far_parts) == nb(far_text):
            far_entry = {'board': origin, 'doc': VERSIONED, 'member': None, 'plain': False, 'pos': None, 'width': None, 'ids': far_parts, 'version': 2, 'lengths': [x['width'] for x in far_parts]}
    held_before = ctx.js('(() => { const d = window.__skep.model.doc(%s); return d.from; })()' % json.dumps(VERSIONED))
    end2 = caret_end(line)
    n1 = n_ops()
    took2 = paste({'text/plain': far_text, 'application/x-skep-passage': json.dumps(far_entry)}) if far_entry else None
    landed2 = kept()
    seen = ops_from(n1, reads=True)
    kinds = [x['op'] for x in seen if x['op'] in ('retrieve_i', 'reinstate')]
    read_spans = next((x.get('spans') for x in seen if x['op'] == 'retrieve_i'), None)
    put = next((x for x in seen if x['op'] == 'reinstate'), None)
    r.check(bool(far_entry) and held_before == -1 and took2 == {'prevented': True} and landed2 and kinds == ['retrieve_i', 'reinstate'] and read_spans == [{'start': part_start(x), 'width': str(x['width'])} for x in far_parts]
            and bool(put) and put.get('runs') == [{'i_start': part_start(x), 'origin': VERSIONED, 'width': str(x['width'])} for x in far_parts] and '"ack"' in put['answer'] and first_line() == line + far_text,
            "B3-S5 · paste-same (the read by identity): words of %s, a document whose record the page let go, read through the page's port into an entry and a plain text — the paste reads them by `retrieve_i` of those very spans before its `reinstate`, which places the same words, acked (the paste survey's W5)" % VERSIONED,
            {'entry': far_entry, 'held_before': held_before, 'door': took2, 'kept': landed2, 'ops': [(x['op'], x.get('spans') or x.get('runs')) for x in seen], 'shown': first_line(), 'text': far_text})
    line = first_line()

    # ---- `paste-after-cut`: a word cut, then its own clipboard pasted at the line's end: a `delete`, then a `reinstate` ---------
    words = line.split(' ')
    gone = words[1] + ' '
    start, width = nb(words[0] + ' ') + 1, nb(gone)
    moved = words[0] + ' ' + ' '.join(words[2:])
    place(start)
    for _ in gone:
        ctx.drv.key('ArrowRight', mods=('Shift',)); ctx.frames(1)
    ctx.frames(2)
    n2 = n_ops()
    cut_out = ctx.js('window.__skep.cut()') or {}
    cut_data = cut_out.get('data') or {}
    cut_entry = json.loads(cut_data['application/x-skep-passage']) if cut_data.get('application/x-skep-passage') else None
    kept()
    end3 = caret_end(moved)
    took3 = paste(cut_data)
    landed3 = kept()
    sent3 = ops_from(n2)

    def after_cut_check(wd):
        ids = (cut_entry or {}).get('ids') or []
        runs = [{'i_start': part_start(x), 'origin': trunk_of(x['prefix']), 'width': str(x['width'])} for x in ids]
        ok = (bool(cut_entry) and took3 == {'prevented': True} and landed3 and [x['op'] for x in sent3] == ['delete', 'reinstate'] and all('"ack"' in x['answer'] for x in sent3)
              and sent3[1].get('runs') == runs and first_line() == moved + gone and board_line() == moved + gone and corner_word() == kept_word)
        return ok, {'entry': cut_entry, 'door': took3, 'sent': [(x['op'], x.get('runs')) for x in sent3], 'want_runs': runs, 'shown': first_line(), 'board': board_line()}
    shoot('paste-after-cut', after_cut_check, lambda: (recentre(), place(end3 + width)))
    line = first_line()

    # ---- `paste-own-draft`: a word copied and pasted in its own draft, standing twice; its undo takes out the copy alone ---------
    words = line.split(' ')
    word2 = words[0]
    data2, entry2 = copy_words(1, nb(word2))
    end4 = caret_end(line)
    n4 = n_ops()
    took4 = paste(data2)
    landed4 = kept()
    sent4 = ops_from(n4)
    twice = line + word2

    def own_check(wd):
        ids = (entry2 or {}).get('ids') or []
        ok = (bool(entry2) and data2.get('text/plain') == word2 and took4 == {'prevented': True} and landed4 and [x['op'] for x in sent4] == ['reinstate']
              and sent4[0].get('runs') == [{'i_start': part_start(x), 'origin': mine, 'width': str(x['width'])} for x in ids] and first_line() == twice and board_line() == twice)
        return ok, {'entry': entry2, 'door': took4, 'sent': [(x['op'], x.get('runs')) for x in sent4], 'shown': first_line(), 'board': board_line()}
    if shoot('paste-own-draft', own_check, lambda: (recentre(), place(end4 + nb(word2)))):
        n5 = n_ops()
        chord()
        undone = kept()
        taken = ops_from(n5)
        r.check(undone and [(x['op'], x.get('p', {}).get('ordinal'), x.get('width')) for x in taken] == [('delete', str(end4), str(nb(word2)))] and first_line() == line and board_line() == line,
                'B3-S5 · paste-own-draft: Mod+Z takes out the copy alone — one `delete` at the place it was pasted, never the words it was copied from — the text shown and the board\'s the same (the paste survey\'s W2)',
                {'kept': undone, 'sent': [(x['op'], x.get('p'), x.get('width')) for x in taken], 'shown': first_line(), 'board': board_line()})
        n6 = n_ops()
        chord(shift=True)
        redone = kept()
        back = ops_from(n6)
        r.check(redone and [x['op'] for x in back] == ['reinstate'] and back[0].get('at', {}).get('ordinal') == str(end4) and first_line() == twice and board_line() == twice and caret() == {'addr': mine, 'pos': end4 + nb(word2), 'live': True},
                'B3-S5 · paste-own-draft: Mod+Shift+Z puts the copy back where it stood by a `reinstate`, the caret after it (the paste survey\'s W2)',
                {'kept': redone, 'sent': [(x['op'], x.get('at')) for x in back], 'shown': first_line(), 'board': board_line(), 'caret': caret()})
        chord()
        r.check(kept() and first_line() == line and board_line() == line, 'and Mod+Z takes the copy out again, the board following', {'shown': first_line(), 'board': board_line()})
    line = first_line()

    # ---- `paste-unminted`: words another page's load typed and no board minted — new bytes (P51) ----------------------------------
    fresh = 'Unminted words'
    other = {'board': origin, 'doc': mine, 'member': None, 'plain': False, 'pos': None, 'width': None, 'ids': [{'prefix': mine + '.0.p', 'ordinal': 1, 'width': nb(fresh), 'load': 'f' * 32}], 'version': 2, 'lengths': [nb(fresh)]}
    face_before = face().get('standing')
    end5 = caret_end(line)
    n7 = n_ops()
    took5 = paste({'text/plain': fresh, 'application/x-skep-passage': json.dumps(other)})
    landed5 = kept()
    sent5 = ops_from(n7)

    def unminted_check(wd):
        ok = (took5 == {'prevented': True} and landed5 and [x['op'] for x in sent5] == ['insert'] and sent5[0].get('values') == [fresh] and '"ack_addr"' in sent5[0]['answer']
              and first_line() == line + fresh and corner_word() == kept_word and face().get('standing') == face_before)
        return ok, {'door': took5, 'sent': [(x['op'], x.get('values')) for x in sent5], 'shown': first_line(), 'face': face()}
    shoot('paste-unminted', unminted_check, lambda: (recentre(), place(end5 + nb(fresh))))
    chord()
    kept()
    line = first_line()

    # ---- `paste-forged`: a copy's plain text changed at the same lengths: new bytes, and the paste's face saying so --------------
    word3 = line.split(' ')[0]
    data3, entry3 = copy_words(1, nb(word3))
    forged = ''.join(chr((ord(ch) - 97 + 1) % 26 + 97) if 'a' <= ch <= 'z' else chr((ord(ch) - 65 + 1) % 26 + 65) if 'A' <= ch <= 'Z' else ch for ch in word3)
    end6 = caret_end(line)
    n8 = n_ops()
    took6 = paste(dict(data3, **{'text/plain': forged}))
    landed6 = kept()
    sent6 = ops_from(n8)
    label = ctx.js('(async () => (await import("./text/layer.js")).boxName(%s).name)()' % json.dumps(mine))
    want_forged = ('L.paste.differs', sentence(ctx, 'L.paste.differs', {'source': label}))

    def forged_check(wd):
        ok = (bool(entry3) and forged != word3 and nb(forged) == nb(word3) and took6 == {'prevented': True} and landed6 and [x['op'] for x in sent6] == ['insert'] and sent6[0].get('values') == [forged]
              and first_line() == line + forged)
        return {'the `insert`': (ok, {'door': took6, 'sent': [(x['op'], x.get('values')) for x in sent6], 'shown': first_line(), 'forged': forged}),
                "the paste's face": face_drawn(wd, want_forged)}
    shoot('paste-forged', forged_check, lambda: (recentre(), place(end6 + nb(forged))))
    chord()
    kept()
    face_off()
    line = first_line()

    # ---- `source-faces`: each source refusal armed at the paste's `reinstate`: nothing placed, the face in its words -----------------
    word4 = line.split(' ')[0]
    data4, entry4 = copy_words(1, nb(word4))
    faced = {}
    for name in ('source_not_registered', 'dangling_source', 'bad_run', 'too_many_runs', 'empty_result', 'withheld'):
        quiet()
        made_at = caret_end(line)
        n9, seq = n_ops(), ctx.editor_seq()
        ctx.arm('op', refusal={'kind': 'refused', 'name': name, 'status': 200, 'code': name, 'detail': None, 'op': 'reinstate', 'site': {'addr': mine} if name == 'withheld' else {}, 'body': None})
        took7 = paste(data4)
        came = wait_for(ctx, '(() => { const f = window.__skep.pasteFace().standing; return !!f && f.addr === %s && f.id === %s; })()' % (json.dumps(mine), json.dumps('B3.paste.withheld' if name == 'withheld' else 'B3.source_not_registered' if name == 'source_not_registered' else 'L.paste.fault')), 10)
        quiet()
        sent7 = ops_from(n9)
        want = ('B3.paste.withheld', sentence(ctx, 'B3.paste.withheld', {'origin': mine})) if name == 'withheld' else ('B3.source_not_registered', sentence(ctx, 'B3.source_not_registered', {'address': mine})) if name == 'source_not_registered' else ('L.paste.fault', sentence(ctx, 'L.paste.fault'))
        st, c7 = face().get('standing') or {}, caret()
        faced[name] = want
        r.check(bool(entry4) and took7 == {'prevented': True} and came and [x['op'] for x in sent7] == ['reinstate'] and name in sent7[0]['answer'] and ctx.consumed('op', seq)
                and first_line() == line and c7 == {'addr': mine, 'pos': made_at, 'live': True} and corner_word() == kept_word and (st.get('id'), st.get('text')) == want and m['state']()['islands'] == [],
                "B3-S5 · source-faces: the paste's `reinstate` refused `%s` — the arm taken by that frame alone, nothing placed and the text as it stood, the caret live where the paste was made — never after the words it was copied from — the corner \"kept\", and the paste's face in that refusal's words (the paste survey's W3)" % name,
                {'door': took7, 'came': came, 'sent': [(x['op'], x['answer'][:160]) for x in sent7], 'shown': first_line(), 'caret': c7, 'made_at': made_at, 'face': st, 'want': want})

    def faces_check(wd):
        return face_drawn(wd, faced.get('withheld') or ('', ''))
    shoot('source-faces', faces_check, lambda: (recentre(), caret_end(line)))
    face_off()

    # ---- `paste-held`: the paste's `reinstate` answered `held`: "not yet kept", nothing else changed ---------------------------------
    quiet()
    caret_end(line)
    k = ARMED_K + 700
    seq = ctx.editor_seq()
    ctx.arm('op', answer={'resp': 'held', 'held': k, 'cause': 'unreachable'})
    ctx.arm('held', answer=[held_row(k, 'unreachable')])
    n10 = n_ops()
    took8 = paste(data4)
    held_in = wait_for(ctx, '(window.__skep.write.state(%s).held || []).some((x) => x.held === %d)' % (json.dumps(mine), k), 10)
    quiet()
    sent8 = ops_from(n10)

    def held_check(wd):
        got, st = corner_word(), m['state']()
        ok = (took8 == {'prevented': True} and held_in and [x['op'] for x in sent8] == ['reinstate'] and '"held"' in sent8[0]['answer'] and ctx.consumed('op', seq) and ctx.consumed('held', seq)
              and bool(got) and got['id'] == 'B3.not-yet-kept' and got['word'] == t(ctx, 'B3.not-yet-kept') and first_line() == line + word4 and st['islands'] == [] and face().get('standing') is None)
        return ok, {'door': took8, 'held_in': held_in, 'sent': [(x['op'], x['answer'][:120]) for x in sent8], 'corner': got, 'state': st, 'shown': first_line(), 'face': face()}
    shoot('paste-held', held_check, recentre)
    out, back = drop_all(k)
    r.check(bool(out) and out.get('dropped') and back and first_line() == line, "B3-S5 · paste-held: the held line's drop takes the pasted words out, the corner \"kept\" again", {'out': out, 'shown': first_line()})
    ctx.drv.key('Escape'); ctx.frames(2)


# Mod+V's keydown as a script makes one, dispatched at the element holding the focus (keys.py's SCRIPTED_KEYDOWN): the page's
# listener answers it, and — no key of the platform's — no paste can follow it and no clipboard is read; whether its default
# was prevented once the listener's answer was in, and the hint standing then
SCRIPTED_PASTE_KEYDOWN = '''(() => new Promise((res) => { const e = new KeyboardEvent("keydown", {key: "v", code: "KeyV", metaKey: true, bubbles: true, cancelable: true});
  (document.activeElement || document.body).dispatchEvent(e); setTimeout(() => res({prevented: e.defaultPrevented, hint: window.__skep.hint()}), 60); }))()'''


def published_rows(ctx, r, shoot, red, ops_allowed, m):
    """AT A PUBLISHED TARGET (B3-S5; D5 K-72, K-93; the paste survey's P8), on the machine's page, where any edit would be
    composed and sent. A passage of the own draft (`OWN`) is copied by the copy door, the page's selection and the
    platform's cleared after it. At the walk's span of the first edition (`DOC`), an edition of the session's account, at
    each width: the paste door with plain text and no entry — C-45 and its staging act alone; Mod+V's keydown made as a
    script makes one — neither prevented nor answered; then the paste door with the copy's clipboard — nothing sent, the
    edition's text as it stood, C-45 at the focus naming the document, beneath it C-241's statement naming the own draft
    as the status region names its box, and the staging act standing inert, described by its reason, said in the status
    region, placed at the text's edge where the room there holds it and else over the lines beneath its site. Then, at
    the desktop width, the act's press: its reason shown beside it and said. The test board's position before and after
    the row is a figure, and unmoved. Each word is checked against `strings.js`, and the system's clipboard is never read
    or written."""
    quiet = m['quiet']
    state = 'published-target'
    n_ops = lambda: ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "op").length')

    def writes_from(n):
        """the write frames the page sent from its n-th `op` on: every `op` frame that is no read"""
        out = []
        for raw in (ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "op").map((c) => c.frame)') or [])[n:]:
            try:
                f = json.loads(raw)
            except (TypeError, ValueError):
                continue
            if isinstance(f, dict) and f.get('op') and 'frame' not in f and f['op'] not in ops_allowed:
                out.append([f['op'], f.get('doc') or f.get('d')])
        return out

    def shown_text(at, width):
        """a stretch of the text the page shows of the edition, page-local edits and all"""
        return ctx.js('(async () => { const L = await import("./text/layer.js"), R = await import("./model/records.js"), d = L.shownOf(%s); return R.textOf(d.runs, %d, %d); })()' % (json.dumps(DOC), at, at + width))

    unhint = lambda: (ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()'), ctx.frames(1))
    paste = lambda data: ctx.js('window.__skep.paste(%s)' % json.dumps(data))
    quiet()
    health0 = ctx.health()
    n0 = n_ops()

    # ---- the copy: a word of the own draft, by the copy door; the selections cleared after it ---------------------------------
    ctx.leap(OWN, 1); ctx.settle(15); ctx.frames(3)
    d = ctx.js('window.__skep.model.doc(%s)' % json.dumps(OWN)) or {}
    para = next((b for b in d.get('blocks') or [] if b['kind'] == 'para' and re.search(r'[A-Za-z]{4,}', b['text'])), None)
    hit = re.search(r'[A-Za-z]{4,}', para['text']) if para else None
    data, entry = {}, None
    if hit:
        start, width = para['pos'] + len(para['text'][:hit.start()].encode('utf8')), len(hit.group(0).encode('utf8'))
        ctx.js('(async () => { const L = await import("./text/layer.js"); L.placeSelection({addr: %s, pos: %d, width: %d}); })()' % (json.dumps(OWN), start, width)); ctx.frames(2)
        data = (ctx.js('window.__skep.copy()') or {}).get('data') or {}
        entry = json.loads(data['application/x-skep-passage']) if data.get('application/x-skep-passage') else None
    ctx.js('(async () => { const s = window.getSelection(); if (s) s.removeAllRanges(); (await import("./overlays/selection.js")).clear(); })()'); ctx.frames(2)
    origin = (ctx.js('window.__skep.model.board()') or {}).get('origin')
    label = ctx.js('(async () => (await import("./text/layer.js")).boxName(%s).name)()' % json.dumps(OWN))
    copied = (bool(entry) and entry.get('doc') == OWN and entry.get('board') == origin and bool(data.get('text/plain')) and bool(label)
              and ctx.js('window.__skep.selection()') is None)
    r.check(copied, "B3-S5 · %s: a word of the own draft copied by the copy door — skep's own entry names this board and the own draft as where its words were read, and the page's selection is cleared after it (what the paste stands on)" % state,
            {'entry': entry, 'plain': data.get('text/plain'), 'origin': origin, 'label': label, 'selection': ctx.js('window.__skep.selection()')})
    if not copied:
        red(state, {'entry': entry, 'label': label})
        return
    plain = data['text/plain']
    c45 = hint_whole(ctx, 'C-45', values={'D': DOC})
    statement = sentence(ctx, 'B3.quote.published-target', {'label': label})
    reason = sentence(ctx, 'L.write-next.inert')
    act = {'id': 'B3.write-next', 'label': t(ctx, 'B3.write-next'), 'inert': True, 'named': heard(ctx, t(ctx, 'B3.write-next')), 'described': heard(ctx, reason), 'reason': None}
    spoken = ctx.js('(async () => { const S = await import("./strings.js"), L = await import("./text/layer.js"); '
                    'return S.heard(S.joinRuns(" ", [%s, S.sentenceRuns("B3.quote.published-target", {label: L.boxName(%s).runs})])); })()' % (json.dumps(c45), json.dumps(OWN)))
    recentre = lambda: ctx.leap(DOC, WINDOW[0])

    def published_check(wd):
        ctx.frames(2)
        f = ctx.js('window.__skep.view.focus()') or {}
        at = (f.get('pos') or WINDOW[0])
        before, n1, kept = shown_text(at, 64), n_ops(), ctx.js('window.__skep.caret()')
        # the door with plain text and no entry: C-45 and its act alone
        unhint()
        alone_door = paste({'text/plain': plain}); ctx.frames(2)
        alone = ctx.js('window.__skep.hint()') or {}
        # the chord's keydown, as a script makes one: left to the platform, answering nothing
        unhint()
        key = ctx.js(SCRIPTED_PASTE_KEYDOWN); ctx.frames(1)
        # the paste event with the copy's clipboard
        door = paste(data); ctx.frames(2)
        got, h, said = hint(ctx), ctx.js('window.__skep.hint()') or {}, live(ctx)
        after, sent, edits = shown_text(at, 64), writes_from(n1), ctx.js('window.__skep.write.edits(%s)' % json.dumps(DOC))
        by = (h.get('placed') or {}).get('by')
        return {
            'the keydown': (key == {'prevented': False, 'hint': None}, {'keydown': key}),
            'the answer': (f.get('kind') == 'block' and f.get('addr') == DOC and door == {'prevented': True} and h.get('id') == 'C-45' and h.get('words') == c45
                           and h.get('beneath') == {'id': 'B3.quote.published-target', 'words': statement} and h.get('offered') == act and said == spoken
                           and got['seen'] and not got['line'] and by == ('edge' if wd == WIDE[0] else 'beneath'),
                           {'focus': f, 'door': door, 'hint': {k: h.get(k) for k in ('id', 'words', 'beneath', 'offered', 'placed')}, 'want': {'words': c45, 'beneath': statement, 'offered': act, 'said': spoken},
                            'said': said, 'seen': got['seen'], 'box': got['box']}),
            'no entry': (alone_door == {'prevented': True} and alone.get('id') == 'C-45' and alone.get('words') == c45 and alone.get('beneath') is None and alone.get('offered') == act,
                         {'door': alone_door, 'hint': {k: alone.get(k) for k in ('id', 'words', 'beneath', 'offered')}}),
            'nothing placed or sent': (before is not None and after == before and edits == [] and sent == [] and ctx.js('window.__skep.caret()') == kept and (kept or {}).get('addr') != DOC,
                                       {'text': [before, after], 'edits': edits, 'sent': sent, 'caret': [kept, ctx.js('window.__skep.caret()')]}),
        }
    shoot(state, published_check, recentre)

    # the staging act's press, at the desktop width: its reason beside it and said, the hint standing — and again
    recentre(); ctx.settle(10); ctx.frames(2)
    unhint()
    paste(data); ctx.frames(2)
    pressed = []
    for _ in range(2):
        ctx.js('(() => { const b = document.querySelector("#hint button[data-offered]"); if (b) b.click(); })()'); ctx.frames(3)
        h = ctx.js('window.__skep.hint()') or {}
        pressed.append({'reason': (h.get('offered') or {}).get('reason'), 'said': live(ctx), 'standing': h.get('id')})
    r.check(all(p == {'reason': reason, 'said': heard(ctx, reason), 'standing': 'C-45'} for p in pressed),
            "B3-S5 · %s: the staging act, pressed — its reason beside it, a sentence, and said in the status region, at each press; the hint standing (FP-41)" % state, pressed)
    unhint()
    quiet()
    health1 = ctx.health()
    r.figures['published_target'] = {'log_position_before': health0.get('log_position'), 'log_position_after': health1.get('log_position'), 'writes': writes_from(n0)}
    r.check(health1.get('log_position') == health0.get('log_position') and writes_from(n0) == [],
            "B3-S5 · %s: the row sends no write — no write frame from the page, the test board's log position as it stood" % state, r.figures['published_target'])


# the kept line's second act at a corner, by the selector a person's eye would find it (T-ARTICLE's `historyHTML`)
HISTORY_ACT = ' button[data-history]'
# where the kept line's second act stands in the corner a selector names (formatted with it, as JSON): its box's offset from the
# corner's own, px, and its words — what stands at one place whichever kept word stands (issue #694); null where no act stands
ACT_IN_CORNER = '''((sel) => { const c = document.querySelector(sel), b = c && c.querySelector("button[data-history]"); if (!b) return null;
  const q = c.getBoundingClientRect(), k = b.getBoundingClientRect(); return {dx: +(k.left - q.left).toFixed(2), dy: +(k.top - q.top).toFixed(2), text: b.textContent}; })(%s)'''
# where the platform's focus stands in a corner: the corner's document and the act it stands on — the kept word, the kept line's
# second act — or null where it stands in none
ACT_AT = '''(() => { const e = document.activeElement, c = e && e.closest ? e.closest("[data-corner]") : null;
  return c ? {corner: c.dataset.corner, act: e.dataset && e.dataset.history != null ? "history" : e.dataset && e.dataset.kept ? "kept" : (e.className || "").split(" ")[0] || null} : null; })()'''
# a draft's text as the page shows it, whole: what a pane's text is held to
SHOWN_TEXT = '''(async (a) => { const L = await import("./text/layer.js"), R = await import("./model/records.js"), d = L.shownOf(a); return d.from < 0 ? "" : R.textOf(d.runs, d.from, d.to); })(%s)'''
# the list of a draft's past states as a person meets it: its top line, each day's head — its words, whether it is an act, folded
# or open, marked as the shown state's — and its lines, each a hand's or a row's with its words and whether it is the shown
# state's; where it stands — in its column at pane B's outer side, or after pane B's text — and whether it stands in the window
# the page's own reads of a draft's state from a call of the bridge's record on, in order: the position each asked as of the
# board's history, how it was answered, and where refused the refusal's name and the committed position it names below —
# read off the answer the gate's call record keeps
STATE_READS = '''((from) => window.__skep.bridge.calls().slice(from).filter((c) => c.name === "op" && c.op === "retrieve_doc_v_span_set" && /"at":/.test(c.frame || ""))
  .map((c) => { let a = null; try { a = JSON.parse(c.answer || "null"); } catch (e) { a = null; }
    const no = a && a.refused ? a.refused : null, near = no && no.body ? no.body.nearest : null;
    return {at: JSON.parse(c.frame).at, outcome: c.outcome, refused: no ? no.name : null, nearest: typeof near === "number" ? near : null}; }))(%d)'''

# a past state's pane B as drawn: its corner's words, the line saying why it shows its state — its words, its string and
# whether it is busy — and the list's floor mark, its words and the row it stands below
RECLAIMED_SEEN = '''(() => { const c = document.querySelector("#sceneB > .corner"), why = c && c.querySelector(".why"), l = document.getElementById("scenepast");
  const floor = l && l.querySelector(".pl-floor"), row = floor && floor.previousElementSibling;
  return {corner: c ? c.textContent : null, why: why ? {words: why.textContent, id: why.dataset.string || null, busy: why.getAttribute("aria-busy")} : null,
          floor: floor ? {words: floor.textContent, after: row && row.dataset ? Number(row.dataset.row) : null} : null}; })()'''


def no_token_in(seen):
    """does pane B's corner, as `RECLAIMED_SEEN` reads it, stand with no token of the strings table left in its words?"""
    return seen.get('corner') is not None and '⟨' not in seen['corner'] and '⟩' not in seen['corner']


PAST_LIST = '''(() => { const l = document.getElementById("scenepast"); if (!l) return null;
  const q = l.getBoundingClientRect(), art = document.querySelector("#sceneB > article.dtext");
  return {now: (l.querySelector(":scope > .pl-now") || {}).textContent || null,
          days: [...l.querySelectorAll(":scope > .pl-day")].map((d) => { const h = d.querySelector(":scope > .pl-head");
            return {key: d.dataset.key, head: h.textContent, act: h.tagName === "BUTTON", folded: h.getAttribute("aria-expanded") === "false", shown: h.hasAttribute("data-shown"),
                    lines: [...d.querySelectorAll(":scope > .pl-who, :scope > .pl-row")].map((x) => ({who: x.classList.contains("pl-who"), text: x.textContent, last: x.dataset.row ? Number(x.dataset.row) : null, shown: x.hasAttribute("data-shown")}))}; }),
          beside: l.classList.contains("beside"), after: l.parentElement && l.parentElement.id === "sceneB" && !!art && !!(art.compareDocumentPosition(l) & Node.DOCUMENT_POSITION_FOLLOWING),
          inView: q.width > 0 && q.height > 0 && q.left >= 0 && q.right <= window.innerWidth + 0.5 && q.top < window.innerHeight}; })()'''
# the list's head's stop and both step acts, by their strings, in the order its one line holds them (B3-S7 THE LIST; D5 K-102)
LIST_HEAD_IDS = ('B3.history.stop', 'B3.history.earlier-change', 'B3.history.next-change')
# the list's column as a person meets it beside the panes: its box — sides, top and foot — its content box's width, and the width
# a line of the words given takes in it, unwrapped, in the list's own type; the scene's inner right, foot and width; and each
# pane's sides, top, width, the room it keeps beside its content — its padding and its scrollbar — and its text's depth in its
# content, whatever its scroll
LIST_COLUMN = '''((head) => { const l = document.getElementById("scenepast"), sc = document.getElementById("scene"); if (!l || !sc) return null;
  const q = l.getBoundingClientRect(), s = getComputedStyle(l), r = sc.getBoundingClientRect();
  const probe = document.createElement("span"); probe.style.whiteSpace = "nowrap"; probe.textContent = head; l.prepend(probe); const need = probe.getBoundingClientRect().width; probe.remove();
  const pane = (id) => { const p = document.getElementById(id), b = p.getBoundingClientRect(), ps = getComputedStyle(p), a = p.querySelector(":scope > article.dtext"), ab = a ? a.getBoundingClientRect() : null;
    return {left: b.left, right: b.right, top: b.top, width: b.width, pad: parseFloat(ps.paddingLeft) + parseFloat(ps.paddingRight) + (p.offsetWidth - p.clientWidth), depth: ab ? ab.top - (b.top + p.clientTop) + p.scrollTop : null}; };
  return {left: q.left, right: q.right, top: q.top, bottom: q.bottom, width: q.width, inner: l.clientWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight), need,
          scene: {right: r.left + sc.clientLeft + sc.clientWidth, bottom: r.top + sc.clientTop + sc.clientHeight, width: sc.clientWidth}, a: pane("sceneA"), b: pane("sceneB")}; })(%s)'''
# the words of the list's top line, its days' heads, its hands and its rows each drawn across two lines or more: none where every
# word stands whole on one line
LIST_BROKEN = '''(() => { const l = document.getElementById("scenepast"); if (!l) return null; const out = [];
  for (const x of l.querySelectorAll(".pl-now, .pl-head, .pl-who, .pl-row")) {
    const w = document.createTreeWalker(x, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) for (const m of n.data.matchAll(/\\S+/g)) {
      const g = document.createRange(); g.setStart(n, m.index); g.setEnd(n, m.index + m[0].length);
      const tops = [...g.getClientRects()].filter((k) => k.width > 0).map((k) => k.top);
      if (tops.length && Math.max(...tops) - Math.min(...tops) > 4) out.push(m[0]); } }
  return out; })()'''
# each timed row's time slot in the list, as drawn: its left edge and its width, by row
LIST_SLOTS = '''(() => [...document.querySelectorAll("#scenepast .pl-row > .pl-time")].filter((e) => /^\\d\\d:\\d\\d$/.test(e.textContent || "")).map((e) => { const q = e.getBoundingClientRect(); return [q.left, q.width]; }))()'''
# how far pane B is scrolled down for its title to be read held at its top (`PAST_TITLE`), px
TITLE_SCROLL_PX = 300
# a past state's pane at its document's head as the person meets it (issue #677): its title — the past line's element, its
# words, whether it stands on a held row, its box and the held rows' box below the pane's visible top, whether the pointer
# meets it at its first words — before and after pane B is scrolled `down` px (formatted with it), and how far the pane moved;
# then, so scrolled, the chip's glyph focused — whether the focus stands on it, whether its row is held, its row's box and the
# held rows' box; whether a kind's slot stands in the corner, the rows the scene says it holds, and how many of both heads'
# rows are hidden; pane B's scroll put back after
PAST_TITLE = '''(async (down) => { const pane = document.getElementById("sceneB"), c = pane && pane.querySelector(":scope > .corner.head"); if (!c) return null;
  const frames = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const box = (e) => { const t0 = pane.getBoundingClientRect().top + pane.clientTop, q = e.getBoundingClientRect(); return {top: q.top - t0, bottom: q.bottom - t0}; };
  const read = () => { const t = c.querySelector('[data-string="B3.history.row"]'), row = t && t.closest(".hrow");
    const hit = !!t && (() => { const q = t.getBoundingClientRect(), e = document.elementFromPoint(q.left + Math.min(8, q.width / 2), q.top + Math.min(8, q.height / 2)); return !!e && t.contains(e); })();
    return {words: t ? t.textContent : null, held: !!row && row.dataset.held === "1", box: t ? box(t) : null, head: box(c), hit}; };
  const s0 = pane.scrollTop, at = read();
  pane.scrollTop = s0 + down; await frames();
  const scrolled = read(), moved = pane.scrollTop - s0, chip = c.querySelector("button[data-chip]");
  let focused = null;
  if (chip) { chip.focus(); await frames(); const r = chip.closest(".hrow"); focused = {on: document.activeElement === chip, held: r ? r.dataset.held === "1" : null, row: r ? box(r) : null, head: box(c)}; chip.blur(); }
  const hidden = [...document.querySelectorAll("#sceneA > .corner.head > .hrow, #sceneB > .corner.head > .hrow")].filter((r) => getComputedStyle(r).visibility === "hidden").length;
  pane.scrollTop = s0; await frames();
  return {at, scrolled, moved, focused, hidden, kind: !!c.querySelector(".kind"), rows: ((window.__skep.scene.panes() || {}).b || {}).heldRows}; })(%s)'''
# a past state's pane's corner and name as the person meets them at any fit (issue #687): whether its corner stands at its
# document's head, whether its title leads it — beside its column its first item, at its head on its first row — and the
# past line's words; whether a kind's slot stands in it; the words the past line's own element names pane B by, how pane B
# is labelled and the address its head names
PAST_LEAD = '''(() => { const pane = document.getElementById("sceneB"), c = pane && pane.querySelector(":scope > .corner"); if (!c) return null;
  const head = c.classList.contains("head"), t = c.querySelector('[data-string="B3.history.row"]'), lead = head ? c.querySelector('.hrow[data-row="0"] .hslot > .title') : c.firstElementChild;
  const name = document.getElementById("sceneB-title"), addr = document.getElementById("sceneB-name");
  return {head, leads: !!lead && !!t && lead.classList.contains("title") && lead.contains(t), words: t ? t.textContent : null, kind: !!c.querySelector(".kind"),
          name: name && name === t ? name.getAttribute("aria-label") : null, labelled: pane.getAttribute("aria-labelledby"), address: addr ? addr.textContent : null}; })()'''
# a window between the two `read` is shot at, where a draft's history stands stacked with both corners beside their columns
# — the fit its check reads there and holds it to (issue #687)
STACKED_BESIDE = (800, 900)
# the line saying why a past state's pane shows the state it shows, as a person meets it in pane B's corner (issue #678): its
# words and its string, whether it stands in a slot of a head's rows and that slot one row tall, how many lines its words take
# — their line boxes read by a Range, in fractional px — and how far they run past the slot's right edge, px
WHY_LINE = '''(() => { const e = document.querySelector("#sceneB > .corner .why"); if (!e) return null; const s = e.closest(".hslot"), rs = [];
  const w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) if (n.data.trim()) { const g = document.createRange(); g.selectNodeContents(n); rs.push(...[...g.getClientRects()].filter((k) => k.width > 0)); }
  const tops = rs.map((k) => k.top).sort((a, b) => a - b), lines = tops.filter((y, i) => i === 0 || y - tops[i - 1] > rs[0].height / 2).length;
  return {words: e.textContent, id: e.dataset.string || null, slot: !!s, oneRow: !!s && !s.classList.contains("wraps"), lines,
          past: s && rs.length ? +(Math.max(...rs.map((k) => k.right)) - s.getBoundingClientRect().right).toFixed(2) : null}; })()'''
# the first span of pane B's text standing in view — the first not scrolled above the pane's visible top — by its first
# position: where the person reads the past state; null where pane B holds no article or no span stands in view
PANE_FIRST = '''(() => { const pane = document.getElementById("sceneB"), art = pane && pane.querySelector(":scope > article.dtext"); if (!art) return null;
  const top = pane.getBoundingClientRect().top + pane.clientTop, e = [...art.querySelectorAll(".run > .sp")].find((x) => x.getBoundingClientRect().bottom > top);
  return e ? Number(e.dataset.pos) : null; })()'''
# a feed row handed in as the feed hands one (the gate's `model.feed`; formatted with the row, as JSON), and pane B as a person
# meets it read in the same call, before any frame runs (skep-frontend #697): its description, whether its corner holds the line
# saying why it shows its state, that line as the scene derives it, and the rows the list holds, by their last positions, newest
# first
MOVED_IN = '''((row) => { window.__skep.model.feed(row); const pane = document.getElementById("sceneB"), p = window.__skep.scene.past();
  return {description: pane ? pane.getAttribute("aria-description") : "no pane B", why: !!document.querySelector("#sceneB > .corner .why"),
          past: p ? p.why : "no history", rows: p ? p.days.flatMap((d) => d.rows.map((r) => r.last)) : null}; })(%s)'''
# pane B's not-last clause as a person meets it in its corner (skep-frontend #696): its words and its string, what its count's
# box shows and whether it stands empty, whether the corner stands at its document's head and the clause on a row held at the
# pane's top there, whether it follows the title and goes before the chip, and whether a "⟨n⟩ more" or the words saying the
# state is how the draft stands now stand in the corner
NOT_LAST_SEEN = '''(() => { const c = document.querySelector("#sceneB > .corner"); if (!c) return null;
  const e = c.querySelector(".not-last"), t = c.querySelector('[data-string="B3.history.row"]'), chip = c.querySelector("[data-chip]"), box = e && e.querySelector(".count"), row = e && e.closest(".hrow");
  const before = (a, z) => !!a && !!z && !!(a.compareDocumentPosition(z) & Node.DOCUMENT_POSITION_FOLLOWING);
  return {head: c.classList.contains("head"), words: e ? e.textContent : null, id: e ? e.dataset.string || null : null, count: box ? box.textContent : null, pending: box ? box.classList.contains("pending") : null,
          held: !!row && row.dataset.held === "1", after_title: before(t, e), before_chip: before(e, chip), more: !!c.querySelector(".more"), now: !!c.querySelector('[data-string="B3.history.now"]')}; })()'''
# the draft's history opened by a click on the act (formatted with its selector, as JSON), pane B's in-flight clause read in the
# frame it first stands (skep-frontend #696), by an observer the click is made under: its words and its string, whether its
# element is busy and carries the one running mark, the running marks pane B's corner holds, the line saying why pane B shows
# its state — its words, whether it is busy and whether it carries a mark — whether the clause stands on a row held at the
# pane's top at its document's head, after the title and before the chip, pane B's name's references, its description and
# whether pane B is busy, and the history as the scene holds it then; `timedOut` where no clause stood within 15 s
IN_FLIGHT_SEEN = '''(async (sel) => { const b = document.querySelector(sel); if (!b) return {clicked: false};
  const read = () => { const c = document.querySelector("#sceneB > .corner"), e = c && c.querySelector(".inflight"); if (!e) return null;
    const pane = document.getElementById("sceneB"), why = c.querySelector(".why"), t = c.querySelector('[data-string="B3.history.row"]'), chip = c.querySelector("[data-chip]"), row = e.closest(".hrow");
    const before = (a, z) => !!a && !!z && !!(a.compareDocumentPosition(z) & Node.DOCUMENT_POSITION_FOLLOWING), p = window.__skep.scene.past();
    const words = [...e.childNodes].filter((n) => !(n.classList && n.classList.contains("running"))).map((n) => n.textContent).join("");
    return {clicked: true, head: c.classList.contains("head"), words, id: e.dataset.string || null, busy: e.getAttribute("aria-busy"), mark: !!e.querySelector('.running[data-string="L.running"]'),
            marks: c.querySelectorAll(".running").length, why: why ? {words: why.textContent, busy: why.getAttribute("aria-busy"), mark: !!why.querySelector(".running")} : null,
            held: !!row && row.dataset.held === "1", after_title: before(t, e), before_chip: before(e, chip), labelled: pane.getAttribute("aria-labelledby"), description: pane.getAttribute("aria-description"), pane_busy: pane.getAttribute("aria-busy"),
            past: p ? {at: p.at, asked: p.asked, met: p.met, running: p.running, inFlight: p.inFlight} : null}; };
  return await new Promise((res) => {
    let timer = 0;
    const obs = new MutationObserver(() => { const v = read(); if (v) { obs.disconnect(); clearTimeout(timer); res(v); } });
    obs.observe(document.body, {subtree: true, childList: true, attributes: true, characterData: true});
    timer = setTimeout(() => { obs.disconnect(); res({clicked: true, timedOut: true}); }, 15000);
    b.click(); }); })(%s)'''
# pane B's line where its asked state's read stopped, as a person meets it (skep-frontend #702): the corner's words; the line's
# words, its string, the id its own element carries and the refusal's name it sets as code; "read it again" — its words,
# whether it stands inert, its slot's width, whether it follows the line and whether its row at the head is a line of acts
# of its own; the asked row's mark, its words and its row; and pane B's name's references and its description
UNREAD_SEEN = '''(() => { const pane = document.getElementById("sceneB"), c = pane && pane.querySelector(":scope > .corner"); if (!c) return null;
  const why = c.querySelector(".why"), code = why && why.querySelector(".code"), act = c.querySelector("button[data-again]"), slot = act && act.closest(".again-slot"), row = act && act.closest(".hrow");
  const l = document.getElementById("scenepast"), mark = l && l.querySelector(".pl-unread"), marked = mark && mark.closest(".pl-row");
  const before = (a, z) => !!a && !!z && !!(a.compareDocumentPosition(z) & Node.DOCUMENT_POSITION_FOLLOWING);
  return {corner: c.textContent, why: why ? {words: why.textContent, id: why.dataset.string || null, own: why.id || null, code: code ? code.textContent : null} : null,
          act: act ? {words: act.textContent, inert: act.getAttribute("aria-disabled"), width: slot ? slot.style.width : null, after: before(why, act), toolbar: !row || row.getAttribute("role") === "toolbar"} : null,
          mark: mark ? {words: mark.textContent, id: mark.dataset.string || null, row: marked ? Number(marked.dataset.row) : null} : null,
          labelled: pane.getAttribute("aria-labelledby"), description: pane.getAttribute("aria-description")}; })()'''


def past_rows(ctx, r, shoot, red, ops_allowed, m):
    """A DRAFT's HISTORY (B3-S7; skep-frontend #661, #662, #585, #617), on the machine's page at the case's own draft
    (`mine`), each state checked against `strings.js` and shot at both widths. `corner-act`: the kept line's second act at
    each of the three kept words at one place, every word of the corner inside the box it stands in (`fit_part`; issue
    #694), Tab from the plane's stop standing on the kept word, → on the act and Enter opening the draft's history. `read`:
    two lines typed a minute apart and kept by the test board, then the act clicked —
    the scene on the draft beside its state before its newest change, that state's text the board's at the position the row
    below the top row ends at, the history read's pages and rows and the state read's time a figure (FP-18); then
    `changes` armed, once the page is quiet, with the draft's own rows read through the page's port and three synthetic
    ones below them — a signed row, a publication, a row of lost testimony — the act clicked again and the arm checked
    taken, one day's head clicked folded; the list's heads and rows in the strings table's words, each word whole on one
    line and each timed row's time in one slot, the past pane's corner, the bar's and the one line's second address, the
    past pane's title at its document's head — its line first, held at the pane's top as its text scrolls, no kind's slot,
    the pane named by its own element, the chip on a row that scrolls brought below the held rows as the focus comes to it,
    no head's row hidden (issue #677) — the pane's name as the AX tree computes it, its title then its address, with no
    description; the bands; side by side both corners at their heads, both texts at one depth, and the list in its own column at pane B's
    outer side from the panes' top to the scene's foot, as wide as a line of its head's stop and both step acts needs, the
    panes one width either side of the whole gutter, the column's width and the panes' measure figures (FP-18); one px
    either side of the window at which beside it the panes keep HEAD_CH characters — the case's own arithmetic, by the
    page's measured advance and the column as laid out — the list in its column, then after pane B's text, the panes side
    by side (skep-frontend #668); stacked at the narrow width after pane B's text, the current pane's kept line at its head
    and the rest of its corner at its foot (D2); stacked at STACKED_BESIDE, between them, the past pane's corner beside its
    column led by its title, no kind's slot, each of its lines inside the corner, and the pane's name the one the AX tree
    computed at both widths (issue #687); and there the current pane's corner beside its column too, its kept line's second
    act on a row of its own beneath the kept word, every word of the corner inside its content box at the page's spacing and
    the reader's (`corner_fit`; issue #694).
    `reclaimed`: `op` armed, once the page is quiet, to refuse the state before the newest change as `history_reclaimed`,
    naming no floor, then the act — the arm taken by that read, the page's own state reads in order read off its call
    record with each answer's refusal and the committed position it names, the position refused never asked again, nor
    any at or past the newest change; where the board wrote between the two newest rows, the state asked again at the
    position before the newest change, the board's named position followed only past the one refused, and where a read
    there lands shown as asked, no line and no floor mark; else — no position between the rows, or the board naming the one
    refused — the newest kept state, the draft as the board holds it, in its place, pane B's corner and the list's floor
    mark below its row saying the board keeps the draft's history back to the time that state stood, in the strings
    table's words (skep-frontend #688). Then the same arm naming as its floor the top row's first position, and the act —
    the shot: the state asked once and no more, the feed's row at the floor read as one row of `changes` past the position
    before it under the page's session, the newest kept state in its place, pane B's corner and the floor mark saying no
    earlier state is readable on the board, which keeps states back to that row's date (#700); no token in pane B's
    corner either way.
    `now`: `changes` armed, once the page is quiet, with the draft's newest row alone, then the act — the history on that
    row's state, the current text, pane B's corner saying it is how the draft stands now, on one line inside its slot, the
    pane named by its title and described by that line as the AX tree computes them (issue #687).
    `now-moved`, at each width afresh: `changes` armed, once the page is quiet, with the draft's newest row in another minute
    than its newest change alone, then the act — the history on that row's state, pane B's corner and its description saying
    it is how the draft stands now; then the newest change handed in as the feed hands a row (`MOVED_IN`), a real row at a
    position the page's place on the feed has passed, under the page's session, and pane B read in that same call, before any
    frame: its description and its corner's line gone together, the list holding the row (FP-33; skep-frontend #697); once
    the page settles, no line and no description as the AX tree computes it, the state shown and its row's mark as they stood,
    pane B's text and its first span in view (`PANE_FIRST`) unmoved, the days folded and open as they stood, a day the row
    names anew folded.
    `not-last`, at each width afresh: `changes` armed, once the page is quiet, with the draft's own rows up to the row below
    the top and, at the position the top row began at, a signed hand's row in that row's minute, then the act — the history
    on the earlier line's state, its minute's rows counted once the scene tells them, pane B's corner carrying "one of ⟨n⟩
    changes that minute, not the last" after its title and before the chip, its count in its box, on a held row at its head,
    nothing folded (`NOT_LAST_SEEN`), pane B named by its title then its address and described by the clause as the AX tree
    computes them (skep-frontend #696).
    `in-flight`, at each width afresh: `op` armed, once the page is quiet, to refuse the state before the newest change as
    `scan_busy`, then the act clicked under an observer that reads pane B's corner in the frame the in-flight clause first
    stands (`IN_FLIGHT_SEEN`): the newest kept state in the place of the one asked, the scene reissuing it, "reading ⟨time⟩"
    after the title and before the chip on a held row, the one running mark on its own busy element and none on the line
    saying why, which says the draft's history is busy and never the link scan's words, pane B named by its title, the line
    and its address, described by the clause and never busy; then, the board answering the reissue, the state asked landing
    and the clause, the busy element and the description gone (skep-frontend #696, #702).
    `unread`, at each width afresh: `op` armed, once the page is quiet, to refuse the state before the newest change as
    `internal_panic`, then the act — the newest kept state in the place of the one asked, the state asked once and never
    again by the scene, pane B's line saying it could not be read as it stood at its row's time and that the board refused
    the read, the refusal's name after it set as code, no word of a write, "read it again" live beneath it in a slot of its
    own width, the asked row "not read" (`UNREAD_SEEN`), pane B named by its title, the line and its address as the AX tree
    computes them, with no description; then, after the shots, the act pressed with the arm spent — the state asked asked
    again at its row and read by the test board, pane B on it, the line, the act and the mark gone (skep-frontend #702).
    `unkept`: a line held, then the act — the newest kept state, the list's top line saying so. At `read`, `reclaimed`,
    `now`, `now-moved`, `not-last`, `in-flight`, `unread` and `unkept`, at both widths, every word of both panes' corners stands inside
    the box it is set in, 1 px either way, the worst excess a figure (`fit_part`; issue #678). No `history.past` is called; the
    rows' writes are the two typed lines and the held line's drop."""
    mine, corner, quiet, recentre, caret_end, press, first_line, hold_typed, drop_all = (m[k] for k in ('mine', 'corner', 'quiet', 'recentre', 'caret_end', 'press', 'first_line', 'hold_typed', 'drop_all'))
    sid, figures = m['sid'], m['figures']
    # both panes' corners: at their documents' heads, an editor pane's foot among them
    pane_corners = ('#sceneA > .corner', '#sceneB > .corner')
    act_sel = corner + HISTORY_ACT
    health0 = ctx.health()
    calls0 = len(page_calls(ctx))
    text_of = lambda: ctx.js(SHOWN_TEXT % json.dumps(mine)) or ''
    flat = lambda s: (s or '').replace('\n', '')
    pane_text = lambda side: ''.join(b['text'] for b in ((ctx.js('window.__skep.scene.panes()') or {}).get(side) or {}).get('blocks') or [])
    state_kept = lambda: wait_for(ctx, '(() => { const s = window.__skep.write.state(%s); return !!s.kept && s.kept.word === "kept" && window.__skep.write.edits(%s).length === 0; })()' % (json.dumps(mine), json.dumps(mine)), 20)

    def close_scene():
        ctx.js('window.__skep.scene.close()'); ctx.settle(15); ctx.frames(2)

    def open_by_act():
        """the draft's corner brought into view and its kept line's second act clicked, as a pointer's click makes it: whether
        the scene stands on the draft's history once its reads answer"""
        recentre(); ctx.settle(10); ctx.frames(2)
        clicked = ctx.js('((s) => { const b = document.querySelector(s); if (b) b.click(); return !!b; })(%s)' % json.dumps(act_sel))
        came = clicked and wait_for(ctx, '(() => { const p = window.__skep.scene.past(); return window.__skep.scene.isOpen() && !!p && p.draft === %s; })()' % json.dumps(mine), 30)
        ctx.settle(20); ctx.frames(3)
        return came

    # ---- `corner-act`: the act on the kept line, its place unmoved as the word changes; Tab, → and Enter reach it --------------
    quiet()
    ctx.js('(async () => (await import("./text/layer.js")).dropCaret())()'); ctx.frames(2)

    def corner_act_check(w):
        places = {}
        for word in ('kept', 'not yet kept', 'not kept'):
            ctx.js('window.__skep.write.setKept(%s, %s)' % (json.dumps(mine), json.dumps({'word': word, 'reason': None}))); ctx.frames(3)
            places[word] = ctx.js('''((s) => { const b = document.querySelector(s); if (!b) return null; const q = b.getBoundingClientRect();
              return {x: q.left, y: q.top, text: b.textContent, id: b.dataset.string || null, inert: b.getAttribute("aria-disabled")}; })(%s)''' % json.dumps(act_sel))
        ctx.js('window.__skep.write.setKept(%s, %s)' % (json.dumps(mine), json.dumps({'word': 'kept', 'reason': None}))); ctx.frames(3)
        # beside its column at the desktop width, at its head at the narrow one: every word of the corner inside the box it
        # stands in, its kept line's act among them (issue #694)
        fit = fit_part(ctx, figures, 'corner-act', w, corner)
        k = places['kept']
        act_ok = bool(k) and k['text'] == t(ctx, 'B3.past-states') and k['id'] == 'B3.past-states' and k['inert'] is None and len(shown(ctx, act_sel)) == 1
        unmoved = all(places[x] and k and abs(places[x]['x'] - k['x']) < 0.5 and abs(places[x]['y'] - k['y']) < 0.5 for x in places)
        # the keys: the plane's stop, then Tab to the corner's stop, → along its line, Enter at the act
        ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
        ctx.js('document.getElementById("walk-" + window.__skep.mirror.index()).focus({preventScroll: true})'); ctx.frames(1)
        ctx.drv.key('Tab'); ctx.settle(); ctx.frames(2)
        tabbed = ctx.js(ACT_AT)
        ctx.drv.key('ArrowRight'); ctx.frames(2)
        arrowed = ctx.js(ACT_AT)
        ctx.drv.key('Enter')
        opened = wait_for(ctx, '(() => { const p = window.__skep.scene.past(); return window.__skep.scene.isOpen() && !!p && p.draft === %s; })()' % json.dumps(mine), 30)
        ctx.settle(20); ctx.frames(2)
        close_scene(); recentre(); ctx.settle(10); ctx.frames(3)
        keys_ok = tabbed == {'corner': mine, 'act': 'kept'} and arrowed == {'corner': mine, 'act': 'history'} and opened
        return {'the act': (act_ok, {'act': k, 'shown': len(shown(ctx, act_sel))}), 'its place': (unmoved, places),
                'the keys': (keys_ok, {'tab': tabbed, 'arrow': arrowed, 'enter_opened': opened}),
                "the corner's words in their boxes": fit}
    shoot('corner-act', corner_act_check, recentre)

    # ---- `read`: two lines a minute apart, kept by the board; the act; the state before the newest change -----------------------
    quiet()
    line = first_line()
    caret_end(line); press(' Earlier.')
    first_kept = state_kept()
    quiet()
    text1 = text_of()
    minute = ctx.js('Math.floor(Date.now() / 60000)')
    waited = time.time()
    while ctx.js('Math.floor(Date.now() / 60000)') <= minute and time.time() - waited < 75:
        time.sleep(0.5)
    time.sleep(1.0)
    caret_end(line + ' Earlier.'); press(' Later.')
    second_kept = state_kept()
    quiet()
    text2 = text_of()
    ctx.js('(async () => (await import("./text/layer.js")).dropCaret())()'); ctx.frames(2)
    r.check(first_kept and second_kept and text1 != text2, "B3-S7 · read: two lines typed into the case's own draft a minute apart, each kept by the test board", {'first': first_kept, 'second': second_kept, 'waited_s': round(time.time() - waited, 1)})
    opened1 = open_by_act()
    P1 = ctx.js('window.__skep.scene.past()') or {}
    rows1 = [row for d in P1.get('days') or [] for row in d['rows']]
    below1 = rows1[1] if len(rows1) > 1 else {}
    got_b, got_a = pane_text('b'), pane_text('a')
    real_ok = (opened1 and len(rows1) >= 2 and P1.get('at') == below1.get('last') and flat(got_b) == flat(text1) and flat(got_a) == flat(text2)
               and rows1[0].get('time') and below1.get('time') and rows1[0]['time'] // 60000 != below1['time'] // 60000)
    r.check(real_ok, "B3-S7 · read: the act opens the draft's history on its state before its newest change — the text the test board held at the position the row below the top row ends at, the line typed a minute before the newest — its rows two minutes and more", {'opened': opened1, 'at': P1.get('at'), 'rows': [(x['first'], x['last'], x['kind']) for x in rows1[:4]], 'b': got_b[:120], 'want_b': text1[:120], 'a': got_a[-60:]})
    r.figures['history_read'] = {'figures': P1.get('figures'), 'rows': len(rows1), 'entries': P1.get('entries'), 'days': len(P1.get('days') or [])}
    close_scene()

    # ---- `read`, again: `changes` armed with the draft's own rows and three of the harness's below them -----------------------------
    quiet()
    real, since, head = [], 0, None
    for _ in range(20):
        page = ctx.js('(async () => { const P = await import("./bridge/port.js"); return await P.changes({session: %s, since: %d, under: %s}); })()' % (json.dumps(sid), since, json.dumps(mine))) or {}
        res = page.get('result') or {}
        real += res.get('entries') or []
        head = res.get('head', head)
        if not res or res.get('next', 0) >= res.get('head', 0) or res.get('next', 0) <= since:
            break
        since = res['next']
    p0 = min((u['position'] for u in real), default=0)
    day_at = lambda back: ctx.js('(() => { const d = new Date(); d.setDate(d.getDate() - %d); d.setHours(15, 0, 0, 0); return d.getTime(); })()' % back)
    member = trunk_of(DOC) + '.1'
    synthetic = [
        {'position': p0 - 3, 'at': p0 - 3, 'op': None, 'docs': None, 'class': 'drafts', 'key': None, 'time': None, 'base': None, 'merge': None},
        {'position': p0 - 2, 'at': p0 - 2, 'op': 'publish', 'docs': [member, mine], 'class': 'published', 'attest': {'alg': 'mldsa65-ed25519', 'sig': 'ab'}, 'time': day_at(2)},
        {'position': p0 - 1, 'at': p0 - 1, 'op': 'make_link', 'docs': [mine], 'class': 'drafts', 'attest': {'alg': 'mldsa65-ed25519', 'sig': 'cd'}, 'link': mine + '.0.2.1', 'time': day_at(1)},
    ]
    seq = ctx.editor_seq()
    armed = ctx.arm('changes', answer={'entries': synthetic + real, 'next': head, 'head': head})
    opened2 = open_by_act()
    taken = ctx.consumed('changes', seq)
    r.check(bool(real) and p0 > 3 and (armed.get('result') or {}).get('armed') == 'changes' and opened2 and taken,
            "B3-S7 · read: `changes` armed, once the page is quiet, with the draft's own rows and three of the harness's below them, at positions at or below the head and `next` at it — the arm taken by the history read",
            {'real_rows': len(real), 'p0': p0, 'head': head, 'armed': armed, 'opened': opened2, 'consumed': taken})
    P2 = ctx.js('window.__skep.scene.past()') or {}
    yesterday = next((d['key'] for d in P2.get('days') or [] if any(x['first'] == p0 - 1 for x in d['rows'])), None)
    # the reader's act at yesterday's head folds it, where the room it was given did not fold it on opening
    folded = yesterday and ctx.js('((k) => { const b = document.querySelector(`#scenepast button[data-day="${k}"]`); if (b && b.getAttribute("aria-expanded") === "true") b.click(); return !!b; })(%s)' % json.dumps(yesterday))
    ctx.frames(3)
    lists = ctx.js('''(async (h) => { const S = await import("./scene/scene.js"), U = await import("./util.js"), T = await import("./strings.js"), p = S.past();
      if (!p) return null; const rows = p.days.flatMap((d) => d.rows), below = rows[1];
      return {below, corner: below ? T.t("B3.history.row", {time: T.stoodAt(below.time), hand: S.handWords(below.hand)}) : null, asOf: below ? T.t("B3.history.as-of", {time: T.stoodAt(below.time)}) : null,
              days: p.days.map((d) => ({key: d.key, date: d.date, hands: [...new Set(d.rows.map((r) => S.handWords(r.hand)))]})),
              rows: rows.map((r) => ({last: r.last, time: r.time == null ? null : U.timeOf(r.time), words: r.words, hand: S.handWords(r.hand)}))}; })()''')
    want = {'signed': t(ctx, 'L.history.hand.signed'), 'unrecorded': t(ctx, 'L.history.time-unrecorded'), 'not_recorded': t(ctx, 'F.slot.not-recorded'), 'folded': t(ctx, 'L.history.folded'),
            'version': t(ctx, 'B3.history.row.version', {'k': 1, 'E': trunk_of(DOC)}), 'typed': t(ctx, 'B3.history.kind.typed'), 'linked': t(ctx, 'L.history.kind.linked')}
    # pane B's name and description as the AX tree computes them at each width `read` is checked at, by width
    pane_names = {}

    def read_check(w):
        P, fit = ctx.js('window.__skep.scene.past()') or {}, ctx.js('window.__skep.scene.fit()') or {}
        L, ex = ctx.js(PAST_LIST) or {}, lists or {}
        in_boxes = fit_part(ctx, figures, 'read', w, *pane_corners)
        rows = [row for d in P.get('days') or [] for row in d['rows']]
        state_ok = (ctx.js('window.__skep.scene.isOpen()') and P.get('draft') == mine and len(rows) >= 2 and P.get('at') == rows[1]['last'] and flat(pane_text('b')) == flat(text1)
                    and (ctx.js('window.__skep.scene.panes()') or {}).get('b', {}).get('derived') is True)
        # each day's head its date, or "time not recorded"; yesterday's folded, naming its one hand, "signed"; the rows in the strings table's words
        heads = {d['key']: d for d in L.get('days') or []}
        exdays = {d['key']: d for d in ex.get('days') or []}
        dates_ok = all((heads[k]['head'] == (exdays[k]['date'] if exdays[k]['date'] else want['unrecorded'])) or (heads[k]['folded'] and heads[k]['head'].startswith(want['folded'] + (exdays[k]['date'] or ''))) for k in heads if k in exdays) and set(heads) == set(exdays)
        y = heads.get(yesterday) or {}
        folded_ok = bool(folded) and y.get('folded') and y.get('act') and y.get('head') == want['folded'] + (exdays.get(yesterday) or {}).get('date', '') + want['signed'] and y.get('lines') == []
        lines = [x for d in L.get('days') or [] for x in d['lines'] if not x['who']]
        exrows = {x['last']: x for x in ex.get('rows') or []}
        rows_ok = all(x['text'] == (want['not_recorded'] if exrows[x['last']]['time'] is None and exrows[x['last']]['words'] == want['not_recorded'] else f"{exrows[x['last']]['time'] or want['not_recorded']} · {exrows[x['last']]['words']}") for x in lines if x['last'] in exrows)
        marks_ok = (any(x['words'] == want['version'] for x in ex.get('rows') or []) and any(x['text'] == want['not_recorded'] for x in lines)
                    and sum(1 for x in lines if x['shown']) == 1 and next((x['last'] for x in lines if x['shown']), None) == P.get('at')
                    and any(x['text'].endswith(want['typed']) for x in lines))
        corner_line = ctx.js('(() => { const e = document.querySelector("#sceneB > .corner .past"); return e ? e.textContent : null; })()')
        chip = ctx.js('!!document.querySelector("#sceneB > .corner [data-chip], #sceneB > .corner .chip")')
        bar_as_of = ctx.js('(() => { const e = document.querySelector("#scenebar .as-of"); return e ? e.textContent : null; })()')
        line_as_of = ctx.js('(() => { const e = document.querySelector("#line .seg.as-of"); return e ? e.textContent : null; })()')
        corner_ok = corner_line == ex.get('corner') and chip and bar_as_of == ex.get('asOf') and line_as_of == ex.get('asOf')
        # the line pane B's title at its document's head: first, on its held rows, no kind's slot, pane B named by its own
        # element; held there as the text scrolls under it; the chip on a row that scrolls, brought below the held rows as
        # the focus comes to it; no head's row hidden (issues #677, #687)
        ti, lead = ctx.js(PAST_TITLE % json.dumps(TITLE_SCROLL_PX)) or {}, ctx.js(PAST_LEAD) or {}
        at, down, chip_at = ti.get('at') or {}, ti.get('scrolled') or {}, ti.get('focused') or {}
        held_box, title_box, chip_row = down.get('head') or {}, down.get('box') or {}, chip_at.get('row') or {}
        title_ok = (bool(ti) and not ti.get('kind') and at.get('words') == ex.get('corner') and at.get('held') and (ti.get('rows') or 0) >= 1
                    and lead.get('leads') and lead.get('name') == heard(ctx, ex.get('corner') or '') and lead.get('labelled') == 'sceneB-title sceneB-name'
                    and (ti.get('moved') or 0) >= 100 and down.get('words') == ex.get('corner') and down.get('hit') and title_box.get('top', -1) >= held_box.get('top', 0) - 0.5
                    and title_box.get('bottom', 1e9) <= held_box.get('bottom', 0) + 0.5 and chip_at.get('on') and chip_at.get('held') is False
                    and chip_row.get('top', -1) >= (chip_at.get('head') or {}).get('bottom', 1e9) - 0.5 and ti.get('hidden') == 0)
        ties = ctx.js('window.__skep.scene.ties()') or []
        bands_ok = any(x['kind'] == 'band' for x in ties) and bool((ctx.js('window.__skep.scene.pairs()') or {}).get('pairs'))
        # every word of the list whole on its line, a long row taking two lines between words; every timed row's time in one slot
        broken, slots = ctx.js(LIST_BROKEN), ctx.js(LIST_SLOTS) or []
        spread = lambda k: max(x[k] for x in slots) - min(x[k] for x in slots) if slots else None
        words_ok = broken == [] and len(slots) >= 2 and spread(0) <= 0.5 and spread(1) <= 0.5
        if w == WIDE[0]:
            g = ctx.js(LIST_COLUMN % json.dumps(head_words)) or {}
            a, b, sc = g.get('a') or {}, g.get('b') or {}, g.get('scene') or {}
            near = lambda x, y, tol=0.5: x is not None and y is not None and abs(x - y) <= tol
            # in its column at pane B's outer side, from the panes' top to the scene's foot; both corners at their heads, both texts at one depth
            placed = (bool(g) and fit.get('stacked') is False and fit.get('corner') == 'head' and (fit.get('outer') or 0) > 0 and L.get('beside') and L.get('inView')
                      and near(g.get('right'), sc.get('right')) and near(g.get('top'), a.get('top')) and near(g.get('top'), b.get('top')) and near(g.get('bottom'), sc.get('bottom'))
                      and near(a.get('depth'), b.get('depth')))
            # the panes one width either side of the whole gutter, pane B short of the column, each keeping HEAD_CH characters or more
            shared = (bool(g) and b.get('right', math.inf) <= g.get('left', -math.inf) + 0.5 and near(a.get('width'), b.get('width'), 1)
                      and near((b.get('left') or 0) - (a.get('right') or 0), SIDE_GAP_PX, 1) and (fit.get('cpl') or 0) >= HEAD_CH)
            # as wide as its head needs: a line of its stop and both step acts fits its content box, which is no wider than that line, rounded up
            sized = bool(g) and g['need'] <= g['inner'] + 0.5 and g['inner'] <= g['need'] + 1.5
            form_ok = placed and shared and sized
            form = {'fit': fit, 'beside': L.get('beside'), 'in_view': L.get('inView'), 'column': {k: g.get(k) for k in ('left', 'right', 'top', 'bottom', 'width', 'inner', 'need')},
                    'scene': sc, 'a': a, 'b': b}
            if g:
                r.figures['history_list'] = {'window_px': w, 'column_px': g['width'], 'content_px': g['inner'], 'head_line_px': round(g['need'], 2), 'cpl': fit.get('cpl'), 'pane_px': a.get('width')}
        else:
            d2 = ctx.js('''(() => { const h = document.querySelector("#sceneA > .corner.head"), f = document.querySelector("#sceneA > .corner.foot"), a = document.querySelector("#sceneA > article.dtext");
              return {head: !!h && !!h.querySelector(".kept-word") && !!h.querySelector("[data-history]") && !h.querySelector(".chip"), foot: !!f && !!f.querySelector(".chip"),
                      after: !!f && !!a && !!(a.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING)}; })()''')
            form_ok = fit.get('stacked') is True and L.get('after') and not L.get('beside') and d2 == {'head': True, 'foot': True, 'after': True}
            form = {'stacked': fit.get('stacked'), 'after': L.get('after'), 'd2': d2}
        # pane B's name as the AX tree computes it: its title's own element, then its address — the same at every fit (`named`,
        # below) — and no description, the state shown the one its act asked (issue #687)
        pane_names[w] = got_as = named_as(ctx, '#sceneB') or {}
        name_ok = got_as.get('name') == '%s %s' % (heard(ctx, ex.get('corner') or ''), lead.get('address')) and got_as.get('description') is None
        return {'the state': (state_ok, {'at': P.get('at'), 'rows': [x['last'] for x in rows[:4]], 'b': pane_text('b')[:100], 'want': text1[:100]}),
                'the days': (dates_ok and folded_ok, {'heads': {k: (v['head'], v['folded'], v['act']) for k, v in heads.items()}, 'want': exdays, 'yesterday': y}),
                'the rows': (rows_ok and marks_ok, {'lines': lines[:10], 'want': list(exrows.values())[:10], 'version': want['version']}),
                'the corner': (corner_ok, {'corner': corner_line, 'chip': chip, 'bar': bar_as_of, 'line': line_as_of, 'want': [ex.get('corner'), ex.get('asOf')]}),
                'the title': (title_ok, dict(ti, lead=lead, want=ex.get('corner'))),
                'the name': (name_ok, dict(got_as, want=ex.get('corner'), address=lead.get('address'))),
                'the bands': (bands_ok, {'ties': [x['kind'] for x in ties]}),
                'the words': (words_ok, {'broken': broken, 'slots': slots[:8]}),
                'the form': (form_ok, form),
                "the corners' words in their boxes": in_boxes}
    head_words = ' '.join(t(ctx, k) for k in LIST_HEAD_IDS)
    shoot('read', read_check)

    # ---- `read`, stacked with both corners beside their columns (issue #687): pane B's corner led by its title, no kind's
    # slot, every word of it inside its box; pane B named by its title's own element, then its address — the name the AX tree
    # computes there the one it computed at both widths `read` was shot at ---------------------------------------------------------
    was = ctx.resize(*STACKED_BESIDE)
    try:
        ctx.settle(10); ctx.frames(3)
        fit3, lead3 = ctx.js('window.__skep.scene.fit()') or {}, ctx.js(PAST_LEAD) or {}
        boxes3, as3 = corner_fit(ctx, '#sceneB > .corner'), named_as(ctx, '#sceneB') or {}
        boxes_a3 = corner_fit(ctx, '#sceneA > .corner')
        kept_a3 = ctx.js('''(() => { const c = document.querySelector("#sceneA > .corner"), l = c && c.querySelector(".kept-line"), w = l && l.querySelector(".kept-word"), a = l && l.querySelector("button[data-history]");
          if (!w || !a) return null; const q = w.getBoundingClientRect(), k = a.getBoundingClientRect(); return {head: c.classList.contains("head"), below: k.top >= q.bottom - 0.5}; })()''')
    finally:
        ctx.resize(*was); ctx.settle(10); ctx.frames(3)
    named3 = heard(ctx, (lists or {}).get('corner') or '')
    r.check(fit3.get('stacked') is True and fit3.get('corner') in ('whole', 'compact') and not lead3.get('head') and lead3.get('leads') and not lead3.get('kind')
            and lead3.get('words') == (lists or {}).get('corner') and lead3.get('name') == named3 and lead3.get('labelled') == 'sceneB-title sceneB-name'
            and bool(boxes3.get('read')) and not boxes3.get('over'),
            "B3-S7 · read at %d px: the panes stacked, both corners beside their columns — pane B's led by its title, the past line, no kind's slot, every word inside its box (issue #687; FP-26, FP-39)" % STACKED_BESIDE[0],
            {'fit': fit3, 'lead': lead3, 'boxes': boxes3, 'want': named3})
    figures.setdefault('corner_fit', {})["read, pane A, at %d px" % STACKED_BESIDE[0]] = {'worst_px': boxes_a3.get('worst'), 'read': len(boxes_a3.get('read') or []), 'corners': boxes_a3.get('corners')}
    r.check(fit3.get('corner') in ('whole', 'compact') and bool(kept_a3) and not kept_a3['head'] and kept_a3['below'] and bool(boxes_a3.get('read')) and not boxes_a3.get('over'),
            "B3-S7 · read at %d px: the panes stacked, pane A's corner — the current text, the draft's editor — beside its column, its kept line's second act on a row of its own beneath the kept word, every word of the corner inside its content box at the page's spacing and the reader's (issue #694; FP-26, FP-31)" % STACKED_BESIDE[0],
            {'fit': fit3, 'kept': kept_a3, 'boxes': boxes_a3})
    same = [(pane_names.get(w) or {}).get('name') for w in (WIDE[0], NARROW[0])] + [as3.get('name')]
    # pane B's name and description as the AX tree computed them at each width read, keyed by the width as words
    names = {str(w): got for w, got in list(pane_names.items()) + [(STACKED_BESIDE[0], as3)]}
    r.check(bool(same[0]) and same[0] == '%s %s' % (named3, lead3.get('address')) and len(set(same)) == 1,
            "B3-S7 · read: pane B's name as the AX tree computes it — its title, then its address — the same at %d, %d and %d px, side by side at its head, stacked at its head and stacked beside its column: a resize changes how its corner is drawn, never its name (issue #687; FP-26)" % (WIDE[0], NARROW[0], STACKED_BESIDE[0]),
            {'names': names, 'want': '%s %s' % (named3, lead3.get('address'))})
    r.figures['history_read_names'] = names

    # ---- `read`, the list's column's edge: one px either side of the window at which, beside the list, the panes keep HEAD_CH
    # characters a line — the list in its column, then after pane B's text, the panes side by side with their corners at their
    # heads at both; the case's own arithmetic, by the page's measured advance and the column as laid out ----------------------------
    was = ctx.resize(*WIDE)
    flips, edge = {}, {}
    try:
        ctx.settle(10); ctx.frames(3)
        g = ctx.js(LIST_COLUMN % json.dumps(head_words)) or {}
        advance = ctx.js('(async () => (await import("./plane/layout.js")).CHAR_W)()') or 0
        if g and advance:
            frame = WIDE[0] - g['scene']['width']
            at = 2 * ((HEAD_CH * advance + EDGE_EM) * READING_PX + g['a']['pad']) + SIDE_GAP_PX + g['width'] + frame
            edge = {'threshold_px': round(at, 2), 'wider_px': math.ceil(at + 1e-6), 'narrower_px': math.floor(at - 1e-6), 'advance': advance, 'column_px': g['width'], 'frame_px': frame, 'pad_px': g['a']['pad']}
            for w in (edge['wider_px'], edge['narrower_px']):
                ctx.resize(w, WIDE[1]); ctx.settle(10); ctx.frames(3)
                fit, L = ctx.js('window.__skep.scene.fit()') or {}, ctx.js(PAST_LIST) or {}
                flips[w] = {x: fit.get(x) for x in ('outer', 'corner', 'stacked', 'cpl')}
                flips[w].update(beside=L.get('beside'), after=L.get('after'))
    finally:
        ctx.resize(*was); ctx.frames(3)
    side = lambda f, beside: bool(f) and f['corner'] == 'head' and f['stacked'] is False and ((f['outer'] or 0) > 0) == beside and f['beside'] is beside and bool(f['after']) is not beside
    wider, narrower = flips.get(edge.get('wider_px')), flips.get(edge.get('narrower_px'))
    r.check(side(wider, True) and (wider['cpl'] or 0) >= HEAD_CH and side(narrower, False),
            f"B3-S7 · read: one px either side of the window at which, beside the list's column, the panes keep {HEAD_CH} characters a line — the list in its column at pane B's outer side, then after pane B's text — the panes side by side with both corners at their documents' heads at both (skep-frontend #668)",
            {'edge': edge, 'flips': flips})
    r.figures['history_list_edge'] = dict(edge, flips={str(k): v for k, v in flips.items()})
    close_scene()

    # ---- `reclaimed`: the state before the newest change refused as reclaimed by an `op` arm, then the act — first naming no
    # floor (skep-frontend #688), then naming its floor (#700). The arm answers the page's next `op`, the history pane's first
    # state read, at the row below the top row. Naming no floor: where the board wrote between the two rows, the page asks
    # that state again at the position before the newest change, where it stood last — read there, else at the committed
    # position the board names below it where that lies inside a commit, past the position asked — and shows it as asked;
    # where no position stands between the rows, or the board names the position asked, the state stood there alone: never
    # asked there again, the newest kept state stands in its place under the line — the draft as the board holds it, read as
    # the plane reads it, no state read at or past the newest change. Naming its floor, the top row's first position: the
    # state is asked no more, the newest kept state stands in its place, and the line names the date of the feed's row at
    # that floor, which the page reads as one row of `changes`. The board's real history answers every read after the arm
    recentre(); ctx.settle(10); ctx.frames(2); quiet()
    seq_r, calls_r = ctx.editor_seq(), ctx.js('window.__skep.bridge.calls().length') or 0
    armed_r = ctx.arm('op', refusal={'kind': 'refused', 'name': 'history_reclaimed', 'status': 410, 'code': 'history_reclaimed', 'detail': None, 'op': 'retrieve_doc_v_span_set', 'site': {}, 'body': {'error': 'history_reclaimed'}})
    clicked_r = ctx.js('((s) => { const b = document.querySelector(s); if (b) b.click(); return !!b; })(%s)' % json.dumps(act_sel))
    opened_r = clicked_r and wait_for(ctx, '(() => { const p = window.__skep.scene.past(); return window.__skep.scene.isOpen() && !!p && p.draft === %s; })()' % json.dumps(mine), 30)
    ctx.settle(20); ctx.frames(3)
    taken_r = ctx.consumed('op', seq_r)
    states_r = ctx.js(STATE_READS % calls_r) or []
    P_r = ctx.js('window.__skep.scene.past()') or {}
    rows_r = [row for d in P_r.get('days') or [] for row in d['rows']]
    top_r, below_r = (rows_r[0] if rows_r else {}), (rows_r[1] if len(rows_r) > 1 else {})
    asked_r, next_r = below_r.get('last'), top_r.get('first')
    gap_r = bool(top_r) and bool(below_r) and next_r - 1 > asked_r
    words_r = ctx.js('''(async () => { const T = await import("./strings.js"), U = await import("./util.js"), p = (await import("./scene/scene.js")).past(), top = p && p.days.flatMap((d) => d.rows)[0];
      return top ? T.t("B3.history.reclaimed", {board: T.t("L.mirror.board.name", {node: "1", origin: window.__skep.model.board().origin}), time: top.time == null ? T.t("L.history.floor.untimed") : U.timeOf(top.time)}) : null; })()''')
    after_r = states_r[1:]

    def follows(reads):
        """every read the board refused as lying inside a commit, naming the committed position below it: the page's next read
        made there where that lies past the position asked, and never there where it does not"""
        for i, x in enumerate(reads):
            if x.get('refused') == 'not_a_position' and x.get('nearest') is not None:
                nxt = reads[i + 1]['at'] if i + 1 < len(reads) else None
                if (nxt == x['nearest']) != (x['nearest'] > asked_r):
                    return False
        return True
    # the state asked read where it stood last: a read between the two rows the board answered — the page then reads no more
    landed_r = bool(top_r) and bool(below_r) and any(asked_r < x['at'] < next_r and x['outcome'] == 'result' for x in after_r)
    # the armed read at the row below the top refused as reclaimed; never asked again there, nor below it, nor at or past the
    # newest change; where the state stood past it, asked again first at the position before the newest change; the board's
    # named positions followed past the one asked alone; the last read answered where the state stood where it was asked
    # again, else none — the newest kept state in its place read from no history (#700)
    reads_ok = (bool(top_r) and bool(below_r) and len(states_r) >= 1
                and (states_r[0]['at'], states_r[0]['outcome'], states_r[0]['refused']) == (asked_r, 'refused', 'history_reclaimed')
                and all(asked_r < x['at'] < next_r for x in after_r)
                and (not gap_r or (bool(after_r) and after_r[0]['at'] == next_r - 1))
                and follows(after_r)
                and (after_r[-1]['outcome'] == 'result' if landed_r else all(x['outcome'] == 'refused' for x in after_r)))
    r.check((armed_r.get('result') or {}).get('armed') == 'op' and opened_r and taken_r and len(rows_r) >= 2 and reads_ok,
            "B3-S7 · reclaimed: `op` armed, once the page is quiet, to refuse the state before the newest change as reclaimed, naming no floor — the arm taken by that read, never asked there again; the state asked again where it stood last, past that position, else the newest kept state in its place, the draft as the board holds it, no state read at or past the newest change; the scene opening",
            {'armed': armed_r, 'opened': opened_r, 'consumed': taken_r, 'reads': states_r[:5], 'gap': gap_r, 'landed': landed_r, 'rows': [(x['first'], x['last']) for x in rows_r[:3]]})
    r.figures['history_reclaimed'] = {'reads': states_r[:5], 'gap': gap_r, 'landed': landed_r, 'rows': [(x['first'], x['last']) for x in rows_r[:3]]}
    # the scene the refusal naming no floor opened: the state asked where it landed, else the newest kept state under the line
    # naming the board and the time that state stood, the floor mark below its row saying the same
    P_a, seen_a = ctx.js('window.__skep.scene.past()') or {}, ctx.js(RECLAIMED_SEEN) or {}
    if landed_r:
        ok_a = (P_a.get('at') == below_r.get('last') and P_a.get('why') is None and seen_a.get('why') is None and seen_a.get('floor') is None
                and flat(pane_text('b')) == flat(text1))
    else:
        why_a = P_a.get('why') or {}
        ok_a = (P_a.get('at') == top_r.get('last') and why_a.get('id') == 'B3.history.reclaimed' and why_a.get('text') == words_r and P_a.get('running') is False
                and seen_a.get('why') == {'words': words_r, 'id': 'B3.history.reclaimed', 'busy': None} and seen_a.get('floor') == {'words': words_r, 'after': top_r.get('last')}
                and flat(pane_text('b')) == flat(text2))
    r.check(ok_a and no_token_in(seen_a),
            "B3-S7 · reclaimed, naming no floor: the state asked where it stood last, shown as asked, no line and no floor mark; else the newest kept state — the draft as the board holds it — in its place, pane B's corner and the list's floor mark below its row saying the board keeps the draft's history back to the time that state stood (B3.history.reclaimed), no token in pane B's corner (skep-frontend #688, #700)",
            {'at': P_a.get('at'), 'why': P_a.get('why'), 'seen': seen_a, 'want': words_r, 'landed': landed_r, 'b': pane_text('b')[-40:]})
    close_scene()

    # naming its floor, the top row's first position (#700): the state asked once and no more, the feed's row at the floor read
    # as one row of `changes` past the position before it, under the page's session, and its date the line's
    recentre(); ctx.settle(10); ctx.frames(2); quiet()
    floor_fl = top_r.get('first')
    seq_fl, calls_fl = ctx.editor_seq(), ctx.js('window.__skep.bridge.calls().length') or 0
    armed_fl = ctx.arm('op', refusal={'kind': 'refused', 'name': 'history_reclaimed', 'status': 410, 'code': 'history_reclaimed', 'detail': None, 'op': 'retrieve_doc_v_span_set', 'site': {}, 'body': {'error': 'history_reclaimed', 'floor': floor_fl}})
    clicked_fl = ctx.js('((s) => { const b = document.querySelector(s); if (b) b.click(); return !!b; })(%s)' % json.dumps(act_sel))
    opened_fl = clicked_fl and wait_for(ctx, '(() => { const p = window.__skep.scene.past(); return window.__skep.scene.isOpen() && !!p && p.draft === %s; })()' % json.dumps(mine), 30)
    ctx.settle(20); ctx.frames(3)
    taken_fl = ctx.consumed('op', seq_fl)
    states_fl = ctx.js(STATE_READS % calls_fl) or []
    # the page's reads of one row of the feed: each one's `since`, how it was answered, and the first row it answered
    rows_at_fl = ctx.js('''((from) => window.__skep.bridge.calls().slice(from).filter((c) => c.name === "changes")
      .map((c) => { let a = null, o = null; try { a = JSON.parse(c.args || "null"); o = JSON.parse(c.answer || "null"); } catch (e) { a = null; }
        const u = o && o.result && Array.isArray(o.result.entries) ? o.result.entries[0] : null;
        return a && a.limit === 1 ? {since: a.since, session: !!a.session, outcome: c.outcome, position: u ? u.position : null, time: u && typeof u.time === "number" ? u.time : null} : null; })
      .filter((x) => x))(%d)''' % calls_fl) or []
    row_fl = rows_at_fl[0] if rows_at_fl else {}
    want_fl = ctx.js('''((time) => (async () => { const T = await import("./strings.js"), U = await import("./util.js");
      const date = time == null ? T.t("L.history.floor.untimed") : U.dayOf(time);
      return {date, words: T.t("L.history.floor", {board: T.t("L.mirror.board.name", {node: "1", origin: window.__skep.model.board().origin}), date})}; })())(%s)''' % json.dumps(row_fl.get('time'))) or {}
    words_fl = want_fl.get('words')
    reads_fl = (len(states_fl) == 1 and (states_fl[0]['at'], states_fl[0]['outcome'], states_fl[0]['refused']) == (asked_r, 'refused', 'history_reclaimed')
               and len(rows_at_fl) == 1 and row_fl.get('since') == (floor_fl or 0) - 1 and row_fl.get('session') and row_fl.get('outcome') == 'result' and row_fl.get('position') == floor_fl)
    r.check((armed_fl.get('result') or {}).get('armed') == 'op' and opened_fl and taken_fl and floor_fl is not None and reads_fl,
            "B3-S7 · reclaimed, naming its floor: `op` armed, once the page is quiet, to refuse the state before the newest change as reclaimed, naming as its floor the top row's first position — the arm taken by that read, the state asked no more and no state read at or past the newest change; the feed's row at the floor read as one row of `changes` past the position before it, under the page's session; the scene opening (skep-frontend #700)",
            {'armed': armed_fl, 'opened': opened_fl, 'consumed': taken_fl, 'floor': floor_fl, 'reads': states_fl[:5], 'rows_at': rows_at_fl[:3]})
    r.figures['history_floor'] = {'floor': floor_fl, 'reads': states_fl[:5], 'rows_at': rows_at_fl[:3]}

    def reclaimed_check(w):
        P, seen = ctx.js('window.__skep.scene.past()') or {}, ctx.js(RECLAIMED_SEEN) or {}
        why = P.get('why') or {}
        ok = (P.get('at') == top_r.get('last') and why.get('id') == 'L.history.floor' and why.get('text') == words_fl and P.get('floor') == want_fl.get('date') and P.get('running') is False
              and seen.get('why') == {'words': words_fl, 'id': 'L.history.floor', 'busy': None} and seen.get('floor') == {'words': words_fl, 'after': top_r.get('last')}
              and flat(pane_text('b')) == flat(text2))
        return {'the newest kept state, the line and the floor mark naming the board and the date of the row at its floor': (ok, {'at': P.get('at'), 'why': P.get('why'), 'floor': P.get('floor'), 'seen': seen, 'want': want_fl, 'b': pane_text('b')[-40:], 'rows': [(x['first'], x['last']) for x in rows_r[:3]]}),
                "no token in pane B's corner": (no_token_in(seen), {'corner': (seen.get('corner') or '')[:200]}),
                "the corners' words in their boxes": fit_part(ctx, figures, 'reclaimed', w, *pane_corners)}
    shoot('reclaimed', reclaimed_check)
    close_scene()

    # ---- `now`: the history's one row the draft's newest, its state how the draft stands now, its corner saying so (issue #678) -------
    # the arm answers the history read's first window (M-PUMP's `historyOf`), which holds every row of the draft the case minted
    # where they all stand within OWN_WINDOW of the page's place on the feed: the windows read after it then find none of the
    # draft's rows at or below where they end
    quiet()
    newest = max(real, key=lambda u: u['position']) if real else None
    window = ctx.js('(async () => { const P = await import("./model/pump.js"), R = await import("./model/records.js"); return {own: P.OWN_WINDOW, at: R.feedAt()}; })()') or {}
    within = bool(real) and window.get('at') is not None and window['at'] - p0 < (window.get('own') or 0)
    seq = ctx.editor_seq()
    armed_now = ctx.arm('changes', answer={'entries': [newest] if newest else [], 'next': head, 'head': head})
    opened_now = open_by_act()
    taken_now = ctx.consumed('changes', seq)
    r.check(bool(newest) and within and (armed_now.get('result') or {}).get('armed') == 'changes' and opened_now and taken_now,
            "B3-S7 · now: `changes` armed, once the page is quiet, with the draft's newest row alone, every row of the draft standing within the history read's first window — the arm taken by that read, the act opening the draft's history",
            {'newest': newest and {k: newest.get(k) for k in ('position', 'op')}, 'first_row': p0, 'window': window, 'head': head, 'armed': armed_now, 'opened': opened_now, 'consumed': taken_now})
    now_words = t(ctx, 'B3.history.now')

    def now_check(w):
        P = ctx.js('window.__skep.scene.past()') or {}
        rows = [row for dd in P.get('days') or [] for row in dd['rows']]
        state_ok = (ctx.js('window.__skep.scene.isOpen()') and P.get('draft') == mine and len(rows) == 1 and P.get('at') == rows[0]['last']
                    and (P.get('why') or {}).get('id') == 'B3.history.now' and flat(pane_text('b')) == flat(text2))
        why = ctx.js(WHY_LINE) or {}
        line_ok = (why.get('words') == now_words and why.get('id') == 'B3.history.now' and why.get('slot') and why.get('oneRow') and why.get('lines') == 1
                   and why.get('past') is not None and why['past'] <= 1)
        # pane B named by its title's own element, then its address, and described by the line saying the state is how the
        # draft stands now, each as the AX tree computes it (issue #687)
        lead, got_as = ctx.js(PAST_LEAD) or {}, named_as(ctx, '#sceneB') or {}
        named_ok = (lead.get('leads') and not lead.get('kind') and lead.get('labelled') == 'sceneB-title sceneB-name'
                    and got_as.get('name') == '%s %s' % (heard(ctx, lead.get('words') or ''), lead.get('address')) and got_as.get('description') == heard(ctx, now_words))
        return {'the state': (state_ok, {'at': P.get('at'), 'rows': [(x['first'], x['last'], x['kind']) for x in rows[:3]], 'why': P.get('why'), 'b': pane_text('b')[-40:], 'want_b': text2[-40:]}),
                'its corner\'s line': (line_ok, dict(why, want=now_words)),
                'its name and description': (named_ok, dict(got_as, lead=lead, want_description=now_words)),
                "the corners' words in their boxes": fit_part(ctx, figures, 'now', w, *pane_corners)}
    shoot('now', now_check)
    close_scene()

    # ---- `now-moved`: a row arriving above the state shown while the history stands (skep-frontend #697) ----------------------
    # `changes` armed with one row of the draft's own alone — the newest standing in another minute than its newest change — so
    # the history opens on that row's state as how the draft stands now; then the newest change handed in as the feed hands a
    # row: a real row, at a position the page's place on the feed has passed, so that place stands where the board's does,
    # carrying the page's session as the feed's drafts rows do. Each width opens the history afresh, the row handed in again
    newest_minute = newest['time'] // 60000 if newest and isinstance(newest.get('time'), int) else None
    moved_from = next((u for u in sorted(real, key=lambda u: u['position'], reverse=True)
                       if newest_minute is not None and isinstance(u.get('time'), int) and u['time'] // 60000 != newest_minute), None)
    handed = dict(newest, session=sid) if newest else None

    def now_moved_check(w):
        close_scene(); quiet()
        seq_m = ctx.editor_seq()
        armed_m = ctx.arm('changes', answer={'entries': [moved_from] if moved_from else [], 'next': head, 'head': head})
        opened_m = open_by_act()
        taken_m = ctx.consumed('changes', seq_m)
        P0, why0, as0 = ctx.js('window.__skep.scene.past()') or {}, ctx.js(WHY_LINE) or {}, named_as(ctx, '#sceneB') or {}
        rows0 = [row['last'] for dd in P0.get('days') or [] for row in dd['rows']]
        L0, b_text0, first0 = ctx.js(PAST_LIST) or {}, pane_text('b'), ctx.js(PANE_FIRST)
        folded0 = {d['key']: d['folded'] for d in L0.get('days') or []}
        # the history on the armed row's state, how the draft stands now: its line, its corner's words and its description say so
        now_ok = (bool(moved_from) and bool(handed) and (armed_m.get('result') or {}).get('armed') == 'changes' and opened_m and taken_m
                  and rows0[:1] == [moved_from['position']] and P0.get('at') == moved_from['position'] and (P0.get('why') or {}).get('id') == 'B3.history.now'
                  and why0.get('words') == now_words and why0.get('id') == 'B3.history.now' and as0.get('description') == heard(ctx, now_words) and first0 is not None)
        # the row handed in and pane B read in the one call: the line gone from the corner and the description together
        got = (ctx.js(MOVED_IN % json.dumps(handed)) or {}) if now_ok else {}
        at_once = (bool(got) and got.get('description') is None and got.get('why') is False and got.get('past') is None
                   and (got.get('rows') or [])[:1] == [handed['position']] and moved_from['position'] in (got.get('rows') or []))
        ctx.settle(15); ctx.frames(3)
        P1, as1, L1 = ctx.js('window.__skep.scene.past()') or {}, named_as(ctx, '#sceneB'), ctx.js(PAST_LIST) or {}
        rows1 = [row['last'] for dd in P1.get('days') or [] for row in dd['rows']]
        shown1 = [x['last'] for d in L1.get('days') or [] for x in d['lines'] if x['shown'] and not x['who']]
        folded1 = {d['key']: d['folded'] for d in L1.get('days') or []}
        b_text1, first1 = pane_text('b'), ctx.js(PANE_FIRST)
        after_ok = (now_ok and bool(ctx.js('window.__skep.scene.isOpen()')) and P1.get('why') is None and ctx.js(WHY_LINE) is None and bool(as1) and as1.get('description') is None
                    and P1.get('at') == P0.get('at') and rows1[:1] == [handed['position']] and P0.get('at') in rows1 and shown1 == [P0.get('at')]
                    and b_text1 == b_text0 and first1 == first0
                    and all(folded1.get(k) == v for k, v in folded0.items()) and all(v for k, v in folded1.items() if k not in folded0))
        return {'the state shown, how the draft stands now': (now_ok, {'moved_from': moved_from and {k: moved_from.get(k) for k in ('position', 'op', 'time')}, 'newest': handed and {k: handed.get(k) for k in ('position', 'op', 'time')},
                                                                       'armed': armed_m, 'opened': opened_m, 'consumed': taken_m, 'rows': rows0[:4], 'at': P0.get('at'), 'why': P0.get('why'), 'line': why0, 'named': as0, 'first': first0}),
                'the row taken in: the line gone from the corner and the description at once': (at_once, dict(got, want_row=handed and handed['position'])),
                'once the page settles': (after_ok, {'at': P1.get('at'), 'why': P1.get('why'), 'line': ctx.js(WHY_LINE), 'named': as1, 'rows': rows1[:4], 'shown': shown1,
                                                     'text_kept': b_text1 == b_text0, 'first': [first0, first1], 'folded': [folded0, folded1]}),
                "the corners' words in their boxes": fit_part(ctx, figures, 'now-moved', w, *pane_corners)}
    shoot('now-moved', now_moved_check)
    close_scene()

    # ---- `not-last`: the state shown sharing its minute with a newer row (skep-frontend #696) -----------------------------------
    # `changes` armed with the draft's own rows up to the line typed before the newest change — the row below the top — and
    # above them, at the position the newest change's row began at, a signed hand's row in that line's minute: the history opens
    # on the earlier line's state, a newer row of its minute standing. Each width opens the history afresh
    top1 = rows1[0] if rows1 else {}
    upto = [u for u in real if below1.get('last') is not None and u['position'] <= below1['last']]
    signed_n = ({'position': top1['first'], 'at': top1['first'], 'op': 'insert', 'docs': [mine], 'class': 'drafts', 'attest': {'alg': 'mldsa65-ed25519', 'sig': 'ef'}, 'time': below1['time']}
                if top1.get('first') and isinstance(below1.get('time'), int) else None)

    def not_last_check(w):
        close_scene(); quiet()
        seq_n = ctx.editor_seq()
        armed_n = ctx.arm('changes', answer={'entries': upto + ([signed_n] if signed_n else []), 'next': head, 'head': head})
        opened_n = open_by_act()
        taken_n = ctx.consumed('changes', seq_n)
        told = opened_n and wait_for(ctx, '(() => { const p = window.__skep.scene.past(); return !!p && !!p.notLast && p.notLast.n != null; })()', 15)
        ctx.frames(3)
        P = ctx.js('window.__skep.scene.past()') or {}
        rows = [row for dd in P.get('days') or [] for row in dd['rows']]
        shown_row = next((x for x in rows if P.get('at') in x['positions']), {})
        minute = shown_row['time'] // 60000 if isinstance(shown_row.get('time'), int) else None
        n_want = sum(1 for x in rows if isinstance(x.get('time'), int) and x['time'] // 60000 == minute)
        words = t(ctx, 'B3.history.not-last', {'n': n_want})
        seen, lead, got_as = ctx.js(NOT_LAST_SEEN) or {}, ctx.js(PAST_LEAD) or {}, named_as(ctx, '#sceneB') or {}
        state_ok = (bool(signed_n) and (armed_n.get('result') or {}).get('armed') == 'changes' and opened_n and taken_n and told and P.get('at') == below1.get('last')
                    and n_want >= 2 and (P.get('notLast') or {}).get('n') == n_want and P.get('why') is None and flat(pane_text('b')) == flat(text1))
        corner_ok = (seen.get('words') == words and seen.get('id') == 'B3.history.not-last' and seen.get('count') == str(n_want) and seen.get('pending') is False
                     and seen.get('after_title') and seen.get('before_chip') and not seen.get('more') and not seen.get('now') and (seen.get('held') or not seen.get('head')))
        named_ok = (lead.get('labelled') == 'sceneB-title sceneB-name' and got_as.get('name') == '%s %s' % (heard(ctx, lead.get('words') or ''), lead.get('address'))
                    and got_as.get('description') == heard(ctx, words))
        return {'the state shown, not its minute\'s last': (state_ok, {'signed': signed_n, 'armed': armed_n, 'opened': opened_n, 'consumed': taken_n, 'told': told, 'at': P.get('at'), 'want_at': below1.get('last'),
                                                                     'not_last': P.get('notLast'), 'n_want': n_want, 'why': P.get('why'), 'rows': [(x['first'], x['last'], x['hand']['kind']) for x in rows[:4]]}),
                'its corner\'s clause': (corner_ok, dict(seen, want=words, n_want=n_want)),
                'its name and description': (named_ok, dict(got_as, lead=lead, want_description=words)),
                "the corners' words in their boxes": fit_part(ctx, figures, 'not-last', w, *pane_corners)}
    shoot('not-last', not_last_check)
    close_scene()

    # ---- `in-flight`: the state asked read again while the board is busy on it (skep-frontend #696, #702) ------------------------
    # `op` armed, once the page is quiet, to refuse the read of the state before the newest change as `scan_busy`, which the board
    # classes as retry and the history read takes no second attempt at: the newest kept state stands in its place while the scene
    # reissues the state asked, which the board then answers, the line saying the draft's history is busy whatever the refusal's
    # name. The clause is read in the frame it first stands, by an observer the act's click is made under, and again once the
    # asked state lands. Each width opens the history afresh
    def in_flight_check(w):
        close_scene(); recentre(); ctx.settle(10); ctx.frames(2); quiet()
        seq_f = ctx.editor_seq()
        armed_f = ctx.arm('op', refusal={'kind': 'refused', 'name': 'scan_busy', 'status': 503, 'code': 'scan_busy', 'detail': None, 'op': 'retrieve_doc_v_span_set', 'site': {}, 'body': {'error': 'scan_busy'}})
        seen = ctx.js(IN_FLIGHT_SEEN % json.dumps(act_sel), timeout=60) or {}
        landed_f = wait_for(ctx, '(() => { const p = window.__skep.scene.past(); return !!p && p.running === false && p.at === p.asked; })()', 20)
        ctx.settle(10); ctx.frames(3)
        taken_f = ctx.consumed('op', seq_f)
        want = ctx.js('''(async () => { const T = await import("./strings.js"), p = window.__skep.scene.past(); if (!p) return null;
          const asked = p.days.flatMap((d) => d.rows).find((r) => r.positions.includes(p.asked));
          return {clause: asked ? T.t("B3.history.in-flight", {time: asked.time == null ? T.t("L.history.floor.untimed") : T.stoodAt(asked.time)}) : null, busy: T.t("B3.history.busy")}; })()''') or {}
        clause, busy = want.get('clause'), want.get('busy')
        # the line names pane B after its title; the clause alone describes it
        described = heard(ctx, clause) if clause else None
        after = ctx.js('''(() => { const c = document.querySelector("#sceneB > .corner"), pane = document.getElementById("sceneB"), l = document.getElementById("scenepast");
          return {inflight: !!c && !!c.querySelector(".inflight"), busy: !!c && !!c.querySelector("[aria-busy]"), description: pane ? pane.getAttribute("aria-description") : null, reading: !!l && !!l.querySelector(".pl-reading")}; })()''') or {}
        past0 = seen.get('past') or {}
        state_ok = ((armed_f.get('result') or {}).get('armed') == 'op' and seen.get('clicked') and not seen.get('timedOut') and taken_f and past0.get('met') == 'scan_busy' and past0.get('running') is True
                    and past0.get('at') != past0.get('asked') and bool(clause) and past0.get('inFlight') and clause.endswith(past0['inFlight']))
        clause_ok = (seen.get('words') == clause and seen.get('id') == 'B3.history.in-flight' and seen.get('busy') == 'true' and seen.get('mark') and seen.get('marks') == 1
                     and seen.get('why') == {'words': busy, 'busy': None, 'mark': False} and seen.get('pane_busy') is None and seen.get('after_title') and seen.get('before_chip')
                     and (seen.get('held') or not seen.get('head')) and seen.get('labelled') == 'sceneB-title sceneB-why sceneB-name' and seen.get('description') == described)
        gone_ok = landed_f and after == {'inflight': False, 'busy': False, 'description': None, 'reading': False}
        end = ctx.js('window.__skep.scene.past()') or {}
        return {'the state asked, read again': (state_ok, {'armed': armed_f, 'consumed': taken_f, 'past': past0, 'clause': clause, 'timed_out': seen.get('timedOut')}),
                'its corner\'s in-flight clause': (clause_ok, dict(seen, want=clause, want_why=busy, want_description=described)),
                'the clause gone as the state lands': (gone_ok, dict(after, landed=landed_f, past={k: end.get(k) for k in ('at', 'asked', 'met', 'running', 'inFlight')})),
                "the corners' words in their boxes": fit_part(ctx, figures, 'in-flight', w, *pane_corners)}
    shoot('in-flight', in_flight_check)
    close_scene()

    # ---- `unread`: the state asked refused and not read again, then read again by its act (skep-frontend #702) --------------------
    # `op` armed, once the page is quiet, to refuse the read of the state before the newest change as `internal_panic`, which the
    # board does not class as retry: the newest kept state stands in its place under the line saying the state could not be read
    # as it stood and why, "read it again" beneath it, nothing asking the state again by itself. Each width opens the history
    # afresh; after the shots the act is pressed, the arm spent, and the test board reads the state asked
    def unread_check(w):
        close_scene(); recentre(); ctx.settle(10); ctx.frames(2); quiet()
        seq_u, calls_u = ctx.editor_seq(), ctx.js('window.__skep.bridge.calls().length') or 0
        armed_u = ctx.arm('op', refusal={'kind': 'refused', 'name': 'internal_panic', 'status': 500, 'code': 'internal_panic', 'detail': None, 'op': 'retrieve_doc_v_span_set', 'site': {}, 'body': {'error': 'internal_panic'}})
        clicked_u = ctx.js('((s) => { const b = document.querySelector(s); if (b) b.click(); return !!b; })(%s)' % json.dumps(act_sel))
        opened_u = clicked_u and wait_for(ctx, '(() => { const p = window.__skep.scene.past(); return window.__skep.scene.isOpen() && !!p && p.draft === %s; })()' % json.dumps(mine), 30)
        ctx.settle(20); ctx.frames(3)
        taken_u = ctx.consumed('op', seq_u)
        P = ctx.js('window.__skep.scene.past()') or {}
        rows = [row for dd in P.get('days') or [] for row in dd['rows']]
        # the line as the page's strings make it: the asked row's time as a sentence names a time, the board refusing the read,
        # the refusal's name after it as a field in the identifier's face — and its words heard, the act's and the mark's words
        want = ctx.js('''(async () => { const T = await import("./strings.js"), p = window.__skep.scene.past(); if (!p) return null;
          const asked = p.days.flatMap((d) => d.rows).find((r) => r.positions.includes(p.asked)), board = T.t("L.mirror.board.name", {node: "1", origin: window.__skep.model.board().origin});
          const runs = T.tRuns("L.history.unread", {time: asked && asked.time != null ? T.stoodAt(asked.time) : T.t("L.time.at", {time: T.t("L.history.floor.untimed")}),
            cause: [{text: T.t("L.history.unread.refused", {board}), face: "client"}, {text: T.FIELD, face: "client"}, {text: "internal_panic", face: "ident"}]});
          return {text: T.runsText(runs), heard: T.heard(runs), act: T.t("L.history.read-again"), mark: T.t("L.history.not-read")}; })()''') or {}
        seen, lead, got_as = ctx.js(UNREAD_SEEN) or {}, ctx.js(PAST_LEAD) or {}, named_as(ctx, '#sceneB') or {}
        # a beat past the scene's first reissue pause: nothing asks the state again by itself
        time.sleep(0.6)
        reads_u = ctx.js(STATE_READS % calls_u) or []
        why, act = P.get('why') or {}, seen.get('act') or {}
        state_ok = ((armed_u.get('result') or {}).get('armed') == 'op' and opened_u and taken_u and len(rows) >= 2 and P.get('at') == rows[0]['last'] and P.get('asked') == rows[1]['last']
                    and P.get('met') == 'internal_panic' and P.get('running') is False and why.get('id') == 'L.history.unread' and why.get('text') == want.get('text') and why.get('again') == {'inert': None}
                    and len(reads_u) == 1 and (reads_u[0]['at'], reads_u[0]['outcome'], reads_u[0]['refused']) == (P.get('asked'), 'refused', 'internal_panic') and flat(pane_text('b')) == flat(text2))
        line_ok = (seen.get('why') == {'words': want.get('text'), 'id': 'L.history.unread', 'own': 'sceneB-why', 'code': 'internal_panic'} and 'written' not in (seen.get('corner') or '') and no_token_in(seen)
                   and act.get('words') == want.get('act') and act.get('inert') is None and bool(act.get('width')) and act.get('after') and act.get('toolbar')
                   and seen.get('mark') == {'words': want.get('mark'), 'id': 'L.history.not-read', 'row': P.get('asked')})
        named_ok = (seen.get('labelled') == 'sceneB-title sceneB-why sceneB-name' and not seen.get('description')
                    and got_as.get('name') == '%s %s %s' % (heard(ctx, lead.get('words') or ''), want.get('heard'), lead.get('address')) and not got_as.get('description'))
        return {'the newest kept state in the place of the one asked, not read again': (state_ok, {'armed': armed_u, 'opened': opened_u, 'consumed': taken_u, 'reads': reads_u[:4], 'at': P.get('at'), 'asked': P.get('asked'), 'met': P.get('met'),
                                                                                                 'running': P.get('running'), 'why': why, 'want': want.get('text'), 'rows': [(x['first'], x['last']) for x in rows[:3]], 'b': pane_text('b')[-40:]}),
                'its line, its act and the asked row\'s mark': (line_ok, dict(seen, want=want)),
                'its name and description': (named_ok, dict(got_as, lead=lead, labelled=seen.get('labelled'), want_heard=want.get('heard'))),
                "the corners' words in their boxes": fit_part(ctx, figures, 'unread', w, *pane_corners)}
    if shoot('unread', unread_check):
        # the act pressed, the arm spent: the state asked asked again as a return asks it, at the row it ends at, and the test
        # board reading it — pane B set to it, the line, the act and the mark gone, pane B named by its title and its address
        calls_p = ctx.js('window.__skep.bridge.calls().length') or 0
        pressed = ctx.js('(() => { const b = document.querySelector("#sceneB > .corner button[data-again]"); if (b) b.click(); return !!b; })()')
        landed_p = bool(pressed) and wait_for(ctx, '(() => { const p = window.__skep.scene.past(); return !!p && p.at === p.asked && !p.why; })()', 20)
        ctx.settle(10); ctx.frames(3)
        reads_p, P_p, seen_p = ctx.js(STATE_READS % calls_p) or [], ctx.js('window.__skep.scene.past()') or {}, ctx.js(UNREAD_SEEN) or {}
        r.check(landed_p and bool(reads_p) and reads_p[0]['at'] == P_p.get('asked') and reads_p[-1]['outcome'] == 'result' and seen_p.get('why') is None and seen_p.get('act') is None
                and seen_p.get('mark') is None and seen_p.get('labelled') == 'sceneB-title sceneB-name' and flat(pane_text('b')) == flat(text1),
                "B3-S7 · unread: \"read it again\" pressed, the arm spent — the state asked asked again at the row it ends at and read by the test board: pane B on the state asked, the line, the act and \"not read\" gone, pane B named by its title and its address (skep-frontend #702)",
                {'pressed': pressed, 'landed': landed_p, 'reads': reads_p[:4], 'at': P_p.get('at'), 'asked': P_p.get('asked'), 'why': P_p.get('why'), 'seen': seen_p, 'b': pane_text('b')[-40:]})
    close_scene()

    # ---- `unkept`: a line held, the act opening on the newest kept state, "now — not yet kept" at the top ---------------------------
    # the scene's close gave the focus back to the act it was opened from: a LEAP to the draft gives it to the walk again, and
    # the keys are the caret's
    recentre(); quiet()
    caret_end(first_line())
    k, held_ok, d = hold_typed(' Held.', 'unreachable')
    ctx.js('(async () => (await import("./text/layer.js")).dropCaret())()'); ctx.frames(2)
    opened3 = open_by_act()
    r.check(held_ok and opened3, "B3-S7 · unkept: a line of the case's own draft held, then the act clicked: the history opens", {'held': held_ok, 'detail': d, 'opened': opened3})

    def unkept_check(w):
        P, L = ctx.js('window.__skep.scene.past()') or {}, ctx.js(PAST_LIST) or {}
        rows = [row for dd in P.get('days') or [] for row in dd['rows']]
        ok = (P.get('unkept') is True and L.get('now') == t(ctx, 'L.history.unkept') and bool(rows) and P.get('at') == rows[0]['last']
              and flat(pane_text('b')) == flat(text2) and 'Held.' in pane_text('a') and 'Held.' not in pane_text('b'))
        panes = ctx.js('window.__skep.scene.panes()') or {}
        return {'the state': (ok, {'unkept': P.get('unkept'), 'now': L.get('now'), 'at': P.get('at'), 'top': rows[0]['last'] if rows else None, 'why': P.get('why'), 'a': pane_text('a')[-40:], 'b': pane_text('b')[-40:],
                                   'b_blocks': len((panes.get('b') or {}).get('blocks') or []), 'b_derived': (panes.get('b') or {}).get('derived'), 'want_b': text2[-40:], 'rows': [(x['first'], x['last'], x['kind']) for x in rows[:3]]}),
                "the corners' words in their boxes": fit_part(ctx, figures, 'unkept', w, *pane_corners)}
    shoot('unkept', unkept_check)
    close_scene()
    out, back = drop_all(k)
    r.check(bool(out) and back, "B3-S7 · unkept: the held line dropped, the draft reads \"kept\" again", {'out': out})
    # the rows called no preview and wrote nothing but their own lines
    calls = [c['name'] for c in page_calls(ctx)[calls0:]]
    health1 = ctx.health()
    r.figures['past_rows'] = {'log_position_before': health0.get('log_position'), 'log_position_after': health1.get('log_position'), 'calls': dict(Counter(calls))}
    r.check(not any(c.startswith('history.') for c in calls) and 'changes' in calls, "B3-S7: the history read by `changes`, a reading row; no `history.past` or `history.restore` called", dict(Counter(calls)))


# a reading scene's pane as the person meets it, by its side (`A`, `B`): its text, the carets' marks standing in it, its span
# focus and the spans drawn lit, its scroll, its corner's kept word, and whether the platform's focus stands in its text
PANE_STATE = '''((side) => { const p = document.getElementById("scene" + side), a = p && p.querySelector(":scope > article.dtext"), P = (window.__skep.scene.panes() || {})[side.toLowerCase()] || {};
  const w = p && p.querySelector(".corner .kept-word"), at = document.activeElement;
  return {text: a ? [...a.querySelectorAll(".run > .sp")].map((e) => e.textContent).join("\\n") : null, marks: p ? [...p.querySelectorAll(".caret-mark")].map((m) => (m.classList.contains("kept") ? "kept" : "live")) : [],
          focus: P.focus == null ? null : P.focus, editor: !!P.editor, lit: a ? [...a.querySelectorAll(".run > .sp.lit")].map((e) => Number(e.dataset.pos)) : [], scroll: p ? Math.round(p.scrollTop) : null,
          kept: w ? {word: w.textContent, id: w.dataset.string || null} : null, active: !!p && !!at && (at === p || (p.contains(at) && !at.closest(".corner")))}; })(%s)'''
# a word of a pane's text a person clicks: the first word of three letters or more in the first paragraph standing whole below
# the pane's held head — or the last such paragraph — as a point on screen between its first two letters, with its block
WORD_IN_PANE = '''((side, which) => { const pane = document.getElementById("scene" + side), q0 = pane.getBoundingClientRect(), art = pane.querySelector(":scope > article.dtext");
  const h = pane.querySelector(":scope > .corner.head"), top = Math.max(q0.top, h ? h.getBoundingClientRect().bottom : q0.top) + 2;
  const ps = [...art.querySelectorAll(".run > .sp")].filter((e) => { const q = e.getBoundingClientRect(); return /[A-Za-z]{3}/.test(e.textContent || "") && q.top >= top && q.bottom <= q0.bottom - 4; });
  const e = which === "last" ? ps[ps.length - 1] : ps[0]; if (!e) return null;
  const tn = [...e.childNodes].find((n) => n.nodeType === 3 && /[A-Za-z]{3}/.test(n.data)); if (!tn) return null;
  const i = tn.data.search(/[A-Za-z]{3}/), r = document.createRange(); r.setStart(tn, i + 1); r.setEnd(tn, i + 2); const q = r.getBoundingClientRect();
  return {x: q.left + 0.5, y: q.top + q.height / 2, block: Number(e.dataset.pos), width: (e.textContent || "").length}; })(%s, %s)'''
# a paragraph of a pane's text, `frac` of the way down it, brought by the pane's scroll to stand first in view below what its
# held head and a form opened beneath it cover, as the scene reads that — its top a hair under it — the head read again once the
# frames after each scroll have placed it, until the paragraph stands so; then a point on screen between the first two letters
# of its first word, with its block
SCROLL_TO_WORD = '''(async (side, frac) => { const pane = document.getElementById("scene" + side), art = pane.querySelector(":scope > article.dtext");
  const ps = [...art.querySelectorAll(".run > .sp")].filter((e) => /[A-Za-z]{3}/.test(e.textContent || "")); const e = ps[Math.floor(ps.length * frac)]; if (!e) return null;
  const frames = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  for (let k = 0; k < 6; k++) {
    const h = pane.querySelector(":scope > .corner.head"), o = h ? h.querySelector(":scope > .opened") : null, top0 = pane.getBoundingClientRect().top + pane.clientTop;
    const clear = h ? h.getBoundingClientRect().bottom - top0 + (o ? o.offsetHeight : 0) : 0, d = Math.round(e.getBoundingClientRect().top - top0 - clear) + 2;
    if (!d) break;
    pane.scrollTop += d; await frames();
  }
  const tn = [...e.childNodes].find((n) => n.nodeType === 3 && /[A-Za-z]{3}/.test(n.data)); if (!tn) return null;
  const i = tn.data.search(/[A-Za-z]{3}/), r = document.createRange(); r.setStart(tn, i + 1); r.setEnd(tn, i + 2); const q = r.getBoundingClientRect();
  return {x: q.left + 0.5, y: q.top + q.height / 2, block: Number(e.dataset.pos)}; })(%s, %s)'''
# what a click at a point on screen meets: the element there, whether it is a pane's text, the element it stands in, and the
# held heads' boxes — each head's rows those standing inside its pane's visible box, a row scrolled out at its top clipped there
HIT_AT = '''((x, y) => { const e = document.elementFromPoint(x, y); if (!e) return null; const box = (el) => { const q = el.getBoundingClientRect(); return [Math.round(q.top), Math.round(q.bottom)]; };
  const shown = (r, p) => { const q = r.getBoundingClientRect(), b = p.getBoundingClientRect(), top = b.top + p.clientTop; return q.bottom > top && q.top < top + p.clientHeight; };
  return {tag: e.tagName, cls: String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className), text: !!e.closest("article.dtext") && !e.closest(".corner"), corner: !!e.closest(".corner"), within: (e.closest("[id^=scene]") || {}).id || null,
          heads: [...document.querySelectorAll("#sceneA > .corner.head, #sceneB > .corner.head")].map((h) => ({id: h.id, box: box(h), opened: h.querySelector(":scope > .opened") ? box(h.querySelector(":scope > .opened")) : null, rows: [...h.querySelectorAll(":scope > .hrow")].filter((r) => shown(r, h.parentElement)).map(box)}))}; })(%s, %s)'''
# the paragraphs the pane-close row's draft is lengthened by, so its pane scrolls past its first span
LONG_LINES = ''.join('Line %d of the pane the person scrolls, words to read and to write beside.\n\n' % k for k in range(1, 31))
# a reading scene's pane as a face standing in it is held to, by its side (`A`, `B`), on screen: its visible box — its client
# box — the foot of what its held head and a form opened beneath it cover, null where no head is held, and the boxes of its
# corner standing beside its column and of its corner's foot, each null where none stands
PANE_ROOM = '''((side) => { const p = document.getElementById("scene" + side); if (!p) return null;
  const q = p.getBoundingClientRect(), box = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return {x: r.left, y: r.top, w: r.width, h: r.height}; };
  const h = p.querySelector(":scope > .corner.head"), o = h ? h.querySelector(":scope > .opened") : null;
  return {x: q.left + p.clientLeft, y: q.top + p.clientTop, w: p.clientWidth, h: p.clientHeight, held: h ? h.getBoundingClientRect().bottom + (o ? o.offsetHeight : 0) : null,
          corner: box(p.querySelector(":scope > .corner:not(.head):not(.foot)")), foot: box(p.querySelector(":scope > .corner.foot"))}; })(%s)'''
# the deletion face's layer as it stands over the reading scene: whether it is lifted there (its `scene` class), its z-index
# beside the scene's, whether it follows the scene in the page, and whether the pointer passes through a paste's face in it
OVER_SCENE = '''(() => { const r = document.getElementById("removed"), s = document.getElementById("scene"), f = r.querySelector(".pasted .face"), z = (e) => parseInt(getComputedStyle(e).zIndex, 10) || 0;
  return {lifted: r.classList.contains("scene"), z: [z(r), z(s)], after: !!(s.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING), through: f ? getComputedStyle(f).pointerEvents : null}; })()'''
# a pane scrolled a step down and back `n` times, the page's frame let pass after each, and put back where it stood: the cost of
# each of the page's frames over them, ms (FP-18)
SCROLL_FRAMES = '''(async (side, n, step) => { const p = document.getElementById("scene" + side), s0 = p.scrollTop, t0 = performance.now();
  const frame = () => new Promise((r) => requestAnimationFrame(() => r()));
  for (let i = 0; i < n; i++) { p.scrollTop = s0 + (i %% 2 ? 0 : step); await frame(); }
  p.scrollTop = s0; await frame(); await frame();
  return window.__skep.frames().filter((x) => x.t >= t0).map((x) => x.drawMs); })(%s, %d, %d)'''
# the deletion face's layer as a removal stands in it over the reading scene, at a point on screen — a mark's middle: whether
# the layer is lifted there (its `scene` class), its z-index beside the scene's, whether it follows the scene in the page,
# whether the pointer passes through a removal's face standing whole, the words that face shows by their strings, and
# whether the element a pointer meets at the point is a removal's mark
REMOVAL_OVER = '''((x, y) => { const r = document.getElementById("removed"), s = document.getElementById("scene"), z = (e) => parseInt(getComputedStyle(e).zIndex, 10) || 0;
  const f = r.querySelector(".removal.whole:not(.pasted) .face"), e = document.elementFromPoint(x, y);
  return {lifted: r.classList.contains("scene"), z: [z(r), z(s)], after: !!(s.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING), through: f ? getComputedStyle(f).pointerEvents : null,
          parts: f ? [...f.querySelectorAll(".part")].map((p) => ({id: p.dataset.string, text: p.textContent})) : [], hit: !!e && !!e.closest("#removed button.mark")}; })(%s, %s)'''
# the caret's mark in a reading scene's pane, by its side (`A`, `B`), on screen; null where none stands there
CARET_IN_PANE = '''((side) => { const m = document.querySelector("#scene" + side + " .caret-mark"); if (!m) return null; const q = m.getBoundingClientRect(); return {x: q.left, y: q.top, w: q.width, h: q.height}; })(%s)'''
# the margin's marks a reading scene's pane stands for its draft, by its side (`A`, `B`), beside some words of the draft's text
# shown, as the last margin pass placed them (the gate's `margin`, by the pane each stands in): the words' glyph boxes in the
# pane — read through the pane's article (T-LAYER's `rangeIn`) — their top and foot, the column's sides, whether the pane's
# facing edge is its right; every mark of the draft in the pane, those of a kind standing beside the words — from the top of
# their first line to the foot of their last, past the column's text on the facing side — and the draft's marks standing in
# the other pane; each mark's drawn strokes on its left and its right; the word "held" standing in the pane's edge, its
# string and whether it is hidden from assistive technology; and the top of the room the pane gives its signs — below what
# its held head covers — with the one hold's gap below it; null where the pane holds no article
PANE_MARKS = '''(async (side, doc, pos, width, kind) => {
  const L = await import("./text/layer.js"), R = await import("./plane/register.js"), p = document.getElementById("scene" + side), art = p ? p.querySelector(":scope > article.dtext") : null;
  if (!art) return null;
  const range = width > 0 ? L.rangeIn(art, {addr: doc, pos, width}) : null, words = range ? [...range.getClientRects()].filter((q) => q.width > 0 && q.height > 0) : [];
  const col = art.querySelector(":scope > .run").getBoundingClientRect(), s = side.toLowerCase(), facing = s === "a" || !!(window.__skep.scene.fit() || {}).stacked;
  const all = window.__skep.margin().filter((m) => m.addr === doc), here = all.filter((m) => m.side === s);
  const top = words.length ? Math.min(...words.map((q) => q.top)) : null, foot = words.length ? Math.max(...words.map((q) => q.bottom)) : null;
  const by = top == null ? [] : here.filter((m) => m.kind === kind && !m.point && m.placed.y <= top + 1 && m.placed.y + m.placed.h >= foot - 1 && (facing ? m.placed.x >= col.right - 1 : m.placed.x + m.placed.w <= col.left + 1));
  const strokes = [...p.querySelectorAll(":scope > .margin-mark")].filter((e) => e.style.display !== "none").map((e) => { const c = getComputedStyle(e); return {kind: e.dataset.kind, left: parseFloat(c.borderLeftWidth), right: parseFloat(c.borderRightWidth)}; });
  const w = p.querySelector(':scope > .edge-sign[data-sign="held"]'), wr = w ? w.getBoundingClientRect() : null, wd = w ? w.querySelector("[data-string]") : null;
  const h = p.querySelector(":scope > .corner.head"), o = h ? h.querySelector(":scope > .opened") : null, q = p.getBoundingClientRect();
  const room = h ? h.getBoundingClientRect().bottom + (o ? o.offsetHeight : 0) : q.top + p.clientTop;
  return {words: words.length, top, foot, col: {left: col.left, right: col.right}, facing, marks: here.map((m) => ({kind: m.kind, point: m.point, first: m.first, end: m.end, placed: m.placed, rect: m.rect})),
          beside: by.length, other: all.filter((m) => m.side != null && m.side !== s).length, strokes, room, hold: room + R.HOLD.gap,
          word: w ? {text: w.textContent, id: wd ? wd.dataset.string : null, hidden: w.getAttribute("aria-hidden"), x: wr.left, y: wr.top} : null}; })(%s, %s, %d, %d, %s)'''
# where a face raised just after some words of the draft an editor pane holds leaves their line (SC's `editorLine`), by the
# pane's side (`A`, `B`): the site named by the words' last byte's identity through the pane's article's image; null where
# no line stands for it
EDITOR_LINE_AT = '''(async (side, doc, pos, width) => {
  const L = await import("./text/layer.js"), R = await import("./model/records.js"), S = await import("./scene/scene.js");
  const art = document.querySelector("#scene" + side + " > article.dtext"), made = art ? L.madeOf(art) : null; if (!made) return null;
  const line = S.editorLine(doc, {before: R.identityIn(made.image, pos + width - 1, 1), after: []});
  return line && {side: line.side, from: line.from}; })(%s, %s, %d, %d)'''


def pane_rows(ctx, r, shoot, red, ops_allowed, m):
    """THE EDITOR PANE (skep-frontend #556; B3-S1's scene rule; B3-S13; D5 K-60, K-61, K-63, K-70 … K-77, K-93), on the
    machine's page at the case's own draft (`mine`), each state checked against `strings.js` and shot at both widths — at
    the narrow one the panes stacked. The draft is lengthened first by a paste at its caret through the gate's paste door, so
    its pane scrolls. `pane-typed`: the scene beside the first edition, a word of pane A clicked and keys typed there — the
    caret live in the pane, the words shown as typed and kept by the test board, one `insert` of the shape the plane's typing
    sends, through the page's own port; Mod+Z taking the run back out; a line held there, the pane's corner "not yet kept",
    dropped; the word typed again at a click, every word of the pane's corner then inside the box it stands in (`fit_part`;
    issue #694). `pane-lines`: an edition of the person's own beside, then the draft's history
    opened over its kept caret, each key answered by its pane's own line, the past pane's last. `pane-way-back`: the line's
    ending's act moving the focus onto the kept caret's span, the next key typing there. `pane-close`: Esc, then Esc, the
    close re-taking the pane's caret and the span its view was anchored at, a key typing at it. `pane-source-face`: the
    draft's own words pasted at a word of pane A, `op` armed `withheld` at their `reinstate` — nothing placed, the paste's
    face in pane A over the scene, carried by the pane's scroll, a wheel over it scrolling the pane and never the plane, the
    page's frames while the pane scrolls a figure. `pane-forged-face`: from the first edition's entry, the draft in pane B, a
    forged copy pasted at a word there — its `insert`, and the face in pane B though the walk under the scene stands on the
    edition, gone once the focus goes into pane A. `pane-removal`: Backspace over a kept character at a word of pane A — its
    `delete` — the removal's mark in pane A level with the caret's line, over the scene; pressed with the pointer, its face
    whole in the pane, the focus and the live caret standing there; a wheel over it moving no camera; the pane's scroll
    carrying it, the page's frames while the pane scrolls a figure; Mod+Z taking it back; then the same in pane B, the mark
    clear of pane B's corner, and a removal made on the plane standing in pane A as the scene opens over the draft.
    `pane-refused`: a line held at a word of pane A marking nothing (J5), then a refused run typed there — its bracket in
    pane A beside its words on the pane's facing side, a face raised at them leaving their line past it, carried by the
    pane's scroll, its top held at what the pane's held head covers and gone under it, the page's frames while the pane
    scrolls a figure; then, from the first edition's entry, the same in pane B side by side, the bracket left of the text.
    `pane-held-bars`: a line held moved at a word of pane A — its held bar and "held" once in the pane's edge at its top,
    held at the head and gone under it, both lifted as the line is discarded. Each row is shot in the state its check ends
    in. The rows' writes are their own typing, its undo, the pastes, the removals and the held lines, each taken back or
    dropped; no `history.*` call is made."""
    mine, sid, quiet, recentre, caret_end, press, first_line, hold_typed, drop_all = (m[k] for k in ('mine', 'sid', 'quiet', 'recentre', 'caret_end', 'press', 'first_line', 'hold_typed', 'drop_all'))
    figures = m['figures']
    act_sel = m['corner'] + HISTORY_ACT
    text_of = lambda: ctx.js(SHOWN_TEXT % json.dumps(mine)) or ''
    pane = lambda side: ctx.js(PANE_STATE % json.dumps(side)) or {}
    caret = lambda: ctx.js('window.__skep.caret()')
    edits = lambda: ctx.js('window.__skep.write.edits(%s).length' % json.dumps(mine))
    kept_now = lambda max_s=20: wait_for(ctx, '(() => { const s = window.__skep.write.state(%s); return !!s.kept && s.kept.word === "kept" && window.__skep.write.edits(%s).length === 0; })()' % (json.dumps(mine), json.dumps(mine)), max_s)
    calls0 = len(page_calls(ctx))

    def drop_caret():
        ctx.js('(async () => (await import("./text/layer.js")).dropCaret())()'); ctx.frames(2)

    def close_scene():
        if ctx.js('window.__skep.scene.isOpen()'):
            ctx.js('window.__skep.scene.close()'); ctx.settle(15); ctx.frames(2)

    def beside():
        """the scene opened beside the first edition from the draft's entry, pane A the draft: whether it shows"""
        close_scene(); recentre(); ctx.settle(10); ctx.frames(2)
        ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(mine), json.dumps(DOC)))
        came = wait_for(ctx, 'window.__skep.scene.isOpen() && (window.__skep.scene.pair() || {}).a === %s' % json.dumps(mine), 30)
        ctx.settle(15); ctx.frames(3)
        return came

    def history():
        """the draft's history opened by its corner's act from the draft's entry, its kept caret standing: whether it shows"""
        close_scene(); recentre(); ctx.settle(10); ctx.frames(2)
        clicked = ctx.js('((s) => { const b = document.querySelector(s); if (b) b.click(); return !!b; })(%s)' % json.dumps(act_sel))
        came = clicked and wait_for(ctx, '(() => { const p = window.__skep.scene.past(); return window.__skep.scene.isOpen() && !!p && p.draft === %s; })()' % json.dumps(mine), 30)
        ctx.settle(20); ctx.frames(3)
        return came

    def key_at(sel, key, code=None, then=None):
        """a key pressed with the platform's focus put on the first element a selector names that takes it, as Tab lands
        on the first stop that does — else on the first `then` names that does — the hint taken down before it: where the
        focus stood, the hint it raised (`hint`) and what its ending says"""
        ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
        at = ctx.js('((s, t) => { const all = [...document.querySelectorAll(s), ...(t ? document.querySelectorAll(t) : [])]; for (const e of all) { e.focus({preventScroll: true}); if (document.activeElement === e) return true; } return false; })(%s, %s)' % (json.dumps(sel), json.dumps(then)))
        ctx.frames(1)
        ctx.drv.key(key, code=code); ctx.frames(2)
        h = ctx.js('window.__skep.hint()') or {}
        return {'focused': at, 'id': h.get('id'), 'writing': h.get('writing'), 'seen': hint(ctx)['seen']}

    def inserts():
        """every `insert` frame naming the draft the page sent, in order"""
        out = []
        for c in ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "op").map((c) => c.frame)') or []:
            try:
                f = json.loads(c)
            except (TypeError, ValueError):
                continue
            if isinstance(f, dict) and f.get('op') == 'insert' and f.get('doc') == mine:
                out.append(f)
        return out

    def click_word(side, which='first'):
        """a click on a word of a pane's text (`WORD_IN_PANE`): the word's block"""
        at = ctx.js(WORD_IN_PANE % (json.dumps(side), json.dumps(which)))
        if at:
            ctx.drv.click(at['x'], at['y']); ctx.frames(3)
        return at

    # ---- the draft lengthened: its caret at its text's end, a paste through the gate's door, kept by the board ------------------
    quiet(); close_scene(); recentre()
    end = len(text_of().encode('utf8')) + 1
    ctx.js('(async () => (await import("./text/layer.js")).placeCaret(%s, %d))()' % (json.dumps(mine), end)); ctx.frames(2)
    pasted = ctx.js('window.__skep.paste(%s)' % json.dumps({'text/plain': '\n\n' + LONG_LINES}))
    long_kept = kept_now(30)
    quiet()
    r.check(bool(pasted) and long_kept and 'Line 30 of the pane' in text_of(), "the case's own draft lengthened by a paste at its caret, through the gate's paste door, and kept by the test board", {'pasted': pasted, 'kept': long_kept})
    plane_frame = last_write(ctx, ops_allowed)
    drop_caret()

    # ---- `pane-typed` ------------------------------------------------------------------------------------------------------------
    def typed_check(w):
        opened = beside()
        # stacked, the editor pane's head holds its kept line alone and its foot the rest of its corner (D2): no item of the
        # foot's stands at its head, where it would lie over the text below
        head = ctx.js('(() => { const h = document.querySelector("#sceneA > .corner.head"), f = document.querySelector("#sceneA > .corner.foot"); return h ? {kept: !!h.querySelector(".kept-word"), foot_items: h.querySelectorAll(".kind, .chip").length, foot: !!f && !!f.querySelector(".kind") && !!f.querySelector(".chip")} : null; })()')
        a0 = pane('A')
        at = click_word('A')
        c0, a1 = caret(), pane('A')
        placed = (opened and a0['editor'] and bool(at) and bool(c0) and c0['live'] and c0['addr'] == mine and at['block'] <= c0['pos'] <= at['block'] + at['width']
                  and a1['marks'] == ['live'] and ctx.js('document.querySelectorAll("#domlayer .caret-mark").length') == 0 and a1['focus'] == at['block'] and a1['active'])
        seq, n_before = ctx.editor_seq(), len(inserts())
        # the word counted in the pane's text and the draft's, so what the check at the other width left there counts for nothing
        word = 'Paned'
        count = lambda text: (text or '').count(word)
        n0 = count(a1['text'])
        press(word); ctx.frames(3)
        a2 = pane('A')
        shown_now = count(a2['text']) == n0 + 1 and count(text_of()) == n0 + 1
        press('.'); kept = kept_now(20)
        quiet()
        wrote = last_write(ctx, ops_allowed)
        on_board = [e for e in ctx.editor_log() if e['seq'] > seq and e['kind'] == 'call' and e.get('call') == 'op']
        frames = inserts()
        plane, typed = (frames[n_before - 1] if 0 < n_before <= len(frames) else None), frames[n_before:]
        same_shape = bool(plane_frame) and bool(wrote) and wrote['op'] == plane_frame['op'] == 'insert' and wrote['doc'] == mine and bool(plane) and bool(typed) and all(set(f) == set(plane) for f in typed)
        sent = (kept and bool(wrote) and (wrote.get('values') or [''])[0].startswith(word) and '"ack_addr"' in (wrote.get('answer') or '') and same_shape and len(on_board) > 0
                and (pane('A')['kept'] or {}).get('id') == 'B3.kept')
        # Mod+Z takes the run back out of the pane's text
        ctx.drv.key('z', mods=('Meta',)); ctx.frames(3)
        a3 = pane('A')
        undone = count(a3['text']) == n0 and count(text_of()) == n0 and (caret() or {}).get('live') is True
        back = kept_now(20)
        # a line held in the pane: its corner "not yet kept", then dropped, "kept" again
        k, held_ok, how = hold_typed(' Holdy', 'unreachable')
        ctx.frames(3)
        held_word = (pane('A')['kept'] or {}).get('id')
        out, dropped = drop_all(k)
        kept_again = (pane('A')['kept'] or {}).get('id')
        # the word typed again at a click, and kept: the state the row is shot in, the caret live in the pane beside its words
        click_word('A'); press(word + '.'); kept_now(20); quiet()
        a4 = pane('A')
        shown_again = count(a4['text']) == n0 + 1 and a4['marks'] == ['live'] and (caret() or {}).get('live') is True
        # every word of the pane's corner inside the box it stands in — beside its column side by side, its kept line's act on a
        # row of its own; stacked, its head's slots and its foot (issue #694)
        fit = fit_part(ctx, figures, 'pane-typed', w, '#sceneA > .corner')
        return {"the head its kept line alone": (w == WIDE[0] or (bool(head) and head['kept'] and head['foot_items'] == 0 and head['foot']), head),
                "the pane's corner's words in their boxes": fit,
                'the caret placed': (placed, {'opened': opened, 'at': at, 'caret': c0, 'pane': {x: a1[x] for x in ('marks', 'focus', 'active', 'editor')}}),
                'the words shown as typed': (shown_now and shown_again, {'text': (a2['text'] or '')[:200], 'word': word, 'before': n0, 'again': {'text': (a4['text'] or '')[:200], 'marks': a4['marks']}}),
                "sent as the plane's typing is": (sent, {'kept': kept, 'write': wrote and {x: wrote[x] for x in ('op', 'doc', 'values')}, 'plane': plane and sorted(plane), 'typed': [sorted(f) for f in typed], 'logged': len(on_board), 'corner': pane('A')['kept']}),
                'Mod+Z takes it back': (undone and back, {'text': (a3['text'] or '')[:200], 'before': n0, 'caret': caret(), 'kept': back}),
                'the corner moves': (held_ok and held_word == 'B3.not-yet-kept' and bool(out) and dropped and kept_again == 'B3.kept', {'held': held_ok, 'how': how, 'held_word': held_word, 'dropped': dropped, 'again': kept_again})}
    # each width's check starts with the scene the last one was shot in closed and no caret standing
    again = lambda: (close_scene(), drop_caret(), recentre())
    shoot('pane-typed', typed_check, again)
    close_scene(); drop_caret()

    # ---- `pane-lines` ------------------------------------------------------------------------------------------------------------
    # the draft's name as the status region names its box, read where a check meets the ending: it moves with the draft's first words
    name_now = lambda: ctx.js('(async () => (await import("./text/layer.js")).boxName(%s).name)()' % json.dumps(mine)) or ''

    def lines_check(w):
        edition = None
        if beside():
            edition = key_at('#sceneB', 'k')
        close_scene()
        # the caret kept in the draft, at the start of its first line, before the history opens over it
        recentre(); caret_end(''); ctx.drv.key('Escape'); ctx.frames(2)
        opened = history()
        label = name_now()
        ending = sentence(ctx, 'B3.undo.last-writing', {'label': label})
        c, a, b = caret(), pane('A'), pane('B')
        kept_in_a = opened and bool(c) and not c['live'] and a['editor'] and not b['editor'] and a['marks'] == ['kept'] and b['marks'] == []
        space = key_at('#sceneB', ' ', code='Space')
        ctx.js('document.getElementById("sceneA").focus({preventScroll: true})'); ctx.frames(1)
        ctx.drv.key('ArrowDown'); ctx.frames(2)
        moved = pane('A')
        bare = key_at('#sceneA', 'k')
        own_corner = key_at('#sceneA > .corner button', 'k', then='#sceneA > .corner')
        # stacked, the past pane's corner's later rows scroll with its text (#669's kind): its act stands at the pane's top
        ctx.js('document.getElementById("sceneB").scrollTop = 0'); ctx.frames(3)
        past_corner = key_at('#sceneB > .corner button', 'k', then='#sceneB > .corner')
        # the past pane's line last: the state the row is shot in
        past = key_at('#sceneB', 'k')
        nothing = (caret() or {}).get('live') is not True and edits() == 0
        return {'the caret kept in the current pane': (kept_in_a, {'caret': c, 'a': {x: a[x] for x in ('editor', 'marks', 'focus')}, 'b': {x: b[x] for x in ('editor', 'marks', 'focus')}}),
                "the past pane's line": (past['id'] == 'B3.history.read-only' and bool(label) and label in (past['writing'] or '') and past['seen'], {'got': past, 'ending': ending}),
                "Space's own line": (space['id'] == 'F.swallow.space', space),
                "the current pane's bare span": (moved['focus'] != a['focus'] and bare['id'] == 'B3.caret.enter' and not bare['writing'], {'got': bare, 'focus': [a['focus'], moved['focus']]}),
                "the current pane's corner": (own_corner['focused'] and own_corner['id'] == 'B3.caret.back', own_corner),
                "the past pane's corner": (past_corner['focused'] and past_corner['id'] == 'B3.history.read-only' and label in (past_corner['writing'] or ''), past_corner),
                "an edition of the person's own": (bool(edition) and edition['id'] == 'C-45', edition),
                'nothing typed': (nothing, {'caret': caret(), 'edits': edits()})}
    shoot('pane-lines', lines_check, again)
    close_scene(); drop_caret()

    # ---- `pane-way-back` ---------------------------------------------------------------------------------------------------------
    def way_back_check(w):
        recentre(); caret_end(''); ctx.drv.key('Escape'); ctx.frames(2)
        opened = history()
        label = name_now()
        sb = pane('B')['scroll']
        said = key_at('#sceneB', 'k')
        acted = ctx.js('(() => { const b = document.querySelector("#hint button[data-writing]"); if (b) b.click(); return !!b; })()'); ctx.frames(2)
        span = ctx.js('(async () => (await import("./text/layer.js")).caretSpan(%s))()' % json.dumps(mine)) or {}
        a = pane('A')
        moved = acted and a['active'] and a['focus'] == span.get('block')
        n0, c0 = edits(), caret()
        ctx.drv.key('W'); ctx.frames(3)
        c1, a1 = caret(), pane('A')
        typed = bool(c0) and bool(c1) and c1['live'] and c1['pos'] == c0['pos'] + 1 and edits() == n0 + 1 and 'W' in (a1['text'] or '')
        unmoved = pane('B')['scroll'] == sb
        # the letter kept by the board: the state the row is shot in, the caret live in the pane after it
        kept_now(20); quiet()
        return {'the ending raised': (opened and said['id'] == 'B3.history.read-only' and bool(label) and label in (said['writing'] or ''), dict(said, label=label)),
                "the focus on the kept caret's span": (moved, {'acted': acted, 'active': a['active'], 'focus': a['focus'], 'span': span}),
                'the next key types there': (typed, {'before': c0, 'after': c1, 'text': (a1['text'] or '')[:120]}),
                'the past pane unmoved': (unmoved, {'scroll': [sb, pane('B')['scroll']]})}
    shoot('pane-way-back', way_back_check, again)
    close_scene(); drop_caret()

    # ---- `pane-close` ------------------------------------------------------------------------------------------------------------
    def close_check(w):
        drop_caret()
        opened = beside()
        stored = ctx.js('(() => { const t = window.__skep.trail(), e = t.entries[t.cursor - 1]; return e ? {addr: e.addr, view: e.view} : null; })()')
        # pane A scrolled far down its text — the person's own act — and a word of the paragraph standing first in view clicked and typed at
        at = ctx.js(SCROLL_TO_WORD % (json.dumps('A'), json.dumps(0.7))); ctx.frames(3)
        # the panes settled — no setting of either out — the paragraph brought there again as the head then stands, and clicked
        settled = wait_for(ctx, '!window.__skep.scene.updating()', 10); ctx.frames(2)
        if at:
            at = ctx.js(SCROLL_TO_WORD % (json.dumps('A'), json.dumps(0.7))) or at
            hit = ctx.js(HIT_AT % (at['x'], at['y']))
            ctx.drv.click(at['x'], at['y']); ctx.frames(3)
            at.update(settled=settled, hit=hit, clicked=caret(), active=ctx.js('(() => { const e = document.activeElement; return e ? e.id || String(e.className) : null; })()'), hint=(ctx.js('window.__skep.hint()') or {}).get('id'))
        ctx.drv.key('C'); ctx.frames(3)
        c0 = caret()
        anchor = ctx.js('(async () => (await import("./scene/scene.js")).editorAnchor())()') or {}
        ctx.drv.key('Escape'); ctx.frames(2)
        left = caret()
        first = ctx.js('window.__skep.scene.isOpen()') and bool(left) and not left['live'] and pane('A')['marks'] == ['kept']
        ctx.drv.key('Escape'); ctx.settle(20); ctx.frames(4)
        f, c1, cam = ctx.js('window.__skep.view.focus()'), caret(), ctx.camera()
        line = ctx.js('((doc, pos) => { const q = (window.__skep.spanRects(doc, pos, 1) || []).filter((x) => x.h > 0); const top = document.getElementById("line").getBoundingClientRect().bottom; return q.length ? {y: q[0].y, inView: q[0].y >= top - 1 && q[0].y + q[0].h <= window.innerHeight + 1} : null; })(%s, %d)' % (json.dumps(mine), anchor.get('pos') or 1))
        landed = (not ctx.js('window.__skep.scene.isOpen()') and bool(at) and anchor.get('pos') == at['block'] and bool(f) and f['addr'] == mine and f['pos'] == at['block'] and bool(line) and line['inView']
                  and bool(stored) and bool(cam) and max(abs(cam['y'] - stored['view']['y']), abs(cam['x'] - stored['view']['x'])) * cam['scale'] > 1)
        retook = bool(c1) and bool(c0) and c1['addr'] == mine and c1['pos'] == c0['pos'] and not c1['live']
        n0 = edits()
        ctx.drv.key('D'); ctx.frames(3)
        c2 = caret()
        types = bool(c2) and c2['live'] and c2['pos'] == c0['pos'] + 1 and edits() >= n0 + 1
        # the letter kept by the board: the state the row is shot in, the caret live on the plane after it
        kept_now(20); quiet()
        return {'the first Esc leaves the text': (opened and bool(at) and bool(c0) and c0['live'] and first, {'opened': opened, 'at': at, 'caret': c0, 'left': left}),
                'the second closes, landing at the anchored span': (landed, {'focus': f, 'anchor': {x: anchor.get(x) for x in ('addr', 'pos')}, 'line': line, 'camera': cam, 'stored': stored}),
                'the caret re-taken there': (retook, {'before': c0, 'after': c1}),
                'a key types at it': (types, {'caret': c2})}
    shoot('pane-close', close_check, again)
    drop_caret()

    # ---- `pane-source-face`, `pane-forged-face`: a paste's face where the paste was made, in the pane --------------------------------
    nb = lambda x: len(x.encode('utf8'))
    face = lambda: ctx.js('window.__skep.pasteFace()') or {}
    paste = lambda data: ctx.js('window.__skep.paste(%s)' % json.dumps(data))
    n_ops = lambda: ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "op").length')
    scroll_of = lambda side: ctx.js('document.getElementById("scene%s").scrollTop' % side)
    drawn_box = lambda: ((face().get('drawn') or {}).get('face')) or {}

    def ops_from(n):
        """the page's `op` frames from its n-th on that are no read, parsed, each with its answer"""
        out = []
        for c in (ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "op").map((c) => ({frame: c.frame, answer: c.answer}))') or [])[n:]:
            try:
                f = json.loads(c['frame'])
            except (TypeError, ValueError):
                continue
            if isinstance(f, dict) and f.get('op') and 'frame' not in f and f['op'] not in ops_allowed:
                out.append(dict(f, answer=c.get('answer') or ''))
        return out

    def copied():
        """the first word of the draft's first line selected on the plane and copied by the copy door, the selection then
        ended: the word, and the clipboard's flavors"""
        word = first_line().split(' ')[0]
        ctx.js('(async () => { const L = await import("./text/layer.js"); L.placeSelection({addr: %s, pos: 1, width: %d}); })()' % (json.dumps(mine), nb(word))); ctx.frames(2)
        data = (ctx.js('window.__skep.copy()') or {}).get('data') or {}
        ctx.js('(async () => { const s = window.getSelection(); if (s) s.removeAllRanges(); (await import("./overlays/selection.js")).clear(); })()'); ctx.frames(2)
        return word, data

    def in_room(box, room):
        """does a box on screen stand inside a pane's room as `PANE_ROOM` reads it: its visible box, below what its held head
        covers"""
        top = max(room.get('y', 0), room.get('held') or 0)
        return (bool(box) and bool(room) and box['x'] >= room['x'] - 0.5 and box['x'] + box['w'] <= room['x'] + room['w'] + 0.5
                and box['y'] >= top - 0.5 and box['y'] + box['h'] <= room['y'] + room['h'] + 0.5)

    def clear_of(box, o):
        """does a box on screen stand clear of another — a pane's corner, its corner's foot — where that one stands"""
        return not o or box['x'] + box['w'] <= o['x'] + 0.5 or o['x'] + o['w'] <= box['x'] + 0.5 or box['y'] + box['h'] <= o['y'] + 0.5 or o['y'] + o['h'] <= box['y'] + 0.5

    def face_in(side, want):
        """the paste's face standing in `want`'s words and drawn in pane `side`, inside the room it stands in there — the pane's
        visible box below what its held head covers, apart from its corner beside its column and its corner's foot — its layer
        lifted over the scene and the pointer passing through it: as a check's part, (ok, detail)"""
        f = face()
        st, dr = f.get('standing') or {}, f.get('drawn') or {}
        box, room, over = dr.get('face') or {}, ctx.js(PANE_ROOM % json.dumps(side)) or {}, ctx.js(OVER_SCENE) or {}
        shown_text = ctx.js('(() => { const e = document.querySelector("#removed .pasted .part"); return e ? {id: e.dataset.string, text: e.textContent} : null; })()')
        inside = in_room(box, room)
        apart = lambda o: clear_of(box, o)
        lifted = over.get('lifted') is True and len(over.get('z') or []) == 2 and over['z'][0] >= over['z'][1] and over.get('after') is True and over.get('through') == 'none'
        ok = (st.get('addr') == mine and (st.get('id'), st.get('text')) == want and dr.get('side') == side.lower() and inside and apart(room.get('corner')) and apart(room.get('foot'))
              and shown_text == {'id': want[0], 'text': want[1]} and lifted)
        return ok, {'face': f, 'room': room, 'over': over, 'shown': shown_text, 'inside': inside, 'want': want}

    def source_face_check(w):
        word, data = copied()
        opened = beside()
        # a word of a paragraph a third of the way down pane A's text, brought to stand first in view, clicked: the caret live there
        at = ctx.js(SCROLL_TO_WORD % (json.dumps('A'), json.dumps(0.3)))
        settled = wait_for(ctx, '!window.__skep.scene.updating()', 10); ctx.frames(2)
        if at:
            at = ctx.js(SCROLL_TO_WORD % (json.dumps('A'), json.dumps(0.3))) or at
            ctx.drv.click(at['x'], at['y']); ctx.frames(3)
        c = caret()
        quiet()
        before, n0, seq = text_of(), n_ops(), ctx.editor_seq()
        ctx.arm('op', refusal={'kind': 'refused', 'name': 'withheld', 'status': 200, 'code': 'withheld', 'detail': None, 'op': 'reinstate', 'site': {'addr': mine}, 'body': None})
        took = paste(data)
        came = wait_for(ctx, '(() => { const f = window.__skep.pasteFace().standing; return !!f && f.addr === %s && f.id === "B3.paste.withheld"; })()' % json.dumps(mine), 10)
        quiet()
        sent, c1 = ops_from(n0), caret()
        want = ('B3.paste.withheld', sentence(ctx, 'B3.paste.withheld', {'origin': mine}))
        refused = (bool(data.get('application/x-skep-passage')) and opened and bool(c) and c['live'] and c['addr'] == mine and took == {'prevented': True} and came
                   and [x['op'] for x in sent] == ['reinstate'] and 'withheld' in sent[0]['answer'] and ctx.consumed('op', seq) and text_of() == before and c1 == c)
        faced = face_in('A', want)
        # pane A scrolled up a line: the face carried down with its line by as much
        pitch = round(ctx.js('(() => { const a = document.querySelector("#sceneA > article.dtext"); return a ? parseFloat(getComputedStyle(a).lineHeight) : 0; })()') or 0)
        s0, y0 = scroll_of('A'), drawn_box().get('y')
        ctx.js('document.getElementById("sceneA").scrollTop -= %d' % pitch); ctx.frames(3)
        s1, y1 = scroll_of('A'), drawn_box().get('y')
        carried = pitch > 0 and s1 < s0 and y0 is not None and y1 is not None and abs((y1 - y0) - (s0 - s1)) <= 1.5
        ctx.js('document.getElementById("sceneA").scrollTop = %s' % json.dumps(s0)); ctx.frames(3)
        # a wheel over the face's middle scrolls pane A beneath it, the plane under the scene unmoved
        b = drawn_box()
        cam0, s2 = ctx.camera(), scroll_of('A')
        if b:
            ctx.drv.wheel(b['x'] + b['w'] / 2, b['y'] + b['h'] / 2, dy=40)
        rolled = bool(b) and wait_for(ctx, 'document.getElementById("sceneA").scrollTop > %s' % json.dumps(s2), 3)
        ctx.frames(3)
        cam1 = ctx.camera()
        ctx.js('document.getElementById("sceneA").scrollTop = %s' % json.dumps(s2)); ctx.frames(3)
        # the page's frames while pane A scrolls with the face standing (FP-18), the pane then where it stood: the state the row is shot in
        ms = ctx.js(SCROLL_FRAMES % (json.dumps('A'), 12, max(1, pitch))) or []
        r.figures.setdefault('pane_face_scroll', {})[str(w)] = {'frames': len(ms), 'max_ms': round(max(ms), 2) if ms else None, 'median_ms': round(sorted(ms)[len(ms) // 2], 2) if ms else None}
        ctx.frames(2)
        return {'nothing placed': (refused, {'opened': opened, 'settled': settled, 'at': at, 'caret': [c, c1], 'door': took, 'came': came, 'sent': [(x['op'], x['answer'][:160]) for x in sent],
                                            'consumed': ctx.consumed('op', seq), 'unchanged': text_of() == before, 'word': word}),
                'the face in pane A': faced,
                'carried by the scroll': (carried, {'pitch': pitch, 'scroll': [s0, s1], 'y': [y0, y1]}),
                'a wheel over it scrolls the pane': (rolled and cam1 == cam0, {'box': b, 'scroll': s2, 'rolled': rolled, 'camera': [cam0, cam1]})}
    shoot('pane-source-face', source_face_check, again)
    close_scene(); drop_caret()

    def forged_face_check(w):
        word, data = copied()
        forged = ''.join(chr((ord(ch) - 97 + 1) % 26 + 97) if 'a' <= ch <= 'z' else chr((ord(ch) - 65 + 1) % 26 + 65) if 'A' <= ch <= 'Z' else ch for ch in word)
        # the scene opened from the first edition: the walk under it there, the draft in pane B
        ctx.leap(DOC, 1); ctx.frames(2)
        ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(DOC), json.dumps(mine)))
        opened = wait_for(ctx, 'window.__skep.scene.isOpen() && (window.__skep.scene.pair() || {}).b === %s' % json.dumps(mine), 30)
        ctx.settle(15); ctx.frames(3)
        walk = ctx.js('window.__skep.view.focus()') or {}
        at = click_word('B')
        c = caret()
        quiet()
        # the source named as the face names it at the act, from the draft's record before the board keeps the forged words
        n0, source = n_ops(), name_now()
        took = paste(dict(data, **{'text/plain': forged}))
        landed = kept_now(20)
        quiet()
        sent = ops_from(n0)
        want = ('L.paste.differs', sentence(ctx, 'L.paste.differs', {'source': source}))
        placed = (bool(data.get('application/x-skep-passage')) and forged != word and nb(forged) == nb(word) and opened and bool(at) and bool(c) and c['live'] and c['addr'] == mine
                  and took == {'prevented': True} and landed and [x['op'] for x in sent] == ['insert'] and sent[0].get('values') == [forged] and '"ack_addr"' in sent[0]['answer'])
        return {'the `insert`': (placed, {'opened': opened, 'at': at, 'caret': c, 'door': took, 'kept': landed, 'sent': [(x['op'], x.get('values')) for x in sent], 'word': word, 'forged': forged}),
                'the walk under the scene on the edition': (walk.get('addr') == DOC, walk),
                'the face in pane B': face_in('B', want)}
    shoot('pane-forged-face', forged_face_check, again)
    # the focus moved into pane A, the first edition's: the face standing in pane B goes
    stood = (face().get('standing') or {}).get('id') == 'L.paste.differs'
    ctx.js('document.getElementById("sceneA").focus({preventScroll: true})'); ctx.frames(3)
    r.check(stood and face().get('standing') is None, "B3-S5 · pane-forged-face: the focus moved into pane A, the first edition's, the paste's face standing in pane B goes (the paste survey's P6)", {'stood': stood, 'after': face()})
    close_scene(); drop_caret()

    # ---- `pane-removal`: a removal of kept text made at a caret in an editor pane, its mark and its face there ---------------------
    removed = lambda: ctx.js('window.__skep.removed()') or []
    removal_ids = lambda: ctx.js('(async (a) => (await import("./write/write.js")).removalsOf(a).map((x) => x.id))(%s)' % json.dumps(mine)) or []
    # the Backspace the row pressed last and the removal it made, taken back before the next (`take_back`)
    made = {'pressed': False, 'id': None}

    def new_mark(side, ids0):
        """the draft's removal made since `ids0` as the last frame set it, drawn in pane `side` (`a`, `b`) — on the plane where
        None; None where it stands drawn nowhere there"""
        got = [x for x in removed() if x['addr'] == mine and x['id'] not in ids0 and x.get('side') == side]
        return got[-1] if got else None

    def backspace(side, ids0):
        """Backspace at the caret over a kept character, the page quiet before it: the burst's commit composes its `delete`.
        Whether its mark came drawn where `side` names (`new_mark`), whether the draft was then kept again, and the write sent"""
        made.update(pressed=True, id=None)
        ctx.drv.key('Backspace'); ctx.frames(2)
        came = wait_for(ctx, '(window.__skep.removed() || []).some((x) => x.addr === %s && !%s.includes(x.id) && x.side === %s)' % (json.dumps(mine), json.dumps(ids0), json.dumps(side)), 10)
        kept = kept_now(20)
        quiet()
        fresh = [i for i in removal_ids() if i not in ids0]
        made['id'] = fresh[-1] if fresh else None
        return came, kept, last_write(ctx, ops_allowed)

    def take_back(where):
        """the Backspace the row pressed last taken back by Mod+Z, where one is: the draft kept again by one `reinstate`, acked,
        and its removal's mark gone — a check of its own"""
        if not made['pressed']:
            return
        rid = made['id']
        made.update(pressed=False, id=None)
        ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
        ctx.drv.key('z', mods=('Meta',)); ctx.frames(3)
        back = kept_now(20)
        quiet()
        w_ = last_write(ctx, ops_allowed)
        gone = rid is not None and rid not in removal_ids() and all(x['id'] != rid for x in removed())
        r.check(back and gone and bool(w_) and w_['op'] == 'reinstate' and w_['doc'] == mine and '"ack"' in (w_.get('answer') or ''),
                "B3-S4 · pane-removal: Mod+Z %s takes the removal back — one `reinstate`, acked — and its mark with it (D6 BM-32)" % where,
                {'kept': back, 'removal': rid, 'gone': gone, 'write': w_ and {k: w_[k] for k in ('op', 'doc')}, 'removals': removal_ids()})

    def press_mark(ids0):
        """the pointer pressed at the middle of the mark of the draft's removal made since `ids0` in pane A: that removal as
        the next frame set it"""
        cur = new_mark('a', ids0)
        if cur:
            ctx.drv.click(cur['mark']['x'] + cur['mark']['w'] / 2, cur['mark']['y'] + cur['mark']['h'] / 2); ctx.frames(3)
        return new_mark('a', ids0)

    def removal_check(w):
        opened = beside()
        # a word of a paragraph a third of the way down pane A's text, brought to stand first in view, clicked: the caret live there
        at = ctx.js(SCROLL_TO_WORD % (json.dumps('A'), json.dumps(0.3)))
        settled = wait_for(ctx, '!window.__skep.scene.updating()', 10); ctx.frames(2)
        if at:
            at = ctx.js(SCROLL_TO_WORD % (json.dumps('A'), json.dumps(0.3))) or at
            ctx.drv.click(at['x'], at['y']); ctx.frames(3)
        quiet()
        c0, before, ids0 = caret(), text_of(), removal_ids()
        came, kept, wrote = backspace('a', ids0)
        mk, c1, after = new_mark('a', ids0), caret(), text_of()
        room, cm = ctx.js(PANE_ROOM % json.dumps('A')) or {}, ctx.js(CARET_IN_PANE % json.dumps('A'))
        box = (mk or {}).get('mark') or {}
        mid = (box['x'] + box['w'] / 2, box['y'] + box['h'] / 2) if box else (0, 0)
        over = ctx.js(REMOVAL_OVER % mid) or {}
        lifted = over.get('lifted') is True and len(over.get('z') or []) == 2 and over['z'][0] >= over['z'][1] and over.get('after') is True
        level = bool(box) and bool(cm) and cm['y'] - 2 <= mid[1] <= cm['y'] + cm['h'] + 2
        made_ok = (opened and bool(at) and bool(c0) and c0['live'] and c0['addr'] == mine and came and kept and bool(wrote) and wrote['op'] == 'delete' and wrote['doc'] == mine
                   and '"ack"' in (wrote.get('answer') or '') and bool(mk) and len(mk['words']) == 1 and nb(after) == nb(before) - nb(mk['words']))
        placed = (made_ok and in_room(box, room) and clear_of(box, room.get('corner')) and clear_of(box, room.get('foot')) and level and lifted and over.get('hit') is True
                  and bool(c1) and c1['live'] and c1['pos'] == c0['pos'] - nb(mk['words']))
        # the mark pressed with the pointer: its face whole — pressed again where the press folded a face that stood whole
        was_whole = bool(mk) and mk['whole']
        mk2 = press_mark(ids0)
        toggled = bool(mk2) and mk2['whole'] != was_whole
        if mk2 and not mk2['whole']:
            mk2 = press_mark(ids0)
        fbox = (mk2 or {}).get('face') or {}
        over2, said, c2, pa = ctx.js(REMOVAL_OVER % mid) or {}, live(ctx), caret(), pane('A')
        named = ctx.js("""(() => { const b = document.querySelector('#removed .removal:not(.pasted) button.mark[aria-expanded="true"]'); return b ? {title: b.getAttribute("title"), name: b.getAttribute("aria-label")} : null; })()""")
        want = [{'id': 'C-49', 'text': t(ctx, 'C-49')}, {'id': 'B3.deletion.private', 'text': t(ctx, 'B3.deletion.private')}]
        whole = (toggled and bool(mk2) and mk2['whole'] and in_room(fbox, room) and clear_of(fbox, room.get('corner')) and clear_of(fbox, room.get('foot'))
                 and [{'id': p['id'], 'text': p['text']} for p in mk2['parts']] == want and over2.get('parts') == want and over2.get('through') == 'none'
                 and said == heard(ctx, '%s %s' % (t(ctx, 'C-49'), t(ctx, 'B3.deletion.private'))) and named == {'title': t(ctx, 'B3.removed-here'), 'name': t(ctx, 'B3.removed-here')})
        stays = pa['active'] and not ctx.js('document.getElementById("removed").contains(document.activeElement)') and bool(c2) and c2 == c1
        # a wheel over the mark: the plane under the scene unmoved
        cam0 = ctx.camera()
        if box:
            ctx.drv.wheel(mid[0], mid[1], dy=40)
        ctx.frames(3); time.sleep(0.3); ctx.frames(2)
        cam1 = ctx.camera()
        # pane A scrolled up a line: the mark carried down with its line by as much
        pitch = round(ctx.js('(() => { const a = document.querySelector("#sceneA > article.dtext"); return a ? parseFloat(getComputedStyle(a).lineHeight) : 0; })()') or 0)
        s0, y0 = scroll_of('A'), ((new_mark('a', ids0) or {}).get('mark') or {}).get('y')
        ctx.js('document.getElementById("sceneA").scrollTop -= %d' % pitch); ctx.frames(3)
        s1, y1 = scroll_of('A'), ((new_mark('a', ids0) or {}).get('mark') or {}).get('y')
        carried = pitch > 0 and s1 < s0 and y0 is not None and y1 is not None and abs((y1 - y0) - (s0 - s1)) <= 1.5
        ctx.js('document.getElementById("sceneA").scrollTop = %s' % json.dumps(s0)); ctx.frames(3)
        # the page's frames while pane A scrolls with the face standing (FP-18), the pane then where it stood: the state the row is shot in
        ms = ctx.js(SCROLL_FRAMES % (json.dumps('A'), 12, max(1, pitch))) or []
        r.figures.setdefault('pane_removal_scroll', {})[str(w)] = {'frames': len(ms), 'max_ms': round(max(ms), 2) if ms else None, 'median_ms': round(sorted(ms)[len(ms) // 2], 2) if ms else None}
        ctx.frames(2)
        return {'the removal made at the caret': (made_ok, {'opened': opened, 'settled': settled, 'at': at, 'caret': c0, 'came': came, 'kept': kept, 'write': wrote and {k: wrote[k] for k in ('op', 'doc')},
                                                            'removal': mk and {k: mk[k] for k in ('id', 'words', 'whole', 'side')}, 'bytes': [nb(before), nb(after)]}),
                'its mark in pane A over the scene, level with the caret': (placed, {'mark': box, 'room': room, 'caret_mark': cm, 'over': over, 'caret': c1}),
                'its press opens its face whole in the pane': (whole, {'removal': mk2, 'over': over2, 'said': said, 'named': named, 'want': want}),
                'the focus and the live caret stand in the pane': (stays, {'active': pa['active'], 'caret': [c1, c2]}),
                'a wheel over it moves no camera': (bool(box) and cam1 == cam0, {'camera': [cam0, cam1]}),
                'carried by the scroll': (carried, {'pitch': pitch, 'scroll': [s0, s1], 'y': [y0, y1]})}
    # each width's check starts with the last one's removal taken back in its pane, the scene closed and no caret standing
    shoot('pane-removal', removal_check, lambda: (take_back('in pane A'), again()))
    take_back('in pane A')
    close_scene(); drop_caret()
    ctx.resize(*WIDE)
    # in pane B: the scene opened from the first edition's entry, the draft in pane B, a word there clicked and a character taken out
    ctx.leap(DOC, 1); ctx.frames(2)
    ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(DOC), json.dumps(mine)))
    opened_b = wait_for(ctx, 'window.__skep.scene.isOpen() && (window.__skep.scene.pair() || {}).b === %s' % json.dumps(mine), 30)
    ctx.settle(15); ctx.frames(3)
    at_b = click_word('B')
    quiet()
    ids0 = removal_ids()
    came_b, kept_b, wrote_b = backspace('b', ids0)
    mk_b, room_b = new_mark('b', ids0), ctx.js(PANE_ROOM % json.dumps('B')) or {}
    box_b = (mk_b or {}).get('mark') or {}
    r.check(opened_b and bool(at_b) and came_b and kept_b and bool(wrote_b) and wrote_b['op'] == 'delete' and in_room(box_b, room_b) and clear_of(box_b, room_b.get('corner')) and clear_of(box_b, room_b.get('foot')),
            "B3-S4 · pane-removal at %d px: a removal made at a caret in pane B, the draft's editor beside the first edition, stands drawn there — its mark inside the pane's visible box below its held head and clear of pane B's corner beside its column" % WIDE[0],
            {'opened': opened_b, 'at': at_b, 'came': came_b, 'kept': kept_b, 'write': wrote_b and {k: wrote_b[k] for k in ('op', 'doc')}, 'mark': mk_b, 'room': room_b, 'fit': ctx.js('window.__skep.scene.fit()')})
    take_back('in pane B')
    close_scene(); drop_caret()
    # on the plane: the caret at the end of the draft's first line, a character taken out there, then the scene opened over the
    # draft, pane A at its top
    recentre()
    caret_end(first_line())
    quiet()
    ids0 = removal_ids()
    came_p, kept_p, wrote_p = backspace(None, ids0)
    on_plane = new_mark(None, ids0)
    opened_p = beside()
    ctx.js('document.getElementById("sceneA").scrollTop = 0'); ctx.frames(3)
    mk_p, room_p = new_mark('a', ids0), ctx.js(PANE_ROOM % json.dumps('A')) or {}
    box_p = (mk_p or {}).get('mark') or {}
    over_p = ctx.js(REMOVAL_OVER % ((box_p['x'] + box_p['w'] / 2, box_p['y'] + box_p['h'] / 2) if box_p else (0, 0))) or {}
    r.check(came_p and kept_p and bool(wrote_p) and wrote_p['op'] == 'delete' and bool(on_plane) and opened_p and in_room(box_p, room_p) and clear_of(box_p, room_p.get('corner'))
            and clear_of(box_p, room_p.get('foot')) and over_p.get('lifted') is True and len(over_p.get('z') or []) == 2 and over_p['z'][0] >= over_p['z'][1] and over_p.get('after') is True and over_p.get('hit') is True,
            "B3-S4 · pane-removal at %d px: a removal made on the plane, its mark standing there, stands in pane A over the scene as the scene opens over its draft — inside the pane's visible box and clear of its corner, the element a pointer meets at its mark" % WIDE[0],
            {'came': came_p, 'kept': kept_p, 'write': wrote_p and {k: wrote_p[k] for k in ('op', 'doc')}, 'on_plane': on_plane, 'opened': opened_p, 'mark': mk_p, 'room': room_p, 'over': over_p})
    take_back('in the scene over a removal made on the plane')
    close_scene(); drop_caret()

    # ---- `pane-refused`, `pane-held-bars`: the margin's marks beside words the board has not kept, in the pane (#680) ------------
    refusal = m['refusal']
    hands = [{'key': 'other', 'fingerprint': 'aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899', 'label': 'desk'}]
    marks_at = lambda side, pos, width, kind: ctx.js(PANE_MARKS % (json.dumps(side), json.dumps(mine), pos, width, json.dumps(kind))) or {}
    pitch_of = lambda side: round(ctx.js('(() => { const a = document.querySelector("#scene%s > article.dtext"); return a ? parseFloat(getComputedStyle(a).lineHeight) : 0; })()' % side) or 0)
    # the line the row held last, dropped before the next width's check and after the row (`drop_line`)
    holding = {'k': None}

    def drop_line():
        if holding['k'] is not None:
            k_, holding['k'] = holding['k'], None
            drop_all(k_)

    def bar_of(got, kind):
        """the one bar of `kind` a pane stands beside the words `marks_at` read — None where not exactly one does"""
        bars = [x for x in got.get('marks') or [] if x['kind'] == kind and not x['point']]
        return bars[0] if got.get('beside') == 1 and len(bars) == 1 else None

    def typed_below_head(text, cause, **more):
        """a word of a paragraph a third of the way down pane A's text brought below its head and clicked, `text` typed at the
        caret there with the burst held under `cause` (`hold_typed`; `more` on its row), the line kept to drop, then pane A
        scrolled up two lines so the words' line stands whole below its head: the caret the words were typed at, whether the
        arm answered their burst, and how"""
        at = ctx.js(SCROLL_TO_WORD % (json.dumps('A'), json.dumps(0.3)))
        wait_for(ctx, '!window.__skep.scene.updating()', 10); ctx.frames(2)
        if at:
            at = ctx.js(SCROLL_TO_WORD % (json.dumps('A'), json.dumps(0.3))) or at
            ctx.drv.click(at['x'], at['y']); ctx.frames(3)
        c = caret()
        k, armed, how = hold_typed(text, cause, **more)
        holding['k'] = k
        ctx.js('document.getElementById("sceneA").scrollTop -= %d' % (2 * pitch_of('A'))); ctx.frames(3)
        return c, armed, dict(how, at=at)

    def under_head(side, pos, width, kind, word=False):
        """the pane scrolled until the bar of `kind` beside the words at [pos, pos + width) passes half under the top of the room
        its held head leaves, then wholly, then back where it stood: whether the bar's top stood at the room's top the first
        time, shorter, and no mark of its kind stood the second — with `word`, the word "held" at the one hold below the room's
        top the first time and gone the second. As a check's part, (ok, detail)"""
        s0, got = scroll_of(side), marks_at(side, pos, width, kind)
        b = bar_of(got, kind)
        if not b:
            return False, {'before': got}
        p = b['placed']
        ctx.js('document.getElementById("scene%s").scrollTop += %d' % (side, round(p['y'] - got['room'] + p['h'] / 2))); ctx.frames(3)
        half = marks_at(side, pos, width, kind)
        hb = [x for x in half.get('marks') or [] if x['kind'] == kind and not x['point']]
        ctx.js('document.getElementById("scene%s").scrollTop += %d' % (side, round(p['h'] / 2) + 4)); ctx.frames(3)
        gone = marks_at(side, pos, width, kind)
        ctx.js('document.getElementById("scene%s").scrollTop = %s' % (side, json.dumps(s0))); ctx.frames(3)
        ok = (len(hb) == 1 and abs(hb[0]['placed']['y'] - half['room']) <= 1 and hb[0]['placed']['h'] < p['h'] and not [x for x in gone.get('marks') or [] if x['kind'] == kind]
              and (not word or (bool(half.get('word')) and abs(half['word']['y'] - half['hold']) <= 1.5 and gone.get('word') is None)))
        return ok, {'bar': p, 'room': got['room'], 'half': [x['placed'] for x in hb], 'word': half.get('word'), 'hold': half.get('hold'), 'gone': {'marks': gone.get('marks'), 'word': gone.get('word')}, 'scroll': s0}

    def refused_check(w):
        opened = beside()
        # a line merely held: no mark in the pane (J5)
        c0, held_ok, how0 = typed_below_head(' Holdy', 'unreachable')
        merely = marks_at('A', (c0 or {}).get('pos') or 0, nb(' Holdy'), 'held')
        drop_line()
        # a refused run: its bracket in pane A
        c1, armed, how = typed_below_head(' Refused.', 'out_of_bounds', sent=True, refusal=refusal('out_of_bounds'))
        pos, n = (c1 or {}).get('pos') or 0, nb(' Refused.')
        got, room = marks_at('A', pos, n, 'refused'), ctx.js(PANE_ROOM % json.dumps('A')) or {}
        bar = bar_of(got, 'refused')
        strokes = [x for x in got.get('strokes') or [] if x['kind'] == 'refused']
        placed = (opened and bool(c1) and c1['live'] and c1['addr'] == mine and armed and got.get('words', 0) > 0 and bool(bar) and got.get('facing') is True
                  and [x['kind'] for x in got['marks']] == ['refused'] and got.get('word') is None and got.get('other') == 0 and in_room(bar['placed'], room)
                  and len(strokes) == 1 and strokes[0]['left'] == 0 and strokes[0]['right'] > 0)
        # a face raised just after the words leaves their line past the bracket
        line = ctx.js(EDITOR_LINE_AT % (json.dumps('A'), json.dumps(mine), pos, n))
        past = bool(line) and bool(bar) and line['side'] == 'a' and line['from']['x'] >= bar['placed']['x'] + bar['placed']['w'] - 0.5
        # pane A scrolled up a line: the bracket carried down with its line by as much
        pitch = pitch_of('A')
        s0, y0 = scroll_of('A'), (bar or {}).get('placed', {}).get('y')
        ctx.js('document.getElementById("sceneA").scrollTop -= %d' % pitch); ctx.frames(3)
        moved = bar_of(marks_at('A', pos, n, 'refused'), 'refused')
        s1, y1 = scroll_of('A'), (moved or {}).get('placed', {}).get('y')
        carried = pitch > 0 and s1 < s0 and y0 is not None and y1 is not None and abs((y1 - y0) - (s0 - s1)) <= 1.5
        ctx.js('document.getElementById("sceneA").scrollTop = %s' % json.dumps(s0)); ctx.frames(3)
        clipped = under_head('A', pos, n, 'refused')
        # the page's frames while pane A scrolls with the bracket standing (FP-18), the pane then where it stood: the state the row is shot in
        ms = ctx.js(SCROLL_FRAMES % (json.dumps('A'), 12, max(1, pitch))) or []
        r.figures.setdefault('pane_margin_scroll', {})[str(w)] = {'frames': len(ms), 'max_ms': round(max(ms), 2) if ms else None, 'median_ms': round(sorted(ms)[len(ms) // 2], 2) if ms else None}
        ctx.frames(2)
        return {'a line merely held marks nothing (J5)': (held_ok and merely.get('words', 0) > 0 and merely.get('marks') == [] and merely.get('word') is None, {'held': held_ok, 'how': how0, 'got': merely}),
                'the refused mark in pane A beside its words': (placed, {'opened': opened, 'caret': c1, 'armed': armed, 'how': how, 'got': got, 'room': room}),
                'a face leaves its line past it': (past, {'line': line, 'bar': bar}),
                'carried by the scroll': (carried, {'pitch': pitch, 'scroll': [s0, s1], 'y': [y0, y1]}),
                "held at what the pane's held head covers, and gone under it": clipped}
    again_margin = lambda: (drop_line(), again())
    shoot('pane-refused', refused_check, again_margin)
    drop_line(); close_scene(); drop_caret()
    # in pane B side by side: the scene opened from the first edition's entry, the draft in pane B, a word there clicked and a
    # refused run typed at it — the bracket left of the column's text, open toward it
    ctx.resize(*WIDE)
    ctx.leap(DOC, 1); ctx.frames(2)
    ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(DOC), json.dumps(mine)))
    opened_b = wait_for(ctx, 'window.__skep.scene.isOpen() && (window.__skep.scene.pair() || {}).b === %s' % json.dumps(mine), 30)
    ctx.settle(15); ctx.frames(3)
    at_b = click_word('B')
    c_b = caret()
    k_b, armed_b, how_b = hold_typed(' Refused.', 'out_of_bounds', sent=True, refusal=refusal('out_of_bounds'))
    holding['k'] = k_b
    ctx.frames(3)
    got_b, room_b = marks_at('B', (c_b or {}).get('pos') or 0, nb(' Refused.'), 'refused'), ctx.js(PANE_ROOM % json.dumps('B')) or {}
    bar_b, strokes_b = bar_of(got_b, 'refused'), [x for x in got_b.get('strokes') or [] if x['kind'] == 'refused']
    r.check(opened_b and bool(at_b) and bool(c_b) and c_b['live'] and armed_b and bool(bar_b) and got_b.get('facing') is False and in_room(bar_b['placed'], room_b)
            and len(strokes_b) == 1 and strokes_b[0]['right'] == 0 and strokes_b[0]['left'] > 0,
            "B3-S2 · pane-refused at %d px: a refused run typed in pane B, the draft's editor beside the first edition side by side, carries the refused mark there — left of the column's text and open toward it, inside the pane's visible box (skep-frontend #680)" % WIDE[0],
            {'opened': opened_b, 'at': at_b, 'caret': c_b, 'armed': armed_b, 'how': how_b, 'got': got_b, 'room': room_b, 'fit': ctx.js('window.__skep.scene.fit()')})
    drop_line(); close_scene(); drop_caret()

    def held_bars_check(w):
        opened = beside()
        c0, armed, how = typed_below_head(' Moved.', 'moved', sent=True, refusal=refusal('arrangement_moved', as_of=1, current=2), sendable=False, hands=hands)
        pos, n = (c0 or {}).get('pos') or 0, nb(' Moved.')
        got, room = marks_at('A', pos, n, 'held'), ctx.js(PANE_ROOM % json.dumps('A')) or {}
        bar, word = bar_of(got, 'held'), got.get('word') or {}
        placed = (opened and bool(c0) and c0['live'] and armed and got.get('words', 0) > 0 and bool(bar) and got.get('facing') is True and [x['kind'] for x in got['marks']] == ['held']
                  and got.get('other') == 0 and in_room(bar['placed'], room))
        said = (bool(bar) and word.get('text') == t(ctx, 'B3.held') and word.get('id') == 'B3.held' and word.get('hidden') == 'true'
                and abs(word.get('y', -99) - max(bar['placed']['y'], got['hold'])) <= 1.5 and word.get('x', -99) >= bar['placed']['x'] + bar['placed']['w'] - 1)
        return {'the held bar in pane A beside its words': (placed, {'opened': opened, 'caret': c0, 'armed': armed, 'how': how, 'got': got, 'room': room}),
                '"held" once in the pane\'s edge at its top': (said, {'word': word, 'bar': bar, 'hold': got.get('hold')}),
                "held at what the pane's held head covers, and gone under it": under_head('A', pos, n, 'held', word=True)}
    # the window at the narrow width as the row begins, so the shoot leaves it there and the scene as its last check left it
    ctx.resize(*NARROW)
    shoot('pane-held-bars', held_bars_check, again_margin)
    before = marks_at('A', 0, 0, 'held')
    drop_line(); ctx.frames(3)
    after = marks_at('A', 0, 0, 'held')
    r.check(len(before.get('marks') or []) == 1 and bool(before.get('word')) and after.get('marks') == [] and after.get('word') is None and ctx.js('window.__skep.scene.isOpen()'),
            "B3-S2 · pane-held-bars: the moved line discarded lifts its held bar and the word \"held\" from pane A, the scene standing (D6 BM-16; skep-frontend #680)",
            {'before': {'marks': before.get('marks'), 'word': before.get('word')}, 'after': {'marks': after.get('marks'), 'word': after.get('word')}})
    close_scene(); drop_caret()
    ctx.resize(*WIDE)
    # the rows called no history op of the shell's
    calls = [c['name'] for c in page_calls(ctx)[calls0:]]
    r.check(not any(c.startswith('history.') for c in calls), "the editor pane's rows call no `history.*`: reads, their typing, its undo, the paste and the removals", dict(Counter(calls)))


def run(ctx):
    r = Result()
    rows = {s['state']: dict(s, outcome=('pending' if s['drawn'] else 'not drawn')) for s in STATES}
    figures = {'own_draft': OWN, 'narrow_px': NARROW_PX, 'staging_draft': STAGING, 'states': list(rows.values())}
    ops_allowed = read_ops()
    # what the editor pages sent the harness's provider: every call by name, every `op` frame's op, and each write frame — its op
    # and the document it names — with the drafts the case minted for itself
    sent = {'calls': [], 'ops': set(), 'writes': [], 'minted': []}

    def out():
        for row in rows.values():
            if row['outcome'] == 'pending':
                row.update(outcome='red', detail='not reached: the case ended before it')
        figures['sent'] = {'calls': sorted(set(sent['calls'])), 'ops': sorted(sent['ops'])}
        r.figures.update(figures)
        return r.out()

    def red(state, detail):
        rows[state].update(outcome='red', detail=json.dumps(detail, default=str)[:400])

    def shoot(state, check, recentre=None, marks=None):
        """a drawn state checked and shot at both widths: at each, the window set, the camera brought back where the state
        stands (`recentre`), the check made with the width, the shot taken; a check that fails leaves the row red from
        there, unshot. A check of several parts answers each by its name, `{part: (ok, detail)}`, and each part counts
        as a check of its own, named after the row's claim. `marks` names, by width, the page issue a check there waits
        on — by part, `{part: issue}`, for a check of parts: the check is marked with it — counted expected while it
        fails, and failing the case the day it passes — and the shot is still taken, as the issue's evidence, the row
        reading expected and never shot and passed"""
        row = rows[state]
        shots, expected = [], []
        was = ctx.resize(*WIDE)
        try:
            for w, h in (WIDE, NARROW):
                ctx.resize(w, h)
                if recentre:
                    recentre()
                ctx.settle(10); ctx.frames(3)
                got, mark = check(w), (marks or {}).get(w)
                for part, (ok, detail) in (got.items() if isinstance(got, dict) else [(None, got)]):
                    xf = mark.get(part) if isinstance(mark, dict) else mark
                    r.check(ok, f"{row['screen']} · {state} at {w} px{f' ({part})' if part else ''}: {row['claim']}", detail, xfail=xf)
                    if not ok and not xf:
                        red(state, {'width': w, 'part': part, 'detail': detail} if part else {'width': w, 'detail': detail})
                        return False
                    if not ok:
                        expected.append({'width': w, 'issue': xf, 'detail': json.dumps(detail, default=str)[:300]})
                shots.append(ctx.shot(f"{row['screen']}/{state}-{row['walk']}-{row['step']:02d}-w{w}.png"))
        finally:
            ctx.resize(*was); ctx.frames(3)
        row.update(outcome='expected' if expected else 'shot', shots=shots, expected=expected)
        return not expected

    def leave_page():
        """what the open page sent the harness's provider, kept for the write check before the page is left: each call's
        name, each `op` frame's op, and each write frame with the document it names"""
        for c in page_calls(ctx):
            sent['calls'].append(c['name'])
            if c['name'] == 'op' and c['op']:
                sent['ops'].add(c['op'])
        for raw in ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "op").map((c) => c.frame)') or []:
            try:
                f = json.loads(raw)
            except (TypeError, ValueError):
                continue
            if isinstance(f, dict) and f.get('op') and f.get('op') not in ops_allowed and 'frame' not in f:
                sent['writes'].append([f['op'], f.get('doc') or f.get('account')])

    # ---- (a) the harness's provider answers; its secret is in the environment ---------------------------------------
    if not ctx.editor_provider or not ctx.editor_secret:
        r.check(False, "the harness's provider is named (--editor-provider) and SKEP_EDITOR_SECRET is in the environment",
                {'provider': ctx.editor_provider, 'secret_set': bool(ctx.editor_secret)})
        return out()
    try:
        seq0 = ctx.editor_seq()
    except Exception as e:
        r.check(False, f"the harness's provider answers its log at {ctx.editor_provider}", str(e))
        return out()
    r.check(True, f"the harness's provider answers its log at {ctx.editor_provider}")
    health0 = ctx.health()

    # ---- (b) the page on the harness's provider ---------------------------------------------------------------------
    ctx.open_editor_page('all')
    session = ctx.js('window.__skep.model.session()')
    board = ctx.js('window.__skep.model.board()')
    since = [e for e in ctx.editor_log() if e['seq'] > seq0]
    r.check(bool(session) and bool(board) and any(e['kind'] == 'call' and e.get('call') == 'session' for e in since),
            "the page opened on the harness's provider: a session stands, and the page's `session` call is in that provider's log — the page dials 8744, never 8742",
            {'session': bool(session), 'account': session and session.get('account'), 'writes': session and session.get('writes'),
             'calls_logged': sorted({str(e.get('call')) for e in since if e['kind'] == 'call'})})
    if not session or not board:
        return out()
    sid, account, board_id = session['session'], session['account'], board['board']
    places = ctx.js('window.__skep.model.places()')
    own_drafts = sorted((p['doc'] for p in places if p['kind'] == 'draft' and p['account'] == account), key=lambda a: [int(x) for x in a.split('.')])
    r.check(OWN in own_drafts and STAGING in own_drafts, f"the index lists the own draft {OWN} and the staging draft {STAGING} as drafts of the session's account", own_drafts[:12])
    # the `health` answer as the shell gave it: what the halted arm's canned answer is cut from, so its shape is the shell's
    health_answer = ctx.js('(() => { const c = window.__skep.bridge.calls().find((x) => x.name === "health" && x.answer); return c ? JSON.parse(c.answer) : null; })()')

    # ---- (c) B3-S1, B3-S2: the three kept words at the corner (issue #411's hook) -------------------------------------
    ctx.leap(OWN, 1)
    ctx.js('window.__skep.model.loadWhole(%s)' % json.dumps(OWN)); ctx.settle(); ctx.frames(2)
    doc = ctx.js('window.__skep.model.doc(%s)' % json.dumps(OWN))
    editable = ctx.js('(async () => (await import("./text/layer.js")).editable(%s))()' % json.dumps(OWN))
    before = corner_kept(ctx)
    r.check(bool(before) and before['pending'] and not before['word'] and editable and doc['from'] >= 0,
            "the own draft stands at reading scale as text the person may edit (issue #411), its corner's kept slot an empty box while no state is set",
            {'corner': before, 'editable': editable, 'extent': doc and doc['extent'], 'from': doc and doc['from']})

    def kept_check(word, state, reason):
        def check(w):
            # the kept line's second act where it stands in the corner at each of the three words, set in turn, then the row's
            # own word set again (issue #694)
            places = {}
            for each in KEPT_IDS:
                ctx.js('window.__skep.write.setKept(%s, %s)' % (json.dumps(OWN), json.dumps({'word': each, 'reason': None})))
                ctx.frames(2)
                places[each] = ctx.js(ACT_IN_CORNER % json.dumps(CORNER))
            ctx.js('window.__skep.write.setKept(%s, %s)' % (json.dumps(OWN), json.dumps({'word': word, 'reason': reason})))
            ctx.frames(2)
            act, first = t(ctx, 'B3.past-states'), places.get('kept')
            one = bool(first) and all(p and p['text'] == act and abs(p['dx'] - first['dx']) <= 0.5 and abs(p['dy'] - first['dy']) <= 0.5 for p in places.values())
            got, want = corner_kept(ctx), t(ctx, KEPT_IDS[word])
            vis = shown(ctx, CORNER + ' .kept-word')
            ok = bool(got) and got['word'] == want and got['id'] == KEPT_IDS[word] and not got['pending'] and len(vis) == 1
            # beside its column at the desktop width, at its head at the narrow one: every word inside the box it stands in
            return {'the word': (ok, {'corner': got, 'want': want, 'shown': len(vis)}),
                    "the corner's words in their boxes": fit_part(ctx, figures, state, w, CORNER),
                    'the act at one place whichever word stands': (one, places)}
        return check
    for word, state in (('kept', 'kept'), ('not yet kept', 'not-yet-kept'), ('not kept', 'not-kept')):
        reason = t(ctx, 'B3.own-bug') if word == 'not kept' else None
        ctx.js('window.__skep.write.setKept(%s, %s)' % (json.dumps(OWN), json.dumps({'word': word, 'reason': reason})))
        ctx.frames(2)
        shoot(state, kept_check(word, state, reason))
    # the save chord answered at the corner (K-74): the statement whole, once in a session
    ctx.js('window.__skep.write.setKept(%s, %s)' % (json.dumps(OWN), json.dumps({'word': 'kept', 'reason': None}))); ctx.frames(2)
    ctx.drv.key('s', mods=('Meta',)); ctx.frames(2)

    def save_check(w):
        got, want = corner_kept(ctx), sentence(ctx, 'B3.save.kept')
        ok = bool(got) and got['statement'] == want and got['statement_id'] == 'B3.save.kept' and got['word'] == t(ctx, 'B3.kept') and len(shown(ctx, CORNER + ' .kept-statement')) == 1
        return ok, {'corner': got, 'want': want}
    shoot('save-answered', save_check)
    ctx.js('(async () => { const L = await import("./text/layer.js"); L.openStatement(%s, false); })()' % json.dumps(OWN))
    ctx.js('window.__skep.write.setKept(%s, null)' % json.dumps(OWN)); ctx.frames(2)

    # ---- (d) B3-S1: the caret placed, typed at, kept (issue #411) ----------------------------------------------------
    paras = [b for b in doc['blocks'] if b['kind'] == 'para' and b['text'].strip()]
    target = paras[1] if len(paras) > 1 else paras[0]
    m = re.search(r'[A-Za-z]{3,}', target['text'])
    word = m.group(0) if m else 'the'
    ctx.leap(OWN, target['pos'])
    focus = ctx.js('window.__skep.view.focus()')
    r.check(bool(focus) and focus['kind'] == 'block' and focus['addr'] == OWN and focus['pos'] == target['pos'], "the landing's focus is the span at the position leapt to, the own draft's", focus)
    recentre = lambda: ctx.view_at(OWN, target['pos'])
    ctx.drv.key('Enter'); ctx.frames(2)

    def placed_check(w):
        c, marks = ctx.js('window.__skep.caret()'), shown(ctx, '#domlayer .caret-mark')
        kept = ctx.js('!!document.querySelector("#domlayer .caret-mark.kept")')
        ok = bool(c) and c['live'] and c['addr'] == OWN and c['pos'] == target['pos'] and len(marks) == 1 and not kept
        return ok, {'caret': c, 'marks_shown': len(marks), 'kept': kept}
    shoot('caret-placed', placed_check, recentre)
    # the caret moved a line up under the own draft's held head row at the narrow width (issue #436; FP-37), then put back
    under = caret_under_head(ctx, OWN)
    r.check(under['ok'], f"at {NARROW_PX} px, the own draft's corner at its head: the live caret moved up (K-71) under the held row brings the camera down alone, by the least pan, its mark at the row's bottom (issue #436)", under)
    ctx.js('(async () => (await import("./text/layer.js")).placeCaret(%s, %d))()' % (json.dumps(OWN), target['pos'])); ctx.frames(2)
    for ch in word:
        ctx.drv.key(ch)
    ctx.frames(2)

    def typed_check(w):
        c, edits = ctx.js('window.__skep.caret()'), ctx.js('window.__skep.write.edits(%s)' % json.dumps(OWN))
        text = fold(ctx.js('(window.__skep.mounted(%s) || {}).text || ""' % json.dumps(OWN)))
        typed = ''.join(e['text'] for e in edits)
        ok = (bool(c) and c['live'] and c['pos'] == target['pos'] + len(word.encode('utf8')) and typed == word and all(e['width'] == 0 for e in edits)
              and fold(word + target['text'][:12]) in text and len(shown(ctx, '#domlayer .caret-mark')) == 1)
        return ok, {'caret': c, 'edits': edits, 'word': word, 'text_holds': fold(word + target['text'][:12]) in text}
    shoot('caret-typed', typed_check, recentre)
    ctx.drv.key('Escape'); ctx.frames(2)

    def kept_caret_check(w):
        c, f = ctx.js('window.__skep.caret()'), ctx.js('window.__skep.view.focus()')
        marks = shown(ctx, '#domlayer .caret-mark.kept')
        ok = bool(c) and not c['live'] and c['addr'] == OWN and len(marks) == 1 and bool(f) and f['kind'] == 'block' and f['addr'] == OWN and f['pos'] == target['pos']
        return ok, {'caret': c, 'focus': f, 'kept_marks_shown': len(marks)}
    shoot('caret-kept', kept_caret_check, recentre)
    # the caret dropped and the edits cleared — page state alone — and the draft read again, so its text stands as the board holds it
    ctx.js('(async () => { const L = await import("./text/layer.js"), W = await import("./write/write.js"); L.dropCaret(); W.clearEdits(%s); L.bump(); })()' % json.dumps(OWN))
    ctx.js('window.__skep.model.invalidate(%s)' % json.dumps(OWN)); ctx.settle(); ctx.frames(2)
    r.check(ctx.js('window.__skep.caret()') is None and ctx.js('window.__skep.write.edits(%s).length' % json.dumps(OWN)) == 0, 'the caret is dropped and the edits cleared after the caret states', None)
    # a drag across two words of the own draft, then a key: the key's character in their place (FP-40; D5 K-70, K-72)
    dragged = drag_typed(ctx, OWN, target)
    figures['drag_typed'] = dragged

    def drag_typed_check(w):
        c, edits = ctx.js('window.__skep.caret()'), ctx.js('window.__skep.write.edits(%s)' % json.dumps(OWN))
        text = fold(ctx.js('(window.__skep.mounted(%s) || {}).text || ""' % json.dumps(OWN)))
        held = bool(dragged.get('shows')) and fold(dragged['shows']) in text
        ok = (dragged['ok'] and [{k: e[k] for k in ('pos', 'width', 'text')} for e in edits] == dragged['edits'] and c == {'addr': OWN, 'pos': dragged['sel']['pos'] + 1, 'live': True}
              and held and len(shown(ctx, '#domlayer .caret-mark')) == 1)
        return ok, {'dragged': dragged, 'caret': c, 'edits': edits, 'text_holds': held}
    shoot('drag-typed', drag_typed_check, recentre)
    let_go(ctx, OWN)
    # every other pointer route to a selection in the own draft: the caret at its moving end, the selection standing (FP-40)
    routes = drag_routes(ctx, OWN, target)
    figures['drag_routes'] = routes
    r.check(routes['ok'], "in a paragraph of the own draft, a drag backward leaves the caret live at the selection's start, the platform's selection running backward; Esc ends the selection with the caret live and a second Esc keeps it; a double-click selects its word — never its paragraph — the caret live at the word's end, and a key replaces the word alone; a Shift+click extends from the live caret, and from the kept caret, to the point clicked, the caret live there; and with nothing standing a Shift+click is a click (FP-40; D5 K-70, K-72, K-77)", routes)
    # a click placing the caret in another paragraph stands the walk on its span, so a slot chord at the caret acts there (B3-S13)
    later = [p for p in paras if p['pos'] > target['pos']]
    follows = click_follows(ctx, OWN, target, later[0] if later else next((p for p in paras if p['pos'] != target['pos']), None))
    r.check(follows['ok'], "a click placing the caret in another paragraph of the own draft stands the walk on that paragraph's span, and Mod+K at the caret draws the acts card at that span, never the span the walk stood on, selecting nothing (B3-S13; D5 K-70, K-100; issue #471)", follows)
    # Shift with the arrows at a live caret extends a selection from where the caret stood (D5 K-71, §1.6)
    extends = shift_extends(ctx, OWN, target)
    figures['shift_extends'] = extends
    r.check(extends['ok'], "Shift with the arrows at a live caret in the own draft moves it — Shift+↓ a line down, Shift+→ and Shift+← a character — and the selection runs from where it stood to it after each press, none where the two meet, the platform's selection the page's, nothing typed (D5 K-71, §1.6)", extends)
    # a key at a live caret replaces the selection drawn in its text, and an arrow without Shift ends it (D5 K-71, K-72; D6 BM-75)
    replaces = shift_replaces(ctx, OWN, target)
    figures['shift_replaces'] = replaces
    r.check(replaces['ok'], "at a live caret in the own draft with a selection drawn from it, a printable key replaces the selection and Backspace takes it out, the caret after what the key put in, and ← puts the caret at the selection's start; after each, no selection stands — the page's none, the platform's collapsed — and no card (D5 K-71, K-72; D6 BM-70, BM-75)", replaces)
    # Home and End move a live caret along its line, and a LEAP to another span of the draft leaves the caret kept (D5 K-71, M-13, M-2)
    wrapped = max(paras, key=lambda p: len(p['text']))
    ends = home_end_leap(ctx, OWN, wrapped, next((p for p in paras if p['pos'] != wrapped['pos']), None))
    figures['home_end_leap'] = ends
    r.check(ends['ok'], "at a live caret in a wrapped paragraph of the own draft, End puts the caret at its line's end — its mark against the line's last character, the next line on a line box below — and Home at the paragraph's start, neither moving the camera or the walk; a LEAP to another paragraph of the draft then leaves the caret kept, its mark hollow, and a printable key there is answered by the draft's own line, nothing typed (D5 K-71, M-13, M-2)", ends)
    # the kept caret's span holds the walk through the wheel's re-take while a line of it stands in view (B3-S1; D5 §4 rule 3)
    held_span = kept_span_held(ctx, OWN, target)
    figures['kept_span_held'] = held_span
    r.check(held_span['ok'], "Esc at a live caret in the own draft after typing, then the wheel over the plane a few lines, the caret's paragraph still in view and another element under the view's centre: the re-take leaves the walk on the kept caret's span, and a printable key there returns the caret and types at it (B3-S1; D5 §4 rule 3, K-77)", held_span)
    # Shift with ← or → at the kept caret's span returns the caret and extends a selection from it (B3-S1; D5 K-70, K-77)
    extends_kept = kept_span_extends(ctx, OWN, target)
    figures['kept_span_extends'] = extends_kept
    r.check(extends_kept['ok'], "at the kept caret's span in the own draft, Shift+→ and Shift+← return the caret live a character on and back, each selecting the character between from the caret, the platform's selection the page's; at the draft's first position, K-8's selection standing over the span, Shift+← returns the caret and the platform's selection stands over that span as K-8 left it, never collapsed at the caret; nothing typed (B3-S1; D5 K-70, K-77)", extends_kept)
    # the lit block is the walk's span where the text typed above it moved it (D3; D5 §4 rule 2; K-72)
    lit = lit_after_typing(ctx, OWN, target)
    figures['lit_after_typing'] = lit
    r.check(lit['ok'], "with `ab` typed at the start of a paragraph of the own draft and the caret kept, ↓ walks to a later span and the block drawn lit is that span where the text shown holds it, past `ab` (D3; D5 §4 rule 2, K-72; issue #491)", lit)
    # a typed draft's walk, find and Back land on the typed words, at the desktop width and at the narrow one (the
    # unsent-typing decision; issues #518, #523, #526)
    was = ctx.resize(*WIDE)
    try:
        for w, h in (WIDE, NARROW):
            ctx.resize(w, h); ctx.settle(10); ctx.frames(3)
            lands = typed_lands(ctx, OWN, target, DOC)
            figures['typed_lands_w%d' % w] = lands
            r.check(lands['ok'], f"at {w} px, with a line typed above a paragraph of the own draft — text the board does not hold — the walk's ↑ from that paragraph lands on the typed line and its mirror item reads the typed words, the find finds its first word there, outlined and left selected, and Back from another place lands on the typed line with a line of it in the window (the unsent-typing decision §1 (a), §2; issues #518, #523, #526)", lands)
    finally:
        ctx.resize(*was); ctx.frames(3)

    # ---- (e) B3-S13: the swallow's draft form at a span with no caret (K-72) ---------------------------------------------
    ctx.leap(OWN, target['pos'])
    ctx.drv.key('x'); ctx.frames(2)
    said_at_key = live(ctx)

    def swallow_check(w):
        want, got = hint_whole(ctx, 'B3.caret.enter', values=drawn_keys(ctx, 'B3.caret.enter')), hint(ctx)
        ok = (got['hint'] == {'id': 'B3.caret.enter', 'words': want, 'by': 'edge'} and got['seen'] and not got['line'] and ctx.js('window.__skep.caret()') is None
              and said_at_key == heard(ctx, want))
        return ok, {'got': got, 'want': want, 'status_region': said_at_key}
    shoot('swallow-draft', swallow_check)
    # the person's next act takes the hint down (O-HINT's `act`); none of what follows is an act of theirs
    ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()'); ctx.frames(2)
    r.check(hint(ctx)['hint'] is None, "the next act takes the swallow's hint down", hint(ctx))

    # ---- (e′) B3-S13: a printable key at the own draft's corner names the way back to its text (K-72; D6 BM-52) -----------
    def corner_check(w):
        got = corner_key(ctx, OWN)
        return got['ok'], got
    shoot('corner-way-back', corner_check, lambda: ctx.leap(OWN, target['pos']))
    ctx.leap(OWN, target['pos'])
    way_back = corner_back(ctx, OWN)
    figures['corner_back'] = way_back
    r.check(way_back['ok'], "Shift+Tab from the own draft's corner, after a printable key there, returns the focus to the plane's stop on the own draft's span, where `x` is answered at the text's edge by the draft's own line (B3.caret.enter) — the way back the corner's line names (B3-S13; D5 K-72; D6 BM-52)", way_back)
    ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()'); ctx.frames(2)

    # ---- (e″) the whole document's entry: the seeded staging draft selected whole and copied through the door (FP-18) ----------
    try:
        figures['whole_entry'] = whole_entry(ctx, r)
    except Exception as e:  # a figure that throws is recorded so; the states after it still run
        import traceback
        r.check(False, "the whole document's entry was measured", {'error': str(e), 'trace': traceback.format_exc()[-1500:]})
    ctx.leap(OWN, target['pos'])

    # ---- (f) B3-S2: the moved scene's held version as a derived pane (issue #411; D6 BM-14) ---------------------------------
    first = paras[0]
    held_row = {'held': 1, 'doc': OWN, 'base': health0.get('log_position') or 0, 'frame': {'op': 'insert', 'd': OWN, 'at': {'ordinal': target['pos'], 'subspace': 1}, 'values': [first['text'] + '\n']},
                'anchors': None, 'cause': 'stopped', 'sent': False, 'time': 0, 'refusal': None}
    n_calls = len(page_calls(ctx))
    opened = ctx.js('window.__skep.scene.openHeld(%s, %s)' % (json.dumps(OWN), json.dumps([held_row])))
    ctx.settle(); ctx.frames(3)

    def scene_check(w):
        panes = ctx.js('window.__skep.scene.panes()') or {}
        pa, pb = panes.get('a') or {}, panes.get('b') or {}
        compared = [c for c in page_calls(ctx)[n_calls:] if c['op'] == 'compare']
        inserted = any(b['pos'] == target['pos'] and fold(b['text']).startswith(fold(first['text'])[:24]) for b in pb.get('blocks') or [])
        # each pane stands in view with an article in it; an article is taller than its pane and scrolls, so the pane is what is held in view
        panes_shown = ctx.js('["sceneA", "sceneB"].map((id) => { const p = document.getElementById(id); const q = p ? p.getBoundingClientRect() : null; return !!p && !!p.querySelector("article.dtext") && !!q && q.width > 0 && q.height > 0 && q.left >= 0 && q.right <= window.innerWidth + 0.5; })')
        ok = (bool(opened) and opened['shown'] and opened['applied'] == 1 and opened['stopped'] is None and ctx.js('window.__skep.scene.isOpen()')
              and pa.get('doc') == OWN and not pa.get('derived') and pb.get('derived') is True and inserted and not compared and all(panes_shown))
        text, bar = ctx.js(PANE_TEXT), {k: len(shown(ctx, '#scenebar [%s]' % k)) for k in ('data-relevel', 'data-x')}
        return {'the scene': (ok, {'opened': opened, 'a': {k: pa.get(k) for k in ('doc', 'derived', 'kind')}, 'b': {k: pb.get(k) for k in ('doc', 'derived', 'kind')},
                                   'inserted': inserted, 'compare_calls': len(compared), 'panes_shown': panes_shown}),
                "the panes' text": (all(p['px'] is not None and abs(p['px'] - p['reading']) < 1e-6 and p['over'] <= 1 for p in text), text),
                'the bar': (bar == {'data-relevel': 1, 'data-x': 1}, {'shown': bar})}
    shoot('moved-scene', scene_check, marks={NARROW_PX: {'the bar': '#489'}})
    ctx.js('window.__skep.scene.close()'); ctx.frames(2)

    # ---- (g) B3-S2: STOPPED — the `daemon` event fired by hand (D6 BM-9) -----------------------------------------------------
    ctx.leap(OWN, 1)
    fired = ctx.fire('daemon', {'board': board_id, 'state': 'stopped'})
    came = wait_for(ctx, 'window.__skep.model.daemon() === "stopped"')

    def stopped_check(w):
        want, seg = t(ctx, 'F.daemon.notebook.stopped'), line_segment(ctx, 'F.daemon.notebook.stopped')
        vis = shown(ctx, '#line [data-string="F.daemon.notebook.stopped"]')
        ok = came and seg == want and len(vis) == 1
        return ok, {'fired': fired, 'segment': seg, 'want': want, 'daemon': ctx.js('window.__skep.model.daemon()'), 'shown': len(vis)}
    shoot('stopped', stopped_check)
    ctx.fire('daemon', {'board': board_id, 'state': 'running'})
    back = wait_for(ctx, 'window.__skep.model.daemon() === "running" && !document.querySelector(%s)' % json.dumps('#line [data-string="F.daemon.notebook.stopped"]'))
    r.check(back, 'the `daemon` event fired running again takes the stopped segment down', {'daemon': ctx.js('window.__skep.model.daemon()'), 'segment': line_segment(ctx, 'F.daemon.notebook.stopped')})

    # ---- (h) the `held` event reaches the page: the stream end to end; the state it names is drawn by nothing yet (U4) --------
    n0 = ctx.js('window.__skep.boot.heldSeen.length')
    ctx.fire('held', {'board': board_id, 'session': sid, 'doc': OWN, 'held': 1, 'state': 'holding', 'cause': 'stopped'})
    got = wait_for(ctx, 'window.__skep.boot.heldSeen.length > %d' % n0)
    last = ctx.js('window.__skep.boot.heldSeen.at(-1)')
    r.check(got and bool(last) and last.get('doc') == OWN and last.get('state') == 'holding',
            "a `held` event fired by hand reaches the page's subscriber as the shell's would — the page logs it and draws nothing (the machine, U4)", last)

    # ---- (i) #327: the dotted route's intake — a canned `publication.open` answer and a `publication` event, on the page's port ----
    ctx.js('window.__gatePub = []; (async () => { const P = await import("./bridge/port.js"); P.on("publication", (d) => window.__gatePub.push(d)); })()')
    seq = ctx.editor_seq()
    armed = ctx.arm('publication.open', answer=PANEL)
    r.check((armed.get('result') or {}).get('armed') == 'publication.open', "the seam arms `publication.open`'s next answer on the harness's provider", armed)
    if (armed.get('result') or {}).get('armed') == 'publication.open':
        answer = ctx.js('(async () => { const P = await import("./bridge/port.js"); return await P.publication.open({session: %s, draft: %s}); })()' % (json.dumps(sid), json.dumps(OWN)))
        consumed = ctx.consumed('publication.open', seq)
        r.check(answer == {'result': PANEL} and consumed,
                '#327: the canned `publication.open` answer reaches the page through its own port exactly as armed, and the provider logs the call `canned` — no dial, no write',
                {'answer': answer, 'consumed': consumed})
    ctx.fire('publication', {'board': board_id, 'session': sid, 'draft': OWN, 'state': 'sent'})
    got = wait_for(ctx, 'window.__gatePub.length >= 1')
    ev = ctx.js('window.__gatePub[0] || null')
    r.check(got and bool(ev) and ev.get('state') == 'sent' and ev.get('draft') == OWN, "#327: a `publication` event fired by hand reaches the page's subscriber through the stream", ev)

    # ---- (j) B3-S2: the death's arm that cannot re-open — `session-died` fired by hand (D6 BM-24; FP-29, FP-32) ---------------
    store = ctx.key_store()
    fp = next((row.get('fingerprint') for row in store['rows'] if row.get('fingerprint')), None)
    ctx.leap(OWN, 1)
    ctx.fire('session-died', {'session': sid, 'reason': {'arm': 'retired', 'fingerprint': fp, 'own': True if fp else None, 'hand': None, 'position': None, 'label': None}})
    fell = wait_for(ctx, 'window.__skep.model.session() === null && window.__skep.line().state === 5')
    covered = wait_for(ctx, 'window.__skep.model.doc(%s).refused === "withheld"' % json.dumps(OWN), 15)
    ctx.settle(); ctx.frames(2)
    said = live(ctx)

    def death_check(w):
        want, seg = t(ctx, 'C-137.self'), line_segment(ctx, 'C-137.self')
        signin = ctx.js('(() => { const b = document.querySelector("#line [data-act=signin]"); return b ? b.textContent : null; })()')
        d, mounted = ctx.js('window.__skep.model.doc(%s)' % json.dumps(OWN)), ctx.js('window.__skep.mountedAddrs()')
        vis = {k: len(shown(ctx, s)) for k, s in (('segment', '#line [data-string="C-137.self"]'), ('sign_in', '#line [data-act=signin]'))}
        ok = (fell and covered and seg == want and signin == t(ctx, 'F.sign-in') and vis == {'segment': 1, 'sign_in': 1} and d['refused'] == 'withheld'
              and OWN not in mounted and ctx.js('window.__skep.model.session()') is None)
        return ok, {'fell': fell, 'covered': covered, 'segment': seg, 'want': want, 'sign_in': signin, 'shown': vis, 'refused': d['refused'], 'mounted': OWN in mounted}
    shoot('death-retired', death_check)
    r.check(said.startswith(t(ctx, 'C-137.self')) and OWN in said, "the status region says the ending once, then what it covered — the own draft among it (issue #177)", said[:300])
    # the dead page's session on the harness's provider closed by the page's own `close(session)`, which writes nothing to the board
    closed = ctx.js('(async () => { const P = await import("./bridge/port.js"); return "result" in await P.close({session: %s}); })()' % json.dumps(sid))
    r.check(closed, "the page's session on the harness's provider is closed by the page's own `close(session)` before the page is left", closed)
    leave_page()

    # ---- (k) B3-S2: writes halted — a canned `health` answer armed before the page's boot (D6 BM-9) --------------------------------
    if not health_answer or 'result' not in health_answer:
        r.check(False, 'the page recorded the `health` answer as the shell gave it — what the halted arm is cut from', health_answer)
        red('writes-halted', {'health_answer': health_answer})
    else:
        canned = copy.deepcopy(health_answer['result'])
        canned['health'] = dict(canned['health'], writes={'halted': True})
        seq = ctx.editor_seq()
        armed = ctx.arm('health', answer=canned)
        r.check((armed.get('result') or {}).get('armed') == 'health', "the seam arms `health`'s next answer before the page's boot", armed)
        ctx.open_editor_page('all')
        consumed = ctx.consumed('health', seq)

        def halted_check(w):
            want, seg = t(ctx, 'F.daemon.notebook.halted'), line_segment(ctx, 'F.daemon.notebook.halted')
            h = ctx.js('window.__skep.model.health()')
            vis = shown(ctx, '#line [data-string="F.daemon.notebook.halted"]')
            ok = consumed and seg == want and bool(h) and (h.get('writes') or {}).get('halted') is True and ctx.js('window.__skep.model.session()') is not None and len(vis) == 1
            return ok, {'consumed': consumed, 'segment': seg, 'want': want, 'writes': h and h.get('writes'), 'shown': len(vis)}
        shoot('writes-halted', halted_check)
        leave_page()

    # ---- (s) B3-S1, B3-S8: starting a document from the box, select-all at its caret, and the launch after the case's own write ---
    try:
        start_rows(ctx, r, rows, shoot, red, sent, ops_allowed, figures, leave_page)
    except Exception as e:  # a state that throws leaves its rows red; the rest of the case still runs
        import traceback
        r.check(False, 'the start\'s rows ran to their end', {'error': str(e), 'trace': traceback.format_exc()[-1500:]})
    leave_page()

    # ---- (m) the machine's page: the case's own draft, minted on the test board; its typing kept by the real board; then the
    # held, refused, handed-over, moved, halted, second-window and full states, each armed on the harness's provider -------------
    try:
        machine_rows(ctx, r, rows, shoot, red, sent, ops_allowed, figures)
    except Exception as e:  # a state that throws leaves its rows red; the sweep and the write check still run
        import traceback
        r.check(False, 'the machine\'s rows ran to their end', {'error': str(e), 'trace': traceback.format_exc()[-1500:]})
    leave_page()

    # ---- (n) B3-S2: the held bars at reopen — the machine's page opened again over an armed `held(session)` list ------------------
    if figures.get('minted') and rows['held-bars']['outcome'] == 'pending':
        try:
            reopen_rows(ctx, r, shoot, red, figures['minted'])
        except Exception as e:
            import traceback
            r.check(False, 'the reopen\'s rows ran to their end', {'error': str(e), 'trace': traceback.format_exc()[-1500:]})
        leave_page()

    # ---- (l) the sweep, the signed page again, the write check over the harness's provider's log ---------------------------------
    cleared = ctx.clear_arms()
    r.check(not cleared, 'every arm the case made was served to the page; the sweep had none to serve', cleared)
    figures['arms'] = [{'call': a['call'], 'seq': a['seq']} for a in ctx.armed]
    figures['cleared'] = cleared
    ctx.open_page('all')
    health1 = ctx.health()
    log = [e for e in ctx.editor_log() if e['seq'] > seq0]
    dials = Counter((e.get('method'), e.get('path')) for e in log if e['kind'] == 'dial')
    calls = Counter((e.get('call'), e.get('outcome')) for e in log if e['kind'] == 'call')
    bad_dials = sorted(f'{m} {p}' for (m, p) in dials if (m, p) not in READ_PATHS)
    canned_only = lambda c: str(c).startswith('publication.') or str(c).startswith('merge.') or c == 'resolve'
    bad_calls = sorted(f'{c} ({o})' for (c, o) in calls if not (c in READ_ROWS or c == SEAM or (canned_only(c) and o == 'canned')))
    bad_page_calls = sorted({c for c in sent['calls'] if not (c in READ_ROWS or canned_only(c))})
    canned_calls = sorted(f'{c}' for (c, o) in calls if o == 'canned')
    # a write frame is the mint of the case's own draft, or names that draft: no seeded document is ever written
    minted = set(sent['minted'])
    bad_writes = [w for w in sent['writes'] if not (w[0] == 'create_new_document' or w[1] in minted)]
    r.check(not bad_dials, "every dial the harness's provider made for the editor pages names a route the read path dials (READ_PATHS)", {'bad': bad_dials, 'dials': {f'{m} {p}': n for (m, p), n in dials.items()}})
    r.check(not bad_calls, "every call in the harness's provider's log is a reading row, or a publication, merge or `resolve` call it answered canned — a canned answer composes no write (the owner's ruling on #327)", {'bad': bad_calls, 'calls': {f'{c} ({o})': n for (c, o), n in calls.items()}})
    r.check(not bad_page_calls, 'every call the editor pages made is a reading row, or a publication, merge or `resolve` call', {'bad_calls': bad_page_calls})
    r.check(not bad_writes and bool(minted), "every write frame the editor pages sent is the mint of the case's own draft or names that draft: no seeded document is written", {'bad': bad_writes[:8], 'writes': len(sent['writes']), 'minted': sorted(minted)})
    figures['write_check'] = {'dials': {f'{m} {p}': n for (m, p), n in dials.items()}, 'calls': {f'{c} ({o})': n for (c, o), n in calls.items()}, 'canned': canned_calls,
                              'writes': dict(Counter(w[0] for w in sent['writes'])), 'minted': sorted(minted),
                              'log_position_before': health0.get('log_position'), 'log_position_after': health1.get('log_position'), 'seam_logged_as_call': any(c == SEAM for (c, _) in calls)}
    return out()
