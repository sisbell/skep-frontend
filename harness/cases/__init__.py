"""The fence's classes as Python modules over the driver (the structure
record §6.3; C8: the full seven classes). The MEASURING code lives in the
page's gate hooks (`web/gate/hooks.js`, `window.__skep`); the ASSERTING code
lives here, one module per class — rendered, keys, text, layout, wire,
frames, a11y — plus `static` (FP-15's grep and the no-write grep), `shapes`
(the declarations' drift), `walks` (W-01 and W-05 as camera scripts with
shots), `shots` (the threshold set) and `guest` (the page at guest class,
opened under `?gate=guest`). Each module's `run(ctx)` returns a
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
import urllib.parse
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
WITHHELD = '1.0.2.0.2'       # its draft: withheld from every reader of this board, a box of its own (continuation depth 0)
VERSIONED = '1.0.1.0.43'     # an edition with two members, the latest holding all of it, far from every place the later cases read
NO_MATCH = 'qzx no label holds this'  # LEAP text no address, share form, URL, label or address prefix answers

# the order the gate runs them in: the two that need no page first, then the
# wire's cold-open figures before the other classes move the camera; the wire
# holds the run's provider log to the first page's own calls, so every case
# that opens another page (`walks`, `guest`) runs after it
ALL = ['static', 'shapes', 'wire', 'rendered', 'text', 'layout', 'a11y', 'keys', 'frames', 'walks', 'shots', 'guest']

# the page issues the marked checks wait on; each mark comes off the day its check passes
# issue #12's boundary note
XFAIL_MEMBER = ("page: a version member shares its document's box, and once the member's text is loaded (read side by side, "
                "or a LEAP to the member) its article is mounted over the document's — which of them the box shows is the "
                "design's to rule (web/text/layer.js `frame`; web/plane/projection.js `docBox`)")
# issue #24's boundary note
XFAIL_FACE = ("page: the withheld run's face, B1-S7's placeholder, is set in the article's flow taller than the run's positions, "
              "which the face is fitted to as P-LAY's bars, so the text after it is pushed past the box's edge "
              "(web/text/article.js `withheldBlockHTML`, web/style.css `.dtext .withheld`)")
# issue #9's boundary note
XFAIL_BEAM_LABELS = ("page: each bundle's label is set at its first beam's end, so stubs bound for different documents that land near "
                     "each other on the view's border, below the saturation the merge per direction waits for, set their labels over "
                     "one another — what stands there is the design's to rule (web/beams/beams.js `draw`)")


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
    """what every case gets: the driver, the page's URL, the provider and the board, the folders, and a few verbs"""

    def __init__(self, drv, provider, board, secret, results, shots, env, page):
        self.drv, self.provider, self.board, self.secret = drv, provider, board, secret
        self.results, self.shots, self.env, self.page = results, shots, env, page
        self.shared = {}
        self._design_cache = {}
        try:
            log = self.provider_log()
            self.seq0 = log[-1]['seq'] if log else -1
        except Exception as e:  # the provider's log is read, never required
            self.seq0 = -1
            env['provider_log_error'] = str(e)

    # ---- the page -----------------------------------------------------------
    def open_page(self, gate):
        """the page opened afresh at the run's URL with `gate` its `?gate=` value — `all` the owner's signed page,
        `guest` the page at guest class, which asks no session — settled on its own signal; the page it replaces
        closes its session at `pagehide`. What the new page booted with is returned"""
        url = urllib.parse.urlsplit(self.page)
        query = [(k, v) for k, v in urllib.parse.parse_qsl(url.query, keep_blank_values=True) if k != 'gate'] + [('gate', gate)]
        self.drv.navigate(urllib.parse.urlunsplit(url._replace(query=urllib.parse.urlencode(query))))
        self.drv.settle(40)
        self.drv.pump_events(0.5)
        return self.js('window.__skep.boot')

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

    def overlay_shown(self):
        """the overlay as a person meets it: its kind, its text, and the acts it offers"""
        return self.js('({kind: window.__skep.overlay().kind, text: window.__skep.overlay().text || "", acts: document.querySelectorAll("#overlay [data-run]").length})')

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

    def key_store(self):
        """the device's key store as the provider answers `fingerprint` — read through the open page's port, a read of
        the store that writes nothing — and decided here, apart from the page's own reading: the board's origin, the
        store's rows, the bindings at that origin (each reads `⟨origin⟩ principal ⟨N⟩ account ⟨A⟩`, the origin its
        whole first field), whether any key is bound there, and the entitlement arm a guest meets for it by PUB-5.97's
        key-split defaults: C-36's key-present arm where one is, R56's key-absent arm where none is"""
        origin = self.js('window.__skep.model.board().origin')
        fp = self.js('(async () => (await import("./bridge/port.js")).fingerprint({}))()') or {}
        rows = fp.get('result') or []
        bound = [b for row in rows for b in row.get('bindings') or [] if b.startswith(origin + ' principal ')]
        return {'origin': origin, 'rows': rows, 'bound': bound, 'key_here': bool(bound), 'refused': fp.get('refused'),
                'guest_arm': 'C-36.guest.key' if bound else 'R56.key-absent'}

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
