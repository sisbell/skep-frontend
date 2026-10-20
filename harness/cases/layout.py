"""LAYOUT — class 4 (the structure record §6.3; T3 (4); M2, M6): registration
drift 0 px at the four zoom levels S1 used (em 9, 12, 18, 30 — the article's
box against the camera-projected origin), containment (no two mounted
articles intersect; every row of their content — the head, the blocks, the
scene-offer — lies inside the clip the page draws and inside its document's
box, the article's own rect being its box by construction and proving
nothing; foundations §2.1: "the box becomes text of its own length at the
readable threshold"), and again at em 12.5 with the reveal at stage 3 and
others' links on, the first edition at the face it was mounted at hidden,
the model moved by a read between them, so no reveal re-sets its lines; the
corner (foundations §3.1: every mounted document at reading scale carries one
beside its article, clipped by no box of the page and reaching into no other
document's box, mounted or only drawn; the first edition's in view below the
one line at each level, held there while the document's top has risen past
the line, and never below the document's box as its bottom rises), every
beam leaving the text at its span's own line, from the article's edge (its
endpoint level with one of its marked words' line rects, at the article's
edge — foundations §2.1; S1 Q1), every stub in view carrying its far
document's label (S1 Q3), and no two of the beams' labels in view meeting.
THE SYMBOLS (foundations §2.1: "the SYMBOL AT ITS SPAN"; B1-S4: "No margin
column: the symbols are at the place"): at stage 2, each link of the first
edition drawn at one span has one symbol, in the paragraph holding the end
of its marked words, and nothing but the rest of their last word stands
between those words and it — among them links whose paragraph holds another
word after their span, which a symbol set at the paragraph's end would
leave behind it. THE ARRIVAL (foundations §2.1: "the arrival an outline
around its span"; §3.2): a landing as a follow lands, on a drawn link's span
half its paragraph or narrower, outlines that span's own lines — each line
rect of its marked words, and nothing else — never the paragraph's box.
THE HANDOFF (law 8;
foundations §2.4: the bars become text and no line moves; S1 Q7): at each
level, and at the mount threshold reached from below (em 6 → 6.6) and from
above (em 7 → 6), every block of every mounted article whose top lies
inside its clip stands on the canvas's own bars for it — its top and its
height within HANDOFF_TOL_PX of its bars', and as many lines; a withheld run's
face and the blocks after it are left out, its height at reading scale the
design's open question (F2.1-i: the bars take its true width). THE FRAME
ORDER (law 13): the frames each step across the mount threshold draws show
no document both as bars under its own mounted text and none yielded to
text that is not mounted. THE LABELS (F-9 and foundations §2.1: each label
drawn only where its extent holds it; legibility, not frame cost, is what
the scales buy): at each of S3's thresholds over the first edition, at HOME
and at WHOLE BOARD, (i) every label the canvas set, the trail's pip numbers
among them, is MIN_LABEL_PX or larger; (ii) every other label lies inside
its place as the projection gives it — the board's label cell, an
account's cell, a continuation's mark, a document's box — and inside the
viewport; (iii) no two meet; (iv) none meets another place: the box of a
document in view that no mark drawn the stronger holds, a continuation's
mark, an account's cell that does not hold its place; (v) at mid scale and
at HOME a document's label is its address past its region's prefix led by
the separator, or its whole address; and the places with room carry their
labels — at HOME every document standing whole in view and the
continuation's mark, at WHOLE BOARD the board and the acting account's
cluster. THE TYPE (the typography review's findings 10 and 17): every
element of the first edition that sets text spaces its lines at 1.35 of its
own size; the head's lines and the headings stand on P-LAY's line box for
their size, as the engine lays it out (the rounding `lineBox` models, held
here to the engine); each heading stands nearer the block it heads than the
block above it. THE READING SCENE (foundations §2.5: "the two ends level, so
position carries the match and the beam confirms it"): opened on the first
edition and the draft it windows, and from the versions list of an edition
with two members, a paragraph past its first held, the two ends' matched
lines stand at one height inside both panes and hold the same material;
every band and line leaves its pane at its passage's own first line, or at
the pane's edge where that line has left the pane; back on the plane, the
box an edition shares with its members holds one article. THE CHROME: the
LEAP box's rows share their columns, a place's longest label among them, no
cell's text running past its column and the title's keeping a quarter of the
row; the versions list sets each member on one line; the chrome over the
plane — the LEAP box, the scene, the one line, the mirror, a corner — is
opaque. THE TRAIL (foundations §2.2: the entries render as pips): along the
segment between two consecutive entries in the first edition, inside its box
and clear of every entry's pip, the plane's canvas under the mounted article
holds the box's ground alone — no path runs between the pips, which at
reading scale would cross the text, showing between the article's glyphs.
The measuring code is the page's (`driftSample`, `overlapCheck`,
`beamAnchors`, `arrivalAnchors`, `visible`, `barsOf`, `labels`, `scene.at`,
`scene.ties`, the frame buffer, `beamLabels`) save the trail's, which reads
the canvas's pixels here, and the symbols', which reads the article's order
here; the thresholds are here. The beam-label and shared-box checks are
marked with the page issues they wait on and count as expected while those
stand."""
import json
import re

from . import DOC, FAR_LEAP, GHOST, VERSIONED, WINDOW, XFAIL_BEAM_LABELS, XFAIL_MEMBER, Result

LEVELS_EM = [9, 12, 18, 30]
DRIFT_TOL_PX = 0.5
ANCHOR_TOL_PX = 0.5
HANDOFF_TOL_PX = 1.0
# the article's one line height, a ratio of each element's own size, and how far a measured one may stand from it
LINE_RATIO, LINE_RATIO_TOL = 1.35, 0.01
# a line box measured against P-LAY's for its size, in px at the layout size: a quarter of the engine's 1/64 px grid
LINE_BOX_TOL_PX = 1 / 256
# the scene's two matched lines, and a band's or a line's end against its passage's line
LEVEL_TOL_PX = 1.0
TIE_TOL_PX = 0.5
CORNER = '#corners [data-corner="%s"]' % DOC
# the case's own floor for a label, held apart from the page's constant so that lowering the page's cannot pass here
MIN_LABEL_PX = 9
LABEL_TOL_PX = 0.5
# the trail's strip: its half-width about the segment between two entries, how far it keeps inside the document's box,
# and the disc left out about each entry's point — a pip's radius, its ring and the ring's stroke being under 11 px
TRAIL_STRIP_PX, TRAIL_INSET_PX, PIP_CLEAR_PX = 1.5, 4, 14


def corner_of(ctx):
    """the first edition's corner as the page shows it (the `visible` oracle), the one line's bottom, and the box's top and bottom on screen"""
    return ctx.js('''(() => { const S = window.__skep, v = S.visible(%s), b = S.boxOf(%s), c = S.view.camera(), p = S.view.viewport();
      return {corner: v.length === 1 ? v[0] : null, n: v.length, line: document.getElementById('line').getBoundingClientRect().bottom,
              top: (b.y - c.y) * c.scale + p.VH / 2, bottom: (b.y + b.h - c.y) * c.scale + p.VH / 2}; })()''' % (json.dumps(CORNER), json.dumps(DOC)))


def on_own_line(a):
    """does the beam's endpoint lie level with one of its words' line rects, at the article's edge?"""
    at_edge = a['edge'] is not None and abs(a['x'] - a['edge']) <= ANCHOR_TOL_PX
    return at_edge and any(w['y'] - ANCHOR_TOL_PX <= a['y'] <= w['y'] + w['h'] + ANCHOR_TOL_PX for w in a['words'])


def symbols_view(ctx):
    """each link of the first edition drawn at one span, as the mounted article sets it: its marked words and its
    symbols counted; where it has both, whether the symbol stands in the paragraph holding the end of its words and
    after them, and the article's own text between the words' end and the symbol and after the symbol to the
    paragraph's end, the chrome inside a paragraph (a hairline, C-33's mark, a symbol, the count) set aside"""
    return ctx.js('''(() => {
      const S = window.__skep, art = document.querySelector(%s);
      if (!art) return null;
      const shown = S.links.shown(%s), once = shown.filter((s) => shown.filter((x) => x.link === s.link).length === 1);
      const text = (r) => { const f = r.cloneContents(); f.querySelectorAll('.hairline, .pubmark, .sym, .others').forEach((x) => x.remove()); return f.textContent; };
      return once.map((s) => {
        const words = [...art.querySelectorAll(`.lip[data-links~="${s.link}"]`)], syms = [...art.querySelectorAll(`.sym[data-link="${s.link}"]`)];
        const out = {link: s.link, pos: s.pos, width: s.width, words: words.length, syms: syms.length};
        if (!words.length || syms.length !== 1) return out;
        const last = words[words.length - 1], sym = syms[0], block = last.closest('.sp');
        const after_words = !!(last.compareDocumentPosition(sym) & Node.DOCUMENT_POSITION_FOLLOWING) && !last.contains(sym);
        const between = document.createRange(), rest = document.createRange();
        if (after_words) { between.setStartAfter(last); between.setEndBefore(sym); }
        rest.setStartAfter(sym); rest.setEnd(block, block.childNodes.length);
        return Object.assign(out, {same_block: block === sym.closest('.sp'), after_words, between: after_words ? text(between) : null, after: text(rest)});
      });
    })()''' % (json.dumps('#domlayer article.dtext[data-addr="%s"]' % DOC), json.dumps(DOC)))


def rect_like(a, b):
    """do two rects stand at one place and size, ANCHOR_TOL_PX either way?"""
    return all(abs(a[k] - b[k]) <= ANCHOR_TOL_PX for k in ('x', 'y', 'w', 'h'))


def handoff(ctx):
    """every mounted article's blocks against the canvas's own bars for them (`barsOf`): the blocks whose top lies
    inside the article's clip, a withheld run's face and the blocks after it left out; the ones off their bars — at
    another top, of another height, or of another count of lines — named"""
    compared, off, left_out = 0, [], 0
    for addr in ctx.js('window.__skep.mountedAddrs()'):
        h = ctx.js('window.__skep.barsOf(%s)' % json.dumps(addr))
        if not h or h['text'] is None:
            continue
        bars = {b['pos']: b for b in h['bars']}
        past = False
        for t in h['text']:
            past = past or t['withheld']
            if past:
                left_out += 1
                continue
            if t['top'] >= h['clip'] or t['lines'] == 0:
                continue
            compared += 1
            b = bars.get(t['pos'])
            if b is None or b['top'] is None or abs(b['top'] - t['top']) > HANDOFF_TOL_PX or abs(b['height'] - t['height']) > HANDOFF_TOL_PX or b['lines'] != t['lines']:
                off.append({'addr': addr, 'pos': t['pos'], 'text_top': t['top'], 'bars_top': b and b['top'], 'text_height': t['height'], 'bars_height': b and b['height'],
                            'text_lines': t['lines'], 'bars_lines': b and b['lines'], 'line_px': h['line_px']})
    return {'compared': compared, 'off': off, 'left_out': left_out}


def label_view(ctx):
    """the labels the last frame set and left out, beside the places the projection gives, on screen: the boxes of the
    documents in view that no mark drawn the stronger holds (none where the frame draws the clusters the stronger), the
    marks drawn the stronger, the accounts' cells, the board's label cell — the first of its user grid, three cells
    across (P-PROJ's G) — and the box of each document labelled"""
    return ctx.js('''(() => {
      const S = window.__skep, c = S.view.camera(), p = S.view.viewport(), lod = S.view.lod();
      const scr = (b) => ({x: (b.x - c.x) * c.scale + p.VW / 2, y: (b.y - c.y) * c.scale + p.VH / 2, w: b.w * c.scale, h: b.h * c.scale});
      const view = {x: 0, y: 0, w: p.VW, h: p.VH};
      const crosses = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
      const labels = S.labels();
      const marks = S.residues().filter((m) => m.alpha >= 0.5);
      const held = new Set(marks.flatMap((m) => m.members));
      const boxesDrawn = lod.name !== 'far' && (lod.name !== 'far~mid' || lod.fade >= 0.5);
      const places = S.model.places().filter((q) => !q.system);
      const boxes = boxesDrawn ? places.filter((q) => !held.has(q.doc)).map((q) => ({place: q.doc, rect: scr(S.boxOf(q.doc))})).filter((b) => crosses(b.rect, view)) : [];
      const accounts = S.model.counts().filter((a) => !a.system).map((a) => ({place: a.account, rect: scr(S.accountCell(a.account))}));
      const b = S.boardCell('1');
      const docs = Object.fromEntries(labels.filter((l) => l.kind === 'doc').map((l) => [l.place, scr(S.boxOf(l.place))]));
      return {lod: lod.name, view, labels, out: S.labelsLeftOut(), marks: marks.map((m) => ({place: m.key, rect: m.rect, lines: m.lines})),
              boxes, accounts, board: scr({x: b.x, y: b.y, w: b.w / 3, h: b.h / 3}), docs, mounted: S.mountedAddrs()};
    })()''')


def inside(a, b):
    """is `a` inside `b`, LABEL_TOL_PX either way?"""
    return a['x'] >= b['x'] - LABEL_TOL_PX and a['y'] >= b['y'] - LABEL_TOL_PX and a['x'] + a['w'] <= b['x'] + b['w'] + LABEL_TOL_PX and a['y'] + a['h'] <= b['y'] + b['h'] + LABEL_TOL_PX


def meets(a, b):
    """do two rects overlap by more than LABEL_TOL_PX each way?"""
    return min(a['x'] + a['w'], b['x'] + b['w']) - max(a['x'], b['x']) > LABEL_TOL_PX and min(a['y'] + a['h'], b['y'] + b['h']) - max(a['y'], b['y']) > LABEL_TOL_PX


def place_of(v, label):
    """a label's place on screen, as the projection gives it; None where the frame drew no such place"""
    kind, place = label['kind'], label['place']
    if kind == 'board':
        return v['board']
    if kind in ('cluster', 'frame'):
        return next((a['rect'] for a in v['accounts'] if a['place'] == place), None)
    if kind == 'mark':
        return next((m['rect'] for m in v['marks'] if m['place'] == place), None)
    if kind == 'doc':
        return v['docs'].get(place)
    return None


def labels_hold(r, name, v):
    """THE LABELS' checks at one view; its figures: the labels set by kind, the parts left out by rule"""
    labels = v['labels']
    small = [{'kind': l['kind'], 'place': l['place'], 'text': x['text'], 'px': x['px']} for l in labels for x in l['lines'] if x['px'] < MIN_LABEL_PX]
    r.check(not small, f'{name}: (i) every label the canvas set, the trail\'s pip numbers among them, is {MIN_LABEL_PX} px or larger', small[:6])
    placed = [(l, place_of(v, l), x) for l in labels if l['kind'] != 'pip' for x in l['lines']]
    outside = [{'kind': l['kind'], 'place': l['place'], 'text': x['text'], 'rect': x['rect'], 'place_rect': p} for l, p, x in placed if p is None or not inside(x['rect'], p) or not inside(x['rect'], v['view'])]
    r.check(not outside, f'{name}: (ii) every label lies inside its place, as the projection gives it, and inside the viewport, {LABEL_TOL_PX} px either way', outside[:6])
    crossing = [{'a': [a[0]['kind'], a[0]['place'], a[2]['text']], 'b': [b[0]['kind'], b[0]['place'], b[2]['text']]} for i, a in enumerate(placed) for b in placed[i + 1:] if meets(a[2]['rect'], b[2]['rect'])]
    r.check(not crossing, f'{name}: (iii) no two labels meet', crossing[:6])
    met = []
    for l, p, x in placed:
        others = [('box', o) for o in v['boxes'] if o['place'] != l['place']] + [('mark', o) for o in v['marks'] if o['place'] != l['place']] + [('account', o) for o in v['accounts'] if p is None or not inside(p, o['rect'])]
        met += [{'kind': l['kind'], 'place': l['place'], 'text': x['text'], 'meets': [what, o['place']]} for what, o in others if meets(x['rect'], o['rect'])]
    r.check(not met, f'{name}: (iv) no label meets another place: the box of a document in view that no mark drawn the stronger holds, a continuation\'s mark, an account\'s cell that does not hold its place', met[:6])
    if name in ('mid-extents', 'home'):
        bare = [{'place': l['place'], 'label': l['lines'][0]['text']} for l in labels if l['kind'] == 'doc' and not (l['lines'][0]['text'] == l['place'] or (l['lines'][0]['text'].startswith('.') and l['place'].endswith(l['lines'][0]['text'])))]
        r.check(not bare, f'{name}: (v) a document\'s label is its address past its region\'s prefix led by the separator (".0.3"), or its whole address — never a bare field that reads as a number', bare[:6])
    if name == 'home':
        labelled = {l['place'] for l in labels if l['kind'] == 'doc'}
        whole = [o['place'] for o in v['boxes'] if inside(o['rect'], v['view']) and o['place'] not in v['mounted']]
        r.check(bool(whole) and set(whole) <= labelled, 'home: every document standing whole in view carries its label', {'in_view': len(whole), 'unlabelled': sorted(set(whole) - labelled)[:8]})
        r.check(any(m['lines'] for m in v['marks']), 'home: the continuation drawn as one mark carries its label', [m['lines'] for m in v['marks']])
    if name == 'whole-board':
        named = {(l['kind'], l['place']) for l in labels}
        r.check(('board', '1') in named and ('cluster', '1.0.1') in named, 'whole-board: the board and the acting account\'s cluster carry their labels', sorted(named))
    by_kind, by_rule = {}, {}
    for l in labels:
        by_kind[l['kind']] = by_kind.get(l['kind'], 0) + 1
    for o in v['out']:
        by_rule[o['reason']] = by_rule.get(o['reason'], 0) + 1
    return {'lod': v['lod'], 'set': by_kind, 'left_out': by_rule, 'left_out_parts': [[o['kind'], o['place'], o['text'][:48], o['reason']] for o in v['out'] if o['reason'] != 'after'][:12]}


def type_view(ctx):
    """the first edition's mounted article as the person meets it, in px at the layout size: each element that sets
    text, with its font size and its line height; the head's lines and the headings, each with its height beside
    P-LAY's line box for its size; each heading's room above it and below it, between it and the blocks beside it"""
    art = json.dumps('#domlayer article.dtext[data-addr="%s"]' % DOC)
    return ctx.js('''(async () => {
      const L = await import('./plane/layout.js');
      const S = window.__skep, m = S.mounted(%s), art = document.querySelector(%s);
      if (!m || !art) return null;
      const s = S.view.camera().scale / m.lay;
      const name = (e) => e.tagName.toLowerCase() + (e.className ? '.' + String(e.className).split(' ').join('.') : '');
      const sized = [...art.querySelectorAll('.hd > *, .run > *, .rec .derived, .others, .withheld .arm, .withheld .clause')].map((e) => {
        const cs = getComputedStyle(e); return {el: name(e), pos: e.dataset.pos || null, font: parseFloat(cs.fontSize), line: parseFloat(cs.lineHeight)}; });
      const heads = '.run > h2.sp, .run > h3.sp, .run > h4.sp, .run > h5.sp, .run > h6.sp';
      const boxes = [...art.querySelectorAll('.hd .st, .hd .by, .hd .pres, ' + heads)].map((e) => {
        const font = parseFloat(getComputedStyle(e).fontSize); return {el: name(e), pos: e.dataset.pos || null, height: e.getBoundingClientRect().height / s, line_box: L.lineBox(font / L.LAY_FS) * L.LAY_FS}; });
      const block = (e) => (e && e.matches('.sp, .withheld') ? e : null);
      const headings = [...art.querySelectorAll(heads)].map((h) => {
        const prev = block(h.previousElementSibling), next = block(h.nextElementSibling), r = h.getBoundingClientRect();
        return {pos: Number(h.dataset.pos), el: name(h), above: prev ? (r.top - prev.getBoundingClientRect().bottom) / s : null, below: next ? (next.getBoundingClientRect().top - r.bottom) / s : null}; });
      return {sized, boxes, headings};
    })()''' % (json.dumps(DOC), art))


def type_holds(ctx, r):
    """THE TYPE's checks over the first edition at reading scale; its figures"""
    ctx.view_doc_em(DOC, 12)
    v = type_view(ctx)
    r.check(v is not None, 'the type: the first edition is mounted at em 12')
    if v is None:
        return None
    off = [x for x in v['sized'] if not x['font'] or abs(x['line'] / x['font'] - LINE_RATIO) > LINE_RATIO_TOL]
    r.check(bool(v['sized']) and not off, f'the type: every element of the first edition that sets text spaces its lines at {LINE_RATIO} of its own size, {LINE_RATIO_TOL} either way — the head\'s lines, the headings, the blocks, a record\'s keys, the others\' count, the offer',
            [dict(x, ratio=round(x['line'] / x['font'], 3) if x['font'] else None) for x in off[:8]])
    unlike = []
    for b in v['boxes']:
        n = round(b['height'] / b['line_box'])
        if n < 1 or abs(b['height'] - n * b['line_box']) > LINE_BOX_TOL_PX:
            unlike.append(b)
    r.check(bool(v['boxes']) and not unlike, f'the type: the head\'s lines and the headings stand on P-LAY\'s line box for their size, as the engine lays it out ({LINE_BOX_TOL_PX:.4f} px at the layout size)', unlike[:6])
    compared = [h for h in v['headings'] if h['above'] is not None and h['below'] is not None]
    far = [h for h in compared if not h['below'] < h['above']]
    r.check(bool(compared) and not far, 'the type: each heading with a block above and below it stands nearer the block it heads than the block above it', {'compared': compared, 'far': far})
    return {'elements': len(v['sized']), 'boxes': [[b['el'], round(b['height'], 4), b['line_box']] for b in v['boxes']], 'headings': compared}


def scene_level(ctx):
    """the scene as it stands: its runs, the two ends it set level, and each end's passage in its pane — its first line
    on screen, its first characters, the pane's visible rect"""
    return ctx.js('''(() => { const S = window.__skep.scene, p = S.pairs(); if (!p) return null;
      return {pairs: p.pairs, level: p.level, a: p.level.a != null ? S.at('a', p.level.a) : null, b: p.level.b != null ? S.at('b', p.level.b) : null}; })()''')


def level_holds(r, name, v):
    """the two ends set level: their first lines at one height, inside both panes, holding the same material"""
    a, b = (v or {}).get('a'), (v or {}).get('b')
    la, lb = a and a['line'], b and b['line']
    level = bool(la and lb) and abs(la['y'] - lb['y']) <= LEVEL_TOL_PX and abs(la['y'] + la['h'] - (lb['y'] + lb['h'])) <= LEVEL_TOL_PX and inside(la, a['pane']) and inside(lb, b['pane'])
    r.check(level, f'{name}: the two ends stand level — the matched passage\'s first line at one height in both panes, its top and its bottom within {LEVEL_TOL_PX} px, inside both panes',
            {'level': v and v['level'], 'a': la, 'b': lb, 'pane_a': a and a['pane'], 'pane_b': b and b['pane']})
    same = bool(a and b and a['text'] and b['text']) and a['text'][:24] == b['text'][:24]
    r.check(same, f'{name}: the lines set level hold the same material — the passage\'s first characters alike in both panes', {'a': a and a['text'], 'b': b and b['text']})


def ties_hold(r, name, ties, in_view):
    """every band and line drawn between the panes leaves each pane at its passage's own first line, or, where that
    line has left the pane, at the pane's edge on the side it left by; `in_view` the ends that must stand in view"""
    r.check(any(t['kind'] == 'band' for t in ties), f'{name}: the shared identity is drawn as a band', [t['kind'] for t in ties])
    off, ends = [], 0
    for t in ties:
        for side, line, pane in (('a', t['lineA'], t['paneA']), ('b', t['lineB'], t['paneB'])):
            end = t[side]
            if line is None or pane is None:
                off.append({'kind': t['kind'], 'link': t['link'], 'side': side, 'pos': end['pos'], 'line': line})
                continue
            mid, top, bottom = line['y'] + line['h'] / 2, pane['y'], pane['y'] + pane['h']
            if end['clipped']:
                edge = top if mid < top else bottom if mid > bottom else None
                if edge is None or abs(end['y'] - edge) > TIE_TOL_PX:
                    off.append({'kind': t['kind'], 'link': t['link'], 'side': side, 'pos': end['pos'], 'y': end['y'], 'clipped': True, 'line': line, 'pane': pane})
                continue
            ends += 1
            if not (line['y'] - TIE_TOL_PX <= end['y'] <= line['y'] + line['h'] + TIE_TOL_PX):
                off.append({'kind': t['kind'], 'link': t['link'], 'side': side, 'pos': end['pos'], 'y': end['y'], 'line': line})
    r.check(ends >= in_view and not off, f'{name}: every band and line leaves its pane at its passage\'s own first line, {TIE_TOL_PX} px either way, or at the pane\'s edge where that line has left the pane — {in_view} end(s) or more in view',
            {'ends_in_view': ends, 'off': off[:6]})
    return {'ties': len(ties), 'ends_in_view': ends, 'off': len(off)}


def scene_holds(ctx, r):
    """THE READING SCENE's checks: opened on the first edition and the draft it windows, nothing held; then from the
    versions list of an edition with two members, its last paragraph held, read side by side with its latest member;
    its figures"""
    seen = {}
    ctx.leap(DOC, WINDOW[0])
    ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(DOC), json.dumps(WINDOW[2])))
    ctx.settle()
    ctx.frames(3)
    v = scene_level(ctx)
    r.check(bool(v) and v['level']['a'] == WINDOW[0] and v['level']['b'] is not None, 'the scene on the window and its origin, nothing held: the ends set level are the window run\'s first position and its counterpart in the origin', v and v['level'])
    level_holds(r, 'the scene on the window and its origin', v)
    # the window run's band: both its ends are the lines set level, in view
    seen['origin'] = {'level': v and v['level'], 'ties': ties_hold(r, 'the scene on the window and its origin', ctx.js('window.__skep.scene.ties()'), 2)}
    ctx.js('window.__skep.scene.close()')
    ctx.frames(2)
    # the versions list, a paragraph past the document's first held: "read side by side" with the latest member sets that paragraph level
    # with what the member holds of it. An edition no later case reads: the member's text, once loaded, stands over its document's box
    ctx.leap(VERSIONED, None)
    doc = ctx.js('window.__skep.model.doc(%s)' % json.dumps(VERSIONED))
    para = [b for b in doc['blocks'] if b['kind'] == 'para' and b['pos'] > 1 and not b['text'].startswith('#')][-1]
    ctx.js('window.__skep.cards.versions(%s, %d)' % (json.dumps(VERSIONED), para['pos']))
    ctx.settle()
    ctx.frames(2)
    rows = ctx.js('''[...document.querySelectorAll('#overlay .rows li')].map((li) => [...li.children].map((e) => { const q = e.getBoundingClientRect(); return {item: e.dataset.run || e.className, y: q.top, h: q.height}; }))''')
    split = [row for row in rows if len(row) < 3 or max(c['y'] for c in row) >= min(c['y'] + c['h'] for c in row)]
    r.check(len(rows) == doc['members'] and not split, 'the versions list: each member one row — its read act, what it holds of the passage and its side-by-side act share one line', {'rows': rows, 'members': doc['members']})
    seen['versions_rows'] = [[round(c['y'], 1) for c in row] for row in rows]
    ctx.js('document.querySelector(%s).click()' % json.dumps('#overlay [data-run="beside%d"]' % doc['members']))
    ctx.js('new Promise((res) => { const t0 = performance.now(); const tick = () => (window.__skep.scene.isOpen() || performance.now() - t0 > 10000 ? res(true) : setTimeout(tick, 50)); tick(); })')
    ctx.settle()
    ctx.frames(3)
    v = scene_level(ctx)
    # the counterpart, from the runs the scene reports: the first run that holds part of the paragraph, at the paragraph's first position it holds
    run = v and next((p for p in sorted(v['pairs'], key=lambda p: p['u1']) if p['u1'] < para['pos'] + para['width'] and para['pos'] < p['u1'] + p['width']), None)
    want = run and {'a': max(para['pos'], run['u1']), 'b': run['u2'] + max(para['pos'], run['u1']) - run['u1']}
    r.check(bool(v) and run is not None and want['a'] == para['pos'] and v['level'] == want, 'from the versions list, the paragraph held: the first pane\'s end is the held paragraph\'s first position, and the latest member\'s is its counterpart in the run that holds it, never the first pair\'s', {'level': v and v['level'], 'want': want})
    level_holds(r, 'the versions list\'s read side by side', v)
    # a member that holds all of its edition shares it as one run, its first line above both panes: its band clipped at their edges
    seen['versions'] = {'level': v and v['level'], 'ties': ties_hold(r, 'the versions list\'s read side by side', ctx.js('window.__skep.scene.ties()'), 0)}
    ctx.js('window.__skep.scene.close()')
    ctx.frames(2)
    # back on the plane at the edition, its member's text loaded: the box both share holds one article
    ctx.leap(VERSIONED, None)
    member = '%s.%d' % (VERSIONED, doc['members'])
    mounted = ctx.js('window.__skep.mountedAddrs()')
    r.check(sum(1 for a in (VERSIONED, member) if a in mounted) == 1, 'back on the plane after reading its latest member beside it, the edition\'s box holds one article, never the member\'s over the edition\'s',
            {'mounted': mounted, 'box_shared': ctx.js('JSON.stringify(window.__skep.boxOf(%s)) === JSON.stringify(window.__skep.boxOf(%s))' % (json.dumps(VERSIONED), json.dumps(member)))}, xfail=XFAIL_MEMBER)
    return seen


def chrome_holds(ctx, r):
    """THE CHROME's checks: the LEAP box's columns, among its rows a trail entry carrying the longest label a place has
    (a document's first line, up to 200 characters); the opaque chrome over the plane; its figures"""
    ctx.leap(FAR_LEAP)
    ctx.leap(DOC, WINDOW[0])
    ctx.js('window.__skep.leap.open()')
    ctx.frames(2)
    cells = ctx.js('''[...document.querySelectorAll('#leaphits .hit')].map((h) => [...h.children].map((c) => { const q = c.getBoundingClientRect();
      return {x: q.left, w: q.width, row: h.getBoundingClientRect().width, over: c.scrollWidth - c.clientWidth, chars: c.textContent.length}; }))''')
    whole = len(cells) >= 3 and all(len(row) == 3 for row in cells)
    ragged = {i: [round(row[i]['x'], 2) for row in cells] for i in range(3) if whole and max(row[i]['x'] for row in cells) - min(row[i]['x'] for row in cells) > LABEL_TOL_PX}
    r.check(whole and not ragged, f'the LEAP box: its rows share their columns — each column\'s cells start at one x, {LABEL_TOL_PX} px either way', {'rows': len(cells), 'cells': [len(row) for row in cells], 'ragged': ragged})
    longest = max((c['chars'] for row in cells for c in row), default=0)
    over = [[i, j, c['over']] for i, row in enumerate(cells) for j, c in enumerate(row) if c['over'] > 1]
    narrow = [[i, round(row[1]['w'], 1), round(row[1]['row'], 1)] for i, row in enumerate(cells) if whole and row[1]['w'] < row[1]['row'] / 4]
    r.check(whole and longest >= 100 and not over and not narrow, 'the LEAP box: no cell\'s text runs past its column, and the title\'s column keeps a quarter of the row or more — a label of a hundred characters or more among the rows',
            {'longest_cell_chars': longest, 'overflowing': over[:6], 'narrow_titles': narrow[:6]})
    ctx.js('window.__skep.leap.close()')
    ctx.frames(1)
    alpha = ctx.js(r'''(() => { const a = (sel) => { const e = document.querySelector(sel); if (!e) return null;
        const m = getComputedStyle(e).backgroundColor.match(/rgba?\(([^)]+)\)/), p = m ? m[1].split(',').map(Number) : [];
        return p.length === 4 ? p[3] : p.length === 3 ? 1 : 0; };
      return {leap: a('#leap'), scene: a('#scene'), line: a('#line'), mirror: a('#mirror'), corner: a('#corners .corner')}; })()''')
    thin = {k: x for k, x in alpha.items() if x != 1}
    r.check(not thin, 'the chrome over the plane is opaque — the LEAP box, the scene, the one line, the mirror and a corner: no text the plane holds shows through', alpha)
    return {'leap_rows': len(cells), 'leap_columns': [round(c['w'], 1) for c in cells[0]] if cells else None, 'alpha': alpha}


def trail_view(ctx):
    """the plane's canvas along the segment between the trail's two newest entries, as far as the segment runs on screen
    inside the first edition's box, TRAIL_INSET_PX inside its edges, the disc about every entry's point left out: the
    pixels read, and those that are not the box's ground as P-REG gives it"""
    return ctx.js('''(async () => {
      const R = await import('./plane/register.js');
      const S = window.__skep, c = S.view.camera(), p = S.view.viewport(), t = S.trail(), n = t.entries.length;
      if (n < 2) return null;
      const scr = (v) => ({x: (v.x - c.x) * c.scale + p.VW / 2, y: (v.y - c.y) * c.scale + p.VH / 2});
      const a = scr(t.entries[n - 2].view), b = scr(t.entries[n - 1].view), pips = t.entries.map((e) => scr(e.view));
      const q = S.boxOf(%s), box = {x: (q.x - c.x) * c.scale + p.VW / 2, y: (q.y - c.y) * c.scale + p.VH / 2, w: q.w * c.scale, h: q.h * c.scale};
      const x0 = Math.max(0, box.x + %s), x1 = Math.min(p.VW, box.x + box.w - %s), y0 = Math.max(0, box.y + %s), y1 = Math.min(p.VH, box.y + box.h - %s);
      const cv = document.getElementById('plane'), k = cv.width / p.VW, img = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
      const ground = [1, 3, 5].map((i) => parseInt(R.COL.doc.slice(i, i + 2), 16));
      const len = Math.hypot(b.x - a.x, b.y - a.y), ux = (b.x - a.x) / len, uy = (b.y - a.y) / len;
      let read = 0, other = 0; const off = [];
      for (let s = 0; s <= len; s += 0.5) for (let o = -%s; o <= %s; o += 0.5) {
        const x = a.x + ux * s - uy * o, y = a.y + uy * s + ux * o;
        if (x < x0 || x >= x1 || y < y0 || y >= y1 || pips.some((e) => Math.hypot(x - e.x, y - e.y) < %s)) continue;
        const i = (Math.floor(y * k) * cv.width + Math.floor(x * k)) * 4;
        read++;
        if (img[i] !== ground[0] || img[i + 1] !== ground[1] || img[i + 2] !== ground[2]) { other++; if (off.length < 8) off.push({x: Math.round(x), y: Math.round(y), rgb: [img[i], img[i + 1], img[i + 2]]}); }
      }
      return {a, b, box, ground, read, other, off};
    })()''' % (json.dumps(DOC), TRAIL_INSET_PX, TRAIL_INSET_PX, TRAIL_INSET_PX, TRAIL_INSET_PX, TRAIL_STRIP_PX, TRAIL_STRIP_PX, PIP_CLEAR_PX))


def trail_holds(ctx, r):
    """THE TRAIL's check: two consecutive entries in the first edition at two views, the camera at the newer, the
    article mounted over the box; its figures"""
    ctx.leap(DOC, 1)
    ctx.leap(DOC, WINDOW[0])
    v = trail_view(ctx)
    mounted = DOC in ctx.js('window.__skep.mountedAddrs()')
    r.check(bool(v) and mounted and v['read'] >= 100 and not v['other'],
            f'the trail: no path runs between its pips — along the segment between two consecutive entries in the first edition, a {2 * TRAIL_STRIP_PX:g} px strip inside its box and {PIP_CLEAR_PX} px clear of every entry\'s point, the canvas under the mounted article holds the box\'s ground alone',
            {'mounted': mounted, 'read': v and v['read'], 'other': v and v['other'], 'off': v and v['off'], 'segment': v and [v['a'], v['b']], 'box': v and v['box']})
    return {'read': v and v['read'], 'other': v and v['other']}


def step(ctx, em):
    """the camera over the first edition at an em, and what the frames that step drew show: the most documents any of
    them drew as bars under their own mounted text (`both`), and yielded to text that was not mounted (`neither`)"""
    t0 = ctx.js('performance.now()')
    ctx.view_doc_em(DOC, em)
    f = ctx.js('window.__skep.frames().filter(f => f.t >= %s).map(f => [f.both, f.neither])' % t0)
    return {'em': em, 'frames': len(f), 'both': max((x[0] for x in f), default=0), 'neither': max((x[1] for x in f), default=0)}


def run(ctx):
    r = Result()
    ctx.leap(DOC, WINDOW[0])
    drift = {}
    for em in LEVELS_EM:
        ctx.view_doc_em(DOC, em)
        sample = ctx.js('window.__skep.driftSample(%s)' % json.dumps('em%d' % em))
        mine = [s for s in sample if s['addr'] == DOC]
        r.check(len(mine) == 1, f'em {em}: the first edition is mounted', [s['addr'] for s in sample])
        worst = max((max(abs(s['dx']), abs(s['dy']), s.get('span_dx', 0), s.get('span_dy', 0)) for s in sample), default=None)
        r.check(worst is not None and worst <= DRIFT_TOL_PX, f'em {em}: registration drift {DRIFT_TOL_PX} px or less for every mounted article — its box against the projected origin, and every span\'s line against its laid-out place', sample)
        ov = ctx.js('window.__skep.overlapCheck()')
        r.check(ov['intersecting_pairs'] == 0, f'em {em}: containment — no two mounted articles intersect', ov['intersecting_pairs'])
        r.check(not ov['blocks_cut'], f'em {em}: containment — every row of every mounted article, its head, its blocks and the scene-offer, lies inside its clip and its box; none is cut at the box\'s edge', {'blocks_cut': ov['blocks_cut'][:6], 'worst_overflow_px': ov['worst_overflow_px']})
        r.check(not ov['corners_missing'], f'em {em}: every mounted article at reading scale carries its corner beside it', ov['corners_missing'])
        r.check(not ov['corners_clipped'], f'em {em}: no corner is clipped by a box of the page — it stands beside its article, outside the box that clips the text', ov['corners_clipped'])
        r.check(not ov['corners_into'], f'em {em}: no corner reaches into another document\'s box, mounted or only drawn', ov['corners_into'][:6])
        c = corner_of(ctx)
        shown = c['corner'] is not None and c['corner']['inClip'] and c['corner']['inView'] and c['corner']['rect']['y'] >= c['line'] - 0.5
        r.check(shown, f'em {em}: the first edition\'s corner is in view, below the one line', c)
        ho = handoff(ctx)
        r.check(ho['compared'] > 0 and not ho['off'], f'em {em}: the handoff — every block of every mounted article stands on the canvas\'s bars for it: its top and its height within {HANDOFF_TOL_PX} px of its bars\', and as many lines', {'compared': ho['compared'], 'off': ho['off'][:6]})
        drift['em%d' % em] = {'samples': sample, 'worst_px': worst, 'containment': ov, 'em_px_measured': mine[0]['em_px'] if mine else None, 'corner': c['corner'] and c['corner']['rect'], 'handoff': {'compared': ho['compared'], 'off': len(ho['off']), 'left_out': ho['left_out']}}
    r.figures['drift'] = drift
    # the corner holds to the top of the document's visible part (foundations §3.1): the box's top risen past the one
    # line, the corner stands just below the line; the box's bottom risen near it, the corner rises with the bottom
    box = ctx.js('window.__skep.boxOf(%s)' % json.dumps(DOC))
    s14 = ctx.js('window.__skep.scaleFor(%s, "em", 14)' % json.dumps(DOC))
    ctx.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] * 0.7, s14)
    held = corner_of(ctx)
    r.check(held['top'] < held['line'] and held['corner'] is not None and held['corner']['inView'] and held['line'] <= held['corner']['rect']['y'] <= held['line'] + 16,
            'the box\'s top above the one line: the corner holds just below the line, in view', held)
    vp = ctx.js('window.__skep.view.viewport()')
    ctx.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] - (150 - vp['VH'] / 2) / s14, s14)
    rising = corner_of(ctx)
    rc = rising['corner']
    r.check(rc is not None and abs(rc['rect']['y'] + rc['rect']['h'] - rising['bottom']) <= 1, 'the box\'s bottom risen to 150 px: the corner rises with it, its bottom at the box\'s, never past it', rising)
    r.figures['corner_held'] = {'held': held['corner'] and held['corner']['rect'], 'line': held['line'], 'rising': rc and rc['rect'], 'box_bottom': rising['bottom']}
    # a continuous zoom: drift sampled across a sweep
    box = ctx.js('window.__skep.boxOf(%s)' % json.dumps(DOC))
    s_lo = ctx.js('window.__skep.scaleFor(%s, "em", 7)' % json.dumps(DOC))
    s_hi = ctx.js('window.__skep.scaleFor(%s, "em", 28)' % json.dumps(DOC))
    sweep = ctx.js('''(async () => {
      const out = []; const S = window.__skep; const x = %s, y = %s;
      for (let i = 0; i <= 40; i++) { const u = i / 40; const scale = Math.exp(Math.log(%s) + (Math.log(%s) - Math.log(%s)) * u); S.view.set({x, y, scale}); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); for (const s of S.driftSample('sweep')) out.push({scale: s.scale, dx: s.dx, dy: s.dy, span_dx: s.span_dx, span_dy: s.span_dy, em: s.em_px}); }
      return out; })()''' % (box['x'] + box['w'] / 2, box['y'] + box['h'] * 0.3, s_lo, s_hi, s_lo))
    worst_sweep = max((max(abs(s['dx']), abs(s['dy']), s.get('span_dx', 0), s.get('span_dy', 0)) for s in sweep), default=0)
    r.check(worst_sweep <= DRIFT_TOL_PX, 'continuous zoom: drift within tolerance across the sweep', {'samples': len(sweep), 'worst_px': worst_sweep})
    r.figures['sweep'] = {'samples': len(sweep), 'worst_px': worst_sweep}
    # the symbols: stage 2 at the first edition, each at its span — after the last word its marked words touch, in the
    # paragraph holding them, and never past a word after them
    ctx.view_doc_em(DOC, 12.5)
    hidden_face = ctx.js('window.__skep.mounted(%s).fs' % json.dumps(DOC))
    ctx.js('window.__skep.links.reveal(%s, 2)' % json.dumps(DOC))
    ctx.settle()
    ctx.frames(3)
    drawn = [s for s in (symbols_view(ctx) or []) if s['words']]
    misplaced = [s for s in drawn if s['syms'] != 1 or not s.get('same_block') or not s.get('after_words') or re.search(r'\s', s.get('between') or '')]
    followed = [s for s in drawn if s not in misplaced and (s.get('after') or '').strip()]
    r.check(bool(drawn) and not misplaced, 'stage 2: each link of the first edition drawn at one span has one symbol, in the paragraph holding the end of its marked words, with nothing but the rest of their last word between them and it',
            [{k: s.get(k) for k in ('link', 'pos', 'width', 'syms', 'same_block', 'after_words', 'between')} for s in misplaced[:6]])
    r.check(bool(followed), 'stage 2: among them, symbols with another word of their paragraph after them — a symbol at the paragraph\'s end would stand past it', {'drawn': len(drawn), 'followed': len(followed)})
    r.figures['symbols'] = {'drawn': len(drawn), 'misplaced': len(misplaced), 'followed_by_a_word': len(followed)}
    # the beams: stage 3 at the first edition, every endpoint inside its anchor rect
    ctx.js('window.__skep.links.reveal(%s, 3)' % json.dumps(DOC))
    ctx.settle()
    ctx.frames(3)
    anchors = ctx.js('window.__skep.beamAnchors()')
    r.check(len(anchors) >= 1, 'beams are built at stage 3', len(anchors))
    r.check(all(a['words'] for a in anchors), 'every drawn beam\'s link is marked at its words in the mounted article (the oracle\'s rects exist)', [a['link'] for a in anchors if not a['words']])
    off = [{'link': a['link'], 'pos': a['pos'], 'x': a['x'], 'y': a['y'], 'edge': a['edge'], 'words': a['words']} for a in anchors if not on_own_line(a)]
    r.check(not off, f'every beam leaves the text at its span\'s own line, from the article\'s edge: its endpoint\'s y within one of its words\' line rects and its x at the article\'s edge, {ANCHOR_TOL_PX} px either way', off[:4])
    # the stubs' labels (S1 Q3): every bundle with a beam that leaves the text in view and ends at the view's border sets the label naming its
    # far document, in view; no two labels in view meet. A beam whose line lies past the viewport is shown to no one, its stub and label with it
    labels = ctx.js('window.__skep.beamLabels()')
    vp = ctx.js('window.__skep.view.viewport()')
    view = {'x': 0, 'y': 0, 'w': vp['VW'], 'h': vp['VH']}
    stubbed = sorted({(a['near'], a['far']) for a in anchors if a['stub'] and 0 <= a['x'] <= vp['VW'] and 0 <= a['y'] <= vp['VH']})
    named = {(l['near'], l['far']) for l in labels if l['stub'] and l['text'].startswith(l['far']) and inside(l['rect'], view)}
    r.check(bool(stubbed) and set(stubbed) <= named, f'every stub in view carries its far document\'s label: each bundle with a beam that leaves the text in view and ends at the view\'s border sets a label naming its far document, inside the viewport {LABEL_TOL_PX} px either way',
            {'stubbed': stubbed, 'labels': [[l['far'], l['text'], l['rect']] for l in labels]})
    in_view = [l for l in labels if meets(l['rect'], view)]
    met = [[a['far'], b['far'], a['rect'], b['rect']] for i, a in enumerate(in_view) for b in in_view[i + 1:] if meets(a['rect'], b['rect'])]
    r.check(not met, f'no two beam labels in view meet, {LABEL_TOL_PX} px either way', met[:6], xfail=XFAIL_BEAM_LABELS)
    r.figures['beams'] = {'count': len(anchors), 'stubs': sum(1 for a in anchors if a['stub']), 'far': sorted({a['far'] for a in anchors})[:8], 'on_own_line': len(anchors) - len(off), 'off_own_line': len(off),
                          'stubs_in_view': len(stubbed), 'labels': len(labels), 'labels_in_view': len(in_view), 'labels_meeting_pairs': len(met)}
    # THE FACE under the reveal: others' links on too, and the model moved by a read (the ghost's, refused) so the face is
    # read from the model as it stands — the article holds in its box, at the face it was mounted at hidden
    ctx.js('window.__skep.links.setOthers(%s, true)' % json.dumps(DOC))
    ctx.js('window.__skep.model.loadWhole(%s)' % json.dumps(GHOST))
    ctx.settle()
    ctx.frames(3)
    ov = ctx.js('window.__skep.overlapCheck()')
    revealed = ctx.js('window.__skep.mounted(%s)' % json.dumps(DOC))
    r.check(not ov['blocks_cut'], 'em 12.5, the reveal at stage 3 with others\' links on: containment — every row of every mounted article, its head, its blocks and the scene-offer, lies inside its clip and its box', {'blocks_cut': ov['blocks_cut'][:6], 'worst_overflow_px': ov['worst_overflow_px']})
    r.check(revealed is not None and revealed['fs'] == hidden_face, 'em 12.5: the reveal at stage 3 with others\' links on leaves the first edition at the face it was mounted at hidden, the model moved between them — no reveal re-sets its lines',
            {'hidden': hidden_face, 'revealed': revealed and revealed['fs']})
    r.figures['face_under_reveal'] = {'hidden': hidden_face, 'revealed': revealed and revealed['fs'], 'worst_overflow_px': ov['worst_overflow_px']}
    ctx.js('window.__skep.links.setOthers(%s, false)' % json.dumps(DOC))
    ctx.js('window.__skep.links.hide(%s)' % json.dumps(DOC))
    ctx.frames(2)
    r.check(ctx.js('window.__skep.beams()') == 0, 'hidden again: no beams')
    # the arrival: a landing as a follow lands — the door naming its span and its link — on a drawn link's span half its
    # paragraph or narrower outlines that span's own lines, never the paragraph's box
    shown = ctx.js('window.__skep.links.shown(%s)' % json.dumps(DOC))
    paras = [b for b in ctx.js('window.__skep.model.doc(%s).blocks' % json.dumps(DOC)) if b['kind'] == 'para']
    once = [s for s in shown if sum(1 for x in shown if x['link'] == s['link']) == 1]
    target = next((s for s in once for b in paras if b['pos'] <= s['pos'] and s['pos'] + s['width'] <= b['pos'] + b['width'] and 2 * s['width'] <= b['width']), None)
    r.check(target is not None, 'the arrival: a drawn link of the first edition at one span, half its paragraph or narrower', [[s['pos'], s['width']] for s in once[:8]])
    if target is not None:
        ctx.js('window.__skep.go.leapTo(%s, %d, %s)' % (json.dumps(DOC), target['pos'], json.dumps({'width': target['width'], 'link': target['link']})))
        ctx.settle()
        ctx.frames(3)
        a = ctx.js('window.__skep.arrivalAnchors()') or {}
        outline, words, block = a.get('outline') or [], a.get('words') or [], a.get('block')
        r.check(bool(outline) and bool(words) and all(any(rect_like(o, w) for w in words) for o in outline) and all(any(rect_like(w, o) for o in outline) for w in words),
                f'the arrival: the outline stands on its span\'s own lines — each rect it outlines one of the line rects of the link\'s marked words, and each of those outlined, {ANCHOR_TOL_PX} px either way',
                {'link': target['link'], 'pos': target['pos'], 'width': target['width'], 'outline': outline[:6], 'words': words[:6]})
        r.check(block is not None and not any(rect_like(o, block) for o in outline), 'the arrival: no rect it outlines is the paragraph\'s box', {'block': block, 'outline': outline[:6]})
        r.figures['arrival'] = {'link': target['link'], 'pos': target['pos'], 'width': target['width'], 'outlined_lines': len(outline), 'word_lines': len(words)}
        ctx.leap(DOC, WINDOW[0])
    # the mount thresholds: mounted at em 6.5 and above, unmounted below 5.5; at each step the frames it drew drew no
    # document both as bars and as text, nor left one yielded and unmounted; where the article stands just mounted, it
    # stands on its bars
    steps = []
    def crossed(em, how):
        s = step(ctx, em)
        steps.append(dict(s, how=how))
        r.check(s['frames'] > 0 and s['both'] == 0 and s['neither'] == 0, f'em {em} ({how}): no frame of the step drew a document\'s bars under its own mounted text, or left a document yielded to text that is not mounted', s)
    crossed(7, 'from above')
    r.check(DOC in ctx.js('window.__skep.mountedAddrs()'), 'em 7: the article is mounted (above the 6.5 threshold)')
    crossed(6, 'from above')
    r.check(DOC in ctx.js('window.__skep.mountedAddrs()'), 'em 6 from above: still mounted (hysteresis)')
    ho = handoff(ctx)
    r.check(ho['compared'] > 0 and not ho['off'], 'em 6 from above: the handoff — every block of every mounted article stands on its bars', {'compared': ho['compared'], 'off': ho['off'][:6]})
    crossed(5, 'from above')
    r.check(DOC not in ctx.js('window.__skep.mountedAddrs()'), 'em 5: the article is unmounted (below the 5.5 hysteresis)')
    crossed(6, 'from below')
    r.check(DOC not in ctx.js('window.__skep.mountedAddrs()'), 'em 6 from below: not yet mounted (hysteresis)')
    crossed(6.6, 'from below')
    r.check(DOC in ctx.js('window.__skep.mountedAddrs()'), 'em 6.6 from below: mounted (above the 6.5 threshold)')
    ho = handoff(ctx)
    r.check(ho['compared'] > 0 and not ho['off'], 'em 6.6 from below: the handoff — every block of every mounted article stands on its bars', {'compared': ho['compared'], 'off': ho['off'][:6]})
    crossed(12.5, 'from below')
    r.check(DOC in ctx.js('window.__skep.mountedAddrs()'), 'em 12.5: mounted')
    r.figures['mount_steps'] = steps
    cap = ctx.js('window.__skep.constants')
    r.figures['constants'] = cap
    # the projection's places: no two indexed documents of the account share a box (reading order seeded by the prefix — M2's site)
    boxes = ctx.js('window.__skep.model.places().filter(p => !p.system).slice(0, 120).map(p => [p.doc, window.__skep.boxOf(p.doc)])')
    pairs = 0
    for i in range(len(boxes)):
        for j in range(i + 1, len(boxes)):
            a, b = boxes[i][1], boxes[j][1]
            if a.get('residue') or b.get('residue'):
                continue
            if a['x'] < b['x'] + b['w'] and b['x'] < a['x'] + a['w'] and a['y'] < b['y'] + b['h'] and b['y'] < a['y'] + a['h']:
                pairs += 1
    r.check(pairs == 0, 'no two indexed documents share a box (the first 120 places; the residue cell apart)', pairs)
    cell = ctx.js('window.__skep.accountCell("1.0.1")')
    outside = [d for d, b in boxes if d.startswith('1.0.1.0.') and not (b['x'] >= cell['x'] - 1e-6 and b['y'] >= cell['y'] - 1e-6 and b['x'] + b['w'] <= cell['x'] + cell['w'] + 1e-6 and b['y'] + b['h'] <= cell['y'] + cell['h'] + 1e-6)]
    r.check(not outside, 'every document box lies inside its account\'s cell', outside[:5])
    r.figures['boxes_checked'] = len(boxes)
    # reading order (foundations §2.1): the first seven documents of an account share the first row, the eighth starts the next; document 1 is in the first column
    row = [ctx.js('window.__skep.boxOf(%s)' % json.dumps('1.0.1.0.%d' % k)) for k in range(1, 9)]
    eps = 1e-6
    r.check(all(abs(row[k]['y'] - row[0]['y']) < eps for k in range(1, 7)), 'documents 1–7 lie along the first row of their account\'s grid', [round(b['y']) for b in row[:7]])
    r.check(all(row[k]['x'] > row[k - 1]['x'] for k in range(1, 7)), 'documents 1–7 advance along the row', [round(b['x']) for b in row[:7]])
    r.check(abs(row[7]['x'] - row[0]['x']) < eps and row[7]['y'] > row[0]['y'], 'document 8 starts the second row under document 1', {'d1': (round(row[0]['x']), round(row[0]['y'])), 'd8': (round(row[7]['x']), round(row[7]['y']))})
    r.check(row[0]['x'] < cell['x'] + cell['w'] / 7 and row[0]['y'] < cell['y'] + cell['h'] / 7, 'document 1 lies in the first cell of the grid', {'d1': (round(row[0]['x']), round(row[0]['y'])), 'cell': (round(cell['x']), round(cell['y']))})
    # THE LABELS: at each of S3's thresholds over the first edition, then at HOME and at WHOLE BOARD
    box = ctx.js('window.__skep.boxOf(%s)' % json.dumps(DOC))
    seen = {}
    for name, value, kind in ctx.js('window.__skep.thresholds'):
        ctx.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] * (0.3 if kind == 'em' else 0.5), ctx.js('window.__skep.scaleFor(%s, %s, %s)' % (json.dumps(DOC), json.dumps(kind), value)))
        seen[name] = labels_hold(r, name, label_view(ctx))
    for name, door in (('home', 'home'), ('whole-board', 'wholeBoard')):
        ctx.js('window.__skep.go.%s()' % door)
        ctx.settle()
        ctx.frames(2)
        seen[name] = labels_hold(r, name, label_view(ctx))
    r.figures['labels'] = seen
    # THE TYPE, THE READING SCENE, THE CHROME, THE TRAIL
    r.figures['type'] = type_holds(ctx, r)
    r.figures['scene'] = scene_holds(ctx, r)
    r.figures['chrome'] = chrome_holds(ctx, r)
    r.figures['trail'] = trail_holds(ctx, r)
    ctx.leap(DOC, WINDOW[0])
    return r.out()
