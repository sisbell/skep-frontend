// W-WRITE — the words being written, held once per document (FP-38). Its own
// layer, above the model and below the drawing modules (FP-11): it draws
// nothing, keeps no DOM, and imports the model and the leaf `util.js` alone.
// It sends nothing itself: W-MACHINE, handed in (`machine`), composes and
// dials what it holds. State (FP-10), per draft by its address: the
// page-local edits its caret made (`edits`, `addEdit`, `addEdits`; K-72) —
// positions and text, each in the text as it stood after the edits before
// it, never a frame — which M-DERIVE applies over the delivered runs for what
// the page shows, the model's own record standing as the board served it;
// every byte an edit makes takes the page's next ordinal of the draft, never
// used twice (M-REC's `Edit.page`), each act's edits are one step
// (`Edit.step`, `addEdits`), and an edit may put back bytes an earlier one
// removed (`Edit.back`), that earlier edit keeping what it took from then on
// (`Edit.took`); which of them a burst carried out and where the board acked
// it (`unsent`, `markSent`, `markAcked`; `Edit.sent`, `Edit.at`), set by the
// machine alone; its kept state as its corner reads it — the word and the
// reason standing on the word's act (`keptOf`, `setKept`; B3-S2) — set by its
// owner alone and never by a read; and what D6's machine holds of it, set by
// the machine alone as the kept state is: the held lines `held(session)`
// lists for it (`setHeld`, `heldOf`) — the one record any sign that words are
// not on the board reads — and whether a burst of it is open or awaits its
// ack (`setFlight`, `inFlight`), which an act that names characters to the
// board asks the machine to commit (`commit`) and waits out (`landed`). The
// machine is told of each act's edits as they are added (`Machine.typed`),
// and of the page hidden, unloading or changing its class (`leaving`). With
// no machine handed in nothing is in flight and nothing is sent.
// The rebase (FP-23, FP-38): as a read sets a draft's text (M-REC's
// `onText`), in that step, the edits the text now holds — the leading edits
// a burst carried out that the board acked at or before the position the
// read was answered at — leave the list, so the text the page shows is the
// same before and after; one a put-back still standing names stays, applied
// to nothing (`Edit.based`), and each put-back's index is counted again.
// Beside them, one draft: the one whose edits were added last in the page's
// session (`lastWritten`), which a key swallowed elsewhere names (N-KEYS').
// The identity of a byte the page made — the page's space of the draft, and
// the addresses the board minted for it — is M-REC's (`pageSpace`, `mint`,
// `pageIds`): a draft's count of the changes to its edits counts each of
// M-REC's mints of their bytes beside its own (`editRev`), so a record
// derived from them is made again whoever told the mint. Every change here is
// counted (`rev`), the app's loop reading the count beside the model's. A
// change of the page's class (FP-29) tells the machine as it begins (M-REC's
// `beforeClass`), while the session that typed still stands and the draft's
// record with it, so what is unsent goes out under that session; once it is
// taken (M-REC's `onClass`) every draft's kept state and held lines are let
// go, the draft last written forgotten and every flight ended, those waiting
// on it told. The edits stand: the words the class it left typed are kept.
// Rules: FP-1, FP-2, FP-10, FP-11, FP-14, FP-23, FP-29, FP-34, FP-38.

import * as REC from '../model/records.js';
import { applyEdits } from '../model/derive.js';
import { byteLength } from '../util.js';

/** @typedef {import('../model/records.js').Edit} Edit */
/** @typedef {import('../model/frames.js').HeldLine} HeldLine */

/**
 * @typedef {Object} KeptState — a draft's kept state as its corner reads it (B3-S2; D6's machine sets it)
 * @property {'kept' | 'not yet kept' | 'not kept'} word
 * @property {string | null} reason the reason standing on the word's act, in its statement; null where the state carries none
 */

/** @typedef {'hidden' | 'unload' | 'class'} Leaving — how the page leaves what it holds unsent: `hidden` the page hidden, its calls still answered; `unload` the page going, no answer read; `class` the class the page reads at changed */

/**
 * @typedef {Object} Machine — what D6's machine hands in (`machine`)
 * @property {(addr: string) => void} typed an act's edits were added to a draft (`addEdits`)
 * @property {(addr: string) => void} commit the open burst of a draft committed now
 * @property {(how: Leaving) => void} leaving every draft's unsent words committed as the page leaves them (`leaving`)
 */

/** @typedef {{list: Edit[], rev: number, next: number, steps: number}} Edits — a draft's page-local edits in the order made, with a count of every change to them (`editRev`), the next ordinal the page names a byte it makes by, and the steps made */

/** @type {Map<string, KeptState>} each draft's kept state, by address (`setKept`) */
const kept = new Map();
/** @type {Map<string, Edits>} each draft's page-local edits (`addEdit`) */
const drafts = new Map();
/** @type {Map<string, HeldLine[]>} each draft's held lines as `held(session)` listed them (`setHeld`); a draft absent holds none */
const held = new Map();
/** @type {Map<string, Array<() => void>>} the drafts a burst of which is open or awaits its ack (`setFlight`), each with those waiting for it to land (`landed`) */
const flights = new Map();
/** @type {Machine | null} D6's machine, where one was handed in (`machine`) */
let handed = null;
/** @type {string | null} the draft whose edits were added last in the page's session (`addEdits`); null before any, and after a change of the page's class */
let last = null;
/** how many times anything held here has changed (`rev`) */
let revision = 0;

/** a change of anything held here: counted for the loop */
function bump() { revision++; }
/** how many times anything held here has changed: the app's loop reads it beside the model's (M-REC's `rev`) and draws again where it moved */
export const rev = () => revision;

REC.beforeClass(() => leaving('class'));
REC.onClass(classChanged);
REC.onText(rebase);

/** a change of the page's class taken (see the head): every draft's kept state and held lines dropped, the draft last written forgotten, and every flight ended, those waiting told. The edits stand */
function classChanged() {
  kept.clear();
  held.clear();
  last = null;
  for (const addr of [...flights.keys()]) endFlight(addr);
  bump();
}

// ---- the kept state ------------------------------------------------------------

/**
 * A draft's kept state as its corner reads it (B3-S2): the word and the
 * reason on its act; null where none is set — the slot then stands empty, its
 * width kept (FP-34). Set by its owner, D6's machine, and by the gate's
 * hook; no read sets it.
 * @param {string} addr
 * @returns {KeptState | null}
 */
export const keptOf = (addr) => kept.get(addr) ?? null;
/**
 * A draft's kept state set, or cleared with null (`keptOf`): every surface
 * that reads it — its corner on the plane, a pane's — is made again from it.
 * @param {string} addr
 * @param {KeptState | null} s
 */
export function setKept(addr, s) {
  if (s) kept.set(addr, { word: s.word, reason: s.reason ?? null }); else kept.delete(addr);
  bump();
}

// ---- the page-local edits -------------------------------------------------------

/**
 * A draft's page-local edits, in the order made (`addEdit`): what M-DERIVE
 * applies over its delivered runs for the text the page shows (K-72); none
 * where no caret has typed in it.
 * @param {string} addr
 * @returns {readonly Edit[]}
 */
export const edits = (addr) => drafts.get(addr)?.list ?? [];
/** how many times a draft's page-local edits have changed — each act's edits added, each clearing, each rebase, and each of M-REC's mints of bytes they made (`mintsOf`) — so a record derived from them is made again where it moved */
export const editRev = (/** @type {string} */ addr) => (drafts.get(addr)?.rev ?? 0) + REC.mintsOf(addr);
/** a draft's edits with their counts, made where the draft holds none yet */
function editsOf(/** @type {string} */ addr) {
  let x = drafts.get(addr);
  if (!x) { x = { list: [], rev: 0, next: 1, steps: 0 }; drafts.set(addr, x); }
  return x;
}
/**
 * One page-local edit added to a draft's (`edits`), a step of its own: its
 * positions in the text as it stands after the edits before it, the bytes it
 * makes named by the page's next ordinals (`Edit.page`). The model's own
 * record stands as the board served it; the machine handed in is told
 * (`Machine.typed`).
 * @param {string} addr
 * @param {Edit} e
 */
export function addEdit(addr, e) { addEdits(addr, [e]); }
/**
 * The edits of one act added to a draft's (`edits`), in order, as one step
 * (`Edit.step`): each as `addEdit` adds it. An edit a put-back among them
 * names keeps what it took from now on (`Edit.took`), read from the text as
 * it stands before the act. Nothing where the act made none.
 * @param {string} addr
 * @param {readonly Edit[]} list
 */
export function addEdits(addr, list) {
  if (!list.length) return;
  const x = editsOf(addr), step = ++x.steps;
  const made = list.map((e) => {
    const width = e.back ? 0 : byteLength(e.text), page = width ? x.next : null;
    x.next += width;
    return /** @type {Edit} */ ({ pos: e.pos, width: e.width, text: e.back ? '' : e.text, page, back: e.back ? { ...e.back } : null, step });
  });
  keepTaken(addr, x, made);
  x.list = [...x.list, ...made];
  x.rev++;
  last = addr;
  bump();
  if (handed) handed.typed(addr);
}
/** each edit of a draft a put-back about to be added names keeps what it took (`Edit.took`), where it keeps none yet and the model holds the text it took it from */
function keepTaken(/** @type {string} */ addr, /** @type {Edits} */ x, /** @type {Edit[]} */ made) {
  const named = made.flatMap((e) => (e.back ? [e.back.of] : [])).filter((of) => x.list[of] && !x.list[of].took);
  if (!named.length || !REC.has(addr)) return;
  const took = applyEdits(REC.doc(addr), x.list, (page, width) => REC.pageIds(addr, page, width)).took;
  x.list = x.list.map((e, i) => (named.includes(i) && took[i] ? { ...e, took: took[i] } : e));
}
/** the draft last written in the page's session: the one whose edits were added last (`addEdits`); null before any edit, and after a change of the page's class */
export const lastWritten = () => last;
/** a draft's page-local edits let go: the page shows its delivered text again */
export function clearEdits(/** @type {string} */ addr) {
  const x = drafts.get(addr);
  if (!x || !x.list.length) return;
  x.list = []; x.rev++;
  bump();
}

// ---- what a burst carried, and the rebase ---------------------------------------

/**
 * The first of a draft's edits no burst has carried out (`markSent`), as an
 * index into them: the edits from it on are the open burst's; their count
 * where every edit went out.
 * @param {string} addr
 * @returns {number}
 */
export function unsent(addr) {
  const list = edits(addr), i = list.findIndex((e) => e.sent == null);
  return i < 0 ? list.length : i;
}
/**
 * A draft's unsent edits marked carried out by a burst (`Edit.sent`): set by
 * D6's machine as it dials the burst. The text they make is unchanged.
 * @param {string} addr
 * @param {number} burst the machine's count of the draft's bursts
 */
export function markSent(addr, burst) {
  const x = drafts.get(addr);
  if (!x) return;
  x.list = x.list.map((e) => (e.sent == null ? { ...e, sent: burst } : e));
}
/**
 * The edits a burst carried out marked acked at a position (`Edit.at`): set
 * by D6's machine as the burst's last frame is acked, or as the shell says
 * its held line kept. A read answered at or past it holds their change
 * (`rebase`).
 * @param {string} addr
 * @param {number} burst the machine's count of the draft's bursts
 * @param {number} at the position the board acked the burst at
 */
export function markAcked(addr, burst, at) {
  const x = drafts.get(addr);
  if (!x) return;
  x.list = x.list.map((e) => (e.sent === burst ? { ...e, at } : e));
}
/** does a draft hold an edit a burst carried out that no ack names (`markSent`, `markAcked`): a burst out, a line held, a run refused? */
export const unacked = (/** @type {string} */ addr) => edits(addr).some((e) => e.sent != null && e.at == null);

/**
 * A draft's edits rebased as a read sets its text (see the head; M-REC's
 * `onText`): the leading edits acked at or before the position the read was
 * answered at leave the list, the text holding their change — save one a
 * put-back that stays names, which stays as the record of what it took and
 * changes nothing (`Edit.based`) — and every put-back that stays names its
 * edit by its place in the list as it now stands. Nothing where the read
 * said no position, or the first edit is not so acked.
 * @param {string} addr
 * @param {number | null} asOf the position the read was answered at
 */
function rebase(addr, asOf) {
  const x = drafts.get(addr);
  if (!x || !x.list.length || asOf == null) return;
  const list = x.list;
  let n = 0;
  while (n < list.length) { const at = list[n].at; if (at == null || at > asOf) break; n++; }
  if (!n) return;
  /** @type {boolean[]} the held edits a put-back that stays names */
  const named = list.map(() => false);
  for (let i = list.length - 1; i >= n; i--) { const b = list[i].back; if (b) named[b.of] = true; }
  /** @type {Map<number, number>} where each edit that stays stands in the list as rebased */
  const index = new Map();
  /** @type {Edit[]} */
  const out = [];
  for (const [i, e] of list.entries()) {
    if (i < n && !named[i]) continue;
    index.set(i, out.length);
    out.push(i < n ? { ...e, based: true, back: null } : e);
  }
  x.list = out.map((e) => (e.back ? { ...e, back: { ...e.back, of: index.get(e.back.of) ?? e.back.of } } : e));
  x.rev++;
  bump();
}

// ---- what D6's machine holds of a draft -----------------------------------------

/**
 * A draft's held lines as `held(session)` listed them (see the head; B3-S2;
 * M-FRAMES's `decodeHeldRows`), in resend order; none where the board holds
 * every line of it, or none was ever listed.
 * @param {string} addr
 * @returns {readonly HeldLine[]}
 */
export const heldOf = (addr) => held.get(addr) ?? [];
/**
 * A draft's held lines set (`heldOf`), or cleared with none: set by D6's
 * machine from `held(session)`, and by the gate's hook; no read sets it.
 * @param {string} addr
 * @param {readonly HeldLine[]} rows the rows naming the draft, in resend order
 */
export function setHeld(addr, rows) {
  if (rows.length) held.set(addr, rows.map((r) => ({ ...r }))); else held.delete(addr);
  bump();
}

/** D6's machine handed in, or taken out with null (see the head): what `commit` and `leaving` ask, and what `addEdits` tells */
export function machine(/** @type {Machine | null} */ m) { handed = m; }
/** is a burst of a draft open, or awaiting its ack (`setFlight`)? */
export const inFlight = (/** @type {string} */ addr) => flights.has(addr);
/** every draft a burst of which is open or awaits its ack (`setFlight`) */
export const flying = () => [...flights.keys()];
/**
 * A draft's flight set (see the head): a burst of it opened or sent (`on`),
 * or its last ack landed or a hold answered in its place — those waiting on
 * it then told (`landed`). Set by D6's machine, and by the gate's hook.
 * @param {string} addr
 * @param {boolean} on
 */
export function setFlight(addr, on) {
  if (on) { if (!flights.has(addr)) flights.set(addr, []); } else endFlight(addr);
  bump();
}
/** a draft's flight ended: those waiting on it told, in the order they waited */
function endFlight(/** @type {string} */ addr) {
  const waiting = flights.get(addr) || [];
  flights.delete(addr);
  for (const w of waiting) w();
}
/** the open burst of a draft committed now, where a machine stands to commit it (`machine`): what an act that names characters to the board, the save chord and a departure from the text ask before they go on (`landed`) */
export function commit(/** @type {string} */ addr) { if (handed && flights.has(addr)) handed.commit(addr); }
/**
 * Every draft's unsent words committed as the page leaves them (see the
 * head; D6 BM-28), where a machine stands to commit them: the page hidden,
 * the page unloading, or the class it reads at changed.
 * @param {Leaving} how
 */
export function leaving(how) { if (handed) handed.leaving(how); }
/**
 * A draft's flight landed (see the head): settled once no burst of it is
 * open or awaits its ack — at once where none is — whether its ack landed or
 * a hold answered in its place, which the one waiting reads (`heldOf`).
 * @param {string} addr
 * @returns {Promise<void>}
 */
export function landed(addr) {
  const waiting = flights.get(addr);
  return waiting ? new Promise((done) => { waiting.push(done); }) : Promise.resolve();
}

/** reset everything held here (tests): the drafts' ordinals start again, and no machine stands */
export function _reset() {
  kept.clear(); drafts.clear(); held.clear(); flights.clear(); handed = null; last = null; revision = 0;
}
