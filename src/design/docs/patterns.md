# Patterns & Checklists

Concrete recipes for the most common tasks.

---

## Adding a component to an existing category

**Example:** adding `Chip` to the `control` category.

```
control/
  chip/
    chip.tokens.ts    ← start here
    chip.props.ts
    chip.hook.ts
    chip.css
    Chip.astro
    index.ts
```

**Checklist:**

- [ ] `chip.tokens.ts` — re-export, extend, or narrow
- [ ] `chip.props.ts` — extend category interface, derive types from spec
- [ ] `chip.hook.ts` — destructure, delegate or call resolveTokens directly
- [ ] `chip.css` — reads `--control-*` channels
- [ ] `Chip.astro` — three lines
- [ ] `index.ts` — barrel export
- [ ] Add to category `index.ts` if one exists

**Nothing else changes.** Category tokens, category hook, shared primitives —
all untouched.

---

## Adding a new category

**Example:** adding a `feedback` category (Alert, Toast, Badge).

```
design/
  feedback/
    feedback.tokens.ts   ← category spec
    feedback.props.ts    ← category interface
    feedback.hook.ts     ← shared logic + resolveTokens
    feedback.css         ← reads --feedback-* channels
    alert/
      …
    badge/
      …
```

**Checklist:**

- [ ] Identify which dimensions come from primitives (gap, color, size)
      and which are category-specific (intent, status)
- [ ] `feedback.tokens.ts` — assemble spec with `defineTokens`
- [ ] `feedback.props.ts` — category interface extending `BaseComponentProps`
- [ ] `feedback.hook.ts` — `useFeedback()` calling `resolveTokens(FEEDBACK_TOKENS, …, "feedback")`
- [ ] `feedback.css` — base rules reading `--feedback-*`
- [ ] Add each component following the single-component checklist above

**Check shared primitives.** If a new scale is needed that could be reused
across categories (e.g. a `STATUS` scale for intent-based color roles),
add it to `primitives.tokens.ts` first, then reference it from the category spec.

---

## Pattern: re-export tokens (no new dimensions)

Use when the component inherits the full category spec unchanged.
Button, Checkbox — they add boolean props and HTML attrs but no new
enumerated dimensions.

```ts
// control/button/button.tokens.ts
export { CONTROL_TOKENS as BUTTON_TOKENS } from "../control.tokens";
export type { ControlSize as ButtonSize, ControlColor as ButtonColor,
              ControlVariant as ButtonVariant, ControlRadius as ButtonRadius }
  from "../control.tokens";

export const BUTTON_TYPES   = ["button", "submit", "reset"] as const;
export const BUTTON_TARGETS = ["_self", "_blank", "_parent", "_top"] as const;
export type ButtonType   = typeof BUTTON_TYPES[number];
export type ButtonTarget = typeof BUTTON_TARGETS[number];

export const BUTTON_DEFAULTS = {
  type:      "button" as ButtonType,
  iconOnly:  false,
  fullWidth: false,
} as const;
```

Hook delegates to category hook:
```ts
// control/button/button.hook.ts
const { controlClass, controlStyle, controlAttrs, disabled, loading, rest }
  = useControl(controlProps);  // ← delegate
```

---

## Pattern: extend with new dimension

Use when the component adds a dimension that the category doesn't have.
Paper adds `gap`; the surface category has no gap concept.

```ts
// surfaces/paper/paper.tokens.ts
import { composeTokens, dimension } from "@/design/shared/tokens";
import { SURFACE_TOKENS } from "../surface.tokens";
import { SPACE } from "@/design/shared/primitives.tokens";

export const PAPER_TOKENS = composeTokens(SURFACE_TOKENS, {
  // scope: "paper" because only paper.css reads --paper-gap
  // surface.css has no gap rule
  gap: dimension("gap", SPACE, { scope: "paper" }),
});
export type GapScale = keyof typeof PAPER_TOKENS.gap.values;
```

Hook calls `resolveTokens` directly with `PAPER_TOKENS`.
Gap is passed conditionally — only emit the channel when `stack` is true:

```ts
// surfaces/paper/paper.hook.ts
const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
  PAPER_TOKENS,
  {
    variant, radius, padding, blur,
    shadow: resolvedShadow,          // derived by category logic
    gap: stack ? gap : undefined,    // undefined = resolveTokens skips it
  },
  "surface",
);
```

`gap: undefined` means `resolveTokens` skips the dimension entirely —
`--paper-gap` is never written when `stack` is false, so `paper.css`
reads `var(--paper-gap)` without a fallback problem.

---

## Pattern: narrow an inherited dimension

Use when the component should only accept a subset of the category's
allowed values. Heading restricts `weight` to `["semibold", "bold"]`.

```ts
// typography/heading/heading.tokens.ts
import { composeTokens, pickValues } from "@/design/shared/tokens";
import { TYPOGRAPHY_TOKENS } from "../typography.tokens";
import { WEIGHT_DIM } from "@/design/shared/primitives.tokens";

export const HEADING_TOKENS = composeTokens(TYPOGRAPHY_TOKENS, {
  weight: pickValues(WEIGHT_DIM, ["semibold", "bold"] as const),
});
export type HeadingWeight = keyof typeof HEADING_TOKENS.weight.values;
// → "semibold" | "bold"   (weight="normal" is a TS error at authoring time)
```

The narrowed type surfaces in `props.ts`:
```ts
export interface HeadingProps extends TypographyProps {
  weight?: HeadingWeight;  // overrides the wider FontWeight from TypographyProps
}
```

Calling `resolveTokens` directly with `HEADING_TOKENS` keeps the narrowing
enforced end-to-end. Delegating to the category hook
would widen the type back to the full `FontWeight` union:
```ts
const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
  HEADING_TOKENS,          // ← not TYPOGRAPHY_TOKENS
  { size, weight, … },
  "typography",
);
```

---

## Pattern: boolean prop

Boolean props are NOT token dimensions. They emit a class modifier directly
in the hook and are read by CSS class selectors, not CSS custom properties.

```ts
// hook
class: composeClass(
  "paper",
  surfaceAttributes.class,
  fullWidth && "paper--full-width",   // ← direct class, no resolveTokens
  stack     && "paper--stack",
)
```

```css
/* paper.css */
.paper--full-width { width: 100%; }
.paper--stack {
  display: flex;
  flex-direction: column;
  gap: var(--paper-gap);   /* gap IS a token dimension, written by resolveTokens */
}
```

Rule of thumb: if the prop picks one of N values from a defined scale →
token dimension. If it's on/off → boolean, emits a class.

---

## Pattern: behaviour prop

Behaviour props (`interactive`, `selectable`, `disabled`, `href`) produce
`data-*`, `aria-*`, and structural attributes. They never touch the token system.

```ts
// card.hook.ts
const isLink        = Boolean(href);
const isToggle      = !isLink && selectable;
const isInteractive = !isLink && (interactive || selectable);

return {
  Tag: isLink ? "a" : as,
  props: {
    …surfaceAttributes,
    "data-card":        isInteractive ? ""      : undefined,
    "data-selectable":  isToggle      ? "true"  : undefined,
    "data-selected":    isToggle      ? String(selected) : undefined,
    "data-disabled":    isDisabled    ? "true"  : undefined,
    role:               isInteractive ? "button" : undefined,
    tabindex:           isInteractive ? (isDisabled ? -1 : 0) : undefined,
    "aria-pressed":     isToggle      ? String(selected) : undefined,
    "aria-disabled":    isDisabled    ? "true"  : undefined,
  },
};
```

CSS then selects on the data attributes:
```css
.card:is(a, [data-interactive]):hover { transform: translateY(-2px); }
.card[data-selected="true"]           { border-color: var(--token-border-selected); }
```

---

## Pattern: shared derived logic

When multiple components in a category share non-trivial conditional logic
(not just token resolution), expose it from the category hook.

Surface has two derived values that both Paper and Card need:

```ts
// surfaces/surface.hook.ts
export function useSurface(props: SurfaceComponentProps) {
  const { variant, border, shadow, … } = props;

  // Derived logic — not a token dimension
  const resolvedBorder = border || variant === "glass" || variant === "outlined";
  const resolvedShadow = variant === "glass"
    ? "none"
    : shadow ?? VARIANT_DEFAULT_SHADOW[variant];

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    SURFACE_TOKENS,
    { variant, radius, padding, blur, shadow: resolvedShadow },
    "surface",
  );

  // …
  return { surfaceAttributes: { … } };
}
```

Paper, which extends the token spec with `gap`, can either:
- Call `useSurface` and compose `--paper-gap` on top (simple, fine for one extra dimension)
- Extract the derived logic into a helper if it needs full control over `resolveTokens`

For most cases, calling the category hook and composing on top is enough.
Only call `resolveTokens` directly when the token narrowing itself is what
requires it (like Heading's weight), not just because you added a dimension.

---

## Adding a value to an existing scale

Example: adding `"2xl"` gap to the shared space scale.

1. Open `shared/primitives.tokens.ts`
2. Add `"2xl": "var(--space-12)"` to `SPACE`
3. Done — `GapScale`, `Space`, `LayoutGap`, and every other derived type
   update automatically. No other files change.

---

## Adding a category-only dimension value

Example: adding `"sunken"` to `SurfaceVariant`.

1. Open `surfaces/surface.tokens.ts`
2. Add `sunken: null` to the variant dimension's values
3. Add the CSS rule to `surface.css`:
   ```css
   .surface--sunken { background-color: var(--token-surface-sunken); }
   ```
4. Done.

---

## Deprecating a `maps.ts` file

If you find an old `*.maps.ts` still around:

1. Check for any remaining imports with `grep -r "from.*maps"`
2. For each: replace the lookup with `resolveTokens` in the hook,
   or import the scale directly from `primitives.tokens.ts` if a
   one-off lookup is genuinely needed
3. Mark `@deprecated` and delete once the file has no consumers