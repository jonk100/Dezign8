// design/feedback/components/alert/alert.props.ts

import type { FeedbackProps } from "../../feedback.props";
import type { AlertColor, AlertRadius, AlertVariant } from "./alert.tokens";

import type { IconProps } from "~/shared/icon.props";

export interface AlertProps extends Omit<FeedbackProps, "color" | "variant" | "radius" | "pulse" | "placement">, IconProps {
  /** Visual treatment. @default "soft" */
  variant?: AlertVariant;

  /** Color role. @default "neutral" */
  color?: AlertColor;

  /** Border radius. @default "md" */
  radius?: AlertRadius;
  dismissible?: boolean;

  /**
   * `aria-label` for the dismiss button. Only used when `dismissible=true`.
   * @default "Dismiss"
   */
  dismissLabel?: string;
}
