// design/typography/quote/quote.props.ts
import type { TypographyProps } from "../../typography.props";
import type { QuoteType } from "./quote.tokens";

export interface QuoteProps extends TypographyProps {
  /**
   * The semantic and visual type of quote.
   * - `block`: Standard blockquote (default)
   * - `pull`: Prominent, larger text for pull quotes
   * - `inline`: Inline quote using the `<q>` tag
   * @default 'block'
   */
  type?: QuoteType;
  cite?: string;
}
