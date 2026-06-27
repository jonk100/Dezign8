// design/feedback/badge/badge.hook.ts

/**
 * @file Component hook for the Badge component.
 * @module design/feedback/badge
 *
 * {@link useBadge} translates {@link BadgeProps} into the props that
 * `Badge.astro` needs, including the computed display string for count badges.
 *
 * **Rendering mode resolution:**
 * ```
 * dot=true            → mode "dot"   (empty circle, no content)
 * count !== undefined → mode "count" (number, possibly capped)
 * default             → mode "label" (renders default slot)
 * ```
 *
 * **Count capping:**
 * `displayCount = count > max ? "${max}+" : String(count)`
 *
 * @see {@link useFeedback}    in `feedback/feedback.hook.ts`
 * @see {@link BadgeProps}     in `feedback/badge/badge.props.ts`
 * @see {@link BADGE_DEFAULTS} in `feedback/badge/badge.tokens.ts`
 */

import type { BadgeProps }  from "./badge.props";
import { BADGE_DEFAULTS }   from "./badge.tokens";
import { useFeedback }      from "../../feedback.hook";
import { composeClass }     from "~/shared/base.hook";

export type BadgeMode = "dot" | "count" | "label" | "icon";

/**
 * Resolves {@link BadgeProps} into the props `Badge.astro` spreads.
 *
 * @returns `{ Tag, props, mode, displayCount }`
 *
 * @example
 * ```astro
 * const { Tag, props, mode, displayCount } = useBadge(Astro.props as BadgeProps);
 * ```
 */
export function useBadge(props: BadgeProps) {
  const {
    count,
    max       = BADGE_DEFAULTS.max,
    dot       = BADGE_DEFAULTS.dot,
    icon,
    iconOnly  = false,
    ...feedbackProps
  } = props;

  // ── Rendering mode ──────────────────────────────────────────────────────
  const mode: BadgeMode =
    dot              ? "dot"
    : iconOnly       ? "icon"
    : count !== undefined ? "count"
    : "label";

  // ── Count display string ────────────────────────────────────────────────
  const displayCount: string | undefined =
    mode === "count"
      ? count! > max
        ? `${max}+`
        : String(count)
      : undefined;

  // ── useFeedback with badge-opinionated defaults ─────────────────────────
  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({
    variant: BADGE_DEFAULTS.variant,
    color:   BADGE_DEFAULTS.color,
    size:    BADGE_DEFAULTS.size,
    radius:  BADGE_DEFAULTS.radius,
    ...feedbackProps,
  });

  return {
    Tag: "span" as const,
    props: {
      class: composeClass(
        feedbackClass,
        "badge",
        dot && "badge--dot",
        iconOnly && "badge--icon-only",
      ),
      style:               feedbackStyle,
      "aria-label":        mode === "dot" ? (feedbackProps["aria-label"] as string | undefined) : undefined,
      "aria-hidden":       mode === "dot" && !feedbackProps["aria-label"] ? "true" as const : undefined,
      ...feedbackAttrs,
      ...rest,
    },
    mode,
    displayCount,
  };
}
