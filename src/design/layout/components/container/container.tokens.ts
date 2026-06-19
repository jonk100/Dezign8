import { composeTokens, dimension, scale } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

export const CONTAINER_SIZE = scale({
  sm: "var(--container--sm)",
  md: "var(--container--md)",
  lg: "var(--container--lg)",
  xl: "var(--container--xl)",
  "2xl": "var(--container--2xl)",
  full: "var(--container--full)",
});

export const CONTAINER_TOKENS = composeTokens(LAYOUT_TOKENS, {
  maxWidth: dimension("max-width", CONTAINER_SIZE),
});
export type ContainerMaxWidth = keyof typeof CONTAINER_TOKENS.maxWidth.values;

export type ContainerTag = "div" | "section" | "article" | "aside" | "main" | "header" | "footer";

export const CONTAINER_DEFAULTS = {
  as: "div" as ContainerTag,
  maxWidth: "lg" as ContainerMaxWidth,
} as const;
