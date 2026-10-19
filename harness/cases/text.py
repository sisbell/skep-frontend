"""TEXT — class 3 (the structure record §6.3; T3 (3); M8): the one line's
segments in STATE 2 (acting as the claimant through the signed session), a
face's words, and every PINNED string of `strings.js` equal to its source at
the design repository's HEAD — `ux/copy.md` by `C-n`, `requirements.md` for
R56, R59 and R5 — compared fragment by fragment around the ⟨tokens⟩ with
whitespace folded (the design files wrap at 72 columns). DRAFT strings that
name a design file are located there too and reported, never failed (a
design document drafts in prose). The strings the lane LACKED are listed."""
import json
import re

from . import DOC, GHOST, WINDOW, Result

TOKEN = re.compile(r'⟨[^⟩]*⟩')


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
    r.figures['line'] = line
    # ---- a face's words -------------------------------------------------------------
    ctx.js('window.__skep.go.leapTo(%s, null)' % json.dumps(GHOST))
    ctx.settle()
    ov = ctx.js('window.__skep.overlay()')
    tmpl = ctx.js('(() => { const s = window.__skep.strings; return null; })()')
    face_text = ov.get('text') or ''
    r.check(ov['kind'] == 'face' and 'nothing this board will say about this address' in face_text and GHOST in face_text, 'the dead-reference face carries B1\'s doc_not_registered words with the address', face_text[:200])
    ctx.esc()
    r.check(ctx.js('window.__skep.overlay()')['kind'] is None, 'Esc dismisses the face')
    r.figures['face'] = face_text[:300]
    # ---- the swallow line (K-9) ---------------------------------------------------------
    ctx.leap(DOC, WINDOW[0])
    ctx.drv.key('t')
    ctx.frames(2)
    swallow = ctx.js('window.__skep.line()')['text']
    r.check('typing goes nowhere here' in swallow and '⌘L' in swallow, 'a printable key shows the K-9 line with the LEAP chord drawn for the platform', swallow[-160:])
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
