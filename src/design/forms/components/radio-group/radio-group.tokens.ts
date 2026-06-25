// design/forms/components/radio-group/radio-group.tokens.ts

/**
 * @file Token spec and defaults for the RadioGroup component.
 * @module design/forms/radio-group
 *
 * RadioGroup is a structural wrapper, not a form control. It uses no form token
 * dimensions — its only token is the layout direction.
 *
 * @see {@link RadioGroupProps}  in `radio-group.props.ts`
 * @see {@link useRadioGroup}    in `radio-group.hook.ts`
 */

// ─── LAYOUT SCALE ─────────────────────────────────────────────────────────────

export const LAYOUT_VALUES = ["vertical", "horizontal"] as const;
export type  RadioGroupLayout = typeof LAYOUT_VALUES[number];

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const RADIO_GROUP_DEFAULTS = {
  layout: "vertical" as RadioGroupLayout,
} as const;
