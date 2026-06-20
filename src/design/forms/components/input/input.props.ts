// design/forms/input/input.props.ts

/**
 * @file Prop interface for the Input component.
 * @module design/forms/input
 *
 * {@link InputProps} extends {@link FormProps} with the props unique to a
 * single-line text input. All token dimensions, ARIA/behavior props, and
 * base component props are inherited — only Input-specific additions live here.
 *
 * **Full prop inheritance chain:**
 * ```
 * BaseComponentProps       class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FormProps                size, variant, color, radius,
 *        ↑                 disabled, required, invalid, name, fullWidth
 * InputProps               id, type, value, placeholder, readonly,
 *                          minLength, maxLength, pattern, autocomplete
 * ```
 *
 * **Slot props (not declared here — handled by Input.astro):**
 * - `start` slot — leading content: icon, flag, currency prefix, area code
 * - `end` slot   — trailing content: reveal-password toggle, clear button, unit
 *
 * These are Astro named slots, not TypeScript props. They cannot be typed
 * in `InputProps` — document them in `Input.astro`'s component comment.
 *
 * **What is intentionally NOT in InputProps:**
 * - `onChange` — server-rendered Astro components handle change events via
 *   native browser events or framework-specific progressive enhancement.
 *   A client-side `onChange` prop is out of scope for the server-rendered layer.
 * - `step`, `min`, `max` — valid on `type="number"` only. Passed through
 *   `rest` as plain HTML attributes. No explicit declaration needed.
 * - `accept` — valid on `type="file"` only, and file is excluded from
 *   {@link INPUT_TYPES}.
 *
 * @see {@link FormProps}       in `forms/forms.props.ts`       — parent interface
 * @see {@link InputType}       in `forms/input/input.tokens.ts` — allowed type values
 * @see {@link INPUT_DEFAULTS}  in `forms/input/input.tokens.ts` — default values
 * @see {@link useInput}        in `forms/input/input.hook.ts`   — runtime resolution
 *
 * @todo If a `label` slot is desired directly on Input (bypassing Field),
 *   add `label?: string` here as a shorthand — hook renders it as a
 *   `<label>` inside the wrapper. Not recommended: prefer the {@link Field}
 *   + {@link Label} composition for full accessibility control.
 */

import type { FormProps }   from "~/forms/forms.props";
import type { InputType }   from "./input.tokens";

/**
 * Props for the `<Input>` component.
 *
 * Extends {@link FormProps} which extends {@link BaseComponentProps}.
 * All inherited props are available without redeclaration.
 *
 * @example
 * ```astro
 * <!-- Minimal: type defaults to "text", size to "md", variant to "outlined" -->
 * <Input name="first-name" placeholder="First name" />
 *
 * <!-- Full example inside a Field -->
 * <Field id="email" invalid={!emailValid}>
 *   <Label slot="label" for="email" required>Email address</Label>
 *   <Input
 *     id="email"
 *     name="email"
 *     type="email"
 *     value={emailValue}
 *     size="lg"
 *     variant="outlined"
 *     color="primary"
 *     invalid={!emailValid}
 *     aria-describedby="email-error"
 *     fullWidth
 *   >
 *     <span slot="start">✉</span>
 *   </Input>
 *   <span slot="error" id="email-error">Enter a valid email address.</span>
 * </Field>
 * ```
 *
 * @see {@link FormProps}      — inherited token dimensions and behavior props
 * @see {@link INPUT_DEFAULTS} — which props have defaults and what they are
 * @see {@link useInput}       — hook that resolves these props to HTML attributes
 */
export interface InputProps extends FormProps {
  /**
   * The `id` attribute for the `<input>` element.
   *
   * Critical for accessibility: a `<label>` must reference this `id` via
   * its `for` attribute, and `aria-describedby` on this element must
   * reference hint/error element IDs.
   *
   * In {@link useInput}, `id` is routed to `inputAttrs` (the inner
   * `<input>`) rather than the wrapper `<div>`, because `<label for="…">`
   * must match the ID of the actual control element.
   *
   * @remarks
   * When using {@link Field}, pass the same `id` to both `<Field>` and
   * `<Input>`. Field uses it to generate `id="{id}-hint"`, `id="{id}-error"`
   * etc. on its own hint/error wrappers.
   *
   * @example
   * ```astro
   * <Field id="email">
   *   <Label slot="label" for="email">Email</Label>
   *   <Input id="email" name="email" aria-describedby="email-hint" />
   *   <span slot="hint" id="email-hint">We'll never share your email.</span>
   * </Field>
   * ```
   */
  id?: string;

  /**
   * The native `type` attribute of the `<input>` element.
   *
   * Constrained to text-entry types via {@link INPUT_TYPES}. Specialised
   * input types (date, file, color, range) are handled by dedicated
   * components.
   *
   * @default `"text"` — applied by {@link useInput}
   * @see {@link INPUT_TYPES} for the full allowed set and exclusion rationale
   */
  type?: InputType;

  /**
   * The current value of the input field.
   *
   * When provided, the input renders as a controlled field.
   * In static Astro (SSR), this sets the initial rendered value.
   * For interactive/client-side control, pair with a client script
   * or a framework island.
   */
  value?: string;

  /**
   * Placeholder text shown when the field is empty.
   *
   * @remarks
   * Placeholder text is not a substitute for a `<label>`. Always provide
   * a visible label (via the {@link Label} component in a {@link Field}
   * slot) in addition to any placeholder. Placeholder text has low
   * contrast by default (per browser defaults) and disappears on entry,
   * failing WCAG 1.4.3 for standalone labels.
   */
  placeholder?: string;

  /**
   * Prevents the user from changing the value while keeping the field
   * focusable and its value submitted with the form.
   *
   * @remarks
   * Distinct from `disabled`: a `readonly` field can be focused, its
   * value is included in form submission, and it does not receive the
   * `data-disabled` / `aria-disabled` treatment. Use `readonly` when
   * the value is meaningful but not user-editable; use `disabled` when
   * the control is entirely inert.
   *
   * Maps to the native `readOnly` DOM property (note: Astro / HTML
   * attribute is `readonly`, camelCase in the DOM is `readOnly`).
   */
  readonly?: boolean;

  /**
   * Minimum number of characters the value must contain for the form
   * to be considered valid.
   *
   * Only enforced by browser native validation (`:invalid` pseudo-class
   * and form submit). For custom validation UI, check the value manually
   * and set `invalid={true}` on this component accordingly.
   *
   * @see {@link maxLength}
   *
   * @todo If a character-count display is needed (e.g. "12/100"),
   *   that requires a client-side script — it cannot be rendered
   *   accurately by static SSR. Add a client island or `<script>` in
   *   `Input.astro` that reads `maxLength` from `data-maxlength` and
   *   updates a counter `<span>`.
   */
  minLength?: number;

  /**
   * Maximum number of characters the value may contain.
   *
   * The browser will prevent entering more characters than this limit
   * natively. Pair with a character counter for better UX.
   *
   * @see {@link minLength}
   * @see the `@todo` on {@link minLength} for the character-counter approach
   */
  maxLength?: number;

  /**
   * A regular-expression pattern the value must match for the form to
   * be considered valid. Applied as the native `pattern` attribute.
   *
   * @example `pattern="[a-z]{4,8}"` — four to eight lowercase letters
   *
   * @remarks
   * The pattern is anchored implicitly (as if surrounded by `^` and `$`).
   * Always provide a `title` attribute (passed via `rest`) describing the
   * required format — browsers display it in native validation tooltips.
   */
  pattern?: string;

  /**
   * Hint to the browser's autofill / autocomplete behavior.
   *
   * Maps to the native `autocomplete` attribute. Common values:
   * `"off"`, `"on"`, `"email"`, `"current-password"`, `"new-password"`,
   * `"username"`, `"given-name"`, `"family-name"`, `"tel"`.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete MDN: autocomplete}
   */
  autocomplete?: string;
}