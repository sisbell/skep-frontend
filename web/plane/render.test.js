// P-RENDER's test, on a recording context: the board's statements beneath
// its label (B1-S3) — the residue statement at the floor, that a document
// the shell's index could not place is not shown while its arm stands, every
// count a lower bound meanwhile, and nothing when complete (FP-23); where
// no board is held a whole frame names none — no board's label, origin
// or count, no frame of the account under the view, no ring at the walk's
// root — where the same frames with the board held do (FP-35); and a
// document's label at mid scale its contents line — its first line where
// those words stand, its address at the row's end, past its region's prefix
// only where the region is named — each line on its own plate, its address
// in the title's ink (FP-26).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as CAM from './camera.js';
import * as WALK from '../nav/walk.js';
import * as RENDER from './render.js';
import { boardStatements } from './render.js';
import * as LAYER from '../text/layer.js';
import { boardCell, accountCell, docBox, accountAt } from './projection.js';
import { leadOf, firstRow, GUTTER } from './layout.js';
import { COL } from './register.js';
import { recorder } from '../test/canvas.js';
import { t } from '../strings.js';

/** the address a set label carries: the text of its line whose runs are all in the identifier's face */
const addressOf = (/** @type {import('./labels.js').SetLabel} */ l) => (l.lines.find((x) => x.runs.every((r) => r.face === 'ident')) || { text: null }).text;

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
    return { labels: [...new Set([...s.labels, ...s.labelsLeftOut].map((l) => l.kind + ' ' + l.place))], texts: texts.slice(), lines: s.labels.flatMap((l) => l.lines.map((x) => x.text)), ring: s.ring };
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
    assert.ok(atWhole.labels.includes('board 1') && atWhole.lines.some((s) => s.includes('http://127.0.0.1:8642')) && atWhole.texts.length > 0 && atWhole.ring != null, `the board held: its label, its origin set, the ring at the root: ${JSON.stringify(atWhole)}`);
    assert.ok(atMid.labels.includes('frame 1.0.1'), `and the frame of the account under the view: ${JSON.stringify(atMid.labels)}`);
  } finally { REC._reset(); }
});

test('at mid scale a document\'s label is its contents line: its first line from where those words stand in its first column, cut on a word, its address at the end of that row — past its region\'s prefix where the one line names the region, whole where nothing in view names it — each line on a plate of its own and its address in the title\'s ink (issue #23)', () => {
  const D = '1.0.1.0.3';
  const { ctx, inked, rects } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  CAM.setViewport(4000, 900);
  REC._reset();
  try {
    REC.setBoard({ board: 'b-1', name: '', origin: 'http://127.0.0.1:8642' });
    REC.setSession({ session: 's-1', principal: 1, account: '1.0.1', writes: true });
    REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'Notes on the artifact chain of custody', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 600 }]);
    const box = docBox(D), f = LAYER.foldOf(REC.doc(D)), lead = leadOf(f), col = f.columns[lead.column], scale = 3 / f.fs;
    /** the frame drawn with the camera's centre at a point, its document label */
    const frame = (/** @type {number} */ x) => {
      inked.length = 0; rects.length = 0;
      CAM.set({ x, y: box.y + box.h / 2, scale });
      RENDER.draw();
      return RENDER.stats.labels.find((l) => l.kind === 'doc' && l.place === D);
    };
    // the camera's centre over D's own account: the one line names it
    const named = frame(box.x + box.w / 2);
    assert.ok(named, 'its label set');
    const l = /** @type {import('./labels.js').SetLabel} */ (named), [first, address, badge] = l.lines;
    assert.deepEqual(l.lines.map((x) => x.text), ['Notes on the…', '.0.3', t('L.arriving')], 'its first line leading, cut on a word, then its address past its region\'s prefix; its badge — its links arriving — beneath');
    assert.ok(badge.rect.y >= Math.max(first.rect.y + first.rect.h, address.rect.y + address.rect.h) - 1e-6, 'the badge beneath the row');
    assert.ok(Math.abs(first.rect.x - CAM.sx(box.x + lead.x)) < 1e-6, `its first line from where those words stand: ${first.rect.x} against ${CAM.sx(box.x + lead.x)}`);
    assert.ok(Math.abs(first.rect.y + first.rect.h / 2 - CAM.sy(box.y + lead.y + lead.h / 2)) < 1e-6, 'level with the line those words stand on');
    assert.ok(first.rect.x + first.rect.w <= CAM.sx(box.x + col.x + col.w) + 1e-6, 'inside its column');
    const row = firstRow(f), g = (GUTTER / 2) * f.fs;
    assert.ok(Math.abs(address.rect.x + address.rect.w - CAM.sx(box.x + row.x + row.w - g)) < 1e-6, 'its address ending at its row\'s end, the end of the outline\'s first row inside its half gutter');
    assert.ok(inked.some((x) => x.text === '.0.3' && x.ink === COL.title), 'its address in the title\'s ink');
    for (const x of l.lines) assert.ok(rects.some((r) => r.fill === COL.doc && r.x === x.rect.x && r.y === x.rect.y && r.w === x.rect.w && r.h === x.rect.h), `a plate of its ground behind ${x.text} alone`);
    // the camera's centre on the board's own cell, left of D's account: nothing in view names D's region
    const away = accountCell('1.0.1').x - 10;
    assert.equal(accountAt(away, box.y + box.h / 2, '1'), null, 'no account under the centre');
    const whole = frame(away);
    assert.deepEqual(whole && addressOf(whole), D, 'nothing names its region: its whole address');
    // withheld from the reader: its first line's place the client's words, bracketed, the owner they name in the title's ink however the words around it are inked
    REC.takeRefused(D, 'withheld');
    inked.length = 0;
    CAM.set({ ...LAYER.centreOf(D, null), scale: 6 / LAYER.foldOf(REC.doc(D)).fs });
    RENDER.draw();
    const shut = RENDER.stats.labels.find((x) => x.kind === 'doc' && x.place === D);
    assert.equal(shut && shut.lines[0].text, t('L.client-words', { words: t('F.corner.withheld', { owner: '1.0.1' }) }), 'its first line\'s place: its withheld box\'s words, bracketed');
    assert.ok(inked.some((x) => x.text === '1.0.1' && x.ink === COL.title) && inked.some((x) => x.text.includes('withheld') && x.ink === COL.text), `the owner in the title's ink, the words around it in the text's: ${JSON.stringify(inked.slice(0, 8))}`);
  } finally { REC._reset(); CAM.setViewport(1440, 900); }
});
