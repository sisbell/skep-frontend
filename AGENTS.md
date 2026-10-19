# Agent instructions for this repository

Read `PATTERNS.md` first. Its nineteen rules (FP-1 … FP-19) bind every
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
machine's (FP-18). What the gate writes (`results/`, `shots/`) is read
locally and never committed. The board on 8642 and the provider on
8742 are the owner's: never start, stop, claim, seed or write to them,
and read `/health.log_position` before and after a run — it must not
move.

## Where the design lives

The design repository (`skep-ux-design`, a sibling of this one) holds
the structure record, the module designs and the briefs; it is read
there, never copied here. See `README.md` for running the page.
