// design/forms/checkbox/checkbox.hook.ts

/**
 * @file Component hook for the Checkbox component.
 * @module design/forms/checkbox
 *
 * {@link useCheckbox} translates {@link CheckboxProps} — including the
 * three-state {@link CheckState} — into the native input attributes and
 * wrapper props that `Checkbox.astro` needs.
 *
 * **CheckState translation:**
 * ```
 * "checked"       → checked attribute present, data-indeterminate absent
 * "unchecked"     → checked attribute absent,  data-indeterminate absent
 * "indeterminate" → checked attribute absent,  data-indeterminate present
 * undefined       → same as "unchecked"
 * ```
 * The `data-indeterminate` attribute is read by the script in `Checkbox.astro`
 * which sets `.indeterminate = true` on the DOM node after render.
 *
 * @see {@link useForm}          in `forms/forms.hook.ts`
 * @see {@link CheckboxProps}    in `forms/checkbox/checkbox.props.ts`
 * @see {@link CHECKBOX_DEFAULTS} in `forms/checkbox/checkbox.tokens.ts`
 * @see `forms/checkbox/Checkbox.astro`
 */

import type { CheckboxProps } from "./checkbox.props";
import { CHECKBOX_DEFAULTS }  from "./checkbox.tokens";
import { useForm }            from "~/forms/forms.hook";
import { composeClass }       from "~/shared/base.hook";

/**
 * Resolves {@link CheckboxProps} into wrapper and input attribute objects.
 *
 * @param props - Full `CheckboxProps`.
 *
 * @returns `{ Tag: "label", props, inputAttrs }`
 *
 * @example
 * ```astro
 * const { Tag, props, inputAttrs } = useCheckbox(Astro.props as CheckboxProps);
 * ```
 */
export function useCheckbox(props: CheckboxProps) {
  const {
    id,
    name,
    value,
    checkState    = CHECKBOX_DEFAULTS.checkState,
    labelPosition = CHECKBOX_DEFAULTS.labelPosition,
    ...formProps
  } = props;

  // ── Derive native states from the union ──────────────────────────────────
  const isChecked       = checkState === "checked";
  const isIndeterminate = checkState === "indeterminate";
  // "unchecked" and undefined → neither flag is set

  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm({
        variant: "ghost",   // override category default for traditional look
        ...formProps,
      } as Parameters<typeof useForm>[0]);

  return {
    Tag: "label" as const,
    props: {
      class: composeClass(formClass, "checkbox", `checkbox--${labelPosition}`),
      style: formStyle,
      ...formAttrs,
      ...rest,
    },
    inputAttrs: {
      type:                 "checkbox" as const,
      id,
      name,
      value,
      // Absent when false — HTML boolean attrs are truthy by presence
      checked:              isChecked       || undefined,
      // Presence of this attribute triggers the indeterminate script
      "data-indeterminate": isIndeterminate ? "" as const : undefined,
      disabled:             disabled  || undefined,
      required:             required  || undefined,
      "aria-required":      required  ? "true" as const : undefined,
      "aria-invalid":       invalid   ? "true" as const : undefined,
    },
  };
}