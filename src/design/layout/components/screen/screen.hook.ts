import type { ScreenProps } from "./screen.props";
import { SCREEN_TOKENS, SCREEN_DEFAULTS } from "./screen.tokens";
import { useLayout } from "~/layout/layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

/**
 * - LayoutProps: Gap, Align, Justify
 * - SpacingProps: p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml
 *
 * @example
 * <Inline gap="2xl">     
 * <!--==============BECOMES===========-->
 *      <span style="--inline--gap: var(--space-in--2xl)">
 */

/**
 * @todo compare with ../header/header.hook.ts
 * layout props handled right? i dunno im tired
 */
export function useScreen(props: ScreenProps) {
  const {
    as: Tag = SCREEN_DEFAULTS.as,
    gap = SCREEN_DEFAULTS.gap,
    height = SCREEN_DEFAULTS.height,
    overflow = SCREEN_DEFAULTS.overflow,
    centered = SCREEN_DEFAULTS.centered,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    SCREEN_TOKENS,
    { gap },
    "screen",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "screen", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}
