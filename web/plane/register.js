// P-REG — the visual variables' VALUES (the structure record §3.2 "P-REG";
// foundations §2.1's register: each datum one variable, held client-wide,
// no variable carrying two data — ux-T1 (a)). Layer 2, pure constants the
// renderers and the CSS share (`main.js` sets them as custom properties).
// The LINKER takes HUE from a small palette — you, the document's owner,
// everyone else as one — and a mark merging links whose linkers differ the
// NEUTRAL hue, which names no linker (P44's Use at §2.1's register); the
// anchor's GRADE a line on the highlight's edge;
// SAMENESS boundaries and a ground TEXTURE, never a tint; the VISITED-LINK
// MARK takes VALUE (lighter, the hue kept — D-3); the link lit at an ARRIVAL
// its stroke's WEIGHT (foundations §2.1: "the followed link drawn heavier");
// a connection's KIND its line's form; a box's PUBLICATION STATE its edge's
// weight; a LABEL's size its floor, below which no label on the plane is set
// (P-LABEL); THE EDGE STUB its inset from the view's border and its
// triangle's size, the one stub BM's beams and P-RENDER's mid connections
// draw (P-CAM's `edgeStub`). LK reads this module to put a value on each
// link's mark; no drawing module reads it for a link (the seam's rule). The
// values are the UI phase's.
// Carries: the wireframe's §10 `COL`; S1 Q5's `same`/`provenance` classes
// (the treatment OPEN).
// Rules: FP-1, FP-2, FP-10 (no state).

/** the linker's hue — R60's palette */
export const HUE = Object.freeze({
  /** the person's own links */
  you: '#7fb2ff',
  /** the document owner's links (where the owner is not the person) */
  owner: '#a3d977',
  /** everyone else, as one */
  others: '#9aa5b4',
});

/**
 * the hue of a mark merging links whose linkers differ (P44; foundations
 * §2.1: "neutral in any variable its members do not share — hue where their
 * linkers differ"): a near-white carrying no linker's hue, lighter than
 * `HUE.others`' blue-grey so the two never read alike
 */
export const NEUTRAL_HUE = '#e8e6e1';

/** the grade's line (the anchor's edge), never hue */
export const GRADE = Object.freeze({ exact: 'solid', drifted: 'dashed', orphaned: 'dotted' });

/** sameness: boundaries and a ground texture; S1 Q5's two treatments, the verdict OPEN */
export const SAMENESS = Object.freeze({ treatment: 'provenance', boundary: '#7ddc9a', texture: 'rgba(125,220,154,0.07)' });

/** the visited-link value: the symbol drawn lighter, the hue kept (D-3) */
export const VISITED_ALPHA = 0.45;

/**
 * the arrival's weight: the link lit at an arrival — the one a landing
 * followed, or the one Back came back along (N-GO's `litLink`) — stroked at
 * this many times the drawer's own width (foundations §2.1's register: "the
 * arrival an outline around its span with the followed link drawn heavier")
 */
export const ARRIVAL_WEIGHT = 2;

/** a mid connection's kind takes its line's form */
export const KIND_FORM = Object.freeze({ link: [], 'draft-to-edition': [2, 4], supersedes: [6, 4], fork: [6, 3, 1, 3], identity: 'band' });

/** a box's publication state takes its edge's weight */
export const EDGE = Object.freeze({ edition: 1.4, draft: 0.8, withheld: 0.8, landmark: 1.8 });

/** the stacking order, ground up */
export const STACK = Object.freeze(['sameness', 'own', 'grade', 'refused', 'arrival', 'selection']);

/**
 * THE EDGE STUB (foundations §2.5; S1 Q3): a stroke cut at the visible
 * view's border with a triangle on the true bearing, its tip `inset` px
 * inside the border, `length` px along the bearing and `width` px across its
 * base — the one stub BM's beams and P-RENDER's mid connections draw
 */
export const STUB = Object.freeze({ inset: 8, length: 10, width: 10 });

/**
 * The smallest size a label on the plane is set at, in px — the far labels'
 * size, above P-LOD's readable em (foundations §2.1: legibility, not frame
 * cost, is what the scales buy); its value the UI phase's (S3 Q4).
 */
export const LABEL_MIN_PX = 9;

/** the canvas palette (the wireframe's COL) */
export const COL = Object.freeze({
  bg: '#0e1013', doc: '#161b22', docEdge: '#39424e', draftEdge: '#5a4a2a', title: '#cfd6df', text: '#b9c1cb',
  greek: '#4b5563', cluster: '#1b2430', clusterEdge: '#3a4a5e', land: '#ffb454', focus: '#7ddc9a',
  boardEdge: '#2a3340', withheld: '#2a2520', trail: 'rgba(255,180,84,.85)',
  residue: '#2b3140', hollow: 'rgba(127,178,255,0.15)',
});

/**
 * @typedef {Object} Mark — how one link, or the links merged at one site (LK's `mergedMark`), are drawn, decided by LK, applied by the drawers
 * @property {string} hue the linker's; NEUTRAL_HUE where the merged links' linkers differ
 * @property {'you' | 'owner' | 'others' | null} linker null where the merged links' linkers differ
 * @property {number[] | 'band'} form the kind's dash form
 * @property {number} value 1 = full; VISITED_ALPHA once followed — every merged link followed
 * @property {number} weight 1 = the drawer's own stroke; ARRIVAL_WEIGHT for the link lit at an arrival — every merged link lit
 * @property {boolean} own true where the mark stands with no act (the owner's or the person's) — every merged link's
 */

/**
 * The CSS custom properties the stylesheet reads, one per value.
 * @returns {Record<string, string>}
 */
export function cssVariables() {
  return {
    '--hue-you': HUE.you, '--hue-owner': HUE.owner, '--hue-others': HUE.others,
    '--same-boundary': SAMENESS.boundary, '--same-texture': SAMENESS.texture,
    '--visited-alpha': String(VISITED_ALPHA),
    '--col-bg': COL.bg, '--col-text': COL.text, '--col-title': COL.title, '--col-dim': COL.greek, '--col-land': COL.land, '--col-focus': COL.focus,
  };
}
