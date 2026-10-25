// P-REG's test: each datum one variable (ux-T1 (a)) — the three linkers take
// three hues; the visited value is lighter; the label floor stands above the
// readable em; the tail shorter than a gutter at the smallest em an article
// stands at; the corner narrower compact than whole, holding a kept word
// whole; the three faces each their job's, the shipped two waited on in
// every style the style declares; the CSS variables carry the same values.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HUE, VISITED_ALPHA, KIND_FORM, EDGE, LABEL_MIN_PX, TAIL, CORNER, FACE, SHIPPED, cornerWidth, cssVariables } from './register.js';
import { LOD_TXT_LO, UNMOUNT_EM } from './lod.js';
import { GUTTER } from './layout.js';

test('the linker\'s palette has three distinct hues: you, the owner, everyone else', () => {
  assert.equal(new Set([HUE.you, HUE.owner, HUE.others]).size, 3);
});
test('the visited value is lighter than full and above the legibility floor', () => {
  assert.ok(VISITED_ALPHA < 1 && VISITED_ALPHA >= 0.3);
});
test('the label floor stands above the canvas\'s readable em (P-LOD\'s LOD_TXT_LO)', () => {
  assert.ok(LABEL_MIN_PX > LOD_TXT_LO);
});
test('a tail leaving a column\'s line ends in the gutter, short of the next column\'s text, at the smallest em an article stands at (issue #132)', () => {
  assert.ok(TAIL.length > 0 && TAIL.length < GUTTER * UNMOUNT_EM, `${TAIL.length} px against a gutter of ${GUTTER * UNMOUNT_EM} px`);
});
test('a connection\'s kind takes a form, a box\'s state an edge weight', () => {
  assert.ok(Array.isArray(KIND_FORM.link) && KIND_FORM.identity === 'band');
  assert.ok(EDGE.edition > EDGE.draft);
});
test('the CSS variables carry the register\'s values', () => {
  const v = cssVariables();
  assert.equal(v['--hue-you'], HUE.you);
  assert.equal(v['--visited-alpha'], String(VISITED_ALPHA));
  assert.deepEqual([v['--corner-px'], v['--corner-w'], v['--corner-compact-w'], v['--corner-pad']], [CORNER.px + 'px', CORNER.whole + 'em', CORNER.compact + 'em', CORNER.pad + 'px'], 'the corner\'s sizes, which the style sets it by');
  assert.deepEqual([v['--face-reading'], v['--face-client'], v['--face-ident']], [FACE.reading, FACE.client, FACE.ident], 'the three faces\' stacks');
});
test('a document\'s words are set in Charter, the client\'s in the system\'s face, addresses and fingerprints in Atkinson Hyperlegible Mono, each falling back to its generic family; the shipped two waited on in Charter\'s four styles and the mono\'s one (issue #16)', () => {
  assert.deepEqual(FACE, { reading: 'Charter, serif', client: 'system-ui, sans-serif', ident: '"Atkinson Hyperlegible Mono", monospace' });
  assert.deepEqual(SHIPPED.filter((s) => s.endsWith('Charter')).map((s) => s.replace(/16px Charter$/, '').trim()), ['', 'italic', 'bold', 'italic bold'], 'Charter in all four styles');
  assert.equal(SHIPPED.filter((s) => s.endsWith('"Atkinson Hyperlegible Mono"')).length, 1, 'the mono\'s one file, every weight in it');
});
test('the corner compact is narrower than whole, its padding inside its width, and holds a kept word whole: "document", at its size (issue #151; FP-26: never cut mid-word)', () => {
  assert.deepEqual([cornerWidth(false), cornerWidth(true)], [CORNER.whole * CORNER.px, CORNER.compact * CORNER.px], 'its em at its size, the padding inside it');
  assert.ok(cornerWidth(true) < cornerWidth(false));
  assert.ok('document'.length * 0.6 * CORNER.px <= cornerWidth(true) - 2 * CORNER.pad, 'the compact corner\'s text holds the longest word its kept items carry');
});
