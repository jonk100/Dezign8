# Creating Categories & Components

Practical guide updated from the data category session (Table, List, Skeleton).
Use this over older docs when they conflict.

---

## File structure

Every component has required files and optional extras:

```
<component>/
  <component>.tokens.ts      token spec and DEFAULTS
  <component>.props.ts       types only — no runtime values
  <component>.hook.ts        props → { Tag, props }
  <component>.css            reads --<ns>-- channels; no prop branching
  <component>.client.ts      client-side JS behavior (selection, dropdowns, etc.)  [optional]
  <Component>.astro
```

Category level adds shared files that components delegate to:

```
<category>/
  <category>.tokens.ts
  <category>.props.ts
  <category>.hook.ts
  <category>.css
  <category>.utils.ts        shared pure utilities for .client.ts files  [optional]
  components/
    <component>/…
```

**`.client.ts` vs `.utils.ts`:** explained in the [Client-side files](#client-side-behavior-files) section below.

---

## CSS channel naming

Double-dash as the semantic separator between namespace and property:

```
--{namespace}--{property}
```

| example | correct |
|---|---|
| `--data--color--border` | ✓ |
| `--data-color-border` | ✗ single-dash |
| `--flex-direction` | ✓ because `flex-direction` is the CSS property name |

`resolveTokens` emits `--${ns}--${dim.key}`. If you add CSS by hand, match this.
Dimension keys in `dimension("max-width", SCALE)` use the actual CSS property name
with hyphens — not camelCase.

---

## Hook return shapes

**Component hooks** always return `{ Tag, props }` for Astro consumption:

```ts
return { Tag, props };
```

**Category hooks** return a named attribute bag that component hooks destructure:

```ts
// trigger.hook.ts — category hook
return { triggerClass, triggerStyle, triggerAttrs, disabled, loading, rest, size };

// button.hook.ts — component hook consumes and returns { Tag, props }
const { triggerClass, triggerStyle, triggerAttrs, disabled, loading, rest, size }
  = useTrigger(triggerProps);
return { Tag, props: { class: …, style: …, ...triggerAttrs, ...rest } };
```

**Multi-element component hooks** return extra prop objects beyond `{ Tag, props }`:

| Component | Return shape |
|---|---|
| Most | `{ Tag, props }` |
| Input, Search, Checkbox, Radio | `{ Tag, props, inputAttrs }` |
| Select | `{ Tag, props, selectAttrs, resolvedOptions, placeholder }` |
| Combobox | `{ Tag, props, inputAttrs, hiddenAttrs, listboxAttrs, options, listboxId }` |
| Table | `{ wrapperProps, tableProps, caption, columns, data, sort, sortable }` |
| Field | `{ Tag, id, props }` |

**Two-element wrapper pattern** (Table): `overflow: auto` on `<table>` is ignored
by browsers. The wrapper `<div>` gets `.data` and all category attrs/CSS vars;
the inner `<table>` gets `.table`. CSS vars cascade automatically.
Name pairs by what they are — `wrapperProps`/`tableProps`, not `outerProps`/`innerProps`.

---

## Checklist: add a component to an existing category

```
category/
  components/
    mycomponent/
      mycomponent.tokens.ts   ← start here
      mycomponent.props.ts
      mycomponent.hook.ts
      mycomponent.css         (omit if category CSS covers everything)
      mycomponent.client.ts   (add if client-side behavior needed)
      MyComponent.astro
      index.ts
```

- [ ] `mycomponent.tokens.ts` — re-export, extend (`composeTokens`), or narrow (`pickValues`)
- [ ] `mycomponent.props.ts` — extend category interface; derive union types from token spec
- [ ] `mycomponent.hook.ts` — destructure with DEFAULTS, delegate to category hook or call `resolveTokens` directly
- [ ] `mycomponent.css` — reads `--<category>--*` channels; no branching on prop values
- [ ] `MyComponent.astro` — minimal template (3 lines for simple; more for slots or multiple elements)
- [ ] Check: does this component need a `VisualRegistry` declaration in `mycomponent.props.ts`?
- [ ] Add to category `components/index.ts` if one exists

**Nothing else changes.** Category tokens, category hook, shared primitives — all untouched unless you're genuinely extending them.

---

## Checklist: add a new category

```
design/
  <category>/
    <category>.tokens.ts
    <category>.props.ts
    <category>.hook.ts
    <category>.css
    components/
      <firstcomponent>/…
```

- [ ] Identify which dimensions come from `primitives.tokens.ts` (gap, color, radius, size) vs. category-specific
- [ ] If a new shared scale is needed across categories, add to `primitives.tokens.ts` first
- [ ] `<category>.tokens.ts` — assemble with `defineTokens`; null values for class-only dimensions
- [ ] `<category>.props.ts` — category interface extending `BaseComponentProps`
- [ ] `<category>.hook.ts` — `use<Category>()` returning a named attribute bag (not `{ Tag, props }`)
- [ ] `<category>.css` — base rules for all components in the category
- [ ] First component following the component checklist above

---

## The Astro component

Simple single-element component:

```astro
---
import type { HeadingProps } from "./heading.props";
import { useHeading }        from "./heading.hook";
import "../../typography.css";
import "./heading.css";

const { Tag, props } = useHeading(Astro.props as HeadingProps);
---
<Tag {...props}><slot /></Tag>
```

Multi-element component (Input pattern — hook returns `inputAttrs` separately):

```astro
---
const { Tag, props, inputAttrs } = useInput(Astro.props as InputProps);
---
<Tag {...props}>
  {Astro.slots.has("start") && <div class="input__start"><slot name="start" /></div>}
  <input class="input__control" {...inputAttrs} />
  {Astro.slots.has("end") && <div class="input__end"><slot name="end" /></div>}
</Tag>
```

Named slots use presence guards — `Astro.slots.has("name")` — nothing else.

---

## Token patterns quick reference

| Situation | Pattern |
|---|---|
| Component adds no new dimensions | Re-export: `export { CAT_TOKENS as MY_TOKENS }` |
| Component adds a dimension | `composeTokens(CAT_TOKENS, { newDim: … })` |
| Component restricts a dimension's values | `composeTokens(CAT_TOKENS, { dim: pickValues(DIM, […]) })` |
| Dimension is class-only (no CSS var) | `null` values in scale + `{ modifier: true }` in dimension |
| Dimension is component-only | `{ scope: "mycomponent" }` in dimension |

---

## Size map pattern

Trigger-family components (Button, etc.) have a sizing dimension that maps one
scale key to multiple CSS variables. This lives in `tokens.ts` alongside DEFAULTS:

```ts
// button.tokens.ts
export const BUTTON_SIZE_MAP = {
  sm: { p: "var(--space-in--xs)", pi: "var(--space-in--sm)", fs: "var(--label--sm)", h: "var(--ui-height--sm)" },
  md: { p: "var(--space-in--sm)", pi: "var(--space-in--md)", fs: "var(--label--md)", h: "var(--ui-height--md)" },
  // …
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZE_MAP;

export function resolveButtonSize(size: ButtonSize): string[] {
  const { p, pi, fs, h } = BUTTON_SIZE_MAP[size];
  return [
    `--button--p: ${p}`,
    `--button--pi: ${pi}`,
    `--button--fs: ${fs}`,
    `--button--h: ${h}`,
  ];
}
```

In the hook, spread the result into `composeStyle`:

```ts
const sizeStyle = resolveButtonSize(size);
style: composeStyle(triggerStyle, ...sizeStyle),
```

CSS then reads the component-scoped vars, never the raw scale:
```css
.button {
  padding-block:  var(--button--p);
  padding-inline: var(--button--pi);
  font-size:      var(--button--fs);
  min-height:     var(--button--h);
}
```

Use this pattern when one prop maps to more than one CSS property. If it maps
to exactly one, use a regular token dimension instead.

---

## Boolean props vs token dimensions

**Token dimension** — prop picks one of N values from a defined scale → `resolveTokens`
emits a CSS var and/or modifier class.

**Boolean prop** — on/off → hook emits a modifier class directly. Never goes through `resolveTokens`.

```ts
class: composeClass(
  "mycomponent",
  fullWidth && "mycomponent--full-width",  // boolean → direct class
)
```

```css
.mycomponent--full-width { width: 100%; }
```

---

## VisualRegistry module augmentation

Components that can be used via the `v` prop register themselves in `props.ts`:

```ts
// button.props.ts
declare module "~/shared/visuals" {
  interface VisualRegistry {
    Button: true;
  }
}
```

**Rule of thumb:** register if the visual treatment is self-contained enough to
be a skin — single element, distinctive appearance, meaningful without its
behavior. Anything structural, behavioral, or multi-element doesn't belong.

When in doubt, register. The cost of an unused entry is zero; the cost of a
missing one is a consumer reaching for inline styles instead.

---

## `loading` prop

`loading` lives in `BaseComponentProps`. Every component gets it. `useBaseCompose`
emits `data-loading="true"` on the root element automatically.

**Category hooks must still destructure `loading`** to prevent it leaking to the
DOM as the HTML attribute `loading="true"`:

```ts
const { loading, …rest } = props;
// destructured but not forwarded — useBaseCompose handles it
```

Each component implements its own loading UI. For data components that means
`<Skeleton />` rows/cells. For simpler components (Button, Badge), implement
a skeleton shape of the component itself.

---

## Skeleton

**Location:** `~/shared/components/skeleton/`

Skeleton is a **shared cross-category primitive**, not a data or feedback component.
`shared/components/` is the home for components used internally by multiple categories.

```ts
import Skeleton from "~/shared/components/skeleton/Skeleton.astro";
import "~/shared/components/skeleton/skeleton.css";
```

**Variants:** `text` | `heading` | `avatar` | `button` | `image` | `block`

```astro
<Skeleton variant="text" />
<Skeleton variant="text" lines={3} />     <!-- last line at 65% width -->
<Skeleton variant="avatar" />
<Skeleton variant="image" ratio="16/9" />
<Skeleton variant="block" width="200px" height="40px" />
```

**ARIA:** `aria-hidden="true"` + `role="presentation"` — screen readers skip it entirely.

**Animation:** shimmer (gradient sweep) defined once in `skeleton.css`. Single
standard across the whole system. Components with their own shimmer/pulse CSS
should be replaced with `<Skeleton />` on cleanup.

---

## Color role channels

When a prop accepts a `ColorRole`, use `resolveColorRole` — not `resolveTokens`.
`resolveTokens` skips `COLOR_ROLE` values (they're `null`). `resolveColorRole`
fans one role into seven CSS custom property channels:

```ts
import { resolveColorRole } from "~/shared/base.hook";

const colorVars     = color     ? resolveColorRole(color,     "--data--color")     : [];
const bgVars        = bg        ? resolveColorRole(bg,        "--data--bg")        : [];
const highlightVars = highlight ? resolveColorRole(highlight, "--data--highlight") : [];
```

Emits: `--{ns}--subtle`, `--{ns}--muted`, `--{ns}--base`, `--{ns}--vivid`,
`--{ns}--deep`, `--{ns}--border`, `--{ns}--text`.

CSS reads the specific shade it needs:
```css
border-color:     var(--data--color--border);
background-color: var(--data--bg--subtle);
color:            var(--data--color--text);
```

---

## Client-side behavior files

**`.client.ts`** — browser-only JS. Queried by the Astro `<script>` tag.
Use for selection state, dropdowns, keyboard nav, progressive enhancement:

```
mycomponent/
  mycomponent.client.ts   ← DOM logic lives here
  MyComponent.astro       ← <script> imports it
```

**`.utils.ts`** (category level) — pure functions and types, **no side effects on import**.
Use when multiple `.client.ts` files share logic:

```ts
// data.utils.ts — no DOM access, no listeners, no side effects on import
export interface SelectionDetail { … }
export function persistAndDispatch(…) { … }
```

`table.client.ts` and `list.client.ts` both import from `data.utils.ts`.
Future selectable components do the same.

---

## Selectable data components

**Checkbox setup:**
- Use `<Checkbox>` for selection checkboxes — not bare `<input>`
- Mark with `data-selection-cb`; client JS queries `[data-selection-cb] input`
- Native form participation: `name="selected"` and `value={index}` on each checkbox

**State:**
- Initialise `dataset.selected = "[]"` on mount — always readable without a listener
- Use `persistAndDispatch` from `data.utils.ts` to write state and fire the event
- Event name is component-namespaced: `table:selectionchange`, `list:selectionchange`

```ts
// Reading selection without a listener
const selected = JSON.parse(el.dataset.selected ?? "[]") as number[];
```

---

## JSDoc comment block for Astro components

Every Astro component file gets a frontmatter block comment covering:

1. What it does and its rendering modes (data-driven, compound, mixed)
2. HTML structure
3. Slots
4. Usage `@example` blocks
5. `@see` cross-references to hook, props, tokens, CSS
6. **ADJUSTING PROPS footer** — maps every visual prop to the file + CSS selector

```ts
 * ─────────────────────────────────────────────────────────────────────────────
 * ADJUSTING PROPS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * COLOR CHANNELS
 *   color       [./mycomponent.css]  var(--data--color--*) in border, hover
 *               @example color="danger" → red border + hover tint
 *
 * STATE
 *   loading     [./mycomponent.css]  .data[data-loading] td::after
 *               Change skeleton gradient colours or animation timing here.
```

---

## Pattern: layer-based elevation system

The `layer` prop replaces `variant` for surface-category components. Each layer
is a **complete visual unit** — background, shadow, and border defined together.
This gives the whole component tree a coherent elevation stack.

```
layer="0"     Section, Container   — page bg, no lift, no border
layer="1"     (reserved)           — slight raise
layer="2"     Paper                — distinct from page, sm shadow
layer="3"     Card                 — bounded object, md shadow
layer="4"     Tooltip, Popover…    — overlay; z-index: var(--z--overlay)
layer="5"     Modal, AlertDialog…  — top-level; z-index: var(--z--modal)
layer="inset" Well                 — sunken below context; inset shadow
```

**Border is part of the layer.** Layer 0 uses `transparent` (stable box-sizing
but no visible line). Layers 1–5 step up from `--border--subtle` to
`--border--default`. This means surfaces look right by default without any extra
border prop — and `outlined` overrides the layer border when stronger separation
is needed.

**Override order** (later in `surface.css` wins for same specificity):
1. Layer class sets defaults (`--surface--bg`, `--surface--shadow`, `--surface--border`)
2. `outlined` class overrides border (`--surface--border: var(--border--strong)`)
3. `glass` class overrides background
4. Inline style (from `shadow=` prop) beats everything

**z-index is automatic at layers 4+.** Overlay and modal components never
manually set z-index; it comes from the layer class.

**Inset uses `color-mix`** to darken relative to the inherited `--surface--bg`
from the parent layer — so a Well inside a Card automatically darkens from the
Card's background without knowing which layer it's in. Blending toward black is
correct in both light and dark mode since inset always means "darker than context."

Implementation in CSS:

```css
.surface--layer-3 {
  --surface--bg:     var(--bg--3);
  --surface--shadow: var(--shadow--md);
  --surface--border: var(--border--default);
}

/* override rules follow — same specificity, later in file, so they win */
.surface--outlined {
  --surface--border: var(--border--strong);
}

.surface--glass {
  --surface--bg: var(--bg--glass, rgb(255 255 255 / 0.7));
  backdrop-filter: blur(var(--surface--blur, 12px));
}

.surface--layer-inset {
  background: color-mix(in oklch, var(--surface--bg, var(--bg--0)) 92%, black 8%);
  box-shadow: inset 0 1px 3px var(--shadow--inset, rgb(0 0 0 / 0.08));
}
```

---

## Pattern: component-level default differs from category default

When a component's sensible default for a prop differs from the category default,
set it in `COMPONENT_DEFAULTS` — not by modifying the category tokens. Card
defaults to `layer="3"` and `outlined=true` while the surface category defaults
to `layer="0"` and `outlined=false`. The component hook applies its own default
before delegating:

```ts
// card.tokens.ts
export const CARD_DEFAULTS = {
  layer:    "3"  as SurfaceLayer,
  outlined: true,
  …
} as const;

// card.hook.ts
const { layer = CARD_DEFAULTS.layer, outlined = CARD_DEFAULTS.outlined, …surfaceProps } = props;
const { surfaceClass, … } = useSurface({ layer, outlined, …surfaceProps });
```

The consumer's explicit prop always wins — destructuring default < consumer value.

---

## Pattern: behavioral props on surfaces

Some surface components add interactive behavior (link, toggle, disabled) that
produces `aria-*` and structural attributes but never touches the token system.
These are separate concerns from the visual surface props:

1. Destructure behavioral props in the component hook before calling `useSurface`
2. Derive intent flags (`isLink`, `isToggle`, `isInteractive`, `isDisabled`)
3. Override `Tag` based on derived flags
4. Spread behavioral attrs alongside `surfaceAttrs` in the return

```ts
// card.hook.ts
const { href, interactive, selectable, selected, disabled, …surfaceProps } = props;

const isLink        = Boolean(href);
const isToggle      = !isLink && selectable;
const isInteractive = !isLink && (interactive || selectable);
const isDisabled    = !isLink && disabled;

return {
  Tag: isLink ? "a" : Tag,
  props: {
    …surfaceAttrs,
    role:           isToggle   ? "button"        : undefined,
    tabindex:       isInteractive ? (isDisabled ? -1 : 0) : undefined,
    "aria-pressed": isToggle   ? String(selected) : undefined,
    "aria-disabled":isDisabled ? "true"           : undefined,
  },
};
```

The behavioral props are never forwarded to the category hook — they stay in the
component hook's scope. `rest` does not contain them.

---

## Pattern: slot regions in compound surface components

Card-like components with named regions (media, body, footer) add wrapper divs
for each region in the Astro template — the hook does not know about slots.

Slots use presence guards. The body region is always rendered:

```astro
<Tag {...props}>
  {Astro.slots.has("media")  && <div class="card__media"><slot name="media" /></div>}
  <div class="card__body"><slot /></div>
  {Astro.slots.has("footer") && <div class="card__footer"><slot name="footer" /></div>}
</Tag>
```

The media region clips to the top radius and suppresses padding — those styles
live in `card.css`, reading `var(--surface--radius)` from the parent's CSS vars.
No extra prop or channel needed; the var cascades from `.surface`.

---

## What lives where — summary

| Item | Location |
|---|---|
| Skeleton component | `~/shared/components/skeleton/` |
| Icon component (future) | `~/shared/components/icon/` |
| Shared selection utilities | `~/data/data.utils.ts` |
| Client-side behavior | `<component>/<component>.client.ts` |
| Token generation source | `~/shared/primitives.definitions.ts` |
| Generated CSS | `~/styles/tokens.generated.css` (Vite plugin output — do not edit) |
