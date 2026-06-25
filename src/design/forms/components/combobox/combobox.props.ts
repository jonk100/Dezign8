// design/forms/combobox/combobox.props.ts

/**
 * @file Prop types for the Combobox component.
 * @module design/forms/combobox
 *
 * Combobox shares {@link SelectOption} with Select — the same option shape
 * (value, label, disabled) applies to both. Importing from Select's props
 * file crosses a component boundary, so {@link SelectOption} is re-exported
 * here under a local alias for clean import paths.
 *
 * @see {@link FormProps}          in `forms/forms.props.ts`           — parent
 * @see {@link SelectOption}       in `forms/select/select.props.ts`   — re-exported
 * @see {@link COMBOBOX_DEFAULTS}  in `forms/combobox/combobox.tokens.ts`
 * @see {@link useCombobox}        in `forms/combobox/combobox.hook.ts`
 */

import type { FormProps }    from "~f/forms.props";
import type { SelectOption } from "../select/select.props";

// ─── RE-EXPORT ────────────────────────────────────────────────────────────────

/**
 * A selectable option in the Combobox dropdown.
 * Re-exported from {@link SelectOption} for local import convenience.
 *
 * @see {@link SelectOption} in `forms/select/select.props.ts`
 */
export type ComboboxOption = SelectOption;

// ─── PROPS ────────────────────────────────────────────────────────────────────

/**
 * Props for the `<Combobox>` component.
 *
 * @example
 * ```astro
 * <!-- Basic -->
 * <Combobox
 *   name="country"
 *   placeholder="Select a country…"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" },
 *   ]}
 * />
 *
 * <!-- Controlled (pre-selected value) -->
 * <Combobox name="role" value="editor" options={roles} />
 *
 * <!-- Inside a Field -->
 * <Field id="country">
 *   <Label slot="label" for="country">Country</Label>
 *   <Combobox
 *     id="country"
 *     name="country"
 *     options={countries}
 *     aria-describedby="country-hint"
 *   />
 *   <span slot="hint" id="country-hint">Start typing to filter.</span>
 * </Field>
 * ```
 */
export type ComboboxProps = FormProps & {
  id?: string;
  options: ComboboxOption[];
  value?: string;
  placeholder?: string;
  caseSensitive?: boolean;
};
