// O-STATEMENT's test: a statement's parts are its lines, in order, in one
// paragraph that carries no list, group or heading; each line hangs its
// wraps, the exit alone stands after a half line, the measure is sixty
// characters and no other ink is set; and what is drawn is what is spoken —
// the join of the parts, the statement's string.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as ST from './statement.js';
import { t, statementParts } from '../strings.js';

/** the markup's text as a reader of it hears it: its tags out, its entities read */
const textOf = (/** @type {string} */ html) => html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'');
/** each part's line of a statement's markup: its classes, its style and its words */
const linesOf = (/** @type {string} */ html) => [...html.matchAll(/<span class="([^"]*)" style="([^"]*)">([^<]*)<\/span>/g)].map((m) => ({ cls: m[1], style: m[2], text: textOf(m[3]) }));

test('a statement is one paragraph, each part a line inside it in the statement\'s order, a space between two: what is drawn is what is spoken, the join of the parts, the statement\'s own string', () => {
  for (const [id, values] of /** @type {Array<[string, Record<string, string> | undefined]>} */ ([['B3.refused.discard', undefined], ['B3.moved.discard', undefined], ['B3.answers_lost.discard', { board: 'your notebook' }], ['B3.head_unreadable.discard.said', { board: 'board 1' }], ['B3.head_unreadable.discard.said.typed', { board: 'board 1' }]])) {
    const html = ST.statementHTML(id, values), lines = linesOf(html);
    assert.equal((html.match(/<p /g) || []).length, 1, `${id}: one paragraph`);
    assert.ok(html.startsWith(`<p class="statement" data-string="${id}"`) && html.endsWith('</p>'), `${id}: the paragraph named by its string`);
    assert.deepEqual(lines.map((l) => l.text), statementParts(id, values).map((q) => q.text), `${id}: its parts its lines, in order`);
    assert.equal(textOf(html), t(id, values), `${id}: the characters drawn are the statement's string`);
    assert.equal(ST.spoken(id, values), t(id, values), `${id}: and the string its act is described by`);
    assert.ok(!/<(ul|ol|li|h[1-6]|dl|dt|dd|fieldset|table|hr|b|strong|i|em|img|svg)\b/.test(html) && !/role=|aria-/.test(html), `${id}: no list, group or heading semantics, and no mark of emphasis`);
  }
});

test('each part\'s line hangs its wraps one em, so a wrap never reads as a new part; the exit part alone stands after a half line; the measure is at most sixty characters of the face it is set in, its figures tabular, and nothing else is set — no ground, rule, hue, weight, slope or capitals', () => {
  const html = ST.statementHTML('B3.moved.discard'), lines = linesOf(html);
  assert.deepEqual(lines.map((l) => l.cls), ['part', 'part', 'part exit'], 'the moved document\'s statement: two parts, then its exit');
  for (const l of lines) assert.ok(l.style.includes(`padding-left:${ST.HANG_EM}em`) && l.style.includes(`text-indent:-${ST.HANG_EM}em`) && l.style.includes('display:block'), `a line of its own, its wraps hung: ${l.style}`);
  assert.deepEqual(lines.map((l) => /margin-top/.test(l.style)), [false, false, true], 'room before the exit alone');
  assert.ok(lines[2].style.endsWith(`margin-top:${ST.HALF_LINE}lh`), 'a half line, by the face\'s own line');
  assert.equal(ST.HALF_LINE, 0.5);
  const set = /** @type {RegExpMatchArray} */ (html.match(/^<p class="statement" data-string="[^"]*" style="([^"]*)">/))[1];
  assert.ok(set.includes(`max-width:${ST.MEASURE_CH}ch`) && ST.MEASURE_CH === 60, 'the measure: sixty characters of the face, at its size');
  assert.ok(set.includes('font-variant-numeric:tabular-nums'), 'tabular figures');
  assert.ok(!/background|border|color:|text-decoration|box-shadow|outline|uppercase|bold|italic|list-style/.test(html), 'no other ink');
  assert.deepEqual(linesOf(ST.statementHTML('B3.refused.discard')).map((l) => /margin-top/.test(l.style)), [false, false], 'a statement naming no exit: no half line');
});

test('a short private act\'s statement sits in a block of its own below the face\'s acts, from the face\'s left edge, whole — every part drawn, none folded; a part whose case does not hold leaves no line and no gap; a token\'s value is escaped', () => {
  const placed = ST.below('B3.refused.discard');
  assert.ok(placed.startsWith('<div class="said" data-below="acts"') && placed.includes('text-align:left') && placed.endsWith('</div>'), 'its block, below the acts, from the left edge');
  assert.equal(textOf(placed), t('B3.refused.discard'), 'whole: every part, nothing behind a disclosure');
  assert.ok(!/<button|<details|<summary|hidden/.test(placed), 'no act and no fold in it');
  assert.deepEqual(linesOf(ST.statementHTML('B3.refused.discard', undefined, () => false)).length, 2, 'parts said in every case stand whatever the cases');
  assert.equal(textOf(ST.statementHTML('B3.answers_lost.discard', { board: '<b>&' })), t('B3.answers_lost.discard', { board: '<b>&' }), 'a value set as text, never as markup');
  assert.ok(!ST.statementHTML('B3.answers_lost.discard', { board: '<b>&' }).includes('<b>'));
});
