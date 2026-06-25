#!/usr/bin/env bash
# Stop hook — if anything under src/design/ changed this session but ai/agent_decision_log.md
# was not touched, send the agent back to log the decision (CLAUDE.md / AGENTS.MD).
set -euo pipefail

IN="$(cat)"
exec_num=$(printf '%s' "$IN" | jq -r '.executionNum // 0')

# Don't nag indefinitely.
[ "$exec_num" -ge 3 ] && { echo '{}'; exit 0; }

command -v git >/dev/null 2>&1 || { echo '{}'; exit 0; }

changed=$(git status --porcelain 2>/dev/null | sed -E 's/^.{3}//' || true)
[ -z "$changed" ] && { echo '{}'; exit 0; }

printf '%s\n' "$changed" | grep -Eq '^src/design/' || { echo '{}'; exit 0; }
printf '%s\n' "$changed" | grep -Eq 'ai/agent_decision_log\.md' && { echo '{}'; exit 0; }

jq -nc '{decision:"continue",reason:"src/design/ changed but ai/agent_decision_log.md was not updated. Add a newest-on-top entry documenting the decision, then finish."}'
