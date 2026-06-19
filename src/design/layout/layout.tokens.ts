// design/layout/layout.tokens.ts

/**
 * Layout token spec.
 *
 * prop     channel              CSS property
 * ──────────────────────────────────────────────────────────
 * gap    → --layout--gap      gap (flex/grid)
 * align  → --layout--align    align-items
 * justify→ --layout--justify  justify-content
 *
 * Spacing (p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml)
 * is handled separately via resolveSpacingStyles — not through
 * resolveTokens — because the values are strings that may contain
 * multiple space-separated tokens rather than a single scale key.
 * The CSS channels (--layout--p, --layout--px, etc.) are read by
 * layout.css via the cascade of var() fallbacks.
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { GAP, ALIGN_DIM, JUSTIFY_DIM } from "~/shared/primitives.tokens";

/**
 * Core token configuration for the layout module.
 * Maps standard layout properties to their respective primitive scales/dimensions.
 */
export const LAYOUT_TOKENS = defineTokens({
  gap:     GAP,
  align:   ALIGN_DIM,
  justify: JUSTIFY_DIM,
});

/** Valid values for layout gap spacing. */
export type LayoutGap     = keyof typeof LAYOUT_TOKENS.gap.values;

/** Valid values for cross-axis alignment (`align-items`). */
export type LayoutAlign   = keyof typeof LAYOUT_TOKENS.align.values;

/** Valid values for main-axis alignment (`justify-content`). */
export type LayoutJustify = keyof typeof LAYOUT_TOKENS.justify.values;