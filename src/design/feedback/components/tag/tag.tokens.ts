// design/feedback/components/tag/tag.tokens.ts

export { FEEDBACK_TOKENS as TAG_TOKENS } from "../../feedback.tokens";
export type {
  FeedbackSize    as TagSize,
  FeedbackVariant as TagVariant,
  FeedbackColor   as TagColor,
  FeedbackRadius  as TagRadius,
} from "../../feedback.tokens";

export const TAG_DEFAULTS = {
  variant: "soft",
  color:   "neutral",
  size:    "md",
  radius:  "sm",
} as const;
