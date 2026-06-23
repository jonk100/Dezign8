// design/forms/checkbox/checkbox.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Checkbox component.
 * @module design/forms/checkbox
 *
 * Checkbox introduces no new token dimensions and follows the re-export pattern.
 *
 * @remarks
 * **Three-state check model via {@link CheckState}:**
 * Rather than separate `checked: boolean` and `indeterminate: boolean` props
 * (which can conflict when both are `true`), Checkbox uses a single
 * `checkState` prop typed as `"checked" | "unchecked" | "indeterminate"`.
 * This makes the three states mutually exclusive by type and maps cleanly
 * to the select-all checkbox pattern:
 *
 * ```ts
 * const state: CheckState =
 *   allSelected  ? "checked"       :
 *   noneSelected ? "unchecked"     :
 *                  "indeterminate";
 * ```
 *
 * `undefined` and `"unchecked"` are treated identically in {@link useCheckbox}.
 *
 * **Default variant is `"ghost"`** — traditional checkbox appearance with no
 * border/background on the wrapper. Pass `variant="outlined"` or `variant="soft"`
 * for a bordered/filled "selectable chip" style.
 *
 * **`labelPosition` is not a token dimension** — it emits a class modifier
 * directly in {@link useCheckbox}.
 *
 * @see {@link FORM_TOKENS}    in `forms/forms.tokens.ts`
 * @see {@link CheckboxProps}  in `forms/checkbox/checkbox.props.ts`
 * @see {@link useCheckbox}    in `forms/checkbox/checkbox.hook.ts`
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

export { FORM_TOKENS as CHECKBOX_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type CheckboxSize    = FormSize;
/** @see {@link FormVariant} */
export type CheckboxVariant = FormVariant;
/** @see {@link FormColor} */
export type CheckboxColor   = FormColor;
/** @see {@link FormRadius} */
export type CheckboxRadius  = FormRadius;

// ─── CHECK STATE ──────────────────────────────────────────────────────────────

/**
 * The three mutually exclusive visual states of a checkbox.
 *
 * Replaces the separate `checked: boolean` and `indeterminate: boolean` props
 * that could otherwise conflict when both are `true`.
 *
 * | Value             | Native mapping                                        |
 * |-------------------|-------------------------------------------------------|
 * | `"checked"`       | `checked` attribute present on `<input>`              |
 * | `"unchecked"`     | `checked` attribute absent (default)                  |
 * | `"indeterminate"` | `checked` absent + `.indeterminate = true` via script |
 *
 * `undefined` is treated identically to `"unchecked"` in {@link useCheckbox}.
 *
 * @example
 * ```ts
 * // Driven by a select-all parent:
 * const checkState: CheckState =
 *   selected.length === options.length ? "checked"       :
 *   selected.length === 0             ? "unchecked"     :
 *                                       "indeterminate";
 *
 * <Checkbox name="all" checkState={checkState}>Select all</Checkbox>
 * ```
 */
export const CHECK_STATES = ["checked", "unchecked", "indeterminate"] as const;

/** Valid values for the `checkState` prop. */
export type CheckState = typeof CHECK_STATES[number];

// ─── LABEL POSITION ───────────────────────────────────────────────────────────

/**
 * Valid positions for the label slot relative to the indicator.
 * CSS reorders visually via flex-direction — DOM order never changes.
 */
export const LABEL_POSITIONS = ["end", "start", "top", "bottom"] as const;

/** Valid values for the `labelPosition` prop. */
export type LabelPosition = typeof LABEL_POSITIONS[number];

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Checkbox component.
 *
 * `variant` is not declared here — its default (`"ghost"`) is applied
 * inline in {@link useCheckbox} before delegating to {@link useForm}.
 *
 * @see {@link useCheckbox}
 */
export const CHECKBOX_DEFAULTS = {
  checkState:    "unchecked" as CheckState,
  labelPosition: "end"       as LabelPosition,
} as const;