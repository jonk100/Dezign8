// design/typography/components/code/code.tokens.ts
import type { TypeSize, TypeFamily } from "../../typography.tokens";

export const CODE_DEFAULTS = {
  fam: "mono" as TypeFamily,
} as const;

export const PRE_DEFAULTS = {
  fam: "mono" as TypeFamily,
  size: "sm" as TypeSize,
} as const;
