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
// identifier's face (`addressedHTML`); the client's words standing in a
// document's first line's place are bracketed (`bracketed`, `withheldLine`);
// when a thing was made is said by `dated`, from the board's own testimony and
// never from the reader's clock, in one form of a date on every surface; when
// the page's copy of what it keeps standing was left behind is said by
// `lastRead`, from the page's own clock — the hour and the minute, the day
// first where it was not today — and never as an age; a continuation's mark's count is said in what
// it counts by `markCount`; a formatting form is named by its one entry wherever
// a form is named (`formName`), a type the table lacks by the name its card
// gives it, forms named together in the format strip's order, a comma alone
// between two and each other hand's after the document's own as a group led by
// the hand (`formsNamed`), and a form's act and take-off said in one pattern
// each around the label of the set they write into (`formAct`, `formTakeOff`);
// `pinned` lists the pinned entries for the gate's text case, which holds each
// to its source.
// Rules: FP-1, FP-2, FP-13, FP-32, FP-34.

import { fill, esc, dayOf, timeOf } from './util.js';
import { commonsType, isAddress } from './model/address.js';

/**
 * @typedef {Object} StringEntry
 * @property {string} text the string, with its ⟨tokens⟩
 * @property {'PINNED' | 'DRAFT'} cls
 * @property {string} source the design file that carries it (`ux/copy.md`, `requirements.md`, `designs/foundations.md`, `designs/B1-reader.md`, `designs/B2-finding.md`, `designs/B3-editor.md`, `designs/D5-keys.md`, `designs/D6-burst-machine.md`), or `''` where none does
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
  // the removed-text face at a removal (B3-S4; R31's teaching, before the act): its edition arm, its draft arm and the draft
  // face's audience phrase
  'C-48': { text: 'still here — public history: the version you removed it from remains readable, forever', cls: 'PINNED', source: 'ux/copy.md' },
  'C-49': { text: 'still here — for as long as this board retains it; below the reclaim floor it resolves nowhere here, unless another document still windows it', cls: 'PINNED', source: 'ux/copy.md' },
  'C-50': { text: 'visible to this draft\'s readers,', cls: 'PINNED', source: 'ux/copy.md' },
  // the publication's (B3-S11, B3-S12): the notebook's publish copy, the public-permanent gate's face, the remedy's label, and the
  // keyless-hand caveats at the reveal — the arrangement's and the link enumeration's — each its flag-off form, then its flag-on
  'C-32': { text: 'readable by anyone who can reach this notebook — local while it stays unbound; this notebook itself is never part of the public docuverse.', cls: 'PINNED', source: 'ux/copy.md' },
  'C-47': { text: 'this changes what the world can read, and that needs your key — open a session with your key on this board, then repeat the act', cls: 'PINNED', source: 'ux/copy.md' },
  'C-58': { text: 'published in error', cls: 'PINNED', source: 'ux/copy.md' },
  'C-97': { text: 'the arrangement in ⟨D⟩ may be this machine\'s write, not yours — this board admits that write whenever local trust is on, and this face cannot read whether it was.', cls: 'PINNED', source: 'ux/copy.md' },
  'C-97.flag-on': { text: 'the arrangement in ⟨D⟩ may be this machine\'s write, not yours', cls: 'PINNED', source: 'ux/copy.md' },
  'C-100': { text: 'these links may be this machine\'s writes, not yours — this board admits that write whenever local trust is on, and this surface cannot read whether it was.', cls: 'PINNED', source: 'ux/copy.md' },
  'C-100.flag-on': { text: 'these links may be this machine\'s writes, not yours', cls: 'PINNED', source: 'ux/copy.md' },
  // ---- PINNED: requirements.md (R56's own words, R59's two floor strings, R83's notebook mark) and R5's form
  'R56.key-absent': { text: 'no key on this device opens an account on this board — if you have one, sign in from the device that holds its key or enroll this one; if not, an account here is this board\'s admission to give, and access to this document is ⟨owner⟩\'s to grant; nothing here says whether either will; ask ⟨owner⟩', cls: 'PINNED', source: 'requirements.md' },
  'R59.floor.org': { text: 'published here; this org, or the host that runs this board for it, is not serving these bytes', cls: 'PINNED', source: 'requirements.md' },
  'R59.floor.notebook': { text: 'published here; this notebook\'s owner is not serving these bytes', cls: 'PINNED', source: 'requirements.md' },
  'R83.notebook': { text: 'published — anyone who can reach this notebook reads this passage at ⟨E⟩', cls: 'PINNED', source: 'requirements.md' },
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
  'B1.try-again': { text: 'try again', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S8; B1-S9: a stop returned to' },
  'B1.unregistered': { text: '⟨prefix⟩ — an unregistered prefix; unknown is a visible state', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S8' },
  'B1.C-72': { text: 'named here: the documents you can read whose arrangement holds this passage; a copy pasted as fresh bytes, and any document you may not read, are not counted', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S10' },
  'B1.guest-line': { text: 'reading as a guest', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S1' },
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
  'B1.show-more': { text: 'show more', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4; a continuation\'s mark\'s list' },
  'B1.withheld-run': { text: 'withheld · ⟨owner⟩ (⟨account⟩) · ⟨width⟩ positions · origin ⟨origin⟩', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S7' },
  // a refracted link's anatomy (B1-S5), drawn too where the editor's publication shows the person's own links (B3-S11 P3, P5)
  'B1.counterpart': { text: 'on ⟨D⟩\'s earlier words — shown here at their counterpart in version ⟨k⟩', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5: a refracted link\'s anatomy line; B3-S11 P5' },
  'B1.counterpart.withheld': { text: 'readers of ⟨S⟩ who cannot read this draft see this as withheld', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5: a public refracted link\'s label; B3-S11 P3 (3), P5' },
  'B1.counterpart.unread': { text: 'your notes from the draft are not shown here — reading them failed', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5: the landing where the refraction\'s read fails; B3-S11 P5' },

  // ---- DRAFT: designs/foundations.md ----------------------------------------
  'F.acting-as': { text: 'acting as ⟨account⟩ (principal ⟨N⟩) on your LOCAL notebook · ⟨device label⟩ · key present on this device', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line, state 2' },
  'F.keyless-session': { text: 'reading as ⟨account⟩ with no key — local trust; writing needs your key · on your LOCAL notebook', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line, state 3' },
  'F.venue.notebook': { text: 'LOCAL notebook', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.venue.org': { text: 'PUBLIC org board', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.daemon.running': { text: 'board running', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.daemon.stopped': { text: 'board stopped — nothing is lost; the operator\'s restart brings it back', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.daemon.unreachable': { text: 'board unreachable', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line; B1-S9: a stop returned to' },
  'F.daemon.notebook.stopped': { text: 'your notebook has stopped — what was kept is safe; start it here', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.daemon.notebook.halted': { text: 'writes stopped on your notebook — reading continues; stop it and start it again here to clear this', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the one line' },
  'F.others-count': { text: '+⟨n⟩ others', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S1' },
  'F.corner.latest': { text: '⟨published⟩ · the latest version — this address, and a link to it, moves to each new one', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.corner.pinned': { text: '⟨published⟩ · version ⟨k⟩ — this address, and a link to it, stays on this text forever', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.corner.no-versions': { text: '⟨published⟩ · no versions yet — its first is made when you publish new text for it', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.corner.withheld': { text: 'withheld · ⟨owner⟩', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.published.notebook': { text: 'published here — readable by anyone who can reach this notebook: anything on this machine, and nothing beyond it', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.published': { text: 'published', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner; the versions list' },
  'F.version-of': { text: 'version ⟨k⟩ of ⟨n⟩', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.alternatives': { text: '· ⟨m⟩ alternatives', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.alternatives.1': { text: '· 1 alternative', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.whole-links': { text: '⟨n⟩ links to this document as a whole', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.whole-links.1': { text: '1 link to this document as a whole', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  'F.arrival': { text: 'you are reading version ⟨k⟩ — a newer version has arrived — read version ⟨n⟩ · show what changed', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner' },
  // the arrival said once in the status region where a newer version's arrival pins a reading scene's pane, or a box on the
  // plane read at its reading scale, to the version it shows, and again by a return to a box it marked (FP-23): F.arrival's
  // first two clauses, its act the corner's "read version ⟨n⟩" (F.versions.read) and no "show what changed"
  'F.arrival.pane': { text: 'you are reading version ⟨k⟩ — a newer version has arrived', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S9; the status region at the plane\'s corner' },
  'F.floating': { text: 'its passage is not in ⟨D⟩\'s current text', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S6, B1-S4; B1-S9: a stop returned to; a return by the trail' },
  'F.floating.read': { text: 'read version ⟨k⟩, the last that holds it', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S6' },
  'F.floating.member': { text: 'its passage is not in version ⟨k⟩', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'B1-S6; B1-S9: a stop returned to; a return by the trail' },
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
  'F.lens.owner': { text: 'owner', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'F.lens.type': { text: 'type', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'F.lens.endorsement': { text: 'endorsement', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'F.lens.endorsed': { text: 'endorsed by the owner', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S4' },
  'F.card.type': { text: 'type', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.from': { text: 'from', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.to': { text: 'to', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.home': { text: 'home', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.owner': { text: 'owner', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.superseded-by': { text: 'superseded by', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.supersedes': { text: 'supersedes', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.none': { text: 'none', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.retracted': { text: 'retracted', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.public': { text: 'published — so the link is public', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.card.hidden': { text: 'a draft — the link is hidden with its home', cls: 'DRAFT', source: 'designs/B1-reader.md', screen: 'B1-S5' },
  'F.versions.read': { text: 'read version ⟨k⟩', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the versions list; the corner, its offered read' },
  'F.versions.whole': { text: 'holds the passage whole', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the versions list' },
  'F.versions.part': { text: 'holds the passage in part', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the versions list' },
  'F.versions.none': { text: 'does not hold the passage', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the versions list' },
  // a byline's slots where no key can be named (FP-34; foundations §3.2): no key made the writes; the board lost it — the
  // words too for a time the board holds no reading of
  'F.slot.unsigned': { text: 'unsigned', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the byline' },
  'F.slot.not-recorded': { text: 'not recorded', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the byline; B1-S5; the versions list' },
  'F.leap.arriving': { text: 'the index is still building — what is listed here is what has arrived', cls: 'DRAFT', source: '', screen: 'B1-S11', lane: true },
  'F.index.state': { text: 'index: ⟨arm⟩', cls: 'DRAFT', source: '', screen: 'B1-S11', lane: true },

  // ---- DRAFT: designs/D5-keys.md --------------------------------------------
  'D5.slots': { text: 'annotate ⌘⇧A · quote ⌘⇧C · who wrote this? ⌘⇧O · who uses this? ⌘⇧R · see the links ⌘⇧L · follow ⌘↩ · read side by side ⌘⇧↩ · link to… ⌘K · format…', cls: 'DRAFT', source: 'designs/D5-keys.md', screen: 'the selection' },
  'D5.select-first': { text: 'select a passage first', cls: 'DRAFT', source: 'designs/D5-keys.md', screen: 'the selection; the one line' },
  'D5.annotate': { text: 'annotate', cls: 'DRAFT', source: 'designs/D5-keys.md', screen: 'the selection' },
  'D5.quote': { text: 'quote', cls: 'DRAFT', source: 'designs/D5-keys.md', screen: 'the selection' },
  'D5.link-to': { text: 'link to…', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the selection' },

  // ---- DRAFT: designs/B2-finding.md (the in-document find, B2-S5) ---------------
  'B2.find.count': { text: '⟨k⟩ of ⟨n⟩', cls: 'DRAFT', source: 'designs/B2-finding.md', screen: 'B2-S5: the find\'s count, every part in' },
  'B2.find.so-far': { text: '≥ ⟨n⟩ so far', cls: 'DRAFT', source: 'designs/B2-finding.md', screen: 'B2-S5: the find\'s count while a part is out' },
  'B2.find.reading': { text: 'reading the rest of this document to search it', cls: 'DRAFT', source: 'designs/B2-finding.md', screen: 'B2-S5: the parts line' },

  // ---- DRAFT: designs/B3-editor.md (the editor's screens, by screen; D6 BM-n names the burst machine's row) ----
  // B3-S1: the kept state's three words, Mod+S's answers, the LEAP box's creation row, the launch, the kept caret, the mint's
  // clause, the publish slot's inert reasons, a note's placeholder on another board, the launch at a note or a mark, the
  // containers' box rows
  'B3.kept': { text: 'kept', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1, B3-S2: the corner (D6 BM-1, BM-6)' },
  'B3.not-yet-kept': { text: 'not yet kept', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the corner (D6 BM-8)' },
  'B3.not-kept': { text: 'not kept', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the corner (D6 BM-10)' },
  'B3.save.kept': { text: 'nothing to save — everything here is kept', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: Mod+S at the corner (D6 BM-3)' },
  'B3.save.before': { text: 'nothing to save —', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: Mod+S, before the corner\'s other two words (D6 BM-3)' },
  'B3.start-document': { text: 'start a new document with this as its first line', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the LEAP box\'s creation row' },
  'B3.last-wrote': { text: 'you last wrote in ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the launch (D6 BM-53)' },
  'B3.kept-in': { text: 'kept in ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the launch\'s recent rows; B3-S5: a quote\'s line; B3-S9: the composer\'s end' },
  'B3.caret.enter': { text: 'Enter places a caret here', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1, B3-S13: a printable key at a span of the draft with no caret (D6 BM-52)' },
  'B3.caret.enter.paste': { text: 'Enter places a caret here — then paste', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a paste at a span of the draft with no caret' },
  'B3.caret.cut': { text: 'select the passage to cut it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a cut at a span of the draft with no caret' },
  'B3.caret.back': { text: 'your text is back with Shift+Tab', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a printable key at a control of the corner (D6 BM-52)' },
  'B3.caret.mark': { text: 'a mark — ↓ moves to the words beside it, and Enter there places a caret', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a printable key at a mark of the draft' },
  'B3.mint.stays': { text: 'it stays — you can remove its words, never the document', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the mint\'s clause beside the creation copy, whole at the session\'s first mint; B3-S10: the staging and alternative acts\' mint' },
  'B3.slot.capture.inert': { text: 'a thought here goes public from a document of yours — quote it into a document of yours, then publish that — publishing asks what of it goes public', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the corner\'s publish slot inert at capture\'s default document, its reason' },
  'B3.slot.notes.inert': { text: 'this version publishes no notes document whole — to publish a note\'s words, quote them into a document of yours, then publish that — publishing asks what of it goes public', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the corner\'s publish slot inert at a notes document, its reason' },
  'B3.slot.merges.inert': { text: 'merges keeps your private record of each merge\u00a0— what others see of a merge is the version it publishes and, where it merged a published version, that the new version supersedes it; this version of the client publishes no merge record', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the corner\'s publish slot inert at the merge journal, its reason' },
  'B3.slot.formatting.inert': { text: 'this version publishes no formatting set — where a document of yours quotes the words it formats, publishing that document asks whether your formatting goes with them', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the corner\'s publish slot inert at a formatting set, its reason' },
  'B3.read-on-board': { text: 'read it on ⟨board⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the placeholder\'s one act at a note on a passage of another board\'s' },
  'B3.launch.not-in': { text: 'the passage your ⟨note | formatting⟩ is on is not in ⟨D⟩\'s current text — read version ⟨k⟩, the last that holds it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the launch\'s landing where a note\'s passage or a mark\'s words are not in the current text' },
  'B3.last-wrote.note': { text: 'you last wrote a note on ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the launch line at a note' },
  'B3.last-wrote.formatting': { text: 'you last formatted ⟨label⟩ — for you', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the launch line at a formatting mark' },
  'B3.notes.row': { text: 'Notes on ⟨label⟩ — at your newest note', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the notes document\'s box row' },
  'B3.format.set.row': { text: 'Formatting of ⟨label⟩ — at the words you last formatted', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1: the formatting set\'s box row' },
  // B3-S2: the moved face and its hands, the refused run, the hand-over, the island, the held store's bound, the device's
  // refusal, the head unreadable and the discard of what it holds, the halted store, the second window, the stopped
  // notebook's fate clause, the death's arm — its corner's two forms, its act, its status word, its ending's two clauses and
  // the keyless session's mark
  'B3.moved': { text: 'the document changed while this text was held — it is not placed; put it where it goes, or discard it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the moved face at the corner (D6 BM-13)' },
  'B3.hand.device': { text: '— by ⟨device label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the moved face, a hand of this store\'s or a labelled key\'s (D6 BM-13); B3-S11 P4' },
  'B3.hand.unsigned': { text: '— by an unsigned write', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the moved face, a bare hand (D6 BM-13); B3-S11 P4' },
  'B3.hand.lost': { text: '— its hand not recorded', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the moved face, a hand the board lost (D6 BM-13); B3-S11 P4' },
  'B3.send-again': { text: 'send again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the refused run\'s face, the moved face (D6 BM-10, BM-17, BM-26)' },
  'B3.discard': { text: 'discard this change', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the refused run\'s face (D6 BM-10, BM-27)' },
  'B3.refused.discard': { text: 'these words were never kept on the board — discarding removes them from this device for good', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the refused run\'s face, before its discard (D6 BM-10)' },
  'B3.own-bug': { text: 'a fault in this client, not a change to your text — nothing was written; your words are held here', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the refused run\'s face in the own-bug class (D6 BM-10)' },
  'B3.own-bug.send-again': { text: 'sending this again meets the same fault — copy your words out first, then discard this change', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the own-bug face\'s inert "send again" (D6 BM-10)' },
  'B3.answers_lost': { text: '⟨board⟩ has not answered this change for ⟨time⟩ — it may have reached the board: send again checks, and sends it only if it did not', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the shell\'s hand-over at the run (D6 BM-26)' },
  'B3.answers_lost.discard': { text: 'this first checks whether ⟨board⟩ took these words — if it did, they stay, kept; if not, discarding removes them from this device for good', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the hand-over\'s discard (D6 BM-27)' },
  'B3.answers_lost.unanswered': { text: '⟨board⟩ did not answer — nothing was discarded', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the hand-over\'s discard, the read unanswered (D6 BM-27)' },
  'B3.place-here': { text: 'place here', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the moved scene (D6 BM-15); B3-S11: a gap\'s act (D6 BM-39)' },
  'B3.place-here.inert': { text: 'put the caret where these words go in your current text, then take this', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the moved scene, "place here" with no caret (D6 BM-15)' },
  'B3.held-version.inert': { text: 'your held text is not on the board — place it in your current text first; there it can be quoted, linked and annotated', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the moved scene, the held version\'s selection row (D6 BM-14)' },
  'B3.moved.discard': { text: 'these words were never kept on the board — discarding removes them from this device for good; place what you want to keep first', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the moved document\'s discard (D6 BM-16)' },
  'B3.moved.send-again.inert': { text: 'this can be sent again once ⟨label⟩ changes back — undo that change where it was made; or place these words, or discard them', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the moved document\'s inert "send again" (D6 BM-17)' },
  'B3.held.none': { text: 'nothing is held for ⟨label⟩ now', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: after the discard (D6 BM-16)' },
  'B3.island': { text: 'not kept — a fault in this client, not a change to your text: nothing was written or held — closing this window loses it; keep the window open, or copy the text out', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: a refusal the page keeps, the run an island (D6 BM-19)' },
  'B3.held_full.line': { text: 'writing on ⟨board⟩ is paused on this device — what is held stays on this device and is sent as ⟨board⟩ returns; writing goes on then — the text held for ⟨board⟩ is at its limit', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the one line at the held store\'s bound (D6 BM-20)' },
  'B3.held_full.caret': { text: 'writing on ⟨board⟩ is paused on this device — nothing you type here is kept until what is held is sent; when writing goes on is named at the top, beside ⟨board⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: every caret at the held store\'s bound (D6 BM-20)' },
  'B3.unwritable': { text: 'not kept — this device could not keep it: ⟨cause⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the device\'s refusal of a held line (D6 BM-21)' },
  'B3.unwritable.full': { text: '— closing this window loses it; free space on this device — what you have typed is held on this device as soon as it can be — or copy the text out', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the device\'s refusal at a full disk, the act keyed by cause (D6 BM-21)' },
  'B3.unwritable.read_only': { text: '— closing this window loses it; copy the text out', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the device\'s refusal at a read-only volume, the act keyed by cause (D6 BM-21)' },
  'B3.head_unreadable': { text: '⟨board⟩ cannot serve the record your writes are signed against, so nothing is sent; what you write is held on this device and sent once it can', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the one line at the head-unreadable hold (D6 BM-22)' },
  'B3.head_unreadable.discard': { text: 'discard what is held', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the corner\'s act at the head-unreadable hold' },
  'B3.head_unreadable.discard.compact': { text: 'discard', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the corner\'s act at the head-unreadable hold, compact' },
  'B3.head_unreadable.discard.name': { text: 'discard what is held for ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the corner\'s act at the head-unreadable hold, its accessible name' },
  'B3.head_unreadable.discard.said.typed': { text: 'if discarded, what is held here is never sent, and the words you typed in it are removed from this device for good; if left held, it is sent once ⟨board⟩ can take it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the discard\'s statement at the head-unreadable hold, typed words among what is held' },
  'B3.head_unreadable.discard.said': { text: 'if discarded, what is held here is never sent; if left held, it is sent once ⟨board⟩ can take it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the discard\'s statement at the head-unreadable hold, no typed words held' },
  'B3.head_unreadable.discard.said.compact': { text: 'if discarded, what is held here is never sent', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the discard\'s statement at the head-unreadable hold, compact' },
  'B3.store_halted.newer': { text: 'writing is stopped on this device — open the held text with the newer version of this app that wrote it, or move the file aside', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the one line at the halted store, a file a newer app wrote (D6 BM-30)' },
  'B3.store_halted.damaged': { text: 'writing is stopped on this device — move the file aside', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the one line at the halted store, a damaged file (D6 BM-30)' },
  'B3.store_halted.unsent': { text: '— the words it holds go with it, unsent', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the halted store\'s line, after its form (D6 BM-30)' },
  'B3.store_halted.damaged.cause': { text: '— the held text is damaged and cannot be read', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the halted store\'s damaged form, its cause last (D6 BM-30)' },
  'B3.store_halted.caret': { text: 'writing on ⟨board⟩ is stopped on this device — this app cannot read the text held for it, so nothing you type here is kept; what to do is named at the top, beside ⟨board⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: every caret at the halted store (D6 BM-30)' },
  'B3.show-file': { text: 'show the file', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the halted store\'s act (D6 BM-30)' },
  'B3.another_window': { text: 'this window reads only and keeps nothing you type — copy this address, then go to it in the other window of this app, or, once that is closed, quit this one, open the app again and go to it there — it opened while that window held this notebook', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the one line in a second window (D6 BM-60)' },
  'B3.copy-address': { text: 'copy this address', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the second window\'s act (D6 BM-60)' },
  'B3.daemon.fate': { text: ', and what you wrote since it stopped is held on this device and sent when it starts', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the daemon segment\'s own-board stopped form, its fate clause (D6 BM-9)' },
  'B3.durability': { text: 'could not make that durable — retrying', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: `durability`\'s face on a third refusal' },
  'B3.death.corner.stays': { text: 'held on this device, never sent\u00a0— it stays here when this window closes; copy the text out to use it\u00a0— this device’s key no longer writes on ⟨board⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the corner where the death\'s arm cannot re-open, where the shell answers the board\'s held lines under the keyless session (D6 BM-24)' },
  'B3.death.corner.unshown': { text: 'held on this device, never sent\u00a0— this version of the app cannot show it once this window closes; copy the text out to use it\u00a0— this device’s key no longer writes on ⟨board⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the corner where the death\'s arm cannot re-open, on every other board (D6 BM-24)' },
  'B3.death.caret': { text: 'writing on ⟨board⟩ has ended on this device — this device\'s key no longer writes there, so nothing you type here is kept; copy the text out to use it; what happened is named at the top, beside ⟨board⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: every caret where the death\'s arm cannot re-open (D6 BM-24)' },
  'B3.death.copy': { text: 'copy the text out', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the death face\'s one act' },
  'B3.death.copied': { text: 'copied', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the status region once the death face\'s act copies the text' },
  'B3.death.ending.shown': { text: '— the words held on this device that were never sent are shown there too', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: FP-32\'s entry for the death, its clause where the shell answers the held lines under the keyless session' },
  'B3.death.ending.unshown': { text: '— the words held on this device that were never sent stay there; this version of the app shows them only in the drafts still open in this window, and not after it closes', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: FP-32\'s entry for the death, its clause on every other board' },
  'B3.death.mark': { text: 'words held on this device, never sent', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2: the keyless session\'s unnumbered mark beside its acting-as state where the held file holds lines for the board' },
  'B3.past-states': { text: 'past states', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S2, B3-S7: the corner\'s second act' },
  // B3-S3: undo and redo — the lines at the focus, each ending on the constant sentence; the passed step's ending; the
  // take-back line and its first clause alone
  'B3.undo.again': { text: '— ⟨undo chord⟩ again undoes what you did before it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: a step leaving the stack at its first reach (D6 BM-12, BM-37, BM-41)' },
  'B3.undo.public-link': { text: 'undo takes back your text, formatting and private links alone — the link you published since stands; retract it at its card', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: undo past a public link (D6 BM-42)' },
  'B3.undo.place': { text: 'the document you made since stands', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: undo past a place made (D6 BM-42)' },
  'B3.undo.published': { text: 'undo takes back your text, formatting and private links alone — these words stay public in version ⟨k⟩ of ⟨E⟩; your next version from this draft leaves them out', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: undo of words a shot published since (D6 BM-42)' },
  'B3.undo.published.beside': { text: 'undo takes back your text, formatting and private links alone — these words stay public in version ⟨k⟩ of ⟨E⟩, and this draft publishes beside version ⟨k+1⟩; to take them off what ⟨E⟩\'s readers meet, remove them in ⟨label⟩ and publish that', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: undo of words a shot published since, the draft behind the head (D6 BM-42)' },
  'B3.undo.redo-link': { text: 'links made on this link stay on it; redo makes a new one they do not reach', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: the redo of a link write (D6 BM-40)' },
  'B3.undo.base-published': { text: '⟨label⟩ was published as version ⟨k⟩ since; its past states keep the text as it stood before', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: an undo re-sending a base the draft\'s shot has passed (D6 BM-37)' },
  'B3.undo.base-published.merge': { text: '— to merge ⟨alternative⟩ with it, re-apply ⟨alternative⟩ to the head', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: a withdrawal\'s undo past the draft\'s shot (D6 BM-37)' },
  'B3.undo.taken-back': { text: 'taken back from ⟨label⟩ — ⟨redo chord⟩ puts it back', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: an overlay\'s told write taken back (D6 BM-43)' },
  'B3.undo.taken-back.cut': { text: 'taken back from ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: the take-back line cut to its first clause from a second press on (D6 BM-43)' },
  'B3.undo.none': { text: 'undo works in the text of a draft you are writing — there is nothing here to undo', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: the undo chord with no caret (D6 BM-42)' },
  'B3.undo.last-writing': { text: '— you were last writing in ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: the undo chord with no caret, a draft held (D6 BM-42)' },
  'B3.undo.constant': { text: 'a link you made public stays until you retract it at its card', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3, B3-S13: the constant sentence every undo line ends on (D6 BM-42)' },
  'B3.undo.empty': { text: 'nothing to undo in this draft this session — its past states hold what came before', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: the undo chord on an empty stack (D6 BM-42)' },
  'B3.undo.publishing': { text: 'publishing has no undo — to take a passage off what readers meet, publish the next version without it; to record the whole document as published in error, take "published in error" at its corner', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: the undo chord at an edition, beneath C-45 (D6 BM-42)' },
  'B3.undo.withheld': { text: 'the source of this passage is withheld from you now — ⟨origin⟩; the words cannot be put back by their identity', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S3: the one line where an undo\'s reinstate is refused withheld (D6 BM-11)' },
  // B3-S4: the removal — the reach before the act, the orphan line, the held document's widened face
  'B3.C-167': { text: 'readers of this draft can still reach what you remove', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S4: the deletion face at a draft, the reach before the act (C-167, PROPOSED)' },
  'B3.deletion.links': { text: '⟨N⟩ links on this passage leave the current text with it — undo, or this draft\'s past states, puts the words and the links back', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S4: the deletion face, the orphan line (D6 BM-51)' },
  'B3.deletion.links.1': { text: '1\u00a0link on this passage leaves the current text with it\u00a0— undo, or this draft’s past states, puts the words and the link back', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S4: the deletion face, the orphan line at one link (D6 BM-51)' },
  'B3.deletion.links.past': { text: '⟨N⟩ links on this passage left the current text with it — undo, or this draft\'s past states, puts the words and the links back', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S4: the orphan line in its past form, the answer landing after the burst (D6 BM-51)' },
  'B3.deletion.links.past.1': { text: '1\u00a0link on this passage left the current text with it\u00a0— undo, or this draft’s past states, puts the words and the link back', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S4: the orphan line at one link in its past form, the answer landing after the burst (D6 BM-51)' },
  'B3.deletion.links.unread': { text: 'the links on this passage could not be read — undo, or this draft\'s past states, puts back the words and any links on them', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S4: the orphan line where the preview failed (D6 BM-51)' },
  'B3.deletion.edition': { text: '⟨edition⟩ holds these words — taken out of ⟨label⟩, they leave its next version; to use them elsewhere and keep them there, copy them rather than cut', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S4: the deletion face at a held document, widened by one line' },
  // B3-S5: the paste and the quote — the faces at the act, the pick's lines, the pin's line, and at another board's
  // passage the paste's face and the quote's inert reason
  'B3.paste.changed': { text: 'these words changed in another app after you copied them — placed as new words, not the same material as ⟨source⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5: an edited paste of traced words' },
  'B3.paste.withheld': { text: 'the source of this passage is withheld from you — ⟨origin⟩; nothing can be placed from it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5: `withheld` on a source' },
  'B3.source_not_registered': { text: '⟨address⟩ — nothing this board will say about this source', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5: `source_not_registered`' },
  'B3.dangling_source': { text: 'that passage holds nothing to quote', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5: `dangling_source`' },
  'B3.quote.published': { text: 'these words are already published in ⟨E.j⟩ — window them from there', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5: a quote of words published since; B3-S11 P2: the counterpart' },
  'B3.quote.published.other': { text: 'these words are published in ⟨E.j⟩ by ⟨owner⟩ — window them from there', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5: a quote of another\'s words published since; B3-S11 P2' },
  'B3.quote.transclusion': { text: 'quote by transclusion', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5, B3-S8, B3-S13: the quote\'s act' },
  'B3.quote.copy': { text: 'quote as a copy', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5: the quote\'s pick' },
  'B3.quote.into': { text: 'quote by transclusion into ⟨label⟩, where you were writing', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5: the quote\'s pick, the draft last written in' },
  'B3.quote.into.end': { text: 'quote by transclusion into ⟨label⟩ at its end', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5: the quote\'s pick, a draft with no kept caret' },
  'B3.quote.pinned': { text: 'these words stay as you quoted them — later changes to ⟨source⟩ do not change them; its label leads to what they have become — and they are the same words, not a copy: your notes on them show in both places, and who uses this? at ⟨source⟩ finds them here', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5: the pin\'s line beneath the pick\'s rows' },
  'B3.quote.published-target': { text: 'this would place words from your draft ⟨label⟩ into a published page — it lands as the next version, staged in a draft; publishing that asks what of ⟨label⟩ goes public', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5: a quote into a published target' },
  'B3.paste.other-board': { text: 'this passage is on ⟨board⟩ — a paste from another board is not offered in this version; when it comes it places the same material here, never a copy; where the other app drops the trace, the words arrive as new bytes; to write about it, annotate it where it stands — ⟨annotate chord⟩ at its passage — or write in your own words in a document of yours — ⟨capture chord⟩ captures them from here — and tie your note to it with link to…', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5: a paste from another board, at the caret' },
  'B3.quote.other-board.inert': { text: 'quoting from another board is not offered in this version — when it comes it places the same material here, never a copy; to write about this passage, annotate it — ⟨annotate chord⟩ — or write in your own words in a document of yours — ⟨capture chord⟩ captures them from here — and tie your note to it with link to…', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S5: the quote inert at another board\'s place, its reason' },
  // B3-S6: "link to…" — the told line, the picker's lines, the faces at the act, the slot's reason with one passage held,
  // the direction in a comparison scene, the own-type row, the set line in its forms with its reach, remedy, far-end, type,
  // lineage and private-arms clauses, and the corner's item for the person's ends on words the version does not hold
  'B3.link.kept-in-set': { text: 'kept in ⟨set label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the one line where the home is out of view' },
  'B3.slot_too_large': { text: 'this selection is too large to link in one act — split it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: `slot_too_large`' },
  'B3.link.own-type': { text: '⟨label⟩ — a type of your own; what it says is its meaning', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the own-type row\'s face where it stands chosen' },
  'B3.link.own-type.row': { text: 'a type of your own — one of your documents, or a passage of yours by its address', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the picker\'s own-type row' },
  'B3.link.enter': { text: 'Enter makes nothing public here — Tab to ⟨the command⟩ to take it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: Enter at the picker where the home is published' },
  'B3.link.publicly': { text: 'link to… publicly', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the picker\'s command where the home is published' },
  'B3.link.hold-other': { text: 'hold the other passage too — open the document it is in beside this one from the address line and select it there, or find that passage first — for a note of yours, open its "in Notes on …" — select it there, open this draft beside it from the address line and select this passage again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the slot\'s reason with one passage held' },
  'B3.link.direction': { text: 'from "⟨…⟩" to "⟨…⟩"', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the direction line in a comparison scene, where no terminus stands' },
  'B3.link.set.private': { text: 'into ⟨set label⟩ — ⟨its reader chip⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the set line, its private form' },
  'B3.link.set.published': { text: 'into ⟨E⟩ — public the moment it is made, and on the record for good', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the set line, its published form, the guard at the person\'s own published page' },
  'B3.link.set.published.notebook': { text: 'into ⟨E⟩ — public the moment it is made: readable by anyone who can reach this notebook, local while it stays unbound — and on the record for good', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the set line, its published form on the unbound notebook' },
  'B3.link.reach.member': { text: 'by default it shows at every version that holds these words, an earlier one included', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the set line\'s reach at the person\'s own published page' },
  'B3.link.reach.set': { text: 'by default it shows only where ⟨set⟩ applies — ⟨set⟩ itself and every page read with it, at every version that holds these words; on any other page it is an overlay other readers switch on', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6, B3-S12: the set line\'s reach at a move into another published set of the person\'s' },
  'B3.link.reach.pick': { text: 'on the pages of this board it joins it is an overlay, off by default — other readers meet it there only by switching ⟨set⟩ on, unless a page\'s owner has that page read with ⟨set⟩ — and those owners cannot remove it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the set line\'s reach at a published set the pick names' },
  'B3.link.remedy': { text: 'retracting it takes it out of today\'s view at every version; a reader\'s "as published" switch still shows it at the versions published while it stood, beside its retraction', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the set line\'s remedy clause at a published home' },
  'B3.link.far.private': { text: '⟨document, with its owner⟩ stays private — readers see that a passage there is linked, and can read how long it is and where in that document it was written, not what it says', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the set line\'s far-end clause, the far end in a private document of the person\'s' },
  'B3.link.far.draft': { text: 'once you publish those words as new, it stays on the draft\'s earlier words and readers meet it as withheld', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the far-end clause where that document is a draft whose words a later publication publishes as new' },
  'B3.link.type.private': { text: 'typed by a private document of yours — readers see its address as their type, never what it says', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the set line\'s type clause, the type a private document of the person\'s' },
  'B3.link.lineage': { text: 'the link it replaces stays public and active, marked superseded by this one for good — retracting this one does not undo that', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6, B3-S12: the set line\'s lineage clause where the link supersedes a public link of the person\'s' },
  'B3.link.private-arms': { text: '— to keep a note on these words private, annotate them, or link from ⟨your draft⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the private arms\' clause beside the guard at the person\'s own published page' },
  'B3.link.corner.yours': { text: 'yours, on words not in this version', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S6: the corner\'s item for the person\'s own ends on words the version in view does not hold' },
  // B3-S7: the history read — the two faces, the list's rows and their marks, the steps, the put-back, the restore, the
  // rows named for what a publication, a merge, its undo, the withdrawal and the restore made
  'B3.history.busy': { text: 'history is busy — trying again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: `history_busy` at the place' },
  'B3.history.reclaimed': { text: 'this board keeps history back to ⟨floor⟩ — earlier states are not readable here', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: `history_reclaimed`, where the list ends' },
  'B3.history.corner': { text: 'kept · past states', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the corner\'s kept state with its second act' },
  'B3.history.row': { text: 'as it stood ⟨time⟩ · ⟨hand⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a row of the list of past states (D6 BM-49)' },
  'B3.history.row.not-last': { text: '· not this minute\'s last', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a row of the list, a state before the minute\'s last' },
  'B3.history.row.reading': { text: 'as it stood ⟨time⟩ · ⟨hand⟩ — reading ⟨time⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a row of the list while its state is read' },
  'B3.history.earlier': { text: '‹ earlier', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the past state\'s corner' },
  'B3.history.later': { text: 'later ›', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the past state\'s corner' },
  'B3.history.earlier-change': { text: 'its earlier change', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the list\'s step for the passage held' },
  'B3.history.next-change': { text: 'its next change', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the list\'s step for the passage held' },
  'B3.history.first': { text: 'this is the draft\'s first state', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a step past the list\'s first row' },
  'B3.history.now': { text: 'this is how the draft stands now', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a step past the list\'s last row' },
  'B3.history.passage.now': { text: 'this is how the passage stands now', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the passage\'s step past its last change' },
  'B3.history.passage.none': { text: 'the passage you hold is not in this state', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the passage held, absent from a state' },
  'B3.history.passage.part': { text: 'this state holds part of the passage — its earlier change goes further', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the passage held, in part at a state' },
  'B3.history.put-back': { text: 'put back in the current text', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a removed passage\'s act in a past state (D6 BM-49)' },
  'B3.history.put-back.caret': { text: 'put back at the caret', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a removed passage\'s act, the place gone from the current text' },
  'B3.history.make-current': { text: 'make this state current', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the past state\'s corner (D6 BM-38)' },
  'B3.history.made-current': { text: 'the current text set to this state — what came after stays in its history', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: "make this state current", before the act (D6 BM-38)' },
  'B3.history.restored': { text: '⟨label⟩ set to how it stood ⟨time⟩ — undo puts it back', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the one line after a restore (D6 BM-38)' },
  'B3.history.restored.supersedes': { text: '⟨label⟩ set to how it stood ⟨time⟩ — its next version still supersedes ⟨alternative⟩; undo puts it back', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the one line after a restore at a draft carrying a merge (D6 BM-38)' },
  'B3.history.restored.merge': { text: '⟨label⟩ set to how it stood ⟨time⟩ — a merge of ⟨alternative⟩ is still set out in it; undo puts it back', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the one line after a restore at a draft-side merge (D6 BM-38)' },
  'B3.history.read-only': { text: 'a past state is read, never edited or quoted — to bring its words into the current text, put a removed passage back, or copy it and paste', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a key or the quote at a past state\'s selection' },
  'B3.history.held': { text: 'your held text — not on the board', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the held version\'s row in the list' },
  'B3.history.published-new': { text: 'these words were published as new in ⟨E.k⟩ — shown here as they stood in your draft', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a past state holding words a shot re-minted' },
  'B3.history.links.unread': { text: 'links not read', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the past state\'s corner, its links\' read failed' },
  'B3.history.links.reading': { text: 'links — reading', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the past state\'s corner while its links are read' },
  'B3.history.links.failed': { text: 'the links on this state are not shown — reading them failed', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the past state\'s face, its links\' read failed' },
  'B3.history.kind.typed': { text: 'typed', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a row\'s kind' },
  'B3.history.kind.removed': { text: 'removed', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a row\'s kind' },
  'B3.history.kind.quoted': { text: 'quoted', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a row\'s kind' },
  'B3.history.kind.pasted': { text: 'pasted or put back', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a row\'s kind' },
  'B3.history.kind.edits': { text: 'edits', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a row\'s kind, several in one minute' },
  'B3.history.reading': { text: 'reading', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the in-flight mark at a row and the pane\'s corner' },
  'B3.history.stop': { text: 'stop', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the in-flight mark\'s act' },
  'B3.history.caveat': { text: '— this draft\'s past states name the key behind each change, or say \'unsigned\', or \'not recorded\' where this board lost it, as far back as this board keeps them', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the keyless-hand caveat\'s clause, the gesture\'s third site' },
  'B3.history.read-beside-published': { text: 'read it beside what is published now', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7, B3-S11: the daughter\'s act' },
  'B3.history.read-last': { text: 'read the last state that holds it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a dead end at a draft, the gesture\'s fourth site' },
  'B3.history.read-version': { text: 'read it in version ⟨k⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a dead end at a draft whose passage a version holds' },
  'B3.history.not-in': { text: 'the passage you hold is not in ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7, B3-S10, B3-S13: a carried passage absent from a draft' },
  'B3.history.row.version': { text: 'version ⟨k⟩ of ⟨E⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a publication\'s row in the list of past states' },
  'B3.history.row.merged': { text: 'merged ⟨alternative⟩ with version ⟨k⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a merge\'s landing\'s row' },
  'B3.history.row.merge-undone': { text: 'the merge undone', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: a merge\'s undo\'s row' },
  'B3.history.row.withdrawn': { text: 'the words kept, superseding nothing', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the withdrawal\'s row' },
  'B3.history.row.withdrawn.draft': { text: 'the words kept, as an ordinary draft', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the withdrawal\'s row at a draft side' },
  'B3.history.row.restored': { text: 'set to how it stood ⟨time⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S7: the restore\'s row' },
  // B3-S9: capture — the composer's head and its second clause, its line as it ends, the held form, the label, where
  // nothing can keep a thought, the captures record's removal line
  'B3.capture.head': { text: 'a thought — kept in ⟨captures⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S9: the composer\'s head (D6 BM-68)' },
  'B3.capture.kept-in': { text: 'kept in ⟨captures⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S9: the one line as the composer ends (D6 BM-68)' },
  'B3.capture.held': { text: 'not yet kept — held for ⟨captures⟩, sent when your notebook answers', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S9: the one line as the composer ends, the burst held (D6 BM-68)' },
  'B3.capture.label': { text: 'captures', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S9: the default document\'s label' },
  'B3.capture.no-board': { text: 'a thought is kept in a notebook of your own — no board on this machine is yours until you claim one', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S9: the chord where no board is held' },
  'B3.capture.stopped': { text: 'a first thought makes the document your thoughts are kept in, and your notebook ⟨has stopped | has halted its writes⟩ — ⟨start | restart⟩ it here, then capture', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S9: a first capture under a stopped notebook (D6 BM-59)' },
  'B3.capture.own-piece': { text: '· a piece of its own: type its first line in the address line', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S9: the composer\'s head, its second clause (D6 BM-68)' },
  'B3.capture.record-stays': { text: 'the captures record stays — it is a record of its own, not text', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S9: the deletion face at a removal across the captures record\'s run' },
  // B3-S10: the staged draft — the base's standing, the publish slot's forms, the family's names and relation labels, the
  // daughter's lines, the key record's removal line, a held document's publish slot reason
  'B3.standing.behind': { text: 'written on version ⟨k⟩ of ⟨E⟩ — version ⟨k+1⟩ published since, from ⟨A⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the corner\'s standing line, the base behind the head' },
  'B3.standing.superseded-by': { text: 'superseded by ⟨D′⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10, B3-S11: the corner at a daughter a claim supersedes' },
  'B3.standing.merged-into': { text: '— merged into version ⟨j⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the daughter line\'s clause where a claim of the person\'s names it merged' },
  'B3.standing.merged': { text: '⟨alternative⟩ is merged into version ⟨j⟩ — to bring more of its words in, paste them into ⟨label⟩ and publish that', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the daughter\'s face once merged' },
  'B3.standing.daughter': { text: 'version ⟨k+1⟩ was published from ⟨A⟩; yours stands beside it as version ⟨k.1⟩ — readers of ⟨E⟩ meet version ⟨k+1⟩; to bring these words into its next version, re-apply to the head merges them with the head\'s text for you to check before anything is published, or paste them into ⟨label⟩ and publish that', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the daughter line at a draft whose shot landed as a daughter' },
  'B3.standing.daughter-line': { text: 'published as version ⟨k.1⟩, beside version ⟨k+1⟩, the one ⟨E⟩\'s readers meet', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the line at a draft whose last shot landed as a daughter' },
  'B3.standing.moved': { text: 'version ⟨k+1⟩ of ⟨E⟩ was published from ⟨A⟩ since you looked — this version now stands beside it, as version ⟨k.1⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the standing re-typed at a publish row' },
  'B3.standing.moved.1': { text: 'version 1 of ⟨E⟩ was published from ⟨A⟩ since you looked — this version now stands beside it, as version 1.1', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the standing re-typed at a publish row, the draft begun before version 1' },
  'B3.standing.beside': { text: 'beside version ⟨k+1⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the corner\'s standing, compact' },
  'B3.standing.before-1': { text: 'begun before version 1', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the corner\'s standing, the draft begun from the bare document' },
  'B3.standing.before-1.published': { text: 'begun before version 1 — published beside it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the corner\'s standing once the shot landed beside version 1' },
  'B3.publish.new': { text: 'publish as a new document', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10, B3-S11: the corner\'s publish slot at the mint form' },
  'B3.publish.next': { text: 'publish as the next version', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10, B3-S11: the corner\'s publish slot' },
  'B3.publish.first': { text: 'publish as its first version', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the corner\'s publish slot, the chain empty' },
  'B3.publish.beside': { text: 'publish beside version ⟨k+1⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the corner\'s publish slot, the base behind the head' },
  'B3.publish.beside.1': { text: 'publish beside version 1', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the corner\'s publish slot, the draft begun before version 1' },
  'B3.publish.next.claim': { text: 'publish as the next version, with its claim', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the publish slot at a marked draft' },
  'B3.publish.origin-first': { text: 'publish ⟨origin⟩ first', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10, B3-S11 P2: a window\'s answer' },
  'B3.continue': { text: 'continue in your draft — ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the edition\'s offered act' },
  'B3.continue.bare': { text: 'continue in your draft', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10, B3-S11: the edition\'s offered act, compact' },
  'B3.continue.in': { text: 'continue in', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10, B3-S11: the act\'s label before the draft it names' },
  'B3.write-next': { text: 'write the next version in a draft', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the staging act at an edition' },
  'B3.write-first': { text: 'write its first version in a draft', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the staging act at a document with no versions' },
  'B3.family.other-drafts': { text: 'other drafts of this', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the corner\'s family pick' },
  'B3.family.alternatives': { text: 'alternatives of this', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the corner\'s family pick at a free-standing draft' },
  'B3.family.alternatives-of': { text: 'alternatives of ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the family pick\'s head' },
  'B3.family.drafts-of': { text: 'drafts of ⟨E⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the family pick\'s head at an edition\'s drafts' },
  'B3.family.from': { text: 'from ⟨time⟩ · begun from this one', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: a row of the family pick' },
  'B3.family.begun-from': { text: 'begun from ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: an alternative\'s corner' },
  'B3.family.staged-from': { text: 'a draft staged from ⟨E⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the staging draft\'s name' },
  'B3.family.your-draft': { text: 'your draft of ⟨edition⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the staging draft\'s name, read into a line' },
  'B3.family.draft-from': { text: 'a draft from ⟨time⟩ of ⟨E⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: a family draft\'s name' },
  'B3.family.alternative-of': { text: 'an alternative of ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: an alternative\'s name' },
  'B3.family.alternative.from': { text: 'an alternative of ⟨label⟩ — from ⟨time⟩, before ⟨label⟩ was published', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: an alternative\'s name once its source was published' },
  'B3.family.alternative-from': { text: 'an alternative from ⟨time⟩ of ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: an alternative\'s relation label at mid, in the box\'s rows and in the trail' },
  'B3.family.start-alternative': { text: 'start an alternative of this draft from here', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the alternative act' },
  'B3.family.edition-of': { text: 'the edition of ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10, B3-S4: an edition named by its draft' },
  'B3.family.one-beside': { text: '· 1 version beside this one', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the edition\'s corner where a daughter stands' },
  'B3.family.home-next': { text: 'the next version of ⟨your home document⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the home\'s staging draft\'s relation label' },
  'B3.family.home-first': { text: 'the first version of ⟨your home document⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the home\'s staging draft\'s relation label while the home holds no member' },
  'B3.key-record-stays': { text: 'your key record stays — it is a record of its own, not text', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the deletion face at a removal across the key record\'s run' },
  'B3.held.publish.inert': { text: '⟨label⟩ publishes by what you quote from it — ⟨edition⟩ holds the passages published so far; to publish another, quote it into a document of yours, then publish that — publishing asks what of it goes public; to take a passage off what ⟨edition⟩\'s readers meet — it stays readable at the versions that held it — select the passages it should keep, then publish them here', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10: the publish slot inert at a held document once an edition stands for it, its reason' },
  'B3.reapply': { text: 're-apply to the head', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10, B3-S11: the merge\'s act at its six sites (D6 BM-65)' },
  'B3.reapply.into': { text: 'into ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: where the merge lands, the line\'s datum' },
  'B3.reapply.new': { text: 'into a new draft', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: where the merge lands, no level draft standing' },
  'B3.reapply.open': { text: 'open as you left it, in ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge line at a draft carrying this merge' },
  'B3.reapply.merged': { text: 'merged into version ⟨j⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1, B3-S11: the re-apply act\'s datum, inert at a daughter a supersede claim of the person\'s already names' },
  'B3.reapply.reopen': { text: 'open as you left it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the re-apply act\'s outcome at the marked draft\'s own merge line, only ever a re-open' },
  'B3.reapply.open-here': { text: 'open here', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1, B3-S11: the re-apply act\'s datum, inert while the scene stands over the marked draft' },
  'B3.read-beside': { text: 'read beside', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S10, B3-S11: the daughter\'s act' },
  'B3.daughter.landed': { text: 'your home document advanced while you edited — yours landed beside it as version ⟨member⟩; re-apply it to the head?', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: where a daughter lands' },
  // B3-S11: the publish shot's panels — the reveal's statements, the sets' rows, lines and destinations, the count, the
  // commands, their refusals, re-statements and halts, the end's told line and marks — and the merge scene's lines, marks,
  // gaps, places, commands and faces, and the merge journal's label
  'B3.publish.next-public': { text: 'next: what goes public', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P1: the command' },
  'B3.publish.next-links': { text: 'next: your links on these words', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2: the command' },
  'B3.publish.next-act': { text: 'next: publish or cancel', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3: the command' },
  'B3.publish.colophon': { text: 'their colophon is published with them — the page\'s address, its hash and the date you quoted it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (i): a stated copy\'s colophon, before the act' },
  'B3.publish.family': { text: '⟨n⟩ passages first written in ⟨D⟩ publish as ⟨E⟩\'s own words; ⟨D⟩ keeps a record of where they went, and shows them as published from this version on', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (i): the statement at a draft of the edition\'s own family, whole every time' },
  'B3.publish.merges.inert': { text: 'a merge record stays private, so merges is never published\u00a0— leave these words out, or leave them private: readers see a placeholder', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (i): "publish ⟨origin⟩ first" inert at the merge journal\'s row, its reason' },
  'B3.publish.origin-first.line': { text: 'publishing these words from ⟨origin⟩ first makes them public, and they stay published whether or not ⟨label⟩ is', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (i): the publish-first row\'s line before the act' },
  'B3.publish.back': { text: 'back to publishing ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (i): the one act forward at ⟨origin⟩\'s ceremony\'s end' },
  'B3.publish.origin-first.step': { text: 'publishing ⟨origin⟩ first — then back to ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (i): the one line naming the held publication while ⟨origin⟩\'s step stands' },
  'B3.publish.back.kept': { text: 'back to publishing ⟨label⟩ — your other answers there are kept', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (i): ⟨origin⟩\'s cancel, naming where it lands' },
  'B3.publish.replaces': { text: 'this replaces the publication you were holding — its answers are not kept', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P1: a selection that ends a held publication, said as P1 opens' },
  'B3.publish.leave-private': { text: 'leave it private — readers see a placeholder', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (i): the third answer at the person\'s own unpublished origin' },
  'B3.publish.leave-private.line': { text: 'readers of version ⟨k⟩ meet a placeholder here — they see that a private passage of ⟨origin⟩ stands here, whose it is, how long it is and where in ⟨origin⟩ it was written, never what it says; version ⟨k⟩ keeps it so for good, and only a later version fills it, once those words of ⟨origin⟩ are published', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (i): the third answer\'s line before the act' },
  'B3.publish.history': { text: 'every later version of this page is public history from the moment it commits, for as long as this board retains it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (ii): public-forever forward history' },
  'B3.publish.forever': { text: 'what this publishes can never be made private again — afterwards the one remedy is a public "published in error" claim on the whole document, which leaves it readable', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (ii): the one post-act remedy, said before the act' },
  'B3.publish.stayed-private': { text: '⟨n⟩ of your links and notes on these words stayed private when version\u00a0⟨k⟩ was published; they stay private with this version\u00a0— open their sets to publish any of them with this version', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (iii): the own-links line where P3 does not stand' },
  'B3.publish.provenance': { text: 'what you typed here reads as written by you at this publication, and so do words you quoted as a copy — their colophon, published with them, says whose they were; what you windowed answers its origin', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (iv): the provenance partition' },
  'B3.publish.count': { text: 'this is one permanent public write — version ⟨k⟩ of ⟨E⟩ with ⟨l⟩ link(s) published with it, with ⟨n⟩ mark(s) of formatting published with it, with ⟨r⟩ mark(s) you took off retracted and with ⟨e⟩ mark(s) you edited published over their words as they now stand, each earlier form retracted, public the moment it commits; your draft then shows the published words', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (vii): the count, C-53\'s one write as PUB-3.8 reads it, each term dropped with its joiner at zero' },
  'B3.publish.count.claim': { text: 'version ⟨k⟩ of ⟨E⟩, with its claim naming ⟨D⟩, with ⟨l⟩ link(s) published with it,', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (vii): the count\'s version clause where the request carries its edition claim' },
  'B3.publish.count.supersede': { text: 'version\u00a0⟨k+1⟩ of ⟨D⟩, with its claim that ⟨alternative⟩ is superseded by it, with ⟨l⟩ link(s) published with it,', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (vii): the count\'s version clause at a daughter merge' },
  'B3.publish.claim-line': { text: 'its claim tells every reader of ⟨E⟩ that it was published from ⟨D⟩ — they see that draft\'s address and whose it is, never what it says', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (vii): the claim\'s line beside the count, whole every time' },
  'B3.publish.edition.new': { text: 'a new document', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S1, B3-S11: the edition named before its first publication stands, as P4\'s command names it' },
  'B3.publish.edition.minted': { text: 'the new document', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (vii): ⟨E⟩ in the claim\'s line where the shot mints it' },
  'B3.publish.formatting-line': { text: 'the formatting of these words (⟨m⟩ marks) is published with them\u00a0— and where an earlier version holds the same words, it shows there too; retracting one takes it out of today’s view at every version, one link at a time; a reader’s "as published" switch still shows it at the versions published while it stood, beside its retraction', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (1): the formatting line' },
  'B3.publish.formatting.retracted': { text: '⟨r⟩ marks you took off these words are retracted with this version\u00a0— out of today’s view at every version that shows them, and from your other documents that hold these words; a reader’s "as published" switch still shows each at the versions published while it stood', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (1): the formatting line\'s held removals, nothing at zero' },
  'B3.publish.formatting.edited': { text: '⟨e⟩ marks you edited are published over their words as they now stand, each earlier form retracted', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (1): the formatting line\'s re-made marks, nothing at zero' },
  'B3.publish.formatting.widened': { text: '; where one now also marks words an earlier version holds without it, it shows there too', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (1): the re-made marks\' clause where one now also marks words an earlier version holds without it' },
  'B3.publish.formatting.set-ends': { text: '; your formatting of these words in ⟨label⟩ ends with them', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (1): the held removals\' clause at a mark published from the person\'s formatting set' },
  'B3.publish.formatting.set-came': { text: '; ⟨f⟩ of these came from Formatting of ⟨label⟩\u00a0— their edited forms are this draft’s now', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (1): the re-made marks\' clause at marks published from the person\'s formatting set' },
  'B3.publish.formatting.run-on': { text: '⟨n⟩ of these marks run on past the last word you publish — each is published up to it, the rest staying in your draft', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (1): marks a selection\'s cut runs past' },
  'B3.publish.formatting.part': { text: '⟨n⟩ of these marks are published without the part you took off', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (1): re-made marks whose part-copy a held removal names' },
  'B3.publish.caveat.marks': { text: 'these marks may be this machine\'s writes, not yours — this board admits that write whenever local trust is on, and this surface cannot read whether it was.', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (1): C-100\'s caveat beside the formatting line, saying "marks"' },
  'B3.publish.row.switch': { text: 'publish these ⟨n⟩ links with the text — into ⟨destination⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): a private set\'s row, its switch' },
  'B3.publish.row.switch.formatting': { text: 'publish this formatting with the text\u00a0— into ⟨destination⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the switch at the person\'s formatting set' },
  'B3.publish.row.formatting-ends': { text: '— your formatting of these words in ⟨label⟩ stays while its copy stands, and ends with it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the formatting set\'s row line, its last clause' },
  'B3.publish.row.line': { text: 'public and permanent, like the text — each a fresh public link to every reader, its tie to your private original a record only ⟨set⟩\'s readers can read — anyone can tell that a private original stands behind each, never where; ⟨p⟩ of them point into ⟨private documents, each with its owner⟩, which stay private — readers see that a passage there is linked, and can read how long it is and where in that document it was written, not what it says, and, where one points at a link there rather than a passage, that a link there exists, and how many that document holds at least; ⟨d⟩ of them point at words of this draft you are not publishing — readers see that a passage of this draft is linked there, how long it is and where in your drafting it was written, not what it says — and once you publish those words as new, each stays on the draft\'s earlier words and readers meet it as withheld, its original offered again with those words and, switched on, published then whole beside this copy; ⟨c⟩ of these run on past the last word you publish — each is published up to it, the rest staying private with your draft, and is offered again when you publish the rest and, switched on, published then whole beside this part; to publish one whole, widen what you publish to its words; ⟨t⟩ of them are typed by a private document of yours — readers see its address as their type, never what it says; a public copy of each is published into ⟨destination⟩ — your originals stay in ⟨set⟩, each marked as published by its copy, and are not offered again — save ⟨c⟩\'s and ⟨d⟩\'s, as above', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): a private set\'s row line, each counted clause only above zero' },
  'B3.publish.row.notes': { text: '⟨a⟩ of them link these words to your notes, whose words stay private — readers see that each links to a note of yours, and can read how long the note is and where in ⟨set⟩ it was written, not what it says', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the row line\'s clause, in ⟨p⟩\'s place, at links to the person\'s own notes' },
  'B3.publish.row.reoffered': { text: '⟨n⟩ of these were published before — their first copies stay, and readers meet each as withheld; retract each at its card, at its mark in this draft: after publishing, a reader\'s "as published" switch still shows each at this version, beside its retraction; to keep them from this version too, cancel and retract them first; or leave this off and move each first copy\'s end publicly at its card; left off, none is offered again for these words\u00a0— to publish one later, make the link again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the counted clause at re-offered ⟨d⟩ originals' },
  'B3.publish.row.reoffered.part': { text: '⟨n⟩ of these were published before, in part — their first copies stay, and readers meet both over the words each covers; retract each at its card, at its mark in this draft: after publishing, a reader\'s "as published" switch still shows each at this version, beside its retraction; to keep them from this version too, cancel and retract them first; or leave this off and move each first copy\'s end publicly at its card; left off, none is offered again for these words\u00a0— to publish one later, make the link again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the counted clause at re-offered ⟨c⟩ originals' },
  'B3.publish.row.reoffered.notes': { text: 'annotate these words again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the re-offered clause\'s last words where the originals it counts are notes' },
  'B3.publish.row.reoffered.both': { text: 'make the link again, or annotate these words again for a note', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the re-offered clause\'s last words where it counts notes and links both' },
  'B3.publish.row.move-end': { text: '— or leave this off and move the first copy\'s end publicly at its card', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the re-offered clause\'s route at one first copy' },
  'B3.publish.row.revises': { text: '⟨u⟩ of these revise links already published — to publish the revision, revise the published copy at its page, or, where you took that copy back, make the link again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the row\'s line where its links revise links already published' },
  'B3.publish.destination': { text: '⟨E⟩ (this document — version ⟨k⟩, the one being published)', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the destination, pre-selected' },
  'B3.publish.destination.first': { text: '(version 1, the one being published)', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the destination\'s parenthetical at a first publication' },
  'B3.publish.destination.line': { text: 'in ⟨E⟩ these links are published with version ⟨k⟩ and live under its address; by default they show at every version that holds their words, an earlier one included — a reader\'s "as published" switch shows each version its own; retracting one takes it out of today\'s view at every version, one link at a time; a reader\'s "as published" switch still shows it at the versions published while it stood, beside its retraction', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the destination\'s line' },
  'B3.publish.destination.other': { text: 'another published document of yours', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the destination one pick away' },
  'B3.publish.destination.other.line': { text: 'shown at every version read with it, an earlier one included — retracting one takes it out of today\'s view at every version, one link at a time; a reader\'s "as published" switch still shows it at the versions published while it stood, beside its retraction — the link and its retraction staying on the record', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the other destination\'s line' },
  'B3.publish.destination.read-with': { text: '— and ⟨E⟩ is then read with all of ⟨S⟩: every reader of ⟨E⟩, at every version of it, sees ⟨S⟩\'s links on its words by default, its later links there too, until you retract "read ⟨E⟩ with ⟨S⟩" at ⟨E⟩\'s links card; where you retracted one before, this writes it again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the destination line\'s clause where ⟨E⟩ is not read with ⟨S⟩ now' },
  'B3.publish.row.off': { text: 'stays private — these links stay on this draft\'s earlier words; you read them on the published text through this publication\'s record, as does every reader of both ⟨set⟩ and this draft who switches ⟨set⟩ on', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the row\'s line switched off, compact after its first showing' },
  'B3.publish.no-one-else': { text: 'no one else does', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3: a reader clause\'s place where the set has no reader besides the person' },
  'B3.publish.row.off.again': { text: '— and your next version offers them again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the switched-off line\'s first showing in a session at a whole row' },
  'B3.publish.row.off.others': { text: '— and your next version offers the others again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the switched-off line\'s first showing where the row also holds re-offered originals or revisions' },
  'B3.publish.row.readers': { text: 'moves privately — read by you and ⟨reviewer⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the row\'s reader line where the set\'s readers of this draft are more than the person' },
  'B3.publish.row.on-published': { text: '⟨w⟩ of these were made on words already published — they stay on those words and show there for you — and, switched on, for every reader of ⟨set⟩: ⟨its reader chip⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the row\'s line for links made on words already published' },
  'B3.publish.row.compact': { text: '⟨set label⟩ · private · ⟨n⟩ links that stayed private when version\u00a0⟨k⟩ was published', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the fold\'s compact row' },
  'B3.publish.row.on': { text: '⟨set label⟩ on\u00a0— what it publishes is shown whole beside its switch', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the status region as a compact row is switched on' },
  'B3.publish.row.folded': { text: '⟨o⟩ more that stayed private when version\u00a0⟨k⟩ was published', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (2): the fold\'s line under a whole row\'s head' },
  'B3.publish.public.read-with': { text: '⟨E⟩ is read with ⟨S⟩ at every version — to leave it off, retract "read ⟨E⟩ with ⟨S⟩" at ⟨E⟩\'s links card, which takes ⟨S⟩ off every version', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (3): a public set\'s row where ⟨E⟩ is read with ⟨S⟩' },
  'B3.publish.public.overlay': { text: '⟨S⟩\'s links show on ⟨E⟩ as an overlay, off by default — readers meet them only by switching ⟨S⟩ on; to make them its default, read ⟨E⟩ with ⟨S⟩ at ⟨E⟩\'s links card', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (3): a public set\'s row where ⟨E⟩ is not read with ⟨S⟩' },
  'B3.publish.public.off': { text: '⟨S⟩\'s ⟨q⟩ links on the new words stay on this draft\'s earlier words — public links, pointing at text only this draft\'s readers can read — ⟨its reader chip⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (3): a public set\'s line for its links on the new words' },
  'B3.publish.public.into': { text: '⟨set⟩ publishes into ⟨S⟩, so ⟨E⟩ is read with all of ⟨S⟩ — only its ⟨q⟩ links on the new words stay behind', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3 (3): a public set\'s line where another row publishes into it' },
  'B3.publish.private-move': { text: '⟨c⟩ of your links and notes on these words stay on this draft\'s earlier words, in ⟨sets⟩, and show on the published text for you — and, switched on, for every reader of both ⟨set⟩ and this draft: ⟨its reader chip⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3: THE PRIVATE MOVE line below the rows, nothing at zero' },
  'B3.publish.others-links': { text: 'any links others made on these words stay on this draft\'s earlier words; readers who cannot read this draft meet them there, withheld', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3: the clause for every other hand\'s links on the re-inserted runs' },
  'B3.publish.own-links': { text: '⟨n⟩ of ⟨E⟩\'s own links on these words stay on this draft\'s earlier words — readers meet them as withheld, though these words are now public in version ⟨k⟩; you see each at its counterpart, marked so', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3: the line for ⟨E⟩\'s own links on the re-inserted runs' },
  'B3.publish.route': { text: 'to publish some of these and not others, move the others to another document of yours first', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3: the route line, compact after its first showing' },
  'B3.publish.venue': { text: 'readable now by anything on this machine, and nothing beyond it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the venue\'s words beneath C-32 on an unbound notebook' },
  'B3.publish.command.all': { text: 'publish all of this draft as version ⟨k⟩ of ⟨D⟩ — it can never be made private again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the one-way command, the whole draft' },
  'B3.publish.command.selected': { text: 'publish the ⟨n⟩ passages you selected as version ⟨k⟩ of ⟨D⟩ — it can never be made private again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the one-way command where a selection stands' },
  'B3.publish.command.selected.alone': { text: 'publish the ⟨n⟩ passages you selected as version ⟨k⟩ of ⟨D⟩ — it holds them alone, nothing else of version ⟨k−1⟩; it can never be made private again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the one-way command where the shot has a base the selection leaves runs of' },
  'B3.publish.command.beside': { text: 'publish all of this draft beside version ⟨k+1⟩ of ⟨D⟩, as version ⟨k.1⟩ — ⟨D⟩\'s own address keeps showing version ⟨k+1⟩; it can never be made private again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the one-way command at a draft of the family behind the head' },
  'B3.publish.origins.inert': { text: 'decide what of ⟨origin⟩ goes with this version: publish ⟨origin⟩ first, leave those words out, or keep them private — readers see a placeholder naming whose they are, how long they are and where in ⟨origin⟩ they were written', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the command inert until each origin has its answer, its reason' },
  'B3.publish.enter': { text: 'Enter publishes nothing here — Tab to ⟨the command⟩ to take it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: Enter at a panel' },
  'B3.publish.other-words': { text: 'to publish other words, cancel and select them', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P1: the selection held' },
  'B3.publish.twin.ask': { text: 'a published document of yours already holds exactly this material — ⟨P⟩; is this the edition this publication minted, or a separate document of yours?', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P1: the twin\'s pre-check at the mint form' },
  'B3.publish.unchanged': { text: 'nothing has changed since version ⟨k⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the command inert' },
  'B3.publish.held-line': { text: '⟨label⟩ holds a change the board has not confirmed — resolve it where it is marked, then publish', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the command inert while a line no resend clears stands (D6 BM-64)' },
  'B3.publish.race': { text: 'the words you chose have moved in your draft since you looked — here is what this version now publishes', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the re-statement at a kept place moved' },
  'B3.publish.race.links': { text: '⟨n⟩ of these lie on words since edited in your draft — they are published on the words you linked', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the re-statement\'s links clause' },
  'B3.publish.restated': { text: 'this changed since you confirmed — here is what this version now publishes', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the re-statement, the race this window\'s' },
  'B3.publish.restated.device': { text: 'this changed on another device since you confirmed — here is what this version now publishes', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the re-statement, the race another device\'s' },
  'B3.publish.over-cap': { text: 'this is more than one publication can carry — publish it in parts', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: `over_cap`' },
  'B3.publish.cap.links': { text: '⟨n⟩ links is more than one version can publish at once\u00a0— switch some sets off, or publish the rest with your next version, which lists them as having stayed private at this one', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P3: the links list past its cap' },
  'B3.publish.cap.marks': { text: '⟨n⟩ marks is more than one version can publish at once — publish part of these words now, and the rest with your next version', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2: the formatting line past its cap' },
  'B3.publish.twin': { text: 'these words are already published as version ⟨k⟩ — reload this draft, and publish again only what you have changed since', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the twin read as the acknowledgment' },
  'B3.publish.twin.act': { text: 'reload this draft', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the twin face\'s act' },
  'B3.publish.older-board': { text: '⟨board⟩ refused this publication\'s form — it may run an older skep than this client; nothing was published', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: `older_board`' },
  'B3.publish.not-owner': { text: '⟨D⟩ is not yours — a publication keeps its records in the draft it was staged in; publish from a draft of your own', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: `unowned_draft`' },
  'B3.publish.busy.reading': { text: 'the board is busy — reading again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: `budget_race` at the panel\'s reads' },
  'B3.publish.busy': { text: 'the board is busy — nothing was published; publish again in a moment', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: `budget_race` at the act' },
  'B3.publish.may-stand': { text: 'this publication may already stand — look at your published documents before you publish it again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the lost acknowledgment\'s halt at the mint form' },
  'B3.publish.beside-line': { text: 'this version stands beside version ⟨k+1⟩ as version ⟨k.1⟩ — readers of ⟨E⟩ meet version ⟨k+1⟩, not this', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2: the reveal at a base behind the head' },
  'B3.publish.beside-line.act': { text: '— to bring these words into what ⟨E⟩\'s readers meet, cancel and re-apply to the head', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2: the reveal at a base behind the head, its act' },
  'B3.publish.earlier-version': { text: '⟨labels⟩ were written on an earlier version than this — what you publish from them next stands beside this one', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2: the family drafts left behind' },
  'B3.publish.behind': { text: 'this publishes all of this draft as version ⟨k+1⟩ of ⟨D⟩ — ⟨label⟩ stays as it is, written on an earlier version than this', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the merge draft\'s command, a family draft behind' },
  'B3.publish.merge-kept': { text: '· this merge’s record kept in "merges"', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P5: the transient segment after the member\'s address at a merge\'s end' },
  'B3.publish.merge-kept.first': { text: '· this merge’s record kept in "merges", made now to keep a private record of each merge you publish', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P5: the transient segment at the person\'s first merge, which mints the journal' },
  'B3.publish.placeholder-mark': { text: 'in version ⟨k⟩ as a placeholder — withheld for its readers', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P5: the master\'s mark on a run the third answer left windowing a private origin' },
  'B3.publish.published-as': { text: 'published as ⟨copy⟩ in ⟨destination⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P5, B3-S12: the original\'s line in the "which" list and at the card' },
  'B3.publish.published-as.version': { text: 'published as ⟨copy⟩ in ⟨destination⟩ with version ⟨j⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P5, B3-S12: the original\'s line where key (iii)\'s save has published it twice, once per copy' },
  'B3.publish.copy-row': { text: 'in ⟨destination⟩ (published)', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: an accept\'s copy\'s row, named by its home' },
  'B3.publish.copy-row.version': { text: 'in ⟨destination⟩ (published with version ⟨j⟩)', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P5, B3-S12: each copy\'s row where the original is published twice' },
  'B3.publish.counterpart.backward': { text: 'on version ⟨k⟩\'s words — shown here at ⟨D⟩\'s earlier words they were published from', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P5: the anatomy line at a counterpart drawn backward, for B1-S5' },
  'B3.merge.composing': { text: 'composing the merge — nothing you type goes in until it opens', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge slot running from the press (D6 BM-65)' },
  'B3.merge.moved': { text: '⟨into⟩ changed as the merge was composed — nothing was merged', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the landing refused `arrangement_moved` (D6 BM-66)' },
  'B3.merge.side-moved': { text: '⟨label⟩ changed after this merge was set out — to merge what it holds now,', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a side that has moved, before the act (D6 BM-66)' },
  'B3.merge.undone': { text: 'nothing is published — the merge is undone: ⟨into⟩ is as it was before it, and ⟨alternative⟩ stands', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the landing\'s undo (D6 BM-35)' },
  'B3.merge.undone.new': { text: 'nothing is published — the merge is undone: ⟨into⟩ keeps version ⟨k⟩\'s text and stays; your unpublished changes are in ⟨label⟩, and ⟨alternative⟩ stands', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the landing\'s undo at a new draft (D6 BM-35)' },
  'B3.merge.landed': { text: 'nothing is published — ⟨into⟩ now holds ⟨alternative⟩\'s changes on version ⟨k⟩\'s text, and ⟨alternative⟩ stands, which ⟨into⟩\'s next version supersedes for good; undo there undoes the merge while this session lasts — after it, "keep the words, supersede nothing" at ⟨into⟩\'s corner ends the superseding, and making ⟨into⟩\'s state before the merge current, in its past states, takes the words out; both undo it whole', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s leave line' },
  'B3.merge.landed.draft': { text: 'nothing is published\u00a0— ⟨into⟩ now holds version\u00a0⟨k⟩’s text with the changes from ⟨label⟩, which stays as it is; undo in ⟨into⟩ undoes the merge while this session lasts\u00a0— after it, making ⟨into⟩’s state before the merge current, in its past states, takes the words out', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s leave line at a draft side' },
  'B3.merge.scene.caption': { text: 'merging ⟨alternative⟩ with version ⟨k⟩ of ⟨D⟩ in ⟨into⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s name (D6 BM-65)' },
  'B3.merge.scene.line': { text: 'merging ⟨alternative⟩ with version ⟨k⟩ of ⟨D⟩ in ⟨into⟩ — it now holds the head\'s text and ⟨alternative⟩\'s, together; undo there undoes the merge while this session lasts, and its past states keep it as it was; what needs a choice is listed first', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s entry line (D6 BM-65)' },
  'B3.merge.scene.line.new': { text: 'merging ⟨alternative⟩ with version ⟨k⟩ of ⟨D⟩ in a new draft, ⟨into⟩ — the head\'s text and ⟨alternative⟩\'s, together; ⟨into⟩ stays — you can remove its words, never the document; ⟨label⟩ keeps your unpublished changes as you left them — after this version is published, re-apply ⟨label⟩ to the head from its corner, or read it beside ⟨into⟩ and paste them in; what needs a choice is listed first', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s entry line at a new draft (D6 BM-65)' },
  'B3.merge.scene.line.draft': { text: 'merging ⟨label⟩ with version\u00a0⟨k⟩ of ⟨D⟩ in ⟨into⟩\u00a0— it now holds version\u00a0⟨k⟩’s text with the changes from ⟨label⟩, which stays as it is; undo in ⟨into⟩ undoes the merge while this session lasts, and its past states keep it as it was; what needs a choice is listed first', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s entry line at a draft side, into the existing level draft, nothing minted' },
  'B3.merge.scene.line.draft.new': { text: 'merging ⟨label⟩ with version\u00a0⟨k⟩ of ⟨D⟩ in a new draft, ⟨into⟩\u00a0— it holds version\u00a0⟨k⟩’s text with the changes from ⟨label⟩, which stays as it is; ⟨into⟩ stays\u00a0— you can remove its words, never the document; what needs a choice is listed first', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s entry line at a draft side, into a new draft where no draft stands level' },
  'B3.merge.scene.line.draft.beside': { text: 'merging ⟨label⟩ with version\u00a0⟨k⟩ of ⟨D⟩ in a new draft, ⟨into⟩\u00a0— it holds version\u00a0⟨k⟩’s text with the changes from ⟨label⟩, which stays as it is; ⟨into⟩ stays\u00a0— you can remove its words, never the document; ⟨level⟩ keeps its unpublished changes as you left them\u00a0— after this version is published, re-apply ⟨level⟩ to the head from its corner, or read it beside ⟨into⟩ and paste them in; what needs a choice is listed first', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s entry line at a draft side, into a new draft beside a draft in progress' },
  'B3.merge.brings': { text: 'what it brings from ⟨alternative⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s marks (D6 BM-65)' },
  'B3.merge.brings.version': { text: 'what it brings from version ⟨k⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s marks at a draft side' },
  'B3.merge.brings.draft': { text: 'what it brings from ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s marks at a draft side' },
  'B3.merge.removes': { text: 'what this version removes from ⟨D⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s marks (D6 BM-65)' },
  'B3.merge.leaves-out': { text: 'what this version leaves out of ⟨alternative⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s marks' },
  'B3.merge.leaves-out.draft': { text: 'what this version leaves out of ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s marks at a draft side' },
  'B3.merge.show.side': { text: 'show version ⟨k.m⟩ here', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s left pane, its act' },
  'B3.merge.show.head': { text: 'show version ⟨k⟩ here', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s left pane, its act' },
  'B3.merge.show.draft': { text: 'show ⟨label⟩ here', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s left pane at a draft side, its act' },
  'B3.merge.pane.head': { text: 'version ⟨k⟩ · as published now', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s left pane, its name' },
  'B3.merge.pane.side': { text: 'version ⟨k.m⟩ · beside version ⟨k⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s left pane, its name' },
  'B3.merge.pane.draft': { text: '⟨label⟩ · as merged', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge scene\'s left pane at a draft side, its name' },
  'B3.merge.write-in': { text: 'write in ⟨into⟩ — the right pane', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a key in the merge scene\'s left pane' },
  'B3.merge.shown-as-merged': { text: '⟨label⟩ is shown here as it was merged — write in ⟨into⟩, the right pane', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a key in the merge scene\'s left pane at a draft side' },
  'B3.merge.withdraw': { text: 'keep the words, supersede nothing', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the withdrawal at a marked draft\'s merge line (D6 BM-36)' },
  'B3.merge.withdraw.draft': { text: 'keep the words, end the merge', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the withdrawal at a draft-side merge (D6 BM-36)' },
  'B3.merge.withdrawn': { text: '⟨into⟩ supersedes nothing now — its words stay as they are, its next version the ordinary one, and ⟨alternative⟩ stands, unmarked; undo makes it supersede ⟨alternative⟩ again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the one line after the withdrawal (D6 BM-36)' },
  'B3.merge.withdrawn.draft': { text: '⟨into⟩ is an ordinary draft now — its words stay as they are, its next version the ordinary one, and ⟨label⟩ stands as it is; undo sets the merge out again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the one line after a draft-side withdrawal (D6 BM-36)' },
  'B3.merge.line.merged': { text: '⟨alternative⟩ is merged — version ⟨j⟩ of ⟨D⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge line once the version is published' },
  'B3.merge.line.none': { text: 'nothing is merged in ⟨into⟩ now', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge line once the marker is cleared' },
  'B3.merge.line.withdrawn': { text: '⟨into⟩ supersedes nothing now — ⟨alternative⟩ stands, unmarked', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge line after the withdrawal, compact' },
  'B3.merge.line.withdrawn.draft': { text: '⟨into⟩ is an ordinary draft now — ⟨label⟩ stands as it is', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge line after a draft-side withdrawal, compact' },
  'B3.merge.line.draft-in': { text: '⟨label⟩\'s changes are in version ⟨j⟩ of ⟨D⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge line at a draft side once the version is published' },
  'B3.merge.line.set-out': { text: 'a merge of ⟨label⟩ is set out here', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge line at a draft-side merge' },
  'B3.merge.line.supersedes': { text: 'supersedes ⟨alternative⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merged member\'s corner, among the claims about the whole document, for every reader of the version' },
  'B3.merge.open-here': { text: 'this merge is open here — its places are listed beside the text', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the re-apply act\'s reason, inert while the scene stands over the marked draft' },
  'B3.merge.set-out-on': { text: 'this merge was set out on version ⟨k⟩ — to merge ⟨alternative⟩ with version ⟨k+1⟩,', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge line where the head has moved since, before its act' },
  'B3.merge.head-published': { text: 'version ⟨k+1⟩ of ⟨D⟩ was published since this merge was set out — to merge ⟨alternative⟩ with it, re-apply to the head', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the landing refused `head_moved`' },
  'B3.merge.whole': { text: 'a merge is published whole — all of this draft, not the passages you selected', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P1: a selection at a marked draft' },
  'B3.merge.whole.cancel': { text: 'a merge is published whole — to change a place, cancel; the merge stays open, its places marked', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2: the reveal at a marked draft' },
  'B3.merge.no-claim': { text: 'it carries no claim — ⟨alternative⟩ is not marked superseded, and this draft\'s merge ends with it; to merge ⟨alternative⟩ with version ⟨k+1⟩, cancel and re-apply to the head', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the command at a marked draft behind the head' },
  'B3.merge.gained': { text: '— what ⟨label⟩ gained since this merge was set out stays in it, out of this version', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2: the reveal at a draft-side merge whose side moved' },
  'B3.merge.before-1': { text: 'this draft was begun before version 1, so what it changed cannot yet be told from what version 1 added — to bring its words in, paste them into ⟨label⟩ and publish that', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge\'s act at a draft begun before version 1' },
  'B3.merge.before-1.version': { text: 'this version was begun before version 1, so what it changed cannot yet be told from what version 1 added — to bring its words in, paste them into ⟨label⟩ and publish that', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge\'s act at version 1.1' },
  'B3.merge.gap.order': { text: 'words were added here on both sides — version ⟨k⟩\'s first, then ⟨alternative⟩\'s; keep this order or swap them', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a gap of the order kind' },
  'B3.merge.gap.cut': { text: 'what ⟨side⟩ added here was written into words ⟨other side⟩ removed — placed after "⟨words⟩"; place it elsewhere, or leave it out', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a gap of the corner or cut kind' },
  'B3.merge.gap.corner': { text: '⟨side⟩ wrote this where ⟨words⟩ met ⟨words⟩, which ⟨other side⟩ moved apart — placed after the first; put it after the second if that is where it belongs', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a gap of the corner kind, both anchors moved apart' },
  'B3.merge.gap.corner.act': { text: 'move it after ⟨words⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a corner gap\'s act' },
  'B3.merge.gap.collision': { text: '⟨alternative⟩ and version ⟨k⟩ each rewrote ⟨words⟩ — both rewrites are here, version ⟨k⟩\'s first; keep one, keep both, or write it again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a gap of the collision kind' },
  'B3.merge.gap.keep.head': { text: 'keep version ⟨k⟩\'s', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a collision gap\'s act' },
  'B3.merge.gap.keep.side': { text: 'keep ⟨alternative⟩\'s', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a collision gap\'s act' },
  'B3.merge.gap.moves': { text: '⟨alternative⟩ and version ⟨k⟩ each moved ⟨words⟩ — placed as ⟨side⟩ ordered them; keep this order or take ⟨other side⟩\'s', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a gap of the moves kind' },
  'B3.merge.gap.moves.act': { text: 'take ⟨other side⟩\'s order', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a moves gap\'s act' },
  'B3.merge.gap.anchor.after': { text: 'kept after ⟨words⟩ — the words that followed it were removed in ⟨other side⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a gap of the anchor kind, settled by the rules' },
  'B3.merge.gap.anchor.before': { text: 'kept before ⟨words⟩ — the words before it were removed in ⟨other side⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a gap of the anchor kind, settled by the rules' },
  'B3.merge.gap.same': { text: 'matching words were added on both sides — kept once, as ⟨side⟩ has them; ⟨other side⟩\'s stay in ⟨other side⟩, and any links on them stay there, not carried to version ⟨k+1⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: words matching by value on both sides' },
  'B3.merge.records': { text: 'merges', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the merge journal\'s label; B3-S1: its publish slot\'s reason; B3-S11 P5: the told line\'s LEAP' },
  'B3.merge.record.merged': { text: '⟨alternative⟩ merged into version ⟨j⟩ of ⟨D⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a merge record\'s line' },
  'B3.merge.record.unmerged': { text: '⟨alternative⟩ with version ⟨k⟩ of ⟨D⟩ — not merged', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: a merge record\'s line, the merge taken back' },
  'B3.merge.line.head': { text: 'its next version supersedes ⟨alternative⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the marked draft\'s merge line at the head, its datum' },
  'B3.merge.slot.draft': { text: 'publish all of it as the next version', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the corner\'s publish slot at a draft side carrying this merge' },
  'B3.merge.undo.inherited': { text: 'nothing to undo: this draft inherited the merge when it was staged; discard it or edit it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the undo at a draft that inherited its merge when it was staged' },
  'B3.merge.no-claim.draft': { text: 'this draft\'s merge ends with it; to merge ⟨label⟩ with version ⟨k+1⟩, cancel and re-apply to the head', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2 (vi): the clause at a behind draft carrying a draft-side merge' },
  'B3.merge.behind.ending': { text: '— ⟨alternative⟩ is not marked superseded; it can never be made private again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the behind form\'s ending at a marked draft' },
  'B3.merge.statement': { text: 'this publishes all of this draft as version\u00a0⟨k+1⟩ of ⟨D⟩\u00a0— ⟨alternative⟩ stays readable at its own address and is marked superseded by it for good; to publish these words with no such mark, cancel and take "keep the words, supersede nothing" at this draft’s corner first', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2: the merge\'s statement before the act, whole every time' },
  'B3.merge.places': { text: '⟨n⟩ places stand as the merge placed them:', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2: the head of the places left at their defaults' },
  'B3.merge.placed.order': { text: 'version ⟨k⟩\'s first', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2: an ORDER place, as placed' },
  'B3.merge.placed.after': { text: 'after "⟨words⟩"', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2: a CORNER or CUT place, as placed' },
  'B3.merge.placed.both': { text: 'both, version ⟨k⟩\'s first', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2: a COLLISION place, as placed' },
  'B3.merge.placed.moves': { text: 'as ⟨side⟩ ordered them', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P2: a MOVES place, as placed' },
  'B3.merge.command': { text: 'publish all of this draft as version ⟨k+1⟩ of ⟨D⟩ — ⟨alternative⟩ stays readable at its own address and is marked superseded by it for good — nothing of yours takes that mark back; it can never be made private again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11 P4: the merge\'s one-way command' },
  'B3.merge.cap': { text: '⟨alternative⟩ merged with version ⟨k⟩ would be in more pieces than one publication can carry — ⟨n⟩, where ⟨cap⟩ is the most; nothing was merged. To bring its words in, paste them into ⟨label⟩ — retyping a passage there as new words joins its pieces, at the cost of the links on them', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S11: the re-apply act\'s face where compose answers OverCap' },
  // B3-S12: the acts on the person's own links at the anatomy card, and the faces at the act — the retract line in its
  // forms, the move's lines, the card's "link to…" reasons and the remedy's confirmation
  'B3.card.highlight': { text: 'a highlight is taken off at its card — click it, then retract', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: Delete at a highlight of the person\'s own' },
  'B3.bad_target': { text: 'nothing to retract here', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: `bad_target`' },
  'B3.original_not_resident': { text: 'no link there — or none you may see', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: `original_not_resident`' },
  'B3.card.retract': { text: 'retract this', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the anatomy card\'s act' },
  'B3.card.retracting': { text: 'retracting takes this link out of view — its record stays, and so does the retraction', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the retraction\'s face, before the act' },
  'B3.card.edit': { text: 'edit this link', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the anatomy card\'s act' },
  'B3.card.retype': { text: 'retype publicly', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the edit\'s command at a public link' },
  'B3.card.retype.note': { text: 'retyping makes a new link of that type beside this one, marked as its successor — this one stays, with its type, until you retract it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the retype, before the act' },
  'B3.card.move-end': { text: 'move this end to the selection', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the anatomy card\'s act' },
  'B3.card.move-end.publicly': { text: 'move this end publicly', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the move\'s command at a public link' },
  'B3.card.move-end.select': { text: 'select the words this end should cover, then take this act', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the move with no selection' },
  'B3.card.move-end.note': { text: 'this makes a new link on the words you selected, marked as this one\'s successor — this one stays on its old words until you retract it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the move, before the act' },
  'B3.card.split': { text: 'this link\'s words are split here — what stands between them is not on it; take this to move the link onto the words as they now stand', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the split\'s mark at a link whose end projects into several ranges' },
  'B3.card.move-to': { text: 'move this link to ⟨set⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12, B3-S13: the anatomy card\'s act' },
  'B3.card.move.publicly': { text: 'move this link publicly', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the move to another set at a public link' },
  'B3.card.supersedes': { text: 'supersedes ⟨original⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: a successor\'s card' },
  'B3.card.superseded-by': { text: 'superseded by ⟨successor⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: an original\'s card' },
  'B3.card.link-to.inert': { text: 'hold the other passage too — select it in the other pane, then open this card again at its symbol', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: "link to…" from the card with one passage held' },
  'B3.card.retracted-state': { text: 'retracted since — this state shows it as it stood', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12, B3-S7: a retracted link at a past state' },
  'B3.card.in-error.by': { text: 'marked published in error by ⟨claimant⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the edition\'s corner once the claim stands' },
  'B3.card.retract.line': { text: 'retracting takes this link out of today\'s view, at every version — the link\'s record stays, and so does the retraction, at ⟨the target⟩\'s history; a reader\'s "as published" switch still shows it at the versions published while it stood, beside its retraction', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the retract line before the act, at a link with an end on words a version holds' },
  'B3.card.retract.reader': { text: 'the "as published" switch of whoever reads ⟨set label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the retract line\'s switch at a private home, in "a reader\'s" place' },
  'B3.card.retract.public': { text: 'and this retraction is public, like the link', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the retract line\'s clause at a link homed in a published document of the person\'s' },
  'B3.card.retract.copy': { text: 'your private original stays where it is and still shows for you\u00a0— it is not offered at your next version, save at the version that first publishes words of it this copy does not reach; to publish it again otherwise, make the link again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the retract line at an accept\'s copy whose original key (iii)\'s save may offer again' },
  'B3.card.retract.copy.again': { text: '; to publish it again, make the link again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the accept\'s copy\'s tail where no save clause is drawn' },
  'B3.card.retract.copy.other': { text: '; its other copy, in ⟨destination⟩, covers its words, and every reader still meets it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the accept\'s copy\'s tail where a second copy of its original stands' },
  'B3.card.retract.rest': { text: '— its part on words ⟨label⟩ has not yet published stays there', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the retract line at a copy of the formatting types whose original has a rest' },
  'B3.card.retract.set': { text: '— your formatting of these words in ⟨label⟩ ends with it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the retract line at a copy published from the person\'s formatting set' },
  'B3.card.retract.set.rest': { text: '— your formatting of these words in ⟨label⟩ ends with it; on words you never published, it stays', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the retract line at a copy published from the person\'s formatting set where a rest stands' },
  'B3.card.retract.note-copy': { text: 'to publish the note again otherwise, annotate these words again — your next version offers that new note, its words private as this one\'s are, and you see both until you retract the original', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the retract line\'s last clause at the copy of a note' },
  'B3.card.retract.note-original': { text: 'your published copy stays in ⟨destination⟩ and every reader still meets it — to take it back, retract it at its own card', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the retract line at a note\'s private original while its copy stands' },
  'B3.card.retract.note-original.two': { text: 'your published copies stay, in ⟨destination⟩ with version ⟨j⟩ and in ⟨destination⟩ with version ⟨j′⟩, and every reader still meets both — to take one back, retract it at its own card', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the retract line at a note\'s private original published twice' },
  'B3.card.retract.note': { text: '— your note stays in ⟨label⟩ as words of its own, tied to no passage once this goes', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the retract line\'s clause at an annotation link' },
  'B3.card.move.readers': { text: '⟨readers⟩ read ⟨destination⟩ and will see that ⟨source⟩ holds this link, and what it says', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the move\'s line between two private sets shared with different readers' },
  'B3.card.move.public': { text: 'a copy goes into ⟨set⟩ — the original stays public in ⟨its set⟩, and every reader still meets it, until you retract it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the move\'s line at a public original' },
  'B3.card.move.public.superseded': { text: '— and from now on marked superseded by the copy, for good, whatever you retract later', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the move\'s clause where ⟨set⟩ is published' },
  'B3.card.link-to.inert.beside': { text: 'hold the other passage too — open the document it is in beside this one from the address line, select it there, then open this card again at its symbol', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: "link to…" from the card with one passage held, no scene standing' },
  'B3.card.link-to.peek': { text: 'then peek at the passage\'s links and open this card again at its symbol', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: the reason\'s last clause at a link the view draws only in a peek' },
  'B3.card.in-error.confirm': { text: 'this files a public claim that ⟨E⟩ was published in error — the claim names the whole document, not this version — permanent, never withdrawn, and supersedable — and only ⟨claimant⟩ can supersede it, so if you lose every key nothing lifts it, ever. It reveals nothing back: ⟨E⟩ stays readable. For a wrong passage in a document that is otherwise right, publish its next version without the passage — it leaves what every reader meets and stays readable at this version, forever', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S12: C-58\'s confirmation, its FACE rendering' },
  // B3-S13: the selection's acts at a draft — the row's one reason, the surface-wide reasons, the swallow's forms, the formatting
  // chords, the format strip, the typing style and the spoken outcomes; the person's formatting set — its label, its told
  // lines, its card, the menus' hand line and show items, the refusal at another hand's mark, the precedence lines — and
  // every writing act where no notebook stands, with the claim's end's way back
  'B3.row.held.resend': { text: '⟨label⟩ holds words the board has not kept — this can be taken once it has; its corner says why', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the row inert where a resend follows (D6 BM-62)' },
  'B3.row.held.resolve': { text: '⟨label⟩ holds words the board has not kept — resolve them where they are marked, then take this', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the row inert where an act of the person\'s comes first (D6 BM-62)' },
  'B3.keyless': { text: 'writing needs your key — this session reads your notebook and keeps nothing you type', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13, B3-S9: every caret and writing act in the bare session (D6 BM-58)' },
  'B3.stopped.act': { text: '⟨the act\'s object⟩ is not held on this device as typing is, and your notebook ⟨has stopped | has halted its writes⟩ — ⟨start | restart⟩ it here, then ⟨the act⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: an act the store cannot hold under a stopped notebook (D6 BM-59)' },
  'B3.row.follow.inert': { text: 'select the passage to follow its link or its source', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: follow and read side by side inert at a draft\'s selection' },
  'B3.row.no-link': { text: 'no link is drawn at this passage — to read another document beside this one, open it beside from the address line', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: read side by side at a passage with no link' },
  'B3.row.others-document': { text: 'this is ⟨owner⟩\'s document — to write about a passage here, select it, then annotate: ⟨annotate chord⟩, or link to it from a document of yours', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a key typed at another\'s document' },
  'B3.notes.label': { text: 'Notes on ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13, B3-S6: the notes document\'s label' },
  'B3.notes.kept': { text: 'a note — kept in Notes on ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the composer\'s head at annotate' },
  'B3.notes.home': { text: 'in Notes on ⟨draft⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the note\'s card, naming its home' },
  'B3.format.carried': { text: '⟨E⟩ is published — formatting is made here, in your draft: ⟨chord⟩ again marks these words', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a formatting chord at a carried selection\'s landing' },
  'B3.format.again': { text: '⟨chord⟩ again marks these words', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the landing line\'s formatting clause' },
  'B3.format.again.off': { text: '⟨chord⟩ again takes its mark off them', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the landing line\'s formatting clause where the words already carry the chord\'s mark' },
  'B3.format.held': { text: 'taken off with your next version of these words', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the chord\'s face where a removal is held' },
  'B3.format.taken-off': { text: 'taken off with version\u00a0⟨k⟩\u00a0— out of today’s view at every version, and on the record for good: a reader’s "as published" switch still shows it at the versions published while it stood; putting it back makes a new mark, published with your next version', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the chord\'s face at a spent removal' },
  'B3.format.unseen': { text: 'readers of ⟨E⟩ do not see it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a mark in the person\'s formatting set, beside it in the smallest type at the first such mark in a session' },
  'B3.format.kept.set': { text: 'kept in Formatting of ⟨label⟩\u00a0— only you see it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the format strip\'s head at text the person may read and not write; the one line as a formatting act at an edition\'s words lands in the person\'s formatting set' },
  'B3.format.kept.set.compact': { text: 'kept in Formatting of ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the one line after a formatting act lands in the person\'s formatting set, after the first in a session' },
  'B3.format.kept.set.made': { text: 'kept in Formatting of ⟨label⟩, made for it\u00a0—', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the one line where the formatting act mints the person\'s formatting set, before its tail' },
  'B3.format.in.set': { text: 'in Formatting of ⟨label⟩ (private)', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a mark\'s set at its card' },
  'B3.format.taken-off.set': { text: 'taken off in Formatting of ⟨E⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the one line after a mark is taken off in the person\'s formatting set' },
  'B3.format.set.label': { text: 'Formatting of ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the person\'s formatting set\'s label' },
  'B3.format.kept.set.others': { text: 'kept in Formatting of ⟨label⟩\u00a0— only you see it; ⟨owner⟩’s document is unchanged', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the one line at the first formatting act at another\'s document in a session' },
  'B3.format.said.set': { text: '⟨form⟩ for you\u00a0— “⟨first words⟩”, in Formatting of ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the status region at a formatting act written into the person\'s formatting set' },
  'B3.format.take-it-off': { text: 'take it off', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the mark\'s card\'s act at a mark in the person\'s formatting set' },
  'B3.format.card.on': { text: 'on ⟨its words⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the card\'s line naming a one-sided link\'s words' },
  'B3.format.precedence': { text: 'where these sets’ formatting differs, yours is drawn, then ⟨owner⟩’s, then the rest in this list’s order', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the card where two sets\' formatting differs in view' },
  'B3.format.precedence.yours': { text: 'yours\u00a0— drawn over ⟨owner⟩’s where they differ', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the card\'s row for the person\'s own formatting' },
  'B3.format.stands': { text: '⟨hand⟩’s ⟨form⟩ stands\u00a0— to read without it, switch off ⟨hand⟩’s formatting', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a formatting act at another hand\'s mark of that form, at the focus' },
  'B3.format.switch-off': { text: 'switch it off', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: that line\'s act' },
  'B3.format.hand': { text: '⟨form⟩\u00a0— ⟨owner⟩’s', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the context menu\'s Format section at text the person reads, each form with its hand' },
  'B3.format.show.owner': { text: 'show ⟨owner⟩’s formatting', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the context menu\'s and the View menu\'s item for the document\'s own formatting' },
  'B3.format.show.yours': { text: 'show your formatting', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the context menu\'s and the View menu\'s item for the person\'s formatting' },
  'B3.format.slot.others': { text: 'format for you\u00a0— the selection', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the selection row\'s act at text the person may read and not write' },
  'B3.format.slot.others.focus': { text: 'format for you\u00a0— “⟨first words⟩”', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the selection row\'s act there at the walk\'s focus' },
  'B3.format.slot': { text: 'format…', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the selection row\'s act at its end' },
  'B3.format.strip.selection': { text: 'format — the selection', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the format strip\'s label at a selection' },
  'B3.format.strip.focus': { text: 'format — “⟨first words⟩”', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the format strip\'s label at the walk\'s focus' },
  'B3.format.strip.caret': { text: 'format — what you type next', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the format strip\'s label at a bare caret' },
  'B3.format.bold': { text: 'bold', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the format strip\'s act; every place that names the form' },
  'B3.format.italic': { text: 'italic', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the format strip\'s act; every place that names the form' },
  'B3.format.code': { text: 'code', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the format strip\'s act; every place that names the form' },
  'B3.format.strikethrough': { text: 'strikethrough', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the format strip\'s act; every place that names the form' },
  'B3.format.subscript': { text: 'subscript', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the format strip\'s act; every place that names the form' },
  'B3.format.superscript': { text: 'superscript', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the format strip\'s act; every place that names the form' },
  'B3.format.paragraph': { text: 'paragraph', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the format strip\'s heading group; the held cycle\'s level; every place that names the form' },
  'B3.format.heading': { text: 'heading ⟨n⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the format strip\'s heading group; the held cycle\'s level; every place that names the form' },
  'B3.format.levels-differ': { text: 'levels differ', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the format strip\'s heading group where its blocks\' levels differ' },
  'B3.format.underline': { text: 'there is no underline here — to emphasise words, ⟨italic⟩: ⟨Mod+I⟩, or ⟨bold⟩: ⟨Mod+B⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: Mod+U at the focus, whole at the first press in a session' },
  'B3.format.underline.compact': { text: 'no underline', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: Mod+U at the focus, compact' },
  'B3.format.not-a-form': { text: 'that is not a form this editor makes — its forms are under format… at a selection, and in the Format menu', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a format input the engine offers that this editor does not make, at the focus' },
  'B3.format.cycle': { text: '⟨level⟩ — let go to set it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the held cycle\'s level at the focus, whole at the first use in a session' },
  'B3.format.style.on': { text: '⟨form⟩ — what you type next; ⟨its chord or act⟩ again stops it', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the typing style\'s line at the focus' },
  'B3.format.style.off': { text: 'not ⟨form⟩ — what you type next', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the typing style\'s line at the focus, a form left off' },
  'B3.format.style.inside': { text: '; the ⟨form⟩ either side stays', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the typing style\'s line inside a mark, its added clause' },
  'B3.format.style.on.compact': { text: '⟨form⟩ next', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the typing style\'s line, compact' },
  'B3.format.style.off.compact': { text: 'not ⟨form⟩ next', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the typing style\'s line, a form left off, compact' },
  'B3.format.style.unkept': { text: '⟨board⟩ has not kept these words, so their ⟨form⟩ is not made — once it has, select them and apply ⟨form⟩ again', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the focus where a hold answers in place of the ack a typing style\'s mark waits on' },
  'B3.format.said': { text: '⟨form⟩ — “⟨first words⟩”', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a formatting outcome spoken in the status region, a heading\'s level and a paragraph among them' },
  'B3.format.said.off': { text: '⟨form⟩ off — “⟨first words⟩”', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a formatting outcome spoken in the status region, a form taken off' },
  'B3.format.said.union': { text: '⟨form⟩ — “⟨first words⟩” and the ⟨form⟩ beside them', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a formatting outcome spoken in the status region, a union' },
  'B3.format.said.style.on': { text: '⟨form⟩ — what you type next', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a formatting outcome spoken in the status region, the typing style' },
  'B3.format.said.style.off': { text: 'not ⟨form⟩ — what you type next', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: a formatting outcome spoken in the status region, the typing style leaving a form off' },
  'B3.no-notebook': { text: '⟨a note | a link | your formatting | what you write⟩ is kept in a notebook of your own\u00a0— no board on this machine is yours until you claim one', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: every writing act where no notebook stands, in the act\'s own object' },
  'B3.no-notebook.back': { text: 'back to ⟨label⟩', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the claim\'s end\'s act back to the place the line was taken at, after a key, a paste or the undo chord' },
  'B3.no-notebook.back.act': { text: 'back to ⟨label⟩\u00a0— ⟨the act⟩ these words', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the claim\'s end\'s act back, after an act' },
  'B3.no-notebook.back.capture': { text: 'back to ⟨label⟩\u00a0— capture your thought', cls: 'DRAFT', source: 'designs/B3-editor.md', screen: 'B3-S13: the claim\'s end\'s act back, after capture\'s line' },

  // ---- DRAFT: strings no design document carries (`lane: true`) -------------
  'L.no-adapter': { text: 'no shell and no provider — this page reaches nothing', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  // the page URL's `port` names no port, so the page dials nothing (S-36 (b))
  'L.bad-port': { text: 'port must be a number from 1 to 65535', cls: 'DRAFT', source: '', screen: 'the one line; the ARIA mirror; an act that needs a board', lane: true },
  // where no board is held (FP-35): the board list refused, in the guest line's place; the address display's one segment;
  // the empty list's statement
  'L.boards-unread': { text: 'the boards on this machine could not be read — that does not mean there are none', cls: 'DRAFT', source: '', screen: 'the one line; the ARIA mirror; an act that needs a board', lane: true },
  'L.go-to-address': { text: 'go to an address', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  'L.no-notebook-yet': { text: 'beginning a notebook isn\'t built yet', cls: 'DRAFT', source: '', screen: 'the one line; an act that needs a board', lane: true },
  'L.refused': { text: '⟨name⟩ — refused; nothing was written', cls: 'DRAFT', source: '', screen: 'a face', lane: true },
  'L.seam.annotate': { text: 'annotate — comes with the annotation lane; nothing is written here', cls: 'DRAFT', source: '', screen: 'the selection; the one line', lane: true },
  'L.seam.quote': { text: 'quote — comes with the annotation lane; nothing is written here', cls: 'DRAFT', source: '', screen: 'the selection; the one line', lane: true },
  'L.seam.link-to': { text: 'link to… — comes with the editor\'s lane; nothing is written here', cls: 'DRAFT', source: '', screen: 'the selection; the one line', lane: true },
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
  // the acting-as segment's short form (FP-26): the account's, the "as" kept so it never reads as part of the address; a
  // guest's, its class word; and a guest's segment's accessible name where it stands as its act — its fields whole in their
  // order, the reconnect's lead, the guest line, the board's origin, its venue, the session's refusal, each after its own
  // separator, none where it is empty
  'L.acting.as': { text: 'as ⟨account⟩', cls: 'DRAFT', source: '', screen: 'the one line, compact', lane: true },
  'L.guest-line.short': { text: 'guest', cls: 'DRAFT', source: '', screen: 'the one line, compact', lane: true },
  'L.guest-line.name': { text: '⟨lead⟩⟨guest⟩⟨origin⟩⟨venue⟩⟨refused⟩', cls: 'DRAFT', source: '', screen: 'the one line, compact', lane: true },
  // the one status message at a session's ending (FP-29): the ending's words — the one line's — then the documents the
  // view stood on that the reader can no longer read, each now its withheld box, "withheld · ⟨owner⟩"
  'L.covered': { text: '⟨ending⟩ — withheld from you now: ⟨documents⟩', cls: 'DRAFT', source: '', screen: 'the status region', lane: true },
  // the in-document find (B2-S5): its field's name and its two moves; a miss naming the
  // document and the version searched — a member by its number, a bare address by its current text (L.held.current); the
  // withheld text it did not search; a part the board would not give, by why (BM-HELD's `whyOf`); and, off any document,
  // where words are found
  'L.find-label': { text: 'find in this document', cls: 'DRAFT', source: '', screen: 'B2-S5: the find\'s field', lane: true },
  'L.find.next': { text: 'next match', cls: 'DRAFT', source: '', screen: 'B2-S5: the find\'s next', lane: true },
  'L.find.previous': { text: 'previous match', cls: 'DRAFT', source: '', screen: 'B2-S5: the find\'s previous', lane: true },
  'L.find.none': { text: 'no match in ⟨where⟩', cls: 'DRAFT', source: '', screen: 'B2-S5: the find\'s miss', lane: true },
  'L.find.member': { text: 'version ⟨k⟩ of ⟨name⟩', cls: 'DRAFT', source: '', screen: 'B2-S5: the find\'s miss', lane: true },
  'L.find.withheld': { text: 'withheld text here was not searched', cls: 'DRAFT', source: '', screen: 'B2-S5: the find\'s answer', lane: true },
  'L.find.part': { text: 'searched only part of it — ⟨reason⟩', cls: 'DRAFT', source: '', screen: 'B2-S5: the find\'s answer', lane: true },
  'L.find.off': { text: 'words are found in a document — go into one, then ⟨find chord⟩', cls: 'DRAFT', source: '', screen: 'B2-S5: the find\'s chord off any document', lane: true },
  // a walk's moment (FP-36): its face's caption by its kind, its answers, its cancel named by its walk and beside it that
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
  'L.scene.closed': { text: 'side by side closed — forward › reopens it', cls: 'DRAFT', source: '', screen: 'the one line; forward ›', lane: true },
  // a reading scene opened from a link whose far end names a document whole (FP-30): the words the far pane's name ends
  // with; the stop at a band's clipped end, which reaches the passages of that document holding the near passage's material
  'L.scene.whole-end': { text: 'the whole document is this link\'s end', cls: 'DRAFT', source: '', screen: 'B1-S9: the far pane', lane: true },
  'L.scene.shared.1': { text: 'show where ⟨D⟩ holds the same material', cls: 'DRAFT', source: '', screen: 'B1-S9: the stop at a band\'s clipped end', lane: true },
  'L.scene.shared': { text: 'show the next of ⟨n⟩ passages where ⟨D⟩ holds the same material', cls: 'DRAFT', source: '', screen: 'B1-S9: the stop at a band\'s clipped end', lane: true },
  'L.scene.stroke.1': { text: 'one change between two shared passages', cls: 'DRAFT', source: '', screen: 'B1-S9: a stroke between two bands', lane: true },
  'L.scene.stroke': { text: '⟨n⟩ changes between two shared passages', cls: 'DRAFT', source: '', screen: 'B1-S9: a stroke between two bands', lane: true },
  'L.scene.stroke.name': { text: '⟨count⟩: ⟨changes⟩', cls: 'DRAFT', source: '', screen: 'B1-S9: a stroke between two bands', lane: true },
  'L.scene.change': { text: '⟨a⟩ has ⟨one⟩ where ⟨b⟩ has ⟨other⟩', cls: 'DRAFT', source: '', screen: 'B1-S9: a stroke between two bands', lane: true },
  'L.scene.change.text': { text: '“⟨text⟩”', cls: 'DRAFT', source: '', screen: 'B1-S9: a stroke between two bands', lane: true },
  'L.scene.change.none': { text: 'nothing', cls: 'DRAFT', source: '', screen: 'B1-S9: a stroke between two bands', lane: true },
  'L.scene.stroke.gone': { text: 'no longer drawn here — the text was set again', cls: 'DRAFT', source: '', screen: 'B1-S9: a stroke\'s list', lane: true },
  // a stop drawn only by the panes' `compare` that the reader left from, returned to (SC's): it stands with the landing,
  // named for its kind and what it stood for, what only that read gives — its count — being read until it answers; then,
  // where what it stood for holds only in part, nowhere, or no answer told, its kind's words before the line's (FP-21)
  'L.scene.shared.returned': { text: 'show where ⟨D⟩ holds the same material, “⟨text⟩” — how many passages hold it is being read', cls: 'DRAFT', source: '', screen: 'B1-S9: a stop the reader left from, returned to', lane: true },
  'L.scene.shared.returned.away': { text: 'show where ⟨D⟩ held the same material — how many passages hold it is being read', cls: 'DRAFT', source: '', screen: 'B1-S9: a stop the reader left from, returned to', lane: true },
  'L.scene.stroke.kind': { text: 'a change between two shared passages', cls: 'DRAFT', source: '', screen: 'B1-S9: a stop the reader left from, returned to', lane: true },
  'L.scene.stroke.returned': { text: 'a change between two shared passages — how many it stands for is being read: ⟨changes⟩', cls: 'DRAFT', source: '', screen: 'B1-S9: a stop the reader left from, returned to', lane: true },
  'L.scene.stroke.returned.away': { text: 'a change between two shared passages the texts no longer hold where it stood — how many it stands for is being read', cls: 'DRAFT', source: '', screen: 'B1-S9: a stop the reader left from, returned to', lane: true },
  'L.scene.stop.said': { text: '⟨stop⟩ — ⟨said⟩', cls: 'DRAFT', source: '', screen: 'B1-S9: a stop the reader left from, returned to', lane: true },
  'L.at-position': { text: 'at position ⟨p⟩', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  // a continuation's mark (`markCount`): its count in what it counts — the words of the target that opens its list, its stop's
  // in the ARIA mirror and its list's caption; and the name and place of the member the walk's ring stands on, on the mark
  'L.mark.count': { text: '⟨n⟩ newer documents', cls: 'DRAFT', source: '', screen: 'a continuation\'s mark; its list; the ARIA mirror', lane: true },
  'L.mark.count.1': { text: '1 newer document', cls: 'DRAFT', source: '', screen: 'a continuation\'s mark; its list; the ARIA mirror', lane: true },
  'L.mark.member': { text: '⟨name⟩ · ⟨i⟩ of ⟨n⟩', cls: 'DRAFT', source: '', screen: 'a continuation\'s mark', lane: true },
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
  // when a thing was made, said as its date after the word for its event (`dated`): a link's; and where only an hourly
  // time record testifies to the time, the latest day it can have fallen on
  'L.card.made': { text: 'made', cls: 'DRAFT', source: '', screen: 'B1-S5', lane: true },
  'L.time.on-or-before': { text: 'on or before ⟨date⟩', cls: 'DRAFT', source: '', screen: 'B1-S5; the versions list', lane: true },
  'L.the-line': { text: 'the one line', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  // the address segment's accessible name: its fields in their order, the document's label whole after its field, the
  // position, the version pinned, then the document's state in its short words — each after its own separator, none
  // where it is empty
  'L.address.name': { text: '⟨place⟩⟨label⟩⟨position⟩⟨version⟩⟨state⟩', cls: 'DRAFT', source: '', screen: 'the one line', lane: true },
  'L.leap-label': { text: 'LEAP — an address, or a document\'s first line', cls: 'DRAFT', source: 'designs/plane.html', screen: 'B1-S11' },
  'L.leap-rows-label': { text: 'LEAP', cls: 'DRAFT', source: '', screen: 'B1-S11', lane: true },
  'L.scene-label': { text: 'the reading scene: two places side by side', cls: 'DRAFT', source: 'designs/plane.html', screen: 'B1-S9' },
  'L.mirror-label': { text: 'the board in record order', cls: 'DRAFT', source: 'designs/plane.html', screen: 'the ARIA mirror' },
  'L.mirror-level': { text: 'level ⟨n⟩', cls: 'DRAFT', source: 'designs/plane.js', screen: 'the ARIA mirror' },
  // the mirror's item names (N-WALK's `nameOf`): what a screen reader hears at each element of the walk — the board's
  // item its name, the one the status region calls it by, then its count
  'L.mirror.item': { text: 'Item ⟨i⟩ of ⟨n⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.board.name': { text: 'board ⟨node⟩, ⟨origin⟩', cls: 'DRAFT', source: '', screen: 'the ARIA mirror; the status region', lane: true },
  'L.mirror.board': { text: '⟨board⟩: ⟨n⟩ accounts.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
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
  // a block that holds no text, a withheld run apart where its clause is decided (FP-24, FP-33): its kind (L.item.*), where it
  // stands, then what the plane shows of it — a record's words and keys, the length of an item this client cannot show or of
  // a withheld run whose clause is read — never its raw value
  'L.mirror.no-text': { text: '⟨kind⟩ at position ⟨p⟩ of ⟨extent⟩ in ⟨document⟩⟨same⟩⟨shown⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.shows': { text: ': ⟨shown⟩', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // C-67's clause after a withheld run's arm, where the origin's edition claims decide one (PUB-5.124), and a kept clause
  // after an item's words (L.kept.*); the empty place says nothing
  'L.mirror.clause': { text: ' ⟨clause⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // after a withheld run's face, the links drawn at the run, its item's children (FP-30): ⟨links⟩ their count (F.label.links)
  'L.mirror.run-links': { text: ' ⟨links⟩ ending in it.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // C-67's place where a read of the edition claims failed (FP-33): a blank there would read as no claim
  'L.clause.unread': { text: 'edition claims not read', cls: 'DRAFT', source: '', screen: 'B1-S7; the document-level withheld face; the ARIA mirror', lane: true },
  // ⟨far⟩ the far end's label (LK's `farLabel`), the words its tail, its card and its list rows carry
  'L.mirror.link': { text: 'link ⟨link⟩, type ⟨type⟩, ⟨direction⟩ ⟨far⟩⟨floating⟩.', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  'L.mirror.untyped': { text: 'untyped', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // a document the board will say nothing of, as its state (T-LAYER's `stateWords`, T-ARTICLE's corner)
  'L.far.unregistered': { text: 'nothing this board will say about this address', cls: 'DRAFT', source: '', screen: 'the ARIA mirror: a document\'s item; the one line; the corner', lane: true },
  // a link's far end the board will say nothing of, in one state (LK's `emptyAt`): in the reader's own account under a
  // complete index listing no document at the address, "no document here yet" — its whole form saying nothing has been made
  // there, then whether the account's next new document goes there — else "no document known here", its whole form that
  // short form, then the fifth cell's words (B1.doc_not_registered); the short form names the far end on every label and
  // row and in its mirror item's name, and the whole form is the follow's face and the item's description
  'L.far.empty': { text: 'no document here yet', cls: 'DRAFT', source: '', screen: 'a link\'s far end: its tail, a merged tail, B1-S5, the "which" list, the ARIA mirror', lane: true },
  'L.far.empty.whole': { text: 'no document here yet — nothing has been made at ⟨address⟩ in your account', cls: 'DRAFT', source: '', screen: 'a link\'s far end: the follow\'s face, the ARIA mirror\'s description', lane: true },
  'L.far.empty.next': { text: 'the next new document made in your account goes here, and this link will lead to it', cls: 'DRAFT', source: '', screen: 'a link\'s far end: the follow\'s face, the ARIA mirror\'s description', lane: true },
  'L.far.empty.order': { text: 'your account\'s new documents take its addresses in order', cls: 'DRAFT', source: '', screen: 'a link\'s far end: the follow\'s face, the ARIA mirror\'s description', lane: true },
  'L.far.unknown': { text: 'no document known here', cls: 'DRAFT', source: '', screen: 'a link\'s far end: its tail, a merged tail, B1-S5, the "which" list, the follow\'s face, the ARIA mirror', lane: true },
  // a link whose far end's text holds none of its passage, part of it or all of it in pieces, or the board would not tell:
  // those words whole (BM-HELD's `farSays` — F.floating's, or its line), whose start its symbol and its stub say
  // (`farShort`)
  'L.mirror.floating': { text: ' — ⟨sentence⟩', cls: 'DRAFT', source: '', screen: 'the ARIA mirror', lane: true },
  // a jump reading, said where the camera is until its read answers; a jump reaching, said at the act's site while only a read
  // can place its destination, the camera still (FP-25)
  'L.reading': { text: 'reading ⟨address⟩…', cls: 'DRAFT', source: '', screen: 'a jump reading: where the camera is, else the one line', lane: true },
  'L.reaching': { text: 'reaching ⟨address⟩…', cls: 'DRAFT', source: '', screen: 'a jump reaching: at the act\'s site, else the one line; B1-S9: a stop returned to, pressed while its count is read', lane: true },
  // a landing's line (FP-21): what of the passage carried or followed the text landed in holds, where it stands in one run
  // and that is not all of it, or where no answer told — the passage named by what it was to the reader, the text by
  // F.floating's two forms, the withheld text after it; the same words at a drawn link's far end before departure, whole
  // on its card and its mirror item, its stub and its symbol saying them short of the withheld text (BM-HELD's `lineOf`,
  // `shortLineOf`)
  'L.held.part': { text: 'only part of ⟨subject⟩ is in ⟨where⟩', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a link\'s far end: its stub, its symbol, B1-S5, the ARIA mirror; B1-S9: a stop returned to', lane: true },
  'L.held.pieces': { text: 'all of ⟨subject⟩ is in ⟨where⟩', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a link\'s far end: its stub, its symbol, B1-S5, the ARIA mirror; B1-S9: a stop returned to', lane: true },
  'L.held.withheld': { text: '; the rest may be under the withheld text here', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a link\'s far end: B1-S5, the ARIA mirror; B1-S9: a stop returned to', lane: true },
  'L.held.unknown': { text: 'couldn\'t tell whether ⟨where⟩ holds ⟨subject⟩: ⟨reason⟩', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a link\'s far end: its stub, its symbol, B1-S5, the ARIA mirror; B1-S9: a stop returned to', lane: true },
  'L.held.selected': { text: 'what you selected', cls: 'DRAFT', source: '', screen: 'a landing\'s line', lane: true },
  'L.held.reading': { text: 'the text you were reading', cls: 'DRAFT', source: '', screen: 'a landing\'s line', lane: true },
  'L.held.followed': { text: 'its passage', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a link\'s far end: its stub, its symbol, B1-S5, the ARIA mirror', lane: true },
  'L.held.stop': { text: 'what this stop stood for', cls: 'DRAFT', source: '', screen: 'B1-S9: a stop the reader left from, returned to', lane: true },
  'L.held.member': { text: 'version ⟨k⟩', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a link\'s far end; B1-S9: a stop returned to', lane: true },
  'L.held.current': { text: '⟨D⟩\'s current text', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a link\'s far end; B1-S9: a stop returned to', lane: true },
  // why no answer told (BM-HELD's `whyOf`), where no entry above already says it: never the refusal's token, never "compare"
  'L.held.why.busy': { text: 'the board was busy', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a versions row; B1-S9: a stop returned to', lane: true },
  'L.held.why.size': { text: 'it is too large to check, even in parts', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a versions row; B1-S9: a stop returned to', lane: true },
  'L.held.why.withheld': { text: 'some of it is withheld from you', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a versions row; B1-S9: a stop returned to', lane: true },
  'L.held.why.unread': { text: 'its text could not be read', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a versions row; B1-S9: a stop returned to', lane: true },
  'L.held.why.other': { text: 'the board did not say', cls: 'DRAFT', source: '', screen: 'a landing\'s line; a versions row; a link\'s far end; B1-S9: a stop returned to', lane: true },
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
  'L.versions.pieces': { text: 'holds all of the passage', cls: 'DRAFT', source: '', screen: 'the versions list', lane: true },
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
  // a kept document's clause (FP-23, FP-33): what the view shows standing as held past a second while it is read again —
  // a draft's text, else the links drawn with it, or an origin's edition claims at a withheld run of it — said once beside
  // the document's name, and the board's while it lags, ⟨when⟩ the page's own clock at the row or drop that left the copy
  // behind (`lastRead`), a failed read's words after it — a mirror item carrying it as its own sentence (L.mirror.clause);
  // how many of an account's documents stand so, on its label at far scale; and what the status region says of one
  // cause (L-LINE's `keptSaid`), ⟨name⟩ each place by the name the mirror finds it by — a document's (T-LAYER's
  // `placeName`), the board's (L.mirror.board.name), the withheld text of an origin in it: as its clause appears, the
  // clause; as its reads set it, whether what it shows changed; where a read of it fails, still as last read with the
  // failure's words; several of one cause the one nearest the focus named, the rest counted
  'L.kept.text': { text: 'as last read ⟨when⟩', cls: 'DRAFT', source: '', screen: 'the one line; the corner; B1-S2: a document\'s label; the ARIA mirror; B1-S3: the board\'s statements; B1-S9: a pane\'s corner; the status region', lane: true },
  'L.kept.links': { text: 'links as last read ⟨when⟩', cls: 'DRAFT', source: '', screen: 'the one line; the corner; B1-S2: a document\'s label; the ARIA mirror; B1-S7: a column\'s edge, the run\'s face; B1-S9: a pane\'s corner', lane: true },
  'L.kept.failed': { text: '⟨clause⟩ — ⟨reason⟩', cls: 'DRAFT', source: '', screen: 'the one line; the corner; B1-S2: a document\'s label; the ARIA mirror; B1-S7; B1-S9: a pane\'s corner', lane: true },
  'L.kept.count': { text: '⟨n⟩ as last read', cls: 'DRAFT', source: '', screen: 'B1-S3: an account\'s cluster', lane: true },
  'L.kept.said': { text: '⟨name⟩ ⟨clause⟩', cls: 'DRAFT', source: '', screen: 'the status region', lane: true },
  'L.kept.unchanged': { text: '⟨name⟩ current, unchanged', cls: 'DRAFT', source: '', screen: 'the status region', lane: true },
  'L.kept.changed': { text: '⟨name⟩ current, changed', cls: 'DRAFT', source: '', screen: 'the status region', lane: true },
  'L.kept.still': { text: '⟨name⟩ still as last read — ⟨reason⟩', cls: 'DRAFT', source: '', screen: 'the status region', lane: true },
  'L.kept.and-more': { text: '⟨name⟩ and ⟨n⟩ more', cls: 'DRAFT', source: '', screen: 'the status region', lane: true },
  'L.kept.more': { text: '⟨n⟩ more', cls: 'DRAFT', source: '', screen: 'the status region', lane: true },
  'L.kept.run': { text: 'the withheld text from ⟨origin⟩', cls: 'DRAFT', source: '', screen: 'the status region', lane: true },
  'L.time.day-time': { text: '⟨day⟩, ⟨time⟩', cls: 'DRAFT', source: '', screen: 'the one line; the corner; B1-S2: a document\'s label; the ARIA mirror; B1-S7; B1-S9: a pane\'s corner', lane: true },
  // the shown chords' words (D5-F8; the focus record's rule 19): the dismiss's title, the version marker's
  'L.dismiss': { text: 'dismiss (⟨chord⟩)', cls: 'DRAFT', source: '', screen: 'the overlay', lane: true },
  'L.version': { text: 'version ⟨k⟩', cls: 'DRAFT', source: '', screen: 'the one line; the versions list; the corner, while the board lags', lane: true },
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
  // the client's words standing in a document's first line's place — a record's rendering, a withheld box's statement, what
  // a board will say of a far end — bracketed wherever the first line is named, so none reads as the document's own words
  'L.client-words': { text: '[⟨words⟩]', cls: 'DRAFT', source: '', screen: 'a document\'s label: the plane, a tail, a bundle\'s end, a list row, the one line, the ARIA mirror', lane: true },
  // the compact signs (FP-26): the mark keyed to a run's origin — a hairline's compact label, and a withheld run's gap too
  // short to carry its owner; a withheld run's face compact in its column's edge, its owner with a mark that opens it whole
  // (foundations §2.1); the corner's usual states as glyphs — an edition's its version marker, unlit at the bare address and
  // lit at a pinned version (foundations §3.1's ○), a draft's chip
  'L.origin-mark': { text: '≡', cls: 'DRAFT', source: '', screen: 'a run\'s hairline; a withheld run\'s gap', lane: true },
  'L.withheld.mark': { text: '⟨owner⟩ ▸', cls: 'DRAFT', source: '', screen: 'B1-S7, a column\'s edge', lane: true },
  'L.corner.bare': { text: '○', cls: 'DRAFT', source: 'designs/foundations.md', screen: 'the corner, compact' },
  'L.corner.pinned': { text: '●', cls: 'DRAFT', source: '', screen: 'the corner, compact', lane: true },
  'L.corner.draft': { text: '◌', cls: 'DRAFT', source: '', screen: 'the corner, compact', lane: true },
  // a corner at its document's head (FP-26): the items its rows cannot hold, folded into one count that opens them whole
  'L.corner.more': { text: '⟨n⟩ more', cls: 'DRAFT', source: '', screen: 'the corner, at its document\'s head', lane: true },
  // the one line compact (FP-26): the mark an address wider than a row folds the levels between its board and its deepest
  // into, and what it is named by
  'L.fold': { text: '⋮', cls: 'DRAFT', source: '', screen: 'the one line, compact', lane: true },
  'L.fold.name': { text: 'the levels folded here: ⟨levels⟩', cls: 'DRAFT', source: '', screen: 'the one line, compact', lane: true },
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
  // the formatting forms (B3-S13): `3.23.4`'s name, beside the strip's names of the rest (`formName`); the words forms named
  // together take — a form that is off, another hand's group led by the hand, the reader's own hand (`formsNamed`); and a
  // form's act and take-off in one pattern each, ⟨set⟩ the label of the set they write into, a heading's in its own words
  // (`formAct`, `formTakeOff`)
  'L.format.flag': { text: 'flag', cls: 'DRAFT', source: '', screen: 'B3-S13: the format strip\'s last slot; every place that names 3.23.4', lane: true },
  'L.format.not': { text: 'not ⟨form⟩', cls: 'DRAFT', source: '', screen: 'B3-S13: forms named together, a form that is off — the format strip, the typing style\'s line, the ARIA mirror; B1-S4: the formatting switch', lane: true },
  'L.format.hand': { text: '⟨hand⟩: ⟨forms⟩', cls: 'DRAFT', source: '', screen: 'B3-S13: forms named together, another hand\'s group after the document\'s own — the format strip, the ARIA mirror; B1-S4: the formatting switch', lane: true },
  'L.format.yours': { text: 'yours', cls: 'DRAFT', source: '', screen: 'B3-S13: forms named together, the reader\'s own hand leading its group — the format strip, the ARIA mirror; B1-S4: the formatting switch', lane: true },
  'L.format.make': { text: 'make it ⟨name⟩ in ⟨set⟩', cls: 'DRAFT', source: '', screen: 'B3-S13: the chord, or a Format menu item acting as one, at an edition\'s words the person\'s draft does not hold', lane: true },
  'L.format.make.heading': { text: 'make it a heading in ⟨set⟩', cls: 'DRAFT', source: '', screen: 'B3-S13: the heading\'s chord at an edition\'s words the person\'s draft does not hold', lane: true },
  'L.format.take-off': { text: 'take the ⟨name⟩ off in ⟨set⟩', cls: 'DRAFT', source: '', screen: 'B3-S13: the chord, or a Format menu item acting as one, at a mark of that form in the set; the format strip\'s act at a form it does not offer', lane: true },
  'L.format.take-off.heading': { text: 'take the heading off in ⟨set⟩', cls: 'DRAFT', source: '', screen: 'B3-S13: the heading\'s chord at a heading in the set', lane: true },
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
 * that class, a value given as stretches each in its face (`facedHTML`), and
 * every other value the client's words, each address in them the
 * identifier's (`addressedHTML`) — the words read the same as `t`'s, given
 * each stretched value's words joined.
 * @param {string} id
 * @param {Record<string, string | number | Array<{text: string, face: import('./plane/register.js').Face}>>} values
 * @param {Record<string, string>} [wrap] the class each token's value stands in, by token
 * @returns {string}
 */
export function tHTML(id, values, wrap = {}) {
  const html = /** @type {Record<string, string>} */ ({});
  for (const [k, v] of Object.entries(values)) html[k] = Array.isArray(v) ? facedHTML(v) : wrap[k] ? `<span class="${wrap[k]}">${esc(v)}</span>` : addressedHTML(String(v));
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

/** the brackets around the client's words in a document's first line's place (`L.client-words`): what opens them, and what closes them */
const [CLIENT_OPEN, CLIENT_SHUT] = STRINGS['L.client-words'].text.split('⟨words⟩');
/** what closes the client's words in a first line's place: the bracket a cut of them keeps after its ellipsis (P-LABEL's `cutWords`) */
export const CLIENT_CLOSE = CLIENT_SHUT || '';

/**
 * Words the client supplies in a document's first line's place — a record's
 * rendering, a withheld box's statement, what a board will say of a far end
 * (T-ARTICLE's first-line rule) — bracketed (`L.client-words`), so none reads
 * as the document's own: the stretches given, between the brackets in the
 * client's face.
 * @param {Array<{text: string, face: import('./plane/register.js').Face}>} runs
 * @returns {Array<{text: string, face: import('./plane/register.js').Face}>}
 */
export function bracketed(runs) {
  /** @type {Array<{text: string, face: import('./plane/register.js').Face}>} */
  const out = [];
  if (CLIENT_OPEN) out.push({ text: CLIENT_OPEN, face: 'client' });
  out.push(...runs);
  if (CLIENT_SHUT) out.push({ text: CLIENT_SHUT, face: 'client' });
  return out;
}

/**
 * A withheld document's words in its first line's place: its withheld box's,
 * "withheld · ⟨owner⟩", bracketed (`bracketed`), the owner the identifier's.
 * @param {string} owner its owner, by the one owner rule
 * @returns {Array<{text: string, face: import('./plane/register.js').Face}>}
 */
export function withheldLine(owner) {
  const [before, after] = t('F.corner.withheld').split('⟨owner⟩');
  return bracketed(/** @type {Array<{text: string, face: import('./plane/register.js').Face}>} */ ([{ text: before, face: 'client' }, { text: owner, face: 'ident' }, { text: after ?? '', face: 'client' }]).filter((r) => r.text));
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
 * The entries no design document carries (`lane`).
 * @returns {Array<{id: string, text: string, screen: string}>}
 */
export function lacking() {
  return Object.entries(STRINGS)
    .filter(([, e]) => e.lane)
    .map(([id, e]) => ({ id, text: e.text, screen: e.screen || '' }));
}

/**
 * A commons type's path under the registry document's subspace 3, exactly as
 * stored: "1.1.0.1.0.1.0.3.23.4" → "3.23.4"; null where the type is no
 * commons type.
 * @param {string | null} ty
 * @returns {string | null}
 */
function pathOf(ty) {
  const c = commonsType(ty);
  return c ? ['3', c.ordinal, ...c.sub].join('.') : null;
}

/**
 * A link type's name as the page shows it: on a notebook with no commons
 * registry document seeded every type reads R5's form (`R5.undocumented`),
 * ⟨T⟩ the commons path's tail.
 * @param {string | null} ty
 */
export function typeName(ty) {
  return t('R5.undocumented', { T: pathOf(ty) ?? (ty || '—') });
}

/** the heading's commons path: its level a parameter of its type slot (B3-S13), never a subtype */
const HEADING = '3.20';
/** the heading's levels the table names, 1 to this */
const HEADING_LEVELS = 6;

/**
 * The formatting forms the table names, in the format strip's order (B3-S13):
 * each by its commons path, the entry that names it, and whether this editor
 * makes it — by a chord, or by a strip or Format menu item acting as one; a
 * paragraph is a heading taken off (D5 K-96), and a flag is made by no act of
 * this editor (B3-S13).
 * @type {ReadonlyArray<{path: string, name: string, made: boolean}>}
 */
const FORMS = [
  { path: '3.23.2', name: 'B3.format.bold', made: true },
  { path: '3.23.1', name: 'B3.format.italic', made: true },
  { path: '3.23.3', name: 'B3.format.code', made: true },
  { path: '3.23.5', name: 'B3.format.strikethrough', made: true },
  { path: '3.23.6', name: 'B3.format.subscript', made: true },
  { path: '3.23.7', name: 'B3.format.superscript', made: true },
  { path: '3.21', name: 'B3.format.paragraph', made: false },
  { path: HEADING, name: 'B3.format.heading', made: true },
  { path: '3.23.4', name: 'L.format.flag', made: false },
];

/** the table's row for a type, null where the table names no form of it */
const formOf = (/** @type {string | null} */ ty) => FORMS.find((f) => f.path === pathOf(ty)) ?? null;

/**
 * The table's row that names a form: a heading's only at a level the table
 * names; null where the table lacks a name for it.
 * @param {string | null} ty
 * @param {number | undefined} level
 */
function namedForm(ty, level) {
  const f = formOf(ty);
  return f && (f.path !== HEADING || (level !== undefined && Number.isInteger(level) && level >= 1 && level <= HEADING_LEVELS)) ? f : null;
}

/**
 * A formatting form's name, the one every place that names the form reads:
 * its entry in the table (`FORMS`), a heading's with its level; a type the
 * table lacks, or a heading at a level it lacks, the name its card gives it
 * (`typeName`), so no place that names a form stands blank (FP-34).
 * @param {string | null} ty the type as a link stores it
 * @param {number} [level] a heading's level, its type slot's parameter
 * @returns {string}
 */
export function formName(ty, level) {
  const f = namedForm(ty, level);
  return !f ? typeName(ty) : f.path === HEADING ? t(f.name, { n: /** @type {number} */ (level) }) : t(f.name);
}

/**
 * @typedef {Object} FormNamed — a formatting form, as a list of forms names it (`formsNamed`)
 * @property {string | null} ty its type, as a link stores it
 * @property {number} [level] a heading's level, its type slot's parameter
 * @property {boolean} [off] the form is off at what the words describe, so named after "not"
 */

/**
 * @typedef {Object} HandForms — the forms one hand other than the document's own set, named as a group
 * @property {string} hand the hand as the group is led by it: the reader's own "yours" (`L.format.yours`), else its account
 * @property {FormNamed[]} forms
 */

/** what parts two forms named together: a comma alone, so a list cut from its end is still a list */
const FORM_SEP = ', ';
/** what parts one hand's group of forms from the next */
const HAND_SEP = '; ';

/**
 * One group's forms by their names (`formName`), in the format strip's order
 * (`FORMS`) — a heading by its level, a type the table lacks after every form
 * it names, in the order given — each form once, a form that is off after
 * "not" (`L.format.not`), parted by `FORM_SEP`; '' where the group holds none.
 * @param {FormNamed[]} forms
 * @returns {string}
 */
function listed(forms) {
  /** a form's place in the strip's order: its row's, then a heading's level; past every row where the table lacks its name */
  const place = (/** @type {FormNamed} */ f) => {
    const r = namedForm(f.ty, f.level);
    return r ? [FORMS.indexOf(r), r.path === HEADING ? /** @type {number} */ (f.level) : 0] : [FORMS.length, 0];
  };
  const names = forms
    .map((f) => ({ at: place(f), name: f.off ? t('L.format.not', { form: formName(f.ty, f.level) }) : formName(f.ty, f.level) }))
    .sort((a, b) => a.at[0] - b.at[0] || a.at[1] - b.at[1])
    .map((x) => x.name);
  return [...new Set(names)].join(FORM_SEP);
}

/**
 * Forms named together: the document's own, then each other hand's as a
 * group led by the hand (`L.format.hand`), the groups parted by `HAND_SEP`
 * and a group holding no form dropped (`listed`).
 * @param {FormNamed[]} own the forms the document's own hand set
 * @param {HandForms[]} [hands] each other hand's, in the order they are named
 * @returns {string}
 */
export function formsNamed(own, hands = []) {
  return [listed(own), ...hands.map((h) => { const forms = listed(h.forms); return forms && t('L.format.hand', { hand: h.hand, forms }); })]
    .filter(Boolean)
    .join(HAND_SEP);
}

/**
 * A form's act, the words that make it in a set: "make it ⟨name⟩ in ⟨set⟩"
 * (`L.format.make`), a heading's in its own words (`L.format.make.heading`);
 * null for a form this editor makes by no act (`FORMS`) and for a type the
 * table lacks.
 * @param {string | null} ty the type as a link stores it
 * @param {string} set the label of the set the act writes into
 * @returns {string | null}
 */
export function formAct(ty, set) {
  const f = formOf(ty);
  if (!f?.made) return null;
  return f.path === HEADING ? t('L.format.make.heading', { set }) : t('L.format.make', { name: t(f.name), set });
}

/**
 * A form's take-off, the words that take it off in a set: "take the ⟨name⟩
 * off in ⟨set⟩" (`L.format.take-off`), a heading's in its own words
 * (`L.format.take-off.heading`); every form has one, a type the table lacks
 * named as its card names it (`formName`).
 * @param {string | null} ty the type as a link stores it
 * @param {string} set the label of the set the take-off writes into
 * @returns {string}
 */
export function formTakeOff(ty, set) {
  return formOf(ty)?.path === HEADING ? t('L.format.take-off.heading', { set }) : t('L.format.take-off', { name: formName(ty), set });
}

/** a count noun: `one` where n is 1, else `many` with ⟨n⟩ filled */
export const plural = (/** @type {number} */ n, /** @type {string} */ one, /** @type {string} */ many) =>
  n === 1 ? t(one) : t(many, { n });

/**
 * A continuation's mark's count in what it counts (`L.mark.count`): its
 * members, "≥ ⟨n⟩" where the counts are no more than a lower bound — the
 * same words on the plane, at the mark's stop in the ARIA mirror and as its
 * list's caption.
 * @param {number} n
 * @param {boolean} exact the index's counts are exact
 */
export const markCount = (n, exact) => (exact ? plural(n, 'L.mark.count.1', 'L.mark.count') : t('L.mark.count', { n: t('L.lower-bound', { n }) }));

/** the hour an hourly time record's testimony leaves open, in milliseconds: the commit fell within it, after the record's time */
const HOUR_MS = 60 * 60 * 1000;

/**
 * When a thing was made, in the page's one form of a date (U's `dayOf`): the
 * day its commit fell on, where the change feed's own row testifies to it;
 * where only an hourly time record does, that day while the hour after the
 * record stays inside it, else "on or before" the day the hour ends in;
 * "not recorded" where the board holds no reading.
 * @param {import('./model/frames.js').Age} age
 * @returns {string}
 */
export function dated(age) {
  if (age.time == null) return t('F.slot.not-recorded');
  const day = dayOf(age.time);
  if (age.from !== 'anchor') return day;
  const latest = dayOf(age.time + HOUR_MS - 1);
  return latest === day ? day : t('L.time.on-or-before', { date: latest });
}

/**
 * When the page's copy of what it keeps standing was left behind (FP-23), by
 * the page's own clock: the hour and the minute of the row or drop that left
 * it behind (U's `timeOf`), the day first in the page's one form of a date
 * (U's `dayOf`) where that was not the day it is now — never an age.
 * @param {number} ms the page's clock at the row or drop that left the copy behind (M-PUMP's `Kept.since`)
 * @param {number} [now] the page's clock now
 * @returns {string}
 */
export function lastRead(ms, now = Date.now()) {
  const day = dayOf(ms), time = timeOf(ms);
  return day === dayOf(now) ? time : t('L.time.day-time', { day, time });
}
