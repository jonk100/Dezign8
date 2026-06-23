// design/feedback/components/chip/chip.hook.ts

import type { ChipProps } from "./chip.props";
import { CHIP_DEFAULTS } from "./chip.tokens";
import { useFeedback } from "../../feedback.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useChip(props: ChipProps) {
  const {
    as: Tag = "button",
    variant = CHIP_DEFAULTS.variant,
    color   = CHIP_DEFAULTS.color,
    size    = CHIP_DEFAULTS.size,
    radius  = CHIP_DEFAULTS.radius,
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
    Tag,
    props: {
      class: composeClass(
        feedbackClass,
        "chip",
      ),
      style: composeStyle(feedbackStyle),
      ...feedbackAttrs,
      ...remaining,
    },
  };
}
