// design/forms/input/input.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Input component.
 * @module design/forms/input
 *
 * Input introduces no new token dimensions — it inherits the full
 * {@link FORM_TOKENS} spec unchanged. This file therefore follows the
 * **re-export pattern**: it aliases the category spec and types, adds
 * Input-specific constant lists ({@link INPUT_TYPES}), and declares
 * the component defaults ({@link INPUT_DEFAULTS}).
 *
 * **Why this file exists even though it adds nothing to the spec:**
 * Consistent import paths across the component quadruplet (`tokens`,
 * `props`, `hook`, `*.astro`) mean no file ever has to reach up into
 * the category to import defaults or types. If Input later needs a new
 * dimension (e.g. a `prefix`/`suffix` layout mode), this file is the
 * only change point — no import churn elsewhere.
 *
 * **Architecture position:**
 * ```
 * forms/forms.tokens.ts      FORM_TOKENS, FormSize, FormVariant, …
 *        ↑  re-export
 * forms/input/input.tokens.ts   INPUT_TOKENS (alias), INPUT_TYPES,
 *                                INPUT_DEFAULTS
 *        ↑  import types
 * forms/input/input.props.ts
 * forms/input/input.hook.ts
 * ```
 *
 * @see {@link FORM_TOKENS}    in `forms/forms.tokens.ts` — source spec
 * @see {@link InputProps}     in `forms/input/input.props.ts` — prop surface
 * @see {@link useInput}       in `forms/input/input.hook.ts` — runtime resolution
 * @see {@link INPUT_DEFAULTS} — default values applied when props are omitted
 *
 * @todo If Input ever needs a dimension not in FORM_TOKENS (e.g. `resize`
 *   for a multiline mode, or a layout dimension for prefix/suffix slots),
 *   switch from re-export to `composeTokens(FORM_TOKENS, { … })` here.
 *   No other files change except `input.hook.ts` (which would call
 *   `resolveTokens` on `INPUT_TOKENS` directly instead of delegating
 *   entirely to {@link useForm}).
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~/forms/forms.tokens";

// ─── SPEC ────────────────────────────────────────────────────────────────────

/**
 * Input token spec — re-exports {@link FORM_TOKENS} under a component-scoped
 * alias. The `INPUT_TOKENS` name is used by {@link useInput} in case a future
 * extension is needed (swap re-export for `composeTokens` without touch
 * anywhere else).
 *
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts` — the actual spec object
 */
export { FORM_TOKENS as INPUT_TOKENS } from "~/forms/forms.tokens";

// ─── TYPE ALIASES ────────────────────────────────────────────────────────────
// Re-export category types under Input-specific names.
// Consumers of InputProps import from here, not from forms.tokens.ts directly.

/** @see {@link FormSize} */
export type InputSize    = FormSize;
/** @see {@link FormVariant} */
export type InputVariant = FormVariant;
/** @see {@link FormColor} */
export type InputColor   = FormColor;
/** @see {@link FormRadius} */
export type InputRadius  = FormRadius;

// ─── COMPONENT CONSTANTS ─────────────────────────────────────────────────────

/**
 * The set of `type` values that `<Input>` supports.
 *
 * @remarks
 * This list covers text-entry input types only. Specialised types that
 * require distinct component behaviour — or are better served by a
 * dedicated component — are intentionally excluded:
 *
 * | Excluded type       | Recommended component          |
 * |---------------------|-------------------------------|
 * | `date`              | `DatePicker`                  |
 * | `time`              | `TimePicker`                  |
 * | `datetime-local`    | `DatePicker` (with time)      |
 * | `color`             | `ColorPicker`                 |
 * | `file`              | `FileUpload`                  |
 * | `range`             | `Slider`                      |
 * | `checkbox`          | `Checkbox`                    |
 * | `radio`             | `Radio`                       |
 * | `hidden`            | Use a plain `<input>` element |
 * | `button` / `submit` | `Button`                      |
 *
 * @see {@link InputType} — the union derived from this array
 *
 * @todo Add `"month"` and `"week"` if native date pickers are wanted
 *   before dedicated picker components are built. CSS-only, no other changes.
 */
export const INPUT_TYPES = [
  "text",
  "email",
  "password",
  "tel",
  "url",
  "number",
  "search",
] as const;

/**
 * Valid `type` attribute values for the Input component.
 * Derived from {@link INPUT_TYPES} — never hand-written.
 */
export type InputType = typeof INPUT_TYPES[number];

// ─── DEFAULTS ────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Input component.
 *
 * Only props **specific to Input** that differ from the category defaults
 * (which live inline in {@link useForm}) are declared here. There is no
 * point duplicating `size: "md"` or `variant: "outlined"` — those are
 * already applied by the category hook.
 *
 * Applied in {@link useInput} via destructuring defaults:
 * ```ts
 * const { type = INPUT_DEFAULTS.type, fullWidth = INPUT_DEFAULTS.fullWidth, … } = props;
 * ```
 * so consumer-supplied values always win.
 *
 * @see {@link useInput} in `forms/input/input.hook.ts` — where these are consumed
 */
export const INPUT_DEFAULTS = {
  /** Native `type` attribute. `"text"` covers the broadest single-line use. */
  type:      "text"  as InputType,
  /** Whether the input stretches to fill its container's inline axis. */
  fullWidth: false,
} as const;