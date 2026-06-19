// design/layout/box/box.tokens.ts

/**
 * Box Token Spec
 *
 * Box re-exports the full layout spec.
 * Box adds radius — a dimension the layout category doesn't have —
 * since Box is specifically a visual container, not just a flow primitive.
 */

import { composeTokens } from "~sh/tokens";
import { LAYOUT_TOKENS } from "~l/layout.tokens";
import { RADIUS_DIM } from "~sh/primitives.tokens";

/**
 * Merges general Layout tokens (gap, align, justify) with Box-specific
 * visual dimensions like border radius.
 */
export const BOX_TOKENS = composeTokens(LAYOUT_TOKENS, {
  radius: RADIUS_DIM,
});

export type { LayoutGap as BoxGap, LayoutAlign as BoxAlign, LayoutJustify as BoxJustify }
  from "~l/layout.tokens";

/** Valid values for border radius. */
export type BoxRadius = keyof typeof BOX_TOKENS.radius.values;

/** Supported HTML tags for the Box component polymorphism. */
export type BoxTag =
  | "div" | "section" | "article" | "aside"
  | "main" | "nav" | "header" | "footer"
  | "ul" | "ol" | "figure" | "form" | "span";

export const BOX_DEFAULTS = {
  as: "div" as BoxTag,
} as const;