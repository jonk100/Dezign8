#!/usr/bin/env bash
# PreToolUse hook — enforce the import-direction hard constraint (CLAUDE.md).
#   * .css files import nothing.
#   * Component files must not import from a sibling component.
# Matches: write_to_file | replace_file_content | multi_replace_file_content
# Conservative by design: only hard-denies the two unambiguous violations to avoid false positives.
set -euo pipefail

IN="$(cat)"

allow() { echo '{"decision":"allow"}'; exit 0; }
deny()  { jq -nc --arg r "$1" '{decision:"deny",reason:$r}'; exit 0; }

tgt=$(printf '%s' "$IN" | jq -r '.toolCall.args.TargetFile // empty')
[ -z "$tgt" ] && allow

content=$(printf '%s' "$IN" | jq -r '
  [ .toolCall.args.CodeContent,
    .toolCall.args.ReplacementContent,
    (.toolCall.args.ReplacementChunks // [] | map(.ReplacementContent) | join("\n")) ]
  | map(select(. != null)) | join("\n")')
[ -z "$content" ] && allow

# Rule: .css files import nothing — they only read CSS custom properties.
case "$tgt" in
  *.css)
    if printf '%s' "$content" | grep -Eq '^[[:space:]]*@?import\b'; then
      deny ".css files import nothing — they only read CSS custom properties (CLAUDE.md)."
    fi
    allow ;;
esac

# Only police files that live inside a component directory.
if printf '%s' "$tgt" | grep -Eq '/design/[^/]+/components/[^/]+/'; then
  comp=$(printf '%s' "$tgt" | sed -E 's#.*/design/[^/]+/components/([^/]+)/.*#\1#')
  dir=$(dirname "$tgt")

  specs=$(printf '%s' "$content" \
    | grep -Eo "from[[:space:]]+['\"][^'\"]+['\"]" \
    | sed -E "s/from[[:space:]]+['\"]([^'\"]+)['\"]/\1/" || true)

  while IFS= read -r s; do
    [ -z "$s" ] && continue
    # Resolve relative specifiers so `../button/...` is comparable to aliased paths.
    norm="$s"
    case "$s" in
      .*) norm=$(realpath -m "$dir/$s" 2>/dev/null || printf '%s' "$s") ;;
    esac
    if printf '%s' "$norm" | grep -Eq '/design/[^/]+/components/[^/]+'; then
      other=$(printf '%s' "$norm" | sed -E 's#.*/design/[^/]+/components/([^/]+).*#\1#')
      if [ -n "$other" ] && [ "$other" != "$comp" ]; then
        deny "Import-direction violation: '$s' reaches into sibling component '$other'. Components don't import from sibling components (CLAUDE.md)."
      fi
    fi
  done <<EOF
$specs
EOF
fi

allow
