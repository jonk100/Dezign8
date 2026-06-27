import { useFeedback } from "../../feedback.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";
import { EMPTY_STATE_DEFAULTS } from "./empty-state.tokens";
import type { EmptyStateProps } from "./empty-state.props";

export function useEmptyState(props: EmptyStateProps) {
  const {
    size = EMPTY_STATE_DEFAULTS.size,
    variant = EMPTY_STATE_DEFAULTS.variant,
    color = EMPTY_STATE_DEFAULTS.color,
    radius = EMPTY_STATE_DEFAULTS.radius,
    title,
    description,
    icon,
    ...feedbackProps
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({
    size, variant, color, radius, ...feedbackProps
  });

  return {
    props: {
      class: composeClass(feedbackClass, "empty-state"),
      style: composeStyle(feedbackStyle),
      ...feedbackAttrs,
      ...rest,
    },
    title,
    description,
  };
}
