// design/triggers/button-group/hooks/toolbar.hook.ts

import type { ToolbarButtonGroupProps } from "../button-group.props";

export function useToolbarButtonGroup(props: ToolbarButtonGroupProps) {
  return {
    classes: ["button-group--toolbar"],
    attrs: {
      role: "toolbar",
      ...(props["aria-label"] !== undefined ? { "aria-label": props["aria-label"] } : {}),
    },
  };
}
