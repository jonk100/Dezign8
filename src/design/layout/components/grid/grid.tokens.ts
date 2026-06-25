import { composeTokens, dimension, scale } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

export const GRID_COLUMNS = scale({
  1: "repeat(1, minmax(0, 1fr))",
  2: "repeat(2, minmax(0, 1fr))",
  3: "repeat(3, minmax(0, 1fr))",
  4: "repeat(4, minmax(0, 1fr))",
  5: "repeat(5, minmax(0, 1fr))",
  6: "repeat(6, minmax(0, 1fr))",
  7: "repeat(7, minmax(0, 1fr))",
  8: "repeat(8, minmax(0, 1fr))",
  9: "repeat(9, minmax(0, 1fr))",
  10: "repeat(10, minmax(0, 1fr))",
  11: "repeat(11, minmax(0, 1fr))",
  12: "repeat(12, minmax(0, 1fr))",
});

// Add below GRID_COLUMNS
export const GRID_FIT = scale({
  xs: "repeat(auto-fit, minmax(10rem, 1fr))",
  sm: "repeat(auto-fit, minmax(14rem, 1fr))",
  md: "repeat(auto-fit, minmax(18rem, 1fr))",
  lg: "repeat(auto-fit, minmax(22rem, 1fr))",
  xl: "repeat(auto-fit, minmax(26rem, 1fr))",
});

export const GRID_TOKENS = composeTokens(LAYOUT_TOKENS, {
  columns: dimension("columns", GRID_COLUMNS),
  fit:     dimension("columns", GRID_FIT)
});
export type GridColumns = keyof typeof GRID_TOKENS.columns.values;
export type GridFit     = keyof typeof GRID_TOKENS.fit.values;

export type GridTag = "div" | "section" | "article" | "aside" | "main" | "ul" | "ol" | "form";

export const GRID_DEFAULTS = {
  as: "div" as GridTag,
} as const;
