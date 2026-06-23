// design/feedback/components/alert/alert.props.ts

import type { FeedbackProps } from "../../feedback.props";
import type { AlertColor, AlertRadius, AlertVariant } from "./alert.tokens";

export interface AlertProps extends Omit<FeedbackProps, "color" | "variant" | "radius" | "size" | "pulse" | "placement"> {
  /** Visual treatment. @default "soft" */
  variant?: AlertVariant;

  /** Color role. @default "neutral" */
  color?: AlertColor;

  /** Border radius. @default "md" */
  radius?: AlertRadius;

  /**
   * Adds a dismiss button. The consumer must wire up JS to hide the alert
   * (e.g. `document.querySelector('.alert').remove()`). When set, an
   * `aria-label` is emitted on the dismiss button for screen reader users.
   * @default false
   */
  dismissible?: boolean;

  /**
   * `aria-label` for the dismiss button. Only used when `dismissible=true`.
   * @default "Dismiss"
   */
  dismissLabel?: string;
}
