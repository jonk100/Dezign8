// design/feedback/components/alert/alert.tokens.ts

import { FEEDBACK_TOKENS } from "../../feedback.tokens";
import type { FeedbackColor, FeedbackRadius, FeedbackVariant } from "../../feedback.tokens";

export { FEEDBACK_TOKENS as ALERT_TOKENS };
export type { FeedbackColor as AlertColor, FeedbackVariant as AlertVariant, FeedbackRadius as AlertRadius };

export const ALERT_DEFAULTS = {
  variant: "soft"    as FeedbackVariant,
  color:   "neutral" as FeedbackColor,
  radius:  "md"      as FeedbackRadius,
} as const;
