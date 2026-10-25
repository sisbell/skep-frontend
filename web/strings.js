// ST — the copy: every person-facing string the page shows (the structure
// record §3.2; S-26 (a)). Layer: a leaf. PURE.
// Each entry is PINNED — ruled wording, verbatim from its authority, cited
// by its `ux/copy.md` id (`C-n`) or by the requirement that pins it — or
// DRAFT, a string a design document drafted, its source and the screen named,
// or one no design document carries (`lane: true`), which `lacking` lists.
// The page invents no wording. `t` fills an entry's ⟨tokens⟩ (U's `fill`),
// and `tHTML` fills them as markup, each value escaped, those it is asked
// to wrap set in an element of their own class — a document's words in the
// reading face's — and every address in the rest in the identifier's face;
// words made elsewhere are set as markup by their faces
// (`facedHTML`), or with every address M-ADDR reads in them in the
// identifier's face (`addressedHTML`); `pinned` lists the pinned entries for
// the gate's text case, which holds each to its source.
// Rules: FP-1, FP-2, FP-13, FP-32.

import { fill, esc } from './util.js';
import { commonsType, isAddress } from './model/address.js';

/**
 * @typedef {Object} StringEntry
 * @property {string} text the string, with its ⟨tokens⟩
 * @property {'PINNED' | 'DRAFT'} cls
 * @property {string} source the design file that carries it (`ux/copy.md`, `requirements.md`, `designs/foundations.md`, `designs/B1-reader.md`, `designs/D5-keys.md`), or `''` where none does
 * @property {string} [screen] the screen that needed it (DRAFT)
 * @property {boolean} [lane] true where no design document carries the string
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
  // the arrival said once in the status region where a reading scene's pane pins to the version it shows (FP-23):
  // F.arrival's first two clauses, its act the pane's corner's "read version ⟨n⟩" (F.versions.read) and no "show what changed"
  'F.arrival.pane': { text: 'you are reading version ⟨k⟩ — a newer version has arrived', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S9' },
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
  // true where no board exists (FP-35): the guest line's place at an empty board list
  'F.unclaimed': { text: 'no board on this machine is yours until you claim one', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line; the ARIA mirror; an act that needs a board' },
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
  // a byline's slots where no key can be named (FP-34; foundations §3.2): no key made the writes; the board lost it
  'F.slot.unsigned': { text: 'unsigned', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the byline' },
  'F.slot.not-recorded': { text: 'not recorded', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the byline' },
  'F.leap.arriving': { text: 'the index is still building — what is listed here is what has arrived', cls: 'DRAFT', source: '', screen: 'B1-S11', lane: true },
  'F.index.state': { text: 'index: ⟨arm⟩', cls: 'DRAFT', source: '', screen: 'B1-S11', lane: true },

  // ---- DRAFT: designs/D5-keys.md --------------------------------------------
  'D5.slots': { text: 'annotate ⌘⇧A · quote ⌘⇧C · who wrote this? ⌘⇧O · who uses this? ⌘⇧R · see the links ⌘⇧L · follow ⌘↩ · read side by side ⌘⇧↩', cls: 'DRAFT', source: 'designs/D5-keys.md', screen: 'the selection' },
  'D5.select-first': { text: 'select a passage first', cls: 'DRAFT', source: 'designs/D5-keys.md', screen: 'the selection' },
  'D5.annotate': { text: 'annotate', cls: 'DRAFT', source: 'designs/D5-keys.md', screen: 'the selection' },
  'D5.quote': { text: 'quote', cls: 'DRAFT', source: 'designs/D5-keys.md', screen: 'the selection' },
  'D5.link-to': { text: 'link to…', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the selection' },

  // ---- DRAFT: strings no design document carries (`lane: true`) -------------
  'L.no-adapter': { text: 'no shell and no provider — this page reaches nothing', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  // where no board is held (FP-35): the board list refused, in the guest line's place; the address display's one segment;
  // the empty list's statement
  'L.boards-unread': { text: 'the boards on this machine could not be read — that does not mean there are none', cls: 'DRAFT', source: '', screen: 'the one line; the ARIA mirror; an act that needs a board', lane: true },
  'L.go-to-address': { text: 'go to an address', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  'L.no-notebook-yet': { text: 'beginning a notebook isn\'t built yet', cls: 'DRAFT', source: '', screen: 'the one line; an act that needs a board', lane: true },
  'L.refused': { text: '⟨name⟩ — refused; nothing was written', cls: 'DRAFT', source: '', screen: 'a face', lane: true },
  'L.seam.annotate': { text: 'annotate — comes with the annotation lane; nothing is written here', cls: 'DRAFT', source: '', screen: 'the selection', lane: true },
  'L.seam.quote': { text: 'quote — comes with the annotation lane; nothing is written here', cls: 'DRAFT', source: '', screen: 'the selection', lane: true },
  'L.seam.link-to': { text: 'link to… — comes with the editor\'s lane; nothing is written here', cls: 'DRAFT', source: '', screen: 'the selection', lane: true },
  'L.arriving': { text: 'arriving', cls: 'DRAFT', source: '', screen: 'B1-S2, B1-S3', lane: true },
  'L.lower-bound': { text: '≥ ⟨n⟩', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S3' },
  'L.whole-board': { text: 'WHOLE BOARD', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S3' },
  'L.board-label': { text: 'board ⟨node⟩ · ⟨origin⟩ · ⟨venue⟩ · claimed by ⟨claimant⟩', cls: 'DRAFT', source: 'designs/plane.js', screen: 'B1-S3' },
  // the board's statement while the shell's index reports changes it could not place (FP-23): a change a row naming no
  // document carried, whose new place the page cannot find
  'L.board-unplaced': { text: 'some changes here could not be traced to their documents; a document such a change created is not shown until it changes again', cls: 'DRAFT', source: '', screen: 'B1-S3', lane: true },
  'L.session-refused': { text: 'no session — the provider refused: ⟨name⟩', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  // a session a restart lost (FP-28): the boot's own call made again and not back within a second, said in the acting-as
  // segment's place; refused, leading the guest state boot shows for that refusal — "signed out" never said of either, for
  // it is the person's own sign-out's alone (C-137)
  'L.reconnecting': { text: 'reconnecting as ⟨account⟩ after a restart', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  'L.reconnect-refused': { text: 'could not reconnect as ⟨account⟩ after a restart', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  // the one status message at a session's ending (FP-29): the ending's words — the one line's — then the documents the
  // view stood on that the reader can no longer read, each now its withheld box, "withheld · ⟨owner⟩"
  'L.covered': { text: '⟨ending⟩ — withheld from you now: ⟨documents⟩', cls: 'DRAFT', source: '', screen: 'the status region', lane: true },
  // a walk's moment (FP-28): its face's caption by its kind, its answers, its cancel named by its walk and beside it that
  // what cancelling leaves behind is not told to the page, a label box's default and its empty field flagged, a moment the
  // shell no longer holds; and the walk's segment of the one line
  'L.moment.label': { text: 'the shell asks for a name', cls: 'DRAFT', source: '', screen: 'a walk\'s moment', lane: true },
  'L.moment.ask': { text: 'the shell asks', cls: 'DRAFT', source: '', screen: 'a walk\'s moment', lane: true },
  'L.moment.yes_no': { text: 'the shell asks yes or no', cls: 'DRAFT', source: '', screen: 'a walk\'s moment', lane: true },
  'L.moment.statement': { text: 'the shell says', cls: 'DRAFT', source: '', screen: 'a walk\'s moment', lane: true },
  'L.answer': { text: 'answer', cls: 'DRAFT', source: '', screen: 'a walk\'s moment', lane: true },
  'L.moment.yes': { text: 'yes', cls: 'DRAFT', source: '', screen: 'a walk\'s moment', lane: true },
  'L.moment.no': { text: 'no', cls: 'DRAFT', source: '', screen: 'a walk\'s moment', lane: true },
  'L.moment.cancel': { text: 'cancel ⟨walk⟩', cls: 'DRAFT', source: '', screen: 'a walk\'s moment', lane: true },
  'L.moment.leaves': { text: 'what cancelling leaves behind cannot be shown here — the shell does not tell this page', cls: 'DRAFT', source: '', screen: 'a walk\'s moment', lane: true },
  'L.moment.default': { text: 'left empty, the answer is ⟨default⟩', cls: 'DRAFT', source: '', screen: 'a walk\'s moment', lane: true },
  'L.moment.empty': { text: 'a name is needed — this box offers none of its own', cls: 'DRAFT', source: '', screen: 'a walk\'s moment', lane: true },
  'L.moment.gone': { text: 'this moment no longer waits — the shell has ended it', cls: 'DRAFT', source: '', screen: 'a walk\'s moment', lane: true },
  'L.walk.waits': { text: '⟨walk⟩ · ⟨step⟩ — waits on you', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  'L.at-position': { text: 'at position ⟨p⟩', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  // the anatomy card's lineage by its claims' authority: a claimant the owner row does not name, after its claim on a
  // row; the line the claims without authority stand behind; each of them listed as an assertion — its `.you` form
  // where the reader is the claimant, the verb agreeing — with what the claimant is to the links
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
  'L.mirror.account': { text: 'account ⟨account⟩: ⟨documents⟩ documents, ⟨links⟩ links⟨empty⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.at-least': { text: 'at least ⟨n⟩', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.document': { text: 'document ⟨document⟩, ⟨label⟩, ⟨state⟩⟨extent⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.draft': { text: 'a draft', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.positions': { text: ', ⟨n⟩ positions', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.span': { text: 'span at position ⟨p⟩ of ⟨extent⟩ in ⟨document⟩⟨same⟩: "⟨text⟩".', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.span.bare': { text: 'span at position ⟨p⟩ in ⟨document⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.same': { text: ' (the same material as ⟨origin⟩)', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // ⟨kind⟩ a withheld run's kind (L.item.withheld) and ⟨length⟩ its positions (L.item.positions), as a copy's stand-in names them
  'L.mirror.withheld': { text: '⟨kind⟩ in ⟨document⟩: ⟨length⟩, owner ⟨owner⟩, origin ⟨origin⟩. ⟨arm⟩.⟨clause⟩', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // a block that holds no text, a withheld run apart (FP-24): its kind (L.item.*), where it stands, then what the plane
  // shows of it — a record's words and keys, an item this client cannot show's length — never its raw value
  'L.mirror.no-text': { text: '⟨kind⟩ at position ⟨p⟩ of ⟨extent⟩ in ⟨document⟩⟨same⟩⟨shown⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.shows': { text: ': ⟨shown⟩', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // C-67's clause after a withheld run's arm, where the origin's edition claims decide one (PUB-5.124); the empty place says nothing
  'L.mirror.clause': { text: ' ⟨clause⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // after a withheld run's face, the links drawn at the run, its item's children (FP-30): ⟨links⟩ their count (F.label.links)
  'L.mirror.run-links': { text: ' ⟨links⟩ ending in it.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // C-67's place where a read of the edition claims failed (FP-33): a blank there would read as no claim
  'L.clause.unread': { text: 'edition claims not read', cls: 'DRAFT', source: '', screen: 'B1-S7; the document-level withheld face; the ARIA mirror', lane: true },
  // ⟨far⟩ the far end's label (LK's `farLabel`), the words its tail, its card and its list rows carry
  'L.mirror.link': { text: 'link ⟨link⟩, type ⟨type⟩, ⟨direction⟩ ⟨far⟩⟨floating⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.untyped': { text: 'untyped', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // a link's far end in words, after its address (LK's `farWords`): a board's `doc_not_registered`, and the same in the
  // reader's own account where the index, known complete, lists no document at the address
  'L.far.unregistered': { text: 'nothing this board will say about this address', cls: 'DRAFT', source: '', screen: 'a link\'s far end: its tail, B1-S5, the ARIA mirror', lane: true },
  'L.far.empty': { text: 'no document here yet', cls: 'DRAFT', source: '', screen: 'a link\'s far end: its tail, B1-S5, the ARIA mirror', lane: true },
  // a link whose far end's text holds none of its passage, part of it or all of it in pieces, or the board would not tell:
  // those words (BM-HELD's `farSays` — F.floating's, or its line), as its symbol and its stub say them
  'L.mirror.floating': { text: ' — ⟨sentence⟩', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // a jump reading, said where the camera is until its read answers; a jump reaching, said at the act's site while only a read
  // can place its destination, the camera still (FP-25)
  'L.reading': { text: 'reading ⟨address⟩…', cls: 'DRAFT', source: '', screen: 'a jump reading: where the camera is, else the one line', lane: true },
  'L.reaching': { text: 'reaching ⟨address⟩…', cls: 'DRAFT', source: '', screen: 'a jump reaching: at the act\'s site, else the one line', lane: true },
  // a landing's line (FP-21): what of the passage carried or followed the text landed in holds, where it stands in one run
  // and that is not all of it, or where no answer told — the passage named by what it was to the reader, the text by
  // F.floating's two forms, the withheld text after it; the same words at a drawn link's far end before departure, the
  // places it stands in counted there alone (BM-HELD's `lineOf`)
  'L.held.part': { text: 'only part of ⟨subject⟩ is in ⟨where⟩', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a link\'s far end: its stub, its symbol, B1-S5, the ARIA mirror', lane: true },
  'L.held.pieces': { text: 'all of ⟨subject⟩ is in ⟨where⟩', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a link\'s far end: its stub, its symbol, B1-S5, the ARIA mirror', lane: true },
  'L.held.places': { text: ' — in ⟨n⟩ places', cls: 'DRAFT', source: '', screen: 'a link\'s far end: its stub, its symbol, B1-S5, the ARIA mirror', lane: true },
  'L.held.withheld': { text: '; the rest may be under the withheld text here', cls: 'DRAFT', source: '', screen: 'a landing\'s line', lane: true },
  'L.held.unknown': { text: 'couldn\'t tell whether ⟨where⟩ holds ⟨subject⟩: ⟨reason⟩', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a link\'s far end: its stub, its symbol, B1-S5, the ARIA mirror', lane: true },
  'L.held.selected': { text: 'what you selected', cls: 'DRAFT', source: '', screen: 'a landing\'s line', lane: true },
  'L.held.reading': { text: 'the text you were reading', cls: 'DRAFT', source: '', screen: 'a landing\'s line', lane: true },
  'L.held.followed': { text: 'its passage', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a link\'s far end: its stub, its symbol, B1-S5, the ARIA mirror', lane: true },
  'L.held.member': { text: 'version ⟨k⟩', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a link\'s far end', lane: true },
  'L.held.current': { text: '⟨D⟩\'s current text', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a link\'s far end', lane: true },
  // why no answer told (BM-HELD's `whyOf`), where no entry above already says it: never the refusal's token, never "compare"
  'L.held.why.busy': { text: 'the board was busy', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a versions row', lane: true },
  'L.held.why.size': { text: 'it is too large to check, even in parts', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a versions row', lane: true },
  'L.held.why.withheld': { text: 'some of it is withheld from you', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a versions row', lane: true },
  'L.held.why.unread': { text: 'its text could not be read', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a versions row', lane: true },
  'L.held.why.other': { text: 'the board did not say', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a versions row; a link\'s far end', lane: true },
  // the runs' labels (FP-21): an arrival in several runs labels each at the text's edge — its piece in the passage's own
  // order, a repeat's word, and at the run the landing stands at how much of the passage the runs hold and whether the
  // text holds it in another order (BM-HELD's `labelOf`, `mergedLabel`); the landing's line steps among them
  'L.piece': { text: 'piece ⟨k⟩ of ⟨n⟩', cls: 'DRAFT', source: '', screen: 'an arrival\'s run labels; a landing\'s line; the ARIA mirror', lane: true },
  'L.pieces': { text: 'pieces ⟨list⟩ of ⟨n⟩', cls: 'DRAFT', source: '', screen: 'an arrival\'s run labels; a landing\'s line', lane: true },
  'L.piece.again': { text: 'again', cls: 'DRAFT', source: '', screen: 'an arrival\'s run labels; a landing\'s line; the ARIA mirror', lane: true },
  'L.piece.again-later': { text: 'again later', cls: 'DRAFT', source: '', screen: 'an arrival\'s run labels; a landing\'s line; the ARIA mirror', lane: true },
  'L.piece.all': { text: 'all of the passage', cls: 'DRAFT', source: '', screen: 'a landing\'s line; the ARIA mirror', lane: true },
  'L.piece.part': { text: 'only part of the passage', cls: 'DRAFT', source: '', screen: 'a landing\'s line; the ARIA mirror', lane: true },
  'L.piece.order': { text: 'in another order', cls: 'DRAFT', source: '', screen: 'a landing\'s line; the ARIA mirror', lane: true },
  'L.piece.next': { text: 'next piece', cls: 'DRAFT', source: '', screen: 'a landing\'s line', lane: true },
  'L.piece.previous': { text: 'previous piece', cls: 'DRAFT', source: '', screen: 'a landing\'s line', lane: true },
  // a versions row's strip for the two states F.versions' three do not name (FP-21)
  'L.versions.pieces': { text: 'holds all of the passage, in ⟨n⟩ places', cls: 'DRAFT', source: '', screen: 'the versions list', lane: true },
  'L.versions.unknown': { text: 'couldn\'t tell whether it holds the passage: ⟨reason⟩', cls: 'DRAFT', source: '', screen: 'the versions list', lane: true },
  // the list's open end: where the board did not end the chain at the last member read, a line saying how far the list
  // was read and that it is not known to be complete — "then the board stopped answering" where the board did not answer,
  // the clause dropped where it stopped short at another refusal — a row past the members read, and the date of the
  // members the feed named past them; where it did end the chain there, the mark the head's row takes, a shape, and its
  // name
  'L.versions.cut': { text: 'read to version ⟨k⟩, then the board stopped answering — this list is not known to be complete', cls: 'DRAFT', source: '', screen: 'the versions list', lane: true },
  'L.versions.cut.none': { text: 'the board did not answer — no version could be read', cls: 'DRAFT', source: '', screen: 'the versions list', lane: true },
  'L.versions.open': { text: 'read to version ⟨k⟩ — this list is not known to be complete', cls: 'DRAFT', source: '', screen: 'the versions list', lane: true },
  'L.versions.open.none': { text: 'no version could be read — this list is not known to be complete', cls: 'DRAFT', source: '', screen: 'the versions list', lane: true },
  'L.versions.not-read': { text: 'not read', cls: 'DRAFT', source: '', screen: 'the versions list', lane: true },
  'L.versions.as-of': { text: 'as last read ⟨when⟩', cls: 'DRAFT', source: '', screen: 'the versions list', lane: true },
  'L.versions.latest': { text: 'the latest version', cls: 'DRAFT', source: '', screen: 'the versions list', lane: true },
  'L.versions.latest-mark': { text: '▲', cls: 'DRAFT', source: '', screen: 'the versions list', lane: true },
  // the shown chords' words (D5-F8; the focus record's rule 19): the dismiss's title, the version marker's
  'L.dismiss': { text: 'dismiss (⟨chord⟩)', cls: 'DRAFT', source: '', screen: 'the overlay', lane: true },
  'L.version': { text: 'version ⟨k⟩', cls: 'DRAFT', source: '', screen: 'the one line; the versions list', lane: true },
  // the overlay dialog's name where no caption stands in it (the focus record's D5): one per kind
  'L.dialog.card': { text: 'a card', cls: 'DRAFT', source: '', screen: 'the overlay', lane: true },
  'L.dialog.list': { text: 'a list', cls: 'DRAFT', source: '', screen: 'the overlay', lane: true },
  'L.dialog.face': { text: 'a face', cls: 'DRAFT', source: '', screen: 'the overlay', lane: true },
  'L.dialog.moment': { text: 'a moment', cls: 'DRAFT', source: '', screen: 'the overlay', lane: true },
  // the items that hold no text, each kind (FP-24): one entry the ARIA mirror announces at the item (N-WALK's `nameOf`)
  // and a copy's stand-in names it by in its place (T-ARTICLE's `copyText`), so the two never part; and an item's length
  'L.item.record': { text: 'a record', cls: 'DRAFT', source: '', screen: 'the ARIA mirror; a copy\'s plain text', lane: true },
  'L.item.reference': { text: 'a reference', cls: 'DRAFT', source: '', screen: 'the ARIA mirror; a copy\'s plain text', lane: true },
  'L.item.withheld': { text: 'a withheld run', cls: 'DRAFT', source: '', screen: 'the ARIA mirror; a copy\'s plain text', lane: true },
  'L.item.unshown': { text: 'an item this client cannot show', cls: 'DRAFT', source: '', screen: 'the ARIA mirror; a copy\'s plain text', lane: true },
  'L.item.positions': { text: '⟨n⟩ positions', cls: 'DRAFT', source: '', screen: 'the ARIA mirror; a copy\'s plain text', lane: true },
  'L.item.positions.1': { text: '1 position', cls: 'DRAFT', source: '', screen: 'the ARIA mirror; a copy\'s plain text', lane: true },
  // a copy's stand-in for an item, in square brackets in its place (FP-24): its kind; a withheld run's owner and length; an
  // item this client cannot show's length; a record's own plain contents — the key record's key labels and their fingerprints
  'L.copy.item': { text: '[⟨kind⟩]', cls: 'DRAFT', source: '', screen: 'a copy\'s plain text', lane: true },
  'L.copy.item.sized': { text: '[⟨kind⟩, ⟨length⟩]', cls: 'DRAFT', source: '', screen: 'a copy\'s plain text', lane: true },
  'L.copy.item.owned': { text: '[⟨kind⟩, owner ⟨owner⟩, ⟨length⟩]', cls: 'DRAFT', source: '', screen: 'a copy\'s plain text', lane: true },
  'L.copy.item.contents': { text: '[⟨kind⟩: ⟨contents⟩]', cls: 'DRAFT', source: '', screen: 'a copy\'s plain text', lane: true },
  'L.copy.key': { text: '⟨label⟩ ⟨fingerprint⟩', cls: 'DRAFT', source: '', screen: 'a copy\'s plain text', lane: true },
  // the compact signs (FP-26): the mark keyed to a run's origin — a hairline's compact label, and a withheld run's gap too
  // short to carry its owner; a withheld run's face compact in its column's edge, its owner with a mark that opens it whole
  // (foundations §2.1); the corner's usual states as glyphs — an edition's its version marker, unlit at the bare address and
  // lit at a pinned version (foundations §3.1's ○), a draft's chip
  'L.origin-mark': { text: '≡', cls: 'DRAFT', source: '', screen: 'a run\'s hairline; a withheld run\'s gap', lane: true },
  'L.withheld.mark': { text: '⟨owner⟩ ▸', cls: 'DRAFT', source: '', screen: 'B1-S7, a column\'s edge', lane: true },
  'L.corner.bare': { text: '○', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner, compact' },
  'L.corner.pinned': { text: '●', cls: 'DRAFT', source: '', screen: 'the corner, compact', lane: true },
  'L.corner.draft': { text: '◌', cls: 'DRAFT', source: '', screen: 'the corner, compact', lane: true },
  // the slots (FP-34): a slot's accessible name, its roles, what a slot being read shows; the causes — an account whose
  // writes are signed with the keys of one above it (R42's term), a genesis entry with no label, a read refused for another
  // reason — and the one line's own: the device's key store not read, the session's key not named among several
  'L.slot.named': { text: '⟨role⟩: ⟨shows⟩', cls: 'DRAFT', source: '', screen: 'the byline; the one line', lane: true },
  'L.slot.device-label': { text: 'device label', cls: 'DRAFT', source: '', screen: 'the byline; the one line', lane: true },
  'L.slot.fingerprint': { text: 'fingerprint', cls: 'DRAFT', source: '', screen: 'the byline', lane: true },
  'L.slot.reading': { text: 'being read', cls: 'DRAFT', source: '', screen: 'the byline', lane: true },
  'L.slot.by-reference': { text: 'by reference', cls: 'DRAFT', source: '', screen: 'the byline', lane: true },
  'L.slot.unlabelled': { text: 'no label', cls: 'DRAFT', source: '', screen: 'the byline; the one line', lane: true },
  'L.slot.unread': { text: 'not read', cls: 'DRAFT', source: '', screen: 'the byline', lane: true },
  'L.slot.store-unread': { text: 'key store not read', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  'L.slot.key-untold': { text: 'key not named', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
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

/**
 * The string for an id as markup: its words escaped, each ⟨token⟩ filled
 * with its value escaped, a value whose token `wrap` names set in a span of
 * that class, and every other value the client's words, each address in them
 * the identifier's (`addressedHTML`) — the words read the same as `t`'s.
 * @param {string} id
 * @param {Record<string, string | number>} values
 * @param {Record<string, string>} [wrap] the class each token's value stands in, by token
 * @returns {string}
 */
export function tHTML(id, values, wrap = {}) {
  const html = /** @type {Record<string, string>} */ ({});
  for (const [k, v] of Object.entries(values)) html[k] = wrap[k] ? `<span class="${wrap[k]}">${esc(v)}</span>` : addressedHTML(String(v));
  return fill(esc(t(id)), html);
}

/**
 * Words as markup, each address in them set in the identifier's face: every
 * run of digits joined by dots M-ADDR reads as an address (`isAddress`) in a
 * span of `.id`, save one a slash leads — a URL's host, which is no address
 * — the rest escaped as it stands; for the client's words another module
 * made whole, a sentence whose tokens are no longer apart, and never for a
 * document's own words, whose letterforms are the reading face's.
 * @param {string} text
 * @returns {string}
 */
export const addressedHTML = (text) => text.split(/(\d+(?:\.\d+)+)/).map((x, i, all) => (i % 2 && isAddress(x) && !all[i - 1].endsWith('/') ? `<span class="id">${esc(x)}</span>` : esc(x))).join('');

/**
 * Stretches of words as markup, each in its face (P-REG's FACE): the
 * identifier's in a span of `.id`, the reading face's in a span of `.reading`,
 * the client's as they stand with each address in them the identifier's
 * (`addressedHTML`), every stretch escaped.
 * @param {Array<{text: string, face: import('./plane/register.js').Face}>} runs
 * @returns {string}
 */
export const facedHTML = (runs) => runs.map((r) => (r.face === 'ident' ? `<span class="id">${esc(r.text)}</span>` : r.face === 'reading' ? `<span class="reading">${esc(r.text)}</span>` : addressedHTML(r.text))).join('');

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
 * The entries no design document carries (`lane`).
 * @returns {Array<{id: string, text: string, screen: string}>}
 */
export function lacking() {
  return Object.entries(STRINGS)
    .filter(([, e]) => e.lane)
    .map(([id, e]) => ({ id, text: e.text, screen: e.screen || '' }));
}

/**
 * A link type's name as the page shows it: on a notebook with no commons
 * registry document seeded every type reads R5's form (`R5.undocumented`),
 * ⟨T⟩ the commons path's tail.
 * @param {string | null} ty
 */
export function typeName(ty) {
  const c = commonsType(ty);
  return t('R5.undocumented', { T: c ? '3.' + [c.ordinal, ...c.sub].join('.') : ty || '—' });
}

/** a count noun: `one` where n is 1, else `many` with ⟨n⟩ filled */
export const plural = (/** @type {number} */ n, /** @type {string} */ one, /** @type {string} */ many) =>
  n === 1 ? t(one) : t(many, { n });
