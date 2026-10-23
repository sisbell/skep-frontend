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
// document — the document the walk stands in, each segment read from its own
// address: its node field, its account field whole at any depth (`1.0.1.1`
// for the agent space's documents, B1-S6's `1.5 › 1.5.0.1.1 › …`) — or, where
// a camera move ended over no document's region and the re-take stood the walk
// on the account or the board holding the view's centre (N-WALK; issue #141's
// design decision), that place in the breadcrumb mid scale names it by,
// `1 › ⟨account⟩` or `1`, the document's fields blank. THE ADDRESS SEGMENT IS
// ONE WIDTH at every scale and focus (issue #141): the widest words it names
// (`WORDS_CH`), then the strip's room and the marker's (the style's), its
// content clipped past it, never wrapped; where no document is named its
// position's slot, its strip and its marker stand empty, their room kept, so
// nothing after it on the line moves. Then THE POSITION'S SLOT
// (issue #140's design decision): a position named only where that document
// stands at its own reading scale — its em at the readable threshold,
// T-LAYER's one test, which the press rule and the walk's span grain read
// too, never the camera's band — the one a landing named inside the focused
// span (N-WALK's `landedAt`; W-01 step 3, "position honored"), else the
// span's own first, with the position strip; below it the slot stands empty,
// as wide as the document's widest position and its strip, so nothing after
// it on the line moves; the strip marks the position, and, while the walk's
// document is kept in view with the view's centre off its region (N-WALK's
// `kept`), the view's window over it instead (T-LAYER's `windowIn`), open at
// whichever end the view has run past (issue #141's design decision); the
// version marker ○ beside it (unlit at the bare
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
// faced there), the death arm where the session died (C-137's
// words) — never at a restart the shell re-opened, whose session M-PUMP
// takes in the ended one's place (client.md §4b.2) — the other states only
// as the provider's events bring them; the DAEMON's
// segment (silent while the board runs; the notebook's forms where it does
// not, "writes stopped on your notebook …" where `/health.writes.halted`);
// the TRANSIENT segments (the swallow line K-9; the mode line C-31 where the
// pair flipped) until the next act. THE REBUILD KEEPS THE FOCUS (rule 11):
// the line is rebuilt whenever its words change — every frame of a flight —
// and the act that held the focus has it back by its `data-act`, through the
// focus's owner; an overlay standing at Back (the trail's list) or at sign in
// (the session's face) finds its act again by the act's id (O-HOST's
// anchor). What a screen reader is told (D4): a transient segment and
// the mode line politely, the session's death and halted writes assertively,
// through the one status region. The chip is NOT a segment (ux-T2: the
// document's corner). Carries: the wireframe's §15 (`whereAmI`,
// `actingLine`, `updateHUD`, `setTransient`; the chip and the walk step
// removed; `whereAmI` RE-CUT to foundations §2.2, its document form nearer
// than mid and its position at the document's own reading scale alone; the
// diagnostics behind `h` are the gate's hooks).
// Rules: FP-1, FP-2, FP-10, FP-13, FP-20.

import * as REC from '../model/records.js';
import * as TRAIL from '../nav/trail.js';
import * as WALK from '../nav/walk.js';
import * as FOCUS from '../nav/focus.js';
import * as LAYER from '../text/layer.js';
import * as PORT from '../bridge/port.js';
import { drawChord } from '../nav/keys.js';
import { cam, viewForCell } from '../plane/camera.js';
import { lodOf } from '../plane/lod.js';
import { boardCell, accountAt, G, LEAF, DEPTH_SOUND } from '../plane/projection.js';
import { memberOf, documentOf, boardOf, accountOf } from '../model/address.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/** @type {HTMLElement | null} */
let el = null;
/** @type {{html: string, id: string} | null} */
let transientSeg = null;
let lastHTML = '';
let lastMode = /** @type {string | null} */ (null);
let lastTrust = /** @type {boolean | null} */ (null);
/** the acting segment's state at the last render, for the death arm said once */
let lastState = -1;
/** the daemon's halted writes at the last render, said once */
let lastHalted = false;
/** the act holding the line's one Tab stop (K-22), by its `data-act` */
let stop = 'back';
/** @type {{open: (byKey: boolean) => void, back: (byKey: boolean) => void, forward: (byKey: boolean) => void, trailList: (byKey: boolean) => void, signIn: (el: HTMLElement) => void} | null} */
let acts = null;

/** @param {HTMLElement} e @param {NonNullable<typeof acts>} a */
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
    const doc = documentOf(f.addr) || f.addr;
    const place = `${boardOf(doc)} › ${accountOf(doc)} › ${doc}`;
    const pos = LAYER.atReadingScale(f.addr) ? WALK.landedAt() ?? f.pos ?? 1 : null;
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

/** the acting-as segment's words, and its state among foundations §3.3's seven */
export function actingSegment() {
  const s = REC.session(), b = REC.board(), dev = REC.device(), dead = REC.deathReason(), refused = REC.sessionRefused();
  // the board's origin where `boards()` found one; the boot opens a session only on a board it found
  const origin = b ? b.origin : '';
  if (!PORT.hasAdapter()) return { html: `<span data-string="L.no-adapter">${esc(t('L.no-adapter'))}</span>`, state: 0, words: t('L.no-adapter') };
  if (s && !s.writes) {
    const words = t('F.keyless-session', { account: s.account || '', origin });
    return { html: `<span data-string="F.keyless-session">${esc(words)}</span>`, state: 3, words };
  }
  if (s) {
    const words = t('F.acting-as', { account: s.account || '', N: s.principal, 'device label': dev && dev.label ? dev.label : '⟨device label⟩', origin });
    return { html: `<span data-string="F.acting-as">${esc(words)}</span>`, state: 2, words };
  }
  if (dead) {
    const arm = dead.arm;
    const words = arm === 'mode' ? t('C-137.mode') : arm === 'retired' ? t('C-137.self') : t('C-137.signed-out');
    const id = arm === 'mode' ? 'C-137.mode' : arm === 'retired' ? 'C-137.self' : 'C-137.signed-out';
    return { html: `<span data-string="${id}">${esc(words)}</span> ${SIGN_IN}`, state: 5, words };
  }
  const guest = `<span data-string="B1.guest-line">${esc(t('B1.guest-line'))}</span>${origin ? ` · ${esc(origin)}` : ''} · <span data-string="F.venue.notebook">${esc(t('F.venue.notebook'))}</span> ${SIGN_IN}`;
  return { html: guest + (refused ? ` <span class="dim" data-string="L.session-refused">${esc(t('L.session-refused', { name: refused.name }))}</span>` : ''), state: refused && refused.name === 'no_key' ? 3 : 1, words: t('B1.guest-line') };
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
 * (issue #141's design decision); its room alone, hidden, where no position is
 * named.
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
  return `<span class="strip" data-act="strip" title="${esc(t('F.position', { p: a.pos }))}">${mark}</span>`;
}

/** rebuild the line from state; the focus kept on the act that held it (rule 11); the assertive words said once as they arrive (D4) */
export function render(force = false) {
  if (!el) return;
  modeLine();
  const a = addressDisplay();
  const acting = actingSegment();
  const daemon = daemonSegment();
  if (acting.state === 5 && lastState !== 5 && lastState >= 0) FOCUS.say(acting.words, true);
  if (daemon.halted && !lastHalted) FOCUS.say(daemon.words, true);
  lastState = acting.state; lastHalted = daemon.halted;
  const html =
    `<span class="acts"><button id="line-back" data-act="back" ${TRAIL.canBack() ? '' : 'disabled'}>${esc(t('F.back'))}</button><button data-act="forward" ${TRAIL.canForward() ? '' : 'disabled'}>${esc(t('F.forward'))}</button><button data-act="trail" title="${esc(drawChord('Mod+Y'))}">${esc(t('F.trail-list'))}</button></span>` +
    `<span class="sep">│</span><button class="seg address" data-act="address" title="${esc(drawChord('Mod+L'))}" style="--words:${WORDS_CH}"><b>${esc(a.place)}</b>${slot(a)}<span class="marker${a.member ? ' lit' : ''}${a.doc ? '' : ' none'}" title="${a.member ? esc(t('L.version', { k: a.member })) : ''}">${a.member ? '●' : '○'}</span></button>` +
    `<span class="sep">│</span><span class="seg acting" data-state="${acting.state}">${acting.html}</span>` +
    (daemon.html ? `<span class="sep">│</span><span class="seg daemon">${daemon.html}</span>` : '') +
    (transientSeg ? `<span class="sep">│</span><span class="seg transient" data-string="${esc(transientSeg.id)}">${transientSeg.html}</span>` : '');
  if (!force && html === lastHTML) return;
  lastHTML = html;
  const host = el;
  FOCUS.keep(host, (e) => /** @type {HTMLElement} */ (e).dataset.act || null, () => { host.innerHTML = html; roving(); });
}

/** the strip's act (K-23): the ordinal and the passage's first words beneath, until the next act */
export function stripAct() {
  const a = addressDisplay();
  if (!a.doc || a.pos == null) return;
  const words = REC.textBetween(documentOf(a.doc) || a.doc, a.pos, a.pos + 60);
  transient(`${t('F.position', { p: a.pos })} · ${words}`, 'strip');
}

/** the line's text (the gate's text case) */
export const text = () => (el ? el.textContent || '' : '');
/** the line's bottom edge on screen: the plane's corners hold below it (T-LAYER reads it through the reader the app hands in) */
export const bottom = () => (el ? el.getBoundingClientRect().bottom : 0);
export const state = () => actingSegment().state;
export const modeSeen = () => lastMode;
