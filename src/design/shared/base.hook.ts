// design/shared/base.hook.ts

import type { BaseComponentProps } from "./base.props";
import type { ColorRole }          from "./primitives.tokens";
import { getMotionAttrs }          from "./motion/motion.utils";

export type ClassToken = string | false | null | undefined;
export type StyleToken = string | false | null | undefined;

export interface BaseComposeOptions {
  className?: ClassToken[];
  style?:     StyleToken[];
  attrs?:     Record<string, unknown>;
  /** Computed disabled state. Emits aria-disabled + data-disabled. Overrides base.disabled. */
  disabled?:  boolean;
  /** Computed loading state. Emits aria-busy + data-loading. Overrides base.loading. */
  loading?:   boolean;
}

export function composeClass(...parts: ClassToken[]): string {
  return parts.filter(Boolean).join(" ");
}

export function composeStyle(...parts: StyleToken[]): string {
  return parts.filter(Boolean).join("; ");
}

export function useBaseCompose(
  options: BaseComposeOptions,
  base?: BaseComponentProps,
) {
  // Strip all known non-DOM base props so they never appear as HTML attributes.
  // Spacing props (p/m/pt/etc.) are stripped here and returned in `spacing`, but
  // NOT automatically applied — unlike motion/bg/v which are handled here.
  // To wire spacing up in a component hook:
  //   1. Destructure spacing props from your props before passing `...base` here
  //   2. Call resolveSpacingStyles({ p, px, … }, "component-prefix") from spacing.props.ts
  //   3. Spread the result into the `style` array passed to useBaseCompose
  //   4. Add padding/margin var() reads to the component's CSS (see layout.css for the pattern)
  const {
    v, testId, loading: baseLoading, disabled: baseDisabled, bg,
    motion, mDistance, action, target,
    class: baseClass, style: baseStyle,
    p, px, py, pt, pr, pb, pl,
    m, mx, my, mt, mr, mb, ml,
    ...rest
  } = (base ?? {}) as BaseComponentProps;

  const isDisabled = options.disabled ?? baseDisabled;
  const isLoading  = options.loading  ?? baseLoading;

  const motionData = motion ? getMotionAttrs(motion) : null;
  const motionStyles: string[] = [];
  
  if (mDistance) {
    if (mDistance.startsWith("x") && !isNaN(Number(mDistance.slice(1)))) {
      motionStyles.push(`--m--scale: ${mDistance.slice(1)}`);
    } else {
      motionStyles.push(`--m--dist: ${mDistance}`);
    }
  }

  const className = composeClass(...(options.className ?? []), baseClass);
  const style     = composeStyle(...(options.style ?? []), motionData?.enterStyle, ...motionStyles, baseStyle);
  const attrs: Record<string, unknown> = {
    ...(v          ? { "data-visual":  v }      : {}),
    ...(testId     ? { "data-testid":  testId } : {}),
    ...(isLoading  ? { "data-loading": "true", "aria-busy": "true" } : {}),
    ...(isDisabled ? { "aria-disabled": "true", "data-disabled": "" } : {}),
    ...(action     ? { "data-action":  action } : {}),
    ...(target     ? { "data-target":  target } : {}),
    // data-motion: presence flag for @media (prefers-reduced-motion) in motion.css
    ...(motionData ? { "data-motion":  "" }     : {}),
    // data-m-exit + data-m-exit-dur: read by mountMotionDismiss()
    ...(motionData?.exitAttrs ?? {}),
    ...options.attrs,
  };
  return {
    className, style, attrs, rest,
    spacing: { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml },
  };
}

/**
 * Resolves a color role into a full set of CSS custom property assignments
 * scoped to a given channel prefix.
 *
 * Usage:
 *   ...resolveColorRole("primary", "data--color")
 *
 * Emits:
 *   --data--color--subtle: var(--primary--subtle)
 *   --data--color--muted:  var(--primary--muted)
 *   --data--color--base:   var(--primary--base)
 *   --data--color--vivid:  var(--primary--vivid)
 *   --data--color--deep:   var(--primary--deep)
 *   --data--color--border: var(--primary--border)
 *   --data--color--text:   var(--primary--text)
 *
 * Component CSS then reads whichever shade is semantically appropriate:
 *   border-color:     var(--data--color--border)
 *   background-color: var(--data--color--subtle)
 *   color:            var(--data--color--text)
 *
 * Roles without vivid/deep defined (success, danger, warning, info currently)
 * produce empty var() references — CSS ignores them safely.
 */
export function resolveColorRole(role: ColorRole, channel: string): string[] {
  return [
    `--${channel}--subtle: var(--${role}--subtle)`,
    `--${channel}--muted:  var(--${role}--muted)`,
    `--${channel}--base:   var(--${role}--base)`,
    `--${channel}--vivid:  var(--${role}--vivid)`,
    `--${channel}--deep:   var(--${role}--deep)`,
    `--${channel}--border: var(--${role}--border)`,
    `--${channel}--text:   var(--${role}--text)`,
  ];
}

if (process.env.NODE_ENV === "development") {
  const assert = (cond: boolean, msg: string) => { if (!cond) throw new Error(`resolveColorRole: ${msg}`); };
  const _result = resolveColorRole("primary", "data--color");
  assert(_result.length === 7, "7 channel strings emitted");
  const _suffixes = ["subtle", "muted", "base", "vivid", "deep", "border", "text"] as const;
  assert(
    _suffixes.every((s, i) => (_result[i] ?? "").startsWith(`--data--color--${s}:`)),
    "channel names: --{channel}--{suffix}",
  );
  assert(
    _suffixes.every((s, i) => (_result[i] ?? "").includes(`var(--primary--${s})`)),
    "var references: var(--{role}--{suffix})",
  );
}