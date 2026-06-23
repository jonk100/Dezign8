// design/typography/components/prose/prose.tokens.ts
import type { TypeSize, TypeWeight, TypeColor, TypeLeading } from "../../typography.tokens";

export const PROSE_DEFAULTS = {
  size:    "base"    as TypeSize,
  weight:  "regular" as TypeWeight,
  color:   "base"    as TypeColor,
  leading: "relaxed" as TypeLeading, // Great for reading long-form content
} as const;
