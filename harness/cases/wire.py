"""WIRE — class 5 (the structure record §6.3; T3 (5), T4): which calls the
page made and which dials they caused, how many bytes; "the camera never
writes".

(i) the ledger (G-LEDGER) after the cold open and after a camera-only
    window: every surface 0 but `fetch` (== the bridge client's call log
    length) and `eventsource` (1); the `kind == "call"` entries of the
    provider's `GET /bridge/log` between the window's first and last seq are
    exactly the page's calls of the window;
(ii) no dial of the whole run names a write route, every `op` frame the page
    sent names a read of READ_OPS, and the daemon's `/health.log_position`
    is unchanged from the run's start (the daemon-side oracle);
(iii) the figures: the cold open's calls and bytes (`places` among them) and
    a LEAP's — re-measured over the provider (its round trip, not the
    shell's);
(iv) FP-15's second half: the bridge client's recorded calls replayed over
    the fake port under `node --test` build the same model — the snapshot
    deep-equal on the records the replay touches;
(v) the browser claims of the record §10 items 16–21, as this run saw them
    (the preflight, Origin, Host, Vary/Max-Age, the EventSource's headers,
    a CORS failure's face)."""
import json
import os
import re
import subprocess
import tempfile
import time
from collections import Counter

from . import DOC, FAR_LEAP, ROOT, WINDOW, Result

READ_PATHS = {('POST', '/op'), ('POST', '/op-at'), ('GET', '/health'), ('GET', '/events'), ('GET', '/changes'),
              ('GET', '/chain'), ('GET', '/challenge'), ('POST', '/session'), ('POST', '/session/close')}


def read_ops():
    src = open(os.path.join(ROOT, 'web', 'model', 'frames.js'), encoding='utf8').read()
    m = re.search(r'READ_OPS\s*=\s*Object\.freeze\(\[(.*?)\]\)', src, re.S)
    return set(re.findall(r"'([a-z_]+)'", m.group(1))) if m else set()


def ledger(ctx):
    return ctx.js('window.__skepLedger')


def calls(ctx):
    return ctx.js('window.__skep.bridge.calls().map(c => ({name: c.name, op: c.op || null, bytesIn: c.bytesIn, bytesOut: c.bytesOut, ms: c.ms, outcome: c.outcome}))')


def quiet_surfaces(r, led, label):
    for k in ['localStorage', 'sessionStorage', 'cookie', 'indexedDB', 'xhr', 'beacon', 'history']:
        r.check(led.get(k, 0) == 0, f'{label}: ledger.{k} == 0', led.get(k))
    r.check(led.get('eventsource') == 1, f'{label}: one EventSource', led.get('eventsource'))


def run(ctx):
    r = Result()
    ops_allowed = read_ops()
    health0 = ctx.env.get('health_start') or ctx.health()
    # ---- (i) the ledger at the cold open --------------------------------------
    led = ledger(ctx)
    cl = calls(ctx)
    quiet_surfaces(r, led, 'cold open')
    r.check(led['fetch'] == len(cl), 'ledger.fetch == the bridge client\'s call log length', {'fetch': led['fetch'], 'calls': len(cl)})
    boot = ctx.js('window.__skep.boot')
    r.figures['cold_open'] = {'calls': boot.get('coldOpenCalls'), 'bytes': boot.get('coldOpenBytes'), 'ms': boot.get('coldOpenMs'),
                              'places_bytes': boot.get('placesBytes'), 'places_docs': boot.get('placesDocs'), 'deepest_depth': boot.get('deepestDepth'),
                              'first_settle_s': ctx.env.get('first_settle_s')}
    r.check(boot.get('coldOpenCalls') == ['boards', 'session', 'fingerprint', 'health', 'probe', 'places'], 'the cold open\'s six calls in order', boot.get('coldOpenCalls'))
    # the provider's log for this run so far: the dials the cold open caused
    log = ctx.provider_log()
    run_rows = [e for e in log if e['seq'] > ctx.seq0]
    first_places = next((e for e in run_rows if e['kind'] == 'call' and e.get('call') == 'places'), None)
    cold = [e for e in run_rows if first_places and e['seq'] <= first_places['seq']]
    r.figures['cold_open']['provider'] = {
        'calls': Counter(e.get('call') for e in cold if e['kind'] == 'call'),
        'dials': Counter(f"{e.get('method')} {e.get('path')}" for e in cold if e['kind'] == 'dial'),
        'dial_bytes_in': sum(e['bytes_in'] for e in cold if e['kind'] == 'dial'), 'dial_bytes_out': sum(e['bytes_out'] for e in cold if e['kind'] == 'dial'),
        'call_bytes_out': sum(e['bytes_out'] for e in cold if e['kind'] == 'call'),
    }
    settled_calls = Counter(e.get('call') for e in run_rows if e['kind'] == 'call')
    page_calls = Counter(c['name'] for c in cl)
    r.check(settled_calls == page_calls, 'the provider\'s `call` entries of the run == the page\'s calls (by name)', {'provider': dict(settled_calls), 'page': dict(page_calls)})
    r.figures['home_settled'] = {'page_calls': dict(page_calls), 'ops': dict(Counter(c['op'] for c in cl if c['name'] == 'op')),
                                 'bytes_in': sum(c['bytesIn'] for c in cl), 'bytes_out': sum(c['bytesOut'] for c in cl)}
    # ---- (i) the camera-only window ---------------------------------------------
    n0 = len(cl)
    seq_a = log[-1]['seq'] if log else -1
    led0 = ledger(ctx)
    scale_mid = ctx.js('window.__skep.scaleFor(%s, "doc", 120)' % json.dumps(DOC))
    box = ctx.js('window.__skep.boxOf(%s)' % json.dumps(DOC))
    summary = ctx.js('window.__skep.runPath("wire-window", 2500, %s)' % json.dumps({'kind': 'orbit', 'scale': scale_mid, 'ax': 0.35, 'by': 0.35, 'centre': {'x': box['x'], 'y': box['y']}}))
    ctx.settle()
    # two FLIGHTS in the window too (WHOLE BOARD and back): the camera's flight is the site a serialized camera would write from (M4)
    ctx.js('window.__skep.go.wholeBoard()')
    ctx.settle()
    ctx.js('window.__skep.go.back()')
    ctx.settle()
    time.sleep(0.3)
    led1 = ledger(ctx)
    cl1 = calls(ctx)
    log1 = ctx.provider_log()
    window_rows = [e for e in log1 if e['seq'] > seq_a]
    page_window = sorted(c['name'] for c in cl1[n0:])
    prov_window = sorted(e.get('call') for e in window_rows if e['kind'] == 'call')
    quiet_surfaces(r, led1, 'camera window')
    r.check(led1['fetch'] == len(cl1), 'camera window: ledger.fetch == the call log length', {'fetch': led1['fetch'], 'calls': len(cl1)})
    r.check(page_window == prov_window, 'camera window: the provider\'s `call` entries between the window\'s seqs are exactly the page\'s calls', {'page': dict(Counter(page_window)), 'provider': dict(Counter(prov_window))})
    r.check(all(e.get('path') in ('/op', '/health', '/events', '/changes', '/chain') for e in window_rows if e['kind'] == 'dial'), 'camera window: every dial a read route', Counter(e.get('path') for e in window_rows if e['kind'] == 'dial'))
    r.figures['camera_window'] = {'ms': 2500, 'frames': summary, 'page_calls': dict(Counter(page_window)), 'ops': dict(Counter(c['op'] for c in cl1[n0:] if c['name'] == 'op')),
                                  'bytes_in': sum(c['bytesIn'] for c in cl1[n0:]), 'bytes_out': sum(c['bytesOut'] for c in cl1[n0:]),
                                  'ledger_before': led0, 'ledger_after': led1, 'provider_seq': [seq_a + 1, log1[-1]['seq'] if log1 else None]}
    # ---- (iii) a LEAP's figures --------------------------------------------------
    n1 = len(cl1)
    seq_b = log1[-1]['seq'] if log1 else -1
    t0 = time.time()
    ctx.js('window.__skep.go.leapTo(%s, null)' % json.dumps(FAR_LEAP))
    t_flight = time.time() - t0
    ctx.settle()
    t_settled = time.time() - t0
    cl2 = calls(ctx)
    leap_calls = cl2[n1:]
    log2 = ctx.provider_log()
    leap_rows = [e for e in log2 if e['seq'] > seq_b]
    r.figures['leap'] = {
        'target': FAR_LEAP, 'flight_s': round(t_flight, 3), 'settled_s': round(t_settled, 3),
        'page_calls': len(leap_calls), 'ops': dict(Counter(c['op'] for c in leap_calls if c['name'] == 'op')),
        'bytes_in': sum(c['bytesIn'] for c in leap_calls), 'bytes_out': sum(c['bytesOut'] for c in leap_calls),
        'page_ms_p50': sorted(c['ms'] for c in leap_calls)[len(leap_calls) // 2] if leap_calls else None,
        'page_ms_max': max((c['ms'] for c in leap_calls), default=None),
        'provider_dials': dict(Counter(f"{e.get('method')} {e.get('path')}" for e in leap_rows if e['kind'] == 'dial')),
        'provider_dial_ms_sum': sum(e['ms'] for e in leap_rows if e['kind'] == 'dial'),
        'provider_call_ms_sum': sum(e['ms'] for e in leap_rows if e['kind'] == 'call'),
    }
    r.check(len(leap_calls) > 0, 'the LEAP read the far document', len(leap_calls))
    far = ctx.js('window.__skep.model.doc(%s)' % json.dumps(FAR_LEAP))
    r.check(far['from'] == 1 and far['to'] == (far['extent'] or 0) + 1, 'the LEAP\'s landing holds the whole far document', {'from': far['from'], 'to': far['to'], 'extent': far['extent']})
    # ---- (ii) no write, the whole run ------------------------------------------
    all_rows = [e for e in log2 if e['seq'] > ctx.seq0]
    dial_paths = Counter((e.get('method'), e.get('path')) for e in all_rows if e['kind'] == 'dial')
    r.check(set(dial_paths) <= READ_PATHS, 'every dial of the run names a read route', {f'{m} {p}': n for (m, p), n in dial_paths.items()})
    bad_ops = sorted(set(c['op'] for c in cl2 if c['name'] == 'op' and c['op'] not in ops_allowed))
    r.check(not bad_ops, 'every `op` frame the page sent names a read (READ_OPS)', bad_ops)
    r.check(all(c['name'] in ('boards', 'session', 'fingerprint', 'health', 'probe', 'places', 'op', 'close') for c in cl2), 'no call to a write or ceremonial row', sorted(set(c['name'] for c in cl2)))
    health1 = ctx.health()
    r.check(health1.get('log_position') == health0.get('log_position'), '/health.log_position unchanged across the run so far', {'start': health0.get('log_position'), 'now': health1.get('log_position')})
    r.figures['log_position'] = {'start': health0.get('log_position'), 'after_wire': health1.get('log_position')}
    r.figures['dials_whole_run'] = {f'{m} {p}': n for (m, p), n in dial_paths.items()}
    r.figures['refusals_met'] = ctx.js('window.__skep.pump.refusals()')
    r.figures['provider_log_fields'] = sorted({k for e in all_rows for k in e.keys()})
    r.note('the provider\'s dial entries carry method, path, bytes and ms — not the op kind; the write check over frames is the page\'s own `op` field, the write check over the board is /health.log_position')
    # ---- (iv) FP-15: the recorded calls replayed over the fake port -----------
    # the page reads the first edition whole too (a LEAP), so both documents' whole reads are on record
    ctx.leap(DOC, WINDOW[0])
    raw = ctx.js('window.__skep.bridge.calls().filter(c => c.answer && (c.name === "places" || c.name === "op")).map(c => ({name: c.name, args: c.args, answer: c.answer}))')
    rec_calls = []
    for c in raw:
        try:
            rec_calls.append({'name': c['name'], 'args': json.loads(c['args']), 'outcome': json.loads(c['answer'])})
        except Exception:
            pass
    rec = {'board': ctx.js('window.__skep.model.board()'), 'session': ctx.js('window.__skep.model.session()'), 'calls': rec_calls, 'loadWhole': [DOC, FAR_LEAP], 'events': []}
    fd, path = tempfile.mkstemp(prefix='skep-replay-', suffix='.json', dir=tempfile.gettempdir())
    with os.fdopen(fd, 'w') as f:
        json.dump(rec, f)
    out_path = path[:-5] + '-snapshot.json'
    env = dict(os.environ, SKEP_REPLAY=path, SKEP_REPLAY_OUT=out_path)
    proc = subprocess.run(['node', '--test', 'web/model/pump.test.js'], cwd=ROOT, env=env, capture_output=True, text=True, timeout=120)
    os.unlink(path)
    replay = None
    if os.path.exists(out_path):
        with open(out_path) as f:
            replay = json.load(f)
        os.unlink(out_path)
    r.check(proc.returncode == 0, 'the replay test passes (every frame answered from the record)', proc.stdout[-1500:] if proc.returncode else None)
    page = ctx.js('window.__skep.model.snapshot()')
    if replay:
        def pick(s):
            docs = {d['addr']: {k: d[k] for k in ('extent', 'from', 'to', 'blocks', 'links', 'origins')} for d in s['docs'] if d['addr'] in (DOC, FAR_LEAP)}
            link_addrs = set(a for d in docs.values() for a in d['links'])
            links = {l['addr']: l for l in s['links'] if l['addr'] in link_addrs}
            return {'board': s['board'], 'session': s['session'], 'indexState': s['indexState'], 'index': s['index'], 'counts': s['counts'], 'docs': docs, 'links': links}
        a, b = pick(page), pick(replay)
        for k in a:
            r.check(a[k] == b[k], f'FP-15: the model\'s `{k}` equal over the bridge client and the fake port', None if a[k] == b[k] else {'page': str(a[k])[:600], 'replay': str(b[k])[:600]})
        r.figures['replay'] = {'calls_recorded': len(rec_calls), 'docs_compared': sorted(a['docs'].keys()), 'links_compared': len(a['links']), 'index_rows': len(a['index'])}
    else:
        r.check(False, 'the replay wrote a snapshot', proc.stdout[-800:] + proc.stderr[-800:])
    # ---- (v) the browser claims (items 16–21) ------------------------------------
    ctx.drv.pump_events(0.3)
    reqs = [q for q in ctx.drv.requests if '8742' in str(q.get('url'))]
    pre = [q for q in reqs if q.get('method') == 'OPTIONS']
    posts = [q for q in reqs if q.get('method') == 'POST']
    es = [q for q in reqs if '/bridge/events' in str(q.get('url'))]
    def hdr(q, name):
        for h in (q.get('extra_headers'), q.get('request_headers'), q.get('headers')):
            for k, v in (h or {}).items():
                if k.lower() == name.lower():
                    return v
        return None
    def rhdr(q, name):
        for h in (q.get('extra_response_headers'), q.get('response_headers')):
            for k, v in (h or {}).items():
                if k.lower() == name.lower():
                    return v
        return None
    claims = {
        '16_origin_on_post': sorted({hdr(q, 'Origin') for q in posts if hdr(q, 'Origin')}),
        '16_preflights': len(pre), '16_posts': len(posts),
        '16_preflight_request_headers': sorted({hdr(q, 'Access-Control-Request-Headers') for q in pre if hdr(q, 'Access-Control-Request-Headers')}),
        '16_preflight_request_method': sorted({hdr(q, 'Access-Control-Request-Method') for q in pre if hdr(q, 'Access-Control-Request-Method')}),
        '16_preflight_carries_secret': any(hdr(q, 'Skep-Provider') for q in pre),
        '16_preflight_status': sorted({q.get('status') or q.get('extra_status') for q in pre}),
        '16_allow_origin': sorted({rhdr(q, 'Access-Control-Allow-Origin') or '' for q in posts + pre}),
        '17_host': sorted({hdr(q, 'Host') for q in reqs if hdr(q, 'Host')}),
        '18_eventsource_requests': len(es),
        '18_eventsource_headers': {k: v for q in es[:1] for k, v in (q.get('extra_headers') or q.get('headers') or {}).items() if k.lower() in ('accept', 'origin', 'cache-control', 'host')},
        '18_eventsource_status': sorted({q.get('status') or q.get('extra_status') for q in es}),
        '18_eventsource_type': sorted({str(q.get('type')) for q in es}),
        '18_stream_state': ctx.js('window.__skep.bridge.stream()'),
        '19_vary': sorted({rhdr(q, 'Vary') or '' for q in posts + pre}),
        '19_max_age': sorted({rhdr(q, 'Access-Control-Max-Age') or '' for q in pre}),
        '19_preflights_per_post': round(len(pre) / max(1, len(posts)), 3),
        '20_close_keepalive': 'measured at the run\'s end by drive.py (env.close_at_unload)',
    }
    # 21: a CORS failure's face, probed from the page's context by the harness (two fetches, counted below)
    face = ctx.js('''(async () => {
      const out = {};
      try { const res = await fetch("%s/bridge/boards", {method: "POST", headers: {"Content-Type": "application/json", "Skep-Provider": "wrong-secret"}, body: "{}"}); out.wrongSecret = {status: res.status, text: (await res.text()).slice(0, 120)}; }
      catch (e) { out.wrongSecret = {error: String(e)}; }
      try { const res = await fetch("http://127.0.0.1:8749/bridge/boards", {method: "POST", headers: {"Content-Type": "application/json"}, body: "{}"}); out.closedPort = {status: res.status}; }
      catch (e) { out.closedPort = {error: String(e)}; }
      return out; })()''' % ctx.provider)
    claims['21_cors_failure_face'] = face
    ctx.drv.pump_events(0.3)
    wrong = [q for q in ctx.drv.requests if '8742' in str(q.get('url')) and q.get('method') == 'POST' and hdr(q, 'Skep-Provider') == 'wrong-secret']
    claims['21_wrong_secret_response'] = [{'status': q.get('status') or q.get('extra_status'), 'cors': q.get('cors'), 'failed': q.get('failed'), 'allow_origin': rhdr(q, 'Access-Control-Allow-Origin')} for q in wrong]
    r.figures['browser_claims'] = claims
    r.check(claims['16_origin_on_post'] == ['http://127.0.0.1:8731'], 'item 16: the cross-port POST carries Origin http://127.0.0.1:8731', claims['16_origin_on_post'])
    r.check(len(pre) >= 1 and 'skep-provider' in ','.join(claims['16_preflight_request_headers']).lower(), 'item 16: the POST is preflighted and the preflight names skep-provider', claims['16_preflight_request_headers'])
    r.check(len(es) >= 1, 'item 18: the EventSource opened once', len(es))
    led2 = ledger(ctx)
    cl3 = calls(ctx)
    r.check(led2['fetch'] == len(cl3) + 2, 'the ledger counted the harness\'s two probe fetches beside the client\'s calls', {'fetch': led2['fetch'], 'calls': len(cl3)})
    quiet_surfaces(r, led2, 'end of the wire case (after the LEAP\'s flight and the probes)')
    r.figures['ledger_end'] = led2
    ctx.shared['wire_probe_fetches'] = 2
    return r.out()
