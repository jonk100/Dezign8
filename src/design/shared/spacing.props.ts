// design/shared/spacing.props.ts

import { SPACE } from "./primitives.tokens";
import type { Space } from "./primitives.tokens";

/**
 * Interface: `SpacingProps`
 * 
 * Defines standard margin and padding shorthand properties used across components.
 * These properties support single primitive space tokens (e.g., "md") or space-separated
 * token combinations. The `resolveSpacingStyles` function converts these props into
 * CSS variables for the layout system.
 */
export interface SpacingProps {
  /** Padding for all sides. */
  p?:  Space | string | undefined;
  /** Padding for the horizontal (inline) axis (left and right). */
  px?: Space | undefined;
  /** Padding for the vertical (block) axis (top and bottom). */
  py?: Space | undefined;
  /** Padding top (block-start). */
  pt?: Space | undefined;
  /** Padding right (inline-end). */
  pr?: Space | undefined;
  /** Padding bottom (block-end). */
  pb?: Space | undefined;
  /** Padding left (inline-start). */
  pl?: Space | undefined;
  
  /** Margin for all sides. */
  m?:  Space | string | undefined;
  /** Margin for the horizontal (inline) axis (left and right). */
  mx?: Space | undefined;
  /** Margin for the vertical (block) axis (top and bottom). */
  my?: Space | undefined;
  /** Margin top (block-start). */
  mt?: Space | undefined;
  /** Margin right (inline-end). */
  mr?: Space | undefined;
  /** Margin bottom (block-end). */
  mb?: Space | undefined;
  /** Margin left (inline-start). */
  ml?: Space | undefined;
}

export function resolveSpacingStyles(
  props: SpacingProps,
  prefix: string,
): string[] {
  const keys = ["p","px","py","pt","pr","pb","pl","m","mx","my","mt","mr","mb","ml"] as const;
  const results: string[] = [];

  for (const k of keys) {
    const v = props[k];
    if (v == null) continue;
    const resolved = v
      .split(" ")
      .map(token => SPACE[token as Space] ?? token)
      .join(" ");
    results.push(`--${prefix}--${k}: ${resolved}`);
  }

  return results;
}