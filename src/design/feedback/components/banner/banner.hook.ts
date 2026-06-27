// design/feedback/components/banner/banner.hook.ts

import { useFeedback }     from "../../feedback.hook";
import { composeClass }    from "~sh/base.hook";
import { BANNER_DEFAULTS } from "./banner.tokens";
import type { BannerProps } from "./banner.props";

export function useBanner(props: BannerProps) {
  const {
    variant      = BANNER_DEFAULTS.variant,
    color        = BANNER_DEFAULTS.color,
    radius       = BANNER_DEFAULTS.radius,
    sticky       = false,
    dismissible  = false,
    dismissLabel = "Dismiss",
    "aria-label": ariaLabel = "Page notification",
    icon,
    ...feedbackProps
  } = props as BannerProps & { "aria-label"?: string };

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } =
    useFeedback({ variant, color, radius, ...feedbackProps });

  return {
    props: {
      class:        composeClass(feedbackClass, "banner", sticky && "banner--sticky", dismissible && "banner--dismissible"),
      style:        feedbackStyle || undefined,
      role:         "region" as const,
      "aria-label": ariaLabel,
      ...feedbackAttrs,
      ...rest,
    },
    dismissible,
    dismissLabel,
  };
}
