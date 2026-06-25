import type { TooltipProps } from "./tooltip.props";
import { TOOLTIP_TOKENS, TOOLTIP_DEFAULTS } from "./tooltip.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useTooltip(props: TooltipProps) {
  const {
    content,
    placement = TOOLTIP_DEFAULTS.placement,
    radius,
    class: className,
    ...base } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    TOOLTIP_TOKENS, { placement, radius }, "tooltip",
  );

  const { className: cls, style, attrs, rest } = useBaseCompose({
    className: ["tooltip", ...tokenClasses, className],
    style:     tokenStyle,
  }, base);

  return {
    wrapperProps: {
      class: cls,
      style,
      ...attrs,
      ...rest,
    },
    content,
  };
}
