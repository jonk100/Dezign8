// design/forms/select/select.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Select component.
 * @module design/forms/select
 *
 * Select introduces no new token dimensions — it inherits the full
 * {@link FORM_TOKENS} spec unchanged and follows the **re-export pattern**.
 *
 * @remarks
 * **Single component, two modes:**
 * `Select` handles both single-value and multi-value selection via a
 * discriminated union on the `multiple` prop (see {@link SelectProps}).
 * There is no separate `Multiselect` component. The token spec is
 * identical for both modes — only the native `multiple` attribute and
 * the `value` type differ. This is the one component in the forms
 * category whose props file exports a union type rather than a plain
 * interface.
 *
 * **Options as props, not slots:**
 * Unlike `Input`, `Select` must render `<option>` elements itself.
 * Native `<select>` only accepts `<option>` and `<optgroup>` as children;
 * Astro named slots cannot be placed inside it. Options are therefore
 * passed as a structured prop (`options: SelectOption[]`) and the hook
 * returns a `resolvedOptions` array (with `selected: boolean` computed)
 * for `Select.astro` to map over.
 *
 * **Architecture position:**
 * ```
 * forms/forms.tokens.ts        FORM_TOKENS, FormSize, FormVariant, …
 *        ↑  re-export
 * forms/select/select.tokens.ts   SELECT_TOKENS (alias), SELECT_DEFAULTS
 *        ↑
 * forms/select/select.props.ts    SelectOption, SelectProps (union)
 * forms/select/select.hook.ts     useSelect
 * ```
 *
 * @see {@link FORM_TOKENS}    in `forms/forms.tokens.ts`         — source spec
 * @see {@link SelectProps}    in `forms/select/select.props.ts`  — prop surface
 * @see {@link useSelect}      in `forms/select/select.hook.ts`   — runtime resolution
 * @see {@link SELECT_DEFAULTS} — default values applied when props are omitted
 *
 * @todo Add `optgroup` support: extend {@link SelectOption} to allow
 *   `SelectOptionGroup = { label: string; options: SelectOption[] }`,
 *   update the `options` prop type in {@link SelectProps} to
 *   `Array<SelectOption | SelectOptionGroup>`, and update the rendering
 *   in `Select.astro`. The hook needs no change — group detection
 *   and `<optgroup>` rendering is a template concern.
 *
 * @todo If Select ever needs a new dimension (e.g. `rows` for a visible
 *   count on native `<select size="N">`, which is distinct from the token
 *   `size` dimension), switch to `composeTokens(FORM_TOKENS, { … })`.
 *   The native `size` attribute conflict must be handled carefully —
 *   use a different prop name (e.g. `visibleRows`) to avoid collision
 *   with the token `size` dimension.
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~/forms/forms.tokens";

// ─── SPEC ────────────────────────────────────────────────────────────────────

/**
 * Select token spec — re-exports {@link FORM_TOKENS} under a component-scoped
 * alias. Provides a stable import path so future extension via `composeTokens`
 * only requires changing this file.
 *
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts` — the actual spec object
 */
export { FORM_TOKENS as SELECT_TOKENS } from "~/forms/forms.tokens";

// ─── TYPE ALIASES ────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type SelectSize    = FormSize;
/** @see {@link FormVariant} */
export type SelectVariant = FormVariant;
/** @see {@link FormColor} */
export type SelectColor   = FormColor;
/** @see {@link FormRadius} */
export type SelectRadius  = FormRadius;

// ─── DEFAULTS ────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Select component.
 *
 * Only props specific to Select that differ from the category defaults
 * (applied inline by {@link useForm}) are declared here.
 *
 * Note: `options` and `value` have no defaults — `options` is required,
 * and `value` being absent represents the uncontrolled/no-selection state.
 *
 * @see {@link useSelect} in `forms/select/select.hook.ts` — where these are consumed
 */
export const SELECT_DEFAULTS = {
  /** Whether the select stretches to fill its container's inline axis. */
  fullWidth: false,
} as const;