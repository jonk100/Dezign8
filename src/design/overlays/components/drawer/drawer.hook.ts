import type { DrawerProps } from "./drawer.props";
import { DRAWER_TOKENS, DRAWER_DEFAULTS } from "./drawer.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useDrawer(props: DrawerProps) {
  const {
    id,
    title,
    placement       = DRAWER_DEFAULTS.placement,
    size            = DRAWER_DEFAULTS.size,
    closeOnBackdrop = DRAWER_DEFAULTS.closeOnBackdrop,
    closeOnEsc      = DRAWER_DEFAULTS.closeOnEsc,
    class: className,
    ...base
  } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    DRAWER_TOKENS, { placement, size }, "drawer",
  );

  const { className: cls, style, attrs, rest } = useBaseCompose({
    className: ["drawer", ...tokenClasses, className],
    style:     tokenStyle,
  }, base);

  const titleId = title ? `${id}-title` : undefined;

  return {
    dialogProps: {
      id,
      class:                 cls,
      style:                 style || undefined,
      ...attrs,
      ...rest,
      "aria-labelledby":     titleId,
      "data-close-backdrop": closeOnBackdrop ? "true" : "false",
      "data-close-esc":      closeOnEsc      ? "true" : "false",
    },
    title,
    titleId,
  };
}
