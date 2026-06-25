// design/feedback/components/alert/alert.tokens.ts

import { FEEDBACK_TOKENS }                                     from "../../feedback.tokens";
import { SPACE }                                               from "~/shared/primitives.tokens";
import type { FeedbackColor, FeedbackRadius, FeedbackVariant,
              FeedbackSize }                                   from "../../feedback.tokens";

export { FEEDBACK_TOKENS as ALERT_TOKENS };
export type { FeedbackColor as AlertColor, FeedbackVariant as AlertVariant,
              FeedbackRadius as AlertRadius, FeedbackSize as AlertSize };

export const ALERT_DEFAULTS = {
  variant: "soft"    as FeedbackVariant,
  color:   "neutral" as FeedbackColor,
  radius:  "md"      as FeedbackRadius,
  size:    "md"      as FeedbackSize,
} as const;

const {
  "2xs": xxs,
  "2xl": xxl,
} = SPACE;

xxs === SPACE["2xs"];
xxl === SPACE["2xl"];

export const ALERT_SIZE_MAP: Record<FeedbackSize, { fontSize: string; p: string }> = {
  "2xs": { fontSize: "var(--fsf--xs)",  p: xxs },
  xs: { fontSize: "var(--fs--2xs)", p: SPACE.xs },
  sm: { fontSize: "var(--fs--xs)",  p: SPACE.sm },
  md: { fontSize: "var(--fs--sm)",  p: SPACE.md },
  lg: { fontSize: "var(--fs--md)",  p: SPACE.md },
  xl: { fontSize: "var(--fs--lg)",  p: SPACE.md },
  "2xl": { fontSize: "var(--fs--xl)", p: xxl },
};
