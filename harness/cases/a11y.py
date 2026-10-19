"""A11Y — class 7 (the structure record §6.3; T3 (7)): the ARIA mirror is the
one accessible rendering at span grain — its names and set sizes
(`aria-level`, `aria-posinset`, `aria-setsize`, `aria-selected`), the live
region announcing the focus on a keyboard act; the AX tree
(`Accessibility.getFullAXTree`) compared where CDP answers it, else reported
as not answered. Never a screen reader's voice — the seat's."""
import json

from . import DOC, WINDOW, Result


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
    return r.out()
