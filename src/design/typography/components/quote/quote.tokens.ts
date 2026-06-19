// design/typography/quote/quote.tokens.ts

export { TYPOGRAPHY_TOKENS as QUOTE_TOKENS } from "../../typography.tokens";

export type {
  TypeSize       as QuoteSize,
  TypeWeight     as QuoteWeight,
  TypeColor      as QuoteColor,
  TypeAlign      as QuoteAlign,
  TypeLeading    as QuoteLeading,
  TypeTracking   as QuoteTracking,
  TypeFamily     as QuoteFamily,
  TypeTransform  as QuoteTransform,
  TypeWrap       as QuoteWrap,
  TypeDecoration as QuoteDecoration,
  TypeStyle      as QuoteStyle,
} from "../../typography.tokens";

export const QUOTE_DEFAULTS = {
  type: "block",
} as const;

export type QuoteType = "block" | "pull" | "inline";
export type QuoteTag = "blockquote" | "q";
