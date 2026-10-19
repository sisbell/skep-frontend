"""KEYS — class 2 (the structure record §6.3; T3 (2); M7): every D5 chord the
lane built, dispatched at engine level (`Input.dispatchKeyEvent`, Meta as Mod
on this Mac), then the camera, the focus and the one line read back; the IME
guard; a bare key does NOTHING but show the K-9 line. Each step leaves the
page as it found it."""
import json

from . import DOC, WINDOW, Result

CODES = {'[': 'BracketLeft', ']': 'BracketRight', '=': 'Equal', '-': 'Minus', '0': 'Digit0', '1': 'Digit1', '2': 'Digit2', '/': 'Slash', '+': 'Equal'}


def state(ctx):
    return ctx.js('({cam: window.__skep.view.camera(), focus: window.__skep.view.focus(), line: window.__skep.line().text, overlay: window.__skep.overlay().kind, leap: window.__skep.leap.isOpen(), trail: window.__skep.trail().cursor, scene: window.__skep.scene.isOpen(), sel: window.__skep.selection()})')


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
    # ---- the LEAP box: Mod+L opens, Esc closes; Mod+K opens; typed address + Enter goes ----------
    chord(ctx, 'l', mods=('Meta',))
    r.check(state(ctx)['leap'], 'Mod+L opens the LEAP box')
    held = ctx.js('document.getElementById("leapq").value')
    r.check(held.startswith(DOC), 'the box holds the current address', held)
    chord(ctx, 'Escape')
    r.check(not state(ctx)['leap'], 'Esc closes the LEAP box')
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
    chord(ctx, 'ArrowDown', mods=('Shift',))
    s = state(ctx)
    r.check(s['sel'] and s['sel']['addr'] == DOC and s['overlay'] == 'card', 'Shift+↓ selects the focused span; its acts appear', {'sel': s['sel'], 'overlay': s['overlay']})
    # the selection's read acts (K-47 … K-52)
    chord(ctx, 'L', mods=('Meta', 'Shift'))
    s = state(ctx)
    r.check(s['overlay'] == 'card' and ctx.js('window.__skep.overlay().id') == 'links:' + DOC, 'Mod+Shift+L opens the links card at the document', ctx.js('window.__skep.overlay().id'))
    r.check(ctx.js('window.__skep.reveal(%s)' % json.dumps(DOC))['stage'] >= 2, 'the chain moved to stage 2 (symbols)')
    chord(ctx, 'Escape')
    r.check(ctx.js('window.__skep.reveal(%s)' % json.dumps(DOC))['stage'] == 1, 'Esc dismisses the card; the chain is hidden again')
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
    ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(DOC), json.dumps(WINDOW[2])))
    ctx.settle()
    ctx.frames(2)
    r.check(ctx.js('window.__skep.scene.isOpen()'), 'the scene opens between the window and its origin')
    c4 = state(ctx)['cam']
    chord(ctx, '=', mods=('Meta',))
    r.check(same_view({'cam': c4}, state(ctx)) and ctx.js('window.__skep.scene.isOpen()'), 'Mod+= in the scene is swallowed (nothing is nearer than its reading scale)')
    chord(ctx, 'r', mods=('Meta',))
    r.check(ctx.js('window.__skep.scene.isOpen()'), 'Mod+R re-levels the panes and reloads nothing')
    chord(ctx, 'Escape')
    r.check(not ctx.js('window.__skep.scene.isOpen()'), 'Esc dismisses the scene')
    # ---- the platform's own are never taken (K-92): Mod+C leaves everything -----------------------------
    s0 = state(ctx)
    chord(ctx, 'c', mods=('Meta',))
    s1 = state(ctx)
    r.check(same_view(s0, s1) and s1['overlay'] == s0['overlay'] and not s1['leap'], 'Mod+C is the platform\'s: nothing happens on the plane')
    r.figures['chords_dispatched'] = ['t', '/', '0', 'k', 'h', '?', '+', 'g', 'Space', 'Process(229)', 'IME commit', 'Mod+L', 'Esc', 'Mod+K', 'Enter', 'Mod+0', 'Mod+Shift+H', 'Mod+[', 'Mod+]', 'Mod+3', 'Mod+Y', '↓', '↑', '←', '→', 'End', 'Home', 'Shift+↓', 'Mod+Shift+L', 'Mod+Shift+O', 'Mod+Shift+R', 'Mod+Enter', 'Mod+=', 'Mod+-', 'PageDown', 'PageUp', 'Mod+R', 'Mod+C']
    ctx.leap(DOC, WINDOW[0])
    return r.out()
