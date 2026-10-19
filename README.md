# skep-frontend

The frontend for skep: the client a person reads and writes a board
through. The page dials the development PROVIDER (`skep-dev serve`) in
development and the installed shell in the app — never the daemon: the
page holds a session reference and never a key or a token, and shows
the board as one zoomable plane.

## What is here

This repository is the tree the frontend lanes run in. Each lane is a
build under a brief: it builds a piece against the converged design and
the daemon's wire, runs its checks, and reports back what the design
got wrong or left unsaid.

The first lane built THE READ PATH: `web/` is a folder of plain browser
modules (no build step, no framework; JSDoc types checked by
TypeScript's checker) that opens a seeded local board through the
provider and renders it — the plane at its three scales, the DOM text
layer at reading zoom, one module deciding which links show and how,
the beams, navigation (LEAP, the trail, the walk, the chords), the one
line acting as the signed-in person, the read overlays, and the reading
scene. It composes no write. `harness/` drives the page in headless
Chrome and asserts text, keys, layout, the wire, frames and the
accessible rendering; `results/` and `shots/` hold what its last run
wrote. Writes, the key ceremonies, annotation and the installed shell
come in later lanes.

## Where the design lives

The UX designs, the wire's affordance inventory and the lane briefs
live in the design repository, which is not published. The daemon and
its wire document live at <https://github.com/sisbell/skep>; the wire
document there (`docs/wire.md`) is what this client is built against.

## Running

The board, the claim, the seed and the provider are the owner's prelude:
started once at a terminal, left running, and never started, stopped,
claimed, seeded or written to by the gate. Everything is loopback.

1. Build skepd and skep-cli's two binaries at the pin, in a checkout of
   skep (never its working tree while a lane runs there):

       cargo build --release -p skepd
       cargo build --release -p skep-cli --bin skep --bin skep-dev

2. Start a throwaway board on loopback, by the local record's recipe:

       skepd --data-dir ./board --port 8642 --origin http://127.0.0.1:8642

   The board is unclaimed until you claim it; never forward the port
   before the claim.

3. Claim it (once per board; the claim needs a controlling terminal and
   the board outlives the gate):

       skep keygen --dir ./store
       skep claim --board http://127.0.0.1:8642 --dir ./store

4. Seed it from a git checkout of prose at a pinned commit (idempotent:
   a second run adds nothing). The verb's flags at the pin: `--board`,
   `--dir`, `--repo`, `--pin`, `--from`, `--documents`, `--versions`,
   `--drafts`, `--principal`, `--key`:

       skep-dev seed --board http://127.0.0.1:8642 --dir ./store \
         --repo <the design repo's checkout> --pin <its commit> \
         --documents 1000 --versions 20 --drafts 10

5. Start the provider over that board, SIGNED with the dev key in the
   store, admitting the page's one origin; export the secret first and
   keep it in the environment (it is never written to this tree):

       export SKEP_PROVIDER_SECRET=<any long text of A-Z a-z 0-9 - . _ ~>
       skep-dev serve --board http://127.0.0.1:8642 \
         --page-origin http://127.0.0.1:8731 --session signed --dir ./store \
         --principal 1 --secret "$SKEP_PROVIDER_SECRET"

   `--listen 8742` is the default; closing its stdin is the clean stop.

6. In this tree, once:

       npm install

   (TypeScript is the one devDependency, pinned in `package.json`.)

7. The gate — the checker, the pure tests, the page served on 8731,
   headless Chrome over CDP through every case, the report:

       harness/run.sh

   It writes `results/*.json`, `results/report.md` and `shots/**`, and
   exits non-zero on any failed case. `npm run check` and `npm test`
   run the checker and the pure tests alone.

To look at the page yourself, serve it and open it with the secret:

    python3 harness/serve.py 8731 &
    open "http://127.0.0.1:8731/?provider=$SKEP_PROVIDER_SECRET"

`harness/run.sh safari` opens that URL in Safari and asserts nothing —
the owner's pass. Adding `&gate=all` to the URL loads the gate's hooks
(`window.__skep`) and the write ledger; without it the page ships no
instrumentation.
