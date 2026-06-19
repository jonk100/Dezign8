// design/triggers/button/button.tokens.ts

export { TRIGGER_TOKENS as BUTTON_TOKENS } from "../../trigger.tokens";
export type { TriggerVariant as ButtonVariant, TriggerColor as ButtonColor, TriggerRadius as ButtonRadius }
  from "../../trigger.tokens";

/* ─── SIZE MAP ───────────────────────────────────────────── */
// p  = padding-block
// pi = padding-inline
// fs = font-size
// h  = min-height

export const BUTTON_SIZE_MAP = {
  "2xs": { p: "var(--space-in--3xs)", pi: "var(--space-in--2xs)",  fs: "var(--label--2xs)", h: "var(--ui-height--2xs)" },
  xs: { p: "var(--space-in--2xs)", pi: "var(--space-in--xs)",  fs: "var(--label--xs)", h: "var(--ui-height--xs)" },
  sm: { p: "var(--space-in--xs)",  pi: "var(--space-in--sm)",  fs: "var(--label--sm)", h:  "var(--ui-height--sm)" },
  md: { p: "var(--space-in--sm)",  pi: "var(--space-in--md)",  fs: "var(--label--md)", h:  "var(--ui-height--md)" },
  lg: { p: "var(--space-in--md)",  pi: "var(--space-in--lg)",  fs: "var(--label--lg)", h: "var(--ui-height--lg)" },
  xl: { p: "var(--space-in--lg)",  pi: "var(--space-in--xl)",  fs: "var(--label--xl)", h: "var(--ui-height--xl)" },
  "2xl": { p: "var(--space-in--xl)",  pi: "var(--space-in--2xl)",  fs: "var(--label--2xl)", h: "var(--ui-height--2xl)" },
  
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZE_MAP;

export function resolveButtonSize(size: ButtonSize): string[] {
  const { p, pi, fs, h } = BUTTON_SIZE_MAP[size];
  return [
    `--button--p: ${p}`,
    `--button--pi: ${pi}`,
    `--button--fs: ${fs}`,
    `--button--h: ${h}`,
  ];
}

/* ─── CONSTANTS ──────────────────────────────────────────── */

export const BUTTON_TYPES   = ["button", "submit", "reset"] as const;
export const BUTTON_TARGETS = ["_self", "_blank", "_parent", "_top"] as const;

export type ButtonType   = typeof BUTTON_TYPES[number];
export type ButtonTarget = typeof BUTTON_TARGETS[number];

/* ─── DEFAULTS ───────────────────────────────────────────── */

export const BUTTON_DEFAULTS = {
  size:      "md"      as ButtonSize,
  type:      "button"  as ButtonType,
  iconOnly:  false,
  fullWidth: false,
} as const;