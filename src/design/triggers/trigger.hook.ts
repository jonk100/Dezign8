// design/triggers/triggers.hook.ts

import type { TriggerProps } from "./trigger.props";
import { TRIGGER_TOKENS } from "./trigger.tokens";
import { resolveTokens } from "~/shared/tokens";
import { resolveColorChannels } from "~/shared/primitives.tokens";
import { useBaseCompose, composeClass, composeStyle } from "~/shared/base.hook";

export function useTrigger(props: TriggerProps) {
  const {
    size     = "md",
    variant  = "solid",
    color    = "primary",
    radius   = "md",
    disabled = false,
    loading  = false,
    class: className,
    v: _v,
    testId: _testId,
    bg,
    animation,
    ...rest
  } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    TRIGGER_TOKENS,
    { variant, color, radius, size },
    "trigger",
  );


  const colorStyle = resolveColorChannels(color, "trigger");

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: [
        "trigger",
        ...tokenClasses,
        disabled  && "trigger--disabled",
        loading   && "trigger--loading",
        animation && `animate-${animation}`,
        className,
      ],
      style: [
        ...tokenStyle,
        ...colorStyle,
        bg && `--trigger--bg: ${bg}`,
      ],
    },
    props,
  );

  return {
    triggerClass:  cls,
    triggerStyle:  style,
    triggerAttrs:  attrs,
    disabled,
    loading,
    size, 
    rest,
  };
}