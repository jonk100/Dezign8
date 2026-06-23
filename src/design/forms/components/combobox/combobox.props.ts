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
export type { SelectOption as ComboboxOption };

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
export interface ComboboxProps extends FormProps {
  /**
   * The `id` placed on the visible text `<input>`.
   *
   * Enables `<label for="…">` association and `aria-describedby` wiring.
   * Also used to generate the listbox id (`{id}-listbox`) and option ids
   * (`{id}-listbox-{index}`). When omitted, a random suffix is generated.
   */
  id?: string;

  /**
   * The list of selectable options.
   *
   * Rendered as `<li role="option">` elements inside the listbox.
   * Options are filtered client-side by the JS controller as the user types.
   * All options are present in the SSR HTML (hidden via the listbox's initial
   * state) — no server round-trip is needed for filtering.
   *
   * @see {@link SelectOption} for the option shape
   *
   * @todo Optgroup support: extend to `Array<ComboboxOption | ComboboxOptionGroup>`
   *   when needed. The JS controller and Combobox.astro would handle grouping.
   */
  options: SelectOption[];

  /**
   * The currently selected option's `value` string.
   *
   * On SSR, this determines which option is pre-selected and populates the
   * text input with the matching option's `label`. On the client, the JS
   * controller updates the hidden input's value on selection.
   */
  value?: string;

  /**
   * Placeholder text shown in the text input when no option is selected.
   *
   * @example `"Select a country…"`
   */
  placeholder?: string;

  /**
   * Whether filtering is case-sensitive.
   *
   * When `false` (default), `"united"` matches `"United States"`.
   * The JS controller reads `data-case-sensitive` on the wrapper.
   *
   * @default false
   */
  caseSensitive?: boolean;
}
