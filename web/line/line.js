// L-LINE — THE ONE LINE (the structure record §3.2 "L-LINE"; foundations
// §3.1, §3.3; S-9 (a) its own module). Layer 2. ENGINE-BOUND. A control
// rebuilt from state (FP-13). State: VIEW — the transient segment and its
// expiry (the next act).
// The line is the page's toolbar, named as it attaches by ST's `L.the-line`.
// Its acts at the left edge — Back, Forward, the trail's list; Back and
// Forward told whether a key made them, so the ring is drawn at the landing a
// key made (D5 §4 rule 2): the platform's click from Enter or Space on the
// button carries no click count, a pointer's carries its count — then THE
// ADDRESS DISPLAY (R6): board › account › document › position, each segment
// read from the document's own address — its node field, its account field
// whole at any depth (`1.0.1.1` for the agent space's documents, B1-S6's
// `1.5 › 1.5.0.1.1 › …`) — and the position the one a landing named inside
// the focused span (N-WALK's `landedAt`; W-01 step 3, "position honored"),
// else the span's own first; with the position strip and the version marker
// ○ (unlit at the bare address, lit at a pinned member; no sentence), itself
// LEAP's box (a click or Mod+L opens it); then the ACTING-AS segment — STATE
// 2 through the signed session
// ("acting as 1.0.1 (principal ⟨N⟩) · ⟨device label⟩ · key present on this
// device · http://127.0.0.1:⟨P⟩ · LOCAL notebook"), STATE 1 where no session
// stands ("reading as a guest" with its one act, sign in — the session's
// refusal faced there), the death arm where the session died (C-137's
// words), states 3–7 only as the provider's events bring them; the DAEMON's
// segment (silent while the board runs; the notebook's forms where it does
// not, "writes stopped on your notebook …" where `/health.writes.halted`);
// the TRANSIENT segments (the swallow line K-9; the mode line C-31 where the
// pair flipped) until the next act. The chip is NOT a segment (ux-T2: the
// document's corner). Carries: the wireframe's §15 (`whereAmI`,
// `actingLine`, `updateHUD`, `setTransient`; the chip and the walk step
// removed; the diagnostics behind `h` are the gate's hooks).
// Rules: FP-1, FP-2, FP-10, FP-13.

import * as REC from '../model/records.js';
import * as TRAIL from '../nav/trail.js';
import * as WALK from '../nav/walk.js';
import * as PORT from '../bridge/port.js';
import { cam, viewForCell } from '../plane/camera.js';
import { lodOf } from '../plane/lod.js';
import { boardCell, accountAt } from '../plane/projection.js';
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
/** @type {{open: () => void, back: (byKey: boolean) => void, forward: (byKey: boolean) => void, trailList: () => void, signIn: (el: HTMLElement) => void} | null} */
let acts = null;

/** @param {HTMLElement} e @param {NonNullable<typeof acts>} a */
export function attach(e, a) {
  el = e; acts = a;
  el.setAttribute('aria-label', t('L.the-line'));
  el.addEventListener('click', (ev) => {
    const b = /** @type {HTMLElement} */ (ev.target).closest('[data-act]'); if (!b || !acts) return;
    const which = /** @type {HTMLElement} */ (b).dataset.act;
    const byKey = ev.detail === 0;
    if (which === 'back') acts.back(byKey); else if (which === 'forward') acts.forward(byKey); else if (which === 'address') acts.open(); else if (which === 'trail') acts.trailList(); else if (which === 'signin') acts.signIn(/** @type {HTMLElement} */ (b));
    ev.stopPropagation();
  });
}

/** a transient segment until the person's next act */
export function transient(/** @type {string} */ text, id = 'transient') { transientSeg = { html: esc(text), id }; render(true); }
/** the next act clears the transient segment */
export function act() { if (transientSeg) { transientSeg = null; render(true); } }

/** the current address under the camera (the address segment's; the LEAP box's prefill) */
export function currentAddress() {
  const lod = lodOf(cam.scale);
  const f = WALK.current();
  if (f && (f.kind === 'block' || f.kind === 'document' || f.kind === 'link') && lod.name !== 'far') return documentOf(f.addr) ? f.addr : null;
  if (lod.name === 'far') return '1';
  const acct = accountAt(cam.x, cam.y, '1');
  return acct || '1';
}

/** the address display's parts */
export function addressDisplay() {
  const lod = lodOf(cam.scale);
  const f = WALK.current();
  const home = viewForCell(boardCell('1'), 0.92);
  if (lod.name === 'far' || lod.name === 'far~mid') {
    const whole = cam.scale <= home.scale * 1.02;
    return { text: '1' + (whole ? ' · ' + t('B1.clamp') : ''), doc: null, pos: null, member: null, whole };
  }
  const acct = accountAt(cam.x, cam.y, '1');
  if (f && (f.kind === 'block' || f.kind === 'document' || f.kind === 'link') && (lod.name === 'near' || lod.name === 'mid~near' || lod.name === 'mid')) {
    const doc = documentOf(f.addr) || f.addr;
    const pos = WALK.landedAt() ?? f.pos ?? 1;
    return { text: `${boardOf(doc)} › ${accountOf(doc)} › ${doc} › ${t('F.position', { p: pos })}`, doc: f.addr, pos, member: memberOf(f.addr), whole: false };
  }
  return { text: acct ? `1 › ${acct}` : '1', doc: null, pos: null, member: null, whole: false };
}

/** the acting-as segment's words */
export function actingSegment() {
  const s = REC.session(), b = REC.board(), dev = REC.device(), dead = REC.deathReason(), refused = REC.sessionRefused();
  const origin = b ? b.origin : 'http://127.0.0.1:8642';
  if (!PORT.hasAdapter()) return { html: `<span data-string="L.no-adapter">${esc(t('L.no-adapter'))}</span>`, state: 0 };
  if (s) {
    const words = t('F.acting-as', { account: s.account || '', N: s.principal, 'device label': dev && dev.label ? dev.label : '⟨device label⟩', origin });
    return { html: `<span data-string="F.acting-as">${esc(words)}</span>`, state: 2 };
  }
  if (dead) {
    const arm = dead.arm;
    const words = arm === 'mode' ? t('C-137.mode') : arm === 'retired' ? t('C-137.self') : t('C-137.signed-out');
    const id = arm === 'mode' ? 'C-137.mode' : arm === 'retired' ? 'C-137.self' : 'C-137.signed-out';
    return { html: `<span data-string="${id}">${esc(words)}</span> <button data-act="signin">${esc(t('F.sign-in'))}</button>`, state: 5 };
  }
  const guest = `<span data-string="B1.guest-line">${esc(t('B1.guest-line'))}</span> · ${esc(origin)} · <span data-string="F.venue.notebook">${esc(t('F.venue.notebook'))}</span> <button data-act="signin">${esc(t('F.sign-in'))}</button>`;
  return { html: guest + (refused ? ` <span class="dim" data-string="L.session-refused">${esc(t('L.session-refused', { name: refused.name }))}</span>` : ''), state: refused && refused.name === 'no_key' ? 3 : 1 };
}

/** the daemon's segment: silent while the board runs */
function daemonSegment() {
  const d = REC.daemon(), h = REC.health();
  const halted = !!(h && h.writes && h.writes.halted);
  if (halted) return `<span class="warn" data-string="F.daemon.notebook.halted">${esc(t('F.daemon.notebook.halted'))}</span>`;
  if (d === 'stopped') return `<span class="warn" data-string="F.daemon.notebook.stopped">${esc(t('F.daemon.notebook.stopped'))}</span>`;
  if (d === 'unreachable') return `<span class="warn" data-string="F.daemon.unreachable">${esc(t('F.daemon.unreachable'))}</span>`;
  return '';
}

/** the mode line: the flag-on transition at the first render after the pair changes (C-31) */
function modeLine() {
  const h = REC.health();
  const trust = h && h.auth ? !!h.auth.local_trust : null;
  const mode = REC.mode();
  if (lastTrust !== null && trust !== null && trust !== lastTrust && trust) transientSeg = { html: esc(t('F.flip')) + ' ' + esc(t('F.flip.run')), id: 'F.flip' };
  lastTrust = trust; lastMode = mode;
}

/** the position strip: the document's length with the view's window marked (the strip's statement on its act) */
function strip(/** @type {string | null} */ doc, /** @type {number | null} */ pos) {
  if (!doc) return '';
  const d = REC.doc(doc);
  const extent = d.extent || 0;
  const frac = extent && pos ? Math.min(1, (pos - 1) / extent) : 0;
  return `<span class="strip" data-act="strip" title="${esc(t('F.position', { p: pos || 1 }))}"><span class="strip-mark" style="left:${(frac * 100).toFixed(1)}%"></span></span>`;
}

/** rebuild the line from state */
export function render(force = false) {
  if (!el) return;
  modeLine();
  const a = addressDisplay();
  const acting = actingSegment();
  const daemon = daemonSegment();
  const html =
    `<span class="acts"><button id="line-back" data-act="back" ${TRAIL.canBack() ? '' : 'disabled'}>${esc(t('F.back'))}</button><button data-act="forward" ${TRAIL.canForward() ? '' : 'disabled'}>${esc(t('F.forward'))}</button><button data-act="trail" title="Mod+Y">${esc(t('F.trail-list'))}</button></span>` +
    `<span class="sep">│</span><span class="seg address" data-act="address" role="button" tabindex="0" title="Mod+L"><b>${esc(a.text)}</b>${strip(a.doc, a.pos)}<span class="marker ${a.member ? 'lit' : ''}" title="${a.member ? 'version ' + a.member : ''}">${a.member ? '●' : '○'}</span></span>` +
    `<span class="sep">│</span><span class="seg acting" data-state="${acting.state}">${acting.html}</span>` +
    (daemon ? `<span class="sep">│</span><span class="seg daemon">${daemon}</span>` : '') +
    (transientSeg ? `<span class="sep">│</span><span class="seg transient" data-string="${esc(transientSeg.id)}">${transientSeg.html}</span>` : '');
  if (!force && html === lastHTML) return;
  lastHTML = html;
  el.innerHTML = html;
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
