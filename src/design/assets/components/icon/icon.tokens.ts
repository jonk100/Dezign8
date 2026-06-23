// design/assets/components/icon/icon.tokens.ts

/**
 * @file Token spec and defaults for the Icon component.
 * @module design/assets/icon
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";

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
  "2xs": null,
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
  "2xl": null,
});

// ─── SPEC ────────────────────────────────────────────────────────────────────

export const ICON_TOKENS = defineTokens({
  size: dimension("size", ICON_SIZE, { modifier: true }),
});

// ─── DERIVED TYPES ───────────────────────────────────────────────────────────

export type IconSize = keyof typeof ICON_TOKENS.size.values;

/**
 * Opinionated defaults for the Icon component.
 */
export const ICON_DEFAULTS = {
  size: "md",
} as const;
