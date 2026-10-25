"""A11Y — class 7 (the structure record §6.3; T3 (7)): the ARIA mirror is the
one accessible rendering at span grain — its names and set sizes
(`aria-level`, `aria-posinset`, `aria-setsize`, `aria-selected`), the live
region announcing the focus on a keyboard act; every region named by its
entry in `strings.js`, which its owner sets as it attaches — the one line,
the LEAP box's input and rows, the scene, the mirror and its level's group,
the mirror's name in the AX tree as well; the plane ONE Tab stop
between the one line and the corner (D5 §4 rule 5) — of the tree and its
items the current item alone in the order, reached by Tab from the line's
last stop and left by Shift+Tab back to it; the AX tree
(`Accessibility.getFullAXTree`) compared where CDP answers it, else reported
as not answered; the platform's focus carried by the mirror's rebuild to the
current item — under the walk keys and under a LEAP's landing — with the
panel scrolled so the focused item is a row the panel shows (D5 §4 rules 2,
4 and 8); the LEAP box a combobox over its rows' listbox (R94; WAI-ARIA's
list autocomplete with automatic selection) — the focus kept in the input,
its active descendant the selected row once ↓ or ↑ carries the choice into
the rows and never on the box as opened or as typed, collapsed where typed
text matches nothing, the answer said once in the box's own status region,
in the DOM and in the AX tree; the document's corner as K-57's Tab stop (D5
§4 rules 4 and 5) — reached by Tab from the plane's stop, a group named by
its own words in the AX tree while every other corner is hidden from it,
kept under the focus through the layer's remount, Enter its act (the
versions list) with Esc returning the focus to it, Shift+Tab back to the
plane's stop, and its leaving the plane handing the focus to the walk's
current item; the focus's return as an overlay closes (D5 §4 rule 4) — the
trail list and the LEAP box, opened by a key at the mirror's current item
and closed by Esc once the wheel under them has rebuilt the mirror, leave
the focus on the walk's current item; the selection's card, rebuilt by K-8's
next press or replaced by "who wrote this?"'s answer, returns it to the item
K-8 was pressed at; a focus moved from the card to the corner stays on the
corner; the ring's later stops (D5 §4 rule 5) — a card standing without the
focus reached after the plane's stop and the corner, Shift+Tab from it back
to the corner; the reading scene's stops in the place of the plane's and the
corner's, pane, its corner, pane, its corner, the scene's acts (K-61; issue
#160), with nothing the scene covers in the ring, nothing inside a pane's
article a control or a stop in the AX tree (SC: the panes are read, never
pressed), each pane's corner a group there named by its own words, which say
what the pane shows, and Shift+Tab walking it back to the
line, Esc and Mod+[ from a pane each its Back (issue #50), ending it on the
entry it opened over with the focus on the landing's item (K-63; rule 8); Back's light
exposed (issue #152's design decision) — Mod+[ from a carried passage's
landing returns the focus to the span holding the passage's start where the
carry was made, every span item holding a stretch of it marked
`aria-current="location"` and no other item, none once the next act puts the
light out; a landing's line its item's description (issue #153's design
decision) — a passage the draft holds part of, carried into it, the focus on
the item at its first held piece, described by the line's words, the one
item described, none once the next landing takes the line down; a landing
in several runs (issue #158's design decision: "Each run's accessible item
carries its label from the moment of landing") — two typed lines of the first
edition apart in one column, landed in through the gate's door naming the
passage they hold — the focus on piece 1's item, described by the line's
words, piece 2's item by its own label, and Mod+G moving the focus to piece
2's item, described by the line's words then, piece 1's by its label; the links
card's overlay toggle a switch in the AX tree (R60; WAI-ARIA's switch) —
named by B1-S4's words before its state and described by the count after
it, a press changing its checked state and neither its name nor its
description; a box shown at a version (issue #154's design decision) — a
LEAP to version 1's address, zoomed out to mid over it — listed by the
mirror once, its current item, named by the version's address and its
document's first line; an item that holds no text announced by its kind
(issue #161's design decision) — the claimant's key record named "a record",
the words a copy's stand-in names it by, then the words and keys the plane
shows of it, never its raw value. Never a screen reader's voice — the
seat's."""
import json
import re

from . import DOC, FAR_LEAP, HOME, NO_MATCH, VERSIONED, WINDOW, Result, item_words

# how far apart the first lines of a landing's two runs stand, in body line boxes — the article's line height 1.45 of
# its size, the case's own — so the label beside the second never stacks with the line beside the first (O-LAND's
# `stacks`): each run's item carries its own label
RUNS_APART_LINES, LINE_RATIO = 4, 1.45


def run(ctx):
    r = Result()
    # rule 21: at launch the platform's focus rests on the walk's element, the ring out — observed on a fresh page (reads alone)
    ctx.open_page('all')
    launch = ctx.js('''(() => { const e = document.activeElement, i = window.__skep.mirror.index();
      return {id: e ? e.id : null, item: !!e && e.id === 'walk-' + i, sel: e ? e.getAttribute('aria-selected') : null, ring: window.__skep.focus().ring, size: window.__skep.mirror.size()}; })()''')
    r.check(launch['size'] > 0 and launch['item'] and launch['sel'] == 'true' and launch['ring'] is False,
            'rule 21: at launch the platform\'s focus rests on the walk\'s element, the ring out', launch)
    ctx.leap(DOC, WINDOW[0])
    size = ctx.js('window.__skep.mirror.size()')
    idx = ctx.js('window.__skep.mirror.index()')
    doc = ctx.js('window.__skep.model.doc(%s)' % json.dumps(DOC))
    shown = ctx.js('window.__skep.links.shown(%s)' % json.dumps(DOC))
    # rule 20: a block of white space alone is no element of the walk; the mirror lists the elements (every block but those) and
    # the drawn links — those drawn at a withheld run its item's own, a level below (issue #202)
    elements = [b for b in doc['blocks'] if b['kind'] != 'para' or (b['text'] or '').strip() != '']
    blank = [b for b in doc['blocks'] if b['kind'] == 'para' and (b['text'] or '').strip() == '']
    loose = [s for s in shown if not s.get('run')]
    r.check(size == len(elements) + len(loose), 'the mirror\'s set is the document\'s elements (no blank block) and its drawn links, a withheld run\'s apart (rule 20; issue #202)', {'size': size, 'elements': len(elements), 'blank_blocks': len(blank), 'links': len(loose), 'at_runs': len(shown) - len(loose)})
    items = ctx.js('''[...document.querySelectorAll('#mirror [role=treeitem]')].map(li => ({id: li.id, level: li.getAttribute('aria-level'), pos: li.getAttribute('aria-posinset'), size: li.getAttribute('aria-setsize'), sel: li.getAttribute('aria-selected'), tab: li.getAttribute('tabindex'), text: li.textContent}))''')
    r.check(len(items) >= 1, 'the mirror renders treeitems', len(items))
    r.check(all(int(i['size']) == size for i in items), 'every item\'s aria-setsize is the set\'s size', {i['pos']: i['size'] for i in items if int(i['size']) != size})
    r.check(all(i['level'] == '4' for i in items), 'the items at span grain are level 4 (board › account › document › span)', sorted({i['level'] for i in items}))
    r.check(sum(1 for i in items if i['sel'] == 'true') == 1, 'exactly one item is selected', sum(1 for i in items if i['sel'] == 'true'))
    stops = ctx.js('''[document.getElementById('mirror'), ...document.querySelectorAll('#mirror [tabindex]')].filter((e) => e.getAttribute('tabindex') === '0').map((e) => e.id)''')
    r.check(stops == ['walk-%d' % idx], 'the plane is one Tab stop: of the tree and its items, the current item alone is in the tab order (D5 §4 rule 5; roving tabindex)', {'stops': stops, 'index': idx})
    bad = []
    for i in items:
        want = ctx.js('window.__skep.mirror.item(%d)' % (int(i['pos']) - 1))
        if i['text'] != want:
            bad.append({'pos': i['pos'], 'dom': i['text'][:80], 'model': (want or '')[:80]})
    r.check(not bad, 'each DOM item\'s name equals the model\'s item name (one accessible rendering)', bad)
    roles = ctx.js('({mirror: document.getElementById("mirror").getAttribute("role"), label: document.getElementById("mirror").getAttribute("aria-label"), live: document.getElementById("live").getAttribute("aria-live"), live_role: document.getElementById("live").getAttribute("role"), overlay_live: document.getElementById("overlay").getAttribute("aria-live"), hidden_layer: document.getElementById("domlayer").getAttribute("aria-hidden"), plane: document.getElementById("plane").getAttribute("aria-hidden"), beams: document.getElementById("beams").getAttribute("aria-hidden")})')
    r.check(roles['mirror'] == 'tree' and roles['live'] == 'polite' and roles['hidden_layer'] == 'true', 'the mirror is a tree, the live region polite, the visual text layer hidden from AT', roles)
    # D4: ONE standing status region (#live as role=status) the controller alone writes; the overlay carries no live region of its own (the a11y seat's subtraction, #13's condition met); every canvas is hidden from AT
    r.check(roles['live_role'] == 'status' and roles['overlay_live'] is None and roles['plane'] == 'true' and roles['beams'] == 'true',
            'D4: #live is the one status region (role=status); the overlay has no aria-live of its own; the canvases are hidden from AT', roles)
    # the regions' names: the markup carries none; each owner sets its region's from strings.js as it attaches
    named = ctx.js('''(async () => { const {t} = await import("./strings.js");
      const want = [["#line", t("L.the-line")], ["#leapq", t("L.leap-label")], ["#leaphits", t("L.leap-rows-label")], ["#scene", t("L.scene-label")],
                    ["#mirror", t("L.mirror-label")], ["#mirror ul[role=group]", t("L.mirror-level", {n: 4})]];
      return want.map(([sel, name]) => { const e = document.querySelector(sel); return {sel, want: name, got: e ? e.getAttribute("aria-label") : null}; }); })()''')
    r.check(bool(named) and all(n['got'] == n['want'] for n in named), 'every region is named by its entry in strings.js — the one line, the LEAP box\'s input and rows, the scene, the mirror and its group at span grain (level 4)', [n for n in named if n['got'] != n['want']])
    r.figures['names'] = {n['sel']: n['got'] for n in named}
    # a keyboard act announces the focus. The status region is watched across the key alone: what an earlier act said there —
    # the LEAP's reading face, heard as a face is (issue #136) — stands in it, and is no word of the key's
    ctx.js('(() => { window.__gateLive = {writes: 0, seen: new MutationObserver((m) => { window.__gateLive.writes += m.length; })}; '
           'window.__gateLive.seen.observe(document.getElementById("live"), {childList: true, characterData: true, subtree: true}); })()')
    ctx.drv.key('ArrowDown')
    ctx.settle()
    ctx.frames(2)
    writes = ctx.js('(() => { window.__gateLive.seen.disconnect(); return window.__gateLive.writes; })()')
    idx2 = ctx.js('window.__skep.mirror.index()')
    live = ctx.js('document.getElementById("live").textContent')
    want = ctx.js('window.__skep.mirror.item(window.__skep.mirror.index())')
    item_name = ctx.js('(() => { const e = document.activeElement; return e && e.id === "walk-" + window.__skep.mirror.index() ? e.textContent : null; })()')
    r.check(idx2 == min(size - 1, idx + 1), 'ArrowDown moves the focus to the next sibling', {'before': idx, 'after': idx2})
    # D4 / rule 12: a walk key moves the focus onto the item, whose name IS its announcement; no live region repeats it
    r.check(item_name == want and writes == 0, 'a walk key moves the focus onto the item, whose name is its announcement; the status region is not written (D4, rule 12)', {'item': (item_name or '')[:90], 'want': (want or '')[:90], 'writes': writes, 'live': (live or '')[:90]})
    ctx.drv.key('ArrowUp')
    ctx.settle()
    # the names: a span's name carries its position, its document and its text; a link's its type and far end; an item that
    # holds no text its kind in the strings table's words (issue #161)
    names = [ctx.js('window.__skep.mirror.item(%d)' % i) for i in range(size)]
    kinds = tuple(['span at position ', 'link '] + [w + ' ' for w in item_words(ctx).values()])
    r.check(all(n.startswith(kinds) for n in names), 'every name opens with its kind', [n[:40] for n in names if not n.startswith(kinds)])
    r.figures['mirror'] = {'size': size, 'rendered_items': len(items), 'sample': names[:2]}
    # the AX tree
    ax = ctx.drv.ax_tree()
    if 'error' in ax:
        r.figures['ax_tree'] = {'answered': False, 'error': ax['error']}
        r.note('Accessibility.getFullAXTree did not answer: ' + ax['error'])
    else:
        nodes = ax.get('nodes', [])
        treeitems = [n for n in nodes if (n.get('role') or {}).get('value') == 'treeitem']
        fold = lambda s: re.sub(r'\s+', ' ', s or '').strip()  # an accessible name folds whitespace
        ax_names = [fold((n.get('name') or {}).get('value', '')) for n in treeitems]
        dom_names = [fold(i['text']) for i in items]
        trees = [n for n in nodes if (n.get('role') or {}).get('value') == 'tree']
        r.figures['ax_tree'] = {'answered': True, 'nodes': len(nodes), 'treeitems': len(treeitems), 'trees': len(trees), 'ignored_nodes': sum(1 for n in nodes if n.get('ignored'))}
        r.check(len(treeitems) == len(items), 'the AX tree holds one treeitem per rendered mirror item', {'ax': len(treeitems), 'dom': len(items)})
        r.check(sorted(ax_names) == sorted(dom_names), 'the AX treeitems\' names are the mirror\'s names', {'ax_sample': ax_names[:2], 'dom_sample': dom_names[:2]})
        r.check(len(trees) >= 1, 'the AX tree exposes the mirror as a tree')
        tree_names = [fold((n.get('name') or {}).get('value', '')) for n in trees]
        mirror_name = next((n['want'] for n in named if n['sel'] == '#mirror'), None)
        r.check(mirror_name is not None and mirror_name in tree_names, 'the AX tree names the mirror\'s tree by its entry in strings.js', {'names': tree_names, 'want': mirror_name})
        # the visual text layer is hidden from the tree
        layer_texts = [n for n in nodes if not n.get('ignored') and (n.get('role') or {}).get('value') == 'StaticText' and 'skep-ux-design' in ((n.get('name') or {}).get('value') or '')]
        r.figures['ax_tree']['static_text_from_articles'] = len(layer_texts)
    # ---- the platform's focus rides the mirror's rebuild (D5 §4 rules 2, 4, 8) ----------------------------------
    # Every walk move rebuilds the tree. From where Tab lands — the current item, the roving stop — each arrow must
    # leave the platform's focus on the NEW current item; the container survives a rebuild and would hide the loss.
    def focused():
        return ctx.js('({active: document.activeElement ? document.activeElement.id : null, sel: document.activeElement ? document.activeElement.getAttribute("aria-selected") : null, idx: window.__skep.mirror.index()})')

    def shown_item(i):
        return ctx.js('window.__skep.visible(%s)' % json.dumps('#walk-%d' % i))

    def press(key, mods=()):
        ctx.drv.key(key, mods=mods)
        ctx.settle()
        ctx.frames(2)

    def in_window(i):
        """the item is a row the panel shows: inside the panel's clip and the viewport, by the visibility oracle"""
        v = shown_item(i)
        return len(v) == 1 and v[0]['inClip'] and v[0]['inView'], v

    start = ctx.js('window.__skep.mirror.index()')
    ctx.js('document.getElementById("walk-" + window.__skep.mirror.index()).focus({preventScroll: true})')
    ctx.frames(1)
    f = focused()
    r.check(f['active'] == 'walk-%d' % start, 'the current item takes the platform\'s focus (the roving stop)', f)
    # the walk's keys are the tree's own: the platform's default for an arrow — a scroll of the scroller the focus
    # stands in, the mirror — must be prevented before the listeners return, or it runs under the page's own scroll.
    # A listener added after the page's own sees the event as the platform does, once the page's listener has returned.
    ctx.js('(() => { window.__gateKeydown = null; window.addEventListener("keydown", (e) => { window.__gateKeydown = {key: e.key, prevented: e.defaultPrevented}; }, {once: true}); })()')
    for key, want in (('ArrowDown', min(size - 1, start + 1)), ('ArrowDown', min(size - 1, start + 2)), ('ArrowUp', max(0, min(size - 1, start + 2) - 1))):
        press(key)
        f = focused()
        ok, v = in_window(want)
        r.check(f['idx'] == want and f['active'] == 'walk-%d' % want and f['sel'] == 'true', '%s from the focused item: the focus stands on the new current item after the rebuild' % key, {'want': want, 'got': f})
        r.check(ok, '%s: the focused item is a row the panel shows — inside its clip and the viewport' % key, v)
    seen = ctx.js('window.__gateKeydown')
    r.check(bool(seen) and seen['key'] == 'ArrowDown' and seen['prevented'] is True, 'the walk key\'s default is prevented before the listeners return (the platform never scrolls the mirror under the page)', seen)
    # the fold: the panel scrolls within a capped height; End puts the current item at the set's end, and the panel
    # must scroll so the item the focus outlines is a row the panel shows
    press('End')
    f = focused()
    ok, v = in_window(size - 1)
    r.check(f['idx'] == size - 1 and f['active'] == 'walk-%d' % (size - 1), 'End: the focus stands on the last item', f)
    r.check(ok, 'End: the focused last item is a row the panel shows — the panel scrolled to it', v)
    outline = ctx.js('(() => { const e = document.activeElement; const cs = getComputedStyle(e); return {id: e.id, outline: cs.outlineStyle, width: cs.outlineWidth}; })()')
    r.check(outline['outline'] == 'solid', 'the focused item carries the solid outline the stylesheet draws on the mirror\'s focused item', outline)
    r.figures['mirror_panel'] = ctx.js('(() => { const m = document.getElementById("mirror"); const li = m.querySelector("li"); const h = li ? li.getBoundingClientRect().height : null; return {client_h: m.clientHeight, scroll_h: m.scrollHeight, scroll_top_at_end: m.scrollTop, first_row_h: h, items_rendered: m.querySelectorAll("li").length}; })()')
    press('Home')
    f = focused()
    ok, v = in_window(0)
    r.check(f['idx'] == 0 and f['active'] == 'walk-0' and ok, 'Home: the focus on the first item, a row the panel shows again', {'focus': f, 'shown': v})
    # a LEAP from the item: the box returns the focus to the item it opened from (rule 4), and the landing's rebuild
    # carries it to the landing's item (rule 8) — never the body; the landing sits mid-set in a window of ±24 rows,
    # well past the fold, so the panel must scroll to it
    press('l', mods=('Meta',))
    r.check(ctx.js('window.__skep.leap.isOpen() && document.activeElement.id === "leapq"'), 'Mod+L from the item opens the box, which takes the focus')
    ctx.js('(() => { document.getElementById("leapq").value = ""; })()')
    ctx.drv.ime(FAR_LEAP)
    ctx.frames(2)
    press('Enter')
    f = focused()
    landed = ctx.js('window.__skep.view.focus()')
    r.check(bool(landed) and landed['addr'] == FAR_LEAP and f['active'] == 'walk-%d' % f['idx'] and f['sel'] == 'true', 'Enter LEAPs; the focus stands on the landing\'s item in the rebuilt tree', {'landed': landed, 'got': f})
    ok, v = in_window(f['idx'])
    r.check(ok, 'the landing\'s item is a row the panel shows — the panel scrolled to it on the landing', v)
    r.figures['mirror_panel']['landing'] = {'index': f['idx'], 'size': ctx.js('window.__skep.mirror.size()'), 'scroll_top': ctx.js('document.getElementById("mirror").scrollTop')}
    # ---- the LEAP box: a combobox over its rows' listbox (R94; WAI-ARIA's list autocomplete with automatic selection) ----
    # The platform's focus stays in the input. Its active descendant names the selected row once ↓ or ↑ carries the
    # choice into the rows — never on the box as opened, where the box itself (the current address) is what a reader
    # meets, and never as typed. The answer and the index's state are the box's status region, written only when its
    # words change: a live region speaks whatever is rewritten.
    def box():
        """the box as the platform exposes it: the input's combobox state, the rows the listbox holds (each by its index),
        the row the active descendant names where it names one of them, the status region's words"""
        return ctx.js('''(() => { const q = document.getElementById('leapq'), hits = document.getElementById('leaphits'), note = document.getElementById('leapnote');
          const opts = [...hits.children], active = q.getAttribute('aria-activedescendant'), named = active ? document.getElementById(active) : null;
          return {role: q.getAttribute('role'), autocomplete: q.getAttribute('aria-autocomplete'), controls: q.getAttribute('aria-controls'), expanded: q.getAttribute('aria-expanded'),
                  active, active_row: named && opts.includes(named) ? Number(named.dataset.i) : null, focused: document.activeElement === q, container: document.getElementById('leap').getAttribute('role'),
                  list: hits.getAttribute('role'), status: note.getAttribute('role'), options: opts.length, roles: [...new Set(opts.map((o) => o.getAttribute('role')))],
                  selected: opts.filter((o) => o.getAttribute('aria-selected') === 'true').map((o) => Number(o.dataset.i)), note: note.textContent}; })()''')

    def backend(selector):
        """the backend DOM node id of the element a selector names — the AX tree's key for it"""
        obj = ctx.drv.call('Runtime.evaluate', {'expression': 'document.querySelector(%s)' % json.dumps(selector)})['result']
        if not obj.get('objectId'):
            return None
        try:
            return ctx.drv.call('DOM.describeNode', {'objectId': obj['objectId']})['node']['backendNodeId']
        finally:
            ctx.drv.call('Runtime.releaseObject', {'objectId': obj['objectId']})

    press('l', mods=('Meta',))
    b = box()
    n_levels = len(ctx.js('window.__skep.leap.rows()'))
    r.check(b['role'] == 'combobox' and b['autocomplete'] == 'list' and b['controls'] == 'leaphits' and b['list'] == 'listbox' and b['container'] is None and b['status'] == 'status',
            'the box\'s input is a list-autocomplete combobox controlling the rows\' listbox; the box around them holds no role; its note is a status region', b)
    r.check(b['focused'] and b['expanded'] == 'true' and b['active'] is None, 'opened: the input holds the focus, expanded over the levels, with no active row — the box itself is what a reader meets', b)
    r.check(n_levels > 1 and b['options'] == n_levels and b['roles'] == ['option'], 'the listbox holds one option per row', {'rows': n_levels, 'options': b['options'], 'roles': b['roles']})
    # ↓ chooses the row after the selected one, or the first where none is selected
    want = min(n_levels - 1, (b['selected'][0] if b['selected'] else -1) + 1)
    press('ArrowDown')
    b = box()
    r.check(b['active_row'] == want and b['selected'] == [want] and b['focused'], '↓ carries the choice into the rows: the active descendant is the row chosen, the one row selected, the focus still in the input', {'want': want, 'got': b})
    ctx.js('(() => { document.getElementById("leapq").value = ""; })()')
    ctx.drv.ime('1.0.1.0.')
    ctx.frames(2)
    rows = ctx.js('window.__skep.leap.rows()')
    b = box()
    r.check(len(rows) >= 3 and b['options'] == len(rows) and b['expanded'] == 'true', 'typed text lists its matches as options (an address prefix: three rows or more)', {'rows': len(rows), 'options': b['options'], 'expanded': b['expanded']})
    r.check(b['active'] is None and b['selected'] == [0], 'as typed: the first match selected and no row active (automatic selection)', b)
    press('ArrowDown')
    press('ArrowDown')
    b = box()
    r.check(b['active_row'] == 2 and b['selected'] == [2] and b['focused'], '↓ ↓ after typing: the third row active and selected, the focus in the input', b)
    ax = ctx.drv.ax_tree()
    if 'error' in ax:
        r.figures['leap_ax'] = {'answered': False, 'error': ax['error']}
        r.note('the LEAP box: Accessibility.getFullAXTree did not answer: ' + ax['error'])
    else:
        nodes = ax.get('nodes', [])
        by_dom = {n['backendDOMNodeId']: n for n in nodes if 'backendDOMNodeId' in n}
        by_ax = {n['nodeId']: n for n in nodes}
        role = lambda n: ((n or {}).get('role') or {}).get('value')
        name = lambda n: ((n or {}).get('name') or {}).get('value')
        props = lambda n: {p['name']: p['value'] for p in (n or {}).get('properties', [])}
        related = lambda v: [x.get('backendDOMNodeId') for x in (v or {}).get('relatedNodes', [])]
        squash = lambda s: re.sub(r'\s+', '', s or '')  # an option's name spaces its flex items; its text does not
        third = '#leaphits > [data-i="2"]'
        q_id, list_id, row_id = backend('#leapq'), backend('#leaphits'), backend(third)
        cb, lb, opt = by_dom.get(q_id), by_dom.get(list_id), by_dom.get(row_id)
        cp = props(cb)
        label = ctx.js('document.getElementById("leapq").getAttribute("aria-label")')
        options = [by_ax[c] for c in (lb or {}).get('childIds', []) if c in by_ax and role(by_ax[c]) == 'option']
        row_text = ctx.js('document.querySelector(%s).textContent' % json.dumps(third))
        r.check(role(cb) == 'combobox' and name(cb) == label, 'the AX tree: the input is a combobox named by its label', {'role': role(cb), 'name': name(cb)})
        r.check((cp.get('expanded') or {}).get('value') is True and (cp.get('autocomplete') or {}).get('value') == 'list' and list_id in related(cp.get('controls')),
                'the AX tree: the combobox is expanded, autocompletes a list and controls the listbox', {k: cp.get(k) for k in ('expanded', 'autocomplete', 'controls')})
        r.check(role(lb) == 'listbox' and len(options) == len(rows), 'the AX tree: the listbox holds one option per row', {'role': role(lb), 'options': len(options), 'rows': len(rows)})
        r.check(related(cp.get('activedescendant')) == [row_id] and role(opt) == 'option' and (props(opt).get('selected') or {}).get('value') is True and squash(name(opt)) == squash(row_text),
                'the AX tree: the combobox\'s active descendant is the selected third option, named by its row\'s text', {'active': cp.get('activedescendant'), 'role': role(opt), 'selected': props(opt).get('selected'), 'name': name(opt), 'text': row_text})
        r.figures['leap_ax'] = {'answered': True, 'combobox': {'role': role(cb), 'name': name(cb)}, 'listbox_options': len(options), 'active_option': name(opt)}
    target = rows[2]['addr'] if len(rows) > 2 else None
    press('Enter')
    landed = ctx.js('window.__skep.view.focus()')
    b = box()
    r.check(not ctx.js('window.__skep.leap.isOpen()') and bool(landed) and landed['addr'] == target, 'Enter goes to the active row', {'target': target, 'landed': landed})
    r.check(b['expanded'] == 'false' and b['active'] is None, 'closed: the combobox is collapsed and names no active row', b)
    # the answer: text that matches nothing empties the listbox, collapses the combobox, and is said once, in the
    # status region that stood before the text was typed
    press('l', mods=('Meta',))
    ctx.js('(() => { window.__gateNote = document.getElementById("leapnote"); document.getElementById("leapq").value = ""; })()')
    ctx.drv.ime(NO_MATCH)
    ctx.frames(2)
    answer = ctx.js('(async () => (await import("./strings.js")).t("F.leap.none"))()')
    unmatched = ctx.js('window.__skep.leap.rows()')
    b = box()
    same = ctx.js('document.getElementById("leapnote") === window.__gateNote')
    r.check(unmatched == [], 'the typed text matches nothing (what the answer\'s checks stand on)', unmatched[:2])
    r.check(b['options'] == 0 and b['expanded'] == 'false', 'matching nothing: the listbox holds no option and the combobox is collapsed', b)
    r.check(same and answer in (b['note'] or ''), 'the answer stands in the status region that stood before the text was typed', {'same_element': same, 'note': b['note'], 'answer': answer})
    ctx.js('(() => { window.__gateNoteWrites = 0; window.__gateNoteObs = new MutationObserver((ms) => { window.__gateNoteWrites += ms.length; }); window.__gateNoteObs.observe(document.getElementById("leapnote"), {childList: true, subtree: true, characterData: true, attributes: true}); })()')
    press('ArrowDown')
    b = box()
    r.check(b['active'] is None, '↓ over no rows names no active descendant', b)
    press('ArrowUp')
    ctx.drv.ime('q')
    ctx.frames(2)
    still = ctx.js('window.__skep.leap.rows()')
    writes = ctx.js('(() => { window.__gateNoteObs.disconnect(); return window.__gateNoteWrites; })()')
    r.check(still == [] and writes == 0, 'the answer is said once: ↓, ↑ and a further keystroke that still matches nothing leave the status region unwritten', {'writes': writes, 'rows': len(still)})
    press('Escape')
    r.check(not ctx.js('window.__skep.leap.isOpen()'), 'Esc closes the box')
    # ---- the corner: K-57's Tab stop (D5 §4 rules 4 and 5; foundations §3.1) ----------------------------------------
    # The ring runs from the plane's stop — the mirror's current item — to the focused document's corner. The corner's
    # element outlives the article's remounts, so the focus on it survives them; Enter takes its act and the list it
    # opens returns the focus to it; a corner that leaves the plane while it holds the focus hands it to the walk.
    corner = '#corners [data-corner="%s"]' % DOC

    def at():
        """where the platform's focus stands: the corner it is on, the element's id, the walk's index, the overlay"""
        return ctx.js('''(() => { const e = document.activeElement, o = document.getElementById('overlay');
          return {corner: e && e.dataset ? e.dataset.corner || null : null, id: e ? e.id || null : null, idx: window.__skep.mirror.index(),
                  sel: e ? e.getAttribute('aria-selected') : null, overlay: window.__skep.overlay().id, in_overlay: o.contains(e) && e !== o}; })()''')

    ctx.leap(DOC, WINDOW[0])
    # the line's last stop and the plane's are neighbours in the page's order (D5 §4 rule 5): Tab from the line's last stop
    # lands on the mirror's current item, and Shift+Tab from that item returns to the line's — no stop of the tree's own between
    line_stop = ctx.js('''(() => { const s = [...document.querySelectorAll('#line button:not([disabled]), #line [tabindex="0"]')].pop();
      if (s) s.focus({preventScroll: true}); return s && document.activeElement === s ? s.dataset.act || null : null; })()''')
    ctx.frames(1)
    press('Tab')
    f = at()
    r.check(line_stop is not None and f['id'] == 'walk-%d' % f['idx'] and f['sel'] == 'true', 'Tab from the one line\'s last stop lands on the plane\'s one stop, the mirror\'s current item', {'from': line_stop, 'got': f})
    ctx.js('document.getElementById("walk-" + window.__skep.mirror.index()).focus({preventScroll: true})')
    ctx.frames(1)
    press('Tab', mods=('Shift',))
    back = ctx.js('(() => { const e = document.activeElement; return e && e.closest("#line") ? e.dataset.act || null : null; })()')
    r.check(line_stop is not None and back == line_stop, 'Shift+Tab from the mirror\'s current item goes back to the one line\'s last stop', {'line_stop': line_stop, 'got': back, 'at': at()})
    ctx.js('document.getElementById("walk-" + window.__skep.mirror.index()).focus({preventScroll: true})')
    ctx.frames(1)
    press('Tab')
    f = at()
    r.check(f['corner'] == DOC, 'Tab from the plane\'s stop (the mirror\'s current item) reaches the focused document\'s corner (K-57)', f)
    others = ctx.js('[...document.querySelectorAll("#corners [data-corner]")].filter((e) => e.dataset.corner !== %s).map((e) => ({addr: e.dataset.corner, hidden: e.getAttribute("aria-hidden"), tab: e.getAttribute("tabindex")}))' % json.dumps(DOC))
    r.check(all(o['hidden'] == 'true' and o['tab'] is None for o in others), 'every other corner on the plane is out of the Tab order and hidden from AT', others)
    ax = ctx.drv.ax_tree()
    if 'error' in ax:
        r.figures['corner_ax'] = {'answered': False, 'error': ax['error']}
        r.note('the corner: Accessibility.getFullAXTree did not answer: ' + ax['error'])
    else:
        by_dom = {n['backendDOMNodeId']: n for n in ax.get('nodes', []) if 'backendDOMNodeId' in n}
        node = by_dom.get(backend(corner)) or {}
        # its own words, each compact sign read whole by the name it carries (FP-26: a usual state's glyph named by its words)
        words = ctx.js('(() => { const e = document.querySelector(%s); if (!e) return null; const k = e.cloneNode(true); k.querySelectorAll(".glyph[aria-label]").forEach((g) => { g.textContent = g.getAttribute("aria-label"); }); return k.textContent; })()' % json.dumps(corner)) or ''
        ax_role, ax_name = (node.get('role') or {}).get('value'), (node.get('name') or {}).get('value') or ''
        r.check(bool(node) and not node.get('ignored') and ax_role == 'group' and re.sub(r'\s+', '', ax_name) == re.sub(r'\s+', '', words) and words.strip() != '',
                'the AX tree: the focused corner is a group, not hidden, named by its own words, a compact one\'s glyphs read whole', {'ignored': node.get('ignored'), 'role': ax_role, 'name': ax_name[:120], 'words': words[:120]})
        r.figures['corner_ax'] = {'answered': True, 'role': ax_role, 'name': ax_name[:160]}
    # the reveal bumps the layer: every mounted article is rebuilt, the corner's element is kept, and the focus with it
    ctx.js('(() => { window.__gateCorner = document.activeElement; window.__gateArticle = document.querySelector(%s); })()' % json.dumps('#domlayer article[data-addr="%s"]' % DOC))
    ctx.js('window.__skep.links.reveal(%s, 2)' % json.dumps(DOC))
    ctx.settle()
    ctx.frames(3)
    kept = ctx.js('({rebuilt: !!window.__gateArticle && !window.__gateArticle.isConnected, same: document.activeElement === window.__gateCorner && window.__gateCorner.isConnected})')
    r.check(kept['rebuilt'] and kept['same'], 'the layer\'s remount rebuilds the article and leaves the focus on the same corner', kept)
    ctx.js('window.__skep.links.hide(%s)' % json.dumps(DOC))
    ctx.frames(2)
    # Enter: the corner's act, the versions list, which takes the focus; Esc returns it to the corner
    press('Enter')
    ctx.js('new Promise((res) => { const t0 = performance.now(); const tick = () => (window.__skep.overlay().id || performance.now() - t0 > 10000 ? res(true) : setTimeout(tick, 50)); tick(); })')
    ctx.frames(2)
    f = at()
    first = ctx.js('(() => { const e = document.activeElement; return {run: e ? e.dataset.run : null, x: !!(e && e.dataset.x), current: e ? e.getAttribute("aria-current") : null}; })()')
    r.check(f['overlay'] == 'versions:' + DOC and f['in_overlay'] and not first['x'] and (first['run'] or '').startswith('read'),
            'Enter at the corner (a key) opens the versions list with the focus on its current member\'s read act, never the × (rule 13)', dict(f, first=first))
    press('Escape')
    f = at()
    r.check(f['overlay'] is None and f['corner'] == DOC, 'Esc closes the list and the focus returns to the corner it was opened from', f)
    press('Tab', mods=('Shift',))
    f = at()
    r.check(f['id'] == 'walk-%d' % f['idx'] and f['sel'] == 'true', 'Shift+Tab from the corner goes back to the plane\'s stop, the mirror\'s current item', f)
    # the document zoomed below reading scale: its corner leaves the plane, and the focus it held goes to the walk
    press('Tab')
    r.check(at()['corner'] == DOC, 'Tab reaches the corner again')
    unit = ctx.js('window.__skep.scaleFor(%s, "em", 1)' % json.dumps(DOC))
    readable = ctx.js('window.__skep.constants.LOD_TXT_LO')
    zooms = 0
    while zooms < 6 and ctx.camera()['scale'] / unit >= readable:
        ctx.drv.key('-', code='Minus', mods=('Meta',))
        ctx.settle()
        ctx.frames(2)
        zooms += 1
    ctx.frames(2)
    f = at()
    gone = ctx.js('!document.querySelector(%s)' % json.dumps(corner))
    r.check(gone and f['id'] == 'walk-%d' % f['idx'] and f['sel'] == 'true', 'Mod+- until the document is below reading scale: its corner leaves and the focus it held stands on the walk\'s current item — never lost, never to the top', {'zooms': zooms, 'em': ctx.camera()['scale'] / unit, 'corner_gone': gone, 'focus': f})
    # ---- the focus's return as an overlay closes (D5 §4 rule 4) ------------------------------------------------------
    # An overlay a key opened returns the focus to the element it was opened from or, where that is gone, to the walk's
    # element — never to the top. The wheel under a standing overlay pans the camera (a pan is never "the next act"), and the
    # walk's re-take at the view's centre rebuilds the mirror, so the item the overlay was opened from leaves the page. A chain
    # of overlays — the selection's card rebuilt by K-8's next press, or replaced by an act's answer, which drops the focus the
    # card held — returns the focus as one overlay does; and a focus the person moved out of the overlay stays where they put it.
    def from_item():
        """the landing, the platform's focus on the mirror's current item, the page keeping it as the opener"""
        ctx.leap(DOC, WINDOW[0])
        ok = ctx.js('(() => { const i = document.getElementById("walk-" + window.__skep.mirror.index()); if (i) i.focus({preventScroll: true}); window.__gateFrom = i; return !!i && document.activeElement === i; })()')
        ctx.frames(1)
        return ok

    def returned():
        """where the focus stands: its element, whether that is the walk's current item and selected, whether it is the
        opener itself, whether it stands on nothing; the overlay and the box"""
        return ctx.js('''(() => { const e = document.activeElement, i = window.__skep.mirror.index();
          return {id: e ? e.id || e.tagName.toLowerCase() : null, item: !!e && e.id === 'walk-' + i && e.getAttribute('aria-selected') === 'true',
                  opener: !!e && e === window.__gateFrom, body: !e || e === document.body, overlay: window.__skep.overlay().id, leap: window.__skep.leap.isOpen()}; })()''')

    def clear_point():
        """a point over the plane clear of the one line, the box, the overlay, the scene and the mirror: the wheel's target
        there pans the camera"""
        return ctx.js('''(() => { const p = window.__skep.view.viewport();
          for (const [fx, fy] of [[0.75, 0.6], [0.85, 0.75], [0.6, 0.85], [0.9, 0.4], [0.4, 0.6]]) {
            const x = Math.round(p.VW * fx), y = Math.round(p.VH * fy), e = document.elementFromPoint(x, y);
            if (e && !e.closest('#line, #leap, #overlay, #scene, #mirror')) return {x, y};
          }
          return null; })()''')

    def wheel_away(what, standing):
        """the wheel turned over the plane until the walk's re-take has rebuilt the mirror and the opener is off the page, with
        what stands (`standing`, an expression) still holding the focus — its own check, so a wheel that moved no focus fails
        loudly rather than leaving the return below it nothing to prove"""
        at, turns, gone = clear_point(), 0, False
        while at is not None and not gone and turns < 8:
            ctx.drv.wheel(at['x'], at['y'], dy=300)
            ctx.js('new Promise((res) => setTimeout(res, 400))')  # the re-take waits 220 ms on the wheel's rest
            ctx.settle()
            ctx.frames(2)
            turns += 1
            gone = ctx.js('!!window.__gateFrom && !window.__gateFrom.isConnected')
        held = ctx.js(standing)
        r.check(at is not None and gone and held, '%s, then the wheel over the plane: the walk\'s re-take rebuilds the mirror, the item the focus came from leaves the page, and the focus stays in %s' % (what, what),
                {'point': at, 'turns': turns, 'opener_gone': gone, 'held': held, 'focus': returned()})

    in_list = 'window.__skep.overlay().id === "trail-list" && document.getElementById("overlay").contains(document.activeElement)'
    opened = from_item()
    press('y', mods=('Meta',))
    first = ctx.js('(() => { const e = document.activeElement; return {run: e ? e.dataset.run : null, x: !!(e && e.dataset.x)}; })()')
    r.check(opened and ctx.js(in_list) and not first['x'] and (first['run'] or '').startswith('j'), 'Mod+Y from the mirror\'s current item opens the trail list with the focus on its newest row, never the × (rule 13)', {'opened': opened, 'first': first, 'focus': returned()})
    wheel_away('the trail list', in_list)
    press('Escape')
    f = returned()
    r.check(f['overlay'] is None and f['item'], 'Esc closes the trail list, and the focus, whose opener the rebuild removed, stands on the walk\'s current item — never lost, never to the top', f)
    in_box = 'window.__skep.leap.isOpen() && document.activeElement === document.getElementById("leapq")'
    opened = from_item()
    press('l', mods=('Meta',))
    r.check(opened and ctx.js(in_box), 'Mod+L from the mirror\'s current item opens the box, which takes the focus', {'opened': opened, 'focus': returned()})
    wheel_away('the box', in_box)
    press('Escape')
    f = returned()
    r.check(not f['leap'] and f['item'], 'Esc closes the box, and the focus, whose opener the rebuild removed, stands on the walk\'s current item — never lost, never to the top', f)
    # K-8 (rule 15): the selection's card takes NO focus — after Shift+↓ the focus stays on the mirror's item, and a plain ↓ walks on
    opened = from_item()
    press('ArrowDown', mods=('Shift',))
    one = ctx.js('({id: window.__skep.overlay().id, sel: window.__skep.selection(), held: document.getElementById("overlay").contains(document.activeElement), item: (() => { const e = document.activeElement; return !!e && e.id === "walk-" + window.__skep.mirror.index() && e.getAttribute("aria-selected") === "true"; })()})')
    r.check(opened and one['id'] == 'selection' and bool(one['sel']) and not one['held'] and one['item'],
            'Shift+↓ selects and its card takes NO focus: the focus stays on the mirror\'s current item (rule 15)', one)
    idx_before = ctx.js('window.__skep.mirror.index()')
    press('ArrowDown')
    after = ctx.js('({idx: window.__skep.mirror.index(), item: (() => { const e = document.activeElement; return !!e && e.id === "walk-" + window.__skep.mirror.index() && e.getAttribute("aria-selected") === "true"; })()})')
    r.check(after['idx'] == idx_before + 1 and after['item'], 'a plain ↓ after Shift+↓ walks on from the item the selection was made at', {'before': idx_before, 'after': after})
    ctx.esc()  # the selection the card stands on
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    # K-8, then Mod+Shift+O: the card held no focus, so the key-made act's answer takes the focus on its first act (rules 15, 16)
    opened = from_item()
    press('ArrowDown', mods=('Shift',))
    held_item = ctx.js('(() => { const e = document.activeElement; return !!e && e.id === "walk-" + window.__skep.mirror.index(); })()')
    press('O', mods=('Meta', 'Shift'))
    ctx.js('new Promise((res) => { const t0 = performance.now(); const tick = () => { const id = window.__skep.overlay().id || ""; return id === "provenance:wrote" || id.startsWith("face:") || performance.now() - t0 > 10000 ? res(true) : setTimeout(tick, 50); }; tick(); })')
    ctx.frames(2)
    asked = returned()
    answer_in = ctx.js('document.getElementById("overlay").contains(document.activeElement)')
    r.check(opened and held_item and (asked['overlay'] == 'provenance:wrote' or (asked['overlay'] or '').startswith('face:')) and answer_in,
            'K-8 leaves the focus on the item; Mod+Shift+O then opens the answer, which takes the focus on its first act (rules 15, 16)', dict(asked, answer_in=answer_in))
    press('Escape')
    f = returned()
    r.check(f['overlay'] is None and f['opener'] and f['item'], 'Esc closes the answer, and the focus returns to the item the selection was made at', dict(f, answer=asked))
    press('Escape')
    # K-8, then the person moves the focus to the corner (as Tab may): Esc closes the selection's card and leaves the focus where they put it (#33's clause)
    opened = from_item()
    press('ArrowDown', mods=('Shift',))
    carded = ctx.js('window.__skep.overlay().id === "selection"')
    moved = ctx.js('(() => { const c = document.querySelector(%s); if (c) c.focus({preventScroll: true}); return !!c && document.activeElement === c; })()' % json.dumps(corner))
    ctx.frames(1)
    press('Escape')
    f = at()
    r.check(opened and carded and moved and f['overlay'] is None and f['corner'] == DOC, 'K-8 from the item, then the person moves the focus to the corner: Esc closes the selection\'s card and leaves the focus on the corner, where the person put it (#33\'s clause)', dict(f, card=carded, moved=moved))
    press('Escape')
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    # ---- the ring's later stops (D5 §4 rule 5): a standing overlay after the plane and its corner; the scene in their place --
    # The ring runs the one line → the plane's stop → the focused document's corner → the standing overlays → the line.
    # While the reading scene stands, its stops take the place of the plane's and the corner's — pane, its corner, pane,
    # its corner, the scene's acts (K-61; issue #160) — and nothing it covers is in the ring. Its end returns the focus to the element it was opened from
    # (K-63); a navigation act from it moves the focus to the landing's element (rule 8).
    def stop():
        """the stop the platform's focus stands on, named by its region: the walk's current item or another of the mirror's,
        a corner, the overlay's dismiss or another of its controls, the one line, a scene's pane or its bar's acts, the body"""
        return ctx.js('''(() => { const e = document.activeElement;
          if (!e || e === document.body) return 'the body';
          if (e.closest('#mirror')) return e.id === 'walk-' + window.__skep.mirror.index() ? 'the item' : 'the mirror: ' + (e.id || e.tagName.toLowerCase());
          if (e.closest('#corners')) return 'the corner: ' + (e.dataset.corner || '');
          if (e.closest('#overlay')) return 'the overlay: ' + (e.dataset.x ? 'x' : e.dataset.run || e.tagName.toLowerCase());
          if (e.closest('#line')) return 'the line';
          if (e.id === 'sceneA' || e.id === 'sceneB') return 'pane ' + e.id.slice(-1);
          if (e.classList.contains('corner') && e.closest('#sceneA, #sceneB')) return 'pane ' + e.closest('#sceneA, #sceneB').id.slice(-1) + "'s corner";
          if (e.closest('#scenebar')) return 'the scene: ' + (e.dataset.relevel ? 're-level' : e.dataset.x ? 'x' : e.tagName.toLowerCase());
          if (e.closest('#scene')) return 'the scene: ' + (e.className || e.tagName.toLowerCase());
          return e.id || e.tagName.toLowerCase(); })()''')

    # a card shown without taking the focus — the gate's door, as a pointer shows it — at the landing, its corner standing
    ctx.leap(DOC, WINDOW[0])
    ctx.js('window.__skep.cards.links(%s)' % json.dumps(DOC))
    ctx.frames(2)
    line_stop = ctx.js('''(() => { const s = [...document.querySelectorAll('#line button:not([disabled]), #line [tabindex="0"]')].pop();
      if (s) s.focus({preventScroll: true}); return s && document.activeElement === s ? s.dataset.act || null : null; })()''')
    ctx.frames(1)
    ring = []
    for _ in range(3):
        press('Tab')
        ring.append(stop())
    r.check(line_stop is not None and ring[:2] == ['the item', 'the corner: ' + DOC] and ring[2].startswith('the overlay: ') and ring[2] != 'the overlay: x',
            'a standing card comes after the plane and its corner, and its FIRST stop is its first act, never the dismiss (rule 13): Tab reaches the item, the corner, then the card\'s first act', {'from': line_stop, 'ring': ring})
    press('Tab', mods=('Shift',))
    back = stop()
    r.check(back == 'the corner: ' + DOC, 'Shift+Tab from the card\'s first stop goes back to the corner', {'got': back})
    r.figures['ring'] = {'card_standing': [line_stop] + ring + [back]}
    ctx.esc()
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    # the scene opened from the mirror's current item: Tab once round the ring from the far end's pane
    opened = from_item()
    # the trail as the scene opens over its landing: the scene's own end is a Back onto it (issue #50)
    opened_over = ctx.js('(() => { const t = window.__skep.trail(); return {cursor: t.cursor, entries: t.entries.length}; })()')
    ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(DOC), json.dumps(WINDOW[2])))
    ctx.settle()
    ctx.frames(2)
    first = stop()
    r.check(opened and ctx.js('window.__skep.scene.isOpen()') and first == 'pane B', 'the scene opened from the mirror\'s current item puts the focus in the far end\'s pane', {'opened': opened, 'at': first})
    # nothing inside a pane's article is a control (SC; B1-S9: "read both…; scroll each"): a pane's article is what
    # assistive technology reads — never hidden from it as the plane's is — so a mark a press acts on nothing in must be
    # no button there; the first edition's pane carries the presence ⟡, links touching it. Each pane's corner is its one
    # stop beside it, a group named by its own words, which say what the pane shows (issue #160; D5 K-57)
    ax = ctx.drv.ax_tree()
    if 'error' in ax:
        r.figures['scene_ax'] = {'answered': False, 'error': ax['error']}
        r.note('the scene\'s panes: Accessibility.getFullAXTree did not answer: ' + ax['error'])
    else:
        nodes = ax.get('nodes', [])
        by_ax = {n['nodeId']: n for n in nodes}
        by_dom = {n['backendDOMNodeId']: n for n in nodes if 'backendDOMNodeId' in n}
        widgets = {'button', 'link', 'switch', 'checkbox', 'menuitem', 'tab', 'option', 'textbox', 'combobox'}
        inside, controls = 0, []
        for pane in ('#sceneA article.dtext', '#sceneB article.dtext'):
            todo = list((by_dom.get(backend(pane)) or {}).get('childIds', []))
            while todo:
                n = by_ax.get(todo.pop())
                if n is None:
                    continue
                inside += 1
                todo.extend(n.get('childIds', []))
                role = (n.get('role') or {}).get('value')
                focusable = any(p['name'] == 'focusable' and (p.get('value') or {}).get('value') for p in n.get('properties', []))
                if not n.get('ignored') and (role in widgets or focusable):
                    controls.append({'pane': pane, 'role': role, 'focusable': focusable, 'name': ((n.get('name') or {}).get('value') or '')[:40]})
        r.check(inside > 0 and not controls, 'the AX tree: nothing inside a scene\'s pane\'s article is a control or a stop — its marks are read, never pressed (SC)', {'nodes_inside': inside, 'controls': controls[:6]})
        corners = []
        for side in ('A', 'B'):
            sel = '#scene%s > .corner' % side
            node = by_dom.get(backend(sel)) or {}
            said = ctx.js('(() => { const e = document.querySelector(%s); return e ? {words: e.textContent, tab: e.getAttribute("tabindex")} : null; })()' % json.dumps(sel)) or {}
            name = (node.get('name') or {}).get('value') or ''
            corners.append({'pane': side, 'role': (node.get('role') or {}).get('value'), 'ignored': node.get('ignored'), 'name': name[:120], 'words': (said.get('words') or '')[:120], 'tab': said.get('tab'),
                            'named': bool(said.get('words')) and re.sub(r'\s+', '', name) == re.sub(r'\s+', '', said.get('words') or '')})
        r.check(all(c['role'] == 'group' and not c['ignored'] and c['named'] and c['tab'] == '0' for c in corners),
                'the AX tree: each pane\'s corner is a stop of its own, a group named by its own words, which say what the pane shows (issue #160)', corners)
        r.figures['scene_ax'] = {'answered': True, 'nodes_inside': inside, 'controls': len(controls), 'corners': corners}
    ring = []
    for _ in range(24):
        press('Tab')
        ring.append(stop())
        if ring[-1] == 'pane B':
            break
    under = [s for s in ring if s.startswith(('the item', 'the mirror', 'the corner'))]
    own = [s for s in ring if s.startswith(('pane ', 'the scene'))]
    r.check(ring[-1:] == ['pane B'] and not under, 'Tab from the far end\'s pane goes once round the ring and back to it, reaching nothing the scene covers — neither the mirror\'s item nor the plane\'s corner', {'ring': ring})
    r.check(own == ['pane B\'s corner', 'the scene: re-level', 'the scene: x', 'pane A', 'pane A\'s corner', 'pane B'] and ring[:3] == own[:3],
            'the scene\'s own stops in D5\'s order — pane, its corner, pane, its corner, the scene\'s acts (K-61; issue #160): from the far end\'s pane Tab reaches its corner, then the acts, and no stop lies inside a pane\'s article', {'scene_stops': own, 'ring': ring})
    r.figures['ring']['scene_from_pane_b'] = ring
    ring = []
    for _ in range(3):
        press('Tab', mods=('Shift',))
        ring.append(stop())
    r.check(ring == ['pane A\'s corner', 'pane A', 'the line'], 'Shift+Tab walks the ring back: from the far end\'s pane to the other\'s corner, the other pane, and from there to the one line', {'ring': ring})
    r.figures['ring']['scene_back_from_pane_b'] = ring
    ctx.js('document.getElementById("sceneB").focus({preventScroll: true})')
    ctx.frames(1)
    # the block holding the window run's first position: the landing the scenes below are opened over, where their Back lands
    blocks = ctx.js('window.__skep.model.doc(%s).blocks' % json.dumps(DOC))
    held = next((b['pos'] for b in blocks if b['pos'] <= WINDOW[0] < b['pos'] + b['width']), None)
    press('Escape')
    f, landed, now = returned(), ctx.js('window.__skep.view.focus()'), ctx.js('(() => { const t = window.__skep.trail(); return {cursor: t.cursor, entries: t.entries.length}; })()')
    r.check(not ctx.js('window.__skep.scene.isOpen()') and now == {'cursor': opened_over['cursor'], 'entries': opened_over['entries'] + 1} and f['item'] and bool(landed) and (landed['addr'], landed['pos']) == (DOC, held),
            'Esc ends the scene, a Back onto the entry it opened over, the scene\'s own entry standing ahead (issue #50), and the focus stands on the walk\'s item there in the rebuilt tree (K-63) — never lost, never to the top',
            dict(f, landed=landed, trail={'opened_over': opened_over, 'after': now}))
    # Mod+[ from a pane is the scene's Back too: it ends the scene on the entry it opened over, the focus on the landing's item
    opened = from_item()
    opened_over = ctx.js('(() => { const t = window.__skep.trail(); return {cursor: t.cursor, entries: t.entries.length}; })()')
    ctx.js('window.__skep.scene.open(%s, %s)' % (json.dumps(DOC), json.dumps(WINDOW[2])))
    ctx.settle()
    ctx.frames(2)
    in_pane = stop() == 'pane B'
    ctx.drv.key('[', code='BracketLeft', mods=('Meta',))
    ctx.settle()
    ctx.frames(2)
    f, landed, now = returned(), ctx.js('window.__skep.view.focus()'), ctx.js('(() => { const t = window.__skep.trail(); return {cursor: t.cursor, entries: t.entries.length}; })()')
    r.check(opened and in_pane and not ctx.js('window.__skep.scene.isOpen()') and now == {'cursor': opened_over['cursor'], 'entries': opened_over['entries'] + 1} and bool(landed) and (landed['addr'], landed['pos']) == (DOC, held) and f['item'],
            'Mod+[ from the scene\'s pane is its Back (issue #50): it ends the scene on the entry it opened over, the scene\'s own entry standing ahead, and the focus stands on the landing\'s item in the rebuilt tree (rule 8)',
            dict(f, landed=landed, in_pane=in_pane, trail={'opened_over': opened_over, 'after': now}))
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    # ---- the links card's overlay toggle: one switch (R60; B1-S4; WAI-ARIA's switch) --------------------------------
    # B1-S4's words, "others' links: ⟨state⟩ · ⟨n⟩ touch this document", are the switch's own. The words before the state
    # name it and the count after it describes it, so a press changes its checked state and nothing of its name or its
    # description: a name that carries the state says it twice, and changes under the press.
    toggle = '#overlay [data-run="others"]'
    words = lambda s: re.sub(r'^\W+|\W+$', '', re.sub(r'\s+', ' ', s or ''))  # whitespace folded, the separators at its ends dropped

    def switch():
        """the switch as the AX tree holds it — its role, name, description and checked state — or None where CDP does not answer"""
        ax = ctx.drv.ax_tree()
        if 'error' in ax:
            r.note('the others\' switch: Accessibility.getFullAXTree did not answer: ' + ax['error'])
            return None
        node = {n['backendDOMNodeId']: n for n in ax.get('nodes', []) if 'backendDOMNodeId' in n}.get(backend(toggle)) or {}
        props = {p['name']: p['value'] for p in node.get('properties', [])}
        return {'role': (node.get('role') or {}).get('value'), 'name': (node.get('name') or {}).get('value'),
                'description': (node.get('description') or {}).get('value'), 'checked': (props.get('checked') or {}).get('value')}

    def click(selector):
        """a person's press on the overlay's control: its rect read, the click dispatched at engine level, two frames"""
        centre = ctx.js('(() => { const b = document.querySelector(%s); if (!b) return null; const q = b.getBoundingClientRect(); return {x: q.left + q.width / 2, y: q.top + q.height / 2}; })()' % json.dumps(selector))
        if centre is not None:
            ctx.drv.mouse(centre['x'], centre['y'])
            ctx.frames(2)
        return centre is not None

    ctx.leap(DOC, WINDOW[0])
    ctx.js('window.__skep.cards.links(%s)' % json.dumps(DOC))
    ctx.frames(2)
    told = ctx.js('''(async () => { const n = window.__skep.links.othersTouching(%s).length; const {t} = await import("./strings.js");
      const [before, after] = t(n === 1 ? "B1.others-toggle.1" : "B1.others-toggle", {n}).split("⟨state⟩"); return {before, after}; })()''' % json.dumps(DOC))
    want = {'name': words(told['before']), 'description': words(told['after'])}
    off = switch()
    pressed = click(toggle)
    on = switch()
    # others' links off again before the card goes: its dismissal returns the chain to hidden and leaves the toggle as it stands
    click(toggle)
    ctx.esc()
    if off is None or on is None:
        r.figures['switch_ax'] = {'answered': False}
    else:
        r.check(off['role'] == 'switch' and off['checked'] == 'false' and off['name'] == want['name'] and off['description'] == want['description'],
                'the AX tree: the others\' switch, off, is named by B1-S4\'s words before its state and described by the count after it', {'want': want, 'got': off})
        r.check(pressed and on['checked'] == 'true' and [on[k] for k in ('role', 'name', 'description')] == [off[k] for k in ('role', 'name', 'description')],
                'the AX tree: a press turns the switch on and changes its checked state alone — its role, name and description stand', {'pressed': pressed, 'off': off, 'on': on})
        r.figures['switch_ax'] = {'answered': True, 'off': off, 'on': on}
    # ---- rule 10/12: a landing takes the platform's focus, the move its announcement (#105) ----------------------------
    ctx.leap(DOC, 1)
    ctx.leap(DOC, WINDOW[0])  # a back entry stands
    back_btn = ctx.js('(() => { const b = document.getElementById("line-back"); if (b && !b.disabled) { b.focus({preventScroll: true}); return document.activeElement === b; } return false; })()')
    press('Enter')
    f = at()
    landed = ctx.js('window.__skep.view.focus()')
    r.check(back_btn and f['id'] == 'walk-%d' % f['idx'] and f['sel'] == 'true' and bool(landed), 'rule 10/12: Enter on the line\'s ‹ back lands the platform\'s focus on the landing\'s item, never the body (#105)', dict(f, landed=landed))
    # a trail-list row opened by the POINTER: the row's click lands the focus on the item too (the ring out)
    ctx.js('window.__skep.cards.trailList()')  # the gate's door opens it as a pointer does: no focus taken
    ctx.frames(2)
    took = ctx.js('!document.getElementById("overlay").contains(document.activeElement)')
    row = ctx.js('(() => { const b = document.querySelector("#overlay [data-run^=\\"j\\"]"); if (!b) return null; const q = b.getBoundingClientRect(); return {x: q.left + q.width / 2, y: q.top + q.height / 2, run: b.dataset.run}; })()')
    if row:
        ctx.drv.mouse(row['x'], row['y'])
        ctx.settle()
        ctx.frames(2)
    f = at()
    r.check(bool(row) and took and f['overlay'] is None and f['id'] == 'walk-%d' % f['idx'] and f['sel'] == 'true', 'rule 16/10: a trail-list row opened by the pointer takes no focus, and the row\'s click lands the platform\'s focus on the item (#105, #106)', dict(f, row=row, pointer_opened_took_none=took))
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    # ---- rule 11: a control redrawn from state keeps the focus (#53, #100) --------------------------------------------
    ctx.leap(DOC, WINDOW[0])
    ctx.js('window.__skep.cards.links(%s)' % json.dumps(DOC))
    ctx.frames(2)
    lens = ctx.js('(() => { const b = document.querySelector("#overlay [data-run=endorsed]"); if (!b) return null; b.focus({preventScroll: true}); const q = b.getBoundingClientRect(); return {x: q.left + q.width / 2, y: q.top + q.height / 2}; })()')
    if lens:
        ctx.drv.mouse(lens['x'], lens['y'])
        ctx.frames(2)
    kept = ctx.js('(() => { const e = document.activeElement; return {run: e ? e.dataset.run : null, in_overlay: document.getElementById("overlay").contains(e)}; })()')
    r.check(bool(lens) and kept['in_overlay'] and kept['run'] == 'endorsed', 'rule 11: a lens press rebuilds the links card and leaves the focus on the same control, never the body (#53)', kept)
    # restore the lens: press endorsed again, so the card's dismissal leaves no lens filtering the document's shown links for the cases after
    if ctx.js('!!document.querySelector("#overlay [data-run=endorsed][aria-pressed=true]")'):
        b = ctx.js('(() => { const b = document.querySelector("#overlay [data-run=endorsed]"); if (!b) return null; const q = b.getBoundingClientRect(); return {x: q.left + q.width / 2, y: q.top + q.height / 2}; })()')
        if b:
            ctx.drv.mouse(b['x'], b['y'])
            ctx.frames(2)
    ctx.esc()
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    # the one line rebuilt while a control of it holds the focus (every frame of a flight, as the address changes): the focus is kept on its act's data-act, never dropped to the body (#100)
    ctx.leap(DOC, WINDOW[0])
    on_back = ctx.js('(() => { const b = document.getElementById("line-back"); if (b && !b.disabled) { b.focus({preventScroll: true}); window.__gateLineHTML = document.getElementById("line").innerHTML; return document.activeElement === b; } return false; })()')
    ctx.js('(() => { const c = window.__skep.view.camera(); window.__skep.view.set({x: c.x, y: c.y, scale: c.scale * 0.02}); })()')  # far: the address display changes, so the line's html does
    ctx.settle()
    ctx.frames(3)
    after = ctx.js('(() => { const e = document.activeElement, l = document.getElementById("line"); return {id: e ? e.id : null, act: e ? e.dataset.act : null, rebuilt: l.innerHTML !== window.__gateLineHTML}; })()')
    r.check(on_back and after['rebuilt'] and after['id'] == 'line-back' and after['act'] == 'back', 'rule 11: the one line rebuilt while ‹ back holds the focus keeps it there by its data-act, never to the body (#100)', after)
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    # ---- rule 16: a pointer act opens an overlay without the focus; a key-opened card lands on its first act (#106) ----
    # a click on the version statement opens the versions list but moves no focus into it
    ctx.leap(DOC, WINDOW[0])
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    stmt = ctx.js('(() => { const c = document.querySelector(%s); if (!c) return null; const q = c.getBoundingClientRect(); return {x: q.left + q.width / 2, y: q.top + q.height / 2}; })()' % json.dumps('#corners [data-corner="%s"] .version' % DOC))
    if stmt:
        ctx.drv.mouse(stmt['x'], stmt['y'])
        ctx.js('new Promise((res) => { const t0 = performance.now(); const tick = () => ((window.__skep.overlay().id || "").startsWith("versions:") || performance.now() - t0 > 10000 ? res(true) : setTimeout(tick, 50)); tick(); })')
        ctx.frames(2)
        moved = ctx.js('document.getElementById("overlay").contains(document.activeElement)')
        r.check((ctx.js('window.__skep.overlay().id') or '').startswith('versions:') and not moved, 'rule 16: a click on the version statement opens the versions list but moves no focus into it (#106)', {'overlay': ctx.js('window.__skep.overlay().id'), 'in_overlay': moved})
        ctx.esc()
    # Enter at a links-card row opens the anatomy card with the focus on its first act (a key-opened card, rule 13/16)
    ctx.leap(DOC, WINDOW[0])
    ctx.js('window.__skep.cards.links(%s)' % json.dumps(DOC))
    ctx.frames(2)
    rowsel = '#overlay [data-run^="row:"]'
    if ctx.js('!!document.querySelector(%s)' % json.dumps(rowsel)):
        ctx.js('document.querySelector(%s).focus({preventScroll: true})' % json.dumps(rowsel))
        press('Enter')
        ctx.js('new Promise((res) => { const t0 = performance.now(); const tick = () => ((window.__skep.overlay().id || "").startsWith("anatomy:") || performance.now() - t0 > 10000 ? res(true) : setTimeout(tick, 50)); tick(); })')
        ctx.frames(2)
        la = ctx.js('''(() => { const o = document.getElementById('overlay'), e = document.activeElement;
          return {id: window.__skep.overlay().id, first: o.contains(e) ? (e.dataset.run || (e.dataset.x ? 'x' : e.tagName.toLowerCase())) : null}; })()''')
        r.check((la['id'] or '').startswith('anatomy:') and bool(la['first']) and la['first'] != 'x', 'rule 16/13: Enter at a links-card row opens the anatomy card with the focus on its first act, never the × (#106)', la)
    ctx.esc()
    ctx.esc()
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    # ---- rule 13 and D5: Mod+Shift+L lands on the card's first act, and the dialog is named by its own caption ---------
    ctx.leap(DOC, WINDOW[0])
    ctx.js('document.getElementById("walk-" + window.__skep.mirror.index()).focus({preventScroll: true})')
    ctx.frames(1)
    press('L', mods=('Meta', 'Shift'))
    ctx.frames(2)
    links = ctx.js('''(() => { const o = document.getElementById('overlay'), e = document.activeElement;
      const by = o.getAttribute('aria-labelledby'), named = by ? document.getElementById(by) : null;
      return {id: window.__skep.overlay().id, first_run: o.contains(e) ? (e.dataset.run || (e.dataset.x ? 'x' : e.tagName.toLowerCase())) : null,
              labelledby: by, name: named ? (named.textContent || '').trim() : null, label: o.getAttribute('aria-label')}; })()''')
    r.check((links['id'] or '').startswith('links:') and links['first_run'] and links['first_run'] != 'x', 'rule 13: Mod+Shift+L opens the links card with the focus on its first act, never the × (#99)', links)
    r.check(bool(links['labelledby']) and bool(links['name']), 'D5: the overlay dialog is named by its own caption (aria-labelledby a non-empty element), #87, #112', links)
    ctx.esc()  # the links card
    ctx.esc()  # the selection Mod+Shift+L made first (the slot selects the focused block where none stands)
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    # ---- rule 18 / D2: the open LEAP box is the line's stop; Tab out of it closes it ----------------------------------
    ctx.leap(DOC, WINDOW[0])
    ctx.js('document.getElementById("walk-" + window.__skep.mirror.index()).focus({preventScroll: true})')
    ctx.frames(1)
    press('l', mods=('Meta',))
    box_open = ctx.js('window.__skep.leap.isOpen() && document.activeElement.id === "leapq"')
    z = ctx.js('(() => { const leap = parseInt(getComputedStyle(document.getElementById("leap")).zIndex) || 0, ov = parseInt(getComputedStyle(document.getElementById("overlay")).zIndex) || 0; return {leap, overlay: ov}; })()')
    press('Tab')
    f = at()
    r.check(box_open and not ctx.js('window.__skep.leap.isOpen()'), 'rule 18 / D2: Tab out of the open LEAP box closes it (#116)', {'box_open': box_open, 'still_open': ctx.js('window.__skep.leap.isOpen()'), 'landed': f})
    r.figures['leap_z'] = z
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    # ---- Back's light exposed (issue #152's design decision: "While lit, it is exposed to assistive technology"): the
    # window run carried to its source, then Mod+[ — the focus returned to the span holding the run's start, every span
    # item holding a stretch of the run marked aria-current="location" and no other item, none once the next act puts
    # the light out
    ctx.leap(DOC, WINDOW[0])
    ctx.js('window.__skep.go.leapTo(%s, null, %s)' % (json.dumps(WINDOW[2]), json.dumps({'carry': {'addr': DOC, 'pos': WINDOW[0], 'width': WINDOW[1]}})))
    ctx.settle()
    ctx.frames(2)
    ctx.drv.key('[', code='BracketLeft', mods=('Meta',))
    ctx.settle()
    ctx.frames(2)

    def located():
        """the mirror's items as the platform holds them: the focused one, the ones marked aria-current="location", and
        the ones standing on a stretch of the run carried — each span of the first edition holding one — by kind and place"""
        return ctx.js('''((addr, lo, hi) => { const e = document.activeElement, sib = window.__skep.mirror.siblings(), blocks = window.__skep.model.doc(addr).blocks;
          const holds = (n) => n.kind === 'block' && n.addr === addr && blocks.some((b) => b.pos === n.pos && b.pos < hi && lo < b.pos + b.width);
          const items = [...document.querySelectorAll('#mirror li[role="treeitem"]')].map((li) => ({...sib[Number(li.dataset.i)], current: li.getAttribute('aria-current'), focused: li === e}));
          return {focused: items.find((i) => i.focused) || null, marked: items.filter((i) => i.current === 'location').map((i) => [i.kind, i.pos]),
            owed: items.filter(holds).map((i) => [i.kind, i.pos])}; })(%s, %d, %d)''' % (json.dumps(DOC), WINDOW[0], WINDOW[0] + WINDOW[1]))
    lit = located()
    start = next((b['pos'] for b in ctx.js('window.__skep.model.doc(%s).blocks' % json.dumps(DOC)) if b['pos'] <= WINDOW[0] < b['pos'] + b['width']), None)
    f = lit['focused']
    r.check(bool(f) and (f['kind'], f['addr'], f['pos']) == ('block', DOC, start) and f['current'] == 'location' and bool(lit['marked']) and lit['marked'] == lit['owed'],
            'Mod+[ from the carry\'s landing returns the focus to the span holding the run\'s start, and every span item holding a stretch of the run, and no other item, is marked aria-current="location" (issue #152)', dict(lit, start=start))
    ctx.leap(DOC, WINDOW[0])
    out = located()
    r.check(not out['marked'], 'the next act puts Back\'s light out: no item marked aria-current="location"', out)
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    # ---- a landing's line as the description of the item the focus lands on (issue #153's design decision: "Focus lands on
    # the first held piece or landing point, the line as its description, so the screen-reader mirror says all four states"):
    # a passage straddling the window run's start carried into the draft, which holds the run's half of it alone — the focus
    # on the mirror's item at the first held piece, its accessible description the line's words; none once the next act
    # takes the line down
    ctx.js('window.__skep.go.leapTo(%s, null, %s)' % (json.dumps(WINDOW[2]), json.dumps({'carry': {'addr': DOC, 'pos': WINDOW[0] - 8, 'width': 16}})))
    ctx.settle()
    ctx.frames(3)

    def described():
        """the item the platform's focus stands on, the element its `aria-describedby` names and that element's words, every
        item described, and what the landing says"""
        return ctx.js('''(() => { const e = document.activeElement, sib = window.__skep.mirror.siblings();
          const by = e && e.getAttribute ? e.getAttribute('aria-describedby') : null, d = by ? document.getElementById(by) : null;
          const items = [...document.querySelectorAll('#mirror li[role="treeitem"][aria-describedby]')].map((li) => ({...sib[Number(li.dataset.i)]}));
          return {focused: e && e.closest && e.closest('#mirror') ? {...sib[Number(e.dataset.i)]} : null, by, words: d ? d.textContent : null,
                  hidden: !!d && d.hidden, items: items.map((i) => [i.kind, i.pos]), said: window.__skep.go.described(), line: window.__skep.landingLine()}; })()''')
    d = described()
    f = d['focused']
    r.check(bool(f) and f['addr'] == WINDOW[2] and bool(d['said']) and d['by'] == 'walk-landing' and d['hidden'] and d['words'] == d['said']['words'] and bool(d['line']) and d['line']['words'] == d['words'] and len(d['items']) == 1,
            'a landing the draft holds part of: the focus on its item, described by the line\'s words — the one item described (issue #153)', d)
    ctx.leap(DOC, WINDOW[0])
    gone = described()
    r.check(not gone['items'] and gone['said'] is None, 'the next landing takes the description down with the line', gone)
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    # ---- each run's item carries its label (issue #158): two typed lines of the first edition's own bytes, their first lines in
    # one column RUNS_APART_LINES body lines apart or more, landed in through the gate's door naming the runs and the passage
    # they hold by identity; the focus on piece 1's item, its description the line's words, piece 2's item described by its own
    # label; Mod+G: the focus on piece 2's item, the line's words its description then
    paras = [b for b in ctx.js('window.__skep.model.doc(%s).blocks' % json.dumps(DOC)) if b['kind'] == 'para' and b['width'] > 24 and b['pos'] + 12 < WINDOW[0]]
    fs = ctx.js('window.__skep.fold(%s).fs' % json.dumps(DOC))
    lined = [(b, ctx.js('window.__skep.centreOf(%s, %d)' % (json.dumps(DOC), b['pos']))) for b in paras]
    apart = next((b for b, c in lined[1:] if abs(c['x'] - lined[0][1]['x']) < 1e-6 and c['y'] - lined[0][1]['y'] >= RUNS_APART_LINES * LINE_RATIO * fs), None) if lined else None
    runs = [{'pos': paras[0]['pos'], 'width': 12}, {'pos': apart['pos'], 'width': 12}] if apart else []
    ids = [ctx.js('window.__skep.model.identity(%s, %d, %d)' % (json.dumps(DOC), x['pos'], x['width'])) or [] for x in runs]
    one = bool(runs) and all(ids) and len({i['prefix'] for xs in ids for i in xs}) == 1
    passage = {'prefix': ids[0][0]['prefix'], 'ordinal': ids[0][0]['ordinal'], 'width': ids[1][-1]['ordinal'] + ids[1][-1]['width'] - ids[0][0]['ordinal']} if one else None
    r.check(passage is not None, 'two typed lines of the first edition\'s own bytes, their first lines apart in one column, by identity', {'runs': runs})
    if passage is not None:
        ctx.js('window.__skep.go.leapTo(%s, %d, %s)' % (json.dumps(DOC), runs[0]['pos'], json.dumps({'runs': runs, 'passage': passage})))
        ctx.settle()
        ctx.frames(3)

        def pieces():
            """the item the focus stands on, and each item described with the words of every description it names"""
            return ctx.js('''(() => { const e = document.activeElement, sib = window.__skep.mirror.siblings();
              const items = [...document.querySelectorAll('#mirror li[role="treeitem"][aria-describedby]')].map((li) => ({pos: sib[Number(li.dataset.i)].pos,
                words: li.getAttribute('aria-describedby').split(' ').map((id) => (document.getElementById(id) || {}).textContent)}));
              return {focused: e && e.closest && e.closest('#mirror') ? sib[Number(e.dataset.i)].pos : null, items, line: (window.__skep.landingLine() || {}).words}; })()''')
        label = ctx.js('import("./strings.js").then(({t}) => [t("L.piece", {k: 1, n: 2}), t("L.piece", {k: 2, n: 2})])')
        p = pieces()
        r.check(p['focused'] == runs[0]['pos'] and sorted(p['items'], key=lambda i: i['pos']) == [{'pos': runs[0]['pos'], 'words': [p['line']]}, {'pos': runs[1]['pos'], 'words': [label[1]]}],
                'a landing in two runs: the focus on piece 1\'s item, described by the line\'s words, and piece 2\'s item by its own label, "%s" (issue #158)' % label[1], dict(p, runs=runs))
        ctx.drv.key('g', mods=('Meta',))
        ctx.settle()
        ctx.frames(3)
        q = pieces()
        r.check(q['focused'] == runs[1]['pos'] and sorted(q['items'], key=lambda i: i['pos']) == [{'pos': runs[0]['pos'], 'words': [label[0]]}, {'pos': runs[1]['pos'], 'words': [q['line']]}] and q['line'] != p['line'],
                'Mod+G: the focus on piece 2\'s item, the line\'s words its description now, piece 1\'s item its own label (issue #158)', q)
        r.figures['pieces_described'] = {'landing': p, 'stepped': q}
        ctx.leap(DOC, WINDOW[0])
        ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
        ctx.frames(1)
    # ---- the mirror names a box once, by the version it shows (issue #154's design decision: "The box shows one version"):
    # a LEAP to version 1's address pins the box there; zoomed out to mid over it, the mirror's documents list the box once,
    # its current item, named by the version's address and the version's own first line (issue #23: the label's first line
    # is "a pinned version's own")
    member = VERSIONED + '.1'
    ctx.leap(member)
    zooms = 0
    while zooms < 12 and ctx.js('window.__skep.view.lod().name') != 'mid':
        ctx.drv.key('-', code='Minus', mods=('Meta',))
        ctx.settle()
        ctx.frames(2)
        zooms += 1
    ctx.frames(2)
    listed = ctx.js('''((a) => [...document.querySelectorAll('#mirror [role=treeitem]')].map((li) => ({text: li.textContent, current: li.getAttribute('aria-selected') === 'true'}))
      .filter((i) => i.text.startsWith('document ' + a + ',') || i.text.startsWith('document ' + a + '.')))(%s)''' % json.dumps(VERSIONED))
    label = ctx.js('window.__skep.firstLine(%s).first' % json.dumps(member))
    r.check(len(listed) == 1 and listed[0]['current'] and listed[0]['text'].startswith('document %s, %s,' % (member, '"%s"' % label if label else '')),
            'at mid over a box pinned to version 1 the mirror lists the box once, its current item, named by the version\'s address and that version\'s own first line, as its box\'s label names it (issues #154, #23)',
            {'listed': [dict(i, text=i['text'][:120]) for i in listed], 'zooms': zooms, 'label': label})
    r.figures['pinned_box'] = {'zooms': zooms, 'listed': [i['text'][:120] for i in listed]}
    ctx.leap(VERSIONED, None)
    # ---- an item that holds no text is announced by its kind (issue #161's design decision): at the claimant's home document,
    # the walk on its key record, the mirror's item names it by the words a copy's stand-in names it by, then what the plane
    # shows of it — its words and its keys line, read from the mounted article — and never its raw value
    ctx.leap(HOME, 1)
    words = item_words(ctx)
    rec = ctx.js('''((a) => { const e = document.querySelector(`#domlayer article.dtext[data-addr="${a}"] .sp.blk-atom`), q = (s) => { const x = e && e.querySelector(s); return x ? x.textContent : null; };
      const i = window.__skep.mirror.index(), li = document.getElementById('walk-' + i), f = window.__skep.view.focus();
      return {words: q('.rec-words'), keys: q('.derived'), item: window.__skep.mirror.item(i), dom: li ? li.textContent : null, focus: f && {kind: f.kind, addr: f.addr, pos: f.pos}}; })(%s)''' % json.dumps(HOME))
    item = rec['item'] or ''
    r.check(rec['focus'] == {'kind': 'block', 'addr': HOME, 'pos': 1} and item.startswith(words['record'] + ' at position 1 ') and bool(rec['words']) and rec['words'] in item
            and bool(rec['keys']) and rec['keys'] in item and rec['dom'] == item,
            'the mirror\'s item at the claimant\'s key record names its kind, "%s" — the words a copy\'s stand-in names it by — then what the plane shows of it, its words and its keys, and the DOM item says the same (issue #161; R94)' % words['record'],
            dict(rec, item=item[:300]))
    r.check(bool(item) and not re.search(r'[{}]|skep-enroll|[0-9a-f]{64}', item), 'the record\'s item reads no raw value aloud: no JSON, no key\'s hex', item[:300])
    r.figures['record_item'] = item[:300]
    # leave the page as the case found it: the landing, the focus on no element
    ctx.leap(DOC, WINDOW[0])
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    return r.out()
