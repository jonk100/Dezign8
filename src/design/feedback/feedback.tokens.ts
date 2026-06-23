// design/feedback/feedback.tokens.ts

/**
 * @file Category token spec for the feedback component family.
 * @module design/feedback
 *
 * This file is the single source of truth for which token dimensions the
 * `feedback` category exposes and what values each accepts.
 *
 * **What this file owns:**
 * - {@link FEEDBACK_SIZE}    — modifier-class size scale (xs → xl)
 * - {@link FEEDBACK_VARIANT} — visual treatment scale (solid, soft, outlined, ghost, dashed)
 * - {@link FEEDBACK_TOKENS}  — the assembled category spec
 * - {@link FeedbackSize}, {@link FeedbackVariant}, {@link FeedbackColor},
 *   {@link FeedbackRadius}, {@link FeedbackPlacement} — derived types
 *
 * **Architecture position:**
 * ```
 * primitives.tokens.ts      COLOR_DIM, RADIUS_DIM …
 *        ↑
 * feedback/feedback.tokens.ts     FEEDBACK_TOKENS   ← this file
 *        ↑
 * feedback/badge/badge.tokens.ts  re-export FEEDBACK_TOKENS as BADGE_TOKENS
 * feedback/progress/progress.tokens.ts  composeTokens with type dimension
 * feedback/spinner/spinner.tokens.ts    composeTokens with speed+direction
 * ```
 *
 * **Key difference from forms/triggers:**
 * Both `size` and `variant` are modifier-class only (`null` values). Each
 * component hook maps the size modifier class to its own spatial channels via
 * a lookup table (e.g. badge maps `sm` → font-size + padding; spinner maps
 * `sm` → diameter). This mirrors the trigger SIZE pattern.
 *
 * @see {@link useFeedback} in `feedback/feedback.hook.ts` — resolves this spec
 * @see {@link FeedbackProps} in `feedback/feedback.props.ts` — typed prop surface
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM, COLOR_DIM }          from "~/shared/primitives.tokens";

// ─── SIZE ────────────────────────────────────────────────────────────────────
//
// Modifier-class only — same key names as triggers but different physical
// meaning. Each component maps these classes to its own spatial channels.
//
// xs  → Compact inline (badge on icon, dot indicator)
// sm  → Standard count badge, small spinner
// md  → Default — tag, chip, normal spinner
// lg  → Prominent label badge, progress bar
// xl  → Hero progress display, large status indicator

const FEEDBACK_SIZE = scale({
  xs:  null,
  sm:  null,
  md:  null,
  lg:  null,
  xl:  null,
});

// ─── VARIANT ─────────────────────────────────────────────────────────────────
//
// Visual treatment. All `null` — modifier class only, no CSS var.
// CSS rules per variant live in `feedback.css`.
//
// solid    → Filled bg at color-base. Opaque. Strong badges.
// soft     → Light bg at color-subtle. Border at color-border. Chips, tags.
// outlined → Transparent bg. Solid border at color-border.
// ghost    → No border, no bg. Text-color only. Spinners.
// dashed   → Dashed border. Transparent bg. Skeleton loaders, dashed progress.

const FEEDBACK_VARIANT = scale({
  solid:    null,
  soft:     null,
  outlined: null,
  ghost:    null,
  dashed:   null,
});

// ─── PLACEMENT ───────────────────────────────────────────────────────────────
//
// Not a token dimension — placement is a string union used in FeedbackProps
// and applied as a data attribute. CSS handles absolute positioning.

export type FeedbackPlacement =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";

// ─── SPEC ────────────────────────────────────────────────────────────────────

/**
 * Shared token spec for all feedback components in the `feedback` category.
 *
 * Consumed by {@link useFeedback} via `resolveTokens(FEEDBACK_TOKENS, picks, "feedback")`.
 *
 * **Channel / output map:**
 *
 * | prop      | `resolveTokens` output          | CSS reads in `feedback.css`     |
 * |-----------|---------------------------------|---------------------------------|
 * | `size`    | class `feedback--md`            | Each component's size map       |
 * | `variant` | class `feedback--soft`          | `.feedback--soft { … }`         |
 * | `color`   | class `feedback--primary`       | Color channels from useFeedback |
 * | `radius`  | `--feedback--radius: var(…)`    | `border-radius`                 |
 */
export const FEEDBACK_TOKENS = defineTokens({
  size:    dimension("size",    FEEDBACK_SIZE,    { modifier: true }),
  variant: dimension("variant", FEEDBACK_VARIANT, { modifier: true }),
  color:   COLOR_DIM,
  radius:  RADIUS_DIM,
});

// ─── DERIVED TYPES ───────────────────────────────────────────────────────────

/**
 * Valid values for the `size` prop on any feedback component.
 * @default `"md"` — applied by {@link useFeedback}
 */
export type FeedbackSize = keyof typeof FEEDBACK_TOKENS.size.values;

/**
 * Valid values for the `variant` prop on any feedback component.
 * @default `"soft"` — applied by {@link useFeedback}
 */
export type FeedbackVariant = keyof typeof FEEDBACK_TOKENS.variant.values;

/**
 * Valid color roles for feedback components.
 * Derived from {@link COLOR_DIM} (COLOR_ROLE in primitives.tokens.ts).
 * @default `"neutral"` — applied by {@link useFeedback}
 */
export type FeedbackColor = keyof typeof FEEDBACK_TOKENS.color.values;

/**
 * Valid border-radius values for feedback components.
 * @default `"full"` — pill shape suits most feedback indicators.
 */
export type FeedbackRadius = keyof typeof FEEDBACK_TOKENS.radius.values;
