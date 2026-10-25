#!/usr/bin/env python3
"""The page's dev server and results collector (the structure record §6.1,
S-18 (a): `serve.py` serves `web/`, no reliance on `file://` — the provider
admits ONE page origin exactly, `http://127.0.0.1:8731`).

    serve.py [port] [--web <dir>] [--results <dir>] [--shots <dir>]

Serves `web/` with `Cache-Control: no-store`, the shipped faces under
`web/fonts/` as `font/woff2`; collects `POST /results` into
`results/<label>.json` and `POST /shot` into `shots/`. Grown from
spikes/s3/serve.py (the byte-range branch kept for a later media lane).
The harness is not the product (FP-5): nothing in web/ imports this."""
import argparse, base64, datetime, http.server, json, os, re, socketserver, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('port', nargs='?', type=int, default=8731)
    ap.add_argument('--web', default=os.path.join(ROOT, 'web'))
    ap.add_argument('--results', default=os.path.join(ROOT, 'results'))
    ap.add_argument('--shots', default=os.path.join(ROOT, 'shots'))
    a = ap.parse_args()
    os.makedirs(a.results, exist_ok=True)
    os.makedirs(a.shots, exist_ok=True)

    class H(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kw):
            super().__init__(*args, directory=a.web, **kw)

        def send_head(self):
            rng = self.headers.get('Range')
            if not rng or not rng.startswith('bytes='):
                return super().send_head()
            path = self.translate_path(self.path)
            try:
                f = open(path, 'rb')
            except OSError:
                self.send_error(404); return None
            size = os.fstat(f.fileno()).st_size
            try:
                first, last = rng.split('=', 1)[1].split('-', 1)
                start = int(first) if first else 0
                end = int(last) if last else size - 1
            except ValueError:
                f.close(); self.send_error(400); return None
            end = min(end, size - 1)
            if start > end:
                f.close(); self.send_error(416); return None
            self.send_response(206)
            self.send_header('Content-Type', self.guess_type(path))
            self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
            self.send_header('Content-Length', str(end - start + 1))
            self.end_headers()
            f.seek(start); self.wfile.write(f.read(end - start + 1)); f.close()
            return None

        def guess_type(self, path):
            if path.endswith('.js'):
                return 'text/javascript; charset=utf-8'
            if path.endswith('.d.ts'):
                return 'text/plain; charset=utf-8'
            if path.endswith('.woff2'):
                return 'font/woff2'
            return super().guess_type(path)

        def end_headers(self):
            # an edited module must never be measured stale
            self.send_header('Cache-Control', 'no-store, must-revalidate')
            super().end_headers()

        def _ok(self):
            self.send_response(204); self.send_header('Content-Length', '0'); self.end_headers()

        def do_POST(self):
            n = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(n)
            try:
                obj = json.loads(body)
            except Exception:
                obj = {'raw': body.decode('utf8', 'replace')}
            if self.path.startswith('/shot'):
                name = re.sub(r'[^A-Za-z0-9._/-]', '-', obj.get('name', 'shot'))[:160] + '.png'
                out = os.path.join(a.shots, name)
                os.makedirs(os.path.dirname(out), exist_ok=True)
                with open(out, 'wb') as f:
                    f.write(base64.b64decode(obj.get('png', '').split(',', 1)[-1]))
                print(f"[{datetime.datetime.now():%H:%M:%S}] shot <- {name}", flush=True)
                return self._ok()
            label = re.sub(r'[^A-Za-z0-9._-]', '-', str(obj.get('label') or 'run'))
            with open(os.path.join(a.results, label + '.json'), 'w') as f:
                json.dump(obj, f, indent=2, sort_keys=True)
            print(f"[{datetime.datetime.now():%H:%M:%S}] result <- {label}.json ({len(body)} bytes)", flush=True)
            self._ok()

        def log_message(self, *args):
            pass

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(('127.0.0.1', a.port), H) as httpd:
        print(f"serving {a.web} on http://127.0.0.1:{a.port}/  results -> {a.results}", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == '__main__':
    main()
