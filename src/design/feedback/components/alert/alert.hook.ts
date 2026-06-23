// design/feedback/components/alert/alert.hook.ts

import { useFeedback }    from "../../feedback.hook";
import { composeClass }   from "~sh/base.hook";
import { ALERT_DEFAULTS } from "./alert.tokens";
import type { AlertProps } from "./alert.props";

export function useAlert(props: AlertProps) {
  const {
    variant     = ALERT_DEFAULTS.variant,
    color       = ALERT_DEFAULTS.color,
    radius      = ALERT_DEFAULTS.radius,
    dismissible = false,
    dismissLabel = "Dismiss",
    ...feedbackProps
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } =
    useFeedback({ variant, color, radius, ...feedbackProps });

  return {
    props: {
      class: composeClass(feedbackClass, "alert", dismissible && "alert--dismissible"),
      style: feedbackStyle || undefined,
      role:  color === "danger" || color === "warning" ? ("alert" as const) : ("status" as const),
      ...feedbackAttrs,
      ...rest,
    },
    dismissible,
    dismissLabel,
  };
}
