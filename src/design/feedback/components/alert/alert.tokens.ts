// design/feedback/components/alert/alert.tokens.ts

import { FEEDBACK_TOKENS }                                     from "../../feedback.tokens";
import type { FeedbackColor, FeedbackRadius, FeedbackVariant,
              FeedbackSize }                                   from "../../feedback.tokens";

export { FEEDBACK_TOKENS as ALERT_TOKENS };
export type { FeedbackColor as AlertColor, FeedbackVariant as AlertVariant,
              FeedbackRadius as AlertRadius, FeedbackSize as AlertSize };

type AlertSize = FeedbackSize;

export const ALERT_DEFAULTS = {
  variant: "soft"    as FeedbackVariant,
  color:   "neutral" as FeedbackColor,
  radius:  "md"      as FeedbackRadius,
  size:    "md"      as FeedbackSize,
} as const;

export const ALERT_SIZE_MAP = {
  "3xs": { "font-size": "var(--fsf--3xs)", padding: "var(--space-in--3xs)", gap: "var(--space-in--3xs)" },
  "2xs": { "font-size": "var(--fsf--xs)",  padding: "var(--space-in--2xs)", gap: "var(--space-in--2xs)" },
  xs:    { "font-size": "var(--fs--2xs)",  padding: "var(--space-in--xs)",  gap: "var(--space-in--xs)" },
  sm:    { "font-size": "var(--fs--xs)",   padding: "var(--space-in--sm)",  gap: "var(--space-in--xs)" },
  md:    { "font-size": "var(--fs--sm)",   padding: "var(--space-in--md)",  gap: "var(--space-in--sm)" },
  lg:    { "font-size": "var(--fs--md)",   padding: "var(--space-in--lg)",  gap: "var(--space-in--sm)" },
  xl:    { "font-size": "var(--fs--lg)",   padding: "var(--space-in--xl)",  gap: "var(--space-in--md)" },
  "2xl": { "font-size": "var(--fs--xl)",   padding: "var(--space-in--2xl)", gap: "var(--space-in--md)" },
  "3xl": { "font-size": "var(--fs--2xl)",  padding: "var(--space-in--3xl)", gap: "var(--space-in--lg)" },
  "4xl": { "font-size": "var(--fs--3xl)",  padding: "var(--space-in--4xl)", gap: "var(--space-in--lg)" },
  "5xl": { "font-size": "var(--fs--4xl)",  padding: "var(--space-in--5xl)", gap: "var(--space-in--xl)" },
  "6xl": { "font-size": "var(--fs--5xl)",  padding: "var(--space-in--6xl)", gap: "var(--space-in--xl)" },
} as const satisfies Record<AlertSize, Record<string, string>>;

