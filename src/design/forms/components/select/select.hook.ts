// design/forms/select/select.hook.ts

/**
 * @file Component hook for the Select component.
 * @module design/forms/select
 *
 * {@link useSelect} resolves {@link SelectProps} (a discriminated union) into
 * the attribute objects and computed data that `Select.astro` needs to render
 * a fully accessible, token-resolved select control.
 *
 * **Return shape — three members:**
 *
 * ```
 * { Tag, props }       ← wrapper <div>: visual container with border, bg, radius
 * { selectAttrs }      ← inner <select>: id, name, multiple, disabled, ARIA attrs
 * { resolvedOptions }  ← options array with .selected computed; map in Select.astro
 * { placeholder }      ← forwarded through so Select.astro decides when to render it
 * ```
 *
 * **Wrapper architecture (same as Input):**
 * The `<select>` element lives inside a wrapper `<div>` that carries the
 * visual chrome (border, background, radius, CSS channels). The wrapper
 * enables a custom dropdown-arrow slot (`::after` pseudo or an icon `<div>`)
 * alongside the native `<select>`. With `appearance: none` on the select,
 * the arrow is fully customisable via CSS or a slot.
 *
 * **Handling the discriminated union:**
 * `SelectProps` is `SelectSingleProps | SelectMultiProps`. TypeScript cannot
 * cleanly destructure a union type, so this hook uses an internal cast for
 * the shared property access. The PUBLIC function signature remains correctly
 * typed — callers still get full union type checking at the call site.
 *
 * **`value` → `<option selected>` mapping:**
 * Native `<select>` has no `value` attribute. Selected state is expressed
 * via the `selected` attribute on individual `<option>` elements. The hook
 * computes `selected: boolean` for each option and returns them as
 * {@link ResolvedSelectOption}[]. `Select.astro` maps over this array and
 * sets `selected={opt.selected}` on each rendered `<option>`.
 *
 * **`value` is never in `selectAttrs`:**
 * As a consequence of the above, `value` (string or string[]) is consumed
 * by this hook to compute `resolvedOptions` but is never passed to the
 * `<select>` element's attributes.
 *
 * @see {@link useForm}            in `forms/forms.hook.ts`          — delegated to
 * @see {@link SelectProps}        in `forms/select/select.props.ts` — input type
 * @see {@link ResolvedSelectOption} in `forms/select/select.props.ts`
 * @see {@link SELECT_DEFAULTS}    in `forms/select/select.tokens.ts`
 * @see `forms/select/Select.astro` — consumes this hook's return value
 * @see `forms/select/select.css`   — reads `--form--*` channels emitted here
 *
 * @todo Mirror the Input hook's `@todo` re: separating `formDataAttrs` from
 *   `formAriaAttrs` in {@link useForm}. Once that refactor lands, update
 *   this hook to spread only `formDataAttrs` on the wrapper and route
 *   `formAriaAttrs` to `selectAttrs`.
 *
 * @todo When `SelectOptionGroup` is added (see select.props.ts @todo),
 *   update the `resolvedOptions` computation to handle both flat options
 *   and option groups. The return type would become
 *   `Array<ResolvedSelectOption | ResolvedSelectOptionGroup>`.
 */

import type { SelectProps, SelectOption, ResolvedSelectOption } from "./select.props";
import { useForm }    from "~/forms/forms.hook";
import { composeClass } from "~/shared/base.hook";

// ─── INTERNAL HELPERS ────────────────────────────────────────────────────────

/**
 * Internal base shape used for destructuring {@link SelectProps}.
 *
 * Because `SelectProps` is a discriminated union, TypeScript cannot directly
 * destructure it. This type represents the shared structure of both branches
 * for the purposes of the internal cast. The public API ({@link useSelect}'s
 * parameter) is still correctly typed as `SelectProps`.
 *
 * @internal
 */
type SelectInternalBase = {
  id?:          string;
  name?:        string;
  options:      SelectOption[];
  placeholder?: string;
  multiple?:    boolean;
  value?:       string | string[];
  [key: string]: unknown;
};

/**
 * Computes `selected: boolean` for each option given the current value.
 *
 * @param options   - The full options array from props.
 * @param value     - Current value: `string` (single), `string[]` (multi), or `undefined`.
 * @param isMulti   - Whether the select is in multi-selection mode.
 *
 * @internal
 */
function resolveOptions(
  options:  SelectOption[],
  value:    string | string[] | undefined,
  isMulti:  boolean,
): ResolvedSelectOption[] {
  return options.map(opt => ({
    ...opt,
    selected: isMulti
      ? Array.isArray(value) && value.includes(opt.value)
      : opt.value === value,
  }));
}

// ─── HOOK ────────────────────────────────────────────────────────────────────

/**
 * Resolves {@link SelectProps} into the wrapper props, select element
 * attributes, resolved options list, and placeholder string that
 * `Select.astro` needs.
 *
 * @param props - Full `SelectProps` (either single or multi branch).
 *   TypeScript narrows the `value` type based on the `multiple` discriminant.
 *
 * @returns
 *
 * **`Tag`** — Always `"div"`. Spread `props` onto the wrapper element.
 *
 * **`props`** — Attributes for the outer wrapper `<div>`:
 * - `class` — `"form select form--outlined …"` (token modifiers)
 * - `style` — `"--form--size: …; --form--radius: …; --form--color-base: …;"`
 * - `data-disabled`, `data-invalid` — CSS state hooks
 * - `aria-*` — from `formAttrs` (benign on wrapper; see hook docs `@todo`)
 *
 * **`selectAttrs`** — Attributes for the inner `<select>`:
 * - `id`, `name`
 * - `multiple` — present and `true` in multi mode, absent in single mode
 * - `disabled`, `required` — native HTML attributes
 * - `aria-disabled`, `aria-required`, `aria-invalid`
 *
 * **`resolvedOptions`** — `SelectOption[]` with `selected: boolean` added.
 * Map over this in `Select.astro` to render `<option>` elements.
 *
 * **`placeholder`** — The placeholder string, or `undefined` if not set.
 * `Select.astro` prepends `<option value="" disabled>{placeholder}</option>`
 * when this is truthy.
 *
 * @example
 * ```astro
 * ---
 * // Select.astro
 * import type { SelectProps } from "./select.props";
 * import { useSelect } from "./select.hook";
 * import "./select.css";
 * import "../forms.css";
 *
 * const { Tag, props, selectAttrs, resolvedOptions, placeholder }
 *   = useSelect(Astro.props as SelectProps);
 * ---
 * <Tag {...props}>
 *   {Astro.slots.has("start") && (
 *     <div class="select__start"><slot name="start" /></div>
 *   )}
 *   <select {...selectAttrs}>
 *     {placeholder && (
 *       <option value="" disabled>{placeholder}</option>
 *     )}
 *     {resolvedOptions.map(opt => (
 *       <option
 *         value={opt.value}
 *         selected={opt.selected || undefined}
 *         disabled={opt.disabled || undefined}
 *       >
 *         {opt.label}
 *       </option>
 *     ))}
 *   </select>
 *   <div class="select__arrow" aria-hidden="true">▾</div>
 * </Tag>
 * ```
 *
 * @see {@link useForm}             — handles token resolution and shared ARIA
 * @see {@link resolveOptions}      — computes `.selected` per option
 * @see {@link ResolvedSelectOption} — type of items in `resolvedOptions`
 */
export function useSelect(props: SelectProps) {
  // ── Determine mode and raw value ────────────────────────────────────────
  //
  // Read `multiple` and `value` before destructuring to preserve union narrowing.
  // After the isMulti check, TypeScript knows which branch of the union is active.
  const isMulti  = props.multiple === true;
  const rawValue = props.value as string | string[] | undefined;

  // ── Destructure shared props via internal cast ───────────────────────────
  //
  // SelectProps is a discriminated union — TypeScript cannot cleanly destructure
  // it directly. We cast to the internal base shape for destructuring only.
  // The PUBLIC parameter is still typed as SelectProps; this cast is internal.
  //
  // `id`, `name`, `options`, `placeholder` are pulled before useForm so:
  //   - id, name   → routed to selectAttrs (must be on the <select>, not wrapper)
  //   - options    → consumed here for resolvedOptions (never goes to useForm)
  //   - placeholder → forwarded in return (consumed by Select.astro)
  //   - multiple   → consumed here (becomes selectAttrs.multiple)
  //   - value      → consumed here (drives resolvedOptions)
  const {
    id,
    name,
    options,
    placeholder,
    multiple:  _multiple,   // consumed above as isMulti; discard from formProps
    value:     _value,      // consumed above as rawValue; discard from formProps
    icon,
    ...formProps
  } = props as unknown as SelectInternalBase;

  // ── Delegate shared resolution to useForm ────────────────────────────────
  const {
    formClass, formStyle, formAttrs,
    disabled, required, invalid,
    rest,
  } = useForm(formProps as unknown as Parameters<typeof useForm>[0]);

  // ── Resolve options with selected state ─────────────────────────────────
  //
  // Each option gets `selected: boolean` added. Select.astro maps this
  // array and sets `selected={opt.selected || undefined}` on each <option>.
  // Using `|| undefined` ensures the `selected` attribute is absent (not
  // `selected="false"`) when the option is not selected.
  const resolvedOptions = resolveOptions(options, rawValue, isMulti);

  // ── Wrapper props ────────────────────────────────────────────────────────
  //
  // Same pattern as Input: the wrapper <div> carries the visual chrome.
  // formAttrs includes data-* (CSS state) and aria-* (benign on wrapper).
  const wrapperProps = {
    class: composeClass(formClass, "select"),
    style: formStyle,
    ...formAttrs,
    ...rest,
  };

  // ── Select element attrs ─────────────────────────────────────────────────
  //
  // The inner <select> receives semantic, functional, and ARIA attributes.
  // `value` is intentionally absent — selected state is on <option> elements.
  // `multiple` uses `|| undefined` so the attribute is absent on single-select.
  const selectAttrs = {
    id,
    name,
    multiple:        isMulti   || undefined,
    disabled:        disabled  || undefined,
    required:        required  || undefined,
    "aria-required": required  ? "true" as const : undefined,
    "aria-invalid":  invalid   ? "true" as const : undefined,
  };

  return {
    Tag:             "div" as const,
    props:           wrapperProps,
    selectAttrs,
    resolvedOptions,
    placeholder,
  };
}