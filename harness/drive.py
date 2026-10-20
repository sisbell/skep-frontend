#!/usr/bin/env python3
"""The CDP driver (the structure record §6.1; C6 (B): grown from
spikes/s11/cdp.py's two verbs, Python and the `websocket` module alone).

    drive.py --page URL --provider URL --board URL --cases all|a,b,c
             [--results DIR] [--shots DIR] [--chrome PATH] [--cdp-port N]

Launches headless Chrome with a throwaway profile under the system temp dir,
navigates to the gate URL, settles on the page's own signal, and runs the
cases (one module per fence class under cases/), each writing
results/<class>.json. Every browser claim the structure record left
unverified (§10 items 16–21) is settled by what these runs observe and
recorded in results/browser.json. Kills the Chrome it started."""
import argparse, base64, json, os, shutil, subprocess, sys, tempfile, time, urllib.request, urllib.error
import websocket

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'


class Driver:
    """One page in headless Chrome over CDP."""

    def __init__(self, chrome, cdp_port, profile, width=1440, height=900):
        self.chrome, self.cdp_port, self.profile = chrome, cdp_port, profile
        self.width, self.height = width, height
        self.proc = None
        self.ws = None
        self.n = 0
        self.flags = [
            '--headless=new', f'--remote-debugging-port={cdp_port}', f'--user-data-dir={profile}',
            f'--window-size={width},{height}', '--no-first-run', '--no-default-browser-check',
            '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows',
            '--hide-scrollbars', '--force-device-scale-factor=1',
        ]
        self.console = []
        self.exceptions = []
        self.requests = []
        self._extra = {}  # raw request/response headers (Network.*ExtraInfo) that arrived before their request

    def launch(self):
        self.proc = subprocess.Popen([self.chrome] + self.flags + ['about:blank'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for _ in range(100):
            try:
                targets = json.load(urllib.request.urlopen(f'http://127.0.0.1:{self.cdp_port}/json', timeout=2))
                pages = [t for t in targets if t.get('type') == 'page']
                if pages:
                    self.ws = websocket.create_connection(pages[0]['webSocketDebuggerUrl'], timeout=120, suppress_origin=True)
                    break
            except Exception:
                pass
            time.sleep(0.2)
        if not self.ws:
            raise SystemExit('Chrome did not answer on its debugging port')
        self.call('Page.enable'); self.call('Runtime.enable'); self.call('Network.enable'); self.call('Log.enable')
        self.call('Emulation.setDeviceMetricsOverride', {'width': self.width, 'height': self.height, 'deviceScaleFactor': 1, 'mobile': False})
        # the page is driven as the front window: the platform matches `:focus` (and so draws a focus ring) only in a
        # focused, active frame, and a headless page is neither until told so — what a person's window always is
        self.call('Emulation.setFocusEmulationEnabled', {'enabled': True})
        self.version = json.load(urllib.request.urlopen(f'http://127.0.0.1:{self.cdp_port}/json/version', timeout=5))

    def call(self, method, params=None, timeout=120):
        self.n += 1
        n = self.n
        self.ws.send(json.dumps({'id': n, 'method': method, 'params': params or {}}))
        t0 = time.time()
        while True:
            m = json.loads(self.ws.recv())
            if m.get('id') == n:
                if 'error' in m:
                    raise RuntimeError(f'{method}: {m["error"]}')
                return m.get('result', {})
            self._event(m)
            if time.time() - t0 > timeout:
                raise TimeoutError(method)

    def _event(self, m):
        meth = m.get('method', '')
        p = m.get('params', {})
        if meth == 'Runtime.consoleAPICalled':
            self.console.append({'type': p.get('type'), 'text': ' '.join(str(a.get('value', a.get('description', ''))) for a in p.get('args', []))})
        elif meth == 'Runtime.exceptionThrown':
            d = p.get('exceptionDetails', {})
            self.exceptions.append({'text': d.get('text'), 'desc': (d.get('exception') or {}).get('description', '')})
        elif meth == 'Network.requestWillBeSent':
            r = p.get('request', {})
            rec = {'id': p.get('requestId'), 'url': r.get('url'), 'method': r.get('method'), 'headers': r.get('headers', {}), 'type': p.get('type'), 'status': None, 'response_headers': None}
            rec.update(self._extra.pop(p.get('requestId'), {}))
            self.requests.append(rec)
        elif meth in ('Network.requestWillBeSentExtraInfo', 'Network.responseReceivedExtraInfo'):
            # the raw headers on the wire (Origin, Host, the CORS answer) — what the page's own view of a fetch never shows
            rid = p.get('requestId')
            key = 'extra_headers' if meth == 'Network.requestWillBeSentExtraInfo' else 'extra_response_headers'
            found = False
            for r in self.requests:
                if r['id'] == rid:
                    r[key] = p.get('headers', {})
                    if meth == 'Network.responseReceivedExtraInfo':
                        r['extra_status'] = p.get('statusCode')
                    found = True
            if not found:
                self._extra.setdefault(rid, {})[key] = p.get('headers', {})
        elif meth == 'Network.responseReceived':
            rid = p.get('requestId'); resp = p.get('response', {})
            for r in self.requests:
                if r['id'] == rid:
                    r['status'] = resp.get('status'); r['response_headers'] = resp.get('headers', {}); r['request_headers'] = resp.get('requestHeaders')
        elif meth == 'Network.loadingFailed':
            rid = p.get('requestId')
            for r in self.requests:
                if r['id'] == rid:
                    r['failed'] = p.get('errorText'); r['blocked'] = p.get('blockedReason'); r['cors'] = p.get('corsErrorStatus')

    def pump_events(self, seconds=0.2):
        """drain pending events for a while"""
        self.ws.settimeout(seconds)
        try:
            while True:
                m = json.loads(self.ws.recv())
                self._event(m)
        except Exception:
            pass
        finally:
            self.ws.settimeout(120)

    def navigate(self, url):
        self.call('Page.navigate', {'url': url})
        t0 = time.time()
        while time.time() - t0 < 30:
            m = json.loads(self.ws.recv())
            self._event(m)
            if m.get('method') == 'Page.loadEventFired':
                return
        raise TimeoutError('load')

    def eval(self, expr, await_promise=True, timeout=120):
        r = self.call('Runtime.evaluate', {'expression': expr, 'returnByValue': True, 'awaitPromise': await_promise}, timeout=timeout)
        if 'exceptionDetails' in r:
            d = r['exceptionDetails']
            raise RuntimeError('eval: ' + str(d.get('exception', {}).get('description') or d.get('text')) + ' in ' + expr[:200])
        return r.get('result', {}).get('value')

    def settle(self, max_s=20):
        t0 = time.time()
        while time.time() - t0 < max_s:
            try:
                if self.eval('window.__skep && window.__skep.settled()'):
                    time.sleep(0.15)
                    if self.eval('window.__skep.settled()'):
                        return time.time() - t0
            except RuntimeError:
                pass
            time.sleep(0.1)
        return time.time() - t0

    MODS = {'Alt': 1, 'Ctrl': 2, 'Meta': 4, 'Shift': 8}

    def key(self, key, code=None, mods=(), text=None):
        """an engine-level key press: keyDown + keyUp with modifiers"""
        m = sum(self.MODS[x] for x in mods)
        code = code or ('Key' + key.upper() if len(key) == 1 and key.isalpha() else key)
        base = {'modifiers': m, 'key': key, 'code': code}
        if len(key) == 1:
            base['text'] = text if text is not None else key
            base['unmodifiedText'] = key
        vk = {'Enter': 13, 'Escape': 27, 'ArrowDown': 40, 'ArrowUp': 38, 'ArrowLeft': 37, 'ArrowRight': 39, 'Home': 36, 'End': 35, 'PageDown': 34, 'PageUp': 33, 'Tab': 9, ' ': 32, '[': 219, ']': 221, '=': 187, '-': 189, '0': 48, '1': 49, '2': 50}
        if key in vk:
            base['windowsVirtualKeyCode'] = vk[key]
        elif len(key) == 1:
            base['windowsVirtualKeyCode'] = ord(key.upper())
        if key == 'Enter':
            base['text'] = '\r'; base['unmodifiedText'] = '\r'
        down = dict(base, type='keyDown' if 'text' in base else 'rawKeyDown')
        self.call('Input.dispatchKeyEvent', down)
        self.call('Input.dispatchKeyEvent', dict(base, type='keyUp'))

    def ime(self, text):
        """insert text as an IME composition commit would (no key is dispatched to the page's handler)"""
        self.call('Input.insertText', {'text': text})

    def mouse(self, x, y, kind='click'):
        self.call('Input.dispatchMouseEvent', {'type': 'mouseMoved', 'x': x, 'y': y})
        if kind == 'click':
            self.call('Input.dispatchMouseEvent', {'type': 'mousePressed', 'x': x, 'y': y, 'button': 'left', 'clickCount': 1})
            self.call('Input.dispatchMouseEvent', {'type': 'mouseReleased', 'x': x, 'y': y, 'button': 'left', 'clickCount': 1})

    def press(self, x, y):
        """the pointer moved to a point and its left button pressed there — held until `release`, so a case can act on the
        page while the press stands"""
        self.call('Input.dispatchMouseEvent', {'type': 'mouseMoved', 'x': x, 'y': y})
        self.call('Input.dispatchMouseEvent', {'type': 'mousePressed', 'x': x, 'y': y, 'button': 'left', 'buttons': 1, 'clickCount': 1})

    def move(self, x0, y0, x1, y1, steps=8):
        """the pointer moved in steps from one point to another with the left button held"""
        for i in range(1, steps + 1):
            self.call('Input.dispatchMouseEvent', {'type': 'mouseMoved', 'x': x0 + (x1 - x0) * i / steps, 'y': y0 + (y1 - y0) * i / steps, 'button': 'left', 'buttons': 1})

    def release(self, x, y):
        """the left button released at a point"""
        self.call('Input.dispatchMouseEvent', {'type': 'mouseReleased', 'x': x, 'y': y, 'button': 'left', 'buttons': 0, 'clickCount': 1})

    def drag(self, x0, y0, x1, y1, steps=8):
        """a pointer drag with the left button held: pressed at the start, moved in steps, released at the end — over the text layer the platform selects what it crosses"""
        self.press(x0, y0)
        self.move(x0, y0, x1, y1, steps)
        self.release(x1, y1)

    def wheel(self, x, y, dx=0, dy=0, mods=()):
        self.call('Input.dispatchMouseEvent', {'type': 'mouseWheel', 'x': x, 'y': y, 'deltaX': dx, 'deltaY': dy, 'modifiers': sum(self.MODS[m] for m in mods)})

    def shot(self, path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        r = self.call('Page.captureScreenshot', {'format': 'png'})
        with open(path, 'wb') as f:
            f.write(base64.b64decode(r['data']))
        return path

    def ax_tree(self):
        try:
            self.call('Accessibility.enable')
            return self.call('Accessibility.getFullAXTree', {}, timeout=60)
        except Exception as e:
            return {'error': str(e)}

    def close(self):
        try:
            if self.ws:
                self.ws.close()
        except Exception:
            pass
        if self.proc:
            self.proc.terminate()
            try:
                self.proc.wait(timeout=10)
            except Exception:
                self.proc.kill()
        shutil.rmtree(self.profile, ignore_errors=True)


def provider_call(provider, secret, name, args, origin='http://127.0.0.1:8731'):
    """the harness's own call to the provider (the fixture seams, the log) — with the secret"""
    req = urllib.request.Request(f'{provider}/bridge/{name}', data=json.dumps(args).encode(), method='POST',
                                 headers={'Content-Type': 'application/json', 'Origin': origin, 'Skep-Provider': secret})
    try:
        return json.load(urllib.request.urlopen(req, timeout=60))
    except urllib.error.HTTPError as e:
        return {'HTTP': e.code, 'body': e.read().decode('utf8', 'replace')}


def provider_get(provider, secret, path, origin='http://127.0.0.1:8731'):
    req = urllib.request.Request(f'{provider}{path}', headers={'Origin': origin, 'Skep-Provider': secret})
    return json.load(urllib.request.urlopen(req, timeout=60))


def daemon_op(board, frame):
    """the harness's own token-free `POST /op` to the daemon — the class-1 oracle"""
    req = urllib.request.Request(f'{board}/op', data=json.dumps(frame).encode(), headers={'Content-Type': 'application/json'})
    return json.load(urllib.request.urlopen(req, timeout=60))


def daemon_health(board):
    return json.load(urllib.request.urlopen(f'{board}/health', timeout=10))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--page', required=True)
    ap.add_argument('--provider', default='http://127.0.0.1:8742')
    ap.add_argument('--board', default='http://127.0.0.1:8642')
    ap.add_argument('--cases', default='all')
    ap.add_argument('--results', default=os.path.join(ROOT, 'results'))
    ap.add_argument('--shots', default=os.path.join(ROOT, 'shots'))
    ap.add_argument('--chrome', default=CHROME)
    ap.add_argument('--cdp-port', type=int, default=9342)
    a = ap.parse_args()
    secret = os.environ.get('SKEP_PROVIDER_SECRET', '')
    if not secret:
        sys.exit('SKEP_PROVIDER_SECRET is not in the environment')
    os.makedirs(a.results, exist_ok=True); os.makedirs(a.shots, exist_ok=True)
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import cases  # noqa: E402

    profile = tempfile.mkdtemp(prefix='skep-gate-chrome-')
    drv = Driver(a.chrome, a.cdp_port, profile)
    health0 = daemon_health(a.board)
    env = {'page': a.page.replace(secret, '<secret>'), 'provider': a.provider, 'board': a.board, 'health_start': health0,
           'started': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())}
    ctx = cases.Context(drv, a.provider, a.board, secret, a.results, a.shots, env, a.page)
    failed = []
    try:
        drv.launch()
        env['chrome'] = drv.version.get('Browser')
        env['user_agent'] = drv.version.get('User-Agent')
        drv.navigate(a.page)
        t_settle = drv.settle(40)
        env['first_settle_s'] = round(t_settle, 2)
        drv.pump_events(0.5)
        env['boot'] = drv.eval('window.__skep ? window.__skep.boot : null')
        names = cases.ALL if a.cases == 'all' else a.cases.split(',')
        for name in names:
            t0 = time.time()
            try:
                res = cases.run(name, ctx)
            except Exception as e:  # a case that throws is a failed case, recorded
                import traceback
                res = {'pass': False, 'error': str(e), 'trace': traceback.format_exc()[-2000:]}
            res['case'] = name
            res['seconds'] = round(time.time() - t0, 2)
            with open(os.path.join(a.results, f'{name}.json'), 'w') as f:
                json.dump(res, f, indent=2, sort_keys=True, default=str)
            expected = res.get('expected') or []
            print(f"{'PASS' if res.get('pass') else 'FAIL'} {name} ({res['seconds']} s)" + (f" · {len(expected)} expected failure{'s' if len(expected) != 1 else ''} (marked, waiting on a page issue)" if expected else '') + ('' if res.get('pass') else ': ' + str(res.get('error') or res.get('failures'))[:400]), flush=True)
            if not res.get('pass'):
                failed.append(name)
        drv.pump_events(0.5)
        env['console'] = drv.console[-50:]
        env['exceptions'] = drv.exceptions
        # the close at unload (S-37 (a); the record §10 item 20): leave the page, then count the `close` calls in the provider's log —
        # one for each owner's page the run left, the cases that open another page (`walks`, `guest`) among them; a guest's closes none
        try:
            drv.navigate('about:blank')
            time.sleep(1.0)
            log = provider_get(a.provider, secret, '/bridge/log')
            after = [e for e in log if e['seq'] > ctx.seq0]
            env['close_at_unload'] = {'close_calls': sum(1 for e in after if e['kind'] == 'call' and e.get('call') == 'close'),
                                      'session_close_dials': sum(1 for e in after if e['kind'] == 'dial' and e.get('path') == '/session/close'),
                                      'events_dials': sum(1 for e in after if e['kind'] == 'dial' and e.get('path') == '/events')}
        except Exception as e:
            env['close_at_unload'] = {'error': str(e)}
        env['health_end'] = daemon_health(a.board)
        env['requests'] = [{k: v for k, v in r.items() if k in ('url', 'method', 'status', 'type', 'failed', 'blocked', 'cors')} for r in drv.requests if '8742' in str(r.get('url'))][:400]
        env['requests'] = [dict(r, url=str(r['url']).replace(secret, '<secret>')) for r in env['requests']]
        env['finished'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
        env['failed'] = failed
        with open(os.path.join(a.results, 'env.json'), 'w') as f:
            json.dump(env, f, indent=2, sort_keys=True, default=str)
    finally:
        drv.close()
    print('exceptions in the page:', len(drv.exceptions), flush=True)
    for e in drv.exceptions[:10]:
        print('  ', (e.get('desc') or e.get('text') or '')[:300])
    sys.exit(1 if failed or drv.exceptions else 0)


if __name__ == '__main__':
    main()
