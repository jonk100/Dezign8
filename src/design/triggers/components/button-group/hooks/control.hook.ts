// design/triggers/button-group/hooks/control.hook.ts

import type { ControlButtonGroupProps } from "../button-group.props";

export function useControlButtonGroup(props: ControlButtonGroupProps) {
  return {
    classes: ["button-group--control"],
    attrs: {
      "data-selectable": "true",
      ...(props.name !== undefined ? { "data-name": props.name } : {}),
      ...(props.value !== undefined ? { "data-value": props.value } : {}),
    },
  };
}
