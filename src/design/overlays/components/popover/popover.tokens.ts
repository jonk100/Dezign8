import { defineTokens, scale, dimension } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

const POPOVER_PLACEMENT = scale({
  bottom:       null,
  "bottom-start": null,
  "bottom-end":   null,
  top:          null,
  "top-start":    null,
  "top-end":      null,
});

export const POPOVER_TOKENS = defineTokens({
  placement: dimension("placement", POPOVER_PLACEMENT, { modifier: true }),
  radius:    RADIUS_DIM,
});

export const POPOVER_DEFAULTS = {
  placement: "bottom",
} as const;

export type PopoverPlacement = keyof typeof POPOVER_TOKENS.placement.values;
export type PopoverRadius    = keyof typeof POPOVER_TOKENS.radius.values;
