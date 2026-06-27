// design/assets/image/image.hook.ts

import type { ImageProps } from "./image.props";
import { IMAGE_TOKENS, IMAGE_DEFAULTS } from "./image.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";
import { resolveSpacingStyles } from "~/shared/spacing.props";

export function useImage(props: ImageProps) {
  const {
    src,
    alt,
    ratio,
    fit          = IMAGE_DEFAULTS.fit,
    imgLoading   = IMAGE_DEFAULTS.loading,
    radius,
    width,
    height,
    class: className,
    v:      _v,
    p, px, py, pt, pr, pb, pl,
    m, mx, my, mt, mr, mb, ml,
    ...base } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    IMAGE_TOKENS,
    { radius, ratio, fit },
    "image",
  );

  const spacingStyle = resolveSpacingStyles(
    { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml },
    "image",
  );

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: [
        "image",
        ratio     && "image--ratio",
        ...tokenClasses,
        className,
      ],
      style: [...tokenStyle, ...spacingStyle],
    },
    base,
  );

  return {
    props: {
      class:   cls,
      style,
      ...attrs,
      ...rest,
      src,
      alt,
      loading: imgLoading,
      width,
      height,
    },
  };
}