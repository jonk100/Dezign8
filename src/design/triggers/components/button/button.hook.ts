// design/triggers/button/button.hook.ts

import type { ButtonProps } from "./button.props";
import { BUTTON_DEFAULTS, resolveButtonSize } from "./button.tokens";
import { useTrigger } from "../../trigger.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

 
export function useButton(props: ButtonProps) {
  const {
    type      = BUTTON_DEFAULTS.type,
    href,
    target,
    rel,
    iconOnly  = BUTTON_DEFAULTS.iconOnly,
    fullWidth = BUTTON_DEFAULTS.fullWidth,
    ...triggerProps
  } = props;
 
  const { Tag, triggerClass, triggerStyle, triggerAttrs, rest, size }
    = useTrigger({
      ...triggerProps,
      type,
      ...(href   !== undefined ? { href }   : {}),
      ...(target !== undefined ? { target } : {}),
      ...(rel    !== undefined ? { rel }    : {}),
    });
    
  const sizeStyle = resolveButtonSize(size);

  return {
    Tag,
    props: {
      class: composeClass(
        triggerClass,
        "button",
        `button--${size}`,
        iconOnly  && "button--icon-only",
        fullWidth && "button--full-width",
      ),
      style: composeStyle(
        triggerStyle,
        ...sizeStyle,
      ),
      ...triggerAttrs,
      ...rest,
    },
  };
}
 
