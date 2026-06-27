import type { StatProps } from "./stat.props";
import { STAT_TOKENS, STAT_DEFAULTS } from "./stat.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useData } from "~/data/data.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useStat(props: StatProps) {
  const {
    value,
    label,
    icon,
    size = STAT_DEFAULTS.size,
    ...dataProps
  } = props;

  const { dataClass, dataStyle, dataAttrs, rest } = useData({ size, ...dataProps });

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    STAT_TOKENS,
    {},
    "stat"
  );

  const cls = composeClass(dataClass, "stat", ...tokenClasses);
  const style = composeStyle(dataStyle, ...tokenStyle) || undefined;

  return {
    Tag: "div" as const,
    value,
    label,
    props: {
      class: cls,
      style,
      ...dataAttrs,
      ...rest,
    },
  };
}
