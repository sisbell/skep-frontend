// O-LINKS's test: the overlay toggle as the card sets it (B1-S4; R60) — one
// switch named by the toggle's words before ⟨state⟩ and described by its
// count after it, zero in words, the same name and description in both
// states, its state the word between them, "shown" or "hidden", and its
// `aria-checked`, its text the toggle's words in that state; each row of
// links drawn and named by the way its link runs in words and its far end
// first, then its type, never by the symbol drawn in it, the far document's
// own words kept as written (style S22); the card captioned by its document's
// label and address, set as written, its acts in words and its list's end
// said in words.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as LINKS from './links-card.js';
import * as HOST from './host.js';
import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import { resolveSpan } from '../model/address.js';
import { readFileSync } from 'node:fs';
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
  assert.equal(off.name, 'Others’ links');
  assert.equal(off.description, 'none touch this document');
  assert.deepEqual([on.name, on.description], [off.name, off.description], 'a press changes the state alone');
});

test('the switch says its state in words, "shown" or "hidden", and a count of none in words (B1-S4; style S18)', () => {
  assert.deepEqual([false, true].map((on) => read(othersSwitch(on, 3)).text), ['Others’ links: hidden · 3 touch this document', 'Others’ links: shown · 3 touch this document']);
  assert.deepEqual([false, true].map((on) => read(othersSwitch(on, 0)).text), ['Others’ links: hidden · none touch this document', 'Others’ links: shown · none touch this document']);
  assert.equal(read(othersSwitch(true, 1)).text, 'Others’ links: shown · 1 touches this document');
  assert.ok(!/\b(on|off)\b|\b0\b/.test([0, 1, 3].flatMap((n) => [false, true].map((on) => read(othersSwitch(on, n)).text)).join(' ')), 'never "on", "off" or a bare 0');
});

test('the switch reads as B1-S4 writes the toggle, in each state and at one', () => {
  for (const on of [false, true]) {
    const state = t(on ? 'B1.others-toggle.shown' : 'B1.others-toggle.hidden');
    const many = read(othersSwitch(on, 3)), one = read(othersSwitch(on, 1));
    assert.equal(many.text, t('B1.others-toggle', { state, n: 3 }));
    assert.equal(many.description, '3 touch this document');
    assert.equal(one.text, t('B1.others-toggle.1', { state }));
    assert.equal(one.description, '1 touches this document');
    for (const s of [many, one]) assert.ok(s.name && s.description && s.text.startsWith(s.name) && s.text.endsWith(s.description), 'the name is the words a person sees first, the description the words they see last');
  }
});

/** the first edition, its text and its bytes, the document it cites whole, and its two links with that document — one from it, one to it */
const D = '1.0.1.0.3', FAR = '1.0.1.0.127', CITE = '1.1.0.1.0.1.0.3.13', TITLE = 'Notes — “dawn” → (draft)';

/**
 * The card shown at the first edition, its markup handed to `see` — the page's
 * platform stood in for, the edition's text and its two links held, the far
 * document's first line TITLE, the index listing `label` for the edition where
 * one is given — then dismissed and everything it held reset.
 * @param {(html: string) => void} see
 * @param {{label?: string | null, type?: string | null}} [opts] the first line the index lists for the edition; the links' type, CITE where none is given
 */
function withCard(see, { label = null, type = CITE } = {}) {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null, getElementById: () => null });
  const host = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };
  HOST.attach(/** @type {any} */ (host));
  // the first edition's citation of 1.0.1.0.127 whole from its bytes at 11, and that document's citation of its bytes at 1 homed in it
  const TEXT = 'Tumbler.\n\nThe first field.', [OUT, IN] = [D + '.0.2.1', D + '.0.2.2'], UNDATED = { at: null, time: null, from: null };
  if (label != null) REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label, standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  REC.takeDelivery(D, [{ pos: 1, width: TEXT.length, kind: 'content', text: TEXT, ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: TEXT.length }]);
  REC.takeDelivery(FAR, [{ pos: 1, width: 5, kind: 'content', text: 'Notes', ref: null, origin: null }]);
  REC.takeLinks(D, [OUT, IN]);
  REC.takeLink({ addr: OUT, from: [resolveSpan({ start: D + '.0.1.11', width: '0.0.0.0.0.0.0.5' })], to: [resolveSpan({ start: FAR, width: '0.0.0.0.1' })], type, age: UNDATED });
  REC.takeLink({ addr: IN, from: [resolveSpan({ start: FAR, width: '0.0.0.0.1' })], to: [resolveSpan({ start: D + '.0.1.1', width: '0.0.0.0.0.0.0.3' })], type, age: UNDATED });
  LK.readers({ first: () => [{ text: TITLE, face: 'reading' }] });
  try {
    LINKS.show(D);
    see(host.innerHTML);
    HOST.dismiss();
  } finally { LK._reset(); REC._reset(); globalThis.document = platform; }
}

test('each row reads the way the link runs from this document, "to" or "from", and its far end first, then its type — drawn so and named so, rendered for the ear, never by the symbol drawn in it, no arrow drawn — the far document\'s own words kept as written (style S22; patterns K1; issue #626)', () => {
  withCard((html) => {
    const rows = [...html.matchAll(/<button data-run="row:\d+"[^>]*aria-label="([^"]*)">(.*?)<\/button>/g)].map((m) => ({ name: text(m[1]), drawn: text(m[2]) }));
    const type = t('R5.undocumented', { T: '3.13' });
    assert.deepEqual(rows.map((r) => r.name).sort(), [`${t('F.card.from')} ${FAR}, ${TITLE}, ${heard(type)}`, `${t('F.card.to')} ${FAR}, ${TITLE}, ${heard(type)}`].sort(),
      'each row named by the way its link runs in words and its far end, then its type, the far document\'s words — glyphs and all — as written');
    assert.deepEqual(rows.map((r) => r.drawn).sort(), [`⟡ ${t('F.card.from')} ${FAR} · ${TITLE} · ${type}`, `⟡ ${t('F.card.to')} ${FAR} · ${TITLE} · ${type}`].sort(),
      'each row drawn far end first: its symbol, the way its link runs in words and its far end, then its type');
    for (const r of rows) {
      assert.ok(!/[⟡←→·—]/.test(r.name.replace(TITLE, '')), `no symbol, arrow, dot or dash in the name outside the document's words: ${r.name}`);
      assert.ok(!/[←→]/.test(r.drawn.replace(TITLE, '')), `no arrow drawn outside the document's words: ${r.drawn}`);
    }
  });
});

test('the card is captioned by its document — "Links on" its label, then its address in parentheses, or its address alone where the index lists no label — in the caption class set as written, never in capitals (B1-S4; style S10)', () => {
  /** @type {string[]} */
  const captions = [];
  const caption = (/** @type {string} */ html) => { const m = html.match(/^<span class="([^"]*)">(.*?)<\/span><div class="stage">/); assert.ok(m, 'the card opens with its caption'); captions.push(m[1], text(m[2])); };
  withCard(caption, { label: 'Tumbler.' });
  withCard(caption);
  assert.deepEqual(captions, ['label cased', 'Links on Tumbler. (1.0.1.0.3)', 'label cased', 'Links on 1.0.1.0.3']);
  const css = readFileSync(new URL('../style.css', import.meta.url), 'utf8');
  const caps = css.indexOf(':is(#overlay, #notice) .label { '), cased = css.indexOf(':is(#overlay, #notice) .label.cased { text-transform:none; }');
  assert.ok(caps >= 0 && /text-transform:uppercase/.test(css.slice(caps, css.indexOf('}', caps))), 'every other overlay\'s caption keeps its capitals');
  assert.ok(cased > caps, 'the caption class sets the link cards\' captions as written, after the rule it overrides');
});

test('the card\'s acts say what they do in words — the stage act showing or hiding where the links lead, each lens\'s chip named by its lens\'s label and its own words, "none" where a lens has no chips, "Clear filters" while one is on — and the list whole ends "No more links."; no glyph stands for an act or an end (B1-S4; style S9, S22)', () => {
  /** the card's own markup: the host's dismiss after it dropped, which is every overlay's */
  const own = (/** @type {string} */ html) => html.slice(0, html.indexOf('<button class="x"'));
  withCard((html) => {
    assert.match(html, /<button data-run="stage3">Show where the links lead<\/button>/, 'at the symbols: show where the links lead');
    assert.match(html, /<span class="end" data-string="B1.links.end">No more links\.<\/span><div class="clause"/, 'the list whole: its end in words, the clause after it');
    assert.match(html, /<span class="lens-label" id="links-lens-owner">Owner<\/span><button class="id" id="links-lens-owner-0" data-run="owner:1\.0\.1" aria-pressed="false" aria-labelledby="links-lens-owner links-lens-owner-0">1\.0\.1<\/button>/, 'an owner chip, named by its lens\'s label and its own words');
    assert.match(html, /aria-labelledby="links-lens-type links-lens-type-0">link of type 3\.13, undocumented here<\/button><button data-run="endorsed"/, 'a type chip so named, the endorsed chip after it on its own words, no label before it');
    assert.ok(!/[◦×·]<\/|— content|endorsement/.test(own(html)), 'no glyph for an act or for the end, no label before the endorsed chip');
  });
  withCard((html) => assert.match(text(html), /TypenoneEndorsed by the owner/, 'no type to filter by: "none" in the chips\' place'), { type: null });
  LK.reveal(D, 3);
  LK.lens(D, { endorsed: true });
  withCard((html) => {
    assert.match(html, /<button data-run="stage2">Hide where the links lead<\/button>/, 'where each link\'s way is drawn: hide it');
    assert.match(own(html), /<button data-run="clear">Clear filters<\/button><\/div>/, 'a filter on: "Clear filters", never "×"');
  });
});
