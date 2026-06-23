// design/surfaces/components/card/card.hook.ts

import type { CardProps }                    from "./card.props";
import { CARD_DEFAULTS }                     from "./card.tokens";
import { useSurface }                        from "../../surface.hook";
import { composeClass }                      from "~/shared/base.hook";

export function useCard(props: CardProps) {
  const {
    as: Tag      = CARD_DEFAULTS.as,
    layer        = CARD_DEFAULTS.layer,
    outlined     = CARD_DEFAULTS.outlined,
    href,
    target,
    rel,
    interactive  = CARD_DEFAULTS.interactive,
    selectable   = CARD_DEFAULTS.selectable,
    selected     = CARD_DEFAULTS.selected,
    disabled     = CARD_DEFAULTS.disabled,
    ...surfaceProps
  } = props;

  const isLink        = Boolean(href);
  const isToggle      = !isLink && selectable;
  const isInteractive = !isLink && (interactive || selectable);
  const isDisabled    = !isLink && disabled;

  const resolvedRel = isLink
    ? (rel ?? (target === "_blank" ? "noopener noreferrer" : undefined))
    : undefined;

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    outlined,
    ...surfaceProps,
  });

  return {
    Tag: isLink ? "a" : Tag,
    props: {
      class: composeClass(
        surfaceClass,
        "card",
        isInteractive && "card--interactive",
        isToggle      && "card--selectable",
        isDisabled    && "card--disabled",
        selected      && "card--selected",
      ),
      style:           surfaceStyle,
      ...surfaceAttrs,
      ...rest,
      // link attrs
      href:            isLink ? href   : undefined,
      target:          isLink ? target : undefined,
      rel:             resolvedRel,
      // interaction attrs
      role:            isToggle      ? "button"        : undefined,
      tabindex:        isInteractive ? (isDisabled ? -1 : 0) : undefined,
      "aria-pressed":  isToggle      ? String(selected) : undefined,
      "aria-disabled": isDisabled    ? "true"           : undefined,
      // data attr mirrors aria-pressed for clean CSS targeting
      "data-selected": isToggle      ? String(selected) : undefined,
    },
  };
}
