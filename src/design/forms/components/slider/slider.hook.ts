import type { SliderProps } from "./slider.props";
import { useForm } from "../../forms.hook";
import { composeClass } from "~/shared/base.hook";

export function useSlider(props: SliderProps) {
  const {
    id,
    name,
    value,
    min = 0,
    max = 100,
    step = 1,
    ...formProps
  } = props;

  const {
    formClass,
    formStyle,
    formAttrs,
    disabled,
    required,
    invalid,
    rest,
  } = useForm(formProps as Parameters<typeof useForm>[0]);

  // Visual container props
  const wrapperProps = {
    class: composeClass(formClass, "slider"),
    style: formStyle,
    ...formAttrs,
    ...rest,
  };

  // Native input attributes
  const inputAttrs = {
    id,
    name,
    type: "range" as const,
    value: value ?? undefined,
    min: min,
    max: max,
    step: step,
    disabled: disabled || undefined,
    required: required || undefined,
    "aria-required": required ? "true" as const : undefined,
    "aria-invalid": invalid ? "true" as const : undefined,
  };

  return {
    Tag: "div" as const,
    props: wrapperProps,
    inputAttrs,
  };
}
