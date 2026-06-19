import type { InlineProps } from "./inline.props";
import { INLINE_TOKENS, INLINE_DEFAULTS } from "./inline.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useInline(props: InlineProps) {
  const {
    as = INLINE_DEFAULTS.as,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    INLINE_TOKENS,
    {},
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
