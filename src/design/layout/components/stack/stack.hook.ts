import { composeClass, composeStyle } from "~sh/base.hook";
import { resolveTokens } from "~/shared/tokens";

import type { StackProps } from "./stack.props";
import { STACK_DEFAULTS, STACK_TOKENS } from "./stack.tokens";

export function useStack(props: StackProps) {
  const {
    as: Tag = STACK_DEFAULTS.as,
    gap = STACK_DEFAULTS.gap,
    align,
    justify,
    class: className,
    ...rest
  } = props;

  const { style } = resolveTokens(
    STACK_TOKENS,
    { gap },
    "stack",
  );

  return {
    Tag,
    props: {
      class: composeClass(
        "stack",
        align && `stack--align-${align}`,
        justify && `stack--justify-${justify}`,
        className,
      ),
      style: composeStyle(...style),
      ...rest,
    },
  };
}