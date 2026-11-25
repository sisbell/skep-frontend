"""SHOTS — the threshold set (T5; S3's Shift+Z set as a case): a screenshot at
each LOD threshold of `web/plane/lod.js` (the page names them in
`window.__skep.thresholds`) and at each B1 screen this lane built — produced
for the typography and a11y seats, not asserted beyond "written", save that
a screen whose caption claims an element asserts it in view (inside its clip
and the viewport, by the page's `visible` oracle), and one whose caption
claims the canvas's labels asserts the canvas set them (the page's
`labels`). Chrome composites the DOM text layer into the shot (C5 (b)).
B11-S9's reserved number typed in the LEAP box is shot at 1440 px and at
390 px, into `shots/B11-S9/`: its row's words before Enter, then the face at
its row and the jump on the row below after it (issue #771's decision). The
claimant's well-known slots are shot at 1440 px and at 390 px too: its
mailbox, its article standing, named by its label held below the one line over
its article, holding the name its own mailbox is shown by, into
`shots/B11-S7/`, and the LEAP box with `mailbox` typed, its own row first,
into `shots/B11-S9/` (B11-S7, B11-S9, B11-F10). The one form
is shot into `shots/B11-S5/` (B11-S5): each region the test board draws
framed at mid on its slot cells, with its forms' labels set and below their
drop, at 1440 px and at 390 px; the walk's ring on the claimant's bio's form;
and the claimant's first row beside the second account's in one view. The
slot's face at reading scale is shot into `shots/B11-S5-face/` (B11-S5; the
slot's face decision): the second account's bio at zero, its first opening
in the session and a later one, at 1440 px and at 390 px; its read held at
the landing, the count's place hollow; the claimant's own bio, its plain
word; and the zoom's pair, the form's label at mid, then the face in its
place at reading scale. B11-S10's byline as v1 draws it is shot into
`shots/B11-S10-byline/` (the byline's act decision; #780): the reader's own
and another account's at 1440 px and at 390 px, the byline's stop focused, a
tail at HOME with its press area outlined by the shot alone, and an arrival in
two runs below reading scale before and after a press on a piece."""
import json

from . import AGENT_SPACE, BIO, DOC, GHOST, MAILBOX, MAILBOX_SLOT, SECOND_ACCOUNT, WINDOW, Result, hold_mailbox, slot_words

RESERVED = '1.0.1.0.7'  # a reserved number of the claimant's: the map gives it no cell, and the board says nothing of it


def claimed(ctx, r, sid, selector, what, xfail=None):
    """a shot's caption claiming an element: asserted in view, inside its clip and the viewport (the page's `visible`)"""
    vis = ctx.js('window.__skep.visible(%s)' % json.dumps(selector))
    r.check(bool(vis) and all(v['inClip'] and v['inView'] for v in vis), f'{sid}: {what} is in view, as the caption claims (inside its clip and the viewport)', [{'rect': v['rect'], 'clip': v['clip'], 'inClip': v['inClip'], 'inView': v['inView']} for v in vis][:3], xfail=xfail)


def reserved_shots(ctx, r):
    """B11-S9 at a reserved number (see the head): the box with the typed row's words, then with the face at its row and the
    jump below it, at 1440 px and at 390 px — each claim in view"""
    shots = []
    for width, height in ((1440, 900), (390, 844)):
        was = ctx.resize(width, height)
        ctx.js('window.__skep.model.invalidate(%s)' % json.dumps(RESERVED))
        ctx.js('window.__skep.leap.open()'); ctx.frames(1)
        ctx.js('(() => { const q = document.getElementById("leapq"); q.value = %s; q.dispatchEvent(new Event("input")); })()' % json.dumps(RESERVED))
        ctx.frames(2)
        shots.append(ctx.shot(f'B11-S9/reserved-row-{width}.png'))
        claimed(ctx, r, 'B11-S9 at %d px, typed' % width, '#leaphits .hit:first-child .go > span.a:last-of-type', 'the typed row\'s "reserved number"')
        ctx.drv.key('Enter'); ctx.settle(); ctx.frames(3)
        shots.append(ctx.shot(f'B11-S9/reserved-face-{width}.png'))
        claimed(ctx, r, 'B11-S9 at %d px, after Enter' % width, '#leaphits .hit:first-child .face', 'the face at the typed row')
        claimed(ctx, r, 'B11-S9 at %d px, after Enter' % width, '#leaphits .hit:nth-child(2) .go', 'the jump on the row below')
        ctx.js('window.__skep.leap.close()'); ctx.frames(1)
        ctx.resize(*was)
    return shots


def slot_name_shots(ctx, r):
    """B11-S7 and B11-S9 at the claimant's well-known slots (see the head): its mailbox, its article standing, named by its
    label held below the one line over its article (`hold_mailbox`), holding the name its own mailbox is shown by — the held
    label asserting it set and in view — and the LEAP box with `mailbox` typed, the own row first — that row asserted in view —
    at 1440 px and at 390 px"""
    shots = []
    mine = slot_words(ctx)['L.well-known.your-mailbox']
    for width, height in ((1440, 900), (390, 844)):
        was = ctx.resize(width, height)
        held = hold_mailbox(ctx, MAILBOX)
        shots.append(ctx.shot(f'B11-S7/your-mailbox-{width}.png'))
        r.check(mine in [p['text'] for p in held['parts'] or []], f'B11-S7 at {width} px: the claimant\'s mailbox\'s label held over its article holds "{mine}", as the caption claims (the page set it)',
                held)
        claimed(ctx, r, 'B11-S7 at %d px' % width, '#corners .held[data-held="%s"]' % MAILBOX, 'the claimant\'s mailbox\'s held label')
        ctx.js('window.__skep.leap.open()'); ctx.frames(1)
        ctx.js('(() => { const q = document.getElementById("leapq"); q.value = "mailbox"; q.dispatchEvent(new Event("input")); })()')
        ctx.frames(2)
        shots.append(ctx.shot(f'B11-S9/slot-name-typed-{width}.png'))
        first = ctx.js('window.__skep.leap.rows()[0] || null')
        r.check(bool(first) and first['kind'] == 'slot' and first['addr'] == MAILBOX, f'B11-S9 at {width} px, "mailbox" typed: the own mailbox the first row, as the caption claims', first)
        claimed(ctx, r, 'B11-S9 at %d px, "mailbox" typed' % width, '#leaphits .hit:first-child .go', 'the own row')
        ctx.js('window.__skep.leap.close()'); ctx.frames(1)
        ctx.resize(*was)
    return shots


# the one form's shots (B11-S5): a depth-0 box this many px wide frames a region's slot cells with their forms' labels set — at 1440 px
# its four slot cells, at 390 px, where the fit's narrower measure narrows each cell's first column slot, its bio's — and one this many
# below the labels' drop (measured on the test board; FP-18)
FORM_LABELLED_PX = {1440: 300, 390: 420}
FORM_BARE_PX = 60


def form_shots(ctx, r):
    """B11-S5, the one form at mid (see the head): each region the test board draws — the claimant's, its agent space's, the
    second account's — framed on its slot cells, once where its forms' labels are set and once below their drop, at 1440 px and
    at 390 px; the walk's ring on the claimant's bio's form; and the claimant's first row beside the second account's in one view
    — each shot's claim asserted on the canvas: the forms the frame drew, the labels it set, the ring it drew"""
    shots = []
    def framed(acct, px, narrow=False):
        """the camera at mid on a region's slot cells, a depth-0 box `px` px wide — between its bio's and its link page's cells, or on
        its bio's form where the view is `narrow` — and the forms the frame drew there"""
        bio, page = '%s.0.%d' % (acct, MAILBOX_SLOT + 1), '%s.0.%d' % (acct, MAILBOX_SLOT + 2)
        b3, b4 = ctx.js('window.__skep.boxOf(%s)' % json.dumps(bio)), ctx.js('window.__skep.boxOf(%s)' % json.dumps(page))
        o3 = ctx.js('window.__skep.fold(%s)' % json.dumps(bio))['outline']
        ctx.set_view(o3['x'] + o3['w'] / 2 if narrow else (b3['x'] + b3['w'] + b4['x']) / 2, o3['y'] + o3['h'] / 2, ctx.extent_scale(px))
        return [f for f in ctx.js('window.__skep.forms()') if f['addr'].startswith(acct + '.0.')]
    for width, height in ((1440, 900), (390, 844)):
        was = ctx.resize(width, height)
        for who, acct in (('own', '1.0.1'), ('agent', AGENT_SPACE), ('other', SECOND_ACCOUNT)):
            drawn = framed(acct, FORM_LABELLED_PX[width], width < 1440)
            shots.append(ctx.shot(f'B11-S5/{who}-labels-{width}.png'))
            r.check(bool(drawn) and any(f['label'] for f in drawn), f'B11-S5 {who} at {width} px: the region\'s forms drawn and labelled, as the caption claims (the canvas set them)',
                    [[f['addr'], f['label']] for f in drawn])
            drawn = framed(acct, FORM_BARE_PX, width < 1440)
            shots.append(ctx.shot(f'B11-S5/{who}-bare-{width}.png'))
            r.check(bool(drawn) and not any(f['label'] for f in drawn), f'B11-S5 {who} at {width} px, below the labels\' drop: the forms drawn bare, as the caption claims',
                    [[f['addr'], f['label']] for f in drawn])
        for k, mods in (('H', ('Meta', 'Shift')), ('ArrowRight', ()), ('Home', ()), ('ArrowDown', ()), ('ArrowDown', ())):
            ctx.drv.key(k, mods=mods); ctx.settle(); ctx.frames(2)
        ring, focus = ctx.js('window.__skep.view.ring()'), ctx.js('(() => { const f = window.__skep.view.focus(); return f && [f.kind, f.addr]; })()')
        shots.append(ctx.shot(f'B11-S5/ring-on-bio-{width}.png'))
        form = next((f['rect'] for f in ctx.js('window.__skep.forms()') if f['addr'] == BIO), None)
        r.check(focus == ['form', BIO] and bool(ring) and bool(form) and all(abs(ring[q] - form[q]) <= 0.5 for q in ('x', 'y', 'w', 'h')),
                f'B11-S5 at {width} px: the walk\'s ring around the claimant\'s bio\'s form, as the caption claims', {'focus': focus, 'ring': ring, 'form': form})
        ctx.esc()
        ctx.resize(*was)
    a, b = ctx.js('window.__skep.accountCell("1.0.1")'), ctx.js('window.__skep.accountCell(%s)' % json.dumps(SECOND_ACCOUNT))
    f3 = ctx.js('window.__skep.fold(%s)' % json.dumps(BIO))
    vp = ctx.js('window.__skep.view.viewport()')
    ctx.set_view((a['x'] + b['x'] + b['w']) / 2, f3['outline']['y'] + f3['outline']['h'] / 2, vp['VW'] / (b['x'] + b['w'] - a['x']) * 0.95)
    rows = {f['addr'] for f in ctx.js('window.__skep.forms()')}
    shots.append(ctx.shot('B11-S5/first-rows-1440.png'))
    r.check({BIO, '%s.0.%d' % (SECOND_ACCOUNT, MAILBOX_SLOT)} <= rows and ctx.js('window.__skep.view.lod().name') == 'mid',
            'B11-S5: the claimant\'s first row beside the second account\'s in one view at mid, the forms of both drawn, as the caption claims', sorted(rows))
    return shots


def face_shots(ctx, r):
    """B11-S5's face at reading scale (see the head): each shot's claim asserted on the page — the face standing, its statement
    whole or compact, its corner's items, its own plain word, the form's label at mid — through the gate's face door"""
    shots = []
    bio2 = '%s.0.%d' % (SECOND_ACCOUNT, MAILBOX_SLOT + 1)
    face = lambda slot: next((f for f in ctx.js('window.__skep.faces()') if f['slot'] == slot), None)
    wait = lambda slot, cond='true': ctx.js('new Promise((res) => { const t0 = performance.now(); const tick = () => { const f = window.__skep.faces().find((x) => x.slot === %s); return (f && (%s)) || performance.now() - t0 > 10000 ? res(true) : setTimeout(tick, 50); }; tick(); })' % (json.dumps(slot), cond))
    ctx.js('window.__skep.slotFaceSession()')
    for width, height in ((1440, 900), (390, 844)):
        was = ctx.resize(width, height)
        ctx.js('window.__skep.slotFaceSession()')
        ctx.leap(bio2); wait(bio2)
        f = face(bio2)
        shots.append(ctx.shot(f'B11-S5-face/empty-first-{width}.png'))
        r.check(bool(f) and f['whole'] is True and f['items'] == [], f'B11-S5\'s face at zero, its first opening in the session, at {width} px: the statement whole, the corner drawing nothing, as the caption claims', f and {'whole': f['whole'], 'items': f['items']})
        ctx.leap(bio2); wait(bio2)
        f = face(bio2)
        shots.append(ctx.shot(f'B11-S5-face/empty-later-{width}.png'))
        r.check(bool(f) and f['whole'] is False, f'B11-S5\'s face at zero, a later opening, at {width} px: the statement compact, as the caption claims', f and f['whole'])
        ctx.drv.hold_op('find_links_ftt')
        ctx.js('void window.__skep.go.leapTo(%s, null)' % json.dumps(bio2))
        wait(bio2, 'f.items.some((i) => i.cls.includes("arriving"))')
        ctx.frames(3)
        f = face(bio2)
        shots.append(ctx.shot(f'B11-S5-face/reading-{width}.png'))
        ctx.drv.answer_op('whole'); ctx.drv.unhold()
        wait(bio2, '!f.items.some((i) => i.cls.includes("arriving"))')
        r.check(bool(f) and any('arriving' in i['cls'] for i in f['items']), f'B11-S5\'s face with its read out, at {width} px: the count\'s place hollow, as the caption claims', f and f['items'])
        ctx.leap(BIO); wait(BIO)
        f = face(BIO)
        shots.append(ctx.shot(f'B11-S5-face/own-bio-{width}.png'))
        r.check(bool(f) and any(x['cls'] == 'own' for x in f['rows']), f'B11-S5\'s face at the claimant\'s own bio, at {width} px: its plain word that no act here creates it, as the caption claims', f and [x['cls'] for x in f['rows']])
        ctx.resize(*was)
    # the zoom's pair: the form's label at mid, then the face in its place at reading scale (law 8)
    b3, b4 = ctx.js('window.__skep.boxOf(%s)' % json.dumps(bio2)), ctx.js('window.__skep.boxOf(%s)' % json.dumps('%s.0.%d' % (SECOND_ACCOUNT, MAILBOX_SLOT + 2)))
    o3 = ctx.js('window.__skep.fold(%s)' % json.dumps(bio2))['outline']
    ctx.set_view((b3['x'] + b3['w'] + b4['x']) / 2, o3['y'] + o3['h'] / 2, ctx.extent_scale(FORM_LABELLED_PX[1440]))
    drawn = next((x for x in ctx.js('window.__skep.forms()') if x['addr'] == bio2), None)
    shots.append(ctx.shot('B11-S5-face/zoom-label-mid-1440.png'))
    r.check(bool(drawn) and bool(drawn['label']) and not face(bio2), 'B11-S5\'s zoom at 1440 px, at mid: the form\'s label set, no face, as the caption claims', drawn and drawn['label'])
    ctx.js('(async () => { const L = await import("./text/layer.js"); const C = await import("./plane/camera.js"); const at = L.frameOf(%s, null); C.reach(at.fs); window.__skep.view.set(C.viewAt(at, at.fs, C.landingPx())); return true; })()' % json.dumps(bio2))
    wait(bio2); ctx.settle(); ctx.frames(2)
    shots.append(ctx.shot('B11-S5-face/zoom-face-1440.png'))
    f = face(bio2)
    label = next((x for x in ctx.js('window.__skep.forms()') if x['addr'] == bio2), None)
    r.check(bool(f) and not (label or {}).get('label'), 'B11-S5\'s zoom at 1440 px, at reading scale: the face in the label\'s place, the canvas setting no label there, as the caption claims', {'face': bool(f), 'label': label and label['label']})
    return shots


def byline_shots(ctx, r):
    """B11-S10's byline as v1 draws it (the byline's act decision; #780), into `shots/B11-S10-byline/`: the reader's own byline at
    the first edition and another account's at its home, at 1440 px and at 390 px — the address with `↗`, the label, the cue on
    another's; the byline's stop focused, its ring around the token and its sign; a tail at HOME with its press area outlined by
    the shot alone; and an arrival in two runs below its document's reading scale, before and after a press on a piece — its
    outlines standing. Each claim in view"""
    shots = []
    other = SECOND_ACCOUNT + '.0.1'
    for width, height in ((1440, 900), (390, 844)):
        was = ctx.resize(width, height)
        for name, addr in (('own', DOC), ('another', other)):
            ctx.leap(addr, None); ctx.frames(3)
            sel = '#domlayer article.dtext[data-addr="%s"] .hd .by .go' % addr
            shots.append(ctx.shot(f'B11-S10-byline/{name}-{width}.png'))
            claimed(ctx, r, 'B11-S10 at %d px, %s byline' % (width, name), sel, 'the address with its sign, its act')
        ctx.resize(*was)
    # the byline's stop focused: its ring around the token and its sign, never corner Ls
    ctx.leap(DOC, None); ctx.frames(3)
    ctx.drv.key('Tab', code='Tab'); ctx.frames(3)
    focused = ctx.js('(() => { const a = document.activeElement; return !!a && !!a.closest("#byline"); })()')
    r.check(focused, 'B11-S10: Tab from the walk\'s element puts the focus on the byline\'s stop', focused)
    shots.append(ctx.shot('B11-S10-byline/stop-focused-1440.png'))
    claimed(ctx, r, 'B11-S10, the stop focused', '#byline .act[data-act="go"]', 'the byline\'s address act, its ring drawn')
    ctx.drv.key('Escape'); ctx.frames(2)
    # a tail at HOME, its press area outlined by the shot alone (#780; FP-44)
    ctx.js('window.__skep.go.home()'); ctx.settle(); ctx.frames(3)
    tail = next((t for t in ctx.js('window.__skep.tails()') if t['at'] == DOC and t['form'] == 'box'), None)
    area = ctx.js('window.__skep.tailArea(%s)' % json.dumps(tail['key'])) if tail else None
    if r.check(bool(area), 'B11-S10: HOME draws the first edition\'s tail, its press area read', area):
        ctx.js('''((a) => { const e = document.createElement('div'); e.id = 'gate-tail-area'; e.style.cssText = 'position:fixed;z-index:50;pointer-events:none;outline:1px dashed #ffb454;left:' + a.x + 'px;top:' + a.y + 'px;width:' + a.w + 'px;height:' + a.h + 'px'; document.body.appendChild(e); })(%s)''' % json.dumps(area))
        shots.append(ctx.shot('B11-S10-byline/tail-area-1440.png'))
        ctx.js('(() => { const e = document.getElementById("gate-tail-area"); if (e) e.remove(); })()')
    # an arrival in two runs, below its document's reading scale, before and after a press on its second piece
    blocks = [b for b in ctx.js('window.__skep.model.doc(%s)' % json.dumps(DOC))['blocks'] if b['kind'] == 'para' and len(b['text'].strip()) >= 12 and b['pos'] < WINDOW[0] - 200]
    if len(blocks) >= 2:
        p1, p2 = blocks[0], blocks[1]
        ids = ctx.js('window.__skep.model.identity(%s, %d, %d)' % (json.dumps(DOC), p1['pos'], p2['pos'] + 8 - p1['pos']))
        if ids and len(ids) == 1:
            ctx.js('window.__skep.go.leapTo(%s, %d, %s)' % (json.dumps(DOC), p1['pos'], json.dumps({'runs': [{'pos': p1['pos'], 'width': 8}, {'pos': p2['pos'], 'width': 8}], 'passage': ids[0]})))
            ctx.settle(); ctx.frames(3)
            for _ in range(4):
                ctx.drv.key('-', mods=('Meta',)); ctx.settle(); ctx.frames(2)
            rects = [q for q in ctx.js('window.__skep.arrivalRects()') if q['span'] and q['span']['pos'] == p2['pos'] and q['y'] > 40]
            shots.append(ctx.shot('B11-S10-byline/arrival-before-1440.png'))
            r.check(len(ctx.js('window.__skep.arrivalRects()')) >= 2 and bool(rects), 'B11-S10: below reading scale the arrival\'s two runs outlined, the second in view', rects[:2])
            if rects:
                q = rects[0]
                ctx.drv.click(q['x'] + q['w'] / 2, q['y'] + q['h'] / 2); ctx.settle(); ctx.frames(3)
                shots.append(ctx.shot('B11-S10-byline/arrival-after-1440.png'))
                r.check(len(ctx.js('window.__skep.arrivalRects()')) >= 1 and bool(ctx.js('window.__skep.go.arrival()')), 'B11-S10: after the press on its second piece the arrival stands, outlined', ctx.js('window.__skep.go.landing()') and ctx.js('window.__skep.go.landing()')['current'])
            ctx.js('window.__skep.go.endArrival()')
    ctx.leap(DOC, WINDOW[0])
    return shots


def run(ctx):
    r = Result()
    thresholds = ctx.js('window.__skep.thresholds')
    box = ctx.js('window.__skep.boxOf(%s)' % json.dumps(DOC))
    written = []
    first = ctx.js('window.__skep.centreOf(%s, null)' % json.dumps(DOC))
    for name, value, kind in thresholds:
        # an em threshold at the first edition's own em, over its first column, where its text stands; a box threshold —
        # P-LOD's, a depth-0 document's extent — over its room
        scale = ctx.js('window.__skep.scaleFor(%s, "em", %s)' % (json.dumps(DOC), value)) if kind == 'em' else ctx.extent_scale(value)
        ctx.set_view(first['x'] if kind == 'em' else box['x'] + box['w'] / 2, first['y'] if kind == 'em' else box['y'] + box['h'] / 2, scale)
        lod = ctx.js('window.__skep.view.lod()')
        rel = ctx.shot(f'thresholds/{name}.png')
        written.append({'name': name, 'value': value, 'kind': kind, 'scale': scale, 'lod': lod['name'], 'mounted': ctx.js('window.__skep.mountedAddrs()'), 'shot': rel})
    r.figures['thresholds'] = written
    r.check(len(written) == len(thresholds), 'one shot per threshold', len(written))
    # the B1 screens built
    screens = []
    def screen(sid, what, rel, claims=()):
        screens.append({'screen': sid, 'what': what, 'shot': ctx.shot(f'screens/{rel}.png')})
        for selector, claimed, xfail in claims:
            vis = ctx.js('window.__skep.visible(%s)' % json.dumps(selector))
            r.check(bool(vis) and all(v['inClip'] and v['inView'] for v in vis), f'{sid}: {claimed} is in view, as the caption claims (inside its clip and the viewport)', [{'rect': v['rect'], 'clip': v['clip'], 'inClip': v['inClip'], 'inView': v['inView']} for v in vis][:3], xfail=xfail)
    corner = '#corners [data-corner="%s"]' % DOC
    ctx.leap(DOC, WINDOW[0])
    screen('B1-S1', 'arrive and read: the first edition at reading scale, the owner\'s links in place, the byline, the presence indicator, its corner', 'B1-S1-arrive-and-read',
           claims=[(corner, 'the first edition\'s corner', None)])
    ctx.view_extent_px(DOC, 160)
    screen('B1-S2', 'the region at mid: the extents, each edged as a draft or an edition', 'B1-S2-region-mid')
    ctx.js('window.__skep.go.wholeBoard()'); ctx.settle(); ctx.frames(2)
    screen('B1-S3', 'the far counts: the whole board at the clamp — the board\'s label and residue statement in the cell of its user grid no account takes; each cluster\'s address above its density mark and beneath it the counts its mark holds at the label floor, those it cannot hold left out', 'B1-S3-far-counts')
    named = {(l['kind'], l['place']) for l in ctx.js('window.__skep.labels()')}
    r.check(('board', '1') in named and ('cluster', '1.0.1') in named, 'B1-S3: the board\'s label and the clusters\' labels are set, as the caption says', sorted(named))
    ctx.leap(DOC, WINDOW[0])
    ctx.js('window.__skep.cards.links(%s)' % json.dumps(DOC)); ctx.frames(2)
    screen('B1-S4', 'the links card: the chain\'s stage, the others\' toggle, the lenses, the rows', 'B1-S4-links-card')
    shown = ctx.js('window.__skep.links.shown(%s)' % json.dumps(DOC))
    ctx.esc()
    if shown:
        ctx.js('window.__skep.cards.anatomy(%s, %s)' % (json.dumps(DOC), json.dumps(shown[0]['link']))); ctx.settle(); ctx.frames(2)
        screen('B1-S5', 'the anatomy card', 'B1-S5-anatomy-card')
        ctx.esc()
        ctx.js('window.__skep.go.follow(%s, %s)' % (json.dumps(DOC), json.dumps(shown[0]['link']))); ctx.settle(); ctx.frames(2)
        screen('B1-S6', 'follow: the ghost target\'s dead-reference face', 'B1-S6-follow-face')
        ctx.esc()
    doc = ctx.js('window.__skep.model.doc(%s)' % json.dumps(DOC))
    ctx.view_doc_em(DOC, 14)
    ctx.view_at(DOC, WINDOW[0])
    screen('B1-S7', 'the window run: its origin stated in its column\'s edge with C-33\'s words for the entitled reader (a guest\'s placeholder at the run is the guest case\'s, shots/guest/), the corner held at the top of the document\'s visible part', 'B1-S7-window-run',
           claims=[('#corners .edge-sign[data-sign="statement"][data-addr="%s"][data-origin="%s"] .c33' % (DOC, WINDOW[2]), 'C-33\'s words in the run\'s origin\'s statement', None), (corner, 'the first edition\'s corner', None)])
    ctx.js('window.__skep.go.leapTo(%s, null)' % json.dumps(GHOST)); ctx.settle(); ctx.frames(2)
    screen('B1-S8', 'a dead reference: the ghost address faced', 'B1-S8-ghost')
    ctx.esc()
    ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(DOC), json.dumps(WINDOW[2]))); ctx.settle(); ctx.frames(3)
    screen('B1-S9', 'the scene: the window beside its origin, each pane with its own corner on its outer side', 'B1-S9-scene',
           claims=[('#sceneA [data-corner="%s"]' % DOC, 'the window\'s corner in its pane', None), ('#sceneB [data-corner="%s"]' % WINDOW[2], 'the origin\'s corner in its pane', None)])
    ctx.js('window.__skep.scene.close()'); ctx.frames(2)
    blocks = doc['blocks']
    wb = next((b for b in blocks if b['pos'] <= WINDOW[0] < b['pos'] + b['width']), blocks[0])
    ctx.leap(DOC, WINDOW[0])
    ctx.js('window.__skep.cards.wrote(%s, %d)' % (json.dumps(DOC), wb['pos'])); ctx.settle(); ctx.frames(2)
    screen('B1-S10', 'provenance: who wrote this?', 'B1-S10-provenance')
    ctx.esc()
    ctx.js('window.__skep.leap.open()'); ctx.frames(2)
    screen('B1-S11', 'LEAP: the box holding the current address, the levels beneath', 'B1-S11-leap')
    ctx.js('window.__skep.leap.close()')
    ctx.js('window.__skep.cards.trailList()'); ctx.frames(2)
    screen('B1-S12', 'the trail list', 'B1-S12-trail')
    ctx.esc()
    ctx.js('window.__skep.select(%s, %d)' % (json.dumps(DOC), wb['pos'])); ctx.frames(2)
    screen('B1-selection', 'the selection\'s read acts in their fixed slots (annotate, quote and link to… inert)', 'B1-selection-acts')
    ctx.esc()
    ctx.js('window.__skep.cards.versions(%s, %d)' % (json.dumps(DOC), wb['pos'])); ctx.settle(); ctx.frames(2)
    screen('B1-versions', 'the versions list for the first edition', 'B1-versions')
    ctx.esc()
    r.figures['screens'] = screens
    r.check(len(screens) >= 12, 'the B1 screens built are shot', len(screens))
    r.figures['b11_reserved'] = reserved_shots(ctx, r)
    r.figures['b11_slot_names'] = slot_name_shots(ctx, r)
    r.figures['b11_one_form'] = form_shots(ctx, r)
    r.figures['b11_slot_face'] = face_shots(ctx, r)
    r.figures['b11_byline'] = byline_shots(ctx, r)
    ctx.leap(DOC, WINDOW[0])
    return r.out()
