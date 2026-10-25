// P-RENDER's test, on a recording context: the board's statements beneath
// its label (B1-S3) — the residue statement at the floor, that a document
// the shell's index could not place is not shown while its arm stands, every
// count a lower bound meanwhile, and nothing when complete (FP-23); where
// no board is held a whole frame names none — no board's label, origin
// or count, no frame of the account under the view, no ring at the walk's
// root — where the same frames with the board held do (FP-35); a
// document's label at mid scale its contents line — its first line where
// those words stand, its address at the row's end, past its region's prefix
// only where the region is named — each line on its own plate, its address
// in the title's ink (FP-26); and a continuation's mark two targets where it
// holds two — its newest member's label, as the version its box shows, in a
// band at its foot, and the rest of the mark, its count in what it counts —
// one where it is too small, and a member the walk's ring stands on ringed
// on the mark with its name and place (issue #42).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as CAM from './camera.js';
import * as WALK from '../nav/walk.js';
import * as GO from '../nav/go.js';
import * as RENDER from './render.js';
import { boardStatements } from './render.js';
import * as LAYER from '../text/layer.js';
import { boardCell, accountCell, docBox, accountAt, continuationCell } from './projection.js';
import { markScale } from './lod.js';
import { leadOf, firstRow, GUTTER } from './layout.js';
import { COL, TARGET } from './register.js';
import { recorder } from '../test/canvas.js';
import { t, markCount } from '../strings.js';
import { byteLength } from '../util.js';

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

/** an account of sixty documents the index lists, each its first line "Notes on ⟨n⟩": at HOME the first 48 stand whole and the other twelve are its first continuation's one mark */
function sixty() {
  REC._reset();
  REC.setBoard({ board: 'b-1', name: '', origin: 'http://127.0.0.1:8642' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1', writes: true });
  REC.takeIndex(/** @type {any} */ ({ docs: Array.from({ length: 60 }, (_, i) => ({ doc: `1.0.1.0.${i + 1}`, kind: 'edition', label: `Notes on ${i + 1}`, standing: 'public' })), counts: [{ account: '1.0.1', documents: 60 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  const { ctx } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  return CAM.viewForCell(accountCell('1.0.1'), 0.85);
}
/** the account's first continuation's mark as the last frame drew it */
const firstMark = () => /** @type {import('./render.js').ResidueMark} */ (RENDER.stats.residueMarks.find((m) => m.key === '1.0.1:1'));
const middleOf = (/** @type {{x: number, y: number, w: number, h: number}} */ r) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });
/** two screen rects the same, within a millionth of a px */
const sameRect = (/** @type {{x: number, y: number, w: number, h: number} | null} */ a, /** @type {{x: number, y: number, w: number, h: number}} */ b) => !!a && [a.x - b.x, a.y - b.y, a.w - b.w, a.h - b.h].every((d) => Math.abs(d) < 1e-6);

test('a continuation\'s mark holding two targets is two: its newest member\'s label — the version its box shows, its address then its first line — in a band at its foot a target tall, which a press there goes to, and the rest of the mark, its count in what it counts, which opens the list (issue #42\'s design decision)', async () => {
  const platform = { document: globalThis.document, window: globalThis.window };
  const listens = { addEventListener() {} };
  globalThis.document = /** @type {any} */ ({ ...listens, activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens, getSelection: () => null });
  try {
    const home = sixty();
    // the newest member's box showing its second version, its text held
    const V = '1.0.1.0.60.2', text = 'Take two.';
    REC.takeSpanSet(V, [{ subspace: 1, ordinal: 1, positions: byteLength(text) }]);
    REC.takeDelivery(V, [{ pos: 1, width: byteLength(text), kind: 'content', text, ref: null, origin: null }]);
    const leap = GO.leapTo(V);
    assert.equal(GO.shownIn('1.0.1.0.60'), V, 'the box shows its second version');
    CAM.set(home);
    await leap;
    RENDER.draw();
    const m = firstMark();
    assert.deepEqual([m.k, m.n, m.newest, m.members.length], [1, 12, '1.0.1.0.60', 12], 'the first continuation, its twelve members, its newest the highest-numbered');
    assert.equal(m.lines.join(' '), markCount(12, true), 'its count says what it counts');
    assert.deepEqual(m.newestLines, ['.0.60.2', 'Take two.'], 'its newest member\'s label as a box\'s label sets it, of the version its box shows: its address past the region\'s prefix, then its first line');
    const band = /** @type {{x: number, y: number, w: number, h: number}} */ (m.newestTarget);
    assert.ok(band && band.h >= TARGET.min && Math.abs(band.y + band.h - (m.rect.y + m.rect.h)) < 1e-6 && Math.abs(band.w - m.rect.w) < 1e-6, `the band across the mark's foot, a target tall: ${JSON.stringify({ band, rect: m.rect })}`);
    assert.ok(band.y - m.rect.y >= TARGET.min, 'the rest of the mark a target tall above it');
    const label = RENDER.stats.labels.find((l) => l.kind === 'newest' && l.place === m.key);
    assert.ok(label && label.lines.every((x) => x.rect.y >= band.y - 1e-6 && x.rect.y + x.rect.h <= band.y + band.h + 1e-6), 'the label inside its band');
    const atLabel = middleOf(band), atRest = { x: m.rect.x + m.rect.w / 2, y: m.rect.y + (band.y - m.rect.y) / 2 };
    assert.deepEqual(RENDER.residueAtScreen(atLabel.x, atLabel.y), { account: '1.0.1', k: 1, key: '1.0.1:1', newest: '1.0.1.0.60', target: 'newest' }, 'a press on the band: the newest member');
    assert.equal(RENDER.residueAtScreen(atRest.x, atRest.y)?.target, 'list', 'a press on the rest: the list');
    assert.equal(RENDER.residueAtScreen(m.rect.x - 5, atRest.y), null, 'off the mark: neither');
  } finally {
    REC._reset(); CAM.setViewport(1440, 900);
    globalThis.document = platform.document; globalThis.window = platform.window;
  }
});

test('a mark too small to hold two targets sets no newest label, and the whole mark opens the list (issue #42\'s design decision: "Where the mark is too small for two targets that are easy to hit, it draws no label and the whole mark opens the list")', () => {
  try {
    sixty();
    const c = continuationCell('1.0.1', 1);
    CAM.set({ ...middleOf(c), scale: markScale(1, 0) });
    RENDER.draw();
    const m = firstMark();
    assert.ok(m && (m.rect.w < TARGET.min || m.rect.h < 2 * TARGET.min), `the mark ${JSON.stringify(m && m.rect)} too small for two targets`);
    assert.deepEqual([m.newestTarget, m.newestLines], [null, []], 'no newest target, no newest label');
    assert.ok(![...RENDER.stats.labels, ...RENDER.stats.labelsLeftOut].some((l) => l.kind === 'newest'), 'no newest label handed to the pass');
    for (const p of [middleOf(m.rect), { x: m.rect.x + 1, y: m.rect.y + m.rect.h - 1 }]) assert.equal(RENDER.residueAtScreen(p.x, p.y)?.target, 'list', `at ${JSON.stringify(p)}: the list`);
  } finally { REC._reset(); CAM.setViewport(1440, 900); }
});

test('the walk\'s ring on a member the mark holds stands on the mark, and the mark names the member and its place among its members in its count\'s place, its first stop the mark\'s own (issue #42\'s design decision: "A member\'s ring is drawn on the mark with its name and place")', async () => {
  try {
    const home = sixty();
    CAM.set(home);
    await WALK.focusTo('1.0.1.0.55', null, true);
    assert.ok(WALK.ringShown(), 'a key put the walk there: the ring drawn');
    RENDER.draw();
    const m = firstMark();
    assert.ok(sameRect(RENDER.stats.ring, m.rect), `the ring on the mark, never on the member's own outline inside it: ${JSON.stringify([RENDER.stats.ring, m.rect])}`);
    assert.equal(m.lines.join(' '), t('L.mark.member', { name: '.0.55', i: 7, n: 12 }), 'the member\'s name and place among the mark\'s twelve, in its count\'s place');
    await WALK.focusTo('1.0.1:1', null, true);
    RENDER.draw();
    assert.ok(sameRect(RENDER.stats.ring, firstMark().rect) && firstMark().lines.join(' ') === markCount(12, true), 'the mark\'s own stop: the ring on it, its count');
  } finally { REC._reset(); CAM.setViewport(1440, 900); }
});
