// P-RENDER's test, on a recording context: the board's statements beneath
// its label (B1-S3) — the residue statement at the floor, that a document
// the shell's index could not place is not shown while its arm stands, every
// count a lower bound meanwhile, nothing when complete, and the board's kept
// clause first while it lags past a second (FP-23); where
// no board is held a whole frame names none — no board's label, origin
// or count, no frame of the account under the view, no ring at the walk's
// root — where the same frames with the board held do (FP-35); a
// document's label at mid scale its contents line — its first line where
// those words stand, its address at the row's end, past its region's prefix
// only where the region is named — each line on its own plate, its address
// in the title's ink (FP-26); a kept document's clause after its address on
// its label below its reading scale, and its account's label counting it at
// far scale, while it stands kept alone (FP-23); an account's counts
// numerals, their thousands parted by commas and their nouns agreeing, at far
// scale and at mid (style S17, S18); a continuation's mark two targets where it
// holds two — its newest member's label, as the version its box shows, in a
// band at its foot, and the rest of the mark, its count in what it counts —
// one where it is too small, and a member the walk's ring stands on ringed
// on the mark with its name and place (issue #42); and a box's history strip
// holding the version its box shows in the window mark, the head in its own
// triangle only where the board ended the chain there (FP-22, FP-26); and in
// a draft holding typed words the arrival outlined and the walk's span ringed
// on the lines the text shown holds them on (FP-21; issue #515).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as PUMP from '../model/pump.js';
import * as PORT from '../bridge/port.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from './camera.js';
import * as WALK from '../nav/walk.js';
import * as GO from '../nav/go.js';
import * as RENDER from './render.js';
import { boardStatements } from './render.js';
import * as LAYER from '../text/layer.js';
import * as F from '../model/frames.js';
import { boardCell, accountCell, docBox, accountAt, continuationCell, DOC_W } from './projection.js';
import { markScale, lodOf } from './lod.js';
import { leadOf, firstRow, GUTTER } from './layout.js';
import { COL, TARGET, ADDRESS, WINDOW, STRIP } from './register.js';
import { recorder } from '../test/canvas.js';
import { visibleView } from './camera.js';
import { t, markCount, lastRead } from '../strings.js';
import { byteLength } from '../util.js';

/** the address a set label carries: the text of its line whose runs are all in the identifier's face */
const addressOf = (/** @type {import('./labels.js').SetLabel} */ l) => (l.lines.find((x) => x.runs.every((r) => r.face === 'ident')) || { text: null }).text;

test('while the shell\'s index reports changes it could not place, the board\'s label says so and no count is exact; at the floor it states the residue; complete, nothing (issue #212)', () => {
  REC._reset(); WRITE._reset();
  REC.takeIndex(/** @type {any} */ ({ docs: [], counts: [{ account: '1.0.1', documents: 3 }], state: { arm: 'complete' } }));
  assert.deepEqual([boardStatements(), REC.countOf('1.0.1').exact], [[], true], 'complete: nothing said, the counts exact');
  REC.setIndexState({ arm: 'at_the_floor', floor: 8265 });
  assert.deepEqual(boardStatements(), [t('F.board-residue', { floor: 8265 })], 'at the floor: the residue');
  // the shell's own spelling of the arm (skep-shell's `state_json`): the range the bare rows stand in, and how many
  REC.setIndexState({ arm: 'unplaced', range: 'board', count: 2 });
  assert.deepEqual([boardStatements(), REC.countOf('1.0.1').exact], [[t('L.board-unplaced')], false], 'changes it could not place: said, and every count a lower bound');
});

test('while the board lags past a second its clause stands first among the board\'s statements — "as last read" at the stream\'s drop — and not within the second, nor once the catch-up\'s rows are taken (issue #367\'s design decision: "Meanwhile the board carries the clause")', async (ctx) => {
  REC._reset(); WRITE._reset();
  const fake = FAKE.create({ [FAKE.keyOf('changes', { session: 's-1', since: 10 })]: { result: { entries: [], next: 10, head: 10 } } });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.setHealth({ log_position: 10 }, null);
  REC.takeIndex(/** @type {any} */ ({ docs: [], counts: [], state: { arm: 'at_the_floor', floor: 8265 } }));
  const residue = t('F.board-residue', { floor: 8265 });
  ctx.mock.timers.enable({ apis: ['setTimeout'] });
  fake.drop();
  assert.deepEqual(boardStatements(), [residue], 'within the second: the residue alone');
  ctx.mock.timers.tick(PUMP.KEPT_MS);
  const lag = /** @type {{since: number}} */ (PUMP.boardKept());
  assert.deepEqual(boardStatements(), [t('L.kept.text', { when: lastRead(lag.since) }), residue], 'past the second: its clause first');
  fake.reopen();
  for (let i = 0; i < 20 && PUMP.boardKept(); i++) await new Promise((r) => setImmediate(r));
  assert.deepEqual(boardStatements(), [residue], 'the catch-up\'s rows taken: the clause lifted');
  assert.deepEqual(fake.unanswered, []);
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
  REC._reset(); WRITE._reset();
  try {
    // the walk on its root, a key having moved it there: the ring drawn where a place is named
    await WALK.focusTo('1', null);
    REC.takeBoards({ result: [] });
    for (const [where, v] of /** @type {Array<[string, typeof whole]>} */ ([['the board\'s extent', whole], ['an account\'s cell at mid scale', mid]])) {
      const f = frame(v);
      assert.deepEqual([f.labels, f.texts, f.ring], [[], [], null], `${where}: nothing named — no board, no account, no ring`);
    }
    REC.setBoard({ board: 'b-1', name: '', origin: 'http://127.0.0.1:8642' });
    const atWhole = frame(whole), atMid = frame(mid);
    assert.ok(atWhole.labels.includes('board 1') && atWhole.lines.some((s) => s.includes('http://127.0.0.1:8642')) && atWhole.texts.length > 0 && atWhole.ring != null, `the board held: its label, its origin set, the ring at the root: ${JSON.stringify(atWhole)}`);
    assert.ok(atMid.labels.includes('frame 1.0.1'), `and the frame of the account under the view: ${JSON.stringify(atMid.labels)}`);
  } finally { REC._reset(); WRITE._reset(); }
});

test('at mid scale a document\'s label is its contents line: its first line from where those words stand in its first column, cut on a word, its address at the end of that row — past its region\'s prefix where the one line names the region, whole where nothing in view names it — each line on a plate of its own and its address in the title\'s ink (issue #23)', () => {
  const D = '1.0.1.0.3';
  const { ctx, inked, rects } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  CAM.setViewport(4000, 900);
  REC._reset(); WRITE._reset();
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
  } finally { REC._reset(); WRITE._reset(); CAM.setViewport(1440, 900); }
});

test('below its reading scale a kept document\'s label carries its clause after its address — on its row, ending at the row\'s end, the address a space before it, at the address\'s size and in the title\'s ink — and at far scale its account\'s label counts it after its documents; neither within the second, nor once its read again sets it (issue #368\'s design decision: "On the canvas label, the clause follows the address, at the address\'s small size"; "At far scale, the account\'s label carries \'⟨n⟩ as last read\'")', async (ctx) => {
  const D = '1.0.1.0.3';
  const { ctx: canvas } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => canvas }));
  CAM.setViewport(4000, 900);
  REC._reset(); WRITE._reset();
  const fake = FAKE.create({});
  try {
    PORT.boot(fake);
    PUMP.start({ onDirty: () => {} });
    REC.setBoard({ board: 'b-1', name: '', origin: 'http://127.0.0.1:8642' });
    REC.setSession({ session: 's-1', principal: 1, account: '1.0.1', writes: true });
    REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'Notes on the artifact chain of custody', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 600 }]);
    REC.takeLinks(D, []);
    const box = docBox(D), f = LAYER.foldOf(REC.doc(D)), row = firstRow(f), g = (GUTTER / 2) * f.fs, cell = accountCell('1.0.1');
    // over its first column at em 6, below its reading scale, its row wide enough for its address and its clause; its account at far scale
    const mid = { ...LAYER.centreOf(D, null), scale: 6 / f.fs }, far = { x: cell.x + cell.w / 2, y: cell.y + cell.h / 2, scale: 9.9 / DOC_W };
    /** the frame drawn at a view: its document's label's lines, and its account's counts' — as the label pass set them */
    const frame = (/** @type {typeof mid} */ v) => {
      CAM.set(v);
      RENDER.draw();
      const doc = RENDER.stats.labels.find((l) => l.kind === 'doc' && l.place === D);
      const counts = RENDER.stats.labels.find((l) => l.kind === 'cluster' && l.place === '1.0.1' && l.lines.some((x) => x.text === t('F.label.documents.1')));
      return { doc: doc ? doc.lines : [], counts: counts ? counts.lines : [] };
    };
    const told = (/** @type {ReturnType<typeof frame>} */ at) => [at.doc.some((x) => x.text.includes('as last read')), at.counts.map((x) => x.text).join(' ').includes(t('L.kept.count', { n: 1 }))];
    CAM.set(mid);
    const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(D) });
    ctx.mock.timers.enable({ apis: ['setTimeout'] });
    fake.fire('feed', { board: 'b-1', update: { position: 9, at: 9, op: 'insert', docs: [D], class: 'published' } });
    assert.deepEqual([...told(frame(mid)), ...told(frame(far))], [false, false, false, false], 'within the second: neither');
    ctx.mock.timers.tick(PUMP.KEPT_MS);
    const words = t('L.kept.links', { when: lastRead(/** @type {{since: number}} */ (PUMP.kept(D)).since) });
    const at = frame(mid), k = at.doc.find((x) => x.text === words), a = at.doc.find((x) => x.runs.every((r) => r.face === 'ident'));
    assert.ok(!LAYER.atReadingScale(D) && k && a, `below its reading scale, its clause set beside its address: ${JSON.stringify(at.doc.map((x) => x.text))}`);
    assert.equal(at.doc.indexOf(k), at.doc.indexOf(a) + 1, 'right after its address');
    assert.ok(Math.abs(k.rect.x + k.rect.w - CAM.sx(box.x + row.x + row.w - g)) < 1e-6, 'its clause ending at its row\'s end, the end of the outline\'s first row inside its half gutter');
    assert.ok(Math.abs(k.rect.y + k.rect.h / 2 - (a.rect.y + a.rect.h / 2)) < 1e-6 && Math.abs(a.rect.x + a.rect.w - (k.rect.x - 0.6 * k.px)) < 1e-6, 'level with its address, a space after it');
    assert.deepEqual([k.px, a.px, k.ink, k.runs.map((r) => r.face)], [ADDRESS.px, ADDRESS.px, COL.title, ['client']], 'at the address\'s size, in the title\'s ink, the client\'s words');
    const counted = frame(far);
    assert.equal(lodOf(CAM.cam.scale).name, 'far', 'at far scale');
    assert.ok(counted.counts.map((x) => x.text).join(' ').startsWith(`${t('F.label.documents.1')} ${t('L.kept.count', { n: 1 })}`), `its account's label counts it after its document, "1 document" its singular: ${JSON.stringify(counted.counts.map((x) => x.text))}`);
    assert.equal(counted.counts.filter((x) => x.ink === COL.title).map((x) => x.text).join(' '), t('L.kept.count', { n: 1 }), 'in the title\'s ink, the counts beside it in the text\'s');
    release();
    for (let i = 0; i < 50 && PUMP.kept(D); i++) await new Promise((r) => setImmediate(r));
    assert.deepEqual([PUMP.kept(D), ...told(frame(far)), ...told(frame(mid))], [null, false, false, false, false], 'its read again set it: neither');
  } finally { REC._reset(); WRITE._reset(); CAM.setViewport(1440, 900); PORT.boot(null); }
});

test('an account\'s counts on the plane are numerals, their thousands parted by commas and their nouns agreeing — its cluster\'s at far scale, its frame\'s label at mid (style S17, S18)', () => {
  const { ctx: canvas } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => canvas }));
  CAM.setViewport(1440, 900);
  REC._reset(); WRITE._reset();
  /** the lines the label pass set for the account at a view, of the kind given */
  const lines = (/** @type {{x: number, y: number, scale: number}} */ v, /** @type {string} */ kind) => { CAM.set(v); RENDER.draw(); return RENDER.stats.labels.filter((l) => l.kind === kind && l.place === '1.0.1').flatMap((l) => l.lines.map((x) => x.text)); };
  try {
    REC.setBoard({ board: 'b-1', name: '', origin: 'http://127.0.0.1:8642' });
    REC.setSession({ session: 's-1', principal: 1, account: '1.0.1', writes: true });
    REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: '1.0.1.0.1', kind: 'edition', label: 'Tumbler.', standing: 'public' }], counts: [{ account: '1.0.1', documents: 12345 }], state: { arm: 'complete' } }));
    const cell = accountCell('1.0.1'), far = lines({ x: cell.x + cell.w / 2, y: cell.y + cell.h / 2, scale: 9.9 / DOC_W }, 'cluster');
    assert.equal(lodOf(CAM.cam.scale).name, 'far');
    assert.ok(far.join(' ').includes('12,345 documents'), `far: its documents counted with a comma, the words wrapping in its room: ${JSON.stringify(far)}`);
    const mid = lines(CAM.viewForCell(cell, 0.85), 'frame');
    assert.ok(mid.some((x) => x.includes(' · 12,345 documents · ')), `mid: its frame's label the same: ${JSON.stringify(mid)}`);
  } finally { REC._reset(); WRITE._reset(); }
});

/** an account of sixty documents the index lists, each its first line "Notes on ⟨n⟩": at HOME the first 48 stand whole and the other twelve are its first continuation's one mark */
function sixty() {
  REC._reset(); WRITE._reset();
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
    // the walk resting on the account, as the launch leaves it: no ring on a member, which would name it in the count's place
    await WALK.restAt('1.0.1');
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
    REC._reset(); WRITE._reset(); CAM.setViewport(1440, 900);
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
  } finally { REC._reset(); WRITE._reset(); CAM.setViewport(1440, 900); }
});

test('the walk\'s ring on a member the mark holds stands on the mark, and the mark names the member and its place among its members in its count\'s place, its first stop the mark\'s own (issue #42\'s design decision: "A member\'s ring is drawn on the mark with its name and place")', async () => {
  try {
    const home = sixty();
    CAM.set(home);
    await WALK.focusTo('1.0.1.0.55', null);
    assert.ok(WALK.ringShown(), 'a landing put the walk there: the ring drawn');
    RENDER.draw();
    const m = firstMark();
    assert.ok(sameRect(RENDER.stats.ring, m.rect), `the ring on the mark, never on the member's own outline inside it: ${JSON.stringify([RENDER.stats.ring, m.rect])}`);
    assert.equal(m.lines.join(' '), t('L.mark.member', { name: '.0.55', i: 7, n: 12 }), 'the member\'s name and place among the mark\'s twelve, in its count\'s place');
    await WALK.focusTo('1.0.1:1', null);
    RENDER.draw();
    assert.ok(sameRect(RENDER.stats.ring, firstMark().rect) && firstMark().lines.join(' ') === markCount(12, true), 'the mark\'s own stop: the ring on it, its count');
  } finally { REC._reset(); WRITE._reset(); CAM.setViewport(1440, 900); }
});

test('a box\'s history strip marks its document\'s members in chain order, the head in a triangle of its own where the board ended the chain there, and the version the box shows in the one line\'s window mark — a pinned member its own, the plain address the head, else its last member counted with the window open past it — a pinned member past the count standing with every member before it, and a daughter in no member\'s window (issue #241\'s design decision: "History strips mark `go.shownIn`\'s version with the line\'s window mark, and the head keeps its shape")', async () => {
  const D = '1.0.1.0.3', text = 'Notes on the artifact chain of custody.';
  const platform = { document: globalThis.document, window: globalThis.window };
  const listens = { addEventListener() {} };
  globalThis.document = /** @type {any} */ ({ ...listens, activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens, getSelection: () => null });
  const { ctx: canvas, rects, filled } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => canvas }));
  CAM.setViewport(4000, 900);
  REC._reset(); WRITE._reset();
  const box = docBox(D);
  /** em 3 over the box, below its reading scale */
  let view = { x: box.x + box.w / 2, y: box.y + box.h / 2, scale: 1 };
  /** the box left on a version — its plain address unpinning it — as a LEAP to that version leaves it */
  const leave = async (/** @type {string} */ addr) => { const leap = GO.leapTo(addr); CAM.set(view); await leap; };
  try {
    REC.setBoard({ board: 'b-1', name: '', origin: 'http://127.0.0.1:8642' });
    REC.setSession({ session: 's-1', principal: 1, account: '1.0.1', writes: true });
    REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: text, standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
    // the document and each version its box is left on, its text held, so a LEAP to it pins the box as the act is made
    for (const a of [D, D + '.2', D + '.10', D + '.2.1']) {
      REC.takeSpanSet(a, [{ subspace: 1, ordinal: 1, positions: byteLength(text) }]);
      REC.takeDelivery(a, [{ pos: 1, width: byteLength(text), kind: 'content', text, ref: null, origin: null }]);
    }
    view = { ...view, scale: 3 / LAYER.foldOf(REC.doc(D)).fs };
    /** the box left on a version, the frame then drawn over it: its strip, its members' ticks' lefts, and the ticks, the window's fill, its edges and the head's triangle the recorder kept along it, each rect with its place in the drawing order */
    const strip = async (/** @type {string} */ addr) => {
      await leave(addr);
      assert.equal(GO.shownIn(D), addr, `the box shows ${addr}`);
      rects.length = 0; filled.length = 0;
      RENDER.draw();
      const s = /** @type {import('./render.js').DrawnStrip} */ (RENDER.stats.strips.find((x) => x.doc === D));
      assert.ok(s, `${addr}: its strip drawn`);
      const at = (/** @type {number} */ i) => s.rect.x + (i - 1) * STRIP.pitch;
      const along = (/** @type {{y: number, h: number}} */ r) => r.y >= s.rect.y - STRIP.pad - 1e-6 && r.y + r.h <= s.rect.y + s.rect.h + STRIP.pad + 1e-6;
      const kept = (/** @type {string} */ fill) => rects.flatMap((r, i) => (r.fill === fill && along(r) ? [{ ...r, i }] : []));
      return {
        s, at, ticks: kept(COL.land), fills: kept(WINDOW.fill), edges: kept(WINDOW.ink),
        heads: filled.filter((f) => f.fill === COL.land).map((f) => f.path.flatMap((g) => g.at)),
      };
    };
    /** the strip as the gate reads it */
    const facts = (/** @type {import('./render.js').DrawnStrip} */ s) => ({ place: s.place, doc: s.doc, n: s.n, held: s.held, head: s.head, open: s.open });
    /** the window over member k: one fill over its tick and the gaps beside it — a member's pitch past them where it runs open — above and below the ticks and on no neighbour's tick; an edge at each end it closes, in those gaps; its fill drawn first, then the ticks, then its edges */
    const holds = (/** @type {Awaited<ReturnType<typeof strip>>} */ f, /** @type {number} */ k) => {
      const { s, at, ticks, fills, edges } = f, gap = STRIP.pitch - STRIP.tick, w = fills[0];
      assert.equal(fills.length, 1, `member ${k}: one window`);
      assert.ok(sameRect(w, /** @type {{x: number, y: number, w: number, h: number}} */ (s.window)), 'drawn where the strip records it');
      assert.ok(Math.abs(w.x - (at(k) - gap)) < 1e-6 && Math.abs(w.w - (STRIP.tick + 2 * gap + (s.open ? STRIP.pitch : 0))) < 1e-6, `over member ${k}'s tick and the gaps beside it${s.open ? ', open a member past it' : ''}: ${JSON.stringify(w)}`);
      assert.ok(w.y < s.rect.y && w.y + w.h > s.rect.y + s.rect.h, 'above and below the ticks');
      assert.ok((k === 1 || w.x >= at(k - 1) + STRIP.tick - 1e-6) && (k === s.n || w.x + w.w <= at(k + 1) + 1e-6), 'on no neighbour\'s tick');
      assert.deepEqual(edges.map((e) => [e.x - w.x, e.w, e.h]), [[0, WINDOW.edge, w.h], ...(s.open ? [] : [[w.w - WINDOW.edge, WINDOW.edge, w.h]])], s.open ? 'an edge at its start alone' : 'an edge at each end, in the gaps');
      assert.ok(ticks.every((t) => t.i > w.i) && edges.every((e) => ticks.every((t) => e.i > t.i)), 'its fill drawn first, then the ticks, then its edges');
    };
    /** the members drawn as ticks, by their place along the strip */
    const ticked = (/** @type {Awaited<ReturnType<typeof strip>>} */ f) => f.ticks.map((t) => Math.round((t.x - f.at(1)) / STRIP.pitch) + 1);
    /** the head's triangle at member k: one tick wide, its base on the ticks' foot, its apex at the window's top */
    const headAt = (/** @type {Awaited<ReturnType<typeof strip>>} */ f, /** @type {number} */ k) => {
      const [p] = f.heads, xs = p.map((q) => q.x), ys = p.map((q) => q.y);
      assert.equal(f.heads.length, 1, 'one head');
      assert.deepEqual([Math.min(...xs) - f.at(k), Math.max(...xs) - f.at(k), Math.min(...ys) - f.s.rect.y, Math.max(...ys) - f.s.rect.y], [0, STRIP.tick, -STRIP.pad, STRIP.h], `member ${k} in the head's triangle`);
      return p;
    };
    REC.takeMembers(D, 3);
    const pinned = await strip(D + '.2');
    assert.deepEqual(facts(pinned.s), { place: D + '.2', doc: D, n: 3, held: 2, head: 3, open: false }, 'pinned on version 2 of 3: the window on member 2, the head on 3');
    assert.deepEqual(ticked(pinned), [1, 2], 'members 1 and 2 as ticks');
    holds(pinned, 2);
    headAt(pinned, 3);
    const plain = await strip(D);
    assert.deepEqual(facts(plain.s), { place: D, doc: D, n: 3, held: 3, head: 3, open: false }, 'the plain address, the chain ended at 3: the window on the head');
    holds(plain, 3);
    const w = /** @type {{x: number, y: number, w: number, h: number}} */ (plain.s.window);
    assert.ok(headAt(plain, 3).every((q) => q.x >= w.x && q.x <= w.x + w.w && q.y >= w.y && q.y <= w.y + w.h), 'the head\'s triangle inside the window, its shape kept');
    REC.takeMembers(D, 8, false);
    const open = await strip(D);
    assert.deepEqual(facts(open.s), { place: D, doc: D, n: 8, held: 8, head: null, open: true }, 'the chain read to 8, not known to end there: the window on member 8, open past it, no head');
    assert.deepEqual([ticked(open), open.heads], [[1, 2, 3, 4, 5, 6, 7, 8], []], 'every member a tick, none the head\'s');
    holds(open, 8);
    const past = await strip(D + '.10');
    assert.deepEqual(facts(past.s), { place: D + '.10', doc: D, n: 10, held: 10, head: null, open: false }, 'pinned on version 10, past the 8 counted: ten members, the window closed on member 10');
    assert.deepEqual([ticked(past), past.heads], [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []], 'every member to it a tick');
    holds(past, 10);
    REC.takeMembers(D, 3);
    const daughter = await strip(D + '.2.1');
    assert.deepEqual(facts(daughter.s), { place: D + '.2.1', doc: D, n: 3, held: null, head: 3, open: false }, 'a daughter beside version 2: no member is the version the box shows');
    assert.deepEqual([daughter.s.window, daughter.fills, daughter.edges, ticked(daughter)], [null, [], [], [1, 2]], 'no window, the members still marked');
    headAt(daughter, 3);
  } finally {
    await leave(D);
    REC._reset(); WRITE._reset(); CAM.setViewport(1440, 900);
    globalThis.document = platform.document; globalThis.window = platform.window;
  }
});

// ---- A DRAFT HOLDING TYPED WORDS (issue #515) ------------------------------------------------------------------

/** a draft of three paragraphs held whole, its image its own bytes, with a paragraph typed above them: the document, a word of its second paragraph's first line by its position in the model's text and its width, and the bytes typed */
function typedDraft() {
  const doc = '1.0.1.0.3', text = 'A first paragraph of the text.\n\nA second paragraph of the text.\n\nA third paragraph of the text.\n', typed = 'Words typed above the text the board served, enough to set a line of their own.\n\n';
  REC._reset(); WRITE._reset();
  REC.setBoard({ board: 'b-1', name: '', origin: 'http://127.0.0.1:8642' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1', writes: true });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc, kind: 'draft', label: 'draft', standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  REC.takeSpanSet(doc, [{ subspace: 1, ordinal: 1, positions: byteLength(text) }]);
  REC.takeDelivery(doc, [{ pos: 1, width: byteLength(text), kind: 'content', text, ref: null, origin: null }]);
  REC.takeImage(doc, 1, [{ iStart: doc + '.0.1.1', width: byteLength(text) }]);
  WRITE.addEdit(doc, { pos: 1, width: 0, text: typed });
  return { doc, board: text.indexOf('second') + 1, width: 'second'.length, k: byteLength(typed) };
}

test('an arrival in a text holding typed words is outlined on the lines the text shown holds its runs on, where no part of them stands (FP-21; issue #515)', async () => {
  const platform = { document: globalThis.document, window: globalThis.window }, listens = { addEventListener() {} };
  globalThis.document = /** @type {any} */ ({ ...listens, activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens, getSelection: () => null });
  const { ctx } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  CAM.setViewport(4000, 900);
  const { doc, board, width, k } = typedDraft();
  try {
    const b = docBox(doc), view = { x: b.x + b.w / 2, y: b.y + b.h / 2, scale: 3 / LAYER.foldOf(REC.doc(doc)).fs };
    const leap = GO.leapTo(doc, { pos: board + k, runs: [{ pos: board + k, width }], link: doc + '.0.2.1', how: 'leap' });
    CAM.set(view);
    await leap;
    RENDER.draw();
    const rects = (/** @type {number} */ at) => LAYER.foldBoxes(doc, at, width).map(({ rect: r }) => [r.x, r.y, r.w, r.h]);
    assert.deepEqual(GO.arrivalMark()?.runs, [{ pos: board + k, width }], 'the run where the text shown holds it');
    assert.ok(rects(board + k).length === 1 && JSON.stringify(rects(board)) !== JSON.stringify(rects(board + k)), 'the two positions stand on different lines');
    assert.deepEqual(RENDER.stats.arrival.map((r) => [r.x, r.y, r.w, r.h, r.run]), rects(board + k).map((r) => [...r, 0]), 'outlined on the line the text shown holds it on');
    // a landing naming the document whole: the block at the head of the text shown, the line typed there
    const leapAgain = GO.leapTo(doc, { pos: null, link: doc + '.0.2.1', how: 'leap' });
    CAM.set(view);
    await leapAgain;
    RENDER.draw();
    const head = /** @type {import('../model/records.js').Block} */ (REC.blockIn(LAYER.shownOf(doc).blocks, 1));
    assert.deepEqual([GO.arrivalMark()?.pos, head.width], [1, k], 'its position the head of the text shown, the typed line');
    assert.ok(RENDER.stats.arrival.length === 1 && RENDER.stats.arrival[0].run === -1, 'one rect, the block\'s');
    assert.deepEqual([RENDER.stats.arrival[0].x, RENDER.stats.arrival[0].y], [LAYER.foldBoxes(doc, head.pos, head.width)[0].rect.x, LAYER.foldBoxes(doc, head.pos, head.width)[0].rect.y], 'on the block at that head');
  } finally { GO.endArrival(); REC._reset(); WRITE._reset(); CAM.setViewport(1440, 900); globalThis.document = platform.document; globalThis.window = platform.window; }
});

test('the walk\'s span in a text holding typed words is ringed on the lines the text shown holds it on (the focus record\'s D3; issue #515)', async () => {
  const platform = { document: globalThis.document, window: globalThis.window }, listens = { addEventListener() {} };
  /** an element the text layer mounts into, a stand-in */
  const element = () => { const e = { className: '', innerHTML: '', dataset: {}, style: {}, children: /** @type {unknown[]} */ ([]), classList: { toggle() {} }, setAttribute() {}, appendChild(/** @type {unknown} */ c) { e.children.push(c); }, querySelectorAll: () => [], getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0 }), remove() {} }; return e; };
  globalThis.document = /** @type {any} */ ({ ...listens, activeElement: null, body: null, createElement: element });
  globalThis.window = /** @type {any} */ ({ ...listens, getSelection: () => null });
  CAM.setViewport(1440, 900);
  LAYER.attach(/** @type {any} */ ({ clientWidth: 1440, clientHeight: 900, appendChild() {} }), /** @type {any} */ (null));
  const { doc, board, k } = typedDraft();
  try {
    const f = LAYER.foldOf(REC.doc(doc)), b = docBox(doc), c = f.columns[0];
    CAM.set({ x: b.x + c.x + c.w / 2, y: b.y + c.y + c.h / 3, scale: 12 / f.fs });
    await WALK.focusTo(doc, board + k, true, null, true);
    LAYER.frame();
    const start = /** @type {import('../model/records.js').Block} */ (REC.blockAt(doc, board)).pos;
    const shown = /** @type {import('../model/records.js').Block} */ (LAYER.blockAt(doc, board + k));
    assert.ok(LAYER.isMounted(doc) && WALK.current()?.pos === shown.pos, 'its article stands, the walk on the second paragraph\'s span');
    assert.equal(shown.pos, start + k, 'the span where the text shown holds it');
    const lines = /** @type {Array<{x: number, y: number, w: number, h: number}>} */ (LAYER.lineBoxes(doc, shown.pos, shown.width));
    const x = Math.min(...lines.map((r) => r.x)), y = Math.min(...lines.map((r) => r.y));
    assert.deepEqual(RENDER.focusBox(visibleView(0)), { x, y, w: Math.max(...lines.map((r) => r.x + r.w)) - x, h: Math.max(...lines.map((r) => r.y + r.h)) - y }, 'the ring\'s box the bounds of the lines the text shown holds the span on');
  } finally { LAYER.clear(); LAYER.attach(/** @type {any} */ (null), null); REC._reset(); WRITE._reset(); globalThis.document = platform.document; globalThis.window = platform.window; }
});
