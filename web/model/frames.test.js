// M-FRAMES's test: every composer spells its frame as `docs/wire.md`'s
// request examples spell it (FP-16), the orphan preview among them, the
// edition-claim and enrollment lookups and the edition-class links homed in
// a document take `find_links_ftt`'s two-slot shape and never the audit
// view's `edition_claims`, no write composer exists, every decoder reads the
// wire's example answers — the age a link value and `doc_metadata` carry,
// and the draft base, merge marker and source `doc_metadata` carries, among
// them — a delivery keeps an item of a kind it does not know at its own
// place, and each of the editor's answers and events decodes from the wire's
// or the declarations' own example, its absent members null and a malformed
// form the decoder's null.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as F from './frames.js';
import { unitSpan } from './address.js';
import { canon } from '../test/fake-port.js';

// the wire's own examples, byte-exact as docs/wire.md carries them (keys sorted)
const EXAMPLES = {
  retrieve_v: '{"op":"retrieve_v","specs":[{"doc":"1.0.1.0.1","span":{"start":"1.1","width":"0.11"}}]}',
  retrieve_doc_v_span_set: '{"doc":"1.0.1.0.1","op":"retrieve_doc_v_span_set"}',
  doc_metadata: '{"doc":"1.0.1.0.1","op":"doc_metadata"}',
  find_links_v: '{"d":"1.0.1.0.1","op":"find_links_v","region":[{"start":"1.1","width":"0.5"}]}',
  // the lookup of a type's name (§Link discovery reads): two slots constrained by unit spans, the shape the edition-claim lookup takes
  find_links_ftt: '{"op":"find_links_ftt","q":{"from":"any","home":"any","to":[{"start":"1.1.0.1.0.1.0.3.13","width":"0.0.0.0.0.0.0.0.1"}],"ty":[{"start":"1.1.0.1.0.1.0.3.50","width":"0.0.0.0.0.0.0.0.1"}]}}',
  read_link: '{"a":"1.0.1.0.1.0.2.1","op":"read_link"}',
  follow_link: '{"a":"1.0.1.0.1.0.2.1","op":"follow_link","slot":2}',
  image: '{"d":"1.0.1.0.1","op":"image","region":[{"start":"1.1","width":"0.5"}]}',
  project: '{"a":"1.0.1.0.1.0.2.1","d":"1.0.1.0.2","op":"project","slot":2}',
  show_origin: '{"doc":"1.0.1.0.1","op":"show_origin","span":{"start":"1.1","width":"0.5"}}',
  compare: '{"op":"compare","rho1":[{"doc":"1.0.1.0.1","spans":[{"start":"1.1","width":"0.5"}]}],"rho2":[{"doc":"1.0.1.0.2","spans":[{"start":"1.1","width":"0.5"}]}]}',
  find_docs_containing: '{"op":"find_docs_containing","regions":[{"doc":"1.0.1.0.1","spans":[{"start":"1.1","width":"0.5"}]}]}',
  effective_owner: '{"addr":"1.0.1.1","op":"effective_owner"}',
  principal_prefix: '{"op":"principal_prefix","principal":2}',
  key_set: '{"account":"1.0.1","op":"key_set"}',
  in_claims: '{"op":"in_claims","view":"active","y":"1.0.1.0.1.0.2.1"}',
  out_claims: '{"op":"out_claims","view":"audit","x":"1.0.1.0.1.0.2.2"}',
  delete_orphans: '{"d":"1.0.1.0.1","op":"delete_orphans","p":{"ordinal":"3","subspace":"1"},"width":"2"}',
  op_at: '{"at":9,"frame":{"op":"retrieve_v","specs":[{"doc":"1.0.1.0.1","span":{"start":"1.1","width":"0.5"}}]}}',
};

// the wire's own example answers, byte-exact as docs/wire.md carries them (§The response envelope)
const WIRE = {
  link_value: '{"as_of":9,"at":7,"link":{"slots":[[{"start":"1.0.1.0.1.0.1.1","width":"0.0.0.0.0.0.0.5"}],[{"start":"1.0.1.0.2.0.1.1","width":"0.0.0.0.0.0.0.6"}],[{"start":"1.0.1.0.3.0.1.1","width":"0.0.0.0.0.0.0.1"}]]},"resp":"link_value","time":1786838400047,"time_from":"feed"}',
  link_value_null: '{"as_of":9,"at":null,"link":null,"resp":"link_value","time":null,"time_from":null}',
  doc_metadata: '{"as_of":9,"at":7,"base":null,"base_copied":null,"base_extent":"3","birth":"1.0.1.0.1.1","birth_extent":"5","doc":"1.0.1.0.1","merge":null,"owner":"1.0.1","placed":"5","published":true,"resp":"doc_metadata","source":null,"time":1786838400047,"time_from":"feed"}',
  doc_metadata_unborn: '{"as_of":9,"at":8,"base":"1.0.1.0.1.1","base_copied":"5","base_extent":null,"birth":null,"birth_extent":null,"doc":"1.0.1.0.2","merge":null,"owner":"1.0.1","placed":null,"published":false,"resp":"doc_metadata","source":"1.0.1.0.1.1","time":1786838400052,"time_from":"anchor"}',
  doc_metadata_fork: '{"as_of":9,"at":null,"base":null,"base_copied":null,"base_extent":null,"birth":null,"birth_extent":null,"doc":"1.0.2.0.1","merge":null,"owner":"1.0.2","placed":null,"published":false,"resp":"doc_metadata","source":"1.0.1.0.1.1","time":null,"time_from":null}',
  doc_metadata_marked: '{"as_of":15,"at":8,"base":"1.0.1.0.1.2","base_copied":"6","base_extent":null,"birth":null,"birth_extent":null,"doc":"1.0.1.0.2","merge":{"at":14,"head":"1.0.1.0.1.2","head_copied":"6","sides":["1.0.1.0.1.1.1"]},"owner":"1.0.1","placed":null,"published":false,"resp":"doc_metadata","source":"1.0.1.0.1.1","time":1786838400052,"time_from":"anchor"}',
  // the write answers a burst meets (§The response envelope: `ack`, a `set_arrangement`'s head-moved tell, `ack_addr`) and the orphan preview's
  ack: '{"at":7,"resp":"ack"}',
  ack_head_moved: '{"at":14,"head_moved":"1.0.1.0.1.3","resp":"ack"}',
  ack_addr: '{"addr":"1.0.1.0.1.0.1.1","at":7,"resp":"ack_addr"}',
  orphans: '{"as_of":9,"orphaned":["1.0.1.0.1.0.2.1"],"resp":"orphans"}',
};

test('the read composers spell the wire examples exactly', () => {
  assert.equal(canon(F.retrieveV('1.0.1.0.1', 1, 11)), EXAMPLES.retrieve_v);
  assert.equal(canon(F.retrieveDocVSpanSet('1.0.1.0.1')), EXAMPLES.retrieve_doc_v_span_set);
  assert.equal(canon(F.docMetadata('1.0.1.0.1')), EXAMPLES.doc_metadata);
  assert.equal(canon(F.findLinksV('1.0.1.0.1', 1, 5)), EXAMPLES.find_links_v);
  assert.equal(canon(F.findLinksFtt({ from: 'any', home: 'any', to: [unitSpan('1.1.0.1.0.1.0.3.13')], ty: [unitSpan('1.1.0.1.0.1.0.3.50')] })), EXAMPLES.find_links_ftt);
  assert.equal(canon(F.readLink('1.0.1.0.1.0.2.1')), EXAMPLES.read_link);
  assert.equal(canon(F.followLink('1.0.1.0.1.0.2.1', 2)), EXAMPLES.follow_link);
  assert.equal(canon(F.image('1.0.1.0.1', 1, 5)), EXAMPLES.image);
  assert.equal(canon(F.project('1.0.1.0.1.0.2.1', 2, '1.0.1.0.2')), EXAMPLES.project);
  assert.equal(canon(F.showOrigin('1.0.1.0.1', 1, 5)), EXAMPLES.show_origin);
  assert.equal(canon(F.compare([{ doc: '1.0.1.0.1', spans: [{ ordinal: 1, positions: 5 }] }], [{ doc: '1.0.1.0.2', spans: [{ ordinal: 1, positions: 5 }] }])), EXAMPLES.compare);
  assert.equal(canon(F.findDocsContaining([{ doc: '1.0.1.0.1', spans: [{ ordinal: 1, positions: 5 }] }])), EXAMPLES.find_docs_containing);
  assert.equal(canon(F.effectiveOwner('1.0.1.1')), EXAMPLES.effective_owner);
  assert.equal(canon(F.principalPrefix(2)), EXAMPLES.principal_prefix);
  assert.equal(canon(F.keySet('1.0.1')), EXAMPLES.key_set);
  assert.equal(canon(F.inClaims('1.0.1.0.1.0.2.1', 'active')), EXAMPLES.in_claims);
  assert.equal(canon(F.outClaims('1.0.1.0.1.0.2.2', 'audit')), EXAMPLES.out_claims);
  assert.equal(JSON.stringify(F.opAt(9, F.retrieveV('1.0.1.0.1', 1, 5))), EXAMPLES.op_at);
});

test('the orphan preview is a read this module composes as the wire spells it — `delete_orphans`, nothing written — and joins READ_OPS, which the static gate holds every op literal to (issue #410)', () => {
  assert.equal(canon(F.deleteOrphans('1.0.1.0.1', 3, 2)), EXAMPLES.delete_orphans);
  assert.ok(F.READ_OPS.includes('delete_orphans'), 'a read of wire.md §Link discovery reads');
  assert.deepEqual(F.decodeOrphans(JSON.parse(WIRE.orphans)), ['1.0.1.0.1.0.2.1'], 'the links the delete would orphan');
  assert.deepEqual(F.decodeOrphans({ as_of: 9, orphaned: [], resp: 'orphans' }), [], 'none orphaned');
  for (const bad of [null, {}, { resp: 'addrs', addrs: [] }, { resp: 'orphans' }, { resp: 'orphans', orphaned: [1] }, { resp: 'orphans', orphaned: 'x' }]) assert.equal(F.decodeOrphans(bad), null, JSON.stringify(bad) + ': no orphans document, or a link that is no address');
});

test('the edition claims on an origin are the active view\'s lookup in the wire\'s two-slot shape — the origin\'s unit span in `to`, the edition class\'s in `ty` — never the audit view\'s `edition_claims`, which refuses an origin the reader may not read', () => {
  assert.equal(canon(F.editionClaimsAt('1.0.1.0.1003')),
    '{"op":"find_links_ftt","q":{"from":"any","home":"any","to":[{"start":"1.0.1.0.1003","width":"0.0.0.0.1"}],"ty":[{"start":"1.1.0.1.0.1.0.3.14","width":"0.0.0.0.0.0.0.0.1"}]}}');
  assert.equal(F.EDITION_CLASS, '1.1.0.1.0.1.0.3.14');
  assert.ok(!F.READ_OPS.includes('edition_claims'), 'edition_claims is no read this module composes (the static gate holds every `op` literal to READ_OPS)');
});

test('the edition-class links homed in a document are `find_links_ftt` in the wire\'s two-slot shape — the document\'s unit span in `home`, the edition class\'s in `ty` — a home slot naming a document, which takes no class-scan permit (wire.md §Link discovery reads)', () => {
  assert.equal(canon(F.editionLinksIn('1.0.1.0.30')),
    '{"op":"find_links_ftt","q":{"from":"any","home":[{"start":"1.0.1.0.30","width":"0.0.0.0.1"}],"to":"any","ty":[{"start":"1.1.0.1.0.1.0.3.14","width":"0.0.0.0.0.0.0.0.1"}]}}');
  assert.equal(canon(F.editionLinksIn('1.0.1.0.30.2')),
    '{"op":"find_links_ftt","q":{"from":"any","home":[{"start":"1.0.1.0.30.2","width":"0.0.0.0.0.1"}],"to":"any","ty":[{"start":"1.1.0.1.0.1.0.3.14","width":"0.0.0.0.0.0.0.0.1"}]}}', 'a version member\'s, its own home');
});

test('the enrollment records naming an account are the lookup of their type in the wire\'s two-slot shape — the account\'s unit span in `to`, the enroll class\'s in `ty` (wire.md §Credentials: enroll `1.1.0.1.0.1.0.3.1`, `to` the subject account)', () => {
  assert.equal(canon(F.enrollmentsOf('1.0.1.1')),
    '{"op":"find_links_ftt","q":{"from":"any","home":"any","to":[{"start":"1.0.1.1","width":"0.0.0.1"}],"ty":[{"start":"1.1.0.1.0.1.0.3.1","width":"0.0.0.0.0.0.0.0.1"}]}}');
  assert.equal(F.ENROLL_CLASS, '1.1.0.1.0.1.0.3.1');
});

test('no write composer exists (S-35 (a)): every op this module names is a read', () => {
  const WRITES = ['insert', 'delete', 'copy', 'reinstate', 'rearrange', 'version', 'publish', 'make_link', 'emit', 'nullify', 'assert_sup', 'edit_link', 'create_new_document', 'fork', 'delegate', 'register_node'];
  for (const w of WRITES) assert.ok(!F.READ_OPS.includes(w), w + ' is not composed');
  for (const name of Object.keys(F)) assert.ok(!/^(insert|delete|copy|reinstate|rearrange|version|publish|makeLink|emit|nullify|assertSup|editLink|createNewDocument|fork|delegate|registerNode)$/.test(name), 'no composer named ' + name);
});

test('a delivery places its items at byte positions; a withheld item its width', () => {
  const runs = F.decodeDelivery({ as_of: 9, items: [{ content: 'a' }, { withheld: { origin: '1.0.1.0.2', width: '3' } }, { content: 'é' }], resp: 'delivery' }, 1);
  assert.deepEqual(runs.map((r) => [r.pos, r.width, r.kind]), [[1, 1, 'content'], [2, 3, 'withheld'], [5, 2, 'content']]);
  assert.equal(runs[1].origin, '1.0.1.0.2');
  const atom = F.decodeDelivery({ as_of: 9, items: [{ content: 'hi' }, { atom: 'chunk' }], resp: 'delivery' }, 1);
  assert.deepEqual(atom.map((r) => [r.pos, r.width, r.kind]), [[1, 2, 'content'], [3, 1, 'atom']]);
  const ref = F.decodeDelivery({ as_of: 9, items: [{ content: 'hello' }, { ref: '1.0.1.0.1.0.2.1' }], resp: 'delivery' }, 1);
  assert.equal(ref[1].kind, 'ref'); assert.equal(ref[1].ref, '1.0.1.0.1.0.2.1');
});

test('an item of a kind this module does not know stands at its own place, never dropped — as wide as the `width` its one member\'s object carries, as a withheld item\'s does, else one position — and every item after it at its own positions (wire.md §Value encodings)', () => {
  const runs = F.decodeDelivery({ as_of: 9, items: [{ content: 'ab' }, { later: { origin: '1.0.1.0.2', width: '3' } }, { content: 'cd' }, { later: 'x' }, { ref: '1.0.1.0.1.0.2.1' }], resp: 'delivery' }, 1);
  assert.deepEqual(runs.map((r) => [r.pos, r.width, r.kind]), [[1, 2, 'content'], [3, 3, 'unknown'], [6, 2, 'content'], [8, 1, 'unknown'], [9, 1, 'ref']]);
  assert.deepEqual(runs.filter((r) => r.kind === 'unknown').map((r) => [r.text, r.ref, r.origin]), [['', null, null], ['', null, null]], 'nothing it carries read as text, a reference or an origin');
  assert.deepEqual(F.decodeDelivery({ as_of: 9, items: [{ later: { width: 4 } }, { content: 'e' }], resp: 'delivery' }, 7).map((r) => [r.pos, r.width]), [[7, 4], [11, 1]], 'a width spelled as a number, from the spec\'s first ordinal');
  const carriesNone = [{ later: { width: '0' } }, { later: { width: 0 } }, { later: { width: '-2' } }, { later: { width: '2.5' } }, { later: { width: 2.5 } }, { later: {} }, { later: null }, { later: [3] }, { later: { width: '3' }, beside: { width: '4' } }, {}];
  for (const item of carriesNone) {
    const [, u, after] = F.decodeDelivery({ as_of: 9, items: [{ content: 'a' }, item, { content: 'b' }], resp: 'delivery' }, 1);
    assert.deepEqual([u.pos, u.width, u.kind, after.pos], [2, 1, 'unknown', 3], `${JSON.stringify(item)}: no whole number of positions in one member's object — one position, never none`);
  }
});

test('the answers decode as the wire gives them', () => {
  assert.deepEqual(F.decodeSpanSet({ as_of: 9, resp: 'span_set', set: [{ start: '1.1', width: '0.1729' }] }), [{ subspace: 1, ordinal: 1, positions: 1729 }]);
  assert.deepEqual(F.decodeAddrs({ addrs: ['1.0.1.0.1.0.2.1'], as_of: 9, resp: 'addrs' }), ['1.0.1.0.1.0.2.1']);
  const lv = F.decodeLinkValue('1.0.1.0.3.0.2.1', { as_of: 9, link: { slots: [[{ start: '1.0.1.0.3.0.1.951', width: '0.0.0.0.0.0.0.17' }], [{ start: '1.0.1.0.127', width: '0.0.0.0.1' }], [{ start: '1.1.0.1.0.1.0.3.13', width: '0.0.0.0.0.0.0.0.1' }]] }, resp: 'link_value' });
  assert.ok(lv); assert.equal(lv.type, '1.1.0.1.0.1.0.3.13'); assert.equal(lv.from[0].ordinal, 951); assert.equal(lv.to[0].doc, '1.0.1.0.127'); assert.equal(lv.to[0].whole, true);
  assert.equal(F.decodeLinkValue('x', { as_of: 9, link: null, resp: 'link_value' }), null);
  assert.deepEqual(F.decodeFollow({ as_of: 9, resp: 'follow', result: { err: 'invalid' } }), { invalid: true, spans: [] });
  assert.equal(F.decodeFollow({ as_of: 9, resp: 'follow', result: { ok: [{ start: '1.0.1.0.1.0.1.1', width: '0.0.0.0.0.0.0.5' }] } })?.spans[0].positions, 5);
  assert.deepEqual(F.decodeRuns({ as_of: 9, resp: 'runs', runs: [{ i_start: '1.0.1.0.1.0.1.1', width: '5' }] }), [{ iStart: '1.0.1.0.1.0.1.1', width: 5 }]);
  assert.deepEqual(F.decodeCompare({ as_of: 9, pairs: [{ d1: '1.0.1.0.1', d2: '1.0.1.0.2', u1: { ordinal: '1', subspace: '1' }, u2: { ordinal: '3', subspace: '1' }, width: '5' }], resp: 'compare' }), [{ d1: '1.0.1.0.1', d2: '1.0.1.0.2', u1: 1, u2: 3, width: 5 }]);
  const m = F.decodeDocMetadata({ as_of: 9, base_extent: '3', birth: '1.0.1.0.1.1', birth_extent: '5', doc: '1.0.1.0.1', owner: '1.0.1', placed: '5', published: true, resp: 'doc_metadata', source: null });
  assert.ok(m); assert.equal(m.birthExtent, 5); assert.equal(m.published, true); assert.equal(m.source, null);
  assert.deepEqual(m.age, { at: null, time: null, from: null }, 'a board before it kept mint positions answers none');
  // wire.md's own, asked of the birth version `1.0.1.0.1.1`, minted at 7 (§Namespace, `doc_metadata`)
  const minted = F.decodeDocMetadata(JSON.parse(WIRE.doc_metadata));
  assert.equal(minted?.age.at, 7, 'the position that minted the address asked: what tells the member a bare address\'s text is (issue #212)');
  assert.deepEqual(F.decodeEffectiveOwner({ as_of: 9, prefix: '1.0.1', principal: 900, resp: 'effective_owner' }), { prefix: '1.0.1', principal: 900 });
  assert.equal(F.decodeMaybeAddr({ addr: null, as_of: 9, resp: 'maybe_addr' }), null);
  const rej = F.rejected({ code: 'unauthenticated', disposition: 'permanent', op: 'insert', resp: 'rejected' });
  assert.ok(rej); assert.equal(rej.code, 'unauthenticated');
  assert.equal(F.rejected({ resp: 'delivery' }), null);
});

test('a link value and `doc_metadata` carry the age of the address asked as wire.md\'s examples give it — the feed\'s exact time, the hour\'s anchor, no reading — a time standing only with a source the wire names, and a source only with a time (issue #22)', () => {
  const link = F.decodeLinkValue('1.0.1.0.1.0.2.1', JSON.parse(WIRE.link_value));
  assert.deepEqual(link?.age, { at: 7, time: 1786838400047, from: 'feed' }, 'the link minted at 7, its row in the feed');
  assert.equal(F.decodeLinkValue('1.0.1.0.1.0.2.9', JSON.parse(WIRE.link_value_null)), null, 'no link resides there: no value, no age');
  assert.deepEqual(F.decodeDocMetadata(JSON.parse(WIRE.doc_metadata))?.age, { at: 7, time: 1786838400047, from: 'feed' }, 'the birth version, minted at 7');
  assert.deepEqual(F.decodeDocMetadata(JSON.parse(WIRE.doc_metadata_unborn))?.age, { at: 8, time: 1786838400052, from: 'anchor' }, 'a draft whose feed line is gone, dated by the hour\'s anchor');
  assert.deepEqual(F.decodeDocMetadata(JSON.parse(WIRE.doc_metadata_fork))?.age, { at: null, time: null, from: null }, 'a fork a build before the position map minted: no age');
  const odd = (/** @type {object} */ members) => F.decodeLinkValue('1.0.1.0.1.0.2.1', { ...JSON.parse(WIRE.link_value), ...members })?.age;
  assert.deepEqual(odd({ time_from: 'clock' }), { at: 7, time: null, from: null }, 'a source the wire does not name: no time');
  assert.deepEqual(odd({ time: null }), { at: 7, time: null, from: null }, 'a source with no time: neither');
});

test('`doc_metadata` carries the draft base the board records and the merge marker beside it as wire.md\'s examples give them — null for each where the board records none — and a `merge` that is no object naming its sides and its head reads null, as the client\'s reading of the marker does (issue #395)', () => {
  const member = F.decodeDocMetadata(JSON.parse(WIRE.doc_metadata));
  assert.deepEqual([member?.base, member?.baseCopied, member?.merge], [null, null, null], 'a shot member: the board records no base and no marker');
  const staged = F.decodeDocMetadata(JSON.parse(WIRE.doc_metadata_unborn));
  assert.deepEqual([staged?.base, staged?.baseCopied, staged?.merge], ['1.0.1.0.1.1', 5, null], 'a staged draft: the member copied and the five positions the copy took, no marker');
  const fork = F.decodeDocMetadata(JSON.parse(WIRE.doc_metadata_fork));
  assert.deepEqual([fork?.base, fork?.baseCopied, fork?.merge], [null, null, null], 'a fork no staging act recorded a base for');
  const marked = F.decodeDocMetadata(JSON.parse(WIRE.doc_metadata_marked));
  assert.deepEqual([marked?.base, marked?.baseCopied], ['1.0.1.0.1.2', 6], 'the landing moved the base to the head it was composed on, at the extent read');
  assert.deepEqual(marked?.merge, { sides: ['1.0.1.0.1.1.1'], head: '1.0.1.0.1.2', headCopied: 6, at: 14 }, 'the marker beside it: the daughter merged, the head, its count as read, the landing\'s position');
  assert.deepEqual([marked?.doc, marked?.source, marked?.age], ['1.0.1.0.2', '1.0.1.0.1.1', { at: 8, time: 1786838400052, from: 'anchor' }], 'nothing the answer carried beside them reads otherwise');
  const unserved = F.decodeDocMetadata({ as_of: 9, doc: '1.0.1.0.2', owner: '1.0.1', published: false, resp: 'doc_metadata' });
  assert.deepEqual([unserved?.base, unserved?.baseCopied, unserved?.merge], [null, null, null], 'a board that serves none of the three: null for each');
  const odd = (/** @type {unknown} */ merge) => F.decodeDocMetadata({ ...JSON.parse(WIRE.doc_metadata_marked), merge })?.merge;
  for (const v of [null, '1.0.1.0.1.2', 14, true, ['1.0.1.0.1.2'], {}, { sides: ['1.0.1.0.1.1.1'] }, { head: '1.0.1.0.1.2' }, { sides: [], head: 14 }, { sides: '1.0.1.0.1.1.1', head: '1.0.1.0.1.2' }, { sides: [], head: null }]) {
    assert.equal(odd(v), null, JSON.stringify(v) + ': no object naming its sides and its head — no marker');
  }
  assert.deepEqual(odd({ sides: [], head: '1.0.1.0.1.2' }), { sides: [], head: '1.0.1.0.1.2', headCopied: null, at: null }, 'the draft itself the side, the count and the position unserved');
  assert.deepEqual(odd({ at: 14, head: '1.0.1.0.1.2', head_copied: '6', sides: ['1.0.1.0.1.1.1', 7, null] })?.sides, ['1.0.1.0.1.1.1'], 'a side that is no string is left out');
});

test('`doc_metadata` carries the document the address asked was forked or staged from as wire.md\'s examples give it — null where the board records none (issue #410)', () => {
  assert.equal(F.decodeDocMetadata(JSON.parse(WIRE.doc_metadata))?.source, null, 'a trunk minted on its own: no source');
  assert.equal(F.decodeDocMetadata(JSON.parse(WIRE.doc_metadata_unborn))?.source, '1.0.1.0.1.1', 'a staged draft: the member its stage copied');
  assert.equal(F.decodeDocMetadata(JSON.parse(WIRE.doc_metadata_fork))?.source, '1.0.1.0.1.1', 'a fork: the member it was forked from');
  assert.equal(F.decodeDocMetadata({ as_of: 9, doc: '1.0.1.0.2', owner: '1.0.1', published: false, resp: 'doc_metadata' })?.source, null, 'a board that serves none: null');
});

// ---- the editor's answers and events, each against the wire's or the declarations' own example (issue #410) ----

/** the declarations' own examples of the editor's answers, as the shell's doc lines describe each member */
const SHAPES = {
  held: { resp: 'held', held: 3, cause: 'unreachable' },
  held_unwritable: { resp: 'held', held: 4, cause: 'unreachable', unwritable: 'No space left on device (os error 28)', unwritable_class: 'full' },
  row_holding: { held: 1, doc: '1.0.1.0.1013', base: 40, frame: { op: 'insert', doc: '1.0.1.0.1013', at: { ordinal: '12', subspace: '1' }, content: 'and', as_of: 40 }, anchors: { before: '1.0.1.0.1013.0.1.11', after: '1.0.1.0.1013.0.1.12' }, cause: 'unreachable', sent: false, time: 1786838400052 },
  row_refused: { held: 2, doc: '1.0.1.0.1013', base: 40, frame: { op: 'delete', doc: '1.0.1.0.1013', p: { ordinal: '3', subspace: '1' }, width: '2', as_of: 41 }, anchors: { before: '1.0.1.0.1013.0.1.2', after: '1.0.1.0.1013.0.1.5', span: [{ start: '1.0.1.0.1013.0.1.3', width: '2' }] }, cause: 'out_of_bounds', sent: true, time: 1786838400060, refusal: { kind: 'refused', name: 'out_of_bounds', status: 200, code: 'out_of_bounds', detail: null, op: 'delete', site: {}, body: null } },
  row_moved: { held: 3, doc: '1.0.1.0.1013', base: 40, frame: { op: 'rearrange', doc: '1.0.1.0.1013', as_of: 41 }, cause: 'moved', sent: true, time: 1786838400070, refusal: { kind: 'refused', name: 'arrangement_moved', status: 200, code: 'arrangement_moved', detail: null, op: 'rearrange', site: { as_of: 41, current: 44 }, body: null } },
  row_lost: { held: 5, doc: '1.0.1.0.1013', base: 40, frame: { op: 'insert', doc: '1.0.1.0.1013', as_of: 44 }, anchors: { before: null, after: null }, cause: 'answers_lost', sent: true, time: 1786838400080, refusal: { kind: 'shell', name: 'answers_lost', last: 'unreachable', elapsed_ms: 120480 } },
  event_holding: { board: 'b-1', session: 's-1', doc: '1.0.1.0.1013', held: 1, state: 'holding', cause: 'unreachable' },
  event_moved: { board: 'b-1', session: 's-1', doc: '1.0.1.0.1013', held: 2, state: 'moved', cause: 'arrangement_moved', hands: [{ key: 'own', fingerprint: 'fp-1', label: 'laptop' }, { key: 'other', fingerprint: 'fp-2' }, { key: 'bare' }, { key: 'lost' }] },
  event_kept: { board: 'b-1', session: 's-1', doc: '1.0.1.0.1013', held: 0, state: 'kept' },
  restored: { draft: '1.0.1.0.1013', at: 9, position: 17, as_of: 16, marker: null },
  restored_marked: { draft: '1.0.1.0.1013', at: 9, position: 17, as_of: 16, marker: { sides: ['1.0.1.0.1.1.1'], head: '1.0.1.0.1.2', head_copied: '6', at: 14 } },
  undone: { draft: '1.0.1.0.1013', position: 17, record: null, restored: { base: '1.0.1.0.1.1', extent: 5 } },
  undone_bare: { draft: '1.0.1.0.1013', position: 18, record: '1.0.1.0.1.0.2.9', restored: null },
  withdrawn: { draft: '1.0.1.0.1013', position: 18, record: null },
  report: { outcome: 'landed', doc: '1.0.1.0.1', head: '1.0.1.0.1.2', base: '1.0.1.0.1.1', side: '1.0.1.0.1.1.1', form: 'daughter', sides: [{ at: '1.0.1.0.1.2', role: 'head', position: null }, { at: '1.0.1.0.1.1.1', role: 'alternative', position: null }], runs: [{ origin: '1.0.1.0.1', i_start: 1, width: 5, side: null, family: 'own' }, { origin: '1.0.1.0.1.1.1', i_start: 6, width: 3, side: 1, family: 'draft_native' }], gaps: [], counts: { a: 1, b: 1, m: 2 }, cap: 4096, over_cap: false, record: null, as_of: 15, into: '1.0.1.0.1013', position: 14, fresh: false, head_moved: null, record_link: null },
  report_reopened: { outcome: 'reopened', doc: '1.0.1.0.1', head: '1.0.1.0.1.2', base: '1.0.1.0.1.1', side: '1.0.1.0.1.1.1', form: 'daughter', sides: [], runs: [], gaps: [{ id: 1, kind: 'order', after: '1.0.1.0.1.0.1.4', before: null, runs: [{ side: 0, i_start: '1.0.1.0.1.0.1.5', width: 2 }, { side: 1, i_start: '1.0.1.0.1.1.1.0.1.1', width: 3 }], placed: [0, 1], settled: false, resolved_by: null }, { id: 2, kind: 'anchor', after: null, before: '1.0.1.0.1.0.1.9', runs: [], placed: 'before', settled: true, resolved_by: 'rule' }], counts: { a: 2, b: 2, m: 3 }, cap: 4096, over_cap: false, record: { sides: [] }, as_of: 20, into: '1.0.1.0.1013', position: 14 },
  landed: { outcome: 'landed', member: '1.0.1.0.1.3', at: 16, via: 'answer', claim: true, supersede: ['1.0.1.0.1.1.1'], daughter: false, record: null, claims: [], retries: 0 },
  panel: { rows: [], formatting: { marks: [], cut: 0, removals: [] }, read_with: {}, count: { l: 0, n: 0, r: 0, e: 0, claim: false, read_with: [], supersede: [] }, price: { lists: [0, 0, 0, 0, 0], body: 0, values: 0, reads: 0, bytes: 0, over: [] }, windows: [], inherited: [{ draft: '1.0.1.0.1014', passages: 1 }], left_behind: [] },
  panel_full: {
    rows: [{ home: '1.0.1.0.1013', kind: 'own', label: 'Tumbler.', links: ['1.0.1.0.1013.0.2.1'], types: [{ ty: '1.1.0.1.0.1.0.3.13', n: 1, far: ['1.0.1.0.127'] }], line: { p: 0, d: 0, c: 1, t: 0, u: 0 }, read_through: 0 },
      { home: '1.0.1.0.9', kind: { public: { read_with: true } }, label: 'Notes', links: [], types: [], line: { p: 1, d: 0, c: 0, t: 0, u: 0 }, read_through: 2 }],
    formatting: { marks: ['1.0.1.0.1013.0.2.2'], cut: 1, removals: [{ record: '1.0.1.0.1013.0.2.3', mark: '1.0.1.0.1.0.2.4', mark_value: { from: [], to: [{ start: '1.0.1.0.1.0.1.1', width: '0.0.0.0.0.0.0.5' }], ty: [{ start: '1.1.0.1.0.1.0.3.23', width: '0.0.0.0.0.0.0.0.1' }], at: 12 }, on_selection: true, spent: false, remake: null }] },
    read_with: { '1.0.1.0.9': true }, count: { l: 1, n: 1, r: 0, e: 0, claim: true, read_with: ['1.0.1.0.9'], supersede: [] },
    price: { lists: [3, 1, 1, 0, 1], body: 512, values: 7, reads: 4, bytes: 64, over: [{ term: 'links', by: 2 }] },
    windows: [{ run: 2, origin: '1.0.1.0.1014', owner: '1.0.1', i_start: 40, width: 12, counterpart: { run: 2, draft: '1.0.1.0.1014', record: '1.0.1.0.1014.0.2.1', from: { chain: '1.0.1.0.1014.0.1', first: 40, width: 12 }, to: { chain: '1.0.1.0.7.0.1', first: 1, width: 12 } } }],
    inherited: [], standing: 'behind', left_behind: ['1.0.1.0.1014'], hold: { since: 1786838400052 },
  },
  acknowledged: { outcome: 'acknowledged', member: '1.0.1.0.1013.1', edition: null, claim: false, supersede: [], at: 12, via: 'answer' },
  restated: { outcome: 'restated', left: ['1.0.1.0.1013.0.2.1'], superseded: [], came: [], removals_undone: [], removals_came: [], selection: [{ run: 1, placement: { whole: { ordinal: 4 } } }, { run: 2, placement: { split: [[1, 2, 3]] } }, { run: 3, placement: 'absent' }], race: { at: 44, key: 'bare', signed: false }, standing: 'superseded_first' },
  refused: { outcome: 'refused', arm: 'over_cap', over: [{ term: 'links', by: 2 }] },
};

test('a burst\'s `ack` decodes from the wire\'s example — the commit\'s position and, on a set_arrangement past the head it named, the head-moved tell — and `ack_addr` the address minted or found; any other answer is null (A-62, A-63)', () => {
  assert.deepEqual(F.decodeAck(JSON.parse(WIRE.ack)), { at: 7, headMoved: null });
  assert.deepEqual(F.decodeAck(JSON.parse(WIRE.ack_head_moved)), { at: 14, headMoved: '1.0.1.0.1.3' }, 'the trunk\'s current head where it moved past the head named');
  assert.deepEqual(F.decodeAckAddr(JSON.parse(WIRE.ack_addr)), { addr: '1.0.1.0.1.0.1.1', at: 7 });
  for (const bad of [null, 'ack', {}, { resp: 'ack' }, { resp: 'ack', at: '7' }, { resp: 'ack', at: 7, head_moved: 3 }, JSON.parse(WIRE.ack_addr), JSON.parse(WIRE.orphans)]) assert.equal(F.decodeAck(bad), null, JSON.stringify(bad));
  for (const bad of [null, {}, { resp: 'ack_addr', at: 7 }, { resp: 'ack_addr', addr: 7, at: 7 }, { resp: 'ack_addr', addr: '1.0.1.0.1', at: null }, JSON.parse(WIRE.ack)]) assert.equal(F.decodeAckAddr(bad), null, JSON.stringify(bad));
});

test('the `held` answer decodes as the declarations give it — the ordinal, the hold\'s cause, and the device\'s refusal with its class where one stands, each null where absent; a class outside the three, a missing cause or any other answer is null', () => {
  assert.deepEqual(F.decodeHeld(SHAPES.held), { held: 3, cause: 'unreachable', unwritable: null, unwritableClass: null });
  assert.deepEqual(F.decodeHeld(SHAPES.held_unwritable), { held: 4, cause: 'unreachable', unwritable: 'No space left on device (os error 28)', unwritableClass: 'full' });
  assert.equal(F.decodeHeld({ ...SHAPES.held, unwritable_class: 'read_only' })?.unwritableClass, 'read_only');
  for (const bad of [null, {}, { resp: 'held', held: 3 }, { resp: 'held', cause: 'unreachable' }, { resp: 'held', held: '3', cause: 'unreachable' }, { ...SHAPES.held_unwritable, unwritable_class: 'disk' }, { ...SHAPES.held, unwritable: 4 }, JSON.parse(WIRE.ack)]) assert.equal(F.decodeHeld(bad), null, JSON.stringify(bad));
});

test('`held(session)`\'s rows decode in their order — each line\'s frame as composed, its anchors and the refusal that stands on it narrowed, each null where the row carries none; an empty list is no line, and a list that is no list, or a row lacking a declared member, is null', () => {
  const rows = F.decodeHeldRows([SHAPES.row_holding, SHAPES.row_refused, SHAPES.row_moved, SHAPES.row_lost]);
  assert.ok(rows && rows.length === 4);
  assert.deepEqual(rows[0], { held: 1, doc: '1.0.1.0.1013', base: 40, frame: SHAPES.row_holding.frame, anchors: { before: '1.0.1.0.1013.0.1.11', after: '1.0.1.0.1013.0.1.12', span: null }, cause: 'unreachable', sent: false, time: 1786838400052, refusal: null }, 'a line held while the board is away: its anchors without a span, no refusal');
  assert.deepEqual([rows[1].cause, rows[1].sent, rows[1].anchors?.span, rows[1].refusal], ['out_of_bounds', true, [{ start: '1.0.1.0.1013.0.1.3', width: '2' }], SHAPES.row_refused.refusal], 'a refused run: the delete\'s span, the board\'s verdict as the shell hands it up');
  assert.deepEqual([rows[2].cause, rows[2].anchors, /** @type {{site?: {as_of?: number, current?: number}}} */ (rows[2].refusal)?.site], ['moved', null, { as_of: 41, current: 44 }], 'a line held moved: no anchors, the two states on the board\'s refusal');
  assert.deepEqual([rows[3].cause, rows[3].anchors, rows[3].refusal], ['answers_lost', { before: null, after: null, span: null }, SHAPES.row_lost.refusal], 'the hand-over: anchors at the document\'s edges, the shell\'s refusal with its last failure and the time elapsed');
  assert.deepEqual(F.decodeHeldRows([]), [], 'nothing held');
  for (const bad of [null, {}, 'held', [null], [{ ...SHAPES.row_holding, frame: 'insert' }], [{ ...SHAPES.row_holding, frame: {} }], [{ ...SHAPES.row_holding, held: '1' }], [{ ...SHAPES.row_holding, sent: 'yes' }], [{ ...SHAPES.row_holding, refusal: 'out_of_bounds' }], [{ ...SHAPES.row_holding, refusal: { name: 'x' } }], [{ ...SHAPES.row_holding, anchors: { before: 3 } }], [SHAPES.row_holding, { held: 2 }]]) {
    assert.equal(F.decodeHeldRows(bad), null, JSON.stringify(bad));
  }
});

test('the `held` event decodes as the declarations give it — the document\'s state among the five, its cause and the hands that moved it, each hand\'s key among the four with its fingerprint and label where it carries them; a state or a hand\'s key outside its set, or a missing member, is null', () => {
  assert.deepEqual(F.decodeHeldEvent(SHAPES.event_holding), { board: 'b-1', session: 's-1', doc: '1.0.1.0.1013', held: 1, state: 'holding', cause: 'unreachable', hands: [] });
  assert.deepEqual(F.decodeHeldEvent(SHAPES.event_moved)?.hands, [{ key: 'own', fingerprint: 'fp-1', label: 'laptop' }, { key: 'other', fingerprint: 'fp-2', label: null }, { key: 'bare', fingerprint: null, label: null }, { key: 'lost', fingerprint: null, label: null }], 'each hand once, the four forms');
  assert.deepEqual(F.decodeHeldEvent(SHAPES.event_kept), { board: 'b-1', session: 's-1', doc: '1.0.1.0.1013', held: 0, state: 'kept', cause: null, hands: [] }, 'kept: no cause, no hands');
  for (const bad of [null, {}, { ...SHAPES.event_holding, state: 'late' }, { ...SHAPES.event_holding, held: '1' }, { ...SHAPES.event_moved, hands: [{ key: 'agent' }] }, { ...SHAPES.event_moved, hands: [{ fingerprint: 'fp-1' }] }, { ...SHAPES.event_moved, hands: 'own' }, { ...SHAPES.event_holding, doc: null }]) {
    assert.equal(F.decodeHeldEvent(bad), null, JSON.stringify(bad));
  }
});

test('`history.restore`\'s `Restored` decodes — the state restored, the write\'s commit, the way back and the marker the restore never takes out, read as `doc_metadata`\'s marker is — and `held.show`\'s `{shown}`; a malformed form of either is null', () => {
  assert.deepEqual(F.decodeRestored(SHAPES.restored), { draft: '1.0.1.0.1013', at: 9, position: 17, asOf: 16, marker: null });
  assert.deepEqual(F.decodeRestored(SHAPES.restored_marked)?.marker, { sides: ['1.0.1.0.1.1.1'], head: '1.0.1.0.1.2', headCopied: 6, at: 14 }, 'the marker as it stands');
  for (const bad of [null, {}, { ...SHAPES.restored, as_of: undefined }, { ...SHAPES.restored, at: '9' }, { ...SHAPES.restored, draft: 1013 }]) assert.equal(F.decodeRestored(bad), null, JSON.stringify(bad));
  assert.equal(F.decodeShown({ shown: true }), true);
  assert.equal(F.decodeShown({ shown: false }), false);
  for (const bad of [null, {}, { shown: 'yes' }, { shown: 1 }, true]) assert.equal(F.decodeShown(bad), null, JSON.stringify(bad));
});

test('`merge.undo`\'s `Undone` and `merge.withdraw`\'s `Withdrawn` decode — the draft, the commit, the record where one stood and the base restored where the draft records one, each null where absent; a malformed form is null', () => {
  assert.deepEqual(F.decodeUndone(SHAPES.undone), { draft: '1.0.1.0.1013', position: 17, record: null, restored: { base: '1.0.1.0.1.1', extent: 5 } });
  assert.deepEqual(F.decodeUndone(SHAPES.undone_bare), { draft: '1.0.1.0.1013', position: 18, record: '1.0.1.0.1.0.2.9', restored: null });
  for (const bad of [null, {}, { ...SHAPES.undone, restored: { base: '1.0.1.0.1.1' } }, { ...SHAPES.undone, position: '17' }, { ...SHAPES.undone, record: 9 }]) assert.equal(F.decodeUndone(bad), null, JSON.stringify(bad));
  assert.deepEqual(F.decodeWithdrawn(SHAPES.withdrawn), { draft: '1.0.1.0.1013', position: 18, record: null });
  assert.deepEqual(F.decodeWithdrawn({ ...SHAPES.withdrawn, record: '1.0.1.0.1.0.2.9' })?.record, '1.0.1.0.1.0.2.9');
  for (const bad of [null, {}, { draft: '1.0.1.0.1013' }, { ...SHAPES.withdrawn, draft: null }]) assert.equal(F.decodeWithdrawn(bad), null, JSON.stringify(bad));
});

test('`merge.compose`\'s report decodes with its sides, runs and gaps typed — the landing\'s members and the re-open\'s gaps at their defaults, each optional member null where absent — and a gap\'s kind, a run\'s family or a placement outside its set is null', () => {
  const r = F.decodeMergeReport(SHAPES.report);
  assert.deepEqual([r?.outcome, r?.doc, r?.head, r?.base, r?.side, r?.form, r?.into, r?.position, r?.fresh, r?.headMoved, r?.recordLink, r?.unrecorded, r?.member, r?.claims, r?.counts, r?.cap, r?.overCap, r?.asOf],
    ['landed', '1.0.1.0.1', '1.0.1.0.1.2', '1.0.1.0.1.1', '1.0.1.0.1.1.1', 'daughter', '1.0.1.0.1013', 14, false, null, null, null, null, [], { a: 1, b: 1, m: 2 }, 4096, false, 15]);
  assert.deepEqual(r?.sides, [{ at: '1.0.1.0.1.2', role: 'head', position: null }, { at: '1.0.1.0.1.1.1', role: 'alternative', position: null }]);
  assert.deepEqual(r?.runs, [{ origin: '1.0.1.0.1', iStart: 1, width: 5, side: null, family: 'own' }, { origin: '1.0.1.0.1.1.1', iStart: 6, width: 3, side: 1, family: 'draft_native' }]);
  const re = F.decodeMergeReport(SHAPES.report_reopened);
  assert.deepEqual([re?.outcome, re?.fresh, re?.record], ['reopened', false, { sides: [] }]);
  assert.deepEqual(re?.gaps, [
    { id: 1, kind: 'order', after: '1.0.1.0.1.0.1.4', before: null, runs: [{ side: 0, iStart: '1.0.1.0.1.0.1.5', width: 2 }, { side: 1, iStart: '1.0.1.0.1.1.1.0.1.1', width: 3 }], placed: [0, 1], settled: false, resolvedBy: null },
    { id: 2, kind: 'anchor', after: null, before: '1.0.1.0.1.0.1.9', runs: [], placed: 'before', settled: true, resolvedBy: 'rule' },
  ], 'the unsettled gap at its default order, the anchor gap the rules settled');
  const gap = (/** @type {object} */ g) => F.decodeMergeReport({ ...SHAPES.report_reopened, gaps: [{ ...SHAPES.report_reopened.gaps[0], ...g }] });
  for (const bad of [{ kind: 'swap' }, { placed: 'elsewhere' }, { placed: ['0'] }, { settled: 'no' }, { id: '1' }]) assert.equal(gap(bad), null, JSON.stringify(bad));
  for (const bad of [null, {}, { ...SHAPES.report, outcome: 'done' }, { ...SHAPES.report, form: 'fork' }, { ...SHAPES.report, runs: [{ ...SHAPES.report.runs[0], family: 'copy' }] }, { ...SHAPES.report, sides: [{ at: '1.0.1.0.1.2', role: 'base', position: null }] }, { ...SHAPES.report, counts: { a: 1 } }]) assert.equal(F.decodeMergeReport(bad), null, JSON.stringify(bad));
});

test('`merge.land`\'s landing decodes — the member, its commit, how it was acknowledged, the claim, the record and the retries — and `decodeLanding` reads whichever of its three outcomes the answer is; a landing lacking a member, or acknowledged a way the declarations do not name, is null', () => {
  assert.deepEqual(F.decodeMergeLanded(SHAPES.landed), { outcome: 'landed', member: '1.0.1.0.1.3', at: 16, via: 'answer', claim: true, supersede: ['1.0.1.0.1.1.1'], daughter: false, record: null, unrecorded: null, claims: [], retries: 0 });
  const unrecorded = { kind: 'shell', name: 'write_busy' };
  assert.deepEqual(F.decodeMergeLanded({ ...SHAPES.landed, record: null, unrecorded })?.unrecorded, unrecorded, 'why the record could not be written');
  for (const bad of [null, {}, SHAPES.restated, SHAPES.refused, { ...SHAPES.landed, via: 'guess' }, { ...SHAPES.landed, member: undefined }, { ...SHAPES.landed, retries: '0' }]) assert.equal(F.decodeMergeLanded(bad), null, JSON.stringify(bad));
  assert.equal(F.decodeLanding(SHAPES.landed)?.outcome, 'landed');
  assert.equal(F.decodeLanding(SHAPES.restated)?.outcome, 'restated');
  assert.equal(F.decodeLanding(SHAPES.refused)?.outcome, 'refused');
  assert.equal(F.decodeLanding({ outcome: 'cancelled' }), null);
});

test('`publication.open`\'s panel decodes with its rows, formatting, windows and standing typed — the default panel\'s empty lists, the full panel\'s every member — and `publication.count`\'s `{count, price}`; a row\'s kind, a price\'s term or a standing outside its set is null', () => {
  const p = F.decodePublicationPanel(SHAPES.panel);
  assert.deepEqual(p, { rows: [], formatting: { marks: [], cut: 0, removals: [] }, readWith: {}, count: { l: 0, n: 0, r: 0, e: 0, claim: false, readWith: [], supersede: [] }, price: { lists: [0, 0, 0, 0, 0], body: 0, values: 0, reads: 0, bytes: 0, over: [] }, windows: [], inherited: [{ draft: '1.0.1.0.1014', passages: 1 }], standing: null, leftBehind: [], hold: null }, 'the mint form: no standing, nothing left behind, no hold');
  const f = F.decodePublicationPanel(SHAPES.panel_full);
  assert.deepEqual(f?.rows, [
    { home: '1.0.1.0.1013', kind: 'own', label: 'Tumbler.', links: ['1.0.1.0.1013.0.2.1'], types: [{ ty: '1.1.0.1.0.1.0.3.13', n: 1, far: ['1.0.1.0.127'] }], line: { p: 0, d: 0, c: 1, t: 0, u: 0 }, readThrough: 0 },
    { home: '1.0.1.0.9', kind: { public: { read_with: true } }, label: 'Notes', links: [], types: [], line: { p: 1, d: 0, c: 0, t: 0, u: 0 }, readThrough: 2 },
  ]);
  assert.deepEqual(f?.formatting, { marks: ['1.0.1.0.1013.0.2.2'], cut: 1, removals: [{ record: '1.0.1.0.1013.0.2.3', mark: '1.0.1.0.1.0.2.4', markValue: { from: [], to: [{ start: '1.0.1.0.1.0.1.1', width: '0.0.0.0.0.0.0.5' }], ty: [{ start: '1.1.0.1.0.1.0.3.23', width: '0.0.0.0.0.0.0.0.1' }], at: 12 }, onSelection: true, spent: false, remake: null }] });
  assert.deepEqual([f?.readWith, f?.count, f?.price], [{ '1.0.1.0.9': true }, { l: 1, n: 1, r: 0, e: 0, claim: true, readWith: ['1.0.1.0.9'], supersede: [] }, { lists: [3, 1, 1, 0, 1], body: 512, values: 7, reads: 4, bytes: 64, over: [{ term: 'links', by: 2 }] }]);
  assert.deepEqual(f?.windows, [{ run: 2, origin: '1.0.1.0.1014', owner: '1.0.1', iStart: 40, width: 12, counterpart: { run: 2, draft: '1.0.1.0.1014', record: '1.0.1.0.1014.0.2.1', from: { chain: '1.0.1.0.1014.0.1', first: 40, width: 12 }, to: { chain: '1.0.1.0.7.0.1', first: 1, width: 12 } } }]);
  assert.deepEqual([f?.inherited, f?.standing, f?.leftBehind, f?.hold], [[], 'behind', ['1.0.1.0.1014'], { since: 1786838400052 }]);
  assert.deepEqual(F.decodeCount({ count: SHAPES.panel.count, price: SHAPES.panel.price }), { count: p?.count, price: p?.price });
  for (const bad of [null, {}, { count: SHAPES.panel.count }, { count: SHAPES.panel.count, price: { ...SHAPES.panel.price, over: [{ term: 'marks', by: 1 }] } }, { count: { ...SHAPES.panel.count, l: '0' }, price: SHAPES.panel.price }]) assert.equal(F.decodeCount(bad), null, JSON.stringify(bad));
  for (const bad of [null, {}, { ...SHAPES.panel_full, standing: 'ahead' }, { ...SHAPES.panel_full, rows: [{ ...SHAPES.panel_full.rows[0], kind: 'shared' }] }, { ...SHAPES.panel_full, rows: [{ ...SHAPES.panel_full.rows[1], kind: { public: {} } }] }, { ...SHAPES.panel_full, hold: { since: 'then' } }, { ...SHAPES.panel_full, read_with: { '1.0.1.0.9': 'yes' } }, { ...SHAPES.panel, formatting: {} }]) {
    assert.equal(F.decodePublicationPanel(bad), null, JSON.stringify(bad).slice(0, 120));
  }
});

test('`publication.confirm`\'s three outcomes decode — the acknowledgment\'s member and how it was reached, the re-statement\'s moved lists, placements and race, the refusal\'s arm with the arm\'s own members beside it — and `decodeConfirmed` reads whichever the answer is; an outcome outside the three, or a member not as declared, is null', () => {
  assert.deepEqual(F.decodeAcknowledged(SHAPES.acknowledged), { outcome: 'acknowledged', member: '1.0.1.0.1013.1', edition: null, claim: false, supersede: [], at: 12, via: 'answer' });
  assert.deepEqual(F.decodeAcknowledged({ ...SHAPES.acknowledged, edition: '1.0.1.0.7', via: 'twin' })?.edition, '1.0.1.0.7', 'the mint form\'s edition');
  for (const bad of [null, {}, SHAPES.restated, { ...SHAPES.acknowledged, via: 'memo' }, { ...SHAPES.acknowledged, at: '12' }]) assert.equal(F.decodeAcknowledged(bad), null, JSON.stringify(bad));
  assert.deepEqual(F.decodeRestated(SHAPES.restated), { outcome: 'restated', left: ['1.0.1.0.1013.0.2.1'], superseded: [], came: [], removalsUndone: [], removalsCame: [], selection: [{ run: 1, placement: { whole: { ordinal: 4 } } }, { run: 2, placement: { split: [[1, 2, 3]] } }, { run: 3, placement: 'absent' }], race: { at: 44, key: 'bare', signed: false }, standing: 'superseded_first' });
  assert.deepEqual([F.decodeRestated({ ...SHAPES.restated, race: undefined, standing: undefined })?.race, F.decodeRestated({ ...SHAPES.restated, race: undefined, standing: undefined })?.standing], [null, null], 'no race, the standing unmoved');
  for (const bad of [null, {}, SHAPES.acknowledged, { ...SHAPES.restated, selection: [{ run: 1, placement: 'gone' }] }, { ...SHAPES.restated, selection: [{ run: 1, placement: { split: [[1, 2]] } }] }, { ...SHAPES.restated, race: { at: 44 } }, { ...SHAPES.restated, left: '1.0.1.0.1013.0.2.1' }]) assert.equal(F.decodeRestated(bad), null, JSON.stringify(bad));
  assert.deepEqual(F.decodePublicationRefused(SHAPES.refused), { outcome: 'refused', arm: 'over_cap', data: { over: [{ term: 'links', by: 2 }] } });
  assert.deepEqual(F.decodePublicationRefused({ outcome: 'refused', arm: 'twin', member: '1.0.1.0.1.2', missing: { copy: 1 } })?.data, { member: '1.0.1.0.1.2', missing: { copy: 1 } }, 'the arm\'s own members, as the arm carries them');
  for (const bad of [null, {}, SHAPES.landed, { outcome: 'refused' }, { outcome: 'refused', arm: 4 }]) assert.equal(F.decodePublicationRefused(bad), null, JSON.stringify(bad));
  assert.equal(F.decodeConfirmed(SHAPES.acknowledged)?.outcome, 'acknowledged');
  assert.equal(F.decodeConfirmed(SHAPES.restated)?.outcome, 'restated');
  assert.equal(F.decodeConfirmed(SHAPES.refused)?.outcome, 'refused');
  assert.equal(F.decodeConfirmed(SHAPES.landed), null, 'a landing is no confirm outcome');
  assert.equal(F.decodeConfirmed(null), null);
});

test('the lineage\'s claims decode as the wire gives them; any other answer is null, never no claim', () => {
  assert.deepEqual(F.decodeClaims({ as_of: 9, claims: [{ active: true, claim: '1.0.1.0.1.0.2.3', home: '1.0.1.0.1', new: '1.0.1.0.1.0.2.2', old: '1.0.1.0.1.0.2.1' }], resp: 'claims' }),
    [{ claim: '1.0.1.0.1.0.2.3', home: '1.0.1.0.1', old: '1.0.1.0.1.0.2.1', new: '1.0.1.0.1.0.2.2', active: true }]);
  assert.equal(F.decodeClaims({ as_of: 9, claims: [{ active: false, claim: '1.0.1.0.1.0.2.3', home: '1.0.1.0.1', new: '1.0.1.0.1.0.2.2', old: '1.0.1.0.1.0.2.1' }], resp: 'claims' })?.[0].active, false, 'the audit view\'s retracted claim');
  assert.deepEqual(F.decodeClaims({ as_of: 9, claims: [], resp: 'claims' }), []);
  assert.equal(F.decodeClaims({ addrs: [], as_of: 9, resp: 'addrs' }), null);
  assert.equal(F.decodeClaims(null), null);
});
