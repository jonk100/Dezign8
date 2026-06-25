import { defineTokens, scale, dimension } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

const TOOLTIP_PLACEMENT = scale({
  top:    null,
  bottom: null,
  left:   null,
  right:  null,
});

export const TOOLTIP_TOKENS = defineTokens({
  placement: dimension("placement", TOOLTIP_PLACEMENT, { modifier: true }),
  radius:    RADIUS_DIM,
});

export const TOOLTIP_DEFAULTS = {
  placement: "top" as const,
} as const;

export type TooltipPlacement = keyof typeof TOOLTIP_TOKENS.placement.values;
export type TooltipRadius    = keyof typeof TOOLTIP_TOKENS.radius.values;
