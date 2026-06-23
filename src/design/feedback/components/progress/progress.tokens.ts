// design/feedback/progress/progress.tokens.ts

/**
 * @file Token spec and defaults for the Progress component.
 * @module design/feedback/progress
 *
 * Progress extends {@link FEEDBACK_TOKENS} with a `type` dimension that
 * selects the rendering strategy: bar, ring, number, or percent.
 *
 * The `type` dimension is scoped to `"progress"` so it emits
 * `progress--bar` (not `feedback--bar`) — these are component-internal
 * modifier classes, not shared category classes.
 *
 * **Size map (bar track height):**
 *   xs  → 2px track
 *   sm  → 4px track
 *   md  → 6px track  ← default
 *   lg  → 10px track
 *   xl  → 16px track
 *
 * **Size map (ring diameter):**
 *   xs  → 24px
 *   sm  → 32px
 *   md  → 40px  ← default
 *   lg  → 56px
 *   xl  → 80px
 *
 * **Size map (number/percent font):**
 *   xs  → --fsf--xl  (display, compact)
 *   sm  → --fsf--2xl
 *   md  → --fsf--3xl ← default
 *   lg  → --fsf--4xl
 *   xl  → clamp(3rem, 8vw, 5rem) (hero)
 *
 * @see {@link FEEDBACK_TOKENS} in `feedback/feedback.tokens.ts`
 * @see {@link useProgress}     in `feedback/progress/progress.hook.ts`
 */

import { composeTokens, dimension, scale } from "~/shared/tokens";
import { FEEDBACK_TOKENS }                 from "../../feedback.tokens";

// ─── PROGRESS TYPE ───────────────────────────────────────────────────────────

const PROGRESS_TYPE = scale({
  bar:     null,   // horizontal track + fill div
  ring:    null,   // SVG circle track + stroke
  number:  null,   // large display numeral: "6/10"
  percent: null,   // large display numeral: "84%"
});

// ─── SPEC ────────────────────────────────────────────────────────────────────

export const PROGRESS_TOKENS = composeTokens(FEEDBACK_TOKENS, {
  type: dimension("type", PROGRESS_TYPE, { modifier: true, scope: "progress" }),
});

// ─── DERIVED TYPES ───────────────────────────────────────────────────────────

export type ProgressType = keyof typeof PROGRESS_TOKENS.type.values;

// ─── DEFAULTS ────────────────────────────────────────────────────────────────

export const PROGRESS_DEFAULTS = {
  variant:       "soft",
  color:         "primary",
  size:          "md",
  radius:        "full",
  type:          "bar",
  max:           100,
  showValue:     false,
  indeterminate: false,
} as const;
