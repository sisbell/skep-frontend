// M-FRAMES's test: every composer spells its frame as `docs/wire.md`'s
// request examples spell it (FP-16), the edition-claim and enrollment
// lookups and the edition-class links homed in a document take
// `find_links_ftt`'s two-slot shape and never the audit view's
// `edition_claims`, no write composer exists, every decoder reads the wire's
// example answers, the age a link value and `doc_metadata` carry among them,
// and a delivery keeps an item of a kind it does not know at its own place.
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
  op_at: '{"at":9,"frame":{"op":"retrieve_v","specs":[{"doc":"1.0.1.0.1","span":{"start":"1.1","width":"0.5"}}]}}',
};

// the wire's own example answers, byte-exact as docs/wire.md carries them (§The response envelope)
const WIRE = {
  link_value: '{"as_of":9,"at":7,"link":{"slots":[[{"start":"1.0.1.0.1.0.1.1","width":"0.0.0.0.0.0.0.5"}],[{"start":"1.0.1.0.2.0.1.1","width":"0.0.0.0.0.0.0.6"}],[{"start":"1.0.1.0.3.0.1.1","width":"0.0.0.0.0.0.0.1"}]]},"resp":"link_value","time":1786838400047,"time_from":"feed"}',
  link_value_null: '{"as_of":9,"at":null,"link":null,"resp":"link_value","time":null,"time_from":null}',
  doc_metadata: '{"as_of":9,"at":7,"base_extent":"3","birth":"1.0.1.0.1.1","birth_extent":"5","doc":"1.0.1.0.1","owner":"1.0.1","placed":"5","published":true,"resp":"doc_metadata","source":null,"time":1786838400047,"time_from":"feed"}',
  doc_metadata_unborn: '{"as_of":9,"at":8,"base_extent":null,"birth":null,"birth_extent":null,"doc":"1.0.1.0.2","owner":"1.0.1","placed":null,"published":false,"resp":"doc_metadata","source":null,"time":1786838400052,"time_from":"anchor"}',
  doc_metadata_fork: '{"as_of":9,"at":null,"base_extent":null,"birth":null,"birth_extent":null,"doc":"1.0.2.0.1","owner":"1.0.2","placed":null,"published":false,"resp":"doc_metadata","source":"1.0.1.0.1.1","time":null,"time_from":null}',
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

test('the lineage\'s claims decode as the wire gives them; any other answer is null, never no claim', () => {
  assert.deepEqual(F.decodeClaims({ as_of: 9, claims: [{ active: true, claim: '1.0.1.0.1.0.2.3', home: '1.0.1.0.1', new: '1.0.1.0.1.0.2.2', old: '1.0.1.0.1.0.2.1' }], resp: 'claims' }),
    [{ claim: '1.0.1.0.1.0.2.3', home: '1.0.1.0.1', old: '1.0.1.0.1.0.2.1', new: '1.0.1.0.1.0.2.2', active: true }]);
  assert.equal(F.decodeClaims({ as_of: 9, claims: [{ active: false, claim: '1.0.1.0.1.0.2.3', home: '1.0.1.0.1', new: '1.0.1.0.1.0.2.2', old: '1.0.1.0.1.0.2.1' }], resp: 'claims' })?.[0].active, false, 'the audit view\'s retracted claim');
  assert.deepEqual(F.decodeClaims({ as_of: 9, claims: [], resp: 'claims' }), []);
  assert.equal(F.decodeClaims({ addrs: [], as_of: 9, resp: 'addrs' }), null);
  assert.equal(F.decodeClaims(null), null);
});
