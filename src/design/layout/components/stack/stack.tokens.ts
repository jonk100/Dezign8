/**
 * Stack token definitions.
 */

import { dimension } from "~/shared/tokens";
import { SPACE } from "~/shared/primitives.tokens";

export const STACK_TOKENS = {
  gap: dimension("gap", SPACE, { scope: "stack" }),
};

export type StackGap = keyof typeof STACK_TOKENS.gap.values;

export type StackTag =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "main"
  | "nav";

export const STACK_DEFAULTS = {
  as: "div" as StackTag,
  gap: "md" as StackGap,
} as const;