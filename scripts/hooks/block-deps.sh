#!/usr/bin/env bash
# PreToolUse hook — block React and new dependencies (AGENTS.MD: never React; no new deps).
# Matches: run_command | write_to_file | replace_file_content | multi_replace_file_content
# Contract: reads tool-call JSON on stdin, prints {decision,reason} on stdout.
set -euo pipefail

IN="$(cat)"
name=$(printf '%s' "$IN" | jq -r '.toolCall.name // empty')

allow() { echo '{"decision":"allow"}'; exit 0; }
deny()  { jq -nc --arg r "$1" '{decision:"deny",reason:$r}'; exit 0; }
ask()   { jq -nc --arg r "$1" '{decision:"force_ask",reason:$r}'; exit 0; }

case "$name" in
  run_command)
    cmd=$(printf '%s' "$IN" | jq -r '.toolCall.args.CommandLine // empty')
    # An install/add that has at least one package argument (bare `pnpm install` to restore the
    # lockfile has no trailing arg and is allowed through).
    if printf '%s' "$cmd" | grep -Eqi '(pnpm|npm|yarn|bun)[[:space:]]+(add|install|i)[[:space:]]+[^[:space:]]'; then
      if printf '%s' "$cmd" | grep -Eqi 'react|react-dom|preact|solid-js|\bvue\b|svelte'; then
        deny "Framework dependency blocked — this is an Astro + pure CSS system. Never use React (AGENTS.MD)."
      fi
      ask "Dependency install detected: '$cmd'. No new dependencies unless unavoidable (AGENTS.MD). Confirm?"
    fi
    allow ;;
  write_to_file|replace_file_content|multi_replace_file_content)
    tgt=$(printf '%s' "$IN" | jq -r '.toolCall.args.TargetFile // empty')
    case "$tgt" in
      */package.json|package.json)
        content=$(printf '%s' "$IN" | jq -r '
          [ .toolCall.args.CodeContent,
            .toolCall.args.ReplacementContent,
            (.toolCall.args.ReplacementChunks // [] | map(.ReplacementContent) | join("\n")) ]
          | map(select(. != null)) | join("\n")')
        if printf '%s' "$content" | grep -Eqi '"(react|react-dom|preact)"'; then
          deny "React/Preact in package.json blocked — never use React (AGENTS.MD)."
        fi
        ask "Editing package.json. If this adds a dependency: no new deps unless unavoidable (AGENTS.MD). Confirm?" ;;
    esac
    allow ;;
  *) allow ;;
esac
