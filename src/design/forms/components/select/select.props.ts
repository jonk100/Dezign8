// design/forms/select/select.props.ts

/**
 * @file Prop types for the Select component.
 * @module design/forms/select
 *
 * This file exports three public surfaces:
 * - {@link SelectOption}         — shape of a single item in the options list
 * - {@link ResolvedSelectOption} — option with `selected` computed; used by `Select.astro`
 * - {@link SelectProps}          — discriminated union for single vs multi-select
 *
 * **Discriminated union:**
 * `SelectProps` is a union of two interfaces, discriminated by `multiple`:
 *
 * ```
 * multiple?: false  →  SelectSingleProps  →  value?: string
 * multiple:  true   →  SelectMultiProps   →  value?: string[]
 * ```
 *
 * This gives callers precise type checking: passing `value={["a", "b"]}`
 * on a single select is a TypeScript error. The union collapses to a
 * single component and a single hook — no `Multiselect` file exists.
 *
 * **Why the internal shapes are not exported:**
 * `SelectSingleProps` and `SelectMultiProps` are implementation details.
 * Consumers use `SelectProps` exclusively. Exposing the internals would
 * allow coupling to one branch of the union, making future changes harder.
 *
 * **Options as props:**
 * `<option>` elements must be children of `<select>` in the DOM. Because
 * Astro slots cannot be placed inside a `<select>` element, options are
 * passed as `SelectOption[]` and `Select.astro` renders them by mapping
 * over the `resolvedOptions` returned by {@link useSelect}.
 *
 * @see {@link FormProps}      in `forms/forms.props.ts`         — parent interface
 * @see {@link useSelect}      in `forms/select/select.hook.ts`  — resolves these props
 * @see {@link SELECT_DEFAULTS} in `forms/select/select.tokens.ts`
 *
 * @todo Add `SelectOptionGroup` type for `<optgroup>` support:
 *   ```ts
 *   export interface SelectOptionGroup {
 *     label:    string;
 *     options:  SelectOption[];
 *     disabled?: boolean;
 *   }
 *   ```
 *   Then change the `options` prop to
 *   `Array<SelectOption | SelectOptionGroup>`. The hook stays unchanged;
 *   `Select.astro` checks `"options" in item` to decide whether to render
 *   an `<optgroup>` or a plain `<option>`.
 */

import type { FormProps } from "~/forms/forms.props";

// ─── OPTION TYPES ─────────────────────────────────────────────────────────────

/**
 * A single selectable option within a {@link SelectProps.options} list.
 *
 * Rendered as a native `<option>` element by `Select.astro`. The `value`
 * is what gets submitted with the form; `label` is what the user sees.
 *
 * @example
 * ```ts
 * const countries: SelectOption[] = [
 *   { value: "us", label: "United States" },
 *   { value: "uk", label: "United Kingdom" },
 *   { value: "ca", label: "Canada", disabled: true },
 * ];
 * ```
 */
export interface SelectOption {
  /** The value submitted with the form on selection. Must be unique in the list. */
  value:     string;
  /** The human-readable text displayed in the dropdown. */
  label:     string;
  /** When `true`, the option is visible but not selectable. @default false */
  disabled?: boolean;
}

/**
 * A {@link SelectOption} with `selected` resolved against the current value.
 *
 * Returned as part of {@link useSelect}'s output. `Select.astro` maps over
 * this array to render `<option selected>` on the correct item(s) without
 * having to re-derive selection state in the template.
 *
 * @remarks
 * The `selected` field is `true` when:
 * - Single select: `option.value === props.value`
 * - Multi select: `props.value.includes(option.value)`
 *
 * @see {@link useSelect} — where `selected` is computed
 */
export type ResolvedSelectOption = SelectOption & {
  /**
   * Whether this option is currently selected, derived from the
   * component's `value` prop by {@link useSelect}.
   */
  selected: boolean;
};

// ─── INTERNAL UNION BRANCHES ─────────────────────────────────────────────────
// Not exported — consumers use SelectProps (the union). These are internal
// to allow TypeScript to narrow value type by the multiple discriminant.

/**
 * Shared props for both select modes.
 * Not exported — use {@link SelectProps}.
 */
type SelectBaseProps = FormProps & {
  options: SelectOption[];
  placeholder?: string;
  id?: string;
};

/**
 * Props for single-selection mode. `multiple` is absent or `false`.
 * Not exported — use {@link SelectProps}.
 */
interface SelectSingleProps extends SelectBaseProps {
  /**
   * Absent or explicitly `false` selects single-value mode.
   * Renders a standard `<select>` element.
   */
  multiple?: false;

  /**
   * The currently selected value.
   *
   * Must be one of the `value` strings in the `options` array for the
   * correct `<option>` to receive the `selected` attribute. When
   * `undefined`, no option is pre-selected (the browser shows the first
   * option or the `placeholder` if provided).
   */
  value?: string;
}

/**
 * Props for multi-selection mode. `multiple` must be exactly `true`.
 * Not exported — use {@link SelectProps}.
 */
interface SelectMultiProps extends SelectBaseProps {
  /**
   * `true` enables multi-selection mode.
   * Renders `<select multiple>` — the user can select multiple options
   * via Shift+click or Ctrl/Cmd+click.
   *
   * @remarks
   * Native `<select multiple>` renders as a scrollable list box, not a
   * dropdown. Styling it consistently across browsers requires CSS reset
   * (`appearance: none`) plus custom height/scroll rules in `select.css`.
   * For a more controlled multi-select dropdown UX, prefer a future
   * `Combobox` component with `multiple` support.
   */
  multiple: true;

  /**
   * The currently selected values — an array of option value strings.
   *
   * Every string in this array that matches an option's `value` will
   * receive `selected` on its `<option>` element. An empty array or
   * `undefined` means nothing is selected.
   */
  value?: string[];
}

// ─── PUBLIC UNION TYPE ───────────────────────────────────────────────────────

/**
 * Props for the `<Select>` component.
 *
 * A discriminated union on `multiple`. TypeScript narrows the `value`
 * type automatically based on which branch is active:
 *
 * ```ts
 * // Single-select — value is string | undefined
 * <Select name="country" options={countries} value="us" />
 *
 * // Multi-select — value is string[] | undefined
 * <Select name="tags" options={tags} multiple value={["ts", "astro"]} />
 *
 * // Type error — array value on single select
 * <Select name="x" options={[]} value={["a", "b"]} />
 * //                             ^^^^^^^^^^^^^^^^^ TS error
 * ```
 *
 * @see {@link SelectSingleProps} — single-select branch (internal)
 * @see {@link SelectMultiProps}  — multi-select branch (internal)
 * @see {@link SelectOption}      — shape of each option in `options`
 * @see {@link useSelect}         — resolves these props at runtime
 */
export type SelectProps = SelectSingleProps | SelectMultiProps;