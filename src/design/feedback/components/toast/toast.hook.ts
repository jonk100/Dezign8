// design/feedback/components/toast/toast.hook.ts

import { useFeedback }                    from "../../feedback.hook";
import { composeClass, composeStyle }     from "~sh/base.hook";
import { TOAST_DEFAULTS, TOAST_SIZE_MAP } from "./toast.tokens";
import type { ToastSize }                 from "./toast.tokens";
import type { ToastProps }                from "./toast.props";

export function useToast(props: ToastProps) {
  const {
    size         = TOAST_DEFAULTS.size,
    variant      = TOAST_DEFAULTS.variant,
    color        = TOAST_DEFAULTS.color,
    radius       = TOAST_DEFAULTS.radius,
    dismissible  = TOAST_DEFAULTS.dismissible,
    dismissLabel = "Dismiss",
    title,
    icon,
    ...feedbackProps
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } =
    useFeedback({ variant, color, radius, size: size as ToastSize, ...feedbackProps });

  const sizeMap = TOAST_SIZE_MAP[size as ToastSize];

  const toastStyle = [
    `--toast--font-size: ${sizeMap.fontSize}`,
    `--toast--padding: ${sizeMap.p}`,
  ];

  return {
    props: {
      class: composeClass(feedbackClass, "toast", dismissible && "toast--dismissible"),
      style: composeStyle(feedbackStyle, ...toastStyle) || undefined,
      role:  color === "danger" || color === "warning" ? ("alert" as const) : ("status" as const),
      ...feedbackAttrs,
      ...rest,
    },
    title,
    dismissible,
    dismissLabel,
  };
}
