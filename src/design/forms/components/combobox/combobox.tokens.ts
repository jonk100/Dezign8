// design/forms/combobox/combobox.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Combobox component.
 * @module design/forms/combobox
 *
 * Combobox introduces no new token dimensions and re-exports {@link FORM_TOKENS}.
 *
 * @remarks
 * **Combobox vs Select:**
 * Select renders a native `<select>` element — the OS/browser controls the
 * dropdown appearance. Combobox renders a text `<input>` + a custom
 * `<ul role="listbox">` dropdown, giving full CSS control over the option
 * list. The trade-off: Combobox requires a client-side JS controller for
 * filtering, keyboard navigation, and selection.
 *
 * **Two-input pattern:**
 * Combobox renders two `<input>` elements:
 * 1. `<input type="text">` (visible) — for display and filtering
 * 2. `<input type="hidden">` — submits the selected option's `value` to the form
 *
 * This separation means the displayed label (e.g. "United States") and the
 * submitted value (e.g. `"us"`) can differ, which is the standard combobox
 * behaviour.
 *
 * **Single-select only:**
 * Multi-select (tag/chip input) is a distinct component with significantly
 * different UX and DOM structure. Combobox is single-select.
 *
 * @see {@link FORM_TOKENS}      in `forms/forms.tokens.ts`
 * @see {@link ComboboxProps}    in `forms/combobox/combobox.props.ts`
 * @see {@link useCombobox}      in `forms/combobox/combobox.hook.ts`
 * @see {@link ComboboxOption}   in `forms/combobox/combobox.props.ts` — shared option type
 *
 * @todo Multi-select (tag input) when needed. New component, new folder —
 *   this file stays unchanged.
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Combobox token spec — re-exports {@link FORM_TOKENS} under a component alias.
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts`
 */
export { FORM_TOKENS as COMBOBOX_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type ComboboxSize    = FormSize;
/** @see {@link FormVariant} */
export type ComboboxVariant = FormVariant;
/** @see {@link FormColor} */
export type ComboboxColor   = FormColor;
/** @see {@link FormRadius} */
export type ComboboxRadius  = FormRadius;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Combobox component.
 *
 * @see {@link useCombobox} in `forms/combobox/combobox.hook.ts`
 */
export const COMBOBOX_DEFAULTS = {
  /** Combobox typically fills its container. */
  fullWidth: true,
} as const;
