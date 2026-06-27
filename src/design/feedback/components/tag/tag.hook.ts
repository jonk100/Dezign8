// design/feedback/components/tag/tag.hook.ts

import type { TagProps } from "./tag.props";
import { TAG_DEFAULTS } from "./tag.tokens";
import { useFeedback } from "../../feedback.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useTag(props: TagProps) {
  const {
    variant = TAG_DEFAULTS.variant,
    color   = TAG_DEFAULTS.color,
    size    = TAG_DEFAULTS.size,
    radius  = TAG_DEFAULTS.radius,
    icon,
    iconOnly = false,
    ...rest
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest: remaining } = useFeedback({
    variant,
    color,
    size,
    radius,
    ...rest,
  });

  return {
    Tag: "span" as const,
    props: {
      class: composeClass(
        feedbackClass,
        "tag",
        iconOnly && "tag--icon-only",
      ),
      style: composeStyle(feedbackStyle),
      ...feedbackAttrs,
      ...remaining,
    },
  };
}
