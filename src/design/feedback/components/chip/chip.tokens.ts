// design/feedback/components/chip/chip.tokens.ts

export { FEEDBACK_TOKENS as CHIP_TOKENS } from "../../feedback.tokens";
export type {
  FeedbackSize    as ChipSize,
  FeedbackVariant as ChipVariant,
  FeedbackColor   as ChipColor,
  FeedbackRadius  as ChipRadius,
} from "../../feedback.tokens";

export const CHIP_DEFAULTS = {
  variant: "outlined",
  color:   "neutral",
  size:    "md",
  radius:  "full",
} as const;
