// design/shared/definitions/scales.ts
//
// Scale definitions — single source of truth for TS token API keys.
// The Vite plugin (plugins/tokens.ts) reads SCALE_DEFS from this file
// and generates primitives.tokens.generated.ts alongside tokens.generated.css.
//
// TO ADD A VALUE: add a key → CSS var entry to the relevant scale.
// The generated file updates automatically on save.
//
// TO ADD A SCALE: add an entry here, then add the corresponding dimension
// to primitives.tokens.ts (dimensions can't be generated — they carry
// semantic metadata like modifier/scope that requires a human decision).
//
// null values = class-only; resolveTokens emits no CSS var, only a modifier class.

export type ScaleDef  = Record<string, string | null>;
export type ScaleDefs = Record<string, ScaleDef>;

export const SCALE_DEFS = {
  SPACE: {
    none:  "0",
    "2xs": "var(--space-in--2xs)",
    xs:    "var(--space-in--xs)",
    sm:    "var(--space-in--sm)",
    md:    "var(--space-in--md)",
    lg:    "var(--space-in--lg)",
    xl:    "var(--space-in--xl)",
    "2xl": "var(--space-in--2xl)",
    "3xl": "var(--space-in--3xl)",
  },
  RADIUS: {
    none:  "var(--radius--none)",
    "2xs": "var(--radius--2xs)",
    xs:    "var(--radius--xs)",
    sm:    "var(--radius--sm)",
    md:    "var(--radius--md)",
    lg:    "var(--radius--lg)",
    xl:    "var(--radius--xl)",
    "2xl": "var(--radius--2xl)",
    full:  "var(--radius--full)",
  },
  TEXT_SIZE: {
    "2xs": "var(--fs--2xs)",
    xs:    "var(--fs--xs)",
    sm:    "var(--fs--sm)",
    md:    "var(--fs--md)",
    lg:    "var(--fs--lg)",
    xl:    "var(--fs--xl)",
    "2xl": "var(--fs--2xl)",
    "3xl": "var(--fs--3xl)",
    "4xl": "var(--fs--4xl)",
  },
  LABEL_SIZE: {
    "2xs": "var(--label--2xs)",
    xs:    "var(--label--xs)",
    sm:    "var(--label--sm)",
    md:    "var(--label--md)",
    lg:    "var(--label--lg)",
    xl:    "var(--label--xl)",
  },
  WEIGHT: {
    thin:     "var(--weight--thin)",
    light:    "var(--weight--light)",
    normal:   "var(--weight--normal)",
    medium:   "var(--weight--medium)",
    semibold: "var(--weight--semibold)",
    bold:     "var(--weight--bold)",
    black:    "var(--weight--black)",
  },
  FAMILY: {
    sans:  "var(--family--sans)",
    serif: "var(--family--serif)",
    mono:  "var(--family--mono)",
  },
  LEADING: {
    none:    "var(--leading--none)",
    tight:   "var(--leading--tight)",
    snug:    "var(--leading--snug)",
    normal:  "var(--leading--normal)",
    relaxed: "var(--leading--relaxed)",
    loose:   "var(--leading--loose)",
  },
  TRACKING: {
    tight:  "var(--tracking--tight)",
    normal: "var(--tracking--normal)",
    wide:   "var(--tracking--wide)",
    wider:  "var(--tracking--wider)",
    caps:   "var(--tracking--caps)",
  },
  COLOR_ROLE: {
    primary:   null,
    secondary: null,
    tertiary:  null,
    accent:    null,
    danger:    null,
    warning:   null,
    success:   null,
    info:      null,
    neutral:   null,
  },
  TEXT_COLOR: {
    primary:    "var(--text--primary)",
    secondary:  "var(--text--secondary)",
    muted:      "var(--text--muted)",
    tertiary:   "var(--text--tertiary)",
    disabled:   "var(--text--disabled)",
    inverse:    "var(--text--inverse)",
    "on-color": "var(--text--on-color)",
    inherit:    "inherit",
  },
  ALIGN: {
    start:    "flex-start",
    center:   "center",
    end:      "flex-end",
    stretch:  "stretch",
    baseline: "baseline",
  },
  JUSTIFY: {
    start:   "flex-start",
    center:  "center",
    end:     "flex-end",
    between: "space-between",
    around:  "space-around",
    evenly:  "space-evenly",
  },
} as const satisfies ScaleDefs;