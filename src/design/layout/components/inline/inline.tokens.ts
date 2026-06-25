import { composeTokens } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

/**
 * - LayoutProps: Gap, Align, Justify
 * - SpacingProps: p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml
 *
 * @example
 * <Inline gap="2xl">     
 * <!--==============BECOMES===========-->
 *      <span style="--inline--gap: var(--space-in--2xl)">
 */

export const INLINE_TOKENS = composeTokens(LAYOUT_TOKENS, {});

export type InlineGap = keyof typeof INLINE_TOKENS.gap.values;
export type InlineTag = "div" | "span" | "ul" | "ol" | "nav";

export const INLINE_DEFAULTS = {
  as: "span" as InlineTag,
  gap: "md" as InlineGap,
} as const;
