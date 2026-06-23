// design/feedback/progress/progress.props.ts

/**
 * @file Prop interface for the Progress component.
 * @module design/feedback/progress
 *
 * {@link ProgressProps} extends {@link FeedbackProps} with props for
 * displaying completion state across four display types.
 *
 * **Inheritance chain:**
 * ```
 * BaseComponentProps   class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FeedbackProps        size, variant, color, radius, pulse, placement
 *        ↑
 * ProgressProps        value, max, type, showValue, indeterminate
 * ```
 *
 * **Fill computation:**
 * The hook computes `fillPercent = clamp(value / max, 0, 1) * 100` and
 * writes it as `--progress--fill: X%`. CSS reads it as:
 *   - `width` for `bar`
 *   - `stroke-dashoffset` for `ring`
 *   - Display text for `number` and `percent`
 *
 * **Label:**
 * Progress has no `label` prop — use the default slot to provide a label
 * or descriptive text above or below the indicator. Consumer owns markup.
 *
 * @see {@link PROGRESS_DEFAULTS} in `feedback/progress/progress.tokens.ts`
 * @see {@link useProgress}       in `feedback/progress/progress.hook.ts`
 */

import type { FeedbackProps } from "../../feedback.props";
import type { ProgressType }  from "./progress.tokens";

/**
 * Props for the `<Progress>` component.
 *
 * @example
 * ```astro
 * <!-- Basic bar (60% complete) -->
 * <Progress value={60} />
 *
 * <!-- Ring with value shown -->
 * <Progress value={3} max={10} type="ring" showValue />
 *
 * <!-- Large number display -->
 * <Progress value={6} max={10} type="number" />  <!-- → "6/10" -->
 *
 * <!-- Percentage display -->
 * <Progress value={84} type="percent" />  <!-- → "84%" -->
 *
 * <!-- Indeterminate (loading, unknown progress) -->
 * <Progress indeterminate />
 *
 * <!-- With a label slot -->
 * <Progress value={45} color="success">
 *   <span>Upload progress</span>
 * </Progress>
 * ```
 */
export interface ProgressProps extends FeedbackProps {
  /**
   * Current progress value. Should be between `0` and `max`.
   * When undefined and `indeterminate` is false, renders an empty track.
   */
  value?: number;

  /**
   * Maximum value. The fill percentage is computed as `value / max`.
   * @default `100`
   */
  max?: number;

  /**
   * Display style for the progress indicator.
   *
   * - `bar`     — Horizontal track with a fill div. Classic progress bar.
   * - `ring`    — Circular SVG stroke. Radial / donut progress.
   * - `number`  — Large display-font numeral: `"{value}/{max}"`. No track rendered.
   * - `percent` — Large display-font percentage: `"{fillPercent}%"`. No track rendered.
   *
   * @default `"bar"`
   */
  type?: ProgressType;

  /**
   * Renders the computed percentage value alongside `bar` or `ring` types.
   * Has no effect on `number` or `percent` types (they are already numeric).
   *
   * @default `false`
   */
  showValue?: boolean;

  /**
   * Indeterminate state — progress is active but amount is unknown.
   *
   * When true:
   * - `bar`: shows an animated shimmer sweep across the track.
   * - `ring`: shows an animated rotating arc.
   * - `number`/`percent`: shows `"—"`.
   *
   * @default `false`
   */
  indeterminate?: boolean;
}
