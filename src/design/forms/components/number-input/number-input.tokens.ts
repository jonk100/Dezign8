// design/forms/number-input/number-input.tokens.ts

import type { FormSize, FormVariant, FormColor, FormRadius } from "~/forms/forms.tokens";

export { FORM_TOKENS as NUMBER_INPUT_TOKENS } from "~/forms/forms.tokens";

export type NumberInputSize    = FormSize;
export type NumberInputVariant = FormVariant;
export type NumberInputColor   = FormColor;
export type NumberInputRadius  = FormRadius;

export const NUMBER_INPUT_DEFAULTS = {
  controls: true,
  fullWidth: false,
} as const;
