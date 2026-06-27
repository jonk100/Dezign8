// design/feedback/components/dot/dot.tokens.ts
export { FEEDBACK_TOKENS as DOT_TOKENS } from "../../feedback.tokens";
export type {
  FeedbackSize    as DotSize,
  FeedbackVariant as DotVariant,
  FeedbackColor   as DotColor,
  FeedbackRadius  as DotRadius,
} from "../../feedback.tokens";

export const DOT_DEFAULTS = {
  variant: "solid" as const,
  color:   "neutral" as const,
  size:    "md" as const,
  radius:  "full" as const,
} as const;
