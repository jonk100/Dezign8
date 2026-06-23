// design/forms/radio/radio.props.ts

/**
 * @file Prop interface for the Radio component.
 * @module design/forms/radio
 *
 * {@link RadioProps} extends {@link FormProps} with radio-specific props.
 * The component renders as a `<label>` wrapping a hidden `<input type="radio">`,
 * a circular custom indicator, and an optional label slot.
 *
 * **Inheritance chain:**
 * ```
 * BaseComponentProps   class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FormProps            size, variant, color, radius,
 *        ↑             disabled, required, invalid, name, fullWidth
 * RadioProps           id, value, checked, labelPosition
 * ```
 *
 * **Grouping:**
 * Radio buttons in the same group share the same `name` attribute. The browser
 * enforces mutual exclusivity (only one with a given `name` can be checked).
 * Pass the same `name` to all `Radio` instances in a group:
 *
 * ```astro
 * <Radio name="theme" value="light" checked>Light</Radio>
 * <Radio name="theme" value="dark">Dark</Radio>
 * <Radio name="theme" value="system">System</Radio>
 * ```
 *
 * **No `indeterminate`:**
 * Radio buttons do not have an indeterminate state — they are always
 * either selected or not. Unlike checkboxes, there is no in-between.
 *
 * @see {@link FormProps}      in `forms/forms.props.ts`        — parent interface
 * @see {@link LabelPosition}  in `forms/radio/radio.tokens.ts`
 * @see {@link RADIO_DEFAULTS} in `forms/radio/radio.tokens.ts`
 * @see {@link useRadio}       in `forms/radio/radio.hook.ts`
 */

import type { FormProps }    from "~f/forms.props";
import type { LabelPosition } from "./radio.tokens";

/**
 * Props for the `<Radio>` component.
 *
 * @example
 * ```astro
 * <!-- A radio group — same name, different values -->
 * <Radio name="plan" value="free" checked>Free</Radio>
 * <Radio name="plan" value="pro">Pro</Radio>
 * <Radio name="plan" value="enterprise">Enterprise</Radio>
 *
 * <!-- Card-style radio with outlined wrapper -->
 * <Radio name="plan" value="pro" variant="outlined" color="primary">
 *   Pro — $12/month
 * </Radio>
 *
 * <!-- Label on the left -->
 * <Radio name="agree" value="yes" labelPosition="start">Yes</Radio>
 * ```
 *
 * @see {@link FormProps}  — inherited token dimensions and behavior props
 * @see {@link useRadio}   — resolves these props at runtime
 */
export interface RadioProps extends FormProps {
  /**
   * The `id` attribute placed on the inner `<input type="radio">`.
   *
   * Useful when external elements reference the control via `aria-describedby`.
   * The wrapper `<label>` automatically associates with its child input without
   * requiring a separate `for` attribute.
   */
  id?: string;

  /**
   * The form submission value for this radio option.
   *
   * When this radio is selected and the form is submitted, this value is sent
   * under the group's `name` key. All radio buttons in the same group should
   * have distinct `value`s.
   *
   * @example `value="dark"` — submitted as `theme=dark` when `name="theme"`
   */
  value?: string;

  /**
   * Whether this radio button is selected on initial render.
   *
   * Sets the `checked` boolean attribute on the native `<input>`. Only one
   * radio in a group should be `checked`; if multiple are set, the browser
   * selects the last one in DOM order.
   *
   * @default `false` (attribute absent = not selected)
   */
  checked?: boolean;

  /**
   * Position of the label slot relative to the indicator circle.
   *
   * The DOM order is always `hidden input → indicator → slot` regardless
   * of this value. CSS handles the visual reordering via flex-direction.
   *
   * @default `"end"` — `(●) Label text`
   * @see {@link LabelPosition} for all values
   */
  labelPosition?: LabelPosition;
}