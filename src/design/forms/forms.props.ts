// design/forms/forms.props.ts

/**
 * @file Shared prop interface for the forms component category.
 * @module design/forms
 *
 * {@link FormProps} is the base interface that every form control in this
 * category extends. It exposes the four token dimensions from
 * {@link FORM_TOKENS} alongside the accessibility and behavioral props
 * common to all native form elements.
 *
 * **Interface extension chain:**
 * ```
 * BaseComponentProps        class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FormProps                 size, variant, color, radius, disabled, required,
 *        ↑                  invalid, name, fullWidth
 * InputProps                + type, value, placeholder, readonly, minLength, …
 * SelectProps               + value, options, placeholder, multiple (discriminated)
 * CheckboxProps             + checked, indeterminate, value
 * RadioProps                + checked, value
 * FieldProps                + (structural only — no token dimensions)
 * ```
 *
 * **Prop responsibility split:**
 *
 * | Category              | Lives in          | Resolved by                       |
 * |-----------------------|-------------------|-----------------------------------|
 * | Token dimensions      | `FormProps`       | `resolveTokens` in {@link useForm} |
 * | Shared ARIA/behavior  | `FormProps`       | {@link useForm} → attrs            |
 * | Component value types | component props   | component hook                    |
 * | onChange handlers     | component props   | component hook (type varies)       |
 * | Element-specific      | component props   | component hook                    |
 *
 * **What is intentionally NOT in FormProps:**
 * - `value` — type varies: `string` (Input), `boolean` (Checkbox),
 *   `string | string[]` (Select with discriminated union)
 * - `onChange` — event type and value type differ per element
 * - `placeholder` — not valid on Checkbox or Radio
 * - `id` — passes through `...rest` via {@link BaseComponentProps};
 *   no need to redeclare here
 *
 * @see {@link FORM_TOKENS}  in `forms/forms.tokens.ts` — derives the union types
 * @see {@link useForm}      in `forms/forms.hook.ts`   — resolves props to CSS + attrs
 * @see {@link InputProps}   in `forms/input/input.props.ts`    — extends FormProps
 * @see {@link SelectProps}  in `forms/select/select.props.ts`  — extends FormProps
 * @see {@link CheckboxProps} in `forms/checkbox/checkbox.props.ts`
 * @see {@link RadioProps}   in `forms/radio/radio.props.ts`
 * @see {@link FieldProps}   in `forms/field/field.props.ts`    — structural wrapper
 * @see {@link BaseComponentProps} in `shared/base.props.ts`    — parent interface
 *
 * @todo Evaluate `autocomplete` at the category level. It is valid on
 *   `<input>` and `<select>` but not on radio/checkbox. Recommendation:
 *   keep component-level for now; add here only if every form control
 *   ends up needing it.
 */

import type { BaseComponentProps } from "~/shared/base.props";
import type { FormSize, FormVariant, FormColor, FormRadius } from "./forms.tokens";

/**
 * Shared props for all form controls in the `forms` category.
 *
 * Extend this interface in each component's `*.props.ts` file to add
 * component-specific props:
 *
 * @example
 * ```ts
 * // forms/input/input.props.ts
 * import type { FormProps } from "../forms.props";
 *
 * export interface InputProps extends FormProps {
 *   type?:        InputType;
 *   value?:       string;
 *   placeholder?: string;
 *   readonly?:    boolean;
 *   minLength?:   number;
 *   maxLength?:   number;
 * }
 * ```
 *
 * @example
 * ```ts
 * // forms/checkbox/checkbox.props.ts
 * import type { FormProps } from "../forms.props";
 *
 * export interface CheckboxProps extends FormProps {
 *   checked?:       boolean;
 *   indeterminate?: boolean;
 *   value?:         string;  // the form submission value
 *   labelPosition?: "start" | "end" | "top" | "bottom";
 * }
 * ```
 *
 * @see {@link FORM_TOKENS}       — token spec that backs the token props below
 * @see {@link useForm}           — resolves this interface at runtime
 * @see {@link BaseComponentProps} — parent interface (class, v, testId, bg, …)
 */
export type FormBaseProps = BaseComponentProps & {
  // ── Token dimensions ────────────────────────────────────────────────────────
  // These are resolved by resolveTokens(FORM_TOKENS, …, "form") in useForm.
  // Changing a value changes CSS output via --form--* channels or class modifiers.

  /**
   * Overall size tier of the control.
   *
   * A compound prop — a single value drives `font-size`, `padding-block`,
   * `padding-inline`, and `min-height` together via compound-size rules
   * in `forms.css`.
   *
   * Writes the CSS channel `--form--size` which CSS reads via
   * `var(--form--size)` in each compound-size rule.
   *
   * **Size reference (approximate):**
   * - `sm` — 32px height. Compact/dense interfaces.
   * - `md` — 40px height. Default for most forms.
   * - `lg` — 48px height. Comfortable, touch-friendly.
   * - `xl` — 56px height. Hero inputs, large-print contexts.
   *
   * @default `"md"` — applied by {@link useForm}
   * @see `forms.css` — compound size rules
   * @see `css-compound.md` → Size section
   */
  size?: FormSize;

  /**
   * Visual treatment of the control.
   *
   * Emits a BEM class modifier (`form--outlined`, `form--soft`, etc.).
   * All variant-specific styles live in `forms.css`. The same names exist
   * across control and forms categories; visual expression adapts per category.
   *
   * **Variant reference:**
   * - `outlined` — Transparent bg, colored border on focus.
   * - `soft`     — Muted fill bg, light border. Like Material Design "filled".
   * - `solid`    — Color-role–filled bg. High visual weight.
   * - `ghost`    — No border, no background. Minimal chrome.
   * - `dashed`   — Dashed border, transparent bg.
   *
   * @default `"outlined"` — applied by {@link useForm}
   * @see `color-css.md` — which color-step channels each variant reads
   */
  variant?: FormVariant;

  /**
   * Color role for the control's interactive and focus states.
   *
   * Emits a class modifier (`form--primary`, `form--danger`, etc.) AND
   * seven CSS color-step channels written by `resolveColorChannels` in
   * {@link useForm}:
   * ```
   * --form--color-subtle   --form--color-muted    --form--color-base
   * --form--color-vivid    --form--color-deep     --form--color-border
   * --form--color-text
   * ```
   * `forms.css` reads the appropriate channel per variant + state.
   *
   * @default `"primary"` — applied by {@link useForm}
   * @see `color-overview.md` — role descriptions and use cases
   * @see `color-css.md`      — channel-to-variant mapping
   */
  color?: FormColor;

  /**
   * Border-radius of the control.
   *
   * Writes `--form--radius`; `forms.css` reads it as `border-radius`.
   * Shared across Input, Select, Checkbox's custom indicator, and Radio.
   *
   * @default `"md"` — applied by {@link useForm}
   */
  radius?: FormRadius;

  // ── Behavioral / accessibility props ────────────────────────────────────────
  // These are NOT token dimensions. They do not touch resolveTokens.
  // useForm translates them to ARIA attributes and data attributes.
  // Component hooks add native HTML attributes (disabled, required) separately.

  /**
   * The `name` attribute for form submission and accessible association.
   *
   * Forwarded as-is to the native element via `rest`. Required for any control
   * that participates in form submission. Optional here because some uses
   * (e.g. a standalone toggle) do not submit to a form.
   *
   * @remarks
   * Not processed by {@link useForm} — it stays in `rest` and passes through
   * to whatever element the component hook renders. Each component's hook
   * can explicitly pull it out of `rest` if needed for typing purposes.
   */
  name?: string;

  /**
   * Marks the control as non-interactive.
   *
   * {@link useForm} produces:
   * - `aria-disabled="true"` — communicates disabled state to assistive technology
   * - `data-disabled` attribute — hooks CSS state rules in `forms.css`
   *
   * The native `disabled` HTML attribute is added by each **component hook**
   * (not here) because it is only appropriate on native form elements
   * (`<input>`, `<select>`, `<textarea>`), not on structural wrappers.
   *
   * @default `false`
   * @see {@link useForm} — where these attributes are emitted
   */
  disabled?: boolean;

  /**
   * Marks the control as mandatory.
   *
   * {@link useForm} produces:
   * - `aria-required="true"` — communicates required state to assistive technology
   *
   * The native `required` HTML attribute is added by each **component hook**
   * for the same reason as `disabled` — element-specificity.
   *
   * @remarks
   * To show a visual required indicator (`*`) next to the label, pass
   * `required` to the {@link Label} component via its slot in {@link Field}.
   * The prop here does not automatically propagate to the label — that
   * wiring is the consumer's responsibility.
   *
   * @default `false`
   * @see {@link Field} in `forms/field/field.props.ts` — wrapper that
   *   also accepts `required` for coordinating label display
   */
  required?: boolean;

  /**
   * Marks the control as having a validation error.
   *
   * {@link useForm} produces:
   * - `aria-invalid="true"` — communicates invalid state to assistive technology
   *   and browser validation UIs
   * - `data-invalid` attribute — hooks error-state CSS rules in `forms.css`
   *
   * @remarks
   * The error message text itself should live in the `error` slot of a
   * parent {@link Field} component. Field's own `invalid` prop should mirror
   * the control's `invalid` state so the `error` slot is displayed and
   * `aria-describedby` is wired correctly.
   *
   * @example
   * ```astro
   * <Field id="email" invalid={!isValid}>
   *   <Label slot="label" for="email">Email</Label>
   *   <Input id="email" name="email" type="email" invalid={!isValid}
   *          aria-describedby="email-error" />
   *   <span slot="error" id="email-error">Enter a valid email address.</span>
   * </Field>
   * ```
   *
   * @default `false`
   * @see {@link Field} in `forms/field/field.props.ts`
   */
  invalid?: boolean;

  /**
   * Stretches the control to fill its container's inline axis.
   *
   * Emits the `form--full-width` class modifier. `forms.css` sets
   * `width: 100%` on that modifier class. Not a token dimension.
   *
   * @default `false`
   */
  fullWidth?: boolean;
};

export type FormProps = FormBaseProps & (
  | { id: string; "aria-label"?: string; "aria-labelledby"?: string }
  | { "aria-label": string; id?: string; "aria-labelledby"?: string }
  | { "aria-labelledby": string; id?: string; "aria-label"?: string }
);
