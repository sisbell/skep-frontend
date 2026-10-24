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
import hashlib
import importlib
import json
import os
import re
import struct
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
CLAUSE_UNREAD = 'L.clause.unread'     # C-67's place where a read of the edition claims failed: "edition claims not read" (issue #186)
HOME = '1.0.1.0.1'           # the claimant's home document: its key record, one atom at position 1


def key_fingerprint(alg, key_hex):
    """a key's fingerprint, decided here apart from the page's (AUTH-1.8): SHA-256 over the tag `skep-key-v1`, then the alg
    token and the raw key bytes, each framed by its 4-byte big-endian length (AUTH-1.12), as 64 lowercase hex"""
    raw, name = bytes.fromhex(key_hex), alg.encode('utf8')
    return hashlib.sha256(b'skep-key-v1' + struct.pack('>I', len(name)) + name + struct.pack('>I', len(raw)) + raw).hexdigest()


def item_words(ctx):
    """each kind of item that holds no text in the strings table's words (issue #161), by kind: what the ARIA mirror
    announces at the item and a copy's stand-in names it by"""
    return ctx.js('(async () => { const {t} = await import("./strings.js"); return {record: t("L.item.record"), reference: t("L.item.reference"), '
                  'withheld: t("L.item.withheld"), unshown: t("L.item.unshown")}; })()')


# is every glyph of an element inside the platform's selection: each of its text nodes, from its first character to its last,
# within the selection's range — what a person sees drawn selected
SELECTED_WHOLE = '''((sel) => { const e = document.querySelector(sel), s = window.getSelection();
  if (!e || !s || !s.rangeCount || s.isCollapsed) return false;
  const r = s.getRangeAt(0), w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT), nodes = [];
  for (let n = w.nextNode(); n; n = w.nextNode()) if (n.data.length) nodes.push(n);
  return nodes.length > 0 && nodes.every((n) => r.comparePoint(n, 0) === 0 && r.comparePoint(n, n.data.length) === 0); })(%s)'''


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


# ---- the byline's facts and the placeholder sweep (issue #208; FP-34) ------------------------------------------------

ENROLL_CLASS = '1.1.0.1.0.1.0.3.1'  # wire.md §Credentials: enroll — `from` the record's positions in its home, `to` the subject account
# each cause a byline names in its slots' place, by the string the page says it in (the strings table's ids)
CAUSE_WORDS = {'unsigned': 'F.slot.unsigned', 'by-reference': 'L.slot.by-reference', 'not-recorded': 'F.slot.not-recorded',
               'withheld': 'F.corner.withheld', 'unreachable': 'F.daemon.unreachable', 'unread': 'L.slot.unread'}


def parent_account(account):
    """the account directly above an account: its user field less its last component; None above a top-level one"""
    f = fields(account)
    return '.'.join(f[0]) + '.0.' + '.'.join(f[1][:-1]) if len(f) == 2 and len(f[1]) >= 2 else None


def tumbler(addr):
    """an address's components, for address order"""
    return [int(x) for x in addr.split('.')]


def cue_of(fingerprint):
    """a fingerprint's cue: its first four groups of four hex digits, spaced (foundations §2.1's account row)"""
    return ' '.join(fingerprint[i:i + 4] for i in range(0, 16, 4))


def byline_facts(ctx, account):
    """An account's byline facts, decided here apart from the page's by the harness's own token-free reads of the board (R22's
    naming input: "the sole DEVICE-FLAGGED entry of its GENESIS ENROLLMENT"): its credential table first — with no key
    enrolled and none retired, the tables above it, by reference where one holds a key and unsigned where none does; else
    the enrollment records whose own `to` names it alone, the genesis the first homed outside its own account, else the
    lowest-addressed homed in it, by home then by link; its record atom placed in its home's text through the home's V→I
    image and read; the record's one entry flagged a device — its label, None where it carries none, and its fingerprint.
    Not recorded where no genesis stands, the image places no byte of it, or the record names not exactly one device; a
    refusal its cause. Answers {'label', 'fingerprint'} or {'cause'[, 'owner']}"""
    def why(answer, about):
        return {'cause': 'withheld', 'owner': account_of(about) or about} if answer.get('code') == 'withheld' else {'cause': 'unread'}
    ks = ctx.daemon_op({'op': 'key_set', 'account': account})
    if ks.get('resp') != 'key_set':
        return why(ks, account)
    if not ks.get('enrolled') and not ks.get('retired'):
        up = parent_account(account)
        while up:
            above = ctx.daemon_op({'op': 'key_set', 'account': up})
            if above.get('resp') != 'key_set':
                return why(above, up)
            if above.get('enrolled'):
                return {'cause': 'by-reference'}
            up = parent_account(up)
        return {'cause': 'unsigned'}
    found = ctx.daemon_op({'op': 'find_links_ftt', 'q': {'from': 'any', 'home': 'any', 'to': [unit_span(account)], 'ty': [unit_span(ENROLL_CLASS)]}})
    if found.get('resp') != 'addrs':
        return why(found, account)
    records = []
    for link in found.get('addrs') or []:
        v = ctx.daemon_op({'op': 'read_link', 'a': link})
        if v.get('resp') != 'link_value':
            return why(v, home_of(link) or link)
        slots = (v.get('link') or {}).get('slots') or []
        frm, to = (list(slots) + [[], []])[:2]
        if len(to) == 1 and to[0]['start'] == account and frm and len(fields(frm[0]['start'])) >= 4:
            records.append((account_of(home_of(link)) == account, tumbler(home_of(link)), tumbler(link), home_of(link), frm[0]['start']))
    if not records:
        return {'cause': 'not-recorded'}
    _, _, _, home, atom = min(records)
    span = ctx.daemon_op({'op': 'retrieve_doc_v_span_set', 'doc': home})
    if span.get('resp') != 'span_set':
        return why(span, home)
    extent = next((int(x['width'].split('.')[-1]) for x in span.get('set') or [] if x['start'].startswith('1.')), 0)
    image = ctx.daemon_op({'op': 'image', 'd': home, 'region': [{'start': '1.1', 'width': '0.%d' % extent}]}) if extent else {'resp': 'runs', 'runs': []}
    if image.get('resp') != 'runs':
        return why(image, home)
    prefix, ordinal, at, pos = atom.rsplit('.', 1)[0], int(atom.rsplit('.', 1)[1]), None, 1
    for run in image.get('runs') or []:
        i_prefix, i_ordinal, width = run['i_start'].rsplit('.', 1)[0], int(run['i_start'].rsplit('.', 1)[1]), int(run['width'].split('.')[-1])
        if at is None and i_prefix == prefix and i_ordinal <= ordinal < i_ordinal + width:
            at = pos + ordinal - i_ordinal
        pos += width
    if at is None:
        return {'cause': 'not-recorded'}
    got = ctx.daemon_op({'op': 'retrieve_v', 'specs': [{'doc': home, 'span': {'start': '1.%d' % at, 'width': '0.1'}}]})
    if got.get('resp') != 'delivery':
        return why(got, home)
    item = (got.get('items') or [{}])[0]
    try:
        record = json.loads(item['atom']) if isinstance(item.get('atom'), str) else None
    except ValueError:
        record = None
    keys = record.get('keys') if isinstance(record, dict) and record.get('type') == 'skep-enroll' and isinstance(record.get('keys'), list) else []
    devices = [k for k in keys if isinstance(k, dict) and not k.get('anchor')]
    if len(devices) != 1 or not isinstance(devices[0].get('alg'), str) or not isinstance(devices[0].get('key'), str):
        return {'cause': 'not-recorded'}
    label = devices[0].get('label')
    return {'label': label if isinstance(label, str) and label else None, 'fingerprint': key_fingerprint(devices[0]['alg'], devices[0]['key'])}


def byline_expected(ctx, facts, own):
    """what a byline's slots show and are named, from an account's facts (`byline_facts`) as the page's strings say them:
    the device label's slot — its label, or the words for a label not given — and, on a byline not the reader's own, the
    fingerprint cue's; where a cause names none, its words in the first slot and the second empty, each slot named by its
    role and the cause's words"""
    t = lambda sid, values=None: ctx.js('(async () => (await import("./strings.js")).t(%s, %s))()' % (json.dumps(sid), json.dumps(values or {})))
    named = lambda role, shows: t('L.slot.named', {'role': t('L.slot.device-label' if role == 'label' else 'L.slot.fingerprint'), 'shows': shows})
    if 'cause' in facts:
        words = t(CAUSE_WORDS[facts['cause']], {'owner': facts.get('owner', '')})
        shows = [words] if own else [words, '']
        return {'shows': shows, 'names': [named('label', words)] + ([] if own else [named('fingerprint', words)])}
    label = facts['label'] or t('L.slot.unlabelled')
    shows = [label] if own else [label, cue_of(facts['fingerprint'])]
    return {'shows': shows, 'names': [named('label', label)] + ([] if own else [named('fingerprint', shows[1])])}


# a byline as the page shows it in an article's head (`%s` the article's selector): its owner's words and each slot — the words
# its box shows, its own text apart from the whole a cut label carries for its act, the whole, and its accessible name
BYLINE_SHOWN = '''((sel) => { const by = document.querySelector(sel + ' .hd .by'); if (!by) return null;
  const own = (e) => { const c = e.cloneNode(true); c.querySelectorAll('.whole').forEach((w) => w.remove()); return c.textContent; };
  return {owner: by.firstChild && by.firstChild.nodeType === 3 ? by.firstChild.data : null,
          slots: [...by.querySelectorAll('.slot')].map((s) => ({role: s.dataset.slot, shows: own(s), whole: (s.querySelector('.whole') || {}).textContent || null,
                                                               name: s.getAttribute('aria-label'), pending: s.classList.contains('pending')}))}; })(%s)'''


def byline_shown(ctx, article):
    """a byline as the page shows it in the article a selector names (`BYLINE_SHOWN`); None where no head stands"""
    return ctx.js(BYLINE_SHOWN % json.dumps(article))


# THE PLACEHOLDER SWEEP's page half (issue #208's design decision: "A slot never shows its template placeholder"; "Test for the
# placeholders themselves, not for angle brackets, because some deliberate marks use brackets"): every placeholder the strings
# table's templates hold — each ⟨token⟩ of each template, matched whole, never a bracket alone — that the page shows or tells
# now — in its text, every text node in the body; in the attributes that name or describe an element to a person or to
# assistive technology; in a field's value; in the labels the plane's canvas set — with the documents' own words taken out
# first: the text of a block in an article, wherever an article stands, and every stretch the page quotes of what a document
# holds — a span between quotes a held text holds, a text whole that opens a held text or label, cut or not (the mirror quotes
# blocks and labels, the LEAP box and the trail list show labels). Each hit with its source, its token, its context and where it
# stands. `window.__gateTokens` and `window.__gateStrip` are kept for the AX tree's names (`placeholder_sweep`)
SWEEP_PAGE = r'''(async () => {
  const R = await import('./model/records.js'), S = await import('./strings.js');
  const TOKENS = [...new Set(Object.values(S.STRINGS).flatMap((e) => [...e.text.matchAll(/⟨[^⟩]*⟩/g)].map((m) => m[0])))];
  window.__gateTokens = TOKENS;
  const fold = (s) => String(s || '').replace(/\s+/g, ' ').trim(), cut = (s) => s.replace(/…$/, '').trim();
  const corpus = [];
  for (const d of R.docs()) { for (const b of d.blocks || []) if (b.text) corpus.push(fold(b.text)); if (d.label) corpus.push(fold(d.label)); }
  for (const p of R.places()) if (p.label) corpus.push(fold(p.label));
  const holds = (s) => !!s && corpus.some((c) => c.includes(s)), opens = (s) => !!s && corpus.some((c) => c.startsWith(s));
  /** a text with the documents' own words it quotes taken out: the whole where it opens a held text or label; the stretch between its outermost quotes, then each quoted stretch, where a held text holds it */
  const strip = (raw) => {
    let s = fold(raw);
    if (opens(cut(s))) return '';
    for (const [a, b] of [['"', '"'], ['“', '”']]) {
      const i = s.indexOf(a), j = s.lastIndexOf(b);
      if (i >= 0 && j > i && holds(cut(fold(s.slice(i + 1, j))))) s = s.slice(0, i + 1) + s.slice(j);
      s = s.replace(new RegExp(a + '([^' + b + ']*)' + b, 'g'), (m, inner) => (holds(cut(fold(inner))) ? a + b : m));
    }
    return s;
  };
  window.__gateStrip = (texts) => texts.map((x) => strip(x));
  const where = (e) => { const parts = []; for (let x = e; x && x !== document.body && parts.length < 4; x = x.parentElement) parts.unshift(x.id ? '#' + x.id : x.tagName.toLowerCase() + (x.classList && x.classList.length ? '.' + [...x.classList].slice(0, 2).join('.') : '')); return parts.join(' > '); };
  const hits = [];
  const sweep = (source, raw, at) => {
    if (!String(raw || '').includes('⟨')) return;
    const s = strip(raw);
    for (const token of TOKENS) for (let i = s.indexOf(token); i >= 0; i = s.indexOf(token, i + token.length)) hits.push({source, token, context: s.slice(Math.max(0, i - 32), i + token.length + 32), at});
  };
  const chrome = '.hairline, .pubmark, .sym, .edge, .rec';
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) {
    const p = n.parentElement;
    if (!p || p.closest('script, style, template')) continue;
    if (p.closest('article.dtext .run > .sp') && !p.closest(chrome)) continue;
    sweep('text', n.data, where(p));
  }
  for (const e of document.body.querySelectorAll('*')) {
    for (const a of ['title', 'aria-label', 'aria-description', 'aria-roledescription', 'aria-placeholder', 'aria-valuetext', 'placeholder', 'alt']) if (e.hasAttribute(a)) sweep('attr ' + a, e.getAttribute(a), where(e));
    if ((e.tagName === 'INPUT' || e.tagName === 'TEXTAREA') && e.value) sweep('value', e.value, where(e));
  }
  for (const l of window.__skep.labels()) for (const line of l.lines || []) sweep('canvas', line.text, l.kind + ' ' + l.place);
  return hits;
})()'''

# the AX tree's roles whose text is the DOM's own, swept there: a text run, and a listbox option, whose name is its row's text nodes
SWEEP_AX_SKIP = {'StaticText', 'InlineTextBox', 'option'}


def placeholder_sweep(ctx):
    """THE PLACEHOLDER SWEEP (issue #208): the page's half (`SWEEP_PAGE`) and the AX tree's — every node's name, description
    and value but those whose text is the DOM's own, searched for the same tokens of the strings table's templates, the
    documents' own words taken out as the page's half takes them — where CDP answers the tree, else that half's hits alone
    and a note. Answers the hits"""
    hits = ctx.js(SWEEP_PAGE)
    ax = ctx.drv.ax_tree()
    if 'error' in ax:
        return hits + [{'source': 'ax', 'token': None, 'context': 'Accessibility.getFullAXTree did not answer: ' + ax['error'], 'at': None}]
    found = []
    for n in ax.get('nodes', []):
        role = (n.get('role') or {}).get('value')
        if n.get('ignored') or role in SWEEP_AX_SKIP:
            continue
        for k in ('name', 'description', 'value'):
            v = (n.get(k) or {}).get('value')
            if isinstance(v, str) and '⟨' in v:
                found.append((role, k, v))
    if found:
        tokens = ctx.js('window.__gateTokens')
        stripped = ctx.js('window.__gateStrip(%s)' % json.dumps([v for _, _, v in found]))
        for (role, k, _), s in zip(found, stripped):
            for token in tokens:
                for m in re.finditer(re.escape(token), s):
                    hits.append({'source': 'ax ' + k, 'token': token, 'context': s[max(0, m.start() - 32):m.end() + 32], 'at': role})
    return hits

# the order the gate runs them in: the two that need no page first, then the
# wire's cold-open figures before the other classes move the camera; the wire
# holds the run's provider log to the first page's own calls, so every case
# that opens another page (`walks`, `guest`) runs after it
ALL = ['static', 'shapes', 'wire', 'rendered', 'text', 'layout', 'a11y', 'keys', 'frames', 'walks', 'shots', 'guest']

# the page issues the marked checks wait on; each mark comes off the day its check passes
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
        it is withheld from) — a home the board refused `withheld` or `doc_not_registered`, or read unpublished,
        admitted nowhere; it passes where its FROM holds a span and none lies in the origin. Decided over the whole
        admitted set (RES-164): the pointer where any passes, following the passing claim PUB-3.107's origin-keyed
        order picks (RES-152) — one whose claimant is `owner` first, the lowest-addressed of several as tumblers, else
        the lowest-addressed passing claim — named in what it was decided from (`claim`, its `home`); nothing — None —
        while a listed claim's read is not answered, unless one passes; "edition claims not read" (`CLAUSE_UNREAD`)
        where a listed claim's admission waits on a read the board refused for a reason that says nothing of what it
        reads — any but `withheld` for its link, any but `withheld` and `doc_not_registered` for its home — or did not
        answer (issue #186's design decision); the QUOTING sibling, naming the lowest-addressed claimant, where every
        admitted one quotes; nothing where none is admitted. The lookup not answered decides nothing — None — refused
        as `withheld` from the reader, nothing either, and refused any other way, or not answered by the board,
        "edition claims not read". Answers the string id, or None, and what it was decided from"""
        owner = owner or account_of(origin)
        calls = self.recorded_ops()
        lookup = {'op': 'find_links_ftt', 'q': {'from': 'any', 'home': 'any', 'to': [unit_span(origin)], 'ty': [unit_span(EDITION_CLASS)]}}

        def last(frame):
            got = [a for f, a in calls if f == frame]
            return got[-1] if got else None

        def refused(answer):
            """the name of the refusal an answer is, or None where it is none"""
            return ((answer or {}).get('refused') or {}).get('name')

        seen = {'lookups': sum(1 for f, _ in calls if f == lookup), 'audit': sum(1 for f, _ in calls if isinstance(f, dict) and f.get('op') == 'edition_claims'), 'claims': []}
        answer = last(lookup)
        if refused(answer) is not None:
            seen['lookup_refused'] = refused(answer)
            return (None if refused(answer) == 'withheld' else CLAUSE_UNREAD), seen
        listed = (answer or {}).get('result')
        if not isinstance(listed, dict) or listed.get('resp') != 'addrs':
            return None, seen
        passing, quoting, waiting, failed = [], [], False, False
        for claim in listed.get('addrs') or []:
            home = home_of(claim) or claim
            link, meta = last({'op': 'read_link', 'a': claim}) or {}, last({'op': 'doc_metadata', 'doc': home}) or {}
            slots = ((link.get('result') or {}).get('link') or {}).get('slots')
            row = {'claim': claim, 'home': home}
            seen['claims'].append(row)
            if refused(meta) in ('withheld', 'doc_not_registered') or (isinstance(meta.get('result'), dict) and meta['result'].get('published') is False):
                row['admitted'] = False  # a home the board will not describe, or one it reads unpublished, is admitted nowhere
                continue
            if slots is None or not isinstance(meta.get('result'), dict):
                row['admitted'] = None
                row['failed'] = ((slots is None and refused(link) not in (None, 'withheld'))
                                 or (not isinstance(meta.get('result'), dict) and refused(meta) is not None))
                if row['failed']:
                    failed = True
                else:
                    waiting = True
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
        if waiting:
            return None, seen
        if failed:
            return CLAUSE_UNREAD, seen
        if not quoting:
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
