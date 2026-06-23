// design/feedback/components/banner/banner.tokens.ts

import { FEEDBACK_TOKENS } from "../../feedback.tokens";
import type { FeedbackColor, FeedbackRadius, FeedbackVariant } from "../../feedback.tokens";

export { FEEDBACK_TOKENS as BANNER_TOKENS };
export type { FeedbackColor as BannerColor, FeedbackVariant as BannerVariant, FeedbackRadius as BannerRadius };

export const BANNER_DEFAULTS = {
  variant: "soft"    as FeedbackVariant,
  color:   "neutral" as FeedbackColor,
  radius:  "none"    as FeedbackRadius,
} as const;
