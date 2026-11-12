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
scene. `harness/` drives the page in headless Chrome and asserts text,
keys, layout, the wire, frames and the accessible rendering; `results/`
and `shots/` hold what its last run wrote. What is typed in a draft is
sent to the board by `web/write/`, as bursts, and what the board has not
kept is held, shown and settled there. The key ceremonies, annotation
and the installed shell come in later lanes. The gate runs on a board of
its own, THE TEST BOARD, and never reaches the owner's: its `editor`
case alone writes, through the page, and a test that needs a faulted
answer takes it from the fake port under `web/test/`, or in that case
from the harness's own provider (step 6 below).

## Where the design lives

This repository is <https://github.com/sisbell/skep-frontend>. The UX
designs, the wire's affordance inventory and the lane briefs live in
the design repository, which is not published. The daemon and
its wire document live at <https://github.com/sisbell/skep>; the wire
document there (`docs/wire.md`) is what this client is built against.

## Running

Two boards stand, apart. THE TEST BOARD, on 8644, is the gate's: every
case reads it through the provider on 8742, and the `editor` case alone
writes to it — through the page, by the harness's provider on 8744.
THE OWNER'S BOARD, on 8642, is the owner's own, read and written by hand
through the viewer (below); the gate never reaches it. The boards, their
claims and seeds and the providers are the owner's prelude: started once
at a terminal, left running, and never started, stopped, claimed or
seeded by the gate. Everything is loopback.

1. Build skepd and skep-cli's two binaries at the pin, in a checkout of
   skep (never its working tree while a lane runs there):

       cargo build --release -p skepd
       cargo build --release -p skep-cli --bin skep --bin skep-dev

2. Start the test board on loopback, by the local record's recipe
   (`--create` begins a board where none stands, the first time alone):

       skepd --data-dir ./board-gate --create --port 8644 \
         --origin http://127.0.0.1:8644

   The board is unclaimed until you claim it; never forward the port
   before the claim.

3. Claim it (once per board; the claim needs a controlling terminal and
   the board outlives the gate):

       skep keygen --dir ./store
       skep claim --board http://127.0.0.1:8644 --dir ./store

4. Seed it from a git checkout of prose at a pinned commit (idempotent:
   a second run adds nothing). The verb's flags at the pin: `--board`,
   `--dir`, `--repo`, `--pin`, `--from`, `--documents`, `--versions`,
   `--drafts`, `--principal`, `--key`:

       skep-dev seed --board http://127.0.0.1:8644 --dir ./store \
         --repo <the design repo's checkout> --pin <its commit> \
         --documents 1000 --versions 20 --drafts 10

5. Start the provider over that board, SIGNED with the dev key in the
   store, admitting the page's one origin; export the secret first and
   keep it in the environment (it is never written to this tree):

       export SKEP_PROVIDER_SECRET=<any long text of A-Z a-z 0-9 - . _ ~>
       skep-dev serve --board http://127.0.0.1:8644 \
         --page-origin http://127.0.0.1:8731 --session signed --dir ./store \
         --principal 1 --secret "$SKEP_PROVIDER_SECRET"

   `--listen 8742` is the default; closing its stdin is the clean stop.
   Every gate case reads the test board through this provider, and no
   page sends a write through it.

6. Start the harness's own provider over the same board, on 8744, for the
   gate's `editor` case alone. That case's page boots with the write
   layer's machine (`machine=1`, below): it makes drafts of its own on
   the test board and types in them, so its words are sent, acked and
   kept by a real board; and it arms this provider's script seam with
   canned answers and fires events by hand to reach the states a fault
   makes. Nothing else is ever armed, and never the provider on 8742.
   It needs a store of its own, made once, mode 0700, holding copies of
   the dev store's `keys/` and `bindings` and nothing else (a provider
   holds its store's search index while it runs):

       mkdir -m 0700 ./store-gate
       cp -Rp ./store/keys ./store/bindings ./store-gate/

   Then, with a secret of its own exported and kept in the environment
   (never written to this tree):

       export SKEP_EDITOR_SECRET=<any long text of A-Z a-z 0-9 - . _ ~>
       skep-dev serve --board http://127.0.0.1:8644 \
         --page-origin http://127.0.0.1:8731 --listen 8744 \
         --session signed --dir ./store-gate \
         --principal 1 --secret "$SKEP_EDITOR_SECRET"

   The gate checks it is up and stops where it is not; it never starts
   or stops it.

7. In this tree, once:

       npm install

   (TypeScript is the one devDependency, pinned in `package.json`.)

8. The gate — the checker, the pure tests, the page served on 8731,
   headless Chrome over CDP through every case, the report:

       harness/run.sh

   It writes `results/*.json`, `results/report.md` and `shots/**`, and
   exits non-zero on any failed case. Its `wire` case holds every page
   but the `editor` case's to reads: each `op` frame a page sends through
   8742 is a read, and a write frame from any other case fails the gate.
   The test board's log position is read before and after and reported
   as a figure, since the `editor` case writes there. Both secrets must
   be in the environment. `npm run check` and `npm test` run the checker
   and the pure tests alone.

To look at the page yourself, serve it and open it with the secret:

    python3 harness/serve.py 8731 &
    open "http://127.0.0.1:8731/?provider=$SKEP_PROVIDER_SECRET"

`harness/run.sh safari` opens that URL in Safari and asserts nothing —
the owner's pass. A page opened so sends what is typed in a draft to the
board it reads. Adding `&gate=all` to the URL loads the gate's hooks
(`window.__skep`) and the write ledger, and boots the page without the
write layer's machine, so what is typed stays in the page; `&machine=1`
beside it boots the machine as well — the `editor` case's page. Without
`gate` the page ships no instrumentation. `&gate=guest` loads the hooks
too and opens the page as a guest: it asks no session, so it reads the
board at guest class — the page the gate's `guest` case and the W-01
walk drive.

### Looking at the page while the gate runs

The gate takes port 8731 for each run, and the providers on 8742 and
8744 admit that one page origin alone, over the test board. The viewer
is the owner's own page: a page origin and a provider of its own, over
THE OWNER'S BOARD on 8642 — a second board, begun, claimed and seeded as
the test board is (steps 2–4, with a data directory of its own and
`--port 8642 --origin http://127.0.0.1:8642`). What the owner types
there reaches that board, and the gate never reads, writes or measures
it:

1. A second checkout, outside this tree:

       git worktree add --detach ../skep-frontend-view origin/main

   To bring it up to date, `git -C ../skep-frontend-view fetch`, then
   `git -C ../skep-frontend-view checkout --detach origin/main`.

2. A store of its own, mode 0700, holding copies of the dev store's
   `keys/` and `bindings` and nothing else:

       mkdir -m 0700 ./store-view
       cp -Rp ./store/keys ./store/bindings ./store-view/

   A provider holds its store's search index for as long as it runs. A
   second provider over the same store finds the index taken and lists
   no documents, so its page's plane stands empty; and where the gate's
   provider is the one started second, the gate's is the empty one.

3. Its provider, on a port of its own, admitting the second page origin,
   with a secret of its own:

       export SKEP_VIEW_SECRET=<any long text of A-Z a-z 0-9 - . _ ~>
       skep-dev serve --board http://127.0.0.1:8642 \
         --page-origin http://127.0.0.1:8732 --listen 8743 \
         --session signed --dir ./store-view \
         --principal 1 --secret "$SKEP_VIEW_SECRET"

4. In the second checkout, serve the page on that origin and open it at
   that provider's port:

       python3 harness/serve.py 8732 &
       open "http://127.0.0.1:8732/?provider=$SKEP_VIEW_SECRET&port=8743"

`port` names a port on 127.0.0.1, never a host; without it the page
dials 8742. A value that is not a number from 1 to 65535 dials nothing:
the page boots, and its one line says the port must be a number. The
gate serves its page on 8731 and reads the test board through 8742; its
`editor` case sets `port` to 8744, and its `wire` case sets it only to
check the key, at a port nothing listens on and with a stand-in for the
secret.
