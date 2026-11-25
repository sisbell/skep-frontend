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
// triangle only where the board ended the chain there (FP-22, FP-26); in
// a draft holding typed words the arrival outlined and the walk's span ringed
// on the lines the text shown holds them on (FP-21; issue #515), and one whose
// edits took out every byte drawing no bar for its empty line; and the one
// form at an assigned slot no document stands at (B11-S5): four open corner
// marks at its cell's first column slot, drawn with its region's boxes at
// their alpha in its ink as the person's settings ask it, labelled by its
// slot's name and address, pressed anywhere in its rectangle or, small, in
// the least target's area about it — the nearest drawn shape winning, a drawn
// shape its own place's, small boxes alike — and a link's stroke ending on
// its rectangle where no tail is drawn; and the one press test over every
// target (#780; FP-44): a drawn shape its own target's, the topmost where
// shapes meet, a tail's area grown from where it leaves and evenly about its
// stroke, a mark standing as one target pressed in its area, the nearest
// drawn shape winning where areas meet, the ground one pixel past them.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as PUMP from '../model/pump.js';
import * as PORT from '../bridge/port.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from './camera.js';
import * as WALK from '../nav/walk.js';
import * as LK from '../links/links.js';
import * as GO from '../nav/go.js';
import * as RENDER from './render.js';
import { boardStatements } from './render.js';
import * as LAYER from '../text/layer.js';
import * as F from '../model/frames.js';
import { boardCell, accountCell, docBox, accountAt, continuationCell, numberAtCell, cellOfKey, DOC_W } from './projection.js';
import { markScale, lodOf, LOD_FAR_LO, LOD_FAR_HI } from './lod.js';
import { leadOf, firstRow, slot, boundsOf, GUTTER } from './layout.js';
import { COL, TARGET, ADDRESS, WINDOW, STRIP, FORM } from './register.js';
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
  const D = '1.0.1.0.66';
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
    assert.deepEqual(l.lines.map((x) => x.text), ['Notes on…', '.0.66', t('L.arriving')], 'its first line leading, cut on a word, then its address past its region\'s prefix; its badge — its links arriving — beneath');
    assert.ok(badge.rect.y >= Math.max(first.rect.y + first.rect.h, address.rect.y + address.rect.h) - 1e-6, 'the badge beneath the row');
    assert.ok(Math.abs(first.rect.x - CAM.sx(box.x + lead.x)) < 1e-6, `its first line from where those words stand: ${first.rect.x} against ${CAM.sx(box.x + lead.x)}`);
    assert.ok(Math.abs(first.rect.y + first.rect.h / 2 - CAM.sy(box.y + lead.y + lead.h / 2)) < 1e-6, 'level with the line those words stand on');
    assert.ok(first.rect.x + first.rect.w <= CAM.sx(box.x + col.x + col.w) + 1e-6, 'inside its column');
    const row = firstRow(f), g = (GUTTER / 2) * f.fs;
    assert.ok(Math.abs(address.rect.x + address.rect.w - CAM.sx(box.x + row.x + row.w - g)) < 1e-6, 'its address ending at its row\'s end, the end of the outline\'s first row inside its half gutter');
    assert.ok(inked.some((x) => x.text === '.0.66' && x.ink === COL.title), 'its address in the title\'s ink');
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
  const D = '1.0.1.0.67';
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

/** an account of sixty documents the index lists, at its first sixty cells (P-PROJ's `numberAtCell`), each its first line "Notes on ⟨cell⟩": at HOME the first 48 stand whole and the other twelve are its first continuation's one mark */
function sixty() {
  REC._reset(); WRITE._reset();
  REC.setBoard({ board: 'b-1', name: '', origin: 'http://127.0.0.1:8642' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1', writes: true });
  REC.takeIndex(/** @type {any} */ ({ docs: Array.from({ length: 60 }, (_, i) => ({ doc: `1.0.1.0.${numberAtCell(i + 1)}`, kind: 'edition', label: `Notes on ${i + 1}`, standing: 'public' })), counts: [{ account: '1.0.1', documents: 60 }], state: { arm: 'complete' } }));
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
    const V = '1.0.1.0.118.2', text = 'Take two.';
    REC.takeSpanSet(V, [{ subspace: 1, ordinal: 1, positions: byteLength(text) }]);
    REC.takeDelivery(V, [{ pos: 1, width: byteLength(text), kind: 'content', text, ref: null, origin: null }]);
    const leap = GO.leapTo(V);
    assert.equal(GO.shownIn('1.0.1.0.118'), V, 'the box shows its second version');
    CAM.set(home);
    await leap;
    // the walk resting on the account, as the launch leaves it: no ring on a member, which would name it in the count's place
    await WALK.restAt('1.0.1');
    RENDER.draw();
    const m = firstMark();
    assert.deepEqual([m.k, m.n, m.newest, m.members.length], [1, 12, '1.0.1.0.118', 12], 'the first continuation, its twelve members, its newest the highest-numbered');
    assert.equal(m.lines.join(' '), markCount(12, true), 'its count says what it counts');
    assert.deepEqual(m.newestLines, ['.0.118.2', 'Take two.'], 'its newest member\'s label as a box\'s label sets it, of the version its box shows: its address past the region\'s prefix, then its first line');
    const band = /** @type {{x: number, y: number, w: number, h: number}} */ (m.newestTarget);
    assert.ok(band && band.h >= TARGET.min && Math.abs(band.y + band.h - (m.rect.y + m.rect.h)) < 1e-6 && Math.abs(band.w - m.rect.w) < 1e-6, `the band across the mark's foot, a target tall: ${JSON.stringify({ band, rect: m.rect })}`);
    assert.ok(band.y - m.rect.y >= TARGET.min, 'the rest of the mark a target tall above it');
    const label = RENDER.stats.labels.find((l) => l.kind === 'newest' && l.place === m.key);
    assert.ok(label && label.lines.every((x) => x.rect.y >= band.y - 1e-6 && x.rect.y + x.rect.h <= band.y + band.h + 1e-6), 'the label inside its band');
    const atLabel = middleOf(band), atRest = { x: m.rect.x + m.rect.w / 2, y: m.rect.y + (band.y - m.rect.y) / 2 };
    assert.deepEqual(RENDER.residueAtScreen(atLabel.x, atLabel.y), { account: '1.0.1', k: 1, key: '1.0.1:1', newest: '1.0.1.0.118', target: 'newest' }, 'a press on the band: the newest member');
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
    await WALK.focusTo('1.0.1.0.113', null);
    assert.ok(WALK.ringShown(), 'a landing put the walk there: the ring drawn');
    RENDER.draw();
    const m = firstMark();
    assert.ok(sameRect(RENDER.stats.ring, m.rect), `the ring on the mark, never on the member's own outline inside it: ${JSON.stringify([RENDER.stats.ring, m.rect])}`);
    assert.equal(m.lines.join(' '), t('L.mark.member', { name: '.0.113', i: 7, n: 12 }), 'the member\'s name and place among the mark\'s twelve, in its count\'s place');
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

test('a draft whose page-local edits took out every byte draws no bar below its mount: the bars stand for the text shown\'s lines, and its empty line is a sign of the page\'s (issue #782; FP-12)', () => {
  const D = '1.0.1.0.68', text = 'Words the person takes out.', n = byteLength(text);
  const { ctx } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  CAM.setViewport(1440, 900);
  REC._reset(); WRITE._reset();
  try {
    REC.setBoard({ board: 'b-1', name: '', origin: 'http://127.0.0.1:8642' });
    REC.setSession({ session: 's-1', principal: 1, account: '1.0.1', writes: true });
    REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'draft', label: null, standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n }]);
    REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }]);
    REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: n }]);
    /** the frame drawn over its first column at em 5, below its mount: the bars it drew for it */
    const barred = () => { CAM.set({ ...LAYER.centreOf(D, null), scale: 5 / LAYER.foldOf(REC.doc(D)).fs }); RENDER.draw(); return RENDER.stats.bars.filter(([a]) => a === D).length; };
    assert.ok(barred() > 0 && !LAYER.isMounted(D), 'its text\'s line drawn as a bar, below its mount');
    WRITE.addEdit(D, { pos: 1, width: n, text: '' });
    assert.deepEqual([barred(), LAYER.foldOf(REC.doc(D)).lines.filter((l) => l.kind !== 'head').map((l) => [l.kind, l.pos])], [0, [['text', 1]]], 'its every byte taken out: its fold holds its empty line, and no bar stands for it');
  } finally { REC._reset(); WRITE._reset(); }
});

test('the plane draws no box for another person\'s mailbox a read answered `withheld`, nor for a number the map gives no cell however a read answered it — no document\'s label, no press finding a document under its place — where it draws a withheld draft at an ordinary number and the home page; at the mailbox the one form stands instead, labelled by its slot\'s name, a press there going to it and a link ending there ending at a place, while a link ending at the reserved number has none (B11 call 3; the one form\'s part 4; issue #771\'s decision: "No read of one is keyed to the account\'s first cell")', () => {
  const { ctx } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  CAM.setViewport(1440, 900);
  REC._reset(); WRITE._reset();
  const THEIRS = '1.0.6.0.2', DRAFT = '1.0.6.0.64', HOME = '1.0.6.0.1', RESERVED = '1.0.6.0.7';
  try {
    REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
    REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: HOME, kind: 'edition', label: 'home', standing: 'public' }], counts: [{ account: '1.0.6', documents: 1 }], state: { arm: 'complete' } }));
    REC.takeRefused(THEIRS, 'withheld'); REC.takeRefused(DRAFT, 'withheld');
    REC.takeSpanSet(RESERVED, [{ subspace: 1, ordinal: 1, positions: 9 }]);
    REC.takeDelivery(RESERVED, [{ pos: 1, width: 9, kind: 'content', text: 'Reserved.', ref: null, origin: null }]);
    assert.deepEqual([THEIRS, RESERVED, DRAFT, HOME].map(RENDER.drawsDoc), [false, false, true, true], 'drawn nowhere: the mailbox and the reserved number; the withheld draft and the home page drawn');
    /** the documents a frame centred on a document's box, at mid scale, labels */
    const labelled = (/** @type {string} */ addr) => { const box = docBox(addr); CAM.set({ x: box.x + box.w / 2, y: box.y + box.h / 2, scale: 3 / LAYER.foldOf(REC.doc(DRAFT)).fs }); RENDER.draw(); return RENDER.stats.labels.filter((l) => l.kind === 'doc').map((l) => l.place); };
    assert.deepEqual([labelled(DRAFT).includes(DRAFT), labelled(THEIRS).includes(THEIRS), labelled(RESERVED).includes(RESERVED)], [true, false, false], 'a frame at mid scale labels the withheld draft\'s box, and neither the mailbox nor the reserved number where their places would stand');
    /** what a press finds at the middle of a document's outline, as the plane would draw it */
    const pressed = (/** @type {string} */ addr) => { const s = LAYER.shapeOf(addr); return RENDER.docAtScreen(CAM.sx(s.x + s.w / 2), CAM.sy(s.y + s.h / 2)); };
    assert.deepEqual([pressed(THEIRS), pressed(DRAFT)], [null, DRAFT], 'a press at the mailbox\'s place finds nothing; at the withheld draft\'s, its box');
    assert.notEqual(pressed(RESERVED), RESERVED, 'a press at the account\'s first cell never finds the reserved number');
    const s = LAYER.shapeOf(THEIRS), at = RENDER.placeAtScreen(CAM.sx(s.x + s.w / 2), CAM.sy(s.y + s.h / 2));
    assert.deepEqual([REC.isForm(THEIRS), at, RENDER.drawsPlace(THEIRS), RENDER.drawsPlace(RESERVED), labelled(THEIRS).includes(THEIRS)], [true, { addr: THEIRS, form: true, padded: false }, true, false, false],
      'the mailbox the one form\'s place: a press there going to it, a place a link ends at, never a document\'s label; the reserved number no place');
    assert.ok(RENDER.stats.forms.some((f) => f.addr === THEIRS && f.label.includes(t('L.well-known.mailbox'))), `the form there labelled by its slot's name: ${JSON.stringify(RENDER.stats.forms)}`);
  } finally { REC._reset(); WRITE._reset(); }
});

// ---- the one form (B11-S5; the one form's drawing, parts 1–8) ------------------------------------------------------------

/** the acting account of the form tests and another account: both homes listed, the acting account's mailbox a draft of its own and an ordinary edition beside its slots */
const OWN = '1.0.4', OTHER = '1.0.5';
const MAIL = OWN + '.0.2', SLOT3 = OWN + '.0.3', SLOT4 = OWN + '.0.4', SLOT5 = OWN + '.0.5', ORDINARY = OWN + '.0.64';
const CITE = '1.1.0.1.0.1.0.3.13';
/**
 * The form tests' board (M-REC's `forms`): acting as `acting` — none for a guest — the index listing both homes, the acting
 * account's mailbox and the ordinary edition, so the forms stand at its slots 3–5 and at the other account's 2–5; a guest's
 * index listing no draft, the mailbox a form too.
 * @param {string | null} [acting]
 */
function formBoard(acting = OWN) {
  REC._reset(); WRITE._reset(); LK._reset();
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  if (acting) REC.setSession({ session: 's-1', principal: 1, account: acting });
  const row = (/** @type {string} */ doc, kind = 'edition') => ({ doc, kind, label: null, standing: kind === 'draft' ? 'yours_to_read' : 'public' });
  // a guest's index lists no draft
  const docs = [row(OWN + '.0.1'), ...(acting ? [row(MAIL, 'draft')] : []), row(ORDINARY), row(OTHER + '.0.1')];
  REC.takeIndex(/** @type {any} */ ({ docs, counts: [{ account: OWN, documents: docs.length - 1 }, { account: OTHER, documents: 1 }], state: { arm: 'complete' } }));
}
/** a form's rectangle on screen, as the camera stands (T-LAYER's `shapeOf`) */
const onScreen = (/** @type {string} */ addr) => { const w = LAYER.shapeOf(addr); return { x: CAM.sx(w.x), y: CAM.sy(w.y), w: w.w * CAM.cam.scale, h: w.h * CAM.cam.scale }; };
/** the camera centred on the acting account's first row's forms, a depth-0 box `px` px wide */
const atSlots = (/** @type {number} */ px) => { const a = LAYER.shapeOf(SLOT3), b = LAYER.shapeOf(SLOT5); CAM.set({ x: (a.x + b.x + b.w) / 2, y: a.y + a.h / 2, scale: px / DOC_W }); };
/** a stroke's path as its subpaths, each its points in order */
const subpaths = (/** @type {import('../test/canvas.js').Stroke} */ s) => s.path.reduce((/** @type {Array<Array<{x: number, y: number}>>} */ out, seg) => { if (seg.op === 'move') out.push([seg.at[0]]); else if (seg.op === 'line') out[out.length - 1].push(seg.at[0]); return out; }, []);
/** the four L's a form's rectangle takes, arms `aw` along its top and foot and `ah` along its sides: each subpath's three points */
const corners = (/** @type {Rect} */ r, /** @type {number} */ aw, /** @type {number} */ ah) => {
  const x0 = r.x, y0 = r.y, x1 = r.x + r.w, y1 = r.y + r.h;
  return [[{ x: x0 + aw, y: y0 }, { x: x0, y: y0 }, { x: x0, y: y0 + ah }], [{ x: x1 - aw, y: y0 }, { x: x1, y: y0 }, { x: x1, y: y0 + ah }], [{ x: x1, y: y1 - ah }, { x: x1, y: y1 }, { x: x1 - aw, y: y1 }], [{ x: x0 + aw, y: y1 }, { x: x0, y: y1 }, { x: x0, y: y1 - ah }]];
};
/** two point lists equal to a millionth of a px */
const near = (/** @type {Array<{x: number, y: number}>} */ a, /** @type {Array<{x: number, y: number}>} */ b) => a.length === b.length && a.every((p, i) => Math.abs(p.x - b[i].x) < 1e-6 && Math.abs(p.y - b[i].y) < 1e-6);
/** does a rect hold another, half a px either way */
const holds = (/** @type {Rect} */ r, /** @type {Rect} */ q) => q.x >= r.x - 0.5 && q.y >= r.y - 0.5 && q.x + q.w <= r.x + r.w + 0.5 && q.y + q.h <= r.y + r.h + 0.5;
/** @typedef {{x: number, y: number, w: number, h: number}} Rect */

test('the one form at mid (B11-S5; its drawing\'s part 1): at each assigned slot no box stands at, four corner marks on its cell\'s first column slot\'s boundary — an L at each corner, its two arms along the two sides, each a quarter of its side, so half of every side stands open — one px, solid, butt ends and mitred corners, in the form\'s ink at its boxes\' alpha; nothing inside: no fill, no ground, no plate; never the whole cell; each form\'s strokes inside its own cell (part 8); a slot a box stands at draws none', () => {
  const { ctx, strokes, filled, rects } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  CAM.setViewport(4000, 900);
  formBoard();
  try {
    atSlots(600);
    RENDER.draw();
    assert.equal(lodOf(CAM.cam.scale).name, 'mid', 'at mid');
    assert.deepEqual(RENDER.stats.forms.map((f) => f.addr), [SLOT3, SLOT4, SLOT5], 'the acting account\'s slots 3–5 in view, in record order; its mailbox, a box, none');
    assert.deepEqual(REC.forms().filter(REC.has), [], 'drawn with no read: no record made at any form');
    const room = docBox(SLOT3), first = boundsOf(slot(room, CAM.measure(), 0));
    assert.deepEqual(LAYER.shapeOf(SLOT3), { x: room.x + first.x, y: room.y + first.y, w: first.w, h: first.h }, 'its rectangle the cell\'s first column slot, where the unread plain box stands (P-LAY\'s `slot`)');
    for (const f of RENDER.stats.forms) {
      const r = onScreen(f.addr), box = docBox(f.addr), cell = cellOfKey(f.addr);
      assert.ok(near([{ x: f.rect.x, y: f.rect.y }, { x: f.rect.w, y: f.rect.h }], [{ x: r.x, y: r.y }, { x: r.w, y: r.h }]) && r.w < box.w * CAM.cam.scale / 2 && r.h < box.h * CAM.cam.scale / 2, `${f.addr}: drawn at its first column slot, never its whole cell`);
      const mine = strokes.filter((s) => s.hue === FORM.ink && s.path.length && holds(r, { x: s.path[0].at[0].x, y: s.path[0].at[0].y, w: 0, h: 0 }));
      assert.equal(mine.length, 1, `${f.addr}: one stroke`);
      const s = mine[0], aw = r.w * FORM.arm, ah = r.h * FORM.arm;
      assert.deepEqual([f.arms.w, f.arms.h], [aw, ah], `${f.addr}: its arms a quarter of each side`);
      const ls = subpaths(s), want = corners(r, aw, ah);
      assert.ok(ls.length === 4 && ls.every((l, i) => near(l, want[i])), `${f.addr}: four L's on its boundary, half of every side open: ${JSON.stringify(ls)}`);
      assert.ok(!s.path.some((seg) => seg.op === 'close'), `${f.addr}: no closed path`);
      assert.deepEqual([s.width, s.cap, s.join, s.dash, s.alpha, f.alpha, f.ink], [FORM.width, 'butt', 'miter', [], 1, 1, FORM.ink], `${f.addr}: one px, butt ends, mitred, solid, at the boxes' alpha, in the form's ink`);
      const pts = s.path.flatMap((seg) => seg.at), cs = { x: CAM.sx(cell.x), y: CAM.sy(cell.y), w: cell.w * CAM.cam.scale, h: cell.h * CAM.cam.scale };
      assert.ok(pts.every((p) => holds(cs, { ...p, w: 0, h: 0 })), `${f.addr}: its strokes inside its own cell`);
      assert.ok(!filled.some((x) => x.path.length && x.path.flatMap((seg) => seg.at).every((p) => holds(r, { ...p, w: 0, h: 0 }))) && !rects.some((q) => holds(r, q)), `${f.addr}: nothing filled inside it — no ground, no plate`);
    }
    assert.ok(!strokes.some((s) => s.hue === FORM.ink && s.path.some((seg) => seg.at.some((p) => holds(onScreen(MAIL), { ...p, w: 0, h: 0 })))), 'the mailbox, a box: no corner marks');
  } finally { REC._reset(); WRITE._reset(); }
});

test('the one form is drawn wherever its region\'s boxes are and at their alpha (its drawing\'s parts 2, 3): none at far, where the clusters stand alone; through far~mid at the band\'s fade, its arms never under a device pixel — four points at the smallest — and its label, which no frame there sets, gone with every label while its corners stand', () => {
  const { ctx, strokes } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  CAM.setViewport(1440, 900);
  formBoard();
  try {
    atSlots(LOD_FAR_LO * 0.9);
    strokes.length = 0;
    RENDER.draw();
    assert.deepEqual([lodOf(CAM.cam.scale).name, RENDER.stats.forms, strokes.filter((s) => s.hue === FORM.ink).length], ['far', [], 0], 'at far: no form, no corner mark');
    for (const px of [LOD_FAR_LO + 0.5, LOD_FAR_HI - 1]) {
      atSlots(px);
      strokes.length = 0;
      RENDER.draw();
      const lod = lodOf(CAM.cam.scale), drawn = RENDER.stats.forms.filter((f) => f.addr.startsWith(OWN + '.'));
      assert.equal(lod.name, 'far~mid', `${px} px: far~mid`);
      assert.deepEqual(drawn.map((f) => [f.addr, f.alpha]), [SLOT3, SLOT4, SLOT5].map((a) => [a, lod.fade]), `${px} px: each form drawn, at the boxes' alpha`);
      for (const f of drawn) {
        assert.deepEqual([f.arms.w, f.arms.h], [Math.max(f.rect.w * FORM.arm, 1), Math.max(f.rect.h * FORM.arm, 1)], `${f.addr} at ${px} px: its arms a quarter of each side, never under a device pixel`);
        assert.deepEqual(f.label, [], `${f.addr} at ${px} px: no label set`);
      }
      assert.ok(strokes.filter((s) => s.hue === FORM.ink).every((s) => Math.abs(s.alpha - lod.fade) < 1e-9), `${px} px: stroked at the band's fade`);
    }
    atSlots(LOD_FAR_LO + 0.5);
    RENDER.draw();
    const smallest = RENDER.stats.forms.find((f) => f.addr === SLOT3);
    assert.ok(smallest && smallest.rect.w * FORM.arm < 1 && smallest.arms.w === 1, `the smallest form: its arms a device pixel where a quarter of its side is less: ${JSON.stringify(smallest)}`);
  } finally { REC._reset(); WRITE._reset(); }
});

test('the one form\'s ink is read through the platform as the frame is drawn (its drawing\'s part 1): the labels\' ink whole where the person asks more contrast; the canvas\'s own CanvasText as the style resolves it where colours are forced; else the ink at the 3:1 floor', () => {
  const { ctx, strokes } = recorder();
  const canvas = /** @type {any} */ ({ getContext: () => ctx });
  RENDER.attach(canvas);
  CAM.setViewport(4000, 900);
  formBoard();
  const was = { window: globalThis.window, style: globalThis.getComputedStyle };
  /** the forms' strokes' inks, the person's settings standing as `on` says */
  const inks = (/** @type {string | null} */ on) => {
    globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null, matchMedia: (/** @type {string} */ q) => ({ matches: q === on }) });
    globalThis.getComputedStyle = /** @type {any} */ ((/** @type {unknown} */ el) => ({ color: el === canvas ? 'rgb(255, 255, 0)' : '' }));
    strokes.length = 0;
    atSlots(600);
    RENDER.draw();
    return [...new Set(RENDER.stats.forms.map((f) => f.ink))];
  };
  try {
    assert.deepEqual([inks(null), inks('(prefers-contrast: more)'), inks('(forced-colors: active)')], [[FORM.ink], [COL.title], ['rgb(255, 255, 0)']], 'the floor; the labels\' ink; CanvasText');
    assert.ok(strokes.some((s) => s.hue === 'rgb(255, 255, 0)'), 'stroked in it');
  } finally { globalThis.window = was.window; globalThis.getComputedStyle = was.style; REC._reset(); WRITE._reset(); }
});

test('the one form\'s label (its drawing\'s parts 1, 5): the slot\'s name then its address, past the region\'s prefix while the region is named in view — no first line, bracketed words or state words, whatever a read answered — its address alone at slot 5; in the acting account\'s own region "your bio" and "your link page" at the form and at the document created there alike, in every other region and to a guest the bare name', () => {
  const { ctx } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  CAM.setViewport(4000, 900);
  const [bio, link, mailbox, yourBio, yourLink] = ['L.well-known.bio', 'L.well-known.link-page', 'L.well-known.mailbox', 'L.well-known.your-bio', 'L.well-known.your-link-page'].map((id) => t(id));
  /** each form's label in view, as the pass set it, by its slot's address */
  const labelled = () => Object.fromEntries(RENDER.stats.forms.map((f) => [f.addr, f.label]));
  try {
    formBoard();
    REC.takeRefused(SLOT4, 'unregistered');
    atSlots(600);
    RENDER.draw();
    assert.equal(LINE_NAMED(), OWN, 'the one line names the region');
    assert.deepEqual(labelled(), { [SLOT3]: [yourBio, '.0.3'], [SLOT4]: [yourLink, '.0.4'], [SLOT5]: ['.0.5'] }, 'the acting account\'s own: "your …", then the address past the prefix; slot 5 its address alone; nothing a read answered at slot 4');
    REC.takeMetadata(SLOT3, { doc: SLOT3, published: true, owner: OWN, birth: SLOT3 + '.1', birthExtent: 18, placed: null, baseExtent: null, source: null, asOf: 1 });
    REC.takeSpanSet(SLOT3, [{ subspace: 1, ordinal: 1, positions: 18 }]);
    REC.takeDelivery(SLOT3, [{ pos: 1, width: 18, kind: 'content', text: 'We are the people.', ref: null, origin: null }]);
    // its one row framed at a box 1000 px wide, where a one-row outline holds its label
    const created = LAYER.shapeOf(SLOT3);
    CAM.set({ x: created.x + created.w / 2, y: created.y + created.h / 2, scale: 1000 / DOC_W });
    RENDER.draw();
    const doc = RENDER.stats.labels.find((l) => l.kind === 'doc' && l.place === SLOT3);
    assert.ok(!RENDER.stats.forms.some((f) => f.addr === SLOT3) && doc && doc.lines.some((x) => x.text === yourBio), `the bio created and read: its box, its label naming it "${yourBio}" as its form did: ${JSON.stringify(doc && doc.lines.map((x) => x.text))}`);
    const other = LAYER.shapeOf(OTHER + '.0.3');
    CAM.set({ x: other.x + other.w / 2, y: other.y + other.h / 2, scale: 600 / DOC_W });
    RENDER.draw();
    assert.deepEqual(labelled(), { [OTHER + '.0.2']: [mailbox, '.0.2'], [OTHER + '.0.3']: [bio, '.0.3'], [OTHER + '.0.4']: [link, '.0.4'], [OTHER + '.0.5']: ['.0.5'] }, 'another account\'s: the bare names');
    formBoard(null);
    atSlots(600);
    RENDER.draw();
    assert.deepEqual(labelled(), { [MAIL]: [mailbox, '.0.2'], [SLOT3]: [bio, '.0.3'], [SLOT4]: [link, '.0.4'], [SLOT5]: ['.0.5'] }, 'to a guest: the bare names, its mailbox a form');
  } finally { REC._reset(); WRITE._reset(); }
});

/** the account the one line names as it stands — the region named in view (L-LINE's `named`) */
const LINE_NAMED = () => RENDER.stats.labels.some((l) => l.kind === 'form') ? accountAt(CAM.cam.x, CAM.cam.y, '1') : null;

test('a press goes to the one form wherever its rectangle is drawn (B11-S5\'s press), and to a form, or a box drawn smaller than the least target, anywhere in an area grown about its rectangle\'s centre to that target each way — where areas meet the nearest drawn shape winning, a point in a place\'s drawn shape going to that place, a box at least the target each way pressed on its outline alone; the drawing the same with the areas as without (WCAG 2.2 SC 2.5.8; P-REG\'s TARGET; FP-44)', () => {
  const { ctx, strokes, texts } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  CAM.setViewport(1440, 900);
  formBoard();
  REC.takeSpanSet(MAIL, [{ subspace: 1, ordinal: 1, positions: 40000 }]);
  const mid = (/** @type {Rect} */ r) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });
  const at = (/** @type {{x: number, y: number}} */ p) => RENDER.placeAtScreen(p.x, p.y);
  try {
    atSlots(600);
    RENDER.draw();
    assert.deepEqual(at(mid(onScreen(SLOT4))), { addr: SLOT4, form: true, padded: false }, 'at mid, inside its rectangle: the form');
    const mail = RENDER.stats.labels.length >= 0 && LAYER.shapeOf(MAIL), m = { x: CAM.sx(mail.x), y: CAM.sy(mail.y), w: mail.w * CAM.cam.scale, h: mail.h * CAM.cam.scale };
    assert.ok(m.w >= TARGET.min && m.h >= TARGET.min, 'the mailbox at mid: at least the target each way');
    assert.deepEqual([at({ x: m.x + m.w + 3, y: m.y + m.h / 2 }), RENDER.docAtScreen(m.x + m.w + 3, m.y + m.h / 2), at(mid(m))?.addr], [null, null, MAIL], 'a box at least the target each way: its outline alone');
    atSlots(LOD_FAR_LO + 2);
    const before = { strokes: JSON.stringify(strokes.splice(0)), texts: JSON.stringify(texts.splice(0)) };
    RENDER.draw();
    const s3 = onScreen(SLOT3), s4 = onScreen(SLOT4), s5 = onScreen(SLOT5), c3 = mid(s3), c4 = mid(s4), c5 = mid(s5);
    assert.ok(s3.w < TARGET.min / 4 && s3.h < TARGET.min, `at far~mid the forms are small: ${JSON.stringify(s3)}`);
    // below a form, outside its rectangle and inside its area, no other place near
    const under = { x: c4.x, y: s4.y + s4.h + 8 };
    assert.deepEqual(at(under), { addr: SLOT4, form: true, padded: true }, '8 px below a form, inside its area: the form');
    // between two forms, nearer the one listed second
    const between = { x: c3.x + (c4.x - c3.x) * 0.6, y: c3.y };
    assert.ok(Math.abs(between.x - c3.x) <= TARGET.min / 2 && Math.abs(between.x - c4.x) <= TARGET.min / 2, 'inside both areas');
    assert.equal(at(between)?.addr, SLOT4, 'the nearer drawn shape: the form listed second');
    // the ordinary edition beside slot 5, a box drawn small: below it, its area; between it and the form, the nearer drawn shape
    const o = RENDER.stats.labels && LAYER.shapeOf(ORDINARY), ob = { x: CAM.sx(o.x), y: CAM.sy(o.y), w: o.w * CAM.cam.scale, h: o.h * CAM.cam.scale }, co = mid(ob);
    assert.ok(ob.w < TARGET.min && ob.h < TARGET.min, 'the edition\'s box drawn smaller than the target');
    assert.deepEqual(at({ x: co.x, y: ob.y + ob.h + 8 }), { addr: ORDINARY, form: false, padded: true }, '8 px below a small box, inside its area: the box');
    assert.deepEqual([at({ x: c5.x + (co.x - c5.x) * 0.4, y: c5.y })?.addr, at({ x: c5.x + (co.x - c5.x) * 0.6, y: c5.y })?.addr], [SLOT5, ORDINARY], 'between a form and a small box: the nearer drawn shape');
    // a point in the mailbox's drawn outline, nearer the bio form's centre than its own and inside that form's area: the mailbox
    const outline = RENDER.stats.labels && LAYER.shapeOf(MAIL), mo = { x: CAM.sx(outline.x), y: CAM.sy(outline.y), w: outline.w * CAM.cam.scale, h: outline.h * CAM.cam.scale };
    const inMail = { x: mo.x + mo.w - 0.25, y: c3.y };
    assert.ok(Math.hypot(inMail.x - c3.x, inMail.y - c3.y) < Math.hypot(inMail.x - mid(mo).x, inMail.y - mid(mo).y) && Math.abs(inMail.x - c3.x) <= TARGET.min / 2 && inMail.y >= mo.y && inMail.y <= mo.y + mo.h,
      `a point in the mailbox's outline, inside the bio form's area and nearer its centre: ${JSON.stringify({ inMail, mo, s3 })}`);
    assert.deepEqual(at(inMail), { addr: MAIL, form: false, padded: false }, 'a drawn shape is its own place\'s: the mailbox');
    // the drawing: the same with the press areas read as without
    const drawn = { strokes: JSON.stringify(strokes.splice(0)), texts: JSON.stringify(texts.splice(0)) };
    RENDER.draw();
    assert.deepEqual({ strokes: JSON.stringify(strokes), texts: JSON.stringify(texts) }, drawn, 'reading the press areas moves no stroke and no label');
    assert.notEqual(drawn.strokes, before.strokes, 'the frames compared drew');
  } finally { REC._reset(); WRITE._reset(); }
});

/**
 * A tail as the frame draws it (P-RENDER's `tailsOf`), handed to the one press test as the last frame's: leaving a place at a
 * screen point, its stroke `len` px rightward at its links' own weight, its label's lines' rects as the pass set them
 */
const drawnTail = (/** @type {string} */ at, /** @type {'box' | 'line'} */ form, /** @type {{x: number, y: number}} */ from, len = 10, /** @type {Rect[]} */ rects = []) => /** @type {import('./render.js').DrawnTail} */ ({
  key: `tail ${at} ${from.x},${from.y}`, form, at, docs: [at], links: ['1.0.9.0.1.0.2.1'], far: ['1.0.9.0.1'], from, to: { x: from.x + len, y: from.y }, world: { x: CAM.wx(from.x), y: CAM.wy(from.y) },
  line: null, pos: null, hue: '#9aa5b4', alpha: 1, weight: 1, dashed: false, label: rects.map(() => 'a far end'), rects, stroke: { x: from.x, y: from.y - 0.8, w: len, h: 1.6 },
});

test('one press test (#780\'s design decision; FP-44): a press inside a target\'s drawn shape goes to it — on a box\'s own edge where a tail\'s stroke leaves it, the box; on the stroke, the tail — the topmost where two shapes meet, a tail\'s stroke over the box it starts in, and no area takes a press from another target\'s ink; outside every shape, the target whose area holds the point and whose drawn shape is nearest, though another\'s centre is nearer; one pixel past every area, the ground', () => {
  const { ctx } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  CAM.setViewport(4000, 900);
  formBoard();
  REC.takeSpanSet(MAIL, [{ subspace: 1, ordinal: 1, positions: 40000 }]);
  const press = (/** @type {number} */ x, /** @type {number} */ y) => RENDER.pressAt(x, y);
  const kindOf = (/** @type {import('./render.js').Press | null} */ p) => (p ? (p.kind === 'tail' ? 'tail ' + p.tail.at + (p.padded ? ' padded' : '') : p.kind === 'place' ? p.place.addr + (p.place.padded ? ' padded' : '') : 'mark') : null);
  try {
    // the mailbox a box 120 px wide, the bio form 30 px right of its first row's end
    atSlots(120);
    RENDER.draw();
    const box = docBox(MAIL), row = firstRow(LAYER.foldOf(REC.doc(MAIL)));
    const from = { x: CAM.sx(box.x + row.x + row.w), y: CAM.sy(box.y + row.y + row.h / 2) }, s3 = onScreen(SLOT3);
    assert.ok(s3.x - from.x > TARGET.min + 2, `room for a tail's area between the mailbox and the bio form: ${s3.x - from.x} px`);
    const tail = drawnTail(MAIL, 'box', from);
    RENDER.stats.tails = [tail];
    assert.equal(kindOf(press(from.x - 2, from.y)), MAIL, 'on the mailbox\'s own edge where the stroke leaves it: the box, never the tail');
    assert.equal(kindOf(press(from.x + 5, from.y)), 'tail ' + MAIL, 'on the stroke: the tail');
    assert.equal(kindOf(press(from.x + 20, from.y + 10)), 'tail ' + MAIL + ' padded', 'beside the stroke, in its area: the tail');
    assert.deepEqual([kindOf(press(from.x + TARGET.min + 1, from.y)), kindOf(press(from.x + 5, from.y + TARGET.min / 2 + 1)), kindOf(press(from.x + 5, from.y - TARGET.min / 2 - 1))], [null, null, null], 'one pixel past its area, right, below and above: the ground');
    // a tail leaving a passage's line, its stroke inside the mailbox's outline: the stroke the topmost there, and the box's ink beside it the box's
    const inner = { x: from.x - 40, y: from.y + 40 }, line = drawnTail(MAIL, 'line', inner);
    RENDER.stats.tails = [tail, line];
    assert.equal(kindOf(press(inner.x + 4, inner.y)), 'tail ' + MAIL, 'on a stroke drawn over the box: the tail, the topmost');
    assert.equal(kindOf(press(inner.x + 4, inner.y - 3)), MAIL, '3 px off that stroke, inside its area and on the box\'s ink: the box');
    // two tails out on the ground below the boxes: a labelled one, long and thin, and a bare one beneath it, their areas meeting
    const far = CAM.sy(box.y + box.h) + 120, longFrom = { x: from.x + 200, y: far };
    const label = { x: longFrom.x + 13, y: far - 5.4, w: 60, h: 10.8 }, longTail = drawnTail('1.0.4.0.1', 'box', longFrom, 10, [label]);
    const shortFrom = { x: longFrom.x, y: far + 20 }, shortTail = drawnTail('1.0.4.0.64', 'box', shortFrom);
    RENDER.stats.tails = [longTail, shortTail];
    const p = { x: longFrom.x + 20, y: far + 10 };
    const centre = (/** @type {Rect} */ r) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 }), dist = (/** @type {{x: number, y: number}} */ a) => Math.hypot(a.x - p.x, a.y - p.y);
    const longCentre = centre({ x: longFrom.x, y: label.y, w: label.x + label.w - longFrom.x, h: label.h }), shortCentre = centre(shortTail.stroke);
    assert.ok(dist(shortCentre) < dist(longCentre), `the bare tail's centre is the nearer: ${dist(shortCentre)} against ${dist(longCentre)}`);
    assert.ok([RENDER.tailArea(longTail), RENDER.tailArea(shortTail)].every((a) => !!a && p.x >= a.x && p.x <= a.x + a.w && p.y >= a.y && p.y <= a.y + a.h), 'the point in both areas');
    assert.equal(kindOf(press(p.x, p.y)), 'tail 1.0.4.0.1 padded', 'outside every shape: the tail whose drawn shape — its label — is nearest');
  } finally { RENDER.stats.tails = []; REC._reset(); WRITE._reset(); }
});

test('a tail\'s press area (#780\'s design decision; FP-44): its stroke and its label\'s lines grown as one rectangle to at least the least target each way, from where it leaves — never back over the place it leaves — and evenly above and below its stroke; a tail whose label is left out grows its stroke alone', () => {
  const from = { x: 500, y: 300 };
  const bare = /** @type {Rect} */ (RENDER.tailArea(drawnTail('1.0.4.0.2', 'box', from)));
  assert.deepEqual(bare, { x: from.x, y: from.y - TARGET.min / 2, w: TARGET.min, h: TARGET.min }, 'its stroke alone: the least target each way, from its root, level with its stroke');
  const one = { x: from.x + 13, y: from.y - 5.4, w: 60, h: 10.8 };
  const labelled = /** @type {Rect} */ (RENDER.tailArea(drawnTail('1.0.4.0.2', 'box', from, 10, [one])));
  assert.deepEqual(labelled, { x: from.x, y: from.y - TARGET.min / 2, w: one.x + one.w - from.x, h: TARGET.min }, 'with a one-line label: its stroke and label as one, grown to the least target tall');
  const two = [one, { x: from.x + 13, y: from.y + 5.4, w: 40, h: 10.8 }];
  const tall = /** @type {Rect} */ (RENDER.tailArea(drawnTail('1.0.4.0.2', 'box', from, 10, two)));
  assert.ok(Math.abs(tall.y + tall.h / 2 - from.y) < 1e-9 && tall.h >= TARGET.min && tall.y <= one.y && tall.y + tall.h >= two[1].y + two[1].h - 1e-9 && tall.x === from.x, `with a two-line label: holding both lines, its middle level with the stroke: ${JSON.stringify(tall)}`);
});

test('a continuation\'s mark standing as one target, drawn under the least target one way, is pressed in an area grown to it (#780\'s design decision; FP-44): half a pixel off its drawn edge it opens the list, one pixel past its area it does not; a mark holding two targets keeps them (issue #42)', () => {
  try {
    sixty();
    const c = continuationCell('1.0.1', 1);
    CAM.set({ ...middleOf(c), scale: markScale(1, 0) });
    RENDER.draw();
    const m = firstMark();
    assert.ok(m && m.newestTarget === null && m.rect.w < TARGET.min, `one target, narrower than the least: ${JSON.stringify(m && m.rect)}`);
    const y = m.rect.y + m.rect.h / 2, edge = m.rect.x + m.rect.w / 2 - TARGET.min / 2;
    assert.deepEqual(RENDER.residueAtScreen(m.rect.x - 0.5, y), { account: '1.0.1', k: 1, key: '1.0.1:1', newest: m.newest, target: 'list' }, 'off its drawn edge, inside its area: the list');
    assert.equal(RENDER.residueAtScreen(edge - 1, y), null, 'one pixel past its area: not the mark');
  } finally { REC._reset(); WRITE._reset(); CAM.setViewport(1440, 900); }
});

test('a link the reader can read whose far end is an assigned slot no document the reader can read stands at is a mid connection to the one form there, its stroke ending on the form\'s rectangle where it meets it — never short of it, never inside — and no tail; to another person\'s mailbox\'s form no stroke at rest and no tail; a reserved number\'s far end and another board\'s keep their tail (the one form\'s part 7, changing #132 at an assigned slot; #771)', () => {
  const { ctx } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  CAM.setViewport(4000, 900);
  formBoard();
  LK.readers({ drawn: RENDER.drawsPlace });
  const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: OWN, whole: false, subspace: 1, ordinal: ord, positions: w });
  const whole = (/** @type {string} */ doc) => ({ start: doc, width: '0.0.0.0.1', doc, account: doc.split('.0.').slice(0, -1).join('.0.'), whole: true, subspace: null, ordinal: null, positions: null });
  const FAR = { form: SLOT3, theirs: OTHER + '.0.2', reserved: OWN + '.0.12', board: '2.0.1.0.3' };
  const links = Object.entries(FAR).map(([, far], i) => ({ addr: `${ORDINARY}.0.2.${i + 1}`, from: [span(ORDINARY, 1 + 10 * i, 5)], to: [whole(far)], type: CITE }));
  try {
    REC.takeSpanSet(ORDINARY, [{ subspace: 1, ordinal: 1, positions: 40 }]);
    REC.takeDelivery(ORDINARY, [{ pos: 1, width: 40, kind: 'content', text: 'x'.repeat(40), ref: null, origin: null }]);
    REC.takeImage(ORDINARY, 1, [{ iStart: ORDINARY + '.0.1.1', width: 40 }]);
    REC.takeLinks(ORDINARY, links.map((l) => l.addr));
    for (const l of links) REC.takeLink(l);
    assert.deepEqual([FAR.form, FAR.theirs, FAR.reserved, FAR.board].map((a) => [RENDER.drawsDoc(a), RENDER.drawsPlace(a)]), [[false, true], [false, true], [false, false], [false, false]], 'a place drawn at the two forms, a document at none; none at the reserved number or on another board');
    const a = LAYER.shapeOf(SLOT3), b = LAYER.shapeOf(ORDINARY);
    CAM.set({ x: (a.x + b.x + b.w) / 2, y: a.y + a.h / 2, scale: 300 / DOC_W });
    RENDER.draw();
    const c = RENDER.stats.connections.find((x) => [x.a, x.b].includes(SLOT3));
    assert.ok(c && [c.a, c.b].includes(ORDINARY) && !c.stub, `a connection between the edition and the bio's form: ${JSON.stringify(RENDER.stats.connections.map((x) => [x.a, x.b]))}`);
    const r = onScreen(SLOT3), [p, q] = c.a === SLOT3 ? [c.stroke[1], c.stroke[0]] : c.stroke;
    const onEdge = Math.min(Math.abs(q.x - r.x), Math.abs(q.x - r.x - r.w), Math.abs(q.y - r.y), Math.abs(q.y - r.y - r.h)) < 1e-6 && q.x >= r.x - 1e-6 && q.x <= r.x + r.w + 1e-6 && q.y >= r.y - 1e-6 && q.y <= r.y + r.h + 1e-6;
    const centre = { x: r.x + r.w / 2, y: r.y + r.h / 2 }, cross = (q.x - p.x) * (centre.y - p.y) - (q.y - p.y) * (centre.x - p.x);
    const outside = !(p.x > r.x && p.x < r.x + r.w && p.y > r.y && p.y < r.y + r.h);
    assert.ok(onEdge && outside && Math.abs(cross) < 1e-6 * Math.hypot(centre.x - p.x, centre.y - p.y) ** 2, `its stroke ends on the form's rectangle, on the line toward its centre, from outside it: ${JSON.stringify({ p, q, r })}`);
    assert.ok(!RENDER.stats.connections.some((x) => [x.a, x.b].includes(FAR.theirs)), 'none to another person\'s mailbox\'s form');
    const tails = RENDER.stats.tails.flatMap((tl) => tl.far);
    assert.deepEqual([tails.includes(FAR.form), tails.includes(FAR.theirs), tails.includes(FAR.reserved), tails.includes(FAR.board)], [false, false, true, true], `no tail to either form; the reserved number's and the other board's stand: ${JSON.stringify(tails)}`);
  } finally { LK._reset(); REC._reset(); WRITE._reset(); }
});

test('the walk\'s ring stands around the one form\'s rectangle exactly as around a document\'s box, wherever an act of the person\'s put the walk there, its corners drawn unchanged inside it, no record made (the one form\'s part 6; #559)', async () => {
  const { ctx, strokes } = recorder();
  RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
  CAM.setViewport(4000, 900);
  formBoard();
  try {
    atSlots(600);
    RENDER.draw();
    const bare = JSON.stringify(strokes.filter((s) => s.hue === FORM.ink));
    await WALK.focusTo(SLOT4, null);
    atSlots(600);
    strokes.length = 0;
    RENDER.draw();
    const r = onScreen(SLOT4);
    const ring = RENDER.stats.ring;
    assert.ok(WALK.current()?.kind === 'form' && ring && near([{ x: ring.x, y: ring.y }, { x: ring.w, y: ring.h }], [{ x: r.x, y: r.y }, { x: r.w, y: r.h }]), `the ring's box the form's rectangle: ${JSON.stringify({ ring, r })}`);
    assert.ok(strokes.some((s) => s.hue === COL.focus) && JSON.stringify(strokes.filter((s) => s.hue === FORM.ink)) === bare, 'the ring drawn, the corners as they stood');
    // at a fit whose corners stand at their documents' heads, where a plain box keeps a head's band and the form, holding no corner, keeps none
    CAM.setViewport(390, 844);
    atSlots(300);
    RENDER.draw();
    const narrow = onScreen(SLOT4), held = RENDER.stats.ring;
    assert.ok(CAM.fit().head && held && near([{ x: held.x, y: held.y }, { x: held.w, y: held.h }], [{ x: narrow.x, y: narrow.y }, { x: narrow.w, y: narrow.h }]), `at a head fit, the ring's box the form's rectangle still: ${JSON.stringify({ head: CAM.fit().head, held, narrow })}`);
    assert.equal(REC.has(SLOT4), false, 'no record made');
  } finally { REC._reset(); WRITE._reset(); }
});
