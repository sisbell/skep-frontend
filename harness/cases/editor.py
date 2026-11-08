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
the state, an arm consumed where one was made — at the desktop width and
again at the narrow one, and shot at each as
`shots/B3-<Sn>/<state>-<walk>-<step>-w<width>.png`. A row whose surface is
not built stays in the table marked not drawn, naming the module or unit it
waits on, and is never shot. A check that fails leaves its row red with the
detail, unshot. The seam keeps one armed answer per call until it is
served, and the provider outlives the run: each arm is checked consumed
before the next state, and any arm left standing is served at the end
(`Context.clear_arms`). The dotted route's intake (#327) is proved on the
page's own port: a canned `publication.open` answer reaches the page as
armed, and a `publication` event fired by hand reaches its subscriber.

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

from . import Result, WINDOW
from .wire import READ_PATHS, READ_ROWS, read_ops

# the own draft: the seed's windowed draft W of principal 1 (`WINDOW[2]`), text the person may edit (issue #411)
OWN = WINDOW[2]
# the seed's staging draft D of principal 1: 6.27 MB at the owner's seed, every edition's bytes inserted into it in turn
STAGING = '1.0.1.0.2'
# the two widths every drawn state is shot at (the survey's "a desktop and a narrow width"; the owner's ruling: 480)
WIDE = (1440, 900)
NARROW_PX = 480
NARROW = (NARROW_PX, 900)
# each kept word's string (T-ARTICLE's KEPT_WORDS)
KEPT_IDS = {'kept': 'B3.kept', 'not yet kept': 'B3.not-yet-kept', 'not kept': 'B3.not-kept'}
# the seam's own route, which the provider logs as no call of the page's
SEAM = 'script'
# the page issues the marked checks wait on; each mark comes off the day its check passes
XFAIL_CORNER_NARROW = ("issue #436: at the narrow width the column fills the view and the corner is placed beside it, wholly outside the "
                       "view — its kept word shown to no one (web/text/layer.js `placeCorners`)")
XFAIL_LINE_NARROW = ("issue #310: at the narrow width the one line's acts and a daemon form need more room than the line holds — the "
                     "address segment gives way to the form, whose words still run past the line's end (web/style.css, `#line`'s "
                     "segments)")

# THE TABLE. `how` says what reaches the state; `claim` what a person meets, which the check holds the page to; `drawn`
# whether the page draws the state at HEAD, with `why` naming the module or unit a state not drawn waits on
STATES = [
    # B3-S1 — a new document of the person's own: the kept state at the corner, the kept caret (W-08 steps 2–3)
    dict(screen='B3-S1', state='kept', walk='W-08', step=2, drawn=True,
         how="`model.setKept(own, {word: 'kept'})` — D6's machine's word, set by the gate's hook",
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
         how="`model.setKept(own, {word: 'not yet kept'})` (D6 BM-8)",
         claim='the corner shows "not yet kept" in its slot (B3.not-yet-kept)'),
    dict(screen='B3-S2', state='not-kept', walk='W-08', step=7, drawn=True,
         how="`model.setKept(own, {word: 'not kept', reason})`, the reason the refused run's own-bug words (D6 BM-10)",
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
         claim='a scene stands with the own draft in pane A and the derived record in pane B, derived, no compare asked'),
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
         claim="the line's death arm, C-137's words with sign in, and the own draft covered as a guest meets it"),
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
         claim='the one line\'s transient segment reads "Enter places a caret here" (B3.caret.enter)'),
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


def transient(ctx):
    """the one line's transient segment: its text, or None where none stands"""
    return ctx.js('(() => { const e = document.querySelector("#line .seg.transient"); return e ? e.textContent : null; })()')


def live(ctx):
    """what the status region says"""
    return ctx.js('(document.getElementById("live") || {}).textContent || ""')


def page_calls(ctx):
    """the open page's own calls: each name and, for an `op`, its frame's op"""
    return ctx.js('window.__skep.bridge.calls().map((c) => ({name: c.name, op: c.op || null}))')


def fold(s):
    return re.sub(r'\s+', ' ', s or '').strip()


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
        there, unshot. `marks` names, by width, the page issue a check there waits on: the check is marked with it —
        counted expected while it fails, and failing the case the day it passes — and the shot is still taken, as the
        issue's evidence, the row reading expected and never shot and passed"""
        row = rows[state]
        shots, expected = [], []
        was = ctx.resize(*WIDE)
        try:
            for w, h in (WIDE, NARROW):
                ctx.resize(w, h)
                if recentre:
                    recentre()
                ctx.settle(10); ctx.frames(3)
                ok, detail = check(w)
                xf = (marks or {}).get(w)
                r.check(ok, f"{row['screen']} · {state} at {w} px: {row['claim']}", detail, xfail=xf)
                if not ok and not xf:
                    red(state, {'width': w, 'detail': detail})
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
        ctx.js('window.__skep.model.setKept(%s, %s)' % (json.dumps(OWN), json.dumps({'word': word, 'reason': reason})))
        ctx.frames(2)
        shoot(state, kept_check(word), marks={NARROW_PX: XFAIL_CORNER_NARROW})
    # the save chord answered at the corner (K-74): the statement whole, once in a session
    ctx.js('window.__skep.model.setKept(%s, %s)' % (json.dumps(OWN), json.dumps({'word': 'kept', 'reason': None}))); ctx.frames(2)
    ctx.drv.key('s', mods=('Meta',)); ctx.frames(2)

    def save_check(w):
        got, want = corner_kept(ctx), t(ctx, 'B3.save.kept')
        ok = bool(got) and got['statement'] == want and got['statement_id'] == 'B3.save.kept' and got['word'] == t(ctx, 'B3.kept') and len(shown(ctx, CORNER + ' .kept-statement')) == 1
        return ok, {'corner': got, 'want': want}
    shoot('save-answered', save_check, marks={NARROW_PX: XFAIL_CORNER_NARROW})
    ctx.js('(async () => { const L = await import("./text/layer.js"); L.openStatement(%s, false); })()' % json.dumps(OWN))
    ctx.js('window.__skep.model.setKept(%s, null)' % json.dumps(OWN)); ctx.frames(2)

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
    for ch in word:
        ctx.drv.key(ch)
    ctx.frames(2)

    def typed_check(w):
        c, edits = ctx.js('window.__skep.caret()'), ctx.js('window.__skep.model.edits(%s)' % json.dumps(OWN))
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
    ctx.js('(async () => { const L = await import("./text/layer.js"), R = await import("./model/records.js"); L.dropCaret(); R.clearEdits(%s); L.bump(); })()' % json.dumps(OWN))
    ctx.js('window.__skep.model.invalidate(%s)' % json.dumps(OWN)); ctx.settle(); ctx.frames(2)
    r.check(ctx.js('window.__skep.caret()') is None and ctx.js('window.__skep.model.edits(%s).length' % json.dumps(OWN)) == 0, 'the caret is dropped and the edits cleared after the caret states', None)

    # ---- (e) B3-S13: the swallow's draft form at a span with no caret (K-72) ---------------------------------------------
    ctx.leap(OWN, target['pos'])
    ctx.drv.key('x'); ctx.frames(2)
    said_at_key = live(ctx)

    def swallow_check(w):
        want, seg = t(ctx, 'B3.caret.enter'), transient(ctx)
        ok = seg == want and ctx.js('window.__skep.caret()') is None and said_at_key == want
        return ok, {'segment': seg, 'want': want, 'status_region': said_at_key}
    shoot('swallow-draft', swallow_check)
    # the person's next act clears the transient segment (L-LINE's `act`); none of what follows is an act of theirs
    ctx.js('(async () => { (await import("./line/line.js")).act(); })()'); ctx.frames(2)
    r.check(transient(ctx) is None, "the next act clears the swallow's line", transient(ctx))

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
        return ok, {'opened': opened, 'a': {k: pa.get(k) for k in ('doc', 'derived', 'kind')}, 'b': {k: pb.get(k) for k in ('doc', 'derived', 'kind')}, 'inserted': inserted, 'compare_calls': len(compared), 'panes_shown': panes_shown}
    shoot('moved-scene', scene_check)
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
    shoot('stopped', stopped_check, marks={NARROW_PX: XFAIL_LINE_NARROW})
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
        ok = fell and covered and seg == want and signin == t(ctx, 'F.sign-in') and d['refused'] == 'withheld' and OWN not in mounted and ctx.js('window.__skep.model.session()') is None
        return ok, {'fell': fell, 'covered': covered, 'segment': seg, 'want': want, 'sign_in': signin, 'refused': d['refused'], 'mounted': OWN in mounted}
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
        shoot('writes-halted', halted_check, marks={NARROW_PX: XFAIL_LINE_NARROW})
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
