import type { LayoutProps } from "../../layout.props";
import type { FlexDirection, FlexWrap, FlexTag } from "./flex.tokens";

export interface FlexProps extends LayoutProps {
  /** Flex direction. @default "row" */
  direction?: FlexDirection;
  
  /** Flex wrap behavior. @default "nowrap" */
  wrap?: FlexWrap;
  
  /** HTML tag to render as. @default "div" */
  as?: FlexTag;
}
