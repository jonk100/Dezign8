import { composeTokens } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";


export const INLINE_TOKENS = composeTokens(LAYOUT_TOKENS, {});

export type InlineTag = "div" | "span" | "ul" | "ol" | "nav";

export const INLINE_DEFAULTS = {
  as: "span" as InlineTag,
} as const;
