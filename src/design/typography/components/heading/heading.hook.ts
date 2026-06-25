// design/typography/heading/heading.hook.ts

import type { HeadingProps } from "./heading.props";
import { HEADING_DEFAULTS } from "./heading.tokens";
import { useTypography } from "../../typography.hook";
import { composeClass } from "~/shared/base.hook";

/**
 * Heading-specific wrapper around `useTypography`.
 *
 * Handles only what's unique to headings — semantic `level` and the `h`/
 * `h--{level}` class modifiers — then delegates all token resolution
 * (size, weight, color, etc.) to `useTypography`. This keeps a single
 * implementation of `resolveTokens` + `useBaseCompose` across the whole
 * typography family instead of duplicating it per component.
 *
 * `HeadingProps.weight` is narrowed to `HeadingWeight` at the type level
 * (via interface extension in heading.props.ts), so any `weight` reaching
 * this function — and passed through to `useTypography` — is already
 * guaranteed valid for headings. No runtime re-validation or separate
 * token spec is needed here.
 *
 * @param props - Heading props: `level` plus the inherited (and
 *                narrowed) typography token props.
 *
 * @returns Tag   - The semantic element tag, `"h1"`–`"h6"`, derived from `level`.
 * @returns props - `class`, `style`, and forwarded attrs ready to spread
 *                  onto the rendered heading element.
 *
 * @example
 *   const { Tag, props } = useHeading({ level: 1, weight: "bold" });
 *   <Tag {...props}>Page Title</Tag>
 */
export function useHeading(props: HeadingProps) {
  const {
    level = HEADING_DEFAULTS.level,
    class: className,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    ...typographyProps,
    class: composeClass("h", `h--${level}`, className),
  });

  return {
    Tag:   `h${level}` as const,
    props: typographyAttributes,
  };
}

