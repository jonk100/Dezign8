// design/forms/field/field.props.ts

/**
 * @file Prop interface for the Field component.
 * @module design/forms/field
 *
 * {@link FieldProps} extends {@link BaseComponentProps} directly —
 * NOT {@link FormProps} — because Field is a structural wrapper, not a
 * form control. It never renders a native form element.
 *
 * **Responsibility split between Field props and control props:**
 *
 * | Concern            | Where it lives        | Why                              |
 * |--------------------|-----------------------|----------------------------------|
 * | `invalid` (ARIA)   | Control (`InputProps`) | Goes on the native `<input>`     |
 * | `invalid` (visual) | `FieldProps`          | Drives CSS on the wrapper group  |
 * | `required` (ARIA)  | Control (`InputProps`) | Goes on the native `<input>`     |
 * | `required` (visual)| `FieldProps`          | Drives CSS; forwarded to Label   |
 * | `aria-describedby` | Consumer (manual)     | Astro slots can't wire this auto |
 * | hint/error IDs     | Field (via `id` prop) | Field generates `{id}-hint` etc. |
 *
 * **`id` prop and accessibility wiring:**
 * Passing an `id` to Field enables the recommended accessibility pattern:
 *
 * ```astro
 * <Field id="email" invalid={!isValid} required>
 *   <Label slot="label" for="email" required>Email</Label>
 *   <Input
 *     id="email"
 *     name="email"
 *     type="email"
 *     invalid={!isValid}
 *     aria-describedby="email-hint email-error"
 *   />
 *   <span slot="hint"    id="email-hint">We'll never share it.</span>
 *   <span slot="error"   id="email-error">Enter a valid email.</span>
 * </Field>
 * ```
 *
 * Field renders `id="{id}-hint"` and `id="{id}-error"` on its own hint/error
 * wrapper elements. The consumer passes `aria-describedby` to the control
 * directly, referencing those IDs.
 *
 * @see {@link BaseComponentProps} in `shared/base.props.ts`  — parent interface
 * @see {@link useField}           in `forms/field/field.hook.ts`
 * @see `forms/field/Field.astro`  — slot structure and id derivation
 */

import type { BaseComponentProps } from "~/shared/base.props";

/**
 * Props for the `<Field>` component.
 *
 * @example
 * ```astro
 * <!-- Minimal — no wiring -->
 * <Field>
 *   <Label slot="label">Username</Label>
 *   <Input name="username" />
 * </Field>
 *
 * <!-- Full accessibility wiring -->
 * <Field id="email" invalid={!emailValid} required>
 *   <Label slot="label" for="email" required>Email address</Label>
 *   <Input
 *     id="email"
 *     name="email"
 *     type="email"
 *     invalid={!emailValid}
 *     required
 *     aria-describedby="email-hint email-error"
 *   />
 *   <span slot="hint" id="email-hint">We'll never share your email.</span>
 *   <span slot="error" id="email-error">Enter a valid email address.</span>
 * </Field>
 * ```
 */
export interface FieldProps extends BaseComponentProps {
  /**
   * Base identifier for this field group.
   *
   * When provided, Field derives stable IDs for its hint and error wrappers:
   * - Hint wrapper: `id="{id}-hint"`
   * - Error wrapper: `id="{id}-error"`
   * - Success wrapper: `id="{id}-success"`
   *
   * Pass the same value as the `id` on the control in the default slot,
   * and reference `"{id}-hint"` / `"{id}-error"` in `aria-describedby`
   * on the control.
   */
  id?: string;

  /**
   * Whether this field group is in an invalid/error state.
   *
   * Adds `data-invalid` to the Field wrapper and applies the
   * `field--invalid` modifier class. CSS uses this to:
   * - Show the error slot area with danger colors
   * - Apply a subtle error highlight to the control wrapper
   *
   * @remarks
   * This mirrors the `invalid` prop on the control (Input, Select, etc.)
   * inside the field. Both should be set to the same value — the control's
   * `invalid` handles ARIA (`aria-invalid="true"`) while Field's `invalid`
   * handles the surrounding group styling.
   *
   * @default false
   */
  invalid?: boolean;

  /**
   * Whether this field group is required.
   *
   * Adds `data-required` to the Field wrapper. CSS can use this to style
   * the field group as a whole. Field passes this information to consumers
   * via context — the consumer is still responsible for passing `required`
   * to both the control (for native validation) and the Label (for the
   * visual asterisk indicator).
   *
   * @default false
   */
  required?: boolean;
}