"""LAYOUT — class 4 (the structure record §6.3; T3 (4); M2, M6): registration
drift 0 px at the four zoom levels S1 used (em 9, 12, 18, 30 — the article's
box against the camera-projected origin), containment (no two mounted
articles intersect; every block lies inside the clip the page draws — the
article's own rect is its box by construction and proves nothing), the
corner (foundations §3.1: every mounted document at reading scale carries
one beside its article, clipped by no box of the page and reaching into no
other document's box, mounted or only drawn; the first edition's in view
below the one line at each level, held there while the document's top has
risen past the line, and never below the document's box as its bottom
rises), and every beam leaving the text at its span's own line (its
endpoint on one of its marked words' line rects, between the words' end and
the article's edge — foundations §2.1; S1 Q1). THE HANDOFF (law 8;
foundations §2.4: the bars become text and no line moves; S1 Q7): at each
level, and at the mount threshold reached from below (em 6 → 6.6) and from
above (em 7 → 6), every block of every mounted article whose top lies
inside its clip stands on the canvas's own bars for it — its top within
HANDOFF_TOL_PX of its bars' first line, and as many lines; a withheld run's
face and the blocks after it are left out, its height at reading scale the
design's open question (F2.1-i: the bars take its true width). THE FRAME
ORDER (law 13): the frames each step across the mount threshold draws show
no document both as bars under its own mounted text and none yielded to
text that is not mounted. The measuring code is the page's (`driftSample`,
`overlapCheck`, `beamAnchors`, `visible`, `barsOf`, the frame buffer); the
thresholds are here. The block containment and anchor checks are marked
with the page issues they wait on and count as expected while those
stand."""
import json

from . import DOC, WINDOW, XFAIL_ANCHOR, XFAIL_CLIP, Result

LEVELS_EM = [9, 12, 18, 30]
DRIFT_TOL_PX = 0.5
ANCHOR_TOL_PX = 0.5
HANDOFF_TOL_PX = 1.0
CORNER = '#corners [data-corner="%s"]' % DOC


def corner_of(ctx):
    """the first edition's corner as the page shows it (the `visible` oracle), the one line's bottom, and the box's top and bottom on screen"""
    return ctx.js('''(() => { const S = window.__skep, v = S.visible(%s), b = S.boxOf(%s), c = S.view.camera(), p = S.view.viewport();
      return {corner: v.length === 1 ? v[0] : null, n: v.length, line: document.getElementById('line').getBoundingClientRect().bottom,
              top: (b.y - c.y) * c.scale + p.VH / 2, bottom: (b.y + b.h - c.y) * c.scale + p.VH / 2}; })()''' % (json.dumps(CORNER), json.dumps(DOC)))


def on_own_line(a):
    """does the beam's endpoint lie on one of its words' line rects, between the words' end and the article's edge?"""
    edge = a['edge'] if a['edge'] is not None else 0
    return any(w['y'] - ANCHOR_TOL_PX <= a['y'] <= w['y'] + w['h'] + ANCHOR_TOL_PX and w['x'] + w['w'] - ANCHOR_TOL_PX <= a['x'] <= edge + ANCHOR_TOL_PX for w in a['words'])


def handoff(ctx):
    """every mounted article's blocks against the canvas's own bars for them (`barsOf`): the blocks whose top lies
    inside the article's clip, a withheld run's face and the blocks after it left out; the ones off their bars named"""
    compared, off, left_out = 0, [], 0
    for addr in ctx.js('window.__skep.mountedAddrs()'):
        h = ctx.js('window.__skep.barsOf(%s)' % json.dumps(addr))
        if not h or h['text'] is None:
            continue
        bars = {b['pos']: b for b in h['bars']}
        past = False
        for t in h['text']:
            past = past or t['withheld']
            if past:
                left_out += 1
                continue
            if t['top'] >= h['clip'] or t['lines'] == 0:
                continue
            compared += 1
            b = bars.get(t['pos'])
            if b is None or b['top'] is None or abs(b['top'] - t['top']) > HANDOFF_TOL_PX or b['lines'] != t['lines']:
                off.append({'addr': addr, 'pos': t['pos'], 'text_top': t['top'], 'bars_top': b and b['top'], 'text_lines': t['lines'], 'bars_lines': b and b['lines'], 'line_px': h['line_px']})
    return {'compared': compared, 'off': off, 'left_out': left_out}


def step(ctx, em):
    """the camera over the first edition at an em, and what the frames that step drew show: the most documents any of
    them drew as bars under their own mounted text (`both`), and yielded to text that was not mounted (`neither`)"""
    t0 = ctx.js('performance.now()')
    ctx.view_doc_em(DOC, em)
    f = ctx.js('window.__skep.frames().filter(f => f.t >= %s).map(f => [f.both, f.neither])' % t0)
    return {'em': em, 'frames': len(f), 'both': max((x[0] for x in f), default=0), 'neither': max((x[1] for x in f), default=0)}


def run(ctx):
    r = Result()
    ctx.leap(DOC, WINDOW[0])
    drift = {}
    for em in LEVELS_EM:
        ctx.view_doc_em(DOC, em)
        sample = ctx.js('window.__skep.driftSample(%s)' % json.dumps('em%d' % em))
        mine = [s for s in sample if s['addr'] == DOC]
        r.check(len(mine) == 1, f'em {em}: the first edition is mounted', [s['addr'] for s in sample])
        worst = max((max(abs(s['dx']), abs(s['dy']), s.get('span_dx', 0), s.get('span_dy', 0)) for s in sample), default=None)
        r.check(worst is not None and worst <= DRIFT_TOL_PX, f'em {em}: registration drift {DRIFT_TOL_PX} px or less for every mounted article — its box against the projected origin, and every span\'s line against its laid-out place', sample)
        ov = ctx.js('window.__skep.overlapCheck()')
        r.check(ov['intersecting_pairs'] == 0, f'em {em}: containment — no two mounted articles intersect', ov['intersecting_pairs'])
        r.check(not ov['blocks_cut'], f'em {em}: containment — every block of every mounted article lies inside its clip; none is cut at the box\'s edge', {'blocks_cut': ov['blocks_cut'][:6], 'worst_overflow_px': ov['worst_overflow_px']}, xfail=XFAIL_CLIP)
        r.check(not ov['corners_missing'], f'em {em}: every mounted article at reading scale carries its corner beside it', ov['corners_missing'])
        r.check(not ov['corners_clipped'], f'em {em}: no corner is clipped by a box of the page — it stands beside its article, outside the box that clips the text', ov['corners_clipped'])
        r.check(not ov['corners_into'], f'em {em}: no corner reaches into another document\'s box, mounted or only drawn', ov['corners_into'][:6])
        c = corner_of(ctx)
        shown = c['corner'] is not None and c['corner']['inClip'] and c['corner']['inView'] and c['corner']['rect']['y'] >= c['line'] - 0.5
        r.check(shown, f'em {em}: the first edition\'s corner is in view, below the one line', c)
        ho = handoff(ctx)
        r.check(ho['compared'] > 0 and not ho['off'], f'em {em}: the handoff — every block of every mounted article stands on the canvas\'s bars for it: its top within {HANDOFF_TOL_PX} px of its bars\' first line, and as many lines', {'compared': ho['compared'], 'off': ho['off'][:6]})
        drift['em%d' % em] = {'samples': sample, 'worst_px': worst, 'containment': ov, 'em_px_measured': mine[0]['em_px'] if mine else None, 'corner': c['corner'] and c['corner']['rect'], 'handoff': {'compared': ho['compared'], 'off': len(ho['off']), 'left_out': ho['left_out']}}
    r.figures['drift'] = drift
    # the corner holds to the top of the document's visible part (foundations §3.1): the box's top risen past the one
    # line, the corner stands just below the line; the box's bottom risen near it, the corner rises with the bottom
    box = ctx.js('window.__skep.boxOf(%s)' % json.dumps(DOC))
    s14 = ctx.js('window.__skep.scaleFor(%s, "em", 14)' % json.dumps(DOC))
    ctx.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] * 0.7, s14)
    held = corner_of(ctx)
    r.check(held['top'] < held['line'] and held['corner'] is not None and held['corner']['inView'] and held['line'] <= held['corner']['rect']['y'] <= held['line'] + 16,
            'the box\'s top above the one line: the corner holds just below the line, in view', held)
    vp = ctx.js('window.__skep.view.viewport()')
    ctx.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] - (150 - vp['VH'] / 2) / s14, s14)
    rising = corner_of(ctx)
    rc = rising['corner']
    r.check(rc is not None and abs(rc['rect']['y'] + rc['rect']['h'] - rising['bottom']) <= 1, 'the box\'s bottom risen to 150 px: the corner rises with it, its bottom at the box\'s, never past it', rising)
    r.figures['corner_held'] = {'held': held['corner'] and held['corner']['rect'], 'line': held['line'], 'rising': rc and rc['rect'], 'box_bottom': rising['bottom']}
    # a continuous zoom: drift sampled across a sweep
    box = ctx.js('window.__skep.boxOf(%s)' % json.dumps(DOC))
    s_lo = ctx.js('window.__skep.scaleFor(%s, "em", 7)' % json.dumps(DOC))
    s_hi = ctx.js('window.__skep.scaleFor(%s, "em", 28)' % json.dumps(DOC))
    sweep = ctx.js('''(async () => {
      const out = []; const S = window.__skep; const x = %s, y = %s;
      for (let i = 0; i <= 40; i++) { const u = i / 40; const scale = Math.exp(Math.log(%s) + (Math.log(%s) - Math.log(%s)) * u); S.view.set({x, y, scale}); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); for (const s of S.driftSample('sweep')) out.push({scale: s.scale, dx: s.dx, dy: s.dy, span_dx: s.span_dx, span_dy: s.span_dy, em: s.em_px}); }
      return out; })()''' % (box['x'] + box['w'] / 2, box['y'] + box['h'] * 0.3, s_lo, s_hi, s_lo))
    worst_sweep = max((max(abs(s['dx']), abs(s['dy']), s.get('span_dx', 0), s.get('span_dy', 0)) for s in sweep), default=0)
    r.check(worst_sweep <= DRIFT_TOL_PX, 'continuous zoom: drift within tolerance across the sweep', {'samples': len(sweep), 'worst_px': worst_sweep})
    r.figures['sweep'] = {'samples': len(sweep), 'worst_px': worst_sweep}
    # the beams: stage 3 at the first edition, every endpoint inside its anchor rect
    ctx.view_doc_em(DOC, 12.5)
    ctx.js('window.__skep.links.reveal(%s, 3)' % json.dumps(DOC))
    ctx.settle()
    ctx.frames(3)
    anchors = ctx.js('window.__skep.beamAnchors()')
    r.check(len(anchors) >= 1, 'beams are built at stage 3', len(anchors))
    r.check(all(a['words'] for a in anchors), 'every drawn beam\'s link is marked at its words in the mounted article (the oracle\'s rects exist)', [a['link'] for a in anchors if not a['words']])
    off = [{'link': a['link'], 'pos': a['pos'], 'x': a['x'], 'y': a['y'], 'edge': a['edge'], 'words': a['words']} for a in anchors if not on_own_line(a)]
    r.check(not off, f'every beam leaves the text at its span\'s own line: its endpoint\'s y within one of its words\' line rects and its x between the words\' end and the article\'s edge, {ANCHOR_TOL_PX} px either way', off[:4], xfail=XFAIL_ANCHOR)
    r.figures['beams'] = {'count': len(anchors), 'stubs': sum(1 for a in anchors if a['stub']), 'far': sorted({a['far'] for a in anchors})[:8], 'on_own_line': len(anchors) - len(off), 'off_own_line': len(off)}
    ctx.js('window.__skep.links.hide(%s)' % json.dumps(DOC))
    ctx.frames(2)
    r.check(ctx.js('window.__skep.beams()') == 0, 'hidden again: no beams')
    # the mount thresholds: mounted at em 6.5 and above, unmounted below 5.5; at each step the frames it drew drew no
    # document both as bars and as text, nor left one yielded and unmounted; where the article stands just mounted, it
    # stands on its bars
    steps = []
    def crossed(em, how):
        s = step(ctx, em)
        steps.append(dict(s, how=how))
        r.check(s['frames'] > 0 and s['both'] == 0 and s['neither'] == 0, f'em {em} ({how}): no frame of the step drew a document\'s bars under its own mounted text, or left a document yielded to text that is not mounted', s)
    crossed(7, 'from above')
    r.check(DOC in ctx.js('window.__skep.mountedAddrs()'), 'em 7: the article is mounted (above the 6.5 threshold)')
    crossed(6, 'from above')
    r.check(DOC in ctx.js('window.__skep.mountedAddrs()'), 'em 6 from above: still mounted (hysteresis)')
    ho = handoff(ctx)
    r.check(ho['compared'] > 0 and not ho['off'], 'em 6 from above: the handoff — every block of every mounted article stands on its bars', {'compared': ho['compared'], 'off': ho['off'][:6]})
    crossed(5, 'from above')
    r.check(DOC not in ctx.js('window.__skep.mountedAddrs()'), 'em 5: the article is unmounted (below the 5.5 hysteresis)')
    crossed(6, 'from below')
    r.check(DOC not in ctx.js('window.__skep.mountedAddrs()'), 'em 6 from below: not yet mounted (hysteresis)')
    crossed(6.6, 'from below')
    r.check(DOC in ctx.js('window.__skep.mountedAddrs()'), 'em 6.6 from below: mounted (above the 6.5 threshold)')
    ho = handoff(ctx)
    r.check(ho['compared'] > 0 and not ho['off'], 'em 6.6 from below: the handoff — every block of every mounted article stands on its bars', {'compared': ho['compared'], 'off': ho['off'][:6]})
    crossed(12.5, 'from below')
    r.check(DOC in ctx.js('window.__skep.mountedAddrs()'), 'em 12.5: mounted')
    r.figures['mount_steps'] = steps
    cap = ctx.js('window.__skep.constants')
    r.figures['constants'] = cap
    # the projection's places: no two indexed documents of the account share a box (reading order seeded by the prefix — M2's site)
    boxes = ctx.js('window.__skep.model.places().filter(p => !p.system).slice(0, 120).map(p => [p.doc, window.__skep.boxOf(p.doc)])')
    pairs = 0
    for i in range(len(boxes)):
        for j in range(i + 1, len(boxes)):
            a, b = boxes[i][1], boxes[j][1]
            if a.get('residue') or b.get('residue'):
                continue
            if a['x'] < b['x'] + b['w'] and b['x'] < a['x'] + a['w'] and a['y'] < b['y'] + b['h'] and b['y'] < a['y'] + a['h']:
                pairs += 1
    r.check(pairs == 0, 'no two indexed documents share a box (the first 120 places; the residue cell apart)', pairs)
    cell = ctx.js('window.__skep.accountCell("1.0.1")')
    outside = [d for d, b in boxes if d.startswith('1.0.1.0.') and not (b['x'] >= cell['x'] - 1e-6 and b['y'] >= cell['y'] - 1e-6 and b['x'] + b['w'] <= cell['x'] + cell['w'] + 1e-6 and b['y'] + b['h'] <= cell['y'] + cell['h'] + 1e-6)]
    r.check(not outside, 'every document box lies inside its account\'s cell', outside[:5])
    r.figures['boxes_checked'] = len(boxes)
    # reading order (foundations §2.1): the first seven documents of an account share the first row, the eighth starts the next; document 1 is in the first column
    row = [ctx.js('window.__skep.boxOf(%s)' % json.dumps('1.0.1.0.%d' % k)) for k in range(1, 9)]
    eps = 1e-6
    r.check(all(abs(row[k]['y'] - row[0]['y']) < eps for k in range(1, 7)), 'documents 1–7 lie along the first row of their account\'s grid', [round(b['y']) for b in row[:7]])
    r.check(all(row[k]['x'] > row[k - 1]['x'] for k in range(1, 7)), 'documents 1–7 advance along the row', [round(b['x']) for b in row[:7]])
    r.check(abs(row[7]['x'] - row[0]['x']) < eps and row[7]['y'] > row[0]['y'], 'document 8 starts the second row under document 1', {'d1': (round(row[0]['x']), round(row[0]['y'])), 'd8': (round(row[7]['x']), round(row[7]['y']))})
    r.check(row[0]['x'] < cell['x'] + cell['w'] / 7 and row[0]['y'] < cell['y'] + cell['h'] / 7, 'document 1 lies in the first cell of the grid', {'d1': (round(row[0]['x']), round(row[0]['y'])), 'cell': (round(cell['x']), round(cell['y']))})
    ctx.leap(DOC, WINDOW[0])
    return r.out()
