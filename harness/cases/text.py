"""TEXT — class 3 (the structure record §6.3; T3 (3); M8): the one line's
segments in STATE 2 (acting as the claimant through the signed session); its
address at a landing — the position the one the landing named, the trail's
entry's (W-01 step 3, "position honored"), and the account the document's
own account field, read whole (the agent space's `1.0.1.1`); a face's words
alone — the fifth cell's at a typed ghost address, with no wire token above
them and no act beneath (B1-S8; C-42); the anatomy card's rows, each a value
the page holds (a bare dash reads as B1-S5's "none"); and every PINNED string
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
    trail = ctx.js('window.__skep.trail()')
    entry = trail['entries'][trail['cursor']]
    r.check(line['address']['pos'] == WINDOW[0] == entry['pos'], 'the address segment\'s position is the one the landing named, as the trail\'s entry holds it — not the first position of the span holding it', {'line': line['address']['pos'], 'trail': entry['pos'], 'named': WINDOW[0]})
    r.figures['line'] = line
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
        ctx.js('window.__skep.cards.anatomy(%s, %s)' % (json.dumps(DOC), json.dumps(shown[0]['link'])))
        ctx.settle()
        ctx.frames(2)
        rows = ctx.js('''[...document.querySelectorAll('#overlay .kv')].map((k) => { const v = k.cloneNode(true); v.querySelectorAll('b').forEach((b) => b.remove());
          return {labels: [...k.querySelectorAll('b')].map((b) => b.textContent), value: v.textContent}; })''')
        blank = [x for x in rows if BLANK.fullmatch(x['value'])]
        r.check(ctx.js('window.__skep.overlay().id') == 'anatomy:' + shown[0]['link'] and bool(rows) and not blank, 'every row of the anatomy card carries a value: none stands as a bare dash, which B1-S5 draws as "none"', {'blank': blank, 'rows': [x['labels'] for x in rows]})
        r.figures['anatomy_rows'] = rows
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
