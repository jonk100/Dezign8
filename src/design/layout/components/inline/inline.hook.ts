import type { InlineProps } from "./inline.props";
import { INLINE_TOKENS, INLINE_DEFAULTS } from "./inline.tokens";
import { useLayout } from "../../layout.hook";
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
export function useInline(props: InlineProps) {
  const {
    as: Tag = INLINE_DEFAULTS.as,
    gap = INLINE_DEFAULTS.gap,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    INLINE_TOKENS,
    { gap },
    "inline",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "inline", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}
