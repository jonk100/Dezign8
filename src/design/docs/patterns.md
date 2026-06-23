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
 
Hook must call `resolveTokens` directly — delegating to the category hook
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
 
## Pattern: discriminated union props
 
Use when a component has multiple props whose types **depend on each other's
values** and they would conflict if allowed to be independent. Select uses
this for single vs multi-select:
 
```ts
// forms/select/select.props.ts
export interface SelectSingleProps extends FormProps {
  multiple?: false;        // or omitted
  value?: string;          // value is a single string
  onChange?: (v: string) => void;
}
 
export interface SelectMultiProps extends FormProps {
  multiple: true;
  value?: string[];        // value is an array when multiple is true
  onChange?: (v: string[]) => void;
}
 
export type SelectProps = SelectSingleProps | SelectMultiProps;
```
 
In the hook, use `as const` type assertions to narrow the union:
 
```ts
// forms/select/select.hook.ts
export function useSelect(props: SelectProps) {
  const isMultiple = props.multiple === true;
 
  // Cast to the appropriate narrowed type
  const { value, onChange, … } = isMultiple
    ? (props as SelectMultiProps)
    : (props as SelectSingleProps);
 
  // Now the types are correctly narrowed — value is string[] when isMultiple is true
  // …
}
```
 
The discriminant key (`multiple`) should be a boolean or literal string.
The consumer sees the full union type in intellisense and gets proper
narrowing when they check the discriminant.
 
---
 
## Pattern: three-state enum replacing conflicting booleans
 
Use when a component has two boolean props that are mutually exclusive or
conflicting. Checkbox uses this for the three visual states:
 
Instead of:
```ts
checked?: boolean;
indeterminate?: boolean;  // conflict: what if both are true?
```
 
Use a single discriminated union:
```ts
checkState?: "checked" | "unchecked" | "indeterminate";
```
 
In the hook:
```ts
const isChecked = checkState === "checked";
const isIndeterminate = checkState === "indeterminate";
// Now the states are mutually exclusive by type
```
 
This makes impossible states unrepresentable in the type system. Useful for
select-all checkbox patterns and any multi-state toggle.
 
---
 
## Pattern: category-default override in a component hook
 
Use when a component should have a different default than its category
for a particular token dimension.
 
Checkbox and Radio default to `variant: "ghost"` (traditional appearance),
while the form category defaults to `variant: "outlined"`. The component
hook applies its own default before delegating:
 
```ts
// forms/checkbox/checkbox.hook.ts
const { formClass, formStyle, … } = useForm({
  variant: "ghost",      // ← component default, not category default
  ...formProps,          // ← consumer value wins if provided via spread position
} as Parameters<typeof useForm>[0]);
```
 
The component default is applied **before** the spread, and the consumer's
props are spread **after**, so an explicit `variant="outlined"` still wins.
This gives the right precedence: component default < consumer override.
 
---
 
## Pattern: `id` / `name` routing for wrapper components
 
Use when a component's hook renders multiple elements with different semantic
roles (e.g. a visible wrapper and a hidden native input). `id` and `name`
must route to the correct native element, not the visual wrapper.
 
Destructure `id` and `name` **before** calling the category hook so they
stay in your local scope and don't get bundled into `rest`:
 
```ts
// forms/checkbox/checkbox.hook.ts
const {
  id,
  name,
  checked,
  …otherProps
} = props;
 
const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
  = useForm({ …otherProps } as Parameters<typeof useForm>[0]);
 
// Now id and name are available here, not in rest
const inputAttrs = {
  type: "checkbox",
  id,           // ← goes on the inner <input>, not the wrapper
  name,         // ← goes on the inner <input>, not the wrapper
  …
};
 
const wrapperProps = {
  class: composeClass(formClass, "checkbox"),
  style: formStyle,
  …formAttrs,
  …rest,        // id and name are NOT here
};
```
 
If `id` and `name` go on the wrapper `<div>` instead of the control, focus
management and `<label for="">` association break.
 
---
 
## Pattern: `<label>` as root element for toggle controls
 
Use for Checkbox, Radio, and similar components where the entire wrapper
should be clickable.
 
The root element is `<label>`, not `<div>`. This means clicking any part
of the component (indicator, text, whitespace) toggles the control without
extra wiring.
 
**Critical: DOM order never changes.** The hidden `<input>` must always
precede the indicator in the DOM, even if the `labelPosition` prop makes
them appear reversed visually:
 
```astro
<label class="checkbox checkbox--start">
  <input type="checkbox" hidden />           ← input first (DOM order)
  <span class="checkbox__indicator" />       ← indicator second
  <span class="checkbox__label"><slot /></span>
</label>
```
 
CSS `flex-direction: row-reverse` reorders `flex-direction` visually, but
the `~` sibling combinator in CSS (`input ~ .indicator:checked`) still works
because the DOM order is preserved.
 
---
 
## Pattern: progressive enhancement with `data-*` + Astro `<script>`
 
Use for client-side behaviour (like clearing a search input or managing a
combobox dropdown) that progressively enhances the server-rendered HTML.
 
The pattern:
 
1. Render a `data-*` attribute as an anchor point:
   ```astro
   <div class="search" data-search>
     <input class="search__control" />
     <button class="search__clear" hidden>×</button>
   </div>
   ```
 
2. Write a script that queries `[data-search]` and wires up behaviour:
   ```astro
   <script>
     document.querySelectorAll("[data-search]").forEach(el => {
       // Wire up clear button, Escape-to-clear, etc.
     });
   </script>
   ```
 
3. Astro deduplicates `<script>` blocks at the same position, so the script
   runs exactly once per page even if multiple Search instances exist.
**Important: View Transitions compatibility.** If the site uses `astro:transitions`,
page navigations don't trigger a full reload, so the top-level `document.querySelectorAll`
won't re-run on navigation. Wrap the script in an event listener instead:
 
```astro
<script>
  function init() {
    document.querySelectorAll("[data-search]").forEach(el => { … });
  }
 
  init();  // Run on initial load
  document.addEventListener("astro:page-load", init);  // Re-run on navigation
</script>
```
 
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
