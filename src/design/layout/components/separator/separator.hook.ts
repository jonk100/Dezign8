import { useBaseCompose } from "~sh/base.hook";
import { defineTokens, resolveTokens } from "~sh/tokens";
import type { SeparatorProps } from "./separator.props";
import {
  ORIENTATION_DIM,
  SEPARATOR_DEFAULTS,
  STRENGTH_DIM,
  VARIANT_DIM,
} from "./separator.tokens";

const SEPARATOR_TOKENS = defineTokens({
  orientation: ORIENTATION_DIM,
  variant: VARIANT_DIM,
  strength: STRENGTH_DIM,
});

/**
 * A hook that processes props for the Separator component.
 */
export function useSeparator(
  props: SeparatorProps & { hasContent?: boolean },
) {
  const {
    orientation = SEPARATOR_DEFAULTS.orientation,
    variant = SEPARATOR_DEFAULTS.variant,
    strength = SEPARATOR_DEFAULTS.strength,
    hasContent = false,
    class: className,
    ...rest
  } = props;

  const Tag = hasContent ? "div" : "hr";

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    SEPARATOR_TOKENS,
    { orientation, variant, strength },
    "separator",
  );

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: ["separator", ...tokenClasses, className],
      style: [
        ...tokenStyle,
        `--separator--color: var(--border--${strength})`,
        hasContent ? `--separator--variant: ${variant}` : false,
      ],
    },
    props,
  );

  return {
    Tag,
    props: {
      class: cls,
      style: style || undefined,
      role: hasContent ? ("separator" as const) : undefined,
      "aria-orientation": (orientation === "vertical" ? "vertical" : "horizontal") as "vertical" | "horizontal",
      ...attrs,
      ...rest,
    },
  };
}