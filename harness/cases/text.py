"""TEXT — class 3 (the structure record §6.3; T3 (3); M8): the one line's
segments in STATE 2 (acting as the claimant through the signed session, the
model keeping it as the provider opened it: one a write may go out under,
`SessionOpened.writes`), its device label the label of the key the session
is opened with — decided here from the device's key store as the shell
selects it, the one key bound at this board for the session's principal,
else the store's one key, with no fallback for a key it does not name
(FP-34); THE PLACEHOLDER SWEEP (issue #208's design decision: "A slot never
shows its template placeholder") at every surface this case visits, a
reading scene and the guest's page among them — no ⟨token⟩ of the strings
table's templates, matched whole and never a bracket alone, in the page's
text, its attributes, a field, the canvas's labels or the AX tree, the
documents' own words apart; THE BYLINE (FP-34): the first
edition's on the owner's page its label alone, on the guest's its label and
its cue, the agent space's home's and each reading scene pane's as their
owners' facts decide — the owner each document's metadata names, its facts
decided here by the harness's own reads of the board: the credential table,
the climb above it, the genesis enrollment's sole device-flagged entry —
each slot named by its role and what it shows, the panes' in the AX tree
too; its address at a landing — the position the one
the landing named, the trail's entry's (W-01 step 3, "position honored"),
and the account the document's own account field, read whole (the agent
space's `1.0.1.1`) — and at mid,
zoomed out from the landing, the account under the camera alone, never the
document the walk stands on or a position, the LEAP box opening on it
(foundations §2.2; B1-S2; K-30); a version's address LEAPt to pinning its
box there, the one line naming that address whole with its position and its
version marker lit, and the plain address taking the box back to the trunk
head, the marker unlit (issue #154); a face's words
alone — the fifth cell's at a typed ghost address, with no wire token above
them and no act beneath (B1-S8; C-42); the anatomy card's rows, each a value
the page holds (a bare dash reads as B1-S5's "none"), the row after the owner's
saying when the link was made — the day the board's own `read_link` dates it,
in the page's one form of a date, and no "age" row (issue #22) — its two lineage rows
among them — `in_claims` and `out_claims` asked for its link under the audit
view, and "superseded by" and "supersedes" each reading the claims with
authority its read answered, the authority recomputed here from the tumblers
(issue #143's design decision: the account of the claim's home owns `old`):
the addresses its claims name on that side, a claimant the owner row does
not name after its claim, a retracted claim's marked, B1-S5's "none" where
it named none with authority, no row where it was refused (A-56, A-57,
A-82), and one line after the rows, in its own words, where any claim
answered lacks authority, and none where none does; no string in the one
line, the face or the anatomy card set apart by its class in the inventory —
no dotted underline under a DRAFT, no bar beside a PINNED: the class is the
copy's record (`strings.js`), never a mark a person reads, and a dotted
underline is the page's mark of words with an act; and every PINNED string
of `strings.js` equal to its source at the design repository's HEAD —
`ux/copy.md` by `C-n`, `requirements.md` for R56, R59 and R5 — compared
fragment by fragment around the ⟨tokens⟩ with whitespace folded (the design
files wrap at 72 columns). DRAFT strings that name a design file are located
there too and reported, never failed (a design document drafts in prose).
The strings the lane LACKED are listed. The fifth cell met by a follow is
W-01 step 7's (`walks`), which runs after `keys` reads LK's visited set."""
import json
import re

from . import AGENT_SPACE, DOC, FAR_LEAP, GHOST, VERSIONED, WINDOW, Result, byline_expected, byline_facts, byline_shown, placeholder_sweep

TOKEN = re.compile(r'⟨[^⟩]*⟩')
BLANK = re.compile(r'[\s\-–—·.…]*')  # a value that is no value: dashes, dots and spaces, or nothing


def norm(s):
    s = (s or '').replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    return re.sub(r'\s+', ' ', s).strip()


def wording_marks(ctx, scope):
    """the strings of `strings.js` shown in `scope`, each element naming its id in `data-string`, and those a mark sets
    apart by their class in the inventory: a dotted underline, or a bar of 3 px or more at the left"""
    return ctx.js('''(() => { const shown = [...document.querySelectorAll(%s)].map((e) => { const s = getComputedStyle(e);
      return {id: e.dataset.string, bottom: s.borderBottomStyle, left: parseFloat(s.borderLeftWidth) || 0}; });
      return {shown: shown.map((x) => x.id), marked: shown.filter((x) => x.bottom === 'dotted' || x.left >= 3)}; })()''' % json.dumps(scope + ' [data-string]'))


def account(a):
    """the account an address lies under, its node and user fields read whole (`1.0.1.1.0.4` → `1.0.1.1`), the fields
    parted at their zeros (M-ADDR's `accountOf`, recomputed here so the card's authority is held to the tumbler)"""
    f = (a or '').split('.0.')
    return '.0.'.join(f[:2]) if len(f) >= 2 and f[1] else None


def located(text, source):
    """every literal fragment of the string (between its tokens) appears verbatim in the source"""
    src = norm(source)
    frags = [norm(f) for f in TOKEN.split(text)]
    frags = [f for f in frags if len(f) >= 3]
    missing = [f for f in frags if f not in src]
    return missing


def run(ctx):
    r = Result()
    head = ctx.design_head()
    r.figures['design_head'] = head
    # ---- the one line in STATE 2 -------------------------------------------------
    ctx.leap(DOC, WINDOW[0])
    line = ctx.js('window.__skep.line()')
    sess = ctx.js('window.__skep.model.session()')
    board = ctx.js('window.__skep.model.board()')
    r.check((sess or {}).get('writes') is True, 'the model keeps the session as the provider opened it: one a write may go out under, the signed session STATE 2 speaks for', {k: (sess or {}).get(k) for k in ('principal', 'account', 'writes')})
    r.check(line['state'] == 2, 'the acting-as segment is in STATE 2 (a signed session stands)', line['state'])
    # the key the shell opens the signed session with, decided here from the device's store apart from the page's reading
    # (skep-client's `FileStore::select`): the one key bound at this board for the session's principal, else the store's one key
    store = ctx.key_store()
    bound = [row for row in store['rows'] if any(b.startswith('%s principal %s ' % (board['origin'], sess['principal'])) for b in row.get('bindings') or [])]
    opened = bound if bound else store['rows']
    r.check(len(opened) == 1, 'the device\'s key store names the one key the session is opened with: one bound at this board for its principal, else the store\'s one key — no fallback for a key the store does not name',
            {'bound': [row.get('label') for row in bound], 'rows': [row.get('label') for row in store['rows']], 'refused': store['refused']})
    label = (opened[0].get('label') if len(opened) == 1 else None) or ctx.js('(async () => (await import("./strings.js")).t("L.slot.unlabelled"))()')
    expect = 'acting as %s (principal %s) · %s · key present on this device · %s · LOCAL notebook' % (sess['account'], sess['principal'], label, board['origin'])
    r.check(len(opened) == 1 and norm(expect) in norm(line['text']), 'the acting-as segment reads foundations §3.3\'s STATE 2 with the session\'s values, its device label the label of the key the session is opened with (FP-34)', {'expect': expect, 'line': line['text']})
    sweeps = {}

    def swept(where):
        """the placeholder sweep at a surface (issue #208): no ⟨token⟩ a template left unfilled shown or told there"""
        hits = placeholder_sweep(ctx)
        sweeps[where] = [h['token'] for h in hits]
        r.check(not hits, f'{where}: no template placeholder the page shows or tells — no token of the strings table\'s templates in its text, its attributes, a field, the canvas\'s labels or the AX tree, the documents\' own words apart (FP-34; issue #208)', hits[:6])

    swept('the first edition\'s landing')
    r.check(line['address']['doc'] == DOC and line['address']['pos'] is not None, 'the address segment names the document and the position', line['address'])
    r.check('1 › 1.0.1 › 1.0.1.0.3 › position' in line['text'], 'the where-am-I reads board › account › document › position', line['text'][:160])
    marks = wording_marks(ctx, '#line')
    r.check('F.acting-as' in marks['shown'] and not marks['marked'], 'the one line\'s strings are words alone: none is set apart by its class in the inventory — no dotted underline, no bar at its left', marks)
    trail = ctx.js('window.__skep.trail()')
    entry = trail['entries'][trail['cursor']]
    r.check(line['address']['pos'] == WINDOW[0] == entry['pos'], 'the address segment\'s position is the one the landing named, as the trail\'s entry holds it — not the first position of the span holding it', {'line': line['address']['pos'], 'trail': entry['pos'], 'named': WINDOW[0]})
    r.figures['line'] = line
    # ---- the address at mid: the account under the camera (foundations §2.2; B1-S2) ----------------
    # Mod+- from the landing until the scale is mid: the re-take at mid's grain stands the walk on the document under the
    # view's centre, and the line names the account the camera is over — no document, no position — and the LEAP box opens
    # holding what the line shows (K-30)
    zooms = 0
    while zooms < 12 and ctx.js('window.__skep.view.lod()')['name'] != 'mid':
        ctx.drv.key('-', code='Minus', mods=('Meta',))
        ctx.settle()
        ctx.frames(2)
        zooms += 1
    ctx.frames(3)
    mid = ctx.js('({lod: window.__skep.view.lod().name, focus: window.__skep.view.focus(), line: window.__skep.line()})')
    focus = mid['focus'] or {}
    r.check(mid['lod'] == 'mid' and focus.get('kind') == 'document' and focus.get('addr') == DOC, 'Mod+- from the landing to mid: the re-take stands the walk on the first edition itself', {'zooms': zooms, 'lod': mid['lod'], 'focus': focus})
    at_mid = mid['line']['address']
    r.check(at_mid['text'] == '1 › 1.0.1' and at_mid['doc'] is None and at_mid['pos'] is None and DOC not in mid['line']['text'],
            'at mid the one line names the account under the camera, 1 › 1.0.1: never the document the walk stands on, never a position', {'address': at_mid, 'line': mid['line']['text'][:160]})
    ctx.js('window.__skep.leap.open()')
    ctx.frames(2)
    held = ctx.js('document.getElementById("leapq").value')
    swept('mid, the LEAP box open over it')
    ctx.esc()
    r.check(held == '1.0.1', 'at mid the LEAP box opens holding the address the line shows: the account', held)
    r.figures['mid_line'] = {'zooms': zooms, 'address': at_mid, 'leap': held}
    # ---- the account segment: the document's own account field, read whole ---------------
    ctx.leap(AGENT_SPACE + '.0.1')
    agent = ctx.js('window.__skep.line()')['address']
    r.check(agent['text'].split(' › ')[1:3] == [AGENT_SPACE, AGENT_SPACE + '.0.1'], 'the agent space\'s home document reads 1 › 1.0.1.1 › 1.0.1.1.0.1: the account segment is its own account field, read whole', {'address': agent, 'lod': ctx.js('window.__skep.view.lod()')['name']})
    r.figures['agent_line'] = agent
    swept('the agent space\'s home document')
    # ---- a pinned version: the one line names it (issue #154's design decision: "The address bar and the box's corner
    # both name it"; foundations §3.2: "its version address with ○ lit") ----------------------------------------------
    member = VERSIONED + '.1'
    seg = lambda: ctx.js('''((a) => { const m = document.querySelector('#line .marker');
      return {shown: window.__skep.go.shownIn(a), address: window.__skep.line().address, marker: m ? {lit: m.classList.contains('lit'), title: m.title} : null}; })(%s)''' % json.dumps(VERSIONED))
    ctx.leap(member)
    pinned = seg()
    swept('a box pinned to version 1')
    title = ctx.js('import("./strings.js").then(({t}) => t("L.version", {k: 1}))')
    r.check(pinned['shown'] == member and pinned['address']['doc'] == member and pinned['address']['text'].split(' › ')[:3] == ['1', '1.0.1', member] and pinned['address']['pos'] is not None
            and pinned['marker'] == {'lit': True, 'title': title},
            'a LEAP to a version\'s address pins its box there, and the one line names the version\'s address whole and its position, its version marker lit and titled "%s" (issue #154)' % title, pinned)
    ctx.leap(VERSIONED, None)
    plain = seg()
    r.check(plain['shown'] == VERSIONED and plain['address']['doc'] == VERSIONED and bool(plain['marker']) and not plain['marker']['lit'],
            'a LEAP to the plain address takes the box back to the trunk head: the line names the plain address, its marker unlit (issue #154)', plain)
    r.figures['pinned_line'] = {'pinned': pinned, 'plain': plain}
    # ---- a face's words, and nothing more -----------------------------------------------
    ctx.js('window.__skep.go.leapTo(%s, null)' % json.dumps(GHOST))
    ctx.settle()
    face = ctx.overlay_shown()
    r.check(face['kind'] == 'face' and 'nothing this board will say about this address' in face['text'] and GHOST in face['text'], 'the dead-reference face carries B1\'s doc_not_registered words with the address', face['text'][:200])
    r.check('doc_not_registered' not in face['text'].lower() and face['acts'] == 0, 'the fifth cell\'s face is its words alone: no wire token above them, no act beneath (B1-S8; C-42)', face)
    marks = wording_marks(ctx, '#overlay')
    r.check('B1.doc_not_registered' in marks['shown'] and not marks['marked'], 'the face\'s words are set apart by no class of theirs in the inventory — no dotted underline, no bar at their left', marks)
    swept('the dead-reference face')
    ctx.esc()
    r.check(ctx.js('window.__skep.overlay()')['kind'] is None, 'Esc dismisses the face')
    r.figures['face'] = face['text'][:300]
    # ---- the swallow line (K-9) ---------------------------------------------------------
    ctx.leap(DOC, WINDOW[0])
    ctx.drv.key('t')
    ctx.frames(2)
    swallow = ctx.js('window.__skep.line()')['text']
    r.check('typing goes nowhere here' in swallow and '⌘L' in swallow, 'a printable key shows the K-9 line with the LEAP chord drawn for the platform', swallow[-160:])
    # ---- the anatomy card's rows: each a value the page holds -------------------------------
    shown = ctx.js('window.__skep.links.shown(%s)' % json.dumps(DOC))
    r.check(bool(shown), 'the first edition draws a link to open the anatomy card of', len(shown))
    if shown:
        link = shown[0]['link']
        n_calls = len(ctx.js('window.__skep.bridge.calls()'))
        ctx.js('window.__skep.cards.anatomy(%s, %s)' % (json.dumps(DOC), json.dumps(link)))
        ctx.settle()
        ctx.frames(2)
        rows = ctx.js('''[...document.querySelectorAll('#overlay .kv')].map((k) => { const v = k.cloneNode(true); v.querySelectorAll('b').forEach((b) => b.remove());
          return {labels: [...k.querySelectorAll('b')].map((b) => b.textContent), value: v.textContent}; })''')
        blank = [x for x in rows if BLANK.fullmatch(x['value'])]
        r.check(ctx.js('window.__skep.overlay().id') == 'anatomy:' + link and bool(rows) and not blank, 'every row of the anatomy card carries a value: none stands as a bare dash, which B1-S5 draws as "none"', {'blank': blank, 'rows': [x['labels'] for x in rows]})
        # when the link was made (issue #22's design decision: "The row reads 'made 12 March 2026'"): the day the board's own
        # `read_link` dates the link, in the page's one form of a date, the row right after the owner's — no age, no position
        board = ctx.daemon_op({'op': 'read_link', 'a': link})
        made = ctx.js('''(async (age) => { const {dated, t} = await import("./strings.js");
          return {label: t("L.card.made"), owner: t("F.card.owner"), want: dated(age)}; })(%s)''' % json.dumps({'at': board.get('at'), 'time': board.get('time'), 'from': board.get('time_from')}))
        labels = [x['labels'] for x in rows]
        made_row = [x['value'] for x in rows if x['labels'] == [made['label']]]
        after_owner = [made['owner']] in labels and labels.index([made['owner']]) + 1 < len(labels) and labels[labels.index([made['owner']]) + 1] == [made['label']]
        r.check(board.get('link') is not None and len(made_row) == 1 and norm(made_row[0]) == norm(made['want']) and after_owner and ['age'] not in labels,
                'the anatomy card says when its link was made: "%s", the day the board\'s own read of the link dates it, the row right after the owner\'s, and no "age" row (issue #22)' % made['label'],
                {'row': made_row, 'want': made['want'], 'board': {k: board.get(k) for k in ('at', 'time', 'time_from')}, 'labels': labels})
        r.figures['anatomy_made'] = {'row': made_row, 'board': {k: board.get(k) for k in ('at', 'time', 'time_from')}}
        marks = wording_marks(ctx, '#overlay')
        r.check('R5.undocumented' in marks['shown'] and not marks['marked'], 'the anatomy card\'s strings — R5\'s type among them — are set apart by no class of theirs in the inventory', marks)
        r.figures['anatomy_rows'] = rows
        # the lineage (B1-S5; A-56, A-57, A-82; issue #143's design decision): each side read for the card's link under the
        # audit view, its row the claims with authority the last read of it answered — each claim's claimant, the account
        # of its home, owning the link it declares superseded, `old`'s account — a claimant the owner row does not name
        # after its claim ("you" for the reader); one line after the rows where any claim answered lacks authority — the
        # page's own words for the labels, the marks and the line
        words = ctx.js('''(async () => { const {t} = await import("./strings.js");
          return {by: t("F.card.superseded-by"), sup: t("F.card.supersedes"), none: t("F.card.none"), retracted: t("F.card.retracted"),
                  by_owner: t("L.card.by-owner"), you: t("L.card.you"), others: t("L.card.others")}; })()''')
        asked = [c for c in ctx.js('window.__skep.bridge.calls()')[n_calls:] if c.get('op') in ('in_claims', 'out_claims')]
        owner, reader = account(link), (sess or {}).get('account')
        lineage, stray = {}, []
        for op, key, named, label in (('in_claims', 'y', 'new', words['by']), ('out_claims', 'x', 'old', words['sup'])):
            reads = [c for c in asked if c['op'] == op]
            frames = [json.loads(c['frame']) for c in reads]
            r.check(bool(frames) and all(f == {'op': op, 'view': 'audit', key: link} for f in frames), 'the card asks %s for its link under the audit view, the one that answers a retracted claim' % op, frames)
            if not reads:
                continue
            outcome = json.loads(reads[-1]['answer']) if reads[-1].get('answer') else {}
            answer = outcome.get('result') if isinstance(outcome, dict) else None
            row = [x['value'] for x in rows if x['labels'] == [label]]
            if isinstance(answer, dict) and answer.get('resp') == 'claims':
                claims = answer.get('claims') or []
                held = [c for c in claims if account(c['home']) == account(c['old'])]
                stray += [c for c in claims if c not in held]
                named_by = [None if account(c['home']) == owner else (words['you'] if account(c['home']) == reader else account(c['home'])) for c in held]
                items = [c[named] + ('' if by is None else ' ' + words['by_owner'].replace('⟨claimant⟩', by)) + ('' if c['active'] else ' · ' + words['retracted']) for c, by in zip(held, named_by)]
                want = ('; ' if any(by is not None for by in named_by) else ', ').join(items) if held else words['none']
                r.check(len(row) == 1 and norm(row[0]) == norm(want), 'the card\'s "%s" row reads the claims with authority %s answered: the %s link of each, its claimant after it where the owner row does not name it, a retracted one marked, "none" where it named none with authority' % (label, op, named), {'want': want, 'row': row, 'claims': claims})
            else:
                r.check(not row, 'a lineage read that answered no claims document draws no "%s" row: nothing was learned of it' % label, {'outcome': outcome, 'row': row})
            lineage[op] = {'asks': len(reads), 'answer': answer, 'row': row}
        shown_line = ctx.js('(() => { const b = document.querySelector(\'#overlay [data-run="claims"]\'); return b ? b.textContent : null; })()')
        r.check((shown_line is not None) == bool(stray) and (shown_line is None or norm(shown_line) == norm(words['others'])), 'one line follows the rows, in its own words and no number in them, where a claim answered lacks authority, and none where every claim has it', {'line': shown_line, 'without_authority': stray})
        lineage['line'] = shown_line
        r.figures['anatomy_lineage'] = lineage
        swept('the anatomy card')
        ctx.esc()
    # ---- THE BYLINE (issue #208; FP-34): each byline's slots filled from its owner's facts, decided here by the harness's own
    # reads of the board apart from the page's — the owner its document's metadata names, as the page names it — the
    # reader's own byline its label alone, another's its label and its cue, a cause's words where the facts name no key ----
    def byline_holds(where, article, doc, reader):
        """the byline of `doc`'s article — the selector `article` names it — against its owner's facts; its figures"""
        owner = ctx.daemon_op({'op': 'doc_metadata', 'doc': doc}).get('owner')
        facts = byline_facts(ctx, owner) if owner else {'cause': 'unread'}
        want = byline_expected(ctx, facts, owner == reader)
        shown = byline_shown(ctx, article)
        got = shown and {'owner': shown['owner'], 'shows': [s['whole'] or s['shows'] for s in shown['slots']], 'names': [s['name'] for s in shown['slots']]}
        slots = 'its label alone, the reader\'s own' if owner == reader else 'its label and its cue'
        stands = ctx.js('''((a, sel) => { const S = window.__skep, d = S.model.doc(a), e = document.querySelector(sel);
          return {article: !!e, head: !!(e && e.querySelector('.hd')), lines: S.mountedLines(a), from: d.from, to: d.to, blocks: d.blocks.map((b) => [b.pos, b.kind]), refused: d.refused,
                  camera: S.view.camera(), lod: S.view.lod().name}; })(%s, %s)''' % (json.dumps(doc), json.dumps(article)))
        r.check(bool(owner) and bool(shown) and got == {'owner': owner + ' · ', 'shows': want['shows'], 'names': want['names']} and not any(s['pending'] for s in shown['slots']),
                '%s: the byline names its owner, %s, then its slots filled from the owner\'s facts as the board answers them — %s, or the cause\'s words where they name no key — each named by its role and what it shows (FP-34; issue #208)' % (where, owner, slots),
                {'facts': facts, 'want': want, 'shown': shown, 'stands': stands})
        return {'owner': owner, 'facts': facts, 'shows': got and got['shows']}

    bylines = {}
    ctx.leap(DOC, None)
    bylines['own'] = byline_holds('the first edition', '#domlayer article.dtext[data-addr="%s"]' % DOC, DOC, sess['account'])
    swept('the first edition\'s head')
    # the agent space's home document holds no text on this board, so the plane mounts no article of it: the facts the page read
    # of its owner at the landing, and the byline of the article a reading scene's pane makes of it — T-LAYER's own, read whole —
    # set aside the plane where no one meets it, and taken down
    agent = AGENT_SPACE + '.0.1'
    ctx.leap(agent, None)
    held = ctx.js('(async (a) => { const R = await import("./model/records.js"); return R.accountKey(R.ownerAccount(R.doc(a))) ?? null; })(%s)' % json.dumps(agent))
    ctx.js('''(async (a) => { const L = await import('./text/layer.js'), R = await import('./model/records.js');
      await window.__skep.model.loadWhole(a);
      const host = document.createElement('div'); host.id = 'gate-pane'; host.style.cssText = 'position:absolute;left:-10000px;top:0;width:900px';
      host.appendChild(L.sceneArticle(R.doc(a))); document.body.appendChild(host); })(%s)''' % json.dumps(agent))
    bylines['agent_space'] = byline_holds('the agent space\'s home document, in the article a pane makes of it', '#gate-pane article.dtext', agent, sess['account'])
    ctx.js('document.getElementById("gate-pane").remove()')
    r.check(held == bylines['agent_space']['facts'], 'the page read the facts of the agent space\'s home\'s owner at the landing, as the board answers them, though the plane mounts no article of it', {'page': held, 'board': bylines['agent_space']['facts']})
    # a reading scene's panes: each byline set with its owner's facts read before the pane was set, and told to assistive
    # technology by its slots' names — a pane's article is what it reads there
    ctx.leap(DOC, WINDOW[0])
    ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(DOC), json.dumps(FAR_LEAP)))
    ctx.js('new Promise((res) => { const t0 = performance.now(); const tick = () => (window.__skep.scene.isOpen() && !window.__skep.scene.updating() || performance.now() - t0 > 10000 ? res(true) : setTimeout(tick, 50)); tick(); })')
    ctx.settle()
    ctx.frames(2)
    for side, doc in (('A', DOC), ('B', FAR_LEAP)):
        bylines['pane ' + side] = byline_holds('pane %s of a reading scene, on %s' % (side, doc), '#scene%s article.dtext' % side, doc, sess['account'])
    ax = ctx.drv.ax_tree()
    if 'error' in ax:
        r.note('the panes\' bylines in the AX tree: Accessibility.getFullAXTree did not answer: ' + ax['error'])
    else:
        imgs = [(n.get('name') or {}).get('value') for n in ax.get('nodes', []) if not n.get('ignored') and (n.get('role') or {}).get('value') in ('image', 'img')]
        named_in_panes = [byline_shown(ctx, '#scene%s article.dtext' % side) for side in 'AB']
        names = [s['name'] for b in named_in_panes if b for s in b['slots']]
        r.check(bool(names) and all(nm in imgs for nm in names), 'the AX tree tells each pane\'s byline slots by their names: its role and what it shows (FP-34)', {'names': names, 'images': imgs[:12]})
    swept('a reading scene on the first edition and %s' % FAR_LEAP)
    ctx.js('window.__skep.scene.close()')
    ctx.frames(2)
    # the guest page: another's byline — the owner's label and its cue
    ctx.open_page('guest')
    ctx.leap(DOC, None)
    bylines['guest'] = byline_holds('the first edition on the guest\'s page', '#domlayer article.dtext[data-addr="%s"]' % DOC, DOC, None)
    swept('the guest\'s page at the first edition\'s head')
    ctx.open_page('all')
    ctx.leap(DOC, WINDOW[0])
    r.figures['bylines'] = bylines
    r.figures['sweeps'] = sweeps
    # ---- every PINNED string against its source ------------------------------------------
    pinned = ctx.js('window.__skep.strings.pinned()')
    sources = {}
    unlocated = []
    for p in pinned:
        src = sources.get(p['source'])
        if src is None:
            src = ctx.design(p['source'])
            sources[p['source']] = src
        if src is None:
            unlocated.append({'id': p['id'], 'why': 'source file missing: ' + p['source']})
            continue
        missing = located(p['text'], src)
        if missing:
            unlocated.append({'id': p['id'], 'source': p['source'], 'missing_fragments': missing})
    r.check(not unlocated, 'every PINNED string is verbatim in its source at the design repo\'s HEAD', unlocated)
    r.figures['pinned'] = {'count': len(pinned), 'ids': [p['id'] for p in pinned]}
    # ---- DRAFT strings with a source: located and reported ----------------------------------
    drafts = ctx.js('Object.entries(window.__skepStrings || {}).length') if False else None
    all_strings = ctx.js('''(async () => { const m = await import('../strings.js'); return Object.entries(m.STRINGS).map(([id, e]) => ({id, text: e.text, cls: e.cls, source: e.source, screen: e.screen || '', lane: !!e.lane})); })()''')
    draft_unlocated = []
    draft_checked = 0
    for e in all_strings:
        if e['cls'] != 'DRAFT' or not e['source'] or e['lane']:
            continue
        src = sources.get(e['source'])
        if src is None:
            src = ctx.design(e['source'])
            sources[e['source']] = src
        if src is None:
            draft_unlocated.append({'id': e['id'], 'why': 'source missing ' + e['source']})
            continue
        draft_checked += 1
        missing = located(e['text'], src)
        if missing:
            draft_unlocated.append({'id': e['id'], 'source': e['source'], 'missing_fragments': missing[:3]})
    r.figures['draft'] = {'checked': draft_checked, 'not_located_verbatim': draft_unlocated}
    r.figures['lacking'] = ctx.js('window.__skep.strings.lacking()')
    r.figures['counts'] = {'pinned': sum(1 for e in all_strings if e['cls'] == 'PINNED'), 'draft': sum(1 for e in all_strings if e['cls'] == 'DRAFT' and not e['lane']), 'lane': sum(1 for e in all_strings if e['lane'])}
    r.note('DRAFT strings a design document drafts in prose are located by fragment and reported, not failed; the lane\'s own placeholders (lane: true) are the strings the inventory LACKED')
    return r.out()
