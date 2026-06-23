// design/feedback/spinner/spinner.hook.ts

/**
 * @file Component hook for the Spinner component.
 * @module design/feedback/spinner
 *
 * {@link useSpinner} translates {@link SpinnerProps} into the props that
 * `Spinner.astro` needs, including the resolved speed/direction modifier
 * classes written to the spinner element directly.
 *
 * @see {@link useFeedback}      in `feedback/feedback.hook.ts`
 * @see {@link SpinnerProps}     in `feedback/spinner/spinner.props.ts`
 * @see {@link SPINNER_DEFAULTS} in `feedback/spinner/spinner.tokens.ts`
 */

import type { SpinnerProps } from "./spinner.props";
import { SPINNER_DEFAULTS }  from "./spinner.tokens";
import { SPINNER_TOKENS }    from "./spinner.tokens";
import { useFeedback }       from "../../feedback.hook";
import { composeClass }      from "~/shared/base.hook";
import { resolveTokens }     from "~/shared/tokens";
import { icons }             from "~/shared/icons/index";

/**
 * Resolves {@link SpinnerProps} into the props `Spinner.astro` spreads.
 *
 * @returns `{ Tag, props, label, hasIcon, icon }`
 *
 * @example
 * ```astro
 * const { Tag, props, label, hasIcon, icon } = useSpinner(Astro.props as SpinnerProps);
 * ```
 */
export function useSpinner(props: SpinnerProps) {
  const {
    speed     = SPINNER_DEFAULTS.speed,
    direction = SPINNER_DEFAULTS.direction,
    icon      = "spinner",
    label     = SPINNER_DEFAULTS.label,
    color     = SPINNER_DEFAULTS.color,
    ...feedbackProps
  } = props;

  // ── Resolve the icon SVG component from the registry ───────────────────
  const IconComponent = icons[icon];

  // ── Resolve speed + direction modifier classes ──────────────────────────
  // These are scoped to "spinner" in the token spec, so they produce
  // "spinner--slow", "spinner--fast", "spinner--counterclockwise".
  const { classes: motionClasses } = resolveTokens(
    SPINNER_TOKENS,
    { speed, direction },
    "spinner",
  );

  // ── useFeedback with spinner-opinionated defaults ───────────────────────
  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({
    variant: SPINNER_DEFAULTS.variant,
    color:   color === "inherit" ? "neutral" : color,
    size:    SPINNER_DEFAULTS.size,
    radius:  SPINNER_DEFAULTS.radius,
    ...feedbackProps,
  });

  return {
    Tag: "span" as const,
    props: {
      class: composeClass(
        feedbackClass,
        "spinner",
        color === "inherit" && "spinner--inherit",
        ...motionClasses,        // spinner--fast, spinner--counterclockwise, etc.
      ),
      style:      feedbackStyle,
      role:       "status" as const,
      ...feedbackAttrs,
      ...rest,
    },
    label,
    IconComponent,
  };
}
