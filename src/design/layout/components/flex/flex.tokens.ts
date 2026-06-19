import { composeTokens, dimension, scale } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

export const FLEX_DIRECTION = scale({
  row: "row",
  col: "column",
  "row-rev": "row-reverse",
  "col-rev": "column-reverse",
});

export const FLEX_WRAP = scale({
  nowrap: "nowrap",
  wrap: "wrap",
  "wrap-rev": "wrap-reverse",
});

export const FLEX_TOKENS = composeTokens(LAYOUT_TOKENS, {
  direction: dimension("direction", FLEX_DIRECTION),
  wrap: dimension("wrap", FLEX_WRAP),
});
export type FlexDirection = keyof typeof FLEX_TOKENS.direction.values;
export type FlexWrap = keyof typeof FLEX_TOKENS.wrap.values;

export type FlexTag = "div" | "ul" | "ol" | "nav" | "header" | "footer" | "section" | "article" | "aside" | "main" | "form";

export const FLEX_DEFAULTS = {
  as: "div" as FlexTag,
  direction: "row" as FlexDirection,
  wrap: "nowrap" as FlexWrap,
} as const;
