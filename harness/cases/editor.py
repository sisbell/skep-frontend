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
(`held-bars`, `reopen_rows`).
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
subscriber. At the narrow width, where the own draft's corner stands at its
head, the live caret moved up under the head's held row brings the camera
down alone, the caret's mark at the row's bottom (`caret_under_head`; issue
#436). A person's click in another paragraph of the own draft places the
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
bytes — 6.27 MB at the owner's seed — which a LEAP reads whole and a scene
pane cannot show, so it is not the one driven.

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
import re
import time
from collections import Counter

from . import DOC, Result, WINDOW
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
         claim='the corner shows "kept" in its fixed-width slot (B3.kept)'),
    dict(screen='B3-S1', state='save-answered', walk='W-08', step=2, drawn=True,
         how='Mod+S at the corner while the word is kept (K-74)',
         claim='the statement opens whole on its own line: "nothing to save — everything here is kept" (B3.save.kept)'),
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
    dict(screen='B3-S1', state='mint-row', walk='W-08', step=2, drawn=False,
         how="the LEAP box's creation row and the one line's segment at a mint (A-63)", claim='',
         why='the composer (U3): no `create_new_document` is composed'),
    dict(screen='B3-S1', state='launch', walk='W-08', step=7, drawn=False,
         how="the launch at the account's newest own write (D6 BM-53)", claim='',
         why="the launch's search for the newest own row (S1 #17)"),
    # B3-S2 — the kept state and the held text (W-08 step 7 and its failure arms)
    dict(screen='B3-S2', state='not-yet-kept', walk='W-08', step=7, drawn=True,
         how="`write.setKept(own, {word: 'not yet kept'})` (D6 BM-8)",
         claim='the corner shows "not yet kept" in its slot (B3.not-yet-kept)'),
    dict(screen='B3-S2', state='not-kept', walk='W-08', step=7, drawn=True,
         how="`write.setKept(own, {word: 'not kept', reason})`, the reason the refused run's own-bug words (D6 BM-10)",
         claim='the corner shows "not kept" in its slot (B3.not-kept); Mod+S would answer with the reason'),
    dict(screen='B3-S1', state='kept-on-board', walk='W-08', step=2, drawn=True,
         how="the machine handed in (`machine=1`): keys typed at a caret in the case's own minted draft, committed at their punctuation (D6 BM-1, BM-2, BM-6)",
         claim='the typed words reach the test board as one composed `insert`, acked, and the corner reads "kept" (B3.kept); the read that follows holds them and the page\'s edits are gone, the text shown the same'),
    dict(screen='B3-S2', state='held-in-session', walk='W-08', step=7, drawn=True,
         how="arm `op` to answer `held` and `held` to list the line; type; fire `daemon` unreachable (D6 BM-8, BM-78)",
         claim='the corner reads "not yet kept" (B3.not-yet-kept), its reason on the word\'s own act — "not yet kept — held on this device and sent when your notebook answers" (B3.kept.held) — the daemon segment in its held form (B3.daemon.held.notebook), the held words standing in the text with no margin mark beside them: a line merely held is unmarked (J5)'),
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
         claim='the corner reads "not yet kept"; the held words carry the held bar while the face asks about them (D8); the face says the document changed (B3.moved) and names the hand in its slot (B3.hand.device), with "see the held text", "send again" inert (B3.moved.send-again.inert) and the discard, its statement ending on its exit (B3.moved.discard)'),
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
         claim='the one line reads the halt\'s damaged form, what becomes of the words it holds and its cause (B3.store_halted.damaged, .unsent, .damaged.cause) with "show the file" (B3.show-file); a key at the caret adds no edit and is answered by the halt\'s caret line (B3.store_halted.caret)'),
    dict(screen='B3-S2', state='second-window', walk='W-08', step=7, drawn=True,
         how="fire `another-window` {board, another_window: true} (D6 BM-60)",
         claim='the one line reads "this window reads only and keeps nothing you type — …" (B3.another_window) with "copy this address" (B3.copy-address); a key at the caret adds no edit and is answered by that line'),
    dict(screen='B3-S2', state='held-full', walk='W-08', step=7, drawn=True,
         how='arm `op` with the refusal `held_full`; type; then fire `held` kept as the store drains (D6 BM-19, BM-20)',
         claim='the one line reads the bound\'s line (B3.held_full.line); the refused change carries the refused mark and waits under the head "not kept" with its statement (B3.held_full.refused), "send again" inert; a key at the caret is answered by the bound\'s caret line (B3.held_full.caret); as the store drains the page sends the waiting change itself'),
    # B3-S3 … B3-S13
    dict(screen='B3-S3', state='undo-lines', walk='W-08', step=5, drawn=True,
         how="Mod+Z in the case's own draft before anything is typed in it — an empty stack (K-75; D6 BM-42) — then the hint's own act",
         claim='the hint beside the focus reads "nothing to undo in this draft this session — its past states hold what came before" (B3.undo.empty), whole at its first press in the session and ending on the constant sentence, "a link you made public stays until you retract it at its card" (B3.undo.constant), inside the window below the one line and said in the status region; a later press shows its first clause alone, and its act opens it whole again; nothing is sent'),
    dict(screen='B3-S4', state='deletion-face', walk='W-08', step=8, drawn=True,
         how="Backspace over kept words at the caret in the case's own draft; the burst's commit composes the `delete` (D6 BM-51)",
         claim='the deletion face stands whole at the removal point, in the margin beside its line or over the lines beneath it — "still here — for as long as this board retains it; …" (C-49), then "you alone can still reach what you remove" (B3.deletion.private) — its mark named "removed here" (B3.removed-here), inside the window, taking no focus and no key: the caret stands live where it stood; the `delete` reaches the test board and is acked'),
    dict(screen='B3-S5', state='paste-quote', walk='W-08', step=4, drawn=False,
         how="the paste's reader half and the quote's pick", claim='', why="no paste is made at a caret — Mod+V there stays the platform's (K-93) — and the pick overlay is unbuilt: #578's paste quote form"),
    dict(screen='B3-S6', state='picker', walk='W-08', step=4, drawn=False,
         how='the type picker over two held passages', claim='', why="the picker module; a pane's selection (#29, #94)"),
    dict(screen='B3-S7', state='past-states', walk='W-08', step=8, drawn=False,
         how="arm `changes` before the list's read (D6 BM-49)", claim='',
         why='the past-states list (S7 #87): the page reads `changes` only at a catch-up, so no arm is made'),
    dict(screen='B3-S7', state='past-state-pane', walk='W-08', step=8, drawn=False,
         how="a past state's record in the right pane (`recordAt` off an `/op-at` read)", claim='',
         why="the history read's acts (S7 #84, #88): no act reads a past state"),
    dict(screen='B3-S8', state='select-all', walk='—', step=0, drawn=False,
         how='Mod+A at a caret (K-93)', claim='', why="the whole-document span by the page's own act (S8 #94)"),
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
         claim='the hint beside the focused line reads "Enter places a caret here" (B3.caret.enter), inside the window below the one line'),
    dict(screen='B3-S13', state='corner-way-back', walk='W-08', step=4, drawn=True,
         how="Tab from the walk's span of the own draft to its corner, then a printable key at the corner (K-72; D6 BM-52)",
         claim='the hint beside the own draft\'s corner reads "your text is back with Shift+Tab" (B3.caret.back), inside the window below the one line and said in the status region, no caret placed and nothing typed'),
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
    """a hint's notice whole, or its compact form (`strings.js`'s `hintOf`), its tokens filled"""
    return ctx.js('(async () => { const h = (await import("./strings.js")).hintOf(%s, %s); return %s ? h.whole : h.clause; })()' % (json.dumps(sid), json.dumps(values or {}), 'true' if whole else 'false'))


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
    got, said, want = hint(ctx), live(ctx), t(ctx, 'B3.caret.back')
    anchor = ctx.js('(() => { const h = window.__skep.hint(); return h && h.placed ? h.placed.anchor : null; })()')
    caret, edits = ctx.js('window.__skep.caret()'), ctx.js('window.__skep.write.edits(%s).length' % json.dumps(doc))
    beside = bool(anchor and box) and all(abs(anchor[k] - box[k]) <= 1 for k in ('x', 'y', 'w', 'h'))
    ok = (at['corner'] == doc and got['hint'] == {'id': 'B3.caret.back', 'words': want, 'by': 'beside'} and got['seen'] and beside and not got['line']
          and said == want and caret is None and edits == 0)
    return {'ok': ok, 'focus': at, 'hint': got, 'want': want, 'anchor': anchor, 'stop': box, 'status_region': said, 'caret': caret, 'edits': edits,
            'ops_after': [c['op'] for c in page_calls(ctx)[n:] if c['name'] == 'op']}


def corner_back(ctx, doc):
    """THE WAY BACK THE CORNER's LINE NAMES (B3-S13: "your text is back with Shift+Tab"): `doc`'s corner reached and a key
    pressed there as `corner_key` does, then Shift+Tab, then `x`; the corner's state, where Shift+Tab put the focus, the
    hint and whether it held: the corner's state held, the focus back on the mirror's current item with the walk on a span
    of `doc`, and `x` there answered at the text's edge by the draft's own line, "Enter places a caret here"
    (B3.caret.enter), no caret placed and nothing typed"""
    first = corner_key(ctx, doc)
    ctx.drv.key('Tab', mods=('Shift',)); ctx.settle(); ctx.frames(2)
    at = ctx.js(FOCUS_AT)
    ctx.drv.key('x'); ctx.frames(2)
    got, want = hint(ctx), t(ctx, 'B3.caret.enter')
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


def write_state(ctx, addr):
    """what D6's machine holds of a draft, as the gate's hook reads it (`write.state`)"""
    return ctx.js('window.__skep.write.state(%s)' % json.dumps(addr))


# the margin's marks beside some words of a document's text shown, as the last frame placed them (the gate's `margin`): every
# mark standing for the document, the words' glyph boxes' top, foot and right edge, and the marks of a kind standing beside
# them — spanning their lines from the top of the first to the foot of the last, at the right of their column's text — with
# the word "held" standing in the document's edges
MARGIN_BESIDE = '''((doc, pos, width, kind) => {
  const words = (window.__skep.spanRects(doc, pos, width) || []).filter((q) => q.w > 0 && q.h > 0), marks = window.__skep.margin().filter((m) => m.addr === doc);
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
        for state in ('undo-lines', 'kept-on-board', 'held-in-session', 'row-inert', 'refused-run', 'hand-over', 'moved-face', 'halted-store', 'second-window', 'held-full', 'deletion-face', 'held-bars'):
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
        for st in ('undo-lines', 'kept-on-board', 'held-in-session', 'row-inert', 'refused-run', 'hand-over', 'moved-face', 'halted-store', 'second-window', 'held-full', 'deletion-face', 'held-bars'):
            red(st, 'the case\'s own draft did not mount')
        return
    # ---- B3-S3: Mod+Z on an empty stack, before anything is typed in the draft (K-75; BM-42) ----------------------------------
    caret_end(line0)
    writes0 = len(ctx.js('window.__skep.bridge.calls().filter((c) => c.name === "op" || c.name === "resolve")'))
    empty, empty_clause, constant = hint_whole(ctx, 'B3.undo.empty'), hint_whole(ctx, 'B3.undo.empty', False), t(ctx, 'B3.undo.constant')

    def empty_check(w):
        ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()'); ctx.frames(1)
        ctx.drv.key('z', mods=('Meta',)); ctx.frames(3)
        first, said = dict(hint(ctx), full=ctx.js('window.__skep.hint()')), live(ctx)
        f = first['full'] or {}
        if w == WIDE[0]:
            ok = f.get('id') == 'B3.undo.empty' and f.get('open') and f.get('words') == empty and f.get('ending') == constant and said == empty + ' ' + constant and first['seen']
        else:
            # a later press in the session: its first clause alone; its own act opens it whole again
            ok = f.get('id') == 'B3.undo.empty' and not f.get('open') and f.get('words') == empty_clause and f.get('ending') is None and said == empty_clause and first['seen']
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
              and [x['held'] for x in st['held']] == [k] and said == {'id': 'B3.kept.held', 'text': t(ctx, 'B3.kept.held')} and seg == t(ctx, 'B3.daemon.held.notebook')
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
    minutes = ctx.js('new Intl.NumberFormat(undefined, {style: "unit", unit: "minute", unitDisplay: "long"}).format(2)')

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
        f, got, st = show_face(), corner_word(), state()
        ok = (bool(got) and got['id'] == 'B3.not-yet-kept' and st['kept']['cause']['token'] == 'moved' and bool(f) and f['head'] is None and [x['id'] for x in f['lines']] == ['B3.moved']
              and f['lines'][0]['text'] == t(ctx, 'B3.moved') and f['hands'] == [{'id': 'B3.hand.device', 'text': t(ctx, 'B3.hand.device', {'device label': 'desk'})}]
              and [(a['run'], a['id'], a['inert']) for a in f['acts']] == [('held', 'B3.moved.see-held', None), ('send', 'B3.send-again', 'B3.moved.send-again.inert'), ('discard', 'B3.discard', None)]
              and f['said'] == {'id': 'B3.moved.discard', 'text': t(ctx, 'B3.moved.discard'), 'parts': 3, 'exit': True, 'below': True})
        m = margin_beside(ctx, mine, len(line1.encode('utf8')) + 1, len(' Moved.'), 'held')
        return {'the corner and the face': (ok, {'corner': got, 'kept': st['kept'], 'face': f}),
                'the held bar (D8)': (m['words'] > 0 and m['beside'] == 1 and [x['kind'] for x in m['marks']] == ['held'] and len(m['held']) == 1 and m['held'][0]['text'] == t(ctx, 'B3.held'), m)}
    shoot('moved-face', moved_check, recentre)
    ctx.js('(async () => (await import("./overlays/host.js")).dismiss())()'); ctx.frames(2)
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
    r.check(bool(told['hint']) and told['hint']['id'] == 'B3.moved.first-key' and told['hint']['words'] == t(ctx, 'B3.moved.first-key') and behind and ctx.consumed('op', seq),
            'the first key typed after the moved verdict is typed, held behind the moved line, and followed at the focus by "this document changed while your text was held — what you type now is held with it and placed by hand" (B3.moved.first-key)',
            {'hint': told['hint'], 'behind': behind})
    ctx.js('(async () => { (await import("./overlays/hint.js")).act(); })()')
    show_face()
    ctx.arm('resolve', answer={'may_have_landed': [k]})
    ctx.arm('held', answer=[])
    ctx.js('document.querySelector("#overlay [data-run=discard]").click()')
    warned = wait_for(ctx, '!!document.querySelector(%s)' % json.dumps('#line [data-string="B3.discarded.may-have-landed"]'), 10)
    wait_for(ctx, 'window.__skep.write.state(%s).kept.word === "kept"' % json.dumps(mine), 10)
    r.check(warned and line_segment(ctx, 'B3.discarded.may-have-landed') == t(ctx, 'B3.discarded.may-have-landed') and state()['held'] == [] and first_line() == line1,
            'the moved document\'s discard, from its first moved line, takes every later line with it — the held words gone from the text shown — and, the answer naming a line that may have landed, the one line says "discarded here — it may already be on the board"',
            {'warned': warned, 'line': line_segment(ctx, 'B3.discarded.may-have-landed'), 'held': state()['held'], 'shown': first_line()})
    ctx.js('(async () => (await import("./overlays/host.js")).dismiss())()')
    ctx.drv.key('Escape'); ctx.frames(2)
    quiet()

    # ---- B3-S2: the halted store (BM-30) ---------------------------------------------------------------------------------------
    edits0 = ctx.js('window.__skep.write.edits(%s).length' % json.dumps(mine))
    ctx.arm('held', refusal={'kind': 'shell', 'name': 'store_halted', 'why': 'damaged'})
    ctx.fire('held', {'board': board_id, 'session': sid, 'doc': mine, 'held': 0, 'state': 'kept'})
    halted = wait_for(ctx, '(window.__skep.write.state(%s).unwritable || {}).why === "store_halted"' % json.dumps(mine), 10)
    caret_end(line1)

    def halted_check(w):
        want = '%s %s %s' % (t(ctx, 'B3.store_halted.damaged'), t(ctx, 'B3.store_halted.unsent'), t(ctx, 'B3.store_halted.damaged.cause'))
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
    undo_rows(ctx, r, shoot, red, ops_allowed, dict(mine=mine, sid=sid, board_id=board_id, corner=corner, state=state, recentre=recentre, quiet=quiet, caret_end=caret_end, press=press,
                                                    corner_word=corner_word, first_line=first_line, hold_typed=hold_typed, held_row=held_row, drop_all=drop_all, refusal=refusal))


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
    said_of = lambda sid_, words: t(ctx, sid_, {'first words': words})

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
    r.check(len(opened) == 1 and opened[0]['whole'] is True and [p['id'] for p in opened[0]['parts']] == ['C-49', 'B3.deletion.private'] and live(ctx) == '%s %s' % (t(ctx, 'C-49'), t(ctx, 'B3.deletion.private')),
            'the compact mark\'s act opens the face whole, its words said in the status region', {'removed': opened, 'live': live(ctx)})
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
    ctx.js('(async () => { (await import("./overlays/hint.js"))._reset(); })()')
    ctx.drv.key('z', mods=('Meta',)); ctx.frames(3)
    h = ctx.js('window.__skep.hint()') or {}
    none, writing, constant = hint_whole(ctx, 'B3.undo.none'), t(ctx, 'B3.undo.last-writing', {'label': label}), t(ctx, 'B3.undo.constant')
    r.check(h.get('id') == 'B3.undo.none' and h.get('words') == none and fold(h.get('writing')) == fold(writing) and h.get('ending') == constant and fold(live(ctx)) == fold('%s %s %s' % (none, writing, constant)) and first_line() == line,
            'with the draft below its reading scale Mod+Z changes nothing and says so: "undo works in the text of a draft you are writing — there is nothing here to undo", "— you were last writing in ⟨label⟩", then the constant sentence',
            {'hint': h, 'live': live(ctx), 'want': [none, writing, constant]})
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
    want = '%s %s' % (t(ctx, 'B3.undo.withheld', {'origin': mine}), t(ctx, 'B3.undo.again', {'undo chord': '⌘Z'}))
    st = state()
    r.check(said and fold(line_segment(ctx, 'B3.undo.withheld')) == fold(want) and ctx.consumed('op', seq) and first_line() == short and st['islands'] == [] and st['held'] == [] and st['kept']['word'] == 'kept'
            and stacks()['redo'] == [] and ctx.js('window.__skep.overlay().id') is None,
            'an undo\'s `reinstate` the board refuses `withheld` is declined: the one line says "the source of this passage is withheld from you now — ⟨origin⟩; …", ending "— ⌘Z again undoes what you did before it"; the words are gone from the text again, no refused run stands, the corner reads "kept", and the step is off the stack',
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

    def kept_check(word):
        def check(w):
            got, want = corner_kept(ctx), t(ctx, KEPT_IDS[word])
            vis = shown(ctx, CORNER + ' .kept-word')
            ok = bool(got) and got['word'] == want and got['id'] == KEPT_IDS[word] and not got['pending'] and len(vis) == 1
            return ok, {'corner': got, 'want': want, 'shown': len(vis)}
        return check
    for word, state in (('kept', 'kept'), ('not yet kept', 'not-yet-kept'), ('not kept', 'not-kept')):
        reason = t(ctx, 'B3.own-bug') if word == 'not kept' else None
        ctx.js('window.__skep.write.setKept(%s, %s)' % (json.dumps(OWN), json.dumps({'word': word, 'reason': reason})))
        ctx.frames(2)
        shoot(state, kept_check(word))
    # the save chord answered at the corner (K-74): the statement whole, once in a session
    ctx.js('window.__skep.write.setKept(%s, %s)' % (json.dumps(OWN), json.dumps({'word': 'kept', 'reason': None}))); ctx.frames(2)
    ctx.drv.key('s', mods=('Meta',)); ctx.frames(2)

    def save_check(w):
        got, want = corner_kept(ctx), t(ctx, 'B3.save.kept')
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
        want, got = t(ctx, 'B3.caret.enter'), hint(ctx)
        ok = (got['hint'] == {'id': 'B3.caret.enter', 'words': want, 'by': 'edge'} and got['seen'] and not got['line'] and ctx.js('window.__skep.caret()') is None
              and said_at_key == want)
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
    shoot('moved-scene', scene_check, marks={NARROW_PX: {"the panes' text": '#467', 'the bar': '#489'}})
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
