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

export const SCREEN_TOKENS = composeTokens(LAYOUT_TOKENS, {});

export type ScreenTag = "div" | "section" | "article" | "main" | "section" | "span";
export type PageHeight = "full" | "90vh" | "auto";
export type OverflowOptions = "auto" | "hidden" | "scroll" | "visible";
export type PageCentered = "all" | "none" | "x" | "y";

export type ScreenGap = keyof typeof SCREEN_TOKENS.gap.values;

export const SCREEN_DEFAULTS = {
  as: "div" as ScreenTag,
  height: "full" as PageHeight,
  overflow: "auto" as OverflowOptions,
  centered: "none" as PageCentered,
  gap: "md" as ScreenGap,
} as const;