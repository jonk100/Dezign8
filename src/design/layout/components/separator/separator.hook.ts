import { useBaseCompose } from "~sh/base.hook";
import { defineTokens, resolveTokens } from "~sh/tokens";
import type { SeparatorProps } from "./separator.props";
import {
  LABEL_POSITION_DIM,
  ORIENTATION_DIM,
  SEPARATOR_DEFAULTS,
  STRENGTH_DIM,
  VARIANT_DIM,
} from "./separator.tokens";

const SEPARATOR_TOKENS = defineTokens({
  orientation: ORIENTATION_DIM,
  variant: VARIANT_DIM,
  strength: STRENGTH_DIM,
  labelPosition: LABEL_POSITION_DIM,
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
    labelPosition = SEPARATOR_DEFAULTS.labelPosition,
    hasContent = false,
    ...rest
  } = props;

  const Tag = hasContent ? "div" : "hr";

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    SEPARATOR_TOKENS,
    { orientation, variant, strength, labelPosition },
    "separator",
  );

  const { props: baseProps } = useBaseCompose({
    ...rest,
    class: ["separator", ...tokenClasses, props.class],
    style: tokenStyle,
  });

  const finalProps = {
    ...baseProps,
    role: hasContent ? "separator" : undefined,
    "aria-orientation": orientation === "vertical" ? "vertical" : "horizontal",
    style: `${baseProps.style ?? ""}${
      hasContent ? `--separator--variant: ${variant}; --separator--strength: var(--border--${strength});` : ""
    }`,
  };

  return { Tag, props: finalProps };
}