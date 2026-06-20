// design/triggers/components/theme-toggle/theme-toggle.tokens.ts

/**
 * ThemeToggle tokens & defaults.
 *
 * The toggle is a thin wrapper around Button so it re-exports the button
 * tokens as-is. The THEME_TOGGLE_DEFAULTS object provides opinionated
 * defaults that make the toggle look good with zero props.
 *
 * localStorage key and data-attribute name are also defined here so the
 * client script and the SSR detection in Head.astro stay in sync.
 */

export { BUTTON_SIZE_MAP as THEME_TOGGLE_SIZE_MAP } from "~tr/components/button/button.tokens";

/* ─── THEME CONSTANTS ─────────────────────────────────────── */

/** localStorage key used to persist the user preference. */
export const THEME_STORAGE_KEY = "theme" as const;

/** Value stored / read from localStorage and set on <html data-theme>. */
export type Theme = "light" | "dark";

/* ─── COMPONENT DEFAULTS ──────────────────────────────────── */

export const THEME_TOGGLE_DEFAULTS = {
  variant:  "ghost"   as const,
  color:    "neutral" as const,
  size:     "md"      as const,
  iconOnly: true,
} as const;
