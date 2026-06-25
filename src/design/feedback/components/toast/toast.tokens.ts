// design/feedback/components/toast/toast.tokens.ts

import { FEEDBACK_TOKENS }                                     from "../../feedback.tokens";
import { SPACE }                                               from "~/shared/primitives.tokens";
import type { FeedbackColor, FeedbackRadius, FeedbackVariant,
              FeedbackSize }                                   from "../../feedback.tokens";

export { FEEDBACK_TOKENS as TOAST_TOKENS };
export type { FeedbackColor as ToastColor, FeedbackVariant as ToastVariant,
              FeedbackRadius as ToastRadius, FeedbackSize as ToastSize };

export type ToastPosition =
  | "top-start" | "top-center" | "top-end"
  | "bottom-start" | "bottom-center" | "bottom-end";

export const TOAST_DEFAULTS = {
  variant:     "soft"         as FeedbackVariant,
  color:       "neutral"      as FeedbackColor,
  radius:      "md"           as FeedbackRadius,
  size:        "md"           as FeedbackSize,
  duration:    4000,
  dismissible: true,
  position:    "bottom-end"   as ToastPosition,
} as const;

const {
  "2xs": xxs,
  "2xl": xxl,
} = SPACE;

export const TOAST_SIZE_MAP: Record<FeedbackSize, { fontSize: string; p: string }> = {
  "2xs": { fontSize: "var(--fsf--xs)",  p: xxs },
  xs:   { fontSize: "var(--fsf--xs)",   p: SPACE.xs },
  sm:   { fontSize: "var(--fsf--sm)",   p: SPACE.sm },
  md:   { fontSize: "var(--fsf--sm)",   p: SPACE.md },
  lg:   { fontSize: "var(--fsf--md)",   p: SPACE.md },
  xl:   { fontSize: "var(--fsf--lg)",   p: SPACE.md },
  "2xl": { fontSize: "var(--fsf--xl)", p: xxl },
};
