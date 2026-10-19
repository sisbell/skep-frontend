"""RENDERED — class 1 (the structure record §6.3; T3 (1)): for every B1
screen built, the text the page shows equals the record's. The oracle is the
harness's own token-free `POST /op` to the daemon (Python `urllib`): a guest's
`retrieve_v` over the first edition, compared to (i) the model's held spans,
(ii) the mounted article's `textContent`, (iii) the mirror's items — S1's
three renderings against the real daemon. The far scale's counts equal the
harness's own fold of the daemon's documents (the census probe PUB-6.52
names: `doc_metadata` over each account's document numbers — its oracle for
`places`); the window run the guest meets WITHHELD shows the oracle its box
and width (240), never its text, and shows the entitled reader (the signed
session) C-33's mark over the same positions; the claimant's drafts are drawn
at mid with their corner; a ghost address answers its face. "Shown" is
measured, not read off the DOM: the page's `visible` oracle says whether a
block, a mark or a corner lies inside the clip the page draws — text the DOM
holds past a clip is shown to no one — and those checks are marked with the
page issue they wait on."""
import json
import re

from . import AGENT_SPACE, DOC, GHOST, SECOND_ACCOUNT, WINDOW, XFAIL_CLIP, Result

WS = re.compile(r'\s+')


def squash(s):
    return WS.sub('', s or '')


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
    # (ii) the mounted article
    mounted = ctx.js('window.__skep.mounted(%s)' % json.dumps(DOC))
    r.check(mounted is not None, 'the first edition is mounted at the landing')
    mtext = squash(mounted['text']) if mounted else ''
    # the glyphs of each block's element, its chrome (the sameness hairline, C-33's mark, the symbols, the "+n others" count) set aside
    glyphs = ctx.js('''(() => { const out = {}; for (const el of document.querySelectorAll('.sp[data-addr=%s]')) { const c = el.cloneNode(true); c.querySelectorAll('.hairline,.pubmark,.others,.sym').forEach(x => x.remove()); out[el.dataset.pos] = c.textContent; } return out; })()''' % json.dumps(DOC))
    missing_blocks = [{'pos': b['pos'], 'dom': (glyphs.get(str(b['pos'])) or '')[:60]} for b in doc['blocks'] if b['kind'] == 'para' and squash(glyphs.get(str(b['pos']))) != squash(b['text'])]
    r.check(not missing_blocks, '(ii) every block\'s glyphs in the mounted article are its text, character for character', missing_blocks)
    joined = squash(''.join(glyphs.get(str(b['pos'])) or '' for b in doc['blocks']))
    for x in content_runs:
        r.check(squash(x['text']) in joined, '(ii) the oracle\'s content run is in the mounted glyphs', {'pos': x['pos'], 'width': x['width']})
    c33 = ctx.js('window.__skep.strings.pinned().find(s => s.id === "C-33").text')
    r.check(squash(c33) in mtext, 'C-33\'s mark stands on the window run in the article', c33)
    window_block = next((b for b in doc['blocks'] if b['pos'] <= WINDOW[0] < b['pos'] + b['width']), None)
    r.check(window_block is not None, 'a block holds the window\'s first position')
    # what the DOM holds against what the page shows: every block inside the article's clip, and C-33's mark with them
    blocks_vis = ctx.js('window.__skep.visible(%s)' % json.dumps('#domlayer .sp[data-addr="%s"]' % DOC))
    hidden = [{'pos': v['pos'], 'rect': v['rect'], 'clip': v['clip']} for v in blocks_vis if not v['inClip']]
    r.check(bool(blocks_vis) and not hidden, '(ii) every block of the mounted article lies inside its clip — glyphs the DOM holds past the clip are shown to no one', {'blocks': len(blocks_vis), 'hidden': hidden[:6]}, xfail=XFAIL_CLIP)
    marks_vis = ctx.js('window.__skep.visible(%s)' % json.dumps('#domlayer .sp[data-addr="%s"] .pubmark[data-mark="C-33"]' % DOC))
    r.check(bool(marks_vis) and all(m['inClip'] for m in marks_vis), 'C-33\'s mark on the window run lies inside the article\'s clip (shown, not merely held)', [m for m in marks_vis if not m['inClip']], xfail=XFAIL_CLIP)
    r.figures['shown'] = {'blocks': len(blocks_vis), 'blocks_past_clip': len(hidden), 'c33_marks': len(marks_vis), 'c33_marks_past_clip': sum(1 for m in marks_vis if not m['inClip'])}
    # (iii) the mirror
    size = ctx.js('window.__skep.mirror.size()')
    shown = ctx.js('window.__skep.links.shown(%s)' % json.dumps(DOC))
    r.check(size == len(doc['blocks']) + len(shown), 'the mirror lists the document\'s blocks and the links drawn', {'mirror': size, 'blocks': len(doc['blocks']), 'links': len(shown)})
    mirror_miss = []
    for i, b in enumerate(doc['blocks']):
        item = ctx.js('window.__skep.mirror.item(%d)' % i) or ''
        if b['kind'] == 'para' and squash(b['text']) not in squash(item):
            mirror_miss.append({'i': i, 'pos': b['pos'], 'item': item[:100]})
        if 'Item %d of %d.' % (i + 1, size) not in item:
            mirror_miss.append({'i': i, 'posinset': item[-40:]})
    r.check(not mirror_miss, '(iii) every block\'s mirror item quotes its text and its place in the set', mirror_miss)
    focus = ctx.js('window.__skep.view.focus()')
    r.check(focus and focus['kind'] == 'block' and window_block and focus['pos'] == window_block['pos'], 'the focus landed on the block holding position 1467', focus)
    r.check(ctx.js('window.__skep.view.lod()')['name'] == 'near', 'the landing is at reading scale')
    r.figures['first_edition'] = {'extent': doc['extent'], 'blocks': len(doc['blocks']), 'links_drawn': len(shown), 'links_named': len(doc['links']), 'mirror': size}
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
    # ---- S2: the claimant's drafts at mid with their corner ---------------------
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
        corner_vis = ctx.js('window.__skep.visible(%s)' % json.dumps('#domlayer [data-corner="%s"]' % draft))
        r.check(bool(corner_vis) and all(c['inClip'] for c in corner_vis), 'the draft\'s corner lies inside its clip (the chip is shown, not merely held)', corner_vis, xfail=XFAIL_CLIP)
        r.figures['draft_shown'] = {'addr': draft, 'corner': full, 'corner_in_clip': bool(corner_vis) and all(c['inClip'] for c in corner_vis), 'depth': ctx.js('window.__skep.depthOf(%s)' % json.dumps(draft))}
        dbox = ctx.js('window.__skep.boxOf(%s)' % json.dumps(draft))
        ctx.set_view(dbox['x'] + dbox['w'] / 2, dbox['y'] + dbox['h'] / 2, ctx.js('window.__skep.scaleFor(%s, "doc", 160)' % json.dumps(DOC)))
        r.check(ctx.js('window.__skep.view.lod()')['name'] in ('mid', 'mid~near'), 'the region at mid scale (a depth-1 document 160 px wide)', ctx.js('window.__skep.view.lod()'))
        depth = ctx.js('window.__skep.depthOf(%s)' % json.dumps(draft))
        if dbox.get('residue'):
            r.check(depth > 11, 'the draft lies past the continuation rule\'s precision floor (depth 11): it shares the account\'s RESIDUE cell at mid, drawn with its corner at its own scale', {'depth': depth})
            r.note('the seed\'s drafts (documents 1000 and up) are the 20th-and-deeper continuation of their account: the plane holds them in the residue cell (the escalation `continuation-depth-camera`), the LEAP and the walk reach them; at the region\'s mid scale the residue mark counts them')
        else:
            r.check(dbox['w'] * ctx.camera()['scale'] >= 2, 'the draft has a box at the region\'s mid scale', dbox['w'] * ctx.camera()['scale'])
        r.figures['draft_shown']['residue'] = bool(dbox.get('residue'))
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
