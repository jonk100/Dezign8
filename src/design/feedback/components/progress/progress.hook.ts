// design/feedback/progress/progress.hook.ts

/**
 * @file Component hook for the Progress component.
 * @module design/feedback/progress
 *
 * {@link useProgress} translates {@link ProgressProps} into the props and
 * computed values that `Progress.astro` needs.
 *
 * **Key computations:**
 * - `fillPercent` — clamped 0–100, written as `--progress--fill` inline style.
 * - `displayValue` — string shown by `showValue` (e.g. `"84%"`) or for
 *   `number`/`percent` type display.
 * - `ARIA attributes` — `role="progressbar"`, `aria-valuenow`, `aria-valuemax`,
 *   `aria-valuemin`, `aria-label`, `aria-busy` (indeterminate).
 *
 * **Ring geometry:**
 * For `type="ring"` the hook also computes `strokeDasharray` and
 * `strokeDashoffset` based on the ring circumference so the SVG fill
 * animates correctly. Both are written as inline style vars.
 *
 * @see {@link useFeedback}      in `feedback/feedback.hook.ts`
 * @see {@link ProgressProps}    in `feedback/progress/progress.props.ts`
 * @see {@link PROGRESS_DEFAULTS} in `feedback/progress/progress.tokens.ts`
 */

import type { ProgressProps }  from "./progress.props";
import { PROGRESS_DEFAULTS }   from "./progress.tokens";
import { PROGRESS_TOKENS }     from "./progress.tokens";
import { useFeedback }         from "../../feedback.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";
import { resolveTokens }       from "~/shared/tokens";

// Ring geometry constants
// The SVG viewBox is 0 0 36 36; circle is centered at 18,18 with r=15.9
const RING_RADIUS        = 15.9155; // matches typical ring SVG
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS; // ≈ 100

/**
 * Resolves {@link ProgressProps} into everything `Progress.astro` needs.
 *
 * @returns `{ Tag, props, type, fillPercent, displayValue, indeterminate, ringAttrs }`
 */
export function useProgress(props: ProgressProps) {
  const {
    value,
    max           = PROGRESS_DEFAULTS.max,
    type          = PROGRESS_DEFAULTS.type,
    showValue     = PROGRESS_DEFAULTS.showValue,
    indeterminate = PROGRESS_DEFAULTS.indeterminate,
    ...feedbackProps
  } = props;

  // ── Fill computation ────────────────────────────────────────────────────
  const rawFraction   = value !== undefined ? Math.min(Math.max(value / max, 0), 1) : 0;
  const fillPercent   = Math.round(rawFraction * 100);

  // ── Display value strings ───────────────────────────────────────────────
  const displayPercent = indeterminate ? "—" : `${fillPercent}%`;
  const displayNumber  = indeterminate ? "—" : `${value ?? 0}/${max}`;
  const displayValue   = type === "number" ? displayNumber : displayPercent;

  // ── Ring SVG attributes ─────────────────────────────────────────────────
  // strokeDashoffset controls how much of the circumference is "filled"
  const ringOffset = indeterminate
    ? RING_CIRCUMFERENCE * 0.75                         // leave 25% arc for animation
    : RING_CIRCUMFERENCE * (1 - rawFraction);

  const ringAttrs = {
    circumference: RING_CIRCUMFERENCE,
    offset:        ringOffset,
  };

  // ── Token resolution (type modifier) ────────────────────────────────────
  const { classes: typeClasses } = resolveTokens(
    PROGRESS_TOKENS,
    { type },
    "feedback",   // scope "progress" on the type dimension makes it "progress--bar"
  );

  // ── useFeedback with progress-opinionated defaults ──────────────────────
  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({
    variant: PROGRESS_DEFAULTS.variant,
    color:   PROGRESS_DEFAULTS.color,
    size:    PROGRESS_DEFAULTS.size,
    radius:  PROGRESS_DEFAULTS.radius,
    ...feedbackProps,
  });

  // ── ARIA ────────────────────────────────────────────────────────────────
  const ariaAttrs: Record<string, string | number | undefined> = {
    role:             "progressbar",
    "aria-valuemin":  0,
    "aria-valuemax":  max,
    "aria-valuenow":  indeterminate ? undefined : value,
    "aria-busy":      indeterminate ? "true" : undefined,
  };

  return {
    Tag: "div" as const,
    props: {
      class: composeClass(
        feedbackClass,
        "progress",
        ...typeClasses,                                 // "progress--bar", "progress--ring" etc.
        indeterminate && "progress--indeterminate",
      ),
      style: composeStyle(
        feedbackStyle,
        `--progress--fill: ${fillPercent}%`,
        `--progress--offset: ${ringOffset}`,
        `--progress--circumference: ${RING_CIRCUMFERENCE}`,
      ),
      ...ariaAttrs,
      ...feedbackAttrs,
      ...rest,
    },
    type,
    fillPercent,
    displayValue,
    displayPercent,
    displayNumber,
    showValue,
    indeterminate,
    ringAttrs,
  };
}
