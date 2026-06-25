// design/assets/components/avatar/avatar.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

/**
 * Avatar token spec.
 *
 * prop       channel                CSS property
 * ─────────────────────────────────────────────────────────────────
 * size     → --avatar--size        width + height
 * radius   → --avatar--radius      border-radius
 * status   → (modifier class only) [data-status] drives dot color
 */

const AVATAR_SIZE = scale({
  "2xs": "var(--avatar--size-2xs, 1.25rem)",
  xs:    "var(--avatar--size-xs,  1.5rem)",
  sm:    "var(--avatar--size-sm,  2rem)",
  md:    "var(--avatar--size-md,  2.5rem)",
  lg:    "var(--avatar--size-lg,  3rem)",
  xl:    "var(--avatar--size-xl,  3.75rem)",
  "2xl": "var(--avatar--size-2xl, 5rem)",
});

const AVATAR_STATUS = scale({
  online:  null,
  offline: null,
  away:    null,
  busy:    null,
});

export const AVATAR_TOKENS = defineTokens({
  size:   dimension("size",   AVATAR_SIZE),
  radius: RADIUS_DIM,
  status: dimension("status", AVATAR_STATUS, { modifier: true }),
});

export type AvatarSize   = keyof typeof AVATAR_TOKENS.size.values;
export type AvatarRadius = keyof typeof AVATAR_TOKENS.radius.values;
export type AvatarStatus = keyof typeof AVATAR_TOKENS.status.values;

export const AVATAR_DEFAULTS = {
  size:   "md"    as AvatarSize,
  radius: "full"  as AvatarRadius,
} as const;
