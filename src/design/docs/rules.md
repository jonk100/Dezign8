# Design System Rules
 
Hard constraints. If something feels like it breaks one of these,
it probably needs to go in a different file or layer.
 
---
 
## Import direction
 
```
vars.css / tokens.css
  ↑
shared/primitives.tokens.ts
  ↑
<category>.tokens.ts
  ↑
<category>.props.ts   <category>.hook.ts   <category>.css
  ↑                         ↑
<component>.tokens.ts
  ↑
<component>.props.ts  <component>.hook.ts  <component>.css
  ↑
<Component>.astro
```
 
- **Lower layers never import from higher layers.**
- `shared/` imports nothing from any category or component.
- A category never imports from a sibling category.
- A component never imports from a sibling component.
  - **Exception:** `Combobox` imports `SelectOption` from `Select` because the
    type genuinely describes the same data shape (option value + label). This is a
    lone, one-directional exception that doesn't create entanglement.
- `.css` files import nothing — they only read CSS custom properties.
- `primitives.tokens.ts` imports from `tokens.ts` only.
---
 
## `shared/tokens.ts`
 
- Contains engine functions only: `scale`, `dimension`, `defineTokens`,
  `composeTokens`, `pickValues`, `resolveTokens`.
- Contains no values, no CSS variable references, no component knowledge.
- Never changes except to fix the engine or add a new engine primitive.
---
 
## `shared/primitives.tokens.ts`
 
- Every shared value scale lives here and nowhere else.
- A value map (`--space-lg: 1.5rem`) is written **exactly once** in this file.
- Adding a value to a scale here automatically updates every derived type
  across all categories. No other files change.
- Dimensions that are **only** used by one category do NOT belong here.
  Keep them local to that category's `tokens.ts`.
- Never imports from any category or component.
---
 
## `<category>.tokens.ts`
 
- Assembles the category spec using `defineTokens` and dimensions from primitives.
- Category-only dimensions (e.g. `variant` for surface, `variant` for control)
  are defined here, not in primitives.
- No defaults live here — defaults belong in component `tokens.ts`.
- No runtime logic — pure data.
---
 
## `<component>.tokens.ts`
 
- **Always exists**, even if it is only a re-export.
  Reason: consistent import paths; protects against future additions without
  import churn across the component's other files.
- Re-export shape when adding nothing new:
  ```ts
  export { CONTROL_TOKENS as BUTTON_TOKENS } from "../control.tokens";
  ```
- Extend shape when adding a dimension:
  ```ts
  export const PAPER_TOKENS = composeTokens(SURFACE_TOKENS, { gap: … });
  ```
- Narrow shape when restricting inherited values:
  ```ts
  export const HEADING_TOKENS = composeTokens(TYPOGRAPHY_TOKENS, {
    weight: pickValues(WEIGHT_DIM, ["semibold", "bold"] as const),
  });
  ```
- **Defaults live here**, not in a separate `consts.ts`.
- Component-only constant lists (`BUTTON_TYPES`, `BUTTON_TARGETS`) live here.
- Derived types (`HeadingWeight`, `GapScale`) are exported from here.
---
 
## `<component>.props.ts`
 
- Types only. No `export const`, no runtime values.
- Scale types are always derived from the token spec:
  ```ts
  // CORRECT
  export type TextSize = keyof typeof TYPOGRAPHY_TOKENS.size.values;
 
  // WRONG — hand-written union can drift from the spec
  export type TextSize = "xs" | "sm" | "md" | "lg";
  ```
- Boolean props, structural props (`as`, `level`, `href`), and
  behaviour props (`interactive`, `selectable`) are declared here.
  They are NOT token dimensions.
---
 
## `<component>.hook.ts`
 
- Returns `{ Tag, props }` (or `{ fooAttributes }` for category hooks).
- No rendering, no JSX, no Astro APIs.
- All defaults are applied by destructuring — no conditional default logic.
- Boolean props emit class modifiers directly, not through `resolveTokens`.
- HTML attributes (`href`, `type`, `target`) are passed through as-is —
  they never touch `resolveTokens`.
- Behaviour props (`interactive`, `selectable`) produce `data-*` and `aria-*`
  attributes directly in the hook.
- `disabled` is the exception: pass `disabled: isDisabled` in `BaseComposeOptions`
  to `useBaseCompose` — it emits `aria-disabled` + `data-disabled` automatically.
  Pass the **computed** value (e.g. `!isLink && disabled`) not the raw prop.
- `resolveTokens` is called **once** per hook with the component's own tokens.
- One-off props that bypass the token system (`bg`, `animation`) are
  applied manually after `resolveTokens`.
**Which hook pattern to use:**
 
| Component tokens shape | Hook pattern |
|---|---|
| Re-export (no new dimensions) | Delegate to category hook |
| Extend (new dimensions added) | Call `resolveTokens` directly |
| Narrow (inherited values restricted) | Call `resolveTokens` directly |
 
Delegating to the category hook when the tokens are extended or narrowed
will silently widen types. Call `resolveTokens` directly in those cases.
 
---
 
## `<component>.css`
 
- Reads `--<category>-<key>` channel variables only.
- Never reads `--space-*`, `--color-*`, or any primitive var directly.
  Go through the channel: `var(--control-size)`, not `var(--space-md)`.
- Exception: fallback values inside `var()` may reference primitives:
  `var(--typography-weight, var(--weight-normal))`.
- Never branches on prop values. No `[data-size="lg"]` selector chains.
  All variance is resolved into CSS custom properties by the hook.
- Modifier classes (`.control--solid`, `.surface--glass`) select rules.
  CSS variables supply values within those rules.
- Component CSS reads the same channels as the category CSS —
  they share the channel namespace because they share the prefix.
---
 
## Channel naming
 
- Channel name = `--{prefix}-{dimension.key}`.
- `prefix` = the category that owns the stylesheet reading the channel.
- `key` = set on the dimension in `primitives.tokens.ts` or the category spec.
- Neither the prefix nor the full channel name is stored as a string literal
  anywhere. It is composed at `resolveTokens` call time.
- Use `scope` on a dimension when only the component's own CSS reads it:
  ```ts
  gap: dimension("gap", SPACE, { scope: "paper" })
  // emits --paper-gap regardless of the prefix passed to resolveTokens
  ```
- `--local-*` is reserved for truly one-off values with no token dimension
  and no category reader (e.g. `--local-bg` from the `bg` escape hatch).
---
 
## Naming conventions
 
| Thing | Convention | Example |
|---|---|---|
| Scale constant | SCREAMING_SNAKE | `SPACE`, `TEXT_SIZE` |
| Dimension constant | SCREAMING_SNAKE | `GAP`, `WEIGHT_DIM` |
| Token spec | SCREAMING_SNAKE + `_TOKENS` | `CONTROL_TOKENS` |
| Defaults object | SCREAMING_SNAKE + `_DEFAULTS` | `BUTTON_DEFAULTS` |
| Derived type | PascalCase | `GapScale`, `HeadingWeight` |
| CSS channel | `--{category}-{key}` | `--typography-size` |
| CSS class base | category or component name | `.control`, `.button` |
| CSS modifier | `{base}--{value}` | `.control--solid`, `.h--balance` |
 
---
 
## What never exists
 
- `consts.ts` — merged into `tokens.ts`.
- `maps.ts` — replaced by `primitives.tokens.ts` + `resolveTokens`.
- Hand-written union types for token scales — always derive from the spec.
- `cssVar` string literals in dimension definitions — the channel name
  is composed at resolve time, not stored.
- Logic in `.astro` files — hooks handle everything; templates only spread.
- Prop-value conditionals in CSS — the hook resolves those into vars and classes.
- Direct reads of `--color-*` or `--space-*` in component CSS — always
  go through a `--<category>-*` channel.
