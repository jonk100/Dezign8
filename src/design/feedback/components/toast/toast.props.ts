// design/feedback/components/toast/toast.props.ts

import type { FeedbackProps } from "../../feedback.props";
import type { ToastColor, ToastRadius, ToastVariant } from "./toast.tokens";

export interface ToastProps extends Omit<FeedbackProps, "color" | "variant" | "radius" | "pulse" | "placement"> {
  /** Visual treatment. @default "soft" */
  variant?: ToastVariant;

  /** Color role. @default "neutral" */
  color?: ToastColor;

  /** Border radius. @default "md" */
  radius?: ToastRadius;

  /** Optional bold heading above the message body. */
  title?: string;

  /** Show a dismiss button. @default true */
  dismissible?: boolean;

  /** `aria-label` for the dismiss button. @default "Dismiss" */
  dismissLabel?: string;
}
