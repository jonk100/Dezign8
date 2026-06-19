# Design System Architecture

---

## File structure

Every category and component follows the same shape.

```
design/
  shared/
    tokens.ts              engine — scale, dimension, defineTokens, resolveTokens
    primitives.tokens.ts   vocabulary — shared scales + shared dimensions
    base.props.ts          BaseComponentProps (HTML passthrough + testId, v, bg, animation)
    base.hook.ts           composeClass / composeStyle / useBaseCompose
    visuals.ts             VisualRegistry for the `v` prop

  <category>/
    <category>.tokens.ts   category spec
    <category>.props.ts    category props interface
    <category>.hook.ts     shared derived logic + resolveTokens
    <category>.css         base stylesheet — reads --<category>-* channels

    <component>/
      <component>.tokens.ts  re-export OR extend/narrow — present for every component
      <component>.props.ts   component props + derived types
      <component>.hook.ts    component logic → { Tag, props }
      <component>.css        component-specific styles
      <Component>.astro      3 lines
      index.ts               barrel
```

**Per component: 4 files + Astro component + index. No `consts.ts`, no `maps.ts`.**

---

## The 4 files

### `tokens.ts`

Owns the token spec and the defaults. Both in the same file because defaults
are just "which valid value we pick when none is given."

**Category level** — assembles the spec from primitives:

```ts
// typography/typography.tokens.ts
import { defineTokens, dimension } from "@/design/shared/tokens";
import {
  TEXT_SIZE, WEIGHT_DIM, FAMILY_DIM,
  LEADING_DIM, TRACKING_DIM, TEXT_COLOR_DIM,
} from "@/design/shared/primitives.tokens";

export const TYPOGRAPHY_TOKENS = defineTokens({
  size:     dimension("size", TEXT_SIZE),
  weight:   WEIGHT_DIM,
  family:   FAMILY_DIM,
  leading:  LEADING_DIM,
  tracking: TRACKING_DIM,
  color:    TEXT_COLOR_DIM,
});
```

**Component level** — present for every component, commonly one of three shapes:

*Re-export* — component adds no new dimensions:
```ts
// control/button/button.tokens.ts
export { CONTROL_TOKENS as BUTTON_TOKENS } from "../control.tokens";
export type { ControlSize as ButtonSize, ControlColor as ButtonColor }
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

*Extend* — component adds a new dimension:
```ts
// surfaces/paper/paper.tokens.ts
import { composeTokens, dimension } from "@/design/shared/tokens";
import { SURFACE_TOKENS } from "../surface.tokens";
import { SPACE } from "@/design/shared/primitives.tokens";
import type { PaperTag } from "./paper.props";

export const PAPER_TOKENS = composeTokens(SURFACE_TOKENS, {
  gap: dimension("gap", SPACE, { scope: "paper" }),
});
export type GapScale = keyof typeof PAPER_TOKENS.gap.values;

export const PAPER_DEFAULTS = {
  as:        "div" as PaperTag,
  fullWidth: false,
  stack:     false,
  gap:       "md"  as GapScale,
} as const;
```

*Narrow* — component restricts an inherited dimension's values:
```ts
// typography/heading/heading.tokens.ts
import { composeTokens, pickValues } from "@/design/shared/tokens";
import { TYPOGRAPHY_TOKENS } from "../typography.tokens";
import { WEIGHT_DIM } from "@/design/shared/primitives.tokens";
import type { HeadingLevel, FontFamily, TextSize, TextColor, Leading, Tracking } from "../typography.props";

export const HEADING_TOKENS = composeTokens(TYPOGRAPHY_TOKENS, {
  weight: pickValues(WEIGHT_DIM, ["semibold", "bold"] as const),
});
export type HeadingWeight = keyof typeof HEADING_TOKENS.weight.values;

export const HEADING_DEFAULTS = {
  level:    2            as HeadingLevel,
  size:     "3xl"        as TextSize,
  weight:   "semibold"   as HeadingWeight,
  family:   "sans"       as FontFamily,
  color:    "primary"    as TextColor,
  leading:  "tight"      as Leading,
  tracking: "tight"      as Tracking,
  balance:  false,
} as const;
```

---

### `props.ts`

Types only. No runtime values. Derives scale types from the token spec —
Prefer deriving scale types from the token spec rather than hand-writing unions.

```ts
// typography/typography.props.ts
import type { BaseComponentProps } from "@/design/shared/base.props";
import type { TYPOGRAPHY_TOKENS } from "./typography.tokens";

export type TextSize   = keyof typeof TYPOGRAPHY_TOKENS.size.values;
export type FontWeight = keyof typeof TYPOGRAPHY_TOKENS.weight.values;
export type FontFamily = keyof typeof TYPOGRAPHY_TOKENS.family.values;
export type Leading    = keyof typeof TYPOGRAPHY_TOKENS.leading.values;
export type Tracking   = keyof typeof TYPOGRAPHY_TOKENS.tracking.values;
export type TextColor  = keyof typeof TYPOGRAPHY_TOKENS.color.values;

export interface TypographyProps extends BaseComponentProps {
  size?:     TextSize;
  weight?:   FontWeight;
  family?:   FontFamily;
  color?:    TextColor;
  leading?:  Leading;
  tracking?: Tracking;
  balance?:  boolean;
}
```

Component props extend the category interface:
```ts
// typography/heading/heading.props.ts
import type { TypographyProps } from "../typography.props";
import type { HEADING_TOKENS } from "./heading.tokens";

export type HeadingLevel  = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingWeight = keyof typeof HEADING_TOKENS.weight.values; // "semibold" | "bold"

export interface HeadingProps extends TypographyProps {
  level?:  HeadingLevel;
  weight?: HeadingWeight;  // narrower than TypographyProps.weight
}
```

---

### `hook.ts`

Translates props into `{ Tag, props }`. No rendering, no JSX.

**Pattern A — re-export tokens → delegate to category hook:**

```ts
// control/button/button.hook.ts
export function useButton(props: ButtonProps) {
  const {
    type      = BUTTON_DEFAULTS.type,
    iconOnly  = BUTTON_DEFAULTS.iconOnly,
    fullWidth = BUTTON_DEFAULTS.fullWidth,
    href, target, rel,
    ...controlProps
  } = props;

  const isLink = Boolean(href);
  const { controlClass, controlStyle, controlAttrs, disabled, loading, rest }
    = useControl(controlProps);

  return {
    Tag: isLink ? "a" : "button",
    props: {
      class: composeClass(
        controlClass,
        "button",
        iconOnly  && "button--icon-only",
        fullWidth && "button--full-width",
      ),
      style: controlStyle,
      ...controlAttrs,
      ...rest,
      type:            !isLink ? type   : undefined,
      href:            isLink  ? href   : undefined,
      disabled:        disabled || loading || undefined,
      "aria-disabled": disabled || loading ? "true" : undefined,
      "aria-busy":     loading ? "true" : undefined,
    },
  };
}
```

**Pattern B — extended or narrowed tokens → call `resolveTokens` directly:**

```ts
// typography/heading/heading.hook.ts
export function useHeading(props: HeadingProps) {
  const {
    level    = HEADING_DEFAULTS.level,
    balance  = HEADING_DEFAULTS.balance,
    size     = HEADING_DEFAULTS.size,
    weight   = HEADING_DEFAULTS.weight,
    family   = HEADING_DEFAULTS.family,
    color    = HEADING_DEFAULTS.color,
    leading  = HEADING_DEFAULTS.leading,
    tracking = HEADING_DEFAULTS.tracking,
    class: className, v: _v, testId: _testId, bg, animation,
    ...rest
  } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    HEADING_TOKENS,
    { size, weight, family, color, leading, tracking },
    "typography",
  );

  const { className: cls, style, attrs } = useBaseCompose({
    className: [
      "typography",
      "h",
      ...tokenClasses,
      `h--${level}`,
      balance   && "h--balance",
      animation && `animate-${animation}`,
      className,
    ],
    style: [...tokenStyle, bg && `--local-bg: ${bg}`],
  }, props);

  return {
    Tag:   `h${level}` as const,
    props: { class: cls, style, ...attrs, ...rest },
  };
}
```

Why Pattern B for Heading: delegating to `useTypography` would widen the
narrowed `weight` type back to the full `FontWeight` union. Calling
`resolveTokens(HEADING_TOKENS, …)` keeps the narrowing enforced end-to-end.

---

### `css`

Reads `--<category>-<key>` channels. Prefer not branching on prop values —

```css
/* typography.css */
.typography {
  font-size:      var(--typography-size);
  font-weight:    var(--typography-weight,  var(--weight-normal));
  font-family:    var(--typography-family,  var(--font-sans));
  color:          var(--typography-color,   var(--token-text-primary));
  line-height:    var(--typography-leading, var(--leading-normal));
  letter-spacing: var(--typography-tracking,var(--tracking-normal));
  margin: 0;
}

/* heading.css — heading-specific only, everything else inherits typography.css */
.h--balance { text-wrap: balance; }
```

CSS fallbacks (`var(--typography-weight, var(--weight-normal))`) serve
opt-in components like `Txt` where unset props are intentionally skipped
by `resolveTokens`. Components like `H` always populate every channel via
their DEFAULTS and never hit those fallbacks.

---

## The Astro component

Always the same three lines:

```astro
---
import type { HeadingProps } from "./heading.props";
import { useHeading } from "./heading.hook";
import "./heading.css";

const { Tag, props } = useHeading(Astro.props as HeadingProps);
---
<Tag {...props}><slot /></Tag>
```

Named slots add presence guards, nothing else:
```astro
<Tag {...props}>
  {Astro.slots.has("media")  && <div class="card__media"><slot name="media" /></div>}
  <div class="card__body"><slot /></div>
  {Astro.slots.has("footer") && <div class="card__footer"><slot name="footer" /></div>}
</Tag>
```

The hook returns `Tag` as a string and `props` as a flat object.
Nothing is handled in the template.

---

## Channel naming

Channel names are composed at resolve time — prefer not storing them as string literals.

```
--{prefix}-{dimension.key}
```

| resolveTokens call | key | emits |
|---|---|---|
| `resolveTokens(HEADING_TOKENS, …, "typography")` | `"size"` | `--typography-size` |
| `resolveTokens(SURFACE_TOKENS, …, "surface")` | `"radius"` | `--surface-radius` |
| `resolveTokens(CONTROL_TOKENS, …, "control")` | `"color"` | `--control-color` |

**`scope` override** — pin the prefix on a dimension when only that component's
own CSS reads the channel:

```ts
// paper adds gap but surface.css doesn't read it — only paper.css does
gap: dimension("gap", SPACE, { scope: "paper" })
// emits --paper-gap regardless of the prefix passed to resolveTokens
```

---

## Theme switching

`tokens.css` is the only file that branches on theme. Components reference
`--token-*` exclusively.

```css
:root, [data-theme="light"] { --token-glass-bg: rgb(255 255 255 / 0.62); }
[data-theme="dark"]         { --token-glass-bg: rgb(24 28 34 / 0.68); }
```

The `theme` prop bypasses the token system entirely — it becomes a
`data-theme` attribute on the element, scoping token overrides to that subtree:

```ts
return { surfaceAttributes: { "data-theme": theme, …rest } };
```

---

## Shared scales

A scale is authored exactly once in `primitives.tokens.ts`. Categories
import the dimension object — they reference it rather than retyping the values.

The same `GAP` dimension emits different channel names under different categories:

```ts
// shared/primitives.tokens.ts
export const SPACE = scale({ none: "0", xs: "var(--space-xs)", … });
export const GAP   = dimension("gap", SPACE);  // no prefix baked in

// layout/layout.tokens.ts
export const LAYOUT_TOKENS = defineTokens({ gap: GAP, … });
// resolveTokens(LAYOUT_TOKENS, …, "layout") → --layout-gap

// surfaces/surface.tokens.ts
export const SURFACE_TOKENS = defineTokens({ gap: GAP, … });
// resolveTokens(SURFACE_TOKENS, …, "surface") → --surface-gap
```