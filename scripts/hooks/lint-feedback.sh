#!/usr/bin/env bash
# PostInvocation hook — run `just check` after each model turn and inject any failures back
# to the agent so it self-corrects mid-session.
#
# NOTE: this lives on PostInvocation, not PostToolUse. PostToolUse returns only {} (it cannot
# feed results back to the model) and would also run on every single edit. PostInvocation fires
# once per turn, which is the right cadence for an `astro check` pass and can inject steps.
set -euo pipefail
cd "$(dirname "$0")/../.."

cat >/dev/null  # drain stdin (payload unused)

command -v just >/dev/null 2>&1 || { echo '{"injectSteps":[]}'; exit 0; }

if out=$(just check 2>&1); then
  echo '{"injectSteps":[]}'
else
  msg=$(printf '%s' "$out" | tail -n 40)
  jq -nc --arg m "⚠️ \`just check\` failed — fix before continuing:
$msg" '{injectSteps:[{ephemeralMessage:$m}]}'
fi
