"""STATIC — FP-15's grep and the no-write grep over `web/` (T4; M5, M9, M10).

(i) no `fetch(`, `XMLHttpRequest`, `EventSource`, `__TAURI__`,
    `navigator.sendBeacon`, `WebSocket` outside `web/bridge/` and
    `web/gate/` — the bridge client is the page's only network code;
(ii) no write op name of wire.md's writing sections composed anywhere in
    `web/` — every `op: '…'` literal names a read of `frames.js`'s READ_OPS
    (S-35 (a): a signed provider would commit a sent write);
(iii) the seam's import direction: LK imports M-REC, P-REG and ST — the
    words a far end is named in (issue #132) — (and M-ADDR's pure
    `commonsType`, reported) and nothing of layer 2; the drawing modules
    read LK and never the links card; the reveal's setters are called by the
    card alone (`follow` by N-GO, S-32 (a); the gate's door excepted);
(iv) the layers of the structure record §3.1: no module imports one above it;
(v) `index.html` loads one module script and nothing outside `web/` (FP-5);
(vi) the shipped faces (issue #16): every `@font-face` in `style.css` loads a
    WOFF2 file under `web/fonts/` that is there — Charter in its four styles
    and Atkinson Hyperlegible Mono — never `local()`, each face beside its
    licence.
No page is needed: this case reads the tree."""
import os
import re

from . import ROOT, Result

WEB = os.path.join(ROOT, 'web')
NETWORK = ['fetch(', 'XMLHttpRequest', 'EventSource', '__TAURI__', 'sendBeacon', 'WebSocket']
# the writing sections of docs/wire.md at the pin: Namespace, Arrangement, Links (writes)
WRITE_OPS = ['create_new_document', 'delegate', 'register_node', 'fork', 'insert', 'delete', 'copy', 'reinstate',
             'rearrange', 'version', 'publish', 'make_link', 'emit', 'nullify', 'assert_sup', 'edit_link']
LAYER = [
    (0, ['bridge/']),
    (1, ['model/', 'util.js', 'strings.js', 'plane/projection.js', 'plane/camera.js', 'plane/lod.js', 'plane/layout.js', 'plane/register.js', 'plane/labels.js']),
    (2, ['links/', 'text/', 'beams/', 'nav/', 'line/', 'overlays/', 'scene/', 'plane/render.js']),
    (3, ['app/']),
    (9, ['gate/', 'test/']),
]
DRAWERS = ['beams/beams.js', 'text/layer.js', 'plane/render.js', 'scene/scene.js', 'overlays/anatomy-card.js']
SETTERS = ['reveal', 'hide', 'setOthers', 'lens', 'clearLens']


def files():
    out = []
    for dp, _, fns in os.walk(WEB):
        for fn in fns:
            if fn.endswith('.js') or fn.endswith('.html'):
                p = os.path.join(dp, fn)
                out.append(os.path.relpath(p, WEB).replace(os.sep, '/'))
    return sorted(out)


def layer_of(rel):
    for n, prefixes in LAYER:
        for p in prefixes:
            if rel == p or rel.startswith(p):
                return n
    return None


def imports_of(src):
    """the static import targets of a module (relative paths)"""
    return re.findall(r"""^\s*import\s+(?:[^'"]*?\s+from\s+)?['"]([^'"]+)['"]""", src, re.M)


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
    # (ii) the no-write grep
    frames = sources.get('model/frames.js', '')
    m = re.search(r'READ_OPS\s*=\s*Object\.freeze\(\[(.*?)\]\)', frames, re.S)
    read_ops = re.findall(r"'([a-z_]+)'", m.group(1)) if m else []
    r.check(len(read_ops) >= 10, 'frames.js names its READ_OPS', read_ops)
    r.check(not set(read_ops) & set(WRITE_OPS), 'READ_OPS holds no write op', sorted(set(read_ops) & set(WRITE_OPS)))
    op_literals, writes = [], []
    pat = re.compile(r"""(?:\bop\s*:\s*|"op"\s*:\s*)['"]([a-z_]+)['"]""")
    for f, src in sources.items():
        if f.endswith('.test.js') or f.startswith('test/'):
            continue
        for i, line in enumerate(src.split('\n'), 1):
            for name in pat.findall(line):
                op_literals.append((f, i, name))
                if name in WRITE_OPS:
                    writes.append(f'{f}:{i}: {name}')
                elif name not in read_ops:
                    writes.append(f'{f}:{i}: {name} (not a READ_OP)')
    r.check(not writes, 'no write op composed anywhere in web/ (S-35 (a)); every op literal a read', writes)
    r.figures['op_literals'] = len(op_literals)
    r.figures['read_ops'] = read_ops
    # (iii) the seam
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
    # (iv) the layers
    upward = []
    for f, src in sources.items():
        if not f.endswith('.js') or f.endswith('.test.js'):
            continue
        lf = layer_of(f)
        if lf is None or lf == 9:
            continue
        base = os.path.dirname(f)
        for imp in imports_of(src):
            if not imp.startswith('.'):
                upward.append(f'{f}: bare import {imp}')
                continue
            target = os.path.normpath(os.path.join(base, imp)).replace(os.sep, '/')
            lt = layer_of(target)
            if lt is None:
                upward.append(f'{f}: {imp} -> {target} (unknown layer)')
            elif lt > lf:
                upward.append(f'{f} (layer {lf}) imports {target} (layer {lt})')
    r.check(not upward, 'no module imports one above its layer (§3.1)', upward)
    # (v) the page loads one module script and nothing outside web/
    html = sources.get('index.html', '')
    scripts = re.findall(r'<script[^>]*src="([^"]+)"', html)
    links = re.findall(r'<link[^>]*href="([^"]+)"', html)
    r.check(scripts == ['app/main.js'], 'index.html loads app/main.js as its one script', scripts)
    r.check(all(not re.match(r'^(https?:)?//', x) for x in scripts + links), 'nothing outside web/ is loaded (FP-5)', scripts + links)
    # (vi) the shipped faces: files under web/fonts/, never local(), each beside its licence
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
    r.figures['faces'] = srcs
    r.figures['files'] = len(allf)
    return r.out()
