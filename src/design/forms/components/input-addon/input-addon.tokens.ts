import { defineTokens, dimension, scale } from "~/shared/tokens";

export const INPUT_ADDON_TOKENS = defineTokens({
  paddingX: dimension("padding-x", scale({ default: "var(--space-in--md)" })),
  height: dimension("height", scale({ default: "2.5rem" }), { scope: "input" }),
});
