// design/feedback/badge/badge.props.ts

/**
 * @file Prop interface for the Badge component.
 * @module design/feedback/badge
 *
 * {@link BadgeProps} extends {@link FeedbackProps} with badge-specific props.
 *
 * **Inheritance chain:**
 * ```
 * BaseComponentProps   class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FeedbackProps        size, variant, color, radius, pulse, placement
 *        ↑
 * BadgeProps           count, max, dot
 * ```
 *
 * **Three rendering modes:**
 * 1. **Count badge** — `count` prop provided. Displays a number, capped by `max`.
 * 2. **Label badge** — No `count` prop, no `dot`. Renders the default slot.
 * 3. **Dot badge**   — `dot={true}`. Renders as a small circle with no content.
 *
 * @see {@link FeedbackProps}  in `feedback/feedback.props.ts`
 * @see {@link BADGE_DEFAULTS} in `feedback/badge/badge.tokens.ts`
 * @see {@link useBadge}       in `feedback/badge/badge.hook.ts`
 */

import type { FeedbackProps } from "../../feedback.props";

/**
 * Props for the `<Badge>` component.
 *
 * @example
 * ```astro
 * <!-- Count badge (notification style) -->
 * <Badge count={12} />
 *
 * <!-- Capped count -->
 * <Badge count={150} max={99} />  <!-- renders "99+" -->
 *
 * <!-- Dot indicator -->
 * <Badge dot color="success" />
 *
 * <!-- Label badge (slot content) -->
 * <Badge variant="soft" color="info">Beta</Badge>
 *
 * <!-- Overlaid on a button -->
 * <div style="position: relative; display: inline-flex;">
 *   <Button>Messages</Button>
 *   <Badge count={3} placement="top-end" />
 * </div>
 * ```
 */
import type { IconProps } from "~/shared/icon.props";

export interface BadgeProps extends FeedbackProps, IconProps {
  /**
   * Numeric count to display.
   *
   * When provided, the badge renders the number (capped by `max`).
   * When omitted, the default slot is rendered as label content.
   */
  count?: number;

  /**
   * Maximum count value before capping with `"+"`.
   *
   * When `count > max`, the badge displays `"${max}+"`.
   *
   * @default `99`
   * @example count=150, max=99 → "99+"
   * @example count=5,   max=99 → "5"
   */
  max?: number;

  /**
   * Renders the badge as a small filled circle with no visible content.
   *
   * When `true`, `count` and slot content are both ignored.
   * Useful as a presence/status indicator.
   *
   * @default `false`
   */
  dot?: boolean;

  /**
   * Renders the badge as a small circle or square containing only an icon.
   * Hides the count and slot content.
   */
  iconOnly?: boolean;
}
