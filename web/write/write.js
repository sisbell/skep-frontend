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
// machine alone; its kept state as its corner reads it — the word, and why
// the board has not kept its words, which the word's own act says (`keptOf`,
// `setKept`; B3-S2; D6 BM-8) — set by its owner alone and never by a read; and
// what D6's machine holds of it, set by the machine alone as the kept state
// is: the held lines `held(session)` lists for it (`setHeld`, `heldOf`) — the
// one record any sign that words are not on the board reads — and whether a
// burst of it is open or awaits its ack (`setFlight`, `inFlight`), which an
// act that names characters to the board asks the machine to commit
// (`commit`) and waits out (`landed`). The machine is told of each act's
// edits as they are added (`Machine.typed`), and of the page hidden,
// unloading or changing its class (`leaving`) — unloading, it posts the
// page's close itself, carrying what it had not dialed, and says so. With no
// machine handed in nothing is in flight and nothing is sent.
// THE STACKS (`undoOf`, `redoOf`, `setStacks`; D6 BM-31): one undo stack and
// one redo stack per draft, for the page's session, set by the machine alone
// and gone at a change of the page's class. A step (`Step`) is a run of
// typing, or an act that is a step of its own, held by the bytes' identity
// and never by a burst: what it placed, what it removed that it had not
// placed with the byte either side of each removal, and where its caret
// stood as it began. An act says whether it is a key typing at the caret and
// where that caret stood (`Typed`), which the machine is told with it; a move
// of the caret by any other act ends the run (`endRun`), which the machine is
// told too. What an undo or a redo makes of a draft's edits the machine adds
// as they are (`restore`) — an insert naming bytes the page made before by
// their own ordinals, a removal kept only for the put-back that names it —
// and W-WRITE tells it of none of them. Beside the stacks, each removal of
// kept text a `delete` of the draft carried, or an undo decided at its press
// (`removalsOf`, `addRemoval`; D6 BM-34, BM-51): what the deletion face is
// drawn from; and those watching are told of an undo the board declined
// (`onDeclined`, `decline`; D6 BM-11).
// THE HELD LINES THIS WINDOW DID NOT SEND (`setReopened`; D6 BM-29): an
// earlier launch's, another window's. They are applied over the draft's
// record before its edits, in the order listed (`baseOf`; M-DERIVE's
// `applyHeld`), each insert's bytes named by the page's own ordinals
// (`heldNames`, `nameOf`), so the text shown holds them where they were
// typed and every surface holds them by identity; a line the apply stops at
// is held apart with every line after it (`unapplied`). One that lands is
// applied until a read answered at or past its landing sets the text
// (`landReopened`); one the person drops leaves at once (`dropReopened`).
// A REFUSAL THE PAGE KEEPS (`markIsland`; D6 BM-19): the edits of the burst
// refused are an island — kept in the list and in the text shown, never
// composed (`boardEdits`) — and an edit made inside one is of it
// (`addEdits`); the discard is the page's own (`discardIsland`), and a change
// waiting on the held store's bound is sent again by unmarking it
// (`reopenIsland`; BM-20).
// WHY A BOARD's DRAFTS CANNOT BE WRITTEN NOW (`setUnwritable`, `unwritable`;
// D6 BM-20, BM-24, BM-30, BM-58, BM-60), per board, set by the machine
// alone: while one stands no edit is added (`addEdits`).
// The rebase (FP-23, FP-38): as a read sets a draft's text (M-REC's
// `onText`), in that step, the held lines it holds and the edits it holds —
// the leading edits a burst carried out that the board acked at or before the
// position the read was answered at — leave, so the text the page shows is
// the same before and after; one a put-back still standing names stays,
// applied to nothing (`Edit.based`), and each put-back's index is counted
// again. Where the text set differs under the edits that stay — another
// writer's change (D6 BM-56) — each is placed again in it by the identity of
// the bytes it touches and of those either side, read from the record as it
// stood before the set (M-REC's `beforeText`; M-DERIVE's `placedAgain`); an
// unsent one the new text does not place exactly leaves the draft's burst to
// be composed as it was typed (`staleOf`; BM-57). A byte of an edit that
// leaves which no ack minted is minted from the read where the text shown is
// unchanged. Edits are left out of the list the same way — a discard's, a
// drop's (`dropEdits`) — the rest placed again by identity.
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
// taken (M-REC's `onClass`) the draft last written is forgotten and every
// flight ended, those waiting on it told, and every draft's kept state and
// held lines are let go — save a draft holding words the board has not kept
// (`unkept`), which a change ending the session leaves whole: the model is
// told which (M-REC's `keptAtEnding`). The edits stand: the words the class
// it left typed are kept.
// Rules: FP-1, FP-2, FP-10, FP-11, FP-14, FP-23, FP-29, FP-34, FP-38.

import * as REC from '../model/records.js';
import { applyEdits, applyHeld, placedAgain, PAGE } from '../model/derive.js';
import { byteLength } from '../util.js';

/** @typedef {import('../model/records.js').Edit} Edit */
/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').ISpan} ISpan */
/** @typedef {import('../model/frames.js').HeldLine} HeldLine */

/**
 * @typedef {Object} KeptState — a draft's kept state as its corner reads it (B3-S2; D6's machine sets it)
 * @property {'kept' | 'not yet kept' | 'not kept'} word
 * @property {string | null} reason the reason standing on the word's act, in words; null where the state carries none, or carries its cause
 * @property {Cause} [cause] why the board has not kept the draft's words, as D6's machine read it: what the word's own act says, each drawing module in its words; absent where the state carries none
 */

/**
 * @typedef {Object} Cause — why the board has not kept a draft's words (D6 BM-8, BM-10, BM-19 … BM-24), as the shell and the page's own record say it
 * @property {string} token the hold's token (`unreachable`, `stopped`, `halted`, `poisoned`, `durability`, `head_unreadable`, `session_died`, `moved`), the refusal's name, or the page's own: `island` a refusal the page keeps, `death` a session ended with no re-open
 * @property {string | null} [arm] the death's arm, where the token is `session_died` or `death` and the shell named one
 */

/**
 * @typedef {Object} Unwritable — why a board's drafts cannot be written now (D6 BM-20, BM-24, BM-30, BM-58, BM-60)
 * @property {'keyless' | 'another_window' | 'store_halted' | 'held_full' | 'death'} why `keyless` the session may not write; `another_window` another shell holds the board's held store; `store_halted` the held file halts the board; `held_full` the held store's bound is met; `death` the session ended and no re-open follows
 * @property {string | null} [detail] `store_halted`'s `why` as the shell says it; the death's arm
 */

/**
 * @typedef {Object} Island — a refusal the page keeps (D6 BM-19): the run of edits a burst carried that the board never took
 * @property {number} id the burst refused, by the machine's count of the draft's bursts: what its edits are marked with (`Edit.island`)
 * @property {string} name the refusal's name
 * @property {string} kind the refusal's kind
 */

/**
 * @typedef {Object} Reopened — a held line this window did not send (`setReopened`)
 * @property {HeldLine} row
 * @property {number | null} at the position the board took it at, once it landed — 0 where it landed at a position no one told; null while it is held
 */

/** @typedef {{doc: Doc, edits: readonly Edit[], from: number}} Stale — a draft's burst as it was typed, where the text set under it does not place it (D6 BM-57): the record it was typed over, the edits as they stood, and the first of them unsent */

/** @typedef {'hidden' | 'unload' | 'class'} Leaving — how the page leaves what it holds unsent: `hidden` the page hidden, its calls still answered; `unload` the page going, no answer read; `class` the class the page reads at changed */

/**
 * @typedef {Object} Typed — how an act's edits were made (`addEdits`): a key typing at the caret
 * @property {number} at where the caret stood before the key, a position of the text shown then
 */

/**
 * @typedef {Object} Machine — what D6's machine hands in (`machine`)
 * @property {(addr: string, how: Typed | null) => void} typed an act's edits were added to a draft (`addEdits`): a key typing at the caret, or, with null, an act that is a step of its own
 * @property {(addr: string | null) => void} ended the run of typing open at a draft ended — at every draft, with null (`endRun`)
 * @property {(addr: string) => void} commit the open burst of a draft committed now
 * @property {(how: Leaving) => boolean} leaving every draft's unsent words committed as the page leaves them (`leaving`): whether it posted the page's close, which it does at `unload` alone
 */

/**
 * @typedef {Object} Taken — a stretch of bytes a step put out of the text, as a put-back places it again: what a step removed that it had not
 * placed, which its undo puts back (D6 BM-32); what it placed, as it stood when the step was undone, which its redo puts back (D6 BM-33)
 * @property {import('../model/records.js').Took} took the bytes — their runs and their identity, each at its position from 1
 * @property {ISpan[]} before the byte that stood just before them as they left the text, by identity; none at the text's first position
 * @property {ISpan[]} after the byte that stood just after them; none at the text's end
 */

/**
 * @typedef {Object} Step — one step of a draft's undo stack (D6 BM-31): a run of typing, or an act that is a step of its own
 * @property {number} id the step, by the draft's count of them
 * @property {'typing' | 'put-back'} kind a run of typing — every key that types at one caret; or a put-back of words the person removed
 * @property {boolean} open a run of typing no act has ended: the next key that types at the caret joins it
 * @property {number[]} acts the acts it holds, by the count the edits each made carry (`Edit.step`), in the order made
 * @property {ISpan[]} placed the bytes it placed, by identity, in the order placed: a byte the page made by the page's own name of it, which M-REC reads as the address the board minted it at
 * @property {Taken[]} took what it removed that it had not placed, in the order removed
 * @property {{before: ISpan[], after: ISpan[], pos: number}} began where the caret stood as it began: the byte either side of it, by identity, and its position in the text shown then
 * @property {Taken[] | null} stood on the redo stack, the words it placed as they stood when it was undone, in the text's order; null on the undo stack
 * @property {number | null} removal on the redo stack, the removal the deletion face stands at for the words its undo took out (`Removal.id`); null where it stands at none, and on the undo stack
 */

/**
 * @typedef {Object} Removal — a removal of kept text the deletion face stands at (D6 BM-34, BM-51)
 * @property {number} id by the draft's count of them
 * @property {ISpan[]} before the byte just before the removal point, by identity; none at the text's first position
 * @property {ISpan[]} after the byte just after it; none at the text's end
 * @property {string} words the words removed
 * @property {ISpan[]} ids the bytes removed, by identity
 */

/**
 * @typedef {Object} Edits — what is held of a draft's words
 * @property {Edit[]} list its page-local edits, in the order made
 * @property {number} rev a count of every change to them and to the lines applied before them (`editRev`)
 * @property {number} next the next ordinal the page names a byte it makes by
 * @property {number} steps the steps made
 * @property {Reopened[]} lines the held lines this window did not send, in the order listed (`setReopened`)
 * @property {Map<number, {page: number, width: number}>} names the page's ordinals for each held line's inserted bytes, by the line's ordinal (`heldNames`)
 * @property {Map<number, Island>} islands the refusals the page keeps, by the burst refused (`markIsland`)
 * @property {{key: string, doc: Doc, stopped: HeldLine[]} | null} base the record the edits apply over, as last made (`baseOf`)
 * @property {Step[]} undo the undo stack, its newest step last (`setStacks`)
 * @property {Step[]} redo the redo stack, the step undone last its last
 * @property {Removal[]} removals the removals of kept text the deletion face stands at, in the order made (`addRemoval`)
 * @property {number} faced how many such removals the draft has had in the page's session
 */

/** @type {Map<string, KeptState>} each draft's kept state, by address (`setKept`) */
const kept = new Map();
/** @type {Map<string, Edits>} each draft's page-local edits (`addEdit`) */
const drafts = new Map();
/** @type {Map<string, HeldLine[]>} each draft's held lines as `held(session)` listed them (`setHeld`); a draft absent holds none */
const held = new Map();
/** @type {Map<string, Array<() => void>>} the drafts a burst of which is open or awaits its ack (`setFlight`), each with those waiting for it to land (`landed`) */
const flights = new Map();
/** @type {Map<string, Unwritable>} why each board's drafts cannot be written now, by the board (`setUnwritable`) */
const blocks = new Map();
/** @type {Map<string, {base: Doc, list: Edit[]}>} each draft's record and edits as they stood when its text was about to go (`leavingText`), until the read that sets it again (`rebase`) */
const snaps = new Map();
/** @type {Map<string, Stale>} each draft whose unsent burst the text set under it does not place (`staleOf`) */
const stales = new Map();
/** @type {Set<string>} the drafts a moved verdict stands on that no key has been typed in since (`setMoved`, `takeMovedKey`) */
const movedUntold = new Set();
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
REC.beforeText(leavingText);
REC.keptAtEnding((addr) => unkept(addr));

/**
 * A change of the page's class taken (see the head): the draft last written
 * forgotten, every flight ended, those waiting told, and every draft's kept
 * state and held lines dropped — save, where the change ends the session, a
 * draft holding words the board has not kept (`unkept`) whose record the
 * model left as read, which stands whole with them. The edits stand; every
 * draft's stacks and the removals its deletion face stands at go.
 * @param {boolean} ended the change ends the session
 */
function classChanged(ended) {
  const stays = (/** @type {string} */ addr) => ended && unkept(addr) && REC.has(addr) && REC.doc(addr).from >= 0;
  for (const addr of [...kept.keys()]) if (!stays(addr)) kept.delete(addr);
  for (const addr of [...held.keys()]) if (!stays(addr)) held.delete(addr);
  for (const [addr, x] of drafts) if (!stays(addr) && x.lines.length) { x.lines = []; x.base = null; x.rev++; }
  for (const x of drafts.values()) { x.undo = []; x.redo = []; x.removals = []; x.faced = 0; }
  last = null;
  for (const addr of [...flights.keys()]) endFlight(addr);
  bump();
}

/**
 * Does a draft hold words the board has not kept (see the head; D6 BM-24):
 * a line `held(session)` lists for it, or, where a machine stands to send
 * them (`machine`), an edit no ack names — one open, one a burst carried
 * out, a line of this window's the shell holds, an island's. With no machine
 * handed in an edit is the page's alone, and no word of it was ever the
 * board's to keep.
 * @param {string} addr
 * @returns {boolean}
 */
export const unkept = (addr) => heldOf(addr).length > 0 || (!!handed && edits(addr).some((e) => e.at == null && !e.based));

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
  if (s) kept.set(addr, s.cause ? { word: s.word, reason: s.reason ?? null, cause: { token: s.cause.token, arm: s.cause.arm ?? null } } : { word: s.word, reason: s.reason ?? null }); else kept.delete(addr);
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
  if (!x) { x = { list: [], rev: 0, next: 1, steps: 0, lines: [], names: new Map(), islands: new Map(), base: null, undo: [], redo: [], removals: [], faced: 0 }; drafts.set(addr, x); }
  return x;
}
/** the identity of bytes the page made in a draft, as the model names them now (M-REC's `pageIds`) */
const idsOf = (/** @type {string} */ addr) => (/** @type {number} */ page, /** @type {number} */ width) => REC.pageIds(addr, page, width);
/**
 * One page-local edit added to a draft's (`edits`), an act of its own: its
 * positions in the text as it stands after the edits before it, the bytes it
 * makes named by the page's next ordinals (`Edit.page`). The model's own
 * record stands as the board served it; the machine handed in is told
 * (`Machine.typed`).
 * @param {string} addr
 * @param {Edit} e
 * @param {Typed | null} [how] the edit is a key typing at the caret (`addEdits`)
 */
export function addEdit(addr, e, how = null) { addEdits(addr, [e], how); }
/**
 * The edits of one act added to a draft's (`edits`), in order, as one act
 * (`Edit.step`): each as `addEdit` adds it. An edit a put-back among them
 * names keeps what it took from now on (`Edit.took`), read from the text as
 * it stands before the act. The machine handed in is told of the act and how
 * it was made (`how`): a key typing at the caret, which joins the caret's run
 * of typing or begins one; any other act, a step of its own. Nothing where
 * the act made none.
 * @param {string} addr
 * @param {readonly Edit[]} list
 * @param {Typed | null} [how] the act is a key typing at the caret, and where that caret stood; left out for an act that is a step of its own
 */
export function addEdits(addr, list, how = null) {
  if (!list.length || unwritable(addr)) return;
  const x = editsOf(addr), step = ++x.steps;
  const made = list.map((e) => {
    const width = e.back ? 0 : byteLength(e.text), page = width ? x.next : null;
    x.next += width;
    return /** @type {Edit} */ ({ pos: e.pos, width: e.width, text: e.back ? '' : e.text, page, back: e.back ? { ...e.back } : null, step });
  });
  keepTaken(addr, x, made);
  for (const e of made) x.list = [...x.list, ...folded(addr, x, e)];
  x.rev++;
  last = addr;
  bump();
  if (handed) handed.typed(addr, how);
}

/**
 * Edits added to a draft's as an undo or a redo makes them (see the head; D6
 * BM-32 … BM-34), in order, as one act: each as given — an insert naming its
 * bytes by the page's ordinals it gives (`Edit.page`), so bytes the page made
 * before come back as themselves, else by the page's next; a removal kept
 * `based` with what it took, standing only for the put-back that names it; a
 * put-back naming its edit by its place in the list. An edit made inside an
 * island is of it, as at any act (`addEdits`). The machine is not told: the
 * act is its own. Nothing where the list is empty.
 * @param {string} addr
 * @param {readonly Edit[]} list
 * @returns {number} the act, by the count its edits carry (`Edit.step`); 0 where none was added
 */
export function restore(addr, list) {
  if (!list.length) return 0;
  const x = editsOf(addr), step = ++x.steps;
  const made = list.map((e) => {
    const width = e.back || e.based ? 0 : byteLength(e.text), page = !width ? null : e.page ?? x.next;
    if (width && e.page == null) x.next += width;
    return /** @type {Edit} */ ({ pos: e.pos, width: e.width, text: e.back ? '' : e.text, page, back: e.back ? { ...e.back } : null, step, ...(e.based ? { based: true, took: e.took ?? null, sent: e.sent ?? 0, at: e.at ?? 0 } : {}) });
  });
  keepTaken(addr, x, made);
  for (const e of made) x.list = [...x.list, ...(e.based ? [e] : folded(addr, x, e))];
  x.rev++;
  bump();
  return step;
}

/** how many acts a draft's edits have been made by (`Edit.step`): the newest act's count; 0 where none was made */
export const lastAct = (/** @type {string} */ addr) => drafts.get(addr)?.steps ?? 0;

/**
 * The run of typing open at a draft ended (see the head; D6 BM-31): what a
 * move of the caret by an act other than typing tells — a click, an arrow,
 * Home or End, a walk move, Esc, a zoom-out that ends the editing focus, a
 * selection, a teleport — and every draft's, where none is named. The
 * machine handed in closes it; nothing where none is.
 * @param {string | null} [addr]
 */
export function endRun(addr = null) { if (handed) handed.ended(addr); }

// ---- the stacks -----------------------------------------------------------------

/** a draft's undo stack (see the head), its newest step last; none where no step was made */
export const undoOf = (/** @type {string} */ addr) => /** @type {readonly Step[]} */ (drafts.get(addr)?.undo ?? []);
/** a draft's redo stack (see the head), the step undone last its last; none where none was undone */
export const redoOf = (/** @type {string} */ addr) => /** @type {readonly Step[]} */ (drafts.get(addr)?.redo ?? []);
/**
 * A draft's stacks set (see the head): by D6's machine alone, as a step is
 * made, joined, ended, undone or put back.
 * @param {string} addr
 * @param {readonly Step[]} undo
 * @param {readonly Step[]} redo
 */
export function setStacks(addr, undo, redo) {
  const x = undo.length || redo.length ? editsOf(addr) : drafts.get(addr);
  if (!x) return;
  x.undo = [...undo]; x.redo = [...redo];
  bump();
}

// ---- an undo the board declined --------------------------------------------------

/** @type {Array<(addr: string, origin: string) => void>} those told of each undo the board declined (`onDeclined`): a registration, which no reset clears */
const declineWatchers = [];
/**
 * Be told of each undo the board declined (D6 BM-11): its `reinstate` refused
 * as `withheld`, the source of the passage no longer the person's to read —
 * the draft, and the origin the words came from. What says the line.
 * @param {(addr: string, origin: string) => void} fn
 */
export function onDeclined(fn) { declineWatchers.push(fn); }
/** an undo the board declined (`onDeclined`), told to those watching: by D6's machine alone */
export function decline(/** @type {string} */ addr, /** @type {string} */ origin) { for (const w of declineWatchers) w(addr, origin); }

// ---- the removals the deletion face stands at -----------------------------------

/** the removals of kept text a draft's deletion face stands at (see the head), in the order made; none where none was */
export const removalsOf = (/** @type {string} */ addr) => /** @type {readonly Removal[]} */ (drafts.get(addr)?.removals ?? []);
/** every draft whose deletion face stands at a removal (`removalsOf`) */
export const removalDocs = () => [...drafts].filter(([, x]) => x.removals.length > 0).map(([addr]) => addr);
/**
 * A removal of kept text added to those a draft's deletion face stands at
 * (see the head; D6 BM-34, BM-51), numbered by the draft's count of them
 * since the page's class last changed, the first 1. Set by D6's machine.
 * @param {string} addr
 * @param {{before: ISpan[], after: ISpan[], words: string, ids: ISpan[]}} r where it was made, by the byte either side, the words removed and their bytes
 * @returns {Removal}
 */
export function addRemoval(addr, r) {
  const x = editsOf(addr), made = { id: ++x.faced, before: r.before, after: r.after, words: r.words, ids: r.ids };
  x.removals = [...x.removals, made];
  bump();
  return made;
}
/** removals of a draft's let go (`removalsOf`): those `which` names, their marks with them — the words back in the text */
export function dropRemovals(/** @type {string} */ addr, /** @type {(r: Removal) => boolean} */ which) {
  const x = drafts.get(addr);
  if (!x || !x.removals.some(which)) return;
  x.removals = x.removals.filter((r) => !which(r));
  bump();
}
/** each edit of a draft a put-back about to be added names keeps what it took (`Edit.took`), where it keeps none yet and the model holds the text it took it from */
function keepTaken(/** @type {string} */ addr, /** @type {Edits} */ x, /** @type {Edit[]} */ made) {
  const named = made.flatMap((e) => (e.back ? [e.back.of] : [])).filter((of) => x.list[of] && !x.list[of].took);
  if (!named.length || !REC.has(addr)) return;
  const took = applyEdits(baseOf(addr), x.list, idsOf(addr)).took;
  x.list = x.list.map((e, i) => (named.includes(i) && took[i] ? { ...e, took: took[i] } : e));
}

/**
 * An edit about to be added to a draft holding an island, as it is added
 * (see the head; D6 BM-19): where it places its text strictly inside an
 * island's words, or removes bytes of one, it is of that island, marked as
 * the island's burst carried it, and never sent — a removal that crosses an
 * island's edge cut there, the part outside an edit of its own, taken out
 * first where it lies after. Any other edit as it is.
 * @param {string} addr
 * @param {Edits} x
 * @param {Edit} e
 * @returns {Edit[]} the edits to add, in order
 */
function folded(addr, x, e) {
  if (!x.islands.size || !REC.has(addr)) return [e];
  const made = islandStretches(addr, x);
  const end = e.pos + e.width;
  if (!e.width) { const hit = made.find((m) => e.pos > m.pos && e.pos < m.pos + m.width); return [hit ? { ...e, island: hit.id, sent: hit.id } : e]; }
  const hits = made.filter((m) => m.pos < end && e.pos < m.pos + m.width);
  if (!hits.length) return [e];
  // the removal cut at each island's edges, from its end to its start, so each part stands where it is named as it is taken out
  /** @type {Array<{pos: number, width: number, island: number | null}>} */
  const parts = [];
  let at = e.pos;
  for (const m of hits) {
    const lo = Math.max(at, m.pos), hi = Math.min(end, m.pos + m.width);
    if (lo > at) parts.push({ pos: at, width: lo - at, island: null });
    parts.push({ pos: lo, width: hi - lo, island: m.id });
    at = hi;
  }
  if (at < end) parts.push({ pos: at, width: end - at, island: null });
  const first = parts[0];
  /** @type {Edit[]} */
  const out = parts.slice(1).reverse().map((q) => ({ pos: q.pos, width: q.width, text: '', page: null, back: null, step: e.step, ...(q.island != null ? { island: q.island, sent: q.island } : {}) }));
  out.push({ ...e, pos: first.pos, width: first.width, ...(first.island != null && !e.text && !e.back ? { island: first.island, sent: first.island } : {}) });
  return out;
}

/** where each island's words stand in the text a draft shows: each stretch of bytes an island's edits made, with its island, in the text's order */
function islandStretches(/** @type {string} */ addr, /** @type {Edits} */ x) {
  /** @type {Array<{page: number, width: number, id: number}>} */
  const pages = x.list.flatMap((e) => (e.island != null && e.page != null && e.text ? [{ page: e.page, width: byteLength(e.text), id: e.island }] : []));
  const source = applyEdits(baseOf(addr), x.list, idsOf(addr)).doc.derived?.source ?? [];
  /** @type {Array<{pos: number, width: number, id: number}>} */
  const out = [];
  for (const r of source) {
    if (r.prefix !== PAGE) continue;
    for (const p of pages) {
      const lo = Math.max(r.ordinal, p.page), hi = Math.min(r.ordinal + r.width, p.page + p.width);
      if (lo >= hi) continue;
      const pos = r.pos + (lo - r.ordinal), prev = out[out.length - 1];
      if (prev && prev.id === p.id && prev.pos + prev.width === pos) prev.width += hi - lo; else out.push({ pos, width: hi - lo, id: p.id });
    }
  }
  return out.sort((a, b) => a.pos - b.pos);
}
/** the draft last written in the page's session: the one whose edits were added last (`addEdits`); null before any edit, and after a change of the page's class */
export const lastWritten = () => last;
/** a draft's page-local edits let go: the page shows its delivered text again */
export function clearEdits(/** @type {string} */ addr) {
  const x = drafts.get(addr);
  if (!x || !x.list.length) return;
  x.list = []; x.islands.clear(); x.rev++;
  stales.delete(addr);
  bump();
}

/**
 * Edits left out of a draft's list (see the head): each edit `which` names
 * goes, a put-back of bytes one of them removed with it, and the rest are
 * placed again by the identity of the bytes each touches and of those either
 * side (M-DERIVE's `placedAgain`), so the words they made stand where they
 * stood. An island none of whose edits stays is forgotten. Nothing where the
 * model holds no record of the draft, or `which` names none.
 * @param {string} addr
 * @param {(e: Edit, i: number) => boolean} which
 * @returns {number} how many edits left
 */
export function dropEdits(addr, which) {
  const x = drafts.get(addr);
  if (!x || !x.list.some(which) || !REC.has(addr)) return 0;
  const base = baseOf(addr), was = x.list.length;
  x.list = placedAgain(base, base, x.list, (e, i) => !which(e, i), idsOf(addr)).edits;
  for (const id of [...x.islands.keys()]) if (!x.list.some((e) => e.island === id)) x.islands.delete(id);
  x.rev++;
  bump();
  return was - x.list.length;
}

/**
 * Edits a burst carried out made unsent again (`Edit.sent`): the bursts the
 * shell dropped behind a line the person discarded, which the page composes
 * afresh (D6 BM-10). Set by D6's machine.
 * @param {string} addr
 * @param {(e: Edit) => boolean} which
 */
export function unsend(addr, which) {
  const x = drafts.get(addr);
  if (!x) return;
  x.list = x.list.map((e) => (e.sent != null && e.at == null && which(e) ? { ...e, sent: null } : e));
  x.rev++;
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
/** does a draft hold an edit a burst carried out that no ack names (`markSent`, `markAcked`) — a burst out, a line held, a run the board refused — an island's apart, which no burst carries again? */
export const unacked = (/** @type {string} */ addr) => edits(addr).some((e) => e.sent != null && e.at == null && e.island == null);

// ---- the islands ----------------------------------------------------------------

/**
 * The edits a burst carried out marked an island (see the head; D6 BM-19):
 * a refusal the page keeps. Set by D6's machine as the burst's refusal is
 * answered.
 * @param {string} addr
 * @param {number} burst the machine's count of the draft's bursts
 * @param {{kind: string, name: string}} refusal
 */
export function markIsland(addr, burst, refusal) {
  const x = drafts.get(addr);
  if (!x || !x.list.some((e) => e.sent === burst)) return;
  x.list = x.list.map((e) => (e.sent === burst ? { ...e, island: burst } : e));
  x.islands.set(burst, { id: burst, name: refusal.name, kind: refusal.kind });
  x.rev++;
  bump();
}
/** the refusals the page keeps of a draft (`markIsland`), in the order refused; none where it keeps none */
export const islandsOf = (/** @type {string} */ addr) => [...(drafts.get(addr)?.islands.values() ?? [])];
/**
 * The words some of a draft's edits made (D6 BM-10, BM-19; C-321): the bytes
 * those edits made that stand in the text shown, in the text's order; where
 * they made none, the words they removed. '' where the model holds no record
 * of the draft.
 * @param {string} addr
 * @param {(e: Edit) => boolean} which
 * @returns {string}
 */
function wordsMade(addr, which) {
  const x = drafts.get(addr);
  if (!x || !REC.has(addr)) return '';
  const out = applyEdits(baseOf(addr), x.list, idsOf(addr));
  const pages = x.list.flatMap((e) => (which(e) && e.page != null && e.text ? [{ page: e.page, width: byteLength(e.text) }] : []));
  /** @type {string[]} */
  const made = [];
  for (const r of out.doc.derived?.source ?? []) {
    if (r.prefix !== PAGE) continue;
    for (const q of pages) {
      const lo = Math.max(r.ordinal, q.page), hi = Math.min(r.ordinal + r.width, q.page + q.width);
      if (lo < hi) made.push(REC.textOf(out.doc.runs, r.pos + (lo - r.ordinal), r.pos + (hi - r.ordinal)));
    }
  }
  if (made.length) return made.join('');
  return x.list.flatMap((e, i) => (which(e) && e.width > 0 && out.took[i] ? [REC.textOf(/** @type {import('../model/frames.js').Run[]} */ (out.took[i]?.runs), 1, e.width + 1)] : [])).join('');
}
/** an island's words (`wordsMade`): what "copy these words out" copies at its face */
export const islandWords = (/** @type {string} */ addr, /** @type {number} */ id) => wordsMade(addr, (e) => e.island === id);
/** the words a burst of a draft carried (`wordsMade`), by the machine's count of its bursts: what "copy these words out" copies at a refused run's face */
export const burstWords = (/** @type {string} */ addr, /** @type {number} */ burst) => wordsMade(addr, (e) => e.sent === burst && e.island == null);
/**
 * An island discarded (see the head; D6 BM-19): its edits leave the list —
 * the words it made leave the text shown, the words it removed return — and
 * nothing is sent.
 * @param {string} addr
 * @param {number} id
 */
export function discardIsland(addr, id) { dropEdits(addr, (e) => e.island === id); }
/**
 * An island's edits made an open burst again (see the head; D6 BM-20): the
 * marks of the island and of the burst that carried them taken off, the
 * island forgotten. Set by D6's machine as it sends a waiting change itself.
 * @param {string} addr
 * @param {number} id
 */
export function reopenIsland(addr, id) {
  const x = drafts.get(addr);
  if (!x || !x.islands.has(id)) return;
  x.list = x.list.map((e) => { if (e.island !== id) return e; const { island, ...rest } = e; void island; return { ...rest, sent: null }; });
  x.islands.delete(id);
  x.rev++;
  bump();
}
/**
 * A draft's edits as the board is to hold them (see the head; D6 BM-19):
 * every island left out, the rest placed again by identity (M-DERIVE's
 * `placedAgain`) — positions past an island's words less their width, past a
 * removal of one counted back in — and the first of them no burst has
 * carried out. The list itself where the draft keeps no island.
 * @param {string} addr
 * @returns {{edits: readonly Edit[], from: number}}
 */
export function boardEdits(addr) {
  const x = drafts.get(addr), list = x ? x.list : [];
  const out = x && x.islands.size && REC.has(addr) ? placedAgain(baseOf(addr), baseOf(addr), list, (e) => e.island == null, idsOf(addr)).edits : list;
  const i = out.findIndex((e) => e.sent == null);
  return { edits: out, from: i < 0 ? out.length : i };
}

// ---- the held lines this window did not send ------------------------------------

/**
 * The record a draft's edits apply over (see the head; D6 BM-29): the
 * model's, with the held lines this window did not send applied in the order
 * listed (M-DERIVE's `applyHeld`), each insert's bytes named by the page's
 * ordinals; the model's own where the draft holds no such line. Made again
 * where the model's record or the lines moved.
 * @param {string} addr
 * @returns {Doc}
 */
export function baseOf(addr) {
  const d = REC.doc(addr), x = drafts.get(addr);
  if (!x || !x.lines.length) return d;
  const key = `${d.rev}:${d.from}:${d.to}:${x.lines.map((l) => l.row.held).join(',')}:${REC.mintsOf(addr)}`;
  if (!x.base || x.base.key !== key) {
    const rows = x.lines.map((l) => l.row), out = applyHeld(d, rows, (a) => (REC.has(a) ? REC.doc(a) : null), heldNames(addr));
    x.base = { key, doc: out.doc, stopped: out.stopped ? rows.slice(out.applied) : [] };
  }
  return x.base.doc;
}
/** the held lines of a draft this window did not send that its text does not hold (`baseOf`): the one the apply stopped at, and every line after it; none where all apply */
export function unapplied(/** @type {string} */ addr) {
  const x = drafts.get(addr);
  if (!x || !x.lines.length || !REC.has(addr)) return [];
  baseOf(addr);
  return x.base ? x.base.stopped : [];
}
/**
 * The page's names for a draft's held lines' inserted bytes (see the head;
 * M-DERIVE's `Named`): for the line of an ordinal, its bytes in order, by
 * the page's ordinals of the draft — drawn the first time the line is named
 * and kept — as the model names them now, an address where the board minted
 * them (M-REC's `pageIds`).
 * @param {string} addr
 * @returns {import('../model/derive.js').Named}
 */
export function heldNames(addr) {
  return (held, width) => { const n = nameOf(addr, held, width); return n ? REC.pageIds(addr, n.page, n.width) : []; };
}
/**
 * The page's ordinals for a held line's inserted bytes (`heldNames`): drawn
 * where `width` is given and the line holds none yet; null where it holds
 * none and none is drawn.
 * @param {string} addr
 * @param {number} held the line's ordinal
 * @param {number} [width] how many bytes the line inserts
 * @returns {{page: number, width: number} | null}
 */
export function nameOf(addr, held, width) {
  const x = width ? editsOf(addr) : drafts.get(addr);
  if (!x) return null;
  let n = x.names.get(held);
  if (!n && width) { n = { page: x.next, width }; x.next += width; x.names.set(held, n); }
  return n && (!width || n.width === width) ? n : null;
}
/** the held lines of a draft this window did not send, as they stand (`setReopened`), those landed and not yet read among them */
export const reopened = (/** @type {string} */ addr) => (drafts.get(addr)?.lines ?? []).map((l) => ({ row: l.row, at: l.at }));
/**
 * The held lines of a draft this window did not send, set (see the head; D6
 * BM-29) from `held(session)`'s rows for it: each kept by its ordinal as it
 * stood, each new one taken, in the rows' order; one standing that the rows
 * no longer list has left the store kept, and is applied until the next read
 * sets the text. Set by D6's machine.
 * @param {string} addr
 * @param {readonly HeldLine[]} rows
 */
export function setReopened(addr, rows) {
  const x = rows.length ? editsOf(addr) : drafts.get(addr);
  if (!x) return;
  const was = x.lines, listed = new Set(rows.map((r) => r.held));
  const gone = was.filter((l) => !listed.has(l.row.held)).map((l) => ({ row: l.row, at: l.at ?? 0 }));
  const next = [...gone, ...rows.map((r) => ({ row: { ...r }, at: null }))];
  if (next.length === was.length && next.every((l, i) => l.row.held === was[i].row.held && l.at === was[i].at)) return;
  x.lines = next.sort((a, b) => a.row.held - b.row.held); x.base = null; x.rev++;
  bump();
}
/** a held line of a draft this window did not send, landed (`setReopened`): applied until a read answered at or past `at` sets the text; 0 where no position was told */
export function landReopened(/** @type {string} */ addr, /** @type {number} */ held, /** @type {number} */ at) {
  const x = drafts.get(addr), l = x ? x.lines.find((q) => q.row.held === held) : undefined;
  if (!x || !l) return;
  l.at = at; x.rev++;
  bump();
}
/** held lines of a draft this window did not send, dropped by the person (`setReopened`): their words leave the text shown at once */
export function dropReopened(/** @type {string} */ addr, /** @type {readonly number[]} */ helds) {
  const x = drafts.get(addr);
  if (!x || !x.lines.some((l) => helds.includes(l.row.held))) return;
  x.lines = x.lines.filter((l) => !helds.includes(l.row.held)); x.base = null; x.rev++;
  bump();
}

// ---- why a board's drafts cannot be written now ---------------------------------

/**
 * Why a draft cannot be written now (see the head): the reason standing for
 * its board — the page's board, which every draft it shows is on; null where
 * none stands.
 * @param {string} addr
 * @returns {Unwritable | null}
 */
export function unwritable(addr) {
  void addr;
  const b = REC.board();
  return (b && blocks.get(b.board)) || null;
}
/**
 * Why a board's drafts cannot be written now, set, or lifted with null
 * (`unwritable`): set by D6's machine alone, and by the gate's hook.
 * @param {string} board
 * @param {Unwritable | null} why
 */
export function setUnwritable(board, why) {
  const was = blocks.get(board);
  if ((!why && !was) || (why && was && why.why === was.why && (why.detail ?? null) === (was.detail ?? null))) return;
  if (why) blocks.set(board, { why: why.why, detail: why.detail ?? null }); else blocks.delete(board);
  bump();
}

// ---- the moved verdict's first key ----------------------------------------------

/** a moved verdict stands on a draft, or stands no more (D6 BM-18): set by D6's machine as the verdict arrives and as it lifts */
export function setMoved(/** @type {string} */ addr, /** @type {boolean} */ on) { if (on) movedUntold.add(addr); else movedUntold.delete(addr); }
/** the first key typed in a draft since a moved verdict came to stand on it (D6 BM-18): true once per verdict, as the key is typed */
export function takeMovedKey(/** @type {string} */ addr) { return movedUntold.delete(addr); }

/** a draft's burst as it was typed, where the text set under it does not place it (see the head; D6 BM-57); null where every unsent edit stands placed */
export const staleOf = (/** @type {string} */ addr) => stales.get(addr) ?? null;
/** a draft's burst as it was typed, let go (`staleOf`): composed and dialed, or its edits gone */
export function clearStale(/** @type {string} */ addr) { stales.delete(addr); }

/** does a text hold, at the same positions, every position another held — a read that widened it, or set it again unchanged, moved nothing under what stood? True where the other held none */
const holdsAsStood = (/** @type {Doc} */ now, /** @type {Doc} */ was) => was.from < 0 || (now.from >= 0 && now.from <= was.from && now.to >= was.to && REC.textOf(now.runs, was.from, was.to) === REC.textOf(was.runs, was.from, was.to));

/**
 * A draft's text is about to be set again or let go (M-REC's `beforeText`):
 * the record its edits apply over and the edits, as they stand, are kept
 * until the read that sets it again (`rebase`) — the first such, where the
 * text goes and comes back.
 * @param {string} addr
 */
function leavingText(addr) {
  const x = drafts.get(addr);
  if (!x || (!x.list.length && !x.lines.length) || snaps.has(addr)) return;
  const base = baseOf(addr);
  snaps.set(addr, { base: base.derived ? base : { ...base }, list: x.list });
  x.base = null;
}

/**
 * A draft's words rebased as a read sets its text (see the head; M-REC's
 * `onText`): the held lines this window did not send that landed at or
 * before the position the read was answered at leave, and the leading edits
 * acked at or before it — save one a put-back that stays names, which stays
 * as the record of what it took and changes nothing (`Edit.based`) — and
 * every put-back that stays names its edit by its place in the list as it
 * now stands. Where the text shown then holds otherwise what the text shown
 * before the set held, the edits that stay are placed again in the new text
 * by identity (`carried`). Where it does not, each byte of an edit that left which no
 * ack minted is minted from the read (`mintFromRead`). Nothing leaves where
 * the read said no position.
 * @param {string} addr
 * @param {number | null} asOf the position the read was answered at
 */
function rebase(addr, asOf) {
  const x = drafts.get(addr), was = snaps.get(addr);
  snaps.delete(addr);
  if (!x || (!x.list.length && !x.lines.length)) return;
  const list = x.list;
  let n = 0;
  if (asOf != null) while (n < list.length) { const at = list[n].at; if (at == null || at > asOf) break; n++; }
  const landed = asOf == null ? [] : x.lines.filter((l) => l.at != null && l.at <= asOf);
  if (landed.length) { x.lines = x.lines.filter((l) => !landed.includes(l)); x.base = null; }
  /** @type {boolean[]} the held edits a put-back that stays names */
  const named = list.map(() => false);
  for (let i = list.length - 1; i >= n; i--) { const b = list[i].back; if (b) named[b.of] = true; }
  const stays = (/** @type {number} */ i) => i >= n || named[i];
  /** an edit as it stays: one the read holds, kept for its put-back, applied to nothing */
  const as = (/** @type {Edit} */ e, /** @type {number} */ i) => (i < n ? { ...e, based: true, back: null } : e);
  /** @type {Map<number, number>} where each edit that stays stands in the list as rebased */
  const index = new Map();
  /** @type {Edit[]} */
  const out = [];
  for (const [i, e] of list.entries()) {
    if (!stays(i)) continue;
    index.set(i, out.length);
    out.push(as(e, i));
  }
  const kept = out.map((e) => (e.back ? { ...e, back: { ...e.back, of: index.get(e.back.of) ?? e.back.of } } : e));
  if (!n && !landed.length && !was) return;
  const ids = idsOf(addr);
  // the text shown before the set and after it: the same where the read holds only what left
  const before = was ? applyEdits(was.base, was.list, ids) : null, base = baseOf(addr);
  const same = !before || holdsAsStood(applyEdits(base, kept, ids).doc, before.doc);
  if (same) {
    x.list = kept;
    if (before && was) mintFromRead(addr, was.list.filter((_e, i) => !stays(i)), landed, before.doc, asOf);
  } else if (was) carried(addr, x, was, stays, as);
  x.rev++;
  bump();
}

/**
 * A draft's edits placed again in a text another writer changed (see the
 * head; D6 BM-56, BM-57): each edit that stays set in the record as read, by
 * the identity of the bytes it touches and of those either side as the
 * record it was made over named them (M-DERIVE's `placedAgain`). Where one
 * no burst has carried out is not placed exactly, the burst is kept as it
 * was typed (`staleOf`), the record it was typed over with it.
 * @param {string} addr
 * @param {Edits} x
 * @param {{base: Doc, list: Edit[]}} was the record and the edits as they stood before the set
 * @param {(i: number) => boolean} stays
 * @param {(e: Edit, i: number) => Edit} as
 */
function carried(addr, x, was, stays, as) {
  const ids = idsOf(addr);
  const out = placedAgain(was.base, baseOf(addr), was.list, (_e, i) => stays(i), ids, as);
  x.list = out.edits;
  const from = was.list.findIndex((e) => e.sent == null);
  if (from >= 0 && out.adrift.some((i) => out.edits[i].sent == null)) stales.set(addr, { doc: was.base, edits: was.list, from });
}

/**
 * Bytes the page made that a read holds and no ack minted, minted from the
 * read (see the head; D6 BM-29's landing with no address): for each edit
 * that left the list, and each held line this window did not send that left,
 * the bytes it made stand in the text shown where they stood before the set
 * — the text shown being unchanged — and the record as read names them
 * there. Nothing where it names none, or the page's own name still.
 * @param {string} addr
 * @param {Edit[]} left the edits that left
 * @param {Reopened[]} landed the held lines that left
 * @param {Doc} before the text shown before the set
 * @param {number | null} asOf the position the read was answered at
 */
function mintFromRead(addr, left, landed, before, asOf) {
  if (asOf == null) return;
  const x = drafts.get(addr), now = REC.doc(addr), space = REC.pageSpace(addr);
  /** @type {Array<{page: number, width: number}>} */
  const runs = left.flatMap((e) => (e.page != null && e.text ? [{ page: e.page, width: byteLength(e.text) }] : []));
  for (const l of landed) { const n = x ? x.names.get(l.row.held) : undefined; if (n) runs.push(n); }
  for (const r of runs) {
    for (const id of REC.pageIds(addr, r.page, r.width)) {
      if (id.prefix !== space) continue;
      for (const at of REC.placedIn(before.image, [id])) {
        // the page's ordinal standing at the stretch's first position, read back through the text shown before the set
        const first = REC.identityIn(before.image, at.pos, 1)[0];
        const named = REC.identityIn(now.image, at.pos, at.width);
        if (!first || named.length !== 1 || REC.isPage(named[0].prefix)) continue;
        REC.mint(addr, first.ordinal, at.width, `${named[0].prefix}.${named[0].ordinal}`, asOf);
      }
    }
  }
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
/** every draft holding a line `held(session)` listed (`setHeld`) */
export const heldDocs = () => [...held.keys()];

/** D6's machine handed in, or taken out with null (see the head): what `commit` and `leaving` ask, and what `addEdits` and `endRun` tell */
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
 * @returns {boolean} whether the machine posted the page's close, carrying the words it had not dialed — at `unload` alone; false where it posted none, no machine standing or no session, the page's close then the caller's to post where a session stands
 */
export function leaving(how) { return handed ? handed.leaving(how) : false; }
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
  kept.clear(); drafts.clear(); held.clear(); flights.clear(); blocks.clear(); snaps.clear(); stales.clear(); movedUntold.clear(); handed = null; last = null; revision = 0;
}
