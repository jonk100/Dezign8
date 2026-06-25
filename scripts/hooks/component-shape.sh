#!/usr/bin/env bash
# PreToolUse hook — warn when a component directory is missing required sibling files (CLAUDE.md).
# Required shape per component:
#   <component>.tokens.ts
#   <component>.props.ts
#   <component>.hook.ts
#   <component>.css
#   <Component>.astro  (capital)
#
# Fires on write_to_file when the target is a new file inside a component directory.
# Only asks (not denies) — the agent might be mid-scaffold and the sibling is next.
set -euo pipefail

IN="$(cat)"

allow() { echo '{"decision":"allow"}'; exit 0; }
ask()   { jq -nc --arg r "$1" '{decision:"ask",reason:$r}'; exit 0; }

name=$(printf '%s' "$IN" | jq -r '.toolCall.name // empty')
[ "$name" != "write_to_file" ] && allow

tgt=$(printf '%s' "$IN" | jq -r '.toolCall.args.TargetFile // empty')
[ -z "$tgt" ] && allow

# Only police files inside a component directory.
if ! printf '%s' "$tgt" | grep -Eq '/design/[^/]+/components/[^/]+/'; then
  allow
fi

dir=$(dirname "$tgt")
comp=$(printf '%s' "$dir" | sed -E 's#.*/components/([^/]+)$#\1#')
# Capitalise first letter for the .astro file name.
comp_cap="$(echo "${comp:0:1}" | tr '[:lower:]' '[:upper:]')${comp:1}"

required=(
  "${comp}.tokens.ts"
  "${comp}.props.ts"
  "${comp}.hook.ts"
  "${comp}.css"
  "${comp_cap}.astro"
)

missing=()
for f in "${required[@]}"; do
  filepath="${dir}/${f}"
  # Skip the file currently being written — it's about to exist.
  [ "$filepath" = "$tgt" ] && continue
  [ -f "$filepath" ] || missing+=("$f")
done

[ ${#missing[@]} -eq 0 ] && allow

missing_list=$(IFS=', '; echo "${missing[*]}")
ask "Component '$comp' is missing: $missing_list. The 5-file shape is required (CLAUDE.md). Continue if you're mid-scaffold and will create them next."
