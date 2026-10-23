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
BEAMED = '1.0.1.0.34'        # a citer of FAR_LEAP whose citations reach four editions the plane draws — .127, .946, .931, .999 — the
                             # first edition's every citation reaching a ghost, which a tail names (issue #132): where the beams are read
AGENT_SPACE = '1.0.1.1'      # the claimant's delegated agent space
SECOND_ACCOUNT = '1.0.2'     # the seed's keyless second account
WITHHELD = '1.0.2.0.2'       # its draft: withheld from every reader of this board, a box of its own (continuation depth 0)
VERSIONED = '1.0.1.0.43'     # an edition with two members, the latest holding all of it, far from every place the later cases read
NO_MATCH = 'qzx no label holds this'  # LEAP text no address, share form, URL, label or address prefix answers
EDITION_CLASS = '1.1.0.1.0.1.0.3.14'  # R20's edition claim: every edition claim's type, its descriptive subtypes beneath it by prefix


def fields(addr):
    """an address's fields, split at its zeros (the page's `fieldsOf`)"""
    out = [[]]
    for c in addr.split('.'):
        if c == '0':
            out.append([])
        else:
            out[-1].append(c)
    return out


def account_of(addr):
    """the account an address lies under (the page's `accountOf`); None above an account"""
    f = fields(addr)
    return '.'.join(f[0]) + '.0.' + '.'.join(f[1]) if len(f) >= 2 and f[1] else None


def home_of(addr):
    """an address through its whole document field, a version member's components kept — the board's `document_of`
    (the page's `homeOf`); None above a document"""
    f = fields(addr)
    return '.0.'.join('.'.join(x) for x in f[:3]) if len(f) >= 3 and f[2] else None


def trunk_of(addr):
    """the trunk document an address lies under (the page's `documentOf`); None above a document"""
    f = fields(addr)
    return '.0.'.join(['.'.join(f[0]), '.'.join(f[1]), f[2][0]]) if len(f) >= 3 and f[2] else None


def unit_span(addr):
    """an address's unit span: the address, and a width of as many components, zeros then 1 (wire.md)"""
    n = len(addr.split('.'))
    return {'start': addr, 'width': '.'.join(['0'] * (n - 1) + ['1'])}

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

    def resize(self, width, height):
        """the page's window set to `width` × `height` CSS px — the device metrics the driver launched the page with, at
        another size, a scale factor of 1 — and three frames let pass for the page's `resize` and its redraw; answers
        the size the window had, read from the page, to put back"""
        was = self.js('[window.innerWidth, window.innerHeight]')
        self.drv.call('Emulation.setDeviceMetricsOverride', {'width': width, 'height': height, 'deviceScaleFactor': 1, 'mobile': False})
        self.frames(3)
        return was

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
        """the camera over a document's first column's centre (issue #15's fold: its text stands in columns inside its
        room) at an em of `em` px"""
        at = self.js('window.__skep.centreOf(%s, null)' % json.dumps(addr))
        scale = self.js('window.__skep.scaleFor(%s, "em", %s)' % (json.dumps(addr), em))
        self.set_view(at['x'], at['y'], scale)
        return scale

    def view_at(self, addr, pos, scale=None):
        """the camera centred where a reading view of a document at a position centres — the line holding it, across its
        column (the page's `centreOf`) — at `scale`, or the scale it stands at"""
        at = self.js('window.__skep.centreOf(%s, %s)' % (json.dumps(addr), json.dumps(pos)))
        self.set_view(at['x'], at['y'], scale if scale is not None else self.camera()['scale'])

    def view_doc_px(self, addr, px):
        box = self.js('window.__skep.boxOf(%s)' % json.dumps(addr))
        scale = self.js('window.__skep.scaleFor(%s, "doc", %s)' % (json.dumps(addr), px))
        self.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] / 2, scale)
        return scale

    def longest_edition(self, account='1.0.1'):
        """the longest edition an account's index lists on the open page — the board's own span set of each, read by the
        harness's token-free reads, never the page's — and every edition's extent read; kept for the run, so the cases
        after the first that asks read it once"""
        key = 'longest:' + account
        if key not in self.shared:
            docs = [q['doc'] for q in self.js('window.__skep.model.places()') if not q['system'] and q['kind'] == 'edition' and account_of(q['doc']) == account]
            extents = {}
            for addr in docs:
                ans = self.daemon_op({'op': 'retrieve_doc_v_span_set', 'doc': addr})
                for x in (ans.get('set') or []) if isinstance(ans, dict) else []:
                    if x['start'].startswith('1.'):
                        extents[addr] = int(x['width'].split('.')[-1])
            self.shared[key] = (max(extents, key=extents.get) if extents else None, extents, len(docs))
        return self.shared[key]

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

    def recorded_ops(self):
        """the open page's own `op` calls as its bridge client recorded them under the gate's door — each frame, and the
        answer's envelope (`result` or `refused`) parsed"""
        out = []
        for c in self.js('window.__skep.bridge.calls().filter((c) => c.name === "op" && c.answer).map((c) => ({frame: c.frame, answer: c.answer}))') or []:
            try:
                out.append((json.loads(c['frame']), json.loads(c['answer'])))
            except (TypeError, ValueError):
                pass
        return out

    def edition_clause(self, origin, owner=None):
        """C-67's clause beneath a withheld run of `origin` (PUB-5.124), decided here, apart from the page's code, from the
        open page's own recorded reads by the rule's words: the active view's lookup of the edition claims on the
        origin (`find_links_ftt`, the origin's unit span in `to` and the edition class's in `ty`), each listed claim's
        `read_link` and its home's `doc_metadata`. A claim is admitted (PUB-5.99) where its type lies under the edition
        class, its home is published, that home is not its claimant's doc 1, and the claimant — the home's owner — is
        `owner` or under it (the origin's account where none is given: a withheld origin's metadata is read by no one
        it is withheld from) — a home the board refused `withheld` or `doc_not_registered` admitted nowhere; it passes
        where its FROM holds a span and none lies in the origin. Decided over the whole admitted set (RES-164): the
        pointer where any passes, following the passing claim PUB-3.107's origin-keyed order picks (RES-152) — one
        whose claimant is `owner` first, the lowest-addressed of several as tumblers, else the lowest-addressed passing
        claim — named in what it was decided from (`claim`, its `home`); the QUOTING sibling, naming the
        lowest-addressed claimant, where every one quotes; nothing — None — where none is admitted, where the lookup
        was not answered, or where a listed claim's read was not, unless one passes. Answers the string id, or None,
        and what it was decided from"""
        owner = owner or account_of(origin)
        calls = self.recorded_ops()
        lookup = {'op': 'find_links_ftt', 'q': {'from': 'any', 'home': 'any', 'to': [unit_span(origin)], 'ty': [unit_span(EDITION_CLASS)]}}

        def last(frame):
            got = [a for f, a in calls if f == frame]
            return got[-1] if got else None

        seen = {'lookups': sum(1 for f, _ in calls if f == lookup), 'audit': sum(1 for f, _ in calls if isinstance(f, dict) and f.get('op') == 'edition_claims'), 'claims': []}
        listed = (last(lookup) or {}).get('result')
        if not isinstance(listed, dict) or listed.get('resp') != 'addrs':
            return None, seen
        passing, quoting, undecided = [], [], False
        for claim in listed.get('addrs') or []:
            home = home_of(claim) or claim
            link, meta = last({'op': 'read_link', 'a': claim}) or {}, last({'op': 'doc_metadata', 'doc': home}) or {}
            slots = ((link.get('result') or {}).get('link') or {}).get('slots')
            row = {'claim': claim, 'home': home}
            seen['claims'].append(row)
            if (meta.get('refused') or {}).get('name') in ('withheld', 'doc_not_registered'):
                row['admitted'] = False  # a home the board will not describe is admitted nowhere
                continue
            if slots is None or not isinstance(meta.get('result'), dict):
                row['admitted'] = None
                undecided = True
                continue
            m, types = meta['result'], (slots[2] if len(slots) > 2 else [])
            ty, claimant = (types[0]['start'] if types else None), m.get('owner') or ''
            row['admitted'] = (ty is not None and (ty == EDITION_CLASS or ty.startswith(EDITION_CLASS + '.')) and m.get('published') is True
                               and trunk_of(home) != claimant + '.0.1' and (claimant == owner or claimant.startswith(owner + '.')))
            if not row['admitted']:
                continue
            frm = slots[0] if slots else []
            if frm and not any(home_of(s['start']) == origin for s in frm):
                passing.append((claim, claimant))
            else:
                quoting.append(claimant)
        tumbler = lambda a: [int(x) for x in a.split('.')]
        if passing:
            own = [c for c, claimant in passing if claimant == owner]
            seen['claim'] = min(own or [c for c, _ in passing], key=tumbler)
            seen['home'] = home_of(seen['claim'])
            return 'C-67.pointer', seen
        if undecided or not quoting:
            return None, seen
        seen['claimant'] = sorted(quoting, key=tumbler)[0]
        return 'C-67.quoting', seen

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
