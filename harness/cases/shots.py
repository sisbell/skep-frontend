"""SHOTS — the threshold set (T5; S3's Shift+Z set as a case): a screenshot at
each LOD threshold of `web/plane/lod.js` (the page names them in
`window.__skep.thresholds`) and at each B1 screen this lane built — produced
for the typography and a11y seats, not asserted beyond "written", save that
a screen whose caption claims an element asserts it in view (inside its clip
and the viewport, by the page's `visible` oracle), and one whose caption
claims the canvas's labels asserts the canvas set them (the page's
`labels`). Chrome composites the DOM text layer into the shot (C5 (b))."""
import json

from . import DOC, GHOST, WINDOW, Result


def run(ctx):
    r = Result()
    thresholds = ctx.js('window.__skep.thresholds')
    box = ctx.js('window.__skep.boxOf(%s)' % json.dumps(DOC))
    written = []
    for name, value, kind in thresholds:
        scale = ctx.js('window.__skep.scaleFor(%s, %s, %s)' % (json.dumps(DOC), json.dumps(kind), value))
        ctx.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] * (0.3 if kind == 'em' else 0.5), scale)
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
    screen('B1-S1', 'arrive and read: the first edition at reading scale, the owner\'s links in place, the byline, the state line, the presence indicator, its corner', 'B1-S1-arrive-and-read',
           claims=[(corner, 'the first edition\'s corner', None)])
    ctx.view_doc_px(DOC, 160)
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
    frac = 0.12 + 0.8 * ((WINDOW[0] - 1) / doc['extent'])
    ctx.view_doc_em(DOC, 14)
    ctx.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] * frac, ctx.camera()['scale'])
    screen('B1-S7', 'the window run: C-33\'s mark for the entitled reader (a guest\'s placeholder at the run is the guest case\'s, shots/guest/), the corner held at the top of the document\'s visible part', 'B1-S7-window-run',
           claims=[('#domlayer .sp[data-addr="%s"] .pubmark[data-mark="C-33"]' % DOC, 'C-33\'s mark', None), (corner, 'the first edition\'s corner', None)])
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
    ctx.leap(DOC, WINDOW[0])
    return r.out()
