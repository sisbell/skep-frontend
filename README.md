# skep-frontend

The frontend for skep: the client a person reads and writes a board
through. It dials a skep daemon (`skepd`) over the wire and shows the
board as one zoomable plane.

## What is here

Nothing built yet. This repository is the tree the frontend lanes run
in. Each lane is a build under a brief: it builds a piece against the
converged design and the daemon's wire, runs its checks, and reports
back what the design got wrong or left unsaid.

The first lane builds the read path: the page that opens a board on a
real local daemon, seeded with real content, and renders documents,
versions, links and the change feed. Writes, the key ceremonies and the
installed shell come in later lanes.

## Where the design lives

The UX designs, the wire's affordance inventory and the lane briefs
live in the design repository, which is not published. The daemon and
its wire document live at <https://github.com/sisbell/skep>; the wire
document there (`docs/wire.md`) is what this client is built against.

## Running

There is nothing to run yet. When there is, this section will say how
to start a local daemon, seed it, and open the page on it.
