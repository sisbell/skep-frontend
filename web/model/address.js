// M-ADDR — the tumbler grammar (the structure record §3.2 "M-ADDR").
// Layer 1 (the model). PURE.
// An address is the glossary's tumbler: `node . 0 . user . 0 . document . 0 .
// element`, the fields separated by zeros, each field itself dottable
// (`1.5` a sub-node of `1`; `1.0.1.1` a sub-account of `1.0.1`; `1.0.1.0.3.2`
// the second version member of document `1.0.1.0.3`; `1.0.1.0.3.0.2.1` the
// first link of that document — element subspace 2, ordinal 1).
// Carries: the wireframe's §2 first half (`fieldsOf`, `boardOf`,
// `accountOf`, `cmpAddr`); the padded path moves to the projection.
// Rules: FP-1, FP-2, FP-6 (knows nothing of pixels).

/**
 * @typedef {Object} ElementRef
 * @property {string} doc the trunk document the element's address lies under
 * @property {number} subspace 1 content, 2 links
 * @property {number} ordinal the 1-based ordinal the address names in that subspace — a permanent address's, where it is one (an image's `i_start`, a link's slot), never a place in any current text
 */

/**
 * @typedef {Object} EndRef — one span of a link's slot, read from the wire's
 * absolute span (`{start, width}` as `link_value` and `follow` carry them).
 * A V-spec slot is recorded as the permanent I-spans of the bytes it named
 * (wire.md §Links, `make_link`: "the recorded endset is the permanent
 * I-spans"), so a passage end names the bytes' identity and never where they
 * sit: where its bytes stand in a document's text now is M-REC's `placed`
 * through the held V→I image, or the board's `project`
 * @property {string} start the span's start address as the wire spelled it
 * @property {string} width the width as the wire spelled it
 * @property {string | null} doc the document whose permanent addresses the span names — where its bytes were minted — or the document it names whole
 * @property {string | null} account the account the span names whole, where it names one and no document
 * @property {boolean} whole true where the span is a unit subtree span (an address-form end)
 * @property {number | null} subspace
 * @property {number | null} ordinal the ordinal of the span's first permanent address, where the span is an element run: the bytes' identity, never their position in any text
 * @property {number | null} positions the run's width in positions, where it is one
 */

/**
 * The tumbler's fields: "1.5.0.1.1.0.1" → [[1,5],[1,1],[1]].
 * @param {string} key
 * @returns {number[][]}
 */
export function fieldsOf(key) {
  /** @type {number[][]} */
  const out = [[]];
  for (const d of key.split('.').map(Number)) {
    if (d === 0) out.push([]);
    else out[out.length - 1].push(d);
  }
  return out;
}

/**
 * Is `text` a well-formed dotted address? Digits and dots, no empty field,
 * no leading zero component, at most one zero between fields.
 * @param {string} text
 * @returns {boolean}
 */
export function isAddress(text) {
  if (!/^[0-9]+(\.[0-9]+)*$/.test(text)) return false;
  const parts = text.split('.');
  if (parts[0] === '0' || parts[parts.length - 1] === '0') return false;
  for (let i = 0; i < parts.length; i++) {
    if (i > 0 && parts[i] === '0' && parts[i - 1] === '0') return false;
    if (parts[i].length > 1 && parts[i][0] === '0') return false;
  }
  return true;
}

/**
 * The exact-address parse the LEAP box uses: a dotted address, trimmed.
 * @param {string} text
 * @returns {string | null}
 */
export function parseAddress(text) {
  const s = text.trim();
  return isAddress(s) ? s : null;
}

/** @param {string} key @returns {string} the board (node) field, dotted */
export const boardOf = (key) => fieldsOf(key)[0].join('.');

/**
 * The account an address lies under: "1.0.1.0.3" → "1.0.1"; a node address
 * ("1") → null.
 * @param {string} key
 * @returns {string | null}
 */
export const accountOf = (key) => {
  const f = fieldsOf(key);
  return f.length >= 2 && f[1].length ? f[0].join('.') + '.0.' + f[1].join('.') : null;
};

/**
 * The trunk document an address lies under: "1.0.1.0.3.2" → "1.0.1.0.3";
 * "1.0.1.0.3.0.2.1" → "1.0.1.0.3"; an account or node → null.
 * @param {string} key
 * @returns {string | null}
 */
export const documentOf = (key) => {
  const f = fieldsOf(key);
  if (f.length < 3 || !f[2].length) return null;
  return f[0].join('.') + '.0.' + f[1].join('.') + '.0.' + f[2][0];
};

/**
 * The version member an address names: "1.0.1.0.3.2" → 2; the bare
 * document → null.
 * @param {string} key
 * @returns {number | null}
 */
export const memberOf = (key) => {
  const f = fieldsOf(key);
  return f.length >= 3 && f[2].length >= 2 ? f[2][1] : null;
};

/** @param {string} doc @param {number} k @returns {string} the k-th member's address */
export const versionAddress = (doc, k) => doc + '.' + k;

/**
 * An element address — a link's or a position's — resolved: "1.0.1.0.3.0.2.1"
 * → {doc: "1.0.1.0.3", subspace: 2, ordinal: 1}; anything shallower → null.
 * @param {string} key
 * @returns {ElementRef | null}
 */
export const elementOf = (key) => {
  const f = fieldsOf(key);
  if (f.length < 4 || f[3].length < 2) return null;
  const doc = documentOf(key);
  return doc ? { doc, subspace: f[3][0], ordinal: f[3][1] } : null;
};

/** the kind of an address by its depth: 'board' | 'account' | 'document' | 'element' */
export const kindOf = (/** @type {string} */ key) => {
  const f = fieldsOf(key);
  if (f.length >= 4 && f[3].length) return 'element';
  if (f.length >= 3 && f[2].length) return 'document';
  if (f.length >= 2 && f[1].length) return 'account';
  return 'board';
};

/**
 * Address order: component by component, numerically, shorter first.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export const cmpAddr = (a, b) => {
  const x = a.split('.').map(Number), y = b.split('.').map(Number);
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const dx = i < x.length ? x[i] : -1, dy = i < y.length ? y[i] : -1;
    if (dx !== dy) return dx - dy;
  }
  return 0;
};

/**
 * Is `addr` the prefix or under it (component-wise)?
 * @param {string} prefix
 * @param {string} addr
 * @returns {boolean}
 */
export const isUnder = (prefix, addr) => addr === prefix || addr.startsWith(prefix + '.');

/**
 * A relative V-span as a frame carries it — `{start: "1.<ordinal>", width:
 * "0.<positions>"}` for subspace 1 (wire.md §Content & provenance reads).
 * @param {number} ordinal 1-based
 * @param {number} positions
 * @param {number} [subspace]
 * @returns {{start: string, width: string}}
 */
export const vSpan = (ordinal, positions, subspace = 1) => ({ start: `${subspace}.${ordinal}`, width: `0.${positions}` });

/**
 * Parse a relative V-span answer (`span_set`'s members on the document's own
 * axis): `{start: "1.951", width: "0.17"}` → {subspace 1, ordinal 951, positions 17}.
 * @param {{start: string, width: string}} s
 * @returns {{subspace: number, ordinal: number, positions: number} | null}
 */
export function parseVSpan(s) {
  const st = s.start.split('.').map(Number), w = s.width.split('.').map(Number);
  if (st.length !== 2 || w.length !== 2) return null;
  return { subspace: st[0], ordinal: st[1], positions: w[1] };
}

/**
 * Resolve an absolute span (a link slot's member, `follow`'s answer — both
 * permanent I-spans): an element run "1.0.1.0.3.0.1.951" width
 * "0.0.0.0.0.0.0.17" → the document whose I-space it lies in, subspace 1,
 * the permanent ordinal 951, 17 positions — the bytes' identity, which
 * names no place in the document's current text; a unit subtree span naming
 * a document ("1.0.1.0.1049578" width "0.0.0.0.1") or an account ("1.0.1"
 * width "0.0.1") → `whole`.
 * @param {{start: string, width: string}} s
 * @returns {EndRef}
 */
export function resolveSpan(s) {
  const w = s.width.split('.').map(Number);
  const last = w[w.length - 1];
  const kind = kindOf(s.start);
  const el = elementOf(s.start);
  if (el && w.length === s.start.split('.').length) {
    return { start: s.start, width: s.width, doc: el.doc, account: accountOf(el.doc), whole: false, subspace: el.subspace, ordinal: el.ordinal, positions: last };
  }
  if (kind === 'document') return { start: s.start, width: s.width, doc: s.start, account: accountOf(s.start), whole: true, subspace: null, ordinal: null, positions: null };
  if (kind === 'account') return { start: s.start, width: s.width, doc: null, account: s.start, whole: true, subspace: null, ordinal: null, positions: null };
  return { start: s.start, width: s.width, doc: documentOf(s.start), account: accountOf(s.start), whole: true, subspace: null, ordinal: null, positions: null };
}

/**
 * The commons type path's ordinal under the registry document's subspace 3:
 * "1.1.0.1.0.1.0.3.13" → 13 (the citation class); "…0.3.14.2" → 14 with the
 * subtype; anything else → null.
 * @param {string | null | undefined} ty
 * @returns {{ordinal: number, sub: number[]} | null}
 */
export function commonsType(ty) {
  if (!ty) return null;
  const prefix = '1.1.0.1.0.1.0.3.';
  if (!ty.startsWith(prefix)) return null;
  const rest = ty.slice(prefix.length).split('.').map(Number);
  return { ordinal: rest[0], sub: rest.slice(1) };
}

/** the wire's display convention for an account's label where it publishes no name: the address itself (R44 — never a name alone) */
export const labelOf = (/** @type {string} */ account) => account;
