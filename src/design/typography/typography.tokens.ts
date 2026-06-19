// design/typography/typography.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import {
  TEXT_SIZE,
  WEIGHT_DIM,
  LEADING_DIM,
  TRACKING_DIM,
  TEXT_COLOR_DIM,
  FAMILY,
} from "~/shared/primitives.tokens";

/**
 * Typography token spec.
 *
 * Each prop maps to a CSS custom property written inline by useTypography
 * and read by typography.css. All props are opt-in — unset props are skipped
 * and CSS fallbacks handle the neutral default per component.
 *
 * prop         channel                     CSS property
 * ──────────────────────────────────────────────────────
 * size       → --typography--size        font-size
 * weight     → --typography--weight      font-weight
 * color      → --typography--color       color (semantic text role)
 * align      → --typography--align       text-align
 * leading    → --typography--leading     line-height
 * tracking   → --typography--tracking    letter-spacing
 * fam        → --typography--fam         font-family
 * transform  → --typography--transform   text-transform
 * wrap       → --typography--wrap        text-wrap
 * decoration → --typography--decoration  text-decoration
 * fontStyle  → --typography--style       font-style
 *
 * Handled manually in the hook (not through resolveTokens):
 * clamp      → --typography--clamp + .typography--clamped class
 *              activates -webkit-line-clamp with the given number of lines
 * truncate   → .typography--truncate class
 *              activates single-line overflow ellipsis
 */

// ─── TYPOGRAPHY-SPECIFIC SCALES ───────────────────────────
// These live here rather than primitives because no other
// category needs them yet. Promote to primitives if that changes.

const TEXT_ALIGN = scale({
  start:   "start",
  center:  "center",
  end:     "end",
  justify: "justify",
});

const TRANSFORM = scale({
  upper:      "uppercase",
  lower:      "lowercase",
  capitalize: "capitalize",
  none:       "none",
});

const WRAP = scale({
  balance: "balance",
  pretty:  "pretty",
  nowrap:  "nowrap",
  normal:  "normal",
});

const DECORATION = scale({
  underline:       "underline",
  "line-through":  "line-through",
  overline:        "overline",
  none:            "none",
});

const STYLE = scale({
  normal:  "normal",
  italic:  "italic",
  oblique: "oblique",
});

// ─── SPEC ─────────────────────────────────────────────────

export const TYPOGRAPHY_TOKENS = defineTokens({
  size:       dimension("size",       TEXT_SIZE),
  weight:     WEIGHT_DIM,
  color:      TEXT_COLOR_DIM,
  align:      dimension("align",      TEXT_ALIGN),
  leading:    LEADING_DIM,
  tracking:   TRACKING_DIM,
  fam:        dimension("fam",        FAMILY),
  transform:  dimension("transform",  TRANSFORM),
  wrap:       dimension("wrap",       WRAP),
  decoration: dimension("decoration", DECORATION),
  style:      dimension("style",      STYLE),
});

// ─── DERIVED TYPES ────────────────────────────────────────

export type TypeSize       = keyof typeof TYPOGRAPHY_TOKENS.size.values;
export type TypeWeight     = keyof typeof TYPOGRAPHY_TOKENS.weight.values;
export type TypeColor      = keyof typeof TYPOGRAPHY_TOKENS.color.values;
export type TypeAlign      = keyof typeof TYPOGRAPHY_TOKENS.align.values;
export type TypeLeading    = keyof typeof TYPOGRAPHY_TOKENS.leading.values;
export type TypeTracking   = keyof typeof TYPOGRAPHY_TOKENS.tracking.values;
export type TypeFamily     = keyof typeof TYPOGRAPHY_TOKENS.fam.values;
export type TypeTransform  = keyof typeof TYPOGRAPHY_TOKENS.transform.values;
export type TypeWrap       = keyof typeof TYPOGRAPHY_TOKENS.wrap.values;
export type TypeDecoration = keyof typeof TYPOGRAPHY_TOKENS.decoration.values;
export type TypeStyle      = keyof typeof TYPOGRAPHY_TOKENS.style.values;