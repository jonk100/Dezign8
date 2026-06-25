// design/forms/components/textarea/textarea.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Textarea component.
 * @module design/forms/textarea
 *
 * Textarea extends FORM_TOKENS with a `resize` dimension scoped to "textarea"
 * so only `textarea.css` reads `--textarea--resize`. All other form token
 * dimensions are inherited unchanged.
 *
 * @see {@link FORM_TOKENS}     in `forms/forms.tokens.ts`
 * @see {@link TextareaProps}   in `forms/textarea/textarea.props.ts`
 * @see {@link useTextarea}     in `forms/textarea/textarea.hook.ts`
 */

import { composeTokens, dimension, scale } from "~/shared/tokens";
import { FORM_TOKENS } from "~f/forms.tokens";
import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── RESIZE SCALE ─────────────────────────────────────────────────────────────

const RESIZE = scale({
  none:     "none",
  vertical: "vertical",
  both:     "both",
});

// ─── SPEC ─────────────────────────────────────────────────────────────────────

export const TEXTAREA_TOKENS = composeTokens(FORM_TOKENS, {
  // scope: "textarea" — only textarea.css reads --textarea--resize
  resize: dimension("resize", RESIZE, { scope: "textarea" }),
});

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

export type TextareaResize  = keyof typeof TEXTAREA_TOKENS.resize.values;
export type TextareaSize    = FormSize;
export type TextareaVariant = FormVariant;
export type TextareaColor   = FormColor;
export type TextareaRadius  = FormRadius;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const TEXTAREA_DEFAULTS = {
  resize: "vertical" as TextareaResize,
  rows:   3,
} as const;
