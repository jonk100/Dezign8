// design/typography/heading/heading.tokens.ts

/**
 * Heading token spec.
 *
 * Extends the typography spec with one narrowed dimension:
 *
 * weight → narrowed to ["semibold", "bold", "black"]
 * Headings should always read as headings.
 * weight="normal" or weight="medium" are intentional
 * TypeScript errors at authoring time.
 *
 * All other dimensions are inherited from TYPOGRAPHY_TOKENS unchanged.
 * size, leading, and tracking have no defaults here — CSS fallbacks
 * per heading level (.h--1 through .h--6) handle appropriate defaults.
 *
 * Not exposed on HeadingProps (dropped intentionally):
 * clamp, truncate, fontStyle
 */
import { composeTokens, pickValues } from "~/shared/tokens";
import { TYPOGRAPHY_TOKENS } from "../typography.tokens";
import { WEIGHT_DIM } from "~/shared/primitives.tokens";

export const HEADING_TOKENS = composeTokens(TYPOGRAPHY_TOKENS, {
  weight: pickValues(WEIGHT_DIM, ["semibold", "bold", "black"] as const),
});

export type HeadingWeight = keyof typeof HEADING_TOKENS.weight.values;

export const HEADING_DEFAULTS = {
  level: 2,
} as const;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingTag   = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";