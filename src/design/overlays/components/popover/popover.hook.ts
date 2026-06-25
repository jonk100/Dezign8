import type { PopoverProps } from "./popover.props";
import { POPOVER_TOKENS, POPOVER_DEFAULTS } from "./popover.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function usePopover(props: PopoverProps) {
  const {
    id,
    placement = POPOVER_DEFAULTS.placement,
    radius,
    class: className,
    ...base
  } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    POPOVER_TOKENS, { placement, radius }, "popover",
  );

  const { className: panelCls, style, attrs, rest } = useBaseCompose({
    className: ["popover__panel", ...tokenClasses, className],
    style:     tokenStyle,
  }, base);

  return {
    id,
    hostProps: {
      class:                "popover",
      "data-popover-host":  "",
      "data-placement":     placement,
    },
    panelProps: {
      class: panelCls,
      style: style || undefined,
      ...attrs,
      ...rest,
    },
  };
}
