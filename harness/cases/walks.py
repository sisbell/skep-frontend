"""WALKS — S-23 (b): W-01 (arrive from outside) and W-05 (read and navigate)
as camera scripts, one PNG per step into `shots/W-01/` and `shots/W-05/`,
the design's note beside each in `report.md` (`ux/walks.md` at the design
repo's HEAD). W-01 is the guest's walk and runs on the page opened as a
guest (`?gate=guest`, no session asked); W-05 on the owner's page, opened
again after it. W-02, W-03 and W-04 are OUT (their screens are later lanes').
Produced for the seats, asserted as "the step ran and the shot exists" — and
where a step's note claims an element, that the element is in view (inside
its clip and the viewport, by the page's `visible` oracle), where it claims
the canvas's labels, that the canvas set them (the page's `labels`), and
where it claims a face says something and nothing more, that the face holds
those words with no wire token and no act (W-01 step 7, the follow to the
ghost — run here, after `keys` has read LK's visited set), so the seats are
never shown a note the shot contradicts. The card's controls are pressed as
a person presses them (the switch's rect read, the click dispatched at
engine level), and the card's state is read back before the shot — the
switch's own words among it, the toggle's B1-S4 words in the state LK
holds. What each step could not have on this lane is said in its note.
After W-05, on the owner's page, a line typed in the own draft — text the
board does not hold, the page's own and never sent — is walked to, found and
returned to by Back at the desktop width and at the narrow one, each landing
on the typed words (EDITOR's `typed_lands`), shot into `shots/W-05/`."""
import json

from . import AGENT_SPACE, CLAUSE_READING, DOC, FAR_LEAP, GHOST, WINDOW, Result
from .editor import NARROW, WIDE, typed_lands

# the window run's opening hairline — the stretch that opens the run, one run across the paragraph break its own bytes
# make — and its origin's statement in its column's edge, its key heading C-33's words (issue #304)
RUN_OPENS = '#domlayer .sp[data-addr="%s"] .same.opens[data-origin="%s"]' % (DOC, WINDOW[2])
ORIGIN_STATEMENT = '#corners .edge-sign[data-sign="statement"][data-addr="%s"][data-origin="%s"]' % (DOC, WINDOW[2])
SCENE_OFFER = '#domlayer .offer[data-scene="%s|%s"]' % (DOC, WINDOW[2])
PLACEHOLDER = '#domlayer article[data-addr="%s"] .withheld[data-pos="%d"]' % (DOC, WINDOW[0])


def step(ctx, r, walk, n, name, note, shot_name, claims=()):
    """shoot a step; each claim (selector, what, xfail) the note makes is asserted in view — inside its clip and the viewport"""
    rel = ctx.shot(f'{walk}/{n:02d}-{shot_name}.png')
    r.figures.setdefault('steps', []).append({'walk': walk, 'step': n, 'name': name, 'note': note, 'shot': rel})
    r.check(True, f'{walk} step {n} shot')
    for selector, what, xfail in claims:
        vis = ctx.js('window.__skep.visible(%s)' % json.dumps(selector))
        r.check(bool(vis) and all(v['inClip'] and v['inView'] for v in vis), f'{walk} step {n}: {what} is in view, as the note claims (inside its clip and the viewport)', [{'rect': v['rect'], 'clip': v['clip'], 'inClip': v['inClip'], 'inView': v['inView']} for v in vis][:3], xfail=xfail)


def press(ctx, r, run, what):
    """a person's press on the links card's control named by its `data-run`: the control's rect read, the click dispatched at engine level, two frames"""
    centre = ctx.js('(() => { const b = document.querySelector(%s); if (!b) return null; const q = b.getBoundingClientRect(); return {x: q.left + q.width / 2, y: q.top + q.height / 2}; })()' % json.dumps('#overlay [data-run="%s"]' % run))
    r.check(centre is not None, f'the links card offers `{run}` ({what})', run)
    if centre is not None:
        ctx.drv.mouse(centre['x'], centre['y'])
        ctx.frames(2)
    return centre is not None


def card_state(ctx):
    """the links card's controls as rendered, beside LK's state at the first edition"""
    return ctx.js('''(() => { const o = document.getElementById('overlay'); const sw = o.querySelector('[data-run="others"]');
      return {offers_symbols: !!o.querySelector('[data-run="stage2"]'), offers_content: !!o.querySelector('[data-run="stage3"]'),
              switch_checked: sw ? sw.getAttribute('aria-checked') : null, switch_text: sw ? sw.textContent : null,
              stage: window.__skep.reveal(%s).stage, others: window.__skep.reveal(%s).others, beams: window.__skep.beams(), tails: window.__skep.tails().filter((t) => t.at === %s).length}; })()''' % (json.dumps(DOC), json.dumps(DOC), json.dumps(DOC)))


def toggle_words(ctx, shown):
    """the words B1-S4 has the card's toggle read in a state — "Others’ links: ⟨state⟩ · ⟨n⟩ touch this document", its
    state "shown" or "hidden", its count's zero form where none touch the document — from the page's own strings"""
    return ctx.js('''(async (shown) => { const n = window.__skep.links.othersTouching(%s).length; const {t} = await import("./strings.js");
      return t(n === 0 ? "B1.others-toggle.0" : n === 1 ? "B1.others-toggle.1" : "B1.others-toggle", {state: t(shown ? "B1.others-toggle.shown" : "B1.others-toggle.hidden"), n}); })(%s)''' % (json.dumps(DOC), json.dumps(shown)))


def caption(ctx):
    """the standing overlay's caption as a person sees it: its words and the case the stylesheet sets them in"""
    return ctx.js('''(() => { const l = document.querySelector('#overlay .label'); return l ? {text: l.textContent, transform: getComputedStyle(l).textTransform, cls: l.className} : null; })()''')


def run(ctx):
    r = Result()
    # ---- W-01 — Arrive from outside, as a guest ----------------------------------------
    ctx.open_page('guest')
    r.check(ctx.js('window.__skep.model.session()') is None and ctx.js('window.__skep.line().state') == 1, 'W-01 runs on the guest\'s page: no session, the one line in state 1')
    ctx.js('window.__skep.go.home()')
    ctx.settle()
    step(ctx, r, 'W-01', 1, 'the share link', 'W-01 step 1: "The person opens https://skep.network/l/⟨token⟩ … the resolver … 302s to the serving node." NOT this lane\'s: no resolver and no share form (the intake is X-5\'s); the page opens on its board as a GUEST, asking no session, at HOME — a guest\'s HOME is the board\'s extent at the clamp (R92 rider (c)). The landing before arrival.', 'before-arrival')
    ctx.js('window.__skep.leap.open()')
    ctx.js('(() => { const i = document.getElementById("leapq"); i.value = ""; })()')
    ctx.drv.ime(DOC)
    ctx.frames(2)
    step(ctx, r, 'W-01', 2, 'the guest reader is the landing', 'W-01 step 2: "The serving board answers with its GUEST READER … The web viewer IS the landing." The page reads at guest class — every read in the guest form, the one line "reading as a guest" with its one act, sign in. Here the address is handed in by LEAP (the box holds the typed address; Enter goes).', 'leap-address')
    ctx.drv.key('Enter')
    ctx.settle()
    ctx.leap(DOC, WINDOW[0])
    step(ctx, r, 'W-01', 3, 'the document renders at the position', 'W-01 step 3: "The document renders as formatted text, links-in-place, atoms legible (R1) … Where the token carried a span or at, the viewer lands there (position honored)." The first edition at position 1467, its owner\'s citations in place in the owner\'s hue — none is the guest\'s.', 'landing-at-position')
    ctx.js('window.__skep.go.wholeBoard()')
    ctx.settle()
    step(ctx, r, 'W-01', 4, 'orientation: the landing is a place', 'W-01 step 4: "the landing is a PLACE on the plane (R92); the hierarchy reads account › document › position (R6); zooming out converges to the board extent (law 13\'s clamp)." Mod+0: the whole board at the clamp, the one line reading the board.', 'whole-board-clamp')
    ctx.js('window.__skep.go.back()')
    ctx.settle()
    step(ctx, r, 'W-01', 5, 'the native client', 'W-01 step 5: "Where a native client is installed, the landing page tries skep:// and falls through" — NOT this lane\'s (the shell\'s lane). Back on the trail: the landing again, the where-am-I line reading board › account › document › position.', 'back-to-landing')
    ctx.view_doc_em(DOC, 14)
    ctx.view_at(DOC, WINDOW[0])
    # the guest's entitlement arm is picked by the device's key store (PUB-5.97), so the note names the one the shot shows
    store = ctx.key_store()
    arm = ('C-36\'s key-present arm, "sign in, then ask" — this device holds a key for the board' if store['key_here']
           else 'R56\'s key-absent arm — this device holds no key for the board')
    # and C-67's clause by the origin's edition claims (PUB-5.124), as the page's own reads of them decide it
    clause_id, decided = ctx.edition_clause(WINDOW[2])
    clause = {'C-67.pointer': 'then C-67\'s pointer, "a published edition may exist — follow the edition claim"',
              'C-67.quoting': 'then C-67\'s QUOTING sibling, naming %s' % decided.get('claimant'),
              'L.clause.unread': 'then "edition claims not read" in the place of C-67\'s clause — a read of the claims on %s failed' % WINDOW[2],
              CLAUSE_READING: 'and its words not yet shown — a read C-67\'s clause on %s waits on is still out' % WINDOW[2]}.get(
        clause_id, 'and nothing in the place of C-67\'s clause — the board admits no edition claim on %s' % WINDOW[2])
    step(ctx, r, 'W-01', 6, 'the withheld item at the window run', 'W-01 step 6: "Where the published page WINDOWS a draft origin the guest meets a WITHHELD ITEM at that run, carrying the origin and the width." B1-S7\'s gap occupies the run, as tall as its bars, never its bytes — its origin\'s key, "1.0.1.0.1003", in it — and the origin states itself once in its column\'s edge beside the run, compact and headed by its key, its mark opening the run\'s whole wording as a card: B1-S7\'s head, "withheld · 1.0.1 (1.0.1) · 240 positions · origin 1.0.1.0.1003", and the guest\'s entitlement arm, %s, %s (issue #288); the act at the rest of the gap, C-39\'s face, is the guest case\'s.' % (arm, clause), 'window-run-withheld',
         claims=[(PLACEHOLDER, 'the withheld run\'s gap', None)])
    shown = ctx.js('window.__skep.links.shown(%s)' % json.dumps(DOC))
    ghost = next((s for s in shown if s['far'] == GHOST), None)
    r.check(ghost is not None, 'W-01 step 7: the first edition draws its citation of the ghost', [s['far'] for s in shown][:8])
    if ghost:
        ctx.js('window.__skep.go.follow(%s, %s)' % (json.dumps(DOC), json.dumps(ghost['link'])))
        ctx.settle()
        ctx.frames(2)
    step(ctx, r, 'W-01', 7, 'a reference into nothing', 'W-01 step 7 and the failure arms: "a reference from a public document into a draft is public and renders the placeholder"; R59\'s classes never conflated. Following the citation of a GHOST (cited, never minted): the dead-reference face says what the board will not say about that address, and nothing more.', 'ghost-face')
    face = ctx.overlay_shown()
    fifth = ctx.js('import("./strings.js").then(({t}) => t("B1.doc_not_registered", {address: %s}))' % json.dumps(GHOST))
    r.check(face['kind'] == 'face' and fifth in face['text'] and 'doc_not_registered' not in face['text'].lower() and face['acts'] == 0,
            'W-01 step 7: the followed ghost is faced as the note says — B1-S8\'s words with the address and nothing more: no wire token, no act', dict(face, want=fifth))
    unknown = ctx.js('import("./strings.js").then(({opening}) => opening("L.far.unknown"))')
    r.check(face['text'].startswith(unknown),
            'W-01 step 7: the guest\'s face opens with the far end\'s short form, "%s", the words its label names it by, a sentence\'s capital first, before B1-S8\'s (issue #224\'s design decision: a guest acts as no account, so the weaker state)' % unknown, face['text'][:240])
    ctx.esc()
    # ---- W-05 — Read & navigate the board, on the owner's page opened again --------------
    ctx.open_page('all')
    r.check(ctx.js('window.__skep.model.session()') is not None, 'W-05 runs on the owner\'s page, opened again: a session stands')
    ctx.leap(DOC, WINDOW[0])
    shown = ctx.js('window.__skep.links.shown(%s)' % json.dumps(DOC))
    ctx.view_doc_px(DOC, 5)
    step(ctx, r, 'W-05', 1, 'zoom for structure: far', 'W-05 step 1: "far = counts and density" (law 5\'s LOD tiers). The accounts\' clusters, each with its density mark and its address; at this scale a cluster\'s mark has no room for its counts at the label floor, so they are left out — the counts a larger mark holds stand at WHOLE BOARD (B1-S3), and the far counts\' room is the design\'s open question; the system account held and not drawn.', 'far')
    far = [l for l in ctx.js('window.__skep.labels()') if l['kind'] == 'cluster']
    r.check(bool(far) and all(len(l['lines']) == 1 and l['lines'][0]['text'] == l['place'] for l in far), 'W-05 step 1: each cluster carries its address and no count, as the note says', [[l['place'], [x['text'] for x in l['lines']]] for l in far])
    ctx.view_doc_px(DOC, 120)
    step(ctx, r, 'W-05', 1, 'zoom for structure: mid', 'W-05 step 1: "mid = extents" — the documents as boxes with their greeked extents, each edged as a draft or an edition, the badges counting the links each holds.', 'mid')
    ctx.leap(DOC, 541)
    step(ctx, r, 'W-05', 1, 'zoom for structure: reading', 'W-05 step 1: "reading = full text with span-anchored beams" — the LEAP to a named document lands at reading scale (law 6; R92 rider (a)).', 'reading')
    ctx.view_at(DOC, WINDOW[0])
    step(ctx, r, 'W-05', 2, 'read: the same material', 'W-05 step 2: "transcluded content visibly THE SAME material, one gesture to the source (R2) — delivered per ORIGIN, position by position." The window run opens on its hairline, its ground on each of its lines; its origin, 1.0.1.0.1003, stated once in its column\'s edge — its key, the gesture to the source, then C-33\'s words.', 'same-material',
         claims=[(RUN_OPENS, 'the run\'s opening hairline', None), (ORIGIN_STATEMENT, 'the origin\'s statement in the edge', None)])
    c33 = ctx.js('window.__skep.strings.pinned().find((s) => s.id === "C-33").text')
    said = ctx.js('(() => { const e = document.querySelector(%s); return e ? e.textContent : null; })()' % json.dumps(ORIGIN_STATEMENT))
    r.check(bool(said) and WINDOW[2] in said and c33 in said, 'W-05 step 2: the statement holds the origin\'s key and C-33\'s words, as the note says', {'statement': said, 'c33': c33})
    last = ctx.js('window.__skep.model.doc(%s).blocks' % json.dumps(DOC))[-1]
    ctx.view_at(DOC, last['pos'])
    step(ctx, r, 'W-05', 2, 'read: the scene offer', 'W-05 step 2: the scene offer stands at the article\'s end, below its last block in its last column: "this document windows 1.0.1.0.1003".', 'scene-offer',
         claims=[(SCENE_OFFER, 'the scene offer', None)])
    # the links card asked at a cited passage, its citations' line in the visible view at the reading size, where the content
    # stage draws their tails
    if shown:
        ctx.view_at(DOC, shown[0]['pos'])
    ctx.js('window.__skep.cards.links(%s)' % json.dumps(DOC))
    ctx.frames(2)
    s = card_state(ctx)
    r.check(s['stage'] == 2 and s['offers_content'] and s['switch_checked'] == 'false', 'the card opened at stage 2: it offers where the links lead and its switch reads hidden', s)
    r.check(s['switch_text'] == toggle_words(ctx, False), 'the switch\'s own words are the toggle\'s in its state, hidden (B1-S4)', {'switch': s['switch_text'], 'want': toggle_words(ctx, False)})
    cap = caption(ctx)
    want = ctx.js('import("./strings.js").then(({t}) => t("B1.links-on").split("⟨label⟩")[0])')
    r.check(bool(cap) and cap['transform'] == 'none' and cap['text'].startswith(want) and DOC in cap['text'],
            'the links card\'s caption names its document, "%s…" with its address, set as written — never in the overlays\' capitals (style S10)' % want, {'caption': cap, 'want': want})
    step(ctx, r, 'W-05', 3, 'ask to see the links: symbols', 'W-05 step 3: "the reveal chain hidden → symbol → content"; the card lists the owner\'s links, the lenses by owner, type and endorsement (R9), the others\' toggle OFF by default (R60). Stage 2: the symbols at their spans.', 'links-card-symbols')
    # the person presses "Show where the links lead": the chain moves to stage 3 and the card redraws itself from LK's state before the shot
    press(ctx, r, 'stage3', 'the chain\'s next stage, where the links lead')
    ctx.frames(2)
    s = card_state(ctx)
    r.check(s['stage'] == 3 and s['offers_symbols'] and not s['offers_content'] and s['beams'] + s['tails'] >= 1, 'the press moved the chain to stage 3 and the card redrew: it now offers the symbols; each citation in view leaves the text by a beam, or by a tail where its far document is drawn nowhere', s)
    step(ctx, r, 'W-05', 3, 'ask to see the links: content', 'W-05 step 3, stage 3: the beams from each citation\'s span toward its far document — here TAILS, not stubs: every document the first edition cites is a ghost the plane draws nowhere, so each citation leaves its line by a short tail naming its far address, two from one line merged into their count (issue #132).', 'links-beams')
    # the person presses the others' switch: LK's toggle and the switch's own state agree before the shot
    press(ctx, r, 'others', 'the others\' overlay toggle')
    s = card_state(ctx)
    r.check(s['others'] is True and s['switch_checked'] == 'true' and s['offers_symbols'], 'the press turned others\' links on and the card redrew: the switch reads aria-checked="true", LK agrees, the stage button still offers the symbols', s)
    r.check(s['switch_text'] == toggle_words(ctx, True), 'the switch\'s own words follow its state: shown (B1-S4)', {'switch': s['switch_text'], 'want': toggle_words(ctx, True)})
    others = ctx.js('window.__skep.links.othersTouching(%s)' % json.dumps(DOC))
    step(ctx, r, 'W-05', 3, 'others\' links on', 'W-05 step 3: "Others\' links are overlays, OFF by default, attributed in the linker\'s color when shown (R60)." The toggle on: on this board no other party\'s link touches the first edition (%d), so the article does not change — the second account\'s draft and its links are hidden with it (PUB-1.13).' % len(others), 'others-on')
    press(ctx, r, 'others', 'the others\' overlay toggle, off again')
    s = card_state(ctx)
    r.check(s['others'] is False and s['switch_checked'] == 'false' and s['switch_text'] == toggle_words(ctx, False), 'the second press hid others\' links again; the switch agrees, in its state and in its words', s)
    ctx.esc()
    if shown:
        ctx.js('window.__skep.cards.anatomy(%s, %s)' % (json.dumps(DOC), json.dumps(shown[0]['link'])))
        ctx.settle()
        ctx.frames(2)
    step(ctx, r, 'W-05', 4, 'the anatomy card', 'W-05 step 4: "Inspect a link\'s full anatomy: type (registry documentation one gesture away), all endsets, owner, age (R5)." The type reads R5\'s form — "undocumented here": no commons registry document is seeded; the far end\'s words first; "Replaced by" and "Replaces" read the link\'s lineage under the audit view — the claims made by the owner of the link each declares superseded, any other behind one line after the rows (issue #143) — B1-S5\'s "none" where no claim names it; no age row: the page holds no age for a link older than its feed, and an empty row would read as B1-S5\'s "none".', 'anatomy-card',
         claims=[('#overlay .kv.lineage', 'the supersession rows', None)])
    if shown:
        cap = caption(ctx)
        want = ctx.js('import("./strings.js").then(({t}) => t("B1.card.link", {address: %s}))' % json.dumps(shown[0]['link']))
        r.check(bool(cap) and cap['transform'] == 'none' and cap['text'].endswith(want),
                'the anatomy card\'s caption is the link\'s symbol and "%s", set as written — never in the overlays\' capitals (style S10)' % want, {'caption': cap, 'want': want})
    ctx.esc()
    ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(DOC), json.dumps(WINDOW[2])))
    ctx.settle()
    ctx.frames(3)
    step(ctx, r, 'W-05', 5, 'the scene', 'W-05 step 5: "two documents side by side, beams connecting corresponding material, each pane independently scrollable (R3) — a transient scene the camera conjures; places unmoved, nothing written (law 12)." The window and its origin, `compare`\'s pairs drawn pane to pane.', 'scene')
    ctx.js('window.__skep.scene.close()')
    ctx.frames(2)
    blocks = ctx.js('window.__skep.model.doc(%s).blocks' % json.dumps(DOC))
    wb = next((b for b in blocks if b['pos'] <= WINDOW[0] < b['pos'] + b['width']), blocks[0])
    ctx.js('window.__skep.cards.wrote(%s, %d)' % (json.dumps(DOC), wb['pos']))
    ctx.settle()
    ctx.frames(2)
    step(ctx, r, 'W-05', 6, 'who wrote this?', 'W-05 step 6: "Provenance: who wrote this? one gesture, byte-granular, through transclusion chains (R29, show_origin)" — the block holding the window: written at its origin in the draft 1.0.1.0.1003 and at this document.', 'who-wrote')
    ctx.esc()
    ctx.js('window.__skep.cards.uses(%s, %d)' % (json.dumps(DOC), wb['pos']))
    ctx.settle()
    ctx.frames(2)
    step(ctx, r, 'W-05', 6, 'who uses this?', 'W-05 step 6: "who uses this? for own spans (R30, find_docs_containing) … short by any container the caller cannot read and by any stated copy" — C-72\'s clause beneath the list.', 'who-uses')
    ctx.esc()
    ctx.js('window.__skep.cards.trailList()')
    ctx.frames(2)
    step(ctx, r, 'W-05', 7, 'the trail', 'W-05 step 7: "The trail: back = pop the address stack (LM 2/27, law 1 — client-side)" — the entries of this walk, newest first, each a Mod+⟨n⟩; keeping a trail as a document (R7) is a write and not this lane\'s.', 'trail-list')
    ctx.esc()
    # the page's own find (B2-S5; issue #222's design decision): Mod+F at the first edition, a word of its first lines typed
    ctx.leap(DOC, None)
    ctx.drv.key('f', mods=('Meta',))
    ctx.settle()
    ctx.frames(2)
    word = ctx.js('(() => { const b = window.__skep.model.doc(%s).blocks.find((x) => x.kind === "para" && /[A-Za-z]{5,}/.test(x.text)); return b ? b.text.match(/[A-Za-z]{5,}/)[0] : null; })()' % json.dumps(DOC))
    if word:
        ctx.drv.ime(word)
        ctx.settle()
        ctx.frames(3)
    found = ctx.js('window.__skep.find.stands()') or {}
    step(ctx, r, 'W-05', 8, 'find', 'W-05 step 8: "Find: in-document find (R9a); board-wide lexical search over the /changes-fed client index" — the page\'s own find (B2-S5): Mod+F at the first edition, "%s" typed, counted over its whole text — %s — the camera at its first match, outlined alone. Board-wide search is the LEAP box\'s word arm, not in this lane\'s cut: the box matches addresses and first lines over the index `places` built (R8\'s own documents by label).' % (word, found.get('count')), 'find',
         claims=[('#find', 'the find\'s box', None)])
    ctx.esc(); ctx.esc(); ctx.esc()
    ctx.leap(DOC, WINDOW[0])
    step(ctx, r, 'W-05', 9, 'where am I', 'W-05 step 9: "Where-am-I: account › document › position always visible (R6); home, landmarks, and the trail anchor against disorientation (R92 rider (c))." The one line: ‹ back · forward › · the trail │ 1 › 1.0.1 › 1.0.1.0.3 › position │ acting as 1.0.1 ….', 'where-am-i')
    ctx.js('window.__skep.go.leapTo(%s, null)' % json.dumps(AGENT_SPACE + '.0.1'))
    ctx.settle()
    ctx.frames(2)
    step(ctx, r, 'W-05', 10, 'the empty view', 'W-05 step 10: "Empty view: the residue answer — a count, a cluster mark, a stub, or honest emptiness whose one action is ZOOM OUT, convergent (law 13)." The agent space 1.0.1.1: its home document holds the delegation\'s record and nothing else; the account\'s count says one.', 'agent-space')
    ctx.esc()
    # ---- a typed draft's walk, find and Back land on the typed words, at both widths (the unsent-typing decision) -------
    own = WINDOW[2]
    ctx.leap(own, 1)
    ctx.js('window.__skep.model.loadWhole(%s)' % json.dumps(own)); ctx.settle(); ctx.frames(2)
    paras = [b for b in ctx.js('window.__skep.model.doc(%s)' % json.dumps(own))['blocks'] if b['kind'] == 'para' and b['text'].strip()]
    if r.check(len(paras) >= 2, 'the own draft holds two paragraphs (what the next checks stand on)', [b['pos'] for b in paras]):
        was = ctx.resize(*WIDE)
        try:
            for w, h in (WIDE, NARROW):
                ctx.resize(w, h); ctx.settle(10); ctx.frames(3)
                lands = typed_lands(ctx, own, paras[1], DOC)
                r.figures['typed_lands_w%d' % w] = lands
                r.check(lands['ok'], f"at {w} px, a line typed in the own draft is a stop of the walk its mirror item reads, the find finds it and Back returns to it — each landing on the typed words (the unsent-typing decision §1 (a), §2)", lands)
        finally:
            ctx.resize(*was); ctx.frames(3)
    ctx.leap(DOC, WINDOW[0])
    r.figures['walks_source'] = 'ux/walks.md @ ' + ctx.design_head()
    return r.out()
