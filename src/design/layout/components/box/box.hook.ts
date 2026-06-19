// design/layout/box/box.hook.ts

import type { BoxProps } from "./box.props";
import { BOX_TOKENS, BOX_DEFAULTS } from "./box.tokens";
import { useLayout } from "~l/layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

/**
 * Hook: `useBox`
 * 
 * Prepares properties, classes, and styles for the Box component.
 * 
 * Box delegates all of its structural concerns (like padding, margin, flex, 
 * and gaps) to the `useLayout` hook. This maintains a clean spacing chain
 * where `BoxProps` -> `LayoutProps` -> `SpacingProps`.
 * 
 * It handles Box-specific visuals like `border-radius` on top of the layout base.
 * 
 * @param {BoxProps} props - The combined layout, spacing, and box properties.
 * @returns An object containing the dynamic `Tag` and the merged HTML `props`.
 */
export function useBox(props: BoxProps) {
  const {
    as: Tag = BOX_DEFAULTS.as,
    radius,
    ...layoutProps
  } = props;

  // Delegate structural dimensions and spacing (m, p, pt, gap, etc.) to the layout hook
  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);

  // Resolve box-specific visual tokens (like radius)
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    BOX_TOKENS,
    { radius },
    "box",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "box", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}