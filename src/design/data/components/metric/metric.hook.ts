import type { MetricProps } from "./metric.props";
import { METRIC_TOKENS, METRIC_DEFAULTS } from "./metric.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useData } from "~/data/data.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useMetric(props: MetricProps) {
  const {
    value,
    label,
    description,
    trend,
    trendDirection,
    size = METRIC_DEFAULTS.size,
    icon,
    ...dataProps
  } = props;

  const { dataClass, dataStyle, dataAttrs, rest } = useData({ size, ...dataProps });

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    METRIC_TOKENS,
    {},
    "metric"
  );

  const cls = composeClass(dataClass, "metric", ...tokenClasses);
  const style = composeStyle(dataStyle, ...tokenStyle) || undefined;

  return {
    Tag: "div" as const,
    value,
    label,
    description,
    trend,
    trendDirection,
    props: {
      class: cls,
      style,
      ...dataAttrs,
      ...rest,
    },
  };
}
