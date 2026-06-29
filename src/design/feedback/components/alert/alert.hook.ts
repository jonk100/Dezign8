// design/feedback/components/alert/alert.hook.ts

import { useFeedback }                    from "../../feedback.hook";
import { composeClass, composeStyle }     from "~sh/base.hook";
import { ALERT_DEFAULTS, ALERT_SIZE_MAP } from "./alert.tokens";
import type { AlertSize }                 from "./alert.tokens";
import type { AlertProps }                from "./alert.props";
import { resolveComponentSizes }          from "~/shared/base.tokens";

export function useAlert(props: AlertProps) {
  const {
    size         = ALERT_DEFAULTS.size,
    variant      = ALERT_DEFAULTS.variant,
    color        = ALERT_DEFAULTS.color,
    radius       = ALERT_DEFAULTS.radius,
    dismissible  = false,
    dismissLabel = "Dismiss",
    icon,
    ...feedbackProps
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } =
    useFeedback({ variant, color, radius, size: size as AlertSize, ...feedbackProps });

  const alertStyle = resolveComponentSizes("alert", size as AlertSize, ALERT_SIZE_MAP);

  return {
    props: {
      class: composeClass(feedbackClass, "alert", dismissible && "alert--dismissible"),
      style: composeStyle(feedbackStyle, ...alertStyle) || undefined,
      role:  color === "danger" || color === "warning" ? ("alert" as const) : ("status" as const),
      ...feedbackAttrs,
      ...rest,
    },
    dismissible,
    dismissLabel,
  };
}
