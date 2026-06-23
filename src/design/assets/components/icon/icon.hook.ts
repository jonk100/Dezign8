// design/assets/components/icon/icon.hook.ts

import type { IconProps } from "./icon.props";
import { ICON_DEFAULTS, ICON_TOKENS } from "./icon.tokens";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle, useBaseCompose } from "~/shared/base.hook";

export function useIcon(props: IconProps) {
  const {
    name,
    size = ICON_DEFAULTS.size,
    ...rest
  } = props;

  const { class: resolvedClass, style: resolvedStyle, attributes } = resolveTokens(ICON_TOKENS, { size }, "icon");

  const baseProps = useBaseCompose(rest);

  return {
    name,
    props: {
      ...baseProps,
      class: composeClass(
        resolvedClass,
        "icon",
        baseProps.class
      ),
      style: composeStyle(
        resolvedStyle,
        baseProps.style
      ),
      ...attributes,
    },
  };
}
