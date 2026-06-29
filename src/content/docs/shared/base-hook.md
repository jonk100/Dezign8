---
title: Base Composition Hooks
description: Documentation for base composition hooks and utilities, including useBaseCompose.
category: Core
status: stable
---
# Base Composition Hooks (`base.hook.ts`)


These hooks and utilities form the shared foundation that every component hook in the design system runs through. 

## Utilities

### `composeClass(...parts)`
Composes a space-separated string of CSS class names from an array of class tokens. Falsy values are filtered out automatically.

**Usage:**
```typescript
import { resolveTokens } from '~/shared/tokens';
import { composeClass } from '~/shared/base.hook';

const { classes } = resolveTokens(ICON_TOKENS, { size }, 'icon');
const className = composeClass(...classes, 'other-class'); // "icon--md other-class"
```

### `composeStyle(...parts)`
Composes a semicolon-separated string of CSS style declarations from an array of style tokens. Falsy values are filtered out automatically.

**Usage:**
```typescript
import { resolveTokens } from '~/shared/tokens';
import { composeStyle } from '~/shared/base.hook';

const { style } = resolveTokens(ICON_TOKENS, { size: 'md' }, 'icon');
const styleAttribute = composeStyle(...style, 'color: blue;'); // "--icon--size: var(--size-md); color: blue;"
```

### `resolveColorRole(role, channel)`
Resolves a color role into a full set of CSS custom property assignments scoped to a given channel prefix.

**Usage:**
```typescript
resolveColorRole("primary", "data--color")
```
**Emits:**
```css
--data--color--subtle: var(--primary--subtle)
--data--color--muted:  var(--primary--muted)
--data--color--base:   var(--primary--base)
--data--color--vivid:  var(--primary--vivid)
--data--color--deep:   var(--primary--deep)
--data--color--border: var(--primary--border)
--data--color--text:   var(--primary--text)
```

---

## `useBaseCompose`

The shared foundation every component hook runs through. `useBaseCompose` takes component-specific class names and styles, merges them with consumer props (`BaseComponentProps`), and returns a unified bundle ready to spread onto the root HTML element.

### Parameters

| param | what goes here |
|---|---|
| `options.className` | Array of class tokens this hook has built. Falsy values are filtered out automatically. |
| `options.style` | Array of inline style tokens (CSS-variable assignments). Joined with `"; "`. |
| `options.attrs` | Extra `data-*` or `aria-*` attributes the hook wants to add. |
| `options.disabled` | Computed disabled state. When `true`, emits `aria-disabled="true"` and `data-disabled`. Overrides `base.disabled`. |
| `options.loading` | Computed loading state. When `true`, emits `aria-busy="true"` and `data-loading`. Overrides `base.loading`. |
| `base` | The leftover props from the consumer's spread (e.g., spacing, motion, `v`, `testId`, `bg`, `class`, `style`). |

### Return value

| key | type | what it contains |
|---|---|---|
| `className` | `string` | Final space-separated class string. Spread as `class={className}`. |
| `style` | `string` | Final semicolon-separated inline style string. |
| `attrs` | `object` | All data/aria attributes. Spread with `{...attrs}`. |
| `rest` | `object` | Remaining native HTML attributes not consumed by the hook or `useBaseCompose`. |

---

## Consumption Patterns

### Pattern 1 — Token classes + token styles, no extras
**Used by:** `useIcon`, `useOverlays`, `useAvatar`, and most leaf-node component hooks.
Passes `classes` and `style` directly, spreading everything back onto the element.

```typescript
const { classes: tokenClasses, style: tokenStyle } = resolveTokens(ICON_TOKENS, { size, color }, "icon");

const { className: cls, style, attrs, rest } = useBaseCompose({
  className: ["icon", ...tokenClasses, className],
  style: tokenStyle,
}, base);
```

### Pattern 2 — Token classes + token styles + color channels + spacing
**Used by:** `useLayout`, `useFeedback`, `useData`, `useForms`.
Adds color role channels (`resolveColorRole`) and spacing styles (`resolveSpacingStyles`).

```typescript
const spacingStyle = resolveSpacingStyles({ p, mx }, "layout");

const { className: cls, style, attrs, rest } = useBaseCompose({
  className: ["layout", ...tokenClasses, className],
  style: [
    ...tokenStyle,
    ...spacingStyle,
    ...(bg ? resolveColorRole(bg, "layout--bg") : []),
  ],
}, base);
```

### Pattern 3 — Passing `options.attrs` for component-specific data attributes
**Used by:** `useData`, `useFeedback`.
Builds extra `data-*` attributes via `options.attrs` which merge with base attributes.

```typescript
const { className: cls, style, attrs, rest } = useBaseCompose({
  className: ["data", ...tokenClasses, className],
  style: [...tokenStyle, ...colorStyle],
  attrs: {
    ...(emptyAttr !== undefined ? { "data-empty": emptyAttr } : {}),
    ...(interactive ? { "data-interactive": "true" } : {}),
  },
}, base);
```

### Pattern 4 — Category hook delegates to component hooks (two-level composition)
**Used by:** `useFeedback` → `useBadge` / `useSpinner` / `useProgress`.
A category hook (`useFeedback`) calls `useBaseCompose`, and child component hooks (`useBadge`) compose the output without calling `useBaseCompose` again.

```typescript
// useFeedback calls useBaseCompose internally
const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({ variant: "solid", ...feedbackProps });

// badge.hook.ts
return {
  Tag: "span" as const,
  props: {
    class: composeClass(feedbackClass, "badge"),
    style: feedbackStyle,
    ...feedbackAttrs,
    ...rest,
  },
};
