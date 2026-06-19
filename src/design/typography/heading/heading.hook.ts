// design/typography/heading/heading.hook.ts
import type { HeadingProps } from "./heading.props";
import { HEADING_TOKENS, HEADING_DEFAULTS } from "./heading.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose, composeClass } from "~/shared/base.hook";

export function useHeading(props: HeadingProps) {
  const {
    // h1, h2, h3, h4, h5, h6
    level = HEADING_DEFAULTS.level,
    
    // token props — all opt-in, CSS fallbacks per level handle defaults
    size, weight, color, align, leading, tracking,
    fam, transform, wrap, decoration,

    // base props
    class:     className,
    v:         _v,
    testId:    _testId,
    bg,
    animation,
    ...rest
  } = props;

  // Calls resolveTokens directly with HEADING_TOKENS rather than
  // delegating to useTypography — preserves the narrowed weight type
  // end-to-end. Delegating would widen weight back to the full TypeWeight.
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    HEADING_TOKENS,
    { size, weight, color, align, leading, tracking, fam, transform, wrap, decoration },
    "typography",
  );

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: [
        "typography",
        "h",
        ...tokenClasses,
        `h--${level}`,
        animation && `animate-${animation}`,
        className,
      ],
      style: [
        ...tokenStyle,
        bg && `--typography--bg: ${bg}`,
      ],
    },
    props,
  );

  return {
    Tag: `h${level}` as const,
    props: { class: cls, style, ...attrs, ...rest },
  };
}
  