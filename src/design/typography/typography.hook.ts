// design/typography/typography.hook.ts

import type { TypographyProps } from "./typography.props";
import { TYPOGRAPHY_TOKENS } from "./typography.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

/**
 * Resolves typography token props into inline CSS custom properties and
 * BEM modifier classes, then composes them with base component attributes.
 *
 * This is the single point of contact with `resolveTokens` /
 * `useBaseCompose` for the entire typography family. Components that
 * specialize typography (Heading, Body, Label, …) should construct their
 * own `*Props` interface by extending `TypographyProps` — narrowing
 * individual fields (e.g. `weight`) via interface property re-declaration —
 * and then delegate to this hook rather than re-implementing token
 * resolution themselves.
 *
 * Narrowing is enforced where the props value is constructed (JSX call site
 * or object literal), via normal interface-extension assignability rules —
 * not inside this hook. By the time a `HeadingProps` reaches here, its
 * `weight` is already guaranteed to be a valid `HeadingWeight`, so resolving
 * against the full `TYPOGRAPHY_TOKENS` spec is safe: `resolveTokens` does a
 * literal key lookup, so a narrowed value resolves identically whether the
 * spec passed in is `TYPOGRAPHY_TOKENS` or a narrowed variant.
 *
 * @param props - Typography prop set, or a specialized subtype
 *                (e.g. `HeadingProps`) that narrows individual token fields.
 *
 * @returns typographyAttributes - `class`, `style`, and any forwarded
 *          attrs/rest props ready to spread onto the rendered element.
 *
 * @example
 *   const { typographyAttributes } = useTypography({ size: "lg", weight: "medium" });
 *   <p {...typographyAttributes}>Hello</p>
 */
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