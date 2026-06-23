// design/feedback/spinner/spinner.props.ts

/**
 * @file Prop interface for the Spinner component.
 * @module design/feedback/spinner
 *
 * {@link SpinnerProps} extends {@link FeedbackProps} with spinner-specific
 * props for animation control and accessible labelling.
 *
 * **Inheritance chain:**
 * ```
 * BaseComponentProps   class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FeedbackProps        size, variant, color, radius, pulse, placement
 *        ↑
 * SpinnerProps         speed, direction, icon, label
 * ```
 *
 * **Icon system:**
 * The `icon` prop is ready to accept an icon name from `shared/icons` once
 * that system is in place. Until then, the component renders its built-in
 * SVG arc. The prop type will be narrowed to `IconName` from the generated
 * icon type file once available.
 *
 * **Positioning:**
 * Spinner has no `position` prop. Place the spinner inside a
 * `position: relative` wrapper to overlay it. A dedicated `<LoadingOverlay>`
 * component will handle the overlay pattern in a future iteration.
 *
 * @see {@link SPINNER_DEFAULTS} in `feedback/spinner/spinner.tokens.ts`
 * @see {@link useSpinner}       in `feedback/spinner/spinner.hook.ts`
 */

import type { FeedbackProps }             from "../../feedback.props";
import type { SpinnerSpeed, SpinnerDirection } from "./spinner.tokens";
import type { SvgName }                        from "~/shared/icons/index";
import type { ColorRole } from "~/shared/primitives.tokens";

/**
 * Props for the `<Spinner>` component.
 *
 * @example
 * ```astro
 * <!-- Default spinner -->
 * <Spinner />
 *
 * <!-- Slow large spinner -->
 * <Spinner size="lg" speed="slow" />
 *
 * <!-- Fast counter-clockwise (e.g. unwinding) -->
 * <Spinner speed="fast" direction="counterclockwise" />
 *
 * <!-- Danger color (e.g. cancelling) -->
 * <Spinner color="danger" label="Cancelling…" />
 *
 * <!-- Inline with text -->
 * <span style="display: inline-flex; gap: 0.5rem; align-items: center;">
 *   <Spinner size="sm" />
 *   Saving…
 * </span>
 * ```
 */
export interface SpinnerProps extends Omit<FeedbackProps, "color"> {
  /**
   * Color of the spinner.
   * 
   * Accepts any standard semantic `ColorRole` (primary, danger, etc).
   * For a spinner that sits inside a button or text block, use `"inherit"`
   * so it automatically matches the surrounding text color.
   * 
   * @default `"primary"`
   */
  color?: ColorRole | "inherit";

  /**
   * Rotation speed of the spinner arc.
   *
   * - `slow`   — 1.4s per revolution. Gentle, low-urgency loading.
   * - `normal` — 0.8s per revolution. Default.
   * - `fast`   — 0.4s per revolution. High-urgency operations.
   *
   * @default `"normal"`
   */
  speed?: SpinnerSpeed;

  /**
   * Rotation direction.
   *
   * - `clockwise`        — Standard spinner direction. Default.
   * - `counterclockwise` — Reversed rotation. Useful for "unwinding" states.
   *
   * @default `"clockwise"`
   */
  direction?: SpinnerDirection;

  /**
   * Icon from the Dezign8 icon registry (`shared/icons`).
   *
   * Accepts any `SvgName` key from the generated registry. The SVG component
   * is rendered inside the spinner and rotates on the same animation.
   *
   * Three spinner variants are available out of the box:
   * - `"spinner"`       — single arc (default)
   * - `"spinner-two"`   — dual-arc with opacity contrast
   * - `"spinner-three"` — triple arc
   *
   * Any other icon in the registry can be used for creative loading states.
   *
   * @default `"spinner"`
   */
  icon?: SvgName;

  /**
   * Accessible label announced by screen readers.
   *
   * Rendered as a visually-hidden `<span>` inside the spinner element.
   * The SVG arc is `aria-hidden` so only this label is read aloud.
   *
   * @default `"Loading"`
   */
  label?: string;
}
