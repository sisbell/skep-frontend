// O-LINKS's test: the overlay toggle as the card sets it (B1-S4; R60) — one
// switch named by the toggle's words before ⟨state⟩ and described by its
// count after it, the same name and description in both states, its state
// the word between them and its `aria-checked`, its text the toggle's words
// in that state; and each row of links named by its type, the way its link
// runs in words and its far end, never by the symbol or the arrow drawn in
// it, the far document's own words kept as written (style S22).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as LINKS from './links-card.js';
import * as HOST from './host.js';
import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import { resolveSpan } from '../model/address.js';
import { t, heard } from '../strings.js';

const { othersSwitch } = LINKS;

/** HTML as text: its tags dropped, the escapes `esc` writes undone */
const text = (/** @type {string} */ html) => html.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

/**
 * The switch as assistive technology meets it: its role and state, the name
 * its `aria-labelledby` points at, the description its `aria-describedby`
 * points at, and its text.
 * @param {string} html
 */
function read(html) {
  const button = html.match(/^<button([^>]*)>(.*)<\/button>$/s);
  assert.ok(button, 'the switch is one button');
  const attr = (/** @type {string} */ k) => { const m = button[1].match(new RegExp(`\\s${k}="([^"]*)"`)); return m ? m[1] : null; };
  const byId = (/** @type {string | null} */ id) => { const m = id ? button[2].match(new RegExp(`<span id="${id}">([^<]*)</span>`)) : null; return m ? text(m[1]) : null; };
  return { role: attr('role'), checked: attr('aria-checked'), name: byId(attr('aria-labelledby')), description: byId(attr('aria-describedby')), text: text(button[2]) };
}

test('the switch is named by the words before its state and described by its count, the same in both states', () => {
  const off = read(othersSwitch(false, 0)), on = read(othersSwitch(true, 0));
  assert.deepEqual([off.role, off.checked], ['switch', 'false']);
  assert.deepEqual([on.role, on.checked], ['switch', 'true']);
  assert.equal(off.name, "others' links");
  assert.equal(off.description, '0 touch this document');
  assert.deepEqual([on.name, on.description], [off.name, off.description], 'a press changes the state alone');
});

test('the switch reads as B1-S4 writes the toggle, in each state and at one', () => {
  for (const on of [false, true]) {
    const state = on ? 'on' : 'off';
    const many = read(othersSwitch(on, 3)), one = read(othersSwitch(on, 1));
    assert.equal(many.text, t('B1.others-toggle', { state, n: 3 }));
    assert.equal(many.description, '3 touch this document');
    assert.equal(one.text, t('B1.others-toggle.1', { state }));
    assert.equal(one.description, '1 touches this document');
    for (const s of [many, one]) assert.ok(s.name && s.description && s.text.startsWith(s.name) && s.text.endsWith(s.description), 'the name is the words a person sees first, the description the words they see last');
  }
});

test('each row is named by its link\'s type, the way the link runs from this document said "to" or "from", and its far end, rendered for the ear — never the symbol or the arrow drawn in it — the far document\'s own words kept as written (style S22; patterns K1; issue #626)', () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null, getElementById: () => null });
  const host = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };
  HOST.attach(/** @type {any} */ (host));
  // the first edition's citation of 1.0.1.0.127 whole from its bytes at 11, and that document's citation of its bytes at 1 homed in it
  const D = '1.0.1.0.3', FAR = '1.0.1.0.127', CITE = '1.1.0.1.0.1.0.3.13', TEXT = 'Tumbler.\n\nThe first field.', TITLE = 'Notes — “dawn” → (draft)';
  const [OUT, IN] = [D + '.0.2.1', D + '.0.2.2'], UNDATED = { at: null, time: null, from: null };
  REC.takeDelivery(D, [{ pos: 1, width: TEXT.length, kind: 'content', text: TEXT, ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: TEXT.length }]);
  REC.takeDelivery(FAR, [{ pos: 1, width: 5, kind: 'content', text: 'Notes', ref: null, origin: null }]);
  REC.takeLinks(D, [OUT, IN]);
  REC.takeLink({ addr: OUT, from: [resolveSpan({ start: D + '.0.1.11', width: '0.0.0.0.0.0.0.5' })], to: [resolveSpan({ start: FAR, width: '0.0.0.0.1' })], type: CITE, age: UNDATED });
  REC.takeLink({ addr: IN, from: [resolveSpan({ start: FAR, width: '0.0.0.0.1' })], to: [resolveSpan({ start: D + '.0.1.1', width: '0.0.0.0.0.0.0.3' })], type: CITE, age: UNDATED });
  LK.readers({ first: () => [{ text: TITLE, face: 'reading' }] });
  try {
    LINKS.show(D);
    const rows = [...host.innerHTML.matchAll(/<button data-run="row:\d+"[^>]*aria-label="([^"]*)">(.*?)<\/button>/g)].map((m) => ({ name: text(m[1]), drawn: text(m[2]) }));
    const type = heard(t('R5.undocumented', { T: '3.13' }));
    assert.deepEqual(rows.map((r) => r.name).sort(), [`${type}, ${t('F.card.from')} ${FAR}, ${TITLE}`, `${type}, ${t('F.card.to')} ${FAR}, ${TITLE}`].sort(),
      'each row named by its type, the way its link runs in words and its far end, the far document\'s words — glyphs and all — as written');
    for (const r of rows) {
      assert.ok(!/[⟡←→·—]/.test(r.name.replace(TITLE, '')), `no symbol, arrow, dot or dash in the name outside the document's words: ${r.name}`);
      assert.ok(r.drawn.startsWith('⟡ ') && /· [←→] /.test(r.drawn), `the symbol and the arrow still drawn: ${r.drawn}`);
    }
    HOST.dismiss();
  } finally { LK._reset(); globalThis.document = platform; }
});
