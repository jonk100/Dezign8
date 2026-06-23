// design/forms/checkbox/checkbox.props.ts

/**
 * @file Prop interface for the Checkbox component.
 * @module design/forms/checkbox
 *
 * {@link CheckboxProps} extends {@link FormProps} with checkbox-specific props.
 *
 * **Key design decision — `checkState` over `checked + indeterminate`:**
 * A single `checkState?: CheckState` prop replaces the two-boolean pattern.
 * The three values are mutually exclusive by type, eliminating the footgun
 * of `checked={true} indeterminate={true}` being simultaneously valid.
 *
 * @see {@link FormProps}        in `forms/forms.props.ts`
 * @see {@link CheckState}       in `forms/checkbox/checkbox.tokens.ts`
 * @see {@link CHECKBOX_DEFAULTS} in `forms/checkbox/checkbox.tokens.ts`
 * @see {@link useCheckbox}      in `forms/checkbox/checkbox.hook.ts`
 */

import type { FormProps }                from "~f/forms.props";
import type { CheckState, LabelPosition } from "./checkbox.tokens";

/**
 * Props for the `<Checkbox>` component.
 *
 * @example
 * ```astro
 * <!-- Basic uncontrolled -->
 * <Checkbox name="agree">I accept the terms</Checkbox>
 *
 * <!-- Controlled: checked -->
 * <Checkbox name="newsletter" value="subscribed" checkState="checked">
 *   Subscribe
 * </Checkbox>
 *
 * <!-- Select-all pattern -->
 * <Checkbox name="all" checkState={allSelected ? "checked" : noneSelected ? "unchecked" : "indeterminate"}>
 *   Select all
 * </Checkbox>
 *
 * <!-- Selectable chip -->
 * <Checkbox name="tag" value="ts" variant="outlined">TypeScript</Checkbox>
 * ```
 */
export interface CheckboxProps extends FormProps {
  /**
   * The `id` placed on the inner `<input type="checkbox">` for
   * `aria-describedby` wiring. Not needed for label association —
   * the `<label>` wrapper handles that automatically.
   */
  id?: string;

  /**
   * The visual and submitted state of the checkbox.
   *
   * - `"checked"`       — box is ticked; `checked` attribute present on input
   * - `"unchecked"`     — box is empty; `checked` attribute absent (default)
   * - `"indeterminate"` — dash shown; `.indeterminate` DOM property set via script
   *
   * `undefined` is identical to `"unchecked"`.
   *
   * @default `"unchecked"`
   * @see {@link CheckState}
   */
  checkState?: CheckState;

  /**
   * The string submitted under `name` when the checkbox is in the
   * `"checked"` state. Defaults to `"on"` in HTML when omitted.
   */
  value?: string;

  /**
   * Position of the label slot relative to the indicator.
   * @default `"end"` — `[■] Label`
   * @see {@link LabelPosition}
   */
  labelPosition?: LabelPosition;
}