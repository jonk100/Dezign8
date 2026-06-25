// design/feedback/feedback.hook.ts

/**
 * @file Category hook for the feedback component family.
 * @module design/feedback
 *
 * {@link useFeedback} is the single point of contact with {@link resolveTokens}
 * for all feedback components. It converts {@link FeedbackProps} into a "bag
 * of resolved material" — classes, styles, data attributes — that component
 * hooks compose from.
 *
 * **Delegation model:**
 * ```
 *                useFeedback(FeedbackProps)
 *               ╱        |        |        ╲
 *         useBadge  useProgress  useSpinner  …future hooks
 *              ↓         ↓          ↓
 *        { Tag, props }  (ready to spread in *.astro)
 * ```
 *
 * **Return shape:**
 * ```ts
 * {
 *   feedbackClass: string,   // "feedback feedback--soft feedback--neutral …"
 *   feedbackStyle: string,   // "--feedback--radius: var(…); --feedback--color-base: …"
 *   feedbackAttrs: object,   // data-pulse, data-placement, etc.
 *   rest:          object,   // remaining props to forward to the element
 * }
 * ```
 *
 * Component hooks compose `feedbackClass` with their own classes, add their
 * own attrs, and return the final `{ Tag, props }`.
 *
 * @see {@link FEEDBACK_TOKENS}  in `feedback/feedback.tokens.ts`
 * @see {@link FeedbackProps}    in `feedback/feedback.props.ts`
 */

import type { FeedbackProps }        from "./feedback.props";
import type { m } from "../shared/base.props"
import { FEEDBACK_TOKENS }           from "./feedback.tokens";
import { resolveTokens }             from "~/shared/tokens";
import { resolveColorChannels }      from "~/shared/primitives.tokens";
import { useBaseCompose }            from "~/shared/base.hook";

/**
 * Resolves {@link FeedbackProps} into the resolved classes, inline styles,
 * and data attributes that all feedback component hooks build from.
 *
 * @param props - A {@link FeedbackProps} value, or any interface that extends it.
 *   Extra component-specific props stay in `rest` for the component hook.
 *
 * @returns
 * | key             | type     | description                                         |
 * |-----------------|----------|-----------------------------------------------------|
 * | `feedbackClass` | `string` | Resolved class string. Compose with component class.|
 * | `feedbackStyle` | `string` | Resolved inline style string (CSS channel vars).    |
 * | `feedbackAttrs` | `object` | Data attributes. Spread onto the root element.      |
 * | `rest`          | `object` | Remaining un-consumed props. Forward to element.    |
 *
 * @example
 * ```ts
 * // Typical usage in a component hook (e.g. useBadge):
 * import { useFeedback } from "../feedback.hook";
 * import { composeClass } from "~/shared/base.hook";
 *
 * export function useBadge(props: BadgeProps) {
 *   const { count, max = BADGE_DEFAULTS.max, dot = false, ...feedbackProps } = props;
 *
 *   const { feedbackClass, feedbackStyle, feedbackAttrs, rest } =
 *     useFeedback({ variant: "solid", color: "danger", ...feedbackProps });
 *
 *   return {
 *     Tag: "span" as const,
 *     props: {
 *       class: composeClass(feedbackClass, "badge"),
 *       style: feedbackStyle,
 *       ...feedbackAttrs,
 *       ...rest,
 *     },
 *     displayCount: …,
 *   };
 * }
 * ```
 */
export function useFeedback(props: FeedbackProps) {
  const {
    size      = "md",
    variant   = "soft",
    color     = "neutral",
    radius    = "full",
    pulse     = false,
    placement,
    class: className,
    bg,
    ...base   // v, testId, loading, spacing, motion, id, style, html attrs
  } = props;

  // ── Token resolution ───────────────────────────────────────────────────────
  //
  // size    → class modifier only: "feedback--md"
  // variant → class modifier only: "feedback--soft"
  // color   → class modifier only: "feedback--neutral"  (null value in COLOR_ROLE)
  // radius  → CSS var: --feedback--radius: var(--radius--full)

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    FEEDBACK_TOKENS,
    { size, variant, color, radius },
    "feedback",
  );

  // ── Color channel resolution ───────────────────────────────────────────────
  //
  // Writes the seven semantic color-step channels that feedback.css reads
  // per variant + state:
  //   --feedback--color-subtle   bg for soft rest state
  //   --feedback--color-muted    bg for soft hover
  //   --feedback--color-base     fill for solid; border on active
  //   --feedback--color-vivid    hover on solid
  //   --feedback--color-deep     pressed / active state
  //   --feedback--color-border   border for outlined/dashed
  //   --feedback--color-text     foreground on non-solid backgrounds

  const colorStyle = resolveColorChannels(color, "feedback");

  // ── Data attributes ────────────────────────────────────────────────────────

  const dataAttrs: Record<string, string> = {};
  if (pulse)     dataAttrs["data-pulse"]     = "";
  if (placement) dataAttrs["data-placement"] = placement;

  // ── Class + style composition ──────────────────────────────────────────────

  const { className: cls, style, attrs, rest, spacing } = useBaseCompose(
    {
      className: [
        "feedback",
        ...tokenClasses,                        // feedback--soft, feedback--neutral, feedback--md
        pulse     && "feedback--pulse",         // CSS: animation loop
        className,
      ],
      style: [
        ...tokenStyle,                          // --feedback--radius: …
        ...colorStyle,                          // --feedback--color-base: …, etc.
        bg && `--local--bg: ${bg}`,             // escape-hatch background
      ],
    },
    base,
  );

  return {
    feedbackClass: cls,
    feedbackStyle: style,
    feedbackAttrs: {
      ...attrs,
      ...dataAttrs,
    },
    rest,
    spacing,
  };
}
