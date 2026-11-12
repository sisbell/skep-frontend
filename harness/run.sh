#!/bin/bash
# THE GATE (the structure record §6.2; T6): the ports checked with lsof, the
# page's server started and stopped, the driver over every case, the report,
# the checker and the pure tests folded in; exit non-zero on any failure.
# NEVER starts or stops a board or a provider — the owner's prelude, up
# before the gate and left running: the test board on 8644, the gate's own,
# and the two providers that dial it — the one on 8742, which every case
# reads and none arms or writes through, and the one on 8744, which the
# editor case alone arms, fires and writes through, by the page. The secrets
# come from the environment (SKEP_PROVIDER_SECRET, SKEP_EDITOR_SECRET) and
# are never written to the tree.
#   harness/run.sh          the gate
#   harness/run.sh safari   the OWNER's pass (FP-19): opens the page in Safari, asserts nothing
set -u
cd "$(dirname "$0")/.." || exit 2
PAGE_PORT=8731
PROVIDER=http://127.0.0.1:8742
EDITOR_PROVIDER=http://127.0.0.1:8744
BOARD=http://127.0.0.1:8644
TMP="${TMPDIR:-/tmp}"

if [ -z "${SKEP_PROVIDER_SECRET:-}" ]; then
  echo "GATE: SKEP_PROVIDER_SECRET must be in the environment (the provider's admission secret; never written to the tree)"
  exit 2
fi

if [ "${1:-}" = "safari" ]; then
  open -a Safari "http://127.0.0.1:${PAGE_PORT}/?provider=${SKEP_PROVIDER_SECRET}"
  echo "opened the page in Safari — the owner looks; nothing is asserted (serve.py must be running on ${PAGE_PORT})"
  exit 0
fi

if [ -z "${SKEP_EDITOR_SECRET:-}" ]; then
  echo "GATE: SKEP_EDITOR_SECRET must be in the environment (the harness's provider's admission secret, the one on 8744; never written to the tree)"
  exit 2
fi

lsof -nP -iTCP:8644 -sTCP:LISTEN >/dev/null 2>&1 || { echo "GATE: no board answers on 8644 — the owner's prelude starts the test board; the gate never does"; exit 2; }
lsof -nP -iTCP:8742 -sTCP:LISTEN >/dev/null 2>&1 || { echo "GATE: no provider answers on 8742 — the owner's prelude starts it; the gate never does"; exit 2; }
lsof -nP -iTCP:8744 -sTCP:LISTEN >/dev/null 2>&1 || { echo "GATE: no provider answers on 8744 — the owner's prelude starts the harness's provider; the gate never does"; exit 2; }
if lsof -nP -iTCP:${PAGE_PORT} -sTCP:LISTEN >/dev/null 2>&1; then echo "GATE: port ${PAGE_PORT} is taken — stop what holds it"; exit 2; fi
python3 -c 'import websocket' 2>/dev/null || { echo "GATE: python3 needs websocket-client"; exit 2; }

status=0
echo "== the checker"
npx tsc -p jsconfig.json || { echo "GATE: the checker is red"; status=1; }
echo "== the pure tests"
node --test 'web/**/*.test.js' || { echo "GATE: a pure test is red"; status=1; }

echo "== the page's server on ${PAGE_PORT}"
python3 harness/serve.py ${PAGE_PORT} --results results --shots shots > "${TMP}/skep-gate-serve.log" 2>&1 &
SERVE=$!
cleanup() {
  kill "$SERVE" 2>/dev/null
  # no Chrome the harness started may outlive the gate
  for p in $(pgrep -f "remote-debugging-port=9342" 2>/dev/null); do kill "$p" 2>/dev/null; done
}
trap cleanup EXIT
sleep 0.6

echo "== the driver"
python3 harness/drive.py \
  --page "http://127.0.0.1:${PAGE_PORT}/index.html?provider=${SKEP_PROVIDER_SECRET}&gate=all" \
  --provider "${PROVIDER}" --board "${BOARD}" --editor-provider "${EDITOR_PROVIDER}" \
  --cases all --results results --shots shots || { echo "GATE: a case is red, or the page threw"; status=1; }

echo "== the report"
python3 harness/report.py > /dev/null || status=1
echo "report: results/report.md"
if [ "$status" -eq 0 ]; then echo "GATE GREEN"; else echo "GATE RED"; fi
exit $status
