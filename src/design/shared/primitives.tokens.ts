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
  neutral:   null,
});

export const TEXT_COLOR = scale({
  primary:   "var(--text--primary)",
  secondary: "var(--text--secondary)",
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