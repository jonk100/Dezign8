import type { FlexProps } from "./flex.props";
import { FLEX_TOKENS, FLEX_DEFAULTS } from "./flex.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useFlex(props: FlexProps) {
  const {
    as: Tag = FLEX_DEFAULTS.as,
    direction = FLEX_DEFAULTS.direction,
    wrap = FLEX_DEFAULTS.wrap,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    FLEX_TOKENS,
    { direction, wrap },
    "flex",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "flex", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}
