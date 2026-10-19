"""SHAPES — the declarations' drift check (T4; S-16 (a)): `GET /bridge/shapes`
from the running provider equals the committed `web/bridge/shapes.d.ts` byte
for byte. The file is fetched, never hand-edited; a difference means the
provider moved under the page."""
import hashlib
import os

from . import ROOT, Result


def run(ctx):
    r = Result()
    served = ctx.provider_get('/bridge/shapes')
    path = os.path.join(ROOT, 'web', 'bridge', 'shapes.d.ts')
    committed = open(path, 'rb').read()
    r.figures['served_bytes'] = len(served)
    r.figures['committed_bytes'] = len(committed)
    r.figures['served_sha256'] = hashlib.sha256(served).hexdigest()
    r.figures['committed_sha256'] = hashlib.sha256(committed).hexdigest()
    r.check(served == committed, 'GET /bridge/shapes == web/bridge/shapes.d.ts byte for byte', {'served': len(served), 'committed': len(committed)})
    text = committed.decode('utf8', 'replace')
    for name in ['places', 'boards', 'session', 'close', 'op', 'held', 'resolve', 'answer', 'cancel']:
        r.check(name + '(' in text or name + '?(' in text or (name + ':') in text, f'the declarations name `{name}`')
    return r.out()
