"""SHAPES — the declarations' drift check (T4; S-16 (a)): `GET /bridge/shapes`
from the gate's provider, and from the harness's own provider whose pages the
editor case decodes against, each equals the committed
`web/bridge/shapes.d.ts` byte for byte. The file is fetched, never
hand-edited; a difference means that provider moved under the page. A run
that names no secret for the harness's provider leaves its copy unmeasured,
and says so."""
import hashlib
import os

from . import ROOT, Result


def run(ctx):
    r = Result()
    path = os.path.join(ROOT, 'web', 'bridge', 'shapes.d.ts')
    committed = open(path, 'rb').read()
    r.figures['committed_bytes'] = len(committed)
    r.figures['committed_sha256'] = hashlib.sha256(committed).hexdigest()
    served = ctx.provider_get('/bridge/shapes')
    r.figures['served_bytes'] = len(served)
    r.figures['served_sha256'] = hashlib.sha256(served).hexdigest()
    r.check(served == committed, 'GET /bridge/shapes == web/bridge/shapes.d.ts byte for byte', {'served': len(served), 'committed': len(committed)})
    if ctx.editor_provider and ctx.editor_secret:
        theirs = ctx.editor_get('/bridge/shapes')
        r.figures['editor_served_bytes'] = len(theirs)
        r.figures['editor_served_sha256'] = hashlib.sha256(theirs).hexdigest()
        r.check(theirs == committed, 'the harness\'s provider\'s GET /bridge/shapes == web/bridge/shapes.d.ts byte for byte, the copy the editor case\'s pages decode against',
                {'served': len(theirs), 'committed': len(committed)})
    else:
        r.note('the harness\'s provider\'s /bridge/shapes is unmeasured: the run names no SKEP_EDITOR_SECRET for it')
    return r.out()
