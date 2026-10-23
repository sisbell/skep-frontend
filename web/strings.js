// ST — the copy: every person-facing string the page shows (the structure
// record §3.2 "ST"; S-26 (a) one module). Layer: a leaf. PURE.
// Each entry is PINNED — ruled wording, verbatim from its authority, cited
// by its `ux/copy.md` id (`C-n`) or by the requirement that pins it — or
// DRAFT, a string a design document drafted (its source and the screen
// named), or a string THIS LANE NEEDED and the inventory lacks (`lane:
// true`, reported). The page invents no wording: a `lane` string is a
// placeholder for the copy refresh (rl-5) and is listed in the report.
// Carries: the wireframe's §3 constants (`R56_KEY_ABSENT_ARM`,
// `C67_POINTER`, `CHIP_FLAG_ON` — the last superseded by C-28's form) and
// the literals of its §15, §16, §18.
// Rules: FP-1, FP-2, FP-13 (controls read their words here, never inline).
// The gate's `cases/text.py` compares every PINNED entry to its source at
// the design repository's HEAD.

import { fill } from './util.js';
import { commonsType } from './model/address.js';

/**
 * @typedef {Object} StringEntry
 * @property {string} text the string, with its ⟨tokens⟩
 * @property {'PINNED' | 'DRAFT'} cls
 * @property {string} source the design file that carries it (`ux/copy.md`, `requirements.md`, `designs/foundations.md`, `designs/B1-reader.md`, `designs/D5-keys.md`), or `''` where none does
 * @property {string} [screen] the screen that needed it (DRAFT)
 * @property {boolean} [lane] true where no design document carries the string — the lane's placeholder, reported
 */

/** @type {Record<string, StringEntry>} */
export const STRINGS = {
  // ---- PINNED: ux/copy.md -------------------------------------------------
  'C-28': { text: 'Readable by you alone', cls: 'PINNED', source: 'ux/copy.md' },
  'C-28.flag-on': { text: 'Readable by you + this machine.', cls: 'PINNED', source: 'ux/copy.md' },
  'C-28.n': { text: 'Readable by ⟨N⟩', cls: 'PINNED', source: 'ux/copy.md' },
  'C-28.n.flag-on': { text: 'Readable by ⟨N⟩ + this machine', cls: 'PINNED', source: 'ux/copy.md' },
  'C-29': { text: 'others can see that this exists, roughly when, and who can read it; not what it says', cls: 'PINNED', source: 'ux/copy.md' },
  'C-33': { text: 'visible to you; withheld for others.', cls: 'PINNED', source: 'ux/copy.md' },
  'C-33.owner': { text: 'visible to you; withheld for others — an edition of this passage is published: re-window it as your next version to fill the hole for others', cls: 'PINNED', source: 'ux/copy.md' },
  'C-34': { text: 'published — the world reads this passage at ⟨E⟩', cls: 'PINNED', source: 'ux/copy.md' },
  'C-36.universal.key': { text: 'readable to any account — sign in', cls: 'PINNED', source: 'ux/copy.md' },
  'C-36.universal.nokey': { text: 'readable to any account; you have no account on this board — an account here is this board\'s admission to give; ask ⟨owner⟩', cls: 'PINNED', source: 'ux/copy.md' },
  'C-36.guest.key': { text: 'readable to accounts the owner grants; you are reading as a guest — sign in, then ask — nothing here says whether they will', cls: 'PINNED', source: 'ux/copy.md' },
  'C-36.guest.nokey': { text: 'you have no account on this board — an account here is this board\'s admission to give, and access to this document is ⟨owner⟩\'s to grant; nothing here says whether either will; ask ⟨owner⟩', cls: 'PINNED', source: 'ux/copy.md' },
  'C-36.no-grant': { text: 'no access can be given on this board', cls: 'PINNED', source: 'ux/copy.md' },
  'C-36.revoked': { text: 'access to this document was withdrawn by ⟨owner⟩', cls: 'PINNED', source: 'ux/copy.md' },
  'C-36.revoked.2': { text: 'asking ⟨owner⟩ again is your act; nothing here says whether they will.', cls: 'PINNED', source: 'ux/copy.md' },
  'C-36.owner-grant': { text: 'readable only if the owner grants access; a published edition may exist — follow the edition claim', cls: 'PINNED', source: 'ux/copy.md' },
  'C-36.owner-grant.arm': { text: 'readable only if the owner grants access', cls: 'PINNED', source: 'ux/copy.md' },
  'C-37': { text: 'this passage is held on another board — nothing here can give you access to it; follow ⟨origin⟩ to the board that holds it, where your access is that board\'s to answer', cls: 'PINNED', source: 'ux/copy.md' },
  'C-38': { text: 'the owner may be gone; this hole may be permanent', cls: 'PINNED', source: 'ux/copy.md' },
  'C-39': { text: 'an address inside ⟨owner⟩\'s withheld document; whether a link occupies it is withheld with it', cls: 'PINNED', source: 'ux/copy.md' },
  'C-45': { text: '⟨D⟩ is published — it advances by versions. Stage your change in a draft, then publish it as the next version.', cls: 'PINNED', source: 'ux/copy.md' },
  'C-67.pointer': { text: 'a published edition may exist — follow the edition claim', cls: 'PINNED', source: 'ux/copy.md' },
  'C-67.quoting': { text: '⟨claimant⟩ quotes this draft; nothing published carries its bytes', cls: 'PINNED', source: 'ux/copy.md' },
  'C-134.widening': { text: 'local index built before sign-in — widening', cls: 'PINNED', source: 'ux/copy.md' },
  'C-134.complete': { text: 'complete as of this class', cls: 'PINNED', source: 'ux/copy.md' },
  'C-135': { text: 'key absent AT THIS ADDRESS', cls: 'PINNED', source: 'ux/copy.md' },
  'C-136': { text: 'if another device of yours is signed in — enroll this browser from it; otherwise — import a paper anchor', cls: 'PINNED', source: 'ux/copy.md' },
  'C-137.self': { text: 'sign in with the new key', cls: 'PINNED', source: 'ux/copy.md' },
  'C-137.mode': { text: 'this board now requires a signed session', cls: 'PINNED', source: 'ux/copy.md' },
  'C-137.signed-out': { text: 'signed out', cls: 'PINNED', source: 'ux/copy.md' },
  'C-138.busy': { text: 'the board did not accept the sign-in — it may be busy; try again', cls: 'PINNED', source: 'ux/copy.md' },
  'C-138.not-owner': { text: 'principal N is not a registered account on this board', cls: 'PINNED', source: 'ux/copy.md' },
  // ---- PINNED: requirements.md (R56's own words, R59's two floor strings) and R5's form
  'R56.key-absent': { text: 'no key on this device opens an account on this board — if you have one, sign in from the device that holds its key or enroll this one; if not, an account here is this board\'s admission to give, and access to this document is ⟨owner⟩\'s to grant; nothing here says whether either will; ask ⟨owner⟩', cls: 'PINNED', source: 'requirements.md' },
  'R59.floor.org': { text: 'published here; this org, or the host that runs this board for it, is not serving these bytes', cls: 'PINNED', source: 'requirements.md' },
  'R59.floor.notebook': { text: 'published here; this notebook\'s owner is not serving these bytes', cls: 'PINNED', source: 'requirements.md' },
  'R5.undocumented': { text: 'link of type ⟨T⟩ — undocumented here', cls: 'PINNED', source: 'requirements.md' },

  // ---- DRAFT: designs/B1-reader.md (B1-F6's twenty, by number) ---------------
  'B1.scan_busy': { text: 'this directory is busy — reissuing', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'B1.endsets_too_large': { text: 'too many link ends here to show at once — narrow the selection', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'B1.not_a_link': { text: 'no link at this address — or none you may see', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'B1.range_not_present': { text: 'that passage is no longer at this place — the text moved', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S6' },
  'B1.too_many_blocks': { text: 'compare in parts', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S9' },
  'B1.too_many_pairs': { text: 'too much is shared to show at once — compare in parts', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S9' },
  'B1.too_much_coverage': { text: 'ask over a smaller selection', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S10' },
  'B1.empty_subspace': { text: 'nothing here yet', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S13' },
  'B1.doc_not_registered': { text: '⟨address⟩ — nothing this board will say about this address; whether a document exists, is published or is being withheld, nothing here asserts', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S8' },
  'B1.invalid': { text: 'no such link or slot', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S6' },
  'B1.unreachable': { text: '⟨address⟩ — the node ⟨node⟩ is not answering; the address is real', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S8' },
  'B1.try-again': { text: 'try again', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S8' },
  'B1.unregistered': { text: '⟨prefix⟩ — an unregistered prefix; unknown is a visible state', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S8' },
  'B1.C-72': { text: 'named here: the documents you can read whose arrangement holds this passage; a copy pasted as fresh bytes, and any document you may not read, are not counted', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S10' },
  'B1.guest-line': { text: 'reading as a guest', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S1' },
  'B1.state-line': { text: 'published · the bare address, at its latest version', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S1' },
  'B1.others-toggle': { text: 'others\' links: ⟨state⟩ · ⟨n⟩ touch this document', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'B1.others-toggle.1': { text: 'others\' links: ⟨state⟩ · 1 touches this document', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'B1.presence': { text: '⟨n⟩ links touch this document', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S1' },
  'B1.presence.1': { text: '1 link touches this document', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S1' },
  'B1.clamp': { text: 'the whole board is in view', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S3' },
  'B1.scene-offer': { text: 'this document windows ⟨D⟩ — read them side by side?', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S9' },
  'B1.wrote': { text: 'written by ⟨owner⟩ (⟨account⟩) at ⟨origin⟩ — the same material as its source, one gesture to it', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S10' },
  'B1.wrote.here': { text: 'written by ⟨owner⟩ (⟨account⟩) at ⟨origin⟩ — its origin', cls: 'DRAFT', source: 'designs/plane.js', screen: 'B1-S10' },
  'B1.uses': { text: 'used by ⟨documents⟩', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S10' },
  'B1.uses.none': { text: 'used by no document you can read', cls: 'DRAFT', source: 'designs/plane.js', screen: 'B1-S10' },
  'B1.leap-placeholder': { text: 'type an address', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S11' },
  'B1.who-wrote': { text: 'who wrote this?', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S10' },
  'B1.who-uses': { text: 'who uses this?', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S10' },
  'B1.see-links': { text: 'see the links', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'B1.follow': { text: 'follow', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S6' },
  'B1.side-by-side': { text: 'read side by side', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S9' },
  'B1.show-more': { text: 'show more', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'B1.withheld-box': { text: '⟨owner⟩ · withheld', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S2' },
  'B1.withheld-run': { text: 'withheld · ⟨owner⟩ (⟨account⟩) · ⟨width⟩ positions · origin ⟨origin⟩', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S7' },

  // ---- DRAFT: designs/foundations.md ----------------------------------------
  'F.acting-as': { text: 'acting as ⟨account⟩ (principal ⟨N⟩) · ⟨device label⟩ · key present on this device · ⟨origin⟩ · LOCAL notebook', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line, state 2' },
  'F.keyless-session': { text: 'reading as ⟨account⟩ with no key — local trust; writing needs your key · on your LOCAL notebook · ⟨origin⟩', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line, state 3' },
  'F.venue.notebook': { text: 'LOCAL notebook', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.venue.org': { text: 'PUBLIC org board', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.daemon.running': { text: 'board running', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.daemon.stopped': { text: 'board stopped — nothing is lost; the operator\'s restart brings it back', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.daemon.unreachable': { text: 'board unreachable', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.daemon.notebook.stopped': { text: 'your notebook has stopped — what was kept is safe; start it here', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.daemon.notebook.halted': { text: 'writes stopped on your notebook — reading continues; stop it and start it again here to clear this', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.others-count': { text: '+⟨n⟩ others', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S1' },
  'F.corner.latest': { text: '⟨published⟩ · the latest version — this address, and a link to it, moves to each new one', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.corner.pinned': { text: '⟨published⟩ · version ⟨k⟩ — this address, and a link to it, stays on this text forever', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.corner.no-versions': { text: '⟨published⟩ · no versions yet — its first is made when you publish new text for it', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.corner.withheld': { text: 'withheld · ⟨owner⟩', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.published.notebook': { text: 'published here — readable by anyone who can reach this notebook: anything on this machine, and nothing beyond it', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.published': { text: 'published', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.version-of': { text: 'version ⟨k⟩ of ⟨n⟩', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.alternatives': { text: '· ⟨m⟩ alternatives', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.alternatives.1': { text: '· 1 alternative', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.whole-links': { text: '⟨n⟩ links to this document as a whole', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.whole-links.1': { text: '1 link to this document as a whole', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.arrival': { text: 'you are reading version ⟨k⟩ — a newer version has arrived — read version ⟨n⟩ · show what changed', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.floating': { text: 'its passage is not in ⟨D⟩\'s current text', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S6, B1-S4' },
  'F.floating.read': { text: 'read version ⟨k⟩, the last that holds it', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S6' },
  'F.floating.member': { text: 'its passage is not in version ⟨k⟩', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S6' },
  'F.swallow': { text: 'typing goes nowhere here — to go somewhere, the address line: ⟨LEAP chord⟩', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the plane (K-9)' },
  'F.swallow.space': { text: 'Space does not page here — ⟨paging key⟩ does', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the plane (K-9)' },
  'F.board-residue': { text: 'not counted here: drafts you may not read, links homed on other boards — counted from ⟨floor⟩; documents unchanged since then are not shown', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S3' },
  'F.card-clause': { text: 'links homed on other boards are not counted here', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S4' },
  'F.leap.none': { text: 'nothing you can read on this board goes by that name or holds those words', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S11' },
  'F.leap.floor': { text: 'documents unchanged since ⟨floor⟩ are not found here', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S11' },
  'F.open-beside': { text: 'open beside', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S11' },
  'F.not-rendered': { text: 'not rendered by this client — ⟨width⟩ positions', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S1' },
  'F.count.documents': { text: 'documents', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S3' },
  'F.count.links': { text: 'links held here', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S3' },
  'F.count.withheld': { text: 'passages withheld from you', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S3' },
  'F.home-record.yours': { text: 'your home document — published here from birth, kept at this address; it holds your key record', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S1' },
  'F.home-record.other': { text: '⟨owner⟩\'s home document — it holds their key record', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S1' },
  'F.key-record.other': { text: 'this page holds ⟨owner⟩\'s key record', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S1' },
  'F.unclaimed': { text: 'unclaimed — no board on this machine is yours until you claim one', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.keyless-limit': { text: 'this version of the client offers neither act — enrolling this device and importing a paper come with the key ceremonies', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line, state 3' },
  'F.flip': { text: 'local trust is now on — anything running on this machine can write as you here and read every draft you have written, with no key', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line, state 6' },
  'F.flip.run': { text: '— for this run of the notebook: quitting the client ends it, and the next start runs without it', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line, state 6' },
  'F.reindex': { text: 're-index now', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line, state 7' },
  'F.annotate.inert': { text: 'annotating works on your own documents and web pages in this version — to write about this passage, quote it as a copy into your notes', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the selection' },
  'F.sign-in': { text: 'sign in', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.back': { text: '‹ back', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.forward': { text: 'forward ›', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.trail-list': { text: 'the trail', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.level.board': { text: 'the whole board', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S11' },
  'F.level.account': { text: 'the account\'s region', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S11' },
  'F.level.document': { text: 'the whole document', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S11' },
  'F.level.home': { text: 'HOME', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S11' },
  'F.landmark': { text: 'landmark ◆', cls: 'DRAFT', source: 'designs/plane.js', screen: 'B1-S11' },
  'F.position': { text: 'position ⟨p⟩', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S11' },
  'F.label.documents': { text: '⟨n⟩ documents', cls: 'DRAFT', source: 'designs/plane.js', screen: 'B1-S2' },
  'F.label.documents.1': { text: '1 document', cls: 'DRAFT', source: 'designs/plane.js', screen: 'B1-S2' },
  'F.label.links': { text: '⟨n⟩ links', cls: 'DRAFT', source: 'designs/plane.js', screen: 'B1-S2' },
  'F.label.links.1': { text: '1 link', cls: 'DRAFT', source: 'designs/plane.js', screen: 'B1-S2' },
  'F.label.draft': { text: 'draft', cls: 'DRAFT', source: 'designs/plane.js', screen: 'B1-S2' },
  'F.scene.sameness': { text: 'sameness — one identity appearing twice', cls: 'DRAFT', source: 'designs/plane.js', screen: 'B1-S9' },
  'F.scene.link': { text: 'a link — a different relation, drawn differently', cls: 'DRAFT', source: 'designs/plane.js', screen: 'B1-S9' },
  'F.scene.relevel': { text: 're-level', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S9' },
  'F.scene.dismiss': { text: 'dismiss the scene', cls: 'DRAFT', source: 'designs/plane.js', screen: 'B1-S9' },
  'F.residue.newest': { text: '+⟨n⟩ more — newest ⟨label⟩', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S2' },
  'F.lens.owner': { text: 'owner', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'F.lens.type': { text: 'type', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'F.lens.endorsement': { text: 'endorsement', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'F.lens.endorsed': { text: 'endorsed by the owner', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'F.card.type': { text: 'type', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.from': { text: 'from', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.to': { text: 'to', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.home': { text: 'home', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.owner': { text: 'owner', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.age': { text: 'age', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.superseded-by': { text: 'superseded by', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.supersedes': { text: 'supersedes', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.none': { text: 'none', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.retracted': { text: 'retracted', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.public': { text: 'published — so the link is public', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.hidden': { text: 'a draft — the link is hidden with its home', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.versions.read': { text: 'read version ⟨k⟩', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the versions list' },
  'F.versions.whole': { text: 'holds the passage whole', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the versions list' },
  'F.versions.part': { text: 'holds the passage in part', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the versions list' },
  'F.versions.none': { text: 'does not hold the passage', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the versions list' },
  'F.leap.arriving': { text: 'the index is still building — what is listed here is what has arrived', cls: 'DRAFT', source: '', screen: 'B1-S11', lane: true },
  'F.index.state': { text: 'index: ⟨arm⟩', cls: 'DRAFT', source: '', screen: 'B1-S11', lane: true },

  // ---- DRAFT: designs/D5-keys.md --------------------------------------------
  'D5.slots': { text: 'annotate ⌘⇧A · quote ⌘⇧C · who wrote this? ⌘⇧O · who uses this? ⌘⇧R · see the links ⌘⇧L · follow ⌘↩ · read side by side ⌘⇧↩', cls: 'DRAFT', source: 'designs/D5-keys.md', screen: 'the selection' },
  'D5.select-first': { text: 'select a passage first', cls: 'DRAFT', source: 'designs/D5-keys.md', screen: 'the selection' },
  'D5.annotate': { text: 'annotate', cls: 'DRAFT', source: 'designs/D5-keys.md', screen: 'the selection' },
  'D5.quote': { text: 'quote', cls: 'DRAFT', source: 'designs/D5-keys.md', screen: 'the selection' },
  'D5.link-to': { text: 'link to…', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the selection' },

  // ---- strings THIS LANE NEEDED that the inventory lacks (reported) -----------
  'L.no-adapter': { text: 'no shell and no provider — this page reaches nothing', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  'L.refused': { text: '⟨name⟩ — refused; nothing was written', cls: 'DRAFT', source: '', screen: 'a face', lane: true },
  'L.seam.annotate': { text: 'annotate — comes with the annotation lane; nothing is written here', cls: 'DRAFT', source: '', screen: 'the selection', lane: true },
  'L.seam.quote': { text: 'quote — comes with the annotation lane; nothing is written here', cls: 'DRAFT', source: '', screen: 'the selection', lane: true },
  'L.seam.link-to': { text: 'link to… — comes with the editor\'s lane; nothing is written here', cls: 'DRAFT', source: '', screen: 'the selection', lane: true },
  'L.arriving': { text: 'arriving', cls: 'DRAFT', source: '', screen: 'B1-S2, B1-S3', lane: true },
  'L.lower-bound': { text: '≥ ⟨n⟩', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S3' },
  'L.whole-board': { text: 'WHOLE BOARD', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S3' },
  'L.board-label': { text: 'board ⟨node⟩ · ⟨origin⟩ · ⟨venue⟩ · claimed by ⟨claimant⟩', cls: 'DRAFT', source: 'designs/plane.js', screen: 'B1-S3' },
  'L.session-refused': { text: 'no session — the provider refused: ⟨name⟩', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  'L.moment': { text: 'the shell asks: ⟨kind⟩', cls: 'DRAFT', source: '', screen: 'a face', lane: true },
  'L.answer': { text: 'answer', cls: 'DRAFT', source: '', screen: 'a face', lane: true },
  'L.cancel': { text: 'cancel', cls: 'DRAFT', source: '', screen: 'a face', lane: true },
  'L.at-position': { text: 'at position ⟨p⟩', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  // the anatomy card's lineage by its claims' authority (issue #143's design decision): a claimant the owner row does not
  // name, after its claim on a row; the line the claims without authority stand behind; each of them listed as an
  // assertion — its `.you` form where the reader is the claimant, the verb agreeing — with what the claimant is to the links
  'L.card.by-owner': { text: '— by its owner, ⟨claimant⟩', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  'L.card.you': { text: 'you', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  'L.card.others': { text: 'other accounts\' claims — show them', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  'L.card.claims.superseded-by': { text: '⟨claimant⟩ claims this is superseded by ⟨link⟩', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  'L.card.claims.superseded-by.you': { text: '⟨claimant⟩ claim this is superseded by ⟨link⟩', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  'L.card.claims.supersedes': { text: '⟨claimant⟩ claims this supersedes ⟨link⟩', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  'L.card.claims.supersedes.you': { text: '⟨claimant⟩ claim this supersedes ⟨link⟩', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  'L.card.this-owner': { text: 'this link\'s owner', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  'L.card.above': { text: 'an account above the superseded link\'s owner', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  'L.card.under': { text: 'an account under the superseded link\'s owner', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  'L.the-line': { text: 'the one line', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  'L.leap-label': { text: 'LEAP — an address, or a document\'s first line', cls: 'DRAFT', source: 'designs/plane.html', screen: 'B1-S11' },
  'L.leap-rows-label': { text: 'LEAP', cls: 'DRAFT', source: '', screen: 'B1-S11', lane: true },
  'L.scene-label': { text: 'the reading scene: two places side by side', cls: 'DRAFT', source: 'designs/plane.html', screen: 'B1-S9' },
  'L.mirror-label': { text: 'the board in record order', cls: 'DRAFT', source: 'designs/plane.html', screen: 'the ARIA mirror' },
  'L.mirror-level': { text: 'level ⟨n⟩', cls: 'DRAFT', source: 'designs/plane.js', screen: 'the ARIA mirror' },
  // the mirror's item names (N-WALK's `nameOf`): what a screen reader hears at each element of the walk
  'L.mirror.item': { text: 'Item ⟨i⟩ of ⟨n⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.board': { text: 'board ⟨node⟩, ⟨origin⟩: ⟨n⟩ accounts.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.board.bare': { text: 'board ⟨node⟩: ⟨n⟩ accounts.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.account': { text: 'account ⟨account⟩: ⟨documents⟩ documents, ⟨links⟩ links⟨empty⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.at-least': { text: 'at least ⟨n⟩', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.document': { text: 'document ⟨document⟩, ⟨label⟩, ⟨state⟩⟨extent⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.draft': { text: 'a draft', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.positions': { text: ', ⟨n⟩ positions', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.span': { text: 'span at position ⟨p⟩ of ⟨extent⟩ in ⟨document⟩⟨same⟩: "⟨text⟩".', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.span.bare': { text: 'span at position ⟨p⟩ in ⟨document⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.same': { text: ' (the same material as ⟨origin⟩)', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.withheld': { text: 'withheld run in ⟨document⟩: ⟨width⟩ positions, owner ⟨owner⟩, origin ⟨origin⟩. ⟨arm⟩.⟨clause⟩', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // C-67's clause after a withheld run's arm, where the origin's edition claims decide one (PUB-5.124); the empty place says nothing
  'L.mirror.clause': { text: ' ⟨clause⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // ⟨far⟩ the far end's label (LK's `farLabel`), the words its tail, its card and its list rows carry
  'L.mirror.link': { text: 'link ⟨link⟩, type ⟨type⟩, ⟨direction⟩ ⟨far⟩⟨floating⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.untyped': { text: 'untyped', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // a link's far end in words, after its address (LK's `farWords`; issue #132's design decision): a board's `doc_not_registered`, and the
  // same in the reader's own account where the index, known complete, lists no document at the address
  'L.far.unregistered': { text: 'nothing this board will say about this address', cls: 'DRAFT', source: '', screen: 'a link\'s far end: its tail, B1-S5, the ARIA mirror', lane: true },
  'L.far.empty': { text: 'no document here yet', cls: 'DRAFT', source: '', screen: 'a link\'s far end: its tail, B1-S5, the ARIA mirror', lane: true },
  // a link whose far end floats: F.floating's words, as its symbol and its stub say them
  'L.mirror.floating': { text: ' — ⟨sentence⟩', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // a jump reading, said at once where it was made until its read answers (issue #136's design decision)
  'L.reading': { text: 'reading ⟨address⟩…', cls: 'DRAFT', source: '', screen: 'a jump reading: at the act\'s site', lane: true },
  // the shown chords' words (D5-F8; the focus record's rule 19): the dismiss's title, the version marker's
  'L.dismiss': { text: 'dismiss (⟨chord⟩)', cls: 'DRAFT', source: '', screen: 'the overlay', lane: true },
  'L.version': { text: 'version ⟨k⟩', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  // the overlay dialog's name where no caption stands in it (the focus record's D5): one per kind
  'L.dialog.card': { text: 'a card', cls: 'DRAFT', source: '', screen: 'the overlay', lane: true },
  'L.dialog.list': { text: 'a list', cls: 'DRAFT', source: '', screen: 'the overlay', lane: true },
  'L.dialog.face': { text: 'a face', cls: 'DRAFT', source: '', screen: 'the overlay', lane: true },
  'L.dialog.moment': { text: 'a moment', cls: 'DRAFT', source: '', screen: 'the overlay', lane: true },
};

/**
 * The string for an id with its tokens filled.
 * @param {string} id
 * @param {Record<string, string | number>} [values]
 * @returns {string}
 */
export function t(id, values) {
  const e = STRINGS[id];
  if (!e) throw new Error('no string ' + id);
  return values ? fill(e.text, values) : e.text;
}

/** @param {string} id @returns {boolean} */
export const isPinned = (id) => STRINGS[id]?.cls === 'PINNED';

/**
 * The pinned entries, for the gate's text case.
 * @returns {Array<{id: string, text: string, source: string}>}
 */
export function pinned() {
  return Object.entries(STRINGS)
    .filter(([, e]) => e.cls === 'PINNED')
    .map(([id, e]) => ({ id, text: e.text, source: e.source }));
}

/**
 * The strings the lane needed and no design document carries.
 * @returns {Array<{id: string, text: string, screen: string}>}
 */
export function lacking() {
  return Object.entries(STRINGS)
    .filter(([, e]) => e.lane)
    .map(([id, e]) => ({ id, text: e.text, screen: e.screen || '' }));
}

/**
 * A link type's name as the page shows it: on a notebook with no commons
 * registry document seeded every type reads R5's form, "link of type ⟨T⟩ —
 * undocumented here", ⟨T⟩ the commons path's tail.
 * @param {string | null} ty
 */
export function typeName(ty) {
  const c = commonsType(ty);
  return t('R5.undocumented', { T: c ? '3.' + [c.ordinal, ...c.sub].join('.') : ty || '—' });
}

/** a count noun: `one` where n is 1, else `many` with ⟨n⟩ filled */
export const plural = (/** @type {number} */ n, /** @type {string} */ one, /** @type {string} */ many) =>
  n === 1 ? t(one) : t(many, { n });
