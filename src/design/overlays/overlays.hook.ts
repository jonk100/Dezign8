import type { OverlaysProps } from "./overlays.props";
import { OVERLAY_TOKENS } from "./overlays.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useOverlays(props: OverlaysProps) {
  const {
    size,
    variant,
    radius,
    class: className,
    ...base
  } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    OVERLAY_TOKENS, { size, variant, radius }, "overlay",
  );

  const { className: cls, style, attrs, rest } = useBaseCompose({
    className: ["overlay", ...tokenClasses, className],
    style:     tokenStyle,
  }, base);

  return {
    overlayClass: cls,
    overlayStyle: style,
    overlayAttrs: attrs,
    rest,
  };
}