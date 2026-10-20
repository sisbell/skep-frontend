"""FRAMES — class 6 (the structure record §6.3; T3 (6)): S3's camera paths per
LOD and the zoom sweep as page functions the driver starts by `eval` and
awaits; the frame buffer read back — rAF intervals and draw times. "No frame
over 33 ms on this machine" is a REGRESSION GUARD, never a commodity claim:
the machine is named in the report and the guard's bound is written here.
The display's refresh is measured first, as S3 did. THE FRAME ORDER (law
13): no frame of any phase — the sweep crossing the mount threshold both
ways, the orbits bringing documents in and out of view — draws a document's
label or bars under its own mounted text (`both`), or yields a document to
text that is not mounted, an empty box (`neither`)."""
import json

from . import DOC, Result

PHASE_MS = 2500
# the guard: how many frames over 33.34 ms a phase may show on the gate machine before the case fails
MAX_OVER_33 = 2


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
        r.check(summary['max_both'] == 0 and summary['max_neither'] == 0, f'{name}: no frame drew a document\'s bars under its own mounted text, or left a document yielded to text that is not mounted', {'both': summary['max_both'], 'neither': summary['max_neither']})
    r.figures['phases'] = out
    r.figures['guard_max_over_33'] = MAX_OVER_33
    r.figures['mounts'] = ctx.js('(() => { const m = window.__skep.mounts().map(x => x.ms).sort((a, b) => a - b); const p = q => m.length ? m[Math.min(m.length - 1, Math.floor(q * m.length))] : null; return {count: m.length, p50: p(0.5), p99: p(0.99), max: m.length ? m[m.length - 1] : null}; })()')
    r.note('the figures are this machine\'s under headless Chrome; the frame intervals are rAF\'s on the display\'s measured refresh')
    return r.out()
