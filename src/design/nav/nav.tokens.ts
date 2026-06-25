/**
 * @file Category token spec for the nav component family.
 * @module design/nav
 *
 * This file is the single source of truth for which token dimensions the
 * `nav` category exposes and what values each accepts. It follows the
 * same shape as every other category tokens file: assemble from primitives,
 * export the spec and derived types.
 *
 * **What this file owns:**
 * - `NAV_SIZE` — local spatial size scale (control height/padding tiers)
 * - `NAV_VARIANT` — local variant scale (visual treatment names)
 * - `NAV_TOKENS` — the assembled category spec
 * - `NavSize`, `NavVariant`, `NavColor`, `NavRadius` — derived union types
 *
 * **Architecture position:**
 * ```
 * primitives.tokens.ts      SPACE, RADIUS_DIM, COLOR_DIM …
 *        ↑
 * nav/nav.tokens.ts         NAV_TOKENS   ← this file
 *        ↑
 * nav/components/menu/menu.tokens.ts         re-export or composeTokens
 * nav/components/tabs/tabs.tokens.ts         re-export or composeTokens
 * ```
 */
import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM, COLOR_DIM }          from "~/shared/primitives.tokens";

/**
 * Spatial size scale for nav components.
 * Drives padding, font-size, and gap proportionally.
 */
const NAV_SIZE = scale({
  "2xs": "var(--nav--2xs)",
  xs:    "var(--nav--xs)",
  sm:    "var(--nav--sm)",
  md:    "var(--nav--md)",
  lg:    "var(--nav--lg)",
  xl:    "var(--nav--xl)",
  "2xl": "var(--nav--2xl)",
});

/**
 * Visual treatment variants for nav controls.
 *
 * | Variant      | Visual expression                                             |
 * |--------------|---------------------------------------------------------------|
 * | `underlined` | Transparent bg. Bottom border on active item.                 |
 * | `pill`       | Rounded background pill on active item.                       |
 * | `soft`       | Muted fill bg on active item. No borders.                     |
 * | `ghost`      | No borders, background only on hover/active.                  |
 */
const NAV_VARIANT = scale({
  underlined: null,
  pill:       null,
  soft:       null,
  ghost:      null,
});

export const NAV_TOKENS = defineTokens({
  size:    dimension("size",    NAV_SIZE, { modifier: true }),
  variant: dimension("variant", NAV_VARIANT, { modifier: true }),
  color:   COLOR_DIM,
  radius:  RADIUS_DIM,
});

export type NavSize    = keyof typeof NAV_TOKENS.size.values;
export type NavVariant = keyof typeof NAV_TOKENS.variant.values;
export type NavColor   = keyof typeof NAV_TOKENS.color.values;
export type NavRadius  = keyof typeof NAV_TOKENS.radius.values;
