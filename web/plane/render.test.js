// P-RENDER's test: the board's statements beneath its label (B1-S3) — at
// the floor the residue statement, and while the shell's index reports
// changes it could not place (the arm `unplaced`), that a document such a
// change created is not shown, every count a lower bound meanwhile (issue
// #212's design decision: a page that says nothing while the arm stands, or
// draws a count exact under it, turns red); complete, nothing. WHERE NO BOARD
// IS HELD (issue #215's design decision; FP-35) a whole frame, drawn on a
// recording context, names none — no board's label, origin or count, no frame
// of the account under the view, no string set, no ring at the walk's root —
// where the same frames with the board held do (a page that draws board 1, or
// frames the account the grid finds under the view, turns red).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as CAM from './camera.js';
import * as WALK from '../nav/walk.js';
import * as RENDER from './render.js';
import { boardStatements } from './render.js';
import { boardCell, accountCell } from './projection.js';
import { recorder } from '../test/canvas.js';
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

test('where no board is held the plane names none — no board\'s outline, label, origin or count, no frame of the account under the view, no ring at the walk\'s root — where the same frames with the board held draw its label, the account\'s frame and the ring (issue #215\'s design decision: "`render.js` draws no board: no outline, label, origin or count"; FP-35)', async () => {
  const { ctx, texts } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  CAM.setViewport(1440, 900);
  /** a frame drawn at a view: every label handed to the pass, by its kind and place — set or left out — what was written, and the ring */
  const frame = (/** @type {{x: number, y: number, scale: number}} */ v) => {
    texts.length = 0;
    CAM.set(v);
    RENDER.draw();
    const s = RENDER.stats;
    return { labels: [...new Set([...s.labels, ...s.labelsLeftOut].map((l) => l.kind + ' ' + l.place))], texts: texts.slice(), ring: s.ring };
  };
  /** the launch's view, the board's extent; and an account's cell at mid scale */
  const whole = CAM.viewForCell(boardCell('1'), 0.92), mid = CAM.viewForCell(accountCell('1.0.1'), 0.85);
  REC._reset();
  try {
    // the walk on its root, a key having moved it there: the ring drawn where a place is named
    await WALK.focusTo('1', null, true);
    REC.takeBoards({ result: [] });
    for (const [where, v] of /** @type {Array<[string, typeof whole]>} */ ([['the board\'s extent', whole], ['an account\'s cell at mid scale', mid]])) {
      const f = frame(v);
      assert.deepEqual([f.labels, f.texts, f.ring], [[], [], null], `${where}: nothing named — no board, no account, no ring`);
    }
    REC.setBoard({ board: 'b-1', name: '', origin: 'http://127.0.0.1:8642' });
    const atWhole = frame(whole), atMid = frame(mid);
    assert.ok(atWhole.labels.includes('board 1') && atWhole.texts.some((s) => s.includes('http://127.0.0.1:8642')) && atWhole.ring != null, `the board held: its label, its origin set, the ring at the root: ${JSON.stringify(atWhole)}`);
    assert.ok(atMid.labels.includes('frame 1.0.1'), `and the frame of the account under the view: ${JSON.stringify(atMid.labels)}`);
  } finally { REC._reset(); }
});
