"""A11Y — class 7 (the structure record §6.3; T3 (7)): the ARIA mirror is the
one accessible rendering at span grain — its names and set sizes
(`aria-level`, `aria-posinset`, `aria-setsize`, `aria-selected`), the live
region announcing the focus on a keyboard act; the AX tree
(`Accessibility.getFullAXTree`) compared where CDP answers it, else reported
as not answered; the platform's focus carried by the mirror's rebuild to the
current item — under the walk keys and under a LEAP's landing — with the
panel scrolled so the focused item is a row the panel shows (D5 §4 rules 2,
4 and 8). Never a screen reader's voice — the seat's."""
import json

from . import DOC, FAR_LEAP, WINDOW, Result


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
        import re
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
    # leave the page as the case found it: the landing, the focus on no element
    ctx.leap(DOC, WINDOW[0])
    ctx.js('(() => { const e = document.activeElement; if (e && e.blur) e.blur(); })()')
    ctx.frames(1)
    return r.out()
