// design/typography/typography.hook.ts

import type { TypographyProps } from "./typography.props";
import { TYPOGRAPHY_TOKENS } from "./typography.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useTypography(props: TypographyProps) {
  const {
    size,
    weight,
    color,
    align,
    leading,
    tracking,
    fam,
    transform,
    wrap,
    decoration,
    fontStyle,
    clamp,
    truncate  = false,
    class: className,
    v:        _v,
    testId:   _testId,
    bg,
    animation,
    ...rest
  } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    TYPOGRAPHY_TOKENS,
    { size, weight, color, align, leading, tracking, fam, transform, wrap, decoration, style: fontStyle },
    "typography",
  );

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: [
        "typography",
        ...tokenClasses,
        clamp != null && "typography--clamped",
        truncate && "typography--truncate",
        animation && `animate-${animation}`,
        className,
      ],
      style: [
        ...tokenStyle,
        clamp != null && `--typography--clamp: ${clamp}`,
        bg            && `--typography--bg: ${bg}`,
      ],
    },
    props,
  );

  return {
    typographyAttributes: {
      class: cls,
      style,
      ...attrs,
      ...rest,
    },
  };
}