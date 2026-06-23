// design/surfaces/components/paper/paper.tokens.ts

import { composeTokens, dimension }  from "~/shared/tokens";
import { SURFACE_TOKENS }            from "../../surface.tokens";
import { SPACE }                     from "~/shared/primitives.tokens";
import type { PaperTag }             from "./paper.props";
import type { SurfaceLayer }         from "../../surface.tokens";

/**
 * Paper adds one dimension on top of SURFACE_TOKENS:
 *
 *   gap → --paper--gap   Controls flex gap when stack=true.
 *
 * scope: "paper" pins the channel to --paper--gap so it never
 * collides with --surface--gap if another surface adds one later.
 */
export const PAPER_TOKENS = composeTokens(SURFACE_TOKENS, {
  gap: dimension("gap", SPACE, { scope: "paper" }),
});

export type PaperGap = keyof typeof PAPER_TOKENS.gap.values;

export const PAPER_DEFAULTS = {
  as:        "div"   as PaperTag,
  layer:     "1"     as SurfaceLayer,   // frame/paper tier
  padding:   "md"    as const,
  radius:    "md"    as const,
  stack:     false,
  gap:       "md"    as PaperGap,
  fullWidth: false,
} as const;
