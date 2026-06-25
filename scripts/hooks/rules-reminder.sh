#!/usr/bin/env bash
# PreInvocation hook — inject key DS rules as an ephemeral reminder at the start
# of each session (invocationNum == 0 only) and periodically thereafter (every 10 turns)
# so they stay fresh over long sessions without bloating every single turn.
set -euo pipefail

IN="$(cat)"
invocation=$(printf '%s' "$IN" | jq -r '.invocationNum // 0')

if [ "$invocation" -ne 0 ] && [ $(( invocation % 10 )) -ne 0 ]; then
  echo '{"injectSteps":[]}'
  exit 0
fi

jq -nc '{injectSteps:[{ephemeralMessage:"Design system rules (CLAUDE.md / AGENTS.MD):\n• Never use React — Astro + pure CSS only.\n• No new dependencies unless unavoidable.\n• 5-file component shape: .tokens.ts → .props.ts → .hook.ts → .css → .astro\n• Import direction: shared → category → component. .css files import nothing.\n• CSS: no !important, max 2 levels of nesting, modifier classes for static booleans, data-* for JS-toggled state.\n• Mark simplifications: // ponytail: simplified; upgrade path: X\n• src/design/ changes → newest-first entry in ai/agent_decision_log.md + commit."}]}'
