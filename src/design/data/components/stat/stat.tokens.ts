import { composeTokens } from "~/shared/tokens";
import { DATA_TOKENS } from "../../data.tokens";
import type { DataSize } from "../../data.tokens";

export const STAT_DEFAULTS = {
  size: "comfortable" as DataSize,
} as const;

export const STAT_TOKENS = composeTokens(DATA_TOKENS, {});