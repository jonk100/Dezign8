// design/triggers/components/theme-toggle/theme-toggle.props.ts

/**
 * ThemeToggleProps
 *
 * Extends `ButtonProps` so that every trigger-level prop (`variant`, `color`,
 * `size`, `radius`) and button-level prop (`iconOnly`, `fullWidth`) is
 * available. The toggle introduces no additional props — its behaviour
 * (read/write `data-theme` + `localStorage`) is fully internal.
 *
 * Reasonable defaults are applied by `THEME_TOGGLE_DEFAULTS` in the tokens
 * file so the component looks good with zero props:
 *   - `variant: "ghost"`    — blends into any header or toolbar
 *   - `iconOnly: true`      — square icon button (sun / moon)
 *   - `size: "md"`          — standard trigger size
 *   - `color: "neutral"`    — works on any background
 *
 * @example Minimal
 * ```astro
 * <ThemeToggle />
 * ```
 *
 * @example Outlined, small
 * ```astro
 * <ThemeToggle variant="outlined" size="sm" />
 * ```
 */

import type { ButtonProps } from "~tr/components/button/button.props";

export interface ThemeToggleProps extends ButtonProps {}
