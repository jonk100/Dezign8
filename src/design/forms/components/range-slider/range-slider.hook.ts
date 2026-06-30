import type { RangeSliderProps } from "./range-slider.props";
import { useForm } from "../../forms.hook";
import { composeClass } from "~/shared/base.hook";

export function useRangeSlider(props: RangeSliderProps) {
  const {
    id,
    name,
    value = [0, 100],
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
    class: composeClass(formClass, "range-slider"),
    style: formStyle,
    ...formAttrs,
    ...rest,
  };

  // Start thumb attributes
  const startInputAttrs = {
    id: id ? `${id}-start` : undefined,
    name: name ? `${name}-start` : undefined,
    type: "range" as const,
    value: value[0] ?? undefined,
    min: min,
    max: max,
    step: step,
    disabled: disabled || undefined,
    required: required || undefined,
    "aria-required": required ? "true" as const : undefined,
    "aria-invalid": invalid ? "true" as const : undefined,
  };

  // End thumb attributes
  const endInputAttrs = {
    id: id ? `${id}-end` : undefined,
    name: name ? `${name}-end` : undefined,
    type: "range" as const,
    value: value[1] ?? undefined,
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
    startInputAttrs,
    endInputAttrs,
  };
}
