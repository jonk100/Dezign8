// design/triggers/components/theme-toggle/theme-toggle.hook.ts

/**
 * useThemeToggle
 *
 * Thin layer over `useButton`. The only thing this hook does beyond what
 * `useButton` already provides is merge THEME_TOGGLE_DEFAULTS so the
 * component renders as a ghost icon-only button when no props are passed,
 * and append the `theme-toggle` class for CSS targeting.
 *
 * Client-side toggling behaviour lives entirely in the `<script>` tag
 * inside ThemeToggle.astro — hooks are SSR-only in Astro, so runtime DOM
 * mutation does not belong here.
 *
 * Responsibility split:
 *   useButton  → resolves Tag, trigger classes, size channels, a11y attrs.
 *   useThemeToggle → merges opinionated defaults, appends component class.
 */

import type { ThemeToggleProps } from "./theme-toggle.props";
import { THEME_TOGGLE_DEFAULTS } from "./theme-toggle.tokens";
import { useButton } from "~tr/components/button/button.hook";
import { composeClass } from "~sh/base.hook";

/**
 * Resolves `ThemeToggleProps` into a `{ Tag, props }` object ready for
 * spread onto the root element in ThemeToggle.astro.
 *
 * @param props - All props passed to the `<ThemeToggle>` component.
 * @returns `Tag` — always `"button"` (no href variant for a theme toggle).
 * @returns `props` — merged class, style, data attributes.
 *
 * @example Minimal:
 *   useThemeToggle({})
 *   // class: "trigger button button--md button--icon-only theme-toggle"
 *   // variant: ghost, color: neutral
 */
export function useThemeToggle(props: ThemeToggleProps) {
  const {
    variant  = THEME_TOGGLE_DEFAULTS.variant,
    color    = THEME_TOGGLE_DEFAULTS.color,
    size     = THEME_TOGGLE_DEFAULTS.size,
    iconOnly = THEME_TOGGLE_DEFAULTS.iconOnly,
    ...rest
  } = props;

  const { Tag, props: buttonProps } = useButton({
    variant,
    color,
    size,
    iconOnly,
    type: "button",
    ...rest,
  });

  return {
    Tag,
    props: {
      ...buttonProps,
      class: composeClass(buttonProps.class, "theme-toggle"),
      "aria-label": "Toggle color theme",
    },
  };
}
