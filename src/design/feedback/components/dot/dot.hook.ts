// design/feedback/components/dot/dot.hook.ts
import type { DotProps } from "./dot.props";
import { DOT_DEFAULTS } from "./dot.tokens";
import { useFeedback } from "../../feedback.hook";
import { composeClass } from "~/shared/base.hook";

export function useDot(props: DotProps) {
  const {
    variant = DOT_DEFAULTS.variant,
    color   = DOT_DEFAULTS.color,
    size    = DOT_DEFAULTS.size,
    radius  = DOT_DEFAULTS.radius,
    ...restProps
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({
    variant,
    color,
    size,
    radius,
    ...restProps,
  });

  return {
    Tag: "span" as const,
    props: {
      class: composeClass(feedbackClass, "dot"),
      style: feedbackStyle,
      "aria-hidden": "true" as const,
      ...feedbackAttrs,
      ...rest,
    },
  };
}
