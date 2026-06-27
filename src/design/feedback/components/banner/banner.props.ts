// design/feedback/components/banner/banner.props.ts

import type { FeedbackProps } from "../../feedback.props";
import type { BannerColor, BannerRadius, BannerVariant } from "./banner.tokens";

import type { IconProps } from "~/shared/icon.props";

export interface BannerProps extends Omit<FeedbackProps, "color" | "variant" | "radius" | "size" | "pulse" | "placement">, IconProps {
  /** Visual treatment. @default "soft" */
  variant?: BannerVariant;

  /** Color role. @default "neutral" */
  color?: BannerColor;

  /** Border radius. @default "none" */
  radius?: BannerRadius;

  /**
   * Sticks the banner to the top of the viewport.
   * Emits `.banner--sticky` and `position: sticky; top: 0` via data attribute.
   * @default false
   */
  sticky?: boolean;

  /**
   * Adds a dismiss button.
   * @default false
   */
  dismissible?: boolean;

  /**
   * `aria-label` for the dismiss button. Only used when `dismissible=true`.
   * @default "Dismiss"
   */
  dismissLabel?: string;
}
