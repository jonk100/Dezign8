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
export type RadioProps = FormProps & {
  id?: string;
  value?: string;
  checked?: boolean;
  labelPosition?: LabelPosition;
};