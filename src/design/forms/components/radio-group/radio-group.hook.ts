// design/forms/components/radio-group/radio-group.hook.ts

/**
 * @file Component hook for the RadioGroup component.
 * @module design/forms/radio-group
 *
 * {@link useRadioGroup} resolves {@link RadioGroupProps} into the props spread
 * onto `<dezign8-radio-group>`. The `name` prop is forwarded as `data-name` so
 * the Web Component can propagate it to child `<input type="radio">` elements
 * after the page loads.
 *
 * @see {@link RadioGroupProps}        in `radio-group.props.ts`
 * @see {@link RADIO_GROUP_DEFAULTS}   in `radio-group.tokens.ts`
 */

import type { RadioGroupProps }  from "./radio-group.props";
import { RADIO_GROUP_DEFAULTS }  from "./radio-group.tokens";
import { composeClass }          from "~/shared/base.hook";

export function useRadioGroup(props: RadioGroupProps) {
  const {
    name,
    legend,
    layout   = RADIO_GROUP_DEFAULTS.layout,
    class:     className,
    style,
    ...rest
  } = props;

  return {
    groupProps: {
      class: composeClass("radio-group", `radio-group--${layout}`, className),
      style,
      ...(name ? { "data-name": name } : {}),
      ...rest,
    },
    legend,
    layout,
  };
}
