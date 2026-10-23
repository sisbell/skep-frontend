"""GUEST — the page at guest class (foundations §3.3's state 1; B1-S1's guest
line, B1-S2's withheld box and the face a read refused `withheld` shows,
B1-S7's placeholder, B1-S5's C-39 face; W-01,
the arrival from outside): the page opened afresh under `?gate=guest`, which
boots it as shipped but never asks `session(board)`, so every read takes the
guest form. What a guest must never meet is read first on the owner's signed
page and kept: the window run's 240 bytes, the claimant's drafts with their
first lines, the owner's places. The device's key store is read there too,
through the page's port, and decided here apart from the page's own reading:
whether a key is bound at the board's origin, which picks the entitlement arm
every withheld thing shows a guest (PUB-5.97's key-split defaults, in
PUB-5.121's order) — C-36's key-present arm where one is, R56's key-absent arm
where none is — "the guest's arm" below. Then, on the guest's page:
(a) the reads at guest class: the cold open's five calls, no session in the
    model, no `session` call in the page's own log or in the provider's from
    the navigation on, every `op` and `places` call in the guest form;
(b) the one line in state 1: the guest line, the board's origin and the
    venue, its one act sign in standing — never pressed: what it does for a
    guest who has not tried is the design's to rule — and no acting-as
    words, no key-present claim, no label of any key the device's store
    holds;
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
    document the index does not list; at both landings the mirror's current
    item naming the document in its withheld box's words, never published;
    "who wrote this?" asked of that withheld document faced as its box names
    it — B1-S2's words, the guest's arm beneath (A-170) — with no token
    unfilled and no act;
(e) the window run at 1467 withheld: the model's block — its width, its
    origin, no text — B1-S7's placeholder with its head, the guest's arm and
    no C-33 mark, none of the owner's bytes anywhere in the page; C-67's
    clause beneath the arm the one the origin's edition claims decide
    (PUB-5.124), decided here from the page's own recorded reads of them —
    the active view's lookup, its claims' links and their homes' metadata,
    never the audit view's `edition_claims` — the pointer carrying the claim
    PUB-3.107's order picks, and nothing in its place where they decide none;
    the mirror's item the run's placeholder — its owner,
    its origin, the arm, and the clause where the placeholder shows one
    (R94); the placeholder shown, and every row of
    the article inside its box, measured where the placeholder stands tallest,
    under R56's key-absent arm — where the page holds a key present it reads
    its store as holding none for the measure and as it held it after, page
    state alone — marked, waiting on the placeholder set in the
    article's flow taller than the run it occupies; the content after the run
    opening with a separator alone, a block that sets no line, the margins
    about it collapsing into one as P-LAY collapses an empty row's — the
    block after it as far below the placeholder as its bars stand below the
    run's, never the empty block's gap further;
(f) the guest's own acts: every link at the first edition drawn as its
    owner's, never "you"; C-39's face at the run with the placeholder's own
    arm beneath, standing beneath the placeholder, at the run's own positions
    once the text layer rebuilds the article and takes the placeholder away,
    and at the document's box once the layer takes the article down — never
    at the viewport's corner; Enter at the run, the walk's element, showing
    the run's face whole (D5 K-7) — the placeholder's head, the guest's arm
    and the clause, the pointer its one act — the focus staying on the item
    and nothing selected; "who wrote this?" answering over a block;
(g) the owner's page whose own session ends falls to guest class: opened
    again, it reads one of the claimant's drafts and the window run's bytes,
    then its session is closed by the page's own `close(session)` — the call
    it makes at every `pagehide`, which writes nothing to the board — and the
    fallen page, in the line's signed-out state, is held to the guest's (d)
    and (e): its index read again in the guest form, every read after the
    close a guest's or refused; no draft listed, none of the claimant's; each
    count the places listed; the draft it read holding no text, nothing
    mounted for it; no label or mark drawing a draft at HOME; the window run
    a withheld block with none of its text; none of the owner's bytes
    anywhere in the page;
(h) the owner's page opened once more stands a reading scene on the first
    edition and that draft, each pane showing the owner's bytes over the
    run, and its session is closed the same way with the scene standing over
    the end (issue #160): its panes read again at the guest's class — the
    draft's pane its head alone, the first edition's window run a withheld
    block — and none of the owner's bytes anywhere in the page, the panes
    and the mirror among it, the region holding any named. A step of its
    own, for the draft the pane reads again as a guest is a withheld record
    the page then holds, as a LEAP to it leaves one, and (g)'s fallen page
    reads none.
Shots into `shots/guest/`. The owner's page is opened again at the end and
the first edition read, as the cases after this one expect."""
import json
import re
import time
from collections import Counter

from . import DOC, SECOND_ACCOUNT, WINDOW, WITHHELD, Result
from .keys import placed_at, placed_at_box, placed_under, rebuilt_away, scene_set, stands_at

OWNER = '1.0.1'
# a stretch of the owner's bytes over the run, in characters with white space folded, that the guest's page must never hold
STRETCH = 24
# the shortest part of a label line that names a first line
NAMES = 12
GUEST_CALLS = ['boards', 'fingerprint', 'health', 'probe', 'places']
PLACEHOLDER = '#domlayer article[data-addr="%s"] .withheld[data-pos="%d"]' % (DOC, WINDOW[0])
# how far the space between two blocks may stand from the margin P-LAY lays there, in px at the layout size
GAP_TOL_PX = 0.5
# the first edition's mounted article after the run as the person meets it, beside the canvas's own bars for it
# (`barsOf`), in px at the layout size: the block after the placeholder — its position, its text, its height, the lines
# P-LAY sets it — the block after that, and the space between the placeholder's bottom and that block's top, in the
# article and between their bars
EMPTY_AFTER_RUN = '''(() => {
  const S = window.__skep, m = S.mounted(%s), h = S.barsOf(%s), face = document.querySelector(%s);
  const empty = face && face.nextElementSibling, next = empty && empty.nextElementSibling;
  if (!m || !h || !empty || !next) return null;
  const s = S.view.camera().scale / m.lay, q = (e) => e.getBoundingClientRect();
  const bar = (e) => h.bars.find((b) => b.pos === Number(e.dataset.pos)) || null, run = bar(face), after = bar(next), none = bar(empty);
  return {space: (q(next).top - q(face).bottom) / s, bars_space: run && after && after.top != null ? (after.top - (run.top + run.height)) / s : null,
          empty: {pos: Number(empty.dataset.pos), text: empty.textContent, height: q(empty).height / s, bar_lines: none ? none.lines : 0},
          next: {pos: Number(next.dataset.pos), tag: next.tagName.toLowerCase()}};
})()''' % (json.dumps(DOC), json.dumps(DOC), json.dumps(PLACEHOLDER))


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


def read_store_as(ctx, rows):
    """the page reads the device's key store as `rows` and sets every standing article again from it — the page's own
    state alone: nothing is written to the board or the store"""
    ctx.js('(async () => { const R = await import("./model/records.js"), L = await import("./text/layer.js"); R.takeKeyStore(%s, R.board().origin); L.bump(); })()' % json.dumps(rows))
    ctx.settle()
    ctx.frames(2)


def calls(ctx):
    """the page's own call log: each call's name, the argument object it posted and its outcome"""
    return [{'name': c['name'], 'args': json.loads(c['args']) if c.get('args') else None, 'outcome': c.get('outcome')} for c in ctx.js('window.__skep.bridge.calls()')]


def wait_for(ctx, expr, max_s=10):
    """poll the page until `expr` holds, at most `max_s` seconds; whether it held"""
    t0 = time.time()
    while time.time() - t0 < max_s:
        if ctx.js(expr):
            return True
        time.sleep(0.1)
    return False


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
    # the device's key store, which picks the guest's arm: read through the page's port, decided here
    store = ctx.key_store()
    arm_id = store['guest_arm']
    r.figures['key_store'] = {k: store[k] for k in ('origin', 'key_here', 'bound', 'guest_arm', 'refused')}
    owner_docs = {p['doc'] for p in owner_places}
    own = squash(secret)
    stretches = {own[i:i + STRETCH] for i in range(max(0, len(own) - STRETCH + 1))}

    def guest_index(whose, places):
        """(d)'s index at guest class: no draft listed, the claimant's none; every place one the owner's lists; each
        account's count the places listed"""
        docs = {p['doc'] for p in places}
        r.check(not [p['doc'] for p in places if p['kind'] == 'draft'] and not docs & set(drafts),
                f'(d) {whose} index lists no draft, the claimant\'s none of them', {'drafts_listed': [p['doc'] for p in places if p['kind'] == 'draft'][:6], 'claimant_drafts_listed': sorted(docs & set(drafts), key=num)[:6]})
        r.check(bool(docs) and docs <= owner_docs, f'(d) every place {whose} index lists, the owner\'s lists too', sorted(docs - owner_docs, key=num)[:10])
        listed = Counter(p['account'] for p in places)
        off = [{'account': c['account'], 'count': c['documents'], 'listed': listed.get(c['account'], 0)} for c in ctx.js('window.__skep.model.counts()') if not c['system'] and c['documents'] != listed.get(c['account'], 0)]
        r.check(not off, f'(d) each account\'s count is the places {whose} index lists for it', off)

    def run_withheld(what):
        """(e)'s model at the window run: one withheld block at 1467, 240 positions, its origin 1.0.1.0.1003, and none of
        its text; the first edition's record"""
        doc = ctx.js('window.__skep.model.doc(%s)' % json.dumps(DOC))
        run_blocks = [b for b in doc['blocks'] if b['kind'] == 'withheld' and b['pos'] <= WINDOW[0] < b['pos'] + b['width']]
        held_text = ctx.js('window.__skep.model.text(%s, %d, %d)' % (json.dumps(DOC), WINDOW[0], WINDOW[0] + WINDOW[1]))
        r.check(len(run_blocks) == 1 and run_blocks[0]['pos'] == WINDOW[0] and run_blocks[0]['width'] == WINDOW[1] and run_blocks[0]['origin'] == WINDOW[2] and held_text == '',
                what, {'blocks': run_blocks, 'held_text': held_text[:40]})
        return doc

    def leaks(places):
        """the stretches of the owner's bytes over the run the page holds anywhere that its own delivered text and labels
        do not, and how many stretches its own text and labels hold"""
        legit = squash(''.join(ctx.js('window.__skep.model.text(%s, 1, 1e9)' % json.dumps(a)) for a in sorted(set(ctx.js('window.__skep.mountedAddrs()')) | {DOC})) + ''.join(p['label'] or '' for p in places))
        body = squash(ctx.js('document.body.textContent'))
        return sorted(s for s in stretches if s in body and s not in legit), sum(1 for s in stretches if s in legit)

    def close_session():
        """the page's own `close(session)` — the call it makes at every `pagehide`, which writes nothing to the board —
        over the session it holds; whether the provider answered it"""
        return ctx.js('(async () => { const P = await import("./bridge/port.js"); return "result" in await P.close({session: window.__skep.model.session().session}); })()')

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
    labels = sorted({row['label'] for row in store['rows'] if row.get('label')})
    r.check(line['state'] == 1 and 'B1.guest-line' in ids and 'F.venue.notebook' in ids and 'F.acting-as' not in ids,
            '(b) the one line\'s acting-as segment is in state 1: the guest line and the venue', {'state': line['state'], 'strings': ids})
    r.check(t(ctx, 'B1.guest-line') in line['text'] and origin in line['text'] and t(ctx, 'F.venue.notebook') in line['text'],
            '(b) the line reads "reading as a guest", the board\'s origin and the venue', line['text'])
    claims = ['acting as', 'key present on this device'] + labels
    r.check(not [w for w in claims if w in line['text']], '(b) the line claims no acting account, no key on this device and no label of a key the device\'s store holds', {'found': [w for w in claims if w in line['text']], 'labels': labels, 'line': line['text']})
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
    guest_index('the guest\'s', places)

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
    doc = run_withheld('(e) the model holds the window run as a withheld block — at 1467, 240 positions, its origin 1.0.1.0.1003 — and none of its text')
    ph = ctx.js('''[...document.querySelectorAll(%s)].map((e) => ({pos: Number(e.dataset.pos), width: Number(e.dataset.width), origin: e.dataset.origin, owner: e.dataset.owner,
      head: (e.querySelector('.wh-head') || {}).textContent || null, arm: (e.querySelector('.arm') || {}).textContent || null,
      clause: (e.querySelector('.clause') || {}).textContent || null, claim: (e.querySelector('.clause') || {dataset: {}}).dataset.claim || null}))''' % json.dumps('#domlayer article[data-addr="%s"] .withheld' % DOC))
    head = t(ctx, 'B1.withheld-run', {'owner': OWNER, 'account': OWNER, 'width': WINDOW[1], 'origin': WINDOW[2]})
    arm = t(ctx, arm_id, {'owner': OWNER})
    c33 = ctx.js('document.querySelectorAll(%s).length' % json.dumps('#domlayer article[data-addr="%s"] .pubmark[data-mark="C-33"]' % DOC))
    r.check(len(ph) == 1 and ph[0]['pos'] == WINDOW[0] and ph[0]['width'] == WINDOW[1] and ph[0]['origin'] == WINDOW[2] and ph[0]['head'] == head and ph[0]['arm'] == arm and c33 == 0,
            '(e) the mounted article holds B1-S7\'s placeholder at the run — its position, width and origin, its head, the guest\'s arm for this device\'s key store (%s) — and no C-33 mark' % arm_id,
            {'placeholders': ph, 'c33_marks': c33, 'key_here': store['key_here']})
    leaked, legit_held = leaks(places)
    r.check(len(own) >= STRETCH and not leaked, f'(e) none of the owner\'s bytes over the run stands anywhere in the page: no stretch of {STRETCH} of its characters, white space folded, that the guest\'s own delivered text and labels do not hold', leaked[:4])
    # C-67's clause beneath the arm is the one the origin's edition claims decide, decided here from the page's own reads
    # of them — the active view's lookup, never the audit view's `edition_claims`, which refuses an origin the guest may
    # not read — and where they decide none, nothing stands in its place
    clause_id, decided = ctx.edition_clause(WINDOW[2], OWNER)
    clause = t(ctx, clause_id, {'claimant': decided.get('claimant', '')}) if clause_id else None
    r.check(decided['lookups'] >= 1 and not decided['audit'] and len(ph) == 1 and ph[0]['clause'] == clause and ph[0]['claim'] == decided.get('claim'),
            '(e) C-67\'s clause beneath the placeholder is the one the origin\'s edition claims decide — read with the active view\'s lookup, never the audit view\'s edition_claims — the pointer following the claim PUB-3.107\'s order picks, and nothing stands in its place where they decide none (PUB-5.124)',
            {'decided': clause_id, 'shown': ph[0]['clause'] if len(ph) == 1 else None, 'claim': ph[0]['claim'] if len(ph) == 1 else None, 'reads': decided})
    r.figures['edition_clause'] = {'origin': WINDOW[2], 'decided': clause_id, 'reads': decided}
    # the mirror's item at the run says what the placeholder shows: its words filled from the placeholder's own owner, arm
    # and clause, the clause a sentence after the arm where one shows and nothing where none does, and the arm and the
    # clause standing in it whole
    item = ctx.js('window.__skep.mirror.item(window.__skep.mirror.index())') or ''
    said = ph[0] if len(ph) == 1 else {}
    shown = bool(said.get('owner') and said.get('arm'))
    after = t(ctx, 'L.mirror.clause', {'clause': said['clause']}) if said.get('clause') else ''
    words = t(ctx, 'L.mirror.withheld', {'document': DOC, 'width': WINDOW[1], 'owner': said['owner'], 'origin': WINDOW[2], 'arm': said['arm'], 'clause': after}) if shown else None
    r.check(shown and item.startswith(words) and said['arm'] in item and (said.get('clause') or '') in item,
            '(e) the mirror\'s current item at the landing is the run\'s placeholder: the run, its width, its owner, its origin, the arm, and the clause where the placeholder shows one (R56; R94)',
            {'item': item, 'placeholder': {k: said.get(k) for k in ('owner', 'arm', 'clause')}})
    ctx.view_doc_em(DOC, 14)
    ctx.view_at(DOC, WINDOW[0])
    vis = ctx.js('window.__skep.visible(%s)' % json.dumps(PLACEHOLDER))
    r.check(len(vis) == 1 and vis[0]['inClip'] and vis[0]['inView'], '(e) the placeholder is shown: inside the article\'s clip and the viewport', [{k: v[k] for k in ('rect', 'clip', 'inClip', 'inView')} for v in vis])
    # containment is held where the placeholder stands tallest: under R56's key-absent arm, the longest arm a guest meets.
    # Where the page holds a key present, it reads its store as holding none for the measure, and as it held it after —
    # the page's own state put back, never the harness's reading, so every check after this one meets what the page made
    here = ctx.js('window.__skep.overlapCheck()')
    held = ctx.js('(async () => (await import("./model/records.js")).keyPresent())()')
    if held:
        read_store_as(ctx, [])
    keyless = ctx.js('(() => { const e = document.querySelector(%s); return e ? e.querySelector(".arm").textContent : null; })()' % json.dumps(PLACEHOLDER))
    ov = ctx.js('window.__skep.overlapCheck()')
    r.check(keyless == t(ctx, 'R56.key-absent', {'owner': OWNER}), '(e) for the measure the placeholder stands under R56\'s key-absent arm, the tallest a guest meets', keyless)
    r.check(not ov['blocks_cut'], '(e) containment at guest class, the placeholder under R56\'s key-absent arm: every row of the first edition — the placeholder and the text after it among them — lies inside its column, its clip and its box, the column breaking at the lines the face sets (issue #15)',
            {'blocks_cut': ov['blocks_cut'][:6], 'worst_overflow_px': ov['worst_overflow_px']})
    if held:
        read_store_as(ctx, store['rows'])
    back = ctx.js('(() => { const e = document.querySelector(%s); return e ? e.querySelector(".arm").textContent : null; })()' % json.dumps(PLACEHOLDER))
    r.check(back == arm, '(e) after the measure the placeholder stands under the guest\'s arm for this device\'s key store again (%s)' % arm_id, back)
    # the content after the run opens with a separator alone: the margins about that empty block collapse into one, as
    # P-LAY collapses an empty row's, so the block after it stands as far below the placeholder as its bars stand below
    # the run's — the larger of their margins apart, never the empty block's gap more
    gap = ctx.js(EMPTY_AFTER_RUN)
    empty = bool(gap) and gap['empty']['pos'] == WINDOW[0] + WINDOW[1] and gap['empty']['text'] == '' and gap['empty']['height'] <= GAP_TOL_PX and gap['empty']['bar_lines'] == 0
    r.check(empty, '(e) after the run the content opens with a separator alone: a block of no text that sets no line, in the article and in P-LAY\'s bars', gap)
    r.check(empty and gap['bars_space'] is not None and abs(gap['space'] - gap['bars_space']) <= GAP_TOL_PX,
            f'(e) the margins about that empty block collapse into one: the block after it stands below the placeholder as its bars stand below the run\'s, at the layout size, {GAP_TOL_PX} px either way', gap)
    r.figures['shots'].append(ctx.shot('guest/window-run.png'))
    r.figures['run'] = {'placeholder': ph, 'stretches_tested': len(stretches), 'stretches_the_guest_holds': legit_held, 'mirror_item': item, 'shown': vis,
                        'blocks_cut': ov['blocks_cut'][:8], 'worst_overflow_px': ov['worst_overflow_px'], 'after_run': gap,
                        'under_the_guests_arm': {'arm': arm_id, 'blocks_cut': here['blocks_cut'][:8], 'worst_overflow_px': here['worst_overflow_px']}}

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
    r.check(face['id'] == 'face:C-39' and face['text'] == t(ctx, 'C-39', {'owner': OWNER}) and face['arm'] == arm and face['arm_id'] == arm_id,
            '(f) the act at the run conjures C-39\'s face, the entitlement arm beneath it the placeholder\'s own: the guest\'s arm for this device\'s key store, %s (B1-S5; PUB-5.97)' % arm_id,
            {'face': face, 'placeholder_arm': arm[:80], 'key_here': store['key_here']})
    r.figures['shots'].append(ctx.shot('guest/c39-face.png'))
    r.figures['c39'] = face
    # the face stands beneath the placeholder it was conjured at; the text layer rebuilding the article takes the placeholder
    # away, and the face stands at the run's own positions, beneath their first line; the layer taking the article down — the
    # camera below the mount — leaves it at the document's box: never at the viewport's corner (foundations §3.1)
    rect = ctx.js('(() => { const q = document.querySelector(%s).getBoundingClientRect(); return {x: q.left, y: q.top, w: q.width, h: q.height}; })()' % json.dumps(PLACEHOLDER))
    under = placed_under(ctx, rect)
    r.check(face['id'] == 'face:C-39' and stands_at(under), '(f) C-39\'s face stands beneath the placeholder it was conjured at', under)
    gone = rebuilt_away(ctx, PLACEHOLDER, 'window.__skep.links.hide(%s)' % json.dumps(DOC))
    ctx.frames(2)
    rebuilt = placed_at(ctx, DOC, WINDOW[0], WINDOW[1])
    r.check(gone['found'] and not gone['connected'] and ctx.js('window.__skep.overlay().id') == 'face:C-39' and stands_at(rebuilt),
            '(f) the text layer rebuilding the article takes the placeholder away, and the face stands at the run\'s own positions, beneath their first line — never at the viewport\'s corner',
            {'placeholder': gone, 'placed': rebuilt})
    cam = ctx.camera()
    ctx.view_doc_em(DOC, 5)
    down = placed_at_box(ctx, DOC)
    r.check(DOC not in ctx.js('window.__skep.mountedAddrs()') and ctx.js('window.__skep.overlay().id') == 'face:C-39' and stands_at(down),
            '(f) the text layer taking the article down — the camera at em 5, below the mount — leaves the face at the document\'s box, its top-right — never at the viewport\'s corner', down)
    ctx.set_view(cam['x'], cam['y'], cam['scale'])
    r.figures['c39_placed'] = {'beneath_the_placeholder': under, 'rebuilt': rebuilt, 'taken_down': down}
    ctx.esc()
    # the act at the run by the keyboard: Enter at the walk's element, the run a LEAP landed on (D5 K-7) — the run's face
    # whole, made from the placeholder's record: its head, the guest's arm, and C-67's clause as the origin's edition claims
    # decide it, the pointer the face's one act; it takes no focus (K-58) and selects nothing
    ctx.leap(DOC, WINDOW[0])
    at_run = ctx.js('(() => { const f = window.__skep.view.focus(), e = document.activeElement; return {focus: f && [f.kind, f.addr, f.pos], on_item: !!e && e.id === "walk-" + window.__skep.mirror.index()}; })()')
    ctx.drv.key('Enter')
    ctx.frames(2)
    whole = ctx.js('''(() => { const o = document.getElementById('overlay'), q = (s) => o.querySelector(s), e = document.activeElement, w = q('.face-text'), a = q('.arm'), c = q('.clause'), b = q('.clause [data-run]');
      return {id: window.__skep.overlay().id, words_id: w ? w.dataset.string : null, words: w ? w.textContent : null, arm_id: a ? a.dataset.string : null, arm: a ? a.textContent : null,
              clause_id: c ? c.dataset.string : null, clause: c ? c.textContent : null, claim: b ? b.dataset.claim : null, acts: o.querySelectorAll('[data-run]').length,
              on_item: !!e && e.id === 'walk-' + window.__skep.mirror.index(), selection: window.__skep.selection()}; })()''')
    r.check(at_run['focus'] == ['block', DOC, WINDOW[0]] and at_run['on_item'] and whole['id'] == 'face:withheld-run' and whole['words_id'] == 'B1.withheld-run' and whole['words'] == head
            and whole['arm_id'] == arm_id and whole['arm'] == arm and whole['clause_id'] == clause_id and whole['clause'] == clause and whole['claim'] == decided.get('claim')
            and whole['acts'] == (1 if clause_id == 'C-67.pointer' else 0) and whole['on_item'] and whole['selection'] is None,
            '(f) Enter at the run — the walk\'s element, the platform\'s focus on its item — shows the run\'s face whole: B1-S7\'s head, the guest\'s arm (%s), and C-67\'s clause as the origin\'s edition claims decide it, the pointer its one act; the focus stays on the item and nothing is selected (D5 K-7, K-58)' % arm_id,
            {'at_run': at_run, 'face': whole, 'decided': clause_id})
    r.figures['run_face'] = whole
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
    published = t(ctx, 'F.published')
    named_withheld = t(ctx, 'B1.withheld-box', {'owner': OWNER})
    draft_item = ctx.js('window.__skep.mirror.item(window.__skep.mirror.index())') or ''
    r.check(draft_item.startswith('document %s,' % draft) and named_withheld in draft_item and published not in draft_item,
            '(d) at that landing the mirror\'s current item names the draft as its withheld box does — "%s" — and never published (B1-S2)' % named_withheld, draft_item)
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
    r.check(named_at['text'].split(' › ')[1:3] == [SECOND_ACCOUNT, WITHHELD], '(d) the one line names the landing: board › its account › the withheld document — a landing the index does not list stands on its own node (rule 12, #97)', named_at)
    withheld_item = ctx.js('window.__skep.mirror.item(window.__skep.mirror.index())') or ''
    r.check(withheld_item.startswith('document %s,' % WITHHELD) and want[1] in withheld_item and published not in withheld_item,
            '(d) the mirror\'s current item names the withheld document as its box does — "%s" — and never published (B1-S2)' % want[1], withheld_item)
    r.figures['shots'].append(ctx.shot('guest/withheld-box.png'))
    r.figures['withheld_box'] = {'addr': WITHHELD, 'labels': at_box, 'mirror_item': withheld_item, 'draft_mirror_item': draft_item}
    # "who wrote this?" asked of the withheld document: the board refuses the read's document consult `withheld`, and the
    # face names the document by existence and owner as its box does, the entitlement arm beneath (A-170; R56)
    ctx.js('window.__skep.cards.wrote(%s, 1)' % json.dumps(WITHHELD)); ctx.settle(); ctx.frames(2)
    face = ctx.js('''(() => { const o = document.getElementById('overlay'), w = o.querySelector('.face-text'), a = o.querySelector('.arm');
      return {id: window.__skep.overlay().id, words: w ? w.textContent : null, words_id: w ? w.dataset.string : null, arm: a ? a.textContent : null,
              arm_id: a ? a.dataset.string : null, text: o.textContent, acts: o.querySelectorAll('[data-run]').length}; })()''')
    guests_arm = t(ctx, arm_id, {'owner': SECOND_ACCOUNT})
    r.check(face['id'] == 'face:withheld' and face['words_id'] == 'B1.withheld-box' and face['words'] == want[1] and face['arm_id'] == arm_id and face['arm'] == guests_arm
            and '⟨' not in face['text'] and face['acts'] == 0,
            '(d) "who wrote this?" asked of the withheld document faces it as its box names it — "%s" — the guest\'s arm for this device\'s key store beneath, %s for %s, no token unfilled and no act (A-170)' % (want[1], arm_id, SECOND_ACCOUNT),
            {'face': face, 'guests_arm': guests_arm[:80], 'key_here': store['key_here']})
    r.figures['shots'].append(ctx.shot('guest/withheld-face.png'))
    r.figures['withheld_face'] = face
    ctx.esc()

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

    # (g) the owner's page again, whose own session ends: it falls to guest class
    ctx.open_page('all')
    r.check(ctx.js('window.__skep.model.session()') is not None, 'the owner\'s page opened again: a session stands')
    ctx.leap(WINDOW[2])
    draft_read = ctx.js('window.__skep.model.doc(%s)' % json.dumps(WINDOW[2]))
    ctx.leap(DOC, WINDOW[0])
    again = ctx.js('window.__skep.model.text(%s, %d, %d)' % (json.dumps(DOC), WINDOW[0], WINDOW[0] + WINDOW[1]))
    r.check(WINDOW[2] in drafts and draft_read['from'] >= 0 and bool(draft_read['blocks']) and again == secret,
            '(g) before its end the owner\'s page reads the claimant\'s draft %s and the window run\'s bytes' % WINDOW[2],
            {'draft_listed': WINDOW[2] in drafts, 'draft_from': draft_read['from'], 'draft_blocks': len(draft_read['blocks']), 'run_bytes': len(again.encode('utf8'))})
    n0 = len(calls(ctx))
    closed = close_session()
    fell = wait_for(ctx, 'window.__skep.model.session() === null && window.__skep.line().state === 5')
    ctx.settle(); ctx.frames(2)
    ids = ctx.js('[...document.querySelectorAll("#line [data-string]")].map((e) => e.dataset.string)')
    r.check(closed and fell and 'C-137.signed-out' in ids, '(g) the page\'s own `close(session)` ends its session: the page takes the end, the line in its signed-out state',
            {'closed': closed, 'fell': fell, 'strings': ids})
    after = calls(ctx)[n0:]
    at = next((i for i, c in enumerate(after) if c['name'] == 'close'), len(after))
    reads = [c for c in after[at + 1:] if c['name'] in ('op', 'places')]
    unguest = [c['args'] for c in reads if c['outcome'] != 'refused' and (not c['args'] or c['args'].get('guest') is not True or 'session' in c['args'])]
    r.check(any(c['name'] == 'places' and c['args'] and c['args'].get('guest') is True for c in reads) and not unguest,
            '(g) after the close the page reads its index again in the guest form, and every read it sent after the close that was answered is a guest\'s',
            {'calls': dict(Counter(c['name'] for c in after[at + 1:])), 'not_guest': unguest[:3]})
    fallen = ctx.js('window.__skep.model.places()')
    guest_index('the fallen page\'s', fallen)
    gone = ctx.js('window.__skep.model.doc(%s)' % json.dumps(WINDOW[2]))
    r.check(gone['from'] == -1 and not gone['blocks'] and WINDOW[2] not in ctx.js('window.__skep.mountedAddrs()'),
            '(g) the draft the page read under its session holds no text, and nothing is mounted for it', {'from': gone['from'], 'blocks': len(gone['blocks'])})
    ctx.js('window.__skep.go.home()'); ctx.settle(); ctx.frames(2)
    fallen_home = draws_no_draft('the fallen page\'s HOME')
    ctx.leap(DOC, WINDOW[0])
    run_withheld('(g) the fallen page holds the window run as the guest\'s does: a withheld block at 1467, 240 positions, its origin 1.0.1.0.1003, and none of its text')
    fallen_leaks, _ = leaks(fallen)
    r.check(not fallen_leaks, '(g) none of the owner\'s bytes over the run stands anywhere in the fallen page', fallen_leaks[:4])
    r.figures['shots'].append(ctx.shot('guest/fallen.png'))
    r.figures['fallen'] = {'places': len(fallen), 'home': fallen_home, 'reads_after_close': dict(Counter(c['name'] for c in reads))}

    # (h) the owner's page again, a reading scene standing over its own end (issue #160)
    ctx.open_page('all')
    r.check(ctx.js('window.__skep.model.session()') is not None, '(h) the owner\'s page opened again: a session stands')
    ctx.leap(DOC, WINDOW[0])
    ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(DOC), json.dumps(WINDOW[2])))
    ctx.settle(); ctx.frames(2)
    shown = ctx.js('window.__skep.scene.panes()') or {}
    pane_text = lambda side: squash(ctx.js('(() => { const a = document.querySelector(%s); return a ? a.textContent : ""; })()' % json.dumps('#scene%s article.dtext' % side)))
    held = {side: sum(1 for s in stretches if s in pane_text(side)) for side in ('A', 'B')}
    r.check(ctx.js('window.__skep.scene.isOpen()') and bool((shown.get('b') or {}).get('blocks')) and held['A'] > 0 and held['B'] > 0,
            '(h) before its end the owner\'s page stands a reading scene on the first edition and the draft it windows, each pane showing the owner\'s bytes over the run', {'stretches_held': held})
    closed = close_session()
    fell = wait_for(ctx, 'window.__skep.model.session() === null && window.__skep.line().state === 5')
    landed = scene_set(ctx)
    panes = ctx.js('window.__skep.scene.panes()') or {}
    pa, pb = panes.get('a') or {}, panes.get('b') or {}
    run_face = [b for b in pa.get('blocks') or [] if b['kind'] == 'withheld' and b['pos'] == WINDOW[0]]
    scene_leaks, _ = leaks(ctx.js('window.__skep.model.places()'))
    # where each stretch stands, by the page's regions: what a red check names
    regions = ctx.js('Object.fromEntries([...document.body.children, ...document.querySelectorAll("#scene > .pane")].filter((e) => e.id).map((e) => [e.id, e.textContent]))') or {}
    where = {s: [k for k, v in regions.items() if v and s in squash(v)] for s in scene_leaks[:4]}
    r.check(closed and fell and landed and ctx.js('window.__skep.scene.isOpen()') and pb.get('blocks') == [] and len(run_face) == 1 and not scene_leaks,
            '(h) the page\'s own `close(session)` with the scene standing over it: the panes read again at the guest\'s class — the draft withheld, its pane its head alone, the first edition\'s window run a withheld block — and none of the owner\'s bytes over the run stands anywhere in the page, the panes and the mirror among it (issue #160)',
            {'closed': closed, 'fell': fell, 'landed': landed, 'pane_b_blocks': len(pb.get('blocks') or []), 'run_face': run_face, 'leaks': scene_leaks[:4], 'where': where})
    r.figures['shots'].append(ctx.shot('guest/fallen-scene.png'))
    r.figures['fallen_scene'] = {'stretches_held_before': held, 'pane_b_blocks_after': len(pb.get('blocks') or []), 'leaks': len(scene_leaks)}
    ctx.js('window.__skep.scene.close()'); ctx.frames(2)

    # the owner's page once more, the first edition read, as the cases after this one expect
    ctx.open_page('all')
    r.check(ctx.js('window.__skep.model.session()') is not None, 'the owner\'s page opened again: a session stands')
    ctx.leap(DOC, WINDOW[0])
    return r.out()
