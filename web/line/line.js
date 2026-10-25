// L-LINE — the one line (the structure record §3.2; foundations §3.1, §3.3;
// S-9 (a)). Layer 2. Engine-bound. A control rebuilt from state (FP-13).
// State: the transient segment and its expiry (the next act), the act
// holding the line's one Tab stop (`stop`), the last render's words that are
// said once as they arrive, and when the page's class last changed with its
// message not yet said (`changedAt`).
// The line is the page's toolbar, named as it attaches (`L.the-line`), and
// one Tab stop (D5 §1.3, K-22; §4 rule 5): its acts hold a roving stop — the
// act last stood on, else the first that takes the focus — ← and → move
// among them (`step`), Enter and Space press the one stood on, each a native
// button (rule 14). Its segments, left to right: the acts — Back, Forward,
// the trail's list — each told whether a key made it by the focus owner's
// one reading (FP-20); the address display (R6; `addressDisplay`), naming
// the level the camera's scale reads (foundations §2.2): the board at far
// scale, with `B1.clamp` at WHOLE BOARD; the account under the camera at mid
// (B1-S2), whatever the walk stands on; nearer, the walk's own place — board
// › account › document, the document the walk stands in named by the version
// its box shows, its marker lit at a pinned version (FP-22; foundations
// §3.2) — or, where the walk stands on an account or the board, that place
// as mid scale names it, the document's fields blank; where no board is held
// `L.go-to-address` alone, at every scale (FP-35). The places it names are
// the plane's running head (`named`; FP-26): the plane's labels and T-LAYER's
// held labels read them through the reader the app hands in, so none of them
// holds a label below the line. The address segment is one width at every
// scale and focus: the widest words it names (`WORDS_CH`), then the strip's
// room and the marker's (the style's), its content clipped past it; where no
// document is named its position's slot, strip and marker stand empty, their
// room kept, so nothing after it on the line moves. The position's slot
// (`slot`): a position named only where the document holds text the reader
// may read — none at a document a read refused, a covered one among them
// (FP-29) — and stands at its own reading scale (T-LAYER's `atReadingScale`,
// the one test the press rule and the walk's grain read too), the one a
// landing named inside the focused span (N-WALK's `landedAt`), else the
// span's own first; below that scale the slot stands empty, as wide as the
// document's widest position and its strip. The strip (`strip`) marks the
// position, or, while the walk keeps its document in view with the view's
// centre off its region (N-WALK's `kept`), the view's window over it
// (T-LAYER's `windowIn`), open at whichever end the view has run past; where
// an arrival in several runs stands in that document, each run is an
// outlined extent along it, the one the landing stands at filled (FP-21;
// N-GO's landing, through the reader the app hands in); the strip's act
// (K-23; `stripAct`) quotes the position and the passage's first words. The
// version marker beside it: ○ at the bare address, ● at a pinned member. The
// segment is LEAP's box's act (a click, Enter or Mod+L; the chord drawn for
// the platform in its title, rule 19), which opens holding the address the
// display names (K-30; `currentAddress`), so the box never opens on a place
// the line does not show, and empty where no board is held.
// The acting-as segment (`actingSegment`), its state among foundations §3.3's
// seven: state 2 through the signed session, the one a write may go out
// under (`F.acting-as`), its device label a slot (FP-34; `deviceSlot`) —
// the label of the key the session was opened with (M-REC's `device`), read
// with the session, else why it names none, never the template's token;
// state 3 through the keyless session for reading alone (`F.keyless-session`;
// §3.3 state 3, E16 (a′)) — the session's own `writes` deciding which, never
// a key bound at this board; state 1 where no session stands on the board
// the page holds (`B1.guest-line`, the board's origin and the venue; its one
// act sign-in, the session's refusal beside it, state 3 where the refusal
// was `no_key`); where no board is held, none of the seven: why, as O-FACES'
// one entry says it (`noBoardWords`; FP-35), in the guest line's place — at
// an empty list `F.unclaimed`, the doors' act, inert, saying beginning a
// notebook isn't built yet as it is pressed; at a list refused its words and,
// where a retry may tell, `B1.try-again`, the list read again (the app's
// act); the death arm where the session died (O-FACES's `deathWords`, the
// guest line's in their place for an arm this page holds none for, "signed
// out" the `closed` arm's alone) — never at a restart (client.md §4b.2): a
// session the shell re-opened M-PUMP takes in the ended one's place, and one
// it re-opened none of M-PUMP's acquire asks for again (FP-28) — past a
// second still out `L.reconnecting` in the segment's place, the session's
// state kept; back, the segment as it stood; refused, the guest state boot
// shows for that refusal, led by `L.reconnect-refused`. The daemon's segment
// (`daemonSegment`): silent while the board runs; its stopped, unreachable
// and halted-writes forms where it does not. A jump's face out of view
// (FP-25): the words of a jump's face whose document stands out of the
// visible view, in a segment of their own while the plane hides the face
// (O-HOST's `aside`, read through the reader the app hands in), said already
// through the status region as the face was shown. A walk's folded moment
// (FP-28, FP-20; `walkSegments`): after the acting-as segment, one segment
// for each walk whose moment stands folded — its walk, its step and that it
// waits on the reader (O-FACES' `folded`), said through the status region as
// it folds — its act, inside the line's one stop, unfolding it (O-FACES'
// `unfold`); short of room every other segment is cut first, the address's
// last, and the walk's never (the style's). The transient segments (the
// swallow line K-9; the mode line C-31 where the pair flipped) stand until
// the next act (`act`), or a change of the page's class, which takes one
// quoting what the class it left read down with it (`classChanged`).
// The rebuild keeps the focus (rule 11; `render`): the line is rebuilt
// whenever its words change — every frame of a flight — and the act that held
// the focus has it back by its `data-act`, through the focus's owner; an
// overlay standing at Back (the trail's list) or at sign-in (the session's
// face) finds its act again by the act's id (O-HOST's anchor). What a screen
// reader is told (D4): a transient segment and the mode line politely; the
// session's death, a session a restart lost that the acquire could not get
// back, and halted writes assertively, once as they arrive — nothing while
// it reconnects nor as it returns — through the one status region; a change
// of the page's class is said once (FP-29), as the reads it asked answer
// (M-PUMP's `rereading`), UNREACHED_MS at the most after it: the ending's
// words, then the documents it covered (M-REC's `coveredDocs`), the first
// COVERED_NAMED by address and the rest counted — never the ending alone
// first. Every address the line sets stands in the identifier's face — the
// address segment's, the account its session words name, one in the words
// another module hands it (ST's `addressedHTML`) — and its other words in
// the interface face (P-REG's FACE). The chip is no segment (ux-T2: the document's corner).
// Rules: FP-1, FP-2, FP-10, FP-13, FP-20, FP-21, FP-22, FP-25, FP-26, FP-28,
// FP-29, FP-34, FP-35.

import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as TRAIL from '../nav/trail.js';
import * as WALK from '../nav/walk.js';
import * as FOCUS from '../nav/focus.js';
import * as LAYER from '../text/layer.js';
import * as PORT from '../bridge/port.js';
import { deathWords, noBoardWords } from '../overlays/faces.js';
import { drawChord } from '../nav/keys.js';
import { cam, viewForCell } from '../plane/camera.js';
import { lodOf } from '../plane/lod.js';
import { boardCell, accountAt, G, LEAF, DEPTH_SOUND } from '../plane/projection.js';
import { memberOf, boardOf, accountOf, documentOf } from '../model/address.js';
import { t, tHTML, addressedHTML } from '../strings.js';
import { esc } from '../util.js';

/** @type {HTMLElement | null} */
let el = null;
/** @type {{html: string, id: string} | null} */
let transientSeg = null;
let lastHTML = '';
let lastMode = /** @type {string | null} */ (null);
let lastTrust = /** @type {boolean | null} */ (null);
/** the acting segment's assertive words at the last render, said once as they arrive (`Acting.alarm`); '' where none stood, null before the first render, whose words are no news */
let lastAlarm = /** @type {string | null} */ (null);
/** the daemon's halted writes at the last render, said once */
let lastHalted = false;
/** when the page's class last changed, its one message not yet said (`classChanged`); null where none waits */
let changedAt = /** @type {number | null} */ (null);
/** the documents the change's message names at the most, the rest counted */
const COVERED_NAMED = 5;
/** the act holding the line's one Tab stop (K-22), by its `data-act` */
let stop = 'back';
/**
 * @typedef {Object} Acts — the line's acts, and what it reads of the owners that import it, handed in once by the app (FP-10, FP-11)
 * @property {(byKey: boolean) => void} open the address segment's act: the LEAP box
 * @property {(byKey: boolean) => void} back
 * @property {(byKey: boolean) => void} forward
 * @property {(byKey: boolean) => void} trailList
 * @property {(el: HTMLElement) => void} signIn
 * @property {() => void} [again] the board list's "try again", where it was refused retry-class: the list read again (O-FACES' `tryBoardsAgain`)
 * @property {() => ({id: string, text: string} | null)} [aside] a jump's face standing out of the visible view: its string's id and its words (O-HOST's `aside`); null where none stands so
 * @property {() => (Pieces | null)} [pieces] the runs of an arrival in several, in the document landed in (N-GO's landing); null where none stands
 * @property {() => Array<{key: string, words: string}>} [walks] the walks' folded moments, each its walk and its segment's words (O-FACES' `folded`)
 * @property {(key: string, byKey: boolean) => void} [walk] a walk's segment's act: its moment unfolded (O-FACES' `unfold`)
 */

/** @typedef {{addr: string, runs: Array<{pos: number, width: number}>, current: number}} Pieces the runs of an arrival in several, the one the landing stands at by index */
/** @type {Acts | null} */
let acts = null;

/** @param {HTMLElement} e @param {Acts} a */
export function attach(e, a) {
  el = e; acts = a;
  el.setAttribute('aria-label', t('L.the-line'));
  el.addEventListener('click', (ev) => {
    const b = /** @type {HTMLElement} */ (ev.target).closest('button[data-act]'); if (!b || !acts) return;
    const which = /** @type {HTMLElement} */ (b).dataset.act;
    const byKey = FOCUS.byKey(ev);
    if (which === 'back') acts.back(byKey); else if (which === 'forward') acts.forward(byKey); else if (which === 'address') acts.open(byKey); else if (which === 'trail') acts.trailList(byKey); else if (which === 'signin') acts.signIn(/** @type {HTMLElement} */ (b));
    else if (which === 'unclaimed') transient(t('L.no-notebook-yet'), 'L.no-notebook-yet');
    else if (which === 'again') { if (acts.again) acts.again(); }
    else if (which && which.startsWith(WALK_ACT) && acts.walk) acts.walk(which.slice(WALK_ACT.length), byKey);
    ev.stopPropagation();
  });
  // the stop follows the focus: the act a Tab or a press lands on is the one the ring returns to
  el.addEventListener('focusin', (ev) => {
    const b = /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (ev.target).closest('button[data-act]'));
    if (b && b.dataset.act && b.dataset.act !== stop) { stop = b.dataset.act; roving(); }
  });
}

/** the line's acts that take the focus now, in order */
function actsNow() { return el ? /** @type {HTMLButtonElement[]} */ ([...el.querySelectorAll('button[data-act]')]).filter((b) => !b.disabled) : []; }

/** the one stop (K-22): the act stood on at tabindex 0, every other act out of the order */
function roving() {
  if (!el) return;
  const live = actsNow();
  if (!live.some((b) => b.dataset.act === stop)) stop = live[0] ? live[0].dataset.act || stop : stop;
  for (const b of /** @type {HTMLButtonElement[]} */ ([...el.querySelectorAll('button[data-act]')])) b.tabIndex = b.dataset.act === stop && !b.disabled ? 0 : -1;
}

/**
 * ← / → in the line (K-22): the stop moves to the act before or after the
 * one the focus stands on, which takes the focus through the focus's owner.
 * @param {1 | -1} dir
 * @returns {boolean} an act took the move
 */
export function step(dir) {
  const live = actsNow();
  if (!live.length) return false;
  const i = live.findIndex((b) => b === document.activeElement);
  const n = live[Math.max(0, Math.min(live.length - 1, (i < 0 ? 0 : i) + dir))];
  stop = n.dataset.act || stop; roving();
  FOCUS.land(n, { byKey: true });
  return true;
}

/** a transient segment until the person's next act, said through the one status region */
export function transient(/** @type {string} */ text, id = 'transient') { transientSeg = { html: addressedHTML(text), id }; FOCUS.say(text); render(true); }
/** the next act clears the transient segment */
export function act() { if (transientSeg) { transientSeg = null; render(true); } }
/**
 * A change of the page's class (see the head; FP-23, FP-29), told by the app
 * as M-PUMP tells the drop of every record: the transient segment taken down
 * — the strip's act quotes the text it was made at — and the change's one
 * message held until the reads it asked answer (`render`).
 */
export function classChanged() { transientSeg = null; changedAt = performance.now(); render(true); }

/**
 * The change's one message (see the head): the ending's words, then the
 * documents the change covered, the first COVERED_NAMED by address and the
 * rest counted — the ending's alone where it covered none.
 * @param {string} ending the acting-as segment's words for the ending
 * @returns {string}
 */
function endingSaid(ending) {
  const docs = REC.coveredDocs();
  if (!docs.length) return ending;
  const named = docs.slice(0, COVERED_NAMED).join(', ') + (docs.length > COVERED_NAMED ? ' ' + t('F.others-count', { n: docs.length - COVERED_NAMED }) : '');
  return t('L.covered', { ending, documents: named });
}

/**
 * @typedef {Object} AddressDisplay — what the address segment names at the camera's scale (foundations §2.2)
 * @property {string} text the segment's words: the place, then the position where one is named
 * @property {string} place the place's words — the board, the account, or board › account › document — before the position's slot
 * @property {number} slot the position's slot, in characters: as many as the document's widest position takes in its words, standing empty below the document's reading scale; 0 where no document is named
 * @property {string} addr the address named — the board, the account under the camera at mid, nearer the account or the board the walk stands on, or the document the walk stands in (its member where one is pinned): the LEAP box's prefill; '' where no board is held
 * @property {string | null} doc the document named, nearer than mid
 * @property {number | null} pos the position named inside it, at the document's own reading scale alone
 * @property {number | null} member the version member pinned
 * @property {boolean} whole the whole board is in view, at WHOLE BOARD's clamp
 * @property {import('../plane/layout.js').Window | null} window the view's window over the document named, the strip's mark where the walk keeps it in view off the view's centre (N-WALK's `kept`); null where it is not kept, no position is named, or no line in view names one
 */

/** the address the display names: the LEAP box's prefill, so the box opens holding what the line shows (K-30) */
export function currentAddress() { return addressDisplay().addr; }

/**
 * @typedef {Object} Named — the places the address display names (FP-26): the line is their running head, so none of them holds a label below it
 * @property {string} board the board named; '' where no board is held (FP-35)
 * @property {string | null} account the account named — under the camera at mid, the walk's own nearer — null where none is
 * @property {string | null} doc the document named nearer than mid, by its box: the address every version of it shares; null where none is
 */

/**
 * The places the address display names (`addressDisplay`; FP-26): its board,
 * the account it names and the
 * document it names, by its box — read by the plane's labels and T-LAYER's
 * held labels, through the reader the app hands in, so a place the line
 * names holds no label below it.
 * @returns {Named}
 */
export function named() {
  const a = addressDisplay(), doc = a.doc ? documentOf(a.doc) || a.doc : null;
  return { board: boardOf(a.addr), account: accountOf(a.addr), doc };
}

/** the position's words in its slot — ` › position ⟨p⟩` — and none where no position is named */
const positionWords = (/** @type {number | null} */ p) => (p != null ? ' › ' + t('F.position', { p }) : '');

/**
 * The widest words the address segment names, in characters of the line's
 * face (see the head): board › account › document — a sub-account's
 * document at the deepest continuation the projection places soundly
 * (P-PROJ's DEPTH_SOUND), a member pinned — then the position's words at a
 * run of ten million positions. The style adds the strip's room and the
 * marker's.
 */
const WORDS_CH = (() => {
  const acct = `1.0.${G[3] * G[3] - 2}.${G[4] * G[4] - 2}`, doc = `${acct}.0.${(G[LEAF] * G[LEAF] - 1) * (DEPTH_SOUND + 1)}.99`;
  return `1 › ${acct} › ${doc}`.length + positionWords(9999999).length;
})();

/**
 * The address display: the level the camera's scale reads (foundations
 * §2.2) — at far scale the board; at mid the account under the camera
 * (B1-S2), whatever the walk stands on; nearer the walk's own place: the
 * document it stands in, and the position only where that document stands at
 * its own reading scale (T-LAYER's `atReadingScale`), its slot standing
 * empty below it, the strip's window where the walk keeps the document in
 * view off the view's centre; or the account or the board it stands on, named
 * as at mid; the account under the camera where it stands nowhere.
 * Where no board is held, at every scale, "go to an address" alone, naming
 * no place (FP-35).
 * @returns {AddressDisplay}
 */
export function addressDisplay() {
  if (!REC.board()) { const text = t('L.go-to-address'); return { text, place: text, slot: 0, addr: '', doc: null, pos: null, member: null, whole: false, window: null }; }
  const lod = lodOf(cam.scale);
  if (lod.name === 'far' || lod.name === 'far~mid') {
    const whole = cam.scale <= viewForCell(boardCell('1'), 0.92).scale * 1.02;
    const text = '1' + (whole ? ' · ' + t('B1.clamp') : '');
    return { text, place: text, slot: 0, addr: '1', doc: null, pos: null, member: null, whole, window: null };
  }
  const f = WALK.current(), nearer = lod.name === 'near' || lod.name === 'mid~near';
  if (f && nearer && (f.kind === 'block' || f.kind === 'document' || f.kind === 'link')) {
    const place = `${boardOf(f.addr)} › ${accountOf(f.addr)} › ${f.addr}`;
    // a document a read refused — withheld, a covered one among them, or nothing the board will say of it — holds no position to name
    const pos = !REC.doc(f.addr).refused && LAYER.atReadingScale(f.addr) ? WALK.landedAt() ?? f.pos ?? 1 : null;
    const widest = Math.max(1, REC.doc(f.addr).extent || 0, pos || 0);
    const win = pos != null && WALK.kept() ? LAYER.windowIn(f.addr) : null;
    return { text: place + positionWords(pos), place, slot: positionWords(widest).length, addr: f.addr, doc: f.addr, pos, member: memberOf(f.addr), whole: false, window: win };
  }
  // nearer than mid the account or the board the walk stands on; at mid, or where it stands nowhere, the account under the camera
  const acct = f && nearer && (f.kind === 'account' || f.kind === 'board') ? (f.kind === 'account' ? f.addr : null) : accountAt(cam.x, cam.y, '1');
  const text = acct ? `1 › ${acct}` : '1';
  return { text, place: text, slot: 0, addr: acct || '1', doc: null, pos: null, member: null, whole: false, window: null };
}

/** the sign-in act, the guest's and the death arm's: its id names it across the line's rebuilds, as Back's does, so the session's face standing at it finds it again (O-HOST's anchor) */
const SIGN_IN = `<button id="line-signin" data-act="signin">${esc(t('F.sign-in'))}</button>`;

/** a walk's segment's act, before the walk it unfolds: its `data-act`, by which the line's one stop and a rebuild find it again */
const WALK_ACT = 'walk:';

/** the walks' segments (see the head): one for each walk's folded moment, its act unfolding it, never cut short of room */
function walkSegments() {
  const folded = acts && acts.walks ? acts.walks() : [];
  return folded.map((w) => `<span class="sep">│</span><button class="seg walk" data-act="${esc(WALK_ACT + w.key)}" data-string="L.walk.waits">${esc(w.words)}</button>`).join('');
}

/** the account a session's words name, set in the identifier's face (P-REG's FACE; ST's `tHTML`) */
const ACCOUNT = /** @type {const} */ ({ account: 'id' });

/**
 * A string's words on either side of one of its tokens left unfilled — the
 * place a slot stands in the line (FP-34), so the token itself never reaches
 * the page; null where the string holds no such token.
 * @param {string} text the string, every other token filled — or its markup (ST's `tHTML`)
 * @param {string} token the token's name, without its brackets
 * @returns {[string, string] | null}
 */
function aroundToken(text, token) {
  const mark = '⟨' + token + '⟩', i = text.indexOf(mark);
  return i < 0 ? null : [text.slice(0, i), text.slice(i + mark.length)];
}

/**
 * The device label's slot (FP-34): the label of the key this device opened
 * the session with (M-REC's `device`) — the store read with the session, so
 * it is never an empty box — else why it names none, in that cause's words:
 * the key carries no label; the store was not read; the session does not
 * name its key among the several it may have been opened with. Named by its
 * role and what it shows.
 * @param {import('../model/records.js').DeviceKey | import('../model/records.js').DeviceCause | null} dev
 * @returns {{shows: string, html: string}}
 */
function deviceSlot(dev) {
  const cause = !dev || 'cause' in dev ? (dev && dev.cause === 'store-unread' ? 'L.slot.store-unread' : 'L.slot.key-untold') : dev.label ? '' : 'L.slot.unlabelled';
  const shows = cause ? t(cause) : dev && 'label' in dev && dev.label ? dev.label : '';
  return { shows, html: `<span class="slot" data-slot="label"${cause ? ` data-string="${cause}"` : ''} role="img" aria-label="${esc(t('L.slot.named', { role: t('L.slot.device-label'), shows }))}">${esc(shows)}</span>` };
}

/**
 * @typedef {Object} Acting — the acting-as segment (`actingSegment`)
 * @property {string} html
 * @property {number} state its state among foundations §3.3's seven; 0 for none of them — no adapter, no board held
 * @property {string} words its words, what the status region says where they are said
 * @property {boolean} alarm its words said assertively once as they arrive (D4): the session's death, and a session a restart lost that M-PUMP's acquire could not get back
 */

/** the board list's "try again" (see the head): its id names it across the line's rebuilds, as sign-in's does */
const AGAIN = `<button id="line-again" data-act="again">${esc(t('B1.try-again'))}</button>`;

/**
 * The acting-as segment where no board is held (see the head; FP-35): why,
 * as O-FACES' one entry says it (`noBoardWords`), in the guest line's place,
 * naming no venue, origin, claimant or sign-in — at an empty list
 * `F.unclaimed`, the doors' act, inert in this build, saying so as it is
 * pressed; at a list refused its words, and "try again" beside them where a
 * retry may tell; nothing while the list has not answered. None of §3.3's
 * seven states.
 * @returns {Acting}
 */
function noBoardSegment() {
  const w = noBoardWords();
  if (!w) return { html: '', state: 0, words: '', alarm: false };
  const html = w.doors ? `<button id="line-unclaimed" data-act="unclaimed" class="inert" data-string="${esc(w.id)}">${esc(w.text)}</button>`
    : `<span data-string="${esc(w.id)}">${esc(w.text)}</span>${w.again ? ' ' + AGAIN : ''}`;
  return { html, state: 0, words: w.text, alarm: false };
}

/**
 * The acting-as segment (see the head): its words, and its state among
 * foundations §3.3's seven — while M-PUMP's acquire is out past a second for
 * a session a restart lost, "reconnecting as" in the session's place, the
 * session's state kept; where it was refused, the guest state boot shows for
 * that refusal, led by "could not reconnect as" (FP-28); a death's words
 * O-FACES's (`deathWords`), the guest line's in
 * their place for an arm it holds none for. Where no board is held, why
 * (`noBoardSegment`), and none of the seven.
 * @returns {Acting}
 */
export function actingSegment() {
  const s = REC.session(), b = REC.board(), dev = REC.device(), dead = REC.deathReason(), refused = REC.sessionRefused(), lost = REC.reconnect();
  if (!PORT.hasAdapter()) return { html: `<span data-string="L.no-adapter">${esc(t('L.no-adapter'))}</span>`, state: 0, words: t('L.no-adapter'), alarm: false };
  if (!b) return noBoardSegment();
  // the board's origin, as `boards()` answered it; the boot opens a session only on the board it holds
  const origin = b.origin;
  if (s && lost && !lost.refused) {
    const words = t('L.reconnecting', { account: lost.as || '' });
    return { html: `<span data-string="L.reconnecting">${tHTML('L.reconnecting', { account: lost.as || '' }, ACCOUNT)}</span>`, state: s.writes ? 2 : 3, words, alarm: false };
  }
  if (s && !s.writes) {
    const words = t('F.keyless-session', { account: s.account || '', origin });
    return { html: `<span data-string="F.keyless-session">${tHTML('F.keyless-session', { account: s.account || '', origin }, ACCOUNT)}</span>`, state: 3, words, alarm: false };
  }
  if (s) {
    // F.acting-as's every token filled but its device label, whose slot stands in its place
    const values = { account: s.account || '', N: s.principal, origin }, text = t('F.acting-as', values), parts = aroundToken(text, 'device label'), slot = deviceSlot(dev);
    const markup = tHTML('F.acting-as', values, ACCOUNT), around = aroundToken(markup, 'device label');
    const words = parts ? parts[0] + slot.shows + parts[1] : text;
    return { html: `<span data-string="F.acting-as">${around ? around[0] + slot.html + around[1] : markup}</span>`, state: 2, words, alarm: false };
  }
  const guest = `<span data-string="B1.guest-line">${esc(t('B1.guest-line'))}</span>${origin ? ` · ${esc(origin)}` : ''} · <span data-string="F.venue.notebook">${esc(t('F.venue.notebook'))}</span> ${SIGN_IN}`;
  if (dead) {
    // C-137's words for the arm; an arm whose words this page does not hold reads as the guest the page now is
    const w = deathWords(dead);
    return w ? { html: `<span data-string="${w.id}">${addressedHTML(w.text)}</span> ${SIGN_IN}`, state: 5, words: w.text, alarm: true } : { html: guest, state: 5, words: t('B1.guest-line'), alarm: true };
  }
  const lead = lost && lost.refused ? t('L.reconnect-refused', { account: lost.as || '' }) : '';
  const html = (lead ? `<span data-string="L.reconnect-refused">${tHTML('L.reconnect-refused', { account: lost && lost.as ? lost.as : '' }, ACCOUNT)}</span> · ` : '') + guest + (refused ? ` <span class="dim" data-string="L.session-refused">${esc(t('L.session-refused', { name: refused.name }))}</span>` : '');
  return { html, state: refused && refused.name === 'no_key' ? 3 : 1, words: lead || t('B1.guest-line'), alarm: !!lead };
}

/** the daemon's segment: silent while the board runs */
function daemonSegment() {
  const d = REC.daemon(), h = REC.health();
  const halted = !!(h && h.writes && h.writes.halted);
  if (halted) return { html: `<span class="warn" data-string="F.daemon.notebook.halted">${esc(t('F.daemon.notebook.halted'))}</span>`, halted, words: t('F.daemon.notebook.halted') };
  if (d === 'stopped') return { html: `<span class="warn" data-string="F.daemon.notebook.stopped">${esc(t('F.daemon.notebook.stopped'))}</span>`, halted, words: '' };
  if (d === 'unreachable') return { html: `<span class="warn" data-string="F.daemon.unreachable">${esc(t('F.daemon.unreachable'))}</span>`, halted, words: '' };
  return { html: '', halted, words: '' };
}

/** the mode line: the flag-on transition at the first render after the pair changes (C-31), said through the status region */
function modeLine() {
  const h = REC.health();
  const trust = h && h.auth ? !!h.auth.local_trust : null;
  const mode = REC.mode();
  if (lastTrust !== null && trust !== null && trust !== lastTrust && trust) { transientSeg = { html: esc(t('F.flip')) + ' ' + esc(t('F.flip.run')), id: 'F.flip' }; FOCUS.say(t('F.flip') + ' ' + t('F.flip.run')); }
  lastTrust = trust; lastMode = mode;
}

/**
 * The position's slot: the position's words, as wide as the document's
 * widest position, then its strip — standing empty below the document's
 * reading scale, and where no document is named, the strip's room kept, so
 * nothing after it on the line moves.
 * @param {AddressDisplay} a
 */
function slot(a) {
  return `<span class="slot"><b class="pos" style="width:${a.slot}ch">${esc(positionWords(a.pos))}</b>${strip(a)}</span>`;
}

/**
 * The position strip: the document's length, the position named marked on
 * it — or, where the walk keeps the document in view off the view's centre,
 * the view's window over it, open at whichever end the view has run past —
 * and the runs of an arrival in several
 * standing in that document, each an outlined extent from its first position
 * to its last, the one the landing stands at filled (see the head); its room
 * alone, hidden, where no position is named.
 * @param {AddressDisplay} a
 */
function strip(a) {
  if (!a.doc || a.pos == null) return '<span class="strip none" aria-hidden="true"></span>';
  const extent = REC.doc(a.doc).extent || 0;
  /** a position's place along the strip, 0 to 1 */
  const along = (/** @type {number} */ p) => (extent ? Math.max(0, Math.min(1, (p - 1) / extent)) : 0);
  const pct = (/** @type {number} */ u) => (u * 100).toFixed(1) + '%';
  const w = a.window;
  let mark = `<span class="strip-mark" style="left:${pct(along(a.pos))}"></span>`;
  if (w) {
    const from = w.start ? 0 : along(w.from), to = w.end ? 1 : along(w.to);
    mark = `<span class="strip-window${w.start ? ' open-start' : ''}${w.end ? ' open-end' : ''}" style="left:${pct(from)};width:${pct(to - from)}"></span>`;
  }
  const p = acts && acts.pieces ? acts.pieces() : null;
  const runs = p && p.addr === a.doc ? p.runs.map((r, i) => `<span class="strip-run${i === p.current ? ' current' : ''}" style="left:${pct(along(r.pos))};width:${pct(along(r.pos + r.width) - along(r.pos))}"></span>`).join('') : '';
  return `<span class="strip" data-act="strip" title="${esc(t('F.position', { p: a.pos }))}">${runs}${mark}</span>`;
}

/** rebuild the line from state; the focus kept on the act that held it (rule 11); the assertive words said once as they arrive (D4) */
export function render(force = false) {
  if (!el) return;
  modeLine();
  const a = addressDisplay();
  const acting = actingSegment();
  const daemon = daemonSegment();
  const aside = acts && acts.aside ? acts.aside() : null;
  if (changedAt != null) {
    // a change of the page's class: said once, its ending with what it covered, as the reads it asked answer — never the ending alone first
    if (!PUMP.rereading() || performance.now() - changedAt >= PUMP.UNREACHED_MS) { changedAt = null; if (acting.alarm) FOCUS.say(endingSaid(acting.words), true); }
  } else if (acting.alarm && lastAlarm !== null && acting.words !== lastAlarm) FOCUS.say(acting.words, true);
  if (daemon.halted && !lastHalted) FOCUS.say(daemon.words, true);
  lastAlarm = acting.alarm ? acting.words : ''; lastHalted = daemon.halted;
  const html =
    `<span class="acts"><button id="line-back" data-act="back" ${TRAIL.canBack() ? '' : 'disabled'}>${esc(t('F.back'))}</button><button data-act="forward" ${TRAIL.canForward() ? '' : 'disabled'}>${esc(t('F.forward'))}</button><button data-act="trail" title="${esc(drawChord('Mod+Y'))}">${esc(t('F.trail-list'))}</button></span>` +
    `<span class="sep">│</span><button class="seg address" data-act="address" title="${esc(drawChord('Mod+L'))}" style="--words:${WORDS_CH}"><b>${esc(a.place)}</b>${slot(a)}<span class="marker${a.member ? ' lit' : ''}${a.doc ? '' : ' none'}" title="${a.member ? esc(t('L.version', { k: a.member })) : ''}">${a.member ? '●' : '○'}</span></button>` +
    `<span class="sep">│</span><span class="seg acting" data-state="${acting.state}">${acting.html}</span>` +
    walkSegments() +
    (daemon.html ? `<span class="sep">│</span><span class="seg daemon">${daemon.html}</span>` : '') +
    (aside ? `<span class="sep">│</span><span class="seg aside" data-string="${esc(aside.id)}">${addressedHTML(aside.text)}</span>` : '') +
    (transientSeg ? `<span class="sep">│</span><span class="seg transient" data-string="${esc(transientSeg.id)}">${transientSeg.html}</span>` : '');
  if (!force && html === lastHTML) return;
  lastHTML = html;
  const host = el;
  FOCUS.keep(host, (e) => /** @type {HTMLElement} */ (e).dataset.act || null, () => { host.innerHTML = html; roving(); });
}

/** the strip's act (K-23): the ordinal and the passage's first words beneath, the version's own, until the next act */
export function stripAct() {
  const a = addressDisplay();
  if (!a.doc || a.pos == null) return;
  const words = REC.textBetween(a.doc, a.pos, a.pos + 60);
  transient(`${t('F.position', { p: a.pos })} · ${words}`, 'strip');
}

/** the line's text (the gate's text case) */
export const text = () => (el ? el.textContent || '' : '');
/** the line's bottom edge on screen: the plane's labels and corners hold below it (T-LAYER reads it through the reader the app hands in) */
export const bottom = () => (el ? el.getBoundingClientRect().bottom : 0);
export const state = () => actingSegment().state;
export const modeSeen = () => lastMode;
