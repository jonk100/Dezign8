import type { ContainerProps } from "./container.props";
import { CONTAINER_TOKENS, CONTAINER_DEFAULTS } from "./container.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useContainer(props: ContainerProps) {
  const {
    as: Tag = CONTAINER_DEFAULTS.as,
    maxWidth = CONTAINER_DEFAULTS.maxWidth,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    CONTAINER_TOKENS,
    { maxWidth },
    "container",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "container", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}
