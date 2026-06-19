// design/triggers/button/button.hook.ts

import type { ButtonProps } from "./button.props";
import { BUTTON_DEFAULTS, ButtonSize, resolveButtonSize } from "./button.tokens";
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
 
  const isLink = Boolean(href);
  const Tag    = isLink ? "a" : "button";
 
  const resolvedRel = isLink
    ? (rel ?? (target === "_blank" ? "noopener noreferrer" : undefined))
    : undefined;


  /**
   * useTrigger hook
   * @param triggerClass - class
   * @param triggerStyle - styles
   * @param triggerAttrs - 
   * @param disabled - disabled - is it disabled?
   * @param loading - loading - is it loading?
   * @param rest - for the rest of the props   
   * @param  
   * @returns Tag and props: { class, style, other attributes, type, href, target, rel, disabled, aria stuff }
   */
  const { triggerClass, triggerStyle, triggerAttrs, disabled, loading, rest, size,
 }
    = useTrigger(triggerProps);
    const sizeStyle = resolveButtonSize(size); // button decides what sm means

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
      type:           !isLink ? type : undefined,
      href:           isLink  ? href : undefined,
      target:         isLink  ? target : undefined,
      rel:            resolvedRel,
      disabled:       !isLink && (disabled || loading) ? true : undefined,
      "aria-disabled": disabled || loading ? "true" : undefined,
      "aria-busy":     loading  ? "true" : undefined,
      
    },
  };
}
 
