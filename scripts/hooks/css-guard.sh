#!/usr/bin/env bash
# PreToolUse hook — enforce CSS conventions in .css files (CLAUDE.md):
#   * No !important
#   * Nesting max 2 levels
# Matches: write_to_file | replace_file_content | multi_replace_file_content
set -euo pipefail

IN="$(cat)"

allow() { echo '{"decision":"allow"}'; exit 0; }
deny()  { jq -nc --arg r "$1" '{decision:"deny",reason:$r}'; exit 0; }

tgt=$(printf '%s' "$IN" | jq -r '.toolCall.args.TargetFile // empty')
[[ "$tgt" != *.css ]] && allow

content=$(printf '%s' "$IN" | jq -r '
  [ .toolCall.args.CodeContent,
    .toolCall.args.ReplacementContent,
    (.toolCall.args.ReplacementChunks // [] | map(.ReplacementContent) | join("\n")) ]
  | map(select(. != null)) | join("\n")')
[ -z "$content" ] && allow

# Rule: no !important — strip block comments first to avoid false positives on docs/strings.
clean_content=$(printf '%s' "$content" | awk '
  BEGIN { in_comment=0 }
  {
    line = ""
    for (i=1; i<=length($0); i++) {
      c = substr($0, i, 1)
      n = substr($0, i+1, 1)
      if (in_comment) {
        if (c == "*" && n == "/") { in_comment=0; i++ }
        else { line = line " " }
      } else {
        if (c == "/" && n == "*") { in_comment=1; i++; line = line " " }
        else { line = line c }
      }
    }
    print line
  }')
if printf '%s' "$clean_content" | grep -Eq '!important'; then
  deny "No !important in CSS — use specificity and structure instead (CLAUDE.md)."
fi

# Rule: max 2 levels of nesting — track brace depth character by character so
# single-line CSS (`.a { .b { .c { } } }`) is caught correctly.
# depth 1 = root selector, 2 = first nest, 3 = second nest (all allowed), 4+ = violation.
max_depth=$(printf '%s' "$content" | awk '
  BEGIN { depth=0; max=0; in_comment=0 }
  {
    for (i=1; i<=length($0); i++) {
      c = substr($0, i, 1)
      n = substr($0, i+1, 1)
      if (!in_comment && c=="/" && n=="*") { in_comment=1; i++; continue }
      if (in_comment && c=="*" && n=="/") { in_comment=0; i++; continue }
      if (in_comment) continue
      if (c=="{") { depth++; if (depth>max) max=depth }
      if (c=="}") { if (depth>0) depth-- }
    }
  }
  END { print max }
')

if [ "$max_depth" -gt 3 ]; then
  deny "CSS nesting exceeds 2 levels (max brace depth: $max_depth, limit: 3). Flatten to max 2 levels of nesting (CLAUDE.md)."
fi

allow
