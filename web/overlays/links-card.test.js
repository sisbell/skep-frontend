// O-LINKS's test: the overlay toggle as the card sets it (B1-S4; R60) — one
// switch named by the toggle's words before ⟨state⟩ and described by its
// count after it, the same name and description in both states, its state
// the word between them and its `aria-checked`, its text the toggle's words
// in that state.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { othersSwitch } from './links-card.js';
import { t } from '../strings.js';

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
