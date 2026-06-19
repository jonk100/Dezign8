// design/assets/image/image.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

/**
 * Image token spec.
 *
 * prop     channel              CSS property
 * ────────────────────────────────────────────────────────────
 * radius → --image--radius    border-radius
 * ratio  → --image--ratio     aspect-ratio  (via .image--ratio)
 * fit    → --image--fit       object-fit
 *
 * loading is a native HTML attribute — passed through directly,
 * not a token dimension.
 */

const RATIO = scale({
  square:    "1 / 1",
  landscape: "4 / 3",
  video:     "16 / 9",
  portrait:  "3 / 4",
  wide:      "21 / 9",
});

const FIT = scale({
  cover:   "cover",
  contain: "contain",
  fill:    "fill",
  none:    "none",
});

export const IMAGE_TOKENS = defineTokens({
  radius: RADIUS_DIM,
  ratio:  dimension("ratio", RATIO),
  fit:    dimension("fit",   FIT),
});

export type ImageRadius  = keyof typeof IMAGE_TOKENS.radius.values;
export type ImageRatio   = keyof typeof IMAGE_TOKENS.ratio.values;
export type ImageFit     = keyof typeof IMAGE_TOKENS.fit.values;

export const IMAGE_DEFAULTS = {
  fit:     "cover"  as ImageFit,
  loading: "lazy"   as const,
} as const;