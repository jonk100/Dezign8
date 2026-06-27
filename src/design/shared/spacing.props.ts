// design/shared/spacing.props.ts

import { SPACE } from "./primitives.tokens";
import type { Space } from "./primitives.tokens";

/**
 * A spacing value: a single space token ("md"), a space-separated set of tokens
 * ("sm lg"), or a raw CSS length passed through untouched ("99px", "1rem 2rem").
 * Authoring stays loose on purpose; `resolveSpacingStyles` maps known tokens to
 * their CSS vars and passes anything unrecognized straight through.
 */
export type SpaceValue = Space | (string & {}) | undefined;

/**
 * Interface: `SpacingProps`
 * 
 * Defines standard margin and padding shorthand properties used across components.
 * These properties support single primitive space tokens (e.g., "md") or space-separated
 * token combinations. The `resolveSpacingStyles` function converts these props into
 * CSS variables for the layout system.
 */
export interface SpacingProps {
  /** Padding, all sides. */            p?:  SpaceValue;
  /** Padding, inline axis (l/r). */    px?: SpaceValue;
  /** Padding, block axis (t/b). */     py?: SpaceValue;
  /** Padding top (block-start). */     pt?: SpaceValue;
  /** Padding right (inline-end). */    pr?: SpaceValue;
  /** Padding bottom (block-end). */    pb?: SpaceValue;
  /** Padding left (inline-start). */   pl?: SpaceValue;

  /** Margin, all sides. */             m?:  SpaceValue;
  /** Margin, inline axis (l/r). */     mx?: SpaceValue;
  /** Margin, block axis (t/b). */      my?: SpaceValue;
  /** Margin top (block-start). */      mt?: SpaceValue;
  /** Margin right (inline-end). */     mr?: SpaceValue;
  /** Margin bottom (block-end). */     mb?: SpaceValue;
  /** Margin left (inline-start). */    ml?: SpaceValue;
}

// Call this in a component hook (not in useBaseCompose) to convert spacing props
// into CSS custom property strings, e.g. "--image--mt: var(--space-out--lg)".
// Pass the same prefix used in the component's CSS (e.g. "image" → --image--mt).
// See layout.hook.ts for the reference implementation.
export function resolveSpacingStyles(
  props: SpacingProps,
  prefix: string,
): string[] {
  const keys = ["p","px","py","pt","pr","pb","pl","m","mx","my","mt","mr","mb","ml"] as const;
  const results: string[] = [];

  for (const k of keys) {
    const v = props[k];
    if (v == null) continue;
    const resolved = v
      .trim()
      .split(/\s+/)
      .map(token => SPACE[token as Space] ?? token)
      .join(" ");
    if (resolved) results.push(`--${prefix}--${k}: ${resolved}`);
  }

  return results;
}

// ponytail: simplified implementation; assumes SPACE keys are valid CSS values
if (process.env.NODE_ENV === "development") {
  const assert = (cond: boolean, msg: string) => { if (!cond) throw new Error(`resolveSpacingStyles: ${msg}`); };
  const r1 = resolveSpacingStyles({ p: "md" }, "box");
  assert(r1.some(s => s.startsWith("--box--p:")), "single token");
  const r2 = resolveSpacingStyles({ p: "sm lg" }, "box");
  assert((r2[0] ?? "").split(":")[1]?.trim().split(" ").length === 2, "multi-token split");
  const r3 = resolveSpacingStyles({ p: "99px" }, "box");
  assert((r3[0] ?? "").includes("99px"), "unknown token passthrough");
  assert(resolveSpacingStyles({}, "box").length === 0, "empty props");
  const r4 = resolveSpacingStyles({ px: "sm lg", mt: "99px" }, "box");
  assert(r4.length === 2, "axis + corner keys resolve");
  assert((r4[0] ?? "").startsWith("--box--px:"), "px key honored");
  const r5 = resolveSpacingStyles({ p: "sm  lg" }, "box"); // double space
  assert((r5[0] ?? "").split(":")[1]?.trim().split(" ").length === 2, "collapses whitespace");
}