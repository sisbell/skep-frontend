#!/usr/bin/env python3
"""The gate's report (the structure record §6.1; FP-18: the report says which
machine): the tables per class and the figures, written to
`results/report.md` and printed. Grown from spikes/s3/report.py and
s11/report.py. Reads `results/*.json` as `drive.py` wrote them."""
import glob
import json
import os
import platform
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESULTS = os.path.join(ROOT, 'results')


def sh(cmd):
    try:
        return subprocess.run(cmd, capture_output=True, text=True, timeout=20).stdout.strip()
    except Exception as e:
        return f'(unavailable: {e})'


def load():
    out = {}
    for p in sorted(glob.glob(os.path.join(RESULTS, '*.json'))):
        name = os.path.basename(p)[:-5]
        with open(p) as f:
            out[name] = json.load(f)
    return out


def fmt(v):
    if isinstance(v, float):
        return f'{v:.2f}'
    return str(v)


def table(rows, head):
    lines = ['| ' + ' | '.join(head) + ' |', '|' + '|'.join('---' for _ in head) + '|']
    for row in rows:
        lines.append('| ' + ' | '.join(fmt(x).replace('|', '\\|') for x in row) + ' |')
    return '\n'.join(lines)


def main():
    res = load()
    env = res.pop('env', {})
    cases = {k: v for k, v in res.items() if isinstance(v, dict) and 'pass' in v}
    machine = {
        'sw_vers': ' '.join(sh(['sw_vers', '-productName']).split() + sh(['sw_vers', '-productVersion']).split()) or platform.platform(),
        'model': sh(['sysctl', '-n', 'hw.model']),
        'cpu': sh(['sysctl', '-n', 'machdep.cpu.brand_string']),
        'memory_gb': round(int(sh(['sysctl', '-n', 'hw.memsize']) or 0) / 2**30, 1) if sh(['sysctl', '-n', 'hw.memsize']).isdigit() else '?',
        'chrome': env.get('chrome'),
        'node': sh(['node', '--version']), 'npm': sh(['npm', '--version']), 'python': platform.python_version(),
        'typescript': sh(['npx', 'tsc', '--version']),
        'refresh_hz_measured': (cases.get('frames', {}).get('figures') or {}).get('refresh_hz_measured'),
    }
    L = []
    L.append('# The gate\'s report — the read path on the plane\n')
    L.append(f"Run {env.get('started')} → {env.get('finished')}; page `{env.get('page')}`; provider `{env.get('provider')}`; board `{env.get('board')}`.\n")
    L.append('## The machine\n')
    L.append(table([[k, v] for k, v in machine.items()], ['what', 'value']))
    L.append('\nEvery figure below is this machine\'s under headless Chrome; none is a commodity claim.\n')
    L.append('## The board\n')
    h0, h1 = env.get('health_start') or {}, env.get('health_end') or {}
    L.append(table([
        ['log_position at start', h0.get('log_position')], ['log_position at end', h1.get('log_position')],
        ['equal', h0.get('log_position') == h1.get('log_position')], ['claimant', (h0.get('auth') or {}).get('claimant')],
        ['local_trust', (h0.get('auth') or {}).get('local_trust')], ['chain_head', h0.get('chain_head')], ['writes halted', (h0.get('writes') or {}).get('halted')],
    ], ['what', 'value']))
    L.append('\n## The fence — the cases\n')
    rows = [[name, 'PASS' if c['pass'] else 'FAIL', c.get('checks'), len(c.get('failures') or []), len(c.get('expected') or []), c.get('seconds')] for name, c in cases.items()]
    L.append(table(rows, ['case', 'result', 'checks', 'failures', 'expected', 'seconds']))
    fails = [(n, f) for n, c in cases.items() for f in (c.get('failures') or [])]
    if fails:
        L.append('\n### Failures\n')
        for n, f in fails:
            L.append(f"- **{n}**: {f.get('what')} — `{json.dumps(f.get('detail'), default=str)[:400]}`")
    errs = [(n, c.get('error')) for n, c in cases.items() if c.get('error')]
    for n, e in errs:
        L.append(f"- **{n}** threw: `{e}`")
    expected = [(n, x) for n, c in cases.items() for x in (c.get('expected') or [])]
    if expected:
        L.append('\n### Expected failures — marked checks waiting on a page issue; each mark comes off the day its check passes\n')
        for n, x in expected:
            L.append(f"- **{n}**: {x.get('what')} — waits on: {x.get('xfail')} — `{json.dumps(x.get('detail'), default=str)[:300]}`")
    L.append(f"\nPage exceptions during the run: {len(env.get('exceptions') or [])}; first settle {env.get('first_settle_s')} s; boot `{json.dumps(env.get('boot'), default=str)[:300]}`\n")
    # the figures
    w = (cases.get('wire') or {}).get('figures') or {}
    if w:
        L.append('## Class 5 — the wire\n')
        co = w.get('cold_open') or {}
        L.append(table([
            ['cold open calls', ' → '.join(co.get('calls') or [])], ['cold open bytes (in+out, the page\'s)', co.get('bytes')], ['cold open ms (the page\'s)', co.get('ms')],
            ['places answer bytes', co.get('places_bytes')], ['places docs', co.get('places_docs')], ['deepest document depth', co.get('deepest_depth')],
            ['provider dials for the cold open', json.dumps((co.get('provider') or {}).get('dials'))], ['provider dial bytes in/out', f"{(co.get('provider') or {}).get('dial_bytes_in')} / {(co.get('provider') or {}).get('dial_bytes_out')}"],
            ['HOME settled: page calls', json.dumps((w.get('home_settled') or {}).get('page_calls'))], ['HOME settled: ops', json.dumps((w.get('home_settled') or {}).get('ops'))],
            ['HOME settled: bytes in/out', f"{(w.get('home_settled') or {}).get('bytes_in')} / {(w.get('home_settled') or {}).get('bytes_out')}"],
        ], ['what', 'value']))
        cw = w.get('camera_window') or {}
        L.append('\nThe camera-only window (an orbit at mid scale, 2.5 s): ledger before `%s`, after `%s`; page calls `%s`; ops `%s`; bytes in/out %s / %s; frames %s.\n' % (
            json.dumps(cw.get('ledger_before')), json.dumps(cw.get('ledger_after')), json.dumps(cw.get('page_calls')), json.dumps(cw.get('ops')), cw.get('bytes_in'), cw.get('bytes_out'), json.dumps(cw.get('frames'))))
        lp = w.get('leap') or {}
        L.append(table([[k, json.dumps(v) if isinstance(v, (dict, list)) else v] for k, v in lp.items()], ['a LEAP to ' + str(lp.get('target')), 'value']))
        L.append('\nDials of the whole run: `%s`. log_position: `%s`. Refusals met: `%s`.\n' % (json.dumps(w.get('dials_whole_run')), json.dumps(w.get('log_position')), json.dumps(w.get('refusals_met'), default=str)[:600]))
        L.append('FP-15 replay over the fake port: `%s`.\n' % json.dumps(w.get('replay')))
        L.append('### Browser claims (the record §10 items 16–21)\n')
        L.append('```\n' + json.dumps(w.get('browser_claims'), indent=1, default=str) + '\n```\n')
        L.append('close(session) at unload: `%s`\n' % json.dumps(env.get('close_at_unload')))
    f = (cases.get('frames') or {}).get('figures') or {}
    if f.get('phases'):
        L.append('## Class 6 — frames\n')
        rows = [[n, p['frames'], p['fps_median'], p['frame_p50'], p['frame_p95'], p['frame_p99'], p['draw_p50'], p['draw_p99'], p['frames_over_33ms'], p['worst_frame_ms'], p['max_docs_drawn'], p.get('max_both'), p.get('max_neither')] for n, p in f['phases'].items()]
        L.append(table(rows, ['phase', 'frames', 'fps p50', 'frame p50', 'p95', 'p99', 'draw p50', 'draw p99', 'over 33 ms', 'worst ms', 'docs drawn', 'bars under text', 'empty yielded']))
        L.append(f"\nGuard: at most {f.get('guard_max_over_33')} frames over 33 ms per phase on this machine. Mount costs (a forced layout inside the measure): `{json.dumps(f.get('mounts'))}`. Refresh measured: {f.get('refresh_hz_measured')} Hz.\n")
    lay = (cases.get('layout') or {}).get('figures') or {}
    if lay.get('drift'):
        L.append('## Class 4 — layout\n')
        rows = [[k, v.get('em_px_measured'), v.get('worst_px'), (v.get('containment') or {}).get('mounted'), (v.get('containment') or {}).get('intersecting_pairs'), len((v.get('containment') or {}).get('blocks_cut') or []), len((v.get('containment') or {}).get('corners_missing') or []), len((v.get('containment') or {}).get('corners_clipped') or []), len((v.get('containment') or {}).get('corners_into') or []), (v.get('containment') or {}).get('worst_overflow_px')] for k, v in lay['drift'].items()]
        L.append(table(rows, ['level', 'em px measured', 'worst drift px', 'mounted', 'intersecting', 'blocks cut', 'corners missing', 'corners clipped', 'corners into a box', 'worst overflow px']))
        L.append(f"\nContinuous zoom: `{json.dumps(lay.get('sweep'))}`; beams: `{json.dumps(lay.get('beams'))}`; the corner held: `{json.dumps(lay.get('corner_held'))}`.\n")
        L.append(f"The handoff (blocks on their bars) per level: `{json.dumps({k: v.get('handoff') for k, v in lay['drift'].items()})}`; the mount steps: `{json.dumps(lay.get('mount_steps'))}`.\n")
    rd = (cases.get('rendered') or {}).get('figures') or {}
    if rd:
        L.append('## Class 1 — rendered\n')
        L.append('```\n' + json.dumps({k: rd.get(k) for k in ('first_edition', 'oracle_runs', 'census', 'draft_shown', 'home_mark', 'agent_space', 'system_rows_held', 'residue_depth')}, indent=1, default=str) + '\n```\n')
    tx = (cases.get('text') or {}).get('figures') or {}
    if tx:
        L.append('## Class 3 — text\n')
        L.append(f"Design repo HEAD `{tx.get('design_head')}`; strings: `{json.dumps(tx.get('counts'))}`; PINNED ids: {', '.join((tx.get('pinned') or {}).get('ids') or [])}.\n")
        L.append(f"The one line: `{(tx.get('line') or {}).get('text')}`\n")
        L.append('Strings the lane needed and the inventory LACKED:\n')
        for s in tx.get('lacking') or []:
            L.append(f"- `{s['id']}` ({s['screen']}): \"{s['text']}\"")
        L.append('\nDRAFT strings not located verbatim in their design file (prose drafts): `%s`\n' % json.dumps((tx.get('draft') or {}).get('not_located_verbatim'), ensure_ascii=False)[:1500])
    a = (cases.get('a11y') or {}).get('figures') or {}
    if a:
        L.append('## Class 7 — a11y\n')
        L.append('```\n' + json.dumps(a, indent=1, default=str) + '\n```\n')
    g = (cases.get('guest') or {}).get('figures') or {}
    if g:
        L.append('## The guest — the page at guest class (`?gate=guest`, no session asked)\n')
        L.append('```\n' + json.dumps(g, indent=1, default=str, ensure_ascii=False) + '\n```\n')
    k = (cases.get('keys') or {}).get('figures') or {}
    if k:
        L.append('## Class 2 — keys\n')
        L.append('Dispatched at engine level: ' + ', '.join(k.get('chords_dispatched') or []) + '\n')
    st = (cases.get('static') or {}).get('figures') or {}
    if st:
        L.append('## Static (FP-15 and the no-write grep)\n')
        L.append(f"Files {st.get('files')}; op literals {st.get('op_literals')}; READ_OPS {st.get('read_ops')}; LK imports {st.get('lk_imports')}.\n")
    sp = (cases.get('shapes') or {}).get('figures') or {}
    if sp:
        L.append(f"Shapes: served {sp.get('served_bytes')} bytes sha256 {sp.get('served_sha256')}; committed {sp.get('committed_bytes')} bytes sha256 {sp.get('committed_sha256')}.\n")
    wk = (cases.get('walks') or {}).get('figures') or {}
    if wk.get('steps'):
        L.append('## The walks (S-23 (b)) — the design\'s note beside each shot\n')
        L.append(f"Source: `{wk.get('walks_source')}`\n")
        for s in wk['steps']:
            L.append(f"- **{s['walk']} step {s['step']} — {s['name']}** · `shots/{s['shot']}`  \n  {s['note']}")
        L.append('')
    sh_ = (cases.get('shots') or {}).get('figures') or {}
    if sh_.get('thresholds'):
        L.append('## The threshold set\n')
        L.append(table([[t['name'], t['kind'], t['value'], f"{t['scale']:.5f}", t['lod'], len(t['mounted']), 'shots/' + t['shot']] for t in sh_['thresholds']], ['threshold', 'kind', 'value', 'scale', 'lod', 'mounted', 'shot']))
        L.append('\n### The B1 screens\n')
        L.append(table([[s['screen'], s['what'], 'shots/' + s['shot']] for s in sh_.get('screens') or []], ['screen', 'what', 'shot']))
    notes = [(n, x) for n, c in cases.items() for x in (c.get('notes') or [])]
    if notes:
        L.append('\n## Notes the cases left\n')
        for n, x in notes:
            L.append(f'- **{n}**: {x}')
    L.append('\n## Verdict\n')
    allpass = all(c['pass'] for c in cases.values()) and not (env.get('exceptions') or [])
    n_expected = sum(len(c.get('expected') or []) for c in cases.values())
    L.append(f"{'GREEN' if allpass else 'RED'} — {sum(1 for c in cases.values() if c['pass'])} of {len(cases)} cases pass; expected failures {n_expected} (marked checks waiting on a page issue, listed above); page exceptions {len(env.get('exceptions') or [])}; log_position {'unchanged' if h0.get('log_position') == h1.get('log_position') else 'MOVED'}.\n")
    text = '\n'.join(L)
    with open(os.path.join(RESULTS, 'report.md'), 'w') as fh:
        fh.write(text)
    print(text)
    return 0 if allpass else 1


if __name__ == '__main__':
    sys.exit(main())
