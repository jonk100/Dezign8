// design/feedback/spinner/spinner.tokens.ts

/**
 * @file Token spec and defaults for the Spinner component.
 * @module design/feedback/spinner
 *
 * Spinner extends {@link FEEDBACK_TOKENS} with two dimensions:
 *   - `speed`     — animation duration (slow/normal/fast)
 *   - `direction` — rotation direction (clockwise/counterclockwise)
 *
 * Both are scoped to `"spinner"` so their modifier classes are
 * `spinner--slow`, `spinner--fast`, etc. (not `feedback--slow`).
 *
 * Size map (spinner diameter + SVG stroke-width):
 *   xs  → 14px / stroke 2
 *   sm  → 18px / stroke 2.5
 *   md  → 24px / stroke 2.5  ← default
 *   lg  → 32px / stroke 3
 *   xl  → 48px / stroke 3.5
 *
 * @see {@link FEEDBACK_TOKENS} in `feedback/feedback.tokens.ts`
 * @see {@link useSpinner}      in `feedback/spinner/spinner.hook.ts`
 */

import { composeTokens, dimension, scale } from "~/shared/tokens";
import { FEEDBACK_TOKENS }                 from "../../feedback.tokens";

// ─── SPEED ───────────────────────────────────────────────────────────────────

const SPINNER_SPEED = scale({
  slow:   null,   // 1.4s
  normal: null,   // 0.8s (default)
  fast:   null,   // 0.4s
});

// ─── DIRECTION ───────────────────────────────────────────────────────────────

const SPINNER_DIRECTION = scale({
  clockwise:        null,   // default
  counterclockwise: null,   // animation-direction: reverse
});

// ─── SPEC ────────────────────────────────────────────────────────────────────

export const SPINNER_TOKENS = composeTokens(FEEDBACK_TOKENS, {
  speed:     dimension("speed",     SPINNER_SPEED,     { modifier: true, scope: "spinner" }),
  direction: dimension("direction", SPINNER_DIRECTION, { modifier: true, scope: "spinner" }),
});

// ─── DERIVED TYPES ───────────────────────────────────────────────────────────

export type SpinnerSpeed     = keyof typeof SPINNER_TOKENS.speed.values;
export type SpinnerDirection = keyof typeof SPINNER_TOKENS.direction.values;

// ─── DEFAULTS ────────────────────────────────────────────────────────────────

export const SPINNER_DEFAULTS = {
  variant:   "ghost",          // no bg/border — spinner stands alone
  color:     "primary",
  size:      "md",
  radius:    "full",
  speed:     "normal",
  direction: "clockwise",
  label:     "Loading",
} as const;
