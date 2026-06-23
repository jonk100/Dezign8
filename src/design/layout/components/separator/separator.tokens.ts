/**
 * @file Token spec, constants, and defaults for the Separator component.
 */

import { dimension, scale } from "~sh/tokens";

// ─── SCALES ───────────────────────────────────────────────────────────────────

export const ORIENTATION = scale({ horizontal: null, vertical: null });
export const VARIANT = scale({ solid: null, dashed: null });
export const STRENGTH = scale({ subtle: null, default: null, strong: null });
export const LABEL_POSITION = scale({ start: null, center: null, end: null });

// ─── DIMENSIONS ───────────────────────────────────────────────────────────────

export const ORIENTATION_DIM = dimension("orientation", ORIENTATION, {
  modifier: true,
});
export const VARIANT_DIM = dimension("variant", VARIANT, { modifier: true });
export const STRENGTH_DIM = dimension("strength", STRENGTH, { modifier: true });
export const LABEL_POSITION_DIM = dimension("labelPosition", LABEL_POSITION, {
  modifier: true,
});

// ─── DERIVED TYPES ────────────────────────────────────────────────────────────

export type SeparatorOrientation = keyof typeof ORIENTATION;
export type SeparatorVariant = keyof typeof VARIANT;
export type SeparatorStrength = keyof typeof STRENGTH;
export type SeparatorLabelPosition = keyof typeof LABEL_POSITION;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const SEPARATOR_DEFAULTS = {
  orientation: "horizontal" as SeparatorOrientation,
  variant: "solid" as SeparatorVariant,
  strength: "default" as SeparatorStrength,
  labelPosition: "center" as SeparatorLabelPosition,
} as const;