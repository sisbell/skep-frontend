"""STATIC — FP-15's grep over `web/` and the checks beside it that read the
tree (T4; M5, M10).

(i) no `fetch(`, `XMLHttpRequest`, `EventSource`, `__TAURI__`,
    `navigator.sendBeacon`, `WebSocket` outside `web/bridge/` and
    `web/gate/` — the bridge client is the page's only network code;
(ii) the seam's import direction: LK imports M-REC, P-REG and ST — the
    words a far end is named in (issue #132) — (and M-ADDR's pure
    `commonsType`, reported) and none of the drawing modules; the drawing
    modules read LK and never the links card; the reveal's setters are called
    by the card alone (`follow` by N-GO, S-32 (a); the gate's door excepted);
(iii) the layers in FP-11's order — the bridge, the model, `web/write/`, the
    drawing modules, the app — no module imports one above its own;
    `web/write/` imports the bridge, the model, `util.js` and its own modules
    alone; no module outside it, the gate's hooks and the tests apart, calls a
    bridge row that writes or composes a write (`WRITE_ROWS`), a family's read
    rows left to any module; and every `op: '<name>'` literal naming a wire
    write — the list M-FRAMES's test holds READ_OPS clear of — stands in a
    module under `web/write/`, the gate's hooks and the tests apart;
(iv) `index.html` loads one module script and nothing outside `web/` (FP-5);
(v) the shipped faces (issue #16): every `@font-face` in `style.css` loads a
    WOFF2 file under `web/fonts/` that is there — Charter in its four styles
    and Atkinson Hyperlegible Mono — never `local()`, each face beside its
    licence;
(vi) the rules' numbers: each number `PATTERNS.md` gives a rule heads one
    bullet, FP-1 to the highest without a gap; every rule cited under
    `web/` and `harness/` and in the documents at the root is one of them;
    and `AGENTS.md` states their range to the highest.
No page is needed: this case reads the tree."""
import os
import re

from . import ROOT, Result

WEB = os.path.join(ROOT, 'web')
NETWORK = ['fetch(', 'XMLHttpRequest', 'EventSource', '__TAURI__', 'sendBeacon', 'WebSocket']
# the layers in FP-11's order, bottom up, each by the folders and files it holds: its number is its place in this order, and the
# check reports it by its name; the gate's hooks and the tests (9) import any
LAYER = [
    (0, 'the bridge', ['bridge/']),
    (1, 'the model', ['model/', 'util.js', 'strings.js', 'plane/projection.js', 'plane/camera.js', 'plane/lod.js', 'plane/layout.js', 'plane/register.js', 'plane/labels.js']),
    (2, 'the words being written', ['write/']),
    (3, 'the drawing modules', ['links/', 'text/', 'beams/', 'nav/', 'line/', 'overlays/', 'scene/', 'plane/render.js']),
    (4, 'the app', ['app/']),
    (9, 'the gate and the tests', ['gate/', 'test/']),
]
# what `web/write/` may import: the bridge, the model, the leaf `util.js`, and a module of its own
WRITE_IMPORTS = ['bridge/', 'model/', 'util.js', 'write/']
# B-PORT's exports for the bridge's rows that write or compose a write, each by its name on the port — a family's row as
# `family.row`, a family every row of which is one by the family alone: the publication family's panel and its three acts on
# it, the merge family, `history.restore`, `upload`, `restore`, `resolve` (WIRE's READ_ROWS refuses each of the owner's
# provider). No module outside `web/write/` calls one; a family's read — `publication.standing`, `history.past` — is no row here
WRITE_ROWS = ['publication.open', 'publication.count', 'publication.confirm', 'publication.cancel', 'merge', 'history.restore', 'upload', 'restore', 'resolve']
PORT = 'bridge/port.js'
# the wire's writes, read from the list M-FRAMES's test holds READ_OPS clear of: a literal naming one composes a write frame
WIRE_WRITES = re.compile(r'const WRITES = \[([^\]]*)\]')
OP_LITERAL = re.compile(r"""\bop:\s*'(\w+)'""")
DRAWERS = ['beams/beams.js', 'text/layer.js', 'plane/render.js', 'scene/scene.js', 'overlays/anatomy-card.js']
SETTERS = ['reveal', 'hide', 'setOthers', 'lens', 'clearLens']
# the rules: the bullet each heads in PATTERNS.md, a citation of one, and the range AGENTS.md states
RULE = re.compile(r'^- \*\*FP-(\d+) ', re.M)
CITE = re.compile(r'\bFP-(\d+)')
RANGE = re.compile(r'\(FP-1\s*…\s*FP-(\d+)\)')
DOCS = ['README.md', 'AGENTS.md', 'PATTERNS.md']
CITING = ('.js', '.html', '.css', '.py', '.sh')


def files():
    out = []
    for dp, _, fns in os.walk(WEB):
        for fn in fns:
            if fn.endswith('.js') or fn.endswith('.html'):
                p = os.path.join(dp, fn)
                out.append(os.path.relpath(p, WEB).replace(os.sep, '/'))
    return sorted(out)


def layer_of(rel):
    for n, _, prefixes in LAYER:
        for p in prefixes:
            if rel == p or rel.startswith(p):
                return n
    return None


def layer_name(n):
    return next(name for m, name, _ in LAYER if m == n)


def imports_of(src):
    """the static import targets of a module (relative paths)"""
    return re.findall(r"""^\s*import\s+(?:[^'"]*?\s+from\s+)?['"]([^'"]+)['"]""", src, re.M)


def target_of(f, imp):
    """an import's target by its path under web/, from the module that names it"""
    return os.path.normpath(os.path.join(os.path.dirname(f), imp)).replace(os.sep, '/')


def write_calls(f, src):
    """each call a module makes of a bridge row that writes (`WRITE_ROWS`): through the port's namespace, a row it imports by
    name, or a row of a family it imports by name"""
    out = []
    rows = '|'.join(re.escape(row) for row in WRITE_ROWS)
    for names, imp in re.findall(r"""^\s*import\s+([^'"]*?)\s+from\s+['"]([^'"]+)['"]""", src, re.M):
        if not imp.startswith('.') or target_of(f, imp) != PORT:
            continue
        spaces = re.findall(r'\*\s+as\s+(\w+)', names)
        named = [n.split(' as ')[0].strip() for n in re.findall(r'\{([^}]*)\}', names)[0].split(',')] if '{' in names else []
        out += [f'{f}: imports `{n}`' for n in named if n in WRITE_ROWS]
        for family in sorted({row.split('.')[0] for row in WRITE_ROWS if '.' in row} & set(named)):
            members = '|'.join(re.escape(row.split('.', 1)[1]) for row in WRITE_ROWS if row.startswith(family + '.'))
            out += [f'{f}:{src.count(chr(10), 0, m.start()) + 1}: {m.group(0)}' for m in re.finditer(r'\b' + family + r'\.(' + members + r')\b', src)]
        for ns in spaces:
            out += [f'{f}:{src.count(chr(10), 0, m.start()) + 1}: {m.group(0)}' for m in re.finditer(r'\b' + ns + r'\.(' + rows + r')\b', src)]
    return out


def wire_writes(sources):
    """the wire's write ops, as the list M-FRAMES's test holds names them"""
    m = WIRE_WRITES.search(sources.get('model/frames.test.js', ''))
    return re.findall(r"'(\w+)'", m.group(1)) if m else []


def write_literals(f, src, writes):
    """each `op: '<name>'` literal of a module that names a wire write"""
    return [f'{f}:{src.count(chr(10), 0, m.start()) + 1}: {m.group(0)}' for m in OP_LITERAL.finditer(src) if m.group(1) in writes]


def rule_heads(patterns):
    """each number PATTERNS.md gives a rule, with the lines of the bullets it heads"""
    heads = {}
    for m in RULE.finditer(patterns):
        heads.setdefault(int(m.group(1)), []).append(patterns.count('\n', 0, m.start()) + 1)
    return heads


def citing():
    """every file that may cite a rule by its number — the page's and the gate's sources and the documents at the root —
    by its path from the root"""
    out = list(DOCS)
    for folder in ('web', 'harness'):
        for dp, _, fns in os.walk(os.path.join(ROOT, folder)):
            out += [os.path.relpath(os.path.join(dp, fn), ROOT).replace(os.sep, '/') for fn in fns if fn.endswith(CITING)]
    return sorted(out)


def run(ctx):
    r = Result()
    allf = files()
    sources = {f: open(os.path.join(WEB, f), encoding='utf8').read() for f in allf}
    # (i) the network surfaces
    hits = []
    for f, src in sources.items():
        if f.startswith('bridge/') or f.startswith('gate/'):
            continue
        for i, line in enumerate(src.split('\n'), 1):
            for tok in NETWORK:
                if tok in line:
                    hits.append(f'{f}:{i}: {tok}')
    r.check(not hits, 'no network surface outside web/bridge/ and web/gate/ (FP-15)', hits)
    # (ii) the seam
    lk = sources.get('links/links.js', '')
    lk_imports = imports_of(lk)
    allowed = {'../model/records.js', '../plane/register.js', '../model/address.js', '../strings.js'}
    r.check(set(lk_imports) <= allowed, 'LK imports M-REC, P-REG, ST (and M-ADDR) alone', lk_imports)
    r.figures['lk_imports'] = lk_imports
    for d in DRAWERS:
        src = sources.get(d, '')
        imps = imports_of(src)
        r.check(any(x.endswith('links/links.js') for x in imps), f'{d} reads LK', imps)
        r.check(not any('links-card' in x for x in imps), f'{d} does not import the links card (M10)', imps)
    bad_setters = []
    for f, src in sources.items():
        if f.endswith('.test.js') or f.startswith('test/') or f.startswith('gate/'):
            continue
        for s in SETTERS:
            for mm in re.finditer(r'LK\.' + s + r'\(', src):
                if f != 'overlays/links-card.js':
                    bad_setters.append(f'{f}: LK.{s}(')
        for mm in re.finditer(r'LK\.follow\(', src):
            if f != 'nav/go.js':
                bad_setters.append(f'{f}: LK.follow(')
    r.check(not bad_setters, "nothing but the links card's acts sets the reveal; `follow` is N-GO's", bad_setters)
    sel = sources.get('overlays/selection.js', '')
    sel_card_uses = set(re.findall(r'LINKS\.(\w+)', sel))
    r.check(sel_card_uses <= {'show'}, 'the selection asks the card to show and reads nothing of it', sorted(sel_card_uses))
    # (iii) the layers, what `web/write/` imports, and who calls a row that writes
    upward, beyond, writes, literals = [], [], [], []
    wire = wire_writes(sources)
    for f, src in sources.items():
        if not f.endswith('.js') or f.endswith('.test.js'):
            continue
        lf = layer_of(f)
        if lf is None or lf == 9:
            continue
        if not f.startswith('write/'):
            literals += write_literals(f, src, wire)
        for imp in imports_of(src):
            if not imp.startswith('.'):
                upward.append(f'{f}: bare import {imp}')
                continue
            target = target_of(f, imp)
            lt = layer_of(target)
            if lt is None:
                upward.append(f'{f}: {imp} -> {target} (unknown layer)')
            elif lt > lf:
                upward.append(f'{f} ({layer_name(lf)}) imports {target} ({layer_name(lt)})')
            if f.startswith('write/') and not any(target == p or target.startswith(p) for p in WRITE_IMPORTS):
                beyond.append(f'{f} imports {target}')
        if not f.startswith('write/') and not f.startswith('bridge/'):
            writes += write_calls(f, src)
    r.check(not upward, "no module imports one above its layer in FP-11's order, `write/` between the model and the drawing modules (issue #434)", upward)
    r.check(not beyond, 'web/write/ imports the bridge, the model, util.js and its own modules alone (issue #434)', beyond)
    r.check(not writes, 'no module outside web/write/ calls a bridge row that writes (FP-14; issue #434)', writes)
    r.check(len(wire) >= 5 and 'insert' in wire, "the wire's writes are read from the list M-FRAMES's test holds", wire)
    r.check(not literals, "no module outside web/write/ holds an `op: '<name>'` literal naming a wire write (FP-11)", literals)
    r.figures['write_rows'] = WRITE_ROWS
    r.figures['wire_writes'] = wire
    # (iv) the page loads one module script and nothing outside web/
    html = sources.get('index.html', '')
    scripts = re.findall(r'<script[^>]*src="([^"]+)"', html)
    links = re.findall(r'<link[^>]*href="([^"]+)"', html)
    r.check(scripts == ['app/main.js'], 'index.html loads app/main.js as its one script', scripts)
    r.check(all(not re.match(r'^(https?:)?//', x) for x in scripts + links), 'nothing outside web/ is loaded (FP-5)', scripts + links)
    # (v) the shipped faces: files under web/fonts/, never local(), each beside its licence
    css = open(os.path.join(WEB, 'style.css'), encoding='utf8').read()
    faces = re.findall(r'@font-face\s*\{([^}]*)\}', css)
    srcs = [u.strip('\'"') for f in faces for u in re.findall(r'url\(([^)]+)\)', f)]
    families = {re.search(r'font-family:\s*"?([^";]+)"?', f).group(1).strip() for f in faces if re.search(r'font-family:', f)}
    charter = [f for f in faces if 'Charter' in f]
    styles = sorted((re.search(r'font-style:\s*(\w+)', f).group(1), re.search(r'font-weight:\s*([\d ]+)', f).group(1).strip()) for f in charter)
    missing = [u for u in srcs if not os.path.isfile(os.path.join(WEB, u))]
    r.check(bool(faces) and len(srcs) == len(faces) and all(re.match(r'^fonts/[^/]+\.woff2$', u) for u in srcs) and not missing and not any('local(' in f for f in faces),
            'every @font-face loads a WOFF2 file under web/fonts/ that is there, never local() (issue #16)', {'srcs': srcs, 'missing': missing})
    r.check(families == {'Charter', 'Atkinson Hyperlegible Mono'} and styles == [('italic', '400'), ('italic', '700'), ('normal', '400'), ('normal', '700')],
            'the two shipped faces: Charter in its four styles, Atkinson Hyperlegible Mono (issue #16)', {'families': sorted(families), 'charter': styles})
    licences = [n for n in ('charter-license.txt', 'atkinson-hyperlegible-mono-OFL.txt') if not os.path.isfile(os.path.join(WEB, 'fonts', n))]
    r.check(not licences, 'each shipped face beside its licence (issue #16)', licences)
    # (vi) the rules' numbers: each heads one bullet, every citation names one, AGENTS.md's range ends at the highest
    heads = rule_heads(open(os.path.join(ROOT, 'PATTERNS.md'), encoding='utf8').read())
    top = max(heads, default=0)
    twice = {f'FP-{n}': at for n, at in sorted(heads.items()) if len(at) > 1}
    gaps = [f'FP-{n}' for n in range(1, top + 1) if n not in heads]
    r.check(bool(heads) and not twice and not gaps, 'PATTERNS.md numbers each rule once, from FP-1 to the highest without a gap',
            {'highest': top, 'twice': twice, 'missing': gaps})
    unknown, cites = [], 0
    for rel in citing():
        for i, line in enumerate(open(os.path.join(ROOT, rel), encoding='utf8').read().split('\n'), 1):
            for n in CITE.findall(line):
                cites += 1
                if int(n) not in heads:
                    unknown.append(f'{rel}:{i}: FP-{n}')
    r.check(not unknown, 'every rule cited under web/ and harness/ and in the documents at the root is one PATTERNS.md numbers', unknown)
    stated = RANGE.search(open(os.path.join(ROOT, 'AGENTS.md'), encoding='utf8').read())
    r.check(stated is not None and int(stated.group(1)) == top, "AGENTS.md states the rules' range to the highest PATTERNS.md numbers",
            {'stated': stated.group(0) if stated else None, 'highest': top})
    r.figures['rules'] = top
    r.figures['rule_citations'] = cites
    r.figures['faces'] = srcs
    r.figures['files'] = len(allf)
    return r.out()
