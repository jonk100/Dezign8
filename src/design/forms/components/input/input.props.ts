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
import type { IconProps } from "~/shared/icon.props";

export type InputProps = FormProps & IconProps & {
  id?: string;
  type?: InputType;
  value?: string;
  placeholder?: string;
  readonly?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  autocomplete?: string;
};