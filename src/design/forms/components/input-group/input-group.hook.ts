import { resolveTokens } from "~/shared/tokens";
import { INPUT_GROUP_TOKENS } from "./input-group.tokens";
import type { InputGroupProps } from "./input-group.props";

export function useInputGroup(props: InputGroupProps) {
  const {
    orientation = "horizontal",
    connected = true,
    spacing = "sm",
    class: className,
    ...rest
  } = props;

  const resolved = resolveTokens(
    INPUT_GROUP_TOKENS,
    { spacing },
    "input-group"
  );

  return {
    props: rest,
    styles: resolved.style.join("; "),
    className: ["dz-input-group", ...resolved.classes, className].filter(Boolean).join(" "),
    attrs: {
      "data-orientation": orientation,
      "data-connected": connected.toString(),
    },
  };
}
