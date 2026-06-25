import { defineTokens, scale, dimension } from "~/shared/tokens";

const DRAWER_PLACEMENT = scale({
  start:  null,
  end:    null,
  top:    null,
  bottom: null,
});

const DRAWER_SIZE = scale({
  sm:   null,
  md:   null,
  lg:   null,
  full: null,
});

export const DRAWER_TOKENS = defineTokens({
  placement: dimension("placement", DRAWER_PLACEMENT, { modifier: "placement" }),
  size:      dimension("size",      DRAWER_SIZE,      { modifier: "size" }),
});

export const DRAWER_DEFAULTS = {
  placement:       "end",
  size:            "md",
  closeOnBackdrop: true,
  closeOnEsc:      true,
} as const;

export type DrawerPlacement = keyof typeof DRAWER_TOKENS.placement.values;
export type DrawerSize      = keyof typeof DRAWER_TOKENS.size.values;
