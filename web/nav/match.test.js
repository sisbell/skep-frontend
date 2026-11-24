// N-MATCH's test: an address is exact, a share form and a URL are recognized
// and go nowhere, labels match by text and addresses by prefix over the index
// with the system account never listed, and with nothing typed the levels are
// listed — the board's first where a board is held, and none where none is
// (FP-35); a well-known slot's name typed finds the acting account's own slot
// first, created or not, a guest's none, the index's slot documents matched
// by their names, and a typed slot address's row names its slot.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matches, isShareForm, isUrl } from './match.js';
import * as REC from '../model/records.js';
import { t } from '../strings.js';

const ctx = {
  places: [
    { doc: '1.0.1.0.3', kind: /** @type {const} */ ('edition'), label: '# skep-ux-design', standing: /** @type {const} */ ('public'), account: '1.0.1', system: false },
    { doc: '1.0.1.0.4', kind: /** @type {const} */ ('edition'), label: '## The artifact chain', standing: /** @type {const} */ ('public'), account: '1.0.1', system: false },
    { doc: '1.1.0.1.0.2', kind: /** @type {const} */ ('edition'), label: null, standing: /** @type {const} */ ('public'), account: '1.1.0.1', system: true },
  ],
  landmarks: [{ doc: '1.0.2.0.1', kind: /** @type {const} */ ('edition'), label: null, standing: /** @type {const} */ ('public'), account: '1.0.2', system: false }],
  trail: [{ n: 1, addr: '1.0.1.0.3', label: 'x' }],
  current: '1.0.1.0.3', board: '1', home: '1.0.1',
  levelWords: { board: 'the whole board', home: 'HOME', account: 'the account\'s region', document: 'the whole document' },
};

test('an address is exact — one row', () => {
  const r = matches('1.0.1.0.4', ctx);
  assert.deepEqual(r.map((x) => [x.kind, x.addr, x.exact]), [['address', '1.0.1.0.4', true]]);
});
test('a share form and a URL are recognized and go nowhere here', () => {
  assert.ok(isShareForm('skep://3xK9'));
  assert.ok(isShareForm('https://skep.network/l/3xK9'));
  assert.ok(isUrl('https://example.org/page'));
  assert.equal(matches('https://example.org/page', ctx)[0].kind, 'url');
});
test('labels match by text, addresses by prefix; the system account is never listed', () => {
  assert.deepEqual(matches('artifact', ctx).map((x) => x.addr), ['1.0.1.0.4']);
  assert.deepEqual(matches('1.0.1.0', ctx).map((x) => x.addr).sort(), ['1.0.1.0.3', '1.0.1.0.4']);
  assert.ok(!matches('1.1', ctx).some((x) => x.addr === '1.1.0.1.0.2'));
});
test('nothing typed: the levels, the whole board first, HOME, the landmarks, the trail', () => {
  const r = matches('', ctx);
  assert.deepEqual(r.map((x) => x.kind), ['board', 'home', 'document', 'landmark', 'trail']);
  assert.equal(r[0].addr, '1');
});
test('nothing typed, no board held: no board\'s level is listed — the rows begin at what the reader holds (issue #215; FP-35)', () => {
  const r = matches('', { ...ctx, board: null, home: null, current: null, landmarks: [], trail: [] });
  assert.deepEqual(r, [], 'nothing to list: no board, no HOME, no address named');
  assert.deepEqual(matches('', { ...ctx, board: null }).map((x) => x.kind), ['home', 'document', 'landmark', 'trail'], 'the board row alone left out');
});
test('an address typed at a number the plane\'s map gives no cell is one row as any address is, marked reserved and saying the words handed in for it, before any press; an ordinary address, a slot\'s and the home page\'s say nothing of it (issue #771\'s decision: "It shows on the LEAP box\'s row as soon as the address is typed")', () => {
  const at = { ...ctx, reserved: 'reserved number' };
  assert.deepEqual(matches('1.0.1.0.7', at), [{ kind: 'address', addr: '1.0.1.0.7', title: '1.0.1.0.7', sub: 'reserved number', exact: true, reserved: true }], 'a reserved number: one row, its words beside its address');
  assert.deepEqual(matches('1.0.2.0.63.2', at).map((r) => [r.reserved, r.sub]), [[true, 'reserved number']], 'a version address under one, on another account: the same');
  for (const a of ['1.0.1.0.64', '1.0.1.0.3', '1.0.1.0.5', '1.0.1.0.1', '1.0.1']) assert.deepEqual(matches(a, at).map((r) => [r.kind, r.reserved, r.sub]), [['address', undefined, '']], `${a}: no reserved words`);
});

// ---- a well-known slot's name (B11-S9, B11-S7, B11-F10) -----------------------------------------------------------------

/** the box's context over the names table as N-LEAP hands it in (M-REC's `namedSlots`, `slotNameShown`), acting as `home` */
const named = (/** @type {string | null} */ home) => {
  REC.setSession(home ? /** @type {any} */ ({ session: 's-1', principal: 1, account: home }) : null);
  const place = (/** @type {string} */ doc, /** @type {string | null} */ label) => ({ doc, kind: /** @type {const} */ ('edition'), label, standing: /** @type {const} */ ('public'), account: doc.split('.0.').slice(0, 2).join('.0.'), system: doc.startsWith(REC.SYSTEM_ACCOUNT + '.') });
  return {
    ...ctx, home,
    places: [place('1.0.1.0.2', null), place('1.0.1.0.70', 'my bio notes'), place('1.0.1.1.0.2', null), place('1.0.2.0.3', 'Hello from the second account'), place(REC.SYSTEM_ACCOUNT + '.0.3', 'bio of the board')],
    reserved: 'reserved number',
    slots: home ? REC.namedSlots(home).map((x) => ({ addr: x.addr, text: t(x.id) })) : [],
    named: (/** @type {string} */ addr) => { const id = REC.slotNameShown(addr); return id ? { id, text: t(id) } : null; },
  };
};
/** a well-known slot's name as a row carries it, by its string's id */
const slotNamed = (/** @type {string} */ id) => ({ id, text: t(id) });

test('a slot\'s name typed lists the acting account\'s own slot first, created or not — its address read off the account\'s with no lookup, the account beside it, its name and the first line the index lists for it — ahead of another account\'s slot document matched by its name and a document whose first line holds the word; the system account\'s never; the own slot not listed twice (B11-S9, B11-S7, B11-F10)', () => {
  const [BIO, MAIL, MINE] = ['L.well-known.bio', 'L.well-known.mailbox', 'L.well-known.your-mailbox'].map(slotNamed);
  const c = named('1.0.1');
  const rows = (/** @type {string} */ q) => matches(q, c).map((r) => [r.kind, r.addr]);
  assert.deepEqual(matches('bio', c)[0], { kind: 'slot', addr: '1.0.1.0.3', title: BIO.text, sub: '', exact: true, owner: '1.0.1', slot: BIO }, 'the own bio, unwritten and unlisted, its first row');
  assert.deepEqual(rows('bio'), [['slot', '1.0.1.0.3'], ['label', '1.0.2.0.3'], ['label', '1.0.1.0.70']], 'then another account\'s bio by its name, then a document whose first line holds the word');
  assert.deepEqual(matches('bio', c)[1].slot, BIO, 'the other account\'s bio names its slot');
  assert.deepEqual(rows('mailbox'), [['slot', '1.0.1.0.2'], ['label', '1.0.1.1.0.2']], 'the own mailbox, listed, once — its own name — then the agent space\'s by its name');
  assert.deepEqual([matches('mailbox', c)[0].slot, matches('mailbox', c)[1].slot], [MINE, MAIL], 'the own one\'s own name, the agent space\'s the plain one');
  assert.deepEqual(rows('link page'), [['slot', '1.0.1.0.4']], 'the own link page, unwritten and unlisted');
  assert.deepEqual(rows('  Link   PAGE '), [['slot', '1.0.1.0.4']], 'the name whole, case and white space aside');
  assert.ok(!rows('mail').some(([k]) => k === 'slot'), 'a part of a name is no name: no own row');
  assert.deepEqual(rows('mail'), [['label', '1.0.1.1.0.2'], ['label', '1.0.1.0.2']], 'a part of a name matches the index\'s slot documents by their names, as a first line\'s words match');
  assert.ok(!matches('bio', c).some((r) => r.addr.startsWith(REC.SYSTEM_ACCOUNT)), 'the system account\'s place never listed');
  const listed = { ...c, places: [...c.places, { ...c.places[0], doc: '1.0.1.0.3', label: 'We are the claimant' }] };
  assert.deepEqual(matches('bio', listed).filter((r) => r.addr === '1.0.1.0.3').map((r) => [r.kind, r.sub]), [['slot', 'We are the claimant']], 'its own bio listed: one row, the own row, carrying the first line the index lists');
  for (const q of ['policy', 'policy document', 'your mailbox']) assert.ok(!matches(q, c).some((r) => r.kind === 'slot'), `"${q}": no slot's name — slot 5's is a gap, and "your mailbox" no name typed`);
  REC.setSession(null);
});

test('a guest\'s box lists no own slot: a slot\'s name typed matches the index\'s slot documents by their names alone (B11-S9)', () => {
  const MAIL = slotNamed('L.well-known.mailbox');
  const c = named(null);
  assert.deepEqual(matches('bio', c).map((r) => [r.kind, r.addr]), [['label', '1.0.2.0.3'], ['label', '1.0.1.0.70']], 'no own row');
  assert.deepEqual(matches('mailbox', c).map((r) => [r.addr, r.slot]), [['1.0.1.0.2', MAIL], ['1.0.1.1.0.2', MAIL]], 'no mailbox of its own: each by the plain name');
});

test('an address typed at a well-known slot that bears a name says the name on its row, the words its label sets (FP-33); a reserved number\'s row says "reserved number" as before, and an ordinary address\'s, the home page\'s, slot 5\'s and the system account\'s slots\' nothing (B11-F10; issue #771\'s decision)', () => {
  const [BIO, MAIL, MINE, LINK] = ['L.well-known.bio', 'L.well-known.mailbox', 'L.well-known.your-mailbox', 'L.well-known.link-page'].map(slotNamed);
  const c = named('1.0.1');
  assert.deepEqual(matches('1.0.1.0.3', c), [{ kind: 'address', addr: '1.0.1.0.3', title: '1.0.1.0.3', sub: BIO.text, exact: true, slot: BIO }], 'the own bio typed: its row names it');
  assert.deepEqual(['1.0.1.0.2', '1.0.2.0.2', '1.0.2.0.4.3'].map((a) => matches(a, c)[0].slot), [MINE, MAIL, LINK], 'the own mailbox its own name, another\'s mailbox the plain one, a member of a link page its document\'s');
  assert.deepEqual(matches('1.0.1.0.7', c), [{ kind: 'address', addr: '1.0.1.0.7', title: '1.0.1.0.7', sub: 'reserved number', exact: true, reserved: true }], 'a reserved number: as before');
  for (const a of ['1.0.1.0.64', '1.0.1.0.1', '1.0.1.0.5', REC.SYSTEM_ACCOUNT + '.0.2', '1.0.1']) assert.deepEqual(matches(a, c).map((r) => [r.kind, r.sub, r.slot]), [['address', '', undefined]], `${a}: nothing on its row`);
  REC.setSession(null);
});
