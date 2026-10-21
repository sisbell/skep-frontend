"""KEYS — class 2 (the structure record §6.3; T3 (2); M7): every D5 chord the
lane built, dispatched at engine level (`Input.dispatchKeyEvent`, Meta as Mod
on this Mac), then the camera, the focus, the trail and the one line read
back; the IME guard, on the plane and in the LEAP box; a bare key does
NOTHING but show the K-9 line; Enter on the LEAP box as opened lands in
place, ↓ choosing the first level, Enter on typed text that matches nothing
goes nowhere — the box standing open over the text and its answer, the
focus in its input, until Esc — and a typed account address a teleport
with its trail entry (foundations §2.2, §2.3; K-31); the focus ring drawn
at the focus every teleport a key made lands — the box's Enter, Mod+[ and Mod+],
Mod+0, Mod+Shift+H, Enter on the line's ‹ back (K-22), Mod+3, Enter on a
trail list row (K-41), Enter on a document (K-7) — and at the focus
PageDown re-takes, and no ring after a click on ‹ back (D5 §4 rule 2: drawn
once a key has moved the focus); the scene's own end — Esc,
zoom-out — making no trail move, so Back after it moves the camera and the
entries ahead of the cursor stand; a navigation act from the scene — Back,
Forward, a teleport — making one trail move, its own (§2.5); no key reaching
what the scene covers (D5 M-4) — → and Enter in a pane, the walk on the
document under it, moving neither the camera nor the walk's focus nor the
trail; Enter, Shift+↓ and Mod+Shift+O there, the walk on a block, making no
selection and no card; ↓ with the focus on nothing walking nothing — and
Enter on the scene's acts pressing them: the re-level setting the two ends
level again, the × ending the scene with the focus back on the item it was
opened from (K-62, K-63); K-8's select and extend by span; a links card
row's anatomy card taking the card's place with the symbols standing, at
the link's own bytes; the
selection's one continuous gesture (R11) — a pointer drag over a phrase of a
shown paragraph selects that phrase's byte span, never its block: the acts
ask the wire over those bytes, the copy names them, and the platform's
highlight survives the remount the links card causes; the platform's
selection standing as the person left it — a drag from a phrase's end to its
start marked in place, the article standing and the selection running
backward, and put back backward after the links card's two remounts; Shift+→
twice then Shift+← (K-71, the platform's own keys) taking back the second
step, the start unmoved; the focus ring following the walk to the block Enter
selects — with figures for where Chrome moves a selection with Shift+→; and the press holds
what the drag is anchored in — a feed row naming the document with the
button down (the gate's `model.invalidate` door, reads alone) leaves the
half-dragged bytes reading back and the drag's article standing while the
text arrives again, the release takes the whole phrase, a context menu ends
the press, and the document holding the selection, brought back into view
under a press, mounts only once it ends. Below the readable threshold of 8 a
press is keyed on legibility, never on whether text is mounted (§2.4): at em
6 a click on the first edition's mounted text teleports to it as a click at
the same point on its bars does, and a drag along that text selects nothing
and pans nothing, while at em 9 a click on its text selects the block whole;
and a drag begun on legible text keeps its article through a zoom below the
threshold with the button down, the release taking the whole phrase and the
frame after it taking the pointer from the article. In the reading scene a
drag selects as it does on the plane (§2.5): a drag over a phrase of a pane,
or from its head into its first block, is copied as the passage's board and
address beside the document's own bytes over the bytes dragged, the head's
words never among them, and makes no selection of the page's; and a feed row
naming a pane's document (the same door) leaves the pane's copy its own
bytes, its two ends level after the re-level act and its band standing. Each
step leaves the page as it found it."""
import json

from . import DOC, NO_MATCH, SECOND_ACCOUNT, WINDOW, Result
from .layout import inside, level_holds, scene_level

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


def covered(ctx):
    """what a key could move under a standing scene — the camera, the walk's focus, the trail, the selection, the overlay —
    whether the scene stands, and the element the platform's focus is on"""
    return ctx.js('''(() => { const S = window.__skep, f = S.view.focus(), e = document.activeElement;
      return {cam: S.view.camera(), focus: f && {kind: f.kind, addr: f.addr, pos: f.pos}, trail: S.trail(), sel: S.selection(), overlay: S.overlay().id,
              scene: S.scene.isOpen(), at: !e || e === document.body ? 'the body' : e.id || e.tagName.toLowerCase()}; })()''')


def still(before, after):
    """the scene stands over the page as the key found it: nothing under it moved"""
    return after['scene'] and same_view(before, after) and all(after[k] == before[k] for k in ('focus', 'trail', 'sel', 'overlay'))


def chord(ctx, key, mods=(), code=None, text=None):
    ctx.drv.key(key, code=code or CODES.get(key), mods=mods, text=text)
    ctx.settle()
    ctx.frames(2)


def ring(ctx):
    """the focus ring as the last frame drew it — the box on screen it outlined, None where it drew none — beside the
    focus and the focused element's box on screen, read from the projection and the camera: the document's box for a
    document, a span or a link, the account's cell, the board's"""
    return ctx.js('''(() => { const s = window.__skep, f = s.view.focus(), c = s.view.camera(), p = s.view.viewport();
      const b = !f ? null : f.kind === 'account' ? s.accountCell(f.addr) : f.kind === 'board' ? s.boardCell(f.addr) : s.boxOf(f.addr);
      return {ring: s.view.ring(), focus: f && {kind: f.kind, addr: f.addr, pos: f.pos},
              box: b && {x: (b.x - c.x) * c.scale + p.VW / 2, y: (b.y - c.y) * c.scale + p.VH / 2, w: b.w * c.scale, h: b.h * c.scale}}; })()''')


def ring_drawn(ctx, r, made):
    """the check that the ring stands at the focus a key moved (D5 §4 rule 2: drawn once a key has moved the focus, the
    platform's focus-visible rule). At reading scale a span's ring is its lit block, the ring's reading-scale form (D3),
    and the canvas circles no mounted document; elsewhere it is the canvas box around the focused element."""
    f = ctx.js('window.__skep.view.focus()')
    rule = ctx.js('window.__skep.focus().ring')
    if f and f.get('kind') == 'block' and ctx.js('window.__skep.mountedAddrs().includes(%s)' % json.dumps(f['addr'])):
        g = ring(ctx)
        lit = ctx.js('(() => { const a = document.querySelector(%s); return a ? [...a.querySelectorAll(".sp.lit")].map((e) => Number(e.dataset.pos)) : null; })()' % json.dumps('#domlayer article.dtext[data-addr="%s"]' % f['addr']))
        r.check(rule is True and g['ring'] is None and lit == [f['pos']], 'the ring is drawn at the focus %s moved — at reading scale its lit block, the canvas circling no mounted document (D3)' % made, {'rule': rule, 'canvas_ring': g['ring'], 'lit': lit, 'pos': f['pos']})
        return g
    g = ring(ctx)
    a, b = g['ring'], g['box']
    r.check(rule is True and bool(a) and bool(b) and all(abs(a[k] - b[k]) <= 0.5 for k in ('x', 'y', 'w', 'h')), 'the ring is drawn at the focus %s moved, around its box' % made, g)
    return g


def phrase_at(ctx, addr):
    """a phrase of a paragraph the page SHOWS at the view as it stands — inside the article's clip and the viewport, and
    below the one line, which stands over the plane's top (the document's tail past the clip is shown to no one and takes
    no pointer) — thirty characters in from the paragraph's tenth, the article itself under the pointer at each point a
    drag over it passes: the press at its first character, the half at the end of its fifteenth, the end at the end of its
    last. Its block, its first, half and last positions, its rects and those points, with what the search saw; None where
    the view shows no such phrase"""
    shown = {v['pos'] for v in ctx.js('window.__skep.visible(%s)' % json.dumps('#domlayer .sp[data-addr="%s"]' % addr)) if v['inClip'] and v['inView']}
    vp = ctx.js('window.__skep.view.viewport()')
    line_bottom = ctx.js('document.getElementById("line").getBoundingClientRect().bottom')
    seen = {'shown': sorted(shown), 'line_bottom': line_bottom}
    for b in ctx.js('window.__skep.model.doc(%s).blocks' % json.dumps(addr)):
        if b['kind'] != 'para' or b['pos'] not in shown or len(b['text']) < 60 or b['text'].startswith('#'):
            continue
        p0, ph, p1 = (b['pos'] + len(b['text'][:n].encode('utf8')) for n in (10, 25, 40))
        rects = ctx.js('window.__skep.spanRects(%s, %d, %d)' % (json.dumps(addr), p0, p1 - p0))
        if not rects or not all(line_bottom + 2 <= q['y'] and q['y'] + q['h'] <= vp['VH'] and 0 <= q['x'] and q['x'] + q['w'] <= vp['VW'] for q in rects):
            continue
        lines = [q for q in rects if q['w'] > 0 and q['h'] > 0]
        halves = [q for q in ctx.js('window.__skep.spanRects(%s, %d, %d)' % (json.dumps(addr), p0, ph - p0)) or [] if q['w'] > 0 and q['h'] > 0]
        if not lines or not halves:
            continue
        first, mid, last = lines[0], halves[-1], lines[-1]
        points = {'start': (first['x'] + 0.5, first['y'] + first['h'] / 2), 'half': (mid['x'] + mid['w'] - 0.5, mid['y'] + mid['h'] / 2),
                  'end': (last['x'] + last['w'] - 0.5, last['y'] + last['h'] / 2)}
        under = ctx.js('[%s].map(([x, y]) => { const e = document.elementFromPoint(x, y); const a = e && e.closest("#domlayer article.dtext"); return a ? a.dataset.addr : null; })'
                       % ', '.join('[%r, %r]' % p for p in points.values()))
        if all(u == addr for u in under):
            return dict(points, block=b, p0=p0, ph=ph, p1=p1, rects=rects), seen
    return None, seen


def article(addr):
    """the expression for a document's article on the plane's text layer"""
    return 'document.querySelector(%s)' % json.dumps('#domlayer article.dtext[data-addr="%s"]' % addr)


NOW = '({sel: window.__skep.selection(), platform: window.__skep.platformSelection()})'


def marks(ctx, cls):
    """the first positions of the first edition's blocks that carry a mark — `sel`, `lit` — in its article on the plane;
    None where the article is not mounted"""
    return ctx.js('(() => { const a = %s; return a ? [...a.querySelectorAll(".sp.%s")].map((e) => Number(e.dataset.pos)) : null; })()' % (article(DOC), cls))


def focus_at(ctx):
    """where the platform's focus stands, by the region of the page that holds it"""
    return ctx.js('(() => { const e = document.activeElement; if (!e || e === document.body) return "the body"; '
                  'const at = e.closest("#overlay") ? "the overlay" : e.closest("#mirror") ? "the mirror" : e.closest("#line") ? "the line" : "the page"; '
                  'return at + ": " + e.tagName.toLowerCase() + (e.id ? "#" + e.id : ""); })()')


def shifted(ctx, r, made):
    """Shift+→ at a selection the page made, and where the focus stood: whether the platform moved its selection, and the
    check that nothing drifts — the page's span the platform's where it moved, the page's own unchanged where it did not"""
    before, focus = ctx.js(NOW), focus_at(ctx)
    chord(ctx, 'ArrowRight', mods=('Shift',))
    after = ctx.js(NOW)
    moved = after['platform']['span'] != before['platform']['span']
    r.check(bool(before['sel']) and (after['sel'] == after['platform']['span'] if moved else after['sel'] == before['sel']),
            'Shift+→ at a selection %s made: nothing drifts — the page\'s span is the platform\'s where the platform moved it, its own where it did not' % made,
            {'before': before, 'after': after, 'moved': moved, 'focus': focus})
    return {'focus': focus, 'moved': moved, 'before': before['sel'], 'after': after['sel']}


def anchor_stands(ctx, r):
    """the platform's selection stands as the person left it (foundations §2.1: "the SELECTION is the platform's own,
    transient"; D5 §2: "Constant: the selection is the platform's own"). A drag from a phrase's end to its start is marked in
    place — the article the drag was made in stands, the block the span touches carries the mark, and the platform's
    selection runs backward, its anchor at the phrase's end — and the two remounts of the links card's opening and its
    dismissal put it back so. After a drag from a phrase's start to its end, Shift+→ twice and Shift+← (D5 K-71, the
    platform's own keys) end where the first Shift+→ put the end, the start never moved, the page's span the platform's at
    every press. ↓ moves the walk's focus ring to the next block, and Enter there selects it: the ring and the selection's
    mark on that one block. The figures say whether Chrome on this machine moves a selection with Shift+→ where a drag made
    it, where Enter made it (the focus on the mirror's item) and where K-8 made it (the focus in the selection's card); at
    the last two the check holds only that nothing drifts. The Safari pass repeats these steps by hand (FP-19): the gate
    runs Chrome alone."""
    figures = {'machine': {'chrome': ctx.env.get('chrome'), 'platform': ctx.js('navigator.platform')}}
    art = article(DOC)
    ctx.leap(DOC, WINDOW[0])
    ph, seen = phrase_at(ctx, DOC)
    r.check(ph is not None, 'a phrase of the first edition is shown at the landing, for a drag from its end to its start', seen)
    if ph:
        ctx.js('window.__gateArt = %s' % art)
        ctx.drv.drag(*ph['end'], *ph['start'])
        ctx.frames(3)
        got = dict(ctx.js('({same: %s === window.__gateArt, sel: window.__skep.selection(), platform: window.__skep.platformSelection()})' % art), marked=marks(ctx, 'sel'))
        sel = got['sel']
        r.check(bool(sel) and sel['addr'] == DOC and abs(sel['pos'] - ph['p0']) <= 3 and abs(sel['pos'] + sel['width'] - ph['p1']) <= 3 and got['platform']['span'] == sel,
                'a drag from a phrase\'s end to its start selects the phrase, the page\'s span the platform\'s', dict(got, phrase=(ph['p0'], ph['p1'])))
        r.check(got['same'] and got['marked'] == [ph['block']['pos']],
                'the selection is marked in place: the article the drag was made in stands, and the block the span touches carries the mark, no other', dict(got, block=ph['block']['pos']))
        r.check(got['platform']['backward'], 'the platform\'s selection runs backward, as the drag made it: its anchor at the phrase\'s end', got['platform'])
        figures['backward_drag'] = got
        if sel:
            # two remounts: the links card's opening (the reveal moves to its symbols) and its dismissal (the reveal hidden again)
            chord(ctx, 'L', mods=('Meta', 'Shift'))
            opened = ctx.js('({id: window.__skep.overlay().id, rebuilt: %s !== window.__gateArt, sel: window.__skep.selection(), platform: window.__skep.platformSelection()})' % art)
            ctx.js('window.__gateArt = %s' % art)
            chord(ctx, 'Escape')
            closed = ctx.js('({id: window.__skep.overlay().id, rebuilt: %s !== window.__gateArt, sel: window.__skep.selection(), platform: window.__skep.platformSelection()})' % art)
            r.check(opened['id'] == 'links:' + DOC and opened['rebuilt'] and opened['sel'] == sel and opened['platform']['span'] == sel and opened['platform']['backward'],
                    'the links card rebuilds the article and the selection is put back as it stood: the same bytes, its anchor at the phrase\'s end', opened)
            r.check(closed['id'] is None and closed['rebuilt'] and closed['sel'] == sel and closed['platform']['span'] == sel and closed['platform']['backward'],
                    'its dismissal rebuilds the article again and the selection is put back so: the same bytes, still backward', closed)
            figures['remounts'] = {'opened': opened, 'closed': closed}
        chord(ctx, 'Escape')
        chord(ctx, 'Escape')
    # Shift with → and ← are the platform's own (K-71): from the anchor a drag set, each press moves the selection's other end
    ph, seen = phrase_at(ctx, DOC)
    r.check(ph is not None, 'a phrase of the first edition is shown at the landing, for the platform\'s keys', seen)
    if ph:
        ctx.drv.drag(*ph['start'], *ph['end'])
        ctx.frames(3)
        steps = [dict(ctx.js(NOW), focus=focus_at(ctx))]
        for key in ('ArrowRight', 'ArrowRight', 'ArrowLeft'):
            chord(ctx, key, mods=('Shift',))
            steps.append(ctx.js(NOW))
        spans = [s['sel'] for s in steps]
        r.check(all(s['sel'] and s['sel'] == s['platform']['span'] for s in steps), 'after the drag and after each of Shift+→, Shift+→, Shift+← the page\'s span is the platform\'s', steps)
        ends = [s['pos'] + s['width'] if s else None for s in spans]
        r.check(all(spans) and all(s['pos'] == spans[0]['pos'] for s in spans) and ends[0] < ends[1] < ends[2] and ends[3] == ends[1],
                'Shift+→ twice then Shift+← ends where the first Shift+→ put the end, the start never moved: the platform extends the selection from the anchor the drag set',
                {'spans': spans, 'ends': ends, 'phrase': (ph['p0'], ph['p1'])})
        figures['shift_arrows'] = {'drag': {'focus': steps[0]['focus'], 'moved': spans[1] != spans[0], 'spans': spans}}
        chord(ctx, 'Escape')
        chord(ctx, 'Escape')
    # the focus ring follows the walk, and Enter's selection stands on the block it holds; then Shift+→ there, the focus
    # on the mirror's item, and at K-8's selection, the focus in the selection's card
    ctx.leap(DOC, WINDOW[0])
    item = ctx.js('(() => { const i = document.querySelector("#mirror [role=treeitem][aria-selected=true]"); if (i) i.focus(); return !!i && document.activeElement === i; })()')
    chord(ctx, 'ArrowDown')
    f, lit = state(ctx)['focus'], marks(ctx, 'lit')
    r.check(item and bool(f) and f['kind'] == 'block' and f['addr'] == DOC and lit == [f['pos']], '↓ moves the focus ring to the next block: the article marks the focused block, no other', {'focus': f, 'lit': lit})
    chord(ctx, 'Enter')
    s = state(ctx)
    got = {'focus': s['focus'], 'sel': s['sel'], 'lit': marks(ctx, 'lit'), 'marked': marks(ctx, 'sel')}
    r.check(bool(f) and bool(s['sel']) and s['sel']['pos'] == f['pos'] and got['lit'] == [f['pos']] and got['marked'] == [f['pos']],
            'Enter selects the focused block: the focus ring and the selection\'s mark stand on that one block', got)
    arrows = figures.setdefault('shift_arrows', {})
    arrows['enter'] = shifted(ctx, r, 'Enter')
    chord(ctx, 'Escape')
    chord(ctx, 'Escape')
    chord(ctx, 'ArrowDown', mods=('Shift',))
    arrows['k8'] = shifted(ctx, r, 'K-8')
    chord(ctx, 'Escape')
    chord(ctx, 'Escape')
    r.figures['anchor'] = figures


def whole_again(ctx):
    """the first edition read whole again and the selection cleared, as the drag's checks found the page"""
    ctx.js('window.__skep.model.loadWhole(%s)' % json.dumps(DOC))
    ctx.settle()
    chord(ctx, 'Escape')
    chord(ctx, 'Escape')


def press_holds(ctx, r):
    """the press holds what the drag is anchored in (R11; foundations §2.4). The gate's door `model.invalidate` does to the
    first edition what a feed row naming it does — what the page held of it dropped, its reads asked again, reads alone —
    here with the button down halfway along a phrase: the half-dragged bytes still read back, through the blocks the
    article was made from; the article the drag started in stands while the text arrives again; and the release takes the
    whole phrase, its highlight over the article rebuilt after the press. A context menu, which takes the button's release
    on some platforms, ends the press, and the frame after the end rebuilds what the press held. And a fresh mount waits
    for the press's end too: the document holding the selection, brought back into view under a press in another, mounts
    after it, so no range is placed over the drag"""
    figures = {}
    art = article(DOC)
    ctx.leap(DOC, WINDOW[0])
    ph, seen = phrase_at(ctx, DOC)
    r.check(ph is not None, 'a phrase of the first edition is shown at the landing, for the press', seen)
    if ph:
        ctx.drv.press(*ph['start'])
        ctx.drv.move(*ph['start'], *ph['half'])
        ctx.frames(2)
        # the door and both reads in one evaluation: no frame and no answer comes between them
        torn = ctx.js('(() => { window.__gateArt = %s; const before = window.__skep.platformSelection().span; window.__skep.model.invalidate(%s); '
                      'return {before, after: window.__skep.platformSelection().span}; })()' % (art, json.dumps(DOC)))
        half = torn['after']
        r.check(bool(half) and half == torn['before'] and half['addr'] == DOC and abs(half['pos'] - ph['p0']) <= 3 and abs(half['pos'] + half['width'] - ph['ph']) <= 3,
                'a feed row naming the document under a press: the half-dragged bytes still read back, through the blocks the article was made from',
                dict(torn, phrase=(ph['p0'], ph['ph'], ph['p1'])))
        ctx.settle()
        ctx.frames(2)
        held = ctx.js('({same: %s === window.__gateArt, from: window.__skep.model.doc(%s).from})' % (art, json.dumps(DOC)))
        r.check(held['same'] and held['from'] >= 0, 'its text arrived again with the button down, and the article the drag is anchored in stands: nothing is rebuilt under a press', held)
        ctx.drv.move(*ph['half'], *ph['end'])
        ctx.drv.release(*ph['end'])
        ctx.frames(3)
        sel = state(ctx)['sel']
        plat = ctx.js('window.__skep.platformSelection()')
        rebuilt = ctx.js('!!%s && %s !== window.__gateArt' % (art, art))
        r.check(bool(sel) and sel['addr'] == DOC and abs(sel['pos'] - ph['p0']) <= 3 and abs(sel['pos'] + sel['width'] - ph['p1']) <= 3
                and not plat['collapsed'] and plat['span'] == sel and rebuilt,
                'the release takes the whole phrase the drag crossed, and the platform\'s highlight stands over it in the article rebuilt after the press',
                {'sel': sel, 'phrase': (ph['p0'], ph['p1']), 'platform': plat, 'rebuilt': rebuilt})
        figures['delivery'] = {'phrase': (ph['p0'], ph['ph'], ph['p1']), 'half': half, 'held': held, 'selected': sel}
        whole_again(ctx)
    # a context menu ends the press: a press that has not moved holds the article through the text arriving again, as a drag
    # does; then, the button still down and nothing else asking for a frame, the context menu's end of the press has the
    # next frame rebuild what was held
    ph, seen = phrase_at(ctx, DOC)
    r.check(ph is not None, 'a phrase of the first edition is shown at the landing, for the context menu', seen)
    if ph:
        ctx.drv.press(*ph['start'])
        ctx.js('(() => { window.__gateArt = %s; window.__skep.model.invalidate(%s); })()' % (art, json.dumps(DOC)))
        ctx.settle()
        ctx.frames(2)
        held = ctx.js('({same: %s === window.__gateArt, from: window.__skep.model.doc(%s).from})' % (art, json.dumps(DOC)))
        r.check(held['same'] and held['from'] >= 0, 'a press that has not moved holds the article too, while the text arrives again', held)
        # at what stands under the pointer, as the platform sends it
        ctx.js('(document.elementFromPoint(%r, %r) || document.body).dispatchEvent(new MouseEvent("contextmenu", {bubbles: true, cancelable: true}))' % ph['start'])
        ctx.frames(2)
        after = ctx.js('({rebuilt: !!%s && %s !== window.__gateArt, from: window.__skep.model.doc(%s).from})' % (art, art, json.dumps(DOC)))
        r.check(after['rebuilt'], 'a context menu ends the press: with the button still down, the next frame rebuilds the article the press held', dict(after, held=held))
        ctx.drv.release(*ph['start'])
        ctx.frames(2)
        whole_again(ctx)
    # a fresh mount waits for the press's end: the selection stands in another document mounted beside the first edition —
    # the one in view at the landing with the largest face, the view zoomed about its centre until that face is past the
    # mount threshold; the least pan takes it out of the layer's view (the viewport and 40 px about it, 10 px clear), a
    # press in the first edition, then a pan of 25 px back brings it into the layer's view with the button down
    ctx.leap(DOC, WINDOW[0])
    cam0 = ctx.camera()
    near = ctx.js('''(() => { const c = window.__skep.view.camera(), p = window.__skep.view.viewport();
      return window.__skep.model.places().filter((q) => { if (q.system || q.doc === %s) return false; const b = window.__skep.boxOf(q.doc);
          const x = (b.x - c.x) * c.scale + p.VW / 2, y = (b.y - c.y) * c.scale + p.VH / 2;
          return x < p.VW && x + b.w * c.scale > 0 && y < p.VH && y + b.h * c.scale > 0; })
        .map((q) => ({doc: q.doc, from: window.__skep.model.doc(q.doc).from, em: c.scale / window.__skep.scaleFor(q.doc, 'em', 1)}))
        .filter((q) => q.from >= 0).sort((a, b) => b.em - a.em); })()''' % json.dumps(DOC))
    beside = None
    if near:
        ctx.set_view(cam0['x'], cam0['y'], cam0['scale'] * max(1.0, (ctx.js('window.__skep.constants.MOUNT_EM') + 0.2) / near[0]['em']))
        if near[0]['doc'] in ctx.js('window.__skep.mountedAddrs()'):
            para = next((b for b in ctx.js('window.__skep.model.doc(%s).blocks' % json.dumps(near[0]['doc'])) if b['kind'] == 'para' and len(b['text']) >= 20), None)
            if para:
                beside = (near[0]['doc'], para['pos'], len(para['text'][:20].encode('utf8')))
    r.check(beside is not None, 'another document in view beside the first edition at the landing mounts once its face is past the mount threshold, with a paragraph to select',
            {'near': near[:4], 'mounted': ctx.js('window.__skep.mountedAddrs()')})
    if beside:
        other = beside[0]
        cam1, vp, box = ctx.camera(), ctx.js('window.__skep.view.viewport()'), ctx.js('window.__skep.boxOf(%s)' % json.dumps(other))
        s = cam1['scale']
        x0, y0 = (box['x'] - cam1['x']) * s + vp['VW'] / 2, (box['y'] - cam1['y']) * s + vp['VH'] / 2
        x1, y1 = x0 + box['w'] * s, y0 + box['h'] * s
        dx, dy = min([(vp['VW'] + 50 - x0, 0), (-(x1 + 50), 0), (0, vp['VH'] + 50 - y0), (0, -(y1 + 50))], key=lambda d: abs(d[0]) + abs(d[1]))
        ux, uy = dx / (abs(dx) + abs(dy)), dy / (abs(dx) + abs(dy))
        out = {'x': cam1['x'] - dx / s, 'y': cam1['y'] - dy / s}
        back = {'x': out['x'] + ux * 25 / s, 'y': out['y'] + uy * 25 / s, 'scale': s}
        ctx.js('window.__skep.select(%s, %d, %d)' % (json.dumps(other), beside[1], beside[2]))
        ctx.frames(2)
        ctx.set_view(out['x'], out['y'], s)
        mounted = ctx.js('window.__skep.mountedAddrs()')
        ph, seen = phrase_at(ctx, DOC)
        r.check(other not in mounted and DOC in mounted and ph is not None,
                'the least pan takes the document holding the selection out of the view: it is unmounted, and the first edition shows a phrase', dict(seen, mounted=mounted, other=other, pan_px=(dx, dy)))
        if other not in mounted and ph:
            ctx.drv.press(*ph['start'])
            ctx.drv.move(*ph['start'], *ph['half'])
            ctx.frames(2)
            before = ctx.js('window.__skep.platformSelection()')
            ctx.js('window.__skep.view.set(%s)' % json.dumps(back))
            ctx.frames(2)
            during = ctx.js('({mounted: window.__skep.mountedAddrs(), platform: window.__skep.platformSelection(), selection: window.__skep.selection()})')
            span = during['platform']['span']
            r.check(other not in during['mounted'] and not during['platform']['collapsed'] and bool(span) and span['addr'] == DOC and abs(span['pos'] - ph['p0']) <= 3,
                    'the document holding the selection, back in the layer\'s view with the button down, is not mounted: the platform\'s selection is still the drag\'s',
                    dict(during, before=before, other=other))
            ctx.drv.release(*ph['half'])
            ctx.frames(2)
            after = ctx.js('window.__skep.mountedAddrs()')
            r.check(other in after, 'it mounts once the press has ended', {'mounted': after, 'other': other})
            figures['fresh_mount'] = {'other': other, 'pan_px': (dx, dy), 'before': before, 'during': during, 'after': after}
        chord(ctx, 'Escape')
        chord(ctx, 'Escape')
    ctx.set_view(cam0['x'], cam0['y'], cam0['scale'])
    r.figures['press'] = figures


def plain_char(ctx, addr):
    """the first plain character of a paragraph the plane SHOWS of a document's mounted article at the view as it stands —
    a character of its own text standing bare in its paragraph, no mark, run or chrome around it, inside the article's
    clip and the viewport and below the one line, with at least 24 px of that bare text after it on its line — found
    through the article's own text nodes by a range, never by what takes the pointer there (below reading scale the
    article takes none): its block's first position, the point half a pixel inside its left edge at its line's middle
    (where `phrase_at` presses too: pressed at a character's middle at em 6, this machine's Chrome anchored no drag at
    some characters), the point near the end of that stretch of its line, and what the platform hit-tests at the first;
    None where the view shows no such character"""
    return ctx.js('''(() => {
      const a = document.querySelector(%s); if (!a) return null;
      const c = a.getBoundingClientRect(), p = window.__skep.view.viewport(), top = document.getElementById('line').getBoundingClientRect().bottom;
      const shown = (q) => q.width > 0 && q.height > 0 && q.left >= c.left && q.right <= c.right && q.top >= c.top && q.bottom <= c.bottom
        && q.left >= 0 && q.right <= p.VW && q.top >= top + 2 && q.bottom <= p.VH;
      for (const sp of a.querySelectorAll('.run > p.sp')) for (const n of sp.childNodes) {
        if (n.nodeType !== Node.TEXT_NODE) continue;
        const i = n.data.search(/\\S/); if (i < 0) continue;
        const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + 1);
        const q = r.getBoundingClientRect(); if (!shown(q)) continue;
        r.setEnd(n, n.data.length);
        const line = [...r.getClientRects()].find((x) => x.width > 0 && x.height > 0);
        if (!line || Math.abs(line.top - q.top) > 1 || !shown(line) || line.right - q.left < 24) continue;
        const x = q.left + 0.5, y = q.top + q.height / 2;
        return {pos: Number(sp.dataset.pos), at: [x, y], along: [line.right - 1, y], hit: window.__gateHit(x, y)};
      }
      return null; })()''' % json.dumps('#domlayer article.dtext[data-addr="%s"]' % addr))


def below_reading(ctx, r):
    """below the readable threshold of 8 a press is keyed on legibility, never on whether text is mounted (foundations
    §2.4: "a document is a place wherever the pointer falls on it, bars or mounted text alike"; "below it, over bars or
    mounted text alike, it is a drag off text and selects nothing"). At em 6 — the em §2.4 names, where whether text is
    mounted depends on the direction the person zoomed from — a click on a paragraph's first plain character of the first
    edition's mounted article teleports to the document: one trail entry pushed, its own, the focus on it, the landing at
    reading scale (em 12.5), nothing selected; a click at the same point on its bars, zoomed to em 6 from below so nothing
    mounts, does the same; and a drag along that line of the mounted text selects nothing and moves neither the camera nor
    the trail. At em 9 a click on such a character selects its block whole and pushes no entry. And a drag begun on
    legible text keeps the article it is anchored in through a zoom below the threshold with the button down — the release
    takes the whole phrase — and the frame after the press takes the pointer from the article there. The selection is
    cleared after each, and the step ends at the landing"""
    figures = {}
    art = article(DOC)
    ctx.js('''window.__gateHit = (x, y) => { const e = document.elementFromPoint(x, y), a = e && e.closest("#domlayer article.dtext");
      return !e ? null : e.id === "plane" ? "the plane" : a ? "the article of " + a.dataset.addr : e.id || e.tagName.toLowerCase(); }''')
    seen = lambda: ctx.js('({cam: window.__skep.view.camera(), focus: window.__skep.view.focus(), trail: window.__skep.trail(), sel: window.__skep.selection(), '
                          'platform: window.__skep.platformSelection(), mounted: window.__skep.mountedAddrs().includes(%s), '
                          'pointer: (() => { const a = %s; return a ? getComputedStyle(a).pointerEvents : null; })()})' % (json.dumps(DOC), art))
    landing = ctx.js('window.__skep.scaleFor(%s, "em", 12.5)' % json.dumps(DOC))
    alike = ('the plane', 'the article of ' + DOC)

    def place_click(at, what):
        """a click at a point, the teleport's flight waited out: the check that it went to the first edition as a place"""
        before = seen()
        ctx.drv.mouse(*at)
        ctx.settle()
        ctx.frames(2)
        after = seen()
        t0, t1, f = before['trail'], after['trail'], after['focus']
        newest = t1['entries'][t1['cursor']] if 0 <= t1['cursor'] < len(t1['entries']) else None
        r.check(t1['cursor'] == t0['cursor'] + 1 and len(t1['entries']) == t1['cursor'] + 1 and bool(newest) and newest['addr'] == DOC
                and bool(f) and f['addr'] == DOC and abs(after['cam']['scale'] / landing - 1) < 1e-6 and after['sel'] is None,
                '%s at em 6 is a click on a place: the first edition\'s entry pushed, the focus on it, the landing at reading scale (em 12.5), nothing selected' % what,
                {'cursor': [t0['cursor'], t1['cursor']], 'entries': [len(t0['entries']), len(t1['entries'])], 'newest': newest and newest['addr'],
                 'focus': f and {'kind': f['kind'], 'addr': f['addr']}, 'scale': [after['cam']['scale'], landing], 'sel': after['sel']})
        return {'cursor': [t0['cursor'], t1['cursor']], 'focus': f and f['addr'], 'em': after['cam']['scale'] / landing * 12.5, 'sel': after['sel']}

    # (a) mounted text at em 6, zoomed to from reading scale: the article stands, and a click on its text is the place's
    ctx.leap(DOC, WINDOW[0])
    ctx.view_doc_em(DOC, 6)
    em6 = ctx.camera()
    ch, now = plain_char(ctx, DOC), seen()
    r.check(now['mounted'] and ch is not None and ch['hit'] in alike,
            'at em 6, zoomed to from reading scale, the first edition\'s article stands, with a paragraph\'s plain character in view and nothing but the plane or the article under it',
            {'mounted': now['mounted'], 'char': ch, 'pointer': now['pointer']})
    if now['mounted'] and ch and ch['hit'] in alike:
        figures['text'] = dict(place_click(ch['at'], 'a click on the mounted text of the first edition'), hit=ch['hit'], pointer=now['pointer'])
        chord(ctx, 'Escape')
        chord(ctx, 'Escape')
        # (b) the same point on its bars: zoomed to em 6 from em 4, the camera (a)'s, the article never mounted
        ctx.view_doc_em(DOC, 4)
        ctx.view_doc_em(DOC, 6)
        now = seen()
        hit = ctx.js('window.__gateHit(%r, %r)' % tuple(ch['at']))
        r.check(not now['mounted'] and same_view({'cam': em6}, now) and hit == 'the plane',
                'at em 6, zoomed to from em 4, the first edition is drawn as bars, the camera as at em 6 from above, and the canvas under the same point',
                {'mounted': now['mounted'], 'cam': [now['cam'], em6], 'hit': hit})
        if not now['mounted'] and hit == 'the plane':
            figures['bars'] = place_click(ch['at'], 'a click at the same point on the first edition\'s bars')
        chord(ctx, 'Escape')
        chord(ctx, 'Escape')
    # (c) a drag along a line of the mounted text at em 6 is a drag off text: it selects nothing, and nothing pans
    ctx.leap(DOC, WINDOW[0])
    ctx.view_doc_em(DOC, 6)
    ch, before = plain_char(ctx, DOC), seen()
    r.check(before['mounted'] and ch is not None and ch['hit'] in alike and before['sel'] is None,
            'at em 6, zoomed to from reading scale, the first edition\'s article stands again, a line of its plain text in view and nothing selected', {'mounted': before['mounted'], 'char': ch, 'sel': before['sel']})
    if before['mounted'] and ch and ch['hit'] in alike:
        ctx.drv.drag(*ch['at'], *ch['along'])
        ctx.frames(3)
        after = seen()
        r.check(after['sel'] is None and after['platform']['span'] is None and same_view(before, after)
                and after['trail']['cursor'] == before['trail']['cursor'] and len(after['trail']['entries']) == len(before['trail']['entries']),
                'a drag along a line of the mounted text at em 6 selects nothing — no selection of the page\'s, none of the platform\'s in an article — and moves neither the camera nor the trail',
                {'sel': after['sel'], 'platform': after['platform'], 'cam': [before['cam'], after['cam']], 'cursor': [before['trail']['cursor'], after['trail']['cursor']], 'drag': [ch['at'], ch['along']]})
        figures['drag'] = {'hit': ch['hit'], 'drag': [ch['at'], ch['along']], 'sel': after['sel'], 'collapsed': after['platform']['collapsed']}
        chord(ctx, 'Escape')
        chord(ctx, 'Escape')
    # (d) the other side of the threshold: at em 9 a click on a paragraph's plain character selects its block whole, and no entry is pushed
    ctx.view_doc_em(DOC, 9)
    ch, before = plain_char(ctx, DOC), seen()
    r.check(before['mounted'] and ch is not None and ch['hit'] == 'the article of ' + DOC and before['sel'] is None,
            'at em 9 the first edition\'s article stands, a paragraph\'s plain character in view under the pointer, nothing selected', {'mounted': before['mounted'], 'char': ch, 'sel': before['sel']})
    if before['mounted'] and ch and ch['hit'] == 'the article of ' + DOC:
        block = next((b for b in ctx.js('window.__skep.model.doc(%s).blocks' % json.dumps(DOC)) if b['pos'] == ch['pos']), None)
        ctx.drv.mouse(*ch['at'])
        ctx.settle()
        ctx.frames(2)
        after = seen()
        r.check(bool(block) and after['sel'] == {'addr': DOC, 'pos': block['pos'], 'width': max(1, block['width'])} and same_view(before, after)
                and after['trail']['cursor'] == before['trail']['cursor'] and len(after['trail']['entries']) == len(before['trail']['entries']),
                'at em 9 a click on a paragraph\'s plain character belongs to the text: it selects the block whole, and neither the camera nor the trail moves',
                {'sel': after['sel'], 'block': block and (block['pos'], block['width']), 'cam': [before['cam'], after['cam']], 'cursor': [before['trail']['cursor'], after['trail']['cursor']]})
        figures['legible'] = {'sel': after['sel'], 'pointer': before['pointer']}
        chord(ctx, 'Escape')
        chord(ctx, 'Escape')
    # (e) a drag begun on legible text, the view zoomed below the threshold with the button down: the article keeps the
    # pointer through the press, the release takes the whole phrase, and the frame after it takes the pointer away
    ph, found = phrase_at(ctx, DOC)
    r.check(ph is not None, 'a phrase of the first edition is shown at em 9, for a drag the zoom crosses the threshold under', found)
    if ph:
        ctx.drv.press(*ph['start'])
        ctx.drv.move(*ph['start'], *ph['half'])
        ctx.frames(2)
        cam = ctx.camera()
        ctx.js('window.__skep.view.set(%s)' % json.dumps({'x': cam['x'], 'y': cam['y'], 'scale': ctx.js('window.__skep.scaleFor(%s, "em", 7)' % json.dumps(DOC))}))
        ctx.frames(2)
        during = seen()
        rects = [q for q in ctx.js('window.__skep.spanRects(%s, %d, %d)' % (json.dumps(DOC), ph['p0'], ph['p1'] - ph['p0'])) or [] if q['w'] > 0 and q['h'] > 0]
        end = (rects[-1]['x'] + rects[-1]['w'] - 0.5, rects[-1]['y'] + rects[-1]['h'] / 2) if rects else ph['half']
        ctx.drv.move(*ph['half'], *end)
        ctx.drv.release(*end)
        ctx.frames(3)
        after = seen()
        sel = after['sel']
        r.check(bool(rects) and during['mounted'] and bool(sel) and sel['addr'] == DOC and abs(sel['pos'] - ph['p0']) <= 3 and abs(sel['pos'] + sel['width'] - ph['p1']) <= 3
                and not after['platform']['collapsed'] and after['platform']['span'] == sel,
                'a drag begun on legible text, the view zoomed to em 7 with the button down: the article keeps the pointer through the press, and the release takes the whole phrase',
                {'sel': sel, 'phrase': (ph['p0'], ph['p1']), 'platform': after['platform'], 'pointer_during': during['pointer'], 'end': end})
        r.check(after['pointer'] == 'none', 'the frame after the press, at em 7, takes the pointer from the article: below the threshold a press is the canvas\'s again',
                {'pointer': after['pointer'], 'during': during['pointer']})
        figures['zoomed_under_press'] = {'phrase': (ph['p0'], ph['p1']), 'sel': sel, 'pointer': {'during': during['pointer'], 'after': after['pointer']}}
        chord(ctx, 'Escape')
        chord(ctx, 'Escape')
    ctx.leap(DOC, WINDOW[0])
    r.figures['below_reading'] = figures


def pane_phrase(ctx, side):
    """a phrase of fifteen characters of a paragraph's own text — no heading's — that a reading scene's pane SHOWS:
    printable ASCII on one line inside the pane's visible rect, the pane's article under the pointer half a pixel inside
    its first character and its last, where a drag over it presses and releases. Read through the gate's `scene.at` over
    the blocks the model holds as the scene stands opened: its document, its first and last positions, its text and those
    points; None where the pane shows none"""
    return ctx.js('''((side) => {
      const S = window.__skep, p = S.scene.pair(); if (!p) return null;
      const addr = side === 'a' ? p.a : p.b, pane = document.getElementById(side === 'a' ? 'sceneA' : 'sceneB'), enc = new TextEncoder();
      const inside = (q, v) => q.x >= v.x && q.y >= v.y && q.x + q.w <= v.x + v.w && q.y + q.h <= v.y + v.h;
      const under = ([x, y]) => { const e = document.elementFromPoint(x, y), a = e && e.closest('article.dtext'); return !!a && pane.contains(a); };
      for (const b of S.model.doc(addr).blocks) {
        if (b.kind !== 'para' || b.text.startsWith('#')) continue;
        for (let k = 0; k + 15 <= b.text.length; k += 5) {
          const text = b.text.slice(k, k + 15);
          if (!/^[!-~][ -~]{13}[!-~]$/.test(text)) continue;
          const p0 = b.pos + enc.encode(b.text.slice(0, k)).length, p1 = p0 + 15;
          const f = S.scene.at(side, p0, 1), l = S.scene.at(side, p1 - 1, 1);
          if (!f || !l || !f.line || !l.line || Math.abs(f.line.y - l.line.y) > 1 || !inside(f.line, f.pane) || !inside(l.line, l.pane)) continue;
          const start = [f.line.x + 0.5, f.line.y + f.line.h / 2], end = [l.line.x + l.line.w - 0.5, l.line.y + l.line.h / 2];
          if (under(start) && under(end)) return {addr, p0, p1, text, start, end};
        }
      }
      return null; })(%s)''' % json.dumps(side))


def scene_copy(ctx, r):
    """THE COPY FROM A READING SCENE'S PANE (foundations §2.4: the copy of any selection carries the passage's board and
    address beside the plain text and never in it; §2.5: in the scene "a drag selects as it does on the plane"), and the
    pane's own text under a feed row (T-LAYER: the blocks and runs an article was made from stay its own while it
    stands, whatever the model has delivered since). The scene on the first edition and the draft it windows, opened
    over no selection of the page's:
    (a) a drag over a phrase of pane A: the copy's flavor names the board, the first edition and the dragged bytes, three
        positions either way; its plain text is the document's own bytes over them, no label of the page among them; and
        the drag makes no selection of the page's, a pane's own selection being D1's second stage (#94);
    (b) pane A at its top, a drag from the head's address into the first block: the copy starts at the first block, the
        head's words never in it;
    (c) a drag over a phrase of pane B, then — in one evaluation, so no answer and no frame comes between them — the
        gate's door `model.invalidate` does to the draft what a feed row naming it does, and the re-level act is
        clicked: the copy still carries the phrase's bytes as the pane shows them, though the model holds none of them
        now; the two ends stand level; and the band between the panes stands, each end at its passage's line.
    The draft is read whole again and the scene ended after them"""
    origin, B = ctx.js('window.__skep.model.board().origin'), WINDOW[2]

    def copied():
        """the copy as the copy door runs it now: the span, the flavor parsed, the plain text"""
        c = ctx.js('window.__skep.copy()')
        data = c.get('data') or {}
        flavor = data.get('application/x-skep-passage')
        return {'span': c.get('span'), 'flavor': json.loads(flavor) if flavor else None, 'plain': data.get('text/plain')}

    def own(span):
        """the document's own bytes over a span, as the model holds them now"""
        return ctx.js('window.__skep.model.text(%s, %d, %d)' % (json.dumps(span['addr']), span['pos'], span['pos'] + span['width'])) if span else None

    def names(c, addr, p0, p1):
        """does the copy's flavor name the board, the document and the span copied, the bytes [p0, p1) three positions either way?"""
        f, s = c['flavor'], c['span']
        return bool(f) and bool(s) and f == {'board': origin, 'addr': addr, 'pos': s['pos'], 'width': s['width']} and abs(s['pos'] - p0) <= 3 and abs(s['pos'] + s['width'] - p1) <= 3

    def bare(c, mine):
        """is the copy's plain text the document's own bytes, no label of the page — a hairline's ≡, a symbol's ⟡ — among them?"""
        return c['plain'] is not None and c['plain'] == mine and not any(x in c['plain'] and x not in (mine or '') for x in '≡⟡')

    figures = {}
    ctx.leap(DOC, WINDOW[0])
    chord(ctx, 'Escape')
    chord(ctx, 'Escape')
    open_scene(ctx)
    r.check(ctx.js('window.__skep.scene.isOpen()') and ctx.js('window.__skep.selection()') is None, 'the scene stands on the first edition and the draft it windows, over no selection of the page\'s')
    # (a) a drag over a phrase of pane A
    ph = pane_phrase(ctx, 'a')
    r.check(ph is not None, '(a) pane A shows a phrase of the first edition\'s own text on one line, for a drag', ctx.js('window.__skep.scene.pairs()'))
    if ph:
        ctx.drv.drag(*ph['start'], *ph['end'])
        ctx.frames(2)
        c = copied()
        mine = own(c['span'])
        page = ctx.js('({sel: window.__skep.selection(), platform: window.__skep.platformSelection().span})')
        r.check(names(c, DOC, ph['p0'], ph['p1']), '(a) a drag over a phrase in pane A: the copy\'s flavor names the board, the first edition and the dragged bytes, as a drag on the plane\'s does (§2.4; §2.5)',
                dict(c, phrase=[ph['p0'], ph['p1'], ph['text']]))
        r.check(bare(c, mine), '(a) its plain text is the document\'s own bytes over them, no label of the page among them', {'plain': c['plain'], 'own': mine})
        r.check(page['sel'] is None and page['platform'] is None, '(a) the drag in the pane makes no selection of the page\'s: a pane\'s own selection is D1\'s second stage (#94)', page)
        figures['a'] = {'phrase': [ph['p0'], ph['p1'], ph['text']], 'span': c['span'], 'plain': c['plain']}
    # (b) pane A at its top, a drag from the head's address into the first block
    ctx.js('document.getElementById("sceneA").scrollTop = 0')
    ctx.frames(2)
    first = ctx.js('window.__skep.model.doc(%s).blocks[0]' % json.dumps(DOC))
    n = min(10, len(first['text'])) if first and first['kind'] == 'para' else 0
    head = ctx.js('''(() => { const a = document.querySelector('#sceneA .hd .addr'); if (!a) return null; const q = a.getBoundingClientRect();
      return {x: q.left + 0.5, y: q.top + q.height / 2, text: a.textContent}; })()''')
    last = ctx.js('window.__skep.scene.at("a", %d, %d)' % (first['pos'] + len(first['text'][:n - 1].encode('utf8')), len(first['text'][n - 1].encode('utf8')))) if n else None
    shown = bool(head) and bool(last) and bool(last['line']) and inside(last['line'], last['pane'])
    r.check(shown, '(b) pane A at its top shows its head\'s address and its first block, for a drag from one into the other', {'head': head, 'last': last, 'first': first})
    if shown:
        end = first['pos'] + len(first['text'][:n].encode('utf8'))
        ctx.drv.drag(head['x'], head['y'], last['line']['x'] + last['line']['w'] - 0.5, last['line']['y'] + last['line']['h'] / 2)
        ctx.frames(2)
        c = copied()
        mine = own(c['span'])
        r.check(bool(c['span']) and c['span']['pos'] == first['pos'] and names(c, DOC, first['pos'], end) and bare(c, mine),
                '(b) a drag from pane A\'s head into its first block: the copy starts at the first block, the head\'s words never in it — the flavor names those bytes, the plain text is the document\'s own',
                dict(c, own=mine, first=[first['pos'], end], head=head['text']))
        figures['b'] = {'span': c['span'], 'plain': c['plain'], 'head': head['text']}
    # (c) a drag over a phrase of pane B, then a feed row naming the draft and the re-level act, in one evaluation
    ph = pane_phrase(ctx, 'b')
    r.check(ph is not None, '(c) pane B shows a phrase of the draft\'s own text on one line, for a drag', ctx.js('window.__skep.scene.pairs()'))
    if ph:
        ctx.drv.drag(*ph['start'], *ph['end'])
        ctx.frames(2)
        torn = ctx.js('''((b) => { const S = window.__skep, pre = S.copy();
          const held = pre.span ? S.model.text(b, pre.span.pos, pre.span.pos + pre.span.width) : null, ties = S.scene.ties().length;
          S.model.invalidate(b);
          document.querySelector('#scenebar [data-relevel]').click();
          const post = S.copy(), lv = S.scene.pairs().level;
          return {pre: pre.span, held, ties, post, now: post.span ? S.model.text(b, post.span.pos, post.span.pos + post.span.width) : null,
                  level: {level: lv, a: lv.a != null ? S.scene.at('a', lv.a) : null, b: lv.b != null ? S.scene.at('b', lv.b) : null},
                  after: S.scene.ties().map((t) => ({kind: t.kind, lineA: t.lineA, lineB: t.lineB}))}; })(%s)''' % json.dumps(B))
        data = torn['post'].get('data') or {}
        flavor = data.get('application/x-skep-passage')
        c = {'span': torn['post'].get('span'), 'flavor': json.loads(flavor) if flavor else None, 'plain': data.get('text/plain')}
        r.check(names(c, B, ph['p0'], ph['p1']) and c['span'] == torn['pre'] and bool(torn['held']) and bare(c, torn['held']) and torn['now'] == '',
                '(c) a feed row naming the draft while pane B shows a selection in it: the copy still names the dragged bytes and carries them as the pane shows them, though the model holds none of them now',
                dict(c, phrase=[ph['p0'], ph['p1'], ph['text']], pre=torn['pre'], held=torn['held'], now=torn['now']))
        level_holds(r, '(c) the re-level act after a feed row naming the draft', torn['level'])
        r.check(torn['ties'] >= 1 and len(torn['after']) == torn['ties'] and all(t['lineA'] and t['lineB'] for t in torn['after']),
                '(c) after the feed row and the re-level, the bands and lines between the panes stand as they stood, each end at its passage\'s line in its pane',
                {'before': torn['ties'], 'after': torn['after']})
        figures['c'] = {'phrase': [ph['p0'], ph['p1'], ph['text']], 'span': c['span'], 'level': torn['level']['level'], 'ties': [torn['ties'], len(torn['after'])]}
        ctx.js('window.__skep.model.loadWhole(%s)' % json.dumps(B))
        ctx.settle()
    ctx.js('window.__skep.scene.close()')
    ctx.js('(() => { const s = window.getSelection(); if (s) s.removeAllRanges(); const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    chord(ctx, 'Escape')
    chord(ctx, 'Escape')
    r.figures['scene_copy'] = figures


def focus_rules(ctx, r):
    """the focus and keyboard rules the one-owner lane added (FP-20). Enter and Space act on the × and the address
    segment, both native buttons (#119, #102, rule 14); the line is one Tab stop its ← and → move among (#96, K-22); ↓
    in a pane brings the next block's top to the pane's top, not a fixed 48 px (#121, K-60); Mod+L in the scene opens
    the box over it (#118) and Mod+[ inside the box closes it and goes back (rule 18, M-1); a camera-key drag over an
    article pans and selects nothing (#88, K-10); the focused block is lit only while a key drew the ring and goes dark
    after a click (D3); one Esc closes a scene standing over a selection, the selection outliving it (D7)."""
    # #102 / #119: the address segment and the overlay's × are native buttons — Enter and Space act
    ctx.leap(DOC, WINDOW[0])
    seg = ctx.js('(() => { const b = document.querySelector("#line [data-act=address]"); return b ? b.tagName.toLowerCase() : null; })()')
    r.check(seg == 'button', 'the address segment is a native button (#102; rule 14)', seg)
    for key, name in (('Enter', 'Enter'), (' ', 'Space')):
        ctx.js('(() => { const b = document.querySelector("#line [data-act=address]"); if (b) b.focus(); })()')
        ctx.frames(1)
        chord(ctx, key, code='Space' if key == ' ' else None)
        r.check(state(ctx)['leap'], '%s on the address segment opens the LEAP box (#102)' % name)
        chord(ctx, 'Escape')
    for key, name in (('Enter', 'Enter'), (' ', 'Space')):
        ctx.js('window.__skep.cards.links(%s)' % json.dumps(DOC)); ctx.frames(2)
        onx = ctx.js('(() => { const x = document.querySelector("#overlay [data-x]"); if (!x) return null; x.focus(); return {tag: x.tagName.toLowerCase(), on: document.activeElement === x}; })()')
        chord(ctx, key, code='Space' if key == ' ' else None)
        gone = ctx.js('window.__skep.overlay().id === null')
        r.check(bool(onx) and onx['tag'] == 'button' and onx['on'] and gone, '%s on the overlay\'s × (a native button) dismisses it (#119; rule 14)' % name, {'x': onx, 'gone': gone})
    # K-22 (#96): the line is ONE Tab stop; ← and → move among its acts
    ctx.leap(DOC, WINDOW[0])
    live = ctx.js('[...document.querySelectorAll("#line button[data-act]")].filter((b) => !b.disabled).map((b) => ({act: b.dataset.act, tab: b.tabIndex}))')
    stops = [b for b in live if b['tab'] == 0]
    r.check(len(live) > 1 and len(stops) == 1, 'the line is ONE Tab stop: of its acts, exactly one is in the tab order (K-22, #96)', {'acts': live, 'stops': stops})
    ctx.js('(() => { const b = [...document.querySelectorAll("#line button[data-act]")].filter((x) => !x.disabled)[0]; if (b) b.focus(); })()')
    first = ctx.js('(() => { const e = document.activeElement; return e.closest("#line") ? e.dataset.act : null; })()')
    chord(ctx, 'ArrowRight')
    second = ctx.js('(() => { const e = document.activeElement; return e.closest("#line") ? e.dataset.act : null; })()')
    r.check(bool(first) and bool(second) and first != second, '→ moves the stop among the line\'s acts (K-22)', {'first': first, 'second': second})
    chord(ctx, 'ArrowLeft')
    r.check(ctx.js('(() => { const e = document.activeElement; return e.closest("#line") ? e.dataset.act : null; })()') == first, '← moves it back (K-22)', {'first': first})
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    # D3: the lit block follows the ring's rule — drawn after a walk key, gone after a click (a pointer act), as every control loses its ring
    ctx.leap(DOC, WINDOW[0])
    ctx.js('(() => { const i = document.getElementById("walk-" + window.__skep.mirror.index()); if (i) i.focus(); })()')
    chord(ctx, 'ArrowDown')
    after_key = {'ring': ctx.js('window.__skep.focus().ring'), 'lit': marks(ctx, 'lit')}
    ph, seen = phrase_at(ctx, DOC)
    if ph:
        ctx.drv.mouse(*ph['start'])  # a click selects a block and puts the ring out
        ctx.settle(); ctx.frames(2)
        after_click = {'ring': ctx.js('window.__skep.focus().ring'), 'lit': marks(ctx, 'lit')}
        r.check(after_key['ring'] is True and after_click['ring'] is False and after_click['lit'] == [],
                'D3: the lit block follows the ring\'s rule — drawn after a walk key, gone after a click (a pointer act), the canvas circling no mounted document', {'after_key': after_key, 'after_click': after_click})
        chord(ctx, 'Escape')
    # #88: a camera-key drag (hold Mod) over an article pans and selects nothing (K-10, M-8)
    ctx.leap(DOC, WINDOW[0])
    ph, seen = phrase_at(ctx, DOC)
    r.check(ph is not None, 'a phrase of the first edition is shown, for the camera-key drag (#88)', seen)
    if ph:
        cam0 = ctx.camera()
        sx, sy = ph['start']
        ex, ey = ph['end']
        ctx.drv.call('Input.dispatchMouseEvent', {'type': 'mouseMoved', 'x': sx, 'y': sy, 'modifiers': 4})
        ctx.drv.call('Input.dispatchMouseEvent', {'type': 'mousePressed', 'x': sx, 'y': sy, 'button': 'left', 'buttons': 1, 'clickCount': 1, 'modifiers': 4})
        for i in range(1, 7):
            ctx.drv.call('Input.dispatchMouseEvent', {'type': 'mouseMoved', 'x': sx + (ex - sx) * i / 6, 'y': sy + (ey - sy) * i / 6, 'button': 'left', 'buttons': 1, 'modifiers': 4})
        ctx.drv.call('Input.dispatchMouseEvent', {'type': 'mouseReleased', 'x': ex, 'y': ey, 'button': 'left', 'buttons': 0, 'clickCount': 1, 'modifiers': 4})
        ctx.settle(); ctx.frames(2)
        cam1 = ctx.camera()
        plat = ctx.js('window.__skep.platformSelection()')
        r.check(not same_view({'cam': cam0}, {'cam': cam1}) and state(ctx)['sel'] is None and plat['collapsed'], '#88: a camera-key drag over an article pans the camera and selects nothing — no selection of the page\'s, none of the platform\'s', {'cam': [cam0, cam1], 'sel': state(ctx)['sel'], 'platform': plat})
        chord(ctx, 'Escape')
    # K-60 (#121): ↓ in a pane brings the next block's top to the pane's top
    open_scene(ctx)
    want = ctx.js('''(() => { const pane = document.getElementById('sceneB'), art = pane.querySelector('article.dtext');
      if (!art) return null; const origin = pane.getBoundingClientRect().top + pane.clientTop - pane.scrollTop;
      const tops = [...art.querySelectorAll('.run > .sp, .run > .withheld')].map((e) => e.getBoundingClientRect().top - origin);
      const at = pane.scrollTop, next = tops.find((y) => y > at + 1); return next == null ? null : Math.max(0, Math.round(next)); })()''')
    before = ctx.js('document.getElementById("sceneB").scrollTop')
    ctx.js('document.getElementById("sceneB").focus()'); ctx.frames(1)
    chord(ctx, 'ArrowDown')
    after = ctx.js('document.getElementById("sceneB").scrollTop')
    r.check(want is not None and after != before and abs(after - want) <= 1, 'K-60 (#121): ↓ in a pane brings the next block\'s top to the pane\'s top, not a fixed 48 px', {'before': before, 'after': after, 'want': want})
    # #118: Mod+L in the scene opens the box over it; the box's Esc leaves the scene standing
    chord(ctx, 'l', mods=('Meta',))
    box = ctx.js('''(() => { const leap = document.getElementById('leap'), scene = document.getElementById('scene');
      return {open: window.__skep.leap.isOpen(), shown: getComputedStyle(leap).display !== 'none', focused: document.activeElement.id === 'leapq',
              leap_z: parseInt(getComputedStyle(leap).zIndex) || 0, scene_z: parseInt(getComputedStyle(scene).zIndex) || 0}; })()''')
    r.check(box['open'] and box['shown'] and box['focused'] and box['leap_z'] > box['scene_z'], 'Mod+L in the scene opens the box over it (#118): its z-index above the scene\'s, its input focused', box)
    chord(ctx, 'Escape')
    r.check(ctx.js('window.__skep.scene.isOpen()') and not ctx.js('window.__skep.leap.isOpen()'), 'the box\'s Esc closes the box and leaves the scene standing')
    chord(ctx, 'Escape')
    r.check(not ctx.js('window.__skep.scene.isOpen()'), 'a second Esc closes the scene')
    # rule 18 (M-1): Mod+[ inside the open box closes it and goes back
    ctx.leap(DOC, 1); ctx.leap(DOC, WINDOW[0])  # a back entry stands
    chord(ctx, 'l', mods=('Meta',))
    box_open, t0 = state(ctx)['leap'], trail(ctx)
    chord(ctx, '[', mods=('Meta',))
    s, t1 = state(ctx), trail(ctx)
    r.check(box_open and not s['leap'] and t1['cursor'] == t0['cursor'] - 1, 'rule 18: Mod+[ inside the open box acts as anywhere, the box closed first — it goes back one entry (M-1)', {'box_open': box_open, 'still_open': s['leap'], 'cursor': [t0['cursor'], t1['cursor']]})
    # D7: one Esc closes a scene standing over a selection (recency), the selection outliving it
    ctx.leap(DOC, WINDOW[0])
    blocks = ctx.js('window.__skep.model.doc(%s).blocks' % json.dumps(DOC))
    para = next((b for b in blocks if b['kind'] == 'para' and (b['text'] or '').strip()), blocks[0])
    ctx.js('window.__skep.select(%s, %d)' % (json.dumps(DOC), para['pos'])); ctx.frames(2)
    ctx.js('window.__skep.cards.wrote(%s, %d)' % (json.dumps(DOC), para['pos']))  # replaces the selection's card; the selection stands under it
    ctx.settle(); ctx.frames(2)
    open_scene(ctx)  # dismisses the provenance card (the selection stands), the scene over the selection
    mid = state(ctx)
    r.check(bool(mid['sel']) and mid['scene'], 'D7 setup: a scene stands over a standing selection (opened through a card that replaced the selection\'s)', {'sel': mid['sel'], 'scene': mid['scene']})
    chord(ctx, 'Escape')
    s = state(ctx)
    r.check(not s['scene'] and bool(s['sel']), 'D7: one Esc closes the scene standing over the selection, and the selection outlives it (recency, not the list order)', {'scene': s['scene'], 'sel': s['sel']})
    chord(ctx, 'Escape')
    r.check(state(ctx)['sel'] is None, 'a second Esc clears the selection the scene stood over')
    ctx.leap(DOC, WINDOW[0])


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
    # Enter on typed text that matches nothing goes nowhere and the box says so (foundations §2.3; K-31): the box stands open
    # over the text and its answer, the focus in its input, so the text can be corrected, until Esc closes it
    chord(ctx, 'l', mods=('Meta',))
    ctx.js('(() => { document.getElementById("leapq").value = ""; })()')
    ctx.drv.ime(NO_MATCH)
    ctx.frames(2)
    unmatched = ctx.js('window.__skep.leap.rows()')
    r.check(unmatched == [], 'the typed text matches nothing (what the next check stands on)', unmatched[:2])
    answer = ctx.js('(async () => (await import("./strings.js")).t("F.leap.none"))()')
    before, t0 = state(ctx), trail(ctx)
    chord(ctx, 'Enter')
    s, t1 = state(ctx), trail(ctx)
    held = ctx.js('(() => { const q = document.getElementById("leapq"); return {shown: getComputedStyle(document.getElementById("leap")).display !== "none", '
                  'focused: document.activeElement === q, value: q.value, note: document.getElementById("leapnote").textContent}; })()')
    r.check(s['leap'] and held['shown'] and held['focused'] and held['value'] == NO_MATCH and answer in held['note']
            and same_view(before, s) and t1['cursor'] == t0['cursor'] and len(t1['entries']) == len(t0['entries']),
            'Enter on typed text that matches nothing goes nowhere: the box stands open, the focus in its input, over the text and its answer; '
            'the camera, the trail\'s cursor and its length are unchanged',
            dict(held, leap=s['leap'], answer=answer, cam_same=same_view(before, s), cursor=[t0['cursor'], t1['cursor']], entries=[len(t0['entries']), len(t1['entries'])]))
    chord(ctx, 'Escape')
    r.check(not state(ctx)['leap'], 'Esc closes the box the unmatched text stands in')
    chord(ctx, 'l', mods=('Meta',))
    chord(ctx, 'ArrowDown')
    chord(ctx, 'Enter')
    s = state(ctx)
    lod = ctx.js('window.__skep.view.lod()')['name']
    r.check(not s['leap'] and s['focus'] and s['focus']['kind'] == 'board' and lod in ('far', 'far~mid'), 'Mod+L, ↓, Enter goes to the first level the box lists: the whole board', {'focus': s['focus'], 'lod': lod})
    ring_drawn(ctx, r, 'Mod+L, ↓, Enter')
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
    ring_drawn(ctx, r, 'Enter on a typed address')
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
    ring_drawn(ctx, r, 'Enter on a typed account address')
    chord(ctx, '[', mods=('Meta',))
    s = state(ctx)
    r.check(trail(ctx)['cursor'] == t0['cursor'] and same_view(left, s), 'Mod+[ from the account returns to the entry the LEAP left, at the view it left', {'cursor': s['trail'], 'cam': s['cam'], 'left': left['cam']})
    ring_drawn(ctx, r, 'Mod+[ from the account')
    # ---- WHOLE BOARD and HOME (K-13, K-14) --------------------------------------------------------
    chord(ctx, '0', mods=('Meta',))
    s = state(ctx)
    r.check(ctx.js('window.__skep.view.lod()')['name'] in ('far', 'far~mid') and s['focus'] and s['focus']['kind'] == 'board', 'Mod+0 shows the whole board at the clamp (the far band on this viewport); the focus is the board', {'lod': ctx.js('window.__skep.view.lod()')['name'], 'focus': s['focus']})
    ring_drawn(ctx, r, 'Mod+0')
    chord(ctx, 'H', mods=('Meta', 'Shift'))
    s = state(ctx)
    r.check(s['focus'] and s['focus']['kind'] == 'account' and s['focus']['addr'] == '1.0.1', 'Mod+Shift+H goes HOME: the acting account\'s region', s['focus'])
    r.check(ctx.js('window.__skep.view.lod()')['name'] in ('mid', 'far~mid'), 'HOME is the region at mid scale', ctx.js('window.__skep.view.lod()'))
    ring_drawn(ctx, r, 'Mod+Shift+H')
    # ---- Back / Forward (K-20, K-21) ----------------------------------------------------------------------
    cur = state(ctx)['trail']
    chord(ctx, '[', mods=('Meta',))
    s = state(ctx)
    r.check(s['trail'] == cur - 1 and s['focus']['kind'] == 'board', 'Mod+[ goes back one trail entry (to WHOLE BOARD)', {'cursor': s['trail'], 'focus': s['focus']})
    ring_drawn(ctx, r, 'Mod+[')
    chord(ctx, ']', mods=('Meta',))
    s = state(ctx)
    r.check(s['trail'] == cur and s['focus']['kind'] == 'account', 'Mod+] goes forward again', {'cursor': s['trail'], 'focus': s['focus']})
    ring_drawn(ctx, r, 'Mod+]')
    # the line's ‹ back (K-22): Enter on it, focused by script, is a key's Back, the ring drawn at its landing; a click on it
    # is the pointer's, and the ring is out. Mod+] after each returns the cursor to HOME's entry
    ctx.js('window.__skep.lineAct()')
    ctx.frames(2)
    focused = ctx.js('(() => { const b = document.getElementById("line-back"); if (b) b.focus(); return !!b && !b.disabled && document.activeElement === b; })()')
    chord(ctx, 'Enter')
    s = state(ctx)
    r.check(focused and s['trail'] == cur - 1 and s['focus']['kind'] == 'board', 'Enter on the line\'s ‹ back goes back one trail entry (to WHOLE BOARD)', {'focused': focused, 'cursor': s['trail'], 'focus': s['focus']})
    ring_drawn(ctx, r, 'Enter on ‹ back')
    chord(ctx, ']', mods=('Meta',))
    button = ctx.js('(() => { const q = document.getElementById("line-back").getBoundingClientRect(); return {x: q.left + q.width / 2, y: q.top + q.height / 2}; })()')
    ctx.drv.mouse(button['x'], button['y'])
    ctx.settle()
    ctx.frames(2)
    s, g = state(ctx), ring(ctx)
    r.check(s['trail'] == cur - 1 and s['focus']['kind'] == 'board', 'a click on ‹ back goes back one trail entry (to WHOLE BOARD)', {'cursor': s['trail'], 'focus': s['focus']})
    r.check(g['ring'] is None, 'a click on ‹ back draws no ring at its landing: the pointer moved the focus', g)
    chord(ctx, ']', mods=('Meta',))
    # ---- the trail: Mod+1…9 and Mod+Y (K-40, K-41) ------------------------------------------------------
    numbered = ctx.js('window.__skep.trail().numbered')
    chord(ctx, '3', mods=('Meta',), code='Digit3')
    s = state(ctx)
    target = next((n for n in numbered if n['n'] == 3), None)
    r.check(target and s['focus'] and s['focus']['addr'] == target['addr'], 'Mod+3 moves the cursor to the trail\'s third entry (newest first)', {'target': target, 'focus': s['focus']})
    ring_drawn(ctx, r, 'Mod+3')
    chord(ctx, 'y', mods=('Meta',))
    s = state(ctx)
    r.check(s['overlay'] == 'list', 'Mod+Y opens the trail list', s['overlay'])
    chord(ctx, 'Escape')
    r.check(state(ctx)['overlay'] is None, 'Esc closes the list')
    # Enter on a row of the list jumps to its entry (K-41), a cursor move: the row is focused by script, as the list opens
    # with the focus on its first stop
    t0 = trail(ctx)
    chord(ctx, 'y', mods=('Meta',))
    focused = ctx.js('(() => { const b = document.querySelector("#overlay [data-run=j2]"); if (b) b.focus(); return !!b && document.activeElement === b; })()')
    chord(ctx, 'Enter')
    s, t1 = state(ctx), trail(ctx)
    r.check(focused and s['overlay'] is None and t1['cursor'] == len(t0['entries']) - 2 and len(t1['entries']) == len(t0['entries']),
            'Enter on the trail list\'s second row jumps to the second-newest entry: the list closes, nothing pushed', {'focused': focused, 'overlay': s['overlay'], 'cursor': [t0['cursor'], t1['cursor']], 'entries': len(t1['entries'])})
    ring_drawn(ctx, r, 'Enter on a trail list row')
    # ---- the walk (K-1 … K-8) -------------------------------------------------------------------------
    ctx.leap(DOC, WINDOW[0])
    f0 = state(ctx)['focus']
    chord(ctx, 'ArrowDown')
    f1 = state(ctx)['focus']
    r.check(f1 != f0 and f1['addr'] == DOC, '↓ moves the focus to the next span', {'from': f0, 'to': f1})
    chord(ctx, 'ArrowUp')
    r.check(state(ctx)['focus'] == f0, '↑ moves it back')
    back = ctx.js('({line: window.__skep.line().address.pos, focus: window.__skep.view.focus().pos})')
    r.check(back['line'] == back['focus'], 'after a walk key the line\'s position is the focused span\'s own: the landing\'s position does not outlive the move', back)
    chord(ctx, 'ArrowLeft')
    f2 = state(ctx)['focus']
    r.check(f2 and f2['kind'] == 'document' and f2['addr'] == DOC, '← leaves the span for its document', f2)
    # Enter on the document the walk holds goes to it (K-7): a teleport, its entry pushed
    t0 = trail(ctx)
    chord(ctx, 'Enter')
    s, t1 = state(ctx), trail(ctx)
    r.check(s['focus'] and s['focus']['kind'] == 'document' and s['focus']['addr'] == DOC and t1['cursor'] == t0['cursor'] + 1 and t1['entries'][-1]['addr'] == DOC,
            'Enter on the document the walk holds teleports to it (K-7): its entry pushed, the focus on the document', {'focus': s['focus'], 'cursor': [t0['cursor'], t1['cursor']]})
    ring_drawn(ctx, r, 'Enter on a document')
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
    ctx.leap(DOC, WINDOW[0])
    ph, seen = phrase_at(ctx, DOC)
    r.check(ph is not None, 'a paragraph of the first edition is shown at the landing with a phrase clear of the one line (inside its clip and the viewport)', seen)
    target, p0, p1 = (ph['block'], ph['p0'], ph['p1']) if ph else (None, 0, 0)
    sel = None
    if ph:
        ctx.drv.drag(*ph['start'], *ph['end'])
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
    anchor_stands(ctx, r)
    press_holds(ctx, r)
    below_reading(ctx, r)
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
    # a camera move a key made re-takes the focus with the ring drawn at it (D5 §4 rules 2, 3): PageDown from a landing the
    # gate's door made, which draws none, moves the focus to the span then under the view's centre
    ctx.leap(DOC, WINDOW[0])
    f0, g0 = state(ctx)['focus'], ring(ctx)
    chord(ctx, 'PageDown')
    f1 = state(ctx)['focus']
    r.check(g0['ring'] is None and bool(f0) and bool(f1) and (f1['kind'], f1['addr'], f1['pos']) != (f0['kind'], f0['addr'], f0['pos']),
            'PageDown from a landing that drew no ring re-takes the focus at the span now under the view\'s centre', {'from': f0, 'to': f1, 'ring_before': g0['ring']})
    ring_drawn(ctx, r, 'PageDown')
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
    # the scene's own end moves no trail entry (SC: the scene never moves the camera): Esc leaves the trail as it stood,
    # so Back from there moves the camera to the entry behind; and a scene ended with the cursor behind the newest entry
    # keeps the entries ahead of it, so Forward still reaches them. Each on two entries of the first edition at two views
    ctx.leap(DOC, 1)
    ctx.leap(DOC, WINDOW[0])
    t0, before = trail(ctx), state(ctx)
    open_scene(ctx)
    chord(ctx, 'Escape')
    t1, s = trail(ctx), state(ctx)
    r.check(not s['scene'] and t1['entries'] == t0['entries'] and t1['cursor'] == t0['cursor'] and same_view(before, s),
            'Esc ends the scene and leaves the trail as it stood: its entries and its cursor unchanged, the camera where it was',
            {'scene': s['scene'], 'entries': [len(t0['entries']), len(t1['entries'])], 'cursor': [t0['cursor'], t1['cursor']], 'newest': t1['entries'][-1]['label']})
    behind = t0['entries'][t0['cursor'] - 1]['view']
    chord(ctx, '[', mods=('Meta',))
    s = state(ctx)
    r.check(not same_view(before, s) and same_view({'cam': behind}, s), 'Mod+[ after the scene\'s end moves the camera, to the view of the entry behind',
            {'cam': s['cam'], 'before': before['cam'], 'behind': behind})
    ctx.leap(DOC, 1)
    ctx.leap(DOC, WINDOW[0])
    chord(ctx, '[', mods=('Meta',))
    t2, at_behind = trail(ctx), state(ctx)
    open_scene(ctx)
    chord(ctx, '-', mods=('Meta',))
    t3, s = trail(ctx), state(ctx)
    r.check(not s['scene'] and t2['cursor'] == len(t2['entries']) - 2 and t3['entries'] == t2['entries'] and t3['cursor'] == t2['cursor'],
            'Mod+- ends a scene opened with the cursor behind the newest entry, and the entry ahead of the cursor stands: the trail unchanged',
            {'scene': s['scene'], 'entries': [len(t2['entries']), len(t3['entries'])], 'cursor': [t2['cursor'], t3['cursor']]})
    ahead = t2['entries'][-1]['view']
    chord(ctx, ']', mods=('Meta',))
    t4, s = trail(ctx), state(ctx)
    r.check(t4['cursor'] == t2['cursor'] + 1 and not same_view(at_behind, s) and same_view({'cam': ahead}, s), 'Mod+] from there moves the camera to the entry ahead, at its view',
            {'cursor': [t2['cursor'], t4['cursor']], 'cam': s['cam'], 'ahead': ahead})
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
    # ---- the scene covers the plane (D5 M-4; K-60 … K-63): no key reaches the walk, the selection or the corner under it ----
    # In a pane the walk's keys move that pane (K-60), ← ends the scene (K-63), → and Enter are the platform's, and the
    # selection's chords act on nothing; with the focus on nothing the walk's keys walk nothing; on the scene's acts Enter
    # presses the act. Each from a landing of its own, the scene opened over it — the focus in the far end's pane — and
    # ended after it, so each step leaves the page as it found it
    def over(pos, focus_item=False):
        """a landing on the first edition (`pos` None: the document), the walk's current item focused where asked, and the
        scene opened over it: what stood before any key"""
        ctx.leap(DOC, pos)
        if focus_item:
            ctx.js('(() => { const i = document.getElementById("walk-" + window.__skep.mirror.index()); window.__gateFrom = i; if (i) i.focus({preventScroll: true}); })()')
            ctx.frames(1)
        open_scene(ctx)
        return covered(ctx)

    def ended():
        ctx.js('window.__skep.scene.close()')
        ctx.esc()
        ctx.esc()

    for pos, keys, what in ((None, (('ArrowRight', ()),), '→ in a pane, the walk on the document under the scene: nothing moves — not the camera, not the walk\'s focus, not the trail'),
                            (None, (('Enter', ()),), 'Enter in a pane, the walk on the document under the scene: no teleport — the scene stands, the trail and the camera as they were'),
                            (WINDOW[0], (('Enter', ()),), 'Enter in a pane, the walk on a block under the scene: no selection and no card'),
                            (WINDOW[0], (('ArrowDown', ('Shift',)),), 'Shift+↓ in a pane, the walk on a block under the scene: K-8 selects nothing and opens no card'),
                            (WINDOW[0], (('O', ('Meta', 'Shift')),), 'Mod+Shift+O in a pane, the walk on a block under the scene: taken and acting on nothing — no selection, no answer\'s card')):
        before = over(pos)
        for key, mods in keys:
            chord(ctx, key, mods=mods)
        after = covered(ctx)
        r.check(before['scene'] and before['at'] == 'sceneB' and still(before, after), what,
                {'at': before['at'], 'moved': [k for k in ('cam', 'focus', 'trail', 'sel', 'overlay') if after[k] != before[k]], 'scene': after['scene'], 'focus': [before['focus'], after['focus']], 'overlay': after['overlay']})
        ended()
    before = over(WINDOW[0])
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    chord(ctx, 'ArrowDown')
    after = covered(ctx)
    r.check(before['scene'] and after['at'] == 'the body' and still(before, after), '↓ with the focus on nothing while the scene stands walks nothing under it: the walk\'s focus and the camera as they were',
            {'moved': [k for k in ('cam', 'focus', 'trail', 'sel', 'overlay') if after[k] != before[k]], 'focus': [before['focus'], after['focus']], 'scene': after['scene']})
    ended()
    # Enter on the scene's acts presses them (K-62, K-63): the re-level, pane A scrolled away, sets the two ends level again
    over(WINDOW[0])
    ctx.js('document.getElementById("sceneA").scrollTop += 400')
    ctx.frames(2)
    on = ctx.js('(() => { const b = document.querySelector("#scenebar [data-relevel]"); if (b) b.focus({preventScroll: true}); return !!b && document.activeElement === b; })()')
    chord(ctx, 'Enter')
    r.check(on, 'the scene\'s re-level act takes the focus')
    level_holds(r, 'Enter on the scene\'s re-level act, pane A scrolled away (K-62)', scene_level(ctx))
    ended()
    # the ×, the scene opened from the walk's current item: the scene ends and the focus is back on that item (K-63)
    before = over(WINDOW[0], focus_item=True)
    on = ctx.js('(() => { const x = document.querySelector("#scenebar [data-x]"); if (x) x.focus({preventScroll: true}); return !!x && document.activeElement === x; })()')
    chord(ctx, 'Enter')
    after = covered(ctx)
    back = ctx.js('!!window.__gateFrom && document.activeElement === window.__gateFrom')
    r.check(on and not after['scene'] and back and after['trail'] == before['trail'] and after['sel'] is None,
            'Enter on the scene\'s × ends it: the trail as it stood, no selection, and the focus back on the walk\'s item the scene was opened from (K-63)',
            {'focused_x': on, 'scene': after['scene'], 'focus_back': back, 'at': after['at'], 'sel': after['sel'], 'trail_moved': after['trail'] != before['trail']})
    ended()
    # ---- the copy from a reading scene's pane, and the pane's own text under a feed row (§2.4, §2.5) --------------
    scene_copy(ctx, r)
    # ---- the focus and keyboard rules the one-owner lane added (FP-20) --------------------------------------------
    focus_rules(ctx, r)
    # ---- the platform's own are never taken (K-92): Mod+C leaves everything -----------------------------
    s0 = state(ctx)
    chord(ctx, 'c', mods=('Meta',))
    s1 = state(ctx)
    r.check(same_view(s0, s1) and s1['overlay'] == s0['overlay'] and not s1['leap'], 'Mod+C is the platform\'s: nothing happens on the plane')
    r.figures['chords_dispatched'] = ['t', '/', '0', 'k', 'h', '?', '+', 'g', 'Space', 'Process(229)', 'IME commit', '↓/Enter/Esc(229) in the LEAP box', 'Mod+L', 'Esc', 'Mod+L Enter', 'Mod+L ↓ Enter', 'Mod+K', 'Enter', 'Enter on an account address', 'Mod+0', 'Mod+Shift+H', 'Mod+[', 'Mod+]', 'Enter on ‹ back', 'a click on ‹ back', 'Mod+3', 'Mod+Y', 'Enter on a trail list row', '↓', '↑', '←', 'Enter on a document', '→', 'End', 'Home', 'Shift+↓', 'Shift+↑', 'Mod+Shift+L', 'a links card row\'s press', 'Mod+Shift+O', 'Mod+Shift+R', 'Mod+Enter', 'a pointer drag', 'Shift+→', 'Shift+←', 'a click and a drag below reading scale, a click and a drag above it', 'Mod+=', 'Mod+-', 'PageDown', 'PageUp', 'Mod+R', 'Esc and Mod+- ending the scene, then Mod+[ and Mod+]', 'Mod+[ and Mod+] in the scene', 'Mod+0 in the scene', '→, Enter, Shift+↓ and Mod+Shift+O in a pane', '↓ with the focus on nothing under the scene', 'Enter on the scene\'s re-level and ×', 'a drag in each pane of the scene, then the copy', 'Mod+C']
    ctx.leap(DOC, WINDOW[0])
    return r.out()
