// design/forms/number-input/number-input.hook.ts

import type { NumberInputProps } from "./number-input.props";
import { NUMBER_INPUT_DEFAULTS } from "./number-input.tokens";
import { useForm } from "~/forms/forms.hook";
import { composeClass } from "~/shared/base.hook";

export function useNumberInput(props: NumberInputProps) {
  const {
    id,
    name,
    value,
    defaultValue,
    min,
    max,
    step,
    placeholder,
    readonly,
    controls = NUMBER_INPUT_DEFAULTS.controls,
    ...formProps
  } = props;

  const {
    formClass, formStyle, formAttrs,
    disabled, required, invalid,
    rest,
  } = useForm(formProps as Parameters<typeof useForm>[0]);

  const wrapperProps = {
    class: composeClass(formClass, "number-input"),
    style: formStyle,
    "data-controls": controls ? "true" : "false",
    ...formAttrs,
    ...rest,
  };

  const inputAttrs = {
    id,
    name,
    type: "number" as const,
    value: value ?? defaultValue ?? undefined,
    min: min,
    max: max,
    step: step,
    placeholder: placeholder ?? undefined,
    readOnly: readonly || undefined,
    disabled: disabled || undefined,
    required: required || undefined,
    "aria-required": required ? "true" as const : undefined,
    "aria-invalid": invalid ? "true" as const : undefined,
  };

  return {
    Tag: "div" as const,
    props: wrapperProps,
    inputAttrs: inputAttrs,
  };
}
