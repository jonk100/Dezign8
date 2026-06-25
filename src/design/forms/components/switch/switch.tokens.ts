// design/forms/components/switch/switch.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Switch component.
 * @module design/forms/switch
 *
 * Switch introduces no new token dimensions — it re-exports FORM_TOKENS
 * and adds its own defaults and constants.
 *
 * Default `variant` is `"ghost"` (applied inline in {@link useSwitch}) for the
 * traditional label-only appearance. Pass `variant="outlined"` or `variant="soft"`
 * for a bordered "selectable card" style.
 *
 * @see {@link FORM_TOKENS}   in `forms/forms.tokens.ts`
 * @see {@link SwitchProps}   in `forms/switch/switch.props.ts`
 * @see {@link useSwitch}     in `forms/switch/switch.hook.ts`
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

export { FORM_TOKENS as SWITCH_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

export type SwitchSize    = FormSize;
export type SwitchVariant = FormVariant;
export type SwitchColor   = FormColor;
export type SwitchRadius  = FormRadius;

// ─── LABEL POSITION ───────────────────────────────────────────────────────────

export const LABEL_POSITIONS = ["end", "start", "top", "bottom"] as const;
export type  LabelPosition   = typeof LABEL_POSITIONS[number];

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const SWITCH_DEFAULTS = {
  labelPosition: "end" as LabelPosition,
} as const;
