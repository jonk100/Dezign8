// design/forms/radio/radio.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Radio component.
 * @module design/forms/radio
 *
 * Radio introduces no new token dimensions and follows the re-export pattern.
 *
 * @remarks
 * **No RadioGroup yet.**
 * In a full implementation, a `RadioGroup` component would own the `name`
 * attribute and the selected `value`, with individual `Radio` components
 * serving as the visual options. For now, `Radio` is a standalone component
 * — consumers manage grouping manually by sharing the same `name` across
 * instances. A `RadioGroup` can be added as a sibling component later
 * without changing this file.
 *
 * **Default variant is `"ghost"`**, not `"outlined"`.
 * Same reasoning as {@link CHECKBOX_DEFAULTS}: the traditional radio button
 * has no border or background on the wrapper. `variant="outlined"` produces
 * a bordered "option card" style.
 *
 * **`labelPosition` is not a token dimension.**
 * Emitted as a direct class modifier in {@link useRadio}.
 * Shared concept with {@link CheckboxProps.labelPosition} — both use the
 * same `LabelPosition` type, declared locally in each component to avoid
 * cross-component imports. If a third component needs it, promote to
 * `forms.tokens.ts`.
 *
 * @see {@link FORM_TOKENS}  in `forms/forms.tokens.ts` — source spec
 * @see {@link RadioProps}   in `forms/radio/radio.props.ts`
 * @see {@link useRadio}     in `forms/radio/radio.hook.ts`
 * @see `forms/radio/radio.css` — circular indicator styles, layout modifiers
 *
 * @todo Add `RadioGroup` component in `forms/radio-group/` when needed.
 *   RadioGroup would own `name`, `value` (selected option), and `onChange`.
 *   Individual `Radio` components inside a RadioGroup would receive their
 *   `name` and `checked` state via HTML (or a client-side group manager).
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Radio token spec — re-exports {@link FORM_TOKENS} under a component alias.
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts`
 */
export { FORM_TOKENS as RADIO_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type RadioSize    = FormSize;
/** @see {@link FormVariant} */
export type RadioVariant = FormVariant;
/** @see {@link FormColor} */
export type RadioColor   = FormColor;
/** @see {@link FormRadius} */
export type RadioRadius  = FormRadius;

// ─── LABEL POSITION ───────────────────────────────────────────────────────────

/**
 * Valid positions for the label slot relative to the radio indicator circle.
 *
 * Declared locally (same values as in `checkbox.tokens.ts`) to avoid
 * cross-component imports. If a third component needs this, promote to
 * `forms.tokens.ts`.
 *
 * @remarks
 * - `"end"`    — `(●) Label` — circle left, label right (default)
 * - `"start"`  — `Label (●)` — label left, circle right
 * - `"top"`    — Label above circle
 * - `"bottom"` — circle above label
 *
 * CSS uses `flex-direction` / `order` for visual reordering.
 * DOM order is always: `hidden input → indicator → label slot`.
 */
export const LABEL_POSITIONS = ["end", "start", "top", "bottom"] as const;

/** Valid values for the `labelPosition` prop. */
export type LabelPosition = typeof LABEL_POSITIONS[number];

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Radio component.
 *
 * `variant` defaults to `"ghost"` and is applied inline in {@link useRadio}
 * before delegating to {@link useForm}, not declared here.
 *
 * @see {@link useRadio} — where `variant: "ghost"` is the default
 */
export const RADIO_DEFAULTS = {
  /** Label appears to the right of the indicator circle. */
  labelPosition: "end" as LabelPosition,
} as const;