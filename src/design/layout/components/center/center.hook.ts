import type { CenterProps } from "./center.props";
import { CENTER_TOKENS, CENTER_DEFAULTS } from "./center.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useCenter(props: CenterProps) {
  const {
    direction = CENTER_DEFAULTS.direction,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    CENTER_TOKENS,
    {},
    "center",
  );

  return {
    Tag: "div",
    props: {
      class: composeClass(layoutClass, "center", `center--${direction}`, ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}
