// design/typography/text/text.hook.ts
import type { TextProps } from "./text.props";
import { TEXT_DEFAULTS } from "./text.tokens";
import { useTypography } from "../../typography.hook";
import { composeClass } from "~/shared/base.hook";

export function useText(props: TextProps) {
  const {
    as: Tag = TEXT_DEFAULTS.as,
    icon,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography(typographyProps);

  return {
    Tag,
    props: {
      ...typographyAttributes,
      class: composeClass(typographyAttributes.class, "text", icon ? "text--has-icon" : undefined),
    },
  };
}