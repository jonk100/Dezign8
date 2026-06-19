import type { GridProps } from "./grid.props";
import { GRID_TOKENS, GRID_DEFAULTS } from "./grid.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useGrid(props: GridProps) {
  const {
    as: Tag = GRID_DEFAULTS.as,
    columns,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    GRID_TOKENS,
    { columns },
    "grid",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "grid", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}
