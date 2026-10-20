"""GUEST — the page at guest class (foundations §3.3's state 1; B1-S1's guest
line, B1-S2's withheld box, B1-S7's placeholder, B1-S5's C-39 face; W-01,
the arrival from outside): the page opened afresh under `?gate=guest`, which
boots it as shipped but never asks `session(board)`, so every read takes the
guest form. What a guest must never meet is read first on the owner's signed
page and kept: the window run's 240 bytes, the claimant's drafts with their
first lines, the owner's places. Then, on the guest's page:
(a) the reads at guest class: the cold open's five calls, no session in the
    model, no `session` call in the page's own log or in the provider's from
    the navigation on, every `op` and `places` call in the guest form;
(b) the one line in state 1: the guest line, the board's origin and the
    venue, its one act sign in standing — never pressed: what it does for a
    guest who has not tried is the design's to rule — and no acting-as
    words, no key-present claim, no device label;
(c) HOME the board's extent (R92 rider (c)): the launch's focus the board,
    the trail's first entry, the address the clamp's line; the LEAP box
    listing no HOME level; Mod+Shift+H from a document returning there;
(d) the drafts: none in the index, every place one the owner's index lists,
    each account's count the places listed; no label or mark drawing a draft
    — at its box, held in a mark, its first line, the draft mark — at WHOLE
    BOARD, HOME, the region at mid and the extents; a LEAP to a draft of the
    claimant's refused `withheld`, no text delivered, nothing mounted, no
    corner or chip, no label naming a draft's first line or the draft mark —
    every draft of the claimant's on this board lies past the sound depth,
    its box the account's residue cell, where the continuation's one mark
    stands; and a LEAP to a withheld document with a box of its own (the
    second account's draft) drawing its withheld box, its label the address
    and B1-S2's words alone (existence and owner, never bytes) — the one
    line naming that landing is marked, waiting on the walk's focus at a
    document the index does not list;
(e) the window run at 1467 withheld: the model's block — its width, its
    origin, no text — B1-S7's placeholder with its head, R56's key-absent arm
    and no C-33 mark, none of the owner's bytes anywhere in the page, the
    mirror's item naming the run; the placeholder shown, and every row of
    the article inside its box — marked, waiting on the placeholder set in the
    article's flow taller than the run it occupies;
(f) the guest's own acts: every link at the first edition drawn as its
    owner's, never "you"; C-39's face at the run with the placeholder's own
    arm beneath; "who wrote this?" answering over a block.
Shots into `shots/guest/`. The owner's page is opened again at the end and
the first edition read, as the cases after this one expect."""
import json
import re
from collections import Counter

from . import DOC, SECOND_ACCOUNT, WINDOW, WITHHELD, XFAIL_FACE, XFAIL_FOCUS, Result

OWNER = '1.0.1'
# a stretch of the owner's bytes over the run, in characters with white space folded, that the guest's page must never hold
STRETCH = 24
# the shortest part of a label line that names a first line
NAMES = 12
GUEST_CALLS = ['boards', 'fingerprint', 'health', 'probe', 'places']
PLACEHOLDER = '#domlayer article[data-addr="%s"] .withheld[data-pos="%d"]' % (DOC, WINDOW[0])


def squash(s):
    return re.sub(r'\s+', '', s or '')


def num(addr):
    return [int(x) for x in addr.split('.')]


def plain(text):
    """a first line as a label draws it: its heading marks and a cut's ellipsis set aside"""
    return re.sub(r'^#+\s*', '', (text or '').strip()).rstrip('…').strip()


def t(ctx, sid, values=None):
    """one of the page's strings (`strings.js`)"""
    return ctx.js('(async () => (await import("./strings.js")).t(%s, %s))()' % (json.dumps(sid), json.dumps(values or {})))


def calls(ctx):
    """the page's own call log: each call's name and the argument object it posted"""
    return [{'name': c['name'], 'args': json.loads(c['args']) if c.get('args') else None} for c in ctx.js('window.__skep.bridge.calls()')]


def run(ctx):
    r = Result()
    # ---- the owner's page: what a guest must never meet ----------------------------------------------------
    ctx.leap(DOC, WINDOW[0])
    owner_places = ctx.js('window.__skep.model.places()')
    secret = ctx.js('window.__skep.model.text(%s, %d, %d)' % (json.dumps(DOC), WINDOW[0], WINDOW[0] + WINDOW[1]))
    drafts = sorted((p['doc'] for p in owner_places if p['kind'] == 'draft' and p['account'] == OWNER), key=num)
    draft_lines = [plain(p['label']) for p in owner_places if p['kind'] == 'draft' and plain(p['label'])]
    edition_lines = [plain(p['label']) for p in owner_places if p['kind'] == 'edition' and plain(p['label'])]
    r.check(ctx.js('window.__skep.model.session()') is not None and len(secret.encode('utf8')) == WINDOW[1] and bool(drafts),
            'the owner\'s page reads the window run\'s 240 bytes and lists the claimant\'s drafts — what the guest must never meet',
            {'run_bytes': len(secret.encode('utf8')), 'drafts': len(drafts)})
    draft_word = t(ctx, 'F.label.draft')

    # ---- the guest's page ----------------------------------------------------------------------------------
    log = ctx.provider_log()
    seq = log[-1]['seq'] if log else -1
    boot = ctx.open_page('guest')
    # (a) the cold open at guest class
    r.check(boot.get('coldOpenCalls') == GUEST_CALLS, '(a) the cold open asks no session: boards, fingerprint, health, probe, places', boot.get('coldOpenCalls'))
    r.check(ctx.js('window.__skep.model.session()') is None, '(a) the model holds no session', ctx.js('window.__skep.model.session()'))
    # (b) the one line in state 1
    line = ctx.js('window.__skep.line()')
    ids = ctx.js('[...document.querySelectorAll("#line [data-string]")].map((e) => e.dataset.string)')
    signin = ctx.js('(() => { const b = document.querySelector("#line [data-act=signin]"); return b ? b.textContent : null; })()')
    origin = ctx.js('window.__skep.model.board().origin')
    device = ctx.js('window.__skep.model.device()')
    r.check(line['state'] == 1 and 'B1.guest-line' in ids and 'F.venue.notebook' in ids and 'F.acting-as' not in ids,
            '(b) the one line\'s acting-as segment is in state 1: the guest line and the venue', {'state': line['state'], 'strings': ids})
    r.check(t(ctx, 'B1.guest-line') in line['text'] and origin in line['text'] and t(ctx, 'F.venue.notebook') in line['text'],
            '(b) the line reads "reading as a guest", the board\'s origin and the venue', line['text'])
    claims = ['acting as', 'key present on this device'] + ([device['label']] if device and device.get('label') else [])
    r.check(not [w for w in claims if w in line['text']], '(b) the line claims no acting account, no key on this device and no device label', {'found': [w for w in claims if w in line['text']], 'line': line['text']})
    r.check(signin == t(ctx, 'F.sign-in'), '(b) its one act, sign in, stands', signin)
    r.figures['line'] = line['text']
    # (c) HOME is the board's extent
    launch = {'cam': ctx.camera(), 'focus': ctx.js('window.__skep.view.focus()'), 'address': ctx.js('window.__skep.line().address'),
              'first_entry': (ctx.js('window.__skep.trail().entries') or [{}])[0].get('addr')}
    clamp = t(ctx, 'B1.clamp')
    r.check(bool(launch['focus']) and launch['focus']['kind'] == 'board' and launch['focus']['addr'] == '1' and launch['first_entry'] == '1' and launch['address']['text'] == '1 · ' + clamp,
            '(c) the launch frame is a guest\'s HOME, the board\'s extent: the focus the board, the trail\'s first entry the board, the address "1 · %s"' % clamp, launch)
    r.figures['shots'] = [ctx.shot('guest/launch.png')]
    # (d) the drafts: the index, then the labels and marks at the far, home and mid views
    places = ctx.js('window.__skep.model.places()')
    docs = {p['doc'] for p in places}
    owner_docs = {p['doc'] for p in owner_places}
    r.check(not [p['doc'] for p in places if p['kind'] == 'draft'] and not docs & set(drafts),
            '(d) the guest\'s index lists no draft, the claimant\'s none of them', {'drafts_listed': [p['doc'] for p in places if p['kind'] == 'draft'][:6], 'claimant_drafts_listed': sorted(docs & set(drafts), key=num)[:6]})
    r.check(bool(docs) and docs <= owner_docs, '(d) every place the guest\'s index lists, the owner\'s lists too', sorted(docs - owner_docs, key=num)[:10])
    listed = Counter(p['account'] for p in places)
    off = [{'account': c['account'], 'count': c['documents'], 'listed': listed.get(c['account'], 0)} for c in ctx.js('window.__skep.model.counts()') if not c['system'] and c['documents'] != listed.get(c['account'], 0)]
    r.check(not off, '(d) each account\'s count is the places the guest\'s index lists for it', off)

    def naming_a_draft(labels):
        """the label lines that name a draft: the draft mark, or a stretch of a draft's first line no edition's holds"""
        named = []
        for l in labels:
            for x in l['lines']:
                p = plain(x['text'])
                if (' · ' + draft_word) in x['text'] or (len(p) >= NAMES and any(p in d for d in draft_lines) and not any(p in e for e in edition_lines)):
                    named.append({'kind': l['kind'], 'place': l['place'], 'text': x['text']})
        return named

    def draws_no_draft(name):
        """no label at a draft's box, no mark holding a draft, no label line naming a draft's first line or the draft mark"""
        labels, marks = ctx.js('window.__skep.labels()'), ctx.js('window.__skep.residues()')
        at = [l['place'] for l in labels if l['kind'] == 'doc' and l['place'] in drafts]
        held = [{'mark': m['key'], 'newest': m['newest'], 'drafts': [a for a in m['members'] if a in drafts][:4]} for m in marks if m['newest'] in drafts or any(a in drafts for a in m['members'])]
        named = naming_a_draft(labels)
        r.check(not at and not held and not named, f'(d) {name}: no label or mark draws a draft — none at a draft\'s box, no mark holding one, no line naming a draft\'s first line or the draft mark',
                {'at_draft': at[:4], 'marks': held[:4], 'named': named[:4]})
        return {'labels': len(labels), 'marks': len(marks)}

    seen = {}
    ctx.js('window.__skep.go.wholeBoard()'); ctx.settle(); ctx.frames(2)
    seen['whole-board'] = draws_no_draft('WHOLE BOARD')
    ctx.js('window.__skep.go.home()'); ctx.settle(); ctx.frames(2)
    seen['home'] = draws_no_draft('HOME')
    ctx.js('(async () => { const C = await import("./plane/camera.js"), P = await import("./plane/projection.js"); window.__skep.view.set(C.viewForCell(P.accountCell(%s), 0.85)); })()' % json.dumps(OWNER))
    ctx.settle(); ctx.frames(2)
    seen['region-mid'] = draws_no_draft('the claimant\'s region at mid')
    r.figures['shots'].append(ctx.shot('guest/region-mid.png'))
    ctx.view_doc_px(DOC, 120)
    seen['extents'] = draws_no_draft('the extents about the first edition')
    r.figures['views'] = seen

    # (e) the window run at 1467, withheld
    ctx.leap(DOC, WINDOW[0])
    doc = ctx.js('window.__skep.model.doc(%s)' % json.dumps(DOC))
    run_blocks = [b for b in doc['blocks'] if b['kind'] == 'withheld' and b['pos'] <= WINDOW[0] < b['pos'] + b['width']]
    held_text = ctx.js('window.__skep.model.text(%s, %d, %d)' % (json.dumps(DOC), WINDOW[0], WINDOW[0] + WINDOW[1]))
    r.check(len(run_blocks) == 1 and run_blocks[0]['pos'] == WINDOW[0] and run_blocks[0]['width'] == WINDOW[1] and run_blocks[0]['origin'] == WINDOW[2] and held_text == '',
            '(e) the model holds the window run as a withheld block — at 1467, 240 positions, its origin 1.0.1.0.1003 — and none of its text', {'blocks': run_blocks, 'held_text': held_text[:40]})
    ph = ctx.js('''[...document.querySelectorAll(%s)].map((e) => ({pos: Number(e.dataset.pos), width: Number(e.dataset.width), origin: e.dataset.origin,
      head: (e.querySelector('.wh-head') || {}).textContent || null, arm: (e.querySelector('.arm') || {}).textContent || null}))''' % json.dumps('#domlayer article[data-addr="%s"] .withheld' % DOC))
    head = t(ctx, 'B1.withheld-run', {'owner': OWNER, 'account': OWNER, 'width': WINDOW[1], 'origin': WINDOW[2]})
    arm = t(ctx, 'R56.key-absent', {'owner': OWNER})
    c33 = ctx.js('document.querySelectorAll(%s).length' % json.dumps('#domlayer article[data-addr="%s"] .pubmark[data-mark="C-33"]' % DOC))
    r.check(len(ph) == 1 and ph[0]['pos'] == WINDOW[0] and ph[0]['width'] == WINDOW[1] and ph[0]['origin'] == WINDOW[2] and ph[0]['head'] == head and ph[0]['arm'] == arm and c33 == 0,
            '(e) the mounted article holds B1-S7\'s placeholder at the run — its position, width and origin, its head, R56\'s key-absent arm — and no C-33 mark', {'placeholders': ph, 'c33_marks': c33})
    legit = squash(''.join(ctx.js('window.__skep.model.text(%s, 1, 1e9)' % json.dumps(a)) for a in sorted(set(ctx.js('window.__skep.mountedAddrs()')) | {DOC})) + ''.join(p['label'] or '' for p in places))
    body, own = squash(ctx.js('document.body.textContent')), squash(secret)
    stretches = {own[i:i + STRETCH] for i in range(max(0, len(own) - STRETCH + 1))}
    leaks = sorted(s for s in stretches if s in body and s not in legit)
    r.check(len(own) >= STRETCH and not leaks, f'(e) none of the owner\'s bytes over the run stands anywhere in the page: no stretch of {STRETCH} of its characters, white space folded, that the guest\'s own delivered text and labels do not hold', leaks[:4])
    item = ctx.js('window.__skep.mirror.item(window.__skep.mirror.index())') or ''
    r.check(item.startswith('withheld run in %s: %d positions, origin %s.' % (DOC, WINDOW[1], WINDOW[2])), '(e) the mirror\'s current item at the landing names the withheld run, its width and its origin', item[:120])
    box = ctx.js('window.__skep.boxOf(%s)' % json.dumps(DOC))
    ctx.view_doc_em(DOC, 14)
    ctx.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] * (0.12 + 0.8 * (WINDOW[0] - 1) / doc['extent']), ctx.camera()['scale'])
    vis = ctx.js('window.__skep.visible(%s)' % json.dumps(PLACEHOLDER))
    r.check(len(vis) == 1 and vis[0]['inClip'] and vis[0]['inView'], '(e) the placeholder is shown: inside the article\'s clip and the viewport', [{k: v[k] for k in ('rect', 'clip', 'inClip', 'inView')} for v in vis])
    ov = ctx.js('window.__skep.overlapCheck()')
    r.check(not ov['blocks_cut'], '(e) containment at guest class: every row of the first edition — the placeholder and the text after it among them — lies inside its clip and its box',
            {'blocks_cut': ov['blocks_cut'][:6], 'worst_overflow_px': ov['worst_overflow_px']}, xfail=XFAIL_FACE)
    r.figures['shots'].append(ctx.shot('guest/window-run.png'))
    r.figures['run'] = {'placeholder': ph, 'stretches_tested': len(stretches), 'stretches_the_guest_holds': sum(1 for s in stretches if s in legit), 'mirror_item': item[:160], 'shown': vis,
                        'blocks_cut': ov['blocks_cut'][:8], 'worst_overflow_px': ov['worst_overflow_px']}

    # (c) the LEAP box at the first edition: no HOME level
    ctx.leap(DOC, WINDOW[0])
    ctx.js('window.__skep.leap.open()'); ctx.frames(2)
    levels = ctx.js('window.__skep.leap.rows()')
    ctx.js('window.__skep.leap.close()'); ctx.frames(1)
    r.check(bool(levels) and levels[0]['kind'] == 'board' and not [x for x in levels if x['kind'] == 'home'], '(c) the LEAP box lists the whole board first and no HOME level: a guest\'s HOME is the board', [x['kind'] for x in levels])

    # (f) the guest's own acts
    shown = ctx.js('window.__skep.links.shown(%s)' % json.dumps(DOC))
    r.check(bool(shown) and all(s['linker'] == 'owner' for s in shown), '(f) every link drawn at the first edition is its owner\'s, never the person\'s: a guest owns none', sorted({s['linker'] for s in shown}))
    # the act at the run, as the input reads a click: its press and its release at one point. The placeholder stands past the
    # article's clip, where the platform hands a person's pointer to nothing, so the events are dispatched at the element
    ctx.js('''(() => { const e = document.querySelector(%s); if (!e) return false; const q = e.getBoundingClientRect();
      const at = {bubbles: true, cancelable: true, composed: true, button: 0, clientX: q.left + q.width / 2, clientY: q.top + q.height / 2};
      e.dispatchEvent(new PointerEvent('pointerdown', at)); e.dispatchEvent(new PointerEvent('pointerup', at)); e.dispatchEvent(new MouseEvent('click', at)); return true; })()''' % json.dumps(PLACEHOLDER + ' .wh-head'))
    ctx.frames(2)
    face = ctx.js('''(() => { const o = document.getElementById('overlay'), a = o.querySelector('.arm'), w = o.querySelector('.face-text');
      return {id: window.__skep.overlay().id, text: w ? w.textContent : null, arm: a ? a.textContent : null, arm_id: a ? a.dataset.string : null}; })()''')
    r.check(face['id'] == 'face:C-39' and face['text'] == t(ctx, 'C-39', {'owner': OWNER}) and face['arm'] == arm and face['arm_id'] == 'R56.key-absent',
            '(f) the act at the run conjures C-39\'s face, the entitlement arm beneath it the placeholder\'s own: R56\'s key-absent default for a guest (B1-S5)', {'face': face, 'placeholder_arm': arm[:80]})
    r.figures['shots'].append(ctx.shot('guest/c39-face.png'))
    r.figures['c39'] = face
    ctx.esc()
    para = next((b for b in doc['blocks'] if b['kind'] == 'para'), None)
    if para:
        ctx.js('window.__skep.cards.wrote(%s, %d)' % (json.dumps(DOC), para['pos'])); ctx.settle(); ctx.frames(2)
    ov = ctx.js('window.__skep.overlay()')
    r.check(bool(para) and ov['id'] == 'provenance:wrote' and 'written by' in (ov['text'] or ''), '(f) "who wrote this?" over a block answers at guest class', ov)
    ctx.esc()

    # (c) Mod+Shift+H from the first edition: HOME, the board's extent
    ctx.drv.key('H', mods=('Meta', 'Shift'))
    ctx.settle(); ctx.frames(2)
    home = {'cam': ctx.camera(), 'focus': ctx.js('window.__skep.view.focus()')}
    same = all(abs(home['cam'][k] - launch['cam'][k]) <= 1e-6 * max(1.0, abs(launch['cam'][k])) for k in ('x', 'y', 'scale'))
    r.check(same and bool(home['focus']) and home['focus']['kind'] == 'board', '(c) Mod+Shift+H from the first edition goes HOME: the launch\'s view, the board\'s extent, the focus the board', {'home': home, 'launch': launch['cam']})

    # (d) a LEAP to a draft of the claimant's: on this board its box is the account's residue cell, the continuation's one mark's
    draft = drafts[1] if len(drafts) > 1 else drafts[0]
    ctx.js('window.__skep.go.leapTo(%s, null)' % json.dumps(draft))
    ctx.settle(); ctx.frames(2)
    d = ctx.js('window.__skep.model.doc(%s)' % json.dumps(draft))
    shown_at = ctx.js('({mounted: window.__skep.mountedAddrs(), chip: !!document.querySelector("[data-chip]"), corner: !!document.querySelector(%s), residue: !!window.__skep.boxOf(%s).residue})' % (json.dumps('[data-corner="%s"]' % draft), json.dumps(draft)))
    r.check(d['refused'] == 'withheld' and d['from'] == -1 and not d['blocks'] and draft not in shown_at['mounted'] and not shown_at['chip'] and not shown_at['corner'],
            '(d) a LEAP to a draft of the claimant\'s: its read refused `withheld`, no text delivered, nothing mounted, no corner and no chip', {'draft': draft, 'refused': d['refused'], 'from': d['from'], 'blocks': len(d['blocks']), **shown_at})
    labels = ctx.js('window.__skep.labels()')
    named = naming_a_draft(labels)
    r.check(not named, '(d) at that landing no label names a draft\'s first line or the draft mark', named[:4])
    r.figures['shots'].append(ctx.shot('guest/draft-landing.png'))
    r.figures['draft'] = {'addr': draft, 'residue_cell': shown_at['residue'], 'marks': [{k: m[k] for k in ('key', 'n', 'newest', 'lines')} for m in ctx.js('window.__skep.residues()')]}
    # a withheld document with a box of its own: its withheld box at the landing, existence and owner and never bytes
    ctx.js('window.__skep.go.leapTo(%s, null)' % json.dumps(WITHHELD))
    ctx.settle(); ctx.frames(2)
    w = ctx.js('window.__skep.model.doc(%s)' % json.dumps(WITHHELD))
    at_box = [[x['text'] for x in l['lines']] for l in ctx.js('window.__skep.labels()') if l['kind'] == 'doc' and l['place'] == WITHHELD]
    want = [WITHHELD[len(SECOND_ACCOUNT):], t(ctx, 'B1.withheld-box', {'owner': SECOND_ACCOUNT})]
    r.check(w['refused'] == 'withheld' and w['from'] == -1 and at_box == [want],
            '(d) a LEAP to a withheld document with a box of its own draws its withheld box, its label the address and "%s" alone: existence and owner, never bytes (B1-S2)' % want[1],
            {'refused': w['refused'], 'labels_at_the_box': at_box, 'want': want})
    named_at = ctx.js('window.__skep.line().address')
    r.check(named_at['text'].split(' › ')[1:3] == [SECOND_ACCOUNT, WITHHELD], '(d) the one line names the landing: board › its account › the withheld document', named_at, xfail=XFAIL_FOCUS)
    r.figures['shots'].append(ctx.shot('guest/withheld-box.png'))
    r.figures['withheld_box'] = {'addr': WITHHELD, 'labels': at_box}

    # (a) the whole guest run: the page's own log, and the provider's from the navigation on
    mine = calls(ctx)
    forms = [c['args'] for c in mine if c['name'] in ('op', 'places')]
    unguest = [f for f in forms if not f or f.get('guest') is not True or 'session' in f]
    r.check(not [c for c in mine if c['name'] == 'session'] and bool(forms) and not unguest, '(a) through the whole guest run the page asked no session, and sent every read — `op` and `places` — in the guest form',
            {'calls': dict(Counter(c['name'] for c in mine)), 'not_guest': unguest[:3]})
    asked = Counter(e.get('call') for e in ctx.provider_log() if e['seq'] > seq and e['kind'] == 'call')
    r.check(asked.get('session', 0) == 0 and asked.get('op', 0) > 0, '(a) the provider\'s own log from the navigation on: the guest\'s page asked no session', dict(asked))
    r.figures['guest_calls'] = {'page': dict(Counter(c['name'] for c in mine)), 'provider': dict(asked), 'cold_open': boot.get('coldOpenCalls')}
    r.figures['index'] = {'guest_places': len(places), 'owner_places': len(owner_places), 'claimant_drafts': len(drafts)}

    # the owner's page again, the first edition read, as the cases after this one expect
    ctx.open_page('all')
    r.check(ctx.js('window.__skep.model.session()') is not None, 'the owner\'s page opened again: a session stands')
    ctx.leap(DOC, WINDOW[0])
    return r.out()
