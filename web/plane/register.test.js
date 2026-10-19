// P-REG's test: each datum one variable (ux-T1 (a)) — the three linkers take
// three hues; the visited value is lighter; the CSS variables carry the same
// values.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HUE, VISITED_ALPHA, KIND_FORM, EDGE, cssVariables } from './register.js';

test('the linker\'s palette has three distinct hues: you, the owner, everyone else', () => {
  assert.equal(new Set([HUE.you, HUE.owner, HUE.others]).size, 3);
});
test('the visited value is lighter than full and above the legibility floor', () => {
  assert.ok(VISITED_ALPHA < 1 && VISITED_ALPHA >= 0.3);
});
test('a connection\'s kind takes a form, a box\'s state an edge weight', () => {
  assert.ok(Array.isArray(KIND_FORM.link) && KIND_FORM.identity === 'band');
  assert.ok(EDGE.edition > EDGE.draft);
});
test('the CSS variables carry the register\'s values', () => {
  const v = cssVariables();
  assert.equal(v['--hue-you'], HUE.you);
  assert.equal(v['--visited-alpha'], String(VISITED_ALPHA));
});
