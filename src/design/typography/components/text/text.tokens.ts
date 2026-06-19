// design/typography/text/text.tokens.ts

/**
 * Text re-exports the full typography spec unchanged.
 * Text has no additional dimensions and no narrowed values —
 * it exposes the complete typography vocabulary as-is.
 */
export { TYPOGRAPHY_TOKENS as TEXT_TOKENS } from "../../typography.tokens";

export type {
  TypeSize       as TextSize,
  TypeWeight     as TextWeight,
  TypeColor      as TextColor,
  TypeAlign      as TextAlign,
  TypeLeading    as TextLeading,
  TypeTracking   as TextTracking,
  TypeFamily     as TextFamily,
  TypeTransform  as TextTransform,
  TypeWrap       as TextWrap,
  TypeDecoration as TextDecoration,
  TypeStyle      as TextStyle,
} from "../../typography.tokens";

export const TEXT_DEFAULTS = {
  as: "p",
} as const;