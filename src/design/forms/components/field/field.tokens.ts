// design/forms/field/field.tokens.ts

/**
 * @file Token spec and defaults for the Field component.
 * @module design/forms/field
 *
 * Field introduces no token dimensions of its own. It is a structural
 * wrapper — its job is spatial layout (stacking label, control, hint,
 * error, success) and accessibility id wiring, not visual styling.
 *
 * This file re-exports {@link FORM_TOKENS} to maintain a consistent
 * import path across the component quadruplet (tokens → props → hook → astro).
 * If Field ever needs a dimension (e.g. a `gap` prop to control spacing
 * between label and control), this file is the only change point.
 *
 * @remarks
 * **What Field is NOT:**
 * Field is not a form control. It does not extend {@link FormProps} because
 * it never renders an `<input>`, `<select>`, or `<textarea>`. Its `invalid`
 * and `required` props are state-communication props (they add `data-*`
 * attributes that CSS and the Astro template respond to) rather than
 * ARIA props that belong on a native form element.
 *
 * **Accessibility wiring:**
 * Field accepts an `id` prop and uses it to generate stable IDs for its
 * hint and error wrapper elements (`{id}-hint`, `{id}-error`). The consumer
 * is responsible for passing the same `id` to the control inside the default
 * slot and setting `aria-describedby="{id}-hint {id}-error"` on it.
 * Field cannot wire this automatically because Astro slots do not support
 * passing runtime values into slotted content at render time.
 *
 * @see {@link FieldProps}  in `forms/field/field.props.ts`  — prop surface
 * @see {@link useField}    in `forms/field/field.hook.ts`   — runtime logic
 * @see `forms/field/Field.astro`                             — slot structure
 *
 * @todo If a `gap` prop is needed to control spacing between field sections,
 *   add `gap: GAP` to a `composeTokens(FORM_TOKENS, { gap: GAP })` here
 *   and update {@link useField} to resolve it.
 */

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Field token spec — re-exports {@link FORM_TOKENS} under a component alias.
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts`
 */
export { FORM_TOKENS as FIELD_TOKENS } from "~f/forms.tokens";