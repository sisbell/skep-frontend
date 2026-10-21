// M-FRAMES's test: every composer spells its frame as `docs/wire.md`'s
// `<!-- wire: request … -->` examples at the pin spell it (FP-16's residue:
// the frames are the wire document's); no write composer exists; every
// decoder reads the wire's example answers.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as F from './frames.js';
import { canon } from '../test/fake-port.js';

// the wire's own examples, byte-exact as docs/wire.md carries them (keys sorted)
const EXAMPLES = {
  retrieve_v: '{"op":"retrieve_v","specs":[{"doc":"1.0.1.0.1","span":{"start":"1.1","width":"0.11"}}]}',
  retrieve_doc_v_span_set: '{"doc":"1.0.1.0.1","op":"retrieve_doc_v_span_set"}',
  doc_metadata: '{"doc":"1.0.1.0.1","op":"doc_metadata"}',
  find_links_v: '{"d":"1.0.1.0.1","op":"find_links_v","region":[{"start":"1.1","width":"0.5"}]}',
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

test('the read composers spell the wire examples exactly', () => {
  assert.equal(canon(F.retrieveV('1.0.1.0.1', 1, 11)), EXAMPLES.retrieve_v);
  assert.equal(canon(F.retrieveDocVSpanSet('1.0.1.0.1')), EXAMPLES.retrieve_doc_v_span_set);
  assert.equal(canon(F.docMetadata('1.0.1.0.1')), EXAMPLES.doc_metadata);
  assert.equal(canon(F.findLinksV('1.0.1.0.1', 1, 5)), EXAMPLES.find_links_v);
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
  assert.deepEqual(F.decodeEffectiveOwner({ as_of: 9, prefix: '1.0.1', principal: 900, resp: 'effective_owner' }), { prefix: '1.0.1', principal: 900 });
  assert.equal(F.decodeMaybeAddr({ addr: null, as_of: 9, resp: 'maybe_addr' }), null);
  const rej = F.rejected({ code: 'unauthenticated', disposition: 'permanent', op: 'insert', resp: 'rejected' });
  assert.ok(rej); assert.equal(rej.code, 'unauthenticated');
  assert.equal(F.rejected({ resp: 'delivery' }), null);
});

test('the lineage\'s claims decode as the wire gives them; any other answer is null, never no claim', () => {
  assert.deepEqual(F.decodeClaims({ as_of: 9, claims: [{ active: true, claim: '1.0.1.0.1.0.2.3', home: '1.0.1.0.1', new: '1.0.1.0.1.0.2.2', old: '1.0.1.0.1.0.2.1' }], resp: 'claims' }),
    [{ claim: '1.0.1.0.1.0.2.3', home: '1.0.1.0.1', old: '1.0.1.0.1.0.2.1', new: '1.0.1.0.1.0.2.2', active: true }]);
  assert.equal(F.decodeClaims({ as_of: 9, claims: [{ active: false, claim: '1.0.1.0.1.0.2.3', home: '1.0.1.0.1', new: '1.0.1.0.1.0.2.2', old: '1.0.1.0.1.0.2.1' }], resp: 'claims' })?.[0].active, false, 'the audit view\'s retracted claim');
  assert.deepEqual(F.decodeClaims({ as_of: 9, claims: [], resp: 'claims' }), []);
  assert.equal(F.decodeClaims({ addrs: [], as_of: 9, resp: 'addrs' }), null);
  assert.equal(F.decodeClaims(null), null);
});
