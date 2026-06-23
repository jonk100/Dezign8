// design/feedback/badge/badge.tokens.ts

/**
 * @file Token spec and defaults for the Badge component.
 * @module design/feedback/badge
 *
 * Badge re-uses the full {@link FEEDBACK_TOKENS} spec unchanged.
 * Defaults are opinionated for the most common use case: a small solid
 * danger notification count overlaid on another element.
 *
 * Component-specific size mapping (see badge.css):
 *   xs  → 14px diameter (dot mode), 10px font, minimal padding
 *   sm  → 18px min-height, 11px font          ← default
 *   md  → 22px min-height, 12px font
 *   lg  → 26px min-height, 14px font
 *   xl  → 32px min-height, 16px font
 *
 * @see {@link FEEDBACK_TOKENS} in `feedback/feedback.tokens.ts`
 * @see {@link useBadge}        in `feedback/badge/badge.hook.ts`
 */

export { FEEDBACK_TOKENS as BADGE_TOKENS } from "../../feedback.tokens";
export type {
  FeedbackSize    as BadgeSize,
  FeedbackVariant as BadgeVariant,
  FeedbackColor   as BadgeColor,
  FeedbackRadius  as BadgeRadius,
} from "../../feedback.tokens";

/**
 * Opinionated defaults for the Badge component.
 *
 * These are applied in {@link useBadge} when props are omitted, overriding
 * the category-level defaults from {@link useFeedback}.
 */
export const BADGE_DEFAULTS = {
  variant: "solid",
  color:   "danger",   // most common: notification count
  size:    "sm",
  radius:  "full",     // pill shape
  max:     99,
  dot:     false,
} as const;
