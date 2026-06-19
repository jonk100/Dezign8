import { composeTokens } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

export const CENTER_TOKENS = composeTokens(LAYOUT_TOKENS, {});
export type CenterDirection = "x" | "y" | "both";

export const CENTER_DEFAULTS = {
  direction: "both" as CenterDirection,
} as const;
