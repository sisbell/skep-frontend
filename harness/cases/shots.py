"""SHOTS — the threshold set (T5; S3's Shift+Z set as a case): a screenshot at
each LOD threshold of `web/plane/lod.js` (the page names them in
`window.__skep.thresholds`) and at each B1 screen this lane built — produced
for the typography and a11y seats, not asserted beyond "written". Chrome
composites the DOM text layer into the shot (C5 (b))."""
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
    def screen(sid, what, rel):
        screens.append({'screen': sid, 'what': what, 'shot': ctx.shot(f'screens/{rel}.png')})
    ctx.leap(DOC, WINDOW[0])
    screen('B1-S1', 'arrive and read: the first edition at reading scale, the owner\'s links in place, the byline, the state line, the presence indicator', 'B1-S1-arrive-and-read')
    ctx.view_doc_px(DOC, 160)
    screen('B1-S2', 'the region at mid: extents, the drafts\' corners', 'B1-S2-region-mid')
    ctx.js('window.__skep.go.wholeBoard()'); ctx.settle(); ctx.frames(2)
    screen('B1-S3', 'the far counts: the whole board at the clamp', 'B1-S3-far-counts')
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
    screen('B1-S7', 'the window run: C-33\'s mark for the entitled reader (the guest\'s withheld box is the pure test\'s)', 'B1-S7-window-run')
    ctx.js('window.__skep.go.leapTo(%s, null)' % json.dumps(GHOST)); ctx.settle(); ctx.frames(2)
    screen('B1-S8', 'a dead reference: the ghost address faced', 'B1-S8-ghost')
    ctx.esc()
    ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(DOC), json.dumps(WINDOW[2]))); ctx.settle(); ctx.frames(3)
    screen('B1-S9', 'the scene: the window beside its origin', 'B1-S9-scene')
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
