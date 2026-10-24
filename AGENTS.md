# Agent instructions for this repository

Read `PATTERNS.md` first. Its numbered rules (FP-1 … FP-34) bind every
file under `web/`; a module's head comment cites the ones that bind it.

## The page

`web/` is the product and ships as written: plain JavaScript, ES
modules, no build step, no framework (FP-1, FP-3, FP-4). Every value's
shape is a JSDoc type, checked by `npx tsc -p jsconfig.json` (FP-2).
The layers import downward only: `bridge/` → `model/` → the drawing
modules (`plane/`, `text/`, `links/`, `beams/`, `nav/`, `line/`,
`overlays/`, `scene/`) → `app/` (FP-11). One owner per piece of state
(FP-10).

The page never dials a board and never holds a key or a token (FP-14).
It talks to one port, `web/bridge/port.js`; every shape that crosses it
is the shell's, fetched into `web/bridge/shapes.d.ts` and never
hand-edited (FP-15, FP-16). `web/links/links.js` is the seam that
decides which links show and how; link sets later replace its rule and
no drawing module changes.

Strings the page shows come from `web/strings.js`: pinned by their
`C-n` id in the design's copy inventory, or marked DRAFT with the
screen that needed it. Invent no wording.

## The gate

`harness/run.sh` — the checker, `node --test 'web/**/*.test.js'`, and
the harness cases in headless Chrome against a real board. Every claim
is a test that fails without its fix (FP-17); every figure is this
machine's (FP-18). A check marked with the page issue it waits on
counts as expected while it fails and fails the gate the day it passes,
so the mark comes off with the fix. What the gate writes (`results/`,
`shots/`) is read locally and never committed. The board on 8642 and the provider on
8742 are the owner's: never start, stop, claim, seed or write to them,
and read `/health.log_position` before and after a run — it must not
move.

## Issues

Every issue carries one of four milestones, set when it is filed, and
fixes run tier by tier, each tier including the ones before it:

- **Now** — a reader is misled or blocked: wrong information shown, text
  they cannot reach or read, copy and navigation that lose the place.
- **Next** — on the path being built: reading side by side, finding,
  links and beams, what an agent's work looks like.
- **Before release** — accessibility, contrast, collisions, notices and
  strings that must be right before someone else uses it.
- **Later** — the editor's, and what comes after the first release.

A `needs-design` label marks an issue that waits on a design decision;
no run takes it until the label comes off. When several issues of one
kind appear across surfaces, the rule they lack is found once and
built everywhere, not fixed one surface at a time.

A comment headed `## Design decision` on an issue is settled, not a
first guess: build it as stated, or decline it back to `needs-design`
with the reason. When you build one, add one line under
`PATTERNS.md`'s `## Decisions in force`, in that list's form — the
issue, the decision in one sentence, the rule it rides — with no commit
hash and no date, in the same commit. Only where the decision answers a
question across surfaces, also add or change a numbered rule there,
stating only what must hold; the reason for the change goes in the
commit body, never in the file. Never restate a rule in the decision
line, or the decision in the rule.

Sometimes, while fixing a page bug, you find the real cause is in the
shell or the board: the shell has no read for what the page needs, the
wire gives back too little, or the board behaves a certain way. When
that happens, open an issue in `sisbell/skep`. Name the crate
(`skep-shell`, `skepd`, …), and say which frontend issue you were
fixing ("Found while fixing sisbell/skep-frontend#N"). Give it a
milestone. Then finish the frontend issue with what the page can do on
its own, note what still depends on skep, and close it. Don't leave it
open waiting for the skep side.

## Where the design lives

The design repository (`skep-ux-design`, a sibling of this one) holds
the structure record, the module designs and the briefs; it is read
there, never copied here. See `README.md` for running the page.
