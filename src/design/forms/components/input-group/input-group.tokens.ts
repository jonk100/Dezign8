import { defineTokens, dimension } from "~/shared/tokens";
import { SPACE } from "~/shared/primitives.tokens";

export const INPUT_GROUP_TOKENS = defineTokens({
  spacing: dimension("spacing", SPACE),
});

export type InputGroupSpacing = keyof typeof INPUT_GROUP_TOKENS.spacing.values;
