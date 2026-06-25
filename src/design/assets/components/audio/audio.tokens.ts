// design/assets/audio/audio.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM, SPACE, COLOR_DIM } from "~/shared/primitives.tokens";

const AUDIO_SIZE = scale({
  sm: null,
  md: null,
  lg: null,
});

// Visual chrome treatment — mirrors trigger/feedback variant vocabulary.
// solid    → filled bg at color-base, on-color text
// soft     → subtle tinted bg, color-border border (default)
// outlined → transparent bg, visible border
// ghost    → no border, no bg — bare controls only
const AUDIO_VARIANT = scale({
  solid:    null,
  soft:     null,
  outlined: null,
  ghost:    null,
});

// Layout mode — controls arrangement, not color.
// default → stacked rows (controls / seek / secondary)
// minimal → hide volume + rate row
// compact → single-row layout
const AUDIO_LAYOUT = scale({
  default: null,
  minimal: null,
  compact: null,
});

export const AUDIO_TOKENS = defineTokens({
  radius:  RADIUS_DIM,
  padding: dimension("padding", SPACE),
  size:    dimension("size",    AUDIO_SIZE,    { modifier: true }),
  variant: dimension("variant", AUDIO_VARIANT, { modifier: true }),
  layout:  dimension("layout",  AUDIO_LAYOUT,  { modifier: true }),
  color:   COLOR_DIM,
});

export type AudioSize    = keyof typeof AUDIO_TOKENS.size.values;
export type AudioVariant = keyof typeof AUDIO_TOKENS.variant.values;
export type AudioLayout  = keyof typeof AUDIO_TOKENS.layout.values;
export type AudioColor   = keyof typeof AUDIO_TOKENS.color.values;
export type AudioRadius  = keyof typeof AUDIO_TOKENS.radius.values;

export const AUDIO_DEFAULTS = {
  size:    "md"      as AudioSize,
  variant: "soft"    as AudioVariant,
  layout:  "default" as AudioLayout,
  color:   "primary" as AudioColor,
  preload: "metadata" as const,
} as const;
