Here's the log entry for this session:

---

## Token system — shades, new roles, media blocks

**Decision:** Added vivid + deep to all four semantic color roles (success, danger, warning, info) in both LIGHT_TOKENS and DARK_TOKENS. These were defined but aliased to base/text; now proper palette steps.

Light: vivid = 2–3 steps lighter than base, deep = 6 steps darker.
Dark: vivid = 3 steps lighter, deep = 6 steps lighter (glow pattern matches accent/secondary).

---

## Tertiary color role

**Decision:** `tertiary` aliases the lime palette — same steps as `accent`. Two names, different semantic intent: `accent` = decorative highlights (tags, chips, badges); `tertiary` = third brand color slot. No new palette ramp needed.

**Rationale:** lime was already planned as the third brand color. accent is documented and wired; tertiary was added to COLOR_ROLE later without CSS backing.

---

## Neutral color role

**Decision:** `--neutral--*` vars live in the `:root` TOKEN_BLOCK (not in light/dark), aliasing existing theme-aware system vars. Theme-awareness comes for free — `var(--bg--3)` etc. cascade correctly per active theme.

```ts
const NEUTRAL_ROLE = {
  "neutral--subtle": "var(--bg--3)",
  "neutral--muted":  "var(--bg--4)",
  "neutral--base":   "var(--border--strong)",
  "neutral--vivid":  "var(--border--strong)",
  "neutral--deep":   "var(--text--secondary)",
  "neutral--border": "var(--border--default)",
  "neutral--text":   "var(--text--secondary)",
};
```

---

## Media query TOKEN_BLOCKS

**Decision:** Added `mediaQuery?` field to `TokenBlock` interface. Plugin wraps the block in the media rule when present. Two new blocks added: `HIGH_CONTRAST_TOKENS` and `PRINT_TOKENS`.

**Rationale:** `@media` blocks belong in the generated file, not hand-written in `global.css`. Plugin change was 6 lines.

---

## CSS registry migration — confirmed complete

**Decision:** Migration is done. `global.css` imports `tokens.generated.css`; old imports commented out. The four original files (`vars.css`, `color-vars.css`, `tokens.css`, `tokens-color.css`) are dead and can be deleted.

**Pending:** `rm` the four dead files.

---

## debug prop — deferred (YAGNI)

**Decision:** Not added to `BaseComponentProps`. If a debugging need arises, `console.log` in the hook for 30 seconds is faster than plumbing a prop.

---

## Files created or significantly updated this conversation

### Updated files
```
design/shared/primitives.definitions.ts   vivid/deep for semantic roles; tertiary;
                                           NEUTRAL_ROLE const; HIGH_CONTRAST_TOKENS;
                                           PRINT_TOKENS; TokenBlock mediaQuery field;
                                           NEUTRAL_ROLE spread into :root block
plugins/tokens.ts                          buildCSS handles mediaQuery wrapping
design/shared/base.hook.ts                stale vivid/deep comment removed
```