// O-LAND — A LANDING'S LINE (issue #153's design decision: "Mark what's held
// and say the rest in a line … The line leaves with the outline"). Layer 2.
// ENGINE-BOUND. State: VIEW — the state its element was last written from
// (the one owner of `#landing`'s DOM, FP-10).
// Where a carried or followed passage lands and the text landed in holds
// only part of it, all of it in pieces, or no answer told (N-GO's `landing`;
// BM-HELD's line), one line stands AT THE TEXT'S EDGE BESIDE THE LANDING:
// past the right edge of the part of the block holding the landing's first
// held line, its top level with that line's (BM's `leaveAt`, the point a
// beam leaves the text by) — where that text is not laid out, beside its
// document's box — stacked beneath the standing overlay where the two would
// meet, and held inside the visible view. It is no overlay: O-HOST holds one
// at a time, and a card opened at the landing would take its place while the
// outline stands. It is redrawn from state (FP-13): written again where what
// the landing says changes — its words, its offers as their reads answer —
// and placed on each dirty frame; gone with the outline at the next act, and
// hidden while the reading scene stands over the plane, out of the page's
// order (N-FOCUS's `cover`). Its acts are native buttons, in the Tab ring
// after the focused document's corner (D5 §4 rule 5): "read side by side"
// with where the passage came from, where that text holds it whole; "read
// version ⟨k⟩, the last that holds it" at a published landing, once the
// latest member holding it whole is found; "try again", where a retry may
// tell — each N-GO's (`landingAct`), told whether a key pressed it by the
// controller's one reading. No edge marks; no refusing, no asking first. A
// rebuild keeps the focus on the act bearing the same key (N-FOCUS's
// `keep`), and a line gone while its act held the focus hands it to the
// walk's element (`handOff`, the app's).
// Rules: FP-1, FP-2, FP-9, FP-10, FP-13, FP-20, FP-21.

import * as GO from '../nav/go.js';
import * as FOCUS from '../nav/focus.js';
import * as HOST from './host.js';
import * as SCENE from '../scene/scene.js';
import * as LINE from '../line/line.js';
import { leaveAt, pageGeometry } from '../beams/beams.js';
import { sx, sy, visibleView } from '../plane/camera.js';
import { docBox } from '../plane/projection.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/**
 * @typedef {Object} LineState — what the line is written from
 * @property {string} id the string its words lead with: the line's state's
 * @property {string} words
 * @property {Array<{act: 'beside' | 'version' | 'again', label: string}>} acts
 */

/** the room between the text's edge, or the overlay, and the line (px) */
const GAP = 8;

/** @type {HTMLElement | null} */
let el = null;
/** the state the element was last written from, as a key; '' where nothing stands */
let written = '';
/** the walk's element takes the focus where the line held it and is gone (the app's hand-off) */
let handOff = () => {};

/**
 * Attach the line's element: a press on one of its acts is N-GO's, a key's
 * where the controller reads one (Enter and Space press a native button).
 * @param {HTMLElement} e
 * @param {{handOff?: () => void}} [r] the app's hand-off of the focus to the walk's element
 */
export function attach(e, r = {}) {
  el = e;
  if (r.handOff) handOff = r.handOff;
  e.addEventListener('click', (ev) => {
    const b = /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (ev.target).closest('[data-act]'));
    const which = b ? b.dataset.act : null;
    if (which === 'beside' || which === 'version' || which === 'again') GO.landingAct(which, FOCUS.byKey(ev));
  });
}

/**
 * What the line holds now (see the head): the landing's line and the acts it
 * offers; null where the landing says nothing on a line.
 * @returns {LineState | null}
 */
export function stateNow() {
  const words = GO.landingLine(), l = GO.landing();
  if (!words || !l || !l.said) return null;
  const offers = GO.landingOffers();
  /** @type {LineState['acts']} */
  const acts = [];
  if (l.beside) acts.push({ act: 'beside', label: t('B1.side-by-side') });
  if (offers.version && l.version != null) acts.push({ act: 'version', label: t('F.floating.read', { k: l.version }) });
  if (offers.again) acts.push({ act: 'again', label: t('B1.try-again') });
  return { id: 'L.held.' + l.said.state, words, acts };
}

/** the line's markup: its words, then its acts */
const markup = (/** @type {LineState} */ s) =>
  `<span class="words" data-string="${esc(s.id)}">${esc(s.words)}</span>` +
  (s.acts.length ? `<span class="acts">${s.acts.map((a) => `<button data-act="${a.act}">${esc(a.label)}</button>`).join('')}</span>` : '');

/**
 * The line redrawn from state (FP-13), on each dirty frame (see the head):
 * written again where what the landing says has changed — the focus kept on
 * the act bearing the same key, and handed to the walk's element where the
 * line held it and nothing in it takes it now — covered while the reading
 * scene stands, and placed (`place`).
 */
export function render() {
  if (!el) return;
  const host = el, s = stateNow(), key = s ? JSON.stringify(s) : '';
  if (key !== written) {
    const at = typeof document !== 'undefined' ? document.activeElement : null;
    const held = !!at && at !== host && host.contains(at);
    FOCUS.keep(host, (e) => /** @type {HTMLElement} */ (e).dataset.act || null, () => {
      host.innerHTML = s ? markup(s) : '';
      host.classList.toggle('on', !!s);
    });
    written = key;
    if (held && !host.contains(document.activeElement)) handOff();
  }
  const covered = SCENE.isOpen();
  if (host.inert !== covered) FOCUS.cover(host, covered);
  host.classList.toggle('covered', covered);
  if (s && !covered) place();
}

/**
 * The line placed at the text's edge beside the landing (see the head):
 * past the right edge of the part of the block holding the landing's first
 * held line, its top level with that line's; where that text is not laid
 * out, past its document's box's right edge at its top; moved below the
 * standing overlay where the two would meet; held inside the visible view.
 */
function place() {
  const l = GO.landing();
  if (!el || !l) return;
  const seen = visibleView(LINE.bottom());
  const at = leaveAt(pageGeometry(seen), l.addr, [{ pos: l.pos, width: 1 }]);
  const b = docBox(l.addr);
  let x = at ? at.from.x + GAP : sx(b.x + b.w) + GAP, y = at ? at.line.y : sy(b.y);
  const r = el.getBoundingClientRect();
  const o = HOST.hasCurrent() ? HOST.element() : null, or = o ? o.getBoundingClientRect() : null;
  if (or && x < or.right && or.left < x + r.width && y < or.bottom && or.top < y + r.height) y = or.bottom + GAP;
  x = Math.max(seen.x + 6, Math.min(seen.x + seen.w - r.width - 6, x));
  y = Math.max(seen.y + 6, Math.min(seen.y + seen.h - r.height - 6, y));
  el.style.left = x + 'px'; el.style.top = y + 'px';
}

/** the line as it stands (the gate reads it): its words, its acts' keys, its rect on screen, and whether the scene covers it; null where none stands */
export function shown() {
  if (!el || !el.classList.contains('on')) return null;
  const r = el.getBoundingClientRect(), words = el.querySelector('.words');
  return {
    words: words ? words.textContent || '' : '', acts: [...el.querySelectorAll('[data-act]')].map((x) => /** @type {HTMLElement} */ (x).dataset.act || ''),
    rect: { x: r.left, y: r.top, w: r.width, h: r.height }, covered: el.classList.contains('covered'),
  };
}
