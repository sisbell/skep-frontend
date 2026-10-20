"""A11Y — class 7 (the structure record §6.3; T3 (7)): the ARIA mirror is the
one accessible rendering at span grain — its names and set sizes
(`aria-level`, `aria-posinset`, `aria-setsize`, `aria-selected`), the live
region announcing the focus on a keyboard act; the AX tree
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
current item; the links card's overlay toggle a switch in the AX tree (R60;
WAI-ARIA's switch) — named by B1-S4's words before its state and described
by the count after it, a press changing its checked state and neither its
name nor its description. Never a screen reader's voice — the seat's."""
import json
import re

from . import DOC, FAR_LEAP, WINDOW, Result

NO_MATCH = 'qzx no label holds this'  # text no address, share form, URL, label or address prefix answers


def run(ctx):
    r = Result()
    ctx.leap(DOC, WINDOW[0])
    size = ctx.js('window.__skep.mirror.size()')
    idx = ctx.js('window.__skep.mirror.index()')
    doc = ctx.js('window.__skep.model.doc(%s)' % json.dumps(DOC))
    shown = ctx.js('window.__skep.links.shown(%s)' % json.dumps(DOC))
    r.check(size == len(doc['blocks']) + len(shown), 'the mirror\'s set is the document\'s blocks and drawn links', {'size': size, 'blocks': len(doc['blocks']), 'links': len(shown)})
    items = ctx.js('''[...document.querySelectorAll('#mirror [role=treeitem]')].map(li => ({id: li.id, level: li.getAttribute('aria-level'), pos: li.getAttribute('aria-posinset'), size: li.getAttribute('aria-setsize'), sel: li.getAttribute('aria-selected'), tab: li.getAttribute('tabindex'), text: li.textContent}))''')
    r.check(len(items) >= 1, 'the mirror renders treeitems', len(items))
    r.check(all(int(i['size']) == size for i in items), 'every item\'s aria-setsize is the set\'s size', {i['pos']: i['size'] for i in items if int(i['size']) != size})
    r.check(all(i['level'] == '4' for i in items), 'the items at span grain are level 4 (board › account › document › span)', sorted({i['level'] for i in items}))
    r.check(sum(1 for i in items if i['sel'] == 'true') == 1, 'exactly one item is selected', sum(1 for i in items if i['sel'] == 'true'))
    r.check(sum(1 for i in items if i['tab'] == '0') == 1, 'exactly one item is in the tab order (roving tabindex)', sum(1 for i in items if i['tab'] == '0'))
    bad = []
    for i in items:
        want = ctx.js('window.__skep.mirror.item(%d)' % (int(i['pos']) - 1))
        if i['text'] != want:
            bad.append({'pos': i['pos'], 'dom': i['text'][:80], 'model': (want or '')[:80]})
    r.check(not bad, 'each DOM item\'s name equals the model\'s item name (one accessible rendering)', bad)
    roles = ctx.js('({mirror: document.getElementById("mirror").getAttribute("role"), label: document.getElementById("mirror").getAttribute("aria-label"), live: document.getElementById("live").getAttribute("aria-live"), hidden_layer: document.getElementById("domlayer").getAttribute("aria-hidden")})')
    r.check(roles['mirror'] == 'tree' and roles['live'] == 'polite' and roles['hidden_layer'] == 'true', 'the mirror is a tree, the live region polite, the visual text layer hidden from AT', roles)
    # a keyboard act announces the focus
    ctx.drv.key('ArrowDown')
    ctx.settle()
    ctx.frames(2)
    idx2 = ctx.js('window.__skep.mirror.index()')
    live = ctx.js('document.getElementById("live").textContent')
    want = ctx.js('window.__skep.mirror.item(window.__skep.mirror.index())')
    r.check(idx2 == min(size - 1, idx + 1), 'ArrowDown moves the focus to the next sibling', {'before': idx, 'after': idx2})
    r.check(live == want, 'the live region announces the focused item\'s name', {'live': (live or '')[:100], 'item': (want or '')[:100]})
    ctx.drv.key('ArrowUp')
    ctx.settle()
    # the names: a span's name carries its position, its document and its text; a link's its type and far end
    names = [ctx.js('window.__skep.mirror.item(%d)' % i) for i in range(size)]
    r.check(all(n.startswith('span at position ') or n.startswith('withheld run') or n.startswith('link ') for n in names), 'every name opens with its kind', [n[:40] for n in names if not (n.startswith('span at position ') or n.startswith('link '))])
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
        words = ctx.js('(() => { const e = document.querySelector(%s); return e ? e.textContent : null; })()' % json.dumps(corner)) or ''
        ax_role, ax_name = (node.get('role') or {}).get('value'), (node.get('name') or {}).get('value') or ''
        r.check(bool(node) and not node.get('ignored') and ax_role == 'group' and re.sub(r'\s+', '', ax_name) == re.sub(r'\s+', '', words) and words.strip() != '',
                'the AX tree: the focused corner is a group, not hidden, named by its own words', {'ignored': node.get('ignored'), 'role': ax_role, 'name': ax_name[:120], 'words': words[:120]})
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
    r.check(f['overlay'] == 'versions:' + DOC and f['in_overlay'], 'Enter at the corner takes its act: the versions list stands with the focus inside it', f)
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
    # leave the page as the case found it: the landing, the focus on no element
    ctx.leap(DOC, WINDOW[0])
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    return r.out()
