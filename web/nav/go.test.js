// N-GO's test against the fake port: what each navigation act — a LEAP, a
// follow, a version move, HOME, WHOLE BOARD, an account's region, a moment's
// view, Back, Forward and a trail jump — marks, lights, says and pushes, and
// where its camera, its walk, its focus ring and its faces go, at any board
// speed and in whatever order the reads answer: the arrival's two marks and
// their life, the four states and the runs' labels, the step and its light,
// the order of acts, the jump in the air and the keys it holds, its flight
// landing on its passage where its document is set again or folded again in
// the air, a jump reaching, failures known at the act and learned in the air,
// every return to a failed jump's entry asking its read again — after a
// change of the page's class too — with the camera and the walk where the
// reader left them, a follow's dead reference faced by every route in the
// words its far end's label names it by, a follow to a
// withheld document, the chrome a landing leaves standing and a field that
// keeps its caret, cards opened while an act reads, a face a read brings
// standing below a card the reader opened, Enter at a withheld run and a
// tail pressed, the slots' chords at a link's stop of the walk — a follow and
// a reading scene made from that link, the reason given where no span is in
// focus — the box's version — a return restoring the versions its
// entry kept, the member a newer version's arrival found a bare address's
// text was among them, by the position its row names, an arrival standing
// there read in that member, and the version a
// landing's "read side by side" opens — the mark a newer version's arrival
// leaves on the box it pins: its corner offering the newest member, said once,
// raised by a later arrival, taken by → and Enter, ended by a move elsewhere,
// marked again by a return as the reader left it and never on a version the
// reader chose — a change of the page's class, where no
// board is held, the passage Back lands on — a return finding the words its
// entry's view read in the text it reaches, and the arrival it keeps read
// again there, one whose bytes were never named kept only on the text it was
// outlined on, landing in the landing rule's states — where a return puts the
// walk back, on the board, an account, a mark's stop or a span kept past its
// document's last line as the reader left it, only where the view it lands at
// shows it, else on the element under that view's centre, on what stands of
// the element it stood on, in the none state where none of it stands, and a
// landing out of view said in the status region — the surfaces a place keeps —
// the selection, a card, a list, a card a slot's act opened at the walk's
// span holding that span with nothing selected — ended as the reader leaves
// and reopened as left on a return, their subjects placed again by their
// bytes, and a text
// set again under the reader — an arrival placed again by its runs' bytes
// and read again by the landing rule, its runs labelled and its landing kept
// at the run it stood at, and the passage being read gone from it — and the
// surfaces standing
// through a version move or a newer version's arrival, the selection, a card
// and a list re-checked against the version their box shows then, and a
// draft holding typed words — the walk, the trail and a landing in the
// model's text, the layout asked in the text shown (FP-8,
// FP-20, FP-21, FP-22, FP-25, FP-29, FP-35, FP-36). The overlay host stands on stand-in elements — the
// overlay's and the notice's below it — the platform's document a stand-in
// beside them, so a face a landing shows is read back from what the host
// wrote. In a draft holding typed words every landing, return, card and
// carry follows the text shown and holds its place by its bytes; a return
// names the person's own removal and offers the put-back; and an arrival
// ends at the first edit of its bytes.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as LK from '../links/links.js';
import * as LAYER from '../text/layer.js';
import * as HOST from '../overlays/host.js';
import * as FACES from '../overlays/faces.js';
import * as PROV from '../overlays/provenance.js';
import * as VERSIONS from '../overlays/versions.js';
import * as ANATOMY from '../overlays/anatomy-card.js';
import * as LINKS from '../overlays/links-card.js';
import * as SEL from '../overlays/selection.js';
import * as LANDING from '../overlays/landing.js';
import * as TRAILLIST from '../overlays/trail-list.js';
import * as INPUT from '../app/input.js';
import { docBox, depthOfDoc, DEPTH_SOUND, accountCell, boardCell, continuationCell } from '../plane/projection.js';
import { LOD_TXT_LO, markScale } from '../plane/lod.js';
import { standardFs, placeOf, EDGE } from '../plane/layout.js';
import { CORNER, cornerWidth } from '../plane/register.js';
import { entitlementArm } from '../text/article.js';
import { isElement } from '../text/span.js';
import { STRINGS, t, tHTML, addressedHTML } from '../strings.js';
import { esc } from '../util.js';
import * as TRAIL from './trail.js';
import * as WALK from './walk.js';
import * as KEYS from './keys.js';
import * as LEAP from './leap.js';
import * as GO from './go.js';
import * as FOCUS from './focus.js';

const D = '1.0.1.0.3', FAR = '1.0.1.0.127', CITE = '1.1.0.1.0.1.0.3.13';
const NEAR_TEXT = 'Tumbler.\n\nThe first field.', FAR_TEXT = 'The far edition.\n\nIts cited passage stands here.';
// C: a document whose text the page does not hold until a LEAP reads it whole; GONE: an address the board answers for with nothing
const C = '1.0.1.0.5', GONE = '1.0.1.0.9';
const C_TEXT = 'A third edition, longer than the first two.\n\nIts text is read whole on the LEAP\'s ask, and its face fitted to it.\n\nA last paragraph.';
// DEEP: the account's 145th document, in its third continuation, a grid deeper than FAR, the deepest the index lists; RES: a member of
// the residue past the sound depth, its two thousand one-line paragraphs filling its room's columns three steps past, setting it far
// smaller than its place's standard
const DEEP = '1.0.1.0.145', RES = `1.0.1.0.${48 * (DEPTH_SOUND + 1) + 1}`;
const DEEP_TEXT = 'A note minted after the page booted.', RES_TEXT = Array.from({ length: 2000 }, (_, i) => `Item ${i + 1}.`).join('\n\n');
// LONG: an edition longer than a column — a hundred and twenty paragraphs of a line each, folded into its room's columns
const LONG = '1.0.1.0.40', LONG_TEXT = Array.from({ length: 120 }, (_, i) => `Paragraph ${i + 1} of an edition longer than one column.`).join('\n\n');
/** the account's 49th document, its first continuation's first: its room a seventh of a depth-0 document's across, its type with it */
const CONT = '1.0.1.0.49', CONT_TEXT = 'A continuation note.\n\nIts second paragraph.';
const NEAR_EXTENT = NEAR_TEXT.length, FAR_EXTENT = FAR_TEXT.length;
const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: '1.0.1', whole: false, subspace: 1, ordinal: ord, positions: w });
const whole = (/** @type {string} */ doc) => ({ start: doc, width: '0.0.0.0.1', doc, account: '1.0.1', whole: true, subspace: null, ordinal: null, positions: null });
/** the age of a link the board keeps no reading of (M-FRAMES's `Age`): what the anatomy card says of the links it is opened on here */
const UNDATED = { at: null, time: null, from: null };
// the person's citations from the first edition: one of a passage of FAR, one of FAR whole
const PASSAGE = D + '.0.2.1', WHOLE = D + '.0.2.2';
// a citation from the first edition whose far end names GONE: a dead reference
const DEAD = D + '.0.2.3';
/** the dead reference taken into the model, drawn at the first edition */
const takeDead = () => { REC.takeLinks(D, [DEAD]); REC.takeLink({ addr: DEAD, from: [span(D, 23, 3)], to: [span(GONE, 1, 3)], type: CITE, age: UNDATED }); };
// a second dead reference from the first edition, into GONE: one no test follows before the page knows GONE says nothing
const UNFOLLOWED = D + '.0.2.15';
/** the second dead reference taken into the model, drawn at the first edition */
const takeUnfollowed = () => { REC.takeLinks(D, [UNFOLLOWED]); REC.takeLink({ addr: UNFOLLOWED, from: [span(D, 9, 2)], to: [span(GONE, 4, 2)], type: CITE }); };
// a citation from the first edition of a passage of FAR that a later edit to FAR cut in two: its far end projects to FAR's 3, four
// positions, and FAR's 20, five
const SPLIT = D + '.0.2.4';
/** the cut citation taken into the model, drawn at the first edition */
const takeSplit = () => { REC.takeLinks(D, [SPLIT]); REC.takeLink({ addr: SPLIT, from: [span(D, 1, 3)], to: [span(FAR, 3, 22)], type: CITE }); };
// a citation from the first edition of a passage FAR's current text does not hold — a floating end: its far end, stored at FAR's 8,
// projects to nothing there
const FLOAT = D + '.0.2.5';
/** the floating citation taken into the model, drawn at the first edition */
const takeFloat = () => { REC.takeLinks(D, [FLOAT]); REC.takeLink({ addr: FLOAT, from: [span(D, 4, 3)], to: [span(FAR, 8, 4)], type: CITE, age: UNDATED }); };
// a citation from the first edition of a passage of PRIVATE, a draft in 1.0.2's sub-account 1.0.2.1 the board withholds from the reader:
// every read naming PRIVATE refused `withheld`, its span set and the citation's projection into it among them
const PRIVATE = '1.0.2.1.0.2', PRIVATE_OWNER = '1.0.2', LOCKED = D + '.0.2.6';
/** the withheld citation taken into the model, drawn at the first edition; the sub-account's owner the seat above it */
const takeLocked = () => {
  REC.takeOwner('1.0.2.1', { prefix: PRIVATE_OWNER, principal: 901 });
  REC.takeLinks(D, [LOCKED]); REC.takeLink({ addr: LOCKED, from: [span(D, 7, 2)], to: [{ ...span(PRIVATE, 1, 5), account: '1.0.2.1' }], type: CITE });
};
// a citation from the first edition of a passage of FAR an edit moved: its far end, stored at FAR's 8, five positions, projects to
// FAR's 20 now
const SHIFTED = D + '.0.2.10';
/** the moved citation taken into the model, drawn at the first edition */
const takeShifted = () => { REC.takeLinks(D, [SHIFTED]); REC.takeLink({ addr: SHIFTED, from: [span(D, 21, 2)], to: [span(FAR, 8, 5)], type: CITE, age: UNDATED }); };
// a citation from the first edition of a passage of FAR whose projection the board declines: `not_a_link`, no such slot (A-53)
const DECLINED = D + '.0.2.7';
/** the declined citation taken into the model, drawn at the first edition */
const takeDeclined = () => { REC.takeLinks(D, [DECLINED]); REC.takeLink({ addr: DECLINED, from: [span(D, 13, 2)], to: [span(FAR, 3, 4)], type: CITE }); };
// a citation from the first edition of a passage of FAR whose projection the board refuses `withheld`, a refusal that says FAR is
// withheld from the reader (HIDDEN_PROJ); one whose projection it refuses for its size, `image_too_large`, its passage FAR's own
// bytes at 30, four positions (SIZED_LINK)
const HIDDEN_PROJ = D + '.0.2.11', SIZED_LINK = D + '.0.2.12';
// a citation from the first edition of four of FAR's bytes from its third, its projection a run as wide as the passage (TWICE)
const TWICE = D + '.0.2.13';
// a citation from the first edition of three of MANY's bytes from its twelfth (MANY_LINK): MANY's text held, its image not — its
// projection refused for its size, and its image too, whole, each half of it answering
const MANY = '1.0.1.0.50', MANY_TEXT = 'A text of many runs.', MANY_LINK = D + '.0.2.14';
/** the two citations taken into the model, drawn at the first edition */
const takeRefusedProjections = () => {
  REC.takeLinks(D, [HIDDEN_PROJ, SIZED_LINK]);
  REC.takeLink({ addr: HIDDEN_PROJ, from: [span(D, 2, 2)], to: [span(FAR, 3, 4)], type: CITE });
  REC.takeLink({ addr: SIZED_LINK, from: [span(D, 16, 2)], to: [span(FAR, 30, 4)], type: CITE });
};
// two citations from the first edition met late — each far document's extent held as a viewport's read leaves it, so the follow
// consults nothing before the projection, which answers — whose far document's text the board, once the follow reads it, answers for
// with nothing (GONE_LATE) or withholds from the reader (HIDDEN_LATE)
const GONE_LATE = '1.0.1.0.13', DEAD_LATE = D + '.0.2.8', HIDDEN_LATE = '1.0.2.0.7', LOCKED_LATE = D + '.0.2.9', LATE_EXTENT = 20;
// a citation from the first edition of a passage of TURNED, 1.0.2's draft whose text the page read and the board now withholds from
// the reader — its access changed after the text was read
const TURNED = '1.0.2.0.8', TURNED_TEXT = 'A draft read before its owner withdrew it.', TURNED_LINK = D + '.0.2.18';
/** the turned citation taken into the model, drawn at the first edition, TURNED's text held and its read refused `withheld` since */
const takeTurned = () => {
  REC.takeSpanSet(TURNED, [{ subspace: 1, ordinal: 1, positions: TURNED_TEXT.length }]);
  REC.takeDelivery(TURNED, [{ pos: 1, width: TURNED_TEXT.length, kind: 'content', text: TURNED_TEXT, ref: null, origin: null }]);
  REC.takeRefused(TURNED, 'withheld');
  REC.takeLinks(D, [TURNED_LINK]); REC.takeLink({ addr: TURNED_LINK, from: [span(D, 5, 2)], to: [{ ...span(TURNED, 1, 5), account: '1.0.2' }], type: CITE });
};
/** the edition claims the board answers on a withheld document whose face decides C-67's pointer from them: none */
const noClaims = (/** @type {string} */ doc) => ({ [FAKE.keyOf('op', { frame: F.editionClaimsAt(doc) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } } });
/** a citation met late taken into the model, drawn at the first edition from `pos`, two positions, its far document's extent held and its text not */
const takeLate = (/** @type {string} */ link, /** @type {string} */ far, /** @type {number} */ pos) => {
  REC.invalidate(far); REC.takeSpanSet(far, [{ subspace: 1, ordinal: 1, positions: LATE_EXTENT }]);
  REC.takeLinks(D, [link]); REC.takeLink({ addr: link, from: [span(D, pos, 2)], to: [span(far, 3, 4)], type: CITE });
};
/** the reads of a citation met late: its projection answers; its far document's metadata and text refused by `name` */
const late = (/** @type {string} */ link, /** @type {string} */ far, /** @type {string} */ name) => ({
  [FAKE.keyOf('op', { frame: F.project(link, 2, far) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.3', width: '0.4' }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(far) })]: { refused: { kind: 'refused', name, code: name } },
  [FAKE.keyOf('op', { frame: F.retrieveV(far, 1, LATE_EXTENT) })]: { refused: { kind: 'refused', name, code: name } },
});
/** FAR's head, where a dead end lands: its first paragraph's first position */
const FAR_HEAD = 1;
// FAR's second version member, a copy of its text; the passages LEAPs carry: one FAR holds at 20, five positions, one neither FAR nor
// its member holds, and one FAR holds in two stretches, its first half at FAR's 25 and its second at FAR's 2 — its first member
// holding it whole, at 2; one FAR holds the first five of its twelve positions of (PARTIAL), at 25, its first member none of it; one
// whose compare the board does not answer until `outage` ends, FAR holding it at 20 (UNANSWERED); one the board refuses to compare
// against FAR whole for its size, FAR's second half holding it whole at 30 (SIZED)
const FAR2 = FAR + '.2';
const SHARED = { addr: D, pos: 11, width: 5 }, UNSHARED = { addr: D, pos: 1, width: 8 }, MOVED = { addr: D, pos: 1, width: 10 };
const PARTIAL = { addr: D, pos: 1, width: 12 }, UNANSWERED = { addr: D, pos: 11, width: 4 }, SIZED = { addr: D, pos: 21, width: 4 };
/** the `compare` a carried passage is re-projected by: the passage against the text landed in, whole — or the stretch of it named */
const carried = (/** @type {{addr: string, pos: number, width: number}} */ c, /** @type {string} */ into, /** @type {number} */ extent, from = 1) => F.compare([{ doc: c.addr, spans: [{ ordinal: c.pos, positions: c.width }] }], [{ doc: into, spans: [{ ordinal: from, positions: extent }] }]);
/** a `compare` answer: each pair its position in D, its position in `into`, its positions */
const pairsOf = (/** @type {string} */ into, /** @type {Array<[number, number, number]>} */ pairs) => ({ result: { as_of: 1, resp: 'compare', pairs: pairs.map(([u1, u2, width]) => ({ d1: D, d2: into, u1: { ordinal: String(u1), subspace: '1' }, u2: { ordinal: String(u2), subspace: '1' }, width: String(width) })) } });
/** FAR's image as SHARED's `compare` answers it — D's 11th to 15th bytes at its 20th, its own around them — so a carry of SHARED's outline is read again by identity where FAR holds it */
const sharing = () => REC.takeImage(FAR, 1, [{ iStart: FAR + '.0.1.1', width: 19 }, { iStart: D + '.0.1.11', width: 5 }, { iStart: FAR + '.0.1.25', width: FAR_EXTENT - 24 }]);
/** FAR's own image put back */
const farOwn = () => REC.takeImage(FAR, 1, [{ iStart: FAR + '.0.1.1', width: FAR_EXTENT }]);
/** the board not answering while `outage` stands (UNANSWERED's compare) */
let outage = true;
// FAR's first member, a copy of its text like the second; the passage the versions list holds at FAR: its second paragraph, whole
const FAR1 = FAR + '.1';
const FAR_HELD = { pos: FAR_TEXT.indexOf('Its') + 1, width: 'Its cited passage stands here.'.length };
/** the `compare` the versions list marks a member's row by: the passage held against the member's own text, whole */
const heldIn = (/** @type {string} */ member) => F.compare([{ doc: FAR, spans: [{ ordinal: FAR_HELD.pos, positions: FAR_HELD.width }] }], [{ doc: member, spans: [{ ordinal: 1, positions: FAR_EXTENT }] }]);
/** a member holding the passage held where FAR does */
const holdsHeld = (/** @type {string} */ member) => ({ result: { as_of: 1, resp: 'compare', pairs: [{ d1: FAR, d2: member, u1: { ordinal: String(FAR_HELD.pos), subspace: '1' }, u2: { ordinal: String(FAR_HELD.pos), subspace: '1' }, width: String(FAR_HELD.width) }] } });
/** who uses the first edition's cited passage: the read the card asks */
const usesCited = F.findDocsContaining([{ doc: D, spans: [{ ordinal: 11, positions: 5 }] }]);
// WINDOWS: the account's edition windowing, after its first paragraph, a run of ORIGIN — 1.0.2's draft, withheld from the
// reader — at RUN; EDITION: 1.0.2's published edition, whose claim on ORIGIN (EDITION_CLAIM) passes, its FROM EDITION's own
// bytes; QUOTING_CLAIM: 1.0.2's other edition claim on ORIGIN, its FROM ORIGIN's bytes
const WINDOWS = '1.0.1.0.30', ORIGIN = '1.0.2.0.2', EDITION = '1.0.2.0.9', EDITION_CLAIM = EDITION + '.0.2.1', QUOTING_CLAIM = '1.0.2.0.11.0.2.1';
const WINDOWS_TEXT = 'Tumbler.\n\n', RUN = WINDOWS_TEXT.length + 1, EDITION_TEXT = 'The edition 1.0.2 published of the draft.';
/** the windowing edition, its run, and ORIGIN's two edition claims with their homes taken into the model, read whole as a landing's read leaves them */
function takeWindows() {
  REC.takeSpanSet(WINDOWS, [{ subspace: 1, ordinal: 1, positions: RUN - 1 + 240 }]);
  REC.takeDelivery(WINDOWS, [{ pos: 1, width: RUN - 1, kind: 'content', text: WINDOWS_TEXT, ref: null, origin: null }, { pos: RUN, width: 240, kind: 'withheld', text: '', ref: null, origin: ORIGIN }]);
  REC.takeMetadata(WINDOWS, { doc: WINDOWS, published: true, owner: '1.0.1', birth: WINDOWS + '.1', birthExtent: RUN - 1 + 240, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeLinks(WINDOWS, []);
  const R20 = '1.1.0.1.0.1.0.3.14', theirs = (/** @type {object} */ end) => ({ ...end, account: '1.0.2' });
  REC.takeLink({ addr: EDITION_CLAIM, from: [theirs(span(EDITION, 1, EDITION_TEXT.length))], to: [theirs(whole(ORIGIN))], type: R20 });
  REC.takeLink({ addr: QUOTING_CLAIM, from: [theirs(span(ORIGIN, 1, 240))], to: [theirs(whole(ORIGIN))], type: R20 });
  for (const home of [EDITION, '1.0.2.0.11']) REC.takeMetadata(home, { doc: home, published: true, owner: '1.0.2', birth: home + '.1', birthExtent: 20, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeEditionClaims(ORIGIN, [QUOTING_CLAIM, EDITION_CLAIM]);
}

// REACH: a document on board 2, which the plane does not draw: only its read places it; REACH_GONE: an address there the board
// answers for with nothing
const REACH = '2.0.1.0.3', REACH_GONE = '2.0.1.0.4', REACH_TEXT = 'A document on another board.';

/** the reads of a document read whole: its extent, its metadata, its text, its image, its links */
const reads = (/** @type {string} */ doc, /** @type {string} */ text, /** @type {string[]} */ links) => ({
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: { result: { as_of: 1, resp: 'doc_metadata', doc, published: true, owner: '1.0.1', birth: doc + '.1', birth_extent: String(text.length), placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: text }] } },
  [FAKE.keyOf('op', { frame: F.image(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: doc + '.0.1.1', width: String(text.length) }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: links } },
});
const script = {
  ...reads(D, NEAR_TEXT, [PASSAGE, WHOLE]),
  ...reads(FAR, FAR_TEXT, []),
  ...reads(C, C_TEXT, []),
  ...reads(DEEP, DEEP_TEXT, []),
  ...reads(RES, RES_TEXT, []),
  ...reads(LONG, LONG_TEXT, []),
  ...reads(CONT, CONT_TEXT, []),
  ...reads(EDITION, EDITION_TEXT, [EDITION_CLAIM]),
  ...reads(REACH, REACH_TEXT, []),
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(REACH_GONE) })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } },
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(GONE) })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } },
  // where each citation's far end projects into FAR now: the passage at 20, five positions; FAR whole, all of it
  [FAKE.keyOf('op', { frame: F.project(PASSAGE, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.20', width: '0.5' }] } },
  [FAKE.keyOf('op', { frame: F.project(WHOLE, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + FAR_EXTENT }] } },
  // the cut citation's far end in two runs, the set naming the later first: the wire names no order for a span set
  [FAKE.keyOf('op', { frame: F.project(SPLIT, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.20', width: '0.5' }, { start: '1.3', width: '0.4' }] } },
  // the floating citation's far end in FAR's current text: no run
  [FAKE.keyOf('op', { frame: F.project(FLOAT, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [] } },
  // the moved citation's far end where FAR's text holds it now, and its lineage and the floating one's, which their anatomy cards read
  [FAKE.keyOf('op', { frame: F.project(SHIFTED, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.20', width: '0.5' }] } },
  ...Object.fromEntries([SHIFTED, FLOAT].flatMap((l) => [F.inClaims(l, 'audit'), F.outClaims(l, 'audit')]).map((frame) => [FAKE.keyOf('op', { frame }), { result: { as_of: 1, resp: 'claims', claims: [] } }])),
  // the withheld citation's far document: its span set and the projection into it refused `withheld`, the document consulted first;
  // the edition claims on each document a follow lands at withheld, none
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(PRIVATE) })]: { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } },
  [FAKE.keyOf('op', { frame: F.project(LOCKED, 2, PRIVATE) })]: { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } },
  ...noClaims(PRIVATE), ...noClaims(FAR), ...noClaims(HIDDEN_LATE), ...noClaims(TURNED),
  // the declined citation's projection into FAR: no such slot
  [FAKE.keyOf('op', { frame: F.project(DECLINED, 2, FAR) })]: { refused: { kind: 'refused', name: 'not_a_link', code: 'not_a_link' } },
  ...late(DEAD_LATE, GONE_LATE, 'doc_not_registered'),
  ...late(LOCKED_LATE, HIDDEN_LATE, 'withheld'),
  // the dead reference's lineage, which its anatomy card reads: no claims either way
  [FAKE.keyOf('op', { frame: F.inClaims(DEAD, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [] } },
  [FAKE.keyOf('op', { frame: F.outClaims(DEAD, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [] } },
  ...reads(FAR2, FAR_TEXT, []), ...reads(FAR1, FAR_TEXT, []),
  // the version offers' reads: the cut citation's slot projected into FAR's first member, whole there at 3, and that
  // run's bytes; the floating citation's, whole there at 8, its stored span, and that run's bytes; the moved passage's compare
  // against the first member, whole at 2; PARTIAL's against FAR, its first five positions at 25, and against the first member,
  // none of it
  [FAKE.keyOf('op', { frame: F.project(SPLIT, 2, FAR1) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.3', width: '0.22' }] } },
  [FAKE.keyOf('op', { frame: F.image(FAR1, 3, 22) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: FAR + '.0.1.3', width: '22' }] } },
  [FAKE.keyOf('op', { frame: F.project(FLOAT, 2, FAR1) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.8', width: '0.4' }] } },
  [FAKE.keyOf('op', { frame: F.image(FAR1, 8, 4) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: FAR + '.0.1.8', width: '4' }] } },
  [FAKE.keyOf('op', { frame: carried(MOVED, FAR1, FAR_EXTENT) })]: pairsOf(FAR1, [[1, 2, 10]]),
  [FAKE.keyOf('op', { frame: carried(PARTIAL, FAR, FAR_EXTENT) })]: pairsOf(FAR, [[1, 25, 5]]),
  [FAKE.keyOf('op', { frame: carried(PARTIAL, FAR1, FAR_EXTENT) })]: pairsOf(FAR1, []),
  // SIZED's compare against FAR whole refused for its size, then each half of FAR's text: the first holding none of it, the second
  // all of it at 30
  [FAKE.keyOf('op', { frame: carried(SIZED, FAR, FAR_EXTENT) })]: { refused: { kind: 'refused', name: 'too_many_blocks', code: 'too_many_blocks' } },
  [FAKE.keyOf('op', { frame: carried(SIZED, FAR, FAR_EXTENT / 2) })]: pairsOf(FAR, []),
  [FAKE.keyOf('op', { frame: carried(SIZED, FAR, FAR_EXTENT / 2, FAR_EXTENT / 2 + 1) })]: pairsOf(FAR, [[21, 30, 4]]),
  // the citations' projections the board refuses: one `withheld`, which says FAR is withheld from the reader; one for its size
  [FAKE.keyOf('op', { frame: F.project(HIDDEN_PROJ, 2, FAR) })]: { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } },
  [FAKE.keyOf('op', { frame: F.project(SIZED_LINK, 2, FAR) })]: { refused: { kind: 'refused', name: 'image_too_large', code: 'image_too_large' } },
  // TWICE's projection into FAR: four positions from 20; into its first member, none
  [FAKE.keyOf('op', { frame: F.project(TWICE, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.20', width: '0.4' }] } },
  [FAKE.keyOf('op', { frame: F.project(TWICE, 2, FAR1) })]: { result: { as_of: 1, resp: 'span_set', set: [] } },
  [FAKE.keyOf('op', { frame: F.project(MANY_LINK, 2, MANY) })]: { refused: { kind: 'refused', name: 'image_too_large', code: 'image_too_large' } },
  [FAKE.keyOf('op', { frame: F.image(MANY, 1, MANY_TEXT.length) })]: { refused: { kind: 'refused', name: 'image_too_large', code: 'image_too_large' } },
  [FAKE.keyOf('op', { frame: F.image(MANY, 1, MANY_TEXT.length / 2) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: MANY + '.0.1.1', width: String(MANY_TEXT.length / 2) }] } },
  [FAKE.keyOf('op', { frame: F.image(MANY, MANY_TEXT.length / 2 + 1, MANY_TEXT.length / 2) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: MANY + '.0.1.' + (MANY_TEXT.length / 2 + 1), width: String(MANY_TEXT.length / 2) }] } },
  // where the carried passages stand in FAR and its member: the shared one at FAR's 20, five positions; the other nowhere; the moved
  // one's first five positions at FAR's 25 and its last five at FAR's 2
  [FAKE.keyOf('op', { frame: carried(SHARED, FAR, FAR_EXTENT) })]: { result: { as_of: 1, resp: 'compare', pairs: [{ d1: D, d2: FAR, u1: { ordinal: '11', subspace: '1' }, u2: { ordinal: '20', subspace: '1' }, width: '5' }] } },
  [FAKE.keyOf('op', { frame: carried(MOVED, FAR, FAR_EXTENT) })]: { result: { as_of: 1, resp: 'compare', pairs: [{ d1: D, d2: FAR, u1: { ordinal: '1', subspace: '1' }, u2: { ordinal: '25', subspace: '1' }, width: '5' }, { d1: D, d2: FAR, u1: { ordinal: '6', subspace: '1' }, u2: { ordinal: '2', subspace: '1' }, width: '5' }] } },
  [FAKE.keyOf('op', { frame: carried(UNSHARED, FAR, FAR_EXTENT) })]: { result: { as_of: 1, resp: 'compare', pairs: [] } },
  [FAKE.keyOf('op', { frame: carried(UNSHARED, FAR2, FAR_EXTENT) })]: { result: { as_of: 1, resp: 'compare', pairs: [] } },
  // the cards' reads: who wrote the first edition's cited passage (FAR) and who uses it (FAR too), the citation's lineage (no
  // claims either way), and the versions list's: FAR's members counted — two, its third never registered — and each one's row
  [FAKE.keyOf('op', { frame: F.showOrigin(D, 11, 5) })]: { result: { as_of: 1, resp: 'addrs', addrs: [FAR] } },
  [FAKE.keyOf('op', { frame: usesCited })]: { result: { as_of: 1, resp: 'addrs', addrs: [D, FAR] } },
  [FAKE.keyOf('op', { frame: F.inClaims(PASSAGE, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [] } },
  [FAKE.keyOf('op', { frame: F.outClaims(PASSAGE, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [] } },
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(FAR1) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + FAR_EXTENT }] } },
  [FAKE.keyOf('op', { frame: heldIn(FAR1) })]: holdsHeld(FAR1),
  [FAKE.keyOf('op', { frame: heldIn(FAR2) })]: holdsHeld(FAR2),
};
/** FAR's third member, past its chain's end: never registered, the board not answering it while `chainOutage` stands */
let chainOutage = false;
Object.defineProperty(script, FAKE.keyOf('op', { frame: F.docMetadata(FAR + '.3') }), {
  enumerable: true,
  get: () => (chainOutage ? { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } } : { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } }),
});
/** UNANSWERED's compare against FAR: the board not answering while `outage` stands, then FAR holding it at 20 */
Object.defineProperty(script, FAKE.keyOf('op', { frame: carried(UNANSWERED, FAR, FAR_EXTENT) }), {
  enumerable: true,
  get: () => (outage ? { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } } : pairsOf(FAR, [[11, 20, 4]])),
});

/** @type {ReturnType<typeof FAKE.create>} */
let fake;

/** an act run to its end: the flight it starts stepped to its last frame */
async function run(/** @type {Promise<unknown>} */ act) {
  let done = false;
  act.then(() => { done = true; });
  for (let i = 0; i < 200 && !done; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done, 'the act ran to its end');
}
/** a return's reopening let finish: every read it set going answered and every flight stepped — the surfaces it reopens shown */
async function reopening() {
  for (let i = 0; i < 60; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
}
/** a citation as LK draws it at the first edition */
const drawn = (/** @type {string} */ link) => /** @type {import('../links/links.js').Shown} */ (LK.shown(D).find((s) => s.link.addr === link));
/** two views the same, within a flight's last step's rounding */
const same = (/** @type {{x: number, y: number, scale: number}} */ a, /** @type {{x: number, y: number, scale: number}} */ b) => [a.x - b.x, a.y - b.y, a.scale - b.scale].every((d, i) => Math.abs(d) <= 1e-9 * Math.max(1, Math.abs([b.x, b.y, b.scale][i])));
/** the walk's element: its kind, its place, its position */
const walkAt = () => { const f = WALK.current(); return f && [f.kind, f.addr, f.pos]; };
/** the trail's places, oldest first */
const addrs = () => TRAIL.all().map((e) => e.addr);
/** C as the page holds it before a LEAP reads it: no text */
const unread = () => REC.invalidate(C);
/** the overlay host's stand-in element: what the host writes into it is what a person meets */
const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };
/** the stand-in of the element a notice stands in below the overlay (O-HOST's) */
const noticeEl = { ...hostEl, style: {}, contains: (/** @type {unknown} */ _x) => false };
/** the face the host shows: its name and its words, and whether it offers an act; null where no face stands */
const faceShown = () => { const o = HOST.currentState(); return o && o.kind === 'face' ? { id: o.id, html: hostEl.innerHTML, acts: hostEl.innerHTML.includes('data-run') } : null; };

before(async () => {
  REC._reset(); LK._reset(); TRAIL._reset();
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  HOST.attach(/** @type {any} */ (hostEl), /** @type {any} */ (noticeEl));
  fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  // the walk reads N-GO as the app hands it in: where Back's light stands, what a landing says, the version each box shows
  WALK.readers({ located: () => GO.backLight(), described: () => GO.described(), shown: GO.shownIn });
  // the text layer reads the version each box shows as the app hands it in: the one whose passage a view reads
  LAYER.readers({ shown: GO.shownIn });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }, { doc: FAR, kind: 'edition', label: 'far', standing: 'public' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  CAM.setDeepest(Math.max(...REC.places().map((p) => depthOfDoc(p.doc)))); // the bound the app's boot sets over the index
  REC.takeLink({ addr: PASSAGE, from: [span(D, 11, 5)], to: [span(FAR, 20, 5)], type: CITE, age: UNDATED });
  REC.takeLink({ addr: WHOLE, from: [span(D, 17, 5)], to: [whole(FAR)], type: CITE, age: UNDATED });
  await PUMP.loadWhole(D);
  assert.deepEqual(LK.shown(D).map((s) => [s.link.addr, s.farWhole]), [[PASSAGE, false], [WHOLE, true]]);
  await GO.launch();
});

/** the arrival's two marks: the span outlined and the links lit */
const marks = () => [GO.arrivalMark(), GO.litLinks()];
/** the entry behind the cursor's: the one the last push departed, holding the step it took */
const departed = () => TRAIL.all()[TRAIL.cursorIndex() - 1];
/** FAR's first member as the page holds it before a version offer asks it: unread, so the offer reads its bytes, which hold each passage the script places there whole */
const memberUnread = () => REC.invalidate(FAR1);
/** how many times a document's extent has been asked of the board: the read a return to a failed jump's entry asks again */
const extentAsks = (/** @type {string} */ addr) => fake.asked.filter((k) => k === FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(addr) })).length;

/**
 * A follow of a link drawn at the first edition while the board does not
 * answer FAR's third member, run until the version offer's probe has asked
 * it and the reads it set going have answered: FAR read anew by the follow,
 * its members uncounted, so the offer probes its chain, which the board then
 * does not end; FAR's first member unread (`memberUnread`).
 * @param {string} link
 */
async function followUnended(link) {
  REC.invalidate(FAR);
  memberUnread();
  chainOutage = true;
  try {
    const from = fake.asked.length, third = FAKE.keyOf('op', { frame: F.docMetadata(FAR + '.3') });
    await run(GO.follow(drawn(link)));
    for (let i = 0; i < 50 && !fake.asked.slice(from).includes(third); i++) await new Promise((r) => setTimeout(r, 0));
    for (let i = 0; i < 50; i++) await new Promise((r) => setTimeout(r, 0));
    assert.ok(fake.asked.slice(from).includes(third), 'the chain probed past its second member');
  } finally { chainOutage = false; }
}

test('a follow outlines the span its link\'s far end projects to — its first position and its positions — and lights the link followed', async () => {
  await run(GO.follow(drawn(PASSAGE)));
  assert.deepEqual(marks(), [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE }, [PASSAGE]]);
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width], [FAR, 20, 5], 'the landing\'s entry carries the span');
  assert.deepEqual(departed()?.step, { kind: 'follow', link: PASSAGE, near: D, key: drawn(PASSAGE).key, far: FAR, spans: [{ prefix: FAR + '.0.1', ordinal: 20, width: 5 }] },
    'the entry it departed records the follow: the link, the end it was made at, and the far end by identity — its slot\'s stored span, never a position (issue #152)');
  assert.deepEqual(fake.unanswered, []);
});

test('a follow of a far end the far document\'s text holds in two runs apart outlines both, in the text\'s order, each labelled by its piece in the passage\'s order, and lands at piece 1, its line the label of the run it stands at, saying only part of the passage is there and counting no places, offering FAR\'s first member, which holds it whole (issues #153, #158)', async () => {
  takeSplit();
  await run(GO.follow(drawn(SPLIT)));
  assert.deepEqual(marks(), [{ addr: FAR, pos: 3, runs: [{ pos: 3, width: 4 }, { pos: 20, width: 5 }], link: SPLIT }, [SPLIT]], 'every run the projection names, the gap between them not marked');
  assert.ok(same(CAM.view(), GO.viewFor(FAR, 3)), 'the camera at piece 1\'s view');
  assert.deepEqual([walkAt(), WALK.landedAt()], [['block', FAR, 1], 3], 'the walk on the paragraph holding piece 1, at its position');
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width], [FAR, 3, 4], 'the landing\'s entry at the run landed on');
  assert.deepEqual(departed()?.step, { kind: 'follow', link: SPLIT, near: D, key: drawn(SPLIT).key, far: FAR, spans: [{ prefix: FAR + '.0.1', ordinal: 3, width: 22 }] }, 'the entry departed recording the far end by the span its slot stores, never the two runs it stands in now');
  // nine of the stored span's twenty-two bytes stand in FAR's text, in two runs: each labelled, the line the first's, part of it — never the outline alone
  const piece = (/** @type {number} */ k) => t('L.piece', { k, n: 2 }), words = piece(1) + ' · ' + t('L.piece.part');
  assert.deepEqual([GO.landing()?.said?.state, GO.landing()?.current, GO.landingLine()], ['part', 0, words], 'the line: "piece 1 of 2 · only part of the passage"');
  assert.ok(!/places/.test(GO.landingLine() || ''), 'no places counted');
  assert.deepEqual(GO.described(), { addr: FAR, pos: 3, words, runs: [{ pos: 3, width: 4, words: piece(1) }, { pos: 20, width: 5, words: piece(2) }] }, 'the mirror\'s descriptions: the line at the item the focus landed on, every run\'s label at its own');
  assert.equal(GO.landing()?.beside, null, 'no side-by-side offer: the first edition holds none of FAR\'s passage');
  for (let i = 0; i < 50 && GO.landing()?.version == null; i++) await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([GO.landing()?.version, GO.landingOffers()], [1, { steps: true, again: false, version: true }], 'FAR published, its first member holding the passage whole: offered, the latest member doing so other than the text landed in; the step offered among the runs');
  const at = CAM.view();
  GO.landingAct('version');
  let flew = false;
  for (let i = 0; i < 200 && GO.arrivalMark()?.addr !== FAR1; i++) { await new Promise((r) => setTimeout(r, 0)); flew = flew || CAM.flying(); if (CAM.flying()) CAM.step(Infinity); }
  assert.deepEqual([GO.arrivalMark(), GO.litLinks(), GO.shownIn(FAR)], [{ addr: FAR1, pos: 3, runs: [{ pos: 3, width: 22 }], link: SPLIT }, [SPLIT], FAR1], 'the offer moves to the member as a follow lands there: its far end outlined whole, its link lit, the box taking the member');
  assert.ok(!flew && same(CAM.view(), at), 'a version move (issue #154): no flight, the camera where it stood');
  await run(GO.leapTo(D));
  assert.deepEqual([GO.landing(), GO.landingLine(), GO.landingOffers()], [null, null, { steps: false, again: false, version: false }], 'the next landing: the line gone with the outline');
  await run(GO.leapTo(FAR));
  assert.deepEqual(fake.unanswered, []);
});

test('a landing at a published document whose chain the board did not end offers no version: "the last that holds it" names the chain whole (issue #184\'s design decision: "nothing built from it claims to be the whole chain")', async () => {
  takeSplit();
  await followUnended(SPLIT);
  assert.deepEqual([GO.landing()?.current, GO.landing()?.version, GO.landingOffers().version, REC.doc(FAR).members], [0, null, false, null], 'its third not answered: no version offered, though its first holds the passage whole; no count recorded');
  await run(GO.leapTo(FAR));
  assert.deepEqual(fake.unanswered, []);
});

test('Back lights the link a follow took from the entry it lands on, at the follow\'s departure, outlining nothing; Back across a LEAP that carried nothing lights no link, the follow\'s landing restoring its outline as the reader left it (FP-21)', async () => {
  await run(GO.leapTo(D));
  await run(GO.follow(drawn(PASSAGE)));
  await run(GO.leapTo(D));
  assert.deepEqual(marks(), [null, []], 'a LEAP naming no link puts both out');
  await run(GO.back());
  assert.equal(TRAIL.current()?.addr, FAR, 'Back to the follow\'s landing');
  assert.deepEqual(marks(), [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE }, []], 'the step Back crossed a LEAP carrying nothing: no link lit, the follow\'s span outlined again as the reader left it');
  await run(GO.back());
  assert.equal(TRAIL.current()?.addr, D, 'Back to the follow\'s departure');
  assert.deepEqual(marks(), [null, [PASSAGE]], 'the link followed lit there, no span outlined');
  assert.deepEqual(fake.unanswered, []);
});

test('a link naming the far document whole outlines the document\'s first position, no width, and lights the link; Forward across the follow marks the block at its head again', async () => {
  await run(GO.follow(drawn(WHOLE)));
  const arrived = [{ addr: FAR, pos: 1, runs: null, link: WHOLE }, [WHOLE]];
  assert.deepEqual(marks(), arrived);
  assert.equal(departed()?.step?.spans, null, 'the entry departed records the far end as the document whole: no bytes named');
  await run(GO.back());
  assert.deepEqual(marks(), [null, [WHOLE]], 'Back: the link lit where the follow was made');
  await run(GO.forward());
  assert.deepEqual(marks(), arrived, 'Forward: what the follow marked on arrival, the block at the far document\'s head (issue #152)');
  assert.deepEqual(fake.unanswered, []);
});

test('Back across a follow made at a link\'s end drawn at a withheld run marks the whole run — outlined at its start, its whole extent, never an offset inside its gap — lights the link, and stands the walk on the run\'s item, which Back\'s light marks; Forward lights the far end, the run no longer marked (issue #202\'s design decision: "Arriving by a link that ends here marks the whole run, lights the symbol and puts focus on the run")', async () => {
  // RD, held whole: its first paragraph, then eight of a draft's bytes withheld from the reader; the person's citation of FAR whole on three of them
  const RD = '1.0.1.0.41', O = '1.0.2.0.29', RL = RD + '.0.2.1', text = 'Tumbler.\n\n', n = text.length, RUN = n + 1;
  REC.takeSpanSet(RD, [{ subspace: 1, ordinal: 1, positions: n + 8 }]);
  REC.takeMetadata(RD, { doc: RD, published: true, owner: '1.0.1', birth: RD + '.1', birthExtent: n + 8, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeDelivery(RD, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: RUN, width: 8, kind: 'withheld', text: '', ref: null, origin: O }]);
  REC.takeImage(RD, 1, [{ iStart: RD + '.0.1.1', width: n }, { iStart: O + '.0.1.1', width: 8 }]);
  REC.takeLinks(RD, [RL]);
  REC.takeLink({ addr: RL, from: [span(O, 3, 3)], to: [whole(FAR)], type: CITE });
  REC.takeEditionClaims(O, []);
  // the follow's projection into FAR, as the board answers a link naming it whole: its whole text
  script[FAKE.keyOf('op', { frame: F.project(RL, 2, FAR) })] = { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + FAR_EXTENT }] } };
  const was = fake.unanswered.length;
  try {
    const s = /** @type {import('../links/links.js').Shown} */ (LK.shown(RD).find((x) => x.link.addr === RL));
    assert.deepEqual([s.pos, s.width, s.run && s.run.pos], [RUN, 8, RUN], 'drawn at the run\'s start');
    await run(GO.leapTo(RD, { pos: RUN }));
    assert.deepEqual([walkAt(), marks()], [['block', RD, RUN], [null, []]], 'at the run: the walk on its item, nothing marked');
    await run(GO.follow(s));
    assert.equal(TRAIL.current()?.addr, FAR, 'the follow goes to the other end');
    await run(GO.back());
    assert.equal(TRAIL.current()?.addr, RD, 'Back to the follow\'s departure');
    assert.deepEqual(marks(), [{ addr: RD, pos: RUN, runs: [{ pos: RUN, width: 8 }], link: RL }, [RL]], 'the whole run outlined from its start, the link lit');
    assert.deepEqual(walkAt(), ['block', RD, RUN], 'the walk on the run\'s item');
    assert.deepEqual(GO.backLight(), { addr: RD, runs: [], end: { link: RL, key: s.key } }, 'Back\'s light at the end, which the mirror marks on the run\'s item');
    await run(GO.forward());
    assert.deepEqual(marks(), [{ addr: FAR, pos: 1, runs: null, link: RL }, [RL]], 'Forward: the far end lit, the run no longer marked');
    assert.equal(fake.unanswered.length, was, 'nothing asked the script does not answer');
  } finally {
    GO.endArrival();
    REC.invalidate(RD);
  }
});

test('Back to the place where Back\'s light outlined a withheld run, an edit setting bytes before the run while the reader was away, outlines the run where its bytes stand now — never the positions it was outlined at — the walk on it (issue #294)', async () => {
  // RW, a draft held whole: its first paragraph, then eight of a draft's bytes withheld from the reader; the person's citation of FAR whole on three of them
  const RW = '1.0.1.0.46', O = '1.0.2.0.31', RL = RW + '.0.2.1', text = 'Tumbler.\n\n', lead = 'A new lead.\n', RUN = text.length + 1, k = lead.length;
  /** RW set again as its words, then the withheld run, and the image over both, each run `[the document whose I-space it lies in, ordinal, width]` */
  const setRW = (/** @type {string} */ words, /** @type {Array<[string, number, number]>} */ image) => REC.setAgain(RW, {
    spans: [{ subspace: 1, ordinal: 1, positions: words.length + 8 }],
    text: { runs: [{ pos: 1, width: words.length, kind: 'content', text: words, ref: null, origin: null }, { pos: words.length + 1, width: 8, kind: 'withheld', text: '', ref: null, origin: O }], asOf: 1 },
    image: { from: 1, runs: [...image, [O, 1, 8]].map(([doc, ordinal, width]) => ({ iStart: `${doc}.0.1.${ordinal}`, width })) },
  });
  setRW(text, [[RW, 1, text.length]]);
  REC.takeMetadata(RW, { doc: RW, published: false, owner: '1.0.1', birth: null, birthExtent: null, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeLinks(RW, [RL]);
  REC.takeLink({ addr: RL, from: [span(O, 3, 3)], to: [whole(FAR)], type: CITE });
  REC.takeEditionClaims(O, []);
  script[FAKE.keyOf('op', { frame: F.project(RL, 2, FAR) })] = { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + FAR_EXTENT }] } };
  const was = fake.unanswered.length;
  try {
    const s = /** @type {import('../links/links.js').Shown} */ (LK.shown(RW).find((x) => x.link.addr === RL));
    assert.deepEqual([s.pos, s.run && s.run.pos], [RUN, RUN], 'drawn at the run\'s start');
    await run(GO.leapTo(RW, { pos: RUN }));
    await run(GO.follow(s));
    await run(GO.back());
    assert.deepEqual(marks(), [{ addr: RW, pos: RUN, runs: [{ pos: RUN, width: 8 }], link: RL }, [RL]], 'Back\'s light: the whole run outlined from its start');
    await run(GO.leapTo(D));
    setRW(lead + text, [['1.0.1.0.99', 1, k], [RW, 1, text.length]]);
    await run(GO.back());
    assert.deepEqual(marks(), [{ addr: RW, pos: RUN + k, runs: [{ pos: RUN + k, width: 8 }], link: RL }, []], 'Back to it: the run outlined where its bytes stand now, the move lighting nothing of its own');
    assert.deepEqual(walkAt(), ['block', RW, RUN + k], 'the walk on the run where it stands');
    assert.equal(fake.unanswered.length, was, 'nothing asked the script does not answer');
  } finally {
    GO.endArrival();
    REC.invalidate(RW);
  }
});

test('a follow of a far end the far document\'s text no longer holds lands at that document\'s head, faced there, the link lit and nothing outlined, the face offering no act while its reads seek the latest member holding the passage whole and, once they find it, "read version ⟨k⟩, the last that holds it", its number filled; Back returns to it, the face shown there again offering nothing — an offer that read is not restored — and nothing lit, the link lit again only where Back crosses the follow (issue #57)', async () => {
  takeFloat();
  memberUnread();
  await run(GO.leapTo(D));
  const n = TRAIL.length();
  const seeking = fake.hold('op', { frame: F.project(FLOAT, 2, FAR1) });
  await run(GO.follow(drawn(FLOAT)));
  assert.equal(REC.doc(FAR).blocks[0].pos, FAR_HEAD, 'FAR\'s head: its first paragraph');
  assert.deepEqual(marks(), [null, [FLOAT]], 'the link followed lit; no span outlined, for the text holds none of it');
  assert.equal(TRAIL.length(), n + 1, 'the follow\'s entry settled');
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width, departed()?.step?.kind, departed()?.step?.link], [FAR, FAR_HEAD, null, 'follow', FLOAT], 'the landing\'s entry at the head, never the end\'s stored position, the entry departed recording the follow');
  assert.deepEqual(e && e.notice && [e.notice.face, e.notice.addr, e.notice.site], ['floating', FAR, { span: { addr: FAR, pos: FAR_HEAD }, sign: FAR }], 'holding the dead end\'s face as its notice, beside the head it stands at, its document its sign');
  assert.ok(same(CAM.view(), GO.viewFor(FAR, FAR_HEAD)), 'the camera at the head\'s view');
  assert.deepEqual(walkAt(), ['block', FAR, FAR_HEAD], 'the walk on the head');
  const f = faceShown();
  assert.ok(f && f.id === 'face:floating' && f.html.includes('data-string="F.floating"') && f.html.includes(addressedHTML(t('F.floating', { D: FAR }))), `the dead end's words: ${f && f.html}`);
  assert.deepEqual([f && f.acts, GO.landing()?.version], [false, null], 'no act while its reads seek the member: never a number it does not have');
  assert.deepEqual(HOST.currentState()?.anchor, { span: { addr: FAR, pos: FAR_HEAD }, sign: FAR }, 'standing at the head landed on, never at the act\'s site');
  seeking();
  for (let i = 0; i < 50 && GO.landing()?.version == null; i++) await new Promise((r) => setTimeout(r, 0));
  const offered = faceShown();
  assert.deepEqual([GO.landing()?.version, GO.landingOffers().version, offered?.id, HOST.currentState()?.anchor, HOST.currentState()?.told], [1, true, 'face:floating', { span: { addr: FAR, pos: FAR_HEAD }, sign: FAR }, true],
    'FAR published, its first member holding the passage whole: offered, the face drawn again where it stood, still told by the landing');
  assert.ok(offered && offered.html.includes(`<button data-run="a0" class="">${esc(t('F.floating.read', { k: 1 }))}</button>`) && !offered.html.includes('⟨'), `its act "read version 1, the last that holds it", its number filled and no token left: ${offered && offered.html}`);
  await run(GO.leapTo(D));
  assert.equal(faceShown(), null, 'the next landing dismisses it');
  await run(GO.back());
  assert.deepEqual([walkAt(), marks()], [['block', FAR, FAR_HEAD], [null, []]], 'Back lands at the head, lighting nothing: the step it crossed, a LEAP, carried nothing — the notice\'s link not relit, nor any arrival (issue #152)');
  const again = faceShown();
  assert.ok(again && again.id === 'face:floating' && again.html.includes(addressedHTML(t('F.floating', { D: FAR }))) && !again.acts, 'the dead end\'s face shown there again, offering nothing: an offer that read is not restored');
  assert.deepEqual(HOST.currentState()?.anchor, { span: { addr: FAR, pos: FAR_HEAD }, sign: FAR }, 'at the head');
  await run(GO.back());
  assert.deepEqual(marks(), [null, [FLOAT]], 'Back to the follow\'s departure lights the link there');
  assert.deepEqual(fake.unanswered, []);
});

test('the dead end\'s face\'s act is the version move to the latest member holding the followed passage whole, made as a follow lands there: in place, never flying and never opening the versions list, the box taking the member, the passage outlined there and its link lit; where the board did not end the chain, the face offers no act (issue #57)', async () => {
  takeFloat();
  memberUnread();
  await run(GO.leapTo(D));
  await run(GO.follow(drawn(FLOAT)));
  for (let i = 0; i < 50 && GO.landing()?.version == null; i++) await new Promise((r) => setTimeout(r, 0));
  const act = HOST.currentState()?.acts?.a0;
  assert.ok(act && HOST.currentIs('face:floating'), 'the face offers its act');
  const at = CAM.view(), n = TRAIL.length();
  act(/** @type {any} */ (hostEl), false);
  let flew = false;
  for (let i = 0; i < 200 && GO.arrivalMark()?.addr !== FAR1; i++) { await new Promise((r) => setTimeout(r, 0)); flew = flew || CAM.flying(); if (CAM.flying()) CAM.step(Infinity); }
  assert.deepEqual([GO.arrivalMark(), GO.litLinks(), GO.shownIn(FAR)], [{ addr: FAR1, pos: 8, runs: [{ pos: 8, width: 4 }], link: FLOAT }, [FLOAT], FAR1], 'the passage the slot stores outlined in the member, its link lit, the box taking the member');
  assert.ok(!flew && same(CAM.view(), at), 'a version move: no flight, the camera where it stood');
  assert.deepEqual([HOST.currentState()?.id ?? null, TRAIL.length(), TRAIL.current()?.addr, departed()?.step?.kind], [null, n + 1, FAR1, 'carry'], 'no versions list: one entry pushed at the member, the entry departed recording the passage carried');
  await run(GO.leapTo(FAR));
  await run(GO.leapTo(D));
  await followUnended(FLOAT);
  const f = faceShown();
  assert.deepEqual([GO.landing()?.version, GO.landingOffers().version, f?.id, f?.acts], [null, false, 'face:floating', false], 'its third not answered: no version offered, though its first holds the passage whole, and the face offering no act');
  await run(GO.leapTo(FAR));
  assert.deepEqual(fake.unanswered, []);
});

test('a follow whose projection the board declines by a name that says nothing of the far document lands at that document\'s head, unmarked, the link lit, its line saying it could not tell why — its own projection\'s refusal, never another read\'s, met while it was out and answered right behind it (issue #153)', async () => {
  takeDeclined();
  await run(GO.leapTo(D));
  const from = fake.asked.length;
  const projection = fake.hold('op', { frame: F.project(DECLINED, 2, FAR) });
  const other = fake.hold('op', { frame: F.retrieveDocVSpanSet(GONE) });
  const following = GO.follow(drawn(DECLINED));
  const reading = PUMP.loadWhole(GONE);
  const asked = (/** @type {object} */ frame) => fake.asked.slice(from).includes(FAKE.keyOf('op', { frame }));
  for (let i = 0; i < 50 && !(asked(F.project(DECLINED, 2, FAR)) && asked(F.retrieveDocVSpanSet(GONE))); i++) await new Promise((r) => setTimeout(r, 0));
  // the projection answered first, the other read's refusal right behind it, before the follow reads its own
  projection(); other();
  await run(following); await reading;
  assert.equal(PUMP.refusalsMet().slice(-1)[0]?.refusal.name, 'doc_not_registered', 'the other read\'s refusal is the last the pump met');
  assert.deepEqual([faceShown(), marks(), walkAt()], [null, [null, [DECLINED]], ['block', FAR, FAR_HEAD]], 'no face in the landing\'s place: landed at FAR\'s head, nothing outlined, the link lit');
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width, e.notice], [FAR, FAR_HEAD, null, null], 'its entry settled at the head, no notice');
  const words = t('L.held.unknown', { subject: t('L.held.followed'), where: t('L.held.current', { D: FAR }), reason: t('B1.not_a_link') });
  assert.deepEqual([GO.landing()?.said?.state, GO.landing()?.said?.why, GO.landingLine()], ['unknown', 'B1.not_a_link', words], 'the line: it could not tell, by the projection\'s own `not_a_link`');
  assert.deepEqual(GO.landingOffers(), { steps: false, again: false, version: false }, 'no "try again": the board\'s verdict is permanent');
  assert.deepEqual(fake.unanswered, []);
});

test('a follow\'s line reads the far text\'s runs by the identity of their bytes, never by their widths: a run as wide as the passage, holding its first two bytes twice, is part of it, cut into a run of each, one material unnumbered — "again later", then "again" (issues #153, #158)', async () => {
  REC.takeLinks(D, [TWICE]); REC.takeLink({ addr: TWICE, from: [span(D, 5, 2)], to: [span(FAR, 3, 4)], type: CITE });
  // FAR's text as an edit left it: from its 20th position, the passage's first two bytes, then those two again
  REC.takeImage(FAR, 1, [{ iStart: FAR + '.0.1.1', width: 19 }, { iStart: FAR + '.0.1.3', width: 2 }, { iStart: FAR + '.0.1.3', width: 2 }, { iStart: FAR + '.0.1.24', width: FAR_EXTENT - 23 }]);
  try {
    await run(GO.leapTo(D));
    await run(GO.follow(drawn(TWICE)));
    assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: 20, runs: [{ pos: 20, width: 2 }, { pos: 22, width: 2 }], link: TWICE }, 'the projected run cut where its bytes repeat: a run of each, outlined');
    const words = t('L.piece.again-later') + ' · ' + t('L.piece.part');
    assert.deepEqual([GO.landing()?.said?.state, GO.landingLine(), GO.described()?.runs.map((r) => r.words)], ['part', words, [t('L.piece.again-later'), t('L.piece.again')]], 'two of its four bytes, held twice: part — four positions are no proof of all of it; one material, no number: the first "again later", the second "again"');
    await run(GO.leapTo(D));
  } finally {
    REC.takeImage(FAR, 1, [{ iStart: FAR + '.0.1.1', width: FAR_EXTENT }]);
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a follow whose projection the board refuses for its size places the far end through the far text\'s image — read in parts where the board refuses it whole for its size — the slot\'s bytes where that text holds them, held as its projection, and lands there, the outline alone where it holds all of it in one piece (issue #153)', async () => {
  takeRefusedProjections();
  await run(GO.leapTo(D));
  await run(GO.follow(drawn(SIZED_LINK)));
  assert.deepEqual(marks(), [{ addr: FAR, pos: 30, runs: [{ pos: 30, width: 4 }], link: SIZED_LINK }, [SIZED_LINK]], 'its passage at FAR\'s 30, placed by identity through FAR\'s image, outlined, the link lit');
  assert.deepEqual(REC.projection(SIZED_LINK, 2, FAR), [{ pos: 30, width: 4 }], 'held as the projection the board would not answer');
  assert.deepEqual([GO.landing()?.said, GO.landingLine(), GO.described()], [null, null, null], 'all of it in one piece: no line, and no description beyond the outline');
  // MANY's text held, its image not: the follow reads that image, in parts where the board refuses it whole for its size
  REC.takeSpanSet(MANY, [{ subspace: 1, ordinal: 1, positions: MANY_TEXT.length }]);
  REC.takeDelivery(MANY, [{ pos: 1, width: MANY_TEXT.length, kind: 'content', text: MANY_TEXT, ref: null, origin: null }]);
  REC.takeMetadata(MANY, { doc: MANY, published: true, owner: '1.0.1', birth: MANY + '.1', birthExtent: MANY_TEXT.length, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeLinks(MANY, []);
  REC.takeLinks(D, [MANY_LINK]); REC.takeLink({ addr: MANY_LINK, from: [span(D, 19, 2)], to: [span(MANY, 12, 3)], type: CITE });
  const from = fake.asked.length;
  await run(GO.leapTo(D));
  await run(GO.follow(drawn(MANY_LINK)));
  const images = fake.asked.slice(from).filter((k) => k.includes('"op":"image"'));
  assert.deepEqual(images, [F.image(MANY, 1, MANY_TEXT.length), F.image(MANY, 1, 10), F.image(MANY, 11, 10)].map((frame) => FAKE.keyOf('op', { frame })), 'MANY\'s image asked whole, refused for its size, then each half');
  assert.deepEqual([marks(), REC.projection(MANY_LINK, 2, MANY)], [[{ addr: MANY, pos: 12, runs: [{ pos: 12, width: 3 }], link: MANY_LINK }, [MANY_LINK]], [{ pos: 12, width: 3 }]], 'its passage placed through the image read in parts, outlined, the link lit');
  assert.deepEqual(fake.unanswered, []);
});

test('the anatomy card reads the far end where its passage stands now — one an edit moved at its place, never the position the link stores; one that floats in the dead end\'s words — the projection asked in the card\'s own opening where none is held', async () => {
  takeShifted(); takeFloat();
  await run(GO.leapTo(D));
  await PUMP.loadWhole(FAR);
  const quoted = () => (hostEl.innerHTML.match(/<div class="end far">.*?<div class="quoted">(.*?)<\/div>/) || [])[1];
  const from = fake.asked.length;
  await ANATOMY.open(drawn(SHIFTED), null);
  assert.ok(fake.asked.slice(from).includes(FAKE.keyOf('op', { frame: F.project(SHIFTED, 2, FAR) })), 'no projection held: asked in the card\'s opening');
  assert.deepEqual([quoted(), REC.projection(SHIFTED, 2, FAR)], [`<span class="reading">${esc(REC.textBetween(FAR, 20, 25))}</span>`, [{ pos: 20, width: 5 }]], 'FAR\'s text where the passage stands now, in the reading face, the projection held');
  assert.notEqual(quoted(), esc(REC.textBetween(FAR, 8, 13)), 'never the text at its stored position');
  HOST.dismiss();
  await ANATOMY.open(drawn(FLOAT), null);
  assert.equal(quoted(), addressedHTML(t('F.floating', { D: FAR })), 'floating: the dead end\'s words, said before anyone follows it, the address in the identifier\'s face');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('every act whose camera leaves puts the arrival\'s two marks out as it leaves — HOME, WHOLE BOARD, an account\'s region, a jump, a LEAP or a follow whose failure is learned in the air, Forward — and lights its own alone; an act that never leaves keeps them — a LEAP or a follow whose failure is known at the act, the follow lighting its own link, and a follow of a link naming no far document (FP-21, FP-25)', async () => {
  takeDead();
  const arrived = { addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE };
  /** a follow landed: its span outlined and its link lit */
  const landed = async () => {
    await run(GO.leapTo(D));
    await run(GO.follow(drawn(PASSAGE)));
    assert.deepEqual(marks(), [arrived, [PASSAGE]], 'the follow lit both');
  };
  /** GONE as the page holds it: known to be an address the board says nothing about, or not yet read */
  const gone = (/** @type {boolean} */ known) => { if (known) REC.takeRefused(GONE, 'unregistered'); else REC.invalidate(GONE); };
  /** @type {Array<[string, () => Promise<unknown>, typeof arrived | null, string[]]>} each act, the arrival it leaves standing — none where its camera leaves — and the links lit after it: a follow that faces lights the link its face came from, known at the act or learned in the air (FP-25); a jump to the entry behind, the link of the follow it crosses, as Back does */
  const acts = [
    ['HOME', () => GO.home(), null, []],
    ['WHOLE BOARD', () => GO.wholeBoard(), null, []],
    ['an account\'s region', () => GO.toAccount('1.0.1'), null, []],
    ['a jump to the entry behind', () => GO.toTrailEntry(2), null, [PASSAGE]],
    ['a LEAP the board answers for with nothing, known at the act: it never leaves', () => { gone(true); return GO.leapTo(GONE); }, arrived, [PASSAGE]],
    ['a LEAP the board answers for with nothing, learned in the air', () => { gone(false); return GO.leapTo(GONE); }, null, []],
    ['a follow of a link naming no far document, faced at once: it never leaves', () => GO.follow({ ...drawn(PASSAGE), far: '' }), arrived, [PASSAGE]],
    ['a follow of a dead reference, known at the act: it never leaves, lighting its own link', () => { gone(true); return GO.follow(drawn(DEAD)); }, arrived, [DEAD]],
    ['a follow of a dead reference, learned in the air', () => { gone(false); return GO.follow(drawn(DEAD)); }, null, [DEAD]],
  ];
  for (const [what, act, stands, own] of acts) {
    await landed();
    await run(act());
    assert.deepEqual(marks(), [stands, own], what);
  }
  await landed();
  await run(GO.back());
  assert.deepEqual(marks(), [null, [PASSAGE]], 'Back to the follow\'s departure lit its link');
  await run(GO.forward());
  assert.deepEqual(marks(), [arrived, [PASSAGE]], 'Forward across the follow: what it marked on arrival, the span outlined where FAR\'s text holds its far end and the link lit (issue #152)');
  await run(GO.back());
  await run(GO.leapTo(FAR, { how: 'leap', carry: SHARED, push: false }));
  assert.deepEqual(marks(), [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: null }, []], 'a carried LEAP that pushes nothing outlines its counterpart, the entry ahead of the cursor standing');
  await run(GO.forward());
  assert.deepEqual(marks(), [arrived, [PASSAGE]], 'Forward from behind it crosses the follow still: its arrival, and nothing of the carry');
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP carrying a passage lands at its counterpart in the text landed in and lights the arrival on it; Back to it lands there, its outline read again where that text holds the passage carried, no link lit (FP-21)', async () => {
  sharing();
  try {
    await run(GO.leapTo(D));
    await run(GO.leapTo(FAR, { how: 'leap', carry: SHARED }));
    assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: null }, 'the counterpart\'s first position and its positions — never the carried 11');
    const e = TRAIL.current();
    assert.deepEqual(e && [e.addr, e.pos, e.width], [FAR, 20, 5], 'the landing\'s entry at the counterpart');
    assert.deepEqual(departed()?.step, { kind: 'carry', from: D, to: FAR, spans: [{ prefix: D + '.0.1', ordinal: 11, width: 5 }] }, 'the entry departed records the carry: the passage by the permanent addresses of its bytes, never its positions (issue #152)');
    assert.ok(same(CAM.view(), GO.viewFor(FAR, 20)), 'the camera at the counterpart\'s view');
    assert.deepEqual([walkAt(), WALK.landedAt()], [['block', FAR, 19], 20], 'the walk on the paragraph holding it, at its position');
    assert.equal(faceShown(), null, 'no face');
    await run(GO.leapTo(D));
    await run(GO.back());
    assert.deepEqual(marks(), [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: null }, []], 'Back lights no link: the step it crossed, a LEAP, carried nothing — the landing\'s outline read again where FAR holds the passage carried (FP-21)');
    assert.deepEqual([walkAt(), WALK.landedAt()], [['block', FAR, 19], 20], 'Back lands on the counterpart');
  } finally { farOwn(); }
  assert.deepEqual(fake.unanswered, []);
});

test('Back across a carry lights the passage carried where the carry was made, no link lit — placed by identity where the text holds it now: moved, where it stands; in part, that part; gone, nothing and no face — the walk returned to it and the mirror told, until the next landing (issue #152)', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR, { how: 'leap', carry: SHARED }));
  await run(GO.leapTo(D));
  await run(GO.back());
  await run(GO.back());
  assert.equal(TRAIL.current()?.addr, D, 'Back to where the carry was made');
  assert.deepEqual(marks(), [{ addr: D, pos: 11, runs: [{ pos: 11, width: 5 }], link: null }, []], 'the passage carried outlined where D holds it, no link lit');
  assert.deepEqual([walkAt(), WALK.landedAt()], [['block', D, 11], 11], 'the walk returned to its first stretch, in view at D\'s reading scale');
  assert.deepEqual(GO.backLight(), { addr: D, runs: [{ pos: 11, width: 5 }], end: null }, 'where Back\'s light stands, for the mirror');
  try {
    // D as a later edit leaves it: three bytes minted before its own, so the passage carried from D's 11 stands at 14
    REC.takeImage(D, 1, [{ iStart: '1.0.1.0.99.0.1.1', width: 3 }, { iStart: D + '.0.1.1', width: NEAR_EXTENT - 3 }]);
    assert.deepEqual(GO.arrivalMark(), { addr: D, pos: 14, runs: [{ pos: 14, width: 5 }], link: null }, 'placed again as it is read: at 14, never the 11 it was carried from');
    // D holding its own first thirteen bytes alone: the passage's first three
    REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: 13 }, { iStart: '1.0.1.0.99.0.1.1', width: NEAR_EXTENT - 13 }]);
    assert.deepEqual(GO.arrivalMark(), { addr: D, pos: 11, runs: [{ pos: 11, width: 3 }], link: null }, 'the part of it the text still holds');
    REC.takeImage(D, 1, [{ iStart: '1.0.1.0.99.0.1.1', width: NEAR_EXTENT }]);
    assert.deepEqual([GO.arrivalMark(), GO.backLight(), faceShown()], [null, null, null], 'none of it: nothing lit, and no face');
  } finally {
    REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: NEAR_EXTENT }]);
  }
  await run(GO.home());
  assert.deepEqual([marks(), GO.backLight()], [[null, []], null], 'gone at the next landing');
  assert.deepEqual(fake.unanswered, []);
});

test('Forward across a carry lights the passage in the text the LEAP was made to, placed by identity where that text holds it now (issue #152)', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR, { how: 'leap', carry: SHARED }));
  await run(GO.back());
  assert.deepEqual(GO.arrivalMark(), { addr: D, pos: 11, runs: [{ pos: 11, width: 5 }], link: null }, 'Back: the passage at D');
  try {
    // FAR's image as the carry's compare reads it: D's 11th to 15th bytes at its 20th
    REC.takeImage(FAR, 1, [{ iStart: FAR + '.0.1.1', width: 19 }, { iStart: D + '.0.1.11', width: 5 }, { iStart: FAR + '.0.1.25', width: FAR_EXTENT - 24 }]);
    await run(GO.forward());
    assert.equal(TRAIL.current()?.addr, FAR);
    assert.deepEqual(marks(), [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: null }, []], 'the passage outlined where FAR holds it, no link lit');
    assert.equal(GO.backLight(), null, 'Forward\'s light is no place Back left from: the mirror marks none');
  } finally {
    REC.takeImage(FAR, 1, [{ iStart: FAR + '.0.1.1', width: FAR_EXTENT }]);
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP carrying a passage the text landed in holds in two stretches marks both, in the text\'s order, each labelled by its piece in the passage\'s order, and lands at piece 1, where the passage begins, its line the label of the run it stands at, saying all of it is there in another order, offering the first edition beside it and FAR\'s first member, which holds it in one piece; that offer LEAPs carrying it there, the outline alone (issues #153, #158)', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR, { how: 'leap', carry: MOVED }));
  assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: 25, runs: [{ pos: 2, width: 5 }, { pos: 25, width: 5 }], link: null }, 'every stretch of it the text holds, the landing at the counterpart of its first five positions');
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width], [FAR, 25, 5], 'the landing\'s entry at the stretch landed on');
  assert.deepEqual(departed()?.step, { kind: 'carry', from: D, to: FAR, spans: [{ prefix: D + '.0.1', ordinal: 1, width: 10 }] }, 'the entry departed records the passage whole, by identity');
  assert.ok(same(CAM.view(), GO.viewFor(FAR, 25)), 'the camera at that stretch\'s view');
  assert.deepEqual([walkAt(), WALK.landedAt()], [['block', FAR, 19], 25], 'the walk on the paragraph holding it, at its position');
  const piece = (/** @type {number} */ k) => t('L.piece', { k, n: 2 }), words = [piece(1), t('L.piece.all'), t('L.piece.order')].join(' · ');
  assert.deepEqual([GO.landing()?.said?.state, GO.landingLine(), GO.described()], ['pieces', words, { addr: FAR, pos: 25, words, runs: [{ pos: 2, width: 5, words: piece(2) }, { pos: 25, width: 5, words: piece(1) }] }],
    'all of it, its second half first: "piece 1 of 2 · all of the passage · in another order", the description of the item landed on, and "piece 2 of 2" the run before it in the text');
  assert.deepEqual(GO.landing()?.beside, { a: D, held: { posA: 1, widthA: 10, ids: [{ prefix: D + '.0.1', ordinal: 1, width: 10 }] } }, 'the first edition holds it whole: read side by side with it, the passage held there by its bytes, set level with its counterpart here');
  for (let i = 0; i < 50 && GO.landing()?.version == null; i++) await new Promise((r) => setTimeout(r, 0));
  assert.equal(GO.landing()?.version, 1, 'the latest member holding it in one piece, other than the text landed in: FAR.1');
  const at = CAM.view();
  GO.landingAct('version');
  let flew = false;
  for (let i = 0; i < 200 && (GO.arrivalMark()?.addr !== FAR1 || walkAt()?.[1] !== FAR1 || CAM.flying()); i++) { await new Promise((r) => setTimeout(r, 0)); flew = flew || CAM.flying(); if (CAM.flying()) CAM.step(Infinity); }
  assert.deepEqual([TRAIL.current()?.addr, GO.arrivalMark(), GO.landingLine()], [FAR1, { addr: FAR1, pos: 2, runs: [{ pos: 2, width: 10 }], link: null }, null], 'the move to it carries the passage: its counterpart outlined there, in one piece, no line');
  assert.ok(!flew && same(CAM.view(), at), 'a version move (issue #154): no flight, the camera where it stood');
  assert.deepEqual([GO.shownIn(FAR), walkAt(), departed()?.step?.kind], [FAR1, ['block', FAR1, 1], 'carry'], 'the box takes the member, the walk on the line the landing stood on, the entry departed recording the carry');
  await run(GO.leapTo(FAR));
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP carrying a passage the text landed in holds only part of keeps its outline and says so in a line — "what you selected" where it is the selection, "the text you were reading" where it is not — offering the text it came from beside it; the line stands while a card opens at the landing and leaves at the next landing (issue #153)', async () => {
  for (const selected of [true, false]) {
    await run(GO.leapTo(D));
    await run(GO.leapTo(FAR, { how: 'leap', carry: { ...PARTIAL, selected } }));
    assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: 25, runs: [{ pos: 25, width: 5 }], link: null }, 'the part FAR holds outlined, as before');
    const words = t('L.held.part', { subject: t(selected ? 'L.held.selected' : 'L.held.reading'), where: t('L.held.current', { D: FAR }) });
    assert.deepEqual([GO.landing()?.said?.state, GO.landingLine()], ['part', words], `"only part of ${selected ? 'what you selected' : 'the text you were reading'} is in ⟨D⟩'s current text", no places counted`);
    assert.ok(!/missing|removed|deleted|compare/.test(words), `never "missing", "removed", "deleted" or "compare": ${words}`);
    assert.deepEqual(GO.landing()?.beside, { a: D, held: { posA: 1, widthA: 12, ids: [{ prefix: D + '.0.1', ordinal: 1, width: 12 }] } }, 'the first edition holds it whole: read side by side with it, the passage held there by its bytes');
    for (let i = 0; i < 50 && fake.asked.slice(-1)[0] !== FAKE.keyOf('op', { frame: carried(PARTIAL, FAR1, FAR_EXTENT) }); i++) await new Promise((r) => setTimeout(r, 0));
    await new Promise((r) => setTimeout(r, 0));
    assert.equal(GO.landing()?.version, null, 'FAR\'s first member holds none of it: no version offered');
  }
  await ANATOMY.open(drawn(PASSAGE), null);
  assert.deepEqual([HOST.currentState()?.id, GO.landingLine() != null], ['anatomy:' + PASSAGE, true], 'a card opened at the landing stands, and the line with it: the line is no overlay a card takes the place of');
  HOST.dismiss();
  await run(GO.home());
  assert.deepEqual([GO.landing(), GO.landingLine(), GO.described()], [null, null, null], 'the next landing: the line gone with the outline');
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP carrying a passage whose compare the board refuses for its size asks it again over each half of the text landed in, and lands as their pairs place it (issue #153)', async () => {
  await run(GO.leapTo(D));
  const from = fake.asked.length;
  await run(GO.leapTo(FAR, { how: 'leap', carry: SIZED }));
  const asked = fake.asked.slice(from).filter((k) => k.includes('"op":"compare"'));
  assert.deepEqual(asked, [carried(SIZED, FAR, FAR_EXTENT), carried(SIZED, FAR, FAR_EXTENT / 2), carried(SIZED, FAR, FAR_EXTENT / 2, FAR_EXTENT / 2 + 1)].map((frame) => FAKE.keyOf('op', { frame })), 'the whole, refused, then each half');
  assert.deepEqual([GO.arrivalMark(), GO.landingLine()], [{ addr: FAR, pos: 30, runs: [{ pos: 30, width: 4 }], link: null }, null], 'the second half holds it whole at 30: outlined there, in one piece, no line — never "couldn\'t tell"');
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP carrying a passage whose compare the board does not answer lands at the place asked, unmarked, its line saying it could not tell — the board unreachable — with "try again", which reads again and lands at the counterpart, the entry it landed in settled there (issue #153)', async () => {
  outage = true;
  try {
    await run(GO.leapTo(D));
    await run(GO.leapTo(FAR, { how: 'leap', carry: UNANSWERED }));
    assert.deepEqual([GO.arrivalMark(), walkAt(), faceShown()], [null, ['document', FAR, null], null], 'unmarked, at the document as asked, no face');
    const words = t('L.held.unknown', { subject: t('L.held.reading'), where: t('L.held.current', { D: FAR }), reason: t('F.daemon.unreachable') });
    assert.deepEqual([GO.landing()?.said?.state, GO.landingLine(), GO.landingOffers()], ['unknown', words, { steps: false, again: true, version: false }], '"couldn\'t tell whether ⟨D⟩\'s current text holds the text you were reading: board unreachable", and "try again"');
    assert.deepEqual(GO.described(), { addr: FAR, pos: FAR_HEAD, words, runs: [] }, 'the line the description of the document landed on');
    const entry = TRAIL.current(), n = TRAIL.length();
    outage = false;
    GO.landingAct('again');
    for (let i = 0; i < 200 && (!GO.arrivalMark() || CAM.flying()); i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
    assert.deepEqual([GO.arrivalMark(), GO.landingLine(), GO.landingOffers()], [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 4 }], link: null }, null, { steps: false, again: false, version: false }], 'answered: its counterpart outlined, in one piece, no line');
    assert.deepEqual([TRAIL.length(), TRAIL.current() === entry, entry && [entry.pos, entry.width]], [n, true, [20, 4]], 'no trail move of its own: the entry it landed in settled at the counterpart');
    assert.ok(same(CAM.view(), GO.viewFor(FAR, 20)), 'the camera at the counterpart');
  } finally { outage = true; }
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP carrying a passage the text landed in holds none of lands at its first block, unmarked, faced as a floating end with no act; Back onto its entry restores the landing, which tells the face again (FP-21)', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR, { how: 'leap', carry: UNSHARED }));
  assert.equal(GO.arrivalMark(), null, 'nothing marked');
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width], [FAR, 1, null], 'the landing\'s entry at the first block');
  assert.deepEqual(departed()?.step, { kind: 'carry', from: D, to: FAR, spans: [{ prefix: D + '.0.1', ordinal: 1, width: 8 }] }, 'the entry departed records the carry all the same: Back lights the passage where it was carried from, whatever FAR holds of it');
  assert.ok(same(CAM.view(), GO.viewFor(FAR, 1)), 'the camera at the document\'s head');
  assert.deepEqual(walkAt(), ['block', FAR, 1]);
  const f = faceShown();
  assert.ok(f && f.id === 'face:floating' && f.html.includes('data-string="F.floating"') && f.html.includes(addressedHTML(t('F.floating', { D: FAR }))), `the dead end's words: ${f && f.html}`);
  assert.equal(f && f.acts, false, 'no act: the versions list holds no passage of another document');
  assert.deepEqual([GO.landingLine(), GO.described()], [null, { addr: FAR, pos: 1, words: t('F.floating', { D: FAR }), runs: [] }], 'no line: the dead end\'s face says it, and its words are the description of the item landed on (issue #153)');
  assert.equal(HOST.currentState()?.told, true, 'its face told by that description, never repeated by the status region');
  await run(GO.leapTo(D));
  assert.equal(faceShown(), null, 'the next landing dismisses it');
  await run(GO.leapTo(FAR2, { how: 'leap', carry: UNSHARED }));
  const m = faceShown();
  assert.ok(m && m.html.includes('data-string="F.floating.member"') && m.html.includes(esc(t('F.floating.member', { k: 2 }))), `at a member, in the member's own words: ${m && m.html}`);
  assert.equal(GO.described()?.words, t('F.floating.member', { k: 2 }), 'the description in the member\'s own words');
  await run(GO.leapTo(D));
  await run(GO.back());
  assert.deepEqual([faceShown()?.id, HOST.currentState()?.told, GO.described(), walkAt()], ['face:floating', true, { addr: FAR2, pos: 1, words: t('F.floating.member', { k: 2 }), runs: [] }, ['block', FAR2, 1]],
    'Back onto its entry restores the landing as the reader left it: the face shown again, told by the description of the item the walk returns to, the head, never by the status region as well');
  assert.deepEqual(fake.unanswered, []);
});

test('a Back made while a carried passage\'s compare reads goes back from the LEAP\'s entry, which stands ahead at the counterpart the read placed, the arrival out and the passage lit where the carry was made', async () => {
  await run(GO.leapTo(D));
  const at = CAM.view(), n = TRAIL.length();
  const release = fake.hold('op', { frame: carried(SHARED, FAR, FAR_EXTENT) });
  const leap = GO.leapTo(FAR, { how: 'leap', carry: SHARED });
  await run(GO.back());
  release();
  await run(leap);
  const far = TRAIL.all()[n];
  assert.deepEqual(addrs().slice(n - 1), [D, FAR], 'the LEAP\'s entry after D\'s');
  assert.equal(TRAIL.cursorIndex(), n - 1, 'the cursor on D\'s');
  assert.deepEqual(far && [far.pos, far.width], [20, 5], 'at the counterpart the read placed');
  assert.ok(far && same(far.view, GO.viewFor(FAR, 20)), 'at that span\'s view');
  assert.deepEqual(marks(), [{ addr: D, pos: 11, runs: [{ pos: 11, width: 5 }], link: null }, []], 'the LEAP landed nowhere, its arrival out; the passage lit where the carry was made, the reader having stood there (issue #152)');
  assert.ok(same(CAM.view(), at), 'the camera at D');
  assert.deepEqual(fake.unanswered, []);
});

test('a teleport a key made draws the focus ring at its landing; one the pointer made puts it out', async () => {
  /** the teleport run to its end, and whether the ring stands at its landing */
  const ring = async (/** @type {Promise<unknown>} */ act) => { await run(act); return WALK.ringShown(); };
  assert.equal(await ring(GO.leapTo(D, { how: 'key', byKey: true })), true, 'Enter on a document');
  assert.equal(await ring(GO.leapTo(FAR, { how: 'click' })), false, 'a click on a place');
  assert.equal(await ring(GO.back(true)), true, 'Mod+[');
  assert.equal(await ring(GO.forward()), false, 'a click on › forward');
  assert.equal(await ring(GO.follow(drawn(PASSAGE), true)), true, 'Mod+Enter');
  assert.equal(await ring(GO.wholeBoard(true)), true, 'Mod+0');
  assert.equal(await ring(GO.home(true)), true, 'Mod+Shift+H');
  assert.equal(await ring(GO.toAccount('1.0.1', true)), true, 'Enter on an account');
  assert.equal(await ring(GO.toTrailEntry(2, true)), true, 'Mod+2');
  assert.equal(TRAIL.current()?.label, 'HOME', 'Mod+2 moved the cursor to HOME\'s entry');
  assert.deepEqual(fake.unanswered, []);
});

test('a Back or a jump made while a LEAP reads acts from the LEAP\'s entry: the entries before it keep their views, the LEAP\'s stands ahead at its landing, and the LEAP lands nowhere', async () => {
  for (const [what, act] of /** @type {Array<[string, () => Promise<boolean>]>} */ ([['Back', () => GO.back()], ['a jump to the entry behind', () => GO.toTrailEntry(2)]])) {
    unread();
    await run(GO.leapTo(D));
    const at = CAM.view(), before = TRAIL.all().map((e) => ({ addr: e.addr, view: { ...e.view } }));
    const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
    const leap = GO.leapTo(C);
    const claimed = TRAIL.current()?.addr;
    await run(act());
    release();
    await run(leap);
    const after = TRAIL.all();
    assert.equal(claimed, C, `${what}: the LEAP's entry stands as the LEAP is made`);
    assert.deepEqual(after.map((e) => e.addr), [...before.map((e) => e.addr), C], `${what}: the LEAP's entry after D's, nothing dropped`);
    assert.equal(TRAIL.cursorIndex(), before.length - 1, `${what}: the cursor on D's`);
    assert.ok(before.slice(0, -1).every((b, i) => same(after[i].view, b.view)), `${what}: the entries before D's keep their views`);
    assert.ok(same(after[before.length - 1].view, at), `${what}: D's at the view the LEAP departed`);
    assert.ok(same(after[before.length].view, GO.viewFor(C, null)), `${what}: the LEAP's at its landing`);
    assert.ok(same(CAM.view(), at), `${what}: the camera at D, where the act landed`);
    assert.deepEqual(walkAt(), ['document', D, null], `${what}: the walk on D`);
  }
  await run(GO.forward());
  assert.ok(same(CAM.view(), GO.viewFor(C, null)), 'Forward lands at the LEAP\'s landing');
  assert.deepEqual(walkAt(), ['document', C, null]);
  assert.deepEqual(fake.unanswered, []);
});

test('a Back made while a follow reads goes back from the follow\'s entry, which stands ahead at the span its far end projects to, the arrival out and the link lit where the follow was made, the walk returned to its end', async () => {
  await run(GO.leapTo(D));
  const at = CAM.view(), n = TRAIL.length();
  const release = fake.hold('op', { frame: F.project(PASSAGE, 2, FAR) });
  const following = GO.follow(drawn(PASSAGE));
  await run(GO.back());
  release();
  await run(following);
  const far = TRAIL.all()[n];
  assert.deepEqual(addrs().slice(n - 1), [D, FAR], 'the follow\'s entry after D\'s');
  assert.equal(TRAIL.cursorIndex(), n - 1, 'the cursor on D\'s');
  assert.deepEqual(far && [far.pos, far.width], [20, 5], 'at the span its far end projects to');
  assert.ok(far && same(far.view, GO.viewFor(FAR, 20)), 'at that span\'s view');
  assert.deepEqual(marks(), [null, [PASSAGE]], 'the arrival out — the follow landed nowhere — and its link lit where it was made: the reader stood at the follow\'s departure (issue #152)');
  assert.ok(same(CAM.view(), at), 'the camera at D');
  assert.deepEqual(walkAt(), ['link', D, 11], 'the walk on the link\'s end the follow was made at');
  assert.deepEqual(fake.unanswered, []);
});

test('a Back made while a floating end\'s projection reads goes back from the follow\'s entry, which stands ahead at the far document\'s head; no face shows, the link lit where the follow was made', async () => {
  takeFloat();
  await run(GO.leapTo(D));
  const at = CAM.view(), n = TRAIL.length();
  const release = fake.hold('op', { frame: F.project(FLOAT, 2, FAR) });
  const following = GO.follow(drawn(FLOAT));
  await run(GO.back());
  release();
  await run(following);
  const far = TRAIL.all()[n];
  assert.deepEqual(addrs().slice(n - 1), [D, FAR], 'the follow\'s entry after D\'s');
  assert.equal(TRAIL.cursorIndex(), n - 1, 'the cursor on D\'s');
  assert.deepEqual(far && [far.pos, far.width], [FAR_HEAD, null], 'at the head');
  assert.ok(far && same(far.view, GO.viewFor(FAR, FAR_HEAD)), 'at the head\'s view');
  assert.equal(faceShown(), null, 'no face over the place Back landed: the follow landed nowhere');
  assert.deepEqual(marks(), [null, [FLOAT]], 'nothing outlined; the link lit where the follow was made (issue #152)');
  assert.ok(same(CAM.view(), at), 'the camera at D');
  assert.deepEqual(walkAt(), ['link', D, 4], 'the walk on the link\'s end the follow was made at');
  assert.deepEqual(fake.unanswered, []);
});

test('an act made while a LEAP reads stands after the LEAP\'s entry and lands; the LEAP whose read answers after it lands nowhere', async () => {
  /** @type {Array<[string, () => Promise<unknown>, string]>} each act, and the place its entry names */
  const acts = [
    ['a LEAP', () => GO.leapTo(FAR), FAR],
    ['a follow', () => GO.follow(drawn(PASSAGE)), FAR],
    ['HOME', () => GO.home(), '1.0.1'],
    ['WHOLE BOARD', () => GO.wholeBoard(), '1'],
    ['an account\'s region', () => GO.toAccount('1.0.1'), '1.0.1'],
  ];
  for (const [what, act, addr] of acts) {
    unread();
    await run(GO.leapTo(D));
    const n = TRAIL.length();
    const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
    const leap = GO.leapTo(C);
    await run(act());
    const landed = CAM.view(), walked = walkAt();
    release();
    await run(leap);
    assert.deepEqual(addrs().slice(n - 1), [D, C, addr], `${what}: the trail holds the moves in the order they were made`);
    assert.equal(TRAIL.cursorIndex(), n + 1, `${what}: the cursor on its entry`);
    assert.ok(walked && walked[1] === addr && same(CAM.view(), landed), `${what}: the camera and the walk where it landed`);
    assert.deepEqual(walkAt(), walked, `${what}: the walk where it landed`);
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP to an address the page already knows the board says nothing about never leaves: no flight, no entry, nothing asked, the fifth cell at the act\'s site — the LEAP box\'s at the viewport\'s corner — in the place of the card standing there, the camera and the walk where it was made (FP-25; issue #137)', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR));
  await run(GO.back());
  REC.takeRefused(GONE, 'unregistered');
  const before = addrs(), cursor = TRAIL.cursorIndex(), at = CAM.view(), walked = walkAt(), from = fake.asked.length;
  /** @type {boolean | null} how the card standing at the act ended: replaced, or dismissed */
  let ended = null;
  HOST.show({ kind: 'card', id: 'a card', anchor: null, html: '<span class="label">a card</span>', acts: {}, onDismiss: (replaced) => { ended = replaced; } });
  const leap = GO.leapTo(GONE);
  assert.deepEqual([CAM.flying(), GO.inAir()], [false, false], 'no flight');
  assert.equal(await leap, null, 'it lands in no document');
  assert.deepEqual([addrs(), TRAIL.cursorIndex()], [before, cursor], 'no entry: FAR\'s ahead of the cursor kept');
  assert.deepEqual(fake.asked.slice(from), [], 'nothing asked of the board');
  assert.deepEqual([faceShown()?.id, HOST.currentState()?.anchor, ended], ['face:doc_not_registered', null, true], 'the fifth cell at the viewport\'s corner, in the place of the card, which it replaced');
  assert.ok(same(CAM.view(), at), 'the camera where the LEAP was made');
  assert.deepEqual(walkAt(), walked, 'the walk where the LEAP was made');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP whose read learns the board says nothing about its address keeps its entry, numbered as it was made: its camera left at the act for the address\'s place, the fifth cell faced there, the camera staying where it went and the walk on the address, the entry holding the notice there; made with the cursor behind the newest entry, it drops the entry ahead as any push does (FP-25; issue #136)', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR));
  await run(GO.back());
  REC.invalidate(GONE);
  const before = addrs(), cursor = TRAIL.cursorIndex();
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(GONE) });
  const leap = GO.leapTo(GONE);
  const went = GO.viewFor(GONE, null), there = { span: { addr: GONE, pos: 1 }, sign: GONE };
  assert.deepEqual([CAM.flying(), same(CAM.destination(), went), GO.inAir()], [true, true, true], 'the camera left at the act, for the address\'s place');
  assert.deepEqual([HOST.currentState()?.id, HOST.currentState()?.anchor], ['reading:' + GONE, there], 'reading where the camera went');
  release();
  await run(leap);
  assert.equal(REC.doc(GONE).refused, 'unregistered', 'the board answered for it with nothing');
  assert.deepEqual(addrs(), [...before.slice(0, cursor + 1), GONE], 'its entry after D\'s, FAR\'s ahead of the cursor dropped as any push drops it');
  assert.equal(TRAIL.cursorIndex(), cursor + 1, 'the cursor on its entry');
  const e = TRAIL.current();
  assert.deepEqual(e && e.notice && [e.notice.face, e.notice.addr, e.notice.site], ['unregistered', GONE, there], 'holding the fifth cell where the camera went');
  assert.ok(e && same(e.view, went), 'its view where the camera went');
  assert.deepEqual([faceShown()?.id, HOST.currentState()?.anchor], ['face:doc_not_registered', there], 'the fifth cell shown there');
  assert.ok(same(CAM.view(), went), 'the camera staying where it went');
  assert.deepEqual([walkAt(), GO.inAir()], [['document', GONE, null], false], 'the walk on the address\'s own node; the jump ended, never landed');
  const item = WALK.mirrorItem(WALK.mirrorIndex()) || '';
  assert.ok(item.includes(t('L.far.unregistered')) && !item.includes(t('F.published')), `the mirror names what the read learned, never "published": ${item}`);
  assert.deepEqual(fake.unanswered, []);
});

test('a board already marked unreachable gets no flight: a LEAP that must read faces "board unreachable" at the act\'s site, no entry and nothing asked; one whose text the page holds reads nothing and flies (issue #137\'s design decision)', async () => {
  await run(GO.leapTo(D));
  unread();
  REC.setDaemon('unreachable');
  try {
    const n = TRAIL.length(), at = CAM.view(), from = fake.asked.length;
    const site = { span: { addr: D, pos: 11, width: 5 } };
    const leap = GO.leapTo(C, { site });
    assert.deepEqual([CAM.flying(), GO.inAir()], [false, false], 'no flight');
    await run(leap);
    assert.deepEqual([TRAIL.length(), same(CAM.view(), at), fake.asked.slice(from)], [n, true, []], 'no entry, the camera where it was, nothing asked');
    assert.deepEqual([faceShown()?.id, HOST.currentState()?.anchor], ['face:unreachable', { ...site, sign: D }], 'faced at the act\'s site');
    assert.ok(hostEl.innerHTML.includes(esc(t('F.daemon.unreachable'))), `in the daemon's words: ${hostEl.innerHTML}`);
    await run(GO.leapTo(FAR));
    assert.equal(TRAIL.current()?.addr, FAR, 'a LEAP to a document whose text the page holds flies');
  } finally { REC.setDaemon('running'); }
  assert.deepEqual(fake.unanswered, []);
});

test('Forward to a LEAP\'s entry while it reads lands once the read answers, at the landing the read placed', async () => {
  unread();
  await run(GO.leapTo(D));
  // a position in C's last paragraph: the unread record places it at the document's middle, the read far down it
  const last = C_TEXT.lastIndexOf('A last') + 1;
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
  const leap = GO.leapTo(C, { pos: last });
  const placed = GO.viewFor(C, last);
  await run(GO.back());
  const forward = GO.forward();
  release();
  await run(leap);
  await run(forward);
  const landing = GO.viewFor(C, last);
  assert.ok(!same(placed, landing), 'the read moves the landing: the record unread places it elsewhere');
  assert.ok(same(CAM.view(), landing), 'Forward lands where the read placed it');
  assert.equal(TRAIL.current()?.addr, C);
  assert.deepEqual(walkAt(), ['block', C, last], 'the walk on the paragraph the LEAP named');
  assert.deepEqual(fake.unanswered, []);
});

// ---- THE JUMP (FP-25) --------

/** a key as the platform delivers it at the plane: its key, and its modifiers */
const keyOf = (/** @type {string} */ key, /** @type {{metaKey?: boolean, ctrlKey?: boolean, shiftKey?: boolean}} */ mods = {}) => /** @type {any} */ ({ type: 'keydown', key, keyCode: 0, isComposing: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault() {}, ...mods });
/** the command modifier held, as this platform spells it (D5 §0: ⌘ on a Mac, Ctrl elsewhere) */
const MOD = KEYS.MAC ? { metaKey: true } : { ctrlKey: true };
/** the plane, a key making the act */
const PLANE = /** @type {const} */ ({ where: 'plane', byKey: true });
/** the keys held for a landing made, and every flight they and the jump start stepped to its end */
async function drained() {
  for (let i = 0; i < 400 && (KEYS.holding() > 0 || CAM.flying() || GO.inAir()); i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.deepEqual([KEYS.holding(), CAM.flying(), GO.inAir()], [0, false, false], 'every held key made, every flight landed');
}

test('a LEAP to a document whose text the page does not hold flies at once for the place its unread record gives the position, its reading face there and the walk on the document, in the air; its read answering, the camera goes on to the place the read gives the position, the walk on its span, and the jump lands (FP-25; issue #137)', async () => {
  unread();
  await run(GO.leapTo(D));
  const last = C_TEXT.lastIndexOf('A last') + 1;
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
  const leap = GO.leapTo(C, { pos: last });
  const left = GO.viewFor(C, last);
  assert.deepEqual([CAM.flying(), same(CAM.destination(), left), GO.inAir()], [true, true, true], 'the camera left at the act, for the place the unread record gives the position: in the air');
  await new Promise((r) => setTimeout(r, 0)); // the walk's levels read, no flight stepped
  assert.deepEqual([walkAt(), HOST.currentState()?.anchor], [['document', C, null], { span: { addr: C, pos: last }, sign: C }], 'the walk on the document, its reading face at the place it left for');
  release();
  await run(leap);
  const placed = GO.viewFor(C, last);
  assert.ok(!same(placed, left), 'the read moves the place');
  assert.ok(same(CAM.view(), placed), 'the camera went on to the place the read gave');
  assert.deepEqual([walkAt(), GO.inAir(), HOST.currentState()], [['block', C, last], false, null], 'the walk on its span, the jump landed, the reading face gone');
  assert.deepEqual(fake.unanswered, []);
});

test('a follow flies at once for its far document and goes on to the span its far end projects to once the projection answers, marking it and lighting its link (FP-25)', async () => {
  await run(GO.leapTo(D));
  const release = fake.hold('op', { frame: F.project(PASSAGE, 2, FAR) });
  const following = GO.follow(drawn(PASSAGE));
  await new Promise((r) => setTimeout(r, 0)); // the walk's levels read, no flight stepped
  assert.deepEqual([CAM.flying(), same(CAM.destination(), GO.viewFor(FAR, null)), GO.inAir(), walkAt()], [true, true, true, ['document', FAR, null]], 'the camera left at the act for the far document, the walk on it');
  release();
  await run(following);
  assert.ok(same(CAM.view(), GO.viewFor(FAR, 20)), 'gone on to the span its far end projects to');
  assert.deepEqual([marks(), GO.inAir()], [[{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE }, [PASSAGE]], false], 'marked, its link lit, landed');
  assert.deepEqual(fake.unanswered, []);
});

test('the reader taking the camera over while a jump is in the air lands it where the camera is: its read, answering, marks its passage where it falls and moves neither the camera nor the walk, and its entry keeps the view the reader left it at — answered before the reader leaves it or after, Forward returns there (FP-25)', async () => {
  /** a follow of PASSAGE made from D, its projection held, the reader taking the camera over half way: the view and the walk the reader left */
  const takenOver = async () => {
    await run(GO.leapTo(D));
    const release = fake.hold('op', { frame: F.project(PASSAGE, 2, FAR) });
    const following = GO.follow(drawn(PASSAGE));
    const flight = CAM.cam.anim;
    assert.ok(flight, 'the camera left at the act');
    CAM.step(flight.t0 + flight.ms / 2);
    await new Promise((r) => setTimeout(r, 0)); // the walk's levels read, the flight stepped no further
    // a wheel as APP-INPUT takes it: the camera taken over, then panned
    GO.takeOver(); CAM.panBy(40, 30);
    assert.deepEqual([walkAt(), GO.inAir()], [['document', FAR, null], false], 'the walk where the jump put it as its camera left; the jump landed where the camera is');
    return { release, following, reader: CAM.view(), walked: walkAt() };
  };
  // answered while the reader stands at its entry
  let t = await takenOver();
  t.release();
  await run(t.following);
  assert.deepEqual(marks(), [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE }, [PASSAGE]], 'its passage marked where it falls, its link lit');
  assert.ok(same(CAM.view(), t.reader) && !CAM.flying(), 'the camera where the reader left it');
  assert.deepEqual(walkAt(), t.walked, 'the walk where it stood');
  assert.deepEqual([TRAIL.current()?.addr, TRAIL.current()?.pos], [FAR, 20], 'its entry holds the passage');
  await run(GO.back());
  await run(GO.forward());
  assert.ok(same(CAM.view(), t.reader), 'Back then Forward return to the view the reader left the entry at');
  // answered after the reader left its entry by Back
  t = await takenOver();
  await run(GO.back());
  t.release();
  await run(t.following);
  await run(GO.forward());
  assert.ok(same(CAM.view(), t.reader), 'answered after Back: Forward returns to the view the reader left the entry at, never the one the read placed');
  assert.equal(TRAIL.current()?.pos, 20, 'its entry holds the passage all the same');
  assert.deepEqual(fake.unanswered, []);
});

test('keys pressed while a jump is in the air wait for its landing and are made there in order; a jump that never lands — the reader took the camera over, a Back abandoned it, its read failed — drops them; a navigation act is made at once (FP-25; issue #137)', async () => {
  /** the elements of C's text the walk steps through, by their first positions */
  const spans = () => { const d = REC.doc(C); return d.blocks.filter((b) => b.text.trim() !== '').map((b) => b.pos); };
  // made at the landing, in order
  unread();
  await run(GO.leapTo(D));
  let release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
  let leap = GO.leapTo(C, { pos: 1 });
  const pressed = [KEYS.dispatch(keyOf('ArrowDown'), PLANE), KEYS.dispatch(keyOf('ArrowDown'), PLANE)];
  assert.equal(KEYS.holding(), 2, 'both held as they are pressed');
  assert.deepEqual(await Promise.all(pressed), [true, true], 'taken');
  assert.deepEqual([KEYS.holding(), walkAt()], [2, ['document', C, null]], 'held: the walk where the jump put it');
  release();
  await run(leap);
  await drained();
  assert.deepEqual(walkAt(), ['block', C, spans()[2]], 'made at the landing, in order: two spans on from the one landed on');
  // dropped where the reader takes the camera over, where a Back abandons the jump, and where its read fails
  /** @type {Array<[string, () => Promise<unknown>, () => (Array<string | number | null> | null)]>} each jump, what ends it without landing, and where the walk stands after */
  const ends = [
    ['the reader took the camera over', async () => { GO.takeOver(); CAM.panBy(10, 10); }, () => ['document', C, null]],
    ['a Back abandoned it', () => run(GO.back()), () => walkAt()],
  ];
  for (const [what, end, after] of ends) {
    unread();
    await run(GO.leapTo(D));
    release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
    leap = GO.leapTo(C, { pos: 1 });
    const key = KEYS.dispatch(keyOf('ArrowDown'), PLANE);
    assert.equal(KEYS.holding(), 1, `${what}: held as it is pressed`);
    await key;
    await end();
    const want = after();
    release();
    await run(leap);
    await drained();
    assert.deepEqual(walkAt(), want, `${what}: the key held was dropped`);
  }
  REC.invalidate(GONE);
  await run(GO.leapTo(D));
  release = fake.hold('op', { frame: F.retrieveDocVSpanSet(GONE) });
  leap = GO.leapTo(GONE);
  const key = KEYS.dispatch(keyOf('ArrowDown'), PLANE);
  assert.equal(KEYS.holding(), 1, 'its read failing: held as it is pressed');
  await key;
  release();
  await run(leap);
  await drained();
  assert.deepEqual(walkAt(), ['document', GONE, null], 'its read failed: the key held was dropped, the walk where the camera went');
  // a navigation act at once
  unread();
  await run(GO.leapTo(D));
  release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
  leap = GO.leapTo(C);
  const cursor = TRAIL.cursorIndex();
  void KEYS.dispatch(keyOf('[', MOD), PLANE);
  assert.equal(TRAIL.cursorIndex(), cursor - 1, 'Mod+[ moved the cursor at once, the jump in the air abandoned');
  release();
  await run(leap);
  await drained();
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP to an address on a board the plane does not draw reaches for it: its entry taken at the act, the camera still, a reaching face at the act\'s site in the place of what stands there; Esc and Back abandon it, its entry given back and its answer moving nothing; its read refused, it faces at the site and gives its entry back; its read answered, the camera leaves (FP-25; issue #137)', async () => {
  await run(GO.leapTo(D));
  const site = { span: { addr: D, pos: 11, width: 5 } }, signed = { ...site, sign: D };
  const before = addrs(), cursor = TRAIL.cursorIndex(), at = CAM.view();
  /** a card shown over the reaching face, then Esc twice: the card first, the innermost thing, then the jump */
  const escAfterACard = async () => {
    HOST.show({ kind: 'card', id: 'a card', anchor: null, html: '<span class="label">a card</span>', acts: {} });
    KEYS.esc();
    assert.deepEqual([HOST.currentState(), GO.isReaching()], [null, true], 'the first Esc closes the card shown over the reaching face, the jump reaching on');
    KEYS.esc();
  };
  for (const [what, abandon] of /** @type {Array<[string, () => Promise<unknown>]>} */ ([['Esc', async () => KEYS.esc()], ['Back', () => run(GO.back())], ['Esc after anything nearer', escAfterACard]])) {
    REC.invalidate(REACH);
    const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(REACH) });
    const leap = GO.leapTo(REACH, { site });
    assert.deepEqual([addrs(), CAM.flying(), GO.inAir(), GO.isReaching()], [[...before, REACH], false, false, true], `${what}: its entry taken at the act, the camera still, nothing in the air`);
    assert.deepEqual([HOST.currentState()?.id, HOST.currentState()?.anchor], ['reaching:' + REACH, signed], `${what}: reaching, at the act's site`);
    assert.ok(hostEl.innerHTML.includes(addressedHTML(t('L.reaching', { address: REACH }))), `${what}: in its own words`);
    await abandon();
    assert.deepEqual([addrs(), TRAIL.cursorIndex(), GO.isReaching(), HOST.currentState()], [before, cursor, false, null], `${what} abandoned it: its entry given back, the cursor where it was made`);
    release();
    await run(leap);
    assert.deepEqual([addrs(), same(CAM.view(), at), HOST.currentState()], [before, true, null], `${what}: its answer moves nothing`);
  }
  await run(GO.leapTo(REACH_GONE, { site }));
  assert.deepEqual([addrs(), faceShown()?.id, HOST.currentState()?.anchor, same(CAM.view(), at)], [before, 'face:doc_not_registered', signed, true], 'refused: the fifth cell at the act\'s site, its entry given back, the camera still');
  HOST.dismiss();
  REC.invalidate(REACH);
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(REACH) });
  const leap = GO.leapTo(REACH, { site });
  assert.equal(CAM.flying(), false, 'still while it reaches');
  release();
  await run(leap);
  assert.deepEqual([addrs(), GO.isReaching(), HOST.currentState()], [[...before, REACH], false, null], 'its read answered: the camera left and landed, its entry kept');
  assert.ok(same(CAM.view(), GO.viewFor(REACH, null)), 'at the place the read placed');
  assert.ok(same(TRAIL.all()[cursor].view, at), 'the entry it was made from keeps the view the camera left it at');
  assert.deepEqual(fake.unanswered, []);
});

test('a Back reaching a LEAP\'s entry while it reads puts the arrival out as it is made, lighting the step it crossed, and goes on nowhere once Forward has been made: the ring as Forward left it', async () => {
  unread();
  await run(GO.leapTo(D));
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
  const leap = GO.leapTo(C);
  await run(GO.follow(drawn(PASSAGE)));
  const landed = CAM.view(), walked = walkAt(), lit = GO.arrivalMark();
  const back = GO.back(true);
  assert.equal(TRAIL.current()?.addr, C, 'Back reached the LEAP\'s entry, still reading');
  const out = marks();
  await run(GO.forward());
  release();
  await run(leap);
  await run(back);
  assert.ok(lit && lit.link === PASSAGE, 'the follow lit the arrival');
  assert.deepEqual(out, [null, [PASSAGE]], 'Back put the follow\'s arrival out as it was made, lighting the link of the follow it crossed back over — made from the LEAP\'s entry, the place its camera had left for (issue #152; FP-25)');
  assert.deepEqual(addrs().slice(-3), [D, C, FAR]);
  assert.equal(TRAIL.current()?.addr, FAR);
  assert.ok(same(CAM.view(), landed), 'the camera at the follow\'s landing');
  assert.deepEqual(walkAt(), walked, 'the walk on the follow\'s span');
  assert.equal(WALK.ringShown(), false, 'Forward, a pointer\'s, put the ring out; the Back a key made drew none after it');
  assert.deepEqual(fake.unanswered, []);
});

test('a follow that never leaves — of a link naming no far document, or of a dead reference the page already knows says nothing — takes no entry, asks nothing and is not counted as followed, its face standing at the link\'s own bytes; Back, the next act, ends the face and goes to the entry before the place it was made at (FP-25; issues #137, #227)', async () => {
  takeUnfollowed();
  REC.takeRefused(GONE, 'unregistered');
  /** @type {Array<{what: string, s: import('../links/links.js').Shown, face: string, lit: string[]}>} each follow that never leaves, the face it shows, and the links lit after it */
  const rows = [
    { what: 'a link naming no far document', s: { ...drawn(UNFOLLOWED), far: '' }, face: 'face:invalid', lit: [] },
    { what: 'a dead reference the page knows says nothing', s: drawn(UNFOLLOWED), face: 'face:doc_not_registered', lit: [UNFOLLOWED] },
  ];
  for (const { what, s, face, lit } of rows) {
    await run(GO.home());
    await run(GO.leapTo(D));
    await run(GO.leapTo(FAR));
    await run(GO.back());
    const before = addrs(), cursor = TRAIL.cursorIndex(), at = CAM.view(), from = fake.asked.length;
    const following = GO.follow(s);
    assert.deepEqual([CAM.flying(), GO.inAir()], [false, false], `${what}: no flight`);
    await run(following);
    assert.deepEqual([addrs(), TRAIL.cursorIndex()], [before, cursor], `${what}: no entry, FAR's ahead of the cursor kept`);
    assert.deepEqual([fake.asked.slice(from), LK.visited(UNFOLLOWED)], [[], false], `${what}: nothing asked, and the link not counted as followed — its camera never left`);
    assert.deepEqual([faceShown()?.id, HOST.currentState()?.anchor], [face, { span: { addr: D, pos: 9, width: 2 }, sign: D }], `${what}: its face at the link's own bytes`);
    assert.deepEqual(marks(), [null, lit], `${what}: nothing outlined, ${lit.length ? 'the link lit' : 'no link lit'}`);
    assert.ok(same(CAM.view(), at), `${what}: the camera where the follow was made`);
    await run(GO.back());
    assert.deepEqual([TRAIL.current()?.label, TRAIL.cursorIndex(), addrs(), faceShown()], [t('F.level.home'), cursor - 1, before, null], `${what}: Back, the next act, ends the face and goes to HOME's entry, the one before D's`);
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a follow whose reads learn its far document says nothing keeps its entry: its camera left at the act for the far document, the link counted as followed as it left, the fifth cell faced where the camera went, the entry it departed recording the link and its own holding the notice there, the link lit; made with the cursor behind the newest entry, it drops the entry ahead as any push does (FP-25; issue #136)', async () => {
  takeDead();
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR));
  await run(GO.back());
  REC.invalidate(GONE);
  const before = addrs(), cursor = TRAIL.cursorIndex();
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(GONE) });
  const following = GO.follow(drawn(DEAD));
  const went = GO.viewFor(GONE, null), there = { span: { addr: GONE, pos: 1 }, sign: GONE };
  assert.deepEqual([CAM.flying(), same(CAM.destination(), went), LK.visited(DEAD)], [true, true, true], 'the camera left at the act for the far document, the link counted as followed');
  release();
  await run(following);
  assert.equal(REC.doc(GONE).refused, 'unregistered', 'a dead reference');
  assert.deepEqual(addrs(), [...before.slice(0, cursor + 1), GONE], 'its entry after D\'s, FAR\'s ahead of the cursor dropped as any push drops it');
  assert.equal(TRAIL.cursorIndex(), cursor + 1, 'the cursor on its entry');
  const e = TRAIL.current();
  assert.deepEqual(e && e.notice && [departed()?.step?.link, e.notice.face, e.notice.addr, e.notice.site], [DEAD, 'unregistered', GONE, there], 'the entry departed recording the link; its own holding the fifth cell where the camera went');
  assert.ok(e && same(e.view, went) && same(CAM.view(), went), 'the entry and the camera where the camera went');
  assert.deepEqual([faceShown()?.id, HOST.currentState()?.anchor, walkAt()], ['face:doc_not_registered', there, ['document', GONE, null]], 'the fifth cell faced there, the walk with the camera');
  assert.deepEqual(marks(), [null, [DEAD]], 'the link lit, nothing outlined');
  assert.deepEqual(fake.unanswered, []);
});

test('a follow whose far document the board withholds from the reader lands at that document\'s place (issue #179\'s design decision: "Show no notice at the departure. Finish the follow like any jump and land at the document\'s place, where its own withheld words stand"): its entry taken at the act and settled at the document whole, holding its own withheld words there as its notice; the link counted as followed and lit, nothing outlined, the jump landed, the walk on the document; the face at the document\'s place, no sign hiding it — B1-S2\'s words naming its owner by the one owner rule, the arm beneath, whole the first time and compact the next, its head opening the rest — told by the landing\'s description and not the status region; no projection asked of a document the board withholds — whether its own read learns it in the air, the page knows it at the act, the projection says it, or its text is refused once the projection answered', async () => {
  takeLocked(); takeRefusedProjections(); takeLate(LOCKED_LATE, HIDDEN_LATE, 25);
  /** @type {Array<{what: string, link: string, far: string, owner: string, before?: () => void, whole: boolean}>} each way a follow meets a withheld far document, its owner, and whether its own words show whole there */
  const ways = [
    { what: 'its own read refused `withheld` in the air', link: LOCKED, far: PRIVATE, owner: PRIVATE_OWNER, whole: true },
    { what: 'known withheld at the act, its text never read', link: LOCKED, far: PRIVATE, owner: PRIVATE_OWNER, before: () => REC.takeRefused(PRIVATE, 'withheld'), whole: false },
    { what: 'the projection refused for it in the air', link: HIDDEN_PROJ, far: FAR, owner: '1.0.1', whole: true },
    { what: 'its text refused once the projection answered', link: LOCKED_LATE, far: HIDDEN_LATE, owner: '1.0.2', whole: true },
  ];
  for (const { what, link, far, owner, before, whole } of ways) {
    await run(GO.leapTo(D));
    await run(GO.leapTo(FAR));
    await run(GO.back());
    if (before) before();
    const trail = addrs(), cursor = TRAIL.cursorIndex(), from = fake.asked.length;
    const following = GO.follow(drawn(link)), landing = GO.aground();
    assert.deepEqual([CAM.flying(), LK.visited(link), TRAIL.current()?.addr], [true, true, far], `${what}: no notice at the departure — the camera left at the act, the link counted as followed, its entry taken`);
    await run(following);
    assert.equal(await landing, true, `${what}: the jump landed`);
    const e = TRAIL.current(), place = { span: { addr: far, pos: 1 } };
    assert.deepEqual([addrs(), TRAIL.cursorIndex()], [[...trail.slice(0, cursor + 1), far], cursor + 1], `${what}: its entry after D's, FAR's ahead of the cursor dropped as any push drops it`);
    assert.deepEqual(e && [e.pos, e.notice], [null, { face: 'withheld', addr: far, refusal: null, site: place }], `${what}: the entry at the document whole, holding its own withheld words at its place`);
    assert.deepEqual([marks(), walkAt()], [[null, [link]], ['document', far, null]], `${what}: the link lit, nothing outlined, the walk on the document`);
    const o = HOST.currentState(), f = faceShown(), arm = entitlementArm({ account: '1.0.1', keyPresent: false }, owner);
    assert.deepEqual([o?.id, o?.anchor, o?.told], ['face:withheld', place, true], `${what}: its face at the document's place, no sign hiding it, told by the landing`);
    assert.ok(f && f.html.includes(`data-string="F.corner.withheld" data-run="head" aria-expanded="${whole}">${addressedHTML(t('F.corner.withheld', { owner }))}</button>`), `${what}: the withheld box's words naming ${owner}, ${whole ? 'whole' : 'compact'}: ${f && f.html}`);
    assert.equal(!!f && f.html.includes(`<div class="arm" data-string="${arm.id}">${esc(arm.text)}</div>`), whole, `${what}: the arm beneath them ${whole ? 'standing' : 'one act away'}`);
    assert.ok(f && !f.html.includes('face-addr') && !f.html.includes('⟨'), `${what}: no address before them — it is the document landed at — and no token unfilled`);
    assert.deepEqual(GO.described(), { addr: far, pos: 1, words: FACES.withheldText(far), runs: [] }, `${what}: the landing's description its own words whole`);
    if (!whole) {
      o?.acts?.head(/** @type {any} */ (hostEl), true);
      const opened = faceShown()?.html || '';
      assert.ok(opened.includes('aria-expanded="true"') && opened.includes(`<div class="arm" data-string="${arm.id}">`), `${what}: its head's act opens the rest: ${opened}`);
    }
    assert.ok(!fake.asked.slice(from).includes(FAKE.keyOf('op', { frame: F.project(LOCKED, 2, PRIVATE) })), `${what}: no projection asked of a document the board withholds: it refuses one with the document`);
    HOST.dismiss();
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a follow whose far document\'s text the page holds and the board now withholds — access changed after it was read (issue #179\'s design decision\'s first case: "Its text is on screen … Show the change instead") — never leaves: no entry, the link not counted as followed and lit, its own withheld words at the link\'s own bytes with no sign hiding them, named by the follow\'s caption, the far document\'s address before them', async () => {
  takeTurned();
  await run(GO.leapTo(D));
  const n = TRAIL.length();
  await run(GO.follow(drawn(TURNED_LINK)));
  const o = HOST.currentState(), html = hostEl.innerHTML, arm = entitlementArm({ account: '1.0.1', keyPresent: false }, '1.0.2');
  assert.deepEqual([TRAIL.length(), LK.visited(TURNED_LINK), GO.litLinks(), CAM.flying()], [n, false, [TURNED_LINK], false], 'no flight, no entry, the link not counted as followed and lit');
  assert.deepEqual([o?.id, o?.anchor], ['face:withheld', { span: { addr: D, pos: 5, width: 2 } }], 'its face at the link\'s own bytes, no sign hiding it');
  assert.ok(html.startsWith(`<span class="label">${esc(t('B1.follow') + ' · ' + TURNED)}</span><div class="face-addr code id">${TURNED}</div>`), `named by the follow's caption, the far document's address before its words: ${html}`);
  assert.ok(html.includes(`>${addressedHTML(t('F.corner.withheld', { owner: '1.0.2' }))}</button><div class="arm" data-string="${arm.id}">`), 'its own withheld words whole, the arm beneath');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('a jump that ends in a notice keeps its entry and takes one Back to undo at any board speed: answered before the Back or after it, the trail holds the same entries and numbers, one Back lands where the jump was made, at the view it left, and a second goes one entry further (issue #136)', async () => {
  takeDead();
  /** @type {Array<[string, () => Promise<unknown>]>} each jump that ends in a notice, its read the far document's consult */
  const jumps = [
    ['a LEAP the board answers for with nothing', () => GO.leapTo(GONE)],
    ['a follow of a dead reference', () => GO.follow(drawn(DEAD))],
  ];
  for (const [what, jump] of jumps) {
    /** @type {unknown[]} what each speed leaves, counted from the jump's entry: where the first Back lands, the trail once the read answered, and where the second Back lands */
    const seen = [];
    for (const quick of [true, false]) {
      await run(GO.leapTo(FAR));
      await run(GO.leapTo(D));
      REC.invalidate(GONE); // the board asked anew whether it answers for the address
      const n = TRAIL.length(), at = CAM.view();
      const release = quick ? () => {} : fake.hold('op', { frame: F.retrieveDocVSpanSet(GONE) });
      const jumping = jump();
      if (quick) { await run(jumping); assert.equal(faceShown()?.id, 'face:doc_not_registered', `${what}, answered at once: the notice shows before the Back`); }
      await run(GO.back());
      const landed = { cursor: TRAIL.cursorIndex() - n, camera: same(CAM.view(), at), face: faceShown() };
      release();
      await run(jumping);
      const kept = { entries: addrs().slice(n - 2), numbers: TRAIL.numbered().slice(0, 3).map((r) => [r.n, r.entry.addr]), cursor: TRAIL.cursorIndex() - n };
      await run(GO.back());
      seen.push({ landed, kept, further: TRAIL.cursorIndex() - n });
    }
    const either = { landed: { cursor: -1, camera: true, face: null }, kept: { entries: [FAR, D, GONE], numbers: [[1, GONE], [2, D], [3, FAR]], cursor: -1 }, further: -2 };
    assert.deepEqual(seen, [either, either], `${what}: answered before the Back or after it, the jump keeps its entry and its number, one Back lands on the entry it was made from at the view it left, no face standing, and a second goes one entry further`);
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a notice whose read answers after the reader left its entry moves nothing; returned to, the entry asks its read again and lands where the camera went — the walk on the address the board says nothing about, the mirror naming it so — its face shown there again as the board still says nothing, the link lit (issues #136, #228; FP-25)', async () => {
  takeDead();
  await run(GO.leapTo(FAR));
  await run(GO.leapTo(D));
  REC.invalidate(GONE); // the board asked anew whether it answers for the address
  const at = CAM.view(), n = TRAIL.length();
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(GONE) });
  const following = GO.follow(drawn(DEAD));
  const went = GO.viewFor(GONE, null), there = { span: { addr: GONE, pos: 1 }, sign: GONE };
  await run(GO.back());
  release();
  await run(following);
  assert.deepEqual([HOST.currentState(), marks(), TRAIL.cursorIndex(), walkAt()], [null, [null, [DEAD]], n - 1, ['link', D, 23]], 'the read answered after the reader left: no face, the cursor where Back put it, the link lit where the follow was made and the walk returned to its end there (issue #152)');
  assert.ok(same(CAM.view(), at), 'the camera where Back put it');
  const e = TRAIL.all()[n];
  assert.deepEqual(e && e.notice && [e.addr, e.notice.face, e.notice.site], [GONE, 'unregistered', there], 'its entry holds the answer, where the camera went');
  assert.ok(e && same(e.view, went), 'at the view its camera left for, which Back re-took as it departed');
  const asked = extentAsks(GONE);
  await run(GO.forward());
  assert.deepEqual([TRAIL.cursorIndex(), extentAsks(GONE) - asked], [n, 1], 'Forward returns to it, asking its read again');
  assert.ok(same(CAM.view(), went), 'where the camera went');
  assert.deepEqual(walkAt(), ['document', GONE, null], 'the walk on the address the board says nothing about, with the camera — never on the link\'s bytes, out of view');
  const item = WALK.mirrorItem(WALK.mirrorIndex()) || '';
  assert.ok(item.includes(t('L.far.unregistered')) && !item.includes(t('F.published')), `the mirror names it as the board answered it: ${item}`);
  assert.deepEqual([HOST.currentState()?.id, HOST.currentState()?.anchor], ['face:doc_not_registered', there], 'its face shown again where the camera is');
  assert.deepEqual(marks(), [null, [DEAD]], 'the link it came from lit, nothing outlined');
  await run(GO.back());
  assert.deepEqual([HOST.currentState(), marks()], [null, [null, [DEAD]]], 'Back clears the face, lighting the link it came back along');
  assert.deepEqual(fake.unanswered, []);
});

test('Back onto a notice\'s entry from a follow made from it lights the link Back came back along alone — never the one the notice came from — and asks the notice\'s read again, its face shown again as the board still says nothing (issues #136, #152, #228)', async () => {
  takeDead();
  await run(GO.leapTo(D));
  REC.invalidate(GONE); // learned in the air: the follow keeps its entry, holding the notice
  await run(GO.follow(drawn(DEAD)));
  assert.equal(faceShown()?.id, 'face:doc_not_registered', 'the dead reference faced, its entry the cursor\'s');
  await run(GO.follow(drawn(PASSAGE)));
  assert.equal(TRAIL.current()?.addr, FAR, 'a follow made from the notice\'s entry, landed in FAR');
  const asked = extentAsks(GONE);
  await run(GO.back());
  assert.deepEqual(marks(), [null, [PASSAGE]], 'the follow Back crossed lit, nothing outlined: one move, one mark');
  assert.deepEqual([extentAsks(GONE) - asked, faceShown()?.id], [1, 'face:doc_not_registered'], 'the notice\'s read asked again, its face shown again');
  assert.deepEqual(fake.unanswered, []);
});

test('a jump to the entry behind lights as Back does and one to the entry ahead as Forward does; a jump across two entries or more lights nothing — onto a notice\'s entry too, its read asked again and its face shown again (issues #152, #228)', async () => {
  takeDead();
  await run(GO.leapTo(D));
  await run(GO.follow(drawn(PASSAGE)));
  await run(GO.leapTo(D));
  // newest first: 1 D, 2 FAR — the follow's landing — 3 D, where the follow was made
  await run(GO.toTrailEntry(3));
  assert.deepEqual([TRAIL.current()?.addr, marks()], [D, [null, []]], 'across two entries to the follow\'s departure: nothing lit');
  await run(GO.toTrailEntry(2));
  assert.deepEqual([TRAIL.current()?.addr, marks()], [FAR, [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE }, [PASSAGE]]], 'to the entry ahead: what the follow it crossed marked on arrival, as Forward');
  await run(GO.toTrailEntry(3));
  assert.deepEqual([TRAIL.current()?.addr, marks()], [D, [null, [PASSAGE]]], 'to the entry behind: the link lit where the follow was made, as Back');
  // the dead reference faced, learned in the air, then two LEAPs: its notice's entry two entries behind the cursor's
  REC.invalidate(GONE);
  await run(GO.follow(drawn(DEAD)));
  await run(GO.leapTo(FAR));
  await run(GO.leapTo(D));
  const asked = extentAsks(GONE);
  await run(GO.toTrailEntry(3));
  assert.deepEqual([TRAIL.current()?.notice?.face, marks(), extentAsks(GONE) - asked, faceShown()?.id], ['unregistered', [null, []], 1, 'face:doc_not_registered'], 'across two entries onto the notice\'s entry: its read asked again, its face shown again, its link not relit');
  assert.deepEqual(fake.unanswered, []);
});

test('every return to a failed jump\'s entry asks its read again (issue #228\'s design decision: "Returning to it asks again"): its reading face stands where the failure\'s did while the read is out; the board still saying nothing of the address, the fifth cell there again, the entry holding it; the board not answering, that refusal\'s face, never the word it gave before; and once the board answers for a document there, the return lands on it with no face, the entry\'s notice taken off (FP-25)', async () => {
  const NEW = '1.0.1.0.33', NEW_TEXT = 'A note made where the board said nothing.';
  const answered = draftReads(NEW, NEW_TEXT), spans = FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(NEW) });
  Object.assign(script, answered);
  script[spans] = { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } };
  const there = { span: { addr: NEW, pos: 1 }, sign: NEW };
  try {
    await run(GO.leapTo(D));
    await run(GO.leapTo(NEW));
    assert.deepEqual([faceShown()?.id, TRAIL.current()?.notice?.face], ['face:doc_not_registered', 'unregistered'], 'the LEAP learned in the air that the board says nothing of the address');
    await run(GO.leapTo(D));
    let asked = extentAsks(NEW);
    const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(NEW) });
    const back = GO.back();
    assert.deepEqual([HOST.currentState()?.id, HOST.currentState()?.anchor], ['reading:' + NEW, there], 'Back: its reading face where the failure\'s stood while the read is out, never the face the entry held');
    release();
    await run(back);
    assert.deepEqual([extentAsks(NEW) - asked, faceShown()?.id, HOST.currentState()?.anchor, TRAIL.current()?.notice?.face, walkAt()], [1, 'face:doc_not_registered', there, 'unregistered', ['document', NEW, null]],
      'the board still saying nothing: the fifth cell there again, the entry holding it, the walk on the address');
    await run(GO.leapTo(D));
    script[spans] = { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } };
    await run(GO.back());
    assert.deepEqual([faceShown()?.id, HOST.currentState()?.anchor, TRAIL.current()?.notice?.face], ['face:unreachable', there, 'refused'], 'the board not answering: that refusal\'s face where the fifth cell stood, the entry holding it');
    await run(GO.leapTo(D));
    script[spans] = answered[spans];
    asked = extentAsks(NEW);
    await run(GO.back());
    assert.deepEqual([extentAsks(NEW) - asked, HOST.currentState(), TRAIL.current()?.notice, walkAt(), REC.doc(NEW).extent], [1, null, null, ['document', NEW, null], NEW_TEXT.length],
      'the board answering for a document there: no face, the entry\'s notice taken off, the walk on the document, its text read');
  } finally {
    HOST.dismiss();
    REC.invalidate(NEW);
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a return to a failed jump\'s entry the reader walked on from keeps the camera and the walk where they left them as its read meets the failure again: the walk on the span they walked to, the fifth cell carried by the one line (issue #228\'s design decision: "A failed jump\'s entry is where the camera went, with its face and walk")', async () => {
  await run(GO.leapTo(FAR));
  REC.invalidate(GONE);
  await run(GO.leapTo(GONE));
  assert.equal(faceShown()?.id, 'face:doc_not_registered', 'the LEAP learned in the air that the board says nothing of the address');
  CAM.set(GO.viewFor(D, 11));
  await WALK.focusTo(D, 11);
  const left = CAM.view();
  await run(GO.leapTo(FAR));
  const asked = extentAsks(GONE);
  await run(GO.back());
  assert.deepEqual([TRAIL.current()?.addr, extentAsks(GONE) - asked, faceShown()?.id, walkAt()], [GONE, 1, 'face:doc_not_registered', ['block', D, 11]], 'Back: its read asked again, the fifth cell shown, the walk on the span the reader walked to — never on the address');
  assert.ok(same(CAM.view(), left) && HOST.aside(), 'the camera at the view left, the face carried by the one line');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('a return reaching a jump\'s entry while its read is out, the reader having taken the camera over there and walked on, keeps the walk where they left it as the read meets a failure: the walk on their span with the camera, the fifth cell carried by the one line (issue #228\'s design decision: "A failed jump\'s entry is where the camera went, with its face and walk")', async () => {
  await run(GO.leapTo(FAR));
  REC.invalidate(GONE);
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(GONE) });
  const leap = GO.leapTo(GONE);
  GO.takeOver();
  CAM.set(GO.viewFor(D, 11));
  await WALK.focusTo(D, 11);
  const left = CAM.view();
  await run(GO.leapTo(FAR));
  const back = GO.back();
  assert.deepEqual([TRAIL.pending(/** @type {import('./trail.js').Entry} */ (TRAIL.current())) !== null, HOST.currentState()?.id], [true, 'reading:' + GONE], 'Back reached the entry still reading, its reading face standing');
  release();
  await run(leap); await run(back);
  assert.deepEqual([TRAIL.current()?.addr, TRAIL.current()?.notice?.face, faceShown()?.id, walkAt()], [GONE, 'unregistered', 'face:doc_not_registered', ['block', D, 11]], 'the read met the board saying nothing: the fifth cell shown, the walk on the span the reader walked to — never on the address');
  assert.ok(same(CAM.view(), left) && HOST.aside(), 'the camera at the view the reader left, the face carried by the one line');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('Back returns the walk to where the step it crossed began — the link\'s item, the passage\'s first stretch — only where the view it lands at shows it at its document\'s reading scale; else where it stood, where that view shows it, else on the element under that view\'s centre (issues #152, #237)', async () => {
  await run(GO.leapTo(D));
  await run(GO.follow(drawn(PASSAGE)));
  await run(GO.back(true));
  assert.deepEqual([walkAt(), WALK.ringShown()], [['link', D, 11], true], 'Back from the follow\'s landing: the walk on the link\'s item at the end it was made at, the ring drawn — a key made the act');
  assert.deepEqual(GO.backLight(), { addr: D, runs: [], end: { link: PASSAGE, key: drawn(PASSAGE).key } }, 'the light the mirror marks: that end');
  /** a carry of SHARED made from D's entry, its view moved by `to` first, then Back to that entry: the view D's entry was left at */
  const carriedFrom = async (/** @type {(v: {x: number, y: number, scale: number}) => {x: number, y: number, scale: number}} */ to) => {
    await run(GO.leapTo(D));
    CAM.set(to(CAM.view()));
    const left = CAM.view();
    await run(GO.leapTo(FAR, { how: 'leap', carry: SHARED }));
    await run(GO.back());
    return left;
  };
  const below = await carriedFrom((v) => ({ ...v, y: v.y + 2 * 900 / v.scale }));
  assert.ok(!LAYER.lineInView(D, 11, below) && LAYER.atReadingScale(D, below.scale) && !LAYER.inView(D, below), 'D left at its reading scale, the passage\'s line and D out of view');
  const centre = WALK.elementUnder(below);
  assert.deepEqual([walkAt(), GO.arrivalMark()?.runs], [[centre.kind, centre.addr, centre.pos], [{ pos: 11, width: 5 }]], 'the passage lit, out of view; the walk on the element under the view\'s centre, never on D, the entry\'s place out of view');
  assert.notEqual(centre.addr, D);
  const far = await carriedFrom((v) => ({ ...v, scale: v.scale / 3 }));
  assert.ok(LAYER.lineInView(D, 11, far) && !LAYER.atReadingScale(D, far.scale), 'D left below its reading scale, the passage\'s line in view');
  assert.deepEqual([walkAt(), GO.arrivalMark()?.runs], [['document', D, null], [{ pos: 11, width: 5 }]], 'the walk on the document whole, the grain the view gives');
  assert.deepEqual(fake.unanswered, []);
});

test('at a link\'s stop of the walk, no selection standing, Mod+Enter follows that link and Mod+Shift+Enter opens the reading scene from it, its end\'s own bytes set level with where its far end stands; Mod+Shift+O there finds no span, selects nothing and gives the slot\'s reason (D5 K-47, K-51, K-52, §1.6, §4 rule 6)', async () => {
  /** @type {string[]} */
  const said = [];
  FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() {}, set textContent(/** @type {string} */ v) { said.push(v); } }) });
  /** the walk on the citation's stop in the first edition, as Back across its follow leaves it, no selection standing */
  const onStop = async () => {
    await run(GO.leapTo(D));
    await run(GO.follow(drawn(PASSAGE)));
    await run(GO.back(true));
    SEL.clear();
    assert.deepEqual([walkAt(), WALK.current()?.link?.key, SEL.selected()], [['link', D, 11], drawn(PASSAGE).key, null], 'the walk on the citation\'s stop, no selection standing');
  };
  await onStop();
  assert.equal(await KEYS.dispatch(keyOf('Enter', MOD), PLANE), true);
  await drained();
  await reopening();
  assert.deepEqual(marks(), [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE }, [PASSAGE]], 'Mod+Enter: the follow made, its far end outlined, the link lit');
  assert.deepEqual(departed()?.step, { kind: 'follow', link: PASSAGE, near: D, key: drawn(PASSAGE).key, far: FAR, spans: [{ prefix: FAR + '.0.1', ordinal: 20, width: 5 }] }, 'the entry it departed records the follow from the end the stop names');
  await onStop();
  const pressed = KEYS.dispatch(keyOf('Enter', { ...MOD, shiftKey: true }), PLANE);
  const opened = TRAIL.current()?.scene;
  assert.deepEqual(opened && [opened.a, opened.b, opened.held], [D, FAR, { posA: 11, widthA: 5, posB: 20, wholeB: false }], 'Mod+Shift+Enter: the scene beside the far edition, the end\'s own bytes set level with where its far end stands');
  assert.deepEqual(departed()?.step, { kind: 'scene', near: D, link: PASSAGE, key: drawn(PASSAGE).key, spans: null }, 'a step on the trail from the end the stop names');
  assert.equal(await pressed, true);
  // no scene to show here: its opening gives its entry back
  await new Promise((r) => setTimeout(r, 0));
  await onStop();
  const n = said.length, standing = HOST.currentState();
  assert.equal(await KEYS.dispatch(keyOf('O', { ...MOD, shiftKey: true }), PLANE), true);
  assert.deepEqual([SEL.selected(), HOST.currentState(), said.slice(n)], [null, standing, [t('D5.select-first')]], 'Mod+Shift+O at the stop: no span in focus — nothing selected, no card, the slot\'s reason said');
  assert.deepEqual(fake.unanswered, []);
});

// ---- THE RUNS' LABELS, THE STEP AND THE ARRIVAL'S LIFE (FP-21) -----------------------------

// a citation from the first edition of a passage of FAR an edit set in another order: its far end, FAR's 30th to 39th bytes, stands
// with its second half at FAR's 5 and its first half at FAR's 25;
const REORDERED = D + '.0.2.16';
// its slot projected into FAR's first member, which the landing's version offer asks: none of it there
Object.assign(script, {
  [FAKE.keyOf('op', { frame: F.project(REORDERED, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.5', width: '0.5' }, { start: '1.25', width: '0.5' }] } },
  [FAKE.keyOf('op', { frame: F.project(REORDERED, 2, FAR1) })]: { result: { as_of: 1, resp: 'span_set', set: [] } },
});
/** the reordered citation taken into the model, drawn at the first edition, and FAR's image as the edit left it */
const reorder = () => {
  REC.takeLinks(D, [REORDERED]); REC.takeLink({ addr: REORDERED, from: [span(D, 24, 2)], to: [span(FAR, 30, 10)], type: CITE });
  REC.takeImage(FAR, 1, [{ iStart: FAR + '.0.1.1', width: 4 }, { iStart: FAR + '.0.1.35', width: 5 }, { iStart: FAR + '.0.1.5', width: 15 }, { iStart: FAR + '.0.1.30', width: 5 }, { iStart: FAR + '.0.1.20', width: 10 }, { iStart: FAR + '.0.1.40', width: FAR_EXTENT - 39 }]);
};
/** FAR's own image put back */
const unorder = () => REC.takeImage(FAR, 1, [{ iStart: FAR + '.0.1.1', width: FAR_EXTENT }]);
/** a step's camera and walk let land: its flight stepped to its end, the walk's reads answered */
async function stepped() { for (let i = 0; i < 60; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); } }
/** the reordered citation's arrival in FAR, its two runs in the text's order */
const REORDERED_RUNS = [{ pos: 5, width: 5 }, { pos: 25, width: 5 }];

// a citation from the first edition of twenty bytes of UNNAMED's text, which its projection places in two runs of nine positions
// together, and whose bytes the board will not name: its image refused, whole and run by run, by a name that says nothing of it
const UNNAMED = '1.0.1.0.51', UNNAMED_TEXT = 'A text whose own bytes the board will not name here.', UNNAMED_LINK = D + '.0.2.17';
Object.assign(script, {
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(UNNAMED) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + UNNAMED_TEXT.length }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(UNNAMED) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: UNNAMED, published: false, owner: '1.0.1', birth: null, birth_extent: null, placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(UNNAMED, 1, UNNAMED_TEXT.length) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: UNNAMED_TEXT }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(UNNAMED, 1, UNNAMED_TEXT.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
  ...Object.fromEntries([[1, UNNAMED_TEXT.length], [3, 4], [12, 5]].map(([pos, w]) => [FAKE.keyOf('op', { frame: F.image(UNNAMED, pos, w) }), { refused: { kind: 'refused', name: 'bad_region', code: 'bad_region' } }])),
  [FAKE.keyOf('op', { frame: F.project(UNNAMED_LINK, 2, UNNAMED) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.3', width: '0.4' }, { start: '1.12', width: '0.5' }] } },
});

test('a follow whose far text holds its passage in two runs whose bytes the board will not name lands at the first in the text, its runs unlabelled — no order is known — its line saying only part of the passage is there by their widths, counting no runs (FP-21: "nothing counts places")', async () => {
  REC.takeLinks(D, [UNNAMED_LINK]); REC.takeLink({ addr: UNNAMED_LINK, from: [span(D, 1, 2)], to: [span(UNNAMED, 3, 20)], type: CITE });
  await run(GO.leapTo(D));
  await run(GO.follow(drawn(UNNAMED_LINK)));
  assert.deepEqual(GO.arrivalMark(), { addr: UNNAMED, pos: 3, runs: [{ pos: 3, width: 4 }, { pos: 12, width: 5 }], link: UNNAMED_LINK }, 'both runs outlined, the landing at the first in the text');
  const words = t('L.held.part', { subject: t('L.held.followed'), where: t('L.held.current', { D: UNNAMED }) });
  assert.deepEqual([GO.landing()?.said?.state, GO.landing()?.pieces, GO.landingLine(), GO.landingOffers().steps], ['part', null, words, false], 'nine positions of twenty in two runs: part, no runs labelled and no step, the line counting no places');
  await run(GO.leapTo(D));
  assert.deepEqual(fake.unanswered, []);
});

test('a follow of a far end an edit set in another order lands at piece 1 — its first half, never the first run in the text — every run labelled; a step takes the landing to the next piece in the passage\'s order and round again, flying to it at reading size with the walk on it, pushing nothing, and the previous wraps the other way; Mod+G and Mod+Shift+G step, and where no arrival in several runs stands are taken for the page\'s own find, never the platform\'s (FP-21; issues #158, #222)', async () => {
  reorder();
  try {
    await run(GO.leapTo(D));
    await run(GO.follow(drawn(REORDERED)));
    const piece = (/** @type {number} */ k) => t('L.piece', { k, n: 2 }), clauses = ' · ' + t('L.piece.all') + ' · ' + t('L.piece.order');
    assert.deepEqual(marks(), [{ addr: FAR, pos: 25, runs: REORDERED_RUNS, link: REORDERED }, [REORDERED]], 'both runs outlined, the landing at FAR\'s 25, its first half');
    assert.ok(same(CAM.view(), GO.viewFor(FAR, 25)), 'the camera at piece 1\'s view');
    assert.deepEqual([walkAt(), WALK.landedAt(), TRAIL.current()?.pos], [['block', FAR, 19], 25, 25], 'the walk and the entry at piece 1');
    assert.deepEqual([GO.landing()?.current, GO.landingLine(), GO.described()?.runs.map((r) => r.words)], [1, piece(1) + clauses, [piece(2), piece(1)]], 'the line: "piece 1 of 2 · all of the passage · in another order"; the run before it in the text "piece 2 of 2"');
    const n = TRAIL.length(), cursor = TRAIL.cursorIndex();
    assert.equal(GO.step(1), true);
    await stepped();
    assert.ok(same(CAM.view(), GO.viewFor(FAR, 5)), 'the next piece: the camera flown to FAR\'s 5 at reading size');
    assert.deepEqual([walkAt(), GO.landing()?.current, GO.landing()?.pos, GO.arrivalMark()?.pos, GO.landingLine()], [['block', FAR, 1], 0, 5, 5, piece(2) + clauses], 'the walk on it, the landing standing there, its line its label');
    assert.deepEqual(marks()[1], [REORDERED], 'the arrival standing: its link lit');
    GO.step(1); await stepped();
    assert.deepEqual([GO.landing()?.pos, walkAt()], [25, ['block', FAR, 19]], 'past the last piece: round to the first');
    GO.step(-1); await stepped();
    assert.equal(GO.landing()?.pos, 5, 'the previous from the first: round to the last');
    assert.deepEqual([TRAIL.length(), TRAIL.cursorIndex()], [n, cursor], 'no step pushes, nor moves the cursor');
    assert.equal(await KEYS.dispatch(keyOf('g', MOD), PLANE), true, 'Mod+G takes the step');
    await stepped();
    assert.equal(GO.landing()?.pos, 25, 'Mod+G: the next piece');
    assert.equal(await KEYS.dispatch(keyOf('g', { ...MOD, shiftKey: true }), PLANE), true, 'Mod+Shift+G takes the step back');
    await stepped();
    assert.equal(GO.landing()?.pos, 5, 'Mod+Shift+G: the previous piece');
    await run(GO.leapTo(D));
    assert.equal(await KEYS.dispatch(keyOf('g', MOD), PLANE), true, 'no arrival in several runs: Mod+G is taken for the page\'s find (N-FIND), the platform\'s never run');
    assert.deepEqual([GO.steps(), GO.landing()], [false, null], 'and steps no arrival');
  } finally { unorder(); }
  assert.deepEqual(fake.unanswered, []);
});

test('a pan, a zoom and a selection keep the arrival — its outline, its labels and its line; Esc ends it once nothing nearer stands (FP-21: "The state ends only at another landing, at find opening, or at Esc after anything nearer")', async () => {
  const platform = { window: globalThis.window };
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  reorder();
  try {
    await run(GO.leapTo(D));
    await run(GO.follow(drawn(REORDERED)));
    const stood = [marks(), GO.landingLine(), GO.described()];
    CAM.panBy(40, 30); CAM.zoomAt(0.5, 700, 450); CAM.markDirty();
    assert.deepEqual([marks(), GO.landingLine(), GO.described()], stood, 'a pan and a zoom: nothing ended');
    SEL.select(FAR, 19, 5);
    assert.deepEqual([marks(), GO.landingLine()], [stood[0], stood[1]], 'a selection: nothing ended');
    for (let i = 0; i < 4 && (SEL.selected() || HOST.currentState()); i++) KEYS.esc();
    assert.deepEqual([SEL.selected(), HOST.currentState(), marks(), GO.landingLine()], [null, null, stood[0], stood[1]], 'Esc takes what is nearer first: the selection and its card, the arrival standing');
    KEYS.esc();
    assert.deepEqual([marks(), GO.landing(), GO.landingLine(), GO.described()], [[null, []], null, null, null], 'the next Esc ends the arrival: its outline, its labels, its line and the link lit');
    KEYS.esc();
    assert.equal(TRAIL.current()?.addr, FAR, 'on the bare plane Esc does nothing more');
  } finally {
    SEL.clear();
    globalThis.window = platform.window;
    unorder();
  }
  assert.deepEqual(fake.unanswered, []);
});

test('one Back from a landing stepped among its runs returns to where the reader departed, the steps adding nothing to the trail; Forward reads the arrival again from the text it reaches, which no edit changed — its outline, its labels, the run the step took the landing to found by its first byte, the walk on it — and the link Forward crossed lit (FP-21; issues #158, #297)', async () => {
  reorder();
  try {
    await run(GO.leapTo(D));
    const departedFrom = TRAIL.cursorIndex(), view = CAM.view();
    await run(GO.follow(drawn(REORDERED)));
    GO.step(1); await stepped();
    assert.equal(GO.landing()?.pos, 5, 'stepped to piece 2');
    await run(GO.back());
    assert.deepEqual([TRAIL.cursorIndex(), TRAIL.current()?.addr, same(CAM.view(), view)], [departedFrom, D, true], 'one Back: where the follow was made, at the view it was made from');
    assert.deepEqual(marks(), [null, [REORDERED]], 'there the link Back crossed lit, nothing outlined');
    await run(GO.forward());
    assert.deepEqual(marks(), [{ addr: FAR, pos: 5, runs: REORDERED_RUNS, link: REORDERED }, [REORDERED]], 'Forward: the outline read again where the text holds the passage, at the run the step took it to, the link it crossed lit');
    assert.deepEqual([GO.landing()?.current, GO.landing()?.pos, GO.landingLine(), walkAt()], [0, 5, t('L.piece', { k: 2, n: 2 }) + ' · ' + t('L.piece.all') + ' · ' + t('L.piece.order'), ['block', FAR, 1]], 'its labels read again, the line the stepped run\'s, the walk on it');
    assert.ok(same(CAM.view(), GO.viewFor(FAR, 5)), 'at the view the reader left it at: the stepped run\'s');
    await run(GO.home());
    await run(GO.back());
    assert.deepEqual([GO.arrivalMark()?.pos, GO.landing()?.pos], [5, 5], 'Back across HOME, which crossed no step: read again the same, no link lit');
    assert.deepEqual(marks()[1], [], 'no link lit: the move crossed no step');
  } finally { unorder(); }
  assert.deepEqual(fake.unanswered, []);
});

test('Forward onto a landing in several runs whose text an edit set the passage\'s halves in their own order while the reader was away reads its runs again from that text: outlined where they stand now, labelled in that order with no "in another order", the landing at the run it stood at, found by its first byte, and the step following the order the text holds now (issue #297: "A return now re-reads them from the text it reaches")', async () => {
  reorder();
  try {
    await run(GO.leapTo(D));
    await run(GO.follow(drawn(REORDERED)));
    assert.deepEqual([GO.landing()?.pieces?.reordered, GO.landing()?.pos], [true, 25], 'the follow landed at piece 1, its first half, the text holding the halves in another order');
    await run(GO.back());
    // FAR as an edit leaves it while the reader is at D: the passage's first half at 5, its second at 25
    REC.takeImage(FAR, 1, [{ iStart: FAR + '.0.1.1', width: 4 }, { iStart: FAR + '.0.1.30', width: 5 }, { iStart: FAR + '.0.1.5', width: 15 }, { iStart: FAR + '.0.1.35', width: 5 }, { iStart: FAR + '.0.1.20', width: 10 }, { iStart: FAR + '.0.1.40', width: FAR_EXTENT - 39 }]);
    await run(GO.forward());
    assert.deepEqual(marks(), [{ addr: FAR, pos: 5, runs: REORDERED_RUNS, link: REORDERED }, [REORDERED]], 'both runs outlined where they stand now, the landing at the first half, which it stood at, the link Forward crossed lit');
    const piece = (/** @type {number} */ k) => t('L.piece', { k, n: 2 });
    assert.deepEqual([GO.landing()?.pieces?.reordered, GO.landing()?.current, GO.landingLine(), GO.described()?.runs.map((r) => r.words)], [false, 0, piece(1) + ' · ' + t('L.piece.all'), [piece(1), piece(2)]], 'labelled in the order the text holds them now: no "in another order"');
    GO.step(1); await stepped();
    assert.equal(GO.landing()?.pos, 25, 'the step: piece 2, after piece 1 in the text now');
  } finally { unorder(); }
  assert.deepEqual(fake.unanswered, []);
});

test('Forward onto a landing whose passage its text holds in one piece outlines that piece alone — no labels, no line — whatever runs the landing named, and the walk stands where the reader left it, at the view they left, never at the start of that piece out of view: the gate\'s door naming two runs of an edition, the heads of its first paragraph and its last, and the passage they hold, every byte between them, which the edition holds whole (issue #297: "A return now re-reads them from the text it reaches")', async () => {
  await PUMP.loadWhole(LONG);
  const lines = REC.doc(LONG).blocks.filter((b) => b.text.trim()), first = lines[0], last = lines[lines.length - 1];
  const runs = [{ pos: first.pos, width: 12 }, { pos: last.pos, width: 12 }], width = last.pos + 12 - first.pos;
  await run(GO.leapTo(FAR));
  await run(GO.leapTo(LONG, { pos: first.pos, runs, passage: { prefix: LONG + '.0.1', ordinal: first.pos, width }, how: 'leap' }));
  assert.deepEqual([GO.landing()?.pieces?.runs.length, GO.landingLine()], [2, t('L.piece', { k: 1, n: 2 }) + ' · ' + t('L.piece.part')], 'the door: two runs, labelled, part of the passage');
  GO.step(1); await stepped();
  const left = CAM.view();
  assert.deepEqual(walkAt(), ['block', LONG, last.pos], 'stepped to piece 2: the walk on the last paragraph');
  await run(GO.back());
  await run(GO.forward());
  assert.deepEqual(GO.arrivalMark(), { addr: LONG, pos: first.pos, runs: [{ pos: first.pos, width }], link: null }, 'the passage read again from the text: one piece, every byte of it, outlined');
  assert.deepEqual([GO.landing()?.pieces, GO.landingLine(), GO.described()], [null, null, null], 'all of it in one piece: the outline alone, nothing said');
  assert.ok(same(CAM.view(), left), 'the camera at the view the reader left: the last paragraph\'s');
  assert.deepEqual(walkAt(), ['block', LONG, last.pos], 'the walk where the reader left it, in view — never the first paragraph, where the piece begins');
  GO.endArrival();
  assert.deepEqual(fake.unanswered, []);
});

test('a jump says it is reading where the camera is — at the place it left for: a follow\'s far document, the document a LEAP names whatever site its act names — carried by the one line while that place is out of view, and a LEAP that reads nothing says nothing; Back leaves it, Forward to its entry while it reads shows it again there, and its answer replaces it with the landing (FP-25)', async () => {
  await run(GO.leapTo(FAR));
  await run(GO.leapTo(D));
  /** the reading face standing: its id, its kind, where it stands, and whether its words are the string's for the place it names */
  const readingShown = () => {
    const o = HOST.currentState();
    if (!o || !o.id || !o.id.startsWith('reading:')) return null;
    const words = hostEl.innerHTML.includes('data-string="L.reading"') && hostEl.innerHTML.includes(addressedHTML(t('L.reading', { address: o.id.slice('reading:'.length) })));
    return { id: o.id, kind: o.kind, anchor: o.anchor, words };
  };
  const projection = fake.hold('op', { frame: F.project(PASSAGE, 2, FAR) });
  const following = GO.follow(drawn(PASSAGE));
  assert.deepEqual(readingShown(), { id: 'reading:' + FAR, kind: 'face', anchor: { span: { addr: FAR, pos: 1 }, sign: FAR }, words: true }, 'a follow says it is reading at its far document, where its camera left for');
  assert.ok(!LAYER.inView(FAR) && HOST.aside(), 'its far document out of view as the camera leaves: the one line carries it');
  for (let i = 0; i < 20 && CAM.flying(); i++) CAM.step(Infinity);
  assert.deepEqual([LAYER.inView(FAR), HOST.aside(), GO.inAir()], [true, null, true], 'the camera there, its read still out: the face on the plane, the line carrying nothing, the jump in the air');
  await run(GO.back());
  assert.equal(HOST.currentState(), null, 'Back leaves it');
  const forward = GO.forward();
  assert.deepEqual(readingShown()?.anchor, { span: { addr: FAR, pos: 1 }, sign: FAR }, 'Forward to its entry while it reads shows it again, at the place it left for');
  projection();
  await run(following); await run(forward);
  assert.equal(HOST.currentState(), null, 'its answer replaces it with the landing');
  assert.deepEqual([TRAIL.current()?.addr, walkAt()], [FAR, ['block', FAR, 19]], 'Forward went on to the span its far end projects to');
  for (const site of [{ world: { x: 5, y: 6 } }, null]) {
    unread();
    const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
    const leap = GO.leapTo(C, { site });
    assert.deepEqual(readingShown(), { id: 'reading:' + C, kind: 'face', anchor: { span: { addr: C, pos: 1 }, sign: C }, words: true }, site ? 'a LEAP says it is reading at the document it names, never at the site its act names' : 'the LEAP box\'s too');
    release();
    await run(leap);
    assert.equal(HOST.currentState(), null, 'gone as it lands');
  }
  // every overlay the host writes while a LEAP to a document whose text the page holds is made and lands: a reading face shown and
  // dismissed in one turn is never seen, but is said through the status region all the same
  /** @type {string[]} */
  const written = [];
  let html = hostEl.innerHTML;
  Object.defineProperty(hostEl, 'innerHTML', { get: () => html, set: (/** @type {string} */ to) => { html = to; written.push(to); }, configurable: true });
  try {
    await run(GO.leapTo(D));
  } finally {
    Object.defineProperty(hostEl, 'innerHTML', { value: html, writable: true, configurable: true, enumerable: true });
  }
  assert.deepEqual([written.filter((w) => w.includes('data-string="L.reading"')), HOST.currentState(), TRAIL.current()?.addr], [[], null, D], 'a LEAP to a document whose text the page holds reads nothing, and says nothing');
  assert.deepEqual(fake.unanswered, []);
});

test('a follow made from the selection\'s card ends the card and the selection as its camera leaves, at the act, its reading face standing at the far document; one whose failure is known at the act never leaves, its face in the card\'s place, the selection standing under it until Esc (FP-25: "leaving a place ends its chrome")', async () => {
  const platform = { window: globalThis.window };
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  try {
    takeDead();
    await run(GO.leapTo(D));
    SEL.select(D, 11, 5);
    assert.equal(HOST.currentState()?.id, 'selection', 'the selection\'s card stands');
    const projection = fake.hold('op', { frame: F.project(PASSAGE, 2, FAR) });
    const following = GO.follow(drawn(PASSAGE));
    assert.deepEqual([HOST.currentState()?.id, SEL.selected()], ['reading:' + FAR, null], 'the camera left: the card ended at the act and the selection with it, as the card\'s dismissal ends it; the reading face at the far document');
    projection();
    await run(following);
    assert.deepEqual([HOST.currentState(), SEL.selected(), TRAIL.current()?.addr], [null, null, FAR], 'landed, nothing standing');
    await run(GO.leapTo(D));
    REC.takeRefused(GONE, 'unregistered');
    SEL.select(D, 23, 3);
    await run(GO.follow(drawn(DEAD)));
    assert.deepEqual([HOST.currentState()?.id, SEL.selected()], ['face:doc_not_registered', { addr: D, pos: 23, width: 3 }], 'a follow that never leaves: its face in the card\'s place, over the selection');
    KEYS.esc();
    assert.deepEqual([HOST.currentState(), SEL.selected()?.pos], [null, 23], 'Esc dismisses the face, the selection standing');
    KEYS.esc();
    assert.equal(SEL.selected(), null, 'the next Esc clears it');
  } finally {
    SEL.clear();
    globalThis.window = platform.window;
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a follow that lands nowhere is faced where the camera is: at its site — the link\'s own bytes in the first edition — where its failure is known at the act, pressed on the anatomy card\'s follow in the card\'s place there, a withheld far document\'s face standing there with no sign hiding it; at the far document, where its camera went, where its reads learned it in the air (FP-25)', async () => {
  takeDead(); takeTurned(); takeLate(DEAD_LATE, GONE_LATE, 19);
  // known at the act: GONE says nothing; TURNED, whose text the page holds, is withheld
  REC.takeRefused(GONE, 'unregistered');
  /** the link's own bytes in the first edition: where a face known at the act stands */
  const at = (/** @type {number} */ pos, /** @type {number} */ width) => ({ span: { addr: D, pos, width }, sign: D });
  /** a far document's head: where the camera went, and a face its reads learned stands */
  const there = (/** @type {string} */ far) => ({ span: { addr: far, pos: 1 }, sign: far });
  /** the card's follow as the host hands it to the act: a control of the card, which the face's markup removes */
  const pressed = Object.assign(new globalThis.HTMLElement(), { isConnected: false });
  /** @type {Array<{what: string, follow: () => Promise<unknown>, face: string, site: object}>} each follow that lands nowhere, the face it shows and where that face stands */
  const rows = [
    { what: 'a link naming no far document, faced at once', follow: () => GO.follow({ ...drawn(PASSAGE), far: '' }), face: 'face:invalid', site: at(11, 5) },
    { what: 'a dead reference the page knows says nothing, faced at the act', follow: () => GO.follow(drawn(DEAD)), face: 'face:doc_not_registered', site: at(23, 3) },
    { what: 'a far document withheld whose text the page holds, faced at the act, its face standing whatever the camera does', follow: () => GO.follow(drawn(TURNED_LINK)), face: 'face:withheld', site: { span: { addr: D, pos: 5, width: 2 } } },
    { what: 'a dead reference learned once the projection answered and the text was read', follow: () => GO.follow(drawn(DEAD_LATE)), face: 'face:doc_not_registered', site: there(GONE_LATE) },
    {
      what: 'the anatomy card\'s follow, pressed',
      follow: async () => {
        await ANATOMY.open(drawn(DEAD), null);
        const o = HOST.currentState(), act = o && o.acts ? o.acts.follow : null;
        assert.ok(o && o.id === 'anatomy:' + DEAD && act, 'the dead reference\'s anatomy card offers its follow');
        await run(Promise.resolve(act(/** @type {any} */ (pressed), false)));
      },
      face: 'face:doc_not_registered', site: at(23, 3),
    },
  ];
  for (const { what, follow, face, site } of rows) {
    await run(GO.leapTo(D));
    await run(follow());
    const o = HOST.currentState();
    assert.equal(o?.id, face, `${what}: its face`);
    assert.deepEqual(o?.anchor, site, `${what}: standing where the camera is — never at the viewport's corner, nor at a control the face removed`);
    HOST.dismiss();
  }
  assert.deepEqual(fake.unanswered, []);
});

test('wherever a follow meets a far end the board will say nothing of — known at the act, learned in the air, its projection refused so, its text refused once its projection answered, reaching another board — its face opens with the words its label names the far end by, then the rest of the far end\'s one state; a return to its entry asks its read again and shows the same words; a LEAP to the address faces in the board\'s words alone (issue #224\'s design decision: "The label is always the face\'s first words, shown and spoken"; issue #228)', async () => {
  takeDead(); takeLate(DEAD_LATE, GONE_LATE, 19);
  // PROJ_DEAD: a citation of PROJ_GONE, whose extent the page holds, its projection refused `doc_not_registered`; REACH_DEAD: a
  // citation of REACH_GONE, on board 2, which the plane does not draw
  const PROJ_GONE = '1.0.1.0.14', PROJ_DEAD = D + '.0.2.30', REACH_DEAD = D + '.0.2.31';
  REC.invalidate(PROJ_GONE); REC.takeSpanSet(PROJ_GONE, [{ subspace: 1, ordinal: 1, positions: LATE_EXTENT }]);
  REC.takeLinks(D, [PROJ_DEAD, REACH_DEAD]);
  REC.takeLink({ addr: PROJ_DEAD, from: [span(D, 13, 2)], to: [span(PROJ_GONE, 3, 4)], type: CITE });
  REC.takeLink({ addr: REACH_DEAD, from: [span(D, 25, 2)], to: [{ ...span(REACH_GONE, 1, 2), account: '2.0.1' }], type: CITE });
  script[FAKE.keyOf('op', { frame: F.project(PROJ_DEAD, 2, PROJ_GONE) })] = { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } };
  const [OPEN, CLOSE] = STRINGS['L.client-words'].text.split('⟨words⟩');
  /** a far end's words as its label sets them after its address, their brackets off: what its face opens with */
  const labelled = (/** @type {string} */ link) => { const w = LK.farWords(drawn(link)); return w.startsWith(OPEN) && w.endsWith(CLOSE) ? w.slice(OPEN.length, w.length - CLOSE.length) : w; };
  /** the face's words as a person reads them: its words, then each part beneath them, in order */
  const said = () => (hostEl.innerHTML.match(/<div class="(?:face-text|note)"[^>]*>.*?<\/div>/g) || []).map((m) => m.replace(/<[^>]*>/g, '').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')).join(' ');
  /** @type {Array<{what: string, link: string, far: string, before?: () => void}>} each way a follow meets a far end the board will say nothing of */
  const ways = [
    { what: 'known at the act', link: DEAD, far: GONE, before: () => REC.takeRefused(GONE, 'unregistered') },
    { what: 'learned in the air', link: DEAD, far: GONE, before: () => REC.invalidate(GONE) },
    { what: 'its projection refused so', link: PROJ_DEAD, far: PROJ_GONE },
    { what: 'its text refused once its projection answered', link: DEAD_LATE, far: GONE_LATE },
    { what: 'reaching another board', link: REACH_DEAD, far: REACH_GONE, before: () => REC.invalidate(REACH_GONE) },
  ];
  for (const { what, link, far, before } of ways) {
    await run(GO.leapTo(D));
    if (before) before();
    await run(GO.follow(drawn(link)));
    const words = labelled(link), whole = LK.emptyAt(far).whole.map((p) => p.text).join(' ');
    assert.equal(faceShown()?.id, 'face:doc_not_registered', `${what}: the fifth cell`);
    assert.ok(words && [t('L.far.empty'), t('L.far.unknown')].includes(words), `${what}: the far end's label names it by its state: ${words}`);
    assert.ok(said().startsWith(words) && said() === whole, `${what}: the face opens with "${words}", then the rest of the state: ${said()}`);
    HOST.dismiss();
  }
  assert.equal(labelled(REACH_DEAD), t('L.far.unknown'), 'another board\'s address: no document known here');
  assert.equal(labelled(DEAD), t('L.far.empty'), 'the reader\'s own account, the index complete: no document here yet');
  // a return to the entry a follow learned it in the air on: its face shown again in the same words
  await run(GO.leapTo(D));
  REC.invalidate(GONE);
  await run(GO.follow(drawn(DEAD)));
  const met = said();
  await run(GO.back());
  const asked = extentAsks(GONE);
  await run(GO.forward());
  assert.deepEqual([TRAIL.current()?.notice?.far, extentAsks(GONE) - asked, faceShown()?.id, said()], [true, 1, 'face:doc_not_registered', met], 'Back then Forward onto its entry: its read asked again, the notice a follow\'s, its face in the same words');
  HOST.dismiss();
  // a LEAP to the address, learned in the air and known at the act: the board's words alone
  const board = t('B1.doc_not_registered', { address: GONE });
  REC.invalidate(GONE);
  await run(GO.leapTo(GONE));
  assert.deepEqual([faceShown()?.id, said()], ['face:doc_not_registered', board], 'a LEAP learning it in the air');
  HOST.dismiss();
  await run(GO.leapTo(GONE));
  assert.deepEqual([faceShown()?.id, said()], ['face:doc_not_registered', board], 'a LEAP knowing it at the act');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('a Back made during a LEAP\'s flight re-takes the view the flight was bound for, and Forward lands there; the LEAP, its flight cut short, ends with no document landed in', async () => {
  await run(GO.leapTo(D));
  const leap = GO.leapTo(FAR);
  const flight = CAM.cam.anim;
  assert.ok(flight, 'the LEAP flies');
  const bound = { ...flight.to };
  CAM.step(flight.t0 + flight.ms / 2);
  assert.ok(!same(CAM.view(), bound), 'the camera mid-flight');
  await run(GO.back());
  await run(leap);
  assert.equal(await leap, null, 'the LEAP whose flight Back cut short landed in no document');
  const entry = TRAIL.all()[TRAIL.cursorIndex() + 1];
  assert.ok(entry && entry.addr === FAR && same(entry.view, bound), 'the LEAP\'s entry holds the view its flight was bound for, not the camera mid-flight');
  await run(GO.forward());
  assert.ok(same(CAM.view(), bound), 'Forward lands there');
});

test('a second Back made during the first one\'s flight leaves the first one\'s entry at its own view, and Forward lands there; the first Back, its flight cut short, ends', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR));
  await run(GO.leapTo(D, { pos: 11 }));
  const own = { ...TRAIL.all()[TRAIL.cursorIndex() - 1].view };
  const first = GO.back();
  const flight = CAM.cam.anim;
  assert.ok(flight && same(flight.to, own), 'the first Back flies to FAR\'s entry');
  CAM.step(flight.t0 + flight.ms / 2);
  await run(GO.back());
  await run(first);
  assert.ok(same(TRAIL.all()[TRAIL.cursorIndex() + 1].view, own), 'FAR\'s entry keeps its own view');
  await run(GO.forward());
  assert.ok(same(CAM.view(), own), 'Forward lands at it');
});

/** the em, in px, at which the camera reads a document now: its size (T-LAYER's fold) at the camera's scale */
const emNow = (/** @type {string} */ addr) => CAM.view().scale * LAYER.foldOf(REC.doc(addr)).fs;

test('a LEAP to a document minted a grid deeper than any the page booted with lands at its reading scale (E18 (a))', async () => {
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 9001, at: 9001, op: 'create_new_document', docs: [DEEP], class: 'published' }));
  assert.equal(depthOfDoc(DEEP), depthOfDoc(FAR) + 1, 'a grid deeper than FAR, the deepest place the index listed at boot');
  await run(GO.leapTo(DEEP));
  assert.ok(Math.abs(emNow(DEEP) - CAM.READING_PX) < 1e-6, `it reads at the reading size, ${CAM.READING_PX} px an em: ${emNow(DEEP)}`);
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP to a residue member its paragraphs set far smaller than its place\'s standard lands at its reading scale (E18 (a))', async () => {
  CAM.setDeepest(depthOfDoc(RES)); // the bound the app's boot sets over an index listing it
  await run(GO.leapTo(RES));
  const box = docBox(RES), fs = LAYER.foldOf(REC.doc(RES)).fs;
  assert.ok(box.residue && fs < standardFs(box) / 2.5, `set at ${fs / standardFs(box)} of its place's standard`);
  assert.ok(Math.abs(emNow(RES) - CAM.READING_PX) < 1e-6, `it reads at the reading size, ${CAM.READING_PX} px an em: ${emNow(RES)}`);
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP to a passage of an edition folded into columns lands on the passage\'s line in its own column — the column framed with its corner on its left and its edge on its right (issue #151) — at reading size, the walk on the span holding it (issue #15)', async () => {
  await PUMP.loadWhole(LONG);
  const d = REC.doc(LONG), f = LAYER.foldOf(d), box = docBox(LONG);
  // a passage inside the span heading the second row's first column, below the middle of the room's width
  const at = /** @type {import('../model/records.js').Block} */ (d.blocks.find((b) => placeOf(f, b.pos).column === f.across)), c = f.columns[f.across];
  assert.ok(at && f.across > 1 && c.x + c.w < box.w / 2, `the span heading column ${f.across} of ${f.columns.length}, ${f.across} across`);
  const pos = at.pos + 4, line = placeOf(f, pos);
  await run(GO.leapTo(LONG, { pos }));
  // the column the first of its row: the strip beside it holds the corner whole, 133 px and its 8 px gap; its edge EDGE em on its right
  const read = CAM.READING_PX, scale = read / f.fs, framed = box.x + c.x + c.w / 2 + (EDGE * read - (cornerWidth(false) + CORNER.gap)) / 2 / scale;
  assert.ok(same(CAM.view(), { x: framed, y: box.y + line.y + line.h / 2, scale }), `the camera on the passage's line, its column framed with its corner and its edge, at the reading size, ${read} px an em: ${JSON.stringify(CAM.view())}`);
  assert.ok(CAM.sx(box.x + c.x) - (cornerWidth(false) + CORNER.gap) >= 0 && CAM.sx(box.x + c.x + c.w) + EDGE * read <= 1440, 'the corner, the column and its edge in view together');
  assert.deepEqual(walkAt(), ['block', LONG, at.pos]);
  assert.deepEqual(fake.unanswered, []);
});

/** → as the platform delivers it at the plane */
const right = /** @type {any} */ ({ type: 'keydown', key: 'ArrowRight', keyCode: 39, isComposing: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault() {} });

test('→ at a document below its reading scale is Enter\'s act: a teleport to its reading scale, one trail entry pushed, the walk on the document with the ring drawn; → again, the view\'s centre on its second paragraph, enters that span and pushes nothing (issue #140; foundations §2.2; D5 K-3)', async () => {
  await PUMP.loadWhole(CONT);
  const fs = LAYER.foldOf(REC.doc(CONT)).fs, c = LAYER.centreOf(CONT, null);
  assert.ok(depthOfDoc(CONT) === 1 && fs < LAYER.foldOf(REC.doc(D)).fs / 6, 'a continuation document, set at a seventh of a depth-0 document\'s size');
  // the camera at the near band over it, its own em 2 px, where a click teleports; the walk on the document whole
  CAM.set({ ...c, scale: 14 / LAYER.foldOf(REC.doc(D)).fs });
  await WALK.focusTo(CONT, null);
  assert.equal(WALK.collapsed(), true);
  const n = TRAIL.length();
  await run(KEYS.dispatch(right, { where: 'plane', byKey: true }));
  assert.deepEqual([TRAIL.length(), TRAIL.cursorIndex(), TRAIL.current()?.addr], [n + 1, n, CONT], 'one entry pushed, its own');
  assert.ok(Math.abs(emNow(CONT) - CAM.READING_PX) < 1e-6, `the landing at its reading scale, the reading size: ${emNow(CONT)} px an em`);
  assert.deepEqual([walkAt(), WALK.ringShown(), WALK.collapsed()], [['document', CONT, null], true, false], 'the walk on the document, the ring drawn, expanded');
  const second = /** @type {import('../model/records.js').Block} */ (REC.doc(CONT).blocks[1]);
  CAM.set({ ...LAYER.centreOf(CONT, second.pos), scale: CAM.view().scale });
  await run(KEYS.dispatch(right, { where: 'plane', byKey: true }));
  assert.deepEqual(walkAt(), ['block', CONT, second.pos], '→ again enters the span under the view\'s centre, never its first');
  assert.deepEqual([TRAIL.length(), TRAIL.cursorIndex()], [n + 1, n], 'and pushes nothing');
  assert.deepEqual(fake.unanswered, []);
});

test('Back to an entry whose view was left below its document\'s reading scale stands the walk on the document whole, its trail entry keeping the position (issue #140)', async () => {
  await run(GO.leapTo(CONT, { pos: 25 }));
  assert.deepEqual([walkAt(), WALK.landedAt()], [['block', CONT, 23], 25], 'the LEAP lands at reading size on the span holding 25');
  // a zoom out below its reading scale — the chord's step before its re-take — then a LEAP away: CONT's entry re-takes that view
  const left = { ...CAM.view(), scale: CAM.view().scale / 3 };
  CAM.set(left);
  await run(GO.leapTo(D));
  await run(GO.back());
  assert.ok(same(CAM.view(), left), 'Back lands at the view left, below CONT\'s reading scale');
  assert.deepEqual([walkAt(), WALK.landedAt(), WALK.collapsed()], [['document', CONT, null], null, true], 'the walk on the document whole, collapsed, no position kept');
  assert.equal(TRAIL.current()?.pos, 25, 'the entry keeps the position it landed at');
  // Forward, and Back again at the view left: the same
  await run(GO.forward());
  await run(GO.back());
  assert.deepEqual(walkAt(), ['document', CONT, null]);
  assert.deepEqual(fake.unanswered, []);
});

test('→ from HOME, no document drawn under the view\'s centre, onto the account\'s first document stops short of its reading scale — one stop, collapsed, nothing pushed — and → there is Enter\'s act, its entry pushed at the reading size; Back returns to the stop\'s view, the walk on the document whole, and Forward into the document (issue #55; foundations §2.2; D5 K-3)', async () => {
  const fs = LAYER.foldOf(REC.doc(D)).fs;
  await run(GO.home(true));
  assert.ok(!LAYER.atReadingScale(D) && CAM.viewForCell(LAYER.shapeOf(D), 0.9).scale * fs >= CAM.READING_PX, 'at HOME D stands below its reading scale, and framed whole it would read past the reading size');
  const c = CAM.view();
  assert.ok(REC.places().every((p) => { const r = LAYER.regionOf(p.doc); return c.x < r.x || c.x > r.x + r.w || c.y < r.y || c.y > r.y + r.h; }), 'no listed document\'s region holds HOME\'s centre');
  const n = TRAIL.length(), cursor = TRAIL.cursorIndex();
  await run(KEYS.dispatch(right, PLANE));
  const stop = CAM.view();
  assert.deepEqual([walkAt(), WALK.collapsed(), TRAIL.length(), TRAIL.cursorIndex()], [['document', D, null], true, n, cursor], '→ at the account: D one stop, collapsed, nothing pushed');
  assert.ok(emNow(D) < LOD_TXT_LO, `short of its reading scale: em ${emNow(D)}`);
  await run(KEYS.dispatch(right, PLANE));
  assert.deepEqual([TRAIL.length(), TRAIL.cursorIndex(), TRAIL.current()?.addr, walkAt(), WALK.collapsed()], [n + 1, cursor + 1, D, ['document', D, null], false], '→ again is Enter\'s act: D\'s entry pushed, the walk on D, expanded');
  assert.ok(Math.abs(emNow(D) - CAM.READING_PX) < 1e-6, `at the reading size, ${CAM.READING_PX} px an em: ${emNow(D)}`);
  await run(GO.back());
  assert.deepEqual([TRAIL.cursorIndex(), walkAt()], [cursor, ['document', D, null]], 'Back to HOME\'s entry: the walk on D whole');
  assert.ok(same(CAM.view(), stop), 'at the stop\'s view');
  await run(GO.forward());
  assert.deepEqual([TRAIL.cursorIndex(), walkAt()], [cursor + 1, ['document', D, null]], 'Forward to D\'s entry');
  assert.ok(Math.abs(emNow(D) - CAM.READING_PX) < 1e-6, `at the reading size: em ${emNow(D)}`);
  assert.deepEqual(fake.unanswered, []);
});

test('Back to an entry left while the walk stood on a document whole below its reading scale, the view reading no document, stands the walk on that document again, never on the entry\'s place (issue #55)', async () => {
  await run(GO.home(true));
  const s = LAYER.shapeOf(D), fs = LAYER.foldOf(REC.doc(D)).fs;
  CAM.set({ x: s.x + s.w / 2, y: s.y + s.h / 2, scale: LOD_TXT_LO / 2 / fs });
  await WALK.retakeFromView(true);
  const left = CAM.view();
  assert.deepEqual([walkAt(), WALK.collapsed(), LAYER.readAt(left)], [['document', D, null], true, null], 'the re-take below D\'s reading scale: the walk on D whole, the view reading no document');
  await run(KEYS.dispatch(right, PLANE));
  assert.equal(TRAIL.current()?.addr, D, '→ there is Enter\'s act: D\'s entry pushed');
  await run(GO.back());
  assert.deepEqual([TRAIL.current()?.label, walkAt()], [t('F.level.home'), ['document', D, null]], 'Back to HOME\'s entry: the walk on D whole, where it stood as the reader left, never on the account');
  assert.ok(same(CAM.view(), left), 'at the view left');
  assert.deepEqual(fake.unanswered, []);
});

test('a return to an entry whose view read no line puts the walk back where it stood as the reader left — on the board, on an account, on a continuation\'s mark, on a span kept past its document\'s last line — never on the entry\'s place (issue #315)', async () => {
  await run(GO.home());
  await run(WALK.key('out'));
  const board = CAM.view();
  assert.deepEqual([walkAt(), LAYER.readAt(board)], [['board', '1', null], null], '← from HOME\'s account: the walk on the board, the view reading no line');
  await run(GO.leapTo(D));
  assert.deepEqual(departed()?.stood, { addr: '1', pos: null, ids: [], of: [], end: null }, 'HOME\'s entry keeps the board the walk stood on');
  await run(GO.back());
  assert.deepEqual([TRAIL.current()?.label, walkAt()], [t('F.level.home'), ['board', '1', null]], 'Back to HOME\'s entry: the walk on the board, never on the account');
  assert.ok(same(CAM.view(), board), 'at the view left');
  await run(GO.leapTo(D));
  await run(WALK.key('out'));
  const account = CAM.view();
  assert.deepEqual([walkAt(), LAYER.readAt(account)], [['account', '1.0.1', null], null], '← from D: the walk on its account, the view reading no line');
  await run(GO.back());
  await run(GO.forward());
  assert.deepEqual([TRAIL.current()?.addr, walkAt()], [D, ['account', '1.0.1', null]], 'Forward to D\'s entry: the walk on the account, never on D');
  assert.ok(same(CAM.view(), account), 'at the view left');
  await run(GO.home());
  const c = continuationCell('1.0.1', 1);
  CAM.set({ x: c.x + c.w / 2, y: c.y + c.h / 2, scale: markScale(1, CAM.view().scale) });
  await run(WALK.key('in'));
  const mark = CAM.view();
  assert.deepEqual([walkAt(), LAYER.readAt(mark)], [['mark', '1.0.1:1', null], null], '→ at the account over the continuation\'s mark: the walk on its stop, the view reading no line');
  await run(GO.leapTo(D));
  await run(GO.back());
  assert.deepEqual([TRAIL.current()?.label, walkAt()], [t('F.level.home'), ['mark', '1.0.1:1', null]], 'Back to HOME\'s entry: the walk on the mark\'s stop, never on the account');
  assert.ok(same(CAM.view(), mark), 'at the view left');
  await run(GO.leapTo(D, { pos: 1 }));
  await run(WALK.key('down'));
  assert.deepEqual(walkAt(), ['block', D, 11], '↓ from D\'s head to its second span');
  const v = CAM.view(), kept = { ...v, y: v.y + 300 / v.scale };
  CAM.set(kept);
  await WALK.retakeFromView(true);
  assert.deepEqual([walkAt(), WALK.kept(), LAYER.readAt(kept), LAYER.inView(D, kept)], [['block', D, 11], true, null, true], 'past D\'s last line: the span kept, the view reading no line, D in view');
  await run(GO.leapTo(FAR));
  await run(GO.back());
  assert.deepEqual([TRAIL.current()?.addr, walkAt()], [D, ['block', D, 11]], 'Back to D\'s entry: the walk on the span it stood on, never on the position the LEAP named');
  assert.ok(same(CAM.view(), kept), 'at the view left');
  assert.deepEqual(fake.unanswered, []);
});

test('a departure keeps no account the walk stood on whose cell the view it leaves does not show: HOME, the camera moved over another account\'s cell with no re-take, a LEAP away and Back — the walk on the element under the view\'s centre, never on HOME\'s account, out of view (issue #237; FP-25)', async () => {
  await run(GO.home());
  assert.deepEqual(walkAt(), ['account', '1.0.1', null], 'at HOME: the walk on the account');
  const c = accountCell('1.0.5');
  CAM.set({ x: c.x + c.w / 2, y: c.y + c.h / 2, scale: CAM.viewForCell(c, 0.85).scale * 2 });
  const left = CAM.view();
  assert.ok(!LAYER.meetsView(accountCell('1.0.1'), left) && LAYER.readAt(left) === null, 'the camera over 1.0.5\'s cell, the re-take not made: HOME\'s account out of view, the view reading no line');
  await run(GO.leapTo(D));
  assert.equal(departed()?.stood, null, 'HOME\'s entry keeps no place of the walk\'s');
  await run(GO.back());
  const centre = WALK.elementUnder(left);
  assert.ok(same(CAM.view(), left), 'Back at the view left');
  assert.deepEqual([walkAt(), centre.addr], [[centre.kind, centre.addr, centre.pos], '1.0.5'], 'the walk on the account under the view\'s centre');
  assert.deepEqual(fake.unanswered, []);
});

test('a departure made before the walk reached the landing its act left for keeps nothing of where the walk stood before: HOME, then a LEAP to D\'s second span and Back made at once, the walk still on the account as the LEAP\'s entry is departed, and Forward to that entry lands the walk on the span, never on the account (issue #315)', async () => {
  await run(GO.home());
  assert.deepEqual(walkAt(), ['account', '1.0.1', null], 'at HOME: the walk on the account');
  const leap = GO.leapTo(D, { pos: 11 }), back = GO.back();
  await run(leap); await run(back);
  assert.deepEqual([TRAIL.current()?.label, TRAIL.all()[TRAIL.cursorIndex() + 1]?.stood ?? null], [t('F.level.home'), null], 'Back to HOME\'s entry: the LEAP\'s entry keeps no place of the walk\'s');
  await run(GO.forward());
  assert.deepEqual([TRAIL.current()?.addr, walkAt()], [D, ['block', D, 11]], 'Forward to the LEAP\'s entry: the walk on the span its line read holds');
  assert.deepEqual(fake.unanswered, []);
});

test('a Back made while a card reads: once its reads answer nothing shows over the place Back landed — who wrote this?, who uses this?, the versions list, the anatomy card; asked with no act after it, each shows', async () => {
  REC.invalidate(FAR); // read anew by the first LEAP to it, its members uncounted until the versions list counts them
  /** @type {Array<{what: string, id: string, at: string, held: object, asks?: object[], open: () => Promise<void>}>} each card: the id it shows as, the place it is asked at, the read held while Back is made, the reads it asks in all where it asks no more once ended */
  const cards = [
    { what: 'who wrote this?', id: 'provenance:wrote', at: D, held: F.showOrigin(D, 11, 5), open: () => PROV.wrote(D, 11, 5) },
    { what: 'who uses this?', id: 'provenance:uses', at: D, held: usesCited, open: () => PROV.uses(D, 11, 5) },
    { what: 'the versions list, while it counts the members', id: 'versions:' + FAR, at: FAR, held: F.docMetadata(FAR2), asks: [F.docMetadata(FAR2)], open: () => VERSIONS.open(FAR, FAR_HELD.pos, null) },
    { what: 'the versions list, while it reads a member\'s row', id: 'versions:' + FAR, at: FAR, held: F.retrieveDocVSpanSet(FAR1), asks: [F.retrieveDocVSpanSet(FAR1)], open: () => VERSIONS.open(FAR, FAR_HELD.pos, null) },
    { what: 'the anatomy card', id: 'anatomy:' + PASSAGE, at: D, held: F.inClaims(PASSAGE, 'audit'), open: () => ANATOMY.open(drawn(PASSAGE), null) },
  ];
  for (const { what, id, at, held, asks, open } of cards) {
    await run(GO.leapTo(at === D ? FAR : D));
    await run(GO.leapTo(at));
    const from = fake.asked.length;
    const release = fake.hold('op', { frame: held });
    const opening = open();
    await run(GO.back());
    assert.notEqual(TRAIL.current()?.addr, at, `${what}: Back left ${at}`);
    release();
    await opening;
    assert.equal(HOST.currentState(), null, `${what}: nothing shows over the place Back landed`);
    if (asks) assert.deepEqual(fake.asked.slice(from), asks.map((frame) => FAKE.keyOf('op', { frame })), `${what}: nothing asked after its end`);
    await open();
    assert.equal(HOST.currentState()?.id, id, `${what}: asked with no act after it, it shows`);
    HOST.dismiss();
  }
  assert.equal(REC.doc(FAR).members, 2, 'the members counted once, by the list that showed');
  assert.deepEqual(fake.unanswered, []);
});

test('the anatomy card opened at an element stands at it, the link\'s own bytes beside it, where it stands once the text layer rebuilds or takes the element down; opened at none, at those bytes', async () => {
  await run(GO.leapTo(FAR));
  await run(GO.leapTo(D));
  /** the citation's symbol in the first edition's article, as a click hands it to the card */
  const sym = Object.assign(new globalThis.HTMLElement(), { isConnected: false });
  const bytes = { addr: D, pos: 11, width: 5 };
  await ANATOMY.open(drawn(PASSAGE), /** @type {any} */ (sym));
  assert.deepEqual([HOST.currentState()?.id, HOST.currentState()?.anchor], ['anatomy:' + PASSAGE, { el: sym, span: bytes }], 'at the symbol, the link\'s own bytes beside it');
  HOST.dismiss();
  await ANATOMY.open(drawn(PASSAGE), null);
  assert.deepEqual([HOST.currentState()?.id, HOST.currentState()?.anchor], ['anatomy:' + PASSAGE, { span: bytes }], 'at the link\'s own bytes');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('the anatomy card opens in the act that asks for it — a links-card row, Enter at the link\'s element, a click on its symbol, a click on its marked span: a Back made at once ends it; asked with no act after it, it shows; Esc made at once after a row ends it alone, the links card standing', async () => {
  const platform = { document: globalThis.document, window: globalThis.window };
  /** @type {Map<string, (e: unknown) => void>} the text layer's listeners, by event */
  const layer = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(layer), corners: listens(null) }));
    const click = /** @type {(e: unknown) => void} */ (layer.get('click'));
    /** the citation's element of the first edition's article a click lands on, by its class, bearing its data */
    const article = { dataset: { addr: D } };
    const at = (/** @type {string} */ cls, /** @type {Record<string, string>} */ dataset) => {
      const el = Object.assign(new globalThis.HTMLElement(), { dataset, isConnected: false });
      return Object.assign(el, { closest: (/** @type {string} */ sel) => (sel === cls ? el : sel === 'article' ? article : null) });
    };
    /** the links card at the first edition, and its row for the citation pressed as a click presses it */
    const row = () => {
      LINKS.show(D);
      const o = HOST.currentState(), i = LK.shown(D).findIndex((s) => s.link.addr === PASSAGE);
      const act = o && o.acts ? o.acts['row:' + i] : null;
      assert.ok(o && o.id === 'links:' + D && act, 'the links card lists the citation');
      return act(/** @type {any} */ (hostEl), false);
    };
    /** Enter as the platform delivers it at the plane */
    const enter = /** @type {any} */ ({ key: 'Enter', keyCode: 13, isComposing: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault() {} });
    /** @type {Array<[string, () => unknown]>} each act that asks for the card at the first edition, the walk on the citation's element */
    const asks = [
      ['a links-card row', row],
      ['Enter at the link\'s element', () => KEYS.dispatch(enter, { where: 'plane', byKey: true })],
      ['a click on its symbol', () => click({ target: at('.sym', { link: PASSAGE, end: drawn(PASSAGE).key }), clientX: 0, clientY: 0, stopPropagation() {} })],
      ['a click on its marked span', () => click({ target: at('.lip', { links: PASSAGE, ends: drawn(PASSAGE).key }), clientX: 0, clientY: 0, stopPropagation() {} })],
    ];
    const lineage = FAKE.keyOf('op', { frame: F.outClaims(PASSAGE, 'audit') });
    /** the card's reads answered: its lineage's last read asked since `from`, no opening reading, and a turn for that answer to land */
    const answered = async (/** @type {number} */ from) => {
      const asked = () => fake.asked.slice(from).includes(lineage);
      for (let i = 0; i < 200 && !(asked() && !HOST.pending()); i++) await new Promise((r) => setTimeout(r, 0));
      assert.ok(asked(), 'the card was asked: its lineage read');
      await new Promise((r) => setTimeout(r, 0));
    };
    for (const [what, ask] of asks) {
      for (const backAtOnce of [true, false]) {
        await run(GO.leapTo(FAR));
        await run(GO.leapTo(D));
        await run(WALK.key('in'));
        for (let i = 0; i < 12 && WALK.current()?.link?.link.addr !== PASSAGE; i++) await run(WALK.key('down'));
        assert.equal(WALK.current()?.link?.link.addr, PASSAGE, 'the walk on the citation\'s element');
        const from = fake.asked.length;
        const asking = ask();
        // made at once: no turn passes between the act and the Back, so an act that awaits anything before its opening begins finds it begun after Back
        if (backAtOnce) await run(GO.back());
        await answered(from);
        await asking;
        if (backAtOnce) {
          assert.equal(TRAIL.current()?.addr, FAR, `${what}: Back landed at the entry behind`);
          assert.equal(HOST.currentState(), null, `${what}: nothing shows over the place Back landed`);
        } else {
          assert.equal(HOST.currentState()?.id, 'anatomy:' + PASSAGE, `${what}: asked with no act after it, it shows`);
          HOST.dismiss();
        }
      }
    }
    await run(GO.leapTo(FAR));
    await run(GO.leapTo(D));
    const from = fake.asked.length;
    const asking = row();
    KEYS.esc();
    await answered(from);
    await asking;
    assert.equal(HOST.currentState()?.id, 'links:' + D, 'Esc made at once ended the card still reading, alone: the links card stands');
    KEYS.esc();
    assert.equal(HOST.currentState(), null, 'the next Esc dismisses the links card');
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window;
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a follow made while a card reads ends its opening as it is made: once the card\'s read answers nothing shows over the place the follow leaves, and the follow lands', async () => {
  await run(GO.leapTo(D));
  const card = fake.hold('op', { frame: F.showOrigin(D, 11, 5) });
  const projection = fake.hold('op', { frame: F.project(PASSAGE, 2, FAR) });
  const asked = PROV.wrote(D, 11, 5);
  const following = GO.follow(drawn(PASSAGE));
  card();
  await asked;
  assert.equal(HOST.currentState()?.id, 'reading:' + FAR, 'the card asked before the follow shows nothing, its projection still reading: the follow\'s reading face stands');
  projection();
  await run(following);
  assert.deepEqual(marks(), [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE }, [PASSAGE]], 'the follow landed, its arrival lit');
  assert.equal(HOST.currentState(), null, 'nothing over the landing');
  assert.deepEqual(fake.unanswered, []);
});

// who wrote the passages the reader meets where the jumps below land: C's first five positions, FAR's at 20
Object.assign(script, {
  [FAKE.keyOf('op', { frame: F.showOrigin(C, 1, 5) })]: { result: { as_of: 1, resp: 'addrs', addrs: [C] } },
  [FAKE.keyOf('op', { frame: F.showOrigin(FAR, 20, 5) })]: { result: { as_of: 1, resp: 'addrs', addrs: [FAR] } },
});

test('no landing ends chrome (issue #171\'s design decision: "a card ends when the camera leaves its place, not when a read lands"): a card shown while a jump is in the air stands over its landing, and one asked then opens there once its reads answer — a LEAP to a document whose text the page does not hold, a follow, a Forward reaching an entry still reading', async () => {
  /** @type {Array<[string, () => Promise<{release: () => void, jumping: Promise<unknown>, at: string, asks: [string, number]}>]>} each jump made with its read held — the read's release, the jump in the air, the place it lands, and the passage there a card is asked over */
  const jumps = [
    ['a LEAP to a document whose text the page does not hold', async () => {
      unread(); await run(GO.leapTo(D));
      const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
      return { release, jumping: GO.leapTo(C), at: C, asks: [C, 1] };
    }],
    ['a follow', async () => {
      await run(GO.leapTo(D));
      const release = fake.hold('op', { frame: F.project(PASSAGE, 2, FAR) });
      return { release, jumping: GO.follow(drawn(PASSAGE)), at: FAR, asks: [FAR, 20] };
    }],
    ['a Forward reaching an entry still reading', async () => {
      unread(); await run(GO.leapTo(D));
      const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
      const leap = GO.leapTo(C);
      await run(GO.back());
      return { release, jumping: Promise.all([leap, GO.forward()]), at: C, asks: [C, 1] };
    }],
  ];
  for (const [what, make] of jumps) {
    for (const asked of [false, true]) {
      const j = await make();
      assert.ok(GO.inAir() && HOST.currentState()?.id === 'reading:' + j.at, `${what}: in the air, reading where its camera went`);
      // the reader, while it is in the air: a card shown over the place on screen, or one asked there, its read slow
      const card = asked ? fake.hold('op', { frame: F.showOrigin(j.asks[0], j.asks[1], 5) }) : () => {};
      const opening = asked ? PROV.wrote(j.asks[0], j.asks[1], 5) : (HOST.show({ kind: 'card', id: 'a card', anchor: null, html: '<span class="label">a card</span>', acts: {} }), Promise.resolve());
      j.release();
      await run(j.jumping);
      const e = TRAIL.current();
      assert.ok(!GO.inAir() && e && e.addr === j.at && same(CAM.view(), e.view), `${what}: landed, the camera gone on to its entry's view`);
      card();
      await opening;
      assert.equal(HOST.currentState()?.id, asked ? 'provenance:wrote' : 'a card', asked ? `${what}: the card asked in the air opens over the landing once its read answers` : `${what}: the card shown in the air stands over the landing`);
      HOST.dismiss();
    }
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a face a read brings once it answered never covers a card asked while the read was out (issue #265\'s design decision: "The face stacks below the card, covering neither the card nor its focus. Esc closes the face first"): the card still reading through the face, its answer shown over it, the face below; Esc closes the face, then the card. A card asked before a navigation act is ended by the act, and the face it meets stands alone', async () => {
  takeDead();
  /** @type {Array<{what: string, act: () => Promise<unknown>, face: string, held: object | null, during: boolean}>} each act that faces, the face it shows, the read it faces on, and whether the card is asked while that read is out */
  const rows = [
    { what: 'a follow of a dead reference, the card asked while it read', act: () => GO.follow(drawn(DEAD)), face: 'face:doc_not_registered', held: F.retrieveDocVSpanSet(GONE), during: true },
    { what: 'a LEAP the board answers for with nothing, the card asked while it read', act: () => GO.leapTo(GONE), face: 'face:doc_not_registered', held: F.retrieveDocVSpanSet(GONE), during: true },
    { what: 'a follow of a link naming no far document, faced at once, the card asked before it', act: () => GO.follow({ ...drawn(PASSAGE), far: '' }), face: 'face:invalid', held: null, during: false },
    { what: 'a follow of a dead reference, faced once its read answers, the card asked before it', act: () => GO.follow(drawn(DEAD)), face: 'face:doc_not_registered', held: F.retrieveDocVSpanSet(GONE), during: false },
  ];
  for (const { what, act, face, held, during } of rows) {
    await run(GO.leapTo(D));
    REC.invalidate(GONE); // the board asked anew whether it answers for the far document
    const card = fake.hold('op', { frame: F.showOrigin(D, 11, 5) });
    const read = held ? fake.hold('op', { frame: held }) : () => {};
    let asked = during ? null : PROV.wrote(D, 11, 5);
    const acting = act();
    if (during) asked = PROV.wrote(D, 11, 5);
    read();
    await run(acting);
    assert.deepEqual([HOST.currentState()?.id, HOST.pending()], [face, during], `${what}: its face, ${during ? 'the card still reading through it' : 'the card ended by the act'}`);
    card();
    await asked;
    if (during) {
      assert.deepEqual([HOST.currentState()?.id, HOST.notice()?.id], ['provenance:wrote', face], `${what}: the card's answer shown, the face below it`);
      KEYS.esc();
      assert.deepEqual([HOST.currentState()?.id, HOST.notice()], ['provenance:wrote', null], `${what}: Esc closes the face first, the card standing`);
      KEYS.esc();
      assert.equal(HOST.currentState(), null, `${what}: the next Esc closes the card`);
    } else {
      assert.deepEqual([HOST.currentState()?.id, HOST.notice()], [face, null], `${what}: the card's answer shows nothing, the face alone`);
      HOST.dismiss();
    }
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a card the reader opened while a jump\'s read was out stands, its focus with it, whatever the read brings (issue #265\'s design decision; FP-36): the face stands below the card — a LEAP to an address the board says nothing about, a follow of a dead reference, a follow landing at a dead end, whose version offer is drawn there once its reads find it, a follow landing at a withheld document, a reach for another board the board refuses — the card\'s end never runs, no face takes the focus, a failure leaving it on the card\'s control, and Esc closes the face first, then the card', async () => {
  takeDead(); takeFloat(); takeLocked();
  const doc = /** @type {any} */ (globalThis.document), was = { contains: hostEl.contains, active: doc.activeElement };
  /** the card's act, holding the platform's focus */
  const control = { id: 'the card\'s act', focus() { doc.activeElement = control; }, blur() { if (doc.activeElement === control) doc.activeElement = null; } };
  hostEl.contains = /** @type {any} */ ((/** @type {unknown} */ x) => x === control);
  /** @type {Array<{what: string, prepare: () => void, held: object, jump: () => Promise<unknown>, face: string, failure: boolean}>} each jump, what the page holds before it, the read held while the card opens, the face it brings, and whether it is a failure the camera stays at */
  const rows = [
    { what: 'a LEAP to an address the board says nothing about', prepare: () => REC.invalidate(GONE), held: F.retrieveDocVSpanSet(GONE), jump: () => GO.leapTo(GONE), face: 'face:doc_not_registered', failure: true },
    { what: 'a follow of a dead reference', prepare: () => REC.invalidate(GONE), held: F.retrieveDocVSpanSet(GONE), jump: () => GO.follow(drawn(DEAD)), face: 'face:doc_not_registered', failure: true },
    { what: 'a follow landing at a dead end', prepare: () => memberUnread(), held: F.project(FLOAT, 2, FAR), jump: () => GO.follow(drawn(FLOAT)), face: 'face:floating', failure: false },
    { what: 'a follow landing at a withheld document', prepare: () => REC.invalidate(PRIVATE), held: F.retrieveDocVSpanSet(PRIVATE), jump: () => GO.follow(drawn(LOCKED)), face: 'face:withheld', failure: false },
    { what: 'a reach for another board the board refuses', prepare: () => REC.invalidate(REACH_GONE), held: F.retrieveDocVSpanSet(REACH_GONE), jump: () => GO.leapTo(REACH_GONE, { site: { span: { addr: D, pos: 11, width: 5 } } }), face: 'face:doc_not_registered', failure: true },
  ];
  try {
    for (const { what, prepare, held, jump, face, failure } of rows) {
      await run(GO.leapTo(D));
      prepare();
      const release = fake.hold('op', { frame: held });
      const jumping = jump();
      /** @type {boolean | null} how the card's end ran: replaced, or dismissed; null while it never did */
      let ended = null;
      HOST.show({ kind: 'card', id: 'a card', anchor: null, html: '<span class="label">a card</span><button data-run="act">act</button>', acts: {}, onDismiss: (replaced) => { ended = replaced; } });
      control.focus();
      release();
      await run(jumping);
      assert.deepEqual([HOST.currentState()?.id, ended, HOST.notice()?.id], ['a card', null, face], `${what}: the card stands, its end never run, the face below it`);
      assert.ok(!noticeEl.contains(doc.activeElement), `${what}: the face takes no focus`);
      if (failure) assert.equal(doc.activeElement, control, `${what}: the focus on the card's control, where the reader left it`);
      if (face === 'face:floating') {
        for (let i = 0; i < 50 && !HOST.notice()?.acts?.a0; i++) await new Promise((r) => setTimeout(r, 0));
        assert.ok(HOST.notice()?.acts?.a0 && noticeEl.innerHTML.includes(esc(t('F.floating.read', { k: 1 }))), `${what}: its version offer drawn on the face where it stands, below the card: ${noticeEl.innerHTML}`);
      }
      KEYS.esc();
      assert.deepEqual([HOST.currentState()?.id, HOST.notice(), ended], ['a card', null, null], `${what}: Esc closes the face first, the card standing`);
      if (failure) assert.equal(doc.activeElement, control, `${what}: the face's close moves no focus`);
      KEYS.esc();
      assert.deepEqual([HOST.currentState(), ended], [null, false], `${what}: the next Esc dismisses the card`);
    }
  } finally {
    hostEl.contains = was.contains; doc.activeElement = was.active;
    HOST.dismiss();
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a withheld document\'s face a return shows again while its clause\'s reads are out is no act on the chrome: a card asked while they read ends nothing of it, and once both have answered the card stands over the face (issue #265\'s design decision; FP-33, FP-36)', async () => {
  takeLocked();
  REC.invalidate(PRIVATE);
  await run(GO.leapTo(D));
  await run(GO.follow(drawn(LOCKED)));
  assert.equal(faceShown()?.id, 'face:withheld', 'the follow landed at the withheld document, its face at its place');
  await run(GO.leapTo(D));
  REC.claimsChanged(PRIVATE, false); // the claims on it changed while the reader was away: its face reads them again
  const claims = fake.hold('op', { frame: F.editionClaimsAt(PRIVATE) }), key = FAKE.keyOf('op', { frame: F.editionClaimsAt(PRIVATE) }), from = fake.asked.length;
  const back = GO.back();
  for (let i = 0; i < 50 && !fake.asked.slice(from).includes(key); i++) await new Promise((r) => setTimeout(r, 0));
  assert.ok(fake.asked.slice(from).includes(key), 'the face shown again reads its clause first');
  /** @type {(v: boolean) => void} */
  let answer = () => {};
  const asked = HOST.opening(() => new Promise((r) => { answer = r; }), () => HOST.show({ kind: 'card', id: 'a card', anchor: null, html: '<span class="label">a card</span>', acts: {} }));
  claims();
  await run(back);
  for (let i = 0; i < 50 && !HOST.currentIs('face:withheld'); i++) await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([HOST.currentState()?.id, HOST.pending()], ['face:withheld', true], 'its clause read: the face shows, the card still reading');
  answer(true);
  await asked;
  assert.deepEqual([HOST.currentState()?.id, HOST.notice()?.id], ['a card', 'face:withheld'], 'the card over it, the face below');
  KEYS.esc(); KEYS.esc();
  assert.deepEqual([HOST.currentState(), HOST.notice()], [null, null]);
  assert.deepEqual(fake.unanswered, []);
});

test('a card shown over a face a read brought, standing alone, takes the place over it and the face moves below it; one a return reopens stands over the entry\'s notice shown again (issue #265\'s design decision): a follow landing at a dead end, the links card opened there, a LEAP away and Back', async () => {
  takeFloat();
  memberUnread();
  await run(GO.leapTo(D));
  await run(GO.follow(drawn(FLOAT)));
  assert.deepEqual([HOST.currentState()?.id, HOST.notice()], ['face:floating', null], 'the dead end\'s face alone at the landing');
  LINKS.show(FAR);
  assert.deepEqual([HOST.currentState()?.id, HOST.notice()?.id], ['links:' + FAR, 'face:floating'], 'the links card over it, the face below');
  await run(GO.leapTo(D));
  assert.deepEqual([HOST.currentState(), HOST.notice()], [null, null], 'leaving the place takes both down');
  await run(GO.back()); await reopening();
  assert.deepEqual([TRAIL.current()?.addr, HOST.currentState()?.id, HOST.notice()?.id], [FAR, 'links:' + FAR, 'face:floating'], 'Back: the links card reopened over the dead end\'s face shown again');
  KEYS.esc(); KEYS.esc();
  assert.deepEqual([HOST.currentState(), HOST.notice()], [null, null]);
  assert.deepEqual(fake.unanswered, []);
});

test('an overlay whose field holds the caret — a walk\'s moment being answered — stands through a jump (#171\'s rule 2: "A landing never closes a field the reader is typing in"): its departure leaves it standing, no face takes its place, and the entry holds the face the read met as its notice — a LEAP that reaches, one whose read fails in the air, one landing at a dead end', async () => {
  /** the moment's answer field, the platform's focus in it: inside the overlay's element */
  const field = { id: 'the answer', matches: (/** @type {string} */ sel) => sel.split(',').map((s) => s.trim()).includes('input'), blur() {}, focus() {} };
  const was = hostEl.contains;
  hostEl.contains = /** @type {any} */ ((/** @type {unknown} */ x) => x === field);
  const site = { span: { addr: D, pos: 11, width: 5 } };
  /** @type {Array<[string, () => void, object, () => Promise<unknown>, string, string | null]>} each jump: what it is, what the page holds before it, the read held while it is in the air, the jump, the place it lands, and the face its entry holds as its notice */
  const jumps = [
    ['a LEAP to an address on a board the plane does not draw, reaching for it', () => REC.invalidate(REACH), F.retrieveDocVSpanSet(REACH), () => GO.leapTo(REACH, { site }), REACH, null],
    ['a LEAP whose read learns the board says nothing about its address, in the air', () => REC.invalidate(GONE), F.retrieveDocVSpanSet(GONE), () => GO.leapTo(GONE), GONE, 'unregistered'],
    ['a LEAP carrying a passage the text landed in holds none of, at the dead end', () => {}, carried(UNSHARED, FAR, FAR_EXTENT), () => GO.leapTo(FAR, { how: 'leap', carry: UNSHARED }), FAR, 'floating'],
  ];
  try {
    for (const [i, [what, before, held, jump, at, notice]] of jumps.entries()) {
      await run(GO.leapTo(D));
      before();
      // a walk of its own for each jump: the moment the last one left folded opens its walk's next folded
      const id = 'm-171-' + i;
      FACES.moment({ id, kind: 'ask', data: { text: 'name this' }, walk: 'w-171-' + i, board: null, answerable: true });
      globalThis.document.activeElement = /** @type {any} */ (field);
      const release = fake.hold('op', { frame: held });
      const jumping = jump();
      assert.equal(HOST.currentState()?.id, 'moment:' + id, `${what}: the moment stands as the jump is made, no reaching or reading face in its place`);
      release();
      await run(jumping);
      const e = TRAIL.current();
      assert.deepEqual([e?.addr, e?.notice?.face ?? null], [at, notice], `${what}: its entry ${notice ? 'holds the face the read met as its notice' : 'at the place it landed'}`);
      assert.deepEqual([HOST.currentState()?.id, globalThis.document.activeElement], ['moment:' + id, /** @type {any} */ (field)], `${what}: the moment stands through it, its field holding the focus`);
      globalThis.document.activeElement = /** @type {any} */ (null);
      HOST.dismiss();
    }
  } finally {
    hostEl.contains = was;
    globalThis.document.activeElement = /** @type {any} */ (null);
  }
  assert.deepEqual(fake.unanswered, []);
});

/** the LEAP box's stand-ins, its input a field the platform's focus lands on: what N-LEAP is attached to */
function leapBox() {
  const part = () => ({ innerHTML: '', value: '', setAttribute() {}, removeAttribute() {}, addEventListener() {}, contains: (/** @type {unknown} */ _x) => false, classList: { add() {}, remove() {} } });
  const doc = /** @type {any} */ (globalThis.document);
  const input = Object.assign(part(), {
    selected: /** @type {[number, number] | null} */ (null),
    focus() { doc.activeElement = input; },
    blur() { if (doc.activeElement === input) doc.activeElement = null; },
    select() { input.selected = [0, input.value.length]; },
    matches: (/** @type {string} */ sel) => sel.split(',').map((s) => s.trim()).includes('input'),
  });
  return { box: { ...part(), contains: (/** @type {unknown} */ x) => x === input }, input, rows: part(), note: part() };
}

test('a key held while a jump is in the air and made at its landing takes nothing from a field the reader typed in meanwhile (issue #267\'s design decision; FP-20): an Esc made there passes over the LEAP box, which stands with its text, its caret and its focus, and over a walk\'s moment whose answer holds the caret, a notice below the moment closing first; a Mod+L made there leaves the box as it stands; the reader\'s own Esc closes the box', async () => {
  const doc = /** @type {any} */ (globalThis.document), b = leapBox(), was = hostEl.contains;
  LEAP.attach(/** @type {any} */ (b), () => D);
  /** the moment's answer field, the platform's focus in it: inside the overlay's element */
  const field = { id: 'the answer', matches: (/** @type {string} */ sel) => sel.split(',').map((s) => s.trim()).includes('input'), blur() {}, focus() {} };
  try {
    for (const [what, key] of /** @type {Array<[string, any]>} */ ([['Esc', keyOf('Escape')], ['Mod+L', keyOf('l', MOD)]])) {
      unread();
      await run(GO.leapTo(D));
      doc.activeElement = null;
      const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
      const leap = GO.leapTo(C);
      assert.deepEqual([await KEYS.dispatch(key, PLANE), KEYS.holding()], [true, 1], `${what}: held as it is pressed in the air`);
      LEAP.open();
      b.input.value = 'typed'; b.input.selected = [5, 5];
      release();
      await run(leap);
      await drained();
      assert.deepEqual([LEAP.isOpen(), b.input.value, b.input.selected, doc.activeElement === b.input], [true, 'typed', [5, 5], true], `${what} made at the landing: the box stands with its text, its caret and its focus`);
      KEYS.esc();
      assert.equal(LEAP.isOpen(), false, `${what}: the reader's own Esc closes the box`);
    }
    hostEl.contains = /** @type {any} */ ((/** @type {unknown} */ x) => x === field);
    takeFloat();
    for (const [what, follows] of /** @type {Array<[string, boolean]>} */ ([['a LEAP landing', false], ['a follow landing at a dead end, its face a notice below the moment', true]])) {
      unread(); memberUnread();
      await run(GO.leapTo(D));
      doc.activeElement = null;
      const id = 'm-267-' + Number(follows);
      FACES.moment({ id, kind: 'ask', data: { text: 'name this' }, walk: 'w-267-' + Number(follows), board: null, answerable: true });
      doc.activeElement = field;
      const release = fake.hold('op', { frame: follows ? F.project(FLOAT, 2, FAR) : F.retrieveDocVSpanSet(C) });
      const jump = follows ? GO.follow(drawn(FLOAT)) : GO.leapTo(C);
      assert.deepEqual([await KEYS.dispatch(keyOf('Escape'), PLANE), KEYS.holding()], [true, 1], `${what}: Esc held as it is pressed in the air`);
      release();
      await run(jump);
      await drained();
      assert.deepEqual([HOST.currentState()?.id, HOST.notice(), doc.activeElement === field], ['moment:' + id, null, true], `${what}: the Esc made at the landing ${follows ? 'closes the notice below the moment, which' : 'passes over the moment, which'} stands with its field holding the caret`);
      doc.activeElement = null;
      HOST.dismiss();
    }
    for (let i = 0; i < 50; i++) await new Promise((r) => setTimeout(r, 0));
  } finally {
    hostEl.contains = was;
    doc.activeElement = null;
    LEAP.close();
    HOST.dismiss();
  }
  assert.deepEqual(fake.unanswered, []);
});

test('Enter at a withheld run shows its face whole, C-67\'s pointer its act — run by a key, the LEAP to the edition its claim names, the ring drawn, Back returning to the run; the QUOTING sibling a line and no act; no claim, the head and the arm alone; Enter at any other span selects it', async () => {
  const platform = { window: globalThis.window };
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  /** Enter as the platform delivers it at the plane */
  const enter = /** @type {any} */ ({ key: 'Enter', keyCode: 13, isComposing: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault() {} });
  const press = () => KEYS.dispatch(enter, { where: 'plane', byKey: true });
  /** the face's words past its head, as the host wrote them: the arm, and the clause where one stands */
  const below = () => { const o = HOST.currentState(); return o ? o.html.slice(o.html.indexOf('<div class="arm"')) : null; };
  try {
    takeWindows();
    await run(GO.leapTo(WINDOWS, { pos: RUN }));
    assert.deepEqual(walkAt(), ['block', WINDOWS, RUN], 'the walk on the run');
    const arm = entitlementArm({ account: '1.0.1', keyPresent: false }, '1.0.2');
    const head = `<div class="face-text" data-string="B1.withheld-run">${addressedHTML(t('B1.withheld-run', { owner: '1.0.2', account: '1.0.2', width: 240, origin: ORIGIN }))}</div>`;
    await press();
    let o = HOST.currentState();
    assert.equal(o?.id, 'face:withheld-run', 'Enter at the run shows its face whole (K-7)');
    assert.ok(o && o.html.startsWith(head), `its head: ${o && o.html}`);
    assert.equal(below(), `<div class="arm" data-string="${arm.id}">${esc(arm.text)}</div><div class="clause" data-string="C-67.pointer"><button data-run="follow" data-claim="${EDITION_CLAIM}" data-home="${EDITION}">${esc(t('C-67.pointer'))}</button></div>`,
      'the arm, then the pointer: a button following 1.0.2\'s passing claim');
    assert.deepEqual([o?.takeFocus, SEL.selected(), GO.arrivalMark()], [undefined, null, null], 'it takes no focus; nothing selected, nothing marked');
    const act = o && o.acts ? o.acts.follow : null;
    assert.ok(act, 'the pointer is the face\'s act');
    const n = TRAIL.length();
    await run(Promise.resolve(act(/** @type {any} */ ({}), true)));
    const e = TRAIL.current();
    assert.deepEqual([TRAIL.length(), e && [e.addr, e.pos, e.width], departed()?.step], [n + 1, [EDITION, null, null], null], 'a trail entry at the edition, landed in whole, the run\'s entry recording no step: no link followed, no passage carried');
    assert.deepEqual([walkAt(), WALK.ringShown(), HOST.currentState(), marks()], [['document', EDITION, null], true, null, [null, []]], 'the walk on the edition, the ring drawn — a key made the act — the face gone, nothing lit');
    await run(GO.back());
    assert.deepEqual(walkAt(), ['block', WINDOWS, RUN], 'Back returns to the run');
    REC.takeEditionClaims(ORIGIN, [QUOTING_CLAIM]);
    await press();
    o = HOST.currentState();
    assert.deepEqual([o?.id, below(), Object.keys(o?.acts || {})], ['face:withheld-run', `<div class="arm" data-string="${arm.id}">${addressedHTML(arm.text)}</div><div class="clause" data-string="C-67.quoting">${addressedHTML(t('C-67.quoting', { claimant: '1.0.2' }))}</div>`, []], 'every claim quoting the draft: the QUOTING sibling a line, and no act');
    KEYS.esc();
    REC.takeEditionClaims(ORIGIN, []);
    await press();
    o = HOST.currentState();
    assert.deepEqual([o?.id, below(), Object.keys(o?.acts || {})], ['face:withheld-run', `<div class="arm" data-string="${arm.id}">${esc(arm.text)}</div>`, []], 'no claim: the head and the arm alone');
    KEYS.esc();
    assert.equal(HOST.currentState(), null, 'Esc dismisses the face');
    await run(WALK.key('up'));
    await press();
    assert.deepEqual([walkAt(), SEL.selected()], [['block', WINDOWS, 1], { addr: WINDOWS, pos: 1, width: RUN - 1 }], 'Enter at the span before the run selects it whole (D8)');
    SEL.clear();
  } finally {
    globalThis.window = platform.window;
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a tail pressed (issue #132) reads its documents whole first, then shows its one link\'s card — its far end in the words its tail carries — or lists its several links, each row naming its far end and opening that link\'s card; a Back made while it reads shows nothing', async () => {
  takeDead();
  await run(GO.leapTo(D));
  await PUMP.loadWhole(GONE);
  assert.equal(REC.doc(GONE).refused, 'unregistered', 'the board says nothing of the dead reference\'s address');
  const quoted = () => (hostEl.innerHTML.match(/<div class="end far">.*?<div class="quoted">(.*?)<\/div>/) || [])[1];
  // one link: its card, at its own bytes, its far end named as its tail and its mirror item name it
  await ANATOMY.fromTail({ docs: [D], links: [DEAD], world: { x: 0, y: 0 } });
  assert.deepEqual([HOST.currentState()?.id, HOST.currentState()?.anchor], ['anatomy:' + DEAD, { span: { addr: D, pos: 23, width: 3 } }], 'its card, at the link\'s own bytes');
  assert.equal(quoted(), esc(t('L.client-words', { words: t('L.far.empty') })), 'its far end: no document here yet, bracketed — the reader\'s own account, the index complete and listing none there');
  HOST.dismiss();
  // several: listed at the tail, each row its far end named, opening its link's card
  await ANATOMY.fromTail({ docs: [D], links: [DEAD, PASSAGE], world: { x: 5, y: 6 } });
  const o = HOST.currentState();
  assert.deepEqual([o?.id, o?.kind, o?.anchor], ['tail', 'list', { world: { x: 5, y: 6 } }], 'listed at the tail');
  for (const l of [DEAD, PASSAGE]) assert.ok(hostEl.innerHTML.includes(LK.farLabelHTML(drawn(l))), `${l}'s row names its far end: ${hostEl.innerHTML}`);
  assert.ok(hostEl.innerHTML.includes(`<span class="id">${GONE}</span>${esc(` · `)}${esc('[')}${esc(t('L.far.empty'))}${esc(']')}`), 'the dead reference\'s row says what a follow will meet, bracketed, its address in the identifier\'s face');
  const first = o && o.acts ? o.acts.t0 : null;
  assert.ok(first, 'a row for each link');
  await first(/** @type {any} */ (hostEl), false);
  assert.equal(HOST.currentState()?.id, 'anatomy:' + DEAD, 'the first row opens its link\'s card');
  HOST.dismiss();
  // the page holding none of D's text, as at mid scale: D read whole first, its links then listed
  REC.invalidate(D);
  const from = fake.asked.length;
  await ANATOMY.fromTail({ docs: [D], links: [PASSAGE, WHOLE], world: { x: 0, y: 0 } });
  assert.ok(fake.asked.slice(from).includes(FAKE.keyOf('op', { frame: F.retrieveV(D, 1, NEAR_EXTENT) })), 'D read whole');
  assert.equal(HOST.currentState()?.id, 'tail', 'its links listed');
  HOST.dismiss();
  // a Back made while it reads: nothing shows over the place Back landed
  await run(GO.leapTo(FAR));
  await run(GO.leapTo(D));
  REC.invalidate(D);
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(D) });
  const opening = ANATOMY.fromTail({ docs: [D], links: [PASSAGE, WHOLE], world: { x: 0, y: 0 } });
  await run(GO.back());
  release();
  await opening;
  assert.equal(HOST.currentState(), null, 'nothing shows over the place Back landed');
  await PUMP.loadWhole(D);
  assert.deepEqual(fake.unanswered, []);
});

// ---- THE VERSION MOVE (FP-22) ------------------------------------

/** a `compare` answer from `d1`'s text into `d2`'s: each pair its position in `d1`, its position in `d2`, its positions */
const between = (/** @type {string} */ d1, /** @type {string} */ d2, /** @type {Array<[number, number, number]>} */ pairs) => ({ result: { as_of: 1, resp: 'compare', pairs: pairs.map(([u1, u2, width]) => ({ d1, d2, u1: { ordinal: String(u1), subspace: '1' }, u2: { ordinal: String(u2), subspace: '1' }, width: String(width) })) } });
/** FAR's first paragraph, 'The far edition.': a passage neither of its members holds */
const FAR_FIRST = { addr: FAR, pos: 1, width: 'The far edition.'.length };
/** ten positions of FAR's second paragraph, whose compare into its first member the board does not answer while `versionOutage` stands */
const FAR_TEN = { addr: FAR, pos: FAR_HELD.pos + 1, width: 10 };
let versionOutage = true;
Object.assign(script, {
  [FAKE.keyOf('op', { frame: carried(FAR_FIRST, FAR1, FAR_EXTENT) })]: between(FAR, FAR1, []),
  [FAKE.keyOf('op', { frame: carried(FAR_FIRST, FAR2, FAR_EXTENT) })]: between(FAR, FAR2, []),
  // FAR whole against its first member whole: its second paragraph shared, its first not; against its second member, nothing
  [FAKE.keyOf('op', { frame: carried({ addr: FAR, pos: 1, width: FAR_EXTENT }, FAR1, FAR_EXTENT) })]: between(FAR, FAR1, [[FAR_HELD.pos, FAR_HELD.pos, FAR_HELD.width]]),
  [FAKE.keyOf('op', { frame: carried({ addr: FAR, pos: 1, width: FAR_EXTENT }, FAR2, FAR_EXTENT) })]: between(FAR, FAR2, []),
  // the second paragraph held in FAR's second member, against its first and against itself: there whole
  [FAKE.keyOf('op', { frame: carried({ addr: FAR2, ...FAR_HELD }, FAR1, FAR_EXTENT) })]: between(FAR2, FAR1, [[FAR_HELD.pos, FAR_HELD.pos, FAR_HELD.width]]),
  [FAKE.keyOf('op', { frame: carried({ addr: FAR2, ...FAR_HELD }, FAR2, FAR_EXTENT) })]: between(FAR2, FAR2, [[FAR_HELD.pos, FAR_HELD.pos, FAR_HELD.width]]),
  // who wrote FAR's passage at 20, asked again over FAR's second member, which holds it there
  [FAKE.keyOf('op', { frame: F.showOrigin(FAR2, 20, 5) })]: { result: { as_of: 1, resp: 'addrs', addrs: [FAR] } },
});

/** FAR's second member's bytes FAR's own, as a member minted against FAR shares them — its text held first, so no read sets them back: what the re-check across a version places a surface's bytes by */
async function sharedBytes() { await PUMP.loadWhole(FAR2); REC.takeImage(FAR2, 1, [{ iStart: FAR + '.0.1.1', width: FAR_EXTENT }]); }
/** FAR's second member's bytes its own again, as the script answers them */
const ownBytes = () => REC.takeImage(FAR2, 1, [{ iStart: FAR2 + '.0.1.1', width: FAR_EXTENT }]);
/** the status region stubbed: what it was given to say, each in turn */
function statusSaid() {
  /** @type {string[]} */
  const said = [];
  FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() {}, set textContent(/** @type {string} */ v) { said.push(v); } }) });
  return said;
}
/** does the notice below the overlay carry these words, said through the status region as a face no landing tells is (O-HOST's `stack`)? */
const saidBelow = (/** @type {string} */ words) => { const n = HOST.notice(); return !!n && !n.told && n.html.includes(esc(words)); };
Object.defineProperty(script, FAKE.keyOf('op', { frame: carried(FAR_TEN, FAR1, FAR_EXTENT) }), {
  enumerable: true,
  get: () => (versionOutage ? { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } } : between(FAR, FAR1, [[FAR_TEN.pos, FAR_TEN.pos, FAR_TEN.width]])),
});

/** a version move run to its end, each turn of it watched: whether the camera flew at any of them */
async function inPlace(/** @type {unknown} */ act) {
  let done = false, flew = CAM.flying();
  void Promise.resolve(act).then(() => { done = true; });
  for (let i = 0; i < 200 && !done; i++) { await new Promise((r) => setTimeout(r, 0)); flew = flew || CAM.flying(); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done, 'the act ran to its end');
  return flew;
}

test('a version move lands in place (issue #154): the versions list\'s read act never flies — the camera stands where it stood — and the box takes the member, its entry pushed recording the passage carried, the arrival at its counterpart there and the walk on it; the list stands through the move, its reading face below it until the read answers, and is read again at the member over the passage there, version 2 current (issue #266); Back restores the earlier version and its view, lighting the passage where the move was made, the list reopened there over the same passage, its rows read again (issue #264), and Forward takes the member again, the list it left standing there reopened with it', async () => {
  await run(GO.leapTo(FAR));
  assert.equal(GO.shownIn(FAR), FAR, 'FAR\'s box shows its plain address, the trunk head');
  REC.takeMembers(FAR, 2);
  await sharedBytes();
  try {
    await VERSIONS.open(FAR, FAR_HELD.pos, null);
    const read = HOST.currentState()?.acts?.read2;
    assert.ok(read, 'the second member\'s row offers its read act');
    const at = CAM.view(), n = TRAIL.length();
    const release = fake.hold('op', { frame: heldIn(FAR2) });
    const moving = Promise.resolve(read(/** @type {any} */ (hostEl), false));
    let flew = false;
    for (let i = 0; i < 20; i++) { await new Promise((r) => setTimeout(r, 0)); flew = flew || CAM.flying(); }
    assert.deepEqual([HOST.currentState()?.id, HOST.notice()?.id], ['versions:' + FAR, 'reading:' + FAR2], 'the list standing while the move reads, its reading face the notice below it');
    let asked = fake.asked.length;
    release();
    assert.equal((await inPlace(moving)) || flew, false, 'no flight at any turn of it');
    assert.ok(same(CAM.view(), at), 'the camera where it stood');
    assert.deepEqual([GO.shownIn(FAR), GO.shownIn(FAR2), GO.shownIn(FAR1)], [FAR2, FAR2, FAR2], 'the box shows the member, whichever version names it');
    const e = TRAIL.current();
    assert.deepEqual([TRAIL.length(), e && [e.addr, e.pos, e.width]], [n + 1, [FAR2, FAR_HELD.pos, FAR_HELD.width]], 'one entry pushed, at the counterpart');
    assert.deepEqual(departed()?.step, { kind: 'carry', from: FAR, to: FAR2, spans: [{ prefix: FAR + '.0.1', ordinal: FAR_HELD.pos, width: FAR_HELD.width }] }, 'the entry departed records the passage carried, by identity');
    assert.deepEqual(GO.arrivalMark(), { addr: FAR2, pos: FAR_HELD.pos, runs: [{ pos: FAR_HELD.pos, width: FAR_HELD.width }], link: null }, 'its counterpart outlined in the member');
    assert.deepEqual([walkAt(), WALK.landedAt()], [['block', FAR2, FAR_HELD.pos], FAR_HELD.pos], 'the walk on the member\'s span holding it');
    await reopening();
    const kept = HOST.currentState(), keptAbout = /** @type {VERSIONS.About} */ (kept?.about);
    assert.deepEqual([kept?.id, keptAbout.addr, keptAbout.held && [keptAbout.held.pos, keptAbout.held.width], HOST.notice()], ['versions:' + FAR, FAR2, [FAR_HELD.pos, FAR_HELD.width], null], 'the list standing, read again at the member over the passage there, no face below it');
    assert.ok(hostEl.innerHTML.includes('data-run="read2" aria-current="true"'), `version 2 current: ${hostEl.innerHTML}`);
    assert.ok(fake.asked.slice(asked).includes(FAKE.keyOf('op', { frame: carried({ addr: FAR2, ...FAR_HELD }, FAR1, FAR_EXTENT) })), 'its rows read again from the member');
    asked = fake.asked.length;
    await run(GO.back()); await reopening();
    assert.deepEqual([GO.shownIn(FAR), TRAIL.current()?.addr, walkAt()?.[1]], [FAR, FAR, FAR], 'Back restores the earlier version');
    assert.ok(same(CAM.view(), at), 'and its view');
    assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: FAR_HELD.pos, runs: [{ pos: FAR_HELD.pos, width: FAR_HELD.width }], link: null }, 'lighting the passage where the move was made (issue #152)');
    const list = HOST.currentState(), about = /** @type {VERSIONS.About} */ (list?.about);
    assert.deepEqual([list?.id, about.addr, about.held && [about.held.pos, about.held.width]], ['versions:' + FAR, FAR, [FAR_HELD.pos, FAR_HELD.width]], 'the list the move was made from, reopened over the passage it held');
    assert.ok(fake.asked.slice(asked).includes(FAKE.keyOf('op', { frame: heldIn(FAR2) })), 'its rows read again: what each member holds of the passage');
    await run(GO.forward()); await reopening();
    const ahead = HOST.currentState();
    assert.deepEqual([GO.shownIn(FAR), TRAIL.current()?.addr, ahead?.id, /** @type {VERSIONS.About} */ (ahead?.about).addr], [FAR2, FAR2, 'versions:' + FAR, FAR2], 'Forward takes the member again, the list it left standing there reopened with it');
    await run(GO.leapTo(FAR));
  } finally { ownBytes(); }
  assert.deepEqual(fake.unanswered, []);
});

test('a version move to a version that lacks the passage held keeps its line at the nearest passage the two versions share, the box saying the passage is not in this version; one sharing nothing with it takes the line at its head (issue #154)', async () => {
  await run(GO.leapTo(FAR));
  const at = CAM.view();
  assert.equal(await inPlace(GO.toVersion(FAR1, { carry: FAR_FIRST })), false, 'no flight');
  assert.ok(same(CAM.view(), at), 'the camera where it stood');
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width, e.notice?.face], [FAR1, FAR_HELD.pos, null, 'floating'], 'its entry at the second paragraph, the first position the two share past the passage, the dead end\'s face its notice');
  assert.deepEqual([GO.shownIn(FAR), GO.arrivalMark(), walkAt()], [FAR1, null, ['block', FAR1, FAR_HELD.pos]], 'the box takes the member, nothing outlined, the walk at that shared passage');
  const f = faceShown();
  assert.ok(f && f.id === 'face:floating' && f.html.includes(esc(t('F.floating.member', { k: 1 }))) && !f.acts, `the face: "its passage is not in version 1", no act: ${f && f.html}`);
  assert.deepEqual(GO.described(), { addr: FAR1, pos: FAR_HELD.pos, words: t('F.floating.member', { k: 1 }), runs: [] }, 'the description of the item landed on');
  await run(GO.leapTo(FAR));
  assert.equal(await inPlace(GO.toVersion(FAR2, { carry: FAR_FIRST })), false);
  assert.deepEqual([TRAIL.current()?.pos, walkAt(), faceShown()?.id], [1, ['block', FAR2, 1], 'face:floating'], 'sharing nothing: the version\'s head takes the line, the face as before');
  await run(GO.leapTo(FAR));
  assert.deepEqual(fake.unanswered, []);
});

test('a version move whose compare the board does not answer lands in place at the version\'s head, unmarked, saying it could not tell, with "try again", which lands in place at the counterpart, its entry settled there and no trail move of its own (issue #154)', async () => {
  versionOutage = true;
  try {
    await run(GO.leapTo(FAR));
    const at = CAM.view();
    assert.equal(await inPlace(GO.toVersion(FAR1, { carry: FAR_TEN })), false, 'no flight');
    assert.deepEqual([GO.arrivalMark(), walkAt(), GO.landing()?.said?.state, GO.landingOffers().again], [null, ['block', FAR1, 1], 'unknown', true], 'unmarked at the head, couldn\'t tell, "try again" offered');
    const entry = TRAIL.current(), n = TRAIL.length();
    versionOutage = false;
    GO.landingAct('again');
    for (let i = 0; i < 200 && !GO.arrivalMark(); i++) await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual([GO.arrivalMark(), GO.landingLine()], [{ addr: FAR1, pos: FAR_TEN.pos, runs: [{ pos: FAR_TEN.pos, width: FAR_TEN.width }], link: null }, null], 'answered: its counterpart outlined, in one piece, no line');
    assert.deepEqual([TRAIL.length(), TRAIL.current() === entry, entry && [entry.pos, entry.width], walkAt()], [n, true, [FAR_TEN.pos, FAR_TEN.width], ['block', FAR1, FAR_HELD.pos]], 'no trail move: its entry settled at the counterpart, the walk on it');
    assert.ok(!CAM.flying() && same(CAM.view(), at), 'never a flight');
  } finally { versionOutage = true; }
  await run(GO.leapTo(FAR));
  assert.deepEqual(fake.unanswered, []);
});

test('a version move keeps the selection standing (issue #266\'s design decision: "`landInPlace` stops clearing the selection"): carried with its own card open, it moves to its counterpart in the version moved to, its card drawn again over it and nothing said of it, the landing saying it; carried under the versions list, it moves so, the list read again at the member; on a passage the version moved to holds none of, carried by no move, it stays on the version it names, its card standing, the dead end\'s face below the card, said', async () => {
  const platform = { window: globalThis.window };
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  const said = statusSaid(), member = { addr: FAR2, pos: FAR_HELD.pos, width: FAR_HELD.width };
  REC.takeMembers(FAR, 2);
  await sharedBytes();
  try {
    await run(GO.leapTo(FAR));
    SEL.select(FAR, FAR_HELD.pos, FAR_HELD.width);
    assert.deepEqual([SEL.selected(), HOST.currentState()?.id], [{ addr: FAR, pos: FAR_HELD.pos, width: FAR_HELD.width }, 'selection'], 'the selection, its card open');
    said.length = 0;
    await inPlace(GO.toVersion(FAR2, { carry: { addr: FAR, ...FAR_HELD, selected: true } }));
    assert.deepEqual([SEL.selected(), HOST.currentState()?.id, HOST.currentState()?.anchor], [member, 'selection', { span: member }], 'carried with its own card open: on its counterpart in the member, its card drawn again over it');
    assert.ok(!said.includes(`${FAR2} · ${t('F.position', { p: FAR_HELD.pos })}`), `nothing said of where it stands: the landing says it — ${said}`);
    await run(GO.leapTo(FAR));
    SEL.select(FAR, FAR_HELD.pos, FAR_HELD.width);
    await VERSIONS.open(FAR, FAR_HELD.pos, null, FAR_HELD.width);
    assert.deepEqual([HOST.currentState()?.id, SEL.selected()?.addr], ['versions:' + FAR, FAR], 'the versions list over the selection');
    await inPlace(HOST.currentState()?.acts?.read2(/** @type {any} */ (hostEl), false));
    await reopening();
    assert.deepEqual([SEL.selected(), HOST.currentState()?.id, /** @type {VERSIONS.About} */ (HOST.currentState()?.about).addr], [member, 'versions:' + FAR, FAR2], 'carried under the list: on its counterpart, the list read again at the member');
    await run(GO.leapTo(FAR));
    SEL.select(FAR, FAR_FIRST.pos, FAR_FIRST.width);
    await inPlace(GO.toVersion(FAR1));
    assert.deepEqual([GO.shownIn(FAR), SEL.selected(), HOST.currentState()?.id, HOST.notice()?.id], [FAR1, { ...FAR_FIRST }, 'selection', 'face:floating'], 'a passage the first member holds none of: the selection stays on the version it names, its card standing, the dead end\'s face below the card');
    assert.ok(saidBelow(t('F.floating.member', { k: 1 })), `"its passage is not in version 1", said: ${HOST.notice()?.html}`);
    await run(GO.leapTo(FAR));
  } finally { SEL.clear(); HOST.dismiss(); ownBytes(); globalThis.window = platform.window; }
  assert.deepEqual(fake.unanswered, []);
});

test('a version move carries a card a slot\'s act opened at the walk\'s focused span, no selection standing, as it carries the selection\'s own: Mod+K\'s acts card at FAR\'s second paragraph, moved to FAR\'s second member, is drawn again over the paragraph\'s counterpart there, holding it, nothing selected (issue #471; FP-22, FP-36)', async () => {
  const platform = { window: globalThis.window };
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  REC.takeMembers(FAR, 2);
  await sharedBytes();
  /** the card standing: its id, where it stands, and the span it holds of its own (O-SELECTION's `About.at`) */
  const card = () => { const o = HOST.currentState(), a = /** @type {any} */ (o?.about); return [o?.id ?? null, o?.anchor ?? null, a && a.at ? { addr: a.at.addr, pos: a.at.pos, width: a.at.width } : null]; };
  try {
    await run(GO.leapTo(FAR));
    SEL.clear();
    await WALK.focusTo(FAR, FAR_HELD.pos);
    const b = /** @type {import('../model/records.js').Block} */ (REC.blockAt(FAR, FAR_HELD.pos)), para = { addr: FAR, pos: b.pos, width: b.width };
    assert.equal(SEL.inertChord('linkto'), true);
    assert.deepEqual([SEL.selected(), card()], [null, ['selection', { span: para }, para]], 'the acts card at the paragraph, which it holds, nothing selected');
    await inPlace(GO.toVersion(FAR2, { carry: { addr: FAR, ...FAR_HELD } }));
    await reopening();
    const there = { ...para, addr: FAR2 };
    assert.deepEqual([GO.shownIn(FAR), SEL.selected(), card()], [FAR2, null, ['selection', { span: there }, there]], 'moved: the card drawn again over the paragraph\'s counterpart in the member, holding it, nothing selected');
    await run(GO.leapTo(FAR));
  } finally { HOST.dismiss(); SEL.clear(); ownBytes(); globalThis.window = platform.window; }
  assert.deepEqual(fake.unanswered, []);
});

test('a card stands through a version move however early it was opened (issue #266\'s design decision: "open cards alike, however early they were opened"): one open as the move is made stands while it reads, the move\'s reading face the notice below it until the read answers; one opened while the move reads stands over that face; each, once the move lands, is asked again over the version moved to; one whose span the version moved to holds none of stays on the version it names, said, the dead end\'s face below it', async () => {
  const origin = (/** @type {string} */ doc) => FAKE.keyOf('op', { frame: F.showOrigin(doc, 20, 5) });
  const about = () => /** @type {PROV.About | undefined} */ (HOST.currentState()?.about);
  REC.takeMembers(FAR, 2);
  await sharedBytes();
  try {
    // open as the move is made
    await run(GO.leapTo(FAR));
    await PROV.wrote(FAR, 20, 5);
    assert.equal(HOST.currentState()?.id, 'provenance:wrote', 'who wrote this? open at FAR');
    let release = fake.hold('op', { frame: heldIn(FAR2) });
    let moving = GO.toVersion(FAR2, { carry: { addr: FAR, ...FAR_HELD } });
    for (let i = 0; i < 20; i++) await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual([HOST.currentState()?.id, HOST.notice()?.id, about()?.addr], ['provenance:wrote', 'reading:' + FAR2, FAR], 'the card stands while the move reads, its reading face the notice below it');
    let from = fake.asked.length;
    release();
    await inPlace(moving); await reopening();
    assert.deepEqual([HOST.currentState()?.id, about()?.addr, about()?.pos, HOST.notice()], ['provenance:wrote', FAR2, 20, null], 'landed: the card asked again over the member, the reading face gone');
    assert.ok(fake.asked.slice(from).includes(origin(FAR2)), '`show_origin` asked over the member');
    // opened while the move reads, over its reading face
    await run(GO.leapTo(FAR));
    release = fake.hold('op', { frame: heldIn(FAR2) });
    moving = GO.toVersion(FAR2, { carry: { addr: FAR, ...FAR_HELD } });
    for (let i = 0; i < 20; i++) await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual([HOST.currentState()?.id, HOST.notice()], ['reading:' + FAR2, null], 'the move reading, its face alone where nothing stands');
    await PROV.wrote(FAR, 20, 5);
    assert.deepEqual([HOST.currentState()?.id, HOST.notice()?.id, about()?.addr], ['provenance:wrote', 'reading:' + FAR2, FAR], 'the card opened on the version left, standing over the reading face');
    from = fake.asked.length;
    release();
    await inPlace(moving); await reopening();
    assert.deepEqual([HOST.currentState()?.id, about()?.addr, HOST.notice()], ['provenance:wrote', FAR2, null], 'landed: the card asked again over the member — never left describing a text gone from the box');
    assert.ok(fake.asked.slice(from).includes(origin(FAR2)), '`show_origin` asked over the member');
    // a span the version moved to holds none of
    await run(GO.leapTo(FAR));
    await PROV.wrote(FAR, 20, 5);
    await inPlace(GO.toVersion(FAR1)); await reopening();
    assert.deepEqual([GO.shownIn(FAR), HOST.currentState()?.id, about()?.addr, HOST.notice()?.id], [FAR1, 'provenance:wrote', FAR, 'face:floating'], 'a span the first member holds none of: the card stays on the version it names, the dead end\'s face below it');
    assert.ok(saidBelow(t('F.floating.member', { k: 1 })), `"its passage is not in version 1", said: ${HOST.notice()?.html}`);
    await run(GO.leapTo(FAR));
  } finally { ownBytes(); }
  assert.deepEqual(fake.unanswered, []);
});

test('only an act aimed at a box changes its version (issue #154): a LEAP to a version\'s address pins it, one to the plain address takes it back to the trunk head, a follow to the address its link names, Back and Forward to their entries\' — never HOME, WHOLE BOARD, a pan or a zoom', async () => {
  await run(GO.leapTo(FAR2));
  assert.equal(GO.shownIn(FAR), FAR2, 'a LEAP to a version\'s address');
  await run(GO.home());
  await run(GO.wholeBoard());
  CAM.zoomAt(0.5, 700, 450); CAM.panBy(30, 20);
  assert.equal(GO.shownIn(FAR), FAR2, 'HOME, WHOLE BOARD, a zoom and a pan change nothing');
  await run(GO.leapTo(FAR));
  assert.equal(GO.shownIn(FAR), FAR, 'a LEAP to the plain address: the trunk head again');
  await run(GO.back()); await run(GO.back()); await run(GO.back());
  assert.deepEqual([TRAIL.current()?.addr, GO.shownIn(FAR)], [FAR2, FAR2], 'Back to the member\'s entry arrives by its address');
  await run(GO.forward()); await run(GO.forward()); await run(GO.forward());
  assert.deepEqual([TRAIL.current()?.addr, GO.shownIn(FAR)], [FAR, FAR], 'Forward to the plain address\'s');
  await run(GO.leapTo(FAR2));
  await run(GO.leapTo(D));
  await run(GO.follow(drawn(PASSAGE)));
  assert.equal(GO.shownIn(FAR), FAR, 'a follow arrives at the address its link names: FAR, the trunk head');
  assert.deepEqual(fake.unanswered, []);
});

test('a newer version\'s arrival never changes what a box shows (issue #154; foundations §3.2): a box read at its plain address is pinned on the member being read, the walk with it, and Back after a move from it restores that member, never the newer head; nothing where the box is pinned already, where no member held the text before, for a daughter, or where the page holds none of the text', async () => {
  await run(GO.leapTo(FAR, { pos: FAR_HELD.pos }));
  REC.takeMembers(FAR, 2);
  GO.arrived(FAR + '.3');
  assert.equal(GO.shownIn(FAR), FAR2, 'pinned on the member being read, the head before the one published');
  for (let i = 0; i < 50 && walkAt()?.[1] !== FAR2; i++) await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(walkAt(), ['block', FAR2, FAR_HELD.pos], 'the walk on that member, at the span it stood on');
  GO.arrived(FAR + '.4');
  assert.equal(GO.shownIn(FAR), FAR2, 'pinned already: nothing');
  await inPlace(GO.toVersion(FAR1, { carry: { addr: FAR2, ...FAR_HELD } }));
  assert.equal(GO.shownIn(FAR), FAR1);
  await run(GO.back());
  assert.deepEqual([TRAIL.current()?.addr, GO.shownIn(FAR)], [FAR2, FAR2], 'Back restores the member read there — the entry re-took it as the move departed it — never the newer head');
  await run(GO.leapTo(D));
  GO.arrived(D + '.1');
  assert.equal(GO.shownIn(D), D, 'no member held D\'s text before its first: nothing');
  GO.arrived(D + '.2.1');
  assert.equal(GO.shownIn(D), D, 'a daughter moves no head: nothing');
  unread();
  GO.arrived(C + '.2');
  assert.equal(GO.shownIn(C), C, 'the page holds none of C\'s text: nothing');
  await run(GO.leapTo(FAR));
  assert.deepEqual(fake.unanswered, []);
});

test('a newer version\'s arrival carries the selection standing in the trunk to the member its box is pinned on, its card with it, at the same positions once that member holds the text — by the bytes it held as the version arrived, never those the bare address reads after, the newer head\'s (FP-23: its acts naming that member; issue #266)', async () => {
  const platform = { window: globalThis.window };
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  try {
    await run(GO.leapTo(FAR, { pos: FAR_HELD.pos }));
    REC.takeMembers(FAR, 2);
    SEL.select(FAR, FAR_HELD.pos, FAR_HELD.width);
    REC.invalidate(FAR2); // the member holds no text of its own: the arrival hands it the trunk's
    GO.arrived(FAR + '.3');
    assert.equal(GO.shownIn(FAR), FAR2, 'the box pinned on the member being read');
    assert.equal(REC.takeAsMember(FAR, FAR2), true, 'the member takes the trunk\'s text, as M-PUMP hands it on');
    // the bare address read again, as the newer head: other bytes at the selection's positions
    REC.takeSpanSet(FAR, [{ subspace: 1, ordinal: 1, positions: FAR_EXTENT }]);
    REC.takeDelivery(FAR, [{ pos: 1, width: FAR_EXTENT, kind: 'content', text: FAR_TEXT, ref: null, origin: null }]);
    REC.takeImage(FAR, 1, [{ iStart: '1.0.1.0.99.0.1.1', width: FAR_EXTENT }]);
    GO.surfacesAcross();
    const card = HOST.currentState();
    assert.deepEqual([SEL.selected(), card?.id, card?.anchor], [{ addr: FAR2, pos: FAR_HELD.pos, width: FAR_HELD.width }, 'selection', { span: { addr: FAR2, pos: FAR_HELD.pos, width: FAR_HELD.width } }], 'the selection on the member at the same positions, its card drawn again over it');
  } finally {
    SEL.clear(); HOST.dismiss();
    globalThis.window = platform.window;
    REC.invalidate(FAR); REC.invalidate(FAR2);
    await PUMP.loadWhole(FAR); await PUMP.loadWhole(FAR2);
  }
  await run(GO.leapTo(FAR));
  assert.deepEqual(fake.unanswered, []);
});

// ---- THE VERSION READ: a return restores the version its entry kept (issue #298) ------------------------------------

/** FAR and its second member read whole as the board answers them, and a LEAP to FAR's plain address, its box showing the trunk head */
async function farAfresh() {
  REC.invalidate(FAR); REC.invalidate(FAR2);
  await PUMP.loadWhole(FAR); await PUMP.loadWhole(FAR2);
  await run(GO.leapTo(FAR));
}
/** FAR's third member's arrival as M-PUMP hands it on (`arrive`): N-GO told, at the position given, then, where FAR's box took its second member, that member handed FAR's text, holding none of its own */
function publishFar3(/** @type {number | null} */ at = null) {
  REC.invalidate(FAR2);
  GO.arrived(FAR + '.3', at);
  if (GO.shownIn(FAR) === FAR2) REC.takeAsMember(FAR, FAR2);
}
/** FAR's second member answered by FAR's own bytes, as the board's member holds the text it was published with: put back by the function it answers */
function memberAsFar() {
  const key = FAKE.keyOf('op', { frame: F.image(FAR2, 1, FAR_EXTENT) }), was = script[key];
  /** @type {any} */ (script)[key] = { result: { as_of: 1, resp: 'runs', runs: [{ i_start: FAR + '.0.1.1', width: String(FAR_EXTENT) }] } };
  return () => { /** @type {any} */ (script)[key] = was; };
}
/** FAR and its second member read whole again as the board answers them, after a test handed FAR's text to the member */
async function farAgain() {
  REC.invalidate(FAR); REC.invalidate(FAR2);
  await PUMP.loadWhole(FAR); await PUMP.loadWhole(FAR2);
  await run(GO.leapTo(FAR));
}

test('Back to an edition read at its bare address shows the member read there once a newer version arrived while the reader was away — its entry, the trail list and the box naming it, the words read where they stood, nothing outlined and no face — its corner offering the newer version and the status region saying the arrival once, as if the reader had stayed; and the bare address, unmarked, while nothing has (issue #298\'s design decision: "Back pins the version that was read again … signed exactly as if the reader had stayed"; issue #240)', async () => {
  const platform = { getElementById: globalThis.document.getElementById };
  /** @type {any} */ (globalThis.document).getElementById = () => null;
  try {
    await farAfresh();
    await run(GO.leapTo(FAR, { pos: FAR_HELD.pos }));
    await run(GO.leapTo(D));
    await run(GO.back());
    assert.deepEqual([TRAIL.current()?.addr, GO.shownIn(FAR), GO.newerAt(FAR)], [FAR, FAR, null], 'nothing published since: the bare address, unmarked');
    const left = CAM.view();
    await run(GO.leapTo(D));
    const said = statusSaid(), told = () => said.filter((x) => x === t('F.arrival.pane', { k: 2 })).length;
    publishFar3();
    assert.deepEqual([TRAIL.all()[TRAIL.cursorIndex() - 1].addr, GO.shownIn(FAR), told()], [FAR2, FAR2, 0], 'version 3 arrived: the entry the reader left re-takes version 2, as the box does — FAR out of view, nothing said');
    await run(GO.back());
    assert.deepEqual([TRAIL.current()?.addr, GO.shownIn(FAR), walkAt()], [FAR2, FAR2, ['block', FAR2, FAR_HELD.pos]], 'Back: version 2, the walk on the span it stood on — never the newer head');
    assert.deepEqual([same(CAM.view(), left), GO.landing(), faceShown()], [true, null, null], 'the words read where they stood, nothing outlined and no face');
    assert.deepEqual([GO.newerAt(FAR2), told()], [3, 1], 'its corner offers version 3, the arrival said once there');
    TRAILLIST.open();
    const row = (hostEl.innerHTML.match(/aria-current="true"><span class="k">[^<]*<\/span> (.*?)<\/button>/) || [])[1] || '';
    HOST.dismiss();
    assert.ok(row.startsWith(`<span class="id">${FAR2}</span> · ${esc(t('F.position', { p: FAR_HELD.pos }))}`), `the trail list's row for the entry names version 2: ${row}`);
  } finally {
    /** @type {any} */ (globalThis.document).getElementById = platform.getElementById;
    HOST.dismiss();
    await farAgain();
  }
  assert.deepEqual(fake.unanswered, []);
});

test('Back to an edition the reader left at its bare address shows the member read there where its text was dropped before a newer version arrived, the box beside then showing the newer head: version 2 read and the words found in it (issue #298)', async () => {
  const put = memberAsFar();
  try {
    await farAfresh();
    await run(GO.leapTo(FAR, { pos: FAR_HELD.pos }));
    await run(GO.leapTo(D));
    REC.invalidate(FAR);
    publishFar3();
    assert.deepEqual([GO.shownIn(FAR), TRAIL.all()[TRAIL.cursorIndex() - 1].addr], [FAR, FAR2], 'the page held none of FAR\'s text: the box beside shows the trunk head, the entry left version 2');
    const from = fake.asked.length;
    await run(GO.back());
    assert.deepEqual([TRAIL.current()?.addr, GO.shownIn(FAR), walkAt(), GO.landing(), faceShown()], [FAR2, FAR2, ['block', FAR2, FAR_HELD.pos], null, null], 'Back: version 2, the words read found in it whole, nothing said');
    assert.ok(fake.asked.slice(from).includes(FAKE.keyOf('op', { frame: F.retrieveV(FAR2, 1, FAR_EXTENT) })) && !fake.asked.slice(from).includes(FAKE.keyOf('op', { frame: F.retrieveV(FAR, 1, FAR_EXTENT) })), 'version 2\'s text read beside the flight, never the bare address\'s');
  } finally {
    put();
    await farAgain();
  }
  assert.deepEqual(fake.unanswered, []);
});

test('Forward and a trail jump to an entry left at an edition\'s bare address show the member read there once a newer version arrived (issue #298\'s design decision: "Forward and the trail list do the same")', async () => {
  await farAfresh();
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR, { pos: FAR_HELD.pos }));
  await run(GO.back());
  publishFar3();
  const ahead = TRAIL.all()[TRAIL.cursorIndex() + 1];
  assert.deepEqual([ahead.addr, GO.shownIn(FAR)], [FAR2, FAR2], 'the entry ahead of the cursor re-takes version 2, as the box does');
  await run(GO.forward());
  assert.deepEqual([TRAIL.current() === ahead, GO.shownIn(FAR), walkAt(), GO.newerAt(FAR2)], [true, FAR2, ['block', FAR2, FAR_HELD.pos], 3], 'Forward: version 2, the walk on the span it stood on — never the newer head — its corner offering version 3 (issue #240)');
  await run(GO.back());
  assert.deepEqual([GO.shownIn(FAR), GO.newerAt(FAR2)], [FAR2, 3], 'Back to the entry behind, which names no box of FAR\'s: FAR\'s box as it stood');
  await run(GO.toTrailEntry(/** @type {number} */ (TRAIL.numbered().find((r) => r.entry === ahead)?.n)));
  assert.deepEqual([TRAIL.current() === ahead, TRAIL.current()?.addr, GO.shownIn(FAR), GO.newerAt(FAR2)], [true, FAR2, FAR2, 3], 'a trail jump onto it: version 2, its corner offering version 3');
  await farAgain();
  assert.deepEqual(fake.unanswered, []);
});

test('a return to an entry where the reader pinned a version themselves shows that version unmarked, whatever arrived meanwhile: the reader\'s own LEAP to version 2, a LEAP away, version 3 arriving, then Back — version 2, no offer, nothing said; and where an arrival marked that version on another entry since, Back to the reader\'s takes the mark off and Forward puts it back (issue #298\'s design decision: "signed exactly as if the reader had stayed"; issue #240)', async () => {
  await farAfresh();
  await run(GO.leapTo(FAR2, { pos: FAR_HELD.pos }));
  await run(GO.leapTo(D));
  const said = statusSaid();
  publishFar3();
  assert.deepEqual([GO.shownIn(FAR), GO.newerAt(FAR2)], [FAR2, null], 'the box pinned by the reader: the arrival marks nothing');
  await run(GO.back());
  assert.deepEqual([TRAIL.current()?.addr, GO.shownIn(FAR), GO.newerAt(FAR2), said.filter((x) => x === t('F.arrival.pane', { k: 2 }))], [FAR2, FAR2, null, []], 'Back: version 2, as the reader chose it — no offer, nothing said');
  await run(GO.leapTo(FAR, { pos: FAR_HELD.pos }));
  publishFar3();
  assert.deepEqual([GO.shownIn(FAR), GO.newerAt(FAR2)], [FAR2, 3], 'a LEAP to the bare address, then version 3 arriving there: version 2 marked');
  await run(GO.back());
  assert.deepEqual([TRAIL.current()?.addr, GO.shownIn(FAR), GO.newerAt(FAR2)], [FAR2, FAR2, null], 'Back to the reader\'s own version 2: unmarked, as if they had stayed there');
  await run(GO.forward());
  assert.deepEqual([GO.shownIn(FAR), GO.newerAt(FAR2)], [FAR2, 3], 'Forward to the entry the arrival marked: marked again');
  await farAgain();
  assert.deepEqual(fake.unanswered, []);
});

test('Forward across a follow into an edition read at its bare address lights its far end in the member read there once a newer version arrived — the version its box shows, never the bare address, which holds that text no more (issue #298)', async () => {
  await farAfresh();
  await run(GO.leapTo(D));
  await run(GO.follow(drawn(PASSAGE)));
  GO.endArrival();
  await run(GO.back());
  publishFar3();
  await run(GO.forward());
  assert.deepEqual([TRAIL.current()?.addr, GO.shownIn(FAR), marks()], [FAR2, FAR2, [{ addr: FAR2, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE }, [PASSAGE]]], 'Forward: version 2, the far end outlined in it and the link lit');
  GO.endArrival();
  await farAgain();
  assert.deepEqual(fake.unanswered, []);
});

test('Forward onto a follow\'s landing at an edition its link names whole, read at its bare address, outlines the head of the member read there once a newer version arrived — the version its box shows, its landing there too — never the bare address, which holds that text no more (issue #294)', async () => {
  await farAfresh();
  await run(GO.leapTo(D));
  await run(GO.follow(drawn(WHOLE)));
  assert.deepEqual(marks(), [{ addr: FAR, pos: 1, runs: null, link: WHOLE }, [WHOLE]], 'the follow outlined FAR\'s head');
  await run(GO.back());
  publishFar3();
  await run(GO.forward());
  assert.deepEqual([TRAIL.current()?.addr, GO.shownIn(FAR), marks(), GO.landing()?.addr], [FAR2, FAR2, [{ addr: FAR2, pos: 1, runs: null, link: WHOLE }, [WHOLE]], FAR2], 'Forward: version 2\'s head outlined, its landing there, the link lit');
  assert.ok(REC.blockAt(FAR2, 1) && !REC.blockAt(FAR, 1), 'the block the outline stands on held in version 2, the bare address holding none');
  GO.endArrival();
  await farAgain();
  assert.deepEqual(fake.unanswered, []);
});

test('a return restores the version its entry\'s view read beside its place: an entry at D whose view the reader moved onto FAR\'s text read at its bare address, version 3 arriving once that text was dropped — Back pins FAR\'s box on version 2 and D\'s on its own (issue #298\'s design decision: "each one restores the kept versions")', async () => {
  const put = memberAsFar();
  try {
    await farAfresh();
    await run(GO.leapTo(FAR, { pos: FAR_HELD.pos }));
    const far = CAM.view();
    await run(GO.leapTo(D));
    CAM.set(far);
    await run(GO.leapTo(C));
    const e = /** @type {import('./trail.js').Entry} */ (TRAIL.all()[TRAIL.cursorIndex() - 1]);
    assert.deepEqual([e.addr, e.reading?.addr], [D, FAR], 'the entry\'s place D, its view reading FAR');
    REC.invalidate(FAR);
    publishFar3();
    assert.deepEqual([e.addr, e.reading?.addr, GO.shownIn(FAR)], [D, FAR2, FAR], 'version 3 arrived: what its view read re-takes version 2, its place D; FAR\'s box the trunk head');
    await run(GO.back());
    assert.deepEqual([TRAIL.current()?.addr, GO.shownIn(D), GO.shownIn(FAR), GO.landing(), faceShown()], [D, D, FAR2, null, null], 'Back: D at its own, FAR\'s box on version 2, the words read found in it, nothing said');
  } finally {
    put();
    await farAgain();
  }
  unread();
  assert.deepEqual(fake.unanswered, []);
});

test('a newer version\'s arrival takes its member\'s position from its feed row (issue #298): FAR\'s text read at the row\'s position or after is the newer member\'s own — no pin, no entry re-taken — and read before it the member before\'s', async () => {
  await farAfresh();
  await run(GO.leapTo(FAR, { pos: FAR_HELD.pos }));
  await run(GO.leapTo(D));
  const readAt = /** @type {number} */ (REC.doc(FAR).readAt), e = TRAIL.all()[TRAIL.cursorIndex() - 1];
  assert.deepEqual([readAt, e.reading?.at], [1, 1], 'FAR\'s text read at 1, its entry\'s view with it');
  GO.arrived(FAR + '.3', readAt);
  assert.deepEqual([GO.shownIn(FAR), e.addr, e.reading?.addr], [FAR, FAR, FAR], 'published at 1, where the text was read: the newer member\'s text — nothing pinned, nothing re-taken');
  GO.arrived(FAR + '.3', readAt + 1);
  assert.deepEqual([GO.shownIn(FAR), e.addr, e.reading?.addr], [FAR2, FAR2, FAR2], 'published at 2, after it: version 2\'s — the box pinned on it and the entry re-taking it');
  await run(GO.leapTo(FAR));
  assert.deepEqual(fake.unanswered, []);
});

// ---- THE ARRIVAL'S MARK: the corner offers the newer version (issue #240) --------------------------------------------

// TRI: an edition of four members, each its text whole, which a version move to it reads
const TRI = '1.0.1.0.61', TRI_TEXT = 'An edition read at its bare address.\n\nIts second paragraph.';
/** TRI's k-th member */
const tri = (/** @type {number} */ k) => `${TRI}.${k}`;
Object.assign(script, ...[TRI, tri(1), tri(2), tri(3), tri(4)].map((a) => reads(a, TRI_TEXT, [])));
/** TRI's k-th member arriving as M-PUMP hands it on (`arrive`): N-GO told, then, where TRI's box took the member before it, that member handed TRI's text */
function publishTri(/** @type {number} */ k) {
  REC.invalidate(tri(k - 1));
  GO.arrived(tri(k));
  if (GO.shownIn(TRI) === tri(k - 1)) REC.takeAsMember(TRI, tri(k - 1));
}
/** a version's corner as T-LAYER stands it, the read it offers in it: stand-ins the keys find their way through and the focus lands on */
function offering(/** @type {string} */ addr, /** @type {number} */ n) {
  const doc = /** @type {any} */ (globalThis.document);
  const el = /** @type {any} */ ({ dataset: { corner: addr }, focus() { doc.activeElement = el; } });
  const act = /** @type {any} */ ({ dataset: { read: String(n) }, focus() { doc.activeElement = act; } });
  el.closest = (/** @type {string} */ s) => (s === '[data-corner]' ? el : null);
  el.querySelector = (/** @type {string} */ s) => (s === '[data-read]' ? act : null);
  el.querySelectorAll = (/** @type {string} */ s) => (s === '[data-read], [data-more]' ? [act] : []);
  act.closest = (/** @type {string} */ s) => (s === '[data-corner]' ? el : s === '[data-read]' || s === '[data-read], [data-more]' ? act : null);
  return { el, act };
}
/** a key at a corner, its target the element given, made by a key */
const atCorner = (/** @type {string} */ key, /** @type {unknown} */ target) => KEYS.dispatch({ ...keyOf(key), target }, { where: 'corner', byKey: true });
/** a version move a key made at a corner let land: whether the camera flew at any turn of it */
async function landedAt(/** @type {string} */ addr) {
  let flew = false;
  for (let i = 0; i < 200 && (GO.shownIn(TRI) !== addr || GO.inAir()); i++) { await new Promise((r) => setTimeout(r, 0)); flew = flew || CAM.flying(); if (CAM.flying()) CAM.step(Infinity); }
  assert.equal(GO.shownIn(TRI), addr, `the box shows ${addr}`);
  return flew;
}

test('a newer version\'s arrival at a box read at its bare address marks it: the box pinned on the member read, its corner offering the newest member named, said once in the status region with the box read at its reading scale, and a later arrival raising the offer, saying nothing; → along the corner reaches the offer and ← leaves it; Enter on it — or at a corner with no version statement — moves the box to that member in place, a trail entry Back returns from, the offer standing again there; a version move elsewhere or a LEAP to the bare address ends the mark, and a box the reader pinned is never marked (issue #240; foundations §3.2; D5 K-57; FP-22, FP-23)', async () => {
  const doc = /** @type {any} */ (globalThis.document);
  const said = statusSaid(), told = (/** @type {number} */ k) => said.filter((x) => x === t('F.arrival.pane', { k })).length;
  try {
    await run(GO.leapTo(TRI, { pos: 1 }));
    assert.deepEqual([GO.shownIn(TRI), GO.newerAt(TRI), LAYER.inView(TRI), LAYER.atReadingScale(TRI)], [TRI, null, true, true], 'TRI read at its bare address, in view at its reading scale: unmarked');
    publishTri(3);
    assert.deepEqual([GO.shownIn(TRI), GO.newerAt(tri(2)), GO.newerAt(TRI), told(2)], [tri(2), 3, null, 1], 'version 3 arrived: the box pinned on version 2, its corner offering version 3, the arrival said once');
    const once = said.length;
    GO.arrived(tri(4));
    assert.deepEqual([GO.shownIn(TRI), GO.newerAt(tri(2)), told(2), said.length], [tri(2), 4, 1, once], 'version 4 arrived: the offer raised to version 4, nothing more said');
    // the offer reached along the corner, and taken
    const c = offering(tri(2), 4);
    assert.equal(await atCorner('ArrowRight', c.el), true);
    assert.equal(doc.activeElement, c.act, '→ along the corner: the focus on its offered read');
    assert.deepEqual([await atCorner('ArrowRight', c.act), doc.activeElement], [false, c.act], '→ again: nothing further along, the key the platform\'s');
    assert.equal(await atCorner('ArrowLeft', c.act), true);
    assert.equal(doc.activeElement, c.el, '← back to the corner');
    await atCorner('ArrowRight', c.el);
    const at = CAM.view(), n = TRAIL.length();
    assert.equal(await atCorner('Enter', c.act), true, 'Enter on the offer: taken');
    assert.equal(await landedAt(tri(4)), false, 'a version move: no flight');
    assert.ok(same(CAM.view(), at), 'the camera where it stood');
    assert.deepEqual([TRAIL.length(), TRAIL.current()?.addr, GO.newerAt(tri(4)), GO.newerAt(tri(2))], [n + 1, tri(4), null, null], 'one entry pushed at version 4, the box showing it unmarked');
    await run(GO.back());
    assert.deepEqual([TRAIL.current()?.addr, GO.shownIn(TRI), GO.newerAt(tri(2)), told(2)], [tri(2), tri(2), 4, 2], 'Back: version 2 again, its corner offering version 4 as the reader left it, the arrival said again');
    assert.equal(await atCorner('Enter', offering(tri(2), 4).el), true, 'Enter at a corner with no version statement: its offered read');
    await landedAt(tri(4));
    assert.deepEqual([TRAIL.current()?.addr, GO.newerAt(tri(4))], [tri(4), null], 'version 4, unmarked');
    await run(GO.back());
    assert.equal(GO.newerAt(tri(2)), 4, 'Back: the offer standing again at version 2');
    await inPlace(GO.toVersion(tri(1)));
    assert.deepEqual([GO.shownIn(TRI), GO.newerAt(tri(1)), GO.newerAt(tri(2))], [tri(1), null, null], 'a version move to version 1: the mark ended');
    await run(GO.back());
    assert.equal(GO.newerAt(tri(2)), 4, 'Back to version 2: marked again, as the reader left it there');
    await run(GO.leapTo(TRI));
    assert.deepEqual([GO.shownIn(TRI), GO.newerAt(TRI), GO.newerAt(tri(2))], [TRI, null, null], 'a LEAP to the bare address: the trunk head, unmarked');
    await run(GO.leapTo(tri(2)));
    const before = said.length;
    GO.arrived(tri(5));
    assert.deepEqual([GO.shownIn(TRI), GO.newerAt(tri(2)), said.length], [tri(2), null, before], 'a box the reader pinned: a newer version\'s arrival marks nothing and says nothing');
  } finally {
    doc.activeElement = null;
    REC.invalidate(TRI);
  }
  await run(GO.leapTo(D));
  assert.deepEqual(fake.unanswered, []);
});

/** FAR's image as MOVED's `compare` answers it — D's 6th to 10th bytes at its 2nd, D's 1st to 5th at its 25th, its own around them — so the arrival a carry of MOVED left is read again by identity where FAR holds it */
const movedInto = () => REC.takeImage(FAR, 1, [{ iStart: FAR + '.0.1.1', width: 1 }, { iStart: D + '.0.1.6', width: 5 }, { iStart: FAR + '.0.1.7', width: 18 }, { iStart: D + '.0.1.1', width: 5 }, { iStart: FAR + '.0.1.30', width: FAR_EXTENT - 29 }]);

test('"read side by side" at a landing opens the version its box shows as the act is made, never the address the landing was made at: a carry landing at FAR\'s bare address, version 3 arriving while it stands, or while the reader is away and Back reads it again — the scene\'s entry naming version 2, the member read there, beside the first edition (FP-22)', async () => {
  /** the scene the landing's act opens, as the trail entry it takes at the act names it: its two documents */
  const opens = () => { GO.landingAct('beside'); const o = TRAIL.current()?.scene; return o ? [o.a, o.b] : null; };
  for (const away of [false, true]) {
    await farAfresh();
    movedInto();
    await run(GO.leapTo(D));
    await run(GO.leapTo(FAR, { how: 'leap', carry: MOVED }));
    for (let i = 0; i < 50 && GO.landing()?.version == null; i++) await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual([GO.landing()?.addr, GO.landing()?.said?.state, !!GO.landing()?.beside], [FAR, 'pieces', true], `${away ? 'away' : 'standing'}: landed at FAR in pieces, "read side by side" offered`);
    if (away) await run(GO.leapTo(D));
    publishFar3();
    if (away) await run(GO.back());
    assert.deepEqual([GO.shownIn(FAR), GO.landing()?.addr, !!GO.landing()?.beside], [FAR2, away ? FAR2 : FAR, true], `${away ? 'Back' : 'standing'}: FAR's box on version 2, the offer standing`);
    assert.deepEqual(opens(), [D, FAR2], `${away ? 'Back' : 'standing'}: the scene beside the first edition opens on version 2, the text the passage is outlined in — never the bare address`);
    // no scene to show here: its opening gives its entry back
    await new Promise((r) => setTimeout(r, 0));
  }
  await farAgain();
  assert.deepEqual(fake.unanswered, []);
});

test('an arrival standing at an edition read at its bare address stays outlined once a newer version arrives, in the member read there — the version its box shows, its landing there too — never put out with the bare address\'s text, which that member holds now: a far end\'s passage, and the head of a far document named whole (FP-21, FP-22; issue #359)', async () => {
  /** @type {Array<[string, object]>} each link followed, and the arrival it stands as in version 2 */
  const follows = [[PASSAGE, { addr: FAR2, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE }], [WHOLE, { addr: FAR2, pos: FAR_HEAD, runs: null, link: WHOLE }]];
  for (const [link, mark] of follows) {
    await farAfresh();
    await run(GO.leapTo(D));
    await run(GO.follow(drawn(link)));
    publishFar3();
    assert.deepEqual([GO.shownIn(FAR), marks()], [FAR2, [mark, [link]]], `${link}: version 3 arrived — the box on version 2, the arrival outlined there, its link lit`);
    GO.recheck();
    assert.deepEqual([marks(), GO.landing()?.addr, GO.landing()?.said, faceShown()], [[mark, [link]], FAR2, null, null], `${link}: re-checked — the outline in version 2, its landing there, nothing said and no face`);
    GO.endArrival();
  }
  await farAgain();
  assert.deepEqual(fake.unanswered, []);
});

// ---- THE PASSAGE LEFT: Back lands on the passage the reader left ---------------------------

// REWRITTEN, DROPPED: two drafts of eighty paragraphs, which an edit sets a paragraph of new bytes before while the reader is
// away: the first's text set again in one step, as a refresh sets it (M-REC's `setAgain`); the second's dropped, as a feed row
// drops it, and read again as Back reaches it
const REWRITTEN = '1.0.1.0.42', DROPPED = '1.0.1.0.43';
const EIGHTY = Array.from({ length: 80 }, (_, i) => `Line ${i + 1} of a draft an edit rewrites above the reader.`).join('\n\n');
const INSERTED = 'A paragraph an edit set before the rest.\n\n';
Object.assign(script, reads(REWRITTEN, EIGHTY, []), reads(DROPPED, EIGHTY, []));

/** the passage under a view's visible centre in a document — the line it opens at — that line's first byte by identity, the centre's height below that line's top in px, and the em in px */
function under(/** @type {string} */ addr, /** @type {{x: number, y: number, scale: number}} */ v) {
  const f = LAYER.foldOf(REC.doc(addr)), box = docBox(addr), pos = /** @type {number} */ (LAYER.posAt(addr, v.x, v.y));
  return { pos, ids: REC.identityOf(addr, pos, 1), dy: (v.y - (box.y + placeOf(f, pos).y)) * v.scale, em: f.fs * v.scale };
}
/** the same passage, at the same height from the centre within a thousandth of a px, at the same em */
const samePassage = (/** @type {ReturnType<typeof under>} */ a, /** @type {ReturnType<typeof under>} */ b) => a.pos === b.pos && Math.abs(a.dy - b.dy) < 1e-3 && Math.abs(a.em - b.em) < 1e-9;

test('Back lands on the passage the reader left after a narrower view folds its document again at the measure the view holds: the view left now reads another line, and Back flies to the one that keeps the passage under the visible centre at the height it stood and at its em (issue #221)', async () => {
  await PUMP.loadWhole(LONG);
  const d = REC.doc(LONG), f = LAYER.foldOf(d);
  const at = /** @type {import('../model/records.js').Block} */ (d.blocks.find((b) => placeOf(f, b.pos).column === f.across));
  await run(GO.leapTo(LONG, { pos: at.pos + 4 }));
  const left = CAM.view(), was = under(LONG, left);
  assert.equal(was.pos, at.pos, 'the passage under the centre: the line holding the position the LEAP named');
  await run(GO.leapTo(FAR));
  CAM.setViewport(400, 900);
  try {
    assert.ok(LAYER.foldOf(REC.doc(LONG)).cpl < f.cpl, 'the measure narrowed: LONG folded again');
    assert.ok(!samePassage(under(LONG, left), was), 'the view left now reads another line');
    await run(GO.back());
    assert.equal(TRAIL.current()?.addr, LONG);
    assert.ok(samePassage(under(LONG, CAM.view()), was), `Back: the passage left under the visible centre, at the height it stood and its em: ${JSON.stringify([under(LONG, CAM.view()), was])}`);
    assert.deepEqual(walkAt(), ['block', LONG, at.pos], 'the walk on the span it stood on');
  } finally {
    CAM.setViewport(1440, 900);
  }
  assert.deepEqual(fake.unanswered, []);
});

test('Back lands on the passage the reader left after an edit set new bytes before it while they were away: its own bytes under the visible centre, at the height they stood and their em, never the line the view left now reads (issue #221)', async () => {
  await PUMP.loadWhole(REWRITTEN);
  const f = LAYER.foldOf(REC.doc(REWRITTEN)), at = /** @type {import('../model/records.js').Block} */ (REC.doc(REWRITTEN).blocks.find((b) => placeOf(f, b.pos).column === f.across));
  await run(GO.leapTo(REWRITTEN, { pos: at.pos }));
  const left = CAM.view(), was = under(REWRITTEN, left), k = INSERTED.length;
  assert.deepEqual(was.ids, [{ prefix: REWRITTEN + '.0.1', ordinal: at.pos, width: 1 }], 'the passage\'s first byte, the draft\'s own');
  await run(GO.leapTo(FAR));
  REC.setAgain(REWRITTEN, {
    spans: [{ subspace: 1, ordinal: 1, positions: k + EIGHTY.length }],
    text: { runs: [{ pos: 1, width: k + EIGHTY.length, kind: 'content', text: INSERTED + EIGHTY, ref: null, origin: null }], asOf: 2 },
    image: { from: 1, runs: [{ iStart: '1.0.1.0.99.0.1.1', width: k }, { iStart: REWRITTEN + '.0.1.1', width: EIGHTY.length }] },
  });
  assert.ok(!samePassage(under(REWRITTEN, left), { ...was, pos: was.pos + k }), 'the view left now reads another line');
  await run(GO.back());
  const now = under(REWRITTEN, CAM.view());
  assert.ok(samePassage(now, { ...was, pos: was.pos + k }), `Back: the line the passage's bytes open now under the visible centre, at the height it stood and its em: ${JSON.stringify([now, was])}`);
  assert.deepEqual(now.ids, was.ids, 'the passage\'s own bytes, never its old position');
  assert.deepEqual(walkAt(), ['block', REWRITTEN, at.pos + k], 'the walk on the span holding them');
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a passage whose text a feed row dropped while the reader was away flies at once to the view it was left at, reads the text beside the flight, and goes on to the view that keeps the passage under the visible centre once the read answers (issue #221; FP-25)', async () => {
  await PUMP.loadWhole(DROPPED);
  const f = LAYER.foldOf(REC.doc(DROPPED)), at = /** @type {import('../model/records.js').Block} */ (REC.doc(DROPPED).blocks.find((b) => placeOf(f, b.pos).column === f.across));
  await run(GO.leapTo(DROPPED, { pos: at.pos }));
  const left = CAM.view(), was = under(DROPPED, left), k = INSERTED.length, text = INSERTED + EIGHTY;
  await run(GO.leapTo(FAR));
  // the text dropped, and the board answering it as the edit left it
  REC.invalidate(DROPPED);
  Object.assign(script, {
    [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(DROPPED) })]: { result: { as_of: 2, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } },
    [FAKE.keyOf('op', { frame: F.retrieveV(DROPPED, 1, text.length) })]: { result: { as_of: 2, resp: 'delivery', items: [{ content: text }] } },
    [FAKE.keyOf('op', { frame: F.image(DROPPED, 1, text.length) })]: { result: { as_of: 2, resp: 'runs', runs: [{ i_start: '1.0.1.0.99.0.1.1', width: String(k) }, { i_start: DROPPED + '.0.1.1', width: String(EIGHTY.length) }] } },
    [FAKE.keyOf('op', { frame: F.findLinksV(DROPPED, 1, text.length) })]: { result: { as_of: 2, resp: 'addrs', addrs: [] } },
  });
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(DROPPED) });
  const back = GO.back();
  assert.ok(CAM.flying() && same(CAM.destination(), left), 'the camera left at once for the view the entry was left at');
  for (let i = 0; i < 20 && CAM.flying(); i++) CAM.step(Infinity);
  assert.deepEqual([same(CAM.view(), left), GO.inAir()], [true, true], 'there, the read still out: in the air');
  release();
  await run(back);
  const now = under(DROPPED, CAM.view());
  assert.ok(samePassage(now, { ...was, pos: was.pos + k }) && now.ids.length === 1 && now.ids[0].ordinal === at.pos, `the read answered: gone on to the passage's own bytes under the visible centre, at the height they stood and their em: ${JSON.stringify([now, was])}`);
  assert.deepEqual([walkAt(), GO.inAir()], [['block', DROPPED, at.pos + k], false], 'the walk on the span holding them, landed');
  assert.deepEqual(fake.unanswered, []);
});

test('Back puts the walk where it stood as the reader left the entry, never on the landing made there: three spans on by ↓, the camera following, a LEAP away, then Back — the walk on the span it stood on (issue #221)', async () => {
  await PUMP.loadWhole(LONG);
  const spans = REC.doc(LONG).blocks.filter(isElement), at = spans[40];
  await run(GO.leapTo(LONG, { pos: at.pos + 4 }));
  assert.deepEqual([walkAt(), WALK.landedAt()], [['block', LONG, at.pos], at.pos + 4], 'the LEAP\'s landing');
  for (let i = 0; i < 3; i++) await run(WALK.key('down'));
  assert.deepEqual(walkAt(), ['block', LONG, spans[43].pos], 'three spans on, the camera following');
  const left = CAM.view();
  await run(GO.leapTo(FAR));
  await run(GO.back());
  assert.ok(same(CAM.view(), left), 'Back at the view left: nothing set again');
  assert.deepEqual(walkAt(), ['block', LONG, spans[43].pos], 'the walk on the span it stood on');
  assert.deepEqual(fake.unanswered, []);
});

// ---- THE PASSAGE CHANGED: a return lands in the landing rule's states (FP-21) ------------------------------------------

// CUT: a draft of eighty paragraphs whose line the reader left an edit changes while they are away, its text set again in one
// step as a refresh sets it (M-REC's `setAgain`); LAPSE: the same draft's twin, its text dropped and the board not answering
// it while `lapse` reads `out`, then answering it as an edit left it, a paragraph of new bytes set before the rest
const CUT = '1.0.1.0.44', LAPSE = '1.0.1.0.45', FOREIGN = '1.0.1.0.98';
/** the reads of a draft read whole: as `reads` answers them, its metadata a draft's, so no version is offered */
const draftReads = (/** @type {string} */ doc, /** @type {string} */ text) => ({
  ...reads(doc, text, []),
  [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: { result: { as_of: 1, resp: 'doc_metadata', doc, published: false, owner: '1.0.1', birth: null, birth_extent: null, placed: null, base_extent: null, source: null } },
});
/** LAPSE as the board answers it: its own text, not answering, or its text as the edit left it */
let lapse = /** @type {'up' | 'out' | 'edited'} */ ('up');
const EDITED = INSERTED + EIGHTY;
Object.assign(script, draftReads(CUT, EIGHTY), draftReads(LAPSE, EIGHTY), {
  [FAKE.keyOf('op', { frame: F.retrieveV(LAPSE, 1, EDITED.length) })]: { result: { as_of: 2, resp: 'delivery', items: [{ content: EDITED }] } },
  [FAKE.keyOf('op', { frame: F.image(LAPSE, 1, EDITED.length) })]: { result: { as_of: 2, resp: 'runs', runs: [{ i_start: FOREIGN + '.0.1.1', width: String(INSERTED.length) }, { i_start: LAPSE + '.0.1.1', width: String(EIGHTY.length) }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(LAPSE, 1, EDITED.length) })]: { result: { as_of: 2, resp: 'addrs', addrs: [] } },
});
Object.defineProperty(script, FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(LAPSE) }), {
  enumerable: true,
  get: () => (lapse === 'out' ? { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } } : { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + (lapse === 'up' ? EIGHTY : EDITED).length }] } }),
});

/** a draft's text set again in one step, as a refresh sets it (M-REC's `setAgain`): its text, and its image, each run `[the document whose I-space it lies in, ordinal, width]` */
const setDraft = (/** @type {string} */ addr, /** @type {string} */ text, /** @type {Array<[string, number, number]>} */ image) => REC.setAgain(addr, {
  spans: [{ subspace: 1, ordinal: 1, positions: text.length }], text: { runs: [{ pos: 1, width: text.length, kind: 'content', text, ref: null, origin: null }], asOf: 9 },
  image: { from: 1, runs: image.filter(([, , width]) => width > 0).map(([doc, ordinal, width]) => ({ iStart: `${doc}.0.1.${ordinal}`, width })) },
});
/** the position the line of a document's fold holding a position opens at, as the view reads it under its centre (`under`) */
const lineAt = (/** @type {string} */ addr, /** @type {number} */ pos) => { const f = LAYER.foldOf(REC.doc(addr)), i = placeOf(f, pos).line; return i == null ? pos : /** @type {number} */ (f.lines[i].at); };

/**
 * CUT read whole as its own text, a LEAP to its tenth paragraph, and a LEAP away to FAR: that paragraph, the view left and
 * what it read under its centre, and what the entry kept of the line read (T-LAYER's `Reading`)
 */
async function leftCut() {
  setDraft(CUT, EIGHTY, [[CUT, 1, EIGHTY.length]]);
  await PUMP.loadWhole(CUT);
  const at = REC.doc(CUT).blocks[9];
  await run(GO.leapTo(CUT, { pos: at.pos }));
  const left = CAM.view(), was = under(CUT, left);
  assert.equal(was.pos, at.pos, 'the line under the centre: the paragraph the LEAP named');
  await run(GO.leapTo(FAR));
  const r = /** @type {import('../text/layer.js').Reading} */ (TRAIL.all()[TRAIL.cursorIndex() - 1].reading);
  assert.deepEqual([r.addr, r.pos, r.ids.length > 0, r.around.length > 0], [CUT, at.pos, true, true], 'the entry keeps the line read by its bytes, and the view around it');
  return { at, left, was, r };
}

test('Back to a draft whose line the reader left an edit removed lands at the nearest passage the two texts share — its line standing where theirs stood, at its em — the walk on it and the dead end\'s face there, told by the landing\'s description, never the old position; with nothing in view shared, at the text\'s head (issue #297)', async () => {
  const { at, was } = await leftCut();
  const end = at.pos + at.width, n = TRAIL.length();
  setDraft(CUT, EIGHTY.slice(0, at.pos - 1) + EIGHTY.slice(end - 1), [[CUT, 1, at.pos - 1], [CUT, end, EIGHTY.length - end + 1]]);
  await run(GO.back());
  const to = at.pos - 1, line = lineAt(CUT, to);
  assert.ok(line < at.pos && line >= REC.doc(CUT).blocks[8].pos, `the nearest shared position the last of the paragraph before, its line that paragraph's: ${line}`);
  assert.ok(samePassage(under(CUT, CAM.view()), { ...was, pos: line }), `that line where the line read stood, at its em: ${JSON.stringify([under(CUT, CAM.view()), was])}`);
  assert.notEqual(under(CUT, CAM.view()).pos, at.pos, 'never the old position, which holds the next paragraph now');
  assert.deepEqual([TRAIL.length(), TRAIL.current()?.addr, walkAt(), WALK.landedAt()], [n, CUT, ['block', CUT, REC.doc(CUT).blocks[8].pos], to], 'no trail move; the walk on the paragraph holding it');
  const f = faceShown(), words = t('F.floating', { D: CUT });
  assert.ok(f && f.id === 'face:floating' && f.html.includes(addressedHTML(words)), `the dead end's words, worded for any landing: ${f && f.html}`);
  assert.deepEqual([HOST.currentState()?.anchor, HOST.currentState()?.told], [{ span: { addr: CUT, pos: to }, sign: CUT }, true], 'at the landing, told by its description');
  assert.deepEqual([GO.landing()?.floating, GO.described(), GO.arrivalMark()], [true, { addr: CUT, pos: to, words, runs: [] }, null], 'the landing in the none state, nothing outlined');
  // nothing the view showed shared: the text's head
  await run(GO.leapTo(FAR));
  const again = under(CUT, /** @type {import('./trail.js').Entry} */ (TRAIL.all()[TRAIL.cursorIndex() - 1]).view);
  const other = Array.from({ length: 12 }, (_, i) => `Another line ${i + 1}.`).join('\n\n');
  setDraft(CUT, other, [[FOREIGN, 1, other.length]]);
  await run(GO.back());
  assert.ok(samePassage(under(CUT, CAM.view()), { ...again, pos: 1 }), `the head's line where the line read stood: ${JSON.stringify([under(CUT, CAM.view()), again])}`);
  assert.deepEqual([walkAt(), faceShown()?.id, HOST.currentState()?.anchor], [['block', CUT, 1], 'face:floating', { span: { addr: CUT, pos: 1 }, sign: CUT }], 'the walk and the dead end\'s face at the head');
  HOST.dismiss(); GO.endArrival();
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a draft whose line lost its first half while a paragraph was set before it lands on what stands of the line, where it stands now — never at the old position — that part outlined and the landing\'s line saying only part of the text the reader was reading is in the draft\'s current text (issue #297)', async () => {
  const { at, was, r } = await leftCut();
  const k = INSERTED.length, half = 20;
  setDraft(CUT, INSERTED + EIGHTY.slice(0, at.pos - 1) + EIGHTY.slice(at.pos - 1 + half), [[FOREIGN, 1, k], [CUT, 1, at.pos - 1], [CUT, at.pos + half, EIGHTY.length - at.pos - half + 1]]);
  await run(GO.back());
  const to = k + at.pos;
  assert.ok(samePassage(under(CUT, CAM.view()), { ...was, pos: to }), `the line holding what stands of it where the line read stood, at its em: ${JSON.stringify([under(CUT, CAM.view()), was])}`);
  assert.deepEqual(GO.arrivalMark(), { addr: CUT, pos: to, runs: [{ pos: to, width: r.width - half }], link: null }, 'what stands of it outlined');
  const words = t('L.held.part', { subject: t('L.held.reading'), where: t('L.held.current', { D: CUT }) });
  assert.deepEqual([GO.landing()?.said?.state, GO.landingLine(), GO.landingOffers(), GO.described()?.words], ['part', words, { steps: false, again: false, version: false }, words], 'the line, its words the landing\'s description: "only part of the text you were reading is in ⟨D⟩\'s current text", no version at a draft');
  assert.deepEqual([walkAt(), faceShown()], [['block', CUT, to], null], 'the walk on it, no face');
  GO.endArrival();
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a draft whose line an edit set a word inside lands at piece 1, both runs of the line outlined and labelled, its line "piece 1 of 2 · all of the passage", the step taking it to piece 2 (issue #297)', async () => {
  const { at, was, r } = await leftCut();
  const cut = at.pos - 1 + 8, word = 'new ';
  setDraft(CUT, EIGHTY.slice(0, cut) + word + EIGHTY.slice(cut), [[CUT, 1, cut], [FOREIGN, 1, word.length], [CUT, cut + 1, EIGHTY.length - cut]]);
  await run(GO.back());
  assert.ok(samePassage(under(CUT, CAM.view()), was), 'the line where it stood');
  const runs = [{ pos: at.pos, width: 8 }, { pos: at.pos + 8 + word.length, width: r.width - 8 }];
  assert.deepEqual(GO.arrivalMark(), { addr: CUT, pos: at.pos, runs, link: null }, 'both runs outlined, the landing at the first');
  const piece = (/** @type {number} */ n) => t('L.piece', { k: n, n: 2 });
  assert.deepEqual([GO.landing()?.said?.state, GO.landingLine(), GO.described()?.runs.map((x) => x.words)], ['pieces', piece(1) + ' · ' + t('L.piece.all'), [piece(1), piece(2)]], 'all of it, in two pieces in their own order');
  assert.equal(GO.step(1), true);
  await stepped();
  assert.deepEqual([GO.landing()?.pos, walkAt()], [runs[1].pos, ['block', CUT, at.pos]], 'the step: piece 2');
  GO.endArrival();
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a draft a feed row dropped while the board does not answer it lands at the view left, unmarked, its line saying it could not tell whether the draft\'s current text holds the text the reader was reading — board unreachable — with "try again", which once the board answers lands in place on the line\'s bytes where an edit moved them, with no trail move (issue #297)', async () => {
  lapse = 'up';
  REC.invalidate(LAPSE);
  await PUMP.loadWhole(LAPSE);
  const at = REC.doc(LAPSE).blocks[9];
  await run(GO.leapTo(LAPSE, { pos: at.pos }));
  const left = CAM.view(), was = under(LAPSE, left);
  await run(GO.leapTo(FAR));
  REC.invalidate(LAPSE);
  lapse = 'out';
  try {
    await run(GO.back());
    const n = TRAIL.length();
    assert.deepEqual([TRAIL.current()?.addr, same(CAM.view(), left), GO.arrivalMark()], [LAPSE, true, null], 'at the view left, nothing outlined');
    const words = t('L.held.unknown', { subject: t('L.held.reading'), where: t('L.held.current', { D: LAPSE }), reason: t('F.daemon.unreachable') });
    assert.deepEqual([GO.landing()?.said?.state, GO.landingLine(), GO.landingOffers()], ['unknown', words, { steps: false, again: true, version: false }], '"couldn\'t tell whether ⟨D⟩\'s current text holds the text you were reading: board unreachable", and "try again"');
    lapse = 'edited';
    GO.landingAct('again');
    const k = INSERTED.length;
    for (let i = 0; i < 200 && !(REC.doc(LAPSE).from >= 0 && !CAM.flying() && walkAt()?.[2] === at.pos + k); i++) { await new Promise((res) => setTimeout(res, 0)); if (CAM.flying()) CAM.step(Infinity); }
    assert.ok(samePassage(under(LAPSE, CAM.view()), { ...was, pos: at.pos + k }), `the read answered: the line's own bytes where the edit moved them, where the line read stood: ${JSON.stringify([under(LAPSE, CAM.view()), was])}`);
    assert.deepEqual([GO.landing(), GO.landingLine(), walkAt(), TRAIL.length()], [null, null, ['block', LAPSE, at.pos + k], n], 'all of it in one piece: nothing said; the walk on it; no trail move');
  } finally { lapse = 'up'; }
  assert.deepEqual(fake.unanswered, []);
});

// CUT's image as the board answers it once an edit set a paragraph of new bytes before its text
Object.assign(script, { [FAKE.keyOf('op', { frame: F.image(CUT, 1, EDITED.length) })]: { result: { as_of: 2, resp: 'runs', runs: [{ i_start: FOREIGN + '.0.1.1', width: String(INSERTED.length) }, { i_start: CUT + '.0.1.1', width: String(EIGHTY.length) }] } } });

test('Back to a draft a refresh set again with no image while the reader was away — a paragraph set before the line they left — reads that text\'s image beside the flight and lands on the line\'s own bytes where they stand now, nothing said: never "couldn\'t tell" for an image the page had not asked for (issue #297)', async () => {
  const { at, was } = await leftCut();
  const k = INSERTED.length;
  REC.setAgain(CUT, { spans: [{ subspace: 1, ordinal: 1, positions: EDITED.length }], text: { runs: [{ pos: 1, width: EDITED.length, kind: 'content', text: EDITED, ref: null, origin: null }], asOf: 9 } });
  assert.deepEqual([REC.doc(CUT).from, REC.doc(CUT).image.length], [1, 0], 'the text held whole, no image held');
  const from = fake.asked.length;
  await run(GO.back());
  assert.deepEqual([GO.landing(), GO.landingLine(), faceShown(), walkAt()], [null, null, null, ['block', CUT, at.pos + k]], 'all of the line read in one piece: nothing said; the walk on it');
  assert.ok(samePassage(under(CUT, CAM.view()), { ...was, pos: at.pos + k }), `the line's own bytes where the edit moved them, where the line read stood: ${JSON.stringify([under(CUT, CAM.view()), was])}`);
  assert.ok(fake.asked.slice(from).includes(FAKE.keyOf('op', { frame: F.image(CUT, 1, EDITED.length) })), 'its image asked beside the flight');
  assert.deepEqual(fake.unanswered, []);
});

/** CUT left as `leftCut` leaves it, Back to its entry, and the walk moved to its paragraph `k` with the camera where it stood: that paragraph, the line read's, and the view left */
async function walkedOn(/** @type {number} */ k) {
  const { at, left } = await leftCut();
  await run(GO.back());
  const on = REC.doc(CUT).blocks[k];
  await WALK.focusTo(CUT, on.pos);
  assert.ok(same(CAM.view(), left) && walkAt()?.[2] === on.pos && LAYER.lineInView(CUT, on.pos, left), `the walk on paragraph ${k + 1}, in view, the camera where it stood`);
  return { at, left, on };
}

test('Back to a draft whose paragraph the walk stood on an edit removed, the line read standing, lands in the none state at the line read — the dead end\'s face there, told by the landing\'s description — the walk on that line: never the paragraph now at the old position; and no entry keeps that landing (issues #297, #237)', async () => {
  const { at, left, on: gone } = await walkedOn(11);
  await run(GO.leapTo(FAR));
  const end = gone.pos + gone.width, n = TRAIL.length();
  setDraft(CUT, EIGHTY.slice(0, gone.pos - 1) + EIGHTY.slice(end - 1), [[CUT, 1, gone.pos - 1], [CUT, end, EIGHTY.length - end + 1]]);
  await run(GO.back());
  assert.ok(same(CAM.view(), left), 'the line read stands whole: the view as left');
  assert.deepEqual([walkAt(), TRAIL.length()], [['block', CUT, at.pos], n], 'the walk on the line read, never on the paragraph now at the old position; no trail move');
  const f = faceShown(), words = t('F.floating', { D: CUT });
  assert.ok(f && f.id === 'face:floating' && f.html.includes(addressedHTML(words)), `the dead end's words: ${f && f.html}`);
  assert.deepEqual([HOST.currentState()?.anchor, HOST.currentState()?.told], [{ span: { addr: CUT, pos: at.pos }, sign: CUT }, true], 'at the walk\'s span, told by the landing\'s description');
  assert.deepEqual([GO.landing()?.floating, GO.described(), GO.arrivalMark()], [true, { addr: CUT, pos: at.pos, words, runs: [] }, null], 'the landing in the none state there, nothing outlined');
  HOST.dismiss();
  await run(GO.leapTo(FAR));
  await run(GO.back());
  assert.deepEqual([walkAt(), GO.landing(), faceShown()], [['block', CUT, at.pos], null, null], 'Back again: the walk on the line read, where it stood as the reader left; nothing said, the entry keeping no landing');
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a draft whose paragraph the walk stood on lost its first word while the reader was away puts the walk on what stands of that paragraph, nothing said: never the line read, nor a dead end for a paragraph that stands (issue #237)', async () => {
  const { left, on: cut } = await walkedOn(11);
  await run(GO.leapTo(FAR));
  const word = 'Line '.length;
  setDraft(CUT, EIGHTY.slice(0, cut.pos - 1) + EIGHTY.slice(cut.pos - 1 + word), [[CUT, 1, cut.pos - 1], [CUT, cut.pos + word, EIGHTY.length - cut.pos - word + 1]]);
  await run(GO.back());
  assert.deepEqual([same(CAM.view(), left), walkAt(), GO.landing(), faceShown()], [true, ['block', CUT, cut.pos], null, null], 'the view as left, the walk on what stands of its paragraph, nothing said');
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a draft where an edit moved the paragraph the walk stood on out of the view the return lands at puts the walk on the line read, nothing said: never on the paragraph where it stands now, out of view (issue #237; FP-25)', async () => {
  const { at, left, on } = await walkedOn(11);
  await run(GO.leapTo(FAR));
  const forty = Array.from({ length: 40 }, (_, i) => `An inserted paragraph ${i + 1}.`).join('\n\n') + '\n\n';
  setDraft(CUT, EIGHTY.slice(0, on.pos - 1) + forty + EIGHTY.slice(on.pos - 1), [[CUT, 1, on.pos - 1], [FOREIGN, 1, forty.length], [CUT, on.pos, EIGHTY.length - on.pos + 1]]);
  await run(GO.back());
  const moved = on.pos + forty.length;
  assert.ok(same(CAM.view(), left) && !LAYER.lineInView(CUT, moved, CAM.view()), 'the view as left, the paragraph the walk stood on moved out of it');
  assert.deepEqual([walkAt(), GO.landing(), faceShown()], [['block', CUT, at.pos], null, null], 'the walk on the line read, nothing said');
  assert.deepEqual(fake.unanswered, []);
});

test('a departure keeps no place the walk stood on that the view it leaves does not show: the camera moved down LONG with no re-take, a LEAP away and Back — the walk on the line read, never on the paragraph the camera left (issue #237; FP-25)', async () => {
  await PUMP.loadWhole(LONG);
  const spans = REC.doc(LONG).blocks.filter(isElement), [tenth, read] = [spans[9], spans[80]];
  await run(GO.leapTo(LONG, { pos: tenth.pos }));
  assert.deepEqual(walkAt(), ['block', LONG, tenth.pos], 'the walk on the tenth paragraph');
  CAM.set(GO.viewFor(LONG, read.pos));
  const left = CAM.view();
  assert.ok(!LAYER.lineInView(LONG, tenth.pos, left), 'the camera moved on, the re-take not made: the walk\'s paragraph out of view');
  await run(GO.leapTo(FAR));
  assert.equal(departed()?.stood, null, 'the entry keeps no place of the walk\'s');
  await run(GO.back());
  assert.ok(same(CAM.view(), left), 'Back at the view left');
  assert.deepEqual(walkAt(), ['block', LONG, read.pos], 'the walk on the line read, in view');
  assert.ok(LAYER.lineInView(LONG, read.pos, CAM.view()));
  assert.deepEqual(fake.unanswered, []);
});

test('a departure keeps no place the walk stood on that the view it leaves does not show, so a paragraph the camera left before the re-take, removed while the reader is away, says nothing on Back (issue #237)', async () => {
  const { at } = await leftCut();
  await run(GO.back());
  const later = REC.doc(CUT).blocks[60];
  CAM.set(GO.viewFor(CUT, later.pos));
  const left = CAM.view();
  assert.ok(walkAt()?.[2] === at.pos && !LAYER.lineInView(CUT, at.pos, left), 'the camera moved on, the walk still on the paragraph read, out of view');
  await run(GO.leapTo(FAR));
  const end = at.pos + at.width;
  setDraft(CUT, EIGHTY.slice(0, at.pos - 1) + EIGHTY.slice(end - 1), [[CUT, 1, at.pos - 1], [CUT, end, EIGHTY.length - end + 1]]);
  await run(GO.back());
  const now = later.pos - at.width;
  assert.deepEqual([walkAt(), GO.landing(), faceShown()], [['block', CUT, now], null, null], 'the walk on the line read where it stands now, nothing said of the paragraph the camera had left');
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a draft where a landing in two pieces stands out of the view the reader left puts the walk where it stood, in view, and says the landing\'s line once in the status region: never the walk on piece 1, out of view (issue #237; FP-21, FP-36)', async () => {
  const at = EIGHTY.indexOf('Line 10 ') + 1, width = 'Line 10 of a draft'.length, cut = at - 1 + 8, word = 'new ', w = word.length;
  setDraft(CUT, EIGHTY.slice(0, cut) + word + EIGHTY.slice(cut), [[CUT, 1, cut], [FOREIGN, 1, w], [CUT, cut + 1, EIGHTY.length - cut]]);
  await PUMP.loadWhole(CUT);
  await run(GO.leapTo(CUT, { pos: at, runs: [{ pos: at, width: 8 }, { pos: at + 8 + w, width: width - 8 }], passage: { prefix: CUT + '.0.1', ordinal: at, width }, how: 'leap' }));
  const line = GO.landingLine();
  assert.equal(line, t('L.piece', { k: 1, n: 2 }) + ' · ' + t('L.piece.all'), 'landed at piece 1 of 2');
  const sixty = REC.doc(CUT).blocks[59];
  CAM.set(GO.viewFor(CUT, sixty.pos));
  await WALK.retakeFromView();
  const left = CAM.view();
  assert.deepEqual([walkAt(), LAYER.lineInView(CUT, at, left), !!GO.arrivalMark()], [['block', CUT, sixty.pos], false, true], 'the walk on the sixtieth paragraph, the landing out of view and standing');
  await run(GO.leapTo(FAR));
  const said = statusSaid();
  await run(GO.back());
  assert.ok(same(CAM.view(), left), 'Back at the view left');
  assert.deepEqual([walkAt(), GO.landingLine(), GO.arrivalMark()?.runs?.length], [['block', CUT, sixty.pos], line, 2], 'the walk where it stood, the landing standing again out of view');
  assert.deepEqual(said.filter((x) => x === line), [line], 'the landing\'s line said once, the item the walk lands on not carrying it');
  GO.endArrival();
  assert.deepEqual(fake.unanswered, []);
});

test('Forward to a draft\'s entry the reader left while its LEAP read puts the walk on the byte that LEAP named where an edit since moved it, never the old position, and the line read under the visible centre where it stands now (issue #297)', async () => {
  REC.invalidate(CUT);
  const at = EIGHTY.indexOf('Line 10 ') + 1 + 5, k = INSERTED.length;
  await run(GO.leapTo(FAR));
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(CUT) });
  const leap = GO.leapTo(CUT, { pos: at });
  await run(GO.back());
  release();
  await run(leap);
  const e = /** @type {import('./trail.js').Entry} */ (TRAIL.all()[TRAIL.cursorIndex() + 1]), r = /** @type {import('../text/layer.js').Reading} */ (e.reading);
  assert.deepEqual([e.addr, e.pos, e.stood && e.stood.pos, r.pos < at && at < r.pos + r.width], [CUT, at, at, true], 'its read answered after the reader left: the entry holds its landing, where the walk lands there, and the line read holding it');
  setDraft(CUT, INSERTED + EIGHTY, [[FOREIGN, 1, k], [CUT, 1, EIGHTY.length]]);
  await run(GO.forward());
  assert.deepEqual([walkAt(), WALK.landedAt()], [['block', CUT, r.pos + k], at + k], 'the walk on the byte the LEAP named, where the edit moved it');
  assert.equal(under(CUT, CAM.view()).pos, r.pos + k, 'the line read under the visible centre, where it stands now');
  assert.deepEqual([GO.landing(), faceShown()], [null, null], 'all of the line read in one piece: nothing said');
  assert.deepEqual(fake.unanswered, []);
});

test('Back across a carry made from a draft whose line an edit cut lights the passage carried where it stands now, nothing else said — the light the landing\'s — and lands on what stands of the line read, never the old position (issue #297)', async () => {
  const { at } = await leftCut();
  await run(GO.back());
  const was = under(CUT, CAM.view()), passage = { addr: CUT, pos: at.pos + 5, width: 10 };
  Object.assign(script, { [FAKE.keyOf('op', { frame: carried(passage, FAR, FAR_EXTENT) })]: pairsOf(FAR, []) });
  await run(GO.leapTo(FAR, { how: 'leap', carry: passage }));
  const k = INSERTED.length;
  setDraft(CUT, INSERTED + EIGHTY.slice(0, at.pos - 1) + EIGHTY.slice(at.pos), [[FOREIGN, 1, k], [CUT, 1, at.pos - 1], [CUT, at.pos + 1, EIGHTY.length - at.pos]]);
  await run(GO.back());
  assert.deepEqual(marks(), [{ addr: CUT, pos: k + at.pos + 4, runs: [{ pos: k + at.pos + 4, width: 10 }], link: null }, []], 'the passage carried outlined where it stands now, no link lit');
  assert.deepEqual([GO.landing(), GO.landingLine(), faceShown()], [null, null, null], 'nothing else said: the line read, cut, only places the view');
  assert.ok(samePassage(under(CUT, CAM.view()), { ...was, pos: k + at.pos }), `the line holding what stands of the line read where it stood: ${JSON.stringify([under(CUT, CAM.view()), was])}`);
  GO.endArrival();
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a draft where a landing outlined and labelled a passage in two pieces, an edit setting a paragraph before it while the reader was away, outlines and labels those pieces where their bytes stand now — never the positions they were outlined at — the landing and the walk on piece 1 (issue #294)', async () => {
  // line 10's first eighteen bytes the passage, a word an edit set after its eighth holding it in two pieces
  const at = EIGHTY.indexOf('Line 10 ') + 1, width = 'Line 10 of a draft'.length, cut = at - 1 + 8, word = 'new ', w = word.length, k = INSERTED.length;
  const pieced = EIGHTY.slice(0, cut) + word + EIGHTY.slice(cut);
  setDraft(CUT, pieced, [[CUT, 1, cut], [FOREIGN, 1, w], [CUT, cut + 1, EIGHTY.length - cut]]);
  await PUMP.loadWhole(CUT);
  const runs = [{ pos: at, width: 8 }, { pos: at + 8 + w, width: width - 8 }];
  await run(GO.leapTo(CUT, { pos: at, runs, passage: { prefix: CUT + '.0.1', ordinal: at, width }, how: 'leap' }));
  const piece = (/** @type {number} */ n) => t('L.piece', { k: n, n: 2 }), words = piece(1) + ' · ' + t('L.piece.all');
  /** the landing as its description reads it, its runs from `from` */
  const labelled = (/** @type {number} */ from) => ({ addr: CUT, pos: from, words, runs: [{ pos: from, width: 8, words: piece(1) }, { pos: from + 8 + w, width: width - 8, words: piece(2) }] });
  assert.deepEqual([GO.arrivalMark()?.runs, GO.described()], [runs, labelled(at)], 'both pieces outlined and labelled where the LEAP named them, the landing at piece 1');
  await run(GO.leapTo(FAR));
  setDraft(CUT, INSERTED + pieced, [['1.0.1.0.99', 1, k], [CUT, 1, cut], [FOREIGN, 1, w], [CUT, cut + 1, EIGHTY.length - cut]]);
  await run(GO.back());
  assert.deepEqual(GO.arrivalMark(), { addr: CUT, pos: at + k, runs: runs.map((r) => ({ pos: r.pos + k, width: r.width })), link: null }, 'Back: both pieces outlined where their bytes stand now');
  assert.deepEqual([GO.described(), GO.landingLine(), walkAt()], [labelled(at + k), words, ['block', CUT, at + k]], 'their labels on them there, the landing and the walk on piece 1');
  GO.endArrival();
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a place whose outline named no bytes — the door\'s link landing on a draft held with no image — outlines it as the reader left it while that text stands as it was, and nothing once the text is set again, never the positions it was outlined at (issue #294)', async () => {
  const DW = '1.0.1.0.47', LINK = DW + '.0.2.1', text = 'A note held with no image.\n\nIts outlined words stand here.\n\nA last line.', lead = 'A new lead.\n';
  const P = text.indexOf('outlined') + 1, W = 'outlined'.length, outlined = { addr: DW, pos: P, runs: [{ pos: P, width: W }], link: LINK };
  setDraft(DW, text, []);
  REC.takeMetadata(DW, { doc: DW, published: false, owner: '1.0.1', birth: null, birthExtent: null, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeLinks(DW, []);
  const was = fake.unanswered.length;
  try {
    await run(GO.leapTo(DW, { pos: P, runs: [{ pos: P, width: W }], link: LINK, how: 'leap' }));
    assert.deepEqual([marks(), REC.identityOf(DW, P, W)], [[outlined, [LINK]], []], 'the door\'s landing outlined, its bytes named by nothing');
    await run(GO.leapTo(D));
    await run(GO.back());
    assert.deepEqual(marks(), [outlined, []], 'Back, its text standing as it was: the outline as the reader left it');
    await run(GO.leapTo(D));
    setDraft(DW, lead + text, [[FOREIGN, 1, lead.length], [DW, 1, text.length]]);
    await run(GO.back());
    assert.deepEqual([marks(), GO.landing()], [[null, []], null], 'Back, its text set again since: nothing outlined, never the positions it was outlined at, which hold other words now');
    assert.equal(fake.unanswered.length, was, 'nothing asked the script does not answer');
  } finally {
    GO.endArrival();
    REC.invalidate(DW);
  }
});

// NEIGHBOUR: a draft past the sound depth, in the room every document there shares; GHOSTED: an address in that room the board
// says nothing about
const NEIGHBOUR = '1.0.1.0.590', GHOSTED = '1.0.1.0.600';
Object.assign(script, draftReads(NEIGHBOUR, EIGHTY), {
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(GHOSTED) })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } },
});

test('a return to the entry a jump\'s failure faced at — the walk on the address the board says nothing about, its view reading the line of a document sharing its room — asks its read again, puts the walk on that address and shows the face the board still answers alone, whatever the text the view read holds of that line now (issues #297, #228)', async () => {
  CAM.setDeepest(depthOfDoc(GHOSTED));
  await PUMP.loadWhole(NEIGHBOUR);
  await run(GO.leapTo(FAR));
  REC.invalidate(GHOSTED);
  await run(GO.leapTo(GHOSTED));
  assert.deepEqual([faceShown()?.id, walkAt()], ['face:doc_not_registered', ['document', GHOSTED, null]], 'faced where the camera went, the walk on the address');
  await run(GO.back());
  const e = /** @type {import('./trail.js').Entry} */ (TRAIL.all()[TRAIL.cursorIndex() + 1]), r = /** @type {import('../text/layer.js').Reading} */ (e.reading);
  assert.deepEqual([e.addr, e.notice?.face, r && r.addr, e.stood], [GHOSTED, 'unregistered', NEIGHBOUR, null], 'its entry keeps the notice and the line its view read, the neighbour\'s, the walk standing in no document it read');
  let asked = extentAsks(GHOSTED);
  await run(GO.forward());
  assert.deepEqual([walkAt(), extentAsks(GHOSTED) - asked, faceShown()?.id, GO.landing(), GO.arrivalMark()], [['document', GHOSTED, null], 1, 'face:doc_not_registered', null, null], 'Forward: the walk on the address, never the neighbour\'s line; its read asked again and its face shown again, nothing else said');
  // the paragraph holding the line read removed while the reader is away
  await run(GO.back());
  const b = /** @type {import('../model/records.js').Block} */ (REC.blockAt(NEIGHBOUR, r.pos)), end = b.pos + b.width;
  setDraft(NEIGHBOUR, EIGHTY.slice(0, b.pos - 1) + EIGHTY.slice(end - 1), [[NEIGHBOUR, 1, b.pos - 1], [NEIGHBOUR, end, EIGHTY.length - end + 1]]);
  asked = extentAsks(GHOSTED);
  await run(GO.forward());
  assert.deepEqual([walkAt(), extentAsks(GHOSTED) - asked, faceShown()?.id, GO.landing(), GO.arrivalMark()], [['document', GHOSTED, null], 1, 'face:doc_not_registered', null, null], 'the line read gone: the walk on the address, its read asked again and its face still the one face — no dead end\'s face for the neighbour, nothing marked');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

// ---- THE FLIGHT LANDS ON ITS PASSAGE (FP-8, FP-25) -----------------------------------------------------------------

/** a jump's flight stepped as the frames step it — half way, a change made between two frames, three quarters — then run to its landing */
async function across(/** @type {Promise<unknown>} */ jump, /** @type {() => void} */ change) {
  const f = CAM.cam.anim;
  assert.ok(f, 'the jump flies');
  CAM.step(f.t0 + f.ms / 2);
  change();
  CAM.step(f.t0 + f.ms * 3 / 4);
  await run(jump);
}

test('a LEAP\'s flight lands on its passage where its document is set again in the air: CUT set again half way there with a paragraph before its text, the camera lands at the view that reads the passage\'s first byte where it stands now — never at the position the act named, which holds other words now', async () => {
  setDraft(CUT, EIGHTY, [[CUT, 1, EIGHTY.length]]);
  await PUMP.loadWhole(CUT);
  const at = REC.doc(CUT).blocks[9].pos, k = INSERTED.length;
  await run(GO.leapTo(FAR));
  await across(GO.leapTo(CUT, { pos: at }), () => setDraft(CUT, INSERTED + EIGHTY, [[FOREIGN, 1, k], [CUT, 1, EIGHTY.length]]));
  assert.ok(same(CAM.view(), GO.viewFor(CUT, at + k)), `the camera on the passage, ${at + k} now: ${JSON.stringify(CAM.view())}`);
  assert.ok(!same(CAM.view(), GO.viewFor(CUT, at)), 'never on the position the act named');
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP\'s flight lands on its passage through a resize in the air: the window narrowed half way there, LONG folded again at the measure the narrow view holds, the camera lands at the view that reads the passage in that fold', async () => {
  await PUMP.loadWhole(LONG);
  const d = REC.doc(LONG), pos = d.blocks[Math.floor(d.blocks.length * 2 / 3)].pos;
  await run(GO.leapTo(FAR));
  const wide = GO.viewFor(LONG, pos);
  try {
    await across(GO.leapTo(LONG, { pos }), () => CAM.setViewport(400, 900));
    const narrow = GO.viewFor(LONG, pos);
    assert.ok(!same(wide, narrow), 'the narrow view folds LONG again: the passage read elsewhere');
    assert.ok(same(CAM.view(), narrow), `the camera at the view that reads the passage in the fold the narrow view holds: ${JSON.stringify(CAM.view())}`);
  } finally {
    CAM.setViewport(1440, 900);
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP\'s flight to a byte its text holds more than once lands on the stretch the act named, never the first that holds the byte', async () => {
  await PUMP.loadWhole(FAR);
  // FAR's text as an edit left it: its third byte at 3, at 20 and at 22
  REC.takeImage(FAR, 1, [{ iStart: FAR + '.0.1.1', width: 19 }, { iStart: FAR + '.0.1.3', width: 2 }, { iStart: FAR + '.0.1.3', width: 2 }, { iStart: FAR + '.0.1.24', width: FAR_EXTENT - 23 }]);
  try {
    assert.ok(REC.doc(FAR).from >= 0, 'FAR\'s text held: the LEAP reads nothing');
    assert.deepEqual(REC.placedIdentity(FAR, REC.identityOf(FAR, 22, 1)).map((s) => s.pos), [3, 20, 22], 'the byte at 22 stands at 3 and 20 too');
    await run(GO.leapTo(D));
    await across(GO.leapTo(FAR, { pos: 22 }), () => {});
    assert.ok(same(CAM.view(), GO.viewFor(FAR, 22)) && !same(CAM.view(), GO.viewFor(FAR, 3)), `the camera on 22, never on 3: ${JSON.stringify(CAM.view())}`);
  } finally { farOwn(); }
  assert.deepEqual(fake.unanswered, []);
});

// ---- THE SURFACES' RETURN (FP-36) ----------------------------------------------------------------------------------

test('Back to the place a follow was made from the anatomy card reopens the card as the reader left it (issue #264\'s design decision: "Back and Forward reopen them as left … and re-read counts and claims"): at the link\'s own bytes, its lineage asked again, the focus on its follow where Enter on it left the focus there; Forward ends it, and Back reopens it again (FP-36)', async () => {
  const doc = /** @type {any} */ (globalThis.document), was = hostEl.contains;
  /** the card's follow holding the platform's focus, as Enter on it leaves it */
  const follow = { dataset: { run: 'follow' }, blur() { doc.activeElement = null; }, focus() {} };
  /** the platform's focus on the card's follow while `act` is made */
  const onFollow = async (/** @type {() => Promise<unknown>} */ act) => {
    hostEl.contains = /** @type {any} */ ((/** @type {unknown} */ x) => x === follow);
    doc.activeElement = follow;
    try { await run(act()); } finally { hostEl.contains = was; doc.activeElement = null; }
  };
  const lineage = FAKE.keyOf('op', { frame: F.outClaims(PASSAGE, 'audit') });
  await run(GO.leapTo(D));
  await ANATOMY.open(drawn(PASSAGE), null);
  const card = HOST.currentState();
  assert.equal(card?.id, 'anatomy:' + PASSAGE, 'the card at D');
  await onFollow(() => Promise.resolve(card?.acts?.follow(/** @type {any} */ (follow), true)));
  assert.deepEqual([TRAIL.current()?.addr, HOST.currentState()], [FAR, null], 'the follow landed at FAR, the card ended as its camera left');
  let from = fake.asked.length;
  await run(GO.back()); await reopening();
  const back = HOST.currentState();
  assert.deepEqual([TRAIL.current()?.addr, back?.id, back?.anchor, back?.takeFocus, back?.first], [D, 'anatomy:' + PASSAGE, { span: { addr: D, pos: 11, width: 5 } }, true, '[data-run="follow"]'],
    'Back to D: the card reopened at the link\'s own bytes, taking the focus on its follow');
  assert.ok(fake.asked.slice(from).includes(lineage), 'its lineage asked again');
  await onFollow(() => GO.forward());
  assert.deepEqual([TRAIL.current()?.addr, HOST.currentState()], [FAR, null], 'Forward ends it: FAR kept no card');
  from = fake.asked.length;
  await run(GO.back()); await reopening();
  assert.deepEqual([HOST.currentState()?.id, HOST.currentState()?.takeFocus, HOST.currentState()?.first], ['anatomy:' + PASSAGE, true, '[data-run="follow"]'], 'Back reopens it again, the focus on its follow as it was left');
  assert.ok(fake.asked.slice(from).includes(lineage), 'its lineage asked again');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a place left with the links card at its content stage reopens the card there, the chain raised to its content again — the card\'s dismissal returning it to hidden as the reader leaves (issue #264; FP-36)', async () => {
  await run(GO.leapTo(D));
  LINKS.show(D);
  HOST.currentState()?.acts?.stage3(/** @type {any} */ (hostEl), false);
  assert.deepEqual([HOST.currentState()?.id, LK.state(D).stage], ['links:' + D, 3], 'the card at D, the chain at its content');
  await run(GO.leapTo(FAR));
  assert.deepEqual([HOST.currentState(), LK.state(D).stage], [null, 1], 'leaving: the card ended, the chain hidden');
  await run(GO.back()); await reopening();
  assert.deepEqual([HOST.currentState()?.id, LK.state(D).stage], ['links:' + D, 3], 'Back: the card reopened, the chain at its content again');
  HOST.dismiss();
  assert.equal(LK.state(D).stage, 1);
  assert.deepEqual(fake.unanswered, []);
});

test('a second move made at once, while a return still reopens the card it owes, loses nothing: the departure keeps the card as the reader left it, and Forward reopens it (issue #264)', async () => {
  await run(GO.leapTo(FAR));
  await run(GO.leapTo(D));
  await ANATOMY.open(drawn(PASSAGE), null);
  const card = HOST.currentState();
  await run(Promise.resolve(card?.acts?.follow(/** @type {any} */ (hostEl), false)));
  assert.equal(TRAIL.current()?.addr, FAR, 'the follow from the card landed at FAR');
  const release = fake.hold('op', { frame: F.inClaims(PASSAGE, 'audit') });
  const back = GO.back();
  for (let i = 0; i < 40 && !HOST.pending(); i++) await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([TRAIL.current()?.addr, HOST.pending()], [D, true], 'Back to D: the card reopening, its lineage\'s read held');
  await run(GO.back());
  release(); await run(back); await reopening();
  assert.deepEqual([TRAIL.current()?.addr, HOST.currentState()], [FAR, null], 'a second Back at once: at the entry before D\'s, nothing over it');
  await run(GO.forward()); await reopening();
  assert.deepEqual([TRAIL.current()?.addr, HOST.currentState()?.id], [D, 'anatomy:' + PASSAGE], 'Forward to D: the card the first Back still owed, reopened');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('over a span shown after typing, who wrote this? asks by the base\'s positions as of its read and stands at the span shown, its origin\'s LEAP carries those bytes, and after more typing Back reopens the card and the selection over the same characters (FP-36)', async () => {
  const platform = { window: globalThis.window };
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  try {
    await run(GO.leapTo(D));
    const asOf = REC.doc(D).readAt;
    assert.ok(asOf != null, 'the first edition\'s text read at a position');
    const asked = FAKE.keyOf('op', { frame: F.opAt(asOf, F.showOrigin(D, 11, 5)) });
    script[asked] = { result: { as_of: 1, resp: 'addrs', addrs: [FAR] } };
    REC.addEdit(D, { pos: 1, width: 0, text: 'ab' });
    SEL.select(D, 13, 5);
    SEL.act('wrote'); await reopening();
    const card = HOST.currentState();
    assert.deepEqual([card?.id, card?.anchor, SEL.selected()], ['provenance:wrote', { span: { addr: D, pos: 13, width: 5 } }, { addr: D, pos: 13, width: 5 }], 'the card over the selection, where the text shown holds it');
    assert.ok(fake.asked.includes(asked), '`show_origin` over the base\'s positions, as of the read');
    await run(Promise.resolve(card?.acts?.src0(/** @type {any} */ (hostEl), false)));
    assert.equal(TRAIL.current()?.addr, FAR, 'the origin\'s LEAP landed');
    assert.deepEqual(departed()?.step, { kind: 'carry', from: D, to: FAR, spans: [{ prefix: D + '.0.1', ordinal: 11, width: 5 }] }, 'the bytes of the base carried, never a position of the text shown');
    KEYS.esc();
    REC.addEdit(D, { pos: 1, width: 0, text: 'cd' });
    const from = fake.asked.length;
    await run(GO.back()); await reopening();
    assert.deepEqual([TRAIL.current()?.addr, SEL.selected(), HOST.currentState()?.id, HOST.currentState()?.anchor], [D, { addr: D, pos: 15, width: 5 }, 'provenance:wrote', { span: { addr: D, pos: 15, width: 5 } }], 'Back to the place: the selection and the card over the same characters, two positions further on');
    assert.ok(fake.asked.slice(from).includes(asked), 'and asked over the same bytes of the base');
  } finally { HOST.dismiss(); SEL.clear(); REC.clearEdits(D); globalThis.window = platform.window; }
});

test('a selection standing under the card one of its acts opened ends as a jump leaves its place, and Back brings both back (issue #264): "who wrote this?" over the selection, then its origin\'s row — the selection gone at the landing, Esc ending the arrival; Back to the place, the selection over its bytes and the card asked again over them (FP-36)', async () => {
  const platform = { window: globalThis.window };
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  const origin = FAKE.keyOf('op', { frame: F.showOrigin(D, 11, 5) });
  try {
    await run(GO.leapTo(D));
    SEL.select(D, 11, 5);
    SEL.act('wrote'); await reopening();
    const card = HOST.currentState();
    assert.deepEqual([card?.id, SEL.selected()], ['provenance:wrote', { addr: D, pos: 11, width: 5 }], 'the card over the selection, which stands under it');
    await run(Promise.resolve(card?.acts?.src0(/** @type {any} */ (hostEl), false)));
    assert.deepEqual([TRAIL.current()?.addr, SEL.selected(), HOST.currentState()], [FAR, null, null], 'the origin\'s LEAP landed at FAR: the selection ended with the card');
    assert.ok(GO.arrivalMark(), 'the passage carried outlined there');
    KEYS.esc();
    assert.equal(GO.arrivalMark(), null, 'Esc ends the arrival: no selection stands nearer');
    const from = fake.asked.length;
    await run(GO.back()); await reopening();
    assert.deepEqual([TRAIL.current()?.addr, SEL.selected(), HOST.currentState()?.id], [D, { addr: D, pos: 11, width: 5 }, 'provenance:wrote'], 'Back to D: the selection over its bytes, the card over it again');
    assert.ok(fake.asked.slice(from).includes(origin), '`show_origin` asked again');
  } finally { HOST.dismiss(); SEL.clear(); globalThis.window = platform.window; }
  assert.deepEqual(fake.unanswered, []);
});

test('a card a slot\'s act opened at the walk\'s focused span, no selection standing, holds that span alone and returns with its place: Mod+K\'s acts card and "who wrote this?" over D\'s second paragraph select nothing — the provenance card naming its span as no selection of the reader\'s — and Back to D reopens each at the paragraph\'s bytes, nothing selected (issue #471; FP-10, FP-36)', async () => {
  const platform = { window: globalThis.window };
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  try {
    await run(GO.leapTo(D));
    SEL.clear();
    await WALK.focusTo(D, 11);
    const b = /** @type {import('../model/records.js').Block} */ (REC.blockAt(D, 11)), para = { addr: D, pos: b.pos, width: b.width };
    script[FAKE.keyOf('op', { frame: F.showOrigin(D, b.pos, b.width) })] = { result: { as_of: 1, resp: 'addrs', addrs: [FAR] } };
    /** the card standing: its id, where it stands, and the span it holds of its own (O-SELECTION's `About.at`) or the provenance card's span and whether it names it the selection's */
    const card = () => {
      const o = HOST.currentState(), a = /** @type {any} */ (o?.about);
      return { id: o?.id ?? null, anchor: o?.anchor ?? null, about: a && (a.kind === 'selection' ? a.at && { addr: a.at.addr, pos: a.at.pos, width: a.at.width } : [a.pos, a.width, a.selected]) };
    };
    assert.equal(SEL.inertChord('linkto'), true);
    const acts = { id: 'selection', anchor: { span: para }, about: para };
    assert.deepEqual([SEL.selected(), card()], [null, acts], 'Mod+K at the walk\'s span: the acts card at the paragraph, which it holds, nothing selected');
    await run(GO.leapTo(FAR));
    assert.deepEqual([SEL.selected(), HOST.currentState()], [null, null], 'leaving: the card ended');
    await run(GO.back()); await reopening();
    assert.deepEqual([TRAIL.current()?.addr, SEL.selected(), card()], [D, null, acts], 'Back to D: the acts card reopened at the paragraph\'s bytes, nothing selected');
    HOST.dismiss();
    await WALK.focusTo(D, 11);
    assert.equal(SEL.act('wrote'), true); await reopening();
    const wrote = { id: 'provenance:wrote', anchor: { span: para }, about: [b.pos, b.width, false] };
    assert.deepEqual([SEL.selected(), card()], [null, wrote], '"who wrote this?" at the walk\'s span: the card over the paragraph, naming it no selection of the reader\'s, nothing selected');
    await run(GO.leapTo(FAR));
    await run(GO.back()); await reopening();
    assert.deepEqual([TRAIL.current()?.addr, SEL.selected(), card()], [D, null, wrote], 'Back to D: the card asked again over the paragraph, nothing selected');
  } finally { HOST.dismiss(); SEL.clear(); globalThis.window = platform.window; }
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a place left with a selection standing puts it back over its bytes wherever an edit set them while the reader was away: moved, where they stand; in part, on what stands, its line said in the status region, the landing\'s line the words its view read; none, nothing selected, the dead end\'s face where the return lands (issue #264\'s design decision: "the landing rule re-checks it whenever the text under it changes"; FP-36; issue #297)', async () => {
  Object.assign(script, reads(SETA, SETA_TEXT, []), noClaims(SETA));
  const platform = { window: globalThis.window };
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  /** @type {string[]} the status region, as it was told */
  const said = [];
  FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() {}, set textContent(/** @type {string} */ v) { said.push(v); } }) });
  const at = SETA_TEXT.indexOf('Its passage') + 1, width = 'Its passage'.length, n = SETA_TEXT.length;
  /** a LEAP away from SETA with the passage selected there, its text set again while the reader is away, then Back: what stands, and what was said */
  const away = async (/** @type {() => void} */ edit) => {
    await run(GO.leapTo(FAR));
    assert.equal(SEL.selected(), null, 'leaving: the selection ended with its card');
    edit();
    const told = said.length;
    await run(GO.back()); await reopening();
    return { sel: SEL.selected(), overlay: HOST.currentState()?.id ?? null, said: said.slice(told) };
  };
  try {
    REC.invalidate(SETA);
    await run(GO.leapTo(SETA, { pos: at }));
    REC.takeMembers(SETA, 1);
    SEL.select(SETA, at, width);
    // twelve bytes minted since set before the text: every byte of it twelve on
    const moved = await away(() => setSeta('A new lead.\n' + SETA_TEXT, [[n + 1, 12], [1, n]]));
    assert.deepEqual([moved.sel, moved.overlay], [{ addr: SETA, pos: at + 12, width }, 'selection'], 'moved: the selection over its bytes, twelve on, its card with it');
    // the passage's last five bytes gone, as the reader left it in the text set again
    SEL.select(SETA, at + 12, width);
    const part = await away(() => setSeta(SETA_TEXT.slice(0, at + width - 6) + SETA_TEXT.slice(at + width - 1), [[1, at + width - 6], [at + width, n - at - width + 1]]));
    const line = t('L.held.part', { subject: t('L.held.selected'), where: t('L.held.current', { D: SETA }) });
    assert.deepEqual([part.sel, part.overlay, part.said.includes(line), GO.landingLine()], [{ addr: SETA, pos: at, width: width - 5 }, 'selection', true, t('L.piece', { k: 1, n: 2 }) + ' · ' + t('L.piece.part')],
      'in part: the selection on what stands, its card with it, its line said in the status region; beside the landing the line its view read, which the edit cut in two, the landing\'s own (issue #297)');
    GO.endArrival();
    // none of it: the text set again of bytes minted since
    const none = await away(() => setSeta('Other words.', [[n + 20, 12]]));
    assert.deepEqual([none.sel, none.overlay, HOST.currentState()?.told, HOST.currentState()?.anchor], [null, 'face:floating', true, { span: { addr: SETA, pos: 1 }, sign: SETA }],
      'none: nothing selected; the dead end\'s face where the return lands — the text\'s head, for it shares nothing with the view read — told by the landing\'s description (issue #297)');
  } finally { HOST.dismiss(); SEL.clear(); GO.endArrival(); REC.invalidate(SETA); globalThis.window = platform.window; }
  assert.deepEqual(fake.unanswered, []);
});

test('a change of the page\'s class drops what every entry keeps of its surfaces: Back to a place left with a card standing reopens nothing and asks nothing for it (FP-29; issue #264)', async () => {
  await run(GO.leapTo(D));
  await PROV.wrote(D, 11, 5);
  assert.equal(HOST.currentState()?.id, 'provenance:wrote', 'the card at D');
  await run(GO.leapTo(FAR));
  GO.classChanged();
  const from = fake.asked.length;
  await run(GO.back()); await reopening();
  assert.deepEqual([TRAIL.current()?.addr, HOST.currentState()], [D, null], 'Back to D: no card');
  assert.ok(!fake.asked.slice(from).includes(FAKE.keyOf('op', { frame: F.showOrigin(D, 11, 5) })), 'nothing asked for it');
  assert.deepEqual(fake.unanswered, []);
});

// ---- A DRAFT HOLDING TYPED WORDS: every part follows the text shown and holds its place by its bytes ------------------

/** the reader the app hands LK: a document's ends stand in the text the page shows of it (T-LAYER's `shownOf`) */
const shownText = { text: (/** @type {string} */ a) => (REC.has(a) ? LAYER.shownOf(a) : null) };
/** the view that frames a position of the text a document shows, at the landing's em */
const framed = (/** @type {string} */ addr, /** @type {number} */ pos) => { const at = LAYER.frameOf(addr, pos); return CAM.viewAt(at, at.fs, CAM.landingPx()); };

test('a follow into a text holding typed words lands at the view that reads its span where the text shown holds it, the outline, the walk, the entry and the landing there too: the characters the link names, placed by their bytes (FP-21, FP-25; issues #515, #518)', async () => {
  REC.addEdit(FAR, { pos: 1, width: 0, text: 'ab' });
  try {
    await run(GO.leapTo(D));
    await run(GO.follow(drawn(PASSAGE)));
    const at = framed(FAR, 22), there = framed(FAR, 20);
    assert.ok(!same(at, there), 'the two positions stand on different lines of the text shown');
    assert.ok(same(CAM.view(), at), `the camera at the line the text shown holds the span on: ${JSON.stringify(CAM.view())}`);
    assert.deepEqual([walkAt(), WALK.landedAt(), TRAIL.current()?.pos, TRAIL.current()?.width], [['block', FAR, 21], 22, 22, 5], 'the walk and the entry on the span where the text shown holds it');
    assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: 22, runs: [{ pos: 22, width: 5 }], link: PASSAGE }, 'the outline where the text shown holds it');
    assert.equal(REC.textOf(LAYER.shownOf(FAR).runs, 22, 27), REC.textOf(REC.doc(FAR).runs, 20, 25), 'the characters outlined are the ones the link names, two positions on');
  } finally { REC.clearEdits(FAR); GO.endArrival(); }
  assert.deepEqual(fake.unanswered, []);
});

test('a departure keeps where the walk stands in the text shown, and by its bytes: a span a long passage was typed above stands at its position there, named by the byte it holds (FP-25; issue #515)', async () => {
  setDraft(CUT, EIGHTY, [[CUT, 1, EIGHTY.length]]);
  await PUMP.loadWhole(CUT);
  const at = REC.doc(CUT).blocks[9], k = INSERTED.length * 30;
  REC.addEdit(CUT, { pos: 1, width: 0, text: INSERTED.repeat(30) });
  try {
    await run(GO.leapTo(CUT, { pos: at.pos + k }));
    assert.ok(LAYER.lineInView(CUT, at.pos + k, CAM.view()) && !LAYER.lineInView(CUT, at.pos, CAM.view()), 'the span\'s line in this view, where the text shown holds it; the typed line standing at the number it had, out of it');
    await run(GO.leapTo(FAR));
    const e = TRAIL.all()[TRAIL.cursorIndex() - 1];
    assert.deepEqual([e.addr, e.stood && e.stood.addr, e.stood && e.stood.pos, e.stood && e.stood.ids], [CUT, CUT, at.pos + k, [{ prefix: CUT + '.0.1', ordinal: at.pos, width: 1 }]], 'the entry keeps the walk where it stood in the text shown, by its byte');
  } finally { REC.clearEdits(CUT); }
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a draft a paragraph was typed above the line the reader left lands on that line\'s own bytes where the text shown holds them, at the height it stood and its em, the walk on its span there (issue #515)', async () => {
  const { at, was } = await leftCut(), k = INSERTED.length;
  REC.addEdit(CUT, { pos: 1, width: 0, text: INSERTED });
  try {
    await run(GO.back());
    assert.ok(samePassage(under(CUT, CAM.view()), { ...was, pos: was.pos + k }), `the line's bytes under the visible centre, where the text shown holds them: ${JSON.stringify([under(CUT, CAM.view()), was])}`);
    assert.deepEqual([walkAt(), GO.landing(), faceShown()], [['block', CUT, at.pos + k], null, null], 'the walk on its span where the text shown holds it, nothing said: all of it in one piece');
  } finally { REC.clearEdits(CUT); }
  assert.deepEqual(fake.unanswered, []);
});

test('what a view read below typed words is named by its own bytes, read of the text shown, and Back after more typing finds them where they stand now (issue #515)', async () => {
  setDraft(CUT, EIGHTY, [[CUT, 1, EIGHTY.length]]);
  await PUMP.loadWhole(CUT);
  const at = REC.doc(CUT).blocks[9], k = INSERTED.length;
  REC.addEdit(CUT, { pos: 1, width: 0, text: INSERTED });
  try {
    await run(GO.leapTo(CUT, { pos: at.pos + k }));
    const was = under(CUT, CAM.view());
    assert.equal(was.pos, at.pos + k, 'the camera on the line, where the text shown holds it');
    await run(GO.leapTo(FAR));
    const r = /** @type {import('../text/layer.js').Reading} */ (TRAIL.all()[TRAIL.cursorIndex() - 1].reading);
    assert.deepEqual([r.pos, r.ids], [at.pos + k, REC.identityOf(CUT, at.pos, r.width)], 'the view read a position of the text shown, named by the line\'s own bytes');
    REC.addEdit(CUT, { pos: 1, width: 0, text: 'ab' });
    await run(GO.back());
    assert.ok(samePassage(under(CUT, CAM.view()), { ...was, pos: was.pos + 2 }), `its line where it stood, past the words typed meanwhile: ${JSON.stringify([under(CUT, CAM.view()), was])}`);
    assert.deepEqual([walkAt(), GO.landing()], [['block', CUT, at.pos + k + 2], null], 'the walk on its span where the text shown holds it now');
  } finally { REC.clearEdits(CUT); }
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a line of typed words finds it by the page\'s own identity of its bytes: more typed above it while away, the return lands on the typed line where it stands now, the walk on it (issues #515, #523)', async () => {
  setDraft(CUT, EIGHTY, [[CUT, 1, EIGHTY.length]]);
  await PUMP.loadWhole(CUT);
  const at = REC.doc(CUT).blocks[9];
  REC.addEdit(CUT, { pos: at.pos, width: 0, text: 'A line the reader typed.\n\n' });
  try {
    await run(GO.leapTo(CUT, { pos: at.pos }));
    CAM.set(framed(CUT, at.pos));
    const left = CAM.view(), r = LAYER.readAt(left), page = /** @type {number} */ (REC.edits(CUT)[0].page);
    assert.deepEqual(r && [r.pos, r.ids], [at.pos, [{ prefix: REC.pageSpace(CUT), ordinal: page, width: 26 }]], 'the view reads the typed line, named by the page\'s own identity of its bytes');
    await run(GO.leapTo(FAR));
    REC.addEdit(CUT, { pos: 1, width: 0, text: INSERTED });
    await run(GO.back());
    const k = INSERTED.length;
    assert.deepEqual([under(CUT, CAM.view()).pos, REC.textOf(LAYER.shownOf(CUT).runs, at.pos + k, at.pos + k + 24), walkAt(), GO.landing(), faceShown()], [at.pos + k, 'A line the reader typed.', ['block', CUT, at.pos + k], null, null], 'the typed line under the centre where it stands now, the walk on it, nothing said');
  } finally { REC.clearEdits(CUT); }
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a line of typed words with the walk standing nowhere in that view stands it on the typed line the view shows (FP-25; issue #515)', async () => {
  setDraft(CUT, EIGHTY, [[CUT, 1, EIGHTY.length]]);
  await PUMP.loadWhole(CUT);
  const first = 'A typed opening line of some length. '.repeat(3) + '\n\n';
  assert.ok(first.length + 1 >= REC.doc(CUT).blocks[1].pos, 'the second typed line\'s number stands in another span of the model\'s text');
  REC.addEdit(CUT, { pos: 1, width: 0, text: first + 'A second typed line.\n\n' });
  try {
    await run(GO.leapTo(CUT, { pos: 1 }));
    CAM.set(framed(CUT, first.length + 1));
    const left = CAM.view(), r = LAYER.readAt(left);
    assert.deepEqual(r && [r.pos, r.ids.map((x) => x.prefix)], [first.length + 1, [REC.pageSpace(CUT)]], 'the view reads the second typed line, named by the page\'s own identity');
    await WALK.focusTo('1.0.1', null);
    await run(GO.leapTo(FAR));
    assert.equal(TRAIL.all()[TRAIL.cursorIndex() - 1].stood, null, 'the walk stood in no place that view shows');
    await run(GO.back());
    assert.deepEqual([same(CAM.view(), left), under(CUT, CAM.view()).pos, walkAt()], [true, first.length + 1, ['block', CUT, first.length + 1]], 'its line where it stood, the walk on the typed line the view shows');
  } finally { REC.clearEdits(CUT); }
  assert.deepEqual(fake.unanswered, []);
});

test('a flight into a draft holding typed words lands on its passage where its bytes stand in the text shown, whatever is set under it in the air (FP-8, FP-25; issue #515)', async () => {
  setDraft(CUT, EIGHTY, [[CUT, 1, EIGHTY.length]]);
  await PUMP.loadWhole(CUT);
  const at = REC.doc(CUT).blocks[9].pos, more = INSERTED.repeat(3);
  REC.addEdit(CUT, { pos: 1, width: 0, text: 'ab' });
  try {
    await run(GO.leapTo(FAR));
    await across(GO.leapTo(CUT, { pos: at + 2 }), () => setDraft(CUT, EIGHTY.slice(0, at) + more + EIGHTY.slice(at), [[CUT, 1, at], [FOREIGN, 1, more.length], [CUT, at + 1, EIGHTY.length - at]]));
    assert.ok(same(CAM.view(), framed(CUT, at + 2)), `the camera on the passage's first byte where the text shown holds it, the words set after it standing past it: ${JSON.stringify(CAM.view())}`);
  } finally { REC.clearEdits(CUT); }
  assert.deepEqual(fake.unanswered, []);
});

test('a Back that must read first flies at once for the line the held text places the words on, carried into the text shown (FP-25; issue #515)', async () => {
  const { at, left, r } = await leftCut(), k = INSERTED.length;
  setDraft(CUT, EIGHTY, [[CUT, 1, at.pos + 8]]);
  REC.addEdit(CUT, { pos: 1, width: 0, text: INSERTED });
  try {
    const back = GO.back(), want = /** @type {{x: number, y: number, scale: number}} */ (LAYER.keptAt(left, r, at.pos + k));
    assert.ok(same(CAM.destination(), want), `the camera bound for the line the held bytes place, in the text shown: ${JSON.stringify([CAM.destination(), want])}`);
    await run(back);
    assert.deepEqual([under(CUT, CAM.view()).pos, walkAt()], [at.pos + k, ['block', CUT, at.pos + k]], 'the read answered: on the line\'s bytes, the walk on its span');
  } finally { REC.clearEdits(CUT); }
  assert.deepEqual(fake.unanswered, []);
});

test('a departure names the link\'s end the walk stands on by the bytes it holds, where the text shown holds them (FP-21, FP-36; issue #515)', async () => {
  LK.readers(shownText);
  REC.addEdit(D, { pos: 1, width: 0, text: 'xx' });
  try {
    await run(GO.leapTo(D));
    await run(GO.follow(drawn(PASSAGE)));
    await run(GO.back(true));
    assert.deepEqual([walkAt(), WALK.current()?.link?.pos], [['link', D, 13], 13], 'the walk on the link\'s stop, at its end\'s first drawn byte in the text shown');
    await run(GO.leapTo(FAR));
    assert.deepEqual(TRAIL.all()[TRAIL.cursorIndex() - 1].stood?.of, [{ prefix: D + '.0.1', ordinal: 11, width: 5 }], 'the element it stood on by its own bytes');
  } finally { LK.readers({}); REC.clearEdits(D); GO.endArrival(); }
  assert.deepEqual(fake.unanswered, []);
});

test('Back across a follow made at a withheld run a draft holds below typed words marks the whole run where the text shown holds it, the walk on its item there (FP-30; issue #515)', async () => {
  const RD = '1.0.1.0.48', O = '1.0.2.0.30', RL = RD + '.0.2.1', text = 'Tumbler.\n\n', n = text.length, RUN = n + 1;
  REC.takeSpanSet(RD, [{ subspace: 1, ordinal: 1, positions: n + 8 }]);
  REC.takeMetadata(RD, { doc: RD, published: false, owner: '1.0.1', birth: null, birthExtent: null, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeDelivery(RD, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: RUN, width: 8, kind: 'withheld', text: '', ref: null, origin: O }]);
  REC.takeImage(RD, 1, [{ iStart: RD + '.0.1.1', width: n }, { iStart: O + '.0.1.1', width: 8 }]);
  REC.takeLinks(RD, [RL]);
  REC.takeLink({ addr: RL, from: [span(O, 3, 3)], to: [whole(FAR)], type: CITE });
  REC.takeEditionClaims(O, []);
  script[FAKE.keyOf('op', { frame: F.project(RL, 2, FAR) })] = { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + FAR_EXTENT }] } };
  LK.readers(shownText);
  REC.addEdit(RD, { pos: 1, width: 0, text: 'ab' });
  try {
    const s = /** @type {import('../links/links.js').Shown} */ (LK.shown(RD).find((x) => x.link.addr === RL));
    assert.deepEqual([s.pos, s.run && s.run.pos], [RUN + 2, RUN + 2], 'drawn at the run where the text shown holds it');
    await run(GO.leapTo(RD, { pos: RUN + 2 }));
    await run(GO.follow(s));
    await run(GO.back());
    assert.deepEqual(marks(), [{ addr: RD, pos: RUN + 2, runs: [{ pos: RUN + 2, width: 8 }], link: RL }, [RL]], 'the whole run outlined where the text shown holds it, moved once');
    assert.deepEqual(walkAt(), ['block', RD, RUN + 2], 'the walk on the run\'s item, where the text shown holds it');
  } finally { LK.readers({}); GO.endArrival(); REC.invalidate(RD); }
  assert.deepEqual(fake.unanswered, []);
});

test('the passage being read gone from a text holding typed words lands in the none state at the line kept in the text shown, its face there (FP-21; issues #515, #522)', async () => {
  setDraft(CUT, EIGHTY, [[CUT, 1, EIGHTY.length]]);
  await PUMP.loadWhole(CUT);
  await run(GO.leapTo(CUT));
  REC.addEdit(CUT, { pos: 1, width: 0, text: 'ab' });
  try {
    GO.vanished(CUT, 13, [{ prefix: CUT + '.0.1', ordinal: 11, width: 5 }]);
    assert.deepEqual([GO.landing()?.pos, GO.landing()?.floating, HOST.currentState()?.anchor], [13, true, { span: { addr: CUT, pos: 13 }, sign: CUT }], 'the landing and its face at the line kept in the text shown');
  } finally { HOST.dismiss(); REC.clearEdits(CUT); GO.endArrival(); }
  assert.deepEqual(fake.unanswered, []);
});

test('a selection below typed words a return finds part of says so with its landing on what stands of it in the text shown (FP-21, FP-36; issue #515)', async () => {
  Object.assign(script, draftReads(SETA, SETA_TEXT), noClaims(SETA));
  const platform = { window: globalThis.window }, n = SETA_TEXT.length, last = SETA_TEXT.indexOf('A last') + 1;
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  try {
    REC.invalidate(SETA);
    placeSeta([[1, n]]);
    REC.addEdit(SETA, { pos: 1, width: 0, text: 'ab' });
    await run(GO.leapTo(SETA, { pos: last }));
    SEL.select(SETA, 3, 6);
    await run(GO.leapTo(FAR));
    placeSeta([[4, n - 3]]);
    await run(GO.back()); await reopening();
    assert.deepEqual([SEL.selected(), GO.landing()?.pos, GO.landing()?.said?.state], [{ addr: SETA, pos: 3, width: 3 }, 3, 'part'], 'the selection on what stands where the text shown holds it, the landing there');
  } finally { HOST.dismiss(); SEL.clear(); GO.endArrival(); REC.clearEdits(SETA); REC.invalidate(SETA); globalThis.window = platform.window; }
  assert.deepEqual(fake.unanswered, []);
});

test('a selection below typed words a return finds none of lands in the none state at the place it stood in the text shown, the dead end\'s face there (FP-21, FP-36; issues #515, #522)', async () => {
  Object.assign(script, draftReads(SETA, SETA_TEXT), noClaims(SETA));
  const platform = { window: globalThis.window }, n = SETA_TEXT.length, last = SETA_TEXT.indexOf('A last') + 1, opening = 'A note set again.\n\n'.length;
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  try {
    REC.invalidate(SETA);
    placeSeta([[1, n]]);
    REC.addEdit(SETA, { pos: 1, width: 0, text: 'ab' });
    await run(GO.leapTo(SETA, { pos: last }));
    SEL.select(SETA, 3, 6);
    await run(GO.leapTo(FAR));
    placeSeta([[opening + 1, n - opening]]);
    await run(GO.back()); await reopening();
    assert.deepEqual([SEL.selected(), GO.landing()?.pos, GO.landing()?.floating, faceShown()?.id], [null, 3, true, 'face:floating'], 'nothing selected, the landing at the place the selection stood in the text shown, the dead end\'s face');
  } finally { HOST.dismiss(); SEL.clear(); GO.endArrival(); REC.clearEdits(SETA); REC.invalidate(SETA); globalThis.window = platform.window; }
  assert.deepEqual(fake.unanswered, []);
});

/** CUT read whole as its own text, the walk and the camera at its tenth paragraph, and that paragraph */
async function atTenth() {
  setDraft(CUT, EIGHTY, [[CUT, 1, EIGHTY.length]]);
  await PUMP.loadWhole(CUT);
  const at = REC.doc(CUT).blocks[9];
  await run(GO.leapTo(CUT, { pos: at.pos }));
  return at;
}

test('Back to a line of typed and delivered words lands on that line: the view read it by all of its bytes, the page\'s own beside the board\'s, and more typed above it while away moves the return with it (issue #523)', async () => {
  const at = await atTenth(), k = INSERTED.length;
  REC.addEdit(CUT, { pos: at.pos, width: 0, text: 'Typed ' });
  try {
    CAM.set(framed(CUT, at.pos));
    const r = LAYER.readAt(CAM.view()), page = /** @type {number} */ (REC.edits(CUT)[0].page);
    assert.deepEqual(r && [r.pos, r.ids.slice(0, 2)], [at.pos, [{ prefix: REC.pageSpace(CUT), ordinal: page, width: 6 }, { prefix: CUT + '.0.1', ordinal: at.pos, width: /** @type {number} */ (r?.width) - 6 }]], 'the line read is named whole: its typed words by the page\'s identity, then its delivered ones');
    await run(GO.leapTo(FAR));
    REC.addEdit(CUT, { pos: 1, width: 0, text: INSERTED });
    await run(GO.back());
    assert.deepEqual([under(CUT, CAM.view()).pos, walkAt(), GO.landing(), faceShown()], [at.pos + k, ['block', CUT, at.pos + k], null, null], 'the return lands on the same line where it stands now, never at the number it had, nothing said');
    assert.equal(REC.textOf(LAYER.shownOf(CUT).runs, at.pos + k, at.pos + k + 12), 'Typed Line 1', 'the line of typed and delivered words');
  } finally { REC.clearEdits(CUT); }
  assert.deepEqual(fake.unanswered, []);
});

test('a card stays on its words as the reader types above them: its anchor and what it is about move with its span\'s bytes, nothing asked again, and its act names those words where they stand as it is made (issue #519; FP-36)', async () => {
  const at = await atTenth(), text = 'Line 10', k = 'Typed above. '.length;
  Object.assign(script, { [FAKE.keyOf('op', { frame: F.showOrigin(CUT, at.pos, text.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: [FAR] } } });
  try {
    await PROV.wrote(CUT, at.pos, text.length);
    const o = HOST.currentState(), asked = fake.asked.length;
    assert.deepEqual([o?.id, o?.anchor, subjectAt()], ['provenance:wrote', { span: { addr: CUT, pos: at.pos, width: text.length } }, [at.pos, text.length]], 'the card over "Line 10"');
    GO.surfacesAcross();
    REC.addEdit(CUT, { pos: 1, width: 0, text: 'Typed above. ' });
    GO.surfacesAcross();
    assert.deepEqual([HOST.currentState() === o, HOST.currentState()?.anchor, subjectAt(), fake.asked.length], [true, { span: { addr: CUT, pos: at.pos + k, width: text.length } }, [at.pos + k, text.length], asked], 'typed above it: the same card, standing at its words where they are now, nothing read again');
    assert.equal(REC.textOf(LAYER.shownOf(CUT).runs, at.pos + k, at.pos + k + text.length), text, 'its words');
    // its act — the LEAP to the origin carrying the passage — names the words where they stand now, by their bytes
    const leap = /** @type {import('../overlays/host.js').Act} */ (/** @type {Record<string, unknown>} */ (o?.acts)['src0']);
    await run(/** @type {Promise<unknown>} */ (/** @type {unknown} */ (leap(/** @type {any} */ ({}), false))));
    const departed = TRAIL.all()[TRAIL.cursorIndex() - 1];
    assert.deepEqual([TRAIL.current()?.addr, departed.step && [departed.step.kind, /** @type {{spans: unknown}} */ (departed.step).spans]], [FAR, ['carry', [{ prefix: CUT + '.0.1', ordinal: at.pos, width: text.length }]]], 'the passage carried is the card\'s own words, by identity');
  } finally { HOST.dismiss(); GO.endArrival(); REC.clearEdits(CUT); }
});

/** the span the card standing is about, by position: [pos, width] */
function subjectAt() { const a = /** @type {any} */ (HOST.currentState()?.about); return a ? [a.pos, a.width] : null; }

test('a carry from a draft holding typed words names its run to the board by the run\'s identity, never by its positions on screen: the landing\'s text is read and the run\'s bytes placed through its image, no `compare` asked by a position of the typed text (issue #521; foundations §2.3)', async () => {
  const at = await atTenth(), k = INSERTED.length, width = 'Line 10'.length;
  // the draft's tenth line, its first seven bytes transcluded from FOREIGN's — so FOREIGN holds the run, at its own positions
  setDraft(CUT, EIGHTY, [[CUT, 1, at.pos - 1], [FOREIGN, 5, width], [CUT, at.pos + width, EIGHTY.length - at.pos - width + 1]]);
  const far = 'Far words: Line 10 stands here.';
  Object.assign(script, reads(FOREIGN, far, []), { [FAKE.keyOf('op', { frame: F.image(FOREIGN, 1, far.length) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: FOREIGN + '.0.1.90', width: '11' }, { i_start: FOREIGN + '.0.1.5', width: String(width) }, { i_start: FOREIGN + '.0.1.200', width: String(far.length - 11 - width) }] } } });
  REC.addEdit(CUT, { pos: 1, width: 0, text: INSERTED });
  try {
    const run_ = { addr: CUT, pos: at.pos + k, width }, from = fake.asked.length;
    await run(GO.leapTo(FOREIGN, { how: 'leap', carry: run_, site: { span: run_ } }));
    const asked = fake.asked.slice(from);
    assert.ok(!asked.some((q) => q.includes('"op":"compare"')), `no compare asked by a position of the typed text: ${asked.filter((q) => q.includes('compare')).join(' ')}`);
    assert.deepEqual([TRAIL.current()?.addr, GO.arrivalMark()], [FOREIGN, { addr: FOREIGN, pos: 12, runs: [{ pos: 12, width }], link: null }], 'landed on the run where FOREIGN\'s text holds its bytes, outlined there');
    assert.deepEqual(TRAIL.all()[TRAIL.cursorIndex() - 1].step, { kind: 'carry', from: CUT, to: FOREIGN, spans: [{ prefix: FOREIGN + '.0.1', ordinal: 5, width }] }, 'the entry departed records the carry by the run\'s identity');
  } finally { GO.endArrival(); REC.clearEdits(CUT); REC.invalidate(FOREIGN); }
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a passage the person deleted in this session lands at the removal point with "you removed this passage" and "put back in the current text"; the put-back restores the words by their identity and is one step (issue #524; foundations §2.3)', async () => {
  const { at, r } = await leftCut();
  // the line the view read removed whole by the person's own edit, and a line typed above it
  REC.addEdit(CUT, { pos: at.pos, width: at.width, text: '' });
  REC.addEdit(CUT, { pos: 1, width: 0, text: INSERTED });
  const k = INSERTED.length, steps = () => new Set(REC.edits(CUT).map((e) => e.step)).size;
  try {
    await run(GO.back());
    const face = faceShown();
    assert.deepEqual([face?.id, face?.html.includes(t('L.removed.all')), face?.html.includes(t('B3.history.put-back')), GO.landing()?.pos, GO.landing()?.floating], ['face:removed', true, true, at.pos + k, true], 'the landing at the removal point, its face saying the person removed the passage and offering the put-back');
    assert.deepEqual([HOST.currentState()?.anchor?.span, GO.arrivalMark(), GO.described()?.words], [{ addr: CUT, pos: at.pos + k }, null, t('L.removed.all')], 'the face at the removal point, nothing outlined, the landing\'s description its words');
    const before = steps(), edits = REC.edits(CUT).length;
    /** @type {any} */ (HOST.currentState()?.acts?.a0)(/** @type {any} */ ({}), false);
    assert.deepEqual([REC.textOf(LAYER.shownOf(CUT).runs, 1, LAYER.shownOf(CUT).to), LAYER.shownIdentity(CUT, at.pos + k, r.width), steps() - before, REC.edits(CUT).length - edits], [INSERTED + EIGHTY, r.ids, 1, 1], 'put back: the words stand again where they were removed, the same bytes, as one step');
    assert.deepEqual([GO.landing(), faceShown()], [null, null], 'the landing that said they were missing is put out with its face');
  } finally { HOST.dismiss(); GO.endArrival(); REC.clearEdits(CUT); }
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a passage the person partly deleted says "only part of the passage — you removed the rest", what stands outlined and the put-back offered on the line; the put-back makes it whole (issue #524)', async () => {
  const { at, r } = await leftCut();
  // the first five bytes of the line the view read removed by the person's own edit
  REC.addEdit(CUT, { pos: at.pos, width: 5, text: '' });
  try {
    await run(GO.back());
    assert.deepEqual([GO.landingLine(), GO.offersBack(), GO.arrivalMark()?.runs, GO.landing()?.said?.state, faceShown()], [t('L.removed.part'), true, [{ pos: at.pos, width: r.width - 5 }], 'part', null], 'the line says the person removed the rest, what stands of the passage outlined');
    assert.deepEqual(LANDING.stateNow()?.acts.map((a) => [a.act, a.label]), [['back', t('B3.history.put-back')]], 'the line\'s act: put back in the current text');
    GO.landingAct('back');
    assert.deepEqual([REC.textOf(LAYER.shownOf(CUT).runs, 1, LAYER.shownOf(CUT).to), GO.landing(), GO.arrivalMark()], [EIGHTY, null, null], 'put back: the text whole again, the line gone with what it said');
  } finally { GO.endArrival(); REC.clearEdits(CUT); }
  assert.deepEqual(fake.unanswered, []);
});

test('Back to a passage another hand removed keeps the dead end\'s face as designed — no put-back, no word that the person removed it — though the draft holds the person\'s own edits elsewhere (issue #524; FP-21)', async () => {
  const { at } = await leftCut();
  const end = at.pos + at.width;
  // the board's text set again without the line; the person's own typing stands above it
  setDraft(CUT, EIGHTY.slice(0, at.pos - 1) + EIGHTY.slice(end - 1), [[CUT, 1, at.pos - 1], [CUT, end, EIGHTY.length - end + 1]]);
  REC.addEdit(CUT, { pos: 1, width: 0, text: 'ab' });
  try {
    await run(GO.back());
    const face = faceShown();
    assert.deepEqual([face?.id, face?.html.includes(t('L.removed.all')), face?.html.includes(t('B3.history.put-back')), GO.landing()?.removed ?? null, GO.offersBack()], ['face:floating', false, false, null, false], 'the dead end\'s face, as before');
  } finally { HOST.dismiss(); GO.endArrival(); REC.clearEdits(CUT); }
  assert.deepEqual(fake.unanswered, []);
});

test('an arrival ends at the person\'s first edit of the bytes it stands in — a key typed inside it — and stands through a pan, a selection and an edit elsewhere in its document, which moves it with its bytes (issue #524; FP-21)', async () => {
  const at = await atTenth(), run_ = { pos: at.pos + 5, width: 6 }, k = INSERTED.length;
  const platform = { window: globalThis.window };
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  try {
    await run(GO.leapTo(CUT, { pos: run_.pos, runs: [run_], link: PASSAGE }));
    assert.deepEqual(marks(), [{ addr: CUT, pos: run_.pos, runs: [run_], link: PASSAGE }, [PASSAGE]], 'an arrival outlined in the draft');
    CAM.panBy(0, -40); GO.recheck();
    SEL.select(CUT, 1, 4); GO.recheck(); SEL.clear();
    assert.deepEqual(marks(), [{ addr: CUT, pos: run_.pos, runs: [run_], link: PASSAGE }, [PASSAGE]], 'a pan and a selection keep it');
    REC.addEdit(CUT, { pos: 1, width: 0, text: INSERTED });
    GO.recheck();
    assert.deepEqual(marks(), [{ addr: CUT, pos: run_.pos + k, runs: [{ pos: run_.pos + k, width: 6 }], link: PASSAGE }, [PASSAGE]], 'a line typed above it keeps it too, on the same characters where they stand now');
    REC.addEdit(CUT, { pos: run_.pos + k + 2, width: 0, text: 'x' });
    GO.recheck();
    assert.deepEqual([marks(), GO.landing()], [[null, []], null], 'a key typed inside its bytes ends it: no outline, no link lit, no line');
  } finally { SEL.clear(); GO.endArrival(); REC.clearEdits(CUT); globalThis.window = platform.window; }
  assert.deepEqual(fake.unanswered, []);
});

// placed last: it attaches a mirror, which every test above runs without
test('a failure a jump\'s read learns in the air rebuilds the mirror where the walk stands: its item names the address as the board answered it, never "published" (FP-25; issue #137)', async () => {
  const mirror = { innerHTML: '', tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} } };
  WALK.attach(/** @type {any} */ (mirror));
  await run(GO.leapTo(D));
  REC.invalidate(GONE);
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(GONE) });
  const leap = GO.leapTo(GONE);
  await new Promise((r) => setTimeout(r, 0)); // the walk's levels read
  /** the mirror's item at GONE, as the last rebuild wrote it */
  const item = () => (new RegExp(`<li[^>]*data-addr="${GONE}"[^>]*>(.*?)</li>`).exec(mirror.innerHTML) || [])[1] || '';
  assert.ok(item() && !item().includes(esc(t('F.published'))) && !item().includes(esc(t('L.far.unregistered'))), `the walk on the address as the camera leaves, its state untold: ${item()}`);
  release();
  await run(leap);
  assert.ok(item().includes(esc(t('L.far.unregistered'))), `the read learned the board says nothing: the mirror rebuilt, naming it so: ${item()}`);
  assert.deepEqual(fake.unanswered, []);
});

// placed last: the death empties the model every test above reads
// ---- A TEXT SET AGAIN UNDER THE READER (FP-21, FP-36) ---------------------------------------------------------------

/** a document the tests below land in and set again, read whole on the LEAP: its own bytes, 1 to its length */
const SETA = '1.0.1.0.23', SETA_TEXT = 'A note set again.\n\nIts passage stands here.\n\nA last line.';
/** SETA set again as its reads land (M-REC's `setAgain`): its text and its image, each run `[ordinal, width]` of SETA's own I-space */
const setSeta = (/** @type {string} */ text, /** @type {Array<[number, number]>} */ image) => REC.setAgain(SETA, {
  spans: [{ subspace: 1, ordinal: 1, positions: text.length }], text: { runs: [{ pos: 1, width: text.length, kind: 'content', text, ref: null, origin: null }], asOf: 9 },
  image: { from: 1, runs: image.map(([ordinal, width]) => ({ iStart: `${SETA}.0.1.${ordinal}`, width })) },
});
/** SETA set again as its image places SETA's own bytes, each run `[ordinal, width]`: its text those bytes' words in that order, a run of bytes minted since — past SETA_TEXT's own — the words `minted` */
const placeSeta = (/** @type {Array<[number, number]>} */ image, minted = '') => setSeta(image.map(([ordinal, width]) => (ordinal > SETA_TEXT.length ? minted : SETA_TEXT.slice(ordinal - 1, ordinal - 1 + width))).join(''), image);
/** SETA set again as its own text, and a LEAP to it naming its passage "Its passage" by identity, as the gate's door names it: the passage outlined in one piece at 20, nothing said */
async function leapToSeta() {
  const at = SETA_TEXT.indexOf('Its passage') + 1, width = 'Its passage'.length;
  Object.assign(script, reads(SETA, SETA_TEXT, []), noClaims(SETA));
  placeSeta([[1, SETA_TEXT.length]]);
  await run(GO.leapTo(SETA, { pos: at, runs: [{ pos: at, width }], passage: { prefix: SETA + '.0.1', ordinal: at, width }, how: 'leap' }));
  assert.deepEqual([GO.arrivalMark(), GO.landing()], [{ addr: SETA, pos: 20, runs: [{ pos: 20, width: 11 }], link: null }, null], 'the passage outlined in one piece, nothing said');
}

test('an arrival whose document\'s text is set again is placed again by its passage\'s bytes (the landing rule): all of them standing, the outline moves with them; part, the outline on what stands and the landing\'s line saying only part of the passage is there; none, nothing outlined and the dead end\'s face at the landing\'s place (FP-21; issue #285)', async () => {
  Object.assign(script, reads(SETA, SETA_TEXT, []), noClaims(SETA));
  const at = SETA_TEXT.indexOf('Its passage') + 1, width = 'Its passage'.length, n = SETA_TEXT.length;
  try {
    await run(GO.leapTo(SETA, { pos: at, runs: [{ pos: at, width }], passage: { prefix: SETA + '.0.1', ordinal: at, width }, how: 'leap' }));
    assert.deepEqual(GO.arrivalMark(), { addr: SETA, pos: at, runs: [{ pos: at, width }], link: null }, 'the passage outlined where the LEAP named it');
    // twelve bytes minted since set before the text: every byte of it twelve on
    setSeta('A new lead.\n' + SETA_TEXT, [[n + 1, 12], [1, n]]);
    assert.deepEqual(GO.arrivalMark(), { addr: SETA, pos: at + 12, runs: [{ pos: at + 12, width }], link: null }, 'placed again by its bytes at once, never left on the positions it stood at');
    GO.recheck();
    assert.deepEqual([GO.landing(), faceShown()], [null, null], 'all of it in one piece: the outline alone says it');
    // the passage's last five bytes gone
    setSeta(SETA_TEXT.slice(0, at + width - 6) + SETA_TEXT.slice(at + width - 1), [[1, at + width - 6], [at + width, n - at - width + 1]]);
    GO.recheck();
    assert.deepEqual(GO.arrivalMark()?.runs, [{ pos: at, width: width - 5 }], 'part: the outline on what stands');
    assert.deepEqual([GO.landing()?.said?.state, GO.landingLine()], ['part', t('L.held.part', { subject: t('L.held.reading'), where: t('L.held.current', { D: SETA }) })], 'and the line says only part of it is there');
    // none of it: the text set again of bytes minted since
    setSeta('Other words.', [[n + 20, 12]]);
    GO.recheck();
    const f = faceShown();
    assert.deepEqual([GO.arrivalMark(), GO.landing()?.floating, f?.id], [null, true, 'face:floating'], 'none: nothing outlined, the dead end\'s face');
    assert.ok(f && f.html.includes(addressedHTML(t('F.floating', { D: SETA }))) && HOST.currentState()?.anchor?.span?.addr === SETA, `its words, at the landing's place: ${f && f.html}`);
    GO.recheck();
    assert.equal(faceShown()?.id, 'face:floating', 'once for each setting of the text');
  } finally { GO.endArrival(); HOST.dismiss(); }
});

test('an arrival whose text is set again holding its passage\'s opening twice — side by side, or apart — is read again by its bytes, never by its runs\' widths: part of the passage, a run for each opening, labelled "again later" and "again" (FP-21; issue #359)', async () => {
  const again = [t('L.piece.again-later'), t('L.piece.again')], words = again[0] + ' · ' + t('L.piece.part');
  try {
    await leapToSeta();
    placeSeta([[1, 25], [20, 6], [31, 27]]);
    assert.deepEqual(GO.arrivalMark()?.runs, [{ pos: 20, width: 6 }, { pos: 26, width: 6 }], 'placed again at once by its bytes, before its re-check: a run for each opening');
    GO.recheck();
    assert.deepEqual(GO.arrivalMark(), { addr: SETA, pos: 20, runs: [{ pos: 20, width: 6 }, { pos: 26, width: 6 }], link: null }, 'side by side: a run for each opening, never one run over both');
    assert.deepEqual([GO.landing()?.said?.state, GO.landingLine(), GO.described()?.runs.map((r) => r.words)], ['part', words, again], 'part of the passage, each run labelled, the landing at the first: never all of it in one piece');
    placeSeta([[1, 25], [31, 13], [20, 6], [44, 14]]);
    GO.recheck();
    assert.deepEqual(GO.arrivalMark()?.runs, [{ pos: 20, width: 6 }, { pos: 39, width: 6 }], 'apart: a run for each opening');
    assert.deepEqual([GO.landing()?.said?.state, GO.landingLine()], ['part', words], 'part of the passage: never all of it in pieces');
  } finally { GO.endArrival(); HOST.dismiss(); }
});

test('an arrival in several runs whose text is set again keeps its runs\' labels and the run it stands at, found by the byte it stood on: its passage\'s halves swapped side by side, two pieces "in another order", the landing at piece 1 and the step taking it to piece 2; a paragraph then set before them, the landing still at piece 2 where it stands now, the step still offered (FP-21; issue #359)', async () => {
  const swapped = /** @type {Array<[number, number]>} */ ([[1, 19], [25, 6], [20, 5], [31, 27]]), lead = 'A new lead.\n', k = lead.length;
  const piece = (/** @type {number} */ which) => [t('L.piece', { k: which, n: 2 }), t('L.piece.all'), t('L.piece.order')].join(' · ');
  try {
    await leapToSeta();
    placeSeta(swapped);
    GO.recheck();
    assert.deepEqual(GO.arrivalMark(), { addr: SETA, pos: 26, runs: [{ pos: 20, width: 6 }, { pos: 26, width: 5 }], link: null }, 'a run for each half, the landing at the first half: never one run over both');
    assert.deepEqual([GO.landing()?.said?.state, GO.landingLine(), GO.steps()], ['pieces', piece(1), true], 'all of it in two pieces in another order, the line piece 1\'s, the step offered');
    assert.equal(GO.step(1), true);
    await stepped();
    assert.deepEqual([GO.landing()?.pos, GO.arrivalMark()?.pos, GO.landingLine()], [20, 20, piece(2)], 'the step: piece 2');
    placeSeta([[SETA_TEXT.length + 1, k], ...swapped], lead);
    GO.recheck();
    assert.deepEqual(GO.arrivalMark(), { addr: SETA, pos: 20 + k, runs: [{ pos: 20 + k, width: 6 }, { pos: 26 + k, width: 5 }], link: null }, 'a paragraph set before them: both runs where they stand now, the landing at piece 2');
    assert.deepEqual([GO.landing()?.pos, GO.landing()?.current, GO.landingLine(), GO.steps()], [20 + k, 0, piece(2), true], 'its line piece 2\'s, the step still offered');
  } finally { GO.endArrival(); HOST.dismiss(); }
});

test('the passage being read gone from the text its document is set again as lands in place in the none state: the dead end\'s face at the line kept, said in the status region, no camera move and no trail entry, the arrival standing elsewhere put out; where a surface of the reader\'s stands it takes nothing\'s place, its words said alone (FP-21, FP-36; issue #285)', async () => {
  /** @type {string[]} the status region, as it was told */
  const said = [];
  FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() {}, set textContent(/** @type {string} */ v) { said.push(v); } }) });
  try {
    await run(GO.follow(drawn(PASSAGE)));
    assert.deepEqual(marks(), [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE }, [PASSAGE]], 'an arrival standing at FAR');
    const view = CAM.view(), entries = TRAIL.all().length;
    GO.vanished(D, 11, [{ prefix: D + '.0.1', ordinal: 11, width: 5 }]);
    const f = faceShown();
    assert.ok(f && f.id === 'face:floating' && f.html.includes(addressedHTML(t('F.floating', { D }))), `the dead end's face, naming the document set again: ${f && f.html}`);
    assert.deepEqual([HOST.currentState()?.anchor, HOST.currentState()?.told], [{ span: { addr: D, pos: 11 }, sign: D }, false], 'at the line kept, said in the status region');
    assert.deepEqual([GO.arrivalMark(), GO.litLinks(), GO.landing()?.addr, GO.landing()?.floating], [null, [], D, true], 'the arrival at FAR put out; a landing in the none state at the document set again');
    assert.ok(same(CAM.view(), view) && TRAIL.all().length === entries, 'no camera move and no trail entry');
    HOST.dismiss();
    // a card of the reader's standing: it stands, the face's words said alone
    HOST.show({ kind: 'card', id: 'card:standing', html: '' });
    GO.vanished(D, 11, [{ prefix: D + '.0.1', ordinal: 11, width: 5 }]);
    assert.deepEqual([HOST.currentState()?.id, said[said.length - 1]], ['card:standing', t('F.floating', { D })], 'the card stands; the words said in the status region');
  } finally { HOST.dismiss(); GO.endArrival(); }
});

test('a change of the page\'s class (issue #177: "Keep every place, and cover the material"): the arrival goes — its outline, its labels, its line, its descriptions — and no entry keeps it or a notice, so Back and Forward restore none of it; no entry holds a document\'s words, each read from the model as it is shown — nothing for the draft the session read until a read answers it, then "[withheld · ⟨owner⟩]" — and Back to the draft\'s entry reads it first, then lands on its covered box framed whole, the walk on it and its withheld face there, offering the sign-in in the ending\'s words; once covered, the face at once', async () => {
  const DR = '1.0.1.0.21', DR_TEXT = 'The draft the session reads.\n\nIts second paragraph.';
  const platform = { getElementById: globalThis.document.getElementById };
  /** @type {any} */ (globalThis.document).getElementById = () => null;
  Object.assign(script, reads(DR, DR_TEXT, []));
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }, { doc: FAR, kind: 'edition', label: 'far', standing: 'public' }, { doc: DR, kind: 'draft', label: 'the draft', standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 3 }], state: { arm: 'complete' } }));
  takeSplit();
  /** the trail list's rows as the host wrote them */
  const listed = () => { TRAILLIST.open(); const html = hostEl.innerHTML; HOST.dismiss(); return html; };
  /** the words the trail shows for an address's newest entry */
  const wordsAt = (/** @type {string} */ addr) => { const e = [...TRAIL.all()].reverse().find((x) => x.addr === addr); return e ? GO.wordsOf(e) : null; };
  try {
    await run(GO.home());
    assert.equal(GO.wordsOf(/** @type {import('./trail.js').Entry} */ (TRAIL.current())), t('F.level.home'), 'HOME\'s entry its act\'s name, the strings table\'s');
    await run(GO.leapTo(DR));
    await run(GO.leapTo(D));
    await run(GO.follow(drawn(SPLIT)));
    assert.ok(GO.landing() && GO.landingLine() && GO.described() && GO.arrivalMark(), 'the follow landed: its outline, its labels, its line');
    assert.deepEqual([wordsAt(DR), TRAIL.all().every((e) => e.label == null || [t('F.level.home'), t('L.whole-board')].includes(e.label))], ['The draft the session reads. · ' + t('F.label.draft'), true], 'the draft\'s entry read from the model as its box\'s first line — its own text\'s, which the model holds; no entry keeps a document\'s words, HOME\'s and WHOLE BOARD\'s their act\'s name alone');
    assert.ok(listed().includes('The draft the session reads.'), 'the trail list names the draft while the session reads it');
    // the session ends: the class changes in the model, then the app tells N-GO, as M-PUMP tells it; the guest may not read the draft
    script[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(DR) })] = { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } };
    script[FAKE.keyOf('op', { frame: F.editionClaimsAt(DR) })] = { result: { as_of: 1, resp: 'addrs', addrs: [] } };
    REC.sessionDied({ arm: 'closed' });
    GO.classChanged();
    assert.deepEqual([GO.landing(), GO.landingLine(), GO.described(), GO.arrivalMark(), GO.litLinks()], [null, null, null, null, []], 'the arrival gone: nothing the dead session measured drawn or described');
    assert.ok(TRAIL.all().every((e) => e.kept === null && e.notice === null), 'no entry keeps an arrival or a notice');
    assert.deepEqual([wordsAt(DR), listed().includes('The draft the session reads.')], ['', false], 'nothing answered of the draft yet: its entry says nothing, never its first line');
    await run(GO.back());
    assert.deepEqual([TRAIL.current()?.addr, GO.landing(), GO.described()], [D, null, null], 'Back to D: nothing restored');
    const asks = () => fake.asked.filter((k) => k === FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(DR) })).length, before = asks();
    await run(GO.back());
    const covered = t('L.client-words', { words: t('F.corner.withheld', { owner: '1.0.1' }) });
    assert.deepEqual([asks() - before, REC.covered(DR), TRAIL.current()?.addr], [1, true, DR], 'Back to the draft\'s entry reads it first: covered');
    assert.ok(HOST.currentIs('face:withheld') && hostEl.innerHTML.includes(esc(t('C-137.signed-out'))) && hostEl.innerHTML.includes(esc(t('F.sign-in'))) && !hostEl.innerHTML.includes('class="clause"'), `its withheld face there, the ending's words, no clause where the claims read at the guest's class decide none, and the sign-in its act: ${hostEl.innerHTML}`);
    assert.deepEqual([walkAt(), same(CAM.view(), GO.viewFor(DR, null))], [['document', DR, null], true], 'the walk on the covered draft, its box framed whole');
    assert.deepEqual([wordsAt(DR), listed().includes(tHTML('F.corner.withheld', { owner: '1.0.1' }, { owner: 'id' }))], [covered, true], 'its entry\'s words the cover\'s, bracketed, in the trail list too, its owner in the identifier\'s face');
    await run(GO.forward());
    await run(GO.forward());
    assert.deepEqual([TRAIL.current()?.addr, GO.landing(), GO.described(), GO.landingLine()], [FAR, null, null, null], 'Forward to the follow\'s entry: its arrival restored by none');
    await run(GO.back());
    await run(GO.back());
    assert.deepEqual([asks() - before, HOST.currentIs('face:withheld'), walkAt()], [1, true, ['document', DR, null]], 'covered already: the face at once, nothing read again');
  } finally {
    /** @type {any} */ (globalThis.document).getElementById = platform.getElementById;
    HOST.dismiss();
    REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  }
});

test('a return to a failed jump\'s entry a change of the page\'s class left holding no notice asks its read again at the new class (issue #228\'s design decision: "Returning to it asks again"; FP-29): the fifth cell where its camera went, in the board\'s words for a LEAP and in the far end\'s where a follow met the address', async () => {
  /** @type {Array<[string, () => Promise<unknown>, boolean]>} each jump whose read learns in the air that the board says nothing of GONE, and whether a follow made it */
  const jumps = [['a LEAP', () => GO.leapTo(GONE), false], ['a follow of a dead reference', () => GO.follow(drawn(DEAD)), true]];
  const was = fake.unanswered.length;
  try {
    for (const [what, jump, far] of jumps) {
      REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
      await run(GO.leapTo(D));
      takeDead();
      REC.invalidate(GONE);
      await run(jump());
      assert.deepEqual([faceShown()?.id, TRAIL.current()?.notice?.far ?? false], ['face:doc_not_registered', far], `${what}: learned in the air`);
      await run(GO.leapTo(FAR));
      REC.sessionDied({ arm: 'closed' });
      GO.classChanged();
      assert.equal(TRAIL.all()[TRAIL.cursorIndex() - 1].notice, null, `${what}: the change of class dropped the entry's notice`);
      const asked = extentAsks(GONE);
      await run(GO.back());
      const words = far ? LK.emptyAt(GONE).whole[0].text : t('B1.doc_not_registered', { address: GONE });
      assert.deepEqual([TRAIL.current()?.addr, extentAsks(GONE) - asked, faceShown()?.id, HOST.currentState()?.anchor, TRAIL.current()?.notice?.far ?? false], [GONE, 1, 'face:doc_not_registered', { span: { addr: GONE, pos: 1 }, sign: GONE }, far],
        `${what}: Back asks the read again at the new class, the fifth cell where the camera went, the entry holding it`);
      assert.ok(hostEl.innerHTML.includes(addressedHTML(words)), `${what}: in ${far ? 'the far end\'s' : 'the board\'s'} words: ${hostEl.innerHTML}`);
      HOST.dismiss();
    }
  } finally {
    HOST.dismiss();
    REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  }
  assert.equal(fake.unanswered.length, was, 'nothing asked the script does not answer');
});

test('where no board is held the launch names no place — no trail entry, the walk on its root — and every act that needs a board answers where it is taken: a LEAP, HOME, WHOLE BOARD, an account\'s region, and from the plane the walk\'s keys, K-8, the selection\'s chords and the strip, each with the no-board face — why, and "try again" where a retry may tell — making no entry, no flight and no read; the paging key stays the camera\'s; a walk\'s moment unfolded flies the camera alone, pushing nothing (issue #215\'s design decision: "an act that needs a board the reader lacks answers where it is taken and names what still works … None stays silent"; FP-35)', async () => {
  const was = { board: REC.board(), session: REC.session() };
  /** a key as the platform hands it: the command modifier the platform's (D5 §0) */
  const key = (/** @type {string} */ k, /** @type {{mod?: boolean, shift?: boolean}} */ o = {}) => /** @type {any} */ ({ key: k, metaKey: !!o.mod && KEYS.MAC, ctrlKey: !!o.mod && !KEYS.MAC, shiftKey: !!o.shift, altKey: false, isComposing: false, keyCode: 0, preventDefault() {}, target: { closest: () => null } });
  try {
    HOST.dismiss();
    REC.setSession(null);
    REC.takeBoards({ refused: { kind: 'unreachable', name: 'unreachable', text: 'refused' } });
    TRAIL._reset();
    await GO.launch();
    assert.deepEqual([TRAIL.all().length, walkAt()], [0, ['board', '1', null]], 'the launch: no entry pushed, the walk on its root');
    const asked = fake.asked.length, at = CAM.view();
    /** each act that needs a board, made where it is made */
    const acts = /** @type {Array<[string, () => Promise<unknown>]>} */ ([
      ['a LEAP', () => GO.leapTo(D, { how: 'leap', site: { world: { x: 1, y: 2 } } })],
      ['HOME', () => GO.home(true)],
      ['WHOLE BOARD', () => GO.wholeBoard(true)],
      ['an account\'s region', () => GO.toAccount('1.0.1', true)],
      ...[['↓', key('ArrowDown')], ['→', key('ArrowRight')], ['Home', key('Home')], ['Enter', key('Enter')], ['Shift+↓', key('ArrowDown', { shift: true })],
        ['Mod+Shift+O', key('O', { mod: true, shift: true })], ['Mod+Shift+L', key('L', { mod: true, shift: true })], ['Mod+Enter', key('Enter', { mod: true })], ['Mod+Shift+P', key('P', { mod: true, shift: true })],
        ['Mod+Shift+H', key('H', { mod: true, shift: true })], ['Mod+0', key('0', { mod: true })]]
        .map(([what, e]) => /** @type {[string, () => Promise<unknown>]} */ ([`the key ${what}`, async () => { assert.equal(await KEYS.dispatch(e, { where: 'plane', byKey: true }), true, `${what}: taken`); }])),
    ]);
    for (const [what, act] of acts) {
      HOST.dismiss();
      await run(act());
      const f = faceShown();
      assert.equal(f?.id, 'face:no-board', `${what}: answered with the no-board face`);
      assert.ok(f && f.html.includes(`data-string="L.boards-unread">${esc(t('L.boards-unread'))}</div>`) && f.html.includes(`>${esc(t('B1.try-again'))}</button>`), `${what}: why, and "try again": ${f && f.html}`);
      assert.deepEqual([TRAIL.all().length, CAM.flying(), same(CAM.view(), at), fake.asked.length - asked], [0, false, true, 0], `${what}: no entry, no flight, no read`);
    }
    HOST.dismiss();
    await run(GO.leapTo(D, { how: 'leap', site: { world: { x: 1, y: 2 } } }));
    assert.deepEqual(HOST.currentState()?.anchor, { world: { x: 1, y: 2 } }, 'a LEAP\'s face stands at the act\'s site');
    HOST.dismiss();
    assert.equal(await KEYS.dispatch(key('PageDown'), { where: 'plane', byKey: true }), true);
    assert.deepEqual([HOST.currentState(), same(CAM.view(), at)], [null, false], 'PageDown: the camera paged, no face');
    const back = { ...at, x: at.x + 1000 };
    await run(GO.toView({ addr: '1', view: back }));
    assert.deepEqual([TRAIL.all().length, same(CAM.view(), back), walkAt()], [0, true, ['board', '1', null]], 'a moment\'s unfold: the camera alone brought back, no entry, the walk where it stood');
  } finally {
    HOST.dismiss();
    REC.setBoard(was.board); REC.setSession(was.session);
  }
});
