// L-LINE — THE ONE LINE (the structure record §3.2 "L-LINE"; foundations
// §3.1, §3.3; S-9 (a) its own module). Layer 2. ENGINE-BOUND. A control
// rebuilt from state (FP-13). State: VIEW — the transient segment and its
// expiry (the next act), and the act holding the line's one Tab stop.
// The line is the page's toolbar, named as it attaches by ST's `L.the-line`,
// and ONE TAB STOP (D5 §1.3, K-22; §4 rule 5): its acts hold a roving stop
// — the act last stood on, else the first that takes the focus — and ← and →
// move among them, Enter and Space pressing the one stood on, each a native
// button (rule 14). Its acts at the left edge — Back, Forward, the trail's
// list; each told whether a key made it by the focus owner's one reading
// (FP-20), so the ring is drawn at the landing a key made (D5 §4 rule 2) and
// the trail's list takes the focus by a key alone — then THE ADDRESS DISPLAY
// (R6), naming the level the camera's scale reads (foundations §2.2): the
// board at far scale ("the whole board is in view" at WHOLE BOARD), the
// account under the camera at mid (B1-S2's `1.5 › 1.5.0.1`) whatever the
// walk stands on, and nearer the walk's own place: board › account ›
// document — the document the walk stands in, named by the version its box
// shows: the plain address, the trunk head, or a pinned version's address,
// its marker lit (issue #154's design decision: "The address bar and the
// box's corner both name it"; foundations §3.2: "its version address with ○
// lit") — each segment read from its own
// address: its node field, its account field whole at any depth (`1.0.1.1`
// for the agent space's documents, B1-S6's `1.5 › 1.5.0.1.1 › …`) — or, where
// a camera move ended over no document's region and the re-take stood the walk
// on the account or the board holding the view's centre (N-WALK; issue #141's
// design decision), that place in the breadcrumb mid scale names it by,
// `1 › ⟨account⟩` or `1`, the document's fields blank. THE PLACES IT NAMES ARE
// THE PLANE'S RUNNING HEAD (issue #169's design decision: "Named once"): its
// board, its account and its document, by its box (`named`), which the
// plane's labels and T-LAYER's held labels read, so none of them holds a
// label below the line. THE ADDRESS SEGMENT IS
// ONE WIDTH at every scale and focus (issue #141): the widest words it names
// (`WORDS_CH`), then the strip's room and the marker's (the style's), its
// content clipped past it, never wrapped; where no document is named its
// position's slot, its strip and its marker stand empty, their room kept, so
// nothing after it on the line moves. Then THE POSITION'S SLOT
// (issue #140's design decision): a position named only where that document
// holds text the reader may read — none at a document a read refused, a
// covered one among them, whose box measures nothing (issue #177's design
// decision: "no length, ticks or window"; FP-29) — and stands at its own
// reading scale — its em at the readable threshold,
// T-LAYER's one test, which the press rule and the walk's span grain read
// too, never the camera's band — the one a landing named inside the focused
// span (N-WALK's `landedAt`; W-01 step 3, "position honored"), else the
// span's own first, with the position strip; below it the slot stands empty,
// as wide as the document's widest position and its strip, so nothing after
// it on the line moves; the strip marks the position, and, while the walk's
// document is kept in view with the view's centre off its region (N-WALK's
// `kept`), the view's window over it instead (T-LAYER's `windowIn`), open at
// whichever end the view has run past (issue #141's design decision); and
// where an arrival in several runs stands in that document, each run as an
// outlined extent along it, the one the landing stands at filled (issue
// #158's design decision: "Draw the runs on the address line's position strip
// as outlined extents"; N-GO's landing, through the reader the app hands in);
// the version marker ○ beside it (unlit at the bare
// address, lit at a pinned member; no sentence); itself LEAP's box (a click,
// Enter or Mod+L opens it; the chord drawn for the platform in its title,
// rule 19), which opens holding the address the display names (K-30), so the
// box never opens on a place the line does not show; then the ACTING-AS
// segment — STATE 2 through the signed session, the one a write may go out
// under ("acting as 1.0.1 (principal ⟨N⟩) · ⟨device label⟩ · key present on
// this device · http://127.0.0.1:⟨P⟩ · LOCAL notebook", the device label the
// one M-REC's `device` names); STATE 3 through the keyless session for
// reading alone, the bare session whose every write the shell refuses
// ("reading as 1.0.1 with no key — local trust; writing needs your key · on
// your LOCAL notebook · http://127.0.0.1:⟨P⟩"; foundations §3.1's line, §3.3
// state 3, E16 (a′)) — the session's own `writes` deciding which, never a key
// bound at this board, which speaks for no one session; STATE 1 where no
// session stands ("reading as a guest", the board's origin where `boards()`
// found a board and none where it found none, and the venue, §3.3 state 1's
// "the board and venue shown"; its one act, sign in — the session's refusal
// faced there), the death arm where the session died (C-137's words, by the
// death's arm: O-FACES's `deathWords`, the guest line's in their place for an
// arm this page holds none for, "signed out" the `closed` arm's alone, the
// person's own sign-out) — never at a restart (client.md
// §4b.2): where the shell re-opened the session M-PUMP takes it in the ended
// one's place, and where it re-opened none, or a call finds the shell no
// longer holds it, M-PUMP's acquire asks for it again (issue #175's design
// decision; FP-28) — past a second still out, "reconnecting as ⟨account⟩
// after a restart" in the acting-as segment's place, the session's state
// kept; back, the segment as it stood; refused, the guest state boot shows
// for that refusal, led by "could not reconnect as ⟨account⟩ after a
// restart"; the other states only as the provider's events bring them; the
// DAEMON's
// segment (silent while the board runs; the notebook's forms where it does
// not, "writes stopped on your notebook …" where `/health.writes.halted`);
// A JUMP'S FACE OUT OF VIEW (FP-25: "'Reading', 'reaching' and a failure show
// where the camera is … in the one line when out of view"): the words of a
// jump's face whose document stands out of the visible view, in a segment of
// their own while the plane hides the face (O-HOST's `aside`, read through
// the reader the app hands in), said already through the status region as
// the face was shown;
// the TRANSIENT segments (the swallow line K-9; the mode line C-31 where the
// pair flipped) until the next act, or a change of the page's class, which
// takes one quoting what the class it left read down with it. THE REBUILD
// KEEPS THE FOCUS (rule 11):
// the line is rebuilt whenever its words change — every frame of a flight —
// and the act that held the focus has it back by its `data-act`, through the
// focus's owner; an overlay standing at Back (the trail's list) or at sign in
// (the session's face) finds its act again by the act's id (O-HOST's
// anchor). What a screen reader is told (D4): a transient segment and
// the mode line politely, the session's death, a session a restart lost that
// the acquire could not get back, and halted writes assertively — nothing
// while it reconnects nor as it returns — through the one status region; a
// change of the page's class (issue #177's design decision: "One status
// message says the session ended and what is covered"; FP-29) is said ONCE,
// as the reads it asked answer (M-PUMP's `rereading`), UNREACHED_MS at the
// most after it: the ending's words, then the documents it covered (M-REC's
// `coveredDocs`) — never the ending alone first. The
// chip is NOT a segment (ux-T2: the
// document's corner). Carries: the wireframe's §15 (`whereAmI`,
// `actingLine`, `updateHUD`, `setTransient`; the chip and the walk step
// removed; `whereAmI` RE-CUT to foundations §2.2, its document form nearer
// than mid and its position at the document's own reading scale alone; the
// diagnostics behind `h` are the gate's hooks).
// Rules: FP-1, FP-2, FP-10, FP-13, FP-20, FP-21, FP-22, FP-25, FP-26, FP-28,
// FP-29.

import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as TRAIL from '../nav/trail.js';
import * as WALK from '../nav/walk.js';
import * as FOCUS from '../nav/focus.js';
import * as LAYER from '../text/layer.js';
import * as PORT from '../bridge/port.js';
import { deathWords } from '../overlays/faces.js';
import { drawChord } from '../nav/keys.js';
import { cam, viewForCell } from '../plane/camera.js';
import { lodOf } from '../plane/lod.js';
import { boardCell, accountAt, G, LEAF, DEPTH_SOUND } from '../plane/projection.js';
import { memberOf, boardOf, accountOf, documentOf } from '../model/address.js';
import { t } from '../strings.js';
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
 * @property {() => ({id: string, text: string} | null)} [aside] a jump's face standing out of the visible view: its string's id and its words (O-HOST's `aside`); null where none stands so
 * @property {() => (Pieces | null)} [pieces] the runs of an arrival in several, in the document landed in (N-GO's landing); null where none stands
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
export function transient(/** @type {string} */ text, id = 'transient') { transientSeg = { html: esc(text), id }; FOCUS.say(text); render(true); }
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
 * @property {number} slot the position's slot, in characters: as many as the document's widest position takes in its words, standing empty below the document's reading scale (issue #140); 0 where no document is named
 * @property {string} addr the address named — the board, the account under the camera at mid, nearer the account or the board the walk stands on, or the document the walk stands in (its member where one is pinned): the LEAP box's prefill
 * @property {string | null} doc the document named, nearer than mid
 * @property {number | null} pos the position named inside it, at the document's own reading scale alone
 * @property {number | null} member the version member pinned
 * @property {boolean} whole the whole board is in view, at WHOLE BOARD's clamp
 * @property {import('../plane/layout.js').Window | null} window the view's window over the document named, the strip's mark where the walk keeps it in view off the view's centre (N-WALK's `kept`; issue #141); null where it is not kept, no position is named, or no line in view names one
 */

/** the address the display names: the LEAP box's prefill, so the box opens holding what the line shows (K-30) */
export function currentAddress() { return addressDisplay().addr; }

/**
 * @typedef {Object} Named — the places the address display names (issue #169's design decision: "Named once"): the line is their running head, so none of them holds a label below it
 * @property {string} board
 * @property {string | null} account the account named — under the camera at mid, the walk's own nearer — null where none is
 * @property {string | null} doc the document named nearer than mid, by its box: the address every version of it shares; null where none is
 */

/**
 * The places the address display names (`addressDisplay`; issue #169's
 * design decision: "Named once"): its board, the account it names and the
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
 * its own reading scale (T-LAYER's one test; issue #140), its slot standing
 * empty below it, the strip's window where the walk keeps the document in
 * view off the view's centre; or the account or the board it stands on, named
 * as at mid (issue #141); the account under the camera where it stands nowhere.
 * @returns {AddressDisplay}
 */
export function addressDisplay() {
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

/**
 * @typedef {Object} Acting — the acting-as segment (`actingSegment`)
 * @property {string} html
 * @property {number} state its state among foundations §3.3's seven
 * @property {string} words its words, what the status region says where they are said
 * @property {boolean} alarm its words said assertively once as they arrive (D4): the session's death, and a session a restart lost that M-PUMP's acquire could not get back
 */

/**
 * The acting-as segment (see the head): its words, and its state among
 * foundations §3.3's seven — while M-PUMP's acquire is out past a second for
 * a session a restart lost, "reconnecting as" in the session's place, the
 * session's state kept; where it was refused, the guest state boot shows for
 * that refusal, led by "could not reconnect as" (issue #175's design
 * decision); a death's words O-FACES's (`deathWords`), the guest line's in
 * their place for an arm it holds none for.
 * @returns {Acting}
 */
export function actingSegment() {
  const s = REC.session(), b = REC.board(), dev = REC.device(), dead = REC.deathReason(), refused = REC.sessionRefused(), lost = REC.reconnect();
  // the board's origin where `boards()` found one; the boot opens a session only on a board it found
  const origin = b ? b.origin : '';
  if (!PORT.hasAdapter()) return { html: `<span data-string="L.no-adapter">${esc(t('L.no-adapter'))}</span>`, state: 0, words: t('L.no-adapter'), alarm: false };
  if (s && lost && !lost.refused) {
    const words = t('L.reconnecting', { account: lost.as || '' });
    return { html: `<span data-string="L.reconnecting">${esc(words)}</span>`, state: s.writes ? 2 : 3, words, alarm: false };
  }
  if (s && !s.writes) {
    const words = t('F.keyless-session', { account: s.account || '', origin });
    return { html: `<span data-string="F.keyless-session">${esc(words)}</span>`, state: 3, words, alarm: false };
  }
  if (s) {
    const words = t('F.acting-as', { account: s.account || '', N: s.principal, 'device label': dev && dev.label ? dev.label : '⟨device label⟩', origin });
    return { html: `<span data-string="F.acting-as">${esc(words)}</span>`, state: 2, words, alarm: false };
  }
  const guest = `<span data-string="B1.guest-line">${esc(t('B1.guest-line'))}</span>${origin ? ` · ${esc(origin)}` : ''} · <span data-string="F.venue.notebook">${esc(t('F.venue.notebook'))}</span> ${SIGN_IN}`;
  if (dead) {
    // C-137's words for the arm; an arm whose words this page does not hold reads as the guest the page now is
    const w = deathWords(dead);
    return w ? { html: `<span data-string="${w.id}">${esc(w.text)}</span> ${SIGN_IN}`, state: 5, words: w.text, alarm: true } : { html: guest, state: 5, words: t('B1.guest-line'), alarm: true };
  }
  const lead = lost && lost.refused ? t('L.reconnect-refused', { account: lost.as || '' }) : '';
  const html = (lead ? `<span data-string="L.reconnect-refused">${esc(lead)}</span> · ` : '') + guest + (refused ? ` <span class="dim" data-string="L.session-refused">${esc(t('L.session-refused', { name: refused.name }))}</span>` : '');
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
 * The position's slot (issue #140's design decision): the position's words,
 * as wide as the document's widest position, then its strip — standing empty
 * below the document's reading scale, and where no document is named, the
 * strip's room kept, so nothing after it on the line moves (issue #141).
 * @param {AddressDisplay} a
 */
function slot(a) {
  return `<span class="slot"><b class="pos" style="width:${a.slot}ch">${esc(positionWords(a.pos))}</b>${strip(a)}</span>`;
}

/**
 * The position strip: the document's length, the position named marked on
 * it — or, where the walk keeps the document in view off the view's centre,
 * the view's window over it, open at whichever end the view has run past
 * (issue #141's design decision) — and the runs of an arrival in several
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
    (daemon.html ? `<span class="sep">│</span><span class="seg daemon">${daemon.html}</span>` : '') +
    (aside ? `<span class="sep">│</span><span class="seg aside" data-string="${esc(aside.id)}">${esc(aside.text)}</span>` : '') +
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
