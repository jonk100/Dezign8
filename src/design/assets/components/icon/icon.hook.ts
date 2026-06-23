// design/assets/components/icon/icon.hook.ts

import type { IconProps } from "./icon.props";
import { ICON_DEFAULTS, ICON_TOKENS } from "./icon.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useIcon(props: IconProps) {
  const {
    name,
    size = ICON_DEFAULTS.size,
    class: className,
    ...rest
  } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(ICON_TOKENS, { size }, "icon");

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: ["icon", ...tokenClasses, className],
      style: tokenStyle,
    },
    props,
  );

  return {
    name,
    props: { class: cls, style: style || undefined, ...attrs, ...rest },
  };
}
