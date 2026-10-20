"""KEYS — class 2 (the structure record §6.3; T3 (2); M7): every D5 chord the
lane built, dispatched at engine level (`Input.dispatchKeyEvent`, Meta as Mod
on this Mac), then the camera, the focus, the trail and the one line read
back; the IME guard, on the plane and in the LEAP box; a bare key does
NOTHING but show the K-9 line; Enter on the LEAP box as opened lands in
place, ↓ choosing the first level, and a typed account address a teleport
with its trail entry (foundations §2.2, §2.3); a navigation act from the
scene — Back, Forward, a teleport — making one trail move, its own (§2.5);
K-8's select and extend by span; a links card row's anatomy card taking the
card's place with the symbols standing, at the link's own bytes; the
selection's one continuous gesture (R11) — a pointer drag over a phrase of a
shown paragraph selects that phrase's byte span, never its block: the acts
ask the wire over those bytes, the copy names them, and the platform's
highlight survives the remount the links card causes. Each step leaves the
page as it found it."""
import json

from . import DOC, SECOND_ACCOUNT, WINDOW, Result

CODES = {'[': 'BracketLeft', ']': 'BracketRight', '=': 'Equal', '-': 'Minus', '0': 'Digit0', '1': 'Digit1', '2': 'Digit2', '/': 'Slash', '+': 'Equal'}


def state(ctx):
    return ctx.js('({cam: window.__skep.view.camera(), focus: window.__skep.view.focus(), line: window.__skep.line().text, overlay: window.__skep.overlay().kind, leap: window.__skep.leap.isOpen(), trail: window.__skep.trail().cursor, scene: window.__skep.scene.isOpen(), sel: window.__skep.selection()})')


def trail(ctx):
    """the trail as N-TRAIL holds it: every entry with its view, oldest first, and the cursor"""
    return ctx.js('window.__skep.trail()')


def open_scene(ctx):
    ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(DOC), json.dumps(WINDOW[2])))
    ctx.settle()
    ctx.frames(2)


def same_view(a, b, tol=1e-6):
    return abs(a['cam']['x'] - b['cam']['x']) < tol and abs(a['cam']['y'] - b['cam']['y']) < tol and abs(a['cam']['scale'] - b['cam']['scale']) < tol


def chord(ctx, key, mods=(), code=None, text=None):
    ctx.drv.key(key, code=code or CODES.get(key), mods=mods, text=text)
    ctx.settle()
    ctx.frames(2)


def run(ctx):
    r = Result()
    ctx.leap(DOC, WINDOW[0])
    base = state(ctx)
    r.check(base['focus'] and base['focus']['kind'] == 'block', 'the landing\'s focus is a span', base['focus'])
    # ---- bare keys do nothing (K-9) -------------------------------------------------------
    for k in ['t', '/', '0', 'k', 'h', '?', '+', 'g']:
        chord(ctx, k)
        s = state(ctx)
        r.check(same_view(base, s) and s['focus'] == base['focus'] and s['overlay'] is None and not s['leap'] and s['trail'] == base['trail'], f'bare `{k}` changes nothing', {'cam_same': same_view(base, s), 'overlay': s['overlay'], 'leap': s['leap']})
    s = state(ctx)
    r.check('typing goes nowhere here' in s['line'], 'the K-9 swallow line shows at the focus', s['line'][-120:])
    # the Space key: its own line
    chord(ctx, ' ', code='Space')
    r.check('Space does not page here' in state(ctx)['line'], 'Space shows its own K-9 line (PageDown pages)')
    # ---- the IME guard: a composition key is never dispatched -----------------------------------
    ctx.drv.call('Input.dispatchKeyEvent', {'type': 'keyDown', 'key': 'Process', 'code': 'KeyT', 'windowsVirtualKeyCode': 229, 'text': 't', 'unmodifiedText': 't'})
    ctx.drv.call('Input.dispatchKeyEvent', {'type': 'keyUp', 'key': 'Process', 'code': 'KeyT', 'windowsVirtualKeyCode': 229})
    ctx.frames(2)
    s = state(ctx)
    r.check(same_view(base, s) and s['overlay'] is None and not s['leap'] and 'typing goes nowhere' not in s['line'], 'a composition key (keyCode 229) is not dispatched: nothing changes and no swallow line', s['line'][-80:])
    ctx.drv.ime('漢')
    ctx.frames(2)
    s = state(ctx)
    r.check(same_view(base, s) and s['overlay'] is None and not s['leap'], 'an IME commit on the plane changes nothing')
    # ---- the IME guard in the LEAP box: Enter, Esc and the arrows are the IME's until it commits (D5 §0) ---------
    chord(ctx, 'l', mods=('Meta',))
    ctx.js('(() => { document.getElementById("leapq").value = ""; })()')
    ctx.drv.ime('1.0.1.0.')
    ctx.frames(2)

    def box():
        return ctx.js('({open: window.__skep.leap.isOpen(), value: document.getElementById("leapq").value, selected: window.__skep.leap.rows().length ? [...document.querySelectorAll("#leaphits [aria-selected=true]")].map((o) => o.dataset.i) : null, trail: window.__skep.trail().cursor})')
    before = box()
    # what the page's listeners are handed, read ahead of them all: each composition key must arrive as one (keyCode 229)
    ctx.js('(() => { window.__gateKeys = []; window.__gateKeyRec = (e) => window.__gateKeys.push({key: e.key, keyCode: e.keyCode}); window.addEventListener("keydown", window.__gateKeyRec, true); })()')
    for key in ('ArrowDown', 'Enter', 'Escape'):
        ctx.drv.call('Input.dispatchKeyEvent', {'type': 'rawKeyDown', 'key': key, 'code': key, 'windowsVirtualKeyCode': 229})
        ctx.drv.call('Input.dispatchKeyEvent', {'type': 'keyUp', 'key': key, 'code': key, 'windowsVirtualKeyCode': 229})
        ctx.settle()
        ctx.frames(2)
    seen = ctx.js('(() => { window.removeEventListener("keydown", window.__gateKeyRec, true); return window.__gateKeys; })()')
    after = box()
    r.check(seen == [{'key': k, 'keyCode': 229} for k in ('ArrowDown', 'Enter', 'Escape')], 'the box was handed ↓, Enter and Esc as composition keys (keyCode 229)', seen)
    r.check(before['open'] and before['selected'] and after == before, 'a composition\'s ↓, Enter and Esc in the LEAP box act on nothing: the box open, its text and selected row kept, no LEAP', {'before': before, 'after': after})
    chord(ctx, 'Escape')
    r.check(not state(ctx)['leap'], 'Esc outside a composition closes the box')
    # ---- the LEAP box: Mod+L opens, Esc closes; Mod+K opens; typed address + Enter goes ----------
    chord(ctx, 'l', mods=('Meta',))
    r.check(state(ctx)['leap'], 'Mod+L opens the LEAP box')
    held = ctx.js('document.getElementById("leapq").value')
    r.check(held.startswith(DOC), 'the box holds the current address', held)
    chord(ctx, 'Escape')
    r.check(not state(ctx)['leap'], 'Esc closes the LEAP box')
    # Enter on the box as opened, no row chosen, goes where its input names — the current address, a landing in place that
    # pushes no trail entry — and to a listed level only once ↓ has chosen it (foundations §2.3)
    before, t0 = state(ctx), trail(ctx)
    chord(ctx, 'l', mods=('Meta',))
    chord(ctx, 'Enter')
    s, t1 = state(ctx), trail(ctx)
    r.check(not s['leap'] and same_view(before, s) and t1['cursor'] == t0['cursor'] and len(t1['entries']) == len(t0['entries']),
            'Mod+L then Enter lands in place: the box closes, and the camera, the trail\'s cursor and its length are unchanged',
            {'leap': s['leap'], 'cam_same': same_view(before, s), 'cursor': [t0['cursor'], t1['cursor']], 'entries': [len(t0['entries']), len(t1['entries'])]})
    chord(ctx, 'l', mods=('Meta',))
    chord(ctx, 'ArrowDown')
    chord(ctx, 'Enter')
    s = state(ctx)
    lod = ctx.js('window.__skep.view.lod()')['name']
    r.check(not s['leap'] and s['focus'] and s['focus']['kind'] == 'board' and lod in ('far', 'far~mid'), 'Mod+L, ↓, Enter goes to the first level the box lists: the whole board', {'focus': s['focus'], 'lod': lod})
    chord(ctx, 'k', mods=('Meta',))
    r.check(state(ctx)['leap'], 'Mod+K opens the LEAP box too')
    ctx.js('(() => { const i = document.getElementById("leapq"); i.value = ""; })()')
    ctx.drv.ime('1.0.1.0.19')
    ctx.frames(2)
    rows = ctx.js('window.__skep.leap.rows()')
    r.check(rows and rows[0]['addr'] == '1.0.1.0.19', 'the typed address is the first row', rows[:2])
    trail_before = state(ctx)['trail']
    chord(ctx, 'Enter')
    s = state(ctx)
    r.check(not s['leap'] and s['focus'] and s['focus']['addr'] == '1.0.1.0.19', 'Enter LEAPs to the typed address (the focus lands there)', s['focus'])
    r.check('1.0.1.0.19' in s['line'], 'the one line\'s address names the landing', s['line'][:120])
    r.check(s['trail'] == trail_before + 1, 'the LEAP pushed a trail entry', {'before': trail_before, 'after': s['trail']})
    r.check(ctx.js('window.__skep.view.lod()')['name'] == 'near', 'the landing is at reading scale')
    # a typed account's address is a teleport too (foundations §2.2): the account's region, an entry on the trail, and Back
    # returns to the view the LEAP left
    left, t0 = state(ctx), trail(ctx)
    chord(ctx, 'l', mods=('Meta',))
    ctx.js('(() => { document.getElementById("leapq").value = ""; })()')
    ctx.drv.ime(SECOND_ACCOUNT)
    ctx.frames(2)
    chord(ctx, 'Enter')
    s, t1 = state(ctx), trail(ctx)
    newest = t1['entries'][t1['cursor']] if 0 <= t1['cursor'] < len(t1['entries']) else None
    r.check(not s['leap'] and s['focus'] and s['focus']['kind'] == 'account' and s['focus']['addr'] == SECOND_ACCOUNT and t1['cursor'] == t0['cursor'] + 1
            and bool(newest) and newest['addr'] == SECOND_ACCOUNT and same_view({'cam': newest['view']}, s),
            'a typed account address LEAPs to its region and pushes its entry: the focus, the trail\'s newest entry and the camera are the account\'s',
            {'focus': s['focus'], 'cursor': [t0['cursor'], t1['cursor']], 'newest': newest and newest['addr']})
    chord(ctx, '[', mods=('Meta',))
    s = state(ctx)
    r.check(trail(ctx)['cursor'] == t0['cursor'] and same_view(left, s), 'Mod+[ from the account returns to the entry the LEAP left, at the view it left', {'cursor': s['trail'], 'cam': s['cam'], 'left': left['cam']})
    # ---- WHOLE BOARD and HOME (K-13, K-14) --------------------------------------------------------
    chord(ctx, '0', mods=('Meta',))
    s = state(ctx)
    r.check(ctx.js('window.__skep.view.lod()')['name'] in ('far', 'far~mid') and s['focus'] and s['focus']['kind'] == 'board', 'Mod+0 shows the whole board at the clamp (the far band on this viewport); the focus is the board', {'lod': ctx.js('window.__skep.view.lod()')['name'], 'focus': s['focus']})
    chord(ctx, 'H', mods=('Meta', 'Shift'))
    s = state(ctx)
    r.check(s['focus'] and s['focus']['kind'] == 'account' and s['focus']['addr'] == '1.0.1', 'Mod+Shift+H goes HOME: the acting account\'s region', s['focus'])
    r.check(ctx.js('window.__skep.view.lod()')['name'] in ('mid', 'far~mid'), 'HOME is the region at mid scale', ctx.js('window.__skep.view.lod()'))
    # ---- Back / Forward (K-20, K-21) ----------------------------------------------------------------------
    cur = state(ctx)['trail']
    chord(ctx, '[', mods=('Meta',))
    s = state(ctx)
    r.check(s['trail'] == cur - 1 and s['focus']['kind'] == 'board', 'Mod+[ goes back one trail entry (to WHOLE BOARD)', {'cursor': s['trail'], 'focus': s['focus']})
    chord(ctx, ']', mods=('Meta',))
    s = state(ctx)
    r.check(s['trail'] == cur and s['focus']['kind'] == 'account', 'Mod+] goes forward again', {'cursor': s['trail'], 'focus': s['focus']})
    # ---- the trail: Mod+1…9 and Mod+Y (K-40, K-41) ------------------------------------------------------
    numbered = ctx.js('window.__skep.trail().numbered')
    chord(ctx, '3', mods=('Meta',), code='Digit3')
    s = state(ctx)
    target = next((n for n in numbered if n['n'] == 3), None)
    r.check(target and s['focus'] and s['focus']['addr'] == target['addr'], 'Mod+3 moves the cursor to the trail\'s third entry (newest first)', {'target': target, 'focus': s['focus']})
    chord(ctx, 'y', mods=('Meta',))
    s = state(ctx)
    r.check(s['overlay'] == 'list', 'Mod+Y opens the trail list', s['overlay'])
    chord(ctx, 'Escape')
    r.check(state(ctx)['overlay'] is None, 'Esc closes the list')
    # ---- the walk (K-1 … K-8) -------------------------------------------------------------------------
    ctx.leap(DOC, WINDOW[0])
    f0 = state(ctx)['focus']
    chord(ctx, 'ArrowDown')
    f1 = state(ctx)['focus']
    r.check(f1 != f0 and f1['addr'] == DOC, '↓ moves the focus to the next span', {'from': f0, 'to': f1})
    chord(ctx, 'ArrowUp')
    r.check(state(ctx)['focus'] == f0, '↑ moves it back')
    chord(ctx, 'ArrowLeft')
    f2 = state(ctx)['focus']
    r.check(f2 and f2['kind'] == 'document' and f2['addr'] == DOC, '← leaves the span for its document', f2)
    chord(ctx, 'ArrowRight')
    f3 = state(ctx)['focus']
    r.check(f3 and f3['kind'] == 'block' and f3['addr'] == DOC, '→ enters the document at its first span', f3)
    chord(ctx, 'End')
    size = ctx.js('window.__skep.mirror.size()')
    r.check(ctx.js('window.__skep.mirror.index()') == size - 1, 'End goes to the last sibling')
    chord(ctx, 'Home')
    r.check(ctx.js('window.__skep.mirror.index()') == 0, 'Home goes to the first')
    # K-8: the first press selects the focused span whole, each further one extends by a span in the direction pressed
    blocks = ctx.js('window.__skep.model.doc(%s).blocks' % json.dumps(DOC))
    chord(ctx, 'ArrowDown'); chord(ctx, 'ArrowDown')
    s = state(ctx)
    focused = next((b for b in blocks if s['focus'] and b['pos'] == s['focus']['pos']), None)
    chord(ctx, 'ArrowDown', mods=('Shift',))
    s = state(ctx)
    r.check(s['sel'] and s['sel']['addr'] == DOC and s['overlay'] == 'card', 'Shift+↓ selects the focused span; its acts appear', {'sel': s['sel'], 'overlay': s['overlay']})
    r.check(focused and s['sel'] and s['sel']['pos'] == focused['pos'] and s['sel']['width'] == focused['width'], 'the first press selects the focused block whole (K-8)', {'sel': s['sel'], 'focused': focused})
    i = blocks.index(focused) if focused in blocks else -1
    above, below = (blocks[i - 1] if i > 0 else None), (blocks[i + 1] if 0 <= i < len(blocks) - 1 else None)
    chord(ctx, 'ArrowUp', mods=('Shift',))
    s2 = state(ctx)['sel']
    r.check(above and focused and s2 and s2['pos'] == above['pos'] and s2['pos'] + s2['width'] == focused['pos'] + focused['width'], 'Shift+↑ extends the selection by the span above (K-8)', {'sel': s2, 'above': above})
    chord(ctx, 'ArrowDown', mods=('Shift',))
    s3 = state(ctx)['sel']
    r.check(above and below and s3 and s3['pos'] == above['pos'] and s3['pos'] + s3['width'] == below['pos'] + below['width'], 'Shift+↓ extends it by the span below (K-8)', {'sel': s3, 'below': below})
    # the selection's read acts (K-47 … K-52)
    chord(ctx, 'L', mods=('Meta', 'Shift'))
    s = state(ctx)
    r.check(s['overlay'] == 'card' and ctx.js('window.__skep.overlay().id') == 'links:' + DOC, 'Mod+Shift+L opens the links card at the document', ctx.js('window.__skep.overlay().id'))
    r.check(ctx.js('window.__skep.reveal(%s)' % json.dumps(DOC))['stage'] >= 2, 'the chain moved to stage 2 (symbols)')
    chord(ctx, 'Escape')
    r.check(ctx.js('window.__skep.reveal(%s)' % json.dumps(DOC))['stage'] == 1, 'Esc dismisses the card; the chain is hidden again')
    # a row of the card opens its link's anatomy card in the card's place — a replacement, never a dismissal (O-HOST): the
    # chain's stage stands, the symbols at their spans, and the anatomy card stands at the link's own bytes. The link is one
    # whose marked words the landing at its position shows, below the one line
    shown = ctx.js('window.__skep.links.shown(%s)' % json.dumps(DOC))
    line_bottom = ctx.js('document.getElementById("line").getBoundingClientRect().bottom')
    row, link = None, None
    for i, s in enumerate(shown[:12]):
        ctx.leap(DOC, s['pos'])
        words = ctx.js('window.__skep.visible(%s)' % json.dumps('#domlayer [data-addr="%s"] .lip[data-links~="%s"]' % (DOC, s['link'])))
        if words and all(w['inClip'] and w['inView'] and w['rect']['y'] >= line_bottom for w in words):
            row, link = i, s
            break
    r.check(link is not None, 'a drawn link of the first edition has its marked words shown at the landing on its position', [s['pos'] for s in shown[:12]])
    if link is not None:
        ctx.js('window.__skep.cards.links(%s)' % json.dumps(DOC))
        ctx.frames(2)
        button = ctx.js('(() => { const b = document.querySelector(%s); if (!b) return null; const q = b.getBoundingClientRect(); return {x: q.left + q.width / 2, y: q.top + q.height / 2}; })()' % json.dumps('#overlay [data-run="row:%d"]' % row))
        r.check(button is not None, 'the links card lists the link as its row %d' % row)
        if button is not None:
            ctx.drv.mouse(button['x'], button['y'])
            ctx.js('new Promise((res) => { const t0 = performance.now(); const tick = () => ((window.__skep.overlay().id || "").startsWith("anatomy:") || performance.now() - t0 > 10000 ? res(true) : setTimeout(tick, 50)); tick(); })')
            ctx.frames(2)
            placed = ctx.js('''(() => { const o = document.getElementById('overlay'), q = o.getBoundingClientRect(), p = window.__skep.view.viewport();
              const rs = window.__skep.spanRects(%s, %d, %d);
              return {at: {x: parseFloat(o.style.left), y: parseFloat(o.style.top)}, first: rs ? rs[0] : null,
                      want: rs ? {x: Math.max(6, Math.min(p.VW - q.width - 6, rs[0].x)), y: Math.max(34, Math.min(p.VH - q.height - 6, rs[0].y + rs[0].h + 4))} : null}; })()''' % (json.dumps(DOC), link['pos'], link['width']))
            r.check(ctx.js('window.__skep.overlay().id') == 'anatomy:' + link['link'], 'the row\'s press opens the link\'s anatomy card', ctx.js('window.__skep.overlay().id'))
            r.check(ctx.js('window.__skep.reveal(%s)' % json.dumps(DOC))['stage'] == 2, 'the anatomy card took the links card\'s place and the chain stands at stage 2: the symbols stay at their spans', ctx.js('window.__skep.reveal(%s)' % json.dumps(DOC)))
            want = placed['want']
            r.check(bool(want) and abs(placed['at']['x'] - want['x']) <= 0.5 and abs(placed['at']['y'] - want['y']) <= 0.5, 'the anatomy card stands at the link\'s own bytes, beneath their first line, as the host places a span\'s overlay', placed)
        chord(ctx, 'Escape')
        ctx.js('window.__skep.links.hide(%s)' % json.dumps(DOC))
        ctx.frames(2)
    # select the block that holds a drawn link, then follow (Mod+Enter) to its ghost → the dead-reference face
    shown = ctx.js('window.__skep.links.shown(%s)' % json.dumps(DOC))
    blocks = ctx.js('window.__skep.model.doc(%s).blocks' % json.dumps(DOC))
    linked = next((b for b in blocks for s in shown if b['pos'] <= s['pos'] < b['pos'] + b['width']), None)
    n_here = sum(1 for s in shown if linked and linked['pos'] <= s['pos'] < linked['pos'] + linked['width'])
    ctx.js('window.__skep.select(%s, %d)' % (json.dumps(DOC), linked['pos']))
    ctx.frames(2)
    r.check(ctx.js('window.__skep.overlay().id') == 'selection', 'the selection card stands at the linked span')
    chord(ctx, 'O', mods=('Meta', 'Shift'))
    s = state(ctx)
    r.check(s['overlay'] == 'card' and 'written by' in ctx.js('window.__skep.overlay().text'), 'Mod+Shift+O asks "who wrote this?" (show_origin)', ctx.js('window.__skep.overlay().text')[:160])
    chord(ctx, 'Escape')
    ctx.js('window.__skep.select(%s, %d)' % (json.dumps(DOC), linked['pos']))
    chord(ctx, 'R', mods=('Meta', 'Shift'))
    s = state(ctx)
    r.check(s['overlay'] == 'card' and 'used by' in ctx.js('window.__skep.overlay().text'), 'Mod+Shift+R asks "who uses this?" (find_docs_containing)', ctx.js('window.__skep.overlay().text')[:160])
    chord(ctx, 'Escape')
    ctx.js('window.__skep.select(%s, %d)' % (json.dumps(DOC), linked['pos']))
    chord(ctx, 'Enter', mods=('Meta',))
    s = state(ctx)
    if n_here == 1:
        r.check(s['overlay'] == 'face' and 'nothing this board will say' in ctx.js('window.__skep.overlay().text'), 'Mod+Enter follows the one drawn link: its ghost target answers the dead-reference face', ctx.js('window.__skep.overlay().text')[:160])
        r.check(ctx.js('window.__skep.links.visited(%s)' % json.dumps(shown[0]['link'])) or any(ctx.js('window.__skep.links.visited(%s)' % json.dumps(x['link'])) for x in shown), 'the followed link joins LK\'s visited set (D-3)')
    else:
        r.check(s['overlay'] == 'list', 'Mod+Enter at a span with several links asks which', {'n': n_here, 'overlay': s['overlay']})
    chord(ctx, 'Escape')
    chord(ctx, 'Escape')
    r.check(state(ctx)['sel'] is None and state(ctx)['overlay'] is None, 'Esc clears the overlay, then the selection (one order)')
    # ---- the drag: the selection IS the text it crosses (R11; foundations §2.4) ----------------------------
    # a phrase of a paragraph the page SHOWS — inside the article's clip and the viewport, and below the one line,
    # which stands over the plane's top (the document's tail past the clip is shown to no one and takes no pointer) —
    # thirty characters in from the paragraph's tenth
    ctx.leap(DOC, WINDOW[0])
    shown_blocks = {v['pos']: v for v in ctx.js('window.__skep.visible(%s)' % json.dumps('#domlayer .sp[data-addr="%s"]' % DOC)) if v['inClip'] and v['inView']}
    vp = ctx.js('window.__skep.view.viewport()')
    line_bottom = ctx.js('document.getElementById("line").getBoundingClientRect().bottom')
    target, p0, p1, rects = None, 0, 0, None
    for b in blocks:
        if b['kind'] != 'para' or b['pos'] not in shown_blocks or len(b['text']) < 60 or b['text'].startswith('#'):
            continue
        q0 = b['pos'] + len(b['text'][:10].encode('utf8'))
        q1 = b['pos'] + len(b['text'][:40].encode('utf8'))
        qs = ctx.js('window.__skep.spanRects(%s, %d, %d)' % (json.dumps(DOC), q0, q1 - q0))
        if qs and all(line_bottom + 2 <= q['y'] and q['y'] + q['h'] <= vp['VH'] and 0 <= q['x'] and q['x'] + q['w'] <= vp['VW'] for q in qs):
            target, p0, p1, rects = b, q0, q1, qs
            break
    r.check(target is not None, 'a paragraph of the first edition is shown at the landing with a phrase clear of the one line (inside its clip and the viewport)', {'shown': sorted(shown_blocks), 'line_bottom': line_bottom})
    sel = None
    if rects:
        first, last = rects[0], rects[-1]
        ctx.drv.drag(first['x'] + 0.5, first['y'] + first['h'] / 2, last['x'] + last['w'] - 0.5, last['y'] + last['h'] / 2)
        ctx.frames(3)
        s = state(ctx)
        sel = s['sel']
        inside = bool(sel) and sel['addr'] == DOC and abs(sel['pos'] - p0) <= 3 and abs(sel['pos'] + sel['width'] - p1) <= 3
        r.check(inside and sel['width'] < target['width'], 'a drag over a phrase selects that phrase\'s byte span — never the whole block', {'sel': sel, 'phrase': (p0, p1), 'block': (target['pos'], target['width'])})
        r.check(s['overlay'] == 'card' and ctx.js('window.__skep.overlay().id') == 'selection', 'the selection\'s acts appear at the dragged span', ctx.js('window.__skep.overlay().id'))
        plat = ctx.js('window.__skep.platformSelection()')
        r.check(not plat['collapsed'] and plat['span'] == sel, 'the platform\'s selection and the page\'s name the same bytes', plat)
        # the copy: the passage's board and address beside the plain text, never in it (§2.4)
        copied = ctx.js('window.__skep.copy()')
        flavor = json.loads((copied.get('data') or {}).get('application/x-skep-passage') or 'null')
        origin = ctx.js('window.__skep.model.board().origin')
        r.check(bool(flavor) and bool(sel) and flavor['board'] == origin and flavor['addr'] == DOC and flavor['pos'] == sel['pos'] and flavor['width'] == sel['width'], 'the copy\'s skep flavor names the board, the document and the dragged span, width and all', flavor)
        own = ctx.js('window.__skep.model.text(%s, %d, %d)' % (json.dumps(DOC), sel['pos'], sel['pos'] + sel['width'])) if sel else None
        plain = (copied.get('data') or {}).get('text/plain')
        r.check(plain is not None and plain == own and '≡' not in plain and '⟡' not in plain, 'the copy\'s plain text is the document\'s own bytes over the span — no label or symbol of the page among them', {'plain': (plain or '')[:80], 'own': (own or '')[:80]})
        # who wrote this? asks over the dragged bytes: the `show_origin` frame on the wire carries the phrase's span, not its block's
        n_calls = len(ctx.js('window.__skep.bridge.calls()'))
        chord(ctx, 'O', mods=('Meta', 'Shift'))
        answer = ctx.js('window.__skep.overlay().text') or ''
        asked = [json.loads(c['frame']) for c in ctx.js('window.__skep.bridge.calls()')[n_calls:] if c.get('op') == 'show_origin']
        spans = [(int(f['span']['start'].split('.')[-1]), int(f['span']['width'].split('.')[-1])) for f in asked]
        r.check(state(ctx)['overlay'] == 'card' and 'written by' in answer and bool(sel) and spans == [(sel['pos'], sel['width'])], 'Mod+Shift+O asks show_origin over the dragged span exactly — the phrase\'s bytes, not its block\'s', {'asked': spans, 'sel': sel, 'answer': answer[:120]})
        chord(ctx, 'Escape')
        r.check(state(ctx)['sel'] == sel and state(ctx)['overlay'] is None, 'Esc dismisses the answer; the selection it was asked over stands', state(ctx)['sel'])
        # the selection survives a remount: the links card bumps every mounted article
        chord(ctx, 'L', mods=('Meta', 'Shift'))
        plat = ctx.js('window.__skep.platformSelection()')
        r.check(ctx.js('window.__skep.overlay().id') == 'links:' + DOC and not plat['collapsed'] and plat['span'] == sel, 'the links card opened (the article remounted) and the platform\'s highlight still stands over the span', plat)
        chord(ctx, 'Escape')
        chord(ctx, 'Escape')
        r.check(state(ctx)['sel'] is None and ctx.js('window.__skep.platformSelection()')['collapsed'], 'Esc clears the card, then the selection — the platform\'s highlight with it')
    r.figures['drag'] = {'phrase': (p0, p1), 'selected': sel, 'block': target and {'pos': target['pos'], 'width': target['width']}}
    # ---- zoom (K-11) and paging (K-6) ----------------------------------------------------------------------
    c0 = state(ctx)['cam']
    chord(ctx, '=', mods=('Meta',))
    c1 = state(ctx)['cam']
    r.check(abs(c1['scale'] / c0['scale'] - 1.25) < 0.01, 'Mod+= zooms in by 1.25', {'from': c0['scale'], 'to': c1['scale']})
    chord(ctx, '-', mods=('Meta',))
    c2 = state(ctx)['cam']
    r.check(abs(c2['scale'] - c0['scale']) < 1e-9, 'Mod+- zooms back out', {'to': c2['scale']})
    chord(ctx, 'PageDown')
    c3 = state(ctx)['cam']
    vh = ctx.js('window.__skep.view.viewport().VH')
    r.check(abs((c3['y'] - c2['y']) * c2['scale'] - 0.9 * vh) < 2, 'PageDown pages the view by 0.9 of its height', {'dy_px': (c3['y'] - c2['y']) * c2['scale'], 'vh': vh})
    chord(ctx, 'PageUp')
    # ---- the scene (K-62, K-63, K-64) ----------------------------------------------------------------
    open_scene(ctx)
    r.check(ctx.js('window.__skep.scene.isOpen()'), 'the scene opens between the window and its origin')
    c4 = state(ctx)['cam']
    chord(ctx, '=', mods=('Meta',))
    r.check(same_view({'cam': c4}, state(ctx)) and ctx.js('window.__skep.scene.isOpen()'), 'Mod+= in the scene is swallowed (nothing is nearer than its reading scale)')
    chord(ctx, 'r', mods=('Meta',))
    r.check(ctx.js('window.__skep.scene.isOpen()'), 'Mod+R re-levels the panes and reloads nothing')
    chord(ctx, 'Escape')
    r.check(not ctx.js('window.__skep.scene.isOpen()'), 'Esc dismisses the scene')
    # a navigation act from the scene dismisses it and makes its own trail move alone (foundations §2.2, §2.5): Back goes
    # one entry back, nothing pushed or dropped, and Forward returns to the entry it left — each entry a view of its own
    ctx.leap(DOC, WINDOW[0])
    chord(ctx, '0', mods=('Meta',))
    t0, left = trail(ctx), state(ctx)
    open_scene(ctx)
    chord(ctx, '[', mods=('Meta',))
    t1, s = trail(ctx), state(ctx)
    behind = t0['entries'][t0['cursor'] - 1]['view']
    r.check(not s['scene'] and t1['cursor'] == t0['cursor'] - 1 and len(t1['entries']) == len(t0['entries']) and same_view({'cam': behind}, s),
            'Mod+[ in the scene dismisses it and goes back one entry: the cursor one back, nothing pushed or dropped, the camera at that entry\'s view',
            {'scene': s['scene'], 'cursor': [t0['cursor'], t1['cursor']], 'entries': [len(t0['entries']), len(t1['entries'])], 'cam': s['cam'], 'behind': behind})
    chord(ctx, ']', mods=('Meta',))
    t2, s = trail(ctx), state(ctx)
    r.check(t2['cursor'] == t1['cursor'] + 1 == t0['cursor'] and len(t2['entries']) == len(t0['entries']) and same_view(left, s),
            'Mod+] moves the cursor forward again, to the entry Back left, at the view the scene stood over', {'cursor': [t0['cursor'], t1['cursor'], t2['cursor']], 'cam': s['cam'], 'left': left['cam']})
    # a teleport from the scene pushes its own entry alone: the trail gains one, and each Back from there moves the camera
    ctx.leap(DOC, WINDOW[0])
    t0 = trail(ctx)
    open_scene(ctx)
    chord(ctx, '0', mods=('Meta',))
    t1, at_board = trail(ctx), state(ctx)
    r.check(not at_board['scene'] and len(t1['entries']) == len(t0['entries']) + 1 and t1['cursor'] == t0['cursor'] + 1,
            'Mod+0 in the scene dismisses it and pushes WHOLE BOARD alone: the trail gains exactly one entry',
            {'scene': at_board['scene'], 'entries': [len(t0['entries']), len(t1['entries'])], 'cursor': [t0['cursor'], t1['cursor']]})
    chord(ctx, '[', mods=('Meta',))
    first = state(ctx)
    chord(ctx, '[', mods=('Meta',))
    second = state(ctx)
    r.check(not same_view(at_board, first) and not same_view(first, second), 'two Mod+[ from there each move the camera: no entry holds the view the scene stood over a second time',
            {'board': at_board['cam'], 'first': first['cam'], 'second': second['cam']})
    # ---- the platform's own are never taken (K-92): Mod+C leaves everything -----------------------------
    s0 = state(ctx)
    chord(ctx, 'c', mods=('Meta',))
    s1 = state(ctx)
    r.check(same_view(s0, s1) and s1['overlay'] == s0['overlay'] and not s1['leap'], 'Mod+C is the platform\'s: nothing happens on the plane')
    r.figures['chords_dispatched'] = ['t', '/', '0', 'k', 'h', '?', '+', 'g', 'Space', 'Process(229)', 'IME commit', '↓/Enter/Esc(229) in the LEAP box', 'Mod+L', 'Esc', 'Mod+L Enter', 'Mod+L ↓ Enter', 'Mod+K', 'Enter', 'Enter on an account address', 'Mod+0', 'Mod+Shift+H', 'Mod+[', 'Mod+]', 'Mod+3', 'Mod+Y', '↓', '↑', '←', '→', 'End', 'Home', 'Shift+↓', 'Shift+↑', 'Mod+Shift+L', 'a links card row\'s press', 'Mod+Shift+O', 'Mod+Shift+R', 'Mod+Enter', 'a pointer drag', 'Mod+=', 'Mod+-', 'PageDown', 'PageUp', 'Mod+R', 'Mod+[ and Mod+] in the scene', 'Mod+0 in the scene', 'Mod+C']
    ctx.leap(DOC, WINDOW[0])
    return r.out()
