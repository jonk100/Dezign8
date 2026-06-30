import { defineTokens, dimension, scale } from "~/shared/tokens";
import { SPACE } from "~/shared/primitives.tokens";

export const AVATAR_GROUP_TOKENS = defineTokens({
  spacing: dimension("spacing", SPACE),
  ringWidth: dimension("ring-width", scale({ default: "2px" })),
  ringColor: dimension("ring-color", scale({ default: "var(--bg--1, #ffffff)" })),
});

export type AvatarGroupSpacing = keyof typeof AVATAR_GROUP_TOKENS.spacing.values;
