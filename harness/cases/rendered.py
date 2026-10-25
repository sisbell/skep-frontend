"""RENDERED — class 1 (the structure record §6.3; T3 (1)): for every B1
screen built, the text the page shows equals the record's. The oracle is the
harness's own token-free `POST /op` to the daemon (Python `urllib`): a guest's
`retrieve_v` over the first edition, compared to (i) the model's held spans,
(ii) the mounted article — every block part standing, the lines in view
standing by line (issue #122), its own glyphs the delivery's bytes over the
positions it holds — (iii) the mirror's items — S1's three renderings against
the real daemon. The far scale's counts equal the
harness's own fold of the daemon's documents (the census probe PUB-6.52
names: `doc_metadata` over each account's document numbers — its oracle for
`places`); the window run the guest meets WITHHELD shows the oracle its box
and width (240), never its text, and shows the entitled reader (the signed
session) C-33's mark over the same positions; a draft of the claimant's,
read, shows C-28's chip at its corner, and the region at mid holds it — a
box of its own, or, deep in its account's continuations, inside the
continuation drawn as one mark; at HOME the account's first continuation is
ONE mark (foundations §2.1; P44) holding law 13's count of what it holds,
the mid connections into it end at it and at none of its members, each
counting its links once and carrying that count on its stroke where it holds
two or more, and the mark is two targets (issue #42's design decision): the
rest of it drawing its count in what it counts, a press there opening its
members' list at the mark, newest first, with no trail entry and the walk on
the mark's stop — Esc closing it with the platform's focus on the mark's
item, Enter there opening it with the focus on its newest row, ↓ from there
standing the walk on its first member, ringed on the mark, which names it and
its place — and a band at its foot holding its newest member's label, a press
there teleporting to that member, the pointer's shape over each its own; at
HOME the first
edition's box carries ONE TAIL (issue #132's
design decision: a link whose far document the plane draws nowhere keeps its
link and names its far end at its near end) holding once each of its links
the case's own reading joins it by to a document the plane draws nowhere —
its citation of the ghost among them — its count at its end, and pressed as
a person presses it, it lists them, each row naming its far document; a
ghost address answers its face. "Shown" is
measured, not read off the DOM: the page's `visible` oracle says whether a
block, a mark or a corner lies inside the clip the page draws and the
viewport — text the DOM holds past a clip is shown to no one."""
import json
import re

from . import AGENT_SPACE, DOC, GHOST, SECOND_ACCOUNT, WINDOW, Result

WS = re.compile(r'\s+')


def squash(s):
    return WS.sub('', s or '')


def num(addr):
    """an address's components, for address order"""
    return [int(x) for x in addr.split('.')]


def in_view(ctx, rect):
    """a screen rect inside the viewport"""
    vp = ctx.js('window.__skep.view.viewport()')
    return rect['x'] >= 0 and rect['y'] >= 0 and rect['x'] + rect['w'] <= vp['VW'] and rect['y'] + rect['h'] <= vp['VH']


def decode_delivery(answer, start):
    """the wire's delivery placed at positions (UTF-8 bytes), as frames.js decodes it"""
    runs = []
    pos = start
    for it in answer.get('items', []):
        if 'content' in it:
            w = len(it['content'].encode('utf8')); runs.append({'pos': pos, 'width': w, 'kind': 'content', 'text': it['content']}); pos += w
        elif 'hex' in it:
            w = len(it['hex']) // 2; runs.append({'pos': pos, 'width': w, 'kind': 'hex', 'text': it['hex']}); pos += w
        elif 'atom' in it or 'atom_hex' in it or 'ref' in it:
            runs.append({'pos': pos, 'width': 1, 'kind': 'atom', 'text': it.get('atom', '')}); pos += 1
        elif 'withheld' in it:
            w = int(it['withheld'].get('width', 0)); runs.append({'pos': pos, 'width': w, 'kind': 'withheld', 'text': '', 'origin': it['withheld'].get('origin')}); pos += w
    return runs


def tails_home(ctx, r):
    """THE TAIL at HOME (issue #132's design decision): the case's own reading of the first edition's links — each passage link
    joining it to a document `places` does not list and the model holds no text, metadata or withheld box of, drawn at either of
    the two (LK's `draws`), each once — beside the tails the canvas drew at its box; then the tail pressed at its stroke as a
    person presses it, and the overlay it shows; its figures"""
    v = ctx.js('''(async (doc, ghost) => {
      const A = await import('./model/address.js');
      const S = window.__skep, places = new Set(S.model.places().filter((p) => !p.system).map((p) => p.doc));
      const nowhere = (far) => { const d = S.model.doc(far); return !places.has(A.documentOf(far) || far) && d.from < 0 && !d.meta && d.refused !== 'withheld'; };
      const docOf = (e) => (e.doc ? A.documentOf(e.doc) || e.doc : null);
      const joins = (l) => [[l.from, l.to], [l.to, l.from]].flatMap(([ends, others]) => ends.filter((e) => !e.whole && e.ordinal != null && e.doc)
        .flatMap((e) => others.map(docOf).filter((y) => y && y !== e.doc).map((y) => [e.doc, y])));
      const want = new Set(), cites = new Set();
      for (const la of S.model.doc(doc).links) {
        const l = S.model.link(la);
        if (!l || S.links.classify(la) !== 'passage') continue;
        for (const [x, y] of joins(l)) {
          if (x !== doc && y !== doc) continue;
          const far = x === doc ? y : x;
          if (!nowhere(far) || !(S.links.draws(la, x) || S.links.draws(la, y))) continue;
          want.add(la); if (far === ghost) cites.add(la);
        }
      }
      return {want: [...want].sort(), ghost: [...cites], tails: S.tails().filter((t) => t.at === doc && t.form === 'box'), lod: S.view.lod().name};
    })(%s, %s)''' % (json.dumps(DOC), json.dumps(GHOST)))
    mine = v['tails']
    tail = mine[0] if len(mine) == 1 else None
    r.check(v['lod'] == 'mid' and bool(v['ghost']) and tail is not None and sorted(tail['links']) == v['want'],
            'at HOME the first edition\'s box carries one tail, holding once each link the case\'s own reading joins it by to a document the plane draws nowhere — its citation of the ghost among them — drawn at either of the two',
            {'tails': [[t['links'], t['label']] for t in mine], 'links': v['want'], 'cites_ghost': v['ghost'], 'lod': v['lod']})
    if tail is None:
        return {'tails': len(mine)}
    want = str(len(tail['links'])) if len(tail['links']) > 1 else tail['far'][0]
    left = [o['reason'] for o in ctx.js('window.__skep.labelsLeftOut()') if o['kind'] == 'tail' and o['place'] == tail['key']]
    r.check((tail['label'][:1] == [want]) != bool(left), 'the tail carries its count at its end — the numeral of its links — or the pass names the rule that left it out', {'label': tail['label'], 'want': want, 'left_out': left})
    # pressed as a person presses it, at its stroke's middle: its links listed, a row for each naming its far document
    ctx.drv.mouse((tail['from']['x'] + tail['to']['x']) / 2, tail['from']['y'])
    ctx.js('new Promise(res => { const t0 = performance.now(); const step = () => { const o = window.__skep.overlay(); if ((o && o.id && (o.id === "tail" || o.id.startsWith("anatomy:"))) || performance.now() - t0 > 10000) res(true); else setTimeout(step, 30); }; step(); })')
    ctx.frames(2)
    ov = ctx.js('window.__skep.overlay()')
    rows = ctx.js('[...document.querySelectorAll(\'#overlay [data-run^="t"]\')].map((b) => b.textContent)')
    one = len(tail['links']) == 1
    r.check((ov['id'] == 'anatomy:' + tail['links'][0]) if one else (ov['id'] == 'tail' and len(rows) == len(tail['links']) and all(any(f in row for row in rows) for f in tail['far'])),
            'pressed as a person presses it, the tail lists its links — a row for each, naming its far document — or opens its one link\'s card', {'overlay': ov['id'], 'rows': rows[:8], 'far': tail['far']})
    ctx.esc()
    return {'links': len(tail['links']), 'label': tail['label'], 'left_out': left, 'pressed': ov['id'], 'rows': len(rows)}


def mark_acts(ctx, r, mark, band, newest):
    """THE MARK'S ACTS at HOME, as a person makes them (issue #42's design decision): the pointer's shape over each target its own;
    a press on the rest of the mark opens its members' list at the mark — newest first, no trail entry, the walk on the mark's
    stop — Esc closing it with the platform's focus on the mark's item; Enter there opening it again with the focus on its newest
    row, Esc returning the focus to the mark's item; ↓ from there standing the walk on the mark's first member, ringed on the
    mark, which names it and its place; a press on the newest label teleporting to that member, landed at reading scale; its
    figures"""
    rect = mark['rect']
    at_label = (band['x'] + band['w'] / 2, band['y'] + band['h'] / 2)
    at_rest = (rect['x'] + rect['w'] / 2, rect['y'] + (band['y'] - rect['y']) / 2)
    cursor = lambda x, y: (ctx.drv.mouse(x, y, kind='move'), ctx.frames(1), ctx.js('getComputedStyle(document.getElementById("plane")).cursor'))[2]
    shapes = {'label': cursor(*at_label), 'rest': cursor(*at_rest), 'off': cursor(rect['x'] - 30, at_rest[1])}
    r.check(shapes['label'] != shapes['rest'] and shapes['label'] != shapes['off'] and shapes['rest'] != shapes['off'],
            'the pointer\'s shape over the mark tells its two targets apart: one over its newest label, another over the rest of it, and neither off the mark', shapes)
    trail_before = len(ctx.js('window.__skep.trail()')['entries'])
    # its focused item: the mark's stop where it stands on one
    focused = 'document.activeElement && document.activeElement.dataset ? (document.activeElement.dataset.addr || document.activeElement.dataset.run || document.activeElement.id) : null'
    ctx.drv.mouse(*at_rest)
    ctx.settle(); ctx.frames(2)
    ov = ctx.js('window.__skep.overlay()')
    rows = ctx.js('[...document.querySelectorAll("#overlay .rows button")].map((b) => b.querySelector(".id").textContent)')
    walk = ctx.js('window.__skep.view.focus()')
    shown = ctx.js('window.__skep.go.shownIn(%s)' % json.dumps(newest))
    listed = {'overlay': ov, 'rows': rows[:3], 'n_rows': len(rows), 'trail': len(ctx.js('window.__skep.trail()')['entries']) - trail_before, 'walk': walk and [walk['kind'], walk['addr']]}
    r.check(ov['id'] == 'mark:' + mark['key'] and ov['kind'] == 'list' and rows and rows[0] == shown and listed['trail'] == 0 and listed['walk'] == ['mark', mark['key']],
            'a press on the rest of the mark opens its members\' list at the mark — its newest first — with no trail entry, the walk on the mark\'s stop', listed)
    ctx.drv.key('Escape'); ctx.frames(2)
    after_esc = {'overlay': ctx.js('window.__skep.overlay()')['id'], 'focus': ctx.js(focused)}
    r.check(after_esc['overlay'] is None and after_esc['focus'] == mark['key'], 'Esc closes it, the platform\'s focus on the mark\'s item', after_esc)
    ctx.drv.key('Enter'); ctx.settle(); ctx.frames(2)
    by_key = {'overlay': ctx.js('window.__skep.overlay()')['id'], 'focus': ctx.js(focused), 'row': ctx.js('document.activeElement && document.activeElement.querySelector && document.activeElement.querySelector(".id") ? document.activeElement.querySelector(".id").textContent : null')}
    ctx.drv.key('Escape'); ctx.frames(2)
    by_key['after_esc'] = ctx.js(focused)
    r.check(by_key['overlay'] == 'mark:' + mark['key'] and by_key['focus'] == 'm0' and by_key['row'] == shown and by_key['after_esc'] == mark['key'],
            'Enter at the mark\'s stop opens the list with the focus on its newest row; Esc returns the focus to the mark\'s item', by_key)
    # ↓ from the mark's stop: its first member in record order, ringed on the mark, which names it and its place among its members
    first = min(mark['members'], key=num)
    ctx.drv.key('ArrowDown'); ctx.settle(); ctx.frames(2)
    now = next((m for m in ctx.js('window.__skep.residues()') if m['key'] == mark['key']), None)
    ring, walk = ctx.js('window.__skep.view.ring()'), ctx.js('window.__skep.view.focus()')
    of = str(mark['n']) if mark['exact'] else ctx.js('(async () => (await import("./strings.js")).t("L.lower-bound", %s))()' % json.dumps({'n': mark['n']}))
    names = [ctx.js('(async () => (await import("./strings.js")).t("L.mark.member", %s))()' % json.dumps({'name': name, 'i': 1, 'n': of})) for name in (first[len(mark['account']):], first)]
    on_mark = bool(now and ring) and all(abs(ring[k] - now['rect'][k]) <= 1 for k in ('x', 'y', 'w', 'h'))
    ringed = {'walk': walk and [walk['kind'], walk['addr']], 'ring': ring, 'mark': now and now['rect'], 'lines': now and now['lines'], 'want': names}
    r.check(ringed['walk'] == ['document', first] and on_mark and ' '.join(now['lines']) in names,
            '↓ from the mark\'s stop stands the walk on its first member, the ring on the mark and the mark naming the member and its place among its members', ringed)
    band = (now or {}).get('newestTarget') or band
    at_label = (band['x'] + band['w'] / 2, band['y'] + band['h'] / 2)
    # the newest label, as a person presses it: a teleport to the newest member, landed at reading scale
    ctx.drv.mouse(*at_label)
    ctx.js('new Promise(res => { const t0 = performance.now(); const step = () => { const f = window.__skep.view.focus(); if ((f && f.addr === %s) || performance.now() - t0 > 10000) res(true); else setTimeout(step, 30); }; step(); })' % json.dumps(shown))
    ctx.settle()
    ctx.frames(2)
    focus = ctx.js('window.__skep.view.focus()')
    trail = ctx.js('window.__skep.trail()')['numbered']
    landed = {'focus': focus['addr'] if focus else None, 'mounted': ctx.js('window.__skep.mounted(%s)' % json.dumps(shown)) is not None,
              'lod': ctx.js('window.__skep.view.lod()')['name'], 'trail_newest': next((t['addr'] for t in trail if t['n'] == 1), None)}
    r.check(landed['focus'] == shown and landed['mounted'] and landed['lod'] == 'near' and landed['trail_newest'] == shown,
            'a press on the mark\'s newest label teleports to its newest member: the focus and the trail\'s newest entry are it, its text mounted at reading scale', landed)
    return {'cursor': shapes, 'list': listed, 'esc': after_esc, 'enter': by_key, 'ringed': ringed, 'click': landed}


def census(ctx, account, cap, stop_after=200):
    """the guest's census of an account: doc_metadata over its document numbers until a long run of unregistered"""
    out = {}
    miss = 0
    k = 1
    probes = 0
    while k <= cap:
        a = ctx.daemon_op({'op': 'doc_metadata', 'doc': f'{account}.0.{k}'})
        probes += 1
        addr = f'{account}.0.{k}'
        if a.get('resp') == 'doc_metadata':
            out[addr] = 'edition' if a.get('published') else 'draft'; miss = 0
        elif a.get('code') == 'withheld':
            out[addr] = 'withheld'; miss = 0
        elif a.get('code') == 'doc_not_registered':
            miss += 1
            if miss >= stop_after:
                break
        else:
            out[addr] = 'other:' + str(a.get('code')); miss = 0
        k += 1
    return out, probes


def run(ctx):
    r = Result()
    # ---- S1: arrive and read the first edition at the window's position -------
    ctx.leap(DOC, WINDOW[0])
    doc = ctx.js('window.__skep.model.doc(%s)' % json.dumps(DOC))
    span_set = ctx.daemon_op({'op': 'retrieve_doc_v_span_set', 'doc': DOC})
    extent_oracle = None
    for s in span_set.get('set', []):
        if s['start'].startswith('1.'):
            extent_oracle = int(s['width'].split('.')[-1])
    r.check(doc['extent'] == extent_oracle, 'the model\'s extent equals the daemon\'s span set', {'model': doc['extent'], 'oracle': extent_oracle})
    r.check(doc['from'] == 1 and doc['to'] == doc['extent'] + 1, 'the landing holds the whole document', {'from': doc['from'], 'to': doc['to']})
    delivery = ctx.daemon_op({'op': 'retrieve_v', 'specs': [{'doc': DOC, 'span': {'start': '1.1', 'width': '0.%d' % extent_oracle}}]})
    runs = decode_delivery(delivery, 1)
    content_runs = [x for x in runs if x['kind'] == 'content']
    withheld_runs = [x for x in runs if x['kind'] == 'withheld']
    r.figures['oracle_runs'] = {'content': len(content_runs), 'withheld': [(x['pos'], x['width'], x.get('origin')) for x in withheld_runs]}
    # (i) the model's held spans: every content run of the guest's delivery is the model's text at those positions
    mism = []
    for x in content_runs:
        held = ctx.js('window.__skep.model.text(%s, %d, %d)' % (json.dumps(DOC), x['pos'], x['pos'] + x['width']))
        if held != x['text']:
            mism.append({'pos': x['pos'], 'width': x['width'], 'held': held[:80], 'oracle': x['text'][:80]})
    r.check(not mism, '(i) the model\'s held text equals the daemon\'s delivery, run by run', mism)
    # the withheld run: the oracle's box and width, the entitled reader's text with C-33's mark
    r.check(len(withheld_runs) == 1 and withheld_runs[0]['pos'] == WINDOW[0] and withheld_runs[0]['width'] == WINDOW[1] and withheld_runs[0].get('origin') == WINDOW[2],
            'the guest\'s delivery withholds the window run at 1467, width 240, origin 1.0.1.0.1003 — its box and width, never its text', r.figures['oracle_runs'])
    origins = doc.get('origins') or []
    r.check(any(o['pos'] <= WINDOW[0] and o['pos'] + o['width'] >= WINDOW[0] + WINDOW[1] and o['doc'] == WINDOW[2] for o in origins),
            'the entitled reader\'s model marks the run\'s origin (the same material as 1.0.1.0.1003)', origins[:6])
    held_window = ctx.js('window.__skep.model.text(%s, %d, %d)' % (json.dumps(DOC), WINDOW[0], WINDOW[0] + WINDOW[1]))
    r.check(len(held_window.encode('utf8')) == WINDOW[1], 'the signed session holds the run\'s 240 bytes (entitled)', len(held_window.encode('utf8')))
    # (ii) the mounted article: the lines in view stand, by line (issue #122) — each block part standing, a block the
    # article cuts at a line (issue #15's fold, the view's edge) standing in parts, is its block's text over the
    # characters it holds, and the guest's delivery's bytes over the positions it holds wherever that delivery holds
    # them (it withholds the window run): its own glyphs, its chrome (the sameness hairline, C-33's mark, the symbols,
    # the "+n others" count) set aside, from the character it starts at
    mounted = ctx.js('window.__skep.mounted(%s)' % json.dumps(DOC))
    r.check(mounted is not None, 'the first edition is mounted at the landing')
    mtext = squash(mounted['text']) if mounted else ''
    parts = ctx.js('''((a) => { const enc = new TextEncoder(), blocks = new Map(window.__skep.model.doc(a).blocks.map((b) => [b.pos, b]));
      return [...document.querySelectorAll(`#domlayer .sp[data-addr="${a}"]`)].flatMap((el) => { const b = blocks.get(Number(el.dataset.pos)); if (!b || b.kind !== 'para') return [];
        const c = el.cloneNode(true); c.querySelectorAll('.hairline,.pubmark,.others,.sym').forEach((x) => x.remove());
        const own = c.textContent, char = Number(el.dataset.char || 0), p0 = b.pos + enc.encode(b.text.slice(0, char)).length;
        return [{pos: b.pos, char, p0, p1: p0 + enc.encode(own).length, own, model: b.text.slice(char, char + own.length)}]; }); })(%s)''' % json.dumps(DOC))
    held = {}
    for x in content_runs:
        for i, byte in enumerate(x['text'].encode('utf8')):
            held[x['pos'] + i] = byte
    said = lambda p0, p1: bytes(held[p] for p in range(p0, p1)).decode('utf8', 'replace') if all(p in held for p in range(p0, p1)) else None
    off = [{'pos': p['pos'], 'char': p['char'], 'dom': p['own'][:60], 'model': p['model'][:60]} for p in parts if squash(p['own']) != squash(p['model'])]
    r.check(bool(parts) and not off, '(ii) every block part standing in the mounted article is its block\'s text over the characters it holds, character for character', {'parts': len(parts), 'off': off[:6]})
    against = [p for p in parts if said(p['p0'], p['p1']) is not None]
    unsaid = [{'pos': p['pos'], 'char': p['char'], 'dom': p['own'][:60], 'oracle': said(p['p0'], p['p1'])[:60]} for p in against if squash(p['own']) != squash(said(p['p0'], p['p1']))]
    r.check(bool(against) and not unsaid, '(ii) every block part standing over positions the guest\'s delivery holds is that delivery\'s bytes over them, character for character', {'compared': len(against), 'off': unsaid[:6]})
    r.figures['parts_standing'] = {'parts': len(parts), 'against_oracle': len(against), 'blocks': len({p['pos'] for p in parts}), 'of': sum(1 for b in doc['blocks'] if b['kind'] == 'para')}
    c33 = ctx.js('window.__skep.strings.pinned().find(s => s.id === "C-33").text')
    r.check(squash(c33) in mtext, 'C-33\'s mark stands on the window run in the article', c33)
    window_block = next((b for b in doc['blocks'] if b['pos'] <= WINDOW[0] < b['pos'] + b['width']), None)
    r.check(window_block is not None, 'a block holds the window\'s first position')
    # what the DOM holds against what the page shows: every block inside the article's clip, and C-33's mark with them
    blocks_vis = ctx.js('window.__skep.visible(%s)' % json.dumps('#domlayer .sp[data-addr="%s"]' % DOC))
    hidden = [{'pos': v['pos'], 'rect': v['rect'], 'clip': v['clip']} for v in blocks_vis if not v['inClip']]
    r.check(bool(blocks_vis) and not hidden, '(ii) every block of the mounted article lies inside its clip — glyphs the DOM holds past the clip are shown to no one', {'blocks': len(blocks_vis), 'hidden': hidden[:6]})
    marks_vis = ctx.js('window.__skep.visible(%s)' % json.dumps('#domlayer .sp[data-addr="%s"] .pubmark[data-mark="C-33"]' % DOC))
    r.check(bool(marks_vis) and all(m['inClip'] for m in marks_vis), 'C-33\'s mark on the window run lies inside the article\'s clip (shown, not merely held)', [m for m in marks_vis if not m['inClip']])
    r.figures['shown'] = {'blocks': len(blocks_vis), 'blocks_past_clip': len(hidden), 'c33_marks': len(marks_vis), 'c33_marks_past_clip': sum(1 for m in marks_vis if not m['inClip'])}
    # (iii) the mirror: an item for each element of the walk — every block but a typed line of white space alone and the
    # newlines before a run's first typed line (rule 20) — and each link drawn
    size = ctx.js('window.__skep.mirror.size()')
    shown = ctx.js('window.__skep.links.shown(%s)' % json.dumps(DOC))
    elements = [b for b in doc['blocks'] if b['kind'] != 'para' or (b['text'] or '').strip() != '']
    r.check(size == len(elements) + len(shown), 'the mirror lists the document\'s elements — each typed line holding more than white space, each item — and the links drawn', {'mirror': size, 'elements': len(elements), 'blocks': len(doc['blocks']), 'links': len(shown)})
    mirror_miss = []
    for i, b in enumerate(elements):
        item = ctx.js('window.__skep.mirror.item(%d)' % i) or ''
        if b['kind'] == 'para' and squash(b['text']) not in squash(item):
            mirror_miss.append({'i': i, 'pos': b['pos'], 'item': item[:100]})
        if 'Item %d of %d.' % (i + 1, size) not in item:
            mirror_miss.append({'i': i, 'posinset': item[-40:]})
    r.check(not mirror_miss, '(iii) every element\'s mirror item quotes its text and its place in the set', mirror_miss)
    focus = ctx.js('window.__skep.view.focus()')
    r.check(focus and focus['kind'] == 'block' and window_block and focus['pos'] == window_block['pos'], 'the focus landed on the block holding position 1467', focus)
    r.check(ctx.js('window.__skep.view.lod()')['name'] == 'near', 'the landing is at reading scale')
    r.figures['first_edition'] = {'extent': doc['extent'], 'blocks': len(doc['blocks']), 'elements': len(elements), 'links_drawn': len(shown), 'links_named': len(doc['links']), 'mirror': size}
    # the owner's links in place (B1-S1): each drawn link's span lies in the oracle's text and its mark is the person's hue
    r.check(len(shown) >= 1 and all(s['linker'] == 'you' for s in shown), 'the owner\'s citations are drawn in the person\'s hue (the owner is the person)', [s['linker'] for s in shown][:5])
    # ---- S3: the far scale — counts against the census fold --------------------
    places = ctx.js('window.__skep.model.places()')
    counts = ctx.js('window.__skep.model.counts()')
    index_state = ctx.js('window.__skep.model.indexState()')
    complete = bool(index_state) and index_state.get('arm') == 'complete'
    r.figures['index_state'] = index_state
    r.figures['floor'] = ctx.js('window.__skep.model.floor()')
    fold = {}
    probes = 0
    for acct, cap in [('1.0.1', 4000), (SECOND_ACCOUNT, 400), (AGENT_SPACE, 100), ('1.1.0.1', 40)]:
        f, n = census(ctx, acct, cap)
        fold[acct] = f
        probes += n
    r.figures['census'] = {'probes': probes, 'per_account': {a: dict(sorted(((k, sum(1 for v in f.values() if v == k)) for k in set(f.values())))) for a, f in fold.items()}}
    by_acct = {}
    for p in places:
        by_acct.setdefault(p['account'], []).append(p)
    for acct, f in fold.items():
        oracle_editions = sorted(k for k, v in f.items() if v == 'edition')
        page_editions = sorted(p['doc'] for p in by_acct.get(acct, []) if p['kind'] == 'edition')
        phantom = sorted(set(page_editions) - set(oracle_editions))
        r.check(not phantom, f'{acct}: every edition `places` lists is a published document at the daemon (no phantom)', phantom[:10])
        if complete:
            r.check(oracle_editions == page_editions, f'{acct}: the index is complete, so its editions are exactly the census\'s', {'only_oracle': sorted(set(oracle_editions) - set(page_editions))[:10], 'n': (len(oracle_editions), len(page_editions))})
        else:
            r.check(len(page_editions) <= len(oracle_editions), f'{acct}: the index is at its floor, so its count is a LOWER BOUND of the census\'s', {'indexed': len(page_editions), 'census': len(oracle_editions), 'arm': index_state.get('arm') if index_state else None})
        oracle_withheld = sorted(k for k, v in f.items() if v == 'withheld')
        page_drafts = sorted(p['doc'] for p in by_acct.get(acct, []) if p['kind'] == 'draft')
        if acct == '1.0.1':
            r.check(oracle_withheld == page_drafts, f'{acct}: the claimant\'s drafts `places` lists are the documents the guest meets withheld', {'oracle': len(oracle_withheld), 'page': len(page_drafts), 'diff': sorted(set(oracle_withheld) ^ set(page_drafts))[:10]})
        else:
            r.figures.setdefault('drafts_unreadable_to_the_session', {})[acct] = oracle_withheld
        cnt = next((c for c in counts if c['account'] == acct), None)
        page_n = cnt['documents'] if cnt else len(by_acct.get(acct, []))
        oracle_n = len(oracle_editions) + (len(oracle_withheld) if acct == '1.0.1' else 0)
        r.check(page_n == len(by_acct.get(acct, [])), f'{acct}: the count drawn at the far scale equals the places listed', {'count': page_n, 'listed': len(by_acct.get(acct, []))})
        if cnt is not None:
            r.check(cnt.get('exact') == complete, f'{acct}: the count is marked exact only where the index is complete (else the lower-bound mark)', {'exact': cnt.get('exact'), 'complete': complete})
        r.figures['census'].setdefault('page', {})[acct] = {'count': page_n, 'exact': cnt.get('exact') if cnt else None, 'editions': len(page_editions), 'drafts': len(page_drafts), 'census_editions': len(oracle_editions), 'census_withheld': len(oracle_withheld), 'census_total_for_class': oracle_n}
    r.note('the provider\'s index runs from the reclaim floor (`places.state`): documents unchanged since the floor are not listed, so the far scale\'s counts are lower bounds with their mark; the census at the daemon is the full set — the figures say both')
    system_places = [p for p in places if p.get('system')]
    r.figures['system_rows_held'] = [p['doc'] for p in system_places]
    r.note('the system account\'s rows (the head document H and its members) are HELD by the model and not drawn (the H ruling); the census sees them published')
    # the boxes: each document's box inside its account's cell; two documents never share a box
    cell = ctx.js('window.__skep.accountCell("1.0.1")')
    boxes = {a: ctx.js('window.__skep.boxOf(%s)' % json.dumps(a)) for a in [DOC, '1.0.1.0.4', '1.0.1.0.19', '1.0.1.0.127', '1.0.1.0.1003']}
    inside = all(b['x'] >= cell['x'] - 1e-6 and b['y'] >= cell['y'] - 1e-6 and b['x'] + b['w'] <= cell['x'] + cell['w'] + 1e-6 and b['y'] + b['h'] <= cell['y'] + cell['h'] + 1e-6 for b in boxes.values())
    r.check(inside, 'every sampled document box lies inside its account\'s cell', {k: (round(v['x']), round(v['y']), round(v['w'], 2), round(v['h'], 2)) for k, v in boxes.items()})
    keys = list(boxes)
    overl = [(keys[i], keys[j]) for i in range(len(keys)) for j in range(i + 1, len(keys)) if boxes[keys[i]]['x'] < boxes[keys[j]]['x'] + boxes[keys[j]]['w'] and boxes[keys[j]]['x'] < boxes[keys[i]]['x'] + boxes[keys[i]]['w'] and boxes[keys[i]]['y'] < boxes[keys[j]]['y'] + boxes[keys[j]]['h'] and boxes[keys[j]]['y'] < boxes[keys[i]]['y'] + boxes[keys[i]]['h']]
    r.check(not overl, 'no two sampled documents share a box (reading order, no collision)', overl)
    r.figures['residue_depth'] = {'1.0.1.0.3': ctx.js('window.__skep.depthOf("1.0.1.0.3")'), '1.0.1.0.1003': ctx.js('window.__skep.depthOf("1.0.1.0.1003")'), 'residue_boxes': [a for a in boxes if boxes[a].get('residue')]}
    # ---- S2: the claimant's drafts — one read with its corner, then the region at mid ----
    drafts = [p['doc'] for p in places if p['kind'] == 'draft' and p['account'] == '1.0.1']
    r.check(len(drafts) >= 1, 'the session\'s index lists the claimant\'s drafts', len(drafts))
    if drafts:
        draft = sorted(drafts, key=lambda a: int(a.split('.')[-1]))[1] if len(drafts) > 1 else drafts[0]
        ctx.leap(draft, None)
        md = ctx.js('window.__skep.mounted(%s)' % json.dumps(draft))
        chip_on = ctx.js('window.__skep.strings.pinned().find(s => s.id === "C-28.flag-on").text')
        chip = ctx.js('window.__skep.strings.pinned().find(s => s.id === "C-28").text')
        r.check(md is not None, 'a draft of the claimant\'s mounts at reading scale', draft)
        full = ctx.js('(() => { const m = window.__skep.mountedAddrs(); const el = document.querySelector(`[data-corner="${%s}"]`); return el ? el.textContent : null; })()' % json.dumps(draft))
        r.check(full is not None and (squash(chip_on) in squash(full) or squash(chip) in squash(full)), 'the draft\'s corner carries C-28\'s chip (the flag-on form on this claimed local-trust board)', full)
        corner_vis = ctx.js('window.__skep.visible(%s)' % json.dumps('#corners [data-corner="%s"]' % draft))
        corner_shown = len(corner_vis) == 1 and corner_vis[0]['inClip'] and corner_vis[0]['inView']
        r.check(corner_shown, 'the draft\'s corner stands beside its article, inside its clip and the viewport (the chip is shown, not merely held)', corner_vis)
        r.figures['draft_shown'] = {'addr': draft, 'corner': full, 'corner_shown': corner_shown, 'depth': ctx.js('window.__skep.depthOf(%s)' % json.dumps(draft))}
        dbox = ctx.js('window.__skep.boxOf(%s)' % json.dumps(draft))
        ctx.set_view(dbox['x'] + dbox['w'] / 2, dbox['y'] + dbox['h'] / 2, ctx.js('window.__skep.scaleFor(%s, "doc", 160)' % json.dumps(DOC)))
        r.check(ctx.js('window.__skep.view.lod()')['name'] in ('mid', 'mid~near'), 'the region at mid scale (a depth-0 document 160 px wide)', ctx.js('window.__skep.view.lod()'))
        depth = ctx.js('window.__skep.depthOf(%s)' % json.dumps(draft))
        holding = [m for m in ctx.js('window.__skep.residues()') if m['account'] == '1.0.1' and draft in m['members']]
        if depth >= 2:
            r.check(len(holding) == 1 and holding[0]['k'] == 2 and in_view(ctx, holding[0]['rect']),
                    'at the region\'s mid scale the draft stands inside its account\'s second continuation, drawn as ONE mark in view — the first continuation\'s documents stand whole',
                    [{k: m[k] for k in ('k', 'n', 'rect')} for m in holding])
        else:
            r.check(not holding and dbox['w'] * ctx.camera()['scale'] >= 2, 'the draft has a box of its own at the region\'s mid scale', dbox['w'] * ctx.camera()['scale'])
        if dbox.get('residue'):
            r.check(depth > 11, 'the draft lies past the continuation rule\'s precision floor (depth 11): its box is the account\'s RESIDUE cell, drawn with its corner at its own scale', {'depth': depth})
        r.figures['draft_shown']['residue'] = bool(dbox.get('residue'))
        r.figures['draft_shown']['mark_at_mid'] = {k: holding[0][k] for k in ('k', 'n', 'exact', 'newest', 'rect', 'lines')} if holding else None
    # ---- S2: HOME — the account's first continuation as one mark, two targets: its newest's label and its list (foundations §2.1; P44; issue #42) ----
    ctx.js('window.__skep.go.home()')
    ctx.settle()
    ctx.frames(2)
    r.figures['home_tail'] = tails_home(ctx, r)
    marks = [m for m in ctx.js('window.__skep.residues()') if m['account'] == '1.0.1']
    mark = marks[0] if len(marks) == 1 else None
    r.check(mark is not None and mark['k'] == 1, 'at HOME the account\'s first continuation is drawn as ONE mark — its oldest 48 stand whole', [{k: m[k] for k in ('k', 'n', 'rect')} for m in marks])
    if mark:
        members = mark['members']
        deep = ctx.js('window.__skep.model.places().filter(p => p.account === "1.0.1" && !p.system && window.__skep.depthOf(p.doc) >= 1).map(p => p.doc)')
        r.check(set(deep) <= set(members) and mark['n'] == len(members), 'the mark counts what the continuation holds: every document past the oldest 48 the index lists (law 13)',
                {'n': mark['n'], 'members': len(members), 'indexed': len(deep), 'missing': sorted(set(deep) - set(members), key=num)[:10]})
        newest = max(members, key=num)
        r.check(mark['newest'] == newest, 'the mark\'s representative is its newest member, the highest-numbered', {'newest': mark['newest'], 'expected': newest})
        # the mark's two targets (issue #42's design decision): the rest of it says its count in what it counts; a band at its foot holds its
        # newest member's label as a box's label sets it — the version its box shows, its fields past the region's prefix, led by their
        # separator (".0.1012", never "0.1012")
        count = ctx.js('(async () => (await import("./strings.js")).markCount(%d, %s))()' % (mark['n'], json.dumps(mark['exact'])))
        short = ctx.js('window.__skep.go.shownIn(%s)' % json.dumps(newest))[len('1.0.1'):]
        band = mark.get('newestTarget')
        r.check(' '.join(mark['lines']) == count and ('≥' in count) != mark['exact'] and (mark.get('newestLines') or [None])[0] == short and band is not None
                and band['h'] >= 24 and band['y'] - mark['rect']['y'] >= 24,
                'the mark is two targets: the rest of it draws its count in what it counts — "≥" while the index runs from its floor — and a band at its foot, 24 px tall at the least below 24 px of the rest, its newest member\'s label, its address a word of its own led by the separator',
                {'lines': mark['lines'], 'count': count, 'newest_lines': mark.get('newestLines'), 'newest': short, 'band': band, 'rect': mark['rect']})
        r.check(in_view(ctx, mark['rect']), 'the mark stands inside the viewport at HOME', mark['rect'])
        conns = ctx.js('window.__skep.connections()')
        at_member = [c for c in conns if c['a'] in members or c['b'] in members]
        r.check(not at_member, 'no mid connection ends at a document the mark holds: one line to the mark, never a stack of its members (P44)', at_member[:6])
        # LK's own rule, read apart from the canvas: the links joining each document of the first grid (and each the canvas joined to the mark)
        # to a document the mark holds — a far end standing at its document, a version member named whole at the box it shares with its
        # document — met in the links of either and drawn at either of the two (LK's `draws`: a link stands at a mark joining two documents
        # where either document's composition draws it), each once
        into = {(c['b'] if c['a'] == mark['key'] else c['a']): c['count'] for c in conns if mark['key'] in (c['a'], c['b'])}
        linked = ctx.js('''(async () => {
          const A = await import('./model/address.js');
          const S = window.__skep, mem = new Set(%s), docOf = (e) => (e.doc ? A.documentOf(e.doc) || e.doc : null);
          const joins = (l) => [[l.from, l.to], [l.to, l.from]].flatMap(([ends, others]) => ends.filter((e) => !e.whole && e.ordinal != null && e.doc)
            .flatMap((e) => others.map(docOf).filter((y) => y && y !== e.doc).map((y) => [e.doc, y])));
          const first = S.model.places().filter((p) => p.account === "1.0.1" && !p.system && S.depthOf(p.doc) === 0).map((p) => p.doc);
          const docs = new Set([...first, ...%s]), links = new Map([...docs].map((a) => [a, new Set()]));
          for (const d of new Set([...docs, ...mem])) {
            if (!A.isAddress(d)) continue;
            for (const la of S.model.doc(d).links) {
              const l = S.model.link(la);
              if (!l || S.links.classify(la) !== 'passage') continue;
              for (const [x, y] of joins(l)) {
                if (x !== d && y !== d) continue;
                const [a, m] = mem.has(y) ? [x, y] : [y, x];
                if (mem.has(m) && !mem.has(a) && links.has(a) && (S.links.draws(la, x) || S.links.draws(la, y))) links.get(a).add(la);
              }
            }
          }
          return Object.fromEntries([...links].map(([a, s]) => [a, s.size]).filter(([, n]) => n > 0));
        })()''' % (json.dumps(members), json.dumps(sorted(into))))
        r.check(bool(linked) and into == linked, 'each document standing whole that a link joins to a document the mark holds — drawn at either of the two — is joined to the MARK by one connection counting those links, each once, and no other is',
                {'drawn': into, 'links': linked})
        # the count on the stroke (foundations §2.1's register: "one connection drawn per document pair with its count"; P44 forbids a merged
        # mark that hides it): the numeral of LK's links, read apart from the canvas, where the connection holds two or more; none where one
        carried = {(c['b'] if c['a'] == mark['key'] else c['a']): c.get('label') for c in conns if mark['key'] in (c['a'], c['b'])}
        miscarried = {d: {'links': linked.get(d), 'carries': n} for d, n in carried.items() if n != (str(linked[d]) if linked.get(d, 0) >= 2 else None)}
        r.check(any(n >= 2 for n in linked.values()) and not miscarried, 'each connection into the mark carries its count on its stroke where it holds two links or more — the numeral of those links — and none where it holds one',
                {'miscarried': miscarried, 'carried': carried})
        r.figures['home_mark'] = dict({k: mark[k] for k in ('k', 'n', 'exact', 'newest', 'lines', 'rect')}, newest_lines=mark.get('newestLines'), newest_target=band, connections_to_mark={'drawn': into, 'links': linked, 'carried': carried})
        if band:
            r.figures['home_mark']['acts'] = mark_acts(ctx, r, mark, band, newest)

    # ---- S8: a ghost address faces --------------------------------------------
    ctx.js('window.__skep.go.leapTo(%s, null)' % json.dumps(GHOST))
    ctx.settle()
    ov = ctx.js('window.__skep.overlay()')
    face = ctx.js('window.__skep.model.doc(%s)' % json.dumps(GHOST))
    r.check(face['refused'] == 'unregistered', 'the ghost\'s read answers doc_not_registered and the model keeps the fact', face['refused'])
    r.check(ov['kind'] == 'face' and GHOST in (ov['text'] or ''), 'the dead-reference face names the address (B1.doc_not_registered)', ov)
    ctx.esc()
    # ---- S13: the agent space -----------------------------------------------------
    agent_places = [p for p in places if p['account'] == AGENT_SPACE]
    r.figures['agent_space'] = {'places': [p['doc'] for p in agent_places], 'census': fold.get(AGENT_SPACE)}
    r.note('the agent space 1.0.1.1 holds its home document 1.0.1.1.0.1 at the daemon (published, the delegation\'s mint); "the empty agent space" of the record §8.4 is not empty on this board — reported')
    ctx.leap(DOC, WINDOW[0])
    return r.out()
