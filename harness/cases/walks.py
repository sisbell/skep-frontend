"""WALKS — S-23 (b): W-01 (arrive from outside) and W-05 (read and navigate)
as camera scripts, one PNG per step into `shots/W-01/` and `shots/W-05/`,
the design's note beside each in `report.md` (`ux/walks.md` at the design
repo's HEAD). W-02, W-03 and W-04 are OUT (their screens are later lanes').
Produced for the seats, asserted as "the step ran and the shot exists" — and
where a step's note claims an element, that the element is in view (inside
its clip and the viewport, by the page's `visible` oracle), so the seats are
never shown a note the shot contradicts. The card's controls are pressed as
a person presses them (the switch's rect read, the click dispatched at
engine level), and the card's state is read back before the shot. What each
step could not have on this lane is said in its note."""
import json

from . import AGENT_SPACE, DOC, FAR_LEAP, GHOST, WINDOW, XFAIL_CLIP, Result

C33_MARK = '#domlayer .sp[data-addr="%s"] .pubmark[data-mark="C-33"]' % DOC
ORIGIN_HAIRLINE = '#domlayer .sp[data-addr="%s"] .hairline.whole[data-src="%s"]' % (DOC, WINDOW[2])
SCENE_OFFER = '#domlayer .offer[data-scene="%s|%s"]' % (DOC, WINDOW[2])


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
              switch_checked: sw ? sw.getAttribute('aria-checked') : null, stage: window.__skep.reveal(%s).stage, others: window.__skep.reveal(%s).others, beams: window.__skep.beams()}; })()''' % (json.dumps(DOC), json.dumps(DOC)))


def run(ctx):
    r = Result()
    # ---- W-01 — Arrive from outside ---------------------------------------------------
    ctx.js('window.__skep.go.home()')
    ctx.settle()
    step(ctx, r, 'W-01', 1, 'the share link', 'W-01 step 1: "The person opens https://skep.network/l/⟨token⟩ … the resolver … 302s to the serving node." NOT this lane\'s: no resolver and no share form (the intake is X-5\'s); the page opens on its board at HOME, the acting account\'s region. The landing before arrival.', 'before-arrival')
    ctx.js('window.__skep.leap.open()')
    ctx.js('(() => { const i = document.getElementById("leapq"); i.value = ""; })()')
    ctx.drv.ime(DOC)
    ctx.frames(2)
    step(ctx, r, 'W-01', 2, 'the guest reader is the landing', 'W-01 step 2: "The serving board answers with its GUEST READER … The web viewer IS the landing." Here the address is handed in by LEAP (the box holds the typed address; Enter goes). This run reads through the owner\'s SIGNED session, not as a guest — the guest\'s class is the pure test\'s.', 'leap-address')
    ctx.drv.key('Enter')
    ctx.settle()
    ctx.leap(DOC, WINDOW[0])
    step(ctx, r, 'W-01', 3, 'the document renders at the position', 'W-01 step 3: "The document renders as formatted text, links-in-place, atoms legible (R1) … Where the token carried a span or at, the viewer lands there (position honored)." The first edition at position 1467, the owner\'s citations in place in the person\'s hue.', 'landing-at-position')
    ctx.js('window.__skep.go.wholeBoard()')
    ctx.settle()
    step(ctx, r, 'W-01', 4, 'orientation: the landing is a place', 'W-01 step 4: "the landing is a PLACE on the plane (R92); the hierarchy reads account › document › position (R6); zooming out converges to the board extent (law 13\'s clamp)." Mod+0: the whole board at the clamp, the one line reading the board.', 'whole-board-clamp')
    ctx.js('window.__skep.go.back()')
    ctx.settle()
    step(ctx, r, 'W-01', 5, 'the native client', 'W-01 step 5: "Where a native client is installed, the landing page tries skep:// and falls through" — NOT this lane\'s (the shell\'s lane). Back on the trail: the landing again, the where-am-I line reading board › account › document › position.', 'back-to-landing')
    ctx.view_doc_em(DOC, 14)
    box = ctx.js('window.__skep.boxOf(%s)' % json.dumps(DOC))
    doc = ctx.js('window.__skep.model.doc(%s)' % json.dumps(DOC))
    frac = 0.12 + 0.8 * ((WINDOW[0] - 1) / doc['extent'])
    scale = ctx.camera()['scale']
    ctx.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] * frac, scale)
    step(ctx, r, 'W-01', 6, 'the withheld item at the window run', 'W-01 step 6: "Where the published page WINDOWS a draft origin the guest meets a WITHHELD ITEM at that run, carrying the origin and the width" — the guest\'s box is proven in the pure test (the daemon withholds the run from the harness\'s token-free read, width 240); THIS reader is the entitled owner and sees the run with C-33\'s mark, "visible to you; withheld for others", the sameness hairline naming its origin 1.0.1.0.1003.', 'window-run-c33',
         claims=[(C33_MARK, 'C-33\'s mark', XFAIL_CLIP), (ORIGIN_HAIRLINE, 'the hairline naming the origin', XFAIL_CLIP)])
    shown = ctx.js('window.__skep.links.shown(%s)' % json.dumps(DOC))
    if shown:
        ctx.js('window.__skep.go.follow(%s, %s)' % (json.dumps(DOC), json.dumps(shown[0]['link'])))
        ctx.settle()
        ctx.frames(2)
    step(ctx, r, 'W-01', 7, 'a reference into nothing', 'W-01 step 7 and the failure arms: "a reference from a public document into a draft is public and renders the placeholder"; R59\'s classes never conflated. Following the first citation reaches a GHOST (cited, never minted): the dead-reference face says what the board will not say about that address, and nothing more.', 'ghost-face')
    ctx.esc()
    # ---- W-05 — Read & navigate the board -----------------------------------------------
    ctx.view_doc_px(DOC, 5)
    step(ctx, r, 'W-05', 1, 'zoom for structure: far', 'W-05 step 1: "far = counts and density" (law 5\'s LOD tiers). The account\'s clusters with their counts; the system account held and not drawn.', 'far')
    ctx.view_doc_px(DOC, 120)
    step(ctx, r, 'W-05', 1, 'zoom for structure: mid', 'W-05 step 1: "mid = extents" — the documents as boxes with their greeked extents, the drafts with their corner, the badges counting the links each holds.', 'mid')
    ctx.leap(DOC, 541)
    step(ctx, r, 'W-05', 1, 'zoom for structure: reading', 'W-05 step 1: "reading = full text with span-anchored beams" — the LEAP to a named document lands at reading scale (law 6; R92 rider (a)).', 'reading')
    ctx.set_view(box['x'] + box['w'] / 2, box['y'] + box['h'] * frac, ctx.camera()['scale'])
    step(ctx, r, 'W-05', 2, 'read: the same material', 'W-05 step 2: "transcluded content visibly THE SAME material, one gesture to the source (R2) — delivered per ORIGIN, position by position." The window run\'s hairline names 1.0.1.0.1003; the mark is C-33\'s; the scene offer stands beneath.', 'same-material',
         claims=[(C33_MARK, 'C-33\'s mark', XFAIL_CLIP), (ORIGIN_HAIRLINE, 'the hairline naming the origin', XFAIL_CLIP), (SCENE_OFFER, 'the scene offer', XFAIL_CLIP)])
    ctx.js('window.__skep.cards.links(%s)' % json.dumps(DOC))
    ctx.frames(2)
    s = card_state(ctx)
    r.check(s['stage'] == 2 and s['offers_content'] and s['switch_checked'] == 'false', 'the card opened at stage 2: it offers the content and its switch reads off', s)
    step(ctx, r, 'W-05', 3, 'ask to see the links: symbols', 'W-05 step 3: "the reveal chain hidden → symbol → content"; the card lists the owner\'s links, the lenses by owner, type and endorsement (R9), the others\' toggle OFF by default (R60). Stage 2: the symbols at their spans.', 'links-card-symbols')
    # the person presses "— content": the chain moves to stage 3 and the card redraws itself from LK's state before the shot
    press(ctx, r, 'stage3', 'the chain\'s next stage, content')
    ctx.frames(2)
    s = card_state(ctx)
    r.check(s['stage'] == 3 and s['offers_symbols'] and not s['offers_content'] and s['beams'] >= 1, 'the press moved the chain to stage 3 and the card redrew: it now offers the symbols; the beams are built', s)
    step(ctx, r, 'W-05', 3, 'ask to see the links: content', 'W-05 step 3, stage 3: the beams from each citation\'s span toward its far document — here edge STUBS with the far address, since every far document is off screen or a ghost (S1 Q3).', 'links-beams')
    # the person presses the others' switch: LK's toggle and the switch's own state agree before the shot
    press(ctx, r, 'others', 'the others\' overlay toggle')
    s = card_state(ctx)
    r.check(s['others'] is True and s['switch_checked'] == 'true' and s['offers_symbols'], 'the press turned others\' links on and the card redrew: the switch reads aria-checked="true", LK agrees, the stage button still offers the symbols', s)
    others = ctx.js('window.__skep.links.othersTouching(%s)' % json.dumps(DOC))
    step(ctx, r, 'W-05', 3, 'others\' links on', 'W-05 step 3: "Others\' links are overlays, OFF by default, attributed in the linker\'s color when shown (R60)." The toggle on: on this board no other party\'s link touches the first edition (%d), so the article does not change — the second account\'s draft and its links are hidden with it (PUB-1.13).' % len(others), 'others-on')
    press(ctx, r, 'others', 'the others\' overlay toggle, off again')
    s = card_state(ctx)
    r.check(s['others'] is False and s['switch_checked'] == 'false', 'the second press turned others\' links off again; the switch agrees', s)
    ctx.esc()
    if shown:
        ctx.js('window.__skep.cards.anatomy(%s, %s)' % (json.dumps(DOC), json.dumps(shown[0]['link'])))
        ctx.settle()
        ctx.frames(2)
    step(ctx, r, 'W-05', 4, 'the anatomy card', 'W-05 step 4: "Inspect a link\'s full anatomy: type (registry documentation one gesture away), all endsets, owner, age (R5)." The type reads R5\'s form — "undocumented here": no commons registry document is seeded; the far end\'s words first; age and supersession are not this lane\'s reads (—).', 'anatomy-card')
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
    step(ctx, r, 'W-05', 8, 'find', 'W-05 step 8: "Find: in-document find (R9a); board-wide lexical search over the /changes-fed client index" — NOT in this lane\'s cut: K-91 has no design form; the LEAP box matches addresses and first lines over the index `places` built (R8\'s own documents by label).', 'leap-box-find')
    ctx.leap(DOC, WINDOW[0])
    step(ctx, r, 'W-05', 9, 'where am I', 'W-05 step 9: "Where-am-I: account › document › position always visible (R6); home, landmarks, and the trail anchor against disorientation (R92 rider (c))." The one line: ‹ back · forward › · the trail │ 1 › 1.0.1 › 1.0.1.0.3 › position │ acting as 1.0.1 ….', 'where-am-i')
    ctx.js('window.__skep.go.leapTo(%s, null)' % json.dumps(AGENT_SPACE + '.0.1'))
    ctx.settle()
    ctx.frames(2)
    step(ctx, r, 'W-05', 10, 'the empty view', 'W-05 step 10: "Empty view: the residue answer — a count, a cluster mark, a stub, or honest emptiness whose one action is ZOOM OUT, convergent (law 13)." The agent space 1.0.1.1: its home document holds the delegation\'s record and nothing else; the account\'s count says one.', 'agent-space')
    ctx.esc()
    ctx.leap(DOC, WINDOW[0])
    r.figures['walks_source'] = 'ux/walks.md @ ' + ctx.design_head()
    return r.out()
