// G-LEDGER — the write ledger (the structure record §3.2; W §14; S3 §14;
// S-22 (a): loaded by `import()` under `?gate=` alone, never in the installed
// app). ENGINE-BOUND. Every persistence surface a page has is wrapped and
// counted at load — before the bridge client's first call, so the `fetch`
// count equals the client's own call log: `localStorage`/`sessionStorage`
// (`Storage`), `document.cookie`, `indexedDB.open`, `fetch`,
// `XMLHttpRequest.open`, `navigator.sendBeacon`,
// `history.pushState`/`replaceState`, and the `EventSource` constructor as
// its own surface (one entry, never a call). For the no-write check (law 1;
// FP-7): after a camera-only window every surface but `fetch` and
// `eventsource` reads 0, and `fetch` equals the bridge client's calls; the
// driver reads the counts off `window.__skepLedger` (`snapshot`).
// Rules: FP-1, FP-2, FP-5, FP-7, FP-17.

/** @type {Record<string, number>} */
export const ledger = { localStorage: 0, sessionStorage: 0, cookie: 0, indexedDB: 0, fetch: 0, xhr: 0, beacon: 0, history: 0, eventsource: 0 };

(function instrument() {
  /** @param {any} obj @param {string} name @param {string} key */
  const wrap = (obj, name, key) => {
    try { const orig = obj[name]; obj[name] = function (/** @type {any[]} */ ...a) { ledger[key]++; return orig.apply(this, a); }; } catch { /* sealed in some engines */ }
  };
  wrap(Storage.prototype, 'setItem', 'localStorage'); wrap(Storage.prototype, 'removeItem', 'localStorage'); wrap(Storage.prototype, 'clear', 'localStorage');
  try {
    const cd = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
    if (cd && cd.get && cd.set) Object.defineProperty(document, 'cookie', { get: () => /** @type {() => string} */ (cd.get).call(document), set: (v) => { ledger.cookie++; /** @type {(v: string) => void} */ (cd.set).call(document, v); } });
  } catch { /* */ }
  if (window.indexedDB) wrap(window.indexedDB, 'open', 'indexedDB');
  const of = window.fetch; window.fetch = function (/** @type {any[]} */ ...a) { ledger.fetch++; return of.apply(/** @type {any} */ (this), /** @type {[RequestInfo | URL, RequestInit?]} */ (a)); };
  const ox = XMLHttpRequest.prototype.open; XMLHttpRequest.prototype.open = function (/** @type {any[]} */ ...a) { ledger.xhr++; return ox.apply(this, /** @type {any} */ (a)); };
  if (navigator.sendBeacon) { const ob = navigator.sendBeacon.bind(navigator); navigator.sendBeacon = (...a) => { ledger.beacon++; return ob(...a); }; }
  wrap(history, 'pushState', 'history'); wrap(history, 'replaceState', 'history');
  const OE = window.EventSource;
  if (OE) {
    const Wrapped = /** @type {any} */ (function (/** @type {string | URL} */ url, /** @type {EventSourceInit | undefined} */ init) { ledger.eventsource++; return new OE(url, init); });
    Wrapped.prototype = OE.prototype; Wrapped.CONNECTING = OE.CONNECTING; Wrapped.OPEN = OE.OPEN; Wrapped.CLOSED = OE.CLOSED;
    window.EventSource = Wrapped;
  }
})();

/** a snapshot of the counts */
export const snapshot = () => ({ ...ledger });
/** @ts-ignore — the driver reads the ledger off the window */
window.__skepLedger = ledger;
