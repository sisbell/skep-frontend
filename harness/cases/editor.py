"""EDITOR — the editor's states (B3-S1 … S13, the rows of the editor's
frontend prep survey's state table) driven against the harness's own
provider on 8744 and shot at the desktop width and at NARROW_PX.

The owner's prelude runs two providers over the owner's board: the owner's
on 8742, which every case reads and none arms, and the harness's on 8744,
which this case alone arms and fires through the dev provider's script seam
(`Context.arm`, `Context.fire`), by the harness's own requests. The page is
opened on it (`Context.open_editor_page`: `port=8744` and that provider's
secret), its session signed as the dev board's principal as the owner's is.

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
issue #471). Shift with the arrows at a live caret moves it and runs the
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
widths (`typed_lands`; the unsent-typing decision).

The own draft is the seeded board's windowed draft of principal 1 (`OWN`,
1340 bytes). The seed's staging draft (`STAGING`) holds every edition's
bytes — 6.27 MB at the owner's seed — which a LEAP reads whole and a scene
pane cannot show, so it is not the one driven.

The case's own write check runs over the harness's provider's log, where
`wire.py` (which reads the owner's) sees nothing of this: every dial a read
route (`wire.READ_PATHS`), every `op` frame the pages sent a read
(`READ_OPS`), every call a reading row (`wire.READ_ROWS`) or a
`publication.*`/`merge.*` call logged `canned`, and the owner's board's
`/health.log_position` equal before and after the case. The owner's page is
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
    dict(screen='B3-S2', state='held-bars', walk='W-08', step=7, drawn=False,
         how="arm `held` with rows before the page's `held(session)`; fire `held` holding (D6 BM-29)", claim='',
         why='the machine (U4): nothing calls `held(session)`, and the `held` event is logged, not acted on; the bar mark (U6)'),
    dict(screen='B3-S2', state='refused-run', walk='W-08', step=7, drawn=False,
         how='a `held` row with `refusal: out_of_bounds`; fire `held` refused (D6 BM-10)', claim='',
         why='the machine (U4); the underline mark (U6)'),
    dict(screen='B3-S2', state='hand-over', walk='W-08', step=7, drawn=False,
         how='a `held` row with `refusal: answers_lost` (D6 BM-26)', claim='', why='the machine (U4)'),
    dict(screen='B3-S2', state='moved-face', walk='W-08', step=7, drawn=False,
         how='`held` rows held moved with `arrangement_moved`; fire `held` moved with its hands (D6 BM-13)', claim='',
         why='the machine (U4)'),
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
    dict(screen='B3-S2', state='halted-store', walk='W-08', step=7, drawn=False,
         how='arm `held` with the refusal `store_halted` (D6 BM-30)', claim='',
         why='the machine (U4): nothing calls `held(session)`'),
    dict(screen='B3-S2', state='second-window', walk='W-08', step=7, drawn=False,
         how="`another_window` at a write's `op` (D6 BM-60)", claim='',
         why='not armable without a composed write (U3); told at the open is skep #827'),
    dict(screen='B3-S2', state='held-full', walk='W-08', step=7, drawn=False,
         how='`held_full`, `unwritable`, the page-kept island — each an `op` answer to a burst (D6 BM-19 … BM-21)', claim='',
         why='not armable without a composed write (U3, U4)'),
    # B3-S3 … B3-S13
    dict(screen='B3-S3', state='undo-lines', walk='W-08', step=5, drawn=False,
         how="Mod+Z's lines and the constant sentence (D6 BM-37, BM-42)", claim='', why='the stack (U5) and the keys (U7)'),
    dict(screen='B3-S4', state='deletion-face', walk='W-08', step=8, drawn=False,
         how='the deletion face before the act (C-49; D6 BM-51)', claim='', why='the composer (U3): no `delete` is composed'),
    dict(screen='B3-S5', state='paste-quote', walk='W-08', step=4, drawn=False,
         how="the paste's reader half and the quote's pick", claim='', why='the composer (U3); the pick overlay'),
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
    dict(screen='B3-S13', state='row-inert', walk='W-08', step=4, drawn=False,
         how="the selection's row inert while a line is held, one reason (D6 BM-62)", claim='', why='the machine (U4) and its reasons'),
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


# the walk's element, by its kind, its address and its position
WALKED = '(() => { const f = window.__skep.view.focus(); return f ? {kind: f.kind, addr: f.addr, pos: f.pos} : null; })()'
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


def run(ctx):
    r = Result()
    rows = {s['state']: dict(s, outcome=('pending' if s['drawn'] else 'not drawn')) for s in STATES}
    figures = {'own_draft': OWN, 'narrow_px': NARROW_PX, 'staging_draft': STAGING, 'states': list(rows.values())}
    ops_allowed = read_ops()
    sent = {'calls': [], 'ops': set()}

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
        """what the open page sent the harness's provider, kept for the write check before the page is left"""
        for c in page_calls(ctx):
            sent['calls'].append(c['name'])
            if c['name'] == 'op' and c['op']:
                sent['ops'].add(c['op'])

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

    # ---- (l) the sweep, the owner's page again, the write check over the harness's provider's log ---------------------------------
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
    bad_calls = sorted(f'{c} ({o})' for (c, o) in calls if not (c in READ_ROWS or c == SEAM or ((str(c).startswith('publication.') or str(c).startswith('merge.')) and o == 'canned')))
    bad_ops = sorted(o for o in sent['ops'] if o not in ops_allowed)
    bad_page_calls = sorted({c for c in sent['calls'] if not (c in READ_ROWS or c.startswith('publication.') or c.startswith('merge.'))})
    canned_calls = sorted(f'{c}' for (c, o) in calls if o == 'canned')
    r.check(not bad_dials, "every dial the harness's provider made for the editor pages names a route the read path dials (READ_PATHS)", {'bad': bad_dials, 'dials': {f'{m} {p}': n for (m, p), n in dials.items()}})
    r.check(not bad_calls, "every call in the harness's provider's log is a reading row, or a publication or merge call it answered canned — a canned answer composes no write (the owner's ruling on #327)", {'bad': bad_calls, 'calls': {f'{c} ({o})': n for (c, o), n in calls.items()}})
    r.check(not bad_ops and not bad_page_calls, 'every `op` frame the editor pages sent names a read (READ_OPS), and every call a reading row or a publication call', {'bad_ops': bad_ops, 'bad_calls': bad_page_calls})
    r.check(health1.get('log_position') == health0.get('log_position'), "the owner's board's /health.log_position is equal before and after the editor case", {'before': health0.get('log_position'), 'after': health1.get('log_position')})
    figures['write_check'] = {'dials': {f'{m} {p}': n for (m, p), n in dials.items()}, 'calls': {f'{c} ({o})': n for (c, o), n in calls.items()}, 'canned': canned_calls,
                              'log_position_before': health0.get('log_position'), 'log_position_after': health1.get('log_position'), 'seam_logged_as_call': any(c == SEAM for (c, _) in calls)}
    return out()
