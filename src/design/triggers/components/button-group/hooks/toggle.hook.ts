// design/triggers/button-group/hooks/toggle.hook.ts

import type { ToggleButtonGroupProps } from "../button-group.props";

export function useToggleButtonGroup(props: ToggleButtonGroupProps) {
  return {
    classes: ["button-group--toggle"],
    attrs: {
      "data-toggle": "true",
      ...(props.name !== undefined ? { "data-name": props.name } : {}),
      ...(props.values !== undefined ? { "data-values": JSON.stringify(props.values) } : {}),
    },
  };
}
