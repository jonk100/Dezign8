// design/assets/components/icon/icon.tokens.ts

/**
 * @file Token spec and defaults for the Icon component.
 * @module design/assets/icon
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { ICON_COLOR_DIM } from "~/shared/primitives.tokens";

// ─── SIZE ────────────────────────────────────────────────────────────────────
//
// Sizes map directly to the --icon--size-* CSS variables defined in tokens.css
//
// 2xs -> var(--icon--size-2xs)
// xs  -> var(--icon--size-xs)
// sm  -> var(--icon--size-sm)
// md  -> var(--icon--size-md)
// lg  -> var(--icon--size-lg)
// xl  -> var(--icon--size-xl)
// 2xl -> var(--icon--size-2xl)

const ICON_SIZE = scale({
  "3xs": null,
  "2xs": null,
  xs:    null,
  sm:    null,
  md:    null,
  lg:    null,
  xl:    null,
  "2xl": null,
  "3xl": null,
  "4xl": null,
  "5xl": null,
  "6xl": null,
});

// ─── SPEC ────────────────────────────────────────────────────────────────────

export const ICON_TOKENS = defineTokens({
  size: dimension("size", ICON_SIZE, { modifier: true }),
  color: ICON_COLOR_DIM,
});

// ─── DERIVED TYPES ───────────────────────────────────────────────────────────

export type IconSize = keyof typeof ICON_TOKENS.size.values;
export type IconColor = keyof typeof ICON_TOKENS.color.values;

/**
 * Opinionated defaults for the Icon component.
 */
export const ICON_DEFAULTS = {
  size: "md",
} as const;
