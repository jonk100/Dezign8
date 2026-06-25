// design/layout/layout.hook.ts

import type { LayoutProps } from "./layout.props";
import { LAYOUT_TOKENS } from "./layout.tokens";
import { resolveTokens } from "~/shared/tokens";
import { resolveSpacingStyles } from "~/shared/spacing.props";
import { useBaseCompose } from "~/shared/base.hook";
import { COLOR_ROLE } from "~/shared/primitives.tokens";
import { resolveColorRole } from "~/shared/base.hook";
import "./layout.css";

/**
 * Hook: `useLayout`
 * 
 * Orchestrates the box model, flex/grid properties, and base styling for layout components.
 * It resolves standard layout tokens (gap, align, justify) and spacing props (padding, margin)
 * into a consolidated set of CSS classes and inline styles.
 * 
 * @param {LayoutProps} props - Layout and base component properties.
 * @returns An object with resolved `layoutClass`, `layoutStyle`, `layoutAttrs`, and unused `rest` props.
 */
export function useLayout(props: LayoutProps) {
  const {
    gap,
    align,
    justify,
    p, px, py, pt, pr, pb, pl,
    m, mx, my, mt, mr, mb, ml,
    class: className,
    v:      _v,
    testId: _testId,
    bg,
    ...base
  } = props;

  // Resolve standard layout dimension tokens (e.g., flex alignments, gap)
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    LAYOUT_TOKENS,
    { gap, align, justify },
    "layout",
  );

  // Resolve spacing shorthand properties (p, m, pt, mx, etc.) into CSS variables
  const spacingStyle = resolveSpacingStyles(
    { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml },
    "layout",
  );

  // Compose the final classes and styles, merging with any provided custom class/style
  const { className: cls, style, attrs, rest: restAttrs, spacing } = useBaseCompose(
    {
      className: [
        "layout",
        ...tokenClasses,
        className,
      ],
      style: [
        ...tokenStyle,
        ...spacingStyle,
        ...(bg ? resolveColorRole(bg, "layout--bg") : []),
      ],
    },
    base,
  );

  return {
    layoutClass:  cls,
    layoutStyle:  style,
    layoutAttrs:  attrs,
    rest: restAttrs,
    spacing,
  };
}