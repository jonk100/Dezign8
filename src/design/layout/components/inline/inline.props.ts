import type { LayoutProps } from "../../layout.props";
import type { InlineTag } from "./inline.tokens";

export interface InlineProps extends LayoutProps {
  /** HTML tag to render as. @default "span" */
  as?: InlineTag;
}
