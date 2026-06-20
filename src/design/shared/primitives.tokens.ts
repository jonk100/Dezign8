// design/shared/primitives.tokens.ts
/**
 * Cross-cutting value scales and the dimensions built from them.
 * A scale is authored exactly once here. Categories assemble specs from
 * these (and may pickValues() to narrow a slice).
 *
 * Dimensions carry the channel `key`; the channel PREFIX comes from whoever
 * resolves the spec, so `GAP` emits `--layout-gap` under layout and
 * `--surface-gap` under a surface — same dimension, no re-authoring.
 *
 */

// design/shared/primitives.tokens.ts

import { scale, dimension } from "./tokens";

/* ─── SCALES ─────────────────────────────────────────────── */

export const SPACE = scale({
  none:  "0",
  "2xs": "var(--space-in--2xs)",
  xs:    "var(--space-in--xs)",
  sm:    "var(--space-in--sm)",
  md:    "var(--space-in--md)",
  lg:    "var(--space-in--lg)",
  xl:    "var(--space-in--xl)",
  "2xl": "var(--space-in--2xl)",
});

export const RADIUS = scale({
  none:  "var(--radius--none)",
  "2xs": "var(--radius--2xs)",
  xs:    "var(--radius--xs)",
  sm:    "var(--radius--sm)",
  md:    "var(--radius--md)",
  lg:    "var(--radius--lg)",
  xl:    "var(--radius--xl)",
  "2xl": "var(--radius--2xl)",
  full:  "var(--radius--full)",
});

export const TEXT_SIZE = scale({
  "2xs": "var(--fs--2xs)",
  xs:    "var(--fs--xs)",
  sm:    "var(--fs--sm)",
  md:    "var(--fs--md)",
  lg:    "var(--fs--lg)",
  xl:    "var(--fs--xl)",
  "2xl": "var(--fs--2xl)",
  "3xl": "var(--fs--3xl)",
  "4xl": "var(--fs--4xl)",
});

/**
 * Fixed (non-responsive) font-size scale for UI elements that live
 * _inside_ components and must not reflow with viewport changes.
 *
 * **When to use `TEXT_SIZE_FIXED` vs {@link TEXT_SIZE}:**
 *
 * | Scale             | Token prefix | Intended for                                      |
 * |-------------------|--------------|---------------------------------------------------|
 * | `TEXT_SIZE`       | `--fs--*`    | Body text, headings — may use `clamp()` for fluid |
 * | `TEXT_SIZE_FIXED` | `--fsf--*`   | Labels, captions, badges, form helper text        |
 *
 * Use `TEXT_SIZE_FIXED` any time the element:
 * - Sits inside a component with constrained space (form field, badge, chip)
 * - Must stay at a predictable fixed size regardless of viewport
 * - Would break layout if it grew with the page's fluid type scale
 *
 * @remarks
 * The `f` suffix in `--fsf--*` stands for "fixed" and distinguishes these
 * vars from the responsive `--fs--*` vars in `vars.css` / `tokens.css`.
 * Define both families in your global token file.
 *
 * Approximate pixel values (example — set your own in `vars.css`):
 * ```
 * 2xs → 10px   xs → 11px   sm → 12px   md → 14px   lg → 16px
 * xl  → 18px   2xl → 20px  3xl → 24px  4xl → 28px
 * ```
 *
 * @example
 * ```ts
 * // In typography/label/label.tokens.ts
 * import { TEXT_SIZE_FIXED } from "~/shared/primitives.tokens";
 *
 * export const LABEL_TOKENS = composeTokens(TYPOGRAPHY_TOKENS, {
 *   size: pickValues(
 *     dimension("size", TEXT_SIZE_FIXED),
 *     ["xs", "sm", "md", "lg", "xl"] as const,
 *   ),
 * });
 * ```
 *
 * @see {@link TEXT_SIZE}  — responsive counterpart
 * @see {@link TextSizeFixed} — the derived union type
 */
export const TEXT_SIZE_FIXED = scale({
  "2xs": "var(--fsf--2xs)",
  xs:    "var(--fsf--xs)",
  sm:    "var(--fsf--sm)",
  md:    "var(--fsf--md)",
  lg:    "var(--fsf--lg)",
  xl:    "var(--fsf--xl)",
  "2xl": "var(--fsf--2xl)",
  "3xl": "var(--fsf--3xl)",
  "4xl": "var(--fsf--4xl)",
});

// ─────────────────────────────────────────────────────────────────
// INSERT IN: DERIVED TYPES section (after existing type exports)
// ─────────────────────────────────────────────────────────────────




// ─────────────────────────────────────────────────────────────────
// AMEND: COLOR_ROLE scale
//
// Per `color-typescript.md`, COLOR_ROLE values must be `null` so that
// resolveTokens emits a class modifier ONLY (e.g. `.form--primary`) and
// does NOT write a CSS custom property. The actual color-step channel
// values (--form--color-base etc.) are written separately by
// resolveColorChannels(role, prefix).
//
// Current file has:
//   primary: "var(--token-color-primary)",  ← should be null
//
// Corrected version:
// ─────────────────────────────────────────────────────────────────

/**
 * Color role scale. All values are intentionally `null`.
 *
 * This dimension emits a **class modifier only** (e.g. `.control--primary`,
 * `.form--danger`). No CSS custom property is written for the role itself.
 *
 * The seven color-step channels per role (`--{prefix}--color-base`,
 * `--{prefix}--color-subtle`, etc.) are written separately by
 * {@link resolveColorChannels}, which is called alongside
 * {@link resolveTokens} in category hooks.
 *
 * Having null values here keeps the two concerns cleanly separated:
 * - `resolveTokens`       → class modifier
 * - `resolveColorChannels` → CSS channel vars
 *
 * @remarks
 * To add a new color role: add `roleName: null` here, add its 7 steps
 * to `COLOR_STEPS`, and ensure `--roleName--{step}` vars exist in
 * `tokens-color.css` for both themes. No component files change.
 *
 * @see `color-typescript.md` — full implementation spec including COLOR_STEPS
 * @see `color-overview.md`   — role descriptions and usage guidance
 * @see {@link resolveColorChannels} — writes the actual channel vars
 *
 * @todo Implement {@link resolveColorChannels} and {@link COLOR_STEPS}
 *   in this file per the spec in `color-typescript.md`.
 */
// export const COLOR_ROLE = scale({
//   primary:   null,
//   secondary: null,
//   success:   null,
//   warning:   null,
//   danger:    null,
//   neutral:   null,
// });

// NOTE: After updating COLOR_ROLE, COLOR_DIM needs no change —
// it is already defined as:
//   export const COLOR_DIM = dimension("color", COLOR_ROLE, { modifier: true });
// which is correct.

export const LABEL_SIZE = scale({
  "2xs": "var(--label--2xs)",
  xs:    "var(--label--xs)",
  sm:    "var(--label--sm)",
  md:    "var(--label--md)",
  lg:    "var(--label--lg)",
  xl:    "var(--label--xl)",
});

export const WEIGHT = scale({
  thin:     "var(--weight--thin)",
  light:    "var(--weight--light)",
  normal:   "var(--weight--normal)",
  medium:   "var(--weight--medium)",
  semibold: "var(--weight--semibold)",
  bold:     "var(--weight--bold)",
  black:    "var(--weight--black)",
});

export const FAMILY = scale({
  sans:  "var(--family--sans)",
  serif: "var(--family--serif)",
  mono:  "var(--family--mono)",
});

export const LEADING = scale({
  none:    "var(--leading--none)",
  tight:   "var(--leading--tight)",
  snug:    "var(--leading--snug)",
  normal:  "var(--leading--normal)",
  relaxed: "var(--leading--relaxed)",
  loose:   "var(--leading--loose)",
});

export const TRACKING = scale({
  tight:  "var(--tracking--tight)",
  normal: "var(--tracking--normal)",
  wide:   "var(--tracking--wide)",
  wider:  "var(--tracking--wider)",
  caps:   "var(--tracking--caps)",
});

export const ALIGN = scale({
  start:    "flex-start",
  center:   "center",
  end:      "flex-end",
  stretch:  "stretch",
  baseline: "baseline",
});

export const JUSTIFY = scale({
  start:   "flex-start",
  center:  "center",
  end:     "flex-end",
  between: "space-between",
  around:  "space-around",
  evenly:  "space-evenly",
});

export const COLOR_ROLE = scale({
  primary:   null,
  secondary: null,
  accent:    null,
  danger:    null,
  warning:   null,
  success:   null,
  info:      null,
  neutral:   null,
});

export const TEXT_COLOR = scale({
  primary:   "var(--text--primary)",
  secondary: "var(--text--secondary)",
  muted:      "var(--text--muted)",   
  tertiary:  "var(--text--tertiary)",
  disabled:  "var(--text--disabled)",
  inverse:   "var(--text--inverse)",
  "on-color": "var(--text--on-color)",
  inherit:   "inherit",
});

/* ─── SHARED DIMENSIONS ──────────────────────────────────── */

export const GAP         = dimension("gap",      SPACE);
export const RADIUS_DIM  = dimension("radius",   RADIUS);
export const ALIGN_DIM   = dimension("align",    ALIGN);
export const JUSTIFY_DIM = dimension("justify",  JUSTIFY);
export const WEIGHT_DIM  = dimension("weight",   WEIGHT);
export const FAMILY_DIM  = dimension("family",   FAMILY);
export const LEADING_DIM = dimension("leading",  LEADING);
export const TRACKING_DIM= dimension("tracking", TRACKING);
export const COLOR_DIM   = dimension("color",    COLOR_ROLE, { modifier: true });
export const TEXT_COLOR_DIM = dimension("color", TEXT_COLOR);

/* ─── DERIVED TYPES ──────────────────────────────────────── */

export type Space     = keyof typeof SPACE;
export type Radius    = keyof typeof RADIUS;
export type TextSize  = keyof typeof TEXT_SIZE;
/**
 * Valid values for the fixed font-size scale.
 * Derived from {@link TEXT_SIZE_FIXED} — never hand-written.
 *
 * @see {@link TextSize} — responsive counterpart
 */
export type TextSizeFixed = keyof typeof TEXT_SIZE_FIXED;
export type LabelSize = keyof typeof LABEL_SIZE;
export type Weight    = keyof typeof WEIGHT;
export type Family    = keyof typeof FAMILY;
export type Leading   = keyof typeof LEADING;
export type Tracking  = keyof typeof TRACKING;
export type Align     = keyof typeof ALIGN;
export type Justify   = keyof typeof JUSTIFY;
export type ColorRole = keyof typeof COLOR_ROLE;
export type TextColor = keyof typeof TEXT_COLOR;

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
  info: {
    subtle: "var(--info--subtle)",
    muted:  "var(--info--muted)",
    base:   "var(--info--base)",
    vivid:  "var(--info--base)",
    deep:   "var(--info--text)",
    border: "var(--info--border)",
    text:   "var(--info--text)",
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

export function resolveColorChannels(
  role: ColorRole,
  prefix: string,
): string[] {
  const steps = COLOR_STEPS[role];
  return (Object.entries(steps) as [keyof ColorSteps, string][])
    .map(([step, value]) => `--${prefix}--color-${step}: ${value}`);
}