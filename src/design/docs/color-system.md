# Color System

How color moves from raw palette through semantic tokens into
component CSS — and how the hook wires them together.

---

## The three layers

```
color-vars.css        --cyan-15             raw oklch step
                           │
tokens-color.css      --primary--base       semantic role + step name
                           │
hook writes           --control--color-base  component channel
                           │
component CSS         var(--control--color-base)   ← only this
```

Component CSS never references `--primary--base` directly.
The hook translates role → channels so the CSS stays decoupled
from which role is active. Swap `color="primary"` to
`color="secondary"` and the channels update — the CSS doesn't change.

---

## The 7 steps per role

Every color role (`primary`, `secondary`, `accent`, `danger`,
`warning`, `success`) exposes the same 7 named steps in
`tokens-color.css`. Components read whichever steps they need
for their variant rules.

| Step | Typical use |
|---|---|
| `subtle` | Background for soft/tinted variants (badge bg, chip bg, tag fill) |
| `muted` | Hover background on soft variants |
| `base` | The color — solid button bg, filled active border |
| `vivid` | Hover on solid elements (slightly brighter/deeper than base) |
| `deep` | Pressed state, heavy emphasis, text on light backgrounds |
| `border` | Border color for outlined and dashed variants |
| `text` | Foreground text on a neutral background in this role's hue |

The same 7 steps flip appropriately in dark mode — `subtle` becomes
a dark tinted surface, `base` becomes a vivid-but-not-blinding
mid-range, `text` stays readable against dark backgrounds.
All handled in `tokens-color.css`; nothing in components changes.

---

## Neutral is different

`neutral` doesn't have a `--neutral--*` series in `tokens-color.css`.
It maps to slate-based values instead:

```ts
neutral: {
  base:   "var(--border--strong)",
  subtle: "var(--bg--3)",
  muted:  "var(--bg--4)",
  vivid:  "var(--border--strong)",
  deep:   "var(--text--secondary)",
  border: "var(--border--default)",
  text:   "var(--text--secondary)",
}
```

This means a `color="neutral"` button uses the surface/border
system rather than an accent hue — it reads as a grey/muted
control that stays on-theme in both light and dark automatically.

---

## TypeScript implementation

### `shared/primitives.tokens.ts` — additions

```ts
/* ─── COLOR ROLE ─────────────────────────────────────────── */

/**
 * Color role scale.
 * All values are null — this dimension emits a class modifier only
 * (control--primary, control--danger, etc.) and writes no CSS var.
 * The actual channel values are written separately by resolveColorChannels.
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

/** Modifier-only: emits .{prefix}--{role}, no CSS var. */
export const COLOR_DIM = dimension("color", COLOR_ROLE, { modifier: true });

export type ColorRole = keyof typeof COLOR_ROLE;

/* ─── COLOR STEPS ────────────────────────────────────────── */

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
 * These are the actual values the hook writes into component channels.
 * Add a new role here and it becomes available to all components.
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
    vivid:  "var(--danger--base)",     /* no vivid step — use base */
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
 * Turns a color role into an array of inline style declarations.
 * Called by any hook that has a `color` prop.
 *
 * @param role   - The selected color role ("primary", "danger", etc.)
 * @param prefix - The category prefix ("control", "feedback", etc.)
 * @returns      - Style strings to spread into useBaseCompose
 *
 * @example
 *   resolveColorChannels("primary", "control")
 *   // → [
 *   //     "--control--color-subtle: var(--primary--subtle)",
 *   //     "--control--color-muted:  var(--primary--muted)",
 *   //     "--control--color-base:   var(--primary--base)",
 *   //     …
 *   //   ]
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

## Hook implementation

Color is **excluded from `resolveTokens`** (its scale values are all
`null` so no CSS var would be written anyway) but **included in the
selected props** so the modifier class still gets emitted.
`resolveColorChannels` runs separately and writes the 7 step channels.

```ts
// control/control.hook.ts
import { resolveColorChannels } from "@/design/shared/primitives.tokens";

export function useControl(props: ControlProps) {
  const {
    size    = "md",
    radius  = "md",
    variant = "solid",
    color   = "primary",
    disabled = false,
    loading  = false,
    class: className, v: _v, testId: _testId, bg, animation,
    ...rest
  } = props;

  // resolveTokens handles size, radius, variant
  // color is passed so the modifier class (control--primary) is emitted,
  // but its null values mean no CSS var is written from this call
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    CONTROL_TOKENS,
    { size, radius, variant, color },
    "control",
  );

  // color channels written separately — 7 vars, exact palette steps
  const colorStyle = resolveColorChannels(color, "control");

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: [
        "control",
        ...tokenClasses,            // includes "control--primary", "control--solid"
        disabled && "control--disabled",
        loading  && "control--loading",
        animation && `animate-${animation}`,
        className,
      ],
      style: [
        ...tokenStyle,              // --control--size, --control--radius
        ...colorStyle,              // --control--color-base, --control--color-subtle, …
        bg && `--local--bg: ${bg}`,
      ],
    },
    props,
  );

  return { controlClass: cls, controlStyle: style, controlAttrs: attrs,
           disabled, loading, rest };
}
```

---

## CSS implementation

Variant rules reference channels directly. No color-mix math,
no color logic in CSS — the hook already resolved which role
and which palette steps to use.

```css
/* control.css */

/* ─── SOLID ───────────────────────────────────────────────── */
/* Filled background. Text must be legible on colored surface. */

.control--solid {
  background-color: var(--control--color-base);
  border: none;
  color: var(--text--on-color);
}

.control--solid:hover {
  background-color: var(--control--color-vivid);
}

.control--solid:active {
  background-color: var(--control--color-deep);
}

/* ─── SOFT ────────────────────────────────────────────────── */
/* Tinted background. Stays within the color family but subtle. */

.control--soft {
  background-color: var(--control--color-subtle);
  border: none;
  color: var(--control--color-text);
}

.control--soft:hover {
  background-color: var(--control--color-muted);
}

.control--soft:active {
  background-color: var(--control--color-subtle);
  color: var(--control--color-deep);
}

/* ─── OUTLINED ────────────────────────────────────────────── */
/* Transparent fill, colored border. */

.control--outlined {
  background-color: transparent;
  border: var(--border--thin) solid var(--control--color-border);
  color: var(--control--color-text);
}

.control--outlined:hover {
  background-color: var(--control--color-subtle);
}

.control--outlined:active {
  border-color: var(--control--color-base);
}

/* ─── GHOST ───────────────────────────────────────────────── */
/* No background, no border. Text color only. */

.control--ghost {
  background-color: transparent;
  border: none;
  color: var(--control--color-text);
}

.control--ghost:hover {
  background-color: var(--control--color-subtle);
}

.control--ghost:active {
  background-color: var(--control--color-muted);
}

/* ─── DASHED ──────────────────────────────────────────────── */
/* Same as outlined but with dashed border. */

.control--dashed {
  background-color: transparent;
  border: var(--border--thin) dashed var(--control--color-border);
  color: var(--control--color-text);
}

.control--dashed:hover {
  background-color: var(--control--color-subtle);
}
```

---

## Variant × step reference

Which step each variant reads at which interaction state.

```
               subtle   muted   base    vivid   deep    border  text
               ──────   ─────   ────    ─────   ────    ──────  ────
solid  base     ·        ·       bg      ·       ·       ·       *
solid  hover    ·        ·       ·       bg      ·       ·       *
solid  active   ·        ·       ·       ·       bg      ·       *

soft   base     bg       ·       ·       ·       ·       ·       fg
soft   hover    ·        bg      ·       ·       ·       ·       fg
soft   active   bg       ·       ·       ·       fg      ·       ·

outl.  base     ·        ·       ·       ·       ·       border  fg
outl.  hover    bg       ·       ·       ·       ·       border  fg
outl.  active   ·        ·       border  ·       ·       ·       fg

ghost  base     ·        ·       ·       ·       ·       ·       fg
ghost  hover    bg       ·       ·       ·       ·       ·       fg
ghost  active   ·        bg      ·       ·       ·       ·       fg

* solid text always uses --text--on-color (not a color-role step)
```

---

## Adding a new color role

1. Add the role to `COLOR_ROLE` scale in `primitives.tokens.ts`:
   ```ts
   info: null,
   ```
2. Add its 7 steps to `COLOR_STEPS`:
   ```ts
   info: {
     subtle: "var(--info--subtle)",
     muted:  "var(--info--muted)",
     base:   "var(--info--base)",
     vivid:  "var(--info--base)",
     deep:   "var(--info--text)",
     border: "var(--info--border)",
     text:   "var(--info--text)",
   },
   ```
3. Confirm `--info--*` steps exist in `tokens-color.css` for both themes.
4. Done — every component that uses `COLOR_DIM` and `resolveColorChannels`
   now accepts `color="info"` with no other changes.

---

## Semantic states vs accent roles

`danger`, `warning`, `success` are in the color role system so components
can use them as a `color` prop value. They're also available as standalone
semantic tokens (`--danger--base`, `--danger--subtle` etc.) for components
that don't have a color prop but need to express state — a form validation
error message, a progress bar at 100%, a toast.

The same 7-step structure applies in both contexts. The difference is
just whether you reach them via the hook's `resolveColorChannels` (prop-
driven) or directly by name in CSS (state-driven with no prop).

```css
/* State-driven — no color prop, direct token reference */
.input--error {
  border-color: var(--danger--border);
  color: var(--danger--text);
}

.input--error:focus-visible {
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--danger--base) 30%, transparent);
}
```