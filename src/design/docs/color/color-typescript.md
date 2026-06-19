# Color System — TypeScript Implementation

→ See **color-overview.md** for orientation and **color-roles.md** for role definitions.

---

## Overview

Color is handled differently from other token dimensions because
one prop resolves to seven CSS channels rather than one.
The token engine's `resolveTokens` handles the class modifier;
`resolveColorChannels` handles the channel values separately.

```
COLOR_DIM          modifier: true, values all null
                   → emits class (control--primary)
                   → emits no CSS var

COLOR_STEPS        lookup: role → 7 step values
                   → used by resolveColorChannels

resolveColorChannels(role, prefix)
                   → returns 7 style strings
                   → called by hook alongside resolveTokens
```

---

## `primitives.tokens.ts` additions

```ts
/* ─── COLOR ROLE SCALE ───────────────────────────────────── */

/**
 * Color role scale. All values are null — this dimension emits a
 * class modifier only (.control--primary etc.) and writes no CSS var.
 * The actual step values are handled by resolveColorChannels.
 */
export const COLOR_ROLE = scale({
  primary:   null,
  secondary: null,
  accent:    null,
  danger:    null,
  warning:   null,
  success:   null,
  neutral:   null,
});

/** Class-only dimension — modifier emitted, no cssVar written. */
export const COLOR_DIM = dimension("color", COLOR_ROLE, { modifier: true });

export type ColorRole = keyof typeof COLOR_ROLE;

/* ─── COLOR STEPS LOOKUP ─────────────────────────────────── */

export type ColorSteps = {
  subtle: string;
  muted:  string;
  base:   string;
  vivid:  string;
  deep:   string;
  border: string;
  text:   string;
};

/**
 * Maps each color role to its 7 semantic step values.
 * This is the single source of truth for which palette steps
 * each role uses. Extend here to add a new role.
 */
export const COLOR_STEPS = {
  primary: {
    subtle: "var(--primary--subtle)",
    muted:  "var(--primary--muted)",
    base:   "var(--primary--base)",
    vivid:  "var(--primary--vivid)",
    deep:   "var(--primary--deep)",
    border: "var(--primary--border)",
    text:   "var(--primary--text)",
  },
  secondary: {
    subtle: "var(--secondary--subtle)",
    muted:  "var(--secondary--muted)",
    base:   "var(--secondary--base)",
    vivid:  "var(--secondary--vivid)",
    deep:   "var(--secondary--deep)",
    border: "var(--secondary--border)",
    text:   "var(--secondary--text)",
  },
  accent: {
    subtle: "var(--accent--subtle)",
    muted:  "var(--accent--muted)",
    base:   "var(--accent--base)",
    vivid:  "var(--accent--vivid)",
    deep:   "var(--accent--deep)",
    border: "var(--accent--border)",
    text:   "var(--accent--text)",
  },
  danger: {
    subtle: "var(--danger--subtle)",
    muted:  "var(--danger--muted)",
    base:   "var(--danger--base)",
    vivid:  "var(--danger--base)",
    deep:   "var(--danger--text)",
    border: "var(--danger--border)",
    text:   "var(--danger--text)",
  },
  warning: {
    subtle: "var(--warning--subtle)",
    muted:  "var(--warning--muted)",
    base:   "var(--warning--base)",
    vivid:  "var(--warning--base)",
    deep:   "var(--warning--text)",
    border: "var(--warning--border)",
    text:   "var(--warning--text)",
  },
  success: {
    subtle: "var(--success--subtle)",
    muted:  "var(--success--muted)",
    base:   "var(--success--base)",
    vivid:  "var(--success--base)",
    deep:   "var(--success--text)",
    border: "var(--success--border)",
    text:   "var(--success--text)",
  },
  neutral: {
    subtle: "var(--bg--3)",
    muted:  "var(--bg--4)",
    base:   "var(--border--strong)",
    vivid:  "var(--border--strong)",
    deep:   "var(--text--secondary)",
    border: "var(--border--default)",
    text:   "var(--text--secondary)",
  },
} as const satisfies Record<ColorRole, ColorSteps>;

/* ─── HELPER ─────────────────────────────────────────────── */

/**
 * resolveColorChannels
 *
 * Turns a color role into 7 inline style declarations.
 * Called in any hook that exposes a `color` prop, alongside resolveTokens.
 *
 * @param role   - The selected color role
 * @param prefix - The category CSS prefix ("control", "feedback", etc.)
 *
 * @example
 *   resolveColorChannels("primary", "control")
 *   // → [
 *   //   "--control--color-subtle: var(--primary--subtle)",
 *   //   "--control--color-muted:  var(--primary--muted)",
 *   //   "--control--color-base:   var(--primary--base)",
 *   //   "--control--color-vivid:  var(--primary--vivid)",
 *   //   "--control--color-deep:   var(--primary--deep)",
 *   //   "--control--color-border: var(--primary--border)",
 *   //   "--control--color-text:   var(--primary--text)",
 *   // ]
 */
export function resolveColorChannels(
  role: ColorRole,
  prefix: string,
): string[] {
  const steps = COLOR_STEPS[role];
  return (Object.entries(steps) as [keyof ColorSteps, string][])
    .map(([step, value]) => `--${prefix}--color-${step}: ${value}`);
}
```

---

## Hook wiring

Color lives outside `resolveTokens` for the CSS var — but still inside
it for the class modifier. Pass `color` to `resolveTokens` as normal;
the null values in `COLOR_ROLE` mean no CSS var is emitted. Then call
`resolveColorChannels` separately and spread into the style array.

```ts
// control/control.hook.ts
import {
  resolveColorChannels,
  type ColorRole,
} from "@/design/shared/primitives.tokens";

export function useControl(props: ControlProps) {
  const {
    size    = "md",
    radius  = "md",
    variant = "solid",
    color   = "primary",          // ← ColorRole
    disabled = false,
    loading  = false,
    class: className, v: _v, testId: _testId, bg, animation,
    ...rest
  } = props;

  // resolveTokens: handles size, radius, variant
  // color is included → emits "control--primary" class
  // color's null values → no CSS var written from this call
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    CONTROL_TOKENS,
    { size, radius, variant, color },
    "control",
  );

  // resolveColorChannels: writes the 7 step channels
  const colorStyle = resolveColorChannels(color, "control");

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: [
        "control",
        ...tokenClasses,        // "control--solid", "control--primary"
        disabled && "control--disabled",
        loading  && "control--loading",
        animation && `animate-${animation}`,
        className,
      ],
      style: [
        ...tokenStyle,          // --control--size, --control--radius
        ...colorStyle,          // --control--color-base, --control--color-subtle, …
        bg && `--local--bg: ${bg}`,
      ],
    },
    props,
  );

  return {
    controlClass: cls,
    controlStyle: style,
    controlAttrs: attrs,
    disabled,
    loading,
    rest,
  };
}
```

---

## Category tokens — color in the spec

`COLOR_DIM` goes into the category spec as normal. Because its values
are null, `resolveTokens` emits only the class modifier. The spec still
enforces the type and still drives the modifier — the channel writing
just happens via the separate helper.

```ts
// control/control.tokens.ts
import { COLOR_DIM } from "@/design/shared/primitives.tokens";

export const CONTROL_TOKENS = defineTokens({
  size:    dimension("size", SPACE),
  radius:  RADIUS_DIM,
  variant: dimension("variant", { solid: null, outlined: null, … }, { modifier: true }),
  color:   COLOR_DIM,    // modifier only — resolveColorChannels writes the vars
});

export type ControlColor = keyof typeof CONTROL_TOKENS.color.values;
// → "primary" | "secondary" | "accent" | "danger" | "warning" | "success" | "neutral"
```

---

## Narrowing color roles on a component

A component can restrict which color roles it accepts using `pickValues`,
exactly like narrowing weight for Heading. A destructive button that only
accepts danger:

```ts
// components that only make sense in danger/warning
export const ALERT_TOKENS = composeTokens(CONTROL_TOKENS, {
  color: pickValues(COLOR_DIM, ["danger", "warning", "success"] as const),
});
export type AlertColor = keyof typeof ALERT_TOKENS.color.values;
// → "danger" | "warning" | "success"
```

TypeScript rejects `color="primary"` on that component at authoring time.
`resolveColorChannels` still works — it just receives a narrowed type.