"""TEXT — class 3 (the structure record §6.3; T3 (3); M8): the one line's
segments in STATE 2 (acting as the claimant through the signed session); its
address at a landing — the position the one the landing named, the trail's
entry's (W-01 step 3, "position honored"), and the account the document's
own account field, read whole (the agent space's `1.0.1.1`) — and at mid,
zoomed out from the landing, the account under the camera alone, never the
document the walk stands on or a position, the LEAP box opening on it
(foundations §2.2; B1-S2; K-30); a face's words
alone — the fifth cell's at a typed ghost address, with no wire token above
them and no act beneath (B1-S8; C-42); the anatomy card's rows, each a value
the page holds (a bare dash reads as B1-S5's "none"), its two lineage rows
among them — `in_claims` and `out_claims` asked for its link under the audit
view, and "superseded by" and "supersedes" each reading what its read
answered: the addresses its claims name on that side, a retracted claim's
marked, B1-S5's "none" where it named none, no row where it was refused
(A-56, A-57, A-82); no string in the one line, the face or the anatomy card
set apart by its class in the inventory —
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

from . import AGENT_SPACE, DOC, GHOST, WINDOW, Result

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
    dev = ctx.js('window.__skep.model.device()')
    board = ctx.js('window.__skep.model.board()')
    r.check(line['state'] == 2, 'the acting-as segment is in STATE 2 (a signed session stands)', line['state'])
    expect = 'acting as %s (principal %s) · %s · key present on this device · %s · LOCAL notebook' % (sess['account'], sess['principal'], dev['label'] if dev else '⟨device label⟩', board['origin'])
    r.check(norm(expect) in norm(line['text']), 'the acting-as segment reads foundations §3.3\'s STATE 2 with the session\'s values', {'expect': expect, 'line': line['text']})
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
    ctx.esc()
    r.check(held == '1.0.1', 'at mid the LEAP box opens holding the address the line shows: the account', held)
    r.figures['mid_line'] = {'zooms': zooms, 'address': at_mid, 'leap': held}
    # ---- the account segment: the document's own account field, read whole ---------------
    ctx.leap(AGENT_SPACE + '.0.1')
    agent = ctx.js('window.__skep.line()')['address']
    r.check(agent['text'].split(' › ')[1:3] == [AGENT_SPACE, AGENT_SPACE + '.0.1'], 'the agent space\'s home document reads 1 › 1.0.1.1 › 1.0.1.1.0.1: the account segment is its own account field, read whole', {'address': agent, 'lod': ctx.js('window.__skep.view.lod()')['name']})
    r.figures['agent_line'] = agent
    # ---- a face's words, and nothing more -----------------------------------------------
    ctx.js('window.__skep.go.leapTo(%s, null)' % json.dumps(GHOST))
    ctx.settle()
    face = ctx.overlay_shown()
    r.check(face['kind'] == 'face' and 'nothing this board will say about this address' in face['text'] and GHOST in face['text'], 'the dead-reference face carries B1\'s doc_not_registered words with the address', face['text'][:200])
    r.check('doc_not_registered' not in face['text'].lower() and face['acts'] == 0, 'the fifth cell\'s face is its words alone: no wire token above them, no act beneath (B1-S8; C-42)', face)
    marks = wording_marks(ctx, '#overlay')
    r.check('B1.doc_not_registered' in marks['shown'] and not marks['marked'], 'the face\'s words are set apart by no class of theirs in the inventory — no dotted underline, no bar at their left', marks)
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
        marks = wording_marks(ctx, '#overlay')
        r.check('R5.undocumented' in marks['shown'] and not marks['marked'], 'the anatomy card\'s strings — R5\'s type among them — are set apart by no class of theirs in the inventory', marks)
        r.figures['anatomy_rows'] = rows
        # the lineage (B1-S5; A-56, A-57, A-82): each side read for the card's link under the audit view, its row what the
        # last read of it answered — the page's own words for the labels and marks
        words = ctx.js('''(async () => { const {t} = await import("./strings.js");
          return {by: t("F.card.superseded-by"), sup: t("F.card.supersedes"), none: t("F.card.none"), retracted: t("F.card.retracted")}; })()''')
        asked = [c for c in ctx.js('window.__skep.bridge.calls()')[n_calls:] if c.get('op') in ('in_claims', 'out_claims')]
        lineage = {}
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
                want = ', '.join(c[named] + ('' if c['active'] else ' · ' + words['retracted']) for c in claims) if claims else words['none']
                r.check(len(row) == 1 and norm(row[0]) == norm(want), 'the card\'s "%s" row reads what %s answered: the %s link of each claim, a retracted one marked, "none" where it named none' % (label, op, named), {'want': want, 'row': row, 'claims': claims})
            else:
                r.check(not row, 'a lineage read that answered no claims document draws no "%s" row: nothing was learned of it' % label, {'outcome': outcome, 'row': row})
            lineage[op] = {'asks': len(reads), 'answer': answer, 'row': row}
        r.figures['anatomy_lineage'] = lineage
        ctx.esc()
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
