// design/triggers/button-group/hooks/semantic.hook.ts

import type { SemanticButtonGroupProps } from "../button-group.props";

export function useSemanticButtonGroup(_props: SemanticButtonGroupProps) {
  return {
    classes: ["button-group--semantic"],
    attrs: {},
  };
}
