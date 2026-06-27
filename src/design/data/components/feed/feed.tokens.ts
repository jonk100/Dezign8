import { composeTokens, dimension, scale } from "~/shared/tokens";
import { DATA_TOKENS } from "~/data/data.tokens";

export const FEED_DEFAULTS = {
  orientation: "vertical" as "vertical" | "horizontal",
} as const;

export const FEED_TOKENS = composeTokens(DATA_TOKENS, {
  orientation: dimension("orientation", scale({ vertical: null, horizontal: null }), { modifier: true }),
});
