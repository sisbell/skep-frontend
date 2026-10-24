// P-RENDER's test: the board's statements beneath its label (B1-S3) — at
// the floor the residue statement, and while the shell's index reports
// changes it could not place (the arm `unplaced`), that a document such a
// change created is not shown, every count a lower bound meanwhile (issue
// #212's design decision: a page that says nothing while the arm stands, or
// draws a count exact under it, turns red); complete, nothing.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import { boardStatements } from './render.js';
import { t } from '../strings.js';

test('while the shell\'s index reports changes it could not place, the board\'s label says so and no count is exact; at the floor it states the residue; complete, nothing (issue #212)', () => {
  REC._reset();
  REC.takeIndex(/** @type {any} */ ({ docs: [], counts: [{ account: '1.0.1', documents: 3 }], state: { arm: 'complete' } }));
  assert.deepEqual([boardStatements(), REC.countOf('1.0.1').exact], [[], true], 'complete: nothing said, the counts exact');
  REC.setIndexState({ arm: 'at_the_floor', floor: 8265 });
  assert.deepEqual(boardStatements(), [t('F.board-residue', { floor: 8265 })], 'at the floor: the residue');
  // the shell's own spelling of the arm (skep-shell's `state_json`): the range the bare rows stand in, and how many
  REC.setIndexState({ arm: 'unplaced', range: 'board', count: 2 });
  assert.deepEqual([boardStatements(), REC.countOf('1.0.1').exact], [[t('L.board-unplaced')], false], 'changes it could not place: said, and every count a lower bound');
});
