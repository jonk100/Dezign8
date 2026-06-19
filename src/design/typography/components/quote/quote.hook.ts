// design/typography/quote/quote.hook.ts
import type { QuoteProps } from "./quote.props";
import { QUOTE_DEFAULTS, type QuoteTag } from "./quote.tokens";
import { useTypography } from "../../typography.hook";
import { composeClass } from "~/shared/base.hook";

export function useQuote(props: QuoteProps) {
  const {
    type = QUOTE_DEFAULTS.type,
    class: className,
    ...rest
  } = props;

  const Tag: QuoteTag = type === "inline" ? "q" : "blockquote";


  const { typographyAttributes } = useTypography({
    ...rest,
    class: composeClass("quote", `quote--${type}`, className),
  });

  return {
    Tag,
    props: typographyAttributes,
  };
}
