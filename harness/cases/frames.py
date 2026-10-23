"""FRAMES — class 6 (the structure record §6.3; T3 (6)): S3's camera paths per
LOD and the zoom sweep as page functions the driver starts by `eval` and
awaits; the frame buffer read back — rAF intervals and draw times. "No frame
over 33 ms on this machine" is a REGRESSION GUARD, never a commodity claim:
the machine is named in the report and the guard's bound is written here.
The display's refresh is measured first, as S3 did. THE FRAME ORDER (law
13): no frame of any phase — the sweep crossing the mount threshold both
ways, the orbits bringing documents in and out of view — draws a document's
label or a bar under its own standing text (`both`), or yields a line of a
document to text that does not stand, an empty place (`neither`). THE TILED
ZOOM (issue #122's design decision: "measure the frame time while zooming
across a view tiled with readable documents"): the window set as large as a
6K display at its own scale, the plane parked at the far band first so the
page reads nothing as it grows, the sweep from em 6 to em 14 and back over
the claimant's first grid of documents — centred across on its middle
document's first column, that row's outlines at the view's top at the
readable em so the row after it stands in view too — where the documents in
view at the readable em outnumber the text layer's limit on a frame's new
mounts (the phase checks it): no frame draws a bar for a document at the readable em
(`barred` — bars mean only "too small to read"), none draws text over its own
bars or yields a line to none, and the guard holds; the figures name the
frame and draw times, the articles and lines standing, the new mounts a frame
made, the mounts' cost, and one reveal over the tiled view at em 12, which
sets every standing article again in one frame. The window, the camera and
the reveal are put back after it."""
import json

from . import DOC, Result

PHASE_MS = 2500
# the guard: how many frames over 33.34 ms a phase may show on the gate machine before the case fails
MAX_OVER_33 = 2
# the tiled zoom's window, a 6K display at its own scale, and the ems its sweep runs between
TILED_WINDOW = (6016, 3384)
TILED_FROM_EM, TILED_TO_EM, TILED_REVEAL_EM = 6, 14, 12
# the document at the middle of the claimant's first grid, whose first column the tiled zoom centres across on, and how far
# below the view's top its row's outlines stand at the readable em, so the row after it stands in view too
TILED_CENTRE, TILED_TOP_PX = '1.0.1.0.25', 20
# the readable em: a document at it or above stands as text (P-LOD's LOD_TXT_LO), held apart from the page's
READABLE_EM = 8

# a summary's figures as the report names them
KEEP = ('frames', 'frame_p50', 'frame_p95', 'frame_p99', 'draw_p50', 'draw_p99', 'frames_over_33ms', 'worst_frame_ms', 'max_both', 'max_neither', 'max_barred',
        'max_standing', 'max_lines', 'max_mounted', 'mounted')


def readable_in_view(ctx):
    """the documents whose outline meets the viewport with their text arrived, and their em at the camera as it stands"""
    return ctx.js('''(() => { const S = window.__skep, c = S.view.camera(), p = S.view.viewport();
      return S.model.places().filter((q) => { if (q.system) return false; const b = S.fold(q.doc).outline;
          const x = (b.x - c.x) * c.scale + p.VW / 2, y = (b.y - c.y) * c.scale + p.VH / 2;
          return x < p.VW && x + b.w * c.scale > 0 && y < p.VH && y + b.h * c.scale > 0; })
        .map((q) => ({doc: q.doc, from: S.model.doc(q.doc).from, em: c.scale * S.fold(q.doc).fs})).filter((q) => q.from >= 0); })()''')


def mount_costs(ctx, since):
    """the mounts the text layer logged after the `since`-th: their count and the p50 and p99 of their cost, in ms"""
    return ctx.js('''((since) => { const m = window.__skep.mounts().slice(since).map((x) => x.ms).sort((a, b) => a - b);
      const p = (q) => m.length ? Math.round(m[Math.min(m.length - 1, Math.floor(q * m.length))] * 100) / 100 : null;
      return {count: m.length, p50: p(0.5), p99: p(0.99), max: m.length ? Math.round(m[m.length - 1] * 100) / 100 : null}; })(%d)''' % since)


def tiled(ctx, r):
    """THE TILED ZOOM (see the head): its checks, and its figures"""
    out = {}
    cam0, box = ctx.camera(), ctx.js('window.__skep.boxOf(%s)' % json.dumps(TILED_CENTRE))
    k = ctx.js('window.__skep.constants')
    # the plane parked at the far band — a document's box half the band's lower edge wide — where the view reads nothing
    ctx.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] / 2, k['LOD_FAR_LO'] / 2 / k['DOC_W'])
    was = ctx.resize(*TILED_WINDOW)
    try:
        scale = lambda em: em / k['STANDARD_FS']
        # centred across on the middle document's first column, its row's outlines TILED_TOP_PX below the view's top at the
        # readable em, so the row after it stands in view too
        first, outline = ctx.js('window.__skep.centreOf(%s, null)' % json.dumps(TILED_CENTRE)), ctx.js('window.__skep.fold(%s).outline' % json.dumps(TILED_CENTRE))
        at = {'x': first['x'], 'y': outline['y'] + (TILED_WINDOW[1] / 2 - TILED_TOP_PX) / scale(READABLE_EM)}
        # the texts in view read at the sweep's widest view, and at the readable em
        ctx.set_view(at['x'], at['y'], scale(TILED_FROM_EM))
        ctx.settle(60)
        ctx.set_view(at['x'], at['y'], scale(READABLE_EM))
        ctx.settle(60)
        seen = readable_in_view(ctx)
        readable = [q for q in seen if q['em'] >= READABLE_EM]
        r.check(len(readable) > k['MOUNTS_PER_FRAME'], f'the tiled view at em {READABLE_EM}: the documents in view at the readable em, their text arrived, outnumber the text layer\'s limit on a frame\'s new mounts ({k["MOUNTS_PER_FRAME"]})',
                {'readable': len(readable), 'in_view': len(seen), 'window': list(TILED_WINDOW)})
        out['readable_in_view'] = len(readable)
        ctx.set_view(at['x'], at['y'], scale(TILED_FROM_EM))
        ctx.settle(60)
        since = len(ctx.js('window.__skep.mounts()'))
        summary = ctx.js('window.__skep.runPath("tiled-zoom", %d, %s)' % (PHASE_MS, json.dumps({'kind': 'sweep', 'from': scale(TILED_FROM_EM), 'to': scale(TILED_TO_EM), 'centre': at})))
        ctx.settle()
        out['sweep'] = {key: summary.get(key) for key in KEEP}
        out['mounts'] = mount_costs(ctx, since)
        r.check(summary['frames'] > 20, 'tiled-zoom: the phase drew frames', summary['frames'])
        r.check(summary['max_barred'] == 0, f'tiled-zoom: no frame drew a bar for a document at the readable em — bars mean only "too small to read" (issue #122)', {'max_barred': summary['max_barred']})
        r.check(summary['max_both'] == 0 and summary['max_neither'] == 0, 'tiled-zoom: no frame drew a document\'s label or a bar over its own standing text, or yielded a line of one to text that does not stand',
                {'both': summary['max_both'], 'neither': summary['max_neither']})
        r.check(summary['frames_over_33ms'] <= MAX_OVER_33, f'tiled-zoom: frames over 33 ms within the guard ({MAX_OVER_33}) on this machine',
                {'over': summary['frames_over_33ms'], 'worst_ms': summary['worst_frame_ms'], 'p99': summary['frame_p99'], 'mounts': out['mounts']})
        # one reveal over the tiled view: every standing article set again in the one frame
        ctx.set_view(at['x'], at['y'], scale(TILED_REVEAL_EM))
        ctx.settle(60)
        standing = ctx.js('window.__skep.mountedAddrs()')
        doc = standing[0] if standing else None
        if doc:
            since = len(ctx.js('window.__skep.mounts()'))
            t0 = ctx.js('(() => { const t = performance.now(); window.__skep.links.reveal(%s, 2); return t; })()' % json.dumps(doc))
            ctx.frames(4)
            after = ctx.js('window.__skep.frames().filter((f) => f.t >= %s).slice(0, 3)' % t0)
            out['reveal'] = {'doc': doc, 'standing': len(standing), 'frames': after, 'mounts': mount_costs(ctx, since)}
            ctx.js('window.__skep.links.hide(%s)' % json.dumps(doc))
            ctx.frames(3)
        r.check(bool(doc), f'the tiled view at em {TILED_REVEAL_EM}: articles stand, for the reveal\'s figures', {'standing': standing})
        # the plane parked at the far band again before the window is put back
        ctx.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] / 2, k['LOD_FAR_LO'] / 2 / k['DOC_W'])
    finally:
        ctx.resize(*was)
        ctx.set_view(cam0['x'], cam0['y'], cam0['scale'])
    out['window'] = list(TILED_WINDOW)
    return out


def run(ctx):
    r = Result()
    refresh = ctx.js('window.__skep.refresh()')
    r.figures['refresh_hz_measured'] = refresh
    ctx.shared['refresh_hz'] = refresh
    box = ctx.js('window.__skep.boxOf(%s)' % json.dumps(DOC))
    centre = {'x': box['x'] + box['w'] / 2, 'y': box['y'] + box['h'] / 2}
    far = ctx.js('window.__skep.scaleFor(%s, "doc", 5)' % json.dumps(DOC))
    mid = ctx.js('window.__skep.scaleFor(%s, "doc", 120)' % json.dumps(DOC))
    near = ctx.js('window.__skep.scaleFor(%s, "em", 12.5)' % json.dumps(DOC))
    phases = [
        ('far-orbit', {'kind': 'orbit', 'scale': far, 'ax': 0.45, 'by': 0.45, 'centre': centre}),
        ('mid-orbit', {'kind': 'orbit', 'scale': mid, 'ax': 0.45, 'by': 0.45, 'centre': centre}),
        ('near-orbit', {'kind': 'orbit', 'scale': near, 'ax': 0.3, 'by': 0.3, 'centre': centre}),
        ('zoom-sweep', {'kind': 'sweep', 'from': far, 'to': near, 'centre': centre}),
    ]
    out = {}
    for name, spec in phases:
        # settle the reads at the phase's scale first, so the phase measures drawing and not the first fetch
        ctx.set_view(centre['x'], centre['y'], spec.get('scale', spec.get('from')))
        ctx.settle()
        summary = ctx.js('window.__skep.runPath(%s, %d, %s)' % (json.dumps(name), PHASE_MS, json.dumps(spec)))
        ctx.settle()
        out[name] = summary
        r.check(summary['frames'] > 20, f'{name}: the phase drew frames', summary['frames'])
        r.check(summary['frames_over_33ms'] <= MAX_OVER_33, f'{name}: frames over 33 ms within the guard ({MAX_OVER_33}) on this machine', {'over': summary['frames_over_33ms'], 'worst_ms': summary['worst_frame_ms'], 'p99': summary['frame_p99']})
        r.check(summary['max_both'] == 0 and summary['max_neither'] == 0, f'{name}: no frame drew a document\'s label or a bar over its own standing text, or yielded a line of one to text that does not stand', {'both': summary['max_both'], 'neither': summary['max_neither']})
        r.check(summary['max_barred'] == 0, f'{name}: no frame drew a bar for a document at the readable em (issue #122)', {'max_barred': summary['max_barred']})
    r.figures['phases'] = out
    r.figures['guard_max_over_33'] = MAX_OVER_33
    r.figures['mounts'] = ctx.js('(() => { const m = window.__skep.mounts().map(x => x.ms).sort((a, b) => a - b); const p = q => m.length ? m[Math.min(m.length - 1, Math.floor(q * m.length))] : null; return {count: m.length, p50: p(0.5), p99: p(0.99), max: m.length ? m[m.length - 1] : null}; })()')
    r.figures['tiled'] = tiled(ctx, r)
    r.note('the figures are this machine\'s under headless Chrome; the frame intervals are rAF\'s on the display\'s measured refresh')
    return r.out()
