"""LAYOUT — class 4 (the structure record §6.3; T3 (4); M2, M6): registration
drift 0 px at the four zoom levels S1 used (em 9, 12, 18, 30 — the article's
box against the camera-projected origin), containment (no two mounted
articles intersect; every block and the corner of each lie inside the clip
the page draws — the article's own rect is its box by construction and
proves nothing), and every beam leaving the text at its span's own line (its
endpoint on one of its marked words' line rects, between the words' end and
the article's edge — foundations §2.1; S1 Q1). The measuring code is the
page's (`driftSample`, `overlapCheck`, `beamAnchors`); the thresholds are
here. The containment and anchor checks are marked with the page issues they
wait on and count as expected while those stand."""
import json

from . import DOC, WINDOW, XFAIL_ANCHOR, XFAIL_CLIP, Result

LEVELS_EM = [9, 12, 18, 30]
DRIFT_TOL_PX = 0.5
ANCHOR_TOL_PX = 0.5


def on_own_line(a):
    """does the beam's endpoint lie on one of its words' line rects, between the words' end and the article's edge?"""
    edge = a['edge'] if a['edge'] is not None else 0
    return any(w['y'] - ANCHOR_TOL_PX <= a['y'] <= w['y'] + w['h'] + ANCHOR_TOL_PX and w['x'] + w['w'] - ANCHOR_TOL_PX <= a['x'] <= edge + ANCHOR_TOL_PX for w in a['words'])


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
        r.check(not ov['corners_clipped'], f'em {em}: containment — the corner of every mounted article is unclipped', ov['corners_clipped'], xfail=XFAIL_CLIP)
        drift['em%d' % em] = {'samples': sample, 'worst_px': worst, 'containment': ov, 'em_px_measured': mine[0]['em_px'] if mine else None}
    r.figures['drift'] = drift
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
    # the mount thresholds: mounted at em 6.5 and above, unmounted below 5.5
    ctx.view_doc_em(DOC, 7)
    r.check(DOC in ctx.js('window.__skep.mountedAddrs()'), 'em 7: the article is mounted (above the 6.5 threshold)')
    ctx.view_doc_em(DOC, 5)
    r.check(DOC not in ctx.js('window.__skep.mountedAddrs()'), 'em 5: the article is unmounted (below the 5.5 hysteresis)')
    ctx.view_doc_em(DOC, 6)
    r.check(DOC not in ctx.js('window.__skep.mountedAddrs()'), 'em 6 from below: not yet mounted (hysteresis)')
    ctx.view_doc_em(DOC, 12.5)
    r.check(DOC in ctx.js('window.__skep.mountedAddrs()'), 'em 12.5: mounted')
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
