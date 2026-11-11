// A small DOM under `web/test/`, never imported by the page, for the pure
// tests that make a pointer's gesture through APP-INPUT's handlers: elements
// and text nodes in a tree, built from the markup the page sets (`innerHTML`,
// the page's own escaping undone), the selectors the page reads them by (tag,
// class, attribute, `:scope`, `:not`, the child and descendant combinators,
// lists), boundary points compared in tree order, ranges over them, a tree
// walker of text nodes, the one selection the platform holds — so a test
// can stand in for the platform's selection over a mounted article's text,
// placing it where a drag, a double-click's word or a Shift+click would, and
// T-LAYER's mapping reads it as it reads the platform's — and the document's
// one focus, which an element takes, taking away a selection standing outside
// it where a test asks it to, as a WebKit engine's does. Nothing is laid out:
// every box is empty, and a screen point names a boundary point or an element
// only where a test says which (`DomDocument.pointAt`, `elementAt`). `page`
// makes one, its window, its document and each element recording the
// listeners added to them.

const ELEMENT_NODE = 1, TEXT_NODE = 3, DOCUMENT_NODE = 9, DOCUMENT_FRAGMENT_NODE = 11;
/** the elements that hold no children and take no closing tag */
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
/** an empty box: what every layout reading answers */
const EMPTY = Object.freeze({ x: 0, y: 0, left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 });

/** a node of the tree: its children in order, its parent */
class DomNode {
  /** @param {number} type */
  constructor(type) {
    this.nodeType = type;
    /** @type {DomNode | null} */
    this.parentNode = null;
    /** @type {DomNode[]} */
    this.childNodes = [];
    /** @type {DomDocument | null} */
    this.ownerDocument = null;
  }
  get parentElement() { return this.parentNode && this.parentNode.nodeType === ELEMENT_NODE ? /** @type {DomElement} */ (this.parentNode) : null; }
  get firstChild() { return this.childNodes[0] || null; }
  get lastChild() { return this.childNodes[this.childNodes.length - 1] || null; }
  get nextSibling() { const p = this.parentNode; return p ? p.childNodes[p.childNodes.indexOf(this) + 1] || null : null; }
  get previousSibling() { const p = this.parentNode; return p ? p.childNodes[p.childNodes.indexOf(this) - 1] || null : null; }
  get isConnected() { let n = /** @type {DomNode} */ (this); while (n.parentNode) n = n.parentNode; return n.nodeType === DOCUMENT_NODE; }
  get textContent() { return this.childNodes.map((c) => c.textContent).join(''); }
  /** @param {DomNode | null} n */
  contains(n) { for (let x = n; x; x = x.parentNode) if (x === this) return true; return false; }
  /** @param {DomNode} c */
  appendChild(c) { return this.insertBefore(c, null); }
  /** @param {DomNode} c @param {DomNode | null} ref */
  insertBefore(c, ref) {
    const kids = c.nodeType === DOCUMENT_FRAGMENT_NODE ? [...c.childNodes] : [c];
    for (const k of kids) { if (k.parentNode) k.parentNode.removeChild(k); }
    let at = ref ? this.childNodes.indexOf(ref) : this.childNodes.length;
    if (at < 0) at = this.childNodes.length;
    for (const k of kids) { this.childNodes.splice(at++, 0, k); k.parentNode = this; }
    return c;
  }
  /** @param {DomNode} c */
  removeChild(c) { const i = this.childNodes.indexOf(c); if (i >= 0) { this.childNodes.splice(i, 1); c.parentNode = null; } return c; }
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
  /** adjacent text nodes joined and empty ones taken out, as the platform's own `normalize` does, the selection's points carried */
  normalize() {
    for (let i = 0; i < this.childNodes.length; i++) {
      const c = this.childNodes[i];
      if (c.nodeType === ELEMENT_NODE) { c.normalize(); continue; }
      if (c.nodeType !== TEXT_NODE) continue;
      const t = /** @type {DomText} */ (c);
      while (this.childNodes[i + 1] && this.childNodes[i + 1].nodeType === TEXT_NODE) {
        const next = /** @type {DomText} */ (this.childNodes[i + 1]), doc = this.ownerDocument;
        if (doc) doc.selection.joined(next, t, t.data.length);
        t.data += next.data;
        this.removeChild(next);
      }
    }
  }
  getBoundingClientRect() { return { ...EMPTY }; }
  getClientRects() { return []; }
}

/** a text node */
class DomText extends DomNode {
  /** @param {string} data */
  constructor(data) { super(TEXT_NODE); this.data = data; }
  get length() { return this.data.length; }
  get textContent() { return this.data; }
  get nodeValue() { return this.data; }
  /** @param {boolean} [_deep] */
  cloneNode(_deep) { const t = new DomText(this.data); t.ownerDocument = this.ownerDocument; return t; }
}

/** a document fragment: the parser's root, and what a range's contents are cloned into */
class DomFragment extends DomNode {
  constructor() { super(DOCUMENT_FRAGMENT_NODE); }
  get children() { return /** @type {DomElement[]} */ (this.childNodes.filter((c) => c.nodeType === ELEMENT_NODE)); }
  get firstElementChild() { return this.children[0] || null; }
  /** @param {string} sel */
  querySelectorAll(sel) { return all(this, sel, null); }
  /** @param {string} sel */
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
}

/** an element: its attributes, its classes and data set read from them, a style of plain properties */
class DomElement extends DomNode {
  /** @param {string} tag */
  constructor(tag) {
    super(ELEMENT_NODE);
    this.localName = tag.toLowerCase();
    this.tagName = this.localName.toUpperCase();
    /** @type {Map<string, string>} */
    this.attrs = new Map();
    /** @type {Record<string, string>} */
    this.style = /** @type {any} */ ({ setProperty(/** @type {string} */ k, /** @type {string} */ v) { this[k] = v; } });
    this.clientWidth = 0; this.clientHeight = 0; this.offsetWidth = 0; this.offsetHeight = 0;
    this.tabIndex = -1;
    /** @type {Map<string, Array<(e: unknown) => void>>} the listeners added to it, by event */
    this.listeners = new Map();
    const el = this, kebab = (/** @type {string} */ k) => 'data-' + k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
    /** @type {Record<string, string>} */
    this.dataset = /** @type {any} */ (new Proxy({}, {
      get: (_, k) => (typeof k === 'string' ? el.attrs.get(kebab(k)) : undefined),
      set: (_, k, v) => { if (typeof k === 'string') el.attrs.set(kebab(k), String(v)); return true; },
      has: (_, k) => typeof k === 'string' && el.attrs.has(kebab(k)),
      deleteProperty: (_, k) => { if (typeof k === 'string') el.attrs.delete(kebab(k)); return true; },
      ownKeys: () => [...el.attrs.keys()].filter((a) => a.startsWith('data-')).map((a) => a.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase())),
      getOwnPropertyDescriptor: (_, k) => (typeof k === 'string' && el.attrs.has(kebab(k)) ? { value: el.attrs.get(kebab(k)), writable: true, enumerable: true, configurable: true } : undefined),
    }));
    this.classList = {
      contains: (/** @type {string} */ c) => el.classes().includes(c),
      add: (/** @type {string[]} */ ...cs) => { for (const c of cs) if (!el.classes().includes(c)) el.className = [...el.classes(), c].join(' '); },
      remove: (/** @type {string[]} */ ...cs) => { el.className = el.classes().filter((c) => !cs.includes(c)).join(' '); },
      toggle: (/** @type {string} */ c, /** @type {boolean} */ on) => { const now = on === undefined ? !el.classes().includes(c) : on; if (now) el.classList.add(c); else el.classList.remove(c); return now; },
    };
  }
  /** @returns {string[]} */
  classes() { return (this.attrs.get('class') || '').split(/\s+/).filter(Boolean); }
  get className() { return this.attrs.get('class') || ''; }
  set className(v) { this.attrs.set('class', String(v)); }
  get id() { return this.attrs.get('id') || ''; }
  set id(v) { this.attrs.set('id', String(v)); }
  get children() { return /** @type {DomElement[]} */ (this.childNodes.filter((c) => c.nodeType === ELEMENT_NODE)); }
  get firstElementChild() { return this.children[0] || null; }
  get lastElementChild() { const k = this.children; return k[k.length - 1] || null; }
  /** @param {string} k @param {unknown} v */
  setAttribute(k, v) { this.attrs.set(k.toLowerCase(), String(v)); }
  /** @param {string} k */
  getAttribute(k) { return this.attrs.has(k.toLowerCase()) ? /** @type {string} */ (this.attrs.get(k.toLowerCase())) : null; }
  /** @param {string} k */
  hasAttribute(k) { return this.attrs.has(k.toLowerCase()); }
  /** @param {string} k */
  removeAttribute(k) { this.attrs.delete(k.toLowerCase()); }
  get innerHTML() { return this.childNodes.map(markupOf).join(''); }
  set innerHTML(html) {
    for (const c of [...this.childNodes]) this.removeChild(c);
    this.appendChild(parse(String(html), this.ownerDocument));
  }
  get textContent() { return super.textContent; }
  set textContent(v) { for (const c of [...this.childNodes]) this.removeChild(c); const t = new DomText(String(v)); t.ownerDocument = this.ownerDocument; this.appendChild(t); }
  /** @param {string} sel */
  matches(sel) { return listOf(sel).some((s) => matchComplex(this, s, null)); }
  /** @param {string} sel */
  closest(sel) { for (let e = /** @type {DomElement | null} */ (this); e; e = e.parentElement) if (e.matches(sel)) return e; return null; }
  /** @param {string} sel */
  querySelectorAll(sel) { return all(this, sel, this); }
  /** @param {string} sel */
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
  /** @param {boolean} [deep] */
  cloneNode(deep) {
    const e = new DomElement(this.localName);
    e.ownerDocument = this.ownerDocument;
    for (const [k, v] of this.attrs) e.attrs.set(k, v);
    if (deep) for (const c of this.childNodes) e.appendChild(/** @type {DomElement | DomText} */ (c).cloneNode(true));
    return e;
  }
  /** @param {string} type @param {(e: unknown) => void} fn */
  addEventListener(type, fn) { (this.listeners.get(type) || this.listeners.set(type, []).get(type) || []).push(fn); }
  removeEventListener() {}
  /** each listener added for an event run with the event given, as the platform delivers it */
  fire(/** @type {string} */ type, /** @type {unknown} */ e) { for (const fn of this.listeners.get(type) || []) fn(e); }
  /** the document's focus moved to this element; where the document clears a selection outside it as the focus moves (`DomDocument.focusClears`), that selection taken away first */
  focus() {
    const doc = this.ownerDocument;
    if (!doc) return;
    const r = doc.selection.range;
    if (doc.focusClears && r && !this.contains(r.commonAncestorContainer)) doc.selection.removeAllRanges();
    doc.activeElement = this;
  }
  /** the document's focus taken off this element, onto the body */
  blur() { const doc = this.ownerDocument; if (doc && doc.activeElement === this) doc.activeElement = doc.body; }
}

/** the markup of a node, its text escaped as the page's own escaping writes it */
function markupOf(/** @type {DomNode} */ n) {
  if (n.nodeType === TEXT_NODE) return escape(/** @type {DomText} */ (n).data);
  if (n.nodeType !== ELEMENT_NODE) return n.childNodes.map(markupOf).join('');
  const e = /** @type {DomElement} */ (n), attrs = [...e.attrs].map(([k, v]) => ` ${k}="${escape(v)}"`).join('');
  return VOID.has(e.localName) ? `<${e.localName}${attrs}>` : `<${e.localName}${attrs}>${e.childNodes.map(markupOf).join('')}</${e.localName}>`;
}

const escape = (/** @type {string} */ s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unescape = (/** @type {string} */ s) => s.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (_, e) => {
  const k = e.toLowerCase();
  return k === 'amp' ? '&' : k === 'lt' ? '<' : k === 'gt' ? '>' : k === 'quot' ? '"' : k === 'apos' ? "'" : k === 'nbsp' ? ' ' : String.fromCodePoint(k[1] === 'x' ? parseInt(k.slice(2), 16) : parseInt(k.slice(1), 10));
});

/** markup parsed into a fragment: tags, their quoted attributes, text, the void elements unclosed */
function parse(/** @type {string} */ html, /** @type {DomDocument | null} */ doc) {
  const root = new DomFragment();
  /** @type {DomNode} */
  let at = root;
  const tok = /<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)((?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|([^<]+)/g;
  for (const m of html.matchAll(tok)) {
    if (m[1]) { for (let e = /** @type {DomNode | null} */ (at); e && e !== root; e = e.parentNode) if (/** @type {DomElement} */ (e).localName === m[1].toLowerCase()) { at = /** @type {DomNode} */ (e.parentNode); break; } continue; }
    if (m[2]) {
      const e = new DomElement(m[2]);
      e.ownerDocument = doc;
      for (const a of (m[3] || '').matchAll(/([^\s=>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) e.attrs.set(a[1].toLowerCase(), unescape(a[2] ?? a[3] ?? a[4] ?? ''));
      at.appendChild(e);
      if (!VOID.has(e.localName) && !m[4]) at = e;
      continue;
    }
    const t = new DomText(unescape(m[5]));
    t.ownerDocument = doc;
    at.appendChild(t);
  }
  return root;
}

/**
 * @typedef {Object} Compound — one compound of a selector: a tag, classes, attributes, `:scope`, `:not` of compounds
 * @property {string | null} tag
 * @property {string | null} id
 * @property {string[]} classes
 * @property {Array<{name: string, value: string | null}>} attrs
 * @property {boolean} scope
 * @property {Compound[]} not
 */
/** @typedef {{compounds: Compound[], combinators: string[]}} Complex a selector: its compounds left to right, each joined to the next by a descendant (' ') or a child ('>') combinator */

/** the selectors of a list, split at its top-level commas */
function listOf(/** @type {string} */ sel) {
  /** @type {string[]} */
  const parts = [];
  let depth = 0, from = 0;
  for (let i = 0; i < sel.length; i++) {
    const c = sel[i];
    if (c === '(' || c === '[') depth++;
    else if (c === ')' || c === ']') depth--;
    else if (c === ',' && depth === 0) { parts.push(sel.slice(from, i)); from = i + 1; }
  }
  parts.push(sel.slice(from));
  return parts.map((p) => complexOf(p.trim()));
}

/** a selector parsed into its compounds and combinators */
function complexOf(/** @type {string} */ sel) {
  /** @type {Complex} */
  const out = { compounds: [], combinators: [] };
  let i = 0, pending = '';
  while (i < sel.length) {
    if (/\s/.test(sel[i])) { while (i < sel.length && /\s/.test(sel[i])) i++; if (!pending) pending = ' '; continue; }
    if (sel[i] === '>') { pending = '>'; i++; continue; }
    const [c, next] = compoundAt(sel, i);
    if (out.compounds.length) out.combinators.push(pending || ' ');
    out.compounds.push(c);
    pending = '';
    i = next;
  }
  return out;
}

/** a compound read from a selector at `i`, and the index past it */
function compoundAt(/** @type {string} */ sel, /** @type {number} */ i) {
  /** @type {Compound} */
  const c = { tag: null, id: null, classes: [], attrs: [], scope: false, not: [] };
  const name = /^[a-zA-Z*][\w-]*/.exec(sel.slice(i));
  if (name) { c.tag = name[0] === '*' ? null : name[0].toLowerCase(); i += name[0].length; }
  while (i < sel.length && !/[\s>,]/.test(sel[i])) {
    if (sel[i] === '.') { const m = /^\.([\w-]+)/.exec(sel.slice(i)); if (!m) break; c.classes.push(m[1]); i += m[0].length; }
    else if (sel[i] === '#') { const m = /^#([\w-]+)/.exec(sel.slice(i)); if (!m) break; c.id = m[1]; i += m[0].length; }
    else if (sel[i] === '[') { const m = /^\[\s*([\w-]+)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\]\s]+)))?\s*\]/.exec(sel.slice(i)); if (!m) break; c.attrs.push({ name: m[1].toLowerCase(), value: m[2] ?? m[3] ?? m[4] ?? null }); i += m[0].length; }
    else if (sel.startsWith(':scope', i)) { c.scope = true; i += 6; }
    else if (sel.startsWith(':not(', i)) {
      let depth = 1, j = i + 5;
      while (j < sel.length && depth) { if (sel[j] === '(') depth++; else if (sel[j] === ')') depth--; j++; }
      c.not.push(...listOf(sel.slice(i + 5, j - 1)).map((x) => x.compounds[0]));
      i = j;
    } else break;
  }
  return /** @type {[Compound, number]} */ ([c, i]);
}

/** does an element match a compound — `:scope` the element a query was made on */
function matchCompound(/** @type {DomElement} */ e, /** @type {Compound} */ c, /** @type {DomElement | null} */ scope) {
  if (c.tag && e.localName !== c.tag) return false;
  if (c.id && e.id !== c.id) return false;
  if (c.scope && e !== scope) return false;
  const cls = e.classes();
  if (!c.classes.every((k) => cls.includes(k))) return false;
  if (!c.attrs.every((a) => e.attrs.has(a.name) && (a.value === null || e.attrs.get(a.name) === a.value))) return false;
  return !c.not.some((n) => matchCompound(e, n, scope));
}

/** does an element match a selector, its compounds read right to left through its ancestors */
function matchComplex(/** @type {DomElement} */ e, /** @type {Complex} */ s, /** @type {DomElement | null} */ scope, k = s.compounds.length - 1) {
  if (!matchCompound(e, s.compounds[k], scope)) return false;
  if (k === 0) return true;
  const comb = s.combinators[k - 1];
  if (comb === '>') { const p = e.parentElement; return !!p && matchComplex(p, s, scope, k - 1); }
  for (let p = e.parentElement; p; p = p.parentElement) if (matchComplex(p, s, scope, k - 1)) return true;
  return false;
}

/** the elements below a node matching a selector, in tree order */
function all(/** @type {DomNode} */ root, /** @type {string} */ sel, /** @type {DomElement | null} */ scope) {
  const list = listOf(sel), out = /** @type {DomElement[]} */ ([]);
  const walk = (/** @type {DomNode} */ n) => { for (const c of n.childNodes) { if (c.nodeType === ELEMENT_NODE) { if (list.some((s) => matchComplex(/** @type {DomElement} */ (c), s, scope))) out.push(/** @type {DomElement} */ (c)); walk(c); } } };
  walk(root);
  return out;
}

/** a node's place among its parent's children */
const indexOf = (/** @type {DomNode} */ n) => (n.parentNode ? n.parentNode.childNodes.indexOf(n) : 0);
/** a node's length as a boundary point counts it: a text node's characters, else its children */
const lengthOf = (/** @type {DomNode} */ n) => (n.nodeType === TEXT_NODE ? /** @type {DomText} */ (n).data.length : n.childNodes.length);

/** the order of two nodes in the tree: -1 where `a` comes first or holds `b`, 1 where it follows, 0 where they are one */
function treeOrder(/** @type {DomNode} */ a, /** @type {DomNode} */ b) {
  if (a === b) return 0;
  const path = (/** @type {DomNode} */ n) => { const p = []; for (let x = /** @type {DomNode | null} */ (n); x; x = x.parentNode) p.unshift(x); return p; };
  const pa = path(a), pb = path(b);
  let i = 0;
  while (i < pa.length && i < pb.length && pa[i] === pb[i]) i++;
  if (i === pa.length) return -1;
  if (i === pb.length) return 1;
  return indexOf(pa[i]) < indexOf(pb[i]) ? -1 : 1;
}

/** two boundary points compared as the platform compares them: -1 before, 0 equal, 1 after */
function comparePoints(/** @type {DomNode} */ na, /** @type {number} */ oa, /** @type {DomNode} */ nb, /** @type {number} */ ob) {
  if (na === nb) return oa === ob ? 0 : oa < ob ? -1 : 1;
  if (treeOrder(na, nb) > 0) return -comparePoints(nb, ob, na, oa);
  if (na.contains(nb)) { let child = nb; while (child.parentNode !== na) child = /** @type {DomNode} */ (child.parentNode); return indexOf(child) < oa ? 1 : -1; }
  return -1;
}

/** a range between two boundary points, the start never after the end */
class DomRange {
  /** @param {DomNode} root */
  constructor(root) { this.startContainer = root; this.startOffset = 0; this.endContainer = root; this.endOffset = 0; }
  get collapsed() { return this.startContainer === this.endContainer && this.startOffset === this.endOffset; }
  get commonAncestorContainer() { let n = /** @type {DomNode} */ (this.startContainer); while (!n.contains(this.endContainer)) n = /** @type {DomNode} */ (n.parentNode); return n; }
  /** @param {DomNode} n @param {number} o */
  setStart(n, o) { this.startContainer = n; this.startOffset = o; if (comparePoints(n, o, this.endContainer, this.endOffset) > 0) { this.endContainer = n; this.endOffset = o; } }
  /** @param {DomNode} n @param {number} o */
  setEnd(n, o) { this.endContainer = n; this.endOffset = o; if (comparePoints(n, o, this.startContainer, this.startOffset) < 0) { this.startContainer = n; this.startOffset = o; } }
  /** @param {DomNode} n */
  setStartBefore(n) { this.setStart(/** @type {DomNode} */ (n.parentNode), indexOf(n)); }
  /** @param {DomNode} n */
  setEndAfter(n) { this.setEnd(/** @type {DomNode} */ (n.parentNode), indexOf(n) + 1); }
  /** @param {boolean} [toStart] */
  collapse(toStart) { if (toStart) { this.endContainer = this.startContainer; this.endOffset = this.startOffset; } else { this.startContainer = this.endContainer; this.startOffset = this.endOffset; } }
  /** @param {DomNode} n */
  selectNodeContents(n) { this.startContainer = n; this.startOffset = 0; this.endContainer = n; this.endOffset = lengthOf(n); }
  /** @param {DomNode} n @param {number} o */
  comparePoint(n, o) { return comparePoints(n, o, this.startContainer, this.startOffset) < 0 ? -1 : comparePoints(n, o, this.endContainer, this.endOffset) > 0 ? 1 : 0; }
  /** @param {DomNode} n @param {number} o */
  isPointInRange(n, o) { return this.comparePoint(n, o) === 0; }
  /** @param {DomNode} node */
  intersectsNode(node) {
    const p = node.parentNode;
    if (!p) return true;
    const i = indexOf(node);
    return comparePoints(p, i, this.endContainer, this.endOffset) < 0 && comparePoints(p, i + 1, this.startContainer, this.startOffset) > 0;
  }
  cloneRange() { const r = new DomRange(this.startContainer); r.setStart(this.startContainer, this.startOffset); r.setEnd(this.endContainer, this.endOffset); return r; }
  /** the characters of the text nodes between its points */
  toString() {
    let out = '';
    const walk = (/** @type {DomNode} */ n) => {
      if (n.nodeType === TEXT_NODE) {
        const t = /** @type {DomText} */ (n), lo = n === this.startContainer ? this.startOffset : 0, hi = n === this.endContainer ? this.endOffset : t.data.length;
        if (comparePoints(n, t.data.length, this.startContainer, this.startOffset) > 0 && comparePoints(n, 0, this.endContainer, this.endOffset) < 0) out += t.data.slice(lo, hi);
        return;
      }
      for (const c of n.childNodes) walk(c);
    };
    walk(this.commonAncestorContainer);
    return out;
  }
  getBoundingClientRect() { return { ...EMPTY }; }
  getClientRects() { return []; }
}

/** the platform's one selection: a range, and which of its ends is the anchor */
class DomSelection {
  /** @param {DomDocument} doc */
  constructor(doc) {
    this.doc = doc;
    /** @type {DomRange | null} */
    this.range = null;
    /** @type {DomNode | null} */
    this.anchorNode = null; this.anchorOffset = 0;
    /** @type {DomNode | null} */
    this.focusNode = null; this.focusOffset = 0;
  }
  get rangeCount() { return this.range ? 1 : 0; }
  get isCollapsed() { return !this.range || this.range.collapsed; }
  /** @param {number} _i */
  getRangeAt(_i) { if (!this.range) throw new Error('IndexSizeError: no range'); return this.range; }
  /** the selection set from its anchor to its focus, the range between them */
  set(/** @type {DomNode} */ an, /** @type {number} */ ao, /** @type {DomNode} */ fn, /** @type {number} */ fo) {
    this.anchorNode = an; this.anchorOffset = ao; this.focusNode = fn; this.focusOffset = fo;
    const r = new DomRange(an), back = comparePoints(fn, fo, an, ao) < 0;
    r.setStart(back ? fn : an, back ? fo : ao); r.setEnd(back ? an : fn, back ? ao : fo);
    this.range = r;
  }
  /** @param {DomRange} r */
  addRange(r) { this.range = r; this.anchorNode = r.startContainer; this.anchorOffset = r.startOffset; this.focusNode = r.endContainer; this.focusOffset = r.endOffset; }
  removeAllRanges() { this.range = null; this.anchorNode = null; this.focusNode = null; this.anchorOffset = 0; this.focusOffset = 0; }
  /** @param {DomNode} n @param {number} o */
  collapse(n, o) { this.set(n, o, n, o); }
  /** @param {DomNode} n @param {number} o */
  extend(n, o) { if (this.anchorNode) this.set(this.anchorNode, this.anchorOffset, n, o); }
  /** @param {DomNode} an @param {number} ao @param {DomNode} fn @param {number} fo */
  setBaseAndExtent(an, ao, fn, fo) { this.set(an, ao, fn, fo); }
  toString() { return this.range ? this.range.toString() : ''; }
  /** the points of the selection carried as a text node is joined into the one before it (`normalize`) */
  joined(/** @type {DomText} */ gone, /** @type {DomText} */ into, /** @type {number} */ at) {
    if (this.anchorNode === gone) { this.anchorNode = into; this.anchorOffset += at; }
    if (this.focusNode === gone) { this.focusNode = into; this.focusOffset += at; }
    if (this.anchorNode && this.focusNode && this.range) this.set(this.anchorNode, this.anchorOffset, this.focusNode, this.focusOffset);
  }
}

/** the document: its root element and body, the one selection, and the listeners added to it */
class DomDocument extends DomNode {
  constructor() {
    super(DOCUMENT_NODE);
    this.ownerDocument = this;
    this.documentElement = this.createElement('html');
    this.body = this.createElement('body');
    this.appendChild(this.documentElement); this.documentElement.appendChild(this.body);
    /** @type {DomElement | null} */
    this.activeElement = null;
    this.selection = new DomSelection(this);
    /** @type {Map<string, Array<(e: unknown) => void>>} */
    this.listeners = new Map();
    /** @type {(x: number, y: number) => ({node: DomNode, offset: number} | null)} the text's boundary point under a screen point, as a test lays the page out: none where it lays out nothing */
    this.pointAt = () => null;
    /** @type {(x: number, y: number) => (DomElement | null)} the element under a screen point, as a test lays the page out: none where it lays out nothing */
    this.elementAt = () => null;
    /** a focus moved to an element takes away a selection standing outside it, as a WebKit engine's does; false, as a Blink engine's, where it keeps it */
    this.focusClears = false;
  }
  /** the boundary point under a screen point (`pointAt`), as the platform's `caretPositionFromPoint` answers it */
  caretPositionFromPoint(/** @type {number} */ x, /** @type {number} */ y) { const p = this.pointAt(x, y); return p ? { offsetNode: p.node, offset: p.offset } : null; }
  /** @param {string} tag */
  createElement(tag) { const e = new DomElement(tag); e.ownerDocument = this; return e; }
  /** @param {string} data */
  createTextNode(data) { const t = new DomText(data); t.ownerDocument = this; return t; }
  createDocumentFragment() { const f = new DomFragment(); f.ownerDocument = this; return f; }
  createRange() { return new DomRange(this); }
  /** a walker over the nodes below `root` in tree order, of the kinds `show` names (NodeFilter's SHOW_ELEMENT, SHOW_TEXT) */
  createTreeWalker(/** @type {DomNode} */ root, show = 0xffffffff) {
    const nodes = /** @type {DomNode[]} */ ([]);
    const walk = (/** @type {DomNode} */ n) => { for (const c of n.childNodes) { if ((c.nodeType === ELEMENT_NODE && show & 1) || (c.nodeType === TEXT_NODE && show & 4)) nodes.push(c); walk(c); } };
    walk(root);
    let i = -1;
    return { get currentNode() { return i < 0 ? root : nodes[i]; }, nextNode: () => (++i < nodes.length ? nodes[i] : null) };
  }
  getSelection() { return this.selection; }
  /** @param {string} type @param {(e: unknown) => void} fn */
  addEventListener(type, fn) { (this.listeners.get(type) || this.listeners.set(type, []).get(type) || []).push(fn); }
  removeEventListener() {}
  /** @param {string} sel */
  querySelectorAll(sel) { return all(this, sel, null); }
  /** @param {string} sel */
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
  /** @param {string} id */
  getElementById(id) { return this.querySelector('#' + id); }
  /** the element under a screen point (`elementAt`), as the platform's hit test answers it */
  elementFromPoint(/** @type {number} */ x, /** @type {number} */ y) { return this.elementAt(x, y); }
}

/**
 * A page of this DOM, `width` × `height` px: its document, a window whose
 * selection is the document's, and the listeners each records by event; the
 * caller sets them as the platform's globals (`install`) and puts back what
 * stood (`uninstall`).
 * @param {{width?: number, height?: number}} [size]
 */
export function page(size = {}) {
  const document = new DomDocument();
  /** @type {Map<string, Array<(e: unknown) => void>>} */
  const listeners = new Map();
  const window = {
    innerWidth: size.width ?? 1440, innerHeight: size.height ?? 900, document,
    getSelection: () => document.selection,
    /** @param {string} type @param {(e: unknown) => void} fn */
    addEventListener(type, fn) { (listeners.get(type) || listeners.set(type, []).get(type) || []).push(fn); },
    removeEventListener() {},
  };
  /** @type {{document: unknown, window: unknown, Node: unknown, NodeFilter: unknown, HTMLElement: unknown} | null} */
  let stood = null;
  return {
    document, window,
    /** the listeners the window recorded, by event */
    windowListeners: listeners,
    /** a listener the window or the document recorded for an event, run with the event given */
    fire(/** @type {'window' | 'document'} */ on, /** @type {string} */ type, /** @type {unknown} */ e) { for (const fn of (on === 'window' ? listeners : document.listeners).get(type) || []) fn(e); },
    /** an element of the document */
    element(/** @type {string} */ tag) { return document.createElement(tag); },
    /** this page's document, window and node constants made the platform's globals */
    install() {
      const g = /** @type {any} */ (globalThis);
      stood = { document: g.document, window: g.window, Node: g.Node, NodeFilter: g.NodeFilter, HTMLElement: g.HTMLElement };
      g.document = document; g.window = window;
      g.Node = { ELEMENT_NODE, TEXT_NODE, DOCUMENT_NODE, DOCUMENT_FRAGMENT_NODE };
      g.NodeFilter = { SHOW_ALL: 0xffffffff, SHOW_ELEMENT: 1, SHOW_TEXT: 4 };
      g.HTMLElement = DomElement;
    },
    /** the globals that stood before `install` put back */
    uninstall() { if (!stood) return; const g = /** @type {any} */ (globalThis); Object.assign(g, stood); stood = null; },
  };
}
