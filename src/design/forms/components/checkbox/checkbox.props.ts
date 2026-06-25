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
export type CheckboxProps = FormProps & {
  id?: string;
  checkState?: CheckState;
  value?: string;
  labelPosition?: LabelPosition;
};