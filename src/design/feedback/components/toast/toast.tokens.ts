// design/feedback/components/toast/toast.tokens.ts

import { FEEDBACK_TOKENS }                                     from "../../feedback.tokens";
import type { FeedbackColor, FeedbackRadius, FeedbackVariant,
              FeedbackSize }                                   from "../../feedback.tokens";

export { FEEDBACK_TOKENS as TOAST_TOKENS };
export type { FeedbackColor as ToastColor, FeedbackVariant as ToastVariant,
              FeedbackRadius as ToastRadius };

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

export type ToastSize = FeedbackSize;

export const TOAST_SIZE_MAP: Record<ToastSize, { fontSize: string; p: string }> = {
  "3xs": { fontSize: "var(--fsf--3xs)",  p: "var(--space-in--3xs)" },
  "2xs": { fontSize: "var(--fsf--xs)",   p: "var(--space-in--2xs)" },
  xs:    { fontSize: "var(--fsf--xs)",   p: "var(--space-in--xs)" },
  sm:    { fontSize: "var(--fsf--sm)",   p: "var(--space-in--sm)" },
  md:    { fontSize: "var(--fsf--sm)",   p: "var(--space-in--md)" },
  lg:    { fontSize: "var(--fsf--md)",   p: "var(--space-in--md)" },
  xl:    { fontSize: "var(--fsf--lg)",   p: "var(--space-in--md)" },
  "2xl": { fontSize: "var(--fsf--xl)",   p: "var(--space-in--2xl)" },
  "3xl": { fontSize: "var(--fsf--2xl)",  p: "var(--space-in--3xl)" },
  "4xl": { fontSize: "var(--fsf--3xl)",  p: "var(--space-in--4xl)" },
  "5xl": { fontSize: "var(--fsf--4xl)",  p: "var(--space-in--5xl)" },
  "6xl": { fontSize: "var(--fsf--5xl)",  p: "var(--space-in--6xl)" },
};
