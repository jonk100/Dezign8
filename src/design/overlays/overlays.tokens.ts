import { defineTokens, scale, dimension } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

const OVERLAY_SIZE = scale({
  xs:   null,
  sm:   null,
  md:   null,
  lg:   null,
  xl:   null,
  full: null,
});

const OVERLAY_VARIANT = scale({
  default:    null,
  centered:   null,
  fullscreen: null,
});

export const OVERLAY_TOKENS = defineTokens({
  size:    dimension("size",    OVERLAY_SIZE,    { modifier: "size" }),
  variant: dimension("variant", OVERLAY_VARIANT, { modifier: "variant" }),
  radius:  RADIUS_DIM,
});

export type OverlaySize    = keyof typeof OVERLAY_TOKENS.size.values;
export type OverlayVariant = keyof typeof OVERLAY_TOKENS.variant.values;
export type OverlayRadius  = keyof typeof OVERLAY_TOKENS.radius.values;
