// design/forms/components/textarea/textarea.hook.ts

/**
 * @file Component hook for the Textarea component.
 * @module design/forms/textarea
 *
 * {@link useTextarea} resolves {@link TextareaProps} into two attribute sets:
 * one for the outer wrapper `<div>` (visual chrome) and one for the inner
 * `<textarea>` element (semantic control). Follows the same two-element
 * pattern as {@link useInput}.
 *
 * The resize channel (`--textarea--resize`) is emitted directly on the wrapper
 * style string rather than via resolveTokens, because the full TEXTAREA_TOKENS
 * spec is a superset of FORM_TOKENS — resolving both would call resolveTokens
 * twice. The form dimensions are resolved by {@link useForm}; resize is appended
 * as a single extra CSS variable.
 *
 * @see {@link useForm}           in `forms/forms.hook.ts`
 * @see {@link TextareaProps}     in `forms/textarea/textarea.props.ts`
 * @see {@link TEXTAREA_DEFAULTS} in `forms/textarea/textarea.tokens.ts`
 */

import type { TextareaProps } from "./textarea.props";
import { TEXTAREA_DEFAULTS }  from "./textarea.tokens";
import { useForm }            from "~/forms/forms.hook";
import { composeClass }       from "~/shared/base.hook";

export function useTextarea(props: TextareaProps) {
  const {
    id,
    name,
    value,
    placeholder,
    readonly,
    rows         = TEXTAREA_DEFAULTS.rows,
    resize       = TEXTAREA_DEFAULTS.resize,
    minLength,
    maxLength,
    autocomplete,
    wrap,
    ...formProps
  } = props;

  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm(formProps as Parameters<typeof useForm>[0]);

  return {
    Tag: "div" as const,
    props: {
      class: composeClass(formClass, "textarea"),
      style: [formStyle, `--textarea--resize: ${resize}`].filter(Boolean).join("; "),
      ...formAttrs,
      ...rest,
    },
    textareaAttrs: {
      id,
      name,
      placeholder,
      rows,
      minLength,
      maxLength,
      autoComplete: autocomplete,
      wrap,
      readOnly:        readonly  || undefined,
      disabled:        disabled  || undefined,
      required:        required  || undefined,
      "aria-required": required  ? "true" as const : undefined,
      "aria-invalid":  invalid   ? "true" as const : undefined,
    },
    value,
  };
}
