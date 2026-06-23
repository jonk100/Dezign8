/**
 * @file Logic hook for the nav component family.
 * @module design/nav
 *
 * This file contains the `useNav` hook, which is the core logic engine for
 * all navigation components. It is responsible for translating the declarative
 * token props (size, variant, color, radius) into the actual CSS classes
 * and inline custom properties required to style the components.
 *
 * **How it works:**
 * 1. Takes raw `NavProps` from an Astro component.
 * 2. Applies category-level default fallbacks for missing tokens.
 * 3. Passes the tokens to `resolveTokens()` to generate the base `.nav--*` modifier classes.
 * 4. Passes the color role to `resolveColorChannels()` to write the 7 `--nav--color-*` CSS vars.
 * 5. Composes the final class string and style string.
 *
 * @see nav.tokens.ts — the token specification this hook resolves against
 * @see nav.css       — the CSS rules that consume the generated classes/vars
 */
import { resolveTokens }          from "~/shared/tokens";
import { resolveColorChannels }   from "~/shared/primitives.tokens";
import type { NavProps }          from "./nav.props";
import { NAV_TOKENS }             from "./nav.tokens";

const NAV_DEFAULTS = {
  size:        "md",
  variant:     "underlined",
  color:       "primary",
  radius:      "md",
  orientation: "horizontal"
} as const;

export function useNav(props: NavProps) {
  const {
    size        = NAV_DEFAULTS.size,
    variant     = NAV_DEFAULTS.variant,
    color       = NAV_DEFAULTS.color,
    radius      = NAV_DEFAULTS.radius,
    orientation = NAV_DEFAULTS.orientation,
    activeId,
    class: className,
    style,
    ...rest
  } = props;

  // Resolve tokens
  const { classes, style: resolvedStyles } = resolveTokens(NAV_TOKENS, { size, variant, color, radius }, "nav");
  const colorStyle = resolveColorChannels(color, "nav");

  // Compose CSS
  const navClass = [
    "nav",
    `nav--${orientation}`,
    ...classes,
    className
  ].filter(Boolean).join(" ");

  const navStyles = [
    ...resolvedStyles,
    ...colorStyle,
    style
  ].filter(Boolean).join("; ");

  return {
    navProps: {
      class: navClass,
      style: navStyles || undefined,
      ...rest
    },
    activeId
  };
}
