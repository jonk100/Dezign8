// design/typography/text/text.props.ts
import type { TypographyProps } from "../typography.props";

export type TextTag =
  | "p" | "span" | "div" | "li"
  | "strong" | "em" | "del" | "ins" | "mark" | "small"
  | "figcaption" | "cite" | "legend"
  | "dt" | "dd" | "address";

export interface TextProps extends TypographyProps {
  /** HTML element to render as. @default 'p' */
  as?: TextTag;
}