// design/assets/image/image.hook.ts

import type { ImageProps } from "./image.props";
import { IMAGE_TOKENS, IMAGE_DEFAULTS } from "./image.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

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
    ...base } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    IMAGE_TOKENS,
    { radius, ratio, fit },
    "image",
  );

  const isCssValue = (val: string | number | undefined) => typeof val === "string" && Number.isNaN(Number(val));
  const isHtmlValue = (val: string | number | undefined) => typeof val === "number" || (typeof val === "string" && !Number.isNaN(Number(val)));

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: [
        "image",
        ratio     && "image--ratio",
        ...tokenClasses,
        className,
      ],
      style: [
        ...tokenStyle,
        isCssValue(width) ? `width: ${width}` : undefined,
        isCssValue(height) ? `height: ${height}` : undefined,
      ],
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
      width:   isHtmlValue(width) ? width : undefined,
      height:  isHtmlValue(height) ? height : undefined,
    },
  };
}