// design/typography/text/text.props.ts
import type { TypographyProps } from "~ty/typography.props";

export type TextTag =
  | "p" | "span" | "div" | "li"
  | "strong" | "em" | "del" | "ins" | "mark" | "small"
  | "figcaption" | "cite" | "legend"
  | "dt" | "dd" | "address";

import type { IconProps } from "~/shared/icon.props";

export interface TextProps extends TypographyProps, IconProps {
  /** HTML element to render as. @default 'p' */
  as?: TextTag;
}