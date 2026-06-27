import { composeTokens } from "~/shared/tokens";
import { DATA_TOKENS } from "~/data/data.tokens";
import type { DataSize } from "~/data/data.tokens";

export const METRIC_DEFAULTS = {
  size: "comfortable" as DataSize,
} as const;

export const METRIC_TOKENS = composeTokens(DATA_TOKENS, {});
