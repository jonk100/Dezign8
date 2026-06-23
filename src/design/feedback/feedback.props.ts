// design/feedback/feedback.props.ts

/**
 * @file Shared prop interface for the feedback component category.
 * @module design/feedback
 *
 * {@link FeedbackProps} is the base interface that every feedback component
 * extends. It exposes the four token dimensions from {@link FEEDBACK_TOKENS}
 * alongside two behavioral props (`pulse`, `placement`) common to the
 * overlay/indicator subset of this category.
 *
 * **Interface extension chain:**
 * ```
 * BaseComponentProps        class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FeedbackProps             size, variant, color, radius, pulse, placement
 *        ↑
 * BadgeProps                + count, max, dot
 * ProgressProps             + value, max, type, showValue, indeterminate
 * SpinnerProps              + icon, speed, direction, label
 * ChipProps                 + onRemove, selected      (future)
 * TagProps                  + (label-only, no new behavior)  (future)
 * DotProps                  + (size only, no new behavior)   (future)
 * ```
 *
 * **`placement` design decision:**
 * `placement` lives on `FeedbackProps` rather than individual component props
 * because `Dot`, `Indicator`, and `Badge` all render as positioned overlays
 * on a parent element. Centralising the prop here means any future component
 * in this category can opt in to overlay behaviour without duplicating the type.
 * Components that never overlay (Alert, Toast, Spinner) simply ignore it.
 *
 * @see {@link FEEDBACK_TOKENS} in `feedback/feedback.tokens.ts`
 * @see {@link useFeedback}     in `feedback/feedback.hook.ts`
 */

import type { BaseComponentProps }                              from "~/shared/base.props";
import type { FeedbackSize, FeedbackVariant, FeedbackColor,
              FeedbackRadius, FeedbackPlacement }               from "./feedback.tokens";

/**
 * Shared props for all feedback components in the `feedback` category.
 *
 * Extend this interface in each component's `*.props.ts` file.
 *
 * @example
 * ```ts
 * // feedback/badge/badge.props.ts
 * import type { FeedbackProps } from "../feedback.props";
 *
 * export interface BadgeProps extends FeedbackProps {
 *   count?: number;
 *   max?:   number;
 *   dot?:   boolean;
 * }
 * ```
 */
export interface FeedbackProps extends BaseComponentProps {
  // ── Token dimensions ───────────────────────────────────────────────────────

  /**
   * Visual scale of the component.
   *
   * Modifier-class only — each component maps this to its own spatial channels
   * (font-size, padding, diameter, track height) via a lookup table in its hook.
   *
   * @default `"md"`
   */
  size?: FeedbackSize;

  /**
   * Visual treatment (chrome) of the component.
   *
   * - `solid`    — Filled bg. Opaque. Strong notification badges.
   * - `soft`     — Light tinted bg, subtle border. Chips, tags, gentle alerts.
   * - `outlined` — Transparent bg, solid border. Low-weight labels.
   * - `ghost`    — No border, no bg. Text-color only. Spinners, minimal indicators.
   * - `dashed`   — Dashed border, transparent bg. Skeleton borders, dashed progress.
   *
   * @default `"soft"`
   */
  variant?: FeedbackVariant;

  /**
   * Color role for the component's fill, border, and text.
   *
   * Sets a class modifier (`feedback--primary`, etc.) AND seven CSS color-step
   * channels (`--feedback--color-base`, `--feedback--color-subtle`, etc.) via
   * `resolveColorChannels` in {@link useFeedback}.
   *
   * Use semantic roles for meaning (`success`, `danger`, `warning`) and
   * palette roles for decoration (`primary`, `secondary`, `neutral`).
   *
   * @default `"neutral"`
   */
  color?: FeedbackColor;

  /**
   * Border-radius of the component. Writes `--feedback--radius`.
   *
   * @default `"full"` — pill/circle shape suits most badges and indicators.
   *   Override to `"md"` or `"sm"` for rectangular chips or banners.
   */
  radius?: FeedbackRadius;

  // ── Behavioral props ───────────────────────────────────────────────────────

  /**
   * Adds a looping CSS animation to draw attention to the component.
   *
   * Emits class `feedback--pulse`. The keyframe is defined in `feedback.css`.
   * Useful for live indicators (recording dot, system outage badge, etc.).
   *
   * Respects `prefers-reduced-motion` — animation is disabled for users who
   * have opted out of motion.
   *
   * @default `false`
   */
  pulse?: boolean;

  /**
   * Positions the component as an absolute overlay on its nearest
   * `position: relative` ancestor.
   *
   * Emits `data-placement="{value}"`. CSS handles the absolute coordinates.
   * The parent must have `position: relative` (or any non-static position).
   *
   * When omitted, the component renders inline in normal flow.
   *
   * Used by: `Badge`, `Dot`, `Indicator`.
   * Ignored by: `Spinner`, `Progress`, `Alert`, `Toast`, `Chip`, `Tag`.
   *
   * @default `undefined` (inline)
   */
  placement?: FeedbackPlacement;
}
