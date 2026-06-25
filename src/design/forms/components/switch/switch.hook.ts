// design/forms/components/switch/switch.hook.ts

/**
 * @file Component hook for the Switch component.
 * @module design/forms/switch
 *
 * {@link useSwitch} resolves {@link SwitchProps} into wrapper and input
 * attribute objects. Pattern mirrors {@link useCheckbox}: the `<label>`
 * is the root element; the hidden native `<input type="checkbox">` carries
 * the semantic state via `role="switch"`.
 *
 * @see {@link useForm}         in `forms/forms.hook.ts`
 * @see {@link SwitchProps}     in `forms/switch/switch.props.ts`
 * @see {@link SWITCH_DEFAULTS} in `forms/switch/switch.tokens.ts`
 */

import type { SwitchProps } from "./switch.props";
import { SWITCH_DEFAULTS }  from "./switch.tokens";
import { useForm }          from "~/forms/forms.hook";
import { composeClass }     from "~/shared/base.hook";

export function useSwitch(props: SwitchProps) {
  const {
    id,
    name,
    value,
    checked,
    labelPosition = SWITCH_DEFAULTS.labelPosition,
    ...formProps
  } = props;

  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm({
        variant: "ghost",
        ...formProps,
      } as Parameters<typeof useForm>[0]);

  return {
    Tag: "label" as const,
    props: {
      class: composeClass(formClass, "switch", `switch--${labelPosition}`),
      style: formStyle,
      ...formAttrs,
      ...rest,
    },
    inputAttrs: {
      type:            "checkbox" as const,
      role:            "switch"   as const,
      id,
      name,
      value,
      checked:         checked   || undefined,
      disabled:        disabled  || undefined,
      required:        required  || undefined,
      "aria-required": required  ? "true" as const : undefined,
      "aria-invalid":  invalid   ? "true" as const : undefined,
    },
  };
}
