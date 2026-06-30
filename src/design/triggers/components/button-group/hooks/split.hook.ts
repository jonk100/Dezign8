// design/triggers/button-group/hooks/split.hook.ts

import type { SplitButtonGroupProps } from "../button-group.props";

export function useSplitButtonGroup(_props: SplitButtonGroupProps) {
  return {
    classes: ["button-group--split"],
    attrs: {
      "data-split": "true",
    },
  };
}
