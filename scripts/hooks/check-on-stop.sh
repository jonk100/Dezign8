#!/usr/bin/env bash
# Stop hook — refuse to finish while typecheck+lint is red. Returns {"decision":"continue"}
# to re-enter the loop with the failures attached; any other output allows the stop.
# Bails out after a few attempts so a genuinely unfixable failure can't loop forever.
set -euo pipefail

IN="$(cat)"
exec_num=$(printf '%s' "$IN" | jq -r '.executionNum // 0')

# Give up gating after 4 attempts — let the agent stop rather than spin.
[ "$exec_num" -ge 4 ] && { echo '{}'; exit 0; }

command -v just >/dev/null 2>&1 || { echo '{}'; exit 0; }

if out=$(just check 2>&1); then
  echo '{}'
else
  msg=$(printf '%s' "$out" | tail -n 40)
  jq -nc --arg r "Not done: \`just check\` is failing. Fix typecheck/lint before stopping:
$msg" '{decision:"continue",reason:$r}'
fi
