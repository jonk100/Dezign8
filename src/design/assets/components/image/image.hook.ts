// design/assets/image/image.hook.ts

import type { ImageProps } from "./image.props";
import { IMAGE_TOKENS, IMAGE_DEFAULTS } from "./image.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose, composeClass } from "~/shared/base.hook";

export function useImage(props: ImageProps) {
  const {
    src,
    alt,
    ratio,
    fit     = IMAGE_DEFAULTS.fit,
    loading = IMAGE_DEFAULTS.loading,
    radius,
    width,
    height,
    class: className,
    v:      _v,
    testId: _testId,
    animation,
    ...rest
  } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    IMAGE_TOKENS,
    { radius, ratio, fit },
    "image",
  );

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: [
        "image",
        ratio     && "image--ratio",
        animation && `animate-${animation}`,
        ...tokenClasses,
        className,
      ],
      style: [...tokenStyle],
    },
    props,
  );

  return {
    props: {
      class:   cls,
      style,
      ...attrs,
      ...rest,
      src,
      alt,
      loading,
      width,
      height,
    },
  };
}