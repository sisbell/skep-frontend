"""The fence's classes as Python modules over the driver (the structure
record §6.3; C8: the full seven classes). The MEASURING code lives in the
page's gate hooks (`web/gate/hooks.js`, `window.__skep`); the ASSERTING code
lives here, one module per class — rendered, keys, text, layout, wire,
frames, a11y — plus `static` (FP-15's grep and the no-write grep), `shapes`
(the declarations' drift), `walks` (W-01 and W-05 as camera scripts with
shots) and `shots` (the threshold set). Each module's `run(ctx)` returns a
dict with `pass`, `checks`, `failures`, `expected` and its figures;
`drive.py` writes it to `results/<name>.json`. A check that holds the page
to what a named page issue still breaks is marked with that issue: it is
counted under `expected` while it fails, and it FAILS the case the day it
passes, so the mark comes off with the fix and never outlives it. The
harness is not the product (FP-5): nothing in `web/` imports any of
this."""
import importlib
import json
import os
import subprocess
import time
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DESIGN = os.environ.get('SKEP_DESIGN_REPO', '/Users/shane/Documents/github/claude/skep-ux-design')
PAGE_ORIGIN = 'http://127.0.0.1:8731'

# the seed's fixed points (the owner's board, read in the run condition)
DOC = '1.0.1.0.3'            # the first edition: its window of the draft 1.0.1.0.1003 is withheld from a guest
WINDOW = (1467, 240, '1.0.1.0.1003')
GHOST = '1.0.1.0.1049578'    # cited by the first edition, never minted: `doc_not_registered`
FAR_LEAP = '1.0.1.0.127'     # the one citation whose target is a real edition
AGENT_SPACE = '1.0.1.1'      # the claimant's delegated agent space
SECOND_ACCOUNT = '1.0.2'     # the seed's keyless second account

# the order the gate runs them in: the two that need no page first, then the
# wire's cold-open figures before the other classes move the camera
ALL = ['static', 'shapes', 'wire', 'rendered', 'text', 'layout', 'a11y', 'keys', 'frames', 'walks', 'shots']

# the page issues the marked checks wait on (issue #2's boundary note); each mark comes off the day its check passes
XFAIL_CLIP = ("page: the article's height is pinned to its box and its overflow hidden, so the document's end is cut at the box's edge "
              "(web/text/layer.js `mount`, web/style.css `.dtext`)")
XFAIL_ANCHOR = ("page: a beam leaves the block holding its span, at the block's mid-height, not the span's own line "
                "(web/beams/beams.js `anchorRects` takes the block's rects for the span's)")


class Result:
    """one case's outcome: every check counted, every failure named, every
    marked check that still fails counted as expected"""

    def __init__(self):
        self.checks = 0
        self.failures = []
        self.expected = []
        self.figures = {}
        self.notes = []

    def check(self, cond, what, detail=None, xfail=None):
        """count a check; `xfail` names the page issue a failing check waits on —
        then a failure is expected, and a pass is a failure that says the mark
        must come off"""
        self.checks += 1
        entry = {'what': what, 'detail': detail} if detail is not None else {'what': what}
        if xfail is not None:
            entry['xfail'] = xfail
            if cond:
                self.failures.append({'what': what + ' — PASSES: its expected-failure mark must come off', 'xfail': xfail})
            else:
                self.expected.append(entry)
        elif not cond:
            self.failures.append(entry)
        return bool(cond)

    def note(self, text):
        self.notes.append(text)

    def out(self, **more):
        d = {'pass': not self.failures, 'checks': self.checks, 'failures': self.failures, 'expected': self.expected, 'figures': self.figures, 'notes': self.notes}
        d.update(more)
        return d


class Context:
    """what every case gets: the driver, the provider and the board, the folders, and a few verbs"""

    def __init__(self, drv, provider, board, secret, results, shots, env):
        self.drv, self.provider, self.board, self.secret = drv, provider, board, secret
        self.results, self.shots, self.env = results, shots, env
        self.shared = {}
        self._design_cache = {}
        try:
            log = self.provider_log()
            self.seq0 = log[-1]['seq'] if log else -1
        except Exception as e:  # the provider's log is read, never required
            self.seq0 = -1
            env['provider_log_error'] = str(e)

    # ---- the page -----------------------------------------------------------
    def js(self, expr, timeout=120):
        return self.drv.eval(expr, timeout=timeout)

    def settle(self, max_s=30):
        return self.drv.settle(max_s)

    def frames(self, n=2):
        """wait n animation frames"""
        return self.js('new Promise(r => { let k = 0; const step = () => (++k >= %d ? r(true) : requestAnimationFrame(step)); requestAnimationFrame(step); })' % n)

    def leap(self, addr, pos=None):
        self.js('window.__skep.go.leapTo(%s, %s)' % (json.dumps(addr), json.dumps(pos)))
        self.settle()
        self.frames(2)

    def esc(self):
        self.js('window.__skep.esc()')
        self.frames(1)

    def shot(self, rel):
        self.frames(2)
        self.drv.shot(os.path.join(self.shots, rel))
        return rel

    def camera(self):
        return self.js('window.__skep.view.camera()')

    def set_view(self, x, y, scale):
        self.js('window.__skep.view.set(%s)' % json.dumps({'x': x, 'y': y, 'scale': scale}))
        self.settle()
        self.frames(2)

    def view_doc_em(self, addr, em):
        """the camera over a document's centre at an em of `em` px"""
        box = self.js('window.__skep.boxOf(%s)' % json.dumps(addr))
        scale = self.js('window.__skep.scaleFor(%s, "em", %s)' % (json.dumps(addr), em))
        self.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] * 0.3, scale)
        return scale

    def view_doc_px(self, addr, px):
        box = self.js('window.__skep.boxOf(%s)' % json.dumps(addr))
        scale = self.js('window.__skep.scaleFor(%s, "doc", %s)' % (json.dumps(addr), px))
        self.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] / 2, scale)
        return scale

    # ---- the provider and the board (the harness's own reads, never the page's) ----
    def provider_get(self, path):
        req = urllib.request.Request(self.provider + path, headers={'Origin': PAGE_ORIGIN, 'Skep-Provider': self.secret})
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.read()

    def provider_log(self):
        return json.loads(self.provider_get('/bridge/log'))

    def daemon_op(self, frame):
        """the harness's own token-free `POST /op` to the daemon — the class-1 oracle"""
        req = urllib.request.Request(self.board + '/op', data=json.dumps(frame).encode(), headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)

    def health(self):
        with urllib.request.urlopen(self.board + '/health', timeout=10) as r:
            return json.load(r)

    # ---- the design repository, read-only, by `git show` ------------------
    def design(self, path):
        if path not in self._design_cache:
            out = subprocess.run(['git', '-C', DESIGN, 'show', 'HEAD:' + path], capture_output=True)
            self._design_cache[path] = out.stdout.decode('utf8', 'replace') if out.returncode == 0 else None
        return self._design_cache[path]

    def design_head(self):
        return subprocess.run(['git', '-C', DESIGN, 'log', '-1', '--format=%H'], capture_output=True, text=True).stdout.strip()


def run(name, ctx):
    mod = importlib.import_module('cases.' + name)
    return mod.run(ctx)
